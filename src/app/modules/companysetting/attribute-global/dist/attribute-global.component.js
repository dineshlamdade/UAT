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
    function AttributeGlobalComponent(modalService, formBuilder, attributeSelectionService, alertService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.attributeSelectionService = attributeSelectionService;
        this.alertService = alertService;
        this.selectedSummarySourceProducts = [];
        this.userHasSelectedMandatoryFieldOnly = false;
        this.summaryList = [];
        this.originalTargetList = [];
        this.AttributeSelectionList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.optionList = [];
        this.viewupdateButton = false;
        this.sourceProducts = [];
        this.targetProducts = [];
        this.originalSourceProductList = [];
        this.selectedUser = [];
        this.selectedUser2 = [];
        this.idToBeDeletetd = null;
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
            console.log('check source res ', res);
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        });
    };
    AttributeGlobalComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.summaryList = [];
        this.attributeSelectionService.getAllGlobalAttributeMasterByGlobal().subscribe(function (res) {
            console.log('res check11 ', res);
            _this.AttributeSelectionList = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    attributeNature: element.attributeNature,
                    numberOfOption: element.numberOfOption,
                    description: element.description,
                    options: (element.attributeMasters).length,
                    id: element.id,
                    name: element.name,
                    used: element.used
                };
                _this.summaryList.push(obj);
            });
        });
    };
    AttributeGlobalComponent.prototype.RowSelected = function (u, ind) {
        console.log(u);
        var ind1 = this.sourceProducts.findIndex(function (o) { return o.attributeMasterId == u.attributeMasterId; });
        var index = this.selectedUser.findIndex(function (o) { return o.attributeMasterId == u.attributeMasterId; });
        var isContain = this.selectedUser.some(function (o) { return o.attributeMasterId == u.attributeMasterId; });
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
        console.log(u);
        if (u.disabled == true) {
        }
        else {
            this.HighlightRight = i;
            var temp = this.targetProducts;
            this.targetProducts = new Array();
            var index = this.selectedUser2.findIndex(function (o) { return o.attributeMasterId == u.attributeMasterId; });
            var isContain_1 = this.selectedUser2.some(function (o) { return o.attributeMasterId == u.attributeMasterId; });
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
        if (this.userHasSelectedMandatoryFieldOnly) {
            this.AttributeGlobalForm.setErrors({ 'invalid': true });
        }
        else {
            console.log('in else block');
            this.AttributeGlobalForm.setErrors(null);
        }
    };
    AttributeGlobalComponent.prototype.righttablePusg = function (u) {
        var _this = this;
        this.selectedUser2.forEach(function (element) {
            if (element.attributeMasterId == null) {
                console.log('attributer master id is not found');
            }
            else {
                console.log('attributeMasterId', element.attributeMasterId);
            }
        });
        this.selectedUser2.forEach(function (element) {
            element.isHighlight = false;
            _this.sourceProducts.push(element);
        });
        // var v = this.selectedUser;
        this.selectedUser2.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element, index);
            _this.selectedUser2 = [];
            if (index > -1) {
                _this.targetProducts.splice(index, 1);
            }
        });
        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(function (o) { return o.disabled == true; });
        if (this.userHasSelectedMandatoryFieldOnly) {
            this.AttributeGlobalForm.setErrors({ 'invalid': true });
        }
        else {
            console.log('in else block 123');
            this.AttributeGlobalForm.setErrors(null);
        }
    };
    AttributeGlobalComponent.prototype.resetAttributeSelection = function () {
        this.targetProducts = [];
        this.sourceProducts = [];
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.AttributeGlobalForm.reset();
        this.viewCancelButton = false;
        this.AttributeGlobalForm.patchValue({
            attributeNature: ''
        });
        this.getAllAttributeCreation();
    };
    AttributeGlobalComponent.prototype.CancelAttributeCreation = function () {
        this.targetProducts = [];
        this.sourceProducts = [];
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.AttributeGlobalForm.reset();
        this.AttributeGlobalForm.enable();
        this.disabled = true;
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.sourceProducts = this.originalSourceProductList;
        this.AttributeGlobalForm.patchValue({
            attributeNature: ''
        });
        this.getAllAttributeCreation();
    };
    AttributeGlobalComponent.prototype.onStatusChange = function (event) {
        var _this = this;
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.sourceProducts = [];
        this.targetProducts = [];
        if (event.target.value == '') {
            this.AttributeGlobalForm.setErrors(null);
            this.attributeSelectionService.getGlobalAttribute1().subscribe(function (res) {
                _this.originalSourceProductList = res.data.results;
                _this.sourceProducts = res.data.results;
            });
        }
        else {
            this.attributeSelectionService.getGlobalAttribute1().subscribe(function (res) {
                _this.originalSourceProductList = res.data.results;
                _this.sourceProducts = res.data.results[0];
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            }, function () {
                _this.sourceProducts = _this.originalSourceProductList;
                _this.attributeSelectionService.GetHeadGroupByGetGlobalPHGByName(event.target.value).subscribe(function (res) {
                    _this.targetProducts = res.data.results[0].attributeMasters;
                    _this.targetProducts.forEach(function (element) {
                        //    element.disabled = true;
                        //  var index = this.targetProducts.indexOf( element )
                        _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                    });
                });
                _this.AttributeGlobalForm.setErrors({ 'INVALID': true });
                // this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
                // if ( this.userHasSelectedMandatoryFieldOnly ) {
                //   this.AttributeGlobalForm.setErrors( { 'INVALID': true } );
                // } else {
                //   console.log( 'in else block  ee' );
                //   this.AttributeGlobalForm.setErrors( null );
                // }
            });
        }
    };
    // onStatusChange1( event ) {
    //   this.selectedUser2 = [];
    //   this.selectedUser = [];
    //   this.sourceProducts = [];
    //   this.targetProducts = [];
    //   this.getAllAttributeCreation();
    //   this.sourceProducts = this.originalSourceProductList;
    //   console.log( 'name', event.target.value );
    //   this.attributeSelectionService.GetHeadGroupByGetGlobalPHGByName( event.target.value ).subscribe( res => {
    //     console.log( 'GetHeadGroupByGetGlobalPHGByName res is', res );
    //     this.targetProducts = res.data.results[0].attributeMasters;
    //     this.targetProducts.forEach( element => {
    //       //  element.disabled = true;
    //       this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
    //     } );
    //   }, ( error ) => {
    //     this.alertService.sweetalertError( error["error"]["status"]["message"] );
    //   } );
    //   // this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    // }
    AttributeGlobalComponent.prototype.GetAttributeSelectionByIdDisable = function (id) {
        var _this = this;
        this.attributeSelectionService.getAllGlobalAttributeCreation().subscribe(function (res) {
            console.log('check source res ', res);
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        }, function () {
            _this.disabled = false;
            _this.viewupdateButton = false;
            _this.viewCancelButton = true;
            _this.attributeSelectionService.GetAttriubuteSelectionByIdGlobal(id)
                .subscribe(function (response) {
                _this.targetProducts = response.data.results[0].attributeMasters;
                _this.targetProducts.forEach(function (element) {
                    _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                });
                _this.AttributeGlobalForm.patchValue({ name: response.data.results[0].name });
                _this.AttributeGlobalForm.patchValue({ description: response.data.results[0].description });
                //   this.AttributeGlobalForm.patchValue( { attributeNature: response.data.results[0].name } );
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
            _this.AttributeGlobalForm.disable();
        });
    };
    AttributeGlobalComponent.prototype.GetAttributeSelectionById = function (id, isUsed) {
        var _this = this;
        this.attributeSelectionService.getAllGlobalAttributeCreation().subscribe(function (res) {
            console.log('check source res ', res);
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        }, function () {
            _this.originalTargetList = [];
            _this.disabled = true;
            _this.viewupdateButton = true;
            _this.viewCancelButton = true;
            _this.attributeGroupId = id;
            _this.attributeSelectionService.GetAttriubuteSelectionByIdGlobal(id)
                .subscribe(function (response) {
                _this.targetProducts = response.data.results[0].attributeMasters;
                _this.originalTargetList = response.data.results[0].attributeMasters;
                _this.targetProducts.forEach(function (element) {
                    element.disabled = isUsed;
                    _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                });
                _this.AttributeGlobalForm.patchValue({ name: response.data.results[0].name });
                _this.AttributeGlobalForm.patchValue({ description: response.data.results[0].description });
                //       this.AttributeGlobalForm.patchValue( { attributeNature: response.data.results[0].name } );
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        });
    };
    AttributeGlobalComponent.prototype.DeleteAttributeSelection = function () {
        var _this = this;
        this.attributeSelectionService.DeleteAttributeSelectionAtGlobal(this.idToBeDeletetd)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllAttributeSelection();
            _this.AttributeGlobalForm.reset();
            _this.targetProducts = [];
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    AttributeGlobalComponent.prototype.addAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            addAttributeCreation.attributeMasterIdList.push(f.attributeMasterId);
        });
        addAttributeCreation.name = this.AttributeGlobalForm.value.name;
        addAttributeCreation.description = this.AttributeGlobalForm.value.description;
        console.log(JSON.stringify(addAttributeCreation));
        this.attributeSelectionService.AddAttributeSelectionGlobal(addAttributeCreation).subscribe(function (res) {
            addAttributeCreation.attributeMasterIdList = [];
            _this.targetProducts = [];
            _this.getAllAttributeSelection();
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            _this.AttributeGlobalForm.reset();
            _this.resetAttributeSelection();
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    AttributeGlobalComponent.prototype.UpdateAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            console.log(f);
            addAttributeCreation.attributeMasterIdList.push(f.attributeMasterId);
        });
        addAttributeCreation.name = this.AttributeGlobalForm.value.name;
        addAttributeCreation.description = this.AttributeGlobalForm.value.description;
        console.log(JSON.stringify(addAttributeCreation));
        this.attributeSelectionService.UpdateAttributeGlobal(this.attributeGroupId, addAttributeCreation).subscribe(function (res) {
            addAttributeCreation.attributeMasterIdList = [];
            _this.targetProducts = [];
            _this.viewCancelButton = false;
            _this.viewupdateButton = false;
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            _this.AttributeGlobalForm.reset();
            _this.resetAttributeSelection();
            _this.getAllAttributeSelection();
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
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
    AttributeGlobalComponent.prototype.UploadModal1 = function (template, id) {
        this.idToBeDeletetd = id;
        this.deleteModalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    __decorate([
        core_1.ViewChild('AttributeGlobalForm')
    ], AttributeGlobalComponent.prototype, "form");
    AttributeGlobalComponent = __decorate([
        core_1.Component({
            selector: 'app-attribute-global',
            templateUrl: './attribute-global.component.html',
            styleUrls: ['./attribute-global.component.scss'],
            styles: ["\n        .outofstock {\n          background-color: #ddd!important;\n          color: #000!important;\n          font-weight: 500;\n        }\n        .disable1{\n           background-color:#D3D3D3 !important;\n          color: #000!important;\n          font-weight: 500;\n        }"]
        })
    ], AttributeGlobalComponent);
    return AttributeGlobalComponent;
}());
exports.AttributeGlobalComponent = AttributeGlobalComponent;
