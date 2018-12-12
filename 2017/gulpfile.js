var gulp = require('gulp')

var uglify = require('gulp-uglify')
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var pump = require('pump');
var bs = require('browser-sync').create();

gulp.task('script', function(cb) {
	pump([
		gulp.src('js/*.js'),
		uglify("es2015"),
		gulp.dest('dist/js')
	], cb)
})

gulp.task('minify-css', (cb) => {
  pump([
  	gulp.src('css/*.css'),
  	cleanCSS({compatibility: 'ie8'}),
  	gulp.dest('dist/css')
  ], cb)
});

gulp.task('minify-image', (cb) => {
  pump([
  	gulp.src('img/*'),
  	imagemin([
  		imagemin.gifsicle({interlaced: true}),
  		imagemin.jpegtran({progressive: true}),
  		imagemin.optipng({optimizationLevel: 5}),
  		imagemin.svgo({
  			plugins: [
  				{removeViewBox: true},
  				{cleanupIDs: false}
  			]
  		})
  	]),
  	gulp.dest('dist/img')
  ], cb)
});

gulp.task('default', ['script', 'minify-css', 'minify-image']);

// 监听
// gulp.task('default', function() {
// 	bs.init({
// 		server: {
// 			baseDir: './'
// 		}
// 	});
// 	gulp.watch('./js/*.js', function() {
// 		bs.reload();
// 	})
// 	gulp.watch('./css/*.css', function () {
// 		bs.reload("*.css");
// 	})
// 	gulp.watch('./*/*.html', function () {
// 		bs.reload();
// 	})
// })