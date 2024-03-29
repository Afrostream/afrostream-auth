'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Server port
  port: process.env.PORT || 5606,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // --------------------------------
  // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
  //   NEVER CHANGE THIS VALUE
  // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
  seedDB: false,
  // --------------------------------

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'afrostream-admin-secret',
    expire: parseInt(process.env.USER_TOKEN_EXPIRE, 10) || 1800,
    videoExpire: process.env.VIDEO_TOKEN_EXPIRE || 300 // FIXME: int or string ...
  },
  oauth2: true,

  // List of user roles
  userRoles: ['guest', 'user', 'contributor', 'super-contributor', 'client', 'admin'],

  amazon: {
    key: process.env.AWS_ACCESS_KEY_ID || 'AKIAIJ7BEEEIYX3CZDOQ',
    secret: process.env.AWS_SECRET_ACCESS_KEY || '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',
    s3Bucket: process.env.S3_BUCKET_NAME || 'afrostream-img',
    region: 'eu-west-1'
  },

  imgix: {
    domain: process.env.IMGIX_DOMAIN || 'https://afrostream.imgix.net'  // GRRRRR... should NOT contain "https://"
  },

  bouygues: {
    clientID: '',
    clientSecret: ''
  },

  orange: {
    clientID: '',
    clientSecret: ''
  },

  facebook: {
    clientID: process.env.FACEBOOK_ID || '828887693868980',
    clientSecret: process.env.FACEBOOK_SECRET || '25130290468ec21fbefd1604218cc57c'
  },

  twitter: {
    clientID: process.env.TWITTER_ID || '828887693868980',
    clientSecret: process.env.TWITTER_SECRET || '25130290468ec21fbefd1604218cc57c'
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    cloudKey: 'AIzaSyBSoU5ntLUsSDZs_xMKpflf7W9ZF7jfGEQ',
    firebaseKey: 'AAAAj7oJLV4:APA91bH1EMO6tdbxgfFSeIDdd8Sc0gv7-tnGZM_C9qPkzSkpH1kXgAs4ua16EP18RT7s43TxzmxiT9fo5OHuuhn5BYaLev-lFAMamZU1_NDyb6eN3nAP-WDu7HEJ9k9I2zM2JTAioUW0'
  },

  pagination: {
    total: 10000,
    max: 10000
  },
  // access:   https://app.recurly.com/login
  // login:    johnarch.ma@gmail.com
  // password: Afrostream77
  recurly: {
    subdomain: process.env.RECURLY_SUB_DOMAIN || 'johnarch',
    apiKey: process.env.RECURLY_API_KEY || '67dbb29f0dbe4e219bc247a3b5387652'
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID || '3OKNPL7ZVA',
    apiKey: process.env.ALGOLIA_API_KEY || '47d48040a13e973aca2ea9f492eca17e'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./environment/' + process.env.NODE_ENV + '.js') || {}
);
