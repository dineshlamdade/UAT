import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeemasterlistpageRoutingModule } from './employeemasterlistpage-routing.module';
import { EmployeemasterlistComponent } from './employeemasterlist/employeemasterlist.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { EmployeemasterlistpageComponent } from './employeemasterlistpage.component';




@NgModule({
  declarations: [EmployeemasterlistComponent,EmployeemasterlistpageComponent],
  imports: [
    CommonModule,
    EmployeemasterlistpageRoutingModule,
    SharedlayoutModule,
  ]
})
export class EmployeemasterlistpageModule { }
