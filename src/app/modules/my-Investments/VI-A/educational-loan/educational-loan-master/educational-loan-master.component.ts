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
  public enteredRemark = '';
  @Input() public loanAccountNo: any;
  @Input() public: string;
  public modalRef: BsModalRef;
  public submitted = false;
  public showdocument = true;
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
  public documentDataArray: Array<any> = [];
  documentPassword = [];
  remarkList = [];
  filesUrlArray = [];
  isVisibleTable = false;

  documentArray: any[] = [];

  ConvertedFinancialYearStartDate: Date;
  financialYearEnd: any;
  ConvertedFinancialYearEndDate: Date;
  viewDocumentName: any;
  viewDocumentType: any;
  public isEdit: boolean = false;
  public isShowUpdate = false;
  public isShowSave = true;
  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];
  public isCancelShow: boolean = false;
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

  public isshowHideFlag: boolean = true;

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public disability: string;
  public severity: string;
  public loanAccountNumbers: any;
  public fullTimeCourse: boolean = true;
  public validloanAccountNumber: boolean = false;
  public proofSubmissionId;
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  selectedremarkIndex : any;
  documentRemarkList: any;
  public remarkCount : any;
  

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
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
      this.viewMaster(input.loanAccountNumber);
      console.log('editMaster loanAccountNumber', input.loanAccountNumber);
    }
  }

  // initiate Reactive Master Form
  initiateMasterForm() {
    this.form = this.formBuilder.group({
      // fullTimeCourse: new FormControl('true'),
      fullTimeCourse: new FormControl('true'),
      studentName: new FormControl(null, Validators.required),
      relationship: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      lenderName: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      loanAccountNumber: new FormControl(null, Validators.required),
      loanEndDate: new FormControl(null, Validators.required),
      educationalLoanMasterId: new FormControl(0),
      familyMemberInfoId: new FormControl(0),
      proofSubmissionId: new FormControl(''),
    });
  }

  // Business Financial Year API Call
  getFinacialYear() {
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });
  }
  // Family Member List API call
  getMasterFamilyInfo() {
    this.educationalLoanServiceService.getFamilyInfo().subscribe((res) => {
      console.log('getFamilyInfo', res);
      this.familyMemberGroup = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        if (
          element.relation === 'Daughter' ||
          element.relation === 'Son' ||
          element.relation === 'Self' ||
          element.relation == 'Wife'
        ) {
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
    this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
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
          element.documentInformationList.forEach((element) => {
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
      });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('this.isEdit', this.isEdit);

    if (!this.isEdit) {
      // console.log('urlArray.length', this.urlArray.length);
      if (this.masterfilesArray.length === 0 && this.urlArray.length === 0) {
        this.alertService.sweetalertWarning(
          'Educational Loan Document needed to Create Master.'
        );
        return;
      }
    }
    // else {
    const to = this.datePipe.transform(
      this.form.get('loanEndDate').value,
      'yyyy-MM-dd'
    );

    for (let i = 0; i < this.masterfilesArray.length; i++) {
      if (this.remarkList[i] == undefined || this.remarkList[i] != undefined) {
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          documentType: 'Back Statement/ Premium Reciept',
          documentSubType: '',
          "remark": this.remarkList[i] ? this.remarkList[i] : '',
          "password": this.documentPassword[i] ? this.documentPassword[i] : ''
        };
        this.documentDataArray.push(remarksPasswordsDto);
      }
    }
    console.log('this.documentDataArray', this.documentDataArray);

    const data = this.form.getRawValue();
    data.proofSubmissionId = this.proofSubmissionId;
    data.remarkPasswordList = this.documentDataArray;
    data.loanEndDate = to;
    console.log('Educational Loan ::', data);

    // console.log('loan Account Number ::', data);
    // if (data.loanAccountNumber) {

    //   this.loanAccountNumbers.results.forEach(results => {
    //     if (results.loanAccountNumber == data.loanAccountNumber) {
    //       this.validloanAccountNumber = true;
    //     }
    //   });
    //   if (this.validloanAccountNumber) {
    //     this.validloanAccountNumber = false;
    //     this.alertService.sweetalertError(
    //       'Loan Account Number is already present.'
    //     );
    //     return;
    //   }
    // }

    this.educationalLoanServiceService
      .uploadMultipleEducationalLoanMasterFiles(this.masterfilesArray, data)
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.documentDataArray = [];
              this.isEdit = false;
              this.showdocument = false;
              this.masterGridData = res.data.results;
              this.masterGridData.forEach((element) => {
                element.loanEndDate = new Date(element.loanEndDate);
              });
              if (res.data.results.length > 0) {
                this.masterGridData = res.data.results;

                this.masterGridData.forEach((element, index) => {
                  this.documentArray.push({
                    dateofsubmission: new Date(),
                    documentType:
                      element.documentInformationList[0].documentType,
                    documentName: element.documentInformationList[0].fileName,
                    documentPassword:
                      element.documentInformationList[0].documentPassword,
                    documentRemark:
                      element.documentInformationList[0].documentRemark,
                    status: element.documentInformationList[0].status,
                    approverName:
                      element.documentInformationList[0].lastModifiedBy,
                    Time: element.documentInformationList[0].lastModifiedTime,

                    // 'documentStatus' : this.premiumFileStatus,
                  });

                  if (element.documentInformationList[1]) {
                    this.documentArray.push({
                      dateofsubmission: new Date(),
                      documentType:
                        element.documentInformationList[1].documentType,
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
              }
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
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
        },
        (error) => {
          if (error.error.status.code == '400') {
            // this.alertService.sweetalertWarning("Vehicle Number already Present !");
            this.alertService.sweetalertError(
              error['error']['status']['messsage']
            );
          }
        }
      );

    this.Index = -1;
    this.isShowUpdate = false;
    this.isShowSave = true;
    formDirective.resetForm();
    this.form.controls['fullTimeCourse'].setValue('true');
    this.form.reset();
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.documentDataArray = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.submitted = false;
    this.remarkList = [];
    this.documentPassword = [];
    this.isVisibleTable = false;
    this.isEdit = false;
    this.ngOnInit();
    // }
  }



  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    educationalLoanMasterId,
    summary, count
  ) {


     this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.educationalLoanServiceService.getEducationalLoanMasterRemarkList(
      educationalLoanMasterId,
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
 
    this.transactionDetail[0].lictransactionList[transIndex].remark =  event?.target?.value;
   
 
  }


  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": 0,
      "masterId":this.summaryDetails.educationalLoanMasterId,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"VIA",
      "subSection":"EDUCATIONALLOAN",
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

  onRadioChange(value) {
    console.log(value);
    if (value == 'true') {
      this.isshowHideFlag = true;
    } else {
      this.isshowHideFlag = false;
      this.isVisibleTable = false;
      this.alertService.sweetalertWarning(
        'You Have No Full Time Course Then Educational Loan Not To Apply. '
      );
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
    this.isCancelShow = false;
    this.form.enable();
    this.form.get('relationship').disable();
    this.isShowSave = false;
    this.isShowUpdate = true;
    this.isEdit = true;
    this.form.controls['fullTimeCourse'].setValue('true');
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
          this.form.controls['fullTimeCourse'].setValue('true');
          this.Index = obj.loanAccountNumber;
          this.showUpdateButton = true;
          this.isClear = true;
          // this.urlArray = obj.loanSanctionLetter;
          this.filesUrlArray = obj.documentInformationList;
          this.showdocument = false;
          this.proofSubmissionId = obj.proofSubmissionId;
          this.documentArray = [];
          obj.documentInformationList.forEach((element) => {
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
          console.log('documentArray::', this.documentArray);
          this.isVisibleTable = true;
        }
      });
  }

  viewMaster(loanAccountNumber) {
    this.isCancelShow = true;
    this.form.disable();
    this.isShowSave = false;
    this.isShowUpdate = false;
    this.isEdit = true;
    this.form.controls['fullTimeCourse'].setValue('true');
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
          this.form.controls['fullTimeCourse'].setValue('true');
          this.Index = obj.loanAccountNumber;
          this.showUpdateButton = true;
          this.isClear = true;
          // this.urlArray = obj.loanSanctionLetter;
          this.filesUrlArray = obj.documentInformationList;
          this.showdocument = false;
          this.proofSubmissionId = obj.proofSubmissionId;
          this.documentArray = [];
          obj.documentInformationList.forEach((element) => {
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
          console.log('documentArray::', this.documentArray);
          this.isVisibleTable = true;
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
    this.isCancelShow = false;
    this.documentArray = [];
    this.form.enable();
    this.isShowSave = true;
    this.isShowUpdate = false;
    this.isVisibleTable = false;
    this.form.get('relationship').disable();
    this.form.reset();
    // this.form.get('active').setValue(true);
    //  this.form.get('fullTimeCourse').setValue(0);
    // this.form.get('fullTimeCourse').setValue(true);
    this.form.patchValue({
      fullTimeCourse : 'true',
    })
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
    this.documentArray = [];
    this.isVisibleTable = false;
    this.isShowUpdate = false;
    this.isShowSave = true;
    // this.form.get('fullTimeCourse').setValue(0);
    this.showUpdateButton = false;
    this.form.controls['fullTimeCourse'].setValue('true');
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

  public docViewer(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;

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
