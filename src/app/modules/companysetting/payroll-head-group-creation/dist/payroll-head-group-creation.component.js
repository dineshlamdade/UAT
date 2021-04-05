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
    function PayrollHeadGroupCreationComponent(modalService, datepipe, formBuilder, companySettingsService, alertService) {
        this.modalService = modalService;
        this.datepipe = datepipe;
        this.formBuilder = formBuilder;
        this.companySettingsService = companySettingsService;
        this.alertService = alertService;
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
        //headGroupIdforattributeList: number;
        this.showflag = false;
        this.HeadNameList = [];
        this.selectedheadName = [];
        this.FormulaArray = [];
        this.SDMArray = [];
        this.viewSaveButton = false;
        this.value = '';
        this.NewTargetArray = [];
        this.getbyid = false;
        this.originalSourceProductList = [];
    }
    PayrollHeadGroupCreationComponent.prototype.ngOnInit = function () {
        this.getAllAttributeSelection();
        this.getAllPayrollHeadGroup();
        this.getAllHeadCreation();
        // this.getAllFormulaList();
        // this.getAllSDMList();
        this.getAllHeadCreation1();
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'headMasterId',
            textField: 'standardName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.payrollHeadGroupCreationForm = this.formBuilder.group({
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            headGroupDefinitionName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    // get All HeadCreation
    PayrollHeadGroupCreationComponent.prototype.getAllHeadCreation1 = function () {
        var _this = this;
        this.companySettingsService.getAllHeadCreation().subscribe(function (res) {
            _this.dropdownList = res.data.results;
            console.log('dropdwonlist', _this.dropdownList);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onItemSelect = function (item) {
        this.Multiselectflag = true;
        // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
        // this.ServicesList=[];
        this.ServicesList.push(item.headGroupId);
        console.log(item);
    };
    PayrollHeadGroupCreationComponent.prototype.onItemDeSelect = function (item) {
        // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
        // this.ServicesList=[];
        var index = this.ServicesList.indexOf(item.headGroupId);
        if (index > -1) {
            this.ServicesList.splice(index, 1);
        }
        console.log(item);
    };
    PayrollHeadGroupCreationComponent.prototype.onSelectAll = function (items) {
        // this.ServicesList.forEach(function(f){
        //   addCycleDefinition.serviceName.push(f);
        // });
        var _this = this;
        items.forEach(function (element) {
            _this.ServicesList.push(element.headGroupId);
        });
        //this.ServicesList.push(items.serviceName)
        console.log(items);
    };
    PayrollHeadGroupCreationComponent.prototype.onDeSelectAll = function (items) {
        this.ServicesList = [];
    };
    PayrollHeadGroupCreationComponent.prototype.resetAttributeSelection = function () {
        this.payrollHeadGroupCreationForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.viewupdateButton = false;
        // this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
        //
        //   this.sourceProducts = res.data.results;
        //   });
        this.targetProducts = [];
        this.getAllHeadCreation();
        this.payrollHeadGroupCreationForm.get('attributeNature').setValue('');
    };
    // get All Attribute Selection(Attribute Group)
    PayrollHeadGroupCreationComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.companySettingsService.getAllAttributeSelection().subscribe(function (res) {
            _this.AttributeSelectionList = res.data.results;
            //this.attributeGroupId=
        });
    };
    // get All  Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.getAllPayrollHeadGroup = function () {
        var _this = this;
        this.companySettingsService.getAllPayrollHeadGroup().subscribe(function (res) {
            _this.PayrollHeadGroupList = res.data.results;
        });
    };
    // get All  Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.getAllFormulaList = function () {
        var _this = this;
        this.companySettingsService.getFromulaForFormulaMaster().subscribe(function (res) {
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
    //   this. companySettingsService.getSDMFormula().subscribe(res => {
    //
    //       this.SDMArray = res.data.results[0].originalFormula;
    //       });
    //     }
    // get All HeadCreation
    PayrollHeadGroupCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.companySettingsService.getAllHeadCreation().subscribe(function (res) {
            _this.sourceProducts = res.data.results;
            _this.originalSourceProductList = res.data.results;
        });
    };
    // Get PHG ById
    PayrollHeadGroupCreationComponent.prototype.GetPHGByIdDisable = function (id) {
        var _this = this;
        // this.disabled= false;
        this.viewupdateButton = true;
        // this.viewCancelButton= true;
        this.headGroupDefinitionId = id;
        this.targetProducts = []; //added new
        //this.getAllHeadCreation();
        this.companySettingsService.GetPHGById(id)
            .subscribe(function (response) {
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
            _this.payrollHeadGroupCreationForm.patchValue({ headGroupDefinitionName: response.data.results[0].headGroupDefinitionName });
            _this.payrollHeadGroupCreationForm.patchValue({ description: response.data.results[0].description });
            _this.payrollHeadGroupCreationForm.patchValue({ attributeNature: response.data.results[0].attributeGroupName });
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
        // this.CycleupdateFlag=false;
        // this.CycleupdateFlag1=false;
        this.companySettingsService.DeletePayrollHeadGroup(id)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllPayrollHeadGroup();
            _this.payrollHeadGroupCreationForm.reset();
            // this.targetProducts=[];
        });
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeEvent = function (event) {
        this.PHGName = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.onStatusChange = function (event) {
        this.AttGrpName = event.target.value;
        this.attributeGroupId = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.onChangeDropDown = function (event) {
        this.AttGrpName = event.target.value;
        this.attributeGroupId = event.target.value;
    };
    PayrollHeadGroupCreationComponent.prototype.inputChanged = function (element) {
        alert(element.getAttribute('attributeNature')); // item_name
    };
    PayrollHeadGroupCreationComponent.prototype.selected = function () {
        alert(this.selectedLevel.name);
    };
    PayrollHeadGroupCreationComponent.prototype.RowSelected = function (u, ind) {
        var _this = this;
        this.HighlightRow = ind;
        console.log('in row selected ');
        var temp = this.sourceProducts;
        this.sourceProducts = new Array();
        /// let index1 = temp.findIndex( o => o.code == u.code );
        var index = this.selectedUser.findIndex(function (o) { return o.headMasterId == u.headMasterId; });
        var isContain = this.selectedUser.some(function (o) { return o.headMasterId == u.headMasterId; });
        console.log(isContain, index);
        if (isContain == true) {
            this.selectedUser.splice(index, 1);
            //  temp[index1].attributeNature = 'List';
        }
        else {
            //temp[index1].attributeNature = 'List123';
            this.selectedUser.push(u);
        }
        //this.targetProducts.push(u);
        // declare variable in component.
        this.sourceProducts = temp;
        // this.sourceProducts.forEach( ( element, i ) => {
        //   if ( i == this.HighlightRow ) {
        //     if ( isContain == true ) {
        //       element.isHighlight = false
        //     }
        //     else {
        //       if ( i == this.HighlightRow ) {
        //         element.isHighlight = true
        //       }
        //     }
        //   }
        // } )
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
        // this.selectedUser.push( u );
        console.log("selected user", this.selectedUser);
        //this.targetProducts.push(u);
        // declare variable in component.
    };
    PayrollHeadGroupCreationComponent.prototype.lefttablePusg = function () {
        // const sss=this.newarray;
        // this.selectedUser.forEach(function(f){
        //  sss.push(f);
        // });
        var _this = this;
        this.selectedUser.forEach(function (element) {
            element.isHighlight = false;
            element.isHighlightright = false;
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
    PayrollHeadGroupCreationComponent.prototype.RowSelectedtargetProducts = function (u, i) {
        var _this = this;
        if (u.disabled == true) {
        }
        else {
            this.HighlightRight = i;
            console.log('u', u);
            var indexOfTargetProd = this.targetProducts.findIndex(function (o) { return o.headMasterId == u.headMasterId; });
            ///let temp = this.targetProducts;
            // this.targetProducts = new Array();
            /// let index1 = temp.findIndex( o => o.headMasterId == u.headMasterId );
            var index = this.selectedUser2.findIndex(function (o) { return o.headMasterId == u.headMasterId; });
            var isContain = this.selectedUser2.some(function (o) { return o.headMasterId == u.headMasterId; });
            console.log(isContain, index);
            if (isContain == true) {
                this.targetProducts[indexOfTargetProd].isHighlightright = false;
                this.selectedUser2.splice(index, 1);
                this.selectedheadName.splice(index, 1);
                //  temp[index1].attributeNature = 'List';
            }
            else {
                this.targetProducts[indexOfTargetProd].isHighlightright = true;
                //temp[index1].attributeNature = 'List123';
                this.selectedUser2.push(u);
                this.selectedheadName.push(u);
            }
            //this.targetProducts.push(u);
            // declare variable in component.
            //this.targetProducts = temp;
            // this.targetProducts.forEach( ( element, i ) => {
            //   if ( i == this.HighlightRight ) {
            //     if ( isContain == true ) {
            //       element.isHighlightright = true
            //       element.isHighlight = false
            //     }
            //     else {
            //       if ( i == this.HighlightRow ) {
            //         element.isHighlightright = true;
            //         element.isHighlight = false;
            //       }
            //     }
            //   }
            // } );
            // this.selectedheadName.push( u );
            this.HeadNameList = this.targetProducts;
            this.selectedheadName.forEach(function (element) {
                var index = _this.targetProducts.indexOf(element);
                _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.standardName !== element.standardName; });
            });
            this.dropdownList = this.HeadNameList;
            this.dropdownSettings = {
                singleSelection: false,
                idField: 'headMasterId',
                textField: 'standardName',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 2,
                allowSearchFilter: true
            };
            ////////////////////////////////////////////////////////////////
            this.headMasterId = u.headMasterId;
            //this.attributeGroupId=
            this.HeadName = u.standardName;
            this.Nature = u.headNature;
            // this.getAllAttributeListByAttGroup();
            //if(this.selectedUser2.includes)
            // this.selectedUser2.push( u );
            //   this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
            //
            //     this.AttGroupList =res.data.results[0];//[0].attributeMasters;
            //    // callBack('template12445');
            //  //  this.UploadModal2('template12445');
            //   });
            //   if(this.AttGroupList.length==0)
            //   {
            //     this.getAllAttributeListByAttGroup();
            //   }
        }
    };
    // AttributeAssignmentClick(u:any): void
    // {
    //
    //   this.headGroupIdList=u;
    // }
    PayrollHeadGroupCreationComponent.prototype.SaveNext = function (AttGroupList) {
        var _this = this;
        console.log('in save & next', AttGroupList);
        ////////////////////////////Save one headgroup////////////////////////////////////////////
        var addData = Object.assign({});
        console.log(JSON.stringify(addData));
        addData.mappingGroupRequest = [];
        this.AttributeSelectionArray = AttGroupList;
        this.AttributeSelectionArray.forEach(function (element) {
            var cycledata1 = Object.assign({});
            cycledata1.headGroupId = _this.headMasterId;
            cycledata1.attributeGroupId = element.attributeGroupId;
            cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
            cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
            cycledata1.dependentOn = element.dependentOn;
            cycledata1.value = element.value;
            cycledata1.payrollHeadGroupMappingId = element.payrollHeadGroupMappingId;
            addData.mappingGroupRequest.push(cycledata1);
        });
        console.log(JSON.stringify(addData));
        // this.companySettingsService.UpdateattributeListById( addData )
        //   .subscribe( ( res: any ) => {
        //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        //   },
        //     ( error: any ) => {
        //       this.alertService.sweetalertError( error["error"]["status"]["message"] );
        //     } );
        this.ServicesList = [];
        this.payrollHeadGroupCreationForm.reset();
        this.AttGroupList = [];
        // const cycledata1:SaveAttributeAssignment=Object.assign({});
        //////////////////////////////Save one end////////////////////////////////////////////
        this.NextheadGroupId = this.HeadNameList[0].headMasterId;
        this.headMasterId = this.NextheadGroupId;
        this.HeadName = this.HeadNameList[0].standardName;
        this.HeadNameList.forEach(function (element) {
            //  this.NextheadGroupId=element.headGroupId;
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headMasterId !== _this.NextheadGroupId; });
        });
        this.AttGroupList = [];
        this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById(this.NextheadGroupId).subscribe(function (res) {
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
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            }
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    PayrollHeadGroupCreationComponent.prototype.Next = function () {
        var _this = this;
        this.NextheadGroupId = this.HeadNameList[0].headGroupId;
        this.HeadName = this.HeadNameList[0].standardName;
        this.HeadNameList.forEach(function (element) {
            //  this.NextheadGroupId=element.headGroupId;
            _this.HeadNameList = _this.HeadNameList.filter(function (e) { return e.headGroupId !== _this.NextheadGroupId; });
        });
        this.AttGroupList = [];
        this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById(this.NextheadGroupId).subscribe(function (res) {
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
        console.log('RowSelectedtargetProducts2');
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
            idField: 'headMasterId',
            textField: 'standardName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        ////////////////////////////////////////////////////////////////
        this.headMasterId = u.headMasterId;
        //this.attributeGroupId=
        this.HeadName = u.standardName;
        this.Nature = u.headNature;
        // this.getAllAttributeListByAttGroup();
        // this.selectedUser2.push(u);
        //   this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
        //
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
        //   var index=this.targetProducts.indexOf(this.selectedUser2[0])
        //   this.selectedUser2=[];
        //   if (index > -1) {
        //    this.targetProducts.splice(index,1)
        // }
    };
    // onStatusChange2(event):void{
    //   this.AttGroupList=[];
    //   this.AttGrpName1=event.target.value;
    //   this. companySettingsService.GetAttributeOptionListByGroup( this.AttGrpName1).subscribe(res => {
    //
    //     this.AttGroupList =res.data.results[0].attributeMasters;
    //   });
    // }
    PayrollHeadGroupCreationComponent.prototype.UpdatePHGById = function () {
        var _this = this;
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
        addAttributeCreation.headGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
        addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
        //addAttributeCreation.createdBy="nisha";
        addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
        if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {
            this.companySettingsService.UpdatePHGById(this.headGroupDefinitionId, addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.headMasters = [];
                _this.targetProducts = [];
                _this.viewCancelButton = false;
                _this.viewupdateButton = false;
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllPayrollHeadGroup();
                _this.hidevalue = false;
                _this.payrollHeadGroupCreationForm.reset();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    PayrollHeadGroupCreationComponent.prototype.copyFrommPayrollHeadGroup = function (event) {
        var _this = this;
        this.showflag = true;
        this.AttGroupList = [];
        //this.headGroupIdforattributeList = ;
        // this. companySettingsService.GetAttributeOptionListByHeadGroupId( this.headGroupIdforattributeList).subscribe(res => {
        //
        //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
        // });
        this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById(event.target.value).subscribe(function (res) {
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
        console.log('attGrpName', this.AttGrpName);
        // this.selectedCopFormAttGrp=event.target.value;
        this.AttGroupList = [];
        // GetAttributeOptionList(): void {
        this.companySettingsService.GetAttributeOptionListByGroup(this.AttGrpName).subscribe(function (res) {
            _this.AttGroupList = res.data.results[0].attributeMasters;
            // this.attributeGroupId=res.data.results[0].attributeMasters.attributeGroupId;
            // this.targetProducts.forEach(element => {
            //   var index=this.targetProducts.indexOf(element)
            //   this.sourceProducts = this.sourceProducts.filter(e => e.code !== element.code);
            // });
            _this.getAllFormulaList();
            // this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
            //
            //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
            // });
            //  this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
            //
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
    //
    // }
    // saveAtttibuteAssign1(): void{
    //
    //   const cycledata1:SaveAttributeAssignment=Object.assign({});
    //   cycledata1.headGroupId=this.headGroupId;
    //   cycledata1.attributeGroupId=this.AttGroupList.attributeGroupId;//82;//1;
    //   cycledata1.fromDate=this.datepipe.transform(this.AttGroupList.fromDate, "yyyy-MM-dd");
    //   cycledata1.toDate=this.datepipe.transform(this.AttGroupList.toDate, "yyyy-MM-dd");
    //   cycledata1.dependentOn=this.AttGroupList.dependentOn;
    //   cycledata1.value=this.AttGroupList.value;
    //   //cycledata1.createdBy="nisha";
    //   this. companySettingsService.AddAttributeAssignment(cycledata1)
    //   .subscribe((res:any) => {
    //
    //       this.sweetalertMasterSuccess("Success..!!", res.status.message);
    //      // this.todisabletodate=true;
    //   },
    //   (error: any) => {
    //     this.sweetalertError(error["error"]["status"]["message"]);
    //   });
    // }
    PayrollHeadGroupCreationComponent.prototype.UpdateAtttibuteAssign = function (AttGroupList) {
        var _this = this;
        console.log('clicked on save ', AttGroupList);
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
        //
        // addData.mappingGroupRequest.push(cycledata1);
        // });
        // this. companySettingsService.UpdateattributeListById(addData)
        // .subscribe((res:any) => {
        //
        //     this.sweetalertMasterSuccess("Success..!!", res.status.message);
        // },
        // (error: any) => {
        //   this.sweetalertError(error["error"]["status"]["message"]);
        // });
        // this.ServicesList=[];
        // this.payrollHeadGroupCreationForm.reset();
        // this.AttGroupList=[];
        // const cycledata1:SaveAttributeAssignment=Object.assign({});
        var addData = Object.assign({});
        console.log(JSON.stringify(addData));
        //  addData.mappingGroupRequest = [];
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
                    // addData.mappingGroupRequest.push( cycledata1 );
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
                cycledata1.headGroupId = _this.headMasterId;
                cycledata1.attributeGroupId = element.attributeGroupId;
                cycledata1.fromDate = _this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
                cycledata1.toDate = _this.datepipe.transform(element.toDate, "yyyy-MM-dd");
                cycledata1.dependentOn = element.dependentOn;
                cycledata1.value = element.value;
                addData.mappingGroupRequest.push(cycledata1);
            });
        }
        this.companySettingsService.AddAttributeAssignment(addData)
            .subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            // this.todisabletodate=true;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
        this.ServicesList = [];
        this.payrollHeadGroupCreationForm.reset();
        this.AttGroupList = [];
        //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        // cycledata1.headGroupId=this.headGroupId;
        // cycledata1.attributeGroupId=this.attributeGroupId;
        // cycledata1.fromDate
    };
    PayrollHeadGroupCreationComponent.prototype.saveAtttibuteAssign = function (AttGroupList) {
        var _this = this;
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
                    addData.mappingGroupRequest.push(cycledata1);
                });
            });
            console.log('service list', this.ServicesList);
            console.log(JSON.stringify(addData));
        }
        else {
            //   this.AttributeSelectionArray.forEach( element => {
            //     const cycledata1: SaveAttributeAssignment = Object.assign( {} );
            //     ////////////////////////////////////////////////////////////////////////////////////////////////////
            //     // // if(this.ServicesList.length!=0)
            //     // // {
            //     //       this.ServicesList.forEach(element1=>{
            //     //       //  alert(element1.headGroupId);
            //     // cycledata1.headGroupId=element1;
            //     ////////////////////////////////////////////////////////////////////////////////////////////////////
            //     cycledata1.headGroupId = this.headGroupId;
            //     cycledata1.attributeGroupId = element.attributeGroupId;
            //     cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
            //     cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
            //     cycledata1.dependentOn = element.dependentOn;
            //     cycledata1.value = element.value;
            //     addData.mappingGroupRequest.push( cycledata1 );
            //   } );
            // }
            // this.companySettingsService.AddAttributeAssignment( addData )
            //   .subscribe( ( res: any ) => {
            //     this.sweetalertMasterSuccess( "Success..!!", res.status.message );
            //     // this.todisabletodate=true;
            //   },
            //     ( error: any ) => {
            //       this.sweetalertError( error["error"]["status"]["message"] );
            //     } );
            // this.ServicesList = [];
            // this.payrollHeadGroupCreationForm.reset();
            // this.AttGroupList = [];
            //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
            // cycledata1.headGroupId=this.headGroupId;
            // cycledata1.attributeGroupId=this.attributeGroupId;
            // cycledata1.fromDate
        }
    };
    PayrollHeadGroupCreationComponent.prototype.OntoDateChange = function (event) {
        var _this = this;
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
        this.toDate = this.datepipe.transform(event, "dd-MMM-yyyy"); //event.toISOString() ;
        this.AttGroupList.forEach(function (element) {
            element.toDate = _this.toDate;
        });
    };
    //add Payroll HeadGroup
    PayrollHeadGroupCreationComponent.prototype.addPayrollHeadGroup = function () {
        var _this = this;
        console.log('addPayrollHeadGroup');
        var addAttributeCreation = Object.assign({});
        console.log(JSON.stringify(addAttributeCreation));
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
        addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
        addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
        addAttributeCreation.countryId = 1;
        addAttributeCreation.createdBy = "nisha";
        addAttributeCreation.isActive = true;
        // addAttributeCreation.attributeNature=this.payrollHeadGroupCreationForm.value.attributeNature;
        console.log(JSON.stringify(addAttributeCreation));
        if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {
            this.companySettingsService.AddPayrollHeadGroup(addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.headMasters = [];
                _this.targetProducts = [];
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllPayrollHeadGroup();
                _this.getAllHeadCreation();
                //this.hidevalue=false;
                _this.payrollHeadGroupCreationForm.reset();
            }, function (error) {
                //  this.alertService.sweetalertError( error["error"]["status"]["message"] );
            });
        }
        else {
            // this.companySettingsService.UpdateBusinessYear( addAttributeCreation.attributeGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {
            //   this.alertService.sweetalertMasterSuccess( res.status.message, '' );
            //   this.getAllAttributeSelection();
            //   this.payrollHeadGroupCreationForm.reset();
            //   // this.updateFlag=false;
            // },
            //   ( error: any ) => {
            //     this.alertService.sweetalertError( error["error"]["status"]["message"] );
            //   } );
        }
    };
    PayrollHeadGroupCreationComponent.prototype.getPHGname = function (event) {
        var _this = this;
        this.sourceProducts = [];
        this.sourceProducts = this.originalSourceProductList;
        if (event.target.value == '') {
            this.targetProducts = [];
        }
        else {
            this.selectedCopFormPHGName = event.target.value;
            // GetAttributeOptionList(): void {
            this.companySettingsService.GetHeadListByPHGname(this.selectedCopFormPHGName).subscribe(function (res) {
                _this.targetProducts = res.data.results[0].headMasters;
                _this.targetProducts.forEach(function (element) {
                    element.disabled = true;
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
        }
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModalYesNo = function (template) {
        this.modalRef1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-lg' }));
    };
    PayrollHeadGroupCreationComponent.prototype.UploadModal2 = function (template) {
        var _this = this;
        console.log('headmaster id', this.headMasterId);
        this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById(this.headMasterId).subscribe(function (res) {
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
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
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
