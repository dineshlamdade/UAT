import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnetimeInvestmentsApprovalComponent } from './onetime-investments-approval.component';
import { OnetimeInvestmentsTransactionApprovalComponent } from './onetime-investments-transaction-approval/onetime-investments-transaction-approval.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: OnetimeInvestmentsApprovalComponent,
        data: { title: ':: Delizia-Hr :: Onetime-Investments-Approval' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'transaction',
        component: OnetimeInvestmentsTransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Onetime-Investments-Approval-Transaction' },
      },
    ],
  },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'transaction',
  //       component: InvestmentTransactionApprovalComponent,
  //       data: { title: ':: Delizia-HR :: Investment-Approval-Transaction' },
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnetimeInvestmentsApprovalRoutingModule { }





