import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component';
import { InvestmentApprovalComponent } from './investment-approval.component';
import { InvestmentMasterApprovalComponent } from './investment-master-approval/investment-master-approval.component';
import { InvestmentTransactionApprovalComponent } from './investment-transaction-approval/investment-transaction-approval.component';
import { InvestmentOnetimetransactionApprovalComponent } from './investment-onetimetransaction-approval/investment-onetimetransaction-approval.component';
import { InvestmentHandicappeddependentmasterApprovalComponent } from './investment-handicappeddependentmaster-approval/investment-handicappeddependentmaster-approval.component';
import { InvestmentIntereston80TTATTBMasterApprovalComponent } from './investment-intereston80-tta-ttb-master-approval/investment-intereston80-tta-ttb-master-approval.component';
import { InvestmentInterestOnEducationalLoanMasterApprovalComponent } from './investment-interest-on-educational-loan-master-approval/investment-interest-on-educational-loan-master-approval.component';
import { InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval/investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval.component';
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
        path: 'interestoneducationalloanmaster',
        component: InvestmentInterestOnEducationalLoanMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-InterestOnEducationalLoanMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'interestonloanforpurchaseofelectricvehiclemaster',
        component: InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-InterestOnLoanForPurchaseOfElectricVehicleMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'handicappeddependentmaster',
        component: InvestmentHandicappeddependentmasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-HandicappeddependentMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'intereston80ttattbmaster',
        component: InvestmentIntereston80TTATTBMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Intereston80TTATTBMaster' },
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
        path: 'onetimetransaction',
        component: InvestmentOnetimetransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-OneTimeTransaction' },
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
