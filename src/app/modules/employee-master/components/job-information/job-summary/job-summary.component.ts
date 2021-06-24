
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobInformationService } from '../job-information.service';
import { PayrollAreaInformationService } from '../../payroll-area-information/payroll-area-information.service';


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
  companyName:any;
  companyId:any;
  period:any;
  joiningDate: any;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  payrollAreaFromDate: any;
  payrollAreaToDate:any

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private router: Router, private PayrollAreaService: PayrollAreaInformationService, private JobInformationService: JobInformationService,) { }
   

  ngOnInit(): void {

  
    this.hiddenSummary = true;

    this.payrollAreaCode = '';
    this.companyName='';
    

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

      //get company name from local storage
   const companyName = localStorage.getItem('jobInformationCompanyName')
   if(companyName!=null){
    this.companyName = new String(companyName);
   }

    //get payroll area aasigned to that employee
  

    this.getPayrollAreaInformation();

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    this.getGridSummary()
  }

  getGridSummary() {

    if (this.payrollAreaList.length == 1) {
    //  this.payrollAreaCode = this.payrollAreaList[0];
    this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
    
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

    }
    )
    if (this.payrollAreaList.length == 1) {
      this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    }
    else {
      //get payroll area code from local storage
      const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
      this.payrollAreaCode = new String(payrollAreaCode);
    }
    ;
  }


  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollData(this.employeeMasterId).subscribe(res => {
      
      res.data.results[0].forEach(item => {

        // this.payrollAreaList.push(item.payrollAreaCode);
        // this.filteredPayrollAreaList.push(item.payrollAreaCode);
        
        this.payrollAreaList.push(item);
        this.filteredPayrollAreaList.push(item);

      });
      if (this.payrollAreaList.length == 1) {
     
        //set default payroll area
        this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
        this.period=this.payrollAreaList[0].payrollAreaFromDate + "-" + this.payrollAreaList[0].payrollAreaFromDate;
        this.companyId=this.payrollAreaList[0].companyId;
        localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
        localStorage.setItem('companyId',this.companyId);
        this.payrollAreaFromDate=this.datepipe.transform(this.payrollAreaList[0].payrollAreaFromDate, "dd-MMM-yyyy");
    this.payrollAreaToDate=this.datepipe.transform(this.payrollAreaList[0].payrollAreaToDate, "dd-MMM-yyyy");
    this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;
  
        //set default company
        let result=res.data.results[0];
      //  this.companyName = result[0].payrollAreaId.companyId.companyName;
      this.companyName = result[0].payrollAreaAndCompany;
        localStorage.setItem('jobInformationCompanyName',  this.companyName);
      }
      else {
        //get payroll area code from local storage
        const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
        // this.payrollAreaCode = new String(payrollAreaCode);

         //get company from local storage
         const companyName = localStorage.getItem('jobInformationCompanyName')
         if(companyName!=null){
           this.companyName = new String(companyName);
         }

        const periodDate = this.payrollAreaList.find((c)=>c.payrollAreaCode===payrollAreaCode)
      this.payrollAreaFromDate=this.datepipe.transform(periodDate.payrollAreaFromDate, "dd-MMM-yyyy");
      this.payrollAreaToDate=this.datepipe.transform(periodDate.payrollAreaToDate, "dd-MMM-yyyy");
      this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;  
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

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaCode ===  this.payrollAreaCode
    );
    //this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.companyname;
    this.companyId=toSelect.companyId;
    localStorage.setItem('jobInformationCompanyName',  this.companyName);
    localStorage.setItem('companyId',this.companyId);
    
    this.payrollAreaFromDate=this.datepipe.transform(toSelect.payrollAreaFromDate, "dd-MMM-yyyy");
    this.payrollAreaToDate=this.datepipe.transform(toSelect.payrollAreaToDate, "dd-MMM-yyyy");
    this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;
  

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
