import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

@Component({
  selector: 'app-non-recurring-amt',
  templateUrl: './non-recurring-amt.component.html',
  styleUrls: ['./non-recurring-amt.component.scss']
})
export class NonRecurringAmtComponent implements OnInit {

  users1: User1[];
  public modalRef: BsModalRef;
 constructor(private modalService: BsModalService) { }

 ngOnInit() {
   this.users1 = [
     { srno: '1', headtype: 'Earning',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark1' },
     { srno: '2', headtype: 'Earning',headdesc:'BBB Desc',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark2' },
     { srno: '3', headtype: 'Earning',headdesc:'CCC Desc',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark3'},
     { srno: '4', headtype: 'Earning',headdesc:'DDD Desc',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark4' },
   ];
     }

     ViewHistory(template: TemplateRef<any>) {
       this.modalRef = this.modalService.show(
         template,
         Object.assign({}, { class: 'gray modal-lg' })
       );
     }


}
