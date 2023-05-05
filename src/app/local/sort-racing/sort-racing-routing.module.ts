import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortRacingComponent } from './sort-racing.component';

const routes: Routes = [{ path: '', component: SortRacingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortRacingRoutingModule { }
