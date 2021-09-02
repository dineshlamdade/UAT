import { AngularMaterialComponent } from './angularMaterial/angularMaterial.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtimeNGPracticeComponent } from './ptimeNGPractice/ptimeNGPractice.component';
import { WorkflowMasterComponent } from './workflowMaster/workflowMaster.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path:   'master',
        component:  WorkflowMasterComponent,
        data: { title: ':: DelziaHR :: Workflow' },
        },
        {
          path:   'practicePrimeNG',
          component:  PtimeNGPracticeComponent,
          data: { title: ':: DelziaHR :: Workflow' },
          },
          
        {
          path:   'practiceAngular',
          component:  AngularMaterialComponent,
          data: { title: ':: DelziaHR :: Workflow' },
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
