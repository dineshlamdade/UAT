import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { LoanService } from '../loan.service';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


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
  getLoanApplicationSummaryData: any=[];
  employeeMasterId: any;
  userData: any;
  header: any[];
  selectedLoanData: any ='';
  getLoanApplicationSummaryData2: any;
  getLoanTransactiondata: any;
  loanDisbursementPaymentDetailsData: any=[];
  transactionLength: any;
  type: string;
  selectedEmpLoanData:any=[];
  recoveryMethod: any;
  loanAdhocPaymentDetailsData: any[];
  loanReschdulePaymentDetailsData: any[];
  loanSettelmentPaymentDetailsData: any[];
  createdDate: any;
  loanApplicationId: any;
  trasactionData: any;
  settlementRequestFlag:boolean=false;
  // expectedPaymentDate:Date=new Date();
  // getLoanApplicationSummaryDataLength: any;
  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, public loanservice:LoanService,
    private datePipe: DatePipe,private excelservice: ExcelserviceService ,public sanitizer: DomSanitizer,private router: Router,
    private authService: AuthService) {
      this.LoanForm = new FormGroup({
    })

    this.userData = this.authService.getprivileges()
    this.employeeMasterId = this.userData.UserDetails.employeeMasterId;

    localStorage.clear()
   }
  ngOnInit(): void {
    // this.getAllData();
    this.getLoanApplicationSummary(this.employeeMasterId)
   this.getLoanTransaction(this.employeeMasterId)

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

  // .......................API.......................................................................
  getAllData()
{
this.loanservice.getAll().subscribe(res =>
  {
    this.summaryData = res.data.results[0];
    // console.log("this.summaryData",this.summaryData)
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
getLoanApplicationSummary(employeeMasterId)
{

  this.loanservice.getLoanApplicationSummary(this.employeeMasterId).subscribe(res =>
    {
     this.getLoanApplicationSummaryData = res.data.results[0];
     this.getLoanApplicationSummaryData.forEach(element => {
       element.count =[];
     });
    })
}

getLoanTransaction(id){
  this.loanservice.getLoanTransaction(id).subscribe(res =>
    {
      this.getLoanTransactiondata = res.data.results;
      // console.log("this.getLoanTransactiondata",JSON.stringify(this.getLoanTransactiondata))
      this.loanDisbursementPaymentDetailsData = [];
      this.getLoanTransactiondata.forEach(element => {

        element.loanDisbursementPaymentDetails.forEach(disbursement => {
          disbursement.type = 'Disbursement'
          disbursement.count = element.loanDisbursementPaymentDetails.length
          this.loanDisbursementPaymentDetailsData.push(disbursement)
        });

        element.adhocPaymentDetails.forEach(adhoc => {
          adhoc.type = 'Adhoc'
          adhoc.count = element.adhocPaymentDetails.length
          // console.log("adhoc.count",adhoc.count)
          this.loanDisbursementPaymentDetailsData.push(adhoc)
          // console.log("adhoc data",adhoc)
        });

        element.loanRescheduleDetails.forEach(reschdule => {
          reschdule.type = 'Reschedule'
          reschdule.count = element.loanRescheduleDetails.length
          // console.log("Reschedule.count",reschdule.count)
          this.loanDisbursementPaymentDetailsData.push(reschdule)
          // console.log("reschdule data",reschdule)

        });

        element.loanSettlement.forEach(settlment => {
          settlment.type = 'Settelment'
          settlment.count = element.loanSettlement.length
          this.loanDisbursementPaymentDetailsData.push(settlment)
        });

        // this.transactionLength = this.loanDisbursementPaymentDetailsData.length;

      });
      // let count = []
      this.getLoanApplicationSummaryData.forEach(element => {
        element.count = [];
        // console.log("element.loanApplicationId",element.loanApplicationId)
       this.loanDisbursementPaymentDetailsData.forEach(ele => {
         if(element.loanApplicationId == ele.loanApplicationId){
         element.count.push(ele)
        //  console.log("element.loanApplicationId",element.loanApplicationId)//console the same id
        //  console.log("ele.loanApplicationId",ele.loanApplicationId)

         }
         if(ele.loanApplication){
          if(element.loanApplicationId == ele.loanApplication.loanApplicationId){
            element.count.push(ele)
            // console.log("ele.loanApplication.loanApplicationId",ele.loanApplication.loanApplicationId)
           }
         }

       });
    })
    // console.log("this.loanDisbursementPaymentDetailsData", this.loanDisbursementPaymentDetailsData)
    // console.log("getLoanApplicationSummaryData",this.getLoanApplicationSummaryData)
  })
}

selectedLoan(summary)
{
  this.selectedLoanData = summary;
  console.log(" this.selectedLoanData", this.selectedLoanData)
  localStorage.clear();
  localStorage.setItem('selectedLoanData',JSON.stringify(summary))
  this.recoveryMethod = this.selectedLoanData.loanMaster.recoveryMethod;

  summary.count.forEach(element => {   // till not use bcz of testing (this code is used when one the type of loan getting the settelment req then not allow to other req )
    this.settlementRequestFlag = false;
    if(element.type == 'Settelment')
    {
    this.settlementRequestFlag = true;
    }
  });


}

viewTransactionDetails(transactionData){
  if(transactionData.type == 'Disbursement' ){
  localStorage.setItem('viewTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/disbursement']);
  }
  else if(transactionData.type == 'Adhoc' ){
  localStorage.setItem('viewTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/adhoc']);
  }
  else if(transactionData.type == 'Reschedule' ){
  localStorage.setItem('viewTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/rescheduleRequest']);
  }
  else if(transactionData.type == 'Settelment' ){
    localStorage.setItem('viewTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/settlementRequest']);
  }
}
editTransactionDetails(transactionData)
{
  if(transactionData.type == 'Disbursement' ){
  localStorage.setItem('editTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/disbursement']);

}else if(transactionData.type == 'Adhoc' ){
  localStorage.setItem('editTransaction',JSON.stringify(transactionData));
    this.router.navigate(['/loan/adhoc']);
}
else if(transactionData.type == 'Reschedule' ){
  localStorage.setItem('editTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/rescheduleRequest']);
  }
  else if(transactionData.type == 'Settelment' ){
    localStorage.setItem('editTransaction',JSON.stringify(transactionData));
  this.router.navigate(['/loan/settlementRequest']);
  }
}
// .......................................Excel and PDF Code.................................................
exportAsXLSX(): void {
  this.excelData = [];
  this.header = []
  this.header =["loan Application Number","last Modified DateTime","loan Type","Repayment Type","Approved Amount",
 "Subject", "Priority", "Last Updated", "Status",]
  this.getLoanApplicationSummaryData.forEach(element => {
    let obj = {
      "loan Application Number":element.loanApplicationNumber,
      "last Modified DateTime":element.lastModifiedDateTime,
      "loan Type": element.loanType,
      "Repayment Type": element.repaymentType,
      "Approved Amount": element.approvedAmount,
      "Module Name": element.applicationModuleName,
      "Query Type": element.queryDescription,
      "Sub-Query Type": element.subqueryDescription,
      "Status": element.status,

    }
    this.excelData.push(obj)
  });
  this.excelservice.exportAsExcelFile(this.excelData, 'Loan Summary','Loan Summary',this.header);

}

smallpopup1(viewTransaction: TemplateRef<any>,loanApplicationId) {
  this.modalRef = this.modalService.show(viewTransaction,
    Object.assign({}, { class: 'gray modal-lg' })
  );
  this.loanApplicationId = loanApplicationId;
  // console.log(" this.loanApplicationId", this.loanApplicationId)
  this.trasactionData =[];
  this.loanDisbursementPaymentDetailsData.forEach(element => {
    // console.log('element.loanApplicationId',element.loanApplicationId)
    // console.log('this.loanApplicationId',this.loanApplicationId)

    if(element.loanApplicationId == this.loanApplicationId)
    {
    this.trasactionData.push(element)
    }
    if(element.loanApplication){
      if(element.loanApplication.loanApplicationId == this.loanApplicationId){
        // element.loanApplicationId == ele.loanApplication.loanApplicationId
      this.trasactionData.push(element)
      }
    }

  });
  console.log(" this.trasactionData", this.trasactionData)

}

transactionExportAsXLSX()
{
  this.excelData = [];
  this.header = []
  this.header =["Transaction Number","Expected Payment Date","Type","Amount","Status",]
  this.loanDisbursementPaymentDetailsData.forEach(element => {
    let obj = {
      "Transaction Number":element.transactionNo,
      "Expected Payment Date":element.expectedPaymentDate,
      "Type": element.type,
      "Amount": element.amount,
      "Status": element.status,
    }
    this.excelData.push(obj)
  });
  this.excelservice.exportAsExcelFile(this.excelData, 'Loan Trasaction Summary','Loan Trasaction Summary',this.header);

}
}
