import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { GgaService } from '../gga.service';

@Component({
  selector: 'app-gga-summary',
  templateUrl: './gga-summary.component.html',
  styleUrls: ['./gga-summary.component.scss'],
})
export class GgaSummaryComponent implements OnInit {
  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public futureDonationsDeclaredAmount: 0;
  public futureGlobalPolicyDeclaredAmount: 0;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;
  public benefitAvailableOnActualAmount: number;
  public benefitAvailableOnDeclaredAmount: number;
  public tempFlag: boolean;

  @Input() institution: string;
  @Input() policyNo: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() policyNumber = new EventEmitter<any>();

  constructor(
    private ggaService: GgaService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {}

  public ngOnInit(): void {
    // Summary get Call on Page Load
    this.summaryPage();
  }

  redirectToDeclarationActual(
    institution: string,
    policyNo: string,
    mode: string
  ) {
    this.tabIndex = 2;
    const data = {
      institution: institution,
      policyNo: policyNo,
      tabIndex: this.tabIndex,
      canEdit: mode == 'edit' ? true : false,
    };
    this.institution = institution;
    this.policyNo = policyNo;
    //console.log('institution::', institution);
    //console.log('policyNo::', policyNo);
    this.myEvent.emit(data);
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.ggaService.get80GGASummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].donations80GGTransactionList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureDonationsDeclaredAmount =
        res.data.results[0].futureDonationsDeclaredAmount;
      this.futureGlobalPolicyDeclaredAmount =
        res.data.results[0].futureDonationsDeclaredAmount;
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.benefitAvailableOnDeclaredAmount =
        res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benefitAvailableOnActualAmount =
        res.data.results[0].benefitAvailableOnActualAmount;
      // console.log(res);
    });
  }

  // Post New Future Policy Data API call
  public addFuturePolicy(): void {
    const data = {
      futureNewPolicyDeclaredAmount: this.futureDonationsDeclaredAmount,
    };

    console.log('addFuturePolicy Data..', data);
    this.ggaService.get80GGASummaryFuturePolicy(data).subscribe((res) => {
      console.log('addFuturePolicy Res..', res);
      // if(res.data.length > 0){
      this.summaryGridData = res.data.results[0].donations80GGTransactionList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureDonationsDeclaredAmount =
        res.data.results[0].futureDonationsDeclaredAmount;
      this.futureGlobalPolicyDeclaredAmount =
        res.data.results[0].futureDonationsDeclaredAmount;
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.benefitAvailableOnDeclaredAmount =
        res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benefitAvailableOnActualAmount =
        res.data.results[0].benefitAvailableOnActualAmount;
      // }
    });
    this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.futureDonationsDeclaredAmount = this.futureDonationsDeclaredAmount;
    if (this.futureDonationsDeclaredAmount > 0) {
      this.addFuturePolicy();
    } else if (this.futureDonationsDeclaredAmount < 0) {
      this.futureDonationsDeclaredAmount = this.futureGlobalPolicyDeclaredAmount;
    }
  }
/* 
  jumpToMasterPage(policyNo: string) {
    this.tabIndex = 1;
    const data = {
      number: policyNo,
      tabIndex: this.tabIndex,
    };
    this.policyNumber.emit(data);
  } */

  keyPressedSpaceNotAllow(event: any) {
    console.log('HI ');
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.key);

    if (!pattern.test(inputChar)) {
      // this.futureDonationsDeclaredAmount = 0;
      this.tempFlag = true;
      // invalid character, prevent input
      event.preventDefault();
    } else {
      this.tempFlag = false;
    }
  }
}
