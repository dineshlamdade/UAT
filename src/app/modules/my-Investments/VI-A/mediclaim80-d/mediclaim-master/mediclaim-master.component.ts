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
import { startOfYear } from 'date-fns';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { Mediclaim80DService } from '../mediclaim80-d.service';
import { MultiSelect} from '../../../../../../assets/plugins/multi-select/js/jquery.multi-select.js';
declare var MultiSelect: any;

@Component({
  selector: 'app-mediclaim-master',
  templateUrl: './mediclaim-master.component.html',
  styleUrls: ['./mediclaim-master.component.scss']
})

export class MediclaimMasterComponent implements OnInit {

  // declare MultiSelect: any;

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
  public depositTypeList : Array<any> =[];
  public typeOfExpenceList : Array<any> =[];
  public frequencyOfPaymentList: Array<any> = [];
  public frequencyOfPaymentListInMediclaim: Array<any> = [];
  public frequencyOfTermDepositPaymentList: Array<any> = [];
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
  public visibilityFlag = true;

  public dropdownSettings: any;
  public ServicesList = [];
  public dropdownList = [];
  public selectedItems = [];
  public selectedEstablishmentMasterId = [];


  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private mediclaim80DService : Mediclaim80DService,
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
      expenseType : new FormControl("", Validators.required),
      institution: new FormControl(null, Validators.required),
      policyNumber: new FormControl(null, Validators.required),
      policyStartDate: new FormControl(null, Validators.required),
      policyEndDate: new FormControl(null, Validators.required),

      frequencyOfPayment: new FormControl("", Validators.required),
      premiumAmount: new FormControl(null, Validators.required),
      annualAmount: new FormControl({ value: null, disabled: true },Validators.required),
      mediclaimBenefeciaryDetailList: new FormControl([], Validators.required),
      ecs: new FormControl(false),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      mediclaimMasterId: new FormControl(0),
      mediclaimPaymentDetailId: new FormControl(0),
      // depositType: new FormControl("", Validators.required),

    });
    this.typeOfExpenceList = [
      {label: 'Mediclaim Premium', value: 'Mediclaim Premium'},
      {label: 'Preventive Health Check Up', value: 'Preventive Health Check Up'},
      {label: 'Medical Expenses For Parents(Senior Citizen/S)', value: 'Medical Expenses for Parents'},

      // {label: 'Term Deposit', value: 'Term Deposit'},
      // {label: 'Recurring Deposit', value: 'Recurring Deposit'},
    ];
    this.frequencyOfPaymentListInMediclaim = [
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Half-Yearly', value: 'Halfyearly' },
      { label: 'Yearly', value: 'Yearly' },
    ];
    // this.frequencyOfTermDepositPaymentList = [
    //   { label: 'One-Time', value: 'One Time' },
    // ];
    // this.frequencyOfPaymentList = this.frequencyOfTermDepositPaymentList;
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
  abc(){
    console.log(this.ServicesList)
  }
  public ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
      this.dropdownSettings = {
      singleSelection: false,
      idField: 'familyMemberInfoId',
      textField: 'name',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'id',
  //     textField: 'label',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 2,
  //     allowSearchFilter: true
  //  };

  //  this.dropdownList1 = [
  //     { id: 1, label: 'ABC' },
  //     { id: 2, label: 'PQR' },
  //     { id: 3, label: 'XYZ' },
  //     { id: 4, label: 'qpb' },]

    // this.dropdownList.push({familyMemberInfoId:'ab1c', name:1});
    // this.dropdownList.push({familyMemberInfoId:'abc1', name:12});
    // this.dropdownList.push({familyMemberInfoId:'ab1c', name:134});
    // this.dropdownList.push({familyMemberInfoId:'abc1', name:155});
    // this.dropdownList.push({familyMemberInfoId:'abc1', name:166});
    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });

    // Family Member List API call
    this.Service.getFamilyInfo().subscribe((res) => {
      // this.dropdownList = res.data.results;
      let abc = [];
      res.data.results.forEach((element) => {
        const obj = {


          // label: element.familyMemberName,
          // value: element.familyMemberInfoId,

          familyMemberInfoId: element.familyMemberInfoId,
          familyMemberName: element.name,
          relation: element.relationship,

        };


        if (element.relation !== 'Brother' || element.relation !== 'Sister' ){
          let familyNameWithRelation = element.familyMemberName +  "("  + element.relation + ")";
          abc.push({familyMemberInfoId:element.familyMemberInfoId, name: familyNameWithRelation });
          console.log("family List", this.dropdownList);
        }

        //   if (element.relation !== 'Brother' || element.relation !== 'Sister' ){
        //   abc.push({label:element.familyMemberName, value:element.familyMemberInfoId});
        //   console.log("family List", this.dropdownList);
        // }

      });
      this.dropdownList = abc;
      console.log('dropdownList::' , this.dropdownList);
    });

    // this.deactivateRemark();

    // Get All Institutes From Global Table
    this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
      // console.log(res);
      res.data.results.forEach((element: { insurerName: any }) => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.institutionNameList.push(obj);
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

  // convenience getter for easy access to form fields
  get masterForm() {
    return this.form.controls;
  }

   // Family relationship shown on Policyholder selection
   OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('policyNumber').value
    );
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    this.form.get('relationship').setValue(toSelect.relation);
  }


  // Policy End Date Validations with Policy Start Date
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

    // this.setPaymentDetailToDate();
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
        toDate: this.form.value.policyEndDate,
      });
      this.maxFromDate = this.form.value.policyEndDate;
    }
  }

  // Payment Detail To Date Validations with Payment Detail From Date
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

  // Payment Detail To Date Validations with Current Finanacial Year
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
      this.alertService.sweetalertWarning(
        'To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart
      );
      this.form.controls.endtoDate.reset();
    }
  }

  // Get Master Page Data API call
  masterPage() {
    this.mediclaim80DService.getMediclaimMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);

      });
    });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;
    console.log("Add master", this.form.value);
    if (this.form.invalid) {
      return;
    }

    if (this.masterfilesArray.length === 0) {
      this.alertService.sweetalertWarning(
        'Mediclaim  Document Needed to Create Master.'
      );
      return;
    } else {
      const from = this.datePipe.transform(
        this.form.get('fromDate').value,
        'yyyy-MM-dd'
      );
      const to = this.datePipe.transform(
        this.form.get('toDate').value,
        'yyyy-MM-dd'
      );

      let data: any = {};
      if(this.form.value.expenseType == 'Mediclaim Premium') {
        data = {
          mediclaimMasterId: 0,
          expenseType: this.masterForm.expenseType.value,
          institution: this.masterForm.institution.value,
          policyNumber: this.masterForm.policyNumber.value,
          policyStartDate: this.masterForm.policyStartDate.value,
          policyEndDate: this.masterForm.policyEndDate.value,
          mediclaimBenefeciaryDetailList: this.masterForm.mediclaimBenefeciaryDetailList.value,

          mediclaimPaymentDetail : {
            mediclaimPaymentDetailId: 0,
            frequencyOfPayment: this.masterForm.frequencyOfPayment.value,
            premiumAmount: this.masterForm.premiumAmount.value.toString().replace(',', ''),
            annualAmount: this.masterForm.annualAmount.value,
            ecs: this.masterForm.ecs.value,
            fromDate: this.masterForm.fromDate.value,
            toDate: this.masterForm.toDate.value
          }
        }
      } else {
          data = {
            mediclaimMasterId: 0,
            expenseType: this.masterForm.expenseType.value,
            institution: this.masterForm.institution.value,
            policyNumber: this.masterForm.policyNumber.value,
            policyStartDate: this.masterForm.policyStartDate.value,
            policyEndDate: this.masterForm.policyEndDate.value,
            mediclaimBenefeciaryDetailList: this.masterForm.mediclaimBenefeciaryDetailList.value,
          }
      }
      console.log('Mediclaim Master::', data);

      this.mediclaim80DService
        .uploadMultipleMediclaimMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
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
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
              );
            } else {
              // this.alertService.sweetalertWarning(res.status.messsage);
              this.alertService.sweetalertError('This Policy Holder Already Added');
            }
          } else {
            this.alertService.sweetalertError(
              'Something went wrong. Please try again.'
            );
          }
        });

      this.Index = -1;
      formDirective.resetForm();
      this.form.reset();
      // this.form.get('active').setValue(true);
      this.form.get('ecs').setValue(false);
      this.showUpdateButton = false;
      this.paymentDetailGridData = [];
      this.masterfilesArray = [];
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
  if(this.form.value.expenseType == 'Mediclaim Premium') {
      if (
        this.form.value.premiumAmount != null &&
        this.form.value.frequencyOfPayment != null
      ) {
        let installment = this.form.value.premiumAmount;

        installment = installment.toString().replace(',', '');

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
        const formatedPremiumAmount = this.numberFormat.transform(
          this.form.value.premiumAmount
        );
        // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.form.get('annualAmount').setValue(installment);
      }
    } else {
      this.form.controls.annualAmount.setValue(this.form.get('premiumAmount').value);
    }
  }


  // Deactivate the Remark
  // deactivateRemark() {
  //   if (this.form.value.active === false) {
  //     // this.form.get('remark').enable();
  //     this.hideRemarkDiv = true;
  //     this.form.get('remark').setValidators([Validators.required]);
  //   } else {
  //     this.form.get('remark').clearValidators();
  //     this.hideRemarkDiv = false;
  //     // this.form.get('remark').disable();
  //     this.form.get('remark').reset();
  //   }
  // }

  // On Master Edit functionality
  editMaster(i: number) {
    //this.scrollToTop();
    this.paymentDetailGridData = this.masterGridData[i].mediclaimPaymentDetailList;
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.form.get('premiumAmount').setValue(formatedPremiumAmount);
    this.isClear = true;
  }

  // On Edit Cancel
  cancelEdit() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    this.form.get('ecs').setValue(false);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isClear = false;
  }

  // On Master Edit functionality
  viewMaster(i: number) {
    //this.scrollToTop();
    this.paymentDetailGridData = this.masterGridData[i].mediclaimPaymentDetailList;
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.form.controls.premiumAmount.setValue(formatedPremiumAmount);
    this.isCancel = true;
  }

  // On View Cancel
  cancelView() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    this.form.get('ecs').setValue(false);
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

  onChangeDeposit() {
    if(this.form.value.expenseType !== 'Mediclaim Premium') {
      this.visibilityFlag = false;
      // this.frequencyOfPaymentList = this.frequencyOfTermDepositPaymentList;
      this.form.get('frequencyOfPayment').clearValidators();
      this.form.get('frequencyOfPayment').updateValueAndValidity();
      this.form.get('premiumAmount').clearValidators();
      this.form.get('premiumAmount').updateValueAndValidity();
      this.form.get('fromDate').clearValidators();
      this.form.get('fromDate').updateValueAndValidity();
      this.form.get('toDate').clearValidators();
      this.form.get('toDate').updateValueAndValidity();
      // this.form.reset();
    } else {
      this.visibilityFlag = true;
      // this.frequencyOfPaymentList = this.frequencyOfPaymentListInMediclaim;
      // this.form.controls.premiumAmount.setValue(null);
      // this.form.controls.annualAmount.setValue(null);
      this.form.get('frequencyOfPayment').setValidators([Validators.required]);
      this.form.get('frequencyOfPayment').updateValueAndValidity();
      this.form.get('premiumAmount').setValidators([Validators.required]);
      this.form.get('premiumAmount').updateValueAndValidity();
      this.form.get('fromDate').setValidators([Validators.required]);
      this.form.get('fromDate').updateValueAndValidity();
      this.form.get('toDate').setValidators([Validators.required]);
      this.form.get('toDate').updateValueAndValidity();
    }
  }

  selectionChallenged(event) {
    console.log(event.target.defaultValue);
  }
  onItemSelect(item: any) {
    console.log(item)
    this.ServicesList.push({ mediclaimBenefeciaryDetailList: item.mediclaimBenefeciaryDetailList, establishmentCode: item.establishmentCode });
    console.log(item.establishmentCode);
  }
  onItemDeSelect(item: any) {
    let index = this.ServicesList.findIndex((o) => o.establishmentCode == item.establishmentCode);
    this.ServicesList.splice(index, 1);
    console.log(this.ServicesList);
  }

  onSelectAll(items: any) {
    console.log(items);
    this.ServicesList = [];
    this.ServicesList = items;
  }
  onDeselectAll(items: any) {
    this.ServicesList = [];
  }
}


