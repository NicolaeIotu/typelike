const { typelike } = require('../lib/typelike')

const st1 = new Set()
st1.add(1)
st1.add('abc')
st1.add([1, 2, 'def'])

const st2 = new Set()
st2.add(0)
st2.add('')
st2.add([0, 0, ''])

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
    b: 2
  }
})

console.log(typelike(mp1, mp2)) // true
