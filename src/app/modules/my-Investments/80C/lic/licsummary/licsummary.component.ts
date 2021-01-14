import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';

@Component({
  selector: 'app-licsummary',
  templateUrl: './licsummary.component.html',
  styleUrls: ['./licsummary.component.scss']
})

export class LicsummaryComponent implements OnInit {

  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public futureNewPolicyDeclaredAmount: any;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;
  @Input() institution: string;
  @Input() policyNo: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() policyNumber = new EventEmitter<any>();

  constructor(
    private service: MyInvestmentsService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService,
    ) { }

  public ngOnInit(): void {
    // Summary get Call on Page Load
    this.summaryPage();

  }

  redirectToDeclarationActual(institution: string, policyNo: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      institution : institution,
      policyNo : policyNo,
      tabIndex : this.tabIndex,
      canEdit: (mode == 'edit' ? true : false)
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
        this.service.getEightyCSummary().subscribe((res) => {
          this.summaryGridData = res.data.results[0].licMasterList;
          this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
          this.totalActualAmount = res.data.results[0].totalActualAmount;
          this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
          this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
          // console.log(res);
        });
      }

    // Post New Future Policy Data API call
      public addFuturePolicy(): void {

        this.futureNewPolicyDeclaredAmount = this.futureNewPolicyDeclaredAmount.toString().replace(',', '');

        const data = {
            futureNewPolicyDeclaredAmount : this.futureNewPolicyDeclaredAmount,
        };

        console.log('addFuturePolicy Data..', data);
        this.service.postEightyCSummaryFuturePolicy(data).subscribe((res) => {
            console.log('addFuturePolicy Res..', res);
            this.summaryGridData = res.data.results[0].licMasterList;
            this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            this.totalActualAmount = res.data.results[0].totalActualAmount;
            this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
            this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });

        this.alertService.sweetalertMasterSuccess("Future Amount was saved","");
      }

  // On Change Future New Policy Declared Amount with formate
    onChangeFutureNewPolicyDeclaredAmount() {
      this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(this.futureNewPolicyDeclaredAmount);
      this.addFuturePolicy();
    }

    jumpToMasterPage(policyNo: string) {
      this.tabIndex = 1;
      const data = {
        number : policyNo,
        tabIndex : this.tabIndex
      };;
      this.policyNumber.emit(data);
    }
}
