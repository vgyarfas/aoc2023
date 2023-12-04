import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map((row) => row.trim().split(":")[1].split("|").map((col) => col.trim().split(" ").filter((x) => x !== "").map(Number)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0

  for(let card of input) {
    const winningNums = card[1].filter((x) => card[0].includes(x)).length
    if(winningNums > 0) {
      result += 2 ** (winningNums - 1)
    }
  }

  return result
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const copies = Array(input.length).fill(1)

  for(let [index, card] of input.entries()) {
    const winningNums = card[1].filter((x) => card[0].includes(x)).length
    if(winningNums > 0) {
      for(let i = 1; i <= winningNums; i++) {
        copies[index + i] += copies[index]
      }
    }
  }

  return copies.reduce((acc, cur) => acc + cur, 0)
}

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
