 import { Component, HostListener, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reimbursement-master',
  templateUrl: './reimbursement-master.component.html',
  styleUrls: ['./reimbursement-master.component.scss']
})
export class ReimbursementMasterComponent implements OnInit {
  public tabIndex = 0;
  public generalFormTab: string;
  public windowScrolled: boolean;
  public data: any;
  public rembsettingid:number;
  public policyNumber: string;
  public policyNumber1: string;
  constructor() { }

  ngOnInit(): void {
    console.log("rembsettingid", this.rembsettingid);
  }
  rembsetting(){
    console.log("rembsettingid2", this.rembsettingid);
  }

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::',this.data);
  }

  redirectToMaster(event: any) {
    this.tabIndex = event.tabIndex;
    this.policyNumber = event;
  }

  redirectToMaster1(event: any) {
    this.tabIndex = 2;
    this.policyNumber1 = event;
  }

  changeTabIndex(index: number)
  {
    console.log(this.policyNumber)
    if(index !== 2) {
      this.data = undefined;
    }
    if(index !== 1) {
      this.policyNumber = undefined;
    }
    this.tabIndex = index;
  }
  public modalRef: BsModalRef;

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
}
