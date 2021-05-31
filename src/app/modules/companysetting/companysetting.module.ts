import { AttributeDependencyComponent } from './attribute-dependency/attribute-dependency.component';
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
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { BusinessYearComponent } from './business-cycle/business-year/business-year.component';
import { CycleDefinitionComponent } from './business-cycle/cycle-definition/cycle-definition.component';
import { CycleCreationComponent } from './business-cycle/cycle-creation/cycle-creation.component';
import { BusinessCycleComponent } from './business-cycle/business-cycle.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { AttributeSelectionComponent } from './attribute-selection/attribute-selection.component';
import { HeadCreationComponent } from './head-creation/head-creation.component';
import { AttributeGlobalComponent } from './attribute-global/attribute-global.component';
import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation/payroll-head-group-creation.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule( {
  declarations: [
    HeadCreationComponent,
    //   PayrollHeadGroupCreationComponent,
    PayrollHeadGroupCreationComponent,
    BusinessCycleComponent,
    AttributeSelectionComponent,
    AttributeCreationComponent,
    BusinessYearComponent,
    CycleDefinitionComponent,
    CycleCreationComponent,
    AttributeGlobalComponent,
    AttributeDependencyComponent,
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
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot( {
      positionClass: 'toast-top-center',
    } ),
    SharedlayoutModule,
    CompanySettingRoutingModule,
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
  ],

  providers: [DatePipe, NumberFormatPipe],

} )
export class CompanySettingModule { }

