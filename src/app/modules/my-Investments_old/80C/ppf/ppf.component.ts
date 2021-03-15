import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-ppf',
  templateUrl: './ppf.component.html',
  styleUrls: ['./ppf.component.scss'],

})
export class PPFComponent implements OnInit {
<<<<<<< HEAD

=======
  policyNumber: string;
  constructor() { }
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;
  public accountNo: string;

  public modalRef: BsModalRef;

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
<<<<<<< HEAD
    this.accountNo = event;
=======
    this.policyNumber = event;
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1
  }


  changeTabIndex(index: number)
  {
    console.log(this.accountNo)
    if(index !== 2) {
      this.data = undefined;
    }
    if(index !== 1) {
      this.accountNo = undefined;
    }
    this.tabIndex = index;
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

}
