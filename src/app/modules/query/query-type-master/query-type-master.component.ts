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

  get queryTypeFormGroup() {
    return this.querytypeForm.get('queryArray') as FormArray;
  }

  constructor(public formBuilder : FormBuilder,public queryService :QueryService ,public toster : ToastrService) {
    this.querytypeForm = this.formBuilder.group(
      {
        "createdBy": new FormControl(''),
        "updatedBy": new FormControl(''),
        "createdOn": new FormControl(''),
        "updatedOn": new FormControl(''),
        "queAnsMasterId": new FormControl(0),
        "code": new FormControl(''),
        "description": new FormControl(null, [Validators.required ,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
        "moduleId": new FormControl(null,[Validators.required]),
        "questionSubject": new FormControl(null,[Validators.required]),
        "questionDescription": new FormControl(null),
        "answerSubject": new FormControl(null,[Validators.required]),
        "answerDescription": new FormControl(null),
        "remark": new FormControl(null),
        "active": new FormControl(true,[Validators.required]),
        "assign":new FormControl(''),
      }
    )
  }

  ngOnInit(): void {
    this.querytypeForm = this.formBuilder.group({
      subQueryCode: [''],
      subQueryDescription: [''],
      assignQATemplate: [''],
      queryArray: this.formBuilder.array([this.createSubquery()])
    })
    this.addSubQueryList = this.querytypeForm.get('queryArray') as FormArray;
    this.getModuleName();
  }

  querytypeFormSubmit()
  {

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
  this.priorityRequiredFlag =! this.priorityRequiredFlag

}
// ...........................add remove field Code..........................................................
addSubQuery()
{
  this.addSubQueryList.push(this.createSubquery());
}
  createSubquery(): FormGroup {
    return this.formBuilder.group({
      subQueryCode: [''],
      subQueryDescription: [''],
      assignQATemplate: [''],

    });
  }

removeSubQuery(index)
{
  this.addSubQueryList.removeAt(index);

}

}
