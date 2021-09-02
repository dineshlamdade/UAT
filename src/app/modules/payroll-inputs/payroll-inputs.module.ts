import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { MatSliderModule } from '@angular/material/slider';
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



import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';

import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PayrollInputsRoutingModule } from './payroll-inputs-routing.module';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout';
import { NonRecurringAmtComponent } from './non-recurring-amt/non-recurring-amt.component';
import { NonRecurringQtyComponent } from './non-recurring-qty/non-recurring-qty.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { GarnishmentComponent } from './garnishment/garnishment.component';
import { NonRecurringDashboardComponent } from './non-recurring-dashboard/non-recurring-dashboard.component';
import { TwoDigitDecimaNumberDirective } from './attendance/two-digit-decima-number.directive';
import { SdmComponent } from './sdm/sdm.component';
import { SdmStepperComponent } from './sdm-stepper/sdm-stepper.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChartsModule } from 'ng2-charts';
import { EllipsisPipe } from './sdm-stepper/EllipsisPipe';
import { Component2Component } from './component2/component2.component';

@NgModule({
  declarations: [
    PayrollListComponent,
     FinancialMasterComponent,
     NonRecurringAmtComponent,
     NonRecurringQtyComponent,
     AttendanceComponent,
     GarnishmentComponent,
     NonRecurringDashboardComponent,
     TwoDigitDecimaNumberDirective,
     SdmComponent,
     SdmStepperComponent,
     EllipsisPipe,
     Component2Component
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    NgMultiSelectDropDownModule.forRoot(),

    SharedlayoutModule,

    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,

		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    PayrollInputsRoutingModule,
    ChartsModule
  ],
  providers: [ DatePipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class PayrollInputsModule { }
