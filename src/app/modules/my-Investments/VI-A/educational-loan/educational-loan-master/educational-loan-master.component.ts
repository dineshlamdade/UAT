import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { EducationalLoanServiceService } from '../educational-loan-service.service';

@Component({
  selector: 'app-educational-loan-master',
  templateUrl: './educational-loan-master.component.html',
  styleUrls: ['./educational-loan-master.component.scss'],
})
export class EducationalLoanMasterComponent implements OnInit {
  @Input() public loanAccountNo: any;
  @Input() public: string;
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

  public familyMemberNameList: Array<any> = [];
  public disabilityTypeList: Array<any> = [];
  public severityLevelList: Array<any> = [];

  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
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

  public documentRemark: any;

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
public isshowHideFlag : boolean = true;
  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public disability: string;
  public severity: string;
  public loanAccountNumbers : any;
  public fullTimeCourse: boolean = true;
  public validloanAccountNumber : boolean = false;
  public proofSubmissionId;

  constructor(
    private formBuilder: FormBuilder,
    private myInvestmentsService: MyInvestmentsService,
    private educationalLoanServiceService: EducationalLoanServiceService,
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
    this.masterPage();
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
    this.initiateMasterForm();
    this.getFinacialYear();
    this.getMasterFamilyInfo();
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    // this.deactivateRemark();
    this.getPreviousEmployer();
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

    if (this.loanAccountNo != undefined || this.loanAccountNo != null) {
      const input = this.loanAccountNo;

      this.editMaster(input.loanAccountNumber);
      console.log('editMaster loanAccountNumber', input.loanAccountNumber);
    }
  }

  // initiate Reactive Master Form
  initiateMasterForm() {
    this.form = this.formBuilder.group({
      fullTimeCourse: new FormControl('true'),
      studentName: new FormControl(null, Validators.required),
      relationship: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      lenderName: new FormControl(null, Validators.required),
      loanAccountNumber: new FormControl(null, Validators.required),
      loanEndDate: new FormControl(null, Validators.required),
      educationalLoanMasterId: new FormControl(0),
      familyMemberInfoId: new FormControl(0),
      proofSubmissionId: new FormControl(''),
    });
  }

  // Business Financial Year API Call
  getFinacialYear() {
    this.myInvestmentsService.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });
  }
  // Family Member List API call
  getMasterFamilyInfo() {
    this.myInvestmentsService.getFamilyInfo().subscribe((res) => {
      console.log('getFamilyInfo', res);
      this.familyMemberGroup = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        if (element.relation === 'Daughter' || element.relation === 'Son' ||  element.relation === 'Self' || element.ageBracket === 'Minor') {
          this.familyMemberName.push(obj);
        }
      });
    });
  }

  // Family relationship shown on Policyholder selection
  OnSelectionfamilyMemberGroup() {
    if (this.form.get('studentName').value == null) {
      this.form.get('relationship').setValue(null);
    }

    const toSelect = this.familyMemberGroup.find(
      (element) =>
        element.familyMemberName == this.form.get('studentName').value
    );
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    // this.form.get('familyMemberName').setValue(toSelect.familyMemberName);
    this.form.get('relationship').setValue(toSelect.relation);
  }

  // Get All Institutes From Global Table
  getInstitutesFromGlobal() {
    this.myInvestmentsService.getAllInstitutesFromGlobal().subscribe((res) => {
      res.data.results.forEach((element: { insurerName: any }) => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.familyMemberNameList.push(obj);
      });
    });
  }

  // Get All Previous Employer
  getPreviousEmployer() {
    this.myInvestmentsService.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
      }
    });
  }

  // convenience getter for easy access to form fields
  get masterForm() {
    return this.form.controls;
  }

  // Get Master Page Data API call
  masterPage() {
    this.educationalLoanServiceService
      .getEducationalLoanMaster()
      .subscribe((res) => {
        console.log('masterGridData::', res);
        this.masterGridData = res.data.results;
        this.loanAccountNumbers = res.data;
        this.masterGridData.forEach((element) => {
          element.loanEndDate = new Date(element.loanEndDate);
        });
      });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log('urlArray.length', this.urlArray.length);
    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0) {
      this.alertService.sweetalertWarning(
        'Educational Loan Document needed to Create Master.'
      );
      return;
    } else {
      const to = this.datePipe.transform(
        this.form.get('loanEndDate').value,
        'yyyy-MM-dd'
      );

      const data = this.form.getRawValue();
      data.proofSubmissionId = this.proofSubmissionId;
      data.loanEndDate = to;
      console.log('Educational Loan ::', data);

        // console.log('loan Account Number ::', data);
        if (data.loanAccountNumber) {

          this.loanAccountNumbers.results.forEach(results => {
            if (results.loanAccountNumber == data.loanAccountNumber) {
              this.validloanAccountNumber = true;
            }
          });
          if (this.validloanAccountNumber) {
            this.validloanAccountNumber = false;
            this.alertService.sweetalertError(
              'Loan Account Number is already present.'
            );
            return;
          }
        }


      this.educationalLoanServiceService
        .uploadMultipleEducationalLoanMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.masterGridData = res.data.results;
              this.masterGridData.forEach((element) => {
                element.loanEndDate = new Date(element.loanEndDate);
              });
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
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
      this.form.get('fullTimeCourse').setValue(0);
      this.form.reset();
      this.showUpdateButton = false;
      this.paymentDetailGridData = [];
      this.masterfilesArray = [];
      this.urlArray = [];
      this.submitted = false;
    }
  }

  onMasterUpload(event: { target: { files: string | any[] } }) {
    //console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
      }
    }
    //console.log('this.masterfilesArray::', this.masterfilesArray);
  }

  // Remove LicMaster Document
  removeSelectedMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

 /*  ====================hide===================== */
  show = true;

  // toggle()
  //  {
  //   this.show = !this.show
  //   if(!this.show)
  //   {
  //     this.alertService.sweetalertWarning(
  //       'You Have No Full Time Course Then Educational Loan Not To Apply ');
  //   }
  // }

  onRadioChange(checked){
    console.log(checked)
    this.isshowHideFlag = true;
    if(checked){
      this.isshowHideFlag = false;
      this.alertService.sweetalertWarning(
        'You Have No Full Time Course Then Educational Loan Not To Apply ');
    }
  }




  // Policy End Date Validations with Current Finanacial Year
  checkFinancialYearStartDateWithPolicyEnd() {
    const policyEnd = this.datePipe.transform(
      this.form.get('policyEndDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    if (policyEnd < financialYearStartDate) {
      this.alertService.sweetalertWarning(
        'Policy End Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart
      );
      this.form.controls.policyEndDate.reset();
    } else {
      this.form.patchValue({
        loanEndDate: this.form.value.policyEndDate,
      });
      this.maxFromDate = this.form.value.policyEndDate;
    }
  }

  // Payment Detail To Date Validations with Payment Detail From Date
  setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.form.value.loanStartDate;
    const from = this.datePipe.transform(
      this.form.get('loanStartDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.form.get('loanEndDate').value,
      'yyyy-MM-dd'
    );
    if (from > to) {
      this.form.controls.loanEndDate.reset();
    }
  }

  // Payment Detail To Date Validations with Current Finanacial Year
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    const to = this.datePipe.transform(
      this.form.get('loanEndDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    if (to < financialYearStartDate) {
      this.alertService.sweetalertWarning(
        'To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart
      );
      this.form.controls.loanEndDate.reset();
    }
  }

  // Remove LicMaster Document
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //------------- On Master Edit functionality --------------------
  editMaster(loanAccountNumber) {
    this.scrollToTop();
    this.educationalLoanServiceService
      .getEducationalLoanMaster()
      .subscribe((res) => {
        console.log('masterGridData::', res);
        this.masterGridData = res.data.results;
        this.masterGridData.forEach((element) => {
          element.loanEndDate = new Date(element.loanEndDate);
        });
        console.log(loanAccountNumber);
        const obj = this.findByloanAccountNumber(
          loanAccountNumber,
          this.masterGridData
        );

        // Object.assign({}, { class: 'gray modal-md' }),
        console.log('Edit Master', obj);
        if (obj != 'undefined') {
          this.paymentDetailGridData = obj.paymentDetails;
          this.form.patchValue(obj);
          this.Index = obj.loanAccountNumber;
          this.showUpdateButton = true;
          this.isClear = true;
          this.urlArray = obj.loanSanctionLetter;
          this.proofSubmissionId = obj.proofSubmissionId;
        }
      });
  }

  //Find method
  findByloanAccountNumber(loanAccountNumber, masterGridData) {
    return masterGridData.find(
      (x) => x.loanAccountNumber === loanAccountNumber
    );
  }

    // scrollToTop Fuctionality
    public scrollToTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 8);
        }
      })();
    }

  // On View Cancel
  cancelView() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    this.form.get('fullTimeCourse').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isCancel = false;
  }
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  //---------- On View Cancel -------------------
  resetView() {
    this.form.reset();
    this.form.get('fullTimeCourse').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.isCancel = false;
  }

  getInstituteDetails(loanAccountNumber) {
    const educationalLoan = this.masterGridData.find(
      (element) => element.loanAccountNumber === loanAccountNumber.number
    );
    this.form.patchValue(educationalLoan);
  }
  // ---------- For Doc Viewer -----------------------
  public nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  public previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  public docViewer(template3: TemplateRef<any>, index: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;

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
}
