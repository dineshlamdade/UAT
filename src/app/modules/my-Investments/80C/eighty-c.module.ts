import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { SharedlayoutModule } from '../../sharedlayout/sharedlayout.module';
import { PPFMasterComponent } from '../80C/ppf/ppfmaster/ppfmaster.component';
import { MyInvestmentsRoutingModule } from '../my-Investments-routing.module';
import { LicComponent } from './lic/lic.component';
import { LicdeclarationComponent } from './lic/licdeclaration/licdeclaration.component';
import { LicmasterComponent } from './lic/licmaster/licmaster.component';
import { LicsummaryComponent,} from './lic/licsummary/licsummary.component';
import { PensionPlanComponent } from './pension-plan/pension-plan.component';
import { PpdeclarationComponent } from './pension-plan/ppdeclaration/ppdeclaration.component';
import { PpmasterComponent } from './pension-plan/ppmaster/ppmaster.component';
import { PpsummaryComponent } from './pension-plan/ppsummary/ppsummary.component';
import { PostOfficeDeclarationComponent } from './post-office/post-office-declaration/post-office-declaration.component';
import { PostOfficeMasterComponent } from './post-office/post-office-master/post-office-master.component';
import { PostOfficeSummaryComponent } from './post-office/post-office-summary/post-office-summary.component';
import { PostOfficeComponent } from './post-office/post-office.component';
import { PPFComponent } from './ppf/ppf.component';
import { PPFDeclarationComponent } from './ppf/ppfdeclaration/ppfdeclaration.component';
import { PPFSummaryComponent } from './ppf/ppfsummary/ppfsummary.component';
// tslint:disable-next-line: max-line-length
import { SukanyaSamriddhiDeclarationComponent } from './sukanya-samriddhi/sukanya-samriddhi-declaration/sukanya-samriddhi-declaration.component';
import { SukanyaSamriddhiMasterComponent } from './sukanya-samriddhi/sukanya-samriddhi-master/sukanya-samriddhi-master.component';
import { SukanyaSamriddhiSummaryComponent } from './sukanya-samriddhi/sukanya-samriddhi-summary/sukanya-samriddhi-summary.component';
import { SukanyaSamriddhiComponent } from './sukanya-samriddhi/sukanya-samriddhi.component';
import { TaxsavingMfDeclarationComponent } from './taxsaving-mutual-fund/taxsaving-mf-declaration/taxsaving-mf-declaration.component';
import { TaxsavingMfMasterComponent } from './taxsaving-mutual-fund/taxsaving-mf-master/taxsaving-mf-master.component';
import { TaxsavingMfSummaryComponent } from './taxsaving-mutual-fund/taxsaving-mf-summary/taxsaving-mf-summary.component';
import { TaxsavingMutualFundComponent } from './taxsaving-mutual-fund/taxsaving-mutual-fund.component';
import { UnitLinkedDeclarationComponent } from './unit-linked-insurance-plan/unit-linked-declaration/unit-linked-declaration.component';
import { UnitLinkedInsurancePlanComponent } from './unit-linked-insurance-plan/unit-linked-insurance-plan.component';
import { UnitLinkedMasterComponent } from './unit-linked-insurance-plan/unit-linked-master/unit-linked-master.component';

import { NationalSevingCertificateComponent } from './national-seving-certificate/national-seving-certificate.component';
import { NationalSevingCertificateSummaryComponent } from './national-seving-certificate/national-seving-certificate-summary/national-seving-certificate-summary.component';
import { NationalSevingCertificateMasterComponent } from './national-seving-certificate/national-seving-certificate-master/national-seving-certificate-master.component';
import { NationalSevingCertificateDeclarationComponent } from './national-seving-certificate/national-seving-certificate-declaration/national-seving-certificate-declaration.component';
import { UnitLinkedSummaryComponent } from './unit-linked-insurance-plan/unit-linked-summary/unit-linked-summary.component';
import { FixedDepositsComponent } from './fixed-deposits/fixed-deposits.component';
import { FixedDepositsSummaryComponent } from './fixed-deposits/fixed-deposits-summary/fixed-deposits-summary.component';
import { FixedDepositsDeclarationComponent } from './fixed-deposits/fixed-deposits-declaration/fixed-deposits-declaration.component';
import { TaxSavingSharesNabardComponent } from './tax-saving-shares-nabard/tax-saving-shares-nabard.component';
import { TaxSavingNabardSummaryComponent } from './tax-saving-shares-nabard/tax-saving-nabard-summary/tax-saving-nabard-summary.component';
import { TaxSavingNabardActualComponent } from './tax-saving-shares-nabard/tax-saving-nabard-actual/tax-saving-nabard-actual.component';
import { PostOfficeTermDepositComponent } from './post-office-term-deposit/post-office-term-deposit.component';
import { PostOfficeTermDepositSummaryComponent } from './post-office-term-deposit/post-office-term-deposit-summary/post-office-term-deposit-summary.component';
import { PostOfficeTermDepositDeclarationComponent } from './post-office-term-deposit/post-office-term-deposit-declaration/post-office-term-deposit-declaration.component';
import { SeniorCitizenSavingSchemeComponent } from './senior-citizen-saving-scheme/senior-citizen-saving-scheme.component';
import { SeniorCitizenSummaryComponent } from './senior-citizen-saving-scheme/senior-citizen-summary/senior-citizen-summary.component';
import { SeniorCitizenDeclarationComponent } from './senior-citizen-saving-scheme/senior-citizen-declaration/senior-citizen-declaration.component';
import { TuitionFeesComponent } from './tuition-fees/tuition-fees.component';
import { TuitionFeesSummaryComponent } from './tuition-fees/tuition-fees-summary/tuition-fees-summary.component';
import { TuitionFeesDeclarationComponent } from './tuition-fees/tuition-fees-declaration/tuition-fees-declaration.component';
import { PrimeNGModule } from '../../../app.primeNG.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { SummaryComponent } from './summary/summary.component';
import { EmployeeContributionToProvidentFundPFComponent } from './employee-contribution-to-provident-fund-pf/employee-contribution-to-provident-fund-pf.component';
import { EmployeeContributionToVPFComponent } from './employee-contribution-to-vpf/employee-contribution-to-vpf.component';
import { EmployeesNPS80CCD1Component } from './employees-nps80-ccd1/employees-nps80-ccd1.component';

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
    TaxsavingMfDeclarationComponent,
    TaxsavingMfSummaryComponent,
    TaxsavingMfMasterComponent,
    TaxsavingMutualFundComponent,
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
    NationalSevingCertificateComponent,
    NationalSevingCertificateSummaryComponent,
    NationalSevingCertificateMasterComponent,
    NationalSevingCertificateDeclarationComponent,
    FixedDepositsComponent,
    FixedDepositsSummaryComponent,
    FixedDepositsDeclarationComponent,
    TaxSavingSharesNabardComponent,
    TaxSavingNabardSummaryComponent,
    TaxSavingNabardActualComponent,
    PostOfficeTermDepositComponent,
    PostOfficeTermDepositSummaryComponent,
    PostOfficeTermDepositDeclarationComponent,
    SeniorCitizenSavingSchemeComponent,
    SeniorCitizenSummaryComponent,
    SeniorCitizenDeclarationComponent,
    TuitionFeesComponent,
    TuitionFeesSummaryComponent,
    TuitionFeesDeclarationComponent,
    SummaryComponent,
    EmployeeContributionToProvidentFundPFComponent,
    EmployeeContributionToVPFComponent,
    EmployeesNPS80CCD1Component,

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
    PrimeNGModule,
    InputNumberModule,
    // BrowserModule,
    // BrowserAnimationsModule,

  ],

  providers: [ DatePipe, NumberFormatPipe],

})
export class EightyCModule { }
