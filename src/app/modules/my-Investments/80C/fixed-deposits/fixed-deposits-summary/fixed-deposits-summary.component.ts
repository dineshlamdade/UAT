import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { FixedDepositsService } from '../fixed-deposits.service';

@Component({
  selector: 'app-fixed-deposits-summary',
  templateUrl: './fixed-deposits-summary.component.html',
  styleUrls: ['./fixed-deposits-summary.component.scss']
})
export class FixedDepositsSummaryComponent implements OnInit {
  @Input() institution: string;
  @Input() accountNumber: string;
  @Output() myEvent = new EventEmitter<any>();

  onEditSummary(institution: string, accountNumber: string) {
    this.tabIndex = 2;
    const data = {
      institution: institution,
      accountNumber: accountNumber,
      tabIndex: this.tabIndex,
    };
    this.institution = institution;
    this.accountNumber = accountNumber;

    this.myEvent.emit(data);
  }

  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public futureNewPolicyDeclaredAmount: string;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;

  constructor(
    private service: MyInvestmentsService,
    private fixedDepositsService:FixedDepositsService,
    private alertService: AlertServiceService
  ) {}

  public ngOnInit(): void {
    // Summary get Call on Page Load
    this.summaryPage();
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.fixedDepositsService.getFDSummary().subscribe((res) => {
      // if (res.data.results.length > 0) {
        this.summaryGridData = res.data.results[0].transactionDetailList;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
        this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        console.log(res);
      // }
    });
  }


  // Post New Future Policy Data API call
  public addFuturePolicy(): void {
    const data = {
      futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount,
    };

    //console.log('addFuturePolicy Data..', data);
    this.fixedDepositsService
      .getFDSummaryFuturePolicy(data)
      .subscribe((res) => {
        // if (res.data.length > 0 ) {
          //console.log('addFuturePolicy Res..', res);
          this.summaryGridData = res.data.results[0].transactionDetailList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        // }
        this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
      });
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.addFuturePolicy();
    console.log(this.addFuturePolicy)
  }

  jumpToMasterPage(n: number) {
    //console.log(n);
    this.tabIndex = 1;
    //this.editMaster(3);
  }

  // On onEditSummary
  onEditSummary1(institution: string, accountNumber: string) {
    this.tabIndex = 2;
    this.institution = institution;
    this.accountNumber = accountNumber;
    console.log('institution::', institution);
    console.log('accountNumber::', accountNumber);
  }
}

