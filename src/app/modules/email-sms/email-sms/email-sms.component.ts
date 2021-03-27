import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { EmailSmsService } from '../email-sms.service';

@Component({
  selector: 'app-email-sms',
  templateUrl: './email-sms.component.html',
  styleUrls: ['./email-sms.component.scss']
})
export class EmailSmsComponent implements OnInit {

  emailSmsForm: FormGroup;
  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: [
      { name: 'basicstyles', items: ['Bold', 'Italic'] },
      { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo'] },
      { name: 'document', items: ['Source'] }
    ],
    allowedContent: true,
    fullPage: true,
    startupMode: 'source',
  };

  keyword: any = [];
  fieldMap: any;
  mappingData: any = [];
  emailSmsData: any;
  editFlag: boolean = false;
  remarkShowFlag: boolean = false;moduleListData: any;
;


  constructor(private emailService: EmailSmsService, private toaster: ToastrService) {

    this.keyword = [
      {
        'name': 'employeeCode',
        'id': 1,
        'description': 'Employee Code'
      },
      {
        'name': 'employeeFullName',
        'id': 2,
        'description': 'Employee Full Name'
      },
      {
        'name': 'employeeEmail',
        'id': 3,
        'description': 'Employee Email'
      },
      {
        'name': 'employeeContact',
        'id': 4,
        'description': 'Employee Contact'
      },
      {
        'name': 'employeeFirstName',
        'id': 5,
        'description': 'Employee First Name'
      },
      {
        'name': 'employeeLastName',
        'id': 6,
        'description': 'Employee Last Name'
      },
      {
        'name': 'employee1',
        'id': 8,
        'description': 'Employee1'
      },
      {
        'name': 'employee2',
        'id': 9,
        'description': 'Employee2'
      },
      {
        'name': 'employee3',
        'id': 10,
        'description': 'Employee3'
      },
      {
        'name': 'employee4',
        'id': 11,
        'description': 'Employee4'
      },
      {
        'name': 'employee5',
        'id': 12,
        'description': 'Employee5'
      }
    ]


    this.keyword.forEach(element => {
      this.mappingData.push(
        [element.id.toString(), '[' + element.description + ']']
      )
    })

    this.fieldMap = new Map<string, string>(this.mappingData);


    this.emailSmsForm = new FormGroup({
      "applicationModuleId": new FormControl('', [Validators.required]),
      "templateCode": new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
      "templateDescription": new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]),
      "emailSubject": new FormControl('', [Validators.required]),
      "emailBody": new FormControl('', [Validators.required]),
      "smsBody": new FormControl(''),
      "remark": new FormControl(''),
      "active": new FormControl(true)
    })
  }

  ngOnInit(): void {
    this.getEmailData()
    this.getModuleList()
  }

  getModuleList() {
    this.emailService.getModuleList().subscribe(res => {
      this.moduleListData = res.data.results;

    })
  }

  getEmailData() {
    this.emailService.getEmailSmsmData().subscribe(res => {
      this.emailSmsData = res.data.results;
    })
  }

  changeActiveStatus(event) {
    if (event.target.checked) {
      this.remarkShowFlag = false;
      this.emailSmsForm.controls['active'].setValue(true);
    }
    else {
      this.remarkShowFlag = true;
      this.emailSmsForm.controls['active'].setValue(false);

    }
  }

  emailSmsSubmit() {
    if (!this.editFlag) {
      this.emailService.saveEmailSms(this.emailSmsForm.value).subscribe(
        res => {
          this.toaster.success('', 'Email SMS Template Saved Successfully!!')
          this.emailSmsForm.reset();
          this.getEmailData();
          this.editFlag = false;
        }
      )
    } else {
      this.emailService.updateEmailSms(this.emailSmsForm.value).subscribe(
        res => {
          this.toaster.success('', 'Email SMS Template Updated Successfully!!')
          this.emailSmsForm.reset();
          this.editFlag = false;
          this.getEmailData();
        }
      )
    }

  }


  editEmailSms(data) {
    this.emailSmsForm.enable()
    this.emailSmsForm.patchValue(data);
    this.editFlag = true;
  }

  viewEmailSms(data) {
    this.emailSmsForm.disable()
    this.emailSmsForm.patchValue(data);
    this.editFlag = false;
  }

  reset() {
    this.emailSmsForm.reset();
    this.emailSmsForm.enable();
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

    console.log("data value after drop: " + dataValue)
    const startPos = ev.target.selectionStart;
    const endPos = ev.target.selectionEnd;

    console.log(ev.target.value)

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
