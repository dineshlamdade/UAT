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
  public regTemplateId: number = 0;
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
      if (this.claimGridDataList.length === 0) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      } else {
        console.log(this.registerForm.value);
        let postData = this.registerForm.getRawValue();
        this.claimGridDataList.forEach(element => {
          if (element.dropDownValues === null) {
            element.dropDownValues = [];
          }
        })
        postData.registrationTemplateDetailsRequestDTO = this.claimGridDataList;
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
      console.log(this.registerForm.value);
      let postData = this.registerForm.getRawValue();
      postData.registrationTemplateDetailsRequestDTO = this.claimGridDataList;
      console.log("postData", postData);
      this.service.postRegisterData(postData).subscribe((res) => {
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
      this.claimGridDataList = res.data.results;
      console.log(" this.claimGridDataList", this.claimGridDataList)
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
      //  this.claimGridDataList = [];
      this.claimGridDataList = res.data.results[0].registrationTemplateDetailsResponseDTO;
      // this.selectedListElement = res.data.results[0].registrationTemplateDetailsResponseDTO;
      this.isView = true;
      console.log("this.selectedListElement", this.selectedListElement)

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
      // this.claimGridDataList = res.data.results[0].registrationTemplateDetailsResponseDTO;
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
        let s = this.claimGridDataList.findIndex(o => o.fieldName == response.data.results[0].registrationTemplateDetailsResponseDTO[i].fieldName);
        this.claimGridDataList[s] = myobj;
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
    console.log("claimGridDataList value", this.claimGridDataList);
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
  resetForm() {
    window.scrollTo(0, 0);
    this.selectedListElement = [];
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
    this.dropdownListid = fieldName;
    console.log(this.dropdownListid);
  }


}
