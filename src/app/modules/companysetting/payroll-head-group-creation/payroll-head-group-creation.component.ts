import { element } from 'protractor';
import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AlertServiceService } from '../../../../app/core/services/alert-service.service';

import { ShortenStringPipe } from './../../../core/utility/pipes/shorten-string.pipe';



import { HeadDetailPHG, SaveAttributeAssignmentNewAssignment, SavePHGGlobal } from '../model/business-cycle-model';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

export class headDetail {
  headMasterId: number;
}


@Component( {
  selector: 'app-payroll-head-group-creation',
  templateUrl: './payroll-head-group-creation.component.html',
  styleUrls: ['./payroll-head-group-creation.component.scss'],
  styles: [`
        .outofstock {
          background-color: #ddd!important;
          color: #000!important;
          font-weight: 500;
        } `
  ],
  encapsulation: ViewEncapsulation.None
} )
export class PayrollHeadGroupCreationComponent implements OnInit {
  public codeInvalid : boolean = false;
  applicableList = [{ id: 'true', itemName: 'Yes' }, { id: 'false', itemName: 'No' }];
  selectedSummarySourceProducts = [];
  clickedOnSave: boolean = false;
  disabled1 = false;
  sortedFrequencyList = [];
  activeFrequencyList = [];
  globalHeadGroupId: number = 0;
  disabled: boolean = true;
  tempFromDate = '';
  tempToDate = '';
  savedHeadNameList = [];
  originalSavedHeadNameList = [];
  selectedHeadGroupIds: number;
  viewSaveAndNextButton: boolean = false;
  viewNextButton: boolean = false;
  viewPrevButton: boolean = false;
  hideCopyFrom: boolean = false;
  originalHeadNameList = [];
  notSavedHeadList = []
  notOrigianlSavedHeadList = [];
  headNameIndex = 0;
  isUpdateMode = false;
  headNameSize = 0;
  allGlobalHeadList = [];
  public selectedCopyToList = [];
  deletedHeadGroupDefinitionId: number;
  rowNumberToDelete: number;
  payrollHeadGroupCreationForm: FormGroup;
  form: FormGroup;
  attributeGroupList: Array<any> = [];
  PayrollHeadGroupList: Array<any> = [];
  originalPayrollHeadGroupList: Array<any> = [];
  PHGName: string;
  public beforeSavePHGName1 = '';
  AttGrpName: string;
  HeadName: string;
  Nature: string;
  headGroupDefinitionId: number;
  sourceProducts: Array<any> = [];
  targetProducts: Array<any> = [];
  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];
  values: Array<any> = [];
  AttributeSelectionArray = [];
  headGroupIdList = [];
  attributeGroupId: number;
  headMasterId: number;
  viewCancelButton: boolean = false;
  viewupdateButton: boolean = false;
  dropdownSettings = {};
  dropdownList = [];
  fromDate: string;
  toDate: string;
  headGroupIdforattributeList: number;
  HeadNameList: Array<any> = [];
  OrigianHeadNameList: Array<any> = [];
  selectedheadName: Array<any> = [];
  headName: string;
  FormulaArray: Array<any> = [];
  SDMArray: Array<any> = [];
  viewSaveButton: boolean = false;
  minDate1: Date;
  NewTargetArray: Array<any> = [];
  HighlightRow: any;
  HighlightRight: any;
  originalSourceProductList = [];
  multiSelectDropDownData = [];
  attributeNature: any;

  constructor(
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private companySettingsService: CompanySettingsService,
    private alertService: AlertServiceService,
    private shortenString: ShortenStringPipe,
  ) { }

  modalRef: BsModalRef;
  modalRef1: BsModalRef;
  modalRef2: BsModalRef;
  deleteModalRef: BsModalRef;
  deleteRowModal1: BsModalRef;


  ngOnInit(): void {
    this.getAllAttributeSelection();
    this.getAllPayrollHeadGroup();
    this.getAllHeadCreation();
    this.getAllFormulaList();
    this.getAllSDMList();
    this.getActiveFrequency();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'headGroupIds',
      textField: 'standardName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };


    this.payrollHeadGroupCreationForm = this.formBuilder.group( {
      attributeGroupDefinitionId: new FormControl( null, ),
      headGroupDefinitionName: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      attributeNature: new FormControl( '', Validators.required ),
      copyTo: new FormControl( '' ),
      attributeGroupId : new FormControl( '' )
    } );

    this.form = this.formBuilder.group( {
      pfFormArray: new FormArray( [] ),
      pfFormArray1: new FormArray( [] ),
    } );
  }

  onItemSelect( item: any ) {
    console.log( item );
    console.log( this.multiSelectDropDownData );
    // this.multiSelectDropDownData.push( item )
  }
  onItemDeSelect( item: any ) {

    console.log( item );
    var index = this.multiSelectDropDownData.findIndex( o => o.headGroupIds == item.headGroupIds );
    console.log( 'ind', index );
    if ( index > -1 ) {
      this.multiSelectDropDownData.splice( index, 1 )
    }
    console.log( this.multiSelectDropDownData )
  }

  onSelectAll( items: any ) {
    this.multiSelectDropDownData = [];

    items.forEach( element => {
      this.multiSelectDropDownData.push( element )
    } );
    console.log( this.multiSelectDropDownData );
  }
  onDeSelectAll() {
    this.multiSelectDropDownData = [];
    console.log( this.multiSelectDropDownData );
  }



  onCloseTemplate1244() {
    console.log( 'onCloseTemplate1244' );
    this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.selectedCopyToList = [];
    this.multiSelectDropDownData = [];
  }




  // get All Attribute Selection(Attribute Group)
  getAllAttributeSelection(): void {
    this.companySettingsService.getAllAttributeSelectionByGlobal().subscribe( res => {
      this.attributeGroupList = res.data.results;
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }
  // get All Head List
  getAllPayrollHeadGroup(): void {
    this.companySettingsService.getAllPayrollHeadGroupAtGlobal().subscribe( res => {
      this.originalPayrollHeadGroupList = res.data.results;
      this.PayrollHeadGroupList = res.data.results;
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }

// Get  Formula API
  getAllFormulaList(): void {
    this.companySettingsService.getFromulaForFormulaMaster().subscribe( res => {
      this.FormulaArray = res.data.results;
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }

  getAllSDMList(): void {
    this.companySettingsService.getSDMFormula().subscribe( res => {
      this.SDMArray = res.data.results;
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }

  getAllHeadCreation(): void {
    this.companySettingsService.getAllHeadCreation().subscribe( res => {
      this.dropdownList = res.data.results;
      this.sourceProducts = res.data.results;
      this.originalSourceProductList = res.data.results;
      this.allGlobalHeadList = res.data.results;
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }

  GetPHGByIdDisable( headGroupDefinitionId ): void {
    window.scrollTo( 0, 0 );
    this.savedHeadNameList = [];
    this.notSavedHeadList = [];
    this.notOrigianlSavedHeadList = [];
    this.originalSavedHeadNameList = []
    this.hideCopyFrom = true;
    this.NewTargetArray = [];
    console.log( 'GetPHGByIdDisable', headGroupDefinitionId );
    this.viewCancelButton = true;
    this.viewupdateButton = true;
    this.headGroupDefinitionId = headGroupDefinitionId;
    this.targetProducts = [];  //added new
    this.sourceProducts = this.originalSourceProductList;
    this.HeadNameList = [];
    this.originalHeadNameList = [];
    this.companySettingsService.getPHGByIdGlobal( headGroupDefinitionId )
      .subscribe( response => {
        console.log( 'edit', response );
        response.data.results[0].headMasters.forEach( ( element, index ) => {
          element.headGroupIds = response.data.results[0].headGroupIds[index];
          if ( response.data.results[0].moonNumbers[index] == 100 ) {
            element.red = true;
            this.notSavedHeadList.push( element );
            this.notOrigianlSavedHeadList.push( element )
          }
          if ( response.data.results[0].moonNumbers[index] == 0 ) {
            element.red = true;
            this.savedHeadNameList.push( element );
            this.originalSavedHeadNameList.push( element );
          }
          if ( response.data.results[0].moonNumbers[index] == 1 ) {
            element.green = true;
            this.savedHeadNameList.push( element );
            this.originalSavedHeadNameList.push( element );
          }
          if ( response.data.results[0].moonNumbers[index] == 2 ) {
            element.blue = true;
            this.savedHeadNameList.push( element );
            this.originalSavedHeadNameList.push( element );
          }
          this.NewTargetArray.push( element );
          this.targetProducts.push( element );
          this.sourceProducts = this.sourceProducts.filter( e => e.headMasterId !== element.headMasterId );
        } );
        this.headNameSize = response.data.results[0].moonNumbers.length;
        this.payrollHeadGroupCreationForm.patchValue( { headGroupDefinitionName: response.data.results[0].headGroupDefinitionName } );
        this.payrollHeadGroupCreationForm.patchValue( { description: response.data.results[0].description } );
        this.payrollHeadGroupCreationForm.patchValue( { attributeNature: response.data.results[0].attributeGroupName } );
        this.beforeSavePHGName1 = response.data.results[0].headGroupDefinitionName;
        this.AttGrpName = response.data.results[0].attributeGroupName;

        if ( this.notSavedHeadList.length == 0 ) {
          this.HeadNameList = [];
          //  this.sss = [];
          this.HeadNameList.forEach( ( element, index ) => {
            this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== response.data.results[0].headGroupIds[index] );
          } );
        }


        this.notOrigianlSavedHeadList = this.notOrigianlSavedHeadList.filter( e => e.headGroupIds !== this.selectedHeadGroupIds );

        // this.dropdownList = this.notOrigianlSavedHeadList;
        console.log( 'notOrigianlSavedHeadList', this.notOrigianlSavedHeadList );
        //  this.dropdownList = this.HeadNameList;
        console.log( 'hed', this.HeadNameList );
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    // this.getAllHeadCreation();
  }

  DeletePayrollHeadGroup(): void {
    this.companySettingsService.DeletePayrollHeadGroupGlobal( this.deletedHeadGroupDefinitionId )
      .subscribe( response => {

        this.alertService.sweetalertMasterSuccess( response.status.message, '' )
        this.getAllPayrollHeadGroup();
        this.payrollHeadGroupCreationForm.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
  }

  onChangeHeadGroupDefinitionName( event: any ): void {

    this.beforeSavePHGName1 = event.target.value;
  }
  onChangeAttributeGroupDropDown( event ) {
   const toSelect = this.attributeGroupList.find(element => element.name == this.payrollHeadGroupCreationForm.get('attributeNature').value);
   this.attributeNature = toSelect.name;
   this.attributeGroupId = toSelect.id;
   this.payrollHeadGroupCreationForm.get('attributeGroupId').setValue(toSelect.id);
     //  this.payrollHeadGroupCreationForm.get('name').setValue(toSelect.name);
  //    this.payrollHeadGroupCreationForm.get('id').setValue(toSelect.id);
  //  this.AttGrpName = event.target.value;
    // this.attributeGroupId = event.target.value;
    console.log( this.AttGrpName );
    console.log( this.attributeGroupId );
  }
  RowSelected( u: any, ind: number ) {
    this.HighlightRow = ind;
    console.log( 'in row selected ', u );

    let temp = this.sourceProducts;
    this.sourceProducts = new Array();
    let index = this.selectedUser.findIndex( o => o.headMasterId == u.headMasterId );
    let isContain = this.selectedUser.some( o => o.headMasterId == u.headMasterId );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.selectedUser.splice( index, 1 );
    } else {
      this.selectedUser.push( u );
    }



    this.sourceProducts = temp;

    this.sourceProducts.forEach( ( element, i ) => {
      if ( i == this.HighlightRow ) {
        element.isHighlightright = false;
        if ( isContain == true ) {
          element.isHighlight = false
        }
        else {
          if ( i == this.HighlightRow ) {
            element.isHighlight = true
          }
        }
      }
    } );
  }
  lefttablePusg(): void {

    this.selectedUser.forEach( element => {
      element.isHighlight = false;
      element.isHighlightright = false;
      this.targetProducts.push( element );
    } );

    var v = this.selectedUser;

    this.selectedUser.forEach( element => {
      var index = this.sourceProducts.indexOf( element )
      this.selectedUser = [];
      if ( index > -1 ) {
        this.sourceProducts.splice( index, 1 )
      }
    } );
  }
  onlyChangeTableData( headGroupIds ) {

    this.companySettingsService.getByPayrollHeadGroupIdAllRecords( headGroupIds ).subscribe( ( res ) => {
      console.log( JSON.stringify( res ) );
      for ( let i = 0; i < res.data.results[0].length; i++ ) {
        //   console.log( 'cccc', res.data.results[0][i].attributeMaster[0].options );

        if ( res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0 ) {

          this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description, i );

        } else {
          for ( let j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++ ) {
            if ( j == 0 ) {
              this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );

            } else {
              console.log( 'cccc', res.data.results[0][i].attributeMaster[0].options );
              this.addPfArrayWithExistingValues( true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );
              //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
            }
          }
        }
      }
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );

  }
  onSelectAttributeAssignmentWithMultipleParameter( headGroupIds: number ) {

    this.companySettingsService.getByPayrollHeadGroupIdAllRecords( headGroupIds ).subscribe( ( res ) => {
      console.log( JSON.stringify( res ) );
      for ( let i = 0; i < res.data.results[0].length; i++ ) {
        console.log( 'globalPayrollHeadGroupId', res.data.results[0][i].globalPayrollHeadGroupId );
        console.log( 'cccc', res.data.results[0][i].attributeMaster[0].options );

        if ( res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0 ) {

          this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description, i );

        } else {
          for ( let j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++ ) {

            // if ( j == 0 ) {
            //   console.log( 'cc2', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId );
            //   this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].optionList, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );

            // } else {
            //   console.log( 'cc2', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId );
            //   this.addPfArrayWithExistingValues( true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
            //   //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
            // }
            if ( j == 0 ) {
              console.log( 'epayrollHeadGroupAttributeValueMappingIde', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
              this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );

            } else {
              console.log( 'epayrollHeadGroupAttributeValueMappingIde', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
              this.addPfArrayWithExistingValues( true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].globalPayrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );
              //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
            }

          }
        }
        if ( i == 0 ) {
          console.log( 'in i ', res.data.results[0][i].headMaster.headMasterId, res.data.results[0][i].headMaster.standardName, res.data.results[0][i].headMaster.headNature );
          this.headMasterId = res.data.results[0][i].headMaster.headMasterId;
          this.HeadName = res.data.results[0][i].headMaster.standardName;
          this.selectedHeadGroupIds = headGroupIds;
          this.Nature = res.data.results[0][i].headMaster.headNature;
        }
      }


    }, ( error ) => {
      if ( error.status == 400 ) {
        // this.alertService.sweetalertError( error["error"]["status"]["message"] );
        this.getAllAttributeListByAttGroup( headGroupIds );
        // this.getAllAttributeListByAttGroup( u.headGroupIds );
        this.viewSaveButton = true;
      } else {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }

    }, () => {
      this.viewSaveButton = false;
    } );

    this.selectedHeadGroupIds = headGroupIds;
    console.log( 'in if', this.targetProducts );
    this.HeadNameList = this.originalHeadNameList;

    this.HeadNameList.forEach( element => {
      this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== headGroupIds );
    } );
  }



  // tslint:disable-next-line: typedef
  onSelectAttributeAssignment( u: any ) {
    this.notOrigianlSavedHeadList = this.notSavedHeadList;
    //  this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == u.headGroupIds );
    console.log( u );
    this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == u.headGroupIds );
    this.selectedCopyToList = [];
    this.multiSelectDropDownData = [];
    let index = this.targetProducts.findIndex( o => o.headGroupIds == u.headGroupIds );
    this.headNameIndex = index;

    this.companySettingsService.getByPayrollHeadGroupIdAllRecords( u.headGroupIds ).subscribe( ( res ) => {
      let data = res.data.results[0];
      for ( let i = 0; i < res.data.results[0].length; i++ ) {
        // console.log( 'globalPayrollHeadGroupId', res.data.results[0][i].globalPayrollHeadGroupId );
        // console.log( 'value', res.data.results[0][i].value );
        if ( res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0 ) {
          this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description, i );
        }
        if ( res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length !== 0 ) {
          for ( let j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++ ) {
            // console.log( 'cc1', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
            // console.log( 'cc2', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[0].payrollHeadGroupAttributeValueMappingId );
            if ( j == 0 ) {
              this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );
              //    applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number, description: string, i: number
            } else {
              this.addPfArrayWithExistingValues( true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );
              // applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number, description: string, i: number
            }
          }
        }
      }
      this.viewSaveButton = false;
    }, ( error ) => {
      if ( error.status == 400 ) {
        // this.alertService.sweetalertError( error["error"]["status"]["message"] );
        this.getAllAttributeListByAttGroup( u.headGroupIds );
        this.viewSaveButton = true;
      } else {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }

    } );

    this.selectedHeadGroupIds = u.headGroupIds;
    this.HeadNameList = this.originalHeadNameList;

    this.HeadNameList.forEach( element => {
      this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== u.headGroupIds );
    } );

    this.savedHeadNameList = this.originalSavedHeadNameList;
    this.savedHeadNameList.forEach( element => {
      this.savedHeadNameList = this.savedHeadNameList.filter( e => e.headGroupIds !== u.headGroupIds );
    } );
    this.notOrigianlSavedHeadList.forEach( element => {
      this.notOrigianlSavedHeadList = this.notOrigianlSavedHeadList.filter( e => e.headGroupIds !== u.headGroupIds );
    } );


    this.dropdownList = this.HeadNameList;
    this.headMasterId = u.headMasterId;
    this.HeadName = u.standardName;
    this.Nature = u.headNature;

  }

  onlySelectedHeadGroupIds( headGroupIds: number ) {
    console.log( 'called me' );
    this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == headGroupIds );
    this.selectedCopyToList = [];
    this.multiSelectDropDownData = [];
    this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == headGroupIds );

    this.companySettingsService.getByPayrollHeadGroupIdAllRecords( headGroupIds ).subscribe( ( res ) => {
      console.log( 'imp', res );
      let data = res.data.results[0];
      for ( let i = 0; i < data.length; i++ ) {
        console.log( 'cccc', data[i].attributeMaster[0].options );

        if ( data[i].payrollHeadGroupAttributeValueMapping.length == 0 ) {
          this.addPfArrayWithExistingValues( data[i].applicable, data[i].attributeMaster[0].attributeNature, data[i].attributeMaster[0].code, data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, data[i].attributeMaster[0].options, data[i].value, data[i].fromDate, data[i].toDate, '', '', '', '', false, data[i].globalPayrollHeadGroupId, 0, data[i].attributeMaster[0].description, i );

        }
        if ( data[i].payrollHeadGroupAttributeValueMapping.length !== 0 ) {
          for ( let j = 0; j < data[i].payrollHeadGroupAttributeValueMapping.length; j++ ) {
            if ( j == 0 ) {
              this.addPfArrayWithExistingValues( res.data.results[0][i].applicable, data[i].attributeMaster[0].attributeNature, data[i].attributeMaster[0].code, data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, data[i].attributeMaster[0].options, data[i].value, data[i].fromDate, data[i].toDate, data[i].payrollHeadGroupAttributeValueMapping[j].value1, data[i].payrollHeadGroupAttributeValueMapping[j].value2, data[i].payrollHeadGroupAttributeValueMapping[j].value3, data[i].payrollHeadGroupAttributeValueMapping[j].value4, true, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );

            } else {
              this.addPfArrayWithExistingValues( true, 'Range Value No Of Instances Per Period', '', data[i].attributeMaster[0].attributeMasterId, data[i].globalAttributeGroupId, null, 'Range', data[i].payrollHeadGroupAttributeValueMapping[j].fromDate, data[i].payrollHeadGroupAttributeValueMapping[j].toDate, data[i].payrollHeadGroupAttributeValueMapping[j].value1, data[i].payrollHeadGroupAttributeValueMapping[j].value2, data[i].payrollHeadGroupAttributeValueMapping[j].value3, data[i].payrollHeadGroupAttributeValueMapping[j].value4, false, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupId, data[i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description, i );
            }
          }
        }
      }
    }, ( error ) => {
      if ( error.status == 404 ) {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
        this.getAllAttributeListByAttGroup( headGroupIds );
        this.viewSaveButton = true;
      } else {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }

    } );

    this.selectedHeadGroupIds = headGroupIds;
    this.HeadNameList = this.originalHeadNameList;

    this.HeadNameList.forEach( element => {
      this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== headGroupIds );
    } );

    this.savedHeadNameList = this.originalSavedHeadNameList;

    this.savedHeadNameList.forEach( element => {
      this.savedHeadNameList = this.savedHeadNameList.filter( e => e.headGroupIds !== headGroupIds );
    } );


    this.dropdownList = this.HeadNameList;

    this.headMasterId = this.targetProducts[this.headNameIndex].headMasterId;
    this.HeadName = this.targetProducts[this.headNameIndex].standardName;
    this.Nature = this.targetProducts[this.headNameIndex].headNature;

  }



  RowSelectedtargetProducts( u: any, i: number ): void {
    console.log( u );
    if ( u.disabled == true ) {

    } else {

      this.HighlightRight = i;
      let indexOfTargetProd = this.targetProducts.findIndex( o => o.headMasterId == u.headMasterId );
      let index = this.selectedUser2.findIndex( o => o.headMasterId == u.headMasterId );
      let isContain = this.selectedUser2.some( o => o.headMasterId == u.headMasterId );
      console.log( isContain, index );
      if ( isContain == true ) {
        this.targetProducts[indexOfTargetProd].isHighlightright = false;
        this.selectedUser2.splice( index, 1 );
        this.selectedheadName.splice( index, 1 );
      } else {
        this.targetProducts[indexOfTargetProd].isHighlightright = true;
        this.selectedUser2.push( u );
        this.selectedheadName.push( u );
      }
    }

  }


  righttablePusg(): void {
    console.log( 'righttablePusg' );

    this.selectedUser2.forEach( element => {
      element.isHighlight = false;
      element.isHighlightright = false;
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
  }


  // UpdatePHGById(): void {


  //   const addAttributeCreation: SavePHGGlobal = Object.assign( {} );
  //   addAttributeCreation.headMasters = [];
  //   this.NewTargetArray.forEach( element => {
  //     var index = this.targetProducts.indexOf( element )
  //     this.targetProducts = this.targetProducts.filter( e => e.headMasterId !== element.headMasterId );
  //   } );
  //   console.log( this.targetProducts );


  //   this.targetProducts.forEach( function ( f ) {
  //     const headDetail: HeadDetailPHG = Object.assign( {} );
  //     headDetail.headMasterId = f.headMasterId;
  //     addAttributeCreation.headMasters.push( headDetail );
  //   } );
  //   addAttributeCreation.globalHeadGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
  //   addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
  //   addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
  //   if ( addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0 ) {
  //     console.log( JSON.stringify( addAttributeCreation ) );

  //     this.companySettingsService.UpdatePHGByIdGlobal( this.headGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {
  //       console.log( 'UpdatePHGByIdGlobal', res );

  //       addAttributeCreation.headMasters = [];
  //       this.targetProducts = [];
  //       this.viewCancelButton = false;
  //       this.viewupdateButton = false;
  //       this.alertService.sweetalertMasterSuccess( res.status.message, '' );
  //       this.getAllPayrollHeadGroup();
  //       // this.hidevalue = false;
  //       this.payrollHeadGroupCreationForm.reset();

  //     },
  //       ( error: any ) => {
  //         this.alertService.sweetalertError( error["error"]["status"]["message"] );
  //       } );
  //   }
  // }

  copyFrommPayrollHeadGroup( event ): void {

    console.log( event.target.value );
    if ( this.pfArray.controls.length !== 0 ) {
      for ( let i = 0; i < this.pfArray.length; i++ ) {
        this.pfArray.removeAt( i );
      }
    }
    this.form = this.formBuilder.group( {
      pfFormArray: new FormArray( [] ),
    } );

    if ( event.target.value == '' ) {
      this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == this.selectedHeadGroupIds );
      this.onlySelectedHeadGroupIds( this.selectedHeadGroupIds );
    } else {
      this.headNameIndex = this.targetProducts.findIndex( o => o.headGroupIds == event.target.value );
      this.globalHeadGroupId = event.target.value;
      this.onlyChangeTableData( event.target.value );
    }
  }


  getAllAttributeListByAttGroup( headGroupIds: number ) {


    console.log( 'in getAllAttributeListByAttGroup attGrpName', this.AttGrpName );
    // this.AttGroupList = [];
    this.companySettingsService.GetHeadGroupByGetGlobalPHGByNameWithHeadId( this.AttGrpName, headGroupIds ).subscribe( res => {

      //    this.AttGroupList = res.data.results[0].attributeMasters;
      res.data.results[0].attributeMasters.forEach( ( element, index ) => {
        console.log( 'check obj', res.data.results[0].attributeMasters );
        element.attributeGroupIds = res.data.results[0].attributeGroupIds[index];
        console.log( 'cccccccccccc', res.data.results[0].attributeGroupIds[index].code )
        console.log( element );
        // if ( res.data.results[0].attributeGroupIds[index].code == undefined ) {
        //   element.res.data.results[0].attributeGroupIds[index].code = '';
        // }
        this.addPfArray( element, index );
      } );

    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );
  }


  saveAtttibuteAssign1() {
    console.log( 'empty function' );
  }
  onChangeToDate( event, i ) { }
  onChangeFromDate( event, i ) {
    // if ( this.isUpdateMode == false ) {
    //   this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( null );
    //   if ( this.datePipe.transform( this.f.pfFormArray.value[i].fromDate, 'yyyy-MM-dd' ) != undefined ) {

    //     this.form.get( 'pfFormArray' )['controls'][i].controls['minDate1'].setValue( new Date( this.f.pfFormArray.value[i].fromDate ) );
    //   }
    // }

  }
  onChangeRangeFrom( evt: any, i: number ) {
    console.log( this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].value );

  }
  onChangeRangeTo( evt: any, i: number ) {
    console.log( this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].value );
    if ( ( this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].value ) > ( this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].value ) ) {
      console.log( 'err' );
    } else {
      this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].setValue( null );
    }

  }
  OntoDateChange( event ): void {

    this.fromDate = this.datePipe.transform( event, 'yyyy-MM-dd' );
    this.minDate1 = event;
    // this.AttGroupList.forEach( element => {
    //   element.fromDate = this.fromDate;
    // } );
  }

  OntoDateChangeEvent( event ): void {

    this.toDate = this.datePipe.transform( event, 'yyyy-MM-dd' );
    // this.AttGroupList.forEach( element => {
    //   element.toDate = this.toDate;
    // } );
  }



  //add Payroll HeadGroup
  addPayrollHeadGroup(): void {
    console.log( 'addPayrollHeadGroup' );

    const addAttributeCreation: SavePHGGlobal = Object.assign( {} );
    console.log( JSON.stringify( addAttributeCreation ) );
    addAttributeCreation.headMasters = [];
    this.targetProducts.forEach( function ( f ) {
      const headDetail: headDetail = Object.assign( {} );
      headDetail.headMasterId = f.headMasterId;
      addAttributeCreation.headMasters.push( headDetail );
    } );
    addAttributeCreation.globalHeadGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
    addAttributeCreation.attributeGroupId = this.payrollHeadGroupCreationForm.value.attributeGroupId;
    addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
    addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
    addAttributeCreation.countryId = 1;
    addAttributeCreation.createdBy = 'Nisha';
    addAttributeCreation.isActive = true;
    console.log( JSON.stringify( addAttributeCreation ) );
    if ( this.viewupdateButton == false ) {
//Post by Anant
      this.companySettingsService.AddPayrollHeadGroupAtGlobal( addAttributeCreation ).subscribe( ( res: any ) => {
        console.log( res.data.results[0].headGroupDefinitionId );
        addAttributeCreation.headMasters = [];
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllPayrollHeadGroup();
        this.hideCopyFrom = true;
        this.GetPHGByIdDisable( res.data.results[0].headGroupDefinitionId );
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
    else {
      addAttributeCreation.headGroupDefinitionId = this.headGroupDefinitionId;
      console.log( 'in put method' );
      console.log( addAttributeCreation.headGroupDefinitionId );
      console.log( JSON.stringify( addAttributeCreation ) );
      this.companySettingsService.UpdatePayrollHeadGroupAtGlobal( addAttributeCreation.headGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.headMasters = [];
        //  this.targetProducts = [];
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllPayrollHeadGroup();
        this.GetPHGByIdDisable( this.headGroupDefinitionId );
        //   this.getAllHeadCreation();
        // this.payrollHeadGroupCreationForm.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }


  onChangeCopyFromPHG_Name( phgName: any ): void {
    this.sourceProducts = [];
    this.sourceProducts = this.originalSourceProductList;
    if ( phgName == '' ) {
      this.targetProducts = [];
    } else {
      this.NewTargetArray = [];
      this.targetProducts = [];
      this.OrigianHeadNameList = [];

      this.companySettingsService.GetAttributeOptionListByGlobal( phgName ).subscribe( res => {
        console.log( 'onChangeCopyFromPHG_Name function ', res )

        res.data.results[0].headMasters.forEach( ( element, index ) => {
          element.headGroupIds = res.data.results[0].headGroupIds[index];
          element.disabled = true;
          this.sourceProducts = this.sourceProducts.filter( e => e.headMasterId !== element.headMasterId );
          this.NewTargetArray.push( element );
          this.targetProducts.push( element );
          this.OrigianHeadNameList.push( element );
        } );
        this.headNameSize = this.HeadNameList.length;
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

      this.targetProducts.forEach( element => {
        this.sourceProducts = this.sourceProducts.filter( e => e.headMasterId !== element.headMasterId );
      } );
    }
  }



  addPfArrayWithHistoryValues( applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number, description: string ) {
    console.log( 'value4', value4 );

    if ( attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period' ) {

      this.pfArray1.push( this.formBuilder.group( {

        Applicability: ['false'],
        value: ['Range'],
        value1: [value1, Validators.required],
        value2: [value2, Validators.required],
        value3: [value3, Validators.required],
        value4: [value4, Validators.required],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: [true],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        description: [description],
        sortedFrequencyList: [this.sortedFrequencyList],


        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
      } ) );
      if ( !isPlusSignVisible ) {
        this.form.get( 'pfFormArray1' )['controls'][this.pfArray1.length - 1].controls['Applicability'].disable();
        this.form.get( 'pfFormArray1' )['controls'][this.pfArray1.length - 1].controls['fromDate'].disable();
        this.form.get( 'pfFormArray1' )['controls'][this.pfArray1.length - 1].controls['toDate'].disable();
      }


    }
    else if ( attributeNature == 'Range Value Per Instance' ) {
      this.pfArray1.push( this.formBuilder.group( {

        Applicability: ['false'],
        value: ['Range'], // not a range
        value1: [value1, Validators.required],
        value2: [value2, Validators.required],
        value3: [null],
        value4: [null],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: [false],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
        description: [description],
        sortedFrequencyList: [this.sortedFrequencyList],

      } ) );

    } else {
      this.pfArray1.push( this.formBuilder.group( {

        Applicability: [applicable],
        value: [value],
        value1: [value1],
        value2: [value2],
        value3: [value3],
        value4: [value4],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: [isPlusSignVisible],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
        description: [description],
        sortedFrequencyList: [this.sortedFrequencyList],

      } ) );
    }

  }

  addPfArrayWithExistingValues( applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: [], value: string, fromDate: Date, toDate: Date, value1: string, value2: string, value3: string, value4: string, isPlusSignVisible: boolean, globalPayrollHeadGroupId: number, payrollHeadGroupAttributeValueMappingId: number, description: string, i: number ) {
    console.log( 'applicable   applicable applicable', applicable );
    console.log( 'applicable   applicable applicable', applicable );

    if ( attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period' ) {

      this.pfArray.push( this.formBuilder.group( {

        Applicability: [applicable],
        value: ['Range'],
        value1: [value1, Validators.required],
        value2: [value2, Validators.required],
        value3: [value3, Validators.required],
        value4: [value4, Validators.required],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: [isPlusSignVisible],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
        description: [description],
        sortedFrequencyList: [this.sortedFrequencyList],

      } ) );
      if ( !isPlusSignVisible ) {
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['Applicability'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['toDate'].disable();

        //   this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( 'false' );
      } else {
        // this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( 'true' );

      }


    }
    else if ( attributeNature == 'Range Value Per Instance' ) {
      this.pfArray.push( this.formBuilder.group( {

        Applicability: [applicable],
        value: ['Range'], // not a range
        value1: [value1, Validators.required],
        value2: [value2, Validators.required],
        value3: [value3],
        value4: [value4],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: ['false'],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
        description: [description],
        sortedFrequencyList: [this.sortedFrequencyList],

      } ) );
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();


    } else if ( attributeNature == 'Per Employee Input' ) {

      this.pfArray.push( this.formBuilder.group( {

        Applicability: [applicable],
        value: [''],
        value1: [''],
        value2: [''],
        value3: [''],
        value4: [''],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: [false],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
        description: [description],
        sortedFrequencyList: [null],
      } ) );
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();
    }

    else {
      this.pfArray.push( this.formBuilder.group( {

        Applicability: [applicable],
        value: [value, Validators.required],
        value1: [value1],
        value2: [value2],
        value3: [value3],
        value4: [value4],
        code: [code],
        attributeNature: [attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: [fromDate == null ? '' : new Date( fromDate ), Validators.required],
        toDate: [toDate == null ? '' : new Date( toDate ), Validators.required],
        options: [options],
        isPlusSignVisible: [isPlusSignVisible],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [attributeGroupIds],
        minDate1: [fromDate == null ? '' : new Date( fromDate )],
        globalPayrollHeadGroupId: [globalPayrollHeadGroupId],
        payrollHeadGroupAttributeValueMappingId: [payrollHeadGroupAttributeValueMappingId],
        description: [description],
        sortedFrequencyList: [this.sortedFrequencyList],

      } ) );
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value1'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value2'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();

    }


    // if ( this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['Applicability'].value == false ) {
    //   console.log( 'applicable', applicable );
    //console.log( '*******************', attributeNature, this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['Applicability'].value );

    if ( attributeNature == 'Range Value No Of Instances Per Period' || attributeNature == 'Range Value Per Period' ) {
      if ( applicable == false ) {
        //  this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( false );
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['toDate'].disable();

        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value1'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value2'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();
      } else {
        //  this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( isPlusSignVisible );
      }

    } else if ( attributeNature == 'Range Value Per Instance' ) {

      if ( applicable == false ) {
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['toDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value1'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value2'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();

      } else {

      }

    } else if ( attributeNature == 'Per Employee Input' ) {
      if ( applicable == false ) {

        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['toDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value1'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value2'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();
      } else {

      }

    } else {
      if ( applicable == false ) {
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['toDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value1'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value2'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
        this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();

      }
      console.log( 'calling  onChangeApplicability()', applicable );
      // this.onChangeApplicability( applicable.toString(), i );
    }
  }
  // this. function will be called at 404 error block..
  addPfArray( ele: any, index: number ) {
    console.log( 'code code code ', ele.code );
    console.log( 'attribute nature', ele.attributeNature );
    if ( ele.attributeNature == 'Range Value No Of Instances Per Period' || ele.attributeNature == 'Range Value Per Period' ) {

      this.pfArray.push( this.formBuilder.group( {

        Applicability: [false],
        value: ['Range'],
        value1: ['1', Validators.required],
        value2: ['', Validators.required],
        value3: ['', Validators.required],
        value4: ['', Validators.required],
        code: [ele.code],
        attributeNature: [ele.attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: ['', Validators.required],
        toDate: [new Date( '31-Dec-9999' ), Validators.required],
        options: [ele.options],
        isPlusSignVisible: [true],
        attributeMasterId: [ele.attributeMasterId],
        attributeMasterId1: [ele.attributeMasterId],
        attributeGroupIds: [ele.attributeGroupIds],
        minDate1: [''],
        globalPayrollHeadGroupId: [0],
        payrollHeadGroupAttributeValueMappingId: [0],
        description: [ele.description],
        sortedFrequencyList: [this.sortedFrequencyList],


      } ) );
    }
    else if ( ele.attributeNature == 'Range Value Per Instance' ) {
      this.pfArray.push( this.formBuilder.group( {

        Applicability: [false],
        value: ['Range'], // Not a range
        value1: ['', Validators.required],
        value2: ['', Validators.required],
        value3: [''],
        value4: [''],
        code: [ele.code],
        attributeNature: [ele.attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: ['', Validators.required],
        toDate: [new Date( '31-Dec-9999' ), Validators.required],
        options: [''],
        isPlusSignVisible: [false],
        attributeMasterId: [ele.attributeMasterId],
        attributeMasterId1: [ele.attributeMasterId],
        attributeGroupIds: [ele.attributeGroupIds],
        minDate1: [''],
        globalPayrollHeadGroupId: [0],
        payrollHeadGroupAttributeValueMappingId: [0],
        description: [ele.description],
        sortedFrequencyList: [''],

      } ) );

      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();

    } else if ( ele.attributeNature == 'Per Employee Input' ) {
      this.pfArray.push( this.formBuilder.group( {

        Applicability: [false],
        value: [''],
        value1: [''],
        value2: [''],
        value3: [''],
        value4: [''],
        code: [ele.code],
        attributeNature: [ele.attributeNature],
        applicableList: [''],
        fromDate: ['', Validators.required],
        toDate: [new Date( '31-Dec-9999' ), Validators.required],
        options: [ele.options],
        isPlusSignVisible: [false],
        attributeMasterId: [ele.attributeMasterId],
        attributeMasterId1: [ele.attributeMasterId],
        attributeGroupIds: [ele.attributeGroupIds],
        minDate1: [''],
        globalPayrollHeadGroupId: [0],
        payrollHeadGroupAttributeValueMappingId: [0],
        description: [ele.description],
        sortedFrequencyList: [this.sortedFrequencyList],
      } ) );
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();

    } else {

      this.pfArray.push( this.formBuilder.group( {

        Applicability: [false],
        value: ['', Validators.required],
        value1: [''],
        value2: [''],
        value3: [''],
        value4: [''],
        code: [ele.code],
        attributeNature: [ele.attributeNature],
        applicableList: [''],  // this is dropdown
        fromDate: ['', Validators.required],
        toDate: [new Date( '31-Dec-9999' ), Validators.required],
        options: [ele.options],
        isPlusSignVisible: [false],
        attributeMasterId: [ele.attributeMasterId],
        attributeMasterId1: [ele.attributeMasterId],
        attributeGroupIds: [ele.attributeGroupIds],
        minDate1: [''],
        globalPayrollHeadGroupId: [0],
        payrollHeadGroupAttributeValueMappingId: [0],
        description: [ele.description],
        sortedFrequencyList: [this.sortedFrequencyList],
      } ) );
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value1'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value2'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value3'].disable();
      this.form.get( 'pfFormArray' )['controls'][this.pfArray.length - 1].controls['value4'].disable();
    }

    this.onChangeApplicability( 'false', index );
  }
  removeContactPerson( i: number ) {
    this.pfArray.removeAt( i );
  }
  get pfArray() { return this.f.pfFormArray as FormArray; }
  get pfArray1() { return this.f.pfFormArray1 as FormArray; }
  get f() { return this.form.controls; }
  resetPFArrayForm() {

    if ( this.pfArray.controls.length !== 0 ) {
      for ( let i = 0; i < this.pfArray.length; i++ ) {
        this.pfArray.removeAt( i );
      }
    }
    this.form.reset();
    this.pfArray.push( this.formBuilder.group( {

    } ) );
  }
  tempValue4 = [];
  addRow( i: number, attributeMasterId: number ) {
    // console.log( value4 );

    this.tempValue4 = [];
    let count = 0;
    let originalSortedFreqList = this.sortedFrequencyList;
    let temp = [];

    for ( let k = 0; k < this.pfArray.length; k++ ) {
      console.log( this.f.pfFormArray.value[k] );
      console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value );
      //   if ( this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value != null || this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value != '' ) {
      console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value );
      temp = originalSortedFreqList.filter( o => o.name !== this.form.get( 'pfFormArray' )['controls'][k].controls['value4'].value );
      originalSortedFreqList = temp;
      console.log( temp );
      //    console.log( 'tempValue4', this.tempValue4 );


      //  console.log( attributeMasterId )
      // console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['attributeMasterId'].value );
      //  console.log( this.form.get( 'pfFormArray' )['controls'][k].controls['attributeMasterId']["value"].value );
      if ( this.form.get( 'pfFormArray' )['controls'][k].controls['attributeMasterId1'].value == attributeMasterId ) {
        console.log( 'in for loop', k );
        count++;
      }


    }
    let newIndex = ( i + count ) - 1;
    //
    if ( this.form.get( 'pfFormArray' )['controls'][newIndex - 1].controls['value4'].value.length > 0 && this.sortedFrequencyList.length > newIndex ) {

      console.log( 'attributeMasterId', attributeMasterId );
      var setsFormArray = this.form.get( 'pfFormArray' ) as FormArray;
      setsFormArray.insert( newIndex, this.formBuilder.group( {

        Applicability: ['true'],
        value: [''],
        value1: ['1', Validators.required],
        value2: ['', Validators.required],
        value3: ['', Validators.required],
        value4: [''],
        code: [''],
        attributeNature: ['Range Value Per Period'],
        applicableList: [''],  // this is dropdown
        fromDate: [null],
        toDate: [null],
        options: [''],
        isPlusSignVisible: [false],
        attributeMasterId: [attributeMasterId],
        attributeMasterId1: [attributeMasterId],
        attributeGroupIds: [0],
        minDate1: [null],
        globalPayrollHeadGroupId: [0],
        payrollHeadGroupAttributeValueMappingId: [0],
        description: [''],
        sortedFrequencyList: [temp],
      } ) );
      this.form.get( 'pfFormArray' )['controls'][newIndex].controls['Applicability'].disable();
      this.form.get( 'pfFormArray' )['controls'][newIndex].controls['fromDate'].disable();
      this.form.get( 'pfFormArray' )['controls'][newIndex].controls['toDate'].disable();
    }


  }
  deleteRow() {
    ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( this.rowNumberToDelete );
  }

  firstSave() {
    console.log( 'view update button', this.viewupdateButton );
    if ( this.viewupdateButton == true && this.multiSelectDropDownData.length != 0 ) {
      console.log( 'firstSave() in if 1' );
      this.clickedOnSave = true;
      console.log( this.multiSelectDropDownData );

      let multipleSaveObj = [];
      for ( let i = 0; i < this.multiSelectDropDownData.length; i++ ) {

        console.log( JSON.stringify( this.f.pfFormArray.value ) );
        const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
        console.log( JSON.stringify( addData ) );
        let data: SaveAttributeAssignmentNewAssignment;
        let attributeMasterId = 0;
        let fromDate1;
        let toDate1;

        this.f.pfFormArray.value.forEach( element => {
          console.log( element.Applicability );
          if ( element.attributeMasterId1 == attributeMasterId ) {
            data.payrollHeadGroupAttributeValueMapping.push( {
              fromDate: fromDate1,
              toDate: toDate1,
              value1: element.value1,
              value2: element.value2,
              value3: element.value3,
              value4: element.value4,
            } );

          } else {
            data = Object.assign( {} );
            data.payrollHeadGroupAttributeValueMapping = [];
            attributeMasterId = element.attributeMasterId1;
            data.applicable = element.Applicability;
            data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
            data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
            data.globalAttributeGroupId = element.attributeGroupIds;
            data.globalHeadGroupId = this.multiSelectDropDownData[i].headGroupIds;
            data.value = element.value;

            if ( element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance' ) {
              data.value = 'Range';
              data.payrollHeadGroupAttributeValueMapping.push( {

                fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
                toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
                value1: element.value1,
                value2: element.value2,
                value3: element.value3,
                value4: element.value4,
              } );
              fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
              toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
            }
            multipleSaveObj.push( data );
            // data = Object.assign( {} );

          }


        } );


      }
      console.log( JSON.stringify( multipleSaveObj ) );
      this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( multipleSaveObj ).subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.GetPHGByIdDisable( this.headGroupDefinitionId );
        this.globalHeadGroupId = 0;
        this.multiSelectDropDownData = [];

      }, ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }, () => {
        console.log( 'ss1' )
        this.Test();
      } );
    } else {
      console.log( 'ss2' )
      this.Test();
    }


  }

  Test() {

    this.clickedOnSave = true;
    if ( this.viewSaveButton ) {
      console.log( 'globalHeadGroupId', this.globalHeadGroupId )
      let multipleSaveObj = [];
      if ( this.multiSelectDropDownData.length > 0 || this.globalHeadGroupId > 0 ) {
        console.log( 'Test() in if 1' );

        this.multiSelectDropDownData.push( { headGroupIds: this.selectedHeadGroupIds, standardName: 'dummy Name' } );
        //this.multiSelectDropDownData.push( this.notSavedHeadList[s].headGroupIds, this.notSavedHeadList[s].standardName );
        console.log( this.multiSelectDropDownData );

        let m = [];
        for ( let i = 0; i < this.multiSelectDropDownData.length; i++ ) {

          console.log( JSON.stringify( this.f.pfFormArray.value ) );
          const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
          console.log( JSON.stringify( addData ) );
          let data: SaveAttributeAssignmentNewAssignment;
          let attributeMasterId = 0;
          let fromDate1;
          let toDate1;

          this.f.pfFormArray.value.forEach( element => {
            console.log( element.Applicability );
            if ( element.attributeMasterId1 == attributeMasterId ) {
              data.payrollHeadGroupAttributeValueMapping.push( {
                fromDate: fromDate1,
                toDate: toDate1,
                value1: element.value1,
                value2: element.value2,
                value3: element.value3,
                value4: element.value4,
              } );

            } else {
              data = Object.assign( {} );
              data.payrollHeadGroupAttributeValueMapping = [];
              //  data.globalPayrollHeadGroupId = this.selectedHeadGroupIds;
              attributeMasterId = element.attributeMasterId1;
              data.applicable = element.Applicability;
              data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
              data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );

              data.globalAttributeGroupId = element.attributeGroupIds;
              //   data.globalHeadGroupId = this.selectedHeadGroupIds;
              data.globalHeadGroupId = this.multiSelectDropDownData[i].headGroupIds;
              data.value = element.value;

              if ( element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance' ) {
                data.value = 'Range';
                data.payrollHeadGroupAttributeValueMapping.push( {

                  fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
                  toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
                  value1: element.value1,
                  value2: element.value2,
                  value3: element.value3,
                  value4: element.value4,
                } );
                fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
                toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
              }
              multipleSaveObj.push( data );
            }
          } );
          //  multipleSaveObj.push( data );
        }
        console.log( 'check this', JSON.stringify( multipleSaveObj ) );
        this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( multipleSaveObj ).subscribe( ( res: any ) => {

          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
          this.GetPHGByIdDisable( this.headGroupDefinitionId );
          this.globalHeadGroupId = 0;
          this.multiSelectDropDownData = [];

        }, ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
      } else {
        console.log( ' Test() in else 1' );
        this.disabled1 = true;
        let saveObj = [];
        console.log( JSON.stringify( this.f.pfFormArray.value ) );
        const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
        console.log( JSON.stringify( addData ) );
        let data: SaveAttributeAssignmentNewAssignment;
        let attributeMasterId = 0;
        let fromDate1;
        let toDate1;

        this.f.pfFormArray.value.forEach( element => {
          console.log( element.Applicability );
          if ( element.attributeMasterId1 == attributeMasterId ) {
            data.payrollHeadGroupAttributeValueMapping.push( {
              fromDate: fromDate1,
              toDate: toDate1,
              value1: element.value1,
              value2: element.value2,
              value3: element.value3,
              value4: element.value4,
            } );
          } else {
            data = Object.assign( {} );
            data.payrollHeadGroupAttributeValueMapping = [];
            attributeMasterId = element.attributeMasterId1;
            data.applicable = element.Applicability;
            data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
            data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
            data.globalAttributeGroupId = element.attributeGroupIds;
            data.globalHeadGroupId = this.selectedHeadGroupIds;
            data.value = element.value;

            if ( element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance' ) {
              data.value = 'Range';
              data.payrollHeadGroupAttributeValueMapping.push( {

                fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
                toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
                value1: element.value1,
                value2: element.value2,
                value3: element.value3,
                value4: element.value4,
              } );
              fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
              toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
            }
            saveObj.push( data );
          }
        } );
        console.log( 'hhhh', this.selectedHeadGroupIds );
        console.log( JSON.stringify( saveObj ) );
        this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
          this.GetPHGByIdDisable( this.headGroupDefinitionId );
          this.globalHeadGroupId = 0;

        }, ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
      }
    }
    else if ( this.viewSaveButton == false && this.multiSelectDropDownData.length == 0 ) {
      console.log( 'Test() in if  333' );
      let saveObj = [];
      console.log( JSON.stringify( this.f.pfFormArray.value ) );
      const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
      console.log( JSON.stringify( addData ) );
      let data: SaveAttributeAssignmentNewAssignment;
      let attributeMasterId = 0;
      let fromDate1;
      let toDate1;

      this.f.pfFormArray.value.forEach( element => {
        console.log( element.Applicability );
        if ( element.attributeMasterId1 == attributeMasterId ) {
          data.payrollHeadGroupAttributeValueMapping.push( {
            payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
            fromDate: fromDate1,
            toDate: toDate1,
            value1: element.value1,
            value2: element.value2,
            value3: element.value3,
            value4: element.value4,
          } );

        } else {
          data = Object.assign( {} );
          data.payrollHeadGroupAttributeValueMapping = [];
          data.globalPayrollHeadGroupId = element.globalPayrollHeadGroupId;
          attributeMasterId = element.attributeMasterId1;
          data.applicable = element.Applicability;
          data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
          data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );

          data.globalAttributeGroupId = element.attributeGroupIds;
          data.globalHeadGroupId = this.selectedHeadGroupIds;
          data.value = element.value;



          if ( element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' || element.attributeNature == 'Range Value Per Instance' ) {
            data.value = 'Range';


            data.payrollHeadGroupAttributeValueMapping.push( {

              fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
              toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
              value1: element.value1,
              value2: element.value2,
              value3: element.value3,
              value4: element.value4,
              payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,

            } );
            fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
            toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
          }
          saveObj.push( data );
        }

        // saveObj.push( data );

      } );

      console.log( 'hhhh', this.selectedHeadGroupIds );
      console.log( JSON.stringify( saveObj ) );

      //if ( data.globalPayrollHeadGroupId > 0 ) {
      console.log( 'inn update' );
      console.log( JSON.stringify( saveObj ) );
      this.companySettingsService.putPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.GetPHGByIdDisable( this.headGroupDefinitionId );

      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

      //   }
    }


  }
  TestJsonObject1() {
    this.disabled1 = true;
    console.log( this.multiSelectDropDownData.length );
    if ( this.globalHeadGroupId !== 0 && this.multiSelectDropDownData.length == 0 ) {
      console.log( 'in if  1' );

      let saveObj = [];
      console.log( JSON.stringify( this.f.pfFormArray.value ) );
      const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
      console.log( JSON.stringify( addData ) );
      let data: SaveAttributeAssignmentNewAssignment;
      let attributeMasterId = 0;
      let fromDate1;
      let toDate1;

      this.f.pfFormArray.value.forEach( element => {
        console.log( element.Applicability );
        if ( element.attributeMasterId1 == attributeMasterId ) {
          data.payrollHeadGroupAttributeValueMapping.push( {
            // payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
            fromDate: fromDate1,
            toDate: toDate1,
            value1: element.value1,
            value2: element.value2,
            value3: element.value3,
            value4: element.value4,
          } );

        } else {
          data = Object.assign( {} );
          data.payrollHeadGroupAttributeValueMapping = [];
          data.globalPayrollHeadGroupId = this.selectedHeadGroupIds;
          data.globalHeadGroupId = this.selectedHeadGroupIds;
          attributeMasterId = element.attributeMasterId1;
          data.applicable = element.Applicability;
          data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
          data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );

          data.globalAttributeGroupId = element.attributeGroupIds;

          data.value = element.value;
          if ( element.Applicability == undefined ) {
            data.applicable = true;
          }
          if ( element.Applicability == false ) {
            data.value = null;
          }
          if ( element.value == undefined || element.value == 'null' ) {
            data.value = null;
          }
          if ( element.attributeNature == 'Range Value Per Period' || element.attributeNature == 'Range Value No Of Instances Per Period' ) {
            data.value = 'Range';
            data.payrollHeadGroupAttributeValueMapping.push( {

              fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
              toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
              value1: element.value1,
              value2: element.value2,
              value3: element.value3,
              value4: element.value4,
              //  payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,

            } );
            fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
            toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
          }
          saveObj.push( data );
        }
      } );

      console.log( 'hhhh', this.selectedHeadGroupIds );
      console.log( JSON.stringify( saveObj ) );
      let a = JSON.stringify( saveObj );
      if ( saveObj[0].globalPayrollHeadGroupId > 0 ) {
        console.log( 'inn update' );
        this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
          this.GetPHGByIdDisable( this.headGroupDefinitionId );
          this.globalHeadGroupId = 0;

        }, ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );

      }
      // else {
      //   console.log( 'in add' );
      //   this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

      //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      //     saveObj = [];
      //     this.GetPHGByIdDisable( this.headGroupDefinitionId );

      //   },
      //     ( error: any ) => {
      //       console.log( 'err', error );
      //     } );
      // }

    }
    else if ( this.multiSelectDropDownData.length > 0 ) {
      console.log( 'in if  2' );

      for ( let m = 0; m < this.multiSelectDropDownData.length; m++ ) {

        let saveObj = [];
        console.log( JSON.stringify( this.f.pfFormArray.value ) );
        const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
        console.log( JSON.stringify( addData ) );
        let data: SaveAttributeAssignmentNewAssignment;
        let attributeMasterId = 0;
        let fromDate1;
        let toDate1;

        this.f.pfFormArray.value.forEach( element => {
          console.log( element.Applicability );
          if ( element.attributeMasterId1 == attributeMasterId ) {
            data.payrollHeadGroupAttributeValueMapping.push( {
              //   payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
              fromDate: fromDate1,
              toDate: toDate1,
              value1: element.value1,
              value2: element.value2,
              value3: element.value3,
              value4: element.value4,
            } );

          } else {
            data = Object.assign( {} );
            data.payrollHeadGroupAttributeValueMapping = [];
            data.globalPayrollHeadGroupId = element.globalPayrollHeadGroupId;
            attributeMasterId = element.attributeMasterId1;
            data.applicable = element.Applicability;
            data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
            data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );

            data.globalAttributeGroupId = element.attributeGroupIds;
            data.globalHeadGroupId = this.multiSelectDropDownData[m].headGroupIds;
            data.value = element.value;
            if ( element.Applicability == undefined ) {
              data.applicable = true;
            }
            if ( element.Applicability == false ) {
              data.value = null;
            }
            if ( element.value == undefined || element.value == 'null' ) {
              data.value = null;
            }
            if ( element.value == 'Range' ) {
              data.applicable = true;

              data.payrollHeadGroupAttributeValueMapping.push( {

                fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
                toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
                value1: element.value1,
                value2: element.value2,
                value3: element.value3,
                value4: element.value4,
                //   payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,

              } );
              fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
              toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
            }
            saveObj.push( data );
          }
        } );

        console.log( 'hhhh', this.selectedHeadGroupIds );
        console.log( JSON.stringify( saveObj ) );
        let a = JSON.stringify( saveObj );

        console.log( 'inn update' );
        this.companySettingsService.putPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
          this.GetPHGByIdDisable( this.headGroupDefinitionId );

        },
          ( error: any ) => {
            this.alertService.sweetalertError( error["error"]["status"]["message"] );
          } );


        // else {
        //   console.log( 'in add' );
        //   this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

        //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        //     saveObj = [];
        //     this.GetPHGByIdDisable( this.headGroupDefinitionId );

        //   },
        //     ( error: any ) => {
        //       console.log( 'err', error );
        //     } );
        // }
      }

    } else {

      console.log( 'in if  3' );
      let saveObj = [];
      console.log( JSON.stringify( this.f.pfFormArray.value ) );
      const addData: SaveAttributeAssignmentNewAssignment = Object.assign( {} );
      console.log( JSON.stringify( addData ) );
      let data: SaveAttributeAssignmentNewAssignment;
      let attributeMasterId = 0;
      let fromDate1;
      let toDate1;

      this.f.pfFormArray.value.forEach( element => {
        console.log( element.Applicability );
        if ( element.attributeMasterId1 == attributeMasterId ) {
          data.payrollHeadGroupAttributeValueMapping.push( {
            payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,
            fromDate: fromDate1,
            toDate: toDate1,
            value1: element.value1,
            value2: element.value2,
            value3: element.value3,
            value4: element.value4,
          } );

        } else {
          data = Object.assign( {} );
          data.payrollHeadGroupAttributeValueMapping = [];
          data.globalPayrollHeadGroupId = element.globalPayrollHeadGroupId;
          attributeMasterId = element.attributeMasterId1;
          data.applicable = element.Applicability;
          data.fromDate = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
          data.toDate = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );

          data.globalAttributeGroupId = element.attributeGroupIds;
          data.globalHeadGroupId = this.selectedHeadGroupIds;
          data.value = element.value;

          if ( element.Applicability == undefined ) {
            data.applicable = true;
          }
          if ( element.Applicability == false ) {
            data.value = null;
          }
          if ( element.value == undefined || element.value == 'null' ) {
            // data.value = null;
            data.value = null;
          }
          if ( element.value == 'Range' ) {
            data.applicable = true;


            data.payrollHeadGroupAttributeValueMapping.push( {

              fromDate: this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' ),
              toDate: this.datePipe.transform( element.toDate, 'yyyy-MM-dd' ),
              value1: element.value1,
              value2: element.value2,
              value3: element.value3,
              value4: element.value4,
              payrollHeadGroupAttributeValueMappingId: element.payrollHeadGroupAttributeValueMappingId,

            } );
            fromDate1 = this.datePipe.transform( element.fromDate, 'yyyy-MM-dd' );
            toDate1 = this.datePipe.transform( element.toDate, 'yyyy-MM-dd' );
          }
          saveObj.push( data );
        }
      } );

      console.log( 'hhhh', this.selectedHeadGroupIds );
      console.log( JSON.stringify( saveObj ) );
      let a = JSON.stringify( saveObj );
      if ( data.globalPayrollHeadGroupId > 0 ) {
        console.log( 'inn update' );
        this.companySettingsService.putPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
          this.GetPHGByIdDisable( this.headGroupDefinitionId );

        },
          ( error: any ) => {
            this.alertService.sweetalertError( error["error"]["status"]["message"] );
          } );

      } else {
        console.log( 'in add' );
        this.companySettingsService.postPayrollHeadAttributeMappingAddGlobal( saveObj ).subscribe( ( res: any ) => {

          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
          this.GetPHGByIdDisable( this.headGroupDefinitionId );

        },
          ( error: any ) => {
            this.alertService.sweetalertError( error["error"]["status"]["message"] );
          } );
      }
    }
    //this.SaveNext( this.selectedHeadGroupIds );
  }

  Next( selectedHeadGroupIds ): void {
    this.clickedOnSave = false;
    this.multiSelectDropDownData = [];


    this.selectedCopyToList = [];
    if ( this.pfArray.controls.length !== 0 ) {
      for ( let i = 0; i < this.pfArray.length; i++ ) {
        this.pfArray.removeAt( i );
      }
    }
    this.form = this.formBuilder.group( {
      pfFormArray: new FormArray( [] ),
    } );

    this.savedHeadNameList = this.originalSavedHeadNameList;
    this.savedHeadNameList.forEach( element => {
      this.savedHeadNameList = this.savedHeadNameList.filter( e => e.headGroupIds !== selectedHeadGroupIds );
    } );

    let index = this.targetProducts.findIndex( o => o.headGroupIds == selectedHeadGroupIds );

    if ( index < this.targetProducts.length - 1 ) {
      this.headNameIndex = index + 1;
      this.headMasterId = this.targetProducts[index + 1].headMasterId;
      this.HeadName = this.targetProducts[index + 1].standardName;
      this.selectedHeadGroupIds = this.targetProducts[index + 1].headGroupIds;
      this.Nature = this.targetProducts[index + 1].headNature;
      this.viewSaveButton = true;

    } else {
      alert( 's2s' );
    }
    this.HeadNameList = this.OrigianHeadNameList;

    this.HeadNameList.forEach( element => {
      this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== this.selectedHeadGroupIds );
    } );

    this.onSelectAttributeAssignmentWithMultipleParameter( this.selectedHeadGroupIds );
    this.GetPHGByIdDisable( this.headGroupDefinitionId );
  }




  viewPreviousButton( selectedHeadGroupIds ) {
    this.clickedOnSave = false;
    this.multiSelectDropDownData = [];
    this.globalHeadGroupId = 0;


    console.log( selectedHeadGroupIds );
    this.selectedCopyToList = [];

    if ( this.pfArray.controls.length !== 0 ) {
      for ( let i = 0; i < this.pfArray.length; i++ ) {
        this.pfArray.removeAt( i );
      }
    }
    this.form = this.formBuilder.group( {
      pfFormArray: new FormArray( [] ),

    } );

    let index2 = this.targetProducts.findIndex( o => o.headGroupIds == selectedHeadGroupIds );
    console.log( 'target products', this.targetProducts );

    if ( index2 > 0 ) {
      console.log( 'index2 greater than 0' );
      this.headNameIndex = index2 - 1;
      this.headMasterId = this.targetProducts[this.headNameIndex].headMasterId;
      this.HeadName = this.targetProducts[this.headNameIndex].standardName;
      this.selectedHeadGroupIds = this.targetProducts[this.headNameIndex].headGroupIds;
      this.Nature = this.targetProducts[this.headNameIndex].headNature;
    } else {
      alert( '14' );
    }
    this.savedHeadNameList = this.originalSavedHeadNameList;

    this.savedHeadNameList.forEach( element => {
      this.savedHeadNameList = this.savedHeadNameList.filter( e => e.headGroupIds !== selectedHeadGroupIds );
    } );


    this.HeadNameList.forEach( element => {
      this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== this.selectedHeadGroupIds );
    } );
    this.dropdownList = this.HeadNameList;
    console.log( 'headNameList after filter', this.HeadNameList );
    // this.onSelectAttributeAssignmentWithMultipleParameter( this.selectedHeadGroupIds );
    //   this.onSelectAttributeAssignment( this.selectedHeadGroupIds, 0 );
    this.onSelectAttributeAssignmentWithMultipleParameter( this.selectedHeadGroupIds );
    console.log( this.selectedHeadGroupIds );
    this.GetPHGByIdDisable( this.headGroupDefinitionId );
  }
  copyDateFromTableRow( i: number, fromDate: any, toDate: any, Applicability: boolean ) {
    console.log( 'aa', Applicability );
    // if ( Applicability == true ) {
    if ( fromDate !== '' && fromDate != null ) {
      console.log( 'set value' );
      this.tempFromDate = fromDate;
      this.tempToDate = toDate;

    } else {
      console.log( 'in else part', this.tempFromDate );
      this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( new Date( this.tempFromDate ) );
      this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( this.tempToDate ) );
    }
    // }
  }

  // CancelAttributeCreation() {


  //   this.viewCancelButton = false;
  //   this.globalHeadGroupId = 0;
  //   this.selectedCopyToList = [];
  //   this.multiSelectDropDownData = [];
  //   this.hideCopyFrom = false;

  //   if ( this.pfArray.controls.length !== 0 ) {
  //     for ( let i = 0; i < this.pfArray.length; i++ ) {
  //       this.pfArray.removeAt( i );
  //     }
  //   }

  // }

  CancelAttributeCreation(): void {
    this.globalHeadGroupId = 0;
    this.hideCopyFrom = false;
    this.headGroupDefinitionId = 0;
    this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.payrollHeadGroupCreationForm.reset();
    this.viewCancelButton = false;
    this.viewupdateButton = false;
    this.targetProducts = [];
    this.getAllHeadCreation();
    this.payrollHeadGroupCreationForm.get( 'attributeNature' ).setValue( '' );
  }

  resetAttributeSelection(): void {
    this.globalHeadGroupId = 0;
    this.hideCopyFrom = false;
    this.headGroupDefinitionId = 0;
    this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.payrollHeadGroupCreationForm.reset();
    this.viewCancelButton = false;
    this.viewupdateButton = false;
    this.targetProducts = [];
    this.getAllHeadCreation();
    this.payrollHeadGroupCreationForm.get( 'attributeNature' ).setValue( '' );
  }
  onChangeApplicability1( evt: any, index: number ) {
    // console.log( 'ccc', index );
    if ( evt == 'false' ) {
      //   console.log( 'att master id', this.form.get( 'pfFormArray' )['controls'][index].controls['attributeMasterId']["value"].value );
      let tempAttributeMasterId = this.form.get( 'pfFormArray' )['controls'][index].controls['attributeMasterId']["value"].value;
      //  let flag = true;
      for ( let i = this.pfArray.length - 1; i >= 0; i-- ) {
        console.log( 'in i', this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId']["value"].value )
        if ( tempAttributeMasterId == this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId']["value"].value && this.form.get( 'pfFormArray' )['controls'][i].controls['code'].value.length == 0 ) {
          // console.log( 'in if in ', i );
          //    if ( flag == true ) {
          //    ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );
          //  } else {

          ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );


          //   }
        }
        //flag = false;
      }
    }
  }
  onChangeApplicability( evt: any, i: number ) {
    console.log( 'onChangeApplicability', evt, i );
    console.log( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value );
    if ( evt == 'true' ) {
      if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' || this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value Per Period' ) {
        for ( let i = 0; i < this.pfArray.length; i++ ) {
          console.log( 'aaa', this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId'].value );
        }

        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value3'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].enable();

        this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( true );
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( '31-Dec-9999' ) );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].setValue( 'Range' );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].setValue( '' );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value3'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].setValue( '1' );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();


      } else if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value Per Instance' ) {
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( false );


        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( '31-Dec-9999' ) );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].setValue( 'Range' );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();

      } else if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Per Employee Input' ) {
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].enable();

        this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( false );


        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( '31-Dec-9999' ) );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();

      } else {
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( '31-Dec-9999' ) );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].setValue( '' );
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].enable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].enable();
      }

    } else {
      if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value Per Period' || this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' ) {

        this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( false );
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value3'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value3'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();
        console.log( 'in else of on change applicability' );
        //   console.log( 'att master id', this.form.get( 'pfFormArray' )['controls'][index].controls['attributeMasterId']["value"].value );
        let tempAttributeMasterId = this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId'].value;
        //  let flag = true;
        for ( let i = this.pfArray.length - 1; i >= 0; i-- ) {
          console.log( 'in i', this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId']["value"].value )
          if ( tempAttributeMasterId == this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId'].value && this.form.get( 'pfFormArray' )['controls'][i].controls['code'].value.length == 0 ) {
            // console.log( 'in if in ', i );
            //    if ( flag == true ) {
            //    ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );
            //  } else {

            ( <FormArray>this.form.get( 'pfFormArray' ) ).removeAt( i );


            //   }
          }
          //flag = false;
        }

      } else {
        console.log( 'in else' );
        //  if ( this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value No Of Instances Per Period' || this.form.get( 'pfFormArray' )['controls'][i].controls['attributeNature'].value == 'Range Value Per Period' ) {
        // } else {
        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].setValue( '' );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value3'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].setValue( null );
        this.form.get( 'pfFormArray' )['controls'][i].controls['isPlusSignVisible'].setValue( false );

        this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value3'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value2'].disable();
        this.form.get( 'pfFormArray' )['controls'][i].controls['value1'].disable();

      }
    }
  }
  checkValidation() { }
  getValidity( i ) {
    return ( <FormArray>this.form.get( 'value2' ) ).controls[i].invalid;
  }


  doubleClickOnLeftTable( evt: any ) { }
  doubleClickOnRightTable( evt: any ) { }





  openNewPopUpWindow( template: TemplateRef<any>, selectedHeadGroupIds: number, payrollHeadGroupId: number ) {
    console.log( 'in new pop up window', selectedHeadGroupIds, payrollHeadGroupId );
    this.form.setControl( 'pfFormArray1', new FormArray( [] ) );


    this.companySettingsService.getAllPayRollHeadGroupAttributeHistory( selectedHeadGroupIds, payrollHeadGroupId ).subscribe( ( res ) => {
      console.log( JSON.stringify( res ) );
      for ( let i = 0; i < res.data.results[0].length; i++ ) {
        console.log( 'cccc', res.data.results[0][i].attributeMaster[0].options );

        if ( res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length == 0 ) {

          this.addPfArrayWithHistoryValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, '', '', '', '', false, res.data.results[0][i].globalPayrollHeadGroupId, 0, res.data.results[0][i].attributeMaster[0].description );

        } else {
          for ( let j = 0; j < res.data.results[0][i].payrollHeadGroupAttributeValueMapping.length; j++ ) {
            // console.log( 'jjjjjjjjjjj', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );

            if ( j == 0 ) {
              console.log( 'ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
              this.addPfArrayWithHistoryValues( res.data.results[0][i].applicable, res.data.results[0][i].attributeMaster[0].attributeNature, res.data.results[0][i].attributeMaster[0].code, res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, res.data.results[0][i].attributeMaster[0].options, res.data.results[0][i].value, res.data.results[0][i].fromDate, res.data.results[0][i].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, true, 0, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description );

            } else {
              console.log( 'ee', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId );
              this.addPfArrayWithHistoryValues( true, 'Range Value No Of Instances Per Period', '', res.data.results[0][i].attributeMaster[0].attributeMasterId, res.data.results[0][i].globalAttributeGroupId, null, 'Range', res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].fromDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].toDate, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value1, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value2, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value3, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].value4, false, 0, res.data.results[0][i].payrollHeadGroupAttributeValueMapping[j].payrollHeadGroupAttributeValueMappingId, res.data.results[0][i].attributeMaster[0].description );
              //  applicable: boolean, attributeNature: string, code: string, attributeMasterId: number, attributeGroupIds: number, options: any, value: string, fromDate: Date, toDate: Date, value1?: string, value2?: string, value3?: string, value4?: string, isPlusSignVisible?: boolean
            }
          }
        }
      }
    }, ( error: any ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );
    }, () => { } );


    this.modalRef2 = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-xl' } )
    );
  }
  UploadModal1( template: TemplateRef<any>, headGroupDefinitionId: number ) {
    this.deletedHeadGroupDefinitionId = headGroupDefinitionId;
    this.deleteModalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  UploadModal2( template: TemplateRef<any> ) {
    console.log( 'in UploadModal2 headmaster id', this.headMasterId );
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-xl' } ) );
  }
  UploadModalYesNo( template: TemplateRef<any> ) {
    if ( !this.viewupdateButton ) {
      this.PayrollHeadGroupList = this.originalPayrollHeadGroupList;
      for ( let i = 0; i < this.PayrollHeadGroupList.length; i++ ) {
        //   this.PayrollHeadGroupList.filter
        this.PayrollHeadGroupList = this.PayrollHeadGroupList.filter( e => e.attributeGroupName === this.AttGrpName );
      }
      // AttGrpName
      // this.HeadNameList = this.HeadNameList.filter( e => e.headGroupIds !== this.selectedHeadGroupIds );

    }
    this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.modalRef1 = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-xl' } )
    );
  }
  deleteRowModal( template: TemplateRef<any>, rowNumber: number ) {
    this.rowNumberToDelete = rowNumber;

    this.deleteRowModal1 = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  onChangeActiveFrequency( evt: any, attributeMasterId: number, index: number ) {

    console.log( evt, attributeMasterId );
    for ( let i = index + 1; i < this.pfArray.length - 1; i++ ) {
      console.log( 'in i', this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId'].value )
      if ( attributeMasterId == this.form.get( 'pfFormArray' )['controls'][i].controls['attributeMasterId'].value ) {
        this.form.get( 'pfFormArray' )['controls'][i].controls['value4'].setValue( '' );

      }
    }
  }
  // get all  activeFrequencyList
  getActiveFrequency(): void {
    this.activeFrequencyList = [];
    this.companySettingsService.getActiveFrequency().subscribe( res => {
      this.activeFrequencyList = res.data.results;
    }, ( error: any ) => {
      //  this.alertService.sweetalertError( error["error"]["status"]["message"] );
    }, () => {
      // for ( let i = 0; i < this.activeFrequencyList.length; i++ ){
      if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'daily' ) !== -1 ) {
        console.log( 'in daily' );
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'daily' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      } if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'weekly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'weekly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      }
      if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'biweeekly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'biweeekly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      }
      if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'semi-monthly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'semi-monthly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      }
      if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'monthly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'monthly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      }
      if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'quarterly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'quarterly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      }
      if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'half-yearly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'half-yearly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      } if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'yearly' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'yearly' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );

      } if ( this.activeFrequencyList.findIndex( o => o.name.toLowerCase() === 'adhoc' ) !== -1 ) {
        const index = this.activeFrequencyList.findIndex( o => o.name.toLowerCase() == 'adhoc' );
        this.sortedFrequencyList.push( this.activeFrequencyList[index] );
      }
      console.log( ' this.sortedFrequencyList', this.sortedFrequencyList );
    } );
  }
      //Enter only Number Special Character/Character Form control Description
      isContainsOnlySpecialCharacterDescription() {
        // alert("Hiii codeInvalid");
        this.codeInvalid = false
        console.log( 'isContainsOnlySpecialCharacterDescription' );
        var splChars = "* |,\":<>[]{}^`\!';()@&$#%1234567890";
        for ( var i = 0; i < this.payrollHeadGroupCreationForm.get( 'headGroupDefinitionName' ).value.length; i++ ) {
          if ( splChars.indexOf( this.payrollHeadGroupCreationForm.get( 'headGroupDefinitionName' ).value.charAt( i ) ) != -1 ) {
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

}

