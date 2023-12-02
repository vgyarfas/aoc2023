import run from "aocrunner"

const parseInput = (rawInput: string): Array<Array<{red?: number; blue?: number; green?: number}>> => {
  const input = rawInput.split("\n").filter(row => row.length).map((game) => game.split(":")[1]).map((game => game.split(";"))).map((game) => {
    return game.map((round => round.split(", ").map((x) => x.trim()).reduce((acc, curr) => ({
      ...acc,
      [curr.split(" ")[1]]: parseInt(curr.split(" ")[0])
    }), {})))
    })

  return input
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;
  for(let i = 0; i < input.length; i++) {
    if(input[i].every((round => (round.red === undefined || round.red <= 12) && (round.green === undefined || round.green <= 13) && (round.blue === undefined || round.blue <= 14)))) {
      result += i + 1;
    }
  }

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;

  for(let i = 0; i < input.length; i++) {
    const maxRed = Math.max(...input[i].map(round => round.red ?? 0))
    const maxGreen = Math.max(...input[i].map(round => round.green ?? 0))
    const maxBlue = Math.max(...input[i].map(round => round.blue ?? 0))

    result += maxRed * maxGreen * maxBlue;
  }

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
