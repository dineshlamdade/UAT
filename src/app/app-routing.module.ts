import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PreloadModulesStrategy } from './core/strategies/preload-module.strategy';
import { AuthModule } from './modules/auth/auth.module';
//import { ClientModule } from './modules/client/client.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SettingsModule } from './modules/settings/settings.module';
import { InvestmentModule } from './modules/investment/investment.module';

const routes: Routes = [
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  //{ path: 'client', loadChildren: './modules/client/client.module#ClientModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'payroll', loadChildren: './modules/payroll/payroll.module#PayrollModule' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
  { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
  { path: 'investment', loadChildren: './modules/investment/investment.module#InvestmentModule' },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), AuthModule, DashboardModule ,
    PayrollModule, ProfileModule , SettingsModule,InvestmentModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
