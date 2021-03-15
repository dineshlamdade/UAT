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
@NgModule({
  declarations: [
    MyInvestmentsComponent,
    HousingloanComponent,
    HousingloanmasterComponent,
    HousingloansummaryComponent,
    HousingloandeclarationComponent,
    HousingrentComponent,
    HouserentdeclarationComponent,
    HouserentmasterComponent,
    HouserentsummaryComponent,
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
    FormsModule

  ],

  providers: [ DatePipe, NumberFormatPipe ],

})
export class MyInvestmentsModule { }
