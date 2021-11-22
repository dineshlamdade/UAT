
import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobInformationService } from '../job-information.service';
import { PayrollAreaInformationService } from '../../payroll-area-information/payroll-area-information.service';
import { BsModalService } from 'ngx-bootstrap/modal';


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
  totalRecords:any;
  payrollAreaId: any;
  data:Array<any>=[];
  primaryMainData: any;
  payrollType:any;
  modalRef: any;
  dataapi: any;
  historyData: Array<any>=[];
  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private router: Router, private PayrollAreaService: PayrollAreaInformationService, private JobInformationService: JobInformationService, private modalService: BsModalService) { }
   

  ngOnInit(): void {

  
    this.hiddenSummary = true;

    this.payrollAreaCode = '';
    this.companyName='';
    

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area code from local storage
    // const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    // this.payrollAreaCode = new String(payrollAreaCode);

      //get company name from local storage
  //  const companyName = localStorage.getItem('jobInformationCompanyName')
  //  if(companyName!=null){
  //   this.companyName = new String(companyName);
  //  }

    //get payroll area aasigned to that employee
  

    this.getPayrollAreaInformation();

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    
    
   
  }

  getGridSummary() {

    // if (this.payrollAreaList.length == 1) {
    // //  this.payrollAreaCode = this.payrollAreaList[0];
    // this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    // localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
    
    // }
    // else {
    //   this.payrollAreaCode = this.payrollAreaCode;
  
    // }
   

    const jobId='job1Id';
    const jobDetail = 'Orgnization Details';
    const summaryType=0;
    this.JobInformationService.getSummaryDetails(this.payrollAreaId,this.employeeMasterId,summaryType,jobId,jobDetail).subscribe(res => {

      if (res.data.results[0]) {
       
       this.summaryGridData = res.data.results[0];
       console.log('Summary Data',this.summaryGridData);
      }
    }, (error: any) => {

      this.resetSummary();

    }
    )
    // if (this.payrollAreaList.length == 1) {
    //   this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    // }
    // else {
     
    //   const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    //   this.payrollAreaCode = new String(payrollAreaCode);
    // }
    // ;
  }


  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollData(this.employeeMasterId).subscribe(res => {
      
      res.data.results[0].forEach(item => {
        
        this.payrollAreaList.push(item);
        this.filteredPayrollAreaList.push(item);

      });

       this.primaryMainData = this.payrollAreaList.find(x=>x.type=='Primary Main');
       if(this.primaryMainData){
       this.payrollAreaId= this.primaryMainData.payrollAreaId;
       this.payrollAreaCode = this.primaryMainData.payrollAreaCode;
       this.payrollAreaFromDate = this.primaryMainData.payrollAreaFromDate;
       this.payrollAreaToDate = this.primaryMainData.payrollAreaToDate;
       this.companyName = this.primaryMainData.companyname;
       this.payrollType =this.primaryMainData.type;
       this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;

       localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
       localStorage.setItem('payrollAreaId',  this.payrollAreaId);
       localStorage.setItem('jobInformationCompanyName',  this.companyName);
     //  localStorage.setItem('companyId',  this.payrollAreaCode);

       }

      //commented for primary main type get first entry
    //   if (this.payrollAreaList.length == 1) {
     
    //     //set default payroll area
    //     this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    //     this.payrollAreaId = this.payrollAreaList[0].payrollAreaId;
    //     this.period=this.payrollAreaList[0].payrollAreaFromDate + "-" + this.payrollAreaList[0].payrollAreaFromDate;
    //     this.companyId=this.payrollAreaList[0].companyId;
    //     localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
    //     localStorage.setItem('companyId',this.companyId);
    //     this.payrollAreaFromDate=this.datepipe.transform(this.payrollAreaList[0].payrollAreaFromDate, "dd-MMM-yyyy");
    // this.payrollAreaToDate=this.datepipe.transform(this.payrollAreaList[0].payrollAreaToDate, "dd-MMM-yyyy");
    // this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;
  
    //     //set default company
    //     let result=res.data.results[0];
    //   //  this.companyName = result[0].payrollAreaId.companyId.companyName;
    //   this.companyName = result[0].payrollAreaAndCompany;
    //     localStorage.setItem('jobInformationCompanyName',  this.companyName);
    //   }
    //   else {
    //     //get payroll area code from local storage
    //     const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    //     // this.payrollAreaCode = new String(payrollAreaCode);

    //      //get company from local storage
    //      const companyName = localStorage.getItem('jobInformationCompanyName')
    //      if(companyName!=null){
    //        this.companyName = new String(companyName);
    //      }

    //     const periodDate = this.payrollAreaList.find((c)=>c.payrollAreaCode===payrollAreaCode)
    //   this.payrollAreaFromDate=this.datepipe.transform(periodDate.payrollAreaFromDate, "dd-MMM-yyyy");
    //   this.payrollAreaToDate=this.datepipe.transform(periodDate.payrollAreaToDate, "dd-MMM-yyyy");
    //   this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;  
    //   }
      this.getGridSummary();
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

    // localStorage.setItem('jobInformationPayrollAreaCode', event);
    this.payrollAreaCode = event;

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaCode ===  this.payrollAreaCode
    );
    this.payrollAreaId = toSelect.payrollAreaId;
    //this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.companyname;
    this.companyId=toSelect.companyId;
    this.payrollType =toSelect.type;
    // localStorage.setItem('jobInformationCompanyName',  this.companyName);
    // localStorage.setItem('companyId',this.companyId);
    
    this.payrollAreaFromDate=this.datepipe.transform(toSelect.payrollAreaFromDate, "dd-MMM-yyyy");
    this.payrollAreaToDate=this.datepipe.transform(toSelect.payrollAreaToDate, "dd-MMM-yyyy");
    this.period=this.payrollAreaFromDate + " To " +  this.payrollAreaToDate;
  
    localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);
    localStorage.setItem('payrollAreaId',  this.payrollAreaId);
    localStorage.setItem('jobInformationCompanyName',  this.companyName);
    this.getGridSummary()
  }

  //edit job details to redirecting respective page
  editJobDetails(job) {

    if (job === "Minimum Wages") {
      this.router.navigate(['/employee-master/job-information/minimum-wages-details']);
    }
    else if (job == "Organization Details") {
      this.router.navigate(['/employee-master/job-information/organization-details']);
    }
    else if (job === "Position Details") {
      this.router.navigate(['/employee-master/job-information/position-details']);
    }
    else if (job === "Project Details") {
      this.router.navigate(['/employee-master/job-information/project-details']);
    }
  }
// for job hostory call 
  showHistory(data){

    const summaryType=1;
    const jobId=data.jobId;
    const jobDetail = data.jobDetail;
    this.JobInformationService.getSummaryDetails(this.payrollAreaId,this.employeeMasterId,summaryType,jobId,jobDetail).subscribe(res => {

      if (res.data.results[0]) { 
       
       this.historyData = res.data.results[0];

      }
    }, (error: any) => {

      this.resetSummary();

    })
    // this.historyData[0] = this.summaryGridData.find(x=>x.value==data)
  }

  //reset summary grid
  resetSummary() {
    this.summaryGridData = [];
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
    });
  
}
ViewModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' }),
  );

console.log(this.dataapi);
var el = (document.getElementById('somerow')) as HTMLTableRowElement;
var k=(document.getElementById('particulars1')) as HTMLTableRowElement;
const table = document.querySelector('#somerow');
const rows = table;
console.log(k);
// console.log(table)    
}
}
