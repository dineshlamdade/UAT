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

@NgModule({
  declarations: [
    InvestmentApprovalComponent,
    InvestmentMasterApprovalComponent,
    DocumentviewerComponent,
    InvestmentTransactionApprovalComponent,
    InvestmentOnetimetransactionApprovalComponent
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
