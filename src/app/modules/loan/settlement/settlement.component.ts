// import { Component, OnInit } from '@angular/core';
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
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {
  addSettlementForm: FormGroup;
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

      this.addSettlementForm= new FormGroup({
        loanSettlementPaymentDetailsId: new FormControl(''),
        loanApplicationId: new FormControl(5),
        employeeBankInfoId: new FormControl(2),
        settelmentDate: new FormControl(new Date()),
        remark: new FormControl(''),
        modeOfPayment: new FormControl(''),
        ifscCode: new FormControl(''),
        bankAddress: new FormControl(''),
        bankName: new FormControl(''),
        transactionNo: new FormControl(''),
        chequeUtrNo: new FormControl(''),
        principal: new FormControl(''),
        interest: new FormControl(''),
        total: new FormControl(''),
        createdBy: new FormControl('Ajay'),
        createDateTime: new FormControl(new Date()),
        lastModifiedBy: new FormControl('string'),
        lastModifiedDateTime: new FormControl(new Date()),
        active: new FormControl(),
      
      })
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

  /** Add Settlement form */
  addSettlementData() {
    console.log(this.addSettlementData);
    this.loanService.saveSettlementData(this.addSettlementForm.value).subscribe(
      res => {
        this.toaster.success('', 'Loan data Saved Successfully!!')

      }
    )
    }
/** Submit Settlement form End */


getLoanDetails() { // temp id is used
  
  this.loanService.getLoanDetails('Car Loan').subscribe((res) => {
    this.loanDetails = res.data.results[0];
    // console.log(this.loanDetails);
  });
}

}
