import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'projects/local', loadChildren: () => import('./local/local.module').then(m => m.LocalModule) },
  {
    path: '', component: LayoutComponent, children: [
      {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
      {path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)},
      {path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)},
      {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
