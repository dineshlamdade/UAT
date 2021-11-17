import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentApprovalRoutingModule } from './investment-approval-routing.module';
import { InvestmentApprovalComponent } from './investment-approval.component';
import { InvestmentMasterApprovalComponent } from './investment-master-approval/investment-master-approval.component';
import { SharedlayoutModule } from '../sharedlayout/sharedlayout.module';
import { TableModule } from 'primeng/table';
import { DocumentviewerComponent } from './documentviewer/documentviewer.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InvestmentTransactionApprovalComponent } from './investment-transaction-approval/investment-transaction-approval.component';
import { InvestmentOnetimetransactionApprovalComponent } from './investment-onetimetransaction-approval/investment-onetimetransaction-approval.component';
import { InvestmentHandicappeddependentmasterApprovalComponent } from './investment-handicappeddependentmaster-approval/investment-handicappeddependentmaster-approval.component';
import { InvestmentIntereston80TTATTBMasterApprovalComponent } from './investment-intereston80-tta-ttb-master-approval/investment-intereston80-tta-ttb-master-approval.component';
import { InvestmentInterestOnEducationalLoanMasterApprovalComponent } from './investment-interest-on-educational-loan-master-approval/investment-interest-on-educational-loan-master-approval.component';
import { InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval/investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval.component';
import { InvestmentMediclaim80DMasterApprovalComponent } from './investment-mediclaim80-dmaster-approval/investment-mediclaim80-dmaster-approval.component';
import { InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent } from './investment-treatment-of-specified-diseases-master-approval/investment-treatment-of-specified-diseases-master-approval.component';
import { InvestmentHandicappedDependenttransactionApprovalComponent } from './investment-handicapped-dependenttransaction-approval/investment-handicapped-dependenttransaction-approval.component';
import { InvestmentInterestOn80TTATTBTransactionApprovalComponent } from './investment-interest-on80-tta-ttb-transaction-approval/investment-interest-on80-tta-ttb-transaction-approval.component';
import { InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicletransaction-approval/investment-interest-on-loan-for-purchase-of-electric-vehicletransaction-approval.component';
import { InvestmentInterestOnEducationalLoantransactionApprovalComponent } from './investment-interest-on-educational-loantransaction-approval/investment-interest-on-educational-loantransaction-approval.component';
import { InvestmentMediclaim80DtransactionApprovalComponent } from './investment-mediclaim80-dtransaction-approval/investment-mediclaim80-dtransaction-approval.component';
import { InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent } from './investment-treatment-of-specified-diseasestransaction-approval/investment-treatment-of-specified-diseasestransaction-approval.component';
import { InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent } from './investment-donations-for-ggatransaction-approval/investment-donations-for-scientific-research-ggatransaction-approval.component';
import { InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent } from './investment-donations-for-ggctransaction-approval/investment-donations-for-ggctransaction-approval.component';
import { InvestmentPhysicallyHandicappedtransactionApprovalComponent } from './investment-physically-handicappedtransaction-approval/investment-physically-handicappedtransaction-approval.component';
import { InvestmentHousingLoanMasterApprovalComponent } from './investment-housing-loan-master-approval/investment-housing-loan-master-approval.component';
import { InvestmentHousingloantransactionApprovalComponent } from './investment-housingloantransaction-approval/investment-housingloantransaction-approval.component';
import { InvestmentHouserentmasterApprovalComponent } from './investment-houserentmaster-approval/investment-houserentmaster-approval.component';
import { InvestmentHouserenttransactionApprovalComponent } from './investment-houserenttransaction-approval/investment-houserenttransaction-approval.component';
import { InvestmentChildHostelAllowanceMasterApprovalComponent } from './investment-child-hostel-allowance-master-approval/investment-child-hostel-allowance-master-approval.component';
import { InvestmentChildEducationAllowanceMasterApprovalComponent } from './investment-child-education-allowance-master-approval/investment-child-education-allowance-master-approval.component';

@NgModule({
  declarations: [
    InvestmentApprovalComponent,
    InvestmentMasterApprovalComponent,
    DocumentviewerComponent,
    InvestmentTransactionApprovalComponent,
    InvestmentOnetimetransactionApprovalComponent,
    InvestmentHandicappeddependentmasterApprovalComponent,
    InvestmentIntereston80TTATTBMasterApprovalComponent,
    InvestmentInterestOnEducationalLoanMasterApprovalComponent,
    InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent,
    InvestmentMediclaim80DMasterApprovalComponent,
    InvestmentTreatmentOfSpecifiedDiseasesMasterApprovalComponent,
    InvestmentHandicappedDependenttransactionApprovalComponent,
    InvestmentInterestOn80TTATTBTransactionApprovalComponent,
    InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent,
    InvestmentInterestOnEducationalLoantransactionApprovalComponent,
    InvestmentMediclaim80DtransactionApprovalComponent,
    InvestmentTreatmentOfSpecifiedDiseasestransactionApprovalComponent,
    InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent,
    InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent,
    InvestmentPhysicallyHandicappedtransactionApprovalComponent,
    InvestmentHousingLoanMasterApprovalComponent,
    InvestmentHousingloantransactionApprovalComponent,
    InvestmentHouserentmasterApprovalComponent,
    InvestmentHouserenttransactionApprovalComponent,
    InvestmentChildHostelAllowanceMasterApprovalComponent,
    InvestmentChildEducationAllowanceMasterApprovalComponent
  ],
  imports: [
    CommonModule,
    InvestmentApprovalRoutingModule,
    SharedlayoutModule,
    TableModule,
    MultiSelectModule,
  ],
})
export class InvestmentApprovalModule {}
