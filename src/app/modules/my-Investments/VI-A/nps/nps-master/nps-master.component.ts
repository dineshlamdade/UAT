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
import { NpsService } from '../nps.service';

@Component({
  selector: 'app-nps-master',
  templateUrl: './nps-master.component.html',
  styleUrls: ['./nps-master.component.scss'],
})
export class NpsMasterComponent implements OnInit {
  public enteredRemark = '';
  @Input() public accountNo: any;
  public showdocument = true;
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

  public isShowCancel: boolean;
  public isShowSave: boolean;
  public isShowUpdate: boolean;


  public documentRemark: any;
  public isECS = true;
  public startDateModel: any = { date: null };
  documentArray: any[] = [];

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
  public maxFromDate: Date = new Date("9999-12-31");
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
  isVisibleTable = false;
  public isEdit: boolean = false;
  documentPassword = [];
  remarkList = [];
  documentDataArray = [];
  filesUrlArray = [];

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public proofSubmissionId;
  ConvertedFinancialYearStartDate: Date;
  financialYearEnd: any;
  ConvertedFinancialYearEndDate: Date;
  viewDocumentName: any;
  viewDocumentType: any;
  public showDeatil = false;
  public remarkCount : any;
  selectedremarkIndex : any;

  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  documentRemarkList: any;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
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
    // this.frequencyOfPaymentList = [
    //   { label: 'Monthly', value: 'Monthly' },
    //   { label: 'Quarterly', value: 'Quarterly' },
    //   { label: 'Half-Yearly', value: 'Halfyearly' },
    //   { label: 'Yearly', value: 'Yearly' },
    //    { label: 'As & When', value: 'As & When' },
    // ];
    // this.masterPage();
    // this.addNewRowId = 0;
    // this.hideRemarkDiv = false;
    // this.hideRemoveRow = false;
    // this.isClear = false;
    // this.isCancel = false;
    // this.receiptAmount = this.numberFormat.transform(0);
    // this.globalAddRowIndex = 0;
    // this.globalSelectedAmount = this.numberFormat.transform(0);
    this.setMasterForm();
  }
  setMasterForm() {

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
    this.isShowSave = true;
    // this.initiateMasterForm();
    // this.getFinacialYear();
    // this.getMasterFamilyInfo();
    // this.getNpsIdentityInformation();
    // this.getInstitutesFromGlobal();
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    // this.deactivateRemark();
    // this.getPreviousEmployer();
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

    // if (this.accountNo != undefined || this.accountNo != null) {
    //   const input = this.accountNo;
    //   this.editMaster(input.accountNumber);
    //   console.log('editMaster accountNumber', input.accountNumber);
    // }
    // this.startDateModel =  '31-dec-9999';
    this.getData();
  }

  getData() {
    this.initiateMasterForm();
    this.getFinacialYear();
    this.getMasterFamilyInfo();
    this.getNpsIdentityInformation();
    this.getInstitutesFromGlobal();
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

    if (this.accountNo != undefined || this.accountNo != null) {
      const input = this.accountNo;
      this.editMaster(input.accountNumber);
      console.log('editMaster accountNumber', input.accountNumber);
    }
    this.startDateModel = '31-dec-9999';
  }

  // initiate Reactive Master Form
  initiateMasterForm() {
    this.form = this.formBuilder.group({
      institution: new FormControl('', Validators.required),
      accountType: new FormControl('Tier_1'),
      pran: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      accountNumber: new FormControl(null, Validators.required),
      accountHolderName: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      relationship: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      policyStartDate: new FormControl(null, Validators.required),
      policyEndDate: new FormControl(new Date("9999-12-31"), Validators.required),
      familyMemberInfoId: new FormControl(null, Validators.required),
      active: new FormControl(true, Validators.required),
      remark: new FormControl(null),
      frequencyOfPayment: new FormControl('', Validators.required),
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
      depositType: new FormControl('recurring'),
      proofSubmissionId: new FormControl(''),
    });
  }

  // Business Financial Year API Call
  getFinacialYear() {
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      // this.financialYearStart = res.data.results[0].fromDate;
      this.financialYearEnd = res.data.results[0].toDate;


      this.ConvertedFinancialYearStartDate = new Date(this.financialYearStart);
      let ConvertedFinancialYearStartDate1 = this.datePipe.transform(
        this.ConvertedFinancialYearStartDate,
        'yyyy-MM-dd'
      );
      this.ConvertedFinancialYearEndDate = new Date(this.financialYearEnd);
      let ConvertedFinancialYearEndDate1 = this.datePipe.transform(
        this.ConvertedFinancialYearEndDate,
        'yyyy-MM-dd'
      );
      this.form.patchValue({
        policyStartDate: this.ConvertedFinancialYearStartDate,
        fromDate: this.ConvertedFinancialYearStartDate,
        //  policyEndDate: this.ConvertedFinancialYearEndDate,
        toDate: this.ConvertedFinancialYearEndDate,

      });
      console.log('this.financialYearStart', this.financialYearStart);
      // console.log('financialYearStart', financialYearStart);
    });
    console.log('this.financialYearStart', this.ConvertedFinancialYearStartDate);
  }

  // Family Member List API call
  getMasterFamilyInfo() {
    this.Service.getFamilyInfo().subscribe((res) => {
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
        this.form.patchValue({
          familyMemberInfoId: this.familyMemberGroup[0].familyMemberInfoId,
          accountHolderName: this.familyMemberGroup[0].familyMemberName,
          relationship: this.familyMemberGroup[0].relation,
        });
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
  getInstitutesFromGlobal() {
    this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
      res.data.results.forEach((element: { insurerName: any }) => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.institutionNameList.push(obj);
      });
    });
  }

  // Get All Previous Employer
  getPreviousEmployer() {
    this.Service.getAllPreviousEmployer().subscribe((res) => {
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

    this.setPaymentDetailToDate();
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
      this.form.controls.toDate.reset();
    }
  }

  // Get Master Page Data API call
  masterPage() {
    this.npsService.getNpsMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
        element.documentInformationList.forEach(element => {
          // if(element!=null)
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })
        });
        this.documentArray.push({
          'dateofsubmission': element.creatonTime,
          'documentType': element.documentType,
          'documentName': element.fileName,
          'documentPassword': element.documentPassword,
          'documentRemark': element.documentRemark,
          'status': element.status,
          'lastModifiedBy': element.lastModifiedBy,
          'lastModifiedTime': element.lastModifiedTime,

        })
      });
      // if (this.policyNumber !== undefined || this.policyNumber !== null) {
      //   this.getInstituteDetails(this.policyNumber)
      // }
    });
    // });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.isShowCancel = false;
    this.isShowUpdate = false;
    this.isShowSave = true;

    if (this.form.invalid) {
      return;
    }
    console.log('this.isEdit', this.isEdit);
    //Sutej chenges
    // console.log('urlArray.length', this.urlArray.length);


    if (!this.isEdit) {
      if (this.masterfilesArray.length == 0 && this.documentArray.length == 0) {
        /*  if (this.masterfilesArray.length === 0 && this.documentArray.length === 0 ) { */
        this.alertService.sweetalertWarning(
          'National Pension Scheme Document needed to Create Master.'
        );
        return;
      }
    }

    if (this.isEdit) {
      if (this.masterfilesArray.length == 0 && this.urlArray.length == 0) {
        /*  if (this.masterfilesArray.length === 0 && this.documentArray.length === 0 ) { */
        this.alertService.sweetalertWarning(
          'National Pension Scheme Document needed to Create Master.'
        );
        return;
      }
    }
    // else {
    const from = this.datePipe.transform(
      this.form.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.form.get('toDate').value,
      'yyyy-MM-dd'
    );

    for (let i = 0; i < this.remarkList.length; i++) {
      if (this.remarkList[i] != undefined || this.remarkList[i] == undefined) {
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
    console.log('this.documentDataArray', this.documentDataArray);
    // const data = this.form.getRawValue();
    // data.proofSubmissionId = this.proofSubmissionId;
    // if (this.form.value.frequencyOfPayment === 'As & When') {
    //   const start = this.datePipe.transform(
    //     this.form.get('policyStartDate').value,
    //     'yyyy-MM-dd'
    //   );
    //   const end = this.datePipe.transform(
    //     this.form.get('policyEndDate').value,
    //     'yyyy-MM-dd'
    //   );
    //   data.policyStartDate = start;
    //   data.policyEndDate = end;
    // const from = this.datePipe.transform(
    //   this.form.get('fromDate').value,
    //   'yyyy-MM-dd'
    // );
    // const to = this.datePipe.transform(
    //   this.form.get('toDate').value,
    //   'yyyy-MM-dd'
    // );

    //   data.fromDate = from;
    //   data.toDate = to;
    // }
    // if (this.form.value.frequencyOfPayment !== 'As & When') {
    //   const from = this.datePipe.transform(
    //     this.form.get('fromDate').value,
    //     'yyyy-MM-dd'
    //   );
    //   const to = this.datePipe.transform(
    //     this.form.get('toDate').value,
    //     'yyyy-MM-dd'
    //   );

    const data = this.form.getRawValue();
    data.proofSubmissionId = this.proofSubmissionId;
    data.fromDate = from;
    data.toDate = to;
    data.premiumAmount = data.premiumAmount.toString().replace(/,/g, '');
    data.remarkPasswordList = this.documentDataArray;
    // }

    console.log('National Pension Scheme ::', data);

    this.npsService
      .uploadMultipleNpsDepositMasterFiles(this.masterfilesArray, data)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          if (res.data.results.length > 0) {
            this.documentDataArray = [];
            this.isEdit = false;
            this.showdocument = false;
            this.masterGridData = res.data.results;
            this.masterGridData.forEach((element) => {
              element.policyStartDate = new Date(element.policyStartDate);
              element.policyEndDate = new Date(element.policyEndDate);
              element.fromDate = new Date(element.fromDate);
              element.toDate = new Date(element.toDate);
            });
            this.alertService.sweetalertMasterSuccess(
              'Record saved Successfully.',
              'In case you wish to alter the “Future New Policies” amount (as Declaration has already increased due to creation of New Schedule).'
            );
            this.form.patchValue({
              accountType: 'Tier_1',
            });
            this.getNpsIdentityInformation();
            this.ngOnInit();
            this.form.patchValue({
              frequencyOfPayment : '',
              policyEndDate : '',
              ecs :'',
              toDate : ''
            })
            if (res.data.results.length > 0) {
              this.masterGridData = res.data.results;


              this.masterGridData.forEach((element, index) => {
                this.documentArray.push({

                  'dateofsubmission': new Date(),
                  'documentType': element.documentInformationList[0].documentType,
                  'documentName': element.documentInformationList[0].fileName,
                  'documentPassword': element.documentInformationList[0].documentPassword,
                  'documentRemark': element.documentInformationList[0].documentRemark,
                  'status': element.documentInformationList[0].status,
                  'approverName': element.documentInformationList[0].lastModifiedBy,
                  'Time': element.documentInformationList[0].lastModifiedTime,

                  // 'documentStatus' : this.premiumFileStatus,

                });

                if (element.documentInformationList[1]) {
                  this.documentArray.push({

                    'dateofsubmission': new Date(),
                    'documentType': element.documentInformationList[1].documentType,
                    'documentName': element.documentInformationList[1].fileName,
                    'documentPassword': element.documentInformationList[1].documentPassword,
                    'documentRemark': element.documentInformationList[1].documentRemark,
                    'status': element.documentInformationList[1].status,
                    'lastModifiedBy': element.documentInformationList[1].lastModifiedBy,
                    'lastModifiedTime': element.documentInformationList[1].lastModifiedTime,

                    // 'documentStatus' : this.premiumFileStatus,

                  });
                }
              });
            }

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
        this.resetView();
        this.ngOnInit();

      }, error => {
        if (error.error.status.code == '400') {
          // this.alertService.sweetalertWarning("Vehicle Number already Present !");
          this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        }
      });
     

    this.Index = -1;
    this.documentArray = [];
    formDirective.resetForm();
    this.documentDataArray = [];
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.remarkList = [];
    this.documentPassword = [];
    this.isVisibleTable = false;
    this.isEdit = false;
    this.submitted = false;
    this.documentRemark = '';
    this.getData();
    this.setMasterForm();


    // }
    this.form.patchValue({
      accountType: 'Tier_1',
    });
    this.getNpsIdentityInformation();
    this.ngOnInit();
    this.form.patchValue({
      frequencyOfPayment : '',
      policyEndDate : '',
      ecs :'',
      toDate : ''
    })
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
  public calculateAnnualAmount() {

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
      // this.form.get('policyStartDate').setValue(financialYearStartDate);
      // this.form.get('policyEndDate').setValue(financialYearEndDate);

      this.form.get('premiumAmount').setValue(0);
      this.form.get('annualAmount').setValue(0);
      // this.form.get('fromDate').setValue(financialYearStartDate);
      // this.form.get('toDate').setValue(financialYearEndDate);
      this.form.get('ecs').setValue('0');
    } else {
      let installment = this.form.value.premiumAmount;
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

  //------------- On Master Edit functionality --------------------
  editMaster(accountNumber, frequency?) {
    this.isEdit = true;
    if (frequency == 'As & When') {
this.showDeatil = true;
    } else {
      this.showDeatil = false;
    }
    this.documentArray = [];
    this.isShowUpdate = true;
    this.isShowSave = false;
    this.isShowCancel = false;
    this.form.enable();
    this.form.get("accountHolderName").disable();
    this.form.get("relationship").disable();
    this.form.get("accountType").disable();
    this.form.get("pran").disable();
    // this.isEdit = true;
    this.scrollToTop();
    this.npsService.getNpsMaster().subscribe((res) => {
      this.isVisibleTable = true;
      console.log('masterGridData::', res);


      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
      });
      console.log(accountNumber);
      const obj = this.findByaccountNumber(accountNumber, this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log('Edit Master', obj);
      // if (obj != 'undefined') {
        console.log('inedit as and when', obj?.frequency);
        if (obj.frequency === 'As & When') {
          this?.form?.patchValue({
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

        console.log('.....................::', res.paymentDetails);
        this.form.patchValue(obj);
        this.Index = obj.accountNumber;
        this.showUpdateButton = true;
        this.isClear = true;
        this.filesUrlArray = obj.documentInformationList;
        this.showdocument = false;
        // this.urlArray = obj.documentInformationList;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.documentArray = [];
        obj.documentInformationList.forEach(element => {
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })
        });
        console.log("documentArray::", this.documentArray);
        this.isVisibleTable = true;

      }
    });
  }

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    masterId,
    summary, count
  ) {
    
    this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.npsService.getNPSMasterRemarkList(
      masterId,
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
  public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);
 
    this.transactionDetail[0].lictransactionList[transIndex].remark =  event.target.value;
   
 
  }


  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": 0,
      "masterId":this.summaryDetails.investmentGroup1MasterId,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"VIA",
      "subSection":"NPS",
      "remark":this.editRemarkData,
      "proofSubmissionId":this.summaryDetails.proofSubmissionId,
      "role":"Employee",
      "remarkType":"Master"

    };
    this.Service
    .postLicMasterRemark(data)
    .subscribe((res) => {
      
      if(res.status.code == "200") {
        console.log(this.masterGridData);
        this.masterGridData[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
    
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


  //view master functionality

  viewMaster(accountNumber) {
    this.form.disable();
    this.isShowSave = false;
    this.isShowCancel = true;
    this.isShowUpdate = false;
    this.documentArray = [];
    // this.isEdit = true;
    this.scrollToTop();
    this.npsService.getNpsMaster().subscribe((res) => {
      this.isVisibleTable = true;
      console.log('masterGridData::', res);


      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
      });
      console.log(accountNumber);
      const obj = this.findByaccountNumber(accountNumber, this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log('Edit Master', obj);
      if (obj != 'undefined') {
        this.paymentDetailGridData = obj.paymentDetails;

        console.log('.....................::', res.paymentDetails);
        this.form.patchValue(obj);
        this.Index = obj.accountNumber;
        this.showUpdateButton = true;
        this.isClear = true;
        this.filesUrlArray = obj.documentInformationList;
        this.showdocument = false;
        // this.urlArray = obj.documentInformationList;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.documentArray = [];
        obj.documentInformationList.forEach(element => {
          this.documentArray.push({
            'dateofsubmission': element.creatonTime,
            'documentType': element.documentType,
            'documentName': element.fileName,
            'documentPassword': element.documentPassword,
            'documentRemark': element.documentRemark,
            'status': element.status,
            'lastModifiedBy': element.lastModifiedBy,
            'lastModifiedTime': element.lastModifiedTime,

          })
        });
        console.log("documentArray::", this.documentArray);
        this.isVisibleTable = true;

      }
    });
  }


  findByaccountNumber(accountNumber, masterGridData) {
    return masterGridData.find((x) => x.accountNumber === accountNumber);
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
  //---------- On View Cancel -------------------
  resetView() {
    this.form.reset();
    this.documentArray = [];
    this.isVisibleTable = false
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.documentArray = [];

    this.urlArray = [];
    this.isCancel = false;
    // this.form.get('accountHolderName').setValue('Aishwarya Malviya');
    // this.form.get('relationship').setValue('Self');
    // this.form.get('accountType').setValue('Tier_1');
    this.ngOnInit();

  }
  //on Cancel

  cancelView() {
    this.form.reset();
    this.form.enable();
    this.isShowSave = true;
    this.isShowCancel = false;
    this.isShowUpdate = false;
    this.form.get("accountHolderName").disable();
    this.form.get("relationship").disable();
    this.form.get("accountType").disable();
    this.form.get("pran").disable();

    this.documentArray = [];
    this.isVisibleTable = false
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.documentArray = [];

    this.urlArray = [];
    this.isCancel = false;
    // this.form.get('accountHolderName').setValue('Aishwarya Malviya');
    // this.form.get('relationship').setValue('Self');
    // this.form.get('accountType').setValue('Tier_1');
    this.ngOnInit();

  }

  // On View Cancel Function not used
  cancelViews() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue(0);
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

  zoomin() {
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if (currWidth == 2500) return false;
    else {
      myImg.style.width = (currWidth + 100) + "px";
    }
  }
  zoomout() {
    var myImg = document.getElementById("map");
    var currWidth = myImg.clientWidth;
    if (currWidth == 100) return false;
    else {
      myImg.style.width = (currWidth - 100) + "px";
    }
  }

  public docViewer(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;
    this.viewDocumentName = data.documentName;
    this.viewDocumentType = data.documentType


    console.log('urlIndex::', this.urlIndex);
    console.log('urlArray::', this.urlArray);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      // this.urlArray[this.urlIndex].blobURI
      this.filesUrlArray[this.urlIndex].blobURI
    );
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
