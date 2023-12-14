import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(row => row.split(''))

const rollNorth = (map: string[][], south: boolean = false): string[][] => {
  const newMap = Array.from({length: map[0].length}, e => []);
  for(let x = 0; x < map[0].length; x++) {
    const col = map.map((row, index) => row[x]).join('').split('#')
    const sortedCol = col.map(movableParts => movableParts.split('').sort((a, b) => {
      //a === '.' ? 1 : -1
      if(a === '.') {
        return south ? -1 : 1
      } else {
        return south ? 1 : -1
      }
    }).join('')).join('#')
    newMap.forEach((row, index) => row.push(...sortedCol[index]))
  }
  return newMap
}

const rollWest = (map: string[][], east: boolean = false): string[][] => {
  const newMap = [];
  for(let y = 0; y < map.length; y++) {
    const row = map[y].join('').split('#')
    const sortedRow = row.map(movableParts => movableParts.split('').sort((a, b) => {
      //a === '.' ? 1 : -1
      if(a === '.') {
        return east ? -1 : 1
      } else {
        return east ? 1 : -1
      }
    }).join('')).join('#')
    newMap.push(sortedRow.split(''))
  }
  return newMap
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const rotatedMap = rollNorth(input)
  let sum = 0;
  for(let y = 0; y < rotatedMap.length; y++) {
    const value = rotatedMap.length - y
    sum += rotatedMap[y].filter(char => char === "O").length * value
  }
  return sum;
}

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput)
  let sum = 0
  const map = new Map<string, number>()
  for(let i = 0; i < 1000000000; i++) {
    input = rollNorth(input)
    input = rollWest(input)
    input = rollNorth(input, true)
    input = rollWest(input, true)

    const inputMapString = input.map(row => row.join('')).join('\n')

    if(map.has(inputMapString)) {
      const index = map.get(inputMapString)
      const diff = i - index
      const remaining = 1000000000 - i
      const remainingModulo = remaining % diff
      const remainingIndex = index + remainingModulo - 1

      let finalMap = []
      for (let [key, value] of map.entries()) {
        if (value === remainingIndex) {
          finalMap = key.split('\n');
        }
      }
      
      for(let y = 0; y < finalMap.length; y++) {
        const value = finalMap.length - y
        sum += finalMap[y].split('').filter(char => char === "O").length * value
      }
      break;
    }

    map.set(inputMapString, i)
  }
  return sum;
}

run({
  part1: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
