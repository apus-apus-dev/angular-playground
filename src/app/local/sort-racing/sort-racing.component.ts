import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SyperiaRacer } from './racers/basil/syperia-racer';
import { DemoRacer } from './racers/demo/demo-racer';
import { SortAlgorithm } from './racers/sort-racer';
import { charCompareFn } from './char-compare';
import { isRaceValid } from './race-validator';

@Component({
  selector: 'app-sort-racing',
  templateUrl: './sort-racing.component.html',
  styleUrls: ['./sort-racing.component.scss']
})
export class SortRacingComponent {
  constructor(private fb: FormBuilder) {
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
