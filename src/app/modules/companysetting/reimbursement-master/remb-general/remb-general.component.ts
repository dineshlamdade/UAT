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
    public router: Router,
    public alertService: AlertServiceService,
     
  ) {


  }

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      reimbursementMasterGeneralSettingId: new FormControl(''),
      headMasterId: new FormControl('', Validators.required),
      displayName: new FormControl(''),
      trakingMethod: new FormControl('Same head'),
      trackingOnAnotherHeadId: new FormControl(''),
      claimTaxable: new FormControl('false'),
      billSubLimitMethod: new FormControl(''),
      billSubLimitSDMId: new FormControl(''),
      enableInvestmentDeclaration: new FormControl('false'),
      regTemplateId: new FormControl(''),
      cyclewiseBalanceTracking: new FormControl('false'),
      maxCountOfRegiOfHead: new FormControl(''),
      regiApprWorkflowId: new FormControl(''),
      regiApprSDMId: new FormControl(''),
      claimApprWorkflowId: new FormControl(''),
      claimApprSDMId: new FormControl(''),
      reiListSummaryHeadTempId: new FormControl(''),
      declarationMessageId: new FormControl(''),
      formActiveTempid: new FormControl(''),
      claimTempId: new FormControl('', Validators.required),
      ProofOfSubmission: new FormControl('false'),
      active: new FormControl('false'),
      remark: new FormControl('ss'),
      reimbursementTrackingRequestDTO: new FormGroup({
        reimTrackingId: new FormControl(''),
        reimAttributeMasterId: new FormControl(''),
        amountLimit: new FormControl(''),
        quantityLimit: new FormControl(''),
        onesEvery: new FormControl(''),
        frequency: new FormControl(''),
        gapsBetTwoAttributeClaims: new FormControl(''),
        maxCountOfRegiOfAttribute: new FormControl('4'),
        active: new FormControl('true'),
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

    let saveArray = [];
    for (let i = 0; i < this.generalAttrSelectElement.length; i++) {
      let obj = {
        reimAttributeMasterId: this.generalAttrSelectElement[i].reimAttributeMasterId,
        amountLimit: this.generalAttrSelectElement[i].amountLimit,
        quantityLimit: this.generalAttrSelectElement[i].quantityLimit,
        onesEvery: this.generalAttrSelectElement[i].onesEvery,
        frequency: this.generalAttrSelectElement[i].frequency,
        gapsBetTwoAttributeClaims: this.generalAttrSelectElement[i].gapsBetTwoAttributeClaims,
        maxCountOfRegiOfAttribute: this.generalAttrSelectElement[i].maxCountOfRegiOfAttribute,
        active: this.generalAttrSelectElement[i].active
      }
      saveArray.push(obj);
    }
    console.log("this.generalform", this.generalForm.value);
    let postData = this.generalForm.getRawValue();
    // postData.reimbursementTrackingRequestDTO.method = this.eventHead;
    postData.reimbursementTrackingRequestDTO = saveArray;
    console.log("postdata", postData);
    this.reimbursementMasterService.setReimbursementSubmitData(postData);
    this.alertService.sweetalertMasterSuccess("General setting form submitted successfully", "");
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


// ...............navigation link...........................
registerNavigate(){
  this.router.navigate(['/registerForm']);
}
summaryNavigate(){
  this.router.navigate(['/summaryForm']);
}
claimNavigate(){
  this.router.navigate(['/claimForm']);
}
declarationNavigate(){
  this.router.navigate(['/declarationForm']);
}


public eventHead:'';
  // ...................Event calls methods..................
  headOprationShowClick(event) {
    console.log("eventtable head", event);
    this.eventHead = event;
    console.log("eventtable head2", event);
    this.headOprationShow = true;
    this.headTableOprationShow = false;
    this.headAttribute = false;
    this.headRembType = true;
  }

  headTableOprationShowClick(event) {
    console.log("eventtable ", event);
    this.eventHead = event;
    this.headTableOprationShow = true;
    this.headOprationShow = false;
    this.headAttribute = true;

  }
  headSameOprationShowClick(event) {
    console.log("eventtable same", event);
    this.eventHead = event;
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
    let eventActive = "false";
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
   
    console.log("this.attrData", attrData);
    console.log("this.generalelement", this.generalAttrSelectElement);
    this.generalAttrSelectElement[attrData].amountLimit = eventAttr;
    this.generalAttrSelectElement[attrData].active = eventActive;
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
  claimDaysChange2(index, eventAttr, typeValue) {
    console.log("index,attrsid, evenets", index, eventAttr, typeValue);
    let attrData = this.generalAttrSelectElement.findIndex(getAttrIndex => getAttrIndex.typeValue == typeValue);
    this.generalAttrSelectElement[attrData].maxCountOfRegiOfAttribute = eventAttr;
    console.log("this.generalelement", this.generalAttrSelectElement);
  }
}
