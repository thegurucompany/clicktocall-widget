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
const argv = require('yargs').argv
const pckg = require('./package.json')
const modulePath = './node_modules'
const distFolder = 'dist'
const srcFilesPattern = './src/**/*.js'
const testFilesPattern = './test/**/*.js'
let isProduction = (argv.production === undefined) ? false : true;

gulp.task('lint', () => {
  gulp.src([
      srcFilesPattern,
      testFilesPattern
    ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true,
      showRuleNames: true
    }))
})

gulp.task('build', () => {
  let jsPipe = gulp.src('./src/widget.js')
    .pipe(webpack())
    .pipe(babel({
      presets: ['es2015']
    }))
  if (!isProduction) {
    jsPipe = jsPipe.pipe(sourcemaps.init())
  }
  jsPipe = jsPipe.pipe(concat(`widget-${pckg.version}.js`))
  if (isProduction) {
    jsPipe = jsPipe.pipe(uglify())
  }
  else{
    jsPipe = jsPipe.pipe(sourcemaps.write())
  }
  return jsPipe.pipe(gulp.dest(`./${distFolder}/js`))
    .pipe(notify('JS processed'))
})

gulp.task('watch', ['lint', 'build'], () => {
  gulp.watch(srcFilesPattern, ['build'])
  gulp.watch([srcFilesPattern, testFilesPattern], ['lint'])
})

gulp.task('clean', () => {
  return del([`./${distFolder}`])
})

gulp.task('default', ['clean'], () =>{
  gulp.start('lint')
  gulp.start('build')
})
