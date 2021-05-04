import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailSmsService } from '../email-sms.service';

@Component({
  selector: 'app-email-sms',
  templateUrl: './email-sms.component.html',
  styleUrls: ['./email-sms.component.scss']
})
export class EmailSmsComponent implements OnInit {

  emailSmsForm: FormGroup;
  // public Editor = ClassicEditor;

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


  constructor(private emailService: EmailSmsService) {
    this.keyword = [
      {
        'name':'employeeCode',
        'id': 1,
        'description': 'Employee Code'
    },
    {
        'name':'employeeFullName',
        'id': 2,
        'description': 'Employee Full Name'
    },
    {
        'name':'employeeEmail',
        'id': 3,
        'description': 'Employee Email'
    },
    {
        'name':'employeeContact',
        'id': 4,
        'description': 'Employee Contact'
    },
    {
        'name':'employeeFirstName',
        'id': 5,
        'description': 'Employee First Name'
    },
    {
        'name':'employeeLastName',
        'id': 6,
        'description': 'Employee Last Name'
    },
    {
        'name':'employee1',
        'id': 8,
        'description': 'Employee1'
    },
    {
        'name':'employee2',
        'id': 9,
        'description': 'Employee2'
    },
    {
        'name':'employee3',
        'id': 10,
        'description': 'Employee3'
    },
    {
        'name':'employee4',
        'id': 11,
        'description': 'Employee4'
    },
    {
        'name':'employee5',
        'id': 12,
        'description': 'Employee5'
    }
    ]


   this.keyword.forEach( element => {
    this.mappingData.push(
      [element.id.toString() , '[' + element.description +']' ]
    )
  })

  this.fieldMap = new Map<string, string>(this.mappingData);


    this.emailSmsForm = new FormGroup({
      'templateCode': new FormControl(''),
      'templateName': new FormControl(''),
      'moduleId': new FormControl(''),
      'emailSubject': new FormControl(''),
      'emailBody': new FormControl(''),
      'smsBody': new FormControl(''),
      'status': new FormControl(true),
      'remark':new FormControl('')
    })
   }

  ngOnInit(): void {
     this.getEmailData()
  }

  getEmailData(){
    this.emailService.getEmailSmsmData().subscribe( res=>{
      this.emailSmsData = res.data.results;
    })
  }

  emailSmsSubmit(){

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
      // + ev.target.value.substring(endPos, ev.target.value.length);

      // console.log( ev.target.value.substring(0, startPos))

      // console.log(data)

      // console.log(ev.target.value.substring(endPos, ev.target.value.length))

      console.log(bodyValue)
  }

}
