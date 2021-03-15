import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { PayrollAreaInformationService } from '../payroll-area-information/payroll-area-information.service';
import { EmployeeSummaryBean } from './employee-summary.model';
import { EmployeeSummaryService } from './employee-summary.service';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { AuthService } from './../../../auth/auth.service';

@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.scss']
})
export class EmployeeSummaryComponent implements OnInit {

  imageUrl: any = "./assets/images/profile_Img.png";
  employeeMasterId: number;
  EmployeeSummary = new EmployeeSummaryBean();
  Subscription: Subscription;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  payrollAreaCode: any;
  companyName: any;


  constructor(private EmployeeSummaryService: EmployeeSummaryService,
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
      this.getSummaryForm();
    }
  }

  //get payroll area assigned to that employee
  getPayrollAreaInformation() {

    this.PayrollAreaService.getDistinctPayrollAreaInformation(this.employeeMasterId).subscribe(res => {

      res.data.results[0].forEach(item => {
        // this.payrollAreaList.push(item.payrollAreaCode);
        // this.filteredPayrollAreaList.push(item.payrollAreaCode);

        this.payrollAreaList.push(item);
        this.filteredPayrollAreaList.push(item);

      });
      if (this.payrollAreaList.length == 1) {
        //set default payroll area
        this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
        localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);

        //set default company
        let result = res.data.results[0];
        this.companyName = result[0].payrollAreaAndCompany;
        //this.companyName = result[0].payrollAreaId.companyId.companyName;
        localStorage.setItem('jobInformationCompanyName', this.companyName);
      }
      else {
        //get payroll area code from local storage
        const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
        this.payrollAreaCode = new String(payrollAreaCode);

        //get company from local storage
        const companyName = localStorage.getItem('jobInformationCompanyName')
        if (companyName != null) {
          this.companyName = new String(companyName);
        }

      }
    })

  }

  getSummaryForm() {

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.EmployeeSummaryService.getEmployeeSummaryInfo(this.employeeMasterId, this.payrollAreaCode).subscribe(res => {

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

  //set PayrollArea and company name in local storage when dropdown chanegs
  selectPayrollArea(event) {
    localStorage.setItem('jobInformationPayrollAreaCode', event);
    this.payrollAreaCode = event;

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaCode === this.payrollAreaCode
    );
    //this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.payrollAreaAndCompany;
    localStorage.setItem('jobInformationCompanyName', this.companyName);

    this.getSummaryForm();
  }
}
