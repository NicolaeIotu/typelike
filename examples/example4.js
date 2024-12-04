const { typelike } = require('../lib/typelike')

const testObject = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  arr: [[1, 'xyz'], 'abcdef']
}

const templateObject1 = {
  lvl1: {
    lvl2: {
      lvl3: {
        lvl4: {
          item1: [1, 2, 3],
          item2: true
        }
      }
    }
  },
  arr: [[1, 'xyz'], 'abcdef'],
  basic: 'test'
}
const templateObject2 = {
  lvl1: { sm: 'type ... like' },
  arr: [[1], 'abcdef']
}
const templateObject3 = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

console.log(typelike(testObject, templateObject1, templateObject2)) // false
console.log(typelike(testObject, templateObject1, templateObject2, templateObject3)) // true
