'use strict'

/* typelike is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
limitations under the License.

Author Nicolae Iotu, nicolae.g.iotu@gmail.com */

const hasOwnProperty = Object.prototype.hasOwnProperty

// xtypeof module
function xtypeof (o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}

function iterationType (o) {
  switch (xtypeof(o)) {
    case 'object':
    case 'array':
      return 3
    case 'map':
      return 2
    case 'set':
      return 1
    default:
      return 0
  }
}

const templateSettings = {
  maxDepth: 0,
  properties: {
    allowMissing: false
  }
}

let typelikeSettings = templateSettings
let rtDepth = 0

const resetOptions = function () {
  typelikeSettings = templateSettings
  rtDepth = 0
}

function compare (o, t) {
  const it = iterationType(o)
  if (it !== 0) {
    // depth checks
    if (typelikeSettings.maxDepth !== 0) {
      rtDepth++
      if (rtDepth > typelikeSettings.maxDepth) {
        return true
      }
    }

    if (it === 3) {
      for (const k in o) {
        if (hasOwnProperty.call(t, k + '')) {
          if (!compare(o[k], t[k])) {
            return false
          }
        } else if (!typelikeSettings.properties.allowMissing) {
          // allowMissing logic
          return false
        }
      }
    } else {
      // Map and Set logic
      const oKeysSize = o.size
      if (!typelikeSettings.properties.allowMissing && oKeysSize !== t.size) {
        return false
      } else {
        const oKeysIterator = o.keys()
        const tKeysIterator = t.keys()
        if (it === 1) {
          // sets
          for (let i = 0; i < oKeysSize; i++) {
            if (!compare(oKeysIterator.next().value, tKeysIterator.next().value)) {
              return false
            }
          }
        } else {
          // maps
          const oValuesIterator = o.values()
          const tValuesIterator = t.values()
          for (let i = 0; i < oKeysSize; i++) {
            if (oKeysIterator.next().value === tKeysIterator.next().value) {
              if (!compare(oValuesIterator.next().value, tValuesIterator.next().value)) {
                return false
              }
            } else {
              return false
            }
          }
        }
      }
    }

    // depth logic
    if (typelikeSettings.maxDepth !== 0) {
      rtDepth--
    }

    return true
  } else {
    return xtypeof(o) === xtypeof(t)
  }
}

module.exports.typelike = function (obj, templates) {
  const lastindex = arguments.length - 1
  if (lastindex < 1) {
    throw new Error('At least two parameters required.')
  }

  let result = false
  for (let i = 1; i <= lastindex; i++) {
    result = result || compare(obj, arguments[i])
  }

  // important! reset options
  resetOptions()

  return result
}

// this form assumes that the last object is a settings object
module.exports.typelikeCustom = function (obj) {
  const lastindex = arguments.length - 1
  if (lastindex < 2) {
    throw new Error('At least three parameters required.')
  }
  typelikeSettings = arguments[lastindex]
  return module.exports.typelike.apply(null, Array.from(arguments).filter(
    function (e, i) {
      return i !== (lastindex)
    }))
}
