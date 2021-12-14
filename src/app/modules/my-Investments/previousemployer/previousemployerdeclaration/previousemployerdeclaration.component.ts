import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse, JsonpClientBackend } from '@angular/common/http';

import jspdf from 'jspdf';
import * as _html2canvas from 'html2canvas';
const html2canvas: any = _html2canvas;

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
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../file.service';
import { HouseRentService } from '../../housingrent/house-rent.service';
import { MyInvestmentsService } from '../../my-Investments.service';
import { PreviousEmployerService } from '../../previousemployer/previousemployer.service';

@Component({
  selector: 'app-previousemployerdeclaration',
  templateUrl: './previousemployerdeclaration.component.html',
  styleUrls: ['./previousemployerdeclaration.component.scss'],
})
export class PreviousemployerdeclarationComponent implements OnInit {
  @Input() public previousEmployerName: string;
  @Input() public data: any;

  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public PreviousEmployer = 'Set iframe source';
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];

  public transactionInstitutionNames: Array<any> = [];

  public previousEmployerTransactionDetailList: Array<any> = [];

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;

  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];
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
  /*   public previousEmployeeList: Array<any> = []; */
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
  public canEdit: boolean;
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
  public viewDocumentDetail = true;
  public masterUploadFlag = true;

  public dateOfPaymentGlobal: Date;
  public actualAmountGlobal: Number;
  /*   public dueDate: Date; */
  //public paymentDate: Date;
  public date3: Date;
  public loaded = 0;

  public selectedFiles: FileList;
  public currentFileUpload: File;
  public rentReciept: File[] = [];
  public editrentRecieptArray: File[] = [];
  public masterfilesArray: File[] = [];

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
  public declarationTotal: number;
  public declaredAmountPerMonth: number;
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
  public globalInstitution: String = 'ALL';
  /*   public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL'; */

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public testnumber1: number = 5000;
  public testnumber2: number = 5000;

  imgFile: any = '';
  imageFile: any;
  proofId: any;
  tableData: any=[];
  public nameAndAddress: any;
  public pan: any;
  public residentialStatus: any;
  public actualAmount80C: any;
  tempDeclarationCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private houseRentService: HouseRentService,
    private previousEmployerService: PreviousEmployerService,
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
    /* this.refreshTransactionStatustList(); */

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
    console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      const input = this.data;
      this.globalInstitution = input.propertyHouseName;
      this.getInstitutionListWithPolicyNo();
      console.log('this.propertyHouseName::', 'propertyHouseName');

      this.getTransactionFilterPreviousEmployerData(input.propertyHouseName);
      this.isDisabled = false;
      this.canEdit = input.canEdit;
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

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

  // ------- On declaration page get API call for All Institutions added into Master-------
  declarationPage() {
    this.previousEmployerTransactionDetailList = [];
    /*     this.transactionPolicyList = [];
    this.transactionStatustList = [];
 */
    const data = {
      label: 'All',
      value: 'All',
    };

    this.previousEmployerTransactionDetailList.push(data);
    this.transactionPolicyList.push(data);
    /*     this.refreshTransactionStatustList(); */

    this.getInstitutionListWithPolicyNo();

    this.resetAll();
    this.selectedTransactionInstName('All');
  }

  public getInstitutionListWithPolicyNo() {
    this.previousEmployerService
      .getPreviousEmployerNameList()
      .subscribe((res) => {
        console.log('this.getInstitutionListWithPolicyNo::', res);
        this.transactionInstitutionListWithPolicies = res.data.results[0];

        res.data.results[0].forEach((element) => {
          console.log('element:', element);
          const obj = {
            label: element,
            value: element,
          };
          console.log('obj:', obj);
          this.previousEmployerTransactionDetailList.push(obj);
        });
      });
  }
  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedTransactionInstName(previousEmployer: any) {
    this.globalInstitution = previousEmployer;
    console.log('this.previousEmployer', previousEmployer);
    this.getTransactionFilterPreviousEmployerData(this.globalInstitution);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPolicyList = [];

    console.log('transactionPolicyList', (this.transactionPolicyList = []));

    this.transactionPolicyList.push(data);

    if (previousEmployer == 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterPreviousEmployerData(
      this.globalInstitution
      // this.globalPolicy,
      // transactionStatus,
    );
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

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;

    /* console.log(
      'in IS ECS::',
      this.transactionDetail[j].previousEmployerTransactionDetailList[i].isECS
    ); */
    if (checked) {
      if (
        this.transactionDetail[j].previousEmployerTransactionDetailList[i]
          .isECS === 1
      ) {
        this.transactionDetail[j].previousEmployerTransactionDetailList[
          i
        ].actualAmount = data.declaredAmountPerMonth;
        // this.transactionDetail[j].previousEmployerTransactionDetailList[
        //   i
        // ].paymentDate = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.transactionDetail[j].previousEmployerTransactionDetailList[i]
            .actualAmount
        );
      } else {
        this.transactionDetail[j].previousEmployerTransactionDetailList[
          i
        ].actualAmount = data.declaredAmountPerMonth;
      }

      formatedActualAmount = Number(
        this.transactionDetail[j].previousEmployerTransactionDetailList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.houseRentalTransactionDetailId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmountPerMonth);
    } else {
      formatedActualAmount = Number(
        this.transactionDetail[j].previousEmployerTransactionDetailList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].previousEmployerTransactionDetailList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      // this.transactionDetail[j].previousEmployerTransactionDetailList[i].paymentDate = null;
      /*  this.transactionDetail[j].previousEmployerTransactionDetailList[i]; */
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.houseRentalTransactionDetailId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[j].previousEmployerTransactionDetailList.forEach(
      (element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
      }
    );
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }

  //--------------- ON change of declared Amount Main Page-------------
  onDeclaredAmountChange(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      //   paymentDate: Date;
      actualTotal: any;
      /*    dueDate: Date; */
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmountPerMonth);

    this.transactionDetail[j].previousEmployerTransactionDetailList[
      i
    ].declaredAmountPerMonth = this.declarationService.declaredAmountPerMonth;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].previousEmployerTransactionDetailList[i]
        .declaredAmountPerMonth
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].previousEmployerTransactionDetailList[
      i
    ].declaredAmountPerMonth = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmountPerMonth=0;

    this.transactionDetail[j].previousEmployerTransactionDetailList.forEach(
      (element) => {
        // console.log(element.declaredAmountPerMonth.toString().replace(',', ""));
        this.declarationTotal += Number(
          element.declaredAmountPerMonth.toString().replace(/,/g, '')
        );
        // console.log(this.declarationTotal);
        // this.declaredAmountPerMonth+=Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
  }

  // --------------- ON change of declared Amount Edit Modal-------------
  onDeclaredAmountChangeInEditCase(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      //    paymentDate: Date;
      actualTotal: any;
      /*   dueDate: Date; */
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onDeclaredAmountChangeInEditCase Amount change::' +
        summary.declaredAmountPerMonth
    );

    this.editTransactionUpload[j].previousEmployerTransactionDetailList[
      i
    ].declaredAmountPerMonth = this.declarationService.declaredAmountPerMonth;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
        .declaredAmountPerMonth
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].previousEmployerTransactionDetailList[
      i
    ].declaredAmountPerMonth = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].previousEmployerTransactionDetailList.forEach(
      (element) => {
        console.log(
          'declaredAmountPerMonth::',
          element.declaredAmountPerMonth.toString().replace(/,/g, '')
        );
        this.declarationTotal += Number(
          element.declaredAmountPerMonth.toString().replace(/,/g, '')
        );
        // console.log(this.declarationTotal);
      }
    );

    this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
    console.log(
      'DeclarATION total==>>' + this.editTransactionUpload[j].declarationTotal
    );
  }

  // ------------ ON change of DueDate in Main Page----------
  onDueDateChange(
    summary: {
      /*     previousEmployerName: any; */
      declaredAmountPerMonth: number;
      //   paymentDate: Date;
      actualAmount: number;
      /*    dueDate: any; */
    },
    i: number,
    j: number
  ) {
    // this.transactionDetail[j].previousEmployerTransactionDetailList[i].dueDate = summary.dueDate;
  }

  // ------------ ON change of DueDate in Edit Modal----------
  onDueDateChangeInEditCase(
    summary: {
      /*      previousEmployerName: any; */
      declaredAmountPerMonth: number;
      //  paymentDate: Date;
      actualAmount: number;
      /*      dueDate: any; */
    },
    i: number,
    j: number
  ) {
    //this.editTransactionUpload[j].previousEmployerTransactionDetailList[i].dueDate =  summary.dueDate;
    /*    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i].dueDate,
    ); */
  }

  // ------------Actual Amount change main Page-----------
  onActualAmountChange(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      // paymentDate: Date;
      actualAmount: number;
      /*     dueDate: Date; */
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
   
    
    console.log("declarationService::" , this.declarationService);

    this.transactionDetail[j].previousEmployerTransactionDetailList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].previousEmployerTransactionDetailList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].previousEmployerTransactionDetailList[i]
        .actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].previousEmployerTransactionDetailList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].previousEmployerTransactionDetailList[i]
        .actualAmount !== Number(0) ||
      this.transactionDetail[j].previousEmployerTransactionDetailList[i]
        .actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].previousEmployerTransactionDetailList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].previousEmployerTransactionDetailList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.transactionDetail[j].previousEmployerTransactionDetailList.forEach(
      (element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
        // console.log(this.actualTotal);
        // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.transactionDetail[j].actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);

    this.tempDeclarationCount = 0
    
    this.transactionDetail.forEach(ele =>{
      ele.previousEmployerTransactionDetailList.forEach(element => {
          console.log(element.actualAmount)
        if(element.actualAmount != 0){
          this.tempDeclarationCount = this.tempDeclarationCount + 1
          return;
        }
      });
    })
  }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCase(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      /// paymentDate: Date;
      remark: any;
      actualAmount: number;
      /*    dueDate: Date; */
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onActualAmountChangeInEditCaseActual Amount change::',
      summary
    );

    this.editTransactionUpload[j].previousEmployerTransactionDetailList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
        .actualAmount
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
        .actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[j].previousEmployerTransactionDetailList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
        .actualAmount !== Number(0) ||
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
        .actualAmount !== null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
          .actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j].previousEmployerTransactionDetailList[i]
          .actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[j].previousEmployerTransactionDetailList.forEach(
      (element) => {
        console.log(element.actualAmount.toString().replace(/,/g, ''));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
        console.log(this.actualTotal);
        // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }

  // --------Add New ROW Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmountPerMonth: any;
  //   paymentDate: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
    // Disabled Add row Function
  // addRowInList(
  //   summarynew: {
  //     houseRentalTransactionDetailId: number;
  //     houseRentalMasterId: number;
  //     toDate: Date;
  //     fromDate: Date;
  //     //  paymentDate: Date;
  //     actualAmount: any;
  //     declaredAmountPerMonth: any;
  //     remark: any;
  //     receiptDate: any;
  //   },
  //   j: number
  // ) {
  //   console.log('taddRowInList');
  //   this.declarationService = new DeclarationService(summarynew);
  //   console.log('declarationService::', this.declarationService);
  //   this.globalAddRowIndex -= 1;
  //   console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
  //   this.shownewRow = true;
  //   this.declarationService.houseRentalTransactionDetailId =
  //     this.globalAddRowIndex;
  //   this.declarationService.declaredAmountPerMonth = null;
  //   this.declarationService.actualAmount = null;
  //   this.declarationService.actualAmount = null;
  //   this.declarationService.fromDate = null;
  //   this.declarationService.toDate = null;
  //   // this.declarationService.paymentDate = null;
  //   this.declarationService.remark;
  //   this.declarationService.transactionStatus = 'Pending';
  //   /*this.declarationService.transactionStatus = null; */
  //   this.declarationService.rejectedAmount = 0.0;
  //   this.declarationService.approvedAmount = 0.0;
  //   this.declarationService.houseRentalMasterId =
  //     this.transactionDetail[
  //       j
  //     ].previousEmployerTransactionDetailList[0].houseRentalMasterId;
  //   this.transactionDetail[j].previousEmployerTransactionDetailList.push(
  //     this.declarationService
  //   );

  //   console.log(
  //     'addRow::',
  //     this.transactionDetail[j].previousEmployerTransactionDetailList
  //   );
  // }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount =
      this.transactionDetail[j].previousEmployerTransactionDetailList.length -
      1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (
      this.transactionDetail[j].previousEmployerTransactionDetailList.length ==
      1
    ) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].previousEmployerTransactionDetailList.splice(
        rowCount,
        1
      );
      return true;
    }
  }

  editDeclrationRow(
    summary: {
      toDate: Date;
      fromDate: Date;
      // paymentDate: Date;
      actualAmount: any;
      declaredAmountPerMonth: any;
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
      this.transactionDetail[j].previousEmployerTransactionDetailList[i]
        .actualAmount;
    this.transactionDetail[j].previousEmployerTransactionDetailList[i] =
      this.declarationService;
    this.declarationService = new DeclarationService();
  }

  SaveDeclrationRow(j) {
    if (!this.declarationService) {
      return;
    }
    this.transactionDetail[j].declarationTotal +=
      this.declarationService.declaredAmountPerMonth;
    this.transactionDetail[j].actualTotal +=
      this.declarationService.actualAmount;
    this.grandActualTotal += this.declarationService.actualAmount;
    this.grandDeclarationTotal +=
      this.declarationService.declaredAmountPerMonth;
    this.transactionDetail[j].previousEmployerTransactionDetailList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.previousEmployerTransactionDetailList.forEach((element) => {
        /*   element.paymentDate = this.datePipe.transform(
          element.paymentDate,
          'yyyy-MM-dd'
        ); */
      });
    });
    const data = this.transactionDetail;
    this.previousEmployerService
      .postEightyCDeclarationTransaction(data)
      .subscribe((res) => {
        console.log(res);

        this.transactionDetail =
          res.data.results[0].previousEmployerTransactionDetailList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

        /*  this.transactionDetail.forEach((element) => {
          element.previousEmployerTransactionDetailList.forEach((element) => {
            element.paymentDate = new Date(element.paymentDate);
          });
        }); */
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
        this.rentReciept.push(file);
      }
    }
    console.log(this.rentReciept);
  }

  onUploadInEditCase(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editrentRecieptArray.push(file);
      }
    }
    console.log(this.editrentRecieptArray);
  }

  removeDocument() {
    this.currentFileUpload = null;
  }

  // --Remove Selected LicTransaction Document in Main Page----
  removeSelectedLicTransactionDocument(index: number) {
    this.rentReciept.splice(index, 1);
    console.log('this.rentReciept::', this.rentReciept);
    console.log('this.rentReciept.size::', this.rentReciept.length);
  }

  // Remove Selected LicTransaction Document Edit Maodal
  removeSelectedLicTransactionDocumentInEditCase(index: number) {
    this.editrentRecieptArray.splice(index, 1);
    console.log('this.editrentRecieptArray::', this.editrentRecieptArray);
    console.log(
      'this.editrentRecieptArray.size::',
      this.editrentRecieptArray.length
    );
  }

  upload() {
    if (this.rentReciept.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log('this.transactionDetail::....', this.transactionDetail);

    // const parentsDelete = this.transactionDetail[0].previousEmployerTransactionDetailList[0];
    /*   const parentsDelete = this.previousEmployerTransactionDetailList[0]; */
    // delete parentsDelete.proofSubmissionId;

    this.transactionDetail.forEach((element) => {
      this.proofId = element.previousEmployerTransactionDetailList;
      console.log('element:::..............', element);
      this.proofId.forEach((element) => {
        delete element.proofSubmissionId;
        console.log('element:::..............', element);
      });
    });

    /*   this.transactionDetail.forEach((element) => {
      element.previousEmployerTransactionDetailList.forEach((innerElement) => {
        if (innerElement.declaredAmountPerMonth !== null) {
          innerElement.declaredAmountPerMonth =
            innerElement.declaredAmountPerMonth.toString().replace(/,/g, '');
        } else {
          innerElement.declaredAmountPerMonth = 0.0;
        }
        if (innerElement.actualAmount !== null) {
          innerElement.actualAmount = innerElement.actualAmount
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement.actualAmount = 0.0;
        }

        const paymentDate = this.datePipe.transform(
          innerElement.paymentDate,
          'yyyy-MM-dd'
        );

        const fromDate = this.datePipe.transform(
          innerElement.fromDate,
          'yyyy-MM-dd'
        );

        const toDate = this.datePipe.transform(
          innerElement.toDate,
          'yyyy-MM-dd'
        );

        innerElement.paymentDate = paymentDate;
        innerElement.fromDate = fromDate;
        innerElement.toDate = toDate;
      });
    }); */

    console.log('this.receiptDate::', this.receiptDate);
    console.log(this.transactionDetail[0]);
    console.log(
      ',,,,,,,,,,,,,,,,,,,,',
      this.previousEmployerTransactionDetailList
    );

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');

    

    let previousEmployerMasterDetail = this.transactionDetail[0].previousEmployerMasterDetailId;
    
    let tempArra = []
    this.transactionDetail[0].previousEmployerTransactionDetailList.forEach(element => {
      tempArra.push(element.previousEmployerTransactionDetailId)
    });
    const data = {
      //proofSubmissionId: this.transactionDetail[0].proofSubmissionId,
      proofSubmissionId: '',
      //previousEmployerMasterDetailId: '1',
      previousEmployerMasterDetailId: previousEmployerMasterDetail,
      previousEmployerTransactionDetailIds:tempArra,
      previousEmployerTransactionDetailList:this.transactionDetail[0].previousEmployerTransactionDetailList,
      //previousEmployerTransactionDetailIds: this.uploadGridData,
      //previousEmployerTransactionDetailIds:this.transactionDetail[0].previousEmployerTransactionDetailList.previousEmployerTransactionDetailId,
      receiptAmount: this.receiptAmount,
      electricVehicleLoanMasterId:
        this.transactionDetail[0].electricVehicleLoanMasterId,
    };
    console.log('data::', data);
    this.previousEmployerService
      .uploadTransactionWithMultipleFiles(this.rentReciept, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.transactionDetail =
            res.data.results[0].previousEmployerTransactionDetailList[0];
          this.documentDetailList = res.data.results[0].documentInformationList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.previousEmployerTransactionDetailList.length
            );

            element.previousEmployerTransactionDetailList.forEach(
              (innerElement) => {
                /*  if (innerElement.paymentDate !== null) {
                innerElement.paymentDate = new Date(innerElement.paymentDate);
              } */

                innerElement.declaredAmountPerMonth =
                  this.numberFormat.transform(
                    innerElement.declaredAmountPerMonth
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
    this.receiptAmount = '0.00';
    this.rentReciept = [];
    this.globalSelectedAmount = '0.00';
  }

  openForm12BModal(template4: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template4,
      Object.assign({}, { class: 'gray modal-xl' })
    );
    // this.tableData.push(this.declarationService)
    this.tableData.push(
      {}
    )
  }

  openFormSign(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
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
      Object.assign({}, { class: 'gray modal-xl' })
    );
    this.proofSubmissionFileList =
      this.documentDetailList[documentIndex].documentDetailList;
  }

  // When Edit of Document Details
  declarationEditUpload(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.previousEmployerService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);

        this.urlArray =
          res.data.results[0].documentInformationList[0].documentDetailList;
        this.editTransactionUpload =
          res.data.results[0].previousEmployerTransactionDetailList;
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.editReceiptAmount = res.data.results[0].y;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;
        // console.log(this.urlArray);
        this.editTransactionUpload.forEach((element) => {
          element.previousEmployerTransactionDetailList.forEach(
            (innerElement) => {
              innerElement.declaredAmountPerMonth = this.numberFormat.transform(
                innerElement.declaredAmountPerMonth
              );
              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount
              );
            }
          );
        });
        // console.log('converted:: ', this.urlArray);
      });
  }

  // -----------Common Function for filter to call API---------------
  getTransactionFilterPreviousEmployerData(PreviousEmployer: String) {
    console.log('this.PreviousEmployer::', PreviousEmployer);

    this.previousEmployerService
      .getTransactionFilterPreviousEmployerData(PreviousEmployer)
      .subscribe((res) => {
        console.log('getTransactionFilterPreviousEmployerData:::', res);

        this.nameAndAddress=res.data.results[0].nameAndAddress;
        this.pan=res.data.results[0].pan;
        this.residentialStatus=res.data.results[0].residentialStatus;
        this.actualAmount80C=res.data.results[0].actualAmount80C;


        console.log("nameAndAddress " ,this.nameAndAddress);
        this.transactionDetail =
          res.data.results[0].previousEmployerTransactionDetailList;

        console.log(
          'previousEmployerTransactionDetailList::',
          this.transactionDetail
        );

        this.documentDetailList = res.data.results[0].documentInformationList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(
            element.previousEmployerTransactionDetailList.length
          );
          /* 
          element.previousEmployerTransactionDetailList.forEach((innerElement) => {
            if (innerElement.paymentDate !== null) {
              innerElement.paymentDate = new Date(innerElement.paymentDate);
            }
            innerElement.declaredAmountPerMonth = this.numberFormat.transform(
              innerElement.declaredAmountPerMonth
            );

            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount
            );
          }); */
        });
      });
  }

  // Upload Document And save Edited Transaction
  public uploadUpdateTransaction() {
    console.log(
      'uploadUpdateTransaction editTransactionUpload::',
      this.editTransactionUpload
    );

    this.editTransactionUpload.forEach((element) => {
      element.previousEmployerTransactionDetailList.forEach((innerElement) => {
        if (innerElement.declaredAmountPerMonth !== null) {
          innerElement.declaredAmountPerMonth =
            innerElement.declaredAmountPerMonth.toString().replace(/,/g, '');
        } else {
          innerElement.declaredAmountPerMonth = 0.0;
        }
        if (innerElement.actualAmount !== null) {
          innerElement.actualAmount = innerElement.actualAmount
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement.actualAmount = 0.0;
        }

        const fromDate = this.datePipe.transform(
          innerElement.fromDate,
          'yyyy-MM-dd'
        );
        const toDate = this.datePipe.transform(
          innerElement.toDate,
          'yyyy-MM-dd'
        );

        /*  const paymentDate = this.datePipe.transform(
          innerElement.paymentDate,
          'yyyy-MM-dd'
        ); */

        /* innerElement.receiptAmount = receiptAmount; */
        // innerElement.paymentDate = paymentDate;
        innerElement.fromDate = fromDate;
        innerElement.toDate = toDate;
        //   innerElement.paymentDate = paymentDate;
        this.uploadGridData.push(innerElement.houseRentalTransactionDetailId);
      });
    });

    /*  this.editTransactionUpload.forEach((element) => {
      element.previousEmployerTransactionDetailList.forEach((innerElement) => {
        const paymentDate = this.datePipe.transform(
          innerElement.paymentDate,
          'yyyy-MM-dd'
        );
        innerElement.paymentDate = paymentDate;
      });
    }); */

    console.log('editTransactionUpload::', this.editTransactionUpload);

    const data = {
      proofSubmissionId: this.editProofSubmissionId,
      previousEmployerTransactionDetailList:
        this.editTransactionUpload[0].previousEmployerTransactionDetailList,
      previousEmployerTransactionDetailIds: this.uploadGridData,
      //  documentRemark: this.documentRemark,
      receiptAmount: this.editReceiptAmount,

      receiptDate: Date,
    };
    console.log('uploadUpdateTransaction data::', data);

    this.previousEmployerService
      .uploadTransactionWithMultipleFiles(this.editrentRecieptArray, data)
      .subscribe((res) => {
        console.log('uploadUpdateTransaction::', res);
        if (res.data.results.length > 0) {
          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );

          this.transactionDetail =
            res.data.results[0].previousEmployerTransactionDetailList;
          this.documentDetailList = res.data.results[0].documentInformationList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.previousEmployerTransactionDetailList.length
            );

            /*  element.previousEmployerTransactionDetailList.forEach((innerElement) => {
              if (innerElement.paymentDate !== null) {
                innerElement.paymentDate = new Date(innerElement.paymentDate);
              }

              if (innerElement.isECS === 0) {
                this.glbalECS == 0;
              } else if (innerElement.isECS === 1) {
                this.glbalECS == 1;
              } else {
                this.glbalECS == 0;
              }

              innerElement.declaredAmountPerMonth = this.numberFormat.transform(
                innerElement.declaredAmountPerMonth
              );

              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount
              );
            }); */
          });
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
  }

  editTransactionByProofSubmissionId(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.previousEmployerService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);

        /*      this.urlArray =
          res.data.results[0].documentInformationList[0].documentDetailList;
        this.urlArray.forEach((element) => {
          element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
            element.blobURI
          );
        }); */
        console.log(this.urlArray);
      });
  }

  // ---- Set Date of Payment On Main Page----
  setDateOfPayment(
    summary: {
      declaredAmountPerMonth: number;
      // paymentDate: Date;
      actualAmount: number;
      toDate: Date;
      fromDate: Date;
    },
    i: number,
    j: number
  ) {
    console.log('transactionDetail::', this.transactionDetail);
    console.log('i::', i);
    console.log('j::', j);
    console.log('summary::', summary);
    //  this.transactionDetail[j].previousEmployerTransactionDetailList[i].paymentDate = summary.paymentDate;
    console
      .log
      //   this.transactionDetail[j].previousEmployerTransactionDetailList[i].paymentDate
      ();
  }

  setToDate(
    summary: {
      declaredAmountPerMonth: number;
      // paymentDate: Date;
      actualAmount: number;
      toDate: Date;
      fromDate: Date;
    },
    i: number,
    j: number
  ) {
    console.log('transactionDetail::', this.transactionDetail);
    console.log('i::', i);
    console.log('j::', j);
    console.log('summary::', summary);
    this.transactionDetail[j].previousEmployerTransactionDetailList[i].toDate =
      summary.toDate;
    console.log(
      this.transactionDetail[j].previousEmployerTransactionDetailList[i].toDate
    );
  }

  setFromDate(
    summary: {
      declaredAmountPerMonth: number;
      // paymentDate: Date;
      actualAmount: number;
      toDate: Date;
      fromDate: any;
    },
    i: number,
    j: number
  ) {
    console.log('transactionDetail::', this.transactionDetail);
    console.log('i::', i);
    console.log('j::', j);
    console.log('summary::', summary);
    this.transactionDetail[j].previousEmployerTransactionDetailList[
      i
    ].fromDate = summary.fromDate;
    console.log(
      this.transactionDetail[j].previousEmployerTransactionDetailList[i]
        .fromDate
    );
  }
  setDateOfPaymentInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      //  paymentDate: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    // this.editTransactionUpload[j].previousEmployerTransactionDetailList[i].paymentDate =  summary.paymentDate;
    /* console.log(
      this.editTransactionUpload[j].previousEmployerTransactionDetailList[i].paymentDate
    ); */
  }
  // ---------------- Doc Viewr Code ----------------------------
  nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  docViewer(template1: TemplateRef<any>, documentDetailList: any) {
    console.log('documentDetailList::', documentDetailList);
    this.urlArray = documentDetailList;
    this.urlIndex = 0;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    console.log(this.urlSafe);
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  /* =================pdf======================== */
  download() {
    console.log('hi');
    let data = document.getElementById('htmlData');
    html2canvas(data).then((canvas) => {
      console.log(canvas);
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // A4 size page of PDF
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // Generated PDF
      pdf.save('FORM.12B.pdf');
    }, 700);
  }

  onImageChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
      };
    }
  }
  getImageFile(imagefile: any) {
    this.imageFile = imagefile;
  }
  // Total Amount of House rent
  totalAmtHouseRent(summary){
    let calc=0;
    let taxEarn=parseInt(summary.previousEmployerTransactionDetailList[1].actualAmount);
    let exemUs =parseInt(summary.previousEmployerTransactionDetailList[2].actualAmount);
    calc=taxEarn-exemUs;
    return calc;
  }

  /** total colm of 6 7 8  */
  getTotalOfColms(summary){
    let total = 0;
    let a = parseInt(summary.previousEmployerTransactionDetailList[0].actualAmount)   
    let b = parseInt(summary.previousEmployerTransactionDetailList[1].actualAmount) - parseInt(summary.previousEmployerTransactionDetailList[2].actualAmount)
    let c = parseInt(summary.previousEmployerTransactionDetailList[3].actualAmount)

    total = a + b + c;

    return total;
  }
}

class DeclarationService {
  public houseRentalTransactionDetailId = 0;
  public houseRentalMasterId: number;
  public toDate: Date;
  public fromDate: Date;
  public declaredAmountPerMonth: number;
  //public paymentDate: Date;
  public actualAmount: number;
  public remark: string;
  public transactionStatus: 'Pending';
  public rejectedAmount: number;
  public approvedAmount: number;
  // public receiptDate: Date;
  // public receiptAmount: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
