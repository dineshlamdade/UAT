import { Component, OnInit } from '@angular/core';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
import { NationalSavingCertificateNSCAccruedInterestService } from '../national-saving-certificate-nsc/national-saving-certificate-nscaccrued-interest.service';

@Component({
  selector: 'app-national-saving-certificate-nsc',
  templateUrl: './national-saving-certificate-nsc.component.html',
  styleUrls: ['./national-saving-certificate-nsc.component.scss'],
})
export class NationalSavingCertificateNSCComponent implements OnInit {
  public summaryGridData: Array<any> = [];

  public accrualTotal: number;
  public nscAmountTotal: number;

  constructor(
    private nationalSavingCertificateNSCAccruedInterestService: NationalSavingCertificateNSCAccruedInterestService,
    private numberFormat: NumberFormatPipe
  ) {}

  ngOnInit() {
    this.summaryPage();
  }

  // Summary get Call
  summaryPage() {
    this.nationalSavingCertificateNSCAccruedInterestService
      .getNSCAccrued()
      .subscribe((res) => {
        this.summaryGridData = res.data.results[0].nscaccruedInterestDetailList;
        this.accrualTotal = res.data.results[0].accrualTotal;
        this.nscAmountTotal = res.data.results[0].nscAmountTotal;
      });
  }
}
