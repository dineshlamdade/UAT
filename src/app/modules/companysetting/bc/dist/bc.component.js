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
exports.payrollComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
//sneha
var sweetalert2_1 = require("sweetalert2");
var payrollComponent = /** @class */ (function () {
    //template2:TemplateRef<any>;
    //template2: ElementRef;
    function payrollComponent(formBuilder, Service, datePipe, 
    // private messageService: MessageService,
    http, 
    // private notifyService: NotificationsService,
    datepipe, fileService, payrollService, numberFormat, modalService, document) {
        this.formBuilder = formBuilder;
        this.Service = Service;
        this.datePipe = datePipe;
        this.http = http;
        this.datepipe = datepipe;
        this.fileService = fileService;
        this.payrollService = payrollService;
        this.numberFormat = numberFormat;
        this.modalService = modalService;
        this.document = document;
        this.summaryGridData = [];
        this.masterGridData = [];
        this.paymentDetailGridData = [];
        this.declarationGridData = [];
        this.familyMemberGroup = [];
        this.frequencyOfPayment = [];
        // BusinessYear: Array<any> = [];
        this.InstitutionNames = [];
        this.transactionDetail = [];
        this.uploadGridData = [];
        this.transactionInstitutionNames = [];
        this.familyMemberName = [];
        this.tabIndex = 0;
        this.previousEmployeName = [];
        this.displayUploadFile = false;
        this.uploadedFiles = [];
        this.loaded = 0;
        this.FrequencyList = [];
        this.BusinessYear = [];
        this.ServicesList = [];
        //ServicesList: serviceDetails[];
        this.CycleDefinitionList = [];
        this.CycleCreationList = [];
        this.CycleDefinitionByid = [];
        this.previewCycleList = [];
        //tableData: any =[];
        this.serviceName = [];
        this.dropdownList = [];
        //selectedItems=[];
        // selectedItems:serviceDetails[];
        this.dropdownSettings = {};
        this.BusinessyearList = [];
        this.id = 0;
        this.updateFlag = false;
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;
        this.disabled = true;
        this.todisabletodate = true;
        this.demoData = [];
        this.editRowID = '';
        this.adjustedToNextCycle = false;
        //businessCycleList=[];
        this.businessCycleList = [];
        this.data = [];
        this.Multiselectflag = false;
        this.BusinessYearform = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            fromDate: new forms_1.FormControl('', forms_1.Validators.required),
            toDate: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.ServicesList = [];
        this.CycleDefinationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(10)]],
            businessYearDefinitionId: new forms_1.FormControl('', forms_1.Validators.required),
            frequencyMasterId: new forms_1.FormControl('', forms_1.Validators.required),
            addDays: new forms_1.FormControl('', forms_1.Validators.required),
            services: new forms_1.FormControl(null),
            // serviceName:this.formBuilder.array([])
            //serviceName:[this.ServicesList,[Validators.required]],
            //serviceName:this.ServicesList ,
            serviceName: this.ServicesList.length == 0 ? [forms_1.Validators.required] : [null]
        });
        this.CycleCreationForm = this.formBuilder.group({
            id: new forms_1.FormControl(null, forms_1.Validators.required),
            fromDate: new forms_1.FormControl(null, forms_1.Validators.required),
            toDate: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.CycleCreationForm1 = this.formBuilder.group({
            id: new forms_1.FormControl(null),
            businessCycleDefinitionId: new forms_1.FormControl('', forms_1.Validators.required),
            businessYear: new forms_1.FormControl('', forms_1.Validators.required)
        });
        // this.form = this.formBuilder.group({
        //     institutionName: new FormControl(null, Validators.required),
        //     policyNo: new FormControl(null, Validators.required),
        //     policyholdername: new FormControl(null, Validators.required),
        //     relationship: new FormControl({value: null, disabled: true}),
        //     familyMemberInfoId: new FormControl(null, Validators.required),
        //     active: new FormControl(true, Validators.required),
        //     remark: new FormControl({value: null, disabled: true}, Validators.required),
        //     frequencyOfPayment: new FormControl(null, Validators.required),
        //     premiumAmount: new FormControl(null, Validators.required),
        //     annualAmount: new FormControl({value: null, disabled: true}, Validators.required),
        //     startDate: new FormControl(null, Validators.required),
        //     endDate: new FormControl(null, Validators.required),
        //     ecs: new FormControl('0'),
        //     licMasterPaymentDetailsId: new FormControl(0),
        //     licMasterId: new FormControl(0),
        // });
        this.form1 = this.formBuilder.group({
            //name: [],
            Description: this.formBuilder.array([
                this.formBuilder.control(null)
            ]),
            FromDate: this.formBuilder.array([
                this.formBuilder.control(null)
            ]),
            ToDate: this.formBuilder.array([
                this.formBuilder.control(null)
            ])
        });
        // ----------------sneha-----------------
        // this.frequencyOfPayment = [
        //       {label: 'Monthly', value: 'Monthly'},
        //       {label: 'Yearly', value: 'Yearly'},
        //       {label: 'Half-Yearly', value: 'Halfyearly'},
        //       {label: 'Quarterly', value: 'Quarterly'}
        // ];
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
        this.frequencyOfPayment = [
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Yearly', value: 'Yearly' },
            { label: 'Biweekly', value: 'Biweekly' },
            { label: 'Daily', value: 'Daily' },
            { label: 'Semi Monthly', value: 'Semi Monthly' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Adhoc', value: 'Adhoc' }
        ];
        this.grandTabStatus = false;
        this.isCheckAll = false;
        this.isDisabled = true;
        this.enableSelectAll = false;
    }
    payrollComponent.prototype.onWindowScroll = function () {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    };
    payrollComponent.prototype.scrollToTop = function () {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    };
    payrollComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myDateValue = new Date();
        this.bsConfig = Object.assign({}, { containerClass: 'theme-green custom' });
        this.getFrequency();
        this.getAllBusinessyear();
        this.getAllCycleDefinition();
        this.getAllCycleCreation();
        // getAllServices(): void {
        this.payrollService.getAllServicesName().subscribe(function (res) {
            _this.dropdownList = res.data.results;
        });
        //}
        // this.dropdownList = [
        //     { id: 1, label: 'New' },
        //     { id: 2, label: 'Contacted' },
        //     { id: 3, label: 'Interviewed' },
        //     { id: 4, label: 'Hired' },
        //   ];
        ;
        // this.selectedItems = [
        // ];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'serviceCodeId',
            textField: 'serviceName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
        };
        //   this.dropdownList = [
        //     { id: 1, label: 'New' },
        //     { id: 2, label: 'Contacted' },
        //     { id: 3, label: 'Interviewed' },
        //     { id: 4, label: 'Hired' }
        //   ];
        //   this.dropdownSettings = {
        //     singleSelection: false,
        //     idField: 'id',
        //     textField: 'label',
        //     selectAllText: 'Select All',
        //     unSelectAllText: 'UnSelect All',
        //     itemsShowLimit: 2,
        //     allowSearchFilter: true
        //   };
        this.enableAddRow = 0;
        this.enableCheckboxFlag = 1;
        this.enableCheckboxFlag3 = false;
        this.declarationService = new DeclarationService();
        // Business Financial Year API Call
        this.Service.getBusinessFinancialYear().subscribe(function (res) {
            _this.financialYearStart = res.data.results[0].fromDate;
        });
        // Family Member List API call
        this.Service.getFamilyInfo().subscribe(function (res) {
            _this.familyMemberGroup = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.familyMemberName,
                    value: element.familyMemberName
                };
                _this.familyMemberName.push(obj);
            });
        });
        // Summary get Call on Page Load
        this.Service.getEightyCSummary().subscribe(function (res) {
            //console.log(res.data);
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
        this.Service.getpreviousEmployeName().subscribe(function (res) {
            console.log(res);
            if (!res.data.results[0]) {
                return;
            }
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element,
                    value: element
                };
                _this.previousEmployeName.push(obj);
            });
        });
        // Get All Institutes From Global Table
        this.Service.getAllInstitutesFromGlobal().subscribe(function (res) {
            //console.log(res);
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.insurerName,
                    value: element.insurerName
                };
                _this.InstitutionNames.push(obj);
            });
        });
    };
    ///////////////////////////////////////Bharati////////////////////////////
    //  onDateChange(newDate: Date) {
    //     console.log(newDate);
    //   }
    payrollComponent.prototype.onStatusChange = function (event) {
        this.selectedFrequency = event.target.value;
        if (this.selectedFrequency === "5") {
            this.CycleDefinationForm.controls['addDays'].setValidators([forms_1.Validators.required]);
        }
        else {
            //
            //this.CycleDefinationForm.patchValue:[{' addDays': null, disabled: true }],
            //     const control = new FormControl('Nancy');
            this.CycleDefinationForm.patchValue({ addDays: null });
            this.CycleDefinationForm.get('addDays').clearValidators();
            this.CycleDefinationForm.get('addDays').updateValueAndValidity();
        }
        ;
    };
    payrollComponent.prototype.selected = function () {
        this.selectedFrequency = this.selectedLevel.name;
    };
    payrollComponent.prototype.Edit = function (val) {
        this.editRowID = val;
    };
    payrollComponent.prototype.onItemSelect = function (item) {
        this.Multiselectflag = true;
        // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
        // this.ServicesList=[];
        this.ServicesList.push(item.serviceName);
        console.log(item);
    };
    payrollComponent.prototype.onItemDeSelect = function (item) {
        // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
        // this.ServicesList=[];
        var index = this.ServicesList.indexOf(item.serviceName);
        if (index > -1) {
            this.ServicesList.splice(index, 1);
        }
        console.log(item);
    };
    payrollComponent.prototype.onSelectAll = function (items) {
        // this.ServicesList.forEach(function(f){
        //   addCycleDefinition.serviceName.push(f);
        // });
        var _this = this;
        items.forEach(function (element) {
            _this.ServicesList.push(element.serviceName);
        });
        //this.ServicesList.push(items.serviceName)
        console.log(items);
    };
    payrollComponent.prototype.OnDateChange = function (event) {
        ;
        this.minDate1 = event; //this.datepipe.transform(event, "dd-MMM");//event.toISOString() ;
        this.minDate = event.getTime();
        //    if ((this.Id == undefined || this.Id == '00000000-0000-0000-0000-000000000000')) {
        //       this.EventDetails.patchValue({ RegistrationClosedDate:this.minDate });
        //     }
    };
    payrollComponent.prototype.OntoDateChange = function (event) {
        this.todisabletodate = false;
    };
    payrollComponent.prototype.ResetBusiness = function () {
        this.BusinessYearform.reset();
        this.updateFlag = false;
    };
    payrollComponent.prototype.resetCycledefinition = function () {
        ;
        this.CycleDefinationForm.reset();
        // this.CycleDefinationForm.patchValue({ serviceName: [null] });
        // this.ServicesList=[];
    };
    payrollComponent.prototype.CancelBusiness = function () {
        this.disabled = true;
        this.CycleDefinationForm.reset();
        this.updateFlag = false;
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;
    };
    //get all FrequencyList
    payrollComponent.prototype.getFrequency = function () {
        var _this = this;
        this.payrollService.getFrequency().subscribe(function (res) {
            _this.FrequencyList = res.data.results;
        });
    };
    //get all Businessyear
    payrollComponent.prototype.getAllBusinessyear = function () {
        var _this = this;
        this.payrollService.getAllBusinessYear().subscribe(function (res) {
            _this.BusinessyearList = res.data.results;
        });
    };
    //get all cycle-definition
    payrollComponent.prototype.getAllCycleDefinition = function () {
        var _this = this;
        this.payrollService.getAllCycleDefinition().subscribe(function (res) {
            _this.CycleDefinitionList = res.data.results;
        });
    };
    //get all cycle-Creation
    payrollComponent.prototype.getAllCycleCreation = function () {
        var _this = this;
        this.payrollService.getAllCycleCreation().subscribe(function (res) {
            _this.CycleCreationList = res.data.results;
        });
    };
    //add & update new BusinessYear
    payrollComponent.prototype.addBusinessYear = function () {
        var _this = this;
        var addBusinessYear = Object.assign({}, this.BusinessYearform.value);
        if (addBusinessYear.id == undefined || addBusinessYear.id == 0) {
            addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
            addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
            this.payrollService.AddBusinessYear(addBusinessYear).subscribe(function (res) {
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllBusinessyear();
                _this.BusinessYearform.reset();
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
            //Update BusinessYear service
            addBusinessYear.fromDate = this.datepipe.transform(addBusinessYear.fromDate, "dd-MMM");
            addBusinessYear.toDate = this.datepipe.transform(addBusinessYear.toDate, "dd-MMM");
            this.payrollService.UpdateBusinessYear(addBusinessYear.id, addBusinessYear).subscribe(function (res) {
                _this.sweetalertMasterSuccess("Updated..!!", res.status.message);
                _this.getAllBusinessyear();
                _this.BusinessYearform.reset();
                _this.updateFlag = false;
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
                // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
            });
        }
    };
    //add new cycle-definition & update
    payrollComponent.prototype.addCycleDefinition = function () {
        var _this = this;
        var addCycleDefinition = Object.assign({}, this.CycleDefinationForm.value);
        if (addCycleDefinition.id == undefined || addCycleDefinition.id == 0) {
            var employerContributionMethod = this.CycleDefinationForm.get('serviceName');
            addCycleDefinition.serviceName = [];
            this.ServicesList.forEach(function (f) {
                addCycleDefinition.serviceName.push(f);
            });
            this.payrollService.AddCycleDefinition(addCycleDefinition).subscribe(function (res) {
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllCycleDefinition();
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
            this.ServicesList = [];
            this.CycleDefinationForm.reset();
        }
        else {
            this.serviceName = [];
            this.serviceName.push(addCycleDefinition.services);
            addCycleDefinition.serviceName = this.serviceName;
            this.payrollService.UpdateCycleDefinition(addCycleDefinition.id, addCycleDefinition).subscribe(function (res) {
                _this.sweetalertMasterSuccess("Updated..!!", res.status.message);
                _this.getAllCycleDefinition();
                _this.CycleDefinationForm.reset();
                _this.CycleupdateFlag = false;
                _this.CycleupdateFlag1 = false;
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
    };
    payrollComponent.prototype.addCycleCreation = function () {
        var _this = this;
        this.previewCycleList = [];
        var addCycleCreation = Object.assign({}, this.CycleCreationForm1.value);
        if (addCycleCreation.id == undefined || addCycleCreation.id == 0) {
            this.payrollService.AddCycleCreation(addCycleCreation).subscribe(function (res) {
                _this.previewCycleList = res.data.results;
                _this.businessCycleDefinitionId = res.data.results[0].businessCycleDefinition.id;
                _this.Previewname = res.data.results[0].businessCycleDefinition.name;
                _this.Previewbusiness = res.data.results[0].businessYear;
                _this.PreviewFrequency = res.data.results[0].businessCycleDefinition.frequency.name;
                _this.PreviewfromDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
                _this.PreviewtoDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;
                _this.StausCode = res.status.code;
                if (_this.StausCode == '200') {
                    _this.flag = true;
                }
                {
                    _this.flag = false;
                }
                _this.getAllCycleCreation();
                _this.CycleCreationForm1.reset();
                _this.UploadModal2(_this.template2);
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
            });
        }
        else {
        }
    };
    payrollComponent.prototype.EditBussinessyear = function (BusinessId) {
        alert(BusinessId);
    };
    payrollComponent.prototype.getBussinessyearName = function (name) {
        this.Name = name;
    };
    payrollComponent.prototype.getCycleCreationName = function (name) {
        this.CycleCreationName = name;
    };
    payrollComponent.prototype.getBussinessyear = function (bussinessyear, businessCycleDefinitionid) {
        ;
        this.BusinessYearformorecycle = ++bussinessyear;
        this.businessCycleDefinitionIdforMoreCycle = businessCycleDefinitionid;
    };
    payrollComponent.prototype.getCycleName = function (name) {
        this.CycleName = name;
    };
    payrollComponent.prototype.DeleteCycleDefinitionById = function (id) {
        var _this = this;
        ;
        this.CycleupdateFlag = false;
        this.CycleupdateFlag1 = false;
        this.payrollService.DeleteCycleDefinitionById(id)
            .subscribe(function (response) {
            _this.getAllCycleDefinition();
            _this.BusinessYearform.reset();
        });
    };
    payrollComponent.prototype.DeleteBussinessyearById = function (id) {
        var _this = this;
        ;
        this.updateFlag = false;
        this.payrollService.DeleteBusinessYearById(id)
            .subscribe(function (response) {
            _this.getAllBusinessyear();
            _this.BusinessYearform.reset();
        });
    };
    payrollComponent.prototype.DeleteCycleCreationById = function (businessCycleDefinitionId, BusinessYear) {
        var _this = this;
        ;
        this.updateFlag = false;
        this.payrollService.DeleteCycleCreationById(businessCycleDefinitionId, BusinessYear)
            .subscribe(function (response) {
            _this.getAllCycleCreation();
            _this.CycleCreationForm.reset();
        });
    };
    payrollComponent.prototype.deletePreviewCycleDiscard = function () {
        var _this = this;
        ;
        this.updateFlag = false;
        this.payrollService.DeletePreviewCycleDiscard(this.businessCycleDefinitionId, this.Previewbusiness)
            .subscribe(function (response) {
            _this.getAllCycleCreation();
            _this.CycleCreationForm1.reset();
        });
    };
    payrollComponent.prototype.setflagAdjustedToNextCycle = function (businessCycleDefinitionId, BusinessYear, data, flag) {
        this.businessCycleDefinitionId = businessCycleDefinitionId;
        this.businessYearUpdate = BusinessYear;
        this.data = data;
        this.adjustedToNextCycle = flag;
    };
    payrollComponent.prototype.ForcetoYearEndofcycleCreation = function () {
        var _this = this;
        // this.updateFlag=false;
        this.data.forEach(function (element) {
            element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        });
        var cycledata1 = Object.assign({});
        cycledata1.businessCycleList = this.data;
        cycledata1.adjustedToNextCycle = this.adjustedToNextCycle;
        this.payrollService.EdittoDate(this.businessCycleDefinitionId, this.businessYearUpdate, cycledata1)
            .subscribe(function (res) {
            _this.sweetalertMasterSuccess("Success..!!", res.status.message);
            _this.todisabletodate = true;
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    payrollComponent.prototype.EdittoDateofcycle = function () {
        var _this = this;
        //this.updateFlag=false;
        this.data.forEach(function (element) {
            element.toDate = _this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        });
        var cycledata1 = Object.assign({});
        cycledata1.businessCycleList = this.data;
        cycledata1.adjustedToNextCycle = this.adjustedToNextCycle;
        this.payrollService.EdittoDate(this.businessCycleDefinitionId, this.businessYearUpdate, cycledata1)
            .subscribe(function (res) {
            _this.sweetalertMasterSuccess("Success..!!", res.status.message);
            _this.todisabletodate = true;
        }, function (error) {
            _this.sweetalertError(error["error"]["status"]["message"]);
        });
    };
    payrollComponent.prototype.GetCycleCreationById = function (businessCycleDefinitionId, BusinessYear) {
        var _this = this;
        ;
        this.todisabletodate = true;
        this.updateFlag = false;
        this.CycleDefinitionByid = [];
        this.payrollService.getCycleCreationById(businessCycleDefinitionId, BusinessYear)
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
    payrollComponent.prototype.GetBussinessyearById = function (id) {
        var _this = this;
        ;
        this.updateFlag = true;
        this.payrollService.GetBusinessYearById(id)
            .subscribe(function (response) {
            //  this.notifyService.showSuccess(response.status.messsage, "Success..!!");
            // response.data.results[0];
            _this.BusinessYearform.patchValue({ id: response.data.results[0].id });
            _this.BusinessYearform.patchValue({ description: response.data.results[0].description });
            _this.BusinessYearform.patchValue({ fromDate: response.data.results[0].fromDate });
            _this.BusinessYearform.patchValue({ toDate: response.data.results[0].toDate });
            // this.EventDetails.patchValue({ EventHostEmail: response['result'].EventHostEmail });
            //this.EventDetails.patchValue({ EventTimeZone: response['result'].EventTimeZone });
        });
    };
    payrollComponent.prototype.GetCycleDefinitionbyIdDisable = function (id) {
        var _this = this;
        this.CycleupdateFlag = true;
        this.CycleupdateFlag1 = false;
        this.disabled = false;
        this.payrollService.GetCycleDefinitionById(id)
            .subscribe(function (response) {
            _this.CycleDefinationForm.patchValue({ id: response.data.results[0].id });
            _this.CycleDefinationForm.patchValue({ name: response.data.results[0].name });
            _this.CycleDefinationForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.id });
            _this.CycleDefinationForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
            _this.CycleDefinationForm.patchValue({ services: response.data.results[0].serviceName });
            _this.CycleDefinationForm.patchValue({ addDays: response.data.results[0].addDays });
        });
    };
    payrollComponent.prototype.GetCycleDefinitionbyId = function (id) {
        var _this = this;
        ;
        this.CycleupdateFlag = true;
        this.CycleupdateFlag1 = true;
        this.payrollService.GetCycleDefinitionById(id)
            .subscribe(function (response) {
            //  this.notifyService.showSuccess(response.status.messsage, "Success..!!");
            //this.selectedItems=[];
            // response.data.results[0];
            _this.CycleDefinationForm.patchValue({ id: response.data.results[0].id });
            _this.CycleDefinationForm.patchValue({ name: response.data.results[0].name });
            _this.CycleDefinationForm.patchValue({ businessYearDefinitionId: response.data.results[0].businessYearDefinition.id });
            _this.CycleDefinationForm.patchValue({ frequencyMasterId: response.data.results[0].frequency.id });
            _this.CycleDefinationForm.patchValue({ services: response.data.results[0].serviceName });
            _this.CycleDefinationForm.patchValue({ addDays: response.data.results[0].addDays });
            //this.selectedItems.push(response.data.results[0].serviceName);
            //////////////////////////////////////////////////////////////////////////////////////////////
            // this.ServicesList=[];
            // this.ServicesList.push(response.data.results[0].serviceName)
            // this.CycleDefinationForm.patchValue({ serviceName:  this.ServicesList});
            // this.dropdownList= this.ServicesList;
            ////////////////////////////////////////////////////////////////////////////////////////
            //this.CycleDefinationForm.patchValue({ serviceName:  this.ServicesList});
            //   this.selectedItems=(this.ServicesList);
            // this.CycleDefinationForm.get('serviceName').setValue(response.data.results[0].serviceName);
            // this.CycleDefinationForm.patchValue({ serviceName: this.ServicesList.push(response.data.results[0].serviceName) });
            // this.selectedItems.push(response.data.results[0].serviceName);
            // this.EventDetails.patchValue({ EventHostEmail: response['result'].EventHostEmail });
            //this.EventDetails.patchValue({ EventTimeZone: response['result'].EventTimeZone });
        });
    };
    payrollComponent.prototype.CreateMoreCycleforNextYear = function () {
        var _this = this;
        var addCycleCreation = Object.assign({}, this.CycleCreationForm1.value);
        addCycleCreation.businessCycleDefinitionId = this.businessCycleDefinitionIdforMoreCycle;
        addCycleCreation.businessYear = this.BusinessYearformorecycle;
        if (addCycleCreation.id == undefined || addCycleCreation.id == 0) {
            this.payrollService.AddCycleCreation(addCycleCreation).subscribe(function (res) {
                _this.sweetalertMasterSuccess("Success..!!", res.status.message);
                _this.getAllCycleCreation();
                _this.CycleCreationForm1.reset();
            }, function (error) {
                _this.sweetalertError(error["error"]["status"]["message"]);
                // this.notifyService.showError(error["error"]["status"]["message"], "Error..!!")
            });
        }
    };
    payrollComponent.prototype.getPhonesFormControls = function () {
        return this.form1.get('Description').controls,
            this.form1.get('FromDate').controls,
            this.form1.get('ToDate').controls;
    };
    payrollComponent.prototype.addPhone = function () {
        this.form1.get('Description').push(this.formBuilder.control(null));
        this.form1.get('FromDate').push(this.formBuilder.control(null));
        this.form1.get('ToDate').push(this.formBuilder.control(null));
    };
    payrollComponent.prototype.removePhone = function (index) {
        this.form1.get('Description').removeAt(index);
        this.form1.get('FromDate').removeAt(index);
        this.form1.get('ToDate').removeAt(index);
    };
    payrollComponent.prototype.onOpenCalendar = function (container) {
        container.monthSelectHandler = function (event) {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    };
    ///////////////////////////////////////Bharati////////////////////////////
    //   onOpenCalendar1(container) {
    //
    //     container.monthSelectHandler = (event: any): void => {
    //       container._store.dispatch(container._actions.select(event.date));
    //     };
    //     container.setViewMode('Date');
    //   }
    // ---------------------Summary ----------------------
    // Summary get Call
    payrollComponent.prototype.summaryPage = function () {
        this.getAllCycleDefinition();
        // this.Service.getEightyCSummary().subscribe(res => {
        //     this.summaryGridData = res.data.results[0].licMasterList;
        //     this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
        //     this.totalActualAmount = res.data.results[0].totalActualAmount;
        //     this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
        //     this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
        //     this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        //     //console.log(res);
        // });
    };
    // Post New Future Policy Data API call
    payrollComponent.prototype.addFuturePolicy = function () {
        var _this = this;
        var data = {
            futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount
        };
        //console.log(data);
        this.Service.postEightyCSummaryFuturePolicy(data).subscribe(function (res) {
            //console.log(res);
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
    };
    payrollComponent.prototype.jumpToMasterPage = function (n) {
        console.log(n);
        this.tabIndex = 1;
        this.editMaster(3);
    };
    payrollComponent.prototype.jumpToDeclarationPage = function (data) {
        this.tabIndex = 2;
        this.selectedInstitution = data;
        this.selectedTransactionInstName(data);
    };
    // ------------------------------------Master----------------------------
    // End Date Validations with Start Date
    payrollComponent.prototype.setEndDate = function () {
        this.minDate = this.form.value.startDate;
        var start = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd');
        var end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        if (start > end) {
            this.form.controls['endDate'].reset();
        }
    };
    // End Date Validations with Current Finanacial Year
    payrollComponent.prototype.checkFinancialYearStartDate = function () {
        var end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        var financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (end < financialYearStartDate) {
            this.sweetalertWarning("End Date should be greater than or equal to Current Financial Year : " + this.financialYearStart);
            this.form.controls['endDate'].reset();
        }
    };
    // Get Master Page Data API call
    payrollComponent.prototype.masterPage = function () {
        this.getAllBusinessyear();
        // this.Service.getEightyCMaster().subscribe(res => {
        //     //console.log(res);
        //     this.masterGridData = res.data.results;
        //     this.masterGridData.forEach(element => {
        //         element.startDate = new Date(element.startDate);
        //         element.endDate = new Date(element.endDate);
        //     });
        // });
    };
    // Post Master Page Data API call
    payrollComponent.prototype.addMaster = function (formData, formDirective) {
        var _this = this;
        if (this.form.invalid) {
            return;
        }
        var startDate = this.form.value.startDate;
        var endDate = this.form.value.endDate;
        if ((startDate > endDate) && (endDate !== null)) {
            this.greaterDateValidations = true;
            return;
        }
        else {
            this.greaterDateValidations = false;
        }
        var start = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd');
        var end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
        var data = this.form.getRawValue();
        data.startDate = start;
        data.endDate = end;
        data.premiumAmount = data.premiumAmount.toString().replace(',', "");
        //console.log(data);
        this.Service.postEightyCMaster(data).subscribe(function (res) {
            //console.log(res);
            if (res.data.results.length > 0) {
                _this.masterGridData = res.data.results;
                _this.masterGridData.forEach(function (element) {
                    element.startDate = new Date(element.startDate);
                    element.endDate = new Date(element.endDate);
                });
                _this.sweetalertMasterSuccess("Record saved Successfully.", "Go to Declaration & Actual Page to see Schedule.");
            }
            else {
                _this.sweetalertWarning(res.status.messsage);
            }
        });
        this.Index = -1;
        //console.log(this.form.getRawValue());
        formDirective.resetForm();
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
    };
    // Calculate annual amount on basis of premium and frquency
    payrollComponent.prototype.calculateAnnualAmount = function () {
        var installment = this.form.value.premiumAmount;
        installment = installment.toString().replace(',', "");
        //console.log(installment);
        if (!this.form.value.frequencyOfPayment) {
            installment = 0;
        }
        if (this.form.value.frequencyOfPayment === 'Monthly') {
            installment = installment * 12;
        }
        else if (this.form.value.frequencyOfPayment === 'Quarterly') {
            installment = installment * 4;
        }
        else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
            installment = installment * 2;
        }
        else {
            installment = installment * 1;
        }
        var formatedPremiumAmount = this.numberFormat.transform(this.form.value.premiumAmount);
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.form.get('annualAmount').setValue(installment);
    };
    // Family relationship shown on Policyholder selection
    payrollComponent.prototype.OnSelectionfamilyMemberGroup = function () {
        var _this = this;
        var toSelect = this.familyMemberGroup.find(function (c) { return c.familyMemberName === _this.form.get('policyholdername').value; });
        this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
        this.form.get('relationship').setValue(toSelect.relation);
    };
    // dateValidations() {
    //   const startDate = this.form.value.startDate;
    //   const endDate = this.form.value.endDate;
    //   if ((startDate > endDate) && (endDate !== null)) {
    //     this.greaterDateValidations = true;
    //     return;
    //     } else {
    //     this.greaterDateValidations = false;
    //     }
    // }
    payrollComponent.prototype.deactivateRemark = function () {
        if (this.form.value.active === false) {
            this.form.get('remark').enable();
            this.form.get('remark').setValidators([forms_1.Validators.required]);
        }
        else {
            this.form.get('remark').clearValidators();
            this.form.get('remark').disable();
            this.form.get('remark').reset();
        }
    };
    // On Master Edit functionality
    payrollComponent.prototype.editMaster = function (i) {
        this.scrollToTop();
        this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
        this.form.patchValue(this.masterGridData[i]);
        //console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        var formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
    };
    // ----------------------------------------------- Declaration --------------------------------------
    // On declaration page get API call for All Institutions added into Master
    payrollComponent.prototype.declarationPage = function () {
        var _this = this;
        this.tabIndex = 2;
        this.transactionInstitutionNames = [];
        var data = {
            label: 'All',
            value: 'All'
        };
        //console.log(data);
        this.transactionInstitutionNames.push(data);
        //console.log(this.transactionInstitutionNames);
        this.Service.getEightyCDeclarationInstitutions().subscribe(function (res) {
            res.data.results[0].forEach(function (element) {
                var obj = {
                    label: element,
                    value: element
                };
                _this.transactionInstitutionNames.push(obj);
            });
            //console.log(res);
        });
        this.resetAll();
        this.selectedTransactionInstName('All');
    };
    // On institution selection show all transactions list accordingly all policies
    payrollComponent.prototype.selectedTransactionInstName = function (institutionName) {
        var _this = this;
        var data = institutionName;
        //console.log(data);
        this.Service.getTransactionInstName(data).subscribe(function (res) {
            console.log(res);
            _this.transactionDetail = res.data.results[0].licTransactionDetail;
            _this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            _this.grandActualTotal = res.data.results[0].grandActualTotal;
            _this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            _this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
            _this.transactionDetail.forEach(function (element) {
                element.lictransactionList.forEach(function (innerElement) {
                    if (innerElement.dateOfPayment !== null) {
                        innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                    }
                });
            });
        });
        if (institutionName == 'All') {
            this.grandTabStatus = true;
            this.isDisabled = true;
        }
        else {
            this.grandTabStatus = false;
            this.isDisabled = false;
        }
        this.resetAll();
    };
    // ON select to check input boxex
    payrollComponent.prototype.onSelectUpload = function (data, event, i, j, item) {
        var checked = event.target.checked;
        if (checked) {
            this.uploadGridData.push(data.licTransactionId);
        }
        else {
            var index = this.uploadGridData.indexOf(data.licTransactionId);
            this.uploadGridData.splice(index, 1);
        }
        if (this.uploadGridData.length) {
            this.enableCheckboxFlag3 = true;
            this.enableCheckboxFlag2 = item.institutionName;
        }
        else {
            this.enableCheckboxFlag3 = false;
            this.enableCheckboxFlag2 = null;
        }
        console.log(this.uploadGridData);
        console.log(this.uploadGridData.length);
        console.log(item.lictransactionList.length);
        if (this.uploadGridData.length == item.lictransactionList.length) {
            this.isCheckAll = true;
            this.enableSelectAll = true;
            this.enableCheckboxFlag2 = item.institutionName;
        }
        else {
            this.isCheckAll = false;
            this.enableSelectAll = false;
            this.enableCheckboxFlag2 = null;
            this.uploadGridData = [];
        }
    };
    // To Check / Uncheck Single checkbox
    payrollComponent.prototype.singleSelect = function () {
        console.log('hi....');
    };
    // To Check / Uncheck All  Checkboxes
    payrollComponent.prototype.checkUncheckAll = function (item) {
        //console.log('hi...');
        if (this.isCheckAll) {
            this.isCheckAll = false;
            this.enableSelectAll = false;
            this.enableCheckboxFlag2 = null;
        }
        else {
            this.isCheckAll = true;
            this.enableSelectAll = true;
            this.enableCheckboxFlag2 = item.institutionName;
            this.uploadGridData = [];
        }
    };
    payrollComponent.prototype.editDeclrationRow = function (summary, i, j) {
        this.declarationService = new DeclarationService(summary);
    };
    payrollComponent.prototype.updateDeclrationRow = function (i, j) {
        this.transactionDetail[j].actualTotal += this.declarationService.actualAmount - this.transactionDetail[j].lictransactionList[i].actualAmount;
        this.transactionDetail[j].lictransactionList[i] = this.declarationService;
        this.declarationService = new DeclarationService();
    };
    payrollComponent.prototype.SaveDeclrationRow = function (j) {
        if (!this.declarationService) {
            return;
        }
        this.transactionDetail[j].declarationTotal += this.declarationService.declaredAmount;
        this.transactionDetail[j].actualTotal += this.declarationService.actualAmount;
        this.grandActualTotal += this.declarationService.actualAmount;
        this.grandDeclarationTotal += this.declarationService.declaredAmount;
        this.transactionDetail[j].lictransactionList.push(this.declarationService);
        this.declarationService = new DeclarationService();
    };
    payrollComponent.prototype.submitDeclaration = function () {
        var _this = this;
        // this.tabIndex = 0;
        console.log(this.transactionDetail);
        this.tabIndex = 0;
        this.transactionDetail.forEach(function (element) {
            element.lictransactionList.forEach(function (element) {
                element.dateOfPayment = _this.datePipe.transform(element.dateOfPayment, 'yyyy-MM-dd');
            });
        });
        var data = this.transactionDetail;
        this.Service.postEightyCDeclarationTransaction(data).subscribe(function (res) {
            console.log(res);
            _this.transactionDetail = res.data.results[0].licTransactionDetail;
            _this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            _this.grandActualTotal = res.data.results[0].grandActualTotal;
            _this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            _this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
            _this.transactionDetail.forEach(function (element) {
                element.lictransactionList.forEach(function (element) {
                    element.dateOfPayment = new Date(element.dateOfPayment);
                });
            });
        });
        this.resetAll();
    };
    payrollComponent.prototype.resetAll = function () {
        this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
        this.uploadGridData = [];
        this.enableCheckboxFlag3 = false;
        this.enableCheckboxFlag2 = null;
        this.declarationService = new DeclarationService();
    };
    ///// --------------------------------rahul-------------
    payrollComponent.prototype.UploadFilePopUp = function () {
        this.displayUploadFile = true;
    };
    payrollComponent.prototype.onUpload = function (event) {
        console.log(event);
        this.currentFileUpload = event.files;
        // for(let file of event.files) {
        //     this.uploadedFiles.push(file);
        // }
        // this.SuccessMessage();
        this.upload();
    };
    // SuccessMessage() {
    //   this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    // }
    // Uploads the file to backend server.
    payrollComponent.prototype.upload = function () {
        var _this = this;
        // this.currentFileUpload = this.selectedFiles.item(0);
        var data = {
            licTransactionIDs: this.uploadGridData,
            receiptNumber: this.receiptNumber,
            receiptAmount: this.receiptAmount,
            receiptDate: this.receiptDate
        };
        this.fileService.uploadSingleFile(this.currentFileUpload, data)
            .pipe(operators_1.tap(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                _this.loaded = Math.round(100 * event.loaded / event.total);
            }
        }))
            .subscribe(function (event) {
            if (event instanceof http_1.HttpResponse) {
                // this.snackBar.open('File uploaded successfully!', 'Close', {
                //   duration: 3000
                // });
                _this.fileService.fetchFileNames();
            }
        });
    };
    payrollComponent.prototype.sweetalert7 = function (message) {
        sweetalert2_1["default"].fire({
            text: message
        });
    };
    payrollComponent.prototype.sweetalertWarning = function (message) {
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
    payrollComponent.prototype.sweetalertInfo = function (message) {
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
    payrollComponent.prototype.sweetalertMasterSuccess = function (message, text) {
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
    payrollComponent.prototype.sweetalertError = function (message) {
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
    payrollComponent.prototype.UploadModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    payrollComponent.prototype.UploadModal1 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    payrollComponent.prototype.UploadModalYesNo = function (template) {
        this.modalRef1 = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    payrollComponent.prototype.UploadModal2 = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    __decorate([
        core_1.ViewChild('template2')
    ], payrollComponent.prototype, "template2");
    __decorate([
        core_1.ViewChild('multiSelect')
    ], payrollComponent.prototype, "multiSelect");
    __decorate([
        core_1.HostListener("window:scroll", [])
    ], payrollComponent.prototype, "onWindowScroll");
    payrollComponent = __decorate([
        core_1.Component({
            selector: 'app-bc',
            templateUrl: './bc.component.html',
            styleUrls: ['./bc.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(9, core_1.Inject(common_1.DOCUMENT))
    ], payrollComponent);
    return payrollComponent;
}());
exports.payrollComponent = payrollComponent;
var DeclarationService = /** @class */ (function () {
    function DeclarationService(obj) {
        this.licTransactionId = 0;
        Object.assign(this, obj);
    }
    return DeclarationService;
}());
