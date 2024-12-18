import { typelike } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

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

test('Test typelike', async (t) => {
  await t.test('Ok',() => {
    assert.ok(typelike(testObject, templateObject))
  })
})
