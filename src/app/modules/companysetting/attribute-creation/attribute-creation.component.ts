
import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, Inject, ViewEncapsulation, TemplateRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveAttributeCreation } from '../model/business-cycle-model';
import { Paginator } from 'primeng/paginator';


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component( {
  selector: 'app-attribute-creation',
  templateUrl: './attribute-creation.component.html',
  styleUrls: ['./attribute-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class AttributeCreationComponent implements OnInit, OnChanges {
  // sort alphabetically
  totalRecords: number = 0;
  @ViewChild( 'paginator', { static: true } ) paginator: Paginator
  NatureList = [
    { label: 'Formula', value: 'Formula' },
    { label: 'Head', value: 'Head' },
    { label: 'List', value: 'List' },
    { label: 'Per Employee Input', value: 'Per Employee Input' },
    { label: 'Range Value Per Instance', value: 'Range Value Per Instance' },
    { label: 'Range Value Per Period', value: 'Range Value Per Period' },
    { label: 'Range Value No Of Instances Per Period', value: 'Range Value No Of Instances Per Period' },
    { label: 'Source Destination Matrix', value: 'Source Destination Matrix' },
    { label: 'Stored Procedure', value: 'Stored Procedure' },
    { label: 'Work Flow', value: 'Work Flow' },

  ];
  attributeMasterId: number = 0;
  modalRef: BsModalRef;
  isEditMode: boolean = false;
  optionId: number = 0;
  validOptionList: boolean = false;
  AttributeCreationList: Array<any> = [];
  attributeCreationSummaryList: Array<any> = [];
  summaryHtmlDataList = [];
  AttributeCreationForm: FormGroup;
  disabled: boolean = true
  viewCancelButton: boolean = false;
  viewUpdateButton: boolean = false;
  hidevalue: boolean = false;
  isView: boolean = true;
  optionList = [];

  constructor(
    private formBuilder: FormBuilder,
    private attributeCreationService: CompanySettingsService,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    @Inject( DOCUMENT ) private document: Document ) {

  }
  ngOnChanges( changes: SimpleChanges ): void {
    throw new Error( 'Method not implemented.' );
  }

  ngOnInit(): void {

    this.AttributeCreationForm = this.formBuilder.group( {
      id: new FormControl( null, ),
      code: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '', Validators.required ),
      pfFormArray: new FormArray( [] ),
    } );
    this.getAllAttributeCreation();
  }
  // get All AttributeCreation
  getAllAttributeCreation(): void {
    this.attributeCreationSummaryList = [];
    this.AttributeCreationList = [];

    this.attributeCreationService.getAllGlobalAttributeCreation().subscribe( res => {

      this.AttributeCreationList = res.data.results;
      res.data.results.forEach( element => {
        let value: string = '';
        for ( let i = 0; i < element.options.length; i++ ) {
          if ( i == 0 ) {
            value = element.options[i].attributeOptionValue;
          } else {
            value = value + ', ' + element.options[i].attributeOptionValue;
          }
        }

        let label = '';
        if ( element.attributeNature !== null ) {
          let ind = this.NatureList.findIndex( o => o.value == element.attributeNature.trim() );
          if ( ind != -1 ) {
            label = this.NatureList[ind].label;
          } else {
            label = '';
          }
        }

        let obj = {
          attributeMasterId: element.attributeMasterId,
          code: element.code,
          attributeNatureLongForm: label,
          attributeNature: element.attributeNature,
          numberOfOption: element.numberOfOption,
          description: element.description,
          optionValue: value,
        }
        this.attributeCreationSummaryList.push( obj );
      } );
    } );
    // this.totalRecords = this.attributeCreationSummaryList.length;
  }


  editAttributeCreation( attributeMasterId ) {
    this.AttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
    this.isView = true;
    this.viewCancelButton = true;
    this.disabled = false;
    this.viewUpdateButton = true;
    this.hidevalue = true;
    this.attributeMasterId = attributeMasterId;
    let index = this.attributeCreationSummaryList.findIndex( o => o.attributeMasterId == attributeMasterId );

    this.AttributeCreationForm.patchValue( { code: this.attributeCreationSummaryList[index].code } );
    this.AttributeCreationForm.patchValue( { description: this.attributeCreationSummaryList[index].description } );
    this.AttributeCreationForm.patchValue( { attributeNature: this.attributeCreationSummaryList[index].attributeNatureLongForm } );
    if ( this.attributeCreationSummaryList[index].optionValue.length > 0 ) {
      let split = this.attributeCreationSummaryList[index].optionValue.split( ',' );
      console.log( split );
      for ( let i = 0; i < split.length; i++ ) {
        this.addRowWithData( split[i] );
      }
    }
    this.AttributeCreationForm.get( 'attributeNature' ).disable();
    //this.AttributeCreationForm.get( 'optionList' ).enable();


  }

  // Get Attribute Creation ById
  GetAttributeCreationByIdDisable( id ): void {
    this.AttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
    this.disabled = false;
    this.viewCancelButton = true;
    this.hidevalue = false;
    let index = this.attributeCreationSummaryList.findIndex( o => o.attributeMasterId == id );

    this.AttributeCreationForm.patchValue( { code: this.attributeCreationSummaryList[index].code } );
    this.AttributeCreationForm.patchValue( { description: this.attributeCreationSummaryList[index].description } );
    this.AttributeCreationForm.patchValue( { attributeNature: this.attributeCreationSummaryList[index].attributeNatureLongForm } );
    if ( this.attributeCreationSummaryList[index].attributeNatureLongForm == 'List' ) {
      this.hidevalue = true;
      this.isView = false;
    }
    if ( this.attributeCreationSummaryList[index].optionValue.length > 0 ) {

      let split = this.attributeCreationSummaryList[index].optionValue.split( ',' );

      console.log( split );
      for ( let i = 0; i < split.length; i++ ) {
        this.addRowWithData( split[i] );
      }
    }
    this.AttributeCreationForm.disable();
  }
  onStatusChange( event ): void {
    if ( event.target.value == 'List' ) {
      this.addRow( 0 );
      this.hidevalue = true;
      this.isView = true;
      // console.log( 'length is ', this.summaryHtmlDataList );
      // if ( this.summaryHtmlDataList.length === 0 ) {
      //   this.validOptionList = true;
      //   this.addOptionList( '' );
      // } else {
      //   this.validOptionList = false;
      // }
    }
    else {
      this.AttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
      this.isView = false;
      //  this.validOptionList = false;
      this.summaryHtmlDataList = [];
      this.hidevalue = false;
    }
  }
  addOptionList( evt: any ): void {
    if ( this.isEditMode ) {
      let isContain = this.summaryHtmlDataList.some( ( { name } ) => name === evt );
      console.log( 'isContain ', isContain );
      if ( isContain == true ) {
        this.alertService.sweetalertWarning( 'Value already present in Summary table.' );

      } else {

        let index = this.summaryHtmlDataList.findIndex( o => o.id == this.optionId );
        this.summaryHtmlDataList[index].name = evt;
      }


    } else {
      console.log( evt );
      // if ( evt.length > 0 ) {
      //   let isContain = this.summaryHtmlDataList.some( ( { name } ) => name === evt );
      //   console.log( 'isContain ', isContain );
      //   let id = 0;
      //   if ( this.summaryHtmlDataList.length !== 0 ) {
      //     id = this.summaryHtmlDataList[this.summaryHtmlDataList.length - 1].id;
      //     this.validOptionList = false;
      //   } else {
      //     id = 0;
      //     this.validOptionList = true;
      //   }
      //   if ( isContain == true ) {
      //     this.alertService.sweetalertWarning( 'Value already present in Summary table.' );
      //   } else {
      //     this.summaryHtmlDataList.push( { name: evt, id: id + 1 } );
      //   }

      //   this.validOptionList = false;
      // }
    }
    // this.AttributeCreationForm.get( 'optionList' ).setValue( '' );
    this.isEditMode = false;

  }

  //add new AttributeCreation
  addAttributeCreation(): void {
    if ( this.viewUpdateButton == true ) {
      let array = [];
      console.log( 'add update logic here' );
      const addAttributeCreation: SaveAttributeCreation = Object.assign( {} );
      addAttributeCreation.options = [];
      addAttributeCreation.attributeNature = 'List';
      addAttributeCreation.attributeMasterId = this.attributeMasterId;
      addAttributeCreation.code = this.AttributeCreationForm.value.code;
      addAttributeCreation.description = this.AttributeCreationForm.value.description;
      // for ( let i = 0; i < this.summaryHtmlDataList.length; i++ ) {
      //   array.push( this.summaryHtmlDataList[i].name );
      // }
      this.f.pfFormArray.value.forEach( element => {

        array.push( element.optionList )
      } );

      addAttributeCreation.options = array;
      addAttributeCreation.numberOfOption = array.length.toString();
      console.log( JSON.stringify( addAttributeCreation ) );


      this.attributeCreationService.UpdateAttributeCreation( addAttributeCreation ).subscribe( ( res: any ) => {


        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeCreation();
        this.hidevalue = true;
        this.summaryHtmlDataList = [];
        this.CancelAttributeCreation();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

    } else {
      let array = [];
      this.f.pfFormArray.value.forEach( element => {
        array.push( element.optionList )
      } );

      const addAttributeCreation: SaveAttributeCreation = Object.assign( {} );
      delete addAttributeCreation.attributeMasterId;
      addAttributeCreation.options = [];
      addAttributeCreation.numberOfOption = array.length.toString();
      addAttributeCreation.code = this.AttributeCreationForm.value.code;
      addAttributeCreation.description = this.AttributeCreationForm.value.description;
      addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;


      // for ( let i = 0; i < this.summaryHtmlDataList.length; i++ ) {
      //   array.push( this.summaryHtmlDataList[i].name );
      // }


      addAttributeCreation.options = array;
      console.log( JSON.stringify( addAttributeCreation ) );

      this.attributeCreationService.AddAttributeCreation( addAttributeCreation ).subscribe( ( res: any ) => {

        // addAttributeCreation.options = [];
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeCreation();
        this.hidevalue = true;
        this.summaryHtmlDataList = [];

        this.CancelAttributeCreation();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

    }

  }
  CancelAttributeCreation(): void {
    this.AttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
    this.isView = false;
    this.viewUpdateButton = false;
    this.AttributeCreationForm.enable();
    this.summaryHtmlDataList = [];
    this.disabled = true;
    this.hidevalue = false;
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.viewUpdateButton = false;
    this.AttributeCreationForm.patchValue( {
      attributeNature: ''
    } );
  }

  ResetAttributeCreation(): void {

    this.AttributeCreationForm.setControl( 'pfFormArray', new FormArray( [] ) );
    this.isView = false;
    this.viewUpdateButton = false;
    this.AttributeCreationForm.enable();
    this.summaryHtmlDataList = [];
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.AttributeCreationForm.get( 'code' ).enable();
    this.AttributeCreationForm.get( 'description' ).enable();
    this.AttributeCreationForm.patchValue( {
      attributeNature: ''
    } );
  }
  clickedOnYesDeleteRow() {
    console.log( 'in del Name', this.optionId );
    this.deleteRow( this.optionId );
    // let index = this.summaryHtmlDataList.findIndex( o => o.id == this.optionId );
    // this.summaryHtmlDataList.splice( index, 1 );
    // if ( this.summaryHtmlDataList.length == 0 ) {
    //   this.validOptionList = true;
    // }
  }
  deleteRowByIndex( id: number ) {

    this.optionId = id;
    //this.deleteRow( id );
    //  this.summaryHtmlDataList.splice( id, 1 );
  }
  editNameMaster( id: number, name: string ) {
    this.isEditMode = true;
    this.optionId = id;
    this.AttributeCreationForm.patchValue( {
      optionList: name,
    } );
  }
  UploadModal1( template: TemplateRef<any> ) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  get pfArray() { return this.f.pfFormArray as FormArray; }

  get f() { return this.AttributeCreationForm.controls; }

  deleteRow( j: number ) {
    console.log( j );
    //this.lictransactionList.splice(j,1);
    this.pfArray.removeAt( j );
  }
  addRow( i?: number ) {
    // this.pfArray.push( this.formBuilder.group( {

    //   optionList: ['', Validators.required],

    // } ) );
    //if ( i !== 0 ) {
    //  console.log( 'i!==0' )
    var setsFormArray = this.AttributeCreationForm.get( 'pfFormArray' ) as FormArray;
    this.pfArray.insert( this.pfArray.length, this.formBuilder.group( {
      optionList: ['', Validators.required],
    } ) );
    // }
    // else {
    //   console.log( 'in else' );
    //   this.pfArray.push( this.formBuilder.group( {

    //     optionList: ['', Validators.required],

    //   } ) );

    // }

  }
  addRowWithData( optionList: string ) {
    this.pfArray.push( this.formBuilder.group( {

      optionList: [optionList, Validators.required],

    } ) );

  }


  get() {
    for ( let b = 0; b < 10; b++ ) {
      //  this.notworkingArr[b] = "test" + b;
      console.log( "in get" );
    }
  }
  private updateCurrentPage( currentPage: number ): void {
    setTimeout( () => this.paginator.changePage( currentPage ) );
  }

  paginate( evt: any ) {
    console.log( evt );
  }
}
