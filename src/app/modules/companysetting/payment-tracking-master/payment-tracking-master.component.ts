import { Component, OnInit } from '@angular/core';

interface City {
  name: string,
  code: string
}
interface User1 {
  srno;
  head;
  logic;
  formula;
  value;
 
}
interface User2 {
  srno;
  ifsc;
  bankname;
  address;
  accountno;
  default;
 
}

@Component({
  selector: 'app-payment-tracking-master',
  templateUrl: './payment-tracking-master.component.html',
  styleUrls: ['./payment-tracking-master.component.scss']
})
export class PaymentTrackingMasterComponent implements OnInit {
  cities: City[];
  users1: User1[];
  users2: User2[];
  selectedCities: City[];
  constructor() { }

  ngOnInit(): void {
    this.cities = [
      {name: 'G1', code: 'NY'},
      {name: 'G2', code: 'RM'},
      {name: 'G3', code: 'LDN'},
      {name: 'G6', code: 'IST'},
  
  ];

 

//add this code in onInit method
 this.users1 = [
      { srno: '1', head: 'Earning',logic:'AAA',formula: 'bbb',value:'AAA Desc' },

  
 ];
 this.users2 = [
  { srno: '1', ifsc:'hii',bankname:'AAA',address:'AAA Desc' ,accountno:'5646' ,default:'' },


];

  }

}
