var inquirer = require('inquirer')
inquirer.registerPrompt('multiInput', require('../src/lib/multiInput.js'))

inquirer.prompt([{
  type: 'multiInput',
  name: 'multiInput',
  message: 'Which Keywords do you want to pass'
}]).then(function (answers) {
  console.log(JSON.stringify(answers, null, ' '))
})
