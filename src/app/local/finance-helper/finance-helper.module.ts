import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceHelperRoutingModule } from './finance-helper-routing.module';
import { FinanceHelperComponent } from './finance-helper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FinanceHelperComponent
  ],
  imports: [
    CommonModule,
    FinanceHelperRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FinanceHelperModule { }
