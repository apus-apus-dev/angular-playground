import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CypherHelperRoutingModule } from './cypher-helper-routing.module';
import { BtnCellRenderer, CypherHelperComponent } from './cypher-helper.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    CypherHelperComponent,
    BtnCellRenderer
  ],
  imports: [
    CommonModule,
    CypherHelperRoutingModule,
    FormsModule,
    AgGridModule,
  ],
})
export class CypherHelperModule { }
