import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-post-office',
  templateUrl: './post-office.component.html',
  styleUrls: ['./post-office.component.scss']
})
export class PostOfficeComponent implements OnInit {

  public accountNo: string;
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;

  constructor() {}

  ngOnInit(): void {}

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::', this.data);
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


  redirectToMaster(event: any) {
    this.tabIndex = event.tabIndex;
    this.accountNo = event;
  }

  public modalRef: BsModalRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
