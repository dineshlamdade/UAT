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
        this.NatureList = [
            { label: 'List', value: 'L' },
            { label: 'Formula', value: 'F' },
            { label: 'Stored Procedure', value: 'SP' },
            { label: 'Source Destination Matrix', value: 'SDM' },
            { label: 'Per Employee Input', value: 'PEI' },
            { label: 'Work Flow', value: 'WF' },
            { label: 'Garnishment', value: 'G' },
            { label: 'Range Value / Instance', value: 'Range Value Per Instance' },
            { label: 'Range Value / Period', value: 'Range Value Per Period' },
            { label: 'Range Instances / Period', value: 'Range Of No Of Instances Per Period' },
        ];
        this.isEditMode = false;
        this.optionId = 0;
        this.validOptionList = false;
        this.AttributeCreationList = [];
        this.attributeCreationSummaryList = [];
        this.summaryHtmlDataList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.summons = [];
        this.optionList = [];
    }
    AttributeCreationComponent.prototype.ngOnInit = function () {
        this.AttributeCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            code: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('', forms_1.Validators.required),
            optionList: new forms_1.FormControl('')
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
                for (var i = 0; i < element.optionList.length; i++) {
                    if (i == 0) {
                        value = element.optionList[i].optionValue;
                    }
                    else {
                        value = value + ', ' + element.optionList[i].optionValue;
                    }
                }
                console.log('value ', value);
                var label = '';
                var ind = _this.NatureList.findIndex(function (o) { return o.value == element.attributeNature.trim(); });
                if (ind != -1) {
                    label = _this.NatureList[ind].label;
                }
                else {
                    label = '';
                }
                var obj = {
                    globalAttributeMasterId: element.globalAttributeMasterId,
                    code: element.code,
                    attributeNatureLongForm: label,
                    attributeNature: element.attributeNature.trim(),
                    numberOfOption: element.numberOfOption,
                    description: element.description,
                    optionValue: value
                };
                _this.attributeCreationSummaryList.push(obj);
            });
        });
    };
    // Get Attribute Creation ById
    AttributeCreationComponent.prototype.GetAttributeCreationByIdDisable = function (id) {
        this.disabled = false;
        this.viewCancelButton = true;
        this.hidevalue = false;
        var index = this.attributeCreationSummaryList.findIndex(function (o) { return o.globalAttributeMasterId == id; });
        this.AttributeCreationForm.patchValue({ code: this.attributeCreationSummaryList[index].code });
        this.AttributeCreationForm.patchValue({ description: this.attributeCreationSummaryList[index].description });
        this.AttributeCreationForm.patchValue({ attributeNature: this.attributeCreationSummaryList[index].attributeNature });
        if (this.attributeCreationSummaryList[index].optionValue.length > 0) {
            var split = this.attributeCreationSummaryList[index].optionValue.split(',');
            this.summaryHtmlDataList = [];
            this.hidevalue = false;
            console.log(split);
            for (var i = 0; i < split.length; i++) {
                this.summaryHtmlDataList.push({ id: i, name: split[i] });
            }
        }
        this.AttributeCreationForm.disable();
    };
    AttributeCreationComponent.prototype.onStatusChange = function (event) {
        if (event.target.value == 'L') {
            this.hidevalue = true;
            console.log('length is ', this.summaryHtmlDataList);
            if (this.summaryHtmlDataList.length === 0) {
                this.validOptionList = true;
            }
            else {
                this.validOptionList = false;
            }
        }
        else {
            this.summaryHtmlDataList = [];
            this.summons = [];
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
                this.alertService.sweetalertWarning('Value already presetnt in Summary table.');
            }
            else {
                var index = this.summaryHtmlDataList.findIndex(function (o) { return o.id == _this.optionId; });
                this.summaryHtmlDataList[index].name = evt;
            }
        }
        else {
            console.log(evt);
            if (evt.length > 0) {
                var isContain = this.summaryHtmlDataList.some(function (_a) {
                    var name = _a.name;
                    return name === evt;
                });
                console.log('isContain ', isContain);
                var id = 0;
                if (this.summaryHtmlDataList.length !== 0) {
                    id = this.summaryHtmlDataList[this.summaryHtmlDataList.length - 1].id;
                    this.validOptionList = false;
                }
                else {
                    id = 0;
                    this.validOptionList = true;
                }
                if (isContain == true) {
                    this.alertService.sweetalertWarning('Value already presetnt in Summary table.');
                }
                else {
                    this.summaryHtmlDataList.push({ name: evt, id: id + 1 });
                }
                this.validOptionList = false;
            }
        }
        this.AttributeCreationForm.get('optionList').setValue('');
        this.isEditMode = false;
    };
    //add new AttributeCreation
    AttributeCreationComponent.prototype.addAttributeCreation = function () {
        var _this = this;
        var addAttributeCreation = Object.assign({});
        delete addAttributeCreation.globalAttributeMasterId;
        addAttributeCreation.options = [];
        addAttributeCreation.numberOfOption = this.summaryHtmlDataList.length.toString();
        addAttributeCreation.code = this.AttributeCreationForm.value.code;
        addAttributeCreation.description = this.AttributeCreationForm.value.description;
        addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;
        var array = [];
        for (var i = 0; i < this.summaryHtmlDataList.length; i++) {
            array.push(this.summaryHtmlDataList[i].name);
        }
        addAttributeCreation.options = array;
        console.log(JSON.stringify(addAttributeCreation));
        this.attributeCreationService.AddAttributeCreation(addAttributeCreation).subscribe(function (res) {
            // addAttributeCreation.options = [];
            _this.summons = [];
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            _this.getAllAttributeCreation();
            _this.hidevalue = true;
            _this.summaryHtmlDataList = [];
            _this.CancelAttributeCreation();
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    AttributeCreationComponent.prototype.CancelAttributeCreation = function () {
        this.AttributeCreationForm.enable();
        this.summaryHtmlDataList = [];
        this.summons = [];
        this.disabled = true;
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.AttributeCreationForm.patchValue({
            attributeNature: ''
        });
    };
    AttributeCreationComponent.prototype.ResetAttributeCreation = function () {
        this.AttributeCreationForm.enable();
        this.summaryHtmlDataList = [];
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.summons = [];
        this.AttributeCreationForm.patchValue({
            attributeNature: ''
        });
    };
    AttributeCreationComponent.prototype.deleteName = function () {
        var _this = this;
        console.log('in del Name', this.optionId);
        var index = this.summaryHtmlDataList.findIndex(function (o) { return o.id == _this.optionId; });
        this.summaryHtmlDataList.splice(index, 1);
        if (this.summaryHtmlDataList.length == 0) {
            this.validOptionList = true;
        }
    };
    AttributeCreationComponent.prototype.deleteNameByName = function (name, id) {
        console.log('del by name', name, id);
        this.optionId = id;
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
