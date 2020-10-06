import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';


@NgModule({
  declarations: [PayrollComponent],
  imports: [
    CommonModule,
    SharedlayoutModule,
    PayrollRoutingModule,
  ]
})
export class PayrollModule { }
