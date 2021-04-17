import { Component, OnInit } from '@angular/core';
import { RegistrationMasterService } from './registration-master.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;
  public registerGridDataList: Array<any> = [];
  public registerGridDataTempList: Array<any> = [];
  public dropdownListData: Array<any> = [];
  public submitted: boolean = false;
  public loading: boolean = false;
  public modalRef: BsModalRef;
  public dropListModel: string;
  public dropdownListid: any;
  public templateUserIdList = [];
  public isView: boolean = false;
  public isEdit: boolean = false;
  public regTemplateId: number = 0;
  public listDropDown = [];
  constructor(
    public service: RegistrationMasterService,
    public fb: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      regTemplateId: new FormControl(''),
      regTemplateName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(1),
      active: new FormControl(true),
      remark: new FormControl({ value: '', disabled: true }),
      registrationTemplateDetailsRequestDTO: new FormGroup({
        regTemplateDetailsId: new FormControl(''),
        regTempStandardFieldId: new FormControl(''),
        fieldName: new FormControl(''),
        displayName: new FormControl(''),
        enable: new FormControl(''),
        mandatory: new FormControl(''),
        dropDownValues: new FormControl({}),
        claimForm: new FormControl(''),
        sequence: new FormControl(''),
        active: new FormControl(),
        nature: new FormControl(''),
      })
    });
    this.getAllFields();
    this.getClaimTemplatesList();
    // this.isView=false;
  }
  get f() { return this.registerForm.controls; }

  //................. Submit claim form.................
  submitClaimMaster() {
    window.scrollTo(0, 0);
    if (this.regTemplateId > 0) {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }

      let isAllSelectField = this.registerGridDataList.every(obj => obj.enable == false);

      if (isAllSelectField) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      } else {
        console.log(this.registerForm.value);
        let postData = this.registerForm.getRawValue();
        this.registerGridDataList.forEach(element => {
          if (element.dropDownValues === null) {
            element.dropDownValues = [];
          }
        })
        postData.registrationTemplateDetailsRequestDTO = this.registerGridDataList;
        console.log("postData", postData);
        this.service.editRegisterData(postData).subscribe((res) => {
          console.log("Claim value", res);
          // this.templateUserIdList.push(res.data.results[0]);
          this.alertService.sweetalertMasterSuccess("Register form updated successfully", "");
          console.log("templateUserId", this.templateUserIdList);
        })
      }
      this.resetForm();

    } else {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      let isallSelectedField = this.registerGridDataList.every(o => o.enable == false);

      if (isallSelectedField) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      } else {
        console.log(this.registerForm.value);
        let postData = this.registerForm.getRawValue();
        postData.registrationTemplateDetailsRequestDTO = this.registerGridDataList;
        console.log("postData", postData);
        this.service.postRegisterData(postData).subscribe((res) => {
          console.log("Claim value", res);
          this.templateUserIdList.push(res.data.results[0]);
          this.alertService.sweetalertMasterSuccess("Register form submitted successfully", "");
          console.log("templateUserId", this.templateUserIdList);
        })
        this.dropdownListData = [];
      }
      this.resetForm();
    }
  }
  // ....................Active remark disabled....................
  activeRemark(event) {
    if (event == false) {
      this.registerForm.controls.remark.enable();
    } else {
      this.registerForm.controls.remark.disable();
    }
  }

  //....................... Get all fields list for selected checkbox list...................
  getAllFields() {
    this.service.getRegistrationFields().subscribe((res) => {
      console.log(res);
      // const nature = { nature: "List" }
      // const returnClaimData = Object.assign(res.data.results[0], nature);
      this.registerGridDataList = res.data.results;
      this.registerGridDataTempList = res.data.results;
      // console.log(" this.registerGridDataList", this.registerGridDataList)
      console.log(" this.registerGridDataList", this.registerGridDataList);
      console.log(" this.registerGridDataTempList", this.registerGridDataTempList);
    })
  }
  //....................... View and Edit post list for selected checkbox list...................
  getClaimTemplateViewById(regTemplateId) {
    window.scrollTo(0, 0);
    this.service.getRegisterTemplateViewById(regTemplateId).subscribe((res) => {
      console.log(res);
      let claimTemplateList = res.data.results[0];
      console.log(claimTemplateList);
      this.registerForm.patchValue(claimTemplateList);
      this.registerForm.disable();
      //  this.registerGridDataList = [];
      this.registerGridDataList = res.data.results[0].registrationTemplateDetailsResponseDTO;
      // this.selectedListElement = res.data.results[0].registrationTemplateDetailsResponseDTO;
      this.isView = true;
      // console.log("this.selectedListElement", this.selectedListElement)

    })

  }
  getClaimTemplateEditById(regTemplateId) {
    this.regTemplateId = regTemplateId;
    window.scrollTo(0, 0);
    this.service.getRegisterTemplateViewById(regTemplateId).subscribe((response) => {
      console.log(response);
      let claimTemplateList = response.data.results[0];
      console.log(claimTemplateList);
      this.registerForm.patchValue(claimTemplateList);
      // this.registerGridDataList = res.data.results[0].registrationTemplateDetailsResponseDTO;
      //  this.selectedListElement = response.data.results[0].registrationTemplateDetailsResponseDTO;
      this.isEdit = true;
      // console.log("this.selectedListElement", this.selectedListElement)
      for (let i = 0; i < response.data.results[0].registrationTemplateDetailsResponseDTO.length; i++) {
        const myobj = {
          regTempStandardFieldId: response.data.results[0].registrationTemplateDetailsResponseDTO[i].regTempStandardFieldId,
          regTemplateDetailsId: response.data.results[0].registrationTemplateDetailsResponseDTO[i].regTemplateDetailsId,
          fieldName: response.data.results[0].registrationTemplateDetailsResponseDTO[i].fieldName,
          displayName: response.data.results[0].registrationTemplateDetailsResponseDTO[i].displayName,
          enable: response.data.results[0].registrationTemplateDetailsResponseDTO[i].enable,
          dropDownValues: response.data.results[0].registrationTemplateDetailsResponseDTO[i].dropDownValues,
          claimForm: response.data.results[0].registrationTemplateDetailsResponseDTO[i].claimForm,
          sequence: response.data.results[0].registrationTemplateDetailsResponseDTO[i].sequence,
          mandatory: response.data.results[0].registrationTemplateDetailsResponseDTO[i].mandatory,
          nature: response.data.results[0].registrationTemplateDetailsResponseDTO[i].nature,
          remark: response.data.results[0].registrationTemplateDetailsResponseDTO[i].remark,
          active: response.data.results[0].registrationTemplateDetailsResponseDTO[i].active,
          // active: 1,
        };
        let s = this.registerGridDataList.findIndex(o => o.fieldName == response.data.results[0].registrationTemplateDetailsResponseDTO[i].fieldName);
        this.registerGridDataList[s] = myobj;
        // this.registersList.splice(s,1);
        // this.registersList.push(myobj);
      }
    })

  }




  //.........................Get all claim template list .................

  getClaimTemplatesList() {
    this.service.getRegisterTemplateList().subscribe((res) => {
      console.log(res);
      this.templateUserIdList = res.data.results;
      console.log("191", this.templateUserIdList);
    })
  }

  // ...........................Select table list data ......................

  checkedListData(index, isChecked, fieldName) {
    console.log("hellow", index, isChecked, fieldName);
    console.log(this.registerGridDataList[index]);
    // this.registerGridDataList[index].enable = isChecked;

    const indexValue = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    console.log("indexvalue", indexValue);
    this.registerGridDataList[indexValue].enable = isChecked;
    this.registerGridDataList[indexValue].mandatory = false;
    this.registerGridDataList[indexValue].claimForm = false;
    this.registerGridDataList[indexValue].dropDownValues = [];
    if (!isChecked) {
      //console.log("registerGridDataTempList::",this.registerGridDataTempList);
    //  const tempIndexValue = this.registerGridDataTempList.findIndex(getIndex => getIndex.fieldName == fieldName);
  
      this.registerGridDataList[indexValue].displayName = '';
    //  console.log("this.registerGridDataTempList[tempIndexValue].displayName", this.registerGridDataTempList[tempIndexValue].displayName)

    }

    // if (isChecked == true) {

    //   // let listData = this.registerGridDataList[index];
    //   // listData.mandatory = false;
    //   // listData.claimForm = false;
    //   // listData.dropDownValues = [];
    //   this.dropdownListData = [];
    //   // this.registerGridDataList.push(listData);
    //   console.log("myvalue", this.registerGridDataList);
    // } else {
    //   this.registerGridDataList[indexValue].enable = isChecked;
    //   this.registerGridDataList[indexValue].mandatory = false;
    //   this.registerGridDataList[indexValue].claimForm = false;
    //   this.registerGridDataList[indexValue].dropDownValues = [];
    //   // this.registerGridDataList.splice(indexValue, 1);
    // }

    console.log("selected value", this.registerGridDataList);
    console.log("registerGridDataList value", this.registerGridDataList);
  }

  // .................... Change Event Pass Value............
  mindatoryChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    if (changeValue == "") {
      let falseValue = "false";
      let indexData = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.registerGridDataList[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
      console.log("mindatory index2", this.registerGridDataList);
    } else {
      let indexData = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.registerGridDataList[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
      console.log("mindatory index", this.registerGridDataList);
    }
  }
  claimChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    if (changeValue == "") {
      let falseValue = "false";
      let indexData = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.registerGridDataList[indexData].claimForm = JSON.parse(falseValue.toLowerCase());
      console.log("claim index2", this.registerGridDataList);
    } else {
      let indexData = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.registerGridDataList[indexData].claimForm = JSON.parse(changeValue.toLowerCase());
      console.log("claim index", this.registerGridDataList);
    }
  }

  displayChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    let indexData = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    this.registerGridDataList[indexData].displayName = changeValue;
    console.log("Display change", this.registerGridDataList);
  }


  // ................Dropdown List Values.................
  getDropdownListvalue(dropList, dropdownListid) {
    console.log("dropdownListid", dropList, dropdownListid);
    this.dropdownListData.push(dropList);
    console.log("dropdownListData", this.dropdownListData);
    this.dropListModel = '';
    let indexField = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.registerGridDataList[indexField].dropDownValues = this.dropdownListData;
    this.listDropDown = this.dropdownListData
    console.log("this.listDropDown", this.listDropDown);
    
  }

  getDropdownListRemove(index, dropdownListid) {
    this.dropdownListData.splice(index, 1);
    console.log("302", this.dropdownListData);
    let indexField = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.registerGridDataList[indexField].dropDownValues = this.dropdownListData;
  }
  resetForm() {
    window.scrollTo(0, 0);
    this.registerGridDataList = [];
    this.registerForm.reset({
      active: new FormControl(true),
    });
    this.getAllFields();
    this.isView = false;
    this.isEdit = false;
    this.registerForm.enable();
    this.registerForm.controls.remark.disable();

  }
  // ....................Popup box section...................

  modalDropdownList(template: TemplateRef<any>, srno: any, fieldName: string) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    // if (this.dropdownListData.length !== 0) {
      console.log("modal select box", this.registerGridDataList);
      let index = this.registerGridDataList.find(element => element.fieldName == fieldName)
      this.dropdownListData = index.dropDownValues;
      console.log("listdata", this.dropdownListData);

      console.log("dropno", this.dropdownListid);
    // }
    this.dropdownListid = fieldName;
    console.log(this.dropdownListid);
  }


}
