import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarnishmentMasterComponent } from './garnishment-master/garnishment-master.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';



@NgModule({
  declarations: [FinancialMasterComponent],
  imports: [
    CommonModule,
    GarnishmentMasterComponent,
  ]
})
export class PayrollModule { }
