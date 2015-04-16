'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var util = require('util');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var paths = gulp.paths;

gulp.task('browser', ['watch'], function () {
  browserSync({
    proxy: 'localhost:8090',
    port: 9000,
    files: [
      paths.tmp + '/*.css',
      paths.tmp + '/**/*.css',
      paths.tmp + '/*.js',
      paths.tmp + '/**/*.js',
      paths.tmp + '/*.html'
    ],
    open: true,

    browser: "google chrome"
  });
});

gulp.task('browser:prod', ['watch:prod'], function () {
  browserSync({
    proxy: 'localhost:8090',
    port: 9000,
    files: [
      paths.views + '/_layout.html'

    ],
    open: true,

    browser: "google chrome"
  });
});

gulp.task('serve', function (done) {
  runSequence('node:dev', 'browser', done);
});

gulp.task('serve:prod', function (done) {
  runSequence('node:prod', 'browser:prod', done);
});
