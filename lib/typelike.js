'use strict'

/**
 * @license
 * typelike module
 *
 * Copyright (c) 2020-2024 Iotu Nicolae, nicolae.g.iotu@link133.com
 * Licensed under the terms of the MIT License (MIT)
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

const hasOwnProperty = Object.prototype.hasOwnProperty

// inline xtypeof module
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
    allowMissing: false,
    allowNull: false
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
    return (xtypeof(o) === xtypeof(t) || (typelikeSettings.properties.allowNull && xtypeof(o) === 'null'))
  }
}

/**
 * @preserve
 * @typedef {object} TypeLikeSettingsProperties
 * @property {boolean} allowMissing
 * @property {boolean} allowNull
 */

/**
 * @preserve
 * @typedef {object} TypeLikeSettings
 * @property {number} maxDepth
 * @property {TypeLikeSettingsProperties} properties
 */

/**
 * With **typelike** you can reliably determine if an object resembles other template object(s) used as reference.<br>
 * The comparison is done using the keys and the type of data where applicable.<br>
 * **typelike** iterates as deeply as possible any arrays, objects, maps and sets, while taking into account the
 * standard settings:
 * ```
 * {
 *     maxDepth: 0,
 *     properties: {
 *         allowMissing: false,
 *         allowNull: false
 *     }
 * }
 * ```
 * For type checking **typelike** uses
 * <a href="https://github.com/NicolaeIotu/xtypeof" title="xtypeof" target="_blank">**xtypeof**</a> which is
 * included as part of the application.<br>
 * @param {object} obj A test object to match against the template(s).
 * @param {object} templates Templates are trusted objects. The test object `obj` must match in depth the types of
 * these templates.
 * @returns {boolean} **true** if the target object `obj` matches any of the templates provided, or **false** otherwise
 * @version 0.3.8
 * @license Apache-2.0
 * @author Nicolae Iotu <nicolae.g.iotu@gmail.com>
 * @exports typelike
 * @example
 * const { typelike } = require('typelike')
 * const testObject = {
 *     lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
 *     arr: [[1, 'xyz'], 'abcdef']
 * }
 * const templateObject = {
 *     lvl1: { lvl2: [3, 4, 212], sm: '' },
 *     arr: [[44, ''], '']
 * }
 * console.log(typelike(testObject, templateObject)) // true
 * @example
 * // Using multiple templates with typelike
 * const { typelike } = require('typelike')
 * const testObject = {
 *     lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
 *     arr: [[1, 'xyz'], 'abcdef']
 * }
 * const template1 = {
 *     lvl1: {
 *         lvl2: {
 *             lvl3: {
 *                 lvl4: {
 *                     item1: [1, 2, 3],
 *                     item2: true
 *                 }
 *             }
 *         }
 *     },
 *     arr: [[1, 'xyz'], 'abcdef'],
 *     basic: 'test'
 * }
 * const template2 = {
 *     lvl1: { sm: 'type ... like' },
 *     arr: [[1], 'abcdef']
 * }
 * const template3 = {
 *     lvl1: { lvl2: [3, 4, 212], sm: '' },
 *     arr: [[44, ''], '']
 * }
 * console.log(typelike(testObject, template1, template2)) // false
 * console.log(typelike(testObject, template1, template2, template3)) // true
 */
export function typelike (obj, templates) {
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

/**
 * **typelikeCustom** behaves in the same way as {@link typelike}, but expects that the last parameter
 * passed to
 * be a special settings object which is mandatory and has the following default format for standard
 * {@link typelike} calls:
 * ```
 * {
 *     maxDepth: 0,
 *     properties: {
 *         allowMissing: false,
 *         allowNull: false
 *     }
 * }
 *```
 *
 * The comparison is done using the keys and the type of data where applicable.<br>
 * **typelikeCustom** iterates as deeply as possible any arrays, objects, maps and sets, while taking into account the
 * settings.
 * For type checking **typelikeCustom** uses
 * <a href="https://github.com/NicolaeIotu/xtypeof" title="xtypeof" target="_blank">**xtypeof**</a> which is
 * included as part of the application.<br>
 * @param {object} obj A test object to match against the template(s).
 * @param {object} templates Templates are trusted objects. The test object `obj` must match in depth the types of
 * these templates.
 * @param {TypeLikeSettings|object} settings The settings object to be used for this call only.
 * @returns {boolean} **true** if the target object `obj` matches any of the templates provided, or **false** otherwise
 * @version 0.3.8
 * @license Apache-2.0
 * @author Nicolae Iotu <nicolae.g.iotu@gmail.com>
 * @exports typelikeCustom
 * @example
 * const { typelikeCustom } = require('typelike')
 * const testObject = {
 *     lvl1: { sm: 'type ... like' },
 *     arr: [[1], 'abcdef']
 * }
 * const templateObject = {
 *     lvl1: { lvl2: [3, 4, 212], sm: '' },
 *     arr: [[44, ''], '']
 * }
 * const settings = {
 *     maxDepth: 3,
 *     properties: {
 *         allowMissing: true,
 *         allowNull: true
 *     }
 * }
 * console.log(typelikeCustom(testObject, templateObject, settings)) // true
 */
export function typelikeCustom (obj, templates, settings) {
  const lastIndex = arguments.length - 1
  if (lastIndex < 2) {
    throw new Error('At least three parameters required.')
  }
  typelikeSettings = arguments[lastIndex]
  return typelike.apply(null, Array.from(arguments).filter(
    function (e, i) {
      return (i !== lastIndex)
    }))
}
