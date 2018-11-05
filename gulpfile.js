const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const browserSync = require('browser-sync').create();

// Copy CSS files task
gulp.task('copy:css', () => {
  return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('src/css'));
});

// Compile Sass task
gulp.task('compile:sass', () => {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

// Serve task
gulp.task('serve', ['compile:sass'], function() {
  browserSync.init({
    server: './'
  });

  gulp
    .watch(['src/scss/**/*.scss', 'src/css/**/*.css'], ['compile:sass'])
    .on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['copy:css']);
console.log(require('node-sass').info);
