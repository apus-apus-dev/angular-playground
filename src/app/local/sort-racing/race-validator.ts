import { CompareFn } from './sort-racer';

export function isRaceValid<T>(arr: Array<T>, compareFn: CompareFn<T>): boolean {
  return arr.every((value, index, array) => {
    if (index === 0) {
      return true;
    }
    return compareFn(value, array[index - 1]) >= 0;
  })
}
