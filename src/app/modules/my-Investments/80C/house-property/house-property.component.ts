import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { HousePropertyService } from './house-property.service';

@Component({
  selector: 'app-house-property',
  templateUrl: './house-property.component.html',
  styleUrls: ['./house-property.component.scss'],
})
export class HousePropertyComponent implements OnInit {

  public summaryGridData: Array<any> = [];

  public totalDeclaredAmount : number;
  public totalActualAmount :number;
 

  constructor(
    private housePropertyService: HousePropertyService,
    private numberFormat: NumberFormatPipe,
) {}

  ngOnInit() {
    this.summaryPage();
  }
// Summary get Call
summaryPage() {
  this.housePropertyService.getHousePropertyStampDuty().subscribe((res) => {
    this.summaryGridData = res.data.results[0].housePropertySummaryDetails;
    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
    this.totalActualAmount = res.data.results[0].totalActualAmount;
    
  });
}

}
