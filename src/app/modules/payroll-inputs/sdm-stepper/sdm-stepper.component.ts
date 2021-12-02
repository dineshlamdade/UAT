import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SdnCreationService } from '../sdn-creation.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { EllipsisPipe } from './EllipsisPipe'
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PayrollInputsService } from '../payroll-inputs.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { setValue } from '@ngneat/transloco';
import { element } from 'protractor';



const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

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

  users1: any[];
  users2: any[];
  users3: any[];

  sdmFormStep1: FormGroup;
  summaryGridData: Array<any> = [];
  sourceArray: Array<any> = [];
  sourceCountArray: Array<number> = [1, 2, 3, 4, 5]
  sourcePeriodArrayList: ["Asd", "Asd", "Asd", "Asd", "Asd"]

  summeryFlag: boolean = false;

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


  /** ng multiselect */
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  sourceValueName: any = [];
  editTempIndex: any = -1;
  editTempFlag: boolean = false;
  sdmData: any;
  sdmMasterId: any = null;
  sourceCombinationData: any;
  sdmSourceCombinationListData: any;
  srcCombLength: any;
  derivedTypeData: any;
  SelectedCount: any;
  sourceFieldListData: any;
  selectedSourceCombinationData: any = [];
  derivedTableFieldsData: any = [];
  fieldTypes: any[];
  sdmSummeryData: any;
  sdmFormStep3: FormGroup;
  derivedMasterData: any;
  keywordData: any;
  saveDerivedData: any = [];
  tempDerivedTable: any = [];
  derivedTypeName: any = '';
  derivedTableName: any;
  derivedModuleName: any = [];
  sourceObjectName: any;
  derivedMastersData: any;
  combinationMatrixData: any;
  deriType: any;
  matrixDerivedMasterId: any;
  saveMatrixData: any = [];
  sourceRangeFrom: any = '';
  sourceRangeTo: any = '';
  derivedFromDate: any = '';
  derivedToDate: any = '';
  applicableValue: any = '';
  selectedIndex: any = -1;
  selectedCombData: any;
  tempMatrixData: any = [];
  addbtnflag: boolean = false;
  matrixData: any;
  derivedactive: boolean = true;
  ModuledropdownSettings: any;
  selectedSDMModule: any = [];
  sdmForm1ActiveFlag: boolean = true;
  moduleIdListd: any = '';
  matrixTableData: any;
  matrixsdmSourceCombinationList: any;
  setPrevDisabled: boolean = false;
  titleValue: string = 'Source';
  tempfieldType: any = [];
  sourceValueCount: any;
  excelData: any[];
  header: any[];
  copyFromFlag: boolean = false;
  selectedFromDateForSave: any;
  selectedToDateForSave: any;
  copyToFlag: boolean = false;
  rangeApplicableStatus: boolean;
  isDisabled: boolean;
  editTempFlag1: boolean = false;
  selectedtableId: any;
  isRangeApplicableFlag: boolean = false;
  showDropdown: boolean;
  derivedObjectNames: any = 'Value';
  derivedDropdownValue: any = [];
  editFlag: boolean = false;
  tempEditMatrixData: any;
  editTableColDisabled: boolean = false;
  derivedFieldName: any;
  showSearchLeans: boolean = false;
  enableSourcePeriod: boolean = false;
  derivednameexist: boolean = false;
  EmployeeData: any;
  duplicateDataErrorMessage: any;
  tempeditDerivedData: boolean = false;
  selectedDerivedName: any = '';
  editTempDerivedIndex: any;
  sdmDerivedTypeId: any;
  showPercentageFlag: boolean = false;
  matrixHistory: any;
  sourceMasterFieldValueDetailId: any = 0;
  selectedEmployeeId: any = null;
  editDerivedData: any;
  selectedempindex: any = -1;
  sdmDerivedMasterId: any = 0;

  constructor(private formBuilder: FormBuilder, private sdmService: SdnCreationService,
    private toaster: ToastrService, private datepipe: DatePipe, private excelservice: ExcelserviceService,
    private modalService: BsModalService,private Empservice: PayrollInputsService,
    private alertService: AlertServiceService) {

      this.tempDerivedTable.push({
        "derivedName": "",
        "sdmDerivedTypeId": this.sdmDerivedMasterId,
        "selectedDerivedName": this.selectedDerivedName,
        "derivedTypeName": this.derivedTypeName,
        "sourceObjectName": this.sourceObjectName,
        "sdmDerivedTableId": this.derivedTableName,
        "percentageOf": "",
        "moduleIdList": this.derivedModuleName.toString(),
      })

    this.sdmFormStep1 = this.formBuilder.group({
      "sdmMasterId": new FormControl(""),
      "groupCompanyId": new FormControl("1"),
      "sdmName": new FormControl("", Validators.required),
      "sdmDescription": new FormControl("", Validators.required),
      "sourcePeriod": new FormControl(""),
      "isActive": new FormControl("1", Validators.required),
      "sdmRemark": new FormControl(""),
      "moduleIdList": new FormControl("", Validators.required),
      "sdmSourceMasterFieldValueMappingDetailList": new FormControl([]),
    })


    this.sdmFormStep3 = this.formBuilder.group({
      "sdmDerivedMasterId": new FormControl("0"),
      "derivedName": new FormControl("", Validators.required),
      "sdmDerivedTypeId": new FormControl("", Validators.required),
      "sdmMasterId": new FormControl(""),
      "sdmDerivedTableId": new FormControl("", Validators.required),
      "derivedObjectName": new FormControl(""),
      "derivedFieldName": new FormControl(""),
      "percentageOf": new FormControl(null),
      "moduleIdList": new FormControl([], Validators.required),
      "active": new FormControl(true),
      "sdmDerivedMasterRemark": new FormControl(""),
    })


    if (localStorage.getItem('sdmMasterId') != null) {
      this.editTempFlag1 = true
      this.sdmMasterId = localStorage.getItem('sdmMasterId')
      if (localStorage.getItem('sdmFormStep1') != null) {
        let data = JSON.parse(localStorage.getItem('sdmFormStep1'))
        this.sdmFormStep1.patchValue(data)
        this.sdmSourceMasterFieldValueMappingDetailList = data.sdmSourceMasterFieldValueMappingDetailList
        // this.sdmFormStep1.disable()
        this.step1FormDisableFlag = true;
        this.sourceTableList()
        this.applicationModule()

        if (localStorage.getItem('tempsdmFormStep1') != null) {
          let tempdata = JSON.parse(localStorage.getItem('tempsdmFormStep1'))
          this.tempSourceTable = tempdata
        }

        if (localStorage.getItem('tempDerivedTable') != null) {
          let tempDerivedTableData = JSON.parse(localStorage.getItem('tempDerivedTable'))
          this.tempDerivedTable = tempDerivedTableData
        }
      }
    }
  }

  ngOnInit() {
    this.sdmSummery();
    this.valueListData = [];
    this.users1 = [
      { SrNo: '1', DerivedName: 'grp', Module: 'AAA', TableName: 'B', FieldName: 'Hold', DerivedType: 'C', JobFieldType: 'D', Percentageof: 'E' },

    ];

    this.users2 = [
      { headId: 1, Payroll: 'PA1', Grade: 'G1', Department: 'IT', From: '1', To: 10000, Value: '1', fromDate: '', toDate: '' },

      { headId: 2, Payroll: 'PA1', Grade: 'grp', Department: 'Dep1', From: '0', To: 1000, Value: '1', fromDate: '', toDate: '' },
      { headId: 3, Payroll: 'PA1', Grade: 'G2', Department: 'Dep2', From: '10', To: 100000, Value: '1', fromDate: '', toDate: '' },
      { headId: 4, Payroll: 'PA1', Grade: 'G3', Department: 'Dep3', From: '1000', To: 100000, Value: '1', fromDate: '', toDate: '' },
    ];

    this.users3 = [
      { Select: '1', PayrollArea: 'grp', Department: 'AAA', Grade: 'B', SBU: 'rsg', Status: 'gdf' },

    ];
  }

  editSummaryData(data) {
    localStorage.clear()
    this.sdmMasterId = data.sdmMasterId
    this.tempSourceTable = []
    this.stepperIndex = 1
    this.summeryFlag = !this.summeryFlag;
    if (this.summeryFlag == true) {
      this.editFlag = true;
      this.editTempFlag = true;
      this.SdmMasterDetails();
      this.sourceTableList();
      this.sdmFormStep1.controls['sdmName'].disable()
      // this.stepperIndex = -1;
    }
  }

  viewSummary() { }

  getStepper(value) {
    this.stepperIndex = value

    if (value == 0) {
      this.titleValue = 'Source'
    }
    if (value == 1) {
      this.titleValue = 'Source Combination'
    }
    if (value == 2) {
      this.titleValue = 'Derived'
    }
    if (value == 3) {
      this.titleValue = 'Matrix'
    }
  }

  previous() {
    // alert(this.stepperIndex)
    this.stepperIndex = this.stepperIndex - 1;

    if (this.stepperIndex == 1) {
      this.titleValue = 'Source'
    }
    if (this.stepperIndex == 2) {
      this.titleValue = 'Source Combination'
    }
    if (this.stepperIndex == 3) {
      this.titleValue = 'Derived'
    }
    if (this.stepperIndex == 4) {
      this.titleValue = 'Matrix'
    }
  }

  next() {
    // switch (this.stepperIndex) {
    //   case 1: {
    //     break;
    //   }
    //   case 2: {
    //     break;
    //   }
    //   default:
    //     break;
    // }
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
    this.sourceCombinationUpdate();
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

  stepperFunction(value) {
    this.sdmSummery()
    localStorage.clear()
    this.editFlag = false
    this.stepperIndex = 1
    this.editFlag = false;
    this.editTempFlag = false;
    this.editTempFlag1 = false;
    this.editTableColDisabled = false
    this.sdmMasterId = 0
    // this.sdmFormStep1.reset();
    this.sdmFormStep1.controls['moduleIdList'].reset()
    this.sdmFormStep1.controls['sdmName'].reset()
    this.sdmFormStep1.controls['sdmName'].enable();
    this.sdmFormStep1.controls['sdmDescription'].reset()
    this.tempSourceTable = []
    this.tempDerivedTable = []
    this.moduleIdListd = '';
    this.summeryFlag = !this.summeryFlag;
    if (this.summeryFlag == true) {
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
  applicationModule() {
    this.sdmService.applicationModule().subscribe(
      res => {
        this.moduleData = res.data.results;

        if (this.editFlag == true) {
          let d: any = [];
          this.sdmData[0].moduleIdList.forEach(element => {
            //console.log(element)
            this.moduleData.forEach(ele => {
             // console.log("ele s: "+ JSON.stringify(ele))
              if (element == ele.applicationModuleId) {
                d.push({
                  'applicationModuleId': ele.applicationModuleId,
                  'applicationModuleName': ele.applicationModuleName
                })
              }
            });
          });
          console.log(d)
          this.moduleIdListd = d
        }

        if (localStorage.getItem('sdmFormStep1') != null) {
          let data = JSON.parse(localStorage.getItem('sdmFormStep1'))
          let d: any;
          data.moduleIdList.forEach(element => {
            this.moduleData.forEach(ele => {
              if (element == ele.applicationModuleId) {
                d = [{
                  'applicationModuleId': ele.applicationModuleId,
                  'applicationModuleName': ele.applicationModuleName
                }]
              }
            });
          });
          console.log(d)
          this.moduleIdListd = d
          //this.sdmFormStep1.controls['moduleIdList'].setValue(d)
        }
        this.ModuledropdownSettings = {
          singleSelection: false,
          idField: 'applicationModuleId',
          textField: 'applicationModuleName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }
    )
  }

  edittempDerivedData(data,index){
    this.tempeditDerivedData = true;
    this.editTempDerivedIndex = index
    this.sdmDerivedMasterId = data.sdmDerivedMasterId
    alert(this.sdmDerivedMasterId)
    console.log("sdm derived data: " + JSON.stringify(data))
    this.editDerivedData= data
    this.derivedTablesFields()
    
    
  }


  moduleSelectDataValue(event) {
    this.selectedSDMModule.push(event.applicationModuleId)
    this.sdmFormStep1.controls['moduleIdList'].setValue(this.selectedSDMModule)
    let d: any = [];
    this.selectedSDMModule.forEach(element => {
      this.moduleData.forEach(ele => {
        if (element == ele.applicationModuleId) {
          d.push({
            'applicationModuleId': ele.applicationModuleId,
            'applicationModuleName': ele.applicationModuleName
          })
        }
      });
    });

    this.moduleIdListd = d
    //console.log("data: " + this.selectedSDMModule)
  }

  deModuleSelectValueListDataValue(event) {
    this.moduleData.forEach((element, index) => {
      if (element.applicationModuleId == event.applicationModuleId) {
        let ind = index;
        this.selectedSDMModule.splice(ind, 1)
      }
    });
    this.sdmFormStep1.controls['moduleIdList'].setValue(this.selectedSDMModule)
    let d: any = [];
    this.selectedSDMModule.forEach(element => {
      this.moduleData.forEach(ele => {
        if (element == ele.applicationModuleId) {
          d.push({
            'applicationModuleId': ele.applicationModuleId,
            'applicationModuleName': ele.applicationModuleName
          })
        }
      });
    });

    this.moduleIdListd = d
  }

  onModuleSelectAllValueListDataValue(event) {
    event.forEach(element => {
      this.selectedSDMModule.push(element.applicationModuleId)
    });
    this.sdmFormStep1.controls['moduleIdList'].setValue(this.selectedSDMModule)
    let d: any = [];
    this.selectedSDMModule.forEach(element => {
      this.moduleData.forEach(ele => {
        if (element == ele.applicationModuleId) {
          d.push({
            'applicationModuleId': ele.applicationModuleId,
            'applicationModuleName': ele.applicationModuleName
          })
        }
      });
    });

    this.moduleIdListd = d
  }

  sourceTableList() {
    this.sdmService.sourceTableList().subscribe(
      res => {
        this.tableListData = res.data.results;
        if (this.step1FormDisableFlag) {
          this.tempSourceTable = []
          this.tableListData.forEach(ele => {
            this.sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
              if (element.sourceTableId == ele.sourceMasterId) {
                this.sourceMasterName = ele.sourceObjectName
                let val: any = ele.sourceMasterId + ',' + ele.sourceObjectName
                this.fieldTypeList(val, 0)
              }
              this.sourceValueId = element.sourceValueIdList
            });
          });

        }


      }
    )
  }

  fieldTypeList(value, flag) {

    let val = value.split(',')
    this.sourceMasterId = val[0]
    this.sourceMasterName = val[1]

    if (this.sourceMasterName == 'SPAndFunctionMaster') {
      // alert(this.isDisabled)
      this.isDisabled = true;
    } else {
      // alert(this.isDisabled)
      this.isDisabled = false;
    }

    this.tempSourceTable.forEach(element => {
      //console.log(JSON.stringify(element))
      if(element.tableName == 'SPAndFunctionMaster'){
        this.enableSourcePeriod = true;
      }
    });

    this.sdmService.fieldTypeList(this.sourceMasterId).subscribe(
      res => {
        this.fieldTypeData = res.data.results;
        // this.tempfieldType.forEach(ele => {
        //   this.fieldTypeData.forEach((element, index) => {
        //     if (element.sourceFieldId == ele) {
        //       let ind = index;
        //       this.fieldTypeData.splice(ind, 1);
        //     }
        //   });
        // });
        if (this.step1FormDisableFlag && flag == 0) {
          this.fieldTypeData.forEach(ele => {
            this.sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
              if (element.sourceFieldId == ele.sourceFieldId) {
                this.sourceFieldTypeName = ele.sourceFieldTypeName

              }
            });
          });
          // if (this.editFlag) {
          //   this.tempSourceTable = []
          //   this.tableListData.forEach(ele => {
          //     this.fieldTypeData.forEach(field => {
          //       this.sdmData[0].sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
          //         if (ele.sourceMasterId == element.sourceTableId) {
          //           if (element.sourceFieldId == field.sourceFieldId) {
          //             this.sourceFieldTypeName = field.sourceFieldTypeName
          //             let val = field.sourceFieldId + ',' + element.sourceTableId + ',' + this.sourceFieldTypeName
          //             this.valuesList(val)
          //           }
          //         }
          //       })
          //     })
          //   })
          // }
        }
      }
    )
  }

  valuesList(SelectedId) {
    let value = SelectedId.split(',')
    this.sourceFieldId = value[0]
    this.sourceTableId = value[1]
    this.sourceFieldTypeName = value[2]
    this.sdmService.valuesList(this.sourceTableId, this.sourceFieldId).subscribe(
      res => {
        this.valueListData = res.data.results;
        // res.data.results.forEach(element => {
        //   this.valueListData.push({
        //     'label':element.sourceValueName,
        //     'value':element.sourceValueId
        //   })

        // });

        // if (this.editFlag) {
        //   this.tempSourceTable = []
        //   this.tableListData.forEach(ele => {
        //     this.fieldTypeData.forEach(field => {
        //       this.valueListData.forEach(value => {
        //         this.sdmData[0].sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
        //           if (ele.sourceMasterId == element.sourceTableId) {
        //             console.log("table is: " + ele.sourceObjectName)
        //             if (field.sourceFieldId == element.sourceFieldId) {
        //               this.sourceFieldTypeName = field.sourceFieldTypeName
        //               console.log("field is: " + field.sourceFieldTypeName)
        //               if (value.sourceValueId == element.sourceValueId) {
        //                 console.log("value is: " + value.sourceValueName)
        //                 this.tempSourceTable.push({
        //                   'tableName': ele.sourceObjectName,
        //                   'fieldType': field.sourceFieldTypeName,
        //                   'valueId': value.sourceValueName,
        //                   "sourceTableId": element.sourceTableId,
        //                   "sourceFieldId": element.sourceFieldId,
        //                   "sourceValueIdList": element.sourceValueId,
        //                   "count": element.sourceValueIdList.length
        //                 })
        //                 return;
        //               }
        //             }
        //           }
        //         })
        //       })
        //     })
        //   })
        // }

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'sourceValueId',
          textField: 'sourceValueName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }
    )
  }

  valueListDataValue(event) {

    console.log("event data: " + JSON.stringify(event))
    console.log("sourceValueId data: " + this.sourceValueId)

    // this.sourceValueId.push(event.itemValue)

    this.sourceValueId.push(event.sourceValueId)
    this.sourceValueName.push(event.sourceValueName)
    console.log("add: " + this.sourceValueId, this.sourceValueName)
  }

  onSelectAllValueListDataValue(items) {
    items.forEach(element => {
      this.sourceValueId.push(element.sourceValueId)
      this.sourceValueName.push(element.sourceValueName)
    });
  }

  deSelectValueListDataValue(event) {
    this.sourceValueName = []
    let flag = false;
    //console.log("before: " + this.sourceValueId , this.sourceValueName)
    this.sourceValueId.forEach((element, index) => {
      if (element == event.sourceValueId) {
        let ind = index;
        this.sourceValueId.splice(ind, 1)
        flag = true
      }

      if (flag == true) {
        this.valueListData.forEach(element => {
          this.sourceValueId.forEach(id => {
            if (element.sourceValueId == id) {
              this.sourceValueName.push(element.sourceValueName)
            }
          });

        });
      }
    });



    // this.sourceValueName.forEach((element,index) => {
    //  let data = element.toString().split(',')
    //  console.log(data)
    //  data.forEach(ele => {
    //   if(ele == event.sourceValueName){
    //     let ind = index;  
    //     this.sourceValueName.splice(ind,1)
    //   }
    //  });

    // });

    console.log("after: " + this.sourceValueId, this.sourceValueName)
  }

  addSource() {

    if (this.tempSourceTable.length < 5) {
      this.tempSourceTable.push({
        'tableName': this.sourceMasterName,
        'fieldType': this.sourceFieldTypeName,
        'valueId': this.sourceValueName,
        "sourceTableId": this.sourceTableId,
        "sourceFieldId": this.sourceFieldId,
        "sourceValueIdList": this.sourceValueId,
        "count": this.sourceValueName.length
      })

      this.sdmSourceMasterFieldValueMappingDetailList.push({
        "sourceMasterFieldValueDetailId": this.sourceMasterFieldValueDetailId,
        "sourceTableId": this.sourceTableId,
        "sourceFieldId": this.sourceFieldId,
        "sourceValueIdList": this.sourceValueId
      })


      if (this.sourceValueName.length > 0) {
        this.sourceValueCount = this.sourceValueName.length
        //alert(this.sourceValueName.length)
      }
      // return this.sourceValueId;

      this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)

      this.tempSourceTable.forEach(element => {
      //  console.log(JSON.stringify(element))
        if(element.tableName == 'SPAndFunctionMaster'){
          this.enableSourcePeriod = true;
        }
      });

      // localStorage.setItem('sdmFormStep1',JSON.stringify(this.sdmFormStep1.value))
      localStorage.setItem('tempsdmFormStep1', JSON.stringify(this.tempSourceTable))

      this.tablevalue = ""
      this.fieldtypevalue = ""
      this.valuelist = []
      this.sourceValueId = []
      this.sourceValueName = []
    }
    else {
      this.toaster.success("", "Can not exceed source more then 5")
    }
    this.fieldTypeData.forEach((element, index) => {
      if (element.sourceFieldId == this.sourceFieldId) {
        let ind = index;
        this.fieldTypeData.splice(ind, 1);
      }
    });

    this.tempfieldType.push(this.sourceFieldId)
  }

  editSource(data, index) {
    this.sourceValueId = []
    this.editTempFlag = true;
    this.editTempIndex = index;
    this.sourceTableId = data.sourceTableId;
    
    this.sourceFieldId = data.sourceFieldId;
    this.sourceValueId.push(data.sourceValueIdList)
    this.sourceValueName.push(data.valueId)
    this.sourceMasterName = data.tableName
    this.sourceFieldTypeName = data.fieldType
    this.sourceMasterFieldValueDetailId = data.sourceMasterFieldValueDetailId
    console.log(JSON.stringify(data))
    this.tableListData.forEach(ele => {
      if (ele.sourceMasterId == data.sourceTableId) {

        this.tablevalue = ele.sourceMasterId + ',' + ele.sourceObjectName
      }
    })
    this.sdmService.fieldTypeList(data.sourceTableId).subscribe(
      res => {
        this.fieldTypeData = res.data.results;
        this.fieldTypeData.forEach(ele => {
          if (ele.sourceFieldId == data.sourceFieldId) {
            this.fieldtypevalue = ele.sourceFieldId + ',' + ele.sourceTableId + ',' + ele.sourceFieldTypeName
          }
        })
      })
    this.sdmService.valuesList(data.sourceTableId, data.sourceFieldId).subscribe(
      res => {
        // res.data.results.forEach(element => {
        //   this.valueListData.push({
        //     'label':element.sourceValueName,
        //     'value':element.sourceValueId
        //   })
        // })

        this.valuelist = []
        this.valueListData = res.data.results
        console.log("edit value list: " + this.valueListData)
        if(this.editFlag)
        {

          this.dropdownSettings = {
            singleSelection: false,
            idField: 'sourceValueId',
            textField: 'sourceValueName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
          };

          this.editTableColDisabled = true
          this.valueListData.forEach(element => {
              if (element.sourceValueId == data.sourceValueIdList) {
  
                this.valuelist.push({ 'sourceValueId': element.sourceValueId, 'sourceValueName': element.sourceValueName })
  
                //console.log(this.valuelist)
              }
          });
        }else{
          this.editTableColDisabled = false
          this.valueListData.forEach(element => {
            data.sourceValueIdList.forEach(ele => {
              if (element.sourceValueId == ele) {
  
                this.valuelist.push({ 'sourceValueId': element.sourceValueId, 'sourceValueName': element.sourceValueName })
  
                console.log(this.valuelist)
              }
            });
  
          });
        }
        
      })
  }

  updateSource() {
    if (!this.step1FormDisableFlag) {
      this.tempSourceTable.splice(this.editTempIndex, 1, {
        'tableName': this.sourceMasterName,
        'fieldType': this.sourceFieldTypeName,
        'valueId': this.sourceValueName,
        "sourceTableId": this.sourceTableId,
        "sourceFieldId": this.sourceFieldId,
        "sourceValueIdList": this.sourceValueId
      })

      console.log("update: " + this.sourceValueId)

      this.sdmSourceMasterFieldValueMappingDetailList.splice(this.editTempIndex, 1,
        {
          "sourceMasterFieldValueDetailId": this.sourceMasterFieldValueDetailId,
          "sourceTableId": this.sourceTableId,
          "sourceFieldId": this.sourceFieldId,
          "sourceValueIdList": this.sourceValueId,
        }
      )

      this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)

      this.tablevalue = ""
      this.fieldtypevalue = ""
      this.valuelist = []
      this.sourceValueId = []
      this.sourceValueName = []

      this.editTempFlag = true;
    }
  }

  updateSourceDriveMatrix() {
    this.sdmFormStep1.controls['sdmMasterId'].setValue(this.sdmMasterId)
    console.log(this.sdmFormStep1.value)
    this.sdmService.SdmSourceUpdate(this.sdmFormStep1.value).subscribe(res => {
      this.toaster.success("", "SDM data Updated successfully.")
      this.sdmFormStep1.controls['sdmName'].disable();
      localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
      this.sdmMasterId = res.data.results[0].sdmMasterId;
      localStorage.setItem('sdmMasterId', this.sdmMasterId)
      this.sourceCombination();
      this.SdmMasterDetails();
      this.selectedSDMModule = []
    })

  }

  removeSource(index) {
    this.tempSourceTable.splice(index, 1)
    this.sdmSourceMasterFieldValueMappingDetailList.splice(index, 1)
    this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)
    this.step1FormDisableFlag = false;
    this.valuelist = []
    this.sourceValueId = []
    this.sourceValueName = []
    // this.editTempFlag = false;
    localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
    localStorage.setItem('tempsdmFormStep1', JSON.stringify(this.tempSourceTable))

  }

  saveSourceDerivedMatrix() {
    // this.sdmFormStep1.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep1.controls['moduleIdList'].value)])
    this.sdmFormStep1.controls['sdmMasterId'].setValue(0)
    this.sdmFormStep1.controls['groupCompanyId'].setValue(1)

    if (this.sdmMasterId == null) {
      this.sdmService.saveSourceDerivedMatrix(this.sdmFormStep1.value).subscribe(res => {
        this.toaster.success("", "SDM data saved successfully.")
        this.sdmFormStep1.controls['sdmName'].disable();
        localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
        this.sdmMasterId = res.data.results[0].sdmMasterId;
        localStorage.setItem('sdmMasterId', this.sdmMasterId)
        //this.sdmFormStep1.reset();
        // this.sdmMasterId = 9
        // alert(this.sdmMasterId)
        this.sourceCombination();
        this.SdmMasterDetails();
        this.selectedSDMModule = []
      })
    } else {
      this.sdmFormStep1.controls['sdmMasterId'].setValue(this.sdmMasterId)
      this.sdmService.saveSourceDerivedMatrix(this.sdmFormStep1.value).subscribe(res => {
        this.toaster.success("", "SDM data saved successfully.")
        this.sdmFormStep1.controls['sdmName'].disable();
        localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
        this.sdmMasterId = res.data.results[0].sdmMasterId;
        localStorage.setItem('sdmMasterId', this.sdmMasterId)
        //this.sdmFormStep1.reset();
        // this.sdmMasterId = 9
        // alert(this.sdmMasterId)
        this.sourceCombination();
        this.SdmMasterDetails();
        this.selectedSDMModule = []
      })
    }

  }


  SdmMasterDetails() {
    //this.sdmMasterId= 9;
    this.tempSourceTable = []
    this.sdmService.SdmMasterDetails(this.sdmMasterId).subscribe(res => {
     
     this.sdmData = res.data.results;
      if (this.editFlag == true) {
        this.applicationModule()
        // this.sdmSourceMasterFieldValueMappingDetailList = this.sdmData[0].sdmSourceMasterFieldValueMappingDetailList
        this.sdmData[0].sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
          element.sourceValueIdList = [element.sourceValueId]
          // this.step1FormDisableFlag = true
          this.sdmSourceMasterFieldValueMappingDetailList.push({
            "sourceMasterFieldValueDetailId": element.sourceMasterFieldValueDetailId,
            "sourceTableId":element.sourceTableId,
            "sourceFieldId":element.sourceFieldId,
            "sourceValueIdList":element.sourceValueIdList
          })
          let array =[]
          array.push(element.sourceValueName)
          this.tempSourceTable.push({
            "sourceMasterFieldValueDetailId": element.sourceMasterFieldValueDetailId,
            'tableName': element.sourceTableName,
            'fieldType': element.sourceFieldName,
            'valueId': array,
            "sourceTableId": element.sourceTableId,
            "sourceFieldId": element.sourceFieldId,
            "sourceValueIdList": element.sourceValueId,
            "count": element.sourceValueIdList.length
          })
        })
        
        this.sdmFormStep1.patchValue(this.sdmData[0])

      }
    })
  }


  sourceCombination() {

    this.sdmService.sourceCombination(this.sdmMasterId).subscribe(res => {
      this.sourceCombinationData = res.data.results[0];
      this.sourceFieldListData = this.sourceCombinationData.sourceFieldList;
      this.sdmSourceCombinationListData = this.sourceCombinationData.sdmSourceCombinationList;
      this.srcCombLength = this.sdmSourceCombinationListData.length
      this.SelectedCount = 0
      this.sdmSourceCombinationListData.forEach(element => {
        if (element.active) {
          this.SelectedCount = this.SelectedCount + 1
        }
      });
    })
  }

  selectSrcCombination(event, srcCombData) {
    let active;
    if (event.checked) {
      this.SelectedCount = this.SelectedCount + 1
      active = true
    } else {
      this.SelectedCount = this.SelectedCount - 1
      active = false
    }

    if (this.selectedSourceCombinationData.length > 0) {
      this.selectedSourceCombinationData.forEach((element, index) => {
        if (element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) {
          let ind = index;
          this.selectedSourceCombinationData.splice(ind, 1,
            {
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "active": active
            })
        } else {
          this.selectedSourceCombinationData.push(
            {
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "active": active
            })
        }
      });
    } else {
      this.selectedSourceCombinationData.push(
        {
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "active": active
        })
    }

    console.log("selectedSourceCombinationData : " + JSON.stringify(this.selectedSourceCombinationData))
  }

  derivedType() {
    this.sdmService.derivedType().subscribe(res => {
      this.derivedTypeData = res.data.results;
      if(this.editFlag){
        this.derivedMaster()
      }

    })
  }

  sourceCombinationUpdate() {
    this.sdmService.sourceCombinationUpdate(this.selectedSourceCombinationData).subscribe(res => {
      this.toaster.success("", "Source Combination data updated successfully")
    })
  }

  derivedTablesFields() {
    this.derivedTableFieldsData = []
    //alert()
    this.sdmService.derivedTablesFields().subscribe(res => {
      // this.derivedTableFieldsData = res.data.results;

      res.data.results.forEach(element => {
        if(this.derivedTypeName == 'JobField'){
          console.log("jobfield: ")
          if(element.derivedObjectName == 'EmployeeJobMapping' || element.derivedObjectName == 'EmployeePositionMapping' || 
          element.derivedObjectName == 'EmployeeMaster' || element.derivedObjectName == 'complianceSDMMapping'){
            this.derivedTableFieldsData.push(element)
          }
        }else{
          console.log("percentage and value: ")
          if(element.derivedObjectName != 'EmployeeJobMapping' && element.derivedObjectName != 'EmployeePositionMapping'){
            this.derivedTableFieldsData.push(element)
          }
        }
        // else{
        //   console.log("value: ")
        //   this.derivedTableFieldsData = res.data.results
        // }

        if(this.tempeditDerivedData){
          this.derivedTableName = this.editDerivedData.derivedObjectName
          this.derivedTableNameChange(this.editDerivedData.derivedObjectName)
          // this.sdmFormStep3.patchValue(data)
          this.selectedDerivedName = this.editDerivedData.selectedDerivedName
          this.derivedTypeName = this.selectedDerivedName
        }
        
      });
    })
  }

  derivedTableNameChange(value) {
    this.fieldTypes = []
    this.derivedTableName = value
    this.sdmFormStep3.controls['derivedObjectName'].setValue(this.derivedTableName)
    this.derivedTableFieldsData.forEach(element => {
      if (element.derivedObjectName == value) {
        this.selectedtableId = element.sdmDerivedTableId
        // this.fieldTypes =element.sourceObjectFieldNameList
        this.sdmService.derivedTablesFieldsValue(this.selectedtableId).subscribe(res => {
          this.fieldTypes = res.data.results;
          if(this.tempeditDerivedData){
            this.sdmFormStep3.patchValue(this.editDerivedData)
            console.log("derivedFieldName: "+ JSON.stringify(this.editDerivedData))
            this.sourceObjectName = this.editDerivedData.sourceObjectName
            this.sdmFormStep3.controls['derivedFieldName'].setValue(this.sourceObjectName)
            // alert(this.selectedDerivedName)
          }
        })
      }
    });



  }

  checkderivednameexist(derivedname){
    this.tempDerivedTable.forEach(element => {
      if(element.derivedName == derivedname){
        this.derivednameexist = true
      }else{
        this.derivednameexist = false
      }
    });
  }


  sdmSummery() {
    this.sdmService.sdmSummery(1).subscribe(res => {
      this.sdmSummeryData = res.data.results;

      this.sdmSummeryData.forEach(element => {
        if (element.rangeApplicable == true) {
          element.rangeApplicableStatus = 'Yes'
        } else {
          element.rangeApplicableStatus = 'No'
        }
      });

    })
  }

  getDerivedActive(event) {
    if (event.checked) {
      this.derivedactive = true;
    } else {
      this.derivedactive = false
    }
  }

  getSelectedDerivedModule(applicationModuleId) {
    alert(applicationModuleId)
    this.moduleData.forEach(element => {
      if (element.applicationModuleId == applicationModuleId) {
        this.derivedModuleName = element.applicationModuleName
      }
    });


  }

  getDerivedType(sdmDerivedTypeId) {
    this.sdmDerivedTypeId = sdmDerivedTypeId
    this.derivedTypeData.forEach(element => {
      if (element.sdmDerivedTypeId == sdmDerivedTypeId) {
        this.derivedTypeName = element.derivedType
      }
    });
    this.derivedTablesFields()
  }

  derivedFiedName(sdmDerivedTableId) {
    let value = sdmDerivedTableId.split(",")

    // this.fieldTypes.forEach(element => {
    // if(element.sdmDerivedTableId == sdmDerivedTableId){
    // console.log("this.fieldTypes: "+ JSON.stringify(element))
    this.selectedDerivedName = sdmDerivedTableId
    this.sourceObjectName = value[1]
    this.sdmFormStep3.controls['sdmDerivedTableId'].setValue(value[0])
    this.sdmFormStep3.controls['derivedFieldName'].setValue(this.sourceObjectName)

    // this.derivedTablesFields()

    // }
    // });


  }

  addsaveDerived() {
    this.sdmFormStep3.controls['active'].setValue(this.derivedactive)
    this.sdmFormStep3.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep3.controls['moduleIdList'].value)])
    this.sdmFormStep3.controls['sdmDerivedMasterId'].setValue(0)
    this.sdmFormStep3.controls['sdmMasterId'].setValue(this.sdmMasterId)

    this.saveDerivedData.push(this.sdmFormStep3.value)

    //console.log(JSON.stringify(this.sdmFormStep3.value))

    let controls = this.sdmFormStep3.controls
    this.tempDerivedTable.push({
      "derivedName": controls['derivedName'].value,
      "sdmDerivedTypeId": controls['sdmDerivedTypeId'].value,
      "selectedDerivedName": this.selectedDerivedName,
      "derivedTypeName": this.sdmDerivedTypeId,
      "sdmDerivedTypeName":this.derivedTypeName,
      "sourceObjectName": this.sourceObjectName,
      "sdmDerivedTableId": this.derivedTableName,
      "percentageOf": controls['percentageOf'].value,
      "moduleIdList": this.derivedModuleName.toString(),
      "modulename":this.derivedModuleName.toString()
    })

    this.sdmFormStep3.reset()
    this.derivedTableName = ""
    this.derivedactive = true
    this.selectedDerivedName = ""
    this.derivedTypeName = ''
    this.sdmFormStep3.controls['percentageOf'].setValue(0)
  }

  updatesaveDerived(){
    //alert(this.editTempDerivedIndex)
    this.sdmFormStep3.controls['active'].setValue(this.derivedactive)
    this.sdmFormStep3.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep3.controls['moduleIdList'].value)])
    this.sdmFormStep3.controls['sdmDerivedMasterId'].setValue(this.sdmDerivedMasterId)
    this.sdmFormStep3.controls['sdmMasterId'].setValue(this.sdmMasterId)

    this.saveDerivedData.push(this.sdmFormStep3.value)

    //console.log(JSON.stringify(this.sdmFormStep3.value))

    let controls = this.sdmFormStep3.controls
    this.tempDerivedTable.forEach((element,index) => {
      if(this.editTempDerivedIndex == index){
        //alert('here')
        let ind = index
      
        this.tempDerivedTable.splice(ind,1,{
          "derivedName": controls['derivedName'].value,
          "sdmDerivedTypeId": controls['sdmDerivedTypeId'].value,
          "sdmDerivedTypeName":this.derivedTypeName,
          "selectedDerivedName": this.selectedDerivedName,
          "derivedTypeName": this.derivedTypeName,
          "sourceObjectName": this.sourceObjectName,
          "sdmDerivedTableId": this.derivedTableName,
          "percentageOf": controls['percentageOf'].value,
          "moduleIdList": this.derivedModuleName.toString(),
        })
      }
    });

    this.sdmFormStep3.reset()
    this.derivedTableName = ""
    this.derivedactive = true
    this.tempeditDerivedData = false
    this.selectedDerivedName = ""
    this.showPercentageFlag = false
  }

  resetSdmForm1() {
    this.sdmFormStep1.reset();
    this.valueListData = ''
  }

  resetsdmForm3() {
    this.sdmFormStep3.reset();
    this.derivedactive = true;
  }

  saveDerived() {
    this.sdmService.saveDerived(this.saveDerivedData).subscribe(( res: any ) => {
      
     // this.alertService.sweetalertMasterSuccess("", "Derived data saved successfully.")
    //  alert(JSON.stringify(res.status))
     this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
      //this.sdmFormStep1.controls['sdmName'].disable();
     // this.duplicateDataErrorMessage = res.status.messsage[1];
     
      this.sdmFormStep3.reset();
          // this.alertService.sweetalertError( error["error"]["status"]["message"] );
        })
  }


  KeywordMasterDetails() {
    this.sdmService.KeywordMasterDetails().subscribe(res => {
      this.keywordData = res.data.results;

    })
  }

  derivedMaster() {
    this.tempDerivedTable = []
    this.sdmService.derivedMaster(this.sdmMasterId).subscribe(res => {
      this.derivedMastersData = res.data.results;
      console.log("derived Master data: "+ JSON.stringify(this.derivedMastersData))
      if(this.editFlag){
        this.derivedMastersData.forEach(element => {
           if(element.percentageOf != null){
             this.showPercentageFlag = true
           }
          this.tempDerivedTable.push({
            "derivedName": element.derivedName,
            "sdmDerivedMasterId":element.sdmDerivedMasterId,
            "sdmDerivedTypeId": element.sdmDerivedTypeId,
            "sdmDerivedTypeName": element.derivedType,
            "modulename": element.modulename,
            "selectedDerivedName": element.sdmDerivedTableId + ','+ element.derivedFieldName,
            "sourceObjectName": element.derivedFieldName,
            "derivedObjectName":element.derivedObjectName,
            "sdmDerivedTableId": element.derivedObjectName,
            "percentageOf": element.percentageOf,
            "moduleIdList": this.derivedModuleName.toString(),
          })
        });
        
      }

    })
  }

  onChangeDriveName(value) {
    this.derivedMastersData.forEach(element => {
      if (element.derivedName == value) {
        // this.deriType = element.derivedFieldName;
        this.deriType = element.derivedType;
        this.matrixDerivedMasterId = element.sdmDerivedMasterId

        if (element.derivedObjectName == 'EmployeeJobMapping') {
          this.sdmService.derivedFieldName(element.derivedFieldName).subscribe(res => {
            this.derivedDropdownValue = res.data.results[0]
          })
          this.showDropdown = true;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        } else {
          this.showDropdown = false;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        }



        if (element.derivedObjectName == 'EmployeeMaster') {
          this.sdmService.derivedFieldName(element.derivedFieldName).subscribe(res => {
            this.derivedDropdownValue = res.data.results[0]
          })
          this.showSearchLeans = true;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        } else {
          this.showSearchLeans = false;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        }
      }

    });


  }

  combinationMatrix() {
    this.sourceCombination();
    // this.sdmService.combinationMatrix(this.sdmMasterId).subscribe(res =>{
    //   this.combinationMatrixData = res.data.results;
    //   this.combinationMatrixData.forEach(element => {
    //     this.sdmSourceCombinationListData.forEach(ele => {
    //       if(element.sdmSourceCombinationId == ele.sdmSourceCombinationId){
    //         element.payrollAreaId = ele.payrollAreaId,
    //         element.establishmentMasterId = ele.establishmentMasterId,
    //         element.subLocationMasterId = ele.subLocationMasterId,
    //         element.workLocationMasterId = ele.workLocationMasterId,
    //         element.businessAreaMasterId = ele.businessAreaMasterId,
    //         element.subAreaId = ele.subAreaId,
    //         element.strategicBusinessUnitId = ele.strategicBusinessUnitId,
    //         element.divisionMasterId = ele.divisionMasterId,
    //         element.departmentMasterId = ele.departmentMasterId,
    //         element.subDepartmentId = ele.subDepartmentId,
    //         element.costCentreId = ele.costCentreId,
    //         element.subCostCenterId = ele.subCostCenterId,
    //         element.profitCentreMasterId = ele.profitCentreMasterId,
    //         element.gradeMasterId = ele.gradeMasterId,
    //         element.designation1MasterId = ele.designation1MasterId,
    //         element.designation2MasterId = ele.designation2MasterId,
    //         element.createdBy = ele.createdBy,
    //         element.lastModifiedBy = ele.lastModifiedBy,
    //         element.createDateTime = ele.createDateTime,
    //         element.lastModifiedDateTime = ele.lastModifiedDateTime
    //       }
    //     });

    //   });

    //   console.log(this.combinationMatrixData);
    // })
  }

  sourceRangeFromData(value, index, srcCombData) {
    //console.log("srcCombData: "+ JSON.stringify(srcCombData))
    this.sourceRangeFrom = value
    this.selectedIndex = index;
    this.selectedCombData = srcCombData

    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }

    if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmCombinationId == srcCombData.sdmSourceCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": "0",
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": element.derivedToDate,
              "applicableValue": element.applicableValue
            })
          }else{
  
            this.saveMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": this.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue
            })
        
            this.tempMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": this.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
    
        this.tempMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })
      }
    }
    
    

    console.log("this.saveMatrixData fromrange: " + JSON.stringify(this.saveMatrixData))

    this.sourceRangeFrom = ''
    this.sourceRangeTo = ''
    this.derivedFromDate = ''
    this.derivedToDate = ''
    this.applicableValue = ''
    this.addbtnflag = false
    this.selectedIndex = -1
    this.selectedFromDateForSave = ''
    this.selectedToDateForSave = ''
  }

  sourceRangeToData(value,index, srcCombData) {
    this.sourceRangeTo = value
    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }

    if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmCombinationId == srcCombData.sdmCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": "0",
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": element.derivedToDate,
              "applicableValue": element.applicableValue
            })
          }else{
  
            this.saveMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": this.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue
            })
        
            this.tempMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": this.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
    
        this.tempMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })
      }
    }

    console.log("this.saveMatrixData torange: " + JSON.stringify(this.saveMatrixData))

  }

  getEditedSourceRangeFrom(value,srcCombData){
    console.log("this edited Source range data: "+ JSON.stringify(srcCombData))
    // debugger
    this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = srcCombData.derivedToDate
    this.sourceRangeFrom = value

    if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": value,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(element.derivedFromDate),'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(element.derivedToDate),'yyyy-MM-dd'),
              "applicableValue": element.applicableValue
            })
            this.tempEditMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": srcCombData.matrixDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": value,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(element.derivedFromDate),'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(element.derivedToDate),'yyyy-MM-dd'),
              "applicableValue": element.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < index; i++) {
               if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
               if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }

            }
           

            this.saveMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": value,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave),'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave),'yyyy-MM-dd'),
              "applicableValue": srcCombData.applicableValue
            })
        
            this.tempEditMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": value,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave),'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave),'yyyy-MM-dd'),
              "applicableValue": srcCombData.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": value,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
    
        this.tempEditMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": value,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })
      }
    }


    console.log("this edited data: "+ JSON.stringify(this.saveMatrixData))
  }

  getEditedSourceRangeTo(value,srcCombData){
    this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = srcCombData.derivedToDate
    this.sourceRangeTo=value


    // if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": value,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": element.derivedToDate,
              "applicableValue": element.applicableValue
            })
            this.tempEditMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.matrixDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": value,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": element.derivedToDate,
              "applicableValue": element.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < index; i++) {
               if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
               if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }

            }
           

            this.saveMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": value,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": srcCombData.applicableValue
            })
        
            this.tempEditMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": value,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": srcCombData.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": value,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
    
        this.tempEditMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": value,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })
      }
    // }


    console.log("this edited data: "+ JSON.stringify(this.saveMatrixData))
  
  }

  getEditFromDateForSave(value,srcCombData){
    this.selectedFromDateForSave = value
    // this.selectedToDateForSave = srcCombData.derivedToDate


    // if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave),'yyyy-MM-dd'),
              "derivedToDate": element.derivedToDate,
              "applicableValue": element.applicableValue
            })
            // this.tempEditMatrixData.splice(ind,1,{
            //   "sdmCombinationId": element.sdmCombinationId,
            //   "sdmMasterId": element.sdmMasterId,
            //   "sdmDerivedMasterId": element.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": element.sdmSourceCombinationId,
            //   "sourceRangeFrom": element.sourceRangeFrom,
            //   "sourceRangeTo": element.sourceRangeTo,
            //   "derivedFromDate": element.derivedFromDate,
            //   "derivedToDate": element.derivedToDate,
            //   "applicableValue": element.applicableValue,
            //   'selectedCombData': this.selectedCombData
            // })
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < index; i++) {
               if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
               if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }

            }
           

            this.saveMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": srcCombData.applicableValue
            })
        
            this.tempEditMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": srcCombData.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
    
        this.tempMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })
      // }
    }


    console.log("this edited data: "+ JSON.stringify(this.saveMatrixData))
  }

  getEditToDateForSave(value,srcCombData){
    // this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = value


    // if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave),'yyyy-MM-dd'),
              "applicableValue": element.applicableValue
            })
            // this.tempEditMatrixData.splice(ind,1,{
            //   "sdmCombinationId": element.sdmCombinationId,
            //   "sdmMasterId": element.sdmMasterId,
            //   "sdmDerivedMasterId": element.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": element.sdmSourceCombinationId,
            //   "sourceRangeFrom": element.sourceRangeFrom,
            //   "sourceRangeTo": element.sourceRangeTo,
            //   "derivedFromDate": element.derivedFromDate,
            //   "derivedToDate": element.derivedToDate,
            //   "applicableValue": element.applicableValue,
            //   'selectedCombData': this.selectedCombData
            // })
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < index; i++) {
               if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
               if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }

            }
           

            this.saveMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": srcCombData.applicableValue
            })
        
            this.tempEditMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": srcCombData.applicableValue,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
    
        this.tempEditMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })
      }
    // }
    console.log("this edited data: "+ JSON.stringify(this.saveMatrixData))
    
  }

  getEditedApplicableValue(value,srcCombData){
    this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = srcCombData.derivedToDate
// alert(this.isRangeApplicableFlag)
    // if(this.isRangeApplicableFlag == true){
      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            let ind = index;
            this.saveMatrixData.splice(ind,1,{
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": element.derivedToDate,
              "applicableValue": value
            })
            // this.tempEditMatrixData.splice(ind,1,{
            //   "sdmCombinationId": element.sdmCombinationId,
            //   "sdmMasterId": element.sdmMasterId,
            //   "sdmDerivedMasterId": element.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": element.sdmSourceCombinationId,
            //   "sourceRangeFrom": element.sourceRangeFrom,
            //   "sourceRangeTo": element.sourceRangeTo,
            //   "derivedFromDate": element.derivedFromDate,
            //   "derivedToDate": element.derivedToDate,
            //   "applicableValue": value,
            //   'selectedCombData': this.selectedCombData
            // })
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < index; i++) {
               if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
               if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }

            }
           

            this.saveMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": value
            })
        
            this.tempEditMatrixData.push({
              "sdmCombinationId": srcCombData.sdmCombinationId,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": value,
              'selectedCombData': this.selectedCombData
            })
          }
        });
      }else{
        this.saveMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": value
        })
    
        this.tempEditMatrixData.push({
          "sdmCombinationId": srcCombData.sdmCombinationId,
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
          "sourceRangeFrom": srcCombData.sourceRangeFrom,
          "sourceRangeTo": srcCombData.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
          "applicableValue": value,
          'selectedCombData': this.selectedCombData
        })
      }
    // }else{
    //   if(this.saveMatrixData.length > 0)
    //   {
    //     this.saveMatrixData.forEach((element,index) => {
    //       if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
    //         let ind = index;
    //         this.saveMatrixData.splice(ind,1,{
    //           "sdmCombinationId": element.sdmCombinationId,
    //           "sdmMasterId": element.sdmMasterId,
    //           "sdmDerivedMasterId": element.sdmDerivedMasterId,
    //           "sdmSourceCombinationId": element.sdmSourceCombinationId,
    //           "sourceRangeFrom": element.sourceRangeFrom,
    //           "sourceRangeTo": element.sourceRangeTo,
    //           "derivedFromDate": element.derivedFromDate,
    //           "derivedToDate": element.derivedToDate,
    //           "applicableValue": value
    //         })
    //         // this.tempEditMatrixData.splice(ind,1,{
    //         //   "sdmCombinationId": element.sdmCombinationId,
    //         //   "sdmMasterId": element.sdmMasterId,
    //         //   "sdmDerivedMasterId": element.matrixDerivedMasterId,
    //         //   "sdmSourceCombinationId": element.sdmSourceCombinationId,
    //         //   "sourceRangeFrom": element.sourceRangeFrom,
    //         //   "sourceRangeTo": element.sourceRangeTo,
    //         //   "derivedFromDate": element.derivedFromDate,
    //         //   "derivedToDate": element.derivedToDate,
    //         //   "applicableValue": value,
    //         //   'selectedCombData': element.selectedCombData
    //         // })
    //       }else{
  
    //         let length = this.saveMatrixData.length - 1;
            
    //         if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
    //         if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
    //         if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
    //         if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
    //         for (let i = 0; i < index; i++) {
    //            if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
    //            if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }

    //         }
           

    //         this.saveMatrixData.push({
    //           "sdmCombinationId": srcCombData.sdmCombinationId,
    //           "sdmMasterId": this.sdmMasterId,
    //           "sdmDerivedMasterId": this.matrixDerivedMasterId,
    //           "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
    //           "sourceRangeFrom": srcCombData.sourceRangeFrom,
    //           "sourceRangeTo": srcCombData.sourceRangeTo,
    //           "derivedFromDate": this.selectedFromDateForSave,
    //           "derivedToDate": this.selectedToDateForSave,
    //           "applicableValue": value
    //         })
        
    //         this.tempEditMatrixData.push({
    //           "sdmCombinationId": srcCombData.sdmCombinationId,
    //           "sdmMasterId": this.sdmMasterId,
    //           "sdmDerivedMasterId": this.matrixDerivedMasterId,
    //           "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
    //           "sourceRangeFrom": srcCombData.sourceRangeFrom,
    //           "sourceRangeTo": srcCombData.sourceRangeTo,
    //           "derivedFromDate": this.selectedFromDateForSave,
    //           "derivedToDate": this.selectedToDateForSave,
    //           "applicableValue": value,
    //           'selectedCombData': this.selectedCombData
    //         })
    //       }
    //     });
    //   }else{
    //     this.saveMatrixData.push({
    //       "sdmCombinationId": srcCombData.sdmCombinationId,
    //       "sdmMasterId": this.sdmMasterId,
    //       "sdmDerivedMasterId": this.matrixDerivedMasterId,
    //       "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
    //       "sourceRangeFrom": srcCombData.sourceRangeFrom,
    //       "sourceRangeTo": srcCombData.sourceRangeTo,
    //       "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
    //       "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
    //       "applicableValue": value
    //     })
    
    //     this.tempEditMatrixData.push({
    //       "sdmCombinationId": srcCombData.sdmCombinationId,
    //       "sdmMasterId": this.sdmMasterId,
    //       "sdmDerivedMasterId": this.matrixDerivedMasterId,
    //       "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
    //       "sourceRangeFrom": srcCombData.sourceRangeFrom,
    //       "sourceRangeTo": srcCombData.sourceRangeTo,
    //       "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
    //       "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
    //       "applicableValue": value,
    //       'selectedCombData': this.selectedCombData
    //     })
    //   }
    // }
    console.log("this edited data: "+ JSON.stringify(this.saveMatrixData))
    console.log("this edited data: "+ JSON.stringify(this.tempMatrixData))

    
  }


  applicableValueData(value,srcCombData) {
    this.applicableValue = value
    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }


    if(!this.isRangeApplicableFlag){
      this.selectedFromDateForSave = srcCombData.derivedFromDate
      this.selectedToDateForSave = srcCombData.derivedToDate


      if(this.isRangeApplicableFlag == true){
        if(this.saveMatrixData.length > 0)
        {
          this.saveMatrixData.forEach((element,index) => {
            if(element.sdmCombinationId == srcCombData.sdmSourceCombinationId){
              let ind = index;
              this.saveMatrixData.splice(ind,1,{
                "sdmCombinationId": element.sdmCombinationId,
                "sdmMasterId": element.sdmMasterId,
                "sdmDerivedMasterId": element.sdmDerivedMasterId,
                "sdmSourceCombinationId": element.sdmSourceCombinationId,
                "sourceRangeFrom": element.sourceRangeFrom,
                "sourceRangeTo": element.sourceRangeTo,
                "derivedFromDate": element.derivedFromDate,
                "derivedToDate": element.derivedToDate,
                "applicableValue": setValue
              })
              this.tempMatrixData.splice(ind,1,{
                "sdmCombinationId": element.sdmCombinationId,
                "sdmMasterId": element.sdmMasterId,
                "sdmDerivedMasterId": element.matrixDerivedMasterId,
                "sdmSourceCombinationId": element.sdmSourceCombinationId,
                "sourceRangeFrom": element.sourceRangeFrom,
                "sourceRangeTo": element.sourceRangeTo,
                "derivedFromDate": element.derivedFromDate,
                "derivedToDate": element.derivedToDate,
                "applicableValue": value,
                'selectedCombData': this.selectedCombData
              })
            }else{
    
              let length = this.saveMatrixData.length - 1;
              
              if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              
              for (let i = 0; i < index; i++) {
                if (this.saveMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                if (this.tempEditMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }

              }
            

              this.saveMatrixData.push({
                "sdmCombinationId": srcCombData.sdmCombinationId,
                "sdmMasterId": this.sdmMasterId,
                "sdmDerivedMasterId": this.matrixDerivedMasterId,
                "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                "sourceRangeFrom": srcCombData.sourceRangeFrom,
                "sourceRangeTo": srcCombData.sourceRangeTo,
                "derivedFromDate": this.selectedFromDateForSave,
                "derivedToDate": this.selectedToDateForSave,
                "applicableValue": value
              })
          
              this.tempMatrixData.push({
                "sdmCombinationId": srcCombData.sdmCombinationId,
                "sdmMasterId": this.sdmMasterId,
                "sdmDerivedMasterId": this.matrixDerivedMasterId,
                "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                "sourceRangeFrom": srcCombData.sourceRangeFrom,
                "sourceRangeTo": srcCombData.sourceRangeTo,
                "derivedFromDate": this.selectedFromDateForSave,
                "derivedToDate": this.selectedToDateForSave,
                "applicableValue": value,
                'selectedCombData': this.selectedCombData
              })
            }
          });
        }else{
          this.saveMatrixData.push({
            "sdmCombinationId": srcCombData.sdmCombinationId,
            "sdmMasterId": this.sdmMasterId,
            "sdmDerivedMasterId": this.matrixDerivedMasterId,
            "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            "sourceRangeFrom": srcCombData.sourceRangeFrom,
            "sourceRangeTo": srcCombData.sourceRangeTo,
            "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
            "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
            "applicableValue": value
          })
      
          this.tempMatrixData.push({
            "sdmCombinationId": srcCombData.sdmCombinationId,
            "sdmMasterId": this.sdmMasterId,
            "sdmDerivedMasterId": this.matrixDerivedMasterId,
            "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            "sourceRangeFrom": srcCombData.sourceRangeFrom,
            "sourceRangeTo": srcCombData.sourceRangeTo,
            "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
            "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
            "applicableValue": this.applicableValue,
            'selectedCombData': value
          })
        }
      }
      console.log("this fromdate data: "+ JSON.stringify(this.saveMatrixData))
    }
    

  }

  derivedFromDateData(value) {
    this.derivedFromDate = this.datepipe.transform(new Date(value), 'dd-MMM-yyyy')
    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }
  }

  derivedToDateData(value) {
    this.derivedToDate = this.datepipe.transform(new Date(value), 'dd-MMM-yyyy')
    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }
  }

  addMatrixData(sdmcombination, rowIndex) {
    this.saveMatrixData.push({
      "sdmCombinationId": "0",
      "sdmMasterId": this.sdmMasterId,
      "sdmDerivedMasterId": this.matrixDerivedMasterId,
      "sdmSourceCombinationId": sdmcombination.sdmSourceCombinationId,
      "sourceRangeFrom": this.sourceRangeFrom,
      "sourceRangeTo": this.sourceRangeTo,
      "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
      "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
      "applicableValue": this.applicableValue
    })

    this.tempMatrixData.push({
      "sdmCombinationId": "0",
      "sdmMasterId": this.sdmMasterId,
      "sdmDerivedMasterId": this.matrixDerivedMasterId,
      "sdmSourceCombinationId": sdmcombination.sdmSourceCombinationId,
      "sourceRangeFrom": this.sourceRangeFrom,
      "sourceRangeTo": this.sourceRangeTo,
      "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
      "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
      "applicableValue": this.applicableValue,
      'selectedCombData': this.selectedCombData
    })

    console.log("this.saveMatrixData: " + JSON.stringify(this.saveMatrixData))

    this.sourceRangeFrom = ''
    this.sourceRangeTo = ''
    this.derivedFromDate = ''
    this.derivedToDate = ''
    this.applicableValue = ''
    this.addbtnflag = false
    this.selectedIndex = -1
    this.selectedFromDateForSave = ''
    this.selectedToDateForSave = ''
  }


  saveMatrix() {
    this.sdmService.saveMatrix(this.saveMatrixData).subscribe(res => {
      this.toaster.success("", "Matrix data saved successfully")
      this.saveMatrixData = []
      this.tempMatrixData = []
      this.setPrevDisabled = true;
      this.getMatrixData();

        localStorage.clear()
       this.summeryFlag = false
   
    this.sdmSummery()
    })
  
  }


  getMatrixData() {
    this.sdmService.combinationMatrix(this.sdmMasterId).subscribe(res => {
      
      res.data.results.forEach(element => {
        element.derivedFromDate = this.datepipe.transform(new Date(element.derivedFromDate),'yyyy-MM-dd')
        element.derivedToDate = this.datepipe.transform(new Date(element.derivedToDate),'yyyy-MM-dd')
      });

      this.matrixData = res.data.results;
      // console.log("selected comb data: " + this.selectedCombData)
      // console.log("this.matrixsdmSourceCombinationList: " + this.matrixsdmSourceCombinationList)
      if(this.editFlag){
        this.tempEditMatrixData = this.matrixData
        this.tempEditMatrixData.forEach(element => {
          this.sdmSourceCombinationListData.forEach(ele => {
            if(element.sdmSourceCombinationId == ele.sdmSourceCombinationId){
              element.selectedCombData = ele
            }
          });
        });

        console.log("this.tempEditMatrixData: "+ JSON.stringify(this.tempEditMatrixData))
        this.saveMatrixData = []
        // this.saveMatrixData = this.matrixData
        this.matrixData.forEach(element => {
          this.saveMatrixData.push(
            {
              "sdmCombinationId": element.sdmCombinationId,
              "sdmMasterId": element.sdmMasterId,
              "sdmDerivedMasterId": element.sdmDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": element.derivedToDate,
              "applicableValue": element.applicableValue
            }
          )
        });

      }
      
      
    })
  }

  viewMatrixDataHistory(matrixdata){

    const formData = new FormData();
    formData.append('sdmMasterId', this.sdmMasterId)
    formData.append('sdmSourceCombinationId', matrixdata.sdmSourceCombinationId)

    this.sdmService.getHistory(formData).subscribe(res =>{
      this.matrixHistory = res.data.results;
      this.matrixHistory.forEach(element => {
        this.sdmSourceCombinationListData.forEach(ele => {
          if(element.sdmSourceCombinationId == ele.sdmSourceCombinationId){
            console.log("element")
            element.selectedCombData = ele
          }
        });   
      });
    })

  }

  getMatrixTableData() {
    this.sdmService.getMatrixData(this.sdmMasterId).subscribe(res => {
      this.matrixTableData = res.data.results[0].sourceFieldList;
      this.matrixsdmSourceCombinationList = res.data.results[0].sdmSourceCombinationList
      this.isRangeApplicableFlag = res.data.results[0].isRangeApplicable;
      this.getMatrixData();
    })
  }

  sdm1FormActive(event) {
    if (event.checked) {
      this.sdmForm1ActiveFlag = true;
    }
    else {
      this.sdmForm1ActiveFlag = false;
    }

    this.sdmFormStep1.controls['isActive'].setValue(this.sdmForm1ActiveFlag)
  }


  getFromDateForSave(event, data, index) {
    console.log("data is: "+ JSON.stringify(data))
    this.derivedFromDate = event
    this.selectedFromDateForSave = event
    if (this.isRangeApplicableFlag == false) {
      if (this.saveMatrixData.length > 0) {
        this.saveMatrixData.forEach(element => {
          if (data.sdmSourceCombinationId == element.sdmSourceCombinationId) {
            this.saveMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
              "derivedToDate": element.derivedToDate,
              "applicableValue": this.applicableValue
            })
          } else {
            this.saveMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": data.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": this.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.derivedFromDate), 'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.derivedToDate), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue
            })
          }
        });
      } else {
        this.saveMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": data.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.derivedFromDate), 'yyyy-MM-dd'),
          "derivedToDate": "",
          "applicableValue": this.applicableValue
        })
      }

    }
  }

  getToDateForSave(event, data, index) {
    this.derivedToDate = event
    this.selectedToDateForSave = event
    if (this.isRangeApplicableFlag == false) {
      if (this.saveMatrixData.length > 0) {
        this.saveMatrixData.forEach(element => {
          if (data.sdmSourceCombinationId == element.sdmSourceCombinationId) {
            this.saveMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": element.sdmSourceCombinationId,
              "sourceRangeFrom": element.sourceRangeFrom,
              "sourceRangeTo": element.sourceRangeTo,
              "derivedFromDate": element.derivedFromDate,
              "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue
            })
          } else {
            this.saveMatrixData.push({
              "sdmCombinationId": "0",
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": data.sdmSourceCombinationId,
              "sourceRangeFrom": this.sourceRangeFrom,
              "sourceRangeTo": this.sourceRangeTo,
              "derivedFromDate": this.datepipe.transform(new Date(this.derivedFromDate), 'yyyy-MM-dd'),
              "derivedToDate": this.datepipe.transform(new Date(this.derivedToDate), 'yyyy-MM-dd'),
              "applicableValue": this.applicableValue
            })
          }
        });
      } else {
        this.saveMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": data.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.derivedFromDate), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(new Date(this.derivedToDate), 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue
        })
      }

    }
  }

  /** Copy To From Date TO All */
  copyFromDateToAll(data, index) {
    console.log("copy dta: " + JSON.stringify(data))
    this.copyFromFlag = !this.copyFromFlag
    if (!this.copyFromFlag) {

      this.matrixsdmSourceCombinationList.forEach(element => {
        if (parseInt(element.sdmSourceCombinationId) == parseInt(data.sdmSourceCombinationId)) {
          // alert('here')    
          // this.selectedIndex = index;
          element.derivedFromDate = this.datepipe.transform(new Date(this.selectedFromDateForSave), 'dd-MMM-yyyy')
          element.derivedToDate = this.datepipe.transform(new Date(this.selectedToDateForSave), 'dd-MMM-yyyy')
          this.copyFromFlag = true
        }
      })
    } else {

      this.toaster.warning("From Date copied!")
    }
  }


  largepopup(template: TemplateRef<any>,index) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.selectedIndex = index
    this.getAllEmployeeDetails();
  }



  excelDownload(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    document.getElementById(tableID).style.border = "1px solid black";
    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    // if (navigator.msSaveOrOpenBlob) {
    //   var blob = new Blob(['\ufeff', tableHTML], {
    //     type: dataType
    //   });
    //   navigator.msSaveOrOpenBlob(blob, filename);
    // } else {
    //   // Create a link to the file
    //   downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    //   // Setting the file name
    //   downloadLink.download = filename;

    //   //triggering the function
    //   downloadLink.click();
    // }
  }

  /**
   * Create Excel File Functionality
   * @param json
   * @param excelFileName
   */
  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  /**
   * Save Excel File
   * @param buffer
   * @param fileName
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  public getAllEmployeeDetails(): void {
    this.Empservice.getAllEmployeeDetails().subscribe((res) => {
      this.EmployeeData = res.data.results[0];
      this.EmployeeData.forEach(element => {
        element.checkboxFlag = false
      });
      
    });
  }

  selectedEmpId(employeedata, event, index){
    if(event.checked){
      this.selectedempindex = index
      this.selectedEmployeeId = employeedata.employeeMasterId
      this.applicableValue = this.selectedEmployeeId 
      this.EmployeeData.forEach((element,index) => {
        if(this.selectedempindex != index){
          element.checkboxFlag = true
        }
        
      });
    }else{
      this.selectedEmployeeId = null
      this.applicableValue = ''
      this.selectedempindex = -1
      this.EmployeeData.forEach((element,index) => {
          element.checkboxFlag = false
      });
    }
  }

  resetSelectedEmpData(){
    this.selectedEmployeeId = null
      this.applicableValue = ''
      this.selectedempindex = -1
      this.EmployeeData.forEach((element,index) => {
          element.checkboxFlag = false
      });
  }


  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
