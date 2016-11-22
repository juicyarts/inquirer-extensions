var inquirer = require('inquirer')
inquirer.registerPrompt('multiDir', require('../src/inquirer-extensions').multiDir)

inquirer.prompt([{
  type: 'multiDir',
  name: 'multiDir',
  message: 'Which directories do you want to include',
  basePath: './'
}], function (answers) {
  console.log(JSON.stringify(answers, null, '  '))
})
