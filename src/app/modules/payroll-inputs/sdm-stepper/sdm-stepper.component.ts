import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

interface User1 {
  SrNo;
  DerivedName;
  Module;
  TableName;
  FieldName;
  DerivedType;
  JobFieldType;
  Percentageof;

}
interface User2 {
  Source,
  Derived,
  DateRange,
  Action,
}


interface users3 {
  Select,
  PayrollArea,
  Department
  Grade,
  SBU,
  Status,

}
interface users4 {
  SrNo,
  TableName,
  FieldType,
  Values,
  RangeApplicable,


}
interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-sdm-stepper',
  templateUrl: './sdm-stepper.component.html',
  styleUrls: ['./sdm-stepper.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(200%)' }),
        animate('700ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]), [
      trigger('stateAnimation', [
        transition(':enter', [
          style({ width: '2vh' }),
          animate('700ms ease-in', style({ width: '0vh' }))
        ]),
        transition(':leave', [
          style({ width: '0vh' }),
          animate('0ms ease-in', style({ width: '2vh' }))
        ])
      ])
    ]
  ]
})
export class SdmStepperComponent implements OnInit {
  cities: City[];
  selectedCities: City[];
  users1: User1[];
  users2: User2[];
  users3: users3[];

  sdmFormStep1: FormGroup;
  summaryGridData: Array<any> = [];
  sourceArray: Array<any> = [];
  sourceCountArray: Array<number> = [1, 2, 3, 4, 5]
  sourcePeriodArrayList: ["Asd", "Asd", "Asd", "Asd", "Asd"]

  summeryFlag:boolean=false;

  public windowScrolled: boolean;
  constructor(private formBuilder: FormBuilder) {
    this.sdmFormStep1 = this.formBuilder.group({
      sdmName: new FormControl(null, Validators.required),
      sdmDescription: new FormControl(null),
      noOfSourceCount: new FormControl(null, Validators.required),
      sourcePeriod: new FormControl(null, Validators.required),
    })
  }
  stepperIndex = 1;
  ngOnInit() {
    this.cities = [
      { name: 'G1', code: '' },
      { name: 'G2', code: '' },
      { name: 'G3', code: '' },
      { name: 'G4', code: '' },
      { name: 'G5', code: '' }
    ];


    this.users1 = [
      { SrNo: '1', DerivedName: 'grp', Module: 'AAA', TableName: 'B', FieldName: 'Hold', DerivedType: 'C', JobFieldType: 'D', Percentageof: 'E' },

    ];
    this.users2 = [
      { Source: '1', Derived: 'grp', DateRange: 'AAA', Action: 'B' },

    ];
    this.users3 = [
      { Select: '1', PayrollArea: 'grp', Department: 'AAA', Grade: 'B', SBU: 'rsg', Status: 'gdf' },

    ];
  }

  editSummary() { }
  viewSummary() { }

  abc(i) {
    this.stepperIndex = i;
  }

  previous() {
    this.stepperIndex = this.stepperIndex - 1;
  }

  next() {
    switch (this.stepperIndex) {
      case 1: {
        this.step1Submit()
        break;
      }
      case 2: {
        this.step2Submit()
        break;
      }
      default:
        break;
    }
    this.stepperIndex = this.stepperIndex + 1

  }

  step1Submit() {
    console.log(this.sdmFormStep1.value)
    let sourceCount = this.sdmFormStep1.get('noOfSourceCount').value
    for (let i = 0; i < sourceCount; i++) {
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

  stepperFunction(value){
   
    this.summeryFlag = ! this.summeryFlag;
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
