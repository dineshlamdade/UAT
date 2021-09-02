import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ptimeNGPractice',
  templateUrl: './sdm.component.html',
  styleUrls: ['./sdm.component.scss'],
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
export class SdmComponent implements OnInit {
  sdmFormStep1: FormGroup;
  summaryGridData: Array<any>= [];
  sourceArray: Array<any>= [];
  sourceCountArray: Array<number>=  [1,2,3,4,5]
  sourcePeriodArrayList: ["Asd","Asd","Asd","Asd","Asd"]
  public windowScrolled: boolean;
  constructor( private formBuilder:FormBuilder) {
    this.sdmFormStep1 = this.formBuilder.group({
      sdmName: new FormControl(null, Validators.required),
      sdmDescription: new FormControl(null),
      noOfSourceCount: new FormControl(null, Validators.required),
      sourcePeriod: new FormControl(null, Validators.required),
    })
  }
stepperIndex= 0;
    ngOnInit() {
//       http://localhost:8083/hrms/v1/source-derived-matrix/field-mappings/
// table type
    }

    editSummary() {}
    viewSummary() {}

    abc(i) {
      this.stepperIndex = i;
    }

    previous() {
      this.stepperIndex = this.stepperIndex-1;
    }

    next() {
      switch (this.stepperIndex) {
        case 1:{
          this.step1Submit()
          break;
      }
      case 2:{
        this.step2Submit()
        break;
    }
        default:
          break;
      }
      this.stepperIndex = this.stepperIndex+1

    }

    step1Submit() {
      console.log(this.sdmFormStep1.value)
      let sourceCount = this.sdmFormStep1.get('noOfSourceCount').value
      for(let i = 0; i < sourceCount; i++){
        this.sourceArray.push({
          sdmMasterDetailsId: null,
          sdmSourceDerivedFieldMappingId: null,
          isRangeOptionSelected: null,
          sourceTableName: null,
          sourceValue: null,
          isActive: null,
        })
      }
    }

    step2Submit() {
      console.log(this.sourceArray)
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
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
      })();
    }
}
