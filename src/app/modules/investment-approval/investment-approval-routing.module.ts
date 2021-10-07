import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component';
import { InvestmentApprovalComponent } from './investment-approval.component';
import { InvestmentMasterApprovalComponent } from './investment-master-approval/investment-master-approval.component';
import { InvestmentTransactionApprovalComponent } from './investment-transaction-approval/investment-transaction-approval.component';
import { InvestmentOnetimetransactionApprovalComponent } from './investment-onetimetransaction-approval/investment-onetimetransaction-approval.component';
import { InvestmentHandicappeddependentmasterApprovalComponent } from './investment-handicappeddependentmaster-approval/investment-handicappeddependentmaster-approval.component';
import { InvestmentIntereston80TTATTBMasterApprovalComponent } from './investment-intereston80-tta-ttb-master-approval/investment-intereston80-tta-ttb-master-approval.component';
import { InvestmentInterestOnEducationalLoanMasterApprovalComponent } from './investment-interest-on-educational-loan-master-approval/investment-interest-on-educational-loan-master-approval.component';
import { InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval/investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval.component';
import { InvestmentMediclaim80DMasterApprovalComponent } from './investment-mediclaim80-dmaster-approval/investment-mediclaim80-dmaster-approval.component';
import { InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent } from './investment-treatment-of-specified-diseases-master-approval/investment-treatment-of-specified-diseases-master-approval.component';
import { InvestmentInterestOn80TTATTBTransactionApprovalComponent } from './investment-interest-on80-tta-ttb-transaction-approval/investment-interest-on80-tta-ttb-transaction-approval.component';
import { InvestmentHandicappedDependenttransactionApprovalComponent } from './investment-handicapped-dependenttransaction-approval/investment-handicapped-dependenttransaction-approval.component';
import { InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicletransaction-approval/investment-interest-on-loan-for-purchase-of-electric-vehicletransaction-approval.component';
import { InvestmentInterestOnEducationalLoantransactionApprovalComponent } from './investment-interest-on-educational-loantransaction-approval/investment-interest-on-educational-loantransaction-approval.component';
import { InvestmentMediclaim80DtransactionApprovalComponent } from './investment-mediclaim80-dtransaction-approval/investment-mediclaim80-dtransaction-approval.component';
import { InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent } from './investment-treatment-of-specified-diseasestransaction-approval/investment-treatment-of-specified-diseasestransaction-approval.component';
import { InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent } from './investment-donations-for-ggctransaction-approval/investment-donations-for-ggctransaction-approval.component';
import { InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent } from './investment-donations-for-ggatransaction-approval/investment-donations-for-scientific-research-ggatransaction-approval.component';
import { InvestmentPhysicallyHandicappedtransactionApprovalComponent } from './investment-physically-handicappedtransaction-approval/investment-physically-handicappedtransaction-approval.component';
import { InvestmentHousingLoanMasterApprovalComponent } from './investment-housing-loan-master-approval/investment-housing-loan-master-approval.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: InvestmentApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'master',
        component: InvestmentMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Master' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'interestoneducationalloanmaster',
        component: InvestmentInterestOnEducationalLoanMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-InterestOnEducationalLoanMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'interestoneducationalloantransaction',
        component: InvestmentInterestOnEducationalLoantransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-InterestOnEducationalLoantransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'interestonloanforpurchaseofelectricvehiclemaster',
        component: InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-InterestOnLoanForPurchaseOfElectricVehicleMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'interestonloanforpurchaseofelectricvehicletransaction',
        component: InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-InterestOnLoanForPurchaseOfElectricVehicletransaction' },
      },
    ],
  },

  {
    path: '',
    children: [
      {
        path: 'mediclaim80dmaster',
        component: InvestmentMediclaim80DMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-mediclaim80dmaster' },
      },
    ],
  },

  {
    path: '',
    children: [
      {
        path: 'housingloanmaster',
        component: InvestmentHousingLoanMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-HousingLoanMaster' },
      },
    ],
  },

  {
    path: '',
    children: [
      {
        path: 'mediclaim80dtransaction',
        component: InvestmentMediclaim80DtransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Mediclaim80Dtransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'treatmentofspecifieddiseasesmaster',
        component: InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-treatmentofspecifieddiseasesmaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'treatmentofspecifieddiseasestransaction',
        component: InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-treatmentofspecifieddiseasestransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'handicappeddependentmaster',
        component: InvestmentHandicappeddependentmasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-HandicappeddependentMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'intereston80ttattbmaster',
        component: InvestmentIntereston80TTATTBMasterApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Intereston80TTATTBMaster' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'transaction',
        component: InvestmentTransactionApprovalComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Transaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'onetimetransaction',
        component: InvestmentOnetimetransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-OneTimeTransaction' },
      },
    ],
  },

  {
    path: '',
    children: [
      {
        path: 'donationsforregisteredpoliticalpartyelectoraltrustsec80ggctransaction',
        component: InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-DonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'donationsforscientificresearchggatransaction',
        component: InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-DonationsForScientificResearchGGAtransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'physicallyhandicappedtransaction',
        component: InvestmentPhysicallyHandicappedtransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-PhysicallyHandicappedtransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'handicappeddependenttransaction',
        component: InvestmentHandicappedDependenttransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-HandicappedDependenttransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'intereston80ttattbtransaction',
        component: InvestmentInterestOn80TTATTBTransactionApprovalComponent,
        data: { title: ':: Delizia-Hr :: Investment-Approval-InterestOn80TTATTBTransaction' },
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'documentview',
        component: DocumentviewerComponent,
        data: { title: ':: Delizia-HR :: Investment-Approval-Document-Viewer' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentApprovalRoutingModule {}
