import run from "aocrunner"

const firstCardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
const secondCardValues = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"] 
const handValues = [[1, 1, 1, 1, 1], [2, 1, 1, 1], [2, 2, 1], [3, 1, 1], [3, 2], [4, 1], [5]]
const countOccurences = (s: string) => [...s].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {});

const parseInput = (rawInput: string, cardValues: Array<string>, jIsJoker: boolean) => {
  const input = rawInput.split("\n").map((line) => {
    const [hand, bid] = line.split(" ")
    let handType: Array<number>;
    if(jIsJoker) {
      const occurences = countOccurences(hand)
      if(occurences["J"] !== undefined && occurences["J"] > 0 && occurences["J"] < 5) {
        const jokers = occurences["J"]
        handType = Object.values<number>({...occurences, J: undefined}).sort((a, b) => b - a)
        handType[0] += jokers
      } else {
        handType = Object.values<number>(occurences).sort((a, b) => b - a)
      }
    } else {
      handType = Object.values<number>(countOccurences(hand)).sort((a, b) => b - a)
    }
    handType = handType.filter(type => type !== undefined)
    const handValue = handValues.findIndex((v) => v.every((c, i) => c === handType[i]))
    const orderValue = handValue * 10**10 + hand.split("").map((c, index) => cardValues.indexOf(c) * 10**(8-(2*index))).reduce((a, e) => a + e, 0)

    return { bid: +bid, orderValue }
  })

  return input
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput, firstCardValues, false).sort((a, b) => a.orderValue - b.orderValue)

  return input.reduce((acc, curr, index) => acc + (curr.bid * (index + 1)), 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput, secondCardValues, true).sort((a, b) => a.orderValue - b.orderValue)

  return input.reduce((acc, curr, index) => acc + (curr.bid * (index + 1)), 0)
}

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
