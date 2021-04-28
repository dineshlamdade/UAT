import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PayrollInputsService } from '../payroll-inputs.service';




export interface User1 {
  srno;
  headtype;
  headdesc;
  openingval;
  chngamount;
  closingamt;
  onceevery;
  Frequency;
  FromDate;
  Nooftrans;
  ToDate;
  remark;
}


// export interface summarydata {
//   empcode;
//   empname;
//   payrollarea;
//   head;
//   groupid;
//   onceevery;
//   frequency;
//   amount;
//   fromdate;
//   todate;
//   remark;
//   approvalstatus;
// }

export interface scheduleData {
  ssrno;
  sempcode;
  sempname;
  spayrollarea;
  shead;
  sgroupid;
  schno;
  schdate;
  schamount;
  processedamount;
  balamount;
  processingcycle;
  hold;
  discard;
  rescheduledate;
  approvalstatus;
  remark;
}
@Component({
  selector: 'app-non-recurring-amt',
  templateUrl: './non-recurring-amt.component.html',
  styleUrls: ['./non-recurring-amt.component.scss'],

})
export class NonRecurringAmtComponent implements OnInit {

  users1: User1[];
  public modalRef: BsModalRef;
  frozenCols: any[];
  summarydata: Array<any> = [];
  transactionData: Array<any> = [];
  scheduleData: scheduleData[];
  scrollableCols: any[];




 constructor(private modalService: BsModalService,
             private service: PayrollInputsService) { }

 ngOnInit() {
  this.getSchedule();
  this.getSummary();
  this.getTransaction();
}

     ViewHistory(template: TemplateRef<any>) {
       this.modalRef = this.modalService.show(
         template,
         Object.assign({}, { class: 'gray modal-lg' })
       );
     }

     ViewTransactionHistory(template1: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template1,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }

    ViewScheduleDetail(template2: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template2,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }

    ViewScheduleHistory(template3: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template3,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }

    getSummary() {
      this.service.getFinancialMasterSummary().subscribe((data) => {
        console.log('summary Page::',data);
        this.summarydata = data.data.results;
      });
     // console.log(data);
    }

    
    getSchedule() {
      this.service.getFinancialMasterSchedule().subscribe((data) => {
        console.log('schedule Page::', data);
        this.scheduleData = data.data.results;
      });
    }

    getTransaction() {
      this.service.getFinancialMasterTransaction().subscribe((data) => {
        console.log('Transation Page::', data);
        this.transactionData = data.data.results;
      }),
      (error: any) => console.log('Transation Page::', error);
    }

}
