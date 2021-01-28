import { AngularMaterialComponent } from './angularMaterial/angularMaterial.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtimeNGPracticeComponent } from './ptimeNGPractice/ptimeNGPractice.component';
import { WorkflowMasterComponent } from './workflowMaster/workflowMaster.component';

const routes: Routes = [

  {
    path: 'workflow',
    children: [
      {
        path:   'master',
        component:  WorkflowMasterComponent,
        data: { title: ':: DelziaHR :: Leave' },
        },
        {
          path:   'practicePrimeNG',
          component:  PtimeNGPracticeComponent,
          data: { title: ':: DelziaHR :: Leave' },
          },
          
        {
          path:   'practiceAngular',
          component:  AngularMaterialComponent,
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
