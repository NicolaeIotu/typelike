import { typelikeCustom } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

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

test('Test typelikeCustom', async (t) => {
  await t.test('Ok',() => {
    assert.ok(typelikeCustom(testObject, templateObject, settings))
  })
})
