import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { format } from 'ssf/types';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ReimbursementMasterService } from '../../reimbursement-master/reimbursement-master.service';
@Component({
  selector: 'app-remb-general',
  templateUrl: './remb-general.component.html',
  styleUrls: ['./remb-general.component.scss']
})
export class RembGeneralComponent implements OnInit {
  @Input() public policyNumber: any;
  public dropdownList = [];
  public selectedItems = [];
  public headtypelist = [];
  public headTemplateList1 = [];
  public headTemplateList2 = [];
  public headTemplateList3 = [];
  public headTemplateList4 = [];
  public headTemplateList5 = [];
  public headAllattributes = [];
  public headAllSequency = [];
  public generalGridDataList: Array<any> = [];
  public generalAttrSelectElement: Array<any> = [];
  public headOprationShow: boolean = false;
  public headTableOprationShow: boolean = false;
  public headRembType: boolean = false;
  public headAttribute: boolean = false;
  public headAttributeTable: boolean = false;
  public headRembType2: boolean = true;
  public generalForm: FormGroup;
  public submitted = false;
  public selectedBillLimitValue = false;
  public rembHeadId: number;
  public reimbursementGeneralId: number;
  public templateData = [];
  private tabIndex = 0;
  public dropdownListData: Array<any> = [];
  public dropListModel: string;
  public dropdownListData1: Array<any> = [];
  public dropListModel1: string;
  public empRegistrationDocument = [];
  public empClaimDocument = [];
  public editClaimtaxable = '';
  public editCyclewiseBalance = '';
  public editInvestmentDeclaration = '';
  @Input() policyNo: string;
  @Input() canEdit: string;
  @Output() policyNumber1 = new EventEmitter<any>();


  constructor(
    public service: ReimbursementMasterService,
    public fb: FormBuilder,
    public router: Router,
    public alertService: AlertServiceService,

  ) {


  }
  ngOnChanges() {
    console.log('policyNumber', this.policyNumber);
    // this.editMaster(this.policyNumber.policyNo);
  }
  ngOnInit(): void {
    this.generalForm = this.fb.group({
      reimbursementMasterGeneralSettingId: new FormControl(''),
      headMasterId: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
      trakingMethod: new FormControl('same-head'),
      trackingOnAnotherHeadId: new FormControl(''),
      claimTaxable: new FormControl('false'),
      billSubLimitMethod: new FormControl(''),
      billSubLimitSDMId: new FormControl(''),
      enableInvestmentDeclaration: new FormControl('false'),
      regTemplateId: new FormControl('', Validators.required),
      cyclewiseBalanceTracking: new FormControl('false'),
      maxCountOfRegiOfHead: new FormControl(''),
      regiApprWorkflowId: new FormControl(''),
      regiApprSDMId: new FormControl(''),
      claimApprWorkflowId: new FormControl(''),
      claimApprSDMId: new FormControl(''),
      reiListSummaryHeadTempId: new FormControl('', Validators.required),
      declarationMessageNonTaxableId: new FormControl('', Validators.required),
      declarationMessageTaxableId: new FormControl('', Validators.required),
      formActiveTempid: new FormControl(''),
      claimTempId: new FormControl('', Validators.required),
      ProofOfSubmission: new FormControl('false'),
      active: new FormControl('false'),
      remark: new FormControl('ss'),
      empRegistrationDocument: new FormGroup({
        registrationDocument: new FormControl(''),
        registrationRemark: new FormControl('success'),
        active: new FormControl(true)
      }),
      empClaimDocument: new FormGroup({
        claimDocument: new FormControl(''),
        claimRemark: new FormControl('success'),
        active: new FormControl(true)
      }),
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
    this.getAllWorkflowMasters();

    if (this.policyNumber != undefined || this.policyNumber != null) {
      const inputData = this.policyNumber;
      this.getViewgeneralById(inputData.policyNo);
      console.log("getViewgeneralById", inputData.policyNo);
    }
  }

  get f() { return this.generalForm.controls; }

  submitGeneralMaster() {
    window.scrollTo(0, 0);
    if (this.reimbursementGeneralId > 0) {

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
      postData.empRegistrationDocument = this.dropdownListData;
      postData.empClaimDocument = this.dropdownListData1;
      // postData.reimbursementTrackingRequestDTO.method = this.eventHead;
      postData.reimbursementTrackingRequestDTO = saveArray;
      console.log("Edit postdata", postData);
      this.service.setReimbursementSubmitData(postData);
      // this.service.editReimbursementSubmitData(postData).subscribe((res) => {
      //   console.log("general value update", res);
      //   // this.alertService.sweetalertMasterSuccess("General setting form updated successfully", "");
      //   this.jumpToMasterPage();
      // })
      this.jumpToMasterPage();
    } else {

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
      postData.empRegistrationDocument = this.empRegistrationDocument;
      postData.empClaimDocument = this.empClaimDocument;
      // postData.reimbursementTrackingRequestDTO.method = this.eventHead;
      postData.reimbursementTrackingRequestDTO = saveArray;
      console.log("postdata", JSON.stringify(postData));
      this.service.setReimbursementSubmitData(postData);
      // this.alertService.sweetalertMasterSuccess("General setting form submitted successfully", "");
      this.jumpToMasterPage();
    }

  }

  getViewgeneralById(policyNo) {
    this.reimbursementGeneralId = policyNo;
    let modePoint = this.policyNumber.canEdit;
    //console.log("this.canEdit", modePoint)
    this.dropdownListData = []
    if (modePoint == true) {
      window.scrollTo(0, 0);
      this.service.getGeneralTemplateViewById(policyNo).subscribe((res) => {
       // console.log("results", res);
        let generalViewData = res.data.results[0];
        console.log("generalViewData", JSON.stringify(generalViewData));
        this.generalForm.patchValue(generalViewData);
        let trackId = generalViewData.trakingMethod;
        // console.log("trackId", trackId)
        this.trakingChange(trackId);
        this.rembHeadId = generalViewData.headMasterId;
        let element = generalViewData.reimbursementTrackingResponseDTO;
        for (let i = 0; i < res.data.results[0].reimbursementTrackingResponseDTO.length; i++) {
          const myobj = {
            reimAttributeMasterId: res.data.results[0].reimbursementTrackingResponseDTO[i].reimAttributeMasterId,
            amountLimit: res.data.results[0].reimbursementTrackingResponseDTO[i].amountLimit,
            quantityLimit: res.data.results[0].reimbursementTrackingResponseDTO[i].quantityLimit,
            onesEvery: res.data.results[0].reimbursementTrackingResponseDTO[i].onesEvery,
            frequency: res.data.results[0].reimbursementTrackingResponseDTO[i].frequency,
            gapsBetTwoAttributeClaims: res.data.results[0].reimbursementTrackingResponseDTO[i].gapsBetTwoAttributeClaims,
            maxCountOfRegiOfAttribute: res.data.results[0].reimbursementTrackingResponseDTO[i].maxCountOfRegiOfAttribute,
            active: res.data.results[0].reimbursementTrackingResponseDTO[i].active,
          }
          let s = this.generalAttrSelectElement.findIndex(o => o.reimAttributeMasterId == res.data.results[0].reimbursementTrackingResponseDTO[i].reimAttributeMasterId);
          this.generalAttrSelectElement[s] = myobj;
          this.headAllattributes.push(myobj)
           
      
          console.log("data is: "+ JSON.stringify(element)) 
          this.rembHeadId = element[0].reimbursementMasterGeneralSettingId
            this.getReimbursementAllAttributes() 
          // console.log("myobj", myobj);
        }

        console.log("this.generalAttrSelectElement ", JSON.stringify(this.generalAttrSelectElement));
        // generalViewData.reimbursementTrackingResponseDTO.forEach(element =>{
        // this.generalAttrSelectElement.push(element);
        // let saveArray = [];
        for (let i = 0; i < element.length; i++) {
          let obj = {
            reimAttributeMasterId: element[i].reimAttributeMasterId,
            amountLimit: element[i].amountLimit,
            quantityLimit: element[i].quantityLimit,
            onesEvery: element[i].onesEvery,
            frequency: element[i].frequency,
            gapsBetTwoAttributeClaims: element[i].gapsBetTwoAttributeClaims,
            maxCountOfRegiOfAttribute: element[i].maxCountOfRegiOfAttribute,
            active: element[i].active
          }
          // console.log("obj my", obj);
          this.generalAttrSelectElement.push(obj);
          // console.log(" this.generalAttrSelectElement obj my", this.generalAttrSelectElement);
        }
        // console.log("this.generalAttrSelectElement edit", this.generalAttrSelectElement)
        // })
        if (generalViewData.claimTaxable == true) {
          this.editClaimtaxable = 'true';
        } else {
          this.editClaimtaxable = 'false';
        }

        if (generalViewData.enableInvestmentDeclaration == true) {
          this.editInvestmentDeclaration = 'true';
        } else {
          this.editInvestmentDeclaration = 'false';
        }

        if (generalViewData.cyclewiseBalanceTracking == true) {
          this.editCyclewiseBalance = 'true';
        } else {
          this.editCyclewiseBalance = 'false';
        }

        generalViewData.empRegistrationDocument.forEach(element => {
          this.dropdownListData.push(element.registrationDocument)
        });
        generalViewData.empClaimDocument.forEach(element => {
          this.dropdownListData1.push(element.claimDocument)
        });


        console.log("this.empClaimDocument", this.empClaimDocument);
        // this.generalForm.disable();

      })
    } else {
      window.scrollTo(0, 0);
      this.service.getGeneralTemplateViewById(policyNo).subscribe((res) => {
        console.log("results", res);
        const generalViewData = res.data.results[0];
        this.generalForm.patchValue(generalViewData);
        this.generalForm.disable();
      })

    }

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
    this.service.getReimbursementHeadType().subscribe((res) => {
      console.log("res master", res);
      this.headtypelist = res.data.results;
    })
  }
  getReimbursementAllAttributes() {
    // console.log("here" + this.rembHeadId)
    this.service.getReimbursementAllAttributes(this.rembHeadId).subscribe((res) => {
      this.headAllattributes = res.data.results[0];
      console.log("res attribute", this.headAllattributes);
      this.generalAttrSelectElement = this.headAllattributes;
    });
    // this.headAttribute = false;
  }

  getReimbursementAllFrequency() {
    this.service.getReimbursementAllFrequency().subscribe((res) => {
      this.headAllSequency = res.data.results[0];
      console.log("res headAllSequency", this.headAllSequency);
    })
  }

  getRegisterTemplateFields() {
    console.log("ssss");
    this.service.getRegisterTemplateFields().subscribe((res) => {
      console.log("getRegisterTemplateFields", res);
      this.headTemplateList1 = res.data.results;
    })
  }

  getClaimTemplateFields() {
    console.log("ssss");
    this.service.getClaimTemplateFields().subscribe((res) => {
      console.log("getClaimTemplateFields", res);
      this.headTemplateList2 = res.data.results;
    })
  }

  getSummaryTemplateFields() {
    console.log("ssss");
    this.service.getSummaryTemplateFields().subscribe((res) => {
      console.log("getSummaryTemplateFields", res);
      this.headTemplateList3 = res.data.results;
    })
  }

  getDeclarationTemplateFields() {
    console.log("ssss");
    this.service.getDeclarationTemplateFields().subscribe((res) => {
      console.log("getDeclarationTemplateFields", res);
      this.headTemplateList4 = res.data.results[0];
    })
  }
  getAllWorkflowMasters() {
    this.service.getAllWorkflowMasters().subscribe((res) => {
      console.log("getAllWorkflowMasters", res);
      this.headTemplateList5 = res.data.results;
    })
  }
  // ................Dropdown List Values.................
  getRegistrationDocList(dropList, dropdownListid) {
    console.log("dropdownListid", dropList, dropdownListid);
    this.dropdownListData.push(dropList);

    this.empRegistrationDocument.push({
      registrationDocument: dropList,
      registrationRemark: 'Success',
      active: true,
    });
    console.log('Register emp', this.empRegistrationDocument);
    console.log("dropdownListData", this.dropdownListData);
    this.dropListModel = '';
  }

  getRegistrationDocRemove(index, dropdownListid) {
    this.empRegistrationDocument.splice(index, 1);
    this.dropdownListData.splice(index, 1);
    console.log("302", this.dropdownListData);
  }

  getClaimDocList(dropList, dropdownListid) {
    console.log("dropdownListid", dropList, dropdownListid);
    this.dropdownListData1.push(dropList);

    this.empClaimDocument.push({
      claimDocument: dropList,
      claimRemark: 'Success',
      active: true,
    });
    console.log('empClaimDocument emp', this.empClaimDocument);
    console.log("dropdownListData", this.dropdownListData1);
    this.dropListModel1 = '';
  }

  getClaimDocRemove(index, dropdownListid) {
    this.empClaimDocument.splice(index, 1);
    this.dropdownListData1.splice(index, 1);
    console.log("302", this.dropdownListData1);
  }



  // ...............navigation link...........................
  registerNavigate() {
    this.router.navigate(['/registerForm']);
  }
  summaryNavigate() {
    this.router.navigate(['/summaryForm']);
  }
  claimNavigate() {
    this.router.navigate(['/claimForm']);
  }
  declarationNavigate() {
    this.router.navigate(['/declarationForm']);
  }
  jumpToMasterPage() {
    console.log("hellow");
    this.tabIndex = 2;
    const policyNumber1 = {
      policyNo: 2,
      tabIndex: this.tabIndex,
    };
    this.policyNumber1.emit(policyNumber1);
  }
  trakingChange(event) {
    console.log("traking id", event);
    if (event == "same-head") {
      console.log("eventtable same", event);
      this.eventHead = event;
      this.headTableOprationShow = false;
      this.headOprationShow = false;
      this.headAttribute = false;
      this.headRembType = false;
      this.headRembType2 = true;
      this.headAttributeTable = false;
    } else if (event == "attributes-same-head") {
      console.log("eventtable ", event);
      this.eventHead = event;
      this.headTableOprationShow = true;
      this.headOprationShow = false;
      this.headAttribute = true;
      this.headRembType2 = false;
      this.headRembType = true;
    } else if (event == "another-head") {
      console.log("eventtable head", event);
      this.eventHead = event;
      console.log("eventtable head2", event);
      this.headOprationShow = true;
      this.headTableOprationShow = false;
      this.headAttribute = false;
      this.headRembType = false;
      this.headRembType2 = true;
      this.headAttributeTable = false;
    }
  }
  public eventHead: '';
  // ...................Event calls methods..................
  // headOprationShowClick(event) {
  //   console.log("eventtable head", event);
  //   this.eventHead = event;
  //   console.log("eventtable head2", event);
  //   this.headOprationShow = true;
  //   this.headTableOprationShow = false;
  //   this.headAttribute = false;
  //   this.headRembType = true;
  // }

  // headTableOprationShowClick(event) {
  //   console.log("eventtable ", event);
  //   this.eventHead = event;
  //   this.headTableOprationShow = true;
  //   this.headOprationShow = false;
  //   this.headAttribute = true;

  // }
  // headSameOprationShowClick(event) {
  //   console.log("eventtable same", event);
  //   this.eventHead = event;
  //   this.headTableOprationShow = false;
  //   this.headOprationShow = false;
  //   this.headAttribute = false;
  //   this.headRembType = true;
  // }
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
  selectedChangeBill(event) {
    let billEvent = event;
    console.log("billEvent", billEvent);
    if (billEvent == 'SDM') {
      this.selectedBillLimitValue = true;
    } else {
      this.selectedBillLimitValue = false;
    }
  }

}
