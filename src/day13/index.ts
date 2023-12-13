import run from "aocrunner"
import { findAllIndexes } from "../utils/find-all-indexes.js"
import { getArraysIntersection } from "../utils/get-arrays-intersection.js"
import { countOccurrences } from "../utils/count-occurences.js"

const parseInput = (rawInput: string): Array<Array<Array<"." | "#">>> => {
  const maps = rawInput
    .split("\n\n")
    .map((map) => map.split("\n").map((row) => row.split("")))

  return maps as Array<Array<Array<"." | "#">>>
}

const checkForPalindromeIndexes = (row: Array<"." | "#">) => {
  return findAllIndexes(row, (char, index, array) => {
    if (index === row.length - 1) {
      return false
    }

    if (char === array[index + 1]) {
      const mirrorRow = row.slice(0, index + 1).reverse()
      const forwardRow = row.slice(index + 1)
      return mirrorRow.every(
        (char, index) =>
          char === forwardRow[index] ||
          char === undefined ||
          forwardRow[index] === undefined,
      )
    }
  })
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  for (let map of input) {
    const rowIndexes: Array<Array<number>> = []
    for (let row of map) {
      const palindromeIndexes = checkForPalindromeIndexes(row)
      rowIndexes.push(palindromeIndexes)
    }
    const rowIntersection = getArraysIntersection.apply(null, rowIndexes)

    if (rowIntersection.length > 0) {
      sum += rowIntersection[0] + 1
      continue
    }

    const colIndexes: Array<Array<number>> = []
    for (let i = 0; i < map[0].length; i++) {
      const col = map.map((row) => row[i])
      const palindromeIndexes = checkForPalindromeIndexes(col)
      colIndexes.push(palindromeIndexes)
    }
    const colIntersection = getArraysIntersection.apply(null, colIndexes)

    if (colIntersection.length > 0) {
      sum += (colIntersection[0] + 1) * 100
      continue
    }
  }
  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  for (let map of input) {
    const rowIndexes: Array<Array<number>> = []
    for (let row of map) {
      const palindromeIndexes = checkForPalindromeIndexes(row)
      rowIndexes.push(palindromeIndexes)
    }

    const rowAlmostIntersection = Object.entries(countOccurrences(rowIndexes.flat())).find(([rowIndex, count]) => count === map.length - 1)

    if (rowAlmostIntersection !== undefined) {
      sum += +rowAlmostIntersection[0] + 1
      continue
    }

    const colIndexes: Array<Array<number>> = []
    for (let i = 0; i < map[0].length; i++) {
      const col = map.map((row) => row[i])
      const palindromeIndexes = checkForPalindromeIndexes(col)
      colIndexes.push(palindromeIndexes)
    }

    const colAlmostIntersection = Object.entries(countOccurrences(colIndexes.flat())).find(([colIndex, count]) => count === map[0].length - 1)

    if (colAlmostIntersection !== undefined) {
      sum += (+colAlmostIntersection[0] + 1) * 100
      continue
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
