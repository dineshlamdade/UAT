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
import { SeniorCitizenSavingSchemeComponent } from './80C/senior-citizen-saving-scheme/senior-citizen-saving-scheme.component';
import { TuitionFeesComponent } from './80C/tuition-fees/tuition-fees.component';
import { PhysicallyHandicappedComponent } from './VI-A/physically-handicapped/physically-handicapped.component';
import { HandicappedDependentComponent } from './VI-A/handicapped-dependent/handicapped-dependent.component';
import { ElectricVehicleComponent } from './VI-A/electric-vehicle/electric-vehicle.component';
import { EducationalLoanComponent } from './VI-A/educational-loan/educational-loan.component';
import { InterestOnTtaComponent } from './VI-A/interest-on-tta/interest-on-tta.component';
import { InterestOnDepositTtbComponent } from './VI-A/interest-on-deposit-ttb/interest-on-deposit-ttb.component';

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
          data: { title: ':: DelziaHR :: TaxsavingMutualFund' },
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
        path:   '80C-SeniorCitizenSavingScheme',
        component:  SeniorCitizenSavingSchemeComponent,
        data: { title: ':: DelziaHR :: SeniorCitizenSavingScheme' },
      },
      {
        path:   '80C-TuitionFees',
        component:  TuitionFeesComponent,
        data: { title: ':: DelziaHR :: TuitionFees' },
      },
      {
        path:   'Chapter-VI-A-PhysicallyHandicapped',
        component:  PhysicallyHandicappedComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-PhysicallyHandicapped' },
      },
      {
        path:   'Chapter-VI-A-HandicappedDependent',
        component:  HandicappedDependentComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-HandicappedDependent{Sec.80-DD}' },
      },
      {
        path:   'Chapter-VI-A-InterestOnLoanForPurchaseOfElectricVehicle',
        component:  ElectricVehicleComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOnLoanForPurchaseOfElectricVehicle(Sec.80-EEB)' },
      },
      {
        path:   'Chapter-VI-A-InterestOnEducationalLoan',
        component:  EducationalLoanComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOnEducationalLoan{Sec.80-E}' },
      },
      {
        path:   'Chapter-VI-A-InterestOn80TTA',
        component:  InterestOnTtaComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOn80TTA{Sec.80TTA}' },
      },
      {
        path:   'Chapter-VI-A-InterestOn80TTB',
        component:  InterestOnDepositTtbComponent,
        data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOn80TTA{Sec.80TTB}' },
      },
    ],
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
