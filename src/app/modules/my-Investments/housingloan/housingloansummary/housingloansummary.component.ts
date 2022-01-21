import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnyCnameRecord, AnyMxRecord } from 'node:dns';
import { NumberFormat } from 'xlsx/types';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { HousingloanService } from '../housingloan.service';
@Component({
  selector: 'app-housingloansummary',
  templateUrl: './housingloansummary.component.html',
  styleUrls: ['./housingloansummary.component.scss']
})
export class HousingloansummaryComponent implements OnInit {
  @Input() houseDescription: string;
  @Input() housePropertyMasterId: number;
  @Output() myEvent = new EventEmitter<any>();
  @Output() housePropertyMasterIds = new EventEmitter<any>();
  public modalRef: BsModalRef;
  public summaryGridData : any = [];
  // public totalDeclaredAmount : number;
  // public totalActualAmount : number;
  // public grandTotalDeclaredAmount : number;
  // public grandTotalActualAmount : number;

public  totalDeclaredAmount : number;
public  totalActualAmount : number;
public  totalPositiveDeclaredAmount : number = 0;
public  totalPositiveActualAmount : number = 0;
public  futurePurchasePrincipalDeclaredAmount : number;
public  futurePurchaseInterestDeclaredAmount : number;
public  grandTotalDeclaredAmount : number;
public  grandTotalActualAmount : number;
public  limitSec24 : number;
public  deductionInSec24DeclaredAmount : number;
public  deductionInSec24ActualAmount : AnyMxRecord;
public  balanceAvailableIn80EEDeclaredAmount : number;
public  balanceAvailableIn80EEActualAmountAmount : number;
public  limitIn80EE : number;
public  deductionIn80EEDeclaredAmount : number;
public  deductionIn80EEActualAmount : number;
public  balanceAvailableIn80EEADeclaredAmount : number;
public  balanceAvailableIn80EEAActualAmount : number;
public  limitIn80EEA : number;
public  deductionIn80EEADeclaredAmount : number;
public  deductionIn80EEAActualAmount : number;
public  totalLossFromHousePropertyDeclaredAmount : number;
public  totalLossFromHousePropertyActualAmount : number;
public housePropertySummaryDetails: Array<any> = [];

public futureGlobalPolicyDeclaredAmount = 0;
public futureGlobalPolicyDeclaredAmountInvestment = 0;

public tempFlag : boolean;
public InterestFlag : boolean;
public tabIndex = 0;
public charSequence = 'A';
public index: number = 0;


  constructor(  private modalService: BsModalService,
    private  housingloanService : HousingloanService,
    private alertService: AlertServiceService) { }

  ngOnInit(): void {
    this.summaryPage()
  }

  // Summary get Call
  summaryPage() {
    this.housingloanService.getHousingLoanummary().subscribe((res) => {
      console.log(res);
      if(res.data.results.length > 0){
      this.summaryGridData = res.data.results[0];
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futurePurchasePrincipalDeclaredAmount  = res.data.results[0].futurePurchasePrincipalDeclaredAmount;
      this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futurePurchasePrincipalDeclaredAmount;
      this.futurePurchaseInterestDeclaredAmount = res.data.results[0].futurePurchaseInterestDeclaredAmount;
      this.futureGlobalPolicyDeclaredAmountInvestment = res.data.results[0].futurePurchaseInterestDeclaredAmount;
      this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
      this.limitSec24  = res.data.results[0].limitSec24;
      this.deductionInSec24DeclaredAmount = res.data.results[0].deductionInSec24DeclaredAmount;
      this.deductionInSec24ActualAmount = res.data.results[0].deductionInSec24ActualAmount;
      this.balanceAvailableIn80EEDeclaredAmount = res.data.results[0].balanceAvailableIn80EEDeclaredAmount;
      this.balanceAvailableIn80EEActualAmountAmount = res.data.results[0].balanceAvailableIn80EEActualAmountAmount;
      this.limitIn80EE = res.data.results[0].limitIn80EE;
      this.deductionIn80EEDeclaredAmount = res.data.results[0].deductionIn80EEDeclaredAmount;
      this.deductionIn80EEActualAmount = res.data.results[0].deductionIn80EEActualAmount;
      this.balanceAvailableIn80EEADeclaredAmount = res.data.results[0].balanceAvailableIn80EEADeclaredAmount;
      this.balanceAvailableIn80EEAActualAmount = res.data.results[0].balanceAvailableIn80EEAActualAmount;
      this.limitIn80EEA = res.data.results[0].limitIn80EEA;
      this.deductionIn80EEADeclaredAmount = res.data.results[0].deductionIn80EEADeclaredAmount;
      this.deductionIn80EEAActualAmount = res.data.results[0].deductionIn80EEAActualAmount;
      this.totalLossFromHousePropertyDeclaredAmount = res.data.results[0].totalLossFromHousePropertyDeclaredAmount;
      this.totalLossFromHousePropertyActualAmount = res.data.results[0].totalLossFromHousePropertyActualAmount;
      console.log(this.summaryGridData);
      debugger
      if(res.data.results[0].housePropertyPositiveSummaryDetails.length>0){
        res.data.results[0].housePropertyPositiveSummaryDetails.forEach(element => {
          this.totalPositiveDeclaredAmount = this.totalPositiveDeclaredAmount + element.declaredAmount;
          this.totalPositiveActualAmount = this.totalPositiveActualAmount + element.actualAmount;
        });
      }
    }
    });
  }

 // Post New Future Policy Data API call
 public addFuturePolicyPurchasesPrincipal(): void {
  const data = {
    futureNewPolicyDeclaredAmount: this.futurePurchasePrincipalDeclaredAmount,
  };
    console.log('postFuturePolicyPurchasesPrincipal Data..', data);
    this.housingloanService.postFuturePolicyPurchasesPrincipal(data).subscribe((res) => {
    this.summaryGridData = res.data.results[0];
    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
    this.totalActualAmount = res.data.results[0].totalActualAmount;
    this.futurePurchasePrincipalDeclaredAmount  = res.data.results[0].futurePurchasePrincipalDeclaredAmount;
    this.futureGlobalPolicyDeclaredAmount = res.data.results[0].futurePurchasePrincipalDeclaredAmount;
    this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
    this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
    this.limitSec24  = res.data.results[0].limitSec24;
    this.deductionInSec24DeclaredAmount = res.data.results[0].deductionInSec24DeclaredAmount;
    this.deductionInSec24ActualAmount = res.data.results[0].deductionInSec24ActualAmount;
    this.balanceAvailableIn80EEDeclaredAmount = res.data.results[0].balanceAvailableIn80EEDeclaredAmount;
    this.balanceAvailableIn80EEActualAmountAmount = res.data.results[0].balanceAvailableIn80EEActualAmountAmount;
    this.limitIn80EE = res.data.results[0].limitIn80EE;
    this.deductionIn80EEDeclaredAmount = res.data.results[0].deductionIn80EEDeclaredAmount;
    this.deductionIn80EEActualAmount = res.data.results[0].deductionIn80EEActualAmount;
    this.balanceAvailableIn80EEADeclaredAmount = res.data.results[0].balanceAvailableIn80EEADeclaredAmount;
    this.balanceAvailableIn80EEAActualAmount = res.data.results[0].balanceAvailableIn80EEAActualAmount;
    this.limitIn80EEA = res.data.results[0].limitIn80EEA;
    this.deductionIn80EEADeclaredAmount = res.data.results[0].deductionIn80EEADeclaredAmount;
    this.deductionIn80EEAActualAmount = res.data.results[0].deductionIn80EEAActualAmount;
    this.totalLossFromHousePropertyDeclaredAmount = res.data.results[0].totalLossFromHousePropertyDeclaredAmount;
    this.totalLossFromHousePropertyActualAmount = res.data.results[0].totalLossFromHousePropertyActualAmount;
    console.log(this.summaryGridData);

    // if(this.tempFlag === false) {
    //   this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
    // }
  });
  this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
}

    // On Change Future New Policy Declared Amount with formate
    onChangeFutureNewPurchasesPrincipal() {
      this.futurePurchasePrincipalDeclaredAmount = this.futurePurchasePrincipalDeclaredAmount;
      if (this.futurePurchasePrincipalDeclaredAmount > 0) {
      this.addFuturePolicyPurchasesPrincipal();
    }else if(this.futurePurchasePrincipalDeclaredAmount <0) {
      this.futurePurchasePrincipalDeclaredAmount = this.futureGlobalPolicyDeclaredAmount;
    }
  }


  // Post New Future Policy Data API call
 public addFuturePolicyPurchasesInterest(): void {
  const data = {
    futureNewPolicyDeclaredAmount: this.futurePurchaseInterestDeclaredAmount,
  };

  console.log('postFuturePolicyPurchasesInvestment Data..', data);
  this.housingloanService.postFuturePolicyPurchasesInvestment(data).subscribe((res) => {
    this.summaryGridData = res.data.results[0];
    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
    this.totalActualAmount = res.data.results[0].totalActualAmount;
    this.futurePurchaseInterestDeclaredAmount = res.data.results[0].futurePurchaseInterestDeclaredAmount;
    this.futureGlobalPolicyDeclaredAmountInvestment = res.data.results[0].futurePurchaseInterestDeclaredAmount;
    this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
    this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
    this.limitSec24  = res.data.results[0].limitSec24;
    this.deductionInSec24DeclaredAmount = res.data.results[0].deductionInSec24DeclaredAmount;
    this.deductionInSec24ActualAmount = res.data.results[0].deductionInSec24ActualAmount;
    this.balanceAvailableIn80EEDeclaredAmount = res.data.results[0].balanceAvailableIn80EEDeclaredAmount;
    this.balanceAvailableIn80EEActualAmountAmount = res.data.results[0].balanceAvailableIn80EEActualAmountAmount;
    this.limitIn80EE = res.data.results[0].limitIn80EE;
    this.deductionIn80EEDeclaredAmount = res.data.results[0].deductionIn80EEDeclaredAmount;
    this.deductionIn80EEActualAmount = res.data.results[0].deductionIn80EEActualAmount;
    this.balanceAvailableIn80EEADeclaredAmount = res.data.results[0].balanceAvailableIn80EEADeclaredAmount;
    this.balanceAvailableIn80EEAActualAmount = res.data.results[0].balanceAvailableIn80EEAActualAmount;
    this.limitIn80EEA = res.data.results[0].limitIn80EEA;
    this.deductionIn80EEADeclaredAmount = res.data.results[0].deductionIn80EEADeclaredAmount;
    this.deductionIn80EEAActualAmount = res.data.results[0].deductionIn80EEAActualAmount;
    this.totalLossFromHousePropertyDeclaredAmount = res.data.results[0].totalLossFromHousePropertyDeclaredAmount;
    this.totalLossFromHousePropertyActualAmount = res.data.results[0].totalLossFromHousePropertyActualAmount;
    console.log(this.summaryGridData);

    // if(this.tempFlag === false) {
    //   this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
    // }
  });
  this.alertService.sweetalertMasterSuccess('Future Amount was saved', '');
}

onChangeFutureNewPurchasesInterest() {
  this.futurePurchaseInterestDeclaredAmount = this.futurePurchaseInterestDeclaredAmount;
  if (this.futurePurchaseInterestDeclaredAmount > 0) {
  this.addFuturePolicyPurchasesInterest();
}else if(this.futurePurchaseInterestDeclaredAmount <0) {
  this.futurePurchaseInterestDeclaredAmount = this.futureGlobalPolicyDeclaredAmountInvestment;
}
}


keyPressedSpaceNotAllow(event: any) {
  console.log('HI ');
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.key);

  if (!pattern.test(inputChar)) {
    this.futurePurchasePrincipalDeclaredAmount = 0;

    this.tempFlag = true;
    // invalid character, prevent input
    event.preventDefault();
  } else {
    this.tempFlag = false;
  }
}

keyPressedSpaceNotAllowInterest(event: any) {
  console.log('HI ');
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.key);

  if (!pattern.test(inputChar)) {
    this.futurePurchaseInterestDeclaredAmount = 0;

    this.InterestFlag = true;
    // invalid character, prevent input
    event.preventDefault();
  } else {
    this.InterestFlag = false;
  }
}

redirectToDeclarationActual(houseDescription: string, mode: string) {
  this.tabIndex = 2;
  const data = {
    propertyHouseName: houseDescription,
    tabIndex: this.tabIndex,
    canEdit: mode == 'edit' ? true : false,
  };
  this.houseDescription = houseDescription;
  console.log('houseDescription::', houseDescription);
console.log('propertyhouseDescriptionName::', houseDescription);
  this.myEvent.emit(data);
}


// redirectToDeclarationActual(
//   housePropertyMasterId: number,
//   mode: string
// ) {
//   this.tabIndex = 2;
//   const data = {
//     housePropertyMasterId: housePropertyMasterId,
//     tabIndex: this.tabIndex,
//     canEdit: mode == 'edit' ? true : false,
//   };
//   this.housePropertyMasterId = housePropertyMasterId;
//   this.myEvent.emit(data);
// }

jumpToMasterPage(housePropertyMasterId: number) {
  this.tabIndex = 1;
  const housePropertyMasterIds = {
    housePropertyMasterId: housePropertyMasterId,
    tabIndex: this.tabIndex,
  };
  this.housePropertyMasterIds.emit(housePropertyMasterIds);
}


  InfoDialogforSectionEightyEE(infodialog1: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      infodialog1,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }
  InfoDialogforSectionEightyEEA(infodialog2: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      infodialog2,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }
}
