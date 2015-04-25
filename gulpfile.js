var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('clean', function(cb) {
  return del('dist/**', cb);
});

gulp.task('test-html', function(cb) {
  return gulp.src(['test/**'])
    .pipe(gulp.dest('dist'));
});

gulp.task('font', function() {
  return gulp.src('lib/font/**/*')
    .pipe(gulp.dest('dist/font'));
});

gulp.task('scss', function() {
  return gulp.src('lib/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function(cb) {
  runSequence(
    ['clean'], ['font', 'scss', 'test-html', 'watch-test'],
    cb
  );
});

gulp.task('watch', function() {
  gulp.watch('lib/scss/**/*.scss', ['scss']);
});

gulp.task('watch-test', function() {
  gulp.watch('lib/scss/**/*.scss', ['scss']);
  gulp.watch(['test/**'], ['test-html']);
});

gulp.task('build', function(cb) {
  runSequence(
    ['clean'], ['clean', 'font', 'scss', 'watch'],
    cb
  );
});

gulp.task('default', ['build']);
