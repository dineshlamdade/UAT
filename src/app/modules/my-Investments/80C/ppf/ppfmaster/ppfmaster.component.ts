import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
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

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';

@Component({
  selector: 'app-ppfmaster',
  templateUrl: './ppfmaster.component.html',
  styleUrls: ['./ppfmaster.component.scss'],
})
export class PPFMasterComponent implements OnInit {
  @Input() public accountNo: any;

  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name: string = 'Set iframe source';
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
  public isECS = true;
  public startDateModel: any = { date: null };

  public masterfilesArray: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: any;
  public policyMaxDatePPF: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public minFormDate: any = '';
  public maxFromDate: Date= new Date( "9999-12-31");
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
  public proofSubmissionId;
  policyToDate: any;
  paymentDetailsToDate: any;
  policyMaxDate: any;
  selectedPolicyFromDate: any;

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
    public sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      institution: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      accountHolderName: new FormControl(null, Validators.required),
      relationship: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      policyStartDate: new FormControl(null, Validators.required),
      policyEndDate: new FormControl(new Date("9999-12-31"), Validators.required),
      familyMemberInfoId: new FormControl(null, Validators.required),
      active: new FormControl(true, Validators.required),
      remark: new FormControl(null),
      frequencyOfPayment: new FormControl(null, Validators.required),
      premiumAmount: new FormControl(null, Validators.required),
      annualAmount: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      ecs: new FormControl('0'),
      investmentGroup1MasterPaymentDetailId: new FormControl(0),
      investmentGroup1MasterId: new FormControl(0),
      // depositType: new FormControl('recurring'),
      proofSubmissionId: new FormControl(''),
    });

    this.frequencyOfPaymentList = [
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Half-Yearly', value: 'Halfyearly' },
      { label: 'Yearly', value: 'Yearly' },
      { label: 'As & When', value: 'As & When' },
    ];
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
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });
    

    // Family Member List API call
    this.Service.getFamilyInfo().subscribe((res) => {
      console.log('getFamilyInfo', res),
        (this.familyMemberGroup = res.data.results.filter(
          (e) =>
            e.relation.includes('Daughter') ||
            e.relation.includes('Self') ||
            e.relation.includes('Son') ||
            e.relation.includes('Wife')
        ));
      console.log('getFamilyInfo', this.familyMemberGroup);
      this.familyMemberGroup.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        this.familyMemberName.push(obj)
        
      });
      
    });

    // Get All Previous Employer
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
        // console.log('employeeJoiningDate::',this.employeeJoiningDate);
      }
      this.startDateModel =  '31-dec-9999';
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

    if (this.accountNo !== undefined || this.accountNo !== null) {
      const input = this.accountNo;
      // console.log("edit", input)
      // this.editMaster(input);
      // console.log('editMaster policyNo', input);
      this.editMaster(input.accountNumber);
      console.log('editMaster accountNumber', input.accountNumber);
    }
   
  }

  // convenience getter for easy access to form fields
  get masterForm() {
    return this.form.controls;
  }

  //-------------------- Policy End Date Validations with Policy Start Date ---------------
  setPolicyEndDate() {
    this.policyMinDate = this.form.value.policyStartDate;
    const policyStart = this.datePipe.transform(
      this.form.get('policyStartDate').value,
      'yyyy-MM-dd'
    );
    const policyEnd = this.datePipe.transform(
      this.form.get('policyEndDate').value,
      'yyyy-MM-dd'
    );
    this.minFormDate = this.policyMinDate;
    if (policyStart > policyEnd) {
      this.form.controls.policyEndDate.reset();
    }
    this.form.patchValue({
      fromDate: this.policyMinDate,
    });

    this.setPaymentDetailToDate();
  }

  //------------------ Policy End Date Validations with Current Finanacial Year -------------------
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
        "Policy End Date can't be earlier that start of the Current Financial Year"
      );
      this.form.controls.policyEndDate.reset();
    } else {
      this.form.patchValue({
        toDate: this.form.value.policyEndDate,
      });
      this.maxFromDate = this.form.value.policyEndDate;
    }
  }

  //------------------- Payment Detail To Date Validations with Payment Detail From Date ----------------
  setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.form.value.fromDate;
    const from = this.datePipe.transform(
      this.form.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.form.get('toDate').value,
      'yyyy-MM-dd'
    );
    if (from > to) {
      this.form.controls.toDate.reset();
    }
  }

  //-------------- Payment Detail To Date Validations with Current Finanacial Year ----------------
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    const to = this.datePipe.transform(
      this.form.get('toDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    if (to < financialYearStartDate) {
      //this.alertService.sweetalertWarning("To Date can't be earlier that start of the Current Financial Year");
      this.alertService.sweetalertWarning(
        "Policy End Date can't be earlier that start of the Current Financial Year"
      );
      this.form.controls.toDate.reset();
    }
  }

  // Get Master Page Data API call
  masterPage() {
    this.Service.getPPFMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        if (element.policyStartDate !== null) {
          element.policyStartDate = new Date(element.policyStartDate);
        }
        if (element.policyEndDate !== null) {
          element.policyEndDate = new Date(element.policyEndDate);
        }
        if (element.fromDate !== null) {
          element.fromDate = new Date(element.fromDate);
        }
        if (element.toDate !== null) {
          element.toDate = new Date(element.toDate);
        }
      });
      // if (this.policyNumber !== undefined || this.policyNumber !== null) {
      //   this.getInstituteDetails(this.policyNumber)
      // }
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
        'PPF Document needed to Create Master.'
      );
      return;
    } else {
      const data = this.form.getRawValue();
      data.proofSubmissionId = this.proofSubmissionId;
      if (this.form.value.frequencyOfPayment === 'As & When') {
        const start = this.datePipe.transform(
          this.form.get('policyStartDate').value,
          'yyyy-MM-dd'
        );
        const end = this.datePipe.transform(
          this.form.get('policyEndDate').value,
          'yyyy-MM-dd'
        );
        data.policyStartDate = start;
        data.policyEndDate = end;
        const from = this.datePipe.transform(
          this.form.get('fromDate').value,
          'yyyy-MM-dd'
        );
        const to = this.datePipe.transform(
          this.form.get('toDate').value,
          'yyyy-MM-dd'
        );

        // data.proofSubmissionId = this.proofSubmissionId;
        data.fromDate = from;
        data.toDate = to;
      }
      if (this.form.value.frequencyOfPayment !== 'As & When') {
        const from = this.datePipe.transform(
          this.form.get('fromDate').value,
          'yyyy-MM-dd'
        );
        const to = this.datePipe.transform(
          this.form.get('toDate').value,
          'yyyy-MM-dd'
        );

        data.proofSubmissionId = this.proofSubmissionId;
        data.fromDate = from;
        data.toDate = to;
        data.premiumAmount = data.premiumAmount.toString().replace(/,/g, '');
      }

      console.log('PPF::', data);

      this.Service.submitPPFMasterData(this.masterfilesArray, data).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.masterGridData = res.data.results;
              this.masterGridData.forEach((element) => {
                element.policyStartDate = new Date(element.policyStartDate);
                element.policyEndDate = new Date(element.policyEndDate);
                element.fromDate = new Date(element.fromDate);
                element.toDate = new Date(element.toDate);
              });
              if (data.frequencyOfPayment !== 'As & When') {
                this.alertService.sweetalertMasterSuccess(
                  'Record saved Successfully.',
                  'Go to "Declaration & Actual" Page to see Schedule.'
                );
              } else if (data.frequencyOfPayment === 'As & When') {
                this.alertService.sweetalertMasterSuccess(
                  'Record saved Successfully.',
                  'Go to "Declaration & Actual"ss Page to update the Actuals.'
                );
              }
            } else {
              this.alertService.sweetalertWarning(res.status.messsage);
            }
          } else {
            this.alertService.sweetalertError(
              'Something went wrong. Please try again.'
            );
          }
        }
      );

      this.Index = -1;
      formDirective.resetForm();
      this.form.reset();
      this.form.get('active').setValue(true);
      this.form.get('ecs').setValue('0');
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
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  // Calculate annual amount on basis of premium and frquency
  calculateAnnualAmount() {
    console.log(this.form.value.frequencyOfPayment);
    if (this.form.value.frequencyOfPayment === 'As & When') {
      console.log('in as and when');
      //this.form.get(this.form.value.premiumAmoun).setValue(null);
      const financialYearStartDate = this.datePipe.transform(
        this.financialYearStartDate,
        'dd-MMM-YYYY'
      );
      const financialYearEndDate = this.datePipe.transform(
        this.financialYearEndDate,
        'dd-MMM-YYYY'
      );
      this.form.get('policyStartDate').setValue(financialYearStartDate);
      this.form.get('policyEndDate').setValue(financialYearEndDate);

      this.form.get('premiumAmount').setValue(0);
      this.form.get('annualAmount').setValue(0);
      this.form.get('fromDate').setValue(financialYearStartDate);
      this.form.get('toDate').setValue(financialYearEndDate);
      this.form.get('ecs').setValue('0');
    } else {
      let installment = this.form.value.premiumAmount;
      // installment = installment.toString().replace(/,/g, '');
      // console.log(installment);

      if (!this.form.value.frequencyOfPayment) {
        installment = 0;
      }
      if (this.form.value.frequencyOfPayment === 'Monthly') {
        installment = installment * 12;
      } else if (this.form.value.frequencyOfPayment === 'Quarterly') {
        installment = installment * 4;
      } else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
        installment = installment * 2;
      } else {
        installment = installment * 1;
      }
      this.form.get('annualAmount').setValue(installment);
    }
  }

  // Family relationship shown on Policyholder selection
  OnSelectionfamilyMemberGroup() {
    if(this.form.get('accountHolderName').value == null ){
      this.form.get('relationship').setValue(null);
    }
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('accountHolderName').value
    );
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    this.form.get('relationship').setValue(toSelect.relation);
  }

  // Deactivate the Remark
  deactivateRemark() {
    if (this.form.value.active === false) {
      // this.form.get('remark').enable();
      this.hideRemarkDiv = true;
      this.form.get('remark').setValidators([Validators.required]);
    } else {
      this.form.get('remark').clearValidators();
      this.hideRemarkDiv = false;
      // this.form.get('remark').disable();
      this.form.get('remark').reset();
    }
  }

  // // On Master Edit functionality
  editMaster(accountNumber) {
    this.scrollToTop();
    this.Service.getPPFMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
      //   element.policyStartDate = new Date(element.policyStartDate);
      //   element.policyEndDate = new Date(element.policyEndDate);
      //   element.fromDate = new Date(element.fromDate);
      //   element.toDate = new Date(element.toDate);
      // });
        if (element.policyStartDate !== null) {
          element.policyStartDate = new Date(element.policyStartDate);
        }
        if (element.policyEndDate !== null) {
          element.policyEndDate = new Date(element.policyEndDate);
        }
        if (element.fromDate !== null) {
          element.fromDate = new Date(element.fromDate);
        }
        if (element.toDate !== null) {
          element.toDate = new Date(element.toDate);
        }
      });
      console.log(accountNumber);
      const obj = this.findByPolicyNo(accountNumber, this.masterGridData);

      console.log('Edit Master', obj);
      // if (obj!= 'undefined'){
      console.log('inedit as and when', obj.frequency);
      if (obj.frequency === 'As & When') {
        this.form.patchValue({
          institution: obj.institution,
          accountNumber: obj.accountNumber,
          accountHolderName: obj.accountHolderName,
          relationship: obj.relationship,
          policyStartDate: obj.policyStartDate,
          fromDate: obj.fromDate,
          familyMemberInfoId: obj.familyMemberInfoId,
          frequencyOfPayment: obj.frequencyOfPayment,
        });
      } else {
        this.paymentDetailGridData = obj.paymentDetails;
        this.form.patchValue(obj);
         this.Index = obj.accountNumber;
        //  this.setPolicyEndDate();
        //  this.checkFinancialYearStartDateWithPolicyEnd();
        this.showUpdateButton = true;
        this.isClear = true;
        this.urlArray = obj.documentInformationList;
        this.proofSubmissionId = obj.proofSubmissionId;
      }
    });
  }

  // findByPolicyNo Fuctionality
  findByPolicyNo(accountNumber, masterGridData) {
    return masterGridData.find((x) => x.accountNumber === accountNumber);
  }
   //scrollToTop Fuctionality*************************************
   // scrollToTop Fuctionality

  public scrollToTop(...args: []) {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  // On Edit Cancel
  resetView() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.isClear = false;
  }

  // On Master viewMaster functionality
  // viewMaster(i: number) {
  //   //this.scrollToTop();
  //   this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
  //   this.form.patchValue(this.masterGridData[i]);
  //   this.Index = i;
  //   this.showUpdateButton = true;
  //   const formatedPremiumAmount = this.masterGridData[i].premiumAmount;
  //   // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
  //   this.form.get('premiumAmount').setValue(formatedPremiumAmount);
  //   this.isCancel = true;
  // }

  // On View Cancel
  cancelView() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
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
  getInstituteDetails(policNo) {
    const institude = this.masterGridData.find(
      (element) => element.policyNo === policNo.number
    );
    this.form.patchValue(institude);
  }

  previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  //---------- For Doc Viewer -----------------------
  nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }
  docViewer(template3: TemplateRef<any>, index: any) {
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
