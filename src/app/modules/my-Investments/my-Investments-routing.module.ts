import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicComponent } from './80C/lic/lic.component';
import { PensionPlanComponent } from './80C/pension-plan/pension-plan.component';
import { PostOfficeComponent } from './80C/post-office/post-office.component';
import { PPFComponent } from './80C/ppf/ppf.component';
import { SukanyaSamriddhiComponent } from './80C/sukanya-samriddhi/sukanya-samriddhi.component';
import { TaxsavingMutualFundComponent } from './80C/taxsaving-mutual-fund/taxsaving-mutual-fund.component';
import { UnitLinkedInsurancePlanComponent } from './80C/unit-linked-insurance-plan/unit-linked-insurance-plan.component';
import { NPSComponent } from './VI-A/nps/nps.component';
import { NationalSevingCertificateComponent } from './80C/national-seving-certificate/national-seving-certificate.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path:   '80C-LIC',
        component:  LicComponent,
        data: { title: ':: DelziaHR :: LIC' },
      },
      {
        path:   '80C-PPF',
        component:  PPFComponent,
        data: { title: ':: DelziaHR :: PPF' },
        },
        {
          path:   '80C-TaxsavingMutualFund',
          component:     TaxsavingMutualFundComponent,
          data: { title: ':: DelziaHR :: PensionPlan' },
        },
      {
        path:   '80C-PensionPlan',
        component:  PensionPlanComponent,
        data: { title: ':: DelziaHR :: PensionPlan' },
      },
      {
        path:   '80C-SukanyaSamriddhiScheme',
        component:  SukanyaSamriddhiComponent,
        data: { title: ':: DelziaHR :: SukanyaSamriddhiScheme' },
      },
      {
        path:   '80C-PostOfficeTimeDepositScheme',
        component:  PostOfficeComponent,
        data: { title: ':: DelziaHR :: PostOfficeTimeDepositScheme' },
      },
      {
        path:   '80C-UnitLinkedInsurancePlan',
        component:  UnitLinkedInsurancePlanComponent,
        data: { title: ':: DelziaHR :: UnitLinkedInsurancePlan' },
      },
      {
        path:   'Chapter-VI-A-NPS',
        component:  NPSComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-NPS' },
      },
      {
        path:   '80C-NationalSevingCertificate',
        component:  NationalSevingCertificateComponent,
        data: { title: ':: DelziaHR :: NationalSevingCertificate' },
      },
    ],

  // { path: '', pathMatch: 'full', redirectTo: '/investment' },
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyInvestmentsRoutingModule {
  static components = [
  ];

}
