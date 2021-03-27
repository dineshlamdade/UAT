import { CompanySettingsService } from './../company-settings.service';

import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { NgForm } from "@angular/forms";
import { AlertServiceService } from '../../../core/services/alert-service.service';


export class SaveAttributeCreation {
  globalAttributeMasterId: number;
  code; string;
  description: string;
  attributeNature: string;
  numberOfOption: string;
  options: any[];
}

export class SaveAttributeSelection {
  attributeGroupDefinitionId: number;
  // id:number;
  name; string;
  description: string;
  //createdBy:string;
  // attributeNature:string;
  // numberOfOption:string;
  attributeMasterIdList: any[];
}


@Component( {
  selector: 'app-attribute-selection',
  templateUrl: './attribute-selection.component.html',
  styleUrls: ['./attribute-selection.component.scss']
} )
export class AttributeSelectionComponent implements OnInit {
  @ViewChild( "form" ) form: NgForm;
  AttributeSelectionList: Array<any> = [];
  NatureList: Array<any> = [];
  AttributeCreationForm: FormGroup;
  disabled: boolean = true
  viewCancelButton: boolean = false;
  hidevalue: boolean = false;
  //summons = [];
  summons: Array<any> = [];
  newlist: Array<any> = [];
  optionList = [];
  selectedNature: string;
  viewupdateButton: boolean = false;
  attributeGroupId: number;
  selectedCopFormAttGrp: string;

  sourceProducts: Array<any> = [];
  targetProducts: Array<any> = [];

  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];


  newarray: Array<any> = [];

  cities: any[];

  selectedCity: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private attributeSelectionService: CompanySettingsService,
    private alertService: AlertServiceService
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit(): void {
    this.getAllAttributeSelection();
    // get All AttributeCreation
    // getAllAttributeCreation(): void {
    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {

      this.sourceProducts = res.data.results;
    } );
    //  }
    // this.attributeSelectionService.getAllAttributeCreation().then(products => this.sourceProducts = products);
    this.targetProducts = [];
    this.primengConfig.ripple = true;
    console.log( this.targetProducts.length )

    this.AttributeCreationForm = this.formBuilder.group( {
      attributeGroupDefinitionId: new FormControl( null, ),
      name: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '', ),
      //  optionList: new FormControl('',Validators.required),
      // optionList: this.formBuilder.array([]),
      // type: new FormControl('', ),
      // isStatutory: new FormControl('0'),
    } );
  }




  RowSelected( u: any ) {

    this.selectedUser.push( u );
    console.log( "selected user", this.selectedUser );
    //this.targetProducts.push(u);
    // declare variable in component.
  }
  lefttablePusg(): void {

    // const sss=this.newarray;
    // this.selectedUser.forEach(function(f){
    //  sss.push(f);
    // });

    this.selectedUser.forEach( element => {
      this.targetProducts.push( element );
    } );

    var v = this.selectedUser;

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
        this.sourceProducts.splice( index, 1 )
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
  RowSelectedtargetProducts( u: any ): void {
    this.selectedUser2.push( u );
  }
  righttablePusg( u: any ): void {

    this.selectedUser2.forEach( element => {
      this.sourceProducts.push( element );
    } );
    var v = this.selectedUser;

    this.selectedUser2.forEach( element => {
      var index = this.targetProducts.indexOf( element )
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
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;

    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {

      this.sourceProducts = res.data.results;
    } );

    this.targetProducts = [];
  }
  CancelAttributeCreation(): void {
    this.summons = [];
    this.disabled = true;
    this.hidevalue = false;
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.viewupdateButton = false;
    this.targetProducts = [];

    this.attributeSelectionService.getAllAttributeCreation().subscribe( res => {

      this.sourceProducts = res.data.results;
    } );

  }

  // get All Attribute Selection
  getAllAttributeSelection(): void {
    this.attributeSelectionService.getAllAttributeSelection().subscribe( res => {

      this.AttributeSelectionList = res.data.results;
    } );
  }

  onStatusChange( event ) {

    this.selectedCopFormAttGrp = event.target.value;

    // GetAttributeOptionList(): void {
    this.attributeSelectionService.GetAttributeOptionListByGroup( this.selectedCopFormAttGrp ).subscribe( res => {

      this.targetProducts = res.data.results[0].attributeMasters;

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
    ;
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
        this.AttributeCreationForm.patchValue( { name: response.data.results[0].name } );
        this.AttributeCreationForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeCreationForm.patchValue( { attributeNature: response.data.results[0].name } );

      } );
  }

  // Get Attribute Selection ById
  GetAttributeSelectionById( id ): void {
    ;
    // this.CycleupdateFlag=true;
    // this.CycleupdateFlag1=false;
    this.disabled = true;
    this.viewupdateButton = true;
    this.viewCancelButton = true;
    this.attributeGroupId = id;
    this.attributeSelectionService.GetAttributeSelectionById( id )
      .subscribe( response => {

        this.targetProducts = response.data.results[0].attributeMasters;

        console.log( "targetProducts", this.targetProducts );
        console.log( "sourceProducts", this.sourceProducts );

        this.targetProducts.forEach( element => {
          console.log( "element", element );
          console.log( "element", element.code );

          var index = this.targetProducts.indexOf( element )
          this.sourceProducts = this.sourceProducts.filter( e => e.code !== element.code );

          // console.log("index",index);
          // //this.selectedUser=[];
          // if (index > -1) {
          //   this.sourceProducts.splice(index,1)
          //  }
          // // if (index > -1) {
          // //  this.sourceProducts.splice(index,1)
          // // }
        } );


        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.AttributeCreationForm.patchValue( { name: response.data.results[0].name } );
        this.AttributeCreationForm.patchValue( { description: response.data.results[0].description } );
        //this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].name });

      } );
  }


  //Delete Attribute Selection by id
  DeleteAttributeSelection( id ): void {
    ;
    // this.CycleupdateFlag=false;
    // this.CycleupdateFlag1=false;
    this.attributeSelectionService.DeleteAttributeSelection( id )
      .subscribe( response => { //: saveBusinessYear[]

        this.alertService.sweetalertMasterSuccess( response.status.message, '' )
        this.getAllAttributeSelection();
        this.AttributeCreationForm.reset();
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
    addAttributeCreation.name = this.AttributeCreationForm.value.name;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    //addAttributeCreation.createdBy="nisha";
    // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
    if ( addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0 ) {

      this.attributeSelectionService.AddAttributeSelection( addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts = [];
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeSelection();
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
    else {

      this.attributeSelectionService.UpdateAttributeGroup( addAttributeCreation.attributeGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeSelection();
        this.AttributeCreationForm.reset();
        // this.updateFlag=false;
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }

  UpdateAttributeSelection(): void {

    const addAttributeCreation: SaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.attributeMasterIdList = [];
    this.targetProducts.forEach( function ( f ) {
      addAttributeCreation.attributeMasterIdList.push( f.attributeMasterId );
    } );
    addAttributeCreation.name = this.AttributeCreationForm.value.name;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    //addAttributeCreation.createdBy="nisha";
    // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
    if ( addAttributeCreation.attributeGroupDefinitionId == undefined || addAttributeCreation.attributeGroupDefinitionId == 0 ) {

      this.attributeSelectionService.UpdateAttributeGroup( this.attributeGroupId, addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.attributeMasterIdList = [];
        this.targetProducts = [];
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllAttributeSelection();
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }


  }



}
export interface Product {
  // id?:string;
  code: string;
  attributeNature: string;
  description: string;
  // price?:number;
  // quantity?:number;
  // inventoryStatus?:string;
  // category?:string;
  // image?:string;
  // rating?:number;
}

