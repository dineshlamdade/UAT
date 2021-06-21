import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { InvestmentApprovalDashboardEmployeeInfo } from './interfaces/investment-approval-dashboard-employee-info';
import { InvestmentApprovalDashboardInfo } from './interfaces/investment-approval-dashboard-info';
import { InvestmentApprovalService } from './investment-approval.service';

@Component({
  selector: 'app-investment-approval',
  templateUrl: './investment-approval.component.html',
  styleUrls: ['./investment-approval.component.scss'],
})

export class InvestmentApprovalComponent implements OnInit {
  public modalRef: BsModalRef;
  public employeeList: InvestmentApprovalDashboardEmployeeInfo[];
  cities: Array<any> = [];
  users1: Array<any> = [];
  group: Array<any> = [];
  first = 0;

  rows = 10;
  dashboardEmployeeInfo: InvestmentApprovalDashboardInfo;

  constructor(private modalService: BsModalService,
    private investmentApprovalService: InvestmentApprovalService) {}

  ngOnInit() {

    this.users1 = [
      {
        Group: '80-c',
        ITSection: 'LIC',
        // noemployees:'Rihan',
        // nopsid:'123',
        proofsubmitted: 'yes',
        actioned: 'submitted',
        yettoactioned: 'ABCS',
        submitted: 'yes',
        sendback: 'No',
        approved: 'yes',
      },
    ];
    this.cities = [{ name: 'LIC' }, { name: 'PPF' }, { name: 'Pensionplan' }];

    this.group = [{ name: '80-C' }, { name: 'grp2' }, { name: 'grp3' }];

    this.getDashboardEmployeeList();
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  UploadModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.employeeList
      ? this.first === this.employeeList.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.employeeList ? this.first === 0 : true;
  }

  public getDashboardEmployeeList(){
    this.investmentApprovalService.getDashboardEmployeeList().subscribe((res: InvestmentApprovalDashboardInfo)=>{
     console.log("res::", res)
      this.dashboardEmployeeInfo = res;
      this.employeeList = this.dashboardEmployeeInfo.assignedProofSubmissionList;
      console.log("employeeList::", this.employeeList)
    });
  }

}
