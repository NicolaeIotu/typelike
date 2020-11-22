'use strict'

/* typelike is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com
Licensed under SPDX Apache-2.0, http://www.apache.org/licenses/LICENSE-2.0 */

console.log('Appending license section to ./dist files ...')
const { readdirSync, writeFileSync } = require('fs')

const licenseText = '\n/* typelike is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com\n' +
  'Licensed under SPDX Apache-2.0, http://www.apache.org/licenses/LICENSE-2.0 */\n'

readdirSync('./dist').filter((elem) => {
  return elem.match(/.js$/)
}).forEach((jsfile) => {
  writeFileSync(`./dist/${jsfile}`, licenseText, { flag: 'as' })
})

console.log('Done appending license section to ./dist files.')
