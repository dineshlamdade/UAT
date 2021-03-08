import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveComponent } from './approve/approve.component';
import { ExpenseVoucherComponent } from './expenseVoucher/expenseVoucher.component';
import { LeavePageComponent } from './leave-page/leave-page.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
      path:   'apply',
      component:  LeavePageComponent,
      data: { title: ':: DelziaHR :: Leave' },
      },
      {
        path:   'approve',
        component:  ApproveComponent,
        data: { title: ':: DelziaHR :: Leave' },
        },
        {
          path:   'expense-voucher',
          component:  ExpenseVoucherComponent,
          data: { title: ':: DelziaHR :: Leave' },
          },

    ],
  },
  // { path: '', pathMatch: 'full', redirectTo: '/investment' },
      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LMSRoutingModule {
  public static components = [
  ];

}
