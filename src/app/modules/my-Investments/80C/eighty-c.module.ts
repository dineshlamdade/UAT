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
import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { SharedlayoutModule } from '../../sharedlayout/sharedlayout.module';

import { MatSliderModule } from '@angular/material/slider';
import { PPFMasterComponent } from '../80C/ppf/ppfmaster/ppfmaster.component';
import { MyInvestmentsRoutingModule } from '../my-Investments-routing.module';
import { PPFComponent } from './ppf/ppf.component';
import { PPFDeclarationComponent } from './ppf/ppfdeclaration/ppfdeclaration.component';
import { PPFSummaryComponent } from './ppf/ppfsummary/ppfsummary.component';
import { LicComponent } from './lic/lic.component';
import { LicdeclarationComponent } from './lic/licdeclaration/licdeclaration.component';
import { LicsummaryComponent } from './lic/licsummary/licsummary.component';
import { LicmasterComponent } from './lic/licmaster/licmaster.component';
import { PensionPlanComponent } from './pension-plan/pension-plan.component';
import { SukanyaSamriddhiComponent } from './sukanya-samriddhi/sukanya-samriddhi.component';
import { SukanyaSamriddhiSummaryComponent } from './sukanya-samriddhi/sukanya-samriddhi-summary/sukanya-samriddhi-summary.component';
import { SukanyaSamriddhiMasterComponent } from './sukanya-samriddhi/sukanya-samriddhi-master/sukanya-samriddhi-master.component';
import { SukanyaSamriddhiDeclarationComponent } from './sukanya-samriddhi/sukanya-samriddhi-declaration/sukanya-samriddhi-declaration.component';
import { PostOfficeComponent } from './post-office/post-office.component';
import { PostOfficeSummaryComponent } from './post-office/post-office-summary/post-office-summary.component';
import { PostOfficeMasterComponent } from './post-office/post-office-master/post-office-master.component';
import { PostOfficeDeclarationComponent } from './post-office/post-office-declaration/post-office-declaration.component';
import { UnitLinkedInsurancePlanComponent } from './unit-linked-insurance-plan/unit-linked-insurance-plan.component';
import { UnitLinkedSummaryComponent } from './unit-linked-insurance-plan/unit-linked-summary/unit-linked-summary.component';
import { UnitLinkedMasterComponent } from './unit-linked-insurance-plan/unit-linked-master/unit-linked-master.component';
import { UnitLinkedDeclarationComponent } from './unit-linked-insurance-plan/unit-linked-declaration/unit-linked-declaration.component';
import { PpmasterComponent } from './pension-plan/ppmaster/ppmaster.component';
import { PpsummaryComponent } from './pension-plan/ppsummary/ppsummary.component';
import { PpdeclarationComponent } from './pension-plan/ppdeclaration/ppdeclaration.component';

@NgModule({
  declarations: [
    PPFComponent,
    PPFSummaryComponent,
    PPFMasterComponent,
    PPFDeclarationComponent,
    LicComponent,
    LicsummaryComponent,
    LicmasterComponent,
    LicdeclarationComponent,
    PensionPlanComponent,
    PpdeclarationComponent,
    PpmasterComponent,
    PpsummaryComponent,
    SukanyaSamriddhiComponent,
    SukanyaSamriddhiSummaryComponent,
    SukanyaSamriddhiMasterComponent,
    SukanyaSamriddhiDeclarationComponent,
    PostOfficeComponent,
    PostOfficeSummaryComponent,
    PostOfficeMasterComponent,
    PostOfficeDeclarationComponent,
    UnitLinkedInsurancePlanComponent,
    UnitLinkedSummaryComponent,
    UnitLinkedMasterComponent,
    UnitLinkedDeclarationComponent,
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
    SharedlayoutModule,
    MyInvestmentsRoutingModule,
  ],

  providers: [ DatePipe, NumberFormatPipe],

})
export class EightyCModule { }
