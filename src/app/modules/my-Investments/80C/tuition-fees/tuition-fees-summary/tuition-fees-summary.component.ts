import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { TuitionFeesService } from '../tuition-fees.service';


@Component({
  selector: 'app-tuition-fees-summary',
  templateUrl: './tuition-fees-summary.component.html',
  styleUrls: ['./tuition-fees-summary.component.scss']
})
export class TuitionFeesSummaryComponent implements OnInit {

  @Input() institution: string;
  @Input() childName: string;
  @Output() myEvent = new EventEmitter<any>();

  onEditSummary(institution: string, childName: string) {
    this.tabIndex = 2;
    const data = {
      institution: institution,
      childName: childName,
      tabIndex: this.tabIndex,
    };
    this.institution = institution;
    this.childName = childName;

    this.myEvent.emit(data);
  }

  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  // public futureNewPolicyDeclaredAmount: string;
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
    private tuitionFeesService : TuitionFeesService,
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
    this.tuitionFeesService.getTuitionFeesSummary().subscribe((res) => {
      if (res.data.results.length > 0) {
        this.summaryGridData = res.data.results[0].tuitionFeesTransactionDetailList;
        this.totalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].grandTotalActualAmount;
        this.grandTotalDeclaredAmount =
          res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        console.log(res);
      }
    });
  }




  jumpToMasterPage(n: number) {
    //console.log(n);
    this.tabIndex = 1;
    //this.editMaster(3);
  }

  // On onEditSummary
  onEditSummary1(institution: string, childName: string) {
    this.tabIndex = 2;
    this.institution = institution;
    this.childName = childName;
    console.log('institution::', institution);
    console.log('childName::', childName);
  }
}

