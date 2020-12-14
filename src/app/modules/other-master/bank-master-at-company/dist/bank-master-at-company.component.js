"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankMasterAtCompanyComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var password_match_validator_1 = require("./password-match.validator");
var BankMasterAtCompanyComponent = /** @class */ (function () {
    function BankMasterAtCompanyComponent(formBuilder, alertService, bankMasterAtGroupService, bankMasterAtCompanyService, companyMasterService) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.bankMasterAtGroupService = bankMasterAtGroupService;
        this.bankMasterAtCompanyService = bankMasterAtCompanyService;
        this.companyMasterService = companyMasterService;
        this.summaryHtmlDataList = [];
        this.showButtonSaveAndReset = true;
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.form = forms_1.FormGroup;
        this.ifscCodeList = [];
        this.typeOfAccountList = ['Current', 'OD', 'CC'];
        this.initialList = ['Mr', 'Ms'];
        this.countryCode = [];
        this.isGlobalView = true;
        this.masterGridData = [];
        this.lictransactionList = [];
        this.groupCompanyDetailsList = [];
        this.form = this.formBuilder.group({
            ifscCode: ['', forms_1.Validators.required],
            bankName: [{ value: '', disabled: true }],
            branchName: [{ value: '', disabled: true }],
            accountType: ['', forms_1.Validators.required],
            accountNumber: ['', forms_1.Validators.required],
            reEnterAccountNumber: ['', forms_1.Validators.required],
            pfFormArray: new forms_1.FormArray([]),
            companyGroup: ['', forms_1.Validators.required]
        }, {
            validator: password_match_validator_1.MustMatch('accountNumber', 'reEnterAccountNumber')
        });
        this.pfArray.push(this.formBuilder.group({
            contactPersonName: [''],
            designation: [''],
            emailId: ['', forms_1.Validators.required],
            isActive: [''],
            contactNumber: [''],
            companyBankMappingId: ['']
        }));
    }
    BankMasterAtCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ifscCodeList = [];
        this.bankMasterAtGroupService.getBankMasterDetails().subscribe(function (res) {
            console.log('bank master details', res);
            _this.bankMasterDetailsResponse = res.data.results;
            res.data.results.forEach(function (element) {
                _this.ifscCodeList.push(element.ifscCode);
            });
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        });
        this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe(function (res) {
            console.log('bank company', res);
            res.data.results.forEach(function (element) {
                if (element.active == true) {
                    _this.groupCompanyDetailsList.push({ id: element.groupCompanyId, itemName: element.companyName });
                }
            });
        });
        this.companyMasterService.getCountryCodes().subscribe(function (res) {
            console.log('country code', res);
            _this.countryCode = res.data.results;
        });
        this.refreshHtmlTableData();
    };
    BankMasterAtCompanyComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridData = [];
        console.log('in refrest');
        this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe(function (res) {
            console.log('summary table data', res);
            var k = 1;
            res.data.results.forEach(function (element) {
                console.log(element);
                for (var i = 0; i < element.mappingDetails.length; i++) {
                    // if (element.mappingDetails[i].isActive === 1) {
                    _this.masterGridData.push(element);
                    var obj = {
                        SrNo: k++,
                        companyBankMappingId: element.mappingDetails[i].companyBankMappingId,
                        companyBankMasterId: element.mappingDetails[i].companyBankMasterId,
                        accountType: element.mappingDetails[i].accountType,
                        accountNumber: element.mappingDetails[i].accountNumber,
                        contactPersonName: element.mappingDetails[i].contactPersonName,
                        designation: element.mappingDetails[i].designation,
                        emailId: element.mappingDetails[i].emailId,
                        contactNumber: element.mappingDetails[i].contactNumber
                    };
                    _this.summaryHtmlDataList.push(obj);
                }
            });
            console.log(_this.masterGridData);
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        });
    };
    BankMasterAtCompanyComponent.prototype.editMaster = function (accountNumber, companyBankMasterId, accountType) {
        var _this = this;
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.companyBankMasterId = companyBankMasterId;
        this.isGlobalView = false;
        this.showButtonSaveAndReset = true;
        this.isSaveAndReset = false;
        this.isEditMode = true;
        this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe(function (res) {
            console.log(res);
            var flag = true;
            res.data.results.forEach(function (element) {
                for (var j = 0; j < element.mappingDetails.length; j++) {
                    if (accountNumber === element.mappingDetails[j].accountNumber && accountType == element.mappingDetails[j].accountType) {
                        console.log(element.mappingDetails[j]);
                        if (flag == true) {
                            _this.form.patchValue({
                                ifscCode: element.ifscCode,
                                bankName: element.bankName,
                                branchName: element.branchName,
                                companyGroup: element.mappingDetails[j].groupCompanyId,
                                accountType: element.mappingDetails[j].accountType,
                                accountNumber: element.mappingDetails[j].accountNumber,
                                reEnterAccountNumber: element.mappingDetails[j].accountNumber
                            });
                        }
                        flag = false;
                        _this.pfArray.push(_this.formBuilder.group({
                            contactPersonName: [element.mappingDetails[j].contactPersonName],
                            designation: [element.mappingDetails[j].designation],
                            emailId: [element.mappingDetails[j].emailId, forms_1.Validators.required],
                            isActive: [element.mappingDetails[j].isActive],
                            contactNumber: [element.mappingDetails[j].contactNumber],
                            companyBankMappingId: [element.mappingDetails[j].companyBankMappingId]
                        }));
                        // this.addContactPerson(j);
                        // const contactPersonName = element.mappingDetails[j].contactPersonName.split(' ');
                        // const contactNumber = element.mappingDetails[j].contactNumber.split(' ');
                        // this.pfArray.push(this.formBuilder.group({
                        //   initial: [contactPersonName[0]],
                        //   firstName: [contactPersonName[1]],
                        //   lastName: [contactPersonName[2]],
                        //   designation: [element.mappingDetails[j].designation],
                        //   emailId: [element.mappingDetails[j].emailId, Validators.required],
                        //   isdCode: [contactNumber[0]],
                        //   contactNumber: [contactNumber[1]],
                        //   companyBankMappingId: [element.mappingDetails[j].companyBankMappingId],
                        // }));
                        // console.log(this.pfArray.value);
                    }
                }
            });
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        });
        this.form.get('ifscCode').disable();
        this.form.get('bankName').disable();
        this.form.get('branchName').disable();
        this.form.get('accountType').disable();
        this.form.get('accountNumber').disable();
        this.form.get('reEnterAccountNumber').disable();
        this.form.get('companyGroup').disable();
    };
    BankMasterAtCompanyComponent.prototype.viewMaster = function (accountNumber, companyBankMasterId, accountType) {
        var _this = this;
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.companyBankMasterId = companyBankMasterId;
        this.isGlobalView = false;
        this.showButtonSaveAndReset = false;
        this.isSaveAndReset = false;
        this.isEditMode = true;
        this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe(function (res) {
            console.log(res);
            var flag = true;
            res.data.results.forEach(function (element) {
                for (var j = 0; j < element.mappingDetails.length; j++) {
                    if (accountNumber === element.mappingDetails[j].accountNumber && accountType == element.mappingDetails[j].accountType) {
                        console.log(element.mappingDetails[j]);
                        if (flag == true) {
                            _this.form.patchValue({
                                ifscCode: element.ifscCode,
                                bankName: element.bankName,
                                branchName: element.branchName,
                                companyGroup: element.mappingDetails[j].groupCompanyId,
                                accountType: element.mappingDetails[j].accountType,
                                accountNumber: element.mappingDetails[j].accountNumber,
                                reEnterAccountNumber: element.mappingDetails[j].accountNumber
                            });
                        }
                        flag = false;
                        _this.pfArray.push(_this.formBuilder.group({
                            contactPersonName: [{ value: element.mappingDetails[j].contactPersonName, disabled: true }],
                            designation: [{ value: element.mappingDetails[j].designation, disabled: true }],
                            emailId: [{ value: element.mappingDetails[j].emailId, disabled: true }],
                            isActive: [{ value: element.mappingDetails[j].isActive, disabled: true }],
                            contactNumber: [{ value: element.mappingDetails[j].contactNumber, disabled: true }],
                            companyBankMappingId: [element.mappingDetails[j].companyBankMappingId]
                        }));
                    }
                }
            });
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        });
        this.form.get('ifscCode').disable();
        this.form.get('bankName').disable();
        this.form.get('branchName').disable();
        this.form.get('accountType').disable();
        this.form.get('accountNumber').disable();
        this.form.get('reEnterAccountNumber').disable();
        this.form.get('companyGroup').disable();
        this.form.disable();
    };
    BankMasterAtCompanyComponent.prototype.cancelView = function () {
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.isEditMode = false;
        this.isActive = false;
        this.isSaveAndReset = true;
        this.form.reset();
        this.form.enable();
        this.pfArray.push(this.formBuilder.group({
            contactPersonName: [''],
            designation: [''],
            emailId: ['', forms_1.Validators.required],
            isActive: [''],
            contactNumber: [''],
            companyBankMappingId: ['']
        }));
        this.form.get('bankName').disable();
        this.form.get('branchName').disable();
    };
    BankMasterAtCompanyComponent.prototype.save = function () {
        var _this = this;
        if (this.isEditMode) {
            var s = [];
            var formData = this.form.getRawValue();
            for (var i = 0; i < this.pfArray.length; i++) {
                var a = 0;
                if (this.form.get('pfFormArray').value[i].isActive == true) {
                    a = 1;
                }
                s.push({
                    // groupCompanyId: 1,
                    // companyBankMasterId: this.companyBankMasterId,
                    // accountType: this.form.get('accountType').value,
                    // accountNumber: this.form.get('accountNumber').value,
                    contactPersonName: this.form.get('pfFormArray').value[i].contactPersonName,
                    designation: this.form.get('pfFormArray').value[i].designation,
                    emailId: this.form.get('pfFormArray').value[i].emailId,
                    contactNumber: this.form.get('pfFormArray').value[i].contactNumber,
                    isActive: a,
                    companyBankMappingId: this.form.get('pfFormArray').value[i].companyBankMappingId
                });
            }
            console.log(s);
            for (var k = 0; k < s.length; k++) {
                console.log(JSON.stringify(s[k]));
                this.bankMasterAtGroupService.putBankMasterMapping(s[k]).subscribe(function (res) {
                    console.log(res);
                    if (res.data.results.length > 0) {
                        //  this.alertService.sweetalertMasterSuccess('Bank Master Mapping Successfully.', '');
                        _this.alertService.sweetalertWarning(res.status.messsage);
                        _this.form.reset();
                        _this.isSaveAndReset = true;
                        _this.showButtonSaveAndReset = true;
                        _this.cancelView();
                    }
                    else {
                        _this.alertService.sweetalertWarning(res.status.messsage);
                    }
                }, function (error) {
                    _this.alertService.sweetalertError(error.error.status.messsage);
                });
            }
            this.refreshHtmlTableData();
        }
        else {
            var s = [];
            var formData = this.form.getRawValue();
            console.log(formData);
            debugger;
            for (var i = 0; i < this.pfArray.length; i++) {
                s.push({
                    groupCompanyId: 1,
                    companyBankMasterId: this.companyBankMasterId,
                    accountType: this.form.get('accountType').value,
                    accountNumber: this.form.get('accountNumber').value,
                    contactPersonName: this.form.get('pfFormArray').value[i].contactPersonName,
                    designation: this.form.get('pfFormArray').value[i].designation,
                    emailId: this.form.get('pfFormArray').value[i].emailId,
                    contactNumber: this.form.get('pfFormArray').value[i].contactNumber,
                    companyGroup: this.form.get('companyGroup').value
                });
            }
            console.log(s);
            this.bankMasterAtGroupService.postBankMasterMapping(s).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    //  this.alertService.sweetalertMasterSuccess('Bank Master Mapping Successfully.', '');
                    _this.alertService.sweetalertWarning(res.status.messsage);
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.cancelView();
                    _this.refreshHtmlTableData();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error.error.status.messsage);
            });
        }
    };
    BankMasterAtCompanyComponent.prototype.onSelectIFSCCode = function (evt) {
        var index = this.bankMasterDetailsResponse.findIndex(function (o) { return o.ifscCode == evt; });
        console.log(this.bankMasterDetailsResponse);
        this.companyBankMasterId = this.bankMasterDetailsResponse[index].companyBankMasterId;
        this.form.patchValue({
            bankName: this.bankMasterDetailsResponse[index].bankName,
            branchName: this.bankMasterDetailsResponse[index].branchName
        });
    };
    BankMasterAtCompanyComponent.prototype.onSelectTypeOfAccount = function (evt) {
        console.log(evt);
    };
    BankMasterAtCompanyComponent.prototype.UpdateContactPerson = function () {
    };
    BankMasterAtCompanyComponent.prototype.DeleteContactPerson = function () {
    };
    Object.defineProperty(BankMasterAtCompanyComponent.prototype, "pfArray", {
        // addContactPerson(i: number) {
        //   this.pfArray.push(this.formBuilder.group({
        //     initial: ['Mr'],
        //     firstName: [''],
        //     lastName: [''],
        //     designation: [''],
        //     emailId: ['', Validators.required],
        //     isdCode: [''],
        //     contactNumber: [''],
        //     companyBankMappingId: [''],
        //   }));
        // }
        get: function () { return this.f.pfFormArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankMasterAtCompanyComponent.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    BankMasterAtCompanyComponent.prototype.resetForm = function () {
        this.form.reset();
        // this.pfArray.push(this.formBuilder.group({
        //   initial: ['Mr'],
        //   firstName: [''],
        //   lastName: [''],
        //   designation: [''],
        //   emailId: ['', Validators.required],
        //   isdCode: [''],
        //   contactNumber: [''],
        //   companyBankMappingId: [''],
        // }));
    };
    BankMasterAtCompanyComponent.prototype.UpdateDetails = function (i) {
        var _this = this;
        console.log('updateDetais');
        this.isGlobalView = true;
        var formData = this.form.getRawValue();
        delete formData.ifscCode;
        delete formData.bankName;
        delete formData.branchName;
        delete formData.reEnterAccountNumber;
        formData.companyBankMasterId = 1,
            formData.groupCompanyId = 1;
        var abc = {
            // companyBankMappingId: this.form.get('pfFormArray').value[i].companyBankMappingId,
            accountType: this.form.get('accountType').value,
            accountNumber: this.form.get('accountNumber').value
        };
        this.bankMasterAtGroupService.putBankMasterMapping(abc).subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.alertService.sweetalertMasterSuccess('Bank Master Mapping Updated Successfully.', '');
                _this.form.reset();
                _this.isSaveAndReset = true;
                _this.showButtonSaveAndReset = true;
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        });
        this.refreshHtmlTableData();
    };
    BankMasterAtCompanyComponent.prototype.deleteRow = function (j) {
        console.log(j);
        //this.lictransactionList.splice(j,1);
        this.pfArray.removeAt(j);
    };
    BankMasterAtCompanyComponent.prototype.addRow = function () {
        this.pfArray.push(this.formBuilder.group({
            contactPersonName: [''],
            designation: [''],
            emailId: ['', forms_1.Validators.required],
            isActive: [''],
            contactNumber: ['']
        }));
        // this.lictransactionList.push({
        //   contactPersonName: undefined,
        //   designation: '',
        //   emailId: 'aaaba@gmail.com' ,
        //   contactNumber:'',
        //   isActive:true,
        // });
        // console.log(this.lictransactionList);
        // this.contactPersonName = null;
        // this.designation = null;
        // this.emailId = null;
        // this.contactNumber = null;
        // this.isActive = true;
    };
    BankMasterAtCompanyComponent.prototype.DeleteBankAccount = function () {
        var _this = this;
        var data = {
            groupCompanyId: 1,
            companyBankMasterId: this.companyBankMasterId,
            accountType: this.form.get('accountType').value,
            accountNumber: this.form.get('accountNumber').value
        };
        console.log(data);
        this.bankMasterAtCompanyService.deleteCompanyBankMasterMapping(data).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Bank Mapping Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
        });
    };
    BankMasterAtCompanyComponent = __decorate([
        core_1.Component({
            selector: 'app-bank-master-at-company',
            templateUrl: './bank-master-at-company.component.html',
            styleUrls: ['./bank-master-at-company.component.scss']
        })
    ], BankMasterAtCompanyComponent);
    return BankMasterAtCompanyComponent;
}());
exports.BankMasterAtCompanyComponent = BankMasterAtCompanyComponent;
