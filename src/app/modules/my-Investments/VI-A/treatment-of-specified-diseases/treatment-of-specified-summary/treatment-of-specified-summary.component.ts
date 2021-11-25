import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { TreatmentOfSpecifiedService } from '../treatment-of-specified.service';

@Component({
  selector: 'app-treatment-of-specified-summary',
  templateUrl: './treatment-of-specified-summary.component.html',
  styleUrls: ['./treatment-of-specified-summary.component.scss']
})
export class TreatmentOfSpecifiedSummaryComponent implements OnInit {
  // @Input() institution: string;
  @Input() patientName: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() specifiedDiseaseMasterId = new EventEmitter<any>();


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
  public selectedInstitution: string;
  public interestOnFutureLoanDeclaredAmount: string;
  public limit  : number;
  public minofTotalAndLimitDeclaredAmountC  : number;
  public minofTotalAndLimitActualAmountC  : number;
  public declaredAmountReceivedFromInsuranceCompany  : number;
  public actualAmountReceivedFromInsuranceCompany  : number;
  public declaredAmountReimbursedByEmployer  : number;
  public actualAmountReimbursedByEmployer  : number;
  public totalDeclaredAmountReceived  : number;
  public totalActualAmountReceived  : number;
  public minofCAndTotalDeclaredAmountReceived  : number;
  public minofCAndTotalActualAmountReceived  : number;
  public benefitAvailableOnDeclaredAmount  : number;
  public benefitAvailableOnActualAmount  : number;

  constructor(
    private service: MyInvestmentsService,
    private treatmentOfSpecifiedService: TreatmentOfSpecifiedService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }

  redirectToDeclarationActual(
    patientName: string,
    mode: string
  ) {
    this.tabIndex = 2;
    const data = {
      patientName: patientName,
      tabIndex: this.tabIndex,
      canEdit: mode == 'edit' ? true : false,
    };
    this.patientName = patientName;
    this.myEvent.emit(data);
  }

  jumpToMasterPage(patientName: string) {
    this.tabIndex = 1;
    const specifiedDiseaseMasterId = {
      patientName: patientName,
      tabIndex: this.tabIndex,
    };
    this.specifiedDiseaseMasterId.emit(specifiedDiseaseMasterId);
  }



  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.treatmentOfSpecifiedService.getSpecifiedSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].specifiedDiseaseSummaryDetails;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.limit = res.data.results[0].limit;
      this.minofTotalAndLimitDeclaredAmountC = res.data.results[0].minofTotalAndLimitDeclaredAmountC;
      this.minofTotalAndLimitActualAmountC = res.data.results[0].minofTotalAndLimitActualAmountC;
      this.declaredAmountReceivedFromInsuranceCompany = res.data.results[0].declaredAmountReceivedFromInsuranceCompany;
      this.actualAmountReceivedFromInsuranceCompany = res.data.results[0].actualAmountReceivedFromInsuranceCompany;
      this.declaredAmountReimbursedByEmployer = res.data.results[0].declaredAmountReimbursedByEmployer;
      this.actualAmountReimbursedByEmployer = res.data.results[0].actualAmountReimbursedByEmployer;
      this.totalDeclaredAmountReceived = res.data.results[0].totalDeclaredAmountReceived;
      this.totalActualAmountReceived = res.data.results[0].totalActualAmountReceived;
      this.minofCAndTotalDeclaredAmountReceived = res.data.results[0].minofCAndTotalDeclaredAmountReceived;
      this.minofCAndTotalActualAmountReceived = res.data.results[0].minofCAndTotalActualAmountReceived;
      this.benefitAvailableOnDeclaredAmount = res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benefitAvailableOnActualAmount = res.data.results[0].benefitAvailableOnActualAmount;
      // this.onChangeLimit();
    });
  }


  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {

    this.interestOnFutureLoanDeclaredAmount = this.numberFormat.transform(
      this.interestOnFutureLoanDeclaredAmount
    );
    // this.onChangeLimit();
    // this.addFuturePolicy();
  }


}

