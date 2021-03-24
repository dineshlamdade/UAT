import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
'use strict';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { guardianDetailRequestDTO, familyAddressDetailRequestDTO, familyMemberInfoRequestDTO, FamilyInformation } from './../family-information.model';
import { ContactInformationService } from './../../contact-information/contact-information.service';
import { FamilyInformationService } from './../family-information.service';
import { ConfirmationModalComponent } from './../../../shared modals/confirmation-modal/confirmation-modal.component';
import { SharedInformationService } from './../../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.scss']
})
export class FamilyDetailsComponent implements OnInit {

  @Input() countryCode: Array<any> = [];
  FamilyDetailsInfoForm: FormGroup;
  tomorrow = new Date();
  @ViewChild('fileInput') el: ElementRef;
  selectedImg: any;
  selectedImageFile: any;
  selectedImageFileList: Array<any> = [];
  employeeMasterId: number;
  FamilySummaryGridData: Array<any> = [];
  FamilyDetailsInfoList: Array<any> = [];
  CopyFromAddressList: Array<any> = [];
  getAddressCopyFromList: Array<any> = [];
  imageUrl: any = "./assets/images/userdefault.png";
  editFile: boolean = true;
  removeUpload: boolean = false;
  dependentOnEmployee: any;
  companyMediclaim: any;
  staticLabels: boolean = true;
  FamilyInformation = new FamilyInformation();
  addressCountryCode: any;
  addressPhoneNo: any;
  guardianCountryCode: any;
  guardianPhoneNo: any;
  public familyMemberInfoRequestDTO = new familyMemberInfoRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public familyAddressDetailRequestDTO = new familyAddressDetailRequestDTO('', '', '', '', '', '', '', '', '', '', '');
  public guardianDetailRequestDTO = new guardianDetailRequestDTO('', '', '', '', '', '', '', '', '', '', '', '')
  shareCountryDataSubcription: Subscription;
  allGenders = 'Male,Female,Trans'.split(',');
  maritalStatusList = 'Single,Married,Widow,Widower,Divorced'.split(',');
  relationshipList = 'Mother,Father,Wife,Husband,Daughter,Son,Sister,Brother,Mother-in-law,Father-in-law'.split(',');
  filteredRelationshipList: Array<any> = [];
  ageBracketList = 'Minor,Adult,Senior Citizen,Very Senior Citizen'.split(',');
  familyHT: any;
  familyViewItem: boolean = false;
  familyEditingItem: any;
  familyFlex: any;
  _currentfamilyEditItem: any;
  familyItem: any;
  familyFlag: any;
  IsActive: boolean = true;
  savePopupSubscription: Subscription;
  public today = new Date();
  filteredallGendersList: Array<any> = [];
  filteredmaritalStatusList: Array<any> = [];
  filteredageBracketList: Array<any> = [];
  filteredCopyFromAddressList: Array<any> = [];
  filteredcountryCode: Array<any> = [];
  updateFormFlag: boolean = false;
  saveNextBoolean: boolean = false


  constructor(private formBuilder: FormBuilder,
    private EventEmitterService: EventEmitterService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog, public datepipe: DatePipe,
    private cd: ChangeDetectorRef,
    private ContactInformationService: ContactInformationService,
    private FamilyInformationService: FamilyInformationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private matDialog: MatDialog,
    private CommonDataService: SharedInformationService) { }
  birthdateClickboolean: boolean = false;
  validBirthDate: boolean;
  fullName: any;


  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);


    this.FamilyDetailsInfoForm = this.formBuilder.group({
      familyMemberName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-zA-Z0-9•	ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      dateOfBirth: [this.tomorrow, Validators.required],
      relation: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      fatherHusbandName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-zA-Z0-9•	ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      aadhaar: ['', Validators.pattern(/^(\d{12}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)],
      nameAsPerAadhaar: [''],
      ageBracket: [{ value: null, disabled: true }, Validators.required],
      companyMediclaimApplicable: [''],
      isDependant: [''],
      image: [''],
      remark: [{value: null, disabled: true}],
      isActive: [{ value: null, disabled: true }],
      companyMediclaimToggle: ['', Validators.required],
      dependentOnEmployeeToggle: ['', Validators.required],
      addressDetailsCountryCode: [''],
      addressDetailsMobileNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      copyFrom: [''],
      addressDetailsAddress1: [''],
      addressDetailsAddress2: [''],
      addressDetailsAddress3: [''],
      addressDetailsCountry: [''],
      addressDetailsPin: [''],
      addressDetailsMobileState: [''],
      addressDetailsCity: [''],
      addressDetailsVillege: [''],
      guardianName: [''],
      guardianCountryCode: [''],
      guardianMobileNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      guardianAddress1: [''],
      guardianAddress2: [''],
      guardianAddress3: [''],
      guardianCountry: [''],
      guardianPin: [''],
      guardianState: [''],
      guardianCity: [''],
      guardianVillege: [''],
    });
    this.getCopyFromAddress();
    this.getFamilyGridSummary();
    this.fullName = localStorage.getItem('fullName')
    // this.familyMemberInfoRequestDTO.isMemberActive = 1;
    if (!this.data) {
      this.CommonDataService.getCountryCodes().subscribe(res => {
        this.countryCode = res.data.results;

        setTimeout(() => {
          this.addressCountryCode = '';
          this.guardianCountryCode = '';
        })
      })
    }

    this.savePopupSubscription = this.EventEmitterService.setFamilyPopupFormSave().subscribe(res => {

      if (res) {
        if (this.familyEditingItem.familyMemberInfoId == res.familyMemberInfoRequestDTO[0].familyMemberInfoId) {
          this.getFamilyGridSummary();

          this.familyEditingItem.familyMemberName = this.familyMemberInfoRequestDTO.familyMemberName;
          this.familyEditingItem.isMemberActive = this.familyMemberInfoRequestDTO.isMemberActive;
          this.familyEditingItem.relation = this.familyMemberInfoRequestDTO.relation;

          if (this.familyEditingItem.isMemberActive == 1) {
            this.familyEditingItem.isMemberActive = 'Active'
          } else {
            this.familyEditingItem.isMemberActive = 'InActive'
          }
        }
      }
    })
  }



  uploadFile(event, uploadFile) {
    if (uploadFile.files[0].size > 1000000) {
      this.selectedImg = null;
      uploadFile = null;
      event = null;
    } else {
      this.selectedImageFile = uploadFile.files[0];
      this.FamilyDetailsInfoForm.markAsTouched();
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

  dependentOnEmployeeValidation(event) {

    if (event.target.defaultValue == "yes") {
      this.dependentOnEmployee = "yes";
      this.familyMemberInfoRequestDTO.isDependant = 1;

    } else {
      this.dependentOnEmployee = "no";
      this.familyMemberInfoRequestDTO.isDependant = 0;
    }
  }

  companyMediclaimValidation(event) {

    if (event.target.defaultValue == "yes") {
      this.companyMediclaim = "yes";
      this.familyMemberInfoRequestDTO.companyMediclaimApplicable = 1;
    } else {
      this.companyMediclaim = "no";
      this.familyMemberInfoRequestDTO.companyMediclaimApplicable = 0;
    }
  }

  activeSetBoolean(event) {

    if (event == true) {
      
      this.familyMemberInfoRequestDTO.isMemberActive = 1;
      this.FamilyDetailsInfoForm.get('remark').clearValidators();
      this.FamilyDetailsInfoForm.get('remark').updateValueAndValidity();
     
    } else {
      this.familyMemberInfoRequestDTO.isMemberActive = 0;
      this.FamilyDetailsInfoForm.get('remark').setValidators([Validators.required]);
      this.FamilyDetailsInfoForm.get('remark').updateValueAndValidity();
      this.FamilyDetailsInfoForm.controls['remark'].disable();
    }
  }

  resetFamilyDetailsForm() {
    this.FamilyDetailsInfoForm.reset();
    this.enableForm();
    this.imageUrl = "./assets/images/empIcon5.png";

    // this.dependentOnEmployee = 'no';
    // this.companyMediclaim = 'no';
    this.IsActive = true;
    // this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle').setValue('no');
    // this.FamilyDetailsInfoForm.get('companyMediclaimToggle').setValue('no');
    this.FamilyDetailsInfoForm.get('isActive').setValue(true);

    this.FamilyDetailsInfoForm.get('relation').setValue('');
    this.FamilyDetailsInfoForm.get('gender').setValue('');
    this.FamilyDetailsInfoForm.get('maritalStatus').setValue('');
    this.FamilyDetailsInfoForm.get('ageBracket').setValue('');

    this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').setValue('');
    this.FamilyDetailsInfoForm.get('copyFrom').setValue('');
    this.FamilyDetailsInfoForm.get('guardianCountryCode').setValue('');
    const isActive = this.FamilyDetailsInfoForm.get('isActive');
    isActive.disable();

    this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').clearValidators();
    this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
    this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').clearValidators();
    this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').updateValueAndValidity();

    this.FamilyDetailsInfoForm.get('guardianMobileNumber').clearValidators();
    this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
    this.FamilyDetailsInfoForm.get('guardianCountryCode').clearValidators();
    this.FamilyDetailsInfoForm.get('guardianCountryCode').updateValueAndValidity();
  }

  getGuardianAddressFromPIN() {

    if (this.guardianDetailRequestDTO.pincode.length < 6) {
      this.guardianDetailRequestDTO.state = '';
      this.guardianDetailRequestDTO.city = '';
    }

    if (this.guardianDetailRequestDTO.pincode.length == 6) {
      this.ContactInformationService.getAddressFromPIN(this.guardianDetailRequestDTO.pincode).subscribe(res => {
        // this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);

        this.guardianDetailRequestDTO.state = res.data.results[0].state;
        this.guardianDetailRequestDTO.city = res.data.results[0].city;
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    }
  }

  AddressValidationFromPIN() {

    if (this.familyAddressDetailRequestDTO.pinCode.length < 6) {
      this.familyAddressDetailRequestDTO.state = '';
      this.familyAddressDetailRequestDTO.city = '';
    }

    if (this.familyAddressDetailRequestDTO.pinCode.length == 6) {
      this.ContactInformationService.getAddressFromPIN(this.familyAddressDetailRequestDTO.pinCode).subscribe(res => {
        // this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        this.familyAddressDetailRequestDTO.state = res.data.results[0].state;
        this.familyAddressDetailRequestDTO.city = res.data.results[0].city;
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    }
  }

  saveFamilyInformation() {

    const body: FormData = new FormData();

    body.append('files', this.selectedImageFile);

    body.append('requestDTOString', JSON.stringify(this.FamilyInformation));
    this.FamilyInformationService.postFamilyDetailsInfoForm(body).subscribe(res => {
      this.resetFamilyDetailsForm();
      this.getFamilyGridSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/family-information/family-details']);
      }
      this.familyEditingItem.isMemberActive = 'Active';
      this.IsActive = true;
      const isActive = this.FamilyDetailsInfoForm.get('isActive');
      isActive.disable();
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  familySaveNextSubmit(familyMemberInfoRequestDTO, familyAddressDetailRequestDTO,
    guardianDetailRequestDTO) {

    this.saveNextBoolean = true;

    this.pushFamilyDetailsToGrid(familyMemberInfoRequestDTO, familyAddressDetailRequestDTO,
      guardianDetailRequestDTO);
  }


  // Push Education Form Data to Summary Grid
  pushFamilyDetailsToGrid(familyMemberInfoRequestDTO, familyAddressDetailRequestDTO,
    guardianDetailRequestDTO) {

    familyMemberInfoRequestDTO.employeeMasterId = this.employeeMasterId
    familyAddressDetailRequestDTO.employeeMasterId = this.employeeMasterId
    guardianDetailRequestDTO.employeeMasterId = this.employeeMasterId
    if (this.addressPhoneNo) {
      familyAddressDetailRequestDTO.phoneNumber = this.addressCountryCode + ' ' + this.addressPhoneNo;
    }
    if (this.guardianPhoneNo) {
      guardianDetailRequestDTO.phoneNumber = this.guardianCountryCode + ' ' + this.guardianPhoneNo;
    }

    // let valid;
    // if (this.FamilySummaryGridData.length > 0) {
    //   this.FamilySummaryGridData.forEach(element => {
    //     if (element.familyMemberName == familyMemberInfoRequestDTO.familyMemberName ||
    //       element.relation == familyMemberInfoRequestDTO.relation) {
    //       valid = false;
    //       this.CommonDataService.sweetalertError('This record is already present');
    //       return;
    //     }
    //   })
    // } else {
    //   valid = true;
    // }


    // if (valid != false) {
    let data = [];

    if (this.IsActive == true) {
      this.familyMemberInfoRequestDTO.isMemberActive = 1;
    } else {
      this.familyMemberInfoRequestDTO.isMemberActive = 0;
    }
    familyMemberInfoRequestDTO.dateOfBirth = this.datepipe.transform(familyMemberInfoRequestDTO.dateOfBirth, 'dd-MMM-yyyy');

    this.FamilyInformation.familyMemberInfoRequestDTO = familyMemberInfoRequestDTO;
    // if (this.selectedImageFile) {
    //   this.selectedImageFileList.push(this.selectedImageFile);
    // }

    // if (this.addressPhoneNo) {
    //   familyAddressDetailRequestDTO.phoneNumber = this.FamilyDetailsInfoForm.value.addressDetailsCountryCode + ' ' +
    //     this.FamilyDetailsInfoForm.value.addressDetailsMobileNumber;
    // }

    this.FamilyInformation.familyAddressDetailRequestDTO = familyAddressDetailRequestDTO;

    // if (this.guardianPhoneNo) {
    //   guardianDetailRequestDTO.phoneNumber = this.FamilyDetailsInfoForm.value.guardianCountryCode + ' ' +
    //     this.FamilyDetailsInfoForm.value.guardianMobileNumber;
    // }

    this.FamilyInformation.guardianDetailRequestDTO = guardianDetailRequestDTO;
    this.saveFamilyInformation();
    // }
    // valid = true;

  }

  saveFamilyEditRow(familyMemberInfoRequestDTO, familyAddressDetailRequestDTO,
    guardianDetailRequestDTO) {

    if (familyMemberInfoRequestDTO) {
      familyMemberInfoRequestDTO.employeeMasterId = this.employeeMasterId;
    }
    if (familyAddressDetailRequestDTO) {
      familyAddressDetailRequestDTO.employeeMasterId = this.employeeMasterId;
    }
    if (guardianDetailRequestDTO) {
      guardianDetailRequestDTO.employeeMasterId = this.employeeMasterId;
    }

    if (this.addressCountryCode) {
      this.familyAddressDetailRequestDTO.phoneNumber = this.addressCountryCode + ' ' + this.addressPhoneNo;
    }
    if (this.guardianCountryCode) {
      this.guardianDetailRequestDTO.phoneNumber = this.guardianCountryCode + ' ' + this.guardianPhoneNo;
    }
    if (this.IsActive == true) {
      this.familyMemberInfoRequestDTO.isMemberActive = 1;
    } else {
      this.familyMemberInfoRequestDTO.isMemberActive = 0;
    }
    const array = []
    this.familyMemberInfoRequestDTO.dateOfBirth = this.datepipe.transform(this.familyMemberInfoRequestDTO.dateOfBirth, 'dd-MMM-yyyy');

    this.FamilyInformation.familyMemberInfoRequestDTO = familyMemberInfoRequestDTO;
    this.FamilyInformation.familyAddressDetailRequestDTO = familyAddressDetailRequestDTO;
    this.FamilyInformation.guardianDetailRequestDTO = guardianDetailRequestDTO;


    const body: FormData = new FormData();
    if (!this.selectedImageFile) {
      body.append('files', this.selectedImageFile = '');
    } else {
      body.append('files', this.selectedImageFile);
    }



    body.append('requestDTOString', JSON.stringify(this.FamilyInformation));
    this.FamilyInformationService.postFamilyDetailsInfoForm(body).subscribe(res => {
      this.getFamilyGridSummary();
      this.resetFamilyDetailsForm();
      this.updateFormFlag = false;
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.familyEditingItem.isMemberActive = 'Active';
      this.IsActive = true;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  populateGender(relation) {

    if (relation.value == 'Father' || relation.value == 'Brother' || relation.value == 'Son' ||
      relation.value == 'Husband' || relation.value == 'Father-in-law') {
      this.familyMemberInfoRequestDTO.gender = 'Male';
      this.validateGender();
    } else {
      this.familyMemberInfoRequestDTO.gender = 'Female';
      this.validateGender();
    }
  }

  birthDateValidation() {

    if ((this.familyMemberInfoRequestDTO.dateOfBirth != '' ||
      this.familyMemberInfoRequestDTO.dateOfBirth) && this.birthdateClickboolean) {
      let dateObj = new Date(this.familyMemberInfoRequestDTO.dateOfBirth);
      // dateObj = this.familyMemberInfoRequestDTO.dateOfBirth;
      var month = dateObj.getMonth() + 1; //months from 1-12
      var day = dateObj.getDate();
      var year = dateObj.getFullYear();

      this.validBirthDate = new Date(year + 18, month - 1, day) <= new Date();
      if (this.validBirthDate == false && this.familyMemberInfoRequestDTO.dateOfBirth != '') {
        this.birthD(this.validBirthDate);
      }
      if (this.validBirthDate == true && this.familyMemberInfoRequestDTO.dateOfBirth) {
        this.familyMemberInfoRequestDTO.ageBracket = 'Adult';
        const temp13 = this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle');
        temp13.enable();
        this.dependentOnEmployee = '';
        this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle').setValue('');
      }
    }


  }
  birthD(validBirthDate) {
    this.birthdateClickboolean = false;
    if (validBirthDate == false) {
      this.familyMemberInfoRequestDTO.ageBracket = 'Minor';
      this.dependentOnEmployee = 'yes';
      this.familyMemberInfoRequestDTO.isDependant = 1;
      const temp13 = this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle');
      temp13.disable();
    }

  }
  birthDateClickEvent(event) {

    this.birthdateClickboolean = true;
  }
  getAge(birthDateString) {

    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  validDate(birthDateString) {

    if (this.getAge(birthDateString) >= 60 && this.getAge(birthDateString) < 80) {
      this.familyMemberInfoRequestDTO.ageBracket = 'Senior Citizen';
      this.dependentOnEmployee = '';
      this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle').setValue('');
    }
    if (this.getAge(birthDateString) > 80) {
      this.familyMemberInfoRequestDTO.ageBracket = 'Very Senior Citizen';
      this.dependentOnEmployee = '';
      this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle').setValue('');
    }
  }
  validateIsdependant() {
    if (this.familyMemberInfoRequestDTO.ageBracket != 'Minor') {
      const temp13 = this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle');
      temp13.enable();
      this.dependentOnEmployee = '';
      this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle').setValue('');
    } else {
      this.dependentOnEmployee = 'yes';
      this.familyMemberInfoRequestDTO.isDependant = 1;
      const temp13 = this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle');
      temp13.disable();
    }
  }
  getCopyFromAddress() {

    this.FamilyInformationService.getCopyFromAddress(this.employeeMasterId).subscribe(res => {

      this.getAddressCopyFromList = res.data.results[0].allAddressBeans;

      const newa = res.data.results[0].allAddressBeans.forEach(element => {
        this.CopyFromAddressList.push(element.memberName + ' ' + element.relation)
      });
      this.CopyFromAddressList.push('Employee Local Address', 'Employee Permanent Address');
    })
  }

  getFamilyGridSummary() {

    this.FamilyInformationService.getFamilyGridSummary(this.employeeMasterId).subscribe(res => {

      this.FamilySummaryGridData = res.data.results[0].familyDetailsSummaryBeans;

      this.FamilySummaryGridData.forEach(res => {
        if (res.status == 1) {
          res.isMemberActive = 'Active'
        } else {
          res.isMemberActive = 'InActive'
        }
      })
    })
  }

  getFamilyDetailsInfo(familyMemberInfoId) {

    this.FamilyInformationService.getFamilyDetailsInfo(familyMemberInfoId).subscribe(res => {

      this.FamilyDetailsInfoList = res.data.results[0].familyDetailsGetBean;
    })
  }

  getAddressFromCopyList(copyAddress) {

    let Address
    Address = this.getAddressCopyFromList.filter(element => {
      
      let num: string
      if (copyAddress.value == 'Employee Local Address') {
        if (element.local) {
          return this.familyAddressDetailRequestDTO = element.local,
            this.familyAddressDetailRequestDTO.pinCode = element.local.postalCode,
            this.addressPhoneNo = element.local.phoneNumber.slice(element.local.phoneNumber.length - 10),
            num = element.local.phoneNumber,
            this.addressCountryCode = num.slice(0, num.length - 10);
        }
      }
      if (copyAddress.value == 'Employee Permanent Address') {
        if (element.permanent) {
          return this.familyAddressDetailRequestDTO = element.permanent,
            this.familyAddressDetailRequestDTO.pinCode = element.permanent.postalCode,
            this.addressPhoneNo = element.permanent.phoneNumber.slice(element.permanent.phoneNumber.length - 10),
            num = element.permanent.phoneNumber,
            this.addressCountryCode = num.slice(0, num.length - 10);
        }
      }
      if (copyAddress.value == element.memberName + ' ' + element.relation) {
        if (element.addressDetail) {
          this.familyAddressDetailRequestDTO = element.addressDetail,
            this.familyAddressDetailRequestDTO.pinCode = element.addressDetail.pinCode,
            this.addressPhoneNo = element.addressDetail.phoneNumber.slice(element.addressDetail.phoneNumber.length - 10),
            num = element.addressDetail.phoneNumber,
            this.addressCountryCode = num.slice(0, num.length - 11);
          return;
        }
      }
    })
  }



  filterRelationship(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.relationshipList.length; i++) {
      let country = this.relationshipList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredRelationshipList = filtered;
  }

  filterGender(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.allGenders.length; i++) {
      let country = this.allGenders[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredallGendersList = filtered;
  }

  filterMaritalStatus(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.maritalStatusList.length; i++) {
      let country = this.maritalStatusList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredmaritalStatusList = filtered;
  }

  filterAgeBracket(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.ageBracketList.length; i++) {
      let country = this.ageBracketList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredageBracketList = filtered;
  }

  filterCopyFromList(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.CopyFromAddressList.length; i++) {
      let country = this.CopyFromAddressList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCopyFromAddressList = filtered;
  }

  filtercountryCode(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countryCode.length; i++) {
      let country = this.countryCode[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredcountryCode = filtered;
  }

  editFamilyMember(family) {
    this.enableForm();
    this.FamilyInformationService.getFamilyDetailsInfo(family.familyMemberInfoId).subscribe(res => {
      this.FamilyDetailsInfoForm.controls['dateOfBirth'].disable();  
      this.FamilyDetailsInfoForm.controls['ageBracket'].disable();
      this.updateFormFlag = true;
      this.FamilyDetailsInfoList = res.data.results[0].familyDetailsGetBean;
      this.familyMemberInfoRequestDTO = res.data.results[0].familyDetailsGetBean.familyMemberInfo;
      this.familyMemberInfoRequestDTO.dateOfBirth = this.datepipe.transform(this.familyMemberInfoRequestDTO.dateOfBirth, 'dd-MMM-yyyy');

      if (res.data.results[0].familyDetailsGetBean.familyMemberInfo.image) {
        this.imageUrl = 'data:' + res.data.results[0].familyDetailsGetBean.familyMemberInfo.type + ';base64,' + res.data.results[0].familyDetailsGetBean.familyMemberInfo.image;
      } else {
        this.imageUrl = "./assets/images/empIcon5.png";
      }

      if (this.familyMemberInfoRequestDTO.isDependant == 1) {
        this.dependentOnEmployee = "yes";
      } else {
        this.dependentOnEmployee = "no";
      }
      if (this.familyMemberInfoRequestDTO.companyMediclaimApplicable == 1) {
        this.companyMediclaim = "yes";
      } else {
        this.companyMediclaim = "no";
      }

      if (this.familyMemberInfoRequestDTO.isMemberActive == 1) {
        this.IsActive = true;
      } else {
        this.IsActive = false;
      }

      this.familyAddressDetailRequestDTO = res.data.results[0].familyDetailsGetBean.familyAddressDetail;

      if (this.familyAddressDetailRequestDTO.phoneNumber) {
        let num;
        this.addressPhoneNo = this.familyAddressDetailRequestDTO.phoneNumber.slice(this.familyAddressDetailRequestDTO.phoneNumber.length - 10),
          num = this.familyAddressDetailRequestDTO.phoneNumber,
          this.addressCountryCode = num.slice(0, num.length - 11);
      }

      this.guardianDetailRequestDTO = res.data.results[0].familyDetailsGetBean.guardianDetail;

      if (this.guardianDetailRequestDTO.phoneNumber) {
        let num1;
        this.guardianPhoneNo = this.guardianDetailRequestDTO.phoneNumber.slice(this.guardianDetailRequestDTO.phoneNumber.length - 10),
          num1 = this.guardianDetailRequestDTO.phoneNumber,
          this.guardianCountryCode = num1.slice(0, num1.length - 11);
      }

      const isActive = this.FamilyDetailsInfoForm.get('isActive');
      isActive.enable();
    })
  }

  viewFamilyMember(family) {
    this.FamilyInformationService.getFamilyDetailsInfo(family.familyMemberInfoId).subscribe(res => {

      this.disableForm();
      this.updateFormFlag = false;
      this.familyViewItem = true;
      this.FamilyDetailsInfoList = res.data.results[0].familyDetailsGetBean;
      this.familyMemberInfoRequestDTO = res.data.results[0].familyDetailsGetBean.familyMemberInfo;

      if (res.data.results[0].familyDetailsGetBean.familyMemberInfo.image) {
        this.imageUrl = 'data:' + res.data.results[0].familyDetailsGetBean.familyMemberInfo.type + ';base64,' + res.data.results[0].familyDetailsGetBean.familyMemberInfo.image;
      } else {
        this.imageUrl = "./assets/images/empIcon5.png";
      }

      if (this.familyMemberInfoRequestDTO.isDependant == 1) {
        this.dependentOnEmployee = "yes";
      } else {
        this.dependentOnEmployee = "no";
      }
      if (this.familyMemberInfoRequestDTO.companyMediclaimApplicable == 1) {
        this.companyMediclaim = "yes";
      } else {
        this.companyMediclaim = "no";
      }
      this.familyMemberInfoRequestDTO.dateOfBirth = this.datepipe.transform(this.familyMemberInfoRequestDTO.dateOfBirth, 'dd-MMM-yyyy');

      this.familyAddressDetailRequestDTO = res.data.results[0].familyDetailsGetBean.familyAddressDetail;

      if (this.familyAddressDetailRequestDTO.phoneNumber) {
        let num;
        this.addressPhoneNo = this.familyAddressDetailRequestDTO.phoneNumber.slice(this.familyAddressDetailRequestDTO.phoneNumber.length - 10),
          num = this.familyAddressDetailRequestDTO.phoneNumber,
          this.addressCountryCode = num.slice(0, num.length - 11);
      }

      this.guardianDetailRequestDTO = res.data.results[0].familyDetailsGetBean.guardianDetail;

      if (this.guardianDetailRequestDTO.phoneNumber) {
        let num1;
        this.guardianPhoneNo = this.guardianDetailRequestDTO.phoneNumber.slice(this.guardianDetailRequestDTO.phoneNumber.length - 10),
          num1 = this.guardianDetailRequestDTO.phoneNumber,
          this.guardianCountryCode = num1.slice(0, num1.length - 11);
      }
    })
  }

  cancelView() {
    this.resetFamilyDetailsForm();
    this.enableForm();
    this.familyViewItem = false;
    this.updateFormFlag = false;
    const isActive = this.FamilyDetailsInfoForm.get('isActive');
    isActive.disable();
    this.dependentOnEmployee = 'no';
    this.companyMediclaim = 'no';
    this.IsActive = true;
  }

  disableForm() {
    const temp1 = this.FamilyDetailsInfoForm.get('familyMemberName');
    temp1.disable();
    const temp2 = this.FamilyDetailsInfoForm.get('dateOfBirth');
    temp2.disable();
    const temp3 = this.FamilyDetailsInfoForm.get('relation');
    temp3.disable();
    const temp4 = this.FamilyDetailsInfoForm.get('gender');
    temp4.disable();
    const temp5 = this.FamilyDetailsInfoForm.get('maritalStatus');
    temp5.disable();
    const temp6 = this.FamilyDetailsInfoForm.get('fatherHusbandName');
    temp6.disable();
    const temp7 = this.FamilyDetailsInfoForm.get('aadhaar');
    temp7.disable();
    const temp8 = this.FamilyDetailsInfoForm.get('nameAsPerAadhaar');
    temp8.disable();
    const temp9 = this.FamilyDetailsInfoForm.get('ageBracket');
    temp9.disable();
    const temp10 = this.FamilyDetailsInfoForm.get('image');
    temp10.disable();
    const temp11 = this.FamilyDetailsInfoForm.get('remark');
    temp11.disable();
    const temp12 = this.FamilyDetailsInfoForm.get('companyMediclaimApplicable');
    temp12.disable();
    const temp13 = this.FamilyDetailsInfoForm.get('isDependant');
    temp13.disable();
    const temp14 = this.FamilyDetailsInfoForm.get('isActive');
    temp14.disable();
    const temp15 = this.FamilyDetailsInfoForm.get('companyMediclaimToggle');
    temp15.disable();

    const temp16 = this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle');
    temp16.disable();
    const temp17 = this.FamilyDetailsInfoForm.get('addressDetailsCountryCode');
    temp17.disable();
    const temp18 = this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber');
    temp18.disable();
    const temp19 = this.FamilyDetailsInfoForm.get('copyFrom');
    temp19.disable();
    const temp20 = this.FamilyDetailsInfoForm.get('addressDetailsAddress1');
    temp20.disable();
    const temp21 = this.FamilyDetailsInfoForm.get('addressDetailsAddress2');
    temp21.disable();
    const temp22 = this.FamilyDetailsInfoForm.get('addressDetailsAddress3');
    temp22.disable();
    const temp23 = this.FamilyDetailsInfoForm.get('addressDetailsCountry');
    temp23.disable();
    const temp24 = this.FamilyDetailsInfoForm.get('addressDetailsPin');
    temp24.disable();

    const temp25 = this.FamilyDetailsInfoForm.get('addressDetailsMobileState');
    temp25.disable();
    const temp26 = this.FamilyDetailsInfoForm.get('addressDetailsCity');
    temp26.disable();
    const temp27 = this.FamilyDetailsInfoForm.get('addressDetailsVillege');
    temp27.disable();
    const temp28 = this.FamilyDetailsInfoForm.get('guardianName');
    temp28.disable();
    const temp29 = this.FamilyDetailsInfoForm.get('guardianCountryCode');
    temp29.disable();
    const temp30 = this.FamilyDetailsInfoForm.get('guardianMobileNumber');
    temp30.disable();
    const temp31 = this.FamilyDetailsInfoForm.get('guardianAddress1');
    temp31.disable();
    const temp32 = this.FamilyDetailsInfoForm.get('guardianAddress2');
    temp32.disable();
    const temp33 = this.FamilyDetailsInfoForm.get('guardianAddress3');
    temp33.disable();
    const temp34 = this.FamilyDetailsInfoForm.get('guardianCountry');
    temp34.disable();
    const temp35 = this.FamilyDetailsInfoForm.get('guardianPin');
    temp35.disable();
    const temp36 = this.FamilyDetailsInfoForm.get('guardianState');
    temp36.disable();
    const temp37 = this.FamilyDetailsInfoForm.get('guardianCity');
    temp37.disable();
    const temp38 = this.FamilyDetailsInfoForm.get('guardianVillege');
    temp38.disable();
  }

  enableForm() {
    const temp1 = this.FamilyDetailsInfoForm.get('familyMemberName');
    temp1.enable();
    const temp2 = this.FamilyDetailsInfoForm.get('dateOfBirth');
    temp2.enable();
    const temp3 = this.FamilyDetailsInfoForm.get('relation');
    temp3.enable();
    const temp4 = this.FamilyDetailsInfoForm.get('gender');
    temp4.enable();
    const temp5 = this.FamilyDetailsInfoForm.get('maritalStatus');
    temp5.enable();
    const temp6 = this.FamilyDetailsInfoForm.get('fatherHusbandName');
    temp6.enable();
    const temp7 = this.FamilyDetailsInfoForm.get('aadhaar');
    temp7.enable();
    const temp8 = this.FamilyDetailsInfoForm.get('nameAsPerAadhaar');
    temp8.enable();
    const temp9 = this.FamilyDetailsInfoForm.get('ageBracket');
    temp9.enable();
    const temp10 = this.FamilyDetailsInfoForm.get('image');
    temp10.enable();
    const temp11 = this.FamilyDetailsInfoForm.get('remark');
    temp11.enable();
    const temp12 = this.FamilyDetailsInfoForm.get('companyMediclaimApplicable');
    temp12.enable();
    const temp13 = this.FamilyDetailsInfoForm.get('isDependant');
    temp13.enable();
    const temp14 = this.FamilyDetailsInfoForm.get('isActive');
    temp14.enable();
    const temp15 = this.FamilyDetailsInfoForm.get('companyMediclaimToggle');
    temp15.enable();

    const temp16 = this.FamilyDetailsInfoForm.get('dependentOnEmployeeToggle');
    temp16.enable();
    const temp17 = this.FamilyDetailsInfoForm.get('addressDetailsCountryCode');
    temp17.enable();
    const temp18 = this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber');
    temp18.enable();
    const temp19 = this.FamilyDetailsInfoForm.get('copyFrom');
    temp19.enable();
    const temp20 = this.FamilyDetailsInfoForm.get('addressDetailsAddress1');
    temp20.enable();
    const temp21 = this.FamilyDetailsInfoForm.get('addressDetailsAddress2');
    temp21.enable();
    const temp22 = this.FamilyDetailsInfoForm.get('addressDetailsAddress3');
    temp22.enable();
    const temp23 = this.FamilyDetailsInfoForm.get('addressDetailsCountry');
    temp23.enable();
    const temp24 = this.FamilyDetailsInfoForm.get('addressDetailsPin');
    temp24.enable();

    const temp25 = this.FamilyDetailsInfoForm.get('addressDetailsMobileState');
    temp25.enable();
    const temp26 = this.FamilyDetailsInfoForm.get('addressDetailsCity');
    temp26.enable();
    const temp27 = this.FamilyDetailsInfoForm.get('addressDetailsVillege');
    temp27.enable();
    const temp28 = this.FamilyDetailsInfoForm.get('guardianName');
    temp28.enable();
    const temp29 = this.FamilyDetailsInfoForm.get('guardianCountryCode');
    temp29.enable();
    const temp30 = this.FamilyDetailsInfoForm.get('guardianMobileNumber');
    temp30.enable();
    const temp31 = this.FamilyDetailsInfoForm.get('guardianAddress1');
    temp31.enable();
    const temp32 = this.FamilyDetailsInfoForm.get('guardianAddress2');
    temp32.enable();
    const temp33 = this.FamilyDetailsInfoForm.get('guardianAddress3');
    temp33.enable();
    const temp34 = this.FamilyDetailsInfoForm.get('guardianCountry');
    temp34.enable();
    const temp35 = this.FamilyDetailsInfoForm.get('guardianPin');
    temp35.enable();
    const temp36 = this.FamilyDetailsInfoForm.get('guardianState');
    temp36.enable();
    const temp37 = this.FamilyDetailsInfoForm.get('guardianCity');
    temp37.enable();
    const temp38 = this.FamilyDetailsInfoForm.get('guardianVillege');
    temp38.enable();
  }
  keyPress(event: any) {

    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateGender() {

    this.maritalStatusList = 'Single,Married,Widow,Widower,Divorced'.split(',');
    if (this.familyMemberInfoRequestDTO.gender == 'Male') {
      this.maritalStatusList.splice(2, 1);
      // this.familyMemberInfoRequestDTO.maritalStatus = '';
    }
    if (this.familyMemberInfoRequestDTO.gender == 'Female') {
      this.maritalStatusList.splice(3, 1);
      // this.familyMemberInfoRequestDTO.maritalStatus = '';
    }
  }

  validMobNo() {

    if (this.addressCountryCode && !this.addressPhoneNo) {
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
    }
    if (!this.addressCountryCode && !this.addressPhoneNo) {
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').clearValidators();
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').clearValidators();
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').updateValueAndValidity();
    }

    if (!this.addressCountryCode && this.addressPhoneNo) {
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').setValidators(Validators.required);
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').updateValueAndValidity();
    }
  }

  validCountryCode() {
    if (this.addressPhoneNo && (this.addressPhoneNo.length > 0 && this.addressPhoneNo.length == 10) && !this.addressCountryCode) {
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').setValidators(Validators.required);
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').updateValueAndValidity();
    }
    if (this.addressPhoneNo && (this.addressPhoneNo.length > 0 && this.addressPhoneNo.length < 10) && !this.addressCountryCode) {
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').setValidators(Validators.required);
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').updateValueAndValidity();
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
    }
    if (this.addressPhoneNo && (this.addressPhoneNo.length > 0 && this.addressPhoneNo.length < 10) && this.addressCountryCode) {
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
    }

    if (this.addressCountryCode && !this.addressPhoneNo) {
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
    }

    if (!this.addressCountryCode && !this.addressPhoneNo) {
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').clearValidators();
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').clearValidators();
      this.FamilyDetailsInfoForm.get('addressDetailsCountryCode').updateValueAndValidity();
    }
    if (this.addressPhoneNo && (this.addressPhoneNo.length > 0 && this.addressPhoneNo.length == 10) && this.addressCountryCode) {
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^[1-9a-zA-Z][0-9a-zA-Z]*$")]));
      this.FamilyDetailsInfoForm.get('addressDetailsMobileNumber').updateValueAndValidity();
    }
  }

  validGuardianMobNo() {
    
    if (this.guardianCountryCode && !this.guardianPhoneNo) {
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
    }
    if (!this.guardianCountryCode && !this.guardianPhoneNo) {
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').clearValidators();
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
      this.FamilyDetailsInfoForm.get('guardianCountryCode').clearValidators();
      this.FamilyDetailsInfoForm.get('guardianCountryCode').updateValueAndValidity();
    }

    if (!this.guardianCountryCode && this.guardianPhoneNo) {
      this.FamilyDetailsInfoForm.get('guardianCountryCode').setValidators(Validators.required);
      this.FamilyDetailsInfoForm.get('guardianCountryCode').updateValueAndValidity();
    }
  }

  validGuardianCountryCode() {
    if (this.guardianPhoneNo && (this.guardianPhoneNo.length > 0 && this.guardianPhoneNo.length == 10) && !this.guardianCountryCode) {
      this.FamilyDetailsInfoForm.get('guardianCountryCode').setValidators(Validators.required);
      this.FamilyDetailsInfoForm.get('guardianCountryCode').updateValueAndValidity();
    }
    if (this.guardianPhoneNo && (this.guardianPhoneNo.length > 0 && this.guardianPhoneNo.length < 10) && !this.guardianCountryCode) {
      this.FamilyDetailsInfoForm.get('guardianCountryCode').setValidators(Validators.required);
      this.FamilyDetailsInfoForm.get('guardianCountryCode').updateValueAndValidity();
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
    }
    if (this.guardianPhoneNo && (this.guardianPhoneNo.length > 0 && this.guardianPhoneNo.length < 10) && this.guardianCountryCode) {
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
    }

    if (this.guardianCountryCode && !this.guardianPhoneNo) {
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
    }

    if (!this.guardianCountryCode && !this.guardianPhoneNo) {
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').clearValidators();
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
      this.FamilyDetailsInfoForm.get('guardianCountryCode').clearValidators();
      this.FamilyDetailsInfoForm.get('guardianCountryCode').updateValueAndValidity();
    }
    if (this.guardianPhoneNo && (this.guardianPhoneNo.length > 0 && this.guardianPhoneNo.length == 10) && this.guardianCountryCode) {
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^[1-9a-zA-Z][0-9a-zA-Z]*$")]));
      this.FamilyDetailsInfoForm.get('guardianMobileNumber').updateValueAndValidity();
    }
  }

  // updateAadhaarName(aadhaar) {

  //   if (this.FamilyDetailsInfoForm.controls.aadhaar.valid == true && aadhaar) {
  //     this.familyMemberInfoRequestDTO.nameAsPerAadhaar = this.fullName;
  //   }
  //   if (aadhaar.length == 0 || this.FamilyDetailsInfoForm.controls.aadhaar.valid == false) {
  //     this.familyMemberInfoRequestDTO.nameAsPerAadhaar = '';
  //   }
  // }
}
