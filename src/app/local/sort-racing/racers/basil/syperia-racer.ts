import { CompareFn, RaceCompareFn, SortAlgorithm, SortRacer } from '../../sort-racer';

function bubbleSort<T>(arr: Array<T>, compareFn: RaceCompareFn<T>): Array<T> {
  return arr.sort(compareFn);
}

function insertionSort<T>(arr: Array<T>, compareFn: RaceCompareFn<T>): Array<T> {
  return arr.sort(compareFn);
}

function quickSort<T>(arr: Array<T>, compareFn: RaceCompareFn<T>): Array<T> {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (compareFn(arr[i], pivot, arr) < 0) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...quickSort(leftArr, compareFn), pivot, ...quickSort(rightArr, compareFn)];
}

export class SyperiaRacer<T> implements SortRacer<T> {
  name = 'Basil doing his best...';
  id = '531';
  sortingAlgorithms = {
    [SortAlgorithm.Bubble]: quickSort,
    [SortAlgorithm.Insertion]: insertionSort,
  }
}
