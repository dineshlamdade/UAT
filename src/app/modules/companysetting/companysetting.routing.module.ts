import { payrollComponent } from './bc/bc.component';
import { HeadcreationComponent } from './headcreation/headcreation.component';
import { AttributecreationComponent } from './attributecreation/attributecreation.component';
import { AttributeselectionComponent } from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: '',
    children: [

        {
            path: 'bc',
            component: payrollComponent,
            data: { title: ':: Epic :: Company Settings' }
          },
          {
            path: 'headcreation',
            component: HeadcreationComponent,
            data: { title: ':: Epic :: Company Settings' }
          },
          {
            path: 'attributecreation',
            component: AttributecreationComponent,
            data: { title: ':: Epic :: Company Settings' }
          },
          {
            path: 'attributeselection',
            component: AttributeselectionComponent,
            data: { title: ':: Epic :: Company Settings' }
          },
          {
            path: 'payrollheadgroupcreation',
            component: PayrollheadgroupcreationComponent,
            data: { title: ':: Epic :: Company Settings' }
          },
    
    ],


  // { path: '', pathMatch: 'full', redirectTo: '/investment' },
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanySettingRoutingModule {
  static components = [
  ];

}



