import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { TaxAdjustmentsService } from '../tax-adjustments.service';


@Component({
  selector: 'app-tax-adjustments-summary',
  templateUrl: './tax-adjustments-summary.component.html',
  styleUrls: ['./tax-adjustments-summary.component.scss']
})
export class TaxAdjustmentsSummaryComponent implements OnInit {


  public summaryGridData: Array<any> = [];

  constructor( private taxAdjustmentsService: TaxAdjustmentsService,
    private numberFormat: NumberFormatPipe,) { }

  ngOnInit() {
    this.summaryPage();
  }

   // Summary get Call
   summaryPage() {
    this.taxAdjustmentsService.TaxAdjustmentsSummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0];
      
    });
  }

}
