import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedlayoutModule } from './../sharedlayout/sharedlayout.module';
import { SdmRoutingModule } from './sdm-routing.module';
import { SdmComponent } from './sdm.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [SdmComponent],
  imports: [
    CommonModule,
    SdmRoutingModule,
    SharedlayoutModule,
    CarouselModule,
    CollapseModule,
    TooltipModule,
    MultiSelectModule,
    TableModule,
    BsDatepickerModule
  ]
})
export class SdmModule { }
