"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComplianceHeadComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ComplianceHeadComponent = /** @class */ (function () {
    function ComplianceHeadComponent(complianceHeadService, formBuilder, alertService) {
        this.complianceHeadService = complianceHeadService;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.countries = [];
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.shortNameList = ['PF', 'EPS', 'PT', 'TDS', 'ESIC', 'LWF', 'S&E', 'Factories', 'SA', 'Gratuity', 'BOCW', 'CLRA', 'EE', 'PWD'];
        this.aplicabilityLevelList = ['Central', 'State', 'City', 'Municipal', 'Corporation', 'Establishment'];
        this.form = forms_1.FormGroup;
        this.showButtonSaveAndReset = true;
        this.form = this.formBuilder.group({
            complianceHeadName: new forms_1.FormControl(null, forms_1.Validators.required),
            shortName: new forms_1.FormControl(null, forms_1.Validators.required),
            country: new forms_1.FormControl(null, forms_1.Validators.required),
            aplicabilityLevel: new forms_1.FormControl(null, forms_1.Validators.required),
            authorityHandling: new forms_1.FormControl(null, forms_1.Validators.required),
            website: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    }
    ComplianceHeadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.complianceHeadService.getLocationInformationOrCountryList().subscribe(function (res) {
            _this.countries = res.data.results;
        });
        this.refreshHtmlTableData();
    };
    ComplianceHeadComponent.prototype.save = function () {
        var _this = this;
        var data = this.form.getRawValue();
        this.complianceHeadService.postComplianceHead(data).subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.alertService.sweetalertMasterSuccess('Compliance Head Saved Successfully.', '');
                _this.form.reset();
                _this.refreshHtmlTableData();
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        });
    };
    ComplianceHeadComponent.prototype.cancelView = function (i) {
        this.form.enable();
        this.form.reset();
        this.showButtonSaveAndReset = true;
    };
    ComplianceHeadComponent.prototype.viewMaster = function (i) {
        this.showButtonSaveAndReset = false;
        this.form.reset();
        this.form.patchValue(this.masterGridDataList[i]);
        this.form.disable();
    };
    ComplianceHeadComponent.prototype.onSelectShortName = function (evt) { };
    ComplianceHeadComponent.prototype.onSelectApplicabilityLevel = function (evt) { };
    ComplianceHeadComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.complianceHeadService.getComplianceHeadDetails().subscribe(function (res) {
            console.log(res);
            _this.masterGridDataList = res.data.results;
            var i = 1;
            console.log(res.data.results);
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    complianceHeadName: element.complianceHeadName,
                    shortName: element.shortName,
                    country: element.country,
                    aplicabilityLevel: element.aplicabilityLevel,
                    authorityHandling: element.authorityHandling
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
    };
    ComplianceHeadComponent = __decorate([
        core_1.Component({
            selector: 'app-compliance-head',
            templateUrl: './compliance-head.component.html',
            styleUrls: ['./compliance-head.component.scss']
        })
    ], ComplianceHeadComponent);
    return ComplianceHeadComponent;
}());
exports.ComplianceHeadComponent = ComplianceHeadComponent;
