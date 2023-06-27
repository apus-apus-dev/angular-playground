import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SyperiaRacer } from './racers/basil/syperia-racer';
import { DemoRacer } from './racers/demo/demo-racer';
import { SortAlgorithm } from './sort-racer';
import { charCompareFn } from './char-compare';
import { isRaceValid } from './race-validator';
import { CurrentSortRacer } from './current-sort-racer';
import { RaceProgress } from './race-progress';
import { RoadPiece } from './road-piece';
import { roadPieceCompareFn } from './road-piece-compare';

function getCorrectPlacementScore(arr: RoadPiece[]): number {
  return arr.reduce((acc, curr, index) => {
    return acc + Math.abs(curr.targetIndex - curr.index);
  }, 0);
}

function getCorrectPlacementScore2(arr: RoadPiece[]): number {
  const res = arr.reduce((acc, curr, index) => {
    return acc + Math.abs(curr.targetIndex - index);
  }, 0);
  return res;
}

@Component({
  selector: 'app-sort-racing',
  templateUrl: './sort-racing.component.html',
  styleUrls: ['./sort-racing.component.scss']
})
export class SortRacingComponent {
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    const roadArr: RoadPiece[] = [...'987654321']
      .map((char, index) => ({ index, value: char, targetIndex: 0 }));
    [...roadArr].sort(roadPieceCompareFn).forEach((roadPiece, index) => roadPiece.targetIndex = index);
    console.log(roadArr, getCorrectPlacementScore(roadArr));

    let iterations = 0;
    let gas = 0;
    const res = this.racers[0].sortingAlgorithms[SortAlgorithm.Bubble](roadArr, (a, b, arr) => {
      // Is this a whole array or just another recursion?
      if (arr) {
        if (arr.length && arr[0]?.index === 0) {
          // Is the root )
        } else {
          console.log(arr.map((e) => e.value).join(''), getCorrectPlacementScore(arr), getCorrectPlacementScore2(arr), a.value, b.value)
        }
      }
      iterations++;
      return roadPieceCompareFn(a, b);
    })
    console.log(iterations, getCorrectPlacementScore2(res))
    if (!isRaceValid(res, roadPieceCompareFn)) {
      console.error('NOT valid race', res);
    }
  }

  racingForm: FormGroup = this.fb.group({
    input: ['Hello world!'],
    algorithm: [SortAlgorithm.Bubble],
  });
  sortingAlgorithms = [
    { name: 'Bubble sort', value: SortAlgorithm.Bubble },
    { name: 'Insertion sort', value: SortAlgorithm.Insertion },
  ];
  racers = [
    new SyperiaRacer<string>(),
    new DemoRacer<string>(),
  ]
  currentRacers: CurrentSortRacer[] = [];
  raceProgress: RaceProgress = {};

  handleSubmit() {
    console.log(this.racingForm.value);
    const arr = [...this.racingForm.value.input];
    this.racers.forEach((racer) => {
      const readyAlgo = racer.sortingAlgorithms[this.racingForm.value.algorithm as SortAlgorithm];
      if (readyAlgo) {
        const label = new Date().toString();
        console.log('Racer', racer.name, racer.id)
        console.time(label);
        const res = readyAlgo(arr, charCompareFn)
        console.timeEnd(label);
        if (!isRaceValid(res, charCompareFn)) {
          console.error('NOT valid race');
        }
      }
    })
  }
}
