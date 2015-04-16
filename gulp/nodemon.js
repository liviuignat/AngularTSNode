var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

var nodemonIgnore = [
  'server/public/*',
  'server/public/**/*',
  'server/views/*',
  'node_modules/*',
  'config/*',
  'gulp/*'
];

gulp.task('nodemon', ['node:dev']);
gulp.task('nodemon:prod', ['node:prod']);

gulp.task('node:dev', [], function () {
  $.nodemon({
    script: 'app.js',
    execMap: {
      js: 'node --harmony'
    },
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    },
    ignore: nodemonIgnore
  }).on('restart', function () {
    console.log('restarted!')
  })
});

gulp.task('node:prod', [], function () {
  $.nodemon({
    script: 'app.js',
    execMap: {
      js: 'node --harmony'
    },
    ext: 'html js',
    env: {
      'NODE_ENV': 'production'
    },
    ignore: nodemonIgnore
  }).on('restart', function () {
    console.log('restarted!')
  })
});
