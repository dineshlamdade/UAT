"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PayrollHeadGroupCreationComponent = exports.headDetail = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var headDetail = /** @class */ (function () {
    function headDetail() {
    }
    return headDetail;
}());
exports.headDetail = headDetail;
var PayrollHeadGroupCreationComponent = /** @class */ (function () {
    function PayrollHeadGroupCreationComponent(modalService, datePipe, formBuilder, companySettingsService, alertService) {
        this.modalService = modalService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.companySettingsService = companySettingsService;
        this.alertService = alertService;
        this.selectedSummarySourceProducts = [];
        this.disabled1 = false;
        this.sortedFrequencyList = [];
        this.activeFrequencyList = [];
        this.applicableList = [{ id: 'true', itemName: 'Yes' }, { id: 'false', itemName: 'No' }];
        this.globalHeadGroupId = 0;
        this.value4List = ['MM', 'YR'];
        this.disabled = true;
        this.tempFromDate = '';
        this.tempToDate = '';
        this.savedHeadNameList = [];
        this.originalSavedHeadNameList = [];
        this.viewSaveAndNextButton = false;
        this.viewNextButton = false;
        this.viewPrevButton = false;
        this.hideCopyFrom = false;
        this.originalHeadNameList = [];
        this.notSavedHeadList = [];
        this.notOrigianlSavedHeadList = [];
        this.headNameIndex = 0;
        this.isUpdateMode = false;
        this.headNameSize = 0;
        this.allGlobalHeadList = [];
        this.selectedCopyToList = [];
        this.attributeGroupList = [];
        this.PayrollHeadGroupList = [];
        this.beforeSavePHGName1 = '';
        this.sourceProducts = [];
        this.targetProducts = [];
        this.selectedUser = [];
        this.selectedUser2 = [];
        // AttGroupList: Array<any> = [];
        this.values = [];
        this.AttributeSelectionArray = [];
        this.headGroupIdList = [];
        //disabled: boolean = true;
        this.viewCancelButton = false;
        // hidevalue: boolean = false;
        this.viewupdateButton = false;
        this.dropdownSettings = {};
        this.dropdownList = [];
        //showflag: boolean = false;
        this.HeadNameList = [];
        this.OrigianHeadNameList = [];
        this.selectedheadName = [];
        this.FormulaArray = [];
        this.SDMArray = [];
        this.viewSaveButton = false;
        // NextheadGroupId: number;
        // value = '';
        this.NewTargetArray = [];
        this.originalSourceProductList = [];
        this.multiSelectDropDownData = [];
    }
    PayrollHeadGroupCreationComponent.prototype.ngOnInit = function () {
        this.getAllAttributeSelection();
        this.getAllPayrollHeadGroup();
        this.getAllHeadCreation();
        this.getAllFormulaList();
        this.getAllSDMList();
        this.getActiveFrequency();
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'headGroupIds',
            textField: 'standardName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.payrollHeadGroupCreationForm = this.formBuilder.group({
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            headGroupDefinitionName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('desc', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('', forms_1.Validators.required),
            copyTo: new forms_1.FormControl('')
        });
        this.form = this.formBuilder.group({
            pfFormArray: new forms_1.FormArray([]),
            pfFormArray1: new forms_1.FormArray([])
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onItemSelect = function (item) {
        this.multiSelectDropDownData.push(item);
    };
    PayrollHeadGroupCreationComponent.prototype.onItemDeSelect = function (item) {
        console.log(item);
        var index = this.multiSelectDropDownData.findIndex(function (o) { return o.headGroupIds == item.headGroupIds; });
        console.log('ind', index);
        if (index > -1) {
            this.multiSelectDropDownData.splice(index, 1);
        }
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAll = function (items) {
        var _this = this;
        items.forEach(function (element) {
            _this.multiSelectDropDownData.push(element);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onDeSelectAll = function () {
        this.multiSelectDropDownData = [];
        console.log(this.multiSelectDropDownData);
    };
    PayrollHeadGroupCreationComponent.prototype.onCloseTemplate1244 = function () {
        console.log('onCloseTemplate1244');
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.selectedCopyToList = [];
        this.multiSelectDropDownData = [];
    };
    // get All Attribute Selection(Attribute Group)
    PayrollHeadGroupCreationComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.companySettingsService.getAllAttributeSelectionByGlobal().subscribe(function (res) {
            _this.attributeGroupList = res.data.results;
        });
    };
    // get All Head List
    PayrollHeadGroupCreationComponent.prototype.getAllPayrollHeadGroup = function () {
        var _this = this;
        this.companySettingsService.getAllPayrollHeadGroupAtGlobal().subscribe(function (res) {
            _this.PayrollHeadGroupList = res.data.results;
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllFormulaList = function () {
        var _this = this;
        this.companySettingsService.getFromulaForFormulaMaster().subscribe(function (res) {
            _this.FormulaArray = res.data.results;
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllSDMList = function () {
        var _this = this;
        this.companySettingsService.getSDMFormula().subscribe(function (res) {
            _this.SDMArray = res.data.results;
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.companySettingsService.getAllHeadCreation().subscribe(function (res) {
            _this.dropdownList = res.data.results;
            _this.sourceProducts = res.data.results;
            _this.originalSourceProductList = res.data.results;
            _this.allGlobalHeadList = res.data.results;
        });
    };
    PayrollHeadGroupCreationComponent.prototype.GetPHGByIdDisable = function (headGroupDefinitionId) {
        var _this = this;
        this.savedHeadNameList = [];
        this.notSavedHeadList = [];
        this.notOrigianlSavedHeadList = [];
        this.originalSavedHeadNameList = [];
        this.hideCopyFrom = true;
        this.NewTargetArray = [];
        console.log('GetPHGByIdDisable', headGroupDefinitionId);
        this.viewupdateButton = true;
        this.headGroupDefinitionId = headGroupDefinitionId;
        this.targetProducts = []; //added new
        this.HeadNameList = [];
        this.originalHeadNameList = [];
        this.companySettingsService.getPHGByIdGlobal(headGroupDefinitionId)
            .subscribe(function (response) {
            console.log('edit', response);
            response.data.results[0].headMasters.forEach(function (element, index) {
                element.headGroupIds = response.data.results[0].headGroupIds[index];
                if (response.data.results[0].moonNumbers[index] == 100) {
                    element.red = true;
                    _this.notSavedHeadList.push(element);
                    _this.notOrigianlSavedHeadList.push(element);
                }
                if (response.data.results[0].moonNumbers[index] == 0) {
                    element.red = true;
                    _this.savedHeadNameList.push(element);
                    _this.originalSavedHeadNameList.push(element);
                }
                if (response.data.results[0].moonNumbers[index] == 1) {
                    element.green = true;
                    _this.savedHeadNameList.push(element);
                    _this.originalSavedHeadNameList.push(element);
                }
                if (response.data.results[0].moonNumbers[index] == 2) {
                    element.blue = true;
                    _this.savedHeadNameList.push(element);
                    _this.originalSavedHeadNameList.push(element);
                }
                _this.NewTargetArray.push(element);
                _this.targetProducts.push(element);
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.headMasterId !== element.headMasterId; });
            });
            _this.headNameSize = response.data.results[0].moonNumbers.length;
            _this.payrollHeadGroupCreationForm.patchValue({ headGroupDefinitionName: response.data.results[0].headGroupDefinitionName });
            _this.payrollHeadGroupCreationForm.patchValue({ description: response.data.results[0].description });
            _this.payrollHeadGroupCreationForm.patchValue({ attributeNature: response.data.results[0].attributeGroupName });
            _this.beforeSavePHGName1 = response.data.results[0].headGroupDefinitionName;
            _this.AttGrpName = response.data.results[0].attributeGroupName;
            if (_this.notSavedHeadList.length == 0) {
                _this.HeadNameList = [];
                _this.originalHeadNameList = [];
                _this.HeadNameList.forEach(function (element, index) {
                    _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== response.data.results[0].headGroupIds[index]; });
                });
            }
            // this.dropdownList = this.notOrigianlSavedHeadList;
            console.log('abc', _this.dropdownList);
            //  this.dropdownList = this.HeadNameList;
            console.log('hed', _this.HeadNameList);
        });
        // this.getAllHeadCreation();
    };
    PayrollHeadGroupCreationComponent.prototype.DeletePayrollHeadGroup = function () {
        var _this = this;
        this.companySettingsService.DeletePayrollHeadGroupGlobal(this.deletedHeadGroupDefinitionId)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllPayrollHeadGroup();
            _this.payrollHeadGroupCreationForm.reset();
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeHeadGroupDefinitionName = function (event) {
        this.beforeSavePHGName1 = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeAttributeGroupDropDown = function (event) {
        this.AttGrpName = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.RowSelected = function (u, ind) {
        var _this = this;
        this.HighlightRow = ind;
        console.log('in row selected ', u);
        var temp = this.sourceProducts;
        this.sourceProducts = new Array();
        var index = this.selectedUser.findIndex(function (o) { return o.headMasterId == u.headMasterId; });
        var isContain = this.selectedUser.some(function (o) { return o.headMasterId == u.headMasterId; });
        console.log(isContain, index);
        if (isContain == true) {
            this.selectedUser.splice(index, 1);
        }
        else {
            this.selectedUser.push(u);
        }
        this.sourceProducts = temp;
        this.sourceProducts.forEach(function (element, i) {
            if (i == _this.HighlightRow) {
                element.isHighlightright = false;
                if (isContain == true) {
                    element.isHighlight = false;
                }
                else {
                    if (i == _this.HighlightRow) {
                        element.isHighlight = true;
                    }
                }
            }
        });
    };
    PayrollHeadGroupCreationComponent.prototype.lefttablePusg = function () {
        var _this = this;
        this.selectedUser.forEach(function (element) {
            element.isHighlight = false;
            element.isHighlightright = false;
            _this.targetProducts.push(element);
        });
        var v = this.selectedUser;
        this.selectedUser.forEach(function (element) {
            var index = _this.sourceProducts.indexOf(element);
            _this.selectedUser = [];
            if (index > -1) {
                _this.sourceProducts.splice(index, 1);
            }
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onlyChangeTableData = function (headGroupIds) {
        var _this = this;
        this.companySettingsService.getByPayrollHeadGroupIdAllRecords(headGroupIds).subscribe(function (res) {
            console.log(JSON.stringify(res));
            for (var i = 0; i < res.data.results[0].length; i++) {
                //   console.log( 'cccc', res.data.results[0][i].attributeMaster[0].options );
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0);
                }
                else {
                    for (var j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        if (j == 0) {
                            _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                        }
                        else {
                            console.log('cccc', res.data.results[0][i].attributeMaster[0].options);
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        }
                    }
                }
            }
        }, function (error) { });
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAttributeAssignmentWithMultipleParameter = function (headGroupIds) {
        var _this = this;
        this.companySettingsService.getByPayrollHeadGroupIdAllRecords(headGroupIds).subscribe(function (res) {
            console.log(JSON.stringify(res));
            for (var i = 0; i < res.data.results[0].length; i++) {
                console.log('globalPayrollHeadGroupId', res.data.results[0][i].globalPayrollHeadGroupId);
                console.log('cccc', res.data.results[0][i].attributeMaster[0].options);
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].optionList, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0);
                }
                else {
                    for (var j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        // if ( j == 0 ) {
                        //   console.log( 'cc2', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId );
                        //   this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].optionList, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
                        // } else {
                        //   console.log( 'cc2', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId );
                        //   this.addPfArrayWithExistingValues( true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
                        //   //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        // }
                        if (j == 0) {
                            console.log('ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                        }
                        else {
                            console.log('ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        }
                    }
                }
                if (i == 0) {
                    console.log('in i ', res.data.results[0][i].headMaster.headMasterId, res.data.results[0][i].headMaster.standardName, res.data.results[0][i].headMaster.headNature);
                    _this.headMasterId = res.data.results[0][i].headMaster.headMasterId;
                    _this.HeadName = res.data.results[0][i].headMaster.standardName;
                    _this.selectedHeadGroupIds = headGroupIds;
                    _this.Nature = res.data.results[0][i].headMaster.headNature;
                }
            }
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup(headGroupIds);
                _this.viewSaveButton = true;
            }
        }, function () {
            _this.viewSaveButton = false;
        });
        this.selectedHeadGroupIds = headGroupIds;
        console.log('in if', this.targetProducts);
        this.HeadNameList = this.originalHeadNameList;
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== headGroupIds; });
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAttributeAssignment = function (u, i) {
        var _this = this;
        console.log(u);
        this.headNameIndex = this.targetProducts.findIndex(function (o) { return o.headGroupIds == u.headGroupIds; });
        this.selectedCopyToList = [];
        this.multiSelectDropDownData = [];
        var index = this.targetProducts.findIndex(function (o) { return o.headGroupIds == u.headGroupIds; });
        this.headNameIndex = index + 1;
        this.companySettingsService.getByPayrollHeadGroupIdAllRecords(u.headGroupIds).subscribe(function (res) {
            var data = res.data.results[0];
            for (var i_1 = 0; i_1 < res.data.results[0].length; i_1++) {
                console.log('globalPayrollHeadGroupId', res.data.results[0][i_1].globalPayrollHeadGroupId);
                console.log('cccc', data[i_1].attributeMaster[0].options);
                if (data[i_1].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithExistingValues(data[i_1].applicable, data[i_1].attributeMaster[0].attributeNature, data[i_1].attributeMaster[0].code, data[i_1].attributeMaster[0].attributeMasterId, data[i_1].globalAttributeGroupId, data[i_1].attributeMaster[0].options, data[i_1].value, data[i_1].fromDate, data[i_1].toDate, '', '', '', '', false, res.data.results[0][i_1].globalPayrollHeadGroupId, 0);
                }
                if (data[i_1].payrollHeadGroupAttributeValueMapping.length !== 0) {
                    console.log('cc1', data[i_1].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId);
                    for (var j = 0; j < data[i_1].payrollHeadGroupAttributeValueMapping.length; j++) {
                        console.log('cc2', data[i_1].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId);
                        if (j == 0) {
                            _this.addPfArrayWithExistingValues(data[i_1].applicable, data[i_1].attributeMaster[0].attributeNature, data[i_1].attributeMaster[0].code, data[i_1].attributeMaster[0].attributeMasterId, data[i_1].globalAttributeGroupId, data[i_1].attributeMaster[0].options, data[i_1].value, data[i_1].fromDate, data[i_1].toDate, data[i_1].payrollHeadGroupAttributeValueMapping[j].value1, data[i_1].payrollHeadGroupAttributeValueMapping[j].value2, data[i_1].payrollHeadGroupAttributeValueMapping[j].value3, data[i_1].payrollHeadGroupAttributeValueMapping[j].value4, true, data[i_1].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i_1].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            //    applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number
                        }
                        else {
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', data[i_1].attributeMaster[0].attributeMasterId, data[i_1].globalAttributeGroupId, null, 'Range', data[i_1].payrollHeadGroupAttributeValueMapping[j].fromDate, data[i_1].payrollHeadGroupAttributeValueMapping[j].toDate, data[i_1].payrollHeadGroupAttributeValueMapping[j].value1, data[i_1].payrollHeadGroupAttributeValueMapping[j].value2, data[i_1].payrollHeadGroupAttributeValueMapping[j].value3, data[i_1].payrollHeadGroupAttributeValueMapping[j].value4, false, data[i_1].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i_1].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        }
                    }
                }
            }
            _this.viewSaveButton = false;
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup(u.headGroupIds);
                _this.viewSaveButton = true;
            }
        });
        this.selectedHeadGroupIds = u.headGroupIds;
        this.HeadNameList = this.originalHeadNameList;
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== u.headGroupIds; });
        });
        this.savedHeadNameList = this.originalSavedHeadNameList;
        this.savedHeadNameList.forEach(function (element) {
            _this.savedHeadNameList = _this.savedHeadNameList.filter(function (e) { return e.headGroupIds !== u.headGroupIds; });
        });
        this.dropdownList = this.HeadNameList;
        this.headMasterId = u.headMasterId;
        this.HeadName = u.standardName;
        this.Nature = u.headNature;
    };
    PayrollHeadGroupCreationComponent.prototype.onlySelectedHeadGroupIds = function (headGroupIds) {
        var _this = this;
        console.log('called me');
        this.headNameIndex = this.targetProducts.findIndex(function (o) { return o.headGroupIds == headGroupIds; });
        this.selectedCopyToList = [];
        this.multiSelectDropDownData = [];
        this.headNameIndex = this.targetProducts.findIndex(function (o) { return o.headGroupIds == headGroupIds; });
        this.companySettingsService.getByPayrollHeadGroupIdAllRecords(headGroupIds).subscribe(function (res) {
            console.log('imp', res);
            var data = res.data.results[0];
            for (var i = 0; i < data.length; i++) {
                console.log('cccc', data[i].attributeMaster[0].options);
                if (data[i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithExistingValues(data[i].applicable, data[i].attributeMaster[0].attributeNature, data[i].attributeMaster[0].code, data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, data[i].attributeMaster[0].options, data[i].value, data[i].fromDate, data[i].toDate, '', '', '', '', false, data[i].globalPayrollHeadGroupId, 0);
                }
                if (data[i].payrollHeadGroupAttributeValueMapping.length !== 0) {
                    for (var j = 0; j < data[i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        if (j == 0) {
                            _this.addPfArrayWithExistingValues(data[i].applicable, data[i].attributeMaster[0].attributeNature, data[i].attributeMaster[0].code, data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, data[i].attributeMaster[0].options, data[i].value, data[i].fromDate, data[i].toDate, data[i].payrollHeadGroupAttributeValueMapping[j].value1, data[i].payrollHeadGroupAttributeValueMapping[j].value2, data[i].payrollHeadGroupAttributeValueMapping[j].value3, data[i].payrollHeadGroupAttributeValueMapping[j].value4, true, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                        }
                        else {
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, null, 'Range', data[i].payrollHeadGroupAttributeValueMapping[j].fromDate, data[i].payrollHeadGroupAttributeValueMapping[j].toDate, data[i].payrollHeadGroupAttributeValueMapping[j].value1, data[i].payrollHeadGroupAttributeValueMapping[j].value2, data[i].payrollHeadGroupAttributeValueMapping[j].value3, data[i].payrollHeadGroupAttributeValueMapping[j].value4, false, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                        }
                    }
                }
            }
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup(headGroupIds);
                _this.viewSaveButton = true;
            }
        });
        this.selectedHeadGroupIds = headGroupIds;
        this.HeadNameList = this.originalHeadNameList;
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== headGroupIds; });
        });
        this.savedHeadNameList = this.originalSavedHeadNameList;
        this.savedHeadNameList.forEach(function (element) {
            _this.savedHeadNameList = _this.savedHeadNameList.filter(function (e) { return e.headGroupIds !== headGroupIds; });
        });
        this.dropdownList = this.HeadNameList;
        this.headMasterId = this.targetProducts[this.headNameIndex].headMasterId;
        this.HeadName = this.targetProducts[this.headNameIndex].standardName;
        this.Nature = this.targetProducts[this.headNameIndex].headNature;
    };
    PayrollHeadGroupCreationComponent.prototype.RowSelectedtargetProducts = function (u, i) {
        console.log(u);
        if (u.disabled == true) {
        }
        else {
            this.HighlightRight = i;
            var indexOfTargetProd = this.targetProducts.findIndex(function (o) { return o.headMasterId == u.headMasterId; });
            var index = this.selectedUser2.findIndex(function (o) { return o.headMasterId == u.headMasterId; });
            var isContain = this.selectedUser2.some(function (o) { return o.headMasterId == u.headMasterId; });
            console.log(isContain, index);
            if (isContain == true) {
                this.targetProducts[indexOfTargetProd].isHighlightright = false;
                this.selectedUser2.splice(index, 1);
                this.selectedheadName.splice(index, 1);
            }
            else {
                this.targetProducts[indexOfTargetProd].isHighlightright = true;
                this.selectedUser2.push(u);
                this.selectedheadName.push(u);
            }
        }
    };
    PayrollHeadGroupCreationComponent.prototype.SaveNext = function (selectedHeadGroupIds) {
        var _this = this;
        this.globalHeadGroupId = 0;
        // this.AttGroupList = [];
        this.selectedCopyToList = [];
        this.multiSelectDropDownData = [];
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
        this.form = this.formBuilder.group({
            pfFormArray: new forms_1.FormArray([])
        });
        this.savedHeadNameList = this.originalSavedHeadNameList;
        this.savedHeadNameList.forEach(function (element) {
            _this.savedHeadNameList = _this.savedHeadNameList.filter(function (e) { return e.headGroupIds !== selectedHeadGroupIds; });
        });
        this.HeadNameList = this.originalHeadNameList;
        console.log('HeadNameList', this.HeadNameList);
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== _this.selectedHeadGroupIds; });
        });
        console.log('savedHeadNameList', this.savedHeadNameList);
        var index = this.targetProducts.findIndex(function (o) { return o.headGroupIds == selectedHeadGroupIds; });
        this.headNameIndex = index;
        if (index < this.targetProducts.length - 1) {
            //   this.NextheadGroupId = this.targetProducts[index + 1].headMasterId;
            this.headMasterId = this.targetProducts[index + 1].headMasterId;
            this.HeadName = this.targetProducts[index + 1].standardName;
            this.selectedHeadGroupIds = this.targetProducts[index + 1].headGroupIds;
            this.Nature = this.targetProducts[index + 1].headNature;
        }
        else {
            alert('1234');
        }
        this.onSelectAttributeAssignment(this.selectedHeadGroupIds, 0);
    };
    PayrollHeadGroupCreationComponent.prototype.righttablePusg = function () {
        var _this = this;
        console.log('righttablePusg');
        this.selectedUser2.forEach(function (element) {
            element.isHighlight = false;
            element.isHighlightright = false;
            _this.sourceProducts.push(element);
        });
        var v = this.selectedUser;
        this.selectedUser2.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element);
            _this.selectedUser2 = [];
            if (index > -1) {
                _this.targetProducts.splice(index, 1);
            }
        });
    };
    PayrollHeadGroupCreationComponent.prototype.UpdatePHGById = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.headMasters = [];
        this.NewTargetArray.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element);
            _this.targetProducts = _this.targetProducts.filter(function (e) { return e.headMasterId !== element.headMasterId; });
        });
        console.log(this.targetProducts);
        this.targetProducts.forEach(function (f) {
            var headDetail = Object.assign({});
            headDetail.headMasterId = f.headMasterId;
            addAttributeCreation.headMasters.push(headDetail);
        });
        addAttributeCreation.globalHeadGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
        addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
        addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
        if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {
            console.log(JSON.stringify(addAttributeCreation));
            this.companySettingsService.UpdatePHGByIdGlobal(this.headGroupDefinitionId, addAttributeCreation).subscribe(function (res) {
                console.log('UpdatePHGByIdGlobal', res);
                addAttributeCreation.headMasters = [];
                _this.targetProducts = [];
                _this.viewCancelButton = false;
                _this.viewupdateButton = false;
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllPayrollHeadGroup();
                // this.hidevalue = false;
                _this.payrollHeadGroupCreationForm.reset();
            }, function (error) {
                console.log(error);
            });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.copyFrommPayrollHeadGroup = function (event) {
        var _this = this;
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
        this.form = this.formBuilder.group({
            pfFormArray: new forms_1.FormArray([])
        });
        if (event.target.value == '') {
            this.headNameIndex = this.targetProducts.findIndex(function (o) { return o.headGroupIds == _this.selectedHeadGroupIds; });
            this.onlySelectedHeadGroupIds(this.selectedHeadGroupIds);
        }
        else {
            this.headNameIndex = this.targetProducts.findIndex(function (o) { return o.headGroupIds == event.target.value; });
            this.globalHeadGroupId = event.target.value;
            this.onlyChangeTableData(event.target.value);
        }
    };
    PayrollHeadGroupCreationComponent.prototype.getAllAttributeListByAttGroup = function (headGroupIds) {
        var _this = this;
        console.log('in getAllAttributeListByAttGroup attGrpName', this.AttGrpName);
        // this.AttGroupList = [];
        this.companySettingsService.GetHeadGroupByGetGlobalPHGByNameWithHeadId(this.AttGrpName, headGroupIds).subscribe(function (res) {
            //    this.AttGroupList = res.data.results[0].attributeMasters;
            res.data.results[0].attributeMasters.forEach(function (element, index) {
                element.attributeGroupIds = res.data.results[0].attributeGroupIds[index];
                _this.addPfArray(element);
            });
        });
    };
    // UpdateAttributeAssign1(): void {
    //   let s = [];
    //   const formData = this.form.getRawValue();
    //   console.log( this.form.get( 'pfFormArray' ).value[0].fromDate );
    //   console.log( this.datePipe.transform( this.form.get( 'pfFormArray' ).value[0].toDate, 'yyyy-MM-dd' ) );
    //   for ( let i = 0; i < this.pfArray.length; i++ ) {
    //     s.push( {
    //       Applicability: this.form.get( 'pfFormArray' ).value[i].Applicability,
    //       fromDate: this.datePipe.transform( this.form.get( 'pfFormArray' ).value[0].fromDate, 'yyyy-MM-dd' ),
    //       toDate: this.datePipe.transform( this.form.get( 'pfFormArray' ).value[0].toDate, 'yyyy-MM-dd' ),
    //       value: this.form.get( 'pfFormArray' ).value[i].value,
    //       value1: this.form.get( 'pfFormArray' ).value[i].value1,
    //       value2: this.form.get( 'pfFormArray' ).value[i].value2,
    //       value3: this.form.get( 'pfFormArray' ).value[i].value3,
    //       value4: this.form.get( 'pfFormArray' ).value[i].value4,
    //     } );
    //   }
    //   console.log( JSON.stringify( s ) );
    // }
    PayrollHeadGroupCreationComponent.prototype.saveAtttibuteAssign1 = function () {
        console.log('empty function');
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeToDate = function (event, i) { };
    PayrollHeadGroupCreationComponent.prototype.onChangeFromDate = function (event, i) {
        // if ( this.isUpdateMode == false ) {
        //   this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( null );
        //   if ( this.datePipe.transform( this.f.pfFormArray.value[i].fromDate, 'yyyy-MM-dd' ) != undefined ) {
        //     this.form.get( 'pfFormArray' )['controls'][i].controls['minDate1'].setValue( new Date( this.f.pfFormArray.value[i].fromDate ) );
        //   }
        // }
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeRangeFrom = function (evt, i) {
        console.log(this.form.get('pfFormArray')['controls'][i].controls['value1'].value);
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeRangeTo = function (evt, i) {
        console.log(this.form.get('pfFormArray')['controls'][i].controls['value2'].value);
        if ((this.form.get('pfFormArray')['controls'][i].controls['value2'].value) > (this.form.get('pfFormArray')['controls'][i].controls['value1'].value)) {
            console.log('err');
        }
        else {
            this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
        }
    };
    PayrollHeadGroupCreationComponent.prototype.OntoDateChange = function (event) {
        this.fromDate = this.datePipe.transform(event, 'yyyy-MM-dd');
        this.minDate1 = event;
        // this.AttGroupList.forEach( element => {
        //   element.fromDate = this.fromDate;
        // } );
    };
    PayrollHeadGroupCreationComponent.prototype.OntoDateChangeEvent = function (event) {
        this.toDate = this.datePipe.transform(event, 'yyyy-MM-dd');
        // this.AttGroupList.forEach( element => {
        //   element.toDate = this.toDate;
        // } );
    };
    //add Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.addPayrollHeadGroup = function () {
        var _this = this;
        console.log('addPayrollHeadGroup');
        var addAttributeCreation = Object.assign({});
        console.log(JSON.stringify(addAttributeCreation));
        addAttributeCreation.headMasters = [];
        this.targetProducts.forEach(function (f) {
            var headDetail = Object.assign({});
            headDetail.headMasterId = f.headMasterId;
            addAttributeCreation.headMasters.push(headDetail);
        });
        addAttributeCreation.globalHeadGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
        addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
        addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
        addAttributeCreation.countryId = 1;
        addAttributeCreation.createdBy = 'Nisha';
        addAttributeCreation.isActive = true;
        console.log(JSON.stringify(addAttributeCreation));
        if (this.viewupdateButton == false) {
            this.companySettingsService.AddPayrollHeadGroupAtGlobal(addAttributeCreation).subscribe(function (res) {
                console.log(res.data.results[0].headGroupDefinitionId);
                addAttributeCreation.headMasters = [];
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllPayrollHeadGroup();
                _this.hideCopyFrom = true;
                _this.GetPHGByIdDisable(res.data.results[0].headGroupDefinitionId);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            addAttributeCreation.headGroupDefinitionId = this.headGroupDefinitionId;
            console.log('in put method');
            console.log(addAttributeCreation.headGroupDefinitionId);
            console.log(JSON.stringify(addAttributeCreation));
            this.companySettingsService.UpdatePayrollHeadGroupAtGlobal(addAttributeCreation.headGroupDefinitionId, addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.headMasters = [];
                _this.targetProducts = [];
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllPayrollHeadGroup();
                _this.getAllHeadCreation();
                _this.payrollHeadGroupCreationForm.reset();
            }, function (error) {
                console.log(error);
            });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeCopyFromPHG_Name = function (phgName) {
        var _this = this;
        this.sourceProducts = [];
        this.sourceProducts = this.originalSourceProductList;
        if (phgName == '') {
            this.targetProducts = [];
        }
        else {
            this.NewTargetArray = [];
            this.targetProducts = [];
            this.OrigianHeadNameList = [];
            this.companySettingsService.GetAttributeOptionListByGlobal(phgName).subscribe(function (res) {
                console.log('onChangeCopyFromPHG_Name function ', res);
                res.data.results[0].headMasters.forEach(function (element, index) {
                    element.headGroupIds = res.data.results[0].headGroupIds[index];
                    element.disabled = true;
                    _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.headMasterId !== element.headMasterId; });
                    _this.NewTargetArray.push(element);
                    _this.targetProducts.push(element);
                    _this.OrigianHeadNameList.push(element);
                });
                _this.headNameSize = _this.HeadNameList.length;
            });
            this.targetProducts.forEach(function (element) {
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.headMasterId !== element.headMasterId; });
            });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.addPfArrayWithHistoryValues = function (applicable, attributeNature, code, attributeMasterId, attributeGroupIds, options, value, fromDate, toDate, value1, value2, value3, value4, isPlusSignVisible, globalPayrollHeadGroupId, payrollHeadGroupAttributeValueMappingId) {
        console.log('ddd', payrollHeadGroupAttributeValueMappingId);
        if (attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period') {
            this.pfArray1.push(this.formBuilder.group({
                Applicability: ['false'],
                value: ['Range'],
                value1: [value1, forms_1.Validators.required],
                value2: [value2, forms_1.Validators.required],
                value3: [value3, forms_1.Validators.required],
                value4: [value4, forms_1.Validators.required],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate)],
                toDate: [toDate == null ? '' : new Date(toDate)],
                options: [options],
                isPlusSignVisible: [true],
                attributeMasterId: [{ value: attributeMasterId }],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId]
            }));
            if (!isPlusSignVisible) {
                this.form.get('pfFormArray1')['controls'][this.pfArray1.length - 1].controls['Applicability'].disable();
                this.form.get('pfFormArray1')['controls'][this.pfArray1.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray1')['controls'][this.pfArray1.length - 1].controls['toDate'].disable();
            }
        }
        else if (attributeNature == 'Range Value Per Instance') {
            this.pfArray1.push(this.formBuilder.group({
                Applicability: ['false'],
                value: ['Range'],
                value1: [value1, forms_1.Validators.required],
                value2: [value2, forms_1.Validators.required],
                value3: [null],
                value4: [null],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate)],
                toDate: [toDate == null ? '' : new Date(toDate)],
                options: [options],
                isPlusSignVisible: [false],
                attributeMasterId: [{ value: attributeMasterId }],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId]
            }));
        }
        else {
            this.pfArray1.push(this.formBuilder.group({
                Applicability: [applicable],
                value: [value],
                value1: [value1],
                value2: [value2],
                value3: [value3],
                value4: [value4],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate)],
                toDate: [toDate == null ? '' : new Date(toDate)],
                options: [options],
                isPlusSignVisible: [isPlusSignVisible],
                attributeMasterId: [{ value: attributeMasterId }],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId]
            }));
        }
    };
    PayrollHeadGroupCreationComponent.prototype.addPfArrayWithExistingValues = function (applicable, attributeNature, code, attributeMasterId, attributeGroupIds, options, value, fromDate, toDate, value1, value2, value3, value4, isPlusSignVisible, globalPayrollHeadGroupId, payrollHeadGroupAttributeValueMappingId) {
        console.log('globalPayrollHeadGroupId', globalPayrollHeadGroupId);
        if (attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: ['true'],
                value: ['Range'],
                value1: [value1, forms_1.Validators.required],
                value2: [value2, forms_1.Validators.required],
                value3: [value3, forms_1.Validators.required],
                value4: [value4, forms_1.Validators.required],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate)],
                toDate: [toDate == null ? '' : new Date(toDate)],
                options: [options],
                isPlusSignVisible: [true],
                attributeMasterId: [{ value: attributeMasterId }],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId]
            }));
            if (!isPlusSignVisible) {
                //    this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['Applicability'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['toDate'].disable();
            }
        }
        else if (attributeNature == 'Range Value Per Instance') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: ['true'],
                value: ['Range'],
                value1: [value1, forms_1.Validators.required],
                value2: [value2, forms_1.Validators.required],
                value3: [null],
                value4: [''],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate)],
                toDate: [toDate == null ? '' : new Date(toDate)],
                options: [options],
                isPlusSignVisible: [false],
                attributeMasterId: [{ value: attributeMasterId }],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        else {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [applicable],
                value: [value],
                value1: [value1],
                value2: [value2],
                value3: [value3],
                value4: [value4],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate)],
                toDate: [toDate == null ? '' : new Date(toDate)],
                options: [options],
                isPlusSignVisible: [isPlusSignVisible],
                attributeMasterId: [{ value: attributeMasterId }],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
    };
    PayrollHeadGroupCreationComponent.prototype.addPfArray = function (ele) {
        console.log('called addPfArray', ele.options);
        console.log('attribute nature', ele.attributeNature);
        if (ele.attributeNature == 'Range Value No Of Instances Per Period' || ele.attributeNature == 'Range Value Per Period') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [true],
                value: ['Range'],
                value1: ['', forms_1.Validators.required],
                value2: ['', forms_1.Validators.required],
                value3: ['', forms_1.Validators.required],
                value4: ['', forms_1.Validators.required],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: [''],
                toDate: [new Date('31-Dec-9999')],
                options: [ele.options],
                isPlusSignVisible: [true],
                attributeMasterId: [{ value: ele.attributeMasterId }],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0]
            }));
        }
        else if (ele.attributeNature == 'Range Value Per Instance') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: ['true'],
                value: ['Range'],
                value1: ['', forms_1.Validators.required],
                value2: ['', forms_1.Validators.required],
                value3: [{ value: '', disabled: true }],
                value4: [{ value: '', disabled: true }],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: [''],
                toDate: [new Date('31-Dec-9999')],
                options: [ele.options],
                isPlusSignVisible: [false],
                attributeMasterId: [{ value: ele.attributeMasterId }],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0]
            }));
        }
        else {
            this.pfArray.push(this.formBuilder.group({
                Applicability: ['true'],
                value: [null],
                value1: [{ value: '', disabled: true }],
                value2: [{ value: '', disabled: true }],
                value3: [{ value: '', disabled: true }],
                value4: [{ value: '', disabled: true }],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: [''],
                toDate: [new Date('31-Dec-9999')],
                options: [ele.options],
                isPlusSignVisible: [false],
                attributeMasterId: [{ value: ele.attributeMasterId }],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0]
            }));
        }
    };
    PayrollHeadGroupCreationComponent.prototype.removeContactPerson = function (i) {
        this.pfArray.removeAt(i);
    };
    Object.defineProperty(PayrollHeadGroupCreationComponent.prototype, "pfArray", {
        get: function () { return this.f.pfFormArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PayrollHeadGroupCreationComponent.prototype, "pfArray1", {
        get: function () { return this.f.pfFormArray1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PayrollHeadGroupCreationComponent.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    PayrollHeadGroupCreationComponent.prototype.resetPFArrayForm = function () {
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
        this.form.reset();
        this.pfArray.push(this.formBuilder.group({}));
    };
    PayrollHeadGroupCreationComponent.prototype.addRow = function (i, attributeMasterId, value4) {
        var count = 0;
        for (var k = 0; k < this.pfArray.length; k++) {
            //  console.log( attributeMasterId )
            // console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['attributeMasterId'].value );
            console.log(this.form.get('pfFormArray')['controls'][k].controls['attributeMasterId']["value"].value);
            if (this.form.get('pfFormArray')['controls'][k].controls['attributeMasterId1'].value == attributeMasterId) {
                console.log('in for loop', k);
                count++;
            }
        }
        var newIndex = (i + count) - 1;
        console.log();
        console.log('attributeMasterId', attributeMasterId);
        var setsFormArray = this.form.get('pfFormArray');
        setsFormArray.insert(newIndex, this.formBuilder.group({
            Applicability: [{ value: 'true', disabled: true }],
            value: [],
            value1: ['', forms_1.Validators.required],
            value2: ['', forms_1.Validators.required],
            value3: ['', forms_1.Validators.required],
            value4: [value4],
            code: [''],
            attributeNature: ['Range Value Per Period'],
            applicableList: [{ value: '', disabled: true }],
            fromDate: [{ value: null, disabled: true }],
            toDate: [{ value: null, disabled: true }],
            options: [''],
            isPlusSignVisible: [false],
            attributeMasterId: [{ value: attributeMasterId }],
            attributeMasterId1: [attributeMasterId],
            attributeGroupIds: [0],
            minDate1: [null],
            globalPayrollHeadGroupId: [0],
            payrollHeadGroupAttributeValueMappingId: [0]
        }));
        this.form.get('pfFormArray')['controls'][i].controls['value4'].disable();
    };
    PayrollHeadGroupCreationComponent.prototype.deleteRow = function () {
        this.form.get('pfFormArray').removeAt(this.rowNumberToDelete);
    };
    PayrollHeadGroupCreationComponent.prototype.TestJsonObject1 = function () {
        var _this = this;
        this.disabled1 = true;
        console.log(this.multiSelectDropDownData.length);
        if (this.globalHeadGroupId !== 0 && this.multiSelectDropDownData.length == 0) {
            console.log('in if  1');
            var saveObj_1 = [];
            console.log(JSON.stringify(this.f.pfFormArray.value));
            var addData = Object.assign({});
            console.log(JSON.stringify(addData));
            var data_1;
            var attributeMasterId_1 = 0;
            var fromDate1_1;
            var toDate1_1;
            this.f.pfFormArray.value.forEach(function (element) {
                console.log(element.Applicability);
                if (element.attributeMasterId1 == attributeMasterId_1) {
                    data_1.payrollHeadGroupAttributeValueMapping.push({
                        // payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
                        fromDate: fromDate1_1,
                        toDate: toDate1_1,
                        value1: element.value1,
                        value2: element.value2,
                        value3: element.value3,
                        value4: element.value4
                    });
                }
                else {
                    data_1 = Object.assign({});
                    data_1.payrollHeadGroupAttributeValueMapping = [];
                    data_1.globalPayrollHeadGroupId = _this.selectedHeadGroupIds;
                    attributeMasterId_1 = element.attributeMasterId1;
                    data_1.applicable = element.Applicability;
                    data_1.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                    data_1.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    data_1.globalAttributeGroupId = element.attributeGroupIds;
                    data_1.globalHeadGroupId = _this.selectedHeadGroupIds;
                    data_1.value = element.value;
                    if (element.Applicability == undefined) {
                        data_1.applicable = true;
                    }
                    if (element.Applicability == false) {
                        data_1.value = null;
                    }
                    if (element.value == undefined || element.value == 'null') {
                        data_1.value = null;
                    }
                    if (element.value == 'Range') {
                        data_1.applicable = true;
                        data_1.payrollHeadGroupAttributeValueMapping.push({
                            fromDate: _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd'),
                            toDate: _this.datePipe.transform(element.toDate, 'yyyy-MM-dd'),
                            value1: element.value1,
                            value2: element.value2,
                            value3: element.value3,
                            value4: element.value4
                        });
                        fromDate1_1 = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        toDate1_1 = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    }
                    saveObj_1.push(data_1);
                }
            });
            console.log('hhhh', this.selectedHeadGroupIds);
            console.log(JSON.stringify(saveObj_1));
            var a = JSON.stringify(saveObj_1);
            if (saveObj_1[0].globalPayrollHeadGroupId > 0) {
                console.log('inn update');
                this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(saveObj_1).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                    _this.globalHeadGroupId = 0;
                }, function (error) {
                    console.log('err', error);
                });
            }
            // else {
            //   console.log( 'in add' );
            //   this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {
            //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
            //     saveObj = [];
            //     this.GetPHGByIdDisable( this.headGroupDefinitionId );
            //   },
            //     ( error: any ) => {
            //       console.log( 'err', error );
            //     } );
            // }
        }
        else if (this.multiSelectDropDownData.length > 0) {
            console.log('in if  2');
            var _loop_1 = function (m) {
                var saveObj = [];
                console.log(JSON.stringify(this_1.f.pfFormArray.value));
                var addData = Object.assign({});
                console.log(JSON.stringify(addData));
                var data;
                var attributeMasterId = 0;
                var fromDate1;
                var toDate1;
                this_1.f.pfFormArray.value.forEach(function (element) {
                    console.log(element.Applicability);
                    if (element.attributeMasterId1 == attributeMasterId) {
                        data.payrollHeadGroupAttributeValueMapping.push({
                            //   payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
                            fromDate: fromDate1,
                            toDate: toDate1,
                            value1: element.value1,
                            value2: element.value2,
                            value3: element.value3,
                            value4: element.value4
                        });
                    }
                    else {
                        data = Object.assign({});
                        data.payrollHeadGroupAttributeValueMapping = [];
                        data.globalPayrollHeadGroupId = element.globalPayrollHeadGroupId;
                        attributeMasterId = element.attributeMasterId1;
                        data.applicable = element.Applicability;
                        data.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        data.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                        data.globalAttributeGroupId = element.attributeGroupIds;
                        data.globalHeadGroupId = _this.multiSelectDropDownData[m].headGroupIds;
                        data.value = element.value;
                        if (element.Applicability == undefined) {
                            data.applicable = true;
                        }
                        if (element.Applicability == false) {
                            data.value = null;
                        }
                        if (element.value == undefined || element.value == 'null') {
                            data.value = null;
                        }
                        if (element.value == 'Range') {
                            data.applicable = true;
                            data.payrollHeadGroupAttributeValueMapping.push({
                                fromDate: _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd'),
                                toDate: _this.datePipe.transform(element.toDate, 'yyyy-MM-dd'),
                                value1: element.value1,
                                value2: element.value2,
                                value3: element.value3,
                                value4: element.value4
                            });
                            fromDate1 = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                            toDate1 = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                        }
                        saveObj.push(data);
                    }
                });
                console.log('hhhh', this_1.selectedHeadGroupIds);
                console.log(JSON.stringify(saveObj));
                var a = JSON.stringify(saveObj);
                console.log('inn update');
                this_1.companySettingsService.putPayrollHeadAttributeMappingAddGlobal(saveObj).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                }, function (error) {
                    console.log('err', error);
                });
            };
            var this_1 = this;
            for (var m = 0; m < this.multiSelectDropDownData.length; m++) {
                _loop_1(m);
            }
        }
        else {
            console.log('in if  3');
            var saveObj_2 = [];
            console.log(JSON.stringify(this.f.pfFormArray.value));
            var addData = Object.assign({});
            console.log(JSON.stringify(addData));
            var data_2;
            var attributeMasterId_2 = 0;
            var fromDate1_2;
            var toDate1_2;
            this.f.pfFormArray.value.forEach(function (element) {
                console.log(element.Applicability);
                if (element.attributeMasterId1 == attributeMasterId_2) {
                    data_2.payrollHeadGroupAttributeValueMapping.push({
                        payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
                        fromDate: fromDate1_2,
                        toDate: toDate1_2,
                        value1: element.value1,
                        value2: element.value2,
                        value3: element.value3,
                        value4: element.value4
                    });
                }
                else {
                    data_2 = Object.assign({});
                    data_2.payrollHeadGroupAttributeValueMapping = [];
                    data_2.globalPayrollHeadGroupId = element.globalPayrollHeadGroupId;
                    attributeMasterId_2 = element.attributeMasterId1;
                    data_2.applicable = element.Applicability;
                    data_2.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                    data_2.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    data_2.globalAttributeGroupId = element.attributeGroupIds;
                    data_2.globalHeadGroupId = _this.selectedHeadGroupIds;
                    data_2.value = element.value;
                    if (element.Applicability == undefined) {
                        data_2.applicable = true;
                    }
                    if (element.Applicability == false) {
                        data_2.value = null;
                    }
                    if (element.value == undefined || element.value == 'null') {
                        // data.value = null;
                        data_2.value = null;
                    }
                    if (element.value == 'Range') {
                        data_2.applicable = true;
                        data_2.payrollHeadGroupAttributeValueMapping.push({
                            fromDate: _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd'),
                            toDate: _this.datePipe.transform(element.toDate, 'yyyy-MM-dd'),
                            value1: element.value1,
                            value2: element.value2,
                            value3: element.value3,
                            value4: element.value4,
                            payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId
                        });
                        fromDate1_2 = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        toDate1_2 = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    }
                    saveObj_2.push(data_2);
                }
            });
            console.log('hhhh', this.selectedHeadGroupIds);
            console.log(JSON.stringify(saveObj_2));
            var a = JSON.stringify(saveObj_2);
            if (data_2.globalPayrollHeadGroupId > 0) {
                console.log('inn update');
                this.companySettingsService.putPayrollHeadAttributeMappingAddGlobal(saveObj_2).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                }, function (error) {
                    console.log('errr', error);
                });
            }
            else {
                console.log('in add');
                this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(saveObj_2).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                }, function (error) {
                    console.log(error);
                });
            }
        }
        //this.SaveNext( this.selectedHeadGroupIds );
    };
    PayrollHeadGroupCreationComponent.prototype.Next = function (selectedHeadGroupIds) {
        var _this = this;
        this.selectedCopyToList = [];
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
        this.form = this.formBuilder.group({
            pfFormArray: new forms_1.FormArray([])
        });
        this.savedHeadNameList = this.originalSavedHeadNameList;
        this.savedHeadNameList.forEach(function (element) {
            _this.savedHeadNameList = _this.savedHeadNameList.filter(function (e) { return e.headGroupIds !== selectedHeadGroupIds; });
        });
        var index = this.targetProducts.findIndex(function (o) { return o.headGroupIds == selectedHeadGroupIds; });
        if (index < this.targetProducts.length - 1) {
            this.headNameIndex = index + 1;
            this.headMasterId = this.targetProducts[index + 1].headMasterId;
            this.HeadName = this.targetProducts[index + 1].standardName;
            this.selectedHeadGroupIds = this.targetProducts[index + 1].headGroupIds;
            this.Nature = this.targetProducts[index + 1].headNature;
            this.viewSaveButton = true;
        }
        else {
            alert('ss');
        }
        this.HeadNameList = this.OrigianHeadNameList;
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== _this.selectedHeadGroupIds; });
        });
        this.onSelectAttributeAssignmentWithMultipleParameter(this.selectedHeadGroupIds);
    };
    PayrollHeadGroupCreationComponent.prototype.viewPreviousButton = function (selectedHeadGroupIds) {
        var _this = this;
        this.globalHeadGroupId = 0;
        console.log(selectedHeadGroupIds);
        this.selectedCopyToList = [];
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
        this.form = this.formBuilder.group({
            pfFormArray: new forms_1.FormArray([])
        });
        var index2 = this.targetProducts.findIndex(function (o) { return o.headGroupIds == selectedHeadGroupIds; });
        console.log('target products', this.targetProducts);
        if (index2 > 0) {
            console.log('index2 greater than 0');
            this.headNameIndex = index2 - 1;
            this.headMasterId = this.targetProducts[this.headNameIndex].headMasterId;
            this.HeadName = this.targetProducts[this.headNameIndex].standardName;
            this.selectedHeadGroupIds = this.targetProducts[this.headNameIndex].headGroupIds;
            this.Nature = this.targetProducts[this.headNameIndex].headNature;
        }
        else {
            alert('14');
        }
        this.savedHeadNameList = this.originalSavedHeadNameList;
        this.savedHeadNameList.forEach(function (element) {
            _this.savedHeadNameList = _this.savedHeadNameList.filter(function (e) { return e.headGroupIds !== selectedHeadGroupIds; });
        });
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== _this.selectedHeadGroupIds; });
        });
        this.dropdownList = this.HeadNameList;
        console.log('headNameList after filter', this.HeadNameList);
        // this.onSelectAttributeAssignmentWithMultipleParameter( this.selectedHeadGroupIds );
        //   this.onSelectAttributeAssignment( this.selectedHeadGroupIds, 0 );
        this.onSelectAttributeAssignmentWithMultipleParameter(this.selectedHeadGroupIds);
        console.log(this.selectedHeadGroupIds);
    };
    PayrollHeadGroupCreationComponent.prototype.copyDateFromTableRow = function (i, fromDate, toDate) {
        if (fromDate !== '' && fromDate != null) {
            console.log('set value');
            this.tempFromDate = fromDate;
            this.tempToDate = toDate;
        }
        else {
            console.log('in else part', this.tempFromDate);
            this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(new Date(this.tempFromDate));
            this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date(this.tempToDate));
        }
    };
    PayrollHeadGroupCreationComponent.prototype.CancelAttributeCreation = function () {
        this.globalHeadGroupId = 0;
        this.selectedCopyToList = [];
        this.multiSelectDropDownData = [];
        this.hideCopyFrom = false;
        if (this.pfArray.controls.length !== 0) {
            for (var i = 0; i < this.pfArray.length; i++) {
                this.pfArray.removeAt(i);
            }
        }
    };
    PayrollHeadGroupCreationComponent.prototype.resetAttributeSelection = function () {
        this.globalHeadGroupId = 0;
        this.hideCopyFrom = false;
        this.headGroupDefinitionId = 0;
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.payrollHeadGroupCreationForm.reset();
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.targetProducts = [];
        this.getAllHeadCreation();
        this.payrollHeadGroupCreationForm.get('attributeNature').setValue('');
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeApplicability1 = function (evt, index) {
        // console.log( 'ccc', index );
        if (evt == 'false') {
            //   console.log( 'att master id', this.form.get( 'pfFormArray' )['controls'][index].controls['attributeMasterId']["value"].value );
            var tempAttributeMasterId = this.form.get('pfFormArray')['controls'][index].controls['attributeMasterId']["value"].value;
            //  let flag = true;
            for (var i = this.pfArray.length - 1; i >= 0; i--) {
                console.log('in i', this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId']["value"].value);
                if (tempAttributeMasterId == this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId']["value"].value && this.form.get('pfFormArray')['controls'][i].controls['code'].value.length == 0) {
                    // console.log( 'in if in ', i );
                    //    if ( flag == true ) {
                    //    ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );
                    //  } else {
                    this.form.get('pfFormArray').removeAt(i);
                    //   }
                }
                //flag = false;
            }
        }
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeApplicability = function (evt, i) {
        console.log(evt, i);
        console.log(this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value);
        if (evt == 'true') {
            if (this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' || this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value Per Period') {
                for (var i_2 = 0; i_2 < this.pfArray.length; i_2++) {
                    console.log('aaa', this.form.get('pfFormArray')['controls'][i_2].controls['attributeMasterId'].value);
                }
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value4'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value3'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value2'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value1'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['isPlusSignVisible'].setValue(true);
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date('31-Dec-9999'));
                this.form.get('pfFormArray')['controls'][i].controls['value'].setValue('Range');
                this.form.get('pfFormArray')['controls'][i].controls['value4'].setValue('');
                this.form.get('pfFormArray')['controls'][i].controls['value3'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
            }
            else if (this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value Per Instance') {
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value2'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value1'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date('31-Dec-9999'));
                this.form.get('pfFormArray')['controls'][i].controls['value'].setValue('Range');
                this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
            }
            else {
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date('31-Dec-9999'));
                this.form.get('pfFormArray')['controls'][i].controls['value'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].enable();
            }
        }
        else {
            //   console.log( 'att master id', this.form.get( 'pfFormArray' )['controls'][index].controls['attributeMasterId']["value"].value );
            var tempAttributeMasterId = this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId']["value"].value;
            //  let flag = true;
            for (var i_3 = this.pfArray.length - 1; i_3 >= 0; i_3--) {
                console.log('in i', this.form.get('pfFormArray')['controls'][i_3].controls['attributeMasterId']["value"].value);
                if (tempAttributeMasterId == this.form.get('pfFormArray')['controls'][i_3].controls['attributeMasterId']["value"].value && this.form.get('pfFormArray')['controls'][i_3].controls['code'].value.length == 0) {
                    // console.log( 'in if in ', i );
                    //    if ( flag == true ) {
                    //    ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );
                    //  } else {
                    this.form.get('pfFormArray').removeAt(i_3);
                    //   }
                }
                //flag = false;
            }
            console.log('in else');
            //  if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' || this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value Per Period' ) {
            // } else {
            this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['value'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['value4'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['value3'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue(null);
            this.form.get('pfFormArray')['controls'][i].controls['isPlusSignVisible'].setValue(false);
            this.form.get('pfFormArray')['controls'][i].controls['fromDate'].disable();
            this.form.get('pfFormArray')['controls'][i].controls['toDate'].disable();
            this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
            this.form.get('pfFormArray')['controls'][i].controls['value4'].disable();
            this.form.get('pfFormArray')['controls'][i].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][i].controls['value2'].disable();
            this.form.get('pfFormArray')['controls'][i].controls['value1'].disable();
        }
        //  }
    };
    PayrollHeadGroupCreationComponent.prototype.checkValidation = function () {
    };
    PayrollHeadGroupCreationComponent.prototype.getValidity = function (i) {
        return this.form.get('value2').controls[i].invalid;
    };
    // get all  activeFrequencyList
    PayrollHeadGroupCreationComponent.prototype.getActiveFrequency = function () {
        var _this = this;
        this.activeFrequencyList = [];
        this.companySettingsService.getActiveFrequency().subscribe(function (res) {
            _this.activeFrequencyList = res.data.results;
        }, function (error) {
        }, function () {
            // for ( let i = 0; i < this.activeFrequencyList.length; i++ ){
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'daily'; }) !== -1) {
                console.log('in daily');
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'daily'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'weekly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'weekly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'biweeekly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'biweeekly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'semi-monthly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'semi-monthly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'monthly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'monthly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'quarterly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'quarterly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'half-yearly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'half-yearly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'yearly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'yearly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'adhoc'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'adhoc'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            console.log(' this.sortedFrequencyList', _this.sortedFrequencyList);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.doubleClickOnLeftTable = function (evt) { };
    PayrollHeadGroupCreationComponent.prototype.doubleClickOnRightTable = function (evt) { };
    PayrollHeadGroupCreationComponent.prototype.UploadModalYesNo = function (template) {
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.modalRef1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModal2 = function (template) {
        console.log('in UploadModal2 headmaster id', this.headMasterId);
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    PayrollHeadGroupCreationComponent.prototype.openNewPopUpWindow = function (template, selectedHeadGroupIds, payrollHeadGroupId) {
        var _this = this;
        console.log('in new pop up window', selectedHeadGroupIds, payrollHeadGroupId);
        this.form.setControl('pfFormArray1', new forms_1.FormArray([]));
        this.companySettingsService.getAllPayRollHeadGroupAttributeHistory(selectedHeadGroupIds, payrollHeadGroupId).subscribe(function (res) {
            console.log(JSON.stringify(res));
            for (var i = 0; i < res.data.results[0].length; i++) {
                console.log('cccc', res.data.results[0][i].attributeMaster[0].options);
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithHistoryValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].optionList, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0);
                }
                else {
                    for (var j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        // console.log( 'jjjjjjjjjjj', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
                        if (j == 0) {
                            console.log('ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithHistoryValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, 0, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                        }
                        else {
                            console.log('ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithHistoryValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, 0, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        }
                    }
                }
            }
        }, function (error) {
            if (error.status == 404) {
            }
        }, function () {
        });
        this.modalRef2 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModal1 = function (template, headGroupDefinitionId) {
        this.deletedHeadGroupDefinitionId = headGroupDefinitionId;
        this.deleteModalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    PayrollHeadGroupCreationComponent.prototype.deleteRowModal = function (template, rowNumber) {
        this.rowNumberToDelete = rowNumber;
        this.deleteRowModal1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeActiveFrequency = function (evt, attributeMasterId) {
        for (var i = this.pfArray.length - 1; i >= 0; i--) {
            console.log('in i', this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId']["value"].value);
            if (attributeMasterId == this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId']["value"].value && this.form.get('pfFormArray')['controls'][i].controls['code'].value.length == 0) {
                this.form.get('pfFormArray')['controls'][i].controls['value4'].setValue(evt);
            }
        }
    };
    PayrollHeadGroupCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-payroll-head-group-creation',
            templateUrl: './payroll-head-group-creation.component.html',
            styleUrls: ['./payroll-head-group-creation.component.scss'],
            styles: ["\n        .outofstock {\n          background-color: #ddd!important;\n          color: #000!important;\n          font-weight: 500;\n        } "
            ],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], PayrollHeadGroupCreationComponent);
    return PayrollHeadGroupCreationComponent;
}());
exports.PayrollHeadGroupCreationComponent = PayrollHeadGroupCreationComponent;
