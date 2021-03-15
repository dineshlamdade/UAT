"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobMasterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var JobMasterComponent = /** @class */ (function () {
    function JobMasterComponent(formBuilder, modalService, jobMasterService, alertService, bankMasterAtCompanyService) {
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.jobMasterService = jobMasterService;
        this.alertService = alertService;
        this.bankMasterAtCompanyService = bankMasterAtCompanyService;
        this.summaryHtmlDataList = [];
        this.summaryCompanyHtmlDataList = [];
        this.summaryCompanyHtmlDataList1 = [];
        this.showButtonSaveAndReset = true;
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.form = forms_1.FormGroup;
        this.masterGridDataList = [];
        this.editedRecordIndex = 0;
        this.summaryAllOtherMappingDetailsList = [];
        this.uncheckSelectAll = false;
        this.checks = false;
        this.checksCompany = false;
        this.enableCheckAll = false;
        this.enableCompanyCheckAll = false;
        this.allhtmlTableDataList = [];
        this.tableDataList = [];
        this.tableDataList1 = [];
        this.selectedCheckBox = [];
        this.selectedCompanyListCheckBox = [];
        this.hideFormControl = true;
        this.groupCompanyDetailsList = [];
        this.jobMasterList = [
            { value: 'All', postUrl: '', putUrl: '', deleteUrl: '' },
            { value: 'Business Area', postUrl: 'business-area-master/add-businessarea', putUrl: 'business-area-master/update', deleteUrl: 'business-area-master/', postMappingToCompany: 'business-area-master-mapping/map-all', deleteMapping: 'business-area-master-mapping/' },
            { value: 'Sub Area', postUrl: 'subarea-master/add-area', putUrl: 'subarea-master/update', deleteUrl: 'subarea-master/', postMappingToCompany: 'subarea-master-mapping/map-all', deleteMapping: 'subarea-master-mapping/' },
            { value: 'Strategic Business Unit', postUrl: 'strategicbusinessunit-master/add-unit', putUrl: 'strategicbusinessunit-master/update', deleteUrl: 'strategicbusinessunit-master/', postMappingToCompany: 'strategic-businessunit-mapping/map-all', deleteMapping: 'strategic-businessunit-mapping/' },
            { value: 'Division', postUrl: 'division-master/add-division', putUrl: 'division-master/update', deleteUrl: 'division-master/', postMappingToCompany: 'division-master-mapping/map-all', deleteMapping: 'division-master-mapping/' },
            { value: 'Profit Centre', postUrl: 'profitcentre-master/add-profit', putUrl: 'profitcentre-master/update', deleteUrl: 'profitcentre-master/', postMappingToCompany: 'profitcentre-mapping/map-all', deleteMapping: 'profitcentre-mapping/' },
            { value: 'Sub Location', postUrl: 'sublocation-master/add-location', putUrl: 'sublocation-master/update', deleteUrl: 'sublocation-master/', postMappingToCompany: 'sublocation-master-mapping/map-all', deleteMapping: 'sublocation-master-mapping/' },
            { value: 'Work Location', postUrl: 'worklocation-master/add-location', putUrl: 'worklocation-master/update', deleteUrl: 'worklocation-master/', postMappingToCompany: 'worklocationmaster-mapping/map-all', deleteMapping: 'worklocationmaster-mapping/' },
            { value: 'Cost Centre', postUrl: 'costcentre-master/add-costcentre', putUrl: 'costcentre-master/update', deleteUrl: 'costcentre-master/', postMappingToCompany: 'costcentre-mapping/map-all', deleteMapping: 'costcentre-mapping/' },
            { value: 'Sub Cost Centre', postUrl: 'subcostcentre-master/add-costcentre', putUrl: 'subcostcentre-master/update', deleteUrl: 'subcostcentre-master/', postMappingToCompany: 'subcostcentre-master-mapping/map-all', deleteMapping: 'subcostcentre-master-mapping/' },
            { value: 'Department', postUrl: 'department-master/add-department', putUrl: 'department-master/update', deleteUrl: 'department-master/', postMappingToCompany: 'department-master-mapping/map-all', deleteMapping: 'department-master-mapping/' },
            { value: 'Sub Department', postUrl: 'subdepartment-master/add-department', putUrl: 'subdepartment-master/update', deleteUrl: 'subdepartment-master/', postMappingToCompany: 'subdepartment-master-mapping/map-all', deleteMapping: 'subdepartment-master-mapping/' },
            { value: 'Grade', postUrl: 'grade-master/add-grade', putUrl: 'grade-master/update', deleteUrl: 'grade-master/', postMappingToCompany: 'grade-master-mapping/map-all', deleteMapping: 'grade-master-mapping/' },
            { value: 'Project', postUrl: 'project-master/add-project', putUrl: 'project-master/update', deleteUrl: 'project-master/', postMappingToCompany: 'projectmaster-mapping/map-all', deleteMapping: 'projectmaster-mapping/' },
            { value: 'Plant', postUrl: 'plant-master/add-plant', putUrl: 'plant-master/update', deleteUrl: 'plant-master/', postMappingToCompany: 'plantmaster-mapping/map-all', deleteMapping: 'plantmaster-mapping/' },
            { value: 'Region', postUrl: 'region-master/add-region', putUrl: 'region-master/update', deleteUrl: 'region-master/', postMappingToCompany: 'regionmaster-mapping/map-all', deleteMapping: 'regionmaster-mapping/' },
            { value: 'GL Code', postUrl: 'GLcode-master/add-Glcode', putUrl: 'GLcode-master/update', deleteUrl: 'GLcode-master/', postMappingToCompany: 'GLcodemaster-mapping/map-all', deleteMapping: 'GLcodemaster-mapping/' },
        ];
        this.viewMode = false;
        this.form = this.formBuilder.group({
            masterType: new forms_1.FormControl(''),
            masterCode: new forms_1.FormControl(''),
            masterDescription: new forms_1.FormControl(''),
            isActive: new forms_1.FormControl('')
        });
        this.masterSelected = false;
        this.form.get('isActive').setValue(true);
    }
    JobMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jobMasterService.get('/business-area-master/details').subscribe(function (res) {
            console.log('getBusinessAreaMasterDetails', res);
        });
        this.jobMasterService.get('/business-area-master-mapping/details').subscribe(function (res) {
            console.log('getBusinessAreaMasterMappingDetails', res);
        });
        this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe(function (res) {
            console.log('bank company', res);
            _this.companyListResponse = res.data.results;
            var i = 0;
            res.data.results.forEach(function (element) {
                if (element.companyActive == true) {
                    var obj = {
                        id: i++,
                        groupCompanyId: element.groupCompanyId,
                        companyName: element.companyName,
                        companyActive: element.companyActive,
                        isSelected: false
                    };
                    _this.groupCompanyDetailsList.push({ id: element.groupCompanyId, itemName: element.companyName });
                    _this.summaryCompanyHtmlDataList.push(obj);
                    _this.summaryCompanyHtmlDataList1.push(obj);
                }
            });
        });
        this.refreshHtmlTable();
        this.getAllOtheMappingDetails();
    };
    JobMasterComponent.prototype.refreshHtmlTable = function () {
        var _this = this;
        this.allhtmlTableDataList = [];
        this.tableDataList = [];
        this.tableDataList1 = [];
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.jobMasterService.getAllOtherMasterDetails().subscribe(function (res) {
            _this.masterGridDataList = res.data.results;
            console.log('getAllOtherMasterDetails xx', res);
            var i = 1;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    masterId: element.masterId,
                    masterCode: element.masterCode,
                    masterDescription: element.masterDescription,
                    masterType: element.masterType,
                    isActive: element.isActive,
                    isSelected: false
                };
                _this.summaryHtmlDataList.push(obj);
                _this.allhtmlTableDataList.push(obj);
                _this.tableDataList.push(obj);
                _this.tableDataList1.push(obj);
            });
        });
    };
    // saveBusinessAreaMasterMapping() {
    //   const saveData = ({
    //     masterCode: 'SampleCode',
    //     masterDescription: 'Description',
    //     createdBy: 'AnantT',
    //   });
    //   this.jobMasterService.post(saveData, 'business-area-master-mapping/map-all').subscribe((res) => {
    //     console.log('business-area-master-mapping/map-all', res);
    //     if (res.data.results.length !== 0) {
    //       this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
    //     } else {
    //       this.alertService.sweetalertWarning(res.status.messsage);
    //     }
    //   }, (error: any) => {
    //     this.alertService.sweetalertError(error['error']['status']['messsage']);
    //   });
    // }
    JobMasterComponent.prototype.saveMaster = function () {
        //  let lastIndex = this.tableDataList.findIndex(o=>o.masterType =='Business Area')
        var _this = this;
        var len = this.tableDataList.filter(function (item) {
            return item.masterType == 'Business Area';
        }).length;
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
        var isActive = 0;
        if (this.form.get('isActive').value == true) {
            isActive = 1;
        }
        else {
            isActive = 0;
        }
        var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === _this.form.get('masterType').value; });
        console.log('selected index' + selectedIndex);
        console.log('in update fucntion::', this.editedRecordIndex);
        if (this.editedRecordIndex > 0) {
            console.log('in update fucntion::', this.editedRecordIndex);
            var saveData = {
                masterId: this.editedRecordIndex,
                masterDescription: this.form.get('masterDescription').value,
                masterCode: this.form.get('masterCode').value,
                createdBy: 'AnantT',
                isActive: isActive
            };
            this.jobMasterService.put(saveData, this.jobMasterList[selectedIndex].putUrl).subscribe(function (res) {
                console.log(res.status.messsage);
                console.log(res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                    //this.form.reset();
                    // this.form.get('masterCode').setValue = '';
                    // this.form.get('masterDescription').setValue = '';
                    _this.form.get('masterCode').setValue(null);
                    _this.form.get('masterDescription').setValue(null);
                    _this.form.get('isActive').setValue(true);
                    _this.isEditMode = false;
                    _this.refreshHtmlTable();
                    _this.getAllOtheMappingDetails();
                    _this.onSelectJobMaster('All');
                    _this.tableDataList = _this.tableDataList.filter(function (o) { return o.masterType === 'All'; });
                    _this.onSelectJobMaster('Plant');
                    _this.form.patchValue({
                        masterType: 'Plant',
                        masterCode: '',
                        masterDescription: ''
                    });
                    _this.tableDataList = _this.tableDataList.filter(function (o) { return o.masterType === 'Plant'; });
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            }, function () {
            });
        }
        else {
            var saveData = {
                masterDescription: this.form.get('masterDescription').value,
                masterCode: this.form.get('masterCode').value,
                createdBy: 'AnantT'
            };
            this.jobMasterService.post(saveData, this.jobMasterList[selectedIndex].postUrl).subscribe(function (res) {
                console.log(res.status.messsage);
                console.log(res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                    //this.form.reset();
                    _this.form.get('masterCode').setValue(null);
                    _this.form.get('masterDescription').setValue(null);
                    _this.form.get('isActive').setValue(true);
                    var obj = {
                        masterType: 'Business Area',
                        masterId: res.data.results[0].masterId,
                        masterDescription: res.data.results[0].masterDescription,
                        masterCode: res.data.results[0].masterCode,
                        isActive: res.data.results[0].isActive,
                        SrNo: len + 1
                    };
                    //  this.refreshHtmlTable();
                    // this.getAllOtheMappingDetails();
                    // this.onSelectJobMaster('All');
                    // this.onSelectJobMaster(this.form.get('masterType').value);
                    // this.form.patchValue({
                    //   masterType: this.form.get('masterType').value,
                    //   masterCode: '',
                    //   masterDescription: '',
                    // })
                    //this.onSelectJobMaster('Plant');
                    // this.form.patchValue({
                    //   masterType: 'Plant',
                    //   masterCode: '',
                    //   masterDescription: '',
                    // });
                    // this.tableDataList = this.tableDataList.filter((o) => o.masterType === 'Plant');
                    //this.summaryHtmlDataList.push(obj);
                    // this.allhtmlTableDataList.push(obj);
                    _this.tableDataList.push(obj);
                    //this.tableDataList1.push(obj);
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            }, function () {
            });
        }
    };
    JobMasterComponent.prototype.deleteBusinessAreaMaster = function () {
        var _this = this;
        var id = 0;
        this.jobMasterService["delete"](id, '/business-area-master').subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () { });
    };
    // deleteBusinessAreaMasterMapping() {
    //   let id = 0;
    //   this.jobMasterService.delete(id, '/business-area-master-mapping').subscribe((res) => {
    //     console.log(res);
    //     this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
    //   }, (error: any) => {
    //     this.alertService.sweetalertError(error.error['status'].messsage);
    //   }, () => { });
    // }
    JobMasterComponent.prototype.DeleteMaster = function (masterId, masterType) {
        var _this = this;
        var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value == masterType; });
        this.jobMasterService["delete"](masterId, this.jobMasterList[selectedIndex].deleteUrl).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
            _this.refreshHtmlTable();
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () { });
    };
    JobMasterComponent.prototype.editMaster = function (masterId, masterType) {
        console.log(this.masterGridDataList[masterId]);
        var findIndex = this.masterGridDataList.findIndex(function (o) { return o.masterId == masterId && o.masterType == masterType; });
        this.editedRecordIndex = masterId;
        this.isEditMode = true;
        this.viewMode = false;
        this.form.patchValue(this.masterGridDataList[findIndex]);
    };
    JobMasterComponent.prototype.onSelectJobMaster = function (evt) {
        this.selectedMasterTypeDropDownValue = this.form.get('masterType').value;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
        this.tableDataList = this.summaryHtmlDataList;
        console.log(evt);
        if (evt === 'All') {
            this.hideFormControl = false;
            this.tableDataList = this.summaryHtmlDataList;
            this.tableDataList1 = this.tableDataList;
        }
        else {
            this.hideFormControl = true;
            this.tableDataList = this.tableDataList.filter(function (o) { return o.masterType === evt; });
        }
        this.tableDataList1 = this.tableDataList;
        this.checks = false;
        console.log(evt);
    };
    JobMasterComponent.prototype.cancelView = function () {
        this.editedRecordIndex = 0;
        this.isEditMode = false;
        this.form.reset();
        this.form.get('isActive').setValue(true);
        this.onSelectJobMaster('All');
        this.form.patchValue({
            masterType: 'All',
            masterCode: '',
            masterDescription: ''
        });
    };
    JobMasterComponent.prototype.onCheckboxChange = function (evt, id) {
        // this.enableCheckAll = false;
        // console.log(evt);
        // console.log(evt.target.checked);
        console.log('check Box', this.checks);
        // console.log(id);
        if (id == -1) {
            console.log('id == -1::');
            if (evt.target.checked == true) {
                this.checks = false;
                this.enableCheckAll = false;
                this.selectedCheckBox = [];
                this.enableCheckAll = true;
                for (var i = 0; i < this.tableDataList1.length; i++) {
                    if (this.tableDataList1[i].isActive == 1) {
                        this.selectedCheckBox.push(this.tableDataList1[i]);
                    }
                }
            }
            else {
                this.checks = false;
                this.enableCheckAll = false;
                this.selectedCheckBox = [];
            }
        }
        else {
            if (evt.target.checked == true) {
                this.checks = false;
                this.selectedCheckBox.push(this.summaryHtmlDataList[id]);
                console.log('this.summaryHtmlDataList[id]', this.summaryHtmlDataList[id]);
            }
            else if (evt.target.checked === false) {
                this.checks = false;
                console.log('in removing section');
                this.selectedCheckBox.splice(this.summaryHtmlDataList[id], 1);
                console.log('this.summaryHtmlDataList[id]', this.summaryHtmlDataList[id]);
            }
            else {
                console.log('something error');
            }
        }
        console.log(this.selectedCheckBox);
    };
    JobMasterComponent.prototype.deactiveActiveCheckBox = function () {
        console.log(this.form.get('isActive').value);
    };
    JobMasterComponent.prototype.addItemType = function () { };
    JobMasterComponent.prototype.onCheckCompanyboxChange = function (evt, id) {
        this.enableCompanyCheckAll = false;
        if (id == -1) {
            console.log('id == -1::');
            console.log('this.summaryCompanyHtmlDataList::', this.summaryCompanyHtmlDataList);
            if (evt.target.checked == true) {
                this.enableCompanyCheckAll = true;
                this.selectedCompanyListCheckBox = this.summaryCompanyHtmlDataList1;
            }
            else {
                this.enableCompanyCheckAll = false;
                this.selectedCompanyListCheckBox = [];
            }
        }
        else {
            if (evt.target.checked == true) {
                this.selectedCompanyListCheckBox.push(this.summaryCompanyHtmlDataList[id]);
            }
            else if (evt.target.checked === false) {
                console.log('in removing section');
                this.selectedCompanyListCheckBox.splice(this.summaryCompanyHtmlDataList[id], 1);
            }
            else {
                console.log('something error');
            }
        }
        console.log(this.selectedCompanyListCheckBox);
    };
    // onCheckCompanyboxChange1(evt: any, id: number) {
    //   this.enableCompanyCheckAll = false;
    //   if (id == -1) {
    //     console.log('id == -1::');
    //     if (evt.target.checked == true) {
    //       this.enableCompanyCheckAll = true;
    //       for(let i =0;i<this.tableDataList1.length;i++){
    //         if(this.tableDataList1[i].isActive == 1){
    //          this.selectedCompanyListCheckBox.push(this.tableDataList1[i]);
    //         }
    //       }
    //     } else {
    //       this.enableCompanyCheckAll = false;
    //       this.selectedCompanyListCheckBox = [];
    //     }
    //   } else {
    //     if (evt.target.checked == true) {
    //       this.selectedCompanyListCheckBox.push(this.summaryCompanyHtmlDataList[id]);
    //     } else if (evt.target.checked === false) {
    //       console.log('in removing section');
    //       this.selectedCompanyListCheckBox.splice(this.summaryCompanyHtmlDataList[id], 1);
    //     }
    //   }
    //   console.log(this.selectedCompanyListCheckBox);
    //    // if (evt.target.checked == true) {
    //   //   this.selectedCompanyListCheckBox.push(row);
    //   // } else if (evt.target.checked === false) {
    //   //   console.log('in removing section');
    //   //   this.selectedCompanyListCheckBox.splice(row, 1);
    //   // } else {
    //   //   console.log('something error');
    //   // }
    // }
    JobMasterComponent.prototype.saveMapToCompany = function () {
        var _this = this;
        this.modalRef.hide();
        var Business_Area = [];
        var Cost_Centre = [];
        var Department = [];
        var Division = [];
        var Sub_Cost_Centre = [];
        var Sub_Department = [];
        var Sub_Location = [];
        var GL_Code = [];
        var Grade = [];
        var Profit_Centre = [];
        var Project = [];
        var Region = [];
        var SubArea = [];
        var Strategic_Business_Unit = [];
        var Plant = [];
        var Work_Location = [];
        for (var i = 0; i < this.selectedCheckBox.length; i++) {
            for (var j = 0; j < this.selectedCompanyListCheckBox.length; j++) {
                if (this.selectedCheckBox[i].masterType == 'Business Area') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Business_Area.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Cost Centre') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Cost_Centre.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Department') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Department.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Division') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Division.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Sub Cost Centre') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Sub_Cost_Centre.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Sub Department') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Sub_Department.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'GL Code') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    GL_Code.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Grade') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Grade.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Plant') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Plant.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Sub Location') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Sub_Location.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Project') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Project.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Profit Centre') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Profit_Centre.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Region') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Region.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Sub Area') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    SubArea.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Strategic Business Unit') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Strategic_Business_Unit.push(obj);
                }
                if (this.selectedCheckBox[i].masterType == 'Work Location') {
                    var obj = {
                        masterId: this.selectedCheckBox[i].masterId,
                        groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
                        createdBy: 'AnantT'
                    };
                    Work_Location.push(obj);
                }
            }
        }
        /// end of two for loop i & j ...
        if (Business_Area.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Business Area'; });
            this.jobMasterService.post(Business_Area, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Business Area', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Cost_Centre.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Cost Centre'; });
            this.jobMasterService.post(Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Cost Centre', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Department.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Department'; });
            this.jobMasterService.post(Department, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Department', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Division.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Division'; });
            this.jobMasterService.post(Division, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Division', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Sub_Cost_Centre.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Sub Cost Centre'; });
            this.jobMasterService.post(Sub_Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Sub Cost Centre', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Sub_Department.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Sub Department'; });
            this.jobMasterService.post(Sub_Department, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Sub Department', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Sub_Location.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Sub Location'; });
            this.jobMasterService.post(Sub_Location, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Sub Location', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (GL_Code.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'GL Code'; });
            this.jobMasterService.post(GL_Code, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('GL Code', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Grade.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Grade'; });
            this.jobMasterService.post(Grade, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Grade', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Plant.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Plant'; });
            this.jobMasterService.post(Plant, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Plant', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Profit_Centre.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Profit Centre'; });
            this.jobMasterService.post(Profit_Centre, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Profit Centre', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Project.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Project'; });
            this.jobMasterService.post(Project, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Project', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Region.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Region'; });
            this.jobMasterService.post(Region, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Region', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (SubArea.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Sub Area'; });
            this.jobMasterService.post(SubArea, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('SubArea', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Strategic_Business_Unit.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Strategic Business Unit'; });
            this.jobMasterService.post(Strategic_Business_Unit, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Strategic Business Unit', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        if (Work_Location.length > 0) {
            var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === 'Work Location'; });
            this.jobMasterService.post(Work_Location, this.jobMasterList[selectedIndex].postMappingToCompany).subscribe(function (res) {
                console.log('Work Location', res);
                if (res.data.results.length !== 0) {
                    _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['messsage']);
            });
        }
        this.enableCheckAll = false;
        this.uncheckSelectAll = false;
        this.selectedCheckBox = [];
    };
    JobMasterComponent.prototype.isAllSelected = function (evt) {
        if (evt.target.value == false) {
            this.checkUncheckAll();
        }
        else {
            this.enableCompanyCheckAll = true;
            this.masterSelected = this.summaryCompanyHtmlDataList.every(function (item) {
                return item.isSelected == true;
            });
            // this.getCheckedItemList();
        }
    };
    JobMasterComponent.prototype.getCheckedItemList = function () {
        this.checkedList = [];
        for (var i = 0; i < this.summaryCompanyHtmlDataList.length; i++) {
            if (this.summaryCompanyHtmlDataList[i].isSelected) {
                this.checkedList.push(this.summaryCompanyHtmlDataList[i]);
            }
        }
        this.checkedList = JSON.stringify(this.checkedList);
    };
    JobMasterComponent.prototype.checkUncheckAll = function () {
        for (var i = 0; i < this.summaryCompanyHtmlDataList.length; i++) {
            this.summaryCompanyHtmlDataList[i].isSelected = this.masterSelected;
        }
        this.getCheckedItemList();
    };
    JobMasterComponent.prototype.UploadModal = function (template) {
        this.checksCompany = false;
        this.enableCompanyCheckAll = false;
        this.selectedCompanyListCheckBox = [];
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    JobMasterComponent.prototype.getAllOtheMappingDetails = function () {
        var _this = this;
        this.summaryAllOtherMappingDetailsList = [];
        this.getAllOtherMappingDetailsResponse = {};
        this.jobMasterService.getAllOtheMappingDetails().subscribe(function (res) {
            console.log('check mi');
            _this.getAllOtherMappingDetailsResponse = res.data.results;
            var i = 1;
            res.data.results.forEach(function (element) {
                if (element.isActive == 1) {
                    var obj = {
                        SrNo: i++,
                        masterMappingId: element.masterMappingId,
                        masterId: element.masterId,
                        groupCompanyId: element.groupCompanyId,
                        masterMappingType: element.masterMappingType,
                        masterCode: element.masterCode,
                        companyName: element.companyName,
                        isActive: element.isActive
                    };
                    _this.summaryAllOtherMappingDetailsList.push(obj);
                }
            });
        });
    };
    JobMasterComponent.prototype.DeleteMasterMapping = function (masterId, masterType) {
        var _this = this;
        var selectedIndex = this.jobMasterList.findIndex(function (o) { return o.value === masterType; });
        this.jobMasterService["delete"](masterId, this.jobMasterList[selectedIndex].deleteMapping).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
            _this.getAllOtheMappingDetails();
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () { });
    };
    JobMasterComponent.prototype.onClickAssignmentSummary = function () {
        this.getAllOtheMappingDetails();
    };
    JobMasterComponent.prototype.ConfirmationDialog = function (confirmdialog, id, type, summaryType) {
        this.id = id;
        this.type = type;
        this.summaryType = summaryType;
        this.modalRef = this.modalService.show(confirmdialog, Object.assign({}, { "class": 'gray modal-md' }));
    };
    JobMasterComponent.prototype.clickedOnYes = function () {
        console.log('yes');
        if (this.summaryType == 'master-summary') {
            this.DeleteMaster(this.id, this.type);
        }
        if (this.summaryType == 'assignment-summary') {
            this.DeleteMasterMapping(this.id, this.type);
        }
    };
    JobMasterComponent = __decorate([
        core_1.Component({
            selector: 'app-job-master',
            templateUrl: './job-master.component.html',
            styleUrls: ['./job-master.component.scss']
        })
    ], JobMasterComponent);
    return JobMasterComponent;
}());
exports.JobMasterComponent = JobMasterComponent;
