import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdmComponent } from './sdm.component';

const routes: Routes = [

  {
    path: 'sdm',
    component:  SdmComponent,
    data: { title: ':: DelziaHR :: Leave' }
  },
  // { path: '', pathMatch: 'full', redirectTo: '/investment' },
      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class sdmRoutingModule {
  public static components = [
  ];

}
