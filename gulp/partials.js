'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var paths = gulp.paths;

gulp.task('partials', function() {
  return gulp.src([
      paths.src + '/app/**/*.tpl.html'
    ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'app'
    }))
    .pipe(gulp.dest(paths.tmp + '/'));
});
