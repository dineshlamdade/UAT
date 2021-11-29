import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';


import { AnyTxtRecord } from 'dns';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmpMasterLandingPageServiceService } from './emp-master-landing-page-service.service';
import { ExcelserviceService } from '../../../excel_service/excelservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-master-landing-page',
  templateUrl: './emp-master-landing-page.component.html',
  styleUrls: ['./emp-master-landing-page.component.scss']
})
export class EmpMasterLandingPageComponent implements OnInit {

  public modalRef: BsModalRef;
  //customers: Customer[];
  isrental :boolean =false;
  countSummary: any[];
  inputData:Array<any>=[];
  groupCompanyId: any;
  EmployeeSummary: any;
  selectedEmployeeData: any = [];
  excelData: any[];
  header: any[];
  @Output() employeeData = new EventEmitter<any>();
  onBehalfValue: any;
 
  
  constructor(private modalService: BsModalService,
    private employeelandingPageService: EmpMasterLandingPageServiceService,
    private datePipe: DatePipe,
    private excelservice: ExcelserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.selectedEmployeeData=[];
    localStorage.clear();
    // service call to count API
this.countSummary =[];
this.groupCompanyId =1;
this.inputData.push({groupCompanyId:this.groupCompanyId})
this.employeelandingPageService.getEmployeeCountInformation(this.groupCompanyId).subscribe(res => {

  this.countSummary = res.data.results[0];
console.log('countSummary',this.countSummary);
  })
    /// 
    this.employeelandingPageService.getEmployeeSummaryInformation(this.inputData[0]).subscribe(res => {

      this.EmployeeSummary = res.data.results;
      this.EmployeeSummary.forEach(element => {
        element.joiningDate = this.datePipe.transform(element.joiningDate, 'dd-MMM-yyyy');
      });
     
    console.log('EmployeeSummary',this.EmployeeSummary);
      })
  }

  Emplist(emplist: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      emplist,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  getSelectedEmployee(user,checked) {
    
    if(checked==true){
      this.selectedEmployeeData.push(user);
    }else{     
      this.selectedEmployeeData.splice(user);     
    }
    
  }

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["Emp.Code","Employee  Name","Mobile Number","Joining Date","Leaving Date", "Status", "Establishment",
     "Department", "Grade", "Designation",]

    this.EmployeeSummary.forEach(element => {
      let obj = {
        "Emp.Code":element.employeeCode,
        "Employee  Name":element.fullName,
        "Mobile Number": element.officialMobileNumber,
        "Joining Date": element.joiningDate,
        "Leaving Date": element.lastWorkingDate,
        "Status": element.status,
        "Establishment": element.establishment,
        "Department": element.department,
        "Grade": element.grade,
        "Designation":element.designation1       
      }
      this.excelData.push(obj)
    });
  
    this.excelservice.exportAsExcelFile(this.excelData, 'Employee Summary','Employee Summary',this.header);
  
  }
editEmployee(user1){
  this.employeelandingPageService.getEmployeeData(user1);
}


  // ............................................Add Query....................................................
  navigateToQuery() {
    localStorage.setItem('queryListEmpData', JSON.stringify(this.selectedEmployeeData))
    this.router.navigate(['/admin-query-generation'])
  }
  smallpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  addNewEmployee(){
    this.employeelandingPageService.deleteSharedEmployeeData();
    localStorage.clear();
   
  }  
  onBehalf(value) {
    this.onBehalfValue = value;

  }
  
}