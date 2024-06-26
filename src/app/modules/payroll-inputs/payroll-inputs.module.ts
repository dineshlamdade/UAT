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
import { NonRecurringDashboardComponent } from './non-recurring-dashboard/non-recurring-dashboard.component';
import { TwoDigitDecimaNumberDirective } from './attendance/two-digit-decima-number.directive';
import { SdmStepperComponent } from './sdm-stepper/sdm-stepper.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChartsModule } from 'ng2-charts';
import { EllipsisPipe } from './sdm-stepper/EllipsisPipe';

import { HoldreleaseComponent } from './hold and release/holdrelease/holdrelease.component';
import { ReleaseComponent } from './release/release/release.component';
import { HoldComponent } from './hold and release/holdrelease/hold/hold.component';
import { ReleaseNewComponent } from './hold and release/holdrelease/release-new/release-new.component';
import { CheckboxModule } from 'primeng/checkbox';
// import { HoldComponent } from './hold and release/hold/hold.component';
// import { ReleaseNewComponent } from './hold and release/release-new/release-new.component';
import { GarnishmentMasterComponent } from './garnishment-master/garnishment-master.component';
import { GarnishmentTransactionComponent } from './garnishment-transaction/garnishment-transaction.component';
import { FastentryNrQtyComponent } from './fastentry-nr-qty/fastentry-nr-qty.component';
import { FastentryNRAmtComponent } from './fastentry-nr-amt/fastentry-nr-amt.component';
import { NonRecurringQtyMasterComponent } from './non-recurring-qty-master/non-recurring-qty-master.component';
import { FastentryGarnishmentComponent } from './fastentry-garnishment/fastentry-garnishment.component';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';

@NgModule({
  declarations: [
    PayrollListComponent,
     FinancialMasterComponent,
     NonRecurringAmtComponent,
     NonRecurringQtyComponent,
     AttendanceComponent,
     NonRecurringDashboardComponent,
     TwoDigitDecimaNumberDirective,
     SdmStepperComponent,
     EllipsisPipe,
    
     HoldreleaseComponent,
     ReleaseComponent,
     HoldComponent,
     ReleaseNewComponent,
     GarnishmentMasterComponent,
     GarnishmentTransactionComponent,
     FastentryNrQtyComponent,
     FastentryNRAmtComponent,
     NonRecurringQtyMasterComponent
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
    ChartsModule,
    CheckboxModule,
    NgxPaginationModule
  ],
  providers: [ DatePipe, PaginatePipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class PayrollInputsModule { }
