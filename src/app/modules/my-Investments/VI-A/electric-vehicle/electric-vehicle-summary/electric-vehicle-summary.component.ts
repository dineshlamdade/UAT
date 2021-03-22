import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { ElectricVehicleService } from '../electric-vehicle.service';


@Component({
  selector: 'app-electric-vehicle-summary',
  templateUrl: './electric-vehicle-summary.component.html',
  styleUrls: ['./electric-vehicle-summary.component.scss']
})
export class ElectricVehicleSummaryComponent implements OnInit {

  @Input() institution: string;
  @Input() vehicleNumber: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() vehicleNo = new EventEmitter<any>();

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
  public futureNewPolicyDeclaredAmount: string;
  public limit : number;
  public benefitAvailableOnActualAmount :number;
  public benefitAvailableOnDeclaredAmount : number;

  constructor(
    private service: MyInvestmentsService,
    private electricVehicleService: ElectricVehicleService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService
  ) {  }

  public ngOnInit(): void {
     // Summary get Call
    this.summaryPage();
  }


  redirectToDeclarationActual(institution: string, vehicleNumber: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      institution : institution,
      vehicleNumber : vehicleNumber,
      tabIndex : this.tabIndex,
      canEdit: (mode == 'edit' ? true : false)};
    this.institution = institution;
    this.vehicleNumber = vehicleNumber;
    this.myEvent.emit(data);
  }

  jumpToMasterPage(vehicleNumber: string) {
    this.tabIndex = 1;
    const vehicleNo = {
      vehicleNumber : vehicleNumber,
      tabIndex : this.tabIndex,
    };
    this.vehicleNo.emit(vehicleNo);
  }

   // ---------------------Summary ----------------------
    // Summary get Call
  summaryPage() {
    this.electricVehicleService.getElectricVehicleSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].electricVehicleSummaryDetails;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureNewPolicyDeclaredAmount = res.data.results[0].interestOnFutureLoanDeclaredAmount;
      this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.limit = res.data.results[0].limit;
      this.benefitAvailableOnDeclaredAmount = res.data.results[0].benefitAvailableOnDeclaredAmount;
      this.benefitAvailableOnActualAmount = res.data.results[0].benefitAvailableOnActualAmount;
      this.onChangeLimit();
    });
  }

  // Post New Future Policy Data API call
  public addFuturePolicy(): void {
    const data = {
      futureNewPolicyDeclaredAmount: this. futureNewPolicyDeclaredAmount,
    };

    //console.log('addFuturePolicy Data..', data);
    this.electricVehicleService
      .postElectricVehicleFuturePlan(data)
      .subscribe((res) => {
        console.log('addFuturePolicy Res..', res);
        if (res.data.length > 0 ) {
        this.summaryGridData = res.data.results[0];
        this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        this.totalActualAmount = res.data.results[0].totalActualAmount;
        this.futureNewPolicyDeclaredAmount = res.data.results[0].interestOnFutureLoanDeclaredAmount;
        this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        this.limit = res.data.results[0].limit;
      }
    });
    this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
  }

  // On Change Future New Policy Declared Amount with formate
  onChangeFutureNewPolicyDeclaredAmount() {
    this.futureNewPolicyDeclaredAmount =   this.futureNewPolicyDeclaredAmount;
    this.addFuturePolicy();
    this.onChangeLimit();

  }

  onChangeLimit() {
    this.benefitAvailableOnDeclaredAmount = Math.min(this.grandTotalDeclaredAmount, this.limit);
    this.benefitAvailableOnActualAmount = Math.min(this.grandTotalActualAmount, this.limit);
    // this.eligibleForDeductionF = this.grandTotalDeclaredAmount - this.benefitE;
  }
}
