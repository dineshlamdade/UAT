import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { HandicappedDependentService } from '../handicapped-dependent.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() familyMemberName: string;
  @Input() disabilityType: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() disabilityTypeName = new EventEmitter<any>();
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
  public selectedfamilyMemberName: string;

  public limit : number;
  public benefitActualAmount : number;
  public benefitDeclaredAmount : number;

  constructor(
    private service: MyInvestmentsService,
    private handicappedDependentService: HandicappedDependentService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
    this.summaryPage();
  }
  redirectToDeclarationActual(familyMemberName: string, disabilityType: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      familyMemberName : familyMemberName,
      disabilityType : disabilityType,
      tabIndex : this.tabIndex,
      canEdit: mode == 'edit' ? true : false,
      canView: mode == 'view' ? true : false,
    };
     // canEdit: (mode == 'edit' ? true : false)};
    this.familyMemberName = familyMemberName;
    this.disabilityType = disabilityType;
    this.myEvent.emit(data);
  }
  jumpToMasterPage(disabilityType: string) {
    this.tabIndex = 1;
    const disabilityTypeName = {
      disabilityType : disabilityType,
      tabIndex : this.tabIndex,
    };
    this.disabilityTypeName.emit(disabilityTypeName);
  }
  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.handicappedDependentService.getHandicappedSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].handicappedDependentTransactionList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.limit = res.data.results[0].limit;
      this.benefitActualAmount = res.data.results[0].benefitActualAmount;
      this.benefitDeclaredAmount = res.data.results[0].benefitDeclaredAmount;
      this.onChangelimit();
    });
  }
  // On onEditSummary
  onEditSummary1(familyMemberName: string, disabilityType: string) {
    this.tabIndex = 2;
    this.familyMemberName = familyMemberName;
    this.disabilityType = disabilityType;
    console.log('familyMemberName::', familyMemberName);
    console.log('disabilityType::', disabilityType);
  }

  //limit of actual and declared
  onChangelimit() {
    this.benefitDeclaredAmount = Math.min(this.totalDeclaredAmount, this.limit);
    this.benefitActualAmount = Math.min(this.totalActualAmount, this.limit);
  }
}
