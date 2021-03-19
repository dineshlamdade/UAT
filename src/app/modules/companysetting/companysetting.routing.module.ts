
import { payrollComponent } from './bc/bc.component';
import { HeadcreationComponent } from './headcreation/headcreation.component';
import { AttributecreationComponent } from './attributecreation/attributecreation.component';
import { AttributeselectionComponent } from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeCreationComponent } from './attribute-creation/attribute-creation.component';
import { BusinessCycleComponent } from './business-cycle/business-cycle.component';
import { HeadCreationComponent } from './head-creation/head-creation.component';
import { AttributeSelectionComponent } from './attribute-selection/attribute-selection.component';
import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation/payroll-head-group-creation.component';
import { PayrollComponent } from '../payroll/payroll.component';


const routes: Routes = [

  {
    path: '',
    children: [

      {
        path: 'business-cycle',
        component: BusinessCycleComponent,
        data: { title: ':: Epic :: Company Settings ' }
      },
      {
        path: 'head-creation',
        component: HeadCreationComponent,
        data: { title: ':: Epic :: Company Settings' }
      },
      {
        path: 'attribute-creation',
        component: AttributeCreationComponent,
        data: { title: ':: Epic :: Company Settings' }
      },
      {
        path: 'attribute-selection',
        component: AttributeSelectionComponent,
        data: { title: ':: Epic :: Company Settings' }
      },
      {
        path: 'payroll-head-group-creation',
        component: PayrollHeadGroupCreationComponent,
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



