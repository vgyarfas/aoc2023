import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(",")

const hashAlgo = (char: string, initialValue: number) => {
  const ascii = char.charCodeAt(0)
  return ((initialValue + ascii) * 17) % 256
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  for (let value of input) {
    let currentValue = 0
    const chars = value.split("")
    for (let char of chars) {
      currentValue = hashAlgo(char, currentValue)
    }
    sum += currentValue
  }
  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let hashMap = Array.from({length: 255}, e => [] as Array<{key: string, value: number}>);
  for (let value of input) {
    if (value.includes("=")) {
      const [key, val] = value.split("=")
      const chars = key.split("")
      let currentValue = 0

      for (let char of chars) {
        currentValue = hashAlgo(char, currentValue)
      }

      if(hashMap[currentValue].some(e => e.key === key)) {
        hashMap[currentValue].find(e => e.key === key).value = +val
      } else {
        hashMap[currentValue].push({key, value: +val})
      }

    } else if(value.includes("-")) {
      const [key, ...rest] = value.split("-")
      const chars = key.split("")
      let currentValue = 0

      for (let char of chars) {
        currentValue = hashAlgo(char, currentValue)
      }

      if(hashMap[currentValue].some(e => e.key === key)) {
        hashMap[currentValue] = hashMap[currentValue].filter(e => e.key !== key)
      }
    }
  }

  const sums = hashMap.map((box, boxIndex) => box.reduce((acc, curr, currIndex) => acc + (boxIndex + 1) * (currIndex + 1) * curr.value, 0)).filter(e => e !== 0)  

  return sums.reduce((acc, curr) => acc + curr, 0)
}

run({
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
