
import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { AlertServiceService } from '../../../core/services/alert-service.service';


import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';



@Component( {
  selector: 'app-business-cycle',
  templateUrl: './business-cycle.component.html',
  styleUrls: ['./business-cycle.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class BusinessCycleComponent implements OnInit {

  public tabIndex = 0;
  public accountNo: string;
  public windowScrolled: boolean;
  public data: any;

  today: any = new Date();
  editedRecordIndexId: number = 0;

  // summaryGridData: Array<any> = [];
  // summaryComputationGridDate: any;
  // masterGridData: Array<any> = [];
  //paymentDetailGridData: Array<any> = [];
  //declarationGridData: Array<any> = [];
  //familyMemberGroup: Array<any> = [];
  frequencyOfPayment: Array<any> = [];
  // BusinessYear: Array<any> = [];
  //InstitutionNames: Array<any> = [];
  transactionDetail: Array<any> = [];
  uploadGridData: Array<any> = [];
  //transactionInstitutionNames: Array<any> = [];
  familyMemberName: Array<any> = [];

  // form: FormGroup;
  // form1: FormGroup;
  Index: number;
  showUpdateButton: boolean;
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
  businessYearUpdate: string;
  CycleDefinitionList: any[];
  sortedFrequencyList = [];
  BusinessyearList: any[];
  CycleCreationList1: any;
  //template2:TemplateRef<any>;
  //template2: ElementRef;



  constructor(
    private formBuilder: FormBuilder,
    private companySettings: CompanySettingsService,
    private alertService: AlertServiceService ) {

    this.isCheckAll = false;
    this.isDisabled = true;
    this.enableSelectAll = false;
    
  }


  modalRef: BsModalRef;
  modalRef1: BsModalRef;

  changeTabIndex(index: number)
  {
    // console.log(this.accountNo)
    if(index !== 2) {
      this.data = undefined;
    }
    if(index !== 1) {
      this.accountNo = undefined;
    }
    this.tabIndex = index;
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  BusinessCycleTabClick(){
    this.getAllCycleDefinition();
    this.getAllCycleCreationList();
  }

  businessCycleDefinationTabClick(){

    this.getActiveFrequency();
    this.getAllCycleDefinition();
    this.getAllBusinessyear();
  }

    //get all Businessyear
    getAllBusinessyear(): void {
      this.BusinessyearList = [];
      this.companySettings.getAllBusinessYear().subscribe( res => {
        this.BusinessyearList = res.data.results;
        this.BusinessyearList.forEach(element => {
          console.log("this.businessYearList" + JSON.stringify(element.description))
        });
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }

  
  getAllCycleCreationList() {
    this.CycleCreationList1 = [];
    this.companySettings.getAllCycleCreation().subscribe( res => {

      this.CycleCreationList1 = res.data.results;
    } );

  }

getActiveFrequency() {
  this.activeFrequencyList = [];
  this.companySettings.getActiveFrequency().subscribe( res => {

    this.activeFrequencyList = res.data.results;
  }, ( error ) => {

  }, () => {
    // for ( let i = 0; i < this.activeFrequencyList.length; i++ ){
    if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'daily' ) !== -1 ) {
      //console.log( 'in daily' );
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'daily' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    } if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'weekly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'weekly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    }
    if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'biweekly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'biweekly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    }
    if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'semi-monthly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'semi-monthly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    }
    if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'monthly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'monthly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    }
    if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'quarterly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'quarterly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    }
    if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'half-yearly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'half-yearly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    } if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'yearly' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'yearly' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );

    } if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'adhoc' ) !== -1 ) {
      const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'adhoc' );
      this.sortedFrequencyList.push( this.activeFrequencyList[index] );
    }
    //console.log( ' this.sortedFrequencyList', this.sortedFrequencyList );
  } );
}

  getAllCycleDefinition() {
    this.CycleDefinitionList = [];
    this.companySettings.getAllCycleDefinition().subscribe( res => {
      this.CycleDefinitionList = res.data.results;
     

    } );

  }




  ngOnInit(): void {

    this.myDateValue = new Date();
    this.bsConfig = Object.assign( {}, { containerClass: 'theme-green custom' } );



  }







  OntoDateChange( event ): void {

    //  this.todisabletodate = false;
  }










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

    
  }



onOpenCalendar( container ) {

    container.monthSelectHandler = ( event: any ): void => {
      container._store.dispatch( container._actions.select( event.date ) );
    };
    container.setViewMode( 'month' );
  }






  declarationPage() {
  }
  // Get Master Page Data API call
  masterPage() {
    // this.getAllBusinessyear();
  }

  // Post Master Page Data API call
  addMaster( formData: any, formDirective: FormGroupDirective ): void {
    

  }
}

