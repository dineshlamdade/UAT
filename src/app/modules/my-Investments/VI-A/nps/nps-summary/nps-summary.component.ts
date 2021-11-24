import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { NpsService } from '../nps.service';

@Component({
  selector: 'app-nps-summary',
  templateUrl: './nps-summary.component.html',
  styleUrls: ['./nps-summary.component.scss'],
})
export class NpsSummaryComponent implements OnInit {
  @Input() institution: string;
  @Input() accountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() accountNo = new EventEmitter<any>();

  public summaryGridData: Array<any> = [];
  public nps80CCSummaryGridData: Array<any> = [];
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
  public tempFlag: boolean;
  public futureNewPolicyDeclaredAmount: 0
  public futureGlobalPolicyDeclaredAmount: 0
  // public previousEmployerB: string;
  // public futureNewPolicyDeclaredAmount: string;
  public limitD: number = 50000;
  public deductionEDeclared: number;
  public minAmt: number;
  public minAmtActual: number;
  limit80CCD1: any;
  
  public eligibleForDeductionFDeclared: number;
  public minAmtEligibleForDeductionFDeclared: number;
  
  public deductionEActual: number;
  public eligibleForDeductionFActual: number;
  minAmtEligibleForDeductionFActual: number;
  constructor(
    private service: MyInvestmentsService,
    private npsService: NpsService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {}

  public ngOnInit(): void {
    this.summaryPage();
    this.nps80CCSummaryGetPage();
  }
  redirectToDeclarationActual(
    institution: string,
    accountNumber: string,
    mode: string
  ) {
    this.tabIndex = 2;
    const data = {
      institution: institution,
      accountNumber: accountNumber,
      tabIndex: this.tabIndex,
      canEdit: mode == 'edit' ? true : false,
      canView: mode == 'view' ? true : false,
    };
    this.institution = institution;
    this.accountNumber = accountNumber;
    this.myEvent.emit(data);
  }

  jumpToMasterPage(accountNumber: string) {
    this.tabIndex = 1;
    const accountNo = {
      accountNumber: accountNumber,
      tabIndex: this.tabIndex,
    };
    this.accountNo.emit(accountNo);
  }
  // ---------------------Summary ----------------------
  nps80CCSummaryGetPage() {
    this.npsService.getEmployeeNPSCCD1().subscribe((res) => {
      this.nps80CCSummaryGridData = res.data.results[0];
      console.log("this.nps80CCSummaryGridData", this.nps80CCSummaryGridData );
    });
  }

  // Summary get Call
  summaryPage() {
    this.npsService.getNpsSummary().subscribe((res) => {
      if(res.data.results.length > 0){
      this.summaryGridData = res.data.results[0].transactionDetailList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.onChangeLimit();
      this.minOfCandG();
    }
    });
  }


  // Post New Future Policy Data API call
  public addFuturePolicy(): void {
    const data = {
      futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount,
    };

    this.npsService.getNpsSummaryFuturePlan(data).subscribe((res) => {
      this.summaryGridData = res.data.results[0].transactionDetailList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.onChangeLimit();
      this.minOfCandG();
      this.alertService.sweetalertMasterSuccess('Future Amount was saved.', '');
    });
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.futureNewPolicyDeclaredAmount = this.futureNewPolicyDeclaredAmount;
    if (this.futureNewPolicyDeclaredAmount > 0) {
    this.addFuturePolicy();
  }else if(this.futureNewPolicyDeclaredAmount <0) {
    this.futureNewPolicyDeclaredAmount = this.futureGlobalPolicyDeclaredAmount;
  }
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

  onChangeLimit() {
    this.deductionEDeclared = Math.min(this.grandTotalDeclaredAmount, this.limitD);
    this.eligibleForDeductionFDeclared =
      this.grandTotalDeclaredAmount - this.deductionEDeclared;

      this.deductionEActual = Math.min(this.grandTotalActualAmount, this.limitD);
      this.eligibleForDeductionFActual =
        this.grandTotalDeclaredAmount - this.deductionEActual;
    
  }

  minOfCandG() {
    this.minAmt = Math.min(this.grandTotalDeclaredAmount, this.nps80CCSummaryGridData[0].limit80CCD1);
    this.minAmtEligibleForDeductionFDeclared = this.grandTotalDeclaredAmount, this.minAmt;

      this.minAmtActual = Math.min(this.grandTotalActualAmount, this.nps80CCSummaryGridData[0].limit80CCD1);
      this.minAmtEligibleForDeductionFActual =this.minAmtActual;
    console.log("limit80CCD1",this.limit80CCD1);
    console.log("minAmt",this.minAmt);
      console.log("minAmtEligibleForDeductionFDeclared", this.minAmtEligibleForDeductionFDeclared)
  }
}
