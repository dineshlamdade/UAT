"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyGroupMasterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CompanyGroupMasterComponent = /** @class */ (function () {
    function CompanyGroupMasterComponent(shortenString, formBuilder, companyGroupMasterService, datePipe, alertService) {
        this.shortenString = shortenString;
        this.formBuilder = formBuilder;
        this.companyGroupMasterService = companyGroupMasterService;
        this.datePipe = datePipe;
        this.alertService = alertService;
        this.showButtonSaveAndReset = true;
        // isEditMode: boolean = false;
        this.masterGridDataList = [];
        this.index = 0;
        // qwerty = 'disabled-button';
        this.companyGroupId = 0;
        this.reasonForExitList = [];
        this.view = false;
        this.companyGroupNameInvalid = false;
        this.shortNameInvalid = false;
        this.isSaveAndReset = true;
        this.today = new Date();
        this.today1 = new Date();
        this.bsValue = new Date();
        this.scaleList = [];
        this.summaryHtmlDataList = [];
        this.form = forms_1.FormGroup;
        this.form = this.formBuilder.group({
            companyGroupCode: new forms_1.FormControl({ value: null, disabled: true }),
            companyGroupName: new forms_1.FormControl(null, forms_1.Validators.required),
            shortName: new forms_1.FormControl(null, forms_1.Validators.required),
            startDate: new forms_1.FormControl(null, forms_1.Validators.required),
            endDate: new forms_1.FormControl(''),
            scale: new forms_1.FormControl('', forms_1.Validators.required),
            reasonForExit: new forms_1.FormControl(''),
            remark: new forms_1.FormControl(null),
            companyGroupActive: new forms_1.FormControl({ value: true, disabled: true })
        });
        // this.sweetAlertDeletePopUpBoxConfirmation();
    }
    CompanyGroupMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form.get('endDate').disable();
        this.form.get('reasonForExit').disable();
        this.form.get('remark').disable();
        this.form.get('companyGroupActive').disable();
        this.form.get('companyGroupActive').setValue(true);
        this.refreshHtmlTableData();
        this.companyGroupMasterService.getCompanygroupdropdownMaster().subscribe(function (res) {
            // console.log(res);
            res.data.results.forEach(function (element) {
                //console.log(element);
                // const obj = {
                //     label: element.name,
                //     value: element.previousEmployerId
                // };
                //this.previousEmployeeList.push(obj);
            });
        });
        this.companyGroupMasterService.getCompanygroupdropdownScaleMaster().subscribe(function (res) {
            // console.log(res);
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.scaleList.push(obj);
            });
        });
        this.companyGroupMasterService.getCompanygroupdropdownReasonForExitMaster().subscribe(function (res) {
            // console.log(res);
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.dropdownValue,
                    value: element.dropdownName
                };
                _this.reasonForExitList.push(obj);
            });
        });
    };
    CompanyGroupMasterComponent.prototype.onSelectScale = function (scale1) {
        console.log(scale1);
        console.log(this.form.value.scale);
        console.log(this.form.get('scale').value);
        // if (scale1 == 'null') {
        //   this.form.get('scale').setValue(null);
        //   this.form.get('scale').setValidators(Validators.required);
        //   this.form.get('scale').updateValueAndValidity();
        // }
    };
    CompanyGroupMasterComponent.prototype.onSelectReasonForExit = function () {
        console.log(this.form.value.reasonForExit);
    };
    CompanyGroupMasterComponent.prototype.deactiveActiveCheckBox = function () {
        this.deactivateRemark();
    };
    CompanyGroupMasterComponent.prototype.save = function () {
        var _this = this;
        console.log(this.form);
        if (this.companyGroupId > 0) {
            console.log('clcicked on edit button');
            var companyGroupName = this.form.get('companyGroupName').value;
            var scale = this.form.get('scale').value;
            var companyGroupCode = this.form.get('companyGroupCode').value;
            var data = this.form.getRawValue();
            var startDate = this.datePipe.transform(this.form.get('startDate').value, 'dd-MMM-y');
            var endDate = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
            data.startDate = startDate;
            data.endDate = endDate;
            data.companyGroupId = this.companyGroupId;
            data.companyGroupActive = 'true';
            console.log(data);
            this.companyGroupMasterService.putCompanyGroupMaster(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    console.log('data is updated');
                    _this.alertService.sweetalertMasterSuccess('Company Group Master Updated Successfully.', '');
                    _this.companyGroupId = 0;
                    //  this.isEditMode = false;
                    _this.form.reset();
                    _this.isSaveAndReset = true;
                    _this.showButtonSaveAndReset = true;
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
        else {
            console.log('clicked on new record save button');
            var companyGroupName = this.form.get('companyGroupName').value;
            var scale = this.form.get('scale').value;
            var companyGroupCode = this.form.get('companyGroupCode').value;
            var data = this.form.getRawValue();
            var startDate = this.datePipe.transform(this.form.get('startDate').value, 'dd-MMM-y');
            var endDate = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
            data.startDate = startDate;
            data.endDate = endDate;
            data.companyGroupId = 0;
            data.companyGroupActive = 'true';
            data.remark = '';
            data.reasonForExit = '';
            console.log(data);
            this.companyGroupMasterService.postCompanyGroupMaster(data).subscribe(function (res) {
                console.log(res);
                if (res.data.results.length > 0) {
                    _this.alertService.sweetalertMasterSuccess('Company Group Master Saved Successfully.', '');
                    _this.form.reset();
                    _this.refreshHtmlTableData();
                    _this.saveFormValidation();
                }
                else {
                    _this.alertService.sweetalertWarning(res.status.messsage);
                }
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
            });
        }
    };
    CompanyGroupMasterComponent.prototype.reset = function () {
        // this.isEditMode = false;
        this.companyGroupId = -1;
        this.showButtonSaveAndReset = true;
        this.companyGroupId = 0;
        this.form.get('companyGroupActive').setValue(true);
        this.saveFormValidation();
    };
    CompanyGroupMasterComponent.prototype.cancelView = function () {
        this.form.enable();
        this.companyGroupId = -1;
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.companyGroupId = -1;
        this.form.get('companyGroupActive').setValue(true);
        this.saveFormValidation();
    };
    CompanyGroupMasterComponent.prototype.onBsValueChangeDateOfSetup = function () {
        console.log(this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y'));
    };
    CompanyGroupMasterComponent.prototype.editMaster = function (i, companyGroupId) {
        window.scrollTo(0, 0);
        this.isSaveAndReset = false;
        this.index = 0;
        this.showButtonSaveAndReset = true;
        this.companyGroupId = companyGroupId;
        this.form.reset();
        this.form.enable();
        // const to = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        // this.datePipe.transform(this.endDate1.nativeElement.value, 'dd-MMM-y');
        // this.endDate1.nativeElement.value = this.datePipe.transform(this.today, 'dd-MMM-y');
        // this.form.get('endDate').setValue(this.datePipe.transform(this.today, 'dd-MMM-y'));
        this.form.controls["remark"].clearValidators();
        this.form.controls["remark"].updateValueAndValidity();
        this.form.controls["reasonForExit"].clearValidators();
        this.form.controls["reasonForExit"].updateValueAndValidity();
        this.index = this.summaryHtmlDataList.findIndex(function (rowData) {
            return rowData.companyGroupId === companyGroupId;
        });
        console.log(this.masterGridDataList);
        this.form.patchValue(this.masterGridDataList[i]);
        this.form.controls['endDate'].clearValidators();
        this.form.controls['remark'].clearValidators();
        this.form.controls["endDate"].updateValueAndValidity();
        this.form.controls["remark"].updateValueAndValidity();
        this.form.get('companyGroupCode').disable();
        this.form.get('companyGroupActive').disable();
        this.deactivateRemark();
    };
    CompanyGroupMasterComponent.prototype.viewMaster = function (i, companyGroupId) {
        window.scrollTo(0, 0);
        this.showButtonSaveAndReset = false;
        this.form.reset();
        this.form.patchValue(this.masterGridDataList[i]);
        this.form.disable();
    };
    CompanyGroupMasterComponent.prototype.refreshHtmlTableData = function () {
        var _this = this;
        this.summaryHtmlDataList = [];
        this.masterGridDataList = [];
        this.companyGroupMasterService.getCompanyGroupMasterGetAllActiveAndInActive().subscribe(function (res) {
            console.log('getCompanyGroupMasterGetAllActiveAndInActive', res);
            _this.masterGridDataList = res.data.results;
            var i = 1;
            console.log('html table data');
            console.log(res.data.results);
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    companyGroupCode: element.companyGroupCode,
                    companyGroupName: element.companyGroupName,
                    shortenCompanyGroupName: _this.shortenString.transform(element.companyGroupName),
                    shortName: element.shortName,
                    shortenShortName: _this.shortenString.transform(element.shortName),
                    StartDate: element.startDate,
                    EndDate: element.endDate,
                    ReasonforExit: element.reasonForExit,
                    Scale: element.scale,
                    companyGroupId: element.companyGroupId,
                    companyGroupActive: element.companyGroupActive,
                    servicePeriod: element.servicePeriod,
                    servicePeriodShort: element.servicePeriodShort
                };
                _this.summaryHtmlDataList.push(obj);
            });
        });
    };
    CompanyGroupMasterComponent.prototype.saveFormValidation = function () {
        this.form.reset();
        this.form.enable();
        this.form.get('endDate').disable();
        this.form.get('reasonForExit').disable();
        this.form.get('remark').disable();
        this.form.get('companyGroupActive').disable();
        this.form.get('companyGroupActive').setValue(true);
        this.form.controls['endDate'].clearValidators();
        this.form.controls['remark'].clearValidators();
        this.form.controls["endDate"].updateValueAndValidity();
        this.form.controls["remark"].updateValueAndValidity();
        // this.form.controls["companyGroupCode"].setValidators(Validators.required);
        // this.form.controls["companyGroupCode"].updateValueAndValidity();
        this.form.controls["companyGroupName"].setValidators(forms_1.Validators.required);
        this.form.controls["companyGroupName"].updateValueAndValidity();
        this.form.controls["shortName"].setValidators(forms_1.Validators.required);
        this.form.controls["shortName"].updateValueAndValidity();
        this.form.controls["scale"].setValidators(forms_1.Validators.required);
        this.form.controls["scale"].updateValueAndValidity();
        this.form.controls["startDate"].setValidators(forms_1.Validators.required);
        this.form.controls["startDate"].updateValueAndValidity();
        this.form.get('companyGroupActive').setValue(true);
        this.form.get('companyGroupActive').disable();
        this.form.get('endDate').disable();
        this.form.patchValue({
            scale: '',
            reasonForExit: ''
        });
        this.form.get('companyGroupCode').disable();
    };
    CompanyGroupMasterComponent.prototype.onChangeEndDate = function (evt) {
        console.log(this.form.get('endDate').value);
        // console.log(this.endDateModel);
        //  console.log(evt.target.value);
        //  console.log(this.form.get('endDate').value);
        if (this.form.get('endDate').value == '' || this.form.get('endDate').value == null) {
            this.form.controls["remark"].clearValidators();
            this.form.controls["remark"].updateValueAndValidity();
            this.form.controls["reasonForExit"].clearValidators();
            this.form.controls["reasonForExit"].updateValueAndValidity();
            this.form.patchValue({
                remark: '',
                reasonForExit: ''
            });
            this.form.get('remark').disable();
            this.form.get('reasonForExit').disable();
        }
        else {
            console.log(evt);
            console.log(this.form.get('endDate').value);
            var from = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd');
            var to = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
            if (from > to) {
                this.form.controls['endDate'].reset();
            }
            this.form.controls["remark"].setValidators(forms_1.Validators.required);
            this.form.controls["remark"].updateValueAndValidity();
            this.form.controls["reasonForExit"].setValidators(forms_1.Validators.required);
            this.form.controls["reasonForExit"].updateValueAndValidity();
            this.form.get('companyGroupActive').setValue(true);
            this.deactivateRemark();
        }
    };
    CompanyGroupMasterComponent.prototype.onChangeEngagementEndDate = function (evt) {
        var endDate12 = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
        // debugger
        // console.log(this.endDate1);
        // console.log(this.endDate1.nativeElement);
        // console.log(this.endDate1.nativeElement.value);
        // if (this.endDate1 !== undefined) {
        //   this.endDate1.nativeElement.value = this.datePipe.transform(this.endDate1.nativeElement.value, 'dd-MMM-y');
        // }
        //  console.log(this.endDate1.nativeElement.value);
        // const endDate = this.datePipe.transform(this.endDateModel, 'yyyy-MM-dd');
        if (endDate12 == '' || endDate12 == null) {
            this.form.controls["remark"].clearValidators();
            this.form.controls["remark"].updateValueAndValidity();
            this.form.controls["reasonForExit"].clearValidators();
            this.form.controls["reasonForExit"].updateValueAndValidity();
            this.form.patchValue({
                remark: '',
                reasonForExit: ''
            });
            this.form.get('remark').disable();
            this.form.get('reasonForExit').disable();
        }
        else {
            this.form.get('remark').enable();
            this.form.get('reasonForExit').enable();
            this.form.controls["remark"].setValidators([forms_1.Validators.required]);
            this.form.controls["remark"].updateValueAndValidity();
            this.form.controls["reasonForExit"].setValidators([forms_1.Validators.required]);
            this.form.controls["reasonForExit"].updateValueAndValidity();
            // this.form.get('companyGroupActive').setValue(true);
            // this.hideRemarkDiv = false;
            this.deactivateRemark();
            // } else {
            //   this.form.get('companyGroupActive').setValue(false);
            //   this.hideRemarkDiv = true;
            //   this.deactivateRemark();
            //
        }
    };
    // const endDate = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
    // console.log(endDate);
    // this.form.get('remark').setValidators([Validators.required]);
    // this.form.get('reasonForExit').setValidators([Validators.required]);
    // console.log(endDate);
    // if(endDate !== '31-Dec-9999'){
    //   this.form.get('remark').setValidators([Validators.required]);
    //   this.form.get('reasonForExit').setValidators([Validators.required]);
    // } else {
    //   this.form.remark.clearValidators();
    //   this.form.reasonForExit.clearValidators();
    // }
    //  this.form.get['remark'].setValidator([Validators.required]);
    //  this.form.get['remark'].updateValueAndValidity();
    //  this.form.get('reasonForExit').setValidator([Validators.required]);
    //  this.form.get('reasonForExit').updateValueAndValidity();
    // sweetalert7(message: any) {
    //   Swal.fire({
    //     text: message,
    //   });
    // }
    // sweetalertWarning(message: any) {
    //   Swal.fire({
    //     title: message,
    //     showCloseButton: true,
    //     showCancelButton: false,
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     background: '#e68a00',
    //     icon: 'warning',
    //     timer: 15000,
    //     timerProgressBar: true,
    //   });
    // }
    // sweetalertInfo(message: any) {
    //   Swal.fire({
    //     title: message,
    //     showCloseButton: true,
    //     showCancelButton: false,
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     icon: 'info',
    //     timer: 15000,
    //     timerProgressBar: true,
    //   });
    // }
    // sweetalertMasterSuccess(message: any, text: any) {
    //   Swal.fire({
    //     title: message,
    //     text: text,
    //     showCloseButton: true,
    //     showCancelButton: false,
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     icon: 'success',
    //     timer: 15000,
    //     timerProgressBar: true,
    //   });
    // }
    // sweetalertError(message: any) {
    //   Swal.fire({
    //     title: message,
    //     showCloseButton: true,
    //     showCancelButton: false,
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     icon: 'error',
    //     timer: 15000,
    //     timerProgressBar: true,
    //   });
    // }
    CompanyGroupMasterComponent.prototype.deactivateRemark = function () {
        if (this.form.get('companyGroupActive').value === false) {
            this.form.get('remark').enable();
            /// this.hideRemarkDiv = false;
            this.form.get('remark').setValidators([forms_1.Validators.required]);
        }
        else {
            // this.form.get('remark').clearValidators();
            //  this.hideRemarkDiv = true;
            // this.form.get('remark').disable();
            // this.form.get('remark').reset();
        }
    };
    // get remark1(){
    //   const temp = <FormGroup>this.form.control.remark;
    //   return temp.controls.remark;
    // }
    // get reasonForExit1(){
    //   const temp = <FormGroup>this.form.control.reasonForExit;
    //   return temp.controls.reasonForExit;
    // }
    CompanyGroupMasterComponent.prototype.onSelectSetToNull = function () {
        console.log('on select null');
        this.form('scale').setValue = '';
    };
    // focusOnEndDate() {
    //   this.endDate1.nativeElement.focus();
    // }
    // sweetAlertDeletePopUpBoxConfirmation() {
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     toast: true,
    //     position: 'top-end',
    //     icon: 'warning',
    //     showConfirmButton: true,
    //     text: 'This record will be permanantly deleted!',
    //   }).then(function (value) {
    //     if (value) {
    //       console.log(value);
    //       if (value.isConfirmed == true) {
    //         console.log('delete record');
    //       }
    //     }
    //   });
    // }
    CompanyGroupMasterComponent.prototype.isShortNameContainsOnlySpecialCharacter = function () {
        this.shortNameInvalid = false;
        var splChars = "*|,\":<>[]{}`\!';()@&^$#%1234567890 ";
        for (var i = 0; i < this.form.get('shortName').value.length; i++) {
            if (splChars.indexOf(this.form.get('shortName').value.charAt(i)) != -1) {
                //alert("Illegal characters detected!");
                this.shortNameInvalid = true;
            }
            else {
                this.shortNameInvalid = false;
                break;
            }
        }
        if (this.shortNameInvalid == true) {
            this.form.get('shortName').status = 'INVALID';
        }
    };
    CompanyGroupMasterComponent.prototype.isContainsOnlySpecialCharacter = function () {
        this.companyGroupNameInvalid = false;
        console.log('isContainsOnlySpecialCharacter');
        var splChars = "* |,\":<>[]{}^`\!';()@&$#%1234567890";
        for (var i = 0; i < this.form.get('companyGroupName').value.length; i++) {
            if (splChars.indexOf(this.form.get('companyGroupName').value.charAt(i)) != -1) {
                //alert("Illegal characters detected!");
                this.companyGroupNameInvalid = true;
            }
            else {
                this.companyGroupNameInvalid = false;
                break;
            }
        }
        if (this.companyGroupNameInvalid == true) {
            //this.companyGroupNameInvalid = false;
            //   this.form.get('companyGroupName').inValid = true;
            this.form.get('companyGroupName').status = 'INVALID';
        }
    };
    CompanyGroupMasterComponent.prototype.keyPressedSpaceNotAllow = function (event) {
        var pattern = /[ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    __decorate([
        core_1.ViewChild("endDate1")
    ], CompanyGroupMasterComponent.prototype, "endDate1");
    CompanyGroupMasterComponent = __decorate([
        core_1.Component({
            selector: 'app-company-group-master',
            templateUrl: './company-group-master.component.html',
            styleUrls: ['./company-group-master.component.scss']
        })
    ], CompanyGroupMasterComponent);
    return CompanyGroupMasterComponent;
}());
exports.CompanyGroupMasterComponent = CompanyGroupMasterComponent;
