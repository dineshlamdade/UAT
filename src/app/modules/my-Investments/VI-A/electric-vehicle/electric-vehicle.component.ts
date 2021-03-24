import { DatePipe, DOCUMENT } from '@angular/common';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import { Component, HostListener, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-electric-vehicle',
  templateUrl: './electric-vehicle.component.html',
  styleUrls: ['./electric-vehicle.component.scss']
})
export class ElectricVehicleComponent implements OnInit {
  public tabIndex = 0;
  public vehicleNo: string;
  public windowScrolled: boolean;
  public data: any;
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
    this.vehicleNo = event;
  }


  changeTabIndex(index: number)
  {
    console.log(this.vehicleNo)
    if(index !== 2) {
      this.data = undefined;
    }
    if(index !== 1) {
      this.vehicleNo = undefined;
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
