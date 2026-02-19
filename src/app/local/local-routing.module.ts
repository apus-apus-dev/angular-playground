import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sort-racing',
    loadChildren: () =>
      import('./sort-racing/sort-racing.module').then(
        (m) => m.SortRacingModule
      ),
  },
  {
    path: 'cypher-helper',
    loadChildren: () =>
      import('./cypher-helper/cypher-helper.module').then(
        (m) => m.CypherHelperModule
      ),
  },
  {
    path: 'finance-helper',
    loadChildren: () =>
      import('./finance-helper/finance-helper.module').then(
        (m) => m.FinanceHelperModule
      ),
  },
  {
    path: 'top-500-albums',
    loadComponent: () =>
      import('./top-500-albums/top-500-albums.component').then(
        (m) => m.Top500AlbumsComponent
      ),
  },
  {
    path: 'har-analyzer',
    loadComponent: () =>
      import('./har-analyzer/har-analyzer.component').then(
        (m) => m.HarAnalyzerComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalRoutingModule {}
