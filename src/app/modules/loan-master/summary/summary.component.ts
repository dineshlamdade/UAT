import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanMasterService } from '../loan-master.service';
import { ExcelserviceService } from '../../excel_service/excelservice.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  loanSummaryData: any;
  excelData: any[];
  header:any[];

  constructor(private loanMasterService: LoanMasterService,private router: Router,private excelservice: ExcelserviceService) {
    localStorage.clear()
  }

  ngOnInit(): void {
    this.getAllLoanSummary()
  }

  getAllLoanSummary(){
    this.loanMasterService.getLoanSummaryData().subscribe(
      res =>{
         this.loanSummaryData = res.data.results[0];
        //  console.log(res.data.results[0])
      }
    )
  }

  viewLoanData(loandata){
    localStorage.clear();
    localStorage.setItem('viewData',JSON.stringify(loandata))
    this.router.navigate(['/loan-master/general'])
  }


  editLoanData(loandata){
    localStorage.clear();
    localStorage.setItem('editData',JSON.stringify(loandata))
    this.router.navigate(['/loan-master/general'])
  }


  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["Loan Code","Loan Description","Recovery Method","Loan Category",]
    // this.excelData = this.getAllQueryGenerationData;
    this.loanSummaryData.forEach(element => {
      let obj = {
        "Loan Code":element.loanCode,
        "Loan Description":element.loanDescription,
        "Recovery Method": element.recoveryMethod,
        "Loan Category": element.taxSettingPerquisiteLoanCategory,

      }
      this.excelData.push(obj)
    });
   // console.log(this.excelData)
    // this.excelservice.exportAsExcelFile(this.excelData, 'Attandence','Attendance',this.header);
    this.excelservice.exportAsExcelFile(this.excelData, 'Loan Summary','Loan Summary',this.header);

  }
}
