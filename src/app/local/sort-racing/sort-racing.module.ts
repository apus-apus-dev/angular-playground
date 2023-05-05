import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortRacingRoutingModule } from './sort-racing-routing.module';
import { SortRacingComponent } from './sort-racing.component';


@NgModule({
  declarations: [
    SortRacingComponent
  ],
  imports: [
    CommonModule,
    SortRacingRoutingModule
  ]
})
export class SortRacingModule { }
