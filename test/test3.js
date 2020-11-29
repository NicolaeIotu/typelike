const tap = require('tap')
const { typelikeCustom } = require(`${process.cwd()}/lib/typelike`)

const testObject = {
  lvl1: { sm: 'type ... like' },
  arr: [[1], 'abcdef']
}

const templateObject = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

const settings = {
  maxDepth: 3,
  properties: {
    allowMissing: true
  }
}

tap.ok(typelikeCustom(testObject, templateObject, settings))
