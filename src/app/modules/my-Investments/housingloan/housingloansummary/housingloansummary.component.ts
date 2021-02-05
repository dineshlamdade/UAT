import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
@Component({
  selector: 'app-housingloansummary',
  templateUrl: './housingloansummary.component.html',
  styleUrls: ['./housingloansummary.component.scss']
})
export class HousingloansummaryComponent implements OnInit {
  public modalRef: BsModalRef;
  constructor(  private modalService: BsModalService,
    private alertService: AlertServiceService) { }

  ngOnInit(): void {
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
