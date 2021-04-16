import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { ToastrService } from 'ngx-toastr';

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

  addField:boolean=true;
  removeField:boolean=false;


  get queryTypeFormGroup() {
    return this.querytypeForm.get('queryArray') as FormArray;
  }

  constructor(public formBuilder : FormBuilder,public queryService :QueryService ,public toster : ToastrService) {
    this.querytypeForm = this.formBuilder.group(
      {

        // "queryTypeMasterId": 23,
        // "applicationModuleId": 1,
        // "queryTypeCode": " aftnoon done ",
        // "queryTypedescription": " good done",
        // "subQuery": false,
        // "priorityRequired": true,
        // "autoCloseTimeforNopriority": "12:15",
        // "resolutionTimeforNopriority": "3:15",
        // "replyWorkflowId": 1,
        // "forwardWorkFlowId": 1,
        // "createdBy": "PaysquareDefault",
        // "lastModifiedBy": null,
        // "listQueryAnsMappingResponseDTO": null,
        // "subQueryResponseDTO": null,
        // "listQueryPriorityResponseDTO": null,
        // "active": true,
        // "remark": null



        "queryTypeMasterId": new FormControl(''),
        "applicationModuleId": new FormControl(''),
        "queryTypeCode": new FormControl(''),
        "queryTypedescription": new FormControl(''),
        "subQuery": new FormControl(''),
        "priorityRequired": new FormControl(''),
        "replyWorkflowId": new FormControl(''),
        "forwardWorkFlowId": new FormControl(''),
        "autoCloseTimeforNopriority": new FormControl(''),
        "resolutionTimeforNopriority": new FormControl(''),
        "active":  new FormControl(true),


        "listQueryAnsMappingReqDTO":[
        {
        "queryTypeQueAnsMappingId": new FormControl(''),
        "queryTypeMasterId": new FormControl(''),
        "queAnsMasterId": new FormControl(''),
        "active":  new FormControl(true),
        },
        {
        "queryTypeQueAnsMappingId": new FormControl(''),
        "queryTypeMasterId": new FormControl(''),
        "queAnsMasterId": new FormControl(''),
        "active": new FormControl(true),

        }
        ],

        "listQueryPriorityRequestDTO":[
        {
        "queTypePriorityMasterId": new FormControl(''),
        "queryTypeMasterId": new FormControl(''),
        "priorityType": new FormControl(''),
        "resolutionTime": new FormControl(''),
        "autoClose": new FormControl(''),
        "defaultPriority": new FormControl(''),
        "active": new FormControl(true),
        },
        {
        "queTypePriorityMasterId": new FormControl(''),
        "queryTypeMasterId": new FormControl(''),
        "priorityType": new FormControl(''),
        "resolutionTime": new FormControl(''),
        "autoClose": new FormControl(''),
        "defaultPriority": new FormControl(''),
        "active":  new FormControl(true),

        }
        ],
        "subQueryRequestDTO":[
        {
        "subQueTypeMasterId": new FormControl(''),
        "queryTypeMasterId": new FormControl(''),
        "subQueryTypeCode": new FormControl(''),
        "subqueryTypedescription": new FormControl(''),
        "active": new FormControl(true),

        "listSubQueryQueAnsMapping":[
        {
        "subQueryTypeQueAnsMappingId": new FormControl(''),
        "subQueryTypeMasterId": new FormControl(''),
        "queAnsMasterId": new FormControl(''),
        "active":  new FormControl(true),
        },
        {
        "subQueryTypeQueAnsMappingId": new FormControl(''),
        "subQueryTypeMasterId": new FormControl(''),
        "queAnsMasterId": new FormControl(''),
        "active": new FormControl(true),
        }
        ]
        },

        {
        "subQueTypeMasterId": new FormControl(''),
        "queryTypeMasterId": new FormControl(''),
        "subQueryTypeCode": new FormControl(''),
        "subqueryTypedescription": new FormControl(''),
        "active":new FormControl(true),

        "listSubQueryQueAnsMapping":[
        {
        "subQueryTypeQueAnsMappingId": new FormControl(''),
        "subQueryTypeMasterId": new FormControl(''),
        "queAnsMasterId": new FormControl(''),
        "active": new FormControl(true),
        }
        ]
        }

        ]
        }

    )
  }

  ngOnInit(): void {
    this.querytypeForm = this.formBuilder.group({
      subQueryCode: '',
      subQueryDescription: '',
      assignQATemplate: '',
      queryArray: this.formBuilder.array([this.createSubquery()])
    })
    this.addSubQueryList = this.querytypeForm.get('queryArray') as FormArray;
    this.getModuleName();
    this.getAllQueryType();
  }
  addSubQuery(index)
  {
    this.addSubQueryList.push(this.createSubquery());
    this.removeField = true;
    this.addField = false;
  }
    createSubquery(): FormGroup {
      return this.formBuilder.group({
        subQueryCode: '',
        subQueryDescription: '',
        assignQATemplate: '',
      });
    }

  removeSubQuery(index)
  {
    this.addSubQueryList.removeAt(index);

  }
  querytypeFormSubmit()
  {
    this.addQueryType();
  }
  getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;

  })
}
radioButtonChanged(event){
  let radioValue = event.target['value'];
   if(radioValue ==0){
     this.ishidden = true;
   }else{
     this.ishidden = false;
   }
}

getPriorityRequired(value){
  this.priorityRequiredFlag =! this.priorityRequiredFlag;

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
queryTypeMasterId:number;
getAllQueryType()
{
this.queryService.getAllQueryType(this.queryTypeMasterId).subscribe(res =>
  {
    this.queryTypeAllData = res.data.results[0];
    console.log("**********", this.queryTypeAllData);
   })
   this.addQueryType();
}
addQueryType()
{
this.queryService.addQueryType(this.querytypeForm.value).subscribe(res =>
  {
    this.addQueryTypeData = res.data.results.queryTypeMasterId[0];
  })
}
updateQueryType()
{
this.queryService.updateQueryType(this.querytypeForm.value).subscribe(res =>
  {
    this.updateQueryTypeData = res.data.results;
  })
}
}
