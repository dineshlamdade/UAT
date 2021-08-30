import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },

  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
  { path: 'admin-approval', loadChildren: './modules/admin-approval/admin-approval.module#AdminApprovalModule' },
  { path: 'uploadexcel', loadChildren: './modules/uploadexcel/uploadexcel.module#UploadexcelModule' },
  { path: 'employeelist', loadChildren: './modules/employeemasterlistpage/employeemasterlistpage.module#EmployeemasterlistpageModule' },
  {
    path: 'investment',
    loadChildren: './modules/my-Investments/my-Investments.module#MyInvestmentsModule'
  },

  {
    path: 'PayrollInputs',
    loadChildren: './modules/payroll-inputs/payroll-inputs.module#PayrollInputsModule'
  },


  { path: 'lms', loadChildren: './modules/lms/lms.module#LMSModule' },
  { path: 'workflow', loadChildren: './modules/workflow/workflow.module#workflowModule' },

  {
    path: 'employee-master',
    loadChildren: './modules/employee-master/employee-master.module#EmployeeMasterModule'
  },
  { path: 'otherMaster', loadChildren: './modules/other-master/other-master.module#OtherMasterModule' },
  { path: 'companysetting', loadChildren: './modules/companysetting/companysetting.module#CompanySettingModule' },
  // ................................22-3-2021 Pooja .................................. ........
  { path: 'query', loadChildren: './modules/query/query.module#QueryModule' },
  { path: 'loan', loadChildren: './modules/loan/loan.module#LoanModule' },

  // ................................22-3-2021 Pooja .................................. ........

  { path: 'lock', loadChildren: './modules/lock/lock.module#LockModule' },

  { path: 'email-sms', loadChildren: './modules/email-sms/email-sms.module#EmailSmsModule' },
  { path: 'loan-master', loadChildren: './modules/loan-master/loan-master.module#LoanMasterModule' },

  { path: 'demo', loadChildren: './modules/demo/demo.module#DemoModule' },
  // { path: 'demo', loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule) },

  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: '/dashboard' },

  // ................................23-4-2021 Swapnil Darekar .................................. ........

  { path: 'companysetting', loadChildren: './modules/companysetting/companysetting.module#CompanySettingModule' },
  { path: 'lock', loadChildren: './modules/lock/lock.module#LockModule' },
  { path: 'reimbursement-master', loadChildren: './modules/reimbursement/reimbursement.module#ReimbursementModule' },

  { path: 'flexiinput', loadChildren: './modules/flexi/flexi.module#FlexiModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
