import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { PayrollAreaInformationService } from '../../employee-master-services/payroll-area-information.service';
import { EmployeeSummaryBean } from './../../dto-models/employee-summary.model';
import { EmployeeSummaryService } from './../../employee-master-services/employee-summary.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';


@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.scss']
})
export class EmployeeSummaryComponent implements OnInit {

  imageUrl: any = "./assets/images/empIcon.png";
  employeeMasterId: number;
  EmployeeSummary = new EmployeeSummaryBean();
  Subscription: Subscription;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  payrollAreaCode: any;


  constructor(private EmployeeSummaryService: EmployeeSummaryService,private PayrollAreaService: PayrollAreaInformationService, private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {

    this.payrollAreaCode = '';
    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area's
    this.getPayrollAreaInformation();

    if (this.employeeMasterId) {
      this.getSummaryForm();
    }
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

  getSummaryForm() {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.EmployeeSummaryService.getEmployeeSummaryInfo(this.employeeMasterId,this.payrollAreaCode).subscribe(res => {
      
      if (res.data.results[0]) {
        
        this.EmployeeSummary.identitySummaryBean = res.data.results[0].employeeSummaryBean.identitySummaryBean;
        if (res.data.results[0].employeeSummaryBean.identitySummaryBean.employeeProfileImage) {
          this.imageUrl = 'data:' + res.data.results[0].employeeSummaryBean.identitySummaryBean.employeeProfileImage.type + ';base64,' + res.data.results[0].employeeSummaryBean.identitySummaryBean.employeeProfileImage.profilePicture;
        }
        this.EmployeeSummary.personalSummaryBean = res.data.results[0].employeeSummaryBean.personalSummaryBean;
        this.EmployeeSummary.workSummaryBean = res.data.results[0].employeeSummaryBean.workSummaryBean;
        this.EmployeeSummary.nominationSummaryBean = res.data.results[0].employeeSummaryBean.nominationSummaryBean;
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

    this.getSummaryForm();
  }
}
