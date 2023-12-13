export const getArraysIntersection = <T, _>(a: T[], ...arr: T[][]): T[] =>
  [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)))
