export const uniqueArray = (objects: Array<{[key: string]: unknown}>, uniqueBy: Array<string>, keepFirst = true) => {
  return Array.from(
      objects.reduce((map, e) => {
          let key = uniqueBy.map(key => [e[key], typeof e[key]]).flat().join('-')
          if (keepFirst && map.has(key)) return map
          return map.set(key, e)
      }, new Map()).values()
  )
}

/* Usage:
 * let array = [
 *   {a: 1, b: 2, c: 1},
 *   {a: 1, b: 2, c: 2},
 *   {a: 1, b: 3, c: 3}
 * ]
 *
 * console.log(uniqueArray(array, ["a"], true)) // [ { a: 1, b: 2, c: 1 } ]
 * console.log(uniqueArray(array, ["a"], false)) // [ { a: 1, b: 3, c: 3 } ]
 * console.log(uniqueArray(array, ["a", "b"], true)) // [ { a: 1, b: 2, c: 1 }, { a: 1, b: 3, c: 3 } ]
 * console.log(uniqueArray(array, ["a", "b"], false)) // [ { a: 1, b: 2, c: 2 }, { a: 1, b: 3, c: 3 } ]
 */