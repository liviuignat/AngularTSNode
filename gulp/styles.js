'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  var injectFiles = gulp.src([
    paths.src + '/**/*.less',
    '!' + paths.src + '/index.less',
    '!' + paths.src + '/vendor.less'
  ], {
    read: false
  });

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(paths.src + '/', '');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.less');

  return gulp.src([
      paths.src + '/index.less',
      paths.src + '/vendor.less'
    ])
    .pipe($.plumber())
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(paths.tmp));
});
