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
import { EightyCComponent } from './eighty-c/eighty-c.component';
import { MyInvestmentsRoutingModule } from './my-Investments-routing.module';
import { MyInvestmentsComponent } from './my-investments.component';
import { NPSComponent } from './VI-A/nps/nps.component';
import { NpsSummaryComponent } from './VI-A/nps/nps-summary/nps-summary.component';
import { NpsMasterComponent } from './VI-A/nps/nps-master/nps-master.component';
import { NpsDeclarationComponent } from './VI-A/nps/nps-declaration/nps-declaration.component';
import { PhysicallyHandicappedComponent } from './VI-A/physically-handicapped/physically-handicapped.component';
import { PhysicallyHandicappedSummaryComponent } from './VI-A/physically-handicapped/physically-handicapped-summary/physically-handicapped-summary.component';
import { PhysicallyHandicappedDeclarationAndActualComponent } from './VI-A/physically-handicapped/physically-handicapped-declaration-and-actual/physically-handicapped-declaration-and-actual.component';
import { HandicappedDependentComponent } from './VI-A/handicapped-dependent/handicapped-dependent.component';
import { SummaryComponent } from './VI-A/handicapped-dependent/summary/summary.component';
import { MasterComponent } from './VI-A/handicapped-dependent/master/master.component';
import { DeclarationAndActualComponent } from './VI-A/handicapped-dependent/declaration-and-actual/declaration-and-actual.component';
import { ElectricVehicleComponent } from './VI-A/electric-vehicle/electric-vehicle.component';
import { ElectricVehicleSummaryComponent } from './VI-A/electric-vehicle/electric-vehicle-summary/electric-vehicle-summary.component';
import { ElectricVehicleMasterComponent } from './VI-A/electric-vehicle/electric-vehicle-master/electric-vehicle-master.component';
import { ElectricVehicleDeclarationComponent } from './VI-A/electric-vehicle/electric-vehicle-declaration/electric-vehicle-declaration.component';
import { EducationalLoanComponent } from './VI-A/educational-loan/educational-loan.component';
import { EducationalLoanSummaryComponent } from './VI-A/educational-loan/educational-loan-summary/educational-loan-summary.component';
import { EducationalLoanMasterComponent } from './VI-A/educational-loan/educational-loan-master/educational-loan-master.component';
import { EducationalLoanDeclarationComponent } from './VI-A/educational-loan/educational-loan-declaration/educational-loan-declaration.component';
import { InterestOnTtaComponent } from './VI-A/interest-on-tta/interest-on-tta.component';
import { InterestOnTtaSummaryComponent } from './VI-A/interest-on-tta/interest-on-tta-summary/interest-on-tta-summary.component';
import { InterestOnTtaMasterComponent } from './VI-A/interest-on-tta/interest-on-tta-master/interest-on-tta-master.component';
import { InterestOnTtaDeclarationComponent } from './VI-A/interest-on-tta/interest-on-tta-declaration/interest-on-tta-declaration.component';
import { InterestOnDepositTtbComponent } from './VI-A/interest-on-deposit-ttb/interest-on-deposit-ttb.component';
import { InterestOnTtbSummaryComponent } from './VI-A/interest-on-deposit-ttb/interest-on-ttb-summary/interest-on-ttb-summary.component';
import { InterestOnTtbMasterComponent } from './VI-A/interest-on-deposit-ttb/interest-on-ttb-master/interest-on-ttb-master.component';
import { InterestOnTtbDeclarationComponent } from './VI-A/interest-on-deposit-ttb/interest-on-ttb-declaration/interest-on-ttb-declaration.component';
import { PrimeNGModule } from 'src/app/app.primeNG.module';

@NgModule({
  declarations: [
    MyInvestmentsComponent,
    EightyCComponent,
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
  ],

  providers: [ DatePipe, NumberFormatPipe],

})
export class MyInvestmentsModule { }
