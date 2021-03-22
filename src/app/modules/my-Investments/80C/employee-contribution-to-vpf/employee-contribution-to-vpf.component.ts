import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { EmployeeContributionToVPFService } from '../employee-contribution-to-vpf/employee-contribution-to-vpf.service';

@Component({
  selector: 'app-employee-contribution-to-vpf',
  templateUrl: './employee-contribution-to-vpf.component.html',
  styleUrls: ['./employee-contribution-to-vpf.component.scss'],
})
export class EmployeeContributionToVPFComponent implements OnInit {
  public summaryGridData: Array<any> = [];

  public vpfTotal: number;

  constructor(
    private employeeContributionToVPFService: EmployeeContributionToVPFService,
    private numberFormat: NumberFormatPipe
  ) {}

  ngOnInit() {
    this.summaryPage();
  }
  // VPF Summary get Call
  summaryPage() {
    this.employeeContributionToVPFService.getVPFSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].employeeVPFList;
      this.vpfTotal = res.data.results[0].vpfTotal;
    });
  }
}
