import { Component, HostListener, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.scss']
})
export class ReimbursementComponent implements OnInit {
  public tabIndex = 0;
  public policyNumber: string;
  public windowScrolled: boolean;
  public data: any;
 
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  
  }

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::', this.data);
  }

  redirectToMaster(event: any) {
    this.tabIndex = event.tabIndex;
    this.policyNumber = event;
  }


  changeTabIndex(index: number) {
    if (index !== 2) {
      this.data = undefined;
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
