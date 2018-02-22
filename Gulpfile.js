const gulp = require('gulp')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const standard = require('gulp-standard')
const sourcemaps = require('gulp-sourcemaps')
const stylish = require('jshint-stylish')
const webpack = require('webpack-stream')
const del = require('del')
const pckg = require('./package.json')
const modulePath = './node_modules'
const distFolder = 'dist'

gulp.task('lint', () => {
  gulp.src([
      './src/**/*.js'
    ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true,
      showRuleNames: true
    }))
})

gulp.task('js', () => {
  return gulp.src('./src/widget.js')
    .pipe(webpack())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.init())
    .pipe(concat(`widget-${pckg.version}.js`))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest(`./${distFolder}/js`))
    .pipe(notify('JS processed'))
})

gulp.task('watch', ['lint', 'js'], () => {
  gulp.watch('./src/**/*.js', ['lint', 'js'])
})

gulp.task('clean', () => {
  return del([`./${distFolder}`])
})

gulp.task('default', ['clean'], () =>{
  gulp.start('lint')
  gulp.start('js')
})
