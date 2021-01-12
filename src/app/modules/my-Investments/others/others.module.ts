import { ChildEducationAllowanceSummaryComponent } from './childEducationAllowance/childEducationAllowanceSummary/childEducationAllowanceSummary.component';
import { ChildHostelAllowanceSummaryComponent } from './child-hostel-allowance/childHostelAllowanceSummary/childHostelAllowanceSummary.component';
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
import { ChildHostelAllowanceComponent } from './child-hostel-allowance/child-hostel-allowance.component';
import { ChildHostelAllowanceMasterComponent } from './child-hostel-allowance/childHostelAllowanceMaster/childHostelAllowanceMaster.component';
import { ChildEducationAllowanceComponent } from './childEducationAllowance/childEducationAllowance.component';
import { ChildEducationAllowanceMasterComponent } from './childEducationAllowance/childEducationAllowanceMaster/childEducationAllowanceMaster.component';

@NgModule({
  declarations: [
    ChildHostelAllowanceComponent,
    ChildHostelAllowanceSummaryComponent,
    ChildHostelAllowanceMasterComponent,
    ChildEducationAllowanceComponent,
    ChildEducationAllowanceMasterComponent,
    ChildEducationAllowanceSummaryComponent
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
export class investmentOthersModule { }
