var util = require('util');

var config = {
  isDev: false,
  server: {
    assets: '/public/.dist',
    port: process.env.PORT || 8090
  }
};

module.exports = config;
