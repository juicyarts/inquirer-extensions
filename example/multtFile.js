var inquirer = require('inquirer')
inquirer.registerPrompt('multiFile', require('../src/inquirer-extensions').multiFile)

inquirer.prompt([{
  type: 'multiFile',
  name: 'multiFile',
  message: 'Which Files do you want to include',
  basePath: './'
}], function (answers) {
  console.log(JSON.stringify(answers, null, '  '))
})
