import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators   } from '@angular/forms';
import {AlertServiceService} from './../../../core/services/alert-service.service';
import { workflowService } from './../workflow.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  public form: FormGroup;
  public serviceName: string[];
  public submitted: boolean;
  public showUpdateButton: boolean;
  public summaryGridData: Array<any> = [];
  cancelButton: boolean;
  index: number;
  constructor(
    private formBuilder: FormBuilder,
    private service: workflowService,
  ) {
    this.form = this.formBuilder.group({
      workflowMasterHeaderId: new FormControl(0),
      workflowServiceMasterId: new FormControl(0),
     workflowCode: new FormControl(null, Validators.required),
     description:  new FormControl(null, Validators.required),
     workflowType: new FormControl(null, Validators.required),
    numberOfApprover: new FormControl(null, Validators.required),
    });
   // this.serviceName = ['','LMS', 'Reimbursement'];
  }

  ngOnInit() {
    this.summaryGridData = [{
      numberOfApprover: 3,
      workflowType: "Reimbursement",
workflowCode: "1",
workflowDescription: "2",
workflowMasterheaderId: 0,
workflowServiceMasterId: 0,
    }]
    this.service.getMasterServiceList().subscribe((res)=>{
      this.service = res.data.results;
      console.log('servicelist ::',this.service);
    })
    this.service.getMasterSummaryData().subscribe((res)=>{
      console.log('SummaryData ::',res);
      this.summaryGridData = res.data.results;
    })
  }

  submit(formData: any, formDirective: FormGroupDirective) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue();

    console.log('workflow ::', data);
    console.log(this.index);
    if (this.index>=0)  {
      //this.summaryGridData[this.index]= this.form.getRawValue();
    }
    else{
     // this.summaryGridData.push(this.form.getRawValue());
     this.service.postMasterFormData(data).subscribe((res)=>{
       console.log(res)
      this.summaryGridData = res.data.results;
    })

    }


    this.showUpdateButton = false;
    this.submitted = false;
    formDirective.resetForm();
    this.form.reset();
    this.index = -1;

  }
  view(i) {
    this.form.setValue(this.summaryGridData[i]);
    this.form.disable();
    this.cancelButton = true;
    }

  edit(i) {
    this.form.patchValue(this.summaryGridData[i]);
    this.showUpdateButton = true;
    this.index = i;
    }

  cancel(formDirective: FormGroupDirective){
    this.form.enable();
    this.cancelButton = false;
    formDirective.resetForm();
    this.form.reset();
    this.index = -1;
    this.showUpdateButton = false;

  }
}
