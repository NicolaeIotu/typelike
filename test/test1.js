import { typelike } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const testObject = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  arr: [[1, 'xyz'], 'abc']
}

const templateObject = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

test('Test typelike', async (t) => {
  await t.test('Ok',() => {
    assert.ok(typelike(testObject, templateObject))
  })
})
