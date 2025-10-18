import { Component, Input } from '@angular/core';
import { CurrentSortRacer } from '../current-sort-racer';
import { RaceProgress } from '../race-progress';

@Component({
    selector: 'app-race-display',
    templateUrl: './race-display.component.html',
    styleUrls: ['./race-display.component.scss'],
    standalone: false
})
export class RaceDisplayComponent {
  @Input() racers?: CurrentSortRacer[];
  @Input() progress?: RaceProgress;
}
