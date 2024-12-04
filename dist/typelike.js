"use strict";
/**
 * @license
 * typelike module
 *
 * Copyright (c) 2020-2024 Iotu Nicolae, nicolae.g.iotu@link133.com
 * Licensed under the terms of the MIT License (MIT)
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */const hasOwnProperty=Object.prototype.hasOwnProperty;function xtypeof(o){return Object.prototype.toString.call(o).slice(8,-1).toLowerCase()}function iterationType(o){switch(xtypeof(o)){case"object":return 4;case"array":return 3;case"map":return 2;case"set":return 1;default:return 0}}const templateSettings={maxDepth:0,properties:{allowMissing:!1,allowNull:!1}};let typelikeSettings=templateSettings,rtDepth=0;const resetOptions=function(){typelikeSettings=templateSettings,rtDepth=0};function compare(o,t){const ito=iterationType(o);if(ito!==iterationType(t))return!1;if(0!==ito){if(0!==typelikeSettings.maxDepth&&(rtDepth++,rtDepth>typelikeSettings.maxDepth))return!0;if(ito>=3){const oSize=Object.keys(o).length,tSize=Object.keys(t).length;if(!typelikeSettings.properties.allowMissing){if(0===oSize)return oSize===tSize;if(oSize!==tSize)return!1}for(const k in o)if(hasOwnProperty.call(t,k+"")){if(!compare(o[k],t[k]))return!1}else if(!typelikeSettings.properties.allowMissing)return!1}else{const oSize=o.size,tSize=t.size;if(!typelikeSettings.properties.allowMissing){if(0===oSize)return oSize===tSize;if(oSize!==tSize)return!1}const oKeysIterator=o.keys(),tKeysIterator=t.keys();if(1===ito){for(let i=0;i<oSize;i++)if(!compare(oKeysIterator.next().value,tKeysIterator.next().value))return!1}else{const oValuesIterator=o.values(),tValuesIterator=t.values();for(let i=0;i<oSize;i++){if(oKeysIterator.next().value!==tKeysIterator.next().value)return!1;if(!compare(oValuesIterator.next().value,tValuesIterator.next().value))return!1}}}return 0!==typelikeSettings.maxDepth&&rtDepth--,!0}return xtypeof(o)===xtypeof(t)||typelikeSettings.properties.allowNull&&"null"===xtypeof(o)}
/**
 * @preserve
 * @typedef {object} TypeLikeSettingsProperties
 * @property {boolean} allowMissing
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
 */exports.typelike=function(obj,templates){const lastIndex=arguments.length-1;if(lastIndex<1)throw new Error("At least two parameters required.");let result=!1;for(let i=1;i<=lastIndex;i++)result=result||compare(obj,arguments[i]);return resetOptions(),result}
/**
 * **typelikeCustom** behaves in the same way as {@link exports.typelike|typelike}, but expects that the last parameter
 * passed to
 * be a special settings object which is mandatory and has the following default format for standard
 * {@link exports.typelike|typelike} calls:
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
 * @param {TypeLikeSettings} settings The settings object to be used for this call only.
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
 */,exports.typelikeCustom=function(obj,templates,settings){const lastIndex=arguments.length-1;if(lastIndex<2)throw new Error("At least three parameters required.");return typelikeSettings=arguments[lastIndex],exports.typelike.apply(null,Array.from(arguments).filter((function(e,i){return i!==lastIndex})))};
