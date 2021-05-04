"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyInvestmentsRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var lic_component_1 = require("./80C/lic/lic.component");
var pension_plan_component_1 = require("./80C/pension-plan/pension-plan.component");
var post_office_component_1 = require("./80C/post-office/post-office.component");
var ppf_component_1 = require("./80C/ppf/ppf.component");
var sukanya_samriddhi_component_1 = require("./80C/sukanya-samriddhi/sukanya-samriddhi.component");
var taxsaving_mutual_fund_component_1 = require("./80C/taxsaving-mutual-fund/taxsaving-mutual-fund.component");
var unit_linked_insurance_plan_component_1 = require("./80C/unit-linked-insurance-plan/unit-linked-insurance-plan.component");
var nps_component_1 = require("./VI-A/nps/nps.component");
var national_seving_certificate_component_1 = require("./80C/national-seving-certificate/national-seving-certificate.component");
var fixed_deposits_component_1 = require("./80C/fixed-deposits/fixed-deposits.component");
var tax_saving_shares_nabard_component_1 = require("./80C/tax-saving-shares-nabard/tax-saving-shares-nabard.component");
var post_office_term_deposit_component_1 = require("./80C/post-office-term-deposit/post-office-term-deposit.component");
var senior_citizen_saving_scheme_component_1 = require("./80C/senior-citizen-saving-scheme/senior-citizen-saving-scheme.component");
var tuition_fees_component_1 = require("./80C/tuition-fees/tuition-fees.component");
var summary_component_1 = require("./80C/summary/summary.component");
var chapter_vi_a_summary_component_1 = require("./VI-A/chapter-vi-a-summary/chapter-vi-a-summary.component");
// import { ChildhostelallowanceComponent } from './Child Hostel Allowance(CHA)/childhostelallowance/childhostelallowance.component';
// import { ChaComponent } from './Child Hostel Allowance(CHA)/childhostelallowance/cha/cha.component';
// import { ChildeducationallowanceComponent } from './Child Education Allowance/childeducationallowance/childeducationallowance.component';
// import { CeaComponent } from './Child Education Allowance/cea/cea.component';
var national_saving_certificate_nsc_component_1 = require("./Other/national-saving-certificate-nsc/national-saving-certificate-nsc.component");
var house_property_component_1 = require("./Other/house-property/house-property.component");
var principal_repayment_on_housing_loan_component_1 = require("./Other/principal-repayment-on-housing-loan/principal-repayment-on-housing-loan.component");
var employee_contribution_to_provident_fund_pf_component_1 = require("./80C/employee-contribution-to-provident-fund-pf/employee-contribution-to-provident-fund-pf.component");
var employee_contribution_to_vpf_component_1 = require("./80C/employee-contribution-to-vpf/employee-contribution-to-vpf.component");
// import { TaxAdjustmentsSummaryComponent } from './Other/tax-adjustments/tax-adjustments-summary/tax-adjustments-summary.component';
var tax_adjustments_component_1 = require("./Other/tax-adjustments/tax-adjustments.component");
// import { TaxAdjustmentsAmountComponent } from './Other/tax-adjustments/tax-adjustments-amount/tax-adjustments-amount.component';
var physically_handicapped_component_1 = require("./VI-A/physically-handicapped/physically-handicapped.component");
var handicapped_dependent_component_1 = require("./VI-A/handicapped-dependent/handicapped-dependent.component");
var electric_vehicle_component_1 = require("./VI-A/electric-vehicle/electric-vehicle.component");
var educational_loan_component_1 = require("./VI-A/educational-loan/educational-loan.component");
var interest_on_tta_component_1 = require("./VI-A/interest-on-tta/interest-on-tta.component");
var interest_on_deposit_ttb_component_1 = require("./VI-A/interest-on-deposit-ttb/interest-on-deposit-ttb.component");
// import { ChildHostelAllowanceComponent } from './others/child-hostel-allowance/child-hostel-allowance.component';
// import { ChildEducationAllowanceComponent } from './others/childEducationAllowance/childEducationAllowance.component';
// import { ChildHostelAllowanceComponent } from './others/child-hostel-allowance/child-hostel-allowance.component';
// import { ChildEducationAllowanceComponent } from './others/childEducationAllowance/childEducationAllowance.component';
var donations_for_scientific_research_component_1 = require("./VI-A/donations-for-scientific-research/donations-for-scientific-research.component");
var ggc_component_1 = require("./VI-A/ggc/ggc.component");
var mediclaim80_d_component_1 = require("./VI-A/mediclaim80-d/mediclaim80-d.component");
var housingloan_component_1 = require("./housingloan/housingloan.component");
var housingrent_component_1 = require("./housingrent/housingrent.component");
var treatment_of_specified_diseases_component_1 = require("./VI-A/treatment-of-specified-diseases/treatment-of-specified-diseases.component");
var previousemployer_component_1 = require("./previousemployer/previousemployer.component");
var cha_component_1 = require("./Other/Child Hostel Allowance(CHA)/childhostelallowance/cha/cha.component");
var cea_component_1 = require("./Other/Child Education Allowance/cea/cea.component");
var otherincome_component_1 = require("./Other/Other Income/otherincome/otherincome.component");
var employee_nps80_ccd_component_1 = require("./Other/EmployeeNationalPensionScheme80CCD/employee-nps80-ccd/employee-nps80-ccd.component");
var affirmation_component_1 = require("./affirmation/affirmation.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: '80C-LIC',
                component: lic_component_1.LicComponent,
                data: { title: ':: DelziaHR :: LIC' }
            },
            {
                path: '80C-PPF',
                component: ppf_component_1.PPFComponent,
                data: { title: ':: DelziaHR :: PPF' }
            },
            {
                path: '80C-Summary',
                component: summary_component_1.SummaryComponent,
                data: { title: ':: DelziaHR :: Summary' }
            },
            {
                path: '80C-EmployeeContributionToProvidentFund_PF',
                component: employee_contribution_to_provident_fund_pf_component_1.EmployeeContributionToProvidentFundPFComponent,
                data: { title: ':: DelziaHR :: EmployeeContributionToProvidentFund_PF' }
            },
            {
                path: '80C-EmployeeContributionToVPF',
                component: employee_contribution_to_vpf_component_1.EmployeeContributionToVPFComponent,
                data: { title: ':: DelziaHR :: EmployeeContributionToProvidentFund_PF' }
            },
            {
                path: 'Chapter-VI-A-Summary',
                component: chapter_vi_a_summary_component_1.ChapterVIASummaryComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-Summary' }
            },
            {
                path: 'Other-Child-Hostel-Allowance',
                component: cha_component_1.ChaComponent,
                data: { title: ':: DelziaHR :: Child-Hostel-Allowance' }
            },
            {
                path: 'Other-Child',
                component: cha_component_1.ChaComponent,
                data: { title: ':: DelziaHR :: Child-Hostel-Allowance' }
            },
            {
                path: 'Other-Child-Education-Allowance',
                component: cea_component_1.CeaComponent,
                data: { title: ':: DelziaHR :: Child-Education-Allowance' }
            },
            {
                path: 'Other-NationalSavingCertificate(NSC)_AccruedInterest',
                component: national_saving_certificate_nsc_component_1.NationalSavingCertificateNSCComponent,
                data: { title: ':: DelziaHR ::  NationalSavingCertificate(NSC)_AccruedInterest' }
            },
            {
                path: 'Other-HouseProperty',
                component: house_property_component_1.HousePropertyComponent,
                data: { title: ':: DelziaHR ::  HouseProperty' }
            },
            /* {
              path:   'Other-Employeenationalpension',
              component:  EmployeenationalpensionComponent,
               data: { title: ':: DelziaHR ::  Employeenationalpension' },
              }, */
            {
                path: 'Other-PrincipalRepaymentOnHousingLoan',
                component: principal_repayment_on_housing_loan_component_1.PrincipalRepaymentOnHousingLoanComponent,
                data: { title: ':: DelziaHR ::  PrincipalRepaymentOnHousingLoan' }
            },
            {
                path: 'Other-TaxAdjustments',
                component: tax_adjustments_component_1.TaxAdjustmentsComponent,
                data: { title: ':: DelziaHR ::  TaxAdjustments' }
            },
            {
                path: 'Other-OtherIncome',
                component: otherincome_component_1.OtherincomeComponent,
                data: { title: ':: DelziaHR ::  OtherIncome' }
            },
            {
                path: 'Other-EmployeeNationalPensionScheme80CCD',
                component: employee_nps80_ccd_component_1.EmployeeNPS80CCDComponent,
                data: { title: ':: DelziaHR ::  EmployeeNationalPensionScheme80CCD' }
            },
            {
                path: '80C-TaxsavingMutualFund',
                component: taxsaving_mutual_fund_component_1.TaxsavingMutualFundComponent,
                data: { title: ':: DelziaHR :: TaxsavingMutualFund' }
            },
            {
                path: '80C-PensionPlan',
                component: pension_plan_component_1.PensionPlanComponent,
                data: { title: ':: DelziaHR :: PensionPlan' }
            },
            {
                path: '80C-SukanyaSamriddhiScheme',
                component: sukanya_samriddhi_component_1.SukanyaSamriddhiComponent,
                data: { title: ':: DelziaHR :: SukanyaSamriddhiScheme' }
            },
            {
                path: '80C-PostOfficeTimeDepositScheme',
                component: post_office_component_1.PostOfficeComponent,
                data: { title: ':: DelziaHR :: PostOfficeTimeDepositScheme' }
            },
            {
                path: '80C-UnitLinkedInsurancePlan',
                component: unit_linked_insurance_plan_component_1.UnitLinkedInsurancePlanComponent,
                data: { title: ':: DelziaHR :: UnitLinkedInsurancePlan' }
            },
            {
                path: 'Chapter-VI-A-NPS',
                component: nps_component_1.NPSComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-NPS' }
            },
            {
                path: '80C-NationalSavingCertificate',
                component: national_seving_certificate_component_1.NationalSevingCertificateComponent,
                data: { title: ':: DelziaHR :: NationalSavingCertificate' }
            },
            {
                path: '80C-FixedDepositsMoreThan5Years',
                component: fixed_deposits_component_1.FixedDepositsComponent,
                data: { title: ':: DelziaHR :: Fixed Deposits More Than 5 Years' }
            },
            {
                path: '80C-TaxSavingSharesNabardandOtherBonds',
                component: tax_saving_shares_nabard_component_1.TaxSavingSharesNabardComponent,
                data: { title: ':: DelziaHR :: TaxSavingSharesNabardandOtherBonds' }
            },
            {
                path: '80C-PostOfficeTermDeposit',
                component: post_office_term_deposit_component_1.PostOfficeTermDepositComponent,
                data: { title: ':: DelziaHR :: PostOfficeTermDeposit' }
            },
            {
                path: '80C-SeniorCitizenSavingScheme',
                component: senior_citizen_saving_scheme_component_1.SeniorCitizenSavingSchemeComponent,
                data: { title: ':: DelziaHR :: SeniorCitizenSavingScheme' }
            },
            {
                path: '80C-TuitionFees',
                component: tuition_fees_component_1.TuitionFeesComponent,
                data: { title: ':: DelziaHR :: TuitionFees' }
            },
            {
                path: 'Chapter-VI-A-PhysicallyHandicapped',
                component: physically_handicapped_component_1.PhysicallyHandicappedComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-PhysicallyHandicapped' }
            },
            {
                path: 'Chapter-VI-A-HandicappedDependent',
                component: handicapped_dependent_component_1.HandicappedDependentComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-HandicappedDependent{Sec.80-DD}' }
            },
            {
                path: 'Chapter-VI-A-InterestOnLoanForPurchaseOfElectricVehicle',
                component: electric_vehicle_component_1.ElectricVehicleComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOnLoanForPurchaseOfElectricVehicle(Sec.80-EEB)' }
            },
            {
                path: 'Chapter-VI-A-InterestOnEducationalLoan',
                component: educational_loan_component_1.EducationalLoanComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOnEducationalLoan{Sec.80-E}' }
            },
            {
                path: 'Chapter-VI-A-InterestOn80TTA',
                component: interest_on_tta_component_1.InterestOnTtaComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOn80TTA{Sec.80TTA}' }
            },
            {
                path: 'Chapter-VI-A-InterestOn80TTB',
                component: interest_on_deposit_ttb_component_1.InterestOnDepositTtbComponent,
                data: { title: ':: DelziaHR :: Chapter-VI-A-InterestOn80TTB{Sec.80TTB}' }
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
                path: 'Chapter-VI-A-DonationsForScientificResearchRuralDevelopmentScreenGGA',
                component: donations_for_scientific_research_component_1.DonationsForScientificResearchComponent,
                data: { title: ':: DelziaHR :: DonationsForScientificResearchRuralDevelopmentScreenGGA' }
            },
            {
                path: 'Chapter-VI-A-DonationsForScientificResearchGGC',
                component: ggc_component_1.GGCComponent,
                data: { title: ':: DelziaHR :: DonationsForScientificResearchGGC' }
            },
            {
                path: 'Chapter-VI-A-Mediclaim80D',
                component: mediclaim80_d_component_1.Mediclaim80DComponent,
                data: { title: ':: DelziaHR :: Mediclaim80D' }
            },
            {
                path: 'HousingLoan',
                component: housingloan_component_1.HousingloanComponent,
                data: { title: ':: DelziaHR :: HousingLoan' }
            },
            {
                path: 'HouseRent',
                component: housingrent_component_1.HousingrentComponent,
                data: { title: ':: DelziaHR :: HouseRent' }
            },
            {
                path: 'previousemployer',
                component: previousemployer_component_1.PreviousemployerComponent,
                data: { title: ':: DelziaHR :: previousemployer' }
            },
            {
                path: 'affirmation',
                component: affirmation_component_1.AffirmationComponent,
                data: { title: ':: DelziaHR :: Affirmation' }
            },
            {
                path: 'Chapter-VI-A-TreatmentOfSpecifiedDiseasesComponent',
                component: treatment_of_specified_diseases_component_1.TreatmentOfSpecifiedDiseasesComponent,
                data: { title: ':: DelziaHR :: TreatmentOfSpecifiedDiseasesComponent' }
            },
        ]
    },
];
var MyInvestmentsRoutingModule = /** @class */ (function () {
    function MyInvestmentsRoutingModule() {
    }
    MyInvestmentsRoutingModule.components = [];
    MyInvestmentsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], MyInvestmentsRoutingModule);
    return MyInvestmentsRoutingModule;
}());
exports.MyInvestmentsRoutingModule = MyInvestmentsRoutingModule;
