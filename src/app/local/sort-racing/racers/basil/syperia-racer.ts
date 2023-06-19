import { CompareFn, SortAlgorithm, SortRacer } from '../sort-racer';

function bubbleSort<T>(arr: Array<T>, compareFn: CompareFn<T>): Array<T> {
  return arr.sort(compareFn);
}

function insertionSort<T>(arr: Array<T>, compareFn: CompareFn<T>): Array<T> {
  return arr.sort(compareFn);
}

export class SyperiaRacer<T> implements SortRacer<T> {
  name = 'Basil doing his best...';
  id = '531';
  sortingAlgorithms = {
    [SortAlgorithm.Bubble]: bubbleSort,
    [SortAlgorithm.Insertion]: insertionSort,
  }
}
