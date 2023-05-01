import { Component } from '@angular/core';
import { Project } from '../data/project';
import { DataService } from '../data/data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Project[] = [];
  constructor(public dataService: DataService) {
    dataService.getProjects().pipe(untilDestroyed(this)).subscribe((projects) => this.projects = projects);
  }
}
