import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { InterestOnTtaService } from '../interest-on-tta.service';


@Component({
  selector: 'app-interest-on-tta-summary',
  templateUrl: './interest-on-tta-summary.component.html',
  styleUrls: ['./interest-on-tta-summary.component.scss']
})
export class InterestOnTtaSummaryComponent implements OnInit {

  @Input() bankName: string;
  @Input() accountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() policyNumber = new EventEmitter<any>();


  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: number = 0;
  public totalActualAmount: number = 0;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;

  // public previousEmployerB: string;
  public limit : number;
  public benefitActualAmount : number;
  public benefitDeclaredAmount : number;
  public DeclaredAmountBenefit : number;
  public ActualAmountBenefit : number;



  constructor(
    private interestOnTtaService: InterestOnTtaService   ,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }

  // redirect to declarartion page
  redirectToDeclarationActual(bankName: string, accountNumber: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      bankName : bankName,
      accountNumber : accountNumber,
      tabIndex : this.tabIndex,
      canEdit: (mode == 'edit' ? true : false)
    };
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.myEvent.emit(data);
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.interestOnTtaService.get80TTASummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].interestOnSavingDeposit80TTTransactionList.interestOnSavingDeposit80TTTransactionList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.limit = res.data.results[0].limit;
      this.benefitActualAmount = res.data.results[0].benefitActualAmount;
      this.benefitDeclaredAmount = res.data.results[0].benefitDeclaredAmount;
      this.onChangeLimit();
    });
  }

  jumpToMasterPage(accountNumber: string) {
    this.tabIndex = 1;
    const data = {
      number : accountNumber,
      tabIndex : this.tabIndex
    };;
    this.policyNumber.emit(data);
  }

  onChangeLimit() {
    this.benefitDeclaredAmount = Math.min(this.totalDeclaredAmount, this.limit);
    this.benefitActualAmount = Math.min(this.totalActualAmount, this.limit);
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitAvailable;
  }
}
