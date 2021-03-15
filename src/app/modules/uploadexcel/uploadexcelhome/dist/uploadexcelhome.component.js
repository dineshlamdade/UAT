"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.UploadexcelhomeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FileSaver = require("file-saver");
var rxjs_1 = require("rxjs");
var UploadexcelhomeComponent = /** @class */ (function () {
    function UploadexcelhomeComponent(modalService, formBuilder, excelService, uploadeExcelHomeService, alertService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.excelService = excelService;
        this.uploadeExcelHomeService = uploadeExcelHomeService;
        this.alertService = alertService;
        this.sheetDataArray = [];
        this.isViewMode = false;
        // for edit
        this.templateMasterId = 0;
        this.previewTableData = [];
        this.isViewFieldNameArrayList = false;
        this.errorInSequence = false;
        this.personalInfoMergeTab = false;
        this.complianceInfoMergeTab = false;
        this.contactInfoMergeTab = false;
        this.identityInfoMergeTab = false;
        this.jobInfoMergeTab = false;
        this.previousEmployementMergeTab = false;
        this.eduAndSkillMergeTab = false;
        this.employmentInfoMergeTab = false;
        this.familyInfoMergeTab = false;
        this.payrollInfoMergeTab = false;
        this.wrongSequenceNumberisEntered = false;
        this.anantTemp = {};
        this.sheetsize = 0;
        this.tempMergeSelectedArrayList = [];
        this.hideNextButton = false;
        this.hidePreviousButton = false;
        this.selectAllEnableDisable = false;
        this.selectAllModel = false;
        this.selectedMergedGroupList = [];
        this.employeeMasterModuleList = [];
        this.mergePersonalInformation = false;
        this.mergeComplianceInformation = false;
        this.mergeContactInformation = false;
        this.mergeIdentityInformation = false;
        this.mergeEducationAndSkillInformation = false;
        this.mergeEmploymentInformation = false;
        this.mergePreviousEmploymentInformation = false;
        this.mergePayrollInformation = false;
        this.mergeFamilyInformation = false;
        this.mergeJobInformation = false;
        this.leftSideBarMenuList = [];
        //public selectedCounterPersonalInformationList = [];
        this.fieldNameArrayList = [];
        this.global = [];
        this.sequenceArray = [];
        this.sequenceSelect = true;
        this.isEditMode = false;
        this.form = forms_1.FormGroup;
        this.checkedEmployeeMaster = true;
        this.checkedPayrollMaster = false;
        this.checkedLeaveManangement = false;
        this.checkedAssetMaster = false;
        this.ordersData = [];
        this.arrayOfObj = [];
        this.filterDropDownList = [];
        this.selectedSummaryCheckBoxHtmlDataList = [];
        this.summaryOfExcelTemplate = [];
        // public customizedResponse: Array<any> = [];
        this.checkBoxHtmlDataList = [];
        this.excelDataList = [];
        this.checkBoxHtmlDataList1 = [];
        this.preview = false;
        this.dropdownList = [];
        this.selectedItems = [];
        this.mergeSelected = [];
        this.dropdownSettings = {};
        this.dropdownList1 = [];
        this.excelDataList = [];
        this.form = this.formBuilder.group({
            filterTemplateDropDown: new forms_1.FormControl(''),
            orders: new forms_1.FormArray([]),
            templateName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl(''),
            remark: new forms_1.FormControl(''),
            orderCheckbox: new forms_1.FormControl('')
        });
    }
    UploadexcelhomeComponent.prototype.ngOnInit = function () {
        // this.form.patchValue({
        //   templateName: 'a',
        // });
        this.dropdownList = [
            { id: 1, label: 'PA_01_Staff' },
            { id: 2, label: 'PA_02_Worker' },
        ];
        this.dropdownList1 = [
            { id: 1, label: 'Employee Master' },
            { id: 2, label: 'Payroll' },
            { id: 3, label: 'Leave Management' },
            { id: 4, label: 'Expense Reimbursement ' },
            { id: 5, label: 'Assets ' },
        ];
        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'label',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.getAllExcelTemplate();
        this.getExcelTableFields();
    };
    UploadexcelhomeComponent.prototype.getExcelTableFields = function () {
        var _this = this;
        this.fieldNameArrayList = [];
        this.masterGetExcelTableFieldsResponse = {};
        this.leftSideBarMenuList = [];
        this.uploadeExcelHomeService.getExcelTableFields().subscribe(function (res) {
            _this.masterGetExcelTableFieldsResponse = res;
            var counter = 1;
            var globalCounter = 1;
            var idForEmpMasterModule = 1;
            _this.leftSideBarMenuList.push({ id: 1, name: 'Select All', disable: false, group: 0, hide: false, counter: 0, checked: false });
            res.data.results.forEach(function (element) {
                var flagForEmployeeCode = false;
                var flagForCompanyName = false;
                _this.leftSideBarMenuList.push({ id: counter++, name: element.sheetName, disable: false, group: 0, hide: false, counter: 0, checked: false });
                _this.employeeMasterModuleList.push({ checked: false, group: 0, disabled: false, assignValue: '', id: idForEmpMasterModule++, title: element.sheetName });
                for (var i = 0; i < element.fields.length; i++) {
                    if (element.fields[i].customLabelName == 'NA') { }
                    else {
                        if (element.fields[i].customLabelName == 'Employee Code' || element.fields[i].customLabelName == 'Company Name') {
                            if (element.fields[i].customLabelName == 'Employee Code' && flagForEmployeeCode == false) {
                                _this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: '', counter: globalCounter++ });
                                flagForEmployeeCode = true;
                            }
                            if (element.fields[i].customLabelName == 'Company Name' && flagForCompanyName == false) {
                                _this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: '', counter: globalCounter++ });
                                flagForCompanyName = true;
                            }
                        }
                        else {
                            _this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: '', counter: globalCounter++ });
                        }
                    }
                }
            });
            _this.global = _this.fieldNameArrayList;
            console.log(_this.fieldNameArrayList);
        });
        rxjs_1.of(this.getOrders()).subscribe(function (orders) {
            _this.ordersData = orders;
            _this.addCheckboxes();
        });
    };
    UploadexcelhomeComponent.prototype.getAllExcelTemplate = function () {
        var _this = this;
        this.summaryOfExcelTemplate = [];
        this.masterOfExcelTemplate = {};
        var companyId = 1;
        this.uploadeExcelHomeService.getAllExcelTemplate(companyId).subscribe(function (res) {
            _this.masterOfExcelTemplate = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    companyId: element.companyId,
                    createdBy: element.createdBy,
                    excelFile: element.excelFile,
                    isActive: element.isActive,
                    remark: element.remark,
                    templateDescription: element.templateDescription,
                    templateMasterId: element.templateMasterId,
                    templateName: element.templateName
                };
                _this.summaryOfExcelTemplate.push(obj);
            });
        });
    };
    UploadexcelhomeComponent.prototype.onItemSelect = function (item, DeselectTab) {
        this.modalRef = this.modalService.show(DeselectTab, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    UploadexcelhomeComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    UploadexcelhomeComponent.prototype.DeselectTab = function (DeselectTab) {
        this.modalRef = this.modalService.show(DeselectTab, Object.assign({}, { "class": 'gray modal-lg' }));
    };
    UploadexcelhomeComponent.prototype.DownloadCriteria = function (template2) {
        this.modalRef = this.modalService.show(template2, Object.assign({}, { "class": 'gray modal-md' }));
    };
    UploadexcelhomeComponent.prototype.displayPreview = function () {
        this.preview = true;
    };
    UploadexcelhomeComponent.prototype.addCheckboxes = function () {
        var _this = this;
        this.ordersData.forEach(function () { return _this.ordersFormArray.push(new forms_1.FormControl(false)); });
    };
    Object.defineProperty(UploadexcelhomeComponent.prototype, "ordersFormArray", {
        get: function () {
            return this.f.orders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UploadexcelhomeComponent.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    UploadexcelhomeComponent.prototype.submit = function () {
        var _this = this;
        var selectedOrderIds = this.form.value.orders
            .map(function (checked, i) { return checked ? _this.ordersData[i].id : null; })
            .filter(function (v) { return v !== null; });
        console.log(selectedOrderIds);
    };
    UploadexcelhomeComponent.prototype.onChangeCheckBoxLeftMenu = function (checked, tabName) {
        var _this = this;
        this.tempMergeSelectedArrayList = [];
        console.log('in   onChangeCheckBoxLeftMenu checked function is dynamic to all', checked, 'tabName', tabName);
        var index1 = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == tabName; });
        // Series loop
        (function (items) { return __awaiter(_this, void 0, void 0, function () {
            var i, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.employeeMasterModuleList.length)) return [3 /*break*/, 4];
                        if (!(this.employeeMasterModuleList[i].assignValue == tabName)) return [3 /*break*/, 3];
                        this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
                        return [4 /*yield*/, this.employeeMasterModuleList[i]];
                    case 2:
                        result = _a.sent();
                        console.log('await', result);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        var findGroupValue = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == tabName; });
        console.log('findGroupValue ', findGroupValue);
        if (findGroupValue == -1) {
            // Series loop
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = 0; i < this.employeeMasterModuleList.length; i++) {
                        if (this.employeeMasterModuleList[i].group > 0) {
                            this.employeeMasterModuleList[i].disabled = true;
                        }
                        else if (this.employeeMasterModuleList[i].assignValue === '' && this.employeeMasterModuleList[i].group == 0) {
                            this.employeeMasterModuleList[i].disabled = false;
                            this.employeeMasterModuleList[i].checked = false;
                        }
                        else { }
                    }
                    return [2 /*return*/];
                });
            }); });
        }
        else {
            // Series loop
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = 0; i < this.employeeMasterModuleList.length; i++) {
                        if (this.employeeMasterModuleList[i].group === this.employeeMasterModuleList[findGroupValue].group || this.employeeMasterModuleList[i].group == 0) {
                            this.employeeMasterModuleList[i].disabled = false;
                            if (this.employeeMasterModuleList[i].group == 0) {
                                this.employeeMasterModuleList[i].checked = false;
                            }
                        }
                        else {
                            this.employeeMasterModuleList[i].disabled = true;
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
        }
        if (checked == true) {
            // hide merge/unmerge button
            console.log('check this one', this.employeeMasterModuleList);
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var _loop_1, this_1, j;
                var _this = this;
                return __generator(this, function (_a) {
                    _loop_1 = function (j) {
                        if (this_1.employeeMasterModuleList[j].group > 0) {
                            if (this_1.employeeMasterModuleList[j].assignValue !== this_1.employeeMasterModuleList[j].title) {
                                var findIndexOfOrdersData = this_1.ordersData.findIndex(function (o) { return o.name == _this.employeeMasterModuleList[j].title; });
                                if (findIndexOfOrdersData !== -1) {
                                    this_1.ordersData[findIndexOfOrdersData].hide = true;
                                }
                            }
                        }
                        else {
                            var findIndexOfOrdersData = this_1.ordersData.findIndex(function (o) { return o.name == _this.employeeMasterModuleList[j].title; });
                            if (findIndexOfOrdersData !== -1) {
                                this_1.ordersData[findIndexOfOrdersData].hide = false;
                            }
                        }
                    };
                    this_1 = this;
                    for (j = 0; j < this.employeeMasterModuleList.length; j++) {
                        _loop_1(j);
                    }
                    return [2 /*return*/];
                });
            }); });
            console.log('ordersData in true stmt ', this.ordersData);
            var indx = this.filterDropDownList.findIndex(function (o) { return o == tabName; });
            if (indx == -1) {
                this.filterDropDownList.push(tabName);
                //  this.logicForHideNextButtonAndPreviousButton(tabName);
                ///  this.buttonIndex = this.filterDropDownList.length;
            }
            var counter_1 = 1;
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = 0; i < this.fieldNameArrayList.length; i++) {
                        if (this.fieldNameArrayList[i].tab === tabName) {
                            this.sequenceArray.push({ disable: false, value: counter_1++ });
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
            this.onChangFilterDropDown(tabName);
            this.form.patchValue({
                filterTemplateDropDown: tabName
            });
        }
        else {
            // hide merge/unmerge button
            // for(let j=0; j<this.employeeMasterModuleList.length;j++){
            //   if(this.employeeMasterModuleList[j].group> 0){
            //     if(this.employeeMasterModuleList[j].assignValue !== this.employeeMasterModuleList[j].title ){
            //       let findIndexOfOrdersData = this.ordersData.findIndex(o=>o.name == this.employeeMasterModuleList[j].title);
            //       if(findIndexOfOrdersData !== -1){
            //         this.ordersData[findIndexOfOrdersData].hide = true;
            //       }
            //     }
            //   }
            // }
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var _loop_2, this_2, j;
                var _this = this;
                return __generator(this, function (_a) {
                    _loop_2 = function (j) {
                        if (this_2.employeeMasterModuleList[j].group > 0) {
                            if (this_2.employeeMasterModuleList[j].assignValue !== this_2.employeeMasterModuleList[j].title) {
                                var findIndexOfOrdersData = this_2.ordersData.findIndex(function (o) { return o.name == _this.employeeMasterModuleList[j].title; });
                                if (findIndexOfOrdersData !== -1) {
                                    this_2.ordersData[findIndexOfOrdersData].hide = true;
                                }
                            }
                        }
                        else {
                            var findIndexOfOrdersData = this_2.ordersData.findIndex(function (o) { return o.name == _this.employeeMasterModuleList[j].title; });
                            if (findIndexOfOrdersData !== -1) {
                                this_2.ordersData[findIndexOfOrdersData].hide = false;
                            }
                        }
                    };
                    this_2 = this;
                    for (j = 0; j < this.employeeMasterModuleList.length; j++) {
                        _loop_2(j);
                    }
                    return [2 /*return*/];
                });
            }); });
            console.log('ordersData  in false stmt ', this.ordersData);
            console.log('before delete ', this.fieldNameArrayList);
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    for (i = this.checkBoxHtmlDataList.length - 1; i >= 0; --i) {
                        if (this.checkBoxHtmlDataList[i].tab == tabName) {
                            this.checkBoxHtmlDataList[i].isChecked = false;
                            this.checkBoxHtmlDataList.splice(i, 1);
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var b;
                return __generator(this, function (_a) {
                    for (b = 0; b < this.fieldNameArrayList.length; b++) {
                        if (this.fieldNameArrayList[b].tab == tabName) {
                            this.fieldNameArrayList[b].isChecked = false;
                            this.fieldNameArrayList[b].Sequence = 0;
                            this.fieldNameArrayList.splice(b, 1);
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
            (function (items) { return __awaiter(_this, void 0, void 0, function () {
                var k;
                return __generator(this, function (_a) {
                    for (k = this.selectedSummaryCheckBoxHtmlDataList.length - 1; k >= 0; --k) {
                        if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
                            this.selectedSummaryCheckBoxHtmlDataList[k].isChecked = false;
                            this.selectedSummaryCheckBoxHtmlDataList[k].Sequence = 0;
                            this.selectedSummaryCheckBoxHtmlDataList.splice(k, 1);
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
            var index = this.filterDropDownList.findIndex(function (o) { return o == tabName; });
            console.log('index to be splice is ', index, 'tabname is', tabName);
            this.filterDropDownList.splice(index, 1);
            if (index !== 0) {
                // this.leftSideMenuCheckBoxChnanged(true, this.filterDropDownList[index - 1]);
            }
            console.log('fieldNameArrayList', this.fieldNameArrayList);
            console.log('checkBoxHtmlDataList', this.checkBoxHtmlDataList);
            console.log('selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
            this.leftSideMenuCounter(tabName);
        }
        // let index = this.ordersData.findIndex(o=>o.name ==tabName );
        // this.ordersData[index].counter =0;
        // this.ordersData[index].counter = this.selectedSummaryCheckBoxHtmlDataList.filter(o=>o.tab === tabName && o.isChecked==true).length;
    };
    UploadexcelhomeComponent.prototype.leftSideMenuCheckBoxChnanged = function (evt, leftSideMenuName) {
        console.log(evt, '', leftSideMenuName);
        if (leftSideMenuName == 'Select All') {
        }
        else {
            this.onChangeCheckBoxLeftMenu(evt, leftSideMenuName);
            console.log('ordersData', this.ordersData);
        }
        //this.buttonPrevious();
    };
    // findMissingNumber(tabName: string) {
    //   let missedNumber = 0;
    //   for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
    //     if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
    //       this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => a.Sequence - b.Sequence);
    //     }
    //   }
    //   let flag = false;
    //   console.log('after sorting selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
    //   for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
    //     if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
    //       let p = k + 1;
    //       if (this.selectedSummaryCheckBoxHtmlDataList[k].Sequence == p.toString()) {
    //         console.log('p  ', p.toString());
    //       } else {
    //         if (flag == false) {
    //           missedNumber = p;
    //         }
    //       }
    //     }
    //   }
    //   console.log('missed number is  ', missedNumber);
    // }
    //  incrementCounter(row: any, isChecked: boolean, tabName: string, tableName: string) {
    //   for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
    //     if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
    //       this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => Number(a.Sequence) - Number(b.Sequence));
    //     }
    //   }
    //   let largestElement = 0;
    //   let s = 0;
    //   if (row.Sequence === 0) {
    //     for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
    //       s =0;
    //       if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName ) {
    //         s = 0;
    //         console.log(this.selectedSummaryCheckBoxHtmlDataList[k]);
    //         if (largestElement < Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence)) {
    //           largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence);
    //         }
    //         if(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence == s.toString()){
    //         } else {
    //            largestElement = Number(s);
    //            largestElement = Number(largestElement) ;
    //             const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
    //             this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();
    //         }
    //       }
    //     }
    //   }
    //   //console.log(JSON.stringify(this.selectedSummaryCheckBoxHtmlDataList));
    //  // let largestNo = this.findMissingNumber1(tabName, tableName);
    //   //console.log('largestNo ', largestNo);
    //   const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
    //   this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
    // }
    UploadexcelhomeComponent.prototype.decrementCounter = function (row, isChecked, tabName) {
        var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o === row; });
        this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = 0;
        this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
        var tableName = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tableName; })));
        console.log(tableName);
        var mInd = tableName.findIndex(function (o) { return o == row.tableName; });
        console.log(mInd);
        for (var k = tableName.length; k > mInd; --k) {
            for (var j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
                if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
                    var s = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) - +1;
                    this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s.toString();
                }
            }
        }
        this.leftSideMenuCounter(row.tab);
    };
    UploadexcelhomeComponent.prototype.notMoreThanOneMandatoryFieldDecrementCounter = function (row, tabName) {
        var _this = this;
        var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o === row; });
        row.Sequence = 0;
        this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
        var count = 1;
        this.selectedSummaryCheckBoxHtmlDataList.forEach(function (value, index) {
            if (value.tab == tabName) {
                console.log('index', index);
                _this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = count++;
            }
        });
        this.leftSideMenuCounter(row.tab);
    };
    UploadexcelhomeComponent.prototype.abc1 = function () {
        var _this = this;
        this.leftSideMenuCheckBoxChnanged(true, 'Compliance Information');
        setTimeout(function () {
        }, 1000);
        setTimeout(function () {
            for (var q = 0; q < _this.selectedSummaryCheckBoxHtmlDataList.length; q++) {
                if ((_this.selectedSummaryCheckBoxHtmlDataList[q].tab == _this.form.get('filterTemplateDropDown').value) && (_this.selectedSummaryCheckBoxHtmlDataList[q].isMandatory == 0)) {
                    _this.selectedSummaryCheckBoxHtmlDataList[q].isChecked = false;
                    _this.selectedSummaryCheckBoxHtmlDataList[q].Sequence = '0';
                    _this.selectedSummaryCheckBoxHtmlDataList.splice(q, 1);
                }
            }
            for (var i = 0; i < _this.fieldNameArrayList.length; i++) {
                if (_this.fieldNameArrayList[i].tab == _this.form.get('filterTemplateDropDown').value && _this.fieldNameArrayList[i].isMandatory == 0) {
                    _this.fieldNameArrayList[i].isChecked = true;
                    _this.selectedSummaryCheckBoxHtmlDataList.push(_this.fieldNameArrayList[i]);
                    // this.incrementCounter(this.fieldNameArrayList[i],true,this.fieldNameArrayList[i].tabName, this.fieldNameArrayList[i].tableName);
                    // this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
                    _this.getLargestNumberByTabWiseAndTableNameWise(_this.fieldNameArrayList[i].tab, _this.fieldNameArrayList[i].tableName, _this.fieldNameArrayList[i]);
                }
            }
        }, 1000);
    };
    UploadexcelhomeComponent.prototype.abc = function () {
        var _this = this;
        this.leftSideMenuCheckBoxChnanged(false, 'Compliance Information');
        setTimeout(function () {
            _this.abc1();
        }, 1000);
        //this.selectAllForMoreThanOneMandatoryfield('Compliance Information');
        // this.isSequenceAreProperlyAllocatedTableNameWise();
        //
        // console.log(index);
        // this.selectAllModel = !this.selectAllModel;
        // console.log(this.selectAllModel)
        // console.log('selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
        // console.log('filterTemplateDropDown', this.fieldNameArrayList);
        // this.checkThatAllItemsAreSelectedFromThatLeftMenu(this.form.get('filterTemplateDropDown').value);
        // this.findMissingNumber(this.form.get('filterTemplateDropDown').value);
        // this.getLargestNumberByTabWiseAndTableNameWise('Compliance Type', 'EmployeeComplianceInfo');
        // let index;
        // for (let i = 0; i < this.filterDropDownList.length; i++) {
        //   if (this.filterDropDownList[i] == this.form.get('filterTemplateDropDown').value) {
        //     index = i;
        //   }
        // }
        // let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
        // console.log(this.filterDropDownList);
        //  this.alertService.sweetalertError('index is '+ index + 'length is ' +this.filterDropDownList.length);
        // let index = this.ordersData.findIndex(o => o.name == this.form.get('filterTemplateDropDown').value);
        // this.ordersData[index].counter = 0;
    };
    UploadexcelhomeComponent.prototype.onChangeSequenceCheckBox = function (seq, myselect, row) {
        console.log('row', row);
        console.log('seq', seq);
        console.log('myselect ', myselect);
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == row.tab) {
                this.selectedSummaryCheckBoxHtmlDataList.sort(function (a, b) { return a.Sequence - b.Sequence; });
            }
        }
        console.log('selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
        console.log('cond1 ', row.tab == this.form.get('filterTemplateDropDown').value);
        if (row.tab == this.form.get('filterTemplateDropDown').value) {
            var index_1 = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o.fieldName == row.fieldName && o.tab == row.tab; });
            if (index_1 == -1) {
                row.checked = true;
                this.selectedSummaryCheckBoxHtmlDataList.push(row);
            }
            else {
                row.checked = true;
                this.selectedSummaryCheckBoxHtmlDataList[index_1].Sequence = row.Sequence.toString();
            }
            var flag = false;
            for (var j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
                if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab) {
                    var k = j + 1;
                    if (this.selectedSummaryCheckBoxHtmlDataList[j].Sequence == k.toString()) {
                        console.log('c ', k.toString());
                    }
                    else {
                        console.log('im in else', j);
                        console.log(this.selectedSummaryCheckBoxHtmlDataList);
                        //    this.selectedSummaryCheckBoxHtmlDataList.splice(j,1);
                        flag = true;
                        this.alertService.sweetalertError('Sequence are not properly allocated.');
                        //this.selectedSummaryCheckBoxHtmlDataList[j].Sequence ='';
                    }
                }
            }
            if (flag == true) {
                //  this.alertService.sweetalertWarning('Sequence are not properly allocated.');
            }
        }
        var index = this.sequenceArray.indexOf(function (p) { return p == seq; });
        if (index !== -1) {
            return false;
        }
        var delIndex = this.sequenceArray.findIndex(function (o) { return o == seq; });
    };
    UploadexcelhomeComponent.prototype.summaryCheckBoxHtmlDataListSelectAll = function (evt) {
        var _this = this;
        this.onChangePreviewDropDown(this.form.get('filterTemplateDropDown').value);
        if (evt == true) {
            setTimeout(function () {
                _this.abc();
            }, 3000);
            setTimeout(function () {
            }, 3000);
            // for (let q = 0; q < this.selectedSummaryCheckBoxHtmlDataList.length; q++) {
            //   if ((this.selectedSummaryCheckBoxHtmlDataList[q].tab == this.form.get('filterTemplateDropDown').value) && (this.selectedSummaryCheckBoxHtmlDataList[q].isMandatory == 0)) {
            //     this.selectedSummaryCheckBoxHtmlDataList[q].isChecked = false;
            //     this.selectedSummaryCheckBoxHtmlDataList[q].Sequence = '0';
            //     this.selectedSummaryCheckBoxHtmlDataList.splice(q, 1);
            //   }
            // }
            // for (let i = 0; i < this.fieldNameArrayList.length; i++) {
            //   if (this.fieldNameArrayList[i].tab == this.form.get('filterTemplateDropDown').value && this.fieldNameArrayList[i].isMandatory == 0) {
            //     this.fieldNameArrayList[i].isChecked = true;
            //     this.selectedSummaryCheckBoxHtmlDataList.push(this.fieldNameArrayList[i]);
            //     const m1 = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.isMandatory == 1 && o.tab == this.fieldNameArrayList[i].tab);
            //     const tableName = [...new Set(m1.map((item) => item.tableName))];
            //     console.log(tableName);
            //     if (tableName.length > 1) {
            //       this.selectAllLogicForMoreThanOneMandatoryFieldInDifferntTables(this.fieldNameArrayList[i]);
            //     } else {
            //       // this.incrementCounter(this.fieldNameArrayList[i],true,this.fieldNameArrayList[i].tabName, this.fieldNameArrayList[i].tableName);
            //       // this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
            //       this.getLargestNumberByTabWiseAndTableNameWise(this.fieldNameArrayList[i].tab, this.fieldNameArrayList[i].tableName, this.fieldNameArrayList[i]);
            //     }
            //   }
            // }
        }
        else {
            console.log('add uncheck logic here tab is', this.form.get('filterTemplateDropDown').value);
            var _loop_3 = function (i) {
                if (this_3.selectedSummaryCheckBoxHtmlDataList[i].tab == this_3.form.get('filterTemplateDropDown').value && this_3.selectedSummaryCheckBoxHtmlDataList[i].isMandatory == 0) {
                    this_3.selectedSummaryCheckBoxHtmlDataList[i].isChecked = false;
                    this_3.selectedSummaryCheckBoxHtmlDataList[i].Sequence = '0';
                    var m1 = this_3.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.isMandatory == 1 && o.tab == _this.fieldNameArrayList[i].tab; });
                    var tableName = __spreadArrays(new Set(m1.map(function (item) { return item.tableName; })));
                    console.log(tableName);
                    if (tableName.length > 1) {
                        this_3.UnSelectAllLogicForMoreThanOneMandatoryFieldInDifferntTables(this_3.selectedSummaryCheckBoxHtmlDataList[i]);
                    }
                    else {
                        //  this.decrementCounter(this.selectedSummaryCheckBoxHtmlDataList[i],true,this.selectedSummaryCheckBoxHtmlDataList[i].tabName, this.selectedSummaryCheckBoxHtmlDataList[i].tableName);
                        this_3.notMoreThanOneMandatoryFieldDecrementCounter(this_3.selectedSummaryCheckBoxHtmlDataList[i], this_3.selectedSummaryCheckBoxHtmlDataList[i].tabName);
                    }
                    // this.summaryCheckBoxHtmlDataListChanged(false, this.selectedSummaryCheckBoxHtmlDataList[i]);
                }
            };
            var this_3 = this;
            for (var i = this.selectedSummaryCheckBoxHtmlDataList.length - 1; i >= 0; i--) {
                _loop_3(i);
            }
            var ind = this.filterDropDownList.findIndex(function (o) { return o == _this.form.get('filterTemplateDropDown').value; });
            this.filterDropDownList.splice(ind, 1);
            this.filterDropDownList.push(this.form.get('filterTemplateDropDown').value);
        }
    };
    //08-02-2021
    UploadexcelhomeComponent.prototype.selectAllForMoreThanOneMandatoryfield = function (tabName) {
        console.log('Seq Array', this.sequenceArray);
        // this.leftSideMenuCheckBoxChnanged(true, 'Personal Information');
        //   // the below code will remove all the mandatory fild as well as user checked fields..
        //   for (let k = this.selectedSummaryCheckBoxHtmlDataList.length - 1; k >= 0; --k) {
        //     if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
        //       this.selectedSummaryCheckBoxHtmlDataList[k].isChecked = false;
        //       this.selectedSummaryCheckBoxHtmlDataList[k].Sequence = 0;
        //       this.selectedSummaryCheckBoxHtmlDataList.splice(k, 1);
        //     }
        //   }
        //   console.log(this.fieldNameArrayList);
        //   for (let k = this.fieldNameArrayList.length - 1; k >= 0; --k) {
        //     if (this.fieldNameArrayList[k].tab == tabName) {
        //       this.fieldNameArrayList.splice(k, 1);
        //     }
        //   }
        //  // console.log(this.selectedSummaryCheckBoxHtmlDataList);
        //  console.log(this.fieldNameArrayList);
        // this.sequenceArray = [];
        // this.checkBoxHtmlDataList1 = [];
        // this.global.filter((o) => {
        //   if (o.tab === tabName) {
        //     this.checkBoxHtmlDataList1.push(o);
        //   }
        // });
        // console.log('after clear checkBoxHtmlDataList1', this.checkBoxHtmlDataList1);
        // this.fieldNameArrayList = [];
        // this.fieldNameArrayList = this.checkBoxHtmlDataList1;
        // console.log('after adding new fieldNameArrayList', this.fieldNameArrayList);
        // const counter = 1;
        // for (let i = 0; i < this.fieldNameArrayList.length; i++) {
        //   if (this.fieldNameArrayList[i].tab === tabName) {
        //    this.selectedSummaryCheckBoxHtmlDataList.push(this.fieldNameArrayList[i]);
        //   // this.sequenceArray.push({ disable: false, value:i+1 });
        //  //  this.getLargestNumberByTabWiseAndTableNameWise(row.tabName, row.tableName, row);
        //   //  this.sequenceArray.push({ disable: false, value: counter++ });
        //   }
        // }
        // let largestElement = 1;
        // for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
        //   if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
        //     if(this.selectedSummaryCheckBoxHtmlDataList[k].isMandatory ==1){
        //       this.sequenceArray.push({ disable: false, value:k });
        //       this.selectedSummaryCheckBoxHtmlDataList[k].Sequence = (k+1).toString();
        //       largestElement = largestElement +1;
        //     } else {
        //       this.sequenceArray.push({ disable: true, value:k });
        //       this.selectedSummaryCheckBoxHtmlDataList[k].Sequence = (k+1).toString();
        //       largestElement = largestElement +1;
        //     }
        //   }
        // }
        // console.log(' this.selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
        // const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
        // console.log('index  ', index);
        // this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
        // for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
        //   this.selectedSummaryCheckBoxHtmlDataList[k].isChecked = true;
        //   this.selectedSummaryCheckBoxHtmlDataList[k].Sequence = largestElement.toString();
        //   largestElement = Number(largestElement) + 1;
        // }
        //   const m1 = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.isMandatory == 1 && o.tab == tabName);
        //   const tableName = [...new Set(m1.map((item) => item.tableName))];
        //   console.log(tableName);
        //   if (tableName.length > 1) {
        //     let m = 0;
        //   let largestElement = 0;
        //   for (let i = 0; i < tableName.length; i++) {
        //     largestElement = 0;
        //     for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
        //       if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == row.tableName) {
        //         if (Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) > largestElement) {
        //           largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence);
        //         }
        //       }
        //     }
        //   }
        //   let s = Number(largestElement + 1);
        //   const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
        //   console.log('index', index);
        //   this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();
        //   let mInd = tableName.findIndex(o => o == row.tableName);
        //   console.log(mInd);
        //   for (let k = mInd + 1; k < tableName.length; k++) {
        //     for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
        //       if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
        //         let s = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) + 1;
        //         this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s.toString();
        //       }
        //     }
        //   }
        // }
    };
    UploadexcelhomeComponent.prototype.selectAllLogicForMoreThanOneMandatoryFieldInDifferntTables = function (row) {
        var m1 = this.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.isMandatory == 1 && o.tab == row.tab; });
        var tableName = __spreadArrays(new Set(m1.map(function (item) { return item.tableName; })));
        console.log(tableName);
        if (tableName.length > 1) {
            var largestElement = 0;
            var m = 0;
            for (var i = 0; i < tableName.length; i++) {
                largestElement = 0;
                for (var j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
                    if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == row.tableName) {
                        m = m + 1;
                        if (Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) > largestElement) {
                            largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence);
                        }
                    }
                }
            }
            var s = Number(largestElement + 1);
            var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o == row; });
            this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();
            var mInd = tableName.findIndex(function (o) { return o == row.tableName; });
            console.log(mInd);
            for (var k = mInd + 1; k < tableName.length; k++) {
                for (var j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
                    if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
                        var s_1 = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) + 1;
                        this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s_1.toString();
                    }
                }
            }
        }
        else {
            console.log('table length is not greater than 1');
            //   this.incrementCounter(this.fieldNameArrayList[i], true, this.form.get('filterTemplateDropDown').value, this.fieldNameArrayList[i].tableName);
        }
    };
    UploadexcelhomeComponent.prototype.UnSelectAllLogicForMoreThanOneMandatoryFieldInDifferntTables = function (row) {
        this.decrementCounter(row, false, row.tab);
    };
    UploadexcelhomeComponent.prototype.summaryCheckBoxHtmlDataListChanged = function (evt, row, Seq) {
        console.log('Seq is ', Seq);
        this.onChangePreviewDropDown(this.form.get('filterTemplateDropDown').value);
        // this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName);
        this.checkThatAllItemsAreSelectedFromThatLeftMenu(row.tab);
        var m1 = this.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.isMandatory == 1 && o.tab == row.tab; });
        var tableName = __spreadArrays(new Set(m1.map(function (item) { return item.tableName; })));
        console.log(tableName);
        var ind = this.filterDropDownList.findIndex(function (o) { return o == row.tab; });
        if (evt == true) {
            if (Seq !== undefined) {
                row.Sequence = Seq.toString();
            }
            row.isChecked = true;
            var ind_1 = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o == row; });
            if (ind_1 == -1) {
                this.selectedSummaryCheckBoxHtmlDataList.push(row);
            }
            console.log('this.ordersData', this.ordersData);
            this.leftSideMenuCounter(row.tab);
            // this.incrementCounter(row, evt, row.tab,row.tableName);
            if (row.isMandatory == 1) {
                this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName, row);
            }
            else {
                //  this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName, row);
                if (tableName.length > 1) {
                    var largestElement = 0;
                    for (var i = 0; i < tableName.length; i++) {
                        largestElement = 0;
                        for (var j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
                            if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == row.tableName) {
                                if (Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) > largestElement) {
                                    largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence);
                                }
                            }
                        }
                    }
                    var s = Number(largestElement + 1);
                    var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o == row; });
                    console.log('index', index);
                    this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();
                    var mInd = tableName.findIndex(function (o) { return o == row.tableName; });
                    console.log(mInd);
                    for (var k = mInd + 1; k < tableName.length; k++) {
                        for (var j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
                            if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
                                var s_2 = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) + 1;
                                this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s_2.toString();
                            }
                        }
                    }
                }
                else {
                    //  this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName, row);
                    this.incrementCounter(row, evt, row.tab, row.tableName);
                }
            }
        }
        else {
            row.isChecked = false;
            if (tableName.length > 1) {
                this.decrementCounter(row, evt, row.tab);
            }
            else {
                this.notMoreThanOneMandatoryFieldDecrementCounter(row, row.tab);
            }
        }
    };
    UploadexcelhomeComponent.prototype.getFilteredRecordByTableName = function (element, index, array, tableName) {
        return (element == tableName);
    };
    UploadexcelhomeComponent.prototype.onChangFilterDropDown = function (leftSideMenuName) {
        var _this = this;
        this.onChangePreviewDropDown(leftSideMenuName);
        this.sequenceArray = [];
        this.checkBoxHtmlDataList1 = [];
        this.global.filter(function (o) {
            if (o.tab === leftSideMenuName) {
                _this.checkBoxHtmlDataList1.push(o);
            }
        });
        console.log('after clear checkBoxHtmlDataList1', this.checkBoxHtmlDataList1);
        this.fieldNameArrayList = [];
        this.fieldNameArrayList = this.checkBoxHtmlDataList1;
        console.log('after adding new fieldNameArrayList', this.fieldNameArrayList);
        var counter = 1;
        for (var i = 0; i < this.fieldNameArrayList.length; i++) {
            if (this.fieldNameArrayList[i].tab === leftSideMenuName) {
                if (this.fieldNameArrayList[i].isMandatory == 1) {
                    this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
                }
                this.sequenceArray.push({ disable: false, value: counter++ });
            }
        }
        if (this.filterDropDownList.length == 1 || this.filterDropDownList.length == 0) {
            this.hideNextButton = true;
            this.hidePreviousButton = false;
        }
        var index = this.filterDropDownList.findIndex(function (o) { return o == _this.form.get('filterTemplateDropDown').value; });
        this.indexNextAndPrevious = index;
        if (index == this.filterDropDownList.length - 1) {
            //  this.hideNextButton = true;
        }
    };
    UploadexcelhomeComponent.prototype.logicForHideNextButtonAndPreviousButton = function (tabName) {
        // let index = this.filterDropDownList.find((o, index) => index == tabName);
        //let index = this.filterDropDownList.findIndex((o) => o == tabName);
        // console.log('index is ',index +'filterdropdown list ',this.filterDropDownList)
        var index;
        for (var i = 0; i < this.filterDropDownList.length; i++) {
            if (this.filterDropDownList[i] == tabName) {
                index = i;
            }
        }
        this.alertService.sweetalertError(index);
        if (this.filterDropDownList.length > 1 && index !== -1) {
            this.hideNextButton = true;
            if (index == this.filterDropDownList.length - 1) {
                this.hideNextButton = false;
                this.hidePreviousButton = true;
            }
            if (index == 0) {
                this.hidePreviousButton = true;
            }
            else {
                // this.hidePreviousButton = true;
            }
        }
        if (index == 1) {
            this.hidePreviousButton = true;
        }
    };
    UploadexcelhomeComponent.prototype.test = function () {
        console.log('in test');
        for (var i = 0; i < this.summaryCheckBoxHtmlDataListChanged.length; i++) {
            if (this.summaryCheckBoxHtmlDataListChanged[i].tab === this.form.get('filterTemplateDropDown').value) {
                this.selectedSummaryCheckBoxHtmlDataList.sort(function (a, b) { return a.Sequence - b.Sequence; });
            }
        }
        console.log('array sorting done ', this.form.get('filterTemplateDropDown').value, '  ', this.selectedSummaryCheckBoxHtmlDataList);
    };
    UploadexcelhomeComponent.prototype.onClickEmployeeMaster = function (evt) {
        console.log('in onClickEmployeeMaster', evt.target.checked);
        if (evt.target.checked == true) {
            this.checkedEmployeeMaster = true;
        }
        else {
            this.checkedEmployeeMaster = false;
        }
    };
    UploadexcelhomeComponent.prototype.onClickPayrollMaster = function (evt) {
        console.log(evt.target.checked);
        if (evt.target.checked == true) {
            this.checkedPayrollMaster = true;
        }
        else {
            this.checkedPayrollMaster = false;
        }
    };
    UploadexcelhomeComponent.prototype.onClickAssetMaster = function (evt) {
        console.log(evt.target.checked);
        if (evt.target.checked == true) {
            this.checkedAssetMaster = true;
        }
        else {
            this.checkedAssetMaster = false;
        }
    };
    UploadexcelhomeComponent.prototype.onClickLeaveManagement = function (evt) {
        console.log(evt.target.checked);
        if (evt.target.checked == true) {
            this.checkedLeaveManangement = true;
        }
        else {
            this.checkedLeaveManangement = false;
        }
    };
    UploadexcelhomeComponent.prototype.saveAsBlob = function (data) {
        console.log(data);
        var pre = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
        console.log(pre);
        // const linkSource = 'data:application/pdf;base64,' + data;
        FileSaver.saveAs(pre, 'nameFile' + '.xlsx');
    };
    UploadexcelhomeComponent.prototype.downloadFile = function (i) {
        this.saveAsBlob(this.masterOfExcelTemplate[i].excelFile);
    };
    UploadexcelhomeComponent.prototype.deleteTemplate = function (templateMasterId) {
        var _this = this;
        this.uploadeExcelHomeService.deleteExcelTemplate(templateMasterId).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () {
            _this.getAllExcelTemplate();
        });
    };
    UploadexcelhomeComponent.prototype.saveMaster = function () {
        var _this = this;
        this.assignMergeFieldToAllSelectedCheckBoxHtmlDataList();
        if (this.isEditMode == false) {
            var a = this.isSequenceAreProperlyAllocatedTableNameWise();
            console.log(a);
            if (a == false) {
                this.sheetsize = 0;
                this.json = [];
                var temp_1 = [];
                var sheet1 = [];
                var oneAllowEmpCode = 0;
                var _loop_4 = function (q) {
                    if (this_4.employeeMasterModuleList[q].group > 0) {
                        this_4.selectedSummaryCheckBoxHtmlDataList.forEach(function (element, index) {
                            if (_this.employeeMasterModuleList[q].title == element.tab) {
                                element.tab = _this.employeeMasterModuleList[q].assignValue;
                            }
                        });
                    }
                };
                var this_4 = this;
                for (var q = 0; q < this.employeeMasterModuleList.length; q++) {
                    _loop_4(q);
                }
                console.log('After merge selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
                var counter = 0;
                var assignValueArray = __spreadArrays(new Set(this.employeeMasterModuleList.map(function (item) { return item.assignValue; })));
                console.log('assign value array', assignValueArray);
                var deleteEmpCode = false;
                for (var t = 0; t < assignValueArray.length; t++) {
                    console.log('imp check this', assignValueArray[t]);
                    if (assignValueArray[t].length !== 0) {
                        for (var p = 0; p < this.selectedSummaryCheckBoxHtmlDataList.length; p++) {
                            console.log(assignValueArray[t]);
                            console.log(this.selectedSummaryCheckBoxHtmlDataList[p].tab);
                            console.log('check this', this.selectedSummaryCheckBoxHtmlDataList[p].tab == assignValueArray[t]);
                            if (this.selectedSummaryCheckBoxHtmlDataList[p].tab == assignValueArray[t]) {
                                if (this.selectedSummaryCheckBoxHtmlDataList[p].fieldName == 'Employee Code') {
                                    if (deleteEmpCode == true) {
                                        this.selectedSummaryCheckBoxHtmlDataList.splice(p, 1);
                                    }
                                    deleteEmpCode = true;
                                }
                            }
                        }
                    }
                }
                /// below code is used for removing employee code in one sheet multiple times....
                var unique_1 = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tableName; })));
                var _loop_5 = function (i) {
                    var result = this_5.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.tableName == unique_1[i]; });
                    console.log('result is', result);
                    var fieldName = '';
                    var seq = '';
                    var set = new Set(result);
                    set.forEach(function (o) {
                        if (fieldName.length == 0) {
                            fieldName = o.fieldName;
                            seq = o.Sequence;
                            // if (o.fieldName == 'Company Code') {
                            //   fieldName = fieldName + ',' + 'Employee Code';
                            //   seq = seq + ',' + o.Sequence;
                            // }
                            if (_this.addFromDateToDate(o.fieldName)) {
                                fieldName = fieldName + ',' + 'From Date' + ',' + 'To Date';
                            }
                        }
                        else {
                            fieldName = fieldName + ',' + o.fieldName;
                            seq = seq + ',' + o.Sequence;
                            if (_this.addFromDateToDate(o.fieldName)) {
                                fieldName = fieldName + ',' + 'From Date' + ',' + 'To Date';
                            }
                        }
                        var a = o.tab.split(" ");
                        temp_1[i] = ({ tabName: o.tab, sheetName: 'Employee_' + a[0], tableName: unique_1[i], fields: fieldName, sequence: seq, mergeTabName: o.merged });
                        //below line code used for concatenate Employee_Personal like that
                        // temp[i] = ({ sheetName: 'Employee_' + a[0], tableName: unique[i], fields: fieldName, sequence: seq, mergeTabName: '' });
                        //temp[i] = ({ sheetName: 'Employee_' + a[0], tableName: unique[i], fields: fieldName });
                    });
                };
                var this_5 = this;
                // console.log('unique', unique); // 2 found  Employee Personal Info and EmployeeMaster Table
                for (var i = 0; i < unique_1.length; i++) {
                    _loop_5(i);
                }
                console.log('temp printed ', temp_1);
                var sheetNameUnique = __spreadArrays(new Set(temp_1.map(function (item) { return item.sheetName; })));
                var tempData = {};
                //  let json = JSON.stringify(temp);
                this.json = temp_1;
                console.log('json is printed ', this.json);
                // const sheetNameUnique = [...new Set(JSON.stringify(temp).map((item) => item.sheetName))]; /// sheetName means tabName
                console.log(sheetNameUnique);
                var sheetArray = [];
                for (var x = 0; x < sheetNameUnique.length; x++) {
                    var tempArr = [];
                    for (var y = 0; y < this.json.length; y++) {
                        if (sheetNameUnique[x] == this.json[y].sheetName) {
                            var propertyName = 'sheet' + (x + 1);
                            tempArr.push({
                                tabName: this.json[y].tabName,
                                sheetName: this.json[y].sheetName,
                                tableName: this.json[y].tableName,
                                fields: this.json[y].fields,
                                sequence: this.json[y].sequence,
                                mergeTabName: this.json[y].mergeTabName
                            });
                        }
                    }
                    this.objectify('sheet' + (x + 1), tempArr);
                }
                for (var i = 0; i < temp_1.length; i++) {
                    for (var j = 0; j < sheetNameUnique.length; j++) {
                        if (temp_1[i].sheetName === sheetNameUnique) {
                            // this.customizedResponse[j][sheetName]
                        }
                    }
                }
                sheet1.push(temp_1);
                var saveObject = {
                    templateMasterId: 0,
                    templateName: this.form.get('templateName').value,
                    remark: this.form.get('remark').value ? null : '',
                    description: this.form.get('description').value ? null : '',
                    companyId: 1,
                    module: 'EmpMaster',
                    sheetSize: this.sheetsize.toString()
                };
                var object3 = __assign(__assign({}, saveObject), this.anantTemp);
                console.log('json obj for saving', JSON.stringify(object3));
                this.uploadeExcelHomeService.postExcelTemplateGeneration(object3).subscribe(function (res) {
                    if (res.data.results.length > 0) {
                        _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                        _this.cancelView();
                        _this.getAllExcelTemplate();
                    }
                    else {
                        _this.alertService.sweetalertWarning(res.status.messsage);
                    }
                }, function (error) {
                    _this.alertService.sweetalertError(error.error.status.messsage);
                }, function () {
                });
            }
        }
        else {
            var a = this.isSequenceAreProperlyAllocatedTableNameWise();
            console.log(a);
            if (a == false) {
                this.sheetsize = 0;
                this.json = [];
                var temp_2 = [];
                var sheet1 = [];
                var oneAllowEmpCode = 0;
                var _loop_6 = function (q) {
                    if (this_6.employeeMasterModuleList[q].group > 0) {
                        this_6.selectedSummaryCheckBoxHtmlDataList.forEach(function (element, index) {
                            if (_this.employeeMasterModuleList[q].title == element.tab) {
                                element.tab = _this.employeeMasterModuleList[q].assignValue;
                            }
                        });
                    }
                };
                var this_6 = this;
                for (var q = 0; q < this.employeeMasterModuleList.length; q++) {
                    _loop_6(q);
                }
                console.log('After merge selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
                var counter = 0;
                var assignValueArray = __spreadArrays(new Set(this.employeeMasterModuleList.map(function (item) { return item.assignValue; })));
                console.log('assign value array', assignValueArray);
                var deleteEmpCode = false;
                for (var t = 0; t < assignValueArray.length; t++) {
                    console.log('imp check this', assignValueArray[t]);
                    if (assignValueArray[t].length !== 0) {
                        for (var p = 0; p < this.selectedSummaryCheckBoxHtmlDataList.length; p++) {
                            console.log(assignValueArray[t]);
                            console.log(this.selectedSummaryCheckBoxHtmlDataList[p].tab);
                            console.log('check this', this.selectedSummaryCheckBoxHtmlDataList[p].tab == assignValueArray[t]);
                            if (this.selectedSummaryCheckBoxHtmlDataList[p].tab == assignValueArray[t]) {
                                if (this.selectedSummaryCheckBoxHtmlDataList[p].fieldName == 'Employee Code') {
                                    if (deleteEmpCode == true) {
                                        this.selectedSummaryCheckBoxHtmlDataList.splice(p, 1);
                                    }
                                    deleteEmpCode = true;
                                }
                            }
                        }
                    }
                }
                /// below code is used for removing employee code in one sheet multiple times....
                var unique_2 = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tableName; })));
                var _loop_7 = function (i) {
                    var result = this_7.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.tableName == unique_2[i]; });
                    console.log('result is', result);
                    var fieldName = '';
                    var seq = '';
                    var set = new Set(result);
                    set.forEach(function (o) {
                        if (fieldName.length == 0) {
                            fieldName = o.fieldName;
                            seq = o.Sequence;
                            // if (o.fieldName == 'Company Code') {
                            //   fieldName = fieldName + ',' + 'Employee Code';
                            //   seq = seq + ',' + o.Sequence;
                            // }
                            if (_this.addFromDateToDate(o.fieldName)) {
                                fieldName = fieldName + ',' + 'From Date' + ',' + 'To Date';
                            }
                        }
                        else {
                            fieldName = fieldName + ',' + o.fieldName;
                            seq = seq + ',' + o.Sequence;
                            if (_this.addFromDateToDate(o.fieldName)) {
                                fieldName = fieldName + ',' + 'From Date' + ',' + 'To Date';
                            }
                        }
                        var a = o.tab.split(" ");
                        temp_2[i] = ({ tabName: o.tab, sheetName: 'Employee_' + a[0], tableName: unique_2[i], fields: fieldName, sequence: seq, mergeTabName: o.merged });
                        //below line code used for concatenate Employee_Personal like that
                        // temp[i] = ({ sheetName: 'Employee_' + a[0], tableName: unique[i], fields: fieldName, sequence: seq, mergeTabName: '' });
                        //temp[i] = ({ sheetName: 'Employee_' + a[0], tableName: unique[i], fields: fieldName });
                    });
                };
                var this_7 = this;
                // console.log('unique', unique); // 2 found  Employee Personal Info and EmployeeMaster Table
                for (var i = 0; i < unique_2.length; i++) {
                    _loop_7(i);
                }
                console.log('temp printed ', temp_2);
                var sheetNameUnique = __spreadArrays(new Set(temp_2.map(function (item) { return item.sheetName; })));
                var tempData = {};
                //  let json = JSON.stringify(temp);
                this.json = temp_2;
                console.log('json is printed ', this.json);
                // const sheetNameUnique = [...new Set(JSON.stringify(temp).map((item) => item.sheetName))]; /// sheetName means tabName
                console.log(sheetNameUnique);
                var sheetArray = [];
                for (var x = 0; x < sheetNameUnique.length; x++) {
                    var tempArr = [];
                    for (var y = 0; y < this.json.length; y++) {
                        if (sheetNameUnique[x] == this.json[y].sheetName) {
                            var propertyName = 'sheet' + (x + 1);
                            tempArr.push({
                                tabName: this.json[y].tabName,
                                sheetName: this.json[y].sheetName,
                                tableName: this.json[y].tableName,
                                fields: this.json[y].fields,
                                sequence: this.json[y].sequence,
                                mergeTabName: this.json[y].mergeTabName
                            });
                        }
                    }
                    this.objectify('sheet' + (x + 1), tempArr);
                }
                for (var i = 0; i < temp_2.length; i++) {
                    for (var j = 0; j < sheetNameUnique.length; j++) {
                        if (temp_2[i].sheetName === sheetNameUnique) {
                            // this.customizedResponse[j][sheetName]
                        }
                    }
                }
                sheet1.push(temp_2);
                var saveObject = {
                    templateMasterId: this.templateMasterId,
                    templateName: this.form.get('templateName').value,
                    remark: this.form.get('remark').value,
                    description: this.form.get('description').value,
                    companyId: 1,
                    module: 'EmpMaster',
                    sheetSize: this.sheetsize.toString()
                };
                var object3 = __assign(__assign({}, saveObject), this.anantTemp);
                console.log('json obj for saving', JSON.stringify(object3));
                this.uploadeExcelHomeService.postExcelTemplateGeneration(object3).subscribe(function (res) {
                    if (res.data.results.length > 0) {
                        _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                        _this.cancelView();
                        _this.getAllExcelTemplate();
                    }
                    else {
                        _this.alertService.sweetalertWarning(res.status.messsage);
                    }
                }, function (error) {
                    _this.alertService.sweetalertError(error.error.status.messsage);
                }, function () { });
            }
        }
    };
    UploadexcelhomeComponent.prototype.cancelView = function () {
        this.isViewMode = false;
        this.isViewFieldNameArrayList = false;
        this.isEditMode = false;
        this.errorInSequence = false;
        this.filterDropDownList = [];
        this.global = [];
        // reset value merge unmerge left side menu
        this.personalInfoMergeTab = false;
        this.complianceInfoMergeTab = false;
        this.contactInfoMergeTab = false;
        this.identityInfoMergeTab = false;
        this.jobInfoMergeTab = false;
        this.previousEmployementMergeTab = false;
        this.eduAndSkillMergeTab = false;
        this.employmentInfoMergeTab = false;
        this.familyInfoMergeTab = false;
        this.payrollInfoMergeTab = false;
        this.isEditMode = false;
        this.preview = false;
        this.form.reset();
        this.selectedSummaryCheckBoxHtmlDataList = [];
        this.employeeMasterModuleList = [];
        this.fieldNameArrayList = [];
        this.sequenceArray = [];
        this.hideNextButton = false;
        this.hidePreviousButton = false;
        this.mergePersonalInformation = false;
        this.mergeComplianceInformation = false;
        this.mergeContactInformation = false;
        this.mergeIdentityInformation = false;
        this.mergeEducationAndSkillInformation = false;
        this.mergeEmploymentInformation = false;
        this.mergePreviousEmploymentInformation = false;
        this.mergePayrollInformation = false;
        this.mergeFamilyInformation = false;
        this.mergeJobInformation = false;
        this.getAllExcelTemplate();
        this.getExcelTableFields();
    };
    UploadexcelhomeComponent.prototype.uploadExcelSheet = function () {
        var _this = this;
        console.log('in upload excel sheet', this.formData);
        if (this.formData == undefined) {
            this.alertService.sweetalertInfo('Please select excel sheet to be upload.');
        }
        else {
            this.uploadeExcelHomeService.postExcelUpload(this.formData).subscribe(function (res) {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }, function (error) {
                _this.alertService.sweetalertError(error.error.status.messsage);
            });
        }
    };
    UploadexcelhomeComponent.prototype.readFile = function (event, uploadFile) {
        console.log('read file');
        var file = event.target.files[0];
        var reader = new FileReader();
        var selectedImageFileLogo3;
        if (event.target.files && event.target.files.length) {
            selectedImageFileLogo3 = event.target.files[0];
            var file_1 = event.target.files[0];
            reader.readAsDataURL(file_1);
        }
        this.formData = new FormData();
        this.formData.append('file', event.target.files[0]);
        console.log('in upload excel sheet', this.formData);
        console.log('formData', this.formData);
    };
    // buttonNext() {
    //   let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
    //   console.log('button next index is', index, 'filterDropDownList.length - 1 is ', this.filterDropDownList.length - 1);
    //   this.buttonIndex = index;
    //   if (index == 0) {
    //     this.hidePreviousButton = true;
    //     this.hideNextButton = false;
    //   }
    //   if (index == this.filterDropDownList.length - 1) {
    //     this.hidePreviousButton = true;
    //     this.hideNextButton = false;
    //   } else {
    //   //  this.onChangFilterDropDown(this.filterDropDownList[index + 1]);
    //   this.logicForHideNextButtonAndPreviousButton(this.filterDropDownList[index-1]);
    //     this.form.patchValue({
    //       filterTemplateDropDown: this.filterDropDownList[index + 1]
    //     });
    //   }
    // }
    UploadexcelhomeComponent.prototype.buttonPrevious = function () {
        var _this = this;
        console.log('clicked on previous');
        var index = this.filterDropDownList.findIndex(function (o) { return o == _this.form.get('filterTemplateDropDown').value; });
        this.indexNextAndPrevious = index;
        console.log('clicked on previous index', index);
        this.buttonIndex = index;
        if (this.filterDropDownList.length > 1) {
            if (index == (this.filterDropDownList.length - 1)) {
                this.hideNextButton = true;
                this.hidePreviousButton = false;
            }
            if (index == 1) {
                this.hideNextButton = true;
                this.hidePreviousButton = false;
                this.onChangFilterDropDown(this.filterDropDownList[index - 1]);
                this.form.patchValue({
                    filterTemplateDropDown: this.filterDropDownList[index - 1]
                });
            }
            else if (index !== 0) {
                this.hidePreviousButton = true;
                this.onChangFilterDropDown(this.filterDropDownList[index - 1]);
                this.form.patchValue({
                    filterTemplateDropDown: this.filterDropDownList[index - 1]
                });
            }
        }
    };
    UploadexcelhomeComponent.prototype.buttonNext = function () {
        var _this = this;
        var index = this.filterDropDownList.findIndex(function (o) { return o == _this.form.get('filterTemplateDropDown').value; });
        this.buttonIndex = index;
        this.indexNextAndPrevious = index;
        if (this.filterDropDownList.length > 1) {
            if (index == 0) {
                this.hidePreviousButton = true;
            }
            if (index == this.filterDropDownList.length - 1) {
                this.hidePreviousButton = true;
                this.hideNextButton = false;
            }
            else {
                this.hideNextButton = true;
                this.onChangFilterDropDown(this.filterDropDownList[index + 1]);
                this.form.patchValue({
                    filterTemplateDropDown: this.filterDropDownList[index + 1]
                });
            }
        }
    };
    // buttonPrevious() {
    //   console.log('clicked on previous');
    //   let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
    //   this.indexNextAndPrevious = index;
    //   console.log('clicked on previous index', index);
    //   // if (index == this.filterDropDownList.length - 1 && index !== 0) {
    //   //   this.alertService.sweetalertWarning('You reached to last element 11');
    //   //   // this.hidePreviousButton = true;
    //   //   this.hideNextButton = true;
    //   //   this.hidePreviousButton = false;
    //   // }
    //   // if (index == 0) {
    //   //   this.alertService.sweetalertWarning('You reached to first element 12');
    //   //   this.hideNextButton = true;
    //   //   this.hidePreviousButton = false;
    //   // } else {
    //     // this.hidePreviousButton = true;
    //     if(index >0){
    //       if(index ==1){
    //         this.hidePreviousButton = false;
    //       }
    //       console.log('value sending is', this.filterDropDownList[index - 1]);
    //       this.onChangFilterDropDown(this.filterDropDownList[index - 1]);
    //       this.form.patchValue({
    //         filterTemplateDropDown: this.filterDropDownList[index - 1],
    //       });
    //     } else {
    //       this.hidePreviousButton = false;
    //     }
    // }
    UploadexcelhomeComponent.prototype.getOrders = function () {
        return this.leftSideBarMenuList;
    };
    UploadexcelhomeComponent.prototype.minSelectedCheckboxes = function (min) {
        if (min === void 0) { min = 1; }
        var validator = function (formArray) {
            var totalSelected = formArray.controls
                // get a list of checkbox values (boolean)
                .map(function (control) { return control.value; })
                // total up the number of checked checkboxes
                .reduce(function (prev, next) { return next ? prev + next : prev; }, 0);
            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    };
    UploadexcelhomeComponent.prototype.objectify = function (key, value) {
        this.sheetsize++;
        this.anantTemp[key] = value;
    };
    UploadexcelhomeComponent.prototype.onmergeSelected = function (evt, emp) {
        console.log('evt', evt, '', emp);
        var index = this.tempMergeSelectedArrayList.findIndex(function (o) { return o.title == emp.title; });
        if (evt == true) {
            emp.checked = true;
            if (index == -1) {
                this.tempMergeSelectedArrayList.push(emp);
            }
        }
        else {
            emp.checked = false;
            if (index == -1) {
                console.log(' not found');
            }
            else {
                this.tempMergeSelectedArrayList.splice(index, 1);
            }
        }
        // console.log('selectedMergedGroupList ', this.selectedMergedGroupList);
        console.log('tempMergeSelectedArrayList ', this.tempMergeSelectedArrayList);
        console.log('employeeMasterModuleList ', this.employeeMasterModuleList);
    };
    UploadexcelhomeComponent.prototype.onClosePopUpWindow = function () {
        var _this = this;
        var indexOfEmpMasterModule = this.employeeMasterModuleList.findIndex(function (o) { return o.title == _this.tempMergeSelectedArrayList[0].title; });
        this.employeeMasterModuleList[indexOfEmpMasterModule].checked = false;
        this.employeeMasterModuleList[indexOfEmpMasterModule].disabled = false;
        this.tempMergeSelectedArrayList = [];
    };
    UploadexcelhomeComponent.prototype.MergeTab = function (template3, checkboxNameToBeCheckedByDefault) {
        var _this = this;
        this.tempMergeSelectedArrayList = [];
        this.checkboxNameToBeCheckedByDefault = checkboxNameToBeCheckedByDefault;
        var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == _this.checkboxNameToBeCheckedByDefault; });
        this.employeeMasterModuleList[index].checked = true;
        this.employeeMasterModuleList[index].disabled = true;
        // this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[index]);
        // this.tempMergeSelectedArrayList[0].checked = true;
        // this.tempMergeSelectedArrayList[0].disabled = true;
        var assignValueArray = __spreadArrays(new Set(this.employeeMasterModuleList.map(function (item) { return item.assignValue; })));
        console.log('assignVAlue array', assignValueArray);
        var removeBlankspace = assignValueArray.findIndex(function (o) { return o == ''; });
        console.log('removeBlanck space index', removeBlankspace);
        assignValueArray.splice(removeBlankspace, 1);
        for (var k = 0; k < assignValueArray.length; k++) {
            for (var j = 0; j < this.employeeMasterModuleList.length; j++) {
                if (assignValueArray[k] == this.employeeMasterModuleList[j].assignValue) {
                    console.log('added into temp', this.employeeMasterModuleList[k]);
                    this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[j]);
                }
            }
        }
        var findGroup = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == _this.checkboxNameToBeCheckedByDefault; });
        if (findGroup !== -1) {
            var group = this.employeeMasterModuleList[findGroup].assignValue;
            console.log('group  ', group);
            for (var i = 0; i < this.employeeMasterModuleList.length; i++) {
                if (this.employeeMasterModuleList[i].assignValue == group) {
                    if (this.employeeMasterModuleList[i].assignValue !== this.checkboxNameToBeCheckedByDefault) {
                        this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
                    }
                }
                else if (this.employeeMasterModuleList[i].group !== 0) {
                    this.employeeMasterModuleList[i].disabled = true;
                }
            }
        }
        for (var i = 0; i < this.employeeMasterModuleList.length; i++) {
            if (this.employeeMasterModuleList[i].group == 0 && this.employeeMasterModuleList[i].title !== this.checkboxNameToBeCheckedByDefault) {
                this.employeeMasterModuleList[i].checked = false;
                this.employeeMasterModuleList[i].disabled = false;
            }
            if (this.employeeMasterModuleList[i].assignValue == this.checkboxNameToBeCheckedByDefault) {
                this.employeeMasterModuleList[i].disabled = false;
                //this.employeeMasterModuleList[i].checked = false;
            }
            if (this.employeeMasterModuleList[i].title == this.checkboxNameToBeCheckedByDefault) {
                this.employeeMasterModuleList[i].checked = true;
                this.employeeMasterModuleList[i].disabled = true;
                if (this.employeeMasterModuleList[i].assignValue !== this.checkboxNameToBeCheckedByDefault) {
                    this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
                }
            }
            else {
            }
        }
        this.modalRef = this.modalService.show(template3, Object.assign({}, { "class": 'gray modal-md' }));
    };
    UploadexcelhomeComponent.prototype.saveMergeAndUnmerge = function () {
        var _this = this;
        var selectedOrderIds = this.form.value.orders
            .map(function (checked, i) { return checked ? _this.ordersData[i].id : null; })
            .filter(function (v) { return v !== null; });
        console.log('selectedOrderIds', selectedOrderIds);
        console.log(this.ordersData);
        if (this.tempMergeSelectedArrayList.length == 1) {
            console.log('this.tempMergeSelectedArrayList.length ==1)', this.tempMergeSelectedArrayList.length);
            var j = this.employeeMasterModuleList.findIndex(function (o) { return o.title == _this.checkboxNameToBeCheckedByDefault; });
            this.employeeMasterModuleList[j].group = 0;
            this.employeeMasterModuleList[j].assignValue = '';
            this.employeeMasterModuleList[j].checked = false;
            this.tempMergeSelectedArrayList[0].assignValue = '';
            this.tempMergeSelectedArrayList[0].group = 0;
            this.tempMergeSelectedArrayList[0].checked = false;
            var idx = this.ordersData.findIndex(function (o) { return o.name == _this.checkboxNameToBeCheckedByDefault; });
            this.ordersData[idx].disable = false;
        }
        console.log('tempMergeSelectedArrayList', this.tempMergeSelectedArrayList);
        console.log('tempMergeSelectedArrayList length', this.tempMergeSelectedArrayList.length);
        console.log(this.ordersData);
        var largestElement = 0;
        var mergedIndex = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == _this.checkboxNameToBeCheckedByDefault; });
        console.log('merged index is ', mergedIndex);
        if (mergedIndex == -1) {
            for (var k = 0; k < this.employeeMasterModuleList.length; k++) {
                if (largestElement < Number(this.employeeMasterModuleList[k].group)) {
                    largestElement = Number(this.employeeMasterModuleList[k].group);
                }
            }
            largestElement = largestElement + 1;
            console.log('largese', largestElement);
        }
        else {
            //if (this.tempMergeSelectedArrayList[0].checked == true) {
            console.log('found merged index', mergedIndex);
            largestElement = this.employeeMasterModuleList[mergedIndex].group;
        }
        console.log('largest element in a group is ', largestElement);
        var _loop_8 = function (j) {
            if (this_8.employeeMasterModuleList[j].checked == false) {
                if (this_8.employeeMasterModuleList[j].assignValue == this_8.checkboxNameToBeCheckedByDefault) {
                    this_8.employeeMasterModuleList[j].group = 0;
                    this_8.employeeMasterModuleList[j].assignValue = '';
                    var idx = this_8.ordersData.findIndex(function (o) { return o.name == _this.employeeMasterModuleList[j].title; });
                    this_8.ordersData[idx].disable = false;
                    this_8.ordersData[idx].group = '';
                    this_8.leftSideMenuCheckBoxChnanged(false, this_8.employeeMasterModuleList[j].title);
                }
            }
            var _loop_9 = function (a) {
                var ind = this_8.employeeMasterModuleList.findIndex(function (o) { return o.title == _this.tempMergeSelectedArrayList[a].title; });
                if (ind == -1) {
                    console.log('index not found');
                }
                else {
                    if (this_8.tempMergeSelectedArrayList[a].group == 0) {
                        this_8.employeeMasterModuleList[ind].group = largestElement;
                        this_8.employeeMasterModuleList[ind].assignValue = this_8.checkboxNameToBeCheckedByDefault;
                        var idx = this_8.ordersData.findIndex(function (o) { return o.name == _this.tempMergeSelectedArrayList[a].title; });
                        this_8.ordersData[idx].disable = true;
                    }
                }
            };
            for (var a = 0; a < this_8.tempMergeSelectedArrayList.length; a++) {
                _loop_9(a);
            }
        };
        var this_8 = this;
        for (var j = 0; j < this.employeeMasterModuleList.length; j++) {
            _loop_8(j);
        }
        var group = 0;
        var countOfClose = 0;
        var mergedIndex1 = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == _this.checkboxNameToBeCheckedByDefault; });
        if (mergedIndex1 !== -1) {
            group = this.employeeMasterModuleList[mergedIndex1].group;
            countOfClose = this.employeeMasterModuleList.filter(function (x) {
                return x.group == group;
            }).length;
            // logic for uncheck one disable button
            console.log('group is', group);
            console.log('count of close ', countOfClose);
            if (countOfClose == 1) {
                var mergedIndex_1 = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == _this.checkboxNameToBeCheckedByDefault; });
                this.employeeMasterModuleList[mergedIndex_1].group = 0;
                this.employeeMasterModuleList[mergedIndex_1].assignValue = '';
                var idx = this.ordersData.findIndex(function (o) { return o.name == _this.checkboxNameToBeCheckedByDefault; });
                this.ordersData[idx].disable = false;
                this.leftSideMenuCheckBoxChnanged(false, this.checkboxNameToBeCheckedByDefault);
            }
        }
        console.log('len is ', countOfClose);
        for (var t = 0; t < this.employeeMasterModuleList.length; t++) {
            if (this.checkboxNameToBeCheckedByDefault == this.employeeMasterModuleList[t].assignValue) {
                if (this.employeeMasterModuleList[t].checked == true) {
                    this.leftSideMenuCheckBoxChnanged(true, this.employeeMasterModuleList[t].title);
                }
                else {
                    this.leftSideMenuCheckBoxChnanged(false, this.employeeMasterModuleList[t].title);
                }
            }
        }
        // logic for hiding Merge/ Tab field button
        this.tempMergeSelectedArrayList = [];
        this.selectedMergedGroupList = [];
        console.log('employeeMasterModuleList', this.employeeMasterModuleList);
    };
    // below code is used for deselect of all checkbox field
    // uncheckAll() {
    //   this.checkboxes.forEach((element) => {
    //     element.nativeElement.checked = false;
    //   });
    // }
    UploadexcelhomeComponent.prototype.findMissingNumber1 = function (tabName, tableName) {
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
                this.selectedSummaryCheckBoxHtmlDataList.sort(function (a, b) { return Number(a.Sequence) - Number(b.Sequence); });
            }
        }
        console.log('after sorting selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
        var noReturn = 0;
        var missNo = 0;
        var flag = false;
        var p = 0;
        for (var k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
            if ((this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) && (this.selectedSummaryCheckBoxHtmlDataList[k].tableName == tableName)) {
                p = k + 1;
                console.log('p  ', p.toString());
                missNo = p;
                console.log('miss no', missNo);
            }
            else {
                this.alertService.sweetalertError('Missing sequence no. is--- ' + p);
                if (flag == false) {
                    if (p !== this.selectedSummaryCheckBoxHtmlDataList[k].Sequence && (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) && (this.selectedSummaryCheckBoxHtmlDataList[k].tableName == tableName)) {
                        noReturn = p;
                        this.alertService.sweetalertError('Missing sequence no. is ' + p);
                        flag = true;
                    }
                }
            }
        }
        return p;
    };
    UploadexcelhomeComponent.prototype.addFromDateToDate = function (fieldName) {
        if (fieldName == 'Establishment'
            || fieldName == 'Project'
            || fieldName == 'Sub Location'
            || fieldName == 'Work Location'
            || fieldName == 'Business Area'
            || fieldName == 'Sub Area'
            || fieldName == 'Strategic Business Unit'
            || fieldName == 'Division'
            || fieldName == 'Department'
            || fieldName == 'Sub Department'
            || fieldName == 'Cost Center'
            || fieldName == 'Sub-Cost Center'
            || fieldName == 'Profit Center'
            || fieldName == 'Employee Type'
            || fieldName == 'Employee Status'
            || fieldName == 'Employee Tax Category'
            || fieldName == 'Grade'
            || fieldName == 'Designation 1'
            || fieldName == 'Designation 2'
            || fieldName == 'Reporting To'
            || fieldName == 'Billable'
            || fieldName == 'On - Bench') {
            return true;
        }
        else {
            return false;
        }
    };
    UploadexcelhomeComponent.prototype.checkThatAllItemsAreSelectedFromThatLeftMenu = function (tabName) {
        this.selectAllModel = false;
        var counterForfalse = 1;
        for (var j = 0; j < this.fieldNameArrayList.length; j++) {
            if (this.fieldNameArrayList[j].isChecked == false && this.fieldNameArrayList[j].tab == tabName) {
                counterForfalse++;
            }
        }
        if (counterForfalse == 1) {
            this.selectAllModel = true;
        }
    };
    UploadexcelhomeComponent.prototype.incrementCounter = function (row, isChecked, tabName, tableName) {
        console.log('check this', row);
        var largestElement = 0;
        if (row.Sequence == 0) {
            for (var k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
                if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
                    if (largestElement < Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence)) {
                        largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence);
                    }
                }
            }
            largestElement = Number(largestElement) + 1;
            console.log(' this.selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
            var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o == row; });
            console.log('index  ', index);
            this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
        }
    };
    UploadexcelhomeComponent.prototype.getLargestNumberByTabWiseAndTableNameWise = function (tabName, tableName, row) {
        var largest = 0;
        var counter = 0;
        if (row.Sequence == 0) {
            for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
                if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
                    if (Number(this.selectedSummaryCheckBoxHtmlDataList[i].Sequence) > largest) {
                        largest = Number(this.selectedSummaryCheckBoxHtmlDataList[i].Sequence);
                    }
                }
            }
            var s = Number(largest + 1);
            var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o == row; });
            this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();
            this.selectedSummaryCheckBoxHtmlDataList[index].merge = counter;
            console.log('found largest ', largest);
            console.log(this.selectedSummaryCheckBoxHtmlDataList);
        }
    };
    UploadexcelhomeComponent.prototype.findMinNumberByTabNameWiseAndTableNameWise = function (tabName, tableName) {
        var min = 1;
        var flag = false;
        for (var b = 0; b < this.selectedSummaryCheckBoxHtmlDataList.length; b++) {
            if (this.selectedSummaryCheckBoxHtmlDataList[b].tab == tabName && this.selectedSummaryCheckBoxHtmlDataList[b].tableName == tableName) {
                if (flag == false) {
                    min = Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence);
                    flag = true;
                }
                if (min > Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence)) {
                    min = Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence);
                }
            }
        }
        return min;
    };
    UploadexcelhomeComponent.prototype.checkTabWiseAndTableNameWiseObjectisExist = function (tab, tableName) {
        var minNo = this.findMinNumberByTabNameWiseAndTableNameWise(tab, tableName);
        console.log('minNo is', minNo);
        var some = true;
        for (var b = 0; b < this.selectedSummaryCheckBoxHtmlDataList.length; b++) {
            if (this.selectedSummaryCheckBoxHtmlDataList[b].tab == tab && this.selectedSummaryCheckBoxHtmlDataList[b].tableName == tableName) {
                if (Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence) == minNo) {
                    console.log('found element', minNo);
                }
                else {
                    console.log('not found element ', minNo);
                    this.alertService.sweetalertError('Wrong Seq tab Name  is' + tab + ' tableName is ' + tableName + 'Sequence is ' + minNo + 'Wrong no added is ' + Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence));
                }
                minNo++;
            }
        }
    };
    UploadexcelhomeComponent.prototype.isSequenceAreProperlyAllocatedTableNameWise = function () {
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            this.selectedSummaryCheckBoxHtmlDataList.sort(function (a, b) { return a.Sequence - b.Sequence; });
        }
        var tableName = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tableName; })));
        var tabName = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tab; })));
        var _loop_10 = function (tab) {
            var _loop_11 = function (k) {
                if (k == 0) {
                    // minNo = this.findMinNumberByTabNameWiseAndTableNameWise(tabName[tab],tableName[k]);
                    //  //ab = this.selectedSummaryCheckBoxHtmlDataList.some((o)=> Number(o.Sequence) == minNo));
                    //  console.log('ab',ab);
                    //   minNo = minNo -1;
                }
                var index = this_9.selectedSummaryCheckBoxHtmlDataList.some(function (o) { return o.tab == tabName[tab] && o.tableName == tableName[k]; });
                console.log(index);
                if (index == true) {
                    this_9.checkTabWiseAndTableNameWiseObjectisExist(tabName[tab], tableName[k]);
                }
            };
            for (var k = 0; k < tableName.length; k++) {
                _loop_11(k);
            }
        };
        var this_9 = this;
        for (var tab = 0; tab < tabName.length; tab++) {
            _loop_10(tab);
        }
        // let a: boolean;
        // for (let k = 0; k < tableName.length; k++) {
        //   let minNo = 0
        //   let flag = false;
        //   for (let b = 0; b < this.selectedSummaryCheckBoxHtmlDataList.length; b++) {
        //     if (minNo > Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence && this.selectedSummaryCheckBoxHtmlDataList[b].tableName == tableName[k])) {
        //       minNo = Number(this.selectedSummaryCheckBoxHtmlDataList[b].Sequence);
        //     }
        //     if (b == this.selectedSummaryCheckBoxHtmlDataList.length - 1) {
        //       for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
        //         if (i == 0) {
        //          // minNo-=1;
        //         }
        //         if (this.selectedSummaryCheckBoxHtmlDataList[i].tableName == tableName[k]) {
        //           minNo+=1;
        //         let ab = this.selectedSummaryCheckBoxHtmlDataList.some((o)=> Number(o.Sequence) == minNo && o.tableName ==   tableName[k]);
        //           console.log('check this ..', ' ', minNo, '  ', ab , ' this.selectedSummaryCheckBoxHtmlDataList',this.selectedSummaryCheckBoxHtmlDataList[i].Sequence);
        //           // if some condition will be false it will return false; means Sequence does not found
        //           if (ab == false) {
        //             this.errorInSequence = true;
        //             this.alertService.sweetalertError('You have added wrong sequence at table ' + tableName[k] + 'Sequence is ' + 'wrong '+this.selectedSummaryCheckBoxHtmlDataList[i].Sequence + 'tabName is '+this.selectedSummaryCheckBoxHtmlDataList[i].tab+'minNo '+minNo);
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        console.log(this.selectedSummaryCheckBoxHtmlDataList);
        return this.errorInSequence;
    };
    UploadexcelhomeComponent.prototype.isSequenceAreProperlyAllocatedTableNameWise1 = function () {
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            this.selectedSummaryCheckBoxHtmlDataList.sort(function (a, b) { return a.Sequence - b.Sequence; });
        }
        console.log(this.selectedSummaryCheckBoxHtmlDataList);
        var tableName = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tableName; })));
        console.log(tableName);
        var a;
        var _loop_12 = function (k) {
            var minNo = 0;
            var flag = false;
            for (var b = 0; b < this_10.selectedSummaryCheckBoxHtmlDataList.length; b++) {
                if (minNo > Number(this_10.selectedSummaryCheckBoxHtmlDataList[b].Sequence && this_10.selectedSummaryCheckBoxHtmlDataList[b].tableName == tableName[k])) {
                    minNo = Number(this_10.selectedSummaryCheckBoxHtmlDataList[b].Sequence);
                }
                if (b == this_10.selectedSummaryCheckBoxHtmlDataList.length - 1) {
                    for (var i = 0; i < this_10.selectedSummaryCheckBoxHtmlDataList.length; i++) {
                        if (i == 0) {
                            // minNo-=1;
                        }
                        if (this_10.selectedSummaryCheckBoxHtmlDataList[i].tableName == tableName[k]) {
                            minNo += 1;
                            var ab = this_10.selectedSummaryCheckBoxHtmlDataList.some(function (o) { return Number(o.Sequence) == minNo && o.tableName == tableName[k]; });
                            console.log('check this ..', ' ', minNo, '  ', ab, ' this.selectedSummaryCheckBoxHtmlDataList', this_10.selectedSummaryCheckBoxHtmlDataList[i].Sequence);
                            // if some condition will be false it will return false; means Sequence does not found
                            if (ab == false) {
                                this_10.errorInSequence = true;
                                this_10.alertService.sweetalertError('You have added wrong sequence at table ' + tableName[k] + 'Sequence is ' + 'wrong ' + this_10.selectedSummaryCheckBoxHtmlDataList[i].Sequence + 'tabName is ' + this_10.selectedSummaryCheckBoxHtmlDataList[i].tab + 'minNo ' + minNo);
                            }
                        }
                    }
                }
            }
        };
        var this_10 = this;
        for (var k = 0; k < tableName.length; k++) {
            _loop_12(k);
        }
        console.log(this.selectedSummaryCheckBoxHtmlDataList);
        return this.errorInSequence;
    };
    UploadexcelhomeComponent.prototype.removeOrdersFromFormArray = function (index) {
        this.form.get('orders').removeAt(index);
    };
    UploadexcelhomeComponent.prototype.editMaster = function (templateMasterId, isView1) {
        var _this = this;
        console.log('isView ', isView1);
        this.isViewFieldNameArrayList = false;
        this.isViewMode = false;
        for (var j = 0; j < this.employeeMasterModuleList.length; j++) {
            this.employeeMasterModuleList[j].group = 0;
            this.employeeMasterModuleList[j].assignValue = '';
            this.employeeMasterModuleList[j].checked = false;
            this.employeeMasterModuleList[j].disabled = false;
        }
        this.tempMergeSelectedArrayList = [];
        this.fieldNameArrayList = [];
        for (var k = 0; k < this.ordersData.length; k++) {
            this.ordersData[k].counter = 0;
            this.ordersData[k].disable = false;
            this.ordersData[k].checked = false;
            this.ordersData[k].hide = false;
            this.ordersData[k].group = 0;
        }
        this.sheetDataArray = [];
        this.isEditMode = true;
        this.templateMasterId = templateMasterId;
        this.uploadeExcelHomeService.getExcelTemplateById(templateMasterId).subscribe(function (res) {
            console.log(res);
            _this.masterOfExcelTemplate = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element, index) {
                console.log('element is ', element, 'index', index);
                if (index == 0) {
                    var tempObj1 = {
                        templateMasterId: element.templateMasterId,
                        templateName: element.templateName,
                        module: element.module,
                        description: element.description,
                        companyId: element.companyId,
                        remark: element.remark
                    };
                    _this.form.patchValue({
                        templateName: element.templateName,
                        remark: element.remark,
                        description: element.description
                    });
                }
                for (var i_1 = 0; i_1 < element.sheetData.length; i_1++) {
                    console.log(element.sheetData[i_1]);
                    var tempObj = {
                        tabName: element.sheetData[i_1].tabName,
                        tableName: element.sheetData[i_1].tableName,
                        fields: element.sheetData[i_1].fields,
                        sequence: element.sheetData[i_1].sequence,
                        mergeTabName: element.sheetData[i_1].mergeTabName
                    };
                    _this.sheetDataArray.push(tempObj);
                }
            });
        }, function (error) {
            console.log(error);
        }, function () {
            var _loop_13 = function (i) {
                //if(i ==0){
                // don't do anything
                // } else {
                var tableName = _this.sheetDataArray[i].tableName;
                var ind = _this.ordersData.findIndex(function (o) { return o.name == _this.sheetDataArray[i].tabName; });
                _this.ordersData[ind].checked = true;
                _this.leftSideMenuCheckBoxChnanged(true, _this.sheetDataArray[i].tabName);
                var tabName = _this.sheetDataArray[i].tabName;
                nameArr = _this.sheetDataArray[i].fields.split(',');
                var sequence = _this.sheetDataArray[i].sequence.toString().split(",").map(Number);
                _this.mergeAndUnmergeAfterClickedOnEditResponse(_this.sheetDataArray[i].tabName, _this.sheetDataArray[i].mergeTabName);
                var flagForEmployeeCode = false;
                for (var k = 0; k < nameArr.length; k++) {
                    if (flagForEmployeeCode == false && nameArr[k] == 'Employee Code') {
                        _this.findIndexByCalling(tabName, tableName, nameArr[k], sequence[k]);
                        flagForEmployeeCode = true;
                    }
                    else {
                        _this.findIndexByCalling(tabName, tableName, nameArr[k], sequence[k]);
                    }
                }
            };
            var nameArr;
            for (var i = 0; i < _this.sheetDataArray.length; i++) {
                _loop_13(i);
            }
            // assign below templatemasterid
            console.log('sheetDataArray', _this.sheetDataArray);
        });
        /**
    * // TODO: Calling function by sending fieldName, tableName
    */
        // for (let i = 0; i < this.sheetDataArray.length; i++) {
        //   //if(i ==0){
        //   // don't do anything
        //   // } else {
        //   let tableName = this.sheetDataArray[i].tableName;
        //   let tabName = this.sheetDataArray[i].tabName;
        //   var nameArr = this.sheetDataArray[i].fields.split(',');
        //   console.log('nameArr', nameArr);
        //   for (let k = 0; k < nameArr.length; k++) {
        //     this.findIndexByCalling(tabName, tableName, nameArr[k]);
        //   }
        // }
        // assign below templatemasterid
        console.log('sheetDataArray', this.sheetDataArray);
        // if(isView == true){
        if (isView1 !== undefined) {
            if (isView1 == true) {
                this.isViewFieldNameArrayList = true;
                this.forReadOnlyAllCheckBox();
            }
        }
    };
    UploadexcelhomeComponent.prototype.findIndexByCalling = function (tabName, tableName, fieldName, sequence) {
        console.log('tab name is  ', tabName);
        console.log('table name is  ', tableName);
        console.log('fieldName is  ', fieldName);
        console.log('fieldNameArrayList', this.fieldNameArrayList);
        var index = this.fieldNameArrayList.findIndex(function (o) { return o.fieldName == fieldName && o.tab == tabName && o.tableName == tableName; });
        if (index !== -1) {
            this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[index], sequence);
        }
    };
    UploadexcelhomeComponent.prototype.onChangePreviewDropDown = function (evt) {
        this.previewTableData = [];
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == this.form.get('filterTemplateDropDown').value) {
                this.previewTableData.push(this.selectedSummaryCheckBoxHtmlDataList[i]);
            }
        }
    };
    UploadexcelhomeComponent.prototype.leftSideMenuCounter = function (tabName) {
        console.log('ss', this.ordersData);
        var index = this.ordersData.findIndex(function (o) { return o.name == tabName; });
        console.log('index is ', index, '', this.selectedSummaryCheckBoxHtmlDataList);
        this.ordersData[index].counter = this.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.tab === tabName && o.isChecked == true; }).length;
        console.log('ss', this.ordersData);
    };
    UploadexcelhomeComponent.prototype.mergeAndUnmergeAfterClickedOnEditResponse = function (tabName, mergedWith) {
        var largestElement = 0;
        // it will check that it will already merged
        if (mergedWith.length !== 0) {
            var mergedIndex = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == mergedWith; });
            console.log('merged index is ', mergedIndex);
            if (mergedIndex == -1) {
                for (var k = 0; k < this.employeeMasterModuleList.length; k++) {
                    if (largestElement < Number(this.employeeMasterModuleList[k].group)) {
                        largestElement = Number(this.employeeMasterModuleList[k].group);
                    }
                }
                largestElement = largestElement + 1;
                console.log('largest ', largestElement);
            }
            else {
                //if (this.tempMergeSelectedArrayList[0].checked == true) {
                console.log('found merged index', mergedIndex);
                largestElement = this.employeeMasterModuleList[mergedIndex].group;
            }
            console.log('largest element in a group is ', largestElement);
            var ind = this.employeeMasterModuleList.findIndex(function (o) { return o.title == tabName; });
            if (ind == -1) {
                console.log('index not found');
            }
            else {
                this.employeeMasterModuleList[ind].group = largestElement;
                this.employeeMasterModuleList[ind].assignValue = mergedWith;
                this.employeeMasterModuleList[ind].disabled = false;
                this.employeeMasterModuleList[ind].checked = true;
                var idx = this.ordersData.findIndex(function (o) { return o.name == tabName; });
                this.ordersData[idx].disable = true;
            }
            console.log('this.employeeMasterModuleList', this.employeeMasterModuleList);
        }
    };
    UploadexcelhomeComponent.prototype.assignMergeFieldToAllSelectedCheckBoxHtmlDataList = function () {
        var assignValueArray = __spreadArrays(new Set(this.employeeMasterModuleList.map(function (item) { return item.assignValue; })));
        var removeBlankspace = assignValueArray.findIndex(function (o) { return o == ''; });
        var removeZero = assignValueArray.findIndex(function (o) { return o == 0; });
        assignValueArray.splice(removeZero, 1);
        assignValueArray.splice(removeBlankspace, 1);
        console.log('assign value array', assignValueArray);
        console.log('emp module ', this.employeeMasterModuleList);
        for (var t = 0; t < assignValueArray.length; t++) {
            if (assignValueArray[t].length !== 0) {
                for (var e = 0; e < this.employeeMasterModuleList.length; e++) {
                    if (this.employeeMasterModuleList[e].assignValue == assignValueArray[t]) {
                        for (var p = 0; p < this.selectedSummaryCheckBoxHtmlDataList.length; p++) {
                            if (this.employeeMasterModuleList[e].title == this.selectedSummaryCheckBoxHtmlDataList[p].tab) {
                                this.selectedSummaryCheckBoxHtmlDataList[p].merged = assignValueArray[t];
                            }
                        }
                    }
                }
            }
        }
        console.log('this.selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
    };
    UploadexcelhomeComponent.prototype.viewTemplate = function (templateMasterId) {
        this.editMaster(templateMasterId, true);
    };
    UploadexcelhomeComponent.prototype.forReadOnlyAllCheckBox = function () {
        for (var i = 0; i < this.sequenceArray.length; i++) {
            this.sequenceArray[i].disable = true;
        }
        for (var i = 0; i < this.fieldNameArrayList.length; i++) {
            this.fieldNameArrayList[i].isMandatory = 1;
        }
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            this.selectedSummaryCheckBoxHtmlDataList[i].isMandatory = 1;
        }
        for (var j = 0; j < this.employeeMasterModuleList.length; j++) {
            this.employeeMasterModuleList[j].disabled = true;
        }
        this.tempMergeSelectedArrayList = [];
        this.fieldNameArrayList = [];
        console.log('orders daa', this.ordersData);
        for (var k = 0; k < this.ordersData.length; k++) {
            if (this.ordersData[k].checked == true) {
                this.ordersData[k].disable = true;
            }
            else {
                this.ordersData[k].disable = true;
            }
        }
        // this.isViewFieldNameArrayList = true;
        this.isViewMode = true;
    };
    __decorate([
        core_1.ViewChildren("checkboxes")
    ], UploadexcelhomeComponent.prototype, "checkboxes");
    UploadexcelhomeComponent = __decorate([
        core_1.Component({
            selector: 'app-uploadexcelhome',
            templateUrl: './uploadexcelhome.component.html',
            styleUrls: ['./uploadexcelhome.component.scss']
        })
    ], UploadexcelhomeComponent);
    return UploadexcelhomeComponent;
}());
exports.UploadexcelhomeComponent = UploadexcelhomeComponent;
