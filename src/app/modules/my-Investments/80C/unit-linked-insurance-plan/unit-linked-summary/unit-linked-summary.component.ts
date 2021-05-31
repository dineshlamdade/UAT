import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { UnitLinkedInsurancePlanService } from '../unit-linked-insurance-plan.service';


@Component({
  selector: 'app-unit-linked-summary',
  templateUrl: './unit-linked-summary.component.html',
  styleUrls: ['./unit-linked-summary.component.scss']
})
export class UnitLinkedSummaryComponent implements OnInit {


  @Input() institution: string;
  @Input() accountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() accountNo = new EventEmitter<any>();

  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public futureNewPolicyDeclaredAmount: 0
  public futureGlobalPolicyDeclaredAmount: 0
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;
  public tempFlag: boolean;

  constructor(
    private service: MyInvestmentsService,
    private unitLinkedInsurancePlanService : UnitLinkedInsurancePlanService,


    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {}

  public ngOnInit(): void {
    // Summary get Call on Page Load
    this.summaryPage();
  }

  redirectToDeclarationActual(institution: string, accountNumber: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      institution : institution,
      accountNumber : accountNumber,
      tabIndex : this.tabIndex,
      canEdit: (mode == 'edit' ? true : false),
      canView: (mode == 'view' ? true : false),
    };
    this.institution = institution;
    this.accountNumber = accountNumber;
    this.myEvent.emit(data);
  }

  jumpToMasterPage(accountNumber: string) {
    this.tabIndex = 1;
    const accountNo = {
      accountNumber : accountNumber,
      tabIndex : this.tabIndex,
    };
    this.accountNo.emit(accountNo);
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.unitLinkedInsurancePlanService.getULIPSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].transactionDetailList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      this.futureNewPolicyDeclaredAmount =res.data.results[0].futureNewPolicyDeclaredAmount;
      this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      console.log(res);
    });
  }

  // Post New Future Policy Data API call
  public addFuturePolicy(): void {

    const data = {
      futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount,
    };

    //console.log('addFuturePolicy Data..', data);
    this.unitLinkedInsurancePlanService.getULIPSummaryFuturePlan(data).subscribe((res) => {
        //console.log('addFuturePolicy Res..', res);
        this.summaryGridData = res.data.results[0].transactionDetailList;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.futureNewPolicyDeclaredAmount =res.data.results[0].futureNewPolicyDeclaredAmount;
        this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
        this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
      });

  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.futureNewPolicyDeclaredAmount = this.futureNewPolicyDeclaredAmount;
    if (this.futureNewPolicyDeclaredAmount >= 0) {
    this.addFuturePolicy();
  }else if(this.futureNewPolicyDeclaredAmount <0) {
    this.futureNewPolicyDeclaredAmount = this.futureGlobalPolicyDeclaredAmount;
  }
  }


  // On onEditSummary
  // onEditSummary1(institution: string, policyNo: string) {
  //   this.tabIndex = 2;
  //   this.institution = institution;
  //   this.policyNo = policyNo;
  //   console.log('institution::', institution);
  //   console.log('policyNo::', policyNo);
  // }
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

