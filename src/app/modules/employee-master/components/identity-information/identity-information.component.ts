import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IdentityInformation, VisaInformation } from './../../dto-models/identity-information.model';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
import { DatePipe } from '@angular/common';
import { IdentityInformationService } from './../../employee-master-services/identity-informmation/identity-information.service';
import { Subscription } from 'rxjs';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
// import * as wjcInput from '@grapecity/wijmo.input';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CopyFromConfirmationModal } from '../contact-information/contact-information.component';
import { ConfirmationModalComponent } from './../../shared modals/confirmation-modal/confirmation-modal.component';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';



@Component({
  selector: 'app-identity-information',
  templateUrl: './identity-information.component.html',
  styleUrls: ['./identity-information.component.scss']
})
export class IdentityInformationComponent implements OnInit {

  IdentityInfoForm: FormGroup;
  IdentityInformation = new IdentityInformation();
  VisaInformation = new VisaInformation('', '', '', '', '', '', '')
  countryList: Array<any> = [];
  visaTypeList = 'Business,Tourist,Work Permit'.split(',');
  data: any[];
  selectedItem: string;
  fullName: any;
  item: any;
  modalRef: BsModalRef;
  // references FlexGrid named 'flex' in the view
  // @ViewChild('flex') flex: wjcGrid.FlexGrid;
  // @ViewChild('editcell') editcell: wjcInput.Popup;
  // @ViewChild('viewPopUp') viewPopUp: wjcInput.Popup;
  // @ViewChild('gridVisaType') gridVisaType: wjcInput.InputNumber;
  // @ViewChild('gridoriginCountry') gridoriginCountry: wjcInput.InputNumber;
  // @ViewChild('gridVisaValidTill') gridVisaValidTill: wjcInput.InputNumber;

  // @ViewChild('gridViewVisaType') gridViewVisaType: wjcInput.InputNumber;
  // @ViewChild('gridViewOriginCountry') gridViewOriginCountry: wjcInput.InputNumber;
  // @ViewChild('gridViewVisaValidTill') gridViewVisaValidTill: wjcInput.InputNumber;
  date = { dateOfIssue: new Date(), expiryDate: "" }
  tableCountries: Array<any> = [];
  typeOfVisa: Array<any> = [];
  validTill: Array<any> = [];
  initiateidentityForm: Subscription;
  shareCountryDataSubcription: Subscription;
  tomorrow = new Date();
  yesterday = new Date();
  pastportExpiryDate1: Date;
  pastportExpiryDate2: Date;
  drivingExpiryDate1: Date;
  drivingExpiryDate2: Date;
  visaValidTill1: Date;
  visaValidTill2: Date;
  private _currentEditItem: any = null;
  employeeMasterId: number;
  employeeCode: any;
  flexNew: any;
  editingItem: any;
  ht: any;
  temp: any[];
  viewItem: any;
  deleteInternationalWorkerID: Array<any> = [];
  newData: Array<any> = [];
  autoCompleteControl;
  confirmDeleteSubscription: Subscription;
  public today = new Date();
  editVisaDialogFlag: any;
  visaItem: any;
  saveNextBoolean: boolean = false


  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private IdentityInformationService: IdentityInformationService,
    private EventEmitterService: EventEmitterService,
    private SharedInformationService: SharedInformationService,
    private modalService: BsModalService,
    private router: Router,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public VisaDialog: any,) {

    if (VisaDialog?.VisaDialog) {
      this.editVisaDialogFlag = VisaDialog.VisaDialog;
      if (this.editVisaDialogFlag == 'editVisaDialog') {

        this.countryList = VisaDialog.countryList
        this.VisaInformation = VisaDialog.visa;
      }

    }

    this.tomorrow.setDate(this.tomorrow.getDate());
    this.yesterday.setDate(this.yesterday.getDate() - 1);

    let pastportExpiry = new Date();
    let drivingExpiry = new Date();
    let visaDate = new Date();
    this.pastportExpiryDate1 = new Date(pastportExpiry.setDate(pastportExpiry.getDate()));
    this.pastportExpiryDate2 = new Date(pastportExpiry.setDate(pastportExpiry.getDate() - pastportExpiry.getDay() + 3650));

    this.drivingExpiryDate1 = new Date(drivingExpiry.setDate(drivingExpiry.getDate()));
    this.drivingExpiryDate2 = new Date(drivingExpiry.setDate(drivingExpiry.getDate() - drivingExpiry.getDay() + 3650));

    this.visaValidTill1 = new Date(visaDate.setDate(visaDate.getDate()));
    this.visaValidTill2 = new Date(visaDate.setDate(visaDate.getDate() - visaDate.getDay() + 3650));
  }

  ngOnInit(): void {

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.fullName = localStorage.getItem('fullName')
    this.IdentityInfoForm = this.formBuilder.group({
      aadhaarNo: ['', Validators.pattern(/^(\d{12}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)],
      aadhaarName: [''],
      pan: [''],
      panName: [''],
      uan: ['', Validators.pattern(/^(\d{12}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)],
      uanName: [''],
      voterId: [''],
      voterIdName: [''],
      nationalPopulationRegNumber: [''],
      nameNationalPopulationRegNumber: [''],
      drivingLicenceNo: [''],
      nameDrivingLicence: [''],
      drivingLicenceExpiryDate: [''],
      esicIP: [''],
      pranForNPS: ['', Validators.pattern(/^(\d{12}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)],
      passportNo: [''],
      namePassport: [''],
      passportInfoCountry: [''],
      placeOfIssue: [''],
      dateOfIssue: [this.tomorrow],
      expiryDate: [this.date.expiryDate],
      visaInfoCountry: [''],
      typeOfVisa: [''],
      validTill: ['']
    });

    // get API for Identity information

    this.SharedInformationService.getLocationInformation().subscribe(res => {
      this.countryList = res.data.results;

      // setTimeout(() => {
      //   this.VisaInformation.countryName = '';
      //   this.IdentityInformation.employeePersonalInfoRequestDTO.countryOfOrigin = '';
      // })
    })
    this.getIdentityInfoData();
    // this.initiateidentityForm = this.EventEmitterService.setidentityFormInitiate().subscribe(res => {

    //   this.VisaInformation.countryName = '';
    // })
    // this.shareCountryDataSubcription = this.EventEmitterService.setCountryData().subscribe(res => {
    //   if (res) {
    //     this.countryList = res.countryList;
    //     this.VisaInformation.countryName = '';
    //   }
    // })
    this.confirmDeleteSubscription = this.EventEmitterService.setConfirmDeleteIdentityForm().subscribe(element => {


      // (<wjcCore.CollectionView>this.flex.collectionView).remove(this.item);
      this.deleteInternationalWorkerID.push(element.employeeVisaDetailId);
      this.IdentityInfoForm.markAsTouched();
      this.data.find(res => {

        const index = this.data.findIndex(x => res.employeeVisaDetailId == element.employeeVisaDetailId);
        if (res.employeeVisaDetailId == element.employeeVisaDetailId) {
          this.data.splice(index, 1);
        }
      })
      // this.VisaInformation.countryName = '';
    })
  }

  IdentitySaveNextSubmit(IdentityInformation) {
    this.saveNextBoolean = true;

    this.IdentityInfoFormSubmit(IdentityInformation);
  }


  IdentityInfoFormSubmit(IdentityInformation) {

    IdentityInformation.employeePersonalInfoRequestDTO.drivingLicenseExpiryDate =
      this.datepipe.transform(IdentityInformation.employeePersonalInfoRequestDTO.drivingLicenseExpiryDate, "dd-MMM-yyyy");

    IdentityInformation.employeePersonalInfoRequestDTO.passportValidFrom =
      this.datepipe.transform(IdentityInformation.employeePersonalInfoRequestDTO.passportValidFrom, "dd-MMM-yyyy");

    IdentityInformation.employeePersonalInfoRequestDTO.passportExpiryDate =
      this.datepipe.transform(IdentityInformation.employeePersonalInfoRequestDTO.passportExpiryDate, "dd-MMM-yyyy");
    if (IdentityInformation.employeePersonalInfoRequestDTO.pran == null) {
      IdentityInformation.employeePersonalInfoRequestDTO.pran = '';
    }

    // const empId = localStorage.getItem('employeeMasterId')
    // var employeeMasterId = Number(empId);
    IdentityInformation.employeePersonalInfoRequestDTO.employeeMasterId = this.employeeMasterId;
    IdentityInformation.employeeMasterRequestDTO.employeeMasterId = this.employeeMasterId;
    IdentityInformation.employeeESICDTORequestDTO.employeeMasterId = this.employeeMasterId;
    let temp = this.data.forEach(data => {
      return data.validTill = this.datepipe.transform(data.validTill, 'dd-MMM-yyyy');
    })
    IdentityInformation.employeeVisaDetailRequestDTOList = this.data;
    delete IdentityInformation.employeePersonalInfoRequestDTO.employeeMasterResponseDTO;
    delete IdentityInformation.employeePersonalInfoRequestDTO.imageResponseDTO;
    delete IdentityInformation.employeePersonalInfoRequestDTO.internationalWorkerResponseDTO;
    IdentityInformation.employeeVisaDetailRequestDTOList.forEach(data => {
      if (data.id == 0) {
        delete data.id;
      }
    })
    return this.IdentityInformationService.postIdentityInfoForm(IdentityInformation).subscribe((res) => {

      this.dataBinding(res);
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!")
      this.sweetalertMasterSuccess(res.status.messsage, "Success..!!");
      this.IdentityInfoForm.markAsUntouched();

      if (this.deleteInternationalWorkerID.length > 0) {
        this.deleteInternationalWorkerID.forEach(id => {
          this.IdentityInformationService.deleteGridRow(this.employeeMasterId, id).subscribe(res => {
            this.getIdentityInfoData();
            // if (res.data.results[0]) {
            //   this.data = res.data.results[0];
            // }
          })
        })
      }
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/compliance-information/compliance-summary']);
      }
    }, (error: any) => {
      this.sweetalertError(error["error"]["status"]["messsage"]);
      // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
    })
  }
  getIdentityInfoData() {
    this.IdentityInformationService.getIdentityInfoData().subscribe((res: any) => {

      this.newData = res;
      this.dataBinding(res);
    })
  }
  dataBinding(res) {
    
    if (res.data.results[0].employeeESICDTOResponseDTO) {
      this.IdentityInformation.employeeESICDTORequestDTO = res.data.results[0].employeeESICDTOResponseDTO;
    }
    this.IdentityInformation.employeeMasterRequestDTO = res.data.results[0].employeeMasterResponseDTO;
    this.IdentityInformation.employeePersonalInfoRequestDTO = res.data.results[0].employeePersonalInfoResponseDTO;
    if (res.data.results[0].employeeVisaDetailResponseDTOList) {

      this.data = res.data.results[0].employeeVisaDetailResponseDTOList;
    }
  }

  editVisaInfo(visa) {

    this.VisaInformation.countryName = visa.countryName;
    this.VisaInformation.visaType = visa.visaType;
    this.VisaInformation.validTill = visa.validTill;
    this.VisaInformation.employeeVisaDetailId = visa.employeeVisaDetailId;

    // this.modalRef = this.modalService.show(template);
    // const dialogRef = this.dialog.open(IdentityInformationComponent, {
    //   disableClose: true,
    //   width: '100%', height: '92%', maxWidth: '83vw',
    //   data: {
    //     VisaDialog: 'editVisaDialog', visa: visa,
    //     countryList: this.countryList
    //   }
    // });
  }

  removeVisaItem(visa) {
    this.visaItem = visa;
    // this.modalRef = this.modalService.show(template);
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '664px', height: '241px',
      data: {
        pageValue: 'IdentityForm', info: 'Do you really want to delete?',
        visa: visa
      }
    });
  }



  pushToGrid() {
    let data = [];

    if (!this.VisaInformation.employeeVisaDetailId) {
      this.tableCountries = []; this.typeOfVisa = []; this.validTill = [];
      this.tableCountries.push(this.VisaInformation.countryName);
      this.typeOfVisa.push(this.VisaInformation.visaType);
      this.validTill.push(this.VisaInformation.validTill);

      for (let i = 0; i < this.tableCountries.length; i++) {
        data.push({
          employeeMasterId: this.employeeMasterId,
          id: i,
          countryName: this.tableCountries[i],
          visaType: this.typeOfVisa[i],
          validTill: this.validTill[i],
        });
      }
      this.VisaInformation.validTill = '';
      this.VisaInformation.countryName = '';
      this.VisaInformation.visaType = '';

      if (this.data) {
        let newData = data.concat(this.data);
        this.data = newData;

        let temp = this.data.forEach(data => {
          return data.validTill = this.datepipe.transform(data.validTill, 'dd-MMM-yyyy');
        })

      } else {
        data.forEach(data => {
          return data.validTill = this.datepipe.transform(data.validTill, 'dd-MMM-yyyy');
        })
        this.data = data;
      }
    } else {
      this.data.find(res => {

        if (res.employeeVisaDetailId == this.VisaInformation.employeeVisaDetailId) {
          res.countryName = this.VisaInformation.countryName;
          res.visaType = this.VisaInformation.visaType;
          res.validTill = this.VisaInformation.validTill;
          res.employeeVisaDetailId = this.VisaInformation.employeeVisaDetailId;
        }
      })
      this.VisaInformation.validTill = '';
      this.VisaInformation.countryName = '';
      this.VisaInformation.visaType = '';
      this.VisaInformation.employeeVisaDetailId = '';
    }

  }

  // private _updateCurrentInfo() {
  //   this.selectedItem = wjcCore.format(
  //     'Country: <b>{country}</b>, Type Of Visa: <b>{typeOfVisa:c0}</b> Valid Till: <b>{validTill:c0}</b>',
  //     this.flex.collectionView.currentItem);
  // }

  updateAadhaarName(aadhaar) {
    
    if (this.IdentityInfoForm.controls.aadhaarNo.valid == true && aadhaar) {
      this.IdentityInformation.employeeMasterRequestDTO.nameAsPerAADHAAR = this.fullName;
    }
    if (aadhaar.length == 0 || this.IdentityInfoForm.controls.aadhaarNo.valid == false) {
      this.IdentityInformation.employeeMasterRequestDTO.nameAsPerAADHAAR = '';
    }
  }
  updatePANName(pan) {
    if (this.IdentityInfoForm.controls.pan.valid == true && this.IdentityInformation.employeeMasterRequestDTO.pan) {
      this.IdentityInformation.employeeMasterRequestDTO.nameAsPerPAN = this.fullName;
    }
    if (pan.length == 0 || this.IdentityInfoForm.controls.pan.valid == false) {
      this.IdentityInformation.employeeMasterRequestDTO.nameAsPerPAN = '';
    }
  }
  updateUANName(uan) {
    if (this.IdentityInfoForm.controls.uan.valid == true && this.IdentityInformation.employeeMasterRequestDTO.uan) {
      this.IdentityInformation.employeeMasterRequestDTO.nameAgainstUAN = this.fullName;
    }
    if (uan.length == 0 || this.IdentityInfoForm.controls.uan.valid == false) {
      this.IdentityInformation.employeeMasterRequestDTO.nameAgainstUAN = '';
    }
  }
  updateVoterIdName(voterId) {
    if (this.IdentityInfoForm.controls.voterId.valid == true &&
      this.IdentityInformation.employeePersonalInfoRequestDTO.electionCardNo) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameAsperElectionCard = this.fullName;
    }
    if (voterId.length == 0 || this.IdentityInfoForm.controls.voterId.valid == false) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameAsperElectionCard = '';
    }
  }
  updateNPRName(nationalPopulationRegNumber) {
    if (this.IdentityInfoForm.controls.nationalPopulationRegNumber.valid == true
      && this.IdentityInformation.employeePersonalInfoRequestDTO.nprNumber) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameAsPerNPR = this.fullName;
    }
    if (nationalPopulationRegNumber.length == 0 || this.IdentityInfoForm.controls.nationalPopulationRegNumber.valid == false) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameAsPerNPR = '';
    }
  }
  updateDrivingName(drivingLicenceNo) {
    if (this.IdentityInfoForm.controls.drivingLicenceNo.valid == true
      && this.IdentityInformation.employeePersonalInfoRequestDTO.drivingLicenseNo) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameasperDrivingLicense = this.fullName;
    }
    if (drivingLicenceNo.length == 0 || this.IdentityInfoForm.controls.drivingLicenceNo.valid == false) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameasperDrivingLicense = '';
    }
  }
  updatePassportName(passportNo) {
    if (this.IdentityInfoForm.controls.passportNo.valid == true
      && this.IdentityInformation.employeePersonalInfoRequestDTO.passportNo) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameAsPerPassport = this.fullName;
    }
    if (passportNo.length == 0 || this.IdentityInfoForm.controls.passportNo.valid == false) {
      this.IdentityInformation.employeePersonalInfoRequestDTO.nameAsPerPassport = '';
    }
  }
  resetForm() {
    this.IdentityInfoForm.reset();
    this.data = [];
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
