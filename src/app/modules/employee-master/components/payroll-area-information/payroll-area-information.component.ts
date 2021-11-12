import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-payroll-area-information',
  templateUrl: './payroll-area-information.component.html',
  styleUrls: ['./payroll-area-information.component.scss']
})
export class PayrollAreaInformationComponent implements OnInit {
 
  employeeMasterId: number;
  hideSummaryGrid: boolean = false;
  payrollTab: boolean = true;
  disbursementTab: boolean = false;
  otherAreasTab: boolean = false;
  public tabIndex = 0;

  constructor(private route: Router) {
    
    if (route.url == '/employee-master/payroll-area-information/payrollArea-details') {
      this.tabIndex = 0;
      this.payrollTabValidation();
    }
    if (route.url == '/employee-master/payroll-area-information/disbursement-details') {
      this.tabIndex = 1;
      this.disbursementTabValidation();
    }
    if (route.url == '/employee-master/payroll-area-information/otherAreas-details') {
      this.tabIndex = 2;
      this.otherAreasTabValidation();
    }
  }

  ngOnInit(): void {

    
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
  }



  payrollTabValidation() {
    this.payrollTab = true;
    this.disbursementTab = false;
    this.otherAreasTab = false;
  }

  disbursementTabValidation() {
    this.payrollTab = false;
    this.disbursementTab = true;
    this.otherAreasTab = false;
  }

  otherAreasTabValidation() {
    this.payrollTab = false;
    this.disbursementTab = false;
    this.otherAreasTab = true;
  }

}
