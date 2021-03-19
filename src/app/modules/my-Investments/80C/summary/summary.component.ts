
import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { SummaryService } from './summary.service';

 @Component({
   selector: 'app-summary',
   templateUrl: './summary.component.html',
   styleUrls: ['./summary.component.scss']
 })
export class SummaryComponent implements OnInit {

  public summaryGridData: Array<any> = [];

  public grandTotalDeclared : number;
  public grandTotalActual :number;
  public limit : number;
  public benefitAvailableDeclared :number;
  public benefitAvailableActual : number;

  constructor( 
    private summaryService: SummaryService,
    private numberFormat: NumberFormatPipe,
    ) { }

  ngOnInit() {
    this.summaryPage();
  }

   // Summary get Call
   summaryPage() {
    this.summaryService.get80CSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].summary80CDetails;
      this.grandTotalDeclared = res.data.results[0].grandTotalDeclared;
      this.grandTotalActual = res.data.results[0].grandTotalActual;
      this.limit = res.data.results[0].limit;
      this.benefitAvailableActual = res.data.results[0].benefitAvailableActual;
      this.benefitAvailableDeclared = res.data.results[0].benefitAvailableDeclared;
    });
  }

}

