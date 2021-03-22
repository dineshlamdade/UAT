import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChildeducationallowanceService } from '../childeducationallowance.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
@Component({
  selector: 'app-childeducationallowance',
  templateUrl: './childeducationallowance.component.html',
  styleUrls: ['./childeducationallowance.component.scss'],
})
export class ChildeducationallowanceComponent implements OnInit {
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
    private childeducationallowanceService: ChildeducationallowanceService,
    private numberFormat: NumberFormatPipe
  ) {}

  ngOnInit(): void {
    this.getComputationSummaryPage();
    // this.summaryPage();
    this.getMasterSummary();
  }

  getComputationSummaryPage() {
    this.childeducationallowanceService.getComputation().subscribe((res) => {
      this.summaryGridData =
        res.data.results[0].childrenEducationAllowanceComputation;
      this.baseTotal = res.data.results[0].baseTotal;
      this.arrearTotal = res.data.results[0].arrearTotal;
      this.total = res.data.results[0].total;
      this.maxEligibilityTotal = res.data.results[0].maxEligibilityTotal;
      this.applicableAllowanceTotal =
        res.data.results[0].applicableAllowanceTotal;
    });
  }

  getMasterSummary() {
    this.childeducationallowanceService.getSummaryTable().subscribe((res) => {
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
