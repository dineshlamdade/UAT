
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobInformationService } from '../../../employee-master-services/job-information.service';
import { PayrollAreaInformationService } from '../../../employee-master-services/payroll-area-information.service';

@Component({
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrls: ['./job-summary.component.scss']
})
export class JobSummaryComponent implements OnInit {

  hiddenSummary: boolean = true;
  employeeMasterId: number;
  summaryGridData: Array<any> = [];
  payrollAreaCode: any;
  joiningDate: any;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private router: Router, private PayrollAreaService: PayrollAreaInformationService, private JobInformationService: JobInformationService,) { }


  ngOnInit(): void {
    this.hiddenSummary = true;

    this.payrollAreaCode = '';

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

    //get payroll area aasigned to that employee
    this.getPayrollAreaInformation()

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    this.getGridSummary()
  }

  getGridSummary() {

    if (this.payrollAreaList.length == 1) {
      this.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
      this.payrollAreaCode = this.payrollAreaCode;
    }
    this.JobInformationService.getSummaryDetails(this.employeeMasterId, this.payrollAreaCode).subscribe(res => {

      if (res.data.results[0]) {

        this.summaryGridData = res.data.results[0];
      }
    }, (error: any) => {

      this.resetSummary();

    })
    if (this.payrollAreaList.length == 1) {
      this.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
      //get payroll area code from local storage
      const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
      this.payrollAreaCode = new String(payrollAreaCode);
    }
  }
  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {
      debugger
      res.data.results[0].forEach(item => {

        this.payrollAreaList.push(item.payrollAreaCode);
        this.filteredPayrollAreaList.push(item.payrollAreaCode);

      });
      if (this.payrollAreaList.length == 1) {
        this.payrollAreaCode = this.payrollAreaList[0];
        localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
      }
      else {
        //get payroll area code from local storage
        const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
        this.payrollAreaCode = new String(payrollAreaCode);
      }
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
    this.filteredPayrollAreaList = filtered;
  }

  //set PayrollArea
  selectPayrollArea(event) {

    localStorage.setItem('jobInformationPayrollAreaCode', event);
    this.payrollAreaCode = event;
    this.getGridSummary()
  }

  //edit job details to redirecting respective page
  editJobDetails(job) {

    if (job === "Minimum Wages") {
      this.router.navigate(['/employee-master/job-information/minimum-wages-details']);
    }
    else if (job === "Organization Details") {
      this.router.navigate(['/employee-master/job-information/organization-details']);
    }
    else if (job === "Position Details") {
      this.router.navigate(['/employee-master/job-information/position-details']);
    }
    else if (job === "Project Details") {
      this.router.navigate(['/employee-master/job-information/project-details']);
    }
  }
  //reset summary grid
  resetSummary() {
    this.summaryGridData = [];
  }

}
