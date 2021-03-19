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

      onEditSummary(institution: string, policyNo: string) {
        this.tabIndex = 2;
        const data = {
          institution: institution,
          policyNo: policyNo,
          tabIndex: this.tabIndex,
        };
        this.institution = institution;
        this.policyNo = policyNo;
        //console.log('institution::', institution);
        //console.log('policyNo::', policyNo);
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
          this.summaryGridData = res.data.results[0].transactionDetailList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.grandTotalDeclaredAmount =
            res.data.results[0].grandTotalDeclaredAmount;
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
        this.postOfficeTermDepositService
          .postPOTDepositSummaryFuturePolicy(data)
          .subscribe((res) => {
            //console.log('addFuturePolicy Res..', res);
            this.summaryGridData = res.data.results[0].transactionDetailList;
            this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            this.totalActualAmount = res.data.results[0].totalActualAmount;
            this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            this.grandTotalDeclaredAmount =
              res.data.results[0].grandTotalDeclaredAmount;
            this.grandTotalActualAmount =
              res.data.results[0].grandTotalActualAmount;
          });
        this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
      }

      // On Change Future New Policy Declared Amount with formate
      onChangeFutureNewPolicyDeclaredAmount() {
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
    }
