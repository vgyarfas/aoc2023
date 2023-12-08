export const findAllIndexes = <T>(array: Array<T>, predicate: (value: T, index: number, obj: Array<T>) => boolean): number[] => {
  const indexes = [];
  let l = array.length;
  while (l--) {
      if (predicate(array[l], l, array)) {
          indexes.push(l);
      }
  }
  return indexes.sort((a, b) => a - b);
}