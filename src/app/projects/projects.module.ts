import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ConstructionModule } from '../construction/construction.module';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ConstructionModule,
  ],
})
export class ProjectsModule { }
