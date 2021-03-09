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

import { payrollComponent } from './bc/bc.component';
import {HeadcreationComponent} from './headcreation/headcreation.component';
import {AttributecreationComponent} from './attributecreation/attributecreation.component';
import {AttributeselectionComponent} from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';
import { CompanySettingRoutingModule } from './companysetting.routing.module';
import { CompanySettingComponent } from './companysetting.component';
import { ReimbursementMasterComponent } from './reimbursement-master/reimbursement-master.component';
import { RembSummaryComponent } from './reimbursement-master/remb-summary/remb-summary.component';
import { RembGeneralComponent } from './reimbursement-master/remb-general/remb-general.component';
import { RembComputationComponent } from './reimbursement-master/remb-computation/remb-computation.component';
import { RegisterFormComponent} from './register-form/register-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { DeclarationFormComponent } from './declaration-form/declaration-form.component'; 
@NgModule({
  declarations: [
    payrollComponent,
    HeadcreationComponent,
    AttributecreationComponent,
    AttributeselectionComponent,
    PayrollheadgroupcreationComponent,
    CompanySettingComponent,
    ReimbursementMasterComponent,
    RembSummaryComponent,
    RembGeneralComponent,
    RembComputationComponent,
    RegisterFormComponent,
    SummaryFormComponent,
    ClaimFormComponent,
    DeclarationFormComponent
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
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    SharedlayoutModule,
    CompanySettingRoutingModule,
  ],

  providers: [ DatePipe, NumberFormatPipe],

})
export class CompanySettingModule { }
