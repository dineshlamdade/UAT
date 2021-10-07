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
import { GgaService } from '../gga.service';


@Component({
  selector: 'app-gga-declaration-and-actual',
  templateUrl: './gga-declaration-and-actual.component.html',
  styleUrls: ['./gga-declaration-and-actual.component.scss']
})
export class GgaDeclarationAndActualComponent implements OnInit {

  @Input() institution: string;
  @Input() childName: string;
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
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public purposeList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];

  public eightyGGAForm: FormGroup;

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;

  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  // public familyMemberName: Array<any> = [];
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
  public donations80GGTransactionList: Array<any> = [];
  donations80GGTransactionListNewRow : Array<any> = [];
  public childNameList: Array<any> = [];
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
  public isDisabled: boolean = true;
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
  public canEdit: boolean;
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
  disableRemarkList = false
  disableRemark: any;
  // Remark: any;
  editDocumentRemark: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private ggaService: GgaService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.initiate80GGAForm();

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

    this.purposeList = [
      { label: 'Scientific Research', value: 'Scientificresearch' },
      { label: 'Rural Development', value: 'Ruraldevelopment' }
    ];
    this.getTransactionFilterData();
  }

  public ngOnInit(): void {
    // console.log('data::', this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
      this.canEdit = true;
    } else {
      const input = this.data;
      this.globalInstitution = input.institution;
      this.globalPolicy = input.purpose;
      // this.getInstitutionListWithchildName();
      // this.getTransactionFilterData();
      this.canEdit = input.canEdit;

    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    this.deactiveCopytoActualDate();
    this.getpreviousEmployeName();
    this.getAllPreviousEmployer();

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

  // Initiate Tuition-Fees Form
  initiate80GGAForm() {
    this.eightyGGAForm = this.formBuilder.group({
      previousEmployerId: new FormControl(null),
      donee: new FormControl(null, Validators.required),
      purpose: new FormControl(null, Validators.required),
      dateOfPayment: new FormControl(null, Validators.required),
      declaredAmount: new FormControl(null, Validators.required),
      actualAmount: new FormControl(null, Validators.required),
      amountApproved: new FormControl(null),
      amountRejected: new FormControl(null),
      remark: new FormControl(null),
      proofSubmissionId: new FormControl(null),
      transactionStatus : new FormControl('Pending'),
      donations80GGTransactionId: new FormControl(0),
      reactiveCheckbox: new FormControl(false),
    });
  }
  //--------- convenience getter for easy access to form fields ---------------
  get masterForm() {
    return this.eightyGGAForm.controls;
  }

  //--------- Setting Actual amount ---------------
  setActualAmout(event: { target: { value: any } }) {
    console.log('event::', event);
    const declaredAmountFormatted = event.target.value;
    console.log('declaredAmountFormatted::', declaredAmountFormatted);

    if (
      declaredAmountFormatted !== null ||
      declaredAmountFormatted !== undefined
    ) {
      //let installment = this.form.value.premiumAmount;
      //installment = installment.toString().replace(/,/g, '');
      const formatedDeclaredAmount = this.numberFormat.transform(
        declaredAmountFormatted
      );
      console.log('formatedDeclaredAmount::', formatedDeclaredAmount);
      this.eightyGGAForm
        .get('declaredAmount')
        .setValue(formatedDeclaredAmount);
      this.eightyGGAForm.get('actualAmount').setValue(formatedDeclaredAmount);
      this.globalSelectedAmount = formatedDeclaredAmount;
    }
  }

  onSelectReactiveCheckbox(event) {
    if(this.masterForm.declaredAmount.value == null || this.masterForm.declaredAmount.value <= 0){
      this.alertService.sweetalertError(
        'Please Enter Declared Amount'
      );
      return false;
    }

      console.log("masterForm.value",this.masterForm.declaredAmount.value );

    const checked = event.target.checked;
    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );
    let formatedActualAmount: number = 0;
    let formatedSelectedAmount: string;
    const declaredAmnt = this.eightyGGAForm.get('declaredAmount').value;
    if (checked) {
      this.eightyGGAForm.get('actualAmount').setValue(declaredAmnt);
      formatedActualAmount = Number(
        declaredAmnt.toString().replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      this.uploadGridData.push(this.eightyGGAForm.get('donations80GGTransactionId').value);

    } else {
      formatedActualAmount = Number(
        declaredAmnt.toString().replace(/,/g, '')
      );
      this.eightyGGAForm.get('actualAmount').setValue(this.numberFormat.transform(0));

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      const index = this.uploadGridData.indexOf(
        this.eightyGGAForm.get('donations80GGTransactionId').value
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    // this.actualTotal = 0;
    // this.transactionDetail[j].donations80GGTransactionList.forEach((element) => {
    //   this.actualTotal += Number(
    //     element.actualAmount.toString().replace(/,/g, '')
    //   );
    // });
    // this.transactionDetail[j].actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
  }

  //New Row add CheckBox
    onSelectCheckBoxNew(){
      this.uploadGridData.push(0);
    }

  //------------- Post Add Transaction Page Data API call -------------------
  public saveTransaction(formDirective: FormGroupDirective): void {
    this.submitted = true;
    if (this.eightyGGAForm.invalid) {
      return;
    }

    if (this.receiptAmount < this.globalSelectedAmount) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines',
      );
      this.receiptAmount = '0.00';
      return;
    }

    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError('Please attach Receipt / Certificate');
      return;
    }
    const ggaFormDetail = this.eightyGGAForm.getRawValue();
    // delete  property reactiveCheckbox
    delete ggaFormDetail.reactiveCheckbox;
    ggaFormDetail.declaredAmount = ggaFormDetail.declaredAmount
      .toString()
      .replace(/,/g, '');
      ggaFormDetail.actualAmount = ggaFormDetail.actualAmount
      .toString()
      .replace(/,/g, '');
    this.donations80GGTransactionListNewRow.push(ggaFormDetail);
    console.log('GGA',this.donations80GGTransactionListNewRow);


    const data = {
      proofSubmissionId : null,
      donations80GGTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount.toString().replace(/,/g, ''),
      receiptDate: null,
      receiptNumber: null,
      donations80GGTransactionList: this.donations80GGTransactionListNewRow,
    };
    this.ggaService
      .upload80GGATransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log('saveTransaction res::', res);
        if (res) {
          if (res.data.results.length > 0) {
            this.transactionDetail = res.data.results[0].donations80GGTransactionList;
            this.documentDetailList = res.data.results[0].documentInformation;
            this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            this.grandActualTotal = res.data.results[0].grandActualTotal;
            this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

            this.transactionDetail.forEach((element) => {
              element.declaredAmount = this.numberFormat.transform(
                element.declaredAmount
              );
              element.actualAmount = this.numberFormat.transform(
                element.actualAmount
              );
            });

            this.alertService.sweetalertMasterSuccess(
              'Record saved Successfully.',
              ''
            );
          } else {
            // this.alertService.sweetalertWarning(res.status.messsage);
            this.alertService.sweetalertError(
              'This Policy Holder Already Added'
            );
          }
        } else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });

    this.Index = -1;
    formDirective.resetForm();
    this.eightyGGAForm.reset();
    this.filesArray = [];
    this.submitted = false;
    this.receiptAmount = '0.00';
    this.globalSelectedAmount = '0.00';
    //}
  }


      //--------- Setting Actual amount in Edit Modal ---------------
    setActualAmoutInEditModal(event: { target: { value: any } }) {

      console.log('event::', event);
      const declaredAmountFormatted = event.target.value;
      console.log('declaredAmountFormatted::', declaredAmountFormatted);

      if (
        declaredAmountFormatted !== null ||
        declaredAmountFormatted !== undefined
      ) {
        const formatedDeclaredAmount = this.numberFormat.transform(
          declaredAmountFormatted
        );
        console.log('formatedDeclaredAmount::', formatedDeclaredAmount);
        this.editTransactionUpload[0].declaredAmount = formatedDeclaredAmount;
        this.editTransactionUpload[0].actualAmount = formatedDeclaredAmount
      }
    }





  updatePreviousEmpId(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.transactionDetail[j].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.transactionDetail[j].previousEmployerId
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


    this.resetAll();
    // this.selectedTransactionInstName('All');
  }

  // -------- On Policy selection show all transactions list accordingly all policies---------
  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData();
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


  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData();
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
    if (checked) {
      if (this.transactionDetail[j].donations80GGTransactionList[i].isECS === 1) {
        this.transactionDetail[j].donations80GGTransactionList[i].actualAmount =
          data.declaredAmount;
        this.transactionDetail[j].donations80GGTransactionList[
          i
        ].dateOfPayment = new Date(data.dueDate);
      } else {
        this.transactionDetail[j].donations80GGTransactionList[i].actualAmount =
          data.declaredAmount;
      }

      formatedActualAmount = Number(
        this.transactionDetail[j].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      this.uploadGridData.push(data.donations80GGTransactionId);

    } else {
      formatedActualAmount = Number(
        this.transactionDetail[j].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.transactionDetail[j].actualAmount = this.numberFormat.transform(0);
      this.transactionDetail[j].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      const index = this.uploadGridData.indexOf(
        data.donations80GGTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.transactionDetail[j].donations80GGTransactionList.forEach((element) => {
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


  // onEmployerCheckboxSelect(formArrayElement, handicappedDependentDetailMasterId, event) {
  //   if (handicappedDependentDetailMasterId > 0 && handicappedDependentDetailMasterId  != undefined && handicappedDependentDetailMasterId != null) {
  //     if (event.target.checked) {
  //       this.uploadGridData.push(handicappedDependentDetailMasterId);
  //       formArrayElement.patchValue({});
  //     } else {
  //       const index = this.uploadGridData.indexOf(
  //         handicappedDependentDetailMasterId
  //       );
  //       this.uploadGridData.splice(index, 1);
  //     }
  //     if (this.uploadGridData.length) {
  //       this.enableFileUpload = true;
  //     }
  //   }
  // }

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
      item.donations80GGTransactionList.forEach((element) => {
        this.uploadGridData.push(element.donations80GGTransactionId);
      });
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
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.transactionDetail[j].donations80GGTransactionList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].declaredAmount
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].donations80GGTransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.transactionDetail[j].donations80GGTransactionList.forEach((element) => {
      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
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
    // console.log("Actual Amount change::" , summary);

    this.transactionDetail[j].actualAmount = this.declarationService.actualAmount;
    const formatedActualAmount = this.numberFormat.transform(
      this.transactionDetail[j].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.transactionDetail[j].actualAmount = formatedActualAmount;

    if (
      this.transactionDetail[j].actualAmount !==
        Number(0) ||
      this.transactionDetail[j].actualAmount !== null
    ) {
      // console.log(`in if::`,this.transactionDetail[j].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.transactionDetail[j].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.transactionDetail[j].forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
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
  addRowInList(
    summarynew: {
      donations80GGTransactionId: number;
      // investmentGroup2MasterPaymentDetailId: number;
      previousEmployerId: number;
      declaredAmount: any;
      purpose: string;
      actualAmount: any;
      donee: string;
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
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.isDisabled = false;
    this.declarationService.donations80GGTransactionId = this.globalAddRowIndex;
    this.declarationService.declaredAmount = null;
    this.declarationService.purpose = null;
    this.declarationService.actualAmount = null;
    this.declarationService.donee =null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;
    // this.declarationService.donations80GGTransactionId = this.transactionDetail[j].donations80GGTransactionList[0].donations80GGTransactionId;
    // this.transactionDetail[j].donations80GGTransactionList.push(this.declarationService);
    // console.log('addRow::', this.transactionDetail[j].donations80GGTransactionList);
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount = this.transactionDetail[j].length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.transactionDetail[j].length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].splice(rowCount, 1);
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
      this.transactionDetail[j].actualAmount;
    this.transactionDetail[j].donations80GGTransactionList[
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
    this.transactionDetail[j].donations80GGTransactionList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.donations80GGTransactionList.forEach((element) => {
        element.dateOfPayment = this.datePipe.transform(
          element.dateOfPayment,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.transactionDetail;
    this.ggaService
      .post80GGATransaction(data)
      .subscribe((res) => {
        console.log(res);
        this.transactionDetail =
          res.data.results[0].donations80GGTransactionList;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        this.transactionDetail.forEach((element) => {
          element.donations80GGTransactionList.forEach((element) => {
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

  // Remove Selected LicTransaction Document
  removeSelectedTransactionDocument(index: number) {
    this.filesArray.splice(index, 1);
    console.log('this.filesArray::', this.filesArray);
    console.log('this.filesArray.size::', this.filesArray.length);
  }

  //----------- On change Transactional Line Item Remark --------------------------
  public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    console.log('event.target.value::', event.target.value);
    debugger
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
    console.log('this.transactionDetail::', this.transactionDetail);

    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      if(element.donations80GGTransactionList !== null){
      element.donations80GGTransactionList.forEach((innerElement) => {
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
        const dueDate = this.datePipe.transform(
          innerElement.dueDate,
          'yyyy-MM-dd'
        );

        innerElement.dateOfPayment = dateOfPaymnet;
        innerElement.dueDate = dueDate;
      });
    }
    });

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');

    const data = {
      donations80GGTransactionList: this.transactionDetail,
      donations80GGTransactionIds: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      // documentRemark: this.documentRemark,
      proofSubmissionId: this.transactionDetail[0].proofSubmissionId,
      remarkPasswordList: this.documentDataArray,
    };
    console.log('data::', data);

    // this.fileService.uploadSingleFile(this.currentFileUpload, data)
    // .pipe(tap(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //         this.loaded = Math.round(100 * event.loaded / event.total);
    //     }
    // }))
    this.ggaService
      .upload80GGATransactionwithDocument(this.filesArray, data)
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
            res.data.results[0].donations80GGTransactionList;
          this.documentDetailList = res.data.results[0].documentInformation;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
          this.transactionDetail.forEach((element) => {
            element.donations80GGTransactionList.forEach((innerElement) => {
              if (innerElement.dateOfPayment !== null) {
                innerElement.dateOfPayment = new Date(
                  innerElement.dateOfPayment
                );
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
    // this.eightyGGAForm.get('reactiveCheckbox').setValue(null);
  }

  // When Edit of Document Details
  editViewTransaction(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.ggaService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('proofSubmissionId edit Data:: ', res);
        this.urlArray =
          res.data.results[0].documentInformation[0].documentDetailList;
        this.editTransactionUpload = res.data.results[0].donations80GGTransactionList;
        this.editProofSubmissionId = proofSubmissionId;
          this.editTransactionUpload.forEach((element) => {
            element.declaredAmount = this.numberFormat.transform(
              element.declaredAmount
            );
            element.actualAmount = this.numberFormat.transform(
              element.actualAmount
            );
          });
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =  res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =    res.data.results[0].grandApprovedTotal;
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.editReceiptAmount = res.data.results[0].receiptAmount;
        
        //console.log(this.urlArray);
      //  this.urlArray.forEach((element) => {
          // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
       //   element.blobURI = 'data:image/image;base64,' + element.blobURI;
          // new Blob([element.blobURI], { type: 'application/octet-stream' });
       // });
        //console.log('converted:: ', this.urlArray);
        // console.log('proofSubmissionId::', this.proofSubmissionId);
        
        this.editTransactionUpload.forEach((element) => {
          element.donations80GGTransactionList.forEach((innerElement) => {
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


     //-------------- Upload Document in Edit Document Detail ---------------------
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
    console.log(
      'uploadUpdateTransaction editTransactionUpload::',
      this.editTransactionUpload
    );


    this.editTransactionUpload.forEach((element) => {
      if (element.declaredAmount !== null) {
        element.declaredAmount = element.declaredAmount
          .toString()
          .replace(/,/g, '');
      } else {
        element.declaredAmount = 0.0;
      }
      if (element.actualAmount !== null) {
        element.actualAmount = element.actualAmount.toString().replace(/,/g, '');
      } else {
        element.actualAmount = 0.0;
      }
      this.uploadGridData.push(element.donations80GGTransactionId)

    });


    const donations80GGTransactionDetail = {
      previousEmployerId: this.editTransactionUpload[0].previousEmployerId,
      donee: this.editTransactionUpload[0].donee,
      purpose: this.editTransactionUpload[0].purpose,
      dateOfPayment: this.editTransactionUpload[0].dateOfPayment,
      declaredAmount: this.editTransactionUpload[0].declaredAmount,
      actualAmount: this.editTransactionUpload[0].actualAmount,
      amountApproved: this.editTransactionUpload[0].amountApproved,
      amountRejected: this.editTransactionUpload[0].amountRejected,
      remark: this.editTransactionUpload[0].remark,
      proofSubmissionId: this.editTransactionUpload[0].proofSubmissionId,
      transactionStatus: this.editTransactionUpload[0].transactionStatus,
      donations80GGTransactionId: this.editTransactionUpload[0].donations80GGTransactionId,
    };

    console.log('donations80GGTransactionDetail ', donations80GGTransactionDetail);

    this.donations80GGTransactionList.push(donations80GGTransactionDetail);
    const data = {
      donations80GGTransactionList: this.donations80GGTransactionList,
      donations80GGTransactionIds: this.uploadGridData,
      documentRemark: this.documentRemark,
      proofSubmissionId: this.editProofSubmissionId,
      receiptAmount: this.editReceiptAmount,
      // documentRemark:this.editDocumentRemark,
      remarkPasswordList: this.editdDocumentDataArray
    };
    console.log('uploadUpdateTransaction data::', data);

    this.ggaService
      .upload80GGATransactionwithDocument(this.editfilesArray, data)
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

          this.transactionDetail =
              res.data.results[0].donations80GGTransactionList;
            this.documentDetailList = res.data.results[0].documentInformation;
            this.grandDeclarationTotal =
              res.data.results[0].grandDeclarationTotal;
            this.grandActualTotal = res.data.results[0].grandActualTotal;
            this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

            this.transactionDetail.forEach((element) => {
              element.declaredAmount = this.numberFormat.transform(
                element.declaredAmount
              );
              element.actualAmount = this.numberFormat.transform(
                element.actualAmount
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
      this.resetEditVariable()
  }

    resetEditVariable() {

      this.urlArray = [];


          this.editTransactionUpload = [];
          this.currentFileUpload = null;
          this.editfilesArray = [];

          this.grandDeclarationTotalEditModal = 0;
          this.grandActualTotalEditModal = 0;
          this.grandRejectedTotalEditModal =
            0;
          this.grandApprovedTotalEditModal = 0;
          this.editProofSubmissionId = null;
          this.editReceiptAmount = null;
    }

      // Get API call for All previous employee Names
      getpreviousEmployeName() {
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
      console.log('previousEmployeeList 2::', this.previousEmployeeList);
    });
  }


  // Get All Previous Employer
  getAllPreviousEmployer() {
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
        // console.log('employeeJoiningDate::',this.employeeJoiningDate);
      }
    });
  }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.editTransactionUpload[j].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.editTransactionUpload[j].previousEmployerId
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
    this.editTransactionUpload[j].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].dueDate
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

    this.editTransactionUpload[j].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].forEach((element) => {
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
  setDateOfPaymentInEditCase(
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
    this.editTransactionUpload[j].dateOfPayment =summary.dateOfPayment;
    console.log(
      this.editTransactionUpload[j].dateOfPayment
    );
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
      j: number
      ) {
        this.declarationService = new DeclarationService(summary);
        console.log(
          'onActualAmountChangeInEditCaseActual Amount change::',
          summary
        );

        this.editTransactionUpload[j].actualAmount = this.declarationService.actualAmount;
        console.log(
          'Actual Amount changed::',
          this.editTransactionUpload[j].actualAmount
        );

        const formatedActualAmount = this.numberFormat.transform(
          this.editTransactionUpload[j].actualAmount
        );
        console.log(`formatedActualAmount::`, formatedActualAmount);

        this.editTransactionUpload[j].actualAmount = formatedActualAmount;

        if (
          this.editTransactionUpload[j].actualAmount !==Number(0) ||
          this.editTransactionUpload[j].actualAmount !==null) {
          console.log(
            `in if::`,
            this.editTransactionUpload[j].actualAmount);
        } else {
          console.log(
            `in else::`,
            this.editTransactionUpload[j].actualAmount
          );
        }

        this.grandActualTotal = 0;
        this.actualAmount = 0;
        this.editTransactionUpload[j].donations80GGTransactionList.forEach((element) => {
          console.log(element.actualAmount.toString().replace(/,/g, ''));
          this.grandActualTotal += Number(
            element.actualAmount.toString().replace(/,/g, '')
          );
          console.log(this.grandActualTotal);
          // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
        });

        this.editTransactionUpload[j].grandActualTotal = this.grandActualTotal;
        console.log(this.editTransactionUpload[j].grandActualTotal);
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
  //   this.transactionDetail[0].donations80GGTransactionList[i].dateOfPayment = dueDate;
  //   this.declarationService.dateOfPayment = this.transactionDetail[0].donations80GGTransactionList[
  //     i
  //   ].dateOfPayment;
  //   console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
  // }

  // Remove Selected LicTransaction Document Edit Maodal
      removeSelectedTransactionDocumentInEditCase(index: number) {
        this.editfilesArray.splice(index, 1);
        console.log('this.editfilesArray::', this.editfilesArray);
        console.log('this.editfilesArray.size::', this.editfilesArray.length);
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
      //Payment Detail To Date Validations with Payment Detail From Date
        // setPaymentDetailToDate() {
        //   this.paymentDetailMinDate = this.form.value.fromDate;
        //   const from = this.datePipe.transform(
        //     this.form.get('fromDate').value,
        //     'yyyy-MM-dd'
        //   );
        //   const to = this.datePipe.transform(
        //     this.form.get('toDate').value,
        //     'yyyy-MM-dd'
        //   );
        //   if (from > to) {
        //     this.form.controls.toDate.reset();
        //   }
        // }
      // Common Function for filter to call API
      getTransactionFilterData() {
        // this.Service.getTransactionInstName(data).subscribe(res => {
        this.ggaService.getTransactionFilterData().subscribe((res) => {
          console.log('getTransactionFilterData', res);
          if (res.data.results.length > 0) {
            this.transactionDetail = res.data.results[0].donations80GGTransactionList;

            console.log('transactionDetail', this.transactionDetail);
            this.documentDetailList = res.data.results[0].documentInformation;
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

            if (this.transactionDetail != undefined){
              this.transactionDetail.forEach((element) => {
                element.declaredAmount = this.numberFormat.transform(
                  element.declaredAmount
                );
                element.actualAmount = this.numberFormat.transform(
                  element.actualAmount
                );
              });
            }

          }
          else {
            this.addRowInList(this.declarationService, 0);
          }
        });
      }

      public docRemarkModal(
        documentViewerTemplate: TemplateRef<any>,
        index: any,
        psId, policyNo
      ) {
        debugger
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
    



      downloadTransaction(proofSubmissionId) {
        console.log(proofSubmissionId);
        this.ggaService
          .getTransactionByProofSubmissionId(proofSubmissionId)
          .subscribe((res) => {
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
        this.transactionDetail[j].dateOfPayment =
          summary.dateOfPayment;
        console.log(
          this.transactionDetail[j].dateOfPayment
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


      //   // Family relationship shown on Policyholder selection
      //  OnSelectionfamilyMemberGroup() {
      //   const toSelect = this.familyMemberGroup.find(
      //     (element) => element.familyMemberName === this.eightyGGAForm.get('childName').value
      //   );
      //   this.eightyGGAForm.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
      //   this.eightyGGAForm.get('relationship').setValue(toSelect.relation);
      // }


      // On Master Edit functionality
      editMaster(i: number) {
        //this.scrollToTop();
        // this.paymentDetailGridData = this.transactionDetail[i].paymentDetails;
        this.form.patchValue(this.transactionDetail[i]);
        // console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        this.isClear = true;
        this.masterfilesArray = this.transactionDetail[i].documentInformationList

      }

    }

    class DeclarationService {
      public donations80GGTransactionId = 0;
      // public investmentGroup2MasterPaymentDetailId: number;
      public previousEmployerId = 0;
      public donee: string;
      public purpose: string;
      public dateOfPayment: Date;
      public declaredAmount: number;
      public actualAmount: number;
      public transactionStatus: string = 'Pending';
      // public proofSubmissionId: 0;
      public amountRejected: number;
      public amountApproved: number;
      public remark: string;

      constructor(obj?: any) {
        Object.assign(this, obj);
      }
    }
