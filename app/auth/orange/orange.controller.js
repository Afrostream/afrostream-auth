'use strict';

var Q = require('q');
var _ = require('lodash');
var btoa = require('btoa');
var passport = require('passport');
var oauth2 = require('../oauth2/oauth2');
var sqldb = rootRequire('sqldb');
var User = sqldb.User;
var Client = sqldb.Client;

var strategyOptions = function (options) {
  return function (req, res, next) {
    req.passportStrategyOrangeOptions = _.merge(
      {
        createAccountIfNotFound: false
      }, options || {});
    next();
  };
};

/**
 *
 * WORKFLOW
 *
 *  browser: popup https://afrostream.tv/auth/orange/{signin,signup,link}
 *   front => fwd api-v1 => fwd backend
 *
 *  le backend répond un 302 avec l'url orange
 *    backend => api-v1 => front => browser redirigé vers ce 302
 *
 *  suivant si l'user arrive à s'authentifier (ou non),
 *    orange redirige l'utilisateur vers
 *    https://afrostream.tv/auth/orange/callback/
 *
 *  on part ensuite dans le code de passport.js
 *    et on revient dans le code de la callback
 */
var signin = function (req, res, next) {
  passport.authenticate('orange', {
    session: false,
    additionalParams: {
      RelayState: btoa(JSON.stringify({
        status: 'signin'
      }))
    }
  })(req, res, next);
};

var signup = function (req, res, next) {
  passport.authenticate('orange', {
    additionalParams: {
      RelayState: btoa(JSON.stringify({
        status: 'signup',
        signupClientType: req.query.clientType || null // forward caller type
      }))
    }
  })(req, res, next);
};

var link = function (req, res, next) {
  if (!req.user) {
    return res.handleError()(new Error('missing user'));
  }
  passport.authenticate('orange', {
    session: false,
    additionalParams: {
      RelayState: btoa(JSON.stringify({
        status: 'link',
        accessToken: req.passport && req.passport.accessToken && req.passport.accessToken.get('token')
      }))
    }
  })(req, res, next);
};

var unlink = function (req, res) {
  req.logger.log('unlink user orange : ', req.user._id);
  User.find({
    where: {
      _id: req.user._id
    }
  })
    .then(function (user) {
      req.logger.log(user._id);
      if (!user) {
        throw new Error('unknown user');
      }
      user.ise2 = null;
      user.orange = null;
      return user.save();
    })
    .then(
      function (user) { res.json(user.getInfos()); },
      res.handleError(422)
    );
};

var callback = function (req, res, next) {
  var logger = req.logger.prefix('AUTH').prefix('ORANGE');
  var expireIn = null;
  // logs
  logger.log('callback: START');
  //
  passport.authenticate('orange', {
    session: false
  }, function (err, user, info) {
    Q()
      .then(function () {
        if (err) throw err;
        logger.log('callback: info=', info);
        if (info) {
          expireIn = info.expireIn; // Wat for ??
        }
        if (!user) throw new Error('Something went wrong, please try again.');
        logger.log('callback: userId=', user._id);
        return req.getPassport();
      })
      .then(function (passport) {
        if (req.signupClientType) {
          // whitelisting client types
          if (req.signupClientType !== "legacy-api.tapptic") {
            throw new Error('unallowed signupClientType');
          }
          return Client.findOne({where:{type:req.signupClientType}}).then(function (c) {
            return c || passport.client;
          });
        }
        return passport.client;
      })
      .then(function (client) {
        logger.log('generate Token for client=' + client._id + ' & user=' + user._id);
        return Q.ninvoke(oauth2, "generateToken", {
          client: client,
          user: user,
          code: null,
          userIp: req.clientIp,
          userAgent: req.userAgent,
          expireIn: expireIn,
          req: req,
          res: res
        });
      })
      .then(function (tokenInfos) {
        return {
          token: tokenInfos[0],
          access_token: tokenInfos[0],
          refresh_token: tokenInfos[1],
          expires_in: tokenInfos[2].expires_in,
          signupClientType: req.signupClientType
        };
      })
      .then(
        function success (tokens) {
          logger.log('sending tokens ' + JSON.stringify(tokens));
          res.json(tokens);
        },
        function error (err) {
          logger.error('callback: error=' + err.message, err);
          // hotfix: when SAML contains an ERROR, there is no SAML parsing, no state parsing in passport.js
          //  => req.signupClientType is not populated
          //  but the data can be found in req.body.RelayState (base64 of JSON)
          if (!req.signupClientType) {
            try {
              req.signupClientType = JSON.parse(
                new Buffer(req.body.RelayState, 'base64').toString('ascii')
              ).signupClientType;
            } catch (e) { /* empty */ }
          }
          //
          res.handleError()(err, {signupClientType: req.signupClientType});
        });
  })(req, res, next);
};

module.exports.middlewares = {
  strategyOptions: strategyOptions
};

module.exports.signin = signin;
module.exports.signup = signup;
module.exports.link = link;
module.exports.unlink = unlink;
module.exports.callback = callback;
