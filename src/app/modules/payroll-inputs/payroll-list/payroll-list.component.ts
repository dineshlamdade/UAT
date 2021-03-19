import { Component, OnInit } from '@angular/core';

import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export interface User1 {
  checked;
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
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.scss']
})



export class PayrollListComponent implements OnInit {


  
  users1: User1[];
  public modalRef: BsModalRef;
 constructor(private modalService: BsModalService) { }



  ngOnInit(): void {

    this.users1 = [
      {  checked: false, headtype: '001',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'PM',remark:'Remark1' },
      {  checked: false, headtype: '002',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'MM',remark:'Remark1' },
      {  checked: false, headtype: '003',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'PM',remark:'Remark1' },
      {  checked: false, headtype: '004',headcode:'AAA',headdesc:'AAA Desc',openingval:'0.00',chngamount:'0.00',chngper:'2',closingamt:'0.00',unitofmeasure:'PA',remark:'Remark1' },
    ];
  }

  

}
