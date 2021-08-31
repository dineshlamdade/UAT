import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
interface City {
    name: string,
    code: string
}

export interface User1 {
  srno;
  head;
  desc;
  accountno;
  openingval;
  chngamount;
  closingamt;
  UOM;
  onceevery;
  Frequency;
  FromDate;
  Nooftrans;
  ToDate;
  remark;
}


export interface summarydata {
  empcode;
  empname;
  payrollarea;
  head;
  desc;
  accountno;
  groupid;
  onceevery;
  frequency;
  amount;
  amountper;
  fromdate;
  todate;
  remark;
  approvalstatus;
}
  
 


export interface scheduledata {
  ssrno;
  sempcode;
  sempname;
  spayrollarea;
  head;
  desc;
  accountno;
  stype;
  sgroupid;
  schno;
  schdate;
   schvalue;
    schuom;
  schamount;
  per;
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
  selector: 'app-garnishment',
  templateUrl: './garnishment.component.html',
  styleUrls: ['./garnishment.component.scss']
})
export class GarnishmentComponent implements OnInit {

  cities: City[];

    selectedCities: City[];
 users1: User1[];
  public modalRef: BsModalRef;
  frozenCols: any[];
  Summarydata:summarydata[];
  ScheduleData:scheduledata[];
  scrollableCols: any[];
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {


this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    this.users1 = [
     { srno: '1', head: '',desc:'',accountno:'',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark1' },
     { srno: '2', head: '',desc:'',accountno:'',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark2' },
     { srno: '3', head: '',desc:'',accountno:'',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark3'},
     { srno: '4', head: '',desc:'',accountno:'',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark4' },
   ];
    
this.Summarydata = [
    { empcode: '1', empname: 'Jhon',payrollarea:'PA_01',head:'H1',desc:'',accountno:'',groupid:'G1',onceevery:'',frequency:'Monthly',amount:'', amountper:'',fromdate:'12-Apr-2018',todate:'12-Apr-2020',remark:'',approvalstatus:'' },
    { empcode: '2', empname: 'Thor',payrollarea:'PA_02',head:'H2',desc:'',accountno:'',groupid:'G2',onceevery:'',frequency:'Monthly',amount:'',amountper:'',fromdate:'12-Apr-2018',todate:'12-Apr-2020',remark:'',approvalstatus:'' },
    { empcode: '3', empname: 'Ram',payrollarea:'PA_03',head:'H3',desc:'',accountno:'',groupid:'G3',onceevery:'',frequency:'Monthly',amount:'',amountper:'',fromdate:'12-Apr-2018',todate:'12-Apr-2020',remark:'',approvalstatus:''},
    { empcode: '4', empname: 'Sham',payrollarea:'PA_04',head:'H4',desc:'',accountno:'',groupid:'G4',onceevery:'',frequency:'Monthly',amount:'',amountper:'',fromdate:'12-Apr-2018',todate:'12-Apr-2020',remark:'',approvalstatus:'' },
  ];

  this.ScheduleData = [
    { ssrno: '1' ,sempcode: '001', sempname: 'Jhon',spayrollarea:'PA_01',head:'H1',desc:'',accountno:'',stype:'',sgroupid:'G1',schno:'sch1',schdate:'12-Apr-2018',schvalue:'',schuom:'',schamount:'2,000.00',per:'',processedamount:'2,000.00',balamount:'0.00',processingcycle:'Cycle1',hold:'',discard:'',rescheduledate:'',approvalstatus:'',remark:'', },
    { ssrno: '2' ,sempcode: '002', sempname: 'Thor',spayrollarea:'PA_02',head:'H2',desc:'',accountno:'',stype:'',sgroupid:'G2',schno:'sch2',schdate:'12-Apr-2020',schvalue:'',schuom:'',schamount:'2,000.00',per:'',processedamount:'2,000.00',balamount:'0.00',processingcycle:'Cycle1',hold:'',discard:'',rescheduledate:'',approvalstatus:'',remark:'', },
    { ssrno: '3' ,sempcode: '003', sempname: 'Ram',spayrollarea:'PA_03',head:'H3',desc:'',accountno:'',stype:'',sgroupid:'G3',schno:'sch3',schdate:'12-Apr-2018',schvalue:'',schuom:'',schamount:'2,000.00',per:'',processedamount:'2,000.00',balamount:'0.00',processingcycle:'Cycle1',hold:'',discard:'',rescheduledate:'',approvalstatus:'',remark:'',},
    { ssrno: '4' ,sempcode:  '004' , sempname: 'Sham',spayrollarea:'PA_04',head:'H4',desc:'',accountno:'',stype:'',sgroupid:'G4',schno:'sch4',schdate:'12-Apr-2019',schvalue:'',schuom:'',schamount:'2,000.00',per:'',processedamount:'2,000.00',balamount:'0.00',processingcycle:'Cycle1',hold:'',discard:'',rescheduledate:'',approvalstatus:'',remark:'', },
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
        Object.assign({}, { class: 'gray modal-xl' })
      );
    }
      ViewTransactionHistory1(template4: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template4,
        Object.assign({}, { class: 'gray modal-xl' })
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

}
