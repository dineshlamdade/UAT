import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SdnCreationService } from '../sdn-creation.service';
import { ToastrService } from 'ngx-toastr';

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
  moduleData: any;
  tableListData: any;
  fieldTypeData: any;
  sourceTableId: number;
  sourceFieldId: number;
  valueListData: any;
  sourceMasterId: any;
  sourceMasterName: any;
  sourceFieldTypeName: any;
  tempSourceTable: any = [];
  stepperIndex = 1;
  tablevalue: string = '';
  fieldtypevalue: string = '';
  valuelist: any = [];
  sourceValueId: any = [];
  sdmSourceMasterFieldValueMappingDetailList: any = [];
  step1FormDisableFlag: boolean = false;

  constructor(private formBuilder: FormBuilder,private sdmService: SdnCreationService, private toaster: ToastrService) {

    this.sdmFormStep1 = this.formBuilder.group({
      "sdmMasterId": new FormControl(""),
    "groupCompanyId": new FormControl("1"),
    "sdmName": new FormControl(""),
    "sdmDescription": new FormControl(""),
    "sourcePeriod": new FormControl(""),
    "isActive": new FormControl("1"),
    "sdmRemark": new FormControl(""),
    "moduleIdList": new FormControl(""),
    "sdmSourceMasterFieldValueMappingDetailList": new FormControl([]),
    })

    if(localStorage.getItem('sdmFormStep1') != null){
      let data = JSON.parse(localStorage.getItem('sdmFormStep1'))
      this.sdmFormStep1.patchValue(data)
      this.sdmSourceMasterFieldValueMappingDetailList = data.sdmSourceMasterFieldValueMappingDetailList
      this.sdmFormStep1.disable()
      this.step1FormDisableFlag = true;
      this.sourceTableList()
    }
  }
  
  ngOnInit() {
    this.valueListData = [];
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

  abc(value){
  this.stepperIndex = value
  }

  previous() {
    this.stepperIndex = this.stepperIndex - 1;
  }

  next() {
    switch (this.stepperIndex) {
      case 1: {
        // this.step1Submit()
        this.saveSourceDerivedMatrix();
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
    // console.log(this.sdmFormStep1.value)
    // let sourceCount = this.sdmFormStep1.get('noOfSourceCount').value
    // for (let i = 0; i < sourceCount; i++) {
    //   this.sourceArray.push({
    //     sdmMasterDetailsId: null,
    //     sdmSourceDerivedFieldMappingId: null,
    //     isRangeOptionSelected: null,
    //     sourceTableName: null,
    //     sourceValue: null,
    //     isActive: null,
    //   })
    // }
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
    if(this.summeryFlag == true){
      this.applicationModule()
      this.sourceTableList()
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


  //*************** SDM Function start****************************//
  applicationModule(){
    this.sdmService.applicationModule().subscribe(
      res => {
        this.moduleData = res.data.results;
      }
    )
  }

  sourceTableList(){
    this.sdmService.sourceTableList().subscribe(
      res => {
        this.tableListData = res.data.results;
        if(this.step1FormDisableFlag){
          this.tableListData.forEach(ele => {
          this.sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
              if(element.sourceTableId == ele.sourceMasterId){
                this.sourceMasterName = ele.sourceObjectName
              }
              this.sourceValueId = element.sourceValueIdList
            });
            // this.fieldTypeData.forEach(ele => {
            //   if(element.sourceFieldId == ele.sourceFieldId){
            //     this.sourceFieldTypeName = ele.sourceFieldTypeName
            //   }
            // });
            
          });
          this.tempSourceTable.push({
            'tableName': this.sourceMasterName,
            'fieldType':this.sourceFieldTypeName,
            'valueId':this.sourceValueId.toString()
          })
        }
      }
    )
  }

  fieldTypeList(value){
    let val = value.split(',')
    this.sourceMasterId = val[0]
    this.sourceMasterName = val[1]
    this.sdmService.fieldTypeList(this.sourceMasterId).subscribe(
      res => {
        this.fieldTypeData = res.data.results;
      }
    )
  }

  valuesList(SelectedId){
   let value = SelectedId.split(',')
   this.sourceFieldId = value[0]
    this.sourceTableId = value[1]
    this.sourceFieldTypeName = value[2]
    this.sdmService.valuesList(this.sourceTableId,this.sourceFieldId).subscribe(
      res => {
        // this.valueListData = res.data.results;
        res.data.results.forEach(element => {
          this.valueListData.push({
            'label':element.sourceValueName,
            'value':element.sourceValueId
          })
        });
      }
    )
  }

  valueListDataValue(event){
    this.sourceValueId.push(event.itemValue)
  }

  addSource(){
    if(!this.step1FormDisableFlag){
    this.tempSourceTable.push({
      'tableName': this.sourceMasterName,
      'fieldType':this.sourceFieldTypeName,
      'valueId':this.sourceValueId.toString()
    })

    this.sdmSourceMasterFieldValueMappingDetailList.push(
      {
        "sourceMasterFieldValueDetailId":"0",
        "sourceTableId": this.sourceTableId,
        "sourceFieldId": this.sourceFieldId,
        "sourceValueIdList": this.sourceValueId   
      }
    )

    this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)

    this.tablevalue = ""
    this.fieldtypevalue = ""
    this.valuelist = []
    }
  }
 
  removeSource(index){
    this.tempSourceTable.splice(index,1)
  }

  saveSourceDerivedMatrix(){
    this.sdmFormStep1.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep1.controls['moduleIdList'].value)])
    this.sdmFormStep1.controls['sdmMasterId'].setValue(0)
   this.sdmService.saveSourceDerivedMatrix(this.sdmFormStep1.value).subscribe(res =>{
      this.toaster.success("","SDM data saved successfully.")
      this.sdmFormStep1.disable();
      localStorage.setItem('sdmFormStep1',JSON.stringify(this.sdmFormStep1.value))
   })
  }
}
