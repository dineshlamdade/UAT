"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PayrollHeadGroupCreationComponent = exports.SaveAttributeAssignment = exports.UpdateflagCycleCreation = exports.SaveAttributeSelection = exports.headDetail1 = exports.headDetail = exports.SavePHG = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
//import { SavePHG, headDetail, SaveAttributeSelection, SaveAttributeAssignment, UpdateflagCycleCreation } from './payrollheadgroupcreation.model';
//sneha
var sweetalert2_1 = require("sweetalert2");
var SavePHG = /** @class */ (function () {
    function SavePHG() {
    }
    return SavePHG;
}());
exports.SavePHG = SavePHG;
var headDetail = /** @class */ (function () {
    function headDetail() {
    }
    return headDetail;
}());
exports.headDetail = headDetail;
var headDetail1 = /** @class */ (function () {
    function headDetail1() {
    }
    return headDetail1;
}());
exports.headDetail1 = headDetail1;
var SaveAttributeSelection = /** @class */ (function () {
    function SaveAttributeSelection() {
    }
    return SaveAttributeSelection;
}());
exports.SaveAttributeSelection = SaveAttributeSelection;
var UpdateflagCycleCreation = /** @class */ (function () {
    function UpdateflagCycleCreation() {
    }
    return UpdateflagCycleCreation;
}());
exports.UpdateflagCycleCreation = UpdateflagCycleCreation;
var SaveAttributeAssignment = /** @class */ (function () {
    function SaveAttributeAssignment() {
    }
    return SaveAttributeAssignment;
}());
exports.SaveAttributeAssignment = SaveAttributeAssignment;
var PayrollHeadGroupCreationComponent = /** @class */ (function () {
    function PayrollHeadGroupCreationComponent(modalService, datepipe, formBuilder, payrollheadgroupcreationService) {
        this.modalService = modalService;
        this.datepipe = datepipe;
        this.formBuilder = formBuilder;
        this.payrollheadgroupcreationService = payrollheadgroupcreationService;
        this.AttributeSelectionList = [];
        this.PayrollHeadGroupList = [];
        this.sourceProducts = [];
        this.targetProducts = [];
        this.selectedUser = [];
        this.selectedUser2 = [];
        this.AttGroupList = [];
        this.values = [];
        this.AttributeSelectionArray = [];
        this.headGroupIdList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.viewupdateButton = false;
        this.dropdownSettings = {};
        this.dropdownList = [];
        this.ServicesList = [];
        this.Multiselectflag = false;
        this.showflag = false;
        this.HeadNameList = [];
        this.selectedheadName = [];
        this.FormulaArray = [];
        this.SDMArray = [];
        this.viewSaveButton = false;
        this.value = '';
        this.NewTargetArray = [];
        this.getbyid = false;
    }
    PayrollHeadGroupCreationComponent.prototype.ngOnInit = function () {
        this.getAllAttributeSelection();
        this.getAllPayrollHeadGroup();
        this.getAllHeadCreation();
        // this.getAllFormulaList();
        // this.getAllSDMList();
        // get All HeadCreation
        //getAllHeadCreation(): void {
        // this.payrollheadgroupcreationService.getAllHeadCreation().subscribe(res => {
        //     debugger
        //         this.dropdownList = res.data.results;
        //         });
        //      // }
        // this.dropdownSettings = {
        //   singleSelection: false,
        //   idField: 'headGroupId',
        //   textField: 'standardName',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 2,
        //   allowSearchFilter: true
        // };
        this.AttributeCreationForm = this.formBuilder.group({
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            headGroupDefinitionName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onItemSelect = function (item) {
        debugger;
        this.Multiselectflag = true;
        // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
        // this.ServicesList=[];
        this.ServicesList.push(item.headGroupId);
        console.log(item);
    };
    PayrollHeadGroupCreationComponent.prototype.onItemDeSelect = function (item) {
        debugger;
        // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
        // this.ServicesList=[];
        var index = this.ServicesList.indexOf(item.headGroupId);
        if (index > -1) {
            this.ServicesList.splice(index, 1);
        }
        console.log(item);
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAll = function (items) {
        var _this = this;
        debugger;
        // this.ServicesList.forEach(function(f){
        //   addCycleDefinition.serviceName.push(f);
        // });
        items.forEach(function (element) {
            _this.ServicesList.push(element.headGroupId);
        });
        //this.ServicesList.push(items.serviceName)
        debugger;
        console.log(items);
    };
    PayrollHeadGroupCreationComponent.prototype.onDeSelectAll = function (items) {
        this.ServicesList = [];
    };
    PayrollHeadGroupCreationComponent.prototype.sweetalert7 = function (message) {
        sweetalert2_1["default"].fire({
            text: message
        });
    };
    PayrollHeadGroupCreationComponent.prototype.sweetalertWarning = function (message) {
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
    PayrollHeadGroupCreationComponent.prototype.sweetalertInfo = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'info',
            timer: 15000,
            timerProgressBar: true
        });
    };
    PayrollHeadGroupCreationComponent.prototype.sweetalertMasterSuccess = function (message, text) {
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
    PayrollHeadGroupCreationComponent.prototype.sweetalertError = function (message) {
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
    PayrollHeadGroupCreationComponent.prototype.resetAttributeSelection = function () {
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.viewupdateButton = false;
        // this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
        //   debugger
        //   this.sourceProducts = res.data.results;
        //   });
        this.targetProducts = [];
        this.getAllHeadCreation();
    };
    // get All Attribute Selection(Attribute Group)
    PayrollHeadGroupCreationComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.payrollheadgroupcreationService.getAllAttributeSelection().subscribe(function (res) {
            debugger;
            _this.AttributeSelectionList = res.data.results;
            //this.attributeGroupId=
        });
    };
    // get All  Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.getAllPayrollHeadGroup = function () {
        var _this = this;
        this.payrollheadgroupcreationService.getAllPayrollHeadGroup().subscribe(function (res) {
            debugger;
            _this.PayrollHeadGroupList = res.data.results;
        });
    };
    // get All  Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.getAllFormulaList = function () {
        var _this = this;
        this.payrollheadgroupcreationService.getFromulaForFormulaMaster().subscribe(function (res) {
            debugger;
            _this.FormulaArray = res.data.results;
            _this.Formula = res.data.results[0].originalFormula;
            //   this.AttGroupList.forEach(element => {
            //     if(element.attributeNature=='Formula')
            //     {
            //     this.FormulaArray = res.data.results;
            //  // element.value=this.Formula;
            //    }
            //   //  else if(element.attributeNature=='input')
            //   //   {
            //   // element.value=this.Formula;
            //   //   }
            //    });
        });
    };
    //        // get All  Payroll HeadGroup
    // getAllSDMList(): void {
    //   this.payrollheadgroupcreationService.getSDMFormula().subscribe(res => {
    //       debugger
    //       this.SDMArray = res.data.results[0].originalFormula;
    //       });
    //     }
    // get All HeadCreation
    PayrollHeadGroupCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.payrollheadgroupcreationService.getAllHeadCreation().subscribe(function (res) {
            debugger;
            _this.sourceProducts = res.data.results;
        });
    };
    // Get PHG ById
    PayrollHeadGroupCreationComponent.prototype.GetPHGByIdDisable = function (id) {
        var _this = this;
        debugger;
        // this.disabled= false;
        this.viewupdateButton = true;
        // this.viewCancelButton= true;
        this.headGroupDefinitionId = id;
        this.targetProducts = []; //added new
        //this.getAllHeadCreation();
        this.payrollheadgroupcreationService.GetPHGById(id)
            .subscribe(function (response) {
            debugger;
            response.data.results[0].headMasters.forEach(function (element) {
                _this.NewTargetArray.push(element);
            });
            //this.getAllHeadCreation();
            _this.targetProducts = response.data.results[0].headMasters;
            //this.NewTargetArray=response.data.results[0].headMasters;
            _this.targetProducts.forEach(function (element) {
                var index = _this.targetProducts.indexOf(element);
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.standardName !== element.standardName; });
            });
            //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
            _this.AttributeCreationForm.patchValue({ headGroupDefinitionName: response.data.results[0].headGroupDefinitionName });
            _this.AttributeCreationForm.patchValue({ description: response.data.results[0].description });
            _this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].attributeGroupName });
            _this.PHGName = response.data.results[0].headGroupDefinitionName;
            _this.AttGrpName = response.data.results[0].attributeGroupName;
            // this.dropdownList=this.HeadNameList;
            // this.dropdownSettings = {
            //   singleSelection: false,
            //   idField: 'headGroupId',
            //   textField: 'standardName',
            //   selectAllText: 'Select All',
            //   unSelectAllText: 'UnSelect All',
            //   itemsShowLimit: 2,
            //   allowSearchFilter: true
            // };
        });
        // this.getAllHeadCreation();
    };
    //Delete Payroll HeadGroup by id
    PayrollHeadGroupCreationComponent.prototype.DeletePayrollHeadGroup = function (id) {
        var _this = this;
        debugger;
        // this.CycleupdateFlag=false;
        // this.CycleupdateFlag1=false;
        this.payrollheadgroupcreationService.DeletePayrollHeadGroup(id)
            .subscribe(function (response) {
            debugger;
            _this.sweetalertMasterSuccess("Success..!!", response.status.message);
            _this.getAllPayrollHeadGroup();
            _this.AttributeCreationForm.reset();
            // this.targetProducts=[];
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeEvent = function (event) {
        debugger;
        this.PHGName = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.onStatusChange = function (event) {
        debugger;
        this.AttGrpName = event.target.value;
        this.attributeGroupId = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeDropDown = function (event) {
        debugger;
        this.AttGrpName = event.target.value;
        this.attributeGroupId = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.inputChanged = function (element) {
        debugger;
        alert(element.getAttribute('attributeNature')); // item_name
    };
    PayrollHeadGroupCreationComponent.prototype.selected = function () {
        alert(this.selectedLevel.name);
    };
    PayrollHeadGroupCreationComponent.prototype.RowSelected = function (u) {
        debugger;
        this.selectedUser.push(u);
        console.log("selected user", this.selectedUser);
        //this.targetProducts.push(u);
        // declare variable in component.
    };
    PayrollHeadGroupCreationComponent.prototype.lefttablePusg = function () {
        var _this = this;
        debugger;
        // const sss=this.newarray;
        // this.selectedUser.forEach(function(f){
        //  sss.push(f);
        // });
        this.selectedUser.forEach(function (element) {
            _this.targetProducts.push(element);
        });
        var v = this.selectedUser;
        //  v.forEach(element => {
        //     this.targetProducts.push(element);
        //   });
        // for(var i=0;i<v.length;++i)
        // {
        // this.targetProducts.push(v[0]);
        // }
        this.selectedUser.forEach(function (element) {
            var index = _this.sourceProducts.indexOf(element);
            _this.selectedUser = [];
            if (index > -1) {
                _this.sourceProducts.splice(index, 1);
            }
        });
        // var index=this.sourceProducts.indexOf(this.selectedUser[0])
        // this.selectedUser=[];
        // if (index > -1) {
        //  this.sourceProducts.splice(index,1)
        // this.selectedUser=[];
        // }
        // this.sourceProducts.splice(this.selectedUser.indexOf(0))
    };
    PayrollHeadGroupCreationComponent.prototype.RowSelectedtargetProducts = function (u) {
        var _this = this;
        debugger;
        /////////////////////////////////////////////////////
        this.selectedheadName.push(u);
        this.HeadNameList = this.targetProducts;
        this.selectedheadName.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element);
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.standardName !== element.standardName; });
        });
        this.dropdownList = this.HeadNameList;
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'headGroupId',
            textField: 'standardName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        ////////////////////////////////////////////////////////////////
        this.headGroupId = u.headGroupId;
        //this.attributeGroupId=
        this.HeadName = u.standardName;
        this.Nature = u.headNature;
        // this.getAllAttributeListByAttGroup();
        //if(this.selectedUser2.includes)
        this.selectedUser2.push(u);
        //   this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
        //     debugger
        //     this.AttGroupList =res.data.results[0];//[0].attributeMasters;
        //    // callBack('template12445');
        //  //  this.UploadModal2('template12445');
        //   });
        //   if(this.AttGroupList.length==0)
        //   {
        //     this.getAllAttributeListByAttGroup();
        //   }
    };
    // AttributeAssignmentClick(u:any): void
    // {
    //   debugger
    //   this.headGroupIdList=u;
    // }
    PayrollHeadGroupCreationComponent.prototype.SaveNext = function (AttGroupList) {
        var _this = this;
        debugger;
        //////////////////////////////Save one headgroup////////////////////////////////////////////
        var addData = Object.assign({});
        addData.mappingGroupRequest = [];
        this.AttributeSelectionArray = AttGroupList;
        this.AttributeSelectionArray.forEach(function (element) {
            var cycledata1 = Object.assign({});
            cycledata1.headGroupId = _this.headGroupId;
            cycledata1.attributeGroupId = element.attributeGroupId;
            cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
            cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
            cycledata1.dependentOn = element.dependentOn;
            cycledata1.value = element.value;
            cycledata1.payrollHeadGroupMappingId = element.payrollHeadGroupMappingId;
            debugger;
            addData.mappingGroupRequest.push(cycledata1);
        });
        this.payrollheadgroupcreationService.UpdateattributeListById(addData)
            .subscribe(function (res) {
            debugger;
            _this.sweetalertMasterSuccess("Success..!!", res.status.message);
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["message"]);
        });
        this.ServicesList = [];
        this.AttributeCreationForm.reset();
        this.AttGroupList = [];
        // const cycledata1:SaveAttributeAssignment=Object.assign({});
        //////////////////////////////Save one end////////////////////////////////////////////
        this.NextheadGroupId = this.HeadNameList[0].headGroupId;
        this.headGroupId = this.NextheadGroupId;
        this.HeadName = this.HeadNameList[0].standardName;
        this.HeadNameList.forEach(function (element) {
            //  this.NextheadGroupId=element.headGroupId;
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupId !== _this.NextheadGroupId; });
        });
        this.AttGroupList = [];
        this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.NextheadGroupId).subscribe(function (res) {
            debugger;
            _this.AttGroupList = res.data.results[0]; //[0].attributeMasters;
            _this.AttGroupList.forEach(function (element) {
                element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
                element.fromDate = _this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
            });
            if (_this.AttGroupList[0].attributeMaster.code != null) {
                _this.AttGroupList.forEach(function (element) {
                    element["code"] = element.attributeMaster.code;
                });
            }
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup();
                //this.viewSaveButton=true;
            }
            // this.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.Next = function () {
        var _this = this;
        debugger;
        this.NextheadGroupId = this.HeadNameList[0].headGroupId;
        this.HeadName = this.HeadNameList[0].standardName;
        this.HeadNameList.forEach(function (element) {
            //  this.NextheadGroupId=element.headGroupId;
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupId !== _this.NextheadGroupId; });
        });
        this.AttGroupList = [];
        this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.NextheadGroupId).subscribe(function (res) {
            debugger;
            _this.AttGroupList = res.data.results[0]; //[0].attributeMasters;
            _this.AttGroupList.forEach(function (element) {
                element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
                element.fromDate = _this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
            });
            if (_this.AttGroupList[0].attributeMaster.code != null) {
                _this.AttGroupList.forEach(function (element) {
                    element["code"] = element.attributeMaster.code;
                });
            }
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup();
                //this.viewSaveButton=true;
            }
            // this.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.RowSelectedtargetProducts2 = function (u) {
        var _this = this;
        debugger;
        /////////////////////////////////////////////////////
        this.selectedheadName.push(u);
        this.HeadNameList = this.targetProducts;
        this.selectedheadName.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element);
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.standardName !== element.standardName; });
        });
        this.dropdownList = this.HeadNameList;
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'headGroupId',
            textField: 'standardName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        ////////////////////////////////////////////////////////////////
        this.headGroupId = u.headGroupId;
        //this.attributeGroupId=
        this.HeadName = u.standardName;
        this.Nature = u.headNature;
        // this.getAllAttributeListByAttGroup();
        // this.selectedUser2.push(u);
        //   this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
        //     debugger
        //     this.AttGroupList =res.data.results[0];//[0].attributeMasters;
        //    // callBack('template12445');
        //  //  this.UploadModal2('template12445');
        //   });
        //   if(this.AttGroupList.length==0)
        //   {
        //     this.getAllAttributeListByAttGroup();
        //   }
    };
    PayrollHeadGroupCreationComponent.prototype.righttablePusg = function (u) {
        var _this = this;
        debugger;
        this.selectedUser2.forEach(function (element) {
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
        //   var index=this.targetProducts.indexOf(this.selectedUser2[0])
        //   this.selectedUser2=[];
        //   if (index > -1) {
        //    this.targetProducts.splice(index,1)
        // }
    };
    // onStatusChange2(event):void{
    //   this.AttGroupList=[];
    //   this.AttGrpName1=event.target.value;
    //   this.payrollheadgroupcreationService.GetAttributeOptionListByGroup( this.AttGrpName1).subscribe(res => {
    //     debugger
    //     this.AttGroupList =res.data.results[0].attributeMasters;
    //   });
    // }
    PayrollHeadGroupCreationComponent.prototype.UpdatePHGById = function () {
        var _this = this;
        debugger;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.headMasters = [];
        //////////////////////////////////////////////////////
        this.NewTargetArray.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element);
            _this.targetProducts = _this.targetProducts.filter(function (e) { return e.standardName !== element.standardName; });
        });
        // this.targetProducts.forEach(element => {
        //   var index=this.targetProducts.indexOf(element)
        //   this.NewTargetArray = this.NewTargetArray.filter(e => e.standardName !== element.standardName);
        // });
        // this.NewTargetArray.forEach(function(f){
        //   const headDetail:headDetail=Object.assign({});
        //   headDetail.headMasterId = f.headMasterId ;
        //   addAttributeCreation.removedHeadGroupIdList.push( headDetail  );
        //   //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
        // });
        /////////////////////////////////////////////////////////////
        this.targetProducts.forEach(function (f) {
            var headDetail = Object.assign({});
            headDetail.headMasterId = f.headMasterId;
            addAttributeCreation.headMasters.push(headDetail);
            //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
        });
        addAttributeCreation.headGroupDefinitionName = this.AttributeCreationForm.value.headGroupDefinitionName;
        addAttributeCreation.description = this.AttributeCreationForm.value.description;
        //addAttributeCreation.createdBy="nisha";
        addAttributeCreation.attributeGroupName = this.AttributeCreationForm.value.attributeNature;
        if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {
            this.payrollheadgroupcreationService.UpdatePHGById(this.headGroupDefinitionId, addAttributeCreation).subscribe(function (res) {
                debugger;
                addAttributeCreation.headMasters = [];
                _this.targetProducts = [];
                _this.viewCancelButton = false;
                _this.viewupdateButton = false;
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllPayrollHeadGroup();
                _this.hidevalue = false;
                _this.AttributeCreationForm.reset();
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.onStatusChange23 = function (event) {
        var _this = this;
        this.showflag = true;
        debugger;
        this.AttGroupList = [];
        this.headGroupIdforattributeList = event.target.value;
        // this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupId( this.headGroupIdforattributeList).subscribe(res => {
        //   debugger
        //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
        // });
        this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.headGroupIdforattributeList).subscribe(function (res) {
            debugger;
            _this.AttGroupList = res.data.results[0]; //[0].attributeMasters;
            _this.AttGroupList.forEach(function (element) {
                element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
                element.fromDate = _this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
            });
            if (_this.AttGroupList[0].attributeMaster.code != null) {
                _this.AttGroupList.forEach(function (element) {
                    element["code"] = element.attributeMaster.code;
                });
            }
            _this.viewSaveButton = false;
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup();
                _this.viewSaveButton = true;
            }
        });
    };
    PayrollHeadGroupCreationComponent.prototype.getAllAttributeListByAttGroup = function () {
        var _this = this;
        debugger;
        // this.selectedCopFormAttGrp=event.target.value;
        this.AttGroupList = [];
        // GetAttributeOptionList(): void {
        this.payrollheadgroupcreationService.GetAttributeOptionListByGroup(this.AttGrpName).subscribe(function (res) {
            debugger;
            _this.AttGroupList = res.data.results[0].attributeMasters;
            // this.attributeGroupId=res.data.results[0].attributeMasters.attributeGroupId;
            // this.targetProducts.forEach(element => {
            //   var index=this.targetProducts.indexOf(element)
            //   this.sourceProducts = this.sourceProducts.filter(e => e.code !== element.code);
            // });
            _this.getAllFormulaList();
            // this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
            //   debugger
            //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
            // });
            //  this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
            //     debugger
            //     this.sourceProducts = res.data.results;
            //     });
            // this.targetProducts.forEach(element => {
            //   var index=this.targetProducts.indexOf(element)
            //   this.sourceProducts = this.sourceProducts.filter(e => e.code == element.code);
            // });
        });
    };
    // save(summary:any):void{
    //   this.AttGroupList=summary;
    //   var tt=summary;
    //   debugger;
    // }
    // saveAtttibuteAssign1(): void{
    //   debugger
    //   const cycledata1:SaveAttributeAssignment=Object.assign({});
    //   cycledata1.headGroupId=this.headGroupId;
    //   cycledata1.attributeGroupId=this.AttGroupList.attributeGroupId;//82;//1;
    //   cycledata1.fromDate=this.datepipe.transform(this.AttGroupList.fromDate, "yyyy-MM-dd");
    //   cycledata1.toDate=this.datepipe.transform(this.AttGroupList.toDate, "yyyy-MM-dd");
    //   cycledata1.dependentOn=this.AttGroupList.dependentOn;
    //   cycledata1.value=this.AttGroupList.value;
    //   //cycledata1.createdBy="nisha";
    //   this.payrollheadgroupcreationService.AddAttributeAssignment(cycledata1)
    //   .subscribe((res:any) => {
    //       debugger
    //       this.sweetalertMasterSuccess("Success..!!", res.status.message);
    //      // this.todisabletodate=true;
    //   },
    //   (error: any) => {
    //     this.sweetalertError(error["error"]["status"]["message"]);
    //   });
    // }
    PayrollHeadGroupCreationComponent.prototype.UpdateAtttibuteAssign = function (AttGroupList) {
        var _this = this;
        debugger;
        //  const addData:UpdateflagCycleCreation=Object.assign({});
        //  addData.mappingGroupRequest=[];
        //  this.AttributeSelectionArray=AttGroupList;
        //  this.AttributeSelectionArray.forEach(element=>{
        //   const cycledata1:SaveAttributeAssignment=Object.assign({});
        //        cycledata1.headGroupId=this.headGroupId;
        // cycledata1.attributeGroupId=element.attributeGroupId;
        // cycledata1.fromDate=this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
        // cycledata1.toDate=this.datepipe.transform(element.toDate, "yyyy-MM-dd");
        // cycledata1.dependentOn=element.dependentOn;
        // cycledata1.value=element.value;
        // cycledata1.payrollHeadGroupMappingId=element.payrollHeadGroupMappingId;
        // debugger;
        // addData.mappingGroupRequest.push(cycledata1);
        // });
        // this.payrollheadgroupcreationService.UpdateattributeListById(addData)
        // .subscribe((res:any) => {
        //     debugger
        //     this.sweetalertMasterSuccess("Success..!!", res.status.message);
        // },
        // (error: any) => {
        //   this.sweetalertError(error["error"]["status"]["message"]);
        // });
        // this.ServicesList=[];
        // this.AttributeCreationForm.reset();
        // this.AttGroupList=[];
        // const cycledata1:SaveAttributeAssignment=Object.assign({});
        var addData = Object.assign({});
        addData.mappingGroupRequest = [];
        this.AttributeSelectionArray = AttGroupList;
        if (this.ServicesList.length != 0) {
            this.ServicesList.forEach(function (element1) {
                _this.AttributeSelectionArray.forEach(function (element) {
                    var cycledata1 = Object.assign({});
                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                    // // if(this.ServicesList.length!=0)
                    // // {
                    //       this.ServicesList.forEach(element1=>{
                    //       //  alert(element1.headGroupId);
                    cycledata1.headGroupId = element1;
                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                    // cycledata1.headGroupId=this.headGroupId;
                    cycledata1.attributeGroupId = element.attributeGroupId;
                    cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
                    cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
                    cycledata1.dependentOn = element.dependentOn;
                    cycledata1.value = element.value;
                    debugger;
                    addData.mappingGroupRequest.push(cycledata1);
                });
            });
        }
        else {
            this.AttributeSelectionArray.forEach(function (element) {
                var cycledata1 = Object.assign({});
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                // // if(this.ServicesList.length!=0)
                // // {
                //       this.ServicesList.forEach(element1=>{
                //       //  alert(element1.headGroupId);
                // cycledata1.headGroupId=element1;
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                cycledata1.headGroupId = _this.headGroupId;
                cycledata1.attributeGroupId = element.attributeGroupId;
                cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
                cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
                cycledata1.dependentOn = element.dependentOn;
                cycledata1.value = element.value;
                debugger;
                addData.mappingGroupRequest.push(cycledata1);
            });
        }
        this.payrollheadgroupcreationService.AddAttributeAssignment(addData)
            .subscribe(function (res) {
            debugger;
            _this.sweetalertMasterSuccess("Success..!!", res.status.message);
            // this.todisabletodate=true;
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["message"]);
        });
        this.ServicesList = [];
        this.AttributeCreationForm.reset();
        this.AttGroupList = [];
        //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        // cycledata1.headGroupId=this.headGroupId;
        // cycledata1.attributeGroupId=this.attributeGroupId;
        // cycledata1.fromDate
    };
    PayrollHeadGroupCreationComponent.prototype.saveAtttibuteAssign = function (AttGroupList) {
        var _this = this;
        debugger;
        // const cycledata1:SaveAttributeAssignment=Object.assign({});
        var addData = Object.assign({});
        addData.mappingGroupRequest = [];
        this.AttributeSelectionArray = AttGroupList;
        if (this.ServicesList.length != 0) {
            this.ServicesList.forEach(function (element1) {
                _this.AttributeSelectionArray.forEach(function (element) {
                    var cycledata1 = Object.assign({});
                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                    // // if(this.ServicesList.length!=0)
                    // // {
                    //       this.ServicesList.forEach(element1=>{
                    //       //  alert(element1.headGroupId);
                    cycledata1.headGroupId = element1;
                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                    // cycledata1.headGroupId=this.headGroupId;
                    cycledata1.attributeGroupId = element.attributeGroupId;
                    cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
                    cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
                    cycledata1.dependentOn = element.dependentOn;
                    cycledata1.value = element.value;
                    debugger;
                    addData.mappingGroupRequest.push(cycledata1);
                });
            });
        }
        else {
            this.AttributeSelectionArray.forEach(function (element) {
                var cycledata1 = Object.assign({});
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                // // if(this.ServicesList.length!=0)
                // // {
                //       this.ServicesList.forEach(element1=>{
                //       //  alert(element1.headGroupId);
                // cycledata1.headGroupId=element1;
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                cycledata1.headGroupId = _this.headGroupId;
                cycledata1.attributeGroupId = element.attributeGroupId;
                cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
                cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
                cycledata1.dependentOn = element.dependentOn;
                cycledata1.value = element.value;
                debugger;
                addData.mappingGroupRequest.push(cycledata1);
            });
        }
        this.payrollheadgroupcreationService.AddAttributeAssignment(addData)
            .subscribe(function (res) {
            debugger;
            _this.sweetalertMasterSuccess("Success..!!", res.status.message);
            // this.todisabletodate=true;
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["message"]);
        });
        this.ServicesList = [];
        this.AttributeCreationForm.reset();
        this.AttGroupList = [];
        //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        // cycledata1.headGroupId=this.headGroupId;
        // cycledata1.attributeGroupId=this.attributeGroupId;
        // cycledata1.fromDate
    };
    PayrollHeadGroupCreationComponent.prototype.OntoDateChange = function (event) {
        var _this = this;
        debugger;
        this.fromDate = this.datepipe.transform(event, "dd-MMM-yyyy"); //event.toISOString() ;
        this.minDate1 = event; //this.datepipe.transform(event, "dd-MMM");//event.toISOString() ;
        //this.minDate1=event.getTime()
        this.AttGroupList.forEach(function (element) {
            element.fromDate = _this.fromDate;
        });
        //this.minDate=event.getTime() ;
        //    if ((this.Id == undefined || this.Id == '00000000-0000-0000-0000-000000000000')) {
        //       this.EventDetails.patchValue({ RegistrationClosedDate:this.minDate });
        //     }
    };
    PayrollHeadGroupCreationComponent.prototype.OntoDateChangeEvent = function (event) {
        var _this = this;
        debugger;
        this.toDate = this.datepipe.transform(event, "dd-MMM-yyyy"); //event.toISOString() ;
        this.AttGroupList.forEach(function (element) {
            element.toDate = _this.toDate;
        });
    };
    //add Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.addPayrollHeadGroup = function () {
        var _this = this;
        debugger;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.headMasters = [];
        this.targetProducts.forEach(function (f) {
            // var headDetail = new addAttributeCreation.headMasters.headMasterId();
            // headDetail.headMasterId = f.globalHeadMasterId ;
            // addAttributeCreation.headMasters.push( headDetail  );
            var headDetail = Object.assign({});
            headDetail.headMasterId = f.headMasterId;
            addAttributeCreation.headMasters.push(headDetail);
            //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
        });
        addAttributeCreation.headGroupDefinitionName = this.PHGName;
        addAttributeCreation.description = this.AttributeCreationForm.value.description;
        addAttributeCreation.attributeGroupName = this.AttributeCreationForm.value.attributeNature;
        addAttributeCreation.countryId = 1;
        addAttributeCreation.createdBy = "nisha";
        addAttributeCreation.isActive = true;
        // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
        if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {
            this.payrollheadgroupcreationService.AddPayrollHeadGroup(addAttributeCreation).subscribe(function (res) {
                debugger;
                addAttributeCreation.headMasters = [];
                _this.targetProducts = [];
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllPayrollHeadGroup();
                _this.getAllHeadCreation();
                //this.hidevalue=false;
                _this.AttributeCreationForm.reset();
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            //     debugger
            //   this.attributeSelectionService.UpdateBusinessYear(addAttributeCreation.attributeGroupDefinitionId,addAttributeCreation).subscribe((res:any )=> {
            //   debugger
            //   this.sweetalertMasterSuccess("Updated..!!", res.status.message);
            //   this.getAllAttributeSelection();
            //   this.AttributeCreationForm.reset();
            //  // this.updateFlag=false;
            //   },
            //   (error: any) => {
            //      this.sweetalertError(error["error"]["status"]["message"]);
            //    });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.getPHGname = function (event) {
        var _this = this;
        debugger;
        this.selectedCopFormPHGName = event.target.value;
        // GetAttributeOptionList(): void {
        this.payrollheadgroupcreationService.GetHeadListByPHGname(this.selectedCopFormPHGName).subscribe(function (res) {
            debugger;
            _this.targetProducts = res.data.results[0].headMasters;
            _this.targetProducts.forEach(function (element) {
                var index = _this.targetProducts.indexOf(element);
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.standardName !== element.standardName; });
            });
            // this.targetProducts.forEach(element => {
            //   var index=this.targetProducts.indexOf(element)
            //   this.sourceProducts = this.sourceProducts.filter(e => e.code !== element.code);
            // });
            _this.dropdownList = _this.HeadNameList;
            _this.dropdownSettings = {
                singleSelection: false,
                idField: 'headGroupId',
                textField: 'standardName',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 2,
                allowSearchFilter: true
            };
        });
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModalYesNo = function (template) {
        this.modalRef1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-lg' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModal2 = function (template) {
        var _this = this;
        debugger;
        this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.headGroupId).subscribe(function (res) {
            debugger;
            _this.AttGroupList = res.data.results[0]; //[0].attributeMasters;
            _this.AttGroupList.forEach(function (element) {
                element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
                element.fromDate = _this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
            });
            if (_this.AttGroupList[0].attributeMaster.code != null) {
                _this.AttGroupList.forEach(function (element) {
                    element["code"] = element.attributeMaster.code;
                });
            }
            // else{
            // }
        }, function (error) {
            if (error.status == 404) {
                _this.getAllAttributeListByAttGroup();
                _this.viewSaveButton = true;
            }
            // this.sweetalertError(error["error"]["status"]["message"]);
        });
        //});
        // if(this.AttGroupList.length==0)
        // {
        //   this.getAllAttributeListByAttGroup();
        //   this.viewSaveButton=true;
        // }
        // callBack('template12445');
        //  this.UploadModal2('template12445');
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
        //});
        // if(this.AttGroupList.length==0)
        // {
        //   this.getAllAttributeListByAttGroup();
        // }
        // this.modalRef = this.modalService.show(
        //     template,
        //     Object.assign({}, { class: 'gray modal-xl' })
        // );
    };
    PayrollHeadGroupCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-payroll-head-group-creation',
            templateUrl: './payroll-head-group-creation.component.html',
            styleUrls: ['./payroll-head-group-creation.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], PayrollHeadGroupCreationComponent);
    return PayrollHeadGroupCreationComponent;
}());
exports.PayrollHeadGroupCreationComponent = PayrollHeadGroupCreationComponent;
