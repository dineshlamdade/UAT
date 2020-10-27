import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
'use strict';
// import * as input from '@grapecity/wijmo.input';
import { PersonalInformationModel, internationalWorkerRequestDTO } from './../../dto-models/personal-information.model';
import { PersonalInformationService } from './../../employee-master-services/personal-information/personal-information.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
// import { DomSanitizer } from '@angular/platform-browser';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
import { MatDialog } from '@angular/material/dialog';
// import { CopyFromConfirmationModal } from '../contact-information/contact-information.component';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ConfirmationModalComponent } from '../../shared modals/confirmation-modal/confirmation-modal.component';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';
import { PersonalInfoLabels } from '../../dto-models/personal-info-labels.model';

// import { CommonDataService } from './../../core/services/common-data-service/common-data.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalInformationComponent implements OnInit {

  personalInfoForm: FormGroup;
  BasicInfoForm: FormGroup;
  // personalInformationModel: Array<PersonalInformationModel> =[];
  personalInformationModel = new PersonalInformationModel('', '', '', '', '', '', '', '', '', '', '');
  internationalWorkerRequestDTO = new internationalWorkerRequestDTO('', '', '', '', '', '')
  PersonalInfoLabels = new PersonalInfoLabels('Title', 'First Name', 'Middle Name', 'Last Name', 'Full Name', 'Display Name', 'Employee Code', 'Alternate Code', 'Date of Birth', 'Gender', 'Blood Group', 'Nationality', 'Marital Status', 'Marriage Date', 'Physically Challenged', 'Disability Type', 'Severity Level', 'Expat', 'Country Of Origin', 'Whether On COC', 'COC Valid Till', 'COC No.', '', '', '','','')
  bloodGroups = 'A+,A-,B+,B-,AB+,AB-,O+,O-'.split(',');
  maritalStatus = 'Single,Married,Widow,Widower,Divorced'.split(',');
  physicallyChallengedDropdown = 'Visual,Hearing,Locomotive'.split(',');
  physicallyChallengedBoolean = 'Yes,No'.split(',');
  expatBooleanOptions = 'Yes,No'.split(',');
  weatherOnCOCOptions = 'Yes,No'.split(',');
  allGenders = 'Male,Female,Trans'.split(',');
  @Input() staticLabels: boolean;
  @Input() item: any
  physicallyChallenged: any
  countryList: Array<any> = [];
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "./assets/emp-master-images/empIcon5.png";
  editFile: boolean = true;
  removeUpload: boolean = false;
  selectedImg: any;
  fullName: any;
  title = ""; FirstName = ""; MiddleName = ""; LastName = "";
  displayName: any;
  gender1: any;
  exportFullNameToIdentityInformation: any;
  selectedImageFile: any;
  employeeMasterId: number;
  Physically: any;
  tomorrow = new Date();
  clearBirthDateSubsribtion: Subscription;
  byteCode: any;
  weatherOnCOC1: any;
  expatBoolean1: any;
  autoCompleteControl;
  newData: Array<any> = [];
  countryCode: Array<any> = [];
  shareCountryInfo = { countryCode: [], countryList: [] }
  cocValidTill1: Date;
  cocValidTill2: Date;
  ToEmpMasterSubscription: Subscription;
  selectionEmploymentBoolean: any;
  public today = new Date();
  changesLabelArray: Array<any> = [];


  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private PersonalInformationService: PersonalInformationService,
    private EventEmitterService: EventEmitterService,
    public dialog: MatDialog, public datepipe: DatePipe,
    private SharedInformationService: SharedInformationService) { }

  ngOnInit(): void {
    this.BasicInfoForm = this.formBuilder.group({
      employeeCode: ['', Validators.required],
      alternateCode: [''],
      title: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      fullName: [{ value: null, disabled: true },],
      displayName: [''],
      birthDate: [this.tomorrow, Validators.required],
      bloodGroup: [''],
      maritalStatus: [''],
      nationality: [''],
      marriageDate: [this.tomorrow],
      severityLevel: [{ value: '', disabled: true },],
      physicallyChallengedBoolean: [''],
      physicallyChallengedOption: [''],
      gender: ['', Validators.required],
      image: [''],
      isExpatWorker: [''],
      countryOfOrigin: [''],
      isOnCOC: [{ value: null, disabled: true },],
      cocNo: [''],
      cocValidTill: [''],
      PersonalAdditional1: [''],
      PersonalAdditional2: ['']
    });


    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    if (this.employeeMasterId) {
      this.getEmployeeData();
    }

    this.clearBirthDateSubsribtion = this.EventEmitterService.setClearBirthDate().subscribe(res => {
      this.clearBirthDate.reset();
      this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = '';
    })

    this.PersonalInformationService.getLocationInformation().subscribe(res => {
      this.countryList = res.data.results;

      this.PersonalInformationService.getCountryCodes().subscribe(res => {
        this.countryCode = res.data.results;

        // if (this.newData['data']) {
        //   this.getDataBinding(this.newData);
        // }
        if (this.countryCode.length > 0 && this.countryList.length > 0) {
          this.shareCountryInfo.countryCode = this.countryCode;
          this.shareCountryInfo.countryList = this.countryList;
          // this.shareCountryInfo['selectionEmploymentBoolean'] = this.selectionEmploymentBoolean
          this.EventEmitterService.getCountryData(this.shareCountryInfo);
        }
      })
    })

    this.SharedInformationService.getGlobalLabels().subscribe(res => {

      this.changesLabelArray = res.data.results.filter(item => {
        // Change Label's name as per Company setting
        if (item.isDisplay == true && item.defaultLabelName == 'Title') {
          this.PersonalInfoLabels.title = item.customLabelName;
        }
        if (item.isDisplay == true && item.defaultLabelName == 'First Name') {
          this.PersonalInfoLabels.firstName = item.customLabelName;
        }
        if (item.isDisplay == true && item.defaultLabelName == 'Date of Birth') {
          this.PersonalInfoLabels.dateOfBirth = item.customLabelName;
        }
        if (item.isDisplay == true && item.defaultLabelName == 'Middle Name') {
          this.PersonalInfoLabels.middleName = item.customLabelName;
        }
        if (item.isDisplay == true && item.defaultLabelName == 'Last Name') {
          this.PersonalInfoLabels.lastName = item.customLabelName;
        }
        
        
        // Hide Labels As per Company setting
        if (item.isDisplay == false && item.defaultLabelName == 'Title') {
          this.PersonalInfoLabels.title = '';
        }
        if (item.isDisplay == false && item.defaultLabelName == 'Gender') {
          this.PersonalInfoLabels.gender = '';
        }
        if (item.isDisplay == false && item.defaultLabelName == 'Date of Birth') {
          this.PersonalInfoLabels.dateOfBirth = '';
        }
        if (item.isDisplay == false && item.defaultLabelName == 'Middle Name') {
          this.PersonalInfoLabels.middleName = '';
        }
        if (item.isDisplay == false && item.defaultLabelName == 'First Name') {
          this.PersonalInfoLabels.firstName = '';
        }
        if (item.isDisplay == false && item.defaultLabelName == 'Last Name') {
          this.PersonalInfoLabels.lastName = '';
        }
      })
    })

    this.SharedInformationService.getAdditionalFields().subscribe(res=>{
      debugger
      res.data.results.filter(item => {
        if(item.fieldName == 'PersonalAdditional1'){
          this.PersonalInfoLabels.PersonalAdditional1 = item.fieldLabelName;
        }
        if(item.fieldName == 'PersonalAdditional2'){
          this.PersonalInfoLabels.PersonalAdditional2 = item.fieldLabelName;
        }
      })
    })
  }

  severity(event) {

    this.personalInformationModel.severityLevel = event;
  }

  // Personal Info Form Submit Function
  personalInfoSubmit(personalInformationModel) {

    personalInformationModel.employeeMasterRequestDTO.dateOfBirth =
      this.datepipe.transform(personalInformationModel.employeeMasterRequestDTO.dateOfBirth, "dd-MMM-yyyy");

    personalInformationModel.anniversaryDate =
      this.datepipe.transform(personalInformationModel.anniversaryDate, "dd-MMM-yyyy");

    this.internationalWorkerRequestDTO.cocValidTill =
      this.datepipe.transform(this.internationalWorkerRequestDTO.cocValidTill, "dd-MMM-yyyy");
    const body: FormData = new FormData();
    body.append('file', this.selectedImageFile);

    personalInformationModel.employeeMasterRequestDTO.companyId = 1111;
    if (this.employeeMasterId) {
      personalInformationModel.employeeMasterRequestDTO.employeeMasterId = this.employeeMasterId
    }
    if (this.BasicInfoForm.value.physicallyChallengedBoolean == 'Yes') {
      personalInformationModel.isPhysicallyChallenged = 1;
    } else {
      personalInformationModel.isPhysicallyChallenged = 0;
    }
    if (this.BasicInfoForm.value.isExpatWorker == 'Yes') {
      this.internationalWorkerRequestDTO.isExpatWorker = 1;
    } else {
      this.internationalWorkerRequestDTO.isExpatWorker = 0;
    }
    if (this.BasicInfoForm.value.isOnCOC == 'Yes') {
      this.internationalWorkerRequestDTO.isOnCOC = 1;
    } else {
      this.internationalWorkerRequestDTO.isOnCOC = 0;
    }
    // this.internationalWorkerRequestDTO.employeeMasterId = this.employeeMasterId
    // this.internationalWorkerRequestDTO.countryOfOrigin = this.BasicInfoForm.value.countryOfOrigin
    // this.internationalWorkerRequestDTO.cocNo = this.BasicInfoForm.value.cocNo
    // this.internationalWorkerRequestDTO.cocValidTill = this.BasicInfoForm.value.cocValidTill
    personalInformationModel.internationalWorkerRequestDTO = this.internationalWorkerRequestDTO;

    body.append('requestDTOString', JSON.stringify(personalInformationModel));

    if (this.employeeMasterId) {
      return this.PersonalInformationService.updatePersonalInfoForm(body, this.employeeMasterId).subscribe((res) => {

        this.personalInformationModel = res.data.results[0];
        this.personalInformationModel.employeeMasterRequestDTO = res.data.results[0].employeeMasterResponseDTO
        this.internationalWorkerRequestDTO = res.data.results[0].internationalWorkerResponseDTO;
        localStorage.setItem('employeeMasterId', res.data.results[0].employeeMasterId);
        localStorage.setItem('birthDate', this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
        // this.EventEmitterService.getBirthDateToEmploymentForm(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
        localStorage.setItem('employeeCode', res.data.results[0].employeeMasterResponseDTO.employeeCode)
        this.EventEmitterService.getUpdateEmployeeId(res.data.results[0].employeeMasterId);
        this.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        // this.notifyService.showSuccess(res.status.messsage, "Success..!!")
        this.BasicInfoForm.markAsUntouched();
        this.imageUrl = 'data:' + res.data.results[0].imageResponseDTO.employeeProfileImage.type + ';base64,' + res.data.results[0].imageResponseDTO.employeeProfileImage.profilePicture;
      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    } else {
      return this.PersonalInformationService.postPersonalInfoForm(body).subscribe((res) => {
        this.employeeMasterId = res.data.results[0].employeeMasterId;
        this.personalInformationModel = res.data.results[0];
        this.personalInformationModel.employeeMasterRequestDTO = res.data.results[0].employeeMasterResponseDTO;
        localStorage.setItem('birthDate', this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
        // this.EventEmitterService.getBirthDateToEmploymentForm(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);

        if (res.data.results[0].imageResponseDTO) {
          this.imageUrl = 'data:' + res.data.results[0].imageResponseDTO.employeeProfileImage.type + ';base64,' + res.data.results[0].imageResponseDTO.employeeProfileImage.profilePicture;
        }
        localStorage.setItem('employeeMasterId', res.data.results[0].employeeMasterId);
        localStorage.setItem('employeeCode', res.data.results[0].employeeMasterResponseDTO.employeeCode);
        this.EventEmitterService.getUpdateEmployeeId(res.data.results[0].employeeMasterId);
        this.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        this.BasicInfoForm.markAsUntouched();
      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    }
  }
  getEmployeeData() {

    this.PersonalInformationService.getEmployeeData(this.employeeMasterId).subscribe((res: any) => {
      this.newData = res;
      this.getDataBinding(res);
    })
  }

  // Get data binding Function
  getDataBinding(res) {

    this.personalInformationModel = res.data.results[0];
    this.personalInformationModel.employeeMasterRequestDTO = res.data.results[0].employeeMasterResponseDTO;

    this.EventEmitterService.getBirthDateToEmploymentForm(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
    if (res.data.results[0].imageResponseDTO) {
      this.imageUrl = 'data:' + res.data.results[0].imageResponseDTO.employeeProfileImage.type + ';base64,' + res.data.results[0].imageResponseDTO.employeeProfileImage.profilePicture;
    }
    // this.severity(this.personalInformationModel.severityLevel);
    // this.BasicInfoForm.patchValue({ severityLevel: this.personalInformationModel.severityLevel });
    if (res.data.results[0].isPhysicallyChallenged == 0) {
      this.Physically = 'No'
    } else {
      this.Physically = 'Yes'
    }
    if (res.data.results[0].internationalWorkerResponseDTO.isExpatWorker == 0) {
      this.expatBoolean1 = 'No'
    } else {
      this.expatBoolean1 = 'Yes'
    }
    if (res.data.results[0].internationalWorkerResponseDTO.isOnCOC == 0) {
      this.weatherOnCOC1 = 'No'
    } else {
      this.weatherOnCOC1 = 'Yes'
    }
    this.internationalWorkerRequestDTO = res.data.results[0].internationalWorkerResponseDTO;
  }
  // getImage(employeeMasterId) {
  //   this.PersonalInformationService.getImage(employeeMasterId).subscribe((res: any) => {

  //     this.imageUrl = 'data:'+res.data.results[0].image.type+';base64,' + res.data.results[0].base64String;
  //   })
  // }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  // selected image bindind
  uploadFile(event, uploadFile) {
    if (uploadFile.files[0].size > 1000000) {
      this.selectedImg = null;
      uploadFile = null;
      event = null;
    } else {
      this.selectedImageFile = uploadFile.files[0];
      this.BasicInfoForm.markAsTouched();
    }
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;

        // this.selectedImageFile = this.imageUrl; 
        // this.BasicInfoForm.get("image").patchValue({file: this.selectedImageFile}); 
        // this.BasicInfoForm.patchValue({
        //   file: reader.result
        // });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  get physically(): any { return this.BasicInfoForm.get('physicallyChallengedOption'); }
  validatePhysically(physicallyChallengedB) {
    if (physicallyChallengedB.text == 'No') {
      this.physically.reset();
      this.personalInformationModel.disabilityType = '';
      this.personalInformationModel.severityLevel = '';
    }
  }
  get expat(): any { return this.BasicInfoForm.get('countryOfOrigin'); }
  validateExpatBoolean(expatBoolean) {

    if (expatBoolean == 'No') {
      this.expat.reset();
      this.internationalWorkerRequestDTO.countryOfOrigin = '';
      this.weatherOnCOC1 = '';
      this.internationalWorkerRequestDTO.cocNumber = '';
      this.internationalWorkerRequestDTO.cocValidTill = '';
    }
  }
  validateWeatherOnCOC(weatherOnCOC) {
    if (weatherOnCOC.text == 'No') {
      this.internationalWorkerRequestDTO.cocNumber = '';
      this.internationalWorkerRequestDTO.cocValidTill = '';
    }
  }
  concateFullName() {
    
    this.personalInformationModel.employeeMasterRequestDTO.fullName =
      this.personalInformationModel.employeeMasterRequestDTO.title + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.firstName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.middleName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.lastName;

    this.personalInformationModel.employeeMasterRequestDTO.displayName =
      this.personalInformationModel.employeeMasterRequestDTO.fullName

    this.exportFullNameToIdentityInformation = this.personalInformationModel.employeeMasterRequestDTO.firstName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.middleName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.lastName;
    localStorage.setItem('fullName', this.exportFullNameToIdentityInformation)
  }
  resetForm() {
    this.BasicInfoForm.reset();
    this.imageUrl = "./assets/emp-master-images/empIcon5.png";
    const severityLevel = this.BasicInfoForm.get('severityLevel');
    severityLevel.disable();
    const isOnCOC = this.BasicInfoForm.get('isOnCOC');
      isOnCOC.disable();
      this.personalInformationModel.employeeMasterRequestDTO.title = '';
      this.personalInformationModel.employeeMasterRequestDTO.firstName = '';
      this.personalInformationModel.employeeMasterRequestDTO.middleName = '';
      this.personalInformationModel.employeeMasterRequestDTO.lastName = '';

  }
  clearMarriageDate(maritalStatusBoolean) {
    if (maritalStatusBoolean.text !== 'Married') {
      this.personalInformationModel.anniversaryDate = '';
    }
  }
  birthDateValidation() {

    let dateObj = new Date();
    dateObj = this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth;
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    return new Date(year + 18, month - 1, day) <= new Date();
  }
  birthD() {

    if (this.birthDateValidation() == false) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        disableClose: true, width: '664px', height: '241px',
        data: { pageValue: 'EmployeeAgeConfirmation', info: 'Employee age is less than 18 years, Do you still want to proceed?' }
      });
    }
  }
  get clearBirthDate(): any {
    return this.BasicInfoForm.get('birthDate');
  }
  validateNationalty(nationality) {
    nationality = nationality[0].toUpperCase() + nationality.substr(1).toLowerCase();

    const ifsc = this.countryList.filter((item) => {
      return item == nationality;
    });
    // nationality = nationality.charAt(0).toUpperCase()
    // alert(x.charAt(0));;
    if (ifsc.length > 0) {
      this.personalInformationModel.nationality = ifsc[0];
    } else {
      // this.notifyService.showError('Please Select valid Country', "Error..!!");
      this.personalInformationModel.nationality = '';
    }
  }

  enableSeverity(){
    if(this.personalInformationModel.disabilityType){
      const severityLevel = this.BasicInfoForm.get('severityLevel');
      severityLevel.enable();
    }
  }

  enableWhetherOnCOC(){
    if(this.internationalWorkerRequestDTO.countryOfOrigin){
      const isOnCOC = this.BasicInfoForm.get('isOnCOC');
      isOnCOC.enable();
    }
  }
  sweetalertMasterSuccess(message: any, text: any) {
    Swal.fire({
      title: message,
      text: text,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'success',
      timer: 15000,
      timerProgressBar: true,
    })
  }

  sweetalertError(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'error',
      timer: 15000,
      timerProgressBar: true,
    })
  }
}
