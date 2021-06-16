"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessYearComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var BusinessYearComponent = /** @class */ (function () {
    function BusinessYearComponent(datepipe, companySetttingService, formBuilder, alertService, modalService) {
        this.datepipe = datepipe;
        this.companySetttingService = companySetttingService;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.modalService = modalService;
        this.users1 = [
            { srno: '1', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
            { srno: '2', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'MM', remark: 'Remark1' },
            { srno: '3', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
            { srno: '4', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PA', remark: 'Remark1' },
        ];
        this.editedRecordIndexId = 0;
        this.BusinessYear = [
            { label: '2010', value: '2010' },
            { label: '2011', value: '2011' },
            { label: '2012', value: '2012' },
            { label: '2013', value: '2013' },
            { label: '2014', value: '2014' },
            { label: '2015', value: '2015' },
            { label: '2016', value: '2016' },
            { label: '2017', value: '2017' },
            { label: '2018', value: '2018' },
            { label: '2019', value: '2019' },
            { label: '2020', value: '2020' },
            { label: '2021', value: '2021' },
            { label: '2022', value: '2022' },
            { label: '2023', value: '2023' },
            { label: '2024', value: '2024' },
            { label: '2025', value: '2025' },
            { label: '2026', value: '2026' },
            { label: '2027', value: '2027' },
            { label: '2028', value: '2028' },
            { label: '2029', value: '2029' },
            { label: '2030', value: '2030' },
        ];
        this.BusinessyearList = [];
    }
    BusinessYearComponent.prototype.ngOnInit = function () {
        this.BusinessYearform = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            fromDate: new forms_1.FormControl('', forms_1.Validators.required),
            toDate: new forms_1.FormControl('', forms_1.Validators.required),
            businessYear: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.getAllBusinessyear();
    };
    //add & update new BusinessYear
    BusinessYearComponent.prototype.addBusinessYear = function () {
        var _this = this;
        var addBusinessYear = Object.assign({}, this.BusinessYearform.value);
        if (this.editedRecordIndexId == 0) {
            delete addBusinessYear.id;
            addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, 'dd-MMM');
            addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, 'dd-MMM');
            console.log(JSON.stringify(addBusinessYear));
            this.companySetttingService.AddBusinessYear(addBusinessYear).subscribe(function (res) {
                if (res.status.code == "503") {
                    _this.alertService.sweetalertError(res.status.message);
                }
                else {
                    _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                }
                _this.getAllBusinessyear();
                _this.BusinessYearform.reset();
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
            addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
            addBusinessYear.description = this.BusinessYearform.get('description').value;
            addBusinessYear.businessYearDefinitionId = this.editedRecordIndexId;
            console.log('desc', this.BusinessYearform.get('description').value);
            console.log(JSON.stringify(addBusinessYear));
            this.companySetttingService.UpdateBusinessYear(addBusinessYear).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllBusinessyear();
                _this.BusinessYearform.reset();
                _this.updateFlag = false;
                _this.editedRecordIndexId = 0;
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    //get all Businessyear
    BusinessYearComponent.prototype.getAllBusinessyear = function () {
        var _this = this;
        this.BusinessyearList = [];
        this.companySetttingService.getAllBusinessYear().subscribe(function (res) {
            _this.BusinessyearList = res.data.results;
            console.log('Business year list', _this.BusinessyearList);
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    BusinessYearComponent.prototype.DeleteBussinessyearById = function (id) {
        var _this = this;
        console.log('delete', id);
        this.updateFlag = false;
        this.companySetttingService.DeleteBusinessYearById(id)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllBusinessyear();
            _this.BusinessYearform.reset();
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    BusinessYearComponent.prototype.ResetBusiness = function () {
        this.editedRecordIndexId = 0;
        this.BusinessYearform.reset();
        this.BusinessYearform.enable();
        this.updateFlag = false;
        this.BusinessYearform.get('description').enable();
        this.BusinessYearform.get('businessYear').setValue('');
    };
    // http://localhost:8086/hrms/v1/business-year/27
    BusinessYearComponent.prototype.GetBussinessyearById = function (id) {
        var _this = this;
        console.log('gettt');
        this.editedRecordIndexId = id;
        console.log(id, this.BusinessyearList);
        this.updateFlag = true;
        this.companySetttingService.GetBusinessYearById(id)
            .subscribe(function (response) {
            console.log(response);
            _this.BusinessYearform.patchValue({ id: response.data.results[0].businessYearDefinitionId });
            _this.BusinessYearform.patchValue({ description: response.data.results[0].description });
            _this.BusinessYearform.patchValue({ fromDate: response.data.results[0].fromDate });
            _this.BusinessYearform.patchValue({ toDate: response.data.results[0].toDate });
            _this.BusinessYearform.patchValue({ businessYear: response.data.results[0].businessYear });
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
        this.BusinessYearform.get('description').disable();
    };
    BusinessYearComponent.prototype.UploadModal1 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    BusinessYearComponent = __decorate([
        core_1.Component({
            selector: 'app-business-year',
            templateUrl: './business-year.component.html',
            styleUrls: ['./business-year.component.scss']
        })
    ], BusinessYearComponent);
    return BusinessYearComponent;
}());
exports.BusinessYearComponent = BusinessYearComponent;
