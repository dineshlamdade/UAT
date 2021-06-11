
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertServiceService } from '../../../../app/core/services/alert-service.service';
import { CompanySettingsService } from '../company-settings.service';



@Component( {
  selector: 'app-attribute-dependency',
  templateUrl: './attribute-dependency.component.html',
  styleUrls: ['./attribute-dependency.component.scss']
} )
export class AttributeDependencyComponent implements OnInit {
  treatmentList = ['Default', 'Hide'];
  summary = [];
  viewCancelButton: boolean = false;
  isEditMode: boolean = false;
  AttDepForm: FormGroup;
  disabled: boolean = true;
  viewUpdateButton: boolean = false;
  headNatureList = [];
  attribute1List = [];
  attribute2List = [];
  attribute3List = [];
  FormulaArray: Array<any> = [];
  SDMArray: Array<any> = [];
  Formula: string;
  selectedBaseAttribute1Id: number = null;
  selectedBaseAttribute2Id: number = null;
  selectedBaseAttribute3Id: number = null;
  selectedBaseAttribute4Id: number = null;
  baseAttributeValue1List = [];
  baseAttributeValue2List = [];
  baseAttributeValue3List = [];
  dependentAttributeList = [];
  dependentAttributeValueList = [];
  editedRecordId: number = 0;
  allGlobalHeadList: Array<any> = [];
  AttributeSelectionList = [];
  selectedBaseAttribute1Name: string = null;
  selectedBaseAttribute2Name: string = null;
  selectedBaseAttribute3Name: string = null;
  attributeGroupDefinitionId: number = null;

  constructor(
    private formBuilder: FormBuilder, private alertService: AlertServiceService,
    private companySettingService: CompanySettingsService ) {

  }

  ngOnInit(): void {
    this.getAllAttributeSelection();
    this.getHeadNatureList();
    this.getAllFormulaList();
    this.getAllSDMList();
    this.getAllHeadCreation();
    this.getSummary();


    this.AttDepForm = this.formBuilder.group( {
      payrollHeadGroupAttributeDependencyId: new FormControl( null ),
      headNature: new FormControl( null ),
      attribute1: new FormControl( null ),
      value1: new FormControl( null ),
      attribute2: new FormControl( null ),
      value2: new FormControl( null ),
      attribute3: new FormControl( null ),
      value3: new FormControl( null ),

      derivedAttribute: new FormControl( null, Validators.required ),
      derivedAttributeValue: new FormControl( null ),

      action: new FormControl( null, Validators.required ),
      remark: new FormControl( null ),
      activeStatus: new FormControl( null ),

      attributeGroupDefinitionId: new FormControl( null ),

      attributeGroupId1: new FormControl( null ),
      attributeGroupId2: new FormControl( null ),
      attributeGroupId3: new FormControl( null ),
      attributeGroupId4: new FormControl( null ),
    } );
    this.AttDepForm.get( 'remark' ).disable();
    this.AttDepForm.get( 'activeStatus' ).setValue( true );
    this.AttDepForm.get( 'activeStatus' ).disable();

  }
  // get All Head List
  getAllHeadCreation(): void {
    this.companySettingService.getAllHeadCreation().subscribe( res => {
      this.allGlobalHeadList = res.data.results;
    } );
  }

  getAllSDMList(): void {
    this.companySettingService.getSDMFormula().subscribe( res => {
      this.SDMArray = res.data.results;
    } );
  }
  getAllFormulaList(): void {
    this.companySettingService.getFromulaForFormulaMaster().subscribe( res => {
      this.FormulaArray = res.data.results;
      this.Formula = res.data.results[0].originalFormula;
    } );
  }

  getHeadNatureList() {

    this.headNatureList = [];
    this.companySettingService.getHeadNatureByNatureGroup().subscribe( res => {
      this.headNatureList = res.data.results;
    } );
  }
  getSummary(): void {
    this.summary = [];
    this.companySettingService.getAllActiveAndNonActiveAttributeDependency().subscribe( res => {
      console.log( 'ress', res );
      this.summary = res.data.results;
    } );
  }
  getAllAttributeSelection(): void {

    this.companySettingService.getAllGlobalAttributeMasterByGlobal().subscribe( res => {
      console.log( 'res check11 ', res );
      this.AttributeSelectionList = res.data.results;
    } );
  }


  addAttributeDependency(): void {

    const data = this.AttDepForm.getRawValue();
    console.log( JSON.stringify( data ) );

    if ( this.isEditMode == false ) {
      data.attributeGroupDefinitionId = this.attributeGroupDefinitionId;

      this.companySettingService.addPHGAttributeDependency( data ).subscribe( ( res: any ) => {
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getSummary();
        this.CancelHeadCreation();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

    } else {

      data.payrollHeadGroupAttributeDependencyId = this.editedRecordId;
      this.companySettingService.updateAttributeDependncyById( data ).subscribe( ( res: any ) => {
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getSummary();
        this.CancelHeadCreation();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }
  CancelHeadCreation(): void {
    this.isEditMode = false;
    this.editedRecordId = 0;
    this.viewUpdateButton = false;
    this.viewCancelButton = false;
    this.AttDepForm.enable();
    this.AttDepForm.reset();

    this.AttDepForm.patchValue( {
      headNature: null,
      attribute1: null,
      value1: null,
      attribute2: null,
      value2: null,
      attribute3: null,
      value3: null,
      derivedAttribute: null,
      derivedAttributeValue: null,
      action: null,
      remark: null,
      activeStatus: null,

      attributeGroupDefinitionId: null,
      attributeGroupId1: null,
      attributeGroupId2: null,
      attributeGroupId3: null,
      attributeGroupId4: null,



    } );
    this.AttDepForm.get( 'remark' ).disable();
    this.AttDepForm.get( 'activeStatus' ).setValue( true );
    this.AttDepForm.get( 'activeStatus' ).disable();

  }

  ResetHeadCreation(): void {
    this.isEditMode = false;
    this.viewUpdateButton = false;

    this.editedRecordId = 0;
    this.viewCancelButton = false;
    this.AttDepForm.enable();
    this.AttDepForm.reset();

    this.AttDepForm.patchValue( {
      headNature: null,
      attribute1: null,
      value1: null,
      attribute2: null,
      value2: null,
      attribute3: null,
      value3: null,
      derivedAttribute: null,
      derivedAttributeValue: null,
      action: null,
      remark: null,
      activeStatus: null,

      attributeGroupDefinitionId: null,
      attributeGroupId1: null,
      attributeGroupId2: null,
      attributeGroupId3: null,
      attributeGroupId4: null,
    } );

    this.AttDepForm.get( 'remark' ).disable();
    this.AttDepForm.get( 'activeStatus' ).setValue( true );
    this.AttDepForm.get( 'activeStatus' ).disable();
  }
  onChangeEvent( event: any ): void {
    this.AttDepForm.patchValue( { shortName: event.target.value } );
  }
  onChangeHeadNature( evt: any, value: any ) { }

  onChangeBaseAttribute1( evt: any, code: string ) {

    if ( code == 'null' ) {
      this.baseAttributeValue1List = [];

    } else {



      let findIndex = this.attribute1List.findIndex( o => o.attributeMasters.code == code );
      this.AttDepForm.get( 'attributeGroupId1' ).setValue( this.attribute1List[findIndex].id );
      // this.AttDepForm.set( 'attribute1' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );
      this.selectedBaseAttribute1Id = this.attribute1List[findIndex].id;
      //this.selectedBaseAttribute1Id = this.attribute1List[findIndex].id;
      // this.selectedBaseAttribute1Name = evt.target.options[evt.target.options.selectedIndex].text;
      if ( this.editedRecordId > 0 ) {
        this.AttDepForm.get( 'value1' ).enable();
        this.AttDepForm.get( 'attribute2' ).enable();
        this.AttDepForm.get( 'value2' ).enable();
        this.AttDepForm.get( 'attribute3' ).enable();
        this.AttDepForm.get( 'value3' ).enable();
        this.AttDepForm.get( 'derivedAttribute' ).enable();
        this.AttDepForm.get( 'derivedAttributeValue' ).enable();
      }
      this.attribute2List = [];
      this.attribute3List = [];
      this.dependentAttributeList = [];
      this.baseAttributeValue1List = [];

      this.companySettingService.getGlobalAttribute2New( this.attributeGroupDefinitionId, this.selectedBaseAttribute1Id ).subscribe( res => {
        this.attribute2List = res.data.results;

        this.dependentAttributeList = res.data.results;

      } );
      console.log( this.attribute1List );
      if ( this.attribute1List[findIndex].attributeMasters.attributeNature == 'Formula' ) {
        for ( let i = 0; i < this.FormulaArray.length; i++ ) {
          this.baseAttributeValue1List.push( this.FormulaArray[i].formulaName );
        }
      }
      if ( this.attribute1List[findIndex].attributeMasters.attributeNature == 'List' ) {

        for ( let i = 0; i < this.attribute1List[findIndex].attributeMasters.options.length; i++ ) {
          this.baseAttributeValue1List.push( this.attribute1List[findIndex].attributeMasters.options[i].attributeOptionValue );
        }
      }
      if ( this.attribute1List[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix' ) {
        for ( let i = 0; i < this.SDMArray.length; i++ ) {
          this.baseAttributeValue1List.push( this.SDMArray[i].sdmSchemaName );
        }
      }
      if ( this.attribute1List[findIndex].attributeMasters.attributeNature == 'Head' ) {
        for ( let i = 0; i < this.allGlobalHeadList.length; i++ ) {
          this.baseAttributeValue1List.push( this.allGlobalHeadList[i].standardName );
        }
      }

      this.resetValueWhenBaseAttribute1Changed();
    }
  }
  onChangeBaseAttribute2( evt: any, code: string ) {
    if ( code == 'null' ) {
      this.baseAttributeValue2List = [];

    } else {
      let findIndex = this.attribute2List.findIndex( o => o.attributeMasters.code == code );
      this.selectedBaseAttribute2Id = this.attribute2List[findIndex].id;
      this.AttDepForm.get( 'attributeGroupId2' ).setValue( this.attribute1List[findIndex].id );
      // this.AttDepForm.get( 'attribute2' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );
      // event.target.options[event.target.options.selectedIndex].text;

      console.log( findIndex );
      this.baseAttributeValue2List = [];
      this.companySettingService.getGlobalAttribut33New( this.attributeGroupDefinitionId, this.selectedBaseAttribute1Id, this.selectedBaseAttribute2Id ).subscribe( res => {
        this.attribute3List = res.data.results;

        this.dependentAttributeList = res.data.results;
        console.log( 'att3list', this.attribute3List );

      } );

      if ( this.attribute2List[findIndex].attributeMasters.attributeNature == 'Formula' ) {
        for ( let i = 0; i < this.FormulaArray.length; i++ ) {
          this.baseAttributeValue2List.push( this.FormulaArray[i].formulaName );
        }
      }
      if ( this.attribute2List[findIndex].attributeMasters.attributeNature == 'List' ) {
        for ( let i = 0; i < this.attribute2List[findIndex].attributeMasters.options.length; i++ ) {
          this.baseAttributeValue2List.push( this.attribute2List[findIndex].attributeMasters.options[i].attributeOptionValue );
        }
      }
      if ( this.attribute2List[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix' ) {
        for ( let i = 0; i < this.SDMArray.length; i++ ) {
          this.baseAttributeValue2List.push( this.SDMArray[i].sdmSchemaName );
        }
      }
      if ( this.attribute2List[findIndex].attributeMasters.attributeNature == 'Head' ) {
        for ( let i = 0; i < this.allGlobalHeadList.length; i++ ) {
          this.baseAttributeValue2List.push( this.allGlobalHeadList[i].standardName );
        }
      }
      this.resetValueWhenBaseAttribute2Changed();
    }
  }
  onChangeBaseAttribute3( evt: any, code: string ) {
    if ( code == 'null' ) {
      this.dependentAttributeValueList = [];

    } else {
      let findIndex = this.attribute3List.findIndex( o => o.attributeMasters.code == code );
      this.selectedBaseAttribute3Id = this.attribute3List[findIndex].id;
      this.AttDepForm.get( 'attributeGroupId3' ).setValue( this.selectedBaseAttribute3Id );
      // this.AttDepForm.get( 'attribute3' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );

      this.baseAttributeValue3List = [];

      if ( this.attribute3List[findIndex].attributeMasters.attributeNature == 'Formula' ) {
        for ( let i = 0; i < this.FormulaArray.length; i++ ) {
          this.baseAttributeValue3List.push( this.FormulaArray[i].formulaName );
        }
      }
      if ( this.attribute3List[findIndex].attributeMasters.attributeNature == 'List' ) {

        for ( let i = 0; i < this.attribute3List[findIndex].attributeMasters.options.length; i++ ) {
          this.baseAttributeValue3List.push( this.attribute3List[findIndex].attributeMasters.options[i].attributeOptionValue );
        }
      }
      if ( this.attribute3List[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix' ) {
        for ( let i = 0; i < this.SDMArray.length; i++ ) {
          this.baseAttributeValue3List.push( this.SDMArray[i].sdmSchemaName );
        }
      }
      if ( this.attribute3List[findIndex].attributeMasters.attributeNature == 'Head' ) {
        for ( let i = 0; i < this.allGlobalHeadList.length; i++ ) {
          this.baseAttributeValue3List.push( this.allGlobalHeadList[i].standardName );
        }
      }
      this.companySettingService.getDerivedAttribute4( this.attributeGroupDefinitionId, this.selectedBaseAttribute1Id, this.selectedBaseAttribute2Id, this.selectedBaseAttribute3Id ).subscribe( res => {
        // this.baseAttributeValue1List = res.data.results;

        this.dependentAttributeList = res.data.results;
      } );
      this.resetValueWhenBaseAttribute3Changed();
    }
  }
  onChangeDependentAttribute( evt: any, code: string ) {
    if ( code == 'null' ) {
      this.baseAttributeValue1List = [];

    } else {
      let findIndex = this.dependentAttributeList.findIndex( o => o.attributeMasters.code == code );
      this.selectedBaseAttribute4Id = this.dependentAttributeList[findIndex].id;
      this.AttDepForm.get( 'attributeGroupId4' ).setValue( this.selectedBaseAttribute4Id );
      //  this.AttDepForm.get( 'derivedAttribute' ).setValue( evt.target.options[evt.target.options.selectedIndex].text );

      if ( evt == null ) {
        this.treatmentList = [];
        this.treatmentList = ['Hide'];
      } else {
        this.treatmentList = [];
        this.treatmentList = ['Default', 'Hide'];
      }
      this.dependentAttributeValueList = [];

      if ( this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'Formula' ) {
        for ( let i = 0; i < this.FormulaArray.length; i++ ) {
          this.dependentAttributeValueList.push( this.FormulaArray[i].formulaName );
        }
      }
      if ( this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'List' ) {

        for ( let i = 0; i < this.dependentAttributeList[findIndex].attributeMasters.options.length; i++ ) {
          this.dependentAttributeValueList.push( this.dependentAttributeList[findIndex].attributeMasters.options[i].attributeOptionValue );
        }
      }
      if ( this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'Source Destination Matrix' ) {
        for ( let i = 0; i < this.SDMArray.length; i++ ) {
          this.dependentAttributeValueList.push( this.SDMArray[i].sdmSchemaName );
        }
      }
      if ( this.dependentAttributeList[findIndex].attributeMasters.attributeNature == 'Head' ) {
        for ( let i = 0; i < this.allGlobalHeadList.length; i++ ) {
          this.dependentAttributeValueList.push( this.allGlobalHeadList[i].standardName );
        }
      }
    }
  }
  onChangeBaseAttributeValue1( evt: any, id: any ) { }
  onChangeBaseAttributeValue2( evt: any, id: any ) { }
  onChangeBaseAttributeValue3( evt: any, id: any ) { }
  onChangeDerivedAttributeValue( evt: any ) { }
  onChangeTreatment( event: any, id ) {
    // for getting id and itemdName object from dropdown
    // let s = event.target.options[event.target.options.selectedIndex].text;
    // console.log( s, id );
  }



  deactiveActiveCheckBox() {
    if ( this.AttDepForm.get( 'activeStatus' ).value === false ) {
      this.AttDepForm.get( 'remark' ).enable();

      this.AttDepForm.get( 'remark' ).setValidators( [Validators.required] );
      this.AttDepForm.get( 'remark' ).updateValueAndValidity();
    } else {
      this.AttDepForm.get( 'remark' ).clearValidators();
      this.AttDepForm.get( 'remark' ).updateValueAndValidity();
      this.AttDepForm.get( 'remark' ).disable();

    }

  }
  edit( payrollHeadGroupAttributeDependencyId: number, i: number, attributeGroupName: string ) {


    let index = this.AttributeSelectionList.findIndex( o => o.name == attributeGroupName );
    this.attributeGroupDefinitionId = this.AttributeSelectionList[index].id;

    // this.companySettingService.getAttributeGroupByGroupDefId( this.AttributeSelectionList[index].id ).subscribe( res => {
    //   this.attribute1List = res.data.results;
    //   this.dependentAttributeList = res.data.results;
    //   this.attribute1List = res.data.results;
    //   this.attribute2List = res.data.results;
    //   this.attribute3List = res.data.results;
    // } );



    this.companySettingService.getAttributeGroupByGroupDefId( this.AttributeSelectionList[index].id ).subscribe( res => {
      this.attribute1List = res.data.results;
      this.dependentAttributeList = res.data.results;
      this.attribute1List = res.data.results;
      this.attribute2List = res.data.results;
      this.attribute3List = res.data.results;
    }, ( error ) => {
      console.log( 'error', error );
    }, () => {
      this.isEditMode = true;
      this.viewCancelButton = true;
      this.viewUpdateButton = true;
      this.editedRecordId = payrollHeadGroupAttributeDependencyId;
      window.scrollTo( 0, 0 );
      this.AttDepForm.reset();

      // this.attribute2List = this.attribute1List;
      // this.attribute3List = this.attribute1List;
      // this.dependentAttributeList = this.attribute1List;
      this.baseAttributeValue1List.push( this.summary[i].value1 );
      this.baseAttributeValue2List.push( this.summary[i].value2 )
      this.baseAttributeValue3List.push( this.summary[i].value3 );
      this.dependentAttributeValueList.push( this.summary[i].derivedAttributeValue );
      console.log( 'summary', this.summary[i] );
      this.AttDepForm.patchValue( this.summary[i] );


      this.AttDepForm.get( 'value1' ).disable();
      this.AttDepForm.get( 'attribute2' ).disable();
      this.AttDepForm.get( 'value2' ).disable();
      this.AttDepForm.get( 'attribute3' ).disable();
      this.AttDepForm.get( 'value3' ).disable();
      this.AttDepForm.get( 'derivedAttribute' ).disable();
      this.AttDepForm.get( 'derivedAttributeValue' ).disable();
      this.AttDepForm.get( 'activeStatus' ).enable();
    } );






  }
  view( payrollHeadGroupAttributeDependencyId: number, i: number ) {
    this.viewCancelButton = true;
    this.isEditMode = false;
    window.scrollTo( 0, 0 );
    this.AttDepForm.reset();
    this.attribute2List = this.attribute1List;
    this.attribute3List = this.attribute1List;
    this.dependentAttributeList = this.attribute1List;
    this.baseAttributeValue1List.push( this.summary[i].value1 );
    this.baseAttributeValue2List.push( this.summary[i].value2 )
    this.baseAttributeValue3List.push( this.summary[i].value3 );
    this.dependentAttributeValueList.push( this.summary[i].derivedAttributeValue );
    this.AttDepForm.patchValue( this.summary[i] );
    this.AttDepForm.disable();
  }

  resetValueWhenAttributeGroupChanged() {
    this.AttDepForm.patchValue( {
      attribute1: null,
      value1: null,
      attribute2: null,
      value2: null,
      attribute3: null,
      value3: null,
      derivedAttribute: null,
      derivedAttributeValue: null,

    } );

  }
  resetValueWhenBaseAttribute1Changed() {

    this.AttDepForm.patchValue( {
      value1: null,
      attribute2: null,
      value2: null,
      attribute3: null,
      value3: null,
      derivedAttribute: null,
      derivedAttributeaction: null,
    } );
  }
  resetValueWhenBaseAttribute2Changed() {
    this.AttDepForm.patchValue( {
      value2: null,
      attribute3: null,
      value3: null,
      derivedAttribute: null,
      derivedAttributeValue: null,

    } );
  }
  resetValueWhenBaseAttribute3Changed() {
    this.AttDepForm.patchValue( {
      value3: null,
      derivedAttribute: null,
      derivedAttributeValue: null,

    } );
  }
  onChangeAttributeGroup( id: any ) {
    this.attributeGroupDefinitionId = id;

    this.getAllAttributeGroupList( id );
  }
  getAllAttributeGroupList( id: number ) {

    this.companySettingService.getAttributeGroupByGroupDefId( id ).subscribe( res => {
      this.attribute1List = res.data.results;

      this.dependentAttributeList = res.data.results;
    } );
  }
  // forEditGetAllAttributeGroupList( id: number ) {

  //   this.companySettingService.getAttributeGroupByGroupDefId( id ).subscribe( res => {
  //     this.attribute1List = res.data.results;
  //     this.attribute2List = res.data.results;
  //     this.attribute3List = res.data.results;

  //     this.dependentAttributeList = res.data.results;
  //   } );
  // }
  // getAttribute1() {
  //   this.attribute1List = [];
  //   this.companySettingService.getGlobalAttribute1().subscribe( res => {
  //     this.attribute1List = res.data.results;
  //   } );
  // }
}
