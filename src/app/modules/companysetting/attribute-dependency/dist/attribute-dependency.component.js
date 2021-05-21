"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AttributeDependencyComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AttributeDependencyComponent = /** @class */ (function () {
    function AttributeDependencyComponent(formBuilder, alertService, companySettingService) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.companySettingService = companySettingService;
        this.treatmentList = ['Default', 'Hide'];
        this.summary = [];
        this.viewCancelButton = false;
        this.isEditMode = false;
        this.disabled = true;
        this.viewUpdateButton = false;
        this.headNatureList = [];
        this.attribute1List = [];
        this.attribute2List = [];
        this.attribute3List = [];
        this.FormulaArray = [];
        this.SDMArray = [];
        this.selectedBaseAttribute1Id = null;
        this.selectedBaseAttribute2Id = null;
        this.selectedBaseAttribute3Id = null;
        this.selectedBaseAttribute4Id = null;
        this.baseAttributeValue1List = [];
        this.baseAttributeValue2List = [];
        this.baseAttributeValue3List = [];
        this.dependentAttributeList = [];
        this.dependentAttributeValueList = [];
        this.editedRecordId = 0;
        this.allGlobalHeadList = [];
        this.AttributeSelectionList = [];
        this.selectedBaseAttribute1Name = null;
        this.selectedBaseAttribute2Name = null;
        this.selectedBaseAttribute3Name = null;
        this.attributeGroupDefinitionId = null;
    }
    AttributeDependencyComponent.prototype.ngOnInit = function () {
        this.getAllAttributeSelection();
        this.getHeadNatureList();
        this.getAllFormulaList();
        this.getAllSDMList();
        this.getAllHeadCreation();
        this.getSummary();
        this.AttDepForm = this.formBuilder.group({
            payrollHeadGroupAttributeDependencyId: new forms_1.FormControl(null),
            headNature: new forms_1.FormControl(null),
            attribute1: new forms_1.FormControl(null),
            value1: new forms_1.FormControl(null),
            attribute2: new forms_1.FormControl(null),
            value2: new forms_1.FormControl(null),
            attribute3: new forms_1.FormControl(null),
            value3: new forms_1.FormControl(null),
            derivedAttribute: new forms_1.FormControl(null, forms_1.Validators.required),
            derivedAttributeValue: new forms_1.FormControl(null),
            action: new forms_1.FormControl(null, forms_1.Validators.required),
            remark: new forms_1.FormControl(null),
            activeStatus: new forms_1.FormControl(null),
            attributeGroupDefinitionId: new forms_1.FormControl(null),
            attributeGroupId1: new forms_1.FormControl(null),
            attributeGroupId2: new forms_1.FormControl(null),
            attributeGroupId3: new forms_1.FormControl(null),
            attributeGroupId4: new forms_1.FormControl(null)
        });
        this.AttDepForm.get('remark').disable();
        this.AttDepForm.get('activeStatus').setValue(true);
        this.AttDepForm.get('activeStatus').disable();
    };
    // get All Head List
    AttributeDependencyComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.companySettingService.getAllHeadCreation().subscribe(function (res) {
            _this.allGlobalHeadList = res.data.results;
        });
    };
    AttributeDependencyComponent.prototype.getAllSDMList = function () {
        var _this = this;
        this.companySettingService.getSDMFormula().subscribe(function (res) {
            _this.SDMArray = res.data.results;
        });
    };
    AttributeDependencyComponent.prototype.getAllFormulaList = function () {
        var _this = this;
        this.companySettingService.getFromulaForFormulaMaster().subscribe(function (res) {
            _this.FormulaArray = res.data.results;
            _this.Formula = res.data.results[0].originalFormula;
        });
    };
    AttributeDependencyComponent.prototype.getHeadNatureList = function () {
        var _this = this;
        this.headNatureList = [];
        this.companySettingService.getHeadNatureByNatureGroup().subscribe(function (res) {
            _this.headNatureList = res.data.results;
        });
    };
    AttributeDependencyComponent.prototype.getSummary = function () {
        var _this = this;
        this.summary = [];
        this.companySettingService.getAllActiveAndNonActiveAttributeDependency().subscribe(function (res) {
            _this.summary = res.data.results;
        });
    };
    AttributeDependencyComponent.prototype.getAllAttributeSelection = function () {
        var _this = this;
        this.companySettingService.getAllGlobalAttributeMasterByGlobal().subscribe(function (res) {
            console.log('res check11 ', res);
            _this.AttributeSelectionList = res.data.results;
        });
    };
    AttributeDependencyComponent.prototype.addAttributeDependency = function () {
        var _this = this;
        var data = this.AttDepForm.getRawValue();
        console.log(JSON.stringify(data));
        if (this.isEditMode == false) {
            data.attributeGroupDefinitionId = this.attributeGroupDefinitionId;
            this.companySettingService.addPHGAttributeDependency(data).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getSummary();
                _this.CancelHeadCreation();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            data.payrollHeadGroupAttributeDependencyId = this.editedRecordId;
            this.companySettingService.updateAttributeDependncyById(data).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getSummary();
                _this.CancelHeadCreation();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    AttributeDependencyComponent.prototype.CancelHeadCreation = function () {
        this.isEditMode = false;
        this.editedRecordId = 0;
        this.viewUpdateButton = false;
        this.viewCancelButton = false;
        this.AttDepForm.enable();
        this.AttDepForm.reset();
        this.AttDepForm.patchValue({
            headNature: null,
            attribute1: null,
            value1: null,
            attribute2: null,
            value2: null,
            attribute3: null,
            value3: null,
            derivedAttribute: null,
            derivedAttributeValue: null,
            action: null,
            remark: null,
            activeStatus: null,
            attributeGroupDefinitionId: null,
            attributeGroupId1: null,
            attributeGroupId2: null,
            attributeGroupId3: null,
            attributeGroupId4: null
        });
        this.AttDepForm.get('remark').disable();
        this.AttDepForm.get('activeStatus').setValue(true);
        this.AttDepForm.get('activeStatus').disable();
    };
    AttributeDependencyComponent.prototype.ResetHeadCreation = function () {
        this.isEditMode = false;
        this.viewUpdateButton = false;
        this.editedRecordId = 0;
        this.viewCancelButton = false;
        this.AttDepForm.enable();
        this.AttDepForm.reset();
        this.AttDepForm.patchValue({
            headNature: null,
            attribute1: null,
            value1: null,
            attribute2: null,
            value2: null,
            attribute3: null,
            value3: null,
            derivedAttribute: null,
            derivedAttributeValue: null,
            action: null,
            remark: null,
            activeStatus: null,
            attributeGroupDefinitionId: null,
            attributeGroupId1: null,
            attributeGroupId2: null,
            attributeGroupId3: null,
            attributeGroupId4: null
        });
        this.AttDepForm.get('remark').disable();
        this.AttDepForm.get('activeStatus').setValue(true);
        this.AttDepForm.get('activeStatus').disable();
    };
    AttributeDependencyComponent.prototype.onChangeEvent = function (event) {
        this.AttDepForm.patchValue({ shortName: event.target.value });
    };
    AttributeDependencyComponent.prototype.onChangeHeadNature = function (evt, value) { };
    AttributeDependencyComponent.prototype.onChangeBaseAttribute1 = function (evt, code) {
        var _this = this;
        if (code == 'null') {
            this.baseAttributeValue1List = [];
        }
        else {
            var findIndex = this.attribute1List.findIndex(function (o) { return o.attributeMasters.code == code; });
            this.AttDepForm.get('attributeGroupId1').setValue(this.attribute1List[findIndex].id);
            // this.AttDepForm.set( 'attribute1' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );
            this.selectedBaseAttribute1Id = this.attribute1List[findIndex].id;
            //this.selectedBaseAttribute1Id = this.attribute1List[findIndex].id;
            // this.selectedBaseAttribute1Name = evt.target.options[evt.target.options.selectedIndex].text;
            if (this.editedRecordId > 0) {
                this.AttDepForm.get('value1').enable();
                this.AttDepForm.get('attribute2').enable();
                this.AttDepForm.get('value2').enable();
                this.AttDepForm.get('attribute3').enable();
                this.AttDepForm.get('value3').enable();
                this.AttDepForm.get('derivedAttribute').enable();
                this.AttDepForm.get('derivedAttributeValue').enable();
            }
            this.attribute2List = [];
            this.attribute3List = [];
            this.dependentAttributeList = [];
            this.baseAttributeValue1List = [];
            this.companySettingService.getGlobalAttribute2New(this.attributeGroupDefinitionId, this.selectedBaseAttribute1Id).subscribe(function (res) {
                _this.attribute2List = res.data.results;
                // for ( let i = 0; i < res.data.results.length; i++ ) {
                //   if ( res.data.results[i].attributeMasters.attributeNature == 'List' ) {
                //     this.dependentAttributeList.push( res.data.results[i] );
                //   }
                // }
                _this.dependentAttributeList = res.data.results;
            });
            console.log(this.attribute1List);
            if (this.attribute1List[findIndex].attributeMasters.attributeNature == 'Formula') {
                for (var i = 0; i < this.FormulaArray.length; i++) {
                    this.baseAttributeValue1List.push(this.FormulaArray[i].formulaName);
                }
            }
            if (this.attribute1List[findIndex].attributeMasters.attributeNature == 'List') {
                for (var i = 0; i < this.attribute1List[findIndex].attributeMasters.options.length; i++) {
                    this.baseAttributeValue1List.push(this.attribute1List[findIndex].attributeMasters.options[i].attributeOptionValue);
                }
            }
            if (this.attribute1List[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix') {
                for (var i = 0; i < this.SDMArray.length; i++) {
                    this.baseAttributeValue1List.push(this.SDMArray[i].sdmSchemaName);
                }
            }
            if (this.attribute1List[findIndex].attributeMasters.attributeNature == 'Head') {
                for (var i = 0; i < this.allGlobalHeadList.length; i++) {
                    this.baseAttributeValue1List.push(this.allGlobalHeadList[i].standardName);
                }
            }
            this.resetValueWhenBaseAttribute1Changed();
        }
    };
    AttributeDependencyComponent.prototype.onChangeBaseAttribute2 = function (evt, code) {
        var _this = this;
        if (code == 'null') {
            this.baseAttributeValue2List = [];
        }
        else {
            var findIndex = this.attribute2List.findIndex(function (o) { return o.attributeMasters.code == code; });
            this.selectedBaseAttribute2Id = this.attribute2List[findIndex].id;
            this.AttDepForm.get('attributeGroupId2').setValue(this.attribute1List[findIndex].id);
            // this.AttDepForm.get( 'attribute2' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );
            // event.target.options[event.target.options.selectedIndex].text;
            console.log(findIndex);
            this.baseAttributeValue2List = [];
            this.companySettingService.getGlobalAttribut33New(this.attributeGroupDefinitionId, this.selectedBaseAttribute1Id, this.selectedBaseAttribute2Id).subscribe(function (res) {
                _this.attribute3List = res.data.results;
                // for ( let i = 0; i < res.data.results.length; i++ ) {
                //   if ( res.data.results[i].attributeMasters.attributeNature == 'List' ) {
                //     this.dependentAttributeList.push( res.data.results[i] );
                //   }
                // }
                _this.dependentAttributeList = res.data.results;
                console.log('att3list', _this.attribute3List);
            });
            if (this.attribute2List[findIndex].attributeMasters.attributeNature == 'Formula') {
                for (var i = 0; i < this.FormulaArray.length; i++) {
                    this.baseAttributeValue2List.push(this.FormulaArray[i].formulaName);
                }
            }
            if (this.attribute2List[findIndex].attributeMasters.attributeNature == 'List') {
                for (var i = 0; i < this.attribute2List[findIndex].attributeMasters.options.length; i++) {
                    this.baseAttributeValue2List.push(this.attribute2List[findIndex].attributeMasters.options[i].attributeOptionValue);
                }
            }
            if (this.attribute2List[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix') {
                for (var i = 0; i < this.SDMArray.length; i++) {
                    this.baseAttributeValue2List.push(this.SDMArray[i].sdmSchemaName);
                }
            }
            if (this.attribute2List[findIndex].attributeMasters.attributeNature == 'Head') {
                for (var i = 0; i < this.allGlobalHeadList.length; i++) {
                    this.baseAttributeValue2List.push(this.allGlobalHeadList[i].standardName);
                }
            }
            this.resetValueWhenBaseAttribute2Changed();
        }
    };
    AttributeDependencyComponent.prototype.onChangeBaseAttribute3 = function (evt, code) {
        var _this = this;
        if (code == 'null') {
            this.dependentAttributeValueList = [];
        }
        else {
            var findIndex = this.attribute3List.findIndex(function (o) { return o.attributeMasters.code == code; });
            this.selectedBaseAttribute3Id = this.attribute3List[findIndex].id;
            this.AttDepForm.get('attributeGroupId3').setValue(this.selectedBaseAttribute3Id);
            // this.AttDepForm.get( 'attribute3' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );
            this.baseAttributeValue3List = [];
            if (this.attribute3List[findIndex].attributeMasters.attributeNature == 'Formula') {
                for (var i = 0; i < this.FormulaArray.length; i++) {
                    this.baseAttributeValue3List.push(this.FormulaArray[i].formulaName);
                }
            }
            if (this.attribute3List[findIndex].attributeMasters.attributeNature == 'List') {
                for (var i = 0; i < this.attribute3List[findIndex].attributeMasters.options.length; i++) {
                    this.baseAttributeValue3List.push(this.attribute3List[findIndex].attributeMasters.options[i].attributeOptionValue);
                }
            }
            if (this.attribute3List[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix') {
                for (var i = 0; i < this.SDMArray.length; i++) {
                    this.baseAttributeValue3List.push(this.SDMArray[i].sdmSchemaName);
                }
            }
            if (this.attribute3List[findIndex].attributeMasters.attributeNature == 'Head') {
                for (var i = 0; i < this.allGlobalHeadList.length; i++) {
                    this.baseAttributeValue3List.push(this.allGlobalHeadList[i].standardName);
                }
            }
            this.companySettingService.getDerivedAttribute4(this.attributeGroupDefinitionId, this.selectedBaseAttribute1Id, this.selectedBaseAttribute2Id, this.selectedBaseAttribute3Id).subscribe(function (res) {
                // this.baseAttributeValue1List = res.data.results;
                // for ( let i = 0; i < res.data.results.length; i++ ) {
                //   if ( res.data.results[i].attributeMasters.attributeNature == 'List' ) {
                //     this.dependentAttributeList.push( res.data.results[i] );
                //   }
                // }
                _this.dependentAttributeList = res.data.results;
            });
            this.resetValueWhenBaseAttribute3Changed();
        }
    };
    AttributeDependencyComponent.prototype.onChangeDependentAttribute = function (evt, code) {
        if (code == 'null') {
            this.baseAttributeValue1List = [];
        }
        else {
            var findIndex = this.dependentAttributeList.findIndex(function (o) { return o.attributeMasters.code == code; });
            this.selectedBaseAttribute4Id = this.dependentAttributeList[findIndex].id;
            this.AttDepForm.get('attributeGroupId4').setValue(this.selectedBaseAttribute4Id);
            //  this.AttDepForm.get( 'derivedAttribute' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );
            if (evt == null) {
                this.treatmentList = [];
                this.treatmentList = ['Hide'];
            }
            else {
                this.treatmentList = [];
                this.treatmentList = ['Default', 'Hide'];
            }
            this.dependentAttributeValueList = [];
            if (this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'Formula') {
                for (var i = 0; i < this.FormulaArray.length; i++) {
                    this.dependentAttributeValueList.push(this.FormulaArray[i].formulaName);
                }
            }
            if (this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'List') {
                for (var i = 0; i < this.dependentAttributeList[findIndex].attributeMasters.options.length; i++) {
                    this.dependentAttributeValueList.push(this.dependentAttributeList[findIndex].attributeMasters.options[i].attributeOptionValue);
                }
            }
            if (this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix') {
                for (var i = 0; i < this.SDMArray.length; i++) {
                    this.dependentAttributeValueList.push(this.SDMArray[i].sdmSchemaName);
                }
            }
            if (this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'Head') {
                for (var i = 0; i < this.allGlobalHeadList.length; i++) {
                    this.dependentAttributeValueList.push(this.allGlobalHeadList[i].standardName);
                }
            }
        }
    };
    AttributeDependencyComponent.prototype.onChangeBaseAttributeValue1 = function (evt, id) { };
    AttributeDependencyComponent.prototype.onChangeBaseAttributeValue2 = function (evt, id) { };
    AttributeDependencyComponent.prototype.onChangeBaseAttributeValue3 = function (evt, id) { };
    AttributeDependencyComponent.prototype.onChangeDerivedAttributeValue = function (evt) { };
    AttributeDependencyComponent.prototype.onChangeTreatment = function (event, id) {
        // for getting id and itemdName object from dropdown
        // let s = event.target.options[event.target.options.selectedIndex].text;
        // console.log( s, id );
    };
    AttributeDependencyComponent.prototype.deactiveActiveCheckBox = function () {
        if (this.AttDepForm.get('activeStatus').value === false) {
            this.AttDepForm.get('remark').enable();
            this.AttDepForm.get('remark').setValidators([forms_1.Validators.required]);
            this.AttDepForm.get('remark').updateValueAndValidity();
        }
        else {
            this.AttDepForm.get('remark').clearValidators();
            this.AttDepForm.get('remark').updateValueAndValidity();
            this.AttDepForm.get('remark').disable();
        }
    };
    AttributeDependencyComponent.prototype.edit = function (payrollHeadGroupAttributeDependencyId, i) {
        this.forEditGetAllAttributeGroupList(this.summary[i].attributeGroupDefinitionId);
        this.isEditMode = true;
        this.viewCancelButton = true;
        this.viewUpdateButton = true;
        this.editedRecordId = payrollHeadGroupAttributeDependencyId;
        window.scrollTo(0, 0);
        this.AttDepForm.reset();
        this.attribute2List = this.attribute1List;
        this.attribute3List = this.attribute1List;
        this.dependentAttributeList = this.attribute1List;
        this.baseAttributeValue1List.push(this.summary[i].value1);
        this.baseAttributeValue2List.push(this.summary[i].value2);
        this.baseAttributeValue3List.push(this.summary[i].value3);
        this.dependentAttributeValueList.push(this.summary[i].derivedAttributeValue);
        console.log('summary', this.summary[i]);
        this.AttDepForm.patchValue(this.summary[i]);
        this.AttDepForm.get('value1').disable();
        this.AttDepForm.get('attribute2').disable();
        this.AttDepForm.get('value2').disable();
        this.AttDepForm.get('attribute3').disable();
        this.AttDepForm.get('value3').disable();
        this.AttDepForm.get('derivedAttribute').disable();
        this.AttDepForm.get('derivedAttributeValue').disable();
        this.AttDepForm.get('activeStatus').enable();
    };
    AttributeDependencyComponent.prototype.view = function (payrollHeadGroupAttributeDependencyId, i) {
        this.viewCancelButton = true;
        this.isEditMode = false;
        window.scrollTo(0, 0);
        this.AttDepForm.reset();
        this.attribute2List = this.attribute1List;
        this.attribute3List = this.attribute1List;
        this.dependentAttributeList = this.attribute1List;
        this.baseAttributeValue1List.push(this.summary[i].value1);
        this.baseAttributeValue2List.push(this.summary[i].value2);
        this.baseAttributeValue3List.push(this.summary[i].value3);
        this.dependentAttributeValueList.push(this.summary[i].derivedAttributeValue);
        this.AttDepForm.patchValue(this.summary[i]);
        this.AttDepForm.disable();
    };
    AttributeDependencyComponent.prototype.resetValueWhenAttributeGroupChanged = function () {
        this.AttDepForm.patchValue({
            attribute1: null,
            value1: null,
            attribute2: null,
            value2: null,
            attribute3: null,
            value3: null,
            derivedAttribute: null,
            derivedAttributeValue: null
        });
    };
    AttributeDependencyComponent.prototype.resetValueWhenBaseAttribute1Changed = function () {
        this.AttDepForm.patchValue({
            value1: null,
            attribute2: null,
            value2: null,
            attribute3: null,
            value3: null,
            derivedAttribute: null,
            derivedAttributeaction: null
        });
    };
    AttributeDependencyComponent.prototype.resetValueWhenBaseAttribute2Changed = function () {
        this.AttDepForm.patchValue({
            value2: null,
            attribute3: null,
            value3: null,
            derivedAttribute: null,
            derivedAttributeValue: null
        });
    };
    AttributeDependencyComponent.prototype.resetValueWhenBaseAttribute3Changed = function () {
        this.AttDepForm.patchValue({
            value3: null,
            derivedAttribute: null,
            derivedAttributeValue: null
        });
    };
    AttributeDependencyComponent.prototype.onChangeAttributeGroup = function (evt, id) {
        this.attributeGroupDefinitionId = id;
        console.log(evt.target.value);
        this.getAllAttributeGroupList(id);
    };
    AttributeDependencyComponent.prototype.getAllAttributeGroupList = function (id) {
        var _this = this;
        this.companySettingService.getAttributeGroupByGroupDefId(id).subscribe(function (res) {
            _this.attribute1List = res.data.results;
            // for ( let i = 0; i < res.data.results.length; i++ ) {
            //   if ( res.data.results[i].attributeMasters.attributeNature == 'List' ) {
            //     this.dependentAttributeList.push( res.data.results[i] );
            //   }
            // }
            _this.dependentAttributeList = res.data.results;
        });
    };
    AttributeDependencyComponent.prototype.forEditGetAllAttributeGroupList = function (id) {
        var _this = this;
        this.companySettingService.getAttributeGroupByGroupDefId(id).subscribe(function (res) {
            _this.attribute1List = res.data.results;
            _this.attribute2List = res.data.results;
            _this.attribute3List = res.data.results;
            // for ( let i = 0; i < res.data.results.length; i++ ) {
            //   if ( res.data.results[i].attributeMasters.attributeNature == 'List' ) {
            //     this.dependentAttributeList.push( res.data.results[i] );
            //   }
            // }
            _this.dependentAttributeList = res.data.results;
        });
    };
    AttributeDependencyComponent = __decorate([
        core_1.Component({
            selector: 'app-attribute-dependency',
            templateUrl: './attribute-dependency.component.html',
            styleUrls: ['./attribute-dependency.component.scss']
        })
    ], AttributeDependencyComponent);
    return AttributeDependencyComponent;
}());
exports.AttributeDependencyComponent = AttributeDependencyComponent;
