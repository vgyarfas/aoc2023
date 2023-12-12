import run from "aocrunner"
import { memoize } from "../utils/memoize.js"

const parseInput = (rawInput: string) => {
  const rows = rawInput.split("\n")
  return rows.map((row) => {
    const [pattern, result] = row.split(" ")
    return {
      pattern,
      result: result.split(",").map((n) => parseInt(n)),
    }
  })
}

const allCombinations = memoize(
  (lineToCheck: string, runs: Array<number>) => {
    if (lineToCheck.length === 0) {
      return runs.length === 0 ? 1 : 0
    }

    if (runs.length === 0) {
      return lineToCheck.split("").every((c) => c !== "#") ? 1 : 0
    }

    if (
      lineToCheck.length <
      runs.reduce((a, b) => a + b, 0) + runs.length - 1
    ) {
      return 0
    }

    if (lineToCheck[0] === ".") {
      return allCombinations(lineToCheck.slice(1), runs)
    }

    if (lineToCheck[0] === "#") {
      const [currentRun, ...restRuns] = runs

      if (
        lineToCheck
          .slice(0, currentRun)
          .split("")
          .some((c) => c === ".")
      ) {
        return 0
      }

      if (lineToCheck[currentRun] === "#") {
        return 0
      }

      return allCombinations(lineToCheck.slice(currentRun + 1), restRuns)
    }

    return (
      allCombinations("#" + lineToCheck.slice(1), runs) +
      allCombinations("." + lineToCheck.slice(1), runs)
    )
  },
)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0

  for (let row of input) {
    sum += allCombinations(row.pattern, row.result)
  }
  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0

  for (let oldRow of input) {
    const row = {
      pattern: `${oldRow.pattern}?${oldRow.pattern}?${oldRow.pattern}?${oldRow.pattern}?${oldRow.pattern}`,
      result: [
        ...oldRow.result,
        ...oldRow.result,
        ...oldRow.result,
        ...oldRow.result,
        ...oldRow.result,
      ],
    }

    sum += allCombinations(row.pattern, row.result)
  }
  return sum
}

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
