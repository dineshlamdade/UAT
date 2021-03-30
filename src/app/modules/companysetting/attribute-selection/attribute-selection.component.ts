import { CompanySettingsService } from './../company-settings.service';

import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveAttributeSelection } from '../model/business-cycle-model';
import { AnyCnameRecord } from 'node:dns';




@Component( {
  selector: 'app-attribute-selection',
  templateUrl: './attribute-selection.component.html',
  styleUrls: ['./attribute-selection.component.scss']
} )
export class AttributeSelectionComponent implements OnInit {
  removedAttributeGroupIdList = [];
  originalTargetList = [];
  @ViewChild( 'AttributeSelectionForm' ) form: NgForm;
  AttributeSelectionList: Array<any> = [];
  AttributeSelectionForm: FormGroup;
  disabled: boolean = true
  viewCancelButton: boolean = false;
  hidevalue: boolean = false;
  optionList = [];
  selectedNature: string;
  viewupdateButton: boolean = false;
  attributeGroupId: number;
  sourceProducts: Array<any> = [];
  targetProducts: Array<any> = [];
  originalSourceProductList: Array<any> = [];
  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];
  selectedMaterialCode: any;

  constructor(

    private formBuilder: FormBuilder,
    private attributeSelectionService: CompanySettingsService,
    private alertService: AlertServiceService ) { }

  ngOnInit(): void {
    this.getAllAttributeSelection();
    this.getAllAttributeCreation();
    //  this.targetProducts = [];
    //this.primengConfig.ripple = true;

    this.AttributeSelectionForm = this.formBuilder.group( {
      attributeGroupDefinitionId: new FormControl( null, ),
      name: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '' )
    } );

  }
  getAllAttributeCreation() {
    //this.originalSourceProductList = [];
    // this.sourceProducts = [];
    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
      this.sourceProducts['dummy'] = 'dd';
      this.originalSourceProductList['dummy'] = 'dd';
    } );
  }
  // get All Attribute Selection
  getAllAttributeSelection(): void {
    this.attributeSelectionService.getAttributeGroup().subscribe( res => {
      this.AttributeSelectionList = res.data.results;
    } );
  }

  RowSelected( u: any ) {
    let temp = this.sourceProducts;
    this.sourceProducts = new Array();
    this.sourceProducts = [];
    // let index1 = temp.findIndex( o => o.code == u.code );
    this.selectedMaterialCode = u.code;
    let index = this.selectedUser.findIndex( o => o.code == u.code );


    let isContain = this.selectedUser.some( o => o.code == u.code );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.selectedUser.splice( index, 1 );
      //   temp[index1].dummy = 'List';
    } else {
      //  temp[index1].dummy = 'List123';
      this.selectedUser.push( u );
    }
    this.sourceProducts = temp;
    console.log( 'selected row is', u );
    console.log( "selected user", this.selectedUser );
    this.sourceProducts = [];
    this.sourceProducts = temp;
  }

  RowSelectedtargetProducts( u: any ): void {
    let temp = this.targetProducts;
    this.targetProducts = new Array();
    /// let index1 = temp.findIndex( o => o.code == u.code );
    let index = this.selectedUser2.findIndex( o => o.code == u.code );
    let isContain = this.selectedUser2.some( o => o.code == u.code );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.selectedUser2.splice( index, 1 );
      //  temp[index1].attributeNature = 'List';
    } else {
      //temp[index1].attributeNature = 'List123';
      this.selectedUser2.push( u );
    }


    //this.targetProducts.push(u);
    // declare variable in component.


    this.targetProducts = temp;



  }
  lefttablePusg(): void {

    // const sss=this.newarray;
    // this.selectedUser.forEach(function(f){
    //  sss.push(f);
    // });

    this.selectedUser.forEach( ( element, index ) => {
      this.selectedUser[index].attributeNature = 'List';

      this.targetProducts.push( element );
    } );

    // var v = this.selectedUser;

    //  v.forEach(element => {
    //     this.targetProducts.push(element);
    //   });

    // for(var i=0;i<v.length;++i)
    // {
    // this.targetProducts.push(v[0]);
    // }

    this.selectedUser.forEach( element => {
      var index = this.sourceProducts.indexOf( element )
      this.selectedUser = [];
      if ( index > -1 ) {
        this.sourceProducts.splice( index, 1 );

      }
    } );


    // var index=this.sourceProducts.indexOf(this.selectedUser[0])
    // this.selectedUser=[];
    // if (index > -1) {
    //  this.sourceProducts.splice(index,1)
    // this.selectedUser=[];

    // }
    // this.sourceProducts.splice(this.selectedUser.indexOf(0))
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
      this.sourceProducts.push( element );
    } );
    var v = this.selectedUser;

    this.selectedUser2.forEach( element => {
      var index = this.targetProducts.indexOf( element, index )
      this.targetProducts[index].attributeNature = 'List';
      this.selectedUser2 = [];
      if ( index > -1 ) {
        this.targetProducts.splice( index, 1 )
      }
    } );

    //   var index=this.targetProducts.indexOf(this.selectedUser2[0])
    //   this.selectedUser2=[];
    //   if (index > -1) {
    //    this.targetProducts.splice(index,1)

    // }
  }
  resetAttributeSelection(): void {
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    console.log( 'in reset' );
    console.log( ' this.originalSourceProductList;', this.originalSourceProductList );
    this.AttributeSelectionForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    //this.sourceProducts = this.originalSourceProductList;
    this.getAllAttributeCreation();
    this.AttributeSelectionForm.patchValue( {
      attributeNature: ''
    } );


  }
  CancelAttributeCreation(): void {
    this.AttributeSelectionForm.enable();
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.disabled = true;
    this.hidevalue = false;
    this.AttributeSelectionForm.reset();
    this.viewCancelButton = false;
    this.viewupdateButton = false;
    this.sourceProducts = this.originalSourceProductList;
    this.AttributeSelectionForm.patchValue( {
      attributeNature: ''
    } );

  }



  onStatusChange( event ) {
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.sourceProducts = [];
    this.sourceProducts = this.originalSourceProductList;

    //this.selectedCopFormAttGrp = event.target.value;

    // GetAttributeOptionList(): void {
    this.attributeSelectionService.GetAttributeOptionListByGroup( event.target.value ).subscribe( res => {
      console.log( 'res is', res );

      this.targetProducts = res.data.results[0].attributeMasters;
      console.log( 'target prod', this.targetProducts );

      this.targetProducts.forEach( element => {
        var index = this.targetProducts.indexOf( element )
        this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
      } );

      //  this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
      //
      //     this.sourceProducts = res.data.results;
      //     });

      // this.targetProducts.forEach(element => {
      //   var index=this.targetProducts.indexOf(element)
      //   this.sourceProducts = this.sourceProducts.filter(e => e.code == element.code);
      // });

    } );
  }

  // Get Attribute Selection ById
  GetAttributeSelectionByIdDisable( id ): void {

    // this.CycleupdateFlag=true;
    // this.CycleupdateFlag1=false;
    this.disabled = false;
    this.viewupdateButton = false;
    this.viewCancelButton = true;

    this.attributeSelectionService.GetAttributeSelectionById( id )
      .subscribe( response => {

        this.targetProducts = response.data.results[0].attributeMasters;

        this.targetProducts.forEach( element => {
          var index = this.targetProducts.indexOf( element )
          this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
        } );
        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.AttributeSelectionForm.patchValue( { name: response.data.results[0].name } );
        this.AttributeSelectionForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeSelectionForm.patchValue( { attributeNature: response.data.results[0].name } );

      } );
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
        this.originalTargetList = response.data.results[0].attributeMasters
        console.log( 'xxxxx', this.targetProducts );
        this.targetProducts.forEach( element => {
          var index = this.targetProducts.indexOf( element )
          this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
        } );
        this.AttributeSelectionForm.patchValue( { name: response.data.results[0].name } );
        this.AttributeSelectionForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeSelectionForm.patchValue( { attributeNature: response.data.results[0].name } );
      } );
  }


  //Delete Attribute Selection by id
  DeleteAttributeSelection( id ): void {
    this.attributeSelectionService.DeleteAttributeSelection( id )
      .subscribe( response => {

        this.alertService.sweetalertMasterSuccess( response.status.message, '' )
        this.getAllAttributeSelection();
        this.AttributeSelectionForm.reset();
        this.targetProducts = [];
      } );
  }

  //add new AttributeCreation
  addAttributeSelection(): void {

    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      addAttributeCreation.attributeMasterIdList.push( f.attributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeSelectionForm.value.name;
    addAttributeCreation.description = this.AttributeSelectionForm.value.description;
    //  if ( addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0 ) {
    console.log( JSON.stringify( addAttributeCreation ) );

    this.attributeSelectionService.AddAttributeSelection( addAttributeCreation ).subscribe( ( res: any ) => {

      addAttributeCreation.attributeMasterIdList = [];
      this.targetProducts = [];
      this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      this.getAllAttributeSelection();
      this.hidevalue = false;
      this.AttributeSelectionForm.reset();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
    // }
    // else {
    //   addAttributeCreation.removedAttributeGroupIdList = [];
    //   for ( let i = 0; i < this.originalSourceProductList.length; i++ ) {



    //     if ( addAttributeCreation.attributeMasterIdList.some( o => o.attributeMasterId == this.originalSourceProductList[i].attributeMasterId ) ) {

    //     } else {
    //       addAttributeCreation.removedAttributeGroupIdList.push( this.originalSourceProductList[i].attributeMasterId );

    //     }

    //   }

    //   console.log( JSON.stringify( addAttributeCreation.attributeGroupDefinitionId ) );
    //   console.log( JSON.stringify( addAttributeCreation ) );
    //   this.attributeSelectionService.UpdateAttributeGroup( addAttributeCreation.attributeGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {

    //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    //     this.getAllAttributeSelection();
    //     this.AttributeSelectionForm.reset();
    //   },
    //     ( error: any ) => {
    //       this.alertService.sweetalertError( error["error"]["status"]["message"] );
    //     } );
    // }
  }

  UpdateAttributeSelection(): void {

    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      addAttributeCreation.attributeMasterIdList.push( f.attributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeSelectionForm.value.name;
    addAttributeCreation.description = this.AttributeSelectionForm.value.description;
    console.log( JSON.stringify( this.attributeGroupId ) );
    console.log( JSON.stringify( addAttributeCreation ) );

    addAttributeCreation.removedAttributeGroupIdList = [];
    for ( let i = 0; i < this.originalSourceProductList.length; i++ ) {



      if ( addAttributeCreation.attributeMasterIdList.some( o => o.attributeMasterId == this.originalSourceProductList[i].attributeMasterId ) ) {
        addAttributeCreation.removedAttributeGroupIdList.push( this.originalSourceProductList[i].attributeMasterId );

      } else {


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
        this.AttributeSelectionForm.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }

  doubleClickOnLeftTable( u: any ) {
    this.RowSelected( u );
    this.lefttablePusg();
  }
  doubleClickOnRightTable( u: AnyCnameRecord ) {
    this.RowSelectedtargetProducts( u );
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
export interface Product {
  // id?:string;
  code: string;
  attributeNature: string;
  description: string;
}

