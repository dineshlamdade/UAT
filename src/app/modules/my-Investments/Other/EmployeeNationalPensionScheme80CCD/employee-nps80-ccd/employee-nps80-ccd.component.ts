import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { EmployeeNPS80CCDService } from '../employee-nps80-ccd.service';

@Component({
  selector: 'app-employee-nps80-ccd',
  templateUrl: './employee-nps80-ccd.component.html',
  styleUrls: ['./employee-nps80-ccd.component.scss']
})
export class EmployeeNPS80CCDComponent implements OnInit {

  public summaryGridData: Array<any> = [];

  constructor(
    private employeeNPS80CCDService: EmployeeNPS80CCDService,
    private numberFormat: NumberFormatPipe,
  ) { }

  ngOnInit() {
    this.summaryPage();
  }
// Summary get Call
summaryPage() {
  this.employeeNPS80CCDService.getEmployeeNPSCCD().subscribe((res) => {
    this.summaryGridData = res.data.results;
    console.log(this.summaryGridData[0].actualBalance80CCD1 );
  });
}

}


