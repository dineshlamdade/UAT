import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { EducationalLoanServiceService } from '../educational-loan-service.service';

@Component({
  selector: 'app-educational-loan-summary',
  templateUrl: './educational-loan-summary.component.html',
  styleUrls: ['./educational-loan-summary.component.scss']
})
export class EducationalLoanSummaryComponent implements OnInit {
  @Input() institution: string;
  @Input() policyNo: string;
  @Output() myEvent = new EventEmitter<any>();

  onEditSummary(institution: string, policyNo: string) {
    this.tabIndex = 2;
    const data = {
      institution: institution,
      policyNo: policyNo,
      tabIndex: this.tabIndex,
    };
    this.institution = institution;
    this.policyNo = policyNo;
    this.myEvent.emit(data);
  }

  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;

  // public previousEmployerB: string;
  public interestOnFutureLoanDeclaredAmount: string;
  public limit  : number;
  public deductionE : number;
  public DeclaredAmountBenefit : number;
  public ActualAmountBenefit : number;
  public benifitDeclared : number;
  public benifitActual : number;
  // public eligibleForDeductionF : number;

  constructor(
    private service: MyInvestmentsService,
    private educationalLoanServiceService: EducationalLoanServiceService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.educationalLoanServiceService.getEducationalLoanSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].educationalSummaryDetails;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.interestOnFutureLoanDeclaredAmount = this.numberFormat.transform(res.data.results[0].interestOnFutureLoanDeclaredAmount);
        this.limit = res.data.results[0].limit;
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.benifitDeclared = res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benifitActual = res.data.results[0].benefitAvailableOnActualAmount;
      this.onChangeLimit();
    });
  }

  // Post New Future Policy Data API call
  public addFuturePolicy(): void {
    this.interestOnFutureLoanDeclaredAmount = this.interestOnFutureLoanDeclaredAmount.toString().replace(',', '');

    const data = {
      futureNewPolicyDeclaredAmount: this. interestOnFutureLoanDeclaredAmount,
    };

    // console.log('addFuturePolicy Data..', data);
    this.educationalLoanServiceService
      .getEducationalLoanSummaryFuturePlan(data)
      .subscribe((res) => {
        //console.log('addFuturePolicy Res..', res);
        if (res.data.length > 0 ){
        this.summaryGridData = res.data.results[0].educationalSummaryDetails;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.interestOnFutureLoanDeclaredAmount = this.numberFormat.transform(
          res.data.results[0].interestOnFutureLoanDeclaredAmount);
      this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      }
      this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');

      });
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {

    this.interestOnFutureLoanDeclaredAmount = this.numberFormat.transform(
      this.interestOnFutureLoanDeclaredAmount
    );
    this.onChangeLimit();
    this.addFuturePolicy();
  }

  jumpToMasterPage(n: number) {
    //console.log(n);
    this.tabIndex = 1;
    //this.editMaster(3);
  }

  // On onEditSummary
  onEditSummary1(institution: string, policyNo: string) {
    this.tabIndex = 2;
    this.institution = institution;
    this.policyNo = policyNo;
    console.log('institution::', institution);
    console.log('policyNo::', policyNo);
  }

  onChangeLimit() {
    this.DeclaredAmountBenefit = Math.min(this.grandTotalDeclaredAmount, this.limit);
    this.ActualAmountBenefit = Math.min(this.grandTotalActualAmount, this.limit);
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitE;
  }
}
