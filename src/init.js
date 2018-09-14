const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer');

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
          createProjectFiles(projectPath)
        }
      }else {
        console.log('请输入项目名称')
      }
    })
  }
  // 文件不存在，直接创建。
  else {
    fs.mkdirSync(projectPath)
    createProjectFiles(projectPath)
  }
}

/**
 * 创建文件夹后进行创建文件的东西
 */
function createProjectFiles() {

}