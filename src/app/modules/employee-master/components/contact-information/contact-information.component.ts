import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AuthenticationService } from '@src/app/core/services/authentication/authentication.service';
'use strict';
import { ContactInformation, LocalAddressInformation, PermanentAddressInformation, CountryCode } from './../../dto-models/contact-information.model';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { ContactInformationService } from './../../employee-master-services/contact-information/contact-information.service';
// import * as CountryCodes from './../../../assets/JSON files/CountryCodes.json';
// import * as city from './../../../assets/JSON files/city.json';
import { Subscription } from 'rxjs';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
// import { DataService } from '@src/app/core/services/share-data/share-data.service';
import { ConfirmationModalComponent } from './../../shared modals/confirmation-modal/confirmation-modal.component';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ContactInfoLabels } from '../../dto-models/language-info-labels/contact-info-labels.model';



@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactInformationComponent implements OnInit {

  ContactInfoForm: FormGroup;
  // contactInformation: ContactInformation[];
  contactInformation = new ContactInformation();
  localAddressInformation = new LocalAddressInformation('', '', '', '', '', '', '', '', '', '', '', '', '');
  permanentAddressInformation = new PermanentAddressInformation('', '', '', '', '', '', '', '', '', '', '', '', '');
  ContactInfoLabels = new ContactInfoLabels('', '', '', '', '', '', '', '', '', '', '', '', '', ' ', '', '')

  employeeCode: any;
  handicap: any;
  @Input() item: any
  countries: Array<any> = [];
  imageUrl: any = "./assets/images/empIcon.png";
  countryCode: Array<any> = [];
  permanentAddress1: any;
  localAddress1: any;
  selectedISD: any;
  // cityList: Array<any> = (city as any).default;
  communicationAddress: any;
  mask: any;
  staticLabels: boolean = true;
  enableCommunicationAddress: boolean = false;
  initiateContactForm: Subscription;
  shareCountryDataSubcription: Subscription;
  ngPersonalCountryCode: any;

  ngOfficialCountryCode: any;
  ngEmergencyCountryCode: any;
  autoCompleteControl: any;
  newData: Array<any> = [];
  saveNextBoolean: boolean = false;
  changesLabelArray: Array<any> = [];
  selectedLanguage: any;





  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog, private EventEmitterService: EventEmitterService,
    private ContactInformationService: ContactInformationService,
    private SharedInformationService: SharedInformationService,
    private router: Router) {

  }

  ngOnInit(): void {
    const empCode = localStorage.getItem('employeeCode')
    this.employeeCode = Number(empCode);


    this.ContactInfoForm = this.formBuilder.group({
      officialCountryCode: [''],
      officialMobileNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      personalCountryCode: ['', Validators.required],
      personalmobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      officialEmail: ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)])],
      personalEmail: ['', Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)],
      emergencyContactName: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      emergencyContactNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      emergencyCountryCode: [''],
      localAddress1: ['', Validators.required],
      localAddress2: [''],
      localAddress3: [''],
      localCountry: [''],
      localPin: [{ value: '', disabled: true }],
      localState: [{ value: null, disabled: true }],
      localDistrict: [{ value: null, disabled: true }],
      localCity: [{ value: null, disabled: true }],
      localVillege: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      permanentAddress1: ['', Validators.required],
      permanentAddress2: [''],
      permanentAddress3: [''],
      permanentCountry: [''],
      permanentPin: [{ value: '', disabled: true }],
      permanentState: [{ value: null, disabled: true }],
      permanentDistrict: [{ value: null, disabled: true }],
      permanentCity: [{ value: null, disabled: true }],
      permanentVillege: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      communicationAddress: [Validators.required]
    });
    this.getCountryInfo();
    this.getContactInfoData();
    this.selectedLanguage = localStorage.getItem('selectedLanguage');

    // Response from address copy confirmation dialog
    this.EventEmitterService.getCopyFromConfirmation().subscribe(res => {

      if (res == 'LocalToPermanent') {
        // this.formTouch();
        this.markFormGroupTouched(this.ContactInfoForm);
        this.copyFromLocalToPermanent();
        this.checkLocalAddress();
      } else {
        // this.formTouch();
        this.markFormGroupTouched(this.ContactInfoForm);
        this.copyFromPermanentToLocal();
        this.checkLocalAddress();
      }
    })

    if (this.localAddressInformation.address1 == '' && this.permanentAddressInformation.address1 == '') {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.disable();
    }
    if (this.localAddressInformation.address1 != '' && this.permanentAddressInformation.address1 != '') {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.enable();
    }

    this.SharedInformationService.getGlobalLabels(this.selectedLanguage).subscribe(res => {

      this.changesLabelArray = res.data.results.filter(item => {
        // Change English Label's name as per Company setting
        if (item.language == 'en') {
          if (item.isDisplay == true && item.defaultLabelName == 'Mobile Number') {
            this.ContactInfoLabels.officialMobileNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Email Address') {
            this.ContactInfoLabels.officialEmailId = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Mobile Number') {
            this.ContactInfoLabels.personalMobileNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Email Address') {
            this.ContactInfoLabels.personalEmailID = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Name') {
            this.ContactInfoLabels.emergencyContactName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Mobile Number') {
            this.ContactInfoLabels.emergencyContactNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Address 1') {
            this.ContactInfoLabels.address1 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Address 2') {
            this.ContactInfoLabels.address2 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Address 3') {
            this.ContactInfoLabels.address3 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'PIN') {
            this.ContactInfoLabels.PIN = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Country') {
            this.ContactInfoLabels.country = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Communication Address') {
            this.ContactInfoLabels.CommunicationAddress = item.customLabelName;
          }



          // Hide English Labels As per Company setting
          if (item.isDisplay == false && item.defaultLabelName == 'Mobile Number') {
            this.ContactInfoLabels.officialMobileNumber = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Email Address') {
            this.ContactInfoLabels.officialEmailId = false;
          }
          // if (item.isDisplay == false && item.defaultLabelName == 'Mobile Number') {
          //   this.ContactInfoLabels.personalMobileNumber = false;
          // }
          if (item.isDisplay == false && item.defaultLabelName == 'Email Address') {
            this.ContactInfoLabels.personalEmailID = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Name') {
            this.ContactInfoLabels.emergencyContactName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Mobile Number') {
            this.ContactInfoLabels.emergencyContactNumber = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Address 1') {
            this.ContactInfoLabels.address1 = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Address 2') {
            this.ContactInfoLabels.address2 = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Address 3') {
            this.ContactInfoLabels.address3 = false;
          }
          // if (item.isDisplay == false && item.defaultLabelName == 'PIN') {
          //   this.ContactInfoLabels.PIN = false;
          // }
          // if (item.isDisplay == false && item.defaultLabelName == 'Country') {
          //   this.ContactInfoLabels.country = false;
          // }
          if (item.isDisplay == false && item.defaultLabelName == 'Communication Address') {
            this.ContactInfoLabels.CommunicationAddress = false;
          }
        }

        // Change French Label's name as per Company setting
        if (item.language == 'fr') {
          if (item.isDisplay == true && item.defaultLabelName == 'Numéro de portable') {
            this.ContactInfoLabels.officialMobileNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Adresse e-mail') {
            this.ContactInfoLabels.officialEmailId = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Numéro de portable') {
            this.ContactInfoLabels.personalMobileNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Adresse e-mail') {
            this.ContactInfoLabels.personalEmailID = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Nom') {
            this.ContactInfoLabels.emergencyContactName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Numéro de portable') {
            this.ContactInfoLabels.emergencyContactNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Adresse 1') {
            this.ContactInfoLabels.address1 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Adresse 2') {
            this.ContactInfoLabels.address2 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Adresse 3') {
            this.ContactInfoLabels.address3 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'PIN') {
            this.ContactInfoLabels.PIN = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'de campagne') {
            this.ContactInfoLabels.country = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'Adresse de communication') {
            this.ContactInfoLabels.CommunicationAddress = item.customLabelName;
          }



          // Hide French Labels As per Company setting
          if (item.isDisplay == false && item.defaultLabelName == 'Numéro de portable') {
            this.ContactInfoLabels.officialMobileNumber = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Adresse e-mail') {
            this.ContactInfoLabels.officialEmailId = false;
          }
          // if (item.isDisplay == false && item.defaultLabelName == 'Numéro de portable') {
          //   this.ContactInfoLabels.personalMobileNumber = false;
          // }
          if (item.isDisplay == false && item.defaultLabelName == 'Adresse e-mail') {
            this.ContactInfoLabels.personalEmailID = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Nom') {
            this.ContactInfoLabels.emergencyContactName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Numéro de portable') {
            this.ContactInfoLabels.emergencyContactNumber = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Adresse 1') {
            this.ContactInfoLabels.address1 = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Adresse 2') {
            this.ContactInfoLabels.address2 = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'Adresse 3') {
            this.ContactInfoLabels.address3 = false;
          }
          // if (item.isDisplay == false && item.defaultLabelName == 'PIN') {
          //   this.ContactInfoLabels.PIN = false;
          // }
          // if (item.isDisplay == false && item.defaultLabelName == 'de campagne') {
          //   this.ContactInfoLabels.country = false;
          // }
          if (item.isDisplay == false && item.defaultLabelName == 'Adresse de communication') {
            this.ContactInfoLabels.CommunicationAddress = false;
          }
        }

        // Change Hindi Label's name as per Company setting
        if (item.language == 'hi') {
          if (item.isDisplay == true && item.defaultLabelName == 'मोबाइल नंबर') {
            this.ContactInfoLabels.officialMobileNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'ईमेल पता') {
            this.ContactInfoLabels.officialEmailId = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'मोबाइल नंबर') {
            this.ContactInfoLabels.personalMobileNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'ईमेल पता') {
            this.ContactInfoLabels.personalEmailID = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'नाम') {
            this.ContactInfoLabels.emergencyContactName = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'मोबाइल नंबर') {
            this.ContactInfoLabels.emergencyContactNumber = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'पता 1') {
            this.ContactInfoLabels.address1 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'पता 2') {
            this.ContactInfoLabels.address2 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'पता 3') {
            this.ContactInfoLabels.address3 = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'पिन') {
            this.ContactInfoLabels.PIN = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'देश') {
            this.ContactInfoLabels.country = item.customLabelName;
          }
          if (item.isDisplay == true && item.defaultLabelName == 'संचार पता') {
            this.ContactInfoLabels.CommunicationAddress = item.customLabelName;
          } 



          // Hide Labels As per Company setting
          if (item.isDisplay == false && item.defaultLabelName == 'मोबाइल नंबर') {
            this.ContactInfoLabels.officialMobileNumber = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'ईमेल पता') {
            this.ContactInfoLabels.officialEmailId = false;
          }
          // if (item.isDisplay == false && item.defaultLabelName == 'मोबाइल नंबर') {
          //   this.ContactInfoLabels.personalMobileNumber = false;
          // }
          if (item.isDisplay == false && item.defaultLabelName == 'ईमेल पता') {
            this.ContactInfoLabels.personalEmailID = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'नाम') {
            this.ContactInfoLabels.emergencyContactName = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'मोबाइल नंबर') {
            this.ContactInfoLabels.emergencyContactNumber = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'पता 1') {
            this.ContactInfoLabels.address1 = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'पता 2') {
            this.ContactInfoLabels.address2 = false;
          }
          if (item.isDisplay == false && item.defaultLabelName == 'पता 3') {
            this.ContactInfoLabels.address3 = false;
          }
          // if (item.isDisplay == false && item.defaultLabelName == 'पिन') {
          //   this.ContactInfoLabels.PIN = false;
          // }
          // if (item.isDisplay == false && item.defaultLabelName == 'देश') {
          //   this.ContactInfoLabels.country = false;
          // }
          if (item.isDisplay == false && item.defaultLabelName == 'संचार पता') {
            this.ContactInfoLabels.CommunicationAddress = false;
          }
        }
      })
    })

  }
  getCountryInfo() {
    this.SharedInformationService.getLocationInformation().subscribe(res => {
      this.countries = res.data.results;
    })
    this.SharedInformationService.getCountryCodes().subscribe(res => {
      this.countryCode = res.data.results;
    })
  }


  // getting selected communication Address value
  selectionChallenged(event) {

    this.communicationAddress = event.target.defaultValue;
    this.markFormGroupTouched(this.ContactInfoForm);
  }
  contactSaveNextSubmit(contactInformation) {

    this.saveNextBoolean = true;

    this.contactFormSubmit(contactInformation);
  }

  // Contact Form submit Post API call
  contactFormSubmit(contactInformation) {

    // Concatnation of mobile number and country code
    if (contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber && this.ngOfficialCountryCode) {

      contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = this.ngOfficialCountryCode + ' ' +
        contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber
      // contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = this.ContactInfoForm.value.officialMobileNumber;
    } else {
      contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = ''
    }

    if (contactInformation.employeeMasterRequestDTO.personalMobileNumber && this.ngPersonalCountryCode) {
      contactInformation.employeeMasterRequestDTO.personalMobileNumber = this.ContactInfoForm.value.personalCountryCode + ' ' +
        contactInformation.employeeMasterRequestDTO.personalMobileNumber
      // contactInformation.employeeMasterRequestDTO.personalMobileNumber = this.ContactInfoForm.value.personalmobileNumber;
    } else {
      contactInformation.employeeMasterRequestDTO.personalMobileNumber = '';
    }

    if (contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber && this.ngEmergencyCountryCode) {
      contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = this.ContactInfoForm.value.emergencyCountryCode + ' ' +
        contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber
      // contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = this.ContactInfoForm.value.emergencyContactNumber
    } else {
      contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = '';
    }


    // getting employeeMasterId from sessionStorage
    const empId = localStorage.getItem('employeeMasterId')
    var employeeMasterId = Number(empId);
    this.contactInformation.employeeMasterRequestDTO.employeeMasterId = employeeMasterId;
    this.contactInformation.employeePersonalInfoRequestDTO.employeeMasterId = employeeMasterId;

    // Permanent Address empty check condition
    if (this.permanentAddressInformation.address1 != '' || this.permanentAddressInformation.address2 != ''
      || this.permanentAddressInformation.address3 != '' || this.permanentAddressInformation.country != ''
      || this.permanentAddressInformation.postalCode != ''
      || this.permanentAddressInformation.state != '' || this.permanentAddressInformation.district != ''
      || this.permanentAddressInformation.city != '' || this.permanentAddressInformation.village != '') {

      this.permanentAddressInformation.addressType = 'Permanent Address';
      this.permanentAddressInformation.employeeMasterId = employeeMasterId;
      if (this.communicationAddress == 'permanent') {
        this.permanentAddressInformation.isCommunicationAddress = 1;
        // this.permanentAddressInformation.isCommunicationAddressLocal = 0;
      } else {
        this.permanentAddressInformation.isCommunicationAddress = 0;
        // this.permanentAddressInformation.isCommunicationAddressLocal = 1;
      }
      if (contactInformation.employeeAddressRequestDTOList.length == 2) {
        contactInformation.employeeAddressRequestDTOList = []
      }
      contactInformation.employeeAddressRequestDTOList.push(this.permanentAddressInformation);
    }
    // Local Address empty check condition
    if (this.localAddressInformation.address1 != '' || this.localAddressInformation.address2 != ''
      || this.localAddressInformation.address3 != '' || this.localAddressInformation.country != ''
      || this.localAddressInformation.postalCode != '' || this.localAddressInformation.state != ''
      || this.localAddressInformation.district != '' || this.localAddressInformation.city != ''
      || this.permanentAddressInformation.village != '') {

      this.localAddressInformation.addressType = 'Local Address';
      this.localAddressInformation.employeeMasterId = employeeMasterId;
      if (this.communicationAddress == 'local') {
        // this.localAddressInformation.isCommunicationAddressPermanent = 0;
        this.localAddressInformation.isCommunicationAddress = 1;
      } else {
        // this.localAddressInformation.isCommunicationAddressPermanent = 1;
        this.localAddressInformation.isCommunicationAddress = 0;
      }
      contactInformation.employeeAddressRequestDTOList.push(this.localAddressInformation);
    }

    // post call for ContactInformation
    return this.ContactInformationService.postContactInfoForm(contactInformation).subscribe((res) => {
      this.SharedInformationService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.dataBinding(res);

      this.ContactInfoForm.markAsUntouched();
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/bank-information']);
      }
    }, (error: any) => {
      
      // Personal mobile number countryCode extraction
      if (this.ContactInfoForm.value.personalmobileNumber) {
        this.contactInformation.employeeMasterRequestDTO.personalMobileNumber = this.ContactInfoForm.value.personalmobileNumber.slice(this.ContactInfoForm.value.personalmobileNumber.length - 10)
        this.ngPersonalCountryCode = this.ContactInfoForm.value.personalmobileNumber.slice(0, this.ContactInfoForm.value.personalmobileNumber.length - 11);
      } else {
        this.ngPersonalCountryCode = '';
      }
      // Official mobile number countryCode extraction
      if (this.ContactInfoForm.value.officialMobileNumber) {
        this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = this.ContactInfoForm.value.officialMobileNumber.slice(this.ContactInfoForm.value.officialMobileNumber.length - 10)
        this.ngOfficialCountryCode = this.ContactInfoForm.value.officialMobileNumber.slice(0, this.ContactInfoForm.value.officialMobileNumber.length - 11);
      } else {
        this.ngOfficialCountryCode = '';
      }
      // Emergency mobile number countryCode extraction
      if (this.ContactInfoForm.value.emergencyContactNumber) {
        this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = this.ContactInfoForm.value.emergencyContactNumber.slice(this.ContactInfoForm.value.emergencyContactNumber.length - 10)
        this.ngEmergencyCountryCode = this.ContactInfoForm.value.emergencyContactNumber.slice(0, this.ContactInfoForm.value.emergencyContactNumber.length - 11);
      } else {
        this.ngEmergencyCountryCode = '';
      }
      this.SharedInformationService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  // get API for Mobile Number
  getContactInfoData() {

    this.ContactInformationService.getContactInfoData().subscribe((res: any) => {

      this.newData = res;
      this.dataBinding(res);
    })
  }
  dataBinding(res) {

    if (res.data.results[0].employeeAddressResponseDTOList.length > 0) {
      if (res.data.results[0].employeeAddressResponseDTOList[0].addressType == 'Local Address') {
        this.localAddressInformation = res.data.results[0].employeeAddressResponseDTOList[0]
      }
      if (res.data.results[0].employeeAddressResponseDTOList[1].addressType == 'Local Address') {
        this.localAddressInformation = res.data.results[0].employeeAddressResponseDTOList[1]
      }
      if (res.data.results[0].employeeAddressResponseDTOList[0].addressType == 'Permanent Address') {
        this.permanentAddressInformation = res.data.results[0].employeeAddressResponseDTOList[0]
      }
      if (res.data.results[0].employeeAddressResponseDTOList[1].addressType == 'Permanent Address') {
        this.permanentAddressInformation = res.data.results[0].employeeAddressResponseDTOList[1]
      }
    }

    if (this.localAddressInformation.address1 == '' && this.permanentAddressInformation.address1 == '') {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.disable();
    }
    if (this.localAddressInformation.address1 != '' && this.permanentAddressInformation.address1 != '') {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.enable();
    }
    this.contactInformation.employeeMasterRequestDTO.officialEmailId = res.data.results[0]['employeeMasterResponseDTO'].officialEmailId;
    this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactName1 = res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactName1;
    this.contactInformation.employeePersonalInfoRequestDTO.personalEmailID = res.data.results[0]['employeePersonalInfoResponseDTO'].personalEmailID;


    // Personal mobile number countryCode extraction
    if (res.data.results[0]['employeeMasterResponseDTO'].personalMobileNumber) {
      this.contactInformation.employeeMasterRequestDTO.personalMobileNumber = res.data.results[0]['employeeMasterResponseDTO'].personalMobileNumber.slice(res.data.results[0]['employeeMasterResponseDTO'].personalMobileNumber.length - 10)
      let num: string = res.data.results[0]['employeeMasterResponseDTO'].personalMobileNumber;
      this.ngPersonalCountryCode = num.slice(0, num.length - 10);
    } else {
      this.ngPersonalCountryCode = '';
    }
    // Official mobile number countryCode extraction
    if (res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber) {
      this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.slice(res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.length - 10)
      this.ngOfficialCountryCode = res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.slice(0, res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.length - 10);
    } else {
      this.ngOfficialCountryCode = '';
    }
    // Emergency mobile number countryCode extraction
    if (res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber) {
      this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.slice(res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.length - 10)
      this.ngEmergencyCountryCode = res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.slice(0, res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.length - 10);
    } else {
      this.ngEmergencyCountryCode = '';
    }

    if (this.localAddressInformation.isCommunicationAddress == 1
      && this.permanentAddressInformation.isCommunicationAddress == 0) {
      this.communicationAddress = 'local'
    }
    if (this.localAddressInformation.isCommunicationAddress == 0
      && this.permanentAddressInformation.isCommunicationAddress == 1) {
      this.communicationAddress = 'permanent'
    }
    if (!this.localAddressInformation.country) {
      this.localAddressInformation.country = '';
      this.ContactInfoForm.get('permanentCountry').setValue('');
    }
    if (!this.permanentAddressInformation.country) {
      this.permanentAddressInformation.country = '';
      this.ContactInfoForm.get('permanentCountry').setValue('');
    }
  }
  myItemsSourceFunction = (query, max, callback) => {
    query = this.ngPersonalCountryCode;

    let normquery = query.toLowerCase();
    console.log(normquery);

  }
  getLocalAddressFromPIN() {
    if (this.localAddressInformation.postalCode.length < 6) {
      this.localAddressInformation.state = '';
      this.localAddressInformation.district = '';
      this.localAddressInformation.city = '';
    }
    if (this.localAddressInformation.postalCode.length == 6 && this.localAddressInformation.country == 'India') {
      this.ContactInformationService.getAddressFromPIN(this.localAddressInformation.postalCode).subscribe(res => {

        this.localAddressInformation.state = res.data.results[0].state;
        this.localAddressInformation.district = res.data.results[0].district;
        this.localAddressInformation.city = res.data.results[0].city;
      }, (error: any) => {
        this.SharedInformationService.sweetalertError(error["error"]["status"]["messsage"]);
        this.localAddressInformation.postalCode = '';
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    }
  }
  getPermanentAddressFromPIN() {
    if (this.permanentAddressInformation.postalCode.length < 6) {
      this.permanentAddressInformation.state = '';
      this.permanentAddressInformation.district = '';
      this.permanentAddressInformation.city = '';
    }
    if (this.permanentAddressInformation.postalCode.length == 6 && this.permanentAddressInformation.country == 'India') {
      this.ContactInformationService.getAddressFromPIN(this.permanentAddressInformation.postalCode).subscribe(res => {

        this.permanentAddressInformation.state = res.data.results[0].state;
        this.permanentAddressInformation.district = res.data.results[0].district;
        this.permanentAddressInformation.city = res.data.results[0].city;
      }, (error: any) => {
        this.SharedInformationService.sweetalertError(error["error"]["status"]["messsage"]);
        this.permanentAddressInformation.postalCode = '';
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    }
  }
  // Copy addres from Local to Permanent
  copyFromLocalToPermanent() {
    this.permanentAddressInformation.address1 = this.localAddressInformation.address1;
    this.ContactInfoForm.get('permanentAddress1').setValue(this.localAddressInformation.address1);
    this.ContactInfoForm.get('permanentAddress1').updateValueAndValidity();
    this.permanentAddressInformation.address2 = this.localAddressInformation.address2;
    this.permanentAddressInformation.address3 = this.localAddressInformation.address3;
    this.permanentAddressInformation.country = this.localAddressInformation.country;
    this.permanentAddressInformation.postalCode = this.localAddressInformation.postalCode;
    this.permanentAddressInformation.state = this.localAddressInformation.state;
    this.permanentAddressInformation.district = this.localAddressInformation.district;
    this.permanentAddressInformation.city = this.localAddressInformation.city;
    this.permanentAddressInformation.village = this.localAddressInformation.village;

    this.ContactInfoForm.markAsTouched();
  }
  // Copy addres from Permanent to Local
  copyFromPermanentToLocal() {
    this.localAddressInformation.address1 = this.permanentAddressInformation.address1;
    this.ContactInfoForm.get('localAddress1').setValue(this.permanentAddressInformation.address1);
    this.ContactInfoForm.get('localAddress1').updateValueAndValidity();
    this.localAddressInformation.address2 = this.permanentAddressInformation.address2;
    this.localAddressInformation.address3 = this.permanentAddressInformation.address3;
    this.localAddressInformation.country = this.permanentAddressInformation.country;
    this.localAddressInformation.postalCode = this.permanentAddressInformation.postalCode;
    this.localAddressInformation.state = this.permanentAddressInformation.state;
    this.localAddressInformation.district = this.permanentAddressInformation.district;
    this.localAddressInformation.city = this.permanentAddressInformation.city;
    this.localAddressInformation.village = this.permanentAddressInformation.village;
    this.ContactInfoForm.markAsTouched();
    this.checkLocalAddress()
  }

  ConfirmationFromLocalToPermanent(): void {
    if (this.permanentAddressInformation.address1 != '' || this.permanentAddressInformation.address2 != ''
      || this.permanentAddressInformation.address3 != '' || this.permanentAddressInformation.country != ''
      || this.permanentAddressInformation.postalCode != ''
      || this.permanentAddressInformation.state != '' || this.permanentAddressInformation.district != ''
      || this.permanentAddressInformation.city != '' || this.permanentAddressInformation.village != '') {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '664px', height: '241px',
        data: { pageValue: 'LocalToPermanent', info: 'Permanent Address will get changed. Do you want to proceed ?' }
      });
    } else {
      this.copyFromLocalToPermanent();
    }
  }
  ConfirmationFromPermanentToLocal(): void {
    if (this.localAddressInformation.address1 != '' || this.localAddressInformation.address2 != ''
      || this.localAddressInformation.address3 != '' || this.localAddressInformation.country != ''
      || this.localAddressInformation.postalCode != '' || this.localAddressInformation.state != ''
      || this.localAddressInformation.district != '' || this.localAddressInformation.city != ''
      || this.permanentAddressInformation.village != '') {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '664px', height: '241px',
        data: { pageValue: 'PermanentToLocal', info: 'Local Address will get changed. Do you want to proceed ?' }
      });
    } else {
      this.copyFromPermanentToLocal();
    }
  }
  checkLocalAddress() {

    let local;
    let permanent;
    // if (this.permanentAddressInformation.country == '') {
    //   this.permanentAddressInformation.country = null;
    // }
    // if (this.localAddressInformation.country == '') {
    //   this.localAddressInformation.country = null;
    // }
    if (((this.permanentAddressInformation.address1 != null
      || this.permanentAddressInformation.address2 != null || this.permanentAddressInformation.address3 != null
      || this.permanentAddressInformation.country != '' || this.permanentAddressInformation.postalCode != null
      || this.permanentAddressInformation.state != null || this.permanentAddressInformation.district != null
      || this.permanentAddressInformation.city != null || this.permanentAddressInformation.village != null)
      && (this.permanentAddressInformation.address1 != ''
        || this.permanentAddressInformation.address2 != '' || this.permanentAddressInformation.address3 != ''
        || this.permanentAddressInformation.country != '' || this.permanentAddressInformation.postalCode != ''
        || this.permanentAddressInformation.state != '' || this.permanentAddressInformation.district != ''
        || this.permanentAddressInformation.city != '' || this.permanentAddressInformation.village != '')
    )) {
      permanent = true;
    } else {
      permanent = false;
    }

    if (((this.localAddressInformation.address1 != null
      || this.localAddressInformation.address2 != null || this.localAddressInformation.address3 != null
      || this.localAddressInformation.country != '' || this.localAddressInformation.postalCode != null
      || this.localAddressInformation.state != null || this.localAddressInformation.district != null
      || this.localAddressInformation.city != null || this.localAddressInformation.village != null)
      && (this.localAddressInformation.address1 != ''
        || this.localAddressInformation.address2 != '' || this.localAddressInformation.address3 != ''
        || this.localAddressInformation.country != '' || this.localAddressInformation.postalCode != ''
        || this.localAddressInformation.state != '' || this.localAddressInformation.district != ''
        || this.localAddressInformation.city != '' || this.localAddressInformation.village != '')
    )) {
      local = true;
    } else {
      local = false;
    }
    if (permanent == true && local == true) {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.enable();
    }
    if (permanent == false || local == false) {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.disable();
      this.communicationAddress = '';
    }
  }
  checkPermanentAddress() {
    if (this.permanentAddressInformation.address1 != '' || this.permanentAddressInformation.address2 != ''
      || this.permanentAddressInformation.address3 != '' || this.permanentAddressInformation.country != ''
      || this.permanentAddressInformation.postalCode != ''
      || this.permanentAddressInformation.state != '' || this.permanentAddressInformation.district != ''
      || this.permanentAddressInformation.city != '' || this.permanentAddressInformation.village != '') {
      const communicationAddress = this.ContactInfoForm.get('communicationAddress');
      communicationAddress.enable();
      // this.enableCommunicationAddress = true;
    }
  }
  resetForm() {

    this.ContactInfoForm.reset();
    const communicationAddress = this.ContactInfoForm.get('communicationAddress');
    communicationAddress.disable();

    this.ngOfficialCountryCode = '';
    this.ContactInfoForm.get('officialCountryCode').setValue('');
    this.ngPersonalCountryCode = '';
    this.ContactInfoForm.get('personalCountryCode').setValue('');
    this.ngEmergencyCountryCode = '';
    this.ContactInfoForm.get('emergencyCountryCode').setValue('');
    this.localAddressInformation.country = '';
    this.ContactInfoForm.get('localCountry').setValue('');
    this.permanentAddressInformation.country = '';
    this.ContactInfoForm.get('permanentCountry').setValue('');

    this.ContactInfoForm.get('officialMobileNumber').clearValidators();
    this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
    this.ContactInfoForm.get('officialCountryCode').clearValidators();
    this.ContactInfoForm.get('officialCountryCode').updateValueAndValidity();

    this.ContactInfoForm.get('emergencyContactNumber').clearValidators();
    this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
    this.ContactInfoForm.get('emergencyCountryCode').clearValidators();
    this.ContactInfoForm.get('emergencyCountryCode').updateValueAndValidity();
  }
  validateOfficialEmail(officialEmail) {
    const officialEmailId = this.ContactInfoForm.get('officialEmail');
    if (officialEmailId.status == "VALID" && officialEmail.length > 0) {

      this.ContactInformationService.validateOfficialEmailId(this.contactInformation.employeeMasterRequestDTO.officialEmailId, this.employeeCode).subscribe(res => {
        // this.notifyService.showSuccess(res.status.messsage, res.status.result)
        // this.sweetalertMasterSuccess(res.status.messsag, res.status.messsage);
      }, (error: any) => {
        this.SharedInformationService.sweetalertError(error.error.status.messsage);
        // this.notifyService.showError(error.error.status.messsage, "Error..!!")
      });
    }
  }
  validatePersonalMobile(ngPersonalCountryCode) {

    const personalmobileNumber = this.ContactInfoForm.get('personalmobileNumber');
    if (personalmobileNumber.status == "VALID" && ngPersonalCountryCode) {

      const mobileNoCountryCode = ngPersonalCountryCode + ' ' + this.contactInformation.employeeMasterRequestDTO.personalMobileNumber;

      this.ContactInformationService.validatePersonalMobile(mobileNoCountryCode, this.employeeCode).subscribe(res => {
        // this.notifyService.showSuccess(res.status.messsage, res.status.result)
        // this.sweetalertMasterSuccess(res.status.messsag, res.status.messsage);
      }, (error: any) => {
        this.SharedInformationService.sweetalertError(error.error.status.messsage);
        // this.notifyService.showError(error.error.status.messsage, "Error..!!")
      });
    }
  }

  validatePersonalEmailId(personalEmailID) {

    const personalEmail = this.ContactInfoForm.get('personalEmail');
    if (personalEmail.status == "VALID" && personalEmailID.length > 0) {

      this.ContactInformationService.validatePersonalEmailId(this.contactInformation.employeePersonalInfoRequestDTO.personalEmailID, this.employeeCode).subscribe(res => {
        // this.notifyService.showSuccess(res.status.messsage, res.status.result)
        // this.sweetalertMasterSuccess(res.status.messsag, res.status.messsage);
      }, (error: any) => {
        this.SharedInformationService.sweetalertError(error.error.status.messsage);
        // this.notifyService.showError(error.error.status.messsage, "Error..!!")
      });
    }
  }


  clearLocalAddressFields() {

    if (this.localAddressInformation.country != 'India') {
      this.localAddressInformation.postalCode = '';
      this.localAddressInformation.state = '';
      this.localAddressInformation.district = '';
      this.localAddressInformation.city = '';
    }

    if (this.localAddressInformation.country) {
      const localPin = this.ContactInfoForm.get('localPin');
      localPin.enable();
      this.ContactInfoForm.get('localPin').setValidators(Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")]));
      this.ContactInfoForm.get('localPin').updateValueAndValidity();
    } else {
      const localPin = this.ContactInfoForm.get('localPin');
      localPin.disable();
      this.ContactInfoForm.get('localPin').clearValidators();
      this.ContactInfoForm.get('localPin').updateValueAndValidity();
    }
  }
  clearPermanentAddressFields() {
    if (this.permanentAddressInformation.country != 'India') {
      this.permanentAddressInformation.postalCode = '';
      this.permanentAddressInformation.state = '';
      this.permanentAddressInformation.district = '';
      this.permanentAddressInformation.city = '';
    }

    if (this.permanentAddressInformation.country) {
      const permanentPin = this.ContactInfoForm.get('permanentPin');
      permanentPin.enable();
      this.ContactInfoForm.get('permanentPin').setValidators(Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")]));
      this.ContactInfoForm.get('permanentPin').updateValueAndValidity();
    } else {
      const permanentPin = this.ContactInfoForm.get('permanentPin');
      permanentPin.disable();
      this.ContactInfoForm.get('permanentPin').clearValidators();
      this.ContactInfoForm.get('permanentPin').updateValueAndValidity();
    }
  }

  // sweetalertMasterSuccess(message: any, text: any) {
  //   Swal.fire({
  //     Mobile Number: message,
  //     text: text,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'success',
  //     timer: 3000,
  //     timerProgressBar: true,
  //   })
  // }

  // sweetalertError(message: any) {
  //   Swal.fire({
  //     Mobile Number: message,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'error',
  //     timer: 3000,
  //     timerProgressBar: true,
  //   })
  // }
  keyPress(event: any) {

    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  formTouch() {
    this.ContactInfoForm.markAsTouched();
  }

  markFormGroupTouched(ContactInfoForm: FormGroup) {
    (<any>Object).values(ContactInfoForm.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  validOfficialMobNo() {

    if (this.ngOfficialCountryCode && (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length == 0 && this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length < 10)) {
      this.ContactInfoForm.get('officialMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
    }
    if (!this.ngOfficialCountryCode && !this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber) {
      this.ContactInfoForm.get('officialMobileNumber').clearValidators();
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
      this.ContactInfoForm.get('officialCountryCode').clearValidators();
      this.ContactInfoForm.get('officialCountryCode').updateValueAndValidity();
    }

    if (!this.ngOfficialCountryCode && this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber) {
      this.ContactInfoForm.get('officialCountryCode').setValidators(Validators.required);
      this.ContactInfoForm.get('officialCountryCode').updateValueAndValidity();
    }
  }

  validOfficialCountryCode() {
    if (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber && (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length == 10) && !this.ngOfficialCountryCode) {
      this.ContactInfoForm.get('officialCountryCode').setValidators(Validators.required);
      this.ContactInfoForm.get('officialCountryCode').updateValueAndValidity();
    }
    if (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber && (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length < 10) && !this.ngOfficialCountryCode) {
      this.ContactInfoForm.get('officialCountryCode').setValidators(Validators.required);
      this.ContactInfoForm.get('officialCountryCode').updateValueAndValidity();
      this.ContactInfoForm.get('officialMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
    }
    if (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber && (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length < 10) && this.ngOfficialCountryCode) {
      this.ContactInfoForm.get('officialMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
    }

    if (this.ngOfficialCountryCode && !this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber) {
      this.ContactInfoForm.get('officialMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
    }

    if (!this.ngOfficialCountryCode && !this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber) {
      this.ContactInfoForm.get('officialMobileNumber').clearValidators();
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
      this.ContactInfoForm.get('officialCountryCode').clearValidators();
      this.ContactInfoForm.get('officialCountryCode').updateValueAndValidity();
    }
    if (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber && (this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber.length == 10) && this.ngOfficialCountryCode) {
      this.ContactInfoForm.get('officialMobileNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^[1-9a-zA-Z][0-9a-zA-Z]*$")]));
      this.ContactInfoForm.get('officialMobileNumber').updateValueAndValidity();
    }
  }

  validEmergencyMobNo() {

    if (this.ngEmergencyCountryCode && (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length == 0 && this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length < 10)) {
      this.ContactInfoForm.get('emergencyContactNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
    }
    if (!this.ngEmergencyCountryCode && !this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber) {
      this.ContactInfoForm.get('emergencyContactNumber').clearValidators();
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
      this.ContactInfoForm.get('emergencyCountryCode').clearValidators();
      this.ContactInfoForm.get('emergencyCountryCode').updateValueAndValidity();
    }

    if (!this.ngEmergencyCountryCode && this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber) {
      this.ContactInfoForm.get('emergencyCountryCode').setValidators(Validators.required);
      this.ContactInfoForm.get('emergencyCountryCode').updateValueAndValidity();
    }
  }

  validEmergencyCountryCode() {

    if (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber && (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length == 10) && !this.ngEmergencyCountryCode) {
      this.ContactInfoForm.get('emergencyCountryCode').setValidators(Validators.required);
      this.ContactInfoForm.get('emergencyCountryCode').updateValueAndValidity();
    }
    if (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber && (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length < 10) && !this.ngEmergencyCountryCode) {
      this.ContactInfoForm.get('emergencyCountryCode').setValidators(Validators.required);
      this.ContactInfoForm.get('emergencyCountryCode').updateValueAndValidity();
      this.ContactInfoForm.get('emergencyContactNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
    }
    if (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber && (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length < 10) && this.ngEmergencyCountryCode) {
      this.ContactInfoForm.get('emergencyContactNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
    }

    if (this.ngEmergencyCountryCode && !this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber) {
      this.ContactInfoForm.get('emergencyContactNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]));
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
    }

    if (!this.ngEmergencyCountryCode && !this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber) {
      this.ContactInfoForm.get('emergencyContactNumber').clearValidators();
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
      this.ContactInfoForm.get('emergencyCountryCode').clearValidators();
      this.ContactInfoForm.get('emergencyCountryCode').updateValueAndValidity();
    }
    if (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber && (this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length > 0 && this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber.length == 10) && this.ngEmergencyCountryCode) {
      this.ContactInfoForm.get('emergencyContactNumber').setValidators(Validators.compose([Validators.required, Validators.pattern("^[1-9a-zA-Z][0-9a-zA-Z]*$")]));
      this.ContactInfoForm.get('emergencyContactNumber').updateValueAndValidity();
    }
  }
}

