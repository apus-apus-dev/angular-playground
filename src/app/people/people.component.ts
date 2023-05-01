import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Developer } from '../data/developer';

@UntilDestroy()
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  developers: Developer[] = [];

  constructor(public dataService: DataService) {
    dataService.getDevelopers().pipe(untilDestroyed(this)).subscribe((developers) => this.developers = developers);
  }
}
