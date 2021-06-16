import { Component, HostListener, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
export interface User1 {
 Sr_No;
  Start_date;
  end_date;
  Frequency;
  AnnualAmount;
  Premiumamount;
  ECS;

}
export interface Customer {

  dateofsubmission;
  docname;
  doctype;
  password;
  Remark;
  status;
  appname;
  datetime;
}
@Component({
  selector: 'app-approvedsecond',
  templateUrl: './approvedsecond.component.html',
  styleUrls: ['./approvedsecond.component.scss']
})
export class ApprovedsecondComponent implements OnInit {
  users1: User1[];
  customers: Customer[];
  public modalRef: BsModalRef;
  public urlArray: Array<any> = [];
  public urlIndex: number;


  public windowScrolled: boolean;


  public documentURLIndex: number;
  masterInfo: any;
  documentSafeURL: any;
  sanitizer: any;

  constructor(
    private router: Router,
    private modalService: BsModalService,

  ) {}
  ngOnInit(): void {

this.users1 = [
  {Sr_No: '1', Start_date: '1-Mar-2021', end_date:'3-Mar-2021', Frequency:'aaaa', AnnualAmount:'123', Premiumamount:'33', ECS:'yes'},
  {Sr_No: '2', Start_date: '5-May-2021', end_date:'1-May-2021', Frequency:'aaaa', AnnualAmount:'1234', Premiumamount:'44', ECS:'no'},
  {Sr_No: '3', Start_date: '11-Feb-2021', end_date:'1-Feb-2021', Frequency:'aaaa', AnnualAmount:'234', Premiumamount:'667', ECS:'yes'},


];
this.customers = [

  { dateofsubmission: '21-jan-2021 ', docname:'   Premium payment Receipt2', doctype:'LIC ', password:' ABC',Remark:'OkTestSubmitted ',status:'Submitted ',appname:' Raman',datetime:'21-jan-2021 12:20:00 PM ' },
  {dateofsubmission: '22-jan-2021', docname:'  Premium payment Receipt1 ', doctype:' LIC', password:'CDE ',Remark:'Hi ',status:'Pending ',appname:'Rihan ',datetime:'21-jan-2021 12:20:00 PM ' },
  { dateofsubmission: '23-jan-2021', docname:'   Premium payment Receipt3', doctype:'LIC ', password:'EFD ',Remark:' Hi',status:'Approved ',appname:'Rishabh ',datetime:'21-jan-2021 12:20:00 PM ' },
];

  }

  docViewer(template3: TemplateRef<any>) {

    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }




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

  navigateAssociates() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/investment-approval-new/Document-viewer'])
    );
    const userDocs = this.customers;
    localStorage.setItem("customers", JSON.stringify(userDocs));

    this.router.navigate([], {state: {data: userDocs}}).then(result => {  window.open(url, '_blank', 'location=yes,height=1000,width=1000,scrollbars=yes,status=yes'); });
    //window.open(url, '_blank', 'location=yes,height=1000,width=1000,scrollbars=yes,status=yes');
   // window.open(url, '_blank');
  }


// @HostListener('window:scroll', [])

// onWindowScrollbottom() {
//     if (window.pageYOffset || document.documentElement.scrollbottom || document.body.scrollbottom == 0) {
//       this.windowScrolled = true;
//     } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollbottom ||
//     document.body.scrollbottom < 10) {
//       this.windowScrolled = false;
//     }
//   }

//   scrollTobottom() {
//     (function smoothscroll() {
//       let currentScroll = document.documentElement.scrollbottom || document.body.scrollbottom;
//       if (currentScroll < 0) {
//               window.requestAnimationFrame(smoothscroll);
//               window.scrollTo(100, currentScroll - (currentScroll / 8));
//       }
//     })();
//   }

// ---------------- Doc Viewr Code ----------------------------



}
