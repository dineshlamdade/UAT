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
import { SummaryComponent } from './80C/summary/summary.component';
import { ChapterVIASummaryComponent } from './VI-A/chapter-vi-a-summary/chapter-vi-a-summary.component';
// import { ChildhostelallowanceComponent } from './Child Hostel Allowance(CHA)/childhostelallowance/childhostelallowance.component';
// import { ChaComponent } from './Child Hostel Allowance(CHA)/childhostelallowance/cha/cha.component';
// import { ChildeducationallowanceComponent } from './Child Education Allowance/childeducationallowance/childeducationallowance.component';
// import { CeaComponent } from './Child Education Allowance/cea/cea.component';
import { NationalSavingCertificateNSCComponent } from './Other/national-saving-certificate-nsc/national-saving-certificate-nsc.component';
import { HousePropertyComponent } from './Other/house-property/house-property.component';
import { PrincipalRepaymentOnHousingLoanComponent } from './Other/principal-repayment-on-housing-loan/principal-repayment-on-housing-loan.component';
import { EmployeeContributionToProvidentFundPFComponent } from './80C/employee-contribution-to-provident-fund-pf/employee-contribution-to-provident-fund-pf.component';
import { EmployeeContributionToVPFComponent } from './80C/employee-contribution-to-vpf/employee-contribution-to-vpf.component';
// import { TaxAdjustmentsSummaryComponent } from './Other/tax-adjustments/tax-adjustments-summary/tax-adjustments-summary.component';
import { TaxAdjustmentsComponent } from './Other/tax-adjustments/tax-adjustments.component';
// import { TaxAdjustmentsAmountComponent } from './Other/tax-adjustments/tax-adjustments-amount/tax-adjustments-amount.component';
import { PhysicallyHandicappedComponent } from './VI-A/physically-handicapped/physically-handicapped.component';
import { HandicappedDependentComponent } from './VI-A/handicapped-dependent/handicapped-dependent.component';
import { ElectricVehicleComponent } from './VI-A/electric-vehicle/electric-vehicle.component';
import { EducationalLoanComponent } from './VI-A/educational-loan/educational-loan.component';
import { InterestOnTtaComponent } from './VI-A/interest-on-tta/interest-on-tta.component';
import { InterestOnDepositTtbComponent } from './VI-A/interest-on-deposit-ttb/interest-on-deposit-ttb.component';
// import { ChildHostelAllowanceComponent } from './others/child-hostel-allowance/child-hostel-allowance.component';
// import { ChildEducationAllowanceComponent } from './others/childEducationAllowance/childEducationAllowance.component';
import { DonationsForScientificResearchComponent } from './VI-A/donations-for-scientific-research/donations-for-scientific-research.component';
import { GGCComponent } from './VI-A/ggc/ggc.component';
import { Mediclaim80DComponent } from './VI-A/mediclaim80-d/mediclaim80-d.component';
import { HousingloanComponent } from './housingloan/housingloan.component';
import { HousingrentComponent } from './housingrent/housingrent.component';
import { TreatmentOfSpecifiedDiseasesComponent } from './VI-A/treatment-of-specified-diseases/treatment-of-specified-diseases.component';
import { ChaComponent } from './Other/Child Hostel Allowance(CHA)/childhostelallowance/cha/cha.component';
// import { ChildhostelallowanceComponent } from './Other/Child Hostel Allowance(CHA)/childhostelallowance/childhostelallowance.component';
import { CeaComponent } from './Other/Child Education Allowance/cea/cea.component';
// import { ChildeducationallowanceComponent } from './Other/Child Education Allowance/childeducationallowance/childeducationallowance.component';
// import { CeamasterComponent } from './Other/Child Education Allowance/ceamaster/ceamaster.component';
// import { ChamasterComponent } from './Other/Child Hostel Allowance(CHA)/childhostelallowance/chamaster/chamaster.component';


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
          path:   '80C-Summary',
          component:  SummaryComponent,
           data: { title: ':: DelziaHR :: Summary' },
          },
          {
            path:   '80C-EmployeeContributionToProvidentFund_PF',
            component:  EmployeeContributionToProvidentFundPFComponent,
             data: { title: ':: DelziaHR :: EmployeeContributionToProvidentFund_PF' },
            },
            {
              path:   '80C-EmployeeContributionToVPF',
              component:  EmployeeContributionToVPFComponent,
               data: { title: ':: DelziaHR :: EmployeeContributionToProvidentFund_PF' },
              },
          
        
          {
            path:   'Chapter-VI-A-Summary',
            component:  ChapterVIASummaryComponent,
             data: { title: ':: DelziaHR :: Chapter-VI-A-Summary' },
            },

            {
              path:   'Other-Child-Hostel-Allowance',
              component:  ChaComponent,
               data: { title: ':: DelziaHR :: Child-Hostel-Allowance' },
              },
        
              {
                path:   'Other-Child',
                component:  ChaComponent,
                 data: { title: ':: DelziaHR :: Child-Hostel-Allowance' },
                },

                {
                  path:   'Other-Child-Education-Allowance',
                  component:  CeaComponent,
                   data: { title: ':: DelziaHR :: Child-Education-Allowance' },
                  },

                  {
                    path:   'Other-NationalSavingCertificate(NSC)_AccruedInterest',
                    component:  NationalSavingCertificateNSCComponent,
                     data: { title: ':: DelziaHR ::  NationalSavingCertificate(NSC)_AccruedInterest' },
                    },

                    {
                      path:   'Other-HouseProperty',
                      component:  HousePropertyComponent,
                       data: { title: ':: DelziaHR ::  HouseProperty' },
                      },

                      {
                        path:   'Other-PrincipalRepaymentOnHousingLoan',
                        component: PrincipalRepaymentOnHousingLoanComponent,
                         data: { title: ':: DelziaHR ::  PrincipalRepaymentOnHousingLoan' },
                        },  

                        {
                          path:   'Other-TaxAdjustments',
                          component:  TaxAdjustmentsComponent,
                           data: { title: ':: DelziaHR ::  TaxAdjustments' },
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
        path:   '80C-NationalSavingCertificate',
        component:  NationalSevingCertificateComponent,
        data: { title: ':: DelziaHR :: NationalSavingCertificate' },
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
        data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOn80TTB{Sec.80TTB}' },
      },
      // {
      //   path:   'childHostelAllowance',
      //   component:  ChildHostelAllowanceComponent,
      //   data: { title: ':: DelziaHR :: Child Hostel Allowance' },
      // },
      // {
      //   path:   'Chapter-VI-A-childEducationAllowance',
      //   component:  ChildEducationAllowanceComponent,
      //   data: { title: ':: DelziaHR :: Child Hostel Allowance' },
      // },
      {
        path:   'Chapter-VI-A-DonationsForScientificResearchRuralDevelopmentScreenGGA',
        component:  DonationsForScientificResearchComponent,
        data: { title:  ':: DelziaHR :: DonationsForScientificResearchRuralDevelopmentScreenGGA' },
      },
      {
        path:   'Chapter-VI-A-DonationsForScientificResearchGGC',
        component:  GGCComponent,
        data: { title:  ':: DelziaHR :: DonationsForScientificResearchGGC' },
      },
      {
        path:   'Chapter-VI-A-Mediclaim80D',
        component:  Mediclaim80DComponent,
        data: { title:  ':: DelziaHR :: Mediclaim80D' },
      },
      {
        path:   'HousingLoan',
        component:  HousingloanComponent,
        data: { title: ':: DelziaHR :: HousingLoan' },
      },
      {
        path:   'HouseRent',
        component:  HousingrentComponent,
        data: { title: ':: DelziaHR :: HouseRent' },
      },
      {
        path:   'Chapter-VI-A-TreatmentOfSpecifiedDiseasesComponent',
        component:  TreatmentOfSpecifiedDiseasesComponent,
        data: { title:  ':: DelziaHR :: TreatmentOfSpecifiedDiseasesComponent' },
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
