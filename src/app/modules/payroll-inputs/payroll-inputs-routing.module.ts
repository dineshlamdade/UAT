import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { GarnishmentComponent } from './garnishment/garnishment.component';
import { NonRecurringAmtComponent } from './non-recurring-amt/non-recurring-amt.component';
import { NonRecurringDashboardComponent } from './non-recurring-dashboard/non-recurring-dashboard.component';
import { NonRecurringQtyComponent } from './non-recurring-qty/non-recurring-qty.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:   'payroll-List',
        component:  PayrollListComponent,
        data: { title: ':: DelziaHR :: Payroll-List' },
        
      },
      {
        path:   'financial-Master',
        component:  FinancialMasterComponent,
        data: { title: ':: DelziaHR :: Financial-Master' },
        
      },
      {
        path:   'non-Recurring-Amount',
        component:  NonRecurringAmtComponent,
        data: { title: ':: DelziaHR :: Non-Recurring-Amount' },
        
      },
      {
        path:   'attendance',
        component:  AttendanceComponent,
        data: { title: ':: DelziaHR :: attendance' },
      },

      {
        path:   'garnishment',
        component:  GarnishmentComponent,
        data: { title: ':: DelziaHR :: garnishment' },
      },

      {
        path:   'nonRecurringDashboard',
        component:  NonRecurringDashboardComponent,
        data: { title: ':: DelziaHR :: nonRecurringDashboard' },
      },

      {
        path:   'nonRecurringAmt',
        component:  NonRecurringAmtComponent,
        data: { title: ':: DelziaHR :: nonRecurringAmt' },
      },

      {
        path:   'nonRecurringQty',
        component:  NonRecurringQtyComponent,
        data: { title: ':: DelziaHR :: nonRecurringQty' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollInputsRoutingModule { }
