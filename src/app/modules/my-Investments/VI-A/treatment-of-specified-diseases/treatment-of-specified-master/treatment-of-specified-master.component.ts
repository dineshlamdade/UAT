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
import { TreatmentOfSpecifiedService } from '../treatment-of-specified.service';

@Component({
  selector: 'app-treatment-of-specified-master',
  templateUrl: './treatment-of-specified-master.component.html',
  styleUrls: ['./treatment-of-specified-master.component.scss'],
})
export class TreatmentOfSpecifiedMasterComponent implements OnInit {
  @Input() public patientNames: any;
  public modalRef: BsModalRef;
  public submitted = false;
  public visibilityFlag = false;
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
  public specifiedDiseaseNameList: Array<any> = [];
  public neurologicalDiseaseNameList: Array<any> = [];
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
  public proofSubmissionId = '';
  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private treatmentOfSpecifiedService: TreatmentOfSpecifiedService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      familyMemberInfoId: new FormControl(null, Validators.required),
      patientName: new FormControl(null, Validators.required),
      relationship: new FormControl({ value: null, disabled: true },Validators.required),
      neurologicalDiseaseName: new FormControl(null,Validators.required),
      specifiedDiseaseName: new FormControl(null, Validators.required),
      proofSubmissionId: new FormControl(''),
      specifiedDiseaseMasterId: new FormControl(0),
      remark: new FormControl(null),
    });

    (this.specifiedDiseaseNameList = [
      { label: 'Malignant Cancers', value: 'Malignant Cancers' },
      {
        label: 'Full-Blown Acquired Immuno-Deficiency Syndrome (AIDS)',
        value: 'Full-Blown Acquired Immuno-Deficiency Syndrome (AIDS)',
      },
      { label: 'Chronic Renal failure', value: 'Chronic Renal failure' },
      {
        label: 'Hematological disorders - Hemophilia',
        value: 'Hematological disorders - Hemophilia',
      },
      {
        label: 'Hematological disorders - Thalassaemia',
        value: 'Hematological disorders - Thalassaemia',
      },
      {
        label:
          'Neurological diseases with disability level >=40% per cent and above',
        value:
          'Neurological diseases with disability level >=40% per cent and above',
      },
    ]),
      (this.neurologicalDiseaseNameList = [
        { label: 'Dementia', value: 'Dementia' },
        {
          label: 'Dystonia Musculorum Deformans',
          value: 'Dystonia Musculorum Deformans',
        },
        { label: 'Motor Neuron Disease', value: 'Motor Neuron Disease' },
        { label: 'Ataxia', value: 'Ataxia' },
        { label: 'Chorea', value: 'Chorea' },
        { label: 'Hemiballismus', value: 'Hemiballismus' },
        { label: 'Aphasia', value: 'Aphasia' },
        { label: 'Parkinson', value: 'Parkinson' },
      ]);

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
        this.familyMemberName.push(obj);
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

    if (this.patientNames != undefined || this.patientNames != null) {
      const input = this.patientNames;
      // console.log("edit", input)
      // this.editMaster(input);
      // console.log('editMaster patientName', input);
      this.editMaster(input.patientName);
      console.log('editMaster patientName', input.patientName);
    }

  }

  // ------------------------------------Master----------------------------

  //------------------- convenience getter for easy access to form fields -----------------
  get masterForm() {
    return this.form.controls;
  }

  //---------------- Get Master Page Data API call -----------------------
  masterPage() {
    this.treatmentOfSpecifiedService
      .getSpecifiedDiseaseMaster()
      .subscribe((res) => {
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

    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0) {
      this.alertService.sweetalertWarning(
        'Treatment Of Specified Document needed to Create Master.'
      );
      return;
    } else {
      // const data = this.form.getRawValue();

      // neurologicalDiseaseName: new FormControl(null),
      // specifiedDiseaseName:
      let data: any = {};
      if(this.form.value.specifiedDiseaseName !== 'Neurological diseases with disability level >=40% per cent and above'){
        data = {
          specifiedDiseaseMasterId : 0,
          familyMemberInfoId: this.masterForm.familyMemberInfoId.value,
          patientName: this.masterForm.patientName.value,
          relationship: this.masterForm.relationship.value,
          neurologicalDiseaseName : '',
          specifiedDiseaseName: this.masterForm.specifiedDiseaseName.value,
          },
          data.proofSubmissionId = this.proofSubmissionId;
      }else {
        data = {
          specifiedDiseaseMasterId : 0,
          familyMemberInfoId: this.masterForm.familyMemberInfoId.value,
          patientName: this.masterForm.patientName.value,
          relationship: this.masterForm.relationship.value,
          neurologicalDiseaseName: this.masterForm.neurologicalDiseaseName.value,
          specifiedDiseaseName: this.masterForm.specifiedDiseaseName.value,
        }
        data.proofSubmissionId = this.proofSubmissionId;
      }

      console.log('Treatment Of Specified Disease::', data);

      this.treatmentOfSpecifiedService
        .uploadMultipleMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
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
      // this.form.get('active').setValue(true);
      // this.form.get('ecs').setValue(0);
      this.showUpdateButton = false;
      // this.paymentDetailGridData = [];
      this.urlArray = [];
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

  //----------------- Remove LicMaster Document -----------------------------
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //----------- Family relationship shown on Policyholder selection ---------------
  OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('patientName').value
    );
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    this.form.get('relationship').setValue(toSelect.relation);
  }

  //--------------- Deactivate the Remark -------------------
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

  // //------------- On Master Edit functionality --------------------
  // editMaster(i: number) {
  //   this.scrollToTop();
  //   this.form.patchValue(this.masterGridData[i]);
  //   // console.log(this.form.getRawValue());
  //   this.Index = i;
  //   this.showUpdateButton = true;
  //   // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
  //   this.form.get('proofSubmissionId').setValue(this.masterGridData[i].proofSubmissionId);
  //   this.isClear = true;
  //   this.proofSubmissionId =this.masterGridData[i].proofSubmissionId;
  //    this.urlArray = this.masterGridData[i].documentInformationList;
  //   // this.masterfilesArray = this.masterGridData[i].documentInformationList;
  // }


    // ------------- On Master Edit functionality --------------------
    public editMaster(patientName) {
      this.scrollToTop();
      this.treatmentOfSpecifiedService.getSpecifiedDiseaseMaster().subscribe((res) => {
        console.log('masterGridData::', res);
        this.masterGridData = res.data.results;
        console.log(patientName);
        const obj = this.findByPolicyNo(patientName, this.masterGridData);

        // Object.assign({}, { class: 'gray modal-md' }),
        console.log('Edit Master', obj);
        if (obj != 'undefined') {
          this.paymentDetailGridData = obj.paymentDetails;
          this.form.patchValue(obj);
          this.visibilityFlag = true;
          this.Index = obj.patientName;
          this.showUpdateButton = true;
          this.isClear = true;
          this.urlArray = obj.doctorCertificate;
          this.proofSubmissionId = obj.proofSubmissionId;
        }
      });
    }

      // Find patientName
  public findByPolicyNo(patientName, masterGridData) {
    return masterGridData.find((x) => x.patientName === patientName);
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

  //------------ On Edit Cancel ----------------
  cancelEdit() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.isClear = false;
  }

  //------------------- On Master View functionality -----------------------
  viewMaster(i: number) {
    //this.scrollToTop();
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.masterfilesArray = this.masterGridData[i].documentInformationList;
    this.form
      .get('proofSubmissionId')
      .setValue(this.masterGridData[i].proofSubmissionId);
    this.isCancel = true;
  }


  // ---------- On View Cancel -------------------
  public resetView() {
    this.form.reset();
    this.masterfilesArray = [];
    this.isCancel = false;
    this.urlArray = [];
    this.visibilityFlag = false;
    this.isClear = false;
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
  }

  //---------- On View Cancel -------------------
  cancelView() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.isCancel = false;
  }

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  OnSpecifiedDiseaseChange() {
    this.masterfilesArray = [];
    if (this.form.value.specifiedDiseaseName !== 'Neurological diseases with disability level >=40% per cent and above') {
      this.visibilityFlag = false;
      // this.form.get('neurologicalDiseaseName').setValidators([Validators.required]);
      // this.form.get('neurologicalDiseaseName').updateValueAndValidity();

      this.form.get('neurologicalDiseaseName').clearValidators();
      this.form.get('neurologicalDiseaseName').updateValueAndValidity();
    } else {
      this.visibilityFlag = true;
      this.form.get('neurologicalDiseaseName').setValidators([Validators.required]);
      this.form.get('neurologicalDiseaseName').updateValueAndValidity();
    }
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
