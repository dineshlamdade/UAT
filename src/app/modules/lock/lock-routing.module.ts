import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessYearComponent } from './business-year/business-year.component';
import { CycleComponent } from './cycle/cycle.component';
import { EmployeeComponent } from './employee/employee.component';
import { LockComponent } from './lock.component'; 
import {NewlockComponent} from './newlock/newlock.component'
const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'lock',
        component: LockComponent,
        data: { title: ':: Epic :: Lock' }
      },
      {
        path: 'business',
        component: BusinessYearComponent,
        data: { title: ':: Epic :: Lock' }
      },
      {
        path: 'business',
        component: BusinessYearComponent,
        data: { title: ':: Epic :: Lock' }
      },
      {
        path: 'cycle',
        component: CycleComponent,
        data: { title: ':: Epic :: Lock' }
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: { title: ':: Epic :: Lock' }
      },
      {
        path: 'LockNew',
        component: NewlockComponent,
        data: { title: ':: Epic :: Lock' }
      },
    ],


    // { path: '', pathMatch: 'full', redirectTo: '/investment' },
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockRoutingModule { }
