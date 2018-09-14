const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer');
const chalk = require('chalk')
module.exports = function(args) {
  
  const projectDir = createProjectDir(args[0])
  // console.log('resolve', projectDir)
}

/**
 * 
 * @param {String} projectName 命令行新建项目的名称。
 * @returns {String} 返回新建的文件夹的绝对路径
 */
function createProjectDir(projectName) {
  const currentDir = process.cwd()
  let projectPath = path.resolve(currentDir, `./${projectName}`)
  const dirIsExit = fs.existsSync(projectPath)

  if(dirIsExit) {
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
      console.log('结果为:')
      console.log(answers)
    })
  }else {

  }

  // console.log('in init ', currentDir, projectName, fs.existsSync(projectPath))
  return projectPath
}