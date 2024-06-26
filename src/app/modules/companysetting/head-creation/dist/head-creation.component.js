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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.HeadCreationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var HeadCreationComponent = /** @class */ (function () {
    function HeadCreationComponent(formBuilder, alertService, headCreationService, document) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.headCreationService = headCreationService;
        this.document = document;
        this.NatureList = [{ label: 'Earning', value: 'Earning' }, { label: 'Deduction', value: 'Deduction' }, { label: 'Perquisite', value: 'Perquisite' }];
        this.categoryList = [
            { value: 'Asset', label: 'Asset' },
            { value: 'ESOP-RSU-ESPP', label: 'ESOP-RSU-ESPP' },
            { value: 'Garnishment', label: 'Garnishment' },
            { value: 'Loan & Advance', label: 'Loan & Advance' },
            { value: 'Non-Recurring Quantity', label: 'Non-Recurring Quantity' },
            { value: 'Reimbursement', label: 'Reimbursement' },
            { value: 'Statutory', label: 'Statutory' },
        ];
        this.headCreationList = [];
        this.TypeList = [];
        this.HeadCreationList = [];
        this.viewCancelButton = false;
        this.disabled = true;
    }
    HeadCreationComponent.prototype.ngOnInit = function () {
        this.HeadCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            shortName: new forms_1.FormControl('', forms_1.Validators.required),
            displayName: new forms_1.FormControl('', forms_1.Validators.required),
            headNature: new forms_1.FormControl('', forms_1.Validators.required),
            standardName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            category: new forms_1.FormControl(''),
            type: new forms_1.FormControl('')
        });
        this.getAllHeadCreation();
    };
    // get All HeadCreation
    HeadCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.HeadCreationList = [];
        var earning = [];
        var deduction = [];
        var perquisite = [];
        var other = [];
        this.headCreationService.getAllHeadCreation().subscribe(function (res) {
            var _a;
            for (var i = 0; i < res.data.results.length; i++) {
                if (res.data.results[i].headNature == 'Earning') {
                    earning.push(res.data.results[i]);
                }
                else if (res.data.results[i].headNature == 'Deduction') {
                    deduction.push(res.data.results[i]);
                }
                else if (res.data.results[i].headNature == 'Perquisite') {
                    perquisite.push(res.data.results[i]);
                }
                else {
                    other.push(res.data.results[i]);
                }
            }
            (_a = _this.HeadCreationList).push.apply(_a, __spreadArrays(earning, deduction, perquisite, other));
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    // get HeadCreation by Id
    HeadCreationComponent.prototype.GetHeadCreationbyIdDisable = function (id) {
        var _this = this;
        this.disabled = false;
        this.viewCancelButton = true;
        this.headCreationService.GetHeadCreationById(id)
            .subscribe(function (response) {
            _this.HeadCreationForm.patchValue({ id: response.data.results[0].headMasterId });
            _this.HeadCreationForm.patchValue({ standardName: response.data.results[0].standardName });
            _this.HeadCreationForm.patchValue({ description: response.data.results[0].description });
            _this.HeadCreationForm.patchValue({ shortName: response.data.results[0].shortName });
            _this.HeadCreationForm.patchValue({ headNature: response.data.results[0].headNature });
            _this.onChangeNature(response.data.results[0].headNature);
            _this.HeadCreationForm.patchValue({ type: response.data.results[0].type });
            _this.HeadCreationForm.patchValue({ category: response.data.results[0].category });
            _this.HeadCreationForm.patchValue({ displayName: response.data.results[0].displayName });
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
        this.HeadCreationForm.disable();
    };
    HeadCreationComponent.prototype.addHeadCreation = function () {
        var _this = this;
        var addHeadCreation = Object.assign({}, this.HeadCreationForm.value);
        console.log(JSON.stringify(addHeadCreation));
        this.headCreationService.AddHeadCreation(addHeadCreation).subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            _this.getAllHeadCreation();
            _this.CancelHeadCreation();
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    HeadCreationComponent.prototype.CancelHeadCreation = function () {
        this.HeadCreationForm.enable();
        this.disabled = true;
        this.HeadCreationForm.reset();
        this.viewCancelButton = false;
        this.HeadCreationForm.patchValue({
            headNature: '',
            type: '',
            category: ''
        });
        this.TypeList = [];
    };
    HeadCreationComponent.prototype.ResetHeadCreation = function () {
        this.HeadCreationForm.reset();
        this.viewCancelButton = false;
        this.HeadCreationForm.patchValue({
            headNature: '',
            type: '',
            category: ''
        });
        this.TypeList = [];
    };
    HeadCreationComponent.prototype.onChangeEvent = function (event) {
        this.HeadCreationForm.patchValue({ shortName: event.target.value });
    };
    HeadCreationComponent.prototype.onChangeNature = function (evt) {
        var _this = this;
        if (evt == '') {
            this.TypeList = [];
        }
        else {
            this.TypeList = [];
            this.headCreationService.getByHeadMasterByNature(evt).subscribe(function (res) {
                _this.TypeList = res.data.results;
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        this.HeadCreationForm.patchValue({ type: '' });
    };
    HeadCreationComponent.prototype.keyPressedSpaceNotAllow = function (event) {
        var pattern = /[ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    HeadCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-head-creation',
            templateUrl: './head-creation.component.html',
            styleUrls: ['./head-creation.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(3, core_1.Inject(common_1.DOCUMENT))
    ], HeadCreationComponent);
    return HeadCreationComponent;
}());
exports.HeadCreationComponent = HeadCreationComponent;
