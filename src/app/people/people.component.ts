import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { Developer } from '../data/developer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    standalone: false
})
export class PeopleComponent {
  developers: Developer[] = [];

  constructor(public dataService: DataService) {
    dataService.getDevelopers().pipe(takeUntilDestroyed()).subscribe((developers) => this.developers = developers);
  }
}
