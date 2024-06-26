import { element } from 'protractor';
import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { typeSourceSpan } from '@angular/compiler';
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
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { startOfYear } from 'date-fns';
import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { HandicappedDependentService } from '../handicapped-dependent.service';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-declaration-and-actual',
  templateUrl: './declaration-and-actual.component.html',
  styleUrls: ['./declaration-and-actual.component.scss']
})
export class DeclarationAndActualComponent implements OnInit {
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
  // public physicallyHandicappedDetail;
  public currentEmployerHandicappedDependentList: Array<any> = [];
  public previousEmployerHandicappedDependentList: Array<any> = [];
  public currentEmployerHandicappedDependentResponseList: Array<any> = [];
  public previousEmployerHandicappedDependentResponseList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public documentInformationResponseList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public remainingFamilyMemberName: Array<any> = [];

  viewDocumentName: any;
  viewDocumentType: any;

  public handicappedDependentForm: FormGroup;
  public currentEmployerForm: FormGroup;
  public previousEmployerForm: FormGroup;

  public editTransactionUpload: Array<any> = [];
  public editProofSubmissionId: any;
  public editReceiptAmount: string;

  documentDataArray = [];

  documentArray: any[] =[];

  documentPassword =[];
  remarkList =[];
  editdocumentPassword =[];
  editremarkList =[];
  document3Password: any;
  remark3List: any;
  public editDocumentByPSID: Array<any> = [];
  public updateReceiptAmount: any;
  public editTransactionData = [];


  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  public remarkCount : any;
  selectedremarkIndex : any;
  currentJoiningDate: Date;


  
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
  public disableOnView = false;
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
  public visibilityFlagPrivious : boolean = true;
  public visibilityFlagCurrent : boolean =  true;
  public disabilityType : string;
  public severity : string;
  public hideShowSaveButton  : boolean = false;
  public proofSubmissionId: '';
  currentlyChecked= false;
  element: any;
  isChecked: boolean;
  isCheckedName: any;
  public createDateTime: any;
  public lastModifiedDateTime: any;
  public transactionStatus: any;
  public modalRef1: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private handicappedDependentService: HandicappedDependentService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    //  Handicapped current employer Form
    this.handicappedDependentForm = this.formBuilder.group({
      currentEmployerHandicappedDetails: new FormArray([]),
      priviousEmployerHandicappedDetails: new FormArray([])
    });
    // add default row to current employer table
    this.addCurrentEmployerRow();
    // add default row to previous employer table
    this.addPreviousEmployerRow();

    // ----------------  Handicapped FormTransaction Form -----------------
    // this.handicappedDependentForm = this.formBuilder.group({
    //   actualAmount: new FormControl(null, Validators.required),
    //   handicappedDependentDetailMasterId: new FormControl(0),
    //   previousEmployerId: new FormControl(0),
    //   });

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
    this.getMasterFamilyInfo ();
    debugger
  
    console.log(this.data);
    if (this.data === undefined || this.data === null) {
      this.declarationPage();
    } else {
      const input = this.data;
      this.globalInstitution = input.institution;
      this.globalPolicy = input.policyNo;
      // this.getInstitutionListWithPolicyNo();
      if(this.data.canView == true){
        this.disableOnView = true;
        
            } else {
              this.disableOnView = false;
            }
      this.getTransactionFilterData(input.institution, input.policyNo, 'All');
    }

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    this.deactiveCopytoActualDate();
    this.getpreviousEmployeName();
  this.previousEmployerName();
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
    return this.handicappedDependentForm.controls;
  }

   // convenience getters for easy access to form fields
   get currEmpform() {
    return this.handicappedDependentForm.controls;
  }

  get currEmpFormArray() {
    return this.currEmpform.currentEmployerHandicappedDetails as FormArray;
  }



  get priviousEmpFormArray() {
    return this.currEmpform.priviousEmployerHandicappedDetails as FormArray;
  }

  addCurrentEmployerRow() {
    this.currEmpFormArray.push(
      this.formBuilder.group({
        checkboxx: [false],
        familyMemberName: [''],
        // familyMemberInfoId: [null, Validators.required],
        familyMemberInfoId: [''],
        severity: [null],
        disabilityType: [null],
        // actualAmount: [{value:null, disabled: true}],
        // declaredAmount: [{value:null, disabled: true}],
        accepted: [{value:null, disabled: true}],
        rejected: [{value:null, disabled: true}],
        handicappedDependentDetailMasterId: [null],
        limit: [null],
        proofSubmissionId: [null],
        transactionStatus: ['Pending'],
        relationship: [null],
        isClaiming80U: [null],
        employeeMasterId: [null]
      })
    );
  }
  deleteRows(index) {
    this.currEmpFormArray.removeAt(index);
      }

  addPreviousEmployerRow() {
    this.priviousEmpFormArray.push(
      this.formBuilder.group({
        checkbox1: [false],
        previousEmployerId:  [null],
        // previousEmployerId:  [null, Validators.required],
        familyMemberName: [null],
        familyMemberInfoId: [null],
        // familyMemberInfoId: [null, Validators.required],
        severity: [null],
        disabilityType: [null],
        actualAmount: [null],
        // declaredAmount: [null],
        accepted: [{value:null, disabled: true}],
        rejected: [{value:null, disabled: true}],
        handicappedDependentDetailMasterId: [null],
        limit: [null],
        proofSubmissionId: [null],
        transactionStatus: ['Pending'],
        relationship: [null],
        isClaiming80U: [null],
        employeeMasterId: [null]
      })
    );
  }

  deletePreviousEmployerRow(index) {
    this.priviousEmpFormArray.removeAt(index);
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
      this.handicappedDependentForm
        .get('declaredAmount')
        .setValue(formatedDeclaredAmount);
      this.handicappedDependentForm
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

    console.log(
      'handicappedDependentForm::',
      this.handicappedDependentForm
    );
    // console.log("formData::", formData);

    if (this.handicappedDependentForm.invalid) {
      this.alertService.sweetalertError('Please attach Receipt11111 / Certificate.');
      return;
    }


    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError('Please attach Receipt / Certificate.');
      return;
    }

    //else {
    const transactionDetail = this.handicappedDependentForm.getRawValue();

    // transactionDetail.declaredAmount = transactionDetail.declaredAmount
    //   .toString()
    //   .replace(/,/g, '');
    transactionDetail.actualAmount = transactionDetail.actualAmount
      .toString()
      .replace(/,/g, '');

    // const data = {
    //   physicallyHandicappedDetail: transactionDetail,
    //   previousEmployerHandicappedDependentResponseList: this.previousEmployerHandicappedDependentResponseList,
    //   transactionIds: [],
    // };

    const data = {
      currentEmployerHandicappedDependentResponseList: this.currentEmployerHandicappedDependentResponseList,
      previousEmployerHandicappedDependentResponseList: this.previousEmployerHandicappedDependentResponseList,
      // transactionIds: this.uploadGridData,
    };

    console.log('Handicapped Dependent  Data::', data);

    this.handicappedDependentService
      .uploadHandicappedTransactionwithDocument(this.filesArray,data)
      .subscribe((res) => {
        console.log('saveTransaction res::', res);
        if (res) {
          if (res.data.results.length > 0) {
            this.currentEmployerHandicappedDependentResponseList =
            res.data.results[0].currentEmployerHandicappedDependentResponseList;
            this.previousEmployerHandicappedDependentResponseList =
              res.data.results[0].previousEmployerHandicappedDependentResponseList;
            // this.documentInformationResponseList = res.data.results[0].documentInformation;
            this.documentInformationResponseList = res.data.results[0].documentInformationList;
            this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            this.grandActualTotal = res.data.results[0].grandActualTotal;
            this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

            this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
              element.declaredAmount = this.numberFormat.transform(
                element.declaredAmount
              );
              element.actualAmount = this.numberFormat.transform(
                element.actualAmount
              );
            });

            this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
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
    this.handicappedDependentForm.reset();
    this.filesArray = [];
    this.submitted = false;
    this.receiptAmount = '0.00';
    this.globalSelectedAmount = '0.00';
    //}
  }

  //Get previous Employer Name List
  previousEmployerName() {
    this.Service.getpreviousEmployeName().subscribe((res) => {
      debugger
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

  //Get Family Name List
  getMasterFamilyInfo() {
    this.handicappedDependentService.getFamilyInfoList().subscribe((res) => {
      console.log('getFamilyInfo', res);
      this.familyMemberGroup = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberInfoId,
        };
        if (element.relation !== 'Self') {
          this.remainingFamilyMemberName.push(obj);
          this.familyMemberName.push(obj);
        }
        console.log("remainingFamilyMemberName",this.remainingFamilyMemberName);
        console.log("familyMemberName",this.familyMemberName);
        // this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
        //   // remove saved family member from dropdown
        //   const index = this.familyMemberName.findIndex(item => item.label == element.handicappedDependentDetailMaster.familyMemberName)
        //   if (index > -1) {
        //     this.familyMemberName.splice(index, 1);
        //   }
        // });

        // this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
        //   // remove saved family member from dropdown
        //   const index = this.familyMemberName.findIndex(item => item.label == element.handicappedDependentDetailMaster.familyMemberName)
        //   if (index > -1) {
        //     this.familyMemberName.splice(index, 1);
        //   }
        // });

      });
    });
  }

    OnSelectionfamilyMemberGroup(formArrayElement, event) {

      if (event.target.value !== '0: null') {
        // get the matching element
        const matchedElement = this.familyMemberGroup.find(
          (element) => element.familyMemberInfoId == event.target.value
        );
        // bind the matching element values to form controls
        formArrayElement.patchValue({
          familyMemberInfoId: matchedElement.familyMemberInfoId,
          familyMemberName: matchedElement.familyMemberName,
          severity: matchedElement.severity,
          disabilityType: matchedElement.disabilityType,
          // declaredAmount: matchedElement.declaredAmount,
          // actualAmount: matchedElement.actualAmount,
          accepted: matchedElement.accepted,
          rejected: matchedElement.rejected,
          handicappedDependentDetailMasterId: matchedElement.handicappedDependentDetailMasterId,
          // limit: matchedElement.limit,
          proofSubmissionId: matchedElement.proofSubmissionId,
          relationship: matchedElement.relationship,
          isClaiming80U: matchedElement.isClaiming80U,
          employeeMasterId: matchedElement.employeeMasterId
        });
      } else {
        formArrayElement.reset();
      }
    }

    OnSelectionPreviousfamilyMemberGroup(formArrayElement, event) {
      if (event.target.value !== '0: null') {
        // get the matching element
        const matchedElement = this.familyMemberGroup.find(
          (element) => element.familyMemberInfoId == event.target.value
        );
        // bind the matching element values to form controls
        formArrayElement.patchValue({
          familyMemberInfoId: matchedElement.familyMemberInfoId,
          familyMemberName: matchedElement.familyMemberName,
          severity: matchedElement.severity,
          disabilityType: matchedElement.disabilityType,
          // declaredAmount: matchedElement.declaredAmount,
          // actualAmount: matchedElement.actualAmount,
          accepted: matchedElement.accepted,
          rejected: matchedElement.rejected,
          handicappedDependentDetailMasterId: matchedElement.handicappedDependentDetailMasterId,
          // limit: matchedElement.limit,
          proofSubmissionId: matchedElement.proofSubmissionId,
          relationship: matchedElement.relationship,
          isClaiming80U: matchedElement.isClaiming80U,
          employeeMasterId: matchedElement.employeeMasterId
        });
      } else {
        formArrayElement.reset();
      }
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

    this.handicappedDependentService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      // .subscribe((res) => {

      //   console.log('edit Data:: ', res);

      //   this.urlArray =
      //     res.data.results[0].documentInformationList[0].documentInformationResponseList;
      //   this.urlArray.forEach((element) => {
      //     // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
      //     element.blobURI = 'data:image/image;base64,' + element.blobURI;
      //     // new Blob([element.blobURI], { type: 'application/octet-stream' });
      //   });

      //   this.editTransactionUpload =
      //     res.data.results[0].previousEmployerHandicappedDependentResponseList;
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
        debugger
        this.editTransactionData = res.data.results[0].currentEmployerHandicappedDependentResponseList;
        console.log('edit Data:: ', res);
        this.urlArray =
          res.data.results[0].documentInformationList[0].documentInformationResponseList;
        this.editTransactionUpload =
          res.data.results[0].previousEmployerHandicappedDependentResponseList;
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
        //console.log('converted:: ', this.urlArray);
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
    });
    // delete this.editTransactionUpload[0].proofSubmissionDetailId;
    
    // const data = this.currentEmployerHandicappedDependentResponseList.getRawValue();
    const data = {
      currentEmployerHandicappedDependentResponseList: this.editTransactionUpload[0],
      // transactionIds: this.uploadGridData,
      //documentRemark: this.documentRemark,
      proofSubmissionId: this.editProofSubmissionId,
      receiptAmount: this.editReceiptAmount,
    };
    console.log('uploadUpdateTransaction data::', data);

    this.handicappedDependentService
      .uploadHandicappedTransactionwithDocument(this.filesArray,data)
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
          this.currentEmployerHandicappedDependentResponseList =
          res.data.results[0].currentEmployerHandicappedDependentResponseList;
          this.previousEmployerHandicappedDependentResponseList =
              res.data.results[0].previousEmployerHandicappedDependentResponseList;
            this.documentInformationResponseList = res.data.results[0].documentInformationList;
            this.grandDeclarationTotal =
              res.data.results[0].grandDeclarationTotal;
            this.grandActualTotal = res.data.results[0].grandActualTotal;
            this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;

            this.initialArrayIndex = [];
              this.initialArrayIndex.push(this.previousEmployerHandicappedDependentResponseList.length);

              this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
                  element.declaredAmount = this.numberFormat.transform(
                    element.declaredAmount
                  );
                  element.actualAmount = this.numberFormat.transform(
                    element.actualAmount
                  );
              });

              this.previousEmployerHandicappedDependentResponseList.forEach((item) => {
                  item.declaredAmount = this.numberFormat.transform(
                    item.declaredAmount
                  );
                  item.actualAmount = this.numberFormat.transform(
                    item.actualAmount
                  );
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
        this.grandRejectedTotalEditModal =
          0;
        this.grandApprovedTotalEditModal = 0;
        this.editProofSubmissionId = null;
        this.editReceiptAmount = null;
  }
  // Get API call for All previous employee Names
  getpreviousEmployeName() {
    this.Service.getpreviousEmployeName().subscribe((res) => {
      // console.log('previousEmployeeList::', res);
      // if (!res.data.results[0]) {
      //   return;
      // }
      // res.data.results.forEach((element) => {
      //   const obj = {
      //     label: element.name,
      //     value: element.previousEmployerId,
      //   };
      //   this.previousEmployeeList.push(obj);
      // });
      // console.log('previousEmployeeList 2::', this.previousEmployeeList);
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

  updatePreviousEmpId(formArrayElement, event: any) {
    if (event.target.value !== '0: null') {
      formArrayElement.patchValue({
        previousEmployerId: event.target.value
      });
    } else {
      formArrayElement.patchValue({
        previousEmployerId: null
      });
    }
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
    this.previousEmployerName ();


  }

  // --------- On institution selection show all transactions list accordingly all policies--------
  selectedTransactionInstName(institutionName: any) {
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
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy,
      null
    );
  }

  // ------- On Transaction Status selection show all transactions list accordingly all policies------
  selectedTransactionStatus(transactionStatus: any) {
    this.getTransactionFilterData(
      this.globalInstitution,
      this.globalPolicy,
      transactionStatus
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
  onEmployerCheckboxSelect(formArrayElement, handicappedDependentDetailMasterId, event) {
    if (handicappedDependentDetailMasterId > 0 && handicappedDependentDetailMasterId  != undefined && handicappedDependentDetailMasterId != null) {
      if (event.target.checked) {
        this.uploadGridData.push(handicappedDependentDetailMasterId);
        formArrayElement.patchValue({});
      } else {
        const index = this.uploadGridData.indexOf(
          handicappedDependentDetailMasterId
        );
        this.uploadGridData.splice(index, 1);
      }
      if (this.uploadGridData.length) {
        this.enableFileUpload = true;
      }
    }
  }

  // -------- ON select to check input boxex--------
  public onSelectCheckBoxPrevious(
    data: any,
    event: { target: { checked: any } },
    i: number,
    j: number
  ) {
    const checked = event.target.checked;
    this.hideShowSaveButton = checked;
    const formatedGlobalSelectedValue = Number(
      this.globalSelectedAmount == '0'
        ? this.globalSelectedAmount
        : this.globalSelectedAmount.toString().replace(/,/g, '')
    );

    let formatedActualAmount: number = 0;
    let formatedSelectedAmount: string;
    if (checked) {
      this.currentEmployerHandicappedDependentResponseList[i].actualAmount =  data.actualAmount;

      formatedActualAmount = Number(
        this.currentEmployerHandicappedDependentResponseList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue + formatedActualAmount
      );
      this.uploadGridData.push(data.handicappedDependentTransactionId);
    } else {
      formatedActualAmount = Number(
        this.currentEmployerHandicappedDependentResponseList[i].actualAmount
          .toString()
          .replace(/,/g, '')
      );
      this.currentEmployerHandicappedDependentResponseList[i].actualAmount = this.numberFormat.transform(0);
      formatedSelectedAmount = this.numberFormat.transform(
        formatedGlobalSelectedValue - formatedActualAmount
      );
      const index = this.uploadGridData.indexOf(
        data.handicappedDependentTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }

    this.globalSelectedAmount = formatedSelectedAmount;
    this.actualTotal = 0;
    this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
    });
    // this.previousEmployerHandicappedDependentResponseList.actualTotal = this.actualTotal;

    if (this.uploadGridData.length) {
      this.enableFileUpload = true;
    }
  }

    // -------- ON select to check input boxex--------
    public onSelectCheckBox(
      data: any,
      event: { target: { checked: any } },
      i: number,
      j: number
    ) {
      const checked = event.target.checked;



      let formatedActualAmount: number = 0;
      let formatedSelectedAmount: string;
      if (checked) {
        this.previousEmployerHandicappedDependentResponseList[i].actualAmount =  data.actualAmount;

        formatedActualAmount = Number(
          this.previousEmployerHandicappedDependentResponseList[i].actualAmount
            .toString()
            .replace(/,/g, '')
        );

        this.uploadGridData.push(data.handicappedDependentDetailMasterId);
      } else {
        formatedActualAmount = Number(
          this.previousEmployerHandicappedDependentResponseList[i].actualAmount
            .toString()
            .replace(/,/g, '')
        );
        this.previousEmployerHandicappedDependentResponseList[i].actualAmount = this.numberFormat.transform(0);

        const index = this.uploadGridData.indexOf(
          data.handicappedDependentDetailMasterId
        );
        this.uploadGridData.splice(index, 1);
      }

      this.globalSelectedAmount = formatedSelectedAmount;
      this.actualTotal = 0;
      this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
        // console.log(element.actualAmount.toString().replace(',', ""));
        this.actualTotal += Number(
          element.actualAmount.toString().replace(/,/g, '')
        );
      });
      // this.previousEmployerHandicappedDependentResponseList.actualTotal = this.actualTotal;

      if (this.uploadGridData.length) {
        this.enableFileUpload = true;
      }
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
        item.group2TransactionList.forEach((element) => {
          this.uploadGridData.push(element.handicappedDependentTransactionId);
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

    this.currentEmployerHandicappedDependentResponseList[
      i
    ].declaredAmount = this.declarationService.declaredAmount;
    const formatedDeclaredAmount = this.numberFormat.transform(
      this.currentEmployerHandicappedDependentResponseList[i].declaredAmount
    );
    // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
    this.currentEmployerHandicappedDependentResponseList[
      i
    ].declaredAmount = formatedDeclaredAmount;

    this.declarationTotal = 0;
    // this.declaredAmount=0;

    this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
      // console.log(element.declaredAmount.toString().replace(',', ""));
      this.declarationTotal += Number(
        element.declaredAmount.toString().replace(/,/g, '')
      );
      // console.log(this.declarationTotal);
      // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
    });

    this.declarationTotal = this.declarationTotal;
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
    this.transactionDetail[j].group2TransactionList[i].dueDate =
      summary.dueDate;
  }

  onEmployerActualAmountChange(formArrayElement, event) {
    formArrayElement.patchValue({
      actualAmount: this.numberFormat.transform(event.target.value)
    });
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

    this.previousEmployerHandicappedDependentResponseList[i].actualAmount = this.declarationService.actualAmount;
    // console.log("Actual Amount changed::" , this.previousEmployerHandicappedDependentResponseList[i].actualAmount);
    const formatedActualAmount = this.numberFormat.transform(this.previousEmployerHandicappedDependentResponseList[i].actualAmount);
    // console.log(`formatedActualAmount::`,formatedActualAmount);
    this.previousEmployerHandicappedDependentResponseList[i].actualAmount = formatedActualAmount;

    if (
      this.previousEmployerHandicappedDependentResponseList[i].actualAmount !==
        Number(0) ||
      this.previousEmployerHandicappedDependentResponseList[i].actualAmount !== null
    ) {
      // console.log(`in if::`,this.previousEmployerHandicappedDependentResponseList[i].actualAmount);
      this.isDisabled = false;
    } else {
      // console.log(`in else::`,this.previousEmployerHandicappedDependentResponseList[i].actualAmount);
      this.isDisabled = true;
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
      // console.log(element.actualAmount.toString().replace(',', ""));
      this.actualTotal += Number(
        element.actualAmount.toString().replace(/,/g, '')
      );
      // console.log(this.actualTotal);
      // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
    });

  }

  // --------Add New ROw Function---------
  // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
  //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
  addRowInList(
    summarynew: {
      handicappedDependentDetailMasterId: number;
      employeeMasterId: number;
      previousEmployerId: number;
      declaredAmount: any;
      // accountNumber: number;
      actualAmount: any;
      institution: number;
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
    this.declarationService.handicappedDependentDetailMaster.handicappedDependentDetailMasterId = this.globalAddRowIndex;
    this.declarationService.declaredAmount = null;
    this.declarationService.actualAmount = null;
    this.declarationService.transactionStatus = 'Pending';
    // this.declarationService.handicappedDependentDetailMaster.amountRejected = 0.0;
    // this.declarationService.handicappedDependentDetailMaster.amountApproved = 0.0;
    this.declarationService.handicappedDependentDetailMaster.handicappedDependentDetailMasterId = 0;
    this.declarationService.handicappedDependentDetailMaster.familyMemberName= null;
    this.declarationService.handicappedDependentDetailMaster.severity = null;
    this.declarationService.handicappedDependentDetailMaster.disabilityType = null;
    this.previousEmployerHandicappedDependentResponseList.push(this.declarationService);
    console.log('addRow::', this.previousEmployerHandicappedDependentResponseList);
  }

    // --------Add New ROw Function---------
    addRowInListIncurrentEmp(
      summarynew: {
        handicappedDependentDetailMasterId: number;
        employeeMasterId: number;
        previousEmployerId: number;
        declaredAmount: any;
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
      this.declarationService.handicappedDependentDetailMaster.handicappedDependentDetailMasterId = this.globalAddRowIndex;
      this.declarationService.declaredAmount = null;
      this.declarationService.actualAmount = null;
      this.declarationService.transactionStatus = 'Pending';
      // this.declarationService.handicappedDependentDetailMaster.amountRejected = 0.0;
      // this.declarationService.handicappedDependentDetailMaster.amountApproved = 0.0;
      this.declarationService.handicappedDependentDetailMaster.handicappedDependentDetailMasterId = 0;
      this.declarationService.handicappedDependentDetailMaster.familyMemberName = null;
      this.declarationService.handicappedDependentDetailMaster.severity = null;
      this.declarationService.handicappedDependentDetailMaster.disabilityType = null;
      console.log('before add Row::', this.currentEmployerHandicappedDependentResponseList);
      this.currentEmployerHandicappedDependentResponseList.push(this.declarationService);
      console.log('addedRow::', this.currentEmployerHandicappedDependentResponseList);
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // deleteRows(index){
  //   // const index = this.currentEmployerHandicappedDependentResponseList.indexOf(i);
  //   // this.currentEmployerHandicappedDependentResponseList.splice(index, 1);
  //   console.log(this.currentEmployerHandicappedDependentResponseList);
  //   this.currentEmployerHandicappedDependentResponseList.splice(index, 1);
  //   console.log(this.currentEmployerHandicappedDependentResponseList);
  // }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount = this.currentEmployerHandicappedDependentResponseList.length - 1;
    console.log('rowcount::', rowCount);
    console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.currentEmployerHandicappedDependentResponseList.length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.currentEmployerHandicappedDependentResponseList.splice(rowCount, 1);
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
      this.transactionDetail[j].group2TransactionList[i].actualAmount;
    this.transactionDetail[j].group2TransactionList[
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
    this.transactionDetail[j].group2TransactionList.push(
      this.declarationService
    );
    this.declarationService = new DeclarationService();
  }

  submitDeclaration() {
    // this.tabIndex = 0;
    console.log(this.transactionDetail);
    this.tabIndex = 0;
    // this.transactionDetail.forEach((element) => {
    //   element.group2TransactionList.forEach((element) => {
    //     element.dateOfPayment = this.datePipe.transform(
    //       element.dateOfPayment,
    //       'yyyy-MM-dd'
    //     );
    //   });
    // });
    const data = this.transactionDetail;
    this.handicappedDependentService.postHandicappedTransaction(data).subscribe((res) => {
      console.log(res);
      // this.transactionDetail =
      //   res.data.results[0].currentEmployerHandicappedDependentList;
      this.currentEmployerHandicappedDependentResponseList = res.data.results[0].currentEmployerHandicappedDependentResponseList;
      this.previousEmployerHandicappedDependentResponseList = res.data.results[0].previousEmployerHandicappedDependentResponseList;
        this.documentInformationResponseList = res.data.results[0].documentInformationList;
      this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      this.grandActualTotal = res.data.results[0].grandActualTotal;
      this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      this.transactionDetail.forEach((element) => {
        element.group2TransactionList.forEach((element) => {
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

  onSelectCurrentEmp(element, event: { target: { checked: any } }, handicappedDependentTransactionId)
  {
    // debugger
    // if ( this.currentlyChecked == handicappedDependentTransactionId ) {
    // this.currentlyChecked = CheckBoxType.NONE;
    // }
    const checked = event.target.checked;
   
    this.declarationService.handicappedDependentTransactionId = 0;
        this.declarationService.declaredAmount = this.unformatAmount(element.declaredAmount);
        this.declarationService.actualAmount = this.unformatAmount(element.actualAmount);
        this.declarationService.transactionStatus = 'Pending';
        this.declarationService.handicappedDependentDetailMaster.familyMemberInfoId = element.handicappedDependentDetailMaster.familyMemberInfoId;
        this.declarationService.handicappedDependentDetailMaster.familyMemberName = element.handicappedDependentDetailMaster.familyMemberName;
        this.declarationService.handicappedDependentDetailMaster.disabilityType = element.handicappedDependentDetailMaster.disabilityType;
        this.declarationService.handicappedDependentDetailMaster.severity = element.handicappedDependentDetailMaster.severity;
        // this.declarationService.handicappedDependentDetailMaster.amountRejected = 0.0;
        // this.declarationService.handicappedDependentDetailMaster.amountApproved = 0.0;
        this.declarationService.handicappedDependentDetailMaster.proofSubmissionId = element.proofSubmissionId;
        this.declarationService.handicappedDependentDetailMaster.relationship = element.handicappedDependentDetailMaster.relationship;
        // this.declarationService.handicappedDependentDetailMaster.isClaiming80U = element.isClaiming80U;
        this.declarationService.handicappedDependentDetailMaster.employeeMasterId = element.employeeMasterId;
        this.declarationService.handicappedDependentDetailMaster.handicappedDependentDetailMasterId = element.handicappedDependentDetailMasterId;
        this.currentEmployerHandicappedDependentList.push(this.declarationService);

        const parentsDelete = this.currentEmployerHandicappedDependentList[0].handicappedDependentDetailMaster;
        delete parentsDelete.documentInformationList;

    if (checked) {

      this.uploadGridData.push(element.handicappedDependentTransactionId);
      console.log("this.uploadGridData",this.uploadGridData)
    } else {
       const index = this.uploadGridData.indexOf(
        element.handicappedDependentTransactionId
      );
      this.uploadGridData.splice(index, 1);
    }
}

// unformatAmount(amount) {
//   if (amount !== null && amount != undefined) {
//     amount = amount.toString().replace(/,/g, '');
//   } else {
//     amount = 0.0;
//   }
//   return amount;
// }

 //----------- On change Transactional Line Item Remark --------------------------
 public onChangeDocumentRemark(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
  this.editRemarkData =  event.target.value;

 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[0].groupTransactionList[transIndex].remark =  event.target.value;


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
  console.log('proofSubmissionId::', proofSubmissionId);

  this.modalRef1 = this.modalService.show(
    template2,
    Object.assign({}, { class: 'gray modal-xl' })
  );

  this.handicappedDependentService
    .getTransactionByProofSubmissionId(proofSubmissionId)
    .subscribe((res) => {
      console.log('edit Data:: ', res);
      this.editTransactionData = res.data.results[0].currentEmployerHandicappedDependentResponseList;
      // console.log('test', res.data.results[0].documentInformationList[0].receiptAmount);

      // this.updateReceiptAmount = res.data.results[0].documentInformationList[0].receiptAmount;
      // this.editDocumentByPSID = res.data.results[0].documentInformationList;
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
      
        
      this.urlArray =
        res.data.results[0].documentInformationList[0].documentDetailList;
      this.editTransactionUpload =
        res.data.results[0].documentInformationList;
      // this.editProofSubmissionId = res.data.results[0].electricVehicleLoanTransactionDetailList[0].proofSubmissionId;
      this.editProofSubmissionId = proofSubmissionId;

      if(res?.data?.results[0]?.currentEmployerHandicappedDependentResponseList.length) {
      this.createDateTime = res?.data?.results[0]?.currentEmployerHandicappedDependentResponseList[0]?.createDateTime;
      this.lastModifiedDateTime = res?.data?.results[0]?.currentEmployerHandicappedDependentResponseList[0]?.lastModifiedDateTime;
      this.transactionStatus = res?.data?.results[0]?.currentEmployerHandicappedDependentResponseList[0]?.transactionStatus;
      }    
if(res?.data?.results[0]?.previousEmployerHandicappedDependentResponseList[0].length) {
      this.createDateTime = res?.data?.results[0]?.previousEmployerHandicappedDependentResponseList[0]?.createDateTime;
      this.lastModifiedDateTime = res?.data?.results[0]?.previousEmployerHandicappedDependentResponseList[0]?.lastModifiedDateTime;
      this.transactionStatus = res?.data?.results[0]?.previousEmployerHandicappedDependentResponseList[0]?.transactionStatus;
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
    this.documentArray = [];
}

 //----------- On change Transactional Line Item Remark --------------------------
 public onChangeDocumentRemark1(transactionDetail, transIndex, event) {
  console.log('event.target.value::', event.target.value);
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[0].groupTransactionList[transIndex].remark =  event.target.value;
 

}


  upload() {

    for (let i = 0; i < this.filesArray.length; i++) {
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
    this.submitted = true;
    // stop here if form is invalid
    // if (this.handicappedDependentForm.invalid) {
    //   return;
    // }


    console.log(this.currentEmployerHandicappedDependentList);
    if(this.priviousEmpFormArray.invalid){
    // this.visibilityFlagPrivious =  false;
      return;
    }

    if(this.currEmpFormArray.invalid){

    //  this.visibilityFlagCurrent = false;
      return;
    }

    if (this.filesArray.length === 0) {
      this.alertService.sweetalertError(
        'Please attach Premium Receipt / Premium Statement.'
      );
      return;
    }

    this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
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
    });


    const handicappedDependentFormValues = this.handicappedDependentForm.getRawValue();


    if (handicappedDependentFormValues.priviousEmployerHandicappedDetails.length > 0) {
      handicappedDependentFormValues.priviousEmployerHandicappedDetails.forEach(element => {
        this.declarationService = new DeclarationService();
        this.declarationService.previousEmployerId = element.previousEmployerId;
        this.declarationService.handicappedDependentTransactionId = 0;
        this.declarationService.declaredAmount =  this.unformatAmount(element.actualAmount);
        this.declarationService.actualAmount = this.unformatAmount(element.actualAmount);
        this.declarationService.transactionStatus = 'Pending';
        this.declarationService.handicappedDependentDetailMaster.familyMemberInfoId = element.familyMemberInfoId;
        this.declarationService.handicappedDependentDetailMaster.familyMemberName = element.familyMemberName;
        this.declarationService.handicappedDependentDetailMaster.disabilityType = element.disabilityType;
        this.declarationService.handicappedDependentDetailMaster.severity = element.severity;
        // this.declarationService.handicappedDependentDetailMaster.amountRejected = 0.0;
        // this.declarationService.handicappedDependentDetailMaster.amountApproved = 0.0;
        this.declarationService.handicappedDependentDetailMaster.proofSubmissionId = element.proofSubmissionId;
        // this.declarationService.handicappedDependentDetailMaster.limit = element.limit;
        this.declarationService.handicappedDependentDetailMaster.relationship = element.relationship;
        this.declarationService.handicappedDependentDetailMaster.isClaiming80U = element.isClaiming80U;
        this.declarationService.handicappedDependentDetailMaster.employeeMasterId = element.employeeMasterId;
        this.declarationService.handicappedDependentDetailMaster.handicappedDependentDetailMasterId = element.handicappedDependentDetailMasterId;
        this.previousEmployerHandicappedDependentList.push(this.declarationService);

      });

      this.previousEmployerHandicappedDependentList.forEach(element =>{
        this.uploadGridData.push(element.handicappedDependentTransactionId)
      });

      
  for (let i = 0; i < this.previousEmployerHandicappedDependentList.length; i++) {
    const parentsDelete = this.previousEmployerHandicappedDependentList[i].handicappedDependentDetailMaster;
      delete parentsDelete.documentInformationList;
  }



      // const parentsDelete = this.previousEmployerHandicappedDependentList[0].handicappedDependentDetailMaster;
      // delete parentsDelete.documentInformationList;

    }


    // previousEmployerHandicappedDependentList : this.previousEmployerHandicappedDependentList,

debugger
    // this.receiptAmount = this.receiptAmount.toString().replace(/,/g, '');
    // delete this.currentEmployerHandicappedDependentResponseList[0].totalRejectedAmount;
  for(let i = 0; i< this.currentEmployerHandicappedDependentResponseList.length; i++){
    delete this.currentEmployerHandicappedDependentResponseList[i].proofSubmissionDetailId;
    delete this.currentEmployerHandicappedDependentResponseList[i].familyMemberName;
    delete this.currentEmployerHandicappedDependentResponseList[i].severity;
    delete this.currentEmployerHandicappedDependentResponseList[i].dateOfSubmission;
    delete this.currentEmployerHandicappedDependentResponseList[i].handicappedDependentDetailMasterId;
    delete this.currentEmployerHandicappedDependentResponseList[i].handicappeddependentTransactionList;
    delete this.currentEmployerHandicappedDependentResponseList[i].declaredTotal;
    
    delete this.currentEmployerHandicappedDependentResponseList[i].actualTotal;
    delete this.currentEmployerHandicappedDependentResponseList[i].totalApprovedAmount;
    delete this.currentEmployerHandicappedDependentResponseList[i].totalRejectedAmount;
    
  }
    const data = {
      currentEmployerHandicappedDependentList: this.currentEmployerHandicappedDependentResponseList,
     previousEmployerHandicappedDependentList : this.previousEmployerHandicappedDependentList,
      //  previousEmployerHandicappedDependentList : this.previousEmployerHandicappedDependentResponseList,
      transactionIds: this.uploadGridData,
      // receiptAmount: this.receiptAmount,
      documentRemark: this.documentRemark,
      proofSubmissionId: '',
      remarkPasswordList: this.documentDataArray
    };

    // this.fileService.uploadSingleFile(this.currentFileUpload, data)
    // .pipe(tap(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //         this.loaded = Math.round(100 * event.loaded / event.total);
    //     }
    // }))
    this.handicappedDependentService
      .uploadHandicappedTransactionwithDocument(this.filesArray,data)
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
          this.currentEmployerHandicappedDependentResponseList =
          res.data.results[0].currentEmployerHandicappedDependentResponseList;
          this.previousEmployerHandicappedDependentResponseList =
              res.data.results[0].previousEmployerHandicappedDependentResponseList;
            this.documentInformationResponseList = res.data.results[0].documentInformationList;
          this.transactionDetail.forEach((element) => {
            element.group2TransactionList.forEach((innerElement) => {
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
              // this.masterGridData.forEach((element, index) => {
              //   this.documentArray.push({

              //     'dateofsubmission':new Date(),
              //     'documentType':element.documentInformationList[0].documentType,
              //     'documentName': element.documentInformationList[0].fileName,
              //     'documentPassword':element.documentInformationList[0].documentPassword,
              //     'documentRemark':element.documentInformationList[0].documentRemark,
              //     'status' : element.documentInformationList[0].status,
              //     'approverName' : element.documentInformationList[0].lastModifiedBy,
              //     'Time' : element.documentInformationList[0].lastModifiedTime,

              //     // 'documentStatus' : this.premiumFileStatus,

              //   });

              //   if(element.documentInformationList[1]) {
              //     this.documentArray.push({

              //       'dateofsubmission':new Date(),
              //       'documentType':element.documentInformationList[1].documentType,
              //       'documentName': element.documentInformationList[1].fileName,
              //       'documentPassword':element.documentInformationList[1].documentPassword,
              //       'documentRemark':element.documentInformationList[1].documentRemark,
              //       'status' : element.documentInformationList[1].status,
              //       'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
              //       'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

              //       // 'documentStatus' : this.premiumFileStatus,

              //     });
              //   }
              // });
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
      this.ngOnInit();
    this.receiptAmount = '0.00';
    this.filesArray = [];
    this.documentPassword = [];
    this.remarkList = [];
    this.globalSelectedAmount = '0.00';
    this.documentDataArray = [];
    this.priviousEmpFormArray.reset();
    this.currEmpFormArray.reset();
    }

  unformatAmount(amount) {
    if (amount !== null && amount != undefined) {
      amount = amount.toString().replace(/,/g, '');
    } else {
      amount = 0.0;
    }
    return amount;
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
      'Receipt Amount should be equal or greater than Actual Amount of Selected lines.',
    );
  } else if (receiptAmount_ > globalSelectedAmount_) {
    console.log(receiptAmount_);
    console.log(globalSelectedAmount_);
    this.alertService.sweetalertWarning(
      'Receipt Amount is greater than Selected line Actual Amount.',
    );
  }
    this.receiptAmount= this.numberFormat.transform(this.receiptAmount);
  }

  // Update Previous Employee in Edit Modal
  updatePreviousEmpIdInEditCase(event: any, i: number, j: number) {
    console.log('select box value::', event.target.value);
    this.previousEmployerHandicappedDependentResponseList[i].previousEmployerId =
      event.target.value;
    console.log(
      'previous emp id::',
      this.previousEmployerHandicappedDependentResponseList[i].previousEmployerId
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
    this.editTransactionUpload[j].group2TransactionList[i].dueDate =
      summary.dueDate;
    console.log(
      'onDueDateChangeInEditCase::',
      this.editTransactionUpload[j].group2TransactionList[i].dueDate
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

    this.editTransactionUpload[j].group2TransactionList[
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
    this.editTransactionUpload[j].dateOfPayment =
      summary.dateOfPayment;
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

    this.previousEmployerHandicappedDependentResponseList[i].actualAmount = this.declarationService.actualAmount;
    console.log('Actual Amount changed::',this.editTransactionUpload[j].actualAmount);

    const formatedActualAmount = this.numberFormat.transform(
      this.editTransactionUpload[j].actualAmount
    );
    console.log(`formatedActualAmount::`, formatedActualAmount);

    this.previousEmployerHandicappedDependentResponseList[
      i
    ].actualAmount = formatedActualAmount;

    if ( this.editTransactionUpload[j].actualAmount !==
        Number(0) ||    this.editTransactionUpload[j].actualAmount !==null) {
      console.log( `in if::`,  this.editTransactionUpload[j].actualAmount);
    } else {
      console.log( `in else::`, this.previousEmployerHandicappedDependentResponseList[i].actualAmount
      );
    }

    this.actualTotal = 0;
    this.actualAmount = 0;
    this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
      console.log(element.actualAmount.toString().replace(/,/g, ''));
      this.actualTotal += Number( element.actualAmount.toString().replace(/,/g, '')  );
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
    this.proofSubmissionFileList = this.documentInformationResponseList[
      documentIndex
    ].documentInformationResponseList;
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


  // Common Function for filter to call API
  getTransactionFilterData(
    institution: String,
    policyNo: String,
    transactionStatus: String
  ) {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.handicappedDependentService.getTransactionFilterData().subscribe((res) => {
      console.log('getTransactionFilterData', res);
      if (res.data.results.length > 0) {
        this.currentEmployerHandicappedDependentResponseList = res.data.results[0].currentEmployerHandicappedDependentResponseList;
        this.previousEmployerHandicappedDependentResponseList = res.data.results[0].previousEmployerHandicappedDependentResponseList;
        // this.documentInformationResponseList = res.data.results[0].documentInformation;
        this.documentInformationResponseList = res.data.results[0].documentInformationList;


     
        console.log('documentArrayTest',this.documentArray);
        // this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        // this.grandActualTotal = res.data.results[0].grandActualTotal;
        // this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        // this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        // this.disability = res.data.results[0].disability;
        // this.severity = res.data.results[0].severity;
        // this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].group2TransactionList.length;

        this.initialArrayIndex = [];

        // format declared and actual amount in appropriate manner
        this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
          element.declaredAmount = this.numberFormat.transform(
            element.declaredAmount
          );
          element.actualAmount = this.numberFormat.transform(
            element.actualAmount
          );
        });
        this.currentEmployerHandicappedDependentResponseList.forEach((element) => {
          // remove saved family member from dropdown
          const index = this.remainingFamilyMemberName.findIndex(item => item.label == element.handicappedDependentDetailMaster.familyMemberName);
          if (index > -1) {
            this.remainingFamilyMemberName.splice(index, 1);
          }

        });

        this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
          // remove saved family member from dropdown
          const index = this.familyMemberName.findIndex(item => item.label == element.handicappedDependentDetailMaster.familyMemberName);
          if (index > -1) {
            this.familyMemberName.splice(index, 1);
          }
        });
// On Click Edit button
        // res.documentDetailList.forEach(element => {
        //   // if(element!=null)
        //   this.documentArray.push({
        //     'dateofsubmission':element.creatonTime,
        //     'documentType':element.documentType,
        //     'documentName': element.fileName,
        //     'documentPassword':element.documentPassword,
        //     'documentRemark':element.documentRemark,
        //     'status' : element.status,
        //     'lastModifiedBy' : element.lastModifiedBy,
        //     'lastModifiedTime' : element.lastModifiedTime,

        //   })
        // });
        // // format actual amount in appropriate manner
        this.previousEmployerHandicappedDependentResponseList.forEach((element) => {
          element.actualAmount = this.numberFormat.transform(
            element.actualAmount
          );
        });
      }
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
    });
  }
  onResetRemarkDetails() {
    this.enteredRemark = '';
  }

  onResetRemarkDetails1() {
    this.enteredRemark = '';
  }


  public docRemarkModal1(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    handicappedDependentTransactionId,
    element, count
  ) {
  
    this.summaryDetails = element;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.handicappedDependentService.getHandicappedDependentRemarkList(
      handicappedDependentTransactionId,
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

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    handicappedDependentTransactionId,
    summary, count
  ) {
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.handicappedDependentService.getHandicappedDependentRemarkList(
      handicappedDependentTransactionId,
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




  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": this.summaryDetails.handicappedDependentTransactionId,
      "masterId":0,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"VIA",
      "subSection":"80DD",
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
        this.previousEmployerHandicappedDependentResponseList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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






  onSaveRemarkDetails1(element, index){
    
    const data ={
      "transactionId": this.summaryDetails.handicappedDependentTransactionId,
      "masterId":0,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"VIA",
      "subSection":"80DD",
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
        this.currentEmployerHandicappedDependentResponseList[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
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

  downloadTransaction(proofSubmissionId) {
    console.log(proofSubmissionId);
    this.handicappedDependentService
      .getTransactionByProofSubmissionId(proofSubmissionId)
      .subscribe((res) => {
        debugger
        console.log('edit Data:: ', res);
        this.urlArray =
          // res.data.results[0].documentInformation[0].documentInformationResponseList;
          res.data.results[0].documentInformationList[0].documentInformationResponseList;
        this.urlArray.forEach((element) => {
          element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(
            element.blobURI
          );
        });
        console.log(this.urlArray);
      });
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

    docViewer(template3: TemplateRef<any>, documentInformationResponseList: any) {
      console.log("documentInformationResponseList::", documentInformationResponseList);
      this.urlArray = documentInformationResponseList;
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

  // setDateOfPayment(
  //   summary: {
  //     previousEmployerName: any;
  //     declaredAmount: number;
  //     dateOfPayment: Date;
  //     actualAmount: number;
  //     dueDate: any;
  //   },
  //   // i: number,
  //   j: number
  // ) {
  //   this.transactionDetail[j].dateOfPayment =
  //     summary.dateOfPayment;
  //   console.log(
  //     this.transactionDetail[j].dateOfPayment
  //   );
  // }
}

// class DeclarationService {
//   // public physicallyHandicappedDetailId = 0; Change  handicappedDependentDetailMasterId
//   public handicappedDependentDetailMasterId =  0;
//   public handicappedDependentTransactionId = 0;
//   public employeeMasterId: number;
//   public familyMemberInfoId: number;
//   public familyMemberName: string;
//   public previousEmployerId = 0;
//   // public institution: 0;
//   public isClaiming80U : 0;
//   public declaredAmount: number;
//   public actualAmount: number;
//   public transactionStatus: string = 'Pending';
//   public amountRejected: number;
//   public amountApproved: number;
//   public severity: string;
//   public disabilityType: string;
//   constructor(obj?: any) {
//     Object.assign(this, obj);
//   }
// }

class DeclarationService {
  public previousEmployerId = 0;
  public handicappedDependentTransactionId = 0;
  public declaredAmount: number;
  public actualAmount: number;
  public transactionStatus: string = 'Pending';
  public handicappedDependentDetailMaster = {
    handicappedDependentDetailMasterId: 0,
    employeeMasterId: 0,
    familyMemberInfoId: 0,
    familyMemberName: null,
    relationship: null,
    disabilityType: null,
    severity: null,
    // amountRejected: 0.0,
    // amountApproved: 0.0,
    proofSubmissionId: null,
    // limit: null,
    // documentRemark: null,
    documentInformationList: [],
    isClaiming80U: true
  };
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
