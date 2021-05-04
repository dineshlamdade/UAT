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
import { elementAt } from 'rxjs/operators';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { SeniorCitizenService } from '../senior-citizen.service';

@Component({
  selector: 'app-senior-citizen-declaration',
  templateUrl: './senior-citizen-declaration.component.html',
  styleUrls: ['./senior-citizen-declaration.component.scss']
})
export class SeniorCitizenDeclarationComponent implements OnInit {

  @Input() institution: string;
  @Input() policyNo: string;
  @Input() data: any;

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

  public investmentGroup3TransactionDetailList: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];

  public seniorCitizenForm: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private seniorCitizenService: SeniorCitizenService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    //  Form Initiate Senior Citizen -----------------
    this.seniorCitizenForm = this.formBuilder.group({
      institution: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      active: new FormControl(true, Validators.required),
      remark: new FormControl(null),
      declaredAmount: new FormControl(null, Validators.required),
      actualAmount: new FormControl(null, Validators.required),
      investmentGroup3TransactionId: new FormControl(0),
      previousEmployerId: new FormControl(0),
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
    this.getTransactionFilterData();
    // console.log('data::', this.data);
    

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    this.deactiveCopytoActualDate();
    this.getpreviousEmployeName();
   /*  this.getAllPreviousEmployer(); */

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
    return this.seniorCitizenForm.controls;
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
      this.seniorCitizenForm
        .get('declaredAmount')
        .setValue(formatedDeclaredAmount);
      this.seniorCitizenForm
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
      this.editTransactionUpload[0].actualAmount = formatedDeclaredAmount
    }
  }

  //------------- Post Add Transaction Page Data API call -------------------
  public saveTransaction(formDirective: FormGroupDirective): void {
    this.submitted = true;

    console.log(
      'seniorCitizenForm::',
      this.seniorCitizenForm
    );
    // console.log("formData::", formData);

    if (this.seniorCitizenForm.invalid) {
      return;
    }

    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError('Please attach Receipt / Certificate');
      return;
    }

    //else {
    const transactionDetail = this.seniorCitizenForm.getRawValue();

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

    this.seniorCitizenService
      .uploadSeniorCitizenTransactionwithDocument(this.filesArray, data)
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
          /*     element.forEach((element) => {
          element.dateOfPayment = new Date(element.dateOfPayment);
        }); */
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
    this.seniorCitizenForm.reset();
    this.filesArray = [];
    this.submitted = false;
    this.receiptAmount = '0.00';
    this.globalSelectedAmount = '0.00';
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

    this.seniorCitizenService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {

        console.log('edit Data:: ', res);

        this.urlArray =
          res.data.results[0].documentInformation[0].documentDetailList;
        this.urlArray.forEach((element) => {
          // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
          element.blobURI = 'data:image/image;base64,' + element.blobURI;
          // new Blob([element.blobURI], { type: 'application/octet-stream' });
        });

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
        this.editReceiptAmount = res.data.results[0].receiptAmount;



      });
  }

  //-------------- Upload Document in Edit Document Detail ---------------------
  public uploadUpdateTransaction() {
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
   

    const data = {
      proofSubmissionId: this.editProofSubmissionId,
      investmentGroup3TransactionDetailList: this.editTransactionUpload,
      receiptAmount: this.editReceiptAmount,
      documentRemark: this.documentRemark,
      groupTransactionIDs:this.uploadGridData,

    };  
    console.log('uploadUpdateTransaction data::', data);
    this.seniorCitizenService
      .uploadSeniorCitizenTransactionwithDocument(this.editfilesArray, data)
      .subscribe((res) => {
        console.log('uploadUpdateTransaction::', res);
        if (res.data.results.length > 0) {         
          this.transactionDetail =
            res.data.results[0].investmentGroup3TransactionDetailList;
          console.log('transactionDetail', this.transactionDetail);
  
          this.documentDetailList = res.data.results[0].documentInformation;
          this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
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
/*   getAllPreviousEmployer() {
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
      }
    });
  } */

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

  // public getInstitutionListWithPolicyNo() {
  //   this.seniorCitizenService
  //     .subscribe((res) => {
  //       console.log('getInstitutionListWithPolicyNo', res);
  //       this.transactionInstitutionListWithPolicies = res.data.results;

  //       res.data.results.forEach((element) => {
  //         const obj = {
  //           label: element.institution,
  //           value: element.institution,
  //         };
  //         this.transactionInstitutionNames.push(obj);

  //         element.policies.forEach((policy) => {
  //           const policyObj = {
  //             label: policy,
  //             value: policy,
  //           };
  //           this.transactionPolicyList.push(policyObj);
  //         });
  //       });
  //     });
  // }
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
 /*  selectedPolicy(policy: any) {
    this.globalPolicy = policy;
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy,
      null
    );
  } */

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
/*   selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy,
      transactionStatus
    );
  } */

  // -------- ON select to check input boxex--------
  public onSelectCheckBox(
   
    event: { target: { checked: any } },
    i: number
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
     /*  if (this.transactionDetail[j].isECS === 1) {
        this.transactionDetail[j].actualAmount =
          data.declaredAmount;
        this.transactionDetail[j].dateOfPayment = new Date(data.dueDate);
        console.log(
          'in IS actualAmount::',
          this.transactionDetail[j].actualAmount
        );
        console.log(
          'in IS dateOfPayment::',
          this.transactionDetail[j].dateOfPayment
        );
      } else {
        this.transactionDetail[j].actualAmount =
          data.declaredAmount;
      }
 */
      formatedActualAmount = Number(
        this.investmentGroup3TransactionDetailList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
      this.uploadGridData.push(this.investmentGroup3TransactionDetailList[i].investmentGroup3TransactionId);

      // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
      // this.actualAmountGlobal = Number(data.declaredAmount);
    } else {
      formatedActualAmount = Number(
        this.investmentGroup3TransactionDetailList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
     // this.investmentGroup3TransactionDetailList[i].actualAmount = this.numberFormat.transform(0);
    //  this.investmentGroup3TransactionDetailList[i].dateOfPayment = null;

      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
      const index = this.uploadGridData.indexOf(
        this.investmentGroup3TransactionDetailList[i].investmentGroup3TransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
    /* this.actualTotal = 0;
    this.investmentGroup3TransactionDetailList.forEach((element) => { */
      // console.log(element.actualAmount.toString().replace(',', ""));
  /*     this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    }); */
   // this.transactionDetail[j].actualTotal = this.actualTotal;

  /*   if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }*/

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
      item.forEach((element) => {
        this.uploadGridData.push(element.investmentGroup3TransactionId);
      });
      this.enableFileUpload = true;
    }
    // console.log('enableSelectAll...',  this.enableSelectAll);
    // console.log('uploadGridData...',  this.uploadGridData);
  }

  // --------------- ON change of declared Amount in line-------------
  onInstitutionChange(
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
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.investmentGroup3TransactionDetailList[i].institution = this.declarationService.institution;
    
  }

  // --------------- ON change of Accoun No in line-------------
  onAccountNoChange(
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
    this.declarationService = new DeclarationService(summary);
    // console.log("Ondeclaration Amount change" + summary.declaredAmount);

    this.investmentGroup3TransactionDetailList[i].accountNumber = this.declarationService.accountNumber;
    
  }
// --------------- ON change of DateOfPayment in line-------------

  onChangeDateOfPayment(
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
   // this.declarationService = new DeclarationService(summary);
    this.investmentGroup3TransactionDetailList[i].dateOfPayment = summary.dateOfPayment;
    
   
     }

  // ------------Actual Amount change-----------
  onActualAmountChange(
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
    this.investmentGroup3TransactionDetailList[i].actualAmount = this.declarationService.actualAmount;
    console.log("investmentGroup3TransactionDetailList[i].actualAmount::",this.investmentGroup3TransactionDetailList[i])
    const formatedActualAmount = this.numberFormat.transform(
      this.investmentGroup3TransactionDetailList[i].actualAmount
    );
    this.investmentGroup3TransactionDetailList[i].actualAmount = formatedActualAmount;

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.investmentGroup3TransactionDetailList.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.transactionDetail.forEach((element) => {
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

    this.grandActualTotal = this.actualTotal;
    // this.transactionDetail[j].actualAmount = this.actualAmount;
    // console.log(this.transactionDetail[j]);
    // console.log(this.actualTotal);
  }

  // --------Add New ROw Function---------
   addRowInList(
  ) {
    // console.log('summary::',  summarynew);
    // if (this.initialArrayIndex[j] > i) {
    //   this.hideRemoveRow = false;
    // } else {
    //   this.hideRemoveRow  = true;
    // }
    this.declarationService = new DeclarationService();
    console.log('declarationService::', this.declarationService);
    this.globalAddRowIndex -= 1;
   // console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.isDisabled = false;

    this.declarationService.investmentGroup3TransactionId = this.globalAddRowIndex;
    this.declarationService.declaredAmount = 0;
    this.declarationService.accountNumber = null;
    this.declarationService.actualAmount = 0;
    this.declarationService.institution = null;
    /* this.declarationService.active ='true'; */
    this.declarationService.dateOfPayment = null;
    this.declarationService.transactionStatus = 'Pending';
    this.declarationService.amountRejected = 0.0;
    this.declarationService.amountApproved = 0.0;

    this.investmentGroup3TransactionDetailList.push(this.declarationService);
    console.log('addRow::', this.investmentGroup3TransactionDetailList);
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
    this.transactionDetail[j]= this.declarationService;
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
    this.transactionDetail[j].push(
      this.declarationService
    );
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
    this.seniorCitizenService.postSeniorCitizenTransaction(data).subscribe((res) => {
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

  upload() 
  {
    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement'
      );
      return;
    }
    console.log('this.investmentGroup3TransactionDetailList::', this.investmentGroup3TransactionDetailList);

  
      this.investmentGroup3TransactionDetailList.forEach((innerElement) => {
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

    this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    const data = {
      investmentGroup3TransactionDetailList: this.investmentGroup3TransactionDetailList,
      receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
      groupTransactionIDs:this.uploadGridData,

    };
    console.log('data::', data);
    this.seniorCitizenService
      .uploadSeniorCitizenTransactionwithDocument(this.filesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {         
            this.transactionDetail =
              res.data.results[0].investmentGroup3TransactionDetailList;
            console.log('transactionDetail', this.transactionDetail);
    
            this.documentDetailList = res.data.results[0].documentInformation;
            this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
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
    this.receiptAmount = '0.00';
    this.filesArray = [];
    this.globalSelectedAmount = '0.00';
    this.investmentGroup3TransactionDetailList = [];
  }

  changeReceiptAmountFormat() {
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
  this.editTransactionUpload[j].dateOfPayment =
    summary.dateOfPayment;
  console.log(
    this.editTransactionUpload[j].dateOfPayment
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
    });

    this.editTransactionUpload[j].declarationTotal = this.declarationTotal;
    console.log(
      'DeclarATION total==>>' + this.editTransactionUpload[j].declarationTotal
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
      this.editTransactionUpload[j].actualAmount !==
        Number(0) ||
      this.editTransactionUpload[j].actualAmount !==
        null
    ) {
      console.log(
        `in if::`,
        this.editTransactionUpload[j].actualAmount
      );
    } else {
      console.log(
        `in else::`,
        this.editTransactionUpload[j].actualAmount
      );
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


  // Remove Selected Transaction Document Edit Maodal
  removeSelectedTransactionDocumentInEditCase(index: number) {
    this.editfilesArray.splice(index, 1);
    console.log('this.editfilesArray::', this.editfilesArray);
    console.log('this.editfilesArray.size::', this.editfilesArray.length);
  }

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

/*   docViewer(template3: TemplateRef<any>) {
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

  // Common Function for filter to call API
  getTransactionFilterData( ) {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.seniorCitizenService.getTransactionFilterData().subscribe((res) => {
      console.log('getTransactionFilterData', res);
      if (res.data.results.length > 0) {
        this.transactionDetail =
          res.data.results[0].investmentGroup3TransactionDetailList;
        console.log('transactionDetail', this.transactionDetail);

        this.documentDetailList = res.data.results[0].documentInformation;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
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
      } 
    });
  }

  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.seniorCitizenService
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
  active: string;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
