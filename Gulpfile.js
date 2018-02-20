const gulp = require('gulp'),
  babel = require('gulp-babel'),
  notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  standard = require('gulp-standard'),
  sourcemaps = require('gulp-sourcemaps'),
  stylish = require('jshint-stylish'),
  webpack = require('webpack-stream'),
  expose = require('gulp-expose'),
  del = require('del'),
  pckg = require('./package.json'),
  modulePath = './node_modules',
  distFolder = 'dist'
;

gulp.task('js', () =>{
  return gulp.src([
      './src/**/*.js'
    ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true,
      showRuleNames: true
    }))
    .pipe(webpack())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(expose('window', 'gClickToCall'))
    .pipe(sourcemaps.init())
    .pipe(concat(`widget-${pckg.version}.js`))
    .pipe(sourcemaps.write())
    // .pipe(uglify())
    .pipe(gulp.dest(`./${distFolder}/js`))
    .pipe(notify('JS processed'))
  ;
});

gulp.task('watch', ['js'], () =>{
  gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('clean', () =>{
  return del([`./${distFolder}`]);
});

gulp.task('default', ['clean'], () =>{
  gulp.start('js');
});
