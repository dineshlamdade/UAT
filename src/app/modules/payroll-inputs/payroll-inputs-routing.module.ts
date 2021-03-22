import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancialMasterComponent } from './financial-master/financial-master.component';
import { NonRecurringAmtComponent } from './non-recurring-amt/non-recurring-amt.component';
import { NonRecurringQtyComponent } from './non-recurring-qty/non-recurring-qty.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';


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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollInputsRoutingModule { }
