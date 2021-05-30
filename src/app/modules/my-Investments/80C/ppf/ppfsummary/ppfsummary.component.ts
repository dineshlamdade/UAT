import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NumberFormatPatternService } from '../../../../..//core/services/number-format-pattern.service';
import { Renderer2 } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';

@Component({
  selector: 'app-ppfsummary',
  templateUrl: './ppfsummary.component.html',
  styleUrls: ['./ppfsummary.component.scss'],
})
export class PPFSummaryComponent implements OnInit {

 

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

      @Input() institution: string;
      @Input() accountNumber: string;
      @Output() myEvent = new EventEmitter<any>();
      @Output() accountNo = new EventEmitter<any>();

  constructor(
    private service: MyInvestmentsService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService,
    ) { }

  public ngOnInit(): void {
    // Summary get Call on Page Load
    this.summaryPage();

  }

  redirectToDeclarationActual(
    institution: string, 
    accountNumber: string, 
    mode: string
    ) {
    
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
      tabIndex : this.tabIndex
    };;
    this.accountNo.emit(accountNo);
  }

  // ---------------------Summary ----------------------
    // Summary get Call
      summaryPage() {
        this.service.getPPFSummary().subscribe((res) => {
          this.summaryGridData = res.data.results[0].transactionDetailList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
          //  console.log(res);
        
        });
      }

    // Post New Future Policy Data API call
      public addFuturePolicy(): void {

        const data = {
            futureNewPolicyDeclaredAmount : this.futureNewPolicyDeclaredAmount,
        };

        console.log('addFuturePolicy Data..', data);
        this.service.submitPPFSummaryFuturePolicy(data).subscribe((res) => {
            this.summaryGridData = res.data.results[0].transactionDetailList;
            this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            this.totalActualAmount = res.data.results[0].totalActualAmount;
            this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });

        this.alertService.sweetalertMasterSuccess("Future Amount saved","");
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
