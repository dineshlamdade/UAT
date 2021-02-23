import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
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
      ],
      canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollRoutingModule { }
