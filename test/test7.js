const tap = require('tap')
const { typelikeCustom } = require(`${process.cwd()}/lib/typelike`)

const testObject = {
  lvl1: null
}

const templateObject1 = {
  lvl1: 1
}

tap.ok(typelikeCustom(testObject, templateObject1, {
  properties: {
    allowMissing: false,
    allowNull: true
  }
}))
