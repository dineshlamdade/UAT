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
import { MultiSelect } from '../../../../../../assets/plugins/multi-select/js/jquery.multi-select.js';
declare var MultiSelect: any;

@Component({
  selector: 'app-mediclaim-master',
  templateUrl: './mediclaim-master.component.html',
  styleUrls: ['./mediclaim-master.component.scss'],
})
export class MediclaimMasterComponent implements OnInit {
  // declare MultiSelect: any;
  public enteredRemark = '';
  public modalRef: BsModalRef;
  public showdocument = true;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name = 'Set iframe source';
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};

  public isEdit: boolean = false;

  documentPassword =[];
  remarkList =[];
  documentDataArray = [];
  filesUrlArray = [];


  documentArray: any[] =[];
  isVisibleTable = false;

  viewDocumentName: any;
  viewDocumentType: any;

  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public depositTypeList: Array<any> = [];
  public typeOfExpenceList: Array<any> = [];
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
  public ecs = true;

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

  public familyMemberList: any;

  public dropdownSettings: any;
  public ServicesList = [];
  public dropdownList = [];
  public selectedItems = [];
  public selectedEstablishmentMasterId = [];
  public proofSubmissionId = '';
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  selectedremarkIndex : any;
  documentRemarkList: any;
  public remarkCount : any;


  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private mediclaim80DService: Mediclaim80DService,
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
      expenseType: new FormControl(null, Validators.required),
      institution: new FormControl(null, Validators.required),
      policyNumber: new FormControl(null, Validators.required),
      policyStartDate: new FormControl(null, Validators.required),
      policyEndDate: new FormControl(null, Validators.required),
     // remark: new FormControl(null),
      frequencyOfPayment: new FormControl('', Validators.required),
      premiumAmount: new FormControl(null, Validators.required),
      annualAmount: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      mediclaimBenefeciaryDetailList: new FormControl([], Validators.required),
      ecs: new FormControl('false'),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      mediclaimMasterId: new FormControl(0),
      remark: new FormControl(null),
      mediclaimPaymentDetailId: new FormControl(0),
      proofSubmissionId: new FormControl(''),
      // depositType: new FormControl("", Validators.required),
    });
    this.typeOfExpenceList = [
      { label: 'Mediclaim Premium', value: 'Mediclaim Premium' },
      {
        label: 'Preventive Health Check Up',
        value: 'Preventive Health Check Up',
      },
      {
      //  label: 'Medical Expenses For Parents(Senior Citizen/S)',
        label: 'Medical Expenses for Sr. Citizen/s',
        value: 'Medical Expenses for Parents',
      },

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
  familyMember() {
    console.log(this.ServicesList);
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

    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });

    // Family Member List API call
    this.Service.getFamilyInfo().subscribe((res) => {
      let familyMember = [];
      this.familyMemberList = res.data.results;
       res.data.results.forEach((element) => {
        const obj = {
          familyMemberInfoId: element.familyMemberInfoId,
          familyMemberName: element.name,
          relation: element.relationship,

        };

        if(this.form.value.expenseType == 'Mediclaim Premium' || this.form.value.expenseType == 'Preventive Health Check Up'){
          if (element.relation !== 'Brother' || element.relation !== 'Sister') {

            let familyNameWithRelation =
              element.familyMemberName + '(' + element.relation + ')';
            familyMember.push({
              familyMemberInfoId: element.familyMemberInfoId,
              name: familyNameWithRelation,
            });
          }
        }else{
          console.log(element)
              if ((element.relation === 'Father' || element.relation === 'Mother') && element.ageBracket === 'Senior Citizen') {

              let familyNameWithRelation =
                element.familyMemberName + '(' + element.relation + ')';
              familyMember.push({
                familyMemberInfoId: element.familyMemberInfoId,
                name: familyNameWithRelation,
              });
            }
      }
      });
      this.dropdownList = familyMember;
      console.log('dropdownList::', this.dropdownList);
    });


    //  // Family Member List API call
    //  this.Service.getFamilyInfo().subscribe((res) => {
    //   let familyMember = [];
    //     res.data.results.forEach((element) => {
    //       const obj = {
    //         familyMemberInfoId: element.familyMemberInfoId,
    //         familyMemberName: element.name,
    //         relation: element.relationship,
    //       };
    //       if (element.relation !== 'Brother' || element.relation !== 'Sister') {
    //         let familyNameWithRelation =
    //           element.familyMemberName + '(' + element.relation + ')';
    //         familyMember.push({
    //           familyMemberInfoId: element.familyMemberInfoId,
    //           name: familyNameWithRelation,
    //         });
    //         console.log('family List', this.dropdownList);
    //       }
    //     });
    //     this.dropdownList = familyMember;
    //     console.log('dropdownList::', this.dropdownList);
    //   });

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

//----------- On change Transactional Line Item Remark --------------------------
public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    
  console.log('event.target.value::', event.target.value);
  this.editRemarkData =  event.target.value;
  
 console.log('this.transactionDetail', this.transactionDetail);
  // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
  // console.log('index::', index);

  this.transactionDetail[0].lictransactionList[transIndex].remark =  event?.target?.value;
 

}


onResetRemarkDetails() {
  this.enteredRemark = '';
}



onSaveRemarkDetails(summary, index){
  
  const data ={
    "transactionId": 0,
    "masterId":this.summaryDetails.mediclaimPaymentDetailId,
    "employeeMasterId":this.summaryDetails.employeeMasterId,
    "section":"VIA",
    "subSection":"MEDICLAIM",
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





  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    mediclaimPaymentDetailId,
    summary, count
  ) {


     this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.mediclaim80DService.getmediclaimMasterRemarkList(
      mediclaimPaymentDetailId,
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
  // Get Master Page Data API call
  masterPage() {
    this.mediclaim80DService.getMediclaimMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
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
    // });
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
      });
    // });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;
    console.log('Add master', this.form.value);
    if (this.form.invalid) {
      return;
    }

    console.log('this.isEdit', this.isEdit);

    if(!this.isEdit){

    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0 &&  this.form.value.expenseType == 'Mediclaim Premium') {
      this.alertService.sweetalertWarning(
        'Mediclaim  Document Needed to Create Master.'
      );
      return;
    }
  }

  for (let i = 0; i < this.masterfilesArray.length; i++) {
    if(this.documentPassword[i] != undefined || this.documentPassword[i] == undefined){
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
  console.log('this.documentDataArray', this.documentDataArray);
  // else {
      const from = this.datePipe.transform(
        this.form.get('fromDate').value,
        'yyyy-MM-dd'
      );
      const to = this.datePipe.transform(
        this.form.get('toDate').value,
        'yyyy-MM-dd'
      );

      let data: any = {};
      if (this.form.value.expenseType == 'Mediclaim Premium') {
        data = {
          mediclaimMasterId: 0,
          expenseType: this.masterForm.expenseType.value,
          institution: this.masterForm.institution.value,
          //remark: this.masterForm.remark.value,
          policyNumber: this.masterForm.policyNumber.value,
          policyStartDate: this.masterForm.policyStartDate.value,
          policyEndDate: this.masterForm.policyEndDate.value,
          mediclaimBenefeciaryDetailList: this.masterForm
            .mediclaimBenefeciaryDetailList.value,

          mediclaimPaymentDetail: {
            mediclaimPaymentDetailId: 0,
            frequencyOfPayment: this.masterForm.frequencyOfPayment.value,
            premiumAmount: this.masterForm.premiumAmount.value
              .toString()
              .replace(/,/g, ''),
            annualAmount: this.masterForm.annualAmount.value,
            ecs: this.masterForm.ecs.value,
            fromDate: this.masterForm.fromDate.value,
            toDate: this.masterForm.toDate.value,
          },

        };
        data.proofSubmissionId = this.proofSubmissionId;
        data.remarkPasswordList = this.documentDataArray;

      } else {
        data = {
          mediclaimMasterId: 0,
          expenseType: this.masterForm.expenseType.value,
          institution: this.masterForm.institution.value,
         // remak:this.masterForm.remak.value,
          // policyNumber: this.masterForm.policyNumber.value,
          // policyStartDate: this.masterForm.policyStartDate.value,
          // policyEndDate: this.masterForm.policyEndDate.value,
          mediclaimBenefeciaryDetailList: this.masterForm.mediclaimBenefeciaryDetailList.value,

        };
        data.proofSubmissionId = this.proofSubmissionId;
      }
      console.log('Mediclaim Master::', data);

      this.mediclaim80DService
        .uploadMultipleMediclaimMasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.isEdit = false;
              this.showdocument = false;
              this.masterGridData = res.data.results;
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
                      //'remark': element.documentInformationList[0].remark,
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
                      'remark': element.documentInformationList[0].remark,
                      'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                      'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                      // 'documentStatus' : this.premiumFileStatus,

                  });
                }
                });
              }
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
      this.form.reset();
      // this.form.get('active').setValue(true);
      this.form.get('ecs').setValue(false);
      this.showUpdateButton = false;
      this.paymentDetailGridData = [];
      this.masterfilesArray = [];
      this.submitted = false;
      this.remarkList = [];
      this.documentPassword = [];
      this.isVisibleTable = false;
      this.isEdit = false;
    // }
  }


     // //edit houseLoanUsageTypeList
     editMasterPayment(i:number) {
      this.form.patchValue(this.paymentDetailGridData[i]);

      this.form.get('paymentDetailGridData').patchValue({
        // premiumAmount: this.form.value.premiumAmount,
        premiumAmount: this.paymentDetailGridData[i].premiumAmount,
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

  // Remove LicMaster Document
  removeSelectedLicMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  // Calculate annual amount on basis of premium and frquency
  calculateAnnualAmount() {
    if (this.form.value.expenseType == 'Mediclaim Premium') {
      if (
        this.form.value.premiumAmount != null &&
        this.form.value.frequencyOfPayment != null
      ) {
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
        // const formatedPremiumAmount = this.numberFormat.transform(
        //   this.form.value.premiumAmount
        // );
        // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        // this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.form.get('annualAmount').setValue(installment);
      }
    } else {
      this.form.controls.annualAmount.setValue(
        this.form.get('premiumAmount').value
      );
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

     this.isEdit = true;
    this.scrollToTop();
    const obj =  this.findByNumber(i,this.masterGridData);
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
    const familyMember = this.masterGridData[i];
    // this.urlArray = familyMember.documentInformationList;
    this.filesUrlArray = obj.documentInformationList;
    this.filesUrlArray = obj.documentInformationList;
    this.proofSubmissionId = obj.proofSubmissionId;
    this.showdocument = false;
    this.documentArray = [];
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
    findByNumber(i,masterGridData){
      return masterGridData.find(x => x.accountNumber === i)
    }




  // editMaster(i: number) {
  // if (obj.frequency === 'frequencyOfPayment') {
  //   this.form.patchValue({
  //     institution: obj.institution,
  //     accountNumber: obj.accountNumber,
  //     accountHolderName: obj.accountHolderName,
  //     relationship: obj.relationship,
  //     policyStartDate: obj.policyStartDate,
  //     fromDate: obj.fromDate,
  //     familyMemberInfoId: obj.familyMemberInfoId,
  //     frequencyOfPayment: obj.frequencyOfPayment,
  //   });
  // } else {
  //   this.paymentDetailGridData = obj.paymentDetails;
  //   this.form.patchValue(obj);
  //   this.Index = obj.accountNumber;
  //   this.showUpdateButton = true;
  //   this.isClear = true;
  //   this.urlArray = obj.documentInformationList;
  //   this.proofSubmissionId = obj.proofSubmissionId;
  // }
  // }

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
    this.masterfilesArray = [];
    if (this.form.value.expenseType !== 'Mediclaim Premium') {
      this.visibilityFlag = false;
      // this.frequencyOfPaymentList = this.frequencyOfTermDepositPaymentList;
      this.form.get('policyNumber').clearValidators();
      this.form.get('policyNumber').updateValueAndValidity();
      this.form.get('policyStartDate').clearValidators();
      this.form.get('policyStartDate').updateValueAndValidity();
      this.form.get('policyEndDate').clearValidators();
      this.form.get('policyEndDate').updateValueAndValidity();
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
      this.form.get('policyNumber').setValidators([Validators.required]);
      this.form.get('policyNumber').updateValueAndValidity();
      this.form.get('policyStartDate').setValidators([Validators.required]);
      this.form.get('policyStartDate').updateValueAndValidity();
      this.form.get('policyEndDate').setValidators([Validators.required]);
      this.form.get('policyEndDate').updateValueAndValidity();
      this.form.get('frequencyOfPayment').setValidators([Validators.required]);
      this.form.get('frequencyOfPayment').updateValueAndValidity();
      this.form.get('premiumAmount').setValidators([Validators.required]);
      this.form.get('premiumAmount').updateValueAndValidity();
      this.form.get('fromDate').setValidators([Validators.required]);
      this.form.get('fromDate').updateValueAndValidity();
      this.form.get('toDate').setValidators([Validators.required]);
      this.form.get('toDate').updateValueAndValidity();
    }
    let familyMember = [];
    this.familyMemberList.forEach((element) => {
        const obj = {
        familyMemberInfoId: element.familyMemberInfoId,
        familyMemberName: element.name,
        relation: element.relationship,

      };
      // typeOfExpenceList
      if(this.form.value.expenseType == 'Mediclaim Premium' || this.form.value.expenseType == 'Preventive Health Check Up'){
        console.log("Mediclaim Premium", element)
        if (element.relation !== 'Brother' || element.relation !== 'Sister') {

          let familyNameWithRelation =
            element.familyMemberName + '(' + element.relation + ')';
          familyMember.push({
            familyMemberInfoId: element.familyMemberInfoId,
            name: familyNameWithRelation,
          });
        }
      }else{
        console.log("!!Mediclaim",element)
            if ((element.relation === 'Father' || element.relation === 'Mother') && element.ageBracket === 'Senior Citizen') {
            let familyNameWithRelation =
              element.familyMemberName + '(' + element.relation + ')';
            familyMember.push({
              familyMemberInfoId: element.familyMemberInfoId,
              name: familyNameWithRelation,
            });
          }
    }
    });
    this.dropdownList = familyMember;
    console.log("dropdownList",this.dropdownList)
  }

  selectionChallenged(event) {
    console.log(event.target.defaultValue);
  }
  onItemSelect(item: any) {
    console.log(item);
    this.ServicesList.push({
      mediclaimBenefeciaryDetailList: item.mediclaimBenefeciaryDetailList,
      establishmentCode: item.establishmentCode,
    });
    console.log(item.establishmentCode);
  }
  onItemDeSelect(item: any) {
    let index = this.ServicesList.findIndex(
      (o) => o.establishmentCode == item.establishmentCode
    );
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

  // On Edit Cancel
  resetView() {
    this.paymentDetailGridData = [];
    this.form.reset();
    this.form.get('active').setValue(true);
    this.form.get('ecs').setValue('0');
    this.showUpdateButton = false;

    this.masterfilesArray = [];
    this.urlArray = [];
    this.isClear = false;
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

  public docViewer(template3: TemplateRef<any>, index: any, data: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;
    this.viewDocumentName = data.documentName;
    this.viewDocumentType = data.documentType

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

  // /** Instituation dropdown selection value */
  // public onChangeDeposit(expenseType) {
  //   this.masterfilesArray = [];
  //   // this.form.reset();
  //   this.form.get('expenseType').setValue(expenseType);
  //   // alert(institutionname)
  //   // if(this.form.get('institutionName').value == null ){
  //   //   this.form.get('relationship').setValue(null);
  //   // }
  // }

}
