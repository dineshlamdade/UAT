import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ApprovalsComponent } from './approvals/approvals.component';


const routes: Routes = [

  // {
  //   path: 'admindashboard',
  //   component: AdminDashboardComponent,
  //   data: { title: ':: Delizia-HR :: Home' },
  // },

  {
    path: '',
    children: [
      {
      path:   'admindashboard',
      component:  AdminDashboardComponent,
      data: { title: ':: DelziaHR :: AdminDashboard' },
      },
      {
        path:   'approvals',
        component:  ApprovalsComponent,
        data: { title: ':: DelziaHR :: Approvals' },
        },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminApprovalRoutingModule { }
