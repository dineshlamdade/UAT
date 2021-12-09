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
import { ar } from 'date-fns/locale';
import { getWeekYearWithOptions } from 'date-fns/fp';



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
  sourceMasterId: number;
  valueListData: any;
  sdmSourceObjectMasterId: any;
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
  derivedApplicableFlag: any =0;



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
  matrixData: any = [];
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
  selectedFromDateForSave: any = '';
  selectedToDateForSave: any= '';
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
  tempEditMatrixData: any = [];
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
  editSDMdata: any;
  filterData: any;
  tempMatrixSDMSourceCombinationList: any;
  SDMCombinationwithDerivedIdData: any;
  tempSelectedDerivedName: any = '';
  selectedSercData: any;
  showEditTextBox: boolean = false;
  isPayrollAreaFlag: boolean = false;
  showErrorFlag: boolean = false;
  updateBtnFlag: boolean = false;
  singleSelect: any = [];
  
  config = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10,
  };

  options = [
    {
      index: 0,
      name:'Current Cycle End'
      },
      {
      index: 1,
      name:'Current Cycle Start'
      },
      {
      index: 2, 
      name:'Previous Cycle End'
      },
      {
      index: 3,
      name:'Previous Cycle Start'
      },
      {
      index: 4,
      name:'Current Month End'
      },
      {
      index: 5,
      name:'Current Month Start'
      },
      {
      index: 6,
      name:'Previous Month End' 
      },
      {
      index: 7,
      name:'Previous Month Start'
      },
      {
      index: 8,
      name:'Previous BY End'
      },
      {
      index: 9,
      name:'Previous BY Start'
      },
      {
      index: 10, 
      name:'Current Cal. Year End'
      },
      {
      index: 11,
      name:'Current Cal. Year End'
      },
      {
      index: 12,
      name:'Previous Cal. Year End'
      },
      {
      index: 13,
      name:'Previous Cal. Year Start'
      },
      {
      index: 14,
      name:'During Current Cycle'
      },
      {
      index: 15,
      name:'During Current Month'
      },
      {
      index: 16,
      name:'During Current BY'
      },
      {
      index: 17,
      name:'During Current Cal. Year'
      }
  ];
  FieldTypeName: any;
  sourcePeriod: any;
  headList: any;
  isUomFlag: boolean = false;

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
      // "createdBy": new FormControl("Shubham"),
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
      "headMasterId":new FormControl(""),
      "uom": new FormControl(""),
      "isDerivedIdApplicable":new FormControl("")

    })

    if (localStorage.getItem('sdmMasterId') != null) {
      this.editTempFlag1 = true
      this.sdmMasterId = localStorage.getItem('sdmMasterId')
      if (localStorage.getItem('sdmFormStep1') != null) {
        let data = JSON.parse(localStorage.getItem('sdmFormStep1'))
        this.sdmFormStep1.patchValue(data)
        this.sdmSourceMasterFieldValueMappingDetailList = data.sdmSourceMasterFieldValueMappingDetailList
        // this.sdmFormStep1.disable()

        console.log("229 this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))

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

    this.getHeadList()
  }

  getHeadList(){
    this.sdmService.globalGetAl().subscribe(res =>{
      this.headList = res.data.results;
    })
  }

  editSummaryData(data) {
    localStorage.clear()
    this.sdmMasterId = data.sdmMasterId
    this.tempSourceTable = []
    this.stepperIndex = 1
    this.summeryFlag = !this.summeryFlag;
    this.tablevalue = ''
    this.fieldtypevalue = ''
    this.valuelist = []
    if (this.summeryFlag == true) {
      this.editFlag = true;
      this.editTempFlag = true;
      this.SdmMasterDetails();
      this.sourceTableList();
      // this.sdmFormStep1.controls['sdmName'].disable()
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


  searchChange(event) {
    this.sourcePeriod = event
    this.sdmFormStep1.controls['sourcePeriod'].setValue(event)
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

    this.valuelist=[];
    this.fieldtypevalue=null;
    this.tablevalue=null;

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
    this.sourceValueId = []
    this.updateBtnFlag= false;
    this.sdmMasterId = null;
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
    this.tempDerivedTable = []
    this.sdmSourceMasterFieldValueMappingDetailList = []
    this.moduleIdListd = '';
    this.sourceMasterName = ''
    this.enableSourcePeriod = false
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
          // console.log(d)
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
    // alert(this.sdmDerivedMasterId)
    console.log("sdm derived data: " + JSON.stringify(data))
    this.editDerivedData= data
    this.derivedTypeName = data.sdmDerivedTypeName
    this.derivedModuleName = data.modulename

    this.derivedTablesFields()
    this.sdmFormStep3.patchValue(this.editDerivedData)
    // this.sdmFormStep3.controls['moduleIdList'].setValue(data.moduleId)
    
  }

  deletetempDerivedData(data,index){
    this.tempDerivedTable.splice(index,1)
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
              if (element.sdmSourceObjectMasterId == ele.sdmSourceObjectMasterId) {
                this.sourceMasterName = ele.sourceObjectName
                let val: any = ele.sdmSourceObjectMasterId + ',' + ele.sourceObjectName
                this.fieldTypeList(val, 0)
              }
              this.sourceValueId = element.sourceValueIdList
            });
          });

         // console.log("566 this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))


        }


      }
    )
  }

  fieldTypeList(value, flag) {

    let val = value.split(',')
    this.sdmSourceObjectMasterId = val[0]
    this.sourceMasterName = val[1]

    // if (this.sourceMasterName == 'SPAndFunctionMaster') {
    //   // alert(this.isDisabled)
    //   this.isDisabled = true;
    // } else {
    //   // alert(this.isDisabled)
    //   this.isDisabled = false;
    // }

    this.tempSourceTable.forEach(element => {
      // console.log(JSON.stringify(element))
      if(element.tableName == 'SPAndFunctionMaster'){
        this.enableSourcePeriod = true;
      }
    });

    console.log("temp matrix data is: "+ JSON.stringify(this.tempSourceTable))

    this.sdmService.fieldTypeList(this.sdmSourceObjectMasterId).subscribe(
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

       
              this.fieldTypeData.forEach((fieldEle,index) => {
                this.tempSourceTable.forEach(element => {
                  if(fieldEle.sourceFieldTypeName == element.fieldType ){
                      this.fieldTypeData.splice(index,1)
                   }
                });
              });
           
        if (this.step1FormDisableFlag && flag == 0) {
          this.fieldTypeData.forEach(ele => {
            this.sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
              if (element.sourceMasterId == ele.sourceMasterId) {
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
    // let value = SelectedId.split(',')
    // this.sourceFieldId = value[0]
    // this.sourceTableId = value[1]
    // this.sourceFieldTypeName = value[2]

    this.fieldTypeData.forEach(element => {
      console.log("here is: "+ JSON.stringify(element))
      if(element.sourceFieldTypeName == SelectedId){
        this.sourceMasterId = element.sourceMasterId
        this.sdmSourceObjectMasterId = element.sourceTableId
        this.sourceFieldTypeName = SelectedId
        this.sdmService.valuesList(this.sdmSourceObjectMasterId, this.sourceMasterId).subscribe(
          res => {
            this.valueListData = res.data.results;
    
            this.valueListData.forEach(element => {
              element.sourceFieldTypeName = this.FieldTypeName;
            });
    
            
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
    });
    
  }

  valuesList1(SelectedId) {
    let value = SelectedId.split(',')
    this.sourceMasterId = value[0]
    this.sdmSourceObjectMasterId = value[1]
    this.sourceFieldTypeName = value[2]

    this.sdmService.valuesList(this.sdmSourceObjectMasterId, this.sourceMasterId).subscribe(
      res => {
        this.valueListData = res.data.results;

        this.valueListData.forEach(element => {
          element.sourceFieldTypeName = this.FieldTypeName;
        });  

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'sourceValueId',
          textField: 'sourceValueName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };       
    });
    
  }

  valueListDataValue(event) {

    console.log("event data: " + JSON.stringify(event))
    console.log("sourceValueId data: " + this.sourceValueId)

    // this.sourceValueId.push(event.itemValue)

    this.sourceValueId.push(event.sourceValueId)
    this.sourceValueName.push(event.sourceValueName)
    console.log("add: " + this.sourceValueId, this.sourceValueName)
  }

  getSelectedValue(value){
    this.sourceValueId =[]
    this.valueListData.forEach(element => {
      if(element.sourceValueId == value){
        this.sourceValueId.push(value)
        this.sourceValueName.push(element.sourceValueName)
      }
    });
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

   // alert(this.sourceValueName)
    // if (this.tempSourceTable.length < 5) {
      this.tempSourceTable.push({
        'tableName': this.sourceMasterName,
        'fieldType': this.sourceFieldTypeName,
        'valueId': this.sourceValueName,
        "sdmSourceObjectMasterId": this.sdmSourceObjectMasterId,
        "sourceMasterId": this.sourceMasterId,
        "sourceValueIdList": this.sourceValueId,
        "count": this.sourceValueName.length
      })

      this.sdmSourceMasterFieldValueMappingDetailList.push({
        "sourceMasterFieldValueDetailId": this.sourceMasterFieldValueDetailId,
        "sdmSourceObjectMasterId": this.sdmSourceObjectMasterId,
        "sourceMasterId": this.sourceMasterId,
        "sourceValueIdList": this.sourceValueId
      })


      if (this.sourceValueName.length > 0) {
        this.sourceValueCount = this.sourceValueName.length
        //alert(this.sourceValueName.length)
      }
      // return this.sourceValueId;

      this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)

      this.tempSourceTable.forEach(element => {
       console.log(JSON.stringify(element))
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
    // }
    // else {
    //   //this.toaster.success("", "Can not exceed source more then 5")

    //   this.alertService.sweetalertWarning("Can not exceed source more then 5");
    // }

    //console.log("add this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))

    this.fieldTypeData.forEach((element, index) => {
      if (element.sourceMasterId == this.sourceMasterId) {
        let ind = index;
        this.fieldTypeData.splice(ind, 1);
      }
    });

    this.tableListData.forEach((tableEle,index) => {
      this.tempSourceTable.forEach(element => {
        if(element.tableName == tableEle.sourceObjectName){
          if(element.tableName == 'PayrollArea'){
            this.tableListData.splice(index,1)
            this.isPayrollAreaFlag = true;
          }
          if(element.tableName == 'SPAndFunctionMaster'){
            this.tableListData.splice(index,1)
           
          }
         }
      });
    });

    if(this.tempSourceTable.length > 0){
      
    }


    
   
    

    this.tempfieldType.push(this.sourceMasterId)


  }

  editSource(data, index) {

    console.log("edit source data: "+ JSON.stringify(data))
    this.sourceValueId = []
    this.editTempFlag = true;
    this.editTempIndex = index;
    //this.sdmSourceObjectMasterId = data.sdmSourceObjectMasterId;
    if(data.sdmSourceObjectMasterId)
    {
      this.sdmSourceObjectMasterId = data.sdmSourceObjectMasterId
    }else{
      this.sdmSourceObjectMasterId = data.sourceMasterFieldValueDetailId;
    }
    
    this.sourceMasterId = data.sourceMasterId;

    if(data.sourceValueIdList != null){
    let tempSourceValId = data.sourceValueIdList.toString().split(',')
    this.sourceValueId = tempSourceValId;
    }else{
      this.sourceValueId = []
    }
    let temp = data.valueId.toString().split(',')
    this.sourceValueName = temp
    this.sourceMasterName = data.tableName
    this.sourceFieldTypeName = data.fieldType
    this.sourceMasterFieldValueDetailId = data.sourceMasterFieldValueDetailId
   //console.log(JSON.stringify(data))
    this.tableListData.forEach(ele => {
     // console.log("table data: "+ JSON.stringify(this.tableListData))
      if (ele.sdmSourceObjectMasterId == this.sdmSourceObjectMasterId) {

        this.tablevalue = ele.sdmSourceObjectMasterId + ',' + ele.sourceObjectName
      }
    })
    // alert(JSON.stringify(data))
    // alert(this.sdmSourceObjectMasterId)
    this.sdmService.fieldTypeList(this.sdmSourceObjectMasterId).subscribe(
      res => {
        this.fieldTypeData = res.data.results;
        console.log(JSON.stringify(this.fieldTypeData))
        this.fieldTypeData.forEach(ele => {
          if (ele.sourceMasterId == data.sourceMasterId) {
            if(this.sourceMasterName != 'SPAndFunctionMaster'){
            this.fieldtypevalue = ele.sourceMasterId + ',' + this.sdmSourceObjectMasterId + ',' + ele.sourceFieldTypeName
            }else{
              this.fieldtypevalue = ele.sourceFieldTypeName
              this.sourceValueId = ele.sourceValueIdList.toString()
            }
          }
        })
        this.sdmService.valuesList(this.fieldTypeData[0].sourceTableId, data.sourceMasterId).subscribe(
          res => {
            // res.data.results.forEach(element => {
            //   this.valueListData.push({
            //     'label':element.sourceValueName,
            //     'value':element.sourceValueId
            //   })
            // })
    
            this.valuelist = []
            this.valueListData = res.data.results
            
            console.log("edit value list: " + JSON.stringify(this.valueListData))
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
              if(data.sourceValueIdList != null){
                let tempSourceValueId = data.sourceValueIdList.toString().split(',')
                this.valueListData.forEach(element => {
                  tempSourceValueId.forEach(ele => {
                    if (element.sourceValueId == ele) {
                      element.isDisabled= true
    
                      this.valuelist.push({ 'sourceValueId': element.sourceValueId, 'sourceValueName': element.sourceValueName })
        
                      // console.log(this.valuelist)
                      this.valuelist.forEach(element => {
                        if(element.sourceValueName){
                          element.isDisabled= true
                        }
                        
                      });
                    }
                
                  });
                });
              }
            }else{
              this.editTableColDisabled = false
              //console.log(JSON.stringify(data.sourceValueIdList));
              if(data.sourceValueIdList != null){
                let tempSourceValueId = data.sourceValueIdList.toString().split(',')
                this.valueListData.forEach(element => {
                  tempSourceValueId.forEach(ele => {
                    if (element.sourceValueId == ele) {
                      element.isDisabled= true
    
                      this.valuelist.push({ 'sourceValueId': element.sourceValueId, 'sourceValueName': element.sourceValueName })
        
                      //console.log(this.valuelist)
    
                      this.valuelist.forEach(element => {
    
                        if(element.sourceValueName){
                          element.isDisabled= true
                        }
                        
                      });
                    }
                  });
        
                });
              }
            }
            
          })
      })
    
  }

  updateSource() {
    if (!this.step1FormDisableFlag || this.updateBtnFlag) {
      this.tempSourceTable.splice(this.editTempIndex, 1, {
        'tableName': this.sourceMasterName,
        'fieldType': this.sourceFieldTypeName,
        'valueId': this.sourceValueName,
        "sdmSourceObjectMasterId": this.sdmSourceObjectMasterId,
        "sourceMasterId": this.sourceMasterId,
        "sourceValueIdList": this.sourceValueId
      })

    //  console.log("update: " + this.sourceValueId)

      let ValueListId = []
      // ValueListId.push(this.sourceValueId)
      // console.log("ValueListId: "+ ValueListId)

      this.sourceValueId.forEach(element => {
        console.log("element is: "+ element)
        ValueListId.push(parseInt(element))
      });
 
      this.sdmSourceMasterFieldValueMappingDetailList.splice(this.editTempIndex, 1,
        {
          "sourceMasterFieldValueDetailId": this.sourceMasterFieldValueDetailId,
          "sdmSourceObjectMasterId": this.sdmSourceObjectMasterId,
          "sourceMasterId": this.sourceMasterId,
          "sourceValueIdList": ValueListId,
        }
      )

    // console.log("this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))

      this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)

      this.tablevalue = ""
      this.fieldtypevalue = ""
      this.valuelist = []
      this.sourceValueId = []
      this.sourceValueName = []

      this.editTempFlag = false;
      this.editTempFlag1 = true
    }
  }

  updateSourceDriveMatrix() {
    // alert(this.editSDMdata)

 // console.log("update this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))

    this.sdmFormStep1.controls['sdmName'].enable()
    this.editSDMdata = this.sdmFormStep1.controls['sdmName'].value
   // this.sdmFormStep1.addControl('createdBy',new FormControl[''])

    // alert(this.editSDMdata)

    this.sdmFormStep1.controls['sdmMasterId'].setValue(this.sdmMasterId)
    this.sdmFormStep1.controls['sdmName'].setValue(this.editSDMdata)
    this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)
    console.log(JSON.stringify(this.sdmFormStep1.value))
    this.sdmService.SdmSourceUpdate(this.sdmFormStep1.value).subscribe(res => {
      //this.toaster.success("", "SDM data Updated successfully.")

      this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
      this.sdmFormStep1.controls['sdmName'].disable();
      localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
      this.sdmMasterId = res.data.results[0].sdmMasterId;
      localStorage.setItem('sdmMasterId', this.sdmMasterId)
      this.sourceCombination();
      this.SdmMasterDetails();
      this.selectedSDMModule = [];
      this.sdmSourceMasterFieldValueMappingDetailList = [];
    },
    ( error: any ) => {
      this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
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

    //console.log("this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))
  }

  saveSourceDerivedMatrix() {
    // this.sdmFormStep1.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep1.controls['moduleIdList'].value)])
    this.sdmFormStep1.controls['sdmMasterId'].setValue(0)
    this.sdmFormStep1.controls['groupCompanyId'].setValue(1)

    if (this.sdmMasterId == null) {
        
            if(this.isPayrollAreaFlag = true){
             // alert("Here")
              this.sdmService.saveSourceDerivedMatrix(this.sdmFormStep1.value).subscribe(res => {
                //this.toaster.success("", "SDM data saved successfully.")
        
                
                
                this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
                this.updateBtnFlag = true;
                this.sdmFormStep1.controls['sdmName'].disable();
                localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
                this.sdmMasterId = res.data.results[0].sdmMasterId;
                localStorage.setItem('sdmMasterId', this.sdmMasterId)
                //this.sdmFormStep1.reset();
                // this.sdmMasterId = 9
                // alert(this.sdmMasterId)
                this.sourceCombination();
                this.SdmMasterDetails();
                this.sourceTableList()

                // this.SdmMasterDetails();
                this.selectedSDMModule = []
              })
            }else{
              this.alertService.sweetalertWarning("Please select Payroll");
              //this.toaster.warning();
            }
      
     
    } else {
      this.sdmFormStep1.controls['sdmMasterId'].setValue(this.sdmMasterId)
        if(this.isPayrollAreaFlag){
      //alert()
      this.sdmService.saveSourceDerivedMatrix(this.sdmFormStep1.value).subscribe(res => {
        //this.toaster.success("", "SDM data saved successfully.")
        this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
        this.updateBtnFlag = true;
        this.sdmFormStep1.controls['sdmName'].disable();
        localStorage.setItem('sdmFormStep1', JSON.stringify(this.sdmFormStep1.value))
        this.sdmMasterId = res.data.results[0].sdmMasterId;
        localStorage.setItem('sdmMasterId', this.sdmMasterId)
        //this.sdmFormStep1.reset();
        // this.sdmMasterId = 9
        // alert(this.sdmMasterId)
        this.sourceCombination();
        this.SdmMasterDetails();
        this.sourceTableList()

        this.selectedSDMModule = []
      })
    }else{
              this.toaster.warning("Please select Payroll");
            }
  
    }

  }


  SdmMasterDetails() {
    //this.sdmMasterId= 9;
    this.tempSourceTable = []
    this.sdmService.SdmMasterDetails(this.sdmMasterId).subscribe(res => {
     
     this.sdmData = res.data.results;
     this.editSDMdata = this.sdmData[0].sdmName
   
     this.sdmFormStep1.controls['sdmName'].setValue(this.editSDMdata)
    
      // if (this.editFlag == true) {
        this.applicationModule()

        console.log(JSON.stringify(this.sdmData[0]))
        // this.sdmSourceMasterFieldValueMappingDetailList = this.sdmData[0].sdmSourceMasterFieldValueMappingDetailList
        this.sdmData[0].sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
          if(element.sourceValueId != null){
          element.sourceValueIdList = element.sourceValueId.split(',')
          let ValueListId = []
            element.sourceValueIdList.forEach(element => {
              // console.log("element is: "+ element)
              ValueListId.push(parseInt(element))
            });

            this.sdmSourceMasterFieldValueMappingDetailList.push({
              "sourceMasterFieldValueDetailId": element.sourceMasterFieldValueDetailId,
              "sdmSourceObjectMasterId":element.sourceTableId,
              "sourceMasterId":element.sourceFieldId,
              "sourceValueIdList":ValueListId
            })
          }else{
            element.sourceValueIdList = element.sourceValueId
            this.sdmSourceMasterFieldValueMappingDetailList.push({
              "sourceMasterFieldValueDetailId": element.sourceMasterFieldValueDetailId,
              "sdmSourceObjectMasterId":element.sourceTableId,
              "sourceMasterId":element.sourceFieldId,
              "sourceValueIdList":element.sourceValueIdList
            })
          }
          
          let array =[]
          array.push(element.sourceValueName)
          let count =[]
          // alert(element.sourceValueName == null) 
          if(element.sourceValueName != null){
             count = element.sourceValueName.split(',')
          }
          this.tempSourceTable.push({
            "sourceMasterFieldValueDetailId": element.sourceMasterFieldValueDetailId,
            'tableName': element.sourceTableName,
            'fieldType': element.sourceFieldName,
            'valueId': array,
            "sdmSourceObjectMasterId": element.sdmSourceObjectMasterId,
            "sourceMasterId": element.sourceFieldId,
            "sourceValueIdList": element.sourceValueId,
            "count": count.length
          })
        })

        console.log("edittttttt fetch this.sdmSourceMasterFieldValueMappingDetailList: "+ JSON.stringify(this.sdmSourceMasterFieldValueMappingDetailList))
        
        this.sdmFormStep1.patchValue(this.sdmData[0])
        this.sdmFormStep1.controls['sdmName'].disable()

        this.tempSourceTable.forEach(element => {
          if(element.tableName == 'SPAndFunctionMaster'){
            this.enableSourcePeriod = true;
          }
        });

      // }
    })
  }


  sourceCombination() {
    this.sourceFieldListData = []
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
    if(this.derivedApplicableFlag == 1){
      this.sdmService.sourceCombinationUpdate(this.selectedSourceCombinationData).subscribe(res => {
        //this.toaster.success("", "Source Combination data updated successfully")
        this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
        
      })
    }else{
      this.sdmService.sourceCombinationUpdate(this.selectedSourceCombinationData).subscribe(res => {
        //this.toaster.success("", "Source Combination data updated successfully")
        this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
        
        this.stepperIndex = 1;
      })
    }
    
  }

  derivedTablesFields() {
    this.derivedTableFieldsData = []
    this.sdmService.derivedTablesFields().subscribe(res => {
 
      res.data.results.forEach(element => {
        if(this.derivedTypeName == 'JobField'){
          console.log("jobfield: ")
          if(element.derivedObjectName == 'EmployeeJobMapping' || element.derivedObjectName == 'EmployeePositionMapping' || 
          element.derivedObjectName == 'EmployeeMaster' || element.derivedObjectName == 'complianceSDMMapping' && element.derivedObjectName != 'PayrollAreaInformation'){
            this.derivedTableFieldsData.push(element)
          }
        }else if(this.derivedTypeName == 'Value'){
          console.log("value: ")
          if(element.derivedObjectName != 'EmployeeJobMapping' && element.derivedObjectName != 'EmployeePositionMapping' && 
          element.derivedObjectName != 'EmployeeMaster' && element.derivedObjectName != 'complianceSDMMapping' && 
          element.derivedObjectName != 'PayrollAreaInformation'){
            this.derivedTableFieldsData.push(element)
          }
        }
        else{
          console.log("percentage and value: ")
          if(element.derivedObjectName != 'EmployeeJobMapping' && element.derivedObjectName != 'EmployeePositionMapping' &&
          element.derivedObjectName != 'EmployeeMaster' && element.derivedObjectName != 'complianceSDMMapping' && 
          element.derivedObjectName != 'PayrollAreaInformation' && element.derivedObjectName != 'LoanMaster' &&
          element.derivedObjectName != 'NonRecurringTransactionGroup' && element.derivedObjectName != 'FlexiSectionMaster' &&
          element.derivedObjectName != 'FlexiHeadSetting'){
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
          // this.derivedTypeName = this.selectedDerivedName
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

        const formdata = new FormData();
        formdata.append('sdmMasterId',this.sdmMasterId)
        formdata.append('sdmDerivedTableId',this.selectedtableId)
        // this.fieldTypes =element.sourceObjectFieldNameList
        this.sdmService.derivedTablesFieldsValue(formdata).subscribe(res => {
          this.fieldTypes = res.data.results;
          if(this.tempeditDerivedData){
            this.sdmFormStep3.patchValue(this.editDerivedData)
            // console.log("derivedFieldName: "+ JSON.stringify(this.editDerivedData))
            this.sourceObjectName = this.editDerivedData.sourceObjectName
            this.sdmFormStep3.controls['derivedFieldName'].setValue(this.sourceObjectName)
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
    //alert(applicationModuleId)
    this.moduleData.forEach(element => {
      if (element.applicationModuleId == applicationModuleId) {
        this.derivedModuleName = element.applicationModuleName
      }
    });


  }

  getDerivedType(sdmDerivedTypeId) {
    this.sdmDerivedTypeId = null
    this.derivedTypeName = ''
    this.sdmFormStep3.controls['percentageOf'].clearValidators()
    this.sdmFormStep3.controls['percentageOf'].setValue('')
    this.sdmDerivedTypeId = sdmDerivedTypeId
    this.derivedTypeData.forEach(element => {
      if (element.sdmDerivedTypeId == sdmDerivedTypeId) {
        this.derivedTypeName = element.derivedType
      }
    });
    this.derivedTablesFields()
  }

  derivedFiedName(sdmDerivedTableId) {
    // let value = sdmDerivedTableId.split(",")

    // this.fieldTypes.forEach(element => {
    // if(element.sdmDerivedTableId == sdmDerivedTableId){
    // console.log("this.fieldTypes: "+ JSON.stringify(element))
    this.selectedDerivedName = sdmDerivedTableId
    // this.sourceObjectName = value[1]
    this.sourceObjectName = sdmDerivedTableId
    let lsdmDerivedTableId 
    this.fieldTypes.forEach(element => {
        if(element.derivedFieldName == sdmDerivedTableId){
          lsdmDerivedTableId =  element.sdmDerivedTableId
        }
    })
    this.sdmFormStep3.controls['sdmDerivedTableId'].setValue(lsdmDerivedTableId)
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

    this.showPercentageFlag = false;
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

    
    this.tempDerivedTable.forEach(element => {
      this.derivedApplicableFlag = element.derivedIdApplicable
      if(element.sdmDerivedTypeName == 'Percentage'){
         this.showPercentageFlag = true;
      }
      if(element.uom != '' || element.uom != null){
          this.isUomFlag = true;
      }
    });

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
       // alert(this.derivedModuleName)

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
          "modulename":this.derivedModuleName.toString()
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
    this.valuelist=[];
    this.fieldtypevalue=null;
    this.tablevalue=null;
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
    this.tempMatrixData = []
    this.sdmService.KeywordMasterDetails().subscribe(res => {
      this.keywordData = res.data.results;

    })
  }

  derivedMaster() {
    this.tempDerivedTable = []
    this.sdmService.derivedMaster(this.sdmMasterId).subscribe(res => {
      this.derivedMastersData = res.data.results;
      // console.log("derived Master data: "+ JSON.stringify(this.derivedMastersData))
      if(this.editFlag){
        this.derivedMastersData.forEach(element => {
           if(element.derivedType == 'Percentage'){
             this.showPercentageFlag = true
           }

           this.derivedModuleName = element.moduleId;
           
         
           this.tempDerivedTable.push({
            "derivedName": element.derivedName,
            "sdmDerivedMasterId":element.sdmDerivedMasterId,
            "sdmDerivedTypeId": element.sdmDerivedTypeId,
            "sdmDerivedTypeName": element.derivedType,
            "modulename": element.modulename,
            "selectedDerivedName": element.derivedFieldName,
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

        const formdata = new FormData();
        formdata.append('sdmMasterId',this.sdmMasterId)
        formdata.append('sdmDerivedMasterId',this.matrixDerivedMasterId)
    this.sdmService.SDMCombinationwithDerivedId(formdata).subscribe(res => {
      
        this.SDMCombinationwithDerivedIdData = res.data.results

        this.matrixsdmSourceCombinationList.forEach((ele,index) => {
          ele.showElement = true
          this.SDMCombinationwithDerivedIdData.forEach(element => {
              if(ele.sdmSourceCombinationId == element.sdmSourceCombinationId)
              {
                  ele.showElement = false
              }
          });
        }) 

        // this.tempEditMatrixData = this.SDMCombinationwithDerivedIdData
        // console.log(this.matrixData[0].sdmDerivedMasterId)

        
        this.tempEditMatrixData =[]
        this.SDMCombinationwithDerivedIdData.forEach(element => {
          // this.tempEditMatrixData.forEach(ele => {
            // if(this.matrixData[0].sdmDerivedMasterId != element.sdmDerivedMasterId){
              this.tempEditMatrixData.push({
                "active": element.active,
                "applicableValue": element.applicableValue,
                "derivedFromDate": element.derivedFromDate,
                "derivedToDate": element.derivedToDate,
                "sdmCombinationId": element.sdmCombinationId,
                "sdmDerivedMasterId": element.sdmDerivedMasterId,
                "sdmMasterId": element.sdmMasterId,
                "sdmSourceCombinationId": element.sdmSourceCombinationId,
                "sourceRangeFrom": element.sourceRangeFrom,
                "sourceRangeTo": element.sourceRangeTo
              })
              
            // }
          // });
        });

        this.saveMatrixData = []
        this.SDMCombinationwithDerivedIdData.forEach(element => {
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

        this.tempEditMatrixData.forEach(element => {
          this.sdmSourceCombinationListData.forEach(ele => {
            if(element.sdmSourceCombinationId == ele.sdmSourceCombinationId){
              element.selectedCombData = ele
              // element.showElement = true
            }
          });
        });
        // console.log(JSON.stringify(this.tempEditMatrixData))

          if(this.tempEditMatrixData.length > 0){
        this.tempEditMatrixData.forEach(element => {
          // console.log(this.matrixDerivedMasterId + " derived data is: "+ JSON.stringify(element))
          // element.showElement = true
          if(element.sdmDerivedMasterId == this.matrixDerivedMasterId){
            element.showElement = true
          }else if(element.sdmDerivedMasterId != this.matrixDerivedMasterId){
            element.showElement = false
          }
        });


        


        // this.matrixsdmSourceCombinationList.forEach((ele,index) => {
        //   this.tempEditMatrixData.forEach(element => {
        //     if(ele.sdmSourceCombinationId == element.sdmSourceCombinationId){
        //         let ind = index;
        //         this.matrixsdmSourceCombinationList.splice(ind,1)
        //     }
        //   })
        // });
       
      }

        // if(this.matrixData[0].sdmDerivedMasterId != this.matrixDerivedMasterId){
        //   this.SDMCombinationwithDerivedIdData.forEach(element => {
        //     element.showElement = true
        //     this.tempEditMatrixData = element
        //   });
        // }

        this.filter()
     
    })

        if (element.derivedObjectName == 'EmployeeJobMapping') {
          this.sdmService.derivedFieldName('EmployeeJobMapping',element.derivedFieldName).subscribe(res => {
            this.derivedDropdownValue = res.data.results[0]
          })
          this.showDropdown = true;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        } 
        else if(element.derivedObjectName == 'EmployeePositionMapping'){
          this.sdmService.derivedFieldName('EmployeePositionMapping',element.derivedFieldName).subscribe(res => {
            this.derivedDropdownValue = res.data.results[0]
          })
          this.showDropdown = true;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        }
        else if(element.derivedObjectName == 'complianceSDMMapping'){
          this.sdmService.derivedFieldName('complianceSDMMapping','complianceMaster').subscribe(res => {
            this.derivedDropdownValue = res.data.results[0]
          })
          this.showDropdown = true;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        }else {
          this.showDropdown = false;

          this.derivedObjectNames = element.derivedObjectName

          this.derivedFieldName = element.derivedFieldName
        }



        if (element.derivedObjectName == 'EmployeeMaster') {
          this.sdmService.derivedFieldName('EmployeeJobMapping',element.derivedFieldName).subscribe(res => {
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
    // console.log("2nd temp edit matrix: "+ JSON.stringify(this.tempEditMatrixData))
  }


  combinationMatrix() {
   this.sourceCombination();
  }

  sourceRangeFromData(value, index, srcCombData) {
    this.sourceRangeFrom = value
    this.selectedIndex = index;
    this.selectedCombData = srcCombData

    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }

    this.matrixsdmSourceCombinationList[index].invalidFromrange = false

    // debugger
    if(this.saveMatrixData.length > 0){
      this.saveMatrixData.forEach(element => {
        if(this.matrixDerivedMasterId == element.sdmDerivedMasterId){
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
              if( parseInt(value) <= parseInt(element.sourceRangeFrom) || parseInt(value) <= parseInt(element.sourceRangeTo)){
                // && 
                 this.alertService.sweetalertError("data is wrong from range data")
                 this.sourceRangeFrom = '' 
                 this.matrixsdmSourceCombinationList[index].invalidFromrange = true
                 this.selectedIndex = -2
              }else{
                this.sourceRangeFrom = value
                this.matrixsdmSourceCombinationList[index].invalidFromrange = false
                this.selectedIndex = index
              }
          }
        }     
      });
    }
  }

  sourceRangeToData(value,index, srcCombData) {
    this.sourceRangeTo = value
    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }
    this.matrixsdmSourceCombinationList[index].invalidTorange = false
    
    if(this.saveMatrixData.length > 0){
      this.saveMatrixData.forEach(element => {
        if(this.matrixDerivedMasterId == element.sdmDerivedMasterId){
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            if( parseInt(value) <= parseInt(element.sourceRangeTo)){
               this.alertService.sweetalertError("data is wrong To range data")
               this.sourceRangeTo = '' 
               this.matrixsdmSourceCombinationList[index].invalidTorange = true
               this.selectedIndex = -2
            }else{
              this.sourceRangeTo = value
              this.matrixsdmSourceCombinationList[index].invalidTorange = false
              this.selectedIndex = index
            }
          }
        }     
      });
    }
  }

  getEditedSourceRangeFrom(value,srcCombData){
    this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = srcCombData.derivedToDate
    this.sourceRangeFrom = value

      if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
            // if(element.sourceRangeFrom > value){
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
              
           
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < this.saveMatrixData.length; i++) {
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
        
            // this.tempEditMatrixData.push({
            //   "sdmCombinationId": srcCombData.sdmCombinationId,
            //   "sdmMasterId": this.sdmMasterId,
            //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            //   "sourceRangeFrom": value,
            //   "sourceRangeTo": srcCombData.sourceRangeTo,
            //   "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave),'yyyy-MM-dd'),
            //   "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave),'yyyy-MM-dd'),
            //   "applicableValue": srcCombData.applicableValue,
            //   'selectedCombData': this.selectedCombData,
            //   'showElement':true
            // })
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
    
        // this.tempEditMatrixData.push({
        //   "sdmCombinationId": srcCombData.sdmCombinationId,
        //   "sdmMasterId": this.sdmMasterId,
        //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
        //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
        //   "sourceRangeFrom": value,
        //   "sourceRangeTo": srcCombData.sourceRangeTo,
        //   "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
        //   "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
        //   "applicableValue": this.applicableValue,
        //   'selectedCombData': this.selectedCombData,
        //   'showElement':true
        // })
    }
   console.log("edit Range From: "+ JSON.stringify(this.saveMatrixData))

   this.showErrorFlag = false
      this.saveMatrixData.forEach(element => {
        if(element.derivedToDate == null || element.derivedToDate == '' ||
        element.applicableValue == null || element.applicableValue == '' ||
        element.derivedFromDate == null || element.derivedFromDate == '' ||
        element.sourceRangeFrom == null || element.sourceRangeFrom == '' ||
        element.sourceRangeTo == null || element.sourceRangeTo == ''){
          this.showErrorFlag = true
        }
      });

  }

  getEditedSourceRangeTo(value,srcCombData){
    this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = srcCombData.derivedToDate
    this.sourceRangeTo=value

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
            // this.tempEditMatrixData.splice(ind,1,{
            //   "sdmCombinationId": element.sdmCombinationId,
            //   "sdmMasterId": element.sdmMasterId,
            //   "sdmDerivedMasterId": element.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": element.sdmSourceCombinationId,
            //   "sourceRangeFrom": element.sourceRangeFrom,
            //   "sourceRangeTo": value,
            //   "derivedFromDate": element.derivedFromDate,
            //   "derivedToDate": element.derivedToDate,
            //   "applicableValue": element.applicableValue,
            //   'selectedCombData': this.selectedCombData,
            //   'showElement':true
            // })
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
            
            for (let i = 0; i < this.saveMatrixData.length; i++) {
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
        
            // this.tempEditMatrixData.push({
            //   "sdmCombinationId": srcCombData.sdmCombinationId,
            //   "sdmMasterId": this.sdmMasterId,
            //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            //   "sourceRangeFrom": srcCombData.sourceRangeFrom,
            //   "sourceRangeTo": value,
            //   "derivedFromDate": this.selectedFromDateForSave,
            //   "derivedToDate": this.selectedToDateForSave,
            //   "applicableValue": srcCombData.applicableValue,
            //   'selectedCombData': this.selectedCombData,
            //   'showElement':true
            // })
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
    
        // this.tempEditMatrixData.push({
        //   "sdmCombinationId": srcCombData.sdmCombinationId,
        //   "sdmMasterId": this.sdmMasterId,
        //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
        //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
        //   "sourceRangeFrom": srcCombData.sourceRangeFrom,
        //   "sourceRangeTo": value,
        //   "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
        //   "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
        //   "applicableValue": this.applicableValue,
        //   'selectedCombData': this.selectedCombData
        // })
      }
  
    console.log("edit To Range: "+ JSON.stringify(this.saveMatrixData))

    this.showErrorFlag = false
      this.saveMatrixData.forEach(element => {
        if(element.derivedToDate == null || element.derivedToDate == '' ||
        element.applicableValue == null || element.applicableValue == '' ||
        element.derivedFromDate == null || element.derivedFromDate == '' ||
        element.sourceRangeTo == null || element.sourceRangeTo == '' ||
        element.sourceRangeFrom == null || element.sourceRangeFrom == ''){
          this.showErrorFlag = true
        }
      });
  
  }

  getEditFromDateForSave(value,srcCombData){
    this.selectedFromDateForSave = value
   
    if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmCombinationId == srcCombData.sdmCombinationId){
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
    
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            
            for (let i = 0; i < this.saveMatrixData.length; i++) {
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
              "applicableValue": srcCombData.applicableValue
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
    }
    console.log("edit From date: "+ JSON.stringify(this.saveMatrixData))

    this.showErrorFlag = false
      this.saveMatrixData.forEach(element => {
        if(element.derivedToDate == null || element.derivedToDate == '' ||
        element.applicableValue == null || element.applicableValue == '' ||
        element.derivedFromDate == null || element.derivedFromDate == '' ){
          this.showErrorFlag = true
        }
      });
  }

  getEditToDateForSave(value,srcCombData){
    this.selectedToDateForSave = value

    if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmCombinationId == srcCombData.sdmCombinationId){
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
      
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            
            for (let i = 0; i < this.saveMatrixData.length; i++) {
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
              "applicableValue": srcCombData.applicableValue
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
      }
   
      console.log("Edit To date: "+ JSON.stringify(this.saveMatrixData))

      this.showErrorFlag = false
      this.saveMatrixData.forEach(element => {
        if(element.derivedToDate == null || element.derivedToDate == '' ||
        element.applicableValue == null || element.applicableValue == '' ||
        element.derivedFromDate == null || element.derivedFromDate == '' ){
          this.showErrorFlag = true
        }
      });
  }

  getEditedApplicableValue(value,srcCombData){
    // console.log(JSON.stringify(srcCombData))
    this.selectedFromDateForSave = srcCombData.derivedFromDate
    this.selectedToDateForSave = srcCombData.derivedToDate

    if(this.saveMatrixData.length > 0)
      {
        this.saveMatrixData.forEach((element,index) => {
          if(element.sdmCombinationId == srcCombData.sdmCombinationId){
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
          }else{
  
            let length = this.saveMatrixData.length - 1;
            
            if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
            
            for (let i = 0; i < this.saveMatrixData.length; i++) {
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
          }
        });
      }else{
        // this.saveMatrixData.push({
        //   "sdmCombinationId": srcCombData.sdmCombinationId,
        //   "sdmMasterId": this.sdmMasterId,
        //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
        //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
        //   "sourceRangeFrom": srcCombData.sourceRangeFrom,
        //   "sourceRangeTo": srcCombData.sourceRangeTo,
        //   "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
        //   "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
        //   "applicableValue": value
        // })

        if(this.saveMatrixData.length > 0)
          {
            this.saveMatrixData.forEach((element,index) => {
           
              if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId && element.sdmDerivedMasterId == this.matrixDerivedMasterId){
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
              }else{
      
                let length = this.saveMatrixData.length - 1;
                
                if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
                if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
                
                for (let i = 0; i < this.saveMatrixData.length; i++) {
                  if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId && element.sdmDerivedMasterId == this.matrixDerivedMasterId) { return; }
                }
              
                if(!srcCombData.sourceRangeFrom && !srcCombData.sourceRangeTo){
                  srcCombData.sourceRangeFrom = ""
                  srcCombData.sourceRangeTo = ""
                }
                this.saveMatrixData.push({
                  "sdmCombinationId": 0,
                  "sdmMasterId": this.sdmMasterId,
                  "sdmDerivedMasterId": this.matrixDerivedMasterId,
                  "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                  "sourceRangeFrom": srcCombData.sourceRangeFrom,
                  "sourceRangeTo": srcCombData.sourceRangeTo,
                  "derivedFromDate": this.selectedFromDateForSave,
                  "derivedToDate": this.selectedFromDateForSave,
                  "applicableValue": value
                })

              }
            });
          }else{

            this.saveMatrixData.push({
              "sdmCombinationId": 0,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedFromDateForSave,
              "applicableValue": value
            })
        
          }
    
          this.showErrorFlag = false
          this.saveMatrixData.forEach(element => {
            if(element.derivedToDate == null || element.derivedToDate == '' ||
            element.applicableValue == null || element.applicableValue == '' ||
            element.derivedFromDate == null || element.derivedFromDate == '' ){
              this.showErrorFlag = true
            }
          });
      }
    
    console.log("edit applicable value: "+ JSON.stringify(this.saveMatrixData))

  }


  applicableValueData(value,srcCombData) {
    // console.log("srcCombData: "+ JSON.stringify(srcCombData.sdmCombinationId))
    // console.log("this.matrixDerivedMasterId: "+ this.matrixDerivedMasterId)
    if(srcCombData.sdmCombinationId == undefined){
      srcCombData.sdmCombinationId = 0
    }
    this.applicableValue = value
    if (this.sourceRangeFrom != '' && this.sourceRangeTo != '' && this.derivedFromDate != '' && this.derivedToDate != '' && this.applicableValue != '') {
      this.addbtnflag = true
    } else {
      this.addbtnflag = false
    }

    this.selectedToDateForSave = '9999-12-31'

    if(!this.isRangeApplicableFlag){
      this.selectedFromDateForSave = this.datepipe.transform(srcCombData.derivedFromDate,'yyyy-MM-dd')
      this.selectedToDateForSave = this.datepipe.transform(srcCombData.derivedToDate,'yyyy-MM-dd')

      if(!this.isRangeApplicableFlag){
       // alert(srcCombData.sdmCombinationId)
        if(srcCombData.sdmCombinationId > 0){ 
          if(this.saveMatrixData.length > 0)
          {
            this.saveMatrixData.forEach((element,index) => {
              if(element.sdmCombinationId == srcCombData.sdmCombinationId){
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
                // this.tempMatrixData.splice(ind,1,{
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
                
                if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                if(this.tempEditMatrixData.length > 0 && this.matrixsdmSourceCombinationList.length == 0){
                  if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                  if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                }
                
                for (let i = 0; i < this.saveMatrixData.length; i++) {
                  if (this.saveMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                  if(this.tempEditMatrixData.length > 0){
                    if (this.tempEditMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                  }

                }
              
                // console.log("in else: "+ this.matrixDerivedMasterId)

                  if(!srcCombData.sourceRangeFrom && !srcCombData.sourceRangeTo){
                    srcCombData.sourceRangeFrom = ""
                    srcCombData.sourceRangeTo = ""
                  }
                this.saveMatrixData.push({
                  "sdmCombinationId": 0,
                  "sdmMasterId": this.sdmMasterId,
                  "sdmDerivedMasterId": this.matrixDerivedMasterId,
                  "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                  "sourceRangeFrom": srcCombData.sourceRangeFrom,
                  "sourceRangeTo": srcCombData.sourceRangeTo,
                  "derivedFromDate": this.selectedFromDateForSave,
                  "derivedToDate": this.selectedToDateForSave,
                  "applicableValue": value
                })

                // console.log("here appl val: "+ JSON.stringify(this.saveMatrixData))
            
                // this.tempMatrixData.push({
                //   "sdmCombinationId": srcCombData.sdmCombinationId,
                //   "sdmMasterId": this.sdmMasterId,
                //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
                //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                //   "sourceRangeFrom": srcCombData.sourceRangeFrom,
                //   "sourceRangeTo": srcCombData.sourceRangeTo,
                //   "derivedFromDate": this.selectedFromDateForSave,
                //   "derivedToDate": this.selectedToDateForSave,
                //   "applicableValue": value,
                //   'selectedCombData': this.selectedCombData
                // })
              }
            });
          }else{

            // console.log("here else appl val: "+ JSON.stringify(this.saveMatrixData))
            this.saveMatrixData.push({
              "sdmCombinationId": 0,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": value
            })
        
            // this.tempMatrixData.push({
            //   "sdmCombinationId": srcCombData.sdmCombinationId,
            //   "sdmMasterId": this.sdmMasterId,
            //   "sdmDerivedMasterId": this.matrixDerivedMasterId,
            //   "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            //   "sourceRangeFrom": srcCombData.sourceRangeFrom,
            //   "sourceRangeTo": srcCombData.sourceRangeTo,
            //   "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
            //   "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
            //   "applicableValue": this.applicableValue,
            //   'selectedCombData': value
            // })
          }
        }else{
          
          if(this.saveMatrixData.length > 0)
          {
            this.saveMatrixData.forEach((element,index) => {
              // console.log("selected: " + srcCombData.sdmSourceCombinationId)
              // console.log(element.sdmSourceCombinationId)
              // && element.sdmDerivedMasterId == this.matrixDerivedMasterId
              if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId && element.sdmDerivedMasterId == this.matrixDerivedMasterId){
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
              }else{
      
                let length = this.saveMatrixData.length - 1;
                
                if (this.saveMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
                if (this.saveMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
                // if(this.tempEditMatrixData.length > 0){
                //   if (this.tempEditMatrixData[length].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
                //   if (this.tempEditMatrixData[index].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId) { return; }
                // }
                
                for (let i = 0; i < this.saveMatrixData.length; i++) {
                  if (this.saveMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId && element.sdmDerivedMasterId == this.matrixDerivedMasterId) { return; }
                  // if(this.tempEditMatrixData.length > 0){
                  //   if (this.tempEditMatrixData[i].sdmSourceCombinationId == srcCombData.sdmSourceCombinationId && element.sdmDerivedMasterId == this.matrixDerivedMasterId) { return; }
                  // }

                }
              
  console.log("in else: "+ this.matrixDerivedMasterId)

  if(!srcCombData.sourceRangeFrom && !srcCombData.sourceRangeTo){
    srcCombData.sourceRangeFrom = ""
    srcCombData.sourceRangeTo = ""
  }
                this.saveMatrixData.push({
                  "sdmCombinationId": 0,
                  "sdmMasterId": this.sdmMasterId,
                  "sdmDerivedMasterId": this.matrixDerivedMasterId,
                  "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                  "sourceRangeFrom": srcCombData.sourceRangeFrom,
                  "sourceRangeTo": srcCombData.sourceRangeTo,
                  "derivedFromDate": this.selectedFromDateForSave,
                  "derivedToDate": this.selectedToDateForSave,
                  "applicableValue": value
                })

              }
            });
          }else{

            this.saveMatrixData.push({
              "sdmCombinationId": 0,
              "sdmMasterId": this.sdmMasterId,
              "sdmDerivedMasterId": this.matrixDerivedMasterId,
              "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
              "sourceRangeFrom": srcCombData.sourceRangeFrom,
              "sourceRangeTo": srcCombData.sourceRangeTo,
              "derivedFromDate": this.selectedFromDateForSave,
              "derivedToDate": this.selectedToDateForSave,
              "applicableValue": value
            })
        
          }

        }
      }
      console.log("this applicable data: "+ JSON.stringify(this.saveMatrixData))
      this.showErrorFlag = false
      this.saveMatrixData.forEach(element => {
        if(element.derivedToDate == null || element.derivedToDate == '' ||
        element.applicableValue == null || element.applicableValue == '' ||
        element.derivedFromDate == null || element.derivedFromDate == '' ){
          this.showErrorFlag = true
        }
      });
    }
  }

  getFromDateForSave(event, srcCombData, index) {
    this.derivedFromDate = event
    this.selectedFromDateForSave = event

    this.matrixsdmSourceCombinationList[index].derivedFromDate = event

    let todate = '9999-12-31'
    this.matrixsdmSourceCombinationList[index].derivedToDate = todate
    this.selectedToDateForSave = '9999-12-31'


    // if(this.isRangeApplicableFlag == true){
        // this.selectedToDateForSave = '9999-12-31'
        // this.matrixsdmSourceCombinationList.forEach(element => {
        //   let todate = '9999-12-31'
        //     element.derivedToDate = todate
        // })   
      // }

    if(srcCombData.sdmCombinationId == undefined){
      srcCombData.sdmCombinationId = 0
    }

    // alert(this.isRangeApplicableFlag)

    if (this.isRangeApplicableFlag == false) {

      if(this.saveMatrixData.length > 0)
        {
          this.saveMatrixData.forEach((element,index) => {
            if(element.sdmCombinationId == srcCombData.sdmCombinationId){
              let ind = index;
              if(element.derivedToDate = '' || element.derivedToDate == null){
                element.derivedToDate =  this.selectedToDateForSave
              }
              this.saveMatrixData.splice(ind,1,{
                "sdmCombinationId": element.sdmCombinationId,
                "sdmMasterId": element.sdmMasterId,
                "sdmDerivedMasterId": element.sdmDerivedMasterId,
                "sdmSourceCombinationId": element.sdmSourceCombinationId,
                "sourceRangeFrom": null,
                "sourceRangeTo": null,
                "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
                "derivedToDate": element.derivedToDate,
                "applicableValue": element.applicableValue
              })
            }else{
    
              let length = this.saveMatrixData.length - 1;
              
              if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if(this.tempEditMatrixData.length > 0){
              if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              }
              
              for (let i = 0; i < this.saveMatrixData.length; i++) {
                if (this.saveMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                if(this.tempEditMatrixData.length > 0){
                if (this.tempEditMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                }

              }
            

              this.saveMatrixData.push({
                "sdmCombinationId": 0,
                "sdmMasterId": this.sdmMasterId,
                "sdmDerivedMasterId": this.matrixDerivedMasterId,
                "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                "sourceRangeFrom": null,
                "sourceRangeTo": null,
                "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
                "derivedToDate": this.selectedToDateForSave,
                "applicableValue": srcCombData.applicableValue
              })

            }
          });
        }else{

          this.saveMatrixData.push({
            "sdmCombinationId": 0,
            "sdmMasterId": this.sdmMasterId,
            "sdmDerivedMasterId": this.matrixDerivedMasterId,
            "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            "sourceRangeFrom": null,
            "sourceRangeTo": null,
            "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
            "derivedToDate": this.selectedToDateForSave,
            "applicableValue": srcCombData.applicableValue
          })
      
        }

    }
    console.log("from date: "+ JSON.stringify(this.saveMatrixData))
    this.showErrorFlag = false
    this.saveMatrixData.forEach(element => {
      if(element.derivedToDate == null || element.derivedToDate == '' ||
      element.applicableValue == null || element.applicableValue == '' ||
      element.derivedFromDate == null || element.derivedFromDate == '' ){
        this.showErrorFlag = true
      }
    });
  }

  getToDateForSave(event, srcCombData, index) {
    this.derivedToDate = event
    this.selectedToDateForSave = event
   
    if(srcCombData.sdmCombinationId == undefined){
      srcCombData.sdmCombinationId = 0
    }

    if (this.isRangeApplicableFlag == false) {
      
      if(this.saveMatrixData.length > 0)
        {
          this.saveMatrixData.forEach((element,index) => {
            if(element.sdmCombinationId == srcCombData.sdmCombinationId){
              let ind = index;
              this.saveMatrixData.splice(ind,1,{
                "sdmCombinationId": element.sdmCombinationId,
                "sdmMasterId": element.sdmMasterId,
                "sdmDerivedMasterId": element.sdmDerivedMasterId,
                "sdmSourceCombinationId": element.sdmSourceCombinationId,
                "sourceRangeFrom": null,
                "sourceRangeTo": null,
                "derivedFromDate": element.derivedFromDate,
                "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
                "applicableValue": element.applicableValue
              })
            }else{
    
              let length = this.saveMatrixData.length - 1;
              
              if (this.saveMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.saveMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if(this.tempEditMatrixData.length > 0){
              if (this.tempEditMatrixData[length].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              if (this.tempEditMatrixData[index].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
              }
              
              for (let i = 0; i < this.saveMatrixData.length; i++) {
                if (this.saveMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                if(this.tempEditMatrixData.length > 0){
                if (this.tempEditMatrixData[i].sdmCombinationId == srcCombData.sdmCombinationId) { return; }
                }

              }
            

              this.saveMatrixData.push({
                "sdmCombinationId": 0,
                "sdmMasterId": this.sdmMasterId,
                "sdmDerivedMasterId": this.matrixDerivedMasterId,
                "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
                "sourceRangeFrom": null,
                "sourceRangeTo": null,
                "derivedFromDate": this.selectedFromDateForSave,
                "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
                "applicableValue": srcCombData.applicableValue
              })

            }
          });
        }else{

          this.saveMatrixData.push({
            "sdmCombinationId": 0,
            "sdmMasterId": this.sdmMasterId,
            "sdmDerivedMasterId": this.matrixDerivedMasterId,
            "sdmSourceCombinationId": srcCombData.sdmSourceCombinationId,
            "sourceRangeFrom": null,
            "sourceRangeTo": null,
            "derivedFromDate": this.selectedFromDateForSave,
            "derivedToDate": this.datepipe.transform(new Date(this.selectedToDateForSave), 'yyyy-MM-dd'),
            "applicableValue": srcCombData.applicableValue
          })
      
        }

    }

    console.log("to date: "+ JSON.stringify(this.saveMatrixData))
    this.showErrorFlag = false
    this.saveMatrixData.forEach(element => {
      if(element.derivedToDate == null || element.derivedToDate == '' ||
      element.applicableValue == null || element.applicableValue == '' ||
      element.derivedFromDate == null || element.derivedFromDate == '' ){
        this.showErrorFlag = true
      }
    });
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
    if(this.selectedIndex == rowIndex){
        this.saveMatrixData.push({
          "sdmCombinationId": "0",
          "sdmMasterId": this.sdmMasterId,
          "sdmDerivedMasterId": this.matrixDerivedMasterId,
          "sdmSourceCombinationId": sdmcombination.sdmSourceCombinationId,
          "sourceRangeFrom": this.sourceRangeFrom,
          "sourceRangeTo": this.sourceRangeTo,
          "derivedFromDate": this.datepipe.transform(new Date(this.selectedFromDateForSave), 'yyyy-MM-dd'),
          "derivedToDate": this.datepipe.transform(this.selectedToDateForSave, 'yyyy-MM-dd'),
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
          "derivedToDate": this.datepipe.transform(this.selectedToDateForSave, 'yyyy-MM-dd'),
          "applicableValue": this.applicableValue,
          'selectedCombData': this.selectedCombData
        })

        console.log("this.saveMatrixData: " + JSON.stringify(this.saveMatrixData))

    }

    this.sourceRangeFrom = ''
    this.sourceRangeTo = ''
    this.derivedFromDate = ''
    this.derivedToDate = ''
    this.applicableValue = ''
    this.addbtnflag = false
    this.selectedIndex = -1
    this.selectedFromDateForSave = ''
    // this.selectedToDateForSave = ''

    this.matrixsdmSourceCombinationList[rowIndex].derivedFromDate = null
    this.matrixsdmSourceCombinationList[rowIndex].derivedToDate = null

  }


  saveMatrix() {
    if(!this.showErrorFlag){

      this.sdmService.saveMatrix(this.saveMatrixData).subscribe(res => {
        //this.toaster.success("", "Matrix data saved successfully")
        this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
        this.editFlag = true
        this.saveMatrixData = []
        this.tempMatrixData = []
        this.setPrevDisabled = true;
        this.copyFromFlag = true;
        this.showEditTextBox = false
  
        this.getMatrixData();
  
          localStorage.clear()
         //this.summeryFlag = false
     
      this.sdmSummery()
      this.getMatrixTableData();
      this.derivedMaster();
      this.combinationMatrix();
      })
    }else{
      this.alertService.sweetalertError('Please filled all valid details')
    }
  
  }


  getMatrixData() {
    this.sdmService.combinationMatrix(this.sdmMasterId).subscribe(res => {
      
      res.data.results.forEach(element => {
        element.derivedFromDate = this.datepipe.transform(new Date(element.derivedFromDate),'yyyy-MM-dd')
        element.derivedToDate = this.datepipe.transform(new Date(element.derivedToDate),'yyyy-MM-dd')
      });

      this.matrixData = res.data.results;
      // console.log("selected comb data: " + this.selectedCombData)
      if(this.editFlag){
        this.tempEditMatrixData = this.matrixData
        // console.log("1st this.tempeditmatrix data: " + JSON.stringify(this.tempEditMatrixData))

        // alert("selected derived id: "+ this.matrixDerivedMasterId)

        this.matrixsdmSourceCombinationList.forEach(ele => {
          ele.sdmDerivedMasterId = null
          this.tempEditMatrixData.forEach(element => {
                if(ele.sdmSourceCombinationId == element.sdmSourceCombinationId){
                  ele.sdmDerivedMasterId = element.sdmDerivedMasterId
                }
          })      
        });

        // this.matrixsdmSourceCombinationList.forEach((ele,index) => {
        //   this.tempEditMatrixData.forEach(element => {
        //     if(ele.sdmSourceCombinationId == element.sdmSourceCombinationId){
        //       if (element.derivedName == this.selectedDerivedName) {
        //         let ind = index;
        //         this.matrixsdmSourceCombinationList.splice(ind,1)
        //       } 
        //     }
        //   })
        // });

          this.matrixsdmSourceCombinationList.forEach((ele,index) => {
          this.tempEditMatrixData.forEach(element => {
            if(ele.sdmSourceCombinationId == element.sdmSourceCombinationId){
              ele.sdmDerivedMasterId = element.sdmDerivedMasterId
            }
          })
        })
        

        this.tempEditMatrixData.forEach(element => {
          this.sdmSourceCombinationListData.forEach(ele => {
            if(element.sdmSourceCombinationId == ele.sdmSourceCombinationId){
              element.selectedCombData = ele
              // element.showElement = true
            }
          });
        });

        let tempderivedTypeName = ''
        if(this.matrixData.length > 0){
        this.derivedMastersData.forEach(element => {
          if (element.sdmDerivedMasterId == this.matrixData[0].sdmDerivedMasterId) {
            this.tempSelectedDerivedName = element.derivedName
            this.deriType = element.derivedType;
            tempderivedTypeName = element.derivedName
            this.onChangeDriveName(tempderivedTypeName) 
          }
        })

        this.filter()
      }
        

        // console.log("this.tempEditMatrixData: "+ JSON.stringify(this.tempEditMatrixData))
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
      let temp = []
      res.data.results.forEach((element,index) => {
        if(element.sdmDerivedMasterId == this.matrixDerivedMasterId){
          temp.push(element)
        }
      });
      this.matrixHistory = temp;
      //.log(JSON.stringify(this.matrixHistory))
      //console.log(this.matrixDerivedMasterId)
      this.matrixHistory.forEach(element => {
        this.sdmSourceCombinationListData.forEach(ele => {
          if(element.sdmSourceCombinationId == ele.sdmSourceCombinationId){
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
      this.tempMatrixSDMSourceCombinationList = this.matrixsdmSourceCombinationList
      this.matrixsdmSourceCombinationList.forEach(element => {
        element.applicableValue = ''
        element.applicableValue1 = ''
        element.sdmDerivedMasterId = null
        element.showElement = true
      });
      this.isRangeApplicableFlag = res.data.results[0].sdmSourceCombinationList[0].rangeApplicable;
      //alert(this.isRangeApplicableFlag)
      // if(this.isRangeApplicableFlag == true){
        // this.selectedToDateForSave = '9999-12-31'
        // this.matrixsdmSourceCombinationList.forEach(element => {
        //   let todate = '9999-12-31'
        //     element.derivedToDate = todate
        // })   
      // }
      this.getMatrixData();
    })
  }

  sdm1FormActive(event) {
    let flag
    if (event.checked) {
      this.sdmForm1ActiveFlag = true;
      flag = 1
    }
    else {
      this.sdmForm1ActiveFlag = false;
      flag = 0
    }

    this.sdmFormStep1.controls['isActive'].setValue(flag)
  }


 

  /** Copy To From Date TO All */
  copyFromDateToAll(data, index) {
    // console.log("copy dta: " + JSON.stringify(data) + " ...." + this.copyFromFlag)

    if(this.selectedToDateForSave == false){
      this.selectedToDateForSave = '9999-12-31'
    }

    this.copyFromFlag = !this.copyFromFlag
    if (!this.copyFromFlag) {

      if(!this.isRangeApplicableFlag){
      this.matrixsdmSourceCombinationList.forEach(element => {
        if (parseInt(element.sdmSourceCombinationId) == parseInt(data.sdmSourceCombinationId)) {
          // alert('here')    
          // this.selectedIndex = index;
          element.derivedFromDate = this.selectedFromDateForSave
          element.derivedToDate = this.selectedToDateForSave
          this.copyFromFlag = true
        }
      })
    }else{
      this.matrixsdmSourceCombinationList.forEach(element => {
        if (parseInt(element.sdmSourceCombinationId) == parseInt(data.sdmSourceCombinationId)) {
          // alert('here')    
          // this.selectedIndex = index;
          element.derivedFromDate = this.selectedFromDateForSave
          element.derivedToDate = this.selectedToDateForSave
          this.copyFromFlag = true
        }
      })
    }
    } else {

      //this.toaster.warning("From Date copied!")
      this.alertService.sweetalertWarning("From Date copied!");
    }
  }


  largepopup(template: TemplateRef<any>,index,data) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.selectedIndex = index
    this.getAllEmployeeDetails();
    this.selectedSercData = data
  }



  // excelDownload(tableID, filename = '') {
  //   var downloadLink;
  //   var dataType = 'application/vnd.ms-excel';
  //   var tableSelect = document.getElementById(tableID);
  //   var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  //   document.getElementById(tableID).style.border = "1px solid black";
  //   // Specify file name
  //   filename = filename ? filename + '.xls' : 'excel_data.xls';

  //   // Create download link element
  //   downloadLink = document.createElement("a");

  //   document.body.appendChild(downloadLink);

  //   if (navigator.msSaveOrOpenBlob) {
  //     var blob = new Blob(['\ufeff', tableHTML], {
  //       type: dataType
  //     });
  //     navigator.msSaveOrOpenBlob(blob, filename);
  //   } else {
  //     // Create a link to the file
  //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

  //   //   // Setting the file name
  //     downloadLink.download = filename;

  //   //   //triggering the function
  //     downloadLink.click();
  //   // }
  // }

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["S.No.","Code","Description","Module Count","Source Count","Range applicable","Derived Count"]
    //this.excelData = this.attendanceData
    this.sdmSummeryData.forEach((element,index) => {
  
  
      let obj = {
        "S.No.":index+1,
        "Code": element.sdmName,
        
        "Description": element.sdmDescription,
        "Module Count": element.moduleCount,
        "Source Count": element.sourceCount,
        "Range applicable":element.rangeApplicableStatus,
        "Derived Count":element.derivedCount
        
       
  
  
      }
      this.excelData.push(obj)
    });
   // console.log(this.excelData)
    this.excelservice.exportAsExcelFile(this.excelData, 'Business Cycle','Business Cycle',this.header);
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

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }


  excelMatrixDownload(tableID, filename = '') {
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

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
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
      if(this.editFlag){
        this.showEditTextBox = true
        if(this.tempEditMatrixData.length > index && this.tempEditMatrixData.length > this.selectedIndex){
          this.tempEditMatrixData[this.selectedIndex].applicableValue = this.selectedEmployeeId
        }else{
          this.matrixsdmSourceCombinationList[this.selectedIndex].applicableValue = this.selectedEmployeeId
        }
      }
      this.matrixsdmSourceCombinationList[this.selectedIndex].applicableValue = this.selectedEmployeeId
      
      this.matrixsdmSourceCombinationList[this.selectedIndex].applicableValue1 = employeedata.employeeCode
      this.applicableValue = this.selectedEmployeeId 
      this.applicableValueData(this.selectedEmployeeId,this.selectedSercData)
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

  filter(){
    // alert(this.matrixDerivedMasterId)
    if(this.isRangeApplicableFlag){
    this.sdmService.filter(this.sdmMasterId).subscribe(res => {
      // if(this.tempEditMatrixData.length > 0){
        this.filterData = res.data.results
        this.tempEditMatrixData.forEach(element => {
          element.disableFlag = true
          console.log("here element: "+ JSON.stringify(element))
          this.filterData.forEach(ele => {
            console.log("here ele: "+ JSON.stringify(ele))
            if(element.sdmCombinationId == ele.sdmCombinationId){
              element.disableFlag = false
            }
            // else if(element.sdmCombinationId != ele.sdmCombinationId){
            //   element.disableFlag = true
            // }

            if(element.sdmDerivedMasterId == this.matrixDerivedMasterId){
              element.showElement = true
            }else if(element.sdmDerivedMasterId != this.matrixDerivedMasterId){
              element.showElement = false
            }
          });
        });

      // }
    })
  }
  }


  SDMCombinationwithDerivedId(){
    

    
  }

  derivedApplicable(event){
    if(event == 'Yes'){
      // alert(event)
      this.derivedApplicableFlag = 1;
    }else{
      // alert(event)
      this.derivedApplicableFlag = 0;
    }

    this.sdmFormStep3.controls['isDerivedIdApplicable'].setValue(this.derivedApplicableFlag)
  }

  


  }


  