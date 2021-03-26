import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { InterestOnTtaService } from '../../../VI-A/interest-on-tta/interest-on-tta.service';
import { InterestOnTtbService } from '../interest-on-ttb.service';

@Component({
  selector: 'app-interest-on-ttb-summary',
  templateUrl: './interest-on-ttb-summary.component.html',
  styleUrls: ['./interest-on-ttb-summary.component.scss']
})
export class InterestOnTtbSummaryComponent implements OnInit {

  @Input() bankName: string;
  @Input() accountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() accountNo = new EventEmitter<any>();

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
  public selectedbankName: string;

  // public previousEmployerB: string;
  public limit : number;
  public benefitActualAmount : number;
  public benefitDeclaredAmount : number;
  public DeclaredAmountBenefit : number;
  public ActualAmountBenefit : number;

  constructor(
    private service: MyInvestmentsService,
    private interestOnTtbService: InterestOnTtbService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }


  public ngOnInit(): void {
    this.summaryPage();
  }
  redirectToDeclarationActual(bankName: string, accountNumber: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      bankName : bankName,
      accountNumber : accountNumber,
      tabIndex : this.tabIndex,
      canEdit: (mode == 'edit' ? true : false)};
    this.bankName = bankName;
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
    this.interestOnTtbService.get80TTBSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].interestOnSavingDeposit80TTTransactionList.interestOnSavingDeposit80TTTransactionList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.limit = res.data.results[0].limit;
      this.benefitActualAmount = res.data.results[0].benefitActualAmount;
      this.benefitDeclaredAmount = res.data.results[0].benefitDeclaredAmount;
      this.onChangeLimit();
    });
  }

  onChangeLimit() {
    this.benefitDeclaredAmount = Math.min(this.totalDeclaredAmount, this.limit);
    this.benefitActualAmount = Math.min(this.totalActualAmount, this.limit);
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitAvailable;
  }
}
