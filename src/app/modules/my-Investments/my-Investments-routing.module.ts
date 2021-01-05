import { InterestDepositSavingAccountComponent } from './VI-A/interest-deposit-savingAccount/interest-deposit-savingAccount.component';
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
import { FixedDepositsComponent } from './80C/fixed-deposits/fixed-deposits.component';
import { TaxSavingSharesNabardComponent } from './80C/tax-saving-shares-nabard/tax-saving-shares-nabard.component';
import { PostOfficeTermDepositComponent } from './80C/post-office-term-deposit/post-office-term-deposit.component';
import { ChildHostelAllowanceComponent } from './others/child-hostel-allowance/child-hostel-allowance.component';
import { ChildEducationAllowanceComponent } from './others/childEducationAllowance/childEducationAllowance.component';
import { IDSATTBComponent } from './VI-A/IDSA-TTB/IDSA-TTB.component';
import { AuthGuard } from './../auth/auth.guard';
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
      {
        path:   '80C-FixedDepositsMoreThan5Years',
        component:  FixedDepositsComponent,
        data: { title: ':: DelziaHR :: Fixed Deposits More Than 5 Years' },
      },
      {
        path:   '80C-TaxSavingSharesNabardandOtherBonds',
        component:  TaxSavingSharesNabardComponent,
        data: { title: ':: DelziaHR :: TaxSavingSharesNabardandOtherBonds' },
      },
      {
        path:   '80C-PostOfficeTermDeposit',
        component:  PostOfficeTermDepositComponent,
        data: { title: ':: DelziaHR :: PostOfficeTermDeposit' },
      },
      {
        path:   'childHostelAllowance',
        component:  ChildHostelAllowanceComponent,
        data: { title: ':: DelziaHR :: Child Hostel Allowance' },
      },
      {
        path:   'childEducationAllowance',
        component:  ChildEducationAllowanceComponent,
        data: { title: ':: DelziaHR :: Child Hostel Allowance' },
      },
      {
        path:   'interestDepositSavingAccountTTA',
        component:  InterestDepositSavingAccountComponent,
        data: { title: ':: DelziaHR :: Child Hostel Allowance' },
      },
      {
        path:   'interestDepositSavingAccountTTB',
        component:  IDSATTBComponent,
        data: { title: ':: DelziaHR :: Child Hostel Allowance' },
      },
    ],
    canActivate: [AuthGuard]

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
