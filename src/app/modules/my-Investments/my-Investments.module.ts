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

import { MatSliderModule } from '@angular/material/slider';
import { HousingloanComponent } from './housingloan/housingloan.component';
import { HousingloandeclarationComponent } from './housingloan/housingloandeclaration/housingloandeclaration.component';
import { HousingloanmasterComponent } from './housingloan/housingloanmaster/housingloanmaster.component';
import { HousingloansummaryComponent } from './housingloan/housingloansummary/housingloansummary.component';
import { MyInvestmentsRoutingModule } from './my-Investments-routing.module';
import { MyInvestmentsComponent } from './my-investments.component';
import { PrimeNGModule } from '../../app.primeNG.module';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';
import { HousingrentComponent } from './housingrent/housingrent.component';
import { HouserentdeclarationComponent } from './housingrent/houserentdeclaration/houserentdeclaration.component';
import { HouserentmasterComponent } from './housingrent/houserentmaster/houserentmaster.component';
import { HouserentsummaryComponent } from './housingrent/houserentsummary/houserentsummary.component';
import { PreviousemployerComponent } from './previousemployer/previousemployer.component';
import { PreviousemployersummaryComponent } from './previousemployer/previousemployersummary/previousemployersummary.component';
import { PreviousemployermasterComponent } from './previousemployer/previousemployermaster/previousemployermaster.component';
import { NationalSavingCertificateNSCComponent } from './Other/national-saving-certificate-nsc/national-saving-certificate-nsc.component';
import { HousePropertyComponent } from './Other/house-property/house-property.component';
import { PrincipalRepaymentOnHousingLoanComponent } from './Other/principal-repayment-on-housing-loan/principal-repayment-on-housing-loan.component';
import { TaxAdjustmentsComponent } from './Other/tax-adjustments/tax-adjustments.component';
import { TaxAdjustmentsAmountComponent } from './Other/tax-adjustments/tax-adjustments-amount/tax-adjustments-amount.component';
import { TaxAdjustmentsSummaryComponent } from './Other/tax-adjustments/tax-adjustments-summary/tax-adjustments-summary.component';
import { ChildhostelallowanceComponent } from './Other/Child Hostel Allowance(CHA)/childhostelallowance/childhostelallowance.component';
import { ChildeducationallowanceComponent } from './Other/Child Education Allowance/childeducationallowance/childeducationallowance.component';
import { ChaComponent } from './Other/Child Hostel Allowance(CHA)/childhostelallowance/cha/cha.component';
import { CeaComponent } from './Other/Child Education Allowance/cea/cea.component';
import { CeamasterComponent } from './Other/Child Education Allowance/ceamaster/ceamaster.component';
import { ChamasterComponent } from './Other/Child Hostel Allowance(CHA)/childhostelallowance/chamaster/chamaster.component';
import { ChapterVIASummaryComponent } from './VI-A/chapter-vi-a-summary/chapter-vi-a-summary.component';
// import { OtherincomeSummaryComponent } from './Other/Other Income/otherincome-summary/otherincome-summary.component';
import { OtherincomesummaryComponent } from './Other/Other Income/otherincome_summary/otherincomesummary/otherincomesummary.component';
import { OtherincomedeclarationComponent } from './Other/Other Income/otherincome_declaration&actual/otherincomedeclaration/otherincomedeclaration.component';
import { OtherincomeComponent } from './Other/Other Income/otherincome/otherincome.component';
import { EmployeeNPS80CCDComponent } from './Other/EmployeeNationalPensionScheme80CCD/employee-nps80-ccd/employee-nps80-ccd.component';

import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturePadComponent } from './previousemployer/signature-pad/signature-pad.component';

@NgModule({
  declarations: [
    MyInvestmentsComponent,
    HousingloanComponent,
    SignaturePadComponent,
    HousingloanmasterComponent,
    HousingloansummaryComponent,
    HousingloandeclarationComponent,
    HousingrentComponent,
    HouserentdeclarationComponent,
    HouserentmasterComponent,
    HouserentsummaryComponent,
    PreviousemployerComponent,
    PreviousemployersummaryComponent,
    PreviousemployermasterComponent,
    NationalSavingCertificateNSCComponent,
    HousePropertyComponent,
    PrincipalRepaymentOnHousingLoanComponent,
    TaxAdjustmentsComponent,
    TaxAdjustmentsAmountComponent,
    TaxAdjustmentsSummaryComponent,
    ChildhostelallowanceComponent,
    ChaComponent,
    ChildeducationallowanceComponent,
    CeaComponent,
    CeamasterComponent,
    ChamasterComponent,
    ChapterVIASummaryComponent,
    PrincipalRepaymentOnHousingLoanComponent,
    // OtherincomeSummaryComponent,
    OtherincomesummaryComponent,
    OtherincomedeclarationComponent,
    OtherincomeComponent,
    EmployeeNPS80CCDComponent,




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
    // BrowserModule,
    // BrowserAnimationsModule,
    InputNumberModule,
    FormsModule,
    SignaturePadModule,

  ],

  providers: [ DatePipe, NumberFormatPipe ],

})
export class MyInvestmentsModule { }
