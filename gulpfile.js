/*jslint node: true */
'use strict';

var
    gulp        = require('gulp'),
    $           = require('gulp-load-plugins')();

var cfg = {
  sass: {
    src:'./sass/*.scss',
    dest:'./public/css'
  }
};

$.livereload({ start: true });

gulp.task('default', ['sass.dev', 'watch']);
gulp.task('prod', ['sass']);

gulp.task('sass.dev', function() {
  return gulp.src(cfg.sass.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(cfg.sass.dest))
    .pipe($.livereload());
});

gulp.task('sass', function() {
  return gulp.src(cfg.sass.src)
   .pipe($.plumber())
   .pipe($.sass({errLogToConsole: true, outputStyle: 'compressed'}))
   .pipe($.autoprefixer('last 1 version'))
   .pipe(gulp.dest(cfg.sass.dest))
   .pipe($.livereload());
});

gulp.task('reload', function() {
  $.livereload();
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass.dev']);
  gulp.watch('./public/index.html', ['reload']);
});
