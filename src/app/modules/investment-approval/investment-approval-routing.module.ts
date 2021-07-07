import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component';
import { InvestmentApprovalComponent } from './investment-approval.component';
import { InvestmentMasterApprovalComponent } from './investment-master-approval/investment-master-approval.component';
import { InvestmentTransactionApprovalComponent } from './investment-transaction-approval/investment-transaction-approval.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: InvestmentApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'master',
        component: InvestmentMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Master' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'transaction',
        component: InvestmentTransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Transaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'documentview',
        component: DocumentviewerComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Document-Viewer' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentApprovalRoutingModule {}
