var bluebird = require('bluebird');
var passport = require('passport');
var OrangeStrategy = require('./passport/');
var billingApi = rootRequire('billing-api.js');

var sqldb = rootRequire('sqldb');
var AccessToken = sqldb.AccessToken;

/**
 * - si personne d’a de ise2 , je crée un user from scratch et je lui assigne le ise2
 * - si lors du signin je trouve deja queql’un qui a un ise2 je fail
 * - si je suis loggué (_id) et que je veux lier mon compte orange je trouve deja queql’un qui a un ise2 je fail
 * - sinon je link
 **/
exports.setup = function (User, config) {
  passport.use(new OrangeStrategy({
      clientID: config.orange.clientID,
      clientSecret: config.orange.clientSecret,
      callbackUrl: config.frontEnd.protocol + '://' + config.frontEnd.authority + '/auth/orange/callback',
      validateInResponseTo: false, // le module SAML stocke le InResponseTo InMemory
                                   //  <=> disfonctionnement en PROD en mode cluster.
      passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, orange, done) {
      var orangeUser, state;
      var logger = req.logger.prefix('AUTH').prefix('ORANGE').prefix('PASSPORT');

      logger.log('orange ', orange);

      bluebird.resolve(42)
        .then(function () {
          // parsing state
          state = JSON.parse(req.body.RelayState ? new Buffer(req.body.RelayState || '', 'base64').toString('ascii') : '{}');
          // setting signup client type
          req.signupClientType = state.signupClientType || null;
          // logs
          logger.log('state = ' + JSON.stringify(state));
          logger.log('signupClientType = ' + req.signupClientType);
        })
        .then(function () {
          logger.log('search orange user in DB using orange.identity.collectiveidentifier= ' + orange.identity.collectiveidentifier);
          if (!orange.identity.collectiveidentifier) {
            var error = new Error('missing collectiveidentifier');
            error.statusCode = 403;
            error.code = 'ORANGE_MISSING_COLLECTIVEIDENTIFIER';
            throw error;
          }
          // search orange corresponding user in database
          return User.find({
            where: {
              $or: [{'orange.identity.collectiveidentifier': orange.identity.collectiveidentifier}, {'ise2': orange.identity.collectiveidentifier}]
            }
          });
        })
        .then(function (ou) {
          orangeUser = ou || null;

          // logs
          if (orangeUser) {
            logger.log('orangeUser found: ' + orangeUser._id);
          } else {
            logger.log('orangeUser not found');
          }

          // 3 cas
          logger.log('status='+state.status);
          switch (state.status) {
            /*
             * LINK
             * On lie un compte orange a un utilisateur si
             *  - ce compte n'est pas utilisé
             *  - ou ce compte existe mais déjà utilisé par ce même utilisateur
             */
            case 'link':
              // l'appel à /auth/orange/link a généré un state contenant accessToken=...
              // on se sert de cet accessToken récupéré dans /auth/orange/callback
              // pour re-authentifier l'utilisateur
              var token = state.accessToken;
              logger.log('link: accessToken='+token);
              if (!token) {
                throw new Error("link: missing accessToken");
              }
              return AccessToken.find({where: {token: token}})
                .then(function (accessToken) {
                  if (!accessToken) {
                    throw new Error("link: cannot find accessToken " + token);
                  }
                  logger.log('link: accessToken found, searching user');
                  // l'access-token existe, on cherche l'utilisateur lié
                  return accessToken.getUser();
                })
                .then(function (user) {
                  if (!user) {
                    throw new Error("link: missing user");
                  }
                  if (orangeUser && orangeUser._id !== user._id) {
                    throw new Error('link: Your profile is already linked to another user');
                  }
                  logger.log('link: user ' + user._id + ' found, asking the billing');
                  return user;
                });
              /*
               * SIGNIN
               * On logue l'utilisateur, uniquement si il existe en base
               */
              case 'signin':
                if (!orangeUser) {
                  throw new Error("signin: No user found, please associate your profile after being connected'");
                }
                logger.warn('signin: orange user exist (' + orangeUser._id + ') => SIGNIN');
                return orangeUser;
                /*
                 * SIGNUP
                 * On regarde si l'utilisateur existe déjà en base, si c'est le cas, on signin
                 *  sinon on le crée, pour cela on le recherche avec son email (pour éviter de créer un doublon)
                 *
                 */
                case 'signup':
                  if (orangeUser) {
                    logger.warn('signup: orange user already exist => SIGNIN');
                    return orangeUser;
                  }
                  logger.log('signup: creating orange user');
                  return User.create({
                    role: 'user',
                    provider: 'orange'
                  });
                default:
                  throw new Error('unknown status ' + state.status);
              }
        })
        //
        // we create the user in the billing-api if he doesn't exist yet
        //
        .then(function (user) {
          logger.log('userReferenceUuid = ' + user._id);
          logger.log('userProviderUuid = ' + user.ise2);
          logger.log('OrangeApiToken = ' + orange.identity.OrangeAPIToken);

          return billingApi.getOrCreateUser({
            providerName: 'orange',
            userReferenceUuid: user._id,
            userProviderUuid: orange.identity.collectiveidentifier,
            userOpts: {
              email: user.email || '',
              firstName: user.first_name || '',
              lastName: user.last_name || '',
              OrangeApiToken: orange.identity.OrangeAPIToken
            }
          })
          .then(function (data) {
            var userBillingUuid = data.response.user.userBillingUuid;
            var orangeApiToken = orange.identity.OrangeAPIToken;
            logger.log('updating billing user ' + userBillingUuid + ' with orangeApiToken ' + orangeApiToken);
            return billingApi.updateUser(
              userBillingUuid,
              {
                userOpts: {
                  OrangeApiToken: orangeApiToken
                }
              }
            );
          })
          .then(function () { return user; });
        })
        .then(function (user) {
          // mise a jour des infos utilisateur
          // on ne peut faire le lien entre un user et un ise2 que si le billing est ok !
          switch (state.status) {
            case 'link':
            case 'signup':
              logger.log('link|signup: saving ise2 & orange info into user');
              // l'utilisateur de cet accessToken existe,
              // on update les infos de compte
              user.ise2 = orange.identity.collectiveidentifier;
              user.orange = orange;
              return user.save();
            default:
              return user;
          }
        })
        .then(
          function success(user) { return user; },
          function error(err) {
            logger.error(err.message, err);
            throw err; // forwarding the error.
          }
        )
        .nodeify(done);
    }));
};
