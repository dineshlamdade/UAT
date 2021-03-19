import { Component, OnInit } from '@angular/core';
import { RegistrationMasterService } from './registration-master.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public registersList = [];
  public registersLists: any;
  public isMindatory = true;
  public isClaim = true;
  public modalRef: BsModalRef;
  public remarks = true;
  public Less: any;
  public productForm: FormGroup;

  constructor(
    private registrationService: RegistrationMasterService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
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
      isActive: new FormControl(''),
      remark: new FormControl(''),
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
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm.value);
    console.log(this.productForm.value);
    let data = this.registerForm.getRawValue();
    console.log(data);

    // let obj = JSON.parse(this.productForm.value);
    // let myval = Object.values(obj);
    // console.log(myval);
    for (var make in this.productForm.value) {
      for (var i = 0; i < this.productForm.value[make].length; i++) {
          var model = this.productForm.value[make][i].qty.toString();
      
          console.log(model);
      }
  }
    // let myobj = Object.keys(obj).map(function (key) {return obj[key];});
    // console.log(myobj);
    // let sd;
    // for(let i=0; i<this.productForm.value; i++){
    //   if(i==0){
    //     sd = this.productForm.value[i];
    //   }else{
    //     sd =','+ sd + this.productForm.value[i];
    //   }
    // }
    // console.log(sd);
  //  let sd;
  //   sd = this.productForm.value.join(",");
  //   data.registrationTemplateDetailsRequestDTO.dropDownValues = sd;
  //   console.log(sd);  
    for(let values of Object.values(this.productForm.value)){
      console.log(values);
    }
    // let s;
    // for(let i=0;i<this.productForm.value.length; i++){
    //   if(i == 0){
    //     s=this.productForm.value[i];

    //   }else{
    //     s=','+s+this.productForm.value[i];

    //   }

    // }
    // console.log('ssss',s);
    //         data.registrationTemplateDetailsRequestDTO.dropDownValues = s;
  

    // console.log(JSON.stringify(data));
  }

  checkModel(event2: string, isChecked: boolean) {
    console.log("checkvalue  ", event2, isChecked);
    this.registersList[event2].enable = isChecked;
  }

  getAllFields() {
    // this.registersLists={};
    this.registrationService.getRegistrationFields().subscribe((response) => {
      // this.registersLists = response.data.results;
      let i = 1;
      response.data.results.forEach(element => {
        const myobj = {
          srno: i++,
          fieldName: element.fieldName,
          displayName: element.displayName,
          enable: element.enable,
          dropDownValues: element.dropDownValues,
          claimForm: element.claimForm,
          sequence: element.sequence,
          mandatory: element.mandatory
        };
        this.registersList.push(myobj);
        // console.log("registerlist" + this.registersList);
      });
      console.log(this.registersList);
    });
  }
  activeRemark(remarkEvent) {
    // console.log(remarkEvent);
    if (remarkEvent == false) {
      this.remarks = false;
    } else {
      this.remarks = true;
    }
  }
  displayChange(display) {
    console.log(display);
  }
  mindatoryChange(mindatory) {
    console.log(mindatory);
  }
  claimChange(claim) {
    console.log(claim);
  }

  //add table code

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      // qty: '',
    })
  }
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  resetQuantity() {
    this.quantities().reset();
  }
  onSubmit2() {
    console.log(this.productForm.value);


  }
  //close add table code

//modal box code
  modalRegistration(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  modalRegistration2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
//close modal box code

}