import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
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


  constructor(private EmployeeSummaryService: EmployeeSummaryService, private EventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    if (this.employeeMasterId) {
      this.getSummaryForm();
    }
  }


  getSummaryForm() {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.EmployeeSummaryService.getEmployeeSummaryInfo(this.employeeMasterId).subscribe(res => {
      
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
}
