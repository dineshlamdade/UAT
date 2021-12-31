import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
const html2canvas: any = _html2canvas;
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BookType } from 'xlsx/types';
import { transform } from 'html2canvas/dist/types/css/property-descriptors/transform';



@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss']
})
export class AdhocComponent implements OnInit {
  addAdhocForm: FormGroup;
  officeUseForm : FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
  loanDetails:any;
  userData: any;
  employeeMasterId: any;
  selectedLoanData: any;
  loanType2: any;
  loanDescription: any;
  loanApplicationId: any;
  myDate: Date = new Date();
  public modalRef: BsModalRef;
  bankData: any;
  today = new Date();
  isSave:boolean= true;
  isUpdate:boolean=false;
  modeOfPayment: any;
  isChequeNo:boolean ;
  isUTRNo:boolean ;
  getAdhocBalanceData: any;
  // currentDate:Date = new Date();
  balance: any;
  currentDate: string;
  currentDate2 = new Date();
  amountisnotgraterthan:boolean;
  dateOfPayment: Date;
  disabledbtn:boolean=false;
  showbtn:boolean = true;
  loanApplicationId2: any;
  header: any[];
  excelData: any[];
  isEditable:boolean=true;
  isView:boolean = false;
  viewMode:boolean= false;
  payeeValue: any;
  userName2: any;
  managerFlag:boolean = true;
  loanApprEditTimeBtns:boolean=false;
  loanAppBtns:boolean = true;
  selectedLoanDataForApproval: any;
  selectedEmployee: any;
  // addAdhocForm: any;
  multiplEmpFlag:boolean = false;
  index: number;
  userName: any;
  companyId: any;
  ofcUseBtns: boolean = false;
  employeeModeOfPayment: any =[];
  approvalEmpMasterId: any;
  companySelectedBankData: any;
  companyBankMappingId: any;
  loanApplicationIdForOfcUse: any;
  employeeMasterIdbyDefault: any;
  employeeModeOfPaymentForOfcUse: any;
  amountForOfcUse: any;
  loanBalance :any;
  loanApplicationIdforOfcUse: any;
  adhocPaymentDetailsId: any;
  cmpnybankDetailsInfoFlag : boolean = false;
  constructor(public formBuilder: FormBuilder,
    private loanService: LoanService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private excelservice: ExcelserviceService,
    public sanitizer: DomSanitizer,
    private toaster: ToastrService,
    private authService: AuthService,
    private alertService: AlertServiceService,
    private router: Router,
    ) {

      this.addAdhocForm = new FormGroup({
        active: new FormControl(true),
        applicationDate: new FormControl(new Date()),
        employeeModeOfPayment: new FormControl(''),
        ifscCode: new FormControl(''),
        bankAddress: new FormControl(''),
        bankName: new FormControl(''),
        expectedPaymentDate: new FormControl(new Date()),
        chequeUtrNo: new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        amount: new FormControl(''),
        remark: new FormControl(''),
        adhocPaymentDetailsId: new FormControl(0),
        loanApplicationId: new FormControl(0),
        loanApplicationNumber : new FormControl(0),
        repaymentType: new FormControl(''),
         createDateTime: new FormControl(new Date()),
         createdBy: new FormControl(''),
         lastModifiedDateTime: new FormControl(new Date()),
         lastModifiedBy: new FormControl(''),
         transactionNo:new FormControl(),
      });

      this.officeUseForm = new FormGroup({
        adhocPaymentDetailsId: new FormControl(0),
        amountReceived: new FormControl(0),
        businessCycleId:  new FormControl(0),
        companyAccountNo:  new FormControl(''),
        companyBankAddress:  new FormControl(''),
        companyBankMappingId:  new FormControl(0),
        companyBankName:  new FormControl(''),
        companyChequeUTRNo:  new FormControl(0,[Validators.required,Validators.pattern(/^[0-9]\d*$/)]),
        companyDateOfPayment:  new FormControl(new Date()),
        companyDisbursedAmount:  new FormControl(0),
        companyIfscCode: new FormControl(''),
        companyPayee:new FormControl(''),
        companyRemark: new FormControl(''),
        createDateTime: new FormControl(new Date()),
        lastModifiedBy: new FormControl(''),
        lastModifiedDateTime:  new FormControl(new Date()),
        loanApplicationId: new FormControl(0),
        loanDisbursementId: new FormControl(0),
        modeofPayment:new FormControl(''),
        status: new FormControl(''),
      })

    this.userData = this.authService.getprivileges()
    this.employeeMasterId = this.userData.UserDetails.employeeMasterId;
    this.userName = this.userData.UserDetails.userName;
    this.companyId = this.userData.UserDetails.companyId;

    if (localStorage.getItem('selectedLoanData') != null) {
      this.selectedLoanData = JSON.parse(localStorage.getItem('selectedLoanData'));
      this.loanType2 = this.selectedLoanData.loanType;
      this.loanDescription = this.selectedLoanData.loanMaster.loanDescription;
      this.loanApplicationId2  = this.selectedLoanData.loanApplicationId;
     this.officeUseForm.disable();
     this.ofcUseBtns = false;
     this.cmpnybankDetailsInfoFlag = true;
      this.getLoanDetails(this.loanType2,this.employeeMasterId);
    }
     if(localStorage.getItem('editTransaction')!= null){
      let formdata = JSON.parse(localStorage.getItem('editTransaction'))
      this.addAdhocForm.patchValue(formdata);
      this.isUpdate = true;
      this.isSave = false;
      this.disabledbtn = false;
      this.showbtn = true;
      //  let newPaymentDate = this.datePipe.transform(new Date(formdata.paymentDate),'yyyy-MMM-dd')
      // this.addAdhocForm.controls['paymentDate'].setValue(newPaymentDate)
      this.currentDate = this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-yyyy');
      // this.addAdhocForm.controls['expectedPaymentDate'].setValue( this.currentDate)
      console.log("adhoc edit time date", this.currentDate)
      this.addAdhocForm.controls['transactionNo'].setValue(formdata.transactionNo)
      if(formdata.employeeModeOfPayment == 'Cheque')
      {
      this.isChequeNo = true;
      this.isUTRNo = false;
      }
      else if(formdata.employeeModeOfPayment == 'Bank Transfer')
      {
        this.isChequeNo = false;
        this.isUTRNo = true;
      }
      // localStorage.removeItem('editTransaction')
      this.getByIdAdhocForm(formdata.adhocPaymentDetailsId)

    }
    if(localStorage.getItem('viewTransaction')!= null){
      let formdata = JSON.parse(localStorage.getItem('viewTransaction'))
      this.addAdhocForm.patchValue(formdata);
      this.addAdhocForm.disable();
      this.isSave = false;
      this.disabledbtn = true;
      this.showbtn = false;
      this.isView = true;
      this.viewMode = true;

      if(formdata.employeeModeOfPayment == 'Cheque')
      {
      this.isChequeNo = true;
      this.isUTRNo = false;
      }
      else if(formdata.employeeModeOfPayment == 'Bank Transfer')
      {
        this.isChequeNo = false;
        this.isUTRNo = true;
      }
      // let newPaymentDate = this.datePipe.transform(new Date(formdata.paymentDate),'yyyy-MMM-dd')
      // this.addAdhocForm.controls['paymentDate'].setValue(newPaymentDate)
      this.currentDate = this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-yyyy');

      this.addAdhocForm.controls['transactionNo'].setValue(formdata.transactionNo)
    //  localStorage.removeItem('viewTransaction')

    }
    if(localStorage.getItem('EditLoanApprovalData')!= null){
      let formdata = JSON.parse(localStorage.getItem('EditLoanApprovalData'))
      this.addAdhocForm.patchValue(formdata);
      this.addAdhocForm.disable();
      // this.addDisburseForm.controls['employeeModeOfPayment'].enable();
      this.payeeValue = formdata.payeeType;
      this.userName2 = formdata.payee;
      this.addAdhocForm.controls['payee'].setValue(this.userName2);
      // this.isViewbankDetails2 = true;
      // this.isNameSelected2 = false;
      this.managerFlag = false;
      this.loanApprEditTimeBtns = true;
      this.loanAppBtns = false;

    }
    if(localStorage.getItem('ViweLoanApprovalData')!= null){
      let formdata = JSON.parse(localStorage.getItem('ViweLoanApprovalData'))
      this.addAdhocForm.patchValue(formdata);
      this.payeeValue = formdata.payeeType;
      this.userName2 = formdata.payee;
      this.addAdhocForm.controls['payee'].setValue(this.userName2);
      this.addAdhocForm.disable();
    }

    if(localStorage.getItem('selectedLoanForApproval') != null){
      this.selectedLoanDataForApproval = JSON.parse(localStorage.getItem('selectedLoanForApproval'));
      this.addAdhocForm.patchValue(this.selectedLoanDataForApproval[0]);
      this.addAdhocForm.disable();
      this.officeUseForm.enable();

      this.loanAppBtns = false;
      this.disabledbtn = true;
      this.showbtn = false;
      this.viewMode = true;

      this.employeeModeOfPayment = this.selectedLoanDataForApproval[0].employeeModeOfPayment;
      this.index = 0 ;
      this.selectedEmployee = this.selectedLoanDataForApproval[this.index]
      console.log("this.selectedLoanForApproval",this.selectedEmployee);
      this.loanDescription = this.selectedLoanDataForApproval[this.index].loanDiscription;

      this.currentDate = this.datePipe.transform(new Date(),'YYYY-dd-MM');
      this.loanApplicationId2 = this.selectedLoanDataForApproval[this.index].loanApplicationId
      this.getAdhocBalance(this.currentDate,this.selectedLoanDataForApproval[this.index].loanApplicationId);
      console.log("this.loanApplicationIdForOfcUse",this.selectedLoanDataForApproval[this.index].loanApplicationId)

      this.getLoanDetails(this.selectedLoanDataForApproval[0].loanType,this.selectedLoanDataForApproval[0].employeeMasterId)
      this.employeeModeOfPaymentForOfcUse = this.selectedLoanDataForApproval[this.index].employeeModeOfPayment;
      this.amountForOfcUse = this.selectedLoanDataForApproval[this.index].amount;
      this.officeUseForm.controls['modeofPayment'].setValue(this.employeeModeOfPaymentForOfcUse);
      this.officeUseForm.controls['amountReceived'].setValue( this.amountForOfcUse);
      this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMasterId;
      this.adhocPaymentDetailsId =  this.selectedLoanDataForApproval[this.index].adhocPaymentDetailsId;
      this.loanApplicationIdforOfcUse = this.selectedLoanDataForApproval[this.index].loanApplicationId;

      if(this.selectedLoanDataForApproval.length > 1){
        this.multiplEmpFlag = true;
        this.ofcUseBtns = true;
       }else{
         this.multiplEmpFlag = false;
         this.ofcUseBtns = false;
       }

      if(this.userName != 'AjayS'){ // employee side
        this.ofcUseBtns = false;
        this.loanAppBtns = true;
        this.officeUseForm.disable();
        this.addAdhocForm.enable();
      }else{                        // admin side
        this.ofcUseBtns = true;
        this.loanAppBtns = false;
        this.officeUseForm.enable();
        this.addAdhocForm.disable();
      }

      if(this.employeeModeOfPayment == 'Bank Transfer')
        this.isChequeNo = false;
        this.isUTRNo = true;
      }else if (this.employeeModeOfPayment == 'Cheque'){
        this.isChequeNo = true;
        this.isUTRNo = false;
      }

    localStorage.clear();
    }
    nextRecord(){
      this.index = this.index + 1;
      this.selectedEmployee = this.selectedLoanDataForApproval[this.index];
      this.addAdhocForm.patchValue(this.selectedLoanDataForApproval[this.index]);
      this.getLoanDetails(this.selectedLoanDataForApproval[this.index].loanType,this.selectedLoanDataForApproval[this.index].employeeMasterId)
      this.loanDescription = this.selectedLoanDataForApproval[this.index].loanDiscription;
      // this.getDisbursementData(this.selectedLoanDataForApproval[this.index].loanApplicationId)
      this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMasterId
       console.log("this.approvalEmpMasterId next",this.approvalEmpMasterId)
       this.getEmpMasterDetails(this.approvalEmpMasterId)
    }

   priviousRecord(){
    this.index = this.index - 1;
    this.selectedEmployee = this.selectedLoanDataForApproval[this.index];
    this.addAdhocForm.patchValue(this.selectedLoanDataForApproval[this.index]);
    this.getLoanDetails(this.selectedLoanDataForApproval[this.index].loanType,this.selectedLoanDataForApproval[this.index].employeeMasterId);
    this.loanDescription = this.selectedLoanDataForApproval[this.index].loanDiscription;
    // this.getDisbursementData(this.selectedLoanDataForApproval[this.index].loanApplicationId)
    this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMasterId
     console.log("this.approvalEmpMasterId privious",this.approvalEmpMasterId)
     this.getEmpMasterDetails(this.approvalEmpMasterId)
  }
  ngOnInit(): void {
    this.getEmpMasterDetails(this.approvalEmpMasterId);
    this.getBankDetailsPopUp();
    this.getCmpnyBankDetailsPopUp(this.companyId);
    this.getAdhocBalance(this.currentDate, this.loanApplicationId2);
    if(!this.isUpdate && !this.viewMode){
      this.currentDate = this.datePipe.transform(new Date(),'YYYY-MM-dd');
    }
  }
  getEmpMasterDetails(id)
  {
    this.loanService.getEmpMasterDetails(this.approvalEmpMasterId).subscribe(
      res =>
      {
        this.perticularEmpDetails = res.data.results[0][0];
      })
  }

  /** Submit Adhoc form */
  addAdhocData() {
    // this.addAdhocForm.controls['status'].setValue(value)
    this.addAdhocForm.controls['amount'].setValue(parseInt(this.addAdhocForm.controls['amount'].value));
    this.addAdhocForm.controls['loanApplicationId'].setValue(this.loanApplicationId2);
    console.log("loanApplicationId2",this.loanApplicationId2)
    this.addAdhocForm.controls['repaymentType'].setValue(this.addAdhocForm.controls['repaymentType'].value)
    this.addAdhocForm.controls['expectedPaymentDate'].setValue(this.addAdhocForm.controls['expectedPaymentDate'].value)
    this.loanService.saveAdhocData(this.addAdhocForm.value).subscribe(
      res => {
        this.alertService.sweetalertMasterSuccess('Adhoc data Saved Successfully!!', '' );
        this.router.navigate(['/loan/application']);

      }
    )
    }
/** Submit Disburse form End */
    updateAdhocForm()
    {
     this.addAdhocForm.controls['amount'].setValue(parseInt(this.addAdhocForm.controls['amount'].value));
    this.addAdhocForm.controls['loanApplicationId'].setValue(this.loanApplicationId2);
    this.addAdhocForm.controls['repaymentType'].setValue(this.addAdhocForm.controls['repaymentType'].value)
    this.addAdhocForm.controls['expectedPaymentDate'].setValue(this.addAdhocForm.controls['expectedPaymentDate'].value)

     this.loanService.updateAdhocForm(this.addAdhocForm.value).subscribe(res =>
    {
      this.alertService.sweetalertMasterSuccess('Adhoc data Updated Successfully!!', '' );
      this.router.navigate(['/loan/application']);

    })
}
// Get Loan details

getByIdAdhocForm(id)
{
  this.loanService.getByIdAdhocForm(id).subscribe(res =>
    {
    })
}

getLoanDetails(loanType2,id) {
  // alert(loanType2)
    this.loanService.getLoanDetails(loanType2,this.employeeMasterId).subscribe((res) => {
    this.loanDetails = res.data.results[0];
    this.loanApplicationId = this.loanDetails.loanApplicationId;
  });
}
// Get Loan details End

cancel()
{
  this.router.navigate(['/loan/application']);

}

empBankDetailsInfo(template1: TemplateRef<any>,) {
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

ofcUseModeOfpayment(value){
  if(value == 'Cheque'){
    this.isChequeNo = true;
    this.isUTRNo = false;
}else{
  this.isChequeNo = false;
  this.isUTRNo = true;
}
}

onSelectBanksdetails(event: any,index){

  this.bankData.forEach(element => {
    if(element.employeeBankInfoId == event.employeeBankInfoId){
      element.checked = true
    }else if(element.employeeBankInfoId != event.employeeBankInfoId){
      element.checked = false
    }
  });
this.addAdhocForm.controls['ifscCode'].setValue(event.bankIFSC);
this.addAdhocForm.controls['bankName'].setValue(event.bankName);
this.addAdhocForm.controls['bankAddress'].setValue(event.branchName);
// this.addAdhocForm.controls['accountNo'].setValue(event.accountNo);
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
getAdhocBalance(currentDate,id)
{
  // this.loanApplicationId =72
  // this.currentDate = this.datePipe.transform(new Date(),'YYYY-MM-dd')
  this.loanService.getAdhocBalance(this.currentDate ,this.loanApplicationId2).subscribe(res =>
    {
      this.getAdhocBalanceData = res.data.results;
      this.getAdhocBalanceData.forEach(element => {
        this.balance = element.principal;

      });

    });
}
dateChange(value){
  // alert(value)
  this.addAdhocForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(value,'yyyy-MM-dd') )
  this.currentDate = this.datePipe.transform(value,'yyyy-MM-dd')
  this.getAdhocBalance(this.currentDate, this.loanApplicationId)
}
dateChangeForOfc(value){
  this.officeUseForm.controls['companyDateOfPayment'].setValue(this.datePipe.transform(value,'yyyy-MM-dd') )
  this.currentDate = this.datePipe.transform(value,'yyyy-MM-dd')
  this.getAdhocBalance(this.currentDate, this.loanApplicationId)
}
reset()
{
  // this.bankData = [];
}
resetAdhocForm()
{
  this.addAdhocForm.reset();
  this.addAdhocForm.enable();
}
adhocModeOfPayment(value)
{
this.addAdhocForm.controls['chequeUtrNo'].setValue('');
this.modeOfPayment = value;
if(value == 'Cheque')
{
this.isChequeNo = true;
this.isUTRNo = false;

    this.addAdhocForm.controls['ifscCode'].setValue('');
    this.addAdhocForm.controls['bankName'].setValue('');
    this.addAdhocForm.controls['bankAddress'].setValue('');

this.dateOfPayment = new Date();
this.dateOfPayment.setMonth(this.dateOfPayment.getMonth()-2);

// console.log("this.dateOfPayment",this.dateOfPayment)

}else if(value == 'Bank Transfer'){
  this.isChequeNo = false;
  this.isUTRNo = true;

  this.addAdhocForm.controls['ifscCode'].setValue('');
  this.addAdhocForm.controls['bankName'].setValue('');
  this.addAdhocForm.controls['bankAddress'].setValue('');

  this.dateOfPayment = new Date();
  //  this.dateOfPayment.setMonth(this.dateOfPayment.getMonth());
}
}

forGreteramounthanyettodisburse(value)
{
  if(value >= this.balance){
   this.amountisnotgraterthan = true;
   this.alertService.sweetalertWarning('Enter less than loan balance amount' );

  }else{
   this.amountisnotgraterthan = false;

  }
}

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
close(){
  this.router.navigate(['/loan/loan-approval']);

}
resetOfcUseForm(){
  this.officeUseForm.reset();
}
closeOfcUseForm(){
  this.router.navigate(['/loan/loan-approval'])
}
adhocPutOfcUse(value){
  this.officeUseForm.controls['adhocPaymentDetailsId'].setValue(this.adhocPaymentDetailsId)
  this.officeUseForm.controls['loanApplicationId'].setValue(this.loanApplicationIdforOfcUse)
  this.officeUseForm.controls['companyBankMappingId'].setValue(this.companyBankMappingId)
  this.officeUseForm.controls['status'].setValue(value);

  this.officeUseForm.controls['amountReceived'].setValue(this.officeUseForm.value);
  this.loanService.adhocPutOfcUse(this.officeUseForm.value).subscribe(res =>
    {
      this.alertService.sweetalertMasterSuccess('Adhoc Trasaction Saved Successfully!!', '' );
      // this.router.navigate(['/loan/loan-approval']);
    })
    this.officeUseForm.reset();
}

}
