/* globals require */

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const webpack     = require('gulp-webpack');
const jshint      = require('gulp-jshint');

gulp.task('serve', ['sass'], function() {
    'use strict';
    browserSync.init({
        server: './app'
    });

    gulp.watch('app/**/*.js').on('change', browserSync.reload);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['lint','webpack']);
});

gulp.task('webpack', function() {
    'use strict';
    return gulp.src('src/main.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('app/'));
  });

gulp.task('lint', function() {
    'use strict';
    return gulp.src('./src/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter());
  });

gulp.task('sass', function() {
    'use strict';
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});
  
gulp.task('default', ['lint', 'webpack', 'serve']);