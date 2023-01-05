import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ConstructionModule } from '../construction/construction.module';


@NgModule({
  declarations: [
    AboutComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        ConstructionModule,
    ],
})
export class AboutModule { }
