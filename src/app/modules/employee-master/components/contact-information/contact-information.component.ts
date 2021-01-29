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
      officialMobileNumber: ['', Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)],
      personalCountryCode: ['', Validators.required],
      personalmobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      officialEmail: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)])],
      personalEmail: ['', Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)],
      emergencyContactName: [''],
      emergencyContactNumber: ['', Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)],
      emergencyCountryCode: [''],
      localAddress1: ['', Validators.required],
      localAddress2: [''],
      localAddress3: [''],
      localCountry: [''],
      localPin: [''],
      localState: [''],
      localDistrict: [''],
      localCity: [''],
      localVillege: [''],
      permanentAddress1: ['', Validators.required],
      permanentAddress2: [''],
      permanentAddress3: [''],
      permanentCountry: [''],
      permanentPin: [''],
      permanentState: [''],
      permanentDistrict: [''],
      permanentCity: [''],
      permanentVillege: [''],
      communicationAddress: [Validators.required]
    });
    this.getCountryInfo();
    this.getContactInfoData();

    // Response from address copy confirmation dialog
    this.EventEmitterService.getCopyFromConfirmation().subscribe(res => {
      if (res == 'LocalToPermanent') {
        this.copyFromLocalToPermanent();
        this.checkLocalAddress();
      } else {
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
  }
  contactSaveNextSubmit(contactInformation){

    this.saveNextBoolean = true;

    this.contactFormSubmit(contactInformation);
  }

  // Contact Form submit Post API call
  contactFormSubmit(contactInformation) {
    
    // Concatnation of mobile number and country code
    if (contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber && this.ngOfficialCountryCode) {

      this.ContactInfoForm.value.officialMobileNumber = this.ContactInfoForm.value.officialCountryCode + ' ' +
        contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber
      contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = this.ContactInfoForm.value.officialMobileNumber;
    } else {
      contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = ''
    }

    if (contactInformation.employeeMasterRequestDTO.personalMobileNumber && this.ngPersonalCountryCode) {
      this.ContactInfoForm.value.personalmobileNumber = this.ContactInfoForm.value.personalCountryCode + ' ' +
        contactInformation.employeeMasterRequestDTO.personalMobileNumber
      contactInformation.employeeMasterRequestDTO.personalMobileNumber = this.ContactInfoForm.value.personalmobileNumber;
    } else {
      contactInformation.employeeMasterRequestDTO.personalMobileNumber = '';
    }

    if (contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber && this.ngEmergencyCountryCode) {
      this.ContactInfoForm.value.emergencyContactNumber = this.ContactInfoForm.value.emergencyCountryCode + ' ' +
        contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber
      contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = this.ContactInfoForm.value.emergencyContactNumber
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
      this.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.dataBinding(res);

      this.ContactInfoForm.markAsUntouched();
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/bank-information']);
      }
    }, (error: any) => {
      this.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  // get API for contact information
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
      this.ngPersonalCountryCode = null;
    }
    // Official mobile number countryCode extraction
    if (res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber) {
      this.contactInformation.employeePersonalInfoRequestDTO.officialMobileNumber = res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.slice(res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.length - 10)
      this.ngOfficialCountryCode = res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.slice(0, res.data.results[0]['employeePersonalInfoResponseDTO'].officialMobileNumber.length - 10);
    } else {
      this.ngOfficialCountryCode = null;
    }
    // Emergency mobile number countryCode extraction
    if (res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber) {
      this.contactInformation.employeePersonalInfoRequestDTO.emergencyContactNumber = res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.slice(res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.length - 10)
      this.ngEmergencyCountryCode = res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.slice(0, res.data.results[0]['employeePersonalInfoResponseDTO'].emergencyContactNumber.length - 10);
    } else {
      this.ngEmergencyCountryCode = null;
    }

    if (this.localAddressInformation.isCommunicationAddress == 1
      && this.permanentAddressInformation.isCommunicationAddress == 0) {
      this.communicationAddress = 'local'
    }
    if (this.localAddressInformation.isCommunicationAddress == 0
      && this.permanentAddressInformation.isCommunicationAddress == 1) {
      this.communicationAddress = 'permanent'
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
        this.sweetalertError(error["error"]["status"]["messsage"]);
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
        this.sweetalertError(error["error"]["status"]["messsage"]);
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    }
  }
  // Copy addres from Local to Permanent
  copyFromLocalToPermanent() {
    this.permanentAddressInformation.address1 = this.localAddressInformation.address1;
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
    // if (this.permanentAddressInformation.country == null) {
    //   this.permanentAddressInformation.country = '';
    // }
    if (((this.permanentAddressInformation.address1 != null
      || this.permanentAddressInformation.address2 != null || this.permanentAddressInformation.address3 != null
      || this.permanentAddressInformation.country != null || this.permanentAddressInformation.postalCode != null
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
      || this.localAddressInformation.country != null || this.localAddressInformation.postalCode != null
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
    console.log(this.contactInformation);
  }
  validateOfficialEmail(officialEmail) {
    const officialEmailId = this.ContactInfoForm.get('officialEmail');
    if (officialEmailId.status == "VALID" && officialEmail.length > 0) {

      this.ContactInformationService.validateOfficialEmailId(this.contactInformation.employeeMasterRequestDTO.officialEmailId, this.employeeCode).subscribe(res => {
        // this.notifyService.showSuccess(res.status.messsage, res.status.result)
        // this.sweetalertMasterSuccess(res.status.messsag, res.status.messsage);
      }, (error: any) => {
        this.sweetalertError(error.error.status.messsage);
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
        this.sweetalertError(error.error.status.messsage);
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
  }
  clearPermanentAddressFields() {
    if (this.permanentAddressInformation.country != 'India') {
      this.permanentAddressInformation.postalCode = '';
      this.permanentAddressInformation.state = '';
      this.permanentAddressInformation.district = '';
      this.permanentAddressInformation.city = '';
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
  keyPress(event: any) {
    
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}

