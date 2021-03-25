"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AttributeSelectionComponent = exports.SaveAttributeSelection = exports.SaveAttributeCreation = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SaveAttributeCreation = /** @class */ (function () {
    function SaveAttributeCreation() {
    }
    return SaveAttributeCreation;
}());
exports.SaveAttributeCreation = SaveAttributeCreation;
var SaveAttributeSelection = /** @class */ (function () {
    function SaveAttributeSelection() {
    }
    return SaveAttributeSelection;
}());
exports.SaveAttributeSelection = SaveAttributeSelection;
var AttributeSelectionComponent = /** @class */ (function () {
    function AttributeSelectionComponent(primengConfig, formBuilder, attributeSelectionService, alertService) {
        this.primengConfig = primengConfig;
        this.formBuilder = formBuilder;
        this.attributeSelectionService = attributeSelectionService;
        this.alertService = alertService;
        this.AttributeSelectionList = [];
        this.NatureList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.hidevalue = false;
        //summons = [];
        this.summons = [];
        this.newlist = [];
        this.optionList = [];
        this.viewupdateButton = false;
        this.sourceProducts = [];
        this.targetProducts = [];
        this.selectedUser = [];
        this.selectedUser2 = [];
        this.newarray = [];
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
    AttributeSelectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllAttributeSelection();
        // get All AttributeCreation
        // getAllAttributeCreation(): void {
        this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
            _this.sourceProducts = res.data.results;
        });
        //  }
        // this.attributeSelectionService.getAllAttributeCreation().then(products => this.sourceProducts = products);
        this.targetProducts = [];
        this.primengConfig.ripple = true;
        console.log(this.targetProducts.length);
        this.AttributeCreationForm = this.formBuilder.group({
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            name: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('')
        });
    };
    AttributeSelectionComponent.prototype.RowSelected = function (u) {
        this.selectedUser.push(u);
        console.log("selected user", this.selectedUser);
        //this.targetProducts.push(u);
        // declare variable in component.
    };
    AttributeSelectionComponent.prototype.lefttablePusg = function () {
        // const sss=this.newarray;
        // this.selectedUser.forEach(function(f){
        //  sss.push(f);
        // });
        var _this = this;
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
    AttributeSelectionComponent.prototype.RowSelectedtargetProducts = function (u) {
        this.selectedUser2.push(u);
    };
    AttributeSelectionComponent.prototype.righttablePusg = function (u) {
        var _this = this;
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
    AttributeSelectionComponent.prototype.resetAttributeSelection = function () {
        var _this = this;
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
            _this.sourceProducts = res.data.results;
        });
        this.targetProducts = [];
    };
    AttributeSelectionComponent.prototype.CancelAttributeCreation = function () {
        var _this = this;
        this.summons = [];
        this.disabled = true;
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.targetProducts = [];
        this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
            _this.sourceProducts = res.data.results;
        });
    };
    // get All Attribute Selection
    AttributeSelectionComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.attributeSelectionService.getAllAttributeSelection().subscribe(function (res) {
            _this.AttributeSelectionList = res.data.results;
        });
    };
    AttributeSelectionComponent.prototype.onStatusChange = function (event) {
        var _this = this;
        this.selectedCopFormAttGrp = event.target.value;
        // GetAttributeOptionList(): void {
        this.attributeSelectionService.GetAttributeOptionListByGroup(this.selectedCopFormAttGrp).subscribe(function (res) {
            _this.targetProducts = res.data.results[0].attributeMasters;
            _this.targetProducts.forEach(function (element) {
                var index = _this.targetProducts.indexOf(element);
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
            });
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
    // Get Attribute Selection ById
    AttributeSelectionComponent.prototype.GetAttributeSelectionByIdDisable = function (id) {
        var _this = this;
        ;
        // this.CycleupdateFlag=true;
        // this.CycleupdateFlag1=false;
        this.disabled = false;
        this.viewupdateButton = false;
        this.viewCancelButton = true;
        this.attributeSelectionService.GetAttributeSelectionById(id)
            .subscribe(function (response) {
            _this.targetProducts = response.data.results[0].attributeMasters;
            _this.targetProducts.forEach(function (element) {
                var index = _this.targetProducts.indexOf(element);
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
            });
            //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
            _this.AttributeCreationForm.patchValue({ name: response.data.results[0].name });
            _this.AttributeCreationForm.patchValue({ description: response.data.results[0].description });
            _this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].name });
        });
    };
    // Get Attribute Selection ById
    AttributeSelectionComponent.prototype.GetAttributeSelectionById = function (id) {
        var _this = this;
        ;
        // this.CycleupdateFlag=true;
        // this.CycleupdateFlag1=false;
        this.disabled = true;
        this.viewupdateButton = true;
        this.viewCancelButton = true;
        this.attributeGroupId = id;
        this.attributeSelectionService.GetAttributeSelectionById(id)
            .subscribe(function (response) {
            _this.targetProducts = response.data.results[0].attributeMasters;
            console.log("targetProducts", _this.targetProducts);
            console.log("sourceProducts", _this.sourceProducts);
            _this.targetProducts.forEach(function (element) {
                console.log("element", element);
                console.log("element", element.code);
                var index = _this.targetProducts.indexOf(element);
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                // console.log("index",index);
                // //this.selectedUser=[];
                // if (index > -1) {
                //   this.sourceProducts.splice(index,1)
                //  }
                // // if (index > -1) {
                // //  this.sourceProducts.splice(index,1)
                // // }
            });
            //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
            _this.AttributeCreationForm.patchValue({ name: response.data.results[0].name });
            _this.AttributeCreationForm.patchValue({ description: response.data.results[0].description });
            //this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].name });
        });
    };
    //Delete Attribute Selection by id
    AttributeSelectionComponent.prototype.DeleteAttributeSelection = function (id) {
        var _this = this;
        ;
        // this.CycleupdateFlag=false;
        // this.CycleupdateFlag1=false;
        this.attributeSelectionService.DeleteAttributeSelection(id)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllAttributeSelection();
            _this.AttributeCreationForm.reset();
            _this.targetProducts = [];
        });
    };
    //add new AttributeCreation
    AttributeSelectionComponent.prototype.addAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            addAttributeCreation.attributeMasterIdList.push(f.attributeMasterId);
        });
        addAttributeCreation.name = this.AttributeCreationForm.value.name;
        addAttributeCreation.description = this.AttributeCreationForm.value.description;
        //addAttributeCreation.createdBy="nisha";
        // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
        if (addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0) {
            this.attributeSelectionService.AddAttributeSelection(addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.attributeMasterIdList = [];
                _this.targetProducts = [];
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllAttributeSelection();
                _this.hidevalue = false;
                _this.AttributeCreationForm.reset();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            this.attributeSelectionService.UpdateAttributeGroup(addAttributeCreation.attributeGroupDefinitionId, addAttributeCreation).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllAttributeSelection();
                _this.AttributeCreationForm.reset();
                // this.updateFlag=false;
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    AttributeSelectionComponent.prototype.UpdateAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            addAttributeCreation.attributeMasterIdList.push(f.attributeMasterId);
        });
        addAttributeCreation.name = this.AttributeCreationForm.value.name;
        addAttributeCreation.description = this.AttributeCreationForm.value.description;
        //addAttributeCreation.createdBy="nisha";
        // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
        if (addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0) {
            this.attributeSelectionService.UpdateAttributeGroup(this.attributeGroupId, addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.attributeMasterIdList = [];
                _this.targetProducts = [];
                _this.viewCancelButton = false;
                _this.viewupdateButton = false;
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllAttributeSelection();
                _this.hidevalue = false;
                _this.AttributeCreationForm.reset();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    __decorate([
        core_1.ViewChild("form")
    ], AttributeSelectionComponent.prototype, "form");
    AttributeSelectionComponent = __decorate([
        core_1.Component({
            selector: 'app-attribute-selection',
            templateUrl: './attribute-selection.component.html',
            styleUrls: ['./attribute-selection.component.scss']
        })
    ], AttributeSelectionComponent);
    return AttributeSelectionComponent;
}());
exports.AttributeSelectionComponent = AttributeSelectionComponent;
