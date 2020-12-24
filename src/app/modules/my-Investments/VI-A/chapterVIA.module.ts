import { IDSATTBSummaryComponent } from './IDSA-TTB/IDSA-TTB-summary/IDSA-TTB-summary.component';
import { IDSATTBComponent } from './IDSA-TTB/IDSA-TTB.component';
import { IDSASummaryComponent } from './interest-deposit-savingAccount/IDSA-summary/IDSA-summary.component';
import { InterestDepositSavingAccountComponent } from './interest-deposit-savingAccount/interest-deposit-savingAccount.component';
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
import { IDSAMasterComponent } from './interest-deposit-savingAccount/IDSA-master/IDSA-master.component';
import { IDSADeclarationComponent } from './interest-deposit-savingAccount/IDSA-declaration/IDSA-declaration.component';
import { IDSATTBMasterComponent } from './IDSA-TTB/IDSA-TTB-master/IDSA-TTB-master.component';
import { IDSATTBDeclarationComponent } from './IDSA-TTB/IDSA-TTB-declaration/IDSA-TTB-declaration.component';
@NgModule({
  declarations: [
      InterestDepositSavingAccountComponent,
      IDSASummaryComponent,
      IDSAMasterComponent,
      IDSADeclarationComponent,
      IDSATTBComponent,
      IDSATTBSummaryComponent,
      IDSATTBMasterComponent,
      IDSATTBDeclarationComponent
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
export class investmentChapterVIAModule { }