"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BusinessCycleComponent = void 0;
var core_1 = require("@angular/core");
var BusinessCycleComponent = /** @class */ (function () {
    //template2:TemplateRef<any>;
    //template2: ElementRef;
    function BusinessCycleComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.today = new Date();
        this.editedRecordIndexId = 0;
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
        this.displayUploadFile = false;
        this.uploadedFiles = [];
        this.loaded = 0;
        this.activeFrequencyList = [];
        this.BusinessYear = [];
        this.previewCycleList = [];
        this.id = 0;
        this.CycleupdateFlag1 = false;
        this.disabled = true;
        //demoData: Array<getchapter> = [];
        this.editRowID = '';
        this.adjustedToNextCycle = false;
        //businessCycleList=[];
        this.businessCycleList = [];
        this.data = [];
        this.isCheckAll = false;
        this.isDisabled = true;
        this.enableSelectAll = false;
    }
    BusinessCycleComponent.prototype.onWindowScroll = function () {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    };
    BusinessCycleComponent.prototype.scrollToTop = function () {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    };
    BusinessCycleComponent.prototype.ngOnInit = function () {
        this.myDateValue = new Date();
        this.bsConfig = Object.assign({}, { containerClass: 'theme-green custom' });
    };
    // selected() {
    //   this.selectedFrequency = this.selectedLevel.name;
    // }
    // Edit( val ) {
    //   this.editRowID = val;
    // }
    BusinessCycleComponent.prototype.OntoDateChange = function (event) {
        //  this.todisabletodate = false;
    };
    //get all cycle-definition
    //    {
    //   "createdBy": "PaysquareDefault",
    //     "createDateTime": "16-Mar-2021",
    //       "lastModifiedBy": "PaysquareDefault",
    //         "lastModifiedDateTime": 1615886482190,
    //           "cycleName": "cycleName1_MM_ss",
    //             "isUsed": true,
    //               "description": "cycleName1 Monthly serviceName1 Cycle",
    //                 "addDays": 0,
    //                   "id": 4,
    //                     "businessYearDefinition": {
    //     "businessYearDefinitionId": 1,
    //       "fromDate": "01-Apr",
    //         "toDate": "31-Mar",
    //           "description": "Test1",
    //             "createdBy": "pankaj",
    //               "lastModifiedBy": "PaysquareDefault",
    //                 "yearDefinition": "01-Apr - 31-Mar",
    //                   "createDateTime": "29-Oct-2020",
    //                     "active": true,
    //                       "used": true
    //   },
    //   "frequency": {
    //     "name": "Monthly",
    //       "createdBy": "pankaj",
    //         "paymentFrequency": 0,
    //           "paymentCount": 0,
    //             "id": 1,
    //               "createDateTime": "29-Oct-2020",
    //                 "active": true
    //   },
    //   "serviceName": "serviceName1",
    //     "active": true
    // },
    // getAllCycleDefinition(): void {
    //   this.CycleDefinitionList = [];
    //   this.companySetttingService.getAllCycleDefinition().subscribe( res => {
    //     this.CycleDefinitionList = res.data.results;
    //     console.log( 'cycle creation res', this.CycleDefinitionList )
    //   } );
    // }
    //   "createdBy": null,
    //     "createDateTime": null,
    //       "lastModifiedBy": null,
    //         "lastModifiedDateTime": null,
    //           "noOfYears": 0,
    //             "id": 133,
    //               "periodId": 1,
    //                 "periodName": "cycleName1_MM_ss_1",
    //                   "fromDate": "01-May-2012",
    //                     "toDate": "31-May-2012",
    //                       "businessYear": "2012",
    //                         "noOfDays": 31,
    //                           "noOfCycles": 2,
    //                             "remark": null,
    //                               "businessCycleDefinition": {
    //     "createdBy": "PaysquareDefault",
    //       "createDateTime": "16-Mar-2021",
    //         "lastModifiedBy": "PaysquareDefault",
    //           "lastModifiedDateTime": 1615901110753,
    //             "cycleName": "cycleName1_MM_ss",
    //               "isUsed": true,
    //                 "description": "cycleName1 Monthly serviceName1 Cycle",
    //                   "addDays": 0,
    //                     "id": 15,
    //                       "businessYearDefinition": {
    //       "businessYearDefinitionId": 27,
    //         "fromDate": "01-May",
    //           "toDate": "30-Jun",
    //             "description": "testy",
    //               "createdBy": "PaysquareDefault",
    //                 "lastModifiedBy": "PaysquareDefault",
    //                   "yearDefinition": "01-May - 30-Jun",
    //                     "createDateTime": "16-Mar-2021",
    //                       "active": true,
    //                         "used": true
    //     },
    //     "frequency": {
    //       "name": "Monthly",
    //         "createdBy": "pankaj",
    //           "paymentFrequency": 0,
    //             "paymentCount": 0,
    //               "id": 1,
    //                 "createDateTime": "29-Oct-2020",
    //                   "active": true
    //     },
    //     "serviceName": "serviceName1",
    //       "active": true
    //   },
    //   "active": true,
    //     "locked": false,
    //       "used": false,
    //         "forceToYearEnd": false
    // },
    //get all cycle-Creation
    // EditBussinessyear( BusinessId ): void {
    //   alert( BusinessId );
    // }
    BusinessCycleComponent.prototype.getBussinessyearName = function (name) {
        this.Name = name;
    };
    BusinessCycleComponent.prototype.getCycleCreationName = function (name) {
        this.CycleCreationName = name;
    };
    BusinessCycleComponent.prototype.getBussinessyear = function (bussinessyear, businessCycleDefinitionid) {
        this.BusinessYearformorecycle = ++bussinessyear;
        this.businessCycleDefinitionIdforMoreCycle = businessCycleDefinitionid;
    };
    BusinessCycleComponent.prototype.getCycleName = function (name) {
        this.CycleName = name;
    };
    BusinessCycleComponent.prototype.setflagAdjustedToNextCycle = function (businessCycleDefinitionId, BusinessYear, data, flag) {
        this.businessCycleDefinitionId = businessCycleDefinitionId;
        this.businessYearUpdate = BusinessYear;
        this.data = data;
        this.adjustedToNextCycle = flag;
    };
    BusinessCycleComponent.prototype.EdittoDateofcycle = function () {
        console.log('EdittoDateofcycle');
        //this.updateFlag=false;
        // this.data.forEach(element => {
        //   element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        // });
        // const cycledata1: UpdateflagCycleCreation = Object.assign({});
        // cycledata1.businessCycleList = this.data;
        // cycledata1.adjustedToNextCycle = this.adjustedToNextCycle;
        // this.companySetttingService.EdittoDate(this.businessCycleDefinitionId, this.businessYearUpdate, cycledata1)
        //   .subscribe((res: any) => {
        //     this.sweetalertMasterSuccess("Success..!!", res.status.message);
        //     this.todisabletodate = true;
        //   },
        //     (error: any) => {
        //       //  this.sweetalertError(error["error"]["status"]["message"]);
        //     });
    };
    // CreateMoreCycleforNextYear() {
    //   const addCycleCreation: saveCycleCreation = Object.assign( {}, this.cycelCreationForm.value );
    //   addCycleCreation.businessCycleDefinitionId = this.businessCycleDefinitionIdforMoreCycle;
    //   addCycleCreation.businessYear = this.BusinessYearformorecycle;
    //   //  if ( addCycleCreation.id == undefined || addCycleCreation.id == 0 ) {
    //   this.companySetttingService.AddCycleCreation( addCycleCreation ).subscribe( ( res: any ) => {
    //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    //     //  this.getAllCycleCreation();
    //     this.cycelCreationForm.reset();
    //   },
    //     ( error: any ) => {
    //       this.alertService.sweetalertError( error["error"]["status"]["message"] );
    //     } );
    // }
    // getPhonesFormControls(): AbstractControl[] {
    //   return ( <FormArray>this.form1.get( 'Description' ) ).controls,
    //     ( <FormArray>this.form1.get( 'FromDate' ) ).controls,
    //     ( <FormArray>this.form1.get( 'ToDate' ) ).controls
    // }
    // addPhone(): void {
    //   ( this.form1.get( 'Description' ) as FormArray ).push(
    //     this.formBuilder.control( null )
    //   );
    //   ( this.form1.get( 'FromDate' ) as FormArray ).push(
    //     this.formBuilder.control( null )
    //   );
    //   ( this.form1.get( 'ToDate' ) as FormArray ).push(
    //     this.formBuilder.control( null )
    //   );
    // }
    // removePhone( index ) {
    //   ( this.form1.get( 'Description' ) as FormArray ).removeAt( index );
    //   ( this.form1.get( 'FromDate' ) as FormArray ).removeAt( index );
    //   ( this.form1.get( 'ToDate' ) as FormArray ).removeAt( index );
    // }
    BusinessCycleComponent.prototype.onOpenCalendar = function (container) {
        container.monthSelectHandler = function (event) {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    };
    // jumpToMasterPage( n: number ) {
    //   console.log( n );
    //   this.tabIndex = 1;
    //   // this.editMaster(3);
    // }
    BusinessCycleComponent.prototype.declarationPage = function () {
        //  this.tabIndex = 2;
        //  this.transactionInstitutionNames = [];
        // const data = {
        //   label: 'All',
        //   value: 'All',
        // };
        //console.log(data);
        //   this.transactionInstitutionNames.push( data );
        //console.log(this.transactionInstitutionNames);
        // this.companySetttingService.getEightyCDeclarationInstitutions().subscribe( res => {
        //   res.data.results[0].forEach( element => {
        //     const obj = {
        //       label: element,
        //       value: element,
        //     };
        //     this.transactionInstitutionNames.push( obj );
        //   } );
        //   //console.log(res);
        // } );
        //this.resetAll();
        //  this.selectedTransactionInstName( 'All' );
    };
    // jumpToDeclarationPage( data ) {
    //   this.tabIndex = 2;
    //   this.selectedInstitution = data;
    //   //  this.selectedTransactionInstName(data);
    // }
    // ------------------------------------Master----------------------------
    // End Date Validations with Start Date
    // setEndDate() {
    //   this.minDate = this.form.value.startDate;
    //   const start = this.datePipe.transform( this.form.get( 'startDate' ).value, 'yyyy-MM-dd' );
    //   const end = this.datePipe.transform( this.form.get( 'endDate' ).value, 'yyyy-MM-dd' );
    //   if ( start > end ) {
    //     this.form.controls['endDate'].reset()
    //   }
    // }
    // End Date Validations with Current Finanacial Year
    // checkFinancialYearStartDate() {
    //   const end = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
    //   const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
    //   if (end < financialYearStartDate) {
    //     this.sweetalertWarning("End Date should be greater than or equal to Current Financial Year : " + this.financialYearStart);
    //     this.form.controls['endDate'].reset();
    //   }
    // }
    // Get Master Page Data API call
    BusinessCycleComponent.prototype.masterPage = function () {
        // this.getAllBusinessyear();
    };
    // Post Master Page Data API call
    BusinessCycleComponent.prototype.addMaster = function (formData, formDirective) {
        // console.log( 'in add master' );
        // if ( this.BusinessYearform.invalid ) {
        //   return;
        // }
        // const startDate = this.BusinessYearform.value.startDate;
        // const endDate = this.BusinessYearform.value.endDate;
        // if ( ( startDate > endDate ) && ( endDate !== null ) ) {
        //   this.greaterDateValidations = true;
        //   return;
        // } else {
        //   this.greaterDateValidations = false;
        // }
        // const start = this.datePipe.transform( this.BusinessYearform.get( 'fromDate' ).value, 'dd-MMM' );
        // const end = this.datePipe.transform( this.BusinessYearform.get( 'toDate' ).value, 'dd-MMM' );
        // const data = this.BusinessYearform.getRawValue();
        // data.fromDate = start;
        // data.toDate = end;
        // delete data.id;
        // data.businessYearDefinitionId = this.editedRecordIndexId;
        // // data.premiumAmount = data.premiumAmount.toString().replace(',', "");
        // console.log( JSON.stringify( data ) );
        // this.companySetttingService.UpdateBusinessYear( data ).subscribe( res => {
        //   //console.log(res);
        //   if ( res.data.results.length > 0 ) {
        //     res.data.results.forEach( element => {
        //       element.startDate = new Date( element.startDate );
        //       element.endDate = new Date( element.endDate );
        //     } );
        //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        //   } else {
        //     this.alertService.sweetalertWarning( res.status.messsage );
        //   }
        // } );
        // this.Index = -1;
        // //console.log(this.form.getRawValue());
        // formDirective.resetForm();
        // this.BusinessYearform.reset();
        // this.showUpdateButton = false;
    };
    __decorate([
        core_1.ViewChild('template2')
    ], BusinessCycleComponent.prototype, "template2");
    __decorate([
        core_1.HostListener("window:scroll", [])
    ], BusinessCycleComponent.prototype, "onWindowScroll");
    BusinessCycleComponent = __decorate([
        core_1.Component({
            selector: 'app-business-cycle',
            templateUrl: './business-cycle.component.html',
            styleUrls: ['./business-cycle.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], BusinessCycleComponent);
    return BusinessCycleComponent;
}());
exports.BusinessCycleComponent = BusinessCycleComponent;
