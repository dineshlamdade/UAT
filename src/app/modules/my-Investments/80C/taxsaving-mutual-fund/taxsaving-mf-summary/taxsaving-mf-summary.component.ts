import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';

@Component({
  selector: 'app-taxsaving-mf-summary',
  templateUrl: './taxsaving-mf-summary.component.html',
  styleUrls: ['./taxsaving-mf-summary.component.scss'],
})
export class TaxsavingMfSummaryComponent implements OnInit {
  @Input() institution: string;
  @Input() accountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() accountNo = new EventEmitter<any>();

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
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService,
    ) { }

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
      canEdit: (mode == 'edit' ? true : false)};
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
        this.service.getELSSSummary().subscribe((res) => {
          this.summaryGridData = res.data.results[0].transactionDetailList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
          this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
           console.log(res);
        });
      }

    // Post New Future Policy Data API call
      public addFuturePolicy(): void {

        const data = {
            futureNewPolicyDeclaredAmount : this.futureNewPolicyDeclaredAmount,
        };

        this.service.submitELSSSummaryFuturePolicy(data).subscribe((res) => {
            this.summaryGridData = res.data.results[0].transactionDetailList;
            this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            this.totalActualAmount = res.data.results[0].totalActualAmount;
            this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });

        this.alertService.sweetalertMasterSuccess("Future Amount was saved","");
      }

  // On Change Future New Policy Declared Amount with formate
    onChangeFutureNewPolicyDeclaredAmount() {
      this.futureNewPolicyDeclaredAmount = this.futureNewPolicyDeclaredAmount;
      this.addFuturePolicy();
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
