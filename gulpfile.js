var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    iife = require('gulp-iife'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('styles', function() {
    return gulp.src(['./src/styles/react-datepicker-custom.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
    return gulp.src([
            './src/scripts/form-component.js',
            './src/scripts/table-component.js',
            './src/scripts/application.js'
        ])
        .pipe(concat('script.js'))
        .pipe(iife())
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    return del(['./dist/*.css', './dist/*.js']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});
