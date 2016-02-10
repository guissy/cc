var gulp = require('gulp'),
md5 = require('gulp-md5-plug');
gulp.task('md5:js', function (done) {
    gulp.src('dist/*.js')
        .pipe(md5(10, 'dist/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

gulp.default = ['md5:js'];