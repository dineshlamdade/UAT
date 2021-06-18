import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentApprovalRoutingModule } from './investment-approval-routing.module';
import { InvestmentApprovalComponent } from './investment-approval.component';
import { InvestmentMasterApprovalComponent } from './investment-master-approval/investment-master-approval.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { TableModule } from 'primeng/table';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    InvestmentApprovalComponent,
    InvestmentMasterApprovalComponent,
    DocumentviewerComponent
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
