import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { isThisISOWeek } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  queryForm: FormGroup;
  ckeConfig: any;
  public Editor = ClassicEditor;
  queryListData: any;
  editflag: boolean = false;
  toogleBool:boolean = true;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService) {

    this.queryForm = this.formBuilder.group({
      "createdBy": new FormControl(''),
      "updatedBy": new FormControl(''),
      "createdOn": new FormControl(''),
      "updatedOn": new FormControl(''),
      "id": new FormControl(0),
      "code": new FormControl(''),
      "description": new FormControl(null, [Validators.required ,Validators.pattern('^[a-zA-Z0-9_]*$')]),
      "moduleId": new FormControl(''),
      "questionSubject": new FormControl(''),
      "questionDescription": new FormControl(''),
      "answerSubject": new FormControl(''),
      "answerDescription": new FormControl(''),
      "remark": new FormControl(''),
      "active": new FormControl(true),

    });
  }
  ngOnInit(): void {
    this.getAllData();
  }
  get f(){
    return this.queryForm.controls;
  }
  queryFormSubmit()
  {
    if(!this.editflag){
      this.queryService.addQuery(this.queryForm.value).subscribe(res =>
        {
          this.toster.success("",'Query Added Successfully');
        })
    }else{
      this.updateQuery();
    }
    this.getAllData();
  }
  getAllData()
  {
     this.queryService.getAll().subscribe( res =>{
       this.queryListData = res.data.results;
     })
  }
  updateQuery()
  {
    this.queryService.updateQuery(this.queryForm.value).subscribe(res =>
      {
    this.toster.success("",'Query Updated Successfully');
      }
      )
  }
  editQuery(query)
  {
    this.editflag = true;
    this.queryForm.enable();
    this.queryForm.patchValue(query);
  }
  viewQuery(query)
  {
    this.editflag = false;
   this.queryForm.patchValue(query);
   this.queryForm.disable();
  }
  reset(){
    this.queryForm.enable();
    this.queryForm.reset();
  }
cancel()
{
  this.reset();
  this.queryForm.controls['active'].setValue(true);
}
changeEvent(event) {
  if (event.target.checked) {
      this.toogleBool= true;
  }
  else {
      this.toogleBool= false;
  }

}
}
