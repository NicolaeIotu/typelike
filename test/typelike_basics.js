const tap = require('tap')
const { typelike, typelikeCustom } = require('../lib/typelike')

tap.throws(() => {
  typelike({})
})

tap.throws(() => {
  typelikeCustom({}, [])
})
