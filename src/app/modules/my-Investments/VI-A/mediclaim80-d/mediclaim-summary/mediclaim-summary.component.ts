import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { ElectricVehicleService } from '../../electric-vehicle/electric-vehicle.service';
import { Mediclaim80DService } from '../mediclaim80-d.service';

@Component({
  selector: 'app-mediclaim-summary',
  templateUrl: './mediclaim-summary.component.html',
  styleUrls: ['./mediclaim-summary.component.scss'],
})
export class MediclaimSummaryComponent implements OnInit {
  @Input() lenderName: string;
  // @Input() loanAccountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() loanAccountNumber = new EventEmitter<any>();

  public summaryGridData: Array<any> = [];
  public mediclaimPremiumMasterTransactionList: any;
  public preventiveHealthCheckupMasterTransactionList: any;
  public medicalExpenseMasterTransactionList: any;
  public mediclaimSummaryComputationDeclaed: any;

  public tabIndex = 0;

  public totalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;
  public totalDeclaredAmount: number;
  public totalExpenditureOfSelfSpouseChildrenWithoutParents: number;
  public totalExpenditureOfSelfSpouseChildrenWithParents: number;
  public totalExpenditureOfHealthCheckup: number;
  public totalExpenditure: number;
  public grandTotalDeclaredAmount: number;
  public limitOfSelfSpouseChildrenNonSeniorCitizen: number;
  public limitOfSelfSpouseChildrenSeniorCitizen: number;
  public limitOfParentsNonSeniorCitizen: number;
  public limitOfParentsSeniorCitizen: number;
  public limitOfHealthCheckup: number;
  public totalLimit: number;
  public totalBenefitOfSelfSpouseChildrenWithoutParents: number;
  public totalBenefitOfOnlyParents: number;
  public totalBenefitOfSelfSpouseChildrenWithParents: number;
  public totalBenefit: number;

  public grandTotalActualAmount: number;



  // public previousEmployerB: string;
  public futureNewPolicyDeclaredAmount: string;
  public limit: number;
  public benefitAvailableOnActualAmount: number;
  public benefitAvailableOnDeclaredAmount: number;
  public mediclaimSummaryComputationDeclared: any;
  public mediclaimSummaryComputationActual: any;

  constructor(
    private service: MyInvestmentsService,
    private mediclaim80DService: Mediclaim80DService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {}

  public ngOnInit(): void {
    this.summaryPage();
  }
  onEditSummary(lenderName: string, loanAccountNumber: string) {
    // this.tabIndex = 2;
    // const data = {
    //   lenderName: lenderName,
    //   loanAccountNumber: loanAccountNumber,
    //   tabIndex: this.tabIndex,
    // };
    // this.lenderName = lenderName;
    // this.loanAccountNumber = loanAccountNumber;
    // this.myEvent.emit(data);
  }
  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.mediclaim80DService.getMediclaimSummary().subscribe((res) => {

      console.log(res);
      if(res.data.results.length > 0){
      this.summaryGridData = res.data.results[0];
      this.mediclaimPremiumMasterTransactionList =
        res.data.results[0].mediclaimPremiumMasterTransactionList;
      this.preventiveHealthCheckupMasterTransactionList =
        res.data.results[0].preventiveHealthCheckupMasterTransactionList;
      this.medicalExpenseMasterTransactionList =
        res.data.results[0].medicalExpenseMasterTransactionList;
      this.mediclaimSummaryComputationDeclaed =
        res.data.results[0].mediclaimSummaryComputationDeclaed;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.limit = res.data.results[0].limit;
      this.benefitAvailableOnDeclaredAmount =
        res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benefitAvailableOnActualAmount =
        res.data.results[0].benefitAvailableOnActualAmount;
      this.mediclaimSummaryComputationDeclared =
        res.data.results[0].mediclaimSummaryComputationDeclared;
      this.mediclaimSummaryComputationActual = res.data.results[0].mediclaimSummaryComputationActual;
      this.totalExpenditureOfSelfSpouseChildrenWithoutParents =
      res.data.results[0].totalExpenditureOfSelfSpouseChildrenWithoutParents;
      this.totalExpenditureOfSelfSpouseChildrenWithParents =
      res.data.results[0]. totalExpenditureOfSelfSpouseChildrenWithParents;
      this.totalExpenditureOfHealthCheckup =
      res.data.results[0].totalExpenditureOfHealthCheckup;
      this.totalExpenditure =
      res.data.results[0]. totalExpenditure;
      this.limitOfSelfSpouseChildrenNonSeniorCitizen =
      res.data.results[0]. limitOfSelfSpouseChildrenNonSeniorCitizen;
      this.limitOfSelfSpouseChildrenSeniorCitizen =
      res.data.results[0]. limitOfSelfSpouseChildrenSeniorCitizen;
      this.limitOfParentsNonSeniorCitizen =
      res.data.results[0]. limitOfParentsNonSeniorCitizen;
      this.limitOfParentsSeniorCitizen =
      res.data.results[0]. limitOfParentsSeniorCitizen;
      this.limitOfHealthCheckup =
      res.data.results[0]. limitOfHealthCheckup;
      this.totalLimit =
      res.data.results[0]. totalLimit;
      this.totalBenefitOfSelfSpouseChildrenWithoutParents =
      res.data.results[0]. totalBenefitOfSelfSpouseChildrenWithoutParents;
      this.totalBenefitOfOnlyParents =
      res.data.results[0]. totalBenefitOfOnlyParents;
      this.totalBenefitOfSelfSpouseChildrenWithParents =
      res.data.results[0]. totalBenefitOfSelfSpouseChildrenWithParents;
      this.totalBenefit =
      res.data.results[0]. totalBenefit;


      this.onChangeLimit();
    }
    });
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(
      this.futureNewPolicyDeclaredAmount
    );
    this.onChangeLimit();
  }

  jumpToMasterPage(loanAccountNumber: string) {
    this.tabIndex = 1;
    const data = {
      number: loanAccountNumber,
      tabIndex: this.tabIndex,
    };
    this.loanAccountNumber.emit(data);
  }

  onChangeLimit() {
    this.benefitAvailableOnDeclaredAmount = Math.min(
      this.grandTotalDeclaredAmount,
      this.limit
    );
    this.benefitAvailableOnActualAmount = Math.min(
      this.grandTotalActualAmount,
      this.limit
    );
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitE;
  }

  redirectToDeclarationActual() {}

  InfoDialogforSectionEightyEE() {}

  InfoDialogforSectionEightyEEA() {}
}
