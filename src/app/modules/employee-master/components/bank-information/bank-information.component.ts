import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { BankInformationModel } from './../../dto-models/bank-information.model';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
// import * as wjcInput from '@grapecity/wijmo.input';
import { DatePipe } from '@angular/common';
import { BankInformationService } from './../../employee-master-services/bank-information.service';
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
    this.getStates();

    this.CommonDataService.getLocationInformation().subscribe(res => {

      this.countryList = res.data.results;
      // setTimeout(() => {
      //   this.BankInformationModel.country = 'India';
      //   this.bankInfoForm.get('country').setValue('India');
      // })
    })
    // this.initiateBankForm = this.EventEmitterService.setBankFormInitiate().subscribe(res => {

    // })
    this.shareCountryDataSubcription = this.EventEmitterService.setCountryData().subscribe(res => {
      if (res) {
        this.countryList = res.countryList;
      }
    })

  }

  selectCountry(){

    if(this.BankInformationModel.country == 'India'){
      this.bankInfoForm.get('bankIFSC').enable();
    } else{
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

  getBankAccounts() {
    this.BankInformationService.getBankInformation(this.employeeMasterId).subscribe(res => {
      
      this.bankSummaryGridData = res.data.results[0];
      // this.employeeBankInfoId = res.data.results[0][0].employeeBankInfoId;
    });
  }

  getStates() {
    this.BankInformationService.getStates().subscribe(res => {
      this.states = res.data.results;
      this.Totalstates = res.data.results;
      this.editstates = res.data.results;
      this.stateModel = '';
    })
  }

  searchIFSC(searchTerm, bankIFSC) {

    if (searchTerm.query.length < 2) {
      this.IFSCcodeList = []
      this.TotalIFSCcodeList = []
    }
    if (bankIFSC.length < 11) {
      this.BankInformationModel.bankName = '';
      this.BankInformationModel.branchName = '';
      this.BankInformationModel.branchAddress = '';
      this.confirmAccountNumber = '';
      this.BankInformationModel.accountNo = '';
      this.BankInformationModel.nameAsPerBank = '';
    }
    if (searchTerm.query.length == 2) {
      // setTimeout(() => {
      this.BankInformationService.searchIFSC(searchTerm.query, this.stateModel).subscribe(res => {
        this.IFSCcodeList = res.data.results[0];
        this.TotalIFSCcodeList = res.data.results[0];
        if (this.TotalIFSCcodeList.length > 0) {
          this.filterIFSCCodes(searchTerm.query);
        } else {
          this.CommonDataService.sweetalertError('Recordnot found');
          // this.notifyService.showError ('Recordnot found', "Error..!!")
        }
      })
      // }, 1500)
    }
    this.filterIFSCCodes(searchTerm.query);

    if (bankIFSC.length == 11) {
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return item == searchTerm.query;
      });
      if (ifsc == searchTerm.query) {
        this.IFSCDetails(searchTerm.query);
      }
    }
  }

  filterIFSCCodes(searchTerm) {
    if (searchTerm.length > 2) {
      searchTerm = searchTerm.toLowerCase();
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
      this.IFSCcodeList = ifsc;
      // this.GridIFSCcodeList = ifsc;
      this.showOptios = true;
    }
  }

  searchStates(searchTerm) {
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.bankIFSC = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.accountNo = '';
    this.BankInformationModel.nameAsPerBank = '';
    this.IFSCcodeList = [];
    // searchTerm = searchTerm.toLowerCase();
    //   const ifsc = this.Totalstates.filter((item) => {
    //     return JSON.stringify(item).toLowerCase().includes(searchTerm);
    //   });
    //   this.states = ifsc;
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
  // bankInfoSubmit() {

  //   this.summaryGridData.forEach(data => {
  //     data.employeeMasterId = this.employeeMasterId;
  //     delete data.confirmAccountNo;
  //     if (data.employeeBankInfoId) {
  //       this.BankInformationService.putBankInfoForm(this.summaryGridData).subscribe(res => {
  //         // this.summaryGridData = res.data.results;
  //         this.getBankAccounts();
  //         this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
  //         this.summaryGridData = [];
  //         // this.BankInformationModel.country = '';
  //         this.BankInformationModel.bankIFSC = '';
  //         this.BankInformationModel.bankName = '';
  //         this.BankInformationModel.branchName = '';
  //         this.BankInformationModel.branchAddress = '';
  //         this.BankInformationModel.nameAsPerBank = '';
  //         this.BankInformationModel.accountNo = '';
  //         this.stateModel = '';
  //         this.confirmAccountNumber = '';
  //         this.BankInformationModel.employeeBankInfoId = '';
  //       })
  //     } else {
  //       this.BankInformationService.postBankInfoForm(this.summaryGridData).subscribe(res => {
  //         // this.summaryGridData = res.data.results;
  //         this.summaryGridData = [];
  //         this.getBankAccounts();
  //         this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
  //         // this.notifyService.showSuccess(res.status.messsage, "Success..!!")
  //       })
  //     }
  //   })
  // }
  BankSaveNextSubmit(BankInformationModel) {
    this.saveNextBoolean = true;

    this.postBankInfoForm(BankInformationModel);
  }

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


  editBankGridRow(bank) {

    this.viewBankForm = false;
    this.maxAccNumber = null;
    this.addButton = true;
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

  viewBankGridRow(bank) {
    this.viewBankForm = true;
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

  resetForm() {
    this.bankInfoForm.reset();
    this.clearFormData();
    this.accountNoMatched = false;
    this.addButton = false;
    this.BankInformationModel.country = 'India';
    this.bankInfoForm.get('country').setValue('India');
    this.confirmAccountNumber = '';
    this.bankInfoForm.get('confirmAccountNo').setValue('');
    this.stateModel = '';
    this.bankInfoForm.get('state').setValue('');
  }

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

  validateAccountNo(accountNo) {
    this.formTouch(this.bankInfoForm)
    if (this.maxAccNumber) {
      if (accountNo.length < this.maxAccNumber || accountNo.length > this.maxAccNumber) {
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
    } else{
      this.accountNoMatched = false;
    }
  }

  validateConfirmAccountNo(confirmAccountNumber) {
    this.formTouch(this.bankInfoForm)
    if (this.maxAccNumber) {
      if (confirmAccountNumber.length < this.maxAccNumber || confirmAccountNumber.length > this.maxAccNumber) {
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

  getHideconfirmAccountNo(confirmAccountNumber){
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
