import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryTypeMasterComponent } from './query-type-master/query-type-master.component';
import { QueryComponent } from './standard-que-ans/query.component';
import { QueryDashboardComponent} from './query-dashboard/query-dashboard.component'
import { AdminQuryGenerationComponent} from './admin-qury-generation/admin-qury-generation.component'
import { from } from 'rxjs';
import { QueryCOmmunicationComponent } from './query-communication/query-communication.component'
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
// import { EmployeelistComponent } from './employeelist/employeelist.component';


const routes :Routes =[
  {
    path:'',
    children:[
      {
        path:'standard-query',
        component:QueryComponent,
        data: { title: ':: DelziaHR :: Standard Question And Answer' },

      },
      {
        path:'query-type-master',
        component:QueryTypeMasterComponent,
        data: { title: ':: DelziaHR :: Query Type Master' },

      },
      {
        path:'admin-dashboard',
        component: QueryDashboardComponent,
        data: { title: ':: DelziaHR :: Admin Employee Details' },

      },
      {
        path:'admin-query-generation',
        component:AdminQuryGenerationComponent,
        data: { title: ':: DelziaHR ::Admin Query Generation' },

      },
      {
        path:'Query-Communication/:id',
        component:QueryCOmmunicationComponent,
        data: { title: ':: DelziaHR :: Query Communication' },

      },
      {
        path:'document-viewer',
        component:DocumentViewerComponent,
        data: { title: ':: DelziaHR :: document-viewer' },

      },
      // {
      //   path:'employeelist',
      //   component:EmployeelistComponent,
      //   data: { title: ':: DelziaHR :: Employee list' },

      // }
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
