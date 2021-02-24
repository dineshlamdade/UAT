import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
export interface User1 {
  srno;
  headtype;
  headcode;
  headdesc;
  openingval;
  chngamount;
  chngper;
  closingamt;
  unitofmeasure;
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
     { srno: '1', headtype: 'Earning',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'PM',remark:'Remark1' },
     { srno: '2', headtype: 'Earning',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'MM',remark:'Remark1' },
     { srno: '3', headtype: 'Earning',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'PM',remark:'Remark1' },
     { srno: '4', headtype: 'Earning',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'PA',remark:'Remark1' },
   ];
     }

     ViewHistory(template: TemplateRef<any>) {
       this.modalRef = this.modalService.show(
         template,
         Object.assign({}, { class: 'gray modal-lg' })
       );
     }

     Schedule(template2: TemplateRef<any>) {
       this.modalRef = this.modalService.show(
         template2,
         Object.assign({}, { class: 'gray modal-lg' })
       );
     }

}
