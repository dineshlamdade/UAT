import { AttributeDependencyComponent } from './attribute-dependency/attribute-dependency.component';
import { AttributeCreationComponent } from './attribute-creation/attribute-creation.component';
import { BusinessCycleComponent } from './business-cycle/business-cycle.component';
import { HeadCreationComponent } from './head-creation/head-creation.component';
import { AttributeSelectionComponent } from './attribute-selection/attribute-selection.component';
import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation/payroll-head-group-creation.component';

import { UserRolesandPermissionComponent } from './user-rolesand-permission/user-rolesand-permission.component';
import { RolePrivilegeComponent } from './user-rolesand-permission/role-privilege/role-privilege.component';

import { ReimbursementMasterComponent } from './reimbursement-master/reimbursement-master.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { DeclarationFormComponent } from './declaration-form/declaration-form.component';
import { AttributeGlobalComponent } from './attribute-global/attribute-global.component';
import { UserDashboardComponent } from './user-rolesand-permission/user-dashboard/user-dashboard.component';
import { PaymentTrackingMasterComponent } from './payment-tracking-master/payment-tracking-master.component';
import { PayRollStructureComponent } from './pay-roll-structure/pay-roll-structure.component';
import { AreasetComponent } from './areaset/areaset.component';
import { EmployeesetComponent } from './employeeset/employeeset/employeeset.component';

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
    path: 'attribute-group',
    component: AttributeGlobalComponent,
    data: { title: ':: Epic :: Company Settings' }
  },
  {
    path: 'payroll-head-group-creation',
    component: PayrollHeadGroupCreationComponent,
    data: { title: ':: Epic :: Company Settings' }
  },

  {
    path: 'payment-tracking-master',
    component: PaymentTrackingMasterComponent,
    data: { title: ':: Epic :: Company Settings' }
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
    path: 'userDashboard',
    component: UserDashboardComponent,
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
  // {
  //   path: 'attribute-global',
  //   component: AttributeGlobalComponent,
  //   data: { title: ':: Epic :: Company Setting' }
  // },
  {
    path: 'attribute-dependency',
    component: AttributeDependencyComponent,
    data: { title: ':: Epic :: Company Setting' }
  },
  {
    path: 'pay-roll-structure',
    component: PayRollStructureComponent,
    data: { title: ':: Epic :: Company Setting' }
  },
 
  {
    path: 'areaset',
    component: AreasetComponent,
    data: { title: ':: Epic :: Area Set' }
  },
  {
    path: 'employeeset',
    component: EmployeesetComponent,
    data: { title: ':: Epic :: Employee Set' }
  }
  

  
];

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule],
} )
export class CompanySettingRoutingModule {
  static components = [
  ];

}



