"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AttributeGlobalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AttributeGlobalComponent = /** @class */ (function () {
    function AttributeGlobalComponent(formBuilder, attributeSelectionService, alertService) {
        this.formBuilder = formBuilder;
        this.attributeSelectionService = attributeSelectionService;
        this.alertService = alertService;
        this.removedAttributeGroupIdList = [];
        this.userHasSelectedMandatoryFieldOnly = false;
        this.summaryList = [];
        this.originalTargetList = [];
        this.AttributeSelectionList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.optionList = [];
        this.viewupdateButton = false;
        this.sourceProducts = [];
        this.targetProducts = [];
        this.originalSourceProductList = [];
        this.selectedUser = [];
        this.selectedUser2 = [];
    }
    AttributeGlobalComponent.prototype.ngOnInit = function () {
        this.getAllAttributeSelection();
        this.getAllAttributeCreation();
        this.AttributeGlobalForm = this.formBuilder.group({
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            name: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('')
        });
    };
    AttributeGlobalComponent.prototype.getAllAttributeCreation = function () {
        var _this = this;
        this.attributeSelectionService.getAllGlobalAttributeCreation().subscribe(function (res) {
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        });
    };
    // get All Attribute Selection
    AttributeGlobalComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.attributeSelectionService.getAllGlobalAttributeMaster().subscribe(function (res) {
            _this.AttributeSelectionList = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    code: element.code,
                    attributeNature: element.attributeNature,
                    numberOfOption: element.numberOfOption,
                    description: element.description,
                    globalAttributeMasterId: element.globalAttributeMasterId,
                    options: (element.optionList).length,
                    id: element.id,
                    name: element.name
                };
                _this.summaryList.push(obj);
            });
        });
    };
    AttributeGlobalComponent.prototype.RowSelected = function (u, ind) {
        console.log(u);
        var ind1 = this.sourceProducts.findIndex(function (o) { return o.globalAttributeMasterId == u.globalAttributeMasterId; });
        var index = this.selectedUser.findIndex(function (o) { return o.globalAttributeMasterId == u.globalAttributeMasterId; });
        var isContain = this.selectedUser.some(function (o) { return o.globalAttributeMasterId == u.globalAttributeMasterId; });
        console.log(isContain, index);
        if (isContain == true) {
            this.sourceProducts[ind1].isHighlight = false;
            this.selectedUser.splice(index, 1);
        }
        else {
            this.sourceProducts[ind1].isHighlight = true;
            this.selectedUser.push(u);
        }
        console.log('selected row is', u);
        console.log('selected user', this.selectedUser);
    };
    AttributeGlobalComponent.prototype.RowSelectedtargetProducts = function (u, i) {
        var _this = this;
        if (u.disabled == true) {
        }
        else {
            this.HighlightRight = i;
            var temp = this.targetProducts;
            this.targetProducts = new Array();
            var index = this.selectedUser2.findIndex(function (o) { return o.globalAttributeMasterId == u.globalAttributeMasterId; });
            var isContain_1 = this.selectedUser2.some(function (o) { return o.globalAttributeMasterId == u.globalAttributeMasterId; });
            console.log(isContain_1, index);
            if (isContain_1 == true) {
                this.selectedUser2.splice(index, 1);
            }
            else {
                this.selectedUser2.push(u);
            }
            this.targetProducts = temp;
            this.targetProducts.forEach(function (element, i) {
                if (i == _this.HighlightRight) {
                    if (isContain_1 == true) {
                        element.isHighlightright = false;
                        element.isHighlight = false;
                    }
                    else {
                        element.isHighlightright = true;
                        element.isHighlight = false;
                    }
                }
            });
        }
    };
    AttributeGlobalComponent.prototype.lefttablePusg = function () {
        var _this = this;
        this.selectedUser.forEach(function (element, index) {
            element.isHighlightright = false;
            _this.targetProducts.push(element);
        });
        this.selectedUser.forEach(function (element) {
            var index = _this.sourceProducts.indexOf(element);
            _this.selectedUser = [];
            if (index > -1) {
                _this.sourceProducts.splice(index, 1);
            }
        });
        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(function (o) { return o.disabled == true; });
    };
    AttributeGlobalComponent.prototype.righttablePusg = function (u) {
        var _this = this;
        this.selectedUser2.forEach(function (element) {
            if (element.globalAttributeMasterId == null) {
                console.log('attributer master id is not found');
            }
            else {
                console.log('globalAttributeMasterId', element.globalAttributeMasterId);
            }
        });
        this.selectedUser2.forEach(function (element) {
            element.isHighlight = false;
            _this.sourceProducts.push(element);
        });
        var v = this.selectedUser;
        this.selectedUser2.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element, index);
            _this.selectedUser2 = [];
            if (index > -1) {
                _this.targetProducts.splice(index, 1);
            }
        });
        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(function (o) { return o.disabled == true; });
    };
    AttributeGlobalComponent.prototype.resetAttributeSelection = function () {
        this.targetProducts = [];
        this.sourceProducts = [];
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.AttributeGlobalForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.AttributeGlobalForm.patchValue({
            attributeNature: ''
        });
        this.getAllAttributeCreation();
    };
    AttributeGlobalComponent.prototype.CancelAttributeCreation = function () {
        this.AttributeGlobalForm.enable();
        this.targetProducts = [];
        this.sourceProducts = [];
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.disabled = true;
        this.hidevalue = false;
        this.AttributeGlobalForm.reset();
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.sourceProducts = this.originalSourceProductList;
        this.AttributeGlobalForm.patchValue({
            attributeNature: ''
        });
    };
    AttributeGlobalComponent.prototype.onStatusChange = function (event) {
        var _this = this;
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.sourceProducts = [];
        this.targetProducts = [];
        this.getAllAttributeCreation();
        this.sourceProducts = this.originalSourceProductList;
        this.attributeSelectionService.GetAttributeOptionListByGroup(event.target.value).subscribe(function (res) {
            console.log('GetAttributeOptionListByGroup res is', res);
            _this.targetProducts = res.data.results[0].attributeMasters;
            _this.targetProducts.forEach(function (element) {
                element.disabled = true;
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
            });
        });
        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(function (o) { return o.disabled == true; });
    };
    // Get Attribute Selection ById
    AttributeGlobalComponent.prototype.GetAttributeSelectionByIdDisable = function (id) {
        var _this = this;
        this.disabled = false;
        this.viewupdateButton = false;
        this.viewCancelButton = true;
        this.attributeSelectionService.GetAttributeSelectionById(id)
            .subscribe(function (response) {
            _this.targetProducts = response.data.results[0].attributeMasters;
            _this.targetProducts.forEach(function (element) {
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
            });
            _this.AttributeGlobalForm.patchValue({ name: response.data.results[0].name });
            _this.AttributeGlobalForm.patchValue({ description: response.data.results[0].description });
            _this.AttributeGlobalForm.patchValue({ attributeNature: response.data.results[0].name });
        });
        this.AttributeGlobalForm.disable();
    };
    // Get Attribute Selection ById
    AttributeGlobalComponent.prototype.GetAttributeSelectionById = function (id) {
        var _this = this;
        this.originalTargetList = [];
        this.disabled = true;
        this.viewupdateButton = true;
        this.viewCancelButton = true;
        this.attributeGroupId = id;
        this.attributeSelectionService.GetAttributeSelectionById(id)
            .subscribe(function (response) {
            _this.targetProducts = response.data.results[0].attributeMasters;
            _this.originalTargetList = response.data.results[0].attributeMasters;
            _this.targetProducts.forEach(function (element) {
                _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
            });
            _this.AttributeGlobalForm.patchValue({ name: response.data.results[0].name });
            _this.AttributeGlobalForm.patchValue({ description: response.data.results[0].description });
            _this.AttributeGlobalForm.patchValue({ attributeNature: response.data.results[0].name });
        });
    };
    //Delete Attribute Selection by id
    AttributeGlobalComponent.prototype.DeleteAttributeSelection = function (id) {
        var _this = this;
        this.attributeSelectionService.DeleteAttributeSelection(id)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllAttributeSelection();
            _this.AttributeGlobalForm.reset();
            _this.targetProducts = [];
        });
    };
    //add new AttributeCreation
    AttributeGlobalComponent.prototype.addAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            addAttributeCreation.attributeMasterIdList.push(f.globalAttributeMasterId);
        });
        addAttributeCreation.name = this.AttributeGlobalForm.value.name;
        addAttributeCreation.description = this.AttributeGlobalForm.value.description;
        console.log(JSON.stringify(addAttributeCreation));
        this.attributeSelectionService.AddAttributeSelection(addAttributeCreation).subscribe(function (res) {
            addAttributeCreation.attributeMasterIdList = [];
            _this.targetProducts = [];
            _this.alertService.sweetalertMasterSuccess(res.status.message, ''); //success
            _this.getAllAttributeSelection();
            _this.hidevalue = false;
            _this.AttributeGlobalForm.reset();
        }, function (error) {
        });
    };
    AttributeGlobalComponent.prototype.UpdateAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            addAttributeCreation.attributeMasterIdList.push(f.globalAttributeMasterId);
        });
        addAttributeCreation.name = this.AttributeGlobalForm.value.name;
        addAttributeCreation.description = this.AttributeGlobalForm.value.description;
        console.log(JSON.stringify(this.attributeGroupId));
        console.log(JSON.stringify(addAttributeCreation));
        addAttributeCreation.removedAttributeGroupIdList = [];
        var _loop_1 = function (i) {
            if (addAttributeCreation.attributeMasterIdList.some(function (o) { return o.globalAttributeMasterId == _this.originalSourceProductList[i].globalAttributeMasterId; })) {
                addAttributeCreation.removedAttributeGroupIdList.push(this_1.originalSourceProductList[i].globalAttributeMasterId);
            }
            else {
                console.log('line no 479 in else block');
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.originalSourceProductList.length; i++) {
            _loop_1(i);
        }
        console.log(JSON.stringify(addAttributeCreation.attributeGroupDefinitionId));
        console.log(JSON.stringify(addAttributeCreation));
        if (addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0) {
            this.attributeSelectionService.UpdateAttributeGroup(this.attributeGroupId, addAttributeCreation).subscribe(function (res) {
                addAttributeCreation.attributeMasterIdList = [];
                _this.targetProducts = [];
                _this.viewCancelButton = false;
                _this.viewupdateButton = false;
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllAttributeSelection();
                _this.hidevalue = false;
                _this.AttributeGlobalForm.reset();
            }, function (error) {
                // this.alertService.sweetalertError( error[error][status][message] );
            });
        }
    };
    AttributeGlobalComponent.prototype.doubleClickOnLeftTable = function (u) {
        this.RowSelected(u, -1);
        this.lefttablePusg();
    };
    AttributeGlobalComponent.prototype.doubleClickOnRightTable = function (u) {
        this.RowSelectedtargetProducts(u, -1);
        this.righttablePusg(u);
    };
    AttributeGlobalComponent.prototype.keyPressedSpaceNotAllow = function (event) {
        var pattern = /[ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    __decorate([
        core_1.ViewChild('AttributeGlobalForm')
    ], AttributeGlobalComponent.prototype, "form");
    AttributeGlobalComponent = __decorate([
        core_1.Component({
            selector: 'app-attribute-global',
            templateUrl: './attribute-global.component.html',
            styleUrls: ['./attribute-global.component.scss']
        })
    ], AttributeGlobalComponent);
    return AttributeGlobalComponent;
}());
exports.AttributeGlobalComponent = AttributeGlobalComponent;
