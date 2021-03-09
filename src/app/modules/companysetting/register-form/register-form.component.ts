import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationMasterService } from './registration-master.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { element } from 'protractor';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  public usernameModel: string;
  public selectedCheckBox = [];
  public forManipulation = [];
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public registersList = [];
  public registersLists: any;
  public isMindatory = true;
  public isClaim = true;
  public modalRef: BsModalRef;
  public isRemarkDisabled = true;
  public Less: any;
  public productForm: FormGroup;
  public dropArraylist = [];
  public users = [];
  public templateUser = [];
  public templateView = [];
  public selectFieldList = [];
  public registerPost = true;
  public registerView = false;
  public registerUpdate = false;
  public regTempId: number = 0;
  // public isActive = true;
  constructor(
    private registrationService: RegistrationMasterService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
  ) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      regTemplateId: new FormControl(''),
      regTemplateName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(''),
      isActive: new FormControl(true),
      remark: new FormControl({ value: '', disabled: true }),
      statusActive: new FormControl(''),
      registrationTemplateDetailsRequestDTO: new FormGroup({
        regTempStandardFieldId: new FormControl(''),
        fieldName: new FormControl(''),
        displayName: new FormControl(''),
        enable: new FormControl(),
        mandatory: new FormControl(),
        dropDownValues: new FormGroup({}),
        claimForm: new FormControl(''),
        sequence: new FormControl(''),
        active: new FormControl(''),

      }),
    })

    this.getAllFields();
    this.getTemplateFields();
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if(this.regTempId > 0){
      console.log('add update logic here');
      
      let saveArray = [];
      // for (let i = 0; i < this.selectedCheckBox.length; i++) {
      //   let obj = {
      //     regTempStandardFieldId: this.selectedCheckBox[i].regTempStandardFieldId,
      //     fieldName: this.selectedCheckBox[i].fieldName,
      //     displayName: this.selectedCheckBox[i].displayName,
      //     enable: this.selectedCheckBox[i].enable,
      //     dropDownValues: this.selectedCheckBox[i].dropDownValues,
      //     claimForm: this.selectedCheckBox[i].claimForm,
      //     sequence: this.selectedCheckBox[i].sequence,
      //     mandatory: this.selectedCheckBox[i].mandatory
      //   }
      //   saveArray.push(obj);
      // }
  
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      if (this.selectedCheckBox.length === 0) {
        this.alertService.sweetalertWarning('please select any one field list')
        return
      } else {
        this.loading = true;
        console.log("this.registerForm.value", this.registerForm.value);
        let data = this.registerForm.getRawValue();
        // let object3 = { ...data, ...saveArray[0] };
        // console.log('check', JSON.stringify(object3));
        console.log(data);
        // data.registrationTemplateDetailsRequestDTO = saveArray;
        // data.registrationTemplateDetailsRequestDTO.dropDownValues =  this.getDroplist ;
        // const postdata = this.selectedCheckBox;
        data.registrationTemplateDetailsRequestDTO = this.selectedCheckBox;
        console.log("data", data);
        this.registrationService.editRegisterData(data).subscribe((res) => {
          console.log("register value", res);
          // this.templateUser = res.data.results[0];
          // this.templateData.push(this.templateUser);
          this.alertService.sweetalertMasterSuccess("Register form submited successfully.", "")
        })
      }
      this.registerForm.reset({
        isActive: new FormControl(true),
      });
      this.registerForm.controls.remark.disable();
      this.selectedCheckBox = [];
      
    } else {
      let saveArray = [];
      // for (let i = 0; i < this.selectedCheckBox.length; i++) {
      //   let obj = {
      //     regTempStandardFieldId: this.selectedCheckBox[i].regTempStandardFieldId,
      //     fieldName: this.selectedCheckBox[i].fieldName,
      //     displayName: this.selectedCheckBox[i].displayName,
      //     enable: this.selectedCheckBox[i].enable,
      //     dropDownValues: this.selectedCheckBox[i].dropDownValues,
      //     claimForm: this.selectedCheckBox[i].claimForm,
      //     sequence: this.selectedCheckBox[i].sequence,
      //     mandatory: this.selectedCheckBox[i].mandatory
      //   }
      //   saveArray.push(obj);
      // }
  
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      if (this.selectedCheckBox.length === 0) {
        this.alertService.sweetalertWarning('please select any one field list')
        return
      } else {
        this.loading = true;
        console.log("this.registerForm.value", this.registerForm.value);
        let data = this.registerForm.getRawValue();
        // let object3 = { ...data, ...saveArray[0] };
        // console.log('check', JSON.stringify(object3));
        console.log(data);
        // data.registrationTemplateDetailsRequestDTO = saveArray;
        // data.registrationTemplateDetailsRequestDTO.dropDownValues =  this.getDroplist ;
        // const postdata = this.selectedCheckBox;
        data.registrationTemplateDetailsRequestDTO = this.selectedCheckBox;
        console.log("data new", data);
        this.registrationService.postRegisterData(data).subscribe((res) => {
          console.log("register value", res);
          this.templateUser = res.data.results[0];
          this.templateData.push(this.templateUser);
          this.alertService.sweetalertMasterSuccess("Register form submited successfully.", "")
        })
      }
      this.registerForm.reset({
        isActive: new FormControl(true),
      });
      this.registerForm.controls.remark.disable();
      this.selectedCheckBox = [];
      
    }
   
  }

  checkModel(i: string, isChecked: boolean,fieldName:string) {
    console.log("checkvalue  ", i, isChecked);
    console.log(this.registersList[i]);
    this.registersList[i].enable = isChecked;
    // if user checked checkbox then add row data
    // if user unselect checkbox then remove existing object from
    this.users = [];
    if (isChecked == true) {
      let a = this.registersList[i];
      a.mandatory = false;
      a.claimForm = false;
      this.selectedCheckBox.push(a);
      
    } else {
      const index = this.selectedCheckBox.indexOf(fieldName);
      this.selectedCheckBox.splice(index, 1);
      // unselect asel tar find index kara cha aani remove
    }
    console.log("this.selectedCheckBox::", this.selectedCheckBox);
     

  }
  templateData = [];
  getTemplateFields() {
    this.registrationService.getTemplateFields().subscribe((response) => {
      console.log(response);
      this.templateData = response.data.results;
    })
  }
  getAllFields() {
    // this.registersLists={};
    this.registrationService.getRegistrationFields().subscribe((response) => {
    this.registersLists = response.data.results;
    console.log("register", response);
      let i = 1;
      response.data.results.forEach(element => {
        const myobj = {
          srno: i++,
          regTempStandardFieldId: element.regTempStandardFieldId,
          fieldName: element.fieldName,
          displayName: element.displayName,
          enable: element.enable,
          dropDownValues: element.dropDownValues,
          claimForm: element.claimForm,
          sequence: element.sequence,
          mandatory: element.mandatory,
          nature: element.nature,
          remark: element.remark,
          isActive: element.isActive,
        };
        this.forManipulation.push(myobj);

        this.registersList.push(myobj);
        // console.log("registerlist" + this.registersList);
      });
      console.log(this.registersList);
    });
  }


  getTemplateViewData(regTempId) {
    this.registerPost = false;
    this.registerView = true;
    this.registrationService.getRegisterTemplateData(regTempId).subscribe((response) => {
      console.log(response)
      this.templateView = response.data.results[0];
      this.selectFieldList = response.data.results[0].registrationTemplateDetailsResponseDTO;
      console.log(this.templateView);
      console.log(this.selectFieldList);
    })
  }
  editTemplateViewData(regTempId) {
    this.regTempId = regTempId;
    console.log(regTempId);
    this.registerUpdate = true;
    this.registerPost = false;
    this.registrationService.getRegisterTemplateData(regTempId).subscribe((response) => {
      console.log(response)
      this.templateView = response.data.results[0];
      this.selectFieldList = response.data.results[0].registrationTemplateDetailsResponseDTO;
      for (let i = 0; i < response.data.results[0].registrationTemplateDetailsResponseDTO.length; i++) {
        const myobj = {
          srno: 99,
          regTempStandardFieldId: response.data.results[0].registrationTemplateDetailsResponseDTO[i].regTempStandardFieldId,
          fieldName: response.data.results[0].registrationTemplateDetailsResponseDTO[i].fieldName,
          displayName: response.data.results[0].registrationTemplateDetailsResponseDTO[i].displayName,
          enable: response.data.results[0].registrationTemplateDetailsResponseDTO[i].enable,
          dropDownValues: response.data.results[0].registrationTemplateDetailsResponseDTO[i].dropDownValues,
          claimForm: response.data.results[0].registrationTemplateDetailsResponseDTO[i].claimForm,
          sequence: response.data.results[0].registrationTemplateDetailsResponseDTO[i].sequence,
          mandatory: response.data.results[0].registrationTemplateDetailsResponseDTO[i].mandatory,
          nature: response.data.results[0].registrationTemplateDetailsResponseDTO[i].nature,
          remark: response.data.results[0].registrationTemplateDetailsResponseDTO[i].remark,
          isActive: response.data.results[0].registrationTemplateDetailsResponseDTO[i].isActive,
        };
        let s = this.registersList.findIndex(o=>o.fieldName == response.data.results[0].registrationTemplateDetailsResponseDTO[i].fieldName);
       this.registersList[s]=myobj;
        // this.registersList.splice(s,1);
        // this.registersList.push(myobj);
      }
      console.log(this.templateView);
      console.log(this.selectFieldList);


      this.registerForm.patchValue(
        this.templateView);
        console.log(this.registerForm);
        this.selectedCheckBox = response.data.results[0].registrationTemplateDetailsResponseDTO;
        console.log("selected", this.selectedCheckBox);
    });
 

  }
  // updateForm(){
  //   this.registrationService.editRegisterData().subscribe((response)=>{
  //     console.log(response)
  //   })
  // }
  cancelForm() {
    this.registerPost = true;
    this.registerView = false;
  }
  cancelForm2() {
    this.registerPost = true;
    this.registerUpdate = false;
  }
  activeRemark(remarkEvent) {
    console.log(remarkEvent);
    if (remarkEvent == false) {
      this.registerForm.controls.remark.enable();
    } else {
      this.registerForm.controls.remark.disable();
    }

  }
  displayChange(i, evt,fieldName) {
    console.log(i, evt, this.forManipulation);
    let index = this.forManipulation.findIndex(o => o.fieldName == fieldName);
    console.log('index is',index);
    this.forManipulation[index].displayName = evt;

    console.log(this.forManipulation);

  }
  mindatoryChange(i, evt,fieldName) {
    console.log(i, evt);
    let index = this.forManipulation.findIndex(o => fieldName == fieldName);
    this.forManipulation[index].mandatory = evt;
    console.log(this.selectedCheckBox);
  }
  claimChange(i, evt,fieldName) {
    console.log(i, evt);
    let index = this.forManipulation.findIndex(o => fieldName == fieldName);
    this.forManipulation[index].claimForm = evt;
  }

  //add table code
  addDroplist(droplist) {
    this.dropArraylist.push(droplist);
    console.log(this.dropArraylist);
  }
  removeDroplist(i) {
    this.dropArraylist.splice(i, 1);
  }

  getDroplist: any;
  getUsers(uname, dropno) {
    console.log("new selectdata", this.selectedCheckBox);
    this.users.push(uname);
    //  this.username.nativeElement.value = '';
    console.log(this.users);
    console.log(dropno);
    this.usernameModel = '';
    //  const index = this.selectedCheckBox.find(dno=>dno.regTempStandardFieldId=dropno);
    // console.log("ss", index);
    // index.dropDownValues = this.users;
    //  console.log("index.dropDownValues", index);
    // this.selectedCheckBox.push(index)
    console.log(" this.selectedCheckBox", this.selectedCheckBox);
    // this.getDroplist = this.users, dropno;
    let index = this.selectedCheckBox.findIndex(o => o.fieldName == dropno);
    this.selectedCheckBox[index].dropDownValues = this.users;

    console.log(this.selectedCheckBox);
    console.log('this.users',this.users);
  }

  getremoveone(i, fieldName) {
    this.users.splice(i, 1);
    console.log(this.users);
    let index =this.registersList.findIndex(o=>o.fieldName == fieldName);
    this.registersList[index].dropDownValues = this.users;
  }
  //close add table code

  //modal box code
  modalRegistration(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  public dropno: any;
  modalRegistration2(template: TemplateRef<any>, srno: any,fieldName:string) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    if(this.users.length !==0){
      console.log("modal select box", this.selectedCheckBox);    
      let index = this.selectedCheckBox.find(element=>element.fieldName == fieldName)
      this.users = index.dropDownValues;
      console.log(this.users);
     
      console.log("dropno", this.dropno);
    }
    this.dropno = fieldName;
   
  }
  editMaster() {

  }

  //close modal box code

}