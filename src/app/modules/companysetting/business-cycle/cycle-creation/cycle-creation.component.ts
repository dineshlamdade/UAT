
import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';
//import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { HttpClient } from '@angular/common/http';
//import { AlertServiceService } from './src/app/core/services/alert-service.service';


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompanySettingsService } from '../../company-settings.service';
import { saveBusinessYear, saveCycleDefinition, UpdateflagCycleCreation } from '../../model/business-cycle-model';
import { AlertServiceService } from '../../../../core/services/alert-service.service';

@Component( {
  selector: 'app-cycle-creation',
  templateUrl: './cycle-creation.component.html',
  styleUrls: ['./cycle-creation.component.scss']
} )
export class CycleCreationComponent implements OnInit {

  BusinessYear = [
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
  today: any = new Date();
  updateFlag: boolean = false;
  editedRecordIndexId: number = 0;
  todisabletodate: boolean = false;

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
  addRow1: boolean;
  addRow2: number;
  previousEmployeName: Array<any> = [];
  totalDeclaredAmount: any;
  totalActualAmount: any;
  futureNewPolicyDeclaredAmount: number;
  grandTotalDeclaredAmount: number;
  grandTotalActualAmount: number;
  grandDeclarationTotal: number;
  grandActualTotal: number;
  grandRejectedTotal: number;
  grandApprovedTotal: number;
  grandTabStatus: boolean;
  isCheckAll: boolean;
  isDisabled: boolean;
  enableSelectAll: boolean;



  ////// ---------service
  // declarationService: DeclarationService;
  displayUploadFile = false;
  uploadedFiles: any[] = [];
  // msgs2: Message[];
  date3: Date;
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  receiptNumber: number;
  receiptAmount: number;
  receiptDate: Date;
  selectedInstitution: string;
  // policyDuplicate: string;
  //-------------------------------------------------------------------------
  //sumDeclared: any;
  enableCheckboxFlag2: any;
  greaterDateValidations: boolean;
  //minDate: Date;
  //financialYearStart: Date;
  windowScrolled: boolean;
  // ---------------------------Bharati----------------------------------
  @ViewChild( 'template2' ) template2: TemplateRef<any>;

  activeFrequencyList: Array<any> = [];
  BusinessYear: Array<any> = [];
  ServicesList: Array<any> = [];
  //ServicesList: serviceDetails[];
  CycleDefinitionList: Array<any> = [];
  CycleCreationList: Array<any> = [];
  CycleCreationList1: Array<any> = [];
  CycleDefinitionByid: Array<any> = [];
  previewCycleList: Array<any> = [];
  //tableData: any =[];
  serviceName = [];
  //selectedLevel;
  minDate: Date = new Date();


  //selectedItems=[];
  // selectedItems:serviceDetails[];


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


  constructor( private datepipe: DatePipe, private companySetttingService: CompanySettingsService, private formBuilder: FormBuilder, private alertService: AlertServiceService ) {
    this.cycelCreationForm = this.formBuilder.group( {
      id: new FormControl( null, Validators.required ),
      fromDate: new FormControl( null, Validators.required ),
      toDate: new FormControl( '', Validators.required ),
    } );
  }

  ngOnInit() { }

  DeleteCycleCreationById( businessCycleDefinitionId, BusinessYear ) {

    this.updateFlag = false;
    this.companySetttingService.DeleteCycleCreationById( businessCycleDefinitionId, BusinessYear )
      .subscribe( response => { //: saveBusinessYear[]

        this.getAllCycleCreation();
        this.CycleCreationForm.reset();
      } );
  }
  deletePreviewCycleDiscard() {
    ;
    this.updateFlag = false;
    this.companySetttingService.DeletePreviewCycleDiscard( this.businessCycleDefinitionId, this.Previewbusiness )
      .subscribe( response => { //: saveBusinessYear[]

        this.getAllCycleCreation();
        this.cycelCreationForm.reset();
      } );
  }

  GetCycleCreationById( businessCycleDefinitionId, BusinessYear ) {
    this.todisabletodate = true;
    this.updateFlag = false;
    this.CycleDefinitionByid = [];
    this.companySetttingService.getCycleCreationById( businessCycleDefinitionId, BusinessYear )
      .subscribe( response => { //: saveBusinessYear[]

        this.CycleDefinitionByid = response.data.results;
        console.log( 'cycle creation array', this.CycleDefinitionByid )
        //   this.CycleDefinitionByid.forEach(element => {
        //     element.fromDate = new Date(element.fromDate);
        //     element.toDate = new Date(element.toDate);
        // });


        // this.CycleCreationForm.patchValue({ fromDate: response.data.results[0].fromDate });
        // this.CycleCreationForm.patchValue({ toDate: response.data.results[0].toDate });
        //this.demoData=response['result'][0];
        // this.editformDate=response.data.results[0].fromDate;

        this.name = response.data.results[0].businessCycleDefinition.name;
        this.business = response.data.results[0].businessYear;
        this.Frequency = response.data.results[0].businessCycleDefinition.frequency.name;
        this.fromDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
        this.toDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;

        this.businessCycleDefinitionId = businessCycleDefinitionId;
        this.businessYearUpdate = BusinessYear;
        this.data = this.CycleDefinitionByid;
        this.adjustedToNextCycle = false;

        // this.getAllCycleCreation();
        // this.CycleCreationForm.reset();
      } );

  }

  ForcetoYearEndofcycleCreation(): void {

    // this.updateFlag=false;
    this.data.forEach( element => {
      element.toDate = this.datepipe.transform( element.toDate, "dd-MMM-yyyy" );
    } );
    const cycledata1: UpdateflagCycleCreation = Object.assign( {} );
    cycledata1.businessCycleList = this.data;
    cycledata1.adjustedToNextCycle = this.adjustedToNextCycle;

    this.companySetttingService.EdittoDate( this.businessCycleDefinitionId, this.businessYearUpdate, cycledata1 )
      .subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.todisabletodate = true;
      },
        ( error: any ) => {

          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

  }
  getAllCycleCreation(): void {
    this.CycleCreationList = [];
    this.companySetttingService.getAllCycleDefinition().subscribe( res => {

      this.CycleCreationList = res.data.results;
    } );
  }
  getAllCycleCreationList() {
    this.CycleCreationList1 = [];
    this.companySetttingService.getAllCycleCreation().subscribe( res => {

      this.CycleCreationList1 = res.data.results;
    } );

  }



}