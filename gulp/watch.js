'use strict';

var gulp = require('gulp');
var paths = gulp.paths;

gulp.task('watch', ['inject'], function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/**/*.tpl.html',
    paths.src + '/**/*.less',
    paths.src + '/**/*.ts',
    'bower.json'
  ], ['inject']);
});

gulp.task('watch:prod', ['build:prod-no-clean'], function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/**/*.tpl.html',
    paths.src + '/**/*.less',
    paths.src + '/**/*.ts',
    'bower.json'
  ], ['build:prod-no-clean']);
});
