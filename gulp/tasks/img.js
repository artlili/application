module.exports = function() {

  $.gulp.task('images', function(){
    return $.gulp.src('./src/static/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe($.gp.cache($.gp.imagemin([
      $.gp.imagemin.gifsicle({interlaced: true}),
      $.gp.imagemin.jpegtran({progressive: true}),
      $.jrc({
        loops: 5,
        min: 65,
        max: 70,
        quality:'medium'
      }),
      $.gp.imagemin.svgo(),
      $.gp.imagemin.optipng({optimizationLevel: 3}),
      $.ipq({quality: '65-70', speed: 5})
    ],
    {
      verbose: true
    })))
    .pipe($.gulp.dest('./build/img/'))
  })
}
