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
    function CycleCreationComponent(modalService, datepipe, companySetttingService, formBuilder, alertService) {
        this.modalService = modalService;
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
        // today: any = new Date();
        this.updateFlag = false;
        // editedRecordIndexId: number = 0;
        this.todisabletodate = false;
        // declarationGridData: Array<any> = [];
        // familyMemberGroup: Array<any> = [];
        //frequencyOfPayment: Array<any> = [];
        //InstitutionNames: Array<any> = [];
        // transactionDetail: Array<any> = [];
        // uploadGridData: Array<any> = [];
        // familyMemberName: Array<any> = [];
        //Index: number;
        // showUpdateButton: boolean;
        // tabIndex = 0;
        // radioSelected: string;
        //familyRelationSame: boolean;
        //enableEditRow: number;
        //enableAddRow: number;
        // enablePolicyTable: number;
        //enableCheckbox: number;
        //enableCheckboxFlag: number;
        // enableCheckboxFlag3: boolean;
        // addRow1: boolean;
        // addRow2: number;
        //previousEmployeName: Array<any> = [];
        //totalDeclaredAmount: any;
        //totalActualAmount: any;
        //futureNewPolicyDeclaredAmount: number;
        //grandTotalDeclaredAmount: number;
        //grandTotalActualAmount: number;
        // grandDeclarationTotal: number;
        //grandActualTotal: number;
        //  grandRejectedTotal: number;
        //  grandApprovedTotal: number;
        // grandTabStatus: boolean;
        //  isCheckAll: boolean;
        // isDisabled: boolean;
        // enableSelectAll: boolean;
        this.displayUploadFile = false;
        // activeFrequencyList: Array<any> = [];
        // ServicesList: Array<any> = [];
        this.CycleDefinitionList = [];
        this.CycleCreationList = [];
        this.CycleCreationList1 = [];
        this.CycleDefinitionByid = [];
        this.previewCycleList = [];
        this.serviceName = [];
        this.minDate = new Date();
        this.id = 0;
        this.CycleupdateFlag1 = false;
        this.disabled = true;
        this.editRowID = '';
        this.adjustedToNextCycle = false;
        this.businessCycleList = [];
        this.data = [];
    }
    CycleCreationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cycleCreationForm = this.formBuilder.group({
            businessCycleDefinitionId: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.companySetttingService.getAllCycleDefinition().subscribe(function (res) {
            _this.CycleDefinitionList = res.data.results;
        });
        this.getAllCycleCreationList();
        this.getAllCycleCreation();
    };
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
            _this.cycleCreationForm.reset();
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
            _this.name = response.data.results[0].businessCycleDefinition.name;
            // this.business = response.data.results[0].businessYear;
            _this.Frequency = response.data.results[0].businessCycleDefinition.frequency.name;
            _this.fromDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
            _this.toDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;
            _this.businessCycleDefinitionId = businessCycleDefinitionId;
            // this.businessYearUpdate = BusinessYear;
            _this.data = _this.CycleDefinitionByid;
            _this.adjustedToNextCycle = false;
            _this.getAllCycleCreation();
            _this.CycleCreationForm.reset();
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
    CycleCreationComponent.prototype.addCycleCreation = function () {
        var _this = this;
        this.previewCycleList = [];
        // businessCycleDefinitionId: number;
        // businessCycleDefinition: any;
        // businessYear: number;
        var addCycleCreation = Object.assign({}, this.cycleCreationForm.value);
        console.log('add cycle creation', addCycleCreation);
        //
        //
        var businessCycleDefinition = {
            businessCycleDefinitionId: addCycleCreation.businessCycleDefinitionId,
            businessYear: addCycleCreation.businessYear
        };
        console.log(JSON.stringify(businessCycleDefinition));
        // if ( addCycleCreation.id == undefined || addCycleCreation.id == 0 ) {
        this.companySetttingService.AddCycleCreation(businessCycleDefinition).subscribe(function (res) {
            console.log('add cycle creation', res);
            _this.previewCycleList = res.data.results;
            _this.businessCycleDefinitionId = res.data.results[0].businessCycleDefinition.businessYearDefinitionId;
            _this.Previewname = res.data.results[0].businessCycleDefinition.cycleName;
            // this.Previewbusiness = res.data.results[0].businessYear;
            _this.PreviewFrequency = res.data.results[0].businessCycleDefinition.frequency.name;
            _this.PreviewfromDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
            _this.PreviewtoDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;
            if (res.status.code == '200') {
                _this.flag = true;
            }
            else {
                _this.flag = false;
            }
            //  this.getAllCycleCreation();
            _this.cycleCreationForm.reset();
            _this.UploadModal2(_this.template2);
        }, function (error) {
            _this.alertService.sweetalertError(error["error"]["status"]["message"]);
        });
        // call this post service
        // businessCycleDefinitionId
        // const businessCycleDefinition1 = {
        //   businessCycleDefinition: {
        //     id: addCycleCreation.businessCycleDefinitionId
        //   },
        //   businessYear: addCycleCreation.businessYear
        // };
        // console.log( businessCycleDefinition1 );
        // this.companySetttingService.addBusiness_cycle_cycle_definition( businessCycleDefinition1 ).subscribe( ( res: any ) => {
        //   console.log( 'res', res );
        // },
        //   ( error: any ) => {
        //     this.alertService.sweetalertError( error["error"]["status"]["message"] );
        //   } );
    };
    CycleCreationComponent.prototype.UploadModal2 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    CycleCreationComponent.prototype.UploadModal1 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    CycleCreationComponent.prototype.getBussinessyearName = function (name) {
        this.Name = name;
    };
    CycleCreationComponent.prototype.CreateMoreCycleforNextYear = function () {
        // const addCycleCreation: saveCycleCreation = Object.assign( {}, this.CycleCreationForm.value );
        // addCycleCreation.businessCycleDefinitionId = this.businessCycleDefinitionIdforMoreCycle;
        // addCycleCreation.businessYear = this.BusinessYearformorecycle;
        // this.companySetttingService.AddCycleCreation( addCycleCreation ).subscribe( ( res: any ) => {
        //   // this.sweetalertMasterSuccess( "Success..!!", res.status.message );
        //   this.getAllCycleCreation();
        //   this.CycleCreationForm.reset();
        // },
        //   ( error: any ) => {
        //     //  this.sweetalertError( error["error"]["status"]["message"] );
        //     // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
        //   } );
    };
    CycleCreationComponent.prototype.getBussinessyear = function (bussinessyear, businessCycleDefinitionid) {
        ;
        this.BusinessYearformorecycle = ++bussinessyear;
        this.businessCycleDefinitionIdforMoreCycle = businessCycleDefinitionid;
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
