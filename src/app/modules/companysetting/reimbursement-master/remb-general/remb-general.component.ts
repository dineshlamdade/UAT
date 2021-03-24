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
  public headTemplateList1 = [];
  public headTemplateList2 = [];
  public headTemplateList3 = [];
  public headTemplateList4 = [];
  public headAllattributes = [];
  public headAllSequency = [];
  public generalGridDataList: Array<any> = [];
  public generalAttrSelectElement: Array<any> = [];
  public headOprationShow: boolean = false;
  public headTableOprationShow: boolean = false;
  public headRembType: boolean = true;
  public headAttribute: boolean = false;
  public headAttributeTable: boolean = false;
  public headRembType2: boolean = false;
  public generalForm: FormGroup;
  public submitted = false;
  public rembHeadId: number;
  public templateData = [];
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
      claimTaxable: new FormControl('1'),
      billSubLimitMethod: new FormControl(''),
      billSubLimitSDMId: new FormControl(''),
      enableInvestmentDeclaration: new FormControl('1'),
      regTemplateId: new FormControl(''),
      cyclewiseBalanceTracking: new FormControl('1'),
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
      // reimbursementMasterComputationSettingRequestDTO: new FormGroup({
      //   reiMasterComputationSettingID: new FormControl(''),
      //   nonTaxableMethod: new FormControl(''),
      //   nonTaxableSDMId: new FormControl(''),
      //   taxableMethodFNF: new FormControl(''),
      //   taxableMethodLastCycle: new FormControl(''),
      //   taxableMethodIntermediary: new FormControl(''),
      //   taxableFrequency: new FormControl(''),
      //   taxablePeriodDefination: new FormControl(''),
      //   taxableNoOfCycle: new FormControl(''),
      //   lapseAccruedEntPayableFNF: new FormControl(''),
      //   lapseAccruedEntPayableLastCycle: new FormControl(''),
      //   lapseAccruedEntPayableIntermediary: new FormControl(''),
      //   lapseAccruedEntPayableFrequency: new FormControl(''),
      //   LapseaccrentpayablePeriodDefinition: new FormControl(''),
      //   lapseAccruedEntPayableNoOfCycle: new FormControl(''),
      //   subBillMethod: new FormControl(''),
      //   subBillWithCount: new FormControl(''),
      //   billDateNotAllowedMethod: new FormControl(''),
      //   billDateNotAllowedCount: new FormControl(''),
      //   billLastFinYearClaimedInNextFinYear: new FormControl(''),
      //   unPaidBillCarryForward: new FormControl(''),
      //   cyclewiseNumLineItemsAllowed: new FormControl(''),
      //   gapsBetwTwoHeadClaims: new FormControl(''),
      // })
    });
    console.log("swww");
    this.getReimbursementHeadType();
    this.getReimbursementAllFrequency();

    this.getRegisterTemplateFields();
    this.getClaimTemplateFields();
    this.getSummaryTemplateFields();
    this.getDeclarationTemplateFields();
  }

  get f() { return this.generalForm.controls; }

  submitGeneralMaster() {
    this.submitted = true;
    if (this.generalForm.invalid) {
      return;
    }
    console.log("this.generalform", this.generalForm.value);
    let postData = this.generalForm.getRawValue();
    postData.reimbursementTrackingRequestDTO = this.generalAttrSelectElement;
    console.log("postdata", postData);
    this.reimbursementMasterService.setReimbursementSubmitData(this.generalForm);

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  // .................Get value from fileds ......................
  headerChangeEvent(eventid) {
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
      this.generalAttrSelectElement = this.headAllattributes;
    });
    // this.headAttribute = false;
  }

  getReimbursementAllFrequency() {
    this.reimbursementMasterService.getReimbursementAllFrequency().subscribe((res) => {
      this.headAllSequency = res.data.results[0];
      console.log("res headAllSequency", this.headAllSequency);
    })
  }

  getRegisterTemplateFields() {
    console.log("ssss");
    this.reimbursementMasterService.getRegisterTemplateFields().subscribe((res) => {
      console.log("getRegisterTemplateFields", res);
      this.headTemplateList1 = res.data.results;
    })
  }

  getClaimTemplateFields() {
    console.log("ssss");
    this.reimbursementMasterService.getClaimTemplateFields().subscribe((res) => {
      console.log("getClaimTemplateFields", res);
      this.headTemplateList2 = res.data.results;
    })
  }

  getSummaryTemplateFields() {
    console.log("ssss");
    this.reimbursementMasterService.getSummaryTemplateFields().subscribe((res) => {
      console.log("getSummaryTemplateFields", res);
      this.headTemplateList3 = res.data.results;
    })
  }

  getDeclarationTemplateFields() {
    console.log("ssss");
    this.reimbursementMasterService.getDeclarationTemplateFields().subscribe((res) => {
      console.log("getDeclarationTemplateFields", res);
      this.headTemplateList4 = res.data.results[0];
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

  // ...................Get Attribute List Events data.....................?
  amountLimitChange(index, eventAttr, typeValue) {
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
   
    console.log("this.attrData", attrData);
    console.log("this.generalelement", this.generalAttrSelectElement);
    this.generalAttrSelectElement[attrData].amountLimit = eventAttr;

  }

  quantityLimitChange(index, eventAttr, typeValue) {
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
    this.generalAttrSelectElement[attrData].quantityLimit = eventAttr;
    console.log("this.generalelement", this.generalAttrSelectElement);
  }

  onceEveryChange(index, eventAttr, typeValue) {
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
    this.generalAttrSelectElement[attrData].onesEvery = eventAttr;
    console.log("this.generalelement", this.generalAttrSelectElement);
  }

  frequencyChange(index, eventAttr, typeValue) {
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
    this.generalAttrSelectElement[attrData].frequency = eventAttr;
    console.log("this.generalelement", this.generalAttrSelectElement);
  }

  claimDaysChange(index, eventAttr, typeValue) {
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
    this.generalAttrSelectElement[attrData].gapsBetTwoAttributeClaims = eventAttr;
    console.log("this.generalelement", this.generalAttrSelectElement);
  }
}
