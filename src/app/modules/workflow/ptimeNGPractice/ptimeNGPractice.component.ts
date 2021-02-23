import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ptimeNGPractice',
  templateUrl: './ptimeNGPractice.component.html',
  styleUrls: ['./ptimeNGPractice.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(200%)'}),
        animate('700ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),[
     trigger('stateAnimation', [
      transition(':enter', [
        style({width: '2vh'}),
        animate('700ms ease-in', style({width: '0vh'}))
      ]),
      transition(':leave', [
        style({width: '0vh'}),
        animate('0ms ease-in', style({width: '2vh'}))
      ])
    ])
    ]
  ]
})
export class PtimeNGPracticeComponent implements OnInit {
  sdmForm: FormGroup;
  summaryGridData: Array<any>= [];
  sourceArrayList: [1,2,3,4,5]
  sourcePeriodArrayList: ["Asd","Asd","Asd","Asd","Asd"]
  public windowScrolled: boolean;
  constructor( private formBuilder:FormBuilder) {
    this.sdmForm = this.formBuilder.group({
      code: new FormControl()
    })
  }
stepperIndex= 0;
    ngOnInit() {
    }

    editSummary() {}
    viewSummary() {}

    abc(i) {
      // if(this.stepperIndex > i){
       
      // }
      // else{
        
      // }
      this.stepperIndex = i;
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
}
