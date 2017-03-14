'use strict';

var errors = require('./../components/errors/index');

module.exports = function (app) {
  // authentification
  app.use('/auth', require('./auth/index'));
  app.use('/api/auth', require('./auth/index')); // <= used by orange

  app.route('.*').get(errors[404]);
};
