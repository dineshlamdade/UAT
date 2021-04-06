import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan/loan.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { EmiCalculatorComponent } from './loan/emi-calculator/emi-calculator.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { EmisimulatorComponent } from './loan/emisimulator/emisimulator.component';

@NgModule({
  declarations: [LoanComponent, AddNewLoanComponent, EmiCalculatorComponent, EmisimulatorComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    SharedlayoutModule,
    ReactiveFormsModule,
    NgxSliderModule 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LoanModule { }
