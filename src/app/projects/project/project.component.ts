import { Component } from '@angular/core';
import { Project } from '../../data/project';
import { DataService } from '../../data/data.service';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project: Project | null = null;
  constructor(public dataService: DataService, activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.pipe(
      map((params) => params.get('projectSlug')),
      switchMap((slug) => slug ? dataService.getProject(slug) : of(null)),
      takeUntilDestroyed()
    ).subscribe((project) => this.project = project);
  }
}
