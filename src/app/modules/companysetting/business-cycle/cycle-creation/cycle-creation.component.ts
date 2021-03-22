
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompanySettingsService } from '../../company-settings.service';
import { saveCycleCreation, UpdateflagCycleCreation } from '../../model/business-cycle-model';
import { AlertServiceService } from '../../../../core/services/alert-service.service';

@Component( {
  selector: 'app-cycle-creation',
  templateUrl: './cycle-creation.component.html',
  styleUrls: ['./cycle-creation.component.scss']
} )
export class CycleCreationComponent implements OnInit {
  modalRef: BsModalRef;
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
  // today: any = new Date();
  updateFlag: boolean = false;
  // editedRecordIndexId: number = 0;
  todisabletodate: boolean = false;


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

  displayUploadFile = false;
  // uploadedFiles: any[] = [];
  // msgs2: Message[];
  // : Date;
  // loaded = 0;
  //selectedFiles: FileList;
  // currentFileUpload: File;
  //receiptNumber: number;
  // receiptAmount: number;
  // receiptDate: Date;
  // selectedInstitution: string;

  //enableCheckboxFlag2: any;
  // greaterDateValidations: boolean;

  windowScrolled: boolean;
  // ---------------------------Bharati----------------------------------
  @ViewChild( 'template2' ) template2: TemplateRef<any>;

  // activeFrequencyList: Array<any> = [];

  // ServicesList: Array<any> = [];

  CycleDefinitionList: Array<any> = [];
  CycleCreationList: Array<any> = [];
  CycleCreationList1: Array<any> = [];
  CycleDefinitionByid: Array<any> = [];
  previewCycleList: Array<any> = [];

  serviceName = [];

  minDate: Date = new Date();




  BusinessYearform: FormGroup;
  CycleDefinationForm: FormGroup;

  CycleCreationForm: FormGroup;
  BusinessYearId: string;

  id: number = 0;

  bsConfig: Partial<BsDatepickerConfig>;
  myDateValue: Date;
  Name: string;

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

  selectedFrequency: string;
  adjustedToNextCycle: boolean = false;

  businessCycleList: Array<any> = [];
  data = [];
  businessYearUpdate: string;
  cycleCreationForm: FormGroup;




  constructor( private modalService: BsModalService, private datepipe: DatePipe, private companySetttingService: CompanySettingsService, private formBuilder: FormBuilder, private alertService: AlertServiceService ) {

  }

  ngOnInit() {
    this.cycleCreationForm = this.formBuilder.group( {
      businessCycleDefinitionId: new FormControl( '', Validators.required ),
      businessYear: new FormControl( '', Validators.required )
    } );
    this.companySetttingService.getAllCycleDefinition().subscribe( res => {
      this.CycleDefinitionList = res.data.results;
    } );
    this.getAllCycleCreationList();
    this.getAllCycleCreation();
  }

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
        this.cycleCreationForm.reset();
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

        this.name = response.data.results[0].businessCycleDefinition.name;
        this.business = response.data.results[0].businessYear;
        this.Frequency = response.data.results[0].businessCycleDefinition.frequency.name;
        this.fromDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
        this.toDate = response.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;

        this.businessCycleDefinitionId = businessCycleDefinitionId;
        this.businessYearUpdate = BusinessYear;
        this.data = this.CycleDefinitionByid;
        this.adjustedToNextCycle = false;

        this.getAllCycleCreation();
        this.CycleCreationForm.reset();
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


  addCycleCreation(): void {

    this.previewCycleList = [];

    // businessCycleDefinitionId: number;
    // businessCycleDefinition: any;
    // businessYear: number;



    const addCycleCreation: saveCycleCreation = Object.assign( {}, this.cycleCreationForm.value );

    console.log( 'add cycle creation', addCycleCreation );


    //
    //
    const businessCycleDefinition = {
      businessCycleDefinitionId: addCycleCreation.businessCycleDefinitionId,

      businessYear: addCycleCreation.businessYear
    }
    console.log( JSON.stringify( businessCycleDefinition ) );
    // if ( addCycleCreation.id == undefined || addCycleCreation.id == 0 ) {
    this.companySetttingService.AddCycleCreation( businessCycleDefinition ).subscribe( ( res: any ) => {
      console.log( 'add cycle creation', res );

      this.previewCycleList = res.data.results;
      this.businessCycleDefinitionId = res.data.results[0].businessCycleDefinition.businessYearDefinitionId;
      this.Previewname = res.data.results[0].businessCycleDefinition.cycleName;
      this.Previewbusiness = res.data.results[0].businessYear;
      this.PreviewFrequency = res.data.results[0].businessCycleDefinition.frequency.name;
      this.PreviewfromDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.fromDate;
      this.PreviewtoDate = res.data.results[0].businessCycleDefinition.businessYearDefinition.toDate;
      if ( res.status.code == '200' ) {
        this.flag = true
      } else {
        this.flag = false;
      }

      //  this.getAllCycleCreation();
      this.cycleCreationForm.reset();
      this.UploadModal2( this.template2 );
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );

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


  }
  UploadModal2( template: TemplateRef<any> ) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-xl' } )
    );
  }


  UploadModal1( template: TemplateRef<any> ) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }

  getBussinessyearName( name ): void {
    this.Name = name;
  }


  CreateMoreCycleforNextYear() {

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
  }
  getBussinessyear( bussinessyear: number, businessCycleDefinitionid ): void {
    ;
    this.BusinessYearformorecycle = ++bussinessyear;
    this.businessCycleDefinitionIdforMoreCycle = businessCycleDefinitionid;
  }




}
