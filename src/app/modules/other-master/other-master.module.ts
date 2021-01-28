import { CertificationMasterComponent } from './certificationMaster/certificationMaster.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OtherMasterRoutingModule } from './other-master-routing.module';
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

import { MatSliderModule } from '@angular/material/slider';
import { CompanyGroupMasterComponent } from './company-group-master/company-group-master.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { CompanyRegistrationDetailsComponent } from './company-registration-details/company-registration-details.component';
import { ComplianceHeadComponent } from './compliance-head/compliance-head.component';
import { StatutoryComplianceComponent } from './statutory-compliance/statutory-compliance.component';
import { EstablishmentMasterComponent } from './establishment-master/establishment-master.component';
import { ComplianceMasterComponent } from './compliance-master/compliance-master.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    CompanyGroupMasterComponent,
    CompanyMasterComponent,
    CompanyRegistrationDetailsComponent,
    ComplianceHeadComponent,
    StatutoryComplianceComponent,
    EstablishmentMasterComponent,
    ComplianceMasterComponent,
    CertificationMasterComponent
  ],
  imports: [
    CommonModule,
    OtherMasterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
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
    SharedlayoutModule,
    OtherMasterRoutingModule,
  ],

  providers: [ DatePipe, NumberFormatPipe],
})
export class OtherMasterModule { }
