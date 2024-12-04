import { typelikeCustom } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const testObject = {
  lvl1: 1
}

const templateObject1 = {
  lvl1: 2
}

const templateObject2 = {
  c: ''
}

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
      properties: {
        allowMissing: false
      }
    }))
  })
})
