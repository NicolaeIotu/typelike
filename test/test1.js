const tap = require('tap')
const { typelike } = require(`${process.cwd()}/lib/typelike`)

const testObject = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  arr: [[1, 'xyz'], 'abcdef']
}

const templateObject = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

tap.ok(typelike(testObject, templateObject))
