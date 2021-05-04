import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-query-type-master',
  templateUrl: './query-type-master.component.html',
  styleUrls: ['./query-type-master.component.scss']
})
export class QueryTypeMasterComponent implements OnInit {

  querytypeForm: FormGroup;
  moduleListData: any;
  queryListData: any;
  p: number = 1;
  isVisible: boolean = false;
  isShown: boolean = true;
  ishidden: boolean = false;
  priorityRequiredFlag: boolean = false;
  public addSubQueryList: FormArray;
  hideRemarkDiv: boolean = false;
  hideRemarkDiv1: boolean = false;
  queryTypeAllData: any;

  addQueryTypeData: any;
  updateQueryTypeData: any;

  addField: boolean = true;
  removeField: boolean = false;
  editflag: boolean = false;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  allWorkflowMasterdata: any;

  // get queryTypeFormGroup() {
  //   return this.querytypeForm.get('queryArray') as FormArray;
  // }

  constructor(public formBuilder: FormBuilder, 
    public queryService: QueryService, 
    public toster: ToastrService) {

    this.querytypeForm = new FormGroup(
      {
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
        "active": new FormControl(true),
        "Replayworkflow": new FormControl(""),
        "listQueryAnsMappingReqDTO": new FormControl([]),
        "listQueryPriorityRequestDTO": new FormControl([]),
        "subQueryRequestDTO": new FormControl([])
      }
    )
  }

  ngOnInit(): void {
    // this.querytypeForm = this.formBuilder.group({
    //   subQueryCode: '',
    //   subQueryDescription: '',
    //   assignQATemplate: '',
    //   queryArray: this.formBuilder.array([this.createSubquery()])
    // })
    // this.addSubQueryList = this.querytypeForm.get('queryArray') as FormArray;
    this.getModuleName();
    this.getAll();

    this.getAllWorkflowMasters();
    // this.querytypeForm.controls['queryTypeCode'].setValue(queryTypeCode);
    // this.querytypeForm.controls['subQueryTypeCode'].setValue(subQueryTypeCode);

    this.queryListData = [
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
    // this.dropdownSettings :IDropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true,
    // };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);

  }
  addSubQuery(index) {
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

  removeSubQuery(index) {
    this.addSubQueryList.removeAt(index);

  }
  querytypeFormSubmit() {
    if (!this.editflag) {
      this.addQueryType();
    } else {
      this.updateQueryType();
    }
    this.querytypeForm.reset();
    if (this.querytypeForm.invalid) {
      return;
    }
    this.querytypeForm.reset();

  }
  getModuleName() {
    this.queryService.getModuleName().subscribe(res => {
      this.moduleListData = res.data.results;

    })
  }
  radioButtonChanged(event) {
    let radioValue = event.target['value'];
    if (radioValue == 0) {
      this.ishidden = true;
    } else {
      this.ishidden = false;
    }
  }

  getPriorityRequired(value) {
    this.priorityRequiredFlag = !this.priorityRequiredFlag;

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
  queryTypeMasterId: number;
  getAllQueryType() {
    this.queryService.getAllQueryType(this.queryTypeMasterId).subscribe(res => {

      this.queryTypeAllData = res.data.results[0];
      console.log("**********", this.queryTypeAllData);
    })
    //  this.addQueryType();
  }
  addQueryType() {
    this.queryService.addQueryType(this.querytypeForm.value).subscribe(res => {
      this.addQueryTypeData = res.data.results.queryTypeMasterId[0];
      this.getAllQueryType();
      this.toster.success("", 'Query Added Successfully');

    })
  }
  updateQueryType() {
    this.queryService.updateQueryType(this.querytypeForm.value).subscribe(res => {
      this.updateQueryTypeData = res.data.results[0];
      this.toster.success("", 'Query Updated Successfully');

    })
  }
  getAllWorkflowMasters() {
    this.queryService.getAllWorkflowMasters().subscribe(res => {
      this.allWorkflowMasterdata = res.data.results;
    })
  }
  getAll() {
    this.queryService.getAll().subscribe(res => {
      this.queryListData = res.data.results;
    })
  }
  editQuery(query) {
    this.editflag = true;
    this.querytypeForm.enable();
    this.querytypeForm.patchValue(query);
    this.isVisible = true;
    this.isShown = false;

  }
  viewQuery(query) {
    this.editflag = false;
    this.querytypeForm.patchValue(query);
    this.querytypeForm.disable();
  }
  reset() {
    this.querytypeForm.enable();
    this.querytypeForm.reset();
    this.querytypeForm.controls['active'].setValue(true);
  }
  cancel() {
    this.reset();
    this.querytypeForm.controls['active'].setValue(true);
  }

}
