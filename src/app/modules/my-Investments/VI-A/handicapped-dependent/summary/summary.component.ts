import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { NpsService } from '../../nps/nps.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() familyMemberName: string;
  @Input() disablityType: string;
  @Output() myEvent = new EventEmitter<any>();

  onEditSummary(familyMemberName: string, disablityType: string) {
    this.tabIndex = 2;
    const data = {
      familyMemberName: familyMemberName,
      disablityType: disablityType,
      tabIndex: this.tabIndex,
    };
    this.familyMemberName = familyMemberName;
    this.disablityType = disablityType;
    this.myEvent.emit(data);
  }

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

  // public previousEmployerB: string;
  public limitB : number;
  public benefitAvailable : number;


  constructor(
    private service: MyInvestmentsService,
    private npsService: NpsService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.npsService.getNpsSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].transactionDetailList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;

      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.onNPSChangeLimit();
    });
  }

  // Post New Future Policy Data API call
  // public addFuturePolicy(): void {
  //   this.futureNewPolicyDeclaredAmount = this.futureNewPolicyDeclaredAmount.toString().replace(',', '');
  //   const data = {
  //     futureNewPolicyDeclaredAmount: this. futureNewPolicyDeclaredAmount,
  //   };

  //   console.log('addFuturePolicy Data..', data);
  //   this.npsService
  //     .getNpsSummaryFuturePlan(data)
  //     .subscribe((res) => {
  //       //console.log('addFuturePolicy Res..', res);
  //       this.summaryGridData = res.data.results[0].transactionDetailList;
  //       this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
  //       this.totalActualAmount = res.data.results[0].totalActualAmount;
  //       this.grandTotalDeclaredAmount =
  //       res.data.results[0].grandTotalDeclaredAmount;
  //     this.grandTotalActualAmount =
  //       res.data.results[0].grandTotalActualAmount;
  //     // this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');

  //     });
  // }

  // On Change Future New Policy Declared Amount with formate
  // onChangeFutureNewPolicyDeclaredAmount() {

  //   this.onNPSChangeLimit();
  //   this.addFuturePolicy();
  // }

  jumpToMasterPage(n: number) {
    //console.log(n);
    this.tabIndex = 1;
    //this.editMaster(3);
  }

  // On onEditSummary
  onEditSummary1(familyMemberName: string, disablityType: string) {
    this.tabIndex = 2;
    this.familyMemberName = familyMemberName;
    this.disablityType = disablityType;
    console.log('familyMemberName::', familyMemberName);
    console.log('disablityType::', disablityType);
  }

  onNPSChangeLimit() {
    this.benefitAvailable = Math.min(this.totalDeclaredAmount, this.limitB);
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitAvailable;
  }
}
