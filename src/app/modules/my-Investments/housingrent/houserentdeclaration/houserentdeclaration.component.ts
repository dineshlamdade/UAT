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
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../file.service';
import { MyInvestmentsService } from '../../my-Investments.service';

import { HouseRentService } from '../house-rent.service';

@Component({
  selector: 'app-houserentdeclaration',
  templateUrl: './houserentdeclaration.component.html',
  styleUrls: ['./houserentdeclaration.component.scss'],
})
export class HouserentdeclarationComponent implements OnInit {
  @Input() public houseName: string;
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

  public transactionInstitutionNames: Array<any> = [];

  public transactionPropertyListNames: Array<any> = [];

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
  public paymentDate: Date;
  public date3: Date;
  public loaded = 0;

  public selectedFiles: FileList;
  public currentFileUpload: File;
  public rentReciept: File[] = [];
  public editrentRecieptArray: File[] = [];
  public masterfilesArray: File[] = [];

  /*  public receiptNumber: number; */
  public receiptNumber: null;

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
  public actualAmountPerMonth: number;
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
  summaryDetails: any;
  indexCount: any;
  selectedremarkIndex: any;
  documentRemarkList: any;
  remarkCount: any;
  editRemarkData: any;
  enteredRemark: string;
  createDateTime: any;
  documentArray: any;
  creationDate: any;
  lastModifiedTime: any;
  status: any;
  viewDocumentName: any;
  viewDocumentType: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private houseRentService: HouseRentService,
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

      this.getTransactionFilterData(input.propertyHouseName);
      this.isDisabled = false;
      this.canEdit = input.canEdit;
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    /* this.deactiveCopytoActualDate(); */

    // Get API call for All previous employee Names
    /*     this.Service.getpreviousEmployeName().subscribe((res) => {
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
    }); */

    // Get All Previous Employer
    /*    this.Service.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
        // console.log('employeeJoiningDate::',this.employeeJoiningDate);
      }
    });
*/

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

  // Update Previous Employee in Main Page
  /*   updatePreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.transactionDetail[j].houseRentalTransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].houseRentalTransactionList[i].previousEmployerId,
    );
  } */

  // Update Previous Employee in Edit Modal
  /*  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].houseRentalTransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].houseRentalTransactionList[i].previousEmployerId,
    );
  } */

  // ----------------------------------------------- Declaration --------------------------------------

  // -----------on Page referesh transactionStatustList------------
  /*   refreshTransactionStatustList() {
    this.transactionStatustList = [
      { label: 'All', value: 'All' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Submitted', value: 'Submitted' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Send back', value: 'Send back' },
    ];
  } */

  // ------- On declaration page get API call for All Institutions added into Master-------
  declarationPage() {
    this.transactionPropertyListNames = [];
    /*     this.transactionPolicyList = [];
    this.transactionStatustList = [];
 */
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPropertyListNames.push(data);
    this.transactionPolicyList.push(data);
    /*     this.refreshTransactionStatustList(); */

    this.getInstitutionListWithPolicyNo();

    this.resetAll();
    this.selectedTransactionInstName('All');
  }

  public getInstitutionListWithPolicyNo() {
    this.houseRentService.getPropertyNamesList().subscribe((res) => {
      console.log('this.getInstitutionListWithPolicyNo::', res);
      this.transactionInstitutionListWithPolicies = res.data.results;

      res.data.results[0].forEach((element) => {
        console.log('element:', element);
        const obj = {
          label: element.value,
          value: element.value,
        };
        console.log('obj:', obj);
        this.transactionPropertyListNames.push(obj);

        // element.policies.forEach((policy) => {
        //   const policyObj = {
        //     label: policy,
        //     value: policy,
        //   };
        //   this.transactionPolicyList.push(policyObj);
        // });
      });
    });
  }

  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedTransactionInstName(institutionName: any) {
    this.globalInstitution = institutionName;
    console.log('this.institutionName', institutionName);
    this.getTransactionFilterData(this.globalInstitution);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPolicyList = [];
    console.log('transactionPolicyList', (this.transactionPolicyList = []));
    this.transactionPolicyList.push(data);
    // console.log('this.transactionInstitutionListWithPolicies::', this.globalSelectedAmount);
    /*  this.transactionInstitutionListWithPolicies.forEach((element) => {
      if (institutionName === element.houseName) {
        element.policies.forEach((policy) => {
          const policyObj = {
            label: policy,
            value: policy,
          };
          this.transactionPolicyList.push(policyObj);
        });
      } else if (institutionName === 'All') {
        element.policies.forEach((policy) => {
          const policyObj = {
            label: policy,
            value: policy,
          };
          this.transactionPolicyList.push(policyObj);
        });
      }
    });
*/

    if (institutionName == 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
  }

  // -------- On Policy selection show all transactions list accordingly all policies---------
  /*   selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData( */
  //  this.globalInstitution,
  // this.globalPolicy,
  // null,
  /*     );
  }
 */
  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData(
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
      this.transactionDetail[j].houseRentalTransactionList[i].isECS
    ); */
    if (checked) {
      if (this.transactionDetail[j].houseRentalTransactionList[i].isECS === 1) {
        this.transactionDetail[j].houseRentalTransactionList[
          i
        ].actualAmountPerMonth = data.declaredAmountPerMonth;
        // this.transactionDetail[j].houseRentalTransactionList[
        //   i
        // ].paymentDate = new Date(data.dueDate);
        console.log(
          'in IS actualAmountPerMonth::',
          this.transactionDetail[j].houseRentalTransactionList[i]
            .actualAmountPerMonth
        );
        console.log(
          'in IS paymentDate::',
          this.transactionDetail[j].houseRentalTransactionList[i].paymentDate
        );
      } else {
        this.transactionDetail[j].houseRentalTransactionList[
          i
        ].actualAmountPerMonth = data.declaredAmountPerMonth;
      }

      formatedActualAmount = Number(
        this.transactionDetail[j].houseRentalTransactionList[
          i
        ].actualAmountPerMonth
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
        this.transactionDetail[j].houseRentalTransactionList[
          i
        ].actualAmountPerMonth
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].houseRentalTransactionList[
        i
      ].actualAmountPerMonth = this.numberFormat.transform(0);
      this.transactionDetail[j].houseRentalTransactionList[i].paymentDate =
        null;
      /*  this.transactionDetail[j].houseRentalTransactionList[i]; */
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
    this.transactionDetail[j].houseRentalTransactionList.forEach((element) => {
      // console.log(element.actualAmountPerMonth.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmountPerMonth.toString().replace(/,/g, '')
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
      this.enableCheckboxFlag2 = item.institutionName;
      item.houseRentalTransactionList.forEach((element) => {
        this.uploadGridData.push(element.houseRentalTransactionDetailId);
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // --------------- ON change of declared Amount Main Page-------------
  onDeclaredAmountChange(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      paymentDate: Date;
      actualTotal: any;
      /*    dueDate: Date; */
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmountPerMonth);

    this.transactionDetail[j].houseRentalTransactionList[
      i
    ].declaredAmountPerMonth = this.declarationService.declaredAmountPerMonth;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].houseRentalTransactionList[i]
        .declaredAmountPerMonth
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].houseRentalTransactionList[
      i
    ].declaredAmountPerMonth = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmountPerMonth=0;

    this.transactionDetail[j].houseRentalTransactionList.forEach((element) => {
      // console.log(element.declaredAmountPerMonth.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmountPerMonth.toString().replace(/,/g, '')
      );
      // console.log(this.declarationTotal);
      // this.declaredAmountPerMonth+=Number(element.actualAmountPerMonth.toString().replace(',', ""));
    });

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
  }

  // --------------- ON change of declared Amount Edit Modal-------------
  onDeclaredAmountChangeInEditCase(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      paymentDate: Date;
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

    this.editTransactionUpload[j].houseRentalTransactionList[
      i
    ].declaredAmountPerMonth = this.declarationService.declaredAmountPerMonth;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].houseRentalTransactionList[i]
        .declaredAmountPerMonth
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].houseRentalTransactionList[
      i
    ].declaredAmountPerMonth = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].houseRentalTransactionList.forEach(
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
      paymentDate: Date;
      actualAmountPerMonth: number;
      /*    dueDate: any; */
    },
    i: number,
    j: number
  ) {
    // this.transactionDetail[j].houseRentalTransactionList[i].dueDate = summary.dueDate;
  }

  // ------------ ON change of DueDate in Edit Modal----------
  onDueDateChangeInEditCase(
    summary: {
      /*      previousEmployerName: any; */
      declaredAmountPerMonth: number;
      paymentDate: Date;
      actualAmountPerMonth: number;
      /*      dueDate: any; */
    },
    i: number,
    j: number
  ) {
    //this.editTransactionUpload[j].houseRentalTransactionList[i].dueDate =  summary.dueDate;
    /*    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].houseRentalTransactionList[i].dueDate,
    ); */
  }

  // ------------Actual Amount change main Page-----------
  onActualAmountChange(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      paymentDate: Date;
      actualAmountPerMonth: number;
      /*     dueDate: Date; */
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Actual Amount change::" , summary);

    this.transactionDetail[j].houseRentalTransactionList[
      i
    ].actualAmountPerMonth = this.declarationService.actualAmountPerMonth;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].houseRentalTransactionList[i].actualAmountPerMonth);
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].houseRentalTransactionList[i]
        .actualAmountPerMonth
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].houseRentalTransactionList[
      i
    ].actualAmountPerMonth = formatedActualAmount;

    if (
      this.transactionDetail[j].houseRentalTransactionList[i]
        .actualAmountPerMonth !== Number(0) ||
      this.transactionDetail[j].houseRentalTransactionList[i]
        .actualAmountPerMonth !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].houseRentalTransactionList[i].actualAmountPerMonth);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].houseRentalTransactionList[i].actualAmountPerMonth);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmountPerMonth = 0;
    this.transactionDetail[j].houseRentalTransactionList.forEach((element) => {
      // console.log(element.actualAmountPerMonth.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmountPerMonth.toString().replace(/,/g, '')
      );
      // console.log(this.actualTotal);
      // this.actualAmountPerMonth += Number(element.actualAmountPerMonth.toString().replace(',', ""));
    });

    this.transactionDetail[j].actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmountPerMonth = this.actualAmountPerMonth;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCase(
    summary: {
      /*   previousEmployerName: any; */
      declaredAmountPerMonth: number;
      paymentDate: Date;
      remark: any;
      actualAmountPerMonth: number;
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

    this.editTransactionUpload[j].houseRentalTransactionList[
      i
    ].actualAmountPerMonth = this.declarationService.actualAmountPerMonth;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j].houseRentalTransactionList[i]
        .actualAmountPerMonth
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].houseRentalTransactionList[i]
        .actualAmountPerMonth
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[j].houseRentalTransactionList[
      i
    ].actualAmountPerMonth = formatedActualAmount;

    if (
      this.editTransactionUpload[j].houseRentalTransactionList[i]
        .actualAmountPerMonth !== Number(0) ||
      this.editTransactionUpload[j].houseRentalTransactionList[i]
        .actualAmountPerMonth !== null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j].houseRentalTransactionList[i]
          .actualAmountPerMonth
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j].houseRentalTransactionList[i]
          .actualAmountPerMonth
      );
    }

    this.actualTotal = 0;
    this.actualAmountPerMonth = 0;
    this.editTransactionUpload[j].houseRentalTransactionList.forEach(
      (element) => {
        console.log(element.actualAmountPerMonth.toString().replace(/,/g, ''));
        this.actualTotal += Number(
          element.actualAmountPerMonth.toString().replace(/,/g, '')
        );
        console.log(this.actualTotal);
        // this.actualAmountPerMonth += Number(element.actualAmountPerMonth.toString().replace(',', ""));
      }
    );

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }

  // --------Add New ROW Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmountPerMonth: any;
  //   paymentDate: Date; actualAmountPerMonth: any;  dueDate: Date}, j: number, i: number) {
  addRowInList(
    summarynew: {
      houseRentalTransactionDetailId: number;
      houseRentalMasterId: number;
      toDate: Date;
      fromDate: Date;
      paymentDate: Date;
      actualAmountPerMonth: any;
      declaredAmountPerMonth: any;
      remark: any;
      receiptDate: any;
    },
    j: number
  ) {
    console.log('taddRowInList');
    this.declarationService = new DeclarationService(summarynew);
    console.log('declarationService::', this.declarationService);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.houseRentalTransactionDetailId =
      this.globalAddRowIndex;
    this.declarationService.declaredAmountPerMonth = null;
    this.declarationService.actualAmountPerMonth = null;
    this.declarationService.actualAmountPerMonth = null;
    this.declarationService.fromDate = null;
    this.declarationService.toDate = null;
    this.declarationService.paymentDate = null;
    this.declarationService.remark;
    this.declarationService.transactionStatus = 'Pending';
    /*this.declarationService.transactionStatus = null; */
    this.declarationService.rejectedAmountPerMonth = 0.0;
    this.declarationService.approvedAmountPerMonth = 0.0;
    this.declarationService.houseRentalMasterId =
      this.transactionDetail[
        j
      ].houseRentalTransactionList[0].houseRentalMasterId;
    this.transactionDetail[j].houseRentalTransactionList.push(
      this.declarationService
    );

    console.log(
      'addRow::',
      this.transactionDetail[j].houseRentalTransactionList
    );
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount =
      this.transactionDetail[j].houseRentalTransactionList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.transactionDetail[j].houseRentalTransactionList.length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].houseRentalTransactionList.splice(rowCount, 1);
      return true;
    }
  }

  editDeclrationRow(
    summary: {
      toDate: Date;
      fromDate: Date;
      paymentDate: Date;
      actualAmountPerMonth: any;
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
      this.declarationService.actualAmountPerMonth -
      this.transactionDetail[j].houseRentalTransactionList[i]
        .actualAmountPerMonth;
    this.transactionDetail[j].houseRentalTransactionList[i] =
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
      this.declarationService.actualAmountPerMonth;
    this.grandActualTotal += this.declarationService.actualAmountPerMonth;
    this.grandDeclarationTotal +=
      this.declarationService.declaredAmountPerMonth;
    this.transactionDetail[j].houseRentalTransactionList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.houseRentalTransactionList.forEach((element) => {
        element.paymentDate = this.datePipe.transform(
          element.paymentDate,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.transactionDetail;
    this.houseRentService
      .postEightyCDeclarationTransaction(data)
      .subscribe((res) => {
        console.log(res);

        this.transactionDetail =
          res.data.results[0].houseRentalTransactionDetailList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

        this.transactionDetail.forEach((element) => {
          element.houseRentalTransactionList.forEach((element) => {
            element.paymentDate = new Date(element.paymentDate);
          });
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
        'Please attach Premium Receipt / Premium Statement.'
      );
      return;
    }
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      element.houseRentalTransactionList.forEach((innerElement) => {
        if (innerElement.declaredAmountPerMonth !== null) {
          innerElement.declaredAmountPerMonth =
            innerElement.declaredAmountPerMonth.toString().replace(/,/g, '');
        } else {
          innerElement.declaredAmountPerMonth = 0.0;
        }
        if (innerElement.actualAmountPerMonth !== null) {
          innerElement.actualAmountPerMonth = innerElement.actualAmountPerMonth
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement.actualAmountPerMonth = 0.0;
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

        /*   const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd',
        );

        innerElement.paymentDate = paymentDate;
        innerElement.dueDate = dueDate; */
        innerElement.paymentDate = paymentDate;
        innerElement.fromDate = fromDate;
        innerElement.toDate = toDate;
      });
    });

    console.log('this.receiptDate::', this.receiptDate);
    console.log('this.receiptNumber::', this.receiptNumber);
    console.log(this.transactionDetail[0]);

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      proofSubmissionId: '',
      houseRentalTransactionList:
        this.transactionDetail[0].houseRentalTransactionList,
      houseRentalTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      receiptDate: Date,
      receiptNumber: 123,
    };
    console.log('data::', data);
    this.houseRentService
      .uploadTransactionWithMultipleFiles(this.rentReciept, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.transactionDetail =
            res.data.results[0].houseRentalTransactionDetailList;
          this.documentDetailList = res.data.results[0].documentInformationList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.houseRentalTransactionList.length
            );

            element.houseRentalTransactionList.forEach((innerElement) => {
              if (innerElement.paymentDate !== null) {
                innerElement.paymentDate = new Date(innerElement.paymentDate);
              }

              /*   if (innerElement.isECS === 0) {
                this.glbalECS == 0;
              } else if (innerElement.isECS === 1) {
                this.glbalECS == 1;
              } else {
                this.glbalECS == 0;
              } */

              innerElement.declaredAmountPerMonth = this.numberFormat.transform(
                innerElement.declaredAmountPerMonth
              );

              innerElement.actualAmountPerMonth = this.numberFormat.transform(
                innerElement.actualAmountPerMonth
              );
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
    this.rentReciept = [];
    this.globalSelectedAmount = '0.00';
  }

  changeReceiptAmountFormat() {
    // tslint:disable-next-line: variable-name
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

  /*   deactiveCopytoActualDate() {
    if (this.isECS === false) {
      this.hideCopytoActualDate = true;
    } else {
      this.hideCopytoActualDate = false;
    }
  } */

  copytoActualDate(dueDate: Date, j: number, i: number, item: any) {
    dueDate = new Date(dueDate);
    item.houseRentalTransactionList.paymentDate = dueDate;
    this.transactionDetail[0].houseRentalTransactionList[i].paymentDate =
      dueDate;
    this.declarationService.paymentDate =
      this.transactionDetail[0].houseRentalTransactionList[i].paymentDate;
    this.paymentDate = dueDate;
    alert('hiiii');
    console.log('Date OF PAyment' + this.declarationService.paymentDate);
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

    this.houseRentService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);

        this.documentArray = res.data.results[0].documentInformationList[0].documentDetailList;
        this.creationDate = res.data.results[0].documentInformationList[0].documentDetailList[0].creationDate;
        this.lastModifiedTime = res.data.results[0].documentInformationList[0].documentDetailList[0].lastModifiedTime;
        this.status = res.data.results[0].documentInformationList[0].documentDetailList[0].status;
        this.urlArray =
          res.data.results[0].documentInformationList[0].documentDetailList;
        this.editTransactionUpload =
          res.data.results[0].houseRentalTransactionDetailList;
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.editReceiptAmount = res.data.results[0].y;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        // this.createDateTime= res.data.results[0].
        // this.grandApprovedTotalEditModal =
        //   res.data.results[0].grandApprovedTotal;
        console.log(this.editTransactionUpload);      
        this.editTransactionUpload.forEach((element) => {
          element.houseRentalTransactionList.forEach((innerElement) => {
            innerElement.declaredAmountPerMonth = this.numberFormat.transform(
              innerElement.declaredAmountPerMonth
            );
            innerElement.actualAmountPerMonth = this.numberFormat.transform(
              innerElement.actualAmountPerMonth
            );
          });
        });
        // console.log('converted:: ', this.urlArray);
      });
  }
/* 
  nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  } */

/*   previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  } */

 /*  docViewer(template3: TemplateRef<any>) {
    this.urlIndex = 0;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    console.log(this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  } */

  // -----------Common Function for filter to call API---------------
  getTransactionFilterData(houseName: String) {
    console.log('this.houseName::', houseName);
    // this.houseRentService.getTransactionInstName(data).subscribe(res => {
    this.houseRentService
      .getTransactionFilterData(houseName)
      .subscribe((res) => {
        console.log(res);
        this.transactionDetail =
          res.data.results[0].houseRentalTransactionDetailList;
        this.documentDetailList = res.data.results[0].documentInformationList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(
            element.houseRentalTransactionList.length
          );

          element.houseRentalTransactionList.forEach((innerElement) => {
            if (innerElement.paymentDate !== null) {
              innerElement.paymentDate = new Date(innerElement.paymentDate);
            }

            /*     if (innerElement.isECS === 0) {
            this.glbalECS == 0;
          } else if (innerElement.isECS === 1) {
            this.glbalECS == 1;
          } else {
            this.glbalECS == 0;
          } */

            innerElement.declaredAmountPerMonth = this.numberFormat.transform(
              innerElement.declaredAmountPerMonth
            );

            innerElement.actualAmountPerMonth = this.numberFormat.transform(
              innerElement.actualAmountPerMonth
            );
          });
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
      element.houseRentalTransactionList.forEach((innerElement) => {
        if (innerElement.declaredAmountPerMonth !== null) {
          innerElement.declaredAmountPerMonth =
            innerElement.declaredAmountPerMonth.toString().replace(/,/g, '');
        } else {
          innerElement.declaredAmountPerMonth = 0.0;
        }
        if (innerElement.actualAmountPerMonth !== null) {
          innerElement.actualAmountPerMonth = innerElement.actualAmountPerMonth
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement.actualAmountPerMonth = 0.0;
        }

        const fromDate = this.datePipe.transform(
          innerElement.fromDate,
          'yyyy-MM-dd'
        );
        const toDate = this.datePipe.transform(
          innerElement.toDate,
          'yyyy-MM-dd'
        );

        const paymentDate = this.datePipe.transform(
          innerElement.paymentDate,
          'yyyy-MM-dd'
        );

        /* innerElement.receiptAmount = receiptAmount; */
        innerElement.paymentDate = paymentDate;
        innerElement.fromDate = fromDate;
        innerElement.toDate = toDate;
        innerElement.paymentDate = paymentDate;
        this.uploadGridData.push(innerElement.houseRentalTransactionDetailId);
      });
    });

    this.editTransactionUpload.forEach((element) => {
      element.houseRentalTransactionList.forEach((innerElement) => {
        const paymentDate = this.datePipe.transform(
          innerElement.paymentDate,
          'yyyy-MM-dd'
        );
        innerElement.paymentDate = paymentDate;
      });
    });

 /*    console.log('this.receiptDate::', this.receiptDate);
    console.log('this.receiptNumber::', this.receiptNumber); */

    console.log('editTransactionUpload::', this.editTransactionUpload);

    const data = {
      proofSubmissionId: this.editProofSubmissionId,
      houseRentalTransactionList: this.editTransactionUpload[0].houseRentalTransactionList,
      houseRentalTransactionIds: this.uploadGridData,
    //  documentRemark: this.documentRemark,
      receiptAmount: this.editReceiptAmount,
      //proofSubmissionId: this.editTransactionUpload[0].proofSubmissionId,

      // documentRemark: this.documentRemark,

      /*   proofSubmissionId: this.editProofSubmissionId, */
      //receiptAmount: this.receiptAmount,
      /* receiptDate: this.receiptDate,
      receiptNumber: this.receiptNumber, */
      receiptDate: Date,
      receiptNumber: 123,
    };
    console.log('uploadUpdateTransaction data::', data);

    this.houseRentService
      .uploadTransactionWithMultipleFiles(this.editrentRecieptArray, data)
      .subscribe((res) => {
        console.log('uploadUpdateTransaction::', res);
        if (res.data.results.length > 0) {
          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );

          this.transactionDetail =
            res.data.results[0].houseRentalTransactionDetailList;
          this.documentDetailList = res.data.results[0].documentInformationList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.houseRentalTransactionList.length
            );

            element.houseRentalTransactionList.forEach((innerElement) => {
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

              innerElement.actualAmountPerMonth = this.numberFormat.transform(
                innerElement.actualAmountPerMonth
              );
            });
          });
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
  }

  editTransactionByProofSubmissionId(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.houseRentService
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
      paymentDate: Date;
      actualAmountPerMonth: number;
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
    this.transactionDetail[j].houseRentalTransactionList[i].paymentDate =
      summary.paymentDate;
    console.log(
      this.transactionDetail[j].houseRentalTransactionList[i].paymentDate
    );
  }

  setToDate(
    summary: {
      declaredAmountPerMonth: number;
      paymentDate: Date;
      actualAmountPerMonth: number;
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
    this.transactionDetail[j].houseRentalTransactionList[i].toDate =
      summary.toDate;
    console.log(this.transactionDetail[j].houseRentalTransactionList[i].toDate);
  }

  setFromDate(
    summary: {
      declaredAmountPerMonth: number;
      paymentDate: Date;
      actualAmountPerMonth: number;
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
    this.transactionDetail[j].houseRentalTransactionList[i].fromDate =
      summary.fromDate;
    console.log(
      this.transactionDetail[j].houseRentalTransactionList[i].fromDate
    );
  }

  // ---- Set Date of Payment On Edit Modal----
  /*  setDateOfPaymentInEditCase(
    summary: {
      
      declaredAmountPerMonth: number;
      paymentDate: Date;
      actualAmountPerMonth: number;
     
    },
    i: number,
    j: number
  ) {
    console.log('transactionDetail::', this.transactionDetail);
    console.log('declaredAmountPerMonth::', this.declaredAmountPerMonth);
    console.log('j::', j);
    console.log('summary::', summary);
    this.editTransactionUpload[j].houseRentalTransactionList[i].paymentDate =
      summary.paymentDate;
    console.log(
      this.editTransactionUpload[j].houseRentalTransactionList[i].paymentDate
    );
  } */
  setDateOfPaymentInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      paymentDate: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    this.editTransactionUpload[j].houseRentalTransactionList[i].paymentDate =
      summary.paymentDate;
    console.log(
      this.editTransactionUpload[j].houseRentalTransactionList[i].paymentDate
    );
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

  docViewer(template1: TemplateRef<any>, documentDetailList: any) {
    console.log("documentDetailList::", documentDetailList)
    this.urlArray = documentDetailList;
    this.urlIndex = 0;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI,
    );
    this.viewDocumentName = this.urlArray[this.urlIndex].fileName;
    this.viewDocumentType = this.urlArray[this.urlIndex].documentType;
    console.log(this.urlSafe);
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' }),
    );
  }



  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    masterId,
    summary, count
  ) {


     this.summaryDetails = summary;
     console.log("summary",this.summaryDetails)
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.houseRentService.gethouseRentActualRemarkList(
      masterId,
    ).subscribe((res) => {
      console.log('docremark', res);
      
    
    this.documentRemarkList  = res.data.results[0];
    this.remarkCount = res.data.results[0].length;
    });
     console.log('documentDetail::', this.documentRemarkList);
    // this.documentRemarkList = this.selectedRemarkList;
    console.log('this.documentRemarkList', this.documentRemarkList);
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": this.summaryDetails.houseRentalTransactionDetailId,
      "masterId":0,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"House",
      "subSection":"Rental",
      "remark":this.editRemarkData,
      "proofSubmissionId":'',
      "role":"Employee",
      "remarkType":"Transaction"

    };

    console.log('post data',data);
    this.houseRentService.postHouseRentMasterRemark(data)
    .subscribe((res) => {
      if(res.status.code == "200") {
        console.log(this.masterGridData);
        this.transactionDetail[0].houseRentalTransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;

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
  onResetRemarkDetails(){
    this.enteredRemark='';
  }

   //----------- On change Transactional Line Item Remark --------------------------
   public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);
 
    this.transactionDetail[0].houseRentalTransactionList[transIndex].remark =  event?.target?.value;
   
 
  }


}

class DeclarationService {
  public houseRentalTransactionDetailId = 0;
  public houseRentalMasterId: number;
  public toDate: Date;
  public fromDate: Date;
  public declaredAmountPerMonth: number;
  public paymentDate: Date;
  public actualAmountPerMonth: number;
  public remark: string;
  public transactionStatus: 'Pending';
  public rejectedAmountPerMonth: number;
  public approvedAmountPerMonth: number;
  // public receiptNumber: number;
  // public receiptDate: Date;
  // public receiptAmount: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
