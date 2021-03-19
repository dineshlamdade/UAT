import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PreloadModulesStrategy } from './core/strategies/preload-module.strategy';

//////////////////
//import { payrollComponent } from './modules/companysetting/payroll/payroll.component';
import {HeadcreationComponent} from './modules/companysetting/headcreation/headcreation.component';
import {AttributecreationComponent} from './modules/companysetting/attributecreation/attributecreation.component';
import {AttributeselectionComponent} from './modules/companysetting/attributeselection/attributeselection.component';
import { PayrollheadgroupcreationComponent } from './modules/companysetting/payrollheadgroupcreation/payrollheadgroupcreation.component';


////////////////////


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'payroll', loadChildren: './modules/payroll/payroll.module#PayrollModule' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
  { path: 'query', loadChildren: './modules/query/query.module#QueryModule' },
  // { path: 'loan', loadChildren: './modules/loan/loan.module#LoanModule' },

  {
    path: 'loan',
    loadChildren: () => import('./modules/loan/loan.module').then(m => m.LoanModule)
  },


  { path: 'admin-approval', loadChildren: './modules/admin-approval/admin-approval.module#AdminApprovalModule' },
  { path: 'uploadexcel', loadChildren: './modules/uploadexcel/uploadexcel.module#UploadexcelModule' },
  { path: 'employeelist', loadChildren: './modules/employeemasterlistpage/employeemasterlistpage.module#EmployeemasterlistpageModule' },

  {
    path: 'investment',
    loadChildren: './modules/my-Investments/my-Investments.module#MyInvestmentsModule'
  },

  { path: 'lms', loadChildren: './modules/lms/lms.module#LMSModule' },
  { path: 'workflow', loadChildren: './modules/workflow/workflow.module#workflowModule' },
  {
    path: 'employee-master',
    loadChildren: './modules/employee-master/employee-master.module#EmployeeMasterModule'
  },
  { path: 'otherMaster', loadChildren: './modules/other-master/other-master.module#OtherMasterModule' },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: '/dashboard' },


    //////////////////////////////////////////
    { path: 'companysetting', loadChildren: './modules/companysetting/companysetting.module#CompanySettingModule' },
    // {
    //   path: 'payroll',
    //   component: payrollComponent,
    //   data: { title: ':: Epic :: Company Settings' }
    // },
    // {
    //   path: 'headcreation',
    //   component: HeadcreationComponent,
    //   data: { title: ':: Epic :: Company Settings' }
    // },
    // {
    //   path: 'attributecreation',
    //   component: AttributecreationComponent,
    //   data: { title: ':: Epic :: Company Settings' }
    // },
    // {
    //   path: 'attributeselection',
    //   component: AttributeselectionComponent,
    //   data: { title: ':: Epic :: Company Settings' }
    // },
    // {
    //   path: 'payrollheadgroupcreation',
    //   component: PayrollheadgroupcreationComponent,
    //   data: { title: ':: Epic :: Company Settings' }
    // },


    ///////////////////////////////////////////////////
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
