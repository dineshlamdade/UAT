import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexiRoutingModule } from './flexi-routing.module';
import { FlexiinputComponent } from './flexiinput/flexiinput.component';

import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';

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
import {TableModule} from 'primeng/table';
import { MatSliderModule } from '@angular/material/slider';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {PickListModule} from 'primeng/picklist';
import { FlexibasketallocationComponent } from './flexibasketallocation/flexibasketallocation.component';
import {SliderModule} from 'primeng/slider';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
@NgModule({
  declarations: [FlexiinputComponent, FlexibasketallocationComponent],
  imports: [
    CommonModule,
    TableModule,
    FlexiRoutingModule,
    SharedlayoutModule,
    PickListModule,
    CommonModule,
    NgxSliderModule,
    SharedlayoutModule,
    ReactiveFormsModule,   
    FormsModule,
    MatSliderModule,
    SliderModule,
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
    NgMultiSelectDropDownModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    SharedlayoutModule,
  


  ]
})
export class FlexiModule { }
