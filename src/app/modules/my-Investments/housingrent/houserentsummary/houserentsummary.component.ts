import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { HouseRentService } from '../house-rent.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-houserentsummary',
  templateUrl: './houserentsummary.component.html',
  styleUrls: ['./houserentsummary.component.scss'],
})
export class HouserentsummaryComponent implements OnInit {
  public summaryGridData: Array<any> = [];
  public tabIndex = 0;
  public declaredAmount: any;
  public actualAmount: any;
  public futureNewPolicyDeclaredAmount: any;
  public grandTotalDeclaredAmount: number;
  public grandTotalActualAmount: number;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandTabStatus: boolean;
  public selectedInstitution: string;
  public propertyName: string;
  public toDate: Date;
  public fromDate: Date;

  showData = false;
  public modalRef: BsModalRef;


  public baseTotal: number;
  public arrearTotal: number;
  public total: number;
  public maxEligibilityTotal: number;
  public applicableAllowanceTotal: number;

  /*   @Input() institution: string; */
  @Input() propertyHouseName: string;
  @Output() myEvent = new EventEmitter<any>();
  @Output() policyNumber = new EventEmitter<any>();
  @Output() houseRentalMasterIds = new EventEmitter<any>();

  constructor(
    private houseRentService: HouseRentService,
    private numberFormat: NumberFormatPipe,
    private alertService: AlertServiceService,
    private modalService: BsModalService
  ) {}

  public ngOnInit(): void {

    this.getComputationSummaryPage();
    // Summary get Call on Page Load
    this.summaryPage();
  }


  getComputationSummaryPage() {
    this.houseRentService.getComputation().subscribe((res) => {
      if(res.data.results.length > 0){
      this.summaryGridData = res.data.results[0].houseRentalAllowanceComputationList;
        console.log("res::",res)
      this.baseTotal = res.data.results[0].baseTotal;
      this.arrearTotal = res.data.results[0].arrearTotal;
      this.total = res.data.results[0].total;
      this.maxEligibilityTotal = res.data.results[0].maxEligibilityTotal;
      this.applicableAllowanceTotal =
        res.data.results[0].applicableAllowanceTotal;
      }
    });
  }

  redirectToDeclarationActual(propertyName: string, mode: string) {
    this.tabIndex = 2;
    const data = {
      propertyHouseName: propertyName,
      tabIndex: this.tabIndex,
      canEdit: mode == 'edit' ? true : false,
    };
    this.propertyName = propertyName;
    console.log('propertyName::', propertyName);
  console.log('propertyName::', propertyName);
    this.myEvent.emit(data);
  }

  // ---------------------Summary ----------------------
  // Summary get Call
  summaryPage() {
    this.houseRentService.gethouseRentSummary().subscribe((res) => {
      console.log(res);
      if(res.data.results.length > 0){
      this.summaryGridData = res.data.results;
      this.propertyName = res.data.results[0].propertyName;
      this.fromDate = res.data.results[0].fromDate;
      this.toDate = res.data.results[0].toDate;
      this.actualAmount = res.data.results[0].actualAmount;
      this.declaredAmount = res.data.results[0].declaredAmount;
      /*  this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
          this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
          this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount; */
      // console.log(res);
    }
    });
  }

/*   jumpToMasterPage(propertyName: string) {
    this.tabIndex = 1;
    const data = {
      number: propertyName,
      tabIndex: this.tabIndex,
    };
    this.policyNumber.emit(data);
  } */
  jumpToMasterPage(houseRentalMasterId: number) {
  this.tabIndex = 1;
  const houseRentalMasterIds = {
    houseRentalMasterId: houseRentalMasterId,
    tabIndex: this.tabIndex,
  };
  this.houseRentalMasterIds.emit(houseRentalMasterIds);
}

  opencomputationModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
