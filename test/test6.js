const tap = require('tap')
const { typelikeCustom } = require(`${process.cwd()}`)

const testObject = {
  lvl1: 1
}

const templateObject1 = {
  lvl1: 2
}

const templateObject2 = {
  c: ''
}

tap.ok(typelikeCustom(testObject, templateObject1, {
  properties: {
    allowMissing: false
  }
}))

tap.notOk(typelikeCustom(testObject, templateObject2, {
  properties: {
    allowMissing: false
  }
}))
