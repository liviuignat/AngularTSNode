'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var paths = gulp.paths;

gulp.task('inject', ['styles', 'scripts'], function() {
  var injectStyles = gulp.src([
    paths.tmp + '/vendor.css',
    paths.tmp + '/**/*.css'
  ], {
    read: false
  });

  var injectScripts = gulp.src([
    paths.tmp + '/index.js',
    paths.tmp + '/register.js',
    paths.tmp + '/app/**/*.js',
    '!' + paths.tmp + '/templateCacheHtml.js',
    '!' + paths.tmp + '/app/**/*.spec.js',
    '!' + paths.tmp + '/app/**/*.mock.js'
  ], {
    read: false
  });

  var partialsInjectFile = gulp.src(paths.tmp + '/templateCacheHtml.js', {
    read: false
  });

  var wiredepOptions = {
    ignorePath: '../bower',
    directory: paths.bower,
    exclude: [/bootstrap\.js/, /bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
  };

  return gulp.src(paths.src + '/_layout.html')
    .pipe($.inject(injectStyles, {
      ignorePath: [paths.src, paths.tmp],
      addPrefix: '/assets',
      addRootSlash: true
    }))
    .pipe($.inject(injectScripts, {
      ignorePath: [paths.src, paths.tmp],
      addPrefix: '/assets',
      addRootSlash: true
    }))
    .pipe($.inject(partialsInjectFile, {
      starttag: '<!-- inject:partials -->',
      ignorePath: paths.tmp,
      addPrefix: '/assets',
      addRootSlash: true
    }))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(paths.views));
});
