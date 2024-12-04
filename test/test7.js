import { typelikeCustom } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const testObject = {
  lvl1: null
}

const templateObject1 = {
  lvl1: 1
}

test('Test typelikeCustom', async (t) => {
  await t.test('Ok',() => {
    assert.ok(typelikeCustom(testObject, templateObject1, {
      properties: {
        allowMissing: false,
        allowNull: true
      }
    }))
  })
})
