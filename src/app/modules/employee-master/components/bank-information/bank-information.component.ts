import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { BankInformationModel } from './bank-information.model';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
// import * as wjcInput from '@grapecity/wijmo.input';
import { DatePipe } from '@angular/common';
import { BankInformationService } from './bank-information.service';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
import { startWith, map } from 'rxjs/operators';
import { MustMatch } from './password-match.validator';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BankInformationComponent implements OnInit {

  bankInfoForm: FormGroup;
  GridBankInfoForm: FormGroup;
  BankInformationModel = new BankInformationModel('', '', '', '', '', '', '', '', '', '')
  BankInformationArray: Array<any> = [];
  shareCountryDataSubcription: Subscription;
  countryList: Array<any> = [];
  filteredCountries: Array<any> = [];
  initiateBankForm: Subscription;
  // summaryGridData: Array<any> = [];
  bankSummaryGridData: Array<any> = [];
  employeeMasterId: number;
  IFSCcodeList: Array<any> = [];
  TotalIFSCcodeList: Array<any> = [];
  ht: any;
  flexNew: any;
  editingItem: any;
  viewItem: any;
  private _currentEditItem: any = null;
  restoreSearchTerm: any;
  addButton: boolean = false;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  never: boolean = false;
  states: Array<any> = [];
  filteredStates: Array<any> = [];
  editstates: Array<any> = [];
  Totalstates: Array<any> = [];
  stateModel: any;
  accountNoMatched: boolean = false;
  employeeBankInfoId: number;
  confirmAccountNumber: any = '';
  accountNumberCountError: any;
  confirmAccountNumberCountError: any;
  viewBankForm: boolean = false;
  editstateModel: any;
  viewstateModel: any;
  maxAccNumber: number;
  countries: Array<any> = [];
  ifscCodeList: Array<any> = [];
  bankNameList: Array<any> = [];
  branchNameList: Array<any> = [];
  branchAddressList: Array<any> = [];
  nameAsPerBankList: Array<any> = [];
  accountNumberList: Array<any> = [];
  stateList: Array<any> = [];
  searchTerm = new Subject<string>();
  autoCompleteControl;
  showOptios: boolean = false;
  saveNextBoolean: boolean = false;
  accountNo: boolean;
  confirmAccountNo1: boolean;


  constructor(private formBuilder: FormBuilder, private EventEmitterService: EventEmitterService,
    public datepipe: DatePipe, private BankInformationService: BankInformationService,
    private CommonDataService: SharedInformationService, private router: Router,) { }

  ngOnInit(): void {

    this.bankInfoForm = this.formBuilder.group({
      country: [''],
      state: [''],
      bankIFSC: [{ value: '', disabled: true }],
      bankName: [''],
      branchName: [''],
      branchAddress: [''],
      nameAsPerBank: ['', Validators.compose([Validators.pattern(/^(?=.*[a-zA-Z0-9•	)(.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	)(.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
      accountNumber: [''],
      confirmAccountNo: ['']
    },
      {
        validator: MustMatch('accountNumber', 'confirmAccountNo')
      });
    this.bankInfoForm.get('confirmAccountNo').setValue('');
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getBankAccounts();

    this.CommonDataService.getLocationInformation().subscribe(res => {

      this.countryList = res.data.results;
    })

    this.shareCountryDataSubcription = this.EventEmitterService.setCountryData().subscribe(res => {
      if (res) {
        this.countryList = res.countryList;
      }
    })

  }

  // Selection of country based validation for IFSC and other fields
  selectCountry() {

    if (this.BankInformationModel.country == 'India') {
      this.bankInfoForm.get('bankIFSC').enable();
    } else {
      this.bankInfoForm.get('bankIFSC').disable();
      this.BankInformationModel.bankIFSC = '';
      this.BankInformationModel.bankName = '';
      this.BankInformationModel.branchName = '';
      this.BankInformationModel.branchAddress = '';
      this.confirmAccountNumber = '';
      this.BankInformationModel.accountNo = '';
      this.BankInformationModel.nameAsPerBank = '';
      this.maxAccNumber = null;
    }
  }

  // Get API method of bank accounts
  getBankAccounts() {
    this.BankInformationService.getBankInformation(this.employeeMasterId).subscribe(res => {

      this.bankSummaryGridData = res.data.results[0];
      // this.employeeBankInfoId = res.data.results[0][0].employeeBankInfoId;
    });
  }


  // Get IFSC Details
  getDataFromIFSC(bankIFSC) {

    if (bankIFSC.length < 11) {
      this.BankInformationModel.bankName = '';
      this.BankInformationModel.branchName = '';
      this.BankInformationModel.branchAddress = '';
      this.confirmAccountNumber = '';
      this.BankInformationModel.accountNo = '';
      this.BankInformationModel.nameAsPerBank = '';
      this.maxAccNumber = null;
    }
    if (bankIFSC.length == 11) {
      this.IFSCDetails(bankIFSC);
    }
  }

  IFSCDetails(bankIFSC) {

    this.BankInformationService.getDataFromIFSC(bankIFSC).subscribe(res => {

      this.maxAccNumber = res.data.results[0].limit
      if (this.maxAccNumber == 0) {
        this.maxAccNumber = null;
      }
      this.BankInformationModel.bankName = res.data.results[0].bankName;
      this.BankInformationModel.branchName = res.data.results[0].branchName;
      this.BankInformationModel.branchAddress = res.data.results[0].address;
      this.addButton = true;
    });
  }

  clearData() {
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.bankIFSC = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.accountNo = '';
    this.BankInformationModel.nameAsPerBank = '';
  }

  // Save&Next Submit Method
  BankSaveNextSubmit(BankInformationModel) {
    this.saveNextBoolean = true;

    this.postBankInfoForm(BankInformationModel);
  }

  // Bank Form save Post Function
  postBankInfoForm(BankInformationModel) {

    BankInformationModel.employeeMasterId = this.employeeMasterId;
    delete BankInformationModel.confirmAccountNo;
    BankInformationModel.state = this.stateModel;
    this.BankInformationService.postBankInfoForm(BankInformationModel).subscribe(res => {

      this.getBankAccounts();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetForm();
      this.confirmAccountNumber = '';
      this.bankInfoForm.get('confirmAccountNo').setValue('');
      this.bankInfoForm.markAsUntouched();
      this.bankInfoForm.get('bankIFSC').disable();
      this.accountNoMatched = false;
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/payroll-area-information']);
      }
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  // Bank Form save Put Function
  updateBankGridRow(BankInformationModel) {

    BankInformationModel.employeeMasterId = this.employeeMasterId;
    delete BankInformationModel.confirmAccountNo;
    BankInformationModel.state = this.stateModel;
    this.BankInformationService.putBankInfoForm(BankInformationModel).subscribe(res => {

      this.getBankAccounts();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetForm();
      this.confirmAccountNumber = '';
      this.bankInfoForm.markAsUntouched();
      this.bankInfoForm.get('confirmAccountNo').setValue('');
      this.accountNoMatched = false;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  // Edit grid row method
  editBankGridRow(bank) {

    this.viewBankForm = false;
    this.maxAccNumber = bank.maxAccNumber;
    this.addButton = true;
    this.accountNumberCountError = '';
    this.confirmAccountNumberCountError = '';
    this.bankInfoForm.get('bankIFSC').enable();
    this.BankInformationModel.country = bank.country;
    this.BankInformationModel.bankIFSC = bank.bankIFSC;
    this.BankInformationModel.bankName = bank.bankName;
    this.BankInformationModel.branchName = bank.branchName;
    this.BankInformationModel.branchAddress = bank.branchAddress;
    this.BankInformationModel.nameAsPerBank = bank.nameAsPerBank;
    this.BankInformationModel.accountNo = bank.accountNo;
    this.confirmAccountNumber = bank.accountNo;
    this.bankInfoForm.get('confirmAccountNo').setValue(bank.accountNo);
    this.accountNoMatched = true;
    this.BankInformationModel.employeeBankInfoId = bank.employeeBankInfoId
    this.stateModel = bank.state;
    // this.confirmAccountNumber = '';
    // this.bankInfoForm.get('confirmAccountNo').setValue('');
    const temp1 = this.bankInfoForm.get('country');
    temp1.enable();
    const temp2 = this.bankInfoForm.get('state');
    temp2.enable();
    const temp3 = this.bankInfoForm.get('bankIFSC');
    temp3.enable();
    const temp4 = this.bankInfoForm.get('bankName');
    temp4.enable();
    const temp5 = this.bankInfoForm.get('branchName');
    temp5.enable();
    const temp6 = this.bankInfoForm.get('branchAddress');
    temp6.enable();
    const temp7 = this.bankInfoForm.get('nameAsPerBank');
    temp7.enable();
    const temp8 = this.bankInfoForm.get('accountNumber');
    temp8.enable();
    const temp9 = this.bankInfoForm.get('confirmAccountNo');
    temp9.enable();
  }

  // View grid row method
  viewBankGridRow(bank) {
    this.viewBankForm = true;
    this.accountNumberCountError = '';
    this.confirmAccountNumberCountError = '';
    this.BankInformationModel.country = bank.country;
    this.BankInformationModel.bankIFSC = bank.bankIFSC;
    this.BankInformationModel.bankName = bank.bankName;
    this.BankInformationModel.branchName = bank.branchName;
    this.BankInformationModel.branchAddress = bank.branchAddress;
    this.BankInformationModel.nameAsPerBank = bank.nameAsPerBank;
    this.BankInformationModel.accountNo = bank.accountNo;
    this.BankInformationModel.employeeBankInfoId = bank.employeeBankInfoId
    this.stateModel = bank.state;
    const temp1 = this.bankInfoForm.get('country');
    temp1.disable();
    const temp2 = this.bankInfoForm.get('state');
    temp2.disable();
    const temp3 = this.bankInfoForm.get('bankIFSC');
    temp3.disable();
    const temp4 = this.bankInfoForm.get('bankName');
    temp4.disable();
    const temp5 = this.bankInfoForm.get('branchName');
    temp5.disable();
    const temp6 = this.bankInfoForm.get('branchAddress');
    temp6.disable();
    const temp7 = this.bankInfoForm.get('nameAsPerBank');
    temp7.disable();
    const temp8 = this.bankInfoForm.get('accountNumber');
    temp8.disable();
    const temp9 = this.bankInfoForm.get('confirmAccountNo');
    temp9.disable();
  }

  // close Edit and view method
  closeBankGridRow(BankInformationModel) {
    this.viewBankForm = false;
    this.resetForm();
    this.confirmAccountNumber = '';
    this.accountNoMatched = false;
    this.addButton = false;
    this.bankInfoForm.get('confirmAccountNo').setValue('');
    const temp1 = this.bankInfoForm.get('country');
    temp1.enable();
    const temp2 = this.bankInfoForm.get('state');
    temp2.enable();
    // const temp3 = this.bankInfoForm.get('bankIFSC');
    // temp3.enable();
    const temp4 = this.bankInfoForm.get('bankName');
    temp4.enable();
    const temp5 = this.bankInfoForm.get('branchName');
    temp5.enable();
    const temp6 = this.bankInfoForm.get('branchAddress');
    temp6.enable();
    const temp7 = this.bankInfoForm.get('nameAsPerBank');
    temp7.enable();
    const temp8 = this.bankInfoForm.get('accountNumber');
    temp8.enable();
    const temp9 = this.bankInfoForm.get('confirmAccountNo');
    temp9.enable();
  }

  resetForm() {
    this.bankInfoForm.reset();
    this.clearFormData();
    this.accountNoMatched = false;
    this.addButton = false;
    this.maxAccNumber = null;
    this.accountNumberCountError = '';
    this.confirmAccountNumberCountError = '';
    this.BankInformationModel.country = '';
    this.bankInfoForm.get('country').setValue('');
    this.bankInfoForm.get('bankIFSC').disable();
    this.confirmAccountNumber = '';
    this.bankInfoForm.get('confirmAccountNo').setValue('');
    this.stateModel = '';
    this.bankInfoForm.get('state').setValue('');
  }

  // Account number verification API
  confirmMatchAccountNo(confirmPassword) {

    if (confirmPassword == this.BankInformationModel.accountNo) {
      this.accountNoMatched = true;

      this.BankInformationService.accountNoVerification(confirmPassword, 0).subscribe(res => {
        // DelayNode

        // this.CommonDataService.sweetalertMasterSuccess(res.status.messsage, res.status.result);
        // if(res.status.messsage == 'Account Number  Already Exists '){
        //   this.BankInformationModel.accountNo = '';
        //   this.confirmAccountNumber = '';
        // }
      }, (error: any) => {

        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })

    } else {
      this.accountNoMatched = false;
    }
  }

  // Account number validation method
  validateAccountNo(accountNo) {
    this.formTouch(this.bankInfoForm)
    if (this.maxAccNumber) {
     if (accountNo.length != this.maxAccNumber)
     // if (accountNo.length < this.maxAccNumber || accountNo.length > this.maxAccNumber)
      {
        this.accountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';

      } else {
        this.accountNumberCountError = '';

      }
    }
    if (accountNo == 0) {
      this.confirmAccountNumber = '';
      // this.gridEditConfirmAccountNumber = ''
    }
  }
  clearFormData() {
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.bankIFSC = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.accountNo = '';
    this.BankInformationModel.nameAsPerBank = '';
    this.BankInformationModel.employeeBankInfoId = '';
  }

  keyPress(event: any) {

    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  toggleFieldTextType() {
    this.accountNo = !this.accountNo
  }

  accountNoMatchValidation() {

    if (this.bankInfoForm.controls['confirmAccountNo'].value == this.BankInformationModel.accountNo
      && this.BankInformationModel.accountNo.length > 0) {
      this.accountNoMatched = true;
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", 'Account Number Matched');
    } else {
      this.accountNoMatched = false;
    }
  }

  validateConfirmAccountNo(confirmAccountNumber) {
    this.formTouch(this.bankInfoForm)
    if (this.maxAccNumber) {
      if (confirmAccountNumber.length < this.maxAccNumber || confirmAccountNumber.length > this.maxAccNumber)
       {
        this.confirmAccountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';
      } else {
        this.confirmAccountNumberCountError = '';
      }
    }
  }

  hideAccountNo(accountNo) {

    if (accountNo == true) {
      setTimeout(() => {
        this.accountNo = false;
      }, 3000)
    }
  }

  hideConfirmAccountNo(confirmAccountNo1) {

    if (confirmAccountNo1 == true) {
      setTimeout(() => {
        this.confirmAccountNo1 = false;
      }, 3000)
    }
  }

  getHideAccountNo(accountNo) {

    if (accountNo.length > 0) {
      this.accountNo = true
      setTimeout(() => {
        this.accountNo = false;
      }, 1000)
    }
  }

  getHideconfirmAccountNo(confirmAccountNumber) {
    if (confirmAccountNumber.length > 0) {
      this.confirmAccountNo1 = true
      setTimeout(() => {
        this.confirmAccountNo1 = false;
      }, 1000)
    }
  }

  formTouch(bankInfoForm: FormGroup) {
    (<any>Object).values(bankInfoForm.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.formTouch(control);
      }
    });
  }
}
