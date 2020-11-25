import { Component, OnInit } from '@angular/core';
import { FamilyInformationService } from './../../employee-master-services/family-information.service';



@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.scss']
})
export class FamilyInformationComponent implements OnInit {
  FamilySummaryGridData: Array<any> = [];
  employeeMasterId: number;
  hideSummaryGrid: boolean = false;

  
  constructor(private FamilyInformationService: FamilyInformationService) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.hideSummaryGrid = false;
    this. getFamilyGridSummary();
  }

  getFamilyGridSummary() {

    this.FamilyInformationService.getFamilyGridSummary(this.employeeMasterId).subscribe(res => {
      debugger
      this.FamilySummaryGridData = res.data.results[0].familyDetailsSummaryBeans;
      console.log(this.FamilySummaryGridData);

      this.FamilySummaryGridData.forEach(res => {
        if (res.status == 1) {
          res.isMemberActive = 'Active'
        } else {
          res.isMemberActive = 'InActive'
        }
      })
    })
  }

}
