var gulp = require('gulp');
var shell = require('shelljs')
gulp.task('default', function() {
  // 初始化进行第一次运行
  shell.exec('strong project')

  // 监控文件进行热更新代码
  gulp.watch('./src/*.js', function() {
    shell.exec('strong project')
  })
});