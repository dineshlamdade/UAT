import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyInformationService } from './family-information.service';



@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.scss']
})
export class FamilyInformationComponent implements OnInit {
  FamilySummaryGridData: Array<any> = [];
  employeeMasterId: number;
  hideSummaryGrid: boolean = false;
  familyTab: boolean = true;
  nominationTab: boolean = false;
  bankTab: boolean = false;
  public tabIndex = 0;

  constructor(private FamilyInformationService: FamilyInformationService,
    private route: Router) {

    if (route.url == '/employee-master/family-information/family-details') {
      this.tabIndex = 0;
      this.familyTabValidation();
    }
    if (route.url == '/employee-master/family-information/nomination-details') {
      this.tabIndex = 1;
      this.nominationTabValidation();
    }
    if (route.url == '/employee-master/family-information/bank-details') {
      this.tabIndex = 2;
      this.bankTabValidation();
    }
  }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.hideSummaryGrid = false;
    this.getFamilyGridSummary();
  }

  getFamilyGridSummary() {

    this.FamilyInformationService.getFamilyGridSummary(this.employeeMasterId).subscribe(res => {

      this.FamilySummaryGridData = res.data.results[0].familyDetailsSummaryBeans;

      this.FamilySummaryGridData.forEach(res => {
        if (res.status == 1) {
          res.isMemberActive = 'Active'
        } else {
          res.isMemberActive = 'InActive'
        }
      })
    })
  }

  familyTabValidation() {
    this.familyTab = true;
    this.nominationTab = false;
    this.bankTab = false;
  }

  nominationTabValidation() {
    this.familyTab = false;
    this.nominationTab = true;
    this.bankTab = false;
  }

  bankTabValidation() {
    this.familyTab = false;
    this.nominationTab = false;
    this.bankTab = true;
  }

}
