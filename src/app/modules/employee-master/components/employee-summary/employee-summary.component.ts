import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { PayrollAreaInformationService } from '../payroll-area-information/payroll-area-information.service';
import { EmployeeSummaryBean } from './employee-summary.model';
import { EmployeeSummaryService } from './employee-summary.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { AuthService } from './../../../auth/auth.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.scss']
})
export class EmployeeSummaryComponent implements OnInit {

  imageUrl: any = "./assets/images/profile_Img.png";
  employeeMasterId: number;
  EmployeeSummary = new EmployeeSummaryBean('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
  Subscription: Subscription;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  payrollAreaCode: any;
  companyName: any;
  payrollAreaId: any;
  primaryMainData: any;
  today:Date = new Date();
  EmpData: any;
  public sanitizer: DomSanitizer

  constructor(private EmployeeSummaryService: EmployeeSummaryService,public datepipe: DatePipe,
    private PayrollAreaService: PayrollAreaInformationService,
    private EventEmitterService: EventEmitterService,
    private AuthService: AuthService) { }

  ngOnInit(): void {

    this.payrollAreaCode = '';
    this.companyName = '';

    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

    //get company name from local storage
    const companyName = localStorage.getItem('jobInformationCompanyName')
    if (companyName != null) {
      this.companyName = new String(companyName);
    }

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area's
    this.getPayrollAreaInformation();

    if (this.employeeMasterId) {
      //  this.getSummaryForm();
    }
  }

  //get payroll area assigned to that employee
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
        this.payrollAreaId = this.payrollAreaList[0].payrollAreaId;
        localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);

        //set default company
        let result = res.data.results[0];
        this.companyName = result[0].companyname;
        //this.companyName = result[0].payrollAreaId.companyId.companyName;
        localStorage.setItem('jobInformationCompanyName', this.companyName);
      }
      else {
        //get primary  payroll area code 

        this.primaryMainData = this.payrollAreaList.find(x => x.type == 'Primary Main');
        if (this.primaryMainData) {
          this.payrollAreaId = this.primaryMainData.payrollAreaId;
          this.payrollAreaCode = this.primaryMainData.payrollAreaCode;
          this.companyName = this.primaryMainData.companyname;
        }
        //get payroll area code from local storage


        // const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
        // this.payrollAreaCode = new String(payrollAreaCode);

        // //get company from local storage
        // const companyName = localStorage.getItem('jobInformationCompanyName')
        // if (companyName != null) {
        //   this.companyName = new String(companyName);
        // }

      }
      this.getSummaryForm();
    })

  }

  getSummaryForm() {

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.EmployeeSummaryService.getEmployeeSummaryInfo(this.employeeMasterId).subscribe(res => {
      console.log('summary DaTA', res.data.results[0])
      if (res.data.results[0]) {
         this.EmployeeSummary = res.data.results[0];
         this.EmployeeSummary.dateOfJoining = this.datepipe.transform(this.EmployeeSummary.dateOfJoining, "dd-MMM-yyyy");
         this.EmployeeSummary.dateOfBirth = this.datepipe.transform(this.EmployeeSummary.dateOfBirth, "dd-MMM-yyyy");
       
         if (res.data.results[0].employeeProfileImage) {
           this.imageUrl = 'data:' + res.data.results[0].type + ';base64,' +res.data.results[0].employeeProfileImage;
         }
        
      
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

  //set PayrollArea and company name in local storage when dropdown chanegs
  selectPayrollArea(event) {
    localStorage.setItem('jobInformationPayrollAreaCode', event);
    this.payrollAreaId = Number(event);

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaId === this.payrollAreaId
    );
    //this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.companyname;
    localStorage.setItem('jobInformationCompanyName', this.companyName);

    this.getSummaryForm();
  }
}
