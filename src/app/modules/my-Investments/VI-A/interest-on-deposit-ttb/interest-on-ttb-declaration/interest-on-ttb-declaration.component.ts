import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { InterestOnTtbService } from '../interest-on-ttb.service';

@Component({
  selector: 'app-interest-on-ttb-declaration',
  templateUrl: './interest-on-ttb-declaration.component.html',
  styleUrls: ['./interest-on-ttb-declaration.component.scss']
})
export class InterestOnTtbDeclarationComponent implements OnInit {

  public enteredRemark = '';

  @Input() bankName: string;
  @Input() policyNo: string;
  @Input() data: any;
  documentRemarkList: any;
  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name = 'Set iframe source';
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public transactionWithLenderName: Array<any> = [];
  public summaryComputationGridDate: any;

  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public interestOnSavingDeposit80TTTransactionWithDocumentList: Array<any> = [];

  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  // public bankNameList: Array<any> = [];
  public interestOnSavingDeposit80TTTransactionList: Array<any> = [];
  public proofSubmissionId: '';
  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;
  public editReceiptNumber: string;
  public editDocumentRemark: string;
  public AccountlenderNameList: Array<any> = [];

  documentDataArray = [];
  editdDocumentDataArray = [];

  viewDocumentName: any;
  viewDocumentType: any;

  documentArray: any[] =[];

  documentPassword =[];
  remarkList =[];
  editdocumentPassword =[];
  editremarkList =[];
  document3Password: any;
  remark3List: any;
  Remark: any;

  public bankNameList: Array<any> = [];
  public transactionBankNameList: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];
  public editfilesArray: File[] = [];
  public urlIndex: number;
  public glbalECS: number;
  public form: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;
  public enableEditRow: number;
  public enableAddRow: number;
  public enablePolicyTable: number;
  public enableCheckbox: number;
  public enableCheckboxFlag: number;
  public enableCheckboxFlag3: boolean;
  public addRow1: boolean;
  public addRow2: number;
  public ttarequest: Array<any> = [];
  public previousEmployeeList: Array<any> = [];
  public proofSubmissionFileList: Array<any> = [];
  public proofSubmissionPolicyNoList: Array<any> = [];
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public futureNewPolicyDeclaredAmount: string;
  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;
  public grandDeclarationTotalEditModal: number;
  public grandActualTotalEditModal: number;
  public grandRejectedTotalEditModal: number;
  public grandApprovedTotalEditModal: number;
  public grandTabStatus: boolean;
  public isCheckAll: boolean;
  public isDisabled: boolean;
  public enableSelectAll: boolean;
  public enableFileUpload: boolean;
  public documentRemark: any;
  public isECS = true;
  public hideCopytoActualDate = false;
  public shownewRow = false;
  public initialArray = true;
  public initialArrayIndex: number[] = [];
  public declarationService: DeclarationService;
  public displayUploadFile = false;
  public uploadedFiles: any[] = [];
  public viewTransactionDetail = true;
  public masterUploadFlag = true;
  public dateOfPaymentGlobal: Date;
  public actualAmountGlobal: Number;
  public dueDate: Date;
  public interestReceivedDate: Date;
  public date3: Date;
  public loaded = 0;
  public selectedFiles: FileList;
  public currentFileUpload: File;
  public filesArray: File[] = [];
  public masterfilesArray: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public minFormDate: Date;
  public maxFromDate: Date;
  public financialYearStart: Date;
  public employeeJoiningDate: Date;
  public windowScrolled: boolean;
  public addNewRowId: number;
  public declaredTotal: number;
  public declaredAmount: number;
  public actualTotal: number;
  public actualAmount: number;
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public isClear: boolean;
  public isCancel: boolean;
  public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date;
  public today = new Date();
  public transactionStatustList: any;
  public globalBank: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';
  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public selectedMasterId: string;
  public canEdit: boolean;
  EditDocumentRemark: any;
  editinterestOnSavingDeposit80TTMasterId: any;
  selectedFilter: any;
  public onHideSaveButton: boolean = false;
  
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  selectedremarkIndex : any;
  currentJoiningDate: Date;
  declarationData: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private interestOnTtbService: InterestOnTtbService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private numberFormat: NumberFormatPipe,

    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    // ---------------- Transaction status List -----------------
    this.refreshTransactionStatustList();

    this.grandTabStatus = false;
    this.isCheckAll = false;
    this.isDisabled = true;
    this.enableSelectAll = false;
    this.enableFileUpload = false;
    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
  }

  public ngOnInit(): void {
    // console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      console.log('in transaction::', this.data);
      const input = this.data;
      this.globalBank = input.bankName;
      this.getBankNameList();
      this.getTransactionFilterData(input.bankName);
      this.isDisabled = false;
      this.canEdit = input.canEdit;
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    this.deactiveCopytoActualDate();
    // Get API call for All previous employee Names
    this.Service.getpreviousEmployeName().subscribe((res) => {
      console.log('previousEmployeeList::', res);
      if (!res.data.results[0]) {
        return;
      }
      res.data.results.forEach((element) => {
        const obj = {
          label: element.name,
          value: element.previousEmployerId,
        };
        this.previousEmployeeList.push(obj);
      });
    });

    // Get All Previous Employer
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
        // console.log('employeeJoiningDate::',this.employeeJoiningDate);
      }
    });

    if (this.today.getMonth() + 1 <= 3) {
      this.financialYear =
        this.today.getFullYear() - 1 + '-' + this.today.getFullYear();
    } else {
      this.financialYear =
        this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    }

    const splitYear = this.financialYear.split('-', 2);

    this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);
  }

  updatePreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList[
      i
    ].previousEmployerId = event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList[i]
        .previousEmployerId
    );
  }
  // -----------on Page referesh transactionStatustList------------
  refreshTransactionStatustList() {
    this.transactionStatustList = [
      { label: 'All', value: 'All' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Send back', value: 'Send back' },
    ];
  }

  // ------- On declaration page get API call for All Institutions added into Master-------
  declarationPage() {
    this.getBankNameList();
    this.resetAll();
    this.selectedTransactionLenderName('All');
  }

  public getBankNameList() {
    const data = {
      label: 'All',
      value: 'All',
    };

    this.bankNameList.push(data);
    this.interestOnTtbService.get80TTBWithBankNameList().subscribe((res) => {
      console.log('getBankNameList', res);
      this.transactionBankNameList = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element,
          value: element,
        };
        this.bankNameList.push(obj);
      });
      this.selectedTransactionBankName(0);
    });
  }
  // --------- On bankName selection show all transactions list accordingly all banks--------
  selectedTransactionBankName(bankMasterId: number) {
    const selectedBank = this?.transactionBankNameList?.find(
      (item) => item?.interestOnSavingsDeposit80TTMasterId == bankMasterId
    );
    this.globalBank = selectedBank?.bankName;
    this.selectedMasterId = selectedBank?.interestOnSavingsDeposit80TTMasterId;
    this.getTransactionFilterData(this.globalBank);
    this.globalSelectedAmount = this.numberFormat.transform(0);

    // --------- On bankName selection show all transactions list accordingly all banks--------
    // selectedTransactionBankName(bankNames: any) {
    //   // console.log("event", event);
    // // this.selectedMasterId =
    // this.globalBank = bankNames;
    // this.getTransactionFilterData(this.globalBank);
    // this.globalSelectedAmount = this.numberFormat.transform(0);

    // this.transactionBankNameList.forEach((element) => {
    //   if (bankNames === element.bankName) {
    //     element.banks.forEach((item) => {
    //       const bankObj = {
    //         label: item,
    //         value: item,
    //       };
    //       this.bankNameList.push(bankObj);
    //     });
    //   }
    // });

    if (bankMasterId == 0) {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.interestOnTtbService
    .getAccountNo(bankMasterId)
    .subscribe((res) => {
      console.log('getTransactionFilterDataAccout No', res);
      res.data.results[0].forEach(element => {

        const obj = {
          label: element,
          value: element,
        };
        this.AccountlenderNameList.push(obj);
        console.log("AccountlenderNameList", this.AccountlenderNameList)

      });
   });

    this.resetAll();
  }

  // -------- On Policy selection show all transactions list accordingly all banks---------
  // selectedPolicy(policy: any) {
  //   this.globalPolicy = policy;
  //   this.getTransactionFilterData(this.globalBank);
  // }

 //----------- On change Transactional Line Item Remark --------------------------
 public onChangeDocumentRemark(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
  debugger
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[transIndex].remark =  event.target.value;
 

}


onSaveRemarkDetails(summary, index){
    
  const data ={
    "transactionId": this.summaryDetails.interestOnSavingDeposit80TTTransactionId,
    "masterId":0,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"80TTB",
    "remark":this.editRemarkData,
    "proofSubmissionId":this.summaryDetails.proofSubmissionId,
    "role":"Employee",
    "remarkType":"Transaction"

  };
  this.Service
  .postLicMasterRemark(data)
  .subscribe((res) => {
    if(res.status.code == "200") {
      
      console.log(this.transactionDetail);
      // this.electricVehicleLoanTransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
      this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
      this.alertService.sweetalertMasterSuccess(
        'Remark Saved Successfully.',
        '',
      );
       this.enteredRemark = '';
      this.modalRef.hide();


    } else{
      this.alertService.sweetalertWarning("Something Went Wrong");
    }
  });
}

onResetRemarkDetails() {
  this.enteredRemark = '';
}





  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    // this.getTransactionFilterData(
    //   this.globalInstitution
    // );
    this.interestOnTtbService.getAccountNoList(this.globalBank,policy).subscribe((res) => {
      console.log('getTransactionFilterData', res);

      this.transactionDetail =
      res.data.results[0].interestOnSavingDeposit80TTTransactionList;
    this.documentDetailList = res.data.results[0].documentInformation;

    this.transactionDetail.forEach(ele =>{
      this.documentDetailList.forEach(element =>{
        if(parseInt(ele.interestOnSavingDeposit80TTTransactionList[0].proofSubmissionId) == parseInt(element.proofSubmissionId)){
          element.bankName = ele.bankName;
          element.accountNumber = ele.accountNumber
        }
      })
    })
    this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
    this.grandActualTotal = res.data.results[0].grandActualTotal;
    this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
    this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
    res.documentDetailList.forEach(element => {
      // if(element!=null)
      this.documentArray.push({
        'dateofsubmission':element.creatonTime,
        'documentType':element.documentType,
        'documentName': element.fileName,
        'documentPassword':element.documentPassword,
        'documentRemark':element.documentRemark,
        'status' : element.status,
        'lastModifiedBy' : element.lastModifiedBy,
        'lastModifiedTime' : element.lastModifiedTime,

      })
    });
    console.log('documentArrayTest',this.documentArray);
    // this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].interestOnSavingDeposit80TTTransactionList.length;
    this.initialArrayIndex = [];
    this.transactionDetail.forEach((element) => {
      if (element.interestOnSavingDeposit80TTTransactionList !== null) {
        this.initialArrayIndex.push(
          element.interestOnSavingDeposit80TTTransactionList.length
        );
        element.interestOnSavingDeposit80TTTransactionList.forEach(
          (innerElement) => {
            if (innerElement.interestReceivedDate !== null) {
              innerElement.interestReceivedDate = new Date(
                innerElement.interestReceivedDate
              );
            }
            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount
            );
            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount
            );
          }
        );
      }
    });
    });

  }

  // --------- On institution selection show all transactions list accordingly all policies--------
selectedTransactionLenderName(bankName: any) {
  this.filesArray = [];
  this.selectedFilter = bankName;
  this.transactionDetail = [];
  this.AccountlenderNameList = [];
  this.globalBank = bankName;
  this.getTransactionFilterData(this.globalBank);
  this.globalSelectedAmount = this.numberFormat.transform(0);
  const data = {
    label: 'All',
    value: 'All',
  };

  // this.transactionPolicyList = [];
  // this.transactionPolicyList.push(data);

  this.transactionWithLenderName.forEach((element) => {
    if (bankName === element.lenderName) {
      element.policies.forEach((element) => {
        const policyObj = {
          label: element,
          value: element,
        };
        this.bankNameList.push(policyObj);
      });
    }
  });

  if (bankName == 'All') {
    this.grandTabStatus = true;
    this.isDisabled = true;
  } else {
    this.grandTabStatus = false;
    this.isDisabled = false;
  }
  this.resetAll();
  console.log('isdisabled: ', this.isDisabled);


   //Account No GEt by Lender Name
  //  getAccountNumberByName(){


    this.interestOnTtbService
    .getAccountNo(bankName)
    .subscribe((res) => {
      console.log('getTransactionFilterDataAccout No', res);
      res.data.results[0].forEach(element => {

        const obj = {
          label: element,
          value: element,
        };
        this.AccountlenderNameList.push(obj);
        console.log("AccountlenderNameList", this.AccountlenderNameList)

      });
  });
  // }
}

  // ------- On Transaction Status selection show all transactions list accordingly all banks------
  selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData(this.globalBank);
  }

  onMasterUpload(event: { target: { files: string | any[] } }) {
    // console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
        // this.masterFileName = file.name
        // this.masterFileType = file.type
        // this.masterFileStatus = file.status
      }
    }
    // console.log('this.masterfilesArray::', this.masterfilesArray);
  }


  // -------- ON select to check input boxex--------
  public onSelectCheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );

    let formatedActualAmount: number = 0;
    let formatedSelectedAmount: string;
    console.log(
      'in IS ECS::',
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .isECS
    );
    if (checked) {
      if (
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
          .isECS === 1
      ) {
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
          i
        ].actualAmount = data.declaredAmount;
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
          i
        ].interestReceivedDate = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
            i
          ].actualAmount
        );
        console.log(
          'in IS interestReceivedDate ::',
          this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
            i
          ].interestReceivedDate
        );
      } else {
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
          i
        ].actualAmount = data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.interestOnSavingDeposit80TTTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].interestReceivedDate = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.interestOnSavingDeposit80TTTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[
      j
    ].interestOnSavingDeposit80TTTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }
  // -------- ON select to check input boxex--------
  // public onSelectCheckBox(
  //   data: any,
  //   event: { target: { checked: any } },
  //   i: number,
  //   j: number
  // ) {
  //   const checked = event.target.checked;

  //   const formatedGlobalSelectedValue = Number(
  //     this.globalSelectedAmount == '0'
  //       ? this.globalSelectedAmount
  //       : this.globalSelectedAmount.toString().replace(/,/g, '')
  //   );

  //   let formatedActualAmount: number = 0;
  //   let formatedSelectedAmount: string;
  //   console.log(
  //     'in IS ECS::',
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
  //       .isECS
  //   );
  //   if (checked) {
  //     if (
  //       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
  //         .isECS === 1
  //     ) {
  //       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //         i
  //       ].actualAmount = data.declaredAmount;
  //       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //         i
  //       ].interestReceivedDate = new Date(data.dueDate);
  //       console.log(
  //         'in IS actualAmount::',
  //         this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //           i
  //         ].actualAmount
  //       );
  //       console.log(
  //         'in IS interestReceivedDate ::',
  //         this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //           i
  //         ].interestReceivedDate
  //       );
  //     } else {
  //       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //         i
  //       ].actualAmount = data.declaredAmount;
  //     }

  //     formatedActualAmount = Number(
  //       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //         i
  //       ].actualAmount
  //         .toString()
  //         .replace(/,/g, '')
  //     );
  //     formatedSelectedAmount = this.numberFormat.transform(
  //       formatedGlobalSelectedValue + formatedActualAmount
  //     );
  //     console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
  //     this.uploadGridData.push(data.interestOnSavingDeposit80TTTransactionId);

  //     // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
  //     // this.actualAmountGlobal = Number(data.declaredAmount);
  //   } else {
  //     formatedActualAmount = Number(
  //       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //         i
  //       ].actualAmount
  //         .toString()
  //         .replace(/,/g, '')
  //     );
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //       i
  //     ].actualAmount = this.numberFormat.transform(0);
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
  //       i
  //     ].interestReceivedDate = null;

  //     formatedSelectedAmount = this.numberFormat.transform(
  //       formatedGlobalSelectedValue - formatedActualAmount
  //     );
  //     // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
  //     const index = this.uploadGridData.indexOf(
  //       data.interestOnSavingDeposit80TTTransactionId
  //     );
  //     this.uploadGridData.splice(index, 1);
  //   }

  //   this.globalSelectedAmount = formatedSelectedAmount;
  //   console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
  //   this.actualTotal = 0;
  //   this.transactionDetail[
  //     j
  //   ].interestOnSavingDeposit80TTTransactionList.forEach((element) => {
  //     // console.log(element.actualAmount.toString().replace(',', ""));
  //     this.actualTotal += Number(
  //       element.actualAmount.toString().replace(/,/g, '')
  //     );
  //   });
  //   this.transactionDetail[j].actualTotal = this.actualTotal;

  //   if (this.uploadGridData.length) {
  //     this.enableFileUpload = true;
  //   }
  //   console.log(this.uploadGridData);
  //   console.log(this.uploadGridData.length);
  // }

  // -------- ON select to check input boxex--------
  public onSelectCheckBox1(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    const checked = event.target.checked;
    this.onHideSaveButton = checked;

    this.declarationData = data

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;

   

    if (checked) {
       this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList[i].actualAmount = data.actualAmount;
        formatedActualAmount = Number(
        this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList[i].actualAmount
          .toString().replace(/,/g, ''));
      formatedSelectedAmount = this.numberFormat.transform(formatedGlobalSelectedValue + formatedActualAmount);
      this.uploadGridData.push(data.interestOnSavingDeposit80TTTransactionId);
    } else {
      formatedActualAmount = Number(this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList[i].actualAmount = this.numberFormat.transform(0);

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.interestOnSavingDeposit80TTTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[
      j
    ].interestOnSavingDeposit80TTTransactionPreviousEmployerList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }

  // ------------ To Check / Uncheck All  Checkboxes-------------
  checkUncheckAll(item: any) {
    // console.log(this.isCheckAll);
    if (this.isCheckAll) {
      // console.log('CHECK ALL IS FALSE ');
      this.isCheckAll = false;
      this.enableSelectAll = false;
      this.enableCheckboxFlag2 = null;
      this.uploadGridData = [];
    } else {
      // console.log('CHECK ALL IS TRUE ');
      this.isCheckAll = true;
      this.enableSelectAll = true;
      this.enableCheckboxFlag2 = item.bankNames;
      item.interestOnSavingDeposit80TTTransactionList.forEach((element) => {
        this.uploadGridData.push(
          element.interestOnSavingDeposit80TTTransactionId
        );
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

   // ------------ To Check / Uncheck All  Checkboxes-------------
  //  checkUncheckAll(item: any) {
  //   // console.log(this.isCheckAll);
  //   if (this.isCheckAll) {
  //     // console.log('CHECK ALL IS FALSE ');
  //     this.isCheckAll = false;
  //     this.enableSelectAll = false;
  //     this.enableCheckboxFlag2 = null;
  //     this.uploadGridData = [];
  //   } else {
  //     // console.log('CHECK ALL IS TRUE ');
  //     this.isCheckAll = true;
  //     this.enableSelectAll = true;
  //     this.enableCheckboxFlag2 = item.bankNames;
  //     item.interestOnSavingDeposit80TTTransactionList.forEach((element) => {
  //       this.uploadGridData.push(
  //         element.interestOnSavingDeposit80TTTransactionId
  //       );
  //     });
  //     this.enableFileUpload = true;
  //   }
  //   // console.log('enableSelectAll...',  this.enableSelectAll);
  //   // console.log('uploadGridData...',  this.uploadGridData);
  // }


  // ------------ To Check / Uncheck All  Checkboxes Previous Emp-------------
  checkUncheckAllPreviousEmp(item: any) {
    // console.log(this.isCheckAll);
    if (this.isCheckAll) {
      // console.log('CHECK ALL IS FALSE ');
      this.isCheckAll = false;
      this.enableSelectAll = false;
      this.enableCheckboxFlag2 = null;
      this.uploadGridData = [];
    } else {
      // console.log('CHECK ALL IS TRUE ');
      this.isCheckAll = true;
      this.enableSelectAll = true;
      this.enableCheckboxFlag2 = item.lenderName;
      item.interestOnSavingDeposit80TTTransactionPreviousEmployerList.forEach(
        (element) => {
          this.uploadGridData.push(element.interestOnSavingDeposit80TTTransactionId);
        }
      );
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // --------------- ON change of declared Amount in line-------------
  onDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: any;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .declaredAmount
    );
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;
    this.declaredTotal = 0;
    this.transactionDetail[
      j
    ].interestOnSavingDeposit80TTTransactionList.forEach((element) => {
      this.declaredTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].declaredTotal = this.declaredTotal;
  }

  // ------------ ON change of DueDate in line----------
  onDueDateChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].dueDate = summary.dueDate;
  }

  // ------------Actual Amount change main Page-----------
  onActualAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: any;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .actualAmount
    );
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].actualAmount = formatedActualAmount;
    if (
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .actualAmount !== Number(0) ||
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .actualAmount !== null
    ) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
    this.actualTotal = 0;
    this.actualAmount = 0;
    this.transactionDetail[
      j
    ].interestOnSavingDeposit80TTTransactionList.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;
  }

  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   interestReceivedDate : Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  // addRowInList(
  //   summarynew: {
  //     interestOnSavingDeposit80TTTransactionId: number;
  //     previousEmployerId: number;
  //     declaredAmount: any;
  //     interestReceivedDate: Date;
  //     actualAmount: any;
  //   },

  //   j: number
  // ) {
  //   this.declarationService = new DeclarationService(summarynew);
  //   // this.globalAddRowIndex -= 1;
  //   console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
  //   this.shownewRow = true;
  //   this.declarationService.interestOnSavingDeposit80TTTransactionId = 0;
  //   this.declarationService.declaredAmount = null;
  //   this.declarationService.actualAmount = null;
  //   this.declarationService.interestReceivedDate = null;
  //   this.declarationService.transactionStatus = 'Pending';
  //   this.declarationService.amountRejected = 0.0;
  //   this.declarationService.amountApproved = 0.0;
  //   if (
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList ==
  //     null
  //   ) {
  //     this.declarationService.interestOnSavingDeposit80TTMasterId = this.selectedMasterId;
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList = [];
  //   }
  //   this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList.push(
  //     this.declarationService
  //   );
  //   console.log(
  //     'addRow::',
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList
  //   );
  // }

  addRowInList(
    summarynew: {
      interestOnSavingDeposit80TTTransactionId: number;
      previousEmployerId: number;
      declaredAmount: any;
      interestReceivedDate: Date;
      actualAmount: any;
    },

    j: number
  ) {
    this.declarationService = new DeclarationService(summarynew);
    // this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.interestOnSavingDeposit80TTTransactionId = 0;
    this.declarationService.declaredAmount = null;
    this.declarationService.actualAmount = null;
    this.declarationService.interestReceivedDate = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;
    if (
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList ==
      null
    ) {
      this.declarationService.interestOnSavingDeposit80TTMasterId = this.selectedMasterId;
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList = [];
    }
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList.push(
      this.declarationService
    );
    console.log(
      'addRow::',
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList
    );
  }
  addRowInList1(
    summarynew: {
      interestOnSavingDeposit80TTTransactionId: number;
      previousEmployerId: number;
      // declaredAmount: any;
      // interestReceivedDate: Date;
      actualAmount: any;
    },

    j: number
  ) {
    this.declarationService = new DeclarationService(summarynew);
    // this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.interestOnSavingDeposit80TTTransactionId = this.globalAddRowIndex;
    // this.declarationService.declaredAmount = null;
    this.declarationService.actualAmount = null;
    // this.declarationService.interestReceivedDate = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;
    // if (
    //   this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList ==
    //   null
    // ) {
    //   this.declarationService.interestOnSavingDeposit80TTMasterId = this.selectedMasterId;
    //   this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList = [];
    // }
    // this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList.push(
    //   this.declarationService
    // );
    this.transactionDetail[
      j
    ].interestOnSavingDeposit80TTTransactionPreviousEmployerList.push(
      this.declarationService
    );
    console.log(
      'addRow::',
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList
    );
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  // deleteRow(j: number) {
  //   const rowCount =
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList
  //       .length - 1;
    
  //   if (
  //     this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList
  //       .length == 1
  //   ) {
  //     return false;
  //   } else if (this.initialArrayIndex[j] <= rowCount) {
  //     this.transactionDetail[
  //       j
  //     ].interestOnSavingDeposit80TTTransactionList.splice(rowCount, 1);
  //     return true;
  //   }
  // }


  // -------- Delete Row--------------
deleteRow(j: number) {
  const rowCount =
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList
      .length - 1;
  // console.log('rowcount::', rowCount);
  // console.log('initialArrayIndex::', this.initialArrayIndex);
  if (
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList
      .length == 1
  ) {
    return false;
  } else if (this.initialArrayIndex[j] <= rowCount) {
    this.transactionDetail[
      j
    ].interestOnSavingDeposit80TTTransactionList.splice(rowCount, 1);
    return true;
  }
}
  deleteRow1(j: number) {
    const rowCount =
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList
        .length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionPreviousEmployerList
        .length == 1
    ) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[
        j
      ].interestOnSavingDeposit80TTTransactionPreviousEmployerList.splice(rowCount, 1);
      return true;
    }
  }

  editDeclrationRow(
    summary: {
      previousEmployerName: any;
      declaredAmount: any;
      interestReceivedDate: any;
      dueDate: any;
      actualAmount: any;
    },
    i: any,
    j: any
  ) {
    this.declarationService = new DeclarationService(summary);
  }

  updateDeclrationRow(i: string | number, j: string | number) {
    // tslint:disable-next-line: max-line-length
    this.transactionDetail[j].actualTotal +=
      this.declarationService.actualAmount -
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .actualAmount;
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ] = this.declarationService;
    this.declarationService = new DeclarationService();
  }

  SaveDeclrationRow(j) {
    if (!this.declarationService) {
      return;
    }
    this.transactionDetail[
      j
    ].declaredTotal += this.declarationService.declaredAmount;
    this.transactionDetail[
      j
    ].actualTotal += this.declarationService.actualAmount;
    this.grandActualTotal += this.declarationService.actualAmount;
    this.grandDeclarationTotal += this.declarationService.declaredAmount;
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.interestOnSavingDeposit80TTTransactionList.forEach((element) => {
        element.interestReceivedDate = this.datePipe.transform(
          element.interestReceivedDate,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.transactionDetail;

    this.interestOnTtbService.post80TTBTransaction(data).subscribe((res) => {
      console.log(res);
      this.transactionDetail =
        res.data.results[0].interestOnSavingDeposit80TTTransactionList;
      this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      this.transactionDetail.forEach((element) => {
        element.interestOnSavingDeposit80TTTransactionList.forEach(
          (element) => {
            element.interestReceivedDate = new Date(
              element.interestReceivedDate
            );
          }
        );
      });
    });
    this.resetAll();
  }

  // Reset All
  resetAll() {
    this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
    this.uploadGridData = [];
    this.enableCheckboxFlag3 = false;
    this.enableCheckboxFlag2 = null;
    this.declarationService = new DeclarationService();
  }

  ///// --------------------------------rahul-------------

  UploadFilePopUp() {
    this.displayUploadFile = true;
  }

  onUpload(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.filesArray.push(file);
      }
    }
    console.log(this.filesArray);
  }

  onUploadInEditCase(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editfilesArray.push(file);
      }
    }
    console.log(this.editfilesArray);
  }

  removeDocument() {
    this.currentFileUpload = null;
  }

  // Remove Selected LicTransaction Document
  removeSelectedSukanyaSamridhhiTransactionDocument(index: number) {
    this.filesArray.splice(index, 1);
    console.log('this.filesArray::', this.filesArray);
    console.log('this.filesArray.size::', this.filesArray.length);
  }
  

  upload() {
    for (let i = 0; i < this.filesArray.length; i++) {
      if(this.remarkList[i] != undefined || this.remarkList[i] == undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.remarkList[i] ? this.remarkList[i] : '',
          "password": this.documentPassword[i] ? this.documentPassword[i] : ''
        };
        this.documentDataArray.push(remarksPasswordsDto);
      }
    }

    console.log('testtttttt', this.documentDataArray);
    // if (this.filesArray.length === 0) {
    //   this.alertService.sweetalertError(
    //     'Please attach Premium Receipt / Premium Statement.'
    //   );
    //   return;
    // }

    // console.log('this.transactionDetail::', this.transactionDetail);
    this.transactionDetail.forEach((element) => {
      // if (element.interestOnSavingDeposit80TTTransactionList !== null) {
        element.interestOnSavingDeposit80TTTransactionList.forEach(
          (innerElement) => {
            if (innerElement.declaredAmount !== null) {
              innerElement.declaredAmount = innerElement.declaredAmount
                .toString()
                .replace(/,/g, '');
            } else {
              innerElement.declaredAmount = 0.0;
            }
            if (innerElement.actualAmount !== null) {
              innerElement.actualAmount = innerElement.actualAmount
                .toString()
                .replace(/,/g, '');
            } else {
              innerElement.actualAmount = 0.0;
            }

            const dateOfPaymnet = this.datePipe.transform(
              innerElement.interestReceivedDate,
              'yyyy-MM-dd'
            );
            // const dueDate = this.datePipe.transform(
            //   innerElement.dueDate,
            //   'yyyy-MM-dd'
            // );

            innerElement.interestReceivedDate = dateOfPaymnet;
            // innerElement.dueDate = dueDate;
          }
        );
      // }
      //  //previous emp table number format
       if (element.interestOnSavingDeposit80TTTransactionPreviousEmployerList !== null) {
        element.interestOnSavingDeposit80TTTransactionPreviousEmployerList.forEach(
          (innerElement) => {
            if (
              innerElement.actualAmount !== undefined ||
              innerElement.actualAmount !== null
            ) {
              innerElement.actualAmount = innerElement.actualAmount
                .toString()
                .replace(/,/g, '');
            } else {
              innerElement.actualAmount = 0.0;
            }
            // if (
            //   innerElement.declaredAmount !== undefined ||
            //   innerElement.declaredAmount !== null
            // ) {
            //   innerElement.declaredAmount = innerElement.declaredAmount
            //     .toString()
            //     .replace(/,/g, '');
            // } else {
            //   innerElement.declaredAmount = 0.0;
            // }
            innerElement.declaredAmount = 0.0;

          }
        );
      }
    });

    // const data =   this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList;
    console.log('transactionDetail::', this.transactionDetail);
    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');

    const ttaPost = [{
           interestOnSavingDeposit80TTTransactionList: this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList,
           interestOnSavingDeposit80TTTransactionPreviousEmployerList: this.transactionDetail[0].interestOnSavingDeposit80TTTransactionPreviousEmployerList,
           interestOnSavingDeposit80TTMasterId: this.transactionDetail[0].interestOnSavingDeposit80TTMasterId
    }];

    const data = {
      transactionIds: this.uploadGridData,
      interestOnSavingDeposit80TTTransactionWithDocumentList: ttaPost,
      receiptAmount: this.receiptAmount,
      receiptNumber: '',
      receiptDate: '',
      proofSubmissionId: '',
      documentRemark: '',
      remarkPasswordList: this.documentDataArray,
    };


    this.interestOnTtbService
      .upload80TTBTransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.masterGridData.forEach((element, index) => {
            this.documentArray.push({

              'dateofsubmission':new Date(),
              'documentType':element.documentInformationList[0].documentType,
              'documentName': element.documentInformationList[0].fileName,
              'documentPassword':element.documentInformationList[0].documentPassword,
              'documentRemark':element.documentInformationList[0].documentRemark,
              'status' : element.documentInformationList[0].status,
              'approverName' : element.documentInformationList[0].lastModifiedBy,
              'Time' : element.documentInformationList[0].lastModifiedTime,

              // 'documentStatus' : this.premiumFileStatus,

            });

            if(element.documentInformationList[1]) {
              this.documentArray.push({

                'dateofsubmission':new Date(),
                'documentType':element.documentInformationList[1].documentType,
                'documentName': element.documentInformationList[1].fileName,
                'documentPassword':element.documentInformationList[1].documentPassword,
                'documentRemark':element.documentInformationList[1].documentRemark,
                'status' : element.documentInformationList[1].status,
                'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                // 'documentStatus' : this.premiumFileStatus,

              });
            }
          });
          // this.transactionDetail =
          //   res.data.results[0].interestOnSavingDeposit80TTTransactionList;
          // this.documentDetailList = res.data.results[0].documentInformation;
          // this.grandDeclarationTotal =
          //   res.data.results[0].grandDeclarationTotal;
          // this.grandActualTotal = res.data.results[0].grandActualTotal;
          // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
          // this.transactionDetail.forEach((element) => {
          //   element.interestOnSavingDeposit80TTTransactionList.forEach(
          //     (innerElement) => {
          //       if (innerElement.interestReceivedDate !== null) {
          //         innerElement.interestReceivedDate = new Date(
          //           innerElement.interestReceivedDate
          //         );
          //       }
          //       if (this.employeeJoiningDate < innerElement.dueDate) {
          //         innerElement.active = false;
          //       }
          //       innerElement.declaredAmount = this.numberFormat.transform(
          //         innerElement.declaredAmount
          //       );
          //       innerElement.actualAmount = this.numberFormat.transform(
          //         innerElement.actualAmount
          //       );
          //       // console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
          //     }
          //   );
          // });
          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.interestOnSavingDeposit80TTTransactionList.length
            );

            element.interestOnSavingDeposit80TTTransactionList.forEach(
              (item) => {
                item.declaredAmount = this.numberFormat.transform(
                  item.declaredAmount
                );
                item.actualAmount = this.numberFormat.transform(
                  item.actualAmount
                );
              }
            );

            this.initialArrayIndex.push(
              element.interestOnSavingDeposit80TTTransactionPreviousEmployerList.length
            );

            element.interestOnSavingDeposit80TTTransactionPreviousEmployerList.forEach(
              (innerElement) => {
                // innerElement.declaredAmount = this.numberFormat.transform(
                //   innerElement.declaredAmount
                // );
                innerElement.actualAmount = this.numberFormat.transform(
                  innerElement.actualAmount
                );
              }
            );
          });
          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );
           this.selectedTransactionLenderName(this.selectedFilter);
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.receiptAmount = '0.00';
    this.filesArray = [];
    this.globalSelectedAmount = '0.00';
    this.documentRemark = '';
    this.remarkList = [];
    this.documentPassword = [];
    this.documentDataArray = [];
    this.selectedTransactionLenderName(this.selectedFilter);
  }
  // upload() {
  //   debugger
  //       for (let i = 0; i < this.filesArray.length; i++) {
  //         if(this.documentPassword[i] != undefined || this.documentPassword[i] == undefined){
  //           let remarksPasswordsDto = {};
  //           remarksPasswordsDto = {
  //             "documentType": "Back Statement/ Premium Reciept",
  //             "documentSubType": "",
  //             "remark": this.remarkList[i] ? this.remarkList[i] : '',
  //             "password": this.documentPassword[i] ? this.documentPassword[i] : ''
  //           };
  //           this.documentDataArray.push(remarksPasswordsDto);
  //         }
  //       }
    
  //       console.log('testtttttt', this.documentDataArray);
    
  //       this.transactionDetail.forEach((element) => {
  //         //current emp table number format
  //         element.interestOnSavingDeposit80TTTransactionList.forEach((item) => {
          
  //           if (item.declaredAmount !== null) {
  //             item.declaredAmount = item.declaredAmount
  //               .toString()
  //               .replace(/,/g, '');
  //           } else {
  //             item.declaredAmount = 0.0;
  //           }
  //           if (item.actualAmount !== null) {
  //             item.actualAmount = item.actualAmount
  //               .toString()
  //               .replace(/,/g, '');
  //           } else {
  //             item.actualAmount = 0.0;
  //           }
    
  //         });
  //   debugger
  //         //previous emp table number format
  //         if (element.interestOnSavingDeposit80TTTransactionPreviousEmployerList !== null) {
  //           element.interestOnSavingDeposit80TTTransactionPreviousEmployerList.forEach(
  //             (innerElement) => {
  //               if (
  //                 innerElement.actualAmount !== undefined ||
  //                 innerElement.actualAmount !== null
  //               ) {
  //                 innerElement.actualAmount = innerElement.actualAmount
  //                   .toString()
  //                   .replace(/,/g, '');
  //               } else {
  //                 innerElement.actualAmount = 0.0;
  //               }
  //               // if (
  //               //   innerElement.declaredAmount !== undefined ||
  //               //   innerElement.declaredAmount !== null
  //               // ) {
  //               //   innerElement.declaredAmount = innerElement.declaredAmount
  //               //     .toString()
  //               //     .replace(/,/g, '');
  //               // } else {
  //               //   innerElement.declaredAmount = 0.0;
  //               // }
  //               innerElement.declaredAmount = 0.0;
    
  //             }
  //           );
  //         }
  //       });
    
    
  //       // let numberValue = Number(actualAmount);
  //       console.log((this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[0].actualAmount));
    
  //       if(this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[0].actualAmount == 0 && this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[0].declaredAmount == '0.00'){
    
  //         if(this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList.length == 0 || this.transactionDetail[0].interestOnSavingDeposit80TTTransactionPreviousEmployerList.length == 0)
  //           {
  //             this.alertService.sweetalertError(
  //               'Please enter value.'
  //             );
  //             return;
  //           }
  //         }
    
  //       if(this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[0].actualAmount > 0 && this.filesArray.length === 0){
  //        this.alertService.sweetalertError(
  //           'Please attach Premium Receipt / Premium Statement.'
  //         );
  //         return;
  //        }
  //        if(this.transactionDetail[0].interestOnSavingDeposit80TTTransactionPreviousEmployerList.length > 0 && this.filesArray.length == 0){
  //         this.alertService.sweetalertError(
  //           'Please attach Premium Receipt / Premium Statement.'
  //         );
  //         return;
    
  //        }
  //       console.log('this.transactionDetail::', this.transactionDetail);
    
  //       // console.log("JSON data", this.declarationData);
    
  //       console.log(JSON.stringify(this.declarationData))
    
    
    
  //       this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
  //       const data = {
  //         interestOnSavingDeposit80TTTransactionList: this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList,
  //         interestOnSavingDeposit80TTTransactionPreviousEmployerList: this.transactionDetail[0].interestOnSavingDeposit80TTTransactionPreviousEmployerList,
  //         // electricVehicleLoanTransactionIds: this.uploadGridData,
  //         receiptAmount: this.receiptAmount,
  //         proofSubmissionId: this.transactionDetail[0].proofSubmissionId,
  //         electricVehicleLoanMasterId: this.transactionDetail[0].electricVehicleLoanMasterId,
  //         remarkPasswordList: this.documentDataArray
  //         // transactionIds: this.uploadGridData,
 
  //       };
  //       console.log('data::', data);
  //       debugger
        
  //     this.interestOnTtbService
  //         .upload80TTBTransactionwithDocument(this.filesArray, data)
      
  //         .subscribe((res) => {
  //           console.log(res);
  //           if (res.data.results.length > 0) {
  //             debugger
  //             this.transactionDetail =
  //               res.data.results[0].interestOnSavingDeposit80TTTransactionList;
  //             // res.data.results[0].electricVehicleLoanTransactionList;
  //             this.documentDetailList =
  //               res.data.results[0].documentInformation;
  //             this.grandDeclarationTotal =
  //               res.data.results[0].grandDeclarationTotal;
  //             this.grandActualTotal = res.data.results[0].grandActualTotal;
  //             this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
  //             this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
    
  //             this.masterGridData.forEach((element, index) => {
  //               this.documentArray.push({
    
  //                 'dateofsubmission':new Date(),
  //                 'documentType':element.documentInformationList[0].documentType,
  //                 'documentName': element.documentInformationList[0].fileName,
  //                 'documentPassword':element.documentInformationList[0].documentPassword,
  //                 'documentRemark':element.documentInformationList[0].documentRemark,
  //                 'status' : element.documentInformationList[0].status,
  //                 'approverName' : element.documentInformationList[0].lastModifiedBy,
  //                 'Time' : element.documentInformationList[0].lastModifiedTime,
    
  //                 // 'documentStatus' : this.premiumFileStatus,
    
  //               });
    
  //               if(element.documentInformationList[1]) {
  //                 this.documentArray.push({
    
  //                   'dateofsubmission':new Date(),
  //                   'documentType':element.documentInformationList[1].documentType,
  //                   'documentName': element.documentInformationList[1].fileName,
  //                   'documentPassword':element.documentInformationList[1].documentPassword,
  //                   'documentRemark':element.documentInformationList[1].documentRemark,
  //                   'status' : element.documentInformationList[1].status,
  //                   'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
  //                   'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,
    
  //                   // 'documentStatus' : this.premiumFileStatus,
    
  //                 });
  //               }
  //             });
    
  //             this.initialArrayIndex = [];
    
  //             this.transactionDetail.forEach((element) => {
  //               this.initialArrayIndex.push(
  //                 element.interestOnSavingDeposit80TTTransactionList.length
  //               );
    
  //               element.interestOnSavingDeposit80TTTransactionList.forEach(
  //                 (item) => {
  //                   item.declaredAmount = this.numberFormat.transform(
  //                     item.declaredAmount
  //                   );
  //                   item.actualAmount = this.numberFormat.transform(
  //                     item.actualAmount
  //                   );
  //                 }
  //               );
    
  //               this.initialArrayIndex.push(
  //                 element.interestOnSavingDeposit80TTTransactionPreviousEmployerList.length
  //               );
    
  //               element.interestOnSavingDeposit80TTTransactionPreviousEmployerList.forEach(
  //                 (innerElement) => {
  //                   // innerElement.declaredAmount = this.numberFormat.transform(
  //                   //   innerElement.declaredAmount
  //                   // );
  //                   innerElement.actualAmount = this.numberFormat.transform(
  //                     innerElement.actualAmount
  //                   );
  //                 }
  //               );
  //             });
  //             this.alertService.sweetalertMasterSuccess(
  //               'Transaction Saved Successfully.',
  //               ''
  //             );
  //             this.selectedTransactionLenderName(this.selectedFilter);
  //           } else {
  //             this.alertService.sweetalertWarning(res.status.messsage);
  //           }
  //         });
  //       this.receiptAmount = '0.00';
  //       this.filesArray = [];
  //       this.globalSelectedAmount = '0.00';
  //       this.selectedTransactionLenderName(this.selectedFilter);
  //     }
  changeReceiptAmountFormat() {
    let receiptAmount_: number;
    let globalSelectedAmount_: number;

    receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
    globalSelectedAmount_ = parseFloat(
      this.globalSelectedAmount.replace(/,/g, '')
    );

    console.log(receiptAmount_);
    console.log(globalSelectedAmount_);
    if (receiptAmount_ < globalSelectedAmount_) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines.'
      );
    } else if (receiptAmount_ > globalSelectedAmount_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmount_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount.'
      );
    }
    this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
  }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[i].previousEmployerId = event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].previousEmployerId
    );
  }


  // --------------- ON change of declared Amount Edit Modal-------------
  onDeclaredAmountChangeInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: any;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onDeclaredAmountChangeInEditCase Amount change::' +
        summary.declaredAmount
    );

    this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declaredTotal = 0;

    this.editTransactionUpload[
      j
    ].interestOnSavingDeposit80TTTransactionList.forEach((element) => {
      console.log(
        'declaredAmount::',
        element.declaredAmount.toString().replace(/,/g, '')
      );
      this.declaredTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // console.log(this.declaredTotal);
    });

    this.editTransactionUpload[j].declaredTotal = this.declaredTotal;
    console.log(
      'DeclarATION total==>>' + this.editTransactionUpload[j].declaredTotal
    );
  }
  // ---- Set Date of Payment On Edit Modal----
  setDateOfPaymentInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: number;
    },
    i: number,
    j: number
  ) {
    this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].interestReceivedDate = summary.interestReceivedDate;
    console.log(
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].interestReceivedDate
    );
  }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: number;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onActualAmountChangeInEditCaseActual Amount change::',
      summary
    );

    this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].actualAmount
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].actualAmount !== Number(0) ||
      this.editTransactionUpload[j].interestOnSavingDeposit80TTTransactionList[
        i
      ].actualAmount !== null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j]
          .interestOnSavingDeposit80TTTransactionList[i].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j]
          .interestOnSavingDeposit80TTTransactionList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[
      j
    ].interestOnSavingDeposit80TTTransactionList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  UploadedDocumentModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  UploadedDocumentModal1(template1: TemplateRef<any>, documentIndex: number) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.proofSubmissionFileList = this.documentDetailList[
      documentIndex
    ].documentDetailList;
  }

  deactiveCopytoActualDate() {
    if (this.isECS === false) {
      this.hideCopytoActualDate = true;
    } else {
      this.hideCopytoActualDate = false;
    }
  }
  copytoActualDate(dueDate: Date, j: number, i: number, item: any) {
    dueDate = new Date(dueDate);
    // item.interestOnSavingDeposit80TTTransactionList.interestReceivedDate  = dueDate;
    this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[
      i
    ].interestReceivedDate = dueDate;
    this.declarationService.interestReceivedDate = this.transactionDetail[0].interestOnSavingDeposit80TTTransactionList[
      i
    ].interestReceivedDate;
    // this.interestReceivedDate  = dueDate;
    alert('hiiii');
    console.log(
      'Date OF PAyment' + this.declarationService.interestReceivedDate
    );
  }

  // Remove Selected LicTransaction Document Edit Maodal
  removeSelectedSukanyaSamridhiTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
  }

  // When Edit of Document Details
  editViewTransaction(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    this.documentRemark = '';
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.interestOnTtbService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        //this.documentRemark =res.data.results[0].documentInformation[0].documentRemark;
        this.urlArray = res?.data?.results[0]?.documentInformation[0]?.documentDetailList;
        this.editTransactionUpload = res?.data?.results[0]?.interestOnSavingDeposit80TTTransactionList;
        this.editinterestOnSavingDeposit80TTMasterId = res?.data?.results[0]?.interestOnSavingDeposit80TTTransactionList[0]?.interestOnSavingDeposit80TTMasterId;
        this.editProofSubmissionId = res?.data?.results[0]?.documentInformation[0]?.proofSubmissionId;
      //  this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.editReceiptAmount = res?.data?.results[0]?.receiptAmount;
        this.editReceiptNumber = res?.data?.results[0]?.receiptNumber;
        this.editDocumentRemark = res?.data?.results[0]?.documentRemark;
        this.grandDeclarationTotalEditModal = res?.data?.results[0]?.grandDeclarationTotal;
        this.grandActualTotalEditModal = res?.data?.results[0]?.grandActualTotal;
        this.grandRejectedTotalEditModal =
          res?.data?.results[0]?.grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res?.data?.results[0]?.grandApprovedTotal;

          this.editTransactionUpload.forEach((element) => {
            element.interestOnSavingDeposit80TTTransactionList.forEach((innerElement) => {
              innerElement.declaredAmount = this.numberFormat.transform(
                innerElement.declaredAmount,
              );
              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount,
              );
            });
          });
          this.masterGridData.forEach((element) => {
            element.documentInformation.forEach(element => {
          element.documentDetailList.forEach(element => {
            // if(element!=null)
            this.documentArray.push({
              'dateofsubmission': element.dateOfSubmission,
              'documentType':element.documentType,
              'documentName': element.fileName,
              'documentPassword':element.documentPassword,
              'documentRemark':element.documentRemark,
              'status' : element.status,
              'lastModifiedBy' : element.lastModifiedBy,
              'lastModifiedTime' : element.lastModifiedTime,
            })
            })
      });
    });
  }
);
// this.documentArray = [];

      // });
  }
  public docViewer1(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;
    // this.urlIndex = 0;
    this.viewDocumentName = data.documentName;
    this.viewDocumentType = data.documentType

    console.log('urlIndex::' , this.urlIndex);
    console.log('urlArray::', this.urlArray);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

    // --Remove Selected LicTransaction Document in Main Page----
    removeSelectedLicTransactionDocument(index: number) {
      this.filesArray.splice(index, 1);
      console.log('this.filesArray::', this.filesArray);
      console.log('this.filesArray.size::', this.filesArray.length);
    }



  // Common Function for filter to call API
  getTransactionFilterData(bankName: String) {
    // this.Service.getTransactionInstName(data).subscribe(res => {

    this?.interestOnTtbService?.getTransactionFilterData(bankName)?.subscribe((res) => {
        console.log('getTransactionFilterData', res);
        this.transactionDetail =
          res?.data?.results[0]?.interestOnSavingDeposit80TTTransactionList;
        this.documentDetailList = res?.data?.results[0]?.documentInformation;

        this?.transactionDetail?.forEach(ele =>{
          this?.documentDetailList?.forEach(element =>{
            if(parseInt(ele.interestOnSavingDeposit80TTTransactionList[0]?.proofSubmissionId) == parseInt(element.proofSubmissionId)){
              element.bankName = ele?.bankName;
              element.accountNumber = ele?.accountNumber
            }
          })
        })

        this.grandDeclarationTotal = res?.data?.results[0]?.grandDeclarationTotal;
        this.grandActualTotal = res?.data?.results[0]?.grandActualTotal;
        this.grandRejectedTotal = res?.data?.results[0]?.grandRejectedTotal;
        this.grandApprovedTotal = res?.data?.results[0]?.grandApprovedTotal;

        console.log('documentArrayTest',this.documentArray);
        // this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].interestOnSavingDeposit80TTTransactionList.length;
        this.initialArrayIndex = [];
        this?.transactionDetail?.forEach((element) => {
          if (element.interestOnSavingDeposit80TTTransactionList !== null) {
            this.initialArrayIndex.push(
              element.interestOnSavingDeposit80TTTransactionList.length
            );
            element.interestOnSavingDeposit80TTTransactionList.forEach(
              (innerElement) => {
                if (innerElement.interestReceivedDate !== null) {
                  innerElement.interestReceivedDate = new Date(
                    innerElement.interestReceivedDate
                  );
                }
                innerElement.declaredAmount = this.numberFormat.transform(
                  innerElement.declaredAmount
                );
                innerElement.actualAmount = this.numberFormat.transform(
                  innerElement.actualAmount
                );
              }
            );
          }
        });
        res?.documentDetailList?.forEach(element => {
          // if(element!=null)
          this?.documentArray?.push({
            'dateofsubmission':element.creatonTime,
            'documentType':element.documentType,
            'documentName': element.fileName,
            'documentPassword':element.documentPassword,
            'documentRemark':element.documentRemark,
            'status' : element.status,
            'lastModifiedBy' : element.lastModifiedBy,
            'lastModifiedTime' : element.lastModifiedTime,

          })
        });
      });
  }

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    interestOnSavingDeposit80TTTransactionId,
    summary, count
  ) {
  
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.interestOnTtbService.getinterestonsavingdeposit80TTBTransactionRemarkList(
      interestOnSavingDeposit80TTTransactionId,
    ).subscribe((res) => {
      console.log('docremark', res);
      this.documentRemarkList  = res.data.results[0];
      this.remarkCount = res.data.results[0].length;
    });
    // console.log('documentDetail::', documentRemarkList);
    // this.documentRemarkList = this.selectedRemarkList;
    console.log('this.documentRemarkList', this.documentRemarkList);
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }


  public uploadUpdateTransaction() {
    for (let i = 0; i < this.editremarkList.length; i++) {
      if(this.editremarkList[i] != undefined || this.editremarkList[i] == undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.editremarkList[i],
          "password": this.editdocumentPassword[i]
        };
        this.editdDocumentDataArray.push(remarksPasswordsDto);
      }
    }

    console.log(
      'uploadUpdateTransaction editTransactionUpload::',
      this.editTransactionUpload
    );

    this.editTransactionUpload.forEach((element) => {
      element.interestOnSavingDeposit80TTTransactionList.forEach(
        (innerElement) => {
          if (innerElement.declaredAmount !== null) {
            innerElement.declaredAmount = innerElement.declaredAmount
              .toString()
              .replace(/,/g, '');
          } else {
            innerElement.declaredAmount = 0.0;
          }
          if (innerElement.actualAmount !== null) {
            innerElement.actualAmount = innerElement.actualAmount
              .toString()
              .replace(/,/g, '');
          } else {
            innerElement.actualAmount = 0.0;
          }

          const dateOfPaymnet = this.datePipe.transform(
            innerElement.interestReceivedDate,
            'yyyy-MM-dd'
          );


          innerElement.interestReceivedDate = dateOfPaymnet;
          this.uploadGridData.push(innerElement.interestOnSavingDeposit80TTTransactionId
          );
        }
      );
    });
    this.editTransactionUpload.forEach((element) => {
      element.interestOnSavingDeposit80TTTransactionList.forEach(
        (innerElement) => {
          const dateOfPaymnet = this.datePipe.transform(
            innerElement.interestReceivedDate,
            'yyyy-MM-dd'
          );
          innerElement.interestReceivedDate = dateOfPaymnet;
        }
      );
    });

       const ttaPost = [{
       interestOnSavingDeposit80TTTransactionList: this.editTransactionUpload[0].interestOnSavingDeposit80TTTransactionList,
        interestOnSavingDeposit80TTMasterId: this.editTransactionUpload[0].interestOnSavingDeposit80TTMasterId
        }];

        // const ttaPost = [{
        //   interestOnSavingDeposit80TTTransactionList: this.editTransactionUpload,
        //    interestOnSavingDeposit80TTMasterId: this.editTransactionUpload[0].interestOnSavingDeposit80TTMasterId
        //    }];

        const data = {
        transactionIds: this.uploadGridData,
        interestOnSavingDeposit80TTTransactionWithDocumentList: ttaPost,
        // receiptAmount: this.receiptAmount,
        // receiptNumber: '',
        // receiptDate: '',
        // proofSubmissionId: '',
        // documentRemark: '',

        proofSubmissionId: this.editProofSubmissionId,
        receiptAmount: this.editReceiptAmount,
        receiptNumber: this.editReceiptNumber,
        documentRemark:this.editDocumentRemark,
        remarkPasswordList: this.editdDocumentDataArray
        };



    console.log('uploadUpdateTransaction data::', data);

    this.interestOnTtbService
      .upload80TTBTransactionwithDocument(this.editfilesArray, data)
      .subscribe((res) => {
        console.log('uploadUpdateTransaction::', res);
        if (res.data.results.length > 0) {
          this.editremarkList = [];
          this.editdocumentPassword = [];
          this.editfilesArray = [];
          this.masterGridData.forEach((element, index) => {
            this.documentArray.push({

              'dateofsubmission':new Date(),
              'documentType':element.documentInformationList[0].documentType,
              'documentName': element.documentInformationList[0].fileName,
              'documentPassword':element.documentInformationList[0].documentPassword,
              'documentRemark':element.documentInformationList[0].documentRemark,
              'status' : element.documentInformationList[0].status,
              'approverName' : element.documentInformationList[0].lastModifiedBy,
              'Time' : element.documentInformationList[0].lastModifiedTime,

              // 'documentStatus' : this.premiumFileStatus,

            });

            if(element.documentInformationList[1]) {
              this.documentArray.push({

                'dateofsubmission':new Date(),
                'documentType':element.documentInformationList[1].documentType,
                'documentName': element.documentInformationList[1].fileName,
                'documentPassword':element.documentInformationList[1].documentPassword,
                'documentRemark':element.documentInformationList[1].documentRemark,
                'status' : element.documentInformationList[1].status,
                'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                // 'documentStatus' : this.premiumFileStatus,

              });
            }
          });
          this.transactionDetail = res.data.results[0].interestOnSavingDeposit80TTTransactionList;
          this.documentDetailList = res.data.results[0].documentInformation;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.interestOnSavingDeposit80TTTransactionList.length
            );

            element.interestOnSavingDeposit80TTTransactionList.forEach(
              (innerElement) => {
                if (innerElement.interestReceivedDate !== null) {
                  innerElement.interestReceivedDate = new Date(
                    innerElement.interestReceivedDate
                  );
                }
                innerElement.declaredAmount = this.numberFormat.transform(
                  innerElement.declaredAmount
                );
                innerElement.actualAmount = this.numberFormat.transform(
                  innerElement.actualAmount
                );
              }
            );
          });
          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
    this.editfilesArray = [];
    this.editdDocumentDataArray = [];
  }

  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.interestOnTtbService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
               this.urlArray =  res.data.results[0].documentInformation[0].documentDetailList;
      this.urlArray.forEach((element) => {element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
          element.blobURI,
        );
      });
      console.log(this.urlArray);

      });
  }

  setDateOfPayment(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      interestReceivedDate: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[
      i
    ].interestReceivedDate = summary.interestReceivedDate;
    console.log(
      this.transactionDetail[j].interestOnSavingDeposit80TTTransactionList[i]
        .interestReceivedDate
    );
  }

    // Remove Selected LicTransaction Document Edit Maodal
    removeSelectedLicTransactionDocumentInEditCase(index: number) {
      this.editfilesArray.splice(index, 1);
      console.log('this.editfilesArray::', this.editfilesArray);
      console.log('this.editfilesArray.size::', this.editfilesArray.length);
    }


    // ---------------- Doc Viewr Code ----------------------------
    nextDocViewer() {
      this.urlIndex = this.urlIndex + 1;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
    }

    previousDocViewer() {
      this.urlIndex = this.urlIndex - 1;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
    }
    zoomin(){
      var myImg = document.getElementById("map");
      var currWidth = myImg.clientWidth;
      if(currWidth == 2500) return false;
       else{
          myImg.style.width = (currWidth + 100) + "px";
      }
  }
   zoomout(){
      var myImg = document.getElementById("map");
      var currWidth = myImg.clientWidth;
      if(currWidth == 100) return false;
   else{
          myImg.style.width = (currWidth - 100) + "px";
      }
  }

    docViewer(template3: TemplateRef<any>, documentDetailList: any) {
      console.log("documentDetailList::", documentDetailList)
      this.urlArray = documentDetailList;
      this.urlIndex = 0;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
      console.log(this.urlSafe);
      this.modalRef = this.modalService.show(
        template3,
        Object.assign({}, { class: 'gray modal-xl' }),
      );
    }

}

class DeclarationService {
  public interestOnSavingDeposit80TTTransactionId = 0;
  public interestOnSavingDeposit80TTMasterId;
  public bankName: string;
  public previousEmployerId = 0;
  public declaredAmount: number;
  public actualAmount: number;
  // public interestReceivedDate : Date;
  // public interestReceivedDate : Date;
  public interestReceivedDate: Date;
  public transactionStatus: 'Pending';
  public amountRejected: number;
  public amountApproved: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}

// interestOnSavingDeposit80TTTransactionId
