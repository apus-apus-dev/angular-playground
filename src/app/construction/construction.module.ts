import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { SeekRatComponent } from './seek-rat/seek-rat.component';



@NgModule({
  declarations: [
    UnderConstructionComponent,
    SeekRatComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UnderConstructionComponent,
    SeekRatComponent
  ]
})
export class ConstructionModule { }
