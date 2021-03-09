import { payrollComponent } from './bc/bc.component';
import { HeadcreationComponent } from './headcreation/headcreation.component';
import { AttributecreationComponent } from './attributecreation/attributecreation.component';
import { AttributeselectionComponent } from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';
import { ReimbursementMasterComponent } from './reimbursement-master/reimbursement-master.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { DeclarationFormComponent } from './declaration-form/declaration-form.component';

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
      {
        path: 'reimbursement',
        component: ReimbursementMasterComponent,
        data: { title: 'Reimbursement :: Company Setting' }
      },
      {
        path: 'registerForm',
        component: RegisterFormComponent,
        data: { title: 'Register-Form :: Company Setting' }
      },
      {
        path: 'summaryForm',
        component: SummaryFormComponent,
        data: { title: 'Summary-Form :: Company Setting' }
      },
      {
        path: 'claimForm',
        component: ClaimFormComponent,
        data: { title: 'Claim-Form :: Company Setting' }
      },
      {
        path: 'declarationForm',
        component: DeclarationFormComponent,
        data: { title: 'Declaration-Message :: Company Setting' }
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



