var Server = require('./../server').Server;
var supertest = require('co-supertest');

module.exports.getRequest = function () {
  var server = new Server({
      dirname: './'
    })
    .init()
    .setupRoutes()
    .start();
  var app = server.app;
  return supertest.agent(app.listen());
};
