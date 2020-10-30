import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PPFComponent } from './80C/ppf/ppf.component';
import { EightyCComponent } from './eighty-c/eighty-c.component';


const routes: Routes = [

  {
    path: '',
    children: [
      {
      path:   '80C-LIC',
      component:  EightyCComponent,
      data: { title: ':: DelziaHR :: 80-C' },
      },
      {
        path:   '80C-PPF',
        component:  PPFComponent,
        data: { title: ':: DelziaHR :: PPF' },
        },

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
