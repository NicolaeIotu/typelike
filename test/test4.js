import { typelike, typelikeCustom } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

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

test('Test typelike', async (t) => {
  await t.test('Fail',() => {
    assert.ok(!typelike(testObject, templateObject1, templateObject2))
  })
  await t.test('Ok',() => {
    assert.ok(typelike(testObject, templateObject1, templateObject2, templateObject3))
  })
})

test('Test typelike', async (t) => {
  await t.test('Fail',() => {
    assert.ok(!typelike(testObject, templateObject1, templateObject2))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike(testObject, templateObject4))
  })
  await t.test('Ok',() => {
    assert.ok(typelike(testObject, templateObject1, templateObject2, templateObject3))
  })
})

test('Test typelikeCustom', async (t) => {
  await t.test('Fail',() => {
    assert.ok(!typelikeCustom(testObject, templateObject2, {
      properties: {
        allowMissing: false
      }
    }))
  })
  await t.test('Ok',() => {
    assert.ok(typelikeCustom(testObject, templateObject1, {
      maxDepth: 1,
      properties: {
        allowMissing: true
      }
    }))
  })
})
