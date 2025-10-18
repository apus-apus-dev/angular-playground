import { Component } from '@angular/core';
import { Project } from '../data/project';
import { DataService } from '../data/data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: false
})
export class ProjectsComponent {
  projects: Project[] = [];
  constructor(public dataService: DataService) {
    dataService.getProjects().pipe(takeUntilDestroyed()).subscribe((projects) => this.projects = projects);
  }
}
