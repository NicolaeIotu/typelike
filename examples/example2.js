const { typelike } = require('../lib/typelike')

function contentGenerator () {
  // ...
  return {
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
}

const testObject = contentGenerator()

const templateObject = {
  lvl1: {
    lvl2: {
      lvl3: {
        lvl4: {
          item1: [44, 66, 88],
          item2: false
        }
      }
    }
  },
  arr: [[45, 'sample'], String('string')],
  basic: 'test'
}

console.log(typelike(testObject, templateObject)) // true
