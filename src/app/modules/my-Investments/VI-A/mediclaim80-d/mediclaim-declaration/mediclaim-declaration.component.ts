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
import { Mediclaim80DService } from '../mediclaim80-d.service';

@Component({
  selector: 'app-mediclaim-declaration',
  templateUrl: './mediclaim-declaration.component.html',
  styleUrls: ['./mediclaim-declaration.component.scss'],
})
export class MediclaimDeclarationComponent implements OnInit {
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
  public typeOfExpenceList: Array<any> = [];
  public proofSubmissionId: '';
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  // public mediclaimTransactionDetail: Array<any> = [];
  public mediclaimTransactionDetail: any = {};
  public documentDetailList: Array<any> = [];
  public documentDetailListEdit: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public transactionWithMediclaimInstitutionName: Array<any> = [];
  public mediclaimNameList: Array<any> = [];
  public transactionWithExpenceList: Array<any> = [];

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;

  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public mediclaimPremiumTransactionDetail: any = {};
  // public mediclaimPremiumTransactionDetail: any;
  public preventiveHealthCheckupTransactionDetail: any;
  public medicalExpenseTransactionDetail: any;
  // public mediclaimPremiumTransactionList: Array<any> = [];
  public mediclaimPremiumTransactionList: any;
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
  public mediclaimPremiumTransactionDetailEdit: any;
  public preventiveHealthCheckupTransactionDetailEdit: any;
  public medicalExpenseTransactionDetailEdit: any;

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
  public viewTransactionDetail = true;
  public masterUploadFlag = true;

  public dateOfPaymentGlobal: Date;
  public actualAmountGlobal: Number;
  public dueDate: Date;
  public dateOfPayment: Date;
  public date3: Date;
  public loaded = 0;
  public editExpenseType: any;
  public selectedFiles: FileList;
  public currentFileUpload: File;
  public filesArray: File[] = [];
  public editfilesArray: File[] = [];
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

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';
  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public globalSelectedAmountPreventive: string;
  public globalSelectedAmountExpense: string;

  public testnumber1: number = 5000;
  public testnumber2: number = 5000;
  public expenseType: string = 'All';
  mediclaimTransactionList: any;
  mediclaimTransList = [];
  preventiveHealthCheckupTransactionList:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private mediclaim80DService: Mediclaim80DService,

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
    this.globalSelectedAmountPreventive = this.numberFormat.transform(0);
    this.globalSelectedAmountExpense = this.numberFormat.transform(0);

    this.typeOfExpenceList = [
      { label: 'Mediclaim Premium', value: 'Mediclaim Premium' },
      {
        label: 'Preventive Health Check Up',
        value: 'Preventive Health Check Up',
      },
      {
        label: 'Medical Expenses For Parents(Senior Citizen/s)',
        value: 'Medical Expenses for Parents',
      },
    ];
  }

  public ngOnInit(): void {
    console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      const input = this.data;
      this.globalInstitution = input.institution;
      this.globalPolicy = input.policyNo;
      this.getMediclaimList();
      // this.getTypeOfExpenceList();
      this.getTransactionFilterData(input.expenseType, input.institution);
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

  // Update Previous Employee in Main Page
  updatePreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      i
    ].previousEmployerId = event.target.value;
  }

  // Update Previous Employee in Main Page
  updatePreventive_PreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].previousEmployerId = event.target.value;
  }

  // Update Previous Employee in Main Page
  updateExpense_PreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionDetailList[
      i
    ].previousEmployerId = event.target.value;
  }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].previousEmployerId = event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].mediclaimTransactionList[i]
        .previousEmployerId
    );
  }

  //Get Family Name List
  //  getMasterFamilyInfo() {
  //   this.mediclaim80DService.getFamilyInfoList().subscribe((res) => {
  //     console.log('getFamilyInfo', res);
  //     this.familyMemberGroup = res.data.results;
  //     res.data.results.forEach((element) => {
  //       const obj = {
  //         label: element.familyMemberName,
  //         value: element.familyMemberInfoId,
  //       };
  //       if (element.relation !== 'Sister' || element.relation !== 'Brother') {
  //         this.familyMemberName.push(obj);
  //       }
  //     });
  //   });
  // }

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
    this.mediclaimNameList = [];
    this.transactionPolicyList = [];
    // this.typeOfExpenceList = [];

    const data = {
      label: 'All',
      value: 'All',
    };
    // this.typeOfExpenceList.push(data);
    this.mediclaimNameList.push(data);
    this.transactionPolicyList.push(data);
    this.refreshTransactionStatustList();

    // this.getInstitutionListWithPolicyNo();
    this.getMediclaimList();
    // this.getTypeOfExpenceList();

    this.resetAll();
    this.selectedTransactionInstName('All');
    this.selectedexpenseTypeName('All');
  }

  public getMediclaimList() {
    const data = {
      label: 'All',
      value: 'All',
    };

    // this.typeOfExpenceList.push(data);
    this.mediclaim80DService
      .getMediclaimPremiumWithInstitutionList()
      .subscribe((res) => {
        console.log('getMediclaimList', res);
        this.transactionWithMediclaimInstitutionName = res.data.results;
        res.data.results[0].forEach((element) => {
          console.log('element', element);
          const obj = {
            label: element,
            value: element,
          };
          this.mediclaimNameList.push(obj);
        });
      });
    console.log('mediclaim Name List ', this.mediclaimNameList);
  }

  // --------- On institution selection show all transactions list accordingly all policies--------
  // selectedTransactionInstName(institutionName: any) {
  //   this.globalInstitution = institutionName;
  //   this.getTransactionFilterData(this.globalInstitution, null);
  //   this.globalSelectedAmount = this.numberFormat.transform(0);
  //   const data = {
  //     label: 'All',
  //     value: 'All',
  //   };

  //   this.transactionPolicyList = [];
  //   this.transactionPolicyList.push(data);

  //   this.transactionWithMediclaimInstitutionName.forEach((element) => {
  //     if (institutionName === element.institution) {
  //       element.policies.forEach((policy) => {
  //         const policyObj = {
  //           label: policy,
  //           value: policy,
  //         };
  //         this.transactionPolicyList.push(policyObj);
  //       });
  //     } else if (institutionName === 'All') {
  //       element.policies.forEach((policy) => {
  //         const policyObj = {
  //           label: policy,
  //           value: policy,
  //         };
  //         this.transactionPolicyList.push(policyObj);
  //       });
  //     }
  //   });

  //   if (institutionName == 'All') {
  //     this.grandTabStatus = true;
  //     this.isDisabled = true;
  //   } else {
  //     this.grandTabStatus = false;
  //     this.isDisabled = false;
  //   }

  //   this.resetAll();
  // }

  // Institution name list

  selectedTransactionInstName(institution: any) {
    this.receiptAmount = '0.00';
    this.filesArray = [];
    this.globalSelectedAmount = '0.00';
    this.globalPolicy = institution;
    if (institution == 'All') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
    this.getTransactionFilterData(this.globalInstitution, this.globalPolicy);
  }

  // public getTypeOfExpenceList() {
  //   this.mediclaim80DService
  //     .getMediclaimPremiumWithInstitutionList()
  //     .subscribe((res) => {
  //       console.log('getExpenceList', res);
  //       this.transactionWithExpenceList = res.data.results;
  //         res.data.results[0].forEach((element) => {
  //         console.log('element', element)
  //         const obj = {
  //           label: element,
  //           value: element,
  //         };
  //         this.typeOfExpenceList.push(obj);

  //       });
  //     });
  //   console.log('mediclaim Name List ', this.mediclaimNameList);
  // }

  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedexpenseTypeName(expenseType: any) {
    this.receiptAmount = '0.00';
    this.filesArray = [];
    this.globalSelectedAmount = '0.00';
    this.globalSelectedAmountPreventive = '0.00';
    this.globalSelectedAmountExpense = '0.00';

    this.globalInstitution = expenseType;
    this.expenseType = expenseType;
    this.getTransactionFilterData(this.globalInstitution, null);
    this.globalSelectedAmount = this.numberFormat.transform(0);

    this.globalSelectedAmountPreventive = this.numberFormat.transform(0);
    this.globalSelectedAmountExpense = this.numberFormat.transform(0);

    // this.transactionPolicyList = [];
    // this.transactionPolicyList.push(data);

    // this.transactionInstitutionListWithPolicies.forEach((element) => {
    //   if (institutionName === element.institution) {
    //     element.policies.forEach((policy) => {
    //       const policyObj = {
    //         label: policy,
    //         value: policy,
    //       };
    //       this.transactionPolicyList.push(policyObj);
    //     });
    //   } else if (institutionName === 'All') {
    //     element.policies.forEach((policy) => {
    //       const policyObj = {
    //         label: policy,
    //         value: policy,
    //       };
    //       this.transactionPolicyList.push(policyObj);
    //     });
    //   }
    // });

    if (expenseType == 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else if (expenseType == 'Mediclaim Premium') {
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  // selectedTransactionStatus(transactionStatus: any) {
  //   this.getTransactionFilterData(
  //     this.globalInstitution,
  //     this.globalPolicy
  //   );
  // }

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
    if (checked) {
      if (
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
          j
        ].mediclaimTransactionList[i].isECS === 1
      ) {
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
          j
        ].mediclaimTransactionList[i].actualAmount = data.declaredAmount;

        formatedActualAmount = Number(
          this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
            j
          ].mediclaimTransactionList[i].actualAmount
            .toString()
            .replace(/,/g, '')
        );
        formatedSelectedAmount = this.numberFormat.transform(
          formatedGlobalSelectedValue + formatedActualAmount
        );

        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
          j
        ].dateOfPayment = new Date(data.dateOfPayment);
      } else {
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
          j
        ].mediclaimTransactionList[i].actualAmount = data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
          j
        ].mediclaimTransactionList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.mediclaimTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList[i].actualAmount;

      // formatedActualAmount = Number(
      //    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount
      //     .toString()
      //     .replace(/,/g, ''),
      // );
      // this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[ this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i]
      //   i
      // ].actualAmount = this.numberFormat.transform(0);
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
        j
      ].mediclaimTransactionList[i].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.mediclaimTransactionId);
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }

  // -------- ON select to check input boxex preventive Health Checkup--------
  public onSelectPre_CheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmountPreventive == '0'
        ? this.globalSelectedAmountPreventive
        : this.globalSelectedAmountPreventive.toString().replace(/,/g, '')
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;

    if (checked) {
      this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
        i
      ].actualAmount = data.declaredAmount;
      this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
        i
      ].dateOfPayment = new Date(data.dateOfPayment);
      formatedActualAmount = Number(
        this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.mediclaimTransactionId);
    } else {
      formatedActualAmount = Number(
        this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
        i
      ].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.mediclaimTransactionId);
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmountPreventive = formatedSelectedAmount;
    console.log(
      'this.globalSelectedAmountPreventive::',
      this.globalSelectedAmountPreventive
    );
    this.actualTotal = 0;
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach(
      (element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
      }
    );
    this.preventiveHealthCheckupTransactionDetail.actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }

  // -------- ON select to check input boxex preventive Health Checkup--------
  public onSelectExpense_CheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmountExpense == '0'
        ? this.globalSelectedAmountExpense
        : this.globalSelectedAmountExpense.toString().replace(/,/g, '')
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;

    if (checked) {
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
        i
      ].actualAmount = data.declaredAmount;

      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
        i
      ].dateOfPayment = new Date(data.dateOfPayment);
      formatedActualAmount = Number(
        this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.mediclaimTransactionId);
    } else {
      formatedActualAmount = Number(
        this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
        i
      ].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.mediclaimTransactionId);
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmountExpense = formatedSelectedAmount;
    console.log(
      'this.globalSelectedAmountExpense::',
      this.globalSelectedAmountExpense
    );
    this.actualTotal = 0;
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach(
      (element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
      }
    );
    this.medicalExpenseTransactionDetail.actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }

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
      item.mediclaimPremiumTransactionList.forEach((element) => {
        this.uploadGridData.push(element.mediclaimTransactionId);
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
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
      item.mediclaimTransactionDetail.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach(
        (element) => {
          this.uploadGridData.push(element.mediclaimTransactionId);
        }
      );
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // ------------ To Check / Uncheck All  Checkboxes preventiveHealthCheckup-------------
  preventiveCheckUncheckAll(item: any) {
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
      item.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach(
        (element) => {
          this.uploadGridData.push(element.mediclaimTransactionId);
        }
      );
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // ------------ To Check / Uncheck All  Checkboxes MedicalExpenseTransactionDetail-------------
  expenceCheckUncheckAll(item: any) {
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
      item.mediclaimTransactionDetail.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach(
        (element) => {
          this.uploadGridData.push(element.mediclaimTransactionId);
        }
      );
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // --------------- ON change of declared Amount Main Page-------------
  onDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[i].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList.forEach((element) => {
      console.log(element.declaredAmount.toString().replace(',', ''));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // this.declarationTotal += element.declaredAmount;
      console.log(this.declarationTotal);
      // this.declaredAmount+= element.actualAmount;
    });
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].declarationTotal = this.declarationTotal;
  }

  // --------------- ON change of declared Amount Main Page Preventive Health Checkup-------------

  onPreventiveDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
      dueDate;
    },
    i: number
  ) {
    this.declarationService = new DeclarationService(summary);
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach(
      (element) => {
        console.log(element.declaredAmount.toString().replace(',', ''));
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
        );
        console.log(this.declarationTotal);
      }
    );
    this.preventiveHealthCheckupTransactionDetail.declarationTotal = this.declarationTotal;
  }


  onPreventiveDeclaredAmountChangeInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
      dueDate;
    },
    i: number
  ) {
    this.declarationService = new DeclarationService(summary);
    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);
    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList.forEach(
      (element) => {
        console.log(element.declaredAmount.toString().replace(',', ''));
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
        );
        console.log(this.declarationTotal);
      }
    );
    this.preventiveHealthCheckupTransactionDetailEdit.declarationTotal = this.declarationTotal;
  }
  // --------------- ON change of declared Amount Main Page Preventive Health Checkup-------------
  onExpenseDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
      dueDate;
    },
    i: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[i]
        .declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach(
      (element) => {
        console.log(element.declaredAmount.toString().replace(',', ''));
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
        );
        // this.declarationTotal += element.declaredAmount;
        console.log(this.declarationTotal);
        // this.declaredAmount+= element.actualAmount;
      }
    );
    this.medicalExpenseTransactionDetail.declarationTotal = this.declarationTotal;
    // this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].declaredTotal = this.declarationTotal;
    // console.log( "DeclarATION total==>>" + this.mediclaimTransactionDetail[j].declarationTotal);
  }

  // --------------- ON change of declared Amount Edit Modal-------------
  onDeclaredAmountChangeInEditCase(
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
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onDeclaredAmountChangeInEditCase Amount change::' +
        summary.declaredAmount
    );

    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].mediclaimTransactionList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].mediclaimTransactionList.forEach(
      (element) => {
        console.log(
          'declaredAmount::',
          element.declaredAmount.toString().replace(/,/g, '')
        );
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
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
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number
  ) {
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].dueDate =
      summary.dueDate;
  }

  // ------------ ON change of DueDate in Edit Modal----------
  onDueDateChangeInEditCase(
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
    this.editTransactionUpload[j].mediclaimTransactionList[i].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].mediclaimTransactionList[i].dueDate
    );
  }

  onActualAmountChangePrevi(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Actual Amount change::" , summary);

    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].lictransactionList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].actualAmount !== Number(0) ||
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach(
      (element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
        // console.log(this.actualTotal);
        // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.preventiveHealthCheckupTransactionDetail.actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // ononExpenseActualAmountChangePrevi on change
  ononExpenseActualAmountChangePrevi(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Actual Amount change::" , summary);

    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].lictransactionList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[i]
        .actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[i]
        .actualAmount !== Number(0) ||
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[i]
        .actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach(
      (element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
        // console.log(this.actualTotal);
        // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.medicalExpenseTransactionDetail.actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  onActualAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Actual Amount change::" , summary);

    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].lictransactionList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList[i].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[i].actualAmount = formatedActualAmount;

    if (
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList[i].actualAmount !== Number(0) ||
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // // ------------Actual Amount change main Page-----------
  // onActualAmountChange(
  //   summary: {
  //     previousEmployerName: any;
  //     declaredAmount: number;
  //     dateOfPayment: Date;
  //     actualAmount: number;
  //     dueDate: Date;
  //   },
  //   i: number,
  //   j: number,
  // ) {
  //   this.declarationService = new DeclarationService(summary);
  //   this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail[i].actualAmount = this.declarationService.actualAmount;
  //   const formatedActualAmount = this.numberFormat.transform
  //   this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].actualAmount,
  //   this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[
  //     i
  //   ].actualAmount = formatedActualAmount;

  //   if (
  //     this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].actualAmount !==
  //       Number(0) ||
  //     this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount !== null
  //   ) {
  //     this.isDisabled = false;
  //   } else {
  //     this.isDisabled = true;
  //   }

  //   this.actualTotal = 0;
  //   this.actualAmount = 0;
  //   this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].forEach((element) => {
  //     this.actualTotal += Number(
  //       element.actualAmount.toString().replace(/,/g, ''),
  //     );
  //   });
  //   this.mediclaimTransactionDetail[j].actualTotal = this.actualTotal;
  // }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCaseMediclaim(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
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

    this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    //  const formatedActualAmount = this.numberFormat.transform(
    //   this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount,
    // );
    // console.log(`formatedActualAmount::`, formatedActualAmount);

    // this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount = formatedActualAmount;

    // if (
    //   this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount !== Number(0) ||
    //   this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount !== null
    // ) {
    //   console.log(
    //     `in if::`,
    //     this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount,
    //   );
    // } else {
    //   console.log(
    //     `in else::`,
    //     this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount,
    //   );
    // }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList.forEach((element) => {
      console.log(element.actualAmount);
      this.actualTotal += element.actualAmount;
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[
      j
    ].actualTotal = this.actualTotal;
    console.log(
      this.mediclaimPremiumTransactionDetailEdit
        .mediclaimPremiumTransactionList[j].actualTotal
    );
  }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangepreventive(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
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

    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform(
      this.preventiveHealthCheckupTransactionDetailEdit
        .preventiveHealthCheckupTransactionList[i].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.preventiveHealthCheckupTransactionDetailEdit
        .preventiveHealthCheckupTransactionList[i].actualAmount !== Number(0) ||
      this.preventiveHealthCheckupTransactionDetailEdit
        .preventiveHealthCheckupTransactionList[i].actualAmount !== null
    ) {
      console.log(
        `in if::`,
        this.preventiveHealthCheckupTransactionDetailEdit
          .preventiveHealthCheckupTransactionList[i].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.preventiveHealthCheckupTransactionDetailEdit
          .preventiveHealthCheckupTransactionList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList.forEach(
      (element) => {
        console.log(element.actualAmount.toString().replace(/,/g, ''));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
        console.log(this.actualTotal);
        // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[
      j
    ].actualTotal = this.actualTotal;
    console.log(
      this.preventiveHealthCheckupTransactionDetailEdit
        .preventiveHealthCheckupTransactionList[j].actualTotal
    );
  }


  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCaseExpense(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: Date;
    },
    i: number,
    j: number,
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onActualAmountChangeInEditCaseActual Amount change::',
      summary,
    );

    this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount,
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount,
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount = formatedActualAmount;

    if (
      this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount !==
        Number(0) ||
      this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount !== null
    ) {
      console.log(
        `in if::`,
        this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount,
      );
    } else {
      console.log(
        `in else::`,
        this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j].actualAmount,
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, ''),
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.medicalExpenseTransactionDetailEdit[j].actualTotal = this.actualTotal;
    console.log(this.medicalExpenseTransactionDetailEdit[j].actualTotal);
  }

  // --------Add New ROw Function---------
  addRowInList(
    summarynew: {
      mediclaimTransactionId: number;
      // mediclaimPaymentDetailId: number;
      previousEmployerId: number;
      declaredAmount: any;
      dateOfPayment: Date;
      actualAmount: any;
      rejectedAmount: number;
      approvedAmount: number;
    },
    j: number
  ) {
    this.declarationService = new DeclarationService(summarynew);
    // console.log('declarationService::', this.declarationService);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.mediclaimTransactionId = this.globalAddRowIndex;
    this.declarationService.declaredAmount = null;
    this.declarationService.actualAmount = null;
    this.declarationService.dateOfPayment = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.rejectedAmount = 0.0;
    this.declarationService.approvedAmount = 0.0;
    // this.declarationService.mediclaimPaymentDetailId = this.mediclaimPremiumTransactionDetail[j].mediclaimPremiumTransactionList[0].mediclaimPaymentDetailId;
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList.push(this.declarationService);
    console.log(
      'addRow::',
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList
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
      this.mediclaimTransactionDetail[j].mediclaimTransactionList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (
      this.mediclaimTransactionDetail[j].mediclaimTransactionList.length == 1
    ) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.mediclaimTransactionDetail[j].mediclaimTransactionList.splice(
        rowCount,
        1
      );
      return true;
    }
  }

  editDeclrationRow(
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
    this.declarationService = new DeclarationService(summary);
  }

  updateDeclrationRow(i: string | number, j: string | number) {
    // tslint:disable-next-line: max-line-length
    this.mediclaimTransactionDetail[j].actualTotal +=
      this.declarationService.actualAmount -
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i]
        .actualAmount;
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[
      i
    ] = this.declarationService;
    this.declarationService = new DeclarationService();
  }

  SaveDeclrationRow(j) {
    if (!this.declarationService) {
      return;
    }
    this.mediclaimTransactionDetail[
      j
    ].declarationTotal += this.declarationService.declaredAmount;
    this.mediclaimTransactionDetail[
      j
    ].actualTotal += this.declarationService.actualAmount;
    this.grandActualTotal += this.declarationService.actualAmount;
    this.grandDeclarationTotal += this.declarationService.declaredAmount;
    this.mediclaimTransactionDetail[j].mediclaimTransactionList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.mediclaimTransactionDetail);
    this.tabIndex = 0;
    this.mediclaimTransactionDetail.forEach((element) => {
      element.mediclaimTransactionList.forEach((element) => {
        element.dateOfPayment = this.datePipe.transform(
          element.dateOfPayment,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.mediclaimTransactionDetail;
    this.mediclaim80DService.postMediclaimTransaction(data).subscribe((res) => {
      console.log(res);
      this.mediclaimTransactionDetail =
        res.data.results[0].mediclaimTransactionDetail;
      this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      this.mediclaimTransactionDetail.forEach((element) => {
        element.mediclaimTransactionList.forEach((element) => {
          element.dateOfPayment = new Date(element.dateOfPayment);
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

  // --Remove Selected LicTransaction Document in Main Page----
  removeSelectedLicTransactionDocument(index: number) {
    this.filesArray.splice(index, 1);
    console.log('this.filesArray::', this.filesArray);
    console.log('this.filesArray.size::', this.filesArray.length);
  }

  // Remove Selected LicTransaction Document Edit Maodal
  removeSelectedLicTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
  }

  upload() {
    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log(
      'this.mediclaimTransactionDetail::',
      this.mediclaimTransactionDetail
    );

    if (this.expenseType == 'Mediclaim Premium') {
      if (
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList
          .length > 0
      ) {
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach(
          (element) => {
            // if(this.mediclaimTransactionList.length > 0){
            element.mediclaimTransactionList.forEach((innerElement) => {
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
                innerElement.dateOfPayment,
                'yyyy-MM-dd'
              );
              innerElement.dateOfPayment = dateOfPaymnet;
            });
            // }
          }
        );
      }
    }

    if (this.expenseType == 'Preventive Health Check Up') {
      if (this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.length > 0){
      this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach(
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
            innerElement.dateOfPayment,
            'yyyy-MM-dd'
          );

          innerElement.dateOfPayment = dateOfPaymnet;
        }
      );
      }
    }

    if (this.expenseType == 'Medical Expenses for Parents') {
      if (this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.length > 0){
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach(
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
            innerElement.dateOfPayment,
            'yyyy-MM-dd'
          );

          innerElement.dateOfPayment = dateOfPaymnet;
        }
      );

      }
    }

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    // delete this.mediclaimTransactionDetail.mediclaimBenefeciaryDetailList;
    let data: any = {};
    if (this.uploadGridData.length > 0) {
      for (let i = 0; i < this.uploadGridData.length; i++) {
        // to check with medical premium
        if (this.expenseType == 'Mediclaim Premium') {
          const medPremTransList = this.mediclaimPremiumTransactionDetail
            .mediclaimPremiumTransactionList;
          for (let k = 0; k < medPremTransList.length; k++) {
            if (this.globalPolicy == medPremTransList[k].institution) {
              const medTransList = this.mediclaimPremiumTransactionDetail
                .mediclaimPremiumTransactionList[k].mediclaimTransactionList;
              for (let j = 0; j < medTransList.length; j++) {
                if (
                  this.uploadGridData[i] ==
                  medTransList[j].mediclaimTransactionId
                ) {
                  this.mediclaimTransList.push(medTransList[j]);
                }
              }
              data.mediclaimTransactionList = this.mediclaimTransList;
            }
          }
        }

        // to check with Preventive Health Check Up
        if (this.expenseType == 'Preventive Health Check Up') {
          const prevHealthCheckupTransList = this
            .preventiveHealthCheckupTransactionDetail
            .preventiveHealthCheckupTransactionList;
          const abc = this.preventiveHealthCheckupTransactionDetail
            .preventiveHealthCheckupTransactionList;
          abc.forEach((element) => {
            delete element.mediclaimBenefeciaryDetailList;
          });
          for (let j = 0; j < prevHealthCheckupTransList.length; j++) {
            if (
              this.uploadGridData[i] ==
              prevHealthCheckupTransList[j].mediclaimTransactionId
            ) {
              this.mediclaimTransList.push(prevHealthCheckupTransList[j]);
            }
          }
          data.mediclaimTransactionList = this.mediclaimTransList;
        }

        // to check with Medical Expenses for Parents
        if (this.expenseType == 'Medical Expenses for Parents') {
          const medExpTransList = this.medicalExpenseTransactionDetail
            .medicalExpenseTransactionList;
          const parentsDelete = this.medicalExpenseTransactionDetail
            .medicalExpenseTransactionList;
          parentsDelete.forEach((element) => {
            delete element.mediclaimBenefeciaryDetailList;
          });
          for (let j = 0; j < medExpTransList.length; j++) {
            if (
              this.uploadGridData[i] ==
              medExpTransList[j].mediclaimTransactionId
            ) {
              this.mediclaimTransList.push(medExpTransList[j]);
            }
          }
          data.mediclaimTransactionList = this.mediclaimTransList;
        }
      }
    }
    data.mediclaimTransactionIds = this.uploadGridData;
    data.receiptAmount = this.receiptAmount;
    data.documentRemark = this.documentRemark;
    console.log('data::', data);
    data.proofSubmissionId = '';

    this.mediclaim80DService
      .uploadMediclaim80DDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.mediclaimPremiumTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail;
          this.preventiveHealthCheckupTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail;
          this.medicalExpenseTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail;
          this.documentDetailList =
            res.data.results[0].mediclaimTransactionDocumentDetailList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          if (this.expenseType == 'Mediclaim Premium') {
            if (
              this.mediclaimPremiumTransactionDetail
                .mediclaimPremiumTransactionList.length > 0
            ) {
              this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach(
                (element) => {
                  this.initialArrayIndex.push(element.mediclaimTransactionList.length);
                  element.mediclaimTransactionList.forEach((innerElement) => {
                    if (innerElement.dateOfPayment !== null) {
                      innerElement.dateOfPayment = new Date(
                        innerElement.dateOfPayment
                      );
                    }

                    if (innerElement.isECS === 0) {
                      this.glbalECS == 0;
                    } else if (innerElement.isECS === 1) {
                      this.glbalECS == 1;
                    } else {
                      this.glbalECS == 0;
                    }
                    innerElement.declaredAmount = this.numberFormat.transform(
                      innerElement.declaredAmount
                    );

                    innerElement.actualAmount = this.numberFormat.transform(
                      innerElement.actualAmount
                    );
                    console.log(
                      'numberFormat mediclaimPremiumTransactionDetail ',
                      innerElement.actualAmount
                    );
                  });
                }
              );
            }
          }else if (this.expenseType == 'Preventive Health Check Up') {
            this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach((element) => {
                // this.initialArrayIndex.push(element.length);
                    if (element.dateOfPayment !== null) {
                      element.dateOfPayment = new Date(
                        element.dateOfPayment
                      );
                    }

                    element.declaredAmount = this.numberFormat.transform(
                      element.declaredAmount
                    );

                    element.actualAmount = this.numberFormat.transform(
                      element.actualAmount
                    );
              }
            );
          }else if (this.expenseType == 'Medical Expenses for Parents') {
            this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach((element) => {
              this.initialArrayIndex.push(element.medicalExpenseTransactionList.length);
              element.medicalExpenseTransactionList.forEach(
                (innerElement) => {
                  if (innerElement.dateOfPayment !== null) {
                    innerElement.dateOfPayment = new Date(
                      innerElement.dateOfPayment
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
          }

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
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
      );
      this.receiptAmount = '0.00';
      return false;
    } else if (receiptAmount_ > globalSelectedAmount_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmount_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount'
      );
      // this.receiptAmount = '0.00';
      // return false;
    }
    this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
  }

  changeReceiptAmountFormatExcpence() {
    // tslint:disable-next-line: variable-name
    let receiptAmount_: number;
    let globalSelectedAmountExpense_: number;

    receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
    globalSelectedAmountExpense_ = parseFloat(
      this.globalSelectedAmountExpense.replace(/,/g, '')
    );

    console.log(receiptAmount_);
    console.log(globalSelectedAmountExpense_);
    if (receiptAmount_ < globalSelectedAmountExpense_) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
      );
      this.receiptAmount = '0.00';
      return false;
    } else if (receiptAmount_ > globalSelectedAmountExpense_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmountExpense_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount'
      );
      // this.receiptAmount = '0.00';
      // return false;
    }
    this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
  }

  changeReceiptAmountFormatPreventive() {
    // tslint:disable-next-line: variable-name
    let receiptAmount_: number;
    let globalSelectedAmountPreventive_: number;

    receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
    globalSelectedAmountPreventive_ = parseFloat(
      this.globalSelectedAmountPreventive.replace(/,/g, '')
    );

    console.log(receiptAmount_);
    console.log(globalSelectedAmountPreventive_);
    if (receiptAmount_ < globalSelectedAmountPreventive_) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
      );
      this.receiptAmount = '0.00';
      return false;
    } else if (receiptAmount_ > globalSelectedAmountPreventive_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmountPreventive_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount'
      );
      // this.receiptAmount = '0.00';
      // return false;
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

  deactiveCopytoActualDate() {
    if (this.isECS === false) {
      this.hideCopytoActualDate = true;
    } else {
      this.hideCopytoActualDate = false;
    }
  }
  copytoActualDate(dueDate: Date, j: number, i: number, item: any) {
    dueDate = new Date(dueDate);
    // item.mediclaimTransactionList.dateOfPayment = dueDate;
    this.mediclaimTransactionDetail[0].mediclaimTransactionList[
      i
    ].dateOfPayment = dueDate;
    this.declarationService.dateOfPayment = this.mediclaimTransactionDetail[0].mediclaimTransactionList[
      i
    ].dateOfPayment;
    // this.dateOfPayment = dueDate;
    alert('hiiii');
    console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
  }

  // // When Edit of Document Details
  // declarationEditUpload(
  //   template2: TemplateRef<any>,
  //   proofSubmissionId: string,
  // ) {
  //   console.log('proofSubmissionId::', proofSubmissionId);

  //   this.modalRef = this.modalService.show(
  //     template2,
  //     Object.assign({}, { class: 'gray modal-xl' }),
  //   );

  //   this.mediclaim80DService.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(
  //     (res) => {
  //       console.log('edit Data:: ', res);
  //       this.urlArray =
  //         res.data.results[0].mediclaimTransactionDocumentDetailList[0].documentDetailList;
  //       this.editTransactionUpload = res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList;
  //       this.editTransactionUpload = res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList;
  //       this.editTransactionUpload = res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail.medicalExpenseTransactionList;
  //       console.log("this.mediclaimTransactionDetail",this.mediclaimTransactionDetail)
  //       this.editProofSubmissionId = res.data.results[0].mediclaimTransactionDocumentDetailList[0].dateOfSubmission;
  //       this.editReceiptAmount = res.data.results[0].receiptAmount;
  //       this.grandDeclarationTotalEditModal =
  //         res.data.results[0].grandDeclarationTotal;
  //       this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
  //       this.grandRejectedTotalEditModal =
  //         res.data.results[0].grandRejectedTotal;
  //       this.grandApprovedTotalEditModal =
  //         res.data.results[0].grandApprovedTotal;
  //       // console.log(this.urlArray);
  //       this.urlArray.forEach((element) => {
  //         element.blobURI = 'data:image/image;base64,' + element.blobURI;
  //       });
  //       this.editTransactionUpload.forEach((element) => {
  //         element.mediclaimTransactionList.forEach((innerElement) => {
  //           innerElement.declaredAmount = this.numberFormat.transform(
  //             innerElement.declaredAmount,
  //           );
  //           innerElement.actualAmount = this.numberFormat.transform(
  //             innerElement.actualAmount,
  //           );
  //         });
  //       });
  //       // console.log('converted:: ', this.urlArray);
  //     },
  //   );
  // }

  // -----------Common Function for filter to call API---------------
  declarationEditUpload(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );
    this.mediclaim80DService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('declarationEditUpload', res);

        this.urlArray =
          res.data.results[0].mediclaimTransactionDocumentDetailList[0].documentDetailList;
        if (
          res.data.results[0].mediclaimTransactionDetail != null ||
          res.data.results[0].mediclaimTransactionDetail != undefined
        ) {
          this.mediclaimPremiumTransactionDetailEdit =
            res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail;
          this.preventiveHealthCheckupTransactionDetailEdit =
            res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail;
          this.medicalExpenseTransactionDetailEdit =
            res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail;

          console.log(
            'editExpenseType11',
            this.mediclaimPremiumTransactionDetailEdit !== null
          );
          console.log(
            'editExpenseType22',
            this.preventiveHealthCheckupTransactionDetailEdit !== null
          );
          console.log(
            'editExpenseType33',
            this.medicalExpenseTransactionDetailEdit !== null
          );
          this.editExpenseType =
            this.mediclaimPremiumTransactionDetailEdit !== null
              ? 'Mediclaim Premium'
              : this.preventiveHealthCheckupTransactionDetailEdit !== null
              ? 'Preventive Health Check Up'
              : this.medicalExpenseTransactionDetailEdit !== null
              ? 'Medical Expenses for Parents'
              : '';
          console.log('editExpenseType', this.editExpenseType);
        }
        if (
          res.data.results[0].mediclaimTransactionDocumentDetailList !== null ||
          res.data.results[0].mediclaimTransactionDocumentDetailList !=
            undefined
        ) {
          this.documentDetailListEdit =
            res.data.results[0].mediclaimTransactionDocumentDetailList;
        }
        this.initialArrayIndex = [];

        this.editProofSubmissionId =
          res.data.results[0].mediclaimTransactionDocumentDetailList[0].proofSubmissionId;
        this.editReceiptAmount =
          res.data.results[0].mediclaimTransactionDocumentDetailList[0].receiptAmount;

        // this.grandDeclarationTotalEditModal =
        //   res.data.results[0].grandDeclarationTotal;
        // this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        // this.grandRejectedTotalEditModal =
        //   res.data.results[0].grandRejectedTotal;
        // this.grandApprovedTotalEditModal =
        //   res.data.results[0].grandApprovedTotal;
        // console.log(this.urlArray);
        // this.urlArray.forEach((element) => {
        //   element.blobURI = 'data:image/image;base64,' + element.blobURI;
        // });
        // this.editTransactionUpload.forEach((element) => {
        //   element.mediclaimTransactionList.forEach((innerElement) => {
        //     innerElement.declaredAmount = this.numberFormat.transform(
        //       innerElement.declaredAmount,
        //     );
        //     innerElement.actualAmount = this.numberFormat.transform(
        //       innerElement.actualAmount,
        //     );
        //   });
        // });
      });
  }

  // -----------Common Function for filter to call API---------------
  getTransactionFilterData(expenseType: String, institution: String) {
    this.mediclaim80DService
      .getTransactionFilterData(expenseType, institution)
      .subscribe((res) => {
        if (
          res.data.results[0].mediclaimTransactionDetail != null ||
          res.data.results[0].mediclaimTransactionDetail != undefined
        ) {
          this.mediclaimPremiumTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail;
          this.preventiveHealthCheckupTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail;
          this.medicalExpenseTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail;
        }
        if (
          res.data.results[0].mediclaimTransactionDocumentDetailList != null ||
          res.data.results[0].mediclaimTransactionDocumentDetailList !=
            undefined
        ) {
          this.documentDetailList =
            res.data.results[0].mediclaimTransactionDocumentDetailList;
        }
        this.initialArrayIndex = [];

        if (this.mediclaimPremiumTransactionDetail != null) {
          if (this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.length > 0) {
            this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach((element) => {
                this.initialArrayIndex.push(element.mediclaimTransactionList.length);
                element.mediclaimTransactionList.forEach((innerElement) => {
                  if (innerElement.dateOfPayment !== null) {
                    innerElement.dateOfPayment = new Date(
                      innerElement.dateOfPayment
                    );
                  }

                  if (innerElement.isECS === 0) {
                    this.glbalECS == 0;
                  } else if (innerElement.isECS === 1) {
                    this.glbalECS == 1;
                  } else {
                    this.glbalECS == 0;
                  }
                  innerElement.declaredAmount = this.numberFormat.transform(
                    innerElement.declaredAmount
                  );

                  innerElement.actualAmount = this.numberFormat.transform(
                    innerElement.actualAmount
                  );
                  console.log(
                    'numberFormat mediclaimPremiumTransactionDetail ',
                    innerElement.actualAmount
                  );
                });
              }
            );
          }
        }else if (this.expenseType == 'Preventive Health Check Up') {
          this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach((element) => {
              // this.initialArrayIndex.push(element.length);
                  if (element.dateOfPayment !== null) {
                    element.dateOfPayment = new Date(
                      element.dateOfPayment
                    );
                  }

                  element.declaredAmount = this.numberFormat.transform(
                    element.declaredAmount
                  );

                  element.actualAmount = this.numberFormat.transform(
                    element.actualAmount
                  );
            }
          );
        }else if (this.medicalExpenseTransactionDetail != null) {
          if (this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.length > 0) {
            this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach((element) => {
            this.initialArrayIndex.push(element.medicalExpenseTransactionDetail.medicalExpenseTransactionList.length);
              element.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach(
                (innerElement) => {
                  if (innerElement.dateOfPayment !== null) {
                    innerElement.dateOfPayment = new Date(
                      innerElement.dateOfPayment
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
          }
        }
      });
  }

  // Upload Document And save Edited Transaction
  public uploadUpdateTransaction() {
    let data: any = {};

    this.mediclaimTransList = [];
    if (this.editExpenseType == 'Mediclaim Premium') {
      if (
        this.mediclaimPremiumTransactionDetailEdit
          .mediclaimPremiumTransactionList.length > 0
      ) {
        this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList.forEach(
          (element) => {
            // if(this.mediclaimTransactionList.length > 0){
            element.mediclaimTransactionList.forEach((innerElement) => {
              //   if (innerElement.declaredAmount !== null) {
              //   innerElement.declaredAmount = innerElement.declaredAmount
              //     .toString()
              //     .replace(/,/g, '');
              // } else {
              //   innerElement.declaredAmount = 0.0;
              // }
              // if (innerElement.actualAmount !== null) {
              //   innerElement.actualAmount = innerElement.actualAmount
              //     .toString()
              //     .replace(/,/g, '');
              // } else {
              //   innerElement.actualAmount = 0.0;
              // }
              const dateOfPaymnet = this.datePipe.transform(
                innerElement.dateOfPayment,
                'yyyy-MM-dd'
              );
              innerElement.dateOfPayment = dateOfPaymnet;
              this.uploadGridData.push(innerElement.mediclaimTransactionId);
              this.mediclaimTransList.push(innerElement);
            });
            // }
          }
        );
      }
    } else if (this.editExpenseType == 'Preventive Health Check Up') {
      if (
        this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList.length > 0) {
        this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList.forEach(
          (innerElement) => {
            // if (innerElement.declaredAmount !== null) {
            //   innerElement.declaredAmount = innerElement.declaredAmount
            //     .toString()
            //     .replace(/,/g, '');
            // } else {
            //   innerElement.declaredAmount = 0.0;
            // }
            if (innerElement.actualAmount !== null) {
              innerElement.actualAmount = innerElement.actualAmount
                .toString()
                .replace(/,/g, '');
            } else {
              innerElement.actualAmount = 0.0;
            }

            const dateOfPaymnet = this.datePipe.transform(
              innerElement.dateOfPayment,
              'yyyy-MM-dd'
            );

            innerElement.dateOfPayment = dateOfPaymnet;
            this.uploadGridData.push(innerElement.mediclaimTransactionId);
                delete innerElement.mediclaimBenefeciaryDetailList;
            this.mediclaimTransList.push(innerElement);
          }
        );
      }
    } else if (this.editExpenseType == 'Medical Expenses for Parents') {
      if (
        this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList.length > 0) {
        this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList.forEach(
          (innerElement) => {
            // if (innerElement.declaredAmount !== null) {
            //   innerElement.declaredAmount = innerElement.declaredAmount
            //     .toString()
            //     .replace(/,/g, '');
            // } else {
            //   innerElement.declaredAmount = 0.0;
            // }
            if (innerElement.actualAmount !== null) {
              innerElement.actualAmount = innerElement.actualAmount
                .toString()
                .replace(/,/g, '');
            } else {
              innerElement.actualAmount = 0.0;
            }

            const dateOfPaymnet = this.datePipe.transform(
              innerElement.dateOfPayment,
              'yyyy-MM-dd'
            );

            innerElement.dateOfPayment = dateOfPaymnet;
            this.uploadGridData.push(innerElement.mediclaimTransactionId);
            delete innerElement.mediclaimBenefeciaryDetailList;
            this.mediclaimTransList.push(innerElement);
          }
        );
      }
    }

    // console.log("this.editExpenseType",this.editExpenseType);
    //   let data: any = {};

    //     // if (this.uploadGridData.length > 0) {
    //     //   for (let i = 0; i < this.uploadGridData.length; i++) {
    //         // to check with medical premium
    //         if (this.editExpenseType == 'Mediclaim Premium') {
    //           const medPremTransList = this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList;
    //           for (let k = 0; k < medPremTransList.length; k++) {
    //             if (this.globalPolicy == medPremTransList[k].institution){
    //               const medTransList = this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[k].mediclaimTransactionList;
    //               for (let j = 0; j < medTransList.length; j++) {
    //                 this.uploadGridData.push(medTransList[k].mediclaimMasterId);
    //                 if (this.uploadGridData[0] == medTransList[k].mediclaimTransactionId) {
    //                   this.mediclaimTransList.push(medTransList[j]);
    //                 }
    //               }
    //               data.mediclaimTransactionList = this.mediclaimTransList;
    //             }
    //           }
    //         }

    // to check with Preventive Health Check Up
    // if (this.editExpenseType == 'Preventive Health Check Up') {
    //   const prevHealthCheckupTransList = this
    //     .preventiveHealthCheckupTransactionDetailEdit
    //     .preventiveHealthCheckupTransactionList;
    //   const abc = this.preventiveHealthCheckupTransactionDetailEdit
    //     .preventiveHealthCheckupTransactionList;
    //   abc.forEach((element) => {
    //     delete element.mediclaimBenefeciaryDetailList;
    //   });
    //   for (let j = 0; j < prevHealthCheckupTransList.length; j++) {
    //     this.uploadGridData.push(
    //       prevHealthCheckupTransList[j].mediclaimTransactionId
    //     );
    //     if (
    //       this.uploadGridData[0] ==
    //       prevHealthCheckupTransList[j].mediclaimTransactionId
    //     ) {
    //       this.mediclaimTransList.push(prevHealthCheckupTransList[j]);
    //     }
    //   }
    //   data.mediclaimTransactionList = this.mediclaimTransList;
    // }

    // to check with Medical Expenses for Parents
    // if (this.editExpenseType == 'Medical Expenses for Parents') {
    //   const medExpTransList = this.medicalExpenseTransactionDetailEdit
    //     .medicalExpenseTransactionList;
    //   const parentsDelete = this.medicalExpenseTransactionDetailEdit
    //     .medicalExpenseTransactionList;
    //   parentsDelete.forEach((element) => {
    //     delete element.mediclaimBenefeciaryDetailList;
    //   });
    //   for (let j = 0; j < medExpTransList.length; j++) {
    //     this.uploadGridData.push(medExpTransList[j].mediclaimTransactionId);
    //     if (
    //       this.uploadGridData[0] == medExpTransList[j].mediclaimTransactionId
    //     ) {
    //       this.mediclaimTransList.push(medExpTransList[j]);
    //     }
    //   }
    //   data.mediclaimTransactionList = this.mediclaimTransList;
    // }
    //   }
    // }
    data.mediclaimTransactionList = this.mediclaimTransList;
    data.mediclaimTransactionIds = this.uploadGridData;
    data.receiptAmount = this.editReceiptAmount;
    data.proofSubmissionId = this.editProofSubmissionId;
    // data.documentRemark = this.documentRemark;
    console.log('data::', data);

    this.mediclaim80DService
      .uploadMediclaim80DDocument(this.editfilesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.mediclaimPremiumTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail;
          this.preventiveHealthCheckupTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail;
          this.medicalExpenseTransactionDetail =
            res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail;
          this.documentDetailList =
            res.data.results[0].mediclaimTransactionDocumentDetailList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList.forEach(
            (element) => {
              this.initialArrayIndex.push(
                element.mediclaimTransactionList.length
              );
              element.mediclaimTransactionList.forEach((innerElement) => {
                if (innerElement.dateOfPayment !== null) {
                  innerElement.dateOfPayment = new Date(
                    innerElement.dateOfPayment
                  );
                }

                if (innerElement.isECS === 0) {
                  this.glbalECS == 0;
                } else if (innerElement.isECS === 1) {
                  this.glbalECS == 1;
                } else {
                  this.glbalECS == 0;
                }

                // innerElement.declaredAmount = this.numberFormat.transform(
                //   innerElement.declaredAmount,
                // );

                // innerElement.actualAmount = this.numberFormat.transform(
                //   innerElement.actualAmount,
                // );
              });
            }
          );

          this.mediclaimTransactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.preventiveHealthCheckupTransactionDetailEdit
                .preventiveHealthCheckupTransactionList.length
            );

            element.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList.forEach(
              (innerElement) => {
                if (innerElement.dateOfPayment !== null) {
                  innerElement.dateOfPayment = new Date(
                    innerElement.dateOfPayment
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
          this.getTransactionFilterData(
            this.data.expenseType,
            this.data.institution
          );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
  }

  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.mediclaim80DService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].mediclaimTransactionDocumentDetailList[0].documentDetailList;
        this.urlArray.forEach((element) => {
          element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
            element.blobURI
          );
        });
        console.log(this.urlArray);
      });
  }

  // ---- Set Date of Payment On Main Page----
  setDateOfPaymentExpense(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      // dueDate: any;
    },
    i: number
  ) {
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[i]
        .dateOfPayment
    );
  }

  // ---- Set Date of Payment On Main Page----
  setDateOfPaymentPreventive(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      // dueDate: any;
    },
    i: number
  ) {
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].dateOfPayment
    );
  }

  // ---- Set Date of Payment On Main Page----
  setDateOfPaymentParents(
    summary: {
      previousEmployerName: any;
      // declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      // dueDate: any;
    },
    i: number
  ) {
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.preventiveHealthCheckupTransactionDetail
        .preventiveHealthCheckupTransactionList[i].dateOfPayment
    );
  }

  // ---- Set Date of Payment On Main Page----
  setDateOfPayment(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
    },
    i: number,
    j: number
  ) {
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[i].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j]
        .mediclaimTransactionList[i].dateOfPayment
    );
  }

  // ---- Set Date of Payment On Edit Modal----
  setDateOfPaymentInEditCaseMediclaim(
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
    this.mediclaimPremiumTransactionDetailEdit.mediclaimPremiumTransactionList[
      j
    ].mediclaimTransactionList[i].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.mediclaimPremiumTransactionDetailEdit
        .mediclaimPremiumTransactionList[j].mediclaimTransactionList[i]
        .dateOfPayment
    );
  }

  // ---- Set Date of Payment On Edit Modal----
  setDateOfPaymentInEditCasePreventive(
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
    // this.editTransactionUpload[j].preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[j].dateOfPayment = summary.dateOfPayment;
    this.preventiveHealthCheckupTransactionDetailEdit.preventiveHealthCheckupTransactionList[
      j
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.editTransactionUpload[j].preventiveHealthCheckupTransactionDetailEdit
        .preventiveHealthCheckupTransactionList[i].dateOfPayment
    );
  }

  // ---- Set Date of Payment On Edit Modal----
  setDateOfPaymentInEditCaseExpence(
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
    this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[
      j
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.medicalExpenseTransactionDetailEdit.medicalExpenseTransactionList[j]
        .dateOfPayment
    );
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
}

class DeclarationService {
  public mediclaimTransactionId = 0;
  // public mediclaimPaymentDetailId: number;
  // public mediclaimBenefeciaryDetailId : number;
  public previousEmployerId = 0;
  public declaredAmount: number;
  public dateOfPayment: Date;
  public actualAmount: number;
  public transactionStatus: 'Pending';
  public rejectedAmount: number;
  public approvedAmount: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
