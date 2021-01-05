import { LoanMasterComponent } from './loan-master/loan-master.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    children: [
      {
      path:   'loan-master',
      component:  LoanMasterComponent,
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
export class workflowRoutingModule {
  public static components = [
  ];

}
