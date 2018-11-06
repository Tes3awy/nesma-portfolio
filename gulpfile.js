const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
sass.compiler = require('node-sass');

const browserSync = require('browser-sync').create();

// Copy CSS files task
gulp.task('copy:css', () => {
  return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('public/css'));
});

// Compile Sass task
gulp.task('compile:sass', () => {
  const plugins = [
    autoprefixer({ grid: true })
  ]
  return gulp
    .src('public/scss/main.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('public/css'));
});

// Serve task
gulp.task('serve', ['compile:sass'], function() {
  browserSync.init({
    server: './'
  });

  gulp
    .watch(['public/scss/**/*.scss', 'public/css/**/*.css'], ['compile:sass'])
    .on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['copy:css']);
console.log(require('node-sass').info);
