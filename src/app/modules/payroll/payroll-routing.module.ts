import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from './payroll.component';


const routes: Routes = [

  {
    path: 'payroll',
    component: PayrollComponent,
    data: { title: ':: Delizia-HR :: Payroll' },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
