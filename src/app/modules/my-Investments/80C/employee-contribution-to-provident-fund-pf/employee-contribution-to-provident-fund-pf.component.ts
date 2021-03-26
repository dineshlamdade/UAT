import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { EmployeeContributionToProvidentFundPFService } from '../employee-contribution-to-provident-fund-pf/employee-contribution-to-provident-fund-pf.service';

@Component({
  selector: 'app-employee-contribution-to-provident-fund-pf',
  templateUrl: './employee-contribution-to-provident-fund-pf.component.html',
  styleUrls: ['./employee-contribution-to-provident-fund-pf.component.scss'],
})
export class EmployeeContributionToProvidentFundPFComponent implements OnInit {
  public summaryGridData: Array<any> = [];

  public pfTotal: number;

  constructor(
    private employeeContributionToProvidentFundPFService: EmployeeContributionToProvidentFundPFService,
    private numberFormat: NumberFormatPipe
  ) {}

  ngOnInit() {
    this.summaryPage();
  }

  // PF Summary get Call
  summaryPage() {
    this.employeeContributionToProvidentFundPFService
      .getPFSummary()
      .subscribe((res) => {
        this.summaryGridData = res.data.results[0].employeePFList;
        this.pfTotal = res.data.results[0].pfTotal;
      });
  }
}
