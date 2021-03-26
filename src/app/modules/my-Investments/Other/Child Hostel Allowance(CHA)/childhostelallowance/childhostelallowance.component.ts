import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChildhostelallowanceService } from '../childhostelallowance.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
@Component({
  selector: 'app-childhostelallowance',
  templateUrl: './childhostelallowance.component.html',
  styleUrls: ['./childhostelallowance.component.scss'],
})
export class ChildhostelallowanceComponent implements OnInit {
  public summaryGridData: Array<any> = [];
  public masterGridData: Array<any> = [];

  public baseTotal: number;
  public arrearTotal: number;
  public total: number;
  public maxEligibilityTotal: number;
  public applicableAllowanceTotal: number;

  familyMemberGroup: any;
  familyMemberName: [];

  showData = false;
  public modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private childhostelallowanceService: ChildhostelallowanceService,
    private numberFormat: NumberFormatPipe
  ) {}

  ngOnInit(): void {
    this.getComputationSummaryPage();

    this.getMasterSummary();
  }

  getComputationSummaryPage() {
    this.childhostelallowanceService.getComputation().subscribe((res) => {
      this.summaryGridData =
        res.data.results[0].childHostelAllowanceComputationList;
      this.baseTotal = res.data.results[0].baseTotal;
      this.arrearTotal = res.data.results[0].arrearTotal;
      this.total = res.data.results[0].total;
      this.maxEligibilityTotal = res.data.results[0].maxEligibilityTotal;
      this.applicableAllowanceTotal =
        res.data.results[0].applicableAllowanceTotal;
    });
  }

  getMasterSummary() {
    this.childhostelallowanceService.getSummaryTable().subscribe((res) => {
      console.log(res);
      this.masterGridData = res.data.results[0];
      this.masterGridData.forEach((element) => {});
    });
  }
  showtable() {
    this.showData = !this.showData;
    console.log(this.showData);
  }

  opencomputationModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
