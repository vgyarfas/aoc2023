import run from "aocrunner"
import { uniqueArray } from "../utils/unique-array.js"

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n").map((line, lineIndex) => {
    const numbersInRow = line.match(/\d+/g)
    const returnArray: Array<string | {value: number, rowId: number}> = line.trim().split('')

    let currentNum = 0;
    for(let i = 0; i < returnArray.length; i++) {
      if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(returnArray[i] as string)) {
        while(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(returnArray[i] as string)) {
          returnArray[i] = {value: +numbersInRow[currentNum], rowId: lineIndex*1000 + currentNum}
          i++
        }
        currentNum++
      }
    }

    return returnArray
  })

  return lines
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sumPerSymbol = {};
  for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
      if(typeof input[y][x] !== "object" && input[y][x] !== '.') {
        const numsAround = [];
        if(typeof input[y-1][x-1] === "object") {
          numsAround.push(input[y-1][x-1])
        }
        if(typeof input[y-1][x] === "object") {
          numsAround.push(input[y-1][x])
        }
        if(typeof input[y-1][x+1] === "object") {
          numsAround.push(input[y-1][x+1])
        }
        if(typeof input[y][x-1] === "object") {
          numsAround.push(input[y][x-1])
        }
        if(typeof input[y][x] === "object") {
          numsAround.push(input[y][x])
        }
        if(typeof input[y][x+1] === "object") {
          numsAround.push(input[y][x+1])
        }
        if(typeof input[y+1][x-1] === "object") {
          numsAround.push(input[y+1][x-1])
        }
        if(typeof input[y+1][x] === "object") {
          numsAround.push(input[y+1][x])
        }
        if(typeof input[y+1][x+1] === "object") {
          numsAround.push(input[y+1][x+1])
        }
        const uniqueNum = uniqueArray(numsAround, ['rowId'])
        uniqueNum.forEach((num: {value: number, rowId: number}) => {
          sumPerSymbol[input[y][x] as string] = (sumPerSymbol[input[y][x] as string] ?? 0) + num.value
        })
      }
    }
  }

  return Object.values(sumPerSymbol).reduce<number>((a: number, b: number) => a + b, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;
  for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
      if(input[y][x] === '*') {
        const numsAround = [];
        if(typeof input[y-1][x-1] === "object") {
          numsAround.push(input[y-1][x-1])
        }
        if(typeof input[y-1][x] === "object") {
          numsAround.push(input[y-1][x])
        }
        if(typeof input[y-1][x+1] === "object") {
          numsAround.push(input[y-1][x+1])
        }
        if(typeof input[y][x-1] === "object") {
          numsAround.push(input[y][x-1])
        }
        if(typeof input[y][x] === "object") {
          numsAround.push(input[y][x])
        }
        if(typeof input[y][x+1] === "object") {
          numsAround.push(input[y][x+1])
        }
        if(typeof input[y+1][x-1] === "object") {
          numsAround.push(input[y+1][x-1])
        }
        if(typeof input[y+1][x] === "object") {
          numsAround.push(input[y+1][x])
        }
        if(typeof input[y+1][x+1] === "object") {
          numsAround.push(input[y+1][x+1])
        }
        const uniqueNum = uniqueArray(numsAround, ['rowId'])
        if(uniqueNum.length === 2) {
          result += uniqueNum[0].value * uniqueNum[1].value
        }
      }
    }
  }
  return result
}

run({
  part1: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
