'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep');
var runSequence = require('run-sequence');
var paths = gulp.paths;

Function.prototype.bind = Function.prototype.bind || function (thisp) {
  var fn = this;
  return function () {
    return fn.apply(thisp, arguments);
  };
};

function runTests(singleRun, done) {
  var bowerDeps = wiredep({
    directory: paths.bower,
    exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = [].concat(bowerDeps.js.concat([
    paths.tmp + '/index.js',
    paths.tmp + '/templateCacheHtml.js',
    paths.tmp + '/**/*.js',
    paths.tmp + '/**/*.mock.js',
    paths.src + '/**/*.spec.js'
  ]));

  gulp.src(testFiles)
    .pipe($.plumber())
    .pipe($.karma({
      configFile: './karma.conf.js',
      action: (singleRun) ? 'run' : 'watch'
    }));
}

gulp.task('test-client', [], function (done) {
  runTests(true /* singleRun */ , done)
});
gulp.task('test-client:auto', [], function (done) {
  runTests(false /* singleRun */ , done)
});

gulp.task('test', function (done) {
  runSequence('test-client', 'test-server', done);
});
