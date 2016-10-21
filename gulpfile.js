const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const runSeq = require('run-sequence');
const del     = require('del');

const files = {
  styles: 'src/styles/*.scss',
  js: [
    'bower_components/jquery/dist/jquery.js',
    'src/js/*.js'
  ]
}

gulp.task('default', [
  'clean',
  'styles',
  'js',
  'watch'
]);

gulp.task('heroku:production', function() {
  runSeq('clean','styles','js','watch')
})

gulp.task('watch', function(){
  
  gulp.watch(files.styles, ['styles']);
  gulp.watch(files.js, ['js']);
  
});

gulp.task('styles', function() {
  
  gulp.src(files.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/styles'));
  
});

gulp.task('js', function() {
  
  gulp.src(files.js)
    .pipe(concat('javascript.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  
});

gulp.task('clean', function() { 
  del.sync(['dist']);
});