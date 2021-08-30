import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';
//  import { NewComponent} from './new/new.component';

const routes: Routes = [

  {
    path:'',
    children:[
    {
      path:'demo',
      component:DemoComponent,
      data: { title: ':: Epic :: demo' }
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { 
  public static components = [
  ];
}
