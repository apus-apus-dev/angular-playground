import { CompareFn, RaceCompareFn, SortAlgorithm, SortRacer } from '../../sort-racer';

function bubbleSort<T>(arr: Array<T>, compareFn: RaceCompareFn<T>): Array<T> {
  return arr.sort(compareFn);
}

function insertionSort<T>(arr: Array<T>, compareFn: RaceCompareFn<T>): Array<T> {
  return arr.reverse().sort(compareFn).reverse().reverse();
}

export class DemoRacer<T> implements SortRacer<T> {
  name = 'Swift doing his best...';
  id = '532';
  sortingAlgorithms = {
    [SortAlgorithm.Bubble]: bubbleSort,
    [SortAlgorithm.Insertion]: insertionSort,
  }
}
