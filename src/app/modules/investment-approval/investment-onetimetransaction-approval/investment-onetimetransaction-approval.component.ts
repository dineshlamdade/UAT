import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { InvestmentApprovalDocumentRemarkInfo } from '../interfaces/investment-approval-document-remark-info';
import { InvestmentApprovalEmployeeInfo } from '../interfaces/investment-approval-employee-info';
import { InvestmentApprovalMasterDocumentInfo } from '../interfaces/investment-approval-master-document-info';
import { InvestmentApprovalTransactionInfo } from '../interfaces/investment-approval-transaction-info';
import { InvestmentMasterApprovalService } from '../investment-master-approval/investment-master-approval.service';
import { InvestmentTransactionApprovalService } from '../investment-transaction-approval/investment-transaction-approval.service';
import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { InvestmentApprovalMasterInfo } from '../interfaces/investment-approval-master-info';
import {InvestmentOnetimetransactionApprovalService } from './investment-onetimetransaction-approval.service';
import { debug } from 'node:console';

@Component({
  selector: 'app-investment-onetimetransaction-approval',
  templateUrl: './investment-onetimetransaction-approval.component.html',
  styleUrls: ['./investment-onetimetransaction-approval.component.scss']
})
export class InvestmentOnetimetransactionApprovalComponent implements OnInit {

  public documentList: Array<any> = [];

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

  mastertable2: any[];
  public modalRef: BsModalRef;

  public windowScrolled: boolean;
  public transactionInfo: InvestmentApprovalTransactionInfo = {
    psidDetail: {
      groupName: '',
      section: '',
      type: '',
      psid: '',
      dateOfSubmission: null,
      proofSubmissionStatus: '',
      lastModifiedDateTime: null,
    },
    transactionDetail: [
      {
        institutionName: '',
        policyNo: '',
        policyholdername: '',
        frequency: '',
        masterPSID: '',
        declarationTotal: 0,
        actualTotal: 0,
        totalApprovedAmount: 0,
        totalRejectedAmount: 0,
        transactionDetailList: [
          {
            transactionId: 0,
            previousEmployer: '',
            declaredAmount: 0,
            dateOfPayment: null,
            dueDate: null,
            actualAmount: 0,
            amountRejected: '0',
            amountApproved: '0',
            remark: '',
            remarkList: [],
            transactionStatus: '',
            proofSubmissionId: '',
          },
        ],
      },
    ],
    documentList: [],
    grandTotalActual: 0,
    grantTotalApproved: 0,
    grandTotalRejected: 0,
  };
  public localStorageProofSubmissionIdList: Array<any> = [];
  public documentDetailList: InvestmentApprovalMasterDocumentInfo[] = [];
  public documentRemarkList: InvestmentApprovalDocumentRemarkInfo[] = [];
  public globalPSID: any = '';
  test = [];
  approved1Disabled: boolean = true;
  public previousDisabled: boolean = true;
  public nextDisabled: boolean = false;
  public transactionList: Array<any> = [];
  public proofSubmissionIdListIndex: number;
  public masterInfo: InvestmentApprovalMasterInfo = {
    // psidDetailList: [],
     psidDetail: {
       groupName: '',
       section: '',
       type: '',
       psid: '',
       dateOfSubmission: null,
       proofSubmissionStatus: '',
       lastModifiedDateTime: null
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
       masterRemarkDetailList: []
     }
   };
   public approvedDisabled: boolean = true;

  constructor(
    private modalService: BsModalService,
    private investmentMasterApprovalService: InvestmentMasterApprovalService,
    private investmentTransactionApprovalService: InvestmentTransactionApprovalService,
    private investmentOnetimetransactionApprovalService : InvestmentOnetimetransactionApprovalService,
    private router: Router,
    private alertService: AlertServiceService,
    private numberFormatPipe: NumberFormatPipe
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

    this.proofSubmissionIdListIndex = Number(localStorage.getItem('localStorageProofSubmissionIdListIbex'));
    localStorage.removeItem('localStorageProofSubmissionIdList');
    console.log(
      'localStorageProofSubmissionIdListIbex after remove::',
      localStorage.getItem('localStorageProofSubmissionIdListIbex')
    );

    if (this.localStorageProofSubmissionIdList != null) {
      this.globalPSID = this.localStorageProofSubmissionIdList[this.proofSubmissionIdListIndex].psid;
      console.log('globalPSID::', this.globalPSID);
      this.getEmployeeInfo(60);
      this.getTransactionInfoByPSID(this.globalPSID);
      if (this.localStorageProofSubmissionIdList.length == 1) {
        this.nextDisabled = true;
      }
    }
  }

  // -------------- Open Master Detail In PopUp -----------------------------------------
  openMasterDetailInPopUp(masterDetailtemplate: TemplateRef<any>, masterPSID:any) {
    this.investmentMasterApprovalService
    .getMasterInfo(masterPSID)
    .subscribe((res: InvestmentApprovalMasterInfo) => {
      console.log('res asterinfo::', res);
      if (res != null || res != undefined) {
        this.masterInfo = res;
      }
    });
    this.modalRef = this.modalService.show(
      masterDetailtemplate,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // --------- Get Employee Info by employee mAster ID --------------------------------
  getEmployeeInfo(employeeMasterId: any): void {
   
    this.investmentMasterApprovalService
      .getEmployeeInfo(employeeMasterId)
      .subscribe((res: InvestmentApprovalEmployeeInfo) => {
        console.log('res empInfo::', res);
     
        this.employeeInfo = res;
      });
  }

  // ---------- Get Transaction Info By PSID ------------------------------------------
  getTransactionInfoByPSID(psid: any): void {
    this.investmentOnetimetransactionApprovalService
      .getTransactionInfoByPSID(psid)
      .subscribe((res: InvestmentApprovalTransactionInfo) => {
        console.log('res transactionInfo::', res);
        
        if (res != null || res != undefined) {
          this.transactionInfo = res;
          this.documentDetailList = this.transactionInfo.documentList;
          // this.transactionInfo.transactionDetail.forEach((transWithMaster)=>{
          //   transWithMaster.transactionDetailList.forEach((transaction)=>{
          //     transaction.amountApproved = this.numberFormatPipe.transform(transaction.amountApproved)
          //     transaction.amountRejected = this.numberFormatPipe.transform(transaction.amountRejected)
          //   });
          // });
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
            //   this.approvedDisabled = false;
            // }
          });
        }
      });
  }

  //-------- For selecting Document For Approval Or Discard ----------
  selectDocumentForApprovalOrDiscard(
    checkValue,
    documentDetail,
    transaction: InvestmentApprovalTransactionInfo
  ) {
    console.log('checkValue::', checkValue);
    console.log('documentDetail::', documentDetail);
    // console.log("documentCheckBox::",this.documentCheckBox);
    if (checkValue) {
      const data = {
        documentInformationId: documentDetail.documentInformationId,
        employeeMasterId: documentDetail.employeeMasterId,
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

  // ------------ Open Document in Next Window -------------------
  navigateToDocumentViewer(documentInformationId: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/investment-approval/documentview'])
    );

    localStorage.setItem('masterInfo', JSON.stringify(this.transactionInfo));
    localStorage.setItem('documentInformationId', documentInformationId);

    this.router.navigate([]).then((result) => {
      window.open(
        url,
        '_blank',
        'location=yes,height=1000,width=1000,scrollbars=yes,status=yes'
      );
    });
  }

  //----------- On change Document Remark --------------------------
  public onChangeDocumentRemark(docDetail, event) {
    console.log('event.target.value::', event.target.value);
    const index = this.transactionInfo.documentList.indexOf(docDetail);
    console.log('index::', index);

    this.transactionInfo.documentList[index].statusRemark = event.target.value;
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

  //---------------- Edit Document Detail for Approval or Discard ---------------------------
  public editDocument(docDetail) {
    const index = this.transactionInfo.documentList.indexOf(docDetail);
    console.log('index::', index);

    this.transactionInfo.documentList[index].documentStatus =
      'Edit-' + docDetail.documentStatus;
  }

  //  ------------ Change Document Status ------------------
  changeDocumentStatus(status: any) {
    if (this.documentList.length == 0) {
      // if(status == 'Approved')
      this.alertService.sweetalertWarning('Please Select Atleast One Document');
      return;
    }
    if(status=='Discarded'){
      this.documentList.forEach((doc) => {
        if(doc.statusRemark=='' || doc.statusRemark==undefined){
          this.alertService.sweetalertWarning('Please give Remark for Rejected Document');
          return;
        }
      });
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

    this.investmentMasterApprovalService
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
            res.data.results[0].documentList;
          this.getTransactionInfoByPSID(res.data.results[0].psidDetail.psid);
        }
        this.documentList = [];
      });
  }

  //-------- For selecting transaction For Processing of Approval, SendBack and Forward ----------
  selectTransactionForProcess(
    checkValue,
    trnsactionLineItem
  ) {
    
    console.log('checkValue::', checkValue);
    console.log('trnsactionLineItem::', trnsactionLineItem);
    
    // console.log("documentCheckBox::",this.documentCheckBox);
    if (checkValue) {
      const data = {
        transactionId: trnsactionLineItem.transactionId,
        proofSubmissionId: trnsactionLineItem.proofSubmissionId,
        amountRejected: trnsactionLineItem.amountRejected.toString().replace(/,/g, ''),
        amountApproved: trnsactionLineItem.amountApproved.toString().replace(/,/g, ''),
        remark: trnsactionLineItem.remark,
        //transactionStatus:
      };
      this.transactionList.push(data);
    } else {
      const index = this.transactionList.indexOf(
        trnsactionLineItem.transactionId
      );
      this.transactionList.splice(index, 1);
    }
    console.log('transactionList::', this.transactionList);
  }


  // ------------ Change PSID Status of Transactionwith Each Line Item --------------------------------------
  changePSIDStatusOfTransaction(status: any) {
    console.log("status::",status)

     if(status=='SendBack'){

      //  if(this.masterRemark==''||this.masterRemark==undefined||this.masterRemark==null){
      //      this.remarkValidation= true;
      //      console.log("remarkValidation::",this.remarkValidation)
      //    return;
      //  }
     }
     if(status=='Approved'){

      //  this.masterInfo.masterDetail.documentDetailList.forEach((doc)=>
      //  {
      //    console.log("doc.documentStatus::",doc.documentStatus)
      //    if(doc.documentStatus!='Approved'){
      //      this.alertService.sweetalertWarning("Make all Documents either Approved or Discarded");
      //      return;
      //    }
      //  });
     }
     if (this.transactionList.length == 0) {
      this.alertService.sweetalertWarning('Please Select Atleast One Transaction');
      return;
    }
    this.transactionList.forEach((trans) => {
      trans.transactionStatus = status;
    });
    const data = this.transactionList;

    console.log('data of transactionList::', data);
    this.postMethodCall(data);

    this.approvedDisabled = true;

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
        .type == 'T'
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
      this.getTransactionInfoByPSID(this.globalPSID);
    } else if (
      this.localStorageProofSubmissionIdList[this.proofSubmissionIdListIndex]
        .type == 'M'
    ) {
      localStorage.setItem(
        'localStorageProofSubmissionIdList',
        JSON.stringify(this.localStorageProofSubmissionIdList)
      );

      localStorage.setItem(
        'localStorageProofSubmissionIdListIbex',
        this.proofSubmissionIdListIndex.toString()
      );

      this.router.navigate(['/investment-approval/master']);
    } else {
      this.router.navigate(['/investment-approval/dashboard']);
    }





  }

   // ----------------- Change PSID Status of MASTER with NEXT and PREVIOUS
   changeStatusWithNextPrevious(status: any,  psid: any, operationType: string) {
    if(status=='SendBack'){

      // if(this.masterRemark==''||this.masterRemark==undefined||this.masterRemark==null){
      //     this.remarkValidation= true;
      //     console.log("remarkValidation::",this.remarkValidation)
      //   return;
      // }
    }
    this.changePSIDStatusOfTransaction(status)
    this.changePSID(psid, operationType)
   }

   //---------------- Edit Transaction Line Item Detail for Approval or SendBack Or Forward---------------------------
  public editTransactionLineItem(trnsactionLineItem) {

    const data = [{
      transactionId: trnsactionLineItem.transactionId,
      proofSubmissionId: trnsactionLineItem.proofSubmissionId,
      amountRejected: trnsactionLineItem.amountRejected.toString().replace(/,/g, ''),
      amountApproved: trnsactionLineItem.amountApproved.toString().replace(/,/g, ''),
      remark: trnsactionLineItem.remark,
      transactionStatus: 'Re-Open'
    }];

    console.log('data of transactionList::', data);

    this.postMethodCall(data);
   // const index = this.transactionInfo.transactionDetail.indexOf(transactionDetail);
    //console.log('index::', index);

    //this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].transactionStatus =
   //   'Edit-' + transactionDetail.transactionDetailList[transIndex].transactionStatus;
  }

  //----------- On change Rejected Amount --------------------------
  public onChangeRejectedAmount(transactionDetail, transIndex, event) {
    console.log('event.target.value::', event.target.value);
    const index = this.transactionInfo.transactionDetail.indexOf(transactionDetail);
    console.log('index::', index);
    if(Number(event.target.value)>this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].actualAmount){
      this.alertService.sweetalertWarning("Rejected amount is greater than Actual amount");
      this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected =  this.numberFormatPipe.transform(0);
      this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved = this.numberFormatPipe.transform(this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].actualAmount - Number(
        this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected.toString().replace(/,/g, '')));
      return;
    }
    this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected =  this.numberFormatPipe.transform(event.target.value);
    console.log('amountRejected::', this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected);
    this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved = this.numberFormatPipe.transform(this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].actualAmount - Number(
      this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected.toString().replace(/,/g, '')));
      console.log('amountApproved::', this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved);
  }

   //----------- On change Approved Amount --------------------------
   public onChangeApprovedAmount(transactionDetail, transIndex, event) {
    console.log('event.target.value::', event.target.value);
    const index = this.transactionInfo.transactionDetail.indexOf(transactionDetail);
    console.log('index::', index);
    if(Number(event.target.value)>this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].actualAmount){
      this.alertService.sweetalertWarning("Approved amount is greater than Actual amount");
      this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved =  this.numberFormatPipe.transform(0);
      this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected = this.numberFormatPipe.transform(this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].actualAmount - Number(
        this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved.toString().replace(/,/g, '')));
      return;
    }
    this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved =  this.numberFormatPipe.transform(event.target.value);
    console.log('amountApproved::', this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved);
    this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected = this.numberFormatPipe.transform(this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].actualAmount - Number(
      this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountApproved.toString().replace(/,/g, '')));
      console.log('amountRejected::', this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].amountRejected);
  }

   //----------- On change Transactional Line Item Remark --------------------------
   public onChangeTransactionalRemark(transactionDetail, transIndex, event) {
    console.log('event.target.value::', event.target.value);
    const index = this.transactionInfo.transactionDetail.indexOf(transactionDetail);
    console.log('index::', index);

    this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].remark =  event.target.value;
    console.log('remark::', this.transactionInfo.transactionDetail[index].transactionDetailList[transIndex].remark);

  }

// --------------------- Post Method Call ------------------------------------
public postMethodCall(data):void{

  let formData: any = new FormData();

    formData.append('transactionList', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });

     this.investmentTransactionApprovalService
       .changeTransactionStatus(formData)
       .subscribe((res: InvestmentApprovalTransactionInfo) => {
         console.log('res transaction Status::', res);
         console.log('this.transactionList.length::', this.transactionList.length);
         if (this.transactionList.length == 1) {
          this.alertService.sweetalertMasterSuccess(
            'Transaction ' + status + ' sucessfully.',
            ''
          );
        } else if (this.transactionList.length > 1) {
          this.alertService.sweetalertMasterSuccess(
            'Transactions ' + status + ' sucessfully.',
            ''
          );
        }

        if (res != null || res != undefined) {
          this.transactionInfo = res;
          this.documentDetailList = this.transactionInfo.documentList;
          this.transactionInfo.transactionDetail.forEach((transWithMaster)=>{
            transWithMaster.transactionDetailList.forEach((transaction)=>{
              transaction.amountApproved = this.numberFormatPipe.transform(transaction.amountApproved)
              transaction.amountRejected = this.numberFormatPipe.transform(transaction.amountRejected)
            });
          });
        }
        this.transactionList=[];
       });
}

  // turn(){

  //     var angle: string ;

  //     ("#image").data("angle") + 90 || 90;
  //     // Element.style.transform("rotate(" + angle + "deg)" )
  //     Element.setAttribute("style", "rotate(" + angle + "deg)" )
  //     ("#image").data("angle", angle);

  // }

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
