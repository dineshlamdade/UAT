import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-taxsaving-mutual-funds',
  templateUrl: './taxsaving-mutual-funds.component.html',
  styleUrls: ['./taxsaving-mutual-funds.component.scss']
})
export class TaxsavingMutualFundsComponent implements OnInit {

  constructor() { }
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;

  public modalRef: BsModalRef;

  ngOnInit(): void {
  }


  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::',this.data);
  }

  changeTabIndex(index: number)
  {
    if(index !== 2) {
      this.data = undefined;
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
