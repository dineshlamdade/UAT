import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveHeadCreation } from '../model/business-cycle-model';


@Component( {
  selector: 'app-head-creation',
  templateUrl: './head-creation.component.html',
  styleUrls: ['./head-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class HeadCreationComponent implements OnInit {

  public codeInvalid : boolean = false;
  NatureList = [{ label: 'Earning', value: 'Earning' }, { label: 'Deduction', value: 'Deduction' }, { label: 'Perquisite', value: 'Perquisite' }];
  categoryList = [
    { value: 'Asset', label: 'Asset' },
    { value: 'ESOP-RSU-ESPP', label: 'ESOP-RSU-ESPP' },
    { value: 'Garnishment', label: 'Garnishment' },
    { value: 'Loan & Advance', label: 'Loan & Advance' },
    { value: 'Non-Recurring Quantity', label: 'Non-Recurring Quantity' },
    { value: 'Reimbursement', label: 'Reimbursement' },
    { value: 'Statutory', label: 'Statutory' },


  ];
  headCreationList = [];
  TypeList: Array<any> = [];
  HeadCreationList: Array<any> = [];
  viewCancelButton: boolean = false;
  HeadCreationForm: FormGroup;
  disabled: boolean = true;
  constructor(
    private formBuilder: FormBuilder, private alertService: AlertServiceService,
    private headCreationService: CompanySettingsService,
    @Inject( DOCUMENT ) private document: Document ) {

  }

  ngOnInit(): void {

    this.HeadCreationForm = this.formBuilder.group( {
      id: new FormControl( null ),
      shortName: new FormControl( '', Validators.required ),
      displayName: new FormControl( '', Validators.required ),
      headNature: new FormControl( '', Validators.required ),
      standardName: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      category: new FormControl( '', ),
      type: new FormControl( '', ),
    } );
    this.getAllHeadCreation();
  }

  // get All HeadCreation
  getAllHeadCreation(): void {
    this.HeadCreationList = [];
    let earning = [];
    let deduction = [];
    let perquisite = [];
    let other = [];
    this.headCreationService.getAllHeadCreation().subscribe( res => {
      for ( let i = 0; i < res.data.results.length; i++ ) {
        if ( res.data.results[i].headNature == 'Earning' ) {
          earning.push( res.data.results[i] );
        } else if ( res.data.results[i].headNature == 'Deduction' ) {
          deduction.push( res.data.results[i] );
        } else if ( res.data.results[i].headNature == 'Perquisite' ) {
          perquisite.push( res.data.results[i] )
        } else {
          other.push( res.data.results[i] )
        }
      }
      this.HeadCreationList.push( ...earning, ...deduction, ...perquisite, ...other );
    }, ( error ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );
    } );
  }

  // get HeadCreation by Id
  GetHeadCreationbyIdDisable( id ): void {
    window.scrollTo( 0, 0 );
    this.disabled = false;
    this.viewCancelButton = true;
    this.headCreationService.GetHeadCreationById( id )
      .subscribe( response => {
        this.HeadCreationForm.patchValue( { id: response.data.results[0].headMasterId } );
        this.HeadCreationForm.patchValue( { standardName: response.data.results[0].standardName } );
        this.HeadCreationForm.patchValue( { description: response.data.results[0].description } );
        this.HeadCreationForm.patchValue( { shortName: response.data.results[0].shortName } );
        this.HeadCreationForm.patchValue( { headNature: response.data.results[0].headNature } );
        this.onChangeNature( response.data.results[0].headNature );
        this.HeadCreationForm.patchValue( { type: response.data.results[0].type } );
        this.HeadCreationForm.patchValue( { category: response.data.results[0].category } );
        this.HeadCreationForm.patchValue( { displayName: response.data.results[0].displayName } );
      }, ( error ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
    this.HeadCreationForm.disable();
  }

  addHeadCreation(): void {

    const addHeadCreation: SaveHeadCreation = Object.assign( {}, this.HeadCreationForm.value );
    console.log( JSON.stringify( addHeadCreation ) );
    this.headCreationService.AddHeadCreation( addHeadCreation ).subscribe( ( res: any ) => {
      this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      this.getAllHeadCreation();
      this.CancelHeadCreation();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );

  }
  CancelHeadCreation(): void {
    this.HeadCreationForm.enable();
    this.disabled = true;
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    this.HeadCreationForm.patchValue( {
      headNature: '',
      type: '',
      category: '',
    } );
    this.TypeList = [];
  }

  ResetHeadCreation(): void {
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    this.HeadCreationForm.patchValue( {
      headNature: '',
      type: '',
      category: '',
    } );
    this.TypeList = [];
  }


  onChangeEvent( event: any ): void {
    this.HeadCreationForm.patchValue( { shortName: event.target.value } );
  }
  onChangeNature( evt: any ) {
    if ( evt == '' ) {
      this.TypeList = [];

    } else {
      this.TypeList = [];
      this.headCreationService.getByHeadMasterByNature( evt ).subscribe( res => {
        this.TypeList = res.data.results;
      }, ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );

    }


    this.HeadCreationForm.patchValue( { type: '' } );
  }


    //Enter only Number Special Character/Character Form control Description
    isContainsOnlySpecialCharacterDescription() {
      // alert("Hiii codeInvalid");
      this.codeInvalid = false
      console.log( 'isContainsOnlySpecialCharacterDescription' );
      var splChars = "* |,\":<>[]{}^`\!';()@&$#%1234567890";
      for ( var i = 0; i < this.HeadCreationForm.get( 'standardName' ).value.length; i++ ) {
        if ( splChars.indexOf( this.HeadCreationForm.get( 'standardName' ).value.charAt( i ) ) != -1 ) {
          //alert("Illegal characters detected!");
          this.codeInvalid = true;
        } else {
          this.codeInvalid = false;
          break;
        }

      }
      if ( this.codeInvalid == true ) {
        //this.companyGroupNameInvalid = false;
        //   this.AttributeCreationForm.get('companyGroupName').inValid = true;
        // this.AttributeCreationForm.get( 'code' ).status = 'INVALID';

      }
    }


    keyPressedSpaceNotAllow( event: any ) {
      const pattern = /[ ]/;
      let inputChar = String.fromCharCode( event.charCode );
      if ( pattern.test( inputChar ) ) {
        event.preventDefault();
      }
    }

}
