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
import { EventEmitter } from 'events';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { ElectricVehicleService } from '../electric-vehicle.service';


@Component({
  selector: 'app-electric-vehicle-master',
  templateUrl: './electric-vehicle-master.component.html',
  styleUrls: ['./electric-vehicle-master.component.scss']
})
export class ElectricVehicleMasterComponent implements OnInit {
  public enteredRemark = '';

  @Input() public vehicleNo: any;
  public modalRef: BsModalRef;
  public showdocument = true;
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
  public isShowUpdate = false;
  public isShow :boolean;
  public isShowSave = true;
  documentPassword =[];
  remarkList =[];
  documentDataArray = [];
  filesUrlArray = [];

  public isEdit: boolean = false;

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

  documentArray: any[] =[];
  isVisibleTable = false;
  ConvertedFinancialYearStartDate: Date;
  financialYearEnd: any;
  ConvertedFinancialYearEndDate: Date;
  maxDate: Date;
  minDate: Date
  viewDocumentName: any;
  viewDocumentType: any;

  public proofSubmissionId ;
  public vehicleNumbers: any;
  public loanAccountNumbers: any;
  public validVehicleNumbers: boolean = false;
  public validloanAccountNumber: boolean = false;
  public remarkCount : any;
  
  summaryDetails: any;
  indexCount: any;
  editRemarkData: any;
  selectedremarkIndex : any;
  documentRemarkList: any;
  loanaccountNo: boolean;
  ConvertedFinancialYearEndDate1: any;


  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private electricVehicleService: ElectricVehicleService,
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
      vehicleModel: new FormControl(null, Validators.required),
      vehicleNumber: new FormControl(null, Validators.required),
      lenderName: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      accountHolderName: new FormControl({ value: "Aishwarya Malviya", disabled: true },Validators.required),
      loanAccountNumber: new FormControl(null, Validators.required),
      loanStartDate: new FormControl(null, Validators.required),
      loanEndDate: new FormControl(null, Validators.required),
      electricVehicleLoanMasterId: new FormControl(null),
      proofSubmissionId : new FormControl(''),
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
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.form.enable();

    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].loanStartDate;
     debugger
      //  this.maxDate = new Date(this.maxDate);
      // this.maxDate = this.datePipe.transform(
      //   res.data.results[0].toDate,
      //   'dd-MMM-yyyy'
      // );
      this.maxDate = new Date( res.data.results[0].toDate);
      this.minDate = new Date( res.data.results[0].fromDate);
      // this.ConvertedFinancialYearEndDate1 = this.datePipe.transform(
      //   this.maxDate,
      //   'dd-MMM-yyyy'
      // );
    
    });


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
debugger
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

    if (this.vehicleNo != undefined || this.vehicleNo != null) {
      const input = this.vehicleNo;
      // console.log("edit", input)
      // this.editMaster(input);
      // console.log('editMaster policyNo', input);
      this.editMaster(input.vehicleNumber);
      console.log('editMaster vehicleNumber', input.vehicleNumber);
    }
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
      loanStartDate: this.policyMinDate,
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


  toggleFieldTextType() {
    this.loanaccountNo = !this.loanaccountNo;
  }

  hideAccountNo(loanaccountNo) {
    if (loanaccountNo == true) {
      setTimeout(() => {
        this.loanaccountNo = false;
      }, 3000);
    }
  }

  












  // Get Master Page Data API call
  masterPage() {
    this.electricVehicleService.getElectricVehicleMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.vehicleNumbers = res.data;
      this.loanAccountNumbers = res.data;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.loanStartDate = new Date(element.loanStartDate);
        element.loanEndDate = new Date(element.loanEndDate);
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

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }


console.log('this.isEdit', this.isEdit);

  if(!this.isEdit){ 
    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0  ) {
      this.alertService.sweetalertWarning(
        'Electric vehicle  Document needed to Create Master.'
      );
      return;
    }
  }
  // else {
      const from = this.datePipe.transform(
        this.form.get('loanStartDate').value,
        'yyyy-MM-dd'
      );
      const to = this.datePipe.transform(
        this.form.get('loanEndDate').value,
        'yyyy-MM-dd'
      );
      for (let i = 0; i < this.masterfilesArray.length; i++) {
        if(this.remarkList[i] == undefined || this.remarkList[i] != undefined){
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
      console.log('proofSubmissionId::', this.proofSubmissionId);
      const data = this.form.getRawValue();
            data.proofSubmissionId = this.proofSubmissionId;

      data.loanStartDate = from;
      data.loanEndDate = to;
      data.remarkPasswordList = this.documentDataArray;
      // data.premiumAmount = data.premiumAmount.toString().replace(/,/g, '');

      console.log('electric Vehicle ::', data);
      if (data.vehicleNumber) {

        this.vehicleNumbers.results.forEach(results => {
          if (results.vehicleNumber == data.vehicleNumber) {
            this.validVehicleNumbers = true;
          }
        });
   /*      if (this.validVehicleNumbers) {
          this.validVehicleNumbers = false;
          this.alertService.sweetalertError(
            'Vehicle number is already present.'
          );
          return;
        } */
      }


      console.log('loan Account Number ::', data);
  /*     if (data.loanAccountNumber) {

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
      } */


      // if (this.validVehicleNumbers) {
      //   this.validVehicleNumbers = false;
      //   this.alertService.sweetalertError(
      //     'Viechel number is already present.'
      //   );
      //   return;
      // }

      this.electricVehicleService
        .uploadMultipleElectricVehicleasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.documentDataArray = [];
              this.isEdit = false;
              this.showdocument = false;
              this.masterGridData = res.data.results;
              this.masterGridData.forEach((element) => {
                // element.policyStartDate = new Date(element.policyStartDate);
                // element.policyEndDate = new Date(element.policyEndDate);
                element.loanStartDate = new Date(element.loanStartDate);
                element.loanEndDate = new Date(element.loanEndDate);
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
                     // 'remark':element.documentInformationList[1].remark,
                      'status' : element.documentInformationList[1].status,
                      'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                      'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                      // 'documentStatus' : this.premiumFileStatus,

                  });
                }
                });
              }
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.', '');
            } else {
              this.alertService.sweetalertWarning(res.status.messsage);
            }
          } else {
            this.alertService.sweetalertError(
              'Something went wrong. Please try again.'
            );
          }
        }
        ,error => {
          if(error.error.status.code == '400'){
            // this.alertService.sweetalertWarning("Vehicle Number already Present !");
            this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
          }
        }
        );
        this.isShowUpdate = false;
        this.isShowSave = true;
        this.Index = -1;
        formDirective.resetForm();
        this.documentDataArray = [];
        this.form.reset();
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.masterfilesArray = [];
        this.urlArray = [];
        this.submitted = false;
        this.remarkList = [];
        this.documentPassword = [];
        this.isVisibleTable = false;
        this.isEdit = false;

    // }
  }

  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": 0,
      "masterId":this.summaryDetails.electricVehicleLoanMasterId,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"VIA",
      "subSection":"ELECTRICVEHICLE",
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





   //----------- On change Transactional Line Item Remark --------------------------
   public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);
 
    this.transactionDetail[0].lictransactionList[transIndex].remark =  event?.target?.value;
   
 
  }





  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    electricVehicleLoanMasterId,
    summary, count
  ) {


     this.summaryDetails = summary;
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.electricVehicleService.getElectricVehicleLoanMasterRemarkList(
      electricVehicleLoanMasterId,
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













  onMasterUpload(event: { target: { files: string | any[] } }) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
      }
    }
    // console.log('this.masterfilesArray::', this.masterfilesArray);
  }

  // Remove LicMaster Document
  removeSelectedPensionPlanMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }


  // Family relationship shown on Policyholder selection
  OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('accountHolderName').value
    );
      // this.form.get('accountHolderName').setValue('Aishwarya Malviya');
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
   editMaster(vehicleNumber) {
    this.isShowUpdate = true;
    this.isShowSave = false;
    this.isShow=false
    this.isEdit = true;
    this.form.enable();
    this.scrollToTop();
    this.electricVehicleService.getElectricVehicleMaster().subscribe((res) => {
      this.isVisibleTable = true;
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.loanStartDate = new Date(element.loanStartDate);
        element.loanEndDate = new Date(element.loanEndDate);
      });

      console.log(vehicleNumber)
      const obj =  this.findByvehicleNumber(vehicleNumber,this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log("Edit Master",obj);
      if (obj!= 'undefined'){

      this.paymentDetailGridData = obj.paymentDetails;
      this.form.patchValue(obj);
      this.Index = obj.vehicleNumber;
      this.showUpdateButton = true;
      this.isClear = true;
      // this.urlArray = obj.rcBook;
      this.filesUrlArray = obj.documentInformationList;
      this.showdocument = false;
      this.proofSubmissionId = obj.proofSubmissionId;
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
    });

  }

  // On Master view functionality
  viewMaster(vehicleNumber) {
    this.isShowUpdate = false;
    this.isShowSave = false;
    this.isShow=true
    this.isEdit = true;
    this.form.disable();
    this.scrollToTop();
    this.electricVehicleService.getElectricVehicleMaster().subscribe((res) => {
      this.isVisibleTable = true;
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.loanStartDate = new Date(element.loanStartDate);
        element.loanEndDate = new Date(element.loanEndDate);
      });

      console.log(vehicleNumber)
      const obj =  this.findByvehicleNumber(vehicleNumber,this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log("Edit Master",obj);
      if (obj!= 'undefined'){

      this.paymentDetailGridData = obj.paymentDetails;
      this.form.patchValue(obj);
      this.Index = obj.vehicleNumber;
      this.showUpdateButton = true;
      this.isClear = true;
      // this.urlArray = obj.rcBook;
      this.filesUrlArray = obj.documentInformationList;
      this.showdocument = false;
      this.proofSubmissionId = obj.proofSubmissionId;
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
    });

  }

  findByvehicleNumber(vehicleNumber,masterGridData){
    return masterGridData.find(x => x.vehicleNumber === vehicleNumber)
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

  // On Edit Cancel
  cancelEdit() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isClear = false;
  }

  //---------- On reset Cancel -------------------
  resetView() {
    this.isShowUpdate = false;
    this.isShowSave =  true;
    this.isShow=false;
    this.form.enable();
    this.documentArray = [];
    this.isVisibleTable = false
    this.form.reset();
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.isCancel = false;
  }
  // On View Cancel
  cancelView() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
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

  getInstituteDetails(loanAccountNumber) {
    const electricVehicle = this.masterGridData.find(
      (element) => element.loanAccountNumber === loanAccountNumber.number
    );
    this.form.patchValue(electricVehicle);
  }

 //----------------- Remove  Document -------------
  removeSelectedLicMasterDocument(index: number) {
  this.masterfilesArray.splice(index, 1);
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


  console.log('urlIndex::' , this.urlIndex);
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


