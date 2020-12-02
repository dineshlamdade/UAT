import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CompanyMasterComponent } from '../create-company/company-master/company-master.component';
import { CompanyGroupMasterComponent } from './company-group-master/company-group-master.component';
import { CompanyMasterComponent } from './company-master/company-master.component';
import { CompanyRegistrationDetailsComponent } from './company-registration-details/company-registration-details.component';
import { ComplianceHeadComponent } from './compliance-head/compliance-head.component';
import { ComplianceMasterComponent } from './compliance-master/compliance-master.component';
import { EstablishmentMasterComponent } from './establishment-master/establishment-master.component';
import { StatutoryComplianceComponent } from './statutory-compliance/statutory-compliance.component';


const routes: Routes = [
  {
    path: 'companyGroupMaster',
    component: CompanyGroupMasterComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },
  {
    path: 'companyMaster',
    component: CompanyMasterComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },
  {
    path: 'companyRegistrationDetails',
    component: CompanyRegistrationDetailsComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },
  {
    path: 'complianceHead',
    component: ComplianceHeadComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },
  {
    path: 'statutoryCompliance',
    component: StatutoryComplianceComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },
  {
    path: 'establishmentMaster',
    component: EstablishmentMasterComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },
  {
    path: 'complianceMaster',
    component: ComplianceMasterComponent,
    data: { title: ':: Delizia-HR :: Home' },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherMasterRoutingModule { }
