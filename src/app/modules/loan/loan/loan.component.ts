import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { LoanService } from '../loan.service';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  LoanForm: FormGroup;
  public modalRef: BsModalRef;
  excelData: any[];
  summaryData: any;

  @Input() public data: any;
  @Input() public applyLoanData: any;

  editflag: boolean = false;
  loanType: any;
  // query: any;
  // remi: any;
  // result: any;

  query: any = {
    amount: "",
    interest: "",
    tenureYr: "",
    tenureMo: ""
  }

  result = {
    emi: "",
    interest: "",
    total: ""
  }
  remi: any = {
    value: "2"
  }
  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, public loanservice:LoanService,public toster : ToastrService ,
    private datePipe: DatePipe,private excelservice: ExcelService, public sanitizer: DomSanitizer,private router: Router) {
    this.LoanForm = this.formBuilder.group({
    })


    // if (localStorage.getItem('loanApplicationFormData') != null) {
    //   let loandata = JSON.parse(localStorage.getItem('loanApplicationFormData'));


    //  }
   }
  ngOnInit(): void {
    this.getAllData();
  }
  loanFormSubmit()
  {

  }
   editQuery(loan)
  {
    this.editflag = true;
    // this.AddLoanForm.enable();
    // this.AddLoanForm.patchValue(loan);
    // this.isVisible =true;
    // this.isShown = false;
  }
  viewQuery(loan)
  {
    this.editflag = false;
  //  this.AddLoanForm.patchValue(loan);
  //  this.AddLoanForm.disable();
  }
  disbursementRequest(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  adhocRepayment(template2: TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  rescheduleRequest(template3: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  settlementRequest(template4: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      template4,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  // .......................................Excel and PDF Code.................................................
  exportAsXLSX():void {
    this.excelData = [];
    this.excelData = this.summaryData;
    this.excelservice.exportAsExcelFile(this.excelData, 'Loan Summary');
  }

  download(){
    let data = document.getElementById('contentToConvert');  // Id of the table
    html2canvas(data).then(canvas => {
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('Loan-Summary.pdf'); // Generated PDF
  });
  }
  // .......................API.......................................................................
  getAllData()
{
this.loanservice.getAll().subscribe(res =>
  {
    this.summaryData = res.data.results[0];
  })
}
editLoanAppForm()
{
  const data = {
    loanType: this.loanType,
    loanAmount: this.query.amount,
    interestRate: this.query.interest,
    noOfInstallment: this.remi.value,
    installmentAmount: this.result.emi
  };
  this.applyLoanData = data;
    localStorage.setItem('loanApplyData',JSON.stringify(data))
    console.log("evn: "+JSON.stringify(data))
    this.router.navigate(['/loan/add-new-loan'])


}


}
