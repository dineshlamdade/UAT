import { Component, HostListener, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cha',
  templateUrl: './cha.component.html',
  styleUrls: ['./cha.component.scss']
})
export class ChaComponent implements OnInit {

  public tabIndex = 0;
  public policyNumber: string;
  public windowScrolled: boolean;
  public data: any;

  constructor() { }

  ngOnInit(): void {
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


  changeTabIndex(index: number)
  {
    if(index !== 2) {
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
