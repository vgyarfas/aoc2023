import run from "aocrunner"
import { findAllIndexes } from "../utils/find-all-indexes.js";
import { leastCommonMultiples } from "../utils/least-common-multiples.js";

const parseInput = (rawInput: string) => {
  const [instructions, ...nodesRaw] = rawInput.split("\n").filter((line) => line.length > 0);

  const nodes = nodesRaw.map((node) => {
    const [name, left, right] = node.replace(" = (", ",").replaceAll(", ", ",").replaceAll(")", "").split(",");
    return { name, left, right };
  })

  return {
    instructions: instructions.split(""),
    nodes,
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let steps = 0;
  let currentNodeIndex = input.nodes.findIndex((node) => node.name === "AAA");

  while(input.nodes[currentNodeIndex].name !== "ZZZ") {
    const currentNode = input.nodes[currentNodeIndex];
    const nextStep = input.instructions[steps % input.instructions.length];
    if (nextStep === "L") {
      currentNodeIndex = input.nodes.findIndex((node) => node.name === currentNode.left);
    } else {
      currentNodeIndex = input.nodes.findIndex((node) => node.name === currentNode.right);
    }
    steps++;
  }

  return steps;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  //let steps = 0;
  let currentNodeIndexes = findAllIndexes(input.nodes, (node) => node.name[2] === "A");
  const nodeSteps = [];

  for(let nodeIndex of currentNodeIndexes) {
    let steps = 0;
    let currentNodeIndex = nodeIndex;
    while(input.nodes[currentNodeIndex].name[2] !== "Z") {
      const currentNode = input.nodes[currentNodeIndex];
      const nextStep = input.instructions[steps % input.instructions.length];
      if (nextStep === "L") {
        currentNodeIndex = input.nodes.findIndex((node) => node.name === currentNode.left);
      } else {
        currentNodeIndex = input.nodes.findIndex((node) => node.name === currentNode.right);
      }
      steps++;
    }

    nodeSteps.push(steps);
  }

  return leastCommonMultiples(...nodeSteps);
}

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
