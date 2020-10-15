import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EightyCComponent } from './eighty-c/eighty-c.component';
import { MyInvestmentsComponent } from './my-investments.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
      path:   '80C',
      component:  EightyCComponent,
      data: { title: ':: DelziaHR :: 80-C' },
      },

    ]
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
