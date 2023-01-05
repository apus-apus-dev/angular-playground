import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { ConstructionModule } from '../construction/construction.module';


@NgModule({
  declarations: [
    PeopleComponent
  ],
    imports: [
        CommonModule,
        PeopleRoutingModule,
        ConstructionModule,
    ],
})
export class PeopleModule { }
