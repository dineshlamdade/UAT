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
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  LoanForm: FormGroup;
  public modalRef: BsModalRef;
  excelData: any[];
  summaryData: any=[];
  loandata: any = '';
  searchText:string;
  editflag: boolean = false;

  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, public loanservice:LoanService,public toster : ToastrService ,
    private datePipe: DatePipe,private excelservice: ExcelService, public sanitizer: DomSanitizer,private router: Router) { this.LoanForm = this.formBuilder.group({

    })}

  ngOnInit(): void {
    this.getAllData();
  }
  loanFormSubmit()
  {

  }
  getAllData()
{
this.loanservice.getAll().subscribe(res =>
  {
    this.summaryData = res.data.results[0];
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

}