import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { headDetailPHG, SaveAttributeAssignment, SavePHG, UpdateflagCycleCreation, UpdateflagCycleCreationPHG } from '../model/business-cycle-model';

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

  AttributeCreationForm: FormGroup;
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
  selectedLevel;
  attributeGroupId: number;
  headGroupId: number;
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
  headGroupIdforattributeList: number;
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

  constructor(
    private modalService: BsModalService,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private companySettingsService: CompanySettingsService,
  ) { }


  modalRef: BsModalRef;
  modalRef1: BsModalRef;


  ngOnInit(): void {
    this.getAllAttributeSelection();
    this.getAllPayrollHeadGroup();
    this.getAllHeadCreation();

    // this.getAllFormulaList();
    // this.getAllSDMList();

    // get All HeadCreation
    //getAllHeadCreation(): void {

    // this. companySettingsService.getAllHeadCreation().subscribe(res => {
    //
    //         this.dropdownList = res.data.results;
    //         });
    //      // }

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'headGroupId',
    //   textField: 'standardName',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 2,
    //   allowSearchFilter: true
    // };


    this.AttributeCreationForm = this.formBuilder.group( {
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
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.viewupdateButton = false;

    // this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
    //
    //   this.sourceProducts = res.data.results;
    //   });

    this.targetProducts = [];
    this.getAllHeadCreation();
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
        this.AttributeCreationForm.patchValue( { headGroupDefinitionName: response.data.results[0].headGroupDefinitionName } );
        this.AttributeCreationForm.patchValue( { description: response.data.results[0].description } );
        this.AttributeCreationForm.patchValue( { attributeNature: response.data.results[0].attributeGroupName } );
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

        this.sweetalertMasterSuccess( "Success..!!", response.status.message )
        this.getAllPayrollHeadGroup();
        this.AttributeCreationForm.reset();
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
      idField: 'headGroupId',
      textField: 'standardName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    ////////////////////////////////////////////////////////////////
    this.headGroupId = u.headGroupId;
    //this.attributeGroupId=
    this.HeadName = u.standardName;
    this.Nature = u.headNature;
    // this.getAllAttributeListByAttGroup();
    //if(this.selectedUser2.includes)
    this.selectedUser2.push( u );

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

  // AttributeAssignmentClick(u:any): void
  // {
  //
  //   this.headGroupIdList=u;
  // }
  SaveNext( AttGroupList ): void {

    //////////////////////////////Save one headgroup////////////////////////////////////////////
    // const addData: UpdateflagCycleCreationPHG = Object.assign( {} );
    // addData.mappingGroupRequest = [];
    // this.AttributeSelectionArray = AttGroupList;
    // this.AttributeSelectionArray.forEach( element => {
    //   const cycledata1: SaveAttributeAssignment = Object.assign( {} );

    //   cycledata1.headGroupId = this.headGroupId;

    //   cycledata1.attributeGroupId = element.attributeGroupId;
    //   cycledata1.fromDate = this.datepipe.transform( element.fromDate, "yyyy-MM-dd" );
    //   cycledata1.toDate = this.datepipe.transform( element.toDate, "yyyy-MM-dd" );
    //   cycledata1.dependentOn = element.dependentOn;
    //   cycledata1.value = element.value;
    //   cycledata1.payrollHeadGroupMappingId = element.payrollHeadGroupMappingId;


    //   addData.mappingGroupRequest.push( cycledata1 );
    // } );

    // this.companySettingsService.UpdateattributeListById( addData )
    //   .subscribe( ( res: any ) => {
    //     debugger
    //     this.sweetalertMasterSuccess( "Success..!!", res.status.message );

    //   },
    //     ( error: any ) => {
    //       this.sweetalertError( error["error"]["status"]["message"] );
    //     } );
    // this.ServicesList = [];
    // this.AttributeCreationForm.reset();
    // this.AttGroupList = [];

    // // const cycledata1:SaveAttributeAssignment=Object.assign({});
    // //////////////////////////////Save one end////////////////////////////////////////////
    // this.NextheadGroupId = this.HeadNameList[0].headGroupId;
    // this.headGroupId = this.NextheadGroupId;
    // this.HeadName = this.HeadNameList[0].standardName;

    // this.HeadNameList.forEach( element => {
    //   //  this.NextheadGroupId=element.headGroupId;
    //   this.HeadNameList = this.HeadNameList.filter( e => e.headGroupId !== this.NextheadGroupId );
    // } );
    // this.AttGroupList = [];

    // this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.NextheadGroupId ).subscribe( ( res: any ) => {
    //   debugger
    //   this.AttGroupList = res.data.results[0];//[0].attributeMasters;
    //   this.AttGroupList.forEach( element => {
    //     element.toDate = this.datepipe.transform( element.toDate, "dd-MMM-yyyy" );
    //     element.fromDate = this.datepipe.transform( element.fromDate, "dd-MMM-yyyy" );
    //   } );

    //   if ( this.AttGroupList[0].attributeMaster.code != null ) {
    //     this.AttGroupList.forEach( element => {
    //       element["code"] = element.attributeMaster.code;

    //     } );
    //   }
    // },
    //   ( error: any ) => {
    //     if ( error.status == 404 ) {
    //       this.getAllAttributeListByAttGroup();
    //       //this.viewSaveButton=true;
    //     }
    //     // this.sweetalertError(error["error"]["status"]["message"]);
    //   }
    // );
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
      idField: 'headGroupId',
      textField: 'standardName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    ////////////////////////////////////////////////////////////////
    this.headGroupId = u.headGroupId;
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
      const headDetail: headDetailPHG = Object.assign( {} );
      headDetail.headMasterId = f.headMasterId;
      addAttributeCreation.headMasters.push( headDetail );
      //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
    } );
    addAttributeCreation.headGroupDefinitionName = this.AttributeCreationForm.value.headGroupDefinitionName;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    //addAttributeCreation.createdBy="nisha";
    addAttributeCreation.attributeGroupName = this.AttributeCreationForm.value.attributeNature;
    if ( addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0 ) {

      this.companySettingsService.UpdatePHGById( this.headGroupDefinitionId, addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.headMasters = [];
        this.targetProducts = [];
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.sweetalertMasterSuccess( "Success..!!", res.status.message );
        this.getAllPayrollHeadGroup();
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
      },
        ( error: any ) => {
          this.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }

  onStatusChange23( event ): void {
    this.showflag = true;

    this.AttGroupList = [];
    this.headGroupIdforattributeList = event.target.value;
    // this. companySettingsService.GetAttributeOptionListByHeadGroupId( this.headGroupIdforattributeList).subscribe(res => {
    //
    //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
    // });
    this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupIdforattributeList ).subscribe( ( res: any ) => {

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
    // this.AttributeCreationForm.reset();
    // this.AttGroupList=[];

    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    const addData: UpdateflagCycleCreation = Object.assign( {} );
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
        cycledata1.headGroupId = this.headGroupId;

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

        this.sweetalertMasterSuccess( "Success..!!", res.status.message );
        // this.todisabletodate=true;
      },
        ( error: any ) => {
          this.sweetalertError( error["error"]["status"]["message"] );
        } );
    this.ServicesList = [];
    this.AttributeCreationForm.reset();
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
      // this.AttributeCreationForm.reset();
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

    const addAttributeCreation: SavePHG = Object.assign( {} );
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
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    addAttributeCreation.attributeGroupName = this.AttributeCreationForm.value.attributeNature;
    addAttributeCreation.countryId = 1;
    addAttributeCreation.createdBy = "nisha";
    addAttributeCreation.isActive = true;
    // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
    if ( addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0 ) {

      this.companySettingsService.AddPayrollHeadGroup( addAttributeCreation ).subscribe( ( res: any ) => {

        addAttributeCreation.headMasters = [];
        this.targetProducts = [];
        this.sweetalertMasterSuccess( "Success..!!", res.status.message );
        this.getAllPayrollHeadGroup();
        this.getAllHeadCreation();
        //this.hidevalue=false;
        this.AttributeCreationForm.reset();
      },
        ( error: any ) => {
          this.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
    else {
      //
      //   this.attributeSelectionService.UpdateBusinessYear(addAttributeCreation.attributeGroupDefinitionId,addAttributeCreation).subscribe((res:any )=> {
      //
      //   this.sweetalertMasterSuccess("Updated..!!", res.status.message);
      //   this.getAllAttributeSelection();
      //   this.AttributeCreationForm.reset();
      //  // this.updateFlag=false;
      //   },
      //   (error: any) => {
      //      this.sweetalertError(error["error"]["status"]["message"]);
      //    });
    }
  }


  getPHGname( event ): void {

    this.selectedCopFormPHGName = event.target.value;

    // GetAttributeOptionList(): void {
    this.companySettingsService.GetHeadListByPHGname( this.selectedCopFormPHGName ).subscribe( res => {

      this.targetProducts = res.data.results[0].headMasters;

      this.targetProducts.forEach( element => {
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


  UploadModalYesNo( template: TemplateRef<any> ) {
    this.modalRef1 = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-lg' } )
    );
  }
  UploadModal2( template: TemplateRef<any> ) {

    this.companySettingsService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId ).subscribe( ( res: any ) => {

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
        // this.sweetalertError(error["error"]["status"]["message"]);
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



  //********* */


  sweetalert7( message: any ) {
    Swal.fire( {
      text: message,
    } )
  }

  sweetalertWarning( message: any ) {
    Swal.fire( {
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      background: '#e68a00',
      icon: 'warning',
      timer: 15000,
      timerProgressBar: true,
    } )
  }

  sweetalertInfo( message: any ) {
    Swal.fire( {
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'info',
      timer: 15000,
      timerProgressBar: true,
    } )
  }

  sweetalertMasterSuccess( message: any, text: any ) {
    Swal.fire( {
      title: message,
      text: text,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'success',
      timer: 15000,
      timerProgressBar: true,
    } )
  }

  sweetalertError( message: any ) {
    Swal.fire( {
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'error',
      timer: 15000,
      timerProgressBar: true,
    } )
  }

}
