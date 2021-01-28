import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

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
    ])
  ]
})
export class PtimeNGPracticeComponent implements OnInit {

  constructor() { }
stepperIndex= 1;
    ngOnInit() {
    }

    abc(i) {
      if(this.stepperIndex > i){
        trigger('slideInOut', [
          transition(':enter', [
            style({transform: 'translateX(-100%)'}),
            animate('500ms ease-in', style({transform: 'translateX(0%)'}))
          ]),
          transition(':leave', [
            animate('0ms ease-in', style({transform: 'translateX(-100%)'}))
          ])
        ])
      }
      else{
        trigger('slideInOut', [
          transition(':enter', [
            style({transform: 'translateX(0%)'}),
            animate('500ms ease-in', style({transform: 'translateX(0%)'}))
          ]),
          transition(':leave', [
            animate('0ms ease-in', style({transform: 'translateX(-100%)'}))
          ])
        ])
      }
      this.stepperIndex = i;
    }


}
