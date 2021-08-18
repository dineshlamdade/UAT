import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnetimeInvestmentsApprovalRoutingModule } from './onetime-investments-approval-routing.module';
import { OnetimeInvestmentsApprovalComponent } from './onetime-investments-approval.component';
import { OnetimeInvestmentsTransactionApprovalComponent } from './onetime-investments-transaction-approval/onetime-investments-transaction-approval.component';



@NgModule({
  declarations: [
    OnetimeInvestmentsApprovalComponent,
    OnetimeInvestmentsTransactionApprovalComponent,
  ],
  imports: [
    CommonModule,
    OnetimeInvestmentsApprovalRoutingModule
  ]
})
export class OnetimeInvestmentsApprovalModule { }
