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
    function PayrollHeadGroupCreationComponent(modalService, datePipe, formBuilder, companySettingsService, alertService, shortenString) {
        this.modalService = modalService;
        this.datePipe = datePipe;
        this.formBuilder = formBuilder;
        this.companySettingsService = companySettingsService;
        this.alertService = alertService;
        this.shortenString = shortenString;
        this.applicableList = [{ id: 'true', itemName: 'Yes' }, { id: 'false', itemName: 'No' }];
        this.selectedSummarySourceProducts = [];
        this.clickedOnSave = false;
        this.disabled1 = false;
        this.sortedFrequencyList = [];
        this.activeFrequencyList = [];
        this.globalHeadGroupId = 0;
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
        this.originalPayrollHeadGroupList = [];
        this.beforeSavePHGName1 = '';
        this.sourceProducts = [];
        this.targetProducts = [];
        this.selectedUser = [];
        this.selectedUser2 = [];
        this.values = [];
        this.AttributeSelectionArray = [];
        this.headGroupIdList = [];
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.dropdownSettings = {};
        this.dropdownList = [];
        this.HeadNameList = [];
        this.OrigianHeadNameList = [];
        this.selectedheadName = [];
        this.FormulaArray = [];
        this.SDMArray = [];
        this.viewSaveButton = false;
        this.NewTargetArray = [];
        this.originalSourceProductList = [];
        this.multiSelectDropDownData = [];
        this.tempValue4 = [];
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
        console.log(item);
        console.log(this.multiSelectDropDownData);
        // this.multiSelectDropDownData.push( item )
    };
    PayrollHeadGroupCreationComponent.prototype.onItemDeSelect = function (item) {
        console.log(item);
        var index = this.multiSelectDropDownData.findIndex(function (o) { return o.headGroupIds == item.headGroupIds; });
        console.log('ind', index);
        if (index > -1) {
            this.multiSelectDropDownData.splice(index, 1);
        }
        console.log(this.multiSelectDropDownData);
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAll = function (items) {
        var _this = this;
        this.multiSelectDropDownData = [];
        items.forEach(function (element) {
            _this.multiSelectDropDownData.push(element);
        });
        console.log(this.multiSelectDropDownData);
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
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    // get All Head List
    PayrollHeadGroupCreationComponent.prototype.getAllPayrollHeadGroup = function () {
        var _this = this;
        this.companySettingsService.getAllPayrollHeadGroupAtGlobal().subscribe(function (res) {
            _this.originalPayrollHeadGroupList = res.data.results;
            _this.PayrollHeadGroupList = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllFormulaList = function () {
        var _this = this;
        this.companySettingsService.getFromulaForFormulaMaster().subscribe(function (res) {
            _this.FormulaArray = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllSDMList = function () {
        var _this = this;
        this.companySettingsService.getSDMFormula().subscribe(function (res) {
            _this.SDMArray = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.companySettingsService.getAllHeadCreation().subscribe(function (res) {
            _this.dropdownList = res.data.results;
            _this.sourceProducts = res.data.results;
            _this.originalSourceProductList = res.data.results;
            _this.allGlobalHeadList = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
        this.sourceProducts = this.originalSourceProductList;
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
                //  this.sss = [];
                _this.HeadNameList.forEach(function (element, index) {
                    _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== response.data.results[0].headGroupIds[index]; });
                });
            }
            _this.notOrigianlSavedHeadList = _this.notOrigianlSavedHeadList.filter(function (e) { return e.headGroupIds !== _this.selectedHeadGroupIds; });
            // this.dropdownList = this.notOrigianlSavedHeadList;
            console.log('notOrigianlSavedHeadList', _this.notOrigianlSavedHeadList);
            //  this.dropdownList = this.HeadNameList;
            console.log('hed', _this.HeadNameList);
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeHeadGroupDefinitionName = function (event) {
        this.beforeSavePHGName1 = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeAttributeGroupDropDown = function (event) {
        this.AttGrpName = event.target.value;
        console.log(this.AttGrpName);
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
                    _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description, i);
                }
                else {
                    for (var j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        if (j == 0) {
                            _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                        }
                        else {
                            console.log('cccc', res.data.results[0][i].attributeMaster[0].options);
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                            //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        }
                    }
                }
            }
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAttributeAssignmentWithMultipleParameter = function (headGroupIds) {
        var _this = this;
        this.companySettingsService.getByPayrollHeadGroupIdAllRecords(headGroupIds).subscribe(function (res) {
            console.log(JSON.stringify(res));
            for (var i = 0; i < res.data.results[0].length; i++) {
                console.log('globalPayrollHeadGroupId', res.data.results[0][i].globalPayrollHeadGroupId);
                console.log('cccc', res.data.results[0][i].attributeMaster[0].options);
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description, i);
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
                            console.log('epayrollHeadGroupAttributeValueMappingIde', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                        }
                        else {
                            console.log('epayrollHeadGroupAttributeValueMappingIde', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
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
            else {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
    // tslint:disable-next-line: typedef
    PayrollHeadGroupCreationComponent.prototype.onSelectAttributeAssignment = function (u) {
        var _this = this;
        this.notOrigianlSavedHeadList = this.notSavedHeadList;
        //  this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == u.headGroupIds );
        console.log(u);
        this.headNameIndex = this.targetProducts.findIndex(function (o) { return o.headGroupIds == u.headGroupIds; });
        this.selectedCopyToList = [];
        this.multiSelectDropDownData = [];
        var index = this.targetProducts.findIndex(function (o) { return o.headGroupIds == u.headGroupIds; });
        this.headNameIndex = index;
        this.companySettingsService.getByPayrollHeadGroupIdAllRecords(u.headGroupIds).subscribe(function (res) {
            var data = res.data.results[0];
            for (var i = 0; i < res.data.results[0].length; i++) {
                // console.log( 'globalPayrollHeadGroupId', res.data.results[0][i].globalPayrollHeadGroupId );
                // console.log( 'value', res.data.results[0][i].value );
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description, i);
                }
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length !== 0) {
                    for (var j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        // console.log( 'cc1', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
                        // console.log( 'cc2', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId );
                        if (j == 0) {
                            _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                            //    applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number, description: string, i: number
                        }
                        else {
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                            // applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number, description: string, i: number
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
            else {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
        this.notOrigianlSavedHeadList.forEach(function (element) {
            _this.notOrigianlSavedHeadList = _this.notOrigianlSavedHeadList.filter(function (e) { return e.headGroupIds !== u.headGroupIds; });
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
                    _this.addPfArrayWithExistingValues(data[i].applicable, data[i].attributeMaster[0].attributeNature, data[i].attributeMaster[0].code, data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, data[i].attributeMaster[0].options, data[i].value, data[i].fromDate, data[i].toDate, '', '', '', '', false, data[i].globalPayrollHeadGroupId, 0, data[i].attributeMaster[0].description, i);
                }
                if (data[i].payrollHeadGroupAttributeValueMapping.length !== 0) {
                    for (var j = 0; j < data[i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        if (j == 0) {
                            _this.addPfArrayWithExistingValues(res.data.results[0][i].applicable, data[i].attributeMaster[0].attributeNature, data[i].attributeMaster[0].code, data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, data[i].attributeMaster[0].options, data[i].value, data[i].fromDate, data[i].toDate, data[i].payrollHeadGroupAttributeValueMapping[j].value1, data[i].payrollHeadGroupAttributeValueMapping[j].value2, data[i].payrollHeadGroupAttributeValueMapping[j].value3, data[i].payrollHeadGroupAttributeValueMapping[j].value4, true, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                        }
                        else {
                            _this.addPfArrayWithExistingValues(true, 'Range Value No Of Instances Per Period', '', data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, null, 'Range', data[i].payrollHeadGroupAttributeValueMapping[j].fromDate, data[i].payrollHeadGroupAttributeValueMapping[j].toDate, data[i].payrollHeadGroupAttributeValueMapping[j].value1, data[i].payrollHeadGroupAttributeValueMapping[j].value2, data[i].payrollHeadGroupAttributeValueMapping[j].value3, data[i].payrollHeadGroupAttributeValueMapping[j].value4, false, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i);
                        }
                    }
                }
            }
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup(headGroupIds);
                _this.viewSaveButton = true;
            }
            else {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
    // UpdatePHGById(): void {
    //   const addAttributeCreation: SavePHGGlobal = Object.assign( {} );
    //   addAttributeCreation.headMasters = [];
    //   this.NewTargetArray.forEach( element => {
    //     var index = this.targetProducts.indexOf( element )
    //     this.targetProducts = this.targetProducts.filter( e => e.headMasterId !== element.headMasterId );
    //   } );
    //   console.log( this.targetProducts );
    //   this.targetProducts.forEach( function ( f ) {
    //     const headDetail: HeadDetailPHG = Object.assign( {} );
    //     headDetail.headMasterId = f.headMasterId;
    //     addAttributeCreation.headMasters.push( headDetail );
    //   } );
    //   addAttributeCreation.globalHeadGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
    //   addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
    //   addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
    //   if ( addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0 ) {
    //     console.log( JSON.stringify( addAttributeCreation ) );
    //     this.companySettingsService.UpdatePHGByIdGlobal( this.headGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {
    //       console.log( 'UpdatePHGByIdGlobal', res );
    //       addAttributeCreation.headMasters = [];
    //       this.targetProducts = [];
    //       this.viewCancelButton = false;
    //       this.viewupdateButton = false;
    //       this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    //       this.getAllPayrollHeadGroup();
    //       // this.hidevalue = false;
    //       this.payrollHeadGroupCreationForm.reset();
    //     },
    //       ( error: any ) => {
    //         this.alertService.sweetalertError( error["error"]["status"]["message"] );
    //       } );
    //   }
    // }
    PayrollHeadGroupCreationComponent.prototype.copyFrommPayrollHeadGroup = function (event) {
        var _this = this;
        console.log(event.target.value);
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
                console.log('cccccccccccc', res.data.results[0].attributeGroupIds[index].code);
                console.log(element);
                // if ( res.data.results[0].attributeGroupIds[index].code == undefined ) {
                //   element.res.data.results[0].attributeGroupIds[index].code = '';
                // }
                _this.addPfArray(element, index);
            });
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
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
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            addAttributeCreation.headGroupDefinitionId = this.headGroupDefinitionId;
            console.log('in put method');
            console.log(addAttributeCreation.headGroupDefinitionId);
            console.log(JSON.stringify(addAttributeCreation));
            this.companySettingsService.UpdatePayrollHeadGroupAtGlobal(addAttributeCreation.headGroupDefinitionId, addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.headMasters = [];
                //  this.targetProducts = [];
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllPayrollHeadGroup();
                _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                //   this.getAllHeadCreation();
                // this.payrollHeadGroupCreationForm.reset();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
            this.targetProducts.forEach(function (element) {
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.headMasterId !== element.headMasterId; });
            });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.addPfArrayWithHistoryValues = function (applicable, attributeNature, code, attributeMasterId, attributeGroupIds, options, value, fromDate, toDate, value1, value2, value3, value4, isPlusSignVisible, globalPayrollHeadGroupId, payrollHeadGroupAttributeValueMappingId, description) {
        console.log('value4', value4);
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
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: [true],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                description: [description],
                sortedFrequencyList: [this.sortedFrequencyList],
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
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: [false],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
                description: [description],
                sortedFrequencyList: [this.sortedFrequencyList]
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
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: [isPlusSignVisible],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
                description: [description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
        }
    };
    PayrollHeadGroupCreationComponent.prototype.addPfArrayWithExistingValues = function (applicable, attributeNature, code, attributeMasterId, attributeGroupIds, options, value, fromDate, toDate, value1, value2, value3, value4, isPlusSignVisible, globalPayrollHeadGroupId, payrollHeadGroupAttributeValueMappingId, description, i) {
        console.log('applicable   applicable applicable', applicable);
        console.log('applicable   applicable applicable', applicable);
        if (attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [applicable],
                value: ['Range'],
                value1: [value1, forms_1.Validators.required],
                value2: [value2, forms_1.Validators.required],
                value3: [value3, forms_1.Validators.required],
                value4: [value4, forms_1.Validators.required],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: [isPlusSignVisible],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
                description: [description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
            if (!isPlusSignVisible) {
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['Applicability'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['toDate'].disable();
                //   this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( 'false' );
            }
            else {
                // this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( 'true' );
            }
        }
        else if (attributeNature == 'Range Value Per Instance') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [applicable],
                value: ['Range'],
                value1: [value1, forms_1.Validators.required],
                value2: [value2, forms_1.Validators.required],
                value3: [value3],
                value4: [value4],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: ['false'],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
                description: [description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        else if (attributeNature == 'Per Employee Input') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [applicable],
                value: [''],
                value1: [''],
                value2: [''],
                value3: [''],
                value4: [''],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: [false],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
                description: [description],
                sortedFrequencyList: [null]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        else {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [applicable],
                value: [value, forms_1.Validators.required],
                value1: [value1],
                value2: [value2],
                value3: [value3],
                value4: [value4],
                code: [code],
                attributeNature: [attributeNature],
                applicableList: [''],
                fromDate: [fromDate == null ? '' : new Date(fromDate), forms_1.Validators.required],
                toDate: [toDate == null ? '' : new Date(toDate), forms_1.Validators.required],
                options: [options],
                isPlusSignVisible: [isPlusSignVisible],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [attributeGroupIds],
                minDate1: [fromDate == null ? '' : new Date(fromDate)],
                globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
                payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
                description: [description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        // if ( this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['Applicability'].value == false ) {
        //   console.log( 'applicable', applicable );
        //console.log( '*******************', attributeNature, this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['Applicability'].value );
        if (attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period') {
            if (applicable == false) {
                //  this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( false );
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['toDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
            }
            else {
                //  this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( isPlusSignVisible );
            }
        }
        else if (attributeNature == 'Range Value Per Instance') {
            if (applicable == false) {
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['toDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
            }
            else {
            }
        }
        else if (attributeNature == 'Per Employee Input') {
            if (applicable == false) {
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['toDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
            }
            else {
            }
        }
        else {
            if (applicable == false) {
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['toDate'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
                this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
            }
            console.log('calling  onChangeApplicability()', applicable);
            // this.onChangeApplicability( applicable.toString(), i );
        }
    };
    // this. function will be called at 404 error block..
    PayrollHeadGroupCreationComponent.prototype.addPfArray = function (ele, index) {
        console.log('code code code ', ele.code);
        console.log('attribute nature', ele.attributeNature);
        if (ele.attributeNature == 'Range Value No Of Instances Per Period' || ele.attributeNature == 'Range Value Per Period') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [false],
                value: ['Range'],
                value1: ['1', forms_1.Validators.required],
                value2: ['', forms_1.Validators.required],
                value3: ['', forms_1.Validators.required],
                value4: ['', forms_1.Validators.required],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: ['', forms_1.Validators.required],
                toDate: [new Date('31-Dec-9999'), forms_1.Validators.required],
                options: [ele.options],
                isPlusSignVisible: [true],
                attributeMasterId: [ele.attributeMasterId],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0],
                description: [ele.description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
        }
        else if (ele.attributeNature == 'Range Value Per Instance') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [false],
                value: ['Range'],
                value1: ['', forms_1.Validators.required],
                value2: ['', forms_1.Validators.required],
                value3: [''],
                value4: [''],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: ['', forms_1.Validators.required],
                toDate: [new Date('31-Dec-9999'), forms_1.Validators.required],
                options: [''],
                isPlusSignVisible: [false],
                attributeMasterId: [ele.attributeMasterId],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0],
                description: [ele.description],
                sortedFrequencyList: ['']
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        else if (ele.attributeNature == 'Per Employee Input') {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [false],
                value: [''],
                value1: [''],
                value2: [''],
                value3: [''],
                value4: [''],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: ['', forms_1.Validators.required],
                toDate: [new Date('31-Dec-9999'), forms_1.Validators.required],
                options: [ele.options],
                isPlusSignVisible: [false],
                attributeMasterId: [ele.attributeMasterId],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0],
                description: [ele.description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        else {
            this.pfArray.push(this.formBuilder.group({
                Applicability: [false],
                value: ['', forms_1.Validators.required],
                value1: [''],
                value2: [''],
                value3: [''],
                value4: [''],
                code: [ele.code],
                attributeNature: [ele.attributeNature],
                applicableList: [''],
                fromDate: ['', forms_1.Validators.required],
                toDate: [new Date('31-Dec-9999'), forms_1.Validators.required],
                options: [ele.options],
                isPlusSignVisible: [false],
                attributeMasterId: [ele.attributeMasterId],
                attributeMasterId1: [ele.attributeMasterId],
                attributeGroupIds: [ele.attributeGroupIds],
                minDate1: [''],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0],
                description: [ele.description],
                sortedFrequencyList: [this.sortedFrequencyList]
            }));
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value1'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value2'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value3'].disable();
            this.form.get('pfFormArray')['controls'][this.pfArray.length - 1].controls['value4'].disable();
        }
        this.onChangeApplicability('false', index);
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
    PayrollHeadGroupCreationComponent.prototype.addRow = function (i, attributeMasterId) {
        // console.log( value4 );
        var _this = this;
        this.tempValue4 = [];
        var count = 0;
        var originalSortedFreqList = this.sortedFrequencyList;
        var temp = [];
        var _loop_1 = function (k) {
            console.log(this_1.f.pfFormArray.value[k]);
            console.log(this_1.form.get('pfFormArray')['controls'][k].controls['value4'].value);
            //   if ( this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value != null || this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value != '' ) {
            console.log(this_1.form.get('pfFormArray')['controls'][k].controls['value4'].value);
            temp = originalSortedFreqList.filter(function (o) { return o.name !== _this.form.get('pfFormArray')['controls'][k].controls['value4'].value; });
            originalSortedFreqList = temp;
            console.log(temp);
            //    console.log( 'tempValue4', this.tempValue4 );
            //  console.log( attributeMasterId )
            // console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['attributeMasterId'].value );
            //  console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['attributeMasterId']["value"].value );
            if (this_1.form.get('pfFormArray')['controls'][k].controls['attributeMasterId1'].value == attributeMasterId) {
                console.log('in for loop', k);
                count++;
            }
        };
        var this_1 = this;
        for (var k = 0; k < this.pfArray.length; k++) {
            _loop_1(k);
        }
        var newIndex = (i + count) - 1;
        // 
        if (this.form.get('pfFormArray')['controls'][newIndex - 1].controls['value4'].value.length > 0 && this.sortedFrequencyList.length > newIndex) {
            console.log('attributeMasterId', attributeMasterId);
            var setsFormArray = this.form.get('pfFormArray');
            setsFormArray.insert(newIndex, this.formBuilder.group({
                Applicability: ['true'],
                value: [''],
                value1: ['1', forms_1.Validators.required],
                value2: ['', forms_1.Validators.required],
                value3: ['', forms_1.Validators.required],
                value4: [''],
                code: [''],
                attributeNature: ['Range Value Per Period'],
                applicableList: [''],
                fromDate: [null],
                toDate: [null],
                options: [''],
                isPlusSignVisible: [false],
                attributeMasterId: [attributeMasterId],
                attributeMasterId1: [attributeMasterId],
                attributeGroupIds: [0],
                minDate1: [null],
                globalPayrollHeadGroupId: [0],
                payrollHeadGroupAttributeValueMappingId: [0],
                description: [''],
                sortedFrequencyList: [temp]
            }));
            this.form.get('pfFormArray')['controls'][newIndex].controls['Applicability'].disable();
            this.form.get('pfFormArray')['controls'][newIndex].controls['fromDate'].disable();
            this.form.get('pfFormArray')['controls'][newIndex].controls['toDate'].disable();
        }
    };
    PayrollHeadGroupCreationComponent.prototype.deleteRow = function () {
        this.form.get('pfFormArray').removeAt(this.rowNumberToDelete);
    };
    PayrollHeadGroupCreationComponent.prototype.Test = function () {
        var _this = this;
        this.clickedOnSave = true;
        if (this.viewSaveButton) {
            console.log('globalHeadGroupId', this.globalHeadGroupId);
            var multipleSaveObj = [];
            if (this.multiSelectDropDownData.length > 0 || this.globalHeadGroupId > 0) {
                console.log('in if 1');
                this.multiSelectDropDownData.push({ headGroupIds: this.selectedHeadGroupIds, standardName: 'dummy Name' });
                //this.multiSelectDropDownData.push( this.notSavedHeadList[s].headGroupIds, this.notSavedHeadList[s].standardName );
                console.log(this.multiSelectDropDownData);
                var _loop_2 = function (i) {
                    console.log(JSON.stringify(this_2.f.pfFormArray.value));
                    var addData = Object.assign({});
                    console.log(JSON.stringify(addData));
                    var data;
                    var attributeMasterId = 0;
                    var fromDate1;
                    var toDate1;
                    this_2.f.pfFormArray.value.forEach(function (element) {
                        console.log(element.Applicability);
                        if (element.attributeMasterId1 == attributeMasterId) {
                            data.payrollHeadGroupAttributeValueMapping.push({
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
                            //  data.globalPayrollHeadGroupId = this.selectedHeadGroupIds;
                            attributeMasterId = element.attributeMasterId1;
                            data.applicable = element.Applicability;
                            data.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                            data.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                            data.globalAttributeGroupId = element.attributeGroupIds;
                            //   data.globalHeadGroupId = this.selectedHeadGroupIds;
                            data.globalHeadGroupId = _this.multiSelectDropDownData[i].headGroupIds;
                            data.value = element.value;
                            if (element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance') {
                                data.value = 'Range';
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
                        }
                    });
                    multipleSaveObj.push(data);
                };
                var this_2 = this;
                for (var i = 0; i < this.multiSelectDropDownData.length; i++) {
                    _loop_2(i);
                }
                console.log('check this', JSON.stringify(multipleSaveObj));
                this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(multipleSaveObj).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                    _this.globalHeadGroupId = 0;
                    _this.multiSelectDropDownData = [];
                }, function (error) {
                    _this.alertService.sweetalertError(error["error"]["status"]["message"]);
                });
            }
            else {
                console.log('in else 1');
                this.disabled1 = true;
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
                        attributeMasterId_1 = element.attributeMasterId1;
                        data_1.applicable = element.Applicability;
                        data_1.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        data_1.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                        data_1.globalAttributeGroupId = element.attributeGroupIds;
                        data_1.globalHeadGroupId = _this.selectedHeadGroupIds;
                        data_1.value = element.value;
                        if (element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance') {
                            data_1.value = 'Range';
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
                this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(saveObj_1).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                    _this.globalHeadGroupId = 0;
                }, function (error) {
                    _this.alertService.sweetalertError(error["error"]["status"]["message"]);
                });
            }
        }
        else if (this.viewSaveButton == false && this.multiSelectDropDownData.length == 0) {
            console.log('in if  333');
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
                    if (element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance') {
                        data_2.value = 'Range';
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
                }
                saveObj_2.push(data_2);
            });
            console.log('hhhh', this.selectedHeadGroupIds);
            console.log(JSON.stringify(saveObj_2));
            //if ( data.globalPayrollHeadGroupId > 0 ) {
            console.log('inn update');
            console.log(JSON.stringify(saveObj_2));
            this.companySettingsService.putPayrollHeadAttributeMappingAddGlobal(saveObj_2).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
            //   }
        }
    };
    PayrollHeadGroupCreationComponent.prototype.TestJsonObject1 = function () {
        var _this = this;
        this.disabled1 = true;
        console.log(this.multiSelectDropDownData.length);
        if (this.globalHeadGroupId !== 0 && this.multiSelectDropDownData.length == 0) {
            console.log('in if  1');
            var saveObj_3 = [];
            console.log(JSON.stringify(this.f.pfFormArray.value));
            var addData = Object.assign({});
            console.log(JSON.stringify(addData));
            var data_3;
            var attributeMasterId_3 = 0;
            var fromDate1_3;
            var toDate1_3;
            this.f.pfFormArray.value.forEach(function (element) {
                console.log(element.Applicability);
                if (element.attributeMasterId1 == attributeMasterId_3) {
                    data_3.payrollHeadGroupAttributeValueMapping.push({
                        // payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
                        fromDate: fromDate1_3,
                        toDate: toDate1_3,
                        value1: element.value1,
                        value2: element.value2,
                        value3: element.value3,
                        value4: element.value4
                    });
                }
                else {
                    data_3 = Object.assign({});
                    data_3.payrollHeadGroupAttributeValueMapping = [];
                    data_3.globalPayrollHeadGroupId = _this.selectedHeadGroupIds;
                    data_3.globalHeadGroupId = _this.selectedHeadGroupIds;
                    attributeMasterId_3 = element.attributeMasterId1;
                    data_3.applicable = element.Applicability;
                    data_3.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                    data_3.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    data_3.globalAttributeGroupId = element.attributeGroupIds;
                    data_3.value = element.value;
                    if (element.Applicability == undefined) {
                        data_3.applicable = true;
                    }
                    if (element.Applicability == false) {
                        data_3.value = null;
                    }
                    if (element.value == undefined || element.value == 'null') {
                        data_3.value = null;
                    }
                    if (element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period') {
                        data_3.value = 'Range';
                        data_3.payrollHeadGroupAttributeValueMapping.push({
                            fromDate: _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd'),
                            toDate: _this.datePipe.transform(element.toDate, 'yyyy-MM-dd'),
                            value1: element.value1,
                            value2: element.value2,
                            value3: element.value3,
                            value4: element.value4
                        });
                        fromDate1_3 = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        toDate1_3 = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    }
                    saveObj_3.push(data_3);
                }
            });
            console.log('hhhh', this.selectedHeadGroupIds);
            console.log(JSON.stringify(saveObj_3));
            var a = JSON.stringify(saveObj_3);
            if (saveObj_3[0].globalPayrollHeadGroupId > 0) {
                console.log('inn update');
                this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(saveObj_3).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                    _this.globalHeadGroupId = 0;
                }, function (error) {
                    _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
            var _loop_3 = function (m) {
                var saveObj = [];
                console.log(JSON.stringify(this_3.f.pfFormArray.value));
                var addData = Object.assign({});
                console.log(JSON.stringify(addData));
                var data;
                var attributeMasterId = 0;
                var fromDate1;
                var toDate1;
                this_3.f.pfFormArray.value.forEach(function (element) {
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
                console.log('hhhh', this_3.selectedHeadGroupIds);
                console.log(JSON.stringify(saveObj));
                var a = JSON.stringify(saveObj);
                console.log('inn update');
                this_3.companySettingsService.putPayrollHeadAttributeMappingAddGlobal(saveObj).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                }, function (error) {
                    _this.alertService.sweetalertError(error["error"]["status"]["message"]);
                });
            };
            var this_3 = this;
            for (var m = 0; m < this.multiSelectDropDownData.length; m++) {
                _loop_3(m);
            }
        }
        else {
            console.log('in if  3');
            var saveObj_4 = [];
            console.log(JSON.stringify(this.f.pfFormArray.value));
            var addData = Object.assign({});
            console.log(JSON.stringify(addData));
            var data_4;
            var attributeMasterId_4 = 0;
            var fromDate1_4;
            var toDate1_4;
            this.f.pfFormArray.value.forEach(function (element) {
                console.log(element.Applicability);
                if (element.attributeMasterId1 == attributeMasterId_4) {
                    data_4.payrollHeadGroupAttributeValueMapping.push({
                        payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
                        fromDate: fromDate1_4,
                        toDate: toDate1_4,
                        value1: element.value1,
                        value2: element.value2,
                        value3: element.value3,
                        value4: element.value4
                    });
                }
                else {
                    data_4 = Object.assign({});
                    data_4.payrollHeadGroupAttributeValueMapping = [];
                    data_4.globalPayrollHeadGroupId = element.globalPayrollHeadGroupId;
                    attributeMasterId_4 = element.attributeMasterId1;
                    data_4.applicable = element.Applicability;
                    data_4.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                    data_4.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    data_4.globalAttributeGroupId = element.attributeGroupIds;
                    data_4.globalHeadGroupId = _this.selectedHeadGroupIds;
                    data_4.value = element.value;
                    if (element.Applicability == undefined) {
                        data_4.applicable = true;
                    }
                    if (element.Applicability == false) {
                        data_4.value = null;
                    }
                    if (element.value == undefined || element.value == 'null') {
                        // data.value = null;
                        data_4.value = null;
                    }
                    if (element.value == 'Range') {
                        data_4.applicable = true;
                        data_4.payrollHeadGroupAttributeValueMapping.push({
                            fromDate: _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd'),
                            toDate: _this.datePipe.transform(element.toDate, 'yyyy-MM-dd'),
                            value1: element.value1,
                            value2: element.value2,
                            value3: element.value3,
                            value4: element.value4,
                            payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId
                        });
                        fromDate1_4 = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        toDate1_4 = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                    }
                    saveObj_4.push(data_4);
                }
            });
            console.log('hhhh', this.selectedHeadGroupIds);
            console.log(JSON.stringify(saveObj_4));
            var a = JSON.stringify(saveObj_4);
            if (data_4.globalPayrollHeadGroupId > 0) {
                console.log('inn update');
                this.companySettingsService.putPayrollHeadAttributeMappingAddGlobal(saveObj_4).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                }, function (error) {
                    _this.alertService.sweetalertError(error["error"]["status"]["message"]);
                });
            }
            else {
                console.log('in add');
                this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(saveObj_4).subscribe(function (res) {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                    _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                }, function (error) {
                    _this.alertService.sweetalertError(error["error"]["status"]["message"]);
                });
            }
        }
        //this.SaveNext( this.selectedHeadGroupIds );
    };
    PayrollHeadGroupCreationComponent.prototype.Next = function (selectedHeadGroupIds) {
        var _this = this;
        this.clickedOnSave = false;
        this.multiSelectDropDownData = [];
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
            alert('s2s');
        }
        this.HeadNameList = this.OrigianHeadNameList;
        this.HeadNameList.forEach(function (element) {
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupIds !== _this.selectedHeadGroupIds; });
        });
        this.onSelectAttributeAssignmentWithMultipleParameter(this.selectedHeadGroupIds);
        this.GetPHGByIdDisable(this.headGroupDefinitionId);
    };
    PayrollHeadGroupCreationComponent.prototype.firstSave = function () {
        var _this = this;
        console.log('view update button', this.viewupdateButton);
        if (this.viewupdateButton == true && this.multiSelectDropDownData.length != 0) {
            this.clickedOnSave = true;
            console.log(this.multiSelectDropDownData);
            var multipleSaveObj_1 = [];
            var _loop_4 = function (i) {
                console.log(JSON.stringify(this_4.f.pfFormArray.value));
                var addData = Object.assign({});
                console.log(JSON.stringify(addData));
                var data;
                var attributeMasterId = 0;
                var fromDate1;
                var toDate1;
                this_4.f.pfFormArray.value.forEach(function (element) {
                    console.log(element.Applicability);
                    if (element.attributeMasterId1 == attributeMasterId) {
                        data.payrollHeadGroupAttributeValueMapping.push({
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
                        attributeMasterId = element.attributeMasterId1;
                        data.applicable = element.Applicability;
                        data.fromDate = _this.datePipe.transform(element.fromDate, 'yyyy-MM-dd');
                        data.toDate = _this.datePipe.transform(element.toDate, 'yyyy-MM-dd');
                        data.globalAttributeGroupId = element.attributeGroupIds;
                        data.globalHeadGroupId = _this.multiSelectDropDownData[i].headGroupIds;
                        data.value = element.value;
                        if (element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance') {
                            data.value = 'Range';
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
                    }
                    multipleSaveObj_1.push(data);
                });
            };
            var this_4 = this;
            for (var i = 0; i < this.multiSelectDropDownData.length; i++) {
                _loop_4(i);
            }
            console.log(JSON.stringify(multipleSaveObj_1));
            this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal(multipleSaveObj_1).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.GetPHGByIdDisable(_this.headGroupDefinitionId);
                _this.globalHeadGroupId = 0;
                _this.multiSelectDropDownData = [];
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            }, function () {
                console.log('ss1');
                _this.Test();
            });
        }
        else {
            console.log('ss2');
            this.Test();
        }
    };
    PayrollHeadGroupCreationComponent.prototype.viewPreviousButton = function (selectedHeadGroupIds) {
        var _this = this;
        this.clickedOnSave = false;
        this.multiSelectDropDownData = [];
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
        this.GetPHGByIdDisable(this.headGroupDefinitionId);
    };
    PayrollHeadGroupCreationComponent.prototype.copyDateFromTableRow = function (i, fromDate, toDate, Applicability) {
        console.log('aa', Applicability);
        // if ( Applicability == true ) {
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
        // }
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
        console.log('onChangeApplicability', evt, i);
        console.log(this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value);
        if (evt == 'true') {
            if (this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' || this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value Per Period') {
                for (var i_1 = 0; i_1 < this.pfArray.length; i_1++) {
                    console.log('aaa', this.form.get('pfFormArray')['controls'][i_1].controls['attributeMasterId'].value);
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
                this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue('1');
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
            }
            else if (this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value Per Instance') {
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value2'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value1'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['isPlusSignVisible'].setValue(false);
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date('31-Dec-9999'));
                this.form.get('pfFormArray')['controls'][i].controls['value'].setValue('Range');
                this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
            }
            else if (this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Per Employee Input') {
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['isPlusSignVisible'].setValue(false);
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date('31-Dec-9999'));
                this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
            }
            else {
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(new Date('31-Dec-9999'));
                this.form.get('pfFormArray')['controls'][i].controls['value'].setValue('');
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].enable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].enable();
            }
        }
        else {
            if (this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value Per Period' || this.form.get('pfFormArray')['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period') {
                this.form.get('pfFormArray')['controls'][i].controls['isPlusSignVisible'].setValue(false);
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value1'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value2'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value3'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value4'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value4'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value3'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value2'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value1'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
                this.form.get('pfFormArray')['controls'][i].controls['value'].disable();
                console.log('in else of on change applicability');
                //   console.log( 'att master id', this.form.get( 'pfFormArray' )['controls'][index].controls['attributeMasterId']["value"].value );
                var tempAttributeMasterId = this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId'].value;
                //  let flag = true;
                for (var i_2 = this.pfArray.length - 1; i_2 >= 0; i_2--) {
                    console.log('in i', this.form.get('pfFormArray')['controls'][i_2].controls['attributeMasterId']["value"].value);
                    if (tempAttributeMasterId == this.form.get('pfFormArray')['controls'][i_2].controls['attributeMasterId'].value && this.form.get('pfFormArray')['controls'][i_2].controls['code'].value.length == 0) {
                        // console.log( 'in if in ', i );
                        //    if ( flag == true ) {
                        //    ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );
                        //  } else {
                        this.form.get('pfFormArray').removeAt(i_2);
                        //   }
                    }
                    //flag = false;
                }
            }
            else {
                console.log('in else');
                //  if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' || this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value Per Period' ) {
                // } else {
                this.form.get('pfFormArray')['controls'][i].controls['fromDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['toDate'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value'].setValue(null);
                this.form.get('pfFormArray')['controls'][i].controls['value4'].setValue('');
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
        }
    };
    PayrollHeadGroupCreationComponent.prototype.checkValidation = function () { };
    PayrollHeadGroupCreationComponent.prototype.getValidity = function (i) {
        return this.form.get('value2').controls[i].invalid;
    };
    PayrollHeadGroupCreationComponent.prototype.doubleClickOnLeftTable = function (evt) { };
    PayrollHeadGroupCreationComponent.prototype.doubleClickOnRightTable = function (evt) { };
    PayrollHeadGroupCreationComponent.prototype.openNewPopUpWindow = function (template, selectedHeadGroupIds, payrollHeadGroupId) {
        var _this = this;
        console.log('in new pop up window', selectedHeadGroupIds, payrollHeadGroupId);
        this.form.setControl('pfFormArray1', new forms_1.FormArray([]));
        this.companySettingsService.getAllPayRollHeadGroupAttributeHistory(selectedHeadGroupIds, payrollHeadGroupId).subscribe(function (res) {
            console.log(JSON.stringify(res));
            for (var i = 0; i < res.data.results[0].length; i++) {
                console.log('cccc', res.data.results[0][i].attributeMaster[0].options);
                if (res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0) {
                    _this.addPfArrayWithHistoryValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description);
                }
                else {
                    for (var j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++) {
                        // console.log( 'jjjjjjjjjjj', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
                        if (j == 0) {
                            console.log('ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithHistoryValues(res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, 0, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description);
                        }
                        else {
                            console.log('ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId);
                            _this.addPfArrayWithHistoryValues(true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, 0, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description);
                            //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
                        }
                    }
                }
            }
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        }, function () { });
        this.modalRef2 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModal1 = function (template, headGroupDefinitionId) {
        this.deletedHeadGroupDefinitionId = headGroupDefinitionId;
        this.deleteModalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModal2 = function (template) {
        console.log('in UploadModal2 headmaster id', this.headMasterId);
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModalYesNo = function (template) {
        var _this = this;
        if (!this.viewupdateButton) {
            this.PayrollHeadGroupList = this.originalPayrollHeadGroupList;
            for (var i = 0; i < this.PayrollHeadGroupList.length; i++) {
                //   this.PayrollHeadGroupList.filter
                this.PayrollHeadGroupList = this.PayrollHeadGroupList.filter(function (e) { return e.attributeGroupName === _this.AttGrpName; });
            }
            // AttGrpName
            // this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== this.selectedHeadGroupIds );
        }
        this.form.setControl('pfFormArray', new forms_1.FormArray([]));
        this.modalRef1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    PayrollHeadGroupCreationComponent.prototype.deleteRowModal = function (template, rowNumber) {
        this.rowNumberToDelete = rowNumber;
        this.deleteRowModal1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeActiveFrequency = function (evt, attributeMasterId, index) {
        console.log(evt, attributeMasterId);
        for (var i = index + 1; i < this.pfArray.length - 1; i++) {
            console.log('in i', this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId'].value);
            if (attributeMasterId == this.form.get('pfFormArray')['controls'][i].controls['attributeMasterId'].value) {
                this.form.get('pfFormArray')['controls'][i].controls['value4'].setValue('');
            }
        }
    };
    // get all  activeFrequencyList
    PayrollHeadGroupCreationComponent.prototype.getActiveFrequency = function () {
        var _this = this;
        this.activeFrequencyList = [];
        this.companySettingsService.getActiveFrequency().subscribe(function (res) {
            _this.activeFrequencyList = res.data.results;
        }, function (error) {
            //  this.alertService.sweetalertError( error["error"]["status"]["message"] );
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
