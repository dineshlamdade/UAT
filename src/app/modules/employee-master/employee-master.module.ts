import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { EmployeeMasterRoutingModule } from './employee-master-routing.module';
import { translocoLoader } from './../../core/strategies/transloco.loader';
import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';
import localeGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { ConfirmationModalComponent } from './shared modals/confirmation-modal/confirmation-modal.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { IdentityInformationComponent } from './components/identity-information/identity-information.component';
import { DemoMaterialModule } from './../../app.material.module';
import { PreviousEmploymentInformationComponent } from './components/previous-employment-information/previous-employment-information.component';
import { BankInformationComponent } from './components/bank-information/bank-information.component';

registerLocaleData( localeFr, 'fr' );
registerLocaleData( localeGb, 'en-GB' );
import { PrimeNGModule } from './../../app.primeNG.module';
// import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PayrollAreaInformationComponent } from './components/payroll-area-information/payroll-area-information.component';
import { FamilyInformationComponent } from './components/family-information/family-information.component';
import { FamilyDetailsComponent } from './components/family-information/family-details/family-details.component';
import { NominationDetailsComponent } from './components/family-information/nomination-details/nomination-details.component';
import { BankDetailsComponent } from './components/family-information/bank-details/bank-details.component';
import { EducationSkillsInformationComponent } from './components/education-skills-information/education-skills-information.component';
import { EducationDetailComponent } from './components/education-skills-information/education-detail/education-detail.component';
import { LanguageDetailComponent } from './components/education-skills-information/language-detail/language-detail.component';
import { SkillsDetailComponent } from './components/education-skills-information/skills-detail/skills-detail.component';
import { CertificationDetailComponent } from './components/education-skills-information/certification-detail/certification-detail.component';
import { JobInformationComponent } from './components/job-information/job-information.component';
import { OrganizationDetailComponent } from './components/job-information/organization-detail/organization-detail.component';
import { PositionDetailComponent } from './components/job-information/position-detail/position-detail.component';
import { ProjectDetailComponent } from './components/job-information/project-detail/project-detail.component';
import { DeputationDetailComponent } from './components/job-information/deputation-detail/deputation-detail.component';
import { ComplianceInformationComponent } from './components/compliance-information/compliance-information.component';
import { InputComplianceInformationComponent } from './components/compliance-information/input-compliance-information/input-compliance-information.component';
import { ComplianceTypeInformationComponent } from './components/compliance-information/compliance-type-information/compliance-type-information.component';
import { SubComplianceTypeInformationComponent } from './components/compliance-information/compliance-type-information/sub-compliance-type-information/sub-compliance-type-information.component';
import { MinimumWagesDetailComponent } from './components/job-information/minimum-wages-detail/minimum-wages-detail.component';
import { EmploymentInformationComponent } from './components/employment-information/employment-information.component';
import { JoiningInformationComponent } from './components/employment-information/joining-information/joining-information.component';
import { ReJoiningInformationComponent } from './components/employment-information/re-joining-information/re-joining-information.component';
import { TransferInformationComponent } from './components/employment-information/transfer-information/transfer-information.component';
import { ExitInformationComponent } from './components/employment-information/exit-information/exit-information.component';
import { EmployeeSummaryComponent } from './components/employee-summary/employee-summary.component';
import { EmploymentSummaryComponent } from './components/employment-information/employment-summary/employment-summary.component';
import { ComplianceSummaryComponent } from './components/compliance-information/compliance-summary/compliance-summary.component';
import { JobSummaryComponent } from './components/job-information/job-summary/job-summary.component';
import { LandingPageComponent } from './../../modules/employee-master/components/landing-page/landing-page.component';
import { BlockCopyPasteDirective } from './../../core/utility/directives/appBlockCopyPasteDirective';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';

import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { PayrollAreaComponent } from './components/payroll-area-information/payroll-area/payroll-area.component';
import { DisbursementsComponent } from './components/payroll-area-information/disbursements/disbursements.component';
import { OtherAreasComponent } from './components/payroll-area-information/other-areas/other-areas.component';
import { EmpMasterLandingPageComponent } from './components/emp-master-landing-page/emp-master-landing-page.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';

@NgModule( {
  declarations: [
    PersonalInformationComponent,
    ConfirmationModalComponent,
    ContactInformationComponent,
    IdentityInformationComponent,
    PreviousEmploymentInformationComponent,
     BankInformationComponent,
    PayrollAreaInformationComponent,
    FamilyInformationComponent,
    FamilyDetailsComponent,
    NominationDetailsComponent,
    BankDetailsComponent,
    EducationSkillsInformationComponent,
    EducationDetailComponent,
    LanguageDetailComponent,
    SkillsDetailComponent,
    CertificationDetailComponent,
    JobInformationComponent,
    OrganizationDetailComponent,
    PositionDetailComponent,
    ProjectDetailComponent,
    DeputationDetailComponent,
    ComplianceInformationComponent,
    InputComplianceInformationComponent,
    ComplianceTypeInformationComponent,
    SubComplianceTypeInformationComponent,
    MinimumWagesDetailComponent,
    EmploymentInformationComponent,
    JoiningInformationComponent,
    ReJoiningInformationComponent,
    TransferInformationComponent,
    ExitInformationComponent,
    EmployeeSummaryComponent,
    EmploymentSummaryComponent,
    ComplianceSummaryComponent,
    JobSummaryComponent,
    LandingPageComponent,
    BlockCopyPasteDirective,
    PayrollAreaComponent,
    DisbursementsComponent,
    OtherAreasComponent,
    EmpMasterLandingPageComponent,
    EmployeeDashboardComponent
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
    ToastrModule.forRoot( {
      positionClass: 'toast-top-center',
    } ),
    SharedlayoutModule,
    EmployeeMasterRoutingModule,
    TranslocoModule,
    DemoMaterialModule,
    PrimeNGModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,

  ],

  providers: [DatePipe, NumberFormatPipe,
    translocoLoader, {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }, { id: 'hi', label: 'Hindi' }],
        listenToLangChange: true,
        reRenderOnLangChange: true,
        defaultLang: 'en',
        fallbackLang: 'fr',

        prodMode: false
      } as TranslocoConfig
    }
  ],
  entryComponents: [ConfirmationModalComponent],

} )
export class EmployeeMasterModule { }
