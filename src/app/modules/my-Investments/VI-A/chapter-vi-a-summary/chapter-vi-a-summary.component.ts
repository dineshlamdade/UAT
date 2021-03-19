import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { ChapterVIASummaryService } from './chapter-vi-a-summary.service';

@Component({
  selector: 'app-chapter-vi-a-summary',
  templateUrl: './chapter-vi-a-summary.component.html',
  styleUrls: ['./chapter-vi-a-summary.component.scss'],
})
export class ChapterVIASummaryComponent implements OnInit {
  public summaryGridData: Array<any> = [];

  public grandTotalDeclared: number;
  public grandTotalActual: number;

  constructor(
    private chapterVIASummaryService: ChapterVIASummaryService,
    private numberFormat: NumberFormatPipe
  ) {}

  ngOnInit() {
    this.summaryPage();
  }

  summaryPage() {
    this.chapterVIASummaryService.getVIASummary().subscribe((res) => {
      this.summaryGridData = res.data.results[0].summaryVIADetail;
      this.grandTotalDeclared = res.data.results[0].grandTotalDeclared;
      this.grandTotalActual = res.data.results[0].grandTotalActual;
    });
  }
}
