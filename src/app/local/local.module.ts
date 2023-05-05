import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';
import { ConstructionModule } from '../construction/construction.module';

@NgModule({
  declarations: [
  ],
    imports: [
        CommonModule,
        LocalRoutingModule,
        ConstructionModule,
    ],
})
export class LocalModule { }
