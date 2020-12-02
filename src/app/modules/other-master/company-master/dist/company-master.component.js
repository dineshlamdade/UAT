"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyMasterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var company_master_dto_1 = require("./dto-models/company-master-dto");
var CompanyMasterComponent = /** @class */ (function () {
    function CompanyMasterComponent(cd, formBuilder, datePipe, companyMasterService, companyGroupMasterService) {
        this.cd = cd;
        this.formBuilder = formBuilder;
        this.datePipe = datePipe;
        this.companyMasterService = companyMasterService;
        this.companyGroupMasterService = companyGroupMasterService;
        this.companyMasterform = forms_1.FormGroup;
        this.imageUrl = "./assets/emp-master-images/empIcon5.png";
        this.employeeMasterRequestDTO = new company_master_dto_1.EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.countryCode = [];
        this.isContractorDataList = ['No', 'Yes'];
        this.companyClassificationList = ['A', 'B', 'C'];
        // public languageList = ['English'];
        //public currencyList = ['Dollar','Euro', 'Rupee', 'Yen', 'Pound','Rupees'];
        this.currencyList = [];
        this.languageList = [];
        this.summaryHtmlDataList = [];
        this.companyGroupNameList = [];
        this.masterGridDataList = [];
        this.scaleList = [];
        this.reasonForExitList = [];
        this.typeOfEstablishmentList = [];
        this.industryTypeList = [];
        this.countries = [];
        this.isEditMode = false;
        this.companyMasterRequestDTOs = new company_master_dto_1.companyMasterRequestDTOs();
        this.requestDTOString = new company_master_dto_1.requestDTOString();
        this.showButtonSaveAndReset = true;
        this.hideRemarkDiv = true;
        this.isSaveAndReset = true;
        this.groupNameScaleNameStartDateObject = [];
        this.summaryHtmlDataList = [];
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '' };
        this.companyMasterform = this.formBuilder.group({
            code: new forms_1.FormControl('', forms_1.Validators.required),
            companyName: new forms_1.FormControl('', forms_1.Validators.required),
            shortName: new forms_1.FormControl('', forms_1.Validators.required),
            companyGroupName: new forms_1.FormControl('', forms_1.Validators.required),
            companyGroupName1: new forms_1.FormControl({ value: null, disabled: true }),
            typeOfEstablishment: new forms_1.FormControl('', forms_1.Validators.required),
            industryType: new forms_1.FormControl('', forms_1.Validators.required),
            scale: new forms_1.FormControl('', forms_1.Validators.required),
            coClassification: new forms_1.FormControl('', forms_1.Validators.required),
            startDate: new forms_1.FormControl('', [forms_1.Validators.required]),
            formerName: new forms_1.FormControl(''),
            address1: new forms_1.FormControl('', forms_1.Validators.required),
            address2: new forms_1.FormControl(''),
            address3: new forms_1.FormControl(''),
            country: new forms_1.FormControl(''),
            pinCode: new forms_1.FormControl(''),
            state: new forms_1.FormControl(''),
            city: new forms_1.FormControl(''),
            village: new forms_1.FormControl(''),
            phoneNumber: new forms_1.FormControl(''),
            emailId: new forms_1.FormControl('', [forms_1.Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            website: new forms_1.FormControl('', [forms_1.Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),
            contractor: new forms_1.FormControl(''),
            language: new forms_1.FormControl(''),
            currency: new forms_1.FormControl(''),
            logo1: new forms_1.FormControl(''),
            logo2: new forms_1.FormControl(''),
            logo3: new forms_1.FormControl(''),
            endDate: new forms_1.FormControl(''),
            reason: new forms_1.FormControl(''),
            remark: new forms_1.FormControl(''),
            isdCode: new forms_1.FormControl(''),
            officialMobileNumber: new forms_1.FormControl(''),
            contactInformation: new forms_1.FormControl(''),
            companyActive: new forms_1.FormControl('')
        });
        this.companyMasterform.get('remark').disable();
        this.companyMasterform.get('reason').disable();
        this.companyMasterform.get('endDate').disable();
        this.companyMasterform.get('companyActive').setValue(true);
        this.companyMasterform.get('companyActive').disable();
        this.employeeMasterRequestDTO.contractor = 'No';
        this.employeeMasterRequestDTO.language = 'English';
        // this.companyMasterform.set('contractor').value = false;
        // this.companyMasterform.setValue({
        //   contractor: false,
        // });
    }
    CompanyMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.deactiveActiveCheckBox();
        // this.isEditMode = false;
        this.companyMasterService.getLanguagesList().subscribe(function (res) {
            _this.languageList = res.data.results;
            // setTimeout(() => {
            //   this.employeeLanguageRequestModel.language = '';
            // }, 100)
        });
        this.companyMasterService.getCurrencyList().subscribe(function (res) {
            _this.currencyList = res.data.results;
            // setTimeout(() => {
            //     this.previousEmploymentInformation.currency = '';
            // }, 1)
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["messsage"]);
        }, function () {
            _this.companyMasterform.patchValue({
                currency: _this.currencyList[2]
            });
        });
        this.employeeMasterRequestDTO.currency = this.currencyList[2];
        // this.companyMasterform.get('companyActive').setValue(true);
        this.employeeMasterRequestDTO.companyActive = true;
        this.companyMasterService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        });
        // this.companyMasterService.getCompanyMasterDataById(7).subscribe(res =>{
        // });
        this.companyGroupMasterService.getCompanygroupdropdownReasonForExitMaster().subscribe(function (res) {
            // console.log(res);
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.reasonForExitList.push(obj);
            });
        });
        this.companyMasterService.getTypeOfEstablishment().subscribe(function (res) {
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.typeOfEstablishmentList.push(obj);
            });
        });
        this.companyGroupMasterService.getCompanygroupdropdownScaleMaster().subscribe(function (res) {
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.scaleList.push(obj);
            });
        });
        this.companyMasterService.getIndustryTypeMaster().subscribe(function (res) {
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.industryTypeList.push(obj);
            });
        });
        this.companyMasterService.getCountryCodes().subscribe(function (res) {
            _this.countryCode = res.data.results;
        });
        this.refreshHtmlTableData();
    };
    CompanyMasterComponent.prototype.editMaster = function (i, globalCompanyMasterId) {
        var _this = this;
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };
        this.showButtonSaveAndReset = true;
        this.isSaveAndReset = false;
        this.requestDTOString.companyMasterRequestDTOs = [];
        this.selectedImageFileLogo1 = undefined;
        this.selectedImageFileLogo2 = undefined;
        this.selectedImageFileLogo3 = undefined;
        this.companyMasterform.reset();
        this.companyMasterform.enable();
        this.globalCompanyMasterId = globalCompanyMasterId;
        var to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
        if (to !== '9999-12-31') {
            this.companyMasterform.controls['remark'].clearValidators();
            this.companyMasterform.controls['remark'].updateValueAndValidity();
            this.companyMasterform.controls['reason'].clearValidators();
            this.companyMasterform.controls['reason'].updateValueAndValidity();
        }
        this.index = 0;
        console.log(this.masterGridDataList[i].contractor);
        this.companyMasterform.patchValue(this.masterGridDataList[i]);
        console.log(this.masterGridDataList[i]);
        this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.groupName === _this.masterGridDataList[i].companyGroupName; });
        console.log(this.tempObjForgroupNameScaleStartDate);
        this.companyMasterform.patchValue({
            companyGroupName1: this.tempObjForgroupNameScaleStartDate.companyGroupName
        });
        if (this.employeeMasterRequestDTO.contractor === true) {
            this.companyMasterform.patchValue({
                contractor: 'Yes'
            });
        }
        else {
            this.companyMasterform.patchValue({
                contractor: 'No'
            });
            this.companyMasterform.get('companyGroupName1').disable();
        }
        this.companyMasterform.controls['endDate'].clearValidators();
        this.companyMasterform.controls['remark'].clearValidators();
        this.companyMasterform.controls["endDate"].updateValueAndValidity();
        this.companyMasterform.controls["remark"].updateValueAndValidity();
        this.companyMasterform.get('code').disable();
    };
    CompanyMasterComponent.prototype.viewMaster = function (globalCompanyMasterId, i) {
        var _this = this;
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };
        this.selectedImageFileLogo1 = undefined;
        this.selectedImageFileLogo2 = undefined;
        this.selectedImageFileLogo3 = undefined;
        this.globalCompanyMasterId = 0;
        this.showButtonSaveAndReset = false;
        this.companyMasterform.reset();
        this.companyMasterform.patchValue(this.masterGridDataList[i]);
        this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.groupName === _this.masterGridDataList[i].companyGroupName; });
        console.log(this.tempObjForgroupNameScaleStartDate);
        this.companyMasterform.patchValue({
            companyGroupName1: this.tempObjForgroupNameScaleStartDate.companyGroupName
        });
        if (this.employeeMasterRequestDTO.contractor === true) {
            this.companyMasterform.patchValue({
                contractor: 'Yes'
            });
        }
        else {
            var newLocal = 'No';
            this.companyMasterform.patchValue({
                contractor: newLocal
            });
        }
        this.companyMasterform.disable();
    };
    CompanyMasterComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.companyMasterService.getAllCompanyMasterData().subscribe(function (res) {
            console.log(res);
            _this.masterGridDataList = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element) {
                var contractor;
                if (element.contractor === false) {
                    contractor = 'No';
                }
                else {
                    contractor = 'Yes';
                }
                var obj = {
                    SrNo: i++,
                    shortName: element.shortName,
                    StartDate: element.startDate,
                    EndDate: element.endDate,
                    Scale: element.scale,
                    companyGroupId: element.companyGroupId,
                    globalCompanyMasterId: element.globalCompanyMasterId,
                    address1: element.address1,
                    address2: element.address2,
                    address3: element.address3,
                    city: element.city,
                    coClassification: element.coClassification,
                    code: element.code,
                    companyActive: element.companyActive,
                    companyLogo1: element.companyLogo1 ? null : '',
                    companyLogo2: element.companyLogo2 ? null : '',
                    companyLogo3: element.companyLogo3 ? null : '',
                    companyName: element.companyName,
                    country: element.country,
                    createdBy: element.createdBy,
                    createdOn: element.createdOn,
                    currency: element.currency,
                    emailId: element.emailId,
                    formerName: element.formerName,
                    industryType: element.industryType,
                    language: element.language,
                    logo1ImageName: element.logo1ImageName ? null : '',
                    logo1Type: element.logo1Type ? null : '',
                    logo2ImageName: element.logo2ImageName ? null : '',
                    logo2Type: element.logo2Type ? null : '',
                    logo3ImageName: element.logo3ImageName ? null : '',
                    logo3Type: element.logo3ImageName ? null : '',
                    pinCode: element.pinCode,
                    reason: element.reason,
                    remark: element.remark,
                    scale: element.scale,
                    state: element.state,
                    typeOfEstablishment: element.typeOfEstablishment,
                    updatedBy: element.updatedBy,
                    updatedOn: element.updatedOn,
                    contractor: contractor,
                    village: element.village,
                    website: element.website
                };
                _this.summaryHtmlDataList.push(obj);
                // console.log(this.summaryHtmlDataList);
            });
        });
        console.log('summary');
        console.log(this.summaryHtmlDataList);
        this.companyGroupMasterService.getCompanyGroupMaster().subscribe(function (res) {
            var companyGroupcode;
            var startDate;
            var scale;
            console.log(res);
            res.data.results.forEach(function (element) {
                _this.companyGroupNameList.push(element.companyGroupCode);
                _this.groupNameScaleNameStartDateObject.push({ groupName: element.companyGroupCode, startDate: element.startDate, scale: element.scale, companyGroupName: element.companyGroupName });
            });
        });
        console.log(this.groupNameScaleNameStartDateObject);
        console.log('--');
    };
    CompanyMasterComponent.prototype.cancelViewMasterForm = function () {
        this.showButtonSaveAndReset = true;
        this.isSaveAndReset = true;
        this.employeeMasterRequestDTO = new company_master_dto_1.EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        // this.isEditMode = false;
        this.selectedImageFileLogo1 = undefined;
        this.selectedImageFileLogo2 = undefined;
        this.selectedImageFileLogo3 = undefined;
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };
        this.globalCompanyMasterId = 0;
        this.deactivateRemark();
        this.saveFormValidation();
    };
    CompanyMasterComponent.prototype.onChangeEndDate = function (evt) {
        console.log(evt);
        console.log(this.companyMasterform.get('endDate').value);
        var from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
        var to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
        if (from > to) {
            this.companyMasterform.controls['endDate'].reset();
        }
        this.companyMasterform.controls["remark"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["remark"].updateValueAndValidity();
        this.companyMasterform.controls["reason"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["reason"].updateValueAndValidity();
        this.companyMasterform.get('companyActive').setValue(false);
        this.deactivateRemark();
    };
    CompanyMasterComponent.prototype.onChangeStartDate = function () {
        var from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
        var to = this.datePipe.transform(this.tempObjForgroupNameScaleStartDate.startDate, 'yyyy-MM-dd');
        console.log(this.tempObjForgroupNameScaleStartDate.startDate);
        console.log(from);
        if (from < to) {
            alert('Start Date should not be less than Company Group Start Date');
            this.companyMasterform.patchValue({
                startDate: ''
            });
        }
        else {
            console.log('greater');
        }
    };
    CompanyMasterComponent.prototype.deactivateRemark = function () {
        if (this.companyMasterform.value.companyActive === false) {
            this.companyMasterform.get('companyActive').disable();
            // this.hideRemarkDiv = true;
            this.companyMasterform.get('remark').setValidators([forms_1.Validators.required]);
            // this.companyMasterform.get('companyActive').disable();
        }
        else {
            this.companyMasterform.get('remark').clearValidators();
            // this.hideRemarkDiv = false;
            this.companyMasterform.get('companyActive').enable();
            // this.companyMasterform.get('remark').reset();
        }
    };
    CompanyMasterComponent.prototype.deactiveActiveCheckBox = function () {
        this.deactivateRemark();
    };
    CompanyMasterComponent.prototype.saveCompanyMaster = function (employeeMasterRequestDTO) {
        var _this = this;
        console.log(employeeMasterRequestDTO);
        if (this.globalCompanyMasterId > 0) {
            this.requestDTOString.companyMasterRequestDTOs = [];
            console.log('clcicked on update button');
            var companyName = this.companyMasterform.get('companyName').value;
            var scale = this.companyMasterform.get('scale').value;
            var code = this.companyMasterform.get('code').value;
            var data = this.companyMasterform.getRawValue();
            var startDate = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'dd-MMM-y');
            var endDate = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'dd-MMM-y');
            var isContractor1 = false;
            if (this.companyMasterform.get('contractor').value === 'No') {
                isContractor1 = false;
            }
            else {
                isContractor1 = true;
            }
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = this.globalCompanyMasterId;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = code;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get('shortName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get('companyName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get('formerName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupName = this.companyMasterform.get('companyGroupName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.address1 = this.companyMasterform.get('address1').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.address2 = this.companyMasterform.get('address2').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.address3 = this.companyMasterform.get('address3').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.country = this.companyMasterform.get('country').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.pinCode = this.companyMasterform.get('pinCode').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.state = this.companyMasterform.get('state').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.city = this.companyMasterform.get('state').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.village = this.companyMasterform.get('village').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.isdCode = this.companyMasterform.get('isdCode').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.phoneNumber = this.companyMasterform.get('phoneNumber').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.emailId = this.companyMasterform.get('emailId').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.website = this.companyMasterform.get('website').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.contractor = isContractor1;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.typeOfEstablishment = this.companyMasterform.get('typeOfEstablishment').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.language = this.companyMasterform.get('language').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.currency = this.companyMasterform.get('currency').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.industryType = this.companyMasterform.get('industryType').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.scale = scale;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.coClassification = this.companyMasterform.get('coClassification').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.startDate = startDate;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.endDate = endDate;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.reason = this.companyMasterform.get('reason').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyActive = true;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.remark = this.companyMasterform.get('remark').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo1 = this.companyMasterform.get('logo1').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo2 = this.companyMasterform.get('logo2').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo3 = this.companyMasterform.get('logo3').value;
            this.companyMasterRequestDTOs.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.employeeMasterRequestDTO);
            console.log(this.companyMasterRequestDTOs.companyMasterRequestDTOs);
            this.requestDTOString.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.companyMasterRequestDTOs[0]);
            console.log(this.selectedImageFileLogo2);
            var formData = new FormData();
            console.log('222' + this.employeeMasterRequestDTO.code);
            console.log(JSON.stringify(this.requestDTOString));
            formData.append('requestDTOString', JSON.stringify(this.requestDTOString));
            if (this.selectedImageFileLogo1 !== undefined) {
                formData.append('files', this.selectedImageFileLogo1, this.employeeMasterRequestDTO.code + ' 1.jpg');
            }
            if (this.selectedImageFileLogo2 !== undefined) {
                formData.append('files', this.selectedImageFileLogo2, this.employeeMasterRequestDTO.code + ' 2.jpg');
            }
            if (this.selectedImageFileLogo3 !== undefined) {
                formData.append('files', this.selectedImageFileLogo3, this.employeeMasterRequestDTO.code + ' 3.jpg');
            }
            this.companyMasterService.postCompanyMaster(formData).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.sweetalertMasterSuccess('Company  Master Updated Successfully.', '');
                    _this.employeeMasterRequestDTO = new company_master_dto_1.EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
                    _this.saveFormValidation();
                    // this.companyMasterform.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.globalCompanyMasterId = 0;
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
            this.requestDTOString.companyMasterRequestDTOs = [];
            var companyName = this.companyMasterform.get('companyName').value;
            var scale = this.companyMasterform.get('scale').value;
            var code = this.companyMasterform.get('code').value;
            var data = this.companyMasterform.getRawValue();
            var startDate = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'dd-MMM-y');
            var endDate = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'dd-MMM-y');
            var isContractor2 = void 0;
            if (this.companyMasterform.get('contractor').value === 'No') {
                isContractor2 = false;
            }
            else {
                isContractor2 = true;
            }
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = 0;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = this.companyMasterform.get('code').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get('shortName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get('companyName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get('formerName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupName = this.companyMasterform.get('companyGroupName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.address1 = this.companyMasterform.get('address1').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.address2 = this.companyMasterform.get('address2').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.address3 = this.companyMasterform.get('address3').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.country = this.companyMasterform.get('country').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.pinCode = this.companyMasterform.get('pinCode').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.state = this.companyMasterform.get('state').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.city = this.companyMasterform.get('state').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.village = this.companyMasterform.get('village').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.phoneNumber = this.companyMasterform.get('phoneNumber').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.isdCode = this.companyMasterform.get('isdCode').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.emailId = this.companyMasterform.get('emailId').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.website = this.companyMasterform.get('website').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.contractor = isContractor2;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.typeOfEstablishment = this.companyMasterform.get('typeOfEstablishment').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.language = this.companyMasterform.get('language').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.currency = this.companyMasterform.get('currency').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.industryType = this.companyMasterform.get('industryType').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.scale = scale;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.coClassification = this.companyMasterform.get('coClassification').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.startDate = startDate;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.endDate = endDate;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.reason = this.companyMasterform.get('reason').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyActive = true;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.remark = this.companyMasterform.get('remark').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo1 = this.companyMasterform.get('logo1').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo2 = this.companyMasterform.get('logo2').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo3 = this.companyMasterform.get('logo3').value;
            this.companyMasterRequestDTOs.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.employeeMasterRequestDTO);
            console.log(this.companyMasterRequestDTOs.companyMasterRequestDTOs);
            this.requestDTOString.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.companyMasterRequestDTOs[0]);
            var formData = new FormData();
            console.log(JSON.stringify(this.requestDTOString));
            formData.append('requestDTOString', JSON.stringify(this.requestDTOString));
            if (this.selectedImageFileLogo1 !== undefined) {
                formData.append('files', this.selectedImageFileLogo1, this.employeeMasterRequestDTO.code + ' 1.jpg');
            }
            if (this.selectedImageFileLogo2 !== undefined) {
                formData.append('files', this.selectedImageFileLogo2, this.employeeMasterRequestDTO.code + ' 2.jpg');
            }
            if (this.selectedImageFileLogo3 !== undefined) {
                formData.append('files', this.selectedImageFileLogo3, this.employeeMasterRequestDTO.code + ' 3.jpg');
            }
            this.companyMasterService.postCompanyMaster(formData).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.sweetalertMasterSuccess('Company  Master Saved Successfully.', '');
                    _this.saveFormValidation();
                    // this.companyMasterform.reset();
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
    CompanyMasterComponent.prototype.onSelectScale = function () { };
    CompanyMasterComponent.prototype.checkLocalAddress = function () {
    };
    CompanyMasterComponent.prototype.clearLocalAddressFields = function () {
    };
    CompanyMasterComponent.prototype.getPermanentAddressFromPIN = function () {
        var _this = this;
        console.log(this.companyMasterform.get('pinCode').value);
        if (this.companyMasterform.get('pinCode').value.length < 6) {
            this.companyMasterform.get('state').setValue('');
            this.companyMasterform.get('city').setValue('');
        }
        if (this.companyMasterform.get('pinCode').value.length == 6 && this.companyMasterform.get('country').value == 'India') {
            this.companyMasterService.getAddressFromPIN(this.companyMasterform.get('pinCode').value).subscribe(function (res) {
                console.log(res);
                _this.companyMasterform.get('state').setValue(res.data.results[0].state);
                _this.companyMasterform.get('city').setValue(res.data.results[0].city);
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    CompanyMasterComponent.prototype.setPaymentDetailToDate = function () {
        var to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
        if (to !== null) {
            if (to.trim() === '9999-12-31') {
                this.companyMasterform.controls["remark"].clearValidators();
                this.companyMasterform.controls["remark"].updateValueAndValidity();
                this.companyMasterform.controls["reason"].clearValidators();
                this.companyMasterform.controls["reason"].updateValueAndValidity();
                this.companyMasterform.get('companyActive').setValue(true);
                this.deactivateRemark();
            }
        }
    };
    CompanyMasterComponent.prototype.sweetalertError = function (message) {
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
    CompanyMasterComponent.prototype.sweetalertWarning = function (message) {
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
    CompanyMasterComponent.prototype.sweetalertMasterSuccess = function (message, text) {
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
    // selected image bindind
    CompanyMasterComponent.prototype.uploadFile = function (event, uploadFile) {
        var _this = this;
        console.log(event);
        console.log(uploadFile);
        console.log(uploadFile.files[0]);
        //  this.selectedImageFile = uploadFile.files[0];
        this.uploadFiles = uploadFile.files[0];
        this.companyMasterform.markAsTouched();
        var reader = new FileReader(); // HTML5 FileReader API
        var file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            // When file uploads set it to file formcontrol
            reader.onload = function () {
                _this.imageUrl = reader.result;
                // this.selectedImageFile = this.imageUrl;
                //  this.companyMasterform.get("logo3").patchValue({file: this.selectedImageFile});
                //  this.companyMasterform.patchValue({
                //    file: reader.result
                //  });
            };
            // ChangeDetectorRef since file is loading outside the zone
            this.cd.markForCheck();
        }
    };
    CompanyMasterComponent.prototype.logo1 = function (event, uploadFile) {
        console.log('in log1');
        var file = event.target.files[0];
        var reader = new FileReader();
        console.log(reader);
        if (event.target.files && event.target.files.length) {
            this.selectedImageFileLogo1 = event.target.files[0];
            var file_1 = event.target.files[0];
            reader.readAsDataURL(file_1);
            // console.log(reader.result);
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
        }
        ;
    };
    CompanyMasterComponent.prototype.logo2 = function (event, uploadFile) {
        var file = event.target.files[0];
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            this.selectedImageFileLogo2 = event.target.files[0];
            // console.log(event.target.files);
            var file_2 = event.target.files[0];
            reader.readAsDataURL(file_2);
            // console.log(reader.result);
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
        }
        ;
    };
    CompanyMasterComponent.prototype.logo3 = function (event, uploadFile) {
        var file = event.target.files[0];
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            this.selectedImageFileLogo3 = event.target.files[0];
            var file_3 = event.target.files[0];
            reader.readAsDataURL(file_3);
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
        }
        ;
    };
    CompanyMasterComponent.prototype.onSelectGroupMaster = function (evt) {
        this.tempObjForgroupNameScaleStartDate = null;
        console.log(evt);
        //  console.log(evt.target.value);
        this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.groupName === evt; });
        console.log(this.tempObjForgroupNameScaleStartDate);
        this.companyMasterform.patchValue({
            scale: this.tempObjForgroupNameScaleStartDate.scale,
            companyGroupName1: this.tempObjForgroupNameScaleStartDate.companyGroupName
        });
    };
    CompanyMasterComponent.prototype.saveFormValidation = function () {
        this.selectedImageFileLogo1 = undefined;
        this.selectedImageFileLogo2 = undefined;
        this.selectedImageFileLogo3 = undefined;
        // this.companyMasterform = this.formBuilder.group({
        //   code: new FormControl('', Validators.required),
        //   companyName: new FormControl('', Validators.required),
        //   shortName: new FormControl( '', Validators.required),
        //   companyGroupName: new FormControl('', Validators.required ),
        //   typeOfEstablishment: new FormControl('', Validators.required ),
        //   industryType: new FormControl('', Validators.required),
        //   scale: new FormControl('', Validators.required ),
        //   coClassification: new FormControl('', Validators.required),
        //   startDate: new FormControl('', [Validators.required] ),
        //   emailId: new FormControl('' , [  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        //   website: new FormControl('',  [  Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),
        // });
        this.isEditMode = false;
        this.companyMasterform.reset();
        this.companyMasterform.enable();
        //  this.employeeMasterRequestDTO.contractor = 'No';
        this.companyMasterform.get('companyActive').setValue(true);
        this.companyMasterform.controls['endDate'].clearValidators();
        this.companyMasterform.controls['remark'].clearValidators();
        this.companyMasterform.controls['reason'].clearValidators();
        this.companyMasterform.controls["endDate"].updateValueAndValidity();
        this.companyMasterform.controls["remark"].updateValueAndValidity();
        this.companyMasterform.controls["reason"].updateValueAndValidity();
        this.companyMasterform.controls["code"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["code"].updateValueAndValidity();
        this.companyMasterform.controls["address1"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["address1"].updateValueAndValidity();
        this.companyMasterform.controls["companyGroupName"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["companyGroupName"].updateValueAndValidity();
        this.companyMasterform.controls["shortName"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["shortName"].updateValueAndValidity();
        this.companyMasterform.controls["scale"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["scale"].updateValueAndValidity();
        this.companyMasterform.controls["startDate"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["startDate"].updateValueAndValidity();
        //   this.companyMasterform.get('companyGroupActive').setValue(true);
        this.companyMasterform.get('endDate').disable();
        this.companyMasterform.get('reason').disable();
        this.companyMasterform.get('remark').disable();
        this.companyMasterform.get('companyActive').setValue(true);
        this.companyMasterform.get('contractor').setValue('No');
        this.companyMasterform.patchValue({
            language: 'English'
        });
        this.companyMasterform.patchValue({
            currency: this.currencyList[2]
        });
        this.deactiveActiveCheckBox();
        this.companyMasterform.get('companyActive').disable();
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], CompanyMasterComponent.prototype, "el");
    CompanyMasterComponent = __decorate([
        core_1.Component({
            selector: 'app-company-master',
            templateUrl: './company-master.component.html',
            styleUrls: ['./company-master.component.scss']
        })
    ], CompanyMasterComponent);
    return CompanyMasterComponent;
}());
exports.CompanyMasterComponent = CompanyMasterComponent;
