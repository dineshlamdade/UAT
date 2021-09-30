import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentApprovalRoutingModule } from './investment-approval-routing.module';
import { InvestmentApprovalComponent } from './investment-approval.component';
import { InvestmentMasterApprovalComponent } from './investment-master-approval/investment-master-approval.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { TableModule } from 'primeng/table';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InvestmentTransactionApprovalComponent } from './investment-transaction-approval/investment-transaction-approval.component';
import { InvestmentOnetimetransactionApprovalComponent } from './investment-onetimetransaction-approval/investment-onetimetransaction-approval.component';
import { InvestmentHandicappeddependentmasterApprovalComponent } from './investment-handicappeddependentmaster-approval/investment-handicappeddependentmaster-approval.component';
import { InvestmentIntereston80TTATTBMasterApprovalComponent } from './investment-intereston80-tta-ttb-master-approval/investment-intereston80-tta-ttb-master-approval.component';
import { InvestmentInterestOnEducationalLoanMasterApprovalComponent } from './investment-interest-on-educational-loan-master-approval/investment-interest-on-educational-loan-master-approval.component';
import { InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval/investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval.component';

@NgModule({
  declarations: [
    InvestmentApprovalComponent,
    InvestmentMasterApprovalComponent,
    DocumentviewerComponent,
    InvestmentTransactionApprovalComponent,
    InvestmentOnetimetransactionApprovalComponent,
    InvestmentHandicappeddependentmasterApprovalComponent,
    InvestmentIntereston80TTATTBMasterApprovalComponent,
    InvestmentInterestOnEducationalLoanMasterApprovalComponent,
    InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent
  ],
  imports: [
    CommonModule,
    InvestmentApprovalRoutingModule,
    SharedlayoutModule,
    TableModule,
    MultiSelectModule,
  ],
})
export class InvestmentApprovalModule {}
