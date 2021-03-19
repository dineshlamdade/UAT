import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationMasterService } from './registration-master.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
 
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
  // public isActive = true;
  constructor(
    private registrationService: RegistrationMasterService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private alertService:AlertServiceService,
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
      remark: new FormControl({value: '', disabled: true}),
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
    if(this.selectedCheckBox.length === 0){
      this.alertService.sweetalertWarning('please select any one field list')
      return
    }else{
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

  checkModel(i: string, isChecked: boolean) {
    console.log("checkvalue  ", i, isChecked);
    console.log(this.registersList[i]);
    this.registersList[i].enable = isChecked;
    // if user checked checkbox then add row data
    // if user unselect checkbox then remove existing object from
    this.users = [];
    if (isChecked == true) {
      this.selectedCheckBox.push(this.registersList[i]);
    } else {
      const index = this.selectedCheckBox.indexOf(this.registersList[i].srno);
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
      // this.registersLists = response.data.results;
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


  getTemplateViewData(regTempId){
    this.registerPost = false;
    this.registerView = true;
    this.registrationService.getRegisterTemplateData(regTempId).subscribe((response)=>{
      console.log(response)
      this.templateView = response.data.results[0];
      this.selectFieldList = response.data.results[0].registrationTemplateDetailsResponseDTO;
      console.log(this.templateView);
      console.log(this.selectFieldList);
    })
  }
  editTemplateViewData(regTempId){
 console.log(regTempId);
 this.registerUpdate = true;
 this.registerPost = false;
 
  }
  cancelForm(){
    this.registerPost = true;
    this.registerView = false;
  }
  activeRemark(remarkEvent) {
    console.log(remarkEvent);
    if (remarkEvent == false) {
      this.registerForm.controls.remark.enable();
    } else {
      this.registerForm.controls.remark.disable();
    }
  
  }
  displayChange(i, display) {
    console.log(i, display, this.forManipulation);
    let index = this.forManipulation.findIndex(o => o.srno == i + 1);
    this.forManipulation[index].displayName = display;

    console.log(this.forManipulation);

  }
  mindatoryChange(i, mindatory) {
    console.log(i, mindatory);
    let index = this.forManipulation.findIndex(o => o.srno == i + 1);
    this.forManipulation[index].mandatory = mindatory;
  }
  claimChange(i, claim) {
    console.log(i, claim);
    let index = this.forManipulation.findIndex(o => o.srno == i + 1);
    this.forManipulation[index].claimForm = claim;
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
    let index = this.selectedCheckBox.findIndex(o => o.srno == dropno);
    this.selectedCheckBox[index].dropDownValues = this.users;

    console.log(this.selectedCheckBox);
  }

  getremoveone(i) {
    this.users.splice(i, 1);
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
  modalRegistration2(template: TemplateRef<any>, srno: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    console.log("modal select box", this.selectedCheckBox);
    console.log("srno", srno);
    this.dropno = srno;
    console.log("dropno", this.dropno);
  }
  editMaster(){

  }

  //close modal box code

}