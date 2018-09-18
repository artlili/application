module.exports = function() {
  $.gulp.task('scripts:libs', function() {
    return $.gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/slick-carousel/slick/slick.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe($.gp.concat('libs.min.js'))
    .pipe($.gulp.dest('build/js'))
    .on('end', $.bs.reload)
  })

  $.gulp.task('scripts', function() {
    return $.gulp.src('src/static/js/main.js')
    .pipe($.gp.uglify())
    .pipe($.gp.concat('all.min.js'))
    .pipe($.gulp.dest('build/js'))
    .on('end', $.bs.reload)
  })
}
