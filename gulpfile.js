var gulp = require('gulp');
var shell = require('shelljs')
gulp.task('default', function() {
  gulp.watch('./src/*.js', function() {
    shell.exec('strong aaa')
  })
});