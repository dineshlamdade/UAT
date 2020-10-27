import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';


@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  confirmMsg: any;
  info: any;
  payrollEditItem: any;
  employee: any;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private EventEmitterService: EventEmitterService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.confirmMsg = data.pageValue;
    this.info = data.info;
    this.payrollEditItem = data.payrollEditItem;
    this.employee = data.employee;
  }

  ngOnInit() {
   }

  confirmCopy() {
    debugger
    this.dialogRef.close();
    this.EventEmitterService.setCopyFromConfirmation(this.confirmMsg);
    if(this.confirmMsg == 'IdentityForm'){
      this.EventEmitterService.getConfirmDeleteIdentityForm();
    }
    if(this.confirmMsg == 'PreviousEmpForm'){
      this.EventEmitterService.getConfirmDeletePreviousEmpForm(this.employee);
    }
    if(this.confirmMsg == 'educationItemDelete'){
      this.EventEmitterService.getConfirmDeleteEducationSkills(this.confirmMsg)
    }
    if(this.confirmMsg == 'languageItemDelete'){
      this.EventEmitterService.getConfirmDeleteEducationSkills(this.confirmMsg)
    }
    if(this.confirmMsg == 'skillsItemDelete'){
      this.EventEmitterService.getConfirmDeleteEducationSkills(this.confirmMsg)
    }
    if(this.confirmMsg == 'payrollItemDelete'){
      debugger
      let payrollEditItem;
      payrollEditItem = this.payrollEditItem;
      payrollEditItem.confirmMsg = this.confirmMsg;
      this.EventEmitterService.getConfirmDeletePayrollArea(payrollEditItem)
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  clearBirthDate() {
    debugger
    if (this.confirmMsg == 'EmployeeAgeConfirmation') {
      this.EventEmitterService.getClearBirthDate();
    }
  }
}