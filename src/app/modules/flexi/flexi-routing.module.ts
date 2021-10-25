import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexibasketallocationComponent } from './flexibasketallocation/flexibasketallocation.component';
import { FlexiinputComponent } from './flexiinput/flexiinput.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
      path:'flexiinput',
      component:  FlexiinputComponent,
      data: { title: ':: DelziaHR :: flexi' },
      },
      {
        path:'flexibasketallocation',
        component:  FlexibasketallocationComponent,
        data: { title: ':: DelziaHR :: flexi basket allocation' },
        },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlexiRoutingModule { }
