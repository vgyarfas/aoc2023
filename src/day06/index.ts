import run from "aocrunner"
import { quadraticEquation } from "../utils/quadratic-equation.js"

const parseInput = (rawInput: string) => {
  const [time, distance] = rawInput
    .split("\n")
    .map((line) => line.split(":")[1].trim().split(" ").filter(x => x.trim().length > 0).map(Number))

  return time.map((t, i) => ({time: t, distance: distance[i]}))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const results = []
  
  for(let race of input) {
    const limits = quadraticEquation(1, race.time * -1, race.distance)
    const lowerLimit = Number.isInteger(limits[0]) ? (limits[0] + 1) : Math.ceil(limits[0])
    const upperLimit = Number.isInteger(limits[1]) ? (limits[1] - 1) : Math.floor(limits[1])
    results.push(upperLimit - lowerLimit + 1)
  }

  return results.reduce((a, b) => a * b, 1)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const realTime = Number.parseInt(input.map(race => race.time).join(''))
  const realDistance = Number.parseInt(input.map(race => race.distance).join(''))

  const limits = quadraticEquation(1, realTime * -1, realDistance)
  const lowerLimit = Number.isInteger(limits[0]) ? (limits[0] + 1) : Math.ceil(limits[0])
  const upperLimit = Number.isInteger(limits[1]) ? (limits[1] - 1) : Math.floor(limits[1])
  return upperLimit - lowerLimit + 1
}

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
