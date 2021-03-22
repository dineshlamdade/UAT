import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { HousingloanService } from './../housingloan.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../file.service';
import { MyInvestmentsService } from '../../my-Investments.service';

@Component({
  selector: 'app-housingloandeclaration',
  templateUrl: './housingloandeclaration.component.html',
  styleUrls: ['./housingloandeclaration.component.scss'],
})
export class HousingloandeclarationComponent implements OnInit {
  @Input() public institution: string;
  @Input() public policyNo: string;
  @Input() public data: any;

  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name = 'Set iframe source';
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
  // -----------------------------------------Declaration Variables -------------------//
  public propertyNameList: Array<any> = [];
  public previousEmpParticularList: Array<any> = [];
  public isActive: boolean;
  public iAgree: boolean;
  public lossIncomeAmountCalculation: any;

  // -----------------------------------------Declaration Variables End -------------------//

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;

  public transactionPolicyList: Array<any> = [];
  public propertyList: Array<any> = [];
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

  public PreviousEmployeeService: PreviousEmployeeService;
  public displayUploadFile = false;
  public uploadedFiles: any[] = [];
  public viewDocumentDetail = true;
  public masterUploadFlag = true;

  public dateOfPaymentGlobal: Date;
  public actualAmountGlobal: Number;
  public dueDate: Date;
  public dateOfPayment: Date;
  public date3: Date;
  public loaded = 0;
  public selectedFiles: FileList;
  public currentFileUpload: File;
  public filesArray: File[] = [];
  public masterfilesArray: File[] = [];
  public editfilesArray: File[] = [];
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
  public declarationTotal: number;
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
  public allPropertyNames: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private HousingLoanService: HousingloanService,
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

    this.previousEmpParticularList = [
      { label: 'House Loan Benefit', value: 'houseLoanBenefit' },
      { label: 'Principal Repayment', value: 'principalRepayment' },
    ];
    console.log('previousEmpParticularList', this.previousEmpParticularList);
  }

  public ngOnInit(): void {
    console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
    } else {
      const input = this.data;
      this.allPropertyNames = input.institution;
      this.globalPolicy = input.policyNo;
      this.getInstitutionListWithPolicyNo();
      this.getTransactionFilterData(input.institution);
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.PreviousEmployeeService = new PreviousEmployeeService();

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

    // // Get All Previous Employer
    // this.Service.getAllPreviousEmployer().subscribe((res) => {
    //   console.log(res.data.results);
    //   if (res.data.results.length > 0) {
    //     this.employeeJoiningDate = res.data.results[0].joiningDate;
    //     // console.log('employeeJoiningDate::',this.employeeJoiningDate);
    //   }
    // });

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

  public updatePreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.transactionDetail[j].groupTransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].groupTransactionList[i].previousEmployerId
    );
  }
  // ----------------------------------------------- Declaration --------------------------------------

  // -----------on Page referesh transactionStatustList------------
  public refreshTransactionStatustList() {
    this.transactionStatustList = [
      { label: 'All', value: 'All' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Send back', value: 'Send back' },
    ];
  }

  // ------- On declaration page get API call for All Institutions added into Master-------
  public declarationPage() {
    this.propertyNameList = [];
    this.transactionPolicyList = [];
    this.transactionStatustList = [];

    const data = {
      label: 'All',
      value: 'All',
    };

    this.propertyNameList.push(data);
    this.transactionPolicyList.push(data);
    this.refreshTransactionStatustList();

    this.getInstitutionListWithPolicyNo();

    this.resetAll();
    this.selectedTransactionPropertyName('All');
  }

  public getInstitutionListWithPolicyNo() {
    this.HousingLoanService.getPropertyNamesList().subscribe((res) => {
      console.log('Property Names', res);
      // this.propertyNameList = res.data.results[0];

      res.data.results[0].forEach((element) => {
        console.log('property emelemnt', element);
        const obj = {
          label: element,
          value: element,
        };
        this.propertyNameList.push(obj);
        console.log('PropertyName LIst  ', this.propertyNameList);
      });
    });
  }
  // --------- On institution selection show all transactions list accordingly all policies--------
  public selectedTransactionPropertyName(propertyName: any) {
    this.allPropertyNames = propertyName;
    this.getTransactionFilterData(this.allPropertyNames);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPolicyList = [];
    this.transactionPolicyList.push(data);

    this.propertyList.forEach((element) => {
      if (propertyName === element.institution) {
        element.policies.forEach((policy) => {
          const policyObj = {
            label: policy,
            value: policy,
          };
          this.transactionPolicyList.push(policyObj);
        });
      } else if (propertyName === 'All') {
        element.policies.forEach((policy) => {
          const policyObj = {
            label: policy,
            value: policy,
          };
          this.transactionPolicyList.push(policyObj);
        });
      }
    });

    if (propertyName === 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
  }

  // -------- On Policy selection show all transactions list accordingly all policies---------
  public selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData(this.allPropertyNames);
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  public selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData(this.allPropertyNames);
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
      this.globalSelectedAmount === '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(',', '')
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    console.log(
      'in IS ECS::',
      this.transactionDetail[j].groupTransactionList[i].isECS
    );
    if (checked) {
      // console.log('item' ,item);
      if (this.transactionDetail[j].frequency !== 'As & When') {
        if (this.transactionDetail[j].groupTransactionList[i].isECS === 1) {
          this.transactionDetail[j].groupTransactionList[i].actualAmount =
            data.declaredAmount;
          this.transactionDetail[j].groupTransactionList[
            i
          ].dateOfPayment = new Date(data.dueDate);
          console.log(
            'in IS actualAmount::',
            this.transactionDetail[j].groupTransactionList[i].actualAmount
          );
          console.log(
            'in IS dateOfPayment::',
            this.transactionDetail[j].groupTransactionList[i].dateOfPayment
          );
        } else {
          console.log('in else actualamount');
          this.transactionDetail[j].groupTransactionList[i].actualAmount =
            data.declaredAmount;
        }
      }

      formatedActualAmount = Number(
        this.transactionDetail[j].groupTransactionList[i].actualAmount
          .toString()
          .replace(',', '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.investmentGroup1TransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
        this.transactionDetail[j].groupTransactionList[i].actualAmount
          .toString()
          .replace(',', '')
      );
      this.transactionDetail[j].groupTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.transactionDetail[j].groupTransactionList[i].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.investmentGroup1TransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[j].groupTransactionList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(',', ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', '')
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
  public checkUncheckAll(item: any) {
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
      this.enableCheckboxFlag2 = item.institutionName;
      item.groupTransactionList.forEach((element) => {
        this.uploadGridData.push(element.investmentGroup1TransactionId);
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // --------------- ON change of declared Amount in line-------------
  public onDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.transactionDetail[j].groupTransactionList[
      i
    ].declaredAmount = this.PreviousEmployeeService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].groupTransactionList[i].declaredAmount
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].groupTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.transactionDetail[j].groupTransactionList.forEach((element) => {
      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(',', '')
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
  }

  // ------------ ON change of DueDate in line----------
  public onDueDateChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    this.transactionDetail[j].groupTransactionList[i].dueDate = summary.dueDate;
  }

  // ------------Actual Amount change-----------
  public onActualAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    // console.log("Actual Amount change::" , summary);

    this.transactionDetail[j].groupTransactionList[
      i
    ].actualAmount = this.PreviousEmployeeService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].groupTransactionList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].groupTransactionList[i].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].groupTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].groupTransactionList[i].actualAmount !==
        Number(0) ||
      this.transactionDetail[j].groupTransactionList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].groupTransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].groupTransactionList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.transactionDetail[j].groupTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', '')
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail[j].actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  public addRowInList(
    summarynew: {
      investmentGroup1TransactionId: number;
      licMasterPaymentDetailsId: number;
      previousEmployerId: number;
      dueDate: Date;
      declaredAmount: any;
      dateOfPayment: Date;
      actualAmount: any;
      isECS: number;
    },
    j: number
  ) {
    // console.log('summary::',  summarynew);
    // if (this.initialArrayIndex[j] > i) {
    //   this.hideRemoveRow = false;
    // } else {
    //   this.hideRemoveRow  = true;
    // }
    this.PreviousEmployeeService = new PreviousEmployeeService(summarynew);
    // console.log('PreviousEmployeeService::', this.PreviousEmployeeService);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.PreviousEmployeeService.investmentGroup1TransactionId = this.globalAddRowIndex;
    this.PreviousEmployeeService.declaredAmount = null;
    this.PreviousEmployeeService.dueDate = null;
    this.PreviousEmployeeService.actualAmount = null;
    this.PreviousEmployeeService.dateOfPayment = null;
    this.PreviousEmployeeService.isECS = 0;
    this.PreviousEmployeeService.transactionStatus = 'Pending';
    this.PreviousEmployeeService.amountRejected = 0.0;
    this.PreviousEmployeeService.amountApproved = 0.0;
    this.PreviousEmployeeService.licMasterPaymentDetailsId = this.transactionDetail[
      j
    ].groupTransactionList[0].licMasterPaymentDetailsId;
    this.transactionDetail[j].groupTransactionList.push(
      this.PreviousEmployeeService
    );
    console.log('addRow::', this.transactionDetail[j].groupTransactionList);
  }

  public sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  public sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  public deleteRow(j: number) {
    const rowCount = this.transactionDetail[j].groupTransactionList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.transactionDetail[j].groupTransactionList.length === 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].groupTransactionList.splice(rowCount, 1);
      return true;
    }
  }

  public editDeclrationRow(
    summary: {
      previousEmployerName: any;
      declaredAmount: any;
      dateOfPayment: any;
      dueDate: any;
      actualAmount: any;
    },
    i: any,
    j: any
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
  }

  public updateDeclrationRow(i: string | number, j: string | number) {
    // tslint:disable-next-line: max-line-length
    this.transactionDetail[j].actualTotal +=
      this.PreviousEmployeeService.actualAmount -
      this.transactionDetail[j].groupTransactionList[i].actualAmount;
    this.transactionDetail[j].groupTransactionList[
      i
    ] = this.PreviousEmployeeService;
    this.PreviousEmployeeService = new PreviousEmployeeService();
  }

  public SaveDeclrationRow(j) {
    if (!this.PreviousEmployeeService) {
      return;
    }
    this.transactionDetail[
      j
    ].declarationTotal += this.PreviousEmployeeService.declaredAmount;
    this.transactionDetail[
      j
    ].actualTotal += this.PreviousEmployeeService.actualAmount;
    this.grandActualTotal += this.PreviousEmployeeService.actualAmount;
    this.grandDeclarationTotal += this.PreviousEmployeeService.declaredAmount;
    this.transactionDetail[j].groupTransactionList.push(
      this.PreviousEmployeeService
    );
    this.PreviousEmployeeService = new PreviousEmployeeService();
  }

  public submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.groupTransactionList.forEach((element) => {
        element.dateOfPayment = this.datePipe.transform(
          element.dateOfPayment,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.transactionDetail;
    this.Service.submitPPFDeclarationTransaction(data).subscribe((res) => {
      console.log(res);
      this.transactionDetail =
        res.data.results[0].investmentGroupTransactionDetail;
      this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      this.transactionDetail.forEach((element) => {
        element.groupTransactionList.forEach((element) => {
          element.dateOfPayment = new Date(element.dateOfPayment);
        });
      });
    });
    this.resetAll();
  }

  // Reset All
  public resetAll() {
    this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
    this.uploadGridData = [];
    this.enableCheckboxFlag3 = false;
    this.enableCheckboxFlag2 = null;
    this.PreviousEmployeeService = new PreviousEmployeeService();
  }

  ///// --------------------------------rahul-------------

  public UploadFilePopUp() {
    this.displayUploadFile = true;
  }

  public onUpload(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.filesArray.push(file);
      }
    }
    console.log(this.filesArray);
  }

  public onUploadInEditCase(event) {
    console.log('onUploadInEditCaseevent::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editfilesArray.push(file);
      }
    }
    console.log('onUploadInEditCase::', this.editfilesArray);
  }

  public removeDocument() {
    this.currentFileUpload = null;
  }

  // Remove Selected LicTransaction Document
  public removeSelectedLicTransactionDocument(index: number) {
    this.filesArray.splice(index, 1);
    console.log('this.filesArray::', this.filesArray);
    console.log('this.filesArray.size::', this.filesArray.length);
  }

  public removeSelectedLicTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
  }

  public upload() {
    // this.currentFileUpload = this.selectedFiles.item(0);
    // const data = {
    //     licTransactionIDs: this.uploadGridData,
    //     receiptNumber: this.receiptNumber,
    //     globalSelectedAmount: this.receiptAmount,
    //     receiptDate: this.receiptDate,
    // };
    // this.uploadGridData = [3,4]
    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      element.groupTransactionList.forEach((innerElement) => {
        if (innerElement.declaredAmount !== null) {
          innerElement.declaredAmount = innerElement.declaredAmount
            .toString()
            .replace(',', '');
        } else {
          innerElement.declaredAmount = 0.0;
        }
        if (innerElement.actualAmount !== null) {
          innerElement.actualAmount = innerElement.actualAmount
            .toString()
            .replace(',', '');
        } else {
          innerElement.actualAmount = 0.0;
        }

        const dateOfPaymnet = this.datePipe.transform(
          innerElement.dateOfPayment,
          'yyyy-MM-dd'
        );
        const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd'
        );

        innerElement.dateOfPayment = dateOfPaymnet;
        innerElement.dueDate = dueDate;
      });
    });

    this.receiptAmount = this.receiptAmount.toString().replace(',', '');
    const data = {
      investmentGroupTransactionDetail: this.transactionDetail,
      groupTransactionIDs: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
    };
    console.log('data::', data);

    // this.fileService.uploadSingleFile(this.currentFileUpload, data)
    // .pipe(tap(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //         this.loaded = Math.round(100 * event.loaded / event.total);
    //     }
    // }))
    this.Service.uploadPPFTransactionwithDocument(
      this.filesArray,
      data
    ).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.transactionDetail =
          res.data.results[0].investmentGroupTransactionDetail;
        this.documentDetailList = res.data.results[0].documentInformation;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        this.transactionDetail.forEach((element) => {
          element.groupTransactionList.forEach((innerElement) => {
            if (innerElement.dateOfPayment !== null) {
              innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
            }
            if (this.employeeJoiningDate < innerElement.dueDate) {
              innerElement.active = false;
            }
            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount
            );
            // console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
          });
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
    this.filesArray = [];
    this.globalSelectedAmount = '0.00';
  }

  public changeReceiptAmountFormat() {
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
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
      );
    } else if (receiptAmount_ > globalSelectedAmount_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmount_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount'
      );
    }
    this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
  }

  public UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  public UploadedDocumentModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  public UploadedDocumentModal1(
    template1: TemplateRef<any>,
    documentIndex: number
  ) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.proofSubmissionFileList = this.documentDetailList[
      documentIndex
    ].documentDetailList;
  }

  public deactiveCopytoActualDate() {
    if (this.isECS === false) {
      this.hideCopytoActualDate = true;
    } else {
      this.hideCopytoActualDate = false;
    }
  }
  public copytoActualDate(dueDate: Date, j: number, i: number, item: any) {
    dueDate = new Date(dueDate);
    // item.groupTransactionList.dateOfPayment = dueDate;
    this.transactionDetail[0].groupTransactionList[i].dateOfPayment = dueDate;
    this.PreviousEmployeeService.dateOfPayment = this.transactionDetail[0].groupTransactionList[
      i
    ].dateOfPayment;
    // this.dateOfPayment = dueDate;
    alert('hiiii');
    console.log('Date OF PAyment' + this.PreviousEmployeeService.dateOfPayment);
  }

  // When Edit of Document Details
  public declarationEditUpload(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.Service.getPPFTransactionByProofSubmissionId(
      proofSubmissionId
    ).subscribe((res) => {
      console.log('edit Data:: ', res);
      this.urlArray =
        res.data.results[0].documentInformation[0].documentDetailList;
      this.editTransactionUpload =
        res.data.results[0].investmentGroupTransactionDetail;
      this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
      this.editReceiptAmount = res.data.results[0].receiptAmount;
      this.grandDeclarationTotalEditModal =
        res.data.results[0].grandDeclarationTotal;
      this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotalEditModal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotalEditModal = res.data.results[0].grandApprovedTotal;
      // console.log(this.urlArray);
      this.urlArray.forEach((element) => {
        // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
        element.blobURI = 'data:image/image;base64,' + element.blobURI;
        // new Blob([element.blobURI], { type: 'application/octet-stream' });
      });
      // console.log('converted:: ', this.urlArray);
    });
  }

  public nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  public previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  public docViewer(template3: TemplateRef<any>) {
    this.urlIndex = 0;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    console.log(this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  public ComputationforIncome(
    template5: TemplateRef<any>,
    lossIncomeAmountCalculation1: any
  ) {
    console.log('In Template 5', lossIncomeAmountCalculation1);
    this.lossIncomeAmountCalculation = lossIncomeAmountCalculation1;

    this.modalRef = this.modalService.show(
      template5,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  // Common Function for filter to call API
  public getTransactionFilterData(property: String) {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.HousingLoanService.getHousePropertyFilterData(property).subscribe(
      (res) => {
        console.log('getHousePropertyFilterData', res);
        this.transactionDetail =
          res.data.results[0].housePropertyTransactionDetailList;
        this.documentDetailList =
          res.data.results[0].housePropertyTransactionDocumentDetailList;
        // this.previousEmployeeList =  this.transactionDetail.;
        // this.grandActualTotal = res.data.results[0].grandActualTotal;
        // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        // this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].groupTransactionList.length;
        console.log('transactionDetail', this.transactionDetail);
        this.initialArrayIndex = [];

        /*   this.transactionDetail.forEach((element) => {
        this.initialArrayIndex.push(element.groupTransactionList.length);

        element.groupTransactionList.forEach((innerElement) => {
          if (innerElement.dateOfPayment !== null) {
            innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
          }

          // if(this.employeeJoiningDate < innerElement.dueDate) {
          //   innerElement.active = false;
          // }
          if (innerElement.isECS === 0) {
            this.glbalECS === 0;
          } else if (innerElement.isECS === 1) {
            this.glbalECS === 1;
          } else {
            this.glbalECS === 0;
          }
          innerElement.declaredAmount = this.numberFormat.transform(
            innerElement.declaredAmount,
          );
          innerElement.actualAmount = this.numberFormat.transform(
            innerElement.actualAmount,
          );
        });
      }); */
      }
    );
  }

  // tslint:disable-next-line: typedef
  public uploadUpdateTransaction() {
    // this.editTransactionUpload.forEach((element) => {
    //   this.uploadGridData.push(element.investmentGroup1TransactionId);
    // });
    this.editTransactionUpload.forEach((element) => {
      element.groupTransactionList.forEach((innerElement) => {
        if (innerElement.declaredAmount !== null) {
          innerElement.declaredAmount = innerElement.declaredAmount
            .toString()
            .replace(',', '');
        } else {
          innerElement.declaredAmount = 0.0;
        }
        if (innerElement.actualAmount !== null) {
          innerElement.actualAmount = innerElement.actualAmount
            .toString()
            .replace(',', '');
        } else {
          innerElement.actualAmount = 0.0;
        }

        const dateOfPaymnet = this.datePipe.transform(
          innerElement.dateOfPayment,
          'yyyy-MM-dd'
        );
        const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd'
        );

        innerElement.dateOfPayment = dateOfPaymnet;
        innerElement.dueDate = dueDate;
        this.uploadGridData.push(innerElement.investmentGroup1TransactionId);
      });
    });
    console.log('Group transaction', this.uploadGridData);
    this.editTransactionUpload.forEach((element) => {
      element.groupTransactionList.forEach((innerElement) => {
        const dateOfPaymnet = this.datePipe.transform(
          innerElement.dateOfPayment,
          'yyyy-MM-dd'
        );
        innerElement.dateOfPayment = dateOfPaymnet;
      });
    });
    const data = {
      investmentGroupTransactionDetail: this.editTransactionUpload,
      groupTransactionIDs: this.uploadGridData,
      documentRemark: this.documentRemark,
      proofSubmissionId: this.editProofSubmissionId,
      receiptAmount: this.editReceiptAmount,
    };
    console.log('data::', data);
    this.Service.uploadPPFTransactionwithDocument(
      this.editfilesArray,
      data
    ).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.alertService.sweetalertMasterSuccess(
          'Transaction Saved Successfully.',
          ''
        );
        this.transactionDetail =
          res.data.results[0].investmentGroupTransactionDetail;
        this.documentDetailList = res.data.results[0].documentInformation;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(element.groupTransactionList.length);

          element.groupTransactionList.forEach((innerElement) => {
            if (innerElement.dateOfPayment !== null) {
              innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
            }

            if (innerElement.isECS === 0) {
              this.glbalECS === 0;
            } else if (innerElement.isECS === 1) {
              this.glbalECS === 1;
            } else {
              this.glbalECS === 0;
            }
            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount
            );
            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount
            );
          });
        });
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    });
    this.currentFileUpload = null;
    this.editfilesArray = [];
  }

  public downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.Service.getPPFTransactionByProofSubmissionId(
      proofSubmissionId
    ).subscribe((res) => {
      console.log('edit Data:: ', res);
      this.urlArray =
        res.data.results[0].documentInformation[0].documentDetailList;
      this.urlArray.forEach((element) => {
        element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
          element.blobURI
        );
      });
      console.log(this.urlArray);
    });
  }

  public setDateOfPayment(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    this.transactionDetail[j].groupTransactionList[i].dateOfPayment =
      summary.dateOfPayment;
    console.log(
      this.transactionDetail[j].groupTransactionList[i].dateOfPayment
    );
  }
}

class PreviousEmployeeService {
  public investmentGroup1TransactionId = 0;
  public licMasterPaymentDetailsId: number;
  public previousEmployerId = 0;
  public dueDate: Date;
  public declaredAmount: number;
  public dateOfPayment: Date;
  public actualAmount: number;
  public isECS: 0;
  public transactionStatus: 'Pending';
  public amountRejected: number;
  public amountApproved: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}

