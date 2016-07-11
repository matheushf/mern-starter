var gulp = require('gulp'),
    refresh = require('gulp-refresh'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject');

var srcStyles = [
    'src/css/**/*.scss'
];
var srcJs = [
    '!src/js/vendor/**/*.js',
    'src/js/**/*.js'
];
var srcPaths = srcStyles.concat(srcJs);
srcPaths.push('src/**/*.html');

gulp.task('inject-vendor', function () {
    gulp.src('./static/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./static'));
});

gulp.task('reload', function () {
    return gulp.src(srcPaths)
        .pipe(refresh())
});


gulp.task('watch', function () {
    refresh.listen();
    refresh.options.quiet = true;

    gulp.watch(srcPaths, ['reload']);
});