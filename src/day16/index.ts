import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const map = rawInput.replaceAll(/\\/g, "#").split("\n").map((line) => line.split(""))

  return map
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const currentAgents = [{ x: 0, y: 0, direction: "right" }]
  const visited = ["0@0@right"]

  while (currentAgents.length > 0) {
    const newAgents = []
    for (const agent of currentAgents) {
      const { x, y, direction } = agent
      const current = input[y][x]

      if (current === undefined) {
        continue
      }
      if (current === "#") {
        if (direction === "right") {
          newAgents.push({ y: y + 1, x, direction: "down" })
        } else if (direction === "left") {
          newAgents.push({ x, y: y - 1, direction: "up" })
        } else if (direction === "up") {
          newAgents.push({ x: x - 1, y, direction: "left" })
        } else if (direction === "down") {
          newAgents.push({ x: x + 1, y, direction: "right" })
        }
      } else if (current === "/") {
        if (direction === "right") {
          newAgents.push({ y: y - 1, x, direction: "up" })
        } else if (direction === "left") {
          newAgents.push({ x, y: y + 1, direction: "down" })
        } else if (direction === "up") {
          newAgents.push({ x: x + 1, y, direction: "right" })
        } else if (direction === "down") {
          newAgents.push({ x: x - 1, y, direction: "left" })
        }
      } else if (current === "-") {
        if (direction === "right") {
          newAgents.push({ x: x + 1, y, direction })
        } else if (direction === "left") {
          newAgents.push({ x: x - 1, y, direction })
        } else if (direction === "up" || direction === "down") {
          newAgents.push({ x: x - 1, y, direction: "left" })
          newAgents.push({ x: x + 1, y, direction: "right" })
        }
      } else if (current === "|") {
        if (direction === "up") {
          newAgents.push({ x, y: y - 1, direction })
        } else if (direction === "down") {
          newAgents.push({ x, y: y + 1, direction })
        } else if (direction === "left" || direction === "right") {
          newAgents.push({ x, y: y - 1, direction: "up" })
          newAgents.push({ x, y: y + 1, direction: "down" })
        }
      } else {
        if (direction === "right") {
          newAgents.push({ x: x + 1, y, direction })
        } else if (direction === "left") {
          newAgents.push({ x: x - 1, y, direction })
        } else if (direction === "up") {
          newAgents.push({ x, y: y - 1, direction })
        } else if (direction === "down") {
          newAgents.push({ x, y: y + 1, direction })
        }
      }
    }
    currentAgents.length = 0
    for (const agent of newAgents) {
      const key = `${agent.x}@${agent.y}@${agent.direction}`
      if (
        agent.y < 0 ||
        agent.y >= input.length ||
        agent.x < 0 ||
        agent.x >= input[0].length ||
        (input[agent.y][agent.x] === "." && visited.includes(key))
      ) {
        continue
      }

      visited.push(key)
      currentAgents.push(agent)
    }
  }

  return [...new Set(visited.map(place => place.split("@").slice(0, 2).join("@")))].length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const allStarterAgents = []
  for(let y = 0; y < input.length; y++) {
    allStarterAgents.push({ x: 0, y, direction: "right" })
    allStarterAgents.push({ x: input[0].length - 1, y, direction: "left" })
  }
  for(let x = 0; x < input[0].length; x++) {
    allStarterAgents.push({ x, y: 0, direction: "down" })
    allStarterAgents.push({ x, y: input.length - 1, direction: "up" })
  }

  const allResults = []

  for(let starter of allStarterAgents) {
    const currentAgents = [starter]
    const visited = [`${starter.x}@${starter.y}@${starter.direction}`]
  
    while (currentAgents.length > 0) {
      const newAgents = []
      for (const agent of currentAgents) {
        const { x, y, direction } = agent
        const current = input[y][x]
  
        if (current === undefined) {
          continue
        }
        if (current === "#") {
          if (direction === "right") {
            newAgents.push({ y: y + 1, x, direction: "down" })
          } else if (direction === "left") {
            newAgents.push({ x, y: y - 1, direction: "up" })
          } else if (direction === "up") {
            newAgents.push({ x: x - 1, y, direction: "left" })
          } else if (direction === "down") {
            newAgents.push({ x: x + 1, y, direction: "right" })
          }
        } else if (current === "/") {
          if (direction === "right") {
            newAgents.push({ y: y - 1, x, direction: "up" })
          } else if (direction === "left") {
            newAgents.push({ x, y: y + 1, direction: "down" })
          } else if (direction === "up") {
            newAgents.push({ x: x + 1, y, direction: "right" })
          } else if (direction === "down") {
            newAgents.push({ x: x - 1, y, direction: "left" })
          }
        } else if (current === "-") {
          if (direction === "right") {
            newAgents.push({ x: x + 1, y, direction })
          } else if (direction === "left") {
            newAgents.push({ x: x - 1, y, direction })
          } else if (direction === "up" || direction === "down") {
            newAgents.push({ x: x - 1, y, direction: "left" })
            newAgents.push({ x: x + 1, y, direction: "right" })
          }
        } else if (current === "|") {
          if (direction === "up") {
            newAgents.push({ x, y: y - 1, direction })
          } else if (direction === "down") {
            newAgents.push({ x, y: y + 1, direction })
          } else if (direction === "left" || direction === "right") {
            newAgents.push({ x, y: y - 1, direction: "up" })
            newAgents.push({ x, y: y + 1, direction: "down" })
          }
        } else {
          if (direction === "right") {
            newAgents.push({ x: x + 1, y, direction })
          } else if (direction === "left") {
            newAgents.push({ x: x - 1, y, direction })
          } else if (direction === "up") {
            newAgents.push({ x, y: y - 1, direction })
          } else if (direction === "down") {
            newAgents.push({ x, y: y + 1, direction })
          }
        }
      }
      currentAgents.length = 0
      for (const agent of newAgents) {
        const key = `${agent.x}@${agent.y}@${agent.direction}`
        if (
          agent.y < 0 ||
          agent.y >= input.length ||
          agent.x < 0 ||
          agent.x >= input[0].length ||
          (input[agent.y][agent.x] === "." && visited.includes(key))
        ) {
          continue
        }
  
        visited.push(key)
        currentAgents.push(agent)
      }
    }

    allResults.push([...new Set(visited.map(place => place.split("@").slice(0, 2).join("@")))].length)
  }
  //console.log(allResults.sort((a, b) => b - a))
  return allResults.sort((a, b) => b - a)[0]
}

run({
  part1: {
    tests: [
      {
        input: String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
    {
      input: String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
      expected: 51,
    },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
