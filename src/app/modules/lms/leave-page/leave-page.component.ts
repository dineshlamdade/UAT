import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators   } from '@angular/forms';
import { map } from 'rxjs/operators';
import {AlertServiceService} from './../../../core/services/alert-service.service'
import { LmsService } from './../lms.service';

@Component({
  selector: 'app-leave-page',
  templateUrl: './leave-page.component.html',
  styleUrls: ['./leave-page.component.scss'],
})
export class LeavePageComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public today = new Date();
  public policyMinDate: Date;
  public minFormDate: Date;
  public paymentDetailMinDate: Date;
  public leaveTypes: Array<any> = [];
  public summaryGridData: Array<any> = [];

  public showUpdateButton: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private _HTTP: HttpClient,
    private service: LmsService,
    private alertService: AlertServiceService,
  ) {
    this.form = this.formBuilder.group({
      empId: new FormControl(null),
      leaveType: new FormControl(null, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      leaveDays: new FormControl({value: null, disabled: true}),
      // remark: new FormControl(null),
      status: new FormControl('Pending'),
    });
    this.leaveTypes = ['PL', 'SL', 'CL', 'LWP'];
  }

  public ngOnInit(): void {
    this.service.getLeavePage().subscribe((res) => {
      console.log(res);
      this.summaryGridData = res.data.results;
    });
  }

  submit(formData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const from = this.datePipe.transform(this.form.get('fromDate').value, 'dd-MMM-yyyy');
    const to = this.datePipe.transform(this.form.get('toDate').value, 'dd-MMM-yyyy');
    const data = this.form.getRawValue();

    data.fromDate = from;
    data.toDate = to;

    console.log('Leave ::', data);
    this.service.postLeavePage(data).subscribe((res) => {
      console.log(res);
      const data2 = {

        applicationName: 'LMS',
        workflowName: 'Leave',
        workflowType: data.leaveType,
        employeeMasterId: data.empId,
        applicationTransactionId: res.data.results[0].leaveApplicationId,
        subject: '1 Day CL',
        workflowMasterHeaderId : null ,
        workflowTransactionHeaderId: null,
        workflowTransactionApproverId: null,
        remark: null,
        currentUser: 'Mayur',
        flag: 'Submit',

        };
        console.log(data2);
      this.service.postSaveWorkFlowMaster(data2).subscribe((res2) => {
        console.log(res2);
        this.alertService.sweetalertMasterSuccess(res.status.result, res.status.messsage);
        this.service.getLeavePage().subscribe((res) => {
          console.log(res);
          this.summaryGridData = res.data.results;
        });
      });

    });

    // formDirective.resetForm();
    // this.form.reset();
    this.showUpdateButton = false;
    this.submitted = false;
   

  }

  setPolicyEndDate() {
    this.policyMinDate = this.form.value.fromDate;
    const policyStart = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    const policyEnd = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
    this.minFormDate = this.policyMinDate;
    if (policyStart > policyEnd) {
        this.form.controls.toDate.reset();
    }
    this.form.patchValue({
        fromDate: this.policyMinDate,
    });

    this.setPaymentDetailToDate();
  }

  setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.form.value.fromDate;
    const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
    if (from > to) {
      this.form.controls.toDate.reset();
    }
  }

  checkFinancialYearStartDateWithPolicyEnd() {
    // const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
    // const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
    // if (policyEnd < financialYearStartDate) {
    //   this.alertService.sweetalertWarning('Policy End Date should be greater than or equal to Current Financial Year : '
    //   + this.financialYearStart);
    //   this.form.controls.policyEndDate.reset();
    // } else {
    //   this.form.patchValue({
    //     toDate: this.form.value.policyEndDate,
    //   });
    //   this.maxFromDate = this.form.value.policyEndDate;
    // }

    const startDate = this.form.get('fromDate').value;
    const endDate = this.form.get('toDate').value;
    if (endDate) {
      this.form.patchValue({
        leaveDays: Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) / (1000 * 60 * 60 * 24)) + 1,
      });
    }
    // this.form.patchValue({
    //       leaveDays: Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(1000 * 60 * 60 * 24)) +1
    //     });
  }

}
