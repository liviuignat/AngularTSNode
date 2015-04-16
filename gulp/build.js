'use strict';

var gulp = require('gulp');
var fs = require('fs');
var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var runSequence = require('run-sequence');

gulp.task('html', ['inject', 'partials'], function() {

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(paths.views + '/_layout.html')
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.uglify({
      mangle: false,
      preserveComments: $.uglifySaveLicense
    }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../bootstrap/fonts', 'fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({
      title: paths.dist + '/',
      showFiles: true
    }));
});

gulp.task('copy-layout-prod', function(done) {
  fs.unlink(paths.views + '/_layout.production.html', function(err) {
    fs.createReadStream(paths.dist + '/_layout.html')
      .pipe(fs.createWriteStream(paths.views + '/_layout.production.html'));

    done();
  });

});

// gulp.task('images', function () {
//   return gulp.src(paths.src + '/assets/images/**/*')
//     .pipe(gulp.dest(paths.dist + '/assets/images/'));
// });

gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('misc', function() {
  return gulp.src(paths.src + '/**/*.ico')
    .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function(done) {
  $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('bower', function() {
  return $.bower();
});

gulp.task('build:prod', function(done) {
  runSequence('clean', 'bower', ['html', 'fonts', 'misc'],
    'copy-layout-prod',
    done);
});

gulp.task('build:prod-no-clean', function(done) {
  runSequence('bower', ['html', 'fonts', 'misc'], 'copy-layout-prod', done);
});

gulp.task('build:dev', function(done) {
  runSequence('clean', ['inject'], done);
});
