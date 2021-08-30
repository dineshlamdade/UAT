import { CompanyMasterService } from './../company-master/company-master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CompanyGroupMasterService } from '../company-group-master/company-group-master.service';
import { CompanyRegistrationDetailsService } from './company-registration-details.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

@Component( {
  selector: 'app-company-registration-details',
  templateUrl: './company-registration-details.component.html',
  styleUrls: ['./company-registration-details.component.scss']
} )
export class CompanyRegistrationDetailsComponent implements OnInit {
  summaryHtmlDataList: Array<any> = [];
  // issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
  issuedByList = [];
  showButtonSaveAndReset: boolean = true;
  //isEditMode  : boolean = false;
  registrationNumberList: Array<any> = [];
  companyRegistrationIdList: Array<any> = [];
  companyRegistrationMasterList: Array<any> = [];
  masterGridDataList: Array<any> = [];
  tempObjForCompanyRegistration: any;
  public form: any = FormGroup;
  companyRegistrationId: number = 0;
  companyMasterId: number = 0;
  isSaveAndReset: boolean = true;
  isEditMode: boolean = false;
  invalidPAN: boolean = false;
  public today = new Date();


  constructor( private formBuilder: FormBuilder, private companyGroupMasterService: CompanyGroupMasterService, private companyMasterService: CompanyMasterService,
    private companyRegistrationDetailsService: CompanyRegistrationDetailsService, private datePipe: DatePipe,
    private alertService: AlertServiceService ) {
    this.form = this.formBuilder.group( {
      companyRegistrationId: new FormControl( '', Validators.required ),
      registrationNumber: new FormControl( null ),
      companyName: new FormControl( { value: null, disabled: true } ),
      companyGroupName: new FormControl( { value: null, disabled: true } ),
      dateOfIncorporation: new FormControl( null, Validators.required ),
      issuedBy: new FormControl( '', Validators.required ),
      msmeNumber: new FormControl( null ),
      pan: new FormControl( '', [Validators.pattern( "^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$" )] ),
      udyogAadhaarNumber: new FormControl( null ),
      companyRegistrationId1: new FormControl( null ),
    } );

  }

  ngOnInit(): void {
    this.companyRegistrationDetailsService.getAllActiveCompanyForRegistration().subscribe( res => {
      console.log( 'getAllActiveCompanyForRegistration', res );
      this.tempObjForCompanyRegistration = res.data.results;
      res.data.results.forEach( element => {


        const obj = {
          code: element.code,
          companyGroupName: element.companyGroupName,
          companyMasterId: element.companyMasterId,
          companyName: element.companyName,

        };
        this.companyRegistrationIdList.push( obj );
      } );

    } );
    this.companyRegistrationDetailsService.getCompanyRegistrationIssuedBy().subscribe( res => {
      this.issuedByList = [];
      res.data.results.forEach( element => {
        this.issuedByList.push( element.dropdownValue );
      } );
    } );
    this.refreshHtmlTableData();
  }
  refreshHtmlTableData() {

    this.companyRegistrationDetailsService.getCompanyRegistrationMaster().subscribe( res => {

      this.summaryHtmlDataList = [];
      this.companyRegistrationMasterList = res.data.results;
      let i = 1;
      this.masterGridDataList = res.data.results;
      res.data.results.forEach( element => {

        const obj = {
          SrNo: i++,
          code: element.companyMasterResponseDto.code,
          companyRegistrationId: element.companyRegistrationId,
          companyMasterId: element.companyMasterResponseDto.companyMasterId,
          registrationNumber: element.registrationNumber,
          dateOfIncorporation: element.dateOfIncorporation,
          issuedBy: element.issuedBy,
          msmeNumber: element.msmeNumber,
          udyogAadhaarNumber: element.udyogAadhaarNumber,
          pan: element.pan,
          companyName: element.companyMasterResponseDto.companyName,
          companyGroupName: element.companyMasterResponseDto.companyGroupName
        };
        this.summaryHtmlDataList.push( obj );


        // this.companyRegistrationIdList.push({  code: obj.code,
        //   companyGroupName: obj.companyGroupName,
        //   companyMasterId: obj.companyMasterId});
        var s = this.companyRegistrationIdList.findIndex( function ( o ) {
          return o.companyMasterId === obj.companyMasterId;
        } );
        if ( s !== -1 ) {
          this.companyRegistrationIdList.splice( s, 1 );

        }

        //         const index1 = this.companyRegistrationIdList.findIndex(obj1 => obj1.companyMasterId === obj.companyMasterId);
        //         const index = this.companyRegistrationIdList.indexOf(index1, 1);
        // if (index < 0) {
        //   this.companyRegistrationIdList.splice(index, 1);
        // }

        // console.log(this.summaryHtmlDataList);
      } );

    }, ( error: any ) => {
      //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

    }, () => { } );


    //  this.companyRegistrationIdList.filter((v,i,a)=>a.findIndex(t=>t.companyMasterId === v.companyMasterId) == i);
  }
  save() {
    // for save postCompanyGroupMaster

    console.log( this.form );
    if ( this.companyRegistrationId > 0 ) {

      const dateOfIncorporation1 = this.datePipe.transform( this.form.get( 'dateOfIncorporation' ).value, 'dd-MMM-y' );

      const data = {
        companyRegistrationId: this.companyRegistrationId,
        companyMasterId: this.companyMasterId,
        registrationNumber: this.form.get( 'registrationNumber' ).value,
        dateOfIncorporation: dateOfIncorporation1,
        issuedBy: this.form.get( 'issuedBy' ).value,
        msmeNumber: this.form.get( 'msmeNumber' ).value,
        pan: this.form.get( 'pan' ).value,
        udyogAadhaarNumber: this.form.get( 'udyogAadhaarNumber' ).value
      };
      console.log( data );

      this.companyRegistrationDetailsService.putCompanyRegistrationDetails( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          // this.isEditMode = false;
          this.alertService.sweetalertMasterSuccess( 'Company Registration Details  Updated Successfully.', '' );
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.form.reset();

          this.isEditMode = false;
          this.refreshHtmlTableData();
          this.form.patchValue( {
            companyRegistrationId: '',
            issuedBy: '',
          } );
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
      } );

    } else {
      console.log( 'clcicked on new record save button' );

      const dateOfIncorporation1 = this.datePipe.transform( this.form.get( 'dateOfIncorporation' ).value, 'dd-MMM-y' );

      const data = {
        companyRegistrationId: 0,
        companyMasterId: this.companyMasterId,
        registrationNumber: this.form.get( 'registrationNumber' ).value,
        dateOfIncorporation: dateOfIncorporation1,
        issuedBy: this.form.get( 'issuedBy' ).value,
        msmeNumber: this.form.get( 'msmeNumber' ).value,
        pan: this.form.get( 'pan' ).value,
        udyogAadhaarNumber: this.form.get( 'udyogAadhaarNumber' ).value
      };
      console.log( JSON.stringify( data ) );
      this.companyRegistrationDetailsService.postCompanyRegistrationDetails( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Company Registration Details Saved Successfully.', '' );
          this.form.reset();
          this.refreshHtmlTableData();
          this.form.patchValue( {
            companyRegistrationId: '',
            issuedBy: '',
          } );
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );

      } );
    }
  }

  onBsValueChangeDateOfIncorporation() { }
  onSelectCompanyRegistrationId( evt: any ) {
    console.log( evt );
    // if ( evt == '' ) {


    //   this.form.patchValue( {
    //     companyName: '',
    //     companyGroupName: '',
    //     pan: ''
    //   } );


    // } 
    // else {
      let temp = this.tempObjForCompanyRegistration.find( o => o.code == this.form.get( 'companyRegistrationId' ).value );
      this.companyMasterId = temp.companyMasterId;
      console.log( temp.companyMasterId );
      console.log( temp.companyGroupName );
      this.companyMasterId = temp.companyMasterId;
      this.form.patchValue( {
        companyName: temp.companyName,
        companyGroupName: temp.companyGroupName,
        pan: ''
      } );

    // }


  }


  editMaster( i: number ) {
    window.scrollTo( 0, 0 );
    this.isEditMode = true;


    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();


    this.companyRegistrationId = this.masterGridDataList[i].companyRegistrationId;
    this.companyMasterId = this.masterGridDataList[i].companyMasterResponseDto.companyMasterId;

    this.form.patchValue( this.masterGridDataList[i] );
    console.log( this.masterGridDataList[i] );

    this.form.patchValue( {
      companyRegistrationId1: this.masterGridDataList[i].companyMasterResponseDto.code,
      companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
      companyGroupName: this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
      companyGroupName1: this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
    } );
    this.form.enable();
    this.form.get( 'companyName' ).disable();
    this.form.get( 'companyGroupName' ).disable();
    //this.form.get('companyGroupName1').disable();
    this.form.get( 'companyRegistrationId1' ).disable();


  }
  viewMaster( i: number ) {
    window.scrollTo( 0, 0 );

    this.isSaveAndReset = false;
    this.isEditMode = true;
    this.showButtonSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue( this.masterGridDataList[i] );

    this.form.patchValue( {
      companyRegistrationId1: this.masterGridDataList[i].companyMasterResponseDto.code,
      companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
      companyGroupName: this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
    } );
    this.form.disable();
  }
  cancelView() {
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();

    this.form.get( 'companyName' ).disable();
    this.form.get( 'companyGroupName' ).disable();
    this.showButtonSaveAndReset = true;
    this.companyRegistrationId = 0;  // for save it should be 0 and update it should have any integer value
    this.form.patchValue( {
      companyRegistrationId: '',
      issuedBy: '',
    } );


  }
  onChangePAN( evt: any ) {
    console.log( evt );
    if ( evt.length == 10 ) {
      console.log( this.form.get( 'companyRegistrationId' ).value );
      console.log( this.tempObjForCompanyRegistration );
      let index1 = this.tempObjForCompanyRegistration.findIndex( o => o.code == this.form.get( 'companyRegistrationId' ).value );
      console.log( evt[3].toUpperCase() );
      console.log( this.tempObjForCompanyRegistration[index1].fourthCharacterOfPan );


      if ( evt[3] == this.tempObjForCompanyRegistration[index1].fourthCharacterOfPan ) {
        this.invalidPAN = false;
      } else {
        this.invalidPAN = true;
      }
      // invalidPAN
    }

  }
}
