"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplianceMasterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var ComplianceMasterComponent = /** @class */ (function () {
    function ComplianceMasterComponent(formBuilder, complianceHeadService, modalService, statuatoryComplianceService, establishmentMasterService, datePipe, complianceMasterService, alertService) {
        this.formBuilder = formBuilder;
        this.complianceHeadService = complianceHeadService;
        this.modalService = modalService;
        this.statuatoryComplianceService = statuatoryComplianceService;
        this.establishmentMasterService = establishmentMasterService;
        this.datePipe = datePipe;
        this.complianceMasterService = complianceMasterService;
        this.alertService = alertService;
        this.basicDABelowWageCellingList = [{ id: 1, itemName: 'All Heads' }, { id: 2, itemName: 'Wage Celling' }, { id: 3, itemName: 'Immediate Wage Celling' }];
        this.basicDAAboveWageCellingList = [{ id: 1, itemName: 'All Heads' }, { id: 2, itemName: 'Basic DA' }];
        this.companySpecialRateApplicableList = [{ id: 1, itemName: 'Organization Level' }, { id: 2, itemName: 'Employee Level' }];
        this.employeeSpecialRateApplicableList = [{ id: 1, itemName: 'Organization Level' }, { id: 2, itemName: 'Employee Level' }];
        this.companySpecialRateApplicableList1 = [{ id: 1, itemName: 'Organization Level' }, { id: 2, itemName: 'Employee Level' }];
        // public companySpecialRateApplicableList = [{ id: 1, itemName: 'All Heads' }, { id: 2, itemName: 'Wage Celling' }];
        this.industryTypeList = [{ id: 1, itemName: 'Brick' }, { id: 2, itemName: 'Bidi' }, { id: 3, itemName: 'Jute' }, { id: 4, itemName: 'Guar Gum' }, { id: 5, itemName: 'Coir' }, { id: 6, itemName: 'Other' }];
        this.complianceSDMMappingIdToDelete = 0;
        this.complianceApplicabilitySDMIdDropDownList = [];
        this.statutoryFrequencySDMIdDropDownList = [];
        this.form = forms_1.FormGroup;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        this.selectedEstablishmentMasterId = [];
        this.isView = false;
        this.isGlobalView = false;
        this.statutoryFreqPeriodsDefList = [{ id: 1, itemName: 'Jan-Mar' }, { id: 2, itemName: 'Feb-May' }, { id: 3, itemName: 'Mar-June' }];
        this.deductionFrequencyList = [{ id: 1, itemName: 'Payroll' }, { id: 2, itemName: 'Statutory-Begin' }, { id: 3, itemName: ' Statutory-Last' }];
        // statutoryFreqPeriodsDefList = [{ id: 1, name: 'MAR-MAY' }];
        //deductionFrequencyList = [{ id: 1, name: "MONTHLY" }, { id: 2, name: "WEEKLY" }];
        this.complianceApplicationForm = forms_1.FormGroup;
        this.isPf = false;
        this.isPfNew = false;
        this.isEpsNew = false;
        this.isEps = false;
        this.isEsi = false;
        this.isPt = false; // Professional Tax
        this.isLw = false; // Labour Welfare
        this.isTaxDeductedAtSource = false;
        this.isGratuity = false;
        this.isSa = false; // Super Annuation
        this.ServicesList = [];
        this.isEditableEstablismentMasterId = false;
        this.defaultEmployeeContributionList = [];
        this.companyContributionList = [];
        this.allOtherMappingDetailsList = [];
        this.savedEstablishmentList = [];
        this.isRestrictedDisableMultiSelect = false;
        this.editedRecordIndex = 0;
        this.summaryHtmlDataListComplianceApplicability = [];
        this.masterGridDataListComplianceAppicability = [];
        this.summaryHtmlDataList = [];
        this.institutionMasterList = [];
        this.issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
        this.primaryBusinessActivityList = ['Payroll', 'PayRoll', 'IT', 'HR1', '22'];
        this.officePremisesOwnershipList = ['Owned', 'RENT', 'Lease'];
        this.showButtonSaveAndReset = true;
        this.showButtonSaveAndReset1 = true;
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.masterGridDataList = [];
        this.companyMasterId = 0;
        this.isSaveAndReset = true;
        this.isSaveAndReset1 = true;
        this.countries = [];
        this.establishmentMasterId = 0;
        this.regionMasterDetails = [];
        this.cityList = [];
        this.institutionMasterObject = [];
        this.institutionNameList = [];
        this.pfStatusList = ['Exempt', 'Unexempt'];
        this.isDefaultContribution = true;
        this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
        this.companyIdList = [{ id: 1, itemName: 'WhiteHedge' }];
        this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object = [];
        this.complianceHeadNameList = [];
        this.establishmentDetailsMasterList = [];
        this.establishmentDetailsmasterGridDataList = [];
        this.establishmentCodeAndId = [];
        this.getAllOtherMasterDetailsResponse = [];
        this.dropdownList = [];
        this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
        this.dropdownList2 = [];
        this.states = [];
        this.tempGetAllOtherMastersMappingDetails = [];
        this.isEditMode = false;
        this.form = this.formBuilder.group({
            pfFormArray: new forms_1.FormArray([]),
            'epsArray': new forms_1.FormArray([]),
            esiArray: new forms_1.FormArray([]),
            ptArray: new forms_1.FormArray([]),
            lwfArray: new forms_1.FormArray([]),
            tdsArray: new forms_1.FormArray([]),
            gratuityArray: new forms_1.FormArray([]),
            saArray: new forms_1.FormArray([]),
            complianceName: new forms_1.FormControl(''),
            statutoryInstituteName: new forms_1.FormControl(''),
            accountNumber: new forms_1.FormControl(''),
            registrationNumber: new forms_1.FormControl(''),
            complianceHeadName: new forms_1.FormControl({ value: null, disabled: true }),
            shortName: new forms_1.FormControl({ value: null, disabled: true }),
            groupCompanyId: new forms_1.FormControl(''),
            administratedBy: new forms_1.FormControl('', forms_1.Validators.required),
            // establishmentCode: new FormControl(''),
            issueDate: new forms_1.FormControl(''),
            coverageDate: new forms_1.FormControl(''),
            userNameForWebsite: new forms_1.FormControl(''),
            establishmentMasterId: new forms_1.FormControl('', forms_1.Validators.required),
            city: new forms_1.FormControl({ value: null, disabled: true }),
            esic1: new forms_1.FormControl(''),
            esic1FromDate: new forms_1.FormControl(''),
            esic1ToDate: new forms_1.FormControl(''),
            eps1: new forms_1.FormControl(''),
            eps1FromDate: new forms_1.FormControl(''),
            eps1ToDate: new forms_1.FormControl(''),
            gratuityDividingFactor: new forms_1.FormControl(''),
            gratuityFromDate: new forms_1.FormControl(''),
            gratuityToDate: new forms_1.FormControl(''),
            saMaxPercentage: new forms_1.FormControl(''),
            saFromDate: new forms_1.FormControl(''),
            saToDate: new forms_1.FormControl(''),
            ptState: new forms_1.FormControl(''),
            ptCity: new forms_1.FormControl(''),
            lwfState: new forms_1.FormControl(''),
            tan: new forms_1.FormControl(''),
            tdsCircle: new forms_1.FormControl(''),
            deductorStatus: new forms_1.FormControl(''),
            pfStatus: new forms_1.FormControl(''),
            pfNilOptionChoice: new forms_1.FormControl('0'),
            employeeCompanyContributionDiff: new forms_1.FormControl('0'),
            edliExemption: new forms_1.FormControl('0'),
            contributionMethodChoice: new forms_1.FormControl('0'),
            specialRateApplicableEMPCount: new forms_1.FormControl(''),
            specialRateEMPCountPercent: new forms_1.FormControl(''),
            specialRateApplicableCompCount: new forms_1.FormControl(''),
            specialRateCompCountPercent: new forms_1.FormControl(''),
            industryType: new forms_1.FormControl('Other'),
            // check DA Or PF
            basicDABelowWageCelling: new forms_1.FormControl(''),
            basicDAAboveWageCelling: new forms_1.FormControl(''),
            companyContribution: new forms_1.FormControl({ value: null, disabled: true }),
            employeeContribution: new forms_1.FormControl(''),
            companyContribtionMultiSelect: new forms_1.FormControl(''),
            employeeContribtionMultiSelect: new forms_1.FormControl(''),
            companyFromDate: new forms_1.FormControl(''),
            companyToDate: new forms_1.FormControl('31-Dec-9999'),
            employeeFromDate: new forms_1.FormControl(''),
            employeeToDate: new forms_1.FormControl('31-Dec-9999')
        });
        this.complianceApplicationForm = this.formBuilder.group({
            complianceMasterId: new forms_1.FormControl('', forms_1.Validators.required),
            // jobMasterType: new FormControl(''),
            // allOtherMasterMappingDetails: new FormControl(''),
            complianceApplicabilitySDMId: new forms_1.FormControl('', forms_1.Validators.required),
            statutoryFrequencySDMId: new forms_1.FormControl('', forms_1.Validators.required),
            incomePeriod: new forms_1.FormControl('', forms_1.Validators.required),
            statutoryFreqPeriodsDef: new forms_1.FormControl('', forms_1.Validators.required),
            deductionFrequency: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.form.get('employeeCompanyContributionDiff').disable();
    }
    ComplianceMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getDropDownValuesForApplicabilityCompliance();
        this.getDropDownValuesForComplianceStatutoryFrequencyFromSDM();
        // this.refreshHtmlTableDataOfComplianceApplicability();
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'establishmentMasterId',
            textField: 'establishmentCode',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.dropdownSettingsForPF = {
            singleSelection: false,
            idField: 'id',
            textField: 'itemName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.dropdownSettingsAllOtherMasterMappingDetails = {
            singleSelection: false,
            idField: 'masterMappingId',
            textField: 'masterCode',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.complianceHeadService.getComplianceHeadDetails().subscribe(function (res) {
            console.log(res.data.results);
            _this.complianceHeadDetailsObject = res.data.results;
            res.data.results.forEach(function (element) {
                _this.complianceHeadNameList.push(element.complianceHeadName);
                _this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
            });
        });
        this.statuatoryComplianceService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        });
        this.complianceMasterService.getStates().subscribe(function (res) {
            _this.states = res.data.results;
        });
        this.complianceMasterService.getAllOtherMastersMappingDetails().subscribe(function (res) {
            _this.getAllOtherMastersMappingDetailsResponse = res.data.results;
        });
        // get Region dropdown data
        this.establishmentMasterService.getRegionMasterDetails().subscribe(function (res) {
            _this.regionMasterDetails = res.data.results;
        });
        this.complianceMasterService.getAllOtherMasterDetails().subscribe(function (res) {
            res.data.results.forEach(function (element) {
                var ele = _this.getAllOtherMasterDetailsResponse.findIndex(function (x) { return x.itemName == element.masterType; });
                // for checking if itemName is already exist, below code is used for uniqueness dropdown list of job master field/ job master types...
                if (ele < 0) {
                    _this.getAllOtherMasterDetailsResponse.push({ id: element.masterId, itemName: element.masterType });
                }
            });
        });
        this.getInstitutionMaster();
        this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
        this.refreshHtmlTableDataOfComplianceApplicability();
    }; // end of ngOnInit
    // refreshHtmlTableData() {
    //   this.summaryHtmlDataList = [];
    //   this.masterGridDataList = [];
    //   this.complianceMasterService.getComplianceMasterDetails().subscribe(res => {
    //     // below line is commented because if you soft delete the record it incluedes in it, it is problematic when we edit the record, it gives wrong editedRecordIndex
    //     //this.masterGridDataList = res.data.results;
    //     console.log(res.data.results);
    //     let srNo = 1;
    //     res.data.results.forEach(element => {
    //       // if (element.isActive == 0) {
    //         // soft deleted record
    //       // } else {
    //         this.masterGridDataList.push(element);
    //         var filteredEvents = this.institutionMasterList.filter(function (event) {
    //           return event.institutionName == element.statutoryInstituteName;
    //         });
    //         let establishmentNames: string;
    //         for (let i = 0; i < element.complianceDetail.length; i++) {
    //           if (i == 0) {
    //             let index = this.dropdownList.findIndex(o => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
    //             establishmentNames = this.dropdownList[index].establishmentCode;
    //           } else {
    //             establishmentNames += ', ';
    //             let index = this.dropdownList.findIndex(o => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
    //             establishmentNames += this.dropdownList[index].establishmentCode;
    //           }
    //         }
    //         let tempObjEstablishmentAddress = this.establishmentDetailsMasterList.find(o => o.establishmentMasterId == element.complianceDetail[0].establishmentMasterId);
    //         const obj = {
    //           SrNo: srNo++,
    //           complianceName: element.complianceName,
    //           statutoryInstituteName: element.statutoryInstituteName,
    //           complianceHeadShortName: element.complianceHeadShortName,
    //           accountNumber: element.accountNumber,
    //           establishmentCode: tempObjEstablishmentAddress.establishmentCode,
    //           registrationNumber: element.registrationNumber,
    //           complianceMasterId: element.complianceMasterId,
    //           tempObjEstablishmentAddress: tempObjEstablishmentAddress,
    //           groupCompanyId: element.groupCompanyId,
    //           issueDate: element.issueDate,
    //           coverageDate: element.coverageDate,
    //           userNameForWebsite: element.userNameForWebsite,
    //           filter: filteredEvents[0],
    //           establishmentNames: establishmentNames,
    //           isActive: element.isActive,
    //         };
    //         this.summaryHtmlDataList.push(obj);
    //     });
    //   });
    //   // console.log(this.summaryHtmlDataList);
    //   this.commonValidation();
    // }
    // save() {
    //   const data = this.form.getRawValue();
    //   console.log(data.specialRateApplicableCompCount);
    // }
    ComplianceMasterComponent.prototype.save = function () {
        var _this = this;
        var complianceDetails = [];
        var pfNilOptionChoiceOption = 'NO';
        var edliExemptionOption = 'NO';
        var contributionMethodChoiceOption = 'NO';
        var employeeCompanyContributionDiffOption = 'NO';
        var data = this.form.getRawValue();
        // delete data.jobMaster;
        //delete data.establishmentCode;
        delete data.groupCompanyId;
        data.groupCompanyId = 1;
        // for radio button
        if (data.pfNilOptionChoice == 1) {
            pfNilOptionChoiceOption = 'YES';
        }
        if (data.edliExemption == 1) {
            edliExemptionOption = 'YES';
        }
        if (data.contributionMethodChoice == 1) {
            contributionMethodChoiceOption = 'YES';
        }
        if (data.employeeCompanyContributionDiff == 1) {
            employeeCompanyContributionDiffOption = 'YES';
        }
        if (data.employeeCompanyContributionDiff == undefined) {
            employeeCompanyContributionDiffOption = 'NO';
        }
        data.pfNilOptionChoice = pfNilOptionChoiceOption;
        data.edliExemption = edliExemptionOption;
        data.contributionMethodChoice = contributionMethodChoiceOption;
        data.employeeCompanyContributionDiff = employeeCompanyContributionDiffOption;
        data.issueDate = this.datePipe.transform(this.form.get('issueDate').value, 'dd-MMM-yyyy');
        data.companyFromDate = this.datePipe.transform(this.form.get('companyFromDate').value, 'dd-MMM-yyyy');
        data.companyToDate = this.datePipe.transform(this.form.get('companyToDate').value, 'dd-MMM-yyyy');
        data.employeeFromDate = this.datePipe.transform(this.form.get('employeeFromDate').value, 'dd-MMM-yyyy');
        data.esic1FromDate = this.datePipe.transform(this.form.get('esic1FromDate').value, 'dd-MMM-yyyy');
        data.esic1ToDate = this.datePipe.transform(this.form.get('esic1ToDate').value, 'dd-MMM-yyyy');
        data.employeeToDate = this.datePipe.transform(this.form.get('employeeToDate').value, 'dd-MMM-yyyy');
        data.coverageDate = this.datePipe.transform(this.form.get('coverageDate').value, 'dd-MMM-yyyy');
        data.gratuityFromDate = this.datePipe.transform(this.form.get('gratuityFromDate').value, 'dd-MMM-yyyy');
        data.gratuityToDate = this.datePipe.transform(this.form.get('gratuityToDate').value, 'dd-MMM-yyyy');
        data.saFromDate = this.datePipe.transform(this.form.get('saFromDate').value, 'dd-MMM-yyyy');
        data.saToDate = this.datePipe.transform(this.form.get('saToDate').value, 'dd-MMM-yyyy');
        data.eps1FromDate = this.datePipe.transform(this.form.get('eps1FromDate').value, 'dd-MMM-yyyy');
        data.eps1ToDate = this.datePipe.transform(this.form.get('eps1ToDate').value, 'dd-MMM-yyyy');
        console.log(data);
        var selectedStringCompanyContributionList;
        var selectedStringEmployeeContributionList;
        for (var i = 0; i < this.companyContributionList.length; i++) {
            if (i == 0) {
                selectedStringCompanyContributionList = this.companyContributionList[i].itemName;
            }
            else {
                selectedStringCompanyContributionList += ',';
                selectedStringCompanyContributionList += this.companyContributionList[i].itemName;
            }
        }
        for (var i = 0; i < this.defaultEmployeeContributionList.length; i++) {
            if (i == 0) {
                selectedStringEmployeeContributionList = this.defaultEmployeeContributionList[i].itemName;
            }
            else {
                selectedStringEmployeeContributionList += ',';
                selectedStringEmployeeContributionList += this.defaultEmployeeContributionList[i].itemName;
            }
        }
        if (data.shortName === 'PF') {
            if (data.contributionMethodChoice == 'YES') {
                // for (let i = 0; i < this.ServicesList.length; i++) {
                complianceDetails.push({
                    // establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                    pfStatus: data.pfStatus,
                    pfNilOptionChoice: data.pfNilOptionChoice,
                    employeeCompanyContributionDiff: data.employeeCompanyContributionDiff,
                    edliExemption: data.edliExemption,
                    contributionMethodChoice: 'YES',
                    companyContribution: selectedStringCompanyContributionList,
                    companyFromDate: data.companyFromDate,
                    companyToDate: data.companyToDate,
                    employeeContribution: selectedStringEmployeeContributionList,
                    employeeFromDate: data.employeeFromDate,
                    employeeToDate: data.employeeToDate,
                    specialRateApplicableEMPCount: data.specialRateApplicableEMPCount,
                    specialRateApplicableCompCount: data.specialRateApplicableCompCount,
                    specialRateCompCountPercent: data.specialRateCompCountPercent,
                    specialRateEMPCountPercent: data.specialRateEMPCountPercent,
                    industryType: data.industryType
                });
            }
            else if (data.contributionMethodChoice == 'NO') {
                //   for (let i = 0; i < this.ServicesList.length; i++) {
                complianceDetails.push({
                    pfStatus: data.pfStatus,
                    pfNilOptionChoice: data.pfNilOptionChoice,
                    employeeCompanyContributionDiff: data.employeeCompanyContributionDiff,
                    edliExemption: data.edliExemption,
                    contributionMethodChoice: 'NO',
                    companyContribution: data.companyContribution,
                    companyFromDate: data.companyFromDate,
                    companyToDate: data.companyToDate,
                    employeeContribution: data.employeeContribution,
                    employeeFromDate: data.employeeFromDate,
                    employeeToDate: data.employeeToDate,
                    specialRateApplicableEMPCount: data.specialRateApplicableEMPCount,
                    specialRateApplicableCompCount: data.specialRateApplicableCompCount,
                    specialRateCompCountPercent: data.specialRateCompCountPercent,
                    specialRateEMPCountPercent: data.specialRateEMPCountPercent,
                    industryType: data.industryType
                });
            }
            else {
                console.log('error line no 427');
            }
        }
        if (data.shortName === 'EPS') {
            var index = this.summaryHtmlDataList.findIndex(function (o) { return o.complianceName === data.complianceName; });
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                //  establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                // complianceDetailId: this.summaryHtmlDataList[index].complianceDetailId,
                // complianceMasterId: this.summaryHtmlDataList[index].complianceMasterId,
                eps1: data.eps1,
                eps1FromDate: data.eps1FromDate,
                eps1ToDate: data.eps1ToDate
            });
        }
        if (data.shortName === 'PT') {
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                //   establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                ptState: data.ptState,
                ptCity: data.ptCity
            });
        }
        if (data.shortName === 'TDS') {
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                // establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                tan: data.tan,
                tdsCircle: data.tdsCircle,
                deductorStatus: data.deductorStatus
            });
        }
        if (data.shortName === 'ESIC') {
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                //  establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                esic1: data.esic1,
                esic1FromDate: data.esic1FromDate,
                esic1ToDate: data.esic1ToDate
            });
        }
        if (data.shortName === 'LWF') {
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                //   establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                lwfState: data.lwfState
            });
        }
        if (data.shortName === 'Gratuity') {
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                //   establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                gratuityDividingFactor: data.gratuityDividingFactor,
                gratuityFromDate: data.gratuityFromDate,
                gratuityToDate: data.gratuityToDate
            });
        }
        if (data.shortName === 'SA') {
            // for (let i = 0; i < this.ServicesList.length; i++) {
            complianceDetails.push({
                //  establishmentMasterId: this.ServicesList[i].establishmentMasterId,
                saMaxPercentage: data.saMaxPercentage,
                saFromDate: data.saFromDate,
                saToDate: data.saToDate
            });
        }
        if (data.shortName === 'S&E') {
            console.log('Not Avail');
        }
        if (data.shortName === 'Factories') {
            console.log('Not Avail');
        }
        if (data.shortName === 'BOCW') {
            console.log('Not Avail');
        }
        if (data.shortName === 'CLRA') {
            console.log('Not Avail');
        }
        if (data.shortName === 'EE') {
            console.log('Not Avail'); // Employment Exchanges
        }
        if (data.shortName === 'PWD') {
            console.log('Not Avail'); // Public works department
        }
        if (data.shortName === 'TAN') {
            console.log('Not Avail in master'); // Public works department
        }
        var tempObj = this.institutionMasterList.find(function (o) { return o.complianceHeadId == data.statutoryInstituteName; });
        console.log(tempObj);
        if (this.isEditMode == false) {
            var saveData = {
                complianceName: data.complianceName,
                statutoryInstituteName: tempObj.institutionName,
                complianceHeadShortName: data.shortName,
                establishmentMasterId: this.selectedEstablishmentId,
                accountNumber: data.accountNumber,
                groupCompanyId: data.groupCompanyId,
                registrationNumber: data.registrationNumber,
                issueDate: data.issueDate,
                coverageDate: data.coverageDate,
                userNameForWebsite: data.userNameForWebsite,
                administratedBy: data.administratedBy,
                complianceDetails: complianceDetails[0],
                pfWagesDetails: {
                    basicDABelowWageCelling: data.basicDABelowWageCelling,
                    basicDAAboveWageCelling: data.basicDAAboveWageCelling
                }
            };
            console.log('s', saveData);
            console.log(JSON.stringify(saveData));
            this.complianceMasterService.postComplianceMaster(saveData).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    console.log(res);
                    _this.alertService.sweetalertMasterSuccess('Compliance Master Details Saved Successfully.', '');
                    _this.form.setControl('pfFormArray', new forms_1.FormArray([]));
                    _this.form.setControl('epsArray', new forms_1.FormArray([]));
                    _this.form.setControl('esiArray', new forms_1.FormArray([]));
                    _this.form.setControl('ptArray', new forms_1.FormArray([]));
                    _this.form.setControl('lwfArray', new forms_1.FormArray([]));
                    _this.form.setControl('tdsArray', new forms_1.FormArray([]));
                    _this.form.setControl('gratuityArray', new forms_1.FormArray([]));
                    _this.form.setControl('epsArray', new forms_1.FormArray([]));
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.setPfDefaultValueAfterReset();
                    _this.isPf = false;
                    _this.isPfNew = false;
                    _this.isEps = false;
                    _this.isEsi = false;
                    _this.isPt = false;
                    _this.isLw = false;
                    _this.isTaxDeductedAtSource = false;
                    _this.isGratuity = false;
                    _this.isSa = false; // Super Annuation
                    console.log('i m in refresh table');
                    _this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
                    _this.getInstitutionMaster();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        else {
            //  const tempObj = this.institutionMasterList.find((o) => o.complianceHeadId == data.statutoryInstituteName);
            var index = this.summaryHtmlDataList.findIndex(function (o) { return o.complianceName === data.complianceName; });
            var saveData = {
                complianceMasterId: this.summaryHtmlDataList[index].complianceMasterId,
                complianceName: data.complianceName,
                statutoryInstituteName: this.summaryHtmlDataList[index].statutoryInstituteName,
                complianceHeadShortName: data.shortName,
                establishmentMasterId: this.summaryHtmlDataList[index].establishmentCode,
                accountNumber: data.accountNumber,
                groupCompanyId: data.groupCompanyId,
                registrationNumber: data.registrationNumber,
                issueDate: data.issueDate,
                coverageDate: data.coverageDate,
                userNameForWebsite: data.userNameForWebsite,
                administratedBy: data.administratedBy,
                complianceDetails: complianceDetails[0],
                pfWagesDetails: {
                    basicDABelowWageCelling: data.basicDABelowWageCelling,
                    basicDAAboveWageCelling: data.basicDAAboveWageCelling
                }
            };
            console.log(saveData);
            console.log(JSON.stringify(saveData));
            this.complianceMasterService.putComplianceMaster(saveData).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    console.log(res);
                    _this.alertService.sweetalertMasterSuccess('Compliance Master Details Saved Successfully.', '');
                    _this.form.setControl('pfFormArray', new forms_1.FormArray([]));
                    _this.form.setControl('epsArray', new forms_1.FormArray([]));
                    _this.form.setControl('esiArray', new forms_1.FormArray([]));
                    _this.form.setControl('ptArray', new forms_1.FormArray([]));
                    _this.form.setControl('lwfArray', new forms_1.FormArray([]));
                    _this.form.setControl('tdsArray', new forms_1.FormArray([]));
                    _this.form.setControl('gratuityArray', new forms_1.FormArray([]));
                    _this.form.setControl('epsArray', new forms_1.FormArray([]));
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.setPfDefaultValueAfterReset();
                    _this.isPf = false;
                    _this.isPfNew = false;
                    _this.isEps = false;
                    _this.isEsi = false;
                    _this.isPt = false;
                    _this.isLw = false;
                    _this.isTaxDeductedAtSource = false;
                    _this.isGratuity = false;
                    _this.isSa = false; // Super Annuation
                    _this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
                    _this.getInstitutionMaster();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
    };
    ComplianceMasterComponent.prototype.saveComplianceApplication = function () {
        var _this = this;
        if (this.complianceSDMMappingIdToDelete > 0) {
            var data = this.complianceApplicationForm.getRawValue();
            data.complianceSDMMappingId = this.complianceSDMMappingIdToDelete;
            console.log('raw data', data);
            console.log(JSON.stringify(data));
            this.complianceMasterService.putComplianceApplicability(data).subscribe(function (res) {
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
                _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
        else {
            var data = this.complianceApplicationForm.getRawValue();
            console.log('raw data', data);
            // delete data.allOtherMasterMappingDetails;
            // delete data.jobMasterType
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
                _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    ComplianceMasterComponent.prototype.saveComplianceApplication1 = function () {
        var _this = this;
        var applicabilityDetails = [];
        var data = this.complianceApplicationForm.getRawValue();
        console.log(data);
        if (data.jobMasterType === 'RegionMaster') {
            for (var i = 0; i < data.allOtherMasterMappingDetails.length; i++) {
                applicabilityDetails.push({ regionMasterId: data.allOtherMasterMappingDetails[i].masterMappingId });
            }
        }
        else if (data.jobMasterType == 'SubLocationMaster') {
            for (var i = 0; i < data.allOtherMasterMappingDetails.length; i++) {
                applicabilityDetails.push({ subLocationMasterId: data.allOtherMasterMappingDetails[i].masterMappingId });
            }
        }
        else if (data.jobMasterType == 'BusinessAreaMaster') { }
        else if (data.jobMasterType == 'SubArea') { }
        else if (data.jobMasterType == 'CostCentre') { }
        else if (data.jobMasterType == 'SubCostCenter') { }
        else if (data.jobMasterType == 'DivisionMaster') { }
        else if (data.jobMasterType == 'DepartmentMaster') { }
        else if (data.jobMasterType == 'SubDepartment') { }
        else if (data.jobMasterType == 'GradeMaster') { }
        else if (data.jobMasterType == 'PlantMaster') { }
        else if (data.jobMasterType == 'ProjectMaster') { }
        else if (data.jobMasterType == 'ProfitCentreMaster') { }
        else if (data.jobMasterType == 'StrategicBusinessUnit') { }
        else if (data.jobMasterType == 'WorkLocationMaster') { }
        var saveData = {
            complianceMasterId: data.complianceName,
            jobMasterType: data.jobMasterType,
            applicabilityDetails: applicabilityDetails
        };
        console.log(JSON.stringify(saveData));
        this.complianceMasterService.postComplianceApplicability(saveData).subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.alertService.sweetalertMasterSuccess('Compliance Applicability Details Saved Successfully.', '');
                _this.complianceApplicationForm.reset();
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        });
    };
    ComplianceMasterComponent.prototype.editMaster = function (i, complianceMasterId, complianceHeadShortName, establishmentNames, isView) {
        var _this = this;
        console.log(this.summaryHtmlDataList);
        var ind1 = this.summaryHtmlDataList.findIndex(function (o) { return o.complianceMasterId == complianceMasterId; });
        console.log(this.summaryHtmlDataList[ind1]);
        this.form.enable();
        this.isGlobalView = false;
        this.isView = isView;
        this.editedRecordIndex = complianceMasterId;
        this.isEditableEstablismentMasterId = true;
        this.isDefaultContribution = false;
        this.savedEstablishmentList = [];
        this.ServicesList = [];
        if (this.pfArray.controls.length !== 0) {
            for (var i_1 = 0; i_1 < this.pfArray.length; i_1++) {
                this.pfArray.removeAt(i_1);
            }
        }
        if (this.epsArray.controls.length !== 0) {
            for (var i_2 = 0; i_2 < this.epsArray.length; i_2++) {
                this.epsArray.removeAt(i_2);
            }
        }
        if (this.esiArray.controls.length !== 0) {
            for (var i_3 = 0; i_3 < this.esiArray.length; i_3++) {
                this.esiArray.removeAt(i_3);
            }
        }
        if (this.ptArray.controls.length !== 0) {
            for (var i_4 = 0; i_4 < this.ptArray.length; i_4++) {
                this.ptArray.removeAt(i_4);
            }
        }
        if (this.lwfArray.controls.length !== 0) {
            for (var i_5 = 0; i_5 < this.lwfArray.length; i_5++) {
                this.lwfArray.removeAt(i_5);
            }
        }
        if (this.tdsArray.controls.length !== 0) {
            for (var i_6 = 0; i_6 < this.tdsArray.length; i_6++) {
                this.tdsArray.removeAt(i_6);
            }
        }
        if (this.gratuityArray.controls.length !== 0) {
            for (var i_7 = 0; i_7 < this.gratuityArray.length; i_7++) {
                this.gratuityArray.removeAt(i_7);
            }
        }
        if (this.saArray.controls.length !== 0) {
            for (var i_8 = 0; i_8 < this.saArray.length; i_8++) {
                this.saArray.removeAt(i_8);
            }
        }
        // let establishmentNamesArray = establishmentNames.split(',');
        // console.log(establishmentNamesArray);
        // const establishmentNamesArrayMultiselect = [];
        // for (let i = 0; i < establishmentNamesArray.length; i++) {
        //   const a = this.dropdownList.findIndex((o) => o.establishmentCode == establishmentNamesArray[i].trim());
        //   establishmentNamesArrayMultiselect.push(this.dropdownList[a]);
        //   this.ServicesList.push({ establishmentMasterId: this.dropdownList[a].establishmentMasterId, establishmentCode: this.dropdownList[a].establishmentCode });
        //   this.savedEstablishmentList.push({ establishmentMasterId: this.dropdownList[a].establishmentMasterId, establishmentCode: this.dropdownList[a].establishmentCode });
        // }
        this.selectedObjectForUpdate = this.summaryHtmlDataList[i];
        this.isEditMode = true;
        this.isDefaultContribution = true;
        this.isPf = false;
        this.isPfNew = false;
        this.isEps = false;
        this.isEsi = false;
        this.isPt = false;
        this.isLw = false;
        this.isTaxDeductedAtSource = false;
        this.isGratuity = false;
        this.isSa = false; // Super Annuation
        if (complianceHeadShortName === 'PF') {
            // this.isPf = true;
            this.addPfFormControl(this.editedRecordIndex, false);
        }
        if (complianceHeadShortName === 'EPS') {
            // this.isEps = true;
            this.addEpsFormControl(this.editedRecordIndex, false);
        }
        if (complianceHeadShortName === 'PT') {
            // this.isPt = true;
            this.addPtFormControl(this.editedRecordIndex, false);
        }
        if (complianceHeadShortName === 'TDS') {
            // this.isTaxDeductedAtSource = true;
            this.addTdsFormControl(this.editedRecordIndex, false);
        }
        if (complianceHeadShortName === 'ESIC') {
            // this.isEsi = true;
            this.addEsiFormControl(this.editedRecordIndex, false);
        }
        if (complianceHeadShortName === 'LWF') {
            // this.isLw = true;
            this.addLWFFormControl(this.editedRecordIndex, false);
        }
        if (complianceHeadShortName === 'S&E') {
            console.log('Not Avail');
        }
        if (complianceHeadShortName === 'Factories') {
            console.log('Not Avail');
        }
        if (complianceHeadShortName === 'SA') {
            this.addSaFormControl(this.editedRecordIndex, false);
            // this.isGlobalView = false;
            // this.isSa = true;
        }
        if (complianceHeadShortName === 'Gratuity') {
            this.isGratuity = true;
        }
        if (complianceHeadShortName === 'BOCW') {
            console.log('Not Avail');
        }
        if (complianceHeadShortName === 'CLRA') {
            console.log('Not Avail');
        }
        if (complianceHeadShortName === 'EE') {
            console.log('Not Avail'); // Employment Exchanges
        }
        if (complianceHeadShortName === 'PWD') {
            console.log('Not Avail'); // Public works department
        }
        this.isSaveAndReset = false;
        this.showButtonSaveAndReset = true;
        // let ind1= this.masterGridDataList.findIndex(o=>o.complianceMasterId == complianceMasterId);
        // console.log('index is', ind1);
        var inn = this.establishmentCodeAndId.findIndex(function (o) { return o.value == _this.masterGridDataList[ind1].establishmentMasterId; });
        this.selectedEstablishmentMasterId = this.establishmentCodeAndId[inn];
        console.log('administratedBy ', this.masterGridDataList[ind1]);
        this.form.patchValue({
            complianceName: this.masterGridDataList[ind1].complianceName,
            complianceHeadShortName: this.masterGridDataList[ind1].complianceHeadShortName,
            statutoryInstituteName: this.masterGridDataList[ind1].statutoryInstituteName,
            complianceHeadName: this.summaryHtmlDataList[ind1].filter.complianceDetailObject.complianceHeadName,
            shortName: complianceHeadShortName,
            //administratedBy: this.summaryHtmlDataList[ind1].administratedBy,
            administratedBy: this.masterGridDataList[ind1].administratedBy,
            accountNumber: this.masterGridDataList[ind1].accountNumber,
            groupCompanyId: this.masterGridDataList[ind1].groupCompanyId,
            establishmentMasterId: this.masterGridDataList[ind1].establishmentMasterId,
            registrationNumber: this.masterGridDataList[ind1].registrationNumber,
            establishmentCode: this.masterGridDataList[ind1].establishmentCode,
            issueDate: this.masterGridDataList[ind1].issueDate,
            coverageDate: this.masterGridDataList[ind1].coverageDate,
            userNameForWebsite: this.masterGridDataList[ind1].userNameForWebsite,
            eps1: this.masterGridDataList[ind1].complianceDetail.eps1,
            eps1FromDate: this.masterGridDataList[ind1].complianceDetail.eps1FromDate,
            eps1ToDate: this.masterGridDataList[ind1].complianceDetail.eps1ToDate,
            esic1: this.masterGridDataList[ind1].complianceDetail.esic1,
            esic1FromDate: this.masterGridDataList[ind1].complianceDetail.esic1FromDate,
            esic1ToDate: this.masterGridDataList[ind1].complianceDetail.esic1ToDate,
            gratuityDividingFactor: this.masterGridDataList[ind1].complianceDetail.gratuityDividingFactor,
            gratuityFromDate: this.masterGridDataList[ind1].complianceDetail.gratuityFromDate,
            gratuityToDate: this.masterGridDataList[ind1].complianceDetail.gratuityToDate,
            saFromDate: this.masterGridDataList[ind1].complianceDetail.saFromDate,
            saMaxPercentage: this.masterGridDataList[ind1].complianceDetail.saMaxPercentage,
            saToDate: this.masterGridDataList[ind1].complianceDetail.saToDate,
            lwfState: this.masterGridDataList[ind1].complianceDetail.lwfState,
            ptCity: this.masterGridDataList[ind1].complianceDetail.ptCity,
            ptState: this.masterGridDataList[ind1].complianceDetail.ptState,
            tan: this.masterGridDataList[ind1].complianceDetail.tan,
            tdsCircle: this.masterGridDataList[ind1].complianceDetail.tdsCircle,
            deductorStatus: this.masterGridDataList[ind1].complianceDetail.deductorStatus,
            specialRateApplicableEMPCount: this.masterGridDataList[ind1].complianceDetail.specialRateApplicableEMPCount,
            specialRateApplicableCompCount: this.masterGridDataList[ind1].complianceDetail.specialRateApplicableCompCount,
            specialRateCompCountPercent: this.masterGridDataList[ind1].complianceDetail.specialRateCompCountPercent,
            specialRateEMPCountPercent: this.masterGridDataList[ind1].complianceDetail.specialRateEMPCountPercent,
            industryType: this.masterGridDataList[ind1].complianceDetail.industryType,
            basicDABelowWageCelling: this.masterGridDataList[ind1].pfWagesDetails.basicDABelowWageCelling,
            basicDAAboveWageCelling: this.masterGridDataList[ind1].pfWagesDetails.basicDAAboveWageCelling
        });
        this.form.get('complianceHeadName').disable();
        this.form.get('shortName').disable();
        this.form.get('establishmentMasterId').disable();
        this.form.get('statutoryInstituteName').disable();
    };
    ComplianceMasterComponent.prototype.viewMaster = function (i, establishmentMasterId, complianceHeadShortName, establishmentNames, active) {
        this.isActivateButton = active;
        //  debugger
        console.log(active);
        this.isView = true;
        this.isEditMode = false;
        this.ServicesList = [];
        this.establishmentMasterId = 0;
        this.isSaveAndReset = false;
        this.showButtonSaveAndReset = false;
        this.showButtonSaveAndReset = false;
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.form.setControl('epsArray', new forms_1.FormArray([]));
        this.form.setControl('esiArray', new forms_1.FormArray([]));
        this.form.setControl('ptArray', new forms_1.FormArray([]));
        this.form.setControl('lwfArray', new forms_1.FormArray([]));
        this.form.setControl('tdsArray', new forms_1.FormArray([]));
        this.form.setControl('gratuityArray', new forms_1.FormArray([]));
        this.form.setControl('epsArray', new forms_1.FormArray([]));
        this.form.reset();
        this.editMaster(i, establishmentMasterId, complianceHeadShortName, establishmentNames, true);
        this.form.disable();
        // this.form.get('pfFormArray').controls
        //   .forEach((control) => {
        //     control.controls.establishmentName.enable();
        //   });
        this.isGlobalView = true;
        this.isView = true;
    };
    ComplianceMasterComponent.prototype.cancelView = function () {
        this.isActivateButton = 1;
        this.isGlobalView = false;
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.form.setControl('epsArray', new forms_1.FormArray([]));
        this.form.setControl('esiArray', new forms_1.FormArray([]));
        this.form.setControl('ptArray', new forms_1.FormArray([]));
        this.form.setControl('lwfArray', new forms_1.FormArray([]));
        this.form.setControl('tdsArray', new forms_1.FormArray([]));
        this.form.setControl('gratuityArray', new forms_1.FormArray([]));
        this.form.setControl('epsArray', new forms_1.FormArray([]));
        this.form.setControl('saArray', new forms_1.FormArray([]));
        this.isEditableEstablismentMasterId = false;
        this.isEditMode = false;
        this.isDefaultContribution = true;
        this.isPf = false;
        this.isEps = false;
        this.isEsi = false;
        this.isPt = false;
        this.isLw = false;
        this.isPfNew = false;
        this.isTaxDeductedAtSource = false;
        this.isGratuity = false;
        this.isSa = false; // Super Annuation
        this.establishmentMasterId = 0;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.setPfDefaultValueAfterReset();
        this.showButtonSaveAndReset = true;
    };
    ComplianceMasterComponent.prototype.onSelectEstablishmentCode = function (evt) {
        var _this = this;
        var tempObjEstablishmentAddress = this.establishmentDetailsMasterList.find(function (o) { return o.establishmentMasterId == _this.form.get('establishmentMasterId').value.trim(); });
        console.log(tempObjEstablishmentAddress);
    };
    ComplianceMasterComponent.prototype.onSelectTypeOfEstablishment = function (evt) { };
    ComplianceMasterComponent.prototype.onBsValueChangeDateOfSetup = function () { };
    ComplianceMasterComponent.prototype.onSelectOfficePremisesOwnership = function (evt) { };
    ComplianceMasterComponent.prototype.onBsValueChangeDateOfGstIssuisAeDate = function () { };
    ComplianceMasterComponent.prototype.onBsValueChangeLinIssueDate = function () { };
    ComplianceMasterComponent.prototype.onBsValueChangeStpiIssueDate = function () { };
    ComplianceMasterComponent.prototype.onSelectPfStatus = function (evt) { };
    ComplianceMasterComponent.prototype.onSelectRegionMasterId = function (evt) {
        var _this = this;
        console.log(this.regionMasterDetails);
        var tempObj = this.regionMasterDetails.find(function (o) { return o.masterCode == _this.form.get('regionMasterId').value.trim(); });
        console.log(tempObj);
    };
    ComplianceMasterComponent.prototype.selectionChangedProvidentFundNilOption = function (event, i) {
        this.dropdownList1 = [];
        this.defaultEmployeeContributionList = [];
        this.companyContributionList = [];
        if (i == -1) {
            if (event.target.defaultValue == '0') {
                this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
                this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
            }
            else {
                this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }, { id: 3, itemName: 'NIL' }];
                this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT', 'NIL'];
            }
        }
        else {
            if (this.form.get('pfFormArray').value[0].pfNilOptionChoice == 0) {
                this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
                this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
            }
            else {
                this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }, { id: 3, itemName: 'NIL' }];
                this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT', 'NIL'];
            }
        }
    };
    ComplianceMasterComponent.prototype.selectionChangedContributionMethodIsDifferntOption = function (event, i) {
        var employeeContributionMultiSelectArray;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        if (i == -1) {
            if (event.target.defaultValue == 0) {
                this.isDefaultContribution = false;
                this.SelectedemployeeContribtionMultiSelect = [];
                this.selectedCompanyContribtionMultiSelect = [];
                this.companyContributionList = [];
                this.defaultEmployeeContributionList = [];
            }
            else {
                this.isDefaultContribution = false;
                this.SelectedemployeeContribtionMultiSelect = [];
                this.selectedCompanyContribtionMultiSelect = [];
                this.companyContributionList = [];
                this.defaultEmployeeContributionList = [];
                this.isRestrictedDisableMultiSelect = false;
            }
        }
        else {
            if (event.target.defaultValue == 0) {
                this.isDefaultContribution = false;
                this.SelectedemployeeContribtionMultiSelect = [];
                this.selectedCompanyContribtionMultiSelect = [];
                this.companyContributionList = [];
                this.defaultEmployeeContributionList = [];
                this.isRestrictedDisableMultiSelect = true;
            }
            else {
                this.isDefaultContribution = false;
                this.SelectedemployeeContribtionMultiSelect = [];
                this.selectedCompanyContribtionMultiSelect = [];
                this.companyContributionList = [];
                this.defaultEmployeeContributionList = [];
                this.isRestrictedDisableMultiSelect = false;
            }
        }
    };
    ComplianceMasterComponent.prototype.onChangeContributionMethodChoice = function (event, i) {
        if (i == -1) {
            if (event.target.defaultValue == 0) {
                this.form.patchValue({
                    employeeCompanyContributionDiff: '0'
                });
                this.isDefaultContribution = true;
                this.form.get('employeeCompanyContributionDiff').disable();
                if (this.form.get('employeeCompanyContributionDiff').value == 1) {
                }
            }
            else {
                this.isDefaultContribution = false;
                this.SelectedemployeeContribtionMultiSelect = [];
                this.selectedCompanyContribtionMultiSelect = [];
                this.isRestrictedDisableMultiSelect = false;
                this.form.get('employeeCompanyContributionDiff').enable();
            }
        }
        else {
            console.log('in i !==-1');
            if (event.target.defaultValue == 0) {
                this.pfArray.patchValue([{
                        employeeCompanyContributionDiff: '0'
                    }]);
                this.form.get('pfFormArray').controls
                    .forEach(function (control) {
                    control.controls.employeeCompanyContributionDiff.disable();
                });
                this.form.get('pfFormArray').controls
                    .forEach(function (control) {
                    control.controls.companyContribution.disable();
                });
                this.isDefaultContribution = true;
            }
            else {
                this.isDefaultContribution = false;
                this.form.get('pfFormArray').controls
                    .forEach(function (control) {
                    control.controls.employeeCompanyContributionDiff.enable();
                });
            }
        }
    };
    ComplianceMasterComponent.prototype.getInstitutionMaster = function () {
        var _this = this;
        console.log('getInstitutionMaster');
        this.institutionNameList = [];
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
                var tempObjForgroupNameScaleStartDate = _this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.find(function (o) { return o.complianceHeadId == element.complianceHeadId; });
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
                    complianceHeadName: tempObjForgroupNameScaleStartDate.complianceHeadName,
                    country1: tempObjForgroupNameScaleStartDate.country,
                    complianceInstitutionMasterId: element.complianceInstitutionMasterId,
                    tempObjForgroupNameScaleStartDate: tempObjForgroupNameScaleStartDate,
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
                console.log('filteredEvents', filteredEvents[0]);
                // let establishmentNames: string;
                // for (let i = 0; i < element.complianceDetail.length; i++) {
                //   if (i == 0) {
                //     const index = this.dropdownList.findIndex((o) => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
                //     establishmentNames = this.dropdownList[index].establishmentCode;
                //   } else {
                //     establishmentNames += ', ';
                //     const index = this.dropdownList.findIndex((o) => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
                //     establishmentNames += this.dropdownList[index].establishmentCode;
                //   }
                // }
                var tempObjEstablishmentAddress = _this.establishmentDetailsMasterList.find(function (o) { return o.establishmentMasterId == element.establishmentMasterId; });
                console.log('tempObjEstablishmentAddress', tempObjEstablishmentAddress);
                var obj = {
                    SrNo: srNo++,
                    complianceName: element.complianceName,
                    statutoryInstituteName: element.statutoryInstituteName,
                    complianceHeadName: filteredEvents[0].complianceDetailObject.complianceHeadName,
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
        // console.log(this.summaryHtmlDataList);
        this.commonValidation();
        // this.complianceHeadService.getComplianceHeadDetails().subscribe(res => {
        //   this.complianceHeadDetailsObject = res.data.results;
        //   res.data.results.forEach(element => {
        //     this.complianceHeadNameList.push(element.complianceHeadName);
        //     this.institutionMasterObject.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
        //   });
        // }, (error: any) => {
        //   this.sweetalertError(error["error"]["status"]["messsage"]);
        // }, () => {
        //   this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails().subscribe(res => {
        //     this.getComplianceInstitutionMasterGridListObject = res.data.results;
        //     let i = 1;
        //     res.data.results.forEach(element => {
        //       let tempObjForgroupNameScaleStartDate = this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.find(o => o.complianceHeadId == element.complianceHeadId);
        //       this.institutionNameList.push({ label: element.institutionName, value: element.complianceHeadId });
        //       let tempComplianceHeadObject = this.complianceHeadDetailsObject.find(o => o.complianceHeadId == element.complianceHeadId);
        //       const obj = {
        //         SrNo: i++,
        //         institutionName: element.institutionName,
        //         complianceHeadId: element.complianceHeadId,
        //         country: element.country,
        //         applicabilityLevel: element.applicabilityLevel,
        //         address1: element.address1,
        //         address2: element.address2,
        //         address3: element.address3,
        //         state: element.state,
        //         city: element.city,
        //         village: element.village,
        //         pinCode: element.pinCode,
        //         typeOfOffice: element.typeOfOffice,
        //         telephoneNumber: element.telephoneNumber,
        //         emailId: element.emailId,
        //         complianceHeadName: tempObjForgroupNameScaleStartDate.complianceHeadName,
        //         country1: tempObjForgroupNameScaleStartDate.country,
        //         complianceInstitutionMasterId: element.complianceInstitutionMasterId,
        //         tempObjForgroupNameScaleStartDate: tempObjForgroupNameScaleStartDate,
        //         complianceDetailObject: tempComplianceHeadObject,
        //       };
        //       this.institutionMasterList.push(obj);
        //     });
        //   });
        // });
    };
    ComplianceMasterComponent.prototype.onSelectStatuatoryInstitutionMaster = function (value, label) {
        if (value == '') {
        }
        else {
            this.clearEpsValidation();
            this.clearPfValidation();
            this.clearEsiValidation();
            this.clearPtValidation();
            this.clearlwfValidation();
            this.clearTdsValidation();
            this.clearGratuityValidation();
            this.clearSaValidation();
            this.isPf = false;
            this.isEps = false;
            this.isEsi = false;
            this.isPt = false;
            this.isLw = false;
            this.isTaxDeductedAtSource = false;
            this.isGratuity = false;
            this.isSa = false; // Super Annuation
            this.isPfNew = false;
            this.isEpsNew = false;
            // blank if user has already selected establishment multi checkbox
            this.ServicesList = [];
            this.selectedEstablishmentMasterId = [];
            var tempObj_1 = this.institutionMasterList.find(function (o) { return o.complianceHeadId == value; });
            console.log(tempObj_1);
            this.complianceHeadTempObj = this.complianceHeadDetailsObject.find(function (o) { return o.complianceHeadId == tempObj_1.complianceHeadId; });
            console.log(this.complianceHeadTempObj);
            this.form.patchValue({
                complianceHeadName: this.complianceHeadTempObj.complianceHeadName,
                shortName: this.complianceHeadTempObj.shortName
            });
            if (this.complianceHeadTempObj.shortName === 'PF') {
                this.isPfNew = true;
                this.pfValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'EPS') {
                this.isEpsNew = true;
                this.epsValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'PT') {
                this.isPt = true;
                this.ptValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'TDS') {
                this.isTaxDeductedAtSource = true;
                this.tdsValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'ESIC') {
                this.isEsi = true;
                this.esiValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'LWF') {
                this.isLw = true;
                this.lwfValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'S&E') {
                console.log('Not Avail');
            }
            if (this.complianceHeadTempObj.shortName === 'Factories') {
                console.log('Not Avail');
            }
            if (this.complianceHeadTempObj.shortName === 'SA') {
                this.isSa = true;
                this.saValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'Gratuity') {
                this.isGratuity = true;
                this.gratuityValidation();
            }
            if (this.complianceHeadTempObj.shortName === 'BOCW') {
                console.log('Not Avail');
            }
            if (this.complianceHeadTempObj.shortName === 'CLRA') {
                console.log('Not Avail');
            }
            if (this.complianceHeadTempObj.shortName === 'EE') {
                console.log('Not Avail'); // Employment Exchanges
            }
            if (this.complianceHeadTempObj.shortName === 'PWD') {
                console.log('Not Avail'); // Public works department
            }
        }
    };
    ComplianceMasterComponent.prototype.getEstablishmentMasterDetailsAndRefreshHtmlTable = function () {
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
    ComplianceMasterComponent.prototype.selectionChallenged = function (event) {
        console.log(event.target.defaultValue);
    };
    // onItemSelect(item: any) {
    //   this.ServicesList.push({ establishmentMasterId: item.establishmentMasterId, establishmentCode: item.establishmentCode });
    //   console.log(item.establishmentCode);
    // }
    // onItemDeSelect(item: any) {
    //   let index = this.ServicesList.findIndex((o) => o.establishmentCode == item.establishmentCode);
    //   this.ServicesList.splice(index, 1);
    //   console.log(this.ServicesList);
    // }
    // onSelectAll(items: any) {
    //   this.ServicesList = [];
    //   this.ServicesList = items;
    // }
    // onDeselectAll(items: any) {
    //   this.ServicesList = [];
    // }
    ComplianceMasterComponent.prototype.onDeselectAllDefaultEmpContribution = function (items, i) {
        if (i == -1) {
            this.defaultEmployeeContributionList = [];
            if (this.form.get('employeeCompanyContributionDiff').value == 0) {
                this.companyContributionList = [];
                this.form.patchValue({
                    companyContribtionMultiSelect: this.companyContributionList
                });
            }
            if (this.form.get('employeeCompanyContributionDiff').value == 0 && this.form.get('contributionMethodChoice').value == 1) {
                this.defaultEmployeeContributionList = [];
            }
        }
        else {
            if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0 && this.form.get('pfFormArray').value[0].contributionMethodChoice == 1) {
                this.defaultEmployeeContributionList = [];
            }
            if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
                this.companyContributionList = [];
                this.pfArray.patchValue([{
                        companyContribtionMultiSelect: this.companyContributionList
                    }]);
            }
            else {
                this.defaultEmployeeContributionList = [];
            }
        }
    };
    ComplianceMasterComponent.prototype.onItemSelectlDefaultEmpContribution = function (items, i) {
        if (i == -1) {
            this.defaultEmployeeContributionList.push({ id: items.id, itemName: items.itemName });
            if (this.form.get('employeeCompanyContributionDiff').value == 0) {
                this.companyContributionList.push({ id: items.id, itemName: items.itemName });
                this.form.patchValue({
                    companyContribtionMultiSelect: this.companyContributionList
                });
            }
        }
        else {
            if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
                this.defaultEmployeeContributionList.push({ id: items.id, itemName: items.itemName });
                this.companyContributionList.push({ id: items.id, itemName: items.itemName });
                this.pfArray.patchValue([{
                        companyContribtionMultiSelect: this.companyContributionList
                    }]);
            }
            else {
                this.defaultEmployeeContributionList.push({ id: items.id, itemName: items.itemName });
            }
        }
    };
    ComplianceMasterComponent.prototype.onSelectAllDefaultEmpContribution = function (items, i) {
        if (i == -1) {
            this.defaultEmployeeContributionList = [];
            this.defaultEmployeeContributionList = items;
            if (this.form.get('employeeCompanyContributionDiff').value == 0) {
                this.companyContributionList = [];
                this.companyContributionList = items;
                this.form.patchValue({
                    companyContribtionMultiSelect: this.companyContributionList
                });
            }
            else {
                this.defaultEmployeeContributionList = [];
                this.defaultEmployeeContributionList = items;
            }
        }
        else {
            if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
                this.companyContributionList = [];
                this.companyContributionList = items;
                this.defaultEmployeeContributionList = [];
                this.defaultEmployeeContributionList = items;
                this.pfArray.patchValue([{
                        companyContribtionMultiSelect: this.companyContributionList
                    }]);
            }
            else {
                this.defaultEmployeeContributionList = [];
                this.defaultEmployeeContributionList = items;
            }
        }
    };
    ComplianceMasterComponent.prototype.onItemDeSelectDefaultEmpContribution = function (items, i) {
        if (i === -1) {
            var index = this.defaultEmployeeContributionList.findIndex(function (o) { return o.id == items.id; });
            this.defaultEmployeeContributionList.splice(index, 1);
            if (this.form.get('employeeCompanyContributionDiff').value == 0) {
                console.log(this.companyContributionList);
                var i1 = this.companyContributionList.findIndex(function (o) { return o.id == items.id; });
                this.companyContributionList.splice(i1, 1);
                this.form.patchValue({
                    companyContribtionMultiSelect: this.companyContributionList
                });
            }
        }
        else {
            var index = this.defaultEmployeeContributionList.findIndex(function (o) { return o.id == items.id; });
            this.defaultEmployeeContributionList.splice(index, 1);
            if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
                var i1 = this.companyContributionList.findIndex(function (o) { return o.id == items.id; });
                this.companyContributionList.splice(i1, 1);
                this.pfArray.patchValue([{
                        companyContribtionMultiSelect: this.companyContributionList
                    }]);
            }
        }
    };
    ComplianceMasterComponent.prototype.onItemSelectlCompanyContribution = function (items) {
        this.companyContributionList.push({ id: items.id, itemName: items.itemName });
        if (this.form.get('employeeCompanyContributionDiff').value == 0) {
            this.selectedCompanyContribtionMultiSelect.push({ id: items.id, itemName: items.itemName });
        }
    };
    ComplianceMasterComponent.prototype.onDeselectAllCompanyContribution = function (items) {
        this.companyContributionList = [];
    };
    ComplianceMasterComponent.prototype.onSelectAllCompanyContribution = function (items) {
        this.companyContributionList = [];
        this.companyContributionList = items;
    };
    ComplianceMasterComponent.prototype.onItemDeSelectCompanyContribution = function (items) {
        var index = this.companyContributionList.indexOf(items.id);
        this.companyContributionList.splice(index, 1);
    };
    ComplianceMasterComponent.prototype.onItemSelectMappingDetails = function (items) {
        this.allOtherMappingDetailsList.push({ masterMappingId: items.masterMappingId, masterCode: items.masterCode });
    };
    ComplianceMasterComponent.prototype.onDeselectAllMappingDetails = function (items) {
        this.allOtherMappingDetailsList = [];
    };
    ComplianceMasterComponent.prototype.onSelectAllMappingDetails = function (items) {
        this.allOtherMappingDetailsList = [];
        this.allOtherMappingDetailsList = items;
    };
    ComplianceMasterComponent.prototype.onItemDeSelectMappingDetails = function (items) {
        var index = this.allOtherMappingDetailsList.indexOf(items.masterCode);
        this.allOtherMappingDetailsList.splice(index, 1);
    };
    // onSelectJobMasterType(evt: any) {
    //   this.complianceApplicationForm.patchValue({
    //     allOtherMasterMappingDetails: '',
    //   });
    //   this.getFilteredRecordOfAllOtherMastersMappingDetailsList = [];
    //   this.tempGetAllOtherMastersMappingDetails = [];
    //   if (evt == 'CostCentre') {
    //     evt = 'CostCentre' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'DivisionMaster') {
    //     evt = 'DivisionMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'DepartmentMaster') {
    //     evt = 'DepartmentMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'SubDepartment') {
    //     evt = 'SubDepartment' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'GLCodeMaster') {
    //     evt = 'GLCodeMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'GradeMaster') {
    //     evt = 'GradeMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'StrategicBusinessUnit') {
    //     evt = 'StrategicBusinessUnit' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'WorkLocationMaster') {
    //     evt = 'WorkLocationMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'SubCostCenter') {
    //     evt = 'SubCostCentre' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'SubArea') {
    //     evt = 'SubArea' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'BusinessAreaMaster') {
    //     evt = 'BusinessAreaMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'PlantMaster') {
    //     evt = 'PlantMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt == 'ProjectMaster') {
    //     evt = 'ProjectMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt === 'ProfitCentreMaster') {
    //     evt = 'ProfitCentreMaster' + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt === 'RegionMaster') {
    //     evt = evt + 'Mapping';
    //     let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    //   if (evt === 'SubLocationMaster') {
    //     evt = 'SubLocationMapping';
    //     var filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function (event) {
    //       return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
    //     });
    //     this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    //   }
    // }
    ComplianceMasterComponent.prototype.commonValidation = function () {
        this.form.get('complianceName').setValidators([forms_1.Validators.required]);
        this.form.get('statutoryInstituteName').setValidators([forms_1.Validators.required]);
        this.form.get('accountNumber').setValidators([forms_1.Validators.required]);
        this.form.get('registrationNumber').setValidators([forms_1.Validators.required]);
        this.form.get('issueDate').setValidators([forms_1.Validators.required]);
        this.form.get('coverageDate').setValidators([forms_1.Validators.required]);
        this.form.controls.complianceName.updateValueAndValidity();
        this.form.controls.statutoryInstituteName.updateValueAndValidity();
        this.form.controls.accountNumber.updateValueAndValidity();
        this.form.controls.registrationNumber.updateValueAndValidity();
        this.form.controls.issueDate.updateValueAndValidity();
        this.form.controls.coverageDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.tdsValidation = function () {
        this.form.get('tan').setValidators([forms_1.Validators.required]);
        this.form.controls.tan.updateValueAndValidity();
        this.form.get('tdsCircle').setValidators([forms_1.Validators.required]);
        this.form.controls.tdsCircle.updateValueAndValidity();
        this.form.get('deductorStatus').setValidators([forms_1.Validators.required]);
        this.form.controls.deductorStatus.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearTdsValidation = function () {
        this.form.get('tan').clearValidators();
        this.form.controls.tan.updateValueAndValidity();
        this.form.get('tdsCircle').clearValidators();
        this.form.controls.tdsCircle.updateValueAndValidity();
        this.form.get('deductorStatus').clearValidators();
        this.form.controls.deductorStatus.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.pfValidation = function () {
        this.form.get('pfStatus').setValidators([forms_1.Validators.required]);
        this.form.controls.pfStatus.updateValueAndValidity();
        this.form.get('employeeToDate').setValidators([forms_1.Validators.required]);
        this.form.controls.employeeToDate.updateValueAndValidity();
        this.form.get('employeeFromDate').setValidators([forms_1.Validators.required]);
        this.form.controls.employeeFromDate.updateValueAndValidity();
        this.form.get('companyToDate').setValidators([forms_1.Validators.required]);
        this.form.controls.companyToDate.updateValueAndValidity();
        this.form.get('companyFromDate').setValidators([forms_1.Validators.required]);
        this.form.controls.companyFromDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.epsValidation = function () {
        this.form.get('eps1').setValidators([forms_1.Validators.required]);
        this.form.controls.eps1.updateValueAndValidity();
        this.form.get('eps1FromDate').setValidators([forms_1.Validators.required]);
        this.form.controls.eps1FromDate.updateValueAndValidity();
        this.form.get('eps1ToDate').setValidators([forms_1.Validators.required]);
        this.form.controls.eps1ToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.esiValidation = function () {
        this.form.get('esic1').setValidators([forms_1.Validators.required]);
        this.form.controls.esic1.updateValueAndValidity();
        this.form.get('esic1FromDate').setValidators([forms_1.Validators.required]);
        this.form.controls.esic1FromDate.updateValueAndValidity();
        this.form.get('esic1ToDate').setValidators([forms_1.Validators.required]);
        this.form.controls.esic1ToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearEsiValidation = function () {
        this.form.get('esic1').clearValidators();
        this.form.controls.esic1.updateValueAndValidity();
        this.form.get('esic1FromDate').clearValidators();
        this.form.controls.esic1FromDate.updateValueAndValidity();
        this.form.get('esic1ToDate').clearValidators();
        this.form.controls.esic1ToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.ptValidation = function () {
        this.form.get('ptState').setValidators([forms_1.Validators.required]);
        this.form.controls.ptState.updateValueAndValidity();
        this.form.get('ptCity').setValidators([forms_1.Validators.required]);
        this.form.controls.ptCity.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.gratuityValidation = function () {
        this.form.get('gratuityDividingFactor').setValidators([forms_1.Validators.required]);
        this.form.controls.gratuityDividingFactor.updateValueAndValidity();
        this.form.get('gratuityFromDate').setValidators([forms_1.Validators.required]);
        this.form.controls.gratuityFromDate.updateValueAndValidity();
        this.form.get('gratuityToDate').setValidators([forms_1.Validators.required]);
        this.form.controls.gratuityToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearGratuityValidation = function () {
        this.form.get('gratuityDividingFactor').clearValidators();
        this.form.controls.gratuityDividingFactor.updateValueAndValidity();
        this.form.get('gratuityToDate').clearValidators();
        this.form.controls.gratuityToDate.updateValueAndValidity();
        this.form.get('gratuityFromDate').clearValidators();
        this.form.controls.gratuityFromDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.saValidation = function () {
        this.form.get('saMaxPercentage').setValidators([forms_1.Validators.required]);
        this.form.controls.saMaxPercentage.updateValueAndValidity();
        this.form.get('saFromDate').setValidators([forms_1.Validators.required]);
        this.form.controls.saFromDate.updateValueAndValidity();
        this.form.get('saToDate').setValidators([forms_1.Validators.required]);
        this.form.controls.saToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearSaValidation = function () {
        this.form.get('saMaxPercentage').clearValidators();
        this.form.controls.saMaxPercentage.updateValueAndValidity();
        this.form.get('saFromDate').clearValidators();
        this.form.controls.saFromDate.updateValueAndValidity();
        this.form.get('saToDate').clearValidators();
        this.form.controls.saToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.lwfValidation = function () {
        this.form.get('lwfState').setValidators([forms_1.Validators.required]);
        this.form.controls.lwfState.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearlwfValidation = function () {
        this.form.get('lwfState').clearValidators();
        this.form.controls.lwfState.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearPtValidation = function () {
        this.form.get('ptState').clearValidators();
        this.form.controls.ptState.updateValueAndValidity();
        this.form.get('ptCity').clearValidators();
        this.form.controls.ptCity.updateValueAndValidity();
    };
    // esiValidation(){
    //   this.f.esiArray.get('esic1').setValidators([Validators.required]),
    //   this.f.esiArray.get('esic1FromDate').setValidators([Validators.required]),
    //   this.esiArray.get('esic1ToDate').setValidators([Validators.required]),
    //   this.f.esiArray.get('esic1').updateValueAndValidity();
    //   this.f.esiArray.get('esic1FromDate').updateValueAndValidity();
    //   this.f.esiArray.get('esic1ToDate').updateValueAndValidity();
    // }
    ComplianceMasterComponent.prototype.clearEpsValidation = function () {
        this.form.get('eps1').clearValidators();
        this.form.controls.eps1.updateValueAndValidity();
        this.form.get('eps1FromDate').clearValidators();
        this.form.controls.eps1FromDate.updateValueAndValidity();
        this.form.get('eps1ToDate').clearValidators();
        this.form.controls.eps1ToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.clearPfValidation = function () {
        this.form.get('pfStatus').clearValidators();
        this.form.controls.pfStatus.updateValueAndValidity();
        this.form.get('employeeFromDate').clearValidators();
        this.form.controls.employeeFromDate.updateValueAndValidity();
        this.form.get('employeeToDate').clearValidators();
        this.form.controls.employeeToDate.updateValueAndValidity();
        this.form.get('companyFromDate').clearValidators();
        this.form.controls.companyFromDate.updateValueAndValidity();
        this.form.get('companyToDate').clearValidators();
        this.form.controls.companyToDate.updateValueAndValidity();
    };
    ComplianceMasterComponent.prototype.addEpsFormControl = function (editRowIndex, isView) {
        var _this = this;
        console.log('this.masterGridDataList', this.masterGridDataList);
        this.isView = isView;
        //const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        console.log('indexOfComplianceDetail', indexOfComplianceDetail);
        // console.log('eps1', (this.masterGridDataList[editRowIndex].complianceDetail.eps1));
        var formGroup = new forms_1.FormGroup({
            //  establishmentName: new FormControl(dropdownList.establishmentMasterId),
            'eps1': new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1, forms_1.Validators.required),
            //   'eps1': new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].eps1, Validators.required),
            eps1FromDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1FromDate, forms_1.Validators.required),
            eps1ToDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1ToDate, forms_1.Validators.required),
            complianceDetail: new forms_1.FormControl(indexOfComplianceDetail)
        });
        this.form.get('epsArray').push(formGroup);
        console.log(this.form.get('epsArray'));
        // this.epsValidation();
    };
    ComplianceMasterComponent.prototype.addTdsFormControl = function (editRowIndex, isView) {
        var _this = this;
        this.isView = isView;
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        console.log('cx', this.masterGridDataList[indexOfComplianceDetail]);
        // const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var formGroup = new forms_1.FormGroup({
            //  establishmentName: new FormControl(dropdownList.establishmentMasterId),
            //  complianceDetail: new FormControl(indexOfComplianceDetail),
            //  establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail.establishmentMasterId),
            tan: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.tan, forms_1.Validators.required),
            tdsCircle: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.tdsCircle, forms_1.Validators.required),
            deductorStatus: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.deductorStatus, forms_1.Validators.required)
        });
        this.form.get('tdsArray').push(formGroup);
        console.log(this.form.get('tdsArray'));
    };
    ComplianceMasterComponent.prototype.addPtFormControl = function (editRowIndex, isView) {
        var _this = this;
        this.isView = isView;
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        // const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var formGroup = new forms_1.FormGroup({
            //  establishmentName: new FormControl(dropdownList.establishmentMasterId),
            ptState: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.ptState, forms_1.Validators.required),
            ptCity: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.ptCity, forms_1.Validators.required)
        });
        this.form.get('ptArray').push(formGroup);
        console.log(this.form.get('ptArray'));
    };
    ComplianceMasterComponent.prototype.addEsiFormControl = function (editRowIndex, isView) {
        var _this = this;
        this.isView = isView;
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        //  const indexOfComplianceDetail = this.masterGridDataList.findIndex(o => o.complianceMasterId == this.editedRecordIndex);
        //const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var formGroup = new forms_1.FormGroup({
            //  establishmentName: new FormControl(dropdownList.establishmentMasterId),
            // 'complianceDetail': new FormControl(indexOfComplianceDetail),
            //   establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
            esic1: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1, forms_1.Validators.required),
            esic1FromDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1FromDate, forms_1.Validators.required),
            esic1ToDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1ToDate, forms_1.Validators.required)
        });
        this.form.get('esiArray').push(formGroup);
        console.log(this.form.get('esiArray'));
    };
    ComplianceMasterComponent.prototype.addLWFFormControl = function (editRowIndex, isView) {
        var _this = this;
        this.isView = isView;
        //  const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        var formGroup = new forms_1.FormGroup({
            //  establishmentName: new FormControl(dropdownList.establishmentMasterId),
            //  'complianceDetail': new FormControl(indexOfComplianceDetail),
            //  establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail.establishmentMasterId),
            lwfState: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.lwfState)
        });
        this.form.get('lwfArray').push(formGroup);
        console.log(this.form.get('lwfArray'));
    };
    ComplianceMasterComponent.prototype.addGratuityFormControl = function (editRowIndex, isView) {
        var _this = this;
        this.isView = isView;
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        //  const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var formGroup = new forms_1.FormGroup({
            // establishmentName: new FormControl(dropdownList.establishmentMasterId),
            // 'complianceDetail': new FormControl(indexOfComplianceDetail),
            //  establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail.establishmentMasterId),
            gratuityDividingFactor: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityDividingFactor, forms_1.Validators.required),
            gratuityFromDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityFromDate, forms_1.Validators.required),
            gratuityToDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityToDate, forms_1.Validators.required)
        });
        this.form.get('gratuityArray').push(formGroup);
        console.log(this.form.get('gratuityArray'));
    };
    ComplianceMasterComponent.prototype.addSaFormControl = function (editRowIndex, isView) {
        var _this = this;
        this.isView = isView;
        this.isGlobalView = false;
        //  const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        var formGroup = new forms_1.FormGroup({
            // establishmentName: new FormControl(dropdownList.establishmentMasterId),
            //'complianceDetail': new FormControl(indexOfComplianceDetail),
            // establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
            saMaxPercentage: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saMaxPercentage, forms_1.Validators.required),
            saFromDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saFromDate, forms_1.Validators.required),
            saToDate: new forms_1.FormControl(this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saToDate, forms_1.Validators.required)
        });
        this.form.get('saArray').push(formGroup);
        console.log(this.form.get('saArray'));
    };
    ComplianceMasterComponent.prototype.addPfFormControl = function (editRowIndex, isView) {
        var _this = this;
        console.log(editRowIndex);
        this.isView = isView;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        console.log(editRowIndex);
        var index = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        console.log('index is ', index);
        editRowIndex = index;
        //  const indexOfComplianceDetails = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
        // console.log('--');
        // console.log(indexOfComplianceDetails);
        // console.log('--');
        this.companyContributionList = [];
        this.defaultEmployeeContributionList = [];
        var pfNilOptionChoice = '0';
        var edliExemption = '0';
        var contributionMethodChoice = '0';
        var employeeCompanyContributionDiff = '0';
        var complianceContributionMultiselectArray = [];
        var employeeContributionMultiSelectArray = [];
        var employeeContribution;
        var companyContribution;
        var companyContributionArray1;
        var employeeContributionArray1;
        if (this.masterGridDataList[editRowIndex].complianceDetail.employeeCompanyContributionDiff == 'YES') {
            employeeCompanyContributionDiff = '1';
        }
        else {
            this.form.get('pfFormArray').controls
                .forEach(function (control) {
                control.controls.companyContribution.disable();
            });
        }
        if (this.masterGridDataList[editRowIndex].complianceDetail.edliExemption == 'YES') {
            edliExemption = '1';
        }
        if (this.masterGridDataList[editRowIndex].complianceDetail.pfNilOptionChoice == 'YES') {
            this.dropdownList1 = [];
            this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }, { id: 3, itemName: 'NIL' }];
            this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT', 'NIL'];
            this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
            pfNilOptionChoice = '1';
        }
        else {
            this.dropdownList1 = [];
            this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
            this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
        }
        if (this.masterGridDataList[editRowIndex].complianceDetail.contributionMethodChoice == 'YES') {
            contributionMethodChoice = '1';
            this.isDefaultContribution = false;
            var companyContributionNameArray = this.masterGridDataList[editRowIndex].complianceDetail.companyContribution;
            var employeeContributionNameArray = this.masterGridDataList[editRowIndex].complianceDetail.employeeContribution;
            if (companyContributionNameArray != null || companyContributionNameArray != undefined) {
                companyContributionArray1 = companyContributionNameArray.split(',');
                if (companyContributionArray1.length > 0) {
                    var _loop_1 = function (i) {
                        var a = this_1.dropdownList1.findIndex(function (o) { return o.itemName == companyContributionArray1[i].trim(); });
                        console.log(a);
                        if (a != -1) {
                            complianceContributionMultiselectArray.push(this_1.dropdownList1[a]);
                            this_1.companyContributionList.push(this_1.dropdownList1[a]);
                            this_1.selectedCompanyContribtionMultiSelect.push({ id: this_1.dropdownList1[a].id, itemName: this_1.dropdownList1[a].itemName });
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < companyContributionArray1.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            if (employeeContributionNameArray != null || employeeContributionNameArray != undefined) {
                employeeContributionArray1 = employeeContributionNameArray.split(',');
                var _loop_2 = function (i) {
                    var a = this_2.dropdownList1.findIndex(function (o) { return o.itemName == employeeContributionArray1[i].trim(); });
                    console.log(a);
                    employeeContributionMultiSelectArray.push(this_2.dropdownList1[a]);
                    this_2.defaultEmployeeContributionList.push(this_2.dropdownList1[a]);
                    this_2.SelectedemployeeContribtionMultiSelect.push(this_2.dropdownList1[a]);
                };
                var this_2 = this;
                for (var i = 0; i < employeeContributionArray1.length; i++) {
                    _loop_2(i);
                }
            }
        }
        else {
            // single select
            this.isDefaultContribution = true;
        }
        if (this.masterGridDataList[editRowIndex].complianceDetail.contributionMethodChoice == 'YES') {
            console.log('in if');
            this.pfArray.push(this.formBuilder.group({
                // establishmentName: new FormControl(dropdownList.establishmentMasterId),
                pfStatus: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.pfStatus, forms_1.Validators.required),
                pfNilOptionChoice: new forms_1.FormControl(pfNilOptionChoice),
                employeeCompanyContributionDiff: new forms_1.FormControl(employeeCompanyContributionDiff),
                edliExemption: new forms_1.FormControl(edliExemption),
                contributionMethodChoice: new forms_1.FormControl(contributionMethodChoice),
                companyContribution: new forms_1.FormControl(''),
                employeeContribution: new forms_1.FormControl(''),
                companyContribtionMultiSelect: new forms_1.FormControl(complianceContributionMultiselectArray),
                employeeContribtionMultiSelect: new forms_1.FormControl(employeeContributionMultiSelectArray),
                companyFromDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.companyFromDate, forms_1.Validators.required),
                companyToDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.companyToDate, forms_1.Validators.required),
                employeeFromDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.employeeFromDate, forms_1.Validators.required),
                employeeToDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.employeeToDate, forms_1.Validators.required),
                specialRateApplicableEMPCount: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateApplicableEMPCount),
                specialRateApplicableCompCount: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateApplicableCompCount),
                specialRateCompCountPercent: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateCompCountPercent),
                specialRateEMPCountPercent: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateEMPCountPercent),
                industryType: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.industryType),
                // check DA Or PF
                basicDABelowWageCelling: new forms_1.FormControl(this.masterGridDataList[editRowIndex].pfWagesDetails.basicDABelowWageCelling),
                basicDAAboveWageCelling: new forms_1.FormControl(this.masterGridDataList[editRowIndex].pfWagesDetails.basicDAAboveWageCelling)
            }));
        }
        else {
            console.log('in else');
            this.pfArray.push(this.formBuilder.group({
                //  establishmentName: new FormControl(dropdownList.establishmentMasterId),
                pfStatus: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.pfStatus, forms_1.Validators.required),
                pfNilOptionChoice: new forms_1.FormControl(pfNilOptionChoice),
                contributionMethodChoice: new forms_1.FormControl(contributionMethodChoice),
                employeeCompanyContributionDiff: new forms_1.FormControl(employeeCompanyContributionDiff),
                edliExemption: new forms_1.FormControl(edliExemption),
                companyContribtionMultiSelect: new forms_1.FormControl(''),
                employeeContribtionMultiSelect: new forms_1.FormControl(''),
                employeeContribution: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.employeeContribution),
                companyContribution: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.companyContribution),
                companyFromDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.companyFromDate, forms_1.Validators.required),
                companyToDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.companyToDate, forms_1.Validators.required),
                employeeFromDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.employeeFromDate, forms_1.Validators.required),
                employeeToDate: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.employeeToDate, forms_1.Validators.required),
                specialRateApplicableEMPCount: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateApplicableEMPCount),
                specialRateApplicableCompCount: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateApplicableCompCount),
                specialRateCompCountPercent: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateCompCountPercent),
                specialRateEMPCountPercent: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.specialRateEMPCountPercent),
                industryType: new forms_1.FormControl(this.masterGridDataList[editRowIndex].complianceDetail.industryType),
                // check DA Or PF
                basicDABelowWageCelling: new forms_1.FormControl(this.masterGridDataList[editRowIndex].pfWagesDetails.basicDABelowWageCelling),
                basicDAAboveWageCelling: new forms_1.FormControl(this.masterGridDataList[editRowIndex].pfWagesDetails.basicDAAboveWageCelling)
            }));
            if (contributionMethodChoice == '0') {
                this.form.get('pfFormArray').controls
                    .forEach(function (control) {
                    control.controls.employeeCompanyContributionDiff.disable();
                });
            }
            this.form.get('pfFormArray').controls
                .forEach(function (control) {
                control.controls.companyContribution.disable();
            });
            console.log(this.pfArray);
        }
        if (contributionMethodChoice == '0') {
            this.isRestrictedDisableMultiSelect = true;
        }
        if (employeeCompanyContributionDiff == '0' && contributionMethodChoice == '1') {
            this.isRestrictedDisableMultiSelect = true;
        }
    };
    ComplianceMasterComponent.prototype.UpdatePf = function (i) {
        var _this = this;
        var saveData;
        var selectedStringCompanyContributionList;
        var selectedStringEmployeeContributionList;
        // for radio form control
        var pfNilOptionChoiceOption = 'NO';
        var edliExemptionOption = 'NO';
        var contributionMethodChoiceOption = 'NO';
        var employeeCompanyContributionDiffOption = 'NO';
        // for radio button
        if (this.form.get('pfFormArray').value[0].pfNilOptionChoice == 1) {
            pfNilOptionChoiceOption = 'YES';
            this.form.get('pfFormArray').value[0].pfNilOptionChoice = 'YES';
        }
        if (this.form.get('pfFormArray').value[0].edliExemption == 1) {
            edliExemptionOption = 'YES';
            this.form.get('pfFormArray').value[0].edliExemption = 'YES';
        }
        if (this.form.get('pfFormArray').value[0].edliExemption == 0) {
            edliExemptionOption = 'NO';
            this.form.get('pfFormArray').value[0].edliExemption = 'NO';
        }
        if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 1) {
            contributionMethodChoiceOption = 'YES';
            this.form.get('pfFormArray').value[0].contributionMethodChoice = 'YES';
        }
        if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 0) {
            contributionMethodChoiceOption = 'NO';
            this.form.get('pfFormArray').value[0].contributionMethodChoice = 'NO';
        }
        if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 1) {
            employeeCompanyContributionDiffOption = 'YES';
            this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff = 'YES';
        }
        if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == undefined) {
            employeeCompanyContributionDiffOption = 'NO';
        }
        for (var i_9 = 0; i_9 < this.companyContributionList.length; i_9++) {
            if (i_9 == 0) {
                selectedStringCompanyContributionList = this.companyContributionList[i_9].itemName;
            }
            else {
                selectedStringCompanyContributionList += ',';
                selectedStringCompanyContributionList += this.companyContributionList[i_9].itemName;
            }
        }
        for (var i_10 = 0; i_10 < this.defaultEmployeeContributionList.length; i_10++) {
            if (i_10 == 0) {
                selectedStringEmployeeContributionList = this.defaultEmployeeContributionList[i_10].itemName;
            }
            else {
                selectedStringEmployeeContributionList += ',';
                selectedStringEmployeeContributionList += this.defaultEmployeeContributionList[i_10].itemName;
            }
        }
        // const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('pfFormArray').value[i].establishmentName);
        if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 'NO') {
            var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
            console.log('in if');
            saveData = {
                complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
                //   complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
                //   establishmentMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.establishmentMasterId,
                pfStatus: this.form.get('pfFormArray').value[i].pfStatus,
                pfNilOptionChoice: pfNilOptionChoiceOption,
                employeeCompanyContributionDiff: employeeCompanyContributionDiffOption,
                edliExemption: edliExemptionOption,
                contributionMethodChoice: contributionMethodChoiceOption,
                companyContribution: this.form.get('pfFormArray').value[i].employeeContribution,
                employeeContribution: this.form.get('pfFormArray').value[i].employeeContribution,
                companyFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyFromDate, 'dd-MMM-yyyy'),
                companyToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyToDate, 'dd-MMM-yyyy'),
                employeeFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeFromDate, 'dd-MMM-yyyy'),
                employeeToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeToDate, 'dd-MMM-yyyy')
            };
        }
        else if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 'YES') {
            console.log('in else if');
            saveData = {
                complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceDetailId,
                complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
                //   establishmentMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.establishmentMasterId,
                pfStatus: this.form.get('pfFormArray').value[i].pfStatus,
                pfNilOptionChoice: pfNilOptionChoiceOption,
                employeeCompanyContributionDiff: employeeCompanyContributionDiffOption,
                edliExemption: edliExemptionOption,
                contributionMethodChoice: contributionMethodChoiceOption,
                companyFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyFromDate, 'dd-MMM-yyyy'),
                companyToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyToDate, 'dd-MMM-yyyy'),
                employeeFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeFromDate, 'dd-MMM-yyyy'),
                employeeToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeToDate, 'dd-MMM-yyyy'),
                employeeContribution: selectedStringEmployeeContributionList,
                companyContribution: selectedStringCompanyContributionList
            };
            if (contributionMethodChoiceOption == 'NO') {
                saveData.companyContribution = selectedStringEmployeeContributionList;
            }
        }
        else {
            console.log('errrrorrrorr');
        }
        console.log(JSON.stringify(saveData));
        this.complianceMasterService.putComplianceMasterUpdateDetails(saveData).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('PF Compliance Details Updated Successfully.', '');
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
            _this.isEditMode = false;
            _this.showButtonSaveAndReset = true;
            _this.isSaveAndReset = true;
            if (_this.form.get('pfFormArray').length > 0) {
                _this.form.get('pfFormArray').removeAt(0);
            }
            if (_this.form.get('epsArray').length > 0) {
                _this.form.get('epsArray').removeAt(0);
            }
            _this.form.setControl('pfFormArray', new forms_1.FormArray([]));
            _this.form.setControl('epsArray', new forms_1.FormArray([]));
            _this.form.setControl('esiArray', new forms_1.FormArray([]));
            _this.form.setControl('ptArray', new forms_1.FormArray([]));
            _this.form.setControl('lwfArray', new forms_1.FormArray([]));
            _this.form.setControl('tdsArray', new forms_1.FormArray([]));
            _this.form.setControl('gratuityArray', new forms_1.FormArray([]));
            _this.form.setControl('epsArray', new forms_1.FormArray([]));
            _this.form.setControl('saArray', new forms_1.FormArray([]));
            _this.form.reset();
            _this.resetAlllArrayAndFormField();
            _this.getInstitutionMaster();
        });
    };
    ComplianceMasterComponent.prototype.UpdateEps = function (i) {
        // console.log(this.form.get('epsArray').value[i].establishmentName);
        // let index = this.masterGridDataList.findIndex(o => o.complianceMasterId == this.editedRecordIndex);
        var _this = this;
        // const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('epsArray').value[i].establishmentName);
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        //console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
            //  complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            // establishmentMasterId: this.form.get('epsArray').value[i].establishmentName,
            eps1: this.form.get('epsArray').value[0].eps1,
            eps1FromDate: this.datePipe.transform(this.form.get('epsArray').value[0].eps1FromDate, 'dd-MMM-yyyy'),
            eps1ToDate: this.datePipe.transform(this.form.get('epsArray').value[0].eps1ToDate, 'dd-MMM-yyyy')
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            // this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdateEsi = function (i) {
        // const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('esiArray').value[i].establishmentName);
        var _this = this;
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceDetailId,
            // complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            // establishmentMasterId: this.form.get('esiArray').value[i].establishmentName,
            esic1: this.form.get('esiArray').value[0].esic1,
            esic1FromDate: this.datePipe.transform(this.form.get('esiArray').value[0].esic1FromDate, 'dd-MMM-yyyy'),
            esic1ToDate: this.datePipe.transform(this.form.get('esiArray').value[0].esic1ToDate, 'dd-MMM-yyyy')
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdatePt = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        //  const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('ptArray').value[i].establishmentName);
        //   console.log(complianceDetailIndexToChange);
        //  console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
            // complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceDetailId,
            // complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            //  establishmentMasterId: this.form.get('ptArray').value[i].establishmentName,
            ptCity: this.form.get('ptArray').value[0].ptCity,
            ptState: this.form.get('ptArray').value[0].ptState
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdateLwf = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        // const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('lwfArray').value[i].establishmentName);
        // console.log(complianceDetailIndexToChange);
        //  console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
            //   complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            //   establishmentMasterId: this.form.get('lwfArray').value[i].establishmentName,
            lwfState: this.form.get('lwfArray').value[0].lwfState
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdateTds = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        // const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('tdsArray').value[i].establishmentName);
        //  console.log(complianceDetailIndexToChange);
        // console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
            // complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            //  establishmentMasterId: this.form.get('tdsArray').value[i].establishmentName,
            tan: this.form.get('tdsArray').value[0].tan,
            tdsCircle: this.form.get('tdsArray').value[0].tdsCircle,
            deductorStatus: this.form.get('tdsArray').value[0].deductorStatus
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdateGratuity = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        //  const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('gratuityArray').value[i].establishmentName);
        //  console.log(complianceDetailIndexToChange);
        //  console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
            // complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            // establishmentMasterId: this.form.get('gratuityArray').value[i].establishmentName,
            gratuityDividingFactor: this.form.get('gratuityArray').value[0].gratuityDividingFactor,
            gratuityFromDate: this.form.get('gratuityArray').value[0].gratuityFromDate,
            gratuityToDate: this.form.get('gratuityArray').value[0].gratuityToDate
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdateSa = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        //  const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('saArray').value[i].establishmentName);
        // console.log(complianceDetailIndexToChange);
        //console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
        var complianceDetails = {
            complianceDetailId: this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId,
            //   complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.complianceMasterId,
            //  establishmentMasterId: this.form.get('saArray').value[i].establishmentName,
            saFromDate: this.datePipe.transform(this.form.get('saArray').value[0].saFromDate, 'dd-MMM-yyyy'),
            saMaxPercentage: this.form.get('saArray').value[0].saMaxPercentage,
            saToDate: this.datePipe.transform(this.form.get('saArray').value[0].saToDate, 'dd-MMM-yyyy')
        };
        console.log(JSON.stringify(complianceDetails));
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.UpdateComplianceMaster = function () {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        // this.save();
        if (this.isView) {
            var tempObj = this.institutionMasterList.find(function (o) { return o.complianceHeadId == _this.masterGridDataList[_this.editedRecordIndex].statutoryInstituteName; });
            var saveData = ({
                complianceMasterId: this.masterGridDataList[complianceDetailIndexToChange].complianceMasterId,
                complianceName: this.masterGridDataList[this.editedRecordIndex].complianceName,
                statutoryInstituteName: this.summaryHtmlDataList[this.editedRecordIndex].statutoryInstituteName,
                establishmentMasterId: this.masterGridDataList[complianceDetailIndexToChange].establishmentMasterId,
                complianceHeadShortName: this.masterGridDataList[complianceDetailIndexToChange].shortName,
                accountNumber: this.masterGridDataList[complianceDetailIndexToChange].accountNumber,
                groupCompanyId: this.masterGridDataList[complianceDetailIndexToChange].groupCompanyId,
                registrationNumber: this.masterGridDataList[complianceDetailIndexToChange].registrationNumber,
                issueDate: this.masterGridDataList[complianceDetailIndexToChange].issueDate,
                coverageDate: this.masterGridDataList[complianceDetailIndexToChange].coverageDate,
                userNameForWebsite: this.masterGridDataList[complianceDetailIndexToChange].userNameForWebsite,
                administratedBy: this.masterGridDataList[complianceDetailIndexToChange].administratedBy
            });
            console.log(JSON.stringify(saveData));
            this.complianceMasterService.putComplianceMaster(saveData).subscribe(function (res) {
                console.log(res);
                _this.alertService.sweetalertMasterSuccess('Compliance Master Updated Successfully.', '');
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            }, function () {
                _this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
                _this.form.reset();
                _this.isEditMode = false;
                _this.showButtonSaveAndReset = true;
                _this.isSaveAndReset = true;
                _this.form.setControl('pfFormArray', new forms_1.FormArray([]));
                _this.form.setControl('epsArray', new forms_1.FormArray([]));
                _this.form.setControl('esiArray', new forms_1.FormArray([]));
                _this.form.setControl('ptArray', new forms_1.FormArray([]));
                _this.form.setControl('lwfArray', new forms_1.FormArray([]));
                _this.form.setControl('tdsArray', new forms_1.FormArray([]));
                _this.form.setControl('gratuityArray', new forms_1.FormArray([]));
                _this.form.setControl('epsArray', new forms_1.FormArray([]));
            });
        }
        else {
            var data_1 = this.form.getRawValue();
            var tempObj = this.institutionMasterList.find(function (o) { return o.complianceHeadId == data_1.statutoryInstituteName; });
            var saveData = ({
                complianceMasterId: this.masterGridDataList[complianceDetailIndexToChange].complianceMasterId,
                complianceName: data_1.complianceName,
                statutoryInstituteName: this.summaryHtmlDataList[complianceDetailIndexToChange].statutoryInstituteName,
                establishmentMasterId: this.masterGridDataList[complianceDetailIndexToChange].establishmentMasterId,
                complianceHeadShortName: data_1.shortName,
                accountNumber: data_1.accountNumber,
                groupCompanyId: data_1.groupCompanyId,
                registrationNumber: data_1.registrationNumber,
                issueDate: data_1.issueDate,
                coverageDate: data_1.coverageDate,
                userNameForWebsite: data_1.userNameForWebsite
            });
            console.log(JSON.stringify(saveData));
            this.complianceMasterService.putComplianceMaster(saveData).subscribe(function (res) {
                console.log(res);
                _this.alertService.sweetalertMasterSuccess('Compliance Master Updated Successfully.', '');
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            }, function () {
                _this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
                _this.form.reset();
                _this.isEditMode = false;
                _this.showButtonSaveAndReset = true;
                _this.isSaveAndReset = true;
                _this.form.setControl('pfFormArray', new forms_1.FormArray([]));
                _this.form.setControl('epsArray', new forms_1.FormArray([]));
                _this.form.setControl('esiArray', new forms_1.FormArray([]));
                _this.form.setControl('ptArray', new forms_1.FormArray([]));
                _this.form.setControl('lwfArray', new forms_1.FormArray([]));
                _this.form.setControl('tdsArray', new forms_1.FormArray([]));
                _this.form.setControl('gratuityArray', new forms_1.FormArray([]));
                _this.form.setControl('epsArray', new forms_1.FormArray([]));
                _this.form.setControl('saArray', new forms_1.FormArray([]));
            });
        }
    };
    ComplianceMasterComponent.prototype.DeletePf = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        // if (this.savedEstablishmentList.length == 1) {
        this.DeleteComplianceMaster();
        // } else {
        console.log(i);
        //const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('pfFormArray').value[i].establishmentName);
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[complianceDetailIndexToChange].complianceDetail.complianceDetailId).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('PF Compliance Details Deleted Successfully.', '');
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            // this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
            // this.form.reset();
            // this.isEditMode = false;
            // this.showButtonSaveAndReset = true;
            // this.isSaveAndReset = true;
            // this.form.setControl('pfFormArray', new FormArray([]));
            // this.form.setControl('epsArray', new FormArray([]));
            // this.form.setControl('esiArray', new FormArray([]));
            // this.form.setControl('ptArray', new FormArray([]));
            // this.form.setControl('lwfArray', new FormArray([]));
            // this.form.setControl('tdsArray', new FormArray([]));
            // this.form.setControl('gratuityArray', new FormArray([]));
            // this.form.setControl('epsArray', new FormArray([]));
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteEps = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('epsArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteEsi = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('esiArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeletePt = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('ptArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteLwf = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('lwfArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteTds = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('tdsArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteGratuity = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('gratuityArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteSa = function (i) {
        var _this = this;
        var complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex(function (o) { return o.establishmentMasterId == _this.form.get('saArray').value[i].establishmentName; });
        this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.DeleteComplianceMaster = function () {
        var _this = this;
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        console.log(this.masterGridDataList[indexOfComplianceDetail]);
        this.complianceMasterService.deleteComplianceMaster(this.masterGridDataList[indexOfComplianceDetail].complianceMasterId).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Master  Deleted Successfully.', '');
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    Object.defineProperty(ComplianceMasterComponent.prototype, "pfArray", {
        get: function () { return this.f.pfFormArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "epsArray", {
        get: function () { return this.f.epsArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "esiArray", {
        get: function () { return this.f.esiArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "ptArray", {
        get: function () { return this.f.ptArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "lwfArray", {
        get: function () { return this.f.lwfArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "tdsArray", {
        get: function () { return this.f.tdsArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "gratuityArray", {
        get: function () { return this.f.gratuityArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "saArray", {
        get: function () { return this.f.saArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComplianceMasterComponent.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    // onSelectEstablishmentName(establishmentMasterId: any, i: number) {
    //   if (this.pfArray.controls.length !== 0) {
    //     for (let i = 0; i < this.pfArray.length; i++) {
    //       this.pfArray.removeAt(i);
    //     }
    //   }
    //   if (this.epsArray.controls.length !== 0) {
    //     for (let i = 0; i < this.epsArray.length; i++) {
    //       this.epsArray.removeAt(i);
    //     }
    //   }
    //   if (this.esiArray.controls.length !== 0) {
    //     for (let i = 0; i < this.esiArray.length; i++) {
    //       this.esiArray.removeAt(i);
    //     }
    //   }
    //   if (this.ptArray.controls.length !== 0) {
    //     for (let i = 0; i < this.ptArray.length; i++) {
    //       this.ptArray.removeAt(i);
    //     }
    //   }
    //   if (this.lwfArray.controls.length !== 0) {
    //     for (let i = 0; i < this.lwfArray.length; i++) {
    //       this.lwfArray.removeAt(i);
    //     }
    //   }
    //   if (this.tdsArray.controls.length !== 0) {
    //     for (let i = 0; i < this.tdsArray.length; i++) {
    //       this.tdsArray.removeAt(i);
    //     }
    //   }
    //   if (this.gratuityArray.controls.length !== 0) {
    //     for (let i = 0; i < this.gratuityArray.length; i++) {
    //       this.gratuityArray.removeAt(i);
    //     }
    //   }
    //   if (this.saArray.controls.length !== 0) {
    //     for (let i = 0; i < this.saArray.length; i++) {
    //       this.saArray.removeAt(i);
    //     }
    //   }
    //   const data = this.form.getRawValue();
    //   console.log(establishmentMasterId);
    //   const index = this.dropdownList.findIndex((o) => o.establishmentMasterId == establishmentMasterId);
    //   if (data.shortName == 'PF') {
    //     (this.form.get('pfFormArray').removeAt(0) as FormArray);
    //     this.addPfFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'EPS') {
    //     (this.form.get('epsArray').removeAt(0) as FormArray);
    //     this.addEpsFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'PT') {
    //     (this.form.get('ptArray').removeAt(0) as FormArray);
    //     this.addPtFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'TDS') {
    //     (this.form.get('tdsArray').removeAt(0) as FormArray);
    //     this.addTdsFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'ESIC') {
    //     (this.form.get('esiArray').removeAt(0) as FormArray);
    //     this.addEsiFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'ESI') {
    //     (this.form.get('esiArray').removeAt(0) as FormArray);
    //     this.addEsiFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'LWF') {
    //     (this.form.get('lwfArray').removeAt(0) as FormArray);
    //     this.addLWFFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'Gratuity') {
    //     (this.form.get('gratuityArray').removeAt(0) as FormArray);
    //     this.addGratuityFormControl(this.editedRecordIndex, false);
    //   }
    //   if (data.shortName == 'SA') {
    //     (this.form.get('saArray').removeAt(0) as FormArray);
    //     this.addSaFormControl(this.editedRecordIndex, false);
    //   }
    // }
    ComplianceMasterComponent.prototype.onChangeContributionMethodIsDiffernt = function (event, i) {
        if (i == -1) { }
        else { }
        if (event.target.defaultValue == 0) {
            this.pfArray.patchValue([{
                    employeeCompanyContributionDiff: '0'
                }]);
        }
        else { }
    };
    ComplianceMasterComponent.prototype.onChangeContributionMethodChoicePfArray = function (event, i) {
        console.log('onChangeContributionMethodChoicePfArray');
        if (event.target.defaultValue == 0) {
            this.form.get('pfFormArray').controls
                .forEach(function (control) {
                control.controls.employeeCompanyContributionDiff.disable();
            });
            this.pfArray.patchValue([{
                    employeeCompanyContributionDiff: '0'
                }]);
            this.isDefaultContribution = true;
        }
        else {
            this.isDefaultContribution = true;
            this.form.get('pfFormArray').controls
                .forEach(function (control) {
                control.controls.employeeCompanyContributionDiff.enable();
            });
            this.pfArray.patchValue([{
                    employeeCompanyContributionDiff: '0'
                }]);
        }
    };
    ComplianceMasterComponent.prototype.onChaneEmployeeContribution = function (evt, i) {
        console.log(evt.target.value);
        if (i == -1) {
            this.form.patchValue({
                companyContribution: evt.target.value
            });
        }
        else {
            this.pfArray.patchValue([{
                    companyContribution: evt.target.value
                }]);
            this.form.get('pfFormArray').controls
                .forEach(function (control) {
                control.controls.companyContribution.disable();
            });
        }
    };
    ComplianceMasterComponent.prototype.onChangeEmpFromDate = function (evt, i) {
        console.log('onChaneEmpFromDate');
        if (i == -1) {
            if (this.form.get('employeeCompanyContributionDiff').value == 0) {
                this.form.patchValue({
                    companyFromDate: this.form.get('employeeFromDate').value
                });
            }
        }
        else {
            if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
                this.pfArray.patchValue([{
                        companyFromDate: this.form.get('pfFormArray').value[0].employeeFromDate
                    }]);
            }
        }
    };
    ComplianceMasterComponent.prototype.onChangeEmplContributionDiff = function (evt, i) {
        if (i == -1) { }
        else { }
    };
    ComplianceMasterComponent.prototype.setPfDefaultValueAfterReset = function () {
        this.form.patchValue({
            status: '',
            pfNilOptionChoice: '0',
            employeeCompanyContributionDiff: '0',
            edliExemption: '0',
            contributionMethodChoice: '0',
            companyToDate: '31-Dec-9999',
            employeeToDate: '31-Dec-9999'
        });
        this.form.get('complianceHeadName').disable();
        this.form.get('shortName').disable();
        this.form.get('companyContribution').disable();
    };
    ComplianceMasterComponent.prototype.selectionChangedEdliExemptionOption = function (evt) {
        if (evt.target.defaultValue == 0) {
            //  this.edliExemptionOption = 'YES';
        }
        else {
            //  this.edliExemptionOption = 'NO';
        }
    };
    ComplianceMasterComponent.prototype.resetAlllArrayAndFormField = function () {
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
        if (this.epsArray.controls.length !== 0) {
            for (var i = 0; i < this.epsArray.length; i++) {
                this.epsArray.removeAt(i);
            }
        }
        if (this.esiArray.controls.length !== 0) {
            for (var i = 0; i < this.esiArray.length; i++) {
                this.esiArray.removeAt(i);
            }
        }
        if (this.ptArray.controls.length !== 0) {
            for (var i = 0; i < this.ptArray.length; i++) {
                this.ptArray.removeAt(i);
            }
        }
        if (this.lwfArray.controls.length !== 0) {
            for (var i = 0; i < this.lwfArray.length; i++) {
                this.lwfArray.removeAt(i);
            }
        }
        if (this.tdsArray.controls.length !== 0) {
            for (var i = 0; i < this.tdsArray.length; i++) {
                this.tdsArray.removeAt(i);
            }
        }
        if (this.gratuityArray.controls.length !== 0) {
            for (var i = 0; i < this.gratuityArray.length; i++) {
                this.gratuityArray.removeAt(i);
            }
        }
        if (this.saArray.controls.length !== 0) {
            for (var i = 0; i < this.saArray.length; i++) {
                this.saArray.removeAt(i);
            }
        }
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.form.setControl('epsArray', new forms_1.FormArray([]));
        this.form.setControl('esiArray', new forms_1.FormArray([]));
        this.form.setControl('ptArray', new forms_1.FormArray([]));
        this.form.setControl('lwfArray', new forms_1.FormArray([]));
        this.form.setControl('tdsArray', new forms_1.FormArray([]));
        this.form.setControl('gratuityArray', new forms_1.FormArray([]));
        this.form.setControl('epsArray', new forms_1.FormArray([]));
        this.form.reset();
        this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
        this.isView = false;
        this.isEditMode = false;
        this.showButtonSaveAndReset = true;
        this.isSaveAndReset = true;
        this.isEditableEstablismentMasterId = false;
        this.commonValidation();
        this.form.get('statutoryInstituteName').enable();
    };
    ComplianceMasterComponent.prototype.cancelAllValidation = function () {
    };
    ComplianceMasterComponent.prototype.activateComplianceMaster = function () {
        var _this = this;
        var indexOfComplianceDetail = this.masterGridDataList.findIndex(function (o) { return o.complianceMasterId == _this.editedRecordIndex; });
        console.log(this.editedRecordIndex);
        var complianceDetails = [];
        complianceDetails.push({
            complianceDetailId: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.complianceDetailId,
            complianceMasterId: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.complianceMasterId,
            // establishmentMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.establishmentMasterId,
            eps1: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1,
            eps1FromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1FromDate,
            eps1ToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1ToDate,
            gratuityDividingFactor: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityDividingFactor,
            gratuityFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityFromDate,
            gratuityToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityToDate,
            saMaxPercentage: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saMaxPercentage,
            saFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saFromDate,
            saToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saToDate,
            esic1: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1,
            esic1FromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1FromDate,
            esic1ToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1ToDate,
            pfStatus: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.pfStatus,
            edliExemption: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.edliExemption,
            pfNilOptionChoice: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.pfNilOptionChoice,
            employeeCompanyContributionDiff: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeCompanyContributionDiff,
            contributionMethodChoice: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.contributionMethodChoice,
            companyContribution: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.companyContribution,
            companyFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.companyFromDate,
            companyToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.companyToDate,
            employeeContribution: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeContribution,
            employeeFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeFromDate,
            employeeToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeToDate,
            ptState: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.ptState,
            ptCity: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.ptCity,
            lwfState: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.lwfState,
            tan: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.tan,
            tdsCircle: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.tdsCircle,
            deductorStatus: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.deductorStatus,
            isActive: 1
        });
        var saveData = {
            complianceMasterId: this.masterGridDataList[indexOfComplianceDetail].complianceMasterId,
            complianceName: this.masterGridDataList[indexOfComplianceDetail].complianceName,
            statutoryInstituteName: this.masterGridDataList[indexOfComplianceDetail].institutionName,
            establishmentMasterId: this.masterGridDataList[indexOfComplianceDetail].establishmentMasterId,
            complianceHeadShortName: this.masterGridDataList[indexOfComplianceDetail].shortName,
            accountNumber: this.masterGridDataList[indexOfComplianceDetail].accountNumber,
            groupCompanyId: this.masterGridDataList[indexOfComplianceDetail].groupCompanyId,
            registrationNumber: this.masterGridDataList[indexOfComplianceDetail].registrationNumber,
            issueDate: this.masterGridDataList[indexOfComplianceDetail].issueDate,
            coverageDate: this.masterGridDataList[indexOfComplianceDetail].coverageDate,
            userNameForWebsite: this.masterGridDataList[indexOfComplianceDetail].userNameForWebsite,
            administratedBy: this.masterGridDataList[indexOfComplianceDetail].administratedBy,
            isActive: 1
        };
        console.log(JSON.stringify(saveData));
        this.complianceMasterService.putComplianceMaster(saveData).subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                console.log(res);
                _this.alertService.sweetalertMasterSuccess('Compliance Master Activated Successfully.', '');
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        });
        // for (let i = 0; i < this.masterGridDataList[i].complianceDetail.length; i++) {
        complianceDetails.push({
            complianceDetailId: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.complianceDetailId,
            // complianceMasterId: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.complianceMasterId,
            // establishmentMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail.establishmentMasterId,
            eps1: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1,
            eps1FromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1FromDate,
            eps1ToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.eps1ToDate,
            gratuityDividingFactor: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityDividingFactor,
            gratuityFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityFromDate,
            gratuityToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.gratuityToDate,
            saMaxPercentage: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saMaxPercentage,
            saFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saFromDate,
            saToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.saToDate,
            esic1: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1,
            esic1FromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1FromDate,
            esic1ToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.esic1ToDate,
            pfStatus: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.pfStatus,
            edliExemption: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.edliExemption,
            pfNilOptionChoice: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.pfNilOptionChoice,
            employeeCompanyContributionDiff: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeCompanyContributionDiff,
            contributionMethodChoice: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.contributionMethodChoice,
            companyContribution: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.companyContribution,
            companyFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.companyFromDate,
            companyToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.companyToDate,
            employeeContribution: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeContribution,
            employeeFromDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeFromDate,
            employeeToDate: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.employeeToDate,
            ptState: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.ptState,
            ptCity: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.ptCity,
            lwfState: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.lwfState,
            tan: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.tan,
            tdsCircle: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.tdsCircle,
            deductorStatus: this.masterGridDataList[indexOfComplianceDetail].complianceDetail.deductorStatus,
            isActive: 1
        });
        // }
        console.log(JSON.stringify(complianceDetails));
        // for (let j = 0; j < complianceDetails.length; j++) {
        this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails[0]).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess('Compliance Master & Details Activated Successfully.', '');
            _this.isEditMode = false;
            _this.getInstitutionMaster();
        }, function (error) {
            _this.alertService.sweetalertError(error['error']['status']['messsage']);
        }, function () {
            _this.resetAlllArrayAndFormField();
        });
    };
    ComplianceMasterComponent.prototype.onSelectPtState = function (evt) {
        var _this = this;
        console.log(evt);
        this.cityList = [];
        this.complianceMasterService.getListOfCityFromTheState(evt).subscribe(function (res) {
            _this.cityList = res.data.results;
        });
    };
    ComplianceMasterComponent.prototype.onSelectPtCity = function (evt) { };
    ComplianceMasterComponent.prototype.onSelectEstablishment = function (item) {
        this.selectedEstablishmentId = item;
    };
    ComplianceMasterComponent.prototype.refreshHtmlTableDataOfComplianceApplicability = function () {
        var _this = this;
        this.summaryHtmlDataListComplianceApplicability = [];
        this.complianceMasterService.getComplianceMasterSDMMapping().subscribe(function (res) {
            console.log('compliance applicability sdm', res);
            var i = 1;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    complianceSDMMappingId: element.complianceSDMMappingId,
                    complianceMasterId: element.complianceMasterId,
                    complianceApplicabilitySDMId: element.complianceApplicabilitySDMId,
                    statutoryFrequencySDMId: element.statutoryFrequencySDMId,
                    statutoryFreqPeriodsDef: element.statutoryFreqPeriodsDef,
                    deductionFrequency: element.deductionFrequency,
                    incomePeriod: element.incomePeriod
                };
                _this.summaryHtmlDataListComplianceApplicability.push(obj);
            });
        });
        console.log(this.summaryHtmlDataListComplianceApplicability);
    };
    // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/applicability compliance/
    ComplianceMasterComponent.prototype.getDropDownValuesForApplicabilityCompliance = function () {
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
    ComplianceMasterComponent.prototype.getDropDownValuesForComplianceStatutoryFrequencyFromSDM = function () {
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
    ComplianceMasterComponent.prototype.editMasterComplinaceApplicability = function (i, complianceSDMMappingId, complianceMasterId) {
        window.scrollTo(0, 0);
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
        this.isSaveAndReset1 = false;
        // this.isSaveAndReset1 = true;
        // this.showButtonSaveAndReset = false;
        this.complianceApplicationForm.reset();
        this.complianceApplicationForm.patchValue(this.summaryHtmlDataListComplianceApplicability[i]);
    };
    ComplianceMasterComponent.prototype.viewMasterComplianceApplicability = function (i, complianceSDMMappingId, complianceMasterId) {
        window.scrollTo(0, 0);
        //  this.showButtonSaveAndReset = false;
        this.complianceApplicationForm.reset();
        this.complianceApplicationForm.patchValue(this.summaryHtmlDataListComplianceApplicability[i]);
        this.complianceApplicationForm.disable();
        this.showButtonSaveAndResetComplianceApplicability = false;
        this.isSaveAndReset1 = false;
        this.showButtonSaveAndReset1 = false;
    };
    ComplianceMasterComponent.prototype.cancelViewComplianceApplicability = function () {
        this.complianceApplicationForm.reset();
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.isSaveAndReset1 = true;
        this.complianceSDMMappingIdToDelete = 0;
    };
    ComplianceMasterComponent.prototype.resetComplianceApplicability = function () {
        this.complianceApplicationForm.reset();
        this.showButtonSaveAndResetComplianceApplicability = true;
        this.isSaveAndReset1 = true;
        this.showButtonSaveAndReset1 = true;
        this.complianceSDMMappingIdToDelete = 0;
        // this.isSaveAndReset1 = false;
    };
    ComplianceMasterComponent.prototype.ConfirmationDialog = function (confirmdialog, i, complianceSDMMappingId, complianceMasterId) {
        this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
        this.modalRef = this.modalService.show(confirmdialog, Object.assign({}, { "class": 'gray modal-md' }));
    };
    ComplianceMasterComponent.prototype.clickedOnYes = function () {
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
    ComplianceMasterComponent.prototype.onSelectEmployeeSpecialRateApplicable = function (evt) {
        if (evt == '') {
            this.form.get('specialRateEMPCountPercent').controls
                .forEach(function (control) {
                control.controls.employeeCompanyContributionDiff.disable();
            });
        }
        else {
            this.form.get('specialRateEMPCountPercent').controls
                .forEach(function (control) {
                control.controls.employeeCompanyContributionDiff.enable();
            });
        }
    };
    ComplianceMasterComponent.prototype.onSelectCompanySpecialRateApplicable = function (evt) {
        if (evt == '') {
            this.form.get('specialRateCompCountPercent').controls
                .forEach(function (control) {
                control.controls.employeeCompanyContributionDiff.disable();
            });
        }
        else {
            this.form.get('specialRateCompCountPercent').controls
                .forEach(function (control) {
                control.controls.employeeCompanyContributionDiff.enable();
            });
        }
    };
    ComplianceMasterComponent = __decorate([
        core_1.Component({
            selector: 'app-compliance-master',
            templateUrl: './compliance-master.component.html',
            styleUrls: ['./compliance-master.component.scss']
        })
    ], ComplianceMasterComponent);
    return ComplianceMasterComponent;
}());
exports.ComplianceMasterComponent = ComplianceMasterComponent;
