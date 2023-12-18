import run from "aocrunner"
import { initialize2DArray } from "../utils/initialize-2d-array.js"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(" "))

function polygonArea(coords: { x; y }[]) {
  // Initialize area
  let area = 0.0

  // Calculate value of shoelace formula
  let j = coords.length - 1
  for (let i = 0; i < coords.length; i++) {
    area += (coords[j].x + coords[i].x) * (coords[j].y - coords[i].y)

    // j is previous vertex to i
    j = i
  }

  // Return absolute value
  return Math.abs(area / 2.0)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let [x, y] = [0, 0]
  let area = 0
  let perimeter = 0

  for (let i = 0; i < input.length; i += 2) {
    const horizontal = input[i]
    const vertical = input[i + 1]

    const newX = horizontal[0] === "R" ? +horizontal[1] : -horizontal[1]
    const newY = vertical[0] === "D" ? +vertical[1] : -vertical[1]

    x += newX
    y += newY

    area += x * newY
    perimeter += Math.abs(newX) + Math.abs(newY)
  }

  return Math.abs(area) + perimeter / 2 + 1
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let [x, y] = [0, 0]
  let area = 0
  let perimeter = 0

  for (let i = 0; i < input.length; i += 2) {
    const horizontal = input[i]
    const vertical = input[i + 1]

    const horizontalSteps = parseInt(horizontal[2].slice(2, 7), 16)
    const horizontalDirection = +horizontal[2][7] === 0 ? "R" : "L"

    const verticalSteps = parseInt(vertical[2].slice(2, 7), 16)
    const verticalDirection = +vertical[2][7] === 1 ? "D" : "U"

    const newX =
      horizontalDirection === "R" ? horizontalSteps : -1 * horizontalSteps
    const newY = verticalDirection === "D" ? verticalSteps : -1 * verticalSteps

    x += newX
    y += newY

    area += x * newY
    perimeter += Math.abs(newX) + Math.abs(newY)
  }

  return Math.abs(area) + perimeter / 2 + 1
}

run({
  part1: {
    tests: [
      {
        input: `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`,
        expected: 62,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`,
        expected: 952408144115,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
