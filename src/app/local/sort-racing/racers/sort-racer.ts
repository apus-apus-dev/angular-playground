export type CompareFn<T> = (a: T, b: T) => number;
export type SortFunction<T> = (arr: Array<T>, compareFn: CompareFn<T>) => Array<T>;

export enum SortAlgorithm {
  Bubble = 0,
  Insertion = 1,
}

export interface SortRacer<T> {
  name: string;
  id: string;
  sortingAlgorithms: Partial<Record<SortAlgorithm, SortFunction<T>>>;
}
