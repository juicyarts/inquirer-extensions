var inquirer = require('inquirer')
inquirer.registerPrompt('directory', require('../src/lib/multiFile.js'))

inquirer.prompt([{
  type: 'multiFile',
  name: 'multiFile',
  message: 'Which Files do you want to include',
  basePath: './'
}], function (answers) {
  console.log(JSON.stringify(answers, null, '  '))
})
