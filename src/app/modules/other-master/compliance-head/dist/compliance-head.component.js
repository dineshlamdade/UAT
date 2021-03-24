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
    function ComplianceHeadComponent(modalService, complianceHeadService, formBuilder, alertService) {
        this.modalService = modalService;
        this.complianceHeadService = complianceHeadService;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.countries = [];
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.shortNameList = ['PF', 'EPS', 'PT', 'TDS', 'ESIC', 'LWF', 'S&E', 'Factories', 'SA', 'Gratuity', 'BOCW', 'CLRA', 'EE', 'PWD'];
        this.aplicabilityLevelList = ['Central', 'State', 'City', 'Municipal Corporation', 'Establishment'];
        this.form = forms_1.FormGroup;
        this.showButtonSaveAndReset = true;
        this.isSaveAndReset = true;
        this.isEditMode = false;
        this.invalidWebsite = false;
        this.editedComplianceHeadId = 0;
        this.hideRemark = false;
        this.invalidComplianceHeadName = false;
        this.form = this.formBuilder.group({
            complianceHeadName: new forms_1.FormControl(null, forms_1.Validators.required),
            shortName: new forms_1.FormControl('', forms_1.Validators.required),
            country: new forms_1.FormControl('', forms_1.Validators.required),
            aplicabilityLevel: new forms_1.FormControl('', forms_1.Validators.required),
            authorityHandling: new forms_1.FormControl(null, forms_1.Validators.required),
            website: new forms_1.FormControl('', [forms_1.Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
            // website: new FormControl('', [Validators.required, Validators.pattern('/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/')]),
            remark: new forms_1.FormControl({ value: '', disabled: true }),
            complianceActive: new forms_1.FormControl({ value: true, disabled: true })
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
        if (this.editedComplianceHeadId > 0) {
            console.log('in edit mode');
            var data = this.form.getRawValue();
            data.complianceHeadId = this.editedComplianceHeadId;
            data.createdBy = 'PaysquareGlobal';
            data.isActive = 1;
            console.log(JSON.stringify(data));
            this.complianceHeadService.putComplianceHead(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Compliance Head Updated Successfully.', '');
                    _this.form.reset();
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
                //   this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
        else {
            var data = this.form.getRawValue();
            console.log(JSON.stringify(data));
            this.complianceHeadService.postComplianceHead(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Compliance Head Saved Successfully.', '');
                    _this.form.reset();
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    ComplianceHeadComponent.prototype.cancelView = function (i) {
        this.editedComplianceHeadId = 0;
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.showButtonSaveAndReset = true;
        this.saveFormValidation();
        this.form.get('remark').disable();
        this.form.get('complianceActive').setValue(true);
        this.form.get('complianceActive').disable();
        this.hideRemark = false;
    };
    ComplianceHeadComponent.prototype.viewMaster = function (i) {
        this.editedComplianceHeadId = 0;
        window.scrollTo(0, 0);
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
                    authorityHandling: element.authorityHandling,
                    complianceActive: element.complianceActive,
                    remark: element.remark,
                    isActive: element.isActive,
                    website: element.website,
                    complianceHeadId: element.complianceHeadId
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
    };
    ComplianceHeadComponent.prototype.saveFormValidation = function () {
        this.form.patchValue({
            shortName: '',
            country: '',
            aplicabilityLevel: ''
        });
        this.isEditMode = false;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.editedComplianceHeadId = 0;
    };
    ComplianceHeadComponent.prototype.editMaster = function (i, complianceHeadId) {
        this.editedComplianceHeadId = complianceHeadId;
        window.scrollTo(0, 0);
        this.isEditMode = true;
        this.isSaveAndReset = false;
        this.showButtonSaveAndReset = true;
        this.form.enable();
        this.form.reset();
        this.form.patchValue(this.summaryHtmlDataList[i]);
    };
    ComplianceHeadComponent.prototype.deactiveActiveCheckBox = function () { };
    ComplianceHeadComponent.prototype.onChangeWebsiteName = function (evt) {
        if (evt.length !== 0) {
            var text = evt.split('.');
            // let index = evt.indexOf('.');
            // console.log(index);
            // let index1 = evt.lastIndexOf('.');
            // console.log(index1);
            // if only one dot is present
            var s = evt.lastIndexOf('.') - evt.indexOf('.');
            console.log(s);
            // if tow dot presnt and without space
            if (evt.indexOf('.') == evt.lastIndexOf('.') || s == 1) {
                this.invalidWebsite = true;
            }
            else {
                this.invalidWebsite = false;
            }
            // if (text.length >= 3) {
            //   this.invalidWebsite = true;
            // } else {
            //   this.invalidWebsite = false;
            // }
            // for (let i = 0; i < text.length; i++) {
            //   if (text.length >= 3) {
            //     if (text[i].length == 0) {
            //       this.invalidWebsite = true;
            //       break;
            //     }
            //   } else {
            //     this.invalidWebsite = true;
            //     break;
            //   }
            // }
            // if (text.length >= 3) {
            //   this.invalidWebsite = false;
            // } else {
            //   this.invalidWebsite = true;
            // }
            // console.log(text.length);
        }
        else {
            this.invalidWebsite = false;
        }
    };
    ComplianceHeadComponent.prototype.deactivateRemark = function () {
        console.log('in deactive remakr');
        if (this.form.get('complianceActive').value === false) {
            this.form.get('remark').enable();
            this.hideRemark = true;
            this.form.controls['remark'].setValidators(forms_1.Validators.required);
            this.form.controls['remark'].updateValueAndValidity();
        }
        else {
            this.hideRemark = false;
            // this.form.get('remark').disable();
            // this.form.controls['remark'].clearValidator();
            this.form.controls["remark"].clearValidators();
            this.form.controls["remark"].updateValueAndValidity();
            // this.form.get('remark').reset();
        }
    };
    ComplianceHeadComponent.prototype.ConfirmationDialog = function (confirmdialog, id) {
        this.editedComplianceHeadId = id;
        this.modalRef = this.modalService.show(confirmdialog, Object.assign({}, { "class": 'gray modal-md' }));
    };
    ComplianceHeadComponent.prototype.clickedOnYes = function () {
        console.log('yes');
        this.deleteComplianceHead(this.editedComplianceHeadId);
    };
    ComplianceHeadComponent.prototype.deleteComplianceHead = function (id) {
        var _this = this;
        this.complianceHeadService.deleteComplianceHead(id).subscribe(function (res) {
            console.log(res);
            _this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
            _this.refreshHtmlTableData();
        }, function (error) {
            _this.alertService.sweetalertError(error.error.status.messsage);
        }, function () { });
    };
    ComplianceHeadComponent.prototype.isShortNameContainsOnlySpecialCharacter = function () {
        this.invalidComplianceHeadName = false;
        var splChars = "*|,\":<>[]{}`\!';^()@&$#%1234567890";
        for (var i = 0; i < this.form.get('complianceHeadName').value.length; i++) {
            if (splChars.indexOf(this.form.get('complianceHeadName').value.charAt(i)) != -1) {
                //alert("Illegal characters detected!");
                this.invalidComplianceHeadName = true;
            }
            else {
                this.invalidComplianceHeadName = false;
                break;
            }
        }
        if (this.invalidComplianceHeadName == true) {
            this.form.get('complianceHeadName').status = 'INVALID';
        }
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
