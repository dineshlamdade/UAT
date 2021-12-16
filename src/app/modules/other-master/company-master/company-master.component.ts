import { ShortenStringPipe } from './../../../core/utility/pipes/shorten-string.pipe';
import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CompanyMasterService } from './company-master.service';
import { CompanyGroupMasterService } from '../company-group-master/company-group-master.service';
import { companyMasterRequestDTOs, EmployeeMasterRequestDTO, requestDTOString } from './dto-models/company-master-dto';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
import { th } from 'date-fns/locale';
// import { Table } from 'primeng/table';

@Component( {
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.scss'],
  providers: [ShortenStringPipe]
} )
export class CompanyMasterComponent implements OnInit {
  public companyMasterform: any = FormGroup;
  
  selectedImageFileLogo1: any;
  selectedImageFileLogo2: any;
  selectedImageFileLogo3: any;
  @ViewChild( 'fileInput' ) public el: ElementRef;
  // @ViewChild('fileInput2') fileInput2: any;
  //public groupStartDateValidation;
  public shortNameInvalid: boolean = false;
  public companyNameInvalid: boolean = false;
  public invalidWebsite: boolean = false;


  imageUrl: any = "./assets/emp-master-images/empIcon5.png";
  selectedImg: any;




  employeeMasterRequestDTO = new EmployeeMasterRequestDTO( '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' );
  countryCode: Array<any> = [];
  public isContractorDataList = ['Group Company', 'Contractor'];
  public companyClassificationList = ['A', 'B', 'C'];
  // public languageList = ['English'];
  //public currencyList = ['Dollar','Euro', 'Rupee', 'Yen', 'Pound','Rupees'];
  currencyList: Array<any> = [];
  languageList: Array<any> = [];
  public summaryHtmlDataList = [];
  public companyGroupCodeList = [];
  masterGridDataList: Array<any> = [];
  public scaleList = [];
  public reasonForExitList = [];
  public typeOfEstablishmentList = [];
  public industryTypeList = [];
  countries: Array<any> = [];
  isEditMode: boolean = false;
  companyMasterRequestDTOs = new companyMasterRequestDTOs();
  requestDTOString = new requestDTOString();
  index: any;
  showButtonSaveAndReset: boolean = true;
  globalCompanyMasterId: number;
  hideRemarkDiv: boolean = true;
  uploadFiles: any;
  public tempObjForgroupNameScaleStartDate: any;
  isSaveAndReset: boolean = true;
  public today = new Date();

  public groupNameScaleNameStartDateObject: any[] = [];

  header: any[];
  excelData: any[];
  logo1Path: any;
  editlogo1: any = '';
  result: any;
  //logo1ImageName: any;
  //logo2ImageName:any;
  viewlogoflag:boolean=false;

  constructor( private shortenString: ShortenStringPipe, private cd: ChangeDetectorRef, private formBuilder: FormBuilder, private datePipe: DatePipe, private companyMasterService: CompanyMasterService,
    private companyGroupMasterService: CompanyGroupMasterService, private alertService: AlertServiceService, private excelservice: ExcelserviceService ) {
    this.summaryHtmlDataList = [];
    this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '' };




    this.companyMasterform = this.formBuilder.group( {
      name: new FormControl(''),
      // code: new FormControl({ value: null, disabled: true }),
      code: new FormControl( { value: null, disabled: true } ),
      companyName: new FormControl( '', Validators.required ),
      shortName: new FormControl( '', Validators.required ),
      companyGroupCode: new FormControl( '', Validators.required ),
      companyGroupCode1: new FormControl( { value: null, disabled: true } ),
      typeOfEstablishment: new FormControl( '', Validators.required ),
      industryType: new FormControl( '', Validators.required ),
      scale: new FormControl( '', Validators.required ),
      coClassification: new FormControl( '', Validators.required ),
      startDate: new FormControl( '', [Validators.required] ),
      formerName: new FormControl( '' ),
      address1: new FormControl( '', Validators.required ),
      address2: new FormControl( '' ),
      address3: new FormControl( '' ),
      country: new FormControl( '', Validators.required ),
      pinCode: new FormControl( '', Validators.required ),
      state: new FormControl( { value: null, disabled: true } ),
      city: new FormControl( { value: null, disabled: true } ),
      village: new FormControl( '' ),
      // tslint:disable-next-line: max-line-length
      phoneNumber: ['', Validators.compose( [Validators.required, Validators.pattern( /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/ )] )],
      emailId: new FormControl( '', [Validators.pattern( "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )] ),
      website: new FormControl( '', [Validators.pattern( "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?" )] ),
      isContractor: new FormControl( '' ),
      language: new FormControl( '' ),
      currency: new FormControl( '' ),
     logo1: new FormControl( '' ),
   
      logo2: new FormControl( '' ),
      logo3: new FormControl( '' ),
      endDate: new FormControl( '' ),
      reason: new FormControl( '' ),
      remark: new FormControl( '' ),
      isdCode: new FormControl( '', Validators.required ),
      officialMobileNumber: new FormControl( '' ),
      contactInformation: new FormControl( '' ),
      companyActive: new FormControl( '' ),
    } );

    this.companyMasterform.get( 'remark' ).disable();
    this.companyMasterform.get( 'reason' ).disable();
    this.companyMasterform.get( 'endDate' ).disable();
    this.companyMasterform.get( 'companyActive' ).setValue( true );
    this.companyMasterform.get( 'companyActive' ).disable();
    this.employeeMasterRequestDTO.isContractor = '';
    this.employeeMasterRequestDTO.language = 'English';
  }

  ngOnInit(): void {
    this.employeeMasterRequestDTO.isContractor = '';
    this.employeeMasterRequestDTO.reason = '';
    this.companyMasterform.get( 'companyActive' ).disable();
    this.deactiveActiveCheckBox();

    this.companyMasterService.getLanguagesList().subscribe( res => {
      this.languageList = res.data.results;
    } )

    this.companyMasterService.getCurrencyList().subscribe( res => {
      this.currencyList = res.data.results;
    }, ( error: any ) => {
      //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

    }, () => {
      this.companyMasterform.patchValue( {
        currency: this.currencyList[2],
      } );
    } );
    this.employeeMasterRequestDTO.currency = this.currencyList[2];
    this.employeeMasterRequestDTO.companyActive = true;
    this.companyMasterService.getLocationInformationOrCountryList().subscribe( res => {
      this.countries = res.data.results;
    } );

    this.companyGroupMasterService.getCompanygroupdropdownReasonForExitMaster().subscribe( res => {
      // console.log(res);
      res.data.results.forEach( element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.reasonForExitList.push( obj );
      } );
    } );

    this.companyMasterService.getTypeOfEstablishment().subscribe( res => {
      res.data.results.forEach( element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.typeOfEstablishmentList.push( obj );
      } );

    } );

    this.companyGroupMasterService.getCompanygroupdropdownScaleMaster().subscribe( res => {
      res.data.results.forEach( element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.scaleList.push( obj );
      } );
    } );

    this.companyMasterService.getIndustryTypeMaster().subscribe( res => {
      res.data.results.forEach( element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.industryTypeList.push( obj );
      } );
    } );
    this.companyMasterService.getCountryCodes().subscribe( res => {
      this.countryCode = res.data.results;
    } );
    this.refreshHtmlTableData();
  }

// ngngAfterViewInit(){
// console.log(this.el.nativeElement.innerHtml);
// }


  editMaster( i: number, globalCompanyMasterId: number ,summary) {
    //view logo disable
    this.viewlogoflag=false;

    console.log("globalCompanyMasterId",globalCompanyMasterId)
    console.log("i",i)
    console.log("summary",summary)

    window.scrollTo( 0, 0 );
    this.companyMasterform.get( 'code' ).disable();
    this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };
    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = false;
    this.requestDTOString.companyMasterRequestDTOs = [];


    this.selectedImageFileLogo1 = undefined;
    this.selectedImageFileLogo2 = undefined;
    this.selectedImageFileLogo3 = undefined;
    this.companyMasterform.reset();
    this.companyMasterform.enable();
    this.globalCompanyMasterId = globalCompanyMasterId;


    // const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    // if (to !== '9999-12-31') {
    //   this.companyMasterform.controls['remark'].clearValidators();
    //   this.companyMasterform.controls['remark'].updateValueAndValidity();
    //   this.companyMasterform.controls['reason'].clearValidators();
    //   this.companyMasterform.controls['reason'].updateValueAndValidity();
    // }
    this.index = 0;
   // console.log( this.masterGridDataList[i].isContractor );

    this.companyMasterform.patchValue( this.masterGridDataList[i] );
    //  this.employeeMasterRequestDTO.logo1 =this.masterGridDataList[i].logo1ImageName;
    
  // this.companyMasterform.get('logo1').set(this.masterGridDataList[i].logo1ImageName);
  this.employeeMasterRequestDTO.logo1=this.masterGridDataList[i].logo1ImageName;
  //  console.log(this.masterGridDataList[i])
  //  this.logo1Path = this.masterGridDataList[i].companyLogo1
   
  
  // this.companyMasterform.get('logo1').setValue(this.masterGridDataList[i].logo1ImageName)
    // this.companyMasterform.controls['logo1'].setValue(this.masterGridDataList[i].logo1ImageName)
    //this.companyMasterform.controls.setValue(this.masterGridDataList['logo1'].logo1ImageName);
    //console.log( this.masterGridDataList[i] );
    
    this.employeeMasterRequestDTO.logo2=this.masterGridDataList[i].logo2ImageName;
    this.employeeMasterRequestDTO.logo3=this.masterGridDataList[i].logo3ImageName;


   // this.companyMasterform.get('logo1').setValue(this.masterGridDataList[i].logo1, {emitModelToViewChange: false});
   
    this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find( o => o.companyGroupCode === this.masterGridDataList[i].companyGroupCode );
   // console.log( this.tempObjForgroupNameScaleStartDate );
    this.companyMasterform.patchValue( {
      companyGroupCode1: this.tempObjForgroupNameScaleStartDate.companyGroupName,
    } );

    this.companyMasterform.controls['endDate'].clearValidators();
    this.companyMasterform.controls['remark'].clearValidators();
    this.companyMasterform.controls["endDate"].updateValueAndValidity();
    this.companyMasterform.controls["remark"].updateValueAndValidity();
    this.companyMasterform.get( 'code' ).disable();
    this.companyMasterform.get( 'state' ).disable();
    this.companyMasterform.get( 'city' ).disable();
    this.companyMasterform.get( 'companyActive' ).enable();

  }


  viewMaster( globalCompanyMasterId: number, i: number ) {

    this.viewlogoflag=true;
    window.scrollTo( 0, 0 );
    this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };

     this.selectedImageFileLogo1 = undefined;
    this.selectedImageFileLogo2 = undefined;
    this.selectedImageFileLogo3 = undefined;
    this.globalCompanyMasterId = 0;
    this.showButtonSaveAndReset = false;
    this.companyMasterform.reset();
    this.companyMasterform.patchValue( this.masterGridDataList[i] );
    this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find( o => o.companyGroupCode === this.masterGridDataList[i].companyGroupCode );
    console.log( this.tempObjForgroupNameScaleStartDate );
    this.companyMasterform.patchValue( {
      companyGroupCode1: this.tempObjForgroupNameScaleStartDate.companyGroupName,
    } );
    // if (this.employeeMasterRequestDTO.isContractor === true) {
    //   // this.companyMasterform.patchValue({
    //   //   contractor: 'Yes',
    //   // });
    // } else {
    //   // const newLocal = 'No';
    //   // this.companyMasterform.patchValue({
    //   //   contractor: newLocal,
    //   // });

    // }
//for logo in View Mode
    //this.companyMasterform.patchValue( this.masterGridDataList[i] );
    this.employeeMasterRequestDTO.logo1=this.masterGridDataList[i].logo1ImageName;
    this.employeeMasterRequestDTO.logo2=this.masterGridDataList[i].logo2ImageName;
    this.employeeMasterRequestDTO.logo3=this.masterGridDataList[i].logo3ImageName;

    this.companyMasterform.disable();
  }

  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];

    this.companyMasterService.getAllCompanyMasterData().subscribe( res => {
      console.log( 'check', res );
      this.masterGridDataList = res.data.results;
      let i = 1;
      res.data.results.forEach( element => {
        // let contractor;
        // if (element.contractor === false) {
        //   contractor = 'No';
        // } else {
        //   contractor = 'Yes'
        // }
        const obj = {
          SrNo: i++,
          shortName: element.shortName,
          shortenShortName: this.shortenString.transform( element.shortName ),
    //for date format
          StartDate: new Date(element.startDate),
          //end date format
           EndDate: element.endDate,
         // EndDate:new Date(element.endDate),
          Scale: element.scale,
          companyGroupId: element.companyGroupId,
          globalCompanyMasterId: element.globalCompanyMasterId,
          address1: element.address1,
          address2: element.address2,
          address3: element.address3,
          city: element.city,
          coClassification: element.coClassification,
          code: element.code,
          companyActive: element.companyActive,
         companyLogo1: element.companyLogo1 ? null : '',
        //  companyLogo1: element.companyLogo1,
          companyLogo2: element.companyLogo2 ? null : '',
          companyLogo3: element.companyLogo3 ? null : '',
          companyName: element.companyName,
          shortenCompanyName: this.shortenString.transform( element.companyName ),
          country: element.country,
          createdBy: element.createdBy,
          createdOn: element.createdOn,
          currency: element.currency,
          emailId: element.emailId,
          formerName: element.formerName,
          industryType: element.industryType,
          shortenIndustryType: this.shortenString.transform( element.industryType ),
          language: element.language,
         logo1ImageName: element.logo1ImageName ? null : '',
        //  logo1ImageName: element.logo1ImageName,
         logo1Type: element.logo1Type ? null : '',
        //  logo1Type: element.logo1Type,
          logo2ImageName: element.logo2ImageName ? null : '',
          logo2Type: element.logo2Type ? null : '',
          logo3ImageName: element.logo3ImageName ? null : '',
          logo3Type: element.logo3ImageName ? null : '',
          pinCode: element.pinCode,
          reason: element.reason,
          remark: element.remark,
          scale: element.scale,
          state: element.state,
          typeOfEstablishment: element.typeOfEstablishment,
          updatedBy: element.updatedBy,
          updatedOn: element.updatedOn,
          isContractor: element.isContractor,
          village: element.village,
          website: element.website,
          servicePeriod: element.servicePeriod,
          servicePeriodShort: element.servicePeriodShort
        };
        this.summaryHtmlDataList.push( obj );
      } );
    } );

    console.log( 'summary' );
    console.log( this.summaryHtmlDataList );

    this.companyGroupMasterService.getCompanyGroupMasterActive().subscribe( res => {
      this.companyGroupCodeList = [];
      this.groupNameScaleNameStartDateObject = [];

      console.log( res );

      res.data.results.forEach( element => {
        if ( element.companyGroupActive == true ) {
          this.companyGroupCodeList.push( { name: element.companyGroupCode, disabled: false } );
        } else {
          this.companyGroupCodeList.push( { name: element.companyGroupCode, disabled: true } );
        }
        this.groupNameScaleNameStartDateObject.push( { companyGroupCode: element.companyGroupCode, startDate: element.startDate, scale: element.scale, companyGroupName: element.companyGroupName } );
      } );
    } );
  }
  cancelViewMasterForm() {
    //view logo disable
    this.viewlogoflag=false;

    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = true;

    this.employeeMasterRequestDTO = new EmployeeMasterRequestDTO( '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' );
    // this.isEditMode = false;
    this.selectedImageFileLogo1 = undefined;
    this.selectedImageFileLogo2 = undefined;
    this.selectedImageFileLogo3 = undefined;
    this.tempObjForgroupNameScaleStartDate = { scale: '', companyGroupCode: '', startDate: '', companyGroupName: '' };
    this.globalCompanyMasterId = 0;
    this.deactivateRemark();
    this.saveFormValidation();
  }
  // copied from companygroup master
  // onChangeEndDate(evt: any) {
  //   console.log(this.companyMasterform.get('endDate').value);
  //   // console.log(this.endDateModel);
  //   //  console.log(evt.target.value);
  //   //  console.log(this.form.get('endDate').value);
  //   if (this.companyMasterform.get('endDate').value == '' || this.companyMasterform.get('endDate').value == null) {
  //     this.companyMasterform.controls["remark"].clearValidators();
  //     this.companyMasterform.controls["remark"].updateValueAndValidity();

  //     this.companyMasterform.controls["reason"].clearValidators();
  //     this.companyMasterform.controls["reason"].updateValueAndValidity();

  //   } else {
  //     console.log(evt);
  //     console.log(this.companyMasterform.get('endDate').value);
  //     const from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
  //     const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
  //     if (from > to) {
  //       this.companyMasterform.controls['endDate'].reset()

  //     }

  //     this.companyMasterform.controls["remark"].setValidators(Validators.required);
  //     this.companyMasterform.controls["remark"].updateValueAndValidity();

  //     this.companyMasterform.controls["reason"].setValidators(Validators.required);
  //     this.companyMasterform.controls["reason"].updateValueAndValidity();
  //     this.companyMasterform.get('companyGroupActive').setValue(true);
  //     this.deactivateRemark();



  //   }


  // }
  onChangeEndDate( evt: any ) {
    // const from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
    // const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    // if (from > to) {
    //   this.companyMasterform.controls['endDate'].reset();
    // }
    if ( this.companyMasterform.get( 'endDate' ).value == '' || this.companyMasterform.get( 'endDate' ).value == null ) {
      this.companyMasterform.get( 'remark' ).clearValidators();
      this.companyMasterform.controls['remark'].updateValueAndValidity();
      this.companyMasterform.get( 'reason' ).clearValidators();
      this.companyMasterform.controls['reason'].updateValueAndValidity();

      this.companyMasterform.patchValue( {
        remark: '',
        reason: '',
      } );

      this.companyMasterform.get( 'remark' ).disable();
      this.companyMasterform.get( 'reason' ).disable();

    } else {
      this.companyMasterform.get( 'remark' ).enable();
      this.companyMasterform.get( 'reason' ).enable();

      this.companyMasterform.controls['remark'].setValidators( Validators.required );
      this.companyMasterform.controls['remark'].updateValueAndValidity();

      this.companyMasterform.controls['reason'].setValidators( Validators.required );
      this.companyMasterform.controls['reason'].updateValueAndValidity();
      this.companyMasterform.get( 'companyActive' ).setValue( false );

      this.deactivateRemark();

    }

  }
  onChangeStartDate() {
    const from = this.datePipe.transform( this.companyMasterform.get( 'startDate' ).value, 'yyyy-MM-dd' );
    const to = this.datePipe.transform( this.tempObjForgroupNameScaleStartDate.startDate, 'yyyy-MM-dd' );
    this.today = new Date( from );
    console.log( this.tempObjForgroupNameScaleStartDate.startDate );

    if ( from < to ) {
      alert( 'Start Date should not be less than Company Group Start Date' );
      this.companyMasterform.patchValue( {
        startDate: '',
      } );
    } else {
      console.log( 'greater' );
    }

  }
  deactivateRemark() {

  }
  deactivateRemark1() {
    if ( this.companyMasterform.value.companyActive === false ) {
      // this.companyMasterform.get( 'companyActive' ).disable();

      // this.hideRemarkDiv = true;
      this.companyMasterform.get( 'remark' ).enable();
      this.companyMasterform.get( 'remark' ).setValidators( [Validators.required] );

      this.companyMasterform.get( 'remark' ).updateValueAndValidity();
      // this.companyMasterform.get('companyActive').disable();
    } else {

      this.companyMasterform.get( 'remark' ).clearValidators();
      this.companyMasterform.get( 'remark' ).updateValueAndValidity();
      this.companyMasterform.get( 'remark' ).disable();
      // this.hideRemarkDiv = false;
      //  this.companyMasterform.get( 'companyActive' ).enable();


      // this.companyMasterform.get('remark').reset();
    }
  }
  deactiveActiveCheckBox() {
    this.deactivateRemark();
  }


  saveCompanyMaster( employeeMasterRequestDTO ) {
//view logo disable
    this.viewlogoflag=false;

    console.log( employeeMasterRequestDTO );
    if ( this.globalCompanyMasterId > 0 ) {
      this.requestDTOString.companyMasterRequestDTOs = [];
      console.log( 'clcicked on update button' );
      const companyName = this.companyMasterform.get( 'companyName' ).value;
      const scale = this.companyMasterform.get( 'scale' ).value;
      const code = this.companyMasterform.get( 'code' ).value;
      const data = this.companyMasterform.getRawValue();
      const startDate = this.datePipe.transform( this.companyMasterform.get( 'startDate' ).value, 'dd-MMM-y' );
      const endDate = this.datePipe.transform( this.companyMasterform.get( 'endDate' ).value, 'dd-MMM-y' );

      this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = this.globalCompanyMasterId;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = code;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get( 'shortName' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get( 'companyName' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get( 'formerName' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupCode = this.companyMasterform.get( 'companyGroupCode' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address1 = this.companyMasterform.get( 'address1' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address2 = this.companyMasterform.get( 'address2' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address3 = this.companyMasterform.get( 'address3' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.country = this.companyMasterform.get( 'country' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.pinCode = this.companyMasterform.get( 'pinCode' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.state = this.companyMasterform.get( 'state' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.city = this.companyMasterform.get( 'city' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.village = this.companyMasterform.get( 'village' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.isdCode = this.companyMasterform.get( 'isdCode' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.phoneNumber = this.companyMasterform.get( 'phoneNumber' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.emailId = this.companyMasterform.get( 'emailId' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.website = this.companyMasterform.get( 'website' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.isContractor = this.companyMasterform.get( 'isContractor' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.typeOfEstablishment = this.companyMasterform.get( 'typeOfEstablishment' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.language = this.companyMasterform.get( 'language' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.currency = this.companyMasterform.get( 'currency' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.industryType = this.companyMasterform.get( 'industryType' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.scale = scale;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.coClassification = this.companyMasterform.get( 'coClassification' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.startDate = startDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.endDate = endDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.reason = this.companyMasterform.get( 'reason' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyActive = true;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.remark = this.companyMasterform.get( 'remark' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo1 = this.companyMasterform.get( 'logo1' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo2 = this.companyMasterform.get( 'logo2' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo3 = this.companyMasterform.get( 'logo3' ).value;

      this.companyMasterRequestDTOs.companyMasterRequestDTOs.push( this.companyMasterRequestDTOs.employeeMasterRequestDTO );

      console.log( this.companyMasterRequestDTOs.employeeMasterRequestDTO );

      this.requestDTOString.companyMasterRequestDTOs.push( this.companyMasterRequestDTOs.companyMasterRequestDTOs[0] );
      console.log( this.selectedImageFileLogo2 );
      var formData = new FormData();

      console.log( JSON.stringify( this.requestDTOString ) );
      formData.append( 'requestDTOString', JSON.stringify( this.requestDTOString ) );
      if ( this.selectedImageFileLogo1 !== undefined ) {
        formData.append( 'files', this.selectedImageFileLogo1, this.employeeMasterRequestDTO.shortName + ' 1.jpg' );
       
      }
      if ( this.selectedImageFileLogo2 !== undefined ) {
        formData.append( 'files', this.selectedImageFileLogo2, this.employeeMasterRequestDTO.shortName + ' 2.jpg' );
      }
      
      if ( this.selectedImageFileLogo3 !== undefined ) {
        formData.append( 'files', this.selectedImageFileLogo3, this.employeeMasterRequestDTO.shortName + ' 3.jpg' );
      }
      // formData.append('file', this.companyMasterform.get('logo1').value);
      // formData.append('file', this.companyMasterform.get('logo2').value);
      // formData.append('file', this.companyMasterform.get('logo3').value);

      console.log("formData",formData)
      this.companyMasterService.postCompanyMaster( formData ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Company  Master Updated Successfully.', '' );
          this.employeeMasterRequestDTO = new EmployeeMasterRequestDTO( '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' );

          // this.companyMasterform.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.globalCompanyMasterId = 0;
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        //this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );

    } else {
      console.log( 'clcicked on new record save button' );
      this.requestDTOString.companyMasterRequestDTOs = [];
      const companyName = this.companyMasterform.get( 'companyName' ).value;
      const scale = this.companyMasterform.get( 'scale' ).value;
      const code = this.companyMasterform.get( 'code' ).value;
      const data = this.companyMasterform.getRawValue();
      const startDate = this.datePipe.transform( this.companyMasterform.get( 'startDate' ).value, 'dd-MMM-y' );
      const endDate = this.datePipe.transform( this.companyMasterform.get( 'endDate' ).value, 'dd-MMM-y' );
      // let isContractor2: boolean;
      // if (this.companyMasterform.get('contractor').value === 'No') {
      //   isContractor2 = false;
      // } else {
      //   isContractor2 = true;
      // }

      this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = 0;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = this.companyMasterform.get( 'code' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get( 'shortName' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get( 'companyName' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get( 'formerName' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupCode = this.companyMasterform.get( 'companyGroupCode' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address1 = this.companyMasterform.get( 'address1' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address2 = this.companyMasterform.get( 'address2' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address3 = this.companyMasterform.get( 'address3' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.country = this.companyMasterform.get( 'country' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.pinCode = this.companyMasterform.get( 'pinCode' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.state = this.companyMasterform.get( 'state' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.city = this.companyMasterform.get( 'city' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.village = this.companyMasterform.get( 'village' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.phoneNumber = this.companyMasterform.get( 'phoneNumber' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.isdCode = this.companyMasterform.get( 'isdCode' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.emailId = this.companyMasterform.get( 'emailId' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.website = this.companyMasterform.get( 'website' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.isContractor = this.companyMasterform.get( 'isContractor' ).value;;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.typeOfEstablishment = this.companyMasterform.get( 'typeOfEstablishment' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.language = this.companyMasterform.get( 'language' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.currency = this.companyMasterform.get( 'currency' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.industryType = this.companyMasterform.get( 'industryType' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.scale = scale;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.coClassification = this.companyMasterform.get( 'coClassification' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.startDate = startDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.endDate = endDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.reason = this.companyMasterform.get( 'reason' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyActive = true;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.remark = this.companyMasterform.get( 'remark' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo1 = this.companyMasterform.get( 'logo1' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo2 = this.companyMasterform.get( 'logo2' ).value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo3 = this.companyMasterform.get( 'logo3' ).value;

      this.companyMasterRequestDTOs.companyMasterRequestDTOs.push( this.companyMasterRequestDTOs.employeeMasterRequestDTO );

      console.log( this.companyMasterRequestDTOs.companyMasterRequestDTOs );

      this.requestDTOString.companyMasterRequestDTOs.push( this.companyMasterRequestDTOs.companyMasterRequestDTOs[0] );

      var formData = new FormData();
     formData.append('file', this.companyMasterform.get('logo1').value);
      //console.log( JSON.stringify( this.requestDTOString ) );
      formData.append( 'requestDTOString', JSON.stringify( this.requestDTOString ) );

      if ( this.selectedImageFileLogo1 !== undefined ) {
        formData.append( 'files', this.selectedImageFileLogo1, this.employeeMasterRequestDTO.shortName + ' 1.jpg' );
      }
      if ( this.selectedImageFileLogo2 !== undefined ) {
        formData.append( 'files', this.selectedImageFileLogo2, this.employeeMasterRequestDTO.shortName + ' 2.jpg' );
      }
      if ( this.selectedImageFileLogo3 !== undefined ) {
        formData.append( 'files', this.selectedImageFileLogo3, this.employeeMasterRequestDTO.shortName + ' 3.jpg' );
      }

      // formData.append('file', this.companyMasterform.get('logo1').value);
      // formData.append('file', this.companyMasterform.get('logo2').value);
      // formData.append('file', this.companyMasterform.get('logo3').value);

      this.companyMasterService.postCompanyMaster( formData ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Company  Master Saved Successfully.', '' );

          // this.companyMasterform.reset();
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );
      

    }


  }


  checkLocalAddress() {
  }
  clearLocalAddressFields() {


  }
  getPermanentAddressFromPIN() {
    console.log( this.companyMasterform.get( 'pinCode' ).value );
    if ( this.companyMasterform.get( 'pinCode' ).value.length < 6 ) {
      this.companyMasterform.get( 'state' ).setValue( '' );
      this.companyMasterform.get( 'city' ).setValue( '' );
    }
    if ( this.companyMasterform.get( 'pinCode' ).value.length == 6 && this.companyMasterform.get( 'country' ).value == 'India' ) {
      this.companyMasterService.getAddressFromPIN( this.companyMasterform.get( 'pinCode' ).value ).subscribe( res => {
        console.log( res );
        this.companyMasterform.get( 'state' ).setValue( res.data.results[0].state );
        this.companyMasterform.get( 'city' ).setValue( res.data.results[0].city );

      }, ( error: any ) => {
        //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );
    }
  }
  setPaymentDetailToDate( evt: any ) {
    let endDate12 = this.datePipe.transform( this.companyMasterform.get( 'endDate' ).value, 'dd-MMM-y' );
    // debugger
    // console.log(this.endDate1);
    // console.log(this.endDate1.nativeElement);
    // console.log(this.endDate1.nativeElement.value);
    // if (this.endDate1 !== undefined) {
    //   this.endDate1.nativeElement.value = this.datePipe.transform(this.endDate1.nativeElement.value, 'dd-MMM-y');

    // }
    //  console.log(this.endDate1.nativeElement.value);
    // const endDate = this.datePipe.transform(this.endDateModel, 'yyyy-MM-dd');



    if ( endDate12 == '' || endDate12 == null ) {
      this.companyMasterform.controls["remark"].clearValidators();
      this.companyMasterform.controls["remark"].updateValueAndValidity();

      this.companyMasterform.controls["reason"].clearValidators();
      this.companyMasterform.controls["reason"].updateValueAndValidity();

    } else {
      this.companyMasterform.controls["remark"].setValidators( [Validators.required] );
      this.companyMasterform.controls["remark"].updateValueAndValidity();

      this.companyMasterform.controls["reason"].setValidators( [Validators.required] );
      this.companyMasterform.controls["reason"].updateValueAndValidity();
      // this.form.get('companyGroupActive').setValue(true);
      // this.hideRemarkDiv = false;
      this.deactivateRemark();
      // } else {
      //   this.form.get('companyGroupActive').setValue(false);
      //   this.hideRemarkDiv = true;
      //   this.deactivateRemark();

      //
    }
  }

  // setPaymentDetailToDate() {
  //   // const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
  //   // if (to !== null) {
  //   //   if (to.trim() === '9999-12-31') {
  //       this.companyMasterform.controls["remark"].clearValidators();
  //       this.companyMasterform.controls["remark"].updateValueAndValidity();

  //       this.companyMasterform.controls["reason"].clearValidators();
  //       this.companyMasterform.controls["reason"].updateValueAndValidity();
  //       this.companyMasterform.get('companyActive').setValue(true);
  //       this.deactivateRemark();



  // }
  // selected image bindind
  uploadFile( event, uploadFile ) {
    console.log( event );
    console.log( uploadFile );
    console.log( uploadFile.files[0] );

    //  this.selectedImageFile = uploadFile.files[0];

    this.uploadFiles = uploadFile.files[0];
    this.companyMasterform.markAsTouched();

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];

    if ( event.target.files && event.target.files[0] ) {
      reader.readAsDataURL( file );

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;

        // this.selectedImageFile = this.imageUrl;
        //  this.companyMasterform.get("logo3").patchValue({file: this.selectedImageFile});
        //  this.companyMasterform.patchValue({
        //    file: reader.result
        //  });

      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
 
  logo1( event, uploadFile ) {
  //  console.log( 'in log1' );

    let file = ( event.target.files[0] as File );

     let reader = new FileReader();
    //console.log( reader );

    if ( event.target.files && event.target.files.length  ) {


      this.selectedImageFileLogo1 = event.target.files[0];
      const [file] = event.target.files;
    
       reader.readAsDataURL( file );
      // console.log(reader.result);
      // need to run CD since file load runs outside of zone

      this.cd.markForCheck();

      
    };
    // var selectedImageFileLogo11 = event.target.files[0];
    this.employeeMasterRequestDTO.logo1 = file.name;
   
  }


  logo2( event, uploadFile ) {

    const file = ( event.target.files[0] as File );
    const reader = new FileReader();

    if ( event.target.files && event.target.files.length ) {

      this.selectedImageFileLogo2 = event.target.files[0];
      // console.log(event.target.files);
      
      const [file] = event.target.files;
      reader.readAsDataURL( file );
      this.cd.markForCheck();
    };
    this.employeeMasterRequestDTO.logo2 = file.name;
    
  }


  logo3( event, uploadFile ) {

    const file = ( event.target.files[0] as File );
    const reader = new FileReader();

    if ( event.target.files && event.target.files.length ) {
      this.selectedImageFileLogo3 = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL( file );
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    };
    this.employeeMasterRequestDTO.logo3 = file.name;
  }

  onSelectGroupMaster( evt: any ) {
    console.log( evt );

    if ( evt == '' ) {
      this.tempObjForgroupNameScaleStartDate = null;
      this.companyMasterform.patchValue( {
        scale: '',
        companyGroupCode1: '',
        startDate: ''
      } );
    } else {
      this.tempObjForgroupNameScaleStartDate = null;
      console.log( evt );
      //  console.log(evt.target.value);
      this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find( o => o.companyGroupCode === evt );
      console.log( this.tempObjForgroupNameScaleStartDate );
      this.companyMasterform.patchValue( {
        scale: this.tempObjForgroupNameScaleStartDate.scale,
        companyGroupCode1: this.tempObjForgroupNameScaleStartDate.companyGroupName,
        startDate: ''
      } );
     // this.groupStartDateValidation = new Date( this.tempObjForgroupNameScaleStartDate.startDate );
    }
  }

  saveFormValidation() {
    this.selectedImageFileLogo1 = undefined;
    this.selectedImageFileLogo2 = undefined;
    this.selectedImageFileLogo3 = undefined;
    this.isEditMode = false;
    this.companyMasterform.reset();
    this.companyMasterform.enable();
    this.companyMasterform.get( 'companyActive' ).setValue( true );

    this.companyMasterform.controls['endDate'].clearValidators();
    this.companyMasterform.controls['remark'].clearValidators();
    this.companyMasterform.controls['reason'].clearValidators();
    this.companyMasterform.controls["endDate"].updateValueAndValidity();
    this.companyMasterform.controls["remark"].updateValueAndValidity();
    this.companyMasterform.controls["reason"].updateValueAndValidity();

    this.companyMasterform.controls["code"].setValidators( Validators.required );
    this.companyMasterform.controls["code"].updateValueAndValidity();

    this.companyMasterform.controls["address1"].setValidators( Validators.required );
    this.companyMasterform.controls["address1"].updateValueAndValidity();

    this.companyMasterform.controls["companyGroupCode"].setValidators( Validators.required );
    this.companyMasterform.controls["companyGroupCode"].updateValueAndValidity();

    this.companyMasterform.controls["shortName"].setValidators( Validators.required );
    this.companyMasterform.controls["shortName"].updateValueAndValidity();

    this.companyMasterform.controls["scale"].setValidators( Validators.required );
    this.companyMasterform.controls["scale"].updateValueAndValidity();

    this.companyMasterform.controls["startDate"].setValidators( Validators.required );
    this.companyMasterform.controls["startDate"].updateValueAndValidity();

    this.companyMasterform.get( 'endDate' ).disable();
    this.companyMasterform.get( 'reason' ).disable();
    this.companyMasterform.get( 'code' ).disable();

    this.companyMasterform.get( 'remark' ).disable();

    this.companyMasterform.get( 'companyActive' ).setValue( true );
    this.companyMasterform.patchValue( {
      language: 'English',
    } );
    this.companyMasterform.patchValue( {
      currency: this.currencyList[2],
      companyGroupCode: '',
      country: '',
      isdCode: '',
      typeOfEstablishment: '',
      industryType: '',
      scale: '',
      coClassification: '',
      reason: '',
      isContractor: '',
      // logo1ImageName:'',
      // logo1Type:'',
      // logo2ImageName:'',
      // logo2Type:'',
      // logo1:'',
      
    } );

    this.deactiveActiveCheckBox();
    this.companyMasterform.get( 'companyActive' ).disable();
    this.companyMasterform.get( 'state' ).disable();
    this.companyMasterform.get( 'city' ).disable();
  }
  keyPress( event: any ) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode( event.charCode );
    if ( event.keyCode != 8 && !pattern.test( inputChar ) ) {
      event.preventDefault();
    }
  }
  isCompanyNameContainsOnlySpecialCharacter() {
    this.companyNameInvalid = false
    var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.companyMasterform.get( 'companyName' ).value.length; i++ ) {
      if ( splChars.indexOf( this.companyMasterform.get( 'companyName' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.companyNameInvalid = true;
      } else {
        this.companyNameInvalid = false;
        break;
      }

    }
    if ( this.companyNameInvalid == true ) {
      this.companyMasterform.get( 'companyName' ).status = 'INVALID';

    }
  }
  isShortNameContainsOnlySpecialCharacter() {
    this.shortNameInvalid = false
    var splChars = "*|,\":<>[]{}`\!';^()@&$#%1234567890";
    for ( var i = 0; i < this.companyMasterform.get( 'shortName' ).value.length; i++ ) {
      if ( splChars.indexOf( this.companyMasterform.get( 'shortName' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.shortNameInvalid = true;
      } else {
        this.shortNameInvalid = false;
        break;
      }

    }
    if ( this.shortNameInvalid == true ) {
      this.companyMasterform.get( 'shortName' ).status = 'INVALID';
    }
  }
  keyPressedSpaceNotAllow( event: any ) {
    const pattern = /[ ]/;
    let inputChar = String.fromCharCode( event.charCode );
    if ( pattern.test( inputChar ) ) {
      event.preventDefault();
    }
  }
  onSelectCountry( evt: any ) {
    this.companyMasterform.patchValue( {
      pinCode: '',
      state: '',
      city: '',
      village: '',
    } );
  }


  onChangeWebsiteName( evt: string ) {
    var text = evt.split( '.' );

    let s = evt.lastIndexOf( '.' ) - evt.indexOf( '.' );
    console.log( s );
    // if tow dot presnt and without space
    if ( evt.indexOf( '.' ) == evt.lastIndexOf( '.' ) || s == 1 ) {
      this.invalidWebsite = true;
    } else {
      this.invalidWebsite = false;

    }


  }
  //excel
  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["Code","Name","Short Name","Association","Industry Type","Scale","Type of Establishment",
    "Engagement Start Date","Engagement End Date","Service Age","Country","City"];
    this.excelData=[];


    
    if(this.summaryHtmlDataList.length>0){
    this.summaryHtmlDataList.forEach(element => {
      let obj = {
        "Code":element.code,
        "Name":element.shortenCompanyName,
        "Short Name": element.shortenShortName,
        "Association":element.isContractor,
        "Industry Type":element.shortenIndustryType,
        "Scale":element.Scale,
        "Type of Establishment":element.typeOfEstablishment,
        "Engagement Start Date":element.StartDate,
        "Engagement End Date":element.EndDate,
        "Service Age":element.servicePeriodShort,
        "Country":element.country,
        "City":element.city,



      
      }
      this.excelData.push(obj)
    });
    console.log('this.excelData::', this.excelData);
  }
   
    this.excelservice.exportAsExcelFile(this.excelData, 'Company Master ','Company Master',this.header);
  
  }
  
  //sort
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
    });
  
}

// @ViewChild("dt") dataTableComponent: Table;

// setup(value, id){
//    if(value != null)
//      this.dataTableComponent.filters[id][0].value = value;
//  }
deletelogo1(){
  this.viewlogoflag=false;
  //this.employeeMasterRequestDTO.logo1='';
  this.employeeMasterRequestDTO.logo1= null;
this.companyMasterform.get( 'logo1' ).value= null;
this.selectedImageFileLogo2 = undefined;
  }
deletelogo2(){
  this.viewlogoflag=false;
this.employeeMasterRequestDTO.logo2= null;
this.companyMasterform.get( 'logo2' ).value= null;
this.selectedImageFileLogo2 = undefined;

}
deletelogo3(){
  this.viewlogoflag=false;
  //this.employeeMasterRequestDTO.logo3='';
  this.employeeMasterRequestDTO.logo3= null;
this.companyMasterform.get( 'logo3' ).value= null;
this.selectedImageFileLogo3 = undefined;
  }
  
}
