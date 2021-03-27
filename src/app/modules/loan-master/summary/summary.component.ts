import { Component, OnInit } from '@angular/core';
import { LoanMasterService } from '../loan-master.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  loanSummaryData: any;

  constructor(private loanMasterService: LoanMasterService) { }

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
}
