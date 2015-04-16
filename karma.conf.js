'use strict';

var wiredep = require('wiredep');
var bowerDeps = wiredep({
  directory: 'server/public/bower/bower',
  exclude: ['bootstrap-sass-official'],
  dependencies: true,
  devDependencies: true
});

var bowerFiles = bowerDeps.js.map(function(file) {
  return './' + file;
});

var files = bowerFiles.concat([
  './server/public/.tmp/assets/register.js',
  './server/public/.tmp/assets/index.js',
  './server/public/.tmp/assets/templateCacheHtml.js',
  './server/public/.tmp/assets/**/*.js',
  './server/public/.tmp/assets/**/*.mock.js',
  './server/public/.tmp/assets/**/*.spec.js'
]);

var exclude = [];

module.exports = function(config) {
  config.set({
    autoWatch: false,

    frameworks: ['jasmine'],

    reporters: ['mocha'],

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    plugins: [
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    files: files,
    exclude: exclude
  });
};
