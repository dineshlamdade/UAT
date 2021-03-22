import { payrollComponent } from './bc/bc.component';
import { HeadcreationComponent } from './headcreation/headcreation.component';
import { AttributecreationComponent } from './attributecreation/attributecreation.component';
import { AttributeselectionComponent } from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';
// import { FinancialMasterComponent } from './payroll/financial-master/financial-master.component';
import { GarnishmentMasterComponent } from './payroll/garnishment-master/garnishment-master.component';

import { AttributeCreationComponent } from './attribute-creation/attribute-creation.component';
import { BusinessCycleComponent } from './business-cycle/business-cycle.component';
import { HeadCreationComponent } from './head-creation/head-creation.component';
import { AttributeSelectionComponent } from './attribute-selection/attribute-selection.component';
import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation/payroll-head-group-creation.component';
import { PayrollComponent } from '../payroll/payroll.component';

import { UserRolesandPermissionComponent } from './user-rolesand-permission/user-rolesand-permission.component';
import { RolePrivilegeComponent } from './user-rolesand-permission/role-privilege/role-privilege.component';

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
            path:   'Garnishment-Master',
            component:  GarnishmentMasterComponent,
            data: { title: ':: Garnishment-Master' },
          },

          {
            path: 'userrolesandpermission',
            component: UserRolesandPermissionComponent,
            data: { title: ':: Epic :: Company Settings' }
          },

          {
            path: 'roleprivilege',
            component: RolePrivilegeComponent,
            data: { title: ':: Epic :: Company Settings' }
          },
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

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule],
} )
export class CompanySettingRoutingModule {
  static components = [
  ];

}



