import { element } from 'protractor';
//import { data } from './../../../../companysetting/user-rolesand-permission/role-privilege/role-privilege.component';
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
import { MyInvestmentsService } from '../../../my-Investments.service';
import { PhysicallyHandicappedService } from '../physically-handicapped.service';
import { debug } from 'console';

@Component({
  selector: 'app-physically-handicapped-declaration-and-actual',
  templateUrl: './physically-handicapped-declaration-and-actual.component.html',
  styleUrls: ['./physically-handicapped-declaration-and-actual.component.scss'],
})
export class PhysicallyHandicappedDeclarationAndActualComponent
  implements OnInit
{
  public enteredRemark = '';
  @Input() institution: string;
  @Input() policyNo: string;
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
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public physicallyHandicappedDetail;
  public previousEmployerHandicappedDetailList;

  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];

  public physicallyHandicappedForm: FormGroup;

  documentDataArray = [];
  editdDocumentDataArray = [];

  viewDocumentName: any;
  viewDocumentType: any;

  documentArray: any[] = [];

  documentPassword = [];
  remarkList = [];
  editdocumentPassword = [];
  editremarkList = [];
  document3Password: any;
  remark3List: any;
  Remark: any;

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;

  public editReceiptAmount: string;

  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
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
  public transationId;

  public disability: string;
  public severity: string;
  public limit: any;
  public proofSubmissionId: '';
  public viewTransactionDetail = true;
  public physicallyHandicappedTransactionPreviousEmployerList;

  EditDocumentRemark: any;
  editDocumentRemark: any;
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  selectedremarkIndex : any;
  currentJoiningDate: Date;

  public editDocumentByPSID: Array<any> = [];
  public modalRef1: BsModalRef;
  public updateReceiptAmount: any;
  public createDateTime: any;
  public lastModifiedDateTime: any;
  public transactionStatus: any;
  public editTransactionData = [];
  editPreviousTransactionUpload = [];

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private physicallyHandicappedService: PhysicallyHandicappedService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    // ---------------- physically Handicapped FormTransaction Form -----------------
    this.physicallyHandicappedForm = this.formBuilder.group({
      actualAmount: new FormControl(null, Validators.required),
      physicallyHandicappedDetailId: new FormControl(0),
      previousEmployerId: new FormControl(0),
      // institution: new FormControl(null, Validators.required),
      // accountNumber: new FormControl(null, Validators.required),
      // active: new FormControl(true, Validators.required),
      // remark: new FormControl(null),
      // declaredAmount: new FormControl(null, Validators.required),
    });

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
    } else {
      const input = this.data;
      this.globalInstitution = input.institution;
      this.globalPolicy = input.policyNo;
      // this.getInstitutionListWithPolicyNo();
      this.getTransactionFilterData();
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    this.deactiveCopytoActualDate();
    this.getpreviousEmployeName();
    this.getAllPreviousEmployer();

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
  }

  //--------- convenience getter for easy access to form fields ---------------
  get masterForm() {
    return this.physicallyHandicappedForm.controls;
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
      this.physicallyHandicappedForm
        .get('declaredAmount')
        .setValue(formatedDeclaredAmount);
      this.physicallyHandicappedForm
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

    console.log('physicallyHandicappedForm::', this.physicallyHandicappedForm);
    // console.log("formData::", formData);

    if (this.physicallyHandicappedForm.invalid) {
      return;
    }

    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError('Please attach Receipt / Certificate');
      return;
    }

    //else {
    const transactionDetail = this.physicallyHandicappedForm.getRawValue();

    // transactionDetail.declaredAmount = transactionDetail.declaredAmount
    //   .toString()
    //   .replace(/,/g, '');
    transactionDetail.actualAmount = transactionDetail.actualAmount
      .toString()
      .replace(/,/g, '');

    // const data = {
    //   physicallyHandicappedDetail: transactionDetail,
    //   previousEmployerHandicappedDetailList: this.previousEmployerHandicappedDetailList,
    //   transactionIds: [],
    // };

    const data = {
      physicallyHandicappedDetail: this.physicallyHandicappedDetail,
      previousEmployerHandicappedDetailList:
        this.previousEmployerHandicappedDetailList,
      transactionIds: this.uploadGridData,
    };

    console.log('Physically Handicapped Data::', data);

    this.physicallyHandicappedService
      .uploadPhysicallyHandicappedTransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log('saveTransaction res::', res);
        if (res) {
          if (res.data.results.length > 0) {
            this.previousEmployerHandicappedDetailList =
              res.data.results[0].previousEmployerHandicappedDetailList;

            // this.documentDetailList = res.data.results[0].documentInformation;
            this.documentDetailList =
              res.data.results[0].previousEmployerHandicappedDetailList.documentInformationList;
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
              'This Policy Holder Already Added.'
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
    this.physicallyHandicappedForm.reset();
    this.filesArray = [];
    this.submitted = false;
    this.receiptAmount = '0.00';
    this.globalSelectedAmount = '0.00';
    this.documentRemark = '';
    this.masterfilesArray = [];
    this.urlArray = [];

    //}
  }

  //------------- When Edit of Document Details -----------------------
  declarationEditUpload(
    template2: TemplateRef<any>,
    proofSubmissionId: string
  ) {
    console.log('proofSubmissionId::', proofSubmissionId);

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );

    this.physicallyHandicappedService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      // .subscribe((res) => {

      //   console.log('edit Data:: ', res);

      //   this.urlArray =
      //     res.data.results[0].documentInformationList[0].documentDetailList;
      //   this.urlArray.forEach((element) => {
      //     // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
      //     element.blobURI = 'data:image/image;base64,' + element.blobURI;
      //     // new Blob([element.blobURI], { type: 'application/octet-stream' });
      //   });

      //   this.editTransactionUpload =
      //     res.data.results[0].previousEmployerHandicappedDetailList;
      //   this.editTransactionUpload.forEach((element) => {
      //     element.declaredAmount = this.numberFormat.transform(
      //       element.declaredAmount
      //     );
      //     element.actualAmount = this.numberFormat.transform(
      //       element.actualAmount
      //     );
      //   });

      //   this.grandDeclarationTotalEditModal =
      //     res.data.results[0].grandDeclarationTotal;
      //   this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
      //   this.grandRejectedTotalEditModal =
      //     res.data.results[0].grandRejectedTotal;
      //   this.grandApprovedTotalEditModal =
      //     res.data.results[0].grandApprovedTotal;
      //   this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
      //   this.editReceiptAmount = res.data.results[0].receiptAmount;

      // });
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].documentInformationList[0].documentDetailList;
        this.editTransactionUpload =
          res.data.results[0].previousEmployerHandicappedDetailList;
        this.editProofSubmissionId = res.data.results[0].proofSubmissionId;
        this.editReceiptAmount = res.data.results[0].receiptAmount;
        this.grandDeclarationTotalEditModal =
          res.data.results[0].grandDeclarationTotal;
        this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotalEditModal =
          res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotalEditModal =
          res.data.results[0].grandApprovedTotal;
        //console.log(this.urlArray);
        this.urlArray.forEach((element) => {
          // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
          element.blobURI = 'data:image/image;base64,' + element.blobURI;
          // new Blob([element.blobURI], { type: 'application/octet-stream' });
        });
        this.masterGridData.forEach((element) => {
          element.documentInformation.forEach((element) => {
            element.documentDetailList.forEach((element) => {
              // if(element!=null)
              this.documentArray.push({
                dateofsubmission: element.dateOfSubmission,
                documentType: element.documentType,
                documentName: element.fileName,
                documentPassword: element.documentPassword,
                documentRemark: element.documentRemark,
                status: element.status,
                lastModifiedBy: element.lastModifiedBy,
                lastModifiedTime: element.lastModifiedTime,
              });
            });
          });
        });
      });
    this.documentArray = [];
    //console.log('converted:: ', this.urlArray);
    // });
  }

  public docViewer1(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;
    // this.urlIndex = 0;
    this.viewDocumentName = data.documentName;
    this.viewDocumentType = data.documentType;

    console.log('urlIndex::', this.urlIndex);
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
debugger
//     this.previousEmployerHandicappedDetailList.forEach((element) => {
//       element.physicallyHandicappedTransactionList.forEach(
//         (innerElement) => {
//       if (element.declaredAmount !== null) {
//         element.declaredAmount = element.declaredAmount
//           .toString()
//           .replace(/,/g, '');
//       } else {
//         element.declaredAmount = 0.0;
//       }
//       if (element.actualAmount !== null) {
//         element.actualAmount = element.actualAmount
//           .toString()
//           .replace(/,/g, '');
//       } else {
//         element.actualAmount = 0.0;
//       }
//     })
//   });
//   // element.physicallyHandicappedTransactionPreviousEmployerList.forEach(
//     (innerElement) => {
//       if (innerElement.actualAmount !== null) {
//         innerElement.actualAmount = innerElement.actualAmount
//           .toString()
//           .replace(/,/g, '');
//       } else {
//         innerElement.actualAmount = 0.0;
//       }
//       this.uploadGridData.push(innerElement.electricVehicleLoanTransactionId);
//     }
//   // );
// ;
if (this.previousEmployerHandicappedDetailList !== null) {
  console.log(
    'previousEmployerHandicappedDetailList::',
    this.previousEmployerHandicappedDetailList
  );
  this.previousEmployerHandicappedDetailList.forEach((innerElement) => {
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
    // if (innerElement.declaredAmount !== undefined || innerElement.declaredAmount !== null) {
    //   innerElement.declaredAmount = innerElement.declaredAmount
    //     .toString()
    //     .replace(/,/g, '');
    // } else {
    //
    // }
    innerElement.declaredAmount = 0.0;
  });
}

    // const data = {
    //   physicallyHandicappedDetail: this.editTransactionUpload[0],
    //   transactionIds: this.uploadGridData,
    //   //documentRemark: this.documentRemark,
    //   proofSubmissionId: this.editProofSubmissionId,
    //   receiptAmount: this.editReceiptAmount,
    //   documentRemark: this.editDocumentRemark,
    //   remarkPasswordList: this.editdDocumentDataArray,
    // };
    const data = {
      physicallyHandicappedDetail: this.physicallyHandicappedDetail,
      previousEmployerHandicappedDetailList:
        this.previousEmployerHandicappedDetailList,
      transactionIds: this.uploadGridData,
      proofSubmissionId: this.editProofSubmissionId,
      disability: this.disability,
      severity: this.severity,
      limit: this.limit,
      // receiptAmount: this.receiptAmount,
      documentRemark: this.editDocumentRemark,
      remarkPasswordList: this.editdDocumentDataArray,
    };
    console.log('data::', data);
    console.log('uploadUpdateTransaction data::', data);

    this.physicallyHandicappedService
      .uploadPhysicallyHandicappedTransactionwithDocument(
        this.editfilesArray,
        data
      )
      .subscribe((res) => {
        console.log('uploadUpdateTransaction::', res);
        if (res.data.results.length > 0) {
          this.editremarkList = [];
          this.editdocumentPassword = [];
          this.editfilesArray = [];
          this.masterGridData.forEach((element, index) => {
            this.documentArray.push({
              dateofsubmission: new Date(),
              documentType: element.documentInformationList[0].documentType,
              documentName: element.documentInformationList[0].fileName,
              documentPassword:
                element.documentInformationList[0].documentPassword,
              documentRemark: element.documentInformationList[0].documentRemark,
              status: element.documentInformationList[0].status,
              approverName: element.documentInformationList[0].lastModifiedBy,
              Time: element.documentInformationList[0].lastModifiedTime,

              // 'documentStatus' : this.premiumFileStatus,
            });

            if (element.documentInformationList[1]) {
              this.documentArray.push({
                dateofsubmission: new Date(),
                documentType: element.documentInformationList[1].documentType,
                documentName: element.documentInformationList[1].fileName,
                documentPassword:
                  element.documentInformationList[1].documentPassword,
                documentRemark:
                  element.documentInformationList[1].documentRemark,
                status: element.documentInformationList[1].status,
                lastModifiedBy:
                  element.documentInformationList[1].lastModifiedBy,
                lastModifiedTime:
                  element.documentInformationList[1].lastModifiedTime,

                // 'documentStatus' : this.premiumFileStatus,
              });
            }
          });

          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );

          this.previousEmployerHandicappedDetailList =
            res.data.results[0].previousEmployerHandicappedDetailList;
          // this.documentDetailList = res.data.results[0].documentInformation;
          this.documentDetailList = res.data.results[0].documentInformationList;
          this.grandDeclarationTotal =
            res.data.results[0].grandDeclarationTotal;
          this.grandActualTotal = res.data.results[0].grandActualTotal;
          this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {
            this.initialArrayIndex.push(
              element.previousEmployerHandicappedDetailList.length
            );

            this.previousEmployerHandicappedDetailList.forEach((element) => {
              element.declaredAmount = this.numberFormat.transform(
                element.declaredAmount
              );
              element.actualAmount = this.numberFormat.transform(
                element.actualAmount
              );
            });
            // this.transactionDetail.forEach((element) => {
            //   element.declaredAmount = this.numberFormat.transform(
            //     element.declaredAmount
            //   );
            //   element.actualAmount = this.numberFormat.transform(
            //     element.actualAmount
            //   );
            // });
          });

          // this.alertService.sweetalertMasterSuccess(
          //   'Transaction Saved Successfully.',
          //   ''
          // );
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
    this.previousEmployerHandicappedDetailList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.previousEmployerHandicappedDetailList[i].previousEmployerId
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
    this.getTransactionFilterData();
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

    // if (institutionName == 'All') {
    //   this.grandTabStatus = true;
    //   this.isDisabled = true;
    // } else {
    //   this.grandTabStatus = false;
    //   this.isDisabled = false;
    // }

    this.resetAll();
  }

  // -------- On Policy selection show all transactions list accordingly all policies---------
  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this
      .getTransactionFilterData
      // this.globalInstitution,
      // this.globalPolicy,
      // null
      ();
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {
    this
      .getTransactionFilterData
      // this.globalInstitution,
      // this.globalPolicy,
      // transactionStatus
      ();
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

    let formatedActualAmount: number = 0;
    let formatedSelectedAmount: string;
    if (checked) {
      this.previousEmployerHandicappedDetailList[i].actualAmount =
        data.actualAmount;

      formatedActualAmount = Number(
        this.previousEmployerHandicappedDetailList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      // formatedSelectedAmount = this.numberFormat.transform(
      //   formatedGlobalSelectedValue + formatedActualAmount
      // );
      // console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(data.physicallyHandicappedDetailId);
    } else {
      formatedActualAmount = Number(
        this.previousEmployerHandicappedDetailList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.previousEmployerHandicappedDetailList[i].actualAmount =
        this.numberFormat.transform(0);
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        data.physicallyHandicappedDetailId
      );
      this.uploadGridData.splice(index, 1);
    }

    // this.globalSelectedAmount = formatedSelectedAmount;
    // console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    this.actualTotal = 0;
    this.previousEmployerHandicappedDetailList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    // this.previousEmployerHandicappedDetailList.actualTotal = this.actualTotal;

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
      item.previousEmployerHandicappedDetailList.forEach((element) => {
        this.uploadGridData.push(element.physicallyHandicappedDetailId);
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

    this.transactionDetail[j].previousEmployerHandicappedDetailList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.transactionDetail[j].previousEmployerHandicappedDetailList[i]
        .declaredAmount
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.transactionDetail[j].previousEmployerHandicappedDetailList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.transactionDetail[j].previousEmployerHandicappedDetailList.forEach(
      (element) => {
        // console.log(element.declaredAmount.toString().replace(',', ""));
        this.declarationTotal += Number(
          element.declaredAmount.toString().replace(/,/g, '')
        );
        // console.log(this.declarationTotal);
        // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
      }
    );

    this.transactionDetail[j].declarationTotal = this.declarationTotal;
    // console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
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
    this.transactionDetail[j].previousEmployerHandicappedDetailList[i].dueDate =
      summary.dueDate;
  }

  // ------------Actual Amount change-----------
  onActualAmountChange(
    summary: {
      previousEmployerName: any;
      // declaredAmount: number;
      // dateOfPayment: Date;
      actualAmount: number;
      // dueDate: Date;
    },
    i: number,
    j: number
  ) {
    this.declarationService = new DeclarationService(summary);
    // console.log("Actual Amount change::" , summary);

    this.previousEmployerHandicappedDetailList[i].actualAmount =
      this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.previousEmployerHandicappedDetailList[i].actualAmount
    );
    const formatedActualAmount = this.numberFormat.transform(
      this.previousEmployerHandicappedDetailList[i].actualAmount
    );
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.previousEmployerHandicappedDetailList[i].actualAmount =
      formatedActualAmount;

    if (
      this.previousEmployerHandicappedDetailList[i].actualAmount !==
        Number(0) ||
      this.previousEmployerHandicappedDetailList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.previousEmployerHandicappedDetailList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.previousEmployerHandicappedDetailList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;

    this.previousEmployerHandicappedDetailList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });
  }

  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  addRowInList(
    summarynew: {
      physicallyHandicappedDetailId: number;
      employeeMasterId: number;
      previousEmployerId: number;
      // declaredAmount: any;
      // accountNumber: number;
      actualAmount: any;
      // institution: number;
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
    this.declarationService.physicallyHandicappedDetailId =
      this.globalAddRowIndex;
    // this.declarationService.declaredAmount = null;
    this.declarationService.actualAmount = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;
    this.declarationService.physicallyHandicappedDetailId = 0;
    // this.declarationService.severity = this.severity;
    this.previousEmployerHandicappedDetailList.push(this.declarationService);
    console.log(this.globalAddRowIndex);
    console.log('addRow::', this.previousEmployerHandicappedDetailList);
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount = this.previousEmployerHandicappedDetailList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.previousEmployerHandicappedDetailList.length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.previousEmployerHandicappedDetailList.splice(rowCount, 1);
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
      this.transactionDetail[j].previousEmployerHandicappedDetailList[i]
        .actualAmount;
    this.transactionDetail[j].previousEmployerHandicappedDetailList[i] =
      this.declarationService;
    this.declarationService = new DeclarationService();
  }

  SaveDeclrationRow(j) {
    if (!this.declarationService) {
      return;
    }
    this.transactionDetail[j].declarationTotal +=
      this.declarationService.declaredAmount;
    this.transactionDetail[j].actualTotal +=
      this.declarationService.actualAmount;
    this.grandActualTotal += this.declarationService.actualAmount;
    this.grandDeclarationTotal += this.declarationService.declaredAmount;
    this.transactionDetail[j].previousEmployerHandicappedDetailList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    this.transactionDetail.forEach((element) => {
      element.previousEmployerHandicappedDetailList.forEach((element) => {
        element.dateOfPayment = this.datePipe.transform(
          element.dateOfPayment,
          'yyyy-MM-dd'
        );
      });
    });
    const data = this.transactionDetail;
    this.physicallyHandicappedService
      .postPhysicallyHandicappedTransaction(data)
      .subscribe((res) => {
        console.log(res);
        this.transactionDetail =
          res.data.results[0].physicallyHandicappedDetail;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        this.transactionDetail.forEach((element) => {
          element.previousEmployerHandicappedDetailList.forEach((element) => {
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

  onSelectCurrentEmp(element, event: { target: { checked: any } }) {
    const checked = event.target.checked;
    this.physicallyHandicappedDetail.physicallyHandicappedDetailId =
      element.physicallyHandicappedDetailId;
    this.physicallyHandicappedDetail.declaredAmount = this.unformatAmount(
      element.declaredAmount
    );
    this.physicallyHandicappedDetail.actualAmount = this.unformatAmount(
      element.actualAmount
    );
    this.physicallyHandicappedDetail.transactionStatus = 'Pending';

    this.physicallyHandicappedDetail.proofSubmissionId =
      element.proofSubmissionId;
    this.physicallyHandicappedDetail.employeeMasterId =
      element.employeeMasterId;

    if (checked) {
      this.uploadGridData.push(element.physicallyHandicappedDetailId);
      console.log('this.uploadGridData', this.uploadGridData);
    } else {
      const index = this.uploadGridData.indexOf(
        element.physicallyHandicappedDetailId
      );
      this.uploadGridData.splice(index, 1);
    }
  }

  unformatAmount(amount) {
    if (amount !== null && amount != undefined) {
      amount = amount.toString().replace(/,/g, '');
    } else {
      amount = 0.0;
    }
    return amount;
  }

//----------- On change Transactional Line Item Remark --------------------------
public onChangeDocumentRemark(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
  debugger
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.previousEmployerHandicappedDetailList[transIndex].remark =  event.target.value;
 

}
onSaveRemarkDetails(summary, index){
    
  const data ={
    "transactionId": this.summaryDetails.physicallyHandicappedDetailId,
    "masterId":0,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"80U",
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
      this.previousEmployerHandicappedDetailList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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


public docRemarkModal1(
  documentViewerTemplate: TemplateRef<any>,
  index: any,
  physicallyHandicappedDetailId,
  physicallyHandicappedDetail, count
) {

  this.summaryDetails = physicallyHandicappedDetail;
  this.indexCount = count;
  this.selectedremarkIndex = count;
  this.physicallyHandicappedService.getphysicallyhandicappedTransactionRemarkList(
    physicallyHandicappedDetailId,
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


 //----------- On change Transactional Line Item Remark --------------------------
 public onChangeDocumentRemark1(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
  debugger
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[transIndex].remark =  event.target.value;
 

}

onSaveRemarkDetails1(physicallyHandicappedDetail, index){
    
  const data ={
    "transactionId": this.summaryDetails.physicallyHandicappedDetailId,
    "masterId":0,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"80U",
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


onResetRemarkDetails1() {
  this.enteredRemark = '';
}


upload() {
    for (let i = 0; i < this.filesArray.length; i++) {
      if (this.remarkList[i] != undefined || this.remarkList[i] == undefined) {
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
    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Medical Certificate/Form 10-1A / Medical Certificate/Form 10-1A.'
      );
      return;
    }

    // this.transactionDetail.forEach((element) => {
    //current emp table number format
    // console.log('physicallyHandicappedDetail::', this.physicallyHandicappedDetail);
    // this.physicallyHandicappedDetail.forEach((item) => {
    //   if (item.actualAmount !== null) {
    //     item.actualAmount = item.actualAmount
    //       .toString()
    //       .replace(/,/g, '');
    //   } else {
    //     item.actualAmount = 0.0;
    //   }
    //   if (item.declaredAmount !== null) {
    //     item.declaredAmount = item.declaredAmount
    //       .toString()
    //       .replace(/,/g, '');
    //   } else {
    //     item.declaredAmount = 0.0;
    //   }
    // });
    //previous emp table number format
    if (this.previousEmployerHandicappedDetailList !== null) {
      console.log(
        'previousEmployerHandicappedDetailList::',
        this.previousEmployerHandicappedDetailList
      );
      this.previousEmployerHandicappedDetailList.forEach((innerElement) => {
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
        // if (innerElement.declaredAmount !== undefined || innerElement.declaredAmount !== null) {
        //   innerElement.declaredAmount = innerElement.declaredAmount
        //     .toString()
        //     .replace(/,/g, '');
        // } else {
        //
        // }
        innerElement.declaredAmount = 0.0;
      });
    }
    // });

    // console.log('previousEmployerHandicappedDetailList::', this.previousEmployerHandicappedDetailList);
    // this.previousEmployerHandicappedDetailList.forEach((innerElement) => {
    //     if (innerElement.actualAmount !== null) {
    //       innerElement.actualAmount = innerElement.actualAmount
    //         .toString()
    //         .replace(/,/g, '');
    //     } else {
    //       innerElement.actualAmount = 0.0;
    //     }

    //     // if (innerElement.actualAmount !== null) {
    //     //   innerElement.actualAmount = innerElement.actualAmount
    //     //     .toString()
    //     //     .replace(/,/g, '');
    //     // } else {
    //     //   innerElement.actualAmount = 0.0;
    //     // }

    //   });

    // this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      physicallyHandicappedDetail: this.physicallyHandicappedDetail,
      previousEmployerHandicappedDetailList:
        this.previousEmployerHandicappedDetailList,
      transactionIds: this.uploadGridData,
      proofSubmissionId: '',
      disability: this.disability,
      severity: this.severity,
      limit: this.limit,
      // receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
      remarkPasswordList: this.documentDataArray,
    };
    console.log('data::', data);

    // this.fileService.uploadSingleFile(this.currentFileUpload, data)
    // .pipe(tap(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //         this.loaded = Math.round(100 * event.loaded / event.total);
    //     }
    // }))
    this.physicallyHandicappedService
      .uploadPhysicallyHandicappedTransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        this.ngOnInit();
        if (res.data.results.length > 0) {
          this.masterGridData.forEach((element, index) => {
            this.documentArray.push({
              dateofsubmission: new Date(),
              documentType: element.documentInformationList[0].documentType,
              documentName: element.documentInformationList[0].fileName,
              documentPassword:
                element.documentInformationList[0].documentPassword,
              documentRemark: element.documentInformationList[0].documentRemark,
              status: element.documentInformationList[0].status,
              approverName: element.documentInformationList[0].lastModifiedBy,
              Time: element.documentInformationList[0].lastModifiedTime,

              // 'documentStatus' : this.premiumFileStatus,
            });

            if (element.documentInformationList[1]) {
              this.documentArray.push({
                dateofsubmission: new Date(),
                documentType: element.documentInformationList[1].documentType,
                documentName: element.documentInformationList[1].fileName,
                documentPassword:
                  element.documentInformationList[1].documentPassword,
                documentRemark:
                  element.documentInformationList[1].documentRemark,
                status: element.documentInformationList[1].status,
                lastModifiedBy:
                  element.documentInformationList[1].lastModifiedBy,
                lastModifiedTime:
                  element.documentInformationList[1].lastModifiedTime,

                // 'documentStatus' : this.premiumFileStatus,
              });
            }
          });
          this.physicallyHandicappedDetail =
            res.data.results[0].physicallyHandicappedDetail;
          this.previousEmployerHandicappedDetailList =
            res.data.results[0].previousEmployerHandicappedDetailList;
          this.documentDetailList = res.data.results[0].documentInformationList;
          // this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          // this.grandActualTotal = res.data.results[0].grandActualTotal;
          // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

          if (this.previousEmployerHandicappedDetailList !== null) {
            console.log(
              'previousEmployerHandicappedDetailList::',
              this.previousEmployerHandicappedDetailList
            );
            this.previousEmployerHandicappedDetailList.forEach(
              (innerElement) => {
                innerElement.actualAmount = this.numberFormat.transform(
                  innerElement.actualAmount
                );
                innerElement.declaredAmount = 0.0;
              }
            );
          }

          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            ''
          );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    this.documentDataArray = [];
    this.documentPassword = [];
    this.ngOnInit();
    this.receiptAmount = '0.00';
    this.filesArray = [];

    this.globalSelectedAmount = '0.00';
    this.documentRemark = '';
    // }
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

  // // Update Previous Employee in Edit Modal
  // updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
  //   console.log('select box value::', event.target.value);
  //   this.previousEmployerHandicappedDetailList[i].previousEmployerId =
  //     event.target.value;
  //   console.log(
  //     'previous emp id::',
  //     this.previousEmployerHandicappedDetailList[i].previousEmployerId
  //   );
  // }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.previousEmployerHandicappedDetailList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.previousEmployerHandicappedDetailList[i].previousEmployerId
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
    this.editTransactionUpload[j].previousEmployerHandicappedDetailList[
      i
    ].dueDate = summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].previousEmployerHandicappedDetailList[i]
        .dueDate
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

    this.editTransactionUpload[j].declaredAmount =
      this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].declaredAmount
    );
    console.log(`formatedDeclaredAmount::`, formatedDeclaredAmount);

    this.editTransactionUpload[j].previousEmployerHandicappedDetailList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;

    this.editTransactionUpload[j].forEach((element) => {
      console.log(
        'declaredAmount::',
        element.declaredAmount.toString().replace(/,/g, '')
      );
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
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

    this.previousEmployerHandicappedDetailList[i].actualAmount =
      this.declarationService.actualAmount;
    console.log(
      'Actual Amount changed::',
      this.editTransactionUpload[j].actualAmount
    );

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.previousEmployerHandicappedDetailList[i].actualAmount =
      formatedActualAmount;

    if (
      this.editTransactionUpload[j].actualAmount !== Number(0) ||
      this.editTransactionUpload[j].actualAmount !== null
    ) {
      console.log(`in if::`, this.editTransactionUpload[j].actualAmount);
    } else {
      console.log(
        `in else::`,
        this.previousEmployerHandicappedDetailList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.previousEmployerHandicappedDetailList.forEach((element) => {
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
    this.proofSubmissionFileList =
      this.documentDetailList[documentIndex].documentDetailList;
  }

  deactiveCopytoActualDate() {
    if (this.isECS === false) {
      this.hideCopytoActualDate = true;
    } else {
      this.hideCopytoActualDate = false;
    }
  }
  removeSelectedTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
  }


 // When Edit of Document Details
 editViewTransaction(
  template2: TemplateRef<any>,
      proofSubmissionId: string
) {
  debugger
  this.documentRemark = '';
  this.editDocumentByPSID = [];
  this.documentArray = [];
  this.editPreviousTransactionUpload = [];
  this.editTransactionData = [];
  console.log('proofSubmissionId::', proofSubmissionId);

  this.modalRef1 = this.modalService.show(
    template2,
    Object.assign({}, { class: 'gray modal-xl' })
  );

  this.physicallyHandicappedService
    .getTransactionByProofSubmissionId(proofSubmissionId)
    .subscribe((res) => {
    debugger
      console.log('edit Data:: ', res);
      // console.log('test', res.data.results[0].electricVehicleLoanTransactionDocumentDetailList[0].receiptAmount);

      // this.updateReceiptAmount = res.data.results[0].electricVehicleLoanTransactionDocumentDetailList[0].receiptAmount;
      // this.editDocumentByPSID = res.data.results[0].electricVehicleLoanTransactionDocumentDetailList;
      this.editTransactionData =
      res.data.results[0].physicallyHandicappedTransactionList;
      this.editDocumentByPSID.forEach(element => {
        element.documentDetailList.forEach(element => {
          // if(element!=null)
          this.documentArray.push({
            'dateofsubmission': element.dateOfSubmission,
            'documentType':element.documentType,
            'documentName': element.fileName,
            'documentPassword':element.password,
            'documentRemark':element.remark,
            'status' : element.status,
            'lastModifiedBy' : element.lastModifiedBy,
            'lastModifiedTime' : element.lastModifiedTime,
          });
          });
        });
        debugger
      //   this.urlArray =
      //   res.data.results[0].documentInformationList[0].documentDetailList;
      // this.editTransactionUpload =
      //   res.data.results[0].documentInformationList;
      this.editPreviousTransactionUpload =
        res.data.results[0].physicallyHandicappedTransactionPreviousEmployerList;
    
      // this.editProofSubmissionId = res.data.results[0].electricVehicleLoanTransactionDetailList[0].proofSubmissionId;
      this.editProofSubmissionId = proofSubmissionId;

      if(res?.data?.results[0]?.physicallyHandicappedTransactionList?.length) {
      this.createDateTime = res?.data?.results[0]?.physicallyHandicappedTransactionList[0]?.createDateTime;
      this.lastModifiedDateTime = res?.data?.results[0]?.physicallyHandicappedTransactionList[0]?.lastModifiedDateTime;
      this.transactionStatus = res?.data?.results[0]?.physicallyHandicappedTransactionList[0]?.transactionStatus;
      }    
if(res?.data?.results[0]?.physicallyHandicappedTransactionPreviousEmployerList?.length) {
      this.createDateTime = res?.data?.results[0]?.physicallyHandicappedTransactionPreviousEmployerList[0]?.createDateTime;
      this.lastModifiedDateTime = res?.data?.results[0]?.physicallyHandicappedTransactionPreviousEmployerList[0]?.lastModifiedDateTime;
      this.transactionStatus = res?.data?.results[0]?.physicallyHandicappedTransactionPreviousEmployerList[0]?.transactionStatus;
}

      this.editReceiptAmount = res.data.results[0].documentInformation[0].receiptAmount;
      this.grandDeclarationTotalEditModal =
        res.data.results[0].grandDeclarationTotal;
      this.grandActualTotalEditModal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotalEditModal =
        res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotalEditModal =
        res.data.results[0].grandApprovedTotal;

        this.masterGridData = res.data.results;

        // this.masterGridData.forEach((element) => {
        //   // element.policyStartDate = new Date(element.policyStartDate);
        //   // element.policyEndDate = new Date(element.policyEndDate);
        //   // element.fromDate = new Date(element.fromDate);
        //   // element.toDate = new Date(element.toDate);
        //   element.documentInformation.forEach(element => {
        //     // this.dateofsubmission = element.dateOfSubmission;
        //     // this.documentArray.push({
        //     //   'dateofsubmission': ,
        //     // })

        //     element.documentDetailList.forEach(element => {
        //     // if(element!=null)
        //     this.documentArray.push({
        //       'dateofsubmission': element.dateOfSubmission,
        //       'documentType':element.documentType,
        //       'documentName': element.fileName,
        //       'documentPassword':element.documentPassword,
        //       'documentRemark':element.documentRemark,
        //       'status' : element.status,
        //       'lastModifiedBy' : element.lastModifiedBy,
        //       'lastModifiedTime' : element.lastModifiedTime,
        //     })
        //     })
        //   });
        //   // this.documentArray.push({
        //   //   'dateofsubmission':element.creatonTime,
        //   //   'documentType':element.documentType,
        //   //   'documentName': element.fileName,
        //   //   'documentPassword':element.documentPassword,
        //   //   'documentRemark':element.documentRemark,
        //   //   'status' : element.status,
        //   //   'lastModifiedBy' : element.lastModifiedBy,
        //   //   'lastModifiedTime' : element.lastModifiedTime,
        //   //
        //   // })
        // });
      }
    );

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
























  // Common Function for filter to call API
  getTransactionFilterData() // institution: String,
  // policyNo: String,
  // transactionStatus: String
  {
    this.physicallyHandicappedService
      .getTransactionFilterData()
      .subscribe((res) => {
        console.log('getTransactionFilterData', res);

        if (
          res.data.results[0].severity === undefined ||
          res.data.results.severity === null
        ) {
          this.alertService.sweetalertError('you are not applicable.');
        } else {
          this.physicallyHandicappedDetail =
            res.data.results[0].physicallyHandicappedDetail;
          console.log(
            'physicallyHandicappedDetail',
            this.physicallyHandicappedDetail
          );
          this.previousEmployerHandicappedDetailList =
            res.data.results[0].previousEmployerHandicappedDetailList;
          console.log(
            'previousEmployerHandicappedDetailList',
            this.previousEmployerHandicappedDetailList
          );
          this.documentDetailList = res.data.results[0].documentInformationList;
          this.disability = res.data.results[0].disability;
          this.limit = res.data.results[0].limit;
          this.severity = res.data.results[0].severity;
          this.proofSubmissionId = res.data.results[0].proofSubmissionId;

          console.log('documentArrayTest', this.documentArray);
          // this.documentDetailList = res.data.results[0].documentInformation;
          // this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
          // this.grandActualTotal = res.data.results[0].grandActualTotal;
          // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
          // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
          // this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].previousEmployerHandicappedDetailList.length;

          this.initialArrayIndex = [];

          // this.physicallyHandicappedDetail.forEach((element) => {
          //   element.declaredAmount = this.numberFormat.transform(
          //     element.declaredAmount
          //   );
          //   element.actualAmount = this.numberFormat.transform(
          //     element.actualAmount
          //   );
          // });

          this.previousEmployerHandicappedDetailList.forEach((element) => {
            element.declaredAmount = this.numberFormat.transform(
              element.declaredAmount
            );
            element.actualAmount = this.numberFormat.transform(
              element.actualAmount
            );
          });

          res.documentDetailList.forEach((element) => {
            // if(element!=null)
            this.documentArray.push({
              dateofsubmission: element.creatonTime,
              documentType: element.documentType,
              documentName: element.fileName,
              documentPassword: element.documentPassword,
              documentRemark: element.documentRemark,
              status: element.status,
              lastModifiedBy: element.lastModifiedBy,
              lastModifiedTime: element.lastModifiedTime,
            });
          });
        }
      });
  }

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    physicallyHandicappedDetailId,
    summary, count
  ) {
  
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.physicallyHandicappedService.getphysicallyhandicappedTransactionRemarkList(
      physicallyHandicappedDetailId,
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
    this.physicallyHandicappedService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        console.log('edit Data:: ', res);
        this.urlArray =
          // res.data.results[0].documentInformation[0].documentDetailList;
          res.data.results[0].documentInformationList[0].documentDetailList;
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
    this.transactionDetail[j].previousEmployerHandicappedDetailList[
      i
    ].dateOfPayment = summary.dateOfPayment;
    console.log(
      this.transactionDetail[j].previousEmployerHandicappedDetailList[i]
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

  zoomin() {
    var myImg = document.getElementById('map');
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500) return false;
    else {
      myImg.style.width = currWidth + 100 + 'px';
    }
  }
  zoomout() {
    var myImg = document.getElementById('map');
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
      myImg.style.width = currWidth - 100 + 'px';
    }
  }

  docViewer(template3: TemplateRef<any>, documentInformationResponseList: any) {
    console.log(
      'documentInformationResponseList::',
      documentInformationResponseList
    );
    this.urlArray = documentInformationResponseList;
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
  public physicallyHandicappedDetailId = 0;
  public employeeMasterId: number;
  public previousEmployerId = 0;
  public institution: 0;
  // public accountNumber: number;
  // public dueDate: Date;
  public declaredAmount: number;
  public actualAmount: number;
  // public dateOfPayment: Date;
  public transactionStatus: string = 'Pending';
  public amountRejected: number;
  public amountApproved: number;
  public severity: string;
  proofSubmissionId: any;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
