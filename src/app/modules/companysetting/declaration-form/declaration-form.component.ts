import { Component, OnInit } from '@angular/core';
import { DeclarationService } from './declaration.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
@Component({
  selector: 'app-declaration-form',
  templateUrl: './declaration-form.component.html',
  styleUrls: ['./declaration-form.component.scss']
})
export class DeclarationFormComponent implements OnInit {
  public declarationForm: FormGroup;
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
  public claimTempId: number = 0;
  constructor(
    public declarationService: DeclarationService,
    public fb: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
  ) { }

  ngOnInit(): void {
    this.declarationForm = this.fb.group({
      createdBy: new FormControl(''),
      createDateTime: new FormControl(''),
      lastModifiedBy: new FormControl(''),
      lastModifiedDateTime: new FormControl(''),
      declarationMessageId: new FormControl(''),
      declarationMessageName: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required),
      payRollArea: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(1),
      rembDeclarationMessage: new FormControl('', Validators.required),
      fieldId: new FormControl(''),
      active: new FormControl(true),
    
    });
    // this.getAllFields();
    this.getClaimTemplatesList();
  }
  get f() { return this.declarationForm.controls; }

  //................. Submit claim form.................
  submitClaimMaster() {
    window.scrollTo(0, 0);
 
      this.submitted = true;
      if (this.declarationForm.invalid) {
        return;
      }
      console.log(this.declarationForm.value);
      let postData = this.declarationForm.getRawValue();
      console.log("postData", postData);
      this.declarationService.postClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Register form submitted successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
      this.declarationForm.reset({
        active: new FormControl(true),
      });
 
 
}
  // ....................Active remark disabled....................
  activeRemark(event) {
    if (event == false) {
      this.declarationForm.controls.remark.enable();
    } else {
      this.declarationForm.controls.remark.disable();
    }
  }

  //....................... Get all fields list for selected checkbox list...................
  // getAllFields() {
  //   this.declarationService.getClaimFields().subscribe((res) => {
  //     console.log(res);
  //     // const nature = { nature: "List" }
  //     // const returnClaimData = Object.assign(res.data.results[0], nature);
  //     this.claimGridDataList = res.data.results;
  //     console.log(" this.claimGridDataList", this.claimGridDataList)
  //   })
  // }
  //....................... View and Edit post list for selected checkbox list...................
  getClaimTemplateViewById(claimTempId, companyId) {
    console.log("claimtempid", claimTempId, companyId);
    window.scrollTo(0, 0);
    this.declarationService.getClaimTemplateViewById(claimTempId, companyId).subscribe((res) => {
      console.log(res);
      let claimTemplateList = res.data.results[0];
      console.log(claimTemplateList);
      this.declarationForm.patchValue(claimTemplateList);
      this.declarationForm.disable();
      this.claimGridDataList = [];
      this.claimGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      this.isView = true;
      console.log("this.selectedListElement", this.claimGridDataList)

    })

  }
  
  getClaimTemplateEditById(claimTempId, companyId) {
    this.claimTempId = claimTempId;
    window.scrollTo(0, 0);
    this.declarationService.getClaimTemplateViewById(claimTempId, companyId).subscribe((res) => {
      console.log(res);
      let claimTemplateList = res.data.results[0];
      console.log(claimTemplateList);
      this.declarationForm.patchValue(claimTemplateList);
      this.claimGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      // this.isView = true;
      console.log("this.selectedListElement", this.selectedListElement)

    })

  }




  //.........................Get all claim template list .................

  getClaimTemplatesList() {
    this.declarationService.getClaimTemplateList().subscribe((res) => {
      console.log(res);
      this.templateUserIdList = res.data.results[0];
      console.log("templateUserIdList", this.templateUserIdList)
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
  moduleChange(event){
console.log("event", event)
  }

  companyChange(event){
    console.log("event", event)
      }
    


  mindatoryChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    if (changeValue == "") {
      let falseValue = "false";
      let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.claimGridDataList[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
      console.log("mindatory index2", this.selectedListElement);
    } else {
      let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.claimGridDataList[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
      console.log("mindatory index", this.selectedListElement);
    }
  }


  displayChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    this.claimGridDataList[indexData].displayName = changeValue;
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

