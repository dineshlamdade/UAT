import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
const html2canvas: any = _html2canvas;



@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss']
})
export class AdhocComponent implements OnInit {
  addAdhocForm: FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
  loanDetails:any;


  constructor(public formBuilder: FormBuilder,
    private loanService: LoanService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private excelservice: ExcelService,
    public sanitizer: DomSanitizer,
    private toaster: ToastrService,
    private router: Router) {

      this.addAdhocForm = new FormGroup({
        loanApplicationNumber: new FormControl(''),
        active: new FormControl(true),
        applicationDate: new FormControl(new Date()),
        employeeModeOfPayment: new FormControl(''),
        ifscCode: new FormControl(''),
        bankAddress: new FormControl(''),
        bankName: new FormControl(''),
        paymentDate: new FormControl(new Date()),
        chequeUtrNo: new FormControl(''),
        amount: new FormControl(''),
        remark: new FormControl(''),

        adhocPaymentDetailsId: new FormControl('334'),
        loanApplicationId: new FormControl('32'),
        loanType: new FormControl('Personal Loan'),
        discription: new FormControl('Personal Loan'),
        repaymentType: new FormControl(),
        balance: new FormControl('0.0'),
        payee: new FormControl(),
        payeeType: new FormControl(),
         createDateTime: new FormControl(new Date()),
         createdBy: new FormControl('Ajay'),
         lastModifiedDateTime: new FormControl(new Date()),
        // transactionNo: new FormControl(''),
         lastModifiedBy: new FormControl(''),
         loanDisbursementPaymentDetailsId:new FormControl(492),
        // status: new FormControl(''),
        // modeofPayment: new FormControl('self'),
        // employeeBankInfoId: new FormControl(2),
        // approvedAmount: new FormControl(100000),


        //

        // employeeBankInfoId: 2,

      });
    }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    this.getLoanDetails();
  }
  getEmpMasterDetails()// temp id is used
  {
    this.loanService.getEmpMasterDetails(60).subscribe(
      res =>
      {
        this.perticularEmpDetails = res.data.results[0][0];
      })
  }

  /** Submit Adhoc form */
  addAdhocData() {
    console.log(this.addAdhocData);
    this.loanService.saveAdhocData(this.addAdhocForm.value).subscribe(
      res => {
        this.toaster.success('', 'Loan data Saved Successfully!!')

      }
    )
    }
/** Submit Disburse form End */

// Get Loan details

getLoanDetails() { // temp id is used

  this.loanService.getLoanDetails('Car Loan').subscribe((res) => {
    this.loanDetails = res.data.results[0];
    // console.log(this.loanDetails);
  });
}
// Get Loan details End

cancel()
{

}
}
