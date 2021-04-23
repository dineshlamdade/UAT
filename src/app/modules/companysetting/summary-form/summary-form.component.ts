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
  public summaryGridDataList: Array<any> = [];
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
      groupCompanyId: new FormControl(1),
      active: new FormControl(true),
      remark: new FormControl({ value: '', disabled: true }),
      reimbursementListSummaryHeadTemplateDetailsRequestDTO: new FormGroup({
        reiListSummaryHeadTempFieldId: new FormControl(''),
        fieldName: new FormControl(''),
        displayName: new FormControl(''),
        enable: new FormControl(''),
        active: new FormControl(''),

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
      let isAllSelectField = this.summaryGridDataList.every(obj => obj.enable == false);
      if (isAllSelectField) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      } else {
        console.log(this.summaryForm.value);
        let postData = this.summaryForm.getRawValue();
        this.summaryGridDataList.forEach(element => {
          if (element.dropDownValues === null) {
            element.dropDownValues = [];
          }
        })
        postData.reimbursementListSummaryHeadTemplateDetailsRequestDTO = this.summaryGridDataList;
        console.log("postData", postData);
        this.summaryService.editClaimData(postData).subscribe((res) => {
          console.log("Claim value", res);
          // this.templateUserIdList.push(res.data.results[0]);
          this.alertService.sweetalertMasterSuccess("Summary form updated successfully", "");
          console.log("templateUserId", this.templateUserIdList);
        })
      }
      this.resetForm();

    } else {
      this.submitted = true;
      if (this.summaryForm.invalid) {
        return;
      }
      let isAllSelectField = this.summaryGridDataList.every(obj => obj.enable == false);
      if (isAllSelectField) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      } else {
      console.log(this.summaryForm.value);
      let postData = this.summaryForm.getRawValue();
      postData.reimbursementListSummaryHeadTemplateDetailsRequestDTO = this.summaryGridDataList;
      console.log("postData", postData);
      this.summaryService.postClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Summary form submitted successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
    }
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
      this.summaryGridDataList = res.data.results;
      console.log(" this.summaryGridDataList", this.summaryGridDataList)
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
      //  this.summaryGridDataList = [];
      this.summaryGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      // this.summaryGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      this.isView = true;
      console.log("this.summaryGridDataList", this.summaryGridDataList)

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
      // this.summaryGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      this.summaryGridDataList = response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      this.isEdit = true;
      console.log("this.summaryGridDataList", this.summaryGridDataList)
      for (let i = 0; i < response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO.length; i++) {
        const myobj = {
          reiListSummaryHeadTempFieldId: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].reiListSummaryHeadTempFieldId,
          reiListSummaryHeadTempDetailsId: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].reiListSummaryHeadTempDetailsId,
          reiListSummaryHeadTempId: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].reiListSummaryHeadTempId,
          fieldName: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].fieldName,
          displayName: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].displayName,
          enable: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].enable,
          // dropDownValues: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].dropDownValues,
          // claimForm: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].claimForm,
          // sequence: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].sequence,
          // mandatory: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].mandatory,
          // nature: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].nature,
          // remark: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].remark,
          active: response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].active,

        };
        let s = this.summaryGridDataList.findIndex(o => o.fieldName == response.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO[i].fieldName);
        this.summaryGridDataList[s] = myobj;
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
    console.log("hellow", index, isChecked, fieldName);
    console.log(this.summaryGridDataList[index]);
    // this.registerGridDataList[index].enable = isChecked;

    const indexValue = this.summaryGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    console.log("indexvalue", indexValue);
    this.summaryGridDataList[indexValue].enable = isChecked;
    // this.summaryGridDataList[indexValue].mandatory = false;
    // this.summaryGridDataList[indexValue].claimForm = false;
    this.summaryGridDataList[indexValue].dropDownValues = [];
    if (!isChecked) {
      //console.log("registerGridDataTempList::",this.registerGridDataTempList);
    //  const tempIndexValue = this.registerGridDataTempList.findIndex(getIndex => getIndex.fieldName == fieldName);
  
      this.summaryGridDataList[indexValue].displayName = '';
    //  console.log("this.registerGridDataTempList[tempIndexValue].displayName", this.registerGridDataTempList[tempIndexValue].displayName)

    }


    // console.log(index, isChecked, claimId);
    // console.log(this.summaryGridDataList[index]);
    // this.summaryGridDataList[index].enable = isChecked;
    // if (isChecked == true) {
    //   let listData = this.summaryGridDataList[index];
    //   listData.mandatory = false;
    //   listData.dropDownValues = [];
    //   this.summaryGridDataList.push(listData);
    //   console.log("myvalue", this.summaryGridDataList);
    // } else {
    //   const indexValue = this.summaryGridDataList.indexOf(fieldName);
    //   this.summaryGridDataList.splice(indexValue, 1);
    // }
    // console.log("selected value", this.summaryGridDataList);
  }

  // .................... Change Event Pass Value............
  mindatoryChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    if (changeValue == "") {
      let falseValue = "false";
      let indexData = this.summaryGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.summaryGridDataList[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
      console.log("mindatory index2", this.summaryGridDataList);
    } else {
      let indexData = this.summaryGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.summaryGridDataList[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
      console.log("mindatory index", this.summaryGridDataList);
    }
  }


  displayChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    let indexData = this.summaryGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    this.summaryGridDataList[indexData].displayName = changeValue;
    console.log("Display change", this.summaryGridDataList);
  }


  // ................Dropdown List Values.................
  getDropdownListvalue(dropList, dropdownListid) {
    this.dropdownListData.push(dropList);
    console.log("dropdownListData", this.dropdownListData);
    this.dropListModel = '';
    let indexField = this.summaryGridDataList.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.summaryGridDataList[indexField].dropDownValues = this.dropdownListData;
  }

  getDropdownListRemove(index, dropdownListid) {
    this.dropdownListData.splice(index, 1);
    console.log(this.dropdownListData);
    let indexField = this.summaryGridDataList.findIndex(getIndex => getIndex == dropdownListid)
    this.summaryGridDataList[indexField].dropDownValues = this.dropdownListData;
  }
  resetForm() {
    window.scrollTo(0, 0);
    this.summaryGridDataList = [];
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
