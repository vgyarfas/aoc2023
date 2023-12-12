import run from "aocrunner"
import { findAllIndexes } from "../utils/find-all-indexes.js"

const parseInput = (rawInput: string, expansion: number) => {
  const space = rawInput
    .trim()
    .split("\n")
    .map((line) => line.split(""))

  // const lineLength = space[0].length
  // findAllIndexes(space, (line) => line.every((char) => char === "."))
  //   .sort((a, b) => b - a)
  //   .forEach((lineIndex) => {
  //     space.splice(lineIndex, 0, ...(new Array(expansion).fill(null).map(i => new Array(lineLength).fill("O") as any)))
  //   })

  // const columnLength = space.length
  // findAllIndexes(space[0], (char, columnIndex) =>
  //   space.every((line) => line[columnIndex] === "." || line[columnIndex] === "O"),
  // )
  //   .sort((a, b) => b - a)
  //   .forEach((charIndex) => {
  //     for (let i = columnLength - 1; i >= 0; i--) {
  //       space[i].splice(charIndex, 0, ...(new Array(expansion).fill("W")))
  //     }
  //   })
  const emptyYs = findAllIndexes(space, (line) => line.every((char) => char === "."))
  const emptyXs = findAllIndexes(space[0], (char, columnIndex) =>
    space.every((line) => line[columnIndex] === "." ),
  )

  const galaxies = []
  for (let y = 0; y < space.length; y++) {
    for (let x = 0; x < space[y].length; x++) {
      if (space[y][x] === "#") {
        galaxies.push({ x, y })
      }
    }
  }

  for(let galaxy of galaxies) {
    galaxy.x += emptyXs.filter(x => x < galaxy.x).length * expansion
    galaxy.y += emptyYs.filter(y => y < galaxy.y).length * expansion
  }

  return galaxies
}

// Return the sum of distance of one axis.
function distanceSum(arr) {
  arr = arr.sort((a, b) => a - b)

  let res = 0,
    sum = 0
  for (let i = 0; i < arr.length; i++) {
    res += arr[i] * i - sum
    sum += arr[i]
  }

  return res
}

function totalDistanceSum(x, y) {
  return distanceSum(x) + distanceSum(y)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput, 1)

  return totalDistanceSum(input.map((galaxy) => galaxy.x), input.map((galaxy) => galaxy.y))
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput, 1000000 - 1)

  return totalDistanceSum(input.map((galaxy) => galaxy.x), input.map((galaxy) => galaxy.y))
}

run({
  part1: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
//       {
//         input: `...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....`,
//         expected: 374,
//       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
