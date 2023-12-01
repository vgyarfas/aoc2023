import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").filter((line) => line.length > 0)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numbersOnly = input.map((line => line.split("").map(Number).filter((n) => !isNaN(n) && n !== 0)))

  return numbersOnly.map((line) => line[0]*10 + line[line.length - 1]).reduce((a, b) => a + b, 0)
}

const part2 = (rawInput: string) => {
  const numberStrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  const input = parseInput(rawInput)

  const numbersInput = input.map(line => {
    let newLine = line
    for(let i = 0; i < numberStrings.length; i++) {
      newLine = newLine.replaceAll(numberStrings[i], `${numberStrings[i][0]}${i + 1}${numberStrings[i].substring(1)}`)
    }
    return newLine;
  })
  
  const numbersOnly = numbersInput.map((line => line.split("").map(Number).filter((n) => !isNaN(n) && n !== 0)))

  return numbersOnly.map((line) => line[0]*10 + line[line.length - 1]).reduce((a, b) => a + b, 0)
  return
}

run({
  part1: {
    tests: [
      {
        input: `1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
