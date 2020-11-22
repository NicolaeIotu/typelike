const { typelike } = require('../lib/typelike')

const testObject = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  arr: [[1, 'xyz'], 'abcdef']
}

const templateObject = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

console.log(typelike(testObject, templateObject)) // true
