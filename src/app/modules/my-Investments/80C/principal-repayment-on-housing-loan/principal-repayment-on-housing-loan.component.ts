import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { PrincipalRepaymentOnHousingLoanService } from './principal-repayment-on-housing-loan.service';
@Component({
  selector: 'app-principal-repayment-on-housing-loan',
  templateUrl: './principal-repayment-on-housing-loan.component.html',
  styleUrls: ['./principal-repayment-on-housing-loan.component.scss'],
})
export class PrincipalRepaymentOnHousingLoanComponent implements OnInit {

  public summaryGridData: Array<any> = [];

  public totalDeclaredAmount : number;
  public totalActualAmount :number;
 
  constructor(
    private principalRepaymentOnHousingLoanService: PrincipalRepaymentOnHousingLoanService,
    private numberFormat: NumberFormatPipe,
  ) {}

  ngOnInit() {
    this.summaryPage();
  }
// Summary get Call
summaryPage() {
  this.principalRepaymentOnHousingLoanService.getPrincipalRepaymentOnHousingLoan().subscribe((res) => {
    this.summaryGridData = res.data.results[0].housePropertySummaryDetails;
    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
    this.totalActualAmount = res.data.results[0].totalActualAmount;
    
  });
}

}
