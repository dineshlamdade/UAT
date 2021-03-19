"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CycleCreationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CycleCreationComponent = /** @class */ (function () {
    //template2:TemplateRef<any>;
    //template2: ElementRef;
    function CycleCreationComponent(datepipe, companySetttingService, formBuilder, alertService) {
        this.datepipe = datepipe;
        this.companySetttingService = companySetttingService;
        this.formBuilder = formBuilder;
        this.alertService = alertService;
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
        this.today = new Date();
        this.updateFlag = false;
        this.editedRecordIndexId = 0;
        this.todisabletodate = false;
        // summaryGridData: Array<any> = [];
        // summaryComputationGridDate: any;
        // masterGridData: Array<any> = [];
        //paymentDetailGridData: Array<any> = [];
        this.declarationGridData = [];
        this.familyMemberGroup = [];
        this.frequencyOfPayment = [];
        // BusinessYear: Array<any> = [];
        this.InstitutionNames = [];
        this.transactionDetail = [];
        this.uploadGridData = [];
        //transactionInstitutionNames: Array<any> = [];
        this.familyMemberName = [];
        this.tabIndex = 0;
        this.previousEmployeName = [];
        ////// ---------service
        // declarationService: DeclarationService;
        this.displayUploadFile = false;
        this.uploadedFiles = [];
        this.loaded = 0;
        this.activeFrequencyList = [];
        this.BusinessYear = [];
        this.ServicesList = [];
        //ServicesList: serviceDetails[];
        this.CycleDefinitionList = [];
        this.CycleCreationList = [];
        this.CycleCreationList1 = [];
        this.CycleDefinitionByid = [];
        this.previewCycleList = [];
        //tableData: any =[];
        this.serviceName = [];
        //selectedLevel;
        this.minDate = new Date();
        this.id = 0;
        this.CycleupdateFlag1 = false;
        this.disabled = true;
        //demoData: Array<getchapter> = [];
        this.editRowID = '';
        this.adjustedToNextCycle = false;
        //businessCycleList=[];
        this.businessCycleList = [];
        this.data = [];
        this.cycelCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null, forms_1.Validators.required),
            fromDate: new forms_1.FormControl(null, forms_1.Validators.required),
            toDate: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    CycleCreationComponent.prototype.ngOnInit = function () { };
    CycleCreationComponent.prototype.DeleteCycleCreationById = function (businessCycleDefinitionId, BusinessYear) {
        var _this = this;
        this.updateFlag = false;
        this.companySetttingService.DeleteCycleCreationById(businessCycleDefinitionId, BusinessYear)
            .subscribe(function (response) {
            _this.getAllCycleCreation();
            _this.CycleCreationForm.reset();
        });
    };
    CycleCreationComponent.prototype.deletePreviewCycleDiscard = function () {
        var _this = this;
        ;
        this.updateFlag = false;
        this.companySetttingService.DeletePreviewCycleDiscard(this.businessCycleDefinitionId, this.Previewbusiness)
            .subscribe(function (response) {
            _this.getAllCycleCreation();
            _this.cycelCreationForm.reset();
        });
    };
    CycleCreationComponent.prototype.GetCycleCreationById = function (businessCycleDefinitionId, BusinessYear) {
        var _this = this;
        this.todisabletodate = true;
        this.updateFlag = false;
        this.CycleDefinitionByid = [];
        this.companySetttingService.getCycleCreationById(businessCycleDefinitionId, BusinessYear)
            .subscribe(function (response) {
            _this.CycleDefinitionByid = response.data.results;
            console.log('cycle creation array', _this.CycleDefinitionByid);
            //   this.CycleDefinitionByid.forEach(element => {
            //     element.fromDate = new Date(element.fromDate);
            //     element.toDate = new Date(element.toDate);
            // });
            // this.CycleCreationForm.patchValue({ fromDate: response.data.results[0].fromDate });
            // this.CycleCreationForm.patchValue({ toDate: response.data.results[0].toDate });
            //this.demoData=response['result'][0];
            // this.editformDate=response.data.results[0].fromDate;
            _this.name = response.data.results[0].businessCycleDefinition.name;
            _this.business = response.data.results[0].businessYear;
            _this.Frequency = response.data.results[0].businessCycleDefinition.frequency.name;
            _this.fromDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
            _this.toDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;
            _this.businessCycleDefinitionId = businessCycleDefinitionId;
            _this.businessYearUpdate = BusinessYear;
            _this.data = _this.CycleDefinitionByid;
            _this.adjustedToNextCycle = false;
            // this.getAllCycleCreation();
            // this.CycleCreationForm.reset();
        });
    };
    CycleCreationComponent.prototype.ForcetoYearEndofcycleCreation = function () {
        var _this = this;
        // this.updateFlag=false;
        this.data.forEach(function (element) {
            element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        });
        var cycledata1 = Object.assign({});
        cycledata1.businessCycleList = this.data;
        cycledata1.adjustedToNextCycle = this.adjustedToNextCycle;
        this.companySetttingService.EdittoDate(this.businessCycleDefinitionId, this.businessYearUpdate, cycledata1)
            .subscribe(function (res) {
            _this.alertService.sweetalertMasterSuccess(res.status.message, '');
            _this.todisabletodate = true;
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    CycleCreationComponent.prototype.getAllCycleCreation = function () {
        var _this = this;
        this.CycleCreationList = [];
        this.companySetttingService.getAllCycleDefinition().subscribe(function (res) {
            _this.CycleCreationList = res.data.results;
        });
    };
    CycleCreationComponent.prototype.getAllCycleCreationList = function () {
        var _this = this;
        this.CycleCreationList1 = [];
        this.companySetttingService.getAllCycleCreation().subscribe(function (res) {
            _this.CycleCreationList1 = res.data.results;
        });
    };
    __decorate([
        core_1.ViewChild('template2')
    ], CycleCreationComponent.prototype, "template2");
    CycleCreationComponent = __decorate([
        core_1.Component({
            selector: 'app-cycle-creation',
            templateUrl: './cycle-creation.component.html',
            styleUrls: ['./cycle-creation.component.scss']
        })
    ], CycleCreationComponent);
    return CycleCreationComponent;
}());
exports.CycleCreationComponent = CycleCreationComponent;
