import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulamasterComponent } from '../formulamaster/formulamaster.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FastentryNRAmtComponent } from './fastentry-nr-amt/fastentry-nr-amt.component';
import { FastentryNrQtyComponent } from './fastentry-nr-qty/fastentry-nr-qty.component';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { GarnishmentMasterComponent } from './garnishment-master/garnishment-master.component';
import { GarnishmentTransactionComponent } from './garnishment-transaction/garnishment-transaction.component';
import { HoldreleaseComponent } from './hold and release/holdrelease/holdrelease.component';

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
      {
        path:   'hold-release',
        component:  HoldreleaseComponent,
        data: { title: ':: DelziaHR :: Hold Release' },

      },
      // {
      //   path:   'release',
      //   component:  ReleaseComponent,
      //   data: { title: ':: DelziaHR :: Release' },

      // },
      {
       
        path:   'Non-Recurring-qty-master',
        component:  NonRecurringQtyMasterComponent,
        data: { title: ':: DelziaHR :: Non-Recurring-qty' },
        
      }, 
      {
        path: 'FastEntry-Non-Recurring-Amount',
        component: FastentryNRAmtComponent,
        data: { title: ':: DelziaHR :: Fast Entry NR Amount'}
      },
      {
        path: 'FastEntry-Non-Recurring-Quantity',
        component: FastentryNrQtyComponent,
        data: { title: ':: DelziaHR :: Fast Entry NR Quantity'}
      },
      {
        path: 'Garnishment-Master',
        component: GarnishmentMasterComponent,
        data: { title: ':: DelziaHR :: Garnishment Master'}
      },
      {
        path: 'Garnishment-Transaction',
        component: GarnishmentTransactionComponent,
        data: { title: ':: DelziaHR :: Garnishment Transaction'}
      },
      {
        path: 'formula',
        component: FormulamasterComponent,
        data: { title: ':: DelziaHR :: Garnishment Transaction'}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollInputsRoutingModule { }
