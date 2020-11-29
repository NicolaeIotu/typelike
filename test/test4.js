const tap = require('tap')
const { typelike, typelikeCustom } = require(`${process.cwd()}/lib/typelike`)

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
  basic: 'testtesttest'
}
const templateObject2 = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  b: [[1, 'xyz'], 'abcdef']
}
const templateObject3 = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

const templateObject4 = {
  lvl1: [],
  arr: 1
}

tap.notOk(typelike(testObject, templateObject1, templateObject2))
tap.ok(typelike(testObject, templateObject1, templateObject2, templateObject3))

tap.notOk(typelikeCustom(testObject, templateObject2, {
  properties: {
    allowMissing: false
  }
}))

tap.ok(typelikeCustom(testObject, templateObject1, {
  maxDepth: 1,
  properties: {
    allowMissing: true
  }
}))

tap.notOk(typelike(testObject, templateObject4))
