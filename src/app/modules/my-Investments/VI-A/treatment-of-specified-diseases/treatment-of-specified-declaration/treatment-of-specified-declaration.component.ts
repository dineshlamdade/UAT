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
import { TreatmentOfSpecifiedService } from '../treatment-of-specified.service';

@Component({
  selector: 'app-treatment-of-specified-declaration',
  templateUrl: './treatment-of-specified-declaration.component.html',
  styleUrls: ['./treatment-of-specified-declaration.component.scss'],
})
export class TreatmentOfSpecifiedDeclarationComponent implements OnInit {
  public enteredRemark = '';
  @Input() public patientName: string;
  @Input() public data: any;

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
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public currentGroupTransactionList: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public patientNameList: Array<any> = [];
  public specifiedDiseaseTransactionPreviousEmployerList;
  public specifiedDiseaseTransactionList;
  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public createDateTime: any;
  public lastModifiedDateTime: any;
  public transactionStatus: any;
  public editReceiptAmount: string;
  public : Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionWithPatientName: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];

  documentDataArray = [];
  editdDocumentDataArray = [];

  viewDocumentName: any;
  viewDocumentType: any;

  documentArray: any[] =[];
  public modalRef1: BsModalRef;

  documentPassword =[];
  remarkList =[];
  editdocumentPassword =[];
  editremarkList =[];
  document3Password: any;
  remark3List: any;
  Remark: any;


  public editProofForAmountSpent: File[] = [];
  public editProofForRecoveryFromInsuranceCompany: File[] = [];
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
  public particularsList: Array<any> = [];
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

  public lastIndexOf: number[] = [];
  public initialArrayIndex: number[] = [];
  public declarationService: DeclarationService;
  public displayUploadFile = false;
  public uploadedFiles: any[] = [];
  public viewTransactionDetail = true;
  public masterUploadFlag = true;
  public dateOfPaymentGlobal: Date;
  public actualAmountGlobal: number;
  public dueDate: Date;
  public dateOfPayment: Date;
  public date3: Date;
  public loaded = 0;
  public selectedFiles: FileList;
  public currentFileUpload: File;
  // public filesArray: File[] = [];
  public proofForAmountSpent: File[] = [];
  public proofForRecoveryFromInsuranceCompany: File[] = [];

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
  public globalInstitution = 'ALL';
  public globalPolicy = 'ALL';
  public globalTransactionStatus = 'ALL';
  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public canEdit : boolean;
  public visibilityFlag:boolean = false;
  public visibilityFlagForRecovery: boolean = false;
  editDocumentRemark: any;
  editfilesArray: any[];
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  selectedremarkIndex : any;
  currentJoiningDate: Date;
  selectedMasterId: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private treatmentOfSpecifiedService: TreatmentOfSpecifiedService,
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

    this.particularsList = [
      {
        label: 'Expenditure Incurred For Medical Treatment',
        value: 'Expenditure Incurred For Medical Treatment',
      },
      {
        label: 'Recovery From Insurance Company',
        value: 'Recovery From Insurance Company',
      },
      // {
      //   label: 'Reimbursement from the Employer',
      //   value: 'Reimbursement from the Employer',
      // },
    ];
  }

  public ngOnInit(): void {
    // console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      const input = this.data;
      this.globalInstitution = input.patientName;
      this.getpatientNameList();
      this.getTransactionFilterData(input.patientName);
      this.isDisabled = false;
      this.canEdit = input.canEdit;
      if(this.data.canView == true){
        this.isDisabled = true;
        
            } else {
              this.isDisabled = false;
            }
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
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[i].previousEmployerId = event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].previousEmployerId
    );
  }

  OnParticularsChange(event:any, i:number, j:number){
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[j].particulars = event.target.value;
  console.log(this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[j].particulars = event.target.value)
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
    this.patientNameList = [];
    this.transactionPolicyList = [];
    this.transactionStatustList = [];

    const data = {
      label: 'All',
      value: 'All',
    };

    this.patientNameList.push(data);
    this.transactionPolicyList.push(data);
    this.refreshTransactionStatustList();

    this.getpatientNameList();

    this.resetAll();
    this.selectedTransactionPatientName('All');
  }

  // tslint:disable-next-line: typedef
  public getpatientNameList() {
    this.treatmentOfSpecifiedService
      // .getElectricVehicleDeclarationLenderName()
      .getSpecifiedDiseaseNameList()
      .subscribe((res) => {
        console.log('getpatientNameList', res);
        this.transactionWithPatientName = res.data.results;
        res.data.results[0].forEach((element) => {
          console.log('element', element);
          const obj = {
            label: element,
            value: element,
          };
          this.patientNameList.push(obj);
        });
      });
    console.log('Patient Name List ', this.patientNameList);
  }

  // --------- On institution selection show all transactions list accordingly all policies--------
  public selectedTransactionPatientName(patientName: any): void {
    this.globalInstitution = patientName;
    this.getTransactionFilterData(this.globalInstitution);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPolicyList = [];
    this.transactionPolicyList.push(data);

    this.transactionWithPatientName.forEach((element) => {
      if (patientName === element.lender) {
        element.policies.forEach((policy) => {
          const policyObj = {
            label: policy,
            value: policy,
          };
          this.transactionPolicyList.push(policyObj);
        });
      } else if (patientName === 'All') {
        element.policies.forEach((policy) => {
          const policyObj = {
            label: policy,
            value: policy,
          };
          this.transactionPolicyList.push(policyObj);
        });
      }
    });

    if (patientName === 'All') {
      this.grandTabStatus = true;
      this.isDisabled = true;
    } else {
      this.grandTabStatus = false;
      this.isDisabled = false;
    }

    this.resetAll();
    console.log('isdisabled: ', this.isDisabled);
  }

  // -------- On Policy selection show all transactions list accordingly all policies---------
  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData(this.globalInstitution);
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData(this.globalInstitution);
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

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    // console.log(
    //   'in IS ECS::',
    //   this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
    //     i
    //   ].isECS
    // );
    if (checked) {
      if (
        this.transactionDetail[j]
          .specifiedDiseaseTransactionPreviousEmployerList[i].isECS === 1
      ) {
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount =
          data.actualAmount;
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionPreviousEmployerList[
          i
        ].dateOfPayment = new Date(data.dueDate);
      } else {
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount =
          data.actualAmount;
      }

      formatedActualAmount = Number(
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      this.uploadGridData.push(data.specifiedDiseaseTransactionId);
    } else {
      formatedActualAmount = Number(
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      const index = this.uploadGridData.indexOf(
        data.specifiedDiseaseTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    this.actualTotal = 0;
    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
  }

  updatePrevious(   data: any,
    event,
    i: number,
    j: number){

this.transactionDetail[j].specifiedDiseaseTransactionList[i].particulars = event.target.value;
  }

  public onCurrentSelectCheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    debugger
    const checked = event.target.checked;


    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    if (checked) {

      if(this.transactionDetail[j].specifiedDiseaseTransactionList[i].particulars == 'Expenditure incurred for Medical Treatment'){
        this.visibilityFlag = true;
      }
      if(this.transactionDetail[j].specifiedDiseaseTransactionList[i].particulars == 'Recovery from Insurance Company'){
        this.visibilityFlagForRecovery = true;
      }
      if (
        this.transactionDetail[j]
          .specifiedDiseaseTransactionList[i].isECS === 1
      ) {
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionList[i].actualAmount =
          data.declaredAmount;
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionList[
          i
        ].dateOfPayment = new Date(data.dueDate);

      } else {
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionList[i].actualAmount =
          data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      this.uploadGridData.push(data.specifiedDiseaseTransactionId);

    } else {
      if(this.transactionDetail[j].specifiedDiseaseTransactionList[i].particulars == 'Expenditure incurred for Medical Treatment'	){
        this.visibilityFlag = false;
      }

      if(this.transactionDetail[j].specifiedDiseaseTransactionList[i].particulars == 'Recovery from Insurance Company'	){
        this.visibilityFlagForRecovery = false;
      }

      formatedActualAmount = Number(
        this.transactionDetail[
          j
        ].specifiedDiseaseTransactionList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].specifiedDiseaseTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);
      this.transactionDetail[j].specifiedDiseaseTransactionList[
        i
      ].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      const index = this.uploadGridData.indexOf(
        data.specifiedDiseaseTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    this.actualTotal = 0;
    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionList.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
  }


  // ------------ To Check / Uncheck All  Checkboxes New Emp-------------
  checkUncheckAllCurrentEmp(item: any) {
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
      this.enableCheckboxFlag2 = item.patientName;
      item.specifiedDiseaseTransactionList.forEach((element) => {
        this.uploadGridData.push(element.specifiedDiseaseTransactionId);
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
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
      this.enableCheckboxFlag2 = item.patientName;
      item.specifiedDiseaseTransactionPreviousEmployerList.forEach(
        (element) => {
          this.uploadGridData.push(element.specifiedDiseaseTransactionId);
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
      dateOfPayment: Date;
      actualAmount: any;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log('Ondeclaration Amount change' + summary.declaredAmount);

    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].declaredAmount
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList.forEach((element) => {
      // console.log(element.declaredAmount.toString().replace(/,/g, ''));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(/,/g, ''));
    });

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // console.log( 'DeclarATION total==>>' + this.transactionDetail[j].declarationTotal);
  }

  // --------------- ON change of declared Amount in line-------------
  onDeclaredAmountChangeCurrentEmp(
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
    // console.log('Ondeclaration Amount change' + summary.declaredAmount);

    this.transactionDetail[j].specifiedDiseaseTransactionList[
      i
    ].actualAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].specifiedDiseaseTransactionList[i]
        .declaredAmount
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].specifiedDiseaseTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.transactionDetail[j].specifiedDiseaseTransactionList.forEach(
      (element) => {
        // console.log(element.declaredAmount.toString().replace(/,/g, ''));
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
        );
        // console.log(this.declarationTotal);
        // this.declaredAmount+=Number(element.actualAmount.toString().replace(/,/g, ''));
      }
    );

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // this.transactionDetail[j].grandDeclarationTotal = this.declarationTotal;
    // this.transactionDetail[j].actualTotal = this.declarationTotal;
    // console.log( 'DeclarATION total==>>' + this.transactionDetail[j].declarationTotal);
  }

  // ------------ ON change of DueDate in line----------
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
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].dueDate = summary.dueDate;
  }

  // ------------Actual Amount change-----------
  onActualAmountChange(
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
    this.declarationService = new DeclarationService(summary);
    // console.log('Actual Amount change::' , summary);

    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].actualAmount !== Number(0) ||
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = null;
    this.actualAmount = null;
    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(/,/g, ''));
    });

    this.transactionDetail[j].actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // ------------Actual Amount change-----------
  onActualAmountChangeCurrent(
    summary: {
      previousEmployerName: any;
      particulars: any;
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: number;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log('Actual Amount change::' , summary);

    this.transactionDetail[j].specifiedDiseaseTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].specifiedDiseaseTransactionList[
        i
      ].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].specifiedDiseaseTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].specifiedDiseaseTransactionList[
        i
      ].actualAmount !== Number(0) ||
      this.transactionDetail[j].specifiedDiseaseTransactionList[
        i
      ].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].specifiedDiseaseTransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].specifiedDiseaseTransactionList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = null;
    this.actualAmount = null;
    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(/,/g, ''));
    });

    this.transactionDetail[j].actualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  addRowInList(
    summarynew: {
      specifiedDiseaseTransactionId: number;
      previousEmployerId: number;
      actualAmount: any;
      particulars: string;
      // declaredAmount: any;
      // dueDate: Date;
      // dateOfPayment: Date;
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
    this.declarationService = new DeclarationService(summarynew);
    // console.log('declarationService::', this.declarationService);
    // this.declarationService.declaredAmount = null;
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.specifiedDiseaseTransactionId = this.globalAddRowIndex;
    this.declarationService.particulars = null;
    this.declarationService.actualAmount = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.rejectedAmount = 0.0;
    this.declarationService.approvedAmount = 0.0;
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList.push(
      this.declarationService
    );
    console.log(
      'addRow::',
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList
    );
  }


  addRowInList1(
    summarynew: {
      specifiedDiseaseTransactionId: number;
      previousEmployerId: number;
      declaredAmount: any;
      dateOfPayment: Date;
      actualAmount: any;
      particulars: string;
    },

    j: number
  ) {
    this.declarationService = new DeclarationService(summarynew);
    // this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.specifiedDiseaseTransactionId = 0;
    this.declarationService.particulars = null;
    this.declarationService.declaredAmount = null;
    this.declarationService.actualAmount = null;
    this.declarationService.dateOfPayment = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;
    if (
      this.transactionDetail[j].specifiedDiseaseTransactionList ==
      null
    ) {
      this.declarationService.specifiedDiseaseMasterId = this.selectedMasterId;
      this.transactionDetail[j].specifiedDiseaseTransactionList = [];
    }
    this.transactionDetail[j].specifiedDiseaseTransactionList.push(
      this.declarationService
    );
    console.log(
      'addRow::',
      this.transactionDetail[j].specifiedDiseaseTransactionList
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
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList
        .length - 1;
    // console.log('rowcount::', rowCount);
    if (
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList
        .length == 1
    ) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[
        j
      ].specifiedDiseaseTransactionPreviousEmployerList.splice(rowCount, 1);
      return true;
    }
  }


  // -------- Delete Row--------------
deleteRow1(j: number) {
  const rowCount =
    this.transactionDetail[j].specifiedDiseaseTransactionList
      .length - 1;
  // console.log('rowcount::', rowCount);
  // console.log('initialArrayIndex::', this.initialArrayIndex);
  if (
    this.transactionDetail[j].specifiedDiseaseTransactionList
      .length == 1
  ) {
    return false;
  } else if (this.initialArrayIndex[j] <= rowCount) {
    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionList.splice(rowCount, 1);
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
    this.transactionDetail[j].actualTotal +=
      this.declarationService.actualAmount -
      this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
        i
      ].actualAmount;
    this.transactionDetail[j].specifiedDiseaseTransactionPreviousEmployerList[
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
    ].declarationTotal += this.declarationService.declaredAmount;
    this.transactionDetail[
      j
    ].actualTotal += this.declarationService.actualAmount;
    this.grandActualTotal += this.declarationService.actualAmount;
    this.grandDeclarationTotal += this.declarationService.declaredAmount;
    this.transactionDetail[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  // submitDeclaration() {
  //   // this.tabIndex = 0;
  //   console.log(this.transactionDetail);
  //   this.tabIndex = 0;
  //   this.transactionDetail.forEach((element) => {
  //     element.specifiedDiseaseTransactionPreviousEmployerList.forEach(
  //       (element) => {
  //         // element.dateOfPayment = this.datePipe.transform(
  //         //   element.dateOfPayment,
  //         //   'yyyy-MM-dd'
  //         // );
  //       }
  //     );
  //   });
  //   const data = this.transactionDetail;

  //   this.treatmentOfSpecifiedService
  //     .uploadfSpecifiedDesiaseTransactionwithDocument(data)
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.transactionDetail =
  //         res.data.results[0].specifiedDiseaseTransactionDetailList;
  //       // res.data.results[0].specifiedDiseaseTransactionPreviousEmployerList;
  //       this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
  //       this.grandActualTotal = res.data.results[0].grandActualTotal;
  //       this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
  //       this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
  //       this.transactionDetail.forEach((element) => {
  //         element.specifiedDiseaseTransactionPreviousEmployerList.forEach(
  //           (element) => {
  //             // element.dateOfPayment = new Date(element.dateOfPayment);
  //           }
  //         );
  //       });
  //     });
  //   this.resetAll();
  // }

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

  onUploadProofSpent(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.proofForAmountSpent.push(file);
      }
    }
    console.log(this.proofForAmountSpent);
  }

  onUpload(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.proofForRecoveryFromInsuranceCompany.push(file);
      }
    }
    console.log(this.proofForRecoveryFromInsuranceCompany);
  }

  onUploadInEditCaseProofSpent(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editProofForAmountSpent.push(file);
      }
    }
    console.log(this.editProofForAmountSpent);
  }

  onUploadInEditCase(event) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.editProofForRecoveryFromInsuranceCompany.push(file);
      }
    }
    console.log(this.editProofForRecoveryFromInsuranceCompany);
  }


  removeDocument() {
    this.currentFileUpload = null;
  }

  // Remove Selected LicTransaction Document
  removeSelectedLicTransactionDocumentProofSpent(index: number) {
    this.proofForAmountSpent.splice(index, 1);
    console.log('this.proofForAmountSpent::', this.proofForAmountSpent);
    console.log('this.proofForAmountSpent.size::', this.proofForAmountSpent.length);
  }

  removeSelectedLicTransactionDocument(index: number) {
    this.proofForRecoveryFromInsuranceCompany.splice(index, 1);
    console.log('this.proofForRecoveryFromInsuranceCompany::', this.proofForRecoveryFromInsuranceCompany);
    console.log('this.proofForRecoveryFromInsuranceCompany.size::', this.proofForRecoveryFromInsuranceCompany.length);
  }

    //----------- On change Transactional Line Item Remark --------------------------
 public onChangeDocumentRemark1(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
 
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[0].specifiedDiseaseTransactionList[transIndex].remark =  event.target.value;
 

}

  //----------- On change Transactional Line Item Remark --------------------------
  public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    console.log('event.target.value::', event.target.value);
   
    this.editRemarkData =  event.target.value;
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);
  
    this.transactionDetail[0].specifiedDiseaseTransactionPreviousEmployerList[transIndex].remark =  event.target.value;
   
  
  }


onSaveRemarkDetails1(summary, index){
    
  const data ={
    "transactionId": this.summaryDetails.specifiedDiseaseTransactionId,
    "masterId":0,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"SPECIFIEDDISEASE",
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
      this.transactionDetail[0].specifiedDiseaseTransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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

onResetRemarkDetails1() {
  this.enteredRemark = '';
}






onSaveRemarkDetails(summary, index){
    
  const data ={
    "transactionId": this.summaryDetails.specifiedDiseaseTransactionId,
    "masterId":0,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"SPECIFIEDDISEASE",
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
      this.transactionDetail[0].specifiedDiseaseTransactionPreviousEmployerList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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







  upload() {
    for (let i = 0; i < this.proofForAmountSpent.length; i++) {
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
    if (this.proofForAmountSpent.length === 0 &&
        this.proofForRecoveryFromInsuranceCompany.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      //current emp table number format
      element.specifiedDiseaseTransactionList.forEach((item) => {
        if (item.actualAmount !== null) {
          item.actualAmount = item.actualAmount
            .toString()
            .replace(/,/g, '');
        } else {
          item.actualAmount = 0.0;
        }
        if(item.dateOfPayment){
        item.dateOfPayment = this.datePipe.transform(
          item.dateOfPayment,
          'yyyy-MM-dd'
        );
        }
        if (item.declaredAmount !== null) {
          item.declaredAmount = item.declaredAmount
            .toString()
            .replace(/,/g, '');
        } else {
          item.declaredAmount = 0.0;
        }
      });

      //previous emp table number format
      if (element.specifiedDiseaseTransactionPreviousEmployerList !== null) {

      element.specifiedDiseaseTransactionPreviousEmployerList.forEach((innerElement) => {

        if (innerElement.actualAmount !== undefined || innerElement.actualAmount !== null) {
          innerElement.actualAmount = innerElement.actualAmount
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement.actualAmount = 0.0;
        }
        // if (innerElement.declaredAmount !== undefined || innerElement.declaredAmount !== null) {
        //   innerElement.declaredAmount = innerElement.declaredAmount
        //     .toString()
        //     .replace(/,/g, '');
        // } else {
          innerElement.declaredAmount = 0.0;
        // }
      });
    }
    });

    this.receiptAmount = this.globalSelectedAmount.toString().replace(/,/g, '');

    const data = {
      specifiedDiseaseTransactionList: this.transactionDetail[0].specifiedDiseaseTransactionList,
      specifiedDiseaseTransactionPreviousEmployerList: this.transactionDetail[0].specifiedDiseaseTransactionPreviousEmployerList,
      specifiedDiseaseTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      proofSubmissionId: this.transactionDetail[0].proofSubmissionId,
      specifiedDiseaseMasterId: this.transactionDetail[0].specifiedDiseaseMasterId,
      remarkPasswordList: this.documentDataArray,
    };

    console.log('data::', data);
    this.treatmentOfSpecifiedService
      .uploadfSpecifiedDesiaseTransactionwithDocument(this.proofForAmountSpent,this.proofForRecoveryFromInsuranceCompany, data)
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
          this.transactionDetail =
            res.data.results[0].specifiedDiseaseTransactionDetailList;
          this.documentDetailList =
            res.data.results[0].specifiedDiseaseTransactionDocumentDetailList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.specifiedDiseaseTransactionPreviousEmployerList.length
            );

            element.specifiedDiseaseTransactionPreviousEmployerList.forEach(
              (innerElement) => {
                // if (innerElement.dateOfPayment !== null) {
                //   innerElement.dateOfPayment = new Date(
                //     innerElement.dateOfPayment
                //   );
                // }

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
    this.receiptAmount = '0.00';
   this.proofForAmountSpent = [];
    this.proofForRecoveryFromInsuranceCompany = [];
    this.documentDataArray = [];
    this.globalSelectedAmount = '0.00';
  }

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

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].previousEmployerId
    );
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
    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList[i].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].dueDate
    );
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

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList.forEach((element) => {
      console.log(
        'declaredAmount::',
        element.declaredAmount.toString().replace(/,/g, '')
      );
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // console.log(this.declarationTotal);
    });

    this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
    console.log(
      'DeclarATION total==>>' + this.editTransactionUpload[j].declarationTotal
    );
  }

  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCaseCurrentEmp(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      // dateOfPayment: Date;
      actualAmount: number;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onActualAmountChangeInEditCaseActual Amount change::',
      summary
    );

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionList[i].actualAmount
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionList[i].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionList[i].actualAmount !==
        Number(0) ||
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionList[i].actualAmount !==
        null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j]
          .specifiedDiseaseTransactionList[i].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j]
          .specifiedDiseaseTransactionList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(/,/g, ''));
    });

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }


  // ------------Actual Amount change Edit Modal-----------
  onActualAmountChangeInEditCase(
    summary: {
      previousEmployerName: any;
      declaredAmount: number;
      // dateOfPayment: Date;
      actualAmount: number;
      dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onActualAmountChangeInEditCaseActual Amount change::',
      summary
    );

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount !==
        Number(0) ||
      this.editTransactionUpload[j]
        .specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount !==
        null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j]
          .specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j]
          .specifiedDiseaseTransactionPreviousEmployerList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[
      j
    ].specifiedDiseaseTransactionPreviousEmployerList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(/,/g, ''));
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
  // copytoActualDate(dueDate: Date, j: number, i: number, item: any) {
  //   dueDate = new Date(dueDate);
  //   // item.specifiedDiseaseTransactionPreviousEmployerList.dateOfPayment = dueDate;
  //   this.transactionDetail[0].specifiedDiseaseTransactionPreviousEmployerList[i].dateOfPayment = dueDate;
  //   this.declarationService.dateOfPayment = this.transactionDetail[0].specifiedDiseaseTransactionPreviousEmployerList[i].dateOfPayment;
  //   // this.dateOfPayment = dueDate;
  //   alert('hiiii');
  //   console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
  // }

  // Remove Selected LicTransaction Document Edit Maodal
  removeSelectedTransactionDocumentInEditCaseProofSpent(index: number) {
    this.editProofForAmountSpent.splice(index, 1);
    console.log('this.editProofForAmountSpent::', this.editProofForAmountSpent);
    console.log('this.editProofForAmountSpent.size::', this.editProofForAmountSpent.length);
  }

    // Remove Selected LicTransaction Document Edit Maodal
    removeSelectedTransactionDocumentInEditCase(index: number) {
      this.editProofForRecoveryFromInsuranceCompany.splice(index, 1);
      console.log('this.editProofForRecoveryFromInsuranceCompany::', this.editProofForRecoveryFromInsuranceCompany);
      console.log('this.editProofForRecoveryFromInsuranceCompany.size::', this.editProofForRecoveryFromInsuranceCompany.length);
    }




  // When Edit of Document Details
  editViewTransaction(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef1 = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.treatmentOfSpecifiedService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].specifiedDiseaseTransactionDocumentDetailList[0].documentDetailList;
        this.editTransactionUpload =
          res.data.results[0].specifiedDiseaseTransactionDetailList;
        this.editProofSubmissionId = res.data.results[0].specifiedDiseaseTransactionDocumentDetailList[0].proofSubmissionId;
        debugger
        this.masterGridData = res?.data?.results[0].specifiedDiseaseTransactionDocumentDetailList[0].documentDetailList; 
        if(res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0].specifiedDiseaseTransactionList.length) {
        this.createDateTime = res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0]?.specifiedDiseaseTransactionList[0]?.createDateTime;
        this.lastModifiedDateTime = res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0]?.specifiedDiseaseTransactionList[0]?.lastModifiedDateTime;
        this.transactionStatus = res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0]?.specifiedDiseaseTransactionList[0]?.transactionStatus;
        }    
if(res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0].specifiedDiseaseTransactionPreviousEmployerList.length) {
        this.createDateTime = res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0]?.specifiedDiseaseTransactionPreviousEmployerList[0]?.createdDateTime;
        this.lastModifiedDateTime = res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0]?.specifiedDiseaseTransactionPreviousEmployerList[0]?.lastModifiedDateTime;
        this.transactionStatus = res?.data?.results[0]?.specifiedDiseaseTransactionDetailList[0]?.specifiedDiseaseTransactionPreviousEmployerList[0]?.transactionStatus;
}
        this.editReceiptAmount = res.data.results[0].receiptAmount;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;
          this.editTransactionUpload.forEach((element) => {
            element.specifiedDiseaseTransactionList.forEach((innerElement) => {
              innerElement.declaredAmount = this.numberFormat.transform(
                innerElement.declaredAmount,
              );
              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount,
              );
            });
            element.specifiedDiseaseTransactionPreviousEmployerList.forEach((innerElement1) => {
              innerElement1.declaredAmount = this.numberFormat.transform(
                innerElement1.declaredAmount,
              );
              innerElement1.actualAmount = this.numberFormat.transform(
                innerElement1.actualAmount,
              );
            });
          });
          this.masterGridData.forEach((element) => {
          
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
    

  }
);
this.documentArray = [];

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



  // Common Function for filter to call API
  getTransactionFilterData(patientName: String) {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.treatmentOfSpecifiedService
      .getTransactionFilterData(patientName)
      // .getTransactionFilterData(patient)
      .subscribe((res) => {
        console.log('getTransactionFilterData', res);
        this.transactionDetail =
          res.data.results[0].specifiedDiseaseTransactionDetailList;
        this.documentDetailList =
          res.data.results[0].specifiedDiseaseTransactionDocumentDetailList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      
        console.log('documentArrayTest',this.documentArray);

        this.initialArrayIndex = [];


        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(
            element.specifiedDiseaseTransactionPreviousEmployerList.length
          );

          // format the amount from current emp list
          element.specifiedDiseaseTransactionList.forEach((item) => {
            item.declaredAmount = this.numberFormat.transform(
              item.declaredAmount
            );
            item.actualAmount = this.numberFormat.transform(item.actualAmount);
          });

          // format the amount from previous emp list
          element.specifiedDiseaseTransactionPreviousEmployerList.forEach(
            (innerElement) => {
              innerElement.declaredAmount = this.numberFormat.transform(
                innerElement.declaredAmount
              );
              innerElement.actualAmount = this.numberFormat.transform(
                innerElement.actualAmount
              );
            }
          );
        });
        res?.documentDetailList?.forEach(element => {
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

      });
  }

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    specifiedDiseaseTransactionId,
    summary, count
  ) {
  
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.treatmentOfSpecifiedService.getspecifiedDiseaseTransactionRemarkList(
      specifiedDiseaseTransactionId,
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

  public docRemarkModal1(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    specifiedDiseaseTransactionId,
    summary, count
  ) {
  
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.treatmentOfSpecifiedService.getspecifiedDiseaseTransactionRemarkList(
      specifiedDiseaseTransactionId,
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
    for (let i = 0; i < this.editdocumentPassword.length; i++) {
      if(this.editdocumentPassword[i] != undefined || this.editdocumentPassword[i] == undefined){
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

    //  this.transactionDetail.forEach((element) => {

    this.editTransactionUpload.forEach((element) => {
      element.specifiedDiseaseTransactionList.forEach(
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
          this.uploadGridData.push(innerElement.specifiedDiseaseTransactionId)
        }
      );
      element.specifiedDiseaseTransactionPreviousEmployerList.forEach(
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
          this.uploadGridData.push(innerElement.specifiedDiseaseTransactionId)
        }
      );

    });

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      specifiedDiseaseTransactionList: this.editTransactionUpload[0].specifiedDiseaseTransactionList,
      specifiedDiseaseTransactionPreviousEmployerList: this.editTransactionUpload[0].specifiedDiseaseTransactionPreviousEmployerList,
      specifiedDiseaseTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      proofSubmissionId: this.editProofSubmissionId,
      specifiedDiseaseMasterId: this.editTransactionUpload[0].specifiedDiseaseMasterId,
      documentRemark: this.editDocumentRemark,
      remarkPasswordList: this.editdDocumentDataArray
    };
    console.log('data::', data);

    this.treatmentOfSpecifiedService
      .uploadfSpecifiedDesiaseTransactionwithDocument(this.editProofForAmountSpent,this.editProofForRecoveryFromInsuranceCompany, data)
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
          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );

          this.transactionDetail =
            res.data.results[0].specifiedDiseaseTransactionDetailList;
          this.documentDetailList =
            res.data.results[0].specifiedDiseaseTransactionDocumentDetailList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.specifiedDiseaseTransactionList.length
            );

            element.specifiedDiseaseTransactionList.forEach(
              (innerElement) => {
                // if (innerElement.dateOfPayment !== null) {
                //   innerElement.dateOfPayment = new Date(
                //     innerElement.dateOfPayment
                //   );
                // }
                innerElement.declaredAmount = this.numberFormat.transform(
                  innerElement.declaredAmount
                );
                innerElement.actualAmount = this.numberFormat.transform(
                  innerElement.actualAmount
                );
              }
            );

            this.initialArrayIndex.push(
              element.specifiedDiseaseTransactionPreviousEmployerList.length
            );

            element.specifiedDiseaseTransactionPreviousEmployerList.forEach(
              (innerElement1) => {
                // if (innerElement.dateOfPayment !== null) {
                //   innerElement.dateOfPayment = new Date(
                //     innerElement.dateOfPayment
                //   );
                // }
                innerElement1.declaredAmount = this.numberFormat.transform(
                  innerElement1.declaredAmount
                );
                innerElement1.actualAmount = this.numberFormat.transform(
                  innerElement1.actualAmount
                );
              }
            );
          });
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
    this.editdDocumentDataArray = [];
   this.editProofForAmountSpent = [];
  this.editProofForRecoveryFromInsuranceCompany = [];
  }
  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.treatmentOfSpecifiedService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].specifiedDiseaseTransactionDocumentDetailList[0].documentDetailList;
        this.urlArray.forEach((element) => {
          element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
            element.blobURI
          );
        });
        console.log(this.urlArray);
      });
  }

  setDateOfPayment(
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
    this.transactionDetail[j].specifiedDiseaseTransactionDetailList[
      i
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.transactionDetail[j].specifiedDiseaseTransactionDetailList[
        i
      ].dateOfPayment
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
  public specifiedDiseaseTransactionId = 0;
  public previousEmployerId = 0;
  public particulars: string;
  public declaredAmount: number;
  public actualAmount: number;
  public remark: boolean;
  public transactionStatus: 'Pending';
  public rejectedAmount: number;
  public approvedAmount: number;
  specifiedDiseaseMasterId: any;
  dateOfPayment: any;
  amountRejected: number;
  amountApproved: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
