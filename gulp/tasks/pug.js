module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('src/pug/pages/*.pug')
    .pipe($.gp.pug({
      pretty: true
    }).on('error', $.gp.notify.onError(function(error) {
      return {
        message: 'Error: <%= error.message %>',
        title: 'pug'
      }
    })))
    .pipe($.gulp.dest('build'))
    .on('end', $.bs.reload)
  })
}
