import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from '../query.service';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// declare global { interface Window { editor: any; } }

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
  isVisible:boolean=false;
  isShown: boolean= true;
  p: number = 1;
  moduleListData: any;

  editorConfig = {
    toolbar: [
      { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },
      { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ] },
      { name: 'document', items: ['Source'] }
    ],
    allowedContent: true,
    fullPage: true,
    startupMode: 'source',
  };

  keyword:any = [];
  fieldMap: any;
  mappingData: any = [];
  emailSmsData: any;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService)
  {

    this.queryForm = this.formBuilder.group({
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

    });

    this.keyword = [
      {
        'name':'Employee Code',
        'id': 1,
        'description': 'Employee Code'
    },
    {
        'name':'Employee Full Name',
        'id': 2,
        'description': 'Employee Full Name'
    },
    {
        'name':'Employee Email',
        'id': 3,
        'description': 'Employee Email'
    },
    {
        'name':'Employee Contact',
        'id': 4,
        'description': 'Employee Contact'
    },
    {
        'name':'Employee Gender',
        'id': 5,
        'description': 'Employee Gender'
    },
    {
        'name':'Employee Gread',
        'id': 6,
        'description': 'Employee Gread'
    },
    {
      'name':'Employee Company',
      'id': 7,
      'description': 'Employee Company'
  },
  {
    'name':'Date',
    'id': 8,
    'description': 'Date'
},

    ]

    this.keyword.forEach( element => {
      this.mappingData.push(
        [element.id.toString() , '[' + element.description +']' ]
      )
    })

    this.fieldMap = new Map<string, string>(this.mappingData);

  }
  ngOnInit(): void {

    this.getAllData();
    this.getModuleName();


    // DecoupledEditor
    // .create( '<h2>Hello world!</h2>', {
    //     toolbarContainer: document.querySelector( '.toolbar-container' ),
    //     editableContainer: document.querySelector( '.editable-container' )

    // } )
    // .then( editor => {
    //     window.editor = editor;
    // } )
    // .catch( err => {
    //     console.error( err.stack );
    // } );
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
changeEvent($event) {
  // alert(this.hideRemarkDiv)
  if ($event.target.checked) {
      this.hideRemarkDiv = false;
      // this.queryForm.controls['active'].setValue(true);
  }
  else {
      this.hideRemarkDiv = true;
      // this.queryForm.controls['active'].setValue(false);

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


}
