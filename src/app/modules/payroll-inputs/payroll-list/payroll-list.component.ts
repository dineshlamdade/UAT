import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PayrollInputsService } from '../payroll-inputs.service';


export interface User1 {
  checked;
  headtype;
  headcode;
  headdesc;
  openingval;
  chngamount;
  chngper;
  closingamt;
  unitofmeasure;
  remark;
}
@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.scss']
})



export class PayrollListComponent implements OnInit {
  public users: Array<any> = [];
  public checkedEmployeeList: Array<any> = [];
  public modalRef: BsModalRef;

  constructor(private service: PayrollInputsService) { }

  public ngOnInit(): void {
    this.getAllEmployeeDetails();
  }

  public getAllEmployeeDetails(): void {
    this.service.getAllEmployeeDetails().subscribe((res) => {
      this.users = res.data.results[0];
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
    this.service.setEmployeeListArray(this.checkedEmployeeList);
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
    this.service.setEmployeeListArray(this.checkedEmployeeList);
  }
}
