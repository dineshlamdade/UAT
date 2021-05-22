import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
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
  userHasSelectedMandatoryFieldOnly = false
  summaryList: Array<any> = [];;
  originalTargetList = [];
  @ViewChild( 'AttributeSelectionForm' ) form: NgForm;
  AttributeSelectionList: Array<any> = [];
  AttributeSelectionForm: FormGroup;
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

    //  getAllGlobalAttributeCreation
    /// COMMENTED FUNCTION getAllAttributeCreation
    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {
      console.log( 'c', res.data.results );
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    } );
  }
  // get All Attribute Selection
  getAllAttributeSelection(): void {
    this.summaryList = [];
    this.attributeSelectionService.getAttributeGroup().subscribe( res => {
      this.AttributeSelectionList = res.data.results;

      res.data.results.forEach( element => {
        let obj = {
          code: element.code,
          attributeNature: element.attributeNature,
          numberOfOption: element.numberOfOption,
          description: element.description,
          attributeMasterId: element.attributeMasterId,
          options: ( element.attributeMasters ).length,
          id: element.id,
          name: element.name,
        }
        this.summaryList.push( obj );
      } );
    } );
  }

  RowSelected( u: any, ind ) {
    let ind1 = this.sourceProducts.findIndex( o => o.code == u.code );

    // this.HighlightRow = ind;
    // let temp = this.sourceProducts;
    // this.sourceProducts = new Array();
    //  this.sourceProducts = [];
    // let index1 = temp.findIndex( o => o.code == u.code );
    // this.selectedMaterialCode = u.code;
    let index = this.selectedUser.findIndex( o => o.code == u.code );


    let isContain = this.selectedUser.some( o => o.code == u.code );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.sourceProducts[ind1].isHighlight = false;
      this.selectedUser.splice( index, 1 );
    } else {

      this.sourceProducts[ind1].isHighlight = true;
      this.selectedUser.push( u );
    }
    // this.sourceProducts = temp;
    console.log( 'selected row is', u );
    console.log( 'selected user', this.selectedUser );
    // this.sourceProducts = [];
    // this.sourceProducts = temp;

    // this.sourceProducts.forEach( ( element, i ) => {
    //   console.log( 'i', i );
    //   console.log( 'this.highlightrow', this.HighlightRow );
    //   if ( i == this.HighlightRow ) {
    //     if ( isContain == true ) {
    //       element.isHighlight = false
    //     } else {
    //       if ( i == this.HighlightRow ) {
    //         element.isHighlight = true
    //       }
    //     }
    //   }
    // } );
  }

  RowSelectedtargetProducts( u: any, i ): void {
    if ( u.disabled == true ) {

    } else {


      this.HighlightRight = i;
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

      this.targetProducts.forEach( ( element, i ) => {
        if ( i == this.HighlightRight ) {
          if ( isContain == true ) {
            element.isHighlightright = false
            element.isHighlight = false
          }
          else {
            //if(i == this.HighlightRow){
            element.isHighlightright = true
            element.isHighlight = false
            //}
          }
        }
      } )

    }
  }
  lefttablePusg(): void {


    // const sss=this.newarray;
    // this.selectedUser.forEach(function(f){
    //  sss.push(f);
    // });

    this.selectedUser.forEach( ( element, index ) => {
      element.isHighlightright = false;
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
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
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
      // this.targetProducts[index].attributeNature = 'List';

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
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
  }
  resetAttributeSelection(): void {
    this.targetProducts = [];
    this.sourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];

    this.AttributeSelectionForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.AttributeSelectionForm.patchValue( {
      attributeNature: ''
    } );
    this.getAllAttributeCreation();
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
    this.resetAttributeSelection();
  }



  onStatusChange( event: any ) {
    console.log( 'evt', event.target.value );
    if ( event.target.value == '' ) {
      this.selectedUser2 = [];
      this.selectedUser = [];


      this.sourceProducts = [];
      this.targetProducts = [];
      this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {
        console.log( 'c', res.data.results );
        this.originalSourceProductList = res.data.results;
        this.sourceProducts = res.data.results;
      } );

    } else {
      this.selectedUser2 = [];
      this.selectedUser = [];


      this.sourceProducts = [];
      this.targetProducts = [];
      this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {
        console.log( 'c', res.data.results );
        this.originalSourceProductList = res.data.results;
        this.sourceProducts = res.data.results;
      }, ( err ) => {
      }, () => {
        this.sourceProducts = this.originalSourceProductList;
        this.attributeSelectionService.GetAttributeOptionListByGroup( event.target.value ).subscribe( res => {
          console.log( 'GetAttributeOptionListByGroup res is', res );

          this.targetProducts = res.data.results[0].attributeMasters;
          this.targetProducts.forEach( element => {
            element.disabled = true;
            //  var index = this.targetProducts.indexOf( element )
            this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
          } );

        } );
        //  this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
        //
        //     this.sourceProducts = res.data.results;
        //     });

        // this.targetProducts.forEach(element => {
        //   var index=this.targetProducts.indexOf(element)
        //   this.sourceProducts = this.sourceProducts.filter(e => e.code == element.code);
        // });


        this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );




      } );


    }



  }

  // Get Attribute Selection ById
  // GetAttributeSelectionByIdDisable( id ): void {
  //   this.disabled = false;
  //   this.viewupdateButton = false;
  //   this.viewCancelButton = true;

  //   this.attributeSelectionService.GetAttributeSelectionById( id )
  //     .subscribe( response => {

  //       this.targetProducts = response.data.results[0].attributeMasters;

  //       this.targetProducts.forEach( element => {
  //         var index = this.targetProducts.indexOf( element )
  //         this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
  //       } );
  //       //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
  //       this.AttributeSelectionForm.patchValue( { name: response.data.results[0].name } );
  //       this.AttributeSelectionForm.patchValue( { description: response.data.results[0].description } );
  //       this.AttributeSelectionForm.patchValue( { attributeNature: response.data.results[0].name } );

  //     } );
  //   this.AttributeSelectionForm.disable();
  // }




  GetAttributeSelectionByIdDisable( id ): void {
    this.disabled = false;
    this.viewupdateButton = false;
    this.viewCancelButton = true;

    this.selectedUser2 = [];
    this.selectedUser = [];


    this.sourceProducts = [];
    this.targetProducts = [];
    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {
      console.log( 'c', res.data.results );
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    }, ( err ) => {
    }, () => {
      this.sourceProducts = this.originalSourceProductList;


      this.attributeSelectionService.GetAttributeSelectionById( id )
        .subscribe( response => {
          this.targetProducts = response.data.results[0].attributeMasters;
          this.originalTargetList = response.data.results[0].attributeMasters;
          console.log( 'this.targetProducts', this.targetProducts );
          this.targetProducts.forEach( element => {
            this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
          } );
          this.AttributeSelectionForm.patchValue( { name: response.data.results[0].name } );
          this.AttributeSelectionForm.patchValue( { description: response.data.results[0].description } );
          this.AttributeSelectionForm.patchValue( { attributeNature: response.data.results[0].name } );
        } );
      this.disabled = true;
      this.viewupdateButton = true;
      this.viewCancelButton = true;
      this.attributeGroupId = id;


    } );
    this.AttributeSelectionForm.disable();
  }








  // Get Attribute Selection ById
  GetAttributeSelectionById( id ): void {

    this.selectedUser2 = [];
    this.selectedUser = [];


    this.sourceProducts = [];
    this.targetProducts = [];
    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {
      console.log( 'c', res.data.results );
      this.originalSourceProductList = res.data.results;
      this.sourceProducts = res.data.results;
    }, ( err ) => {
    }, () => {
      this.sourceProducts = this.originalSourceProductList;


      this.attributeSelectionService.GetAttributeSelectionById( id )
        .subscribe( response => {
          this.targetProducts = response.data.results[0].attributeMasters;
          this.originalTargetList = response.data.results[0].attributeMasters;
          console.log( 'this.targetProducts', this.targetProducts );
          this.targetProducts.forEach( element => {
            this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );
          } );
          this.AttributeSelectionForm.patchValue( { name: response.data.results[0].name } );
          this.AttributeSelectionForm.patchValue( { description: response.data.results[0].description } );
          this.AttributeSelectionForm.patchValue( { attributeNature: response.data.results[0].name } );
        } );
      this.disabled = true;
      this.viewupdateButton = true;
      this.viewCancelButton = true;
      this.attributeGroupId = id;


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

      } );

    //     else {
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
    //       this.alertService.sweetalertError( error[error][status][message] );
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
    // for ( let i = 0; i < this.originalSourceProductList.length; i++ ) {

    //   if ( addAttributeCreation.attributeMasterIdList.some( o => o.attributeMasterId == this.originalSourceProductList[i].attributeMasterId ) ) {
    //     // addAttributeCreation.removedAttributeGroupIdList.push( this.originalSourceProductList[i].attributeMasterId );


    //   } else {
    //     console.log( 'line no 479 in else block' );

    //   }

    // }
    // for ( let i = 0; i < this.originalTargetList.length; i++ ) {
    //   addAttributeCreation.removedAttributeGroupIdList.push( this.originalTargetList[i].attributeMasterId );
    // }

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
export interface Product {
  // id?:string;
  code: string;
  attributeNature: string;
  description: string;
}

