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
import { TaxSavingNabardService } from '../tax-saving-nabard.service';

@Component({
  selector: 'app-tax-saving-nabard-actual',
  templateUrl: './tax-saving-nabard-actual.component.html',
  styleUrls: ['./tax-saving-nabard-actual.component.scss'],
})
export class TaxSavingNabardActualComponent implements OnInit {
  public enteredRemark = '';
  @Input() institution: string;
  @Input() policyNo: string;
  @Input() data: any;

  documentRemarkList: any;

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

  public taxSavingNabardForm: FormGroup;

  viewDocumentName: any;
  viewDocumentType: any;

  public editTransactionUpload: Array<any> = [];
  documentDataArray = [];
  editdDocumentDataArray = [];
  public editProofSubmissionId: any;
  public createDateTime: any;
  public lastModifiedDateTime: any;
  public transactionStatus: any;
  public editReceiptAmount: string;

  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  documentArray: any[] =[];

  documentPassword =[];
  remarkList =[];
  editdocumentPassword =[];
  editremarkList =[];
  document3Password: any;
  remark3List: any;
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
  public investmentGroup3TransactionDetailList: Array<any> = [];
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
  public requiredField: boolean = false;
  public requiredInstitution: boolean = false;
  public requiredaccountNumber: boolean = false;
  public requireddateOfPayment: boolean = false;
  public requireddeclaredAmount: boolean = false;
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

  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  row = [];
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public canEdit: boolean;
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
  dateOfJoining: Date;
  public selectrow : any;
  globalSelectedAmounts: any = '0.00';
  public addNewRow: boolean = true;
  public showDeleteButton: boolean = false;
  public enableButton : boolean = false;
  disableRemarkList = false
  disableRemark: any;
  Remark: any;
  selectedremarkIndex : any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private taxSavingNabardService: TaxSavingNabardService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.getIntillizeEdData();
    // // Tax Saving Nabard Form
    // this.taxSavingNabardForm = this.formBuilder.group({
    //   institution: new FormControl(null, Validators.required),
    //   accountNumber: new FormControl(null, Validators.required),
    //   dateOfPayment: new FormControl(null, Validators.required),
    //   // investedAmount :new FormControl(null,Validators.required),
    //   active: new FormControl(true, Validators.required),
    //   remark: new FormControl(null),
    //   declaredAmount: new FormControl(null, Validators.required),
    //   actualAmount: new FormControl(null, Validators.required),
    //   investmentGroup3TransactionId: new FormControl(0),
    //   previousEmployerId: new FormControl(0),
    // });

    // // ---------------- Transaction status List -----------------
    // this.refreshTransactionStatustList();

    // this.grandTabStatus = false;
    // this.isCheckAll = false;
    // this.isDisabled = true;
    // this.enableSelectAll = false;
    // this.enableFileUpload = false;
    // this.addNewRowId = 0;
    // this.hideRemarkDiv = false;
    // this.hideRemoveRow = false;
    // this.isClear = false;
    // this.isCancel = false;
    // this.receiptAmount = this.numberFormat.transform(0);
    // this.globalAddRowIndex = 0;
    // this.globalSelectedAmount = this.numberFormat.transform(0);
  }
  getIntillizeEdData() {
    
    // Tax Saving Nabard Form
    this.taxSavingNabardForm = this.formBuilder.group({
      institution: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      dateOfPayment: new FormControl(null, Validators.required),
      // investedAmount :new FormControl(null,Validators.required),
      active: new FormControl(true, Validators.required),
      remark: new FormControl(null),
      declaredAmount: new FormControl(null, Validators.required),
      actualAmount: new FormControl(null, Validators.required),
      investmentGroup3TransactionId: new FormControl(0),
      previousEmployerId: new FormControl(0),
    });

    // ---------------- Transaction status List -----------------
    this.refreshTransactionStatustList();
    this.addNewRow = true;
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
    // this.getTransactionFilterData();
    // if (this.data) {
    //   this.selectrow = this.data.accountNumber;
    //   } else {
    //     this.selectrow = "any";
    //   }
    // // console.log('data::', this.data);

    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    // this.enableAddRow = 0;
    // this.enableCheckboxFlag = 1;
    // this.enableCheckboxFlag3 = false;
    // this.declarationService = new DeclarationService();

    // this.deactiveCopytoActualDate();
    // this.getpreviousEmployeName();
    // this.getAllPreviousEmployer();

    // if (this.today.getMonth() + 1 <= 3) {
    //   this.financialYear =
    //     this.today.getFullYear() - 1 + '-' + this.today.getFullYear();
    // } else {
    //   this.financialYear =
    //     this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    // }

    // const splitYear = this.financialYear.split('-', 2);

    // this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    // this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);
    this.getData();
  }

 getData() {
   
  this.getTransactionFilterData();
  if (this.data) {
    if(this.data.canEdit == true) {
      this.isDisabled = false;
    } else if (this.data.canView == true) {
      this.isDisabled = true;
      this.enableButton = true;
    }
    this.selectrow = this.data.accountNumber;
    } else {
      this.selectrow = "any";
    }
  // console.log('data::', this.data);

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

  //--------- convenience getter for easy access to form fields ---------------
  get masterForm() {
    return this.taxSavingNabardForm.controls;
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
      this.taxSavingNabardForm
        .get('declaredAmount')
        .setValue(formatedDeclaredAmount);
      this.taxSavingNabardForm
        .get('actualAmount')
        .setValue(formatedDeclaredAmount);
      this.globalSelectedAmount = formatedDeclaredAmount;
    }
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
      this.editTransactionUpload[0].actualAmount = formatedDeclaredAmount;
    }
  }

  //------------- Post Add Transaction Page Data API call -------------------
  public saveTransaction(formDirective: FormGroupDirective): void {
    this.submitted = true;

    console.log('taxSavingNabardForm::', this.taxSavingNabardForm);
    // console.log("formData::", formData);

    if (this.taxSavingNabardForm.invalid) {
      return;
    }

    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError('Please attach Receipt / Certificate');
      return;
    }

    //else {
    const transactionDetail = this.taxSavingNabardForm.getRawValue();

    transactionDetail.declaredAmount = transactionDetail.declaredAmount
      .toString()
      .replace(/,/g, '');
    transactionDetail.actualAmount = transactionDetail.actualAmount
      .toString()
      .replace(/,/g, '');

    const data = {
      investmentGroup3TransactionDetail: transactionDetail,
      receiptAmount: this.receiptAmount.toString().replace(/,/g, ''),
      documentRemark: this.documentRemark,
    };

    console.log('Senior Citizen Data::', data);

    this.taxSavingNabardService
      .uploadTSNabardTransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log('saveTransaction res::', res);
        if (res) {
          if (res.data.results.length > 0) {
            this.transactionDetail =
              res.data.results[0].investmentGroup3TransactionDetailList;
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
    this.taxSavingNabardForm.reset();
    this.filesArray = [];
    this.submitted = false;
    this.receiptAmount = '0.00';
    this.globalSelectedAmount = '0.00';
    //}
  }
  // addTable() {
  //   const obj = {
  //     id: '',
  //     name: '',
  //     email: '',
  //     a: '',
  //     b: '',
  //     c: '',
  //     d: '',
  //     e: '',
  //     f: '',
  //     g: '',
  //     h: '',
  //   };
  //   this.row.push(obj);
  // }
  // deleteRows(j) {
  //   this.row.splice(j, 1);
  // }

  //------------- When Edit of Document Details -----------------------
  editViewTransaction(template2: TemplateRef<any>, proofSubmissionId: string) {
    this.documentRemark = '';
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef1 = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.taxSavingNabardService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        this.documentRemark =res.data.results[0].documentInformation[0].documentRemark;

        this.urlArray =
          res.data.results[0].documentInformation[0].documentDetailList;
          this.disableRemark = res.data.results[0].investmentGroup3TransactionDetailList[0].transactionStatus;
        this.editTransactionUpload =
          res.data.results[0].investmentGroup3TransactionDetailList;
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
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.createDateTime = res.data.results[0].investmentGroup3TransactionDetailList[0].createDateTime;
        this.lastModifiedDateTime = res.data.results[0].investmentGroup3TransactionDetailList[0].lastModifiedDateTime;
        this.transactionStatus = res.data.results[0].investmentGroup3TransactionDetailList[0].transactionStatus;
        this.editReceiptAmount = res.data.results[0].receiptAmount;
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
      });
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

    console.log('testtttttt', this.documentDataArray);

    // console.log(JSON.stringify(this.ppfDeclarationData))
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
      const dateOfPaymnet = this.datePipe.transform(
        element.dateOfPayment,
        'yyyy-MM-dd'
      );

      element.dateOfPayment = dateOfPaymnet;
      this.uploadGridData.push(element.investmentGroup3TransactionId);
    });
    // const data = {
    //   investmentGroup3TransactionDetail: this.editTransactionUpload[0],
    //   proofSubmissionId: this.editProofSubmissionId,
    //   receiptAmount: this.editReceiptAmount,
    // };

    const data = {
      proofSubmissionId: this.editProofSubmissionId,
      investmentGroup3TransactionDetailList: this.editTransactionUpload,
      receiptAmount: this.editReceiptAmount,
      documentRemark: this.documentRemark,
      groupTransactionIDs: this.uploadGridData,
      // documentPassword: this.documentPassword,
      remarkPasswordList: this.editdDocumentDataArray
    };

    console.log('uploadUpdateTransaction data::', data);

    this.taxSavingNabardService
      .uploadTSNabardTransactionwithDocument(this.editfilesArray, data)
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
            res.data.results[0].investmentGroup3TransactionDetailList;
          this.documentDetailList = res.data.results[0].documentInformation;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

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
    this.resetEditVariable();
  }

  resetEditVariable() {
    this.urlArray = [];
    this.editTransactionUpload = [];
    this.currentFileUpload = null;
    this.editfilesArray = [];
    this.grandDeclarationTotalEditModal = 0;
    this.grandActualTotalEditModal = 0;
    this.grandRejectedTotalEditModal = 0;
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
      this.dateOfJoining = new Date(res.data.results[0].joiningDate);
      console.log(this.dateOfJoining)
      // console.log(res.data.results[0].joiningDate);
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

  updatePreviousEmpId(event: any, i: number) {
    console.log('select box value::', event.target.value);
    this.investmentGroup3TransactionDetailList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.investmentGroup3TransactionDetailList[i].previousEmployerId
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

    // this.getInstitutionListWithPolicyNo();

    this.resetAll();
    this.selectedTransactionInstName('All');
  }

  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedTransactionInstName(institutionName: any) {
    this.globalInstitution = institutionName;
    //this.getTransactionFilterData(this.globalInstitution, null, null);
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

    this.resetAll();
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
  public onSelectCheckBox(event: { target: { checked: any } }, 
    
    i: number, summary: {
      previousEmployerId:number;
      institution: 0;
      accountNumber: number;      
      declaredAmount: number;
      actualAmount: number;
      dateOfPayment: Date;
      transactionStatus: any;
    },
  ) {

    if (summary.transactionStatus == 'Approved' || summary.transactionStatus == 'WIP') {
      this.disableRemarkList = true;
    } else {
      this.disableRemarkList = false;
    }


    // if (this.investmentGroup3TransactionDetailList[i].institution == null || this.investmentGroup3TransactionDetailList[i].accountNumber == null || this.investmentGroup3TransactionDetailList[i].dateOfPayment == null ) {
    //   this.requiredField = true;
    //   event.target.checked = false;
    //   if(this.investmentGroup3TransactionDetailList[i].declaredAmount == "0") {
    //    this.alertService.sweetalertError(
    //     'Please Enter Decleared Amount'
    //    );
    //  } else {
    //    this.alertService.sweetalertError(
    //      'Please Fill Required Field.'
    //    );
    //  }
    //   return;
    // } else {
    //   this.requiredField = false;
    // }

    if (this.investmentGroup3TransactionDetailList[i].institution == null || this.investmentGroup3TransactionDetailList[i].accountNumber == null || this.investmentGroup3TransactionDetailList[i].dateOfPayment == null ) {
      if (this.investmentGroup3TransactionDetailList[i].institution == null) {
        this.requiredInstitution = true;
        event.target.checked = false;
        this.alertService.sweetalertError(
          'Please Enter Required Field'
        );

      } else {
        this.requiredInstitution = false;
      }


      if (this.investmentGroup3TransactionDetailList[i].accountNumber == null) {
        this.requiredaccountNumber = true;
        event.target.checked = false;
        this.alertService.sweetalertError(
          'Please Enter Required Field'
        );

      } else {
        this.requiredaccountNumber = false;
      }

      if (this.investmentGroup3TransactionDetailList[i].dateOfPayment == null ) {
        this.requireddateOfPayment = true;
        event.target.checked = false;
        this.alertService.sweetalertError(
          'Please Enter Required Field'
        );


      } else {
        this.requireddateOfPayment = false;
      }
      if (this.investmentGroup3TransactionDetailList[i].declaredAmount == "0") {
        this.requireddeclaredAmount = true;
        event.target.checked = false;
           this.alertService.sweetalertError(
             'Please Enter Decleared Amount'
           );
        return;

      } else {
        this.requireddeclaredAmount = false;
      }
      return;
    } else {

      this.requireddeclaredAmount = false;

    const checked = event.target.checked;

    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );

    let formatedActualAmount: number = 0;
    let formatedSelectedAmount: string;

    if (checked) {

      this.investmentGroup3TransactionDetailList[i].actualAmount = this.investmentGroup3TransactionDetailList[i].declaredAmount;
      this.globalSelectedAmounts = this.investmentGroup3TransactionDetailList[i].declaredAmount;
      formatedActualAmount = Number(
        this.investmentGroup3TransactionDetailList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue
      );
      if(formatedActualAmount == null || formatedActualAmount <= 0){
        this.alertService.sweetalertError(
          'Please Enter Actual Amount'
        );
        this.enableSelectAll = false;
        event.target.checked = false;
      }
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(
        this.investmentGroup3TransactionDetailList[i]
          .investmentGroup3TransactionId
      );
    } else {
      this.investmentGroup3TransactionDetailList[i].actualAmount = this.investmentGroup3TransactionDetailList[i].declaredAmount;
      formatedActualAmount = Number(
        this.investmentGroup3TransactionDetailList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );

      const index = this.uploadGridData.indexOf(
        this.investmentGroup3TransactionDetailList[i]
          .investmentGroup3TransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    console.log(this.uploadGridData);
    this.onActualAmountChange(summary, i);
    // this.actualTotal = 0;
    // this.transactionDetail.forEach((element) => {
    //   // console.log(element.actualAmount.toString().replace(',', ""));
    //   this.actualTotal += Number(
    //     element.actualTotal.toString().replace(/,/g, '')
    //   );
    //   // console.log("Actual Total")(this.actualTotal);
    //  console.log("Actual Total::" , this.actualTotal);
    //   // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    // });

    this.grandActualTotal = this.actualTotal;
    console.log(this.grandActualTotal);
    console.log(this.uploadGridData.length);
  }
}
  

  // ------------ To Check / Uncheck All  Checkboxes-------------
  checkUncheckAll(item: any) {
    if (this.isCheckAll) {
      this.isCheckAll = false;
      this.enableSelectAll = false;
      this.enableCheckboxFlag2 = null;
      this.uploadGridData = [];
    } else {
      this.isCheckAll = true;
      this.enableSelectAll = true;
      this.enableCheckboxFlag2 = item.institutionName;
      item.forEach((element) => {
        this.uploadGridData.push(element.investmentGroup2TransactionId);
      });
      this.enableFileUpload = true;
    }
  }

  // --------------- ON change of declared Amount in line-------------
  onInstitutionChange(
    summary: {
      previousEmployerId: number;
      institution: 0;
      accountNumber: number;
      declaredAmount: number;
      dateOfPayment: Date;
    },
    i: number
  ) {
    this.declarationService = new DeclarationService(summary);

    this.investmentGroup3TransactionDetailList[
      i
    ].institution = this.declarationService.institution;
    if (this.investmentGroup3TransactionDetailList[i].institution == null) {
      this.requiredInstitution = true;
    } else {
      this.requiredInstitution = false;
    }
  }

  // --------------- ON change of Accoun No in line-------------
  onAccountNoChange(
    summary: {
      previousEmployerId: number;
      institution: 0;
      accountNumber: number;
      declaredAmount: number;
      // actualAmount: number;
      dateOfPayment: Date;
    },
    i: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.investmentGroup3TransactionDetailList[
      i
    ].accountNumber = this.declarationService.accountNumber;
    if (this.investmentGroup3TransactionDetailList[i].accountNumber == null) {
      this.requiredaccountNumber = true;

    } else {
      this.requiredaccountNumber = false;
    }
  }
  // --------------- ON change of DateOfPayment in line-------------

  onChangeDateOfPayment(
    summary: {
      previousEmployerId: number;
      institution: 0;
      accountNumber: number;
      declaredAmount: number;
      // actualAmount: number;
      dateOfPayment: Date;
    },
    i: number
  ) {
    console.log('summary::', summary);
    // this.declarationService = new DeclarationService(summary);
    this.investmentGroup3TransactionDetailList[i].dateOfPayment =
      summary.dateOfPayment;
      if (this.investmentGroup3TransactionDetailList[i].dateOfPayment == null ) {
        this.requireddateOfPayment = true;
      } else {
        this.requireddateOfPayment = false;
      }
  }

  // ------------Actual Amount change-----------
  onActualAmountChange(
    summary: {
      previousEmployerId: number;
      institution: 0;
      accountNumber: number;
      declaredAmount: number;
      actualAmount: number;
      dateOfPayment: Date;
    },
    i: number
  ) {
    console.log('summary::', summary);
    this.declarationService = new DeclarationService(summary);
    console.log('declarationService::', this.declarationService);
    this.investmentGroup3TransactionDetailList[
      i
    ].actualAmount = this.declarationService.actualAmount;
    console.log(
      'investmentGroup3TransactionDetailList[i].actualAmount::',
      this.investmentGroup3TransactionDetailList[i]
    );
    const formatedActualAmount = this.numberFormat.transform(
      this.investmentGroup3TransactionDetailList[i].actualAmount
    );
    this.investmentGroup3TransactionDetailList[
      i
    ].actualAmount = formatedActualAmount;

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.investmentGroup3TransactionDetailList.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      this.actualAmount += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });

    this?.transactionDetail?.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      this.actualAmount += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });

    this.grandActualTotal = this.actualAmount;
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
  }

  // ------------Decleared Amount change-----------
  onDeclearedAmountChange(
    summary: {
      previousEmployerId:number;
      institution: 0;
      accountNumber: number;      
      declaredAmount: number;
      actualAmount: number;
      dateOfPayment: Date;
    },
    i: number
  ) {

    console.log("summary::",summary)
    this.declarationService = new DeclarationService(summary);
    console.log("declarationService::",this.declarationService)
    this.investmentGroup3TransactionDetailList[i].declaredAmount = this.declarationService.declaredAmount;
    console.log("investmentGroup3TransactionDetailList[i].actualAmount::",this.investmentGroup3TransactionDetailList[i])
    const formatedActualAmount = this.numberFormat.transform(
      this.investmentGroup3TransactionDetailList[i].declaredAmount
    );
    this.investmentGroup3TransactionDetailList[i].declaredAmount = formatedActualAmount;

    if (this.investmentGroup3TransactionDetailList[i].declaredAmount == "0" || this.investmentGroup3TransactionDetailList[i].declaredAmount == "0.00") {
      this.requireddeclaredAmount = true;
      

    } else {
      this.requireddeclaredAmount = false;
    }

    this.declarationTotal = 0;
    this.declaredAmount = 0;
    this.investmentGroup3TransactionDetailList.forEach((element) => {
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      this.declaredAmount += Number(element.declaredAmount.toString().replace(',', ""));
    });

    this?.transactionDetail?.forEach((element) => {
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      this.declaredAmount += Number(element.declaredAmount.toString().replace(',', ""));
    });

    this.grandDeclarationTotal = this.declarationTotal;
    this.declarationTotal = 0;
    this.transactionDetail.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declarationTotal.toString().replace(/,/g, '')
      );
      // console.log("Actual Total")(this.actualTotal);
     console.log("Declaration Total::" , this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.grandDeclarationTotal = this.declarationTotal;
    console.log(this.grandDeclarationTotal);
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
    if (this.investmentGroup3TransactionDetailList[i].declaredAmount == "0") {
      this.requireddeclaredAmount = true;

    } else {
      this.requireddeclaredAmount = false;
    }
  }


  // --------Add New ROw Function---------
  addRowInList() {

    if (this.addNewRow) {
    this.declarationService = new DeclarationService();
    console.log('declarationService::', this.declarationService);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.isDisabled = false;
    this.declarationService.investmentGroup3TransactionId = this.globalAddRowIndex;
    this.declarationService.declaredAmount = 0;
    this.declarationService.accountNumber = null;
    this.declarationService.actualAmount = 0;
    this.declarationService.institution = null;
    this.declarationService.dateOfPayment = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;

    this.investmentGroup3TransactionDetailList.push(this.declarationService);
    console.log('addRow::', this.investmentGroup3TransactionDetailList);
    this.addNewRow = false;
    this.showDeleteButton = true;
  }
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    // const rowCount = this.transactionDetail[j].length - 1;
    // if (this.transactionDetail[j].length == 1) {
    //   return false;
    // } else if (this.initialArrayIndex[j] <= rowCount) {
    //   this.transactionDetail[j].splice(rowCount, 1);
    //   return true;
    // }
    this.investmentGroup3TransactionDetailList.splice(0, 1);
    this.addNewRow = true;
    this.showDeleteButton = false;
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
    this.transactionDetail[j] = this.declarationService;
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
    this.transactionDetail[j].push(this.declarationService);
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.forEach((element) => {
        element.dateOfPayment = this.datePipe.transform(
          element.dateOfPayment,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.transactionDetail;
    this.taxSavingNabardService
      .postTSNabardTransaction(data)
      .subscribe((res) => {
        console.log(res);
        this.transactionDetail =
          res.data.results[0].investmentGroup3TransactionDetail;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        this.transactionDetail.forEach((element) => {
          element.forEach((element) => {
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

  // Remove Selected Transaction Document
  removeSelectedTransactionDocument(index: number) {
    this.filesArray.splice(index, 1);
    console.log('this.filesArray::', this.filesArray);
    console.log('this.filesArray.size::', this.filesArray.length);
  }

  //----------- On change Transactional Line Item Remark --------------------------
  public onChangeDocumentRemark(transactionDetail, transIndex, event) {
     
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);

    this.transactionDetail[0].lictransactionList[transIndex].remark =  event.target.value;
   

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



    if (this.investmentGroup3TransactionDetailList[0].institution == null || this.investmentGroup3TransactionDetailList[0].accountNumber == null || this.investmentGroup3TransactionDetailList[0].dateOfPayment == null || this.investmentGroup3TransactionDetailList[0].declaredAmount == "0" || this.investmentGroup3TransactionDetailList[0].declaredAmount == "0.00") {
      if (this.investmentGroup3TransactionDetailList[0].institution == null) {
        this.requiredInstitution = true;
     
        this.alertService.sweetalertError(
          'Please Enter Required Field'
        );

      } else {
        this.requiredInstitution = false;
      }


      if (this.investmentGroup3TransactionDetailList[0].accountNumber == null) {
        this.requiredaccountNumber = true;
  
        this.alertService.sweetalertError(
          'Please Enter Required Field'
        );

      } else {
        this.requiredaccountNumber = false;
      }

      if (this.investmentGroup3TransactionDetailList[0].dateOfPayment == null ) {
        this.requireddateOfPayment = true;
   
        this.alertService.sweetalertError(
          'Please Enter Required Field'
        );


      } else {
        this.requireddateOfPayment = false;
      }
      if (this.investmentGroup3TransactionDetailList[0].declaredAmount == "0" || this.investmentGroup3TransactionDetailList[0].declaredAmount == "0.00") {
        this.requireddeclaredAmount = true;
           this.alertService.sweetalertError(
             'Please Enter Decleared Amount'
           );
        return;

      } else {
        this.requireddeclaredAmount = false;
      }
      return;
    }

    if (this.investmentGroup3TransactionDetailList[0].accountNumber == null && this.investmentGroup3TransactionDetailList[0].actualAmount == '0' && this.investmentGroup3TransactionDetailList[0].institution == null && this.investmentGroup3TransactionDetailList[0].dateOfPayment == null){
      this.alertService.sweetalertError(
        'Please Fill Required Field'
      );
      return;
    }
    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log(
      'this.investmentGroup3TransactionDetailList::',
      this.investmentGroup3TransactionDetailList
    );

    this.investmentGroup3TransactionDetailList.forEach((innerElement) => {
      if (innerElement.actualAmount !== null) {
        innerElement.actualAmount = innerElement.actualAmount
          .toString()
          .replace(/,/g, '');
      } else {
        innerElement.actualAmount = 0.0;
      }
    if(innerElement.declaredAmount !== null){
     innerElement.declaredAmount= innerElement.declaredAmount
     .toString()
     .replace(/,/g, '');
    } 
      const dateOfPaymnet = this.datePipe.transform(
        innerElement.dateOfPayment,
        'yyyy-MM-dd'
      );

      innerElement.dateOfPayment = dateOfPaymnet;
    });

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      investmentGroup3TransactionDetailList: this
        .investmentGroup3TransactionDetailList,
      groupTransactionIDs: this.uploadGridData,
      receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
      remarkPasswordList: this.documentDataArray
    };
    console.log('data::', data);
    this.taxSavingNabardService
      .uploadTSNabardTransactionwithDocument(this.filesArray, data)
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
        
          this.getIntillizeEdData();
          this.getData();
          // this.transactionDetail =
          //   res.data.results[0].investmentGroup3TransactionDetail;
          // this.documentDetailList = res.data.results[0].documentInformation;
          // this.grandDeclarationTotal =
          //   res.data.results[0].grandDeclarationTotal;
          // this.grandActualTotal = res.data.results[0].grandActualTotal;
          // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      
          // this.transactionDetail.forEach((element) => {
          //   element.forEach((innerElement) => {
          //     if (innerElement.dateOfPayment !== null) {
          //       innerElement.dateOfPayment = new Date(
          //         innerElement.dateOfPayment
          //       );
          //     }
          //     if (this.employeeJoiningDate < innerElement.dueDate) {
          //       innerElement.active = false;
          //     }

          //     innerElement.actualAmount = this.numberFormat.transform(
          //       innerElement.actualAmount
          //     );
          //     // console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
          //   });
          // });
          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );
          this.addNewRow = true;
          this.showDeleteButton = false;
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.receiptAmount = '0.00';
    this.filesArray = [];
    this.investmentGroup3TransactionDetailList = [];
    this.initialArrayIndex = [];
    this.globalSelectedAmount = '0.00';
    this.globalSelectedAmounts = '0.00';
    
  
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
    if (receiptAmount_ < this.globalSelectedAmounts) {
      this.alertService.sweetalertError(
        'Receipt Amount should be equal or greater than Actual Amount of Selected lines'
      );
      this.receiptAmount = '0.00';
      return false;
    } else if (receiptAmount_ > this.globalSelectedAmounts) {
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
    this.editTransactionUpload[j].previousEmployerId = event.target.value;
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
    this.editTransactionUpload[j].dueDate = summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].dueDate
    );
  }

  // --------------- ON change of declared Amount Edit Modal-------------
  // onDeclaredAmountChangeInEditCase(
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
  //   this.declarationService = new DeclarationService(summary);
  //   console.log(
  //     'onDeclaredAmountChangeInEditCase Amount change::' +
  //       summary.declaredAmount
  //   );

  //   this.editTransactionUpload[
  //     j
  //   ].declaredAmount = this.declarationService.declaredAmount;
  //   const formatedDeclaredAmount = this.numberFormat.transform(
  //     this.editTransactionUpload[j].declaredAmount
  //   );
  //   console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

  //   this.editTransactionUpload[j].declaredAmount = formatedDeclaredAmount;

  //   this.declarationTotal = 0;

  //   this.editTransactionUpload[j].forEach((element) => {
  //     console.log(
  //       'declaredAmount::',
  //       element.declaredAmount.toString().replace(/,/g, '')
  //     );
  //     this.declarationTotal += Number(
  //       element.declaredAmount.toString().replace(/,/g, '')
  //     );
  //   });

  //   this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
  //   console.log(
  //     'DeclarATION total==>>' + this.editTransactionUpload[j].declarationTotal
  //   );
  // }



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

    debugger
    this.declarationService = new DeclarationService(summary);
    console.log(
      'onDeclaredAmountChangeInEditCase Amount change::' +
        summary.declaredAmount
    );
    this.editTransactionUpload[0].actualAmount = this.editTransactionUpload[0].declaredAmount;

    this.editTransactionUpload[j].group3TransactionList[
      i
    ].actualAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].group2TransactionList[i].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].group2TransactionList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].group2TransactionList.forEach((element) => {
      console.log(
        'declaredAmount::',
        element.declaredAmount.toString().replace(/,/g, '')
      );
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
    });

    this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
    this.editTransactionUpload[j].grandDeclarationTotal = this.declarationTotal;
    this.editTransactionUpload[j].actualTotal = this.declarationTotal;
    console.log(
      'DeclarATION total==>>' + this.editTransactionUpload[j].declarationTotal
    );
    this.editTransactionUpload[0].actualAmount = this.editTransactionUpload[0].declaredAmount;
  }
  // ---- Set Date of Payment On Edit Modal----
  onChangeDateOfPaymentEditCase(
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
    this.editTransactionUpload[j].dateOfPayment = summary.dateOfPayment;
    console.log(this.editTransactionUpload[j].dateOfPayment);
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

    this.editTransactionUpload[
      j
    ].actualAmount = this.declarationService.actualAmount;
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
      this.editTransactionUpload[j].actualAmount !== Number(0) ||
      this.editTransactionUpload[j].actualAmount !== null
    ) {
      console.log(`in if::`, this.editTransactionUpload[j].actualAmount);
    } else {
      console.log(`in else::`, this.editTransactionUpload[j].actualAmount);
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.editTransactionUpload[j].forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.editTransactionUpload[j].actualTotal = this.actualTotal;
    console.log(this.editTransactionUpload[j].actualTotal);
  }

  uploadModal(template: TemplateRef<any>) {
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

  onSaveRemarkDetails(){
    
    const data ={
      "transactionId": this.summaryDetails.investmentGroup3TransactionId,
      "masterId":0,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"80C",
      "subSection":"NABARDBONDS",
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
        this.transactionDetail[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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

  // Remove Selected Transaction Document Edit Maodal
  removeSelectedTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
  }

  // Common Function for filter to call API
  getTransactionFilterData() {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.taxSavingNabardService.getTransactionFilterData().subscribe((res) => {
      console.log('getTransactionFilterData', res);
      if (res.data.results.length > 0) {
        this.transactionDetail =
          res.data.results[0].investmentGroup3TransactionDetailList;
        console.log('transactionDetail', this.transactionDetail);

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

        this.transactionDetail?.forEach((element) => {
          element.declaredAmount = this.numberFormat.transform(
            element.declaredAmount
          );
          element.actualAmount = this.numberFormat.transform(
            element.actualAmount
          );
        });
        if(!this?.transactionDetail?.length){
          this.addRowInList();
        }
      }
    });
  }

  public docRemarkModal(

    documentViewerTemplate: TemplateRef<any>,
    index: any,
    investmentGroup3TransactionId,
    summary, count
  ) {
    
  
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.taxSavingNabardService.getNabardRemarkList(
      investmentGroup3TransactionId,
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
  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.taxSavingNabardService
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

  // Remove Selected LicTransaction Document Edit Maodal
  removeSelectedLicTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
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
s

  docViewer(template3: TemplateRef<any>, documentDetailList: any) {
    console.log('documentDetailList::', documentDetailList);
    this.urlArray = documentDetailList;
    this.urlIndex = 0;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    this.viewDocumentName = this.urlArray[this.urlIndex].fileName;
    this.viewDocumentType = this.urlArray[this.urlIndex].documentType;
    console.log(this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}

class DeclarationService {
  public investmentGroup3TransactionId = 0;
  public previousEmployerId = 0;
  public institution: 0;
  public accountNumber: number;
  // public dueDate: Date;
  public declaredAmount: number;
  public actualAmount: number;
  public dateOfPayment: Date;
  public transactionStatus: string = 'Pending';
  public amountRejected: number;
  public amountApproved: number;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
