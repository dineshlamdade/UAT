import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { ExcelService } from '../uploadexcel/uploadexcelhome/excel.service';
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
  public employeeList: InvestmentApprovalDashboardEmployeeInfo[] = [];
  public groupList: Array<any> = [];
  public sectionList: Array<any> = [];
  users1: Array<any> = [];

  first = 0;


  rows = 10;
  public dashboardEmployeeInfo: InvestmentApprovalDashboardInfo = {
    masterStatusCount: {
      approved: 0,
      sendBack: 0,
      submitted: 0,
      reSubmitted: 0,
      total: 0,
    },
    transactionCount: {
      approved: 0,
      sendBack: 0,
      submitted: 0,
      reSubmitted: 0,
      total: 0,
    },
    assignedProofSubmissionList: this.employeeList,
    itGroupsSectionsList: []
  };

  public psidList: Array<any> = [];
  public excelData: Array<any> = [];

  constructor(
    private modalService: BsModalService,
    private investmentApprovalService: InvestmentApprovalService,
    private router: Router,
    private excelservice: ExcelService
  ) {}

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

   // this.cities = [{ name: 'LIC' }, { name: 'PPF' }, { name: 'Pensionplan' }];

    //this.group = [{ name: '80-C' }, { name: 'grp2' }, { name: 'grp3' }];

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

  public getDashboardEmployeeList() {
    this.investmentApprovalService.getDashboardEmployeeList().subscribe(
      (res: InvestmentApprovalDashboardInfo) => {
        console.log('res::', res);
        this.dashboardEmployeeInfo = res;
        this.employeeList =
          this.dashboardEmployeeInfo.assignedProofSubmissionList;
         this.dashboardEmployeeInfo.itGroupsSectionsList.forEach((gs:any)=>{
          this.groupList.push(gs.group);
          this.sectionList.push(gs.section);

          });
          console.log('groupList::', this.groupList);
          this.groupList =  Array.from(new Set(this.groupList));
          console.log('groupList::', this.groupList);
        console.log('employeeList::', this.employeeList);
      },
      (error) => {
        console.log('error::', error);
      }
    );
  }

  navigateToApproval() {
    if (this.psidList.length == 0) {
      this.employeeList.forEach((emp) => {
        this.psidList.push(emp.proofSubmissionId);
      });
    }
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/investment-approval/master'])
    // );
    console.log("this.psidList::", this.psidList)

    localStorage.setItem('localStorageProofSubmissionIdList', JSON.stringify(this.psidList));

   this.router.navigate(['/investment-approval/master']);
  }

  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.employeeList.forEach((element) => {
      let obj = {
        'Emp. Code': element.employeeCode,
        'Emp. Name': element.employeeName,
        'Group': element.itGroup,
        'IT Section': element.itSection,
        'Nature': element.type,
        'PS ID': element.proofSubmissionId,
        'PS ID Details': element.proofSubmissionIdDetail,
        'Submission Date': new Date(element.dateOfSubmission),
        'Status': element.status,
      };
      this.excelData.push(obj);
    });
    this.excelservice.exportAsExcelFile(
      this.excelData,
      'Investment-Approval-Summary'
    );
  }

  selectEmployeeForApproval(checkValue, proofSubmissionId) {
    console.log("checkValue::",checkValue);
    console.log("proofSubmissionId::",proofSubmissionId);

    if (checkValue) {
      this.psidList.push(proofSubmissionId);
    } else {
      const index = this.psidList.indexOf(
        proofSubmissionId
      );
      this.psidList.splice(index, 1);
    }
    console.log("psidList::", this.psidList);
  }
}
