import { DatePipe, DOCUMENT } from '@angular/common';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import { Component, HostListener, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-unit-linked-insurance-plan',
  templateUrl: './unit-linked-insurance-plan.component.html',
  styleUrls: ['./unit-linked-insurance-plan.component.scss']
})
export class UnitLinkedInsurancePlanComponent implements OnInit {
  public tabIndex = 0;
  public accountNo: string;
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
    this.accountNo = event;
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
