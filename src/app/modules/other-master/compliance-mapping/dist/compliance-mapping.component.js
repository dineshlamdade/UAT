"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplianceMappingComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var ComplianceMappingComponent = /** @class */ (function () {
    function ComplianceMappingComponent(formBuilder, complianceHeadService, modalService, statuatoryComplianceService, establishmentMasterService, datePipe, complianceMasterService, alertService) {
        this.formBuilder = formBuilder;
        this.complianceHeadService = complianceHeadService;
        this.modalService = modalService;
        this.statuatoryComplianceService = statuatoryComplianceService;
        this.establishmentMasterService = establishmentMasterService;
        this.datePipe = datePipe;
        this.complianceMasterService = complianceMasterService;
        this.alertService = alertService;
        this.complianceHeadNameList = [];
        this.frequencyDropDownList = [];
        this.summaryHtmlDataListComplianceApplicability = [];
        this.showButtonSaveAndReset1 = true;
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.summaryHtmlDataList = [];
        this.complianceSDMMappingIdToDelete = 0;
        this.isSaveAndReset1 = true;
        this.deductionFrequencyList = [{ id: 1, itemName: 'Payroll' }, { id: 2, itemName: 'Statutory-Begin' }, { id: 3, itemName: ' Statutory-Last' }];
        this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object = [];
        this.institutionNameList = [];
        this.forQuarterly = [{ id: 1, itemName: 'Jan-Jun' }, { id: 2, itemName: 'Feb-Apr' }, { id: 3, itemName: 'Mar-May' }];
        this.forHalfYearly = [{ id: 1, itemName: 'Jan-Jun' }, { id: 2, itemName: 'Feb-Jul' }, { id: 3, itemName: 'Mar-Aug' }, { id: 1, itemName: 'Apr-Sep' }, { id: 2, itemName: 'May-Oct' }, { id: 3, itemName: 'Jun-Nov' }];
    }
    ComplianceMappingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
        this.complianceApplicationForm = this.formBuilder.group({
            complianceMasterId: new forms_1.FormControl('', forms_1.Validators.required),
            complianceApplicabilitySDMId: new forms_1.FormControl('', forms_1.Validators.required),
            statutoryFrequency: new forms_1.FormControl('', forms_1.Validators.required),
            incomePeriod: new forms_1.FormControl('', forms_1.Validators.required),
            statutoryFreqPeriodsDef: new forms_1.FormControl('', forms_1.Validators.required),
            deductionFrequency: new forms_1.FormControl('', forms_1.Validators.required),
            complianceHeadName: new forms_1.FormControl({ value: '', disabled: true })
        });
        this.complianceHeadService.getComplianceHeadDetails().subscribe(function (res) {
            console.log(res.data.results);
            _this.complianceHeadDetailsObject = res.data.results;
            res.data.results.forEach(function (element) {
                _this.complianceHeadNameList.push(element.complianceHeadName);
                _this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
            }, function (err) {
            }, function () { });
        });
        this.complianceMasterService.getFrequencyMaster().subscribe(function (res) {
            console.log('frequency list respon', res);
            res.data.results.forEach(function (element) {
                _this.frequencyDropDownList.push({ id: element.id, itemName: element.name });
            }, function (err) {
            }, function () { });
        });
        setTimeout(function () {
            _this.refreshHtmlTableDataOfComplianceApplicability();
            _this.getDropDownValuesForComplianceStatutoryFrequencyFromSDM();
            _this.getDropDownValuesForApplicabilityCompliance();
            _this.getInstitutionMaster();
        }, 1000);
    };
    ComplianceMappingComponent.prototype.cancelViewComplianceApplicability = function () {
        this.complianceApplicationForm.reset();
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.isSaveAndReset1 = true;
        this.complianceSDMMappingIdToDelete = 0;
        this.complianceApplicationForm.patchValue({
            complianceMasterId: '',
            // tslint:disable-next-line: object-literal-sort-keys
            complianceApplicabilitySDMId: '',
            statutoryFrequencySDMId: '',
            deductionFrequency: '',
            complianceHeadName: '',
            statutoryFrequency: '',
            statutoryFreqPeriodsDef: ''
        });
        this.complianceApplicationForm.get('complianceHeadName').disable();
    };
    ComplianceMappingComponent.prototype.saveComplianceApplication = function () {
        var _this = this;
        if (this.complianceSDMMappingIdToDelete > 0) {
            var data = this.complianceApplicationForm.getRawValue();
            data.complianceSDMMappingId = this.complianceSDMMappingIdToDelete;
            console.log('raw data', data);
            delete data.complianceHeadName;
            console.log(JSON.stringify(data));
            this.complianceMasterService.putComplianceApplicability(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Compliance Applicability Updated Successfully.', '');
                    _this.complianceApplicationForm.reset();
                    _this.refreshHtmlTableDataOfComplianceApplicability();
                    _this.resetComplianceApplicability();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
        else {
            var data = this.complianceApplicationForm.getRawValue();
            delete data.complianceHeadName;
            console.log('raw data', data);
            console.log(JSON.stringify(data));
            this.complianceMasterService.postComplianceApplicability(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Compliance Applicability Saved Successfully.', '');
                    _this.complianceApplicationForm.reset();
                    _this.refreshHtmlTableDataOfComplianceApplicability();
                    _this.resetComplianceApplicability();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                //this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    ComplianceMappingComponent.prototype.refreshHtmlTableDataOfComplianceApplicability = function () {
        var _this = this;
        this.summaryHtmlDataListComplianceApplicability = [];
        this.complianceMasterService.getComplianceMasterSDMMapping().subscribe(function (res) {
            console.log('res', res);
            var i = 1;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    complianceSDMMappingId: element.complianceSDMMappingId,
                    complianceMasterId: element.complianceMasterId,
                    complianceApplicabilitySDMId: element.complianceApplicabilitySDMId,
                    statutoryFrequency: element.statutoryFrequency,
                    statutoryFreqPeriodsDef: element.statutoryFreqPeriodsDef,
                    deductionFrequency: element.deductionFrequency,
                    incomePeriod: element.incomePeriod
                };
                _this.summaryHtmlDataListComplianceApplicability.push(obj);
            });
        });
        console.log(this.summaryHtmlDataListComplianceApplicability);
    };
    ComplianceMappingComponent.prototype.resetComplianceApplicability = function () {
        this.complianceApplicationForm.reset();
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.isSaveAndReset1 = true;
        this.showButtonSaveAndReset1 = true;
        this.complianceSDMMappingIdToDelete = 0;
        this.complianceApplicationForm.patchValue({
            complianceMasterId: '',
            // tslint:disable-next-line: object-literal-sort-keys
            complianceApplicabilitySDMId: '',
            statutoryFrequencySDMId: '',
            deductionFrequency: ''
        });
        // this.isSaveAndReset1 = false;
    };
    // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/applicability compliance/
    ComplianceMappingComponent.prototype.getDropDownValuesForApplicabilityCompliance = function () {
        var _this = this;
        this.complianceApplicabilitySDMIdDropDownList = [];
        // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/complianceApplicabilitySDMId/
        //  let abc = 'complianceApplicabilitySDMId/';
        this.complianceMasterService.getDropDownValuesByApplicationModuleName_FieldName('complianceApplicabilitySDMId/').subscribe(function (res) {
            console.log('complianceApplicabilitySDMId sdm', res);
            //let i = 1;
            // complianceApplicabilitySDMId: 2
            // complianceMasterId: 1
            // complianceSDMMappingId: 1
            // createDateTime: "2021-02-11T05:48:45.607+00:00"
            // createdBy: "PaysquareDefault"
            // deductionFrequency: "MONTHLY"
            // incomePeriod: "0"
            // isActive: 1
            // lastModifiedBy: null
            // lastModifiedDateTime: "2021-02-11T05:48:45.607+00:00"
            // statutoryFreqPeriodsDef: "MAR-MAY"
            // statutoryFrequencySDMId: 3
            res.data.results.forEach(function (element) {
                var obj = {
                    applicationModuleId: element.applicationModuleId,
                    fieldName: element.fieldName,
                    sdmDerivedMappingId: element.sdmDerivedMappingId,
                    sdmDerivedModuleMappingId: element.sdmDerivedModuleMappingId,
                    sourcePeriod: element.sdmMaster.sourcePeriod,
                    sdmMasterId: element.sdmMaster.sdmMasterId,
                    sdmName: element.sdmMaster.sdmName
                };
                _this.complianceApplicabilitySDMIdDropDownList.push(obj);
            });
        });
        // console.log(this.summaryHtmlDataListComplianceApplicability);
    };
    // compliance/statutory frequency/
    // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/statutoryFrequencySDMId/
    ComplianceMappingComponent.prototype.getDropDownValuesForComplianceStatutoryFrequencyFromSDM = function () {
        var _this = this;
        this.statutoryFrequencySDMIdDropDownList = [];
        this.complianceMasterService.getDropDownValuesByApplicationModuleName_FieldName('statutoryFrequencySDMId/').subscribe(function (res) {
            console.log('statutoryFrequencySDMId sdm', res);
            res.data.results.forEach(function (element) {
                var obj = {
                    applicationModuleId: element.applicationModuleId,
                    fieldName: element.fieldName,
                    sdmDerivedMappingId: element.sdmDerivedMappingId,
                    sdmDerivedModuleMappingId: element.sdmDerivedModuleMappingId,
                    sourcePeriod: element.sdmMaster.sourcePeriod,
                    sdmMasterId: element.sdmMaster.sdmMasterId,
                    sdmName: element.sdmMaster.sdmName
                };
                _this.statutoryFrequencySDMIdDropDownList.push(obj);
            });
        });
    };
    ComplianceMappingComponent.prototype.getInstitutionMaster = function () {
        var _this = this;
        console.log('getInstitutionMaster');
        this.institutionMasterList = [];
        this.complianceHeadNameList = [];
        this.institutionMasterObject = [];
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.getComplianceInstitutionMasterGridListObject = {};
        this.complianceHeadDetailsObject = {};
        rxjs_1.combineLatest([this.complianceHeadService.getComplianceHeadDetails(), this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails(), this.complianceMasterService.getComplianceMasterDetails()]).subscribe(function (res) {
            console.log(res[0]);
            console.log(res[1]);
            _this.getComplianceHeadDetailsObject = res[0];
            _this.getComplianceInstituionMasterDetails = res[1];
            _this.complianceHeadDetailsObject = res[0].data.results;
            _this.getComplianceInstitutionMasterGridListObject = res[1].data.results;
            res[1].data.results.forEach(function (element) {
                var getComplianceHeadObject = _this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.find(function (o) { return o.complianceHeadId == element.complianceHeadId; });
                _this.complianceHeadNameList.push(element.complianceHeadName);
                _this.institutionMasterObject.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
                var i = 1;
                _this.institutionNameList.push({ label: element.institutionName, value: element.complianceHeadId });
                var tempComplianceHeadObject = _this.complianceHeadDetailsObject.find(function (o) { return o.complianceHeadId == element.complianceHeadId; });
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
                    complianceHeadName: getComplianceHeadObject.complianceHeadName,
                    country1: getComplianceHeadObject.country,
                    complianceInstitutionMasterId: element.complianceInstitutionMasterId,
                    getComplianceHeadObject: getComplianceHeadObject,
                    complianceDetailObject: tempComplianceHeadObject
                };
                _this.institutionMasterList.push(obj);
            });
            var srNo = 1;
            res[2].data.results.forEach(function (element) {
                // if (element.isActive == 0) {
                // soft deleted record
                // } else {
                _this.masterGridDataList.push(element);
                var filteredEvents = _this.institutionMasterList.filter(function (event) {
                    return event.institutionName == element.statutoryInstituteName;
                });
                var tempObjEstablishmentAddress = _this.establishmentDetailsMasterList.find(function (o) { return o.establishmentMasterId == element.establishmentMasterId; });
                console.log('tempObjEstablishmentAddress', tempObjEstablishmentAddress);
                var obj = {
                    SrNo: srNo++,
                    complianceName: element.complianceName,
                    statutoryInstituteName: element.statutoryInstituteName,
                    // complianceHeadName: filteredEvents[0].complianceDetailObject.complianceHeadName,
                    complianceHeadShortName: element.complianceHeadShortName,
                    accountNumber: element.accountNumber,
                    establishmentCode: tempObjEstablishmentAddress.establishmentCode,
                    establishmentMasterId: element.establishmentMasterId,
                    registrationNumber: element.registrationNumber,
                    complianceMasterId: element.complianceMasterId,
                    groupCompanyId: element.groupCompanyId,
                    issueDate: element.issueDate,
                    coverageDate: element.coverageDate,
                    userNameForWebsite: element.userNameForWebsite,
                    filter: filteredEvents[0],
                    isActive: element.isActive
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
    };
    ComplianceMappingComponent.prototype.getInstitutionMasterOld = function () {
        var _this = this;
        console.log('getInstitutionMaster');
        this.institutionMasterList = [];
        this.complianceHeadNameList = [];
        this.institutionMasterObject = [];
        //  this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.getComplianceInstitutionMasterGridListObject = {};
        this.complianceHeadDetailsObject = {};
        rxjs_1.combineLatest([this.complianceHeadService.getComplianceHeadDetails(), this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails(), this.complianceMasterService.getComplianceMasterDetails()]).subscribe(function (res) {
            console.log('getComplianceHeadDetails', res[0]);
            console.log('getCompliaceInstitutionMasterDetails', res[1]);
            console.log('getComplianceMasterDetails', res[2]);
        });
        this.complianceMasterService.getComplianceMasterDetails().subscribe(function (res) {
            res.data.results.forEach(function (element) {
                var obj = {
                    complianceName: element.complianceName,
                    statutoryInstituteName: element.statutoryInstituteName,
                    complianceHeadShortName: element.complianceHeadShortName,
                    accountNumber: element.accountNumber,
                    establishmentMasterId: element.establishmentMasterId,
                    registrationNumber: element.registrationNumber,
                    complianceMasterId: element.complianceMasterId,
                    groupCompanyId: element.groupCompanyId,
                    issueDate: element.issueDate,
                    coverageDate: element.coverageDate,
                    userNameForWebsite: element.userNameForWebsite,
                    isActive: element.isActive
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
    };
    ComplianceMappingComponent.prototype.editMasterComplinaceApplicability = function (i, complianceSDMMappingId, complianceMasterId) {
        var _this = this;
        window.scrollTo(0, 0);
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
        this.isSaveAndReset1 = false;
        // this.isSaveAndReset1 = true;
        // this.showButtonSaveAndReset = false;
        this.complianceApplicationForm.reset();
        this.complianceApplicationForm.patchValue(this.summaryHtmlDataListComplianceApplicability[i]);
        var index = this.summaryHtmlDataList.findIndex(function (o) { return o.complianceMasterId == _this.summaryHtmlDataListComplianceApplicability[i].complianceMasterId; });
        console.log(index);
        this.complianceApplicationForm.patchValue({
            complianceHeadName: this.summaryHtmlDataList[index].filter.complianceDetailObject.complianceHeadName
        });
    };
    ComplianceMappingComponent.prototype.viewMasterComplianceApplicability = function (i, complianceSDMMappingId, complianceMasterId) {
        var _this = this;
        window.scrollTo(0, 0);
        this.complianceSDMMappingIdToDelete = 0;
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
        this.isSaveAndReset1 = false;
        // this.isSaveAndReset1 = true;
        // this.showButtonSaveAndReset = false;
        this.complianceApplicationForm.reset();
        this.complianceApplicationForm.patchValue(this.summaryHtmlDataListComplianceApplicability[i]);
        var index = this.summaryHtmlDataList.findIndex(function (o) { return o.complianceMasterId == _this.summaryHtmlDataListComplianceApplicability[i].complianceMasterId; });
        console.log(index);
        this.complianceApplicationForm.patchValue({
            complianceHeadName: this.summaryHtmlDataList[index].filter.complianceDetailObject.complianceHeadName
        });
        this.form.disable();
    };
    ComplianceMappingComponent.prototype.ConfirmationDialog = function (confirmdialog, i, complianceSDMMappingId, complianceMasterId) {
        this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
        this.modalRef = this.modalService.show(confirmdialog, Object.assign({}, { "class": 'gray modal-md' }));
    };
    ComplianceMappingComponent.prototype.clickedOnYes = function () {
        var _this = this;
        console.log('yes');
        this.complianceMasterService.deleteComplianceApplicability(this.complianceSDMMappingIdToDelete).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () {
            _this.refreshHtmlTableDataOfComplianceApplicability();
        });
    };
    ComplianceMappingComponent.prototype.onChangeStatutoryFrequency = function (evt) {
        console.log('summaryHtmlDataList', this.summaryHtmlDataList);
        console.log(evt);
        if (evt == 'Half-Yearly') {
            console.log('in half yearly');
            this.statutoryFreqPeriodsDefList = [];
            this.statutoryFreqPeriodsDefList = this.forHalfYearly;
        }
        else if (evt == 'Quarterly') {
            console.log('in Quarterly');
            this.statutoryFreqPeriodsDefList = [];
            this.statutoryFreqPeriodsDefList = this.forQuarterly;
        }
        else {
            this.statutoryFreqPeriodsDefList = [{ id: 0, itemName: 'dummy' }];
        }
    };
    ComplianceMappingComponent.prototype.onChangeComplianceMaster = function (complianceMasterId) {
        if (complianceMasterId == '') {
            this.complianceApplicationForm.patchValue({
                complianceHeadName: ''
            });
        }
        else {
            console.log(this.summaryHtmlDataList);
            var index = this.summaryHtmlDataList.findIndex(function (o) { return o.complianceMasterId == complianceMasterId; });
            console.log(index);
            this.complianceApplicationForm.patchValue({
                complianceHeadName: this.summaryHtmlDataList[index].filter.complianceDetailObject.complianceHeadName
            });
        }
    };
    ComplianceMappingComponent.prototype.getEstablishmentMasterDetailsAndRefreshHtmlTable = function () {
        var _this = this;
        this.dropdownList = [];
        this.establishmentDetailsMasterList = [];
        this.establishmentDetailsmasterGridDataList = [];
        this.establishmentCodeAndId = [];
        this.establishmentMasterService.getEstablishmentMasterDetails().subscribe(function (res) {
            _this.establishmentDetailsmasterGridDataList = res.data.results;
            _this.dropdownList = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element) {
                _this.establishmentCodeAndId.push({ label: element.establishmentCode, value: element.establishmentMasterId });
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
                _this.establishmentDetailsMasterList.push(obj);
            });
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            // this.refreshHtmlTableData();
        });
    };
    ComplianceMappingComponent = __decorate([
        core_1.Component({
            selector: 'app-compliance-mapping',
            templateUrl: './compliance-mapping.component.html',
            styleUrls: ['./compliance-mapping.component.scss']
        })
    ], ComplianceMappingComponent);
    return ComplianceMappingComponent;
}());
exports.ComplianceMappingComponent = ComplianceMappingComponent;
