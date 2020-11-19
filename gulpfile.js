const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const browserSync = require('browser-sync').create();

//Compile SCSS to CSS
function style() {
  //1. Find scss file
  return (
    gulp
      .src('./scss/**/*.scss')
      //2. Passing that file to SASS compiler
      .pipe(sass())
      .pipe(prefix())
      //3. Compiled CSS file save location
      .pipe(gulp.dest('./css'))
      .pipe(livereload())
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'main.html',
    },
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

//RUN commands:
//gulp style (sync scss and create css file)
// gulp watch (watch files and reload)
