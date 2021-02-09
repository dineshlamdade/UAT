import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Pipe } from '@angular/core';
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
import { GarnishmentMasterComponent } from './garnishment-master/garnishment-master.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CompanySettingRoutingModule } from '../companysetting.routing.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';

import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';



@NgModule({

  declarations: [ 
    FinancialMasterComponent,
    GarnishmentMasterComponent,
    

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
    CompanySettingRoutingModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
   
  ],
 
  

  providers: [ DatePipe,
     NumberFormatPipe,
     Pipe,],
     schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class PayrollModule { }
