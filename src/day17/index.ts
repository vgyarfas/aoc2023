import run from "aocrunner"
import { MinHeap } from "../utils/min-heap.js"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split("").map(Number))

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
]

const minBfs = (
  grid: number[][],
  condition: (currentSteps: number, previousSteps?: number) => boolean,
) => {
  const queue = [
    [0, 0, [0, 0], 1, 0],
    [0, 0, [0, 0], 2, 0],
  ]
  const visited = new Map()
  while (queue.length) {
    const [
      ,
      currentEnergy,
      [currentX, currentY],
      currentDirection,
      currentSteps,
    ] = MinHeap.pop(queue)
    if (
      currentY === grid.length - 1 &&
      currentX === grid[0].length - 1 &&
      condition(currentSteps, currentSteps)
    ) {
      return currentEnergy
    }
    directions.forEach(([dx, dy], directionIndex) => {
      const newSteps =
        directionIndex === currentDirection ? currentSteps + 1 : 1
      const newCoords: number[] = [currentX + dx, currentY + dy]

      if (
        newCoords[0] < 0 ||
        newCoords[0] >= grid[0].length ||
        newCoords[1] < 0 ||
        newCoords[1] >= grid.length ||
        (directionIndex + 2) % 4 === currentDirection ||
        !condition(newSteps, currentSteps)
      ) {
        return
      }

      const newEnergy = currentEnergy + grid[newCoords[1]][newCoords[0]]

      const newQueueItem = [newEnergy, newCoords, directionIndex, newSteps]

      if (
        (visited.get(
          (newCoords[1] << 16) |
            (newCoords[0] << 8) |
            (directionIndex << 4) |
            newSteps,
        ) ?? Number.MAX_SAFE_INTEGER) <= newEnergy
      ) {
        return
      }

      visited.set(
        (newCoords[1] << 16) |
          (newCoords[0] << 8) |
          (directionIndex << 4) |
          newSteps,
        newEnergy,
      )
      MinHeap.push(queue, [
        newEnergy +
          (grid[0].length - 1 - newCoords[0]) +
          (grid.length - 1 - newCoords[1]),
        ...newQueueItem,
      ])
    })
  }
  return -1
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return minBfs(input, (currentSteps, prevSteps) => currentSteps <= 3)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return minBfs(
    input,
    (currentSteps, prevSteps) =>
      (currentSteps > prevSteps || prevSteps >= 4) && currentSteps <= 10,
  )
}

run({
  part1: {
    tests: [
      {
        input: `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`,
        expected: 102,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`,
        expected: 94,
      },
      {
        input: `111111111111
999999999991
999999999991
999999999991
999999999991`,
        expected: 71,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
