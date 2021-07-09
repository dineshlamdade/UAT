import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { PostOfficeTermDepositService } from '../post-office-term-deposit.service';

@Component({
  selector: 'app-post-office-term-deposit-summary',
  templateUrl: './post-office-term-deposit-summary.component.html',
  styleUrls: ['./post-office-term-deposit-summary.component.scss']
})
export class PostOfficeTermDepositSummaryComponent implements OnInit {

      @Input() institution: string;
      @Input() policyNo: string;
      @Output() myEvent = new EventEmitter<any>();
  accountNumber: string;

      onEditSummary(institution: string, accountNumber: string,  mode: string) {
        this.tabIndex = 2;
        const data = {
          institution: institution,
          accountNumber: accountNumber,
          tabIndex: this.tabIndex,
          canEdit: (mode == 'edit' ? true : false),
          canView: (mode == 'view' ? true : false),
        };
        this.institution = institution;
        this.accountNumber = accountNumber;
        //console.log('institution::', institution);
        //console.log('policyNo::', policyNo);
        this.myEvent.emit(data);
      }
      onViewSummary(institution: string, accountNumber: string,  mode: string) {
        this.tabIndex = 2;
        const data = {
          institution: institution,
          accountNumber: accountNumber,
          tabIndex: this.tabIndex,
          canEdit: (mode == 'edit' ? true : false),
          canView: (mode == 'view' ? true : false),
        };
        this.institution = institution;
        this.accountNumber = accountNumber;
    
        this.myEvent.emit(data);
      }
    

      public summaryGridData: Array<any> = [];
      public tabIndex = 0;
      public totalDeclaredAmount: any;
      public totalActualAmount: any;
      public futureNewPolicyDeclaredAmount: 0;
      public futureGlobalPolicyDeclaredAmount : 0;
      public tempFlag : boolean;
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
       private postOfficeTermDepositService : PostOfficeTermDepositService,
        private numberFormat: NumberFormatPipe,
        private alertService: AlertServiceService
      ) {}

      public ngOnInit(): void {
        // Summary get Call on Page Load
        this.summaryPage();
      }

      // ---------------------Summary ----------------------
      // Summary get Call
      summaryPage() {
        this.postOfficeTermDepositService.getPOTDepositSummary().subscribe((res) => {
          if (res.data.results.length > 0) {
          this.summaryGridData = res.data.results[0].transactionDetailList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.grandTotalDeclaredAmount =
            res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
          console.log(res);
          }
        });
      }

      // Post New Future Policy Data API call
      public addFuturePolicy(): void {

        const data = {
          futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount,
        };

        //console.log('addFuturePolicy Data..', data);
        this.postOfficeTermDepositService
          .postPOTDepositSummaryFuturePolicy(data)
          .subscribe((res) => {
            //console.log('addFuturePolicy Res..', res);
            if (res.data.results.length > 0) {
            this.summaryGridData = res.data.results[0].transactionDetailList;
            this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            this.totalActualAmount = res.data.results[0].totalActualAmount;
            this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            this.grandTotalDeclaredAmount =
              res.data.results[0].grandTotalDeclaredAmount;
            this.grandTotalActualAmount =
              res.data.results[0].grandTotalActualAmount;
            }
          });
        this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
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
      this.futureNewPolicyDeclaredAmount = 0;
      this.tempFlag = true;
      // invalid character, prevent input
      event.preventDefault();
    } else {
      this.tempFlag = false;
    }
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
        this.policyNo = accountNumber;
        console.log('institution::', institution);
        console.log('policyNo::', accountNumber);
      }
      // On onEditSummary
   onViewSummary1(institution: string, accountNumber: string) {
    this.tabIndex = 2;
    this.institution = institution;
    this.accountNumber = accountNumber;
    console.log('institution::', institution);
    console.log('accountNumber::', accountNumber);
  }
}
    
