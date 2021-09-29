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
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  ltaavailed1: ltaavailed[];
  Summs:Summ[];
  cities: City[];
  public modalRef: BsModalRef;
  selectedCities: City[];
  constructor(private modalService: BsModalService) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
   }
   openmodel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    }
  ngOnInit(): void {
    this.ltaavailed1 = [
      { flexisectionname: '1', flexisection: '22-Jan-2021', maxlimit: 'Paid', ownfixedlimit: '24-Jan-2021', balancingapplicable: '24-Jan-2021', balancingapplicableearning: '1', },
      { flexisectionname: '2', flexisection: '22-Feb-2021', maxlimit: 'Marriage', ownfixedlimit: '1-Feb-2021', balancingapplicable: '23-Feb-2021', balancingapplicableearning: '22',},

    ];
    this.Summs = [
      { type: '1', EDhead: '', attribute: 'Paid', nonedhead: '', orderno: '', },
      { type: '2', EDhead: '', attribute: 'Marriage', nonedhead: '', orderno: ' ', },

    ];
  }



}
