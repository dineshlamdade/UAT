import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pension-plan',
  templateUrl: './pension-plan.component.html',
  styleUrls: ['./pension-plan.component.scss']
})
export class PensionPlanComponent implements OnInit {

  public tabIndex = 0;
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





//   public tabIndex = 0;
//   public windowScrolled: boolean;
//   constructor() { }

//   scrollToTop() {
//     (function smoothscroll() {
//       let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
//       if (currentScroll > 0) {
//               window.requestAnimationFrame(smoothscroll);
//               window.scrollTo(0, currentScroll - (currentScroll / 8));
//       }
//     })();
//   }
//   ngOnInit(): void {
//   }

//   summaryPage(){

//     this.tabIndex = 0;
//   }
//   masterPage()
//   {
//     this.tabIndex = 1;
//   }
//   declarationPage()
//   {

//     this.tabIndex = 2;

//   }
//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
//       this.windowScrolled = true;
//     } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
//     document.body.scrollTop < 10) {
//       this.windowScrolled = false;
//     }
//   }

// }
