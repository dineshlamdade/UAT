import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadexcelhomeComponent } from './uploadexcelhome/uploadexcelhome.component';


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
      path:   'uploadexcelhome',
      component:  UploadexcelhomeComponent,
      data: { title: ':: DelziaHR :: Upload Excel' },
      }

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadexcelRoutingModule { }
