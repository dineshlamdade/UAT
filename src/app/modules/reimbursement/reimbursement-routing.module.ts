import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RembSummaryComponent }  from './remb-summary/remb-summary.component';
import { RembRegistrationComponent } from './remb-registration/remb-registration.component';
import { RembClaimTaxableComponent } from './remb-claim-taxable/remb-claim-taxable.component';
import { RembClaimNontaxComponent } from './remb-claim-nontax/remb-claim-nontax.component';
import { ReimbursementComponent } from './reimbursement.component';
import { LtaComponent } from './lta/lta.component';
const routes: Routes = [
{
  path: '',
  children:[
    {
      path:'reimbursement-master',
      component: ReimbursementComponent,
      data: { title: ':: Epic :: Reimbursement'}
    },
    {
      path:'reimbursement-master/:name',
      component: ReimbursementComponent,
      data: { title: ':: Epic :: Reimbursement'}
    },
    {
      path:'ramb-claim-nontaxable',
      component: RembClaimNontaxComponent,
      data: { title: ':: Epic :: Claim Non Taxable'}
    },
    {
      path:'remb-claim-taxable',
      component: RembClaimTaxableComponent,
      data: { title: ':: Epic :: Claim-Taxable'}
    },
    {
      path:'remb-register',
      component: RembRegistrationComponent,
      data: { title: ':: Epic :: Register'}
    },
    {
      path:'remb-summary',
      component: RembSummaryComponent,
      data: { title: ':: Epic :: Summary'}
    },
    {
      path:'lta',
      component: LtaComponent,
      data: { title: ':: Epic :: lta'}
    },
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReimbursementRoutingModule { }
