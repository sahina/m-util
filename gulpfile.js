var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function (cb) {
  return del('dist/**', cb);
});

gulp.task('test-assets', function () {
  return gulp.src(['test/**'])
    .pipe(gulp.dest('dist'));
});

gulp.task('font', function () {
  return gulp.src('lib/font/**/*')
    .pipe(gulp.dest('dist/font'));
});

gulp.task('scss', function () {
  return gulp.src('lib/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
  var vendor = [
    'lib/vendor/waves/src/js/waves.js'
  ];

  return gulp.src(vendor)
    .pipe(concat('m-util.js'))
    .pipe(gulp.dest('dist'));

});

gulp.task('test', function (cb) {
  runSequence(
    ['clean'], ['font', 'scss', 'test-assets', 'watch-test'],
    cb
  );
});

gulp.task('watch', function () {
  gulp.watch('lib/scss/**/*.scss', ['scss']);
});

gulp.task('watch-test', function () {
  gulp.watch('lib/scss/**/*.scss', ['scss']);
  gulp.watch(['test/**', 'index.html'], ['test-assets']);
});

gulp.task('build', function (cb) {
  runSequence(
    ['clean'], ['font', 'scss'],
    cb
  );
});

gulp.task('serve', ['build', 'watch']);
gulp.task('default', ['build']);