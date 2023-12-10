import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => line.split(""))

class Point {
  x: number; 
  y: number;
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class line {
  p1: Point;
  p2: Point;
  //Point p1, p2;
  constructor(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
}

function onLine(l1, p) {
  // Check whether p is on the line or not
  if (
    p.x <= Math.max(l1.p1.x, l1.p2.x) &&
    p.x >= Math.min(l1.p1.x, l1.p2.x) &&
    p.y <= Math.max(l1.p1.y, l1.p2.y) &&
    p.y >= Math.min(l1.p1.y, l1.p2.y)
  )
    return true
  return false
}

function direction(a, b, c) {
  let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
  if (val == 0) {
    return 0
  } else if (val < 0) {
    return 2
  }

  return 1
}

function isIntersect(l1, l2) {
  // Four direction for two lines and points of other line
  let dir1 = direction(l1.p1, l1.p2, l2.p1)
  let dir2 = direction(l1.p1, l1.p2, l2.p2)
  let dir3 = direction(l2.p1, l2.p2, l1.p1)
  let dir4 = direction(l2.p1, l2.p2, l1.p2)

  // When intersecting
  if (dir1 != dir2 && dir3 != dir4) return true

  // When p2 of line2 are on the line1
  if (dir1 == 0 && onLine(l1, l2.p1)) return true

  // When p1 of line2 are on the line1
  if (dir2 == 0 && onLine(l1, l2.p2)) return true

  // When p2 of line1 are on the line2
  if (dir3 == 0 && onLine(l2, l1.p1)) return true

  // When p1 of line1 are on the line2
  if (dir4 == 0 && onLine(l2, l1.p2)) return true

  return false
}

function checkInside(poly, n, p) {
  // When polygon has less than 3 edge, it is not polygon
  if (n < 3) return false

  // Create a point at infinity, y is same as point p
  let tmp = new Point(9999, p.y)
  let exline = new line(p, tmp)
  let count = 0
  let i = 0
  do {
    // Forming a line from two consecutive points of
    // poly
    let side = new line(poly[i], poly[(i + 1) % n])
    if (isIntersect(side, exline)) {
      // If side is intersects exline
      if (direction(side.p1, p, side.p2) == 0) return onLine(side, p)
      count++
    }
    i = (i + 1) % n
  } while (i != 0)

  // When count is odd
  return count & 1
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const startingCoordY = input.findIndex((line) => line.includes("S"))
  const startingCoordX = input[startingCoordY].findIndex((char) => char === "S")

  let connections = []
  if (startingCoordX > 0) {
    if (["L", "F", "-"].includes(input[startingCoordY][startingCoordX - 1])) {
      connections.push({ x: startingCoordX - 1, y: startingCoordY })
    }
  }
  if (startingCoordX < input[startingCoordY].length - 1) {
    if (["J", "7", "-"].includes(input[startingCoordY][startingCoordX + 1])) {
      connections.push({ x: startingCoordX + 1, y: startingCoordY })
    }
  }
  if (startingCoordY > 0) {
    if (["7", "F", "|"].includes(input[startingCoordY - 1][startingCoordX])) {
      connections.push({ x: startingCoordX, y: startingCoordY - 1 })
    }
  }
  if (startingCoordY < input.length - 1) {
    if (["J", "L", "|"].includes(input[startingCoordY + 1][startingCoordX])) {
      connections.push({ x: startingCoordX, y: startingCoordY + 1 })
    }
  }

  input[startingCoordY][startingCoordX] = 0 as any

  let num = 1

  while (
    connections[0].x !== connections[1].x ||
    connections[0].y !== connections[1].y
  ) {
    const newConnections = []
    for (const connection of connections) {
      if (
        ["J", "7", "-"].includes(input[connection.y][connection.x]) &&
        connection.x > 0 &&
        typeof input[connection.y][connection.x - 1] !== "number"
      ) {
        if (["L", "F", "-"].includes(input[connection.y][connection.x - 1])) {
          newConnections.push({ x: connection.x - 1, y: connection.y })
        }
      }
      if (
        ["L", "F", "-"].includes(input[connection.y][connection.x]) &&
        connection.x < input[connection.y].length - 1 &&
        typeof input[connection.y][connection.x + 1] !== "number"
      ) {
        if (["J", "7", "-"].includes(input[connection.y][connection.x + 1])) {
          newConnections.push({ x: connection.x + 1, y: connection.y })
        }
      }
      if (
        ["J", "L", "|"].includes(input[connection.y][connection.x]) &&
        connection.y > 0 &&
        typeof input[connection.y - 1][connection.x] !== "number"
      ) {
        if (["7", "F", "|"].includes(input[connection.y - 1][connection.x])) {
          newConnections.push({ x: connection.x, y: connection.y - 1 })
        }
      }
      if (
        ["7", "F", "|"].includes(input[connection.y][connection.x]) &&
        connection.y < input.length - 1 &&
        typeof input[connection.y + 1][connection.x] !== "number"
      ) {
        if (["J", "L", "|"].includes(input[connection.y + 1][connection.x])) {
          newConnections.push({ x: connection.x, y: connection.y + 1 })
        }
      }
      input[connection.y][connection.x] = num as any
    }
    connections = newConnections
    num++
  }

  return num
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const startingCoordY = input.findIndex((line) => line.includes("S"))
  const startingCoordX = input[startingCoordY].findIndex((char) => char === "S")

  let polygon: Array<Point> = [{ x: startingCoordX, y: startingCoordY }]
  let connections = []
  if (startingCoordX > 0) {
    if (["L", "F", "-"].includes(input[startingCoordY][startingCoordX - 1])) {
      connections.push({ x: startingCoordX - 1, y: startingCoordY })
    }
  }
  if (startingCoordX < input[startingCoordY].length - 1) {
    if (["J", "7", "-"].includes(input[startingCoordY][startingCoordX + 1])) {
      connections.push({ x: startingCoordX + 1, y: startingCoordY })
    }
  }
  if (startingCoordY > 0) {
    if (["7", "F", "|"].includes(input[startingCoordY - 1][startingCoordX])) {
      connections.push({ x: startingCoordX, y: startingCoordY - 1 })
    }
  }
  if (startingCoordY < input.length - 1) {
    if (["J", "L", "|"].includes(input[startingCoordY + 1][startingCoordX])) {
      connections.push({ x: startingCoordX, y: startingCoordY + 1 })
    }
  }

  input[startingCoordY][startingCoordX] = 1 as any

  let num = 1

  while (
    connections[0].x !== connections[1].x ||
    connections[0].y !== connections[1].y
  ) {
    const newConnections = []
    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i]
      if (i === 0 && !["-", "|"].includes(input[connection.y][connection.x])) {
        polygon.unshift({ x: connection.x, y: connection.y })
      } else if (
        i === 1 &&
        !["-", "|"].includes(input[connection.y][connection.x])
      ) {
        polygon.push({ x: connection.x, y: connection.y })
      }
      if (
        ["J", "7", "-"].includes(input[connection.y][connection.x]) &&
        connection.x > 0 &&
        typeof input[connection.y][connection.x - 1] !== "number"
      ) {
        if (["L", "F", "-"].includes(input[connection.y][connection.x - 1])) {
          newConnections.push({ x: connection.x - 1, y: connection.y })
        }
      }
      if (
        ["L", "F", "-"].includes(input[connection.y][connection.x]) &&
        connection.x < input[connection.y].length - 1 &&
        typeof input[connection.y][connection.x + 1] !== "number"
      ) {
        if (["J", "7", "-"].includes(input[connection.y][connection.x + 1])) {
          newConnections.push({ x: connection.x + 1, y: connection.y })
        }
      }
      if (
        ["J", "L", "|"].includes(input[connection.y][connection.x]) &&
        connection.y > 0 &&
        typeof input[connection.y - 1][connection.x] !== "number"
      ) {
        if (["7", "F", "|"].includes(input[connection.y - 1][connection.x])) {
          newConnections.push({ x: connection.x, y: connection.y - 1 })
        }
      }
      if (
        ["7", "F", "|"].includes(input[connection.y][connection.x]) &&
        connection.y < input.length - 1 &&
        typeof input[connection.y + 1][connection.x] !== "number"
      ) {
        if (["J", "L", "|"].includes(input[connection.y + 1][connection.x])) {
          newConnections.push({ x: connection.x, y: connection.y + 1 })
        }
      }
      input[connection.y][connection.x] = num as any
    }
    connections = newConnections
  }

  if (!["-", "|"].includes(input[connections[0].y][connections[0].x])) {
    polygon.unshift({ x: connections[0].x, y: connections[0].y })
  }
  input[connections[0].y][connections[0].x] = 1 as any

  let inside = 0;
  for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
      if(input[y][x] !== 1 as any) {
        if(checkInside(polygon, polygon.length, {x: x+0.25, y: y+0.25})) {
          input[y][x] = "W"
          inside++
        } else {
          input[y][x] = "O"
        }
      }
    }
  }

  return inside
}

run({
  part1: {
    tests: [
      {
        input: `.....
.S-7.
.|.|.
.L-J.
.....`,
        expected: 4,
      },
      {
        input: `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
        expected: 4,
      },
      {
        input: `..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`,
        expected: 4,
      },
      {
        input: `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: 8,
      },
      {
        input: `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
