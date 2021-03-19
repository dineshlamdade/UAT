import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobInformationService } from '../../employee-master-services/job-information.service';
import { PayrollAreaInformationService } from '../../employee-master-services/payroll-area-information.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.scss']
})
export class JobInformationComponent implements OnInit {
  hiddenSummary: boolean = true;
  employeeMasterId: number;
  summaryGridData: Array<any> = [];
  payrollAreaCode: any;
  joiningDate: any;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  jobSummaryTab: boolean = true;
  organizationTab: boolean = false;
  positionTab: boolean = false;
  minimumWagesTab: boolean = false;
  projectTab: boolean = false;
  deputationTab: boolean = false;
  public tabIndex = 0;
  tabSubscription: Subscription;


  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private router: Router, private PayrollAreaService: PayrollAreaInformationService,
    private JobInformationService: JobInformationService,
    private EventEmitterService: EventEmitterService) {
    if (router.url == '/employee-master/job-information/job-summary') {
      this.tabIndex = 0;
      this.jobSummaryTabValidation();
    }
    if (router.url == '/employee-master/job-information/organization-details') {
      this.tabIndex = 1;
      this.organizationTabValidation();
    }
    if (router.url == '/employee-master/job-information/position-details') {
      this.tabIndex = 2;
      this.positionTabValidation();
    }
    if (router.url == '/employee-master/job-information/minimum-wages-details') {
      this.tabIndex = 3;
      this.minimumWagesTabValidation();
    }
    if (router.url == '/employee-master/job-information/project-details') {
      this.tabIndex = 4;
      this.projectTabValidation();
    }
    if (router.url == '/employee-master/job-information/deputation-details') {
      this.tabIndex = 5;
      this.deputationTabValidation();
    }
  }


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

    this.tabSubscription = this.EventEmitterService.setJobSummaryInitiate().subscribe(res => {
      
      if (res == 'organization') {
        this.jobSummaryTabValidation();
      }
      if (res == 'position') {
        this.jobSummaryTabValidation();
      }
      if (res == 'minimumWages') {
        this.jobSummaryTabValidation();
      }
      if (res == 'project') {
        this.jobSummaryTabValidation();
      }
      if (res == 'deputation') {
        this.jobSummaryTabValidation();
      }
    })
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
    })
  }
  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {


    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {

      res.data.results[0].forEach(item => {

        this.payrollAreaList.push(item.payrollAreaCode);
        this.filteredPayrollAreaList.push(item.payrollAreaCode);

      });
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

  //edit job details
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


  jobSummaryTabValidation() {
    this.jobSummaryTab = true;
    this.organizationTab = false;
    this.positionTab = false;
    this.minimumWagesTab = false;
    this.projectTab = false;
    this.deputationTab = false;
    // this.router.navigate(['/employee-master/education-skills-information/education-details']);
  }

  organizationTabValidation() {
    this.jobSummaryTab = false;
    this.organizationTab = true;
    this.positionTab = false;
    this.minimumWagesTab = false;
    this.projectTab = false;
    this.deputationTab = false;
  }

  positionTabValidation() {
    
    this.jobSummaryTab = false;
    this.organizationTab = false;
    this.positionTab = true;
    this.minimumWagesTab = false;
    this.projectTab = false;
    this.deputationTab = false;
  }

  minimumWagesTabValidation() {
    this.jobSummaryTab = false;
    this.organizationTab = false;
    this.positionTab = false;
    this.minimumWagesTab = true;
    this.projectTab = false;
    this.deputationTab = false;
  }

  projectTabValidation() {
    this.jobSummaryTab = false;
    this.organizationTab = false;
    this.positionTab = false;
    this.minimumWagesTab = false;
    this.projectTab = true;
    this.deputationTab = false;
  }

  deputationTabValidation() {
    this.jobSummaryTab = false;
    this.organizationTab = false;
    this.positionTab = false;
    this.minimumWagesTab = false;
    this.projectTab = false;
    this.deputationTab = true;
  }

}
