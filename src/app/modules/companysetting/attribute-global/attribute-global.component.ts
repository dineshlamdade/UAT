import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveAttributeSelection } from '../model/business-cycle-model';
import { AnyCnameRecord } from 'node:dns';

@Component( {
  selector: 'app-attribute-global',
  templateUrl: './attribute-global.component.html',
  styleUrls: ['./attribute-global.component.scss']
} )
export class AttributeGlobalComponent implements OnInit {
  removedAttributeGroupIdList = [];
  userHasSelectedMandatoryFieldOnly = false;
  summaryList = [];
  originalTargetList = [];
  @ViewChild( 'AttributeGlobalForm' ) form: NgForm;
  AttributeSelectionList: Array<any> = [];
  AttributeGlobalForm: FormGroup;
  disabled = true;
  viewCancelButton = false;
  hidevalue = false;
  optionList = [];
  selectedNature: string;
  viewupdateButton = false;
  attributeGroupId: number;
  sourceProducts: Array<any> = [];
  targetProducts: Array<any> = [];
  originalSourceProductList: Array<any> = [];
  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];
  selectedMaterialCode: any;
  HighlightRow: any;
  HighlightRight: any;

  constructor(

    private formBuilder: FormBuilder,
    private attributeSelectionService: CompanySettingsService,
    private alertService: AlertServiceService ) { }

  ngOnInit(): void {
    this.getAllAttributeSelection();
    this.getAllAttributeCreation();

    this.AttributeGlobalForm = this.formBuilder.group( {
      attributeGroupDefinitionId: new FormControl( null, ),
      name: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '' )
    } );

  }
  getAllAttributeCreation() {

    this.attributeSelectionService.getAllGlobalAttributeCreation().subscribe( res => {
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    } );
  }
  // get All Attribute Selection
  getAllAttributeSelection(): void {
    this.attributeSelectionService.getAllGlobalAttributeMaster().subscribe( res => {
      this.AttributeSelectionList = res.data.results;

      res.data.results.forEach( element => {
        let obj = {
          code: element.code,
          attributeNature: element.attributeNature,
          numberOfOption: element.numberOfOption,
          description: element.description,
          globalAttributeMasterId: element.globalAttributeMasterId,
          options: ( element.optionList ).length,
          id: element.id,
          name: element.name,
        }
        this.summaryList.push( obj );
      } );
    } );
  }

  RowSelected( u: any, ind ) {
    console.log( u );
    let ind1 = this.sourceProducts.findIndex( o => o.globalAttributeMasterId == u.globalAttributeMasterId );

    let index = this.selectedUser.findIndex( o => o.globalAttributeMasterId == u.globalAttributeMasterId );


    let isContain = this.selectedUser.some( o => o.globalAttributeMasterId == u.globalAttributeMasterId );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.sourceProducts[ind1].isHighlight = false;
      this.selectedUser.splice( index, 1 );
    } else {

      this.sourceProducts[ind1].isHighlight = true;
      this.selectedUser.push( u );
    }
    console.log( 'selected row is', u );
    console.log( 'selected user', this.selectedUser );
  }

  RowSelectedtargetProducts( u: any, i ): void {
    if ( u.disabled == true ) {

    } else {


      this.HighlightRight = i;
      let temp = this.targetProducts;
      this.targetProducts = new Array();
      let index = this.selectedUser2.findIndex( o => o.globalAttributeMasterId == u.globalAttributeMasterId );
      let isContain = this.selectedUser2.some( o => o.globalAttributeMasterId == u.globalAttributeMasterId );
      console.log( isContain, index );
      if ( isContain == true ) {
        this.selectedUser2.splice( index, 1 );
      } else {
        this.selectedUser2.push( u );
      }
      this.targetProducts = temp;

      this.targetProducts.forEach( ( element, i ) => {
        if ( i == this.HighlightRight ) {
          if ( isContain == true ) {
            element.isHighlightright = false
            element.isHighlight = false
          }
          else {
            element.isHighlightright = true
            element.isHighlight = false
          }
        }
      } )

    }
  }
  lefttablePusg(): void {


    this.selectedUser.forEach( ( element, index ) => {
      element.isHighlightright = false;
      this.targetProducts.push( element );
    } );

    this.selectedUser.forEach( element => {
      var index = this.sourceProducts.indexOf( element )
      this.selectedUser = [];
      if ( index > -1 ) {
        this.sourceProducts.splice( index, 1 );

      }
    } );

    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
  }
  righttablePusg( u: any ): void {


    this.selectedUser2.forEach( element => {

      if ( element.globalAttributeMasterId == null ) {
        console.log( 'attributer master id is not found' );
      } else {
        console.log( 'globalAttributeMasterId', element.globalAttributeMasterId );
      }
    } );

    this.selectedUser2.forEach( element => {
      element.isHighlight = false;
      this.sourceProducts.push( element );
    } );
    var v = this.selectedUser;

    this.selectedUser2.forEach( element => {
      var index = this.targetProducts.indexOf( element, index )

      this.selectedUser2 = [];
      if ( index > -1 ) {
        this.targetProducts.splice( index, 1 )
      }
    } );
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
  }
  resetAttributeSelection(): void {
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.AttributeGlobalForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.AttributeGlobalForm.patchValue( {
      attributeNature: ''
    } );
    this.getAllAttributeCreation();
  }
  CancelAttributeCreation(): void {
    this.AttributeGlobalForm.enable();
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.disabled = true;
    this.hidevalue = false;
    this.AttributeGlobalForm.reset();
    this.viewCancelButton = false;
    this.viewupdateButton = false;
    this.sourceProducts = this.originalSourceProductList;
    this.AttributeGlobalForm.patchValue( {
      attributeNature: ''
    } );

  }



  onStatusChange( event ) {
    this.selectedUser2 = [];
    this.selectedUser = [];
    this.sourceProducts = [];
    this.targetProducts = [];
    this.getAllAttributeCreation();

    this.sourceProducts = this.originalSourceProductList;
    this.attributeSelectionService.GetAttributeOptionListByGroup( event.target.value ).subscribe( res => {
      console.log( 'GetAttributeOptionListByGroup res is', res );

      this.targetProducts = res.data.results[0].attributeMasters;
      this.targetProducts.forEach( element => {
        element.disabled = true;
        this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
      } );
    } );
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
  }

  // Get Attribute Selection ById
  GetAttributeSelectionByIdDisable( id ): void {

    this.disabled = false;
    this.viewupdateButton = false;
    this.viewCancelButton = true;

    this.attributeSelectionService.GetAttributeSelectionById( id )
      .subscribe( response => {

        this.targetProducts = response.data.results[0].attributeMasters;

        this.targetProducts.forEach( element => {
          this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
        } );

        this.AttributeGlobalForm.patchValue( { name: response.data.results[0].name } );
        this.AttributeGlobalForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeGlobalForm.patchValue( { attributeNature: response.data.results[0].name } );

      } );
    this.AttributeGlobalForm.disable();
  }

  // Get Attribute Selection ById
  GetAttributeSelectionById( id ): void {
    this.originalTargetList = [];
    this.disabled = true;
    this.viewupdateButton = true;
    this.viewCancelButton = true;
    this.attributeGroupId = id;
    this.attributeSelectionService.GetAttributeSelectionById( id )
      .subscribe( response => {
        this.targetProducts = response.data.results[0].attributeMasters;
        this.originalTargetList = response.data.results[0].attributeMasters;
        this.targetProducts.forEach( element => {
          this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
        } );
        this.AttributeGlobalForm.patchValue( { name: response.data.results[0].name } );
        this.AttributeGlobalForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeGlobalForm.patchValue( { attributeNature: response.data.results[0].name } );
      } );

  }


  //Delete Attribute Selection by id
  DeleteAttributeSelection( id ): void {
    this.attributeSelectionService.DeleteAttributeSelection( id )
      .subscribe( response => {

        this.alertService.sweetalertMasterSuccess( response.status.message, '' )
        this.getAllAttributeSelection();
        this.AttributeGlobalForm.reset();
        this.targetProducts = [];
      } );
  }

  //add new AttributeCreation
  addAttributeSelection(): void {


    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      addAttributeCreation.attributeMasterIdList.push( f.globalAttributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeGlobalForm.value.name;
    addAttributeCreation.description = this.AttributeGlobalForm.value.description;
    console.log( JSON.stringify( addAttributeCreation ) );

    this.attributeSelectionService.AddAttributeSelection( addAttributeCreation ).subscribe( ( res: any ) => {

      addAttributeCreation.attributeMasterIdList = [];
      this.targetProducts = [];
      this.alertService.sweetalertMasterSuccess( res.status.message, '' ); //success
      this.getAllAttributeSelection();
      this.hidevalue = false;
      this.AttributeGlobalForm.reset();
    },
      ( error: any ) => {

      } );

  }

  UpdateAttributeSelection(): void {

    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      addAttributeCreation.attributeMasterIdList.push( f.globalAttributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeGlobalForm.value.name;
    addAttributeCreation.description = this.AttributeGlobalForm.value.description;
    console.log( JSON.stringify( this.attributeGroupId ) );
    console.log( JSON.stringify( addAttributeCreation ) );

    addAttributeCreation.removedAttributeGroupIdList = [];
    for ( let i = 0; i < this.originalSourceProductList.length; i++ ) {

      if ( addAttributeCreation.attributeMasterIdList.some( o => o.globalAttributeMasterId == this.originalSourceProductList[i].globalAttributeMasterId ) ) {
        addAttributeCreation.removedAttributeGroupIdList.push( this.originalSourceProductList[i].globalAttributeMasterId );
      } else {
        console.log( 'line no 479 in else block' );
      }
    }

    console.log( JSON.stringify( addAttributeCreation.attributeGroupDefinitionId ) );
    console.log( JSON.stringify( addAttributeCreation ) );


    if ( addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0 ) {

      this.attributeSelectionService.UpdateAttributeGroup( this.attributeGroupId, addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts = [];
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeSelection();
        this.hidevalue = false;
        this.AttributeGlobalForm.reset();
      },
        ( error: any ) => {
          // this.alertService.sweetalertError( error[error][status][message] );
        } );
    }
  }

  doubleClickOnLeftTable( u: any ) {
    this.RowSelected( u, -1 );
    this.lefttablePusg();
  }
  doubleClickOnRightTable( u: AnyCnameRecord ) {
    this.RowSelectedtargetProducts( u, -1 );
    this.righttablePusg( u );

  }
  keyPressedSpaceNotAllow( event: any ) {
    const pattern = /[ ]/;
    let inputChar = String.fromCharCode( event.charCode );
    if ( pattern.test( inputChar ) ) {
      event.preventDefault();
    }
  }
}
