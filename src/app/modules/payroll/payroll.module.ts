import { PayrollRoutingModule } from './payroll-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { NumberFormatPipe } from '../../core/utility/pipes/NumberFormatPipe';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { PayrollComponent } from './payroll.component';
import { PayrollAreaMasterComponent } from './payrollAreaMaster/payrollAreaMaster.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { YesNoPipe } from '../../core/utility/pipes/yesNo.pipe';


@NgModule({
  declarations: [PayrollComponent,
    PayrollAreaMasterComponent,],
  imports: [
      PayrollRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
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
    SharedlayoutModule,
  ],

  providers: [ DatePipe, NumberFormatPipe,
    YesNoPipe],

})
export class PayrollModule { }
