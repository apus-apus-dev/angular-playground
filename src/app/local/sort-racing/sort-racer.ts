export type CompareFn<T> = (a: T, b: T) => number;
export type RaceCompareFn<T> = (a: T, b: T, arr?: Array<T>) => number;
export type SortFunction<T> = (arr: Array<T>, compareFn: RaceCompareFn<T>) => Array<T>;

export enum SortAlgorithm {
  Bubble = 0,
  Insertion = 1,
}

export interface SortRacer<T> {
  name: string;
  id: string;
  sortingAlgorithms: Partial<Record<SortAlgorithm, SortFunction<T>>>;
}
