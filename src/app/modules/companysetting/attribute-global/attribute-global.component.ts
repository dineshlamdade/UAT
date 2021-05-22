import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveAttributeSelection } from '../model/business-cycle-model';
import { AnyCnameRecord } from 'node:dns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component( {
  selector: 'app-attribute-global',
  templateUrl: './attribute-global.component.html',
  styleUrls: ['./attribute-global.component.scss'],
  styles: [`
        .outofstock {
          background-color: #ddd!important;
          color: #000!important;
          font-weight: 500;
        }
        .disable{
           background-color:#D3D3D3 !important;
          color: #000!important;
          font-weight: 500;

        }`
  ]
} )
export class AttributeGlobalComponent implements OnInit {
  // removedAttributeGroupIdList = [];
  selectedSummarySourceProducts = [];
  userHasSelectedMandatoryFieldOnly = false;
  summaryList = [];
  originalTargetList = [];
  @ViewChild( 'AttributeGlobalForm' ) form: NgForm;
  AttributeSelectionList: Array<any> = [];
  AttributeGlobalForm: FormGroup;
  disabled = true;
  viewCancelButton = false;
  ///hidevalue = false;
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
  deleteModalRef: BsModalRef;
  idToBeDeletetd: number = null;

  constructor(
    private modalService: BsModalService,
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
      console.log( 'check source res ', res );
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    } );
  }
  // get All Attribute Selection
  getAllAttributeSelection(): void {
    this.summaryList = [];
    this.attributeSelectionService.getAllGlobalAttributeMasterByGlobal().subscribe( res => {
      console.log( 'res check11 ', res );

      this.AttributeSelectionList = res.data.results;

      res.data.results.forEach( element => {
        let obj = {

          attributeNature: element.attributeNature,
          numberOfOption: element.numberOfOption,
          description: element.description,

          options: ( element.attributeMasters ).length,
          id: element.id,
          name: element.name,
        }
        this.summaryList.push( obj );
      } );
    } );
  }

  RowSelected( u: any, ind ) {
    console.log( u );
    let ind1 = this.sourceProducts.findIndex( o => o.attributeMasterId == u.attributeMasterId );

    let index = this.selectedUser.findIndex( o => o.attributeMasterId == u.attributeMasterId );


    let isContain = this.selectedUser.some( o => o.attributeMasterId == u.attributeMasterId );
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
    console.log( u );
    if ( u.disabled == true ) {

    } else {


      this.HighlightRight = i;
      let temp = this.targetProducts;
      this.targetProducts = new Array();
      let index = this.selectedUser2.findIndex( o => o.attributeMasterId == u.attributeMasterId );
      let isContain = this.selectedUser2.some( o => o.attributeMasterId == u.attributeMasterId );
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
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.AttributeGlobalForm.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block' );
      this.AttributeGlobalForm.setErrors( null );

    }
  }
  righttablePusg( u: any ): void {


    this.selectedUser2.forEach( element => {

      if ( element.attributeMasterId == null ) {
        console.log( 'attributer master id is not found' );
      } else {
        console.log( 'attributeMasterId', element.attributeMasterId );
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
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.AttributeGlobalForm.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block 123' );
      this.AttributeGlobalForm.setErrors( null );

    }
  }
  resetAttributeSelection(): void {
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.AttributeGlobalForm.reset();
    this.viewCancelButton = false;
    this.AttributeGlobalForm.patchValue( {
      attributeNature: ''
    } );
    this.getAllAttributeCreation();
  }
  CancelAttributeCreation(): void {
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.AttributeGlobalForm.reset();
    this.viewCancelButton = false;



    this.AttributeGlobalForm.enable();
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.disabled = true;
    this.AttributeGlobalForm.reset();
    this.viewCancelButton = false;
    this.viewupdateButton = false;
    this.sourceProducts = this.originalSourceProductList;
    this.AttributeGlobalForm.patchValue( {
      attributeNature: ''
    } );

    this.getAllAttributeCreation();

  }


  onStatusChange( event ) {

    console.log( 'evt', event.target.value );
    if ( event.target.value == '' ) {
      this.AttributeGlobalForm.setErrors( null );
      this.selectedUser2 = [];
      this.selectedUser = [];


      this.sourceProducts = [];
      this.targetProducts = [];
      this.attributeSelectionService.getGlobalAttribute1().subscribe( res => {
        this.originalSourceProductList = res.data.results;
        this.sourceProducts = res.data.results;
      } );


    } else {
      this.selectedUser2 = [];
      this.selectedUser = [];


      this.sourceProducts = [];
      this.targetProducts = [];
      this.attributeSelectionService.getGlobalAttribute1().subscribe( res => {
        this.originalSourceProductList = res.data.results;
        this.sourceProducts = res.data.results[0];
      }, ( error ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }, () => {
        this.sourceProducts = this.originalSourceProductList;
        this.attributeSelectionService.GetHeadGroupByGetGlobalPHGByName( event.target.value ).subscribe( res => {

          this.targetProducts = res.data.results[0].attributeMasters;
          this.targetProducts.forEach( element => {
            //    element.disabled = true;
            //  var index = this.targetProducts.indexOf( element )
            this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
          } );

        } );

        this.AttributeGlobalForm.setErrors( { 'INVALID': true } );
        // this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
        // if ( this.userHasSelectedMandatoryFieldOnly ) {
        //   this.AttributeGlobalForm.setErrors( { 'INVALID': true } );

        // } else {
        //   console.log( 'in else block  ee' );
        //   this.AttributeGlobalForm.setErrors( null );

        // }

      } );


    }


  }
  onStatusChange1( event ) {
    this.selectedUser2 = [];
    this.selectedUser = [];
    this.sourceProducts = [];
    this.targetProducts = [];
    this.getAllAttributeCreation();

    this.sourceProducts = this.originalSourceProductList;
    console.log( 'name', event.target.value );
    this.attributeSelectionService.GetHeadGroupByGetGlobalPHGByName( event.target.value ).subscribe( res => {
      console.log( 'GetHeadGroupByGetGlobalPHGByName res is', res );

      this.targetProducts = res.data.results[0].attributeMasters;
      this.targetProducts.forEach( element => {
        //  element.disabled = true;
        this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
      } );
    }, ( error ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );
    } );
    // this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
  }

  // Get Attribute Selection ById
  GetAttributeSelectionByIdDisable( id ): void {

    this.attributeSelectionService.getAllGlobalAttributeCreation().subscribe( res => {
      console.log( 'check source res ', res );
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    }, ( error ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );

    }, () => {
      this.disabled = false;
      this.viewupdateButton = false;
      this.viewCancelButton = true;

      this.attributeSelectionService.GetAttriubuteSelectionByIdGlobal( id )
        .subscribe( response => {

          this.targetProducts = response.data.results[0].attributeMasters;

          this.targetProducts.forEach( element => {
            this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
          } );

          this.AttributeGlobalForm.patchValue( { name: response.data.results[0].name } );
          this.AttributeGlobalForm.patchValue( { description: response.data.results[0].description } );
          //   this.AttributeGlobalForm.patchValue( { attributeNature: response.data.results[0].name } );

        }, ( error ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
      this.AttributeGlobalForm.disable();

    } );


  }

  // Get Attribute Selection ById
  GetAttributeSelectionById( id ): void {
    this.attributeSelectionService.getAllGlobalAttributeCreation().subscribe( res => {
      console.log( 'check source res ', res );
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    }, ( error ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );

    }, () => {
      this.originalTargetList = [];
      this.disabled = true;
      this.viewupdateButton = true;
      this.viewCancelButton = true;
      this.attributeGroupId = id;
      this.attributeSelectionService.GetAttriubuteSelectionByIdGlobal( id )
        .subscribe( response => {
          this.targetProducts = response.data.results[0].attributeMasters;
          this.originalTargetList = response.data.results[0].attributeMasters;
          this.targetProducts.forEach( element => {
            this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
          } );
          this.AttributeGlobalForm.patchValue( { name: response.data.results[0].name } );
          this.AttributeGlobalForm.patchValue( { description: response.data.results[0].description } );
          //       this.AttributeGlobalForm.patchValue( { attributeNature: response.data.results[0].name } );
        }, ( error ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    } );


  }


  //Delete Attribute Selection by id
  DeleteAttributeSelection(): void {
    this.attributeSelectionService.DeleteAttributeSelectionAtGlobal( this.idToBeDeletetd )
      .subscribe( response => {

        this.alertService.sweetalertMasterSuccess( response.status.message, '' )
        this.getAllAttributeSelection();
        this.AttributeGlobalForm.reset();
        this.targetProducts = [];
      }, ( error ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }

  //add new AttributeCreation
  addAttributeSelection(): void {


    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      addAttributeCreation.attributeMasterIdList.push( f.attributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeGlobalForm.value.name;
    addAttributeCreation.description = this.AttributeGlobalForm.value.description;
    console.log( JSON.stringify( addAttributeCreation ) );

    this.attributeSelectionService.AddAttributeSelectionGlobal( addAttributeCreation ).subscribe( ( res: any ) => {

      addAttributeCreation.attributeMasterIdList = [];
      this.targetProducts = [];
      this.alertService.sweetalertMasterSuccess( res.status.message, '' ); //success
      this.getAllAttributeSelection();
      this.AttributeGlobalForm.reset();
      this.resetAttributeSelection();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );

  }

  UpdateAttributeSelection(): void {

    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      console.log( f );
      addAttributeCreation.attributeMasterIdList.push( f.attributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeGlobalForm.value.name;
    addAttributeCreation.description = this.AttributeGlobalForm.value.description;

    this.attributeSelectionService.UpdateAttributeGlobal( this.attributeGroupId, addAttributeCreation ).subscribe( ( res: any ) => {

      addAttributeCreation.attributeMasterIdList = [];
      this.targetProducts = [];
      this.viewCancelButton = false;
      this.viewupdateButton = false;
      this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      this.getAllAttributeSelection();
      this.AttributeGlobalForm.reset();
      this.resetAttributeSelection();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
    //}
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
  UploadModal1( template: TemplateRef<any>, id: number ) {
    this.idToBeDeletetd = id;
    this.deleteModalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
}
