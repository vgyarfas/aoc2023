import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.split(" ").map((num) => parseInt(num, 10)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;

  for(let line of input) {
    let values = [line];
    while(!values[values.length - 1].every((val => val === 0))) {
      const newValues = [];
      for(let i = 0; i < values[values.length - 1].length - 1; i++) {
        newValues.push(values[values.length - 1][i + 1] - values[values.length - 1][i]);
      }
      values.push(newValues);
    }
    for(let i = values.length - 2; i >= 0; i--) {
      values[i].push(values[i][values[i].length - 1] + values[i + 1][values[i + 1].length - 1])
    }
    result += values[0][values[0].length - 1];
  }

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map((line) => line.reverse())
  let result = 0;

  for(let line of input) {
    let values = [line];
    while(!values[values.length - 1].every((val => val === 0))) {
      const newValues = [];
      for(let i = 0; i < values[values.length - 1].length - 1; i++) {
        newValues.push(values[values.length - 1][i + 1] - values[values.length - 1][i]);
      }
      values.push(newValues);
    }
    for(let i = values.length - 2; i >= 0; i--) {
      values[i].push(values[i][values[i].length - 1] + values[i + 1][values[i + 1].length - 1])
    }
    result += values[0][values[0].length - 1];
  }

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
