import { Component, OnInit } from '@angular/core';
import { SummaryService } from './summary.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
@Component({
  selector: 'app-summary-form',
  templateUrl: './summary-form.component.html',
  styleUrls: ['./summary-form.component.scss']
})

export class SummaryFormComponent implements OnInit {
  public summaryForm: FormGroup;
  public claimGridDataList: Array<any> = [];
  public selectedListElement: Array<any> = [];
  public dropdownListData: Array<any> = [];
  public submitted: boolean = false;
  public loading: boolean = false;
  public modalRef: BsModalRef;
  public dropListModel: string;
  public dropdownListid: any;
  public templateUserIdList = [];
  public isView: boolean = false;
  public isEdit: boolean = false;
  public claimTempId: number = 0;
  constructor(
    public summaryService: SummaryService,
    public fb: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
  ) { }

  ngOnInit(): void {
    this.summaryForm = this.fb.group({
      reiListSummaryHeadTempId: new FormControl(''),
      listSummaryHeadTemplateName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(''),
      active: new FormControl(true),
      remark: new FormControl({ value: '', disabled: true }),
      reimbursementListSummaryHeadTemplateDetailsRequestDTO: new FormGroup({
        reiListSummaryHeadTempFieldId: new FormControl(''),
        fieldName: new FormControl(''),
        displayName: new FormControl(''),
        enable: new FormControl(''),
      })
    });
    this.getAllFields();
    this.getClaimTemplatesList();
    // this.isView=false;
  }
  get f() { return this.summaryForm.controls; }

  //................. Submit claim form.................
  submitClaimMaster() {
    window.scrollTo(0, 0);
    if (this.claimTempId > 0) {
      this.submitted = true;
      if (this.summaryForm.invalid) {
        return;
      }
      if(this.selectedListElement.length === 0){
        this.alertService.sweetalertWarning('Please select any field list')
        return
      }else{
      console.log(this.summaryForm.value);
      let postData = this.summaryForm.getRawValue();
      this.selectedListElement.forEach(element=>{
        if(element.dropDownValues === null){
          element.dropDownValues = [];
        }
      })
      postData.reimbursementListSummaryHeadTemplateDetailsRequestDTO = this.selectedListElement;
      console.log("postData", postData);
      this.summaryService.editClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        // this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Register form updated successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
    }
 this.resetForm();
      
    } else {
      this.submitted = true;
      if (this.summaryForm.invalid) {
        return;
      }
      console.log(this.summaryForm.value);
      let postData = this.summaryForm.getRawValue();
      postData.reimbursementListSummaryHeadTemplateDetailsRequestDTO = this.selectedListElement;
      console.log("postData", postData);
      this.summaryService.postClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Register form submitted successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
      this.resetForm();
    }
  }
  // ....................Active remark disabled....................
  activeRemark(event) {
    if (event == false) {
      this.summaryForm.controls.remark.enable();
    } else {
      this.summaryForm.controls.remark.disable();
    }
  }

  //....................... Get all fields list for selected checkbox list...................
  getAllFields() {
    this.summaryService.getClaimFields().subscribe((res) => {
      console.log(res);
      // const nature = { nature: "List" }
      // const returnClaimData = Object.assign(res.data.results[0], nature);
      this.claimGridDataList = res.data.results;
      console.log(" this.claimGridDataList", this.claimGridDataList)
    })
  }
  //....................... View and Edit post list for selected checkbox list...................
  getClaimTemplateViewById(claimTempId) {
    window.scrollTo(0, 0);
    this.summaryService.getClaimTemplateViewById(claimTempId).subscribe((res) => {
      console.log(res);
      let claimTemplateList = res.data.results[0];
      console.log(claimTemplateList);
      this.summaryForm.patchValue(claimTemplateList);
      this.summaryForm.disable();
    //  this.claimGridDataList = [];
      this.claimGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      // this.selectedListElement = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      this.isView = true;
      console.log("this.selectedListElement", this.selectedListElement)

    })

  }
  getClaimTemplateEditById(claimTempId) {
    this.claimTempId = claimTempId;
    window.scrollTo(0, 0);
    this.summaryService.getClaimTemplateViewById(claimTempId).subscribe((response) => {
      console.log(response);
      let claimTemplateList = response.data.results[0];
      console.log(claimTemplateList);
      this.summaryForm.patchValue(claimTemplateList);
     // this.claimGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
     this.selectedListElement = response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
        this.isEdit = true;
      console.log("this.selectedListElement", this.selectedListElement)
      for (let i = 0; i < response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO.length; i++) {
        const myobj = {
          regTempStandardFieldId: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].claimTempStandardFieldMasterId,
          fieldName: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].fieldName,
          displayName: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].displayName,
          enable: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].enable,
          // dropDownValues: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].dropDownValues,
          // claimForm: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].claimForm,
          // sequence: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].sequence,
          // mandatory: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].mandatory,
          // nature: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].nature,
          // remark: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].remark,
          // isActive: response.data.results[0].claimTemplateDetailsResponseDTO[i].isActive,
          isActive: 1,
        };
        let s = this.claimGridDataList.findIndex(o=>o.fieldName == response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].fieldName);
       this.claimGridDataList[s]=myobj;
        // this.registersList.splice(s,1);
        // this.registersList.push(myobj);
      }
    })

  }




  //.........................Get all claim template list .................

  getClaimTemplatesList() {
    this.summaryService.getClaimTemplateList().subscribe((res) => {
      console.log(res);
      this.templateUserIdList = res.data.results;
    })
  }

  // ...........................Select table list data ......................

  checkedListData(index, isChecked, fieldName) {
    // console.log(index, isChecked, claimId);
    console.log(this.claimGridDataList[index]);
    this.claimGridDataList[index].enable = isChecked;
    if (isChecked == true) {
      let listData = this.claimGridDataList[index];
      listData.mandatory = false;
      listData.dropDownValues = [];
      this.selectedListElement.push(listData);
      console.log("myvalue", this.selectedListElement);
    } else {
      const indexValue = this.selectedListElement.indexOf(fieldName);
      this.selectedListElement.splice(indexValue, 1);
    }
    console.log("selected value", this.selectedListElement);
  }

  // .................... Change Event Pass Value............
  mindatoryChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    if (changeValue == "") {
      let falseValue = "false";
      let indexData = this.selectedListElement.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.selectedListElement[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
      console.log("mindatory index2", this.selectedListElement);
    } else {
      let indexData = this.selectedListElement.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.selectedListElement[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
      console.log("mindatory index", this.selectedListElement);
    }
  }


  displayChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    let indexData = this.selectedListElement.findIndex(getIndex => getIndex.fieldName == fieldName);
    this.selectedListElement[indexData].displayName = changeValue;
    console.log("Display change", this.selectedListElement);
  }


  // ................Dropdown List Values.................
  getDropdownListvalue(dropList, dropdownListid) {
    this.dropdownListData.push(dropList);
    console.log("dropdownListData", this.dropdownListData);
    this.dropListModel = '';
    let indexField = this.selectedListElement.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.selectedListElement[indexField].dropDownValues = this.dropdownListData;
  }

  getDropdownListRemove(index, dropdownListid) {
    this.dropdownListData.splice(index, 1);
    console.log(this.dropdownListData);
    let indexField = this.selectedListElement.findIndex(getIndex => getIndex == dropdownListid)
    this.selectedListElement[indexField].dropDownValues = this.dropdownListData;
  }
  resetForm(){
    window.scrollTo(0, 0);
    this.selectedListElement = [];
    this.summaryForm.reset({
      active: new FormControl(true),
    });
    this.getAllFields();
    this.isView = false;
    this.isEdit = false;
    this.summaryForm.enable();
    this.summaryForm.controls.remark.disable();
    
  }
  // ....................Popup box section...................

  modalDropdownList(template: TemplateRef<any>, srno: any, fieldName: string) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.dropdownListid = fieldName;
    console.log(this.dropdownListid);
  }



}
