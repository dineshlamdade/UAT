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
import { SortEvent } from 'primeng/api';
const html2canvas: any = _html2canvas;

export interface Customer {
  applNo;
  Date;
   empCode;
   empName;
   loanType;
   Type;
  //  Group;
   Amount;
   loanAmnt;
   noOInstallmnts;
   interest;
   remark;
   Status;
 }

 export interface user1 {
  Group;
  ITSection;
  // noemployees;
  // nopsid;
  proofsubmitted;
  actioned;
  yettoactioned;
  submitted;
  sendback;
  approved;
 }
 interface City {
  name: string
  
}
interface groups {
  name: string
  
}



@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  LoanForm: FormGroup;
  public modalRef: BsModalRef;
  excelData: any[];
  summaryData: any=[];
  loandata: any = '';
  searchText:string;
  editflag: boolean = false;
  customers: Customer[];
  cities: City[];
  users1: user1[];
  group:groups[];
  first = 0;
  rows = 10;
  loanApplicationSummary: any;

  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, private loanservice:LoanService,public toster : ToastrService ,
    private datePipe: DatePipe,private excelservice: ExcelService, public sanitizer: DomSanitizer,private router: Router,
    ) {
    this.LoanForm = this.formBuilder.group({

      // "searchText": new FormControl(''),

    })

   }
  ngOnInit(): void {
   this.getAllData();
    this.customers = [
      {applNo: '551', Date:'12Apr2021', empCode: '001',empName:'AAA', loanType:'House Rent', Type:'Adhoc',Amount:'10,000.00',loanAmnt:'1',noOInstallmnts:'12',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '11', Date:'12Apr2021',empCode: '002', empName:'bbb',loanType:'House Rent',Type:'Settlement', Amount:'50,000.00', loanAmnt:'2',noOInstallmnts:'3',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '11', Date:'12Apr2021',empCode: '003',empName:'SSS', loanType:'House Rent',Type:'Disbursement', Amount:'30,000.00', loanAmnt:'3',noOInstallmnts:'44',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '555',Date:'12Apr2021', empCode: '004',empName:'AAA', loanType:'House Rent',Type:'Reschedule', Amount:'1,20,000.00',loanAmnt:'2',noOInstallmnts:'6',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '11', Date:'12Apr2021',empCode: '005',empName:'AAA', loanType:'House Rent', Type:'Adhoc',Amount:'1,80,000.00',loanAmnt:'2',noOInstallmnts:'8',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '1',Date:'12Apr2021', empCode: '006',empName:'LLL', loanType:'House Rent', Type:'Adhoc',Amount:'80,000.00', loanAmnt:'234234',noOInstallmnts:'9',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '1',Date:'12Apr2021', empCode: '007',empName:'AAA', loanType:'House Rent', Type:'Adhoc',Amount:'40,000.00',loanAmnt:'234234',noOInstallmnts:'3',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '1',Date:'12Apr2021', empCode: '008',empName:'PPP', loanType:'House Rent', Type:'Adhoc',Amount:'30,000.00', loanAmnt:'234234',noOInstallmnts:'12',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '1',Date:'12Apr2021', empCode: '009',empName:'CCC', loanType:'dddddd', Type:'Adhoc',Amount:'20,000.00',loanAmnt:'234234',noOInstallmnts:'11',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '888',Date:'12Apr2021', empCode: '010',empName:'DDD', loanType:'dddddd',Type:'Adhoc', Amount:'20,000.00', loanAmnt:'234234',noOInstallmnts:'14',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '1',Date:'12Apr2021', empCode: '011',empName:'JJJ', loanType:'dddddd',Type:'Adhoc', Amount:'20,000.00', loanAmnt:'234234',noOInstallmnts:'15',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '1',Date:'12Apr2021', empCode: '012',empName:'MMM', loanType:'dddddd',Type:'Adhoc', Amount:'20,000.00', loanAmnt:'234234',noOInstallmnts:'17',interest:'2',remark:'Approved',Status:'Submitted'},
      {applNo: '66',Date:'12Apr2021', empCode: '013',empName:'BBB', loanType:'dddddd',Type:'Adhoc', Amount:'20,000.00', loanAmnt:'234234',noOInstallmnts:'1',interest:'2',remark:'Approved',Status:'Submitted'},
     
    ];

    this.users1 = [
      {Group:'80-c',
      ITSection:'LIC',
      // noemployees:'Rihan',
      // nopsid:'123',
       proofsubmitted:'yes',
      actioned:'submitted',
      yettoactioned:'ABCS',
      submitted:'yes',
      sendback:'No',
      approved:'yes'}  ];
    this.cities = [
      {name: 'LIC'},
      {name: 'PPF'},
      {name: 'Pensionplan'},
      
    ];
    this.group = [
      {name: '80-C'},
      {name: 'grp2'},
      {name: 'grp3'},
    
    ];
  }

  
  loanFormSubmit()
  {

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

  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }



  // .......................API.......................................................................
  getAllData()
{
this.loanservice.getAll().subscribe(res =>
  {
    this.loanApplicationSummary = res.data.results[0];
  })
}

navigateToAdd(){
  localStorage.removeItem('EditLoanData');
  localStorage.removeItem('ViweLoanData');
  this.router.navigate(['/loan/add-new-loan']);
}

editLoanAppForm(summary)
{
  localStorage.clear();
  localStorage.setItem('EditLoanData',JSON.stringify(summary))
  this.router.navigate(['/loan/add-new-loan']);
  this.editflag = true;


}
viewLoanAppForm(summary)
{
  localStorage.clear();
  localStorage.setItem('ViweLoanData',JSON.stringify(summary))
  this.router.navigate(['/loan/add-new-loan']);
  this.editflag = false;


}
deleteLoanForm()
{

}
downloadSchedule()
{

}
customSort(event: SortEvent) {
  event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
  });
}
UploadModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}
UploadModal2(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
}
}
