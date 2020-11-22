const tap = require('tap')
const { typelike, typelikeCustom } = require('../lib/typelike')

tap.throws(() => {
  typelike({})
})

tap.throws(() => {
  typelikeCustom({}, [])
})

tap.notOk(typelike({}, []))
tap.notOk(typelike({}, { a: 4 }))
tap.notOk(typelike({ a: 4 }, {}))
tap.ok(typelike({}, {}))

tap.ok(typelike(new Map(), new Map()))
tap.notOk(typelike(new Map(), new Set()))
tap.ok(typelike(new Set(), new Set()))

tap.ok(typelike(1, 2323))
tap.ok(typelike(true, false))
