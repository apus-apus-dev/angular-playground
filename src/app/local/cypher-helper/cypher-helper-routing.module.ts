import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CypherHelperComponent } from './cypher-helper.component';

const routes: Routes = [{ path: '', component: CypherHelperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CypherHelperRoutingModule { }
