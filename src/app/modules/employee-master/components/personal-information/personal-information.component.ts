import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
'use strict';
import { PersonalInformationModel, internationalWorkerRequestDTO } from './personal-information.model';
import { PersonalInformationService } from './personal-information.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';
import { PersonalInfoLabels } from '../../dto-models/language-info-labels/personal-info-labels.model';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalInformationComponent implements OnInit {

  personalInfoForm: FormGroup;
  BasicInfoForm: FormGroup;
  public modalRef: BsModalRef;
  personalInformationModel = new PersonalInformationModel('', '', '', '', '', '', '', '', '', '', '');
  internationalWorkerRequestDTO = new internationalWorkerRequestDTO('', '', '', '', '', '')
  PersonalInfoLabels = new PersonalInfoLabels('', '', '', '', '', '', '', '', '', '', '', '', '', ' ', '', '', '', '', '', '', '', '', '', '', '', '', '')
  bloodGroups = 'A+,A-,B+,B-,AB+,AB-,O+,O-'.split(',');
  maritalStatus = 'Single,Married,Widow,Widower,Divorced'.split(',');
  maritalStatusTotal = 'Single,Married,Widow,Widower,Divorced'.split(',');
  physicallyChallengedDropdown = 'Visual,Hearing,Locomotive'.split(',');
  titleList = 'Mr.,Mrs.,Ms.,Dr.'.split(',');
  physicallyChallengedBoolean = 'Yes,No'.split(',');
  expatBooleanOptions = 'Yes,No'.split(',');
  weatherOnCOCOptions = 'Yes,No'.split(',');
  allGenders = 'Male,Female,Transgender'.split(',');
  @Input() staticLabels: boolean;
  @Input() item: any
  physicallyChallenged: any
  countryList: Array<any> = [];
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "./assets/images/userdefault.png";
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
  weatherOnCOC1: any = '';
  expatBoolean1: any;
  autoCompleteControl;
  newData: Array<any> = [];
  countryCode: Array<any> = [];
  shareCountryInfo = { countryCode: [], countryList: [] }
  cocValidTill1: Date;
  cocValidTill2: Date;
  ToEmpMasterSubscription: Subscription;
  addJoineeSubscription: Subscription;
  selectionEmploymentBoolean: any;
  public today = new Date();
  changesLabelArray: Array<any> = [];
  rejoinee: boolean = false;
  sameCode: boolean = false;
  validBirthDate: boolean;
  saveNextBoolean: boolean = false;
  birthdateClickboolean: boolean = false;
  severityCountValidation: boolean;
  confirmation: TemplateRef<any>;
  empBirthdateConfirmMsg: string;
  selectedLanguage: any;


  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private PersonalInformationService: PersonalInformationService,
    private EventEmitterService: EventEmitterService,
    public datepipe: DatePipe,
    private router: Router, private CommonDataService: SharedInformationService,
    private modalService: BsModalService, private SharedInformationService: SharedInformationService) { }

  ngOnInit(): void {
    this.BasicInfoForm = this.formBuilder.group({
      employeeCode: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-zA-Z0-9•	\\_,/,-])[a-zA-Z0-9•	\\_,/,-]+$/)])],
      alternateCode: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	\\_,/,-])[a-zA-Z0-9•	\\_,/,-]+$/)])],
      title: [''],
      // firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^([a-zA-Z0-9'ÄäËëÏïÖöÜüŸÿ ]+[\ \-]?)+[a-zA-Z0-9'ÄäËëÏïÖöÜüŸÿ ]+$/)])],
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      middleName: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      lastName: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      fullName: [{ value: null, disabled: true },],
      displayName: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      birthDate: [this.tomorrow, Validators.required],
      bloodGroup: [''],
      maritalStatus: [''],
      nationality: [''],
      marriageDate: [this.tomorrow],
      severityLevel: [{ value: '', disabled: false },],
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

    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    // if(this.selectedLanguage == 'hi'){
    //   this.selectedLanguage = 'hindi';
    // }

    this.Physically = 'No';
    this.expatBoolean1 = 'No';
    this.personalInformationModel.disabilityType = '';

    if (this.employeeMasterId) {
      this.getEmployeeData();
    }

    // Get API call to get the Country List
    this.PersonalInformationService.getLocationInformation().subscribe(res => {
      this.countryList = res.data.results;

      this.PersonalInformationService.getCountryCodes().subscribe(res => {
        this.countryCode = res.data.results;

        if (this.countryCode.length > 0 && this.countryList.length > 0) {
          this.shareCountryInfo.countryCode = this.countryCode;
          this.shareCountryInfo.countryList = this.countryList;
          this.EventEmitterService.getCountryData(this.shareCountryInfo);
        }
      })
    })

    if (this.internationalWorkerRequestDTO.cocNumber || this.internationalWorkerRequestDTO.cocValidTill) {
      const isOnCOC = this.BasicInfoForm.get('isOnCOC');
      isOnCOC.enable();
    }
    if (this.personalInformationModel.disabilityType) {
      const severityLevel = this.BasicInfoForm.get('severityLevel');
      severityLevel.enable();
    }

    // Event emmiter instance from Landing page component for Add and ReJoinee
    this.addJoineeSubscription = this.EventEmitterService.setAddjoinee().subscribe(element => {

      if (element.rejoinee == true) {
        this.resetForm();
        localStorage.clear();
        this.employeeMasterId = null;
        setTimeout(() => {
          this.employeeMasterId = element.employeeMasterId;
          localStorage.setItem('employeeMasterId', element.employeeMasterId)
          this.getEmployeeData();
        }, 400)
        this.rejoinee = element.rejoinee;
        this.sameCode = element.sameCode;

        if (this.sameCode == true) {
          const employeeCode = this.BasicInfoForm.get('employeeCode');
          employeeCode.disable();
        }
        if (this.sameCode == false) {
          const employeeCode = this.BasicInfoForm.get('employeeCode');
          employeeCode.enable();
        }
      }

      if (element.rejoinee == false) {

        this.resetForm();
        this.employeeMasterId = null;
        localStorage.clear();
      }
    })
    // if(this.internationalWorkerRequestDTO.cocNumber != '' || this.internationalWorkerRequestDTO.cocValidTill != ''){
    //   const isOnCOC = this.BasicInfoForm.get('isOnCOC');
    //   isOnCOC.enable();
    // }

    // Global label API for Label change as per Company based
    // We Are Filtering Labels as per the Language which selected in Web app
    this.SharedInformationService.getGlobalLabels(this.selectedLanguage).subscribe(res => {

      this.changesLabelArray = res.data.results.filter(item => {
        // Change English Label's name as per Company setting
        if (item.language == 'en') {
          if (item.isDisplay == true && item.defaultLabelName == 'Employee Code') {
            this.PersonalInfoLabels.employeeCode = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Alternate Code') {
            this.PersonalInfoLabels.alternateEmployeeCode = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Title') {
            this.PersonalInfoLabels.title = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'First Name') {
            this.PersonalInfoLabels.firstName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Middle Name') {
            this.PersonalInfoLabels.middleName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Last Name') {
            this.PersonalInfoLabels.lastName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Full Name') {
            this.PersonalInfoLabels.fullName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Display Name') {
            this.PersonalInfoLabels.displayName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Gender') {
            this.PersonalInfoLabels.gender = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Date of Birth') {
            this.PersonalInfoLabels.dateOfBirth = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Nationality') {
            this.PersonalInfoLabels.nationality = item.customLabelName;
          }



          // Hide English Labels As per Company setting
          if (item.isDisplay == false && item.defaultLabelName == 'Employee Code') {
            this.PersonalInfoLabels.employeeCode = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Alternate Code') {
            this.PersonalInfoLabels.alternateEmployeeCode = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Title') {
            this.PersonalInfoLabels.title = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'First Name') {
            this.PersonalInfoLabels.firstName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Middle Name') {
            this.PersonalInfoLabels.middleName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Last Name') {
            this.PersonalInfoLabels.lastName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Full Name') {
            this.PersonalInfoLabels.fullName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Display Name') {
            this.PersonalInfoLabels.displayName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Gender') {
            this.PersonalInfoLabels.gender = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Date of Birth') {
            this.PersonalInfoLabels.dateOfBirth = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Nationality') {
            this.PersonalInfoLabels.nationality = false;
          }
        }

        // Change French Label's name as per Company setting
        if (item.language == 'fr') {
          if (item.isDisplay == true && item.defaultLabelName == 'Code employé') {
            this.PersonalInfoLabels.employeeCode = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Code alternatif') {
            this.PersonalInfoLabels.alternateEmployeeCode = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Titre') {
            this.PersonalInfoLabels.title = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Prénom') {
            this.PersonalInfoLabels.firstName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Deuxième nom') {
            this.PersonalInfoLabels.middleName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Nom de famille') {
            this.PersonalInfoLabels.lastName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Nom complet') {
            this.PersonalInfoLabels.fullName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Afficher un nom') {
            this.PersonalInfoLabels.displayName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Le genre') {
            this.PersonalInfoLabels.gender = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Date de naissance') {
            this.PersonalInfoLabels.dateOfBirth = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Nationalité') {
            this.PersonalInfoLabels.nationality = item.customLabelName;
          }



          // Hide French Labels As per Company setting
          if (item.isDisplay == false && item.defaultLabelName == 'Code employé') {
            this.PersonalInfoLabels.employeeCode = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Code alternatif') {
            this.PersonalInfoLabels.alternateEmployeeCode = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Titre') {
            this.PersonalInfoLabels.title = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Prénom') {
            this.PersonalInfoLabels.firstName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Deuxième nom') {
            this.PersonalInfoLabels.middleName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Nom de famille') {
            this.PersonalInfoLabels.lastName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Nom complet') {
            this.PersonalInfoLabels.fullName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Afficher un nom') {
            this.PersonalInfoLabels.displayName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Le genre') {
            this.PersonalInfoLabels.gender = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Date de naissance') {
            this.PersonalInfoLabels.dateOfBirth = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Nationalité') {
            this.PersonalInfoLabels.nationality = false;
          }
        }

        // Change Hindi Label's name as per Company setting
        if (item.language == 'hi') {
          if (item.isDisplay == true && item.defaultLabelName == 'कर्मचारी कोड') {
            this.PersonalInfoLabels.employeeCode = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'वैकल्पिक कोड') {
            this.PersonalInfoLabels.alternateEmployeeCode = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'शीर्षक') {
            this.PersonalInfoLabels.title = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'प्रथम नाम') {
            this.PersonalInfoLabels.firstName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'मध्य नाम') {
            this.PersonalInfoLabels.middleName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'सरनेम') {
            this.PersonalInfoLabels.lastName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'पूरा नाम') {
            this.PersonalInfoLabels.fullName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'प्रदर्शित होने वाला नाम') {
            this.PersonalInfoLabels.displayName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'लिंग') {
            this.PersonalInfoLabels.gender = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'जन्म तिथि') {
            this.PersonalInfoLabels.dateOfBirth = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'राष्ट्रीयता') {
            this.PersonalInfoLabels.nationality = item.customLabelName;
          }



          // Hide Labels As per Company setting
          if (item.isDisplay == false && item.defaultLabelName == 'कर्मचारी कोड') {
            this.PersonalInfoLabels.employeeCode = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'वैकल्पिक कोड') {
            this.PersonalInfoLabels.alternateEmployeeCode = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'शीर्षक') {
            this.PersonalInfoLabels.title = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'प्रथम नाम') {
            this.PersonalInfoLabels.firstName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'मध्य नाम') {
            this.PersonalInfoLabels.middleName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'सरनेम') {
            this.PersonalInfoLabels.lastName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'पूरा नाम') {
            this.PersonalInfoLabels.fullName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'प्रदर्शित होने वाला नाम') {
            this.PersonalInfoLabels.displayName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'लिंग') {
            this.PersonalInfoLabels.gender = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'जन्म तिथि') {
            this.PersonalInfoLabels.dateOfBirth = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'राष्ट्रीयता') {
            this.PersonalInfoLabels.nationality = false;
          }
        }
      })
    })

    // this.SharedInformationService.getAdditionalFields().subscribe(res => {
    //   
    //   res.data.results.filter(item => {
    //     if (item.fieldName == 'PersonalAdditional1') {
    //       this.PersonalInfoLabels.PersonalAdditional1 = item.fieldLabelName;
    //     }
    //     if (item.fieldName == 'PersonalAdditional2') {
    //       this.PersonalInfoLabels.PersonalAdditional2 = item.fieldLabelName;
    //     }
    //   })
    // })
  }

  severity(event) {

    this.personalInformationModel.severityLevel = event;
  }

  // Save&Next button post API call
  saveNextPersonalInfoSubmit(personalInformationModel) {
    this.saveNextBoolean = true;

    this.personalInfoSubmit(personalInformationModel);
  }


  // Personal Info Form Submit Function
  personalInfoSubmit(personalInformationModel) {

    if (this.rejoinee == false) {
      personalInformationModel.employeeMasterId = null;
      personalInformationModel.employeeMasterRequestDTO.employeeMasterId = null;
    }
    if (this.rejoinee == true) {
      personalInformationModel.employeeMasterRequestDTO.rejoinee = this.rejoinee;
      personalInformationModel.employeeMasterRequestDTO.sameCode = this.sameCode;
    } else {
      personalInformationModel.employeeMasterRequestDTO.rejoinee = false;
      personalInformationModel.employeeMasterRequestDTO.sameCode = false;
    }
    personalInformationModel.employeeMasterRequestDTO.dateOfBirth =
      this.datepipe.transform(personalInformationModel.employeeMasterRequestDTO.dateOfBirth, "dd-MMM-yyyy");

    personalInformationModel.anniversaryDate =
      this.datepipe.transform(personalInformationModel.anniversaryDate, "dd-MMM-yyyy");

    this.internationalWorkerRequestDTO.cocValidTill =
      this.datepipe.transform(this.internationalWorkerRequestDTO.cocValidTill, "dd-MMM-yyyy");
    const body: FormData = new FormData();
    body.append('file', this.selectedImageFile);

    personalInformationModel.employeeMasterRequestDTO.groupCompanyId = 1;
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
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
                                                                      
        if (this.rejoinee == true) {
          this.router.navigate(['/employee-master/employment-information/re-joining-information']);
        }
        if (this.saveNextBoolean == true) {
          this.saveNextBoolean = false;
          this.router.navigate(['/employee-master/employment-information/joining-information']);
        }
        this.BasicInfoForm.markAsUntouched();
        this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
        this.imageUrl = 'data:' + res.data.results[0].imageResponseDTO.employeeProfileImage.type + ';base64,' + res.data.results[0].imageResponseDTO.employeeProfileImage.profilePicture;
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        this.EventEmitterService.getRejoineeStatusCode(this.rejoinee);
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
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        this.EventEmitterService.getRejoineeStatusCode(this.rejoinee);
        this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
        this.BasicInfoForm.markAsUntouched();
        if (this.saveNextBoolean == true) {
          this.saveNextBoolean = false;
          this.router.navigate(['/employee-master/employment-information/employment-summary']);
        }
        this.router.navigate(['/employee-master/employment-information/joining-information']);
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    }
  }

  // Get API call to Data of Personal info form
  getEmployeeData() {

    this.PersonalInformationService.getEmployeeData(this.employeeMasterId).subscribe((res: any) => {

      this.newData = res;
      this.BasicInfoForm.markAsUntouched();
      this.getDataBinding(res);
    })
  }

  // Get API data binding Function
  getDataBinding(res) {

    this.personalInformationModel = res.data.results[0];
    this.personalInformationModel.maritialStatus = res.data.results[0].maritialStatus;
    this.personalInformationModel.employeeMasterRequestDTO = res.data.results[0].employeeMasterResponseDTO;
    if (!this.personalInformationModel.nationality) {
      this.personalInformationModel.nationality = '';
    }
    if (!this.personalInformationModel.disabilityType) {
      this.personalInformationModel.disabilityType = '';
    }
    if (this.rejoinee == true && this.sameCode == false) {
      const employeeCode = this.BasicInfoForm.get('employeeCode');
      employeeCode.enable();
      this.BasicInfoForm.get('employeeCode').setValue(null);
      this.personalInformationModel.employeeMasterRequestDTO.employeeCode = null;
    }
    this.EventEmitterService.getBirthDateToEmploymentForm(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
    if (res.data.results[0].imageResponseDTO) {
      this.imageUrl = 'data:' + res.data.results[0].imageResponseDTO.employeeProfileImage.type + ';base64,' + res.data.results[0].imageResponseDTO.employeeProfileImage.profilePicture;
    }
    localStorage.setItem('birthDate', this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
    localStorage.setItem('fullName', this.personalInformationModel.employeeMasterRequestDTO.fullName);

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

    if (this.internationalWorkerRequestDTO.countryOfOrigin) {
      const isOnCOC = this.BasicInfoForm.get('isOnCOC');
      isOnCOC.enable();
    }
    if (this.personalInformationModel.disabilityType) {
      const severityLevel = this.BasicInfoForm.get('severityLevel');
      severityLevel.enable();
    }

    if (this.personalInformationModel.employeeMasterRequestDTO.gender == 'Male') {
      this.maritalStatus.splice(2, 1);
    }

    if (this.personalInformationModel.employeeMasterRequestDTO.gender == 'Female') {
      this.maritalStatus.splice(3, 1);
    }


    

   this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
   
 

    this.BasicInfoForm.patchValue({
      employeeCode: this.personalInformationModel.employeeMasterRequestDTO.employeeCode,
      birthDate: this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth,
      firstName: this.personalInformationModel.employeeMasterRequestDTO.firstName,
      gender: this.personalInformationModel.employeeMasterRequestDTO.gender
    })
  }


  // selected image binding
  uploadFile(event, uploadFile) {

    if (uploadFile.files[0].size > 1048576) {
      this.selectedImg = null;
      uploadFile = null;
      event = null;
      this.imageUrl = "./assets/images/userdefault.png";
      this.CommonDataService.sweetalertWarning('Selected Image Size Should be less than 1 Mb');
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

  // Physically challenged field disable validation Function
  validatePhysically(physicallyChallengedB) {

    if (physicallyChallengedB == 'No') {
      this.physically.reset();
      this.personalInformationModel.disabilityType = '';
      this.personalInformationModel.severityLevel = '';
      const severityLevel = this.BasicInfoForm.get('severityLevel');
      severityLevel.disable();
    }
  }
  get expat(): any { return this.BasicInfoForm.get('countryOfOrigin'); }

  // Expat field disable validation Function
  validateExpatBoolean(expatBoolean) {

    if (expatBoolean == 'No') {
      this.expat.reset();
      this.internationalWorkerRequestDTO.countryOfOrigin = '';
      this.weatherOnCOC1 = '';
      this.internationalWorkerRequestDTO.cocNumber = '';
      this.internationalWorkerRequestDTO.cocValidTill = '';
      const isOnCOC = this.BasicInfoForm.get('isOnCOC');
      isOnCOC.disable();
    }
    if (!this.internationalWorkerRequestDTO.countryOfOrigin) {
      this.internationalWorkerRequestDTO.countryOfOrigin = '';
    }
  }

  // WeatherONCOC field disable validation Function
  validateWeatherOnCOC(weatherOnCOC) {

    if (weatherOnCOC == 'No') {
      this.internationalWorkerRequestDTO.cocNumber = '';
      this.internationalWorkerRequestDTO.cocValidTill = '';
    }
  }

  // Concatination function of First, middle, last Names to show in Full and Display Name
  concateFullName() {

    this.personalInformationModel.employeeMasterRequestDTO.fullName =
      this.personalInformationModel.employeeMasterRequestDTO.title + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.firstName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.middleName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.lastName;

    this.personalInformationModel.employeeMasterRequestDTO.displayName =
      this.personalInformationModel.employeeMasterRequestDTO.fullName

    this.personalInformationModel.employeeMasterRequestDTO.displayName = this.personalInformationModel.employeeMasterRequestDTO.displayName.trim();
    this.exportFullNameToIdentityInformation = this.personalInformationModel.employeeMasterRequestDTO.firstName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.middleName + ' ' +
      this.personalInformationModel.employeeMasterRequestDTO.lastName;
    localStorage.setItem('fullName', this.exportFullNameToIdentityInformation);
    this.formTouch();
  }

  // Function for Form touch
  formTouch() {
    this.BasicInfoForm.markAsTouched();
  }

  // Reset Form function
  resetForm() {

    this.maritalStatus = 'Single,Married,Widow,Widower,Divorced'.split(',');

    this.BasicInfoForm.reset();
    this.imageUrl = "./assets/images/userdefault.png";
    const severityLevel = this.BasicInfoForm.get('severityLevel');
    severityLevel.disable();
    const isOnCOC = this.BasicInfoForm.get('isOnCOC');
    isOnCOC.disable();
    this.personalInformationModel.employeeMasterRequestDTO.title = '';
    this.personalInformationModel.employeeMasterRequestDTO.firstName = '';
    this.personalInformationModel.employeeMasterRequestDTO.middleName = '';
    this.personalInformationModel.employeeMasterRequestDTO.lastName = '';
    this.personalInformationModel.nationality = "";
    const nationality = this.BasicInfoForm.get('nationality').setValue('');
    this.personalInformationModel.employeeMasterRequestDTO.gender = '';
    const gender = this.BasicInfoForm.get('gender').setValue('');
    this.personalInformationModel.maritialStatus = '';
    const maritalStatus = this.BasicInfoForm.get('maritalStatus').setValue('');
    this.Physically = 'No';
    const physicallyChallengedBoolean = this.BasicInfoForm.get('physicallyChallengedBoolean').setValue('No');
    this.expatBoolean1 = 'NO';
    const isExpatWorker = this.BasicInfoForm.get('isExpatWorker').setValue('No');
    this.personalInformationModel.bloodGroup = '';
    const bloodGroup = this.BasicInfoForm.get('bloodGroup').setValue('');
    this.internationalWorkerRequestDTO.countryOfOrigin = '';
    this.weatherOnCOC1 = '';
    this.personalInformationModel.disabilityType = '';

    this.employeeMasterId = null;
  }

  // clear marriage date based on Selection of Marital status
  clearMarriageDate(maritalStatusBoolean) {
    if (maritalStatusBoolean !== 'Married') {
      this.personalInformationModel.anniversaryDate = '';
    }

    if (maritalStatusBoolean == 'Married') {
      this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
    }
  }

  birthDateClickEvent(event) {

    this.birthdateClickboolean = true;
    
  }

  // BirthDate field validation based of 18 years less and above
  birthDateValidation(event, confirmation) {
    this.today =this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth;
    if ((this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth != '' ||
      this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth) && this.birthdateClickboolean) {
     let dateObj = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
       let date = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
      var month = dateObj.getMonth() + 1; //months from 1-12
      var day = dateObj.getDate();
      var year = dateObj.getFullYear();
      console.log(year);
     
      this.validBirthDate = new Date(year + 18, month - 1, day) <= new Date();
      if (this.validBirthDate == false && this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth != '') {
        this.birthD(this.validBirthDate, confirmation);
      }
      if (this.validBirthDate == true) {
        this.birthdateClickboolean = false;
        return
      }
    }

    return this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = new Date(this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth);
  }





  birthD(validDate, confirmation) {
    this.birthdateClickboolean = false;
    if (validDate == false && this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth != '') {
      this.empBirthdateConfirmMsg = 'Employee age is less than 18 years, Do you still want to proceed?';
      this.modalRef = this.modalService.show(
        confirmation,
        Object.assign({}, { class: 'gray modal-md' })
      );
    }
  }


  // Nationality selection Function while user Searching In Dropdown
  validateNationalty(nationality) {

    if (this.personalInformationModel.nationality) {
      this.BasicInfoForm.markAsTouched();
    }

    nationality = nationality[0].toUpperCase() + nationality.substr(1).toLowerCase();

    const country = this.countryList.filter((item) => {
      return item == nationality;
    });
    // nationality = nationality.charAt(0).toUpperCase()
    // alert(x.charAt(0));;
    if (country.length > 0) {
      this.personalInformationModel.nationality = country[0];
    } else {
      // this.notifyService.showError('Please Select valid Country', "Error..!!");
      this.personalInformationModel.nationality = '';
    }
  }

  // Severity field enable validation on selection of Disablity Type
  enableSeverity() {
    if (this.personalInformationModel.disabilityType) {
      const severityLevel = this.BasicInfoForm.get('severityLevel');
      severityLevel.enable();
    }
  }

  // WhetherOnCOC field enable validation on selection of countryOfOrigin
  enableWhetherOnCOC() {
    if (this.internationalWorkerRequestDTO.countryOfOrigin) {
      const isOnCOC = this.BasicInfoForm.get('isOnCOC');
      isOnCOC.enable();
    }
  }

  // Severity level message warning Function
  validateSaverityLevel(severityLevel) {

    if (severityLevel > 100 || severityLevel < 0) {
      this.CommonDataService.sweetalertWarning('Severity Level should be up to 100%');
      this.severityCountValidation = false;
      // this.BasicInfoForm.get('severityLevel').setValue('');
      // this.BasicInfoForm.get('severityLevel').setValidators(Validators.required);
      // this.BasicInfoForm.get('severityLevel').updateValueAndValidity();
    }
    if (severityLevel > 0 && severityLevel < 100 || severityLevel == 100)
     {
      this.severityCountValidation = true;
      // this.BasicInfoForm.get('severityLevel').clearValidators();
      // this.BasicInfoForm.get('severityLevel').updateValueAndValidity();
    }
  }

  validateDropdown() {

    if (this.personalInformationModel.employeeMasterRequestDTO.gender) {
      this.BasicInfoForm.markAsTouched();
    }

    if (this.personalInformationModel.bloodGroup) {
      this.BasicInfoForm.markAsTouched();
    }

    if (this.personalInformationModel.nationality) {
      this.BasicInfoForm.markAsTouched();
    }
    if (this.personalInformationModel.maritialStatus) {
      this.BasicInfoForm.markAsTouched();
    }
  }

  // Marital status Validation on selection of Gender
  validateGender() {

    this.maritalStatus = 'Single,Married,Widow,Widower,Divorced'.split(',');
    if (this.personalInformationModel.employeeMasterRequestDTO.gender == 'Male') {
      this.maritalStatus.splice(2, 1);
      // this.personalInformationModel.maritialStatus = '';
    }

    if (this.personalInformationModel.employeeMasterRequestDTO.gender == 'Female') {
      this.maritalStatus.splice(3, 1);
      // this.personalInformationModel.maritialStatus = '';
    }
  }

  // Confirmation Modal function 
  UploadModal(confirmation: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      confirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  
  clearBithDate() {
    this.personalInformationModel.employeeMasterRequestDTO.dateOfBirth = null;
    this.validBirthDate = null;
    this.BasicInfoForm.get('birthDate').reset();
    this.modalRef.hide();
    return;
  }

  
}
