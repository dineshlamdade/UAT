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
  @Input() lenderName: string;
  @Input() loanAccountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() loanAccountNo = new EventEmitter<any>();

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
  public selectedlenderName: string;
  public interestOnFutureLoanDeclaredAmount: 0;
  public futureGlobalPolicyDeclaredAmount: 0;
  public limit  : number;
  public deductionE : number;
  public DeclaredAmountBenefit : number;
  public ActualAmountBenefit : number;
  public benifitDeclared : number;
  public benifitActual : number;
  public tempFlag : boolean;
  public benefitAvailableOnActualAmount :number;
  public benefitAvailableOnDeclaredAmount : number;

  constructor(
    private service: MyInvestmentsService,
    private educationalLoanServiceService: EducationalLoanServiceService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }



  redirectToDeclarationActual(lenderName: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      lenderName : lenderName,
      tabIndex : this.tabIndex,
      canEdit: (mode == 'edit' ? true : false)};
    this.lenderName = lenderName;
    this.myEvent.emit(data);
  }

  jumpToMasterPage(loanAccountNumber: string) {
    this.tabIndex = 1;
    const loanAccountNo = {
      loanAccountNumber : loanAccountNumber,
      tabIndex : this.tabIndex,
    };
    this.loanAccountNo.emit(loanAccountNo);
  }

  // ---------------------Summary ----------------------
    // Summary get Call
    summaryPage() {
      this.educationalLoanServiceService.getEducationalLoanSummary().subscribe((res) => {
        this.summaryGridData = res.data.results[0].educationalSummaryDetails;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.interestOnFutureLoanDeclaredAmount = res.data.results[0].interestOnFutureLoanDeclaredAmount;
        this.futureGlobalPolicyDeclaredAmount = res.data.results[0].interestOnFutureLoanDeclaredAmount;
        this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        this.limit = res.data.results[0].limit;
        this.benefitAvailableOnDeclaredAmount = res.data.results[0].benefitAvailableOnDeclaredAmount;
        this.benefitAvailableOnActualAmount = res.data.results[0].benefitAvailableOnActualAmount;
        this.onChangeLimit();
      });
    }

     // Post New Future Policy Data API call
    public addFuturePolicy(): void {
      const data = {
        futureNewPolicyDeclaredAmount: this.interestOnFutureLoanDeclaredAmount,
      };

      console.log('addFuturePolicy Data..', data);
      this.educationalLoanServiceService
      .getEducationalLoanSummaryFuturePlan(data)
      .subscribe((res) => {
        //console.log('addFuturePolicy Res..', res);
        // if (res.data.length > 0 ){
        this.summaryGridData = res.data.results[0].educationalSummaryDetails;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.interestOnFutureLoanDeclaredAmount = res.data.results[0].interestOnFutureLoanDeclaredAmount;
        this.futureGlobalPolicyDeclaredAmount = res.data.results[0].interestOnFutureLoanDeclaredAmount;
        this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        this.limit = res.data.results[0].limit;
      // }
    });
    this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
  }


      // On Change Future New Policy Declared Amount with formate
      onChangeFutureNewPolicyDeclaredAmount() {
        this.interestOnFutureLoanDeclaredAmount = this.interestOnFutureLoanDeclaredAmount;
        if (this.interestOnFutureLoanDeclaredAmount > 0) {
        this.addFuturePolicy();
      }else if(this.interestOnFutureLoanDeclaredAmount <0) {
        this.interestOnFutureLoanDeclaredAmount = this.futureGlobalPolicyDeclaredAmount;
      }
      this.onChangeLimit();
    }



    onChangeLimit() {
      this.benefitAvailableOnDeclaredAmount = Math.min(this.grandTotalDeclaredAmount, this.limit);
      this.benefitAvailableOnActualAmount = Math.min(this.grandTotalActualAmount, this.limit);
      // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitE;
    }

    keyPressedSpaceNotAllow(event: any) {
      console.log('HI ');
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.key);

      if (!pattern.test(inputChar)) {
        // this.futureNewPolicyDeclaredAmount = 0;
        this.tempFlag = true;
        // invalid character, prevent input
        event.preventDefault();
      } else {
        this.tempFlag = false;
      }
    }

  }
