import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compliance-information',
  templateUrl: './compliance-information.component.html',
  styleUrls: ['./compliance-information.component.scss']
})
export class ComplianceInformationComponent implements OnInit {
  public tabIndex = 0;
  complianceSummaryTab: boolean = false;
  complianceInputTab: boolean = false;
  complianceTypeTab: boolean = false;




  constructor(private router: Router) { 
    if (router.url == '/employee-master/compliance-information/compliance-summary') {
      this.tabIndex = 0;
      this.complianceSummaryTabValidation();
    }
    if (router.url == '/employee-master/compliance-information/input') {
      this.tabIndex = 1;
      this.complianceInputTabValidation();
    }
    if (router.url == '/employee-master/compliance-information/compliance-type') {
      this.tabIndex = 2;
      this.complianceTypeTabValidation();
    }
  }

  ngOnInit(): void {
  }

  complianceSummaryTabValidation() {
    this.complianceSummaryTab = true;
    this.complianceInputTab = false;
    this.complianceTypeTab = false;
    this.tabIndex = 0;
  }

  complianceInputTabValidation() {
    this.complianceSummaryTab = false;
    this.complianceInputTab = true;
    this.complianceTypeTab = false;
    this.tabIndex = 1;
  }

  complianceTypeTabValidation() {
    this.complianceSummaryTab = false;
    this.complianceInputTab = false;
    this.complianceTypeTab = true;
    this.tabIndex = 2;
  }
}
