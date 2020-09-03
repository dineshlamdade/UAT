import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentComponent } from './investment.component';


const routes: Routes = [

  {
    path: 'investment',
    component: InvestmentComponent,
    data: { title: ':: DelziaHR :: MyInvestment' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentRoutingModule { }
