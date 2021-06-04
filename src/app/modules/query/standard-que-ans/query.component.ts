import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { QueryService } from '../query.service';
import { Table } from 'primeng/table';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [TreeDragDropService,MessageService],

})
export class QueryComponent implements OnInit {

  queryForm: FormGroup;
  ckeConfig: any;
  // public Editor = ClassicEditor;
  queryListData: any;
  editflag: boolean = false;
  hideRemarkDiv:boolean = false;
  isVisible:boolean=false;
  isShown: boolean= true;
  p: number = 1;
  moduleListData: any;
  keyword:any = [];
  data11 :any =[];
  fieldMap: any;

  mappingData: any = [];
  allKeywords: any;
  isVisiblee:boolean=false;
  queryCode: any;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,
    private alertService: AlertServiceService)
  {
    this.queryForm = this.formBuilder.group({
      // "createdBy": new FormControl(''),
      // "updatedBy": new FormControl(''),
      // "createdOn": new FormControl(''),
      // "updatedOn": new FormControl(''),
      "queAnsMasterId": new FormControl(0),
      "code": new FormControl(''),
      "description": new FormControl(null, [Validators.required ,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
      "moduleId": new FormControl(null,[Validators.required]),
      "questionSubject": new FormControl(null,[Validators.required]),
      "questionDescription": new FormControl(null),
      "answerSubject": new FormControl(''),
      "answerDescription": new FormControl(null),
      "remark": new FormControl(null),
      "active": new FormControl(true,[Validators.required]),
    });

    this.keyword.forEach(element => {
    this.mappingData.push(
      [element.dbFieldName.toString(), '[' + element.displayName + ']']
    )
    })
    this.fieldMap = new Map<string, string>(this.mappingData);

  }
  ngOnInit(): void {
    this.getModuleName();
    this.getAllData();
    this.getStandardKeywords();
  }
  get f(){
    return this.queryForm.controls;
  }

  queryFormSubmit()
  {
    if(!this.editflag){
      this.queryService.addQuery(this.queryForm.value).subscribe(res =>
        {

      this.alertService.sweetalertMasterSuccess('Q&A Template Added Successfully.', '' );

          this.queryForm.controls['active'].setValue(true);
          this.getAllData();
        })
    }else{
      this.updateQuery();
      this.queryForm.controls['active'].setValue(true);
    }
    this.queryForm.reset();
    if (this.queryForm.invalid) {
      return;
  }
  }
  getAllData()
  {
     this.queryService.getAll().subscribe( res =>{
       this.queryListData = res.data.results;
      this.queryCode = this.queryListData[4].code + 1;
     })
     this.queryForm.controls['code'].setValue(this.queryCode);
  }
  updateQuery()
  {
    this.queryService.updateQuery(this.queryForm.value).subscribe(res =>
      {
    this.alertService.sweetalertMasterSuccess('Q&A Template Updated Successfully.', '' );

    this.getAllData();
      }
      )
  }
  editQuery(query)
  {
    this.editflag = true;
    this.queryForm.enable();
    this.queryForm.patchValue(query);
    this.isVisible =true;
    this.isShown = false;
    this.queryForm.controls['code'].disable();
  }
  viewQuery(query)
  {
   this.editflag = false;
   this.queryForm.patchValue(query);
   this.queryForm.disable();
   this.isVisiblee =true;
   this.isVisible = false;
   this.isShown =false;
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
getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;

  })
}
getStandardKeywords(){
  this.queryService.getStandardKeywords().subscribe(res =>{
    this.keyword = res.data.results;
  })
}
changeEvent($event) {

  if ($event.target.checked) {
      this.hideRemarkDiv = false;
      // this.queryForm.controls['remark'].clearValidators();

  }
  else {
      this.hideRemarkDiv = true;
      // this.queryForm.controls['remark'].setValidators([Validators.required]);
  }

}

/*** CKeditor Drag and Drop */

allowDrop(ev): void {
  ev.preventDefault();
}
drag(ev): void {
  ev.dataTransfer.setData('text', ev.target.id);
}
drop(ev): void {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text');
  const dataValue = this.fieldMap.get(data);

  console.log("data value after drop: "+ dataValue)
  const startPos = ev.target.selectionStart;
  const endPos = ev.target.selectionEnd;

  console.log( ev.target.value)

  ev.target.value = ev.target.value.substring(0, startPos)
    + dataValue
    + ev.target.value.substring(endPos, ev.target.value.length);

  let bodyValue = ev.target.value.substring(0, startPos)
    + '[' + data + ']'
    console.log(bodyValue)
}

getModuleNamefortable(moduleid){
  let modulename = ''
  this.moduleListData.forEach(element => {
    if(element.applicationModuleId == moduleid){
      modulename = element.applicationModuleName
    }
  });
 return modulename;
}

editorConfig = {
  toolbar: [
    { name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
  { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
  { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
  { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
  '/',
  { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
  { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
  { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
  { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
  '/',
  { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
  {name: 'colors', items : ['TextColor', 'BGColor']},
  { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
  { name: 'about', items: [ 'About' ] },
  { name: 'colors' },

  ],
  allowedContent: true,


};

}
