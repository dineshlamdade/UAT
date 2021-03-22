import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanMasterComponent } from './loan-master/loan-master.component';

const routes: Routes = [
  {
    path:'',
    component: LoanMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanMasterRoutingModule { }
