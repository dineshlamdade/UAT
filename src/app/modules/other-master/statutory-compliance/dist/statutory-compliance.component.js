"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StatutoryComplianceComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var StatutoryComplianceComponent = /** @class */ (function () {
    function StatutoryComplianceComponent(shortenString, formBuilder, statuatoryComplianceService, complianceHeadService, alertService) {
        this.shortenString = shortenString;
        this.formBuilder = formBuilder;
        this.statuatoryComplianceService = statuatoryComplianceService;
        this.complianceHeadService = complianceHeadService;
        this.alertService = alertService;
        this.selectedIsdCode = [];
        this.countryCode = [];
        this.showButtonSaveAndReset = true;
        // isEditMode: boolean = false;
        this.masterGridDataList = [];
        this.index = 0;
        this.complianceHeadId = 0;
        this.reasonForExitList = [];
        this.view = false;
        this.isSaveAndReset = true;
        this.complianceInstitutionMasterId = 0;
        this.scaleList = [];
        this.summaryHtmlDataList = [];
        this.headNameList = [];
        this.countries = [];
        this.form = forms_1.FormGroup;
        // applicabilityLevelList = [];
        this.hideRemark = false;
        this.aplicabilityLevelList = ['Central', 'State', 'City', 'Municipal', 'Establishment'];
        this.typeOfOfficeList = ['Area Office', 'Regional Office', 'Zonal Office'];
        this.isEditMode = false;
        this.groupNameScaleNameStartDateObject = [];
        this.form = this.formBuilder.group({
            headName: new forms_1.FormControl('', forms_1.Validators.required),
            officialCountryCode: new forms_1.FormControl('', forms_1.Validators.required),
            address1: new forms_1.FormControl(null, forms_1.Validators.required),
            address2: new forms_1.FormControl(null),
            address3: new forms_1.FormControl(null),
            country: new forms_1.FormControl('', forms_1.Validators.required),
            state: new forms_1.FormControl({ value: null, disabled: true }),
            city: new forms_1.FormControl({ value: null, disabled: true }),
            village: new forms_1.FormControl(null),
            pinCode: new forms_1.FormControl(null, forms_1.Validators.required),
            emailId: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            typeOfOffice: new forms_1.FormControl('', forms_1.Validators.required),
            // telephoneNumber: new FormControl('', [Validators.required]),
            telephoneNumber: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
            applicabilityLevel: new forms_1.FormControl({ value: '', disabled: true }),
            institutionName: new forms_1.FormControl(null, forms_1.Validators.required),
            country1: new forms_1.FormControl('', forms_1.Validators.required),
            remark: new forms_1.FormControl(''),
            institutionActive: new forms_1.FormControl({ value: true, disabled: true }),
            institutionCode: new forms_1.FormControl({ value: '', disabled: true })
        });
    }
    StatutoryComplianceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };
        this.statuatoryComplianceService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        });
        this.statuatoryComplianceService.getCountryCodes().subscribe(function (res) {
            _this.countryCode = res.data.results;
            console.log(_this.countryCode);
        });
        this.refreshHtmlTableData();
    };
    StatutoryComplianceComponent.prototype.onSelectHeadName = function (evt) {
        var _this = this;
        if (evt == '') {
            this.form.get('applicabilityLevel').setValue('');
            this.form.get('country1').setValue('');
        }
        else {
            console.log(this.form.get('headName').value);
            console.log(this.groupNameScaleNameStartDateObject);
            var tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.complianceHeadName == _this.form.get('headName').value; });
            this.complianceHeadId = tempObjForgroupNameScaleStartDate.complianceHeadId;
            console.log(tempObjForgroupNameScaleStartDate);
            this.form.patchValue({
                country1: tempObjForgroupNameScaleStartDate.country,
                applicabilityLevel: tempObjForgroupNameScaleStartDate.aplicabilityLevel
            });
        }
    };
    StatutoryComplianceComponent.prototype.checkLocalAddress = function () {
    };
    StatutoryComplianceComponent.prototype.getPermanentAddressFromPIN = function () {
        var _this = this;
        console.log(this.form.get('pinCode').value);
        if (this.form.get('pinCode').value.length < 6) {
            this.form.get('state').setValue('');
            this.form.get('city').setValue('');
        }
        if (this.form.get('pinCode').value.length == 6 && this.form.get('country').value == 'India') {
            this.statuatoryComplianceService.getAddressFromPIN(this.form.get('pinCode').value).subscribe(function (res) {
                console.log(res);
                _this.form.get('state').setValue(res.data.results[0].state);
                _this.form.get('city').setValue(res.data.results[0].city);
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
    };
    StatutoryComplianceComponent.prototype.onSelectScale = function (scale1) {
        console.log(scale1);
        console.log(this.form.value.scale);
        console.log(this.form.get('scale').value);
    };
    StatutoryComplianceComponent.prototype.onSelectReasonForExit = function () {
        console.log(this.form.value.reasonForExit);
    };
    StatutoryComplianceComponent.prototype.save = function () {
        var _this = this;
        if (this.isEditMode == true) {
            console.log('clcicked on uodate record  button');
            var data = this.form.getRawValue();
            console.log(JSON.stringify(data));
            delete data.country1;
            delete data.headName;
            data.telephoneNumber = data.officialCountryCode + ' ' + data.telephoneNumber;
            delete data.officialCountryCode;
            data.complianceHeadId = this.complianceHeadId;
            data.complianceInstitutionMasterId = this.complianceInstitutionMasterId;
            console.log(JSON.stringify(data));
            this.statuatoryComplianceService.putComplianceInstituionMaster(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.isEditMode = false;
                    console.log('data is updated');
                    _this.alertService.sweetalertMasterSuccess('Statutory Compliance Updated Successfully.', '');
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
            console.log(data);
        }
        else {
            var data = this.form.getRawValue();
            delete data.country1;
            data.telephoneNumber = data.officialCountryCode + ' ' + data.telephoneNumber;
            delete data.officialCountryCode;
            delete data.headName;
            data.complianceHeadId = this.complianceHeadId;
            console.log(JSON.stringify(data));
            this.statuatoryComplianceService.postComplianceInstituionMaster(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    console.log('data is updated');
                    _this.alertService.sweetalertMasterSuccess('Statutory Compliance Saved Successfully.', '');
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
            console.log(data);
        }
    };
    StatutoryComplianceComponent.prototype.reset = function () {
        this.showButtonSaveAndReset = true;
        this.form.get('companyGroupActive').setValue(true);
        this.saveFormValidation();
    };
    StatutoryComplianceComponent.prototype.cancelView = function () {
        this.form.enable();
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.form.reset();
        this.saveFormValidation();
        this.form.get('remark').disable();
        this.form.get('country1').disable();
        this.form.get('applicabilityLevel').disable();
        this.form.get('state').disable();
        this.form.get('city').disable();
        this.form.get('institutionCode').disable();
        //  this.form.get('complianceActive').setValue(true);
        // this.form.get('complianceActive').disable();
        this.hideRemark = false;
    };
    StatutoryComplianceComponent.prototype.editMaster = function (i) {
        // assign complianceHeadId for update recored
        this.isEditMode = true;
        this.isSaveAndReset = false;
        this.index = 0;
        this.showButtonSaveAndReset = true;
        console.log(this.summaryHtmlDataList[i]);
        this.form.reset();
        this.form.patchValue(this.summaryHtmlDataList[i]);
        console.log(this.summaryHtmlDataList[i].telephoneNumber.split(' '));
        this.form.patchValue({
            headName: this.summaryHtmlDataList[i].headName,
            country1: this.summaryHtmlDataList[i].country
        });
        var isdCodeAndMobileNumberList = this.summaryHtmlDataList[i].telephoneNumber.split(' ');
        if (isdCodeAndMobileNumberList.length == 2) {
            this.form.patchValue({
                telephoneNumber: isdCodeAndMobileNumberList[1],
                officialCountryCode: isdCodeAndMobileNumberList[0]
            });
        }
        this.complianceHeadId = this.summaryHtmlDataList[i].complianceHeadId;
        this.complianceInstitutionMasterId = this.summaryHtmlDataList[i].complianceInstitutionMasterId;
        this.form.enable();
        this.form.get('country1').disable();
        this.form.get('applicabilityLevel').disable();
        this.form.get('state').disable();
        this.form.get('city').disable();
        this.form.get('institutionCode').disable();
    };
    StatutoryComplianceComponent.prototype.viewMaster = function (i) {
        this.isEditMode = false;
        this.showButtonSaveAndReset = false;
        this.form.reset();
        this.form.patchValue(this.summaryHtmlDataList[i]);
        this.form.patchValue({
            headName: this.summaryHtmlDataList[i].headName,
            country1: this.summaryHtmlDataList[i].country
        });
        var isdCodeAndMobileNumberList = this.summaryHtmlDataList[i].telephoneNumber.split(' ');
        if (isdCodeAndMobileNumberList.length == 2) {
            this.form.patchValue({
                telephoneNumber: isdCodeAndMobileNumberList[1],
                officialCountryCode: isdCodeAndMobileNumberList[0]
            });
        }
        this.form.disable();
    };
    StatutoryComplianceComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.headNameList = [];
        this.complianceHeadService.getComplianceHeadDetails().subscribe(function (res) {
            console.log(res.data.results);
            _this.complianceHeadDetailsObject = res.data.results;
            res.data.results.forEach(function (element) {
                _this.headNameList.push(element.complianceHeadName);
                //  this.applicabilityLevelList.push(element.aplicabilityLevel);
                _this.groupNameScaleNameStartDateObject.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
            });
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails().subscribe(function (res) {
                _this.masterGridDataList = res.data.results;
                var i = 1;
                res.data.results.forEach(function (element) {
                    console.log(_this.groupNameScaleNameStartDateObject);
                    var tempObjForgroupNameScaleStartDate = _this.groupNameScaleNameStartDateObject.find(function (o) { return o.complianceHeadId == element.complianceHeadId; });
                    var obj = {
                        SrNo: i++,
                        institutionName: element.institutionName,
                        complianceHeadId: element.complianceHeadId,
                        country: element.country,
                        applicabilityLevel: element.applicabilityLevel,
                        address1: element.address1,
                        address2: element.address2,
                        address3: element.address3,
                        state: element.state,
                        city: element.city,
                        village: element.village,
                        pinCode: element.pinCode,
                        typeOfOffice: element.typeOfOffice,
                        telephoneNumber: element.telephoneNumber,
                        emailId: element.emailId,
                        headName: tempObjForgroupNameScaleStartDate.complianceHeadName,
                        headNameShorten: _this.shortenString.transform(tempObjForgroupNameScaleStartDate.complianceHeadName),
                        headNameFull: tempObjForgroupNameScaleStartDate.complianceHeadName,
                        country1: tempObjForgroupNameScaleStartDate.country,
                        complianceInstitutionMasterId: element.complianceInstitutionMasterId,
                        remark: element.remark,
                        institutionCode: element.institutionCode,
                        institutionActive: element.institutionActive
                    };
                    _this.summaryHtmlDataList.push(obj);
                    console.log(_this.summaryHtmlDataList);
                });
            });
        });
    };
    StatutoryComplianceComponent.prototype.saveFormValidation = function () {
        console.log('saveFormValidation');
        this.form.patchValue({
            headName: '',
            applicabilityLevel: '',
            officialCountryCode: '',
            country: '',
            typeOfOffice: '',
            country1: ''
        });
    };
    StatutoryComplianceComponent.prototype.onSelectCountry = function (evt) {
        this.form.patchValue({
            pinCode: '',
            state: '',
            city: '',
            village: ''
        });
        this.form.get('state').disable();
        this.form.get('city').disable();
        this.form.get('institutionCode').disable();
        this.form.get('institutionCode').disable();
    };
    StatutoryComplianceComponent.prototype.keyPress = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    StatutoryComplianceComponent.prototype.deactiveActiveCheckBox = function () {
        console.log('in deactive remakr');
        if (this.form.get('institutionActive').value === false) {
            this.form.get('remark').enable();
            this.hideRemark = true;
            this.form.controls['remark'].setValidators(forms_1.Validators.required);
            this.form.controls['remark'].updateValueAndValidity();
        }
        else {
            this.hideRemark = false;
            this.form.controls["remark"].clearValidators();
            this.form.controls["remark"].updateValueAndValidity();
        }
    };
    StatutoryComplianceComponent = __decorate([
        core_1.Component({
            selector: 'app-statutory-compliance',
            templateUrl: './statutory-compliance.component.html',
            styleUrls: ['./statutory-compliance.component.scss']
        })
    ], StatutoryComplianceComponent);
    return StatutoryComplianceComponent;
}());
exports.StatutoryComplianceComponent = StatutoryComplianceComponent;
