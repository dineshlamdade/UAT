"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyMasterComponent = void 0;
var shorten_string_pipe_1 = require("./../../../core/utility/pipes/shorten-string.pipe");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var company_master_dto_1 = require("./dto-models/company-master-dto");
var CompanyMasterComponent = /** @class */ (function () {
    function CompanyMasterComponent(shortenString, cd, formBuilder, datePipe, companyMasterService, companyGroupMasterService, alertService) {
        this.shortenString = shortenString;
        this.cd = cd;
        this.formBuilder = formBuilder;
        this.datePipe = datePipe;
        this.companyMasterService = companyMasterService;
        this.companyGroupMasterService = companyGroupMasterService;
        this.alertService = alertService;
        this.companyMasterform = forms_1.FormGroup;
        this.shortNameInvalid = false;
        this.companyNameInvalid = false;
        this.invalidWebsite = false;
        this.imageUrl = "./assets/emp-master-images/empIcon5.png";
        this.employeeMasterRequestDTO = new company_master_dto_1.EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.countryCode = [];
        this.isContractorDataList = ['Group Company', 'Contractor'];
        this.companyClassificationList = ['A', 'B', 'C'];
        // public languageList = ['English'];
        //public currencyList = ['Dollar','Euro', 'Rupee', 'Yen', 'Pound','Rupees'];
        this.currencyList = [];
        this.languageList = [];
        this.summaryHtmlDataList = [];
        this.companyGroupCodeList = [];
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
        this.today = new Date();
        this.groupNameScaleNameStartDateObject = [];
        this.summaryHtmlDataList = [];
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '' };
        this.companyMasterform = this.formBuilder.group({
            // code: new FormControl({ value: null, disabled: true }),
            code: new forms_1.FormControl({ value: null, disabled: true }),
            companyName: new forms_1.FormControl('', forms_1.Validators.required),
            shortName: new forms_1.FormControl('', forms_1.Validators.required),
            companyGroupCode: new forms_1.FormControl('', forms_1.Validators.required),
            companyGroupCode1: new forms_1.FormControl({ value: null, disabled: true }),
            typeOfEstablishment: new forms_1.FormControl('', forms_1.Validators.required),
            industryType: new forms_1.FormControl('', forms_1.Validators.required),
            scale: new forms_1.FormControl('', forms_1.Validators.required),
            coClassification: new forms_1.FormControl('', forms_1.Validators.required),
            startDate: new forms_1.FormControl('', [forms_1.Validators.required]),
            formerName: new forms_1.FormControl(''),
            address1: new forms_1.FormControl('', forms_1.Validators.required),
            address2: new forms_1.FormControl(''),
            address3: new forms_1.FormControl(''),
            country: new forms_1.FormControl('', forms_1.Validators.required),
            pinCode: new forms_1.FormControl('', forms_1.Validators.required),
            state: new forms_1.FormControl({ value: null, disabled: true }),
            city: new forms_1.FormControl({ value: null, disabled: true }),
            village: new forms_1.FormControl(''),
            // tslint:disable-next-line: max-line-length
            phoneNumber: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
            emailId: new forms_1.FormControl('', [forms_1.Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            website: new forms_1.FormControl('', [forms_1.Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),
            isContractor: new forms_1.FormControl(''),
            language: new forms_1.FormControl(''),
            currency: new forms_1.FormControl(''),
            logo1: new forms_1.FormControl(''),
            logo2: new forms_1.FormControl(''),
            logo3: new forms_1.FormControl(''),
            endDate: new forms_1.FormControl(''),
            reason: new forms_1.FormControl(''),
            remark: new forms_1.FormControl(''),
            isdCode: new forms_1.FormControl('', forms_1.Validators.required),
            officialMobileNumber: new forms_1.FormControl(''),
            contactInformation: new forms_1.FormControl(''),
            companyActive: new forms_1.FormControl('')
        });
        this.companyMasterform.get('remark').disable();
        this.companyMasterform.get('reason').disable();
        this.companyMasterform.get('endDate').disable();
        this.companyMasterform.get('companyActive').setValue(true);
        this.companyMasterform.get('companyActive').disable();
        this.employeeMasterRequestDTO.isContractor = '';
        this.employeeMasterRequestDTO.language = 'English';
    }
    CompanyMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employeeMasterRequestDTO.isContractor = '';
        this.employeeMasterRequestDTO.reason = '';
        this.companyMasterform.get('companyActive').disable();
        this.deactiveActiveCheckBox();
        this.companyMasterService.getLanguagesList().subscribe(function (res) {
            _this.languageList = res.data.results;
        });
        this.companyMasterService.getCurrencyList().subscribe(function (res) {
            _this.currencyList = res.data.results;
        }, function (error) {
            //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        }, function () {
            _this.companyMasterform.patchValue({
                currency: _this.currencyList[2]
            });
        });
        this.employeeMasterRequestDTO.currency = this.currencyList[2];
        this.employeeMasterRequestDTO.companyActive = true;
        this.companyMasterService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        });
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
        window.scrollTo(0, 0);
        this.companyMasterform.get('code').disable();
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
        // const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
        // if (to !== '9999-12-31') {
        //   this.companyMasterform.controls['remark'].clearValidators();
        //   this.companyMasterform.controls['remark'].updateValueAndValidity();
        //   this.companyMasterform.controls['reason'].clearValidators();
        //   this.companyMasterform.controls['reason'].updateValueAndValidity();
        // }
        this.index = 0;
        console.log(this.masterGridDataList[i].isContractor);
        this.companyMasterform.patchValue(this.masterGridDataList[i]);
        console.log(this.masterGridDataList[i]);
        this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.groupName === _this.masterGridDataList[i].companyGroupCode; });
        console.log(this.tempObjForgroupNameScaleStartDate);
        this.companyMasterform.patchValue({
            companyGroupCode1: this.tempObjForgroupNameScaleStartDate.companyGroupCode
        });
        this.companyMasterform.controls['endDate'].clearValidators();
        this.companyMasterform.controls['remark'].clearValidators();
        this.companyMasterform.controls["endDate"].updateValueAndValidity();
        this.companyMasterform.controls["remark"].updateValueAndValidity();
        this.companyMasterform.get('code').disable();
        this.companyMasterform.get('state').disable();
        this.companyMasterform.get('city').disable();
        this.companyMasterform.get('companyActive').disable();
    };
    CompanyMasterComponent.prototype.viewMaster = function (globalCompanyMasterId, i) {
        var _this = this;
        window.scrollTo(0, 0);
        this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };
        this.selectedImageFileLogo1 = undefined;
        this.selectedImageFileLogo2 = undefined;
        this.selectedImageFileLogo3 = undefined;
        this.globalCompanyMasterId = 0;
        this.showButtonSaveAndReset = false;
        this.companyMasterform.reset();
        this.companyMasterform.patchValue(this.masterGridDataList[i]);
        this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.groupName === _this.masterGridDataList[i].companyGroupCode; });
        console.log(this.tempObjForgroupNameScaleStartDate);
        this.companyMasterform.patchValue({
            companyGroupCode1: this.tempObjForgroupNameScaleStartDate.companyGroupCode
        });
        // if (this.employeeMasterRequestDTO.isContractor === true) {
        //   // this.companyMasterform.patchValue({
        //   //   contractor: 'Yes',
        //   // });
        // } else {
        //   // const newLocal = 'No';
        //   // this.companyMasterform.patchValue({
        //   //   contractor: newLocal,
        //   // });
        // }
        this.companyMasterform.disable();
    };
    CompanyMasterComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.companyMasterService.getAllCompanyMasterData().subscribe(function (res) {
            console.log('check', res);
            _this.masterGridDataList = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element) {
                // let contractor;
                // if (element.contractor === false) {
                //   contractor = 'No';
                // } else {
                //   contractor = 'Yes'
                // }
                var obj = {
                    SrNo: i++,
                    shortName: element.shortName,
                    shortenShortName: _this.shortenString.transform(element.shortName),
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
                    shortenCompanyName: _this.shortenString.transform(element.companyName),
                    country: element.country,
                    createdBy: element.createdBy,
                    createdOn: element.createdOn,
                    currency: element.currency,
                    emailId: element.emailId,
                    formerName: element.formerName,
                    industryType: element.industryType,
                    shortenIndustryType: _this.shortenString.transform(element.industryType),
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
                    isContractor: element.isContractor,
                    village: element.village,
                    website: element.website,
                    servicePeriod: element.servicePeriod,
                    servicePeriodShort: element.servicePeriodShort
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
        console.log('summary');
        console.log(this.summaryHtmlDataList);
        this.companyGroupMasterService.getCompanyGroupMasterActive().subscribe(function (res) {
            _this.companyGroupCodeList = [];
            _this.groupNameScaleNameStartDateObject = [];
            var companyGroupcode;
            var startDate;
            var scale;
            console.log(res);
            res.data.results.forEach(function (element) {
                if (element.companyGroupActive == 1) {
                    _this.companyGroupCodeList.push({ name: element.companyGroupCode, disabled: false });
                }
                else {
                    _this.companyGroupCodeList.push({ name: element.companyGroupCode, disabled: true });
                }
                _this.groupNameScaleNameStartDateObject.push({ groupName: element.companyGroupCode, startDate: element.startDate, scale: element.scale, companyGroupCode: element.companyGroupCode });
            });
        });
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
    // copied from companygroup master
    // onChangeEndDate(evt: any) {
    //   console.log(this.companyMasterform.get('endDate').value);
    //   // console.log(this.endDateModel);
    //   //  console.log(evt.target.value);
    //   //  console.log(this.form.get('endDate').value);
    //   if (this.companyMasterform.get('endDate').value == '' || this.companyMasterform.get('endDate').value == null) {
    //     this.companyMasterform.controls["remark"].clearValidators();
    //     this.companyMasterform.controls["remark"].updateValueAndValidity();
    //     this.companyMasterform.controls["reason"].clearValidators();
    //     this.companyMasterform.controls["reason"].updateValueAndValidity();
    //   } else {
    //     console.log(evt);
    //     console.log(this.companyMasterform.get('endDate').value);
    //     const from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
    //     const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    //     if (from > to) {
    //       this.companyMasterform.controls['endDate'].reset()
    //     }
    //     this.companyMasterform.controls["remark"].setValidators(Validators.required);
    //     this.companyMasterform.controls["remark"].updateValueAndValidity();
    //     this.companyMasterform.controls["reason"].setValidators(Validators.required);
    //     this.companyMasterform.controls["reason"].updateValueAndValidity();
    //     this.companyMasterform.get('companyGroupActive').setValue(true);
    //     this.deactivateRemark();
    //   }
    // }
    CompanyMasterComponent.prototype.onChangeEndDate = function (evt) {
        // const from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
        // const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
        // if (from > to) {
        //   this.companyMasterform.controls['endDate'].reset();
        // }
        if (this.companyMasterform.get('endDate').value == '' || this.companyMasterform.get('endDate').value == null) {
            this.companyMasterform.get('remark').clearValidators();
            this.companyMasterform.controls['remark'].updateValueAndValidity();
            this.companyMasterform.get('reason').clearValidators();
            this.companyMasterform.controls['reason'].updateValueAndValidity();
            this.companyMasterform.patchValue({
                remark: '',
                reason: ''
            });
            this.companyMasterform.get('remark').disable();
            this.companyMasterform.get('reason').disable();
        }
        else {
            this.companyMasterform.get('remark').enable();
            this.companyMasterform.get('reason').enable();
            this.companyMasterform.controls['remark'].setValidators(forms_1.Validators.required);
            this.companyMasterform.controls['remark'].updateValueAndValidity();
            this.companyMasterform.controls['reason'].setValidators(forms_1.Validators.required);
            this.companyMasterform.controls['reason'].updateValueAndValidity();
            this.companyMasterform.get('companyActive').setValue(false);
            this.deactivateRemark();
        }
    };
    CompanyMasterComponent.prototype.onChangeStartDate = function () {
        var from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
        var to = this.datePipe.transform(this.tempObjForgroupNameScaleStartDate.startDate, 'yyyy-MM-dd');
        this.today = new Date(from);
        console.log(this.tempObjForgroupNameScaleStartDate.startDate);
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
    CompanyMasterComponent.prototype.deactivateRemark = function () { };
    CompanyMasterComponent.prototype.deactivateRemark1 = function () {
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
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = this.globalCompanyMasterId;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = code;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get('shortName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get('companyName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get('formerName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupCode = this.companyMasterform.get('companyGroupCode').value;
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
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.isContractor = this.companyMasterform.get('isContractor').value;
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
                    _this.alertService.sweetalertMasterSuccess('Company  Master Updated Successfully.', '');
                    _this.employeeMasterRequestDTO = new company_master_dto_1.EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
                    // this.companyMasterform.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.globalCompanyMasterId = 0;
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                //this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
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
            // let isContractor2: boolean;
            // if (this.companyMasterform.get('contractor').value === 'No') {
            //   isContractor2 = false;
            // } else {
            //   isContractor2 = true;
            // }
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = 0;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = this.companyMasterform.get('code').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get('shortName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get('companyName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get('formerName').value;
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupCode = this.companyMasterform.get('companyGroupCode').value;
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
            this.companyMasterRequestDTOs.employeeMasterRequestDTO.isContractor = this.companyMasterform.get('isContractor').value;
            ;
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
                    _this.alertService.sweetalertMasterSuccess('Company  Master Saved Successfully.', '');
                    // this.companyMasterform.reset();
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
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
                //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    CompanyMasterComponent.prototype.setPaymentDetailToDate = function (evt) {
        var endDate12 = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'dd-MMM-y');
        // debugger
        // console.log(this.endDate1);
        // console.log(this.endDate1.nativeElement);
        // console.log(this.endDate1.nativeElement.value);
        // if (this.endDate1 !== undefined) {
        //   this.endDate1.nativeElement.value = this.datePipe.transform(this.endDate1.nativeElement.value, 'dd-MMM-y');
        // }
        //  console.log(this.endDate1.nativeElement.value);
        // const endDate = this.datePipe.transform(this.endDateModel, 'yyyy-MM-dd');
        if (endDate12 == '' || endDate12 == null) {
            this.companyMasterform.controls["remark"].clearValidators();
            this.companyMasterform.controls["remark"].updateValueAndValidity();
            this.companyMasterform.controls["reason"].clearValidators();
            this.companyMasterform.controls["reason"].updateValueAndValidity();
        }
        else {
            this.companyMasterform.controls["remark"].setValidators([forms_1.Validators.required]);
            this.companyMasterform.controls["remark"].updateValueAndValidity();
            this.companyMasterform.controls["reason"].setValidators([forms_1.Validators.required]);
            this.companyMasterform.controls["reason"].updateValueAndValidity();
            // this.form.get('companyGroupActive').setValue(true);
            // this.hideRemarkDiv = false;
            this.deactivateRemark();
            // } else {
            //   this.form.get('companyGroupActive').setValue(false);
            //   this.hideRemarkDiv = true;
            //   this.deactivateRemark();
            //
        }
    };
    // setPaymentDetailToDate() {
    //   // const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    //   // if (to !== null) {
    //   //   if (to.trim() === '9999-12-31') {
    //       this.companyMasterform.controls["remark"].clearValidators();
    //       this.companyMasterform.controls["remark"].updateValueAndValidity();
    //       this.companyMasterform.controls["reason"].clearValidators();
    //       this.companyMasterform.controls["reason"].updateValueAndValidity();
    //       this.companyMasterform.get('companyActive').setValue(true);
    //       this.deactivateRemark();
    // }
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
        if (evt == '') {
            this.tempObjForgroupNameScaleStartDate = null;
            this.companyMasterform.patchValue({
                scale: '',
                companyGroupCode1: '',
                startDate: ''
            });
        }
        else {
            this.tempObjForgroupNameScaleStartDate = null;
            console.log(evt);
            //  console.log(evt.target.value);
            this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find(function (o) { return o.groupName === evt; });
            console.log(this.tempObjForgroupNameScaleStartDate);
            this.companyMasterform.patchValue({
                scale: this.tempObjForgroupNameScaleStartDate.scale,
                companyGroupCode1: this.tempObjForgroupNameScaleStartDate.companyGroupCode,
                startDate: ''
            });
            this.groupStartDateValidation = new Date(this.tempObjForgroupNameScaleStartDate.startDate);
        }
    };
    CompanyMasterComponent.prototype.saveFormValidation = function () {
        this.selectedImageFileLogo1 = undefined;
        this.selectedImageFileLogo2 = undefined;
        this.selectedImageFileLogo3 = undefined;
        this.isEditMode = false;
        this.companyMasterform.reset();
        this.companyMasterform.enable();
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
        this.companyMasterform.controls["companyGroupCode"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["companyGroupCode"].updateValueAndValidity();
        this.companyMasterform.controls["shortName"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["shortName"].updateValueAndValidity();
        this.companyMasterform.controls["scale"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["scale"].updateValueAndValidity();
        this.companyMasterform.controls["startDate"].setValidators(forms_1.Validators.required);
        this.companyMasterform.controls["startDate"].updateValueAndValidity();
        this.companyMasterform.get('endDate').disable();
        this.companyMasterform.get('reason').disable();
        this.companyMasterform.get('code').disable();
        this.companyMasterform.get('remark').disable();
        this.companyMasterform.get('companyActive').setValue(true);
        this.companyMasterform.patchValue({
            language: 'English'
        });
        this.companyMasterform.patchValue({
            currency: this.currencyList[2],
            companyGroupCode: '',
            country: '',
            isdCode: '',
            typeOfEstablishment: '',
            industryType: '',
            scale: '',
            coClassification: '',
            reason: '',
            isContractor: ''
        });
        this.deactiveActiveCheckBox();
        this.companyMasterform.get('companyActive').disable();
        this.companyMasterform.get('state').disable();
        this.companyMasterform.get('city').disable();
    };
    CompanyMasterComponent.prototype.keyPress = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    CompanyMasterComponent.prototype.isCompanyNameContainsOnlySpecialCharacter = function () {
        this.companyNameInvalid = false;
        var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
        for (var i = 0; i < this.companyMasterform.get('companyName').value.length; i++) {
            if (splChars.indexOf(this.companyMasterform.get('companyName').value.charAt(i)) != -1) {
                //alert("Illegal characters detected!");
                this.companyNameInvalid = true;
            }
            else {
                this.companyNameInvalid = false;
                break;
            }
        }
        if (this.companyNameInvalid == true) {
            this.companyMasterform.get('companyName').status = 'INVALID';
        }
    };
    CompanyMasterComponent.prototype.isShortNameContainsOnlySpecialCharacter = function () {
        this.shortNameInvalid = false;
        var splChars = "*|,\":<>[]{}`\!';^()@&$#%1234567890";
        for (var i = 0; i < this.companyMasterform.get('shortName').value.length; i++) {
            if (splChars.indexOf(this.companyMasterform.get('shortName').value.charAt(i)) != -1) {
                //alert("Illegal characters detected!");
                this.shortNameInvalid = true;
            }
            else {
                this.shortNameInvalid = false;
                break;
            }
        }
        if (this.shortNameInvalid == true) {
            this.companyMasterform.get('shortName').status = 'INVALID';
        }
    };
    CompanyMasterComponent.prototype.keyPressedSpaceNotAllow = function (event) {
        var pattern = /[ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    CompanyMasterComponent.prototype.onSelectCountry = function (evt) {
        this.companyMasterform.patchValue({
            pinCode: '',
            state: '',
            city: '',
            village: ''
        });
    };
    CompanyMasterComponent.prototype.onChangeWebsiteName = function (evt) {
        var text = evt.split('.');
        var s = evt.lastIndexOf('.') - evt.indexOf('.');
        console.log(s);
        // if tow dot presnt and without space
        if (evt.indexOf('.') == evt.lastIndexOf('.') || s == 1) {
            this.invalidWebsite = true;
        }
        else {
            this.invalidWebsite = false;
        }
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], CompanyMasterComponent.prototype, "el");
    CompanyMasterComponent = __decorate([
        core_1.Component({
            selector: 'app-company-master',
            templateUrl: './company-master.component.html',
            styleUrls: ['./company-master.component.scss'],
            providers: [shorten_string_pipe_1.ShortenStringPipe]
        })
    ], CompanyMasterComponent);
    return CompanyMasterComponent;
}());
exports.CompanyMasterComponent = CompanyMasterComponent;
