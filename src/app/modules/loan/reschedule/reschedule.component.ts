import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from '../loan.service'

import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";

import { LoanModule } from '../loan.module';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {
  addRescheduleForm: FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
  loanDetails:any;
  constructor(public formBuilder: FormBuilder,private loanService: LoanService,private datePipe: DatePipe,
    private modalService: BsModalService,private excelservice: ExcelService, public sanitizer: DomSanitizer,
    private toaster: ToastrService,
    private router: Router) { 
      this.addRescheduleForm = new FormGroup({
        loanRescheduleRequestDetailsId: new FormControl('0'),
        active: new FormControl(false),
        loanApplicationId: new FormControl('5'),
        transactionNo: new FormControl(''),
        rescheduleType: new FormControl(''),
        effectiveDate: new FormControl(new Date()),
        noOfInstallmentToReschedule: new FormControl(''),
        //expectedPaymentDate: new FormControl(new Date()),
        propsedPrincipal: new FormControl(''),
        propsedEMI: new FormControl(''),
        status: new FormControl('null'),
        createDateTime: new FormControl(new Date()),
        createdBy: new FormControl(''),
        lastModifiedBy: new FormControl(''),
        lastModifiedDateTime: new FormControl(new Date()),

      });
    }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    this.addRescheduleData();
    this.getLoanDetails();
  }

  getEmpMasterDetails(){
    this.loanService.getEmpMasterDetails(60).subscribe(
      res=>{
        this.perticularEmpDetails = res.data.results[0][0];
      })
  }

  /** Submit Adhoc form */
  addRescheduleData() {
    console.log(this.addRescheduleData);
    this.loanService.saveRescheduleData(this.addRescheduleForm.value).subscribe(
      res => {
        this.toaster.success('', 'Loan data Saved Successfully!!')

      }
    )
    }
/** Submit Disburse form End */

getLoanDetails() { // temp id is used
  
  this.loanService.getLoanDetails('Car Loan').subscribe((res) => {
    this.loanDetails = res.data.results[0];
    // console.log(this.loanDetails);
  });
}
// Get Loan details End
}
