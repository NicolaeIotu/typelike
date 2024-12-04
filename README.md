![Actions Status](https://github.com/NicolaeIotu/typelike/workflows/CI/badge.svg)
![Actions Status](https://github.com/NicolaeIotu/typelike/workflows/Coverage/badge.svg)

# typelike

With **typelike** you can reliably determine if an object resembles other template object(s) used as reference.<br>
The comparison is done using the keys and the type of data where applicable.<br>
In practice using **typelike** is a breeze. You just get a trusted object and have **typelike** compare with a target
 object. That's all. Plain Javascript, no aliens, lightweight, zero dependencies, fast, easy to verify and use.

* [Examples](#examples)
  * [typelike in Node.js](#typelike-in-nodejs)
  * [typelike in browser](#typelike-in-browser)
* [How to compare with typelike](#how-to-compare-with-typelike)
* [Using multiple templates with typelike](#using-multiple-templates-with-typelike)
* [typelike Settings](#typelike-settings)
* [Others](#others)

## Examples
### typelike in Node.js
**Example 1:**
```
const { typelike } = require('typelike')

const testObject = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  arr: [[1, 'xyz'], 'abcdef']
}

const templateObject = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

console.log(typelike(testObject, templateObject)) // true
```
**Example 2:**
```
const { typelike } = require('typelike')

function contentGenerator () {
  // ...
  return {
    lvl1: {
      lvl2: {
        lvl3: {
          lvl4: {
            item1: [1, 2, 3],
            item2: true
          }
        }
      }
    },
    arr: [[1, 'xyz'], 'abcdef'],
    basic: 'test'
  }
}

const testObject = contentGenerator()

const templateObject = {
  lvl1: {
    lvl2: {
      lvl3: {
        lvl4: {
          item1: [44, 66, 88],
          item2: false
        }
      }
    }
  },
  arr: [[45, 'sample'], String('string')],
  basic: 'test'
}

console.log(typelike(testObject, templateObject)) // true
```

### typelike in browser
```
...
<head>
    ...
    <script src="./typelike.bundle.js"></script>
    ...
...
    <script>

      const typelike = typelikeBundled.typelike
    
      const testObject = {
        lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
        arr: [[1, 'xyz'], 'abcdef']
      }
    
      const templateObject = {
        lvl1: { lvl2: [3, 4, 212], sm: '' },
        arr: [[44, ''], '']
      }
    
      console.log(typelike(testObject, templateObject)) // true
    
    </script>
...
```

## How to compare with typelike
**typelike** iterates as deeply as possible any arrays, objects, maps and sets, while taking into account 
[typelike Settings](#typelike-settings).
For type checking **typelike** uses <a href="https://github.com/NicolaeIotu/xtypeof" title="xtypeof" target="_blank">**xtypeof**</a> 
which is included as part of the application.

In order to pass **typelike** tests the following logic applies:
* for **arrays, objects and maps** tests pass if:
  - keys are identical for both subject object and template object and ...
  - the type of data corresponding to a key is identical for both subject object and template object.
  - if the data corresponding to a key is iterable as understood by **typelike** (array, object, map, set) the checks
    continue at the next deeper level
* for **sets** tests pass if:
  - the type of data corresponding to an entry is identical for both subject set and template set.
  - if the data corresponding to an entry is iterable as understood by **typelike** (array, object, map, set) the checks 
    continue at the next deeper level
* for any other type tests pass if:
  - the type of subject data is identical for both subject object and template object

## Using multiple templates with typelike
Multiple templates can be used with every call to `typelike`. If the subject object (which should be the first
 parameter specified) matches any of them then `typelike` will return true.
 **Example:**
```
const { typelike } = require('typelike')

const testObject = {
  lvl1: { lvl2: [1, 2, 3], sm: 'type ... like' },
  arr: [[1, 'xyz'], 'abcdef']
}

const template1 = {
  lvl1: {
    lvl2: {
      lvl3: {
        lvl4: {
          item1: [1, 2, 3],
          item2: true
        }
      }
    }
  },
  arr: [[1, 'xyz'], 'abcdef'],
  basic: 'test'
}
const template2 = {
  lvl1: { sm: 'type ... like' },
  arr: [[1], 'abcdef']
}
const template3 = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

console.log(typelike(testObject, template1, template2)) // false
console.log(typelike(testObject, template1, template2, template3)) // true
```

## typelike Settings
**typelike** behavior can be changed with a couple of settings. In order to run with altered the settings, a special
 function `typelikeCustom` is exported. The settings are valid for a single call to `typelikeCustom`. Subsequent
  calls to `typelike` will use the default settings as listed below.
  
`typelikeCustom` behaves in the same way as `typelike`, but expects that the last parameter passed to be a special
 setting object which takes the following default format/values:
```
{
  maxDepth: 0,
  properties: {
    allowMissing: false,
    allowNull: false
  }
}
```
* **maxDepth** indicates the maximum depth allowed for iterations. Defaults to `0` (unlimited depth levels)
* **properties.allowMissing** takes a boolean value and indicates that the keys/properties are mandatory (`false`), or 
  not mandatory and can miss from arrays, objects, maps and sets (`true`). Defaults to `false` (all keys/properties are 
  mandatory)
* **properties.allowNull** takes a boolean value and indicates that **null** value keys/properties of a target object,
  match **any** corresponding types in the template object(s) (`true`). Defaults to `false` which means that **null** 
  value keys/properties of a target object match corresponding **null** value keys/properties of template object(s).

**Example:**
```
const { typelikeCustom } = require('typelike')

const testObject = {
  lvl1: { sm: 'type ... like' },
  arr: [[1], 'abcdef']
}

const templateObject = {
  lvl1: { lvl2: [3, 4, 212], sm: '' },
  arr: [[44, ''], '']
}

const settings = {
  maxDepth: 3,
  properties: {
    allowMissing: true
  }
}

console.log(typelikeCustom(testObject, templateObject, settings)) // true
```

## Others
**typelike** should fit most target purposes. For some cases remember you can use as many templates as needed. 
 
Additional settings are planned for the next releases. For suggestions and issues please contact the author.


**typelike** is &copy; Copyright 2020-2021 Nicolae Iotu, nicolae.g.iotu@gmail.com
