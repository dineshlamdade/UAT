import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
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
import { NpsService } from '../../nps/nps.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
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
  public isFamilyMemberClaimingDeduction = true;

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
    private myInvestmentsService: MyInvestmentsService,
    private npsService: NpsService,
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
    this.familyMemberNameList = [
      // { label: 'Monthly', value: 'Monthly' },
      // { label: 'Quarterly', value: 'Quarterly' },
      // { label: 'Half-Yearly', value: 'Halfyearly' },
      // { label: 'Yearly', value: 'Yearly' },
    ];
    this.disabilityTypeList = [
      { label: 'Hearing impairment', value: 'Hearing impairment' },
      { label: 'Mental retardation', value: 'Mental retardation' },
      { label: 'Mental illness', value: 'Mentalillness' },
      { label: 'Autism', value: 'Autism' },
      { label: 'Cerebral palsy', value: 'Cerebral palsy' },
      { label: 'Blindness', value: 'Blindness' },
      { label: 'Low vision', value: 'Lowvision' },
      { label: 'Laprosy cured', value: 'Laprosy cured' },
      { label: 'Laco motor disability', value: 'Laco motor disability' },
    ];
    this.severityLevelList = [
      { label: '40 to 79%', value: '40to79%' },
      { label: '80% and above', value: '80% and above' },
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
    this.initiateMasterForm();
    this.getMasterFamilyInfo();
    this.getNpsIdentityInformation();
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.deactivateRemark();
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
  }

  // initiate Reactive Master Form
  initiateMasterForm() {
    this.form = this.formBuilder.group({

      familyMemberName: new FormControl(null, Validators.required),
      relationship: new FormControl({ value: null, disabled: true },Validators.required),
      isFamilyMemberClaimingDeduction: new FormControl(0),
      disabilityType: new FormControl(null, Validators.required),
      severityLevel: new FormControl(null, Validators.required),

      active: new FormControl(true, Validators.required),
      remark: new FormControl(null),
      // frequencyOfPayment: new FormControl(null, Validators.required),
      // premiumAmount: new FormControl(null, Validators.required),
      // annualAmount: new FormControl(
      //   { value: null, disabled: true },
      //   Validators.required
      // ),
      masterPaymentDetailId: new FormControl(0),
      investmentGroup1MasterId: new FormControl(0),
      depositType: new FormControl('recurring'),
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
        if (element.relation === 'Self') {
          this.familyMemberName.push(obj);
        }
      });
    });
  }

  //NPS Identity Information API Call
  getNpsIdentityInformation() {
    this.npsService.getIdentityInformation().subscribe((res) => {
      console.log('get Identity Information', res);
      this.form.patchValue({
        pran: res.data.results[0].employeePersonalInfoResponseDTO.pran,
      });
    });
  }

  // Get All Institutes From Global Table
  // getInstitutesFromGlobal() {
  //   this.myInvestmentsService.getAllInstitutesFromGlobal().subscribe((res) => {
  //     res.data.results.forEach((element: { insurerName: any }) => {
  //       const obj = {
  //         label: element.insurerName,
  //         value: element.insurerName,
  //       };
  //       this.institutionNameList.push(obj);
  //     });
  //   });
  // }

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
    this.npsService.getNpsMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        // element.policyStartDate = new Date(element.policyStartDate);
        // element.policyEndDate = new Date(element.policyEndDate);
        // element.fromDate = new Date(element.fromDate);
        // element.toDate = new Date(element.toDate);
      });
    });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.Index = -1;
        formDirective.resetForm();
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('isFamilyMemberClaimingDeduction').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.masterfilesArray = [];
        this.submitted = false;
}

  //   if (this.form.invalid) {
  //     return;
  //   }

  //   if (this.masterfilesArray.length === 0) {
  //     this.alertService.sweetalertWarning(
  //       'National Pension Scheme Document needed to Create Master.'
  //     );
  //     return;
  //   } else {
  //     const from = this.datePipe.transform(
  //       this.form.get('fromDate').value,
  //       'yyyy-MM-dd'
  //     );
  //     const to = this.datePipe.transform(
  //       this.form.get('toDate').value,
  //       'yyyy-MM-dd'
  //     );
  //     const data = this.form.getRawValue();

  //     data.fromDate = from;
  //     data.toDate = to;
  //     data.premiumAmount = data.premiumAmount.toString().replace(',', '');

  //     console.log('National Pension Scheme ::', data);

  //     this.npsService
  //       .uploadMultipleNpsDepositMasterFiles(this.masterfilesArray, data)
  //       .subscribe((res) => {
  //         console.log(res);
  //         if (res) {
  //           if (res.data.results.length > 0) {
  //             this.masterGridData = res.data.results;
  //             this.masterGridData.forEach((element) => {
  //               element.policyStartDate = new Date(element.policyStartDate);
  //               element.policyEndDate = new Date(element.policyEndDate);
  //               element.fromDate = new Date(element.fromDate);
  //               element.toDate = new Date(element.toDate);
  //             });
  //             this.alertService.sweetalertMasterSuccess(
  //               'Record saved Successfully.',
  //               'Go to "Declaration & Actual" Page to see Schedule.'
  //             );
  //           } else {
  //             // this.alertService.sweetalertWarning(res.status.messsage);
  //             this.alertService.sweetalertError(
  //               'This Policy Holder Already Added'
  //             );
  //           }
  //         } else {
  //           this.alertService.sweetalertError(
  //             'Something went wrong. Please try again.'
  //           );
  //         }
  //       });

  //
  //   }
  // }

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

  // // Calculate annual amount on basis of premium and frquency
  // calculateAnnualAmount() {
  //   if (
  //     this.form.value.premiumAmount != null &&
  //     this.form.value.frequencyOfPayment != null
  //   ) {
  //     let installment = this.form.value.premiumAmount;

  //     installment = installment.toString().replace(',', '');

  //     // console.log(installment);
  //     if (!this.form.value.frequencyOfPayment) {
  //       installment = 0;
  //     }
  //     if (this.form.value.frequencyOfPayment === 'Monthly') {
  //       installment = installment * 12;
  //     } else if (this.form.value.frequencyOfPayment === 'Quarterly') {
  //       installment = installment * 4;
  //     } else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
  //       installment = installment * 2;
  //     } else {
  //       installment = installment * 1;
  //     }
  //     const formatedPremiumAmount = this.numberFormat.transform(
  //       this.form.value.premiumAmount
  //     );
  //     // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
  //     this.form.get('premiumAmount').setValue(formatedPremiumAmount);
  //     this.form.get('annualAmount').setValue(installment);
  //   }
  // }

  // Family relationship shown on Policyholder selection
  OnSelectionfamilyMemberGroup() {
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

  // On Master Edit functionality
  editMaster(i: number) {
    //this.scrollToTop();
    this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    // this.form.get('premiumAmount').setValue(formatedPremiumAmount);
    this.isClear = true;
  }

  // On Edit Cancel
  cancelEdit() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('isFamilyMemberClaimingDeduction').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isClear = false;
  }


  // On Master Edit functionality
  viewMaster(i: number) {
    //this.scrollToTop();
    this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    // this.form.get('premiumAmount').setValue(formatedPremiumAmount);
    this.isCancel = true;
  }

  // On View Cancel
  cancelView() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('isFamilyMemberClaimingDeduction').setValue(0);
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
}
