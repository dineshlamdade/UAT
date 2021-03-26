import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryTypeMasterComponent } from './query-type-master/query-type-master.component';
import { QueryComponent } from './standard-que-ans/query.component';

const routes :Routes =[
  {
    path:'',
    children:[
      {
        path:'',
        component:QueryComponent,
        data: { title: ':: DelziaHR :: Standard Question And Answer' },

      },
      {
        path:'query-type-master',
        component:QueryTypeMasterComponent,
        data: { title: ':: DelziaHR :: Query Type Master' },

      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule {
  static components = [
  ];
 }
