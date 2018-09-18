'use strict';

global.$ = {
  gulp: require('gulp'),
  gp:   require('gulp-load-plugins')(),
  bs:   require('browser-sync').create(),
  del:  require('del'),
  jrc:  require('imagemin-jpeg-recompress'),
  ipq:  require('imagemin-pngquant'),
  path: {
    tasks: require('./gulp/config/tasks.js')
  }
}

$.path.tasks.forEach(function(taskPath) {
  require(taskPath)()
})

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel('pug', 'sass', 'scripts:libs', 'scripts', 'fonts', 'images'),
  $.gulp.parallel('watch', 'serve')
))
