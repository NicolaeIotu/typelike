import { typelike, typelikeCustom } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('Test typelike', async (t) => {
  await t.test('Throw',() => {
    assert.throws(() => typelike({}))
  })

  await t.test('Fail',() => {
    assert.ok(!typelike({}, []))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike({}, { a: 4 }))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike({ a: 4 }, {}))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike(new Map(), new Set()))
  })

  await t.test('Ok',() => {
    assert.ok(typelike(new Map(), new Map()))
  })
  await t.test('Ok',() => {
    assert.ok(typelike({}, {}))
  })
  await t.test('Ok',() => {
    assert.ok(typelike(new Set(), new Set()))
  })
  await t.test('Ok',() => {
    assert.ok(typelike(1, 2323))
  })
  await t.test('Ok',() => {
    assert.ok(typelike(true, false))
  })
})

test('Test typelikeCustom', async (t) => {
  await t.test('Throw',() => {
    assert.throws(() => typelikeCustom({}, []))
  })
})
