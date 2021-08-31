import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdmComponent } from './sdm.component';

const routes: Routes = [
  {
    path: 'sdm',
    component: SdmComponent,
    data: { title: ':: Delizia-HR :: sdm' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdmRoutingModule { }
