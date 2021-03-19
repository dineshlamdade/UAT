import { CompanySettingsService } from './../company-settings.service';
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { FormArray, AbstractControl } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';
import { MyInvestmentsService } from './../../my-Investments/my-Investments.service';

import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { FileService } from '../../my-Investments/file.service';

import { NumberFormatPipe } from './../../../core/utility/pipes/NumberFormatPipe';
import { from } from 'rxjs';
//import { SavePHG, headDetail, SaveAttributeSelection, SaveAttributeAssignment, UpdateflagCycleCreation } from './payrollheadgroupcreation.model';

//sneha
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
/////////////////bharati
//import { SaveAttributeCreation} from './attributecreation.model';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { de } from 'date-fns/locale';
import { element } from 'protractor';
import { DropdownModule } from 'primeng/dropdown';
//import { PrimeIcons} from 'primeng/api';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

export class SavePHG {
  headGroupDefinitionId: number;
  headGroupDefinitionName: string;
  attributeGroupName: string;
  description: string;
  //  headMasters:any[];
  countryId: number;
  headMasters: headDetail[];
  removedHeadGroupIdList: any[];
  createdBy: string;
  isActive: boolean;
}

export class headDetail {
  headMasterId: number;
}


export class headDetail1 {
  constructor() {

  }

  headMasterId: number;
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
export class UpdateflagCycleCreation {
  mappingGroupRequest: SaveAttributeAssignment[];

}
export class SaveAttributeAssignment {
  headGroupId: number;
  attributeGroupId: number
  value: string;
  dependentOn: string;
  fromDate: string;
  toDate: string;
  payrollHeadGroupMappingId: number;
  //createdBy:string;
  //createdBy:string;
  // "createdBy":"nisha",
  //  "createDate":"1990/11/11 00:00:00",
  //  "isActive":"true",
  //  "lastModifiedBy":"nisha",
  //  "lastModifiedDateTime":"1990/11/11 00:00:00"
}


@Component({
  selector: 'app-payroll-head-group-creation',
  templateUrl: './payroll-head-group-creation.component.html',
  styleUrls: ['./payroll-head-group-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
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
    private payrollheadgroupcreationService: CompanySettingsService,
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

    // this.payrollheadgroupcreationService.getAllHeadCreation().subscribe(res => {
    //     debugger
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


    this.AttributeCreationForm = this.formBuilder.group({
      attributeGroupDefinitionId: new FormControl(null,),
      headGroupDefinitionName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      attributeNature: new FormControl('', Validators.required),
      //  optionList: new FormControl('',Validators.required),
      // optionList: this.formBuilder.array([]),
      // type: new FormControl('', ),
      // isStatutory: new FormControl('0'),
    });
  }


  onItemSelect(item: any) {
    debugger
    this.Multiselectflag = true;
    // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
    // this.ServicesList=[];
    this.ServicesList.push(item.headGroupId)
    console.log(item);
  }
  onItemDeSelect(item: any) {
    debugger
    // this.CycleDefinationForm.controls.serviceName.push(item.serviceName)
    // this.ServicesList=[];
    var index = this.ServicesList.indexOf(item.headGroupId)
    if (index > -1) {
      this.ServicesList.splice(index, 1)
    }
    console.log(item);
  }

  onSelectAll(items: any) {
    debugger
    // this.ServicesList.forEach(function(f){
    //   addCycleDefinition.serviceName.push(f);
    // });

    items.forEach(element => {
      this.ServicesList.push(element.headGroupId)
    });
    //this.ServicesList.push(items.serviceName)
    debugger
    console.log(items);
  }
  onDeSelectAll(items: any) {
    this.ServicesList = [];
  }


  sweetalert7(message: any) {
    Swal.fire({
      text: message,
    })
  }

  sweetalertWarning(message: any) {
    Swal.fire({
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
    })
  }

  sweetalertInfo(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'info',
      timer: 15000,
      timerProgressBar: true,
    })
  }

  sweetalertMasterSuccess(message: any, text: any) {
    Swal.fire({
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
    })
  }

  sweetalertError(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'error',
      timer: 15000,
      timerProgressBar: true,
    })
  }

  resetAttributeSelection(): void {
    this.AttributeCreationForm.reset();
    this.viewCancelButton = false;
    this.hidevalue = false;
    this.viewupdateButton = false;

    // this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
    //   debugger
    //   this.sourceProducts = res.data.results;
    //   });

    this.targetProducts = [];
    this.getAllHeadCreation();
  }

  // get All Attribute Selection(Attribute Group)
  getAllAttributeSelection(): void {
    this.payrollheadgroupcreationService.getAllAttributeSelection().subscribe(res => {
      debugger
      this.AttributeSelectionList = res.data.results;
      //this.attributeGroupId=
    });
  }
  // get All  Payroll HeadGroup
  getAllPayrollHeadGroup(): void {
    this.payrollheadgroupcreationService.getAllPayrollHeadGroup().subscribe(res => {
      debugger
      this.PayrollHeadGroupList = res.data.results;
    });
  }

  // get All  Payroll HeadGroup
  getAllFormulaList(): void {
    this.payrollheadgroupcreationService.getFromulaForFormulaMaster().subscribe(res => {
      debugger
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

    });
  }

  //        // get All  Payroll HeadGroup
  // getAllSDMList(): void {
  //   this.payrollheadgroupcreationService.getSDMFormula().subscribe(res => {
  //       debugger
  //       this.SDMArray = res.data.results[0].originalFormula;
  //       });
  //     }

  // get All HeadCreation
  getAllHeadCreation(): void {
    this.payrollheadgroupcreationService.getAllHeadCreation().subscribe(res => {
      debugger
      this.sourceProducts = res.data.results;
    });
  }

  // Get PHG ById
  GetPHGByIdDisable(id): void {
    debugger;
    // this.disabled= false;
    this.viewupdateButton = true;
    // this.viewCancelButton= true;
    this.headGroupDefinitionId = id;
    this.targetProducts = [];  //added new
    //this.getAllHeadCreation();
    this.payrollheadgroupcreationService.GetPHGById(id)
      .subscribe(response => {
        debugger
        response.data.results[0].headMasters.forEach(element => {
          this.NewTargetArray.push(element);
        });

        //this.getAllHeadCreation();
        this.targetProducts = response.data.results[0].headMasters;
        //this.NewTargetArray=response.data.results[0].headMasters;


        this.targetProducts.forEach(element => {
          var index = this.targetProducts.indexOf(element)
          this.sourceProducts = this.sourceProducts.filter(e => e.standardName !== element.standardName);
        });
        //  this.HeadCreationForm.patchValue({ id: response.data.results[0].globalHeadMasterId });
        this.AttributeCreationForm.patchValue({ headGroupDefinitionName: response.data.results[0].headGroupDefinitionName });
        this.AttributeCreationForm.patchValue({ description: response.data.results[0].description });
        this.AttributeCreationForm.patchValue({ attributeNature: response.data.results[0].attributeGroupName });
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
      });
    // this.getAllHeadCreation();
  }



  //Delete Payroll HeadGroup by id
  DeletePayrollHeadGroup(id): void {
    debugger;
    // this.CycleupdateFlag=false;
    // this.CycleupdateFlag1=false;
    this.payrollheadgroupcreationService.DeletePayrollHeadGroup(id)
      .subscribe(response => { //: saveBusinessYear[]
        debugger
        this.sweetalertMasterSuccess("Success..!!", response.status.message)
        this.getAllPayrollHeadGroup();
        this.AttributeCreationForm.reset();
        // this.targetProducts=[];
      });
  }

  onChangeEvent(event: any): void {
    debugger;
    this.PHGName = event.target.value;
  }
  onStatusChange(event) {
    debugger
    this.AttGrpName = event.target.value;
    this.attributeGroupId = event.target.value;
  }
  onChangeDropDown(event) {
    debugger
    this.AttGrpName = event.target.value;
    this.attributeGroupId = event.target.value;
  }

  inputChanged(element: HTMLElement) {
    debugger
    alert(element.getAttribute('attributeNature')) // item_name
  }

  selected() {
    alert(this.selectedLevel.name)
  }

  RowSelected(u: any) {
    debugger
    this.selectedUser.push(u);
    console.log("selected user", this.selectedUser);
    //this.targetProducts.push(u);
    // declare variable in component.
  }
  lefttablePusg(): void {
    debugger
    // const sss=this.newarray;
    // this.selectedUser.forEach(function(f){
    //  sss.push(f);
    // });

    this.selectedUser.forEach(element => {
      this.targetProducts.push(element);
    });

    var v = this.selectedUser;

    //  v.forEach(element => {
    //     this.targetProducts.push(element);
    //   });

    // for(var i=0;i<v.length;++i)
    // {
    // this.targetProducts.push(v[0]);
    // }

    this.selectedUser.forEach(element => {
      var index = this.sourceProducts.indexOf(element)
      this.selectedUser = [];
      if (index > -1) {
        this.sourceProducts.splice(index, 1)
      }
    });


    // var index=this.sourceProducts.indexOf(this.selectedUser[0])
    // this.selectedUser=[];
    // if (index > -1) {
    //  this.sourceProducts.splice(index,1)
    // this.selectedUser=[];

    // }
    // this.sourceProducts.splice(this.selectedUser.indexOf(0))
  }
  RowSelectedtargetProducts(u: any): void {
    debugger
    /////////////////////////////////////////////////////
    this.selectedheadName.push(u);
    this.HeadNameList = this.targetProducts;

    this.selectedheadName.forEach(element => {
      var index = this.targetProducts.indexOf(element)
      this.HeadNameList = this.HeadNameList.filter(e => e.standardName !== element.standardName);
    });

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
    this.selectedUser2.push(u);

    //   this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
    //     debugger
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
  //   debugger
  //   this.headGroupIdList=u;
  // }
  SaveNext(AttGroupList): void {
    debugger;
    //////////////////////////////Save one headgroup////////////////////////////////////////////
    const addData: UpdateflagCycleCreation = Object.assign({});
    addData.mappingGroupRequest = [];
    this.AttributeSelectionArray = AttGroupList;
    this.AttributeSelectionArray.forEach(element => {
      const cycledata1: SaveAttributeAssignment = Object.assign({});

      cycledata1.headGroupId = this.headGroupId;

      cycledata1.attributeGroupId = element.attributeGroupId;
      cycledata1.fromDate = this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
      cycledata1.toDate = this.datepipe.transform(element.toDate, "yyyy-MM-dd");
      cycledata1.dependentOn = element.dependentOn;
      cycledata1.value = element.value;
      cycledata1.payrollHeadGroupMappingId = element.payrollHeadGroupMappingId;

      debugger;
      addData.mappingGroupRequest.push(cycledata1);
    });

    this.payrollheadgroupcreationService.UpdateattributeListById(addData)
      .subscribe((res: any) => {
        debugger
        this.sweetalertMasterSuccess("Success..!!", res.status.message);

      },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });
    this.ServicesList = [];
    this.AttributeCreationForm.reset();
    this.AttGroupList = [];

    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    //////////////////////////////Save one end////////////////////////////////////////////
    this.NextheadGroupId = this.HeadNameList[0].headGroupId;
    this.headGroupId = this.NextheadGroupId;
    this.HeadName = this.HeadNameList[0].standardName;

    this.HeadNameList.forEach(element => {
      //  this.NextheadGroupId=element.headGroupId;
      this.HeadNameList = this.HeadNameList.filter(e => e.headGroupId !== this.NextheadGroupId);
    });
    this.AttGroupList = [];

    this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.NextheadGroupId).subscribe((res: any) => {
      debugger
      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach(element => {
        element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        element.fromDate = this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
      });

      if (this.AttGroupList[0].attributeMaster.code != null) {
        this.AttGroupList.forEach(element => {
          element["code"] = element.attributeMaster.code;

        });
      }
    },
      (error: any) => {
        if (error.status == 404) {
          this.getAllAttributeListByAttGroup();
          //this.viewSaveButton=true;
        }
        // this.sweetalertError(error["error"]["status"]["message"]);
      }
    );
  }

  Next(): void {
    debugger;
    this.NextheadGroupId = this.HeadNameList[0].headGroupId;
    this.HeadName = this.HeadNameList[0].standardName;

    this.HeadNameList.forEach(element => {
      //  this.NextheadGroupId=element.headGroupId;
      this.HeadNameList = this.HeadNameList.filter(e => e.headGroupId !== this.NextheadGroupId);
    });
    this.AttGroupList = [];
    this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.NextheadGroupId).subscribe((res: any) => {
      debugger
      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach(element => {
        element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        element.fromDate = this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
      });

      if (this.AttGroupList[0].attributeMaster.code != null) {
        this.AttGroupList.forEach(element => {
          element["code"] = element.attributeMaster.code;

        });
      }
    },
      (error: any) => {
        if (error.status == 404) {
          this.getAllAttributeListByAttGroup();
          //this.viewSaveButton=true;
        }
        // this.sweetalertError(error["error"]["status"]["message"]);
      }
    );
  }


  RowSelectedtargetProducts2(u: any): void {
    debugger
    /////////////////////////////////////////////////////
    this.selectedheadName.push(u);
    this.HeadNameList = this.targetProducts;

    this.selectedheadName.forEach(element => {
      var index = this.targetProducts.indexOf(element)
      this.HeadNameList = this.HeadNameList.filter(e => e.standardName !== element.standardName);
    });

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

    //   this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
    //     debugger
    //     this.AttGroupList =res.data.results[0];//[0].attributeMasters;
    //    // callBack('template12445');
    //  //  this.UploadModal2('template12445');

    //   });

    //   if(this.AttGroupList.length==0)
    //   {
    //     this.getAllAttributeListByAttGroup();
    //   }


  }

  righttablePusg(u: any): void {
    debugger
    this.selectedUser2.forEach(element => {
      this.sourceProducts.push(element);
    });
    var v = this.selectedUser;

    this.selectedUser2.forEach(element => {
      var index = this.targetProducts.indexOf(element)
      this.selectedUser2 = [];
      if (index > -1) {
        this.targetProducts.splice(index, 1)
      }
    });

    //   var index=this.targetProducts.indexOf(this.selectedUser2[0])
    //   this.selectedUser2=[];
    //   if (index > -1) {
    //    this.targetProducts.splice(index,1)

    // }
  }
  // onStatusChange2(event):void{
  //   this.AttGroupList=[];
  //   this.AttGrpName1=event.target.value;
  //   this.payrollheadgroupcreationService.GetAttributeOptionListByGroup( this.AttGrpName1).subscribe(res => {
  //     debugger
  //     this.AttGroupList =res.data.results[0].attributeMasters;
  //   });

  // }


  UpdatePHGById(): void {
    debugger
    const addAttributeCreation: SavePHG = Object.assign({});
    addAttributeCreation.headMasters = [];
    //////////////////////////////////////////////////////
    this.NewTargetArray.forEach(element => {
      var index = this.targetProducts.indexOf(element)
      this.targetProducts = this.targetProducts.filter(e => e.standardName !== element.standardName);
    });

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


    this.targetProducts.forEach(function (f) {
      const headDetail: headDetail = Object.assign({});
      headDetail.headMasterId = f.headMasterId;
      addAttributeCreation.headMasters.push(headDetail);
      //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
    });
    addAttributeCreation.headGroupDefinitionName = this.AttributeCreationForm.value.headGroupDefinitionName;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    //addAttributeCreation.createdBy="nisha";
    addAttributeCreation.attributeGroupName = this.AttributeCreationForm.value.attributeNature;
    if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {

      this.payrollheadgroupcreationService.UpdatePHGById(this.headGroupDefinitionId, addAttributeCreation).subscribe((res: any) => {
        debugger
        addAttributeCreation.headMasters = [];
        this.targetProducts = [];
        this.viewCancelButton = false;
        this.viewupdateButton = false;
        this.sweetalertMasterSuccess("Success..!!", res.status.message);
        this.getAllPayrollHeadGroup();
        this.hidevalue = false;
        this.AttributeCreationForm.reset();
      },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });
    }
  }

  onStatusChange23(event): void {
    this.showflag = true;
    debugger
    this.AttGroupList = [];
    this.headGroupIdforattributeList = event.target.value;
    // this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupId( this.headGroupIdforattributeList).subscribe(res => {
    //   debugger
    //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
    // });
    this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.headGroupIdforattributeList).subscribe((res: any) => {
      debugger
      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach(element => {
        element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        element.fromDate = this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
      });
      if (this.AttGroupList[0].attributeMaster.code != null) {
        this.AttGroupList.forEach(element => {
          element["code"] = element.attributeMaster.code;
        });
      }
      this.viewSaveButton = false;
    },
      (error: any) => {
        if (error.status == 404) {
          this.getAllAttributeListByAttGroup();
          this.viewSaveButton = true;
        }
      }
    );
  }


  getAllAttributeListByAttGroup() {
    debugger
    // this.selectedCopFormAttGrp=event.target.value;
    this.AttGroupList = [];
    // GetAttributeOptionList(): void {
    this.payrollheadgroupcreationService.GetAttributeOptionListByGroup(this.AttGrpName).subscribe(res => {
      debugger
      this.AttGroupList = res.data.results[0].attributeMasters;
      // this.attributeGroupId=res.data.results[0].attributeMasters.attributeGroupId;

      // this.targetProducts.forEach(element => {
      //   var index=this.targetProducts.indexOf(element)
      //   this.sourceProducts = this.sourceProducts.filter(e => e.code !== element.code);
      // });
      this.getAllFormulaList();

      // this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById( this.headGroupId).subscribe(res => {
      //   debugger
      //   this.AttGroupList =res.data.results[0];//[0].attributeMasters;
      // });

      //  this.attributeSelectionService.getAllAttributeCreation().subscribe(res => {
      //     debugger
      //     this.sourceProducts = res.data.results;
      //     });

      // this.targetProducts.forEach(element => {
      //   var index=this.targetProducts.indexOf(element)
      //   this.sourceProducts = this.sourceProducts.filter(e => e.code == element.code);
      // });

    });
  }

  // save(summary:any):void{
  //   this.AttGroupList=summary;
  //   var tt=summary;
  //   debugger;
  // }

  // saveAtttibuteAssign1(): void{
  //   debugger
  //   const cycledata1:SaveAttributeAssignment=Object.assign({});
  //   cycledata1.headGroupId=this.headGroupId;

  //   cycledata1.attributeGroupId=this.AttGroupList.attributeGroupId;//82;//1;
  //   cycledata1.fromDate=this.datepipe.transform(this.AttGroupList.fromDate, "yyyy-MM-dd");
  //   cycledata1.toDate=this.datepipe.transform(this.AttGroupList.toDate, "yyyy-MM-dd");
  //   cycledata1.dependentOn=this.AttGroupList.dependentOn;
  //   cycledata1.value=this.AttGroupList.value;
  //   //cycledata1.createdBy="nisha";
  //   this.payrollheadgroupcreationService.AddAttributeAssignment(cycledata1)
  //   .subscribe((res:any) => {
  //       debugger
  //       this.sweetalertMasterSuccess("Success..!!", res.status.message);
  //      // this.todisabletodate=true;
  //   },
  //   (error: any) => {
  //     this.sweetalertError(error["error"]["status"]["message"]);
  //   });

  // }
  UpdateAtttibuteAssign(AttGroupList): void {
    debugger;
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

    // debugger;
    // addData.mappingGroupRequest.push(cycledata1);
    // });

    // this.payrollheadgroupcreationService.UpdateattributeListById(addData)
    // .subscribe((res:any) => {
    //     debugger
    //     this.sweetalertMasterSuccess("Success..!!", res.status.message);

    // },
    // (error: any) => {
    //   this.sweetalertError(error["error"]["status"]["message"]);
    // });
    // this.ServicesList=[];
    // this.AttributeCreationForm.reset();
    // this.AttGroupList=[];

    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    const addData: UpdateflagCycleCreation = Object.assign({});
    addData.mappingGroupRequest = [];
    this.AttributeSelectionArray = AttGroupList;

    if (this.ServicesList.length != 0) {

      this.ServicesList.forEach(element1 => {
        this.AttributeSelectionArray.forEach(element => {
          const cycledata1: SaveAttributeAssignment = Object.assign({});
          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // // if(this.ServicesList.length!=0)
          // // {
          //       this.ServicesList.forEach(element1=>{
          //       //  alert(element1.headGroupId);
          cycledata1.headGroupId = element1;

          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // cycledata1.headGroupId=this.headGroupId;

          cycledata1.attributeGroupId = element.attributeGroupId;
          cycledata1.fromDate = this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
          cycledata1.toDate = this.datepipe.transform(element.toDate, "yyyy-MM-dd");
          cycledata1.dependentOn = element.dependentOn;
          cycledata1.value = element.value;
          debugger;
          addData.mappingGroupRequest.push(cycledata1);
        });
      });
    }
    else {
      this.AttributeSelectionArray.forEach(element => {
        const cycledata1: SaveAttributeAssignment = Object.assign({});
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // // if(this.ServicesList.length!=0)
        // // {
        //       this.ServicesList.forEach(element1=>{
        //       //  alert(element1.headGroupId);
        // cycledata1.headGroupId=element1;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        cycledata1.headGroupId = this.headGroupId;

        cycledata1.attributeGroupId = element.attributeGroupId;
        cycledata1.fromDate = this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
        cycledata1.toDate = this.datepipe.transform(element.toDate, "yyyy-MM-dd");
        cycledata1.dependentOn = element.dependentOn;
        cycledata1.value = element.value;
        debugger;
        addData.mappingGroupRequest.push(cycledata1);
      });
    }
    this.payrollheadgroupcreationService.AddAttributeAssignment(addData)
      .subscribe((res: any) => {
        debugger
        this.sweetalertMasterSuccess("Success..!!", res.status.message);
        // this.todisabletodate=true;
      },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });
    this.ServicesList = [];
    this.AttributeCreationForm.reset();
    this.AttGroupList = [];
    //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");

    // cycledata1.headGroupId=this.headGroupId;
    // cycledata1.attributeGroupId=this.attributeGroupId;
    // cycledata1.fromDate



  }

  saveAtttibuteAssign(AttGroupList): void {
    debugger;
    // const cycledata1:SaveAttributeAssignment=Object.assign({});
    const addData: UpdateflagCycleCreation = Object.assign({});
    addData.mappingGroupRequest = [];
    this.AttributeSelectionArray = AttGroupList;

    if (this.ServicesList.length != 0) {

      this.ServicesList.forEach(element1 => {
        this.AttributeSelectionArray.forEach(element => {
          const cycledata1: SaveAttributeAssignment = Object.assign({});
          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // // if(this.ServicesList.length!=0)
          // // {
          //       this.ServicesList.forEach(element1=>{
          //       //  alert(element1.headGroupId);
          cycledata1.headGroupId = element1;

          ////////////////////////////////////////////////////////////////////////////////////////////////////
          // cycledata1.headGroupId=this.headGroupId;

          cycledata1.attributeGroupId = element.attributeGroupId;
          cycledata1.fromDate = this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
          cycledata1.toDate = this.datepipe.transform(element.toDate, "yyyy-MM-dd");
          cycledata1.dependentOn = element.dependentOn;
          cycledata1.value = element.value;
          debugger;
          addData.mappingGroupRequest.push(cycledata1);
        });
      });
    }
    else {
      this.AttributeSelectionArray.forEach(element => {
        const cycledata1: SaveAttributeAssignment = Object.assign({});
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // // if(this.ServicesList.length!=0)
        // // {
        //       this.ServicesList.forEach(element1=>{
        //       //  alert(element1.headGroupId);
        // cycledata1.headGroupId=element1;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        cycledata1.headGroupId = this.headGroupId;

        cycledata1.attributeGroupId = element.attributeGroupId;
        cycledata1.fromDate = this.datepipe.transform(element.fromDate, "yyyy-MM-dd");
        cycledata1.toDate = this.datepipe.transform(element.toDate, "yyyy-MM-dd");
        cycledata1.dependentOn = element.dependentOn;
        cycledata1.value = element.value;
        debugger;
        addData.mappingGroupRequest.push(cycledata1);
      });
    }
    this.payrollheadgroupcreationService.AddAttributeAssignment(addData)
      .subscribe((res: any) => {
        debugger
        this.sweetalertMasterSuccess("Success..!!", res.status.message);
        // this.todisabletodate=true;
      },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });
    this.ServicesList = [];
    this.AttributeCreationForm.reset();
    this.AttGroupList = [];
    //element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");

    // cycledata1.headGroupId=this.headGroupId;
    // cycledata1.attributeGroupId=this.attributeGroupId;
    // cycledata1.fromDate

  }

  OntoDateChange(event): void {
    debugger;
    this.fromDate = this.datepipe.transform(event, "dd-MMM-yyyy");//event.toISOString() ;
    this.minDate1 = event;//this.datepipe.transform(event, "dd-MMM");//event.toISOString() ;
    //this.minDate1=event.getTime()
    this.AttGroupList.forEach(element => {
      element.fromDate = this.fromDate;
    });
    //this.minDate=event.getTime() ;
    //    if ((this.Id == undefined || this.Id == '00000000-0000-0000-0000-000000000000')) {
    //       this.EventDetails.patchValue({ RegistrationClosedDate:this.minDate });
    //     }
  }

  OntoDateChangeEvent(event): void {
    debugger;
    this.toDate = this.datepipe.transform(event, "dd-MMM-yyyy");//event.toISOString() ;
    this.AttGroupList.forEach(element => {
      element.toDate = this.toDate;
    });
  }



  //add Payroll HeadGroup
  addPayrollHeadGroup(): void {
    debugger
    const addAttributeCreation: SavePHG = Object.assign({});
    addAttributeCreation.headMasters = [];
    this.targetProducts.forEach(function (f) {

      // var headDetail = new addAttributeCreation.headMasters.headMasterId();
      // headDetail.headMasterId = f.globalHeadMasterId ;
      // addAttributeCreation.headMasters.push( headDetail  );
      const headDetail: headDetail = Object.assign({});
      headDetail.headMasterId = f.headMasterId;
      addAttributeCreation.headMasters.push(headDetail);
      //addAttributeCreation.headMasters.push(   f.globalHeadMasterId  );
    });
    addAttributeCreation.headGroupDefinitionName = this.PHGName;
    addAttributeCreation.description = this.AttributeCreationForm.value.description;
    addAttributeCreation.attributeGroupName = this.AttributeCreationForm.value.attributeNature;
    addAttributeCreation.countryId = 1;
    addAttributeCreation.createdBy = "nisha";
    addAttributeCreation.isActive = true;
    // addAttributeCreation.attributeNature=this.AttributeCreationForm.value.attributeNature;
    if (addAttributeCreation.headGroupDefinitionId == undefined || addAttributeCreation.headGroupDefinitionId == 0) {

      this.payrollheadgroupcreationService.AddPayrollHeadGroup(addAttributeCreation).subscribe((res: any) => {
        debugger
        addAttributeCreation.headMasters = [];
        this.targetProducts = [];
        this.sweetalertMasterSuccess("Success..!!", res.status.message);
        this.getAllPayrollHeadGroup();
        this.getAllHeadCreation();
        //this.hidevalue=false;
        this.AttributeCreationForm.reset();
      },
        (error: any) => {
          this.sweetalertError(error["error"]["status"]["message"]);
        });
    }
    else {
      //     debugger
      //   this.attributeSelectionService.UpdateBusinessYear(addAttributeCreation.attributeGroupDefinitionId,addAttributeCreation).subscribe((res:any )=> {
      //   debugger
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


  getPHGname(event): void {
    debugger
    this.selectedCopFormPHGName = event.target.value;

    // GetAttributeOptionList(): void {
    this.payrollheadgroupcreationService.GetHeadListByPHGname(this.selectedCopFormPHGName).subscribe(res => {
      debugger
      this.targetProducts = res.data.results[0].headMasters;

      this.targetProducts.forEach(element => {
        var index = this.targetProducts.indexOf(element)
        this.sourceProducts = this.sourceProducts.filter(e => e.standardName !== element.standardName);
      });

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

    });
  }


  UploadModalYesNo(template: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  UploadModal2(template: TemplateRef<any>) {
    debugger
    this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(this.headGroupId).subscribe((res: any) => {
      debugger
      this.AttGroupList = res.data.results[0];//[0].attributeMasters;
      this.AttGroupList.forEach(element => {
        element.toDate = this.datepipe.transform(element.toDate, "dd-MMM-yyyy");
        element.fromDate = this.datepipe.transform(element.fromDate, "dd-MMM-yyyy");
      });

      if (this.AttGroupList[0].attributeMaster.code != null) {
        this.AttGroupList.forEach(element => {
          element["code"] = element.attributeMaster.code;

        });
      }
      // else{

      // }

    },
      (error: any) => {
        if (error.status == 404) {
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
      Object.assign({}, { class: 'gray modal-xl' })

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

  //     this.payrollheadgroupcreationService.GetAttributeOptionListByHeadGroupIdGetById(283).subscribe(res => {
  //       debugger
  //       this.AttGroupList =res.data.results[0];//[0].attributeMasters;

  //     if (this.AttGroupList.length == 0 )
  //        reject('nodata');
  //        else
  //        resolve('gotdata');

  //     });

  //   });
  // }

  //********* */

}
