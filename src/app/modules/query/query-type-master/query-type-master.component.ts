import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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

  public rows: Array<{applicationModuleName: string,
  queryTypedescription: string,
  subqueryTypedescription: string}> = [];
  applicationModuleData: any;
  queryType: any;
  subQueryType: any;

  listQueryAnsMapping: FormArray;
  listQueryPriority: FormArray;
  subQueryRequest: FormArray;
  listSubQueryQueAnsMapping: FormArray;

  constructor(public formBuilder : FormBuilder,public queryService :QueryService ,public toster : ToastrService) {
    this.querytypeForm = this.formBuilder.group(
        {
        queryTypeMasterId: ["0"],
        applicationModuleId:["1"],
        queryTypeCode:[""],
        queryTypedescription: [""],
        subQuery: ["0"],
        // priorityRequired: ["0"],
        replyWorkflowId: ["1"],
        forwardWorkFlowId: ["1"],
        autoCloseTimeforNopriority: [""],
        resolutionTimeforNopriority: [""],
        active:  ["true"],
        listQueryAnsMappingReqDTO:this.formBuilder.array([]),
        listQueryPriorityRequestDTO: this.formBuilder.array([]),
        subQueryRequestDTO: this.formBuilder.array([])
        }
    )
  }

  ngOnInit(): void {

    this.getModuleName();
    this.getAll();
    this.getAllWorkflowMasters();
    // this.querytypeForm.controls['queryTypeCode'].setValue(queryTypeCode);
    // this.querytypeForm.controls['subQueryTypeCode'].setValue(subQueryTypeCode);

    this.queryListData  = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  createListQueryAnsMapping(){
    return this.formBuilder.group({
      queryTypeQueAnsMappingId:['0'],
      queryTypeMasterId: ['0'],
      queAnsMasterId: ['2'],
      active: ['true']
    })
  }

  addListQueryAnsMapping(){
    this.listQueryAnsMapping = this.querytypeForm.get('listQueryAnsMappingReqDTO') as FormArray;
    this.listQueryAnsMapping.push(this.createListQueryAnsMapping());
  }

  createListQueryPriorityRequest(){
    return this.formBuilder.group({
      queTypePriorityMasterId:['0'],
      queryTypeMasterId: ['0'],
      priorityType: [''],
      resolutionTime: [''],
      autoClose:['8.00'],
      defaultPriority: ['0'],
      active: ['true']
    })
  }

  addlistQueryPriorityRequest(){
    this.listQueryPriority = this.querytypeForm.get('listQueryPriorityRequestDTO') as FormArray;
    this.listQueryPriority.push(this.createListQueryPriorityRequest());
  }

  createSubQueryRequest(){
    return this.formBuilder.group({
      subQueTypeMasterId:['0'],
      queryTypeMasterId: ['0'],
      subQueryTypeCode: [''],
      subqueryTypedescription: ['10'],
      listSubQueryQueAnsMapping: this.formBuilder.array([]),
      active: ['true']
    })
  }

  addSubQueryRequest(){
    this.subQueryRequest = this.querytypeForm.get('subQueryRequestDTO') as FormArray;
    this.subQueryRequest.push(this.createSubQueryRequest());
  }

  createListSubQueryQueAnsMapping(){
    return this.formBuilder.group({
      subQueryTypeQueAnsMappingId:['0'],
      subQueryTypeMasterId: ['0'],
      queAnsMasterId: ['1'],
      active: ['true']
    })
  }

  addListSubQueryQueAnsMapping(){
    this.listSubQueryQueAnsMapping = this.querytypeForm.get('listSubQueryQueAnsMapping') as FormArray;
    this.listSubQueryQueAnsMapping.push(this.createListSubQueryQueAnsMapping());
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
   if(radioValue ==0){
     this.ishidden = true;
   }else{
     this.ishidden = false;
   }
}

getPriorityRequired(value){
  this.priorityRequiredFlag =! this.priorityRequiredFlag;

}
addSubqueryInTable()
{
  this.rows.push( {applicationModuleName: this.applicationModuleData, queryTypedescription: this.queryType
    , subqueryTypedescription: this.subQueryType } );

    this.moduleListData = null;
    this.queryType = null;
    this.subQueryType = null;

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
this.queryService.addQueryType(this.querytypeForm.value).subscribe(res =>
  {
    this.addQueryTypeData = res.data.results.queryTypeMasterId[0];
    this.getAllQueryType();
    this.toster.success("",'Query Added Successfully');

  })
}
updateQueryType()
{
this.queryService.updateQueryType(this.querytypeForm.value).subscribe(res =>
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
