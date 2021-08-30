import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanMasterService } from '../loan-master.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  loanSummaryData: any;

  constructor(private loanMasterService: LoanMasterService,private router: Router) { 
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
}