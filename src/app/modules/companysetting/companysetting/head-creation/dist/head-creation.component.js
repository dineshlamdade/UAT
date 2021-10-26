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
var HeadCreationComponent = /** @class */ (function () {
    function HeadCreationComponent(formBuilder, alertService, headCreationService, document) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.headCreationService = headCreationService;
        this.document = document;
        this.NatureList = [];
        this.headCreationList = [];
        this.TypeList = [];
        this.HeadCreationList = [];
        this.viewCancelButton = false;
        this.disabled = true;
        this.categoryList = [{ value: 'Reimbursement', label: 'Reimbursement' }, { value: 'Statutory', label: 'Statutory' }];
        this.NatureList = [
            { label: 'Earning', value: 'Earning' },
            { label: 'Deduction', value: 'Deduction' },
            { label: 'Perquisite', value: 'Perquisite' },
        ];
    }
    HeadCreationComponent.prototype.ngOnInit = function () {
        this.HeadCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            shortName: new forms_1.FormControl('', forms_1.Validators.required),
            headNature: new forms_1.FormControl('', forms_1.Validators.required),
            standardName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            category: new forms_1.FormControl(''),
            //  statutory: new FormControl( 'false' ),
            type: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.getAllHeadCreation();
    };
    // get All HeadCreation
    HeadCreationComponent.prototype.getAllHeadCreation = function () {
        var _this = this;
        this.headCreationService.getAllHeadCreation().subscribe(function (res) {
            var i = 1;
            _this.HeadCreationList = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    SrNo: i++,
                    globalAttributeMasterId: element.globalAttributeMasterId,
                    code: element.code,
                    attributeNature: element.attributeNature,
                    numberOfOption: element.numberOfOption,
                    description: element.description
                };
                // let optionList = [];
                // if ( element.optionList.length !== undefined ) {
                //   for ( let i = 0; i < element.optionList.length; i++ ) {
                //     if ( i == 0 ) {
                //       optionList.push( element.optionList[i].optionValue );
                //     } else {
                //       optionList.push( +',' + element.optionList[i].optionValue );
                //     }
                //   }
                // }
                // obj.optionList = optionList;
                _this.headCreationList.push(obj);
            });
        });
    };
    // get HeadCreation by Id
    HeadCreationComponent.prototype.GetHeadCreationbyIdDisable = function (id) {
        var _this = this;
        // this.CycleupdateFlag=true;
        // this.CycleupdateFlag1=false;
        this.disabled = false;
        this.viewCancelButton = true;
        this.headCreationService.GetHeadCreationById(id)
            .subscribe(function (response) {
            _this.HeadCreationForm.patchValue({ id: response.data.results[0].headMasterId });
            _this.HeadCreationForm.patchValue({ standardName: response.data.results[0].standardName });
            _this.HeadCreationForm.patchValue({ description: response.data.results[0].description });
            _this.HeadCreationForm.patchValue({ shortName: response.data.results[0].shortName });
            _this.HeadCreationForm.patchValue({ headNature: response.data.results[0].headNature });
            _this.HeadCreationForm.patchValue({ type: response.data.results[0].type });
            //  this.HeadCreationForm.patchValue( { statutory: ( response.data.results[0].statutory ).toString() } );
            _this.HeadCreationForm.patchValue({ category: response.data.results[0].category });
        });
        this.HeadCreationForm.disable();
    };
    HeadCreationComponent.prototype.addHeadCreation = function () {
        var _this = this;
        var addHeadCreation = Object.assign({}, this.HeadCreationForm.value);
        if (addHeadCreation.id == undefined || addHeadCreation.id == 0) {
            // delete addHeadCreation.id;
            // delete addHeadCreation.type;
            console.log(JSON.stringify(addHeadCreation));
            this.headCreationService.AddHeadCreation(addHeadCreation).subscribe(function (res) {
                _this.alertService.sweetalertMasterSuccess(res.status.message, '');
                _this.getAllHeadCreation();
                _this.CancelHeadCreation();
                // this.HeadCreationForm.patchValue( { statutory: '0' } );
            }, function (error) {
                _this.alertService.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    HeadCreationComponent.prototype.CancelHeadCreation = function () {
        this.HeadCreationForm.enable();
        this.disabled = true;
        this.HeadCreationForm.reset();
        this.viewCancelButton = false;
        // this.HeadCreationForm.patchValue( { statutory: 'false' } );
        this.HeadCreationForm.patchValue({
            headNature: '',
            type: '',
            category: ''
        });
    };
    HeadCreationComponent.prototype.ResetHeadCreation = function () {
        this.HeadCreationForm.reset();
        this.viewCancelButton = false;
        //  this.HeadCreationForm.patchValue( { statutory: 'false' } );
        this.HeadCreationForm.patchValue({
            headNature: '',
            type: '',
            category: ''
        });
    };
    HeadCreationComponent.prototype.onChangeEvent = function (event) {
        this.Name = event.target.value;
        // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
        this.HeadCreationForm.patchValue({ shortName: this.Name });
        // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
        // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
        // }
    };
    HeadCreationComponent.prototype.onChangeNature = function (evt) {
        var _this = this;
        this.TypeList = [];
        console.log(evt);
        this.headCreationService.getByHeadMasterByNature(evt).subscribe(function (res) {
            _this.TypeList = res.data.results;
            console.log(_this.TypeList);
        });
        this.HeadCreationForm.patchValue({ type: '' });
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