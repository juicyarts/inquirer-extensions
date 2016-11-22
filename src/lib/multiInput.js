var util = require('util')
var chalk = require('chalk')
var cliCursor = require('cli-cursor')
var Base = require('inquirer/lib/prompts/base')
var observe = require('inquirer/lib/utils/events')
var Paginator = require('inquirer/lib/utils/paginator')
var Choices = require('inquirer/lib/objects/choices')
var Choice = require('inquirer/lib/objects/choice')
var Separator = require('inquirer/lib/objects/separator')
var figures = require('figures')
var _ = require('lodash')

/** export */
module.exports = Prompt

/**
 * Construtct
 */
function Prompt () {
  Base.apply(this, arguments)

  this.pointer = 0
  this.paginator = new Paginator()
  this.opt.default = null
}
util.inherits(Prompt, Base)

/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */
Prompt.prototype._run = function (cb) {
  this.done = cb

  var events = observe(this.rl)
  var keyDown = events.keypress.filter(function (evt) {
    return evt.key.name === 'down'
  }).share()
  var keyPress = events.keypress.filter(function (evt) {
    return evt.key.name !== 'down'
  }).share()

  var submit = events.line.map(this.filterInput.bind(this))
  var validation = this.handleSubmitEvents(submit)

  validation.success.forEach(this.onEnd.bind(this))
  validation.error.forEach(this.onError.bind(this))

  keyDown.takeUntil(validation.success).forEach(this.onAddKey.bind(this))
  keyPress.takeUntil(validation.success).forEach(this.onKeypress.bind(this))

  cliCursor.hide()
  this.render()

  return this
}

/**
 * Render the prompt to screen
 * @return {Prompt} self
 */
Prompt.prototype.render = function (error) {
  var bottomContent = ''
  var message = this.getQuestion()

  if (this.status === 'answered') {
    message += chalk.cyan(this.answer)
  } else {
    if (this.opt.choices && this.opt.choices.length > 0) {
      var choicesStr = renderValues(this.opt.choices, this.pointer)
      message += '\n' + this.paginator.paginate(choicesStr, this.opt.pageSize)
    }
    message += chalk.dim('\n( Press', chalk.cyan(figures.arrowDown), 'to add argument to list )')
    message += chalk.dim('\n( Press', chalk.cyan('enter'), 'to complete )')
    if (this.emptyAddition) {
      message += chalk.red('\nYou need to pass an argument or complete the process')
    }
    message += '\n'
    message += chalk.blue('>> ') + this.rl.line
  }
  if (error) {
    bottomContent = chalk.red('>> ') + error
  }

  this.screen.render(message, bottomContent)
}

Prompt.prototype.validate = function () {}

/**
 * When user press `enter` key
 */
Prompt.prototype.filterInput = function (input) {
  if (input && input.length > 0) {
    var ob = {
      value: input
    }
    this.onAddKey(ob)
  } else {
    return []
  }
}

/** Filter fn */
Prompt.prototype.filter = function (input) {
  var self = this
  if (this.opt.filter()) {
    return _.filter(input, function (o) {
      return o.match(self.opt.filter())
    })
  }
  return input
}

Prompt.prototype.onEnd = function (state) {
  var choices = this.opt.choices && this.opt.choices ? _.map(this.opt.choices, function (input) {
    if (input && input.name) { return input.name }
  }) : ''

  var realChoices = this.opt.choices && this.opt.choices.realChoices ? _.map(this.opt.choices.realChoices, function (input) {
    if (input && input.name) { return input.name }
  }) : ''

  if (realChoices || choices) {
    this.answer = realChoices ? this.filter(realChoices) : this.filter(choices)
  } else {
    this.answer = state.value
  }

  this.status = 'answered'

  this.render()
  this.screen.done()
  this.done(this.answer)
}

Prompt.prototype.onError = function (state) {
  this.render(state.isValid)
}

/**
 * When user press a key
 */
Prompt.prototype.onKeypress = function () {
  this.render()
}

/** when user presses arrow down */
Prompt.prototype.onAddKey = function (input) {
  var newInput = this.rl.line
  if(!newInput){
    newInput = input.value
  }
  if (newInput) {
    this.emptyAddition = false
    this.choices = this.choices || []
    if (!this.opt.choices) {
      this.choices.push(new Choice(this.rl.line || newInput, this.answers))
      this.choices.push(new Separator())
      this.opt.choices = new Choices(this.choices, this.answers)
    } else {
      this.choices.unshift(new Choice(this.rl.line || newInput, this.answers))
      this.opt.choices = new Choices(this.choices, this.answers)
    }
    this.rl.clearLine()
  } else {
    this.emptyAddition = true
  }
  this.onKeypress()
}

/**
 * render Values
 * @param {Array} choices
 * @param {any} pointer
 * @returns
 */
function renderValues (choices) {
  var output = ''
  choices.forEach(function (choice, i) {
    if (choice.type === 'separator') {
      output += ' ' + choice + '\n'
      return
    }
    output += chalk.cyan(figures.pointer)
    output += ' ' + choice.name
    output += '\n'
  })
  return output.replace(/\n$/, '')
}
