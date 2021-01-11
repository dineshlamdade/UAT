import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PreloadModulesStrategy } from './core/strategies/preload-module.strategy';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'payroll', loadChildren: './modules/payroll/payroll.module#PayrollModule' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
  { path: 'investment', loadChildren: './modules/my-Investments/my-Investments.module#MyInvestmentsModule' },
  { path: 'otherMaster', loadChildren: './modules/other-master/other-master.module#OtherMasterModule' },





  { path: '**', pathMatch: 'full' , redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
