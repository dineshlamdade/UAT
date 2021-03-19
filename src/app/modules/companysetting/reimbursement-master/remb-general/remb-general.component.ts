import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ReimbursementMasterService } from '../../reimbursement-master/reimbursement-master.service';
@Component({
  selector: 'app-remb-general',
  templateUrl: './remb-general.component.html',
  styleUrls: ['./remb-general.component.scss']
})
export class RembGeneralComponent implements OnInit {
  public dropdownList = [];
  public selectedItems = [];
  public headtypelist = [];
  public headAllattributes = [];
  public headAllSequency = [];
  public headOprationShow: boolean = false;
  public headTableOprationShow: boolean = false;
  public headRembType: boolean = true;
  public headAttribute: boolean = false;
  public headAttributeTable: boolean = false;
  public headRembType2: boolean = false;
  public generalForm: FormGroup;
 public submitted = false;
 public rembHeadId:number;
  constructor(
    public reimbursementMasterService: ReimbursementMasterService,
    public fb: FormBuilder,

  ) {


  }

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      reimbursementMasterGeneralSettingId: new FormControl(''),
      headMasterId: new FormControl(''),
      displayName: new FormControl(''),
      claimTaxable: new FormControl(''),
      billSubLimitMethod: new FormControl(''),
      billSubLimitSDMId: new FormControl(''),
      enableInvestmentDeclaration: new FormControl(''),
      regTemplateId: new FormControl(''),
      cyclewiseBalanceTracking: new FormControl(''),
      regTemplateMappingId: new FormControl(''),
      maxCountOfRegiOfHead: new FormControl(''),
      regiApprWorkflowId: new FormControl(''),
      regiApprSDMId: new FormControl(''),
      claimApprWorkflowId: new FormControl(''),
      claimApprSDMId: new FormControl(''),
      reiListSummaryHeadTempId: new FormControl(''),
      declarationTemplateMappingId: new FormControl(''),
      formActiveTempid: new FormControl(''),
      claimTempId: new FormControl(''),
      ProofOfSubmission: new FormControl(''),
      isActive: new FormControl(''),
      reimbursementTrackingRequestDTO: new FormGroup({
        reimTrackingId: new FormControl(''),
        method: new FormControl(''),
        trackingOnAnotherHeadId: new FormControl(''),
        reimAttributeMasterId: new FormControl(''),
        amountLimit: new FormControl(''),
        quantityLimit: new FormControl(''),
        onesEvery: new FormControl(''),
        frequency: new FormControl(''),
        gapsBetTwoAttributeClaims: new FormControl(''),
        maxCountOfRegiOfAttribute: new FormControl(''),
      }),
      reimbursementMasterComputationSettingRequestDTO: new FormGroup({
        reiMasterComputationSettingID: new FormControl(''),
        nonTaxableMethod: new FormControl(''),
        nonTaxableSDMId: new FormControl(''),
        taxableMethodFNF: new FormControl(''),
        taxableMethodLastCycle: new FormControl(''),
        taxableMethodIntermediary: new FormControl(''),
        taxableFrequency: new FormControl(''),
        taxablePeriodDefination: new FormControl(''),
        taxableNoOfCycle: new FormControl(''),
        lapseAccruedEntPayableFNF: new FormControl(''),
        lapseAccruedEntPayableLastCycle: new FormControl(''),
        lapseAccruedEntPayableIntermediary: new FormControl(''),
        lapseAccruedEntPayableFrequency: new FormControl(''),
        LapseaccrentpayablePeriodDefinition: new FormControl(''),
        lapseAccruedEntPayableNoOfCycle: new FormControl(''),
        subBillMethod: new FormControl(''),
        subBillWithCount: new FormControl(''),
        billDateNotAllowedMethod: new FormControl(''),
        billDateNotAllowedCount: new FormControl(''),
        billLastFinYearClaimedInNextFinYear: new FormControl(''),
        unPaidBillCarryForward: new FormControl(''),
        cyclewiseNumLineItemsAllowed: new FormControl(''),
        gapsBetwTwoHeadClaims: new FormControl(''),
     })
    });
    console.log("swww");
    this.getReimbursementHeadType();

    this.getReimbursementAllFrequency();
  }

get f(){ return this.generalForm.controls; }

submitGeneralMaster(){
  this.submitted = true;
  if(this.generalForm.invalid){
    return;
  }
console.log("this.generalform", this.generalForm.value);
}

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


// .................Get value from fileds ......................
headerChangeEvent(eventid){
console.log("selectbox value", eventid);
this.rembHeadId = eventid;
this.getReimbursementAllAttributes();
}
 
  // .....................All Get Api Call Here................

  getReimbursementHeadType() {
    console.log("ssss");
    this.reimbursementMasterService.getReimbursementHeadType().subscribe((res) => {
      console.log("res master", res);
      this.headtypelist = res.data.results;
    })
  }
  getReimbursementAllAttributes() {
    this.reimbursementMasterService.getReimbursementAllAttributes(this.rembHeadId).subscribe((res) => {
      this.headAllattributes = res.data.results[0];
      console.log("res attribute", this.headAllattributes);
    });
    // this.headAttribute = false;
  }

  getReimbursementAllFrequency() {
    this.reimbursementMasterService.getReimbursementAllFrequency().subscribe((res) => {
      this.headAllSequency = res.data.results[0];
      console.log("res headAllSequency", this.headAllSequency);
    })
  }
  // ...................Event calls methods..................
  headOprationShowClick() {
    this.headOprationShow = true;
    this.headTableOprationShow = false;
    this.headAttribute = false;
    this.headRembType = true;
  }

  headTableOprationShowClick() {
    this.headTableOprationShow = true;
    this.headOprationShow = false;
    this.headAttribute = true;

  }
  headSameOprationShowClick() {
    this.headTableOprationShow = false;
    this.headOprationShow = false;
    this.headAttribute = false;
    this.headRembType = true;
  }
  headAttributeTableClick() {
    this.headAttributeTable = true;
    this.headRembType2 = false;
  }
  headTableClick() {
    this.headAttributeTable = false;
    this.headRembType2 = true;
  }


  
}
