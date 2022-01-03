// import { Component, OnInit } from '@angular/core';
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
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {
  addSettlementForm: FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
  loanDetails:any;
  userData: any;
  employeeMasterId: any;
  selectedLoanData: any;
  loanType2: any;
  loanDescription: any;
  public modalRef: BsModalRef;
  companySelectedBankData: any;
  bankData: any;
  myDate:Date=new Date();
  isSave:boolean=true;
  isUpdate:boolean=false;
  isChequeNo:boolean ;
  isUTRNo:boolean ;
  modeOfPayment: any;
  dateOfPayment: Date;
  disabledbtn:boolean=false;
  showbtn:boolean = true;
  getAdhocBalanceData: any;
  balance: any;
  currentDate: string;
  loanApplicationId2: any;
  excelData: any[];
  header: any[];
  interest: any;
  total: any;
  viewMode:boolean= false;
  isEditable:boolean = true;
  leaveErrorMsg: any;
  loanApprEditTimeBtns:boolean=false;
  loanAppBtns:boolean = true;
  managerFlag:boolean = false;
  loanTypeFromEditData: any;
  editDataEmpMasterId: void;
  loanDescription2: any;
  selectedLoanDataForApproval: any =[];
  selectedEmployee: any;
  index: number;
  multiplEmpFlag:boolean = false;
  constructor(public formBuilder: FormBuilder,
    private loanService: LoanService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private excelservice: ExcelserviceService,
    public sanitizer: DomSanitizer,
    private toaster: ToastrService,
    private authService: AuthService,
    private alertService: AlertServiceService,
    private router: Router,) {

      this.addSettlementForm= new FormGroup({
        loanSettlementPaymentDetailsId: new FormControl(0),
        loanApplicationId: new FormControl(0),
        employeeBankInfoId: new FormControl(2),
        settelmentDate: new FormControl(new Date()),
        remark: new FormControl(''),
        modeOfPayment: new FormControl(''),
        ifscCode: new FormControl(''),
        bankAddress: new FormControl(''),
        bankName: new FormControl(''),
        transactionNo: new FormControl(''),
        chequeUtrNo: new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        principal: new FormControl(''),
        interest: new FormControl(''),
        total: new FormControl(''),
        createdBy: new FormControl('Ajay'),
        createDateTime: new FormControl(new Date()),
        lastModifiedBy: new FormControl('string'),
        lastModifiedDateTime: new FormControl(new Date()),
        active: new FormControl(''),

      })
      this.userData = this.authService.getprivileges()
      this.employeeMasterId = this.userData.UserDetails.employeeMasterId;

      if (localStorage.getItem('selectedLoanData') != null) {
        this.selectedLoanData = JSON.parse(localStorage.getItem('selectedLoanData'));
        this.loanType2 = this.selectedLoanData.loanType;
        this.loanDescription = this.selectedLoanData.loanMaster.loanDescription;
        this.getLoanDetails(this.loanType2,this.employeeMasterId);
      this.loanApplicationId2  = this.selectedLoanData.loanApplicationId;


       }

       if(localStorage.getItem('editTransaction')!= null){
        let formdata = JSON.parse(localStorage.getItem('editTransaction'))
        this.addSettlementForm.patchValue(formdata);
        this.isUpdate = true;
        this.isSave = false;
        this.disabledbtn = false;
        this.showbtn = true;
        this.currentDate = this.datePipe.transform(formdata.settelmentDate,'YYYY-MM-dd');
        this.addSettlementForm.controls['transactionNo'].setValue(formdata.transactionNo)
        if(formdata.modeOfPayment == 'Cheque')
        {
        this.isChequeNo = true;
        this.isUTRNo = false;
        this.addSettlementForm.controls['chequeUtrNo'].setValue(formdata.chequeUtrNo)
        }
        else if(formdata.modeOfPayment == 'Bank Transfer')
        {
          this.isChequeNo = false;
          this.isUTRNo = true;
          this.addSettlementForm.controls['chequeUtrNo'].setValue(formdata.chequeUtrNo)
        }
        this.getByIdSettelmentForm(formdata.loanSettlementPaymentDetailsId)
      }

      if(localStorage.getItem('viewTransaction')!= null){
        let formdata = JSON.parse(localStorage.getItem('viewTransaction'))
        this.addSettlementForm.patchValue(formdata);
        this.addSettlementForm.disable();
        this.isSave = false;
        this.disabledbtn = true;
        this.showbtn = false;
        this.viewMode = true;
        this.isUpdate = false;
        // this.addSettlementForm.controls['settelmentDate'].setValue(this.datePipe.transform(formdata.settelmentDate,'dd-MMM-YYYY'));
        // console.log("formdata.settelmentDate",this.datePipe.transform(formdata.settelmentDate,'dd-MMM-YYYY'))
        this.currentDate = this.datePipe.transform(formdata.settelmentDate,'YYYY-MM-dd');

        if(formdata.modeOfPayment == 'Cheque')
        {
        this.isChequeNo = true;
        this.isUTRNo = false;
        this.addSettlementForm.controls['chequeUtrNo'].setValue(formdata.chequeUtrNo)
        }
        else if(formdata.modeOfPayment == 'Bank Transfer')
        {
          this.isChequeNo = false;
          this.isUTRNo = true;
          this.addSettlementForm.controls['chequeUtrNo'].setValue(formdata.chequeUtrNo)
        }
        this.getByIdSettelmentForm(formdata.loanSettlementPaymentDetailsId)
        this.addSettlementForm.controls['transactionNo'].setValue(formdata.transactionNo)
        localStorage.removeItem('viewTransaction')

      }

      if(localStorage.getItem('EditLoanApprovalData')!= null){
        let formdata = JSON.parse(localStorage.getItem('EditLoanApprovalData'))
        this.addSettlementForm.patchValue(formdata);
        this.addSettlementForm.disable();
        this.managerFlag = false;
        this.loanApprEditTimeBtns = true;
        this.loanAppBtns = false;
        // this.loanDescription2 = formdata.loanMaster.loanDescription;
        this.loanTypeFromEditData = formdata.loanType;
        this.editDataEmpMasterId = formdata.employeeMasterId;
        this.getLoanDetails(this.loanTypeFromEditData,this.editDataEmpMasterId)
      }

      if(localStorage.getItem('ViweLoanApprovalData')!= null){
        let formdata = JSON.parse(localStorage.getItem('ViweLoanApprovalData'))
        this.addSettlementForm.patchValue(formdata);
        this.addSettlementForm.disable();
      }

      if(localStorage.getItem('selectedLoanForApproval') != null){
        this.selectedLoanDataForApproval = JSON.parse(localStorage.getItem('selectedLoanForApproval'));
        this.addSettlementForm.patchValue(this.selectedLoanDataForApproval[0]);
        this.addSettlementForm.disable();
        this.getLoanDetails(this.selectedLoanDataForApproval[0].loanType,this.selectedLoanDataForApproval[0].employeeMasterId)

        if(this.selectedLoanDataForApproval[0].modeOfPayment == 'Cheque')
        {
        this.isChequeNo = true;
        this.isUTRNo = false;
        this.addSettlementForm.controls['chequeUtrNo'].setValue(this.selectedLoanDataForApproval[0].chequeUtrNo)
        }
        else if(this.selectedLoanDataForApproval[0].modeOfPayment == 'Bank Transfer')
        {
          this.isChequeNo = false;
          this.isUTRNo = true;
          this.addSettlementForm.controls['chequeUtrNo'].setValue(this.selectedLoanDataForApproval[0].chequeUtrNo)
        }
        this.index = 0 ;
        this.selectedEmployee = this.selectedLoanDataForApproval[this.index]
        console.log("this.selectedEmployee",this.selectedEmployee);

        if(this.selectedLoanDataForApproval.length > 1){
         this.multiplEmpFlag = true;
        }else{
          this.multiplEmpFlag = false;
        }
      }
    }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    this.getBankDetailsPopUp();

    if(!this.isUpdate && !this.viewMode){
      this.currentDate = this.datePipe.transform(new Date(),'YYYY-MM-dd');
    }

    this.getAdhocBalance();
    this.addSettlementForm.controls['settelmentDate'].setValue(this.currentDate);

    }

  getEmpMasterDetails()
  {
    this.loanService.getEmpMasterDetails(this.employeeMasterId).subscribe(
      res =>
      {
        this.perticularEmpDetails = res.data.results[0][0];
      })
  }

  /** Add Settlement form */
  addSettlementData() {
      this.addSettlementForm.controls['loanSettlementPaymentDetailsId'].setValue(parseInt(this.addSettlementForm.controls['loanSettlementPaymentDetailsId'].value))
      this.addSettlementForm.controls['loanApplicationId'].setValue(this.loanApplicationId2);
      this.loanService.saveSettlementData(this.addSettlementForm.value).subscribe(
      res => {

        // if(res.status == 200){
          this.alertService.sweetalertMasterSuccess('Settelment data Saved Successfully!!', '' );
          this.router.navigate(['/loan/application']);
        // }
        // else if(res.status.code == "400"){
        this.leaveErrorMsg = res.status["messsage"];
        this.alertService.sweetalertError(this.leaveErrorMsg);
        // }
        }
        )
      //   ,error => {
      //   if(error.error.status.code == '400'){
      //     this.alertService.sweetalertWarning(" LoanSetttlement Already Sumbitted... !");
      //   }
      // }
        }

  updateSettelmentData(){
    this.addSettlementForm.controls['loanSettlementPaymentDetailsId'].setValue(parseInt(this.addSettlementForm.controls['loanSettlementPaymentDetailsId'].value))
    this.addSettlementForm.controls['loanApplicationId'].setValue(this.loanApplicationId2);
      this.loanService.updateSettelmentData(this.addSettlementForm.value).subscribe(
      res =>
      {
        this.alertService.sweetalertMasterSuccess('settelment data updated successfully !','');
        this.router.navigate(['/loan/application']);
      })
  }
/** Submit Settlement form End */
    getByIdSettelmentForm(id)
    {
    this.loanService.getByIdSettelmentForm(id).subscribe(
      res =>
      {

      })
    }

getLoanDetails(loanType2,employeeMasterId) { // temp id is used

  this.loanService.getLoanDetails(loanType2 ,employeeMasterId).subscribe((res) => {
    this.loanDetails = res.data.results[0];
    // console.log(this.loanDetails);
  });
}
cmpnybankDetailsInfo(template2: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template2,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}
bankDetailsInfo(template1: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template1,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}
// getCmpnyBankDetailsPopUp(){
//   this.loanService.getCompanyBankMasterDetails().subscribe(res =>{
//     this.companySelectedBankData = res.data.results;
//     // this.mappingDetails = this.companySelectedBankData.mappingDetails[0];

//   })
// }
getBankDetailsPopUp(){
  this.loanService.getBankMasterDetails().subscribe(res =>{
    this.bankData = res.data.results[0];
  })
}
onSelectBanksdetails1(event: any,index){

  this.bankData.forEach(element => {
    if(element.employeeBankInfoId == event.employeeBankInfoId){
      element.checked = true
    }else if(element.employeeBankInfoId != event.employeeBankInfoId){
      element.checked = false
    }
  });
this.addSettlementForm.controls['ifscCode'].setValue(event.bankIFSC);
this.addSettlementForm.controls['bankName'].setValue(event.bankName);
this.addSettlementForm.controls['bankAddress'].setValue(event.branchName);
// this.addDisburseForm.controls['accountNo'].setValue(event.accountNo);
}

settelmentModeOfPayment(value)
{
  this.addSettlementForm.controls['chequeUtrNo'].setValue('');
this.modeOfPayment = value;
if(value == 'Cheque')
{
this.isChequeNo = true;
this.isUTRNo = false;

    this.addSettlementForm.controls['ifscCode'].setValue('');
    this.addSettlementForm.controls['bankName'].setValue('');
    this.addSettlementForm.controls['bankAddress'].setValue('');

this.dateOfPayment = new Date();
// this.dateOfPayment.setMonth(this.dateOfPayment.getMonth()-2);

// console.log("this.dateOfPayment",this.dateOfPayment)

}else if(value == 'Bank Transfer'){
  this.isChequeNo = false;
  this.isUTRNo = true;

  this.addSettlementForm.controls['ifscCode'].setValue('');
  this.addSettlementForm.controls['bankName'].setValue('');
  this.addSettlementForm.controls['bankAddress'].setValue('');

  this.dateOfPayment = new Date();
  //  this.dateOfPayment.setMonth(this.dateOfPayment.getMonth());
}
}

dateChange(value){
  // alert(value)
  this.addSettlementForm.controls['settelmentDate'].setValue(this.datePipe.transform(value,'yyyy-MM-dd') )
  this.currentDate = this.datePipe.transform(value,'yyyy-MM-dd')
  this.getAdhocBalance()
}
getAdhocBalance()
{
  // this.loanApplicationId =72
  this.loanService.getAdhocBalance(this.currentDate , this.loanApplicationId2).subscribe(res =>
    {
      this.getAdhocBalanceData = res.data.results;
      this.getAdhocBalanceData.forEach(element => {
        this.balance = element.principal;
        this.interest = element.interest;
        this.total = element.total;

        this.addSettlementForm.controls['principal'].setValue( this.balance)
        this.addSettlementForm.controls['interest'].setValue( this.interest)
        this.addSettlementForm.controls['total'].setValue( this.total)

        // console.log("this.getAdhocBalanceData",this.getAdhocBalanceData)
        // console.log("this.interest",this.interest);
      });

    });
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
close()
{
  this.router.navigate(['/loan/application'])
}
}
