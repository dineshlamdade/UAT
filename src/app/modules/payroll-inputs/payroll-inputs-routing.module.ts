import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { GarnishmentMasterComponent } from './garnishment-master/garnishment-master.component';
import { GarnishmentTransactionComponent } from './garnishment-transaction/garnishment-transaction.component';
import { NonRecurringAmtComponent } from './non-recurring-amt/non-recurring-amt.component';
import { NonRecurringQtyMasterComponent } from './non-recurring-qty-master/non-recurring-qty-master.component';
import { NonRecurringQtyComponent } from './non-recurring-qty/non-recurring-qty.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { SdmStepperComponent } from './sdm-stepper/sdm-stepper.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:   'Payroll-List',
        component:  PayrollListComponent,
        data: { title: ':: DelziaHR :: Payroll-List' },
        
      },
      {
        path:   'Financial-Master',
        component:  FinancialMasterComponent,
        data: { title: ':: DelziaHR :: Financial-Master' },
        
      },
      {
        path:   'Non-Recurring-Amount',
        component:  NonRecurringAmtComponent,
        data: { title: ':: DelziaHR :: Non-Recurring-Amount' },
        
      },
      {
        path:   'Non-Recurring-qty',
        component:  NonRecurringQtyComponent,
        data: { title: ':: DelziaHR :: Non-Recurring-qty' },
        
      },
      {
        path:   'attendance',
        component:  AttendanceComponent,
        data: { title: ':: DelziaHR :: Attendance' },
        
      },
      {
        path:   'sdm-creation',
        component:  SdmStepperComponent,
        data: { title: ':: DelziaHR :: SDM Creation' },
        
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollInputsRoutingModule { }
