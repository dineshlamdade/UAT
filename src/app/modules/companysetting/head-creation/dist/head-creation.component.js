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
exports.HeadCreationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var sweetalert2_1 = require("sweetalert2");
var HeadCreationComponent = /** @class */ (function () {
    function HeadCreationComponent(formBuilder, headCreationService, document) {
        this.formBuilder = formBuilder;
        this.headCreationService = headCreationService;
        this.document = document;
        this.NatureList = [];
        this.TypeList = [];
        this.HeadCreationList = [];
        this.viewCancelButton = false;
        this.disabled = true;
        this.NatureList = [
            { label: 'Earning', value: 'Earning' },
            { label: 'Deduction', value: 'Deduction' },
            { label: 'Perquisite', value: 'Perquisite' },
        ];
        this.TypeList = [
            { label: 'House Rental', value: 'House Rental' },
            { label: 'Basic Salary', value: 'Basic Salary' },
            { label: 'Dearness Allowance', value: 'Dearness Allowance' },
        ];
    }
    HeadCreationComponent.prototype.ngOnInit = function () {
        this.HeadCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            standardName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            shortName: new forms_1.FormControl('', forms_1.Validators.required),
            headNature: new forms_1.FormControl('', forms_1.Validators.required),
            type: new forms_1.FormControl(''),
            isStatutory: new forms_1.FormControl(0)
        });
        this.getAllHeadCreation();
    };
    // get All HeadCreation
    HeadCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.headCreationService.getAllHeadCreation().subscribe(function (res) {
            _this.HeadCreationList = res.data.results;
        });
    };
    // get HeadCreation by Id
    HeadCreationComponent.prototype.GetHeadCreationbyIdDisable = function (id) {
        var _this = this;
        ;
        // this.CycleupdateFlag=true;
        // this.CycleupdateFlag1=false;
        this.disabled = false;
        this.viewCancelButton = true;
        this.headCreationService.GetHeadCreationById(id)
            .subscribe(function (response) {
            //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
            _this.HeadCreationForm.patchValue({ standardName: response.data.results[0].standardName });
            _this.HeadCreationForm.patchValue({ description: response.data.results[0].description });
            _this.HeadCreationForm.patchValue({ shortName: response.data.results[0].shortName });
            _this.HeadCreationForm.patchValue({ headNature: response.data.results[0].headNature });
            if (response.data.results[0].isStatutory == 1) {
                _this.HeadCreationForm.patchValue({ isStatutory: '1' });
            }
            else {
                _this.HeadCreationForm.patchValue({ isStatutory: '0' });
            }
            _this.HeadCreationForm.patchValue({ type: response.data.results[0].type });
        });
    };
    //add new HeadCreation
    HeadCreationComponent.prototype.addHeadCreation = function () {
        var _this = this;
        var addHeadCreation = Object.assign({}, this.HeadCreationForm.value);
        if (addHeadCreation.id == undefined || addHeadCreation.id == 0) {
            this.headCreationService.AddHeadCreation(addHeadCreation).subscribe(function (res) {
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllHeadCreation();
                _this.HeadCreationForm.reset();
                _this.HeadCreationForm.patchValue({ isStatutory: '0' });
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        // else{
        //
        //   //Update BusinessYear service
        //   addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
        //   addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
        //   this.payrollService.UpdateBusinessYear(addBusinessYear.id,addBusinessYear).subscribe((res:any )=> {
        //
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
    HeadCreationComponent.prototype.CancelHeadCreation = function () {
        this.disabled = true;
        this.HeadCreationForm.reset();
        this.viewCancelButton = false;
        this.HeadCreationForm.patchValue({ isStatutory: '0' });
    };
    HeadCreationComponent.prototype.ResetHeadCreation = function () {
        this.HeadCreationForm.reset();
        this.viewCancelButton = false;
        this.HeadCreationForm.patchValue({ isStatutory: '0' });
    };
    HeadCreationComponent.prototype.onChangeEvent = function (event) {
        ;
        this.Name = event.target.value;
        // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
        this.HeadCreationForm.patchValue({ shortName: this.Name });
        // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
        // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
        // }
    };
    HeadCreationComponent.prototype.sweetalert7 = function (message) {
        sweetalert2_1["default"].fire({
            text: message
        });
    };
    HeadCreationComponent.prototype.sweetalertWarning = function (message) {
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
    HeadCreationComponent.prototype.sweetalertInfo = function (message) {
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
    HeadCreationComponent.prototype.sweetalertMasterSuccess = function (message, text) {
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
    HeadCreationComponent.prototype.sweetalertError = function (message) {
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
    HeadCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-head-creation',
            templateUrl: './head-creation.component.html',
            styleUrls: ['./head-creation.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], HeadCreationComponent);
    return HeadCreationComponent;
}());
exports.HeadCreationComponent = HeadCreationComponent;
