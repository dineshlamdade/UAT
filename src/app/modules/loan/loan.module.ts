import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan/loan.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { ExcelService } from '../uploadexcel/uploadexcelhome/excel.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmiCalculatorComponent } from './loan/emi-calculator/emi-calculator.component';
import { ChartsModule } from 'ng2-charts';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [LoanComponent, AddNewLoanComponent,EmiCalculatorComponent],
  imports: [
    CommonModule,
    LoanRoutingModule,
    SharedlayoutModule,
    ReactiveFormsModule,
    InputNumberModule,
    ChartsModule,
    NgxSliderModule,
    FormsModule,
    Ng2SearchPipeModule

  ],
  providers: [ExcelService],
  bootstrap: [LoanComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class LoanModule { }
