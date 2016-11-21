var inquirer = require('inquirer')
inquirer.registerPrompt('directory', require('../src/lib/multiDir.js'))

inquirer.prompt([{
  type: 'multiDir',
  name: 'multiDir',
  message: 'Which directories do you want to include',
  basePath: './'
}], function (answers) {
  console.log(JSON.stringify(answers, null, '  '))
})
