"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankMasterAtGroupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var BankMasterAtGroupComponent = /** @class */ (function () {
    function BankMasterAtGroupComponent(modalService, formBuilder, bankMasterAtGroupService, alertService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.bankMasterAtGroupService = bankMasterAtGroupService;
        this.alertService = alertService;
        this.summaryHtmlDataList = [];
        this.showButtonSaveAndReset = true;
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.form = forms_1.FormGroup;
        this.ifscCodeList = [];
        this.countryCode = [];
        this.stateList = [];
        this.editedRecordIndex = 0;
        this.viewMode = false;
        this.TotalIFSCcodeList = [];
        this.countries = [];
        this.BankInformationModel = '';
        this.isIfscCodeValid = false;
        this.form = this.formBuilder.group({
            ifscCode: new forms_1.FormControl('', forms_1.Validators.required),
            bankName: new forms_1.FormControl({ value: '', disabled: true }),
            branchName: new forms_1.FormControl({ value: '', disabled: true }),
            branchAddress: new forms_1.FormControl({ value: '', disabled: true }),
            // state: new FormControl(''),
            country: new forms_1.FormControl({ value: '', disabled: true })
        });
    }
    BankMasterAtGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bankMasterAtGroupService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        }, function (error) {
        }, function () {
            _this.form.get('country').setValue('India');
        });
        // this.bankMasterAtGroupService.getStates().subscribe((res) => {
        //   this.stateList = res.data.results;
        // });
        this.refreshHtmlTable();
    };
    BankMasterAtGroupComponent.prototype.refreshHtmlTable = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.bankMasterDetailsResponse = {};
        this.bankMasterAtGroupService.getBankMasterDetails().subscribe(function (res) {
            console.log('getBankMasterDetails', res);
            _this.bankMasterDetailsResponse = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    bankName: element.bankName,
                    branchName: element.branchName,
                    companyBankMasterId: element.companyBankMasterId,
                    ifscCode: element.ifscCode,
                    isActive: element.isActive
                };
                _this.summaryHtmlDataList.push(obj);
                console.log(_this.summaryHtmlDataList);
            });
        });
    };
    BankMasterAtGroupComponent.prototype.getDataFromIFSC = function (bankIFSC) {
        this.isIfscCodeValid = false;
        if (bankIFSC.length < 11) {
            // this.BankInformationModel.bankName = '';
            // this.BankInformationModel.branchName = '';
            // this.BankInformationModel.branchAddress = '';
            // this.confirmAccountNumber = '';
            // this.BankInformationModel.accountNo = '';
            // this.BankInformationModel.nameAsPerBank = '';
            this.form.patchValue({
                bankName: '',
                branchName: '',
                branchAddress: ''
            });
        }
        if (bankIFSC.length == 11) {
            this.IFSCDetails(bankIFSC);
        }
        if (bankIFSC) {
            // this.gridEditIFSC1 = bankIFSC
            // this.IFSCGridDetails(bankIFSC);
        }
    };
    BankMasterAtGroupComponent.prototype.IFSCDetails = function (bankIFSC) {
        var _this = this;
        if (bankIFSC.length == 11) {
            this.bankMasterAtGroupService.getDataFromIFSC(bankIFSC).subscribe(function (res) {
                console.log(res);
                _this.form.patchValue({
                    branchName: res.data.results[0].branchName,
                    branchAddress: res.data.results[0].address,
                    bankName: res.data.results[0].bankName
                });
                if (_this.form.get('bankName').value.length > 0) {
                    _this.isIfscCodeValid = true;
                }
            });
        }
    };
    BankMasterAtGroupComponent.prototype.onSelectIFSCCode = function (evt) {
        var _this = this;
        if (evt.length == 11) {
            console.log('evt::==', evt);
            this.bankMasterAtGroupService.getDataFromIFSC(evt).subscribe(function (res) {
                console.log(res);
                _this.form.patchValue({
                    branchName: res.data.results[0].branchName,
                    branchAddress: res.data.results[0].address,
                    bankName: res.data.results[0].bankName
                });
            });
        }
    };
    BankMasterAtGroupComponent.prototype.getDataFromIFSC1 = function (bankIFSC) {
        if (bankIFSC.length < 11) {
            this.form.patchValue({
                bankName: '',
                branchName: '',
                branchAddress: ''
            });
        }
        if (bankIFSC.length == 11) {
            this.IFSCDetails(bankIFSC);
        }
    };
    BankMasterAtGroupComponent.prototype.IFSCDetails1 = function (bankIFSC) {
        var _this = this;
        this.bankMasterAtGroupService.getDataFromIFSC(bankIFSC).subscribe(function (res) {
            _this.maxAccNumber = res.data.results[0].limit;
            if (_this.maxAccNumber == 0) {
                _this.maxAccNumber = null;
            }
            _this.form.patchValue({
                bankName: res.data.results[0].bankName,
                branchName: res.data.results[0].branchName,
                branchAddress: res.data.results[0].address
            });
        });
    };
    BankMasterAtGroupComponent.prototype.DeleteBankMaster = function (companyBankMasterId) {
        var _this = this;
        console.log(this.editedRecordIndex);
        this.bankMasterAtGroupService.deleteCompanyBankMaster(companyBankMasterId).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Bank Master  Deleted Successfully.', '');
            _this.isSaveAndReset = true;
            _this.showButtonSaveAndReset = true;
            _this.refreshHtmlTable();
            //  else {
            //     this.alertService.sweetalertError(error.error['status'].messsage);
            // }
        }, function (error) {
            _this.alertService.sweetalertError(error.error['status'].messsage);
        }, function () {
        });
    };
    BankMasterAtGroupComponent.prototype.saveBankMaster = function () {
        var _this = this;
        var saveData = ({
            ifscCode: this.form.get('ifscCode').value,
            bankName: this.form.get('bankName').value,
            branchName: this.form.get('branchName').value
        });
        console.log(JSON.stringify(saveData));
        this.bankMasterAtGroupService.postBankMaster(saveData).subscribe(function (res) {
            console.log(res);
            if (res.data.results.length !== 0) {
                _this.alertService.sweetalertMasterSuccess('Bank Master Added Successfully.', '');
                _this.isSaveAndReset = true;
                _this.form.reset();
                _this.showButtonSaveAndReset = true;
                _this.refreshHtmlTable();
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
                //  this.alertService.sweetalertError(error.error['status'].messsage);
                // this.alertService.sweetalertError(error.error['status'].messsage);
                // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            }
        }, function (error) {
            console.log(error);
            // this.alertService.sweetalertMasterSuccess('[error']['status']['messsage']);
            _this.alertService.sweetalertError(error.error['status'].messsage);
            // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        });
    };
    BankMasterAtGroupComponent.prototype.onSelectState = function (evt) {
        this.selectedState = evt;
        this.bankIFSC = '';
        // this.ifscCodeList = [];
        // this.bankMasterAtGroupService.getIfscCodeStateWise(evt).subscribe((res) => {
        //  this.ifscCodeList = res.data.results;
        // }   , (error: any) => {
        //   this.alertService.sweetalertError(error.error['status'].messsage);
        // });
    };
    BankMasterAtGroupComponent.prototype.editMaster = function (i, companyBankMasterId) {
        window.scrollTo(0, 0);
        this.isEditMode = true;
        this.viewMode = false;
        this.editedRecordIndex = companyBankMasterId;
        this.form.patchValue(this.bankMasterDetailsResponse[i]);
        this.ifscCodeList.push(this.bankMasterDetailsResponse[i].ifscCode);
        this.form.patchValue({
            branchName: this.summaryHtmlDataList[i].branchName,
            branchAddress: this.summaryHtmlDataList[i].branchAddress,
            bankName: this.summaryHtmlDataList[i].bankName
        });
        this.form.get('branchName').disable();
        this.form.get('branchAddress').disable();
        this.form.get('country').disable();
    };
    BankMasterAtGroupComponent.prototype.viewMaster = function (i) {
        window.scrollTo(0, 0);
        this.viewMode = true;
        this.isEditMode = true;
        console.log(this.bankMasterDetailsResponse[i]);
        this.form.patchValue(this.bankMasterDetailsResponse[i]);
        this.ifscCodeList.push(this.bankMasterDetailsResponse[i].ifscCode);
        this.form.patchValue({
            branchName: this.summaryHtmlDataList[i].branchName,
            branchAddress: this.summaryHtmlDataList[i].branchAddress,
            bankName: this.summaryHtmlDataList[i].bankName
        });
        this.form.disable();
    };
    BankMasterAtGroupComponent.prototype.cancelView = function () {
        this.form.reset();
        this.ifscCodeList = [];
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.editedRecordIndex = 0;
        this.form.enable();
        this.form.get('branchName').disable();
        this.form.get('branchAddress').disable();
        this.form.get('country').disable();
        this.form.get('country').setValue('India');
        this.form.get('bankName').disable();
    };
    BankMasterAtGroupComponent.prototype.activateBankMaster = function () { };
    BankMasterAtGroupComponent.prototype.searchIFSC = function (searchTerm, bankIFSC) {
        var _this = this;
        this.form.patchValue({
            branchName: '',
            branchAddress: '',
            bankName: ''
        });
        if (searchTerm.query.length < 11) {
            this.ifscCodeList = [];
        }
        if (bankIFSC.length < 11) {
            // this.BankInformationModel.bankName = '';
            // this.BankInformationModel.branchName = '';
            // this.BankInformationModel.branchAddress = '';
            // this.confirmAccountNumber = '';
            // this.BankInformationModel.accountNo = '';
            // this.BankInformationModel.nameAsPerBank = '';
        }
        if (searchTerm.query.length == 2) {
            // setTimeout(() => {
            this.bankMasterAtGroupService.searchIFSC(searchTerm.query, this.form.get('state').value).subscribe(function (res) {
                console.log(res);
                _this.ifscCodeList = res.data.results[0];
                _this.TotalIFSCcodeList = res.data.results[0];
                if (_this.ifscCodeList.length > 0) {
                    _this.filterIFSCCodes(searchTerm.query);
                }
                else {
                    // this.alertService.sweetalertError('Record Not Found');
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
    BankMasterAtGroupComponent.prototype.filterIFSCCodes = function (searchTerm) {
        if (searchTerm.length > 2) {
            searchTerm = searchTerm.toLowerCase();
            var ifsc = this.TotalIFSCcodeList.filter(function (item) {
                return JSON.stringify(item).toLowerCase().includes(searchTerm);
            });
            this.ifscCodeList = ifsc;
            // this.GridIFSCcodeList = ifsc;
            // this.showOptios = true;
        }
    };
    BankMasterAtGroupComponent.prototype.ConfirmationDialog = function (confirmdialog, companyBankMasterId) {
        this.companyBankMasterId = companyBankMasterId;
        this.modalRef = this.modalService.show(confirmdialog, Object.assign({}, { "class": 'gray modal-md' }));
    };
    BankMasterAtGroupComponent.prototype.clickedOnYes = function () {
        this.DeleteBankMaster(this.companyBankMasterId);
    };
    BankMasterAtGroupComponent = __decorate([
        core_1.Component({
            selector: 'app-bank-master-at-group',
            templateUrl: './bank-master-at-group.component.html',
            styleUrls: ['./bank-master-at-group.component.scss']
        })
    ], BankMasterAtGroupComponent);
    return BankMasterAtGroupComponent;
}());
exports.BankMasterAtGroupComponent = BankMasterAtGroupComponent;
