import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanMasterRoutingModule } from './loan-master-routing.module';
import { LoanMasterComponent } from './loan-master/loan-master.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { SummaryComponent } from './summary/summary.component';
import { GeneralComponent } from './general/general.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoanMasterComponent, SummaryComponent, GeneralComponent, RecoveryComponent, PaymentComponent],
  imports: [
    CommonModule,
    LoanMasterRoutingModule,
    SharedlayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoanMasterModule { }
