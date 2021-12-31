import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PrimeNGModule } from './../../app.primeNG.module';
import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan/loan.component';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { ExcelService } from '../uploadexcel/uploadexcelhome/excel.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { EmiCalculatorComponent } from './loan/emi-calculator/emi-calculator.component';
import { ChartsModule } from 'ng2-charts';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {TableModule} from 'primeng/table';

import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatPipe } from '../../core/utility/pipes/NumberFormatPipe';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';


import { DisbursementComponent } from './disbursement/disbursement.component';
import { AdhocComponent } from './adhoc/adhoc.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { SettlementComponent } from './settlement/settlement.component';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { HttpClientModule } from '@angular/common/http';
// import { LoanSummaryComponent } from './loan-summary/loan-summary.component';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';


@NgModule({
  declarations: [LoanComponent, AddNewLoanComponent,EmiCalculatorComponent, DisbursementComponent, AdhocComponent, RescheduleComponent,
     SettlementComponent,  LoanApprovalComponent],
  imports: [
    CollapseModule,ProgressbarModule,PopoverModule,ToastrModule,ModalModule,BsDropdownModule,CarouselModule,
    AlertModule,AccordionModule,
    CommonModule,
    LoanRoutingModule,
    SharedlayoutModule,
    ReactiveFormsModule,
    InputNumberModule,
    ChartsModule,
    NgxSliderModule,
    FormsModule,
    Ng2SearchPipeModule,
    TableModule,
    BsDatepickerModule.forRoot(),
    TooltipModule,
    HttpClientModule,
    PrimeNGModule,
    BsDatepickerModule.forRoot()
  ],
  // providers: [ExcelService],
  providers: [ExcelService, DatePipe,NumberFormatPipe],
  bootstrap: [LoanComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class LoanModule { }
