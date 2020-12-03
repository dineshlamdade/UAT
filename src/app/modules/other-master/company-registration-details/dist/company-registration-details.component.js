"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyRegistrationDetailsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var CompanyRegistrationDetailsComponent = /** @class */ (function () {
    function CompanyRegistrationDetailsComponent(formBuilder, companyGroupMasterService, companyMasterService, companyRegistrationDetailsService, datePipe) {
        this.formBuilder = formBuilder;
        this.companyGroupMasterService = companyGroupMasterService;
        this.companyMasterService = companyMasterService;
        this.companyRegistrationDetailsService = companyRegistrationDetailsService;
        this.datePipe = datePipe;
        this.summaryHtmlDataList = [];
        this.issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
        this.showButtonSaveAndReset = true;
        //isEditMode  : boolean = false;
        this.registrationNumberList = [];
        this.companyRegistrationIdList = [];
        this.companyRegistrationMasterList = [];
        this.masterGridDataList = [];
        this.form = forms_1.FormGroup;
        this.companyRegistrationId = 0;
        this.companyMasterId = 0;
        this.isSaveAndReset = true;
        this.isEditMode = false;
        this.form = this.formBuilder.group({
            companyRegistrationId: new forms_1.FormControl('', forms_1.Validators.required),
            registrationNumber: new forms_1.FormControl(null, forms_1.Validators.required),
            companyName: new forms_1.FormControl({ value: null, disabled: true }),
            companyGroupName: new forms_1.FormControl({ value: null, disabled: true }),
            dateOfIncorporation: new forms_1.FormControl(null, forms_1.Validators.required),
            issuedBy: new forms_1.FormControl(null, forms_1.Validators.required),
            msmeNumber: new forms_1.FormControl(null, forms_1.Validators.required),
            pan: new forms_1.FormControl(null, forms_1.Validators.required),
            udyogAadhaarNumber: new forms_1.FormControl(null, forms_1.Validators.required),
            companyRegistrationId1: new forms_1.FormControl('')
        });
    }
    CompanyRegistrationDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyRegistrationDetailsService.getAllActiveCompanyForRegistration().subscribe(function (res) {
            console.log(res);
            _this.tempObjForCompanyRegistration = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    code: element.code,
                    companyGroupName: element.companyGroupName,
                    companyMasterId: element.companyMasterId
                };
                _this.companyRegistrationIdList.push(obj);
            });
        });
        this.refreshHtmlTableData();
    };
    CompanyRegistrationDetailsComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.companyRegistrationDetailsService.getCompanyRegistrationMaster().subscribe(function (res) {
            _this.summaryHtmlDataList = [];
            _this.companyRegistrationMasterList = res.data.results;
            var i = 1;
            _this.masterGridDataList = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    code: element.companyMasterResponseDto.code,
                    companyRegistrationId: element.companyRegistrationId,
                    companyMasterId: element.companyMasterResponseDto.companyMasterId,
                    registrationNumber: element.registrationNumber,
                    dateOfIncorporation: element.dateOfIncorporation,
                    issuedBy: element.issuedBy,
                    msmeNumber: element.msmeNumber,
                    udyogAadhaarNumber: element.udyogAadhaarNumber,
                    pan: element.pan,
                    companyName: element.companyMasterResponseDto.companyName,
                    companyGroupName: element.companyMasterResponseDto.companyGroupName
                };
                _this.summaryHtmlDataList.push(obj);
                // this.companyRegistrationIdList.push({  code: obj.code,
                //   companyGroupName: obj.companyGroupName,
                //   companyMasterId: obj.companyMasterId});
                var s = _this.companyRegistrationIdList.findIndex(function (o) {
                    return o.companyMasterId === obj.companyMasterId;
                });
                if (s !== -1) {
                    _this.companyRegistrationIdList.splice(s, 1);
                }
                //         const index1 = this.companyRegistrationIdList.findIndex(obj1 => obj1.companyMasterId === obj.companyMasterId);
                //         const index = this.companyRegistrationIdList.indexOf(index1, 1);
                // if (index < 0) {
                //   this.companyRegistrationIdList.splice(index, 1);
                // }
                // console.log(this.summaryHtmlDataList);
            });
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["messsage"]);
        }, function () {
        });
        //  this.companyRegistrationIdList.filter((v,i,a)=>a.findIndex(t=>t.companyMasterId === v.companyMasterId) == i);
    };
    CompanyRegistrationDetailsComponent.prototype.save = function () {
        // for save postCompanyGroupMaster
        var _this = this;
        console.log(this.form);
        if (this.companyRegistrationId > 0) {
            var dateOfIncorporation1 = this.datePipe.transform(this.form.get('dateOfIncorporation').value, 'dd-MMM-y');
            var data = {
                companyRegistrationId: this.companyRegistrationId,
                companyMasterId: this.companyMasterId,
                registrationNumber: this.form.get('registrationNumber').value,
                dateOfIncorporation: dateOfIncorporation1,
                issuedBy: this.form.get('issuedBy').value,
                msmeNumber: this.form.get('msmeNumber').value,
                pan: this.form.get('pan').value,
                udyogAadhaarNumber: this.form.get('udyogAadhaarNumber').value
            };
            console.log(data);
            this.companyRegistrationDetailsService.putCompanyRegistrationDetails(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    console.log('data is updated');
                    // this.isEditMode = false;
                    _this.sweetalertMasterSuccess('Company Registration Details  Updated Successfully.', '');
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.form.reset();
                    _this.isEditMode = false;
                    _this.refreshHtmlTableData();
                }
                else {
                    _this.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
        else {
            console.log('clcicked on new record save button');
            var dateOfIncorporation1 = this.datePipe.transform(this.form.get('dateOfIncorporation').value, 'dd-MMM-y');
            var data = {
                companyRegistrationId: 0,
                companyMasterId: this.companyMasterId,
                registrationNumber: this.form.get('registrationNumber').value,
                dateOfIncorporation: dateOfIncorporation1,
                issuedBy: this.form.get('issuedBy').value,
                msmeNumber: this.form.get('msmeNumber').value,
                pan: this.form.get('pan').value,
                udyogAadhaarNumber: this.form.get('udyogAadhaarNumber').value
            };
            this.companyRegistrationDetailsService.postCompanyRegistrationDetails(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.sweetalertMasterSuccess('Company Registration Details Saved Successfully.', '');
                    _this.form.reset();
                    _this.refreshHtmlTableData();
                }
                else {
                    _this.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    CompanyRegistrationDetailsComponent.prototype.onBsValueChangeDateOfIncorporation = function () { };
    CompanyRegistrationDetailsComponent.prototype.onSelectCompanyRegistrationId = function (evt) {
        var _this = this;
        var temp = this.tempObjForCompanyRegistration.find(function (o) { return o.code == _this.form.get('companyRegistrationId').value; });
        this.companyMasterId = temp.companyMasterId;
        console.log(temp.companyMasterId);
        this.companyMasterId = temp.companyMasterId;
        this.form.patchValue({
            companyName: temp.companyName,
            companyGroupName: temp.companyGroupName
        });
    };
    CompanyRegistrationDetailsComponent.prototype.onSelectIssuedBy = function () { };
    CompanyRegistrationDetailsComponent.prototype.editMaster = function (i) {
        this.isEditMode = true;
        this.isSaveAndReset = false;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.companyRegistrationId = this.masterGridDataList[i].companyRegistrationId;
        this.companyMasterId = this.masterGridDataList[i].companyMasterResponseDto.companyMasterId;
        this.form.patchValue(this.masterGridDataList[i]);
        console.log(this.masterGridDataList[i]);
        this.form.patchValue({
            companyRegistrationId1: this.masterGridDataList[i].companyMasterResponseDto.code,
            companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
            companyGroupName: this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
            companyGroupName1: this.masterGridDataList[i].companyMasterResponseDto.companyGroupName
        });
        this.form.enable();
        this.form.get('companyName').disable();
        this.form.get('companyGroupName').disable();
        //this.form.get('companyGroupName1').disable();
        this.form.get('companyRegistrationId1').disable();
    };
    CompanyRegistrationDetailsComponent.prototype.viewMaster = function (i) {
        this.isSaveAndReset = false;
        this.isEditMode = true;
        this.showButtonSaveAndReset = false;
        this.showButtonSaveAndReset = false;
        this.form.reset();
        this.form.patchValue(this.masterGridDataList[i]);
        this.form.patchValue({
            companyRegistrationId1: this.masterGridDataList[i].companyMasterResponseDto.code,
            companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
            companyGroupName: this.masterGridDataList[i].companyMasterResponseDto.companyGroupName
        });
        this.form.disable();
    };
    CompanyRegistrationDetailsComponent.prototype.cancelView = function () {
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.form.get('companyName').disable();
        this.form.get('companyGroupName').disable();
        this.showButtonSaveAndReset = true;
        this.companyRegistrationId = 0; // for save it should be 0 and update it should have any integer value
    };
    CompanyRegistrationDetailsComponent.prototype.sweetalertError = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'error',
            timer: 15000,
            timerProgressBar: true
        });
    };
    CompanyRegistrationDetailsComponent.prototype.sweetalertWarning = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#e68a00',
            icon: 'warning',
            timer: 15000,
            timerProgressBar: true
        });
    };
    CompanyRegistrationDetailsComponent.prototype.sweetalertMasterSuccess = function (message, text) {
        sweetalert2_1["default"].fire({
            title: message,
            text: text,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'success',
            timer: 15000,
            timerProgressBar: true
        });
    };
    CompanyRegistrationDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-company-registration-details',
            templateUrl: './company-registration-details.component.html',
            styleUrls: ['./company-registration-details.component.scss']
        })
    ], CompanyRegistrationDetailsComponent);
    return CompanyRegistrationDetailsComponent;
}());
exports.CompanyRegistrationDetailsComponent = CompanyRegistrationDetailsComponent;
