
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StatuatoryComplianceService } from './statuatory-compliance.service';
import { ComplianceHeadService } from '../compliance-head/compliance-head.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

import { ShortenStringPipe } from './../../../core/utility/pipes/shorten-string.pipe';

@Component( {
  selector: 'app-statutory-compliance',
  templateUrl: './statutory-compliance.component.html',
  styleUrls: ['./statutory-compliance.component.scss']
} )
export class StatutoryComplianceComponent implements OnInit {
  hideRemarkDiv: boolean;
  selectedIsdCode = [];
  countryCode: Array<any> = [];
  showButtonSaveAndReset: boolean = true;
  // isEditMode: boolean = false;
  masterGridDataList: Array<any> = [];
  index: number = 0;
  complianceHeadId: number = 0;
  reasonForExitList = [];
  view: boolean = false;

  isSaveAndReset: boolean = true;
  complianceInstitutionMasterId: number = 0;
  scaleList = [];
  summaryHtmlDataList = [];
  headNameList = [];
  countries = [];
  public form: any = FormGroup;
  // applicabilityLevelList = [];
  hideRemark: boolean = false;
  aplicabilityLevelList: Array<any> = ['Central', 'State', 'City', 'Municipal', 'Establishment'];

  typeOfOfficeList = ['Area Office', 'Regional Office', 'Zonal Office'];
  complianceHeadDetailsObject: any;
  tempObjForgroupNameScaleStartDate: any;
  isEditMode: boolean = false;


  public groupNameScaleNameStartDateObject: any[] = [];
  constructor( private shortenString: ShortenStringPipe, private formBuilder: FormBuilder, private statuatoryComplianceService: StatuatoryComplianceService, private complianceHeadService: ComplianceHeadService,
    private alertService: AlertServiceService ) {

    this.form = this.formBuilder.group( {
      headName: new FormControl( '', Validators.required ),
      officialCountryCode: new FormControl( '', Validators.required ),
      address1: new FormControl( null, Validators.required ),
      address2: new FormControl( null ),
      address3: new FormControl( null ),
      country: new FormControl( '', Validators.required ),
      state: new FormControl( { value: null, disabled: true } ),
      city: new FormControl( { value: null, disabled: true } ),
      village: new FormControl( null ),
      pinCode: new FormControl( null, Validators.required ),
      emailId: new FormControl( null, [Validators.required, Validators.pattern( '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$' )] ),
      typeOfOffice: new FormControl( '', Validators.required ),
      // telephoneNumber: new FormControl('', [Validators.required]),
      telephoneNumber: ['', Validators.compose( [Validators.required, Validators.pattern( /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/ )] )],
      applicabilityLevel: new FormControl( { value: '', disabled: true } ),
      institutionName: new FormControl( null, Validators.required ),
      country1: new FormControl( '', Validators.required ),

      remark: new FormControl( '' ),
      institutionActive: new FormControl( { value: true, disabled: true } ),
      institutionCode: new FormControl( { value: '', disabled: true } ),

    } );
  }
  ngOnInit(): void {
    this.tempObjForgroupNameScaleStartDate = { scale: '', groupName: '', startDate: '', groupName1: '' };

    this.statuatoryComplianceService.getLocationInformationOrCountryList().subscribe( res => {
      this.countries = res.data.results;
    } );

    this.statuatoryComplianceService.getCountryCodes().subscribe( res => {
      this.countryCode = res.data.results;
      console.log( this.countryCode );
    } );
    this.refreshHtmlTableData();
  }
  onSelectHeadName( evt: any ) {
    if ( evt == '' ) {
      this.form.get( 'applicabilityLevel' ).setValue( '' );
      this.form.get( 'country1' ).setValue( '' );
    } else {

      console.log( this.form.get( 'headName' ).value );
      console.log( this.groupNameScaleNameStartDateObject );

      let tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find( o => o.complianceHeadName == this.form.get( 'headName' ).value );
      this.complianceHeadId = tempObjForgroupNameScaleStartDate.complianceHeadId;

      console.log( tempObjForgroupNameScaleStartDate );
      this.form.patchValue( {
        country1: tempObjForgroupNameScaleStartDate.country,
        applicabilityLevel: tempObjForgroupNameScaleStartDate.aplicabilityLevel
      } );
    }


  }
  checkLocalAddress() {
  }
  getPermanentAddressFromPIN() {
    console.log( this.form.get( 'pinCode' ).value );
    if ( this.form.get( 'pinCode' ).value.length < 6 ) {
      this.form.get( 'state' ).setValue( '' );
      this.form.get( 'city' ).setValue( '' );
    }
    if ( this.form.get( 'pinCode' ).value.length == 6 && this.form.get( 'country' ).value == 'India' ) {
      this.statuatoryComplianceService.getAddressFromPIN( this.form.get( 'pinCode' ).value ).subscribe( res => {
        console.log( res );
        this.form.get( 'state' ).setValue( res.data.results[0].state );
        this.form.get( 'city' ).setValue( res.data.results[0].city );

      }, ( error: any ) => {
        this.alertService.sweetalertError( error['error']['status']['messsage'] );

      } );
    }
  }

  onSelectScale( scale1: any ) {
    console.log( scale1 );
    console.log( this.form.value.scale );
    console.log( this.form.get( 'scale' ).value );
  }

  onSelectReasonForExit() {
    console.log( this.form.value.reasonForExit );
  }

  save() {
    if ( this.isEditMode == true ) {
      console.log( 'clcicked on uodate record  button' );

      const data = this.form.getRawValue();
      console.log( JSON.stringify( data ) );
      delete data.country1;
      delete data.headName;
      data.telephoneNumber = data.officialCountryCode + ' ' + data.telephoneNumber;
      delete data.officialCountryCode;
      data.complianceHeadId = this.complianceHeadId;
      data.complianceInstitutionMasterId = this.complianceInstitutionMasterId;
      console.log( JSON.stringify( data ) );
      this.statuatoryComplianceService.putComplianceInstituionMaster( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.isEditMode = false;
          console.log( 'data is updated' );
          this.alertService.sweetalertMasterSuccess( 'Statutory Compliance Updated Successfully.', '' );
          this.form.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error['error']['status']['messsage'] );

      } );

      console.log( data );
    } else {
      const data = this.form.getRawValue();
      delete data.country1;
      data.telephoneNumber = data.officialCountryCode + ' ' + data.telephoneNumber;
      delete data.officialCountryCode;
      delete data.headName;
      data.complianceHeadId = this.complianceHeadId;
      console.log( JSON.stringify( data ) );
      this.statuatoryComplianceService.postComplianceInstituionMaster( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          this.alertService.sweetalertMasterSuccess( 'Statutory Compliance Saved Successfully.', '' );

          this.form.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error['error']['status']['messsage'] );

      } );

      console.log( data );
    }

  }

  reset() {

    this.showButtonSaveAndReset = true;
    this.form.get( 'companyGroupActive' ).setValue( true );
    this.saveFormValidation();
  }

  cancelView() {

    this.form.enable();
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.reset();


    this.saveFormValidation();

    this.form.get( 'remark' ).disable();
    this.form.get( 'country1' ).disable();
    this.form.get( 'applicabilityLevel' ).disable();
    this.form.get( 'state' ).disable();
    this.form.get( 'city' ).disable();
    this.form.get( 'institutionCode' ).disable();

    //  this.form.get('complianceActive').setValue(true);
    // this.form.get('complianceActive').disable();
    this.hideRemark = false;

  }

  editMaster( i: number ) {
    // assign complianceHeadId for update recored
    this.isEditMode = true;
    this.isSaveAndReset = false;
    this.index = 0;
    this.showButtonSaveAndReset = true;
    console.log( this.summaryHtmlDataList[i] );
    this.form.reset();
    this.form.patchValue( this.summaryHtmlDataList[i] );
    console.log( this.summaryHtmlDataList[i].telephoneNumber.split( ' ' ) );

    this.form.patchValue( {
      headName: this.summaryHtmlDataList[i].headName,
      country1: this.summaryHtmlDataList[i].country1,
    } );
    let isdCodeAndMobileNumberList = this.summaryHtmlDataList[i].telephoneNumber.split( ' ' );
    if ( isdCodeAndMobileNumberList.length == 2 ) {
      this.form.patchValue( {
        telephoneNumber: isdCodeAndMobileNumberList[1],
        officialCountryCode: isdCodeAndMobileNumberList[0],
      } );
    }

    this.complianceHeadId = this.summaryHtmlDataList[i].complianceHeadId;
    this.complianceInstitutionMasterId = this.summaryHtmlDataList[i].complianceInstitutionMasterId;
    this.form.enable();
    this.form.get( 'country1' ).disable();
    this.form.get( 'applicabilityLevel' ).disable();
    this.form.get( 'state' ).disable();
    this.form.get( 'city' ).disable();
    this.form.get( 'institutionCode' ).disable();
  }
  viewMaster( i: number ) {
    this.isEditMode = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue( this.summaryHtmlDataList[i] );

    this.form.patchValue( {
      headName: this.summaryHtmlDataList[i].headName,
      country1: this.summaryHtmlDataList[i].country,
    } );

    let isdCodeAndMobileNumberList = this.summaryHtmlDataList[i].telephoneNumber.split( ' ' );
    if ( isdCodeAndMobileNumberList.length == 2 ) {
      this.form.patchValue( {
        telephoneNumber: isdCodeAndMobileNumberList[1],
        officialCountryCode: isdCodeAndMobileNumberList[0],
      } );
    }
    this.form.disable();
  }
  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.headNameList = [];
    this.complianceHeadService.getComplianceHeadDetails().subscribe( res => {
      console.log( res.data.results );
      this.complianceHeadDetailsObject = res.data.results;

      res.data.results.forEach( element => {
        this.headNameList.push( element.complianceHeadName );
        //  this.applicabilityLevelList.push(element.aplicabilityLevel);
        this.groupNameScaleNameStartDateObject.push( { complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName } );
      } );

    }, ( error: any ) => {
      this.alertService.sweetalertError( error['error']['status']['messsage'] );

    }, () => {
      this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails().subscribe( res => {
        this.masterGridDataList = res.data.results;
        let i = 1;
        res.data.results.forEach( element => {
          console.log( this.groupNameScaleNameStartDateObject );
          let tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find( o => o.complianceHeadId == element.complianceHeadId );
          const obj = {
            SrNo: i++,
            institutionName: element.institutionName,
            complianceHeadId: element.complianceHeadId,
            country: element.country,
            applicabilityLevel: element.applicabilityLevel,
            address1: element.address1,
            address2: element.address2,
            address3: element.address3,
            state: element.state,
            city: element.city,
            village: element.village,
            pinCode: element.pinCode,
            typeOfOffice: element.typeOfOffice,
            telephoneNumber: element.telephoneNumber,
            emailId: element.emailId,
            headName: tempObjForgroupNameScaleStartDate.complianceHeadName,
            headNameShorten: this.shortenString.transform( tempObjForgroupNameScaleStartDate.complianceHeadName ),
            headNameFull: tempObjForgroupNameScaleStartDate.complianceHeadName,
            country1: tempObjForgroupNameScaleStartDate.country,
            complianceInstitutionMasterId: element.complianceInstitutionMasterId,
            remark: element.remark,
            institutionCode: element.institutionCode,
            institutionActive: element.institutionActive,
          };
          this.summaryHtmlDataList.push( obj );
          console.log( this.summaryHtmlDataList );
        } );
      } );

    } );
  }
  saveFormValidation() {
    console.log( 'saveFormValidation' );
    this.form.patchValue( {
      headName: '',
      applicabilityLevel: '',
      officialCountryCode: '',
      country: '',
      typeOfOffice: '',
      country1: '',
    } );

  }
  onSelectCountry( evt: any ) {
    this.form.patchValue( {
      pinCode: '',
      state: '',
      city: '',
      village: ''
    } );
    this.form.get( 'state' ).disable();
    this.form.get( 'city' ).disable();
    this.form.get( 'institutionCode' ).disable();
    this.form.get( 'institutionCode' ).disable();



  }
  keyPress( event: any ) {

    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode( event.charCode );
    if ( event.keyCode != 8 && !pattern.test( inputChar ) ) {
      event.preventDefault();
    }
  }
  deactiveActiveCheckBox() {
    console.log( 'in deactive remakr' );

    if ( this.form.get( 'institutionActive' ).value === false ) {
      this.form.get( 'remark' ).enable();
      this.hideRemark = true;
      this.form.controls['remark'].setValidators( Validators.required );
      this.form.controls['remark'].updateValueAndValidity();
    } else {
      this.hideRemark = false;
      this.form.controls["remark"].clearValidators();
      this.form.controls["remark"].updateValueAndValidity();
    }
  }

}
