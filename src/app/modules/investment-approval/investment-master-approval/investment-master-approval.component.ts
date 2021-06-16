import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { InvestmentApprovalEmployeeInfo } from '../interfaces/investment-approval-employee-info';
import { InvestmentApprovalMasterDocumentInfo } from '../interfaces/investment-approval-master-document-info';
import { InvestmentApprovalMasterInfo } from '../interfaces/investment-approval-master-info';
import { InvestmentMasterApprovalService } from './investment-master-approval.service';
import { stat } from 'node:fs';
import { Table } from 'primeng/table';
import { InvestmentApprovalDocumentRemarkInfo } from '../interfaces/investment-approval-document-remark-info';

@Component({
  selector: 'app-investment-master-approval',
  templateUrl: './investment-master-approval.component.html',
  styleUrls: ['./investment-master-approval.component.scss'],
})
export class InvestmentMasterApprovalComponent implements OnInit {
  //@ViewChild(Table) dt: Table;
  public employeeInfo: InvestmentApprovalEmployeeInfo;
  public masterInfo: InvestmentApprovalMasterInfo;
  public documentList: Array<any>=[];
  public documentSafeURL: SafeResourceUrl;
  public modalRef: BsModalRef;
  public documentURLIndex: number;
  public windowScrolled: boolean;
  public globalPSID: any = '21061111410203032196';
  public documentCheckBox: boolean = false;
  public dtSelectedRows:any[];
  public documentRemarkList: InvestmentApprovalDocumentRemarkInfo[];
  public proofSubmissionIdList: Array<any>=[];
  public proofSubmissionIdListIndex: number;
  public masterRemark: any;
  public documentDetailList: InvestmentApprovalMasterDocumentInfo[];

  constructor(
    private investmentMasterApprovalService: InvestmentMasterApprovalService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private alertService: AlertServiceService
  ) {

  }

  ngOnInit(): void {
    this.getEmployeeInfo(60);
    this.getMasterInfo(this.globalPSID);
  }

  getEmployeeInfo(employeeMasterId: any): void {
    this.investmentMasterApprovalService
      .getEmployeeInfo(employeeMasterId)
      .subscribe((res: InvestmentApprovalEmployeeInfo) => {
        console.log('res empInfo::', res);
        this.employeeInfo = res;
      });
  }

  getMasterInfo(psid: any): void {
    this.investmentMasterApprovalService
      .getMasterInfo(psid)
      .subscribe((res: InvestmentApprovalMasterInfo) => {
        console.log('res asterinfo::', res);
        if (res != null || res != undefined) {
          this.masterInfo = res;
          this.documentDetailList = this.masterInfo.masterDetail.documentDetailList;
          this.proofSubmissionIdList = this.masterInfo.psidDetailList;
          console.log("proofSubmissionIdList::", this.proofSubmissionIdList);
        }
      });
  }

  public docRemarkModal(documentViewerTemplate: TemplateRef<any>, index: any, documentRemarkList) {
    console.log("documentDetail::",documentRemarkList);
   this.documentRemarkList = documentRemarkList;
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  public masterRemarkModal(documentViewerTemplate: TemplateRef<any>, documentRemarkList) {
    console.log("documentDetail::",documentRemarkList);
   this.documentRemarkList = documentRemarkList;
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  public nextDocViewer() {
    this.documentURLIndex = this.documentURLIndex + 1;
    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex]
        .blobURI
    );
  }

  public previousDocViewer() {
    this.documentURLIndex = this.documentURLIndex - 1;
    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex]
        .blobURI
    );
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

  navigateAssociates(documentInformationId: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/investment-approval/documentview'])
    );

    localStorage.setItem('masterInfo', JSON.stringify(this.masterInfo));
    localStorage.setItem('documentInformationId', documentInformationId);

    this.router.navigate([]).then((result) => {
      window.open(
        url,
        '_blank',
        'location=yes,height=1000,width=1000,scrollbars=yes,status=yes'
      );
    });
  }

  changePSID(psid:any, operationType:string) {

    console.log("psid::",psid);
    const index = this.proofSubmissionIdList.findIndex((psidEle)=>psidEle.psid==psid);
    console.log("index::",index);
    if(operationType=="Next"){
      this.proofSubmissionIdListIndex = index+1;
    } else if (operationType=="Previous"){
      this.proofSubmissionIdListIndex = index-1;

    }


    this.globalPSID = this.proofSubmissionIdList[this.proofSubmissionIdListIndex].psid;
    this.getMasterInfo(this.globalPSID);
  }

  changeStatus(masterDetails: InvestmentApprovalMasterInfo, status: any) {
    const data = {
      masterId: masterDetails.masterDetail.masterId,
      proofSubmissionId: masterDetails.psidDetail.psid,
      policyNo: masterDetails.masterDetail.policyNo,
      masterStatus: status,
      remark: this.masterRemark,
      group: masterDetails.psidDetail.groupName,
      section:  masterDetails.psidDetail.section
    };

    console.log('data::', data);

    let formData: any = new FormData();

    formData.append('approvalMasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });

    this.investmentMasterApprovalService
      .changeMasterStatus(formData)
      .subscribe((res: any) => {
        console.log('res asterinfo::', res);

        //if (res != null || res != undefined) {
          this.alertService.sweetalertMasterSuccess('Master '+ status + ' sucessfully.', '');
         // this.masterInfo = res.data.results[0].masterDetail;
         // this.proofSubmissionIdList = this.masterInfo.psidDetailList;
          console.log("proofSubmissionId::", res.data.results[0].psidDetail.psid);
        // }
        this.getMasterInfo(res.data.results[0].psidDetail.psid)

      });
      this.masterRemark='';
  }

  changeDocumentStatus(status: any){

    if(this.documentList.length == 0){
     // if(status == 'Approved')
      this.alertService.sweetalertWarning('Please Select Atleast One Document');
      return;
    }
    this.documentList.forEach((doc) =>{
      doc.documentStatus = status
    })
    const data = this.documentList;

    console.log('data::', data);

    let formData: any = new FormData();

    formData.append('approvalDocumentRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });

    this.investmentMasterApprovalService
      .changeMasterDocumentStatus(formData)
      .subscribe((res: any) => {
        console.log('res Doc:', res);
        if (res != null || res != undefined) {
          if(this.documentList.length == 1){
         this.alertService.sweetalertMasterSuccess('Document '+ status + ' sucessfully.', '');
          }
          if(this.documentList.length > 1){
            this.alertService.sweetalertMasterSuccess('Documents '+ status + ' sucessfully.', '');
             }
             this.documentDetailList = res.data.results[0].masterDetail.documentDetailList;
        }
        this.documentList=[];

      });

  }

  selectRow(checkValue, documentDetail, masterDetail: InvestmentApprovalMasterInfo) {
    console.log("checkValue::",checkValue);
    console.log("documentDetail::",documentDetail);
    console.log("documentCheckBox::",this.documentCheckBox);
    if (checkValue) {
      const data = {
        documentInformationId : documentDetail.documentInformationId,
        employeeMasterId : masterDetail.masterDetail.employeeMasterId,
        companyId : 1,
        proofSubmissionId : documentDetail.proofSubmissionId,
        statusRemark : 'lic document'
      }
      this.documentList.push(data);
    } else {
      const index = this.documentList.indexOf(
        documentDetail.documentInformationId
      );
      this.documentList.splice(index, 1);
    }
    console.log("documentList::", this.documentList);
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
