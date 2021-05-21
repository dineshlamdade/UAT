"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CycleDefinitionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CycleDefinitionComponent = /** @class */ (function () {
    function CycleDefinitionComponent(companySettings, formBuilder, alertService, modalService) {
        this.companySettings = companySettings;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.modalService = modalService;
        this.CycleupdateFlag = false;
        this.isViewAddDays = false;
        this.CycleupdateFlag1 = false;
        this.ServicesList = [];
        this.CycleDefinitionList = [];
        this.serviceName = [];
        this.activeFrequencyList = [];
        this.disabled = true;
        this.BusinessyearList = [];
        this.dropdownSettings = {};
        this.serviceNameDropDownList = [];
        this.Multiselectflag = false;
        this.updateFlag = false;
        this.sortedFrequencyList = [];
    }
    CycleDefinitionComponent.prototype.ngOnInit = function () {
        this.cycleDefinitionForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            cycleName: new forms_1.FormControl('', forms_1.Validators.required),
            businessYearDefinitionId: new forms_1.FormControl('', forms_1.Validators.required),
            frequencyMasterId: new forms_1.FormControl('', forms_1.Validators.required),
            addDays: new forms_1.FormControl(''),
            // serviceName: new FormControl( '', Validators.required ),
            services: new forms_1.FormControl(''),
            yearDefinition: new forms_1.FormControl({ value: '', disabled: true }),
            multiselectServices: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'serviceMasterId',
            textField: 'serviceName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        this.getAllCycleDefinition();
        this.getActiveFrequency();
        this.getAllBusinessYear();
        this.getAllServiceName();
    };
    CycleDefinitionComponent.prototype.getAllServiceName = function () {
        var _this = this;
        this.serviceNameDropDownList = [];
        this.companySettings.getAllServicesName().subscribe(function (res) {
            _this.serviceNameDropDownList = res.data.results;
        });
    };
    CycleDefinitionComponent.prototype.getAllBusinessYear = function () {
        var _this = this;
        this.BusinessyearList = [];
        this.companySettings.getAllBusinessYear().subscribe(function (res) {
            _this.BusinessyearList = res.data.results;
        });
    };
    CycleDefinitionComponent.prototype.getAllCycleDefinition = function () {
        var _this = this;
        this.CycleDefinitionList = [];
        this.companySettings.getAllCycleDefinition().subscribe(function (res) {
            _this.CycleDefinitionList = res.data.results;
            console.log('cycle creation res', _this.CycleDefinitionList);
        });
    };
    // get all  activeFrequencyList
    CycleDefinitionComponent.prototype.getActiveFrequency = function () {
        var _this = this;
        this.activeFrequencyList = [];
        this.companySettings.getActiveFrequency().subscribe(function (res) {
            _this.activeFrequencyList = res.data.results;
        }, function (error) {
        }, function () {
            // for ( let i = 0; i < this.activeFrequencyList.length; i++ ){
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'daily'; }) !== -1) {
                console.log('in daily');
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'daily'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'weekly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'weekly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'biweeekly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'biweeekly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'semi-monthly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'semi-monthly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'monthly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'monthly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'quarterly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'quarterly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'half-yearly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'half-yearly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'yearly'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'yearly'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            if (_this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() === 'adhoc'; }) !== -1) {
                var index = _this.activeFrequencyList.findIndex(function (o) { return o.name.toLowerCase() == 'adhoc'; });
                _this.sortedFrequencyList.push(_this.activeFrequencyList[index]);
            }
            console.log(' this.sortedFrequencyList', _this.sortedFrequencyList);
        });
    };
    // add new cycle-definition & update
    CycleDefinitionComponent.prototype.addCycleDefinition = function () {
        var _this = this;
        console.log('in addCycleDefinition');
        var addCycleDefinition = Object.assign({}, this.cycleDefinitionForm.value);
        // delete addCycleDefinition.addDays;
        if (addCycleDefinition.id == undefined || addCycleDefinition.id == 0 || addCycleDefinition.id == null) {
            // const employerContributionMethod = this.cycleDefinitionForm;
            // console.log( 'employerContributionMethod', employerContributionMethod );
            //  addCycleDefinition.serviceName = [];
            this.ServicesList.forEach(function (f) {
                //   addCycleDefinition.serviceName.push( f );
            });
            console.log(JSON.stringify(addCycleDefinition));
            this.companySettings.AddCycleDefinition(addCycleDefinition).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllCycleDefinition();
                _this.CancelBusiness();
                _this.resetCycledefinition();
            }, function (error) {
                //  this.sweetalertError(error["error"]["status"]["message"]);
                _this.alertService.sweetalertError(error['error']['status']['message']);
            });
            this.ServicesList = [];
            this.serviceName = [];
            this.cycleDefinitionForm.reset();
        }
        else {
            addCycleDefinition.businessCycleDefinitionId = addCycleDefinition.id;
            this.serviceName = [];
            //  this.serviceName.push(addCycleDefinition.services)
            //  addCycleDefinition.serviceName = this.serviceName;
            //  delete addCycleDefinition.serviceName;
            // addCycleDefinition.serviceName = this.cycleDefinitionForm.get( 'services' ).value;
            this.serviceName.push(this.cycleDefinitionForm.get('services').value);
            // this.serviceName.push( this.cycleDefinitionForm.get( 'services' ).value );
            // addCycleDefinition.serviceName = this.serviceName;
            console.log('json', JSON.stringify(addCycleDefinition));
            this.companySettings.UpdateCycleDefinition(addCycleDefinition).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllCycleDefinition();
                _this.cycleDefinitionForm.reset();
                _this.CycleupdateFlag = false;
                _this.CycleupdateFlag1 = false;
            }, function (error) {
                _this.alertService.sweetalertError(error['error']['status']['message']);
            });
        }
    };
    CycleDefinitionComponent.prototype.onChangeFrequencyFromCycleDefinition = function (event) {
        console.log(event);
        // console.log(this.selectedFrequency);
        var findIndex = this.activeFrequencyList.findIndex(function (o) { return o.id == event; });
        console.log('s', findIndex);
        if (this.activeFrequencyList[findIndex].name.toLowerCase() == 'adhoc') {
            console.log('i');
            this.isViewAddDays = true;
            // this.cycleDefinitionForm.controls['addDays'].setValidators([Validators.required]);
        }
        else {
            console.log('i3');
            this.isViewAddDays = false;
            //
            // this.cycleDefinitionForm.patchValue:[{' addDays': null, disabled: true }],
            //     const control = new FormControl('Nancy');
            this.cycleDefinitionForm.patchValue({ addDays: null });
            this.cycleDefinitionForm.get('addDays').clearValidators();
            this.cycleDefinitionForm.get('addDays').updateValueAndValidity();
        }
    };
    CycleDefinitionComponent.prototype.CancelBusiness = function () {
        this.cycleDefinitionForm;
        this.disabled = true;
        this.cycleDefinitionForm.reset();
        this.updateFlag = false;
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;
        this.isViewAddDays = false;
        this.cycleDefinitionForm.patchValue({
            id: null,
            cycleName: '',
            businessYearDefinitionId: '',
            frequencyMasterId: '',
            addDays: '',
            services: ''
        });
        this.cycleDefinitionForm.controls.multiselectServices.setValidators(forms_1.Validators.required);
        this.cycleDefinitionForm.controls.multiselectServices.updateValueAndValidity();
    };
    CycleDefinitionComponent.prototype.GetCycleDefinitionbyIdDisable = function (id) {
        var _this = this;
        this.CycleupdateFlag = true;
        this.CycleupdateFlag1 = false;
        this.disabled = false;
        this.companySettings.GetCycleDefinitionById(id)
            .subscribe(function (response) {
            _this.cycleDefinitionForm.patchValue({ id: response.data.results[0].id });
            _this.cycleDefinitionForm.patchValue({ cycleName: response.data.results[0].cycleName.split('_')[0] });
            _this.cycleDefinitionForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId });
            _this.cycleDefinitionForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
            _this.cycleDefinitionForm.patchValue({ services: response.data.results[0].serviceName });
            _this.cycleDefinitionForm.patchValue({ addDays: response.data.results[0].addDays });
            var index = _this.BusinessyearList.findIndex(function (o) { return o.businessYearDefinitionId == response.data.results[0].businessYearDefinition.businessYearDefinitionId; });
            _this.cycleDefinitionForm.patchValue({
                yearDefinition: response.data.results[0].businessYearDefinition.fullFromDate + ' / ' + response.data.results[0].businessYearDefinition.fullToDate
            });
            _this.cycleDefinitionForm.controls.multiselectServices.clearValidators();
            _this.cycleDefinitionForm.controls.multiselectServices.updateValueAndValidity();
            _this.cycleDefinitionForm.disable();
        });
        // this.cycleDefinitionForm.patchValue( { businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId } );
    };
    CycleDefinitionComponent.prototype.GetCycleDefinitionbyId = function (id) {
        // here remove validation
        var _this = this;
        this.CycleupdateFlag = true;
        this.CycleupdateFlag1 = true;
        this.companySettings.GetCycleDefinitionById(id)
            .subscribe(function (response) {
            console.log('xx');
            _this.cycleDefinitionForm.patchValue({ id: response.data.results[0].id });
            _this.cycleDefinitionForm.patchValue({ cycleName: response.data.results[0].cycleName.split('_')[0] });
            _this.cycleDefinitionForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.businessYearDefinitionId });
            _this.cycleDefinitionForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
            _this.cycleDefinitionForm.patchValue({ services: response.data.results[0].serviceName });
            _this.cycleDefinitionForm.patchValue({ addDays: response.data.results[0].addDays });
            _this.cycleDefinitionForm.patchValue({
                yearDefinition: response.data.results[0].businessYearDefinition.fullFromDate + ' / ' + response.data.results[0].businessYearDefinition.fullToDate
            });
            _this.cycleDefinitionForm.controls.multiselectServices.clearValidators();
            _this.cycleDefinitionForm.controls.multiselectServices.updateValueAndValidity();
        });
    };
    CycleDefinitionComponent.prototype.resetCycledefinition = function () {
        console.log(this.cycleDefinitionForm);
        //  this.cycleDefinitionForm.reset();
        // this.cycleDefinitionForm.patchValue({ serviceName: [null] });
        // this.ServicesList=[];
    };
    CycleDefinitionComponent.prototype.onItemSelect = function (item) {
        console.log(item);
        this.Multiselectflag = true;
        this.ServicesList.push(item.serviceName);
        console.log(item);
    };
    CycleDefinitionComponent.prototype.onItemDeSelect = function (item) {
        var index = this.ServicesList.indexOf(item.serviceName);
        if (index != -1) {
            this.ServicesList.splice(index, 1);
        }
    };
    CycleDefinitionComponent.prototype.onSelectAll = function (item) {
        var _this = this;
        this.ServicesList = [];
        // this.serviceNameDropDownList.forEach( function ( f ) {
        //   console.log( 'f', f );
        //   //  this.ServiceList.push( f );
        // } );
        item.forEach(function (element) {
            _this.ServicesList.push(element.serviceName);
        });
        console.log(item);
    };
    CycleDefinitionComponent.prototype.DeleteCycleDefinitionById = function (id) {
        var _this = this;
        console.log('deleted id is', id);
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;
        this.companySettings.DeleteCycleDefinitionById(id)
            .subscribe(function (response) {
            _this.alertService.sweetalertMasterSuccess(response.status.message, '');
            _this.getAllCycleDefinition();
        });
    };
    CycleDefinitionComponent.prototype.keyPressedSpaceNotAllow = function (event) {
        var pattern = /[ '_',  ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    CycleDefinitionComponent.prototype.onChangeBusinessYear = function (evt) {
        console.log(evt);
        if (evt == '') {
            this.cycleDefinitionForm.patchValue({
                yearDefinition: ''
            });
        }
        else {
            var index = this.BusinessyearList.findIndex(function (o) { return o.businessYearDefinitionId == evt; });
            this.cycleDefinitionForm.patchValue({
                yearDefinition: this.BusinessyearList[index].fullFromDate + ' / ' + this.BusinessyearList[index].fullToDate
            });
        }
    };
    CycleDefinitionComponent.prototype.UploadModal1 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    CycleDefinitionComponent.prototype.getCycleName = function (name) {
        // this.CycleName = name;
    };
    __decorate([
        core_1.ViewChild('multiSelect')
    ], CycleDefinitionComponent.prototype, "multiSelect");
    CycleDefinitionComponent = __decorate([
        core_1.Component({
            selector: 'app-cycle-definition',
            templateUrl: './cycle-definition.component.html',
            styleUrls: ['./cycle-definition.component.scss']
        })
    ], CycleDefinitionComponent);
    return CycleDefinitionComponent;
}());
exports.CycleDefinitionComponent = CycleDefinitionComponent;
