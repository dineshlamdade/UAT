import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { LoanMasterComponent } from './loan-master/loan-master.component';
import { PaymentComponent } from './payment/payment.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {
    path:'',
    // component: LoanMasterComponent,
    children: [
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'recovery',
        component: RecoveryComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanMasterRoutingModule { }
