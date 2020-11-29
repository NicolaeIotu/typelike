const tap = require('tap')
const { typelike, typelikeCustom } = require(`${process.cwd()}/lib/typelike`)

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

/// tests
tap.notOk(typelike(st1, st3))

tap.ok(typelike(mp1, mp2))
tap.notOk(typelike(mp1, mp3))
tap.notOk(typelike(mp1, mp4))

tap.notOk(typelikeCustom(mp1, mp5, {
  properties: {
    allowMissing: true
  }
}))

tap.notOk(typelikeCustom(mp1, mp5, {
  properties: {
    allowMissing: false
  }
}))

tap.notOk(typelike(mp1, mp6))
