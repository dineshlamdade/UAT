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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSliderModule } from '@angular/material/slider';
import { LockRoutingModule } from './lock-routing.module';
import { LockComponent } from './lock.component';
import { BusinessYearComponent } from './business-year/business-year.component';
import { CycleComponent } from './cycle/cycle.component';
import { EmployeeComponent } from './employee/employee.component';
import {TableModule} from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdhocComponent } from './adhoc/adhoc.component';
import { SupplementryCycleComponent } from './supplementry-cycle/supplementry-cycle.component';
import { SummaryComponent } from './summary/summary.component';
import { AreaComponent } from './area/area.component';
import { MultiSelectModule } from 'primeng/multiselect';
// import { NewlockComponent } from './newlock/newlock.component';
@NgModule({
  declarations: [
    LockComponent,
    BusinessYearComponent,
    CycleComponent,
    EmployeeComponent,
    AdhocComponent,
    AreaComponent,
    SupplementryCycleComponent,
    SummaryComponent,
    // NewlockComponent
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
    NgMultiSelectDropDownModule.forRoot(),
    MultiSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    SharedlayoutModule,
    LockRoutingModule,
    TableModule,
    TabsModule.forRoot(),
  ],

  providers: [ DatePipe, NumberFormatPipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class LockModule { }
