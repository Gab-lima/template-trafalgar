var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
    uglifyjs = require('gulp-uglify'),
    lintjs = require('gulp-jshint'),
    sassGlob = require('gulp-sass-glob');

var sassMainFile = 'src/styles/main.scss';

gulp.task('sass', done => {
    gulp.src(sassMainFile)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write())
  		.pipe(gulp.dest('./dist'));
        done();
});

gulp.task('scripts', done => {
    gulp.src('src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(lintjs())
        .pipe(sourcemaps.write())
        .pipe(uglifyjs())
        .pipe(concat('scripts.js'))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('./dist'));
        done();
});

gulp.task('watch', function () {
    gulp.watch('src/styles/**/*', gulp.series('sass'));
    gulp.watch('src/scripts/**/*', gulp.series('scripts'));
});

gulp.task('default', gulp.series('sass', 'scripts', 'watch'));