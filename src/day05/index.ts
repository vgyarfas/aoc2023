import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const [seeds, seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap] = rawInput.split("\n\n")
  const seedNums = seeds.split(": ")[1].split(" ").map(Number)
  const seedToSoil = seedToSoilMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>
  const soilToFertilizer = soilToFertilizerMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>
  const fertilizerToWater = fertilizerToWaterMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>
  const waterToLight = waterToLightMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>
  const lightToTemperature = lightToTemperatureMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>
  const temperatureToHumidity = temperatureToHumidityMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>
  const humidityToLocation = humidityToLocationMap.split("\n").slice(1).map((row) => row.split(" ").map(Number)) as Array<[destinationStart: number, sourceStart: number, range: number]>

  return {
    seedNums,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  }
}

const translateNums = (numToTranslate: number, ranges: Array<[destinationStart: number, sourceStart: number, range: number]>) => {
  const range = ranges.find(([destinationStart, sourceStart, range]) => numToTranslate >= sourceStart && numToTranslate < sourceStart + range)
  if(!range) {
    return numToTranslate
  } 
  const [destinationStart, sourceStart, rangeSize] = range
  return numToTranslate - sourceStart + destinationStart
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const locations = []

  for(let i = 0; i < input.seedNums.length; i++) {
    const seed = input.seedNums[i]
    const soil = translateNums(seed, input.seedToSoil)
    const fertilizer = translateNums(soil, input.soilToFertilizer)
    const water = translateNums(fertilizer, input.fertilizerToWater)
    const light = translateNums(water, input.waterToLight)
    const temperature = translateNums(light, input.lightToTemperature)
    const humidity = translateNums(temperature, input.temperatureToHumidity)
    const location = translateNums(humidity, input.humidityToLocation)

    locations.push(location)
  }

  return Math.min(...locations)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let seedRanges = []
  for(let i = 0; i < input.seedNums.length; i+=2) {
    seedRanges.push([input.seedNums[i], input.seedNums[i] + input.seedNums[i+1] - 1])
  }
  seedRanges.sort((a, b) => a[0] - b[0])

  const ranges = [input.seedToSoil, input.soilToFertilizer, input.fertilizerToWater, input.waterToLight, input.lightToTemperature, input.temperatureToHumidity, input.humidityToLocation]

  for(let xToY of ranges) {
    let yRanges = []
    for(let i = 0; i < xToY.length; i++) {
      yRanges.push([xToY[i][1], xToY[i][1] + xToY[i][2] - 1])
    }
    yRanges = yRanges.sort((a, b) => a[0] - b[0])
    if(yRanges[0][0] !== 0) {
      yRanges.unshift([0, yRanges[0][0] - 1])
    }
    if(yRanges[yRanges.length - 1][1] !== Number.MAX_SAFE_INTEGER) {
      yRanges.push([yRanges[yRanges.length - 1][1] + 1, Number.MAX_SAFE_INTEGER])
    }
    for(let i = 0; i < yRanges.length - 1; i++) {
      if(yRanges[i][1] + 1 !== yRanges[i+1][0]) {
        yRanges.splice(i+1, 0, [yRanges[i][1] + 1, yRanges[i+1][0] - 1])
        i++
      }
    }
    const newSeedRanges = []
    for(let i = 0; i < seedRanges.length; i++) {
      const [start, end] = seedRanges[i]
      const startRangeIndex = yRanges.findIndex(([soilStart, soilEnd]) => start >= soilStart && start <= soilEnd)
      const endRangeIndex = yRanges.findIndex(([soilStart, soilEnd]) => end >= soilStart && end <= soilEnd)
      if(startRangeIndex === endRangeIndex) {
        newSeedRanges.push([translateNums(start, xToY), translateNums(end, xToY)])
        continue
      } else if(startRangeIndex !== endRangeIndex) {
        for(let j = startRangeIndex; j <= endRangeIndex; j++) {
          if(j === startRangeIndex) {
            newSeedRanges.push([translateNums(start, xToY), translateNums(yRanges[j][1], xToY)])
          } else if(j === endRangeIndex) {
            newSeedRanges.push([translateNums(yRanges[j][0], xToY), translateNums(end, xToY)])
          } else {
            newSeedRanges.push([translateNums(yRanges[j][0], xToY), translateNums(yRanges[j][1], xToY)])
          }
        }
        continue
      }
    }
    seedRanges = newSeedRanges.sort((a, b) => a[0] - b[0])
  }

  return Math.min(...seedRanges.map(([start, end]) => start));
}

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
