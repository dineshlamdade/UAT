import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QueryService } from '../query.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  selectedEmployeeData : any;
  employeeListForm : FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
  modalRef: BsModalRef;
  employeeList: any;
  constructor(public queryService :QueryService ,private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.getAllEmployeeDetails();
  }
  smallpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  getSelectedEmployee(user){
    this.selectedEmployeeData.push(user)
  }

  public getAllEmployeeDetails(): void {
    this.queryService.getAllEmployeeDetails().subscribe((res) => {
      this.employeeList = res.data.results[0];
    });
  }


}
