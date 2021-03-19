"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankInformationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var bank_information_model_1 = require("./../../dto-models/bank-information.model");
var rxjs_1 = require("rxjs");
var password_match_validator_1 = require("./password-match.validator");
var BankInformationComponent = /** @class */ (function () {
    function BankInformationComponent(formBuilder, EventEmitterService, datepipe, BankInformationService, CommonDataService, router) {
        this.formBuilder = formBuilder;
        this.EventEmitterService = EventEmitterService;
        this.datepipe = datepipe;
        this.BankInformationService = BankInformationService;
        this.CommonDataService = CommonDataService;
        this.router = router;
        this.BankInformationModel = new bank_information_model_1.BankInformationModel('', '', '', '', '', '', '', '', '', '');
        this.BankInformationArray = [];
        this.countryList = [];
        this.filteredCountries = [];
        // summaryGridData: Array<any> = [];
        this.bankSummaryGridData = [];
        this.IFSCcodeList = [];
        this.TotalIFSCcodeList = [];
        this._currentEditItem = null;
        this.addButton = false;
        this.myControl = new forms_1.FormControl();
        this.never = false;
        this.states = [];
        this.filteredStates = [];
        this.editstates = [];
        this.Totalstates = [];
        this.accountNoMatched = false;
        this.confirmAccountNumber = '';
        this.viewBankForm = false;
        this.countries = [];
        this.ifscCodeList = [];
        this.bankNameList = [];
        this.branchNameList = [];
        this.branchAddressList = [];
        this.nameAsPerBankList = [];
        this.accountNumberList = [];
        this.stateList = [];
        this.searchTerm = new rxjs_1.Subject();
        this.showOptios = false;
        this.saveNextBoolean = false;
    }
    BankInformationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bankInfoForm = this.formBuilder.group({
            country: [''],
            state: [''],
            bankIFSC: [{ value: '', disabled: true }],
            bankName: [''],
            branchName: [''],
            branchAddress: [''],
            nameAsPerBank: ['', forms_1.Validators.compose([forms_1.Validators.pattern(/^(?=.*[a-zA-Z0-9•	)(.ÄäËëÏïÖöÜüŸÿ' ])[a-zA-Z0-9•	)(.ÄäËëÏïÖöÜüŸÿ' ]+$/)])],
            accountNumber: [''],
            confirmAccountNo: ['']
        }, {
            validator: password_match_validator_1.MustMatch('accountNumber', 'confirmAccountNo')
        });
        this.bankInfoForm.get('confirmAccountNo').setValue('');
        var empId = localStorage.getItem('employeeMasterId');
        this.employeeMasterId = Number(empId);
        this.getBankAccounts();
        this.getStates();
        this.CommonDataService.getLocationInformation().subscribe(function (res) {
            _this.countryList = res.data.results;
            // setTimeout(() => {
            //   this.BankInformationModel.country = 'India';
            //   this.bankInfoForm.get('country').setValue('India');
            // })
        });
        // this.initiateBankForm = this.EventEmitterService.setBankFormInitiate().subscribe(res => {
        // })
        this.shareCountryDataSubcription = this.EventEmitterService.setCountryData().subscribe(function (res) {
            if (res) {
                _this.countryList = res.countryList;
            }
        });
    };
    BankInformationComponent.prototype.selectCountry = function () {
        if (this.BankInformationModel.country == 'India') {
            this.bankInfoForm.get('bankIFSC').enable();
        }
        else {
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
    };
    BankInformationComponent.prototype.getBankAccounts = function () {
        var _this = this;
        this.BankInformationService.getBankInformation(this.employeeMasterId).subscribe(function (res) {
            _this.bankSummaryGridData = res.data.results[0];
            // this.employeeBankInfoId = res.data.results[0][0].employeeBankInfoId;
        });
    };
    BankInformationComponent.prototype.getStates = function () {
        var _this = this;
        this.BankInformationService.getStates().subscribe(function (res) {
            _this.states = res.data.results;
            _this.Totalstates = res.data.results;
            _this.editstates = res.data.results;
            _this.stateModel = '';
        });
    };
    BankInformationComponent.prototype.searchIFSC = function (searchTerm, bankIFSC) {
        var _this = this;
        if (searchTerm.query.length < 2) {
            this.IFSCcodeList = [];
            this.TotalIFSCcodeList = [];
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
            this.BankInformationService.searchIFSC(searchTerm.query, this.stateModel).subscribe(function (res) {
                _this.IFSCcodeList = res.data.results[0];
                _this.TotalIFSCcodeList = res.data.results[0];
                if (_this.TotalIFSCcodeList.length > 0) {
                    _this.filterIFSCCodes(searchTerm.query);
                }
                else {
                    _this.CommonDataService.sweetalertError('Recordnot found');
                    // this.notifyService.showError ('Recordnot found', "Error..!!")
                }
            });
            // }, 1500)
        }
        this.filterIFSCCodes(searchTerm.query);
        if (bankIFSC.length == 11) {
            var ifsc = this.TotalIFSCcodeList.filter(function (item) {
                return item == searchTerm.query;
            });
            if (ifsc == searchTerm.query) {
                this.IFSCDetails(searchTerm.query);
            }
        }
    };
    BankInformationComponent.prototype.filterIFSCCodes = function (searchTerm) {
        if (searchTerm.length > 2) {
            searchTerm = searchTerm.toLowerCase();
            var ifsc = this.TotalIFSCcodeList.filter(function (item) {
                return JSON.stringify(item).toLowerCase().includes(searchTerm);
            });
            this.IFSCcodeList = ifsc;
            // this.GridIFSCcodeList = ifsc;
            this.showOptios = true;
        }
    };
    BankInformationComponent.prototype.searchStates = function (searchTerm) {
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
    };
    // Get IFSC Details
    BankInformationComponent.prototype.getDataFromIFSC = function (bankIFSC) {
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
    };
    BankInformationComponent.prototype.IFSCDetails = function (bankIFSC) {
        var _this = this;
        this.BankInformationService.getDataFromIFSC(bankIFSC).subscribe(function (res) {
            _this.maxAccNumber = res.data.results[0].limit;
            if (_this.maxAccNumber == 0) {
                _this.maxAccNumber = null;
            }
            _this.BankInformationModel.bankName = res.data.results[0].bankName;
            _this.BankInformationModel.branchName = res.data.results[0].branchName;
            _this.BankInformationModel.branchAddress = res.data.results[0].address;
            _this.addButton = true;
        });
    };
    BankInformationComponent.prototype.clearData = function () {
        this.BankInformationModel.bankName = '';
        this.BankInformationModel.branchName = '';
        this.BankInformationModel.branchAddress = '';
        this.BankInformationModel.bankIFSC = '';
        this.confirmAccountNumber = '';
        this.BankInformationModel.accountNo = '';
        this.BankInformationModel.nameAsPerBank = '';
    };
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
    BankInformationComponent.prototype.BankSaveNextSubmit = function (BankInformationModel) {
        this.saveNextBoolean = true;
        this.postBankInfoForm(BankInformationModel);
    };
    BankInformationComponent.prototype.postBankInfoForm = function (BankInformationModel) {
        var _this = this;
        BankInformationModel.employeeMasterId = this.employeeMasterId;
        delete BankInformationModel.confirmAccountNo;
        BankInformationModel.state = this.stateModel;
        this.BankInformationService.postBankInfoForm(BankInformationModel).subscribe(function (res) {
            _this.getBankAccounts();
            _this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
            _this.resetForm();
            _this.confirmAccountNumber = '';
            _this.bankInfoForm.get('confirmAccountNo').setValue('');
            _this.bankInfoForm.markAsUntouched();
            _this.bankInfoForm.get('bankIFSC').disable();
            _this.accountNoMatched = false;
            if (_this.saveNextBoolean == true) {
                _this.saveNextBoolean = false;
                _this.router.navigate(['/employee-master/payroll-area-information']);
            }
        }, function (error) {
            _this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        });
    };
    BankInformationComponent.prototype.updateBankGridRow = function (BankInformationModel) {
        var _this = this;
        BankInformationModel.employeeMasterId = this.employeeMasterId;
        delete BankInformationModel.confirmAccountNo;
        BankInformationModel.state = this.stateModel;
        this.BankInformationService.putBankInfoForm(BankInformationModel).subscribe(function (res) {
            _this.getBankAccounts();
            _this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
            _this.resetForm();
            _this.confirmAccountNumber = '';
            _this.bankInfoForm.markAsUntouched();
            _this.bankInfoForm.get('confirmAccountNo').setValue('');
            _this.accountNoMatched = false;
        }, function (error) {
            _this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        });
    };
    BankInformationComponent.prototype.editBankGridRow = function (bank) {
        this.viewBankForm = false;
        this.maxAccNumber = null;
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
        this.BankInformationModel.employeeBankInfoId = bank.employeeBankInfoId;
        this.stateModel = bank.state;
        // this.confirmAccountNumber = '';
        // this.bankInfoForm.get('confirmAccountNo').setValue('');
        var temp1 = this.bankInfoForm.get('country');
        temp1.enable();
        var temp2 = this.bankInfoForm.get('state');
        temp2.enable();
        var temp3 = this.bankInfoForm.get('bankIFSC');
        temp3.enable();
        var temp4 = this.bankInfoForm.get('bankName');
        temp4.enable();
        var temp5 = this.bankInfoForm.get('branchName');
        temp5.enable();
        var temp6 = this.bankInfoForm.get('branchAddress');
        temp6.enable();
        var temp7 = this.bankInfoForm.get('nameAsPerBank');
        temp7.enable();
        var temp8 = this.bankInfoForm.get('accountNumber');
        temp8.enable();
        var temp9 = this.bankInfoForm.get('confirmAccountNo');
        temp9.enable();
    };
    BankInformationComponent.prototype.viewBankGridRow = function (bank) {
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
        this.BankInformationModel.employeeBankInfoId = bank.employeeBankInfoId;
        this.stateModel = bank.state;
        var temp1 = this.bankInfoForm.get('country');
        temp1.disable();
        var temp2 = this.bankInfoForm.get('state');
        temp2.disable();
        var temp3 = this.bankInfoForm.get('bankIFSC');
        temp3.disable();
        var temp4 = this.bankInfoForm.get('bankName');
        temp4.disable();
        var temp5 = this.bankInfoForm.get('branchName');
        temp5.disable();
        var temp6 = this.bankInfoForm.get('branchAddress');
        temp6.disable();
        var temp7 = this.bankInfoForm.get('nameAsPerBank');
        temp7.disable();
        var temp8 = this.bankInfoForm.get('accountNumber');
        temp8.disable();
        var temp9 = this.bankInfoForm.get('confirmAccountNo');
        temp9.disable();
    };
    BankInformationComponent.prototype.closeBankGridRow = function (BankInformationModel) {
        this.viewBankForm = false;
        this.resetForm();
        this.confirmAccountNumber = '';
        this.accountNoMatched = false;
        this.addButton = false;
        this.bankInfoForm.get('confirmAccountNo').setValue('');
        var temp1 = this.bankInfoForm.get('country');
        temp1.enable();
        var temp2 = this.bankInfoForm.get('state');
        temp2.enable();
        // const temp3 = this.bankInfoForm.get('bankIFSC');
        // temp3.enable();
        var temp4 = this.bankInfoForm.get('bankName');
        temp4.enable();
        var temp5 = this.bankInfoForm.get('branchName');
        temp5.enable();
        var temp6 = this.bankInfoForm.get('branchAddress');
        temp6.enable();
        var temp7 = this.bankInfoForm.get('nameAsPerBank');
        temp7.enable();
        var temp8 = this.bankInfoForm.get('accountNumber');
        temp8.enable();
        var temp9 = this.bankInfoForm.get('confirmAccountNo');
        temp9.enable();
    };
    BankInformationComponent.prototype.resetForm = function () {
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
    };
    BankInformationComponent.prototype.confirmMatchAccountNo = function (confirmPassword) {
        var _this = this;
        if (confirmPassword == this.BankInformationModel.accountNo) {
            this.accountNoMatched = true;
            this.BankInformationService.accountNoVerification(confirmPassword, 0).subscribe(function (res) {
                // DelayNode
                // this.CommonDataService.sweetalertMasterSuccess(res.status.messsage, res.status.result);
                // if(res.status.messsage == 'Account Number  Already Exists '){
                //   this.BankInformationModel.accountNo = '';
                //   this.confirmAccountNumber = '';
                // }
            }, function (error) {
                _this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
        else {
            this.accountNoMatched = false;
        }
    };
    BankInformationComponent.prototype.validateAccountNo = function (accountNo) {
        this.formTouch(this.bankInfoForm);
        if (this.maxAccNumber) {
            if (accountNo.length < this.maxAccNumber || accountNo.length > this.maxAccNumber) {
                this.accountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';
            }
            else {
                this.accountNumberCountError = '';
            }
        }
        if (accountNo == 0) {
            this.confirmAccountNumber = '';
            // this.gridEditConfirmAccountNumber = ''
        }
    };
    BankInformationComponent.prototype.clearFormData = function () {
        this.BankInformationModel.bankName = '';
        this.BankInformationModel.branchName = '';
        this.BankInformationModel.branchAddress = '';
        this.BankInformationModel.bankIFSC = '';
        this.confirmAccountNumber = '';
        this.BankInformationModel.accountNo = '';
        this.BankInformationModel.nameAsPerBank = '';
        this.BankInformationModel.employeeBankInfoId = '';
    };
    BankInformationComponent.prototype.keyPress = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    BankInformationComponent.prototype.toggleFieldTextType = function () {
        this.accountNo = !this.accountNo;
    };
    BankInformationComponent.prototype.accountNoMatchValidation = function () {
        if (this.bankInfoForm.controls['confirmAccountNo'].value == this.BankInformationModel.accountNo
            && this.BankInformationModel.accountNo.length > 0) {
            this.accountNoMatched = true;
            this.CommonDataService.sweetalertMasterSuccess("Success..!!", 'Account Number Matched');
        }
        else {
            this.accountNoMatched = false;
        }
    };
    BankInformationComponent.prototype.validateConfirmAccountNo = function (confirmAccountNumber) {
        this.formTouch(this.bankInfoForm);
        if (this.maxAccNumber) {
            if (confirmAccountNumber.length < this.maxAccNumber || confirmAccountNumber.length > this.maxAccNumber) {
                this.confirmAccountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';
            }
            else {
                this.confirmAccountNumberCountError = '';
            }
        }
    };
    BankInformationComponent.prototype.hideAccountNo = function (accountNo) {
        var _this = this;
        if (accountNo == true) {
            setTimeout(function () {
                _this.accountNo = false;
            }, 3000);
        }
    };
    BankInformationComponent.prototype.hideConfirmAccountNo = function (confirmAccountNo1) {
        var _this = this;
        if (confirmAccountNo1 == true) {
            setTimeout(function () {
                _this.confirmAccountNo1 = false;
            }, 3000);
        }
    };
    BankInformationComponent.prototype.getHideAccountNo = function (accountNo) {
        var _this = this;
        if (accountNo.length > 0) {
            this.accountNo = true;
            setTimeout(function () {
                _this.accountNo = false;
            }, 1000);
        }
    };
    BankInformationComponent.prototype.getHideconfirmAccountNo = function (confirmAccountNumber) {
        var _this = this;
        if (confirmAccountNumber.length > 0) {
            this.confirmAccountNo1 = true;
            setTimeout(function () {
                _this.confirmAccountNo1 = false;
            }, 1000);
        }
    };
    BankInformationComponent.prototype.formTouch = function (bankInfoForm) {
        var _this = this;
        Object.values(bankInfoForm.controls).forEach(function (control) {
            control.markAsTouched();
            if (control.controls) {
                _this.formTouch(control);
            }
        });
    };
    BankInformationComponent = __decorate([
        core_1.Component({
            selector: 'app-bank-information',
            templateUrl: './bank-information.component.html',
            styleUrls: ['./bank-information.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], BankInformationComponent);
    return BankInformationComponent;
}());
exports.BankInformationComponent = BankInformationComponent;
