var koa = require('koa');
var serveStatic = require('koa-static');
var session = require('koa-session');
var bodyParser = require('koa-body-parser');
var methodOverride = require('koa-methodoverride')
var router = require('koa-router');
var render = require('koa-ejs');
var gzip = require('koa-gzip');
var etag = require('koa-etag');
var fresh = require('koa-fresh');

var path = require('path');
var util = require('util');
var config = require('config');
var route = require('./app/routes')

var Server = (function () {
  function Server(options) {
    this.app = koa();
    this.rootFolder = path.join(options.dirname, 'server');
  }

  Server.prototype.start = function () {
    this.app.listen(config.server.port);
    console.log(util.format('Email server started on port %s as "%s" environment.'), config.server.port, process.env.NODE_ENV);
    return this;
  };

  Server.prototype.init = function () {
    var layoutPage = config.isDev ? '_layout' : '_layout.production';
    var staticMaxAge = 0;

    this.app.keys = ['fnjklhjh89347932kejlqw'];
    this.app.use(bodyParser());
    this.app.use(methodOverride());
    this.app.use(session({
      path: '/',
      httpOnly: true,
      maxage: null,
      rewrite: true,
      signed: true
    }));

    render(this.app, {
      root: path.join(this.rootFolder, 'views'),
      layout: layoutPage,
      viewExt: 'html',
      cache: !config.isDev,
      debug: config.isDev,
      locals: {},
      filters: {}
    });

    if (!config.isDev) {
      this.app.use(gzip());
      this.app.use(fresh());
      this.app.use(etag());
      staticMaxAge = 365 * 24 * 60 * 60 * 1000;
    }

    this.app.use(serveStatic(path.join(this.rootFolder, '/public/bower'), {
      maxage: staticMaxAge
    }));
    this.app.use(serveStatic(path.join(this.rootFolder, config.server.assets), {
      maxage: staticMaxAge
    }));


    return this;
  };

  Server.prototype.setupRoutes = function () {
    this.app.use(router(this.app));
    route(this.app);
    return this;
  };

  return Server;
})();

module.exports.Server = Server;
