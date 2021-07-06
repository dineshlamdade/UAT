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
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss']
})
export class DisbursementComponent implements OnInit {
  AddLoanForm: FormGroup;
  

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService, public disbservice: LoanService, public toster: ToastrService,
    private datePipe: DatePipe, private excelservice: ExcelService, public sanitizer: DomSanitizer,) {
      this.AddLoanForm = this.formBuilder.group(
        {
          "accountNo": new FormControl(''),
          "active": new FormControl(true),
          "amount":new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
          "bankAddress": new FormControl("string"),
          "bankName": new FormControl("string"),
          "createDateTime": new FormControl(new Date()),
          "createdBy": new FormControl('Ajay'),
          "expectedPaymentDate": new FormControl(new Date()),
          "ifscCode": new FormControl(""),
          "loanApplicationId": new FormControl(""),
          "lastModifiedBy": new FormControl("string"),
         "loanDisbursementId": new FormControl(""),
          "lastModifiedDateTime": new FormControl(new Date()),
          "payee": new FormControl("string"),
          "remark": new FormControl('')
        })

        // deleteLoanScheduleByID() {
        //   this.disbservice .deleteLoanScheduleByID(this.tempLoanMasterScheduleId).subscribe(res => {
      
        //   })
        // .subscribe(
        //   data  => {
        //   console.log("POST Request is successful ", data);
        //   },
        //   error  => {
          
        //   console.log("Error", error);
          
        //   }
     }

  ngOnInit(): void {
   
  }

 
}
