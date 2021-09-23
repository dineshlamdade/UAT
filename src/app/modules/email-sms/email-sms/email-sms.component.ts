import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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


this.emailService.getStandardKeywords().subscribe(res =>
  {
   this.keyword = res.data.results;
  })

    this.keyword.forEach(element => {
      this.mappingData.push(
        [element.dbFieldName.toString(), '[' + element.displayName + ']']
      )
    })

    this.fieldMap = new Map<string, string>(this.mappingData);


    this.emailSmsForm = new FormGroup({
      "emailSMSTemplateMasterId": new FormControl(),
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
    // this.emailService.getModuleList().subscribe(res => {
    //   this.moduleListData = res.data.results;

    // })

    this.moduleListData = [
      {
        'applicationModuleId':1,
        'applicationModuleName':'Payroll'
      },
      {
        'applicationModuleId':2,
        'applicationModuleName':'Employee Master'
      },
      {
        'applicationModuleId':3,
        'applicationModuleName':'Investment'
      }
    ]
  }

  getEmailData() {
    this.emailSmsData = []
    this.emailService.getEmailSmsmData().subscribe(res => {
      res.data.results.forEach(element => {
        if(element.active == true){
          this.emailSmsData.push(element)
        }
      });
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

    let moduleId = parseInt(this.emailSmsForm.controls['applicationModuleId'].value)
    this.emailSmsForm.controls['applicationModuleId'].setValue(moduleId)



    if (!this.editFlag) {
      this.emailSmsForm.removeControl('emailSMSTemplateMasterId');
      let data = [
        this.emailSmsForm.value
      ]
      console.log("save data: " + JSON.stringify(data))
      this.emailService.saveEmailSms(data).subscribe(
        res => {
          if(res.status.result == 'Success'){
            this.toaster.success('', res.status.messsage)
            this.emailSmsForm.reset();
            this.getEmailData();
            this.editFlag = false;
          }else{
            this.toaster.error('', res.status.messsage)
            this.getEmailData();
            this.editFlag = false;
          }


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
    this.editFlag = false;
  }

  getModuleName(moduleid){
    let modulename = ''
   this.moduleListData.forEach(element => {
     if(element.applicationModuleId == moduleid){
       modulename = element.applicationModuleName
     }
   });
   return modulename;
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
      + '<<' + data + '>>'
    // + ev.target.value.substring(endPos, ev.target.value.length);

    // console.log( ev.target.value.substring(0, startPos))

    // console.log(data)

    // console.log(ev.target.value.substring(endPos, ev.target.value.length))

    console.log(bodyValue)
  }

}
