import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



export interface User1 {
  srno;
  headdesc;
  nature;
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
@Component({
  selector: 'app-non-recurring-qty',
  templateUrl: './non-recurring-qty.component.html',
  styleUrls: ['./non-recurring-qty.component.scss']
})
export class NonRecurringQtyComponent implements OnInit {

  users1: User1[];
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.users1 = [
      { srno: '1',headdesc:'AAA Desc', nature: '',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark1' },
      { srno: '2',headdesc:'BBB Desc',nature: '',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark2' },
      { srno: '3',headdesc:'CCC Desc',nature: '',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark3'},
      { srno: '4',headdesc:'DDD Desc',nature: '',openingval:'0.00',chngamount:'0.00',closingamt:'0.00',UOM:'',onceevery:'',Frequency:'Monthly',FromDate:'12-Apr-2018',Nooftrans:'2',ToDate:'12-Apr-2020',remark:'Remark4' },
    ];
  }

}
