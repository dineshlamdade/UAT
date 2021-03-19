import { AttributeSelectionComponent } from './attribute-selection/attribute-selection.component';
import { BusinessCycleComponent } from './business-cycle/business-cycle.component';
import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation/payroll-head-group-creation.component';
import { HeadCreationComponent } from './head-creation/head-creation.component';
import { SharedlayoutModule } from './../sharedlayout/sharedlayout.module';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSliderModule } from '@angular/material/slider';
import { AttributeCreationComponent } from './attribute-creation/attribute-creation.component';
import { CompanySettingRoutingModule } from './companysetting.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BusinessYearComponent } from './business-cycle/business-year/business-year.component';
import { CycleDefinitionComponent } from './business-cycle/cycle-definition/cycle-definition.component';
import { CycleCreationComponent } from './business-cycle/cycle-creation/cycle-creation.component';


@NgModule( {
  declarations: [
    HeadCreationComponent,
    PayrollHeadGroupCreationComponent,
    BusinessCycleComponent,
    AttributeSelectionComponent,
    AttributeCreationComponent,
    BusinessYearComponent,
    CycleDefinitionComponent,
    CycleCreationComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
    ToastrModule.forRoot( {
      positionClass: 'toast-top-center',
    } ),
    SharedlayoutModule,
    CompanySettingRoutingModule,
  ],

  providers: [DatePipe, NumberFormatPipe],

} )
export class CompanySettingModule { }
