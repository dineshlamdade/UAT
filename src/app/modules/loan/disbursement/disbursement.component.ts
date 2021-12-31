//  import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from '../loan.service';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from 'html2canvas';

import { LoanModule } from '../loan.module';
// import { AlertServiceService } from '@src/app/core/services/alert-service.service';
import { AuthService } from '../../auth/auth.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

const html2canvas: any = _html2canvas;

interface moPay {
  name: string
}

@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss'],
})
export class DisbursementComponent implements OnInit {
  addDisburseForm: FormGroup;
  officeUseForm :FormGroup;
  perticularEmpDetails: any;
  // loanDetails: any;
  loanDetails:any;
  user1:any;
  employeeMasterIdData: any;
  public modalRef: BsModalRef;
  checkedList:any;
  checklist:any;

  bankData: any;
  row: any=[];
  modeOfPay: moPay[];
  isNameSelected: boolean = true;
  isNameSelected2:boolean = true;
  userData: any;
  employeeMasterId: any;
  selectedLoanData: any;
  summary: any;
  getLoanApplicationSummaryData: any;
  loanType: any;
  isTextFieldType: boolean;
  payeeValue: any;
  userName2: any;
  getDisbursementAndyetToData: any;
  loanApplicationId: any;
  yetToDisbursementAmt: number;
  approvedAmount: any;
  companyDisbursedAmount: number;
  loanType2: any;
  listDoc: File[] = [];
  public urlArray: Array<any> = [];
  isViewbankDetails: boolean = false;
  isViewbankDetails2: boolean = true;
  selectedBankData: any;
  myDate: Date = new Date();
  amount: number;
  accountnoflag:boolean;
  public maxAccNumber: number;
  accountNo: any;
  accountNumberCountError: any;
  confirmAccountNumber: any = '';
  confirmAccountNo1: boolean;
  isAccountNoValid: boolean;
  public maxNumber: any;
  accountNoMatched: boolean;
  confirmAccountNumberCountError: string;
  verifyAccount : any = ''
  amountisgraterthan:boolean;
  lessthanamout:boolean;
  companyBankData: any;
  getLoanTransactionData: any;
  today : Date = new Date();
  // myDate: Date = new Date();
  mappingDetails: any =[];
  accountNumber: any;
  ifscCode: any;
  branchName: any;
  bankName: any;
  loanDescription: any;
  documentName: any;
  documentArray: any = [];
  companySelectedBankData: any;
  companySelectedBankData1: any;
  disbursementRequired:boolean;
  disbursementRequiredFlag:boolean = false;
  partDisbursementPermissible:boolean;
  deviationAmount: any;
  docLenght: any=[];
  otherandbankdetails:boolean=false
  approvedAmountFordeviationAmt: any;
  deviationAmount2: boolean;
  forChkDisable:boolean = true;
  isfirstshow:boolean = false;
  forchk:boolean=false;
  forchk2:boolean = true;
  forbanktransfer:boolean=false;
  forbanktransfer2:boolean= true;
  disabledEmpBankDetails:boolean = true;
  rowIndexData: any;
  AppliedforDisbursement:boolean;
  isSave:boolean= true;
  isUpdate:boolean=false;
  getByIdDisbursementReqData: any;
  viewAccNoFlag : boolean=false;
  viewTotalAccNoFlag :boolean = false;
  public documentPassword :any;
  public remarkList :any;
  documentDetailRequestDTOList: any = [];
  docName: any;
  excelData: any[];
  header: any[];
  isEditable:boolean=true;
  isView:boolean = false;
  managerFlag:boolean = true;
  loanApprEditTimeBtns:boolean=false;
  loanAppBtns:boolean = true;
  selectedLoanDataForApproval: any =[];
  employeeModeOfPayment: any;
  normalviewmodeofpayment:boolean=true;
  approvalmodeofpayment:boolean= false;
  multiplEmpFlag:boolean = false;
  selectedEmployee: any;
  index: number;
  postApproverDetailsData: any;
  approverEmpCode: any;
  sequence: any;
  approverName: any;
  approvalRemark: any ='';
  inputRemarkFlag:boolean = false;
  inputnormalFlag:boolean = true;
  expectedPaymentDate: any;
  normalExpectedDate :boolean= true;
  approvalTimeDate: boolean = false;
  approvalEmpMasterId: any;
  managerApprovalFlag :boolean = true;
  employeeMasterIdbyDefault: any;
  approverDetails:boolean = true;
  isChequeNo:boolean ;
  isUTRNo:boolean ;
  userName: any;
  isSaveOfcUse:boolean = false;
  companyBankDetails:boolean = true;
  notDisabled:boolean = false;
  loanDisbursementPaymentDetailsId: any;
  loanApplicationIdforOfcUse: any;
  officeUseFormFlag :boolean = true;
  companyBankMappingId: any;
  companyId: any;
  accountNumberforCompanyBank: any;
  ofcUseBtns: boolean = false;
  ofcUseAmtFlag: boolean;
  amountForOfcUse: any;
  employeeModeOfPaymentForOfcUse: any;


  selectInput(event) {
    let selected = event.target.value;
    if (selected == "Bank Transfer" || selected == "Through Salary") {
      this.isNameSelected = true;
      this.isViewbankDetails = true;

    } else {
      this.isNameSelected = false;
      this.isViewbankDetails = false;
    }

    if(selected == 'Cheque'){
      this.forChkDisable = true;
      this.disabledEmpBankDetails = true;
    }else{
      this.forChkDisable = false;
      this.disabledEmpBankDetails = false;
    }

    if (selected == "Bank Transfer" && this.payeeValue == 'Other') {
      this.isNameSelected = false;
      this.otherandbankdetails = true;
      // this.disabledEmpBankDetails = true;
      this.isViewbankDetails = false;
    } else {
      this.isNameSelected = true;
      this.otherandbankdetails = false;
      // this.disabledEmpBankDetails = false;
      this.isViewbankDetails = true;
    }

    this.addDisburseForm.controls['ifscCode'].setValue('');
    this.addDisburseForm.controls['bankName'].setValue('');
    this.addDisburseForm.controls['bankAddress'].setValue('');
    this.addDisburseForm.controls['accountNo'].setValue('');

  }

  selectInput2(event) {
    let selected = event.target.value;
    if (selected == "Cheque") {
      this.forchk = true;
      this.forchk2 = false;

    } else {
      this.forchk = false;
      this.forchk2 = true;

    }

    if(selected == "Bank Transfer" )
    {
      this.forbanktransfer = true;
      this.forbanktransfer2 = false;
    }else{
      this.forbanktransfer = false;
      this.forbanktransfer2 = true;
    }

    // if(selected == "Through Salary" )
    // {
    //   this.forchk = true;
    //   this.forchk2 = false;
    //   this.forbanktransfer2 = false;
    //   this.forbanktransfer = true;
    // }else{
    //   this.forchk = false;
    //   this.forchk2 = true;
    //   this.forbanktransfer = false;
    //   this.forbanktransfer2 = true;
    // }

  }

  constructor(
    public formBuilder: FormBuilder,
    private loanService: LoanService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private excelservice: ExcelserviceService,
    public sanitizer: DomSanitizer,
    private toaster: ToastrService,
    private router: Router,
    private alertService: AlertServiceService,
    private authService: AuthService )
    {
    this.addDisburseForm = new FormGroup({
      accountNo: new FormControl(0),
      active: new FormControl(true),
      amount: new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      bankAddress: new FormControl(''),
      bankName: new FormControl(''),
      createDateTime: new FormControl(new Date()),
      createdBy: new FormControl(''),
      expectedPaymentDate: new FormControl(new Date()),
      ifscCode: new FormControl(''),
      transactionNo: new FormControl(''),
      lastModifiedBy: new FormControl(''),
      employeeModeOfPayment: new FormControl(''),
      status: new FormControl(''),
      // modeofPayment: new FormControl(''),
      employeeBankInfoId: new FormControl(2),
      approvedAmount: new FormControl(0),
      lastModifiedDateTime: new FormControl(new Date()),
      payee: new FormControl('',Validators.required),
      payeeType: new FormControl('',Validators.required),
      remark: new FormControl(''),
      loanApplicationId:new FormControl(),
      loanDisbursementPaymentDetailsId:new FormControl(0),
      documentDetailRequestDTOList:new FormControl([]),
      // employeeBankInfoId: new FormControl(2)
      // employeeBankInfoId: 2,
    });

    this.officeUseForm = new FormGroup({
        loanDisbursementPaymentDetailsId: new FormControl(0),
        companyDateOfPayment: new FormControl(new Date()),
        companyDisbursedAmount:new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        loanApplicationId: new FormControl(0),
        approvedAmount:new FormControl(0),
        businessCycleId:new FormControl(0),
        companyAccountNo:new FormControl(0),
        companyBankAddress: new FormControl(''),
        companyBankMappingId: new FormControl(0),
        companyBankName:new FormControl(''),
        companyChequeUTRNo: new FormControl(0,[Validators.required,Validators.pattern(/^[0-9]\d*$/)]),
        companyIfscCode: new FormControl(''),
        companyPayee: new FormControl(''),
        companyRemark: new FormControl(''),
        createDateTime: new FormControl(new Date()),
        employeeBankInfoId: new FormControl(0),
        lastModifiedBy:new FormControl(''),
        lastModifiedDateTime:new FormControl(new Date()),
        modeofPayment: new FormControl(''),
        payeeType:new FormControl(''),
        status:new FormControl(''),

    })

    this.userData = this.authService.getprivileges()
    this.employeeMasterId = this.userData.UserDetails.employeeMasterId;
    this.userName = this.userData.UserDetails.userName;
    this.companyId = this.userData.UserDetails.companyId

    // console.log(" this.userData ", this.userData )
// ........................emp side bydefault disable the ofc use section ....................................
this.officeUseForm.disable();

// this.officeUseForm.controls['companyDateOfPayment'].disable();
    // this.officeUseForm.controls['companyIfscCode'].disable();
    // this.officeUseForm.controls['companyBankName'].disable();
    // this.officeUseForm.controls['companyBankAddress'].disable();
    // this.officeUseForm.controls['companyAccountNo'].disable();
    // this.officeUseForm.controls['companyChequeUTRNo'].disable();
    // this.officeUseForm.controls['companyDisbursedAmount'].disable();
    // this.officeUseForm.controls['modeofPayment'].disable();

    if (localStorage.getItem('selectedLoanData') != null) {
      this.selectedLoanData = JSON.parse(localStorage.getItem('selectedLoanData'));
      this.loanType2 = this.selectedLoanData.loanType;
      this.loanDescription = this.selectedLoanData.loanMaster.loanDescription;

      this.documentArray = this.selectedLoanData.loanMaster.document;
      this.documentArray.forEach(element => {
        element.listDoc = []
      });
      this.docLenght = this.selectedLoanData.loanMaster.document.length;
      this.getLoanDetails(this.loanType2,this.employeeMasterId);

      this.deviationAmount = this.selectedLoanData.loanMaster.deviationAmount;
      this.approvedAmountFordeviationAmt = this.selectedLoanData.approvedAmount;

      this.partDisbursementPermissible = this.selectedLoanData.loanMaster.partDisbursementPermissible;
      this.approvedAmountFordeviationAmt = this.selectedLoanData.approvedAmount;
      this.userName2 = this.selectedLoanData.employeeMaster.fullName;
      this.addDisburseForm.controls['payee'].setValue(this.userName2 );
      // console.log("this.approvedAmountFordeviationAmt",this.approvedAmountFordeviationAmt)
      // console.log("this.partDisbursementPermissible",this.partDisbursementPermissible)

      if(this.partDisbursementPermissible == true){
      this.disbursementRequiredFlag = false;
      this.AppliedforDisbursement = true;
      this.deviationAmount2 = this.deviationAmount  >= this.approvedAmountFordeviationAmt

      }else{
      this.disbursementRequiredFlag = true;
      // console.log("this.approvedAmountFordeviationAmt",this.approvedAmountFordeviationAmt)
      this.addDisburseForm.controls['amount'].setValue(this.approvedAmountFordeviationAmt)
      }
      // this.documentArray.forEach(element => {
      //   this.documentDetailRequestDTOList.push({
      //     "documentRemark": "Sumbit",
      //     "documentType": element.documentName,
      //     "doucumentPassword": "111"
      //   })
      // });

      this.addDisburseForm.controls['documentDetailRequestDTOList'].setValue(this.documentDetailRequestDTOList)
      this.ofcUseBtns = false;

    }

    if(localStorage.getItem('editTransaction')!= null){
      let formdata = JSON.parse(localStorage.getItem('editTransaction'))
      this.addDisburseForm.patchValue(formdata);
      this.isUpdate = true;
      this.isSave = false;
      this.payeeValue = formdata.payeeType;
        this.getByIdDisbursementReq(formdata.loanDisbursementPaymentDetailsId)
        this.userName2 = formdata.payee;
        this.addDisburseForm.controls['payee'].setValue(this.userName2);
        this.addDisburseForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-YYYY'))
      // localStorage.removeItem('editTransaction')
      // this.documentInformationId = formdata.
    }

    if(localStorage.getItem('viewTransaction')!= null){
      let formdata = JSON.parse(localStorage.getItem('viewTransaction'))
      this.addDisburseForm.patchValue(formdata);
      this.addDisburseForm.disable();
     this.isSave = false;
     this.isView = true;
     this.getByIdDisbursementReq(formdata.loanDisbursementPaymentDetailsId)
     this.payeeValue = formdata.payeeType;
     this.userName2 = formdata.payee;
     this.addDisburseForm.controls['payee'].setValue(this.userName2);
     this.addDisburseForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-YYYY'))
    //  localStorage.removeItem('viewTransaction')
      this.normalviewmodeofpayment = false;
      this.approvalmodeofpayment = true;

    }

    if(localStorage.getItem('EditLoanApprovalData')!= null){
      let formdata = JSON.parse(localStorage.getItem('EditLoanApprovalData'))
      this.addDisburseForm.patchValue(formdata);
      this.addDisburseForm.disable();
      this.payeeValue = formdata.payeeType;
      this.userName2 = formdata.payee;
      this.addDisburseForm.controls['payee'].setValue(this.userName2);
      this.isViewbankDetails2 = true;
      // this.isNameSelected2 = false;
      this.managerFlag = false;
      this.addDisburseForm.controls['employeeModeOfPayment'].disable();
      this.loanApprEditTimeBtns = true;
      this.loanAppBtns = false;
      this.getLoanDetails(formdata.loanType,formdata.employeeMasterId)
      this.employeeModeOfPayment = formdata.employeeModeOfPayment;
      this.addDisburseForm.controls['employeeModeOfPayment'].setValue(this.employeeModeOfPayment);
      this.normalviewmodeofpayment = false;
      this.approvalmodeofpayment = true;
    }

    if(localStorage.getItem('ViweLoanApprovalData')!= null){
      let formdata = JSON.parse(localStorage.getItem('ViweLoanApprovalData'))
      this.addDisburseForm.patchValue(formdata);
      this.payeeValue = formdata.payeeType;
      this.userName2 = formdata.payee;
      this.addDisburseForm.controls['payee'].setValue(this.userName2);
      this.addDisburseForm.disable();
      this.getLoanDetails(formdata.loanType,formdata.employeeMasterId)
      this.employeeModeOfPayment = formdata.employeeModeOfPayment;
      this.addDisburseForm.controls['employeeModeOfPayment'].setValue(this.employeeModeOfPayment);
      this.normalviewmodeofpayment = false;
      this.approvalmodeofpayment = true;
    }

    if(localStorage.getItem('selectedLoanForApproval') != null){

      this.selectedLoanDataForApproval = JSON.parse(localStorage.getItem('selectedLoanForApproval'));
      this.addDisburseForm.patchValue(this.selectedLoanDataForApproval[0]);
      this.addDisburseForm.disable();
      this.employeeModeOfPayment = this.selectedLoanDataForApproval[0].employeeModeOfPayment;
      // console.log("this.employeeModeOfPayment",this.employeeModeOfPayment)
      this.addDisburseForm.controls['employeeModeOfPayment'].setValue(this.employeeModeOfPayment);
      this.payeeValue =  this.selectedLoanDataForApproval[0].payeeType;
      this.userName2 =  this.selectedLoanDataForApproval[0].payee;
      this.addDisburseForm.controls['payee'].setValue(this.userName2);
      this.isViewbankDetails2 = true;
      this.managerFlag = false;
      this.loanApprEditTimeBtns = true;
      this.loanAppBtns = false;
      this.normalviewmodeofpayment = false;
      this.approvalmodeofpayment = true;
      this.inputRemarkFlag = true;
      this.inputnormalFlag = false;
      this.normalExpectedDate = false;
      this.approvalTimeDate = true;
      this.managerApprovalFlag = false;
      this.expectedPaymentDate = this.selectedLoanDataForApproval[0].expectedPaymentDate;
      this.addDisburseForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(this.selectedLoanDataForApproval[0].expectedPaymentDate,'dd-MMM-YYYY'))

      this.getLoanDetails(this.selectedLoanDataForApproval[0].loanType,this.selectedLoanDataForApproval[0].employeeMasterId)
      this.getDisbursementData(this.selectedLoanDataForApproval[0].loanApplicationId)
      this.index = 0 ;
      this.selectedEmployee = this.selectedLoanDataForApproval[this.index]
      console.log("this.selectedEmployee",this.selectedEmployee);

      this.loanDescription = this.selectedLoanDataForApproval[this.index].loanDiscription;
      this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMasterId;

    //  console.log(" this.approvalEmpMasterId", this.approvalEmpMasterId)
      if(this.selectedLoanDataForApproval.length > 1){
       this.multiplEmpFlag = true;
      //  this.isSave = false;
      }else{
        this.multiplEmpFlag = false;
      //  this.isSave = false;

      }
      this.loanDisbursementPaymentDetailsId =  this.selectedLoanDataForApproval[this.index].loanDisbursementPaymentDetailsId;
      this.loanApplicationIdforOfcUse = this.selectedLoanDataForApproval[this.index].loanApplicationId;
      this.disbursementRequired  = this.selectedLoanDataForApproval[this.index].disbursementRequired;
      this.amountForOfcUse = this.selectedLoanDataForApproval[this.index].amount;
      this.employeeModeOfPaymentForOfcUse = this.selectedLoanDataForApproval[this.index].employeeModeOfPayment;
      // console.log("amountForOfcUse ", this.amountForOfcUse )
      this.officeUseForm.controls['modeofPayment'].setValue(this.employeeModeOfPaymentForOfcUse);
      this.officeUseForm.controls['companyDisbursedAmount'].setValue( this.amountForOfcUse);
      this.officeUseForm.enable();

    }
  // ....................disbursement yes no ...............................................
  if(this.userName != 'AjayS'){ // employee side
    // alert(this.userName != 'AjayS')
    this.ofcUseBtns = false;
    if (this.disbursementRequired == true){
     this.approverDetails = true;
     this.officeUseFormFlag = false;
     this.loanApprEditTimeBtns = true;
     this.ofcUseBtns = false;
    //  this.loanAppBtns = false;
    }else{
      // alert(this.officeUseFormFlag)
     this.approverDetails = false;
     this.officeUseFormFlag = true;
     this.loanApprEditTimeBtns = false;
     this.ofcUseBtns = true;
    //  this.loanAppBtns = true;
    }
  }
  else{ // admin side
    this.ofcUseBtns = true;
  }
    localStorage.clear();
  }

  nextRecord(){
      this.index = this.index + 1;
      this.selectedEmployee = this.selectedLoanDataForApproval[this.index];
      this.addDisburseForm.patchValue(this.selectedLoanDataForApproval[this.index]);
      this.getLoanDetails(this.selectedLoanDataForApproval[this.index].loanType,this.selectedLoanDataForApproval[this.index].employeeMasterId)
      this.loanDescription = this.selectedLoanDataForApproval[this.index].loanDiscription;
      this.getDisbursementData(this.selectedLoanDataForApproval[this.index].loanApplicationId)
      this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMasterId
       console.log("this.approvalEmpMasterId next",this.approvalEmpMasterId)
       this.getEmpMasterDetails(this.approvalEmpMasterId)
    }

   priviousRecord(){
    this.index = this.index - 1;
    this.selectedEmployee = this.selectedLoanDataForApproval[this.index];
    this.addDisburseForm.patchValue(this.selectedLoanDataForApproval[this.index]);
    this.getLoanDetails(this.selectedLoanDataForApproval[this.index].loanType,this.selectedLoanDataForApproval[this.index].employeeMasterId);
    this.loanDescription = this.selectedLoanDataForApproval[this.index].loanDiscription;
    this.getDisbursementData(this.selectedLoanDataForApproval[this.index].loanApplicationId)
    this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMasterId
     console.log("this.approvalEmpMasterId privious",this.approvalEmpMasterId)
     this.getEmpMasterDetails(this.approvalEmpMasterId)
  }

  ngOnInit(): void {
    this.getEmpMasterDetails(this.employeeMasterIdbyDefault);
    this.getBankDetailsPopUp();
    this.getCmpnyBankDetailsPopUp(this.companyId);
    this.postApproverDetails();

    this.modeOfPay=[{name:'Cheque'},{name:'Bank Transfer'},{name:'Through Salary'}];
    if(!this.isUpdate && !this.isView){
    this.addDisburseForm.controls['expectedPaymentDate'].setValue(this.myDate)
    }
  }
  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  mediumpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }


  payeeTypeChaange(value){
    this.payeeValue = value;
    if(this.payeeValue == 'self')
    {
      this.addDisburseForm.controls['payee'].setValue(this.userName2)
    }else{
      this.addDisburseForm.controls['payee'].setValue('');
    }
  }


  // Get Employeee details
  // this.approvalEmpMasterId
  getEmpMasterDetails(id) {
    this.loanService.getEmpMasterDetails(this.approvalEmpMasterId).subscribe((res) => {
      this.perticularEmpDetails = res.data.results[0][0];
      this.userName2 = this.perticularEmpDetails.fullName;
      console.log(" this.userName2", this.userName2)
    });

  }


getLoanDetails(loanType2,id) {
  // alert(loanType2)
  this.loanService.getLoanDetails(loanType2,this.employeeMasterId).subscribe((res) => {
    this.loanDetails = res.data.results[0];
    this.loanApplicationId = this.loanDetails.loanApplicationId;
    this.approvedAmount = this.loanDetails.approvedAmount
    this.addDisburseForm.controls['approvedAmount'].setValue(this.approvedAmount)
    // console.log("getLoanDetails this.loanApplicationId",this.loanApplicationId)
    this.getDisbursementData(this.loanApplicationId)

  });
}

getDisbursementData(id)
{
  // alert(this.loanApplicationId)
  this.loanService.getDisbursementData(this.loanApplicationId).subscribe(res =>
  {
    this.getDisbursementAndyetToData = res.data.results;

    this.getDisbursementAndyetToData.forEach(element => {
    this.companyDisbursedAmount  = element.companyDisbursedAmount;
    });
    this.yetToDisbursementAmt = this.approvedAmount - this.companyDisbursedAmount;
    console.log("this.yetToDisbursementAmt",this.yetToDisbursementAmt)

  })
}

getBankDetailsPopUp(){
  this.loanService.getBankMasterDetails().subscribe(res =>{
    this.bankData = res.data.results[0];
  })
}

getCmpnyBankDetailsPopUp(id){
  this.loanService.getCompanyBankMasterDetails(this.companyId).subscribe(res =>{
    this.companySelectedBankData = res.data.results;

      // this.companyBankMappingId = this.companySelectedBankData.companyBankMappingId;

    this.companySelectedBankData.forEach(element => {
      this.companyBankMappingId = element.companyBankMappingId;
      // this.accountNumberforCompanyBank =  element.accountNumber;
      // console.log("this.companyBankMappingId ",this.companyBankMappingId )
    });
    // console.log(" this.companySelectedBankData", this.companySelectedBankData)
    // console.log(" this.companyBankMappingId", this.companyBankMappingId)


  })
}
companyBankChecked(companybankData) // for set the company bank data
{
  // let accno = ''
  // this.companySelectedBankData.forEach(element => {
  //   element.mappingDetails.forEach(ele => {
  //     companybankData.mappingDetails.forEach(ele1 => {
  //       if(ele.companyBankMappingId == ele1.companyBankMappingId){
  //         element.checked = true
  //         accno = ele.accountNumber
  //       }else if(ele.companyBankMappingId != ele1.companyBankMappingId){
  //         element.checked = false
  //       }
  //     });

  //   });

  // });
  // console.log("companybankData",companybankData)
this.officeUseForm.controls['companyIfscCode'].setValue(companybankData.ifscCode);
this.officeUseForm.controls['companyBankName'].setValue(companybankData.bankName);
this.officeUseForm.controls['companyBankAddress'].setValue(companybankData.branchName);
this.officeUseForm.controls['companyAccountNo'].setValue(companybankData.accountNumber);
}

bankDetailsInfo(template1: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template1,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}

cmpnybankDetailsInfo(template2: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template2,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}

onSelectBanksdetails(event: any,index){

  this.bankData.forEach(element => {
    if(element.employeeBankInfoId == event.employeeBankInfoId){
      element.checked = true
    }else if(element.employeeBankInfoId != event.employeeBankInfoId){
      element.checked = false
    }
  });
this.addDisburseForm.controls['ifscCode'].setValue(event.bankIFSC);
this.addDisburseForm.controls['bankName'].setValue(event.bankName);
this.addDisburseForm.controls['bankAddress'].setValue(event.branchName);
this.addDisburseForm.controls['accountNo'].setValue(event.accountNo);
}



companyModeOfPaymentChange(value){
this.officeUseForm.controls['companyChequeUTRNo'].setValue('');
  // this.companySelectedBankData = [];
  if(value == 'Cheque'){
    this.isChequeNo = true;
    this.isUTRNo = false;
    this.managerFlag = true;
    this.companyBankDetails = false;
    this.notDisabled = true;
  }else if(value == 'Bank Transfer'){
    this.isChequeNo = false;
    this.isUTRNo = true;
    this.managerFlag = false;
    this.companyBankDetails = false;
    this.notDisabled = true;

  }else if(value == 'Through Salary'){
    this.companyBankDetails = true;
    this.notDisabled = false;
  }
}
  /** Submit Disburse form */
  addDisburseData() {
    this.addDisburseForm.controls['approvedAmount'].setValue(this.approvedAmount);
    this.addDisburseForm.controls['loanApplicationId'].setValue(this.loanApplicationId);
    this.addDisburseForm.controls['amount'].setValue(parseInt(this.addDisburseForm.controls['amount'].value));
    this.addDisburseForm.controls['accountNo'].setValue(parseInt(this.addDisburseForm.controls['accountNo'].value))

    const formData  = new FormData();
    formData.append('loanDisbursement', JSON.stringify(this.addDisburseForm.value));

    for (const loanDisbursementDocument of this.listDoc) {
      formData.append('loanDisbursementDocument' , loanDisbursementDocument);
    }
    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    this.loanService.saveDisburseData(formData).subscribe(
      res => {
        // this.toaster.success('', 'Disbursement data Saved Successfully!!')
      this.alertService.sweetalertMasterSuccess('Disbursement data Saved Successfully!!', '' );
      console.log("formData",JSON.stringify(formData))
      this.router.navigate(['/loan/application']);

      }
    )
    }
/** Submit Disburse form End */
updateDisbursementReq()
{
  this.addDisburseForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(this.addDisburseForm.controls['expectedPaymentDate'].value, "yyyy-MM-dd"));
  this.addDisburseForm.controls['accountNo'].setValue(parseInt(this.addDisburseForm.controls['accountNo'].value));
  this.loanService.updateDisbursementReq(this.addDisburseForm.value).subscribe(
    res =>
  {
    this.alertService.sweetalertMasterSuccess('Disbursement data Updated Successfully!!', '' );
    this.router.navigate(['/loan/application']);

  }
  )
}
getByIdDisbursementReq(id)
{
  this.loanService.getByIdDisbursementReq(id).subscribe(res=>
    {
  this.getByIdDisbursementReqData = res.data.results;
  // console.log(" this.getByIdDisbursementReqData", this.getByIdDisbursementReqData)
    })
}
reset()
{
  this.bankData = [];
  this.companySelectedBankData = [];
}

// ........................upload Document..............................................................

public UploadModal(template: TemplateRef<any>,rowIndex,data) {
  this.docName = data.documentName;
  this.rowIndexData = rowIndex;
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

public onMasterUpload(
  event: { target: { files: string | any[] } },
  docType: string
) {
  //console.log('event::', event);
  //console.log('docType::', docType);

  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
          const data = {
            name: file.name,
          };

          this.urlArray.push(data);
          this.listDoc.push(file);
          console.log(this.listDoc)
          this.documentArray[this.rowIndexData].listDoc.push(data)
        }

        console.log("this.documentArray: "+ JSON.stringify(this.documentArray))

  }
}

public removeSelectedLicMasterDocument(index: number, docType: string) {
      this.listDoc.splice(index, 1);
      this.documentArray[index].listDoc =[]
}


uploaddoc()
{
        this.documentDetailRequestDTOList.push({
          "documentRemark":this.remarkList,
          "documentType": this.docName,
          "doucumentPassword": this.documentPassword
        })
}

forGreteramounthanyettodisburse(value)
{
  if(value > this.yetToDisbursementAmt){
   this.amountisgraterthan = true;
  }else{
   this.amountisgraterthan = false;

  }
}

ofcUseAmount(value){
  console.log("this.companyDisbursedAmount",this.companyDisbursedAmount)
  if(value > this.companyDisbursedAmount){
    // alert('hiii')
   this.ofcUseAmtFlag = true;
   this.alertService.sweetalertWarning('Enter less than disbursement amount' );

  }else{
    // alert('hiii22')
    this.ofcUseAmtFlag = false;
  }
}

forlessthanempoyessamount(value)
{
  if(value >= this.yetToDisbursementAmt){
    this.lessthanamout = true;
   this.alertService.sweetalertWarning('Enter less than Yet to disbursement amount' );

   }else{
    this.lessthanamout = false;

   }
}

// .................Account number validateVerticalPosition..........................................

checkAccountNumber(number){
  if(number == this.addDisburseForm.controls['accountNo'].value){
    this.accountnoflag = true;
  }else{
    this.accountnoflag = false
  }
}
viewAccNo(value){

this.viewAccNoFlag = false;

}

viewAccNo1(value){
  this.viewAccNoFlag = true;
}
viewTotalAccountNo(value)
{
 this.viewTotalAccNoFlag = false;
}
viewTotalAccountNo1(value)
{
 this.viewTotalAccNoFlag = true;

}

resetDisbuesementForm()
{
  this.addDisburseForm.enable();
  this.addDisburseForm.reset();
}
cancle()
{
  this.router.navigate(['/loan/application']);

}
// ...................................emp bank details excel ...................................
empBankExportAsXLSX()
{
  this.excelData = [];
  this.header = []
  this.header =["Bank IFSC","Bank Name","Branch Name","Account Number"]
  this.bankData.forEach(element => {
    let obj = {
      "Bank IFSC":element.bankIFSC,
      "Bank Name":element.bankName,
      "Branch Name": element.branchName,
      "Account Number": element.accountNo,

    }
    this.excelData.push(obj)
  });
  this.excelservice.exportAsExcelFile(this.excelData, 'Employee Bank details','Employee Bank details',this.header);
}
// ......................................company bank details excel......................................
companyBankExportAsXLSX(){
  this.excelData = [];
  this.header = []
  this.header =["Bank IFSC","Bank Name","Branch Name","Account Number"]
  this.companySelectedBankData.forEach(element => {
    let obj = {
      "Bank IFSC":element.bankIFSC,
      "Bank Name":element.bankName,
      "Branch Name": element.branchName,
      "Account Number": element.accountNo,

    }
    this.excelData.push(obj)
  });
  this.excelservice.exportAsExcelFile(this.excelData, 'Employee Bank details','Employee Bank details',this.header);
}
// .........................................when disbursement is yes approvals api ..............................................
postApproverDetails() //approval details api
{
  let data =
  {
    // this.employeeMasterId -1
    // this.approvalWorkFlowIdd
    "employeeMasterId":1 ,
    "flag":"ApproversInfo",
    "workflowMasterHeaderId":20
  }
  this.loanService.postApproverDetails(data).subscribe(res =>
    {
      this.postApproverDetailsData = res.data.results[0];
      // console.log(" this.postApproverDetailsData", this.postApproverDetailsData);
    this.postApproverDetailsData.forEach(element => {
    this.approverEmpCode = element.approverEmpCode;
    this.sequence = element.sequence;
    this.approverName = element.approverName;
    // console.log(" this.approverEmpCode", this.approverEmpCode);

    });

    })
}

postLoanApproval(value) //approval btn api
{
let data = {
    "action": "Done",
    "actionDate": "2021-11-25T11:34:28.400Z", //current date
    "active": true,
    "approverCode":this.approverEmpCode,
    "approverLevel": 'this.sequence',
    "approverName": this.approverName,
    "createDateTime": "2021-11-25T11:34:28.400Z",
    "createdBy": "string",
    "lastModifiedBy": "string",
    "lastModifiedDateTime": "2021-11-25T11:34:28.400Z",
    "loanApproverDetailId": 0,
    "loanApplicationId":this.loanApplicationId,
    "loanRescheduleRequestDetailsId": 0,
    "approvalRemark":this.approvalRemark,
    "status": value
}
      console.log("this.postApproverDetailsData",JSON.stringify(data));

  this.loanService.postLoanApproval(data).subscribe(res =>
    {
      if(value == 'Approved'){
      this.alertService.sweetalertMasterSuccess('Disbursement Application Approved Successfully!!', '' );
      // this.router.navigate(['/loan/loan-approval']);
      // console.log("this.postApproverDetailsData",JSON.stringify(this.postApproverDetailsData));
      }else{
      this.alertService.sweetalertMasterSuccess('Disbursement Application Send Back Successfully!!', '' );
      }

    })
    this.approvalRemark = '';
}
// .........................................when disbursement is no ofc use api ..............................................

disbursmentPutOfcUse(value){
  this.officeUseForm.controls['loanDisbursementPaymentDetailsId'].setValue(this.loanDisbursementPaymentDetailsId)
  this.officeUseForm.controls['loanApplicationId'].setValue(this.loanApplicationIdforOfcUse)
  this.officeUseForm.controls['companyBankMappingId'].setValue(this.companyBankMappingId)
  this.officeUseForm.controls['approvedAmount'].setValue(this.approvedAmount)
  this.officeUseForm.controls['status'].setValue(value);
  this.officeUseForm.controls['companyDisbursedAmount'].setValue(parseInt(this.officeUseForm.controls['companyDisbursedAmount'].value))
  this.loanService.disbursmentPutOfcUse(this.officeUseForm.value).subscribe(res =>
    {
      this.alertService.sweetalertMasterSuccess('Disbursement Trasaction Saved Successfully!!', '' );
      // this.router.navigate(['/loan/loan-approval']);
    })
    this.officeUseForm.reset();
}

close(){
  this.router.navigate(['/loan/loan-approval']);

}
resetOfcUseForm(){
  this.officeUseForm.reset();
}
closeOfcUseForm(){
  this.router.navigate(['/loan/loan-approval'])
}
}
