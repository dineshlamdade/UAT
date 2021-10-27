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
import { ElectricVehicleService } from '../electric-vehicle.service';

@Component({
  selector: 'app-electric-vehicle-declaration',
  templateUrl: './electric-vehicle-declaration.component.html',
  styleUrls: ['./electric-vehicle-declaration.component.scss'],
})
export class ElectricVehicleDeclarationComponent implements OnInit {


  @Input() public lenderName: string;
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
  public lenderNameList: Array<any> = [];
  public electricVehicleLoanTransactionPreviousEmployerList;
  public electricVehicleLoanTransactionList;
  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;

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

  public transactionPolicyList: Array<any> = [];
  public transactionWithLenderName: Array<any> = [];
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
  public onHideSaveButton: boolean = false;
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
  public actualAmountGlobal: number;
  public dueDate: Date;
  public dateOfPayment: Date;
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
  public declarationData: string;
  public updateReceiptAmount: any;
  Remark: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private electricVehicleService: ElectricVehicleService,
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
      const input = this.data;
      this.globalInstitution = input.lenderName;
      this.getLenderNameList();
      this.getTransactionFilterData(input.lenderName);
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
    this.transactionDetail[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i]
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
    this.lenderNameList = [];
    this.transactionPolicyList = [];
    this.transactionStatustList = [];

    // const data = {
    //   label: 'All',
    //   value: 'All',
    // };

    // this.lenderNameList.push(data);
    // this.transactionPolicyList.push(data);
    this.refreshTransactionStatustList();

    this.getLenderNameList();

    this.resetAll();
    this.selectedTransactionLenderName('All');
  }

  // tslint:disable-next-line: typedef
  public getLenderNameList() {
    const data = {
      label: 'All',
      value: 'All',
    };

    this.lenderNameList.push(data);
    this.transactionPolicyList.push(data);

    this.electricVehicleService
      // .getElectricVehicleDeclarationLenderName()
      .getElectricVehicleLenderNameList()
      .subscribe((res) => {
        console.log('getLenderNameList', res);
        this.transactionWithLenderName = res.data.results;
        res.data.results[0].forEach((element) => {
          console.log('element', element);
          const obj = {
            label: element,
            value: element,
          };
          this.lenderNameList.push(obj);
        });
      });
    console.log('lender Name List ', this.lenderNameList);
  }

// --------- On institution selection show all transactions list accordingly all policies--------
selectedTransactionLenderName(lenderName: any) {
  this.filesArray = [];
  this.transactionDetail = [];
  this.globalInstitution = lenderName;
  this.getTransactionFilterData(this.globalInstitution);
  this.globalSelectedAmount = this.numberFormat.transform(0);
  const data = {
    label: 'All',
    value: 'All',
  };

  this.transactionPolicyList = [];
  this.transactionPolicyList.push(data);

  this.transactionWithLenderName.forEach((element) => {
    if (lenderName === element.lenderName) {
      element.policies.forEach((policy) => {
        const policyObj = {
          label: policy,
          value: policy,
        };
        this.lenderNameList.push(policyObj);
      });
    }
  });

  if (lenderName == 'All') {
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
       this.transactionDetail[j].electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount = data.actualAmount;
        formatedActualAmount = Number(
        this.transactionDetail[j].electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount
          .toString().replace(/,/g, ''));
      formatedSelectedAmount = this.numberFormat.transform(formatedGlobalSelectedValue + formatedActualAmount);
      this.uploadGridData.push(data.electricVehicleLoanTransactionId);
    } else {
      formatedActualAmount = Number(this.transactionDetail[j].electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount = this.numberFormat.transform(0);

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.electricVehicleLoanTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList.forEach((element) => {
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

  // -------- ON select to check input boxex--------
  public onSelectCheckBoxCurrent(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {


    const checked = event.target.checked;
    this.onHideSaveButton = checked;
    console.log("this.onHideSaveButton",this.onHideSaveButton);
    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );
    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    if (checked) {
      this.transactionDetail[j].electricVehicleLoanTransactionList[
        i
      ].actualAmount = data.actualAmount;


   /*  ].actualAmount = data.declaredAmount; */

      formatedActualAmount = Number(
        this.transactionDetail[j].electricVehicleLoanTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      this.uploadGridData.push(data.electricVehicleLoanTransactionId);
    } else {
      formatedActualAmount = Number(
        this.transactionDetail[j].electricVehicleLoanTransactionList[
          i
        ].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].electricVehicleLoanTransactionList[
        i
      ].actualAmount = this.numberFormat.transform(0);

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      const index = this.uploadGridData.indexOf(
        data.electricVehicleLoanTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[j].electricVehicleLoanTransactionList.forEach(
      (element) => {
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
      this.enableCheckboxFlag2 = item.lenderName;
      item.electricVehicleLoanTransactionList.forEach((element) => {
        this.uploadGridData.push(element.electricVehicleLoanTransactionId);
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
      this.enableCheckboxFlag2 = item.lenderName;
      item.electricVehicleLoanTransactionPreviousEmployerList.forEach(
        (element) => {
          this.uploadGridData.push(element.electricVehicleLoanTransactionId);
        }
      );
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // --------------- ON change of declared Amount in line-------------

  onDeclaredAmountChangeCurrentEmp(
    summary: {
      declaredAmount: number;
      dateOfPayment: Date;
      actualAmount: any;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    this.transactionDetail[j].electricVehicleLoanTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].electricVehicleLoanTransactionList[i]
        .declaredAmount
    );
    this.transactionDetail[j].electricVehicleLoanTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;
    this.declarationTotal = 0;
    this.transactionDetail[j].electricVehicleLoanTransactionList.forEach(
      (element) => {
        this.declarationTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
      }
    );
    this.transactionDetail[j].declarationTotal = this.declarationTotal;
  }
 
  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  addRowInList(
    summarynew: {
      electricVehicleLoanTransactionId: number;
      previousEmployerId: number;
      actualAmount: any;
    },
    j: number
  ) {
    this.declarationService = new DeclarationService(summarynew);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.electricVehicleLoanTransactionId = this.globalAddRowIndex;
    this.declarationService.actualAmount = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.rejectedAmount = 0.0;
    this.declarationService.approvedAmount = 0.0;
    this.transactionDetail[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList.push(
      this.declarationService
    );
    console.log(
      'addRow::',
      this.transactionDetail[j]
        .electricVehicleLoanTransactionPreviousEmployerList
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
      this.transactionDetail[j]
        .electricVehicleLoanTransactionPreviousEmployerList.length - 1;
    // console.log('rowcount::', rowCount);
    if (
      this.transactionDetail[j]
        .electricVehicleLoanTransactionPreviousEmployerList.length == 1
    ) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[
        j
      ].electricVehicleLoanTransactionPreviousEmployerList.splice(rowCount, 1);
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
      this.transactionDetail[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount;
    this.transactionDetail[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList[
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
    ].electricVehicleLoanTransactionPreviousEmployerList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
        (element) => {
          // element.dateOfPayment = this.datePipe.transform(
          //   element.dateOfPayment,
          //   'yyyy-MM-dd'
          // );
        }
      );
    });
    const data = this.transactionDetail;

    this.electricVehicleService
      .postElectricVehicleTransaction(data)
      .subscribe((res) => {
        console.log(res);
        this.transactionDetail =
          res.data.results[0].electricVehicleLoanTransactionDetailList;
        // res.data.results[0].electricVehicleLoanTransactionPreviousEmployerList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        this.transactionDetail.forEach((element) => {
          element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
            (element) => {
              // element.dateOfPayment = new Date(element.dateOfPayment);
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
  removeSelectedLicTransactionDocument(index: number) {
    this.filesArray.splice(index, 1);
    console.log('this.filesArray::', this.filesArray);
    console.log('this.filesArray.size::', this.filesArray.length);
  }

   //----------- On change Transactional Line Item Remark --------------------------
   public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    console.log('event.target.value::', event.target.value);
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);

    this.transactionDetail[0].groupTransactionList[transIndex].remark =  event.target.value;
   

  }

  upload() {

    for (let i = 0; i <= this.documentPassword.length; i++) {
      if(this.documentPassword[i] != undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.remarkList[i],
          "password": this.documentPassword[i]
        };
        this.documentDataArray.push(remarksPasswordsDto);
      }
    }

    console.log('testtttttt', this.documentDataArray);

    this.transactionDetail.forEach((element) => {
      //current emp table number format
      element.electricVehicleLoanTransactionList.forEach((item) => {

        if (item.declaredAmount !== null) {
          item.declaredAmount = item.declaredAmount
            .toString()
            .replace(/,/g, '');
        } else {
          item.declaredAmount = 0.0;
        }
        if (item.actualAmount !== null) {
          item.actualAmount = item.actualAmount
            .toString()
            .replace(/,/g, '');
        } else {
          item.actualAmount = 0.0;
        }

      });

      //previous emp table number format
      if (element.electricVehicleLoanTransactionPreviousEmployerList !== null) {
        element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
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


    // let numberValue = Number(actualAmount);
    console.log((this.transactionDetail[0].electricVehicleLoanTransactionList[0].actualAmount));

    if(this.transactionDetail[0].electricVehicleLoanTransactionList[0].actualAmount == 0 && this.transactionDetail[0].electricVehicleLoanTransactionList[0].declaredAmount == '0.00'){

      if(this.transactionDetail[0].electricVehicleLoanTransactionList.length == 0 || this.transactionDetail[0].electricVehicleLoanTransactionPreviousEmployerList.length == 0)
        {
          this.alertService.sweetalertError(
            'Please enter value.'
          );
          return;
        }
      }

    if(this.transactionDetail[0].electricVehicleLoanTransactionList[0].actualAmount > 0 && this.filesArray.length === 0){
     this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement.'
      );
      return;
     }
     if(this.transactionDetail[0].electricVehicleLoanTransactionPreviousEmployerList.length > 0 && this.filesArray.length == 0){
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement.'
      );
      return;

     }
    console.log('this.transactionDetail::', this.transactionDetail);

    // console.log("JSON data", this.declarationData);

    console.log(JSON.stringify(this.declarationData))



    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      electricVehicleLoanTransactionList: this.transactionDetail[0].electricVehicleLoanTransactionList,
      electricVehicleLoanTransactionPreviousEmployerList: this.transactionDetail[0].electricVehicleLoanTransactionPreviousEmployerList,
      electricVehicleLoanTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      proofSubmissionId: this.transactionDetail[0].proofSubmissionId,
      electricVehicleLoanMasterId: this.transactionDetail[0].electricVehicleLoanMasterId,
      remarkPasswordList: this.documentDataArray
    };
    console.log('data::', data);
    this.electricVehicleService
      .uploadElectricVehicleTransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.transactionDetail =
            res.data.results[0].electricVehicleLoanTransactionDetailList;
          // res.data.results[0].electricVehicleLoanTransactionList;
          this.documentDetailList =
            res.data.results[0].electricVehicleLoanTransactionDocumentDetailList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

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

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.electricVehicleLoanTransactionList.length
            );

            element.electricVehicleLoanTransactionList.forEach(
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
              element.electricVehicleLoanTransactionPreviousEmployerList.length
            );

            element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
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
      'Receipt Amount should be equal or greater than Actual Amount of Selected lines.',
    );
    this.receiptAmount = '0.00';
    return false;
  } else if (receiptAmount_ > globalSelectedAmount_) {
    console.log(receiptAmount_);
    console.log(globalSelectedAmount_);
    this.alertService.sweetalertWarning(
      'Receipt Amount is greater than Selected line Actual Amount.',
    );
    // this.receiptAmount = '0.00';
    // return false;
  }
    this.receiptAmount= this.numberFormat.transform(this.receiptAmount);
}

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i]
        .previousEmployerId
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
    ].electricVehicleLoanTransactionPreviousEmployerList[i].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].dueDate
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
    ].electricVehicleLoanTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionList.forEach((element) => {
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
  // ---- Set Date of Payment On Edit Modal----
  // setDateOfPaymentInEditCase(
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
  //   this.editTransactionUpload[j].electricVehicleLoanTransactionPreviousEmployerList[i].dateOfPayment =
  //     summary.dateOfPayment;
  //   console.log(this.editTransactionUpload[j].electricVehicleLoanTransactionPreviousEmployerList[i].dateOfPayment);
  // }



  onActualAmountChangeInEditCasePreviEmp(
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
    ].electricVehicleLoanTransactionPreviousEmployerList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    
   /*  console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount
    ); */

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount !==
        Number(0) ||
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount !==
        null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j]
          .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j]
          .electricVehicleLoanTransactionPreviousEmployerList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList.forEach((element) => {
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
    ].electricVehicleLoanTransactionList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionList[i].actualAmount
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionList[i].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionList[
      i
    ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionList[i].actualAmount !==
        Number(0) ||
      this.editTransactionUpload[j]
        .electricVehicleLoanTransactionList[i].actualAmount !==
        null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j]
          .electricVehicleLoanTransactionList[i].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j]
          .electricVehicleLoanTransactionList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[
      j
    ].electricVehicleLoanTransactionList.forEach((element) => {
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
  //   // item.electricVehicleLoanTransactionPreviousEmployerList.dateOfPayment = dueDate;
  //   this.transactionDetail[0].electricVehicleLoanTransactionPreviousEmployerList[i].dateOfPayment = dueDate;
  //   this.declarationService.dateOfPayment = this.transactionDetail[0].electricVehicleLoanTransactionPreviousEmployerList[i].dateOfPayment;
  //   // this.dateOfPayment = dueDate;
  //   alert('hiiii');
  //   console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
  // }

  // Remove Selected LicTransaction Document Edit Maodal
  removeSelectedLicTransactionDocumentInEditCase(index: number) {
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

    this.electricVehicleService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        console.log('test', res.data.results[0].electricVehicleLoanTransactionDocumentDetailList[0].receiptAmount);

        this.updateReceiptAmount = res.data.results[0].electricVehicleLoanTransactionDocumentDetailList[0].receiptAmount;
        this.urlArray =
          res.data.results[0].electricVehicleLoanTransactionDocumentDetailList[0].documentDetailList;
        this.editTransactionUpload =
          res.data.results[0].electricVehicleLoanTransactionDetailList;
        // this.editProofSubmissionId = res.data.results[0].electricVehicleLoanTransactionDetailList[0].proofSubmissionId;
        this.editProofSubmissionId = proofSubmissionId;
        this.editReceiptAmount = res.data.results[0].documentInformation[0].receiptAmount;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;

          this.masterGridData = res.data.results;

          this.masterGridData.forEach((element) => {
            // element.policyStartDate = new Date(element.policyStartDate);
            // element.policyEndDate = new Date(element.policyEndDate);
            // element.fromDate = new Date(element.fromDate);
            // element.toDate = new Date(element.toDate);
            element.documentInformation.forEach(element => {
              // this.dateofsubmission = element.dateOfSubmission;
              // this.documentArray.push({
              //   'dateofsubmission': ,
              // })
              
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
            // this.documentArray.push({
            //   'dateofsubmission':element.creatonTime,
            //   'documentType':element.documentType,
            //   'documentName': element.fileName,
            //   'documentPassword':element.documentPassword,
            //   'documentRemark':element.documentRemark,
            //   'status' : element.status,
            //   'lastModifiedBy' : element.lastModifiedBy,
            //   'lastModifiedTime' : element.lastModifiedTime,
            //
            // })
          });
        }
      );
      this.documentArray = [];
        // //console.log(this.urlArray);
        // this.urlArray.forEach((element) => {
        //   // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
        //   element.blobURI = 'data:image/image;base64,' + element.blobURI;
        //   // new Blob([element.blobURI], { type: 'application/octet-stream' });
        // });
        //console.log('converted:: ', this.urlArray);
        // this.editTransactionUpload.forEach((element) => {
        //   element.electricVehicleLoanTransactionPreviousEmployerList.forEach((innerElement) => {
        //     innerElement.declaredAmount = this.numberFormat.transform(
        //       innerElement.declaredAmount,
        //     );
        //     innerElement.actualAmount = this.numberFormat.transform(
        //       innerElement.actualAmount,
        //     );
        //   });
        // });
      // });
  }

  public docViewer1(template3: TemplateRef<any>, index: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;
    // this.urlIndex = 0;

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
  getTransactionFilterData(lenderName: String) {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.electricVehicleService
      .getTransactionFilterData(lenderName)
      .subscribe((res) => {
        console.log('getTransactionFilterData', res);
        this.transactionDetail =
          res.data.results[0].electricVehicleLoanTransactionDetailList;
        this.documentDetailList =
          res.data.results[0].electricVehicleLoanTransactionDocumentDetailList;
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

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(
            element.electricVehicleLoanTransactionPreviousEmployerList.length
          );

          // format the amount from current emp list
          element.electricVehicleLoanTransactionList.forEach((item) => {
            item.declaredAmount = this.numberFormat.transform(
              item.declaredAmount
            );
            item.actualAmount = this.numberFormat.transform(item.actualAmount);
          });

          // format the amount from previous emp list
          element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
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
      });
  }

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    psId, policyNo
  ) {
    
    this.Service.getRemarkList(
      policyNo,
      psId
    ).subscribe((res) => {
      console.log('docremark', res);
    this.documentRemarkList  = res.data.results[0].remarkList
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

    for (let i = 0; i <= this.editdocumentPassword.length; i++) {
      if(this.editdocumentPassword[i] != undefined){
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

    console.log('testtttttt', this.documentDataArray);
    console.log(
      'uploadUpdateTransaction editTransactionUpload::',
      this.editTransactionUpload
    );
    this.editTransactionUpload.forEach((element) => {
      element.electricVehicleLoanTransactionList.forEach(
        (innerElement) => {
          if (innerElement.actualAmount !== null) {
            innerElement.actualAmount = innerElement.actualAmount
              .toString()
              .replace(/,/g, '');
          } else {
            innerElement.actualAmount = 0.0;
          }
          this.uploadGridData.push(innerElement.electricVehicleLoanTransactionId);
        }
      );

      element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
        (innerElement) => {
          if (innerElement.actualAmount !== null) {
            innerElement.actualAmount = innerElement.actualAmount
              .toString()
              .replace(/,/g, '');
          } else {
            innerElement.actualAmount = 0.0;
          }
          this.uploadGridData.push(innerElement.electricVehicleLoanTransactionId);
        }
      );
    });

    // this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');

    const data = {
      electricVehicleLoanTransactionList: this.editTransactionUpload[0].electricVehicleLoanTransactionList,
      electricVehicleLoanTransactionPreviousEmployerList: this.editTransactionUpload[0].electricVehicleLoanTransactionPreviousEmployerList,
      electricVehicleLoanTransactionIds: this.uploadGridData,
      // receiptAmount: this.receiptAmount,
      receiptAmount:  this.updateReceiptAmount,
      // documentRemark: this.documentRemark,
      // proofSubmissionId: this.editTransactionUpload[0].proofSubmissionId,
      proofSubmissionId: this.editProofSubmissionId,
      // proofSubmissionId: this.editTransactionUpload[0].editProofSubmissionId,
      electricVehicleLoanMasterId: this.editTransactionUpload[0].electricVehicleLoanMasterId,
      remarkPasswordList: this.editdDocumentDataArray
      // proofSubmissionId: this.transactionDetail[0].proofSubmissionId,

    };


    console.log(' uploadUpdateTransaction data::', data);

    this.electricVehicleService
      .uploadElectricVehicleTransactionwithDocument(this.editfilesArray, data)
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
            res.data.results[0].electricVehicleLoanTransactionDetailList;
          this.documentDetailList =
            res.data.results[0].electricVehicleLoanTransactionDocumentDetailList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {

            this.initialArrayIndex.push(
              element.electricVehicleLoanTransactionList.length
            );

            element.electricVehicleLoanTransactionList.forEach(
              (innerElement) => {

                innerElement.declaredAmount = this.numberFormat.transform(
                  innerElement.declaredAmount
                );
                innerElement.actualAmount = this.numberFormat.transform(
                  innerElement.actualAmount
                );
              }
            );


            this.initialArrayIndex.push(
              element.electricVehicleLoanTransactionPreviousEmployerList.length
            );

            element.electricVehicleLoanTransactionPreviousEmployerList.forEach(
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
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
    // this.editfilesArray = [];
  }
  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.electricVehicleService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {

        console.log('edit Data:: ', res);

        this.urlArray =
          res.data.results[0].electricVehicleLoanTransactionDocumentDetailList[0].documentDetailList;
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
    this.transactionDetail[
      j
    ].electricVehicleLoanTransactionPreviousEmployerList[i].dateOfPayment =
      summary.dateOfPayment;
    console.log(
      this.transactionDetail[j]
        .electricVehicleLoanTransactionPreviousEmployerList[i].dateOfPayment
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
  public electricVehicleLoanTransactionId = 0;
  public proofSubmissionId = '';
  public previousEmployerId = 0;
  // public dueDate: Date;
  public declaredAmount: number;
  // public dateOfPayment: Date;
  public actualAmount: number;
  // public isECS: 0;
  public remark: boolean;
  public transactionStatus: 'Pending';
  public rejectedAmount: number;
  public approvedAmount: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
