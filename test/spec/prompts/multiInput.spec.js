var expect = require('chai').expect
var _ = require('lodash')
var ReadlineStub = require('../../helpers/readline')
var fixtures = require('../../helpers/fixtures')

var MultiInput = require('../../../src/lib/multiInput')

var fixture, rl, multiInput, prompt, promise

describe('`multiInput` prompt', function () {
  beforeEach(function () {
    fixture = _.clone(fixtures.multiInput)
    rl = new ReadlineStub()
  })

  it('should return empty array when nothing given', function () {
    multiInput = new MultiInput(fixture, rl)

    multiInput.run().then(function (answer) {
      expect(answer).eql([])
      done()
    })
    rl.emit('line', '')
  })

  it('should return array with single argument, if just one is given', function (done) {
    multiInput = new MultiInput(fixture, rl)

    multiInput.run().then(function (answer) {
      expect(answer).eql(['Foo'])
      done()
    })

    rl.emit('line', 'Foo')
  })

  it('should return empty array if no value matches the filter', function (done) {
    fixture.filter = function () {
      return 'quux'
    }
    multiInput = new MultiInput(fixture, rl)

    multiInput.run().then(function (answer) {
      expect(answer).eql([])
      done()
    })
    rl.emit('line', 'foo')
    rl.emit('line', 'bar')
    rl.emit('line', 'baz')
  })

  it('should return filtered array', function (done) {
    fixture.filter = function () {
      return 'bar'
    }
    multiInput = new MultiInput(fixture, rl)

    multiInput.run().then(function (answer) {
      expect(answer).eql(['barbara', 'bar', 'foobar'])
      done()
    })

    rl.emit('line', 'foo')
    rl.emit('line', 'foobar')
    rl.emit('line', 'bar')
    rl.emit('line', 'barbara')
    rl.emit('line', 'baz')
  })

  it('should return array of values', function (done) {
    multiInput = new MultiInput(fixture, rl)

    multiInput.run().then(function (answer) {
      expect(answer).eql(['baz', 'bar', 'foo'])
      done()
    })

    rl.emit('line', 'foo')
    rl.emit('line', 'bar')
    rl.emit('line', 'baz')
  })
  afterEach(function () {
    rl.output.clear()
  })
})
