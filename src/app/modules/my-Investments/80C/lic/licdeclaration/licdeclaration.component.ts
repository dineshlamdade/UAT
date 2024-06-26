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
import { fakeAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { debug } from 'console';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';

@Component({
  selector: 'app-licdeclaration',
  templateUrl: './licdeclaration.component.html',
  styleUrls: ['./licdeclaration.component.scss'],
})
export class LicdeclarationComponent implements OnInit {
  public enteredRemark = '';
  @Input() public institution: string;
  @Input() public policyNo: string;
  @Input() public data: any;
  documentRemarkList: any;
  public testPolicy = '';
  public selectPolicyName = '';
  public modalRef: BsModalRef;
  public modalRef1: BsModalRef;
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
  documentDataArray = [];
  editdDocumentDataArray = [];
  public remarkCount : any;
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
 


  viewDocumentName: any;
  viewDocumentType: any;

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public createDateTime: any;
  public lastModifiedDateTime: any;
  public transactionStatus: any;
  public editReceiptAmount: string;
  public EditGrandTotalAmount:any;

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
  public previousEmployeeList: Array<any> = [];
  public proofSubmissionFileList: Array<any> = [];
  public proofSubmissionPolicyNoList: Array<any> = [];
  public totalDeclaredAmount: any;
  public totalActualAmount: any;
  public futureNewPolicyDeclaredAmount: string;
  documentArray: any[] =[];

  documentPassword =[];
  remarkList =[];
  editdocumentPassword =[];
  editremarkList =[];
  document3Password: any;
  remark3List: any;

  public grandDeclarationTotal: number;
  public grandActualTotal: number;
  public grandRejectedTotal: number;
  public grandApprovedTotal: number;

  public grandDeclarationTotalEditModal: number;
  public grandActualTotalEditModal: number;
  public grandRejectedTotalEditModal: number;
  public grandApprovedTotalEditModal: number;
  currentJoiningDate: Date;

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
  selectedremarkIndex : any;

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public ispreviousEmploy = true;

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public testnumber1: number =5000;
  public testnumber2: number =5000;
  licDeclarationData: any;
  dateOfJoining: Date;
  joiningDate: Date;
   masterGridsData: any;
   documentsArray: any;
   dateofsubmission: any;
   disableRemarkList = false
   disableRemark: any;
   Remark: any;
  licTransactionDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
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
  }

  public ngOnInit(): void {
    // console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      const input = this.data;
      this.globalInstitution = input.institution;
      this.globalPolicy = input.policyNo;
      this.getInstitutionListWithPolicyNo();
      this.getTransactionFilterData(input.institution, input.policyNo, 'All');
      if (input.canView === true){
        this.isDisabled = true;
      } else{
        this.isDisabled = false;
        this.canEdit = input.canEdit;
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
      console.log(res.data.results[0].joiningDate);

      this.dateOfJoining = new Date(res.data.results[0].dateOfJoining);
      console.log(this.dateOfJoining)
      res.data.results.forEach((element) => {

        const obj = {
          label: element.name,
          value: element.previousEmployerId,
        };
        this.previousEmployeeList.push(obj);
      });
    });



     // Get API call for All Current previous employee Names
     this.Service.getcurrentpreviousEmployeName().subscribe((res) => {
      console.log('previousEmployeeList::', res);
      if (!res.data.results[0]) {
        return;
      }
      console.log(res.data.results[0].joiningDate);
debugger
      this.currentJoiningDate = new Date(res.data.results[0].joiningDate);
      console.log(this.dateOfJoining)
      res.data.results.forEach((element) => {

        const obj = {
          label: element.name,
          value: element.employeeMasterId,
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
    this.transactionDetail[j].lictransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].lictransactionList[i].previousEmployerId,
    );
  }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].lictransactionList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].lictransactionList[i].previousEmployerId,
    );
  }

  // ----------------------------------------------- Declaration --------------------------------------

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
    this.transactionInstitutionNames = [];
    this.transactionPolicyList = [];
    this.transactionStatustList = [];

    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionInstitutionNames.push(data);
    this.transactionPolicyList.push(data);
    this.refreshTransactionStatustList();

    this.getInstitutionListWithPolicyNo();

    this.resetAll();
    this.selectedTransactionInstName('All');
  }

  public getInstitutionListWithPolicyNo() {
    // const data = {
    //   label: 'All',
    //   value: 'All',
    // };

    // this.transactionInstitutionNames.push(data);
    // this.transactionPolicyList.push(data);

    this.Service.getEightyCDeclarationInstitutionListWithPolicyNo().subscribe(
      (res) => {
        this.transactionInstitutionListWithPolicies = res.data.results;

        res.data.results.forEach((element) => {
          const obj = {
            label: element.institution,
            value: element.institution,
          };
          this.transactionInstitutionNames.push(obj);

          element.policies.forEach((policy) => {
            const policyObj = {
              label: policy,
              value: policy,
            };
            this.transactionPolicyList.push(policyObj);
          });
        });
      },
    );
  }

  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedTransactionInstName(institutionName: any) {
    this.filesArray = [];
    this.transactionDetail = [];
    this.globalInstitution = institutionName;
    this.getTransactionFilterData(this.globalInstitution, null, null);
    this.globalSelectedAmount = this.numberFormat.transform(0);
    const data = {
      label: 'All',
      value: 'All',
    };

    this.transactionPolicyList = [];
    this.transactionPolicyList.push(data);

    this.transactionInstitutionListWithPolicies.forEach((element) => {
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
    this.enableSelectAll=false;
    this.isCheckAll=false;
  }

  // -------- On Policy selection show all transactions list accordingly all policies---------
  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy,
      null,
    );
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {

    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy,
      transactionStatus,
    );
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

  // Remove LicMaster Document
  public removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
  }
  // -------- ON select to check input boxex--------
  public onSelectCheckBox(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number,
  ) {

if (data.transactionStatus == 'Approved' || data.transactionStatus == 'WIP') {
  this.disableRemarkList = true;
}
    if(data.declaredAmount == null || data.declaredAmount <= 0){
      this.alertService.sweetalertError(
        'Please Enter Declared Amount'
      );
      this.enableSelectAll = false;
      event.target.checked = false;
    }
    const checked = event.target.checked;

    this.licDeclarationData = data

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, ''),
    );

    let formatedActualAmount = 0;
    let formatedSelectedAmount: string;
    console.log(
      'in IS ECS::',
      this.transactionDetail[j].lictransactionList[i].isECS,
    );
    if (checked) {
      if (this.transactionDetail[j].lictransactionList[i].isECS === 1) {
        this.transactionDetail[j].lictransactionList[i].actualAmount =
          data.declaredAmount;
        this.transactionDetail[j].lictransactionList[
          i
          ].dateOfPayment = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.transactionDetail[j].lictransactionList[i].actualAmount,
        );
        console.log(
          'in IS dateOfPayment::',
          this.transactionDetail[j].lictransactionList[i].dateOfPayment,
        );
      } else {
        this.transactionDetail[j].lictransactionList[i].actualAmount =
          data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.transactionDetail[j].lictransactionList[i].actualAmount
          .toString()
          .replace(/,/g, ''),
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount,
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.licTransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
        this.transactionDetail[j].lictransactionList[i].actualAmount
          .toString()
          .replace(/,/g, ''),
      );
      this.transactionDetail[j].lictransactionList[
        i
        ].actualAmount = this.numberFormat.transform(0);
      this.transactionDetail[j].lictransactionList[i].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount,
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(data.licTransactionId);
      this.uploadGridData.splice(index, 1);
      this.isCheckAll=false;
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[j].lictransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, ''),
      );
    });
    this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length > 0) {
      this.enableFileUpload = true;
    }
    else{
      this.enableFileUpload = false;
    }
    console.log(this.uploadGridData);
    this.actualTotal = 0;
    this.transactionDetail.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualTotal.toString().replace(/,/g, '')
      );
      // console.log("Actual Total")(this.actualTotal);
      console.log("Actual Total::" , this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.grandActualTotal = this.actualTotal;
    console.log(this.grandActualTotal);
    console.log(this.uploadGridData.length);
    this.testPolicy = '';
    this.selectPolicyName = '';
  }

  // ------------ To Check / Uncheck All  Checkboxes-------------
  checkUncheckAll(item: any,event: { target: { checked: any } } , j: any) {

    console.log(event.target.checked);
    this.isCheckAll=event.target.checked;
    console.log(this.isCheckAll);
    if (!this.isCheckAll) {
      console.log('CHECK ALL IS FALSE ');
      this.isCheckAll = false;
      this.enableSelectAll = false;
      this.enableCheckboxFlag2 = null;
      this.testPolicy = '';
      this.selectPolicyName = ''
      this.uploadGridData = [];
    } else {
      console.log('CHECK ALL IS TRUE ');
      this.isCheckAll = true;
      this.enableSelectAll = true;
      this.testPolicy = item.policyNo;
      this.selectPolicyName = item.policyholdername;
      this.enableCheckboxFlag2 = item.institutionName;
      item.lictransactionList.forEach((element) => {
        this.uploadGridData.push(element.licTransactionId);
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
      dueDate: Date;
    },
    i: number,
    j: number,
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.transactionDetail[j].lictransactionList[
      i
      ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].lictransactionList[i].declaredAmount,
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].lictransactionList[
      i
      ].declaredAmount = formatedDeclaredAmount;


    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.transactionDetail[j].lictransactionList.forEach((element) => {
      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
    this.declarationTotal = 0;
    this.transactionDetail.forEach((element) => {

      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declarationTotal.toString().replace(/,/g, '')
      );
    });
    this.grandDeclarationTotal = this.declarationTotal;
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
  
  this.editTransactionUpload[j].lictransactionList[
    i
    ].actualAmount = this.declarationService.declaredAmount;
console.log( this.editTransactionUpload);
    this.editTransactionUpload[j].lictransactionList[
      i
      ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].lictransactionList[i].declaredAmount,
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].lictransactionList[
      i
      ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].lictransactionList.forEach((element) => {
      console.log(
        'declaredAmount::',
        element.declaredAmount.toString().replace(/,/g, ''),
      );
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, ''),
      );
      // console.log(this.declarationTotal);
    });

    this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
    this.editTransactionUpload[j].grandDeclarationTotal = this.declarationTotal;
    this.editTransactionUpload[j].actualTotal = this.declarationTotal;

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
    this.transactionDetail[j].lictransactionList[i].dueDate = summary.dueDate;
  }

  onResetRemarkDetails() {
    this.enteredRemark = '';
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
    this.editTransactionUpload[j].lictransactionList[i].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].lictransactionList[i].dueDate,
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
    // console.log("Actual Amount change::" , summary);

  

    this.transactionDetail[j].lictransactionList[
      i
      ].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.transactionDetail[j].lictransactionList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].lictransactionList[i].actualAmount,
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].lictransactionList[
      i
      ].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].lictransactionList[i].actualAmount !==
      Number(0) ||
      this.transactionDetail[j].lictransactionList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.transactionDetail[j].lictransactionList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, ''),
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail[j].actualTotal = this.actualTotal;

    this.actualTotal = 0;
    this.transactionDetail.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualTotal.toString().replace(/,/g, '')
      );
      // console.log("Actual Total")(this.actualTotal);
      console.log("Actual Total::" , this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.grandActualTotal = this.actualTotal;
    console.log(this.grandActualTotal);

    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
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

    this.editTransactionUpload[j].lictransactionList[
      i
      ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j].lictransactionList[i].actualAmount,
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].lictransactionList[i].actualAmount,
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.editTransactionUpload[j].lictransactionList[
      i
      ].actualAmount = formatedActualAmount;

    if (
      this.editTransactionUpload[j].lictransactionList[i].actualAmount !==
      Number(0) ||
      this.editTransactionUpload[j].lictransactionList[i].actualAmount !== null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j].lictransactionList[i].actualAmount,
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j].lictransactionList[i].actualAmount,
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[j].lictransactionList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, ''),
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }


  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  addRowInList(
    summarynew: {
      licTransactionId: number;
      licMasterPaymentDetailsId: number;
      previousEmployerId: number;
      employeeMasterId: number;
      dueDate: Date;
      declaredAmount: any;
      dateOfPayment: Date;
      actualAmount: any;
      isECS: number;
    },
    j: number,
  ) {
    // console.log('summary::',  summarynew);
    // if (this.initialArrayIndex[j] > i) {
    //   this.hideRemoveRow = false;
    // } else {
    //   this.hideRemoveRow  = true;
    // }
    this.declarationService = new DeclarationService(summarynew);
    // console.log('declarationService::', this.declarationService);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.licTransactionId = this.globalAddRowIndex;
    this.declarationService.employeeMasterId = this.transactionDetail[
      j
    ].lictransactionList[0].employeeMasterId;
    this.declarationService.declaredAmount = null;
    this.declarationService.dueDate = null;
    this.declarationService.actualAmount = null;
    this.declarationService.dateOfPayment = null;
    this.declarationService.isECS = 0;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;
    this.declarationService.licMasterPaymentDetailsId = this.transactionDetail[
      j
      ].lictransactionList[0].licMasterPaymentDetailsId;
    this.transactionDetail[j].lictransactionList.push(this.declarationService);
    console.log('addRow::', this.transactionDetail[j].lictransactionList);
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number, i) {
    debugger
    // const rowCount = this.transactionDetail[j].lictransactionList.length - 1;
    const rowCount = i;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.transactionDetail[j].lictransactionList.length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].lictransactionList.splice(rowCount, 1);
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
    this.transactionDetail[j].actualTotal +=
      this.declarationService.actualAmount -
      this.transactionDetail[j].lictransactionList[i].actualAmount;
    this.transactionDetail[j].lictransactionList[i] = this.declarationService;
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
    this.transactionDetail[j].lictransactionList.push(this.declarationService);
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.lictransactionList.forEach((element) => {
        element.dateOfPayment = this.datePipe.transform(
          element.dateOfPayment,
          'yyyy-MM-dd',
        );
      });
    });
    const data = this.transactionDetail;
    this.Service.postEightyCDeclarationTransaction(data).subscribe((res) => {
      console.log(res);
      this.transactionDetail = res.data.results[0].licTransactionDetail;
      this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      this.transactionDetail.forEach((element) => {
        element.lictransactionList.forEach((element) => {
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

  onUpload(event, password?, remark?) {
    
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

  //  //----------- On change Transactional Line Item Remark --------------------------
  //  public onChangeDocumentRemark(transactionDetail, transIndex, event) {
  //   console.log('event.target.value::', event.target.value);
  
  //  console.log('this.transactionDetail', this.transactionDetail);
  //   // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  //   // console.log('index::', index);

  //   this.transactionDetail[0].groupTransactionList[transIndex].remark =  event.target.value;
   

  // }
   //----------- On change Transactional Line Item Remark --------------------------
   public onChangeDocumentRemark(transactionDetail, transIndex, event) {
     
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);

    this.transactionDetail[0].lictransactionList[transIndex].remark =  event.target.value;

  // document.getElementById('template8').scrollIntoView()


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

    console.log(JSON.stringify(this.licDeclarationData))



    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement',
      );
      return;
    }
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      element.lictransactionList.forEach((innerElement) => {
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

    // for (let i = 0; i < this.transactionDetail.length; i++) {
    //   const transactionId = this.uploadGridData;
    //   this.transactionDetail[0].lictransactionList.forEach(element => {
    // if (element.licTransactionId == transactionId[i]) {
    if(this.licDeclarationData.previousEmployerId == 0){
      // this.alertService.sweetalertError(
      //   // 'Please make sure that you have selected previous employer for all selected lines',
      //   'Please Select Previous Employer',
      // );
      // return false;
    }
    if (this.licDeclarationData.dateOfPayment == null) {
      this.alertService.sweetalertError(
        // 'Please make sure that you have selected date of payment for all selected lines',
        'Please Select Date Of Payment',
      );
      return false;
    }
    if (this.licDeclarationData.dueDate == null) {
      this.alertService.sweetalertError(
        // 'Please make sure that you have selected due date for all selected lines',
        'Please Select Date Of DueDate',
      );
      return false;
    }
    if (this.licDeclarationData.declaredAmount == null) {
      this.alertService.sweetalertError(
        // 'Please make sure that you have selected declared amount for all selected lines',
        'Please Select Date Of Declared Amount',
      );
      return false;
    }
    if (this.licDeclarationData.actualAmount == null) {
      this.alertService.sweetalertError(
        // 'Please make sure that you have selected actual amount for all selected lines',
        'Please Select Date Of Actual Amount',
      );
      return false;
    }
    //     }
    //   });
    // }

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    debugger
    
    const data = {
      licTransactionDetail: this.transactionDetail,
      licTransactionIDs: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
      //   documentPassword: this.documentPassword,
      // remarkList: this.remarkList,
      remarkPasswordList: this.documentDataArray
    };
    console.log('data::', data);

    this.fileService
      .uploadMultipleFiles(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.shownewRow = false;
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
          this.selectedTransactionInstName(this.globalInstitution);
          // this.transactionDetail =
          // res.data.results[0].licTransactionDetail;
          // this.documentDetailList = res.data.results[0].documentInformation;
          // this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          // this.grandActualTotal = res.data.results[0].grandActualTotal;
          // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          // this.initialArrayIndex = [];

          // this.transactionDetail.forEach((element) => {


          //   this.initialArrayIndex.push(element.lictransactionList.length);

          //   element.lictransactionList.forEach((innerElement) => {

          //     if (innerElement.dateOfPayment !== null) {
          //       innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
          //     }

          //     if (innerElement.isECS === 0) {
          //       this.glbalECS == 0;
          //     } else if (innerElement.isECS === 1) {
          //       this.glbalECS == 1;
          //     } else {
          //       this.glbalECS == 0;
          //     }

          //     innerElement.declaredAmount = this.numberFormat.transform(
          //       innerElement.declaredAmount,
          //     );

          //     innerElement.actualAmount = this.numberFormat.transform(
          //       innerElement.actualAmount,
          //     );
          //   });
          // });

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


  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": this.summaryDetails.licTransactionId,
      "masterId":0,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"80C",
      "subSection":"LIC",
      "remark":this.editRemarkData,
      "proofSubmissionId":this.summaryDetails.proofSubmissionId,
      "role":"Employee",
      "remarkType":"Transaction"

    };
    this.Service
    .postLicMasterRemark(data)
    .subscribe((res) => {
      debugger
      if(res.status.code == "200") {
        console.log(this.transactionDetail);
        // this.transactionDetail[0].lictransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
        this.transactionDetail[0].lictransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
        // this.editTransactionUpload[0].lictransactionList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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
      this.receiptAmount = '0.00';
      return false;
    } else if (receiptAmount_ > globalSelectedAmount_) {
      console.log(receiptAmount_);
      console.log(globalSelectedAmount_);
      this.alertService.sweetalertWarning(
        'Receipt Amount is greater than Selected line Actual Amount',
      );
      // this.receiptAmount = '0.00';
      // return false;
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
    // item.lictransactionList.dateOfPayment = dueDate;
    this.transactionDetail[0].lictransactionList[i].dateOfPayment = dueDate;
    this.declarationService.dateOfPayment = this.transactionDetail[0].lictransactionList[
      i
      ].dateOfPayment;
    // this.dateOfPayment = dueDate;
    alert('hiiii');
    console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
  }

  // When Edit of Document Details
  editViewTransaction(
    template2: TemplateRef<any>,
    proofSubmissionId: string,
  ) {
    this.documentRemark = '';
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef1 = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' }),
    );

    this.Service.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(
      (res) => {
        
        console.log('edit Data:: ', res);
        this.EditGrandTotalAmount = res.data.results;
        this.documentRemark =res.data.results[0].documentInformation[0].documentRemark;
        this.urlArray =
          res.data.results[0].documentInformation[0].documentDetailList;
          this.disableRemark = res.data.results[0].licTransactionDetail[0].lictransactionList[0].transactionStatus;
       debugger
          this.editTransactionUpload = res.data.results[0].licTransactionDetail;
        
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.createDateTime = res.data.results[0].licTransactionDetail[0].lictransactionList[0].createDateTime;
        this.lastModifiedDateTime = res.data.results[0].licTransactionDetail[0].lictransactionList[0].lastModifiedDateTime;
        this.transactionStatus = res.data.results[0].licTransactionDetail[0].lictransactionList[0].transactionStatus;
        this.editReceiptAmount = res.data.results[0].receiptAmount;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;
        // console.log(this.urlArray);
        // this.urlArray.forEach((element) => {
        //   // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
        //   element.blobURI = 'data:image/image;base64,' + element.blobURI;
        //   // new Blob([element.blobURI], { type: 'application/octet-stream' });
        // });
        this.editTransactionUpload.forEach((element) => {
          element.lictransactionList.forEach((innerElement) => {
            innerElement.declaredAmount = this.numberFormat.transform(
              innerElement.declaredAmount,
            );
            innerElement.actualAmount = this.numberFormat.transform(
              innerElement.actualAmount,
            );
          });
        });
        this.masterGridData = res.data.results;

        this.masterGridData.forEach((element) => {
          // element.policyStartDate = new Date(element.policyStartDate);
          // element.policyEndDate = new Date(element.policyEndDate);
          // element.fromDate = new Date(element.fromDate);
          // element.toDate = new Date(element.toDate);
          element.documentInformation.forEach(element => {
            this.dateofsubmission = element.dateOfSubmission;
            // this.documentArray.push({
            //   'dateofsubmission': ,
            // })
            element.documentDetailList.forEach(element => {
            // if(element!=null)
            this.documentArray.push({
              // 'dateofsubmission': element.dateOfSubmission,
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
        // console.log('converted:: ', this.urlArray);
      },
    );
    this.documentArray = [];
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

  // -----------Common Function for filter to call API---------------
  getTransactionFilterData(
    institution: String,
    policyNo: String,
    transactionStatus: String,
  ) {

    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.Service.getTransactionFilterData(institution,policyNo,transactionStatus,)
      .subscribe((res) => {
        console.log('getTransactionFilterData', res);
        this.transactionDetail =
          res.data.results[0].licTransactionDetail;
        this.documentDetailList = res.data.results[0].documentInformation;
        this.documentDetailList.sort((x, y) => +new Date(x.dateOfSubmission) - +new Date(y.dateOfSubmission));
        this.documentDetailList.reverse();
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
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
        console.log('documentArrayTest',this.documentArray);
        // this.documentArray.push({
        //   'dateofsubmission':element.creatonTime,
        //   'documentType':element.documentType,
        //   'documentName': element.fileName,
        //   'documentPassword':element.documentPassword,
        //   'documentRemark':element.documentRemark,
        //   'status' : element.status,
        //   'lastModifiedBy' : element.lastModifiedBy,
        //   'lastModifiedTime' : element.lastModifiedTime,

        // })

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {

          this.initialArrayIndex.push(element.lictransactionList.length);

          element.lictransactionList.forEach((innerElement) => {

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
  public docRemarkModal(

    documentViewerTemplate: TemplateRef<any>,
    index: any,
    licTransactionId,
    summary, count
  ) {
    debugger
  
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.Service.getLicRemarkList(
      licTransactionId,
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
  // public docRemarkModal1(
  //   documentViewerTemplate: TemplateRef<any>,
  //   index: any,
  //   lictransactionID
  // ) {
    
  //   this.Service.getLicRemarkList(
  //     lictransactionID,
  //   ).subscribe((res) => {
  //     console.log('docremark', res);
      
    
  //   this.documentRemarkList  = res.data.results[0];
  //   this.remarkCount = res.data.results[0].length;
  //   });
  //   // console.log('documentDetail::', documentRemarkList);
  //   // this.documentRemarkList = this.selectedRemarkList;
  //   console.log('this.documentRemarkList', this.documentRemarkList);
  //   this.modalRef = this.modalService.show(
  //     documentViewerTemplate,
  //     Object.assign({}, { class: 'gray modal-s' })
  //   );
  // }


  // Upload Document And save Edited Transaction
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

    console.log(JSON.stringify(this.licDeclarationData))


    console.log(
      'uploadUpdateTransaction editTransactionUpload::',
      this.editTransactionUpload,
    );

    this.editTransactionUpload.forEach((element) => {
      element.lictransactionList.forEach((innerElement) => {
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
          'yyyy-MM-dd',
        );
        const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd',
        );

        innerElement.dateOfPayment = dateOfPaymnet;
        innerElement.dueDate = dueDate;
        this.uploadGridData.push(innerElement.licTransactionId);
      });
    });

    this.editTransactionUpload.forEach((element) => {
      element.lictransactionList.forEach((innerElement) => {
        const dateOfPaymnet = this.datePipe.transform(
          innerElement.dateOfPayment,
          'yyyy-MM-dd',
        );
        innerElement.dateOfPayment = dateOfPaymnet;
      });
    });
 
delete this.editTransactionUpload[0].grandDeclarationTotal;
    const data = {
      licTransactionDetail: this.editTransactionUpload,
      licTransactionIDs: this.uploadGridData,
      documentRemark: this.documentRemark,
      proofSubmissionId: this.editProofSubmissionId,
      receiptAmount: this.editReceiptAmount,
      grandDeclarationTotal: this.editTransactionUpload[0].declarationTotal,
grandActualTotal:  this.editTransactionUpload[0].actualTotal,
grandApprovedTotal:  this.editTransactionUpload[0].totalApprovedAmount,
grandRejectedTotal: this.editTransactionUpload[0].totalRejectedAmount,

      // documentPassword: this.documentPassword,
      remarkPasswordList: this.editdDocumentDataArray
    };
    console.log('uploadUpdateTransaction data::', data);

    this.fileService
      .uploadMultipleFiles(this.editfilesArray, data)
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
            '',
          );

          this.selectedTransactionInstName(this.globalInstitution);

          // this.transactionDetail = res.data.results[0].licTransactionDetail;
          // this.documentDetailList = res.data.results[0].documentInformation;
          // this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          // this.grandActualTotal = res.data.results[0].grandActualTotal;
          // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          // this.initialArrayIndex = [];

          // this.transactionDetail.forEach((element) => {

          //   this.initialArrayIndex.push(element.lictransactionList.length);

          //   element.lictransactionList.forEach((innerElement) => {

          //     if (innerElement.dateOfPayment !== null) {
          //       innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
          //     }

          //     if (innerElement.isECS === 0) {
          //       this.glbalECS == 0;
          //     } else if (innerElement.isECS === 1) {
          //       this.glbalECS == 1;
          //     } else {
          //       this.glbalECS == 0;
          //     }

          //     innerElement.declaredAmount = this.numberFormat.transform(
          //       innerElement.declaredAmount,
          //     );

          //     innerElement.actualAmount = this.numberFormat.transform(
          //       innerElement.actualAmount,
          //     );
          //   });
          // });
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.currentFileUpload = null;
  }

  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.Service.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(
      (res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].documentInformation[0].documentDetailList;
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
    debugger
    this.transactionDetail[j].lictransactionList[i].dateOfPayment =
      summary.dateOfPayment;
    console.log(this.transactionDetail[j].lictransactionList[i].dateOfPayment);
    
    if (new Date(summary.dateOfPayment) > this.currentJoiningDate) {
      this.ispreviousEmploy = false;
    } else {
      this.ispreviousEmploy = true;
    }
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
    this.editTransactionUpload[j].lictransactionList[i].dateOfPayment =
      summary.dateOfPayment;
    console.log(
      this.editTransactionUpload[j].lictransactionList[i].dateOfPayment,
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
    this.viewDocumentName = this.urlArray[this.urlIndex].fileName;
    this.viewDocumentType = this.urlArray[this.urlIndex].documentType;
    console.log(this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' }),
    );
  }


}


class DeclarationService {
  public licTransactionId = 0;
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
  employeeMasterId: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
