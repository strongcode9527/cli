const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const inquirer = require('inquirer')

module.exports = function(args) {
  
 createProjectDir(args[0])
  
}


function pathIsExit(projectName) {
  return fs.existsSync(path.resolve(process.cwd(), `./${projectName}`))
}


/**
 * 
 * @param {String} projectName 命令行新建项目的名称。
 * @returns {String} 返回新建的文件夹的绝对路径
 */
function createProjectDir(projectName) {
  let projectPath = path.resolve(process.cwd(), `./${projectName}`)
  // 如果文件已经存在。
  if(pathIsExit(projectName)) {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'cm',
        message: `项目 ${projectName} 已存在,您还要继续创建吗!`,

      },
      {
        type: 'input',
        name: 'name',
        message: '项目的名称是：',
        when: function(answers) {
          if(answers.cm) {
            return true
          }
          return false
        }
      }
    ]
  ).then((answers) => {
    let projectPath = path.resolve(process.cwd(), `./${answers.name}`)
      if(answers.cm && answers.name) {
        if(pathIsExit(answers.name)) {
          console.log('项目已存在,请重新创建项目')
          process.exit(0)
          return
        }else {
          fs.mkdirSync(projectPath)
          createProjectFiles(projectPath, projectName)
        }
      }else {
        console.log('请输入项目名称')
      }
    })
  }
  // 文件不存在，直接创建。
  else {
    fs.mkdirSync(projectPath)
    createProjectFiles(projectPath, projectName)
  }
}

/**
 * 创建文件夹后进行创建文件的东西
 */
function createProjectFiles(projectPath, projectName) {
  copyDir(path.resolve(__dirname, './templates'), projectPath, projectName, function(err){
    if(err){
      console.log(err);
    }
  })
}

function copyDir(src, dist, projectName, callback) {
  fs.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            
            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                  if(path === 'package.json') {
                    shell.echo('初始化依赖包，请稍后。。。。')
                    shell.exec(`cd ${dist} && npm install`, function() {
                      shell.echo('您的项目构建完成, 使用以下命令行进行项目开发')
                      shell.echo(`cd ${projectName} && npm start`)
                    })
                  }
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}