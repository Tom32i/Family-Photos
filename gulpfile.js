var gulp   = require('gulp'),
    less   = require('gulp-less'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css');

var sources = [
        'bower_components/bootstrap/less/bootstrap.less',
        'src/Family/PhotoBundle/Resources/css/**/*.less'
    ],
    expose = [
        ['bower_components/bootstrap/fonts/*', 'web/fonts']
    ];

gulp.task('expose' , function(){
    for (var i = expose.length - 1; i >= 0; i--) {
        gulp.src(expose[i][0])
            .pipe(gulp.dest(expose[i][1]));
    }
});

gulp.task('build-less', function(){
    return gulp.src(sources)
        .pipe(concat('main.less'))
        .pipe(less())
        .pipe(rename('main.css'))
        .pipe(minify())
        .pipe(gulp.dest('web/assets'));
});

gulp.task('build-less-full', function(){
    return gulp.src(sources)
        .pipe(concat('main.less'))
        .pipe(less())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('web/assets'));
});

gulp.task('watch', ['build-less-full'], function () {
    gulp.watch([sources], ['build-less-full']);
});

gulp.task('default', ['expose', 'build-less']);
gulp.task('dev', ['expose', 'watch']);