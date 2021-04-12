
import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, Inject, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveAttributeCreation } from '../model/business-cycle-model';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import { ArrayDataSource } from '@angular/cdk/collections';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component( {
  selector: 'app-attribute-creation',
  templateUrl: './attribute-creation.component.html',
  styleUrls: ['./attribute-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class AttributeCreationComponent implements OnInit {
  // sort alphabetically
  NatureList = [
    { label: 'Formula', value: 'F' },
    { label: 'Garnishment', value: 'G' },
    { label: 'Head  ', value: 'H' },
    { label: 'List', value: 'L' },
    { label: 'Per Employee Input', value: 'PEI' },
    { label: 'Range Value Per Instance', value: 'Range Value / Instance' },
    { label: 'Range Value Per Period', value: 'Range Value / Period' },
    { label: 'Range Of No Of Instances Per Period', value: 'Range Instances / Period' },
    { label: 'Stored Procedure', value: 'SP' },
    { label: 'Source Destination Matrix', value: 'SDM' },
    { label: 'Work Flow', value: 'WF' },

  ];
  globalAttributeMasterId: number = 0;
  modalRef: BsModalRef;
  isEditMode: boolean = false;
  optionId: number = 0;
  validOptionList: boolean = false;
  AttributeCreationList: Array<any> = [];
  attributeCreationSummaryList = [];
  summaryHtmlDataList = [];
  AttributeCreationForm: FormGroup;
  disabled: boolean = true
  viewCancelButton: boolean = false;
  viewUpdateButton: boolean = false;
  hidevalue: boolean = false;
  optionList = [];

  constructor(
    private formBuilder: FormBuilder,
    private attributeCreationService: CompanySettingsService,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    @Inject( DOCUMENT ) private document: Document ) {

  }

  ngOnInit(): void {

    this.AttributeCreationForm = this.formBuilder.group( {
      id: new FormControl( null, ),
      code: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '', Validators.required ),
      optionList: new FormControl( '' ),
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
        for ( let i = 0; i < element.optionList.length; i++ ) {
          if ( i == 0 ) {
            value = element.optionList[i].optionValue;
          } else {
            value = value + ', ' + element.optionList[i].optionValue;

          }
        }
        console.log( 'value ', value );
        let label = '';
        let ind = this.NatureList.findIndex( o => o.value == element.attributeNature.trim() );
        if ( ind != -1 ) {
          label = this.NatureList[ind].label;
        } else {
          label = '';
        }


        let obj = {
          globalAttributeMasterId: element.globalAttributeMasterId,
          code: element.code,
          attributeNatureLongForm: label,
          attributeNature: element.attributeNature.trim(),
          numberOfOption: element.numberOfOption,
          description: element.description,
          optionValue: value,
        }
        this.attributeCreationSummaryList.push( obj );
      } );
    } );
  }


  editAttributeCreation( globalAttributeMasterId ) {
    console.log( 'edit' );


    this.disabled = false;
    this.viewCancelButton = false;
    this.viewUpdateButton = true;
    this.viewUpdateButton = true;
    this.hidevalue = true;
    this.globalAttributeMasterId = globalAttributeMasterId;
    let index = this.attributeCreationSummaryList.findIndex( o => o.globalAttributeMasterId == globalAttributeMasterId );

    this.AttributeCreationForm.patchValue( { code: this.attributeCreationSummaryList[index].code } );
    this.AttributeCreationForm.patchValue( { description: this.attributeCreationSummaryList[index].description } );
    this.AttributeCreationForm.patchValue( { attributeNature: this.attributeCreationSummaryList[index].attributeNature } );
    if ( this.attributeCreationSummaryList[index].optionValue.length > 0 ) {
      let split = this.attributeCreationSummaryList[index].optionValue.split( ',' );
      this.summaryHtmlDataList = [];
      console.log( split );
      for ( let i = 0; i < split.length; i++ ) {
        this.summaryHtmlDataList.push( { id: i, name: split[i] } );
      }
    }
    this.AttributeCreationForm.get( 'attributeNature' ).disable();


  }

  // Get Attribute Creation ById
  GetAttributeCreationByIdDisable( id ): void {

    this.disabled = false;
    this.viewCancelButton = true;
    this.hidevalue = false;
    let index = this.attributeCreationSummaryList.findIndex( o => o.globalAttributeMasterId == id );

    this.AttributeCreationForm.patchValue( { code: this.attributeCreationSummaryList[index].code } );
    this.AttributeCreationForm.patchValue( { description: this.attributeCreationSummaryList[index].description } );
    this.AttributeCreationForm.patchValue( { attributeNature: this.attributeCreationSummaryList[index].attributeNature } );
    if ( this.attributeCreationSummaryList[index].optionValue.length > 0 ) {
      let split = this.attributeCreationSummaryList[index].optionValue.split( ',' );
      this.summaryHtmlDataList = [];
      this.hidevalue = false;
      console.log( split );
      for ( let i = 0; i < split.length; i++ ) {
        this.summaryHtmlDataList.push( { id: i, name: split[i] } );
      }
    }
    this.AttributeCreationForm.disable();
  }
  onStatusChange( event ): void {
    console.log( 'chceck', event.target.value );
    if ( event.target.value == 'L' ) {
      this.hidevalue = true;
      console.log( 'length is ', this.summaryHtmlDataList );
      if ( this.summaryHtmlDataList.length === 0 ) {
        this.validOptionList = true;
      } else {
        this.validOptionList = false;
      }
    }
    else {
      this.validOptionList = false;
      this.summaryHtmlDataList = [];
      this.hidevalue = false;
    }
  }
  addOptionList( evt: any ): void {
    if ( this.isEditMode ) {
      let isContain = this.summaryHtmlDataList.some( ( { name } ) => name === evt );
      console.log( 'isContain ', isContain );
      if ( isContain == true ) {
        this.alertService.sweetalertWarning( 'Value already presetnt in Summary table.' );

      } else {

        let index = this.summaryHtmlDataList.findIndex( o => o.id == this.optionId );
        this.summaryHtmlDataList[index].name = evt;
      }


    } else {
      console.log( evt );
      if ( evt.length > 0 ) {
        let isContain = this.summaryHtmlDataList.some( ( { name } ) => name === evt );
        console.log( 'isContain ', isContain );
        let id = 0;
        if ( this.summaryHtmlDataList.length !== 0 ) {
          id = this.summaryHtmlDataList[this.summaryHtmlDataList.length - 1].id;
          this.validOptionList = false;
        } else {
          id = 0;
          this.validOptionList = true;
        }
        if ( isContain == true ) {
          this.alertService.sweetalertWarning( 'Value already present in Summary table.' );
        } else {
          this.summaryHtmlDataList.push( { name: evt, id: id + 1 } );
        }

        this.validOptionList = false;
      }
    }
    this.AttributeCreationForm.get( 'optionList' ).setValue( '' );
    this.isEditMode = false;

  }

  //add new AttributeCreation
  addAttributeCreation(): void {
    debugger;
    if ( this.viewUpdateButton == true ) {
      console.log( 'add update logic here' );
      const addAttributeCreation: SaveAttributeCreation = Object.assign( {} );

      addAttributeCreation.options = [];
      addAttributeCreation.attributeNature = 'L';
      addAttributeCreation.globalAttributeMasterId = this.globalAttributeMasterId;
      addAttributeCreation.numberOfOption = this.summaryHtmlDataList.length.toString();
      addAttributeCreation.code = this.AttributeCreationForm.value.code;
      addAttributeCreation.description = this.AttributeCreationForm.value.description;


      let array = [];
      for ( let i = 0; i < this.summaryHtmlDataList.length; i++ ) {
        array.push( this.summaryHtmlDataList[i].name );
      }

      addAttributeCreation.options = array;
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


      const addAttributeCreation: SaveAttributeCreation = Object.assign( {} );
      delete addAttributeCreation.globalAttributeMasterId;
      addAttributeCreation.options = [];
      addAttributeCreation.numberOfOption = this.summaryHtmlDataList.length.toString();
      addAttributeCreation.code = this.AttributeCreationForm.value.code;
      addAttributeCreation.description = this.AttributeCreationForm.value.description;
      addAttributeCreation.attributeNature = this.AttributeCreationForm.value.attributeNature;

      let array = [];
      for ( let i = 0; i < this.summaryHtmlDataList.length; i++ ) {
        array.push( this.summaryHtmlDataList[i].name );
      }

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
    this.viewUpdateButton = false;
    this.AttributeCreationForm.enable();
    this.summaryHtmlDataList = [];
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.AttributeCreationForm.patchValue( {
      attributeNature: ''
    } );
  }
  deleteName() {
    console.log( 'in del Name', this.optionId );
    let index = this.summaryHtmlDataList.findIndex( o => o.id == this.optionId );
    this.summaryHtmlDataList.splice( index, 1 );
    if ( this.summaryHtmlDataList.length == 0 ) {
      this.validOptionList = true;
    }
  }
  deleteNameByName( name: string, id: number ) {
    console.log( 'del by name', name, id );
    this.optionId = id;
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

}
