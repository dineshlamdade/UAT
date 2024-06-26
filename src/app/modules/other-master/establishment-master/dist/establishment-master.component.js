"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstablishmentMasterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EstablishmentMasterComponent = /** @class */ (function () {
    function EstablishmentMasterComponent(formBuilder, statuatoryComplianceService, establishmentMasterService, companyMasterService, alertService, datePipe) {
        this.formBuilder = formBuilder;
        this.statuatoryComplianceService = statuatoryComplianceService;
        this.establishmentMasterService = establishmentMasterService;
        this.companyMasterService = companyMasterService;
        this.alertService = alertService;
        this.datePipe = datePipe;
        this.form = forms_1.FormGroup;
        this.summaryHtmlDataList = [];
        this.issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
        this.primaryBusinessActivityList = ['Payroll', 'PayRoll', 'IT', 'HR1', '22'];
        this.officePremisesOwnershipList = ['Owned', 'Rent', 'Lease'];
        this.showButtonSaveAndReset = true;
        this.registrationNumberList = [];
        this.companyRegistrationIdList = [];
        this.companyRegistrationMasterList = [];
        this.masterGridDataList = [];
        this.companyRegistrationId = 0;
        this.companyMasterId = 0;
        this.isSaveAndReset = true;
        this.countries = [];
        this.establishmentMasterId = 0;
        this.regionMasterDetails = [];
        this.typeOfEstablishmentList = [];
        this.today = new Date();
        this.form = this.formBuilder.group({
            establishmentCode: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            typeOfEstablishment: new forms_1.FormControl('', forms_1.Validators.required),
            primaryBusinessActivity: new forms_1.FormControl('', forms_1.Validators.required),
            dateOfSetup: new forms_1.FormControl(''),
            officePremisesOwnership: new forms_1.FormControl(''),
            regionMasterId: new forms_1.FormControl('', forms_1.Validators.required),
            gstNumber: new forms_1.FormControl(''),
            gstIssueDate: new forms_1.FormControl(''),
            linNumber: new forms_1.FormControl(''),
            linIssueDate: new forms_1.FormControl(''),
            stpi: new forms_1.FormControl(''),
            stpiIssueDate: new forms_1.FormControl(''),
            address1: new forms_1.FormControl('', forms_1.Validators.required),
            address2: new forms_1.FormControl(''),
            address3: new forms_1.FormControl(''),
            country: new forms_1.FormControl('', forms_1.Validators.required),
            pinCode: new forms_1.FormControl('', forms_1.Validators.required),
            state: new forms_1.FormControl(''),
            city: new forms_1.FormControl(''),
            village: new forms_1.FormControl('')
        });
    }
    EstablishmentMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyMasterService.getTypeOfEstablishment().subscribe(function (res) {
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.typeOfEstablishmentList.push(obj);
            });
        });
        this.statuatoryComplianceService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        });
        // get Region dropdown data
        this.establishmentMasterService.getRegionMasterDetails().subscribe(function (res) {
            res.data.results.forEach(function (element, index) {
                if (element.isActive == 1) {
                    _this.regionMasterDetails.push({ masterCode: element.masterCode, masterId: element.masterId });
                    if (index == 0) {
                        // this.form.controls["regionMasterId"].setValidators(Validators.required);
                        // this.form.controls["regionMasterId"].updateValueAndValidity();
                        console.log('index is 0');
                    }
                }
            });
        });
        this.refreshHtmlTableData();
    };
    EstablishmentMasterComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.establishmentMasterService.getEstablishmentMasterDetails().subscribe(function (res) {
            _this.masterGridDataList = res.data.results;
            console.log(_this.masterGridDataList);
            var i = 1;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    establishmentMasterId: element.establishmentMasterId,
                    establishmentCode: element.establishmentCode,
                    description: element.description,
                    regionMasterId: element.regionMasterId,
                    typeOfEstablishment: element.typeOfEstablishment,
                    primaryBusinessActivity: element.primaryBusinessActivity,
                    address1: element.address1,
                    address2: element.address2,
                    address3: element.address3,
                    pinCode: element.pinCode,
                    country: element.country,
                    state: element.state,
                    city: element.city,
                    village: element.village,
                    dateOfSetup: element.dateOfSetup,
                    officePremisesOwnership: element.officePremisesOwnership,
                    linNumber: element.linNumber,
                    linIssueDate: element.linIssueDate,
                    gstNumber: element.gstNumber,
                    gstIssueDate: element.gstIssueDate,
                    stpi: element.stpi,
                    stpiIssueDate: element.stpiIssueDate
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
        this.establishmentMasterService.getEstablishmentMasterDetails().subscribe(function (res) {
            console.log(res);
        });
    };
    EstablishmentMasterComponent.prototype.save = function () {
        var _this = this;
        if (this.establishmentMasterId > 0) {
            console.log('in update');
            var data = this.form.getRawValue();
            data.groupCompanyId = 1;
            var gstIssueDate = this.datePipe.transform(this.form.get('gstIssueDate').value, 'dd-MMM-yyyy');
            var linIssueDate = this.datePipe.transform(this.form.get('linIssueDate').value, 'dd-MMM-yyyy');
            var stpiIssueDate = this.datePipe.transform(this.form.get('stpiIssueDate').value, 'dd-MMM-yyyy');
            var dateOfSetup = this.datePipe.transform(this.form.get('dateOfSetup').value, 'dd-MMM-yyyy');
            data.gstIssueDate = gstIssueDate;
            data.linIssueDate = linIssueDate;
            data.stpiIssueDate = stpiIssueDate;
            data.dateOfSetup = dateOfSetup;
            data.regionMasterId = this.selectedRegionMasterCode;
            data.establishmentMasterId = this.establishmentMasterId;
            delete data.officialCountryCode;
            console.log(JSON.stringify(data));
            this.establishmentMasterService.putEstablishmentMaster(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Establishment Master Details Updated Successfully.', '');
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.establishmentMasterId = 0;
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
            var data = this.form.getRawValue();
            // groupComapnyId is hard coded
            data.groupCompanyId = 1;
            var gstIssueDate = this.datePipe.transform(this.form.get('gstIssueDate').value, 'dd-MMM-yyyy');
            var linIssueDate = this.datePipe.transform(this.form.get('linIssueDate').value, 'dd-MMM-yyyy');
            var stpiIssueDate = this.datePipe.transform(this.form.get('stpiIssueDate').value, 'dd-MMM-yyyy');
            var dateOfSetup = this.datePipe.transform(this.form.get('dateOfSetup').value, 'dd-MMM-yyyy');
            data.gstIssueDate = gstIssueDate;
            data.linIssueDate = linIssueDate;
            data.stpiIssueDate = stpiIssueDate;
            data.dateOfSetup = dateOfSetup;
            data.regionMasterId = this.selectedRegionMasterCode;
            delete data.officialCountryCode;
            this.establishmentMasterService.postEstablishmentMaster(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Establishment Master Details Saved Successfully.', '');
                    _this.form.reset();
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
    };
    EstablishmentMasterComponent.prototype.onBsValueChangeDateOfIncorporation = function () { };
    EstablishmentMasterComponent.prototype.onSelectCompanyRegistrationId = function (evt) {
        var _this = this;
        var temp = this.tempObjForCompanyRegistration.find(function (o) { return o.code == _this.form.get('regionMasterId').value; });
        this.companyMasterId = temp.companyMasterId;
        //  this.selectedRegionMasterCode = temp.masterId;
        console.log(temp.companyMasterId);
        this.companyMasterId = temp.companyMasterId;
    };
    EstablishmentMasterComponent.prototype.onSelectIssuedBy = function () { };
    EstablishmentMasterComponent.prototype.editMaster = function (i, establishmentMasterId) {
        window.scrollTo(0, 0);
        this.isSaveAndReset = false;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.establishmentMasterId = establishmentMasterId;
        this.form.patchValue(this.masterGridDataList[i]);
        this.form.enable();
        this.form.get('regionMasterId').disable();
    };
    EstablishmentMasterComponent.prototype.viewMaster = function (i) {
        window.scrollTo(0, 0);
        this.isSaveAndReset = false;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.form.patchValue(this.masterGridDataList[i]);
        this.form.disable();
    };
    EstablishmentMasterComponent.prototype.cancelView = function () {
        this.form.reset();
        this.establishmentMasterId = 0;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.showButtonSaveAndReset = true;
        this.companyRegistrationId = 0; // for save it should be 0 and update it should have any integer value
        this.saveFormValidation();
    };
    EstablishmentMasterComponent.prototype.saveFormValidation = function () {
        this.form.patchValue({
            establishmentCode: '',
            description: '',
            typeOfEstablishment: '',
            primaryBusinessActivity: '',
            dateOfSetup: '',
            officePremisesOwnership: '',
            regionMasterId: '',
            gstNumber: '',
            gstIssueDate: '',
            linNumber: '',
            linIssueDate: '',
            stpi: '',
            stpiIssueDate: '',
            address1: '',
            address2: '',
            address3: '',
            country: '',
            pinCode: '',
            state: '',
            city: '',
            village: ''
        });
        this.form.get('state').disable();
        this.form.get('city').disable();
    };
    EstablishmentMasterComponent.prototype.checkLocalAddress = function () { };
    EstablishmentMasterComponent.prototype.onSelectPrimaryBusinessActivity = function (evt) { };
    EstablishmentMasterComponent.prototype.getPermanentAddressFromPIN = function () {
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
                // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    EstablishmentMasterComponent.prototype.onSelectTypeOfEstablishment = function (evt) { };
    EstablishmentMasterComponent.prototype.onBsValueChangeDateOfSetup = function () { };
    EstablishmentMasterComponent.prototype.onSelectOfficePremisesOwnership = function (evt) { };
    EstablishmentMasterComponent.prototype.onBsValueChangeDateOfGstIssueDate = function () { };
    EstablishmentMasterComponent.prototype.onBsValueChangeLinIssueDate = function () { };
    EstablishmentMasterComponent.prototype.onBsValueChangeStpiIssueDate = function () { };
    EstablishmentMasterComponent.prototype.onSelectRegionMasterId = function (evt) {
        var _this = this;
        console.log(evt);
        this.selectedRegionMasterCode = evt;
        var tempObj = this.regionMasterDetails.find(function (o) { return o.masterCode == _this.form.get('regionMasterId').value.trim(); });
        console.log(tempObj);
    };
    EstablishmentMasterComponent.prototype.keyPress = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    EstablishmentMasterComponent = __decorate([
        core_1.Component({
            selector: 'app-establishment-master',
            templateUrl: './establishment-master.component.html',
            styleUrls: ['./establishment-master.component.scss']
        })
    ], EstablishmentMasterComponent);
    return EstablishmentMasterComponent;
}());
exports.EstablishmentMasterComponent = EstablishmentMasterComponent;
