import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AlertServiceService } from '../../../../app/core/services/alert-service.service';



import { HeadDetailPHG, SaveAttributeAssignment, SavePHG, UpdateflagCycleCreation, UpdateflagCycleCreationPHG } from '../model/business-cycle-model';

export class headDetail {
  headMasterId: number;
}


@Component( {
  selector: 'app-payroll-head-group-creation',
  templateUrl: './payroll-head-group-creation.component.html',
  styleUrls: ['./payroll-head-group-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class PayrollHeadGroupCreationComponent implements OnInit {

  payrollHeadGroupCreationForm: FormGroup;
  AttributeSelectionList: Array<any> = [];
  PayrollHeadGroupList: Array<any> = [];
  PHGName: string;
  AttGrpName: string;
  AttGrpName1: string;
  HeadName: string;
  Nature: string;
  selectedCopFormPHGName: string;
  headGroupDefinitionId: number;
  sourceProducts: Array<any> = [];
  targetProducts: Array<any> = [];
  selectedUser: Array<any> = [];
  selectedUser2: Array<any> = [];
  AttGroupList: Array<any> = [];
  values: Array<any> = [];
  AttributeSelectionArray = [];
  headGroupIdList = [];
  selectedLevel: any;
  attributeGroupId: number;
  headMasterId: number;
  disabled: boolean = true;
  viewCancelButton: boolean = false;
  hidevalue: boolean = false;
  viewupdateButton: boolean = false;
  dropdownSettings = {};
  dropdownList = [];
  ServicesList: Array<any> = [];
  Multiselectflag: boolean = false;
  fromDate: string;
  toDate: string;
  //headGroupIdforattributeList: number;
  showflag: boolean = false;
  HeadNameList: Array<any> = [];
  selectedheadName: Array<any> = [];
  headName: string;
  FormulaArray: Array<any> = [];
  SDMArray: Array<any> = [];
  Formula: string;
  viewSaveButton: boolean = false;
  minDate1: Date;
  NextheadGroupId: number;
  value = '';
  NewTargetArray: Array<any> = [];
  getbyid: boolean = false;
  HighlightRow: any;
  HighlightRight: any;
  originalSourceProductList = [];

  constructor(
    private modalService: BsModalService,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private companySettingsService: CompanySettingsService,
    private alertService: AlertServiceService,
  ) { }


  modalRef: BsModalRef;
  modalRef1: BsModalRef;


  ngOnInit(): void {
    this.getAllAttributeSelection();
    this.getAllPayrollHeadGroup();
    this.getAllHeadCreation();

    // this.getAllFormulaList();
    // this.getAllSDMList();
    this.getAllHeadCreation1();




    this.dropdownSettings = {
      singleSelection: false,
      idField: 'headMasterId',
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
      //  optionList: new FormControl('',Validators.required),
      // optionList: this.formBuilder.array([]),
      // type: new FormControl('', ),
      // isStatutory: new FormControl('0'),
    } );
  }
  // get All HeadCreation

  getAllHeadCreation1(): void {


    this.companySettingsService.getAllHeadCreation().subscribe( res => {

      this.dropdownList = res.data.results;
      console.log( 'dropdwonlist', this.dropdownList );
    } );
  }


  onItemSelect( item: any ) {

    this.Multiselectflag = true;
    // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
    // this.ServicesList=[];
    this.ServicesList.push( item.headGroupId )
    console.log( item );
  }
  onItemDeSelect( item: any ) {

    // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
    // this.ServicesList=[];
    var index = this.ServicesList.indexOf( item.headGroupId )
    if ( index > -1 ) {
      this.ServicesList.splice( index, 1 )
    }
    console.log( item );
  }

  onSelectAll( items: any ) {

    // this.ServicesList.forEach(function(f){
    //   addCycleDefinition.serviceName.push(f);
    // });

    items.forEach( element => {
      this.ServicesList.push( element.headGroupId )
    } );
    //this.ServicesList.push(items.serviceName)

    console.log( items );
  }
  onDeSelectAll( items: any ) {
    this.ServicesList = [];
  }



  resetAttributeSelection(): void {
    this.payrollHeadGroupCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.viewupdateButton = false;

    // this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
    //
    //   this.sourceProducts = res.data.results;
    //   });

    this.targetProducts = [];
    this.getAllHeadCreation();
    this.payrollHeadGroupCreationForm.get( 'attributeNature' ).setValue( '' );
  }

  // get All Attribute Selection(Attribute Group)
  getAllAttributeSelection(): void {
    this.companySettingsService.getAllAttributeSelection().subscribe( res => {

      this.AttributeSelectionList = res.data.results;
      //this.attributeGroupId=
    } );
  }
  // get All  Payroll HeadGroup
  getAllPayrollHeadGroup(): void {
    this.companySettingsService.getAllPayrollHeadGroup().subscribe( res => {

      this.PayrollHeadGroupList = res.data.results;
    } );
  }

  // get All  Payroll HeadGroup
  getAllFormulaList(): void {
    this.companySettingsService.getFromulaForFormulaMaster().subscribe( res => {

      this.FormulaArray = res.data.results;
      this.Formula = res.data.results[0].originalFormula;

      //   this.AttGroupList.forEach(element => {
      //     if(element.attributeNature=='Formula')
      //     {
      //     this.FormulaArray = res.data.results;
      //  // element.value=this.Formula;
      //    }
      //   //  else if(element.attributeNature=='input')
      //   //   {
      //   // element.value=this.Formula;
      //   //   }
      //    });

    } );
  }

  //        // get All  Payroll HeadGroup
  // getAllSDMList(): void {
  //   this. companySettingsService.getSDMFormula().subscribe(res => {
  //
  //       this.SDMArray = res.data.results[0].originalFormula;
  //       });
  //     }

  // get All HeadCreation
  getAllHeadCreation(): void {
    this.companySettingsService.getAllHeadCreation().subscribe( res => {

      this.sourceProducts = res.data.results;
      this.originalSourceProductList = res.data.results;
    } );
  }

  // Get PHG ById
  GetPHGByIdDisable( id ): void {

    // this.disabled= false;
    this.viewupdateButton = true;
    // this.viewCancelButton= true;
    this.headGroupDefinitionId = id;
    this.targetProducts = [];  //added new
    //this.getAllHeadCreation();
    this.companySettingsService.GetPHGById( id )
      .subscribe( response => {


        response.data.results[0].headMasters.forEach( element => {
          this.NewTargetArray.push( element );
        } );

        //this.getAllHeadCreation();
        this.targetProducts = response.data.results[0].headMasters;
        //this.NewTargetArray=response.data.results[0].headMasters;


        this.targetProducts.forEach( element => {
          var index = this.targetProducts.indexOf( element )
          this.sourceProducts = this.sourceProducts.filter( e => e.standardName !== element.standardName );
        } );
        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.payrollHeadGroupCreationForm.patchValue( { headGroupDefinitionName: response.data.results[0].headGroupDefinitionName } );
        this.payrollHeadGroupCreationForm.patchValue( { description: response.data.results[0].description } );
        this.payrollHeadGroupCreationForm.patchValue( { attributeNature: response.data.results[0].attributeGroupName } );
        this.PHGName = response.data.results[0].headGroupDefinitionName;
        this.AttGrpName = response.data.results[0].attributeGroupName;
        // this.dropdownList=this.HeadNameList;
        // this.dropdownSettings = {
        //   singleSelection: false,
        //   idField: 'headGroupId',
        //   textField: 'standardName',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   itemsShowLimit: 2,
        //   allowSearchFilter: true
        // };
      } );
    // this.getAllHeadCreation();
  }



  //Delete Payroll HeadGroup by id
  DeletePayrollHeadGroup( id ): void {

    // this.CycleupdateFlag=false;
    // this.CycleupdateFlag1=false;
    this.companySettingsService.DeletePayrollHeadGroup( id )
      .subscribe( response => { //: saveBusinessYear[]

        this.alertService.sweetalertMasterSuccess( response.status.message, '' )
        this.getAllPayrollHeadGroup();
        this.payrollHeadGroupCreationForm.reset();
        // this.targetProducts=[];
      } );
  }

  onChangeEvent( event: any ): void {

    this.PHGName = event.target.value;
  }
  onStatusChange( event ) {

    this.AttGrpName = event.target.value;
    this.attributeGroupId = event.target.value;
  }
  onChangeDropDown( event ) {

    this.AttGrpName = event.target.value;
    this.attributeGroupId = event.target.value;
  }

  inputChanged( element: HTMLElement ) {

    alert( element.getAttribute( 'attributeNature' ) ) // item_name
  }

  selected() {
    alert( this.selectedLevel.name )
  }

  RowSelected( u: any, ind: number ) {

    this.HighlightRow = ind;
    console.log( 'in row selected ' );

    let temp = this.sourceProducts;
    this.sourceProducts = new Array();
    /// let index1 = temp.findIndex( o => o.code == u.code );
    let index = this.selectedUser.findIndex( o => o.headMasterId == u.headMasterId );
    let isContain = this.selectedUser.some( o => o.headMasterId == u.headMasterId );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.selectedUser.splice( index, 1 );
      //  temp[index1].attributeNature = 'List';
    } else {
      //temp[index1].attributeNature = 'List123';
      this.selectedUser.push( u );
    }


    //this.targetProducts.push(u);
    // declare variable in component.


    this.sourceProducts = temp;

    // this.sourceProducts.forEach( ( element, i ) => {
    //   if ( i == this.HighlightRow ) {
    //     if ( isContain == true ) {
    //       element.isHighlight = false
    //     }
    //     else {
    //       if ( i == this.HighlightRow ) {
    //         element.isHighlight = true
    //       }
    //     }
    //   }
    // } )

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
    } )










    // this.selectedUser.push( u );
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
      element.isHighlight = false;
      element.isHighlightright = false;
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
  RowSelectedtargetProducts( u: any, i: number ): void {
    if ( u.disabled == true ) {

    } else {

      this.HighlightRight = i;
      console.log( 'u', u );
      let indexOfTargetProd = this.targetProducts.findIndex( o => o.headMasterId == u.headMasterId );

      ///let temp = this.targetProducts;
      // this.targetProducts = new Array();
      /// let index1 = temp.findIndex( o => o.headMasterId == u.headMasterId );
      let index = this.selectedUser2.findIndex( o => o.headMasterId == u.headMasterId );
      let isContain = this.selectedUser2.some( o => o.headMasterId == u.headMasterId );
      console.log( isContain, index );
      if ( isContain == true ) {
        this.targetProducts[indexOfTargetProd].isHighlightright = false;
        this.selectedUser2.splice( index, 1 );
        this.selectedheadName.splice( index, 1 );

        //  temp[index1].attributeNature = 'List';
      } else {
        this.targetProducts[indexOfTargetProd].isHighlightright = true;
        //temp[index1].attributeNature = 'List123';
        this.selectedUser2.push( u );
        this.selectedheadName.push( u );
      }


      //this.targetProducts.push(u);
      // declare variable in component.


      //this.targetProducts = temp;
      // this.targetProducts.forEach( ( element, i ) => {
      //   if ( i == this.HighlightRight ) {
      //     if ( isContain == true ) {
      //       element.isHighlightright = true
      //       element.isHighlight = false
      //     }
      //     else {
      //       if ( i == this.HighlightRow ) {
      //         element.isHighlightright = true;
      //         element.isHighlight = false;
      //       }
      //     }
      //   }
      // } );









      // this.selectedheadName.push( u );
      this.HeadNameList = this.targetProducts;

      this.selectedheadName.forEach( element => {
        var index = this.targetProducts.indexOf( element )
        this.HeadNameList = this.HeadNameList.filter( e => e.standardName !== element.standardName );
      } );

      this.dropdownList = this.HeadNameList;

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'headMasterId',
        textField: 'standardName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };

      ////////////////////////////////////////////////////////////////
      this.headMasterId = u.headMasterId;
      //this.attributeGroupId=
      this.HeadName = u.standardName;
      this.Nature = u.headNature;
      // this.getAllAttributeListByAttGroup();
      //if(this.selectedUser2.includes)
      // this.selectedUser2.push( u );

      //   this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
      //
      //     this.AttGroupList =res.data.results[0];//[0].attributeMasters;
      //    // callBack('template12445');
      //  //  this.UploadModal2('template12445');

      //   });

      //   if(this.AttGroupList.length==0)
      //   {
      //     this.getAllAttributeListByAttGroup();
      //   }



    }

  }

  // AttributeAssignmentClick(u:any): void
  // {
  //
  //   this.headGroupIdList=u;
  // }
  SaveNext( AttGroupList ): void {
    console.log( 'in save & next', AttGroupList );

    ////////////////////////////Save one headgroup////////////////////////////////////////////
    const addData: UpdateflagCycleCreationPHG = Object.assign( {} );
    console.log( JSON.stringify( addData ) );
    addData.mappingGroupRequest = [];
    this.AttributeSelectionArray = AttGroupList;
    this.AttributeSelectionArray.forEach( element => {
      const cycledata1: SaveAttributeAssignment = Object.assign( {} );

      cycledata1.headGroupId = this.headMasterId;

      cycledata1.attributeGroupId = element.attributeGroupId;
      cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
      cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
      cycledata1.dependentOn = element.dependentOn;
      cycledata1.value = element.value;
      cycledata1.payrollHeadGroupMappingId = element.payrollHeadGroupMappingId;


      addData.mappingGroupRequest.push( cycledata1 );
    } );
    console.log( JSON.stringify( addData ) );


    // this.companySettingsService.UpdateattributeListById( addData )
    //   .subscribe( ( res: any ) => {

    //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );

    //   },
    //     ( error: any ) => {
    //       this.alertService.sweetalertError( error["error"]["status"]["message"] );
    //     } );
    this.ServicesList = [];
    this.payrollHeadGroupCreationForm.reset();
    this.AttGroupList = [];

    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    //////////////////////////////Save one end////////////////////////////////////////////
    this.NextheadGroupId = this.HeadNameList[0].headMasterId;
    this.headMasterId = this.NextheadGroupId;
    this.HeadName = this.HeadNameList[0].standardName;

    this.HeadNameList.forEach( element => {
      //  this.NextheadGroupId=element.headGroupId;
      this.HeadNameList = this.HeadNameList.filter( e => e.headMasterId !== this.NextheadGroupId );
    } );
    this.AttGroupList = [];

    this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.NextheadGroupId ).subscribe( ( res: any ) => {

      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach( element => {
        element.toDate = this.datepipe.transform( element.toDate, "dd-MMM-yyyy" );
        element.fromDate = this.datepipe.transform( element.fromDate, "dd-MMM-yyyy" );
      } );

      if ( this.AttGroupList[0].attributeMaster.code != null ) {
        this.AttGroupList.forEach( element => {
          element["code"] = element.attributeMaster.code;

        } );
      }
    },
      ( error: any ) => {
        if ( error.status == 404 ) {
          this.getAllAttributeListByAttGroup();
          //this.viewSaveButton=true;
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        }
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }
    );
  }

  Next(): void {

    this.NextheadGroupId = this.HeadNameList[0].headGroupId;
    this.HeadName = this.HeadNameList[0].standardName;

    this.HeadNameList.forEach( element => {
      //  this.NextheadGroupId=element.headGroupId;
      this.HeadNameList = this.HeadNameList.filter( e => e.headGroupId !== this.NextheadGroupId );
    } );
    this.AttGroupList = [];
    this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.NextheadGroupId ).subscribe( ( res: any ) => {

      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach( element => {
        element.toDate = this.datepipe.transform( element.toDate, "dd-MMM-yyyy" );
        element.fromDate = this.datepipe.transform( element.fromDate, "dd-MMM-yyyy" );
      } );

      if ( this.AttGroupList[0].attributeMaster.code != null ) {
        this.AttGroupList.forEach( element => {
          element["code"] = element.attributeMaster.code;

        } );
      }
    },
      ( error: any ) => {
        if ( error.status == 404 ) {
          this.getAllAttributeListByAttGroup();
          //this.viewSaveButton=true;
        }
        // this.sweetalertError(error["error"]["status"]["message"]);
      }
    );
  }


  RowSelectedtargetProducts2( u: any ): void {
    console.log( 'RowSelectedtargetProducts2' );

    /////////////////////////////////////////////////////
    this.selectedheadName.push( u );
    this.HeadNameList = this.targetProducts;

    this.selectedheadName.forEach( element => {
      var index = this.targetProducts.indexOf( element )
      this.HeadNameList = this.HeadNameList.filter( e => e.standardName !== element.standardName );
    } );

    this.dropdownList = this.HeadNameList;

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'headMasterId',
      textField: 'standardName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    ////////////////////////////////////////////////////////////////
    this.headMasterId = u.headMasterId;
    //this.attributeGroupId=
    this.HeadName = u.standardName;
    this.Nature = u.headNature;
    // this.getAllAttributeListByAttGroup();

    // this.selectedUser2.push(u);

    //   this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
    //
    //     this.AttGroupList =res.data.results[0];//[0].attributeMasters;
    //    // callBack('template12445');
    //  //  this.UploadModal2('template12445');

    //   });

    //   if(this.AttGroupList.length==0)
    //   {
    //     this.getAllAttributeListByAttGroup();
    //   }


  }

  righttablePusg( u: any ): void {
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

    //   var index=this.targetProducts.indexOf(this.selectedUser2[0])
    //   this.selectedUser2=[];
    //   if (index > -1) {
    //    this.targetProducts.splice(index,1)

    // }
  }
  // onStatusChange2(event):void{
  //   this.AttGroupList=[];
  //   this.AttGrpName1=event.target.value;
  //   this. companySettingsService.GetAttributeOptionListByGroup( this.AttGrpName1).subscribe(res => {
  //
  //     this.AttGroupList =res.data.results[0].attributeMasters;
  //   });

  // }


  UpdatePHGById(): void {

    const addAttributeCreation: SavePHG = Object.assign( {} );
    addAttributeCreation.headMasters = [];
    //////////////////////////////////////////////////////
    this.NewTargetArray.forEach( element => {
      var index = this.targetProducts.indexOf( element )
      this.targetProducts = this.targetProducts.filter( e => e.standardName !== element.standardName );
    } );

    // this.targetProducts.forEach(element => {
    //   var index=this.targetProducts.indexOf(element)
    //   this.NewTargetArray = this.NewTargetArray.filter(e => e.standardName !== element.standardName);
    // });

    // this.NewTargetArray.forEach(function(f){
    //   const headDetail:headDetail=Object.assign({});
    //   headDetail.headMasterId = f.headMasterId ;
    //   addAttributeCreation.removedHeadGroupIdList.push( headDetail  );
    //   //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
    // });

    /////////////////////////////////////////////////////////////


    this.targetProducts.forEach( function ( f ) {
      const headDetail: HeadDetailPHG = Object.assign( {} );
      headDetail.headMasterId = f.headMasterId;
      addAttributeCreation.headMasters.push( headDetail );
      //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
    } );
    addAttributeCreation.headGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
    addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
    //addAttributeCreation.createdBy="nisha";
    addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
    if ( addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0 ) {

      this.companySettingsService.UpdatePHGById( this.headGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.headMasters = [];
        this.targetProducts = [];
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllPayrollHeadGroup();
        this.hidevalue = false;
        this.payrollHeadGroupCreationForm.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }

  copyFrommPayrollHeadGroup( event ): void {
    this.showflag = true;

    this.AttGroupList = [];
    //this.headGroupIdforattributeList = ;
    // this. companySettingsService.GetAttributeOptionListByHeadGroupId( this.headGroupIdforattributeList).subscribe(res => {
    //
    //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
    // });
    this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( event.target.value ).subscribe( ( res: any ) => {

      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach( element => {
        element.toDate = this.datepipe.transform( element.toDate, "dd-MMM-yyyy" );
        element.fromDate = this.datepipe.transform( element.fromDate, "dd-MMM-yyyy" );
      } );
      if ( this.AttGroupList[0].attributeMaster.code != null ) {
        this.AttGroupList.forEach( element => {
          element["code"] = element.attributeMaster.code;
        } );
      }
      this.viewSaveButton = false;
    },
      ( error: any ) => {
        if ( error.status == 404 ) {
          this.getAllAttributeListByAttGroup();
          this.viewSaveButton = true;
        }
      }
    );
  }


  getAllAttributeListByAttGroup() {

    console.log( 'attGrpName', this.AttGrpName );
    // this.selectedCopFormAttGrp=event.target.value;
    this.AttGroupList = [];
    // GetAttributeOptionList(): void {
    this.companySettingsService.GetAttributeOptionListByGroup( this.AttGrpName ).subscribe( res => {

      this.AttGroupList = res.data.results[0].attributeMasters;
      // this.attributeGroupId=res.data.results[0].attributeMasters.attributeGroupId;

      // this.targetProducts.forEach(element => {
      //   var index=this.targetProducts.indexOf(element)
      //   this.sourceProducts = this.sourceProducts.filter(e => e.code !== element.code);
      // });
      this.getAllFormulaList();

      // this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
      //
      //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
      // });

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

  // save(summary:any):void{
  //   this.AttGroupList=summary;
  //   var tt=summary;
  //
  // }

  // saveAtttibuteAssign1(): void{
  //
  //   const cycledata1:SaveAttributeAssignment=Object.assign({});
  //   cycledata1.headGroupId=this.headGroupId;

  //   cycledata1.attributeGroupId=this.AttGroupList.attributeGroupId;//82;//1;
  //   cycledata1.fromDate=this.datepipe.transform(this.AttGroupList.fromDate, "yyyy-MM-dd");
  //   cycledata1.toDate=this.datepipe.transform(this.AttGroupList.toDate, "yyyy-MM-dd");
  //   cycledata1.dependentOn=this.AttGroupList.dependentOn;
  //   cycledata1.value=this.AttGroupList.value;
  //   //cycledata1.createdBy="nisha";
  //   this. companySettingsService.AddAttributeAssignment(cycledata1)
  //   .subscribe((res:any) => {
  //
  //       this.sweetalertMasterSuccess("Success..!!", res.status.message);
  //      // this.todisabletodate=true;
  //   },
  //   (error: any) => {
  //     this.sweetalertError(error["error"]["status"]["message"]);
  //   });

  // }
  UpdateAtttibuteAssign( AttGroupList ): void {
    console.log( 'clicked on save ', AttGroupList );

    //  const addData:UpdateflagCycleCreation=Object.assign({});
    //  addData.mappingGroupRequest=[];
    //  this.AttributeSelectionArray=AttGroupList;
    //  this.AttributeSelectionArray.forEach(element=>{
    //   const cycledata1:SaveAttributeAssignment=Object.assign({});

    //        cycledata1.headGroupId=this.headGroupId;

    // cycledata1.attributeGroupId=element.attributeGroupId;
    // cycledata1.fromDate=this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
    // cycledata1.toDate=this.datepipe.transform(element.toDate, "yyyy-MM-dd");
    // cycledata1.dependentOn=element.dependentOn;
    // cycledata1.value=element.value;
    // cycledata1.payrollHeadGroupMappingId=element.payrollHeadGroupMappingId;

    //
    // addData.mappingGroupRequest.push(cycledata1);
    // });

    // this. companySettingsService.UpdateattributeListById(addData)
    // .subscribe((res:any) => {
    //
    //     this.sweetalertMasterSuccess("Success..!!", res.status.message);

    // },
    // (error: any) => {
    //   this.sweetalertError(error["error"]["status"]["message"]);
    // });
    // this.ServicesList=[];
    // this.payrollHeadGroupCreationForm.reset();
    // this.AttGroupList=[];

    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    const addData: UpdateflagCycleCreation = Object.assign( {} );
    console.log( JSON.stringify( addData ) );
    //  addData.mappingGroupRequest = [];
    this.AttributeSelectionArray = AttGroupList;

    if ( this.ServicesList.length != 0 ) {

      this.ServicesList.forEach( element1 => {
        this.AttributeSelectionArray.forEach( element => {
          const cycledata1: SaveAttributeAssignment = Object.assign( {} );
          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // // if(this.ServicesList.length!=0)
          // // {
          //       this.ServicesList.forEach(element1=>{
          //       //  alert(element1.headGroupId);
          cycledata1.headGroupId = element1;

          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // cycledata1.headGroupId=this.headGroupId;

          cycledata1.attributeGroupId = element.attributeGroupId;
          cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
          cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
          cycledata1.dependentOn = element.dependentOn;
          cycledata1.value = element.value;

          // addData.mappingGroupRequest.push( cycledata1 );
        } );
      } );
    }
    else {
      this.AttributeSelectionArray.forEach( element => {
        const cycledata1: SaveAttributeAssignment = Object.assign( {} );
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // // if(this.ServicesList.length!=0)
        // // {
        //       this.ServicesList.forEach(element1=>{
        //       //  alert(element1.headGroupId);
        // cycledata1.headGroupId=element1;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        cycledata1.headGroupId = this.headMasterId;

        cycledata1.attributeGroupId = element.attributeGroupId;
        cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
        cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
        cycledata1.dependentOn = element.dependentOn;
        cycledata1.value = element.value;

        addData.mappingGroupRequest.push( cycledata1 );
      } );
    }
    this.companySettingsService.AddAttributeAssignment( addData )
      .subscribe( ( res: any ) => {

        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        // this.todisabletodate=true;
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    this.ServicesList = [];
    this.payrollHeadGroupCreationForm.reset();
    this.AttGroupList = [];
    //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");

    // cycledata1.headGroupId=this.headGroupId;
    // cycledata1.attributeGroupId=this.attributeGroupId;
    // cycledata1.fromDate



  }

  saveAtttibuteAssign( AttGroupList ): void {

    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    const addData: UpdateflagCycleCreation = Object.assign( {} );
    addData.mappingGroupRequest = [];
    this.AttributeSelectionArray = AttGroupList;

    if ( this.ServicesList.length != 0 ) {

      this.ServicesList.forEach( element1 => {
        this.AttributeSelectionArray.forEach( element => {
          const cycledata1: SaveAttributeAssignment = Object.assign( {} );
          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // // if(this.ServicesList.length!=0)
          // // {
          //       this.ServicesList.forEach(element1=>{
          //       //  alert(element1.headGroupId);
          cycledata1.headGroupId = element1;

          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // cycledata1.headGroupId=this.headGroupId;

          cycledata1.attributeGroupId = element.attributeGroupId;
          cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
          cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
          cycledata1.dependentOn = element.dependentOn;
          cycledata1.value = element.value;

          addData.mappingGroupRequest.push( cycledata1 );
        } );
      } );
      console.log( 'service list', this.ServicesList );
      console.log( JSON.stringify( addData ) );
    }
    else {
      //   this.AttributeSelectionArray.forEach( element => {
      //     const cycledata1: SaveAttributeAssignment = Object.assign( {} );
      //     ////////////////////////////////////////////////////////////////////////////////////////////////////
      //     // // if(this.ServicesList.length!=0)
      //     // // {
      //     //       this.ServicesList.forEach(element1=>{
      //     //       //  alert(element1.headGroupId);
      //     // cycledata1.headGroupId=element1;

      //     ////////////////////////////////////////////////////////////////////////////////////////////////////
      //     cycledata1.headGroupId = this.headGroupId;

      //     cycledata1.attributeGroupId = element.attributeGroupId;
      //     cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
      //     cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
      //     cycledata1.dependentOn = element.dependentOn;
      //     cycledata1.value = element.value;

      //     addData.mappingGroupRequest.push( cycledata1 );
      //   } );
      // }
      // this.companySettingsService.AddAttributeAssignment( addData )
      //   .subscribe( ( res: any ) => {

      //     this.sweetalertMasterSuccess( "Success..!!", res.status.message );
      //     // this.todisabletodate=true;
      //   },
      //     ( error: any ) => {
      //       this.sweetalertError( error["error"]["status"]["message"] );
      //     } );
      // this.ServicesList = [];
      // this.payrollHeadGroupCreationForm.reset();
      // this.AttGroupList = [];
      //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");

      // cycledata1.headGroupId=this.headGroupId;
      // cycledata1.attributeGroupId=this.attributeGroupId;
      // cycledata1.fromDate
    }
  }

  OntoDateChange( event ): void {

    this.fromDate = this.datepipe.transform( event, "dd-MMM-yyyy" );//event.toISOString() ;
    this.minDate1 = event;//this.datepipe.transform(event, "dd-MMM");//event.toISOString() ;
    //this.minDate1=event.getTime()
    this.AttGroupList.forEach( element => {
      element.fromDate = this.fromDate;
    } );
    //this.minDate=event.getTime() ;
    //    if ((this.Id == undefined || this.Id == '00000000-0000-0000-0000-000000000000')) {
    //       this.EventDetails.patchValue({ RegistrationClosedDate:this.minDate });
    //     }
  }

  OntoDateChangeEvent( event ): void {

    this.toDate = this.datepipe.transform( event, "dd-MMM-yyyy" );//event.toISOString() ;
    this.AttGroupList.forEach( element => {
      element.toDate = this.toDate;
    } );
  }



  //add Payroll HeadGroup
  addPayrollHeadGroup(): void {
    console.log( 'addPayrollHeadGroup' );

    const addAttributeCreation: SavePHG = Object.assign( {} );
    console.log( JSON.stringify( addAttributeCreation ) );
    addAttributeCreation.headMasters = [];
    this.targetProducts.forEach( function ( f ) {

      // var headDetail = new addAttributeCreation.headMasters.headMasterId();
      // headDetail.headMasterId = f.globalHeadMasterId ;
      // addAttributeCreation.headMasters.push( headDetail  );
      const headDetail: headDetail = Object.assign( {} );
      headDetail.headMasterId = f.headMasterId;
      addAttributeCreation.headMasters.push( headDetail );
      //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
    } );
    addAttributeCreation.headGroupDefinitionName = this.PHGName;
    addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
    addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
    addAttributeCreation.countryId = 1;
    addAttributeCreation.createdBy = "nisha";
    addAttributeCreation.isActive = true;
    // addAttributeCreation.attributeNature=this.payrollHeadGroupCreationForm.value.attributeNature;
    console.log( JSON.stringify( addAttributeCreation ) );
    if ( addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0 ) {

      this.companySettingsService.AddPayrollHeadGroup( addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.headMasters = [];
        this.targetProducts = [];
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllPayrollHeadGroup();
        this.getAllHeadCreation();
        //this.hidevalue=false;
        this.payrollHeadGroupCreationForm.reset();
      },
        ( error: any ) => {
          //  this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
    else {

      // this.companySettingsService.UpdateBusinessYear( addAttributeCreation.attributeGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {

      //   this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      //   this.getAllAttributeSelection();
      //   this.payrollHeadGroupCreationForm.reset();
      //   // this.updateFlag=false;
      // },
      //   ( error: any ) => {
      //     this.alertService.sweetalertError( error["error"]["status"]["message"] );
      //   } );
    }
  }


  getPHGname( event ): void {
    this.sourceProducts = [];
    this.sourceProducts = this.originalSourceProductList;
    if ( event.target.value == '' ) {
      this.targetProducts = [];

    } else {

      this.selectedCopFormPHGName = event.target.value;

      // GetAttributeOptionList(): void {
      this.companySettingsService.GetHeadListByPHGname( this.selectedCopFormPHGName ).subscribe( res => {

        this.targetProducts = res.data.results[0].headMasters;

        this.targetProducts.forEach( element => {
          element.disabled = true;
          var index = this.targetProducts.indexOf( element )
          this.sourceProducts = this.sourceProducts.filter( e => e.standardName !== element.standardName );
        } );

        // this.targetProducts.forEach(element => {
        //   var index=this.targetProducts.indexOf(element)
        //   this.sourceProducts = this.sourceProducts.filter(e => e.code !== element.code);
        // });
        this.dropdownList = this.HeadNameList;

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'headGroupId',
          textField: 'standardName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 2,
          allowSearchFilter: true
        };

      } );

    }

  }


  UploadModalYesNo( template: TemplateRef<any> ) {
    this.modalRef1 = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-lg' } )
    );
  }
  UploadModal2( template: TemplateRef<any> ) {
    console.log( 'headmaster id', this.headMasterId )

    this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headMasterId ).subscribe( ( res: any ) => {

      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach( element => {
        element.toDate = this.datepipe.transform( element.toDate, "dd-MMM-yyyy" );
        element.fromDate = this.datepipe.transform( element.fromDate, "dd-MMM-yyyy" );
      } );

      if ( this.AttGroupList[0].attributeMaster.code != null ) {
        this.AttGroupList.forEach( element => {
          element["code"] = element.attributeMaster.code;

        } );
      }
      // else{

      // }

    },
      ( error: any ) => {
        if ( error.status == 404 ) {
          this.getAllAttributeListByAttGroup();
          this.viewSaveButton = true;
        }
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      }
    );
    //});
    // if(this.AttGroupList.length==0)
    // {
    //   this.getAllAttributeListByAttGroup();
    //   this.viewSaveButton=true;
    // }
    // callBack('template12445');
    //  this.UploadModal2('template12445');
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-xl' } )

    );


    //});
    // if(this.AttGroupList.length==0)
    // {
    //   this.getAllAttributeListByAttGroup();
    // }

    // this.modalRef = this.modalService.show(
    //     template,
    //     Object.assign({}, { class: 'gray modal-xl' })

    // );
  }

  //************* */
  //   UploadModal22(){
  //   return new Promise((resolve, reject) => {

  //     this. companySettingsService.GetAttributeOptionListByHeadGroupIdGetById(283).subscribe(res => {
  //
  //       this.AttGroupList =res.data.results[0];//[0].attributeMasters;

  //     if (this.AttGroupList.length == 0 )
  //        reject('nodata');
  //        else
  //        resolve('gotdata');

  //     });

  //   });
  // }



}
