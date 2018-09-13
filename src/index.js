const init = require('./init')

module.exports =  function(args) {
  const instruction = args[0]

  if(instruction === 'start') {
    console.log('in start')
  }else if(instruction === 'build'){
    console.log('in build')
  }else {
    init(args)
  }
} 
