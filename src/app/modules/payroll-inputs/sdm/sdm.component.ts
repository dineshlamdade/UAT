import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SortEvent } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



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
  selector: 'app-sdm',
  templateUrl: './sdm.component.html',
  styleUrls: ['./sdm.component.scss'],


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
export class SdmComponent implements OnInit {
  cities: City[];
  public modalRef: BsModalRef;
  selectedCities: City[];



  users1: User1[];
  users2: User2[];
  users3: users3[];

  sdmFormStep1: FormGroup;
  summaryGridData: Array<any> = [];
  sourceArray: Array<any> = [];
  sourceCountArray: Array<number> = [1, 2, 3, 4, 5]
  sourcePeriodArrayList: ["Asd", "Asd", "Asd", "Asd", "Asd"]
  public windowScrolled: boolean;
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService) {
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


  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  editSummary() { }
  viewSummary() { }

  //  abc(i) {
  //    this.stepperIndex = i;
  //  }

  stepNavigation(i) {
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



  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop > 100
  //   ) {
  //     this.windowScrolled = true;
  //   } else if (
  //     (this.windowScrolled && window.pageYOffset) ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop < 10
  //   ) {
  //     this.windowScrolled = false;
  //   }
  // }

  // scrollToTop() {
  //   (function smoothscroll() {
  //     let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //     if (currentScroll > 0) {
  //             window.requestAnimationFrame(smoothscroll);
  //             window.scrollTo(0, currentScroll - (currentScroll / 8));
  //     }
  //   })();
  // }

  //  copyDateFromTableRow( i: number, fromDate: any, toDate: any, Applicability: boolean ) {
  //   console.log( 'aa', Applicability );
  //   // if ( Applicability == true ) {
  //   if ( fromDate !== '' && fromDate != null ) {
  //     console.log( 'set value' );
  //     this.tempFromDate = fromDate;
  //     this.tempToDate = toDate;

  //   } else {
  //     console.log( 'in else part', this.tempFromDate );
  //     this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( new Date( this.tempFromDate ) );
  //     this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( this.tempToDate ) );
  //   }

  // }

  copyDateFromTableRow() {
    // console.log( );
    // if ( fromDate !== '' && fromDate != null ) {
    //   console.log( 'set value' );
    //   this.tempFromDate = fromDate;
    //   this.tempToDate = toDate;

    // } else {
    //   console.log();
    //   this.form.get( 'pfFormArray' )['controls'][i].controls['fromDate'].setValue( new Date( this.tempFromDate ) );
    //   this.form.get( 'pfFormArray' )['controls'][i].controls['toDate'].setValue( new Date( this.tempToDate ) );
    // }

  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });

  }
}
