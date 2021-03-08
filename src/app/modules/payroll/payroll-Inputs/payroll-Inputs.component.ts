import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PayrollService } from '../payroll.service';
@Component({
  selector: 'app-payroll-Inputs',
  templateUrl: './payroll-Inputs.component.html',
  styleUrls: ['./payroll-Inputs.component.scss'],
})
export class PayrollInputsComponent implements OnInit {

  public users: Array<any> = [];
  public checkedEmployeeList: Array<any> = [];
  public modalRef: BsModalRef;
 constructor(private service: PayrollService) { }

  public ngOnInit(): void {
    this.getAllEmployeeDetails();
  }

  public getAllEmployeeDetails(): void {
    this.service.getAllEmployeeDetails().subscribe((res) => {
      console.log(res);
      this.users =  res.data.results[0];
      console.log(this.users);
    });
  }

  public updateEmployeeSelectedLists(event: any, id: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.checkedEmployeeList.push(id);
    } else {
      this.checkedEmployeeList.forEach((value, index) => {
        if (value === id) { this.checkedEmployeeList.splice(index, 1); }
    });
    }
    console.log(this.checkedEmployeeList);
  }

  public updateAllEmployeeSelectedLists(event: any): void {
    const checked = event.target.checked;
    this.checkedEmployeeList = [];
    if (checked) {
      this.users.forEach((val) => {
        this.checkedEmployeeList.push(val.employeeMasterId);
      });
    } else {
      this.checkedEmployeeList = [];
    }
  }
}
