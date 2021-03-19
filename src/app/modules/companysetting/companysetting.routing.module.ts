import { payrollComponent } from './bc/bc.component';
import { HeadcreationComponent } from './headcreation/headcreation.component';
import { AttributecreationComponent } from './attributecreation/attributecreation.component';
import { AttributeselectionComponent } from './attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './payrollheadgroupcreation/payrollheadgroupcreation.component';
// import { FinancialMasterComponent } from './payroll/financial-master/financial-master.component';
import { GarnishmentMasterComponent } from './payroll/garnishment-master/garnishment-master.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRolesandPermissionComponent } from './user-rolesand-permission/user-rolesand-permission.component';
import { RolePrivilegeComponent } from './user-rolesand-permission/role-privilege/role-privilege.component';


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



