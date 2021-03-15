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
  styleUrls: ['./mediclaim-declaration.component.scss']
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

  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public mediclaimTransactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
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

  public mediclaimPremiumTransactionDetail: any;
  public preventiveHealthCheckupTransactionDetail: any;
  public medicalExpenseTransactionDetail: any;
  // public mediclaimPremiumTransactionList: Array<any> = [];
  public mediclaimPremiumTransactionList : any;
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
  public dueDate: Date;
  public dateOfPayment: Date;
  public date3: Date;
  public loaded = 0;

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

  public testnumber1: number =5000;
  public testnumber2: number =5000;
  public expenseType: string = 'All';

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
    public sanitizer: DomSanitizer,
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


    this.typeOfExpenceList = [
      {label: 'Mediclaim Premium', value: 'Mediclaim Premium'},
      {label: 'Preventive Health Check Up', value: 'Preventive Health Check Up'},
      {label: 'Medical Expenses For Parents(Senior Citizen/s)', value: 'Medical Expenses for Parents'},
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
<<<<<<< HEAD
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[i].previousEmployerId =
      event.target.value;
=======
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].previousEmployerId,
    );
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  }

   // Update Previous Employee in Main Page
   updatePreventive_PreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
<<<<<<< HEAD
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[i].previousEmployerId =
      event.target.value;
=======
    this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[i].previousEmployerId,
    );
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  }

   // Update Previous Employee in Main Page
   updateExpense_PreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
<<<<<<< HEAD
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionDetailList[i].previousEmployerId =
      event.target.value;
=======
    this.mediclaimTransactionDetail[j].medicalExpenseTransactionDetail.medicalExpenseTransactionDetailList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.mediclaimTransactionDetail[j].medicalExpenseTransactionDetail.medicalExpenseTransactionDetailList[i].previousEmployerId,
    );
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].mediclaimTransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].mediclaimTransactionList[i].previousEmployerId,
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
    this.mediclaim80DService
      .getMediclaimPremiumWithInstitutionList()
      .subscribe((res) => {
        console.log('getMediclaimList', res);
        this.transactionWithMediclaimInstitutionName = res.data.results;
          res.data.results[0].forEach((element) => {
          console.log('element', element)
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
<<<<<<< HEAD
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
    this.globalPolicy = institution;
    if (institution == 'All') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy
    );
  }

=======
  selectedTransactionInstName(institutionName: any) {
    this.globalInstitution = institutionName;
    this.getTransactionFilterData(this.globalInstitution, null);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPolicyList = [];
    this.transactionPolicyList.push(data);

    this.transactionWithMediclaimInstitutionName.forEach((element) => {
      if (institutionName === element.institution) {
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

    if (institutionName == 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
  }
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1


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
<<<<<<< HEAD


=======
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedexpenseTypeName(expenseType: any) {
    this.globalInstitution = expenseType;
    this.expenseType = expenseType;
    this.getTransactionFilterData(this.globalInstitution, null);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

<<<<<<< HEAD
    // this.transactionPolicyList = [];
    // this.transactionPolicyList.push(data);

    // this.transactionInstitutionListWithPolicies.forEach((element) => {
    //   if (institutionName === element.institution) {
=======
    // this.typeOfExpenceList = [];
    // this.typeOfExpenceList.push(data);

    // this.transactionWithExpenceList.forEach((element) => {
    //   if (expenseType === element.institution) {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    //     element.policies.forEach((policy) => {
    //       const policyObj = {
    //         label: policy,
    //         value: policy,
    //       };
<<<<<<< HEAD
    //       this.transactionPolicyList.push(policyObj);
    //     });
    //   } else if (institutionName === 'All') {
=======
    //       this.typeOfExpenceList.push(policyObj);
    //     });
    //   } else if (expenseType === 'All') {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    //     element.policies.forEach((policy) => {
    //       const policyObj = {
    //         label: policy,
    //         value: policy,
    //       };
<<<<<<< HEAD
    //       this.transactionPolicyList.push(policyObj);
=======
    //       this.typeOfExpenceList.push(policyObj);
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    //     });
    //   }
    // });

    if (expenseType == 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
<<<<<<< HEAD
    } else if (expenseType == 'Mediclaim Premium' ) {
      this.isDisabled = true;
=======
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
  }
<<<<<<< HEAD
=======
  // -------- On Policy selection show all transactions list accordingly all policies---------
  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy
    );
  }
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  // selectedTransactionStatus(transactionStatus: any) {
  //   this.getTransactionFilterData(
  //     this.globalInstitution,
  //     this.globalPolicy
  //   );
  // }


<<<<<<< HEAD

=======
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  // -------- ON select to check input boxex--------
  public onSelectCheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number,
  ) {
    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(',', ''),
    );

<<<<<<< HEAD
    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    if (checked) {
      if (this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].isECS === 1) {
        this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount =
          data.declaredAmount;
        this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[
          i
        ].dateOfPayment = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount,
        );
        console.log(
          'in IS dateOfPayment::',
          this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].dateOfPayment,
        );
      } else {
        this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount =
=======
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList.push(this.declarationService);

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    if (checked) {
      if (this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].isECS === 1) {
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount =
          data.declaredAmount;
          this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].dateOfPayment = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount,);
        console.log(
          'in IS dateOfPayment::',
           this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].dateOfPayment,);
      }
      // if (this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].isECS === 1) {
      //   this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount =
      //     data.declaredAmount;
      //   this.mediclaimTransactionDetail[j].mediclaimTransactionList[
      //     i
      //   ].dateOfPayment = new Date(data.dueDate);
      //   console.log(
      //     'in IS actualAmount::',
      //     this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount,
      //   );
      //   console.log(
      //     'in IS dateOfPayment::',
      //     this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].dateOfPayment,
      //   );
      // }

      else {
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount =
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
          data.declaredAmount;
      }

      formatedActualAmount = Number(
<<<<<<< HEAD
        this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount
=======
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
          .toString()
          .replace(',', ''),
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount,
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.mediclaimTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
<<<<<<< HEAD
        this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount
          .toString()
          .replace(',', ''),
      );
      this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].dateOfPayment = null;
=======
        this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount
          .toString()
          .replace(',', ''),
      );
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].actualAmount = this.numberFormat.transform(0);
      this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].dateOfPayment = null;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount,
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.mediclaimTransactionId);
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
<<<<<<< HEAD
    this.mediclaimPremiumTransactionList[j].mediclaimTransactionList.forEach((element) => {
=======
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList.forEach((element) => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', ''),
      );
    });
<<<<<<< HEAD
    this.mediclaimPremiumTransactionList[j].actualTotal = this.actualTotal;
=======
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].actualTotal = this.actualTotal;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

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
    j: number,
  ) {
    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(',', ''),
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    console.log(
      'in IS ECS::',
      this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].isECS,
    );
    if (checked) {
      if (this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].isECS === 1) {
        this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].actualAmount =
          data.declaredAmount;
        this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[
          i
        ].dateOfPayment = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].actualAmount,
        );
        console.log(
          'in IS dateOfPayment::',
          this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].dateOfPayment,
        );
      } else {
        this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].actualAmount =
          data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].actualAmount
          .toString()
          .replace(',', ''),
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount,
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.mediclaimTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
        this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].actualAmount
          .toString()
          .replace(',', ''),
      );
      this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList[i].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount,
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.mediclaimTransactionId);
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', ''),
      );
    });
    this.mediclaimTransactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
    console.log(this.uploadGridData);
    console.log(this.uploadGridData.length);
  }

   // -------- ON select to check input boxex Medical Expense Transaction--------
   public onSelectExpense_CheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number,
  ) {
    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(',', ''),
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    console.log(
      'in IS ECS::',
      this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].isECS,
    );
    if (checked) {
      if (this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].isECS === 1) {
        this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].actualAmount =
          data.declaredAmount;
        this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[
          i
        ].dateOfPayment = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].actualAmount,
        );
        console.log(
          'in IS dateOfPayment::',
          this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].dateOfPayment,
        );
      } else {
        this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].actualAmount =
          data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].actualAmount
          .toString()
          .replace(',', ''),
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount,
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.mediclaimTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
        this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].actualAmount
          .toString()
          .replace(',', ''),
      );
      this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.mediclaimTransactionDetail[j].medicalExpenseTransactionList[i].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount,
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.mediclaimTransactionId);
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.mediclaimTransactionDetail[j].medicalExpenseTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', ''),
      );
    });
    this.mediclaimTransactionDetail[j].actualTotal = this.actualTotal;

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
<<<<<<< HEAD
        item.mediclaimPremiumTransactionList.forEach((element) => {
          this.uploadGridData.push(element.mediclaimTransactionId);
=======
        item.electricVehicleLoanTransactionPreviousEmployerList.forEach((element) => {
          this.uploadGridData.push(element.electricVehicleLoanTransactionId);
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
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
      item.mediclaimTransactionDetail.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach((element) => {
        this.uploadGridData.push(element.mediclaimTransactionId);
      });
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
        item.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach((element) => {
          this.uploadGridData.push(element.mediclaimTransactionId);
        });
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
        item.mediclaimTransactionDetail.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList.forEach((element) => {
          this.uploadGridData.push(element.mediclaimTransactionId);
        });
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
    j: number,
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

<<<<<<< HEAD
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList[i].declaredAmount = this.declarationService.declaredAmount;
    // const formatedDeclaredAmount = this.numberFormat.transform(
    //   this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[i].declaredAmount,
    // );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    // this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[
    //   i
    // ].declaredAmount = ;
=======
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionList[i].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].declaredAmount,
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

    this.declarationTotal = 0;
    // this.declaredAmount=0;

<<<<<<< HEAD
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList.forEach((element) => {
      // console.log(element.declaredAmount.toString().replace(',', ""));
      // this.declarationTotal += Number(
      //   element.declaredAmount.toString().replace(',', ''),
      // );
      this.declarationTotal += element.declaredAmount;
      console.log(this.declarationTotal);
      this.declaredAmount+= element.actualAmount;
    });

    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].declaredTotal = this.declarationTotal;
=======
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList.forEach((element) => {
      console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(',', ''),
      );
      console.log(this.declarationTotal);
      this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

    this.mediclaimTransactionDetail[j].declarationTotal = this.declarationTotal;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    // console.log( "DeclarATION total==>>" + this.mediclaimTransactionDetail[j].declarationTotal);
  }

  // --------------- ON change of declared Amount Main Page Preventive Health Checkup-------------
  onPreventiveDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
      dueDate: Date;
    },
    i: number,
    j: number,
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

<<<<<<< HEAD
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[i].declaredAmount,
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
=======
    this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[i].declaredAmount,
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

<<<<<<< HEAD
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach((element) => {
=======
    this.mediclaimTransactionDetail[j].preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList.forEach((element) => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(',', ''),
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

<<<<<<< HEAD
    this.preventiveHealthCheckupTransactionDetail.preventiveHealthCheckupTransactionList[j] = this.declarationTotal;
=======
    this.mediclaimTransactionDetail[j].declarationTotal = this.declarationTotal;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    // console.log( "DeclarATION total==>>" + this.mediclaimTransactionDetail[j].declarationTotal);
  }

  // --------------- ON change of declared Amount Main Page Preventive Health Checkup-------------
  onExpenseDeclaredAmountChange(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
      dueDate: Date;
    },
    i: number,
    j: number,
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

<<<<<<< HEAD
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[i].declaredAmount,
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[
=======
    this.mediclaimTransactionDetail[j].medicalExpenseTransactionDetail.medicalExpenseTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.mediclaimTransactionDetail[j].medicalExpenseTransactionDetail.medicalExpenseTransactionList[i].declaredAmount,
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.mediclaimTransactionDetail[j].medicalExpenseTransactionDetail.medicalExpenseTransactionList[
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

<<<<<<< HEAD
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach((element) => {
=======
    this.mediclaimTransactionDetail[j].medicalExpenseTransactionDetail.medicalExpenseTransactionList.forEach((element) => {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(',', ''),
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

<<<<<<< HEAD
    this.medicalExpenseTransactionDetail.medicalExpenseTransactionList[j].declarationTotal = this.declarationTotal;
=======
    this.mediclaimTransactionDetail[j].declarationTotal = this.declarationTotal;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
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
    j: number,
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onDeclaredAmountChangeInEditCase Amount change::' +
        summary.declaredAmount,
    );

    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].mediclaimTransactionList[i].declaredAmount,
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].mediclaimTransactionList.forEach((element) => {
      console.log(
        'declaredAmount::',
        element.declaredAmount.toString().replace(',', ''),
      );
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(',', ''),
      );
      // console.log(this.declarationTotal);
    });

    this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
    console.log(
      'DeclarATION total==>>' + this.editTransactionUpload[j].declarationTotal,
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
    j: number,
  ) {
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].dueDate = summary.dueDate;
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
    j: number,
  ) {
    this.editTransactionUpload[j].mediclaimTransactionList[i].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].mediclaimTransactionList[i].dueDate,
    );
  }

  // ------------Actual Amount change main Page-----------
  onActualAmountChange(
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
<<<<<<< HEAD
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail[i].actualAmount = this.declarationService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].actualAmount,
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[
=======
    // console.log("Actual Amount change::" , summary);

    this.mediclaimTransactionDetail[j].mediclaimTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount,
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      i
    ].actualAmount = formatedActualAmount;

    if (
<<<<<<< HEAD
      this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].actualAmount !==
        Number(0) ||
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount !== null
    ) {
      this.isDisabled = false;
    } else {
=======
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount !==
        Number(0) ||
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount);
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
<<<<<<< HEAD
    this.mediclaimTransactionDetail[j].mediclaimPremiumTransactionDetail.mediclaimTransactionList[i].forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', ''),
      );
    });
    this.mediclaimTransactionDetail[j].actualTotal = this.actualTotal;
=======
    this.mediclaimTransactionDetail[j].mediclaimTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', ''),
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.mediclaimTransactionDetail[j].actualTotal = this.actualTotal;
    // this.mediclaimTransactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.mediclaimTransactionDetail[j]);
    // console.log(this.actualTotal);
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCase(
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

    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j].mediclaimTransactionList[i].actualAmount,
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].mediclaimTransactionList[i].actualAmount,
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[j].mediclaimTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j].mediclaimTransactionList[i].actualAmount !==
        Number(0) ||
      this.editTransactionUpload[j].mediclaimTransactionList[i].actualAmount !== null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j].mediclaimTransactionList[i].actualAmount,
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j].mediclaimTransactionList[i].actualAmount,
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[j].mediclaimTransactionList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(',', ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(',', ''),
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }

  // --------Add New ROw Function---------
<<<<<<< HEAD
=======
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
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
    j: number,
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
    this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList.push(this.declarationService);
    console.log('addRow::', this.mediclaimPremiumTransactionDetail.mediclaimPremiumTransactionList[j].mediclaimTransactionList);
  }


  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount = this.mediclaimTransactionDetail[j].mediclaimTransactionList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.mediclaimTransactionDetail[j].mediclaimTransactionList.length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.mediclaimTransactionDetail[j].mediclaimTransactionList.splice(rowCount, 1);
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
    j: any,
  ) {
    this.declarationService = new DeclarationService(summary);
  }

  updateDeclrationRow(i: string | number, j: string | number) {
    // tslint:disable-next-line: max-line-length
    this.mediclaimTransactionDetail[j].actualTotal +=
      this.declarationService.actualAmount -
      this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].actualAmount;
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[i] = this.declarationService;
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
    this.mediclaimTransactionDetail[j].mediclaimTransactionList.push(this.declarationService);
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
          'yyyy-MM-dd',
        );
      });
    });
    const data = this.mediclaimTransactionDetail;
    this.mediclaim80DService.postMediclaimTransaction(data).subscribe((res) => {
      console.log(res);
      this.mediclaimTransactionDetail = res.data.results[0].mediclaimTransactionDetail;
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
        'Please attach Premium Receipt / Premium Statement',
      );
      return;
    }
    console.log('this.mediclaimTransactionDetail::', this.mediclaimTransactionDetail);

    this.mediclaimTransactionDetail.forEach((element) => {
      element.mediclaimTransactionList.forEach((innerElement) => {
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
          'yyyy-MM-dd',
        );
        const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd',
        );

        innerElement.dateOfPayment = dateOfPaymnet;
        innerElement.dueDate = dueDate;
      });
    });

    this.receiptAmount = this.receiptAmount.toString().replace(',', '');

<<<<<<< HEAD
    let data: any = {};
    if (this.expenseType == 'Mediclaim Premium') {
      data.mediclaimTransactionList = this.mediclaimTransactionDetail;
    }
    if (this.expenseType == 'Preventive Health Check Up') {
      data.mediclaimTransactionList = this.preventiveHealthCheckupTransactionDetail;
    }
    if (this.expenseType == 'Medical Expenses for Parents') {
      data.mediclaimTransactionList = this.medicalExpenseTransactionDetail;
    }
    data.mediclaimTransactionIds = this.uploadGridData;
    data.receiptAmount = this.receiptAmount;
    data.documentRemark = this.documentRemark;
=======
    const data = {
      mediclaimTransactionList: this.mediclaimTransactionDetail,
      mediclaimTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
    };
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    console.log('data::', data);

    this.mediclaim80DService
      .uploadMediclaim80DDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {

<<<<<<< HEAD
          this.mediclaimPremiumTransactionDetail = res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail;
          this.preventiveHealthCheckupTransactionDetail = res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail;
          this.medicalExpenseTransactionDetail = res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail;
=======
          this.mediclaimTransactionDetail = res.data.results[0].mediclaimTransactionList;
          this.preventiveHealthCheckupTransactionDetail = res.data.results[0].mediclaimTransactionList;
          this.medicalExpenseTransactionDetail = res.data.results[0].mediclaimTransactionList;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
          this.documentDetailList = res.data.results[0].mediclaimTransactionDocumentDetailList;
          this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.mediclaimTransactionDetail.forEach((element) => {

            this.initialArrayIndex.push(element.mediclaimTransactionList.length);

            element.mediclaimTransactionList.forEach((innerElement) => {

              if (innerElement.dateOfPayment !== null) {
                innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
              }

              if (innerElement.isECS === 0) {
                this.glbalECS == 0;
              } else if (innerElement.isECS === 1) {
                this.glbalECS == 1;
              } else {
                this.glbalECS == 0;
              }

              innerElement.declaredAmount = this.numberFormat.transform(
                innerElement.declaredAmount,
              );

              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount,
              );
            });
          });

          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            '',
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
      let globalSelectedAmount_ : number;

      receiptAmount_ = parseFloat(this.receiptAmount.replace(/,/g, ''));
      globalSelectedAmount_ = parseFloat(this.globalSelectedAmount.replace(/,/g, ''));

      console.log(receiptAmount_);
      console.log(globalSelectedAmount_);
      if (receiptAmount_ < globalSelectedAmount_) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines',
      );
    } else if (receiptAmount_ > globalSelectedAmount_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmount_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount',
      );
    }
      this.receiptAmount= this.numberFormat.transform(this.receiptAmount);
  }

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }

  UploadedDocumentModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }

  UploadedDocumentModal1(template1: TemplateRef<any>, documentIndex: number) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' }),
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
    this.mediclaimTransactionDetail[0].mediclaimTransactionList[i].dateOfPayment = dueDate;
    this.declarationService.dateOfPayment = this.mediclaimTransactionDetail[0].mediclaimTransactionList[
      i
    ].dateOfPayment;
    // this.dateOfPayment = dueDate;
    alert('hiiii');
    console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
  }

  // When Edit of Document Details
  declarationEditUpload(
    template2: TemplateRef<any>,
    proofSubmissionId: string,
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' }),
    );

    this.mediclaim80DService.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(
      (res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].mediclaimTransactionDocumentDetailList[0].documentDetailList;
        this.editTransactionUpload = res.data.results[0].mediclaimTransactionDetail;
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.editReceiptAmount = res.data.results[0].receiptAmount;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;
        // console.log(this.urlArray);
        this.urlArray.forEach((element) => {
          // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
          element.blobURI = 'data:image/image;base64,' + element.blobURI;
          // new Blob([element.blobURI], { type: 'application/octet-stream' });
        });
        this.editTransactionUpload.forEach((element) => {
          element.mediclaimTransactionList.forEach((innerElement) => {
            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount,
            );
            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount,
            );
          });
        });
        // console.log('converted:: ', this.urlArray);
      },
    );
  }

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

  docViewer(template3: TemplateRef<any>) {
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

  // -----------Common Function for filter to call API---------------
  getTransactionFilterData(
    expenseType: String,
    institution: String,
  ) {
    this.mediclaim80DService.getTransactionFilterData(
<<<<<<< HEAD
      expenseType,
      institution
=======
      // expenseType,
      // institution
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    ).subscribe((res) => {
      console.log(res);

      this.mediclaimPremiumTransactionDetail = res.data.results[0].mediclaimTransactionDetail.mediclaimPremiumTransactionDetail;
      console.log("mediclaimPremiumTransactionDetail",this.mediclaimPremiumTransactionDetail);
      this.preventiveHealthCheckupTransactionDetail = res.data.results[0].mediclaimTransactionDetail.preventiveHealthCheckupTransactionDetail;
      console.log("Preventive Health Check up",this.preventiveHealthCheckupTransactionDetail);
      this.medicalExpenseTransactionDetail = res.data.results[0].mediclaimTransactionDetail.medicalExpenseTransactionDetail;
      console.log("Expense Transaction Detail",this.medicalExpenseTransactionDetail);

      this.documentDetailList = res.data.results[0].mediclaimTransactionDocumentDetailList;

      this.initialArrayIndex = [];

      this.mediclaimTransactionDetail.forEach((element) => {

        this.initialArrayIndex.push(element.mediclaimTransactionList.length);

        element.mediclaimTransactionList.forEach((innerElement) => {

          if (innerElement.dateOfPayment !== null) {
            innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
          }

          if (innerElement.isECS === 0) {
            this.glbalECS == 0;
          } else if (innerElement.isECS === 1) {
            this.glbalECS == 1;
          } else {
            this.glbalECS == 0;
          }

          innerElement.declaredAmount = this.numberFormat.transform(
            innerElement.declaredAmount,
          );

          innerElement.actualAmount = this.numberFormat.transform(
            innerElement.actualAmount,
          );
        });
      });
    });
  }

  // Upload Document And save Edited Transaction
  public uploadUpdateTransaction() {

    console.log(
      'uploadUpdateTransaction editTransactionUpload::',
      this.editTransactionUpload,
    );

    this.editTransactionUpload.forEach((element) => {
      element.mediclaimTransactionList.forEach((innerElement) => {
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
          'yyyy-MM-dd',
        );
        const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd',
        );

        innerElement.dateOfPayment = dateOfPaymnet;
        innerElement.dueDate = dueDate;
        this.uploadGridData.push(innerElement.mediclaimTransactionId);
      });
    });

    this.editTransactionUpload.forEach((element) => {
      element.mediclaimTransactionList.forEach((innerElement) => {
        const dateOfPaymnet = this.datePipe.transform(
          innerElement.dateOfPayment,
          'yyyy-MM-dd',
        );
        innerElement.dateOfPayment = dateOfPaymnet;
      });
    });

    const data = {
<<<<<<< HEAD
      proofSubmissionId: this.mediclaimTransactionDetail[0].proofSubmissionId,
      mediclaimTransactionDetail: this.editTransactionUpload,
      mediclaimTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      // documentRemark: this.documentRemark,
      // proofSubmissionId: this.editProofSubmissionId,
      // receiptAmount: this.editReceiptAmount,
    };



=======
      mediclaimTransactionDetail: this.editTransactionUpload,
      mediclaimTransactionIds: this.uploadGridData,
      // documentRemark: this.documentRemark,
      proofSubmissionId: this.editProofSubmissionId,
      receiptAmount: this.editReceiptAmount,
    };
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
    console.log('uploadUpdateTransaction data::', data);

    this.mediclaim80DService
      .uploadMediclaim80DDocument(this.editfilesArray, data)
      .subscribe((res) => {
        console.log('uploadUpdateTransaction::', res);
        if (res.data.results.length > 0) {

          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            '',
          );

          this.mediclaimTransactionDetail = res.data.results[0].mediclaimTransactionDetail;
          this.documentDetailList = res.data.results[0].mediclaimTransactionDocumentDetailList;
          this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.mediclaimTransactionDetail.forEach((element) => {

            this.initialArrayIndex.push(element.mediclaimTransactionList.length);

            element.mediclaimTransactionList.forEach((innerElement) => {

              if (innerElement.dateOfPayment !== null) {
                innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
              }

              if (innerElement.isECS === 0) {
                this.glbalECS == 0;
              } else if (innerElement.isECS === 1) {
                this.glbalECS == 1;
              } else {
                this.glbalECS == 0;
              }

              innerElement.declaredAmount = this.numberFormat.transform(
                innerElement.declaredAmount,
              );

              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount,
              );
            });
          });
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
  }

  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.mediclaim80DService.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(
      (res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].mediclaimTransactionDocumentDetailList[0].documentDetailList;
        this.urlArray.forEach((element) => {
          element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
            element.blobURI,
          );
        });
        console.log(this.urlArray);
      },
    );
  }

  // ---- Set Date of Payment On Main Page----
  setDateOfPayment(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number,
  ) {
    this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].dateOfPayment =
      summary.dateOfPayment;
    console.log(this.mediclaimTransactionDetail[j].mediclaimTransactionList[i].dateOfPayment);
  }

  // ---- Set Date of Payment On Edit Modal----
  setDateOfPaymentInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: any;
    },
    i: number,
    j: number,
  ) {
    this.editTransactionUpload[j].mediclaimTransactionList[i].dateOfPayment =
      summary.dateOfPayment;
    console.log(
      this.editTransactionUpload[j].mediclaimTransactionList[i].dateOfPayment,
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
