var util = require('util');
var apiRoutes = require('./apiRoutes');

function setupApiRoutes(options) {
  var app = options.app;
  var prefix = options.version ? util.format('/api/%s', options.version) : '/api';

  app.get(prefix + '/', apiRoutes.index);
}

function setupRoutes(app) {
  app.get('/', function * () {
    yield this.render('index');
  });

  setupApiRoutes({
    app: app,
    version: 'v1'
  })
}

module.exports = setupRoutes;
