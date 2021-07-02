import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
export interface ltaavailed {
  flexisectionname;
  flexisection;
  maxlimit;
  ownfixedlimit;
  balancingapplicable;
  balancingapplicableearning;
 
}
export interface Summ {
type;
EDhead;
attribute;
nonedhead;
orderno;
}

                                                                     
@Component({
  selector: 'app-flexiinput',
  templateUrl: './flexiinput.component.html',
  styleUrls: ['./flexiinput.component.scss']
})
export class FlexiinputComponent implements OnInit {
  ltaavailed1: ltaavailed[];
  Summs:Summ[];
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.ltaavailed1 = [
      { flexisectionname: '1', flexisection: '22-Jan-2021', maxlimit: 'Paid', ownfixedlimit: '24-Jan-2021', balancingapplicable: '24-Jan-2021', balancingapplicableearning: '1', },
      { flexisectionname: '2', flexisection: '22-Feb-2021', maxlimit: 'Marriage', ownfixedlimit: '1-Feb-2021', balancingapplicable: '23-Feb-2021', balancingapplicableearning: '22',},

    ];
    this.Summs = [
      { type: '1', EDhead: '22-Jan-2021', attribute: 'Paid', nonedhead: '24-Jan-2021', orderno: '24-Jan-2021', },
      { type: '2', EDhead: '22-Feb-2021', attribute: 'Marriage', nonedhead: '1-Feb-2021', orderno: '23-Feb-2021', },

    ];
  }

}
