

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

  {
    path: 'Garnishment-Master',
    component: GarnishmentMasterComponent,
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
];

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule],
} )
export class CompanySettingRoutingModule {
  static components = [
  ];

}



