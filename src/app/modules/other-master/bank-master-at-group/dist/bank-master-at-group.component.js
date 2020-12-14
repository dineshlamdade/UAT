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
    function BankMasterAtGroupComponent(formBuilder, bankMasterAtGroupService, alertService) {
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
        this.form = this.formBuilder.group({
            ifscCode: new forms_1.FormControl(''),
            bankName: new forms_1.FormControl({ value: '', disabled: true }),
            branchName: new forms_1.FormControl({ value: '', disabled: true }),
            branchAddress: new forms_1.FormControl({ value: '', disabled: true }),
            state: new forms_1.FormControl('')
        });
    }
    BankMasterAtGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bankMasterAtGroupService.getStates().subscribe(function (res) {
            _this.stateList = res.data.results;
        });
        this.refreshHtmlTable();
    };
    BankMasterAtGroupComponent.prototype.refreshHtmlTable = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.bankMasterDetailsResponse = {};
        this.bankMasterAtGroupService.getBankMasterDetails().subscribe(function (res) {
            console.log(res);
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
            });
        });
    };
    BankMasterAtGroupComponent.prototype.onSelectIFSCCode = function (evt) {
        var _this = this;
        this.bankMasterAtGroupService.getDataFromIFSC(evt).subscribe(function (res) {
            console.log(res);
            _this.form.patchValue({
                branchName: res.data.results[0].branchName,
                branchAddress: res.data.results[0].address,
                bankName: res.data.results[0].bankName
            });
        });
    };
    BankMasterAtGroupComponent.prototype.DeleteBankMaster = function () {
        var _this = this;
        console.log(this.editedRecordIndex);
        this.bankMasterAtGroupService.deleteCompanyBankMaster(this.editedRecordIndex).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Bank Master  Deleted Successfully.', '');
            _this.isSaveAndReset = true;
            _this.showButtonSaveAndReset = true;
            _this.refreshHtmlTable();
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
            if (res.data.results.length > 0) {
                _this.alertService.sweetalertMasterSuccess('Bank Master Added Successfully.', '');
                _this.isSaveAndReset = true;
                _this.showButtonSaveAndReset = true;
                _this.refreshHtmlTable();
            }
        }, function (error) {
            _this.alertService.sweetalertError(error.error['status'].messsage);
        });
    };
    BankMasterAtGroupComponent.prototype.onSelectState = function (evt) {
        var _this = this;
        this.selectedState = evt;
        this.ifscCodeList = [];
        this.bankMasterAtGroupService.getIfscCodeStateWise(evt).subscribe(function (res) {
            _this.ifscCodeList = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error.error['status'].messsage);
        });
    };
    BankMasterAtGroupComponent.prototype.editMaster = function (i, companyBankMasterId) {
        this.isEditMode = true;
        this.viewMode = false;
        this.editedRecordIndex = companyBankMasterId;
        console.log(this.bankMasterDetailsResponse[i]);
        this.form.patchValue(this.bankMasterDetailsResponse[i]);
        this.ifscCodeList.push(this.bankMasterDetailsResponse[i].ifscCode);
        this.form.patchValue({
            branchName: this.summaryHtmlDataList[i].branchName,
            branchAddress: this.summaryHtmlDataList[i].branchAddress,
            bankName: this.summaryHtmlDataList[i].bankName
        });
    };
    BankMasterAtGroupComponent.prototype.viewMaster = function (i) {
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
        this.form.get('bankName').disable();
        this.form.get('branchName').disable();
        this.form.get('branchAddress').disable();
    };
    BankMasterAtGroupComponent.prototype.activateBankMaster = function () { };
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
