// import transform from 'lodash/transform'
import isEqual from 'lodash/isEqual'
// import isArray from 'lodash/isArray'
// import isObject from 'lodash/isObject'

// const diffBetweenObjects = (origObj, newObj) => {
//   function changes(newObj, origObj) {
//     let arrayIndexCounter = 0
//     return transform(newObj, function (result, value, key) {
//       if (!isEqual(value, origObj[key])) {
//         let resultKey = isArray(origObj) ? arrayIndexCounter++ : key
//         result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value
//       }
//     })
//   }
//   return changes(newObj, origObj)
// }

const diffBetweenObjects = (origObj, newObj) => {
  return Object.keys(origObj).reduce(
    (acc, key) => {
        // console.log('diffBetweenObjects- key->', key , '--origObj ->', origObj[key], 'newObj ->', newObj[key])
        // if(key === 'type') debugger
        if(isEqual(origObj[key], newObj[key])) {
          return acc
        }
        return {
          ...acc,
          [key]: newObj[key]
        }
    },
    {}
  )
}

export default diffBetweenObjects
