import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan/loan.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';


@NgModule({
  declarations: [LoanComponent, AddNewLoanComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    SharedlayoutModule,
    ReactiveFormsModule,

  ]
})
export class LoanModule { }
