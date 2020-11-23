import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PPFComponent } from './80C/ppf/ppf.component';
import { LicComponent } from './80C/lic/lic.component';
//import { PensionPlanComponent } from './80C/pension-plan/pension-plan.component';
import { TaxsavingMutualFundsComponent } from './80C/taxsaving-mutual-funds/taxsaving-mutual-funds.component';


const routes: Routes = [

  {
    path: '',
    children: [
      {
      path:   '80C-LIC',
      component:  LicComponent,
      data: { title: ':: DelziaHR :: LIC' },
      },
      {
        path:   '80C-PPF',
        component:  PPFComponent,
        data: { title: ':: DelziaHR :: PPF' },
        },
        // {
        //   path:   '80C-PensionPlan',
        //   component:  PensionPlanComponent,
        //   data: { title: ':: DelziaHR :: PensionPlan' },
        // },
        {
          path:   '80C-TaxsavingMutualFund',
          component:     TaxsavingMutualFundsComponent,
          data: { title: ':: DelziaHR :: PensionPlan' },
        }


    ],
  },
  // { path: '', pathMatch: 'full', redirectTo: '/investment' },
      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyInvestmentsRoutingModule {
  static components = [
  ];

}
