const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-minify-css');
sass.compiler = require('node-sass');

const browserSync = require('browser-sync').create();

const rename = require("gulp-rename");

const htmlmin = require('gulp-htmlmin');

// Copy CSS files task
gulp.task('copy:css', () => {
  return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(minify())
    .pipe(rename("normalize.min.css"))
    .pipe(gulp.dest('public/css'));
});

// Compile Sass task
gulp.task('compile:sass', () => {
  const plugins = [autoprefixer({ grid: true })];
  return gulp
    .src('public/scss/main.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('public/css'));
});

// Minify HTML Task
gulp.task('minify-html', () => {
  return gulp.src('./index.app.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('./'));
});

// Serve task
gulp.task('serve', ['compile:sass', 'minify-html'], function() {
  browserSync.init({
    watch: true,
    server: './',
    watchOptions: {
      ignored: ['gulpfile.js', 'package.json', 'npm-shrinkwrap.json', 'README.md', 'LICENSE', 'robots.txt', '.gitignore']
    }
  });

  gulp.watch('public/scss/**/*.scss', ['compile:sass']).on('change', browserSync.reload);
  gulp.watch('./*.app.html', ['minify-html']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['copy:css'], () => {
  console.log(sass.compiler.info);
});
