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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { ChildeducationallowanceService } from '../childeducationallowance.service';

@Component({
  selector: 'app-ceamaster',
  templateUrl: './ceamaster.component.html',
  styleUrls: ['./ceamaster.component.scss'],
})
export class CeamasterComponent implements OnInit {
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
  public today = new Date();

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public disableSave = false;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private childeducationallowanceService: ChildeducationallowanceService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      // age: new FormControl({ value: null, disabled: true },Validators.required),
      familyMemberInfoId: new FormControl(null, Validators.required),
      nameOfChild: new FormControl(null, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      employeeMasterId: new FormControl(0),
      childrenEducationAllowanceMasterId: new FormControl(0),
    });

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
    console.log(this.disableSave);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    //-------------- Business Financial Year API Call -------------------------------
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });

    //-------------- Family Member List API call ---------------------------
    this.Service.getFamilyInfo().subscribe((res) => {
      this.familyMemberGroup = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        if (element.relation === 'Daughter' || element.relation === 'Son') {
          this.familyMemberName.push(obj);
        }
      });
    });

    this.deactivateRemark();

    //-------------------- Get All Institutes From Global Table -------------------------
    this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
      res.data.results.forEach((element: { insurerName: any }) => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.institutionNameList.push(obj);
      });
    });

    //------------------ Get All Previous Employer -----------------------------
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
      }
    });
  }

  // ------------------------------------Master----------------------------

  //------------------- convenience getter for easy access to form fields -----------------
  get masterForm() {
    return this.form.controls;
  }

  //---------------- Get Master Page Data API call -----------------------
  masterPage() {
    this.childeducationallowanceService.getCEAMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
    });
  }

  //-------------- Post Master Page Data API call -------------------
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const from = this.datePipe.transform(
      this.form.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.form.get('toDate').value,
      'yyyy-MM-dd'
    );
    const data = this.form.getRawValue();
    data.fromDate = from;
    data.toDate = to;
    console.log('CEA Data::', data);

    this.childeducationallowanceService.postCEAMaster(data).subscribe((res) => {
      console.log(res);
      if (res) {
        if (res.data.results.length > 0) {
          this.masterGridData = res.data.results;

          this.alertService.sweetalertMasterSuccess(
            'Record saved Successfully.',
            'Go to "Transaction" Page to see Schedule.'
          );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
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
    this.showUpdateButton = false;
    this.masterfilesArray = [];
    this.submitted = false;
  }

  onMasterUpload(event: { target: { files: string | any[] } }) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
      }
    }
  }

  //----------------- Remove LicMaster Document -----------------------------
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //----------- Family relationship shown on Policyholder selection ---------------
  OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('nameOfChild').value
    );
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
  }

  //--------------- Deactivate the Remark -------------------
  deactivateRemark() {
    if (this.form.value.active === false) {
      this.hideRemarkDiv = true;
      this.form.get('remark').setValidators([Validators.required]);
    } else {
      this.form.get('remark').clearValidators();
      this.hideRemarkDiv = false;
      this.form.get('remark').reset();
    }
  }

  //------------- On Master Edit functionality --------------------
  editMaster(i: number) {
    this.disableSave = false;
    this.form.patchValue(this.masterGridData[i]);
    this.Index = i;
    this.showUpdateButton = true;
    this.masterfilesArray = this.masterGridData[i].documentInformationList;
  }

  //------------ On Edit Cancel ----------------
  cancelEdit() {
    this.form.reset();
    this.showUpdateButton = false;
    this.isClear = false;
  }

  //------------------- On Master View functionality -----------------------
  viewMaster(i: number) {
    this.disableSave = true;
    this.form.patchValue(this.masterGridData[i]);
    this.Index = i;
    this.showUpdateButton = true;
    this.masterfilesArray = this.masterGridData[i].documentInformationList;
    this.form
      .get('proofSubmissionId')
      .setValue(this.masterGridData[i].proofSubmissionId);
    this.isCancel = true;
  }

  //---------- On View Cancel -------------------
  cancelView() {
    this.form.reset();
    this.showUpdateButton = false;
    this.isCancel = false;
  }

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
}
