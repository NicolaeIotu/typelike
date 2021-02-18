'use strict'

/* typelike is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com
Licensed under SPDX Apache-2.0, http://www.apache.org/licenses/LICENSE-2.0 */

console.log('Inserting license section to ./dist files ...')
const { readdirSync, readFileSync, createWriteStream } = require('fs')

const licenseText = '/* typelike is Copyright (C) 2020-2021 Nicolae Iotu, nicolae.g.iotu@gmail.com\n' +
  'Licensed under SPDX Apache-2.0, http://www.apache.org/licenses/LICENSE-2.0 */\n'

readdirSync('./dist').filter((elem) => {
  return elem.match(/.js$/)
}).forEach((jsfile) => {
  const fc = readFileSync(`./dist/${jsfile}`)
  const ws = createWriteStream(`./dist/${jsfile}`, { start: 0, flag: 'as' })
  ws.write(licenseText)
  ws.write(fc)
  ws.close()
})

console.log('Done inserting license section to ./dist files.')
