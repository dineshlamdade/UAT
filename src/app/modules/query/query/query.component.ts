import value from '*.json';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  hideRemarkDiv:boolean = false;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService) {

    this.queryForm = this.formBuilder.group({
      "createdBy": new FormControl(''),
      "updatedBy": new FormControl(''),
      "createdOn": new FormControl(''),
      "updatedOn": new FormControl(''),
      "id": new FormControl(0),
      "code": new FormControl(''),
      "description": new FormControl(null, [Validators.required ,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
      "moduleId": new FormControl(null,[Validators.required]),
      "questionSubject": new FormControl(null,[Validators.required]),
      "questionDescription": new FormControl(null),
      "answerSubject": new FormControl(null,[Validators.required]),
      "answerDescription": new FormControl(null),
      "remark": new FormControl(''),
      "active": new FormControl(true,[Validators.required]),

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
          this.queryForm.controls['active'].setValue(true);
        })
    }else{
      this.updateQuery();
      this.queryForm.controls['active'].setValue(true);
    }
    this.getAllData();
    this.queryForm.reset();

    if (this.queryForm.invalid) {
      return;
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
    this.queryForm.controls['code'].setValue(value);
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
    this.queryForm.controls['active'].setValue(true);

  }
cancel()
{
  this.reset();
  this.queryForm.controls['active'].setValue(true);
}
changeEvent($event) {
  if ($event.target.checked) {
      this.hideRemarkDiv = false;
  }
  else {
      this.hideRemarkDiv = true;
  }

}
// deactiveActiveCheckBox()
// {

// }
}
