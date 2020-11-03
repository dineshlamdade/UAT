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
import { MyInvestmentsRoutingModule } from '../my-Investments-routing.module';
import { PPFComponent } from './ppf/ppf.component';
import { PPFDeclarationComponent } from './ppf/ppfdeclaration/ppfdeclaration.component';
import { PPFMasterComponent } from './ppf/ppfmaster/ppfmaster.component';
import { PPFSummaryComponent } from './ppf/ppfsummary/ppfsummary.component';
import { LicComponent } from './lic/lic.component';
import { LicdeclarationComponent } from './lic/licdeclaration/licdeclaration.component';
import { LicsummaryComponent } from './lic/licsummary/licsummary.component';
import { LicmasterComponent } from './lic/licmaster/licmaster.component';



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
