import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedInvestmentComponent } from './approved-investment.component';
import { ApprovedsecondComponent } from './approvedsecond/approvedsecond.component'
import { ApprovedthirdComponent} from './approvedthird/approvedthird.component'
import { DocumentviewerComponent} from './documentviewer/documentviewer.component'
const routes: Routes = [
  {
  path: 'approved-investment',
    component: ApprovedInvestmentComponent,
    data: { title: ':: Approved Investment' },
  },
  {
  path: 'approved-investmentsecond',
  component: ApprovedsecondComponent,
  data: { title: ':: Delizia-HR :: Approved Investment' },
},
{
  path: 'approved-investmentthird',
  component: ApprovedthirdComponent,
  data: { title: ':: Delizia-HR :: Approved Investment' },
},
{
  path: 'Document-viewer',
  component: DocumentviewerComponent,
  data: { title: ':: Delizia-HR :: Document-viewer' },
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedInvestmentRoutingModule { }
