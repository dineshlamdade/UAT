import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySettingRoutingModule } from './company-setting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayrollComponent } from '../payroll/payroll.component';
import { CompanySettingComponent } from './company-setting.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout';
import { GarnishmentMasterComponent } from './payroll/garnishment-master/garnishment-master.component';
import { MatSliderModule } from '@angular/material/slider';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FinancialMasterComponent } from './payroll/financial-master/financial-master.component';




@NgModule({
  declarations: [
    GarnishmentMasterComponent,
    CompanySettingComponent,
    FinancialMasterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CompanySettingRoutingModule,
    ReactiveFormsModule,
    SharedlayoutModule,
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
    NgMultiSelectDropDownModule,
    
  ]
})
export class CompanySettingModule { }
