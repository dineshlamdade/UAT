import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { DisbursementComponent } from './disbursement/disbursement.component';
import { LoanComponent } from './loan/loan.component';
import {AdhocComponent} from './adhoc/adhoc.component';
import {RescheduleComponent} from './reschedule/reschedule.component';
import { SettlementComponent } from './settlement/settlement.component';
// import { LoanSummaryComponent } from './loan-summary/loan-summary.component';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
          path:'add-new-loan',
          component:AddNewLoanComponent,

      },
      {
          path:'disbursement',
          component:DisbursementComponent,

      },
      {
          path:'adhoc',
          component:AdhocComponent,

      },
      {
          path:'rescheduleRequest',
          component:RescheduleComponent,

      },
      {
          path:'settlementRequest',
          component:SettlementComponent,

      },
      {
            path:'application',
            component:LoanComponent,

      },
      // {
      //     path:'summary',
      //     component:LoanSummaryComponent,

      // },
      {
          path:'loan-approval',
          component:LoanApprovalComponent,

      },
      ]
  },

  // {

  //         path:'add-new-loan',
  //         component:AddNewLoanComponent,
  //         data: { title: ':: DelziaHR :: Apply Loan' },

  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule {
    public static components = [
  ];

}
