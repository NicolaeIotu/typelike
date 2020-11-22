const { typelikeCustom } = require('../lib/typelike')

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

console.log(typelikeCustom(testObject, templateObject, settings)) // true
