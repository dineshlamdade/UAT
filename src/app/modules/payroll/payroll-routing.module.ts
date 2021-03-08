import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { PayrollInputsComponent } from './payroll-Inputs/payroll-Inputs.component';
import { PayrollComponent } from './payroll.component';
import { PayrollAreaMasterComponent } from './payrollAreaMaster/payrollAreaMaster.component';

const routes: Routes = [

  {
    path: 'payroll',
    children: [
      {
        component:  PayrollAreaMasterComponent,
        data: { title: ':: DelziaHR :: Area Master' },
        path:   'area-master',
        },
        {
          component:  PayrollInputsComponent,
          data: { title: ':: DelziaHR :: Area Master' },
          path:   'payroll-inputs',
          },
        {
          component:  FinancialMasterComponent,
          data: { title: ':: DelziaHR :: Area Master' },
          path:   'financial-master',
          },
      ],
      canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollRoutingModule { }
