import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';

export class JoineeModel {  
  constructor(  
    public sameCode: any,
    public rejoinee: any,
    public employeeMasterId: any
  ){} 
}

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
  sameCode: boolean;
  user: any;
  JoineeModel = new JoineeModel('', '','')



  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private EventEmitterService: EventEmitterService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.confirmMsg = data.pageValue;
    this.info = data.info;
    this.payrollEditItem = data.payrollEditItem;
    this.employee = data.employee;
    this.user = data.user;
  }

  ngOnInit() {
  }

  confirmCopy() {
    debugger
    this.dialogRef.close();
    this.EventEmitterService.setCopyFromConfirmation(this.confirmMsg);
    if (this.confirmMsg == 'IdentityForm') {
      this.EventEmitterService.getConfirmDeleteIdentityForm();
    }
    if (this.confirmMsg == 'PreviousEmpForm') {
      this.EventEmitterService.getConfirmDeletePreviousEmpForm(this.employee);
    }
    if (this.confirmMsg == 'educationItemDelete') {
      this.EventEmitterService.getConfirmDeleteEducationSkills(this.confirmMsg)
    }
    if (this.confirmMsg == 'languageItemDelete') {
      this.EventEmitterService.getConfirmDeleteEducationSkills(this.confirmMsg)
    }
    if (this.confirmMsg == 'skillsItemDelete') {
      this.EventEmitterService.getConfirmDeleteEducationSkills(this.confirmMsg)
    }
    if (this.confirmMsg == 'payrollItemDelete') {
      debugger
      let payrollEditItem;
      payrollEditItem = this.payrollEditItem;
      payrollEditItem.confirmMsg = this.confirmMsg;
      this.EventEmitterService.getConfirmDeletePayrollArea(payrollEditItem)
    }
    debugger

    if (this.confirmMsg == 'joinee') {
      // var joinee: any;
      this.JoineeModel.sameCode = true;
      this.JoineeModel.rejoinee = true;
      this.JoineeModel.employeeMasterId = this.user.employeeMasterId;
      this.router.navigate(['/employee-master/personal-information']);
      setTimeout(() => {
        this.EventEmitterService.getAddjoinee(this.JoineeModel);
      }, 500)
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
    if (this.confirmMsg == 'joinee') {
      this.JoineeModel.sameCode = false;
      this.JoineeModel.rejoinee = true;
      this.JoineeModel.employeeMasterId = this.user.employeeMasterId;
      this.router.navigate(['/employee-master/personal-information']);
      setTimeout(() => {
        this.EventEmitterService.getAddjoinee(this.JoineeModel);
      }, 500)
    }
  }
  clearBirthDate() {
    debugger
    if (this.confirmMsg == 'EmployeeAgeConfirmation') {
      this.dialogRef.close();
      this.EventEmitterService.getClearBirthDate();
      // this.confirmMsg = '';
    }
  }
}