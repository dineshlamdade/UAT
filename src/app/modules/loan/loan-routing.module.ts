import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';
import { LoanComponent } from './loan/loan.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
          path:'add-new-loan',
          component:AddNewLoanComponent,

      },
      {
        path:'application',
        component:LoanComponent,

    },
    ]
  },

  // {

  //         path:'add-new-loan',
  //         component:AddNewLoanComponent,
  //         data: { title: ':: DelziaHR :: Apply Loan' },

  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule {
    public static components = [
  ];

}
