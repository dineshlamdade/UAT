import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { ElectricVehicleService } from '../../electric-vehicle/electric-vehicle.service';
import { Mediclaim80DService } from '../mediclaim80-d.service';

@Component({
  selector: 'app-mediclaim-summary',
  templateUrl: './mediclaim-summary.component.html',
  styleUrls: ['./mediclaim-summary.component.scss']
})
export class MediclaimSummaryComponent implements OnInit {

  @Input() lenderName: string;
  // @Input() loanAccountNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() loanAccountNumber = new EventEmitter<any>();



  public summaryGridData: Array<any> = [];
  public mediclaimPremiumMasterTransactionList : any ;
  public preventiveHealthCheckupMasterTransactionList : any ;
  public medicalExpenseMasterTransactionList : any ;
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

  // public previousEmployerB: string;
  public futureNewPolicyDeclaredAmount: string;
  public limit : number;
  public benefitAvailableOnActualAmount :number;
  public benefitAvailableOnDeclaredAmount : number;
  // public eligibleForDeductionF : number;

  constructor(
    private service: MyInvestmentsService,
    private mediclaim80DService: Mediclaim80DService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }
  onEditSummary(lenderName: string, loanAccountNumber: string) {
    // this.tabIndex = 2;
    // const data = {
    //   lenderName: lenderName,
    //   loanAccountNumber: loanAccountNumber,
    //   tabIndex: this.tabIndex,
    // };
    // this.lenderName = lenderName;
    // this.loanAccountNumber = loanAccountNumber;
    // this.myEvent.emit(data);
  }
  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.mediclaim80DService.getMediclaimSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0];
      this.mediclaimPremiumMasterTransactionList = res.data.results[0].mediclaimPremiumMasterTransactionList;
      this.preventiveHealthCheckupMasterTransactionList = res.data.results[0].preventiveHealthCheckupMasterTransactionList;
      this.medicalExpenseMasterTransactionList = res.data.results[0].medicalExpenseMasterTransactionList;


      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(
        res.data.results[0].interestOnFutureLoanDeclaredAmount
      );
      this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.limit = res.data.results[0].limit;
      this.benefitAvailableOnDeclaredAmount = res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benefitAvailableOnActualAmount = res.data.results[0].benefitAvailableOnActualAmount;
      this.onChangeLimit();
    });
  }



  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(
      this.futureNewPolicyDeclaredAmount
    );
    this.onChangeLimit();

  }

  jumpToMasterPage(loanAccountNumber: string) {
    this.tabIndex = 1;
    const data = {
      number : loanAccountNumber,
      tabIndex : this.tabIndex
    };;
    this.loanAccountNumber.emit(data);
  }

  // On onEditSummary
  // onEditSummary1(lenderName: string) {
  //   this.tabIndex = 2;
  //   this.lenderName = lenderName;
  //   console.log('lenderName::', lenderName);
  // }

  onChangeLimit() {
    this.benefitAvailableOnDeclaredAmount = Math.min(this.grandTotalDeclaredAmount, this.limit);
    this.benefitAvailableOnActualAmount = Math.min(this.grandTotalActualAmount, this.limit);
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitE;
  }

  InfoDialogforSectionEightyEE(){

  }

  InfoDialogforSectionEightyEEA(){}
}
