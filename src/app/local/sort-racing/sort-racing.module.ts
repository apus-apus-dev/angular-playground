import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortRacingRoutingModule } from './sort-racing-routing.module';
import { SortRacingComponent } from './sort-racing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SortRacingComponent
  ],
  imports: [
    CommonModule,
    SortRacingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SortRacingModule { }
