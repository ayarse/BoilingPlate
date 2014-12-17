var gulp = require('gulp'),
 	path = require('path'),
 	// less = require('gulp-less'),
 	uglify = require('gulp-uglify'),
 	concat = require('gulp-concat'),
 	autoprefixer = require('gulp-autoprefixer'),
 	watch = require('gulp-watch'),
 	connect = require('gulp-connect'),
 	sass = require('gulp-ruby-sass');

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}


// gulp.task('less', function(){
// 	gulp.src('src/less/app.less')
// 		.pipe(less({compress: true}))
// 		.on('error', swallowError)
// 		.pipe(autoprefixer())
// 		.pipe(gulp.dest('dist/css/'))
// 		.pipe(connect.reload())
// });

gulp.task('sass', function () {
    gulp.src('src/scss/app.scss')
        .pipe(sass())
        .pipe(autoprefixer("last 2 versions"))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload())
});

gulp.task('scripts', function(){
	var appjs = gulp.src('src/js/app.js')
				.pipe(uglify())
				.pipe(gulp.dest('dist/js/'))
				.pipe(connect.reload());

	var pluginsjs = gulp.src('src/js/plugins/*.js')
		.pipe(concat('plugins.js'))
		.on('error', swallowError)
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(connect.reload());

});

gulp.task('html', function(){
	gulp.src('./*.html')
		.pipe(connect.reload());
});

gulp.task('copy-jquery', function(){
	gulp.src('src/bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-foundation', function(){
	gulp.src('src/bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('serve', function(){
	connect.server({
		root: './',
		port: 9000,
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch('./*.html', ['html']);
	// gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch(['src/js/app.js', 'src/js/plugins/**'], ['scripts']);
});

gulp.task('copy', ['copy-jquery']);
gulp.task('default', ['serve', 'sass', 'scripts', 'watch']);