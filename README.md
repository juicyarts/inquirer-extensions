# WIP | inquirer-extensions [![Build Status](https://travis-ci.org/juicyarts/inquirer-extensions.svg?branch=master)](https://travis-ci.org/juicyarts/inquirer-extensions) <a href="https://codeclimate.com/github/juicyarts/inquirer-extensions/coverage"><img src="https://codeclimate.com/github/juicyarts/inquirer-extensions/badges/coverage.svg" /></a>

Work in progress. This repos main purpose is to provide extensions for [inquirer](https://www.npmjs.com/package/inquirer).

# Documentation

### inquirer-extension-multiInput
This plugin allows you to define a multi Input prompt.

#### Implementation

```javascript
inquirer.registerPrompt('multiInput', require('../src/inquirer-extensions').multiInput)
inquirer.prompt([{
  type: 'multiInput',
  name: 'multiInput',
  message: 'Which Keywords do you want to pass'
}]).then(function (answers) {
  console.log(JSON.stringify(answers, null, ' '))
  // outputs array of answers like this if you input
  // wow ↓
  // much ↓
  // multi ↓
  // such ↓
  // ↵
  // {
  //  "multiInput": [
  //    "such",
  //    "multi",
  //    "much",
  //    "wow"
  //  ]
  // }
  //
})
```

#### Key-Bindings
| Key |  Condition | Action|
|:-----:|:-----------|:-------|
| <kbd>Enter ↵</kbd>| without input | returns an empty array
| value <kbd>Enter↵</kbd> | with input | returns an array with the given argument as string
| <kbd>Arrow-Down ↓</kbd>| without input | prompts an info
| value <kbd>Arrow-Down ↓</kbd> | with input | adds value to an array of strings
| <kbd>Enter ↵</kbd> | when finished | inputs returns array of given values as strings

#### Preview
[![asciicast](https://asciinema.org/a/93737.png)](https://asciinema.org/a/93737)

#### Up Next / Todos
* Paginator is currentliy fixed to 8 elements, make this scrollable between separators 
    * maybe like in vim via ctrl+v => visual mode, keys=>navigation
* Make previous choices removable/(editable?) in visual mode
* allow reordering/sorting?

-------

### inquirer-extension-multiDir (in Progress)
This plugin allows you to define a multiple Directory prompt with autocompletion.

#### Implementation


#### Key-Bindings

| Key |  Condition | Action|
|:-----:|:-----------|:-------|
| <kbd>Tab ↹</kbd>|  | autocompletion
| <kbd>Enter ↵</kbd>| without input | returns an empty array
| value <kbd>Enter↵</kbd> | with input | returns an array with the given argument as string
| <kbd>Arrow-Down ↓</kbd>| without input | prompts an info
| value <kbd>Arrow-Down ↓</kbd> | with input | adds value to an array of strings
| <kbd>Enter ↵</kbd> | when finished | inputs returns array of given values as strings

