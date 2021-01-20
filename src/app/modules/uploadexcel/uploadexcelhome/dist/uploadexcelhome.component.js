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
        this.anantTemp = {};
        this.sheetsize = 0;
        this.tempMergeSelectedArrayList = [];
        this.selectedMergedGroupList = [];
        this.employeeMasterModuleList = [
            { checked: false, group: 0, disabled: false, assignValue: '', id: '1', title: 'Personal Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '2', title: 'Compliance Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '3', title: 'Contact Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '4', title: 'Identity Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '5', title: 'Education & Skill Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '6', title: 'Employment Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '7', title: 'Previous Employment  Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '8', title: 'Payroll Information' },
            { checked: false, group: 0, disabled: false, assignValue: '', id: '9', title: 'Family Information' },
        ];
        this.mergePersonalInformation = false;
        this.mergeComplianceInformation = false;
        this.mergeContactInformation = false;
        this.mergeIdentityInformation = false;
        this.mergeEducationAndSkillInformation = false;
        this.mergeEmploymentInformation = false;
        this.mergePreviousEmploymentInformation = false;
        this.mergePayrollInformation = false;
        this.mergeFamilyInformation = false;
        this.selectedPersonalInformationFields = [];
        this.selectedDropDownSequenceNumberList = [];
        this.leftSideBarMenuList = [];
        this.selectedCounterPersonalInformationList = [];
        this.selectedCounterComplianceInformationList = [];
        this.selectedCounterIdentityInformationList = [];
        this.selectedCounterContactInformationList = [];
        this.selectedCounterPreviousEmploymentInformationList = [];
        this.selectedCounterEducationAndSkillInformationList = [];
        this.selectedCounterEmploymentInformationList = [];
        this.selectedCounterPayrollInformationList = [];
        this.selectedCounterFamilyInformationList = [];
        this.fieldNameArrayList = [];
        this.global = [];
        this.counterPersonalInformation = 0;
        this.counterContactInformation = 0;
        this.counterIdentityInformation = 0;
        this.counterComplianceInformation = 0;
        this.counterEducationAndSkillInformation = 0;
        this.counterPreviousEmploymentInformation = 0;
        this.counterPayrollInformation = 0;
        this.counterFamilyInformation = 0;
        this.counterEmploymentInformation = 0;
        this.sequenceArray = [];
        this.sequenceSelect = true;
        this.isEditMode = false;
        this.form = forms_1.FormGroup;
        this.checkedEmployeeMaster = true;
        this.checkedPayrollMaster = false;
        this.checkedLeaveManangement = false;
        this.checkedAssetMaster = false;
        this.ordersData = [
            { id: 100, name: 'order 1' },
            { id: 200, name: 'order 2' },
            { id: 300, name: 'order 3' },
            { id: 400, name: 'order 4' },
        ];
        this.arrayOfObj = [];
        this.filterDropDownList = [];
        this.selectedSummaryCheckBoxHtmlDataList = [];
        this.summaryOfExcelTemplate = [];
        this.customizedResponse = [];
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
            orders: new forms_1.FormArray([], this.minSelectedCheckboxes(1)),
            templateName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl(''),
            remark: new forms_1.FormControl(''),
            orderCheckbox: new forms_1.FormControl('')
        });
    }
    UploadexcelhomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllExcelTemplate();
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
        this.uploadeExcelHomeService.getExcelTableFields().subscribe(function (res) {
            _this.masterGetExcelTableFieldsResponse = res;
            //console.log(res);
            var counter = 0;
            res.data.results.forEach(function (element) {
                _this.leftSideBarMenuList.push({ id: counter++, name: element.sheetName });
                for (var i = 0; i < element.fields.length; i++) {
                    _this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].fieldName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: 0 });
                    //  this.sequenceArray[i] = (i + 1);
                    // this.sequenceArray.push({value: i, disable: false});
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
    UploadexcelhomeComponent.prototype.onChangeSequenceCheckBox = function (seq, myselect, id) {
        console.log('id', id);
        // console.log('onChangeSequenceCheckBox()');
        // console.log(seq);
        // console.log(myselect);
        this.selectedPersonalInformationFields.sort(function (a, b) { return a.Sequence - b.Sequence; });
        console.log('array sorting done', this.selectedPersonalInformationFields);
        if (id.tab === 'Personal Information') {
            var index_1 = this.selectedPersonalInformationFields.findIndex(function (o) { return o.fieldName === id.fieldName; });
            if (index_1 == -1) {
                this.selectedPersonalInformationFields.push(id);
                this.selectedCounterPersonalInformationList.push(myselect);
            }
            else {
                this.selectedPersonalInformationFields[index_1].Sequence = id.Sequence.toString();
            }
            var flag = false;
            for (var j = 0; j < this.selectedPersonalInformationFields.length; j++) {
                var k = j + 1;
                if (this.selectedPersonalInformationFields[j].Sequence === k.toString()) {
                }
                else {
                    flag = true;
                }
            }
            if (flag == true) {
                this.alertService.sweetalertError('Sequence are not properly allocated.');
            }
        }
        // this.selectedCounterList.push(myselect);
        //  console.log('selectedCounterList ',this.selectedCounterList);
        var index = this.sequenceArray.indexOf(function (p) { return p == seq; });
        if (index !== -1) {
            return false;
        }
        var delIndex = this.sequenceArray.findIndex(function (o) { return o == seq; });
        // this.sequenceArrayHide.splice(delIndex, 1);
    };
    UploadexcelhomeComponent.prototype.onClickSequenceCheckBox = function (s, summary) {
        console.log('on change onChangeSequenceCheckBox');
        console.log(s);
        console.log(summary);
    };
    UploadexcelhomeComponent.prototype.getAllExcelTemplate = function () {
        var _this = this;
        this.summaryOfExcelTemplate = [];
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
    UploadexcelhomeComponent.prototype.MergeTab = function (template3, checkboxNameToBeCheckedByDefault) {
        console.log('checked checkbox is', checkboxNameToBeCheckedByDefault);
        this.onChangeCheckBoxLeftMenu(true, checkboxNameToBeCheckedByDefault);
        if (checkboxNameToBeCheckedByDefault == 'Personal Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Personal Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Personal Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Compliance Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Compliance Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Compliance Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Contact Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Contact Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Contact Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Identity Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Identity Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Identity Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Education & Skill Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Education & Skill Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Education & Skill Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Employment Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Employment Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Employment Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Previous Employment Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Previous Employment  Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Previous Employment  Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Payroll Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Payroll Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Payroll Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        if (checkboxNameToBeCheckedByDefault == 'Family Information') {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == 'Family Information'; });
            this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);
            var anotherIndex = this.selectedMergedGroupList.findIndex(function (p) { return p.title == 'Family Information'; });
            this.selectedMergedGroupList[anotherIndex].checked = true;
            this.selectedMergedGroupList[anotherIndex].disabled = true;
        }
        this.modalRef = this.modalService.show(template3, Object.assign({}, { "class": 'gray modal-md' }));
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
        this.tempMergeSelectedArrayList = [];
        console.log('in   onChangeCheckBoxLeftMenu checked function is dynamic to all', checked, 'tabName', tabName);
        var index1 = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == tabName; });
        console.log('index1 is  ', index1);
        console.log('add logic here');
        for (var i = 0; i < this.employeeMasterModuleList.length; i++) {
            if (this.employeeMasterModuleList[i].assignValue == tabName) {
                this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
            }
        }
        // if (this.employeeMasterModuleList.filter(function(e) { return e.assignValue === tabName; }).length > 0) {
        // this.employeeMasterModuleList.forEach((ele)=>{
        //   if(ele.assignValue == tabName && ele.group >0){
        //     ele.disabled = false;
        //   } else {
        //     console.log('disabled list is ', ele);
        //     ele.disabled = true;
        //   }
        // });
        var findGroupValue = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == tabName; });
        console.log('findGroupValue ', findGroupValue);
        if (findGroupValue == -1) {
            for (var i = 0; i < this.employeeMasterModuleList.length; i++) {
                if (this.employeeMasterModuleList[i].group > 0) {
                    this.employeeMasterModuleList[i].disabled = true;
                }
                else if (this.employeeMasterModuleList[i].assignValue === '' && this.employeeMasterModuleList[i].group == 0) {
                    this.employeeMasterModuleList[i].disabled = false;
                    this.employeeMasterModuleList[i].checked = false;
                }
                else {
                }
                // else if(this.employeeMasterModuleList[i].group !== 0 ){
                //   console.log('i am in third condtion');
                //   this.employeeMasterModuleList[i].disabled = true;
                // }
            }
        }
        else {
            for (var i = 0; i < this.employeeMasterModuleList.length; i++) {
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
        }
        // this.employeeMasterModuleList[i].disabled = false;
        if (checked == true) {
            var indx = this.filterDropDownList.findIndex(function (o) { return o == tabName; });
            if (indx == -1) {
                this.filterDropDownList.push(tabName);
            }
            var counter = 1;
            for (var i = 0; i < this.fieldNameArrayList.length; i++) {
                if (this.fieldNameArrayList[i].tab === tabName) {
                    this.sequenceArray.push({ disable: false, value: counter++ });
                }
            }
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == tabName; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangePersonalInfo = function (evt) {
        console.log('in leftSideCheckBoxChangePersonalInfo');
        console.log(evt);
        console.log(evt.target.value);
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Personal Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Personal Information');
        }
        else {
            // let index = this.filterDropDownList.findIndex(o => o === 'Personal Information');
            // this.filterDropDownList.splice(index, 1);
            for (var i = this.checkBoxHtmlDataList.length - 1; i >= 0; --i) {
                if (this.checkBoxHtmlDataList[i].tab == 'Personal Information') {
                    this.checkBoxHtmlDataList.splice(i, 1);
                }
            }
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangeContactInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Contact Information');
        if (evt.target.checked == true) {
            //  this.filterDropDownList.push('Contact Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Contact Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangeIdentityInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Identity Information');
        if (evt.target.checked == true) {
            /// this.filterDropDownList.push('Identity Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Identity Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangePreviousEmploymentInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Previous Employment  Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Previous Employment Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Previous Employment  Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangeEmploymentInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Employment Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Previous Employment Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Employment Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangeComplianceInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Compliance Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Previous Employment Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Compliance Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangeEducationAndSkillInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Education & Skill Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Previous Employment Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Education & Skill Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangeFamilyInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Family Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Previous Employment Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Family Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.leftSideCheckBoxChangePayrollInfo = function (evt) {
        this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Payroll Information');
        if (evt.target.checked == true) {
            // this.filterDropDownList.push('Previous Employment Information');
        }
        else {
            var index = this.filterDropDownList.findIndex(function (o) { return o == 'Payroll Information'; });
            this.filterDropDownList.splice(index, 1);
        }
    };
    UploadexcelhomeComponent.prototype.incrementCounter = function (row, isChecked, tabName) {
        console.log('row.sequece', row.Sequence);
        // it checked that field name is already exist, if yes, then change sequence else push element.
        var index = this.selectedPersonalInformationFields.findIndex(function (o) { return o.fieldName === row.fieldName; });
        if (index == -1) {
            this.selectedPersonalInformationFields.push(row);
        }
        else {
            this.selectedPersonalInformationFields[index].Sequence = row.Sequence;
        }
        var largestElement = 0;
        if (row.Sequence === 0) {
            for (var k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
                if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
                    if (largestElement < Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence)) {
                        largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence);
                    }
                }
            }
            largestElement = Number(largestElement) + 1;
            var index_2 = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o == row; });
            this.selectedSummaryCheckBoxHtmlDataList[index_2].Sequence = largestElement.toString();
        }
    };
    UploadexcelhomeComponent.prototype.decrementCounter = function (row, isChecked, tabName) {
        var _this = this;
        console.log('summaryCheckBoxHtmlDataListChanged() in else', row.isChecked);
        var index = this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (o) { return o === row; });
        console.log(index);
        this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = 0;
        this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
        var count = 1;
        this.selectedSummaryCheckBoxHtmlDataList.forEach(function (value, index) {
            if (value.tab == tabName) {
                _this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = (count++).toString();
            }
        });
    };
    UploadexcelhomeComponent.prototype.summaryCheckBoxHtmlDataListChanged = function (evt, row) {
        console.log('in summaryCheckBoxHtmlDataListChanged ', evt);
        console.log('row', row);
        if (evt == true) {
            this.selectedSummaryCheckBoxHtmlDataList.push(row);
            row.isChecked = true;
            this.incrementCounter(row, evt, row.tab);
            // if (row.tab === 'Personal Information') {
            //   const index = this.selectedPersonalInformationFields.findIndex((o) => o.fieldName === row.fieldName);
            //   if (index == -1) {
            //     this.selectedPersonalInformationFields.push(row);
            //   } else {
            //     this.selectedPersonalInformationFields[index].Sequence = row.Sequence;
            //   }
            //   let largestElement = 0;
            //   if (row.Sequence === 0) {
            //     for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
            //       if( this.selectedSummaryCheckBoxHtmlDataList[k].tab == 'Personal Information'){
            //         if(largestElement < this.selectedSummaryCheckBoxHtmlDataList[k].Sequence){
            //           largestElement = this.selectedSummaryCheckBoxHtmlDataList[k].Sequence;
            //         }
            //       }
            //     }
            //     largestElement = Number(largestElement) + 1;
            //     const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
            //     this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
            //   }
            // }
            // if (row.tab == 'Compliance Information') {
            //    // it checked that field name is already exist, if yes, then change sequence else push element.
            //    const index = this.selectedPersonalInformationFields.findIndex((o) => o.fieldName === row.fieldName);
            //    if (index == -1) {
            //      this.selectedPersonalInformationFields.push(row);
            //    } else {
            //      this.selectedPersonalInformationFields[index].Sequence = row.Sequence;
            //    }
            //    let largestElement = 0;
            //    if (row.Sequence === 0) {
            //      for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
            //        if( this.selectedSummaryCheckBoxHtmlDataList[k].tab == 'Compliance Information'){
            //          if(largestElement < this.selectedSummaryCheckBoxHtmlDataList[k].Sequence){
            //            largestElement = this.selectedSummaryCheckBoxHtmlDataList[k].Sequence;
            //          }
            //        }
            //      }
            //      largestElement = Number(largestElement) + 1;
            //      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
            //      this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
            //    }
            // }
            /// this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
            // this.selectedSummaryCheckBoxHtmlDataList.forEach((elment,index)=>{
            //   if(elment ==row){
            //    this.selectedSummaryCheckBoxHtmlDataList[index].Sequence=largestElement;
            //   }
            // })
        }
        else {
            row.isChecked = false;
            this.decrementCounter(row, evt, row.tab);
            // if(row.tab== 'Compliance Information'){
            //   row.isChecked = false;
            //   console.log('summaryCheckBoxHtmlDataListChanged() in else', row.isChecked);
            //   const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o === row);
            //   console.log(index);
            //   this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = 0;
            //   this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
            //   let count = 1;
            //   this.selectedSummaryCheckBoxHtmlDataList.forEach((value, index) => {
            //     if(value.tab == 'Compliance Information') {
            //       this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = (count++).toString();
            //     }
            //   });
            // }
        }
        console.log(this.selectedSummaryCheckBoxHtmlDataList);
        //this.selectedSummaryCheckBoxHtmlDataList.forEach(list => list.tab === this.assignValue);
        this.counterPersonalInformation = 0;
        this.counterContactInformation = 0;
        this.counterIdentityInformation = 0;
        this.counterComplianceInformation = 0;
        this.counterEducationAndSkillInformation = 0;
        this.counterPreviousEmploymentInformation = 0;
        this.counterEmploymentInformation = 0;
        this.counterFamilyInformation = 0;
        this.counterPayrollInformation = 0;
        for (var i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Personal Information') {
                this.counterPersonalInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Contact Information') {
                this.counterContactInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Identity Information') {
                this.counterIdentityInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Compliance Information') {
                this.counterComplianceInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Previous Employment  Information') {
                this.counterPreviousEmploymentInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Education & Skill Information') {
                this.counterEducationAndSkillInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Employment Information') {
                this.counterEmploymentInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Family Information') {
                this.counterFamilyInformation++;
            }
            if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Payroll Information') {
                this.counterPayrollInformation++;
            }
        }
    };
    UploadexcelhomeComponent.prototype.getFilteredRecordByTableName = function (element, index, array, tableName) {
        return (element == tableName);
    };
    UploadexcelhomeComponent.prototype.onChangFilterDropDown = function (evt) {
        var _this = this;
        console.log(evt);
        this.sequenceArray = [];
        console.log(this.checkBoxHtmlDataList);
        this.checkBoxHtmlDataList1 = [];
        console.log('filter', this.fieldNameArrayList);
        this.global.filter(function (o) {
            if (o.tab === evt) {
                _this.checkBoxHtmlDataList1.push(o);
            }
        });
        console.log('checkBoxHtmlDataList1', this.checkBoxHtmlDataList1);
        this.fieldNameArrayList = [];
        this.fieldNameArrayList = this.checkBoxHtmlDataList1;
        console.log('fieldNameArrayList', this.fieldNameArrayList);
        var counter = 1;
        for (var i = 0; i < this.fieldNameArrayList.length; i++) {
            if (this.fieldNameArrayList[i].tab === evt) {
                if (this.fieldNameArrayList[i].isMandatory == 1) {
                    this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
                }
                this.sequenceArray.push({ disable: false, value: counter++ });
            }
        }
    };
    UploadexcelhomeComponent.prototype.exportAsXLSX = function () {
        this.excelService.exportAsExcelFile(this.excelDataList, 'suggested-orders');
    };
    UploadexcelhomeComponent.prototype.onClickEmployeeMaster = function (evt) {
        // this.checkedEmployeeMaster = false;
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
        this.sheetsize = 0;
        this.json = [];
        var temp = [];
        var sheet1 = [];
        var _loop_1 = function (q) {
            if (this_1.employeeMasterModuleList[q].group > 0) {
                this_1.selectedSummaryCheckBoxHtmlDataList.forEach(function (element) {
                    if (_this.employeeMasterModuleList[q].title == element.tab) {
                        element.tab = _this.employeeMasterModuleList[q].assignValue;
                    }
                });
            }
        };
        var this_1 = this;
        for (var q = 0; q < this.employeeMasterModuleList.length; q++) {
            _loop_1(q);
        }
        console.log('After merge selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
        var unique = __spreadArrays(new Set(this.selectedSummaryCheckBoxHtmlDataList.map(function (item) { return item.tableName; })));
        var _loop_2 = function (i) {
            var result = this_2.selectedSummaryCheckBoxHtmlDataList.filter(function (o) { return o.tableName == unique[i]; });
            // console.log(result);
            var fieldName = '';
            var set = new Set(result);
            set.forEach(function (o) {
                if (fieldName.length == 0) {
                    fieldName = o.fieldName;
                }
                else {
                    fieldName = fieldName + ',' + o.fieldName;
                }
                temp[i] = ({ sheetName: o.tab, tableName: unique[i], fields: fieldName });
            });
        };
        var this_2 = this;
        // console.log('unique', unique); // 2 found  Employee Personal Info and EmployeeMaster Table
        for (var i = 0; i < unique.length; i++) {
            _loop_2(i);
        }
        console.log('temp printed ', temp);
        var sheetNameUnique = __spreadArrays(new Set(temp.map(function (item) { return item.sheetName; })));
        var tempData = {};
        //  let json = JSON.stringify(temp);
        this.json = temp;
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
                        sheetName: this.json[y].sheetName,
                        tableName: this.json[y].tableName,
                        fields: this.json[y].fields
                    });
                }
            }
            this.objectify('sheet' + (x + 1), tempArr);
        }
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', this.anantTemp);
        console.log('customizedResponse', this.customizedResponse);
        // for (let x = 0; x < sheetNameUnique.length; x++) {
        //  const propertyName: string = 'sheet' + (x + 1);
        //   tempData[propertyName] = sheetNameUnique[x];
        // for (let l = 0; l < temp.length; l++) {
        //   let asd =  {
        //     sheetName: temp[l].sheetName,
        //     tableName: temp[l].tableName,
        //     fields: temp[l].fields,
        //   };
        //   this.customizedResponse[x][propertyName].push(asd);
        // }
        // console.log(tempData);
        // console.log(this.customizedResponse);
        // }
        console.log('customizedResponse', this.customizedResponse);
        // console.log(sheetNameUnique.length);
        //  console.log('uniqueSheet Name', sheetNameUnique[0], sheetNameUnique[1], sheetNameUnique[2]); // 2 found  Employee Personal Info and EmployeeMaster Table
        for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < sheetNameUnique.length; j++) {
                if (temp[i].sheetName === sheetNameUnique) {
                    // this.customizedResponse[j][sheetName]
                }
            }
        }
        sheet1.push(temp);
        var saveObject = {
            templateName: this.form.get('templateName').value,
            remark: this.form.get('remark').value,
            description: this.form.get('description').value,
            companyId: 1,
            module: 'EmpMaster',
            sheetSize: this.sheetsize.toString()
        };
        var object3 = __assign(__assign({}, saveObject), this.anantTemp);
        console.log('object 333333333', object3);
        console.log(JSON.stringify(object3));
        console.log('save object is ', object3);
        // console.log('json obj for saving', JSON.stringify(saveObject));
        this.uploadeExcelHomeService.postExcelTemplateGeneration(object3).subscribe(function (res) {
            if (res.data.results.length > 0) {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () {
            _this.getAllExcelTemplate();
        });
    };
    UploadexcelhomeComponent.prototype.cancelView = function () {
        this.isEditMode = false;
        this.form.reset();
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
    UploadexcelhomeComponent.prototype.buttonNext = function () {
        console.log('clicked on next');
    };
    UploadexcelhomeComponent.prototype.buttonPrevious = function () {
        console.log('clicked on previous');
        // console.log(this.selectedCounterList);
        console.log(this.fieldNameArrayList);
    };
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
    // objectify1(key, value) {
    //   this.anantTemp[key] = value;
    // }
    UploadexcelhomeComponent.prototype.onmergeSelected = function (evt, emp) {
        console.log(evt);
        console.log(evt.target.checked);
        console.log(emp);
        if (evt.target.checked == true) {
            emp.checked = true;
            var index = this.tempMergeSelectedArrayList.findIndex(function (o) { return o.title == emp.title; });
            if (index == -1) {
                this.tempMergeSelectedArrayList.push(emp);
            }
        }
        else {
            var index = this.tempMergeSelectedArrayList.findIndex(function (o) { return o.title == emp.title; });
            console.log('index  ', index);
            if (index == -1) {
                console.log(' not found');
            }
            else {
                this.tempMergeSelectedArrayList.splice(index, 1);
            }
            // find index and remove it
        }
        console.log('selectedMergedGroupList ', this.selectedMergedGroupList);
        console.log('tempMergeSelectedArrayList ', this.tempMergeSelectedArrayList);
        console.log('employeeMasterModuleList ', this.employeeMasterModuleList);
    };
    UploadexcelhomeComponent.prototype.onClosePopUpWindow = function () {
        // this.tempMergeSelectedArrayList = [];
        console.log('on close pop up window', this.selectedMergedGroupList);
        var lastItem = this.selectedMergedGroupList[this.selectedMergedGroupList.length - 1];
        var indexOfEmpMasterModule = this.employeeMasterModuleList.findIndex(function (o) { return o.title == lastItem.title; });
        console.log('indexOfEmpMasterModule', indexOfEmpMasterModule);
        this.employeeMasterModuleList[indexOfEmpMasterModule].checked = false;
        this.employeeMasterModuleList[indexOfEmpMasterModule].disabled = false;
        console.log('last item is ', lastItem);
        this.selectedMergedGroupList = [];
    };
    UploadexcelhomeComponent.prototype.saveMergeAndUnmerge = function () {
        var _this = this;
        console.log(this.tempMergeSelectedArrayList);
        var lastItem = this.selectedMergedGroupList[this.selectedMergedGroupList.length - 1];
        lastItem.selected = true;
        console.log('in save Merge And Unmerge lastitem == ', lastItem);
        var largestElement = 0;
        var mergedIndex = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == lastItem.title; });
        console.log('merged index is ', mergedIndex);
        if (mergedIndex == -1) {
            for (var k = 0; k < this.employeeMasterModuleList.length; k++) {
                if (largestElement < this.employeeMasterModuleList[k].group) {
                    largestElement = this.employeeMasterModuleList[k].group;
                }
            }
            largestElement = Number(largestElement) + 1;
        }
        else {
            largestElement = this.employeeMasterModuleList[mergedIndex].group;
        }
        console.log('largest element in a group is ', largestElement);
        // if assignValue is exist then  replace all group 0 and checked false
        var indx = this.employeeMasterModuleList.findIndex(function (o) { return o.assignValue == lastItem.title; });
        if (indx !== -1) {
            for (var k = 0; k < this.employeeMasterModuleList.length; k++) {
                if (this.employeeMasterModuleList[k].assignValue == lastItem.title) {
                    this.employeeMasterModuleList[k].group = 0;
                    this.employeeMasterModuleList[k].checked = false;
                    this.employeeMasterModuleList[k].disabled = false;
                    this.employeeMasterModuleList[k].assignValue = '';
                }
            }
        }
        console.log('is it valid  ', this.tempMergeSelectedArrayList.length > 1);
        if (this.tempMergeSelectedArrayList.length > 1) {
            this.tempMergeSelectedArrayList.push(lastItem);
            var _loop_3 = function (k) {
                var index = this_3.employeeMasterModuleList.findIndex(function (o) { return o.title == _this.tempMergeSelectedArrayList[k].title; });
                this_3.employeeMasterModuleList[index].group = largestElement;
                this_3.employeeMasterModuleList[index].checked = true;
                // this.employeeMasterModuleList[index].disabled = true;
                this_3.employeeMasterModuleList[index].assignValue = lastItem.title;
            };
            var this_3 = this;
            for (var k = 0; k < this.tempMergeSelectedArrayList.length; k++) {
                _loop_3(k);
            }
        }
        else {
            var index = this.employeeMasterModuleList.findIndex(function (o) { return o.title == lastItem.title; });
            this.employeeMasterModuleList[index].group = 0;
            this.employeeMasterModuleList[index].assignValue = '';
            this.employeeMasterModuleList[index].checked = false;
        }
        this.tempMergeSelectedArrayList = [];
        this.selectedMergedGroupList = [];
        console.log(this.employeeMasterModuleList);
    };
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
