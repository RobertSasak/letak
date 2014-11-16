var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');


gulp.task('build', function () {
	return gulp.src('src/letak.js')
		.pipe(uglify({
			unsafe: true,
			hoist_vars: true
		}))
		.pipe(concat('letak.min.js'))
		.pipe(gulp.dest('dist/'));
});