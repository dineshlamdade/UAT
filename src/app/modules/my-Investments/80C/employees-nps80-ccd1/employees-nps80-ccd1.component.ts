import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { EmployeesNPS80CCD1Service } from '../employees-nps80-ccd1/employees-nps80-ccd1.service';

@Component({
  selector: 'app-employees-nps80-ccd1',
  templateUrl: './employees-nps80-ccd1.component.html',
  styleUrls: ['./employees-nps80-ccd1.component.scss']
})
export class EmployeesNPS80CCD1Component implements OnInit {

  public summaryGridData: Array<any> = [];

  constructor(
    private employeesNPS80CCD1Service: EmployeesNPS80CCD1Service,
    private numberFormat: NumberFormatPipe,
  ) { }

  ngOnInit() {
    this.summaryPage();
  }
// Summary get Call
summaryPage() {
  this.employeesNPS80CCD1Service.getEmployeeNPSCCD1().subscribe((res) => {
    this.summaryGridData = res.data.results;
    console.log("actualBalance80CCD1",this.summaryGridData[0].actualBalance80CCD1 );
  });
}

}