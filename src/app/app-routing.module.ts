import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PreloadModulesStrategy } from './core/strategies/preload-module.strategy';


const routes: Routes = [
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'payroll', loadChildren: './modules/payroll/payroll.module#PayrollModule' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
 { path: 'admin-approval', loadChildren: './modules/admin-approval/admin-approval.module#AdminApprovalModule' },
  { path: 'uploadexcel', loadChildren: './modules/uploadexcel/uploadexcel.module#UploadexcelModule' },
  { path: 'employeelist', loadChildren: './modules/employeemasterlistpage/employeemasterlistpage.module#EmployeemasterlistpageModule' },
  {
    path: 'investment',
    loadChildren: './modules/my-Investments/my-Investments.module#MyInvestmentsModule'
  },
  { path: 'lms', loadChildren: './modules/lms/lms.module#LMSModule' },
  { path: 'sdm', loadChildren: './modules/sdm/sdm.module#sdmModule' },
  { path: 'workflow', loadChildren: './modules/workflow/workflow.module#workflowModule' },
  {
    path: 'employee-master',
    loadChildren: './modules/employee-master/employee-master.module#EmployeeMasterModule'
  },
  { path: 'otherMaster', loadChildren: './modules/other-master/other-master.module#OtherMasterModule' },
  { path: 'company-settings', loadChildren: './modules/company-settings/company-settings.routing' },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
