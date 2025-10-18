import { Component } from '@angular/core';
import { Project } from '../data/project';
import { DataService } from '../data/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  project: Project | null = null;
  constructor(public dataService: DataService) {
    dataService.getFeaturedProject().subscribe((project) => this.project = project);
  }
}
