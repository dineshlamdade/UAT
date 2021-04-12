import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnyCnameRecord, AnyMxRecord } from 'node:dns';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { HousingloanService } from '../housingloan.service';
@Component({
  selector: 'app-housingloansummary',
  templateUrl: './housingloansummary.component.html',
  styleUrls: ['./housingloansummary.component.scss']
})
export class HousingloansummaryComponent implements OnInit {
  public modalRef: BsModalRef;
  public summaryGridData : any;
  // public totalDeclaredAmount : number;
  // public totalActualAmount : number;
  // public grandTotalDeclaredAmount : number;
  // public grandTotalActualAmount : number;

public  totalDeclaredAmount : number;
public  totalActualAmount : number;
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

public tempFlag : boolean;
public InterestFlag : boolean;



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
      // if(res.data.results.lenght > 0){
      this.summaryGridData = res.data.results[0];
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futurePurchasePrincipalDeclaredAmount  = res.data.results[0].futurePurchasePrincipalDeclaredAmount;
      this.futurePurchaseInterestDeclaredAmount = res.data.results[0].futurePurchaseInterestDeclaredAmount;
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
    // }
    });
  }

 // Post New Future Policy Data API call
 public addFuturePolicyPurchasesPrincipal(): void {
  const data = {
    futureNewPolicyDeclaredAmount: this.futurePurchasePrincipalDeclaredAmount,
  };

  console.log('postFuturePolicyPurchasesInvestment Data..', data);
  this.housingloanService.postFuturePolicyPurchasesInvestment(data).subscribe((res) => {
    this.summaryGridData = res.data.results[0];
    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
    this.totalActualAmount = res.data.results[0].totalActualAmount;
    this.futurePurchasePrincipalDeclaredAmount  = res.data.results[0].futurePurchasePrincipalDeclaredAmount;
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

  onChangeFutureNewPurchasesPrincipal() {
    this.futurePurchasePrincipalDeclaredAmount = this.futurePurchasePrincipalDeclaredAmount;
    if (this.futurePurchasePrincipalDeclaredAmount != 0) {
      this.addFuturePolicyPurchasesPrincipal();
    }
  }

  // Post New Future Policy Data API call
 public addFuturePolicyPurchasesInterest(): void {
  const data = {
    futureNewPolicyDeclaredAmount: this.futurePurchaseInterestDeclaredAmount,
  };

  console.log('postFuturePolicyPurchasesPrincipal Data..', data);
  this.housingloanService.postFuturePolicyPurchasesPrincipal(data).subscribe((res) => {
    this.summaryGridData = res.data.results[0];
    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
    this.totalActualAmount = res.data.results[0].totalActualAmount;
    this.futurePurchaseInterestDeclaredAmount = res.data.results[0].futurePurchaseInterestDeclaredAmount;
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
    if (this.futurePurchaseInterestDeclaredAmount != 0) {
      this. addFuturePolicyPurchasesInterest();
  }
}

keyPressedSpaceNotAllow(event: any) {
  console.log('HI ');
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.key);

  if (!pattern.test(inputChar)) {
    this.futurePurchasePrincipalDeclaredAmount = 0;
    // this.futurePurchaseInterestDeclaredAmount = 0;

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
    // this.futurePurchasePrincipalDeclaredAmount = 0;
    this.futurePurchaseInterestDeclaredAmount = 0;

    this.InterestFlag = true;
    // invalid character, prevent input
    event.preventDefault();
  } else {
    this.InterestFlag = false;
  }
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
