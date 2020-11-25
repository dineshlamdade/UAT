import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { NpsService } from '../nps.service';


@Component({
  selector: 'app-nps-summary',
  templateUrl: './nps-summary.component.html',
  styleUrls: ['./nps-summary.component.scss']
})
export class NpsSummaryComponent implements OnInit {
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
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;

  public previousEmployerB: string;
  public futureInvestmentsC : string;
  public limitE : number;
  public deductionF : number;
  public eligibleForDeductionG : number;

  constructor(
    private service: MyInvestmentsService,
    private npsService : NpsService,
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
    this.npsService.getNpsSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].transactionDetailList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.previousEmployerB = this.numberFormat.transform(
        res.data.results[0].previousEmployerB
      );
      this.grandTotalDeclaredAmount =
        res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      console.log(res);
    });
  }

  // Post New Future Policy Data API call
  public addFuturePolicy(): void {
    this.previousEmployerB = this.previousEmployerB.toString().replace(',', '');
    this.futureInvestmentsC = this.futureInvestmentsC.toString().replace(',', '');
    const data = {
      previousEmployerB: this.previousEmployerB,
      futureInvestmentsC: this. futureInvestmentsC,
    };

    //console.log('addFuturePolicy Data..', data);
    this.npsService
      .getNpsSummaryFuturePlan(data)
      .subscribe((res) => {
        //console.log('addFuturePolicy Res..', res);
        this.summaryGridData = res.data.results[0].licMasterList;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.previousEmployerB = this.numberFormat.transform(
          res.data.results[0].previousEmployerB
        );
        this.futureInvestmentsC = this.numberFormat.transform(
          res.data.results[0].futureInvestmentsC
        );
        this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount =
          res.data.results[0].grandTotalActualAmount;
      });

    this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.previousEmployerB = this.numberFormat.transform(
      this.previousEmployerB
    );
    this.futureInvestmentsC = this.numberFormat.transform(
      this.futureInvestmentsC
    );
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

  onChangeLimit(){
    this.deductionF = Math.min(this.grandTotalDeclaredAmount, this.limitE);
    this.eligibleForDeductionG = this.grandTotalDeclaredAmount - this.deductionF;
  }


}

