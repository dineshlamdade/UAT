import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { NonRecurringAmtComponent } from './non-recurring-amt/non-recurring-amt.component';
import { NonRecurringQtyComponent } from './non-recurring-qty/non-recurring-qty.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';
import { SdmStepperComponent } from './sdm-stepper/sdm-stepper.component';
import { SdmComponent } from './sdm/sdm.component';


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
        path:   'sdm',
        component:  SdmComponent,
        data: { title: ':: DelziaHR :: SDM Creation' },
        
      },
      {
        path:   'sdm-stepper',
        component:  SdmStepperComponent,
        data: { title: ':: DelziaHR :: SDM Stepper' },
        
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollInputsRoutingModule { }
