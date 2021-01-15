import { MasterComponent } from './master/master.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    children: [
      {
      path:   'master',
      component:  MasterComponent,
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
