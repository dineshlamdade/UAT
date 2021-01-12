import { Component, OnInit } from '@angular/core';
import { LmsService } from './../lms.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  public summaryGridData: Array<any> = [];
  public selectedGridData: Array<any> = [];
  constructor(
    private service: LmsService,
  ) { }

  ngOnInit() {
    const data = {
      approverId: 0,
      flag: 'pending',
      };

    this.service.postApprovePage(data).subscribe((res) => {
      console.log(res);
      this.summaryGridData = res.data.results[0];
    });
  }

  onSelectUpload(data: any , event: { target: { checked: any; }; }) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedGridData.push(data);
       } else {
        const index = this.selectedGridData.indexOf(data.licTransactionId);
        this.selectedGridData.splice(index, 1);
     }
    console.log(this.selectedGridData);
  }

  approve() {
    const data = {

      applicationName: this.selectedGridData[0].applicationName,
      workflowName: this.selectedGridData[0].workflowName,
      workflowType: this.selectedGridData[0].workflowType,
      'employeeMasterId': this.selectedGridData[0].employeeMasterId,
      applicationTransactionId: this.selectedGridData[0].applicationTransactionId,
      subject: this.selectedGridData[0].subject,
      workflowMasterHeaderId : this.selectedGridData[0].workflowMasterHeaderId ,
      workflowTransactionHeaderId: this.selectedGridData[0].workflowTransactionHeaderId,
      workflowTransactionApproverId: this.selectedGridData[0].workflowTransactionApproverId,
      remark: 'okay approved',
      currentUser: 'Mayur',
      flag: 'Approved',

      };
    // data.forEach(element => {
    //   element.
    // });
    console.log(data);
    this.service.postApproveRejectSubmit(data).subscribe((res) => {
      console.log(res);
     // this.summaryGridData = res.data.results[0]
    });
  }

  reject() {
    const data = {

      applicationName: this.selectedGridData[0].applicationName,
      workflowName: this.selectedGridData[0].workflowName,
      workflowType: this.selectedGridData[0].workflowType,
      'employeeMasterId': this.selectedGridData[0].employeeMasterId,
      applicationTransactionId: this.selectedGridData[0].applicationTransactionId,
      subject: this.selectedGridData[0].subject,
      workflowMasterHeaderId : this.selectedGridData[0].workflowMasterHeaderId ,
      workflowTransactionHeaderId: this.selectedGridData[0].workflowTransactionHeaderId,
      workflowTransactionApproverId: this.selectedGridData[0].workflowTransactionApproverId,
      remark: 'okay approved',
      currentUser: 'Mayur',
      flag: 'Rejected',

      };
    // data.forEach(element => {
    //   element.
    // });
    console.log(data);
    this.service.postApproveRejectSubmit(data).subscribe((res) => {
      console.log(res);
     // this.summaryGridData = res.data.results[0]
    });
  }

  sendBack() {
    const data = {

      applicationName: this.selectedGridData[0].applicationName,
      workflowName: this.selectedGridData[0].workflowName,
      workflowType: this.selectedGridData[0].workflowType,
      'employeeMasterId': this.selectedGridData[0].employeeMasterId,
      applicationTransactionId: this.selectedGridData[0].applicationTransactionId,
      subject: this.selectedGridData[0].subject,
      workflowMasterHeaderId : this.selectedGridData[0].workflowMasterHeaderId ,
      workflowTransactionHeaderId: this.selectedGridData[0].workflowTransactionHeaderId,
      workflowTransactionApproverId: this.selectedGridData[0].workflowTransactionApproverId,
      remark: 'okay approved',
      currentUser: 'Mayur',
      flag: 'SendBack',

      };
    // data.forEach(element => {
    //   element.
    // });
    console.log(data);
    this.service.postApproveRejectSubmit(data).subscribe((res) => {
      console.log(res);
     // this.summaryGridData = res.data.results[0]
    });
  }

}
