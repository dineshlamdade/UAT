import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnyCnameRecord } from 'node:dns';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { HousingloanService } from '../housingloan.service';
@Component({
  selector: 'app-housingloansummary',
  templateUrl: './housingloansummary.component.html',
  styleUrls: ['./housingloansummary.component.scss']
})
export class HousingloansummaryComponent implements OnInit {
  public modalRef: BsModalRef;
  public summaryGridData : any;
  constructor(  private modalService: BsModalService,
    private  housingloanService : HousingloanService,
    private alertService: AlertServiceService) { }

  ngOnInit(): void {
    this.summaryPage()
  }

  // Summary get Call
  summaryPage() {
    this.housingloanService.getHousingLoanummary().subscribe((res) => {
      console.log(res);
      this.summaryGridData = res.data.results[0];

      console.log(this.summaryGridData);
    });
  }

  InfoDialogforSectionEightyEE(infodialog1: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      infodialog1,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }
  InfoDialogforSectionEightyEEA(infodialog2: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      infodialog2,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }
}
