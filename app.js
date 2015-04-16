var Server = require('./server/server').Server;

var server = new Server({
    dirname: __dirname
  })
  .init()
  .setupRoutes()
  .start();
