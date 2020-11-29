/* typelike is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com
Licensed under SPDX Apache-2.0, http://www.apache.org/licenses/LICENSE-2.0 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.typelikeBundled = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      return 4
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
  const ito = iterationType(o)
  const itt = iterationType(t)

  if (ito !== itt) {
    return false
  }

  if (ito !== 0) {
    // depth checks
    if (typelikeSettings.maxDepth !== 0) {
      rtDepth++
      if (rtDepth > typelikeSettings.maxDepth) {
        return true
      }
    }

    if (ito >= 3) {
      const oSize = Object.keys(o).length
      const tSize = Object.keys(t).length
      if (!typelikeSettings.properties.allowMissing) {
        if (oSize === 0) {
          return oSize === tSize
        } else if (oSize !== tSize) {
          return false
        }
      }

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
      const oSize = o.size
      const tSize = t.size

      if (!typelikeSettings.properties.allowMissing) {
        if (oSize === 0) {
          return oSize === tSize
        } else if (oSize !== tSize) {
          return false
        }
      }

      const oKeysIterator = o.keys()
      const tKeysIterator = t.keys()
      if (ito === 1) {
        // sets
        for (let i = 0; i < oSize; i++) {
          if (!compare(oKeysIterator.next().value, tKeysIterator.next().value)) {
            return false
          }
        }
      } else {
        // maps
        const oValuesIterator = o.values()
        const tValuesIterator = t.values()
        for (let i = 0; i < oSize; i++) {
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
  const lastIndex = arguments.length - 1
  if (lastIndex < 1) {
    throw new Error('At least two parameters required.')
  }

  let result = false
  for (let i = 1; i <= lastIndex; i++) {
    result = result || compare(obj, arguments[i])
  }

  // important! reset options
  resetOptions()

  return result
}

// this form assumes that the last object is a settings object
module.exports.typelikeCustom = function (obj) {
  const lastIndex = arguments.length - 1
  if (lastIndex < 2) {
    throw new Error('At least three parameters required.')
  }
  typelikeSettings = arguments[lastIndex]
  return module.exports.typelike.apply(null, Array.from(arguments).filter(
    function (e, i) {
      return (i !== lastIndex)
    }))
}

},{}]},{},[1])(1)
});
