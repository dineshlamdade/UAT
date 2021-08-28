//  import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from '../loan.service';

import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from 'html2canvas';

import { LoanModule } from '../loan.module';
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
  // loanForm: FormGroup;
  // updatedData: any;
  // public modalRef: BsModalRef;
  // public urlSafe: SafeResourceUrl;
  // applicationDate: any;
  // possessionDate: any;
  // display: boolean;
  // editflag: boolean = false;
  // isShown: boolean = true;
  // payeeList: Array<any> = [];
  // modePay: Array<any> = [];

  isNameSelected: boolean;
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "Bank Transfer") {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }


  constructor(
    public formBuilder: FormBuilder,
    private loanService: LoanService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private excelservice: ExcelService,
    public sanitizer: DomSanitizer,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.addDisburseForm = new FormGroup({
      accountNo: new FormControl(''),
      active: new FormControl(true),
      amount: new FormControl(''),
      bankAddress: new FormControl(''),
      bankName: new FormControl(''),
      createDateTime: new FormControl(new Date()),
      createdBy: new FormControl('Ajay'),
      expectedPaymentDate: new FormControl(new Date()),
      ifscCode: new FormControl(''),
      transactionNo: new FormControl(''),
      lastModifiedBy: new FormControl(''),
      employeeModeOfPayment: new FormControl(''),
      status: new FormControl(''),
      modeofPayment: new FormControl('self'),
      employeeBankInfoId: new FormControl(2060),
      approvedAmount: new FormControl(),
      lastModifiedDateTime: new FormControl(new Date()),
      payee: new FormControl(''),
      payeeType: new FormControl(''),
      remark: new FormControl(''),
      loanApplicationId:new FormControl(32),
      loanDisbursementPaymentDetailsId:new FormControl(610),
     
     
      // employeeBankInfoId: new FormControl(2)
      // employeeBankInfoId: 2,
      
    });
  }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    // this.getEmpBankDetails();
    this.getLoanDetails();
    this.getBankDetailsPopUp();
    this.getCmpnyBankDetailsPopUp();
    // this.getPayeeType()
    // this.getModePayment();

    this.modeOfPay=[{name:'Cheque'},{name:'Bank Transfer'},{name:'Through Salary'}];
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


  // Get Employeee details

  getEmpMasterDetails() { // temp id is used
    this.loanService.getEmpMasterDetails(60).subscribe((res) => {
      this.perticularEmpDetails = res.data.results[0][0];
    });
  }
  // Get Employeee details End

// Get Loan details

getLoanDetails() { // temp id is used
  
  this.loanService.getLoanDetails('Car Loan').subscribe((res) => {
    this.loanDetails = res.data.results[0];
    console.log(this.loanDetails);
  });
}
// Get Loan details End

getBankDetailsPopUp(){
  this.loanService.getBankMasterDetails().subscribe(res =>{
    this.bankData = res.data.results[0];
  })
}

getCmpnyBankDetailsPopUp(){
  this.loanService.getCompanyBankMasterDetails().subscribe(res =>{
    this.bankData = res.data.results[0];
  })
}
  
  /** Submit Disburse form */
   addDisburseData() {
    console.log(this.addDisburseData);
    this.loanService.saveDisburseData(this.addDisburseForm.value).subscribe(
      res => {
        this.toaster.success('', 'Loan data Saved Successfully!!')

      }
    )
    }
/** Submit Disburse form End */
  
// Get Employeee Bank details

// getEmpBankDetails() { 
//   this.loanService.getEmpBankDetails(1).subscribe((res) => {
//     this.user1 = res.data.results[0][0];
//   });
// }



// getBankDetailsPopUp(){
//   this.bankData =[]
//   this.loanService.getBankMasterDetails().subscribe(res =>{
//     let bankDataList = res.data.results;
//     bankDataList.forEach(element => {
//       this.bankData.push({
//         'ifscCode':element.ifscCode,
//         'bankName' : element.bankName,
//         'branchName':element.branchName,
//         'accountNumber' : element.mappingDetails.accountNumber
//       })
      
//     });
//   })
// }
// Get Employeee Bank details End



bankDetailsInfo(template: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}
cmpnybankDetailsInfo(template1: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template1,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}

// onSelectBanksdetails(event: any, row: any){
//   if(event.checked){

//    this.bankData.push({
//      'ifscCode':row.bankIFSC,
//      'bankName':row.bankName,
//      'branchName':row.branchName,
     
//     })
//     console.log("Row Data is: "+ JSON.stringify(this.row))

//   }
// }
// onSelectBanksdetails(){
//   this.checkedList = [];
//   for (var i = 0; i < this.checklist.length; i++) {
//     if(this.checklist[i].isSelected)
//     this.checkedList.push(this.checklist[i]);
//   }
//   this.checkedList = JSON.stringify(this.checkedList);
// }

}

