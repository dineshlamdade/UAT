import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeemasterlistComponent } from './employeemasterlist/employeemasterlist.component';




const routes: Routes = [
  {
    path: '',
    children: [
      {
      path:   'employeemasterlist',
      component:  EmployeemasterlistComponent,
      data: { title: ':: DelziaHR :: Employee List' },
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemasterlistpageRoutingModule { }
