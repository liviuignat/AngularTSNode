'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge2');
var paths = gulp.paths;

gulp.task('scripts', ['partials'], function() {
  var tsResult = gulp.src('./server/public/dev/**/*.ts')
    .pipe($.plumber())
    .pipe($.typescript({
      removeComments: false,
      target: 'ES5',
      declarationFiles: false,
      noExternalResolve: true
    }));

  return merge([
    tsResult.js.pipe(gulp.dest(paths.tmp))
  ]);
});
