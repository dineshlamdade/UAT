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
var CompanyRegistrationDetailsComponent = /** @class */ (function () {
    function CompanyRegistrationDetailsComponent(formBuilder, companyGroupMasterService, companyMasterService, companyRegistrationDetailsService, datePipe, alertService) {
        this.formBuilder = formBuilder;
        this.companyGroupMasterService = companyGroupMasterService;
        this.companyMasterService = companyMasterService;
        this.companyRegistrationDetailsService = companyRegistrationDetailsService;
        this.datePipe = datePipe;
        this.alertService = alertService;
        this.summaryHtmlDataList = [];
        // issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
        this.issuedByList = [];
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
        this.invalidPAN = false;
        this.today = new Date();
        this.form = this.formBuilder.group({
            companyRegistrationId: new forms_1.FormControl('', forms_1.Validators.required),
            registrationNumber: new forms_1.FormControl(null),
            companyName: new forms_1.FormControl({ value: null, disabled: true }),
            companyGroupName: new forms_1.FormControl({ value: null, disabled: true }),
            dateOfIncorporation: new forms_1.FormControl(null, forms_1.Validators.required),
            issuedBy: new forms_1.FormControl('', forms_1.Validators.required),
            msmeNumber: new forms_1.FormControl(null),
            pan: new forms_1.FormControl('', [forms_1.Validators.pattern("^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$")]),
            udyogAadhaarNumber: new forms_1.FormControl(null),
            companyRegistrationId1: new forms_1.FormControl(null)
        });
    }
    CompanyRegistrationDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyRegistrationDetailsService.getAllActiveCompanyForRegistration().subscribe(function (res) {
            console.log('getAllActiveCompanyForRegistration', res);
            _this.tempObjForCompanyRegistration = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    code: element.code,
                    companyGroupName: element.companyGroupName,
                    companyMasterId: element.companyMasterId,
                    companyName: element.companyName
                };
                _this.companyRegistrationIdList.push(obj);
            });
        });
        this.companyRegistrationDetailsService.getCompanyRegistrationIssuedBy().subscribe(function (res) {
            _this.issuedByList = [];
            res.data.results.forEach(function (element) {
                _this.issuedByList.push(element.dropdownValue);
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
            //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        }, function () { });
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
                    _this.alertService.sweetalertMasterSuccess('Company Registration Details  Updated Successfully.', '');
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.form.reset();
                    _this.isEditMode = false;
                    _this.refreshHtmlTableData();
                    _this.form.patchValue({
                        companyRegistrationId: '',
                        issuedBy: ''
                    });
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
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
            console.log(JSON.stringify(data));
            this.companyRegistrationDetailsService.postCompanyRegistrationDetails(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Company Registration Details Saved Successfully.', '');
                    _this.form.reset();
                    _this.refreshHtmlTableData();
                    _this.form.patchValue({
                        companyRegistrationId: '',
                        issuedBy: ''
                    });
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    CompanyRegistrationDetailsComponent.prototype.onBsValueChangeDateOfIncorporation = function () { };
    CompanyRegistrationDetailsComponent.prototype.onSelectCompanyRegistrationId = function (evt) {
        var _this = this;
        console.log(evt);
        if (evt == '') {
            this.form.patchValue({
                companyName: '',
                companyGroupName: '',
                pan: ''
            });
        }
        else {
            var temp = this.tempObjForCompanyRegistration.find(function (o) { return o.code == _this.form.get('companyRegistrationId').value; });
            this.companyMasterId = temp.companyMasterId;
            console.log(temp.companyMasterId);
            console.log(temp.companyGroupName);
            this.companyMasterId = temp.companyMasterId;
            this.form.patchValue({
                companyName: temp.companyName,
                companyGroupName: temp.companyGroupName,
                pan: ''
            });
        }
    };
    CompanyRegistrationDetailsComponent.prototype.editMaster = function (i) {
        window.scrollTo(0, 0);
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
        window.scrollTo(0, 0);
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
        this.form.patchValue({
            companyRegistrationId: '',
            issuedBy: ''
        });
    };
    CompanyRegistrationDetailsComponent.prototype.onChangePAN = function (evt) {
        var _this = this;
        console.log(evt);
        if (evt.length == 10) {
            console.log(this.form.get('companyRegistrationId').value);
            console.log(this.tempObjForCompanyRegistration);
            var index1 = this.tempObjForCompanyRegistration.findIndex(function (o) { return o.code == _this.form.get('companyRegistrationId').value; });
            console.log(evt[3].toUpperCase());
            console.log(this.tempObjForCompanyRegistration[index1].fourthCharacterOfPan);
            if (evt[3] == this.tempObjForCompanyRegistration[index1].fourthCharacterOfPan) {
                this.invalidPAN = false;
            }
            else {
                this.invalidPAN = true;
            }
            // invalidPAN
        }
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
