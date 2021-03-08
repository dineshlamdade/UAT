import { AuthService } from './../../../auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-childEducationAllowance',
  templateUrl: './childEducationAllowance.component.html',
  styleUrls: ['./childEducationAllowance.component.scss']
})
export class ChildEducationAllowanceComponent implements OnInit {

  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getprivileges())
  }

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::', this.data);
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
