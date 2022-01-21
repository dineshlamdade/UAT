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
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-housingloandeclaration',
  templateUrl: './housingloandeclaration.component.html',
  styleUrls: ['./housingloandeclaration.component.scss'],
})
export class HousingloandeclarationComponent implements OnInit {
  // @Input() public houseDescription: number;
  @Input() public houseDescription: string;
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
  public totaldeclaredAmount: any;
  public totalactualAmount: any;
  public futureNewPolicydeclaredAmount: string;

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
  public editfilesArray: File[] = [];
  public editRentalIncomeReceipt: File[] = [];
  public editMunicipalTaxReceipt: File[] = [];
  public editBankCertificate: File[] = [];

  public documentRemark: any;
  public isECS = true;
  public hideCopytoActualDate = false;
  public shownewRow = false;
  public initialArray = true;
  public initialArrayIndex: number[] = [];

  public selfOccupied = true;

  public PreviousEmployeeService: PreviousEmployeeService;
  public displayUploadFile = false;
  public uploadedFiles: any[] = [];
  public viewTransactionDetail = true;
  public masterUploadFlag = true;

  public dateOfPaymentGlobal: Date;
  public actualAmountGlobal: Number;
  public dueDate: Date;
  public dateOfPayment: Date;
  public date3: Date;
  public loaded = 0;
  public selectedFiles: FileList;
  public currentFileUpload: File;
  public bankCertificate: File[] = [];
  public rentalIncomeReceipt: File[] = [];
  public municipalTaxReceipt: File[] = [];
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
  public proofSubmissionId: '';
  public transactionStatustList: any;
  public allPropertyNames: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: any;
  public globalSelectedAmount: number = 0;
  public globalSelectedAmountRental: number = 0;
  public globalSelectedAmountMunicipal: number = 0;
  public canEdit: boolean;
  transactionDetailEdit: any;
  edithousePropertyMasterId: any;
  housePropertyTransactionDetailList: any;
  documentRemarkList: any;
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  remarkType: any;
  enteredRemark: any;
  //public editProofSubmissionIdOnView: any;
  public createDateTime: any;
  public lastModifiedDateTime: any;
  public transactionStatus: any;
  rentReceiptBankStatement: boolean = false;
  viewDocumentName: any;
  viewDocumentType: any;
  bankDocumentPassword =[];
  bankRemarkList =[];
  rentDocumentPassword =[];
  rentRemarkList =[];
  municipleDocumentPassword =[];
  municipleRemarkList =[];
  showUsageType =[];
  userData: any;

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
    public sanitizer: DomSanitizer,
    public authService: AuthService
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
    this.globalSelectedAmount = 0;
    this.globalSelectedAmountRental = 0;
    this.globalSelectedAmountMunicipal = 0;

    this.previousEmpParticularList = [
      { label: 'House Loan Benefit', value: 'houseLoanBenefit' },
      { label: 'Principal Repayment', value: 'principalRepayment' },
      { label: 'Stamp Duty and Registration Charges', value: 'stampDutyRegistrationAmount'},

      // { label: 'House Loan Benefit', value: 'houseLoanBenefit' },
      // { label: 'Principal Repayment', value: 'principalRepayment' },

    ];
    console.log('previousEmpParticularList', this.previousEmpParticularList);
  }

  public ngOnInit(): void {
    console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      const input = this.data;
      this.allPropertyNames = input.houseDescription;
      this.globalPolicy = input.policyNo;
      this.getInstitutionListWithPolicyNo();
      console.log('houseDescription', this.houseDescription);
      console.log('houseDescription', this.houseDescription);
      this.getTransactionFilterData(input.houseDescription);
      this.isDisabled = false;
      this.canEdit = input.canEdit;
    }
    this.userData = this.authService.getprivileges();

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
    this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
      i
    ].previousEmployerId = event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i]
        .previousEmployerId
    );
  }

  public OnParticularsChange(event: any, i:number, j:number){
    console.log("OnParticularsChange event");
    this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i].particulars = event.target.value;
    console.log("OnParticularsChange", this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i].particulars)
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
    this.globalSelectedAmount;
    this.globalSelectedAmountRental;
    this.globalSelectedAmountMunicipal;

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

  // *ngIf="transactionDetail[0].housePropertyUsageTypeList[0].usageType === 'selfOccupied'"
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
    console.log('data On Select', data);
    const checked = event.target.checked;
    console.log('onSelectCheckBox', i, j);

    let formatedactualAmount = 0;
    let formatedSelectedAmount = 0;

    if (data.particulars == 'InterestAmount') {
      this.globalSelectedAmount = formatedSelectedAmount;
    } else if (data.particulars == 'Rent') {
      this.globalSelectedAmountRental = formatedSelectedAmount;
    } else if (data.particulars == 'MunicipalTax') {
      this.globalSelectedAmountMunicipal = formatedSelectedAmount;
    }

    console.log('formatedGlobalSelectedValue', this.globalSelectedAmount);
    console.log('globalSelectedAmountRental', this.globalSelectedAmountRental);
    console.log(
      'globalSelectedAmountMunicipal',
      this.globalSelectedAmountMunicipal
    );

    const formatedGlobalSelectedValue = this.globalSelectedAmount;
    // this.globalSelectedAmount === 0
    //   ? this.globalSelectedAmount
    //   : this.globalSelectedAmount;

    const formatedGlobalSelectedRentalValue = this.globalSelectedAmountRental;
    // this.globalSelectedAmountRental === 0
    //   ? this.globalSelectedAmountRental
    //   : this.globalSelectedAmountRental;

    const formatedGlobalSelectedMunicipleValue = this
      .globalSelectedAmountMunicipal;
    // this.globalSelectedAmountMunicipal === 0
    //   ? this.globalSelectedAmountMunicipal
    //   : this.globalSelectedAmountMunicipal;
      
    if (checked) {
      this.transactionDetail[j].housePropertyTransactionList[i].actualAmount =
        data.declaredAmount;

      formatedactualAmount = Number(
        this.transactionDetail[j].housePropertyTransactionList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      console.log('formatedactualAmount', formatedactualAmount);

      formatedSelectedAmount =
        (data.particulars == 'InterestAmount'
          ? formatedGlobalSelectedValue
          : data.particulars == 'Rent'
          ? formatedGlobalSelectedRentalValue
          : data.particulars == 'MunicipalTax'
          ? formatedGlobalSelectedMunicipleValue
          : 0) + formatedactualAmount;

      //  if (data.particulars == 'InterestAmount') {
      //   formatedSelectedAmount = formatedGlobalSelectedValue + formatedactualAmount;
      // }
      //   else if (data.particulars == 'Rent') {
      //     formatedSelectedAmount = formatedGlobalSelectedRentalValue + formatedactualAmount;
      // }
      //  else if (data.particulars == 'MunicipalTax') {
      //   formatedSelectedAmount = formatedGlobalSelectedMunicipleValue + formatedactualAmount;
      // }

      this.uploadGridData.push(data.housePropertyTransactionId);
    } else {
      formatedactualAmount = Number(
        this.transactionDetail[j].housePropertyTransactionList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].housePropertyTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      const index = this.uploadGridData.indexOf(
        data.housePropertyTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }
    // this.globalSelectedAmount ;
    if (data.particulars == 'InterestAmount') {
      this.globalSelectedAmount = formatedSelectedAmount;
    } else if (data.particulars == 'Rent') {
      this.globalSelectedAmountRental = formatedSelectedAmount;
    } else if (data.particulars == 'MunicipalTax') {
      this.globalSelectedAmountMunicipal = formatedSelectedAmount;
    }

    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[j].housePropertyTransactionList.forEach(
      (element) => {
        console.log(element.actualAmount.toString().replace(/,/g, ''));
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
      item.housePropertyTransactionList.forEach((element) => {
        this.uploadGridData.push(element.housePropertyTransactionId);
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // -------- ON select to check input boxex--------
  public onSelectCheckBoxPrevious(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    const checked = event.target.checked;
    console.log('onSelectCheckBox', i, j);

    // const formatedGlobalSelectedValue = Number(
    //   this.globalSelectedAmount === '0'
    //     ? this.globalSelectedAmount
    //     : this.globalSelectedAmount.toString().replace(/,/g, '')
    // );

    // this.globalSelectedAmount === '0'

    let formatedactualAmount = 0;
    let formatedSelectedAmount: number;

    this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
      i
    ].actualAmount = data.actualAmount;

    if (checked) {
      // console.log('item' ,item);

      console.log('actualAmount');
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
        i
      ].actualAmount = data.actualAmount;

      formatedactualAmount = Number(
        this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      // formatedSelectedAmount = this.numberFormat.transform(
      //   formatedGlobalSelectedValue + formatedactualAmount
      // );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.housePropertyTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedactualAmount = Number(
        this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      // this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i].dateOfPayment = null;

      // formatedSelectedAmount = this.numberFormat.transform(
      //   formatedGlobalSelectedValue - formatedactualAmount
      // );

      // formatedSelectedAmount = this.formatedGlobalSelectedValue - formatedactualAmount
      console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.housePropertyTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount;
    // this.globalSelectedAmount = formatedSelectedAmount;
    // console.log('this.globalSelectedAmountPrev::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[
      j
    ].housePropertyTransactionPreviousEmployerList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
  }

  ondeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      actualAmount: any;
    },
    i: number,
    j: number
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    this.transactionDetail[j].housePropertyTransactionList[
      i
    ].declaredAmount = this.PreviousEmployeeService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].housePropertyTransactionList[i]
        .declaredAmount
    );
    this.transactionDetail[j].housePropertyTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;
    this.declarationTotal = 0;
    this.transactionDetail[j].housePropertyTransactionList.forEach(
      (element) => {
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
        );
      }
    );
    this.transactionDetail[j].declarationTotal = this.declarationTotal;
  }

  // // --------------- ON change of declared Amount in line-------------
  // ondeclaredAmountChange(
  //   summary: {
  //     previousEmployerName: any;
  //     declaredAmount: number;
  //     dateOfPayment: Date;
  //     actualAmount: any;
  //     dueDate: Date;
  //   },
  //   i: number,
  //   j: number
  // ) {
  //   this.PreviousEmployeeService = new PreviousEmployeeService(summary);
  //   // console.log('Ondeclaration Amount change' + summary.declaredAmount);

  //   this.transactionDetail[j].housePropertyTransactionList[
  //     i
  //   ].declaredAmount = this.PreviousEmployeeService.declaredAmount;
  //   const formatedDeclaredAmount = this.numberFormat.transform(
  //     this.transactionDetail[j].housePropertyTransactionList[i].declaredAmount
  //   );
  //   // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
  //   this.transactionDetail[j].housePropertyTransactionList[
  //     i
  //   ].declaredAmount = formatedDeclaredAmount;

  //   this.declarationTotal = 0;
  //   // this.declaredAmount=0;

  //   this.transactionDetail[j].housePropertyTransactionList.forEach(
  //     (element) => {
  //       // console.log(element.declaredAmount.toString().replace(',', ''));
  //       this.declarationTotal += Number(
  //         element.declaredAmount.toString().replace(',', '')
  //       );
  //       // console.log(this.declarationTotal);
  //       // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ''));
  //     }
  //   );

  //   this.transactionDetail[j].declarationTotal = this.declarationTotal;
  //   // console.log( 'DeclarATION total==>>' + this.transactionDetail[j].declarationTotal);
  // }



   // ------------Actual Amount change-----------
   onactualAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      // dateOfPayment: Date;
      actualAmount: number;
      // dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    this.transactionDetail[j].housePropertyTransactionList[i].actualAmount = this.PreviousEmployeeService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].housePropertyTransactionList[i]
        .actualAmount
    );
    this.transactionDetail[j].housePropertyTransactionList[i].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].housePropertyTransactionList[i]
        .actualAmount !== Number(0) ||
      this.transactionDetail[j].housePropertyTransactionList[i]
        .actualAmount !== null
    ) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }

    this.actualTotal = null;
    this.actualAmount = null;
    this.transactionDetail[j].housePropertyTransactionList.forEach(
      (element) => {
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
        // console.log(this.actualTotal);
        // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.transactionDetail[j].actualTotal = this.actualTotal;
  }

  // ------------Actual Amount change-----------
  public onActualAmountChangePre(
    summary: {
      previousEmployerName: any;
      particulars: string;
      // dateOfPayment: Date;
      actualAmount: number;
      // dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    // console.log("Actual Amount change::" , summary);

    this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
      i
    ].actualAmount = this.PreviousEmployeeService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i].actualAmount);
    const formatedactualAmount = this.numberFormat.transform(
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i]
        .actualAmount
    );
    // console.log(`formatedactualAmount::`,formatedactualAmount);
    this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[
      i
    ].actualAmount = formatedactualAmount;

    if (
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i]
        .actualAmount !== Number(0) ||
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i]
        .actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].housePropertyTransactionPreviousEmployerList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.transactionDetail[
      j
    ].housePropertyTransactionPreviousEmployerList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail[j].actualTotal = this.actualTotal;
  }

  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  public addRowInList(
    summarynew: {
      housePropertyTransactionId: number;
      // licMasterPaymentDetailsId: number;
      previousEmployerId: number;
      particulars: string;
      // declaredAmount: any;
      // dateOfPayment: Date;
      actualAmount: any;
      // isECS: number;
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
    this.PreviousEmployeeService.housePropertyTransactionId = this.globalAddRowIndex;
    // this.PreviousEmployeeService.declaredAmount = null;
    this.PreviousEmployeeService.particulars = null;
    this.PreviousEmployeeService.actualAmount = null;
    // this.PreviousEmployeeService.dateOfPayment = null;
    // this.PreviousEmployeeService.isECS = 0;
    this.PreviousEmployeeService.transactionStatus = 'Pending';
    this.PreviousEmployeeService.rejectedAmount = 0.0;
    this.PreviousEmployeeService.approvedAmount = 0.0;
    this.PreviousEmployeeService.remark = null;
    // this.PreviousEmployeeService.licMasterPaymentDetailsId = this.transactionDetail[
    //   j
    // ].housePropertyTransactionList[0].licMasterPaymentDetailsId;
    this.transactionDetail[j].housePropertyTransactionPreviousEmployerList.push(
      this.PreviousEmployeeService
    );
    console.log(
      'addRow::',
      this.transactionDetail[j].housePropertyTransactionPreviousEmployerList
    );
  }

  public sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  public sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  public deleteRow(j: number) {
    const rowCount =
      this.transactionDetail[j].housePropertyTransactionList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.transactionDetail[j].housePropertyTransactionList.length === 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].housePropertyTransactionList.splice(
        rowCount,
        1
      );
      return true;
    }
  }

  public editDeclrationRow(
    summary: {
      previousEmployerName: any;
      declaredAmount: any;
      // dateOfPayment: any;
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
      this.transactionDetail[j].housePropertyTransactionList[i].actualAmount;
    this.transactionDetail[j].housePropertyTransactionList[
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
    this.transactionDetail[j].housePropertyTransactionList.push(
      this.PreviousEmployeeService
    );
    this.PreviousEmployeeService = new PreviousEmployeeService();
  }

  public submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.housePropertyTransactionList.forEach((element) => {
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
        res.data.results[0].housePropertyTransactionDetailList;
      this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      this.transactionDetail.forEach((element) => {
        element.housePropertyTransactionList.forEach((element) => {
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

  // onUpload(event) {
  //   console.log('event::', event);
  //   if (event.target.files.length > 0) {
  //     for (const file of event.target.files) {
  //       this.filesArray.push(file);
  //     }
  //   }
  //   console.log(this.filesArray);
  // }

  public onUpload(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.bankCertificate.push(file);
      }
    }
    console.log(this.bankCertificate);
  }

  public onUploadRental(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.rentalIncomeReceipt.push(file);
      }
    }
    console.log(this.rentalIncomeReceipt);
  }

  public UploadModalRental(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  public onUploadMuniciple(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.municipalTaxReceipt.push(file);
      }
    }
    console.log(this.municipalTaxReceipt);
  }

  public UploadModalMuniciple(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  public onMasterUpload(
    event: { target: { files: string | any[] } },
    docType: string
  ) {
    console.log('event::', event);
    console.log('docType::', docType);

    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        switch (docType) {
          case 'bankCertificate':
            this.bankCertificate.push(file);
            break;
          case 'rentalIncomeReceipt':
            this.rentalIncomeReceipt.push(file);
            break;
          case 'municipalTaxReceipt':
            this.municipalTaxReceipt.push(file);
            break;
        }
      }
      // console.log('this.propertyIndex::', this.propertyIndex);
    }
  }

  public onUploadInEditCaseBank(event) {
    console.log('onUploadInEditCaseevent::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editBankCertificate.push(file);
      }
    }
    console.log('onUploadInEditCase::', this.editBankCertificate);
  }

  public onUploadInEditCaseMunciple(event) {
    console.log('onUploadInEditCaseevent::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editMunicipalTaxReceipt.push(file);
      }
    }
    console.log('onUploadInEditCase::', this.editMunicipalTaxReceipt);
  }

  public onUploadInEditCaseRental(event) {
    console.log('onUploadInEditCaseevent::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editRentalIncomeReceipt.push(file);
      }
    }
    console.log('onUploadInEditCase::', this.editRentalIncomeReceipt);
  }

  public removeDocument() {
    this.currentFileUpload = null;
  }

  // Remove Selected LicTransaction Document
  public removeSelectedLicTransactionDocument(index: number) {
    this.bankCertificate.splice(index, 1);
    console.log('this.bankCertificate::', this.bankCertificate);
    console.log('this.bankCertificate.size::', this.bankCertificate.length);
  }

  // Remove Selected LicTransaction Document
  public removeSelectedTransactionDocumentRental(index: number) {
    this.rentalIncomeReceipt.splice(index, 1);
    console.log('this.rentalIncomeReceipt::', this.rentalIncomeReceipt);
    console.log(
      'this.rentalIncomeReceipt.size::',
      this.rentalIncomeReceipt.length
    );
  }

  // Remove Selected LicTransaction Document
  public removeSelectedTransactionDocumentMunciple(index: number) {
    this.municipalTaxReceipt.splice(index, 1);
    console.log('this.municipalTaxReceipt::', this.municipalTaxReceipt);
    console.log(
      'this.municipalTaxReceipt.size::',
      this.municipalTaxReceipt.length
    );
  }

  public removeSelectedTransactionDocumentInEditCaseBank(index: number) {
    this.editBankCertificate.splice(index, 1);
    console.log('this.editBankCertificate::', this.editBankCertificate);
    console.log(
      'this.editBankCertificate.size::',
      this.editBankCertificate.length
    );
  }

  public removeSelectedLicTransactionDocumentInEditCaseMuniciple(
    index: number
  ) {
    this.editMunicipalTaxReceipt.splice(index, 1);
    console.log('this.editMunicipalTaxReceipt::', this.editMunicipalTaxReceipt);
    console.log(
      'this.editMunicipalTaxReceipt.size::',
      this.editMunicipalTaxReceipt.length
    );
  }

  public removeSelectedLicTransactionDocumentInEditCaseRental(index: number) {
    this.editRentalIncomeReceipt.splice(index, 1);
    console.log('this.editRentalIncomeReceipt::', this.editRentalIncomeReceipt);
    console.log(
      'this.editRentalIncomeReceipt.size::',
      this.editRentalIncomeReceipt.length
    );
  }

  public upload() {
    if (
      this.bankCertificate.length === 0 &&
      this.rentalIncomeReceipt.length === 0 &&
      this.municipalTaxReceipt.length === 0
    ) {
      this.alertService.sweetalertWarning(
        'Please attach Premium Receipt / Premium Statement.'
      );
      console.log('urlArray.length', this.urlArray.length);
      return;
    }
    if(!this.iAgree)
    {
      this.alertService.sweetalertWarning(
        'Please acccept the terms and conditions by selecting i agree.'
      );
      return;
    }

    // if (this.filesArray.length === 0) {
    //   this.alertService.sweetalertError(
    //     'Please attach Premium Receipt / Premium Statement'
    //   );
    //   return;
    // }

    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      element.housePropertyTransactionList.forEach((innerElement) => {
        if (innerElement.declaredAmount !== null) {
          innerElement.declaredAmount = innerElement.declaredAmount
            .toString()
            .replace(/,/g, '');
          console.log(
            'innerElement.declaredAmount',
            innerElement.declaredAmount
          );
        } else {
          innerElement.declaredAmount = 0.0;
        }
        if (innerElement.actualAmount !== null) {
          innerElement.actualAmount = innerElement.actualAmount
            .toString()
            .replace(/,/g, '');
          console.log('innerElement.actualAmount', innerElement.actualAmount);
        } else {
          innerElement.actualAmount = 0.0;
        }
      });

      element.housePropertyTransactionPreviousEmployerList.forEach(
        (element) => {
          element.declaredAmount = 0.0;

          if (element.actualAmount !== null) {
            element.actualAmount = element.actualAmount
              .toString()
              .replace(/,/g, '');
            console.log('element.actualAmount', element.actualAmount);
          } else {
            element.actualAmount = 0.0;
          }
        }
      );
    });

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      housePropertyMasterId: this.transactionDetail[0].housePropertyMasterId,
      housePropertyTransactionIds: this.uploadGridData,
      housePropertyTransactionList: this.transactionDetail[0].housePropertyTransactionList,
      housePropertyTransactionPreviousEmployerList: this.transactionDetail[0].housePropertyTransactionPreviousEmployerList,
      receiptAmount: this.receiptAmount,
      receiptNumber: '',
      receiptDate: '',
      proofSubmissionId: '',
    };

    
    console.log('data::', data);
    this.HousingLoanService.uploadTransactionWithMultipleFiles(
      this.bankCertificate,
      this.rentalIncomeReceipt,
      this.municipalTaxReceipt,
      data
    ).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.transactionDetail =
          res.data.results[0].housePropertyTransactionDetailList;
        this.documentDetailList =
          res.data.results[0].housePropertyTransactionDocumentDetailList;
        console.log('transactionDetail', this.transactionDetail);

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(element.housePropertyTransactionList.length);

          element.housePropertyTransactionList.forEach((innerElement) => {

            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount
            );
            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount
            );
          });

          this.initialArrayIndex.push(
            element.housePropertyTransactionPreviousEmployerList.length
          );

          element.housePropertyTransactionPreviousEmployerList.forEach(
            (element) => {
              element.actualAmount = this.numberFormat.transform(
                element.actualAmount
              );
            }
          );
        });

        this.alertService.sweetalertMasterSuccess(
          'Transaction Saved Successfully.',
          ''
        );
        this.iAgree = false;
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    });
    this.receiptAmount = '0.00';
    this.bankCertificate = [];
    this.rentalIncomeReceipt = [];
    this.municipalTaxReceipt = [];

    this.globalSelectedAmount;
    // this.globalSelectedAmount
    // this.globalSelectedAmount = '0.00';
    this.globalSelectedAmountRental = 0;
    this.globalSelectedAmountMunicipal = 0;
  }

  // public changeReceiptAmountFormatABC() {
  //   let receiptAmount_: number;
  //   let globalSelectedAmount_: number;

  //   receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
  //   // globalSelectedAmount_ = parseFloat(
  //   //   this.globalSelectedAmount.replace(/,/g, '')
  //   // );

  //   globalSelectedAmount_ =this.globalSelectedAmount;

  //   console.log(receiptAmount_);
  //   console.log(globalSelectedAmount_);
  //   if (receiptAmount_ < globalSelectedAmount_) {
  //     this.alertService.sweetalertError(
  //       'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
  //     );
  //   } else if (receiptAmount_ > globalSelectedAmount_) {
  //     console.log(receiptAmount_);
  //     console.log(globalSelectedAmount_);
  //     this.alertService.sweetalertWarning(
  //       'Receipt Amount is greater than Selected line Actual Amount'
  //     );
  //   }
  //   this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
  // }

  public changeReceiptAmountFormat() {
    let receiptAmount_: number;
    let globalSelectedAmount_: number;

    receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
    // globalSelectedAmount_ = parseFloat(
    //   this.globalSelectedAmount.replace(/,/g, '')
    // );

    globalSelectedAmount_ = this.globalSelectedAmount;

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

  public changeReceiptAmountFormatRental() {
    let receiptAmount_: number;
    let globalSelectedAmountRental: number;

    receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
    // globalSelectedAmountRental = parseFloat(
    //   this.globalSelectedAmountRental.replace(/,/g, '')
    // );

    console.log(receiptAmount_);
    console.log(globalSelectedAmountRental);
    if (receiptAmount_ < globalSelectedAmountRental) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines.'
      );
    } else if (receiptAmount_ > globalSelectedAmountRental) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmountRental);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount.'
      );
    }
    this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
  }

  public changeReceiptAmountFormatMunicipal() {
    let receiptAmount_: number;
    let globalSelectedAmountMunicipal: number;

    receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
    // globalSelectedAmountMunicipal = parseFloat(
    //   this.globalSelectedAmountMunicipal.replace(/,/g, '')
    // );

    console.log(receiptAmount_);
    console.log(globalSelectedAmountMunicipal);
    if (receiptAmount_ < globalSelectedAmountMunicipal) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
      );
    } else if (receiptAmount_ > globalSelectedAmountMunicipal) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmountMunicipal);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount'
      );
    }
    this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
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
  public deactiveCopytoActualDate() {
    if (this.isECS === false) {
      this.hideCopytoActualDate = true;
    } else {
      this.hideCopytoActualDate = false;
    }
  }

   // Update Previous Employee in Edit Modal
   updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].housePropertyTransactionList[i].previousEmployerId =
      event.target.value;
      this.editTransactionUpload[j].housePropertyTransactionPreviousEmployerList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].housePropertyTransactionList[i].previousEmployerId,

      this.editTransactionUpload[j].housePropertyTransactionPreviousEmployerList[i].previousEmployerId,
    );
  }


  // When Edit of Document Details
  public editViewTransaction(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.HousingLoanService.getTransactionByProofSubmissionId(
      proofSubmissionId
    ).subscribe((res) => {
      console.log('edit Data:: ', res);
      this.urlArray =
        res.data.results[0].housePropertyTransactionDocumentDetailList[0].documentDetailList;
      this.editTransactionUpload = res.data.results[0].housePropertyTransactionDetailList;
        this.edithousePropertyMasterId = res.data.results[0].housePropertyTransactionDetailList[0].housePropertyMasterId;
      this.editProofSubmissionId = res.data.results[0].housePropertyTransactionDocumentDetailList[0].proofSubmissionId;
      //this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
      this.createDateTime = res.data.results[0].housePropertyTransactionDocumentDetailList[0].documentDetailList[0].creationDate;
      this.lastModifiedDateTime = res.data.results[0].housePropertyTransactionDocumentDetailList[0].documentDetailList[0].lastModifiedTime;
      this.transactionStatus = res.data.results[0].housePropertyTransactionDocumentDetailList[0].documentDetailList[0].status;
      this.editReceiptAmount = res.data.results[0].receiptAmount;
      this.grandDeclarationTotalEditModal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotalEditModal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotalEditModal = res.data.results[0].grandApprovedTotal;
      // console.log(this.urlArray);
      this.urlArray.forEach((element) => {
        // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
        element.blobURI =  element.blobURI;
        //'data:image/image;base64,' +
        // new Blob([element.blobURI], { type: 'application/octet-stream' });
      });

      this.editTransactionUpload.forEach((element) => {
        element.housePropertyTransactionList.forEach((innerElement) => {
          innerElement.declaredAmount = this.numberFormat.transform(
            innerElement.declaredAmount,
          );
          innerElement.actualAmount = this.numberFormat.transform(
            innerElement.actualAmount,
          );
        });

        element.housePropertyTransactionPreviousEmployerList.forEach((innerElement1) => {
          innerElement1.declaredAmount = this.numberFormat.transform(
            innerElement1.declaredAmount,
          );
          innerElement1.actualAmount = this.numberFormat.transform(
            innerElement1.actualAmount,
          );
        });


      });

    });
  }


  public ComputationforIncome(
    template5: TemplateRef<any>,
    lossIncomeAmountCalculation1: any,
    showUsageType
  ) {
    console.log('In Template 5', lossIncomeAmountCalculation1);
    this.lossIncomeAmountCalculation = lossIncomeAmountCalculation1;
    
    this.showUsageType = showUsageType;

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
        this.transactionDetail = res.data.results[0].housePropertyTransactionDetailList;
        this.documentDetailList = res.data.results[0].housePropertyTransactionDocumentDetailList;
        console.log('transactionDetail', this.transactionDetail);
        this.initialArrayIndex = [];
        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(element.housePropertyTransactionList.length);

          element.housePropertyTransactionList.forEach((innerElement) => {

            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount
            );
            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount
            );
          });

          element.housePropertyUsageTypeList.forEach((innerElement)=>{
            if(innerElement.usageType != "selfOccupied")
            this.rentReceiptBankStatement = true;
            else if(property != "All"){
              this.rentReceiptBankStatement = false;

            }
          })

          this.initialArrayIndex.push(
            element.housePropertyTransactionPreviousEmployerList.length
          );

          element.housePropertyTransactionPreviousEmployerList.forEach(
            (element1) => {
              element1.actualAmount = this.numberFormat.transform(
                element1.actualAmount
              );
            }
          );
        });
      }
    );
  }


  onActualAmountChangeInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      // dateOfPayment: Date;
      actualAmount: any;
      // dueDate;
    },
    i: number,
    j:number,
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    this.editTransactionUpload[j].housePropertyTransactionList[i].actualAmount = this.PreviousEmployeeService.actualAmount;
    const formatedactualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].housePropertyTransactionList[i].actualAmount
    );
    console.log(`formatedactualAmount::`, formatedactualAmount);
    this.editTransactionUpload[j].housePropertyTransactionList[i].actualAmount = formatedactualAmount;

    // this.declarationTotal = 0;
    // this.editTransactionUpload[j].housePropertyTransactionList.forEach(
    //   (element) => {
    //     console.log(element.declaredAmount.toString().replace(',', ''));
    //     this.declarationTotal += Number(
    //       element.declaredAmount.toString().replace(/,/g, '')
    //     );
    //     console.log(this.declarationTotal);
    //   }
    // );
    // this.editTransactionUpload.declarationTotal = this.declarationTotal;
  }



  onActualAmountChangeInEditCasePreviousEMP(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      // dateOfPayment: Date;
      actualAmount: any;
      // dueDate;
    },
    i: number,
    j:number,
  ) {
    this.PreviousEmployeeService = new PreviousEmployeeService(summary);
    this.editTransactionUpload[j].housePropertyTransactionPreviousEmployerList[i].actualAmount = this.PreviousEmployeeService.actualAmount;
    const formatedactualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].housePropertyTransactionPreviousEmployerList[i].actualAmount
    );
    console.log(`formatedactualAmount::`, formatedactualAmount);
    this.editTransactionUpload[j].housePropertyTransactionPreviousEmployerList[i].actualAmount = formatedactualAmount;

    // this.declarationTotal = 0;
    // this.editTransactionUpload[j].housePropertyTransactionList.forEach(
    //   (element) => {
    //     console.log(element.declaredAmount.toString().replace(',', ''));
    //     this.declarationTotal += Number(
    //       element.declaredAmount.toString().replace(/,/g, '')
    //     );
    //     console.log(this.declarationTotal);
    //   }
    // );
    // this.editTransactionUpload.declarationTotal = this.declarationTotal;
  }

  // tslint:disable-next-line: typedef
  public uploadUpdateTransaction() {
    // this.editTransactionUpload.forEach((element) => {
    //   this.uploadGridData.push(element.housePropertyTransactionId);
    // });

    this.editTransactionUpload.forEach((element) => {
      element.housePropertyTransactionList.forEach((innerElement1) => {
        if (innerElement1.declaredAmount !== null) {
          innerElement1.declaredAmount = innerElement1.declaredAmount
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement1.declaredAmount = 0.0;
        }
        if (innerElement1.actualAmount !== null) {
          innerElement1.actualAmount = innerElement1.actualAmount
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement1.actualAmount = 0.0;
        }

        this.uploadGridData.push(innerElement1.housePropertyTransactionId);
        delete innerElement1.proofSubmissionId;
      });

      element.housePropertyTransactionPreviousEmployerList.forEach((innerElement) => {
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

        this.uploadGridData.push(innerElement.housePropertyTransactionId);
        delete innerElement.proofSubmissionId;
      });

    });


    const data = {
      housePropertyTransactionIds: this.uploadGridData,
      proofSubmissionId: this.editProofSubmissionId,
      receiptAmount: this.editReceiptAmount,
      housePropertyMasterId: this.editTransactionUpload[0].housePropertyMasterId,
      housePropertyTransactionList: this.editTransactionUpload[0].housePropertyTransactionList,
      housePropertyTransactionPreviousEmployerList: this.editTransactionUpload[0].housePropertyTransactionPreviousEmployerList,
    };


    console.log("this.editTransactionUpload",this.editTransactionUpload);


    console.log('data::', data);
    this.HousingLoanService.uploadTransactionWithMultipleFiles(
      this.editBankCertificate,
      this.editRentalIncomeReceipt,
      this.editMunicipalTaxReceipt,
      data
    ).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.transactionDetail = res.data.results[0].housePropertyTransactionDetailList;
        this.documentDetailList = res.data.results[0].housePropertyTransactionDocumentDetailList;
        console.log('transactionDetail', this.transactionDetail);

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(
            element.housePropertyTransactionList.length
          );

          element.housePropertyTransactionList.forEach((item) => {
            item.declaredAmount = this.numberFormat.transform(
              item.declaredAmount
            );
            item.actualAmount = this.numberFormat.transform(item.actualAmount);
          });
          this.initialArrayIndex.push(
            element.housePropertyTransactionPreviousEmployerList.length
          );

          element.housePropertyTransactionPreviousEmployerList.forEach(
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
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    });
    this.currentFileUpload = null;
    this.editRentalIncomeReceipt = [];
    this.editMunicipalTaxReceipt = [];
    this.editBankCertificate = [];
  }

  public downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.HousingLoanService.getTransactionByProofSubmissionId(proofSubmissionId)
    .subscribe((res) => {
      console.log('edit Data:: ', res);
      this.urlArray = res.data.results[0].housePropertyTransactionDocumentDetailList[0].documentDetailList;
      this.urlArray.forEach((element) => {
        element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
          element.blobURI
        );
      });
      console.log(this.urlArray);
    });

  }

  // public setDateOfPayment(
  //   summary: {
  //     previousEmployerName: any;
  //     declaredAmount: number;
  //     dateOfPayment: Date;
  //     actualAmount: number;
  //     dueDate: any;
  //   },
  //   i: number,
  //   j: number
  // ) {
  //   this.transactionDetail[j].housePropertyTransactionList[i].dateOfPayment =
  //     summary.dateOfPayment;
  //   console.log(
  //     this.transactionDetail[j].housePropertyTransactionList[i].dateOfPayment
  //   );
  // }

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

  docViewer(template3: TemplateRef<any>, documentDetailList: any) {
    console.log('documentDetailList::', documentDetailList);
    this.urlArray = documentDetailList;
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


  // public usageTypeShowAndHide() {
  //   if (this.isECS === false) {
  //     this.hideCopytoActualDate = true;
  //   } else {
  //     this.hideCopytoActualDate = false;
  //   }
  // }

  // *ngIf="transactionDetail[0].housePropertyUsageTypeList[0].usageType !== 'selfOccupied'"/
  public remarkModal(
    remarkType,
    templateViewer: TemplateRef<any>,    
    transactionID,
    summary, count
  ) {
    
    this.enteredRemark = null;
    this.summaryDetails = summary;
    this.indexCount = count;
    this.remarkType = remarkType;
    if(remarkType=='Transaction'){
    this.Service.getHousePropertyTransactionRemarkList(
      transactionID,
    ).subscribe((res) => {
      console.log('docremark', res);
      
    
    this.documentRemarkList  = res.data.results[0];
    this.remarkCount = res.data.results[0].length;
    });
  } else if(remarkType == 'PreviousEmployer') {
    this.Service.getHousePropertyTransactionRemarkList(
      transactionID,
    ).subscribe((res) => {
      console.log('docremark', res);
      
    
    this.documentRemarkList  = res.data.results[0];
    this.remarkCount = res.data.results[0].length;
    });
  }
    // console.log('documentDetail::', documentRemarkList);
    // this.documentRemarkList = this.selectedRemarkList;
    //console.log('this.documentRemarkList', this.documentRemarkList);
    this.modalRef = this.modalService.show(
      templateViewer,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  public onChangeDocumentRemark(transactionDetail, transIndex, event) {
     
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);
    if(this.remarkType == 'Transaction'){
    this.transactionDetail[0].housePropertyTransactionList[transIndex].remark =  event.target.value;
  }
  else if (this.remarkType == 'PreviousEmployer'){
    this.transactionDetail[0].housePropertyTransactionPreviousEmployerList[transIndex].remark =  event.target.value;
  }
  }
  
  onSaveRemarkDetails(transIndex){
    const data ={
      "transactionId": this.summaryDetails.housePropertyTransactionId,
      "masterId":0,
      "employeeMasterId":this.summaryDetails.employeeMasterId?this.summaryDetails.employeeMasterId:0 ,
      "section":"House",
      "subSection":"Loan",
      "remark":this.editRemarkData,
      "proofSubmissionId":this.summaryDetails.proofSubmissionId,
      "role":"Employee",
      "remarkType":"Transaction"
    };
    this.Service
    .postHousePropertyTransactionRemarkList(data)
    .subscribe((res) => {
      if(res.data.results.length) {
        this.alertService.sweetalertMasterSuccess(
          'Remark Saved Successfully.',
          '',
        );
        if(this.remarkType == 'Transaction'){
          this.transactionDetail[0].housePropertyTransactionList[transIndex].bubbleRemarkCount =  res.data.results[0].bubbleRemarkCount;
        }
        else if (this.remarkType == 'PreviousEmployer'){
          this.transactionDetail[0].housePropertyTransactionPreviousEmployerList[transIndex].bubbleRemarkCount =  res.data.results[0].bubbleRemarkCount;
        }
        this.modalRef.hide();
      } else{
        this.alertService.sweetalertWarning("Something Went Wrong");
      }
    });
}
onResetRemarkDetails(){
  this.enteredRemark=null;
}
public docViewer1(template3: TemplateRef<any>, index: any, data: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;
  // this.urlIndex = 0;
  this.viewDocumentName = data.documentName;
  this.viewDocumentType = data.documentType;

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
}

class PreviousEmployeeService {
  public housePropertyTransactionId = 0;
  public previousEmployerId = 0;
  public particulars: string;
  public declaredAmount: number;
  public actualAmount: number;
  public rejectedAmount: number;
  public approvedAmount: number;
  public transactionStatus: 'Pending';
  public remark: any;
  public bubbleRemarkCount: number;
  // public isECS: 0;
  // public dateOfPayment: Date;
  // public dueDate: Date;
  // public licMasterPaymentDetailsId: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
