import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CypherHelperRoutingModule } from './cypher-helper-routing.module';
import { CypherHelperComponent } from './cypher-helper.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CypherHelperComponent
  ],
  imports: [
    CommonModule,
    CypherHelperRoutingModule,
    FormsModule,
  ],
})
export class CypherHelperModule { }
