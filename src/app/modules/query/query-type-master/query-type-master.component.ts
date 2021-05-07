import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Table } from "primeng/table";

// import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-query-type-master',
  templateUrl: './query-type-master.component.html',
  styleUrls: ['./query-type-master.component.scss']
})
export class QueryTypeMasterComponent implements OnInit {

  querytypeForm:FormGroup;
  moduleListData:any;
  queryListData:any;
  p: number = 1;
  isVisible:boolean=false;
  isShown: boolean= true;
  ishidden:boolean=false;
  priorityRequiredFlag:boolean=false;
  public addSubQueryList: FormArray;
  hideRemarkDiv:boolean = false;
  hideRemarkDiv1:boolean = false;
  queryTypeAllData: any;
  addQueryTypeData:any;
  updateQueryTypeData: any;
  editflag: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  allWorkflowMasterdata: any;
  subquerview:boolean=true;

  public rows: Array<{applicationModuleName: string,
  queryTypedescription: string,
  subqueryTypedescription: string}> = [];
  applicationModuleData: any;
  queryType: any;
  subQueryType: any;

  subQueryRequestDTO: any=[];
  listSubQueryQueAnsMapping: any = [];
  finalForm: FormGroup;
  listQueryPriorityRequestDTO: any =[];
  priorityData: any[] = [];
  priorityData2: any[] = [];
  listQueryAnsMappingReqDTO: any[] = [];

  // listQueryAnsMapping: FormArray;
  // listQueryPriority: FormArray;
  // subQueryRequest: FormArray;
  // listSubQueryQueAnsMapping: FormArray;

  constructor(public formBuilder : FormBuilder,public queryService :QueryService ,public toster : ToastrService) {
    this.querytypeForm = this.formBuilder.group(
        {

        "queryTypeMasterId": new FormControl(''),
        "applicationModuleId": new FormControl(''),
        "queryTypeCode": new FormControl(''),
        "queryTypedescription": new FormControl(''),
        "subQuery": new FormControl(''),
        "priorityRequired": new FormControl("yes"),
        "replyWorkflowId": new FormControl(''),
        "forwardWorkFlowId": new FormControl(''),
        "autoCloseTimeforNopriority": new FormControl(''),
        "resolutionTimeforNopriority": new FormControl(''),
        "active": new FormControl(true),
        "Replayworkflow": new FormControl(""),
        "subQueryTypeCode":new FormControl(''),
        "subqueryTypedescription":new FormControl(''),
        "remark":new FormControl(''),

        }
    )

    this.finalForm = new FormGroup(
      {
        "queryTypeMasterId": new FormControl(''),
        "applicationModuleId": new FormControl(''),
        "queryTypeCode": new FormControl(''),
        "queryTypedescription": new FormControl(''),
        "subQuery": new FormControl(''),
        "priorityRequired": new FormControl("yes"),
        "replyWorkflowId": new FormControl(''),
        "forwardWorkFlowId": new FormControl(''),
        "autoCloseTimeforNopriority": new FormControl(''),
        "resolutionTimeforNopriority": new FormControl(''),
        "active": new FormControl(true),
        "Replayworkflow": new FormControl(""),
        "listQueryAnsMappingReqDTO": new FormControl([]),
        "listQueryPriorityRequestDTO": new FormControl([]),
        "subQueryRequestDTO": new FormControl([]),
      }
    )
  }

  ngOnInit(): void {

    this.getModuleName();
    this.getAll();
    this.getAllWorkflowMasters();
    this.getAllQueryType();
    // this.addQueryType();
    // this.finalForm.controls['queryTypeCode'].setValue
    // this.finalForm.controls['subQueryTypeCode'].setValue


    this.priorityData = [{
      'id': 1,
      'priorityType':'Urgent',
      'resolutionTime':4,
      'autoClose':4,

    }]
    this.priorityData2 = [{
      'resolutionTime':4,
      'autoClose':4,

    }]
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);

   }

  querytypeFormSubmit()
  {
      if(!this.editflag){
            this.addQueryType();
      }else{
        this.updateQueryType();
      }
      this.querytypeForm.reset();
      if (this.querytypeForm.invalid) {
        return;
    }
    this.querytypeForm.reset();

  }

radioButtonChanged(event){
  let radioValue = event.target['value'];
   if(radioValue == 0){
     this.ishidden = true;
     this.subquerview = false;
   }else{
     this.ishidden = false;
     this.subquerview = true;

   }
}

getPriorityRequired(value){
  this.priorityRequiredFlag =! this.priorityRequiredFlag;


}

priorityRequiredevent(value, priority)
{
  this.listQueryPriorityRequestDTO.push({
    "queTypePriorityMasterId":0,
         "queryTypeMasterId":0,
         "priorityType":priority.priorityType,
         "resolutionTime":priority.resolutionTime,
         "autoClose":priority.autoClose,
         "defaultPriority":value,
         "active":true
  })

}
onItemSubQuerySelect(item){
  this.listSubQueryQueAnsMapping.push({
    "subQueryTypeQueAnsMappingId":0,
    "subQueryTypeMasterId":0,
    "queAnsMasterId":item.queAnsMasterId,
    "active":true
  })
}

onSelectAllSubQuery(item){

}
addSubqueryInTable()
{

  this.subQueryRequestDTO.push(
    {

      // this.rows.push( {applicationModuleName: this.applicationModuleData, queryTypedescription: this.queryType
      //   , subqueryTypedescription: this.subQueryType } );

      //   this.moduleListData = null;
      //   this.queryType = null;
      //   this.subQueryType = null;

      "subQueTypeMasterId":null,
      "queryTypeMasterId":162,
      "subqueryTypedescription":this.queryType,
      "active":true,
      "listSubQueryQueAnsMapping":this.listSubQueryQueAnsMapping
   }
  )


  this.finalForm.controls['subQueryRequestDTO'].setValue(this.subQueryRequestDTO);
  // this.finalForm.controls['listQueryPriorityRequestDTO'].setValue(this.listQueryPriorityRequestDTO);

}
// ...........................add remove field Code..........................................................

changeEvent($event) {

  if ($event.target.checked) {
      this.hideRemarkDiv = false;
  }
  else {
      this.hideRemarkDiv = true;
  }

}
changeEvent1($event) {

  if ($event.target.checked) {
      this.hideRemarkDiv1 = false;
  }
  else {
      this.hideRemarkDiv1 = true;
  }

}
// ...............................api calling ..............................................................
getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;
    // this.applicationModuleData = res.data.results.applicationModuleName;
    this.applicationModuleData = this.moduleListData.applicationModuleName;

  })
}
queryTypeMasterId:number;
getAllQueryType()
{

this.queryService.getAllQueryType(this.queryTypeMasterId).subscribe(res =>
  {
    this.queryTypeAllData = res.data.results[0];
    console.log("**********", this.queryTypeAllData);
    this.queryType = this.queryTypeAllData.queryTypedescription;
    this.subQueryType = this.queryTypeAllData.subqueryTypedescription;
   })
  //  this.addQueryType();
}
addQueryType()
{
  this.finalForm.controls['subQueryRequestDTO'].setValue(this.subQueryRequestDTO);
  this.finalForm.controls['listQueryPriorityRequestDTO'].setValue(this.listQueryPriorityRequestDTO);
  this.queryService.addQueryType(this.finalForm.value).subscribe(res =>
  {
    console.log(JSON.stringify(this.finalForm.value));
    this.addQueryTypeData = res.data.results.queryTypeMasterId[0];
    this.getAllQueryType();
    this.toster.success("",'Query Added Successfully');

  })
}
updateQueryType()
{
this.queryService.updateQueryType(this.finalForm.value).subscribe(res =>
  {
    this.updateQueryTypeData = res.data.results[0];
    this.toster.success("",'Query Updated Successfully');

  })
}
getAllWorkflowMasters()
{
  this.queryService.getAllWorkflowMasters().subscribe(res =>
    {
      this.allWorkflowMasterdata = res.data.results;
    })
}
getAll()
{
   this.queryService.getAll().subscribe( res =>{
     this.queryListData = res.data.results;

   })

   this.dropdownSettings = {
    singleSelection: false,
    idField: 'queAnsMasterId',
    textField: 'description',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  }
editQuery(query)
{
  this.editflag = true;
  this.querytypeForm.enable();
  this.querytypeForm.patchValue(query);
  this.isVisible =true;
  this.isShown = false;

}
viewQuery(query)
{
  this.editflag = false;
 this.querytypeForm.patchValue(query);
 this.querytypeForm.disable();
}
deleteQuery(query)
{

}
reset(){
  this.querytypeForm.enable();
  this.querytypeForm.reset();
  this.querytypeForm.controls['active'].setValue(true);
}
cancel()
{
  this.reset();
  this.querytypeForm.controls['active'].setValue(true);
}

}
