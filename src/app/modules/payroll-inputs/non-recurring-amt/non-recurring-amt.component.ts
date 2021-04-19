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
console.log('jnc');
  this.users1 = [
     { srno: '1', headtype: 'Earning', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', closingamt: '0.00', onceevery: '', Frequency: 'Monthly', FromDate: '12-Apr-2018', Nooftrans: '2', ToDate: '12-Apr-2020', remark: 'Remark1' },
     { srno: '2', headtype: 'Earning', headdesc: 'BBB Desc', openingval: '0.00', chngamount: '0.00', closingamt: '0.00', onceevery: '', Frequency: 'Monthly', FromDate: '12-Apr-2018', Nooftrans: '2', ToDate: '12-Apr-2020', remark: 'Remark2' },
     { srno: '3', headtype: 'Earning', headdesc: 'CCC Desc', openingval: '0.00', chngamount: '0.00', closingamt: '0.00', onceevery: '', Frequency: 'Monthly', FromDate: '12-Apr-2018', Nooftrans: '2', ToDate: '12-Apr-2020', remark: 'Remark3'},
     { srno: '4', headtype: 'Earning', headdesc: 'DDD Desc', openingval: '0.00', chngamount: '0.00', closingamt: '0.00', onceevery: '', Frequency: 'Monthly', FromDate: '12-Apr-2018', Nooftrans: '2', ToDate: '12-Apr-2020', remark: 'Remark4' },
   ];

  this.scheduleData = [
    { ssrno: '1' , sempcode: '001', sempname: 'Jhon', spayrollarea: 'PA_01', shead: 'H1', sgroupid: 'G1', schno: 'sch1', schdate: '12-Apr-2018', schamount: '2,000.00', processedamount: '2,000.00', balamount: '0.00', processingcycle: 'Cycle1', hold: '', discard: '', rescheduledate: '', approvalstatus: '', remark: '', },
    { ssrno: '2' , sempcode: '002', sempname: 'Thor', spayrollarea: 'PA_02', shead: 'H2', sgroupid: 'G2', schno: 'sch2', schdate: '12-Apr-2020', schamount: '2,000.00', processedamount: '2,000.00', balamount: '0.00', processingcycle: 'Cycle1', hold: '', discard: '', rescheduledate: '', approvalstatus: '', remark: '', },
    { ssrno: '3' , sempcode: '003', sempname: 'Ram', spayrollarea: 'PA_03', shead: 'H3', sgroupid: 'G3', schno: 'sch3', schdate: '12-Apr-2018', schamount: '2,000.00', processedamount: '2,000.00', balamount: '0.00', processingcycle: 'Cycle1', hold: '', discard: '', rescheduledate: '', approvalstatus: '', remark: '', },
    { ssrno: '4' , sempcode:  '004' , sempname: 'Sham', spayrollarea: 'PA_04', shead: 'H4', sgroupid: 'G4', schno: 'sch4', schdate: '12-Apr-2019', schamount: '2,000.00', processedamount: '2,000.00', balamount: '0.00', processingcycle: 'Cycle1', hold: '', discard: '', rescheduledate: '', approvalstatus: '', remark: '', },
  ];
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
      this.service.getFinancialMasterSchedule().subscribe((data) => {
        console.log('Transation Page::', data);
        this.transactionData = data.data.results;
      }),
      (error: any) => console.log('Transation Page::', error);
    }

}
