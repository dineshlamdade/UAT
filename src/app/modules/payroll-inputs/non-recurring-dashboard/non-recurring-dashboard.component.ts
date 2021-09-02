import { Component, HostListener, OnInit } from '@angular/core';
export interface summarydata {
  empcode;
  empname;
companyname;
  joiningdate;
  emptype;
  establishment;
  grade;
  department;
  designation;
  status;

}
@Component({
  selector: 'app-non-recurring-dashboard',
  templateUrl: './non-recurring-dashboard.component.html',
  styleUrls: ['./non-recurring-dashboard.component.scss']
})
export class NonRecurringDashboardComponent implements OnInit {
  Summarydata:summarydata[];
  public windowScrolled: boolean;
@HostListener('window:scroll', [])
onWindowScroll() {
  if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
    this.windowScrolled = true;
  } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
  document.body.scrollTop < 10) {
    this.windowScrolled = false;
  }
}

scrollToTop() {
  (function smoothscroll() {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
    }
  })();
}


  constructor() { }

  ngOnInit(): void {

    this.Summarydata = [
      { empcode: '1', empname: 'Jhon',companyname:'C_01',joiningdate:'12-Apr-2020',emptype:'Permanent',establishment:'Pune',grade:'G1',department:'D1',designation:'UI Developer',status:'Pending'},
      { empcode: '2', empname: 'Shon',companyname:'C_02',joiningdate:'10-Apr-2020',emptype:'Permanent',establishment:'Pune',grade:'G2',department:'D2',designation:'UI Developer',status:'Pending'},
      { empcode: '3', empname: 'Thor',companyname:'C_03',joiningdate:'12-May-2020',emptype:'Permanent',establishment:'Pune',grade:'G3',department:'D3',designation:'UI Developer',status:'Pending'},
      { empcode: '4', empname: 'Ram',companyname:'C_04',joiningdate:'12-Jun-2020',emptype:'Permanent',establishment:'Pune',grade:'G4',department:'D4',designation:'UI Developer',status:'Pending'},
      { empcode: '5', empname: 'Sham',companyname:'C_05',joiningdate:'12-Sep-2020',emptype:'Permanent',establishment:'Pune',grade:'G5',department:'D5',designation:'UI Developer',status:'Pending'},

    ];
  }

}
