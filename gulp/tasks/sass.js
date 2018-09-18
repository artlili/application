module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src('src/static/scss/main.scss')
    .pipe($.gp.sourcemaps.init())
    .pipe($.gp.sass().on('error', $.gp.notify.onError(function(error) {
      return {
        message: 'Error: <%= error.message %>',
        title: 'scss'
      }
    })))
    .pipe($.gp.autoprefixer({
      browsers: ['> 0.1%']
    }))
    .pipe($.gp.csso())
    .pipe($.gp.rename('main.min.css'))
    .pipe($.gp.sourcemaps.write('.'))
    .pipe($.gulp.dest('build/css'))
    .pipe($.bs.reload({
      stream: true
    }))
  })
}
