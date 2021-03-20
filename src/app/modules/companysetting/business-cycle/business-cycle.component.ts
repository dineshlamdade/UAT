
import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { HttpClient } from '@angular/common/http';


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { saveCycleCreation, saveCycleDefinition, UpdateflagCycleCreation } from '../model/business-cycle-model';


@Component( {
  selector: 'app-business-cycle',
  templateUrl: './business-cycle.component.html',
  styleUrls: ['./business-cycle.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class BusinessCycleComponent implements OnInit {

  today: any = new Date();
  editedRecordIndexId: number = 0;

  // summaryGridData: Array<any> = [];
  // summaryComputationGridDate: any;
  // masterGridData: Array<any> = [];
  //paymentDetailGridData: Array<any> = [];
  declarationGridData: Array<any> = [];
  familyMemberGroup: Array<any> = [];
  frequencyOfPayment: Array<any> = [];
  // BusinessYear: Array<any> = [];
  InstitutionNames: Array<any> = [];
  transactionDetail: Array<any> = [];
  uploadGridData: Array<any> = [];
  //transactionInstitutionNames: Array<any> = [];
  familyMemberName: Array<any> = [];

  // form: FormGroup;
  // form1: FormGroup;
  Index: number;
  showUpdateButton: boolean;
  tabIndex = 0;
  radioSelected: string;
  familyRelationSame: boolean;
  enableEditRow: number;
  enableAddRow: number;
  enablePolicyTable: number;
  enableCheckbox: number;
  enableCheckboxFlag: number;
  enableCheckboxFlag3: boolean;

  totalDeclaredAmount: any;
  totalActualAmount: any;
  futureNewPolicyDeclaredAmount: number;
  isCheckAll: boolean;
  isDisabled: boolean;
  enableSelectAll: boolean;
  displayUploadFile = false;
  uploadedFiles: any[] = [];
  date3: Date;
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  receiptNumber: number;
  receiptAmount: number;
  receiptDate: Date;
  selectedInstitution: string;
  enableCheckboxFlag2: any;
  greaterDateValidations: boolean;
  windowScrolled: boolean;
  @ViewChild( 'template2' ) template2: TemplateRef<any>;

  activeFrequencyList: Array<any> = [];
  BusinessYear: Array<any> = [];



  previewCycleList: Array<any> = [];




  BusinessYearform: FormGroup;
  CycleDefinationForm: FormGroup;
  CycleCreationForm: FormGroup;
  cycelCreationForm: FormGroup;
  BusinessYearId: string;

  id: number = 0;

  bsConfig: Partial<BsDatepickerConfig>;
  myDateValue: Date;
  Name: string;
  // minDate1: Date;
  CycleName: string;

  CycleupdateFlag1: boolean = false;
  disabled: boolean = true;

  flag: boolean;
  name: string;
  business: string;
  Frequency: string;
  fromDate: string;
  toDate: string;
  editformDate: string;
  //demoData: Array<getchapter> = [];
  editRowID: any = '';
  BusinessYearformorecycle: number;
  Previewname: string;
  Previewbusiness: string;
  PreviewFrequency: string;
  PreviewfromDate: string;
  PreviewtoDate: string;
  businessCycleDefinitionId: number;
  businessCycleDefinitionIdforMoreCycle: number;
  CycleCreationName: string;
  // StausCode: string;
  selectedFrequency: string;
  adjustedToNextCycle: boolean = false;
  //businessCycleList=[];
  businessCycleList: Array<any> = [];
  data = [];
  businessYearUpdate: string;

  //template2:TemplateRef<any>;
  //template2: ElementRef;


  constructor(
    private formBuilder: FormBuilder ) {

    this.isCheckAll = false;
    this.isDisabled = true;
    this.enableSelectAll = false;
  }


  modalRef: BsModalRef;
  modalRef1: BsModalRef;

  @HostListener( "window:scroll", [] )
  onWindowScroll() {
    if ( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100 ) {
      this.windowScrolled = true;
    }
    else if ( this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10 ) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    ( function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if ( currentScroll > 0 ) {
        window.requestAnimationFrame( smoothscroll );
        window.scrollTo( 0, currentScroll - ( currentScroll / 8 ) );
      }
    } )();
  }

  ngOnInit(): void {

    this.myDateValue = new Date();
    this.bsConfig = Object.assign( {}, { containerClass: 'theme-green custom' } );



  }




  // selected() {
  //   this.selectedFrequency = this.selectedLevel.name;
  // }

  // Edit( val ) {
  //   this.editRowID = val;
  // }



  OntoDateChange( event ): void {

    //  this.todisabletodate = false;
  }









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
  getBussinessyearName( name ): void {
    this.Name = name;
  }

  getCycleCreationName( name ): void {
    this.CycleCreationName = name;
  }
  getBussinessyear( bussinessyear: number, businessCycleDefinitionid ): void {
    this.BusinessYearformorecycle = ++bussinessyear;
    this.businessCycleDefinitionIdforMoreCycle = businessCycleDefinitionid;
  }

  getCycleName( name ): void {
    this.CycleName = name;
  }








  setflagAdjustedToNextCycle( businessCycleDefinitionId, BusinessYear, data, flag ): void {

    this.businessCycleDefinitionId = businessCycleDefinitionId;
    this.businessYearUpdate = BusinessYear;
    this.data = data;
    this.adjustedToNextCycle = flag;
  }



  EdittoDateofcycle(): void {
    console.log( 'EdittoDateofcycle' );

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

  }










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

  onOpenCalendar( container ) {

    container.monthSelectHandler = ( event: any ): void => {
      container._store.dispatch( container._actions.select( event.date ) );
    };
    container.setViewMode( 'month' );
  }




  // jumpToMasterPage( n: number ) {
  //   console.log( n );
  //   this.tabIndex = 1;
  //   // this.editMaster(3);
  // }

  declarationPage() {
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
  }

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
  masterPage() {
    // this.getAllBusinessyear();
  }

  // Post Master Page Data API call
  addMaster( formData: any, formDirective: FormGroupDirective ): void {
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

  }

  // Calculate annual amount on basis of premium and frquency
  // calculateAnnualAmount() {
  //   let installment = this.form.value.premiumAmount;
  //   installment = installment.toString().replace( ',', "" );
  //   //console.log(installment);
  //   if ( !this.form.value.frequencyOfPayment ) {
  //     installment = 0;
  //   }
  //   if ( this.form.value.frequencyOfPayment === 'Monthly' ) {
  //     installment = installment * 12;
  //   } else if ( this.form.value.frequencyOfPayment === 'Quarterly' ) {
  //     installment = installment * 4;
  //   } else if ( this.form.value.frequencyOfPayment === 'Halfyearly' ) {
  //     installment = installment * 2;
  //   } else {
  //     installment = installment * 1;
  //   }
  //   // let formatedPremiumAmount = this.numberFormat.transform( this.form.value.premiumAmount )
  //   // //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
  //   // this.form.get( 'premiumAmount' ).setValue( formatedPremiumAmount );
  //   // this.form.get( 'annualAmount' ).setValue( installment );
  // }

  // Family relationship shown on Policyholder selection
  // OnSelectionfamilyMemberGroup() {
  //   const toSelect = this.familyMemberGroup.find(c => c.familyMemberName === this.form.get('policyholdername').value);
  //   this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
  //   this.form.get('relationship').setValue(toSelect.relation);
  // }




  // ----------------------------------------------- Declaration --------------------------------------

  // On declaration page get API call for All Institutions added into Master
  // declarationPage() {
  //   // this.tabIndex = 2;
  //   // this.transactionInstitutionNames = [];
  //   // const data = {
  //   //   label: 'All',
  //   //   value: 'All',
  //   // };
  //   //console.log(data);
  //   // this.transactionInstitutionNames.push(data);
  //   // //console.log(this.transactionInstitutionNames);
  //   // this.Service.getEightyCDeclarationInstitutions().subscribe(res => {
  //   //   res.data.results[0].forEach(element => {
  //   //     const obj = {
  //   //       label: element,
  //   //       value: element,
  //   //     };
  //   //     this.transactionInstitutionNames.push(obj);
  //   //   });
  //   //   //console.log(res);
  //   // });
  //   // this.resetAll();
  //   // this.selectedTransactionInstName('All');
  // }

  // On institution selection show all transactions list accordingly all policies
  // selectedTransactionInstName( institutionName: any ) {
  //   // const data = institutionName;
  //   // //console.log(data);
  //   // this.Service.getTransactionInstName(data).subscribe(res => {
  //   //   console.log(res);
  //   //   this.transactionDetail = res.data.results[0].licTransactionDetail;
  //   //   this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
  //   //   this.grandActualTotal = res.data.results[0].grandActualTotal;
  //   //   this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
  //   //   this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
  //   //   this.transactionDetail.forEach(element => {
  //   //     element.lictransactionList.forEach(innerElement => {
  //   //       if (innerElement.dateOfPayment !== null) {
  //   //         innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
  //   //       }
  //   //     });
  //   //   })
  //   // });
  //   // if (institutionName == 'All') {
  //   //   this.grandTabStatus = true;
  //   //   this.isDisabled = true;
  //   // } else {
  //   //   this.grandTabStatus = false;
  //   //   this.isDisabled = false;
  //   // }
  //   // this.resetAll();
  // }

  // // ON select to check input boxex
  // onSelectUpload( data: any, event: { target: { checked: any; }; }, i: number, j: number, item ) {
  //   const checked = event.target.checked;
  //   if ( checked ) {
  //     this.uploadGridData.push( data.licTransactionId );
  //   } else {
  //     const index = this.uploadGridData.indexOf( data.licTransactionId );
  //     this.uploadGridData.splice( index, 1 );
  //   }
  //   if ( this.uploadGridData.length ) {
  //     this.enableCheckboxFlag3 = true;
  //     this.enableCheckboxFlag2 = item.institutionName;
  //   } else {
  //     this.enableCheckboxFlag3 = false;
  //     this.enableCheckboxFlag2 = null;
  //   }
  //   console.log( this.uploadGridData );
  //   console.log( this.uploadGridData.length );
  //   console.log( item.lictransactionList.length );

  //   if ( this.uploadGridData.length == item.lictransactionList.length ) {
  //     this.isCheckAll = true;
  //     this.enableSelectAll = true;
  //     this.enableCheckboxFlag2 = item.institutionName;
  //   } else {
  //     this.isCheckAll = false;
  //     this.enableSelectAll = false;
  //     this.enableCheckboxFlag2 = null;
  //     this.uploadGridData = [];
  //   }
  // }


  // To Check / Uncheck All  Checkboxes
  // checkUncheckAll( item: any ) {
  //   //console.log('hi...');
  //   if ( this.isCheckAll ) {
  //     this.isCheckAll = false;
  //     this.enableSelectAll = false;
  //     this.enableCheckboxFlag2 = null;
  //   } else {
  //     this.isCheckAll = true;
  //     this.enableSelectAll = true;
  //     this.enableCheckboxFlag2 = item.institutionName;
  //     this.uploadGridData = [];
  //   }

  // }

  // editDeclrationRow(summary: { previousEmployerName: any; declaredAmount: any; dateOfPayment: any; actualAmount: any; }, i: any, j: any) {
  //   this.declarationService = new DeclarationService(summary);
  // }

  // updateDeclrationRow( i: string | number, j: string | number ) {
  //   this.transactionDetail[j].actualTotal += this.declarationService.actualAmount - this.transactionDetail[j].lictransactionList[i].actualAmount;
  //   this.transactionDetail[j].lictransactionList[i] = this.declarationService;
  //   this.declarationService = new DeclarationService();
  // }

  // SaveDeclrationRow( j ) {
  //   if ( !this.declarationService ) {
  //     return;
  //   }
  //   this.transactionDetail[j].declarationTotal += this.declarationService.declaredAmount;
  //   this.transactionDetail[j].actualTotal += this.declarationService.actualAmount;
  //   this.grandActualTotal += this.declarationService.actualAmount;
  //   this.grandDeclarationTotal += this.declarationService.declaredAmount;
  //   this.transactionDetail[j].lictransactionList.push( this.declarationService );
  //   this.declarationService = new DeclarationService();

  // }

  // submitDeclaration() {
  //   // this.tabIndex = 0;
  //   console.log(this.transactionDetail);
  //   this.tabIndex = 0;
  //   this.transactionDetail.forEach(element => {
  //     element.lictransactionList.forEach(element => {
  //       element.dateOfPayment = this.datePipe.transform(element.dateOfPayment, 'yyyy-MM-dd');
  //     });
  //   });
  //   const data = this.transactionDetail;
  //   this.Service.postEightyCDeclarationTransaction(data).subscribe(res => {
  //     console.log(res);
  //     this.transactionDetail = res.data.results[0].licTransactionDetail;
  //     this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
  //     this.grandActualTotal = res.data.results[0].grandActualTotal;
  //     this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
  //     this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
  //     this.transactionDetail.forEach(element => {
  //       element.lictransactionList.forEach(element => {
  //         element.dateOfPayment = new Date(element.dateOfPayment);
  //       });
  //     });
  //   });
  //   this.resetAll();
  // }




  // resetAll() {
  //   this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
  //   this.uploadGridData = [];
  //   this.enableCheckboxFlag3 = false;
  //   this.enableCheckboxFlag2 = null;
  //   this.declarationService = new DeclarationService();
  // }

  ///// --------------------------------rahul-------------

  // UploadFilePopUp() {
  //   this.displayUploadFile = true;
  // }


  // onUpload(event) {
  //   console.log(event);
  //   this.currentFileUpload = event.files;
  //   // for(let file of event.files) {
  //   //     this.uploadedFiles.push(file);

  //   // }
  //   // this.SuccessMessage();
  //   this.upload();
  // }



  // Uploads the file to backend server.
  // upload() {
  //   // this.currentFileUpload = this.selectedFiles.item(0);
  //   const data = {
  //     licTransactionIDs: this.uploadGridData,
  //     receiptNumber: this.receiptNumber,
  //     receiptAmount: this.receiptAmount,
  //     receiptDate: this.receiptDate,
  //   };

  //   this.fileService.uploadSingleFile(this.currentFileUpload, data)
  //     .pipe(tap(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.loaded = Math.round(100 * event.loaded / event.total);
  //       }
  //     }))
  //     .subscribe(event => {
  //       if (event instanceof HttpResponse) {
  //         // this.snackBar.open('File uploaded successfully!', 'Close', {
  //         //   duration: 3000
  //         // });
  //         this.fileService.fetchFileNames();
  //       }
  //     });
  // }


  // UploadModal( template: TemplateRef<any> ) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign( {}, { class: 'gray modal-md' } )
  //   );
  // }

  // UploadModal1( template: TemplateRef<any> ) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign( {}, { class: 'gray modal-md' } )
  //   );
  // }


  // UploadModalYesNo( template: TemplateRef<any> ) {
  //   this.modalRef1 = this.modalService.show(
  //     template,
  //     Object.assign( {}, { class: 'gray modal-md' } )
  //   );
  // }
  // UploadModal2( template: TemplateRef<any> ) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign( {}, { class: 'gray modal-xl' } )
  //   );
  // }
}

