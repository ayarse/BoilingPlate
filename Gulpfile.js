var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('less', function(){
	gulp.src('src/less/app.less')
		.pipe(less({compress: true}))
		.on('error', swallowError)
		.pipe(autoprefixer())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function(){
	var appjs = gulp.src('src/js/app.js')
				.pipe(uglify())
				.pipe(gulp.dest('dist/js/'));

	var pluginsjs = gulp.src('src/js/plugins/*.js')
		.pipe(concat('plugins.js'))
		.on('error', swallowError)
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));

});

gulp.task('copy-jquery', function(){
	gulp.src('src/bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-foundation', function(){
	gulp.src('src/bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch(['src/js/app.js', 'src/js/plugins/**'], ['scripts']);
});

gulp.task('copy', ['copy-jquery']);
gulp.task('default', ['less', 'scripts', 'watch']);