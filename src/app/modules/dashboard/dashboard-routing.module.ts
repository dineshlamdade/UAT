import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './../auth/auth.guard';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: ':: Delizia-HR :: Home' },
    //canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
