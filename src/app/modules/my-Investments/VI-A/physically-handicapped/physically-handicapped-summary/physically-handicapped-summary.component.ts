import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FixedDepositsService } from '../../../80C/fixed-deposits/fixed-deposits.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { PhysicallyHandicappedService } from '../physically-handicapped.service';

@Component({
  selector: 'app-physically-handicapped-summary',
  templateUrl: './physically-handicapped-summary.component.html',
  styleUrls: ['./physically-handicapped-summary.component.scss']
})
export class PhysicallyHandicappedSummaryComponent implements OnInit {

  @Input() employeeName: string;
  @Input() severity: string;
  @Output() myEvent = new EventEmitter<any>();


  onEditSummary(employeeName: string, severity: string) {
    this.tabIndex = 2;
    const data = {
      employeeName: employeeName,
      severity: severity,
      tabIndex: this.tabIndex,
    };
    this.employeeName = employeeName;
    this.severity = severity;

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

  public limit : number;
  public benifitDeclared: number;
  public benifitActual: number;


  constructor(
    private service: MyInvestmentsService,
    private physicallyHandicappedService:PhysicallyHandicappedService,
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
    this.physicallyHandicappedService.getPhysicallyHandicappedSummary().subscribe((res) => {
      if (res.data.results.length > 0) {
        this.summaryGridData = res.data.results;
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.limit = res.data.results[0].limit;
        this.benifitDeclared = res.data.results[0].benifitDeclared;
        this.benifitActual = res.data.results[0].benifitActual;
      }
    });
  }


  jumpToMasterPage(n: number) {
    //console.log(n);
    this.tabIndex = 1;
    //this.editMaster(3);
  }

  // On onEditSummary
  onEditSummary1(employeeName: string, severity: string) {
    this.tabIndex = 2;
    this.employeeName = employeeName;
    this.severity = severity;
    console.log('employeeName::', employeeName);
    console.log('severity::', severity);
  }

 //limit of actual and declared
 onChangelimit() {
  this.benifitActual = Math.min(this.totalActualAmount, this.limit);
  this.benifitDeclared = Math.min(this.totalDeclaredAmount, this.limit);
}
}

