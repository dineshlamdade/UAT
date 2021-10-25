import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { InvestmentApprovalEmployeeInfo } from '../interfaces/investment-approval-employee-info';
import { InvestmentApprovalMasterDocumentInfo } from '../interfaces/investment-approval-master-document-info';
import { InvestmentApprovalMasterInfo } from '../interfaces/investment-approval-master-info';
import { stat } from 'node:fs';
import { Table } from 'primeng/table';
import { InvestmentApprovalDocumentRemarkInfo } from '../interfaces/investment-approval-document-remark-info';
import { InvestmentIntereston80TTATTBMasterApprovalService } from './investment-intereston80-tta-ttb-master-approval.service';

@Component({
  selector: 'app-investment-intereston80-tta-ttb-master-approval',
  templateUrl: './investment-intereston80-tta-ttb-master-approval.component.html',
  styleUrls: ['./investment-intereston80-tta-ttb-master-approval.component.scss']
})
export class InvestmentIntereston80TTATTBMasterApprovalComponent implements OnInit {

  public documentList: Array<any> = [];
  public approved1Disabled= false;
  public documentSafeURL: SafeResourceUrl;
  public modalRef: BsModalRef;
  public documentURLIndex: number;
  public windowScrolled: boolean;
  public globalPSID: any = '';
  //public documentCheckBox: boolean = false;
  public dtSelectedRows: any[];
  public documentRemarkList: InvestmentApprovalDocumentRemarkInfo[] = [];
  public proofSubmissionIdList: Array<any> = [];
  public localStorageProofSubmissionIdList: Array<any> = [];
  public proofSubmissionIdListIndex: number;
  public masterRemark: any;
  public documentRemark: any;
  public documentDetailList: InvestmentApprovalMasterDocumentInfo[] = [];
  public previousDisabled: boolean = true;
  public nextDisabled: boolean = false;
  public test = [];

  public employeeInfo: InvestmentApprovalEmployeeInfo = {
    employeeMasterId: 0,
    fullName: '',
    employeeType: '',
    designation: '',
    employeeCode: '',
    joiningDate: null,
    grade: '',
    establishment: '',
  };

  public masterInfo: InvestmentApprovalMasterInfo = {
    // psidDetailList: [],
    psidDetail: {
      groupName: '',
      section: '',
      type: '',
      psid: '',
      dateOfSubmission: null,
      proofSubmissionStatus: '',
      lastModifiedDateTime: null,
    },
    masterDetail: {
      masterId: 0,
      employeeMasterId: 0,
      institutionName: '',
      policyNo: '',
      policyholdername: '',
      relationship: '',
      policyStartDate: null,
      policyEndDate: null,
      proofSubmissionId: '',
      masterStatus: '',
      paymentDetailList: [],
      documentDetailList: this.documentDetailList,
      masterRemarkDetailList: [],
    },
  };
  public remarkValidation: boolean = false;
  public approvedDisabled: boolean = true;
  public approvedDiscardDisabled = false;
  public documentRemarkValidation: boolean = false;
  selectedRemark = '';

  constructor(
    private investmentIntereston80TTATTBMasterApprovalService: InvestmentIntereston80TTATTBMasterApprovalService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit(): void {
    this.localStorageProofSubmissionIdList = JSON.parse(
      localStorage.getItem('localStorageProofSubmissionIdList')
    );
    console.log(
      'localStorageProofSubmissionIdList::',
      this.localStorageProofSubmissionIdList
    );
    localStorage.removeItem('localStorageProofSubmissionIdList');
    console.log(
      'localStorageProofSubmissionIdList after remove::',
      localStorage.getItem('localStorageProofSubmissionIdList')
    );
    this.proofSubmissionIdListIndex = Number(
      localStorage.getItem('localStorageProofSubmissionIdListIbex')
    );
    localStorage.removeItem('localStorageProofSubmissionIdList');
    console.log(
      'localStorageProofSubmissionIdListIbex after remove::',
      localStorage.getItem('localStorageProofSubmissionIdListIbex')
    );
    if (this.localStorageProofSubmissionIdList != null) {
      this.globalPSID =
        this.localStorageProofSubmissionIdList[
          this.proofSubmissionIdListIndex
        ].psid;
      console.log('globalPSID::', this.globalPSID);
      //this.getEmployeeInfo(60);
      this.getMasterInfo(this.globalPSID);
      if (this.localStorageProofSubmissionIdList.length == 1) {
        this.nextDisabled = true;
      }
    }
  }

  // --------- Get Employee Info by employee mAster ID --------------------------------
  getEmployeeInfo(employeeMasterId: any): void {
    this.investmentIntereston80TTATTBMasterApprovalService
      .getEmployeeInfo(employeeMasterId)
      .subscribe((res: InvestmentApprovalEmployeeInfo) => {
        console.log('res empInfo::', res);
        this.employeeInfo = res;
      });
  }

  // ---------- Get Master Info By PSID ------------------------------------------
  getMasterInfo(psid: any): void {
    this.investmentIntereston80TTATTBMasterApprovalService
      .getMasterInfo(psid)
      .subscribe((res: InvestmentApprovalMasterInfo) => {
        console.log('res masterinfo::', res);
        if (res != null || res != undefined) {
         
          this.masterInfo = res;
          
          this.documentDetailList =
            this.masterInfo.masterDetail.documentDetailList;
            this.documentDetailList.forEach((doc)=>{
              
              this.test.push(doc.documentStatus);
              
              if (this.test.includes('Submitted')) {
                this.approved1Disabled = true;
            } else if (this.test.includes('Approved')) {
              this.approved1Disabled = false;
            } else if (this.test.includes('Discarded')) {
              this.approved1Disabled = true;
            }
                       // if(doc.documentStatus =="Approved") {
              //   this.approved1Disabled = false;
              // }  if (doc.documentStatus =="Discarded") {
              //     this.approvedDiscardDisabled = true;
                
              // }
              // if(doc.documentStatus =="Submitted") {
              //   this.approvedDisabled = true;
              // }
            
            });
          this.getEmployeeInfo(60);
          console.log(this.test);
      
    

        }
        this.test = [];
      });
  }

  // -------------- Doc Remark Modal ---------------------------
  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    documentRemarkList
  ) {
    console.log('documentDetail::', documentRemarkList);
    this.documentRemarkList = documentRemarkList;
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  // -------------- Master Remark Modal ---------------------------
  public masterRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    documentRemarkList
  ) {
    console.log('documentRemarkDetail::', documentRemarkList);
    this.documentRemarkList = documentRemarkList;
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  // ----------- Custom sort for Table -------------------------
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

  // ------------ Opening Doc Viewer----------------------------
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

  // --------------- Change PSID Next Or Previous -------------------------------
  changePSID(psid: any, operationType: string) {
    console.log('psid::', psid);
    let index = 0;

    index = this.localStorageProofSubmissionIdList.findIndex(
      (psidEle) => psidEle.psid == psid
    );

    if (operationType == 'Next') {
      this.proofSubmissionIdListIndex = index + 1;
    } else if (operationType == 'Previous') {
      this.proofSubmissionIdListIndex = index - 1;
    }

    if (
      this.localStorageProofSubmissionIdList[this.proofSubmissionIdListIndex]
        .type == 'M'
    ) {
      this.globalPSID =
        this.localStorageProofSubmissionIdList[
          this.proofSubmissionIdListIndex
        ].psid;
      if (
        this.proofSubmissionIdListIndex ==
        this.localStorageProofSubmissionIdList.length - 1
      ) {
        this.nextDisabled = true;
        this.previousDisabled = false;
      } else if (this.proofSubmissionIdListIndex == 0) {
        this.previousDisabled = true;
        this.nextDisabled = false;
      } else {
        this.previousDisabled = false;
        this.nextDisabled = false;
      }

      console.log('index::', index);
      this.getMasterInfo(this.globalPSID);
    } else if (
      this.localStorageProofSubmissionIdList[this.proofSubmissionIdListIndex]
        .type == 'T'
    ) {
      localStorage.setItem(
        'localStorageProofSubmissionIdList',
        JSON.stringify(this.localStorageProofSubmissionIdList)
      );

      localStorage.setItem(
        'localStorageProofSubmissionIdListIbex',
        this.proofSubmissionIdListIndex.toString()
      );

      this.router.navigate(['/investment-approval/transaction']);
    } else {
      this.router.navigate(['/investment-approval/dashboard']);
    }

    this.remarkValidation = false;
    this.approvedDisabled = true;
  }

  // ------------ Change PSID Status of Master --------------------------------------
  changeStatus(masterDetails: InvestmentApprovalMasterInfo, status: any) {
    
    console.log('status::', status);
    console.log('remarkValidation::', this.remarkValidation);
    if (status == 'SendBack') {
      console.log('masterRemark::', this.masterRemark);
      if (
        this.masterRemark == '' ||
        this.masterRemark == undefined ||
        this.masterRemark == null
      ) {
        this.remarkValidation = true;
        console.log('remarkValidation::', this.remarkValidation);
        return;
      }
    }
    if (status == 'Approved') {
      this.masterInfo.masterDetail.documentDetailList.forEach((doc) => {
        console.log('doc.documentStatus::', doc.documentStatus);
        if (doc.documentStatus != 'Approved') {
          this.alertService.sweetalertWarning(
            'Make all Documents either Approved or Discarded'
          );
          return;
        }
      });
    }

    const data = {
      masterId: masterDetails.masterDetail.masterId,
      proofSubmissionId: masterDetails.psidDetail.psid,
      policyNo: masterDetails.masterDetail.policyNo,
      masterStatus: status,
      remark: this.masterRemark,
      group: masterDetails.psidDetail.groupName,
      section: masterDetails.psidDetail.section,
    };

    console.log('data::', data);

    let formData: any = new FormData();

    formData.append('approvalMasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });

    this.investmentIntereston80TTATTBMasterApprovalService
      .changeMasterStatus(formData)
      .subscribe((res: any) => {
        console.log('res asterinfo::', res);

        //if (res != null || res != undefined) {
        this.alertService.sweetalertMasterSuccess(
          'Master ' + status + ' sucessfully.',
          ''
        );
        // this.masterInfo = res.data.results[0].masterDetail;
        // this.proofSubmissionIdList = this.masterInfo.psidDetailList;
        console.log('proofSubmissionId::', res.data.results[0].psidDetail.psid);
        // }
        this.getMasterInfo(res.data.results[0].psidDetail.psid);
        this.masterRemark = '';
        this.remarkValidation = false;
      });

  }

  // ----------------- Change PSID Status of MASTER with NEXT and PREVIOUS -------------------------------
  changeStatusWithNextPrevious(
    masterDetails: InvestmentApprovalMasterInfo,
    status: any,
    psid: any,
    operationType: string
  ) {
    // if (status == 'SendBack') {
    //   console.log('masterRemark::', this.masterRemark);
    //   if (
    //     this.masterRemark == '' ||
    //     this.masterRemark == undefined ||
    //     this.masterRemark == null
    //   ) {
    //     this.remarkValidation = true;
    //     console.log('remarkValidation::', this.remarkValidation);
    //     return;
    //   }
    // }
    // this.changeStatus(masterDetails, status);
    // this.changePSID(psid, operationType);
    console.log('status::', status);
    console.log('remarkValidation::', this.remarkValidation);
    if (status == 'SendBack') {
      console.log('masterRemark::', this.masterRemark);
      if (
        this.masterRemark == '' ||
        this.masterRemark == undefined ||
        this.masterRemark == null
      ) {
        this.remarkValidation = true;
        console.log('remarkValidation::', this.remarkValidation);
        return;
      }
    }
    if (status == 'Approved') {
      this.masterInfo.masterDetail.documentDetailList.forEach((doc) => {
        console.log('doc.documentStatus::', doc.documentStatus);
        if (doc.documentStatus != 'Approved') {
          this.alertService.sweetalertWarning(
            'Make all Documents either Approved or Discarded'
          );
          return;
        }
      });
    }

    const data = {
      masterId: masterDetails.masterDetail.masterId,
      proofSubmissionId: masterDetails.psidDetail.psid,
      policyNo: masterDetails.masterDetail.policyNo,
      masterStatus: status,
      remark: this.masterRemark,
      group: masterDetails.psidDetail.groupName,
      section: masterDetails.psidDetail.section,
    };

    console.log('data::', data);

    let formData: any = new FormData();

    formData.append('approvalMasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });

    this.investmentIntereston80TTATTBMasterApprovalService
      .changeMasterStatus(formData)
      .subscribe((res: any) => {
        console.log('res asterinfo::', res);

        //if (res != null || res != undefined) {
        this.alertService.sweetalertMasterSuccess(
          'Master ' + status + ' sucessfully.',
          ''
        );
        // this.masterInfo = res.data.results[0].masterDetail;
        // this.proofSubmissionIdList = this.masterInfo.psidDetailList;
        console.log('proofSubmissionId::', res.data.results[0].psidDetail.psid);
        // }
        this.getMasterInfo(res.data.results[0].psidDetail.psid);
        console.log('psid::', psid);
        let index = 0;
    
        index = this.localStorageProofSubmissionIdList.findIndex(
          (psidEle) => psidEle.psid == psid
        );
    
        if (operationType == 'Next') {
          this.proofSubmissionIdListIndex = index + 1;
        } else if (operationType == 'Previous') {
          this.proofSubmissionIdListIndex = index - 1;
        }
    
        if (
          this.localStorageProofSubmissionIdList[this.proofSubmissionIdListIndex]
            .type == 'M'
        ) {
          this.globalPSID =
            this.localStorageProofSubmissionIdList[
              this.proofSubmissionIdListIndex
            ].psid;
          if (
            this.proofSubmissionIdListIndex ==
            this.localStorageProofSubmissionIdList.length - 1
          ) {
            this.nextDisabled = true;
            this.previousDisabled = false;
          } else if (this.proofSubmissionIdListIndex == 0) {
            this.previousDisabled = true;
            this.nextDisabled = false;
          } else {
            this.previousDisabled = false;
            this.nextDisabled = false;
          }
    
          console.log('index::', index);
          this.getMasterInfo(this.globalPSID);
        } else if (
          this.localStorageProofSubmissionIdList[this.proofSubmissionIdListIndex]
            .type == 'T'
        ) {
          localStorage.setItem(
            'localStorageProofSubmissionIdList',
            JSON.stringify(this.localStorageProofSubmissionIdList)
          );
    
          localStorage.setItem(
            'localStorageProofSubmissionIdListIbex',
            this.proofSubmissionIdListIndex.toString()
          );
    
          this.router.navigate(['/investment-approval/transaction']);
        } else {
          this.router.navigate(['/investment-approval/dashboard']);
        }
    
        this.remarkValidation = false;
        this.approvedDisabled = true;
        this.masterRemark = '';
        this.remarkValidation = false;
      });
  }

  //  ------------ Change Document Status ------------------
  changeDocumentStatus(status: any) {
    if (this.documentList.length == 0) {
      // if(status == 'Approved')
      this.alertService.sweetalertWarning('Please Select Atleast One Document');
      return;
    }

    console.log("status::", status);
    console.log("status::", status == 'Discarded');
    debugger
    if (status == 'Discarded') {
      this.documentList.forEach((doc) => {
        console.log("doc.statusRemark::", doc.statusRemark);
        if (doc.statusRemark == '' || doc.statusRemark == undefined) {
         this.documentRemarkValidation = true;
        }
      });
    }
    if(this.documentRemarkValidation){
      this.alertService.sweetalertWarning(
        'Please give Remark for Discarded Document'
      );
      this.documentRemarkValidation = false;
      return;
    }

    this.documentList.forEach((doc) => {
      doc.documentStatus = status;
    });
    const data = this.documentList;

    console.log('data::', data);

    let formData: any = new FormData();

    formData.append('approvalDocumentRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });

    this.investmentIntereston80TTATTBMasterApprovalService
      .changeMasterDocumentStatus(formData)
      .subscribe((res: any) => {
        console.log('res Doc:', res);
        if (res != null || res != undefined) {
          if (this.documentList.length == 1) {
            this.alertService.sweetalertMasterSuccess(
              'Document ' + status + ' sucessfully.',
              ''
            );
          }
          if (this.documentList.length > 1) {
            this.alertService.sweetalertMasterSuccess(
              'Documents ' + status + ' sucessfully.',
              ''
            );
          }
          this.documentDetailList =
            res.data.results[0].masterDetail.documentDetailList;
          this.getMasterInfo(res.data.results[0].psidDetail.psid);
        }
        this.documentList = [];
      });
    this.remarkValidation = false;
    this.approvedDisabled =true;
  }

  //-------- For selecting Document For Approval Or Discard ----------
  selectDocumentForApprovalOrDiscard(
    checkValue,
    documentDetail,
    masterDetail: InvestmentApprovalMasterInfo
  ) {
    console.log('checkValue::', checkValue);
    console.log('documentDetail::', documentDetail);
    // console.log("documentCheckBox::",this.documentCheckBox);
    if (checkValue) {
      const data = {
        documentInformationId: documentDetail.documentInformationId,
        employeeMasterId: masterDetail.masterDetail.employeeMasterId,
        companyId: 1,
        proofSubmissionId: documentDetail.proofSubmissionId,
        statusRemark: documentDetail.statusRemark,
      };
      this.documentList.push(data);
    } else {
      const index = this.documentList.indexOf(
        documentDetail.documentInformationId
      );
      this.documentList.splice(index, 1);
    }
    console.log('documentList::', this.documentList);
  }

  //---------------- Edit Document Detail for Approval or Discard ---------------------------
  public editDocument(docDetail) {
    const index =
      this.masterInfo.masterDetail.documentDetailList.indexOf(docDetail);
    console.log('index::', index);

    this.masterInfo.masterDetail.documentDetailList[index].documentStatus =
      'Edit-' + docDetail.documentStatus;
  }

  //----------- On change Document Remark --------------------------
  public onChangeDocumentRemark(docDetail, event) {
    debugger
    console.log('event.target.value::', event.target.value);
    if(this.documentList.length>0){
      const index =
      this.documentList.findIndex((doc)=>doc.documentInformationId=docDetail.documentInformationId);
    console.log('index::', index);
    // let test = this.documentList.findIndex(x => x.documentInformationId == docDetail.documentInformationId);
    // console.log('index::', test);

    this.documentList[index].statusRemark =
      event.target.value;
      // this.documentList[index].remark = event.target.value;
    } else {
      const index =
      this.masterInfo.masterDetail.documentDetailList.indexOf(docDetail);
    console.log('index::', index);

    this.masterInfo.masterDetail.documentDetailList[index].statusRemark =
      event.target.value;
    }

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
