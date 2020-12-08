import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProjectDetailsModel } from './../../../dto-models/project-details.model';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { JobInformationService } from '../../../employee-master-services/job-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PayrollAreaInformationService } from '../../../employee-master-services/payroll-area-information.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  projectForm: FormGroup;
  tomorrow = new Date();
  projectDetailsModel = new ProjectDetailsModel('', '',null, null, null, '', '', null, '', '', '', '', '');
  projectList = 'Project1,Project2,Project3,Project4,Project5'.split(',');
  billableList = 'Billable,Not Billable,Not Applicable'.split(',');

  employeeMasterId: number;
  employeeProjectDetailId: any;
  confirmMsg: any;
  isOnBenchBoolean: any;
  payrollAreaList: Array<any> = [];
  totalPayrollAreaList: Array<any> = [];
  payrollAreaCode:'';




  constructor(public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder,private PayrollAreaService: PayrollAreaInformationService,private CommonDataService: SharedInformationService) {
    this.tomorrow.setDate(this.tomorrow.getDate());

  }


  ngOnInit(): void {

    
    this.projectForm = this.formBuilder.group({
      projectNameControl: [''],
      projectDescriptionControl: [''],
      projectFromDateControl: [{ value: null, disabled: true }],
      projectToDateControl: [{ value: null, disabled: true }],
      billableControl: [''],
      billableFromDateControl: [{ value: null, disabled: true }],
      billableToDateControl: [{ value: null, disabled: true }],
      isOnBenchControl: [''],
      benchFromDateControl: [{ value: null, disabled: true }],
      benchToDateControl: [{ value: null, disabled: true }],
    });

    this.payrollAreaCode=null;
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area's
    debugger
   this.getPayrollAreaInformation();

    this.getProjectFormForm()
  }

  getProjectFormForm() {
    debugger
    this.JobInformationService.getProjectDetails(this.employeeMasterId).subscribe(res => {
      console.log("res.data.results[0]: "+res.data.results[0]);
      if (res.data.results[0]) {
        this.employeeProjectDetailId = res.data.results[0].employeeProjectDetailId;
           this.projectDetailsModel = res.data.results[0];
           console.log('this.projectDetailsModel.isOnBench' +  this.projectDetailsModel.isOnBench);
        if (this.projectDetailsModel.isOnBench == 1) {
         // this.projectDetailsModel.isOnBench = 'yes';
          this.isOnBenchBoolean= 'yes';
          this.projectForm.value.isOnBenchControl = 'yes';
        }
      
        if (this.projectDetailsModel.isOnBench == 0) {
         // this.projectDetailsModel.isOnBench = 'no';
          this.isOnBenchBoolean= 'no';
          this.projectForm.value.isOnBenchControl = 'no';
        }
        console.log(' this.projectForm.value.isOnBenchControl' +   this.projectForm.value.isOnBenchControl);
        if (this.projectDetailsModel.projectName != null) {
          const projectFromDate = this.projectForm.get('projectFromDateControl');
          projectFromDate.enable();
          const projectToDate = this.projectForm.get('projectToDateControl');
          projectToDate.enable();
        }

        if (this.projectDetailsModel.billable != null ) {
          const billableFromDate = this.projectForm.get('billableFromDateControl');
          billableFromDate.enable();
          const billableToDate = this.projectForm.get('billableToDateControl');
          billableToDate.enable();
        }

        if (this.isOnBenchBoolean != 'no' ) {
          const benchFromDate = this.projectForm.get('benchFromDateControl');
          benchFromDate.enable();
          const benchToDate = this.projectForm.get('benchToDateControl');
          benchToDate.enable();
        }
      }

    })
  }

  selectionChallenged(event) {
    
    this.projectDetailsModel.isOnBench = event.value;
  }
  projectDetailsSubmit(projectDetailsModel) {
    debugger
    projectDetailsModel.employeeMasterId = this.employeeMasterId;
    projectDetailsModel.employeeProjectDetailId = this.employeeProjectDetailId;
    projectDetailsModel.payrollAreaCode=this.payrollAreaCode;

    // if (this.projectDetailsModel.isOnBench == 'yes') {
    //   this.projectDetailsModel.isOnBench = 1;
      
    // }
    // if (this.projectDetailsModel.isOnBench == 'no') {
    //   this.projectDetailsModel.isOnBench = 0;
    // }

    if (this.isOnBenchBoolean == 'yes') {
      this.projectDetailsModel.isOnBench = 1;
      
    }
    if (this.isOnBenchBoolean == 'no') {
      this.projectDetailsModel.isOnBench = 0;
    }

    projectDetailsModel.projectFromDate = this.datepipe.transform(projectDetailsModel.projectFromDate, "dd-MMM-yyyy");
    projectDetailsModel.projectToDate = this.datepipe.transform(projectDetailsModel.projectToDate, "dd-MMM-yyyy");
    projectDetailsModel.billableFromDate = this.datepipe.transform(projectDetailsModel.billableFromDate, "dd-MMM-yyyy");
    projectDetailsModel.billableToDate = this.datepipe.transform(projectDetailsModel.billableToDate, "dd-MMM-yyyy");
    projectDetailsModel.benchFromDate = this.datepipe.transform(projectDetailsModel.benchFromDate, "dd-MMM-yyyy");
    projectDetailsModel.benchToDate = this.datepipe.transform(projectDetailsModel.benchToDate, "dd-MMM-yyyy");

    this.JobInformationService.postProjectDetails(projectDetailsModel).subscribe(res => {

     // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
      this.projectDetailsModel = res.data.results[0];
      this.employeeProjectDetailId = this.projectDetailsModel.employeeProjectDetailId;
      this.EventEmitterService.getJobInformationInitiate();
    })
    this.projectForm.markAsUntouched();
  }

  validateProjectDate() {
    if (this.projectDetailsModel.projectToDate == '' || this.projectDetailsModel.projectToDate == null) {
      this.projectDetailsModel.projectToDate = '31-Dec-9999';
      const projectToDate = this.projectForm.get('projectToDateControl');
      projectToDate.enable();
    }
  }
 
validateProjectDatesSave()
{
  this.projectForm.controls['projectFromDateControl'].setValidators([Validators.required]);
  this.projectForm.controls['projectToDateControl'].setValidators([Validators.required]);
  
}
  enableProjectDate() {
    const projectFromDate = this.projectForm.get('projectFromDateControl');
    projectFromDate.enable();
    const projectToDate = this.projectForm.get('projectToDateControl');
    projectToDate.enable();
   
    if (this.projectDetailsModel.projectName == '' || this.projectDetailsModel.projectName == null) {
      this.projectDetailsModel.projectFromDate = null;
      this.projectDetailsModel.projectToDate = null;
      const projectFromDate = this.projectForm.get('projectFromDateControl');
      projectFromDate.disable();
      const projectToDate = this.projectForm.get('projectToDateControl');
      projectToDate.disable();
    }
  }

  validateBillableDate() {
    if (this.projectDetailsModel.billableToDate == '' || this.projectDetailsModel.billableToDate == null) {
      this.projectDetailsModel.billableToDate = '31-Dec-9999';
      const billableToDate = this.projectForm.get('billableToDateControl');
      billableToDate.enable();
    }
  }
  validateSaveBillableDates()
  {
    this.projectForm.controls['billableFromDateControl'].setValidators([Validators.required]);
    this.projectForm.controls['billableToDateControl'].setValidators([Validators.required]);
    
  }
  enableBillableDate() {
    const billableFromDate = this.projectForm.get('billableFromDateControl');
    billableFromDate.enable();
    const billableToDate = this.projectForm.get('billableToDateControl');
    billableToDate.enable();
    
    if (this.projectDetailsModel.billable == '' || this.projectDetailsModel.billable == null) {
      this.projectDetailsModel.billableFromDate = null;
      this.projectDetailsModel.billableToDate = null;
      const billableFromDate = this.projectForm.get('billableFromDateControl');
      billableFromDate.disable();
      const billableToDate = this.projectForm.get('billableToDateControl');
      billableToDate.disable();
      // this.billableValid = false;
    }
  }
  validateBenchDate() {
    if (this.projectDetailsModel.benchToDate == '' || this.projectDetailsModel.benchToDate == null) {
      this.projectDetailsModel.benchToDate = '31-Dec-9999';
      const benchToDate = this.projectForm.get('benchToDateControl');
      benchToDate.enable();
    }
  }

  validateSaveBenchDates()
  {
    this.projectForm.controls['benchFromDateControl'].setValidators([Validators.required]);
    this.projectForm.controls['benchToDateControl'].setValidators([Validators.required]);
    
  }

  enableBenchDate() {
    // if (this.projectDetailsModel.isOnBench == 'yes') {
    if (this.isOnBenchBoolean == 'yes') {
      const benchFromDate = this.projectForm.get('benchFromDateControl');
      benchFromDate.enable();
      const benchToDate = this.projectForm.get('benchToDateControl');
      benchToDate.enable();
    }

    // if (this.projectDetailsModel.isOnBench == '' || this.projectDetailsModel.isOnBench == null || this.projectDetailsModel.isOnBench == 'no') {
      if (this.isOnBenchBoolean == '' || this.isOnBenchBoolean == null || this.isOnBenchBoolean == 'no') { 
    this.projectDetailsModel.benchFromDate = null;
      this.projectDetailsModel.benchToDate = null;
      const benchFromDate = this.projectForm.get('benchFromDateControl');
      benchFromDate.disable();
      const benchToDate = this.projectForm.get('benchToDateControl');
      benchToDate.disable();
    }
  }

   //get payroll area aasigned to that employee
   getPayrollAreaInformation() {
    debugger
        this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {
          debugger
          res.data.results[0].forEach(item =>{
            this.payrollAreaList.push(item.payrollAreaCode);
            this.totalPayrollAreaList.push(item.payrollAreaCode);
    
         });
        })
    
      }
    
      filterpayrollArea(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.payrollAreaList.length; i++) {
          let country = this.payrollAreaList[i];
          if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
          }
        }
        this.totalPayrollAreaList = filtered;
      }
    
      //set PayrollArea
      selectPayrollArea(event){
        debugger
        this.payrollAreaCode=event;
    
        this.getProjectFormForm();
      }
}
