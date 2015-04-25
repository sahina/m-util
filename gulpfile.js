var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
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

gulp.task('test', function (cb) {
  runSequence(
    ['clean'], ['font', 'scss', 'test-assets', 'bundle', 'watch-test'],
    cb
  );
});

gulp.task('watch', function () {
  gulp.watch('lib/scss/**/*.scss', ['scss']);
  gulp.watch('lib/js/**/*.js', ['bundle']);
});

gulp.task('watch-test', function () {
  gulp.watch('lib/scss/**/*.scss', ['scss']);
  gulp.watch(['test/**', 'index.html'], ['test-assets']);
});

gulp.task('bundle', function (cb) {
  var Builder = require('systemjs-builder');
  var builder = new Builder({
    sourceMaps: true,
    transpiler: 'babel'
  });

  builder.loadConfig('./jspm.config.js')
    .then(function () {

      builder.config({baseURL: 'file:' + process.cwd()});
      builder.build('lib/js/bootstrap', 'dist/bundle.js')
        .then(function () {
          return cb();
        })
        .catch(function (ex) {
          console.log(ex);
          cb(new Error(ex));
        });
    });
});

gulp.task('build', function (cb) {
  runSequence(
    ['clean'], ['font', 'scss', 'bundle', 'watch'],
    cb
  );
});

gulp.task('default', ['build']);