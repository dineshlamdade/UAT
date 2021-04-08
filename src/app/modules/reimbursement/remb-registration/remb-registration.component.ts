import { Component, EventEmitter, Input, OnInit, Output, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { RembRegistrationService } from './remb-registration.service';


@Component({
  selector: 'app-remb-registration',
  templateUrl: './remb-registration.component.html',
  styleUrls: ['./remb-registration.component.scss']
})
export class RembRegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public submitted = false;
  public headMasterList: Array<any> = [];
  public headMasterList2: Array<any> = [];
  public headId: number = 13;
  public modalRef: BsModalRef;
  public masterfilesArray: File[] = [];
  public documentRemark: any;
  public alltemplates:Array<any> = [];
  constructor(
    public service: RembRegistrationService,
    public fb: FormBuilder,
    public router: Router,
    public alertService: AlertServiceService,
    private modalService: BsModalService,

  ) {


  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      communicationType: new FormControl('', Validators.required),
      serviceprovider: new FormControl('', Validators.required),
      telephoneNo: new FormControl('', Validators.required),
      remark: new FormControl({ value: '', disabled: true }),
      active: new FormControl(true),
      internetNo: new FormControl(''),
      reimEmpRegistrationId: new FormControl(0),
      groupCompanyId: new FormControl(1),
      employeeMasterId: new FormControl(5),
      reimbursementMasterGeneralSettingId: new FormControl(115),
      regTemplateId: new FormControl(91),
      proofSubmissionId: new FormControl(1),
      typeofVehicle: new FormControl(''),
      vehicleNo: new FormControl(''),
      ownership: new FormControl(''),
      usageofVehicle: new FormControl(''),
      hP: new FormControl(''),
      fuelType: new FormControl(''),
      mileage: new FormControl(''),
      driver: new FormControl(''),
      productNo: new FormControl(''),
      productName: new FormControl(''),
      fieldDate1: new FormControl(''),
      fieldDate2: new FormControl(''),
      fieldDropdown1: new FormControl(''),
      fieldDropdown2: new FormControl(''),
      textField1: new FormControl(''),
      textField2: new FormControl(''),
      radioButton1: new FormControl(''),
      radioButton2: new FormControl(''),
      checkBox1: new FormControl(''),
      checkBox2: new FormControl(''),

    });

    this.getHeadMasterFields(this.headId);
    this.getAllTemplates();
  }

  get f() { return this.registrationForm.controls; }

  submitRegisterMaster() {
    window.scrollTo(0, 0);
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    console.log("this.registrationForm", this.registrationForm.value);
    let postData = this.registrationForm.getRawValue();
    this.service.postRegisterData(postData).subscribe((res) => {
      console.log("Register form", res);
      this.alertService.sweetalertMasterSuccess("Register form successfully", "");
      // console.log("template list", )
    });


  }




  // check event activedeactive  

  activeMark(checked) {
    if (checked == false) {
      this.registrationForm.controls.remark.enable();
    } else {
      this.registrationForm.controls.remark.disable();
    }
  }


  // Get all field list

  getHeadMasterFields(headId) {
    this.service.getHeadMasterFields(headId).subscribe((res) => {
      this.headMasterList = res.data.results;
      console.log("myhead", res);
      this.headMasterList = res.data.results[0].registrationTemplateDetailsResponseDTO[0].dropDownValues;
      this.headMasterList2 = res.data.results[0].registrationTemplateDetailsResponseDTO[1].dropDownValues;
    })
  }




  getAllTemplates() {
    this.service.getAllTemplates().subscribe((res) => {
      console.log("res data", res);
      this.alltemplates = res.data.results[0];
    })
  }

  // document upload modal box

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }



  onMasterUpload(event: { target: { files: string | any[] } }) {
    //console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
      }
    }
    //console.log('this.masterfilesArray::', this.masterfilesArray);
  }

  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    //console.log('this.filesArray::', this.masterfilesArray);
    //console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

}
