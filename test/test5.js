import { typelike, typelikeCustom } from '../lib/typelike.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const st1 = new Set()
st1.add(1)
st1.add('abc')
st1.add([1, 2, 'def'])

const st2 = new Set()
st2.add(0)
st2.add('')
st2.add([0, 0, ''])

const st3 = new Set()
st3.add('a')
st3.add('b')
st3.add(0)

const mp1 = new Map()
mp1.set('k1', {
  kk1: st1,
  kk2: {
    a: BigInt(1),
    b: false
  }
})

const mp2 = new Map()
mp2.set('k1', {
  kk1: st2,
  kk2: {
    a: BigInt('12345678901234567890'),
    b: true
  }
})

const mp3 = new Map()
mp3.set('k2', {
  kk1: st3,
  kk2: {
    a: BigInt('12345678901234567890'),
    c: 2
  }
})

const mp4 = new Map()
mp4.set('k4', {
  kk1: st3,
  kk2: {
    a: BigInt('12345678901234567890'),
    c: 2
  }
})
mp4.set('a1', [])

const mp5 = new Map()
const mp6 = new Map()
mp6.set('k1', 3)


test('Test typelike', async (t) => {
  await t.test('Fail',() => {
    assert.ok(!typelike(st1, st3))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike(mp1, mp3))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike(mp1, mp4))
  })
  await t.test('Fail',() => {
    assert.ok(!typelike(mp1, mp6))
  })
  await t.test('Ok',() => {
    assert.ok(typelike(mp1, mp2))
  })
})

test('Test typelikeCustom', async (t) => {
  await t.test('Fail',() => {
    assert.ok(!typelikeCustom(mp1, mp5, {
      properties: {
        allowMissing: true
      }
    }))
  })
  await t.test('Fail',() => {
    assert.ok(!typelikeCustom(mp1, mp5, {
      properties: {
        allowMissing: false
      }
    }))
  })
})
