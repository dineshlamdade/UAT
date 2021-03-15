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
exports.AttributeCreationComponent = exports.SaveAttributeSelection = exports.SaveAttributeCreation = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
//sneha
var sweetalert2_1 = require("sweetalert2");
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
var AttributeCreationComponent = /** @class */ (function () {
    // TypeList: Array<any> = [];
    // HeadCreationList:Array<any> = [];
    // Name:string;
    function AttributeCreationComponent(formBuilder, Service, datePipe, 
    // private messageService: MessageService,
    http, 
    // private notifyService: NotificationsService,
    datepipe, fileService, attributeCreationService, numberFormat, modalService, document) {
        this.formBuilder = formBuilder;
        this.Service = Service;
        this.datePipe = datePipe;
        this.http = http;
        this.datepipe = datepipe;
        this.fileService = fileService;
        this.attributeCreationService = attributeCreationService;
        this.numberFormat = numberFormat;
        this.modalService = modalService;
        this.document = document;
        this.AttributeCreationList = [];
        this.NatureList = [];
        this.disabled = true;
        this.viewCancelButton = false;
        this.hidevalue = false;
        //summons = [];
        this.summons = [];
        this.newlist = [];
        this.optionList = [];
        this.NatureList = [
            { label: 'L', value: 'L' },
            { label: 'F', value: 'F' },
            { label: 'SP', value: 'SP' },
            { label: 'SDM', value: 'SDM' },
            { label: 'PEI', value: 'PEI' },
            { label: 'WF', value: 'WF' },
            { label: 'GM', value: 'GM' },
        ];
    }
    AttributeCreationComponent.prototype.ngOnInit = function () {
        this.AttributeCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            code: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            attributeNature: new forms_1.FormControl('', forms_1.Validators.required),
            optionList: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.getAllAttributeCreation();
    };
    AttributeCreationComponent.prototype.sweetalert7 = function (message) {
        sweetalert2_1["default"].fire({
            text: message
        });
    };
    AttributeCreationComponent.prototype.sweetalertWarning = function (message) {
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
    AttributeCreationComponent.prototype.sweetalertInfo = function (message) {
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
    AttributeCreationComponent.prototype.sweetalertMasterSuccess = function (message, text) {
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
    AttributeCreationComponent.prototype.sweetalertError = function (message) {
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
    // get All AttributeCreation
    AttributeCreationComponent.prototype.getAllAttributeCreation = function () {
        var _this = this;
        this.attributeCreationService.getAllAttributeCreation().subscribe(function (res) {
            debugger;
            _this.AttributeCreationList = res.data.results;
        });
    };
    // Get Attribute Creation ById
    AttributeCreationComponent.prototype.GetAttributeCreationByIdDisable = function (id) {
        var _this = this;
        debugger;
        // this.CycleupdateFlag=true;
        // this.CycleupdateFlag1=false;
        this.disabled = false;
        this.viewCancelButton = true;
        this.attributeCreationService.GetAttributeCreationById(id)
            .subscribe(function (response) {
            debugger;
            //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
            _this.AttributeCreationForm.patchValue({ code: response.data.results[0].code });
            _this.AttributeCreationForm.patchValue({ description: response.data.results[0].description });
            _this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].attributeNature });
            if (response.data.results[0].attributeNature == "L") {
                _this.hidevalue = true;
            }
            else {
                _this.hidevalue = false;
            }
            _this.summons = [];
            if (response.data.results[0].optionList.length > 0) {
                response.data.results[0].optionList.forEach(function (element) {
                    // const obj = {
                    //     label: element,
                    //     value: element,
                    // };
                    _this.summons.push(element.optionValue);
                    // const control = <FormArray>this.AttributeCreationForm.controls['optionList'];
                    // control.push(element.optionValue)
                    //this.transactionInstitutionNames.push(obj);
                    //  this.AttributeCreationForm.patchValue({ optionList: this.summons});
                });
                _this.AttributeCreationForm.patchValue({ optionList: _this.summons });
            }
        });
        this.summons = [];
    };
    AttributeCreationComponent.prototype.onChangeEvent = function (event) {
        debugger;
        this.summons.push(event);
        //this.summons
        // this.newlist.push(this.summons.values)
        // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
        //  this.HeadCreationForm.patchValue({ shortName:this.Name });
        // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
        // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
        // }
    };
    AttributeCreationComponent.prototype.onStatusChange = function (event) {
        debugger;
        this.selectedNature = event.target.value;
        if (this.selectedNature == 'L') {
            this.hidevalue = true;
            this.AttributeCreationForm.controls['optionList'].setValidators([forms_1.Validators.required]);
        }
        else {
            this.summons = [];
            this.hidevalue = false;
            this.AttributeCreationForm.patchValue({ addDays: null });
            this.AttributeCreationForm.get('optionList').clearValidators();
            this.AttributeCreationForm.get('optionList').updateValueAndValidity();
        }
    };
    AttributeCreationComponent.prototype.addOptionList = function () {
        this.AttributeCreationForm.patchValue({ optionList: '' });
    };
    //add new AttributeCreation
    AttributeCreationComponent.prototype.addAttributeCreation = function () {
        var _this = this;
        debugger;
        var addAttributeCreation = Object.assign({});
        //addAttributeCreation.options=this.summons;
        addAttributeCreation.options = [];
        this.summons.forEach(function (f) {
            addAttributeCreation.options.push(f);
        });
        addAttributeCreation.numberOfOption = this.summons.length.toString();
        addAttributeCreation.code = this.AttributeCreationForm.value.code;
        addAttributeCreation.description = this.AttributeCreationForm.value.description;
        addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;
        //     code;string;
        // description:string;
        // attributeNature:string;
        if (addAttributeCreation.globalAttributeMasterId == undefined || addAttributeCreation.globalAttributeMasterId == 0) {
            this.attributeCreationService.AddAttributeCreation(addAttributeCreation).subscribe(function (res) {
                debugger;
                addAttributeCreation.options = [];
                _this.summons = [];
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllAttributeCreation();
                _this.hidevalue = false;
                _this.AttributeCreationForm.reset();
                //  this.AttributeCreationForm.patchValue({ isStatutory:'0' });
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        // else{
        //     debugger
        //   //Update BusinessYear service
        //   addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
        //   addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
        //   this.payrollService.UpdateBusinessYear(addBusinessYear.id,addBusinessYear).subscribe((res:any )=> {
        //   debugger
        //   this.sweetalertMasterSuccess("Updated..!!", res.status.message);
        //   this.getAllBusinessyear();
        //   this.BusinessYearform.reset();
        //   this.updateFlag=false;
        //   },
        //   (error: any) => {
        //      this.sweetalertError(error["error"]["status"]["message"]);
        //      // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
        //    });
        // }
    };
    AttributeCreationComponent.prototype.CancelAttributeCreation = function () {
        this.summons = [];
        this.disabled = true;
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        //this.HeadCreationForm.patchValue({ isStatutory:'0' });
    };
    AttributeCreationComponent.prototype.ResetAttributeCreation = function () {
        this.AttributeCreationForm.reset();
        this.viewCancelButton = false;
        this.hidevalue = false;
        this.summons = [];
        this.AttributeCreationForm.patchValue({ isStatutory: '0' });
    };
    AttributeCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-attribute-creation',
            templateUrl: './attribute-creation.component.html',
            styleUrls: ['./attribute-creation.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(9, core_1.Inject(common_1.DOCUMENT))
    ], AttributeCreationComponent);
    return AttributeCreationComponent;
}());
exports.AttributeCreationComponent = AttributeCreationComponent;
