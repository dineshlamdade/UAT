
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
import { MyInvestmentsRoutingModule } from '../my-Investments-routing.module';
import { NPSComponent } from './nps/nps.component';
import { NpsSummaryComponent } from './nps/nps-summary/nps-summary.component';
import { NpsMasterComponent } from './nps/nps-master/nps-master.component';
import { NpsDeclarationComponent } from './nps/nps-declaration/nps-declaration.component';
import { PhysicallyHandicappedComponent } from './physically-handicapped/physically-handicapped.component';
import { PhysicallyHandicappedSummaryComponent } from './physically-handicapped/physically-handicapped-summary/physically-handicapped-summary.component';
import { PhysicallyHandicappedDeclarationAndActualComponent } from './physically-handicapped/physically-handicapped-declaration-and-actual/physically-handicapped-declaration-and-actual.component';
import { HandicappedDependentComponent } from './handicapped-dependent/handicapped-dependent.component';
import { SummaryComponent } from './handicapped-dependent/summary/summary.component';
import { MasterComponent } from './handicapped-dependent/master/master.component';
import { DeclarationAndActualComponent } from './handicapped-dependent/declaration-and-actual/declaration-and-actual.component';
import { ElectricVehicleComponent } from './electric-vehicle/electric-vehicle.component';
import { ElectricVehicleSummaryComponent } from './electric-vehicle/electric-vehicle-summary/electric-vehicle-summary.component';
import { ElectricVehicleMasterComponent } from './electric-vehicle/electric-vehicle-master/electric-vehicle-master.component';
import { ElectricVehicleDeclarationComponent } from './electric-vehicle/electric-vehicle-declaration/electric-vehicle-declaration.component';
import { EducationalLoanComponent } from './educational-loan/educational-loan.component';
import { EducationalLoanSummaryComponent } from './educational-loan/educational-loan-summary/educational-loan-summary.component';
import { EducationalLoanMasterComponent } from './educational-loan/educational-loan-master/educational-loan-master.component';
import { EducationalLoanDeclarationComponent } from './educational-loan/educational-loan-declaration/educational-loan-declaration.component';
import { InterestOnTtaComponent } from './interest-on-tta/interest-on-tta.component';
import { InterestOnTtaSummaryComponent } from './interest-on-tta/interest-on-tta-summary/interest-on-tta-summary.component';
import { InterestOnTtaMasterComponent } from './interest-on-tta/interest-on-tta-master/interest-on-tta-master.component';
import { InterestOnTtaDeclarationComponent } from './interest-on-tta/interest-on-tta-declaration/interest-on-tta-declaration.component';
import { InterestOnTtbSummaryComponent } from './interest-on-deposit-ttb/interest-on-ttb-summary/interest-on-ttb-summary.component';
import { InterestOnDepositTtbComponent } from './interest-on-deposit-ttb/interest-on-deposit-ttb.component';
import { InterestOnTtbMasterComponent } from './interest-on-deposit-ttb/interest-on-ttb-master/interest-on-ttb-master.component';
import { InterestOnTtbDeclarationComponent } from './interest-on-deposit-ttb/interest-on-ttb-declaration/interest-on-ttb-declaration.component';
import { DonationsForScientificResearchComponent } from './donations-for-scientific-research/donations-for-scientific-research.component';
import { GgaSummaryComponent } from './donations-for-scientific-research/gga-summary/gga-summary.component';
import { GgaDeclarationAndActualComponent } from './donations-for-scientific-research/gga-declaration-and-actual/gga-declaration-and-actual.component';
import { MyInvestmentsModule } from '../my-Investments.module';
import { PrimeNGModule } from '../../../app.primeNG.module';
import { GGCComponent } from './ggc/ggc.component';
import { GgcDeclarationActualComponent } from './ggc/ggc-declaration-actual/ggc-declaration-actual.component';
import { GgcSummaryComponent } from './ggc/ggc-summary/ggc-summary.component';
import { Mediclaim80DComponent } from './mediclaim80-d/mediclaim80-d.component';
import { MediclaimSummaryComponent } from './mediclaim80-d/mediclaim-summary/mediclaim-summary.component';
import { MediclaimMasterComponent } from './mediclaim80-d/mediclaim-master/mediclaim-master.component';
import { MediclaimDeclarationComponent } from './mediclaim80-d/mediclaim-declaration/mediclaim-declaration.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatSelectModule} from '@angular/material/select';
import { TreatmentOfSpecifiedDiseasesComponent } from './treatment-of-specified-diseases/treatment-of-specified-diseases.component';
import { TreatmentOfSpecifiedSummaryComponent } from './treatment-of-specified-diseases/treatment-of-specified-summary/treatment-of-specified-summary.component';
import { TreatmentOfSpecifiedMasterComponent } from './treatment-of-specified-diseases/treatment-of-specified-master/treatment-of-specified-master.component';
import { TreatmentOfSpecifiedDeclarationComponent } from './treatment-of-specified-diseases/treatment-of-specified-declaration/treatment-of-specified-declaration.component';
// import { ChapterVIASummaryComponent } from './chapter-vi-a-summary/chapter-vi-a-summary.component';

@NgModule({
  declarations: [
      NPSComponent,
      NpsSummaryComponent,
      NpsMasterComponent,
      NpsDeclarationComponent,
      PhysicallyHandicappedComponent,
      PhysicallyHandicappedSummaryComponent,
      PhysicallyHandicappedDeclarationAndActualComponent,
      HandicappedDependentComponent,
      SummaryComponent,
      MasterComponent,
      DeclarationAndActualComponent,
      ElectricVehicleComponent,
      ElectricVehicleSummaryComponent,
      ElectricVehicleMasterComponent,
      ElectricVehicleDeclarationComponent,
      EducationalLoanComponent,
      EducationalLoanSummaryComponent,
      EducationalLoanMasterComponent,
      EducationalLoanDeclarationComponent,
      InterestOnTtaComponent,
      InterestOnTtaSummaryComponent,
      InterestOnTtaMasterComponent,
      InterestOnTtaDeclarationComponent,
      InterestOnDepositTtbComponent,
      InterestOnTtbSummaryComponent,
      InterestOnTtbMasterComponent,
      InterestOnTtbDeclarationComponent,
      DonationsForScientificResearchComponent,
      GgaSummaryComponent,
      GgaDeclarationAndActualComponent,
      GGCComponent,
      GgcSummaryComponent,
      GgcDeclarationActualComponent,
      Mediclaim80DComponent,
      MediclaimSummaryComponent,
      MediclaimMasterComponent,
      MediclaimDeclarationComponent,
      TreatmentOfSpecifiedDiseasesComponent,
      TreatmentOfSpecifiedSummaryComponent,
      TreatmentOfSpecifiedMasterComponent,
      TreatmentOfSpecifiedDeclarationComponent,
     ],
  imports: [
    MatSelectModule,
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
    MyInvestmentsModule,
    NgMultiSelectDropDownModule
  ],

  providers: [ DatePipe, NumberFormatPipe],

})
export class investmentChapterVIAModule { }
