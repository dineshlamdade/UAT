import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from '../payroll/payroll.component';
import { FinancialMasterComponent } from './payroll/financial-master/financial-master.component';
import { GarnishmentMasterComponent } from './payroll/garnishment-master/garnishment-master.component';




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:   'Garnishment-Master',
        component:  GarnishmentMasterComponent,
        data: { title: ':: Garnishment-Master' },
      },
      {
        path:   'Financial-Master',
        component:  FinancialMasterComponent,
        data: { title: '::Financial-Master' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingRoutingModule { }
