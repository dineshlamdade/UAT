"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AttributeSelectionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AttributeSelectionComponent = /** @class */ (function () {
    function AttributeSelectionComponent(formBuilder, attributeSelectionService, alertService) {
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
    ;
    AttributeSelectionComponent.prototype.ngOnInit = function () {
        this.getAllAttributeSelection();
        this.getAllAttributeCreation();
        //  this.targetProducts = [];
        //this.primengConfig.ripple = true;
        this.AttributeSelectionForm = this.formBuilder.group({
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            name: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('')
        });
    };
    AttributeSelectionComponent.prototype.getAllAttributeCreation = function () {
        //this.originalSourceProductList = [];
        // this.sourceProducts = [];
        var _this = this;
        //  getAllGlobalAttributeCreation
        /// COMMENTED FUNCTION getAllAttributeCreation
        this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
            console.log('c', res.data.results);
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        });
    };
    // get All Attribute Selection
    AttributeSelectionComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.summaryList = [];
        this.attributeSelectionService.getAttributeGroup().subscribe(function (res) {
            _this.AttributeSelectionList = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    code: element.code,
                    attributeNature: element.attributeNature,
                    numberOfOption: element.numberOfOption,
                    description: element.description,
                    attributeMasterId: element.attributeMasterId,
                    options: (element.attributeMasters).length,
                    id: element.id,
                    name: element.name
                };
                _this.summaryList.push(obj);
            });
        });
    };
    AttributeSelectionComponent.prototype.RowSelected = function (u, ind) {
        var ind1 = this.sourceProducts.findIndex(function (o) { return o.code == u.code; });
        // this.HighlightRow = ind;
        // let temp = this.sourceProducts;
        // this.sourceProducts = new Array();
        //  this.sourceProducts = [];
        // let index1 = temp.findIndex( o => o.code == u.code );
        // this.selectedMaterialCode = u.code;
        var index = this.selectedUser.findIndex(function (o) { return o.code == u.code; });
        var isContain = this.selectedUser.some(function (o) { return o.code == u.code; });
        console.log(isContain, index);
        if (isContain == true) {
            this.sourceProducts[ind1].isHighlight = false;
            this.selectedUser.splice(index, 1);
        }
        else {
            this.sourceProducts[ind1].isHighlight = true;
            this.selectedUser.push(u);
        }
        // this.sourceProducts = temp;
        console.log('selected row is', u);
        console.log('selected user', this.selectedUser);
        // this.sourceProducts = [];
        // this.sourceProducts = temp;
        // this.sourceProducts.forEach( ( element, i ) => {
        //   console.log( 'i', i );
        //   console.log( 'this.highlightrow', this.HighlightRow );
        //   if ( i == this.HighlightRow ) {
        //     if ( isContain == true ) {
        //       element.isHighlight = false
        //     } else {
        //       if ( i == this.HighlightRow ) {
        //         element.isHighlight = true
        //       }
        //     }
        //   }
        // } );
    };
    AttributeSelectionComponent.prototype.RowSelectedtargetProducts = function (u, i) {
        var _this = this;
        if (u.disabled == true) {
        }
        else {
            this.HighlightRight = i;
            var temp = this.targetProducts;
            this.targetProducts = new Array();
            /// let index1 = temp.findIndex( o => o.code == u.code );
            var index = this.selectedUser2.findIndex(function (o) { return o.code == u.code; });
            var isContain_1 = this.selectedUser2.some(function (o) { return o.code == u.code; });
            console.log(isContain_1, index);
            if (isContain_1 == true) {
                this.selectedUser2.splice(index, 1);
                //  temp[index1].attributeNature = 'List';
            }
            else {
                //temp[index1].attributeNature = 'List123';
                this.selectedUser2.push(u);
            }
            //this.targetProducts.push(u);
            // declare variable in component.
            this.targetProducts = temp;
            this.targetProducts.forEach(function (element, i) {
                if (i == _this.HighlightRight) {
                    if (isContain_1 == true) {
                        element.isHighlightright = false;
                        element.isHighlight = false;
                    }
                    else {
                        //if(i == this.HighlightRow){
                        element.isHighlightright = true;
                        element.isHighlight = false;
                        //}
                    }
                }
            });
        }
    };
    AttributeSelectionComponent.prototype.lefttablePusg = function () {
        // const sss=this.newarray;
        // this.selectedUser.forEach(function(f){
        //  sss.push(f);
        // });
        var _this = this;
        this.selectedUser.forEach(function (element, index) {
            element.isHighlightright = false;
            _this.targetProducts.push(element);
        });
        // var v = this.selectedUser;
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
        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(function (o) { return o.disabled == true; });
    };
    AttributeSelectionComponent.prototype.righttablePusg = function (u) {
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
        var v = this.selectedUser;
        this.selectedUser2.forEach(function (element) {
            var index = _this.targetProducts.indexOf(element, index);
            // this.targetProducts[index].attributeNature = 'List';
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
        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every(function (o) { return o.disabled == true; });
    };
    AttributeSelectionComponent.prototype.resetAttributeSelection = function () {
        this.targetProducts = [];
        this.sourceProducts = [];
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.AttributeSelectionForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.AttributeSelectionForm.patchValue({
            attributeNature: ''
        });
        this.getAllAttributeCreation();
    };
    AttributeSelectionComponent.prototype.CancelAttributeCreation = function () {
        this.AttributeSelectionForm.enable();
        this.targetProducts = [];
        this.sourceProducts = [];
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.disabled = true;
        this.hidevalue = false;
        this.AttributeSelectionForm.reset();
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.sourceProducts = this.originalSourceProductList;
        this.AttributeSelectionForm.patchValue({
            attributeNature: ''
        });
        this.resetAttributeSelection();
    };
    AttributeSelectionComponent.prototype.onStatusChange = function (event) {
        var _this = this;
        console.log('evt', event.target.value);
        if (event.target.value == '') {
            this.selectedUser2 = [];
            this.selectedUser = [];
            this.sourceProducts = [];
            this.targetProducts = [];
            this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
                console.log('c', res.data.results);
                _this.originalSourceProductList = res.data.results;
                _this.sourceProducts = res.data.results;
            });
        }
        else {
            this.selectedUser2 = [];
            this.selectedUser = [];
            this.sourceProducts = [];
            this.targetProducts = [];
            this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
                console.log('c', res.data.results);
                _this.originalSourceProductList = res.data.results;
                _this.sourceProducts = res.data.results;
            }, function (err) {
            }, function () {
                _this.sourceProducts = _this.originalSourceProductList;
                _this.attributeSelectionService.GetAttributeOptionListByGroup(event.target.value).subscribe(function (res) {
                    console.log('GetAttributeOptionListByGroup res is', res);
                    _this.targetProducts = res.data.results[0].attributeMasters;
                    _this.targetProducts.forEach(function (element) {
                        element.disabled = true;
                        //  var index = this.targetProducts.indexOf( element )
                        _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                    });
                });
                //  this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
                //
                //     this.sourceProducts = res.data.results;
                //     });
                // this.targetProducts.forEach(element => {
                //   var index=this.targetProducts.indexOf(element)
                //   this.sourceProducts = this.sourceProducts.filter(e => e.code == element.code);
                // });
                _this.userHasSelectedMandatoryFieldOnly = _this.targetProducts.every(function (o) { return o.disabled == true; });
            });
        }
    };
    // Get Attribute Selection ById
    // GetAttributeSelectionByIdDisable( id ): void {
    //   this.disabled = false;
    //   this.viewupdateButton = false;
    //   this.viewCancelButton = true;
    //   this.attributeSelectionService.GetAttributeSelectionById( id )
    //     .subscribe( response => {
    //       this.targetProducts = response.data.results[0].attributeMasters;
    //       this.targetProducts.forEach( element => {
    //         var index = this.targetProducts.indexOf( element )
    //         this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
    //       } );
    //       //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
    //       this.AttributeSelectionForm.patchValue( { name: response.data.results[0].name } );
    //       this.AttributeSelectionForm.patchValue( { description: response.data.results[0].description } );
    //       this.AttributeSelectionForm.patchValue( { attributeNature: response.data.results[0].name } );
    //     } );
    //   this.AttributeSelectionForm.disable();
    // }
    AttributeSelectionComponent.prototype.GetAttributeSelectionByIdDisable = function (id) {
        var _this = this;
        this.disabled = false;
        this.viewupdateButton = false;
        this.viewCancelButton = true;
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.sourceProducts = [];
        this.targetProducts = [];
        this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
            console.log('c', res.data.results);
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        }, function (err) {
        }, function () {
            _this.sourceProducts = _this.originalSourceProductList;
            _this.attributeSelectionService.GetAttributeSelectionById(id)
                .subscribe(function (response) {
                _this.targetProducts = response.data.results[0].attributeMasters;
                _this.originalTargetList = response.data.results[0].attributeMasters;
                console.log('this.targetProducts', _this.targetProducts);
                _this.targetProducts.forEach(function (element) {
                    _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                });
                _this.AttributeSelectionForm.patchValue({ name: response.data.results[0].name });
                _this.AttributeSelectionForm.patchValue({ description: response.data.results[0].description });
                _this.AttributeSelectionForm.patchValue({ attributeNature: response.data.results[0].name });
            });
            _this.disabled = true;
            _this.viewupdateButton = true;
            _this.viewCancelButton = true;
            _this.attributeGroupId = id;
        });
        this.AttributeSelectionForm.disable();
    };
    // Get Attribute Selection ById
    AttributeSelectionComponent.prototype.GetAttributeSelectionById = function (id) {
        var _this = this;
        this.selectedUser2 = [];
        this.selectedUser = [];
        this.sourceProducts = [];
        this.targetProducts = [];
        this.attributeSelectionService.getAllAttributeCreation().subscribe(function (res) {
            console.log('c', res.data.results);
            _this.originalSourceProductList = res.data.results;
            _this.sourceProducts = res.data.results;
        }, function (err) {
        }, function () {
            _this.sourceProducts = _this.originalSourceProductList;
            _this.attributeSelectionService.GetAttributeSelectionById(id)
                .subscribe(function (response) {
                _this.targetProducts = response.data.results[0].attributeMasters;
                _this.originalTargetList = response.data.results[0].attributeMasters;
                console.log('this.targetProducts', _this.targetProducts);
                _this.targetProducts.forEach(function (element) {
                    _this.sourceProducts = _this.sourceProducts.filter(function (e) { return e.code !== element.code; });
                });
                _this.AttributeSelectionForm.patchValue({ name: response.data.results[0].name });
                _this.AttributeSelectionForm.patchValue({ description: response.data.results[0].description });
                _this.AttributeSelectionForm.patchValue({ attributeNature: response.data.results[0].name });
            });
            _this.disabled = true;
            _this.viewupdateButton = true;
            _this.viewCancelButton = true;
            _this.attributeGroupId = id;
        });
    };
    //Delete Attribute Selection by id
    AttributeSelectionComponent.prototype.DeleteAttributeSelection = function (id) {
        var _this = this;
        this.attributeSelectionService.DeleteAttributeSelection(id)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllAttributeSelection();
            _this.AttributeSelectionForm.reset();
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
        addAttributeCreation.name = this.AttributeSelectionForm.value.name;
        addAttributeCreation.description = this.AttributeSelectionForm.value.description;
        //  if ( addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0 ) {
        console.log(JSON.stringify(addAttributeCreation));
        this.attributeSelectionService.AddAttributeSelection(addAttributeCreation).subscribe(function (res) {
            addAttributeCreation.attributeMasterIdList = [];
            _this.targetProducts = [];
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            _this.getAllAttributeSelection();
            _this.hidevalue = false;
            _this.AttributeSelectionForm.reset();
        }, function (error) {
        });
        //     else {
        //   addAttributeCreation.removedAttributeGroupIdList = [];
        //   for ( let i = 0; i < this.originalSourceProductList.length; i++ ) {
        //     if ( addAttributeCreation.attributeMasterIdList.some( o => o.attributeMasterId == this.originalSourceProductList[i].attributeMasterId ) ) {
        //     } else {
        //       addAttributeCreation.removedAttributeGroupIdList.push( this.originalSourceProductList[i].attributeMasterId );
        //     }
        //   }
        //   console.log( JSON.stringify( addAttributeCreation.attributeGroupDefinitionId ) );
        //   console.log( JSON.stringify( addAttributeCreation ) );
        //   this.attributeSelectionService.UpdateAttributeGroup( addAttributeCreation.attributeGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {
        //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        //     this.getAllAttributeSelection();
        //     this.AttributeSelectionForm.reset();
        //   },
        //     ( error: any ) => {
        //       this.alertService.sweetalertError( error[error][status][message] );
        //     } );
        // }
    };
    AttributeSelectionComponent.prototype.UpdateAttributeSelection = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts.forEach(function (f) {
            addAttributeCreation.attributeMasterIdList.push(f.attributeMasterId);
        });
        addAttributeCreation.name = this.AttributeSelectionForm.value.name;
        addAttributeCreation.description = this.AttributeSelectionForm.value.description;
        console.log(JSON.stringify(this.attributeGroupId));
        console.log(JSON.stringify(addAttributeCreation));
        addAttributeCreation.removedAttributeGroupIdList = [];
        // for ( let i = 0; i < this.originalSourceProductList.length; i++ ) {
        //   if ( addAttributeCreation.attributeMasterIdList.some( o => o.attributeMasterId == this.originalSourceProductList[i].attributeMasterId ) ) {
        //     // addAttributeCreation.removedAttributeGroupIdList.push( this.originalSourceProductList[i].attributeMasterId );
        //   } else {
        //     console.log( 'line no 479 in else block' );
        //   }
        // }
        // for ( let i = 0; i < this.originalTargetList.length; i++ ) {
        //   addAttributeCreation.removedAttributeGroupIdList.push( this.originalTargetList[i].attributeMasterId );
        // }
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
                _this.AttributeSelectionForm.reset();
            }, function (error) {
                // this.alertService.sweetalertError( error[error][status][message] );
            });
        }
    };
    AttributeSelectionComponent.prototype.doubleClickOnLeftTable = function (u) {
        this.RowSelected(u, -1);
        this.lefttablePusg();
    };
    AttributeSelectionComponent.prototype.doubleClickOnRightTable = function (u) {
        this.RowSelectedtargetProducts(u, -1);
        this.righttablePusg(u);
    };
    AttributeSelectionComponent.prototype.keyPressedSpaceNotAllow = function (event) {
        var pattern = /[ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    __decorate([
        core_1.ViewChild('AttributeSelectionForm')
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
