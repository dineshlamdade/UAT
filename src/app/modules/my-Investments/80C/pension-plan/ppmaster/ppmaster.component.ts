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
import { debug } from 'console';
import { startOfYear, toDate } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { PensionPlanService } from '../pension-plan.service';

@Component({
  selector: 'app-ppmaster',
  templateUrl: './ppmaster.component.html',
  styleUrls: ['./ppmaster.component.scss'],
})
export class PpmasterComponent implements OnInit {
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
  documentPassword =[];
  remarkList =[];
  documentDataArray = [];
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

  viewDocumentName: any;
  viewDocumentType: any;

  selectedremarkIndex : any;

  public masterfilesArray: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  documentArray: any[] =[];
  filesUrlArray = [];
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: any;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public minFormDate: any = '';
  public maxFromDate: any = '';
  public financialYearStart: Date;
  public employeeJoiningDate: Date;
  public windowScrolled: boolean;
  public addNewRowId: number;
  public declarationTotal: number;
  public declaredAmount: number;
  public actualTotal: number;
  public actualAmount: number;
  public isEdit: boolean = false;
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
  public remarkCount : any;
  documentRemarkList: any;
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;

  public proofSubmissionId;
  policyToDate: any;
  paymentDetailsToDate: any;
  policyMaxDate: any;
  selectedPolicyFromDate: any;
  isVisibleTable = false;
  ConvertedFinancialYearStartDate: Date;
  financialYearEnd: any;
  ConvertedFinancialYearEndDate: Date;


  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private pensionPlanService: PensionPlanService,
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
    // this.form = this.formBuilder.group({
    //   institution: new FormControl(null, Validators.required),
    //   accountNumber: new FormControl(null, Validators.required),
    //   accountHolderName: new FormControl(null, Validators.required),
    //   relationship: new FormControl(
    //     { value: null, disabled: true },
    //     Validators.required
    //   ),
    //   policyStartDate: new FormControl(null, Validators.required),
    //   policyEndDate: new FormControl(null, Validators.required),
    //   familyMemberInfoId: new FormControl(null, Validators.required),
    //   active: new FormControl(true, Validators.required),
    //   remark: new FormControl(null),
    //   frequencyOfPayment: new FormControl(null, Validators.required),
    //   premiumAmount: new FormControl(null, Validators.required),
    //   annualAmount: new FormControl(
    //     { value: null, disabled: true },
    //     Validators.required
    //   ),
    //   fromDate: new FormControl(null, Validators.required),
    //   toDate: new FormControl(null, Validators.required),
    //   ecs: new FormControl('0'),
    //   investmentGroup1MasterPaymentDetailId: new FormControl(0),
    //   investmentGroup1MasterId: new FormControl(0),
    //   depositType: new FormControl('recurring'),
    //   proofSubmissionId: new FormControl(''),
    // });

    // this.frequencyOfPaymentList = [
    //   { label: 'Monthly', value: 'Monthly' },
    //   { label: 'Quarterly', value: 'Quarterly' },
    //   { label: 'Half-Yearly', value: 'Halfyearly' },
    //   { label: 'Yearly', value: 'Yearly' },
    // ];

    // this.addNewRowId = 0;
    // this.hideRemarkDiv = false;
    // this.hideRemoveRow = false;
    // this.isClear = false;
    // this.isCancel = false;
    // this.receiptAmount = this.numberFormat.transform(0);
    // this.globalAddRowIndex = 0;
    // this.globalSelectedAmount = this.numberFormat.transform(0);
    this.getInitialData();
  }

  getInitialData() {

     this.form = this.formBuilder.group({
      institution: new FormControl(null, Validators.required),
      accountNumber: new FormControl(null, Validators.required),
      accountHolderName: new FormControl(null, Validators.required),
      relationship: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      policyStartDate: new FormControl(null, Validators.required),
      policyEndDate: new FormControl(null, Validators.required),
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
      depositType: new FormControl('recurring'),
      proofSubmissionId: new FormControl(''),
    });

    this.frequencyOfPaymentList = [
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Half-Yearly', value: 'Halfyearly' },
      { label: 'Yearly', value: 'Yearly' },
    ];

    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
  }
  ngOnChanges() {
    console.log('accountNo', this.accountNo);
    // this.editMaster(this.accountNo.accountNumber);
  }
  public ngOnInit(): void {
    // this.masterPage();
    // console.log('masterPage::', this.accountNo);

    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    // //-------------- Business Financial Year API Call -------------------------------
    // this.Service.getBusinessFinancialYear().subscribe((res) => {
    //   this.financialYearStart = res.data.results[0].fromDate;
    // });

    // //-------------- Family Member List API call ---------------------------
    // this.Service.getFamilyInfo().subscribe((res) => {
    //   this.familyMemberGroup = res.data.results;
    //   console.log('familyMemberName::', res);
    //   res.data.results.forEach((element) => {
    //     const obj = {
    //       label: element.familyMemberName,
    //       value: element.familyMemberName,
    //     };
    //     this.familyMemberName.push(obj);
    //   });
    // });

    // this.deactivateRemark();

    // // //-------------------- Get All Institutes From Global Table -------------------------
    // // this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
    // //   res.data.results.forEach((element: { insurerName: any }) => {
    // //     console.log('institutionNameList::', res);
    // //     const obj = {
    // //       label: element.insurerName,
    // //       value: element.insurerName,
    // //     };
    // //     this.institutionNameList.push(obj);
    // //   });

    // // });

    // //------------------ Get All Previous Employer -----------------------------
    // this.Service.getAllPreviousEmployer().subscribe((res) => {
    //   if (res.data.results.length > 0) {
    //     this.employeeJoiningDate = res.data.results[0].joiningDate;
    //   }
    // });

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
    this.getDetails();
  }

  getDetails(){

    this.masterPage();
    console.log('masterPage::', this.accountNo);

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    //-------------- Business Financial Year API Call -------------------------------
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      // this.financialYearStart = res.data.results[0].fromDate;
      // this.financialYearEnd = res.data.results[0].toDate; 
   

      
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
        policyEndDate: this.ConvertedFinancialYearEndDate,
        toDate: this.ConvertedFinancialYearEndDate,
  
      });
      console.log('this.financialYearStart', this.financialYearStart);
      // console.log('financialYearStart', financialYearStart);
    });
    console.log('this.financialYearStart', this.ConvertedFinancialYearStartDate);
   

    //-------------- Family Member List API call ---------------------------
    this.Service.getFamilyInfo().subscribe((res) => {
      this.familyMemberGroup = res.data.results;
      console.log('familyMemberName::', res);
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        this.familyMemberName.push(obj);
      });
    });

    this.deactivateRemark();

    // //-------------------- Get All Institutes From Global Table -------------------------
    // this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
    //   res.data.results.forEach((element: { insurerName: any }) => {
    //     console.log('institutionNameList::', res);
    //     const obj = {
    //       label: element.insurerName,
    //       value: element.insurerName,
    //     };
    //     this.institutionNameList.push(obj);
    //   });

    // });

    //------------------ Get All Previous Employer -----------------------------
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
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

    if (this.accountNo != undefined || this.accountNo != null) {
      const input = this.accountNo;
      this.editMaster(input.accountNumber);
      console.log('editMaster accountNumber', input.accountNumber);
    }
  }

  // ------------------------------------Master----------------------------

  //------------------- convenience getter for easy access to form fields -----------------
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
  
  if (policyStart > policyEnd) {
    this.form.controls.policyEndDate.reset();
  }
  this.form.patchValue({
    fromDate: this.policyMinDate,
  });

  this.setPaymentDetailToDate();
  this.minFormDate = this.form.get('policyStartDate').value;
}

onResetRemarkDetails() {
  this.enteredRemark = '';
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

public docRemarkModal(
  documentViewerTemplate: TemplateRef<any>,
  index: any,
  masterId,
  summary, count
) {
  this.summaryDetails = summary;
  this.indexCount = count;
  this.selectedremarkIndex = count;
  this.Service.getpensionPlanMasterRemarkList(
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

 
  //---------------- Get Master Page Data API call -----------------------
  masterPage() {
    this.pensionPlanService.getPensionPlanMaster().subscribe((res) => {
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

  //-------------- Post Master Page Data API call -------------------
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log('this.isEdit', this.isEdit);
   
 if(!this.isEdit) {
    console.log('urlArray.length', this.urlArray.length);
    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0) {
      this.alertService.sweetalertWarning(
        'Pension Plan Document needed to Create Master.'
      );
      return;
    }
  }


  
    
      const from = this.datePipe.transform(
        this.form.get('fromDate').value,
        'yyyy-MM-dd'
      );
      const to = this.datePipe.transform(
        this.form.get('toDate').value,
        'yyyy-MM-dd'
      );


      for (let i = 0; i <= this.masterfilesArray.length; i++) {
        if(this.documentPassword[i] != undefined){
          let remarksPasswordsDto = {};
          remarksPasswordsDto = {
            "documentType": "Back Statement/ Premium Reciept",
            "documentSubType": "",
            "remark":  this.remarkList[i] ? this.remarkList[i] : '',
            "password": this.documentPassword[i] ? this.documentPassword[i] : ''
          };
          this.documentDataArray.push(remarksPasswordsDto);
        }
      }
      console.log('this.documentDataArray', this.documentDataArray);

      // const data = {

      // }
      console.log('proofSubmissionId::', this.proofSubmissionId);
      const data = this.form.getRawValue();
      data.proofSubmissionId = this.proofSubmissionId;

      data.fromDate = from;
      data.toDate = to;
      data.premiumAmount = data.premiumAmount.toString().replace(/,/g, '');
      data.remarkPasswordList = this.documentDataArray;

      console.log('Pension Plan::', data);

      this.pensionPlanService
        .uploadMultiplePensionPlanMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.isEdit = false;
              this.showdocument = false;
              this.masterGridData = res.data.results;
              this.masterGridData.forEach((element) => {
                element.policyStartDate = new Date(element.policyStartDate);
                element.policyEndDate = new Date(element.policyEndDate);
                element.fromDate = new Date(element.fromDate);
                element.toDate = new Date(element.toDate);
              });
              if (res.data.results.length > 0) {
                this.masterGridData = res.data.results;
            
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
              }
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'In case you wish to alter the “Future New Policies” amount (as Declaration has already increased due to creation of New Schedule).'
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
     
      setTimeout(()=>{                           
        this.getInitialData();
      this.getDetails();
   }, 3000);
    }
  

    onSaveRemarkDetails(summary, index){
    
      const data ={
        "transactionId": 0,
        "masterId":this.summaryDetails.investmentGroup1MasterId,
        "employeeMasterId":this.summaryDetails.employeeMasterId,
        "section":"80C",
        "subSection":"PENPLAN",
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
    //console.log('this.filesArray::', this.masterfilesArray);
    //console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //---------------- Calculate annual amount on basis of premium and frquency -----------
  calculateAnnualAmount() {
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

  //----------- Family relationship shown on Policyholder selection ---------------
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

  //------------- On Master Edit functionality --------------------
  editMaster(accountNumber) {
    
    this.isEdit = true;
    this.scrollToTop();
    let ob = {};
    this.form.get('toDate').patchValue('');
    this.pensionPlanService.getPensionPlanMaster().subscribe((res) => {
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
        this.form.patchValue(obj);
        this.Index = obj.accountNumber;
        this.showUpdateButton = true;
        this.isClear = true;
        // this.urlArray = obj.documentInformationList;
        this.filesUrlArray = obj.documentInformationList;
        this.showdocument = false;
        this.proofSubmissionId = obj.proofSubmissionId;
        this.documentArray = [];
        // this.documentArray = obj.documentInformationList;
        obj.documentInformationList.forEach(element => {
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
        console.log("documentArray::",this.documentArray);
        this.isVisibleTable = true;
      }
    });
  }

  // find account Number Functionality
  findByaccountNumber(accountNumber, masterGridData) {
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

  // this.masterfilesArray = this.masterGridData[institude.accountNumber].documentInformationList;
  // this.masterfilesArray = institude.masterGridData[institude.accountNumber].documentInformationList
  //------------ On Edit Cancel ----------------
  cancelEdit() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isClear = false;
  }

  //------------------- On Master View functionality -----------------------
  // viewMaster(i: number) {
  //   //this.scrollToTop();
  //   this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
  //   this.form.patchValue(this.masterGridData[i]);
  //   // console.log(this.form.getRawValue());
  //   this.Index = i;
  //   this.showUpdateButton = true;
  //   const formatedPremiumAmount = this.numberFormat.transform(
  //     this.masterGridData[i].premiumAmount
  //   );
  //   // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
  //   this.form.get('premiumAmount').setValue(formatedPremiumAmount);
  //   this.isCancel = true;
  // }

  //---------- On View Cancel -------------------
  resetView() {
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.isCancel = false;
  }

  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  getInstituteDetails(accountNumber) {
    const institude = this.masterGridData.find(
      (element) => element.accountNumber === accountNumber.number
    );
    this.form.patchValue(institude);
  }
  //---------- For Doc Viewer -----------------------
  nextDocViewer() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   this.urlArray[this.urlIndex]
    // );
  }

  previousDocViewer() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   this.urlArray[this.urlIndex]
    // );
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

  docViewer(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;

    this.viewDocumentName = data.documentName;
    this.viewDocumentType = data.documentType

    console.log('urlIndex::' , this.urlIndex);
    console.log('urlArray::', this.urlArray);
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.filesUrlArray[this.urlIndex].blobURI
    );
    //this.urlSafe = "https://paysquare-images.s3.ap-south-1.amazonaws.com/download.jpg";
    //this.urlSafe
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
