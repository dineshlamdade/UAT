import { LoanMasterComponent } from './loan-master/loan-master.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: 'company-settings',
    children: [
      {
      path:   'loan-master',
      component:  LoanMasterComponent,
      data: { title: ':: DelziaHR :: Leave' },
      },
    ],
  },
      ];
      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
      })
      export class CompanySettingsRoutes {
        public static components = [
        ];
      
      }
      