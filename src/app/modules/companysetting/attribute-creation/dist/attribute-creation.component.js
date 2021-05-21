"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AttributeCreationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AttributeCreationComponent = /** @class */ (function () {
    function AttributeCreationComponent(formBuilder, attributeCreationService, alertService, modalService, document) {
        this.formBuilder = formBuilder;
        this.attributeCreationService = attributeCreationService;
        this.alertService = alertService;
        this.modalService = modalService;
        this.document = document;
        // sort alphabetically
        this.totalRecords = 0;
        this.NatureList = [
            { label: 'Formula', value: 'Formula' },
            { label: 'Head', value: 'Head' },
            { label: 'List', value: 'List' },
            { label: 'Per Employee Input', value: 'Per Employee Input' },
            { label: 'Range Value Per Instance', value: 'Range Value Per Instance' },
            { label: 'Range Value Per Period', value: 'Range Value Per Period' },
            { label: 'Range Value No Of Instances Per Period', value: 'Range Value No Of Instances Per Period' },
            { label: 'Source Destination Matrix', value: 'Source Destination Matrix' },
            { label: 'Stored Procedure', value: 'Stored Procedure' },
            { label: 'Work Flow', value: 'Work Flow' },
        ];
        this.attributeMasterId = 0;
        this.isEditMode = false;
        this.optionId = 0;
        this.validOptionList = false;
        this.AttributeCreationList = [];
        this.attributeCreationSummaryList = [];
        this.summaryHtmlDataList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.viewUpdateButton = false;
        this.hidevalue = false;
        this.isView = true;
        this.optionList = [];
    }
    AttributeCreationComponent.prototype.ngOnInit = function () {
        this.AttributeCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            code: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('', forms_1.Validators.required),
            pfFormArray: new forms_1.FormArray([])
        });
        this.getAllAttributeCreation();
    };
    // get All AttributeCreation
    AttributeCreationComponent.prototype.getAllAttributeCreation = function () {
        var _this = this;
        this.attributeCreationSummaryList = [];
        this.AttributeCreationList = [];
        this.attributeCreationService.getAllGlobalAttributeCreation().subscribe(function (res) {
            _this.AttributeCreationList = res.data.results;
            res.data.results.forEach(function (element) {
                var value = '';
                for (var i = 0; i < element.options.length; i++) {
                    if (i == 0) {
                        value = element.options[i].attributeOptionValue;
                    }
                    else {
                        value = value + ', ' + element.options[i].attributeOptionValue;
                    }
                }
                var label = '';
                if (element.attributeNature !== null) {
                    var ind = _this.NatureList.findIndex(function (o) { return o.value == element.attributeNature.trim(); });
                    if (ind != -1) {
                        label = _this.NatureList[ind].label;
                    }
                    else {
                        label = '';
                    }
                }
                var obj = {
                    attributeMasterId: element.attributeMasterId,
                    code: element.code,
                    attributeNatureLongForm: label,
                    attributeNature: element.attributeNature,
                    numberOfOption: element.numberOfOption,
                    description: element.description,
                    optionValue: value
                };
                _this.attributeCreationSummaryList.push(obj);
            });
        });
        this.totalRecords = this.attributeCreationSummaryList.length;
    };
    AttributeCreationComponent.prototype.editAttributeCreation = function (attributeMasterId) {
        this.AttributeCreationForm.setControl('pfFormArray', new forms_1.FormArray([]));
        this.isView = true;
        this.viewCancelButton = true;
        this.disabled = false;
        this.viewUpdateButton = true;
        this.hidevalue = true;
        this.attributeMasterId = attributeMasterId;
        var index = this.attributeCreationSummaryList.findIndex(function (o) { return o.attributeMasterId == attributeMasterId; });
        this.AttributeCreationForm.patchValue({ code: this.attributeCreationSummaryList[index].code });
        this.AttributeCreationForm.patchValue({ description: this.attributeCreationSummaryList[index].description });
        this.AttributeCreationForm.patchValue({ attributeNature: this.attributeCreationSummaryList[index].attributeNatureLongForm });
        if (this.attributeCreationSummaryList[index].optionValue.length > 0) {
            var split = this.attributeCreationSummaryList[index].optionValue.split(',');
            console.log(split);
            for (var i = 0; i < split.length; i++) {
                this.addRowWithData(split[i]);
            }
        }
        this.AttributeCreationForm.get('attributeNature').disable();
        //this.AttributeCreationForm.get( 'optionList' ).enable();
    };
    // Get Attribute Creation ById
    AttributeCreationComponent.prototype.GetAttributeCreationByIdDisable = function (id) {
        this.AttributeCreationForm.setControl('pfFormArray', new forms_1.FormArray([]));
        this.disabled = false;
        this.viewCancelButton = true;
        this.hidevalue = false;
        var index = this.attributeCreationSummaryList.findIndex(function (o) { return o.attributeMasterId == id; });
        this.AttributeCreationForm.patchValue({ code: this.attributeCreationSummaryList[index].code });
        this.AttributeCreationForm.patchValue({ description: this.attributeCreationSummaryList[index].description });
        this.AttributeCreationForm.patchValue({ attributeNature: this.attributeCreationSummaryList[index].attributeNatureLongForm });
        if (this.attributeCreationSummaryList[index].attributeNatureLongForm == 'List') {
            this.hidevalue = true;
            this.isView = false;
        }
        if (this.attributeCreationSummaryList[index].optionValue.length > 0) {
            var split = this.attributeCreationSummaryList[index].optionValue.split(',');
            console.log(split);
            for (var i = 0; i < split.length; i++) {
                this.addRowWithData(split[i]);
            }
        }
        this.AttributeCreationForm.disable();
    };
    AttributeCreationComponent.prototype.onStatusChange = function (event) {
        if (event.target.value == 'List') {
            this.addRow(0);
            this.hidevalue = true;
            this.isView = true;
            // console.log( 'length is ', this.summaryHtmlDataList );
            // if ( this.summaryHtmlDataList.length === 0 ) {
            //   this.validOptionList = true;
            //   this.addOptionList( '' );
            // } else {
            //   this.validOptionList = false;
            // }
        }
        else {
            this.AttributeCreationForm.setControl('pfFormArray', new forms_1.FormArray([]));
            this.isView = false;
            //  this.validOptionList = false;
            this.summaryHtmlDataList = [];
            this.hidevalue = false;
        }
    };
    AttributeCreationComponent.prototype.addOptionList = function (evt) {
        var _this = this;
        if (this.isEditMode) {
            var isContain = this.summaryHtmlDataList.some(function (_a) {
                var name = _a.name;
                return name === evt;
            });
            console.log('isContain ', isContain);
            if (isContain == true) {
                this.alertService.sweetalertWarning('Value already present in Summary table.');
            }
            else {
                var index = this.summaryHtmlDataList.findIndex(function (o) { return o.id == _this.optionId; });
                this.summaryHtmlDataList[index].name = evt;
            }
        }
        else {
            console.log(evt);
            // if ( evt.length > 0 ) {
            //   let isContain = this.summaryHtmlDataList.some( ( { name } ) => name === evt );
            //   console.log( 'isContain ', isContain );
            //   let id = 0;
            //   if ( this.summaryHtmlDataList.length !== 0 ) {
            //     id = this.summaryHtmlDataList[this.summaryHtmlDataList.length - 1].id;
            //     this.validOptionList = false;
            //   } else {
            //     id = 0;
            //     this.validOptionList = true;
            //   }
            //   if ( isContain == true ) {
            //     this.alertService.sweetalertWarning( 'Value already present in Summary table.' );
            //   } else {
            //     this.summaryHtmlDataList.push( { name: evt, id: id + 1 } );
            //   }
            //   this.validOptionList = false;
            // }
        }
        // this.AttributeCreationForm.get( 'optionList' ).setValue( '' );
        this.isEditMode = false;
    };
    //add new AttributeCreation
    AttributeCreationComponent.prototype.addAttributeCreation = function () {
        var _this = this;
        if (this.viewUpdateButton == true) {
            var array_1 = [];
            console.log('add update logic here');
            var addAttributeCreation = Object.assign({});
            addAttributeCreation.options = [];
            addAttributeCreation.attributeNature = 'List';
            addAttributeCreation.attributeMasterId = this.attributeMasterId;
            addAttributeCreation.code = this.AttributeCreationForm.value.code;
            addAttributeCreation.description = this.AttributeCreationForm.value.description;
            // for ( let i = 0; i < this.summaryHtmlDataList.length; i++ ) {
            //   array.push( this.summaryHtmlDataList[i].name );
            // }
            this.f.pfFormArray.value.forEach(function (element) {
                array_1.push(element.optionList);
            });
            addAttributeCreation.options = array_1;
            addAttributeCreation.numberOfOption = array_1.length.toString();
            console.log(JSON.stringify(addAttributeCreation));
            this.attributeCreationService.UpdateAttributeCreation(addAttributeCreation).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllAttributeCreation();
                _this.hidevalue = true;
                _this.summaryHtmlDataList = [];
                _this.CancelAttributeCreation();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            var array_2 = [];
            this.f.pfFormArray.value.forEach(function (element) {
                array_2.push(element.optionList);
            });
            var addAttributeCreation = Object.assign({});
            delete addAttributeCreation.attributeMasterId;
            addAttributeCreation.options = [];
            addAttributeCreation.numberOfOption = array_2.length.toString();
            addAttributeCreation.code = this.AttributeCreationForm.value.code;
            addAttributeCreation.description = this.AttributeCreationForm.value.description;
            addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;
            // for ( let i = 0; i < this.summaryHtmlDataList.length; i++ ) {
            //   array.push( this.summaryHtmlDataList[i].name );
            // }
            addAttributeCreation.options = array_2;
            console.log(JSON.stringify(addAttributeCreation));
            this.attributeCreationService.AddAttributeCreation(addAttributeCreation).subscribe(function (res) {
                // addAttributeCreation.options = [];
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllAttributeCreation();
                _this.hidevalue = true;
                _this.summaryHtmlDataList = [];
                _this.CancelAttributeCreation();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    AttributeCreationComponent.prototype.CancelAttributeCreation = function () {
        this.AttributeCreationForm.setControl('pfFormArray', new forms_1.FormArray([]));
        this.isView = false;
        this.viewUpdateButton = false;
        this.AttributeCreationForm.enable();
        this.summaryHtmlDataList = [];
        this.disabled = true;
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.viewUpdateButton = false;
        this.AttributeCreationForm.patchValue({
            attributeNature: ''
        });
    };
    AttributeCreationComponent.prototype.ResetAttributeCreation = function () {
        this.AttributeCreationForm.setControl('pfFormArray', new forms_1.FormArray([]));
        this.isView = false;
        this.viewUpdateButton = false;
        this.AttributeCreationForm.enable();
        this.summaryHtmlDataList = [];
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.AttributeCreationForm.get('code').enable();
        this.AttributeCreationForm.get('description').enable();
        this.AttributeCreationForm.patchValue({
            attributeNature: ''
        });
    };
    AttributeCreationComponent.prototype.clickedOnYesDeleteRow = function () {
        console.log('in del Name', this.optionId);
        this.deleteRow(this.optionId);
        // let index = this.summaryHtmlDataList.findIndex( o => o.id == this.optionId );
        // this.summaryHtmlDataList.splice( index, 1 );
        // if ( this.summaryHtmlDataList.length == 0 ) {
        //   this.validOptionList = true;
        // }
    };
    AttributeCreationComponent.prototype.deleteRowByIndex = function (id) {
        this.optionId = id;
        //this.deleteRow( id );
        //  this.summaryHtmlDataList.splice( id, 1 );
    };
    AttributeCreationComponent.prototype.editNameMaster = function (id, name) {
        this.isEditMode = true;
        this.optionId = id;
        this.AttributeCreationForm.patchValue({
            optionList: name
        });
    };
    AttributeCreationComponent.prototype.UploadModal1 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    Object.defineProperty(AttributeCreationComponent.prototype, "pfArray", {
        get: function () { return this.f.pfFormArray; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AttributeCreationComponent.prototype, "f", {
        get: function () { return this.AttributeCreationForm.controls; },
        enumerable: false,
        configurable: true
    });
    AttributeCreationComponent.prototype.deleteRow = function (j) {
        console.log(j);
        //this.lictransactionList.splice(j,1);
        this.pfArray.removeAt(j);
    };
    AttributeCreationComponent.prototype.addRow = function (i) {
        // this.pfArray.push( this.formBuilder.group( {
        //   optionList: ['', Validators.required],
        // } ) );
        //if ( i !== 0 ) {
        //  console.log( 'i!==0' )
        var setsFormArray = this.AttributeCreationForm.get('pfFormArray');
        this.pfArray.insert(0, this.formBuilder.group({
            optionList: ['', forms_1.Validators.required]
        }));
        // }
        // else {
        //   console.log( 'in else' );
        //   this.pfArray.push( this.formBuilder.group( {
        //     optionList: ['', Validators.required],
        //   } ) );
        // }
    };
    AttributeCreationComponent.prototype.addRowWithData = function (optionList) {
        this.pfArray.push(this.formBuilder.group({
            optionList: [optionList, forms_1.Validators.required]
        }));
    };
    AttributeCreationComponent.prototype.get = function () {
        for (var b = 0; b < 10; b++) {
            //  this.notworkingArr[b] = "test" + b;
            console.log("in get");
        }
    };
    AttributeCreationComponent.prototype.updateCurrentPage = function (currentPage) {
        var _this = this;
        setTimeout(function () { return _this.paginator.changePage(currentPage); });
    };
    AttributeCreationComponent.prototype.paginate = function (evt) {
        console.log(evt);
    };
    __decorate([
        core_1.ViewChild('paginator', { static: true })
    ], AttributeCreationComponent.prototype, "paginator");
    AttributeCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-attribute-creation',
            templateUrl: './attribute-creation.component.html',
            styleUrls: ['./attribute-creation.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(4, core_1.Inject(common_1.DOCUMENT))
    ], AttributeCreationComponent);
    return AttributeCreationComponent;
}());
exports.AttributeCreationComponent = AttributeCreationComponent;
