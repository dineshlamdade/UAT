import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { ToastrService } from 'ngx-toastr';
import { Table } from "primeng/table";

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
  hideRemarkDiv1:boolean = false;
  hideRemarkDiv2:boolean = false;

  queryTypeAllData: any;
  addQueryTypeData:any;
  updateQueryTypeData: any;
  editflag:boolean = false;
  editflagSummary: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  allWorkflowMasterdata: any;
  subquerview:boolean=true;
  isVisiblee:boolean=false;

  public rows: Array<{applicationModuleName: string,
  queryTypedescription: string,
  subqueryTypedescription: string}> = [];
  applicationModuleData: any;
  queryType: any;
  subQueryType: any;
  subQueryRequestDTO: any=[] =[];
  listSubQueryQueAnsMapping: any = [];
  finalForm: FormGroup;
  listQueryPriorityRequestDTO: any =[];
  priorityData: any[] = [];
  priorityData2: any[] = [];
  listQueryAnsMappingReqDTO: any[] = [];
  queryTypeMasterId:number = 0;
  querySubQuerySummary: any[] = [];
  selectedModule: any;
  allSummaryData: any;
  AssignQNATemplate: any =[];
  getAlldataByIdforedit: any;
  queryTypeCode: any;
  moduleName: any;
  editQueryIndex: any = null;
  isAddTempQuery:boolean = true;
  isUpdateTempQuery:boolean= false;
  viewFlag :boolean = false;
  moduleNameForTemplate: any;
  selectedmodulename: any;
  queryTypedescriptionforedit: any;
  subqueryTypedescriptionforedit: any;
  selectedModuleId: any;
  // listQueryAnsMapping: FormArray;
  // listQueryPriority: FormArray;
  // subQueryRequest: FormArray;
  // listSubQueryQueAnsMapping: FormArray;

  constructor(public formBuilder : FormBuilder,public queryService :QueryService ,public toster : ToastrService) {
    this.querytypeForm = this.formBuilder.group(
        {

        "queryTypeMasterId": new FormControl(0),
        "applicationModuleId": new FormControl(null,[Validators.required]),
        "queryTypeCode": new FormControl(''),
        "queryTypedescription": new FormControl(''),
        "subQuery": new FormControl(0),
        "priorityRequired": new FormControl("1"),
        "replyWorkflowId": new FormControl(null),
        "forwardWorkFlowId": new FormControl(0),
        "autoCloseTimeforNopriority": new FormControl('13:15'),
        "resolutionTimeforNopriority": new FormControl(''),
        "active": new FormControl(true),
        "Replayworkflow": new FormControl(""),
        "subQueryTypeCode":new FormControl(''),
        "subqueryTypedescription":new FormControl(''),
        "remark":new FormControl(true),
        "assignQATemplate1":new FormControl(''),
        "assignQATemplate2":new FormControl(''),
        }
    )

    this.finalForm = new FormGroup(
      {
        "queryTypeMasterId": new FormControl(0),
        "applicationModuleId": new FormControl(''),
        // "queryTypeCode": new FormControl(''),
        "queryTypedescription": new FormControl(''),
        "subQuery": new FormControl(0),
        "priorityRequired": new FormControl("1"),
        "replyWorkflowId": new FormControl(0),
        "forwardWorkFlowId": new FormControl(0),
        "autoCloseTimeforNopriority": new FormControl('13:15'),
        "resolutionTimeforNopriority": new FormControl(''),
        "active": new FormControl(true),
        "listQueryAnsMappingReqDTO": new FormControl([]),
        "listQueryPriorityRequestDTO": new FormControl([]),
        "subQueryRequestDTO": new FormControl([]),
        "remark":new FormControl(true),

      }
    )
  }

  ngOnInit(): void {

    this.getModuleName();
    // this.getAll();
    this.getAllWorkflowMasters();
    this.getAllSummaryData();


    this.priorityData = [{ //static data used.
      'id': 1,
      'priorityType':'Urgent',
      'resolutionTime':24,
      'autoClose':240,
    },
    {
      'id': 2,
      'priorityType':'High',
      'resolutionTime':48,
      'autoClose':240,
    },
    {
      'id': 3,
      'priorityType':'Medium',
      'resolutionTime':60,
      'autoClose':240,
    },
    {
      'id': 4,
      'priorityType':'Low',
      'resolutionTime':72,
      'autoClose':240,
    }

  ]
    this.priorityData2 = [{
      'resolutionTime':24,
      'autoClose':240,

    }]
  }


  onItemSelect(item: any) {
    console.log(item);

  }
  onSelectAll(items: any) {
    console.log(items);

   }

  querytypeFormSubmit() // All form save api
  {
      if(!this.editflagSummary){
            this.addQueryType();
      }else{
        this.updateQueryType();
      }

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

priorityRequiredevent(value, priority,event)
{

  //debugger
  // if(event.checked){
    this.listQueryPriorityRequestDTO.push({
      "queTypePriorityMasterId":0,
           "queryTypeMasterId":0,
           "priorityType":priority.priorityType,
           "resolutionTime":priority.resolutionTime,
           "autoClose":priority.autoClose,
           "defaultPriority":value,
           "active":true
    })
    console.log(JSON.stringify( this.listQueryPriorityRequestDTO));
  // }



}
onItemSubQuerySelect(item){
  this.listSubQueryQueAnsMapping.push({
    "subQueryTypeQueAnsMappingId":0,
    "subQueryTypeMasterId":0,
    "queAnsMasterId":item.queAnsMasterId,
    "active":true
  })
  this.AssignQNATemplate.push({
    'queAnsMasterId': item.queAnsMasterId,
  'description': item.description
  })
}

onSelectAllSubQuery(item){

}
addSubqueryInTable() //temp data store in table on add button click .
{
  this.finalForm.controls['subQuery'].setValue(1);
  this.querytypeForm.controls['subQuery'].setValue(1);

  // for(let i=0; i<this.AssignQNATemplate.length; i++){
    this.subQueryRequestDTO.push(
      {
        "subQueTypeMasterId":0,
        "queryTypeMasterId":0,
        "subqueryTypedescription":this.querytypeForm.controls['subqueryTypedescription'].value,
        "active":true,
        "listSubQueryQueAnsMapping":this.listSubQueryQueAnsMapping,
        // "listSubQueryQueAnsMapping":[this.listSubQueryQueAnsMapping[i]]
     } )
  //  }

  console.log(JSON.stringify(this.subQueryRequestDTO))

  this.finalForm.controls['subQueryRequestDTO'].setValue(this.subQueryRequestDTO);
  let multiSelectValue = this.querytypeForm.controls['assignQATemplate2'].setValue(this.AssignQNATemplate);

  console.log(JSON.stringify( this.querySubQuerySummary));
if(this.editQueryIndex != null){
this.querySubQuerySummary.splice(this.editQueryIndex,1,
  {
    'ModuleName': this.selectedModule,
    'queryCode':this.querytypeForm.controls['queryTypeCode'].value,
    'subQuerCode':this.querytypeForm.controls['subQueryTypeCode'].value,
    'queryTypedescription':this.querytypeForm.controls['queryTypedescription'].value,
    'subqueryTypedescription':this.querytypeForm.controls['subqueryTypedescription'].value,
    'multiselectDropDown': multiSelectValue,
    'assignQATemplate2':this.querytypeForm.controls['assignQATemplate2'].value,
  })
}else{
  this.querySubQuerySummary.push({
    'ModuleName': this.selectedModule,
    'queryCode':this.querytypeForm.controls['queryTypeCode'].value,
    'subQuerCode':this.querytypeForm.controls['subQueryTypeCode'].value,
    'queryTypedescription':this.querytypeForm.controls['queryTypedescription'].value,
    'subqueryTypedescription':this.querytypeForm.controls['subqueryTypedescription'].value,
    'multiselectDropDown': multiSelectValue,
    'assignQATemplate2':this.querytypeForm.controls['assignQATemplate2'].value,
  })
}

this.querytypeForm.controls['subQueryTypeCode'].reset();
this.querytypeForm.controls['subqueryTypedescription'].reset();
this.querytypeForm.controls['assignQATemplate2'].reset();
this.AssignQNATemplate=[];
}

changeEvent1($event) {

  if ($event.target.checked) {
      this.hideRemarkDiv1 = false;
  }
  else {
      this.hideRemarkDiv1 = true;
  }
}

changeEvent2($event) {

  if ($event.target.checked) {
      this.hideRemarkDiv2 = false;
  }
  else {
      this.hideRemarkDiv2 = true;
  }
}
// ...............................api calling ..............................................................
getModuleName() //get all module name
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;
    this.applicationModuleData = this.moduleListData.applicationModuleName;
  })
}
getAllSummaryData() //after saveing data in summary page api .
{
  this.queryService.getAllSummaryData().subscribe(res =>
    {
      this.allSummaryData = res.data.results;
    })
}

getAlldataById(queryTypeMasterId)// for edit....
{
  this.queryService.getAlldataById(queryTypeMasterId).subscribe(res =>
    {
      this.getAlldataByIdforedit = res.data.results[0];
      this.finalForm.patchValue(this.getAlldataByIdforedit);
      this.querytypeForm.patchValue(this.getAlldataByIdforedit);

      this.getAlldataByIdforedit.subQueryResponseDTO.forEach(element => {
        this.subQueryRequestDTO.push(
          {
            "subQueTypeMasterId":element.subQueTypeMasterId,
            "queryTypeMasterId":element.queryTypeMasterId,
            "subqueryTypedescription":element.subqueryTypedescription,
            "active":true,

            "listSubQueryQueAnsMapping":[{
              "subQueryTypeQueAnsMappingId":0,
              "subQueryTypeMasterId":0,
              "queAnsMasterId":0,
              "active":true
            }],
         } );
      });

       console.log("subquery edit: " +JSON.stringify(this.subQueryRequestDTO))
      this.priorityData.forEach(element =>{
      this.getAlldataByIdforedit.listQueryPriorityResponseDTO.forEach(ele => {
          if(element.priorityType == ele.priorityType){
            element.defaultPriority = true;
          }

        });
      })
      this.priorityData2.forEach(element =>{
        this.getAlldataByIdforedit.listQueryPriorityResponseDTO.forEach(ele => {
          element.resolutionTime = ele.resolutionTime,
          element.autoClose= ele.autoClose
          });
        })
      // this.priorityData2 = this.getAlldataByIdforedit.listQueryPriorityResponseDTO;
      this.getAlldataByIdforedit.subQueryResponseDTO.forEach(element => {
        this.querySubQuerySummary.push({
          'ModuleName':this.moduleName,
          'queryCode':this.getAlldataByIdforedit.queryTypeCode,
          'subQuerCode':element.subQueryTypeCode,
          'subqueryTypedescription':element.subqueryTypedescription,
          'queryTypedescription': this.getAlldataByIdforedit.queryTypedescription,
          // 'multiselectDropDown': multiSelectValue,
          // 'assignQATemplate2':this.querytypeForm.controls['assignQATemplate2'].value,
        })
      })
      this.moduleListData.forEach(element => {
        if(element.applicationModuleId == parseInt(this.getAlldataByIdforedit.applicationModuleId))
        {
       this.selectedModule = element.applicationModuleName;
        }
      });
      this.getAll();
      console.log(JSON.stringify(this.querySubQuerySummary))
      });

}
moduleChange(value) // when module is changed then that data store in temp tabel .
{
  this.selectedModuleId = value;
  this.moduleListData.forEach(element => {
    if(element.applicationModuleId == parseInt(value))
    {
   this.selectedModule = element.applicationModuleName;
    }
  });
  this.getAll();
}
addQueryType() // main post api to save all form data .
{
  let listQueryAnsMappingReqDTO = [
    {
      "queryTypeQueAnsMappingId":0,
      "queryTypeMasterId":this.queryTypeMasterId,
      "queAnsMasterId":0,
      "active":true
    }
  ]
  this.finalForm.patchValue(this.querytypeForm.value);
  this.finalForm.controls['applicationModuleId'].setValue(parseInt(this.querytypeForm.controls['applicationModuleId'].value));
  this.finalForm.controls['priorityRequired'].setValue(parseInt(this.querytypeForm.controls['priorityRequired'].value))
  this.finalForm.controls['forwardWorkFlowId'].setValue(parseInt(this.querytypeForm.controls['forwardWorkFlowId'].value));
  this.finalForm.controls['replyWorkflowId'].setValue(parseInt(this.querytypeForm.controls['replyWorkflowId'].value));
  this.finalForm.controls['listQueryAnsMappingReqDTO'].setValue(listQueryAnsMappingReqDTO);
  this.finalForm.controls['subQueryRequestDTO'].setValue(this.subQueryRequestDTO);
  this.finalForm.controls['listQueryPriorityRequestDTO'].setValue(this.listQueryPriorityRequestDTO);

  console.log(JSON.stringify(this.finalForm.value));

  this.queryService.addQueryType(this.finalForm.value).subscribe(res =>
  {
    this.addQueryTypeData = res.data.results;
    this.getAllSummaryData();
    this.toster.success("",'Query Type Added Successfully');

  this.listQueryPriorityRequestDTO =[];
  this.subQueryRequestDTO = [];
  })
  this.querytypeForm.reset();


}
queryTypeQueAnsMappingId :number;
queAnsMasterId :number;
updateQueryType()   //update all form
{
  let listQueryAnsMappingReqDTO = [
    {
      "queryTypeQueAnsMappingId":this.queryTypeQueAnsMappingId,
      "queryTypeMasterId":this.queryTypeMasterId,
      "queAnsMasterId":this.queAnsMasterId,
      "active":true
    }
  ]
  this.finalForm.patchValue(this.querytypeForm.value);
  this.finalForm.controls['applicationModuleId'].setValue(parseInt(this.querytypeForm.controls['applicationModuleId'].value));
  this.finalForm.controls['priorityRequired'].setValue(parseInt(this.querytypeForm.controls['priorityRequired'].value))
  this.finalForm.controls['forwardWorkFlowId'].setValue(parseInt(this.querytypeForm.controls['forwardWorkFlowId'].value));
  this.finalForm.controls['replyWorkflowId'].setValue(parseInt(this.querytypeForm.controls['replyWorkflowId'].value));
  this.finalForm.controls['listQueryAnsMappingReqDTO'].setValue(listQueryAnsMappingReqDTO);
  this.finalForm.controls['subQueryRequestDTO'].setValue(this.subQueryRequestDTO);
  this.finalForm.controls['listQueryPriorityRequestDTO'].setValue(this.listQueryPriorityRequestDTO);

  console.log(JSON.stringify(this.finalForm.value));
  this.queryService.updateQueryType(this.finalForm.value).subscribe(res =>
  {
    this.updateQueryTypeData = res.data.results[0];
   this.getAllSummaryData();
    this.toster.success("",'Query Type Updated Successfully');
    this.listQueryPriorityRequestDTO =[];
    this.subQueryRequestDTO = [];
  })
}
getAllWorkflowMasters() // for dropdown of workflow call this api .
{
  this.queryService.getAllWorkflowMasters().subscribe(res =>
    {
      this.allWorkflowMasterdata = res.data.results;
    })
}
getAll() // this api call for the assign Q & A template dropdown
{
  this.queryListData=[];
   this.queryService.getAll().subscribe( res =>{
    res.data.results.forEach(element => {
      if(element.moduleId == this.selectedModuleId)
      {
        this.queryListData.push(element);
      }
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'queAnsMasterId',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
   })
  }

editQuery(query,index)
{
  this.isUpdateTempQuery = true;
  this.isAddTempQuery = false;
  this.querytypeForm.enable();
 this.querytypeForm.controls['queryTypeCode'].disable();
 this.querytypeForm.controls['subQueryTypeCode'].disable();
  //this.querytypeForm.patchValue(query);
  this.querytypeForm.controls['subQueryTypeCode'].setValue(query.subQuerCode);
  // 'subqueryTypedescription':this.querytypeForm.controls['subqueryTypedescription'].value,
  this.querytypeForm.controls['subqueryTypedescription'].setValue(query.subqueryTypedescription);
  this.querytypeForm.controls['assignQATemplate2'].setValue(query.assignQATemplate2);
  this.editQueryIndex = index;

}
viewQuery(query,index)
{
 this.querytypeForm.controls['subQueryTypeCode'].disable();
 this.querytypeForm.controls['subqueryTypedescription'].disable();
 this.querytypeForm.controls['assignQATemplate2'].disable();

 this.querytypeForm.controls['subQueryTypeCode'].setValue(query.subQuerCode);
//  this.querytypeForm.controls['queryTypedescription'].setValue(query.queryTypedescription);
this.querytypeForm.controls['subqueryTypedescription'].setValue(query.subQueryDescription);
 this.querytypeForm.controls['assignQATemplate2'].setValue(query.assignQATemplate2);
}
deleteQuery(rowIndex)
{
  this.querySubQuerySummary.splice(rowIndex,1);
}
// ...................total form reset & Cancel......................................................................
reset(){
  this.querytypeForm.enable();
  this.querytypeForm.reset();
  this.querytypeForm.controls['active'].setValue(true);
  this.isUpdateTempQuery = false;
  this.isAddTempQuery = true;

}
cancel()
{
  this.querytypeForm.reset();
  this.querytypeForm.controls['active'].setValue(true);
  this.isUpdateTempQuery = false;
  this.isAddTempQuery = true;

}

viewQuerySummary(query) // whole page view function
{
  if(query.subcount == 0)
  {
    this.ishidden = true;
     this.subquerview = false;
   }else{
     this.ishidden = false;
     this.subquerview = true;
  }
  this.viewFlag = true;
  this.editflagSummary = false;
  this.querytypeForm.patchValue(query);
  this.querytypeForm.disable();
  this.isVisiblee = false;
  this.isVisible = true;
  this.isShown = false;
  this.getAlldataById(query.queryTypeMasterId);
  this.queryTypeMasterId = query.queryTypeMasterId;
  this.querySubQuerySummary=[];
  this.isAddTempQuery = false;
  this.isUpdateTempQuery = false;


  // console.log(JSON.stringify(this.ishidden))
}
editQuerySummary(query) // whole page edit function
{
   if(query.subcount == 0)
  {
    this.ishidden = true;
    this.subquerview = false;
  }else{
    this.ishidden = false;
    this.subquerview = true;
  }
  console.log(JSON.stringify(query));
  this.editflagSummary = true;
  this.querytypeForm.enable();
  this.querytypeForm.patchValue(query);
  this.isVisible =true;
  this.isShown = false;
  this.isVisiblee = true;


  this.querytypeForm.controls['queryTypeCode'].disable();
  this.querytypeForm.controls['subQueryTypeCode'].disable();
  this.getAlldataById(query.queryTypeMasterId);
  this.queryTypeMasterId = query.queryTypeMasterId;
  this.moduleName = query.applicationModuleName;

  this.listQueryPriorityRequestDTO =query.listQueryPriorityRequestDTO;
  this.isAddTempQuery = true;
  this.isUpdateTempQuery = false;
  // this.querySubQuerySummary=[];

}

resolutionEvent(value,prio)
{
  this.listQueryPriorityRequestDTO.push({
  "queTypePriorityMasterId":0,
  "queryTypeMasterId":0,
  "priorityType":'',
  "resolutionTime":prio.resolutionTime,
  "autoClose":value,
  "defaultPriority":'',
  "active":true
})
}
}
