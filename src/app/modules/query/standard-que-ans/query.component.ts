import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { NodeService } from '../nodeservice.service';
import { QueryService } from '../query.service';

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

   files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];
  allKeywords: any;
  isVisiblee:boolean=false;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService,
    private nodeService: NodeService,)
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
{
  this.keyword=
  [
    {
      "label": "Employee",
      "data": "Documents Folder",

      "children": [{
              "label": "Employee Code",
              "data": "Work Folder",
          },
          {
              "label": "Employee Name",
              "data": "Home Folder",
          },
          {
            "label": "Employee Email",
            "data": "Home Folder",
        }, {
          "label": "Employee Phone No",
          "data": "Home Folder",
      },
      {
        "label": "Employee Gender",
        "data": "Home Folder",

    }, {
      "label": "Employee Grade",
      "data": "Home Folder",


  }
        ]
  },
  {
      "label": "Company",
      "data": "Pictures Folder",

      "children": [
          {"label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo"},
          {"label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo"}]
  },
  {
      "label": "Date",
      "data": "Movies Folder",

      "children": [{
              "label": "Al Pacino",
              "data": "Pacino Movies",
              "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}]
          },
          {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}]
          }]
  }

  ]
}

  }
  ngOnInit(): void {
    this.getModuleName();
    this.getAllData();
    this.getStandardKeywords();
    // this.nodeService.getFiles().then(files => this.files1 = files);
    // this.nodeService.getFiles().then(files => this.files2 = files);

  }
  get f(){
    return this.queryForm.controls;
  }

  queryFormSubmit()
  {
    // console.log(JSON.stringify(this.queryForm.value));
    if(!this.editflag){
      this.queryService.addQuery(this.queryForm.value).subscribe(res =>
        {
          this.toster.success("",'Query Added Successfully');
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
     })
  }
  updateQuery()
  {
    this.queryService.updateQuery(this.queryForm.value).subscribe(res =>
      {
    this.toster.success("",'Query Updated Successfully');
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
    this.allKeywords = res.data.results[0];
    // this.displayName = this.allKeywords.displayName;
    console.log("************", this.allKeywords );
    // this.allKeywords.forEach(element => {

    // });
  })
}
changeEvent($event) {

  if ($event.target.checked) {
      this.hideRemarkDiv = false;

  }
  else {
      this.hideRemarkDiv = true;
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
