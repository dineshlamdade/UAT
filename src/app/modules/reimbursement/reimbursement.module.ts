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
import {TableModule} from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ReimbursementRoutingModule } from './reimbursement-routing.module';
import { ReimbursementComponent } from './reimbursement.component';
import { RembSummaryComponent } from './remb-summary/remb-summary.component';
import { RembRegistrationComponent } from './remb-registration/remb-registration.component';
import { RembClaimNontaxComponent } from './remb-claim-nontax/remb-claim-nontax.component';
import { RembClaimTaxableComponent } from './remb-claim-taxable/remb-claim-taxable.component';
import { LtaComponent } from './lta/lta.component';


@NgModule({
  declarations: [ReimbursementComponent, RembSummaryComponent, RembRegistrationComponent, RembClaimNontaxComponent, RembClaimTaxableComponent, LtaComponent],
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
    ReimbursementRoutingModule,
    TableModule,
    TabsModule.forRoot(),
  ],

  providers: [ DatePipe, NumberFormatPipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ReimbursementModule { }
