import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SdnCreationService } from '../sdn-creation.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';



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


  /** ng multiselect */
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  sourceValueName: any = [];
  editTempIndex: any = -1;
  editTempFlag: boolean = false;
  sdmData: any;
  sdmMasterId: number = 9;
  sourceCombinationData: any;
  sdmSourceCombinationListData: any;
  srcCombLength: any;
  derivedTypeData: any;
  SelectedCount: any;
  sourceFieldListData: any;
  selectedSourceCombinationData: any = [];
  derivedTableFieldsData: any;
  fieldTypes: any[];
  sdmSummeryData: any;
  sdmFormStep3: FormGroup;
  derivedMasterData: any;
  keywordData: any;
  saveDerivedData: any = [];
  tempDerivedTable: any = [];
  derivedTypeName: any;
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

  constructor(private formBuilder: FormBuilder,private sdmService: SdnCreationService, private toaster: ToastrService,private datepipe: DatePipe) {

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


    this.sdmFormStep3 = this.formBuilder.group({
    "sdmDerivedMasterId": new FormControl("0"),
    "derivedName": new FormControl("",Validators.required),
    "sdmDerivedTypeId": new FormControl("",Validators.required),
    "sdmMasterId": new FormControl(""),
    "sdmDerivedTableId": new FormControl("",Validators.required),
    "percentageOf": new FormControl("",Validators.required),
    "moduleIdList": new FormControl([],Validators.required),
    "active": new FormControl([],Validators.required),
    "sdmDerivedMasterRemark": new FormControl([],Validators.required),
    })

    if(localStorage.getItem('sdmFormStep1') != null){
      let data = JSON.parse(localStorage.getItem('sdmFormStep1'))
      this.sdmFormStep1.patchValue(data)
      this.sdmSourceMasterFieldValueMappingDetailList = data.sdmSourceMasterFieldValueMappingDetailList
      // this.sdmFormStep1.disable()
      this.step1FormDisableFlag = true;
      this.sourceTableList()
    }
  }
  
  ngOnInit() {
    this.sdmSummery();
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
                let val: any = ele.sourceMasterId + ','+ele.sourceObjectName
                this.fieldTypeList(val, 0)
              }
              this.sourceValueId = element.sourceValueIdList
            });    
          });
          
        }     
      }
    )
  }

  fieldTypeList(value, flag){
    let val = value.split(',')
    this.sourceMasterId = val[0]
    this.sourceMasterName = val[1]
    this.sdmService.fieldTypeList(this.sourceMasterId).subscribe(
      res => {
        this.fieldTypeData = res.data.results;
        if(this.step1FormDisableFlag && flag == 0){
            this.fieldTypeData.forEach(ele => {
              this.sdmSourceMasterFieldValueMappingDetailList.forEach(element => {
                if(element.sourceFieldId == ele.sourceFieldId){
                  this.sourceFieldTypeName = ele.sourceFieldTypeName
                }
              });
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

  valuesList(SelectedId){
   let value = SelectedId.split(',')
   this.sourceFieldId = value[0]
    this.sourceTableId = value[1]
    this.sourceFieldTypeName = value[2]
    this.sdmService.valuesList(this.sourceTableId,this.sourceFieldId).subscribe(
      res => {
        this.valueListData = res.data.results;
        // res.data.results.forEach(element => {
        //   this.valueListData.push({
        //     'label':element.sourceValueName,
        //     'value':element.sourceValueId
        //   })
          
        // });

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

  valueListDataValue(event){
   // this.sourceValueId.push(event.itemValue)
   
   this.sourceValueId.push(event.sourceValueId)
   this.sourceValueName.push(event.sourceValueName)
   console.log("add: " + this.sourceValueId , this.sourceValueName)
  }

  onSelectAllValueListDataValue(items){
    items.forEach(element => {
     this.sourceValueId.push(element.sourceValueId)
     this.sourceValueName.push(element.sourceValueName)
    });
  }

  deSelectValueListDataValue(event){
    this.sourceValueName = []
    let flag = false;
    //console.log("before: " + this.sourceValueId , this.sourceValueName)
    this.sourceValueId.forEach((element,index) => {
      if(element == event.sourceValueId){
        let ind = index;
        this.sourceValueId.splice(ind,1)
        flag = true
      }

      if(flag == true){
        this.valueListData.forEach(element => {
          this.sourceValueId.forEach(id => {
            if(element.sourceValueId == id){
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

    console.log("after: " + this.sourceValueId , this.sourceValueName)
  }

  addSource(){
    
    if(this.tempSourceTable.length < 5){
    this.tempSourceTable.push({
      'tableName': this.sourceMasterName,
      'fieldType':this.sourceFieldTypeName,
      'valueId':this.sourceValueName,
      "sourceTableId": this.sourceTableId,
      "sourceFieldId": this.sourceFieldId,
      "sourceValueIdList": this.sourceValueId   
    })

    this.sdmSourceMasterFieldValueMappingDetailList.push({
        "sourceMasterFieldValueDetailId":"0",
        "sourceTableId": this.sourceTableId,
        "sourceFieldId": this.sourceFieldId,
        "sourceValueIdList": this.sourceValueId   
    })

    this.sdmFormStep1.controls['sdmSourceMasterFieldValueMappingDetailList'].setValue(this.sdmSourceMasterFieldValueMappingDetailList)

    this.tablevalue = ""
    this.fieldtypevalue = ""
    this.valuelist = []
    this.sourceValueId  = []
    this.sourceValueName = []
    }
    else{
      alert("Limit is 5")
    }
  }

  editSource(data,index){
    this.sourceValueId = []
    this.editTempFlag = true;
    this.editTempIndex = index;
    this.sourceTableId = data.sourceTableId;
    this.sourceFieldId = data.sourceFieldId;
    this.sourceValueId = data.sourceValueIdList
    this.sourceValueName.push(data.valueId)
    console.log(JSON.stringify(data))
    this.tableListData.forEach(ele => {
      if(ele.sourceMasterId == data.sourceTableId){
        
        this.tablevalue = ele.sourceMasterId + ',' + ele.sourceObjectName
      }
    })
    this.sdmService.fieldTypeList(data.sourceTableId).subscribe(
      res => {
        this.fieldTypeData = res.data.results;
        this.fieldTypeData.forEach(ele => {
          if(ele.sourceFieldId == data.sourceFieldId){
            this.fieldtypevalue = ele.sourceFieldId + ',' + ele.sourceTableId + ',' + ele.sourceFieldTypeName
          }
        })
      })   
      this.sdmService.valuesList(data.sourceTableId,data.sourceFieldId).subscribe(
        res => {
          // res.data.results.forEach(element => {
          //   this.valueListData.push({
          //     'label':element.sourceValueName,
          //     'value':element.sourceValueId
          //   })
          // })

          this.valuelist = []
          this.valueListData = res.data.results  
          console.log("data.sourceValueIdList: "+ this.sourceValueId)
          this.valueListData.forEach(element => {
            data.sourceValueIdList.forEach(ele => {
              if(element.sourceValueId == ele){
              
                this.valuelist.push({'sourceValueId': element.sourceValueId, 'sourceValueName': element.sourceValueName})
  
                console.log(this.valuelist)
              }
            });
            
          });
        }) 
  }

  updateSource(){
    if(!this.step1FormDisableFlag){
      this.tempSourceTable.splice(this.editTempIndex,1,{
        'tableName': this.sourceMasterName,
        'fieldType':this.sourceFieldTypeName,
        'valueId':this.sourceValueName,
        "sourceTableId": this.sourceTableId,
        "sourceFieldId": this.sourceFieldId,
        "sourceValueIdList": this.sourceValueId   
      })

      console.log("update: " + this.sourceValueId)
  
      this.sdmSourceMasterFieldValueMappingDetailList.splice(this.editTempIndex,1,
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
      this.sourceValueId  = []
      this.sourceValueName = []

      this.editTempFlag = false;
      }
  }
 
  removeSource(index){
    this.tempSourceTable.splice(index,1)
    this.step1FormDisableFlag = false;
    this.valuelist = []
    this.sourceValueId  = []
    this.sourceValueName = []
    this.editTempFlag = false;
  }

  saveSourceDerivedMatrix(){
    this.sdmFormStep1.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep1.controls['moduleIdList'].value)])
    this.sdmFormStep1.controls['sdmMasterId'].setValue(0)
    this.sdmService.saveSourceDerivedMatrix(this.sdmFormStep1.value).subscribe(res =>{
        this.toaster.success("","SDM data saved successfully.")
        this.sdmFormStep1.controls['sdmName'].disable();
        //this.sdmFormStep1.disable();
        localStorage.setItem('sdmFormStep1',JSON.stringify(this.sdmFormStep1.value))

        this.sdmMasterId = res.data.results[0].sdmMasterId;
        this.sdmMasterId = 9
        // alert(this.sdmMasterId)
        this.sourceCombination();
        this.SdmMasterDetails();
    })
  }


  SdmMasterDetails(){
    //this.sdmMasterId= 9;
    this.sdmService.SdmMasterDetails(this.sdmMasterId).subscribe(res =>{
      this.sdmData = res.data.results;
    })
  }


  sourceCombination(){
    
      this.sdmService.sourceCombination(this.sdmMasterId).subscribe(res =>{
      this.sourceCombinationData = res.data.results[0];
      this.sourceFieldListData = this.sourceCombinationData.sourceFieldList;
      this.sdmSourceCombinationListData = this.sourceCombinationData.sdmSourceCombinationList;
      this.srcCombLength = this.sdmSourceCombinationListData.length
      this.SelectedCount = 0
      this.sdmSourceCombinationListData.forEach(element => {
        if(element.active){
          this.SelectedCount= this.SelectedCount + 1
        }  
      });

    })
  }

  selectSrcCombination(event, srcCombData){
    let active;
   if(event.checked){
    this.SelectedCount = this.SelectedCount + 1
    active  = true
   }else{
    this.SelectedCount = this.SelectedCount - 1
    active = false
   }
   
   if(this.selectedSourceCombinationData.length > 0){
    this.selectedSourceCombinationData.forEach((element,index) => {
      if(element.sdmSourceCombinationId == srcCombData.sdmSourceCombinationId){
        let ind = index;
        this.selectedSourceCombinationData.splice(ind,1,
          {
            "sdmSourceCombinationId":srcCombData.sdmSourceCombinationId,
            "sdmMasterId": this.sdmMasterId,
            "active": active
          })
      }else{
        this.selectedSourceCombinationData.push(
          {
            "sdmSourceCombinationId":srcCombData.sdmSourceCombinationId,
            "sdmMasterId":this.sdmMasterId,
            "active": active
          })
      }
    });
   }else{
    this.selectedSourceCombinationData.push(
      {
        "sdmSourceCombinationId":srcCombData.sdmSourceCombinationId,
        "sdmMasterId":this.sdmMasterId,
        "active": active
      })
    }

   console.log("selectedSourceCombinationData : " + JSON.stringify(this.selectedSourceCombinationData))
  }

  derivedType(){
    this.sdmService.derivedType().subscribe(res =>{
      this.derivedTypeData = res.data.results;
      
    })
  }

  sourceCombinationUpdate(){
    this.sdmService.sourceCombinationUpdate(this.selectedSourceCombinationData).subscribe(res =>{
        this.toaster.success("","Source Combination data updated successfully") 
    })
  }

  derivedTablesFields(){
    this.sdmService.derivedTablesFields().subscribe(res =>{
      this.derivedTableFieldsData = res.data.results;
      
    })
  }

  derivedTableNameChange(value){
    this.fieldTypes = []
    this.derivedTableName = value
      this.derivedTableFieldsData.forEach(element => {
      if(element.sourceObjectName == value){
        this.fieldTypes =element.sourceObjectFieldNameList
      }  
    });
  }


  sdmSummery(){
    this.sdmService.sdmSummery(1).subscribe(res =>{
      this.sdmSummeryData = res.data.results;
      
    })
  }

  getSelectedDerivedModule(applicationModuleId){
    this.moduleData.forEach(element => {
      if(element.applicationModuleId == applicationModuleId){
        this.derivedModuleName.push(element.applicationModuleName)
      }
    });
  }

  getDerivedType(sdmDerivedTypeId){
    this.derivedTypeData.forEach(element => {
      if(element.sdmDerivedTypeId == sdmDerivedTypeId){
        this.derivedTypeName = element.derivedType
      }
    });
  }

  derivedFiedName(sdmDerivedTableId){
    console.log("this.fieldTypes: "+ JSON.stringify(this.fieldTypes))
    this.fieldTypes.forEach(element => {
      if(element.sdmDerivedTableId == sdmDerivedTableId){
        this.sourceObjectName = element.sourceObjectFieldName
      }
    });
  }

  addsaveDerived(){
    this.sdmFormStep3.controls['moduleIdList'].setValue([parseInt(this.sdmFormStep3.controls['moduleIdList'].value)])
    this.sdmFormStep3.controls['sdmDerivedMasterId'].setValue(0)
    this.sdmFormStep3.controls['sdmMasterId'].setValue(this.sdmMasterId)

    this.saveDerivedData.push(this.sdmFormStep3.value)


    let controls = this.sdmFormStep3.controls
    this.tempDerivedTable.push({
      "derivedName": controls['derivedName'].value,
      "sdmDerivedTypeId": this.derivedTypeName,
      "sourceObjectName": this.sourceObjectName,
      "sdmDerivedTableId": this.derivedTableName,
      "percentageOf":controls['percentageOf'].value,
      "moduleIdList": this.derivedModuleName.toString(),
    })

   this.sdmFormStep3.reset()
   this.derivedTableName = ""
  }

  resetsdmForm3(){
    this.sdmFormStep3.reset();
  }

  saveDerived(){
    this.sdmService.saveDerived(this.saveDerivedData).subscribe(res =>{
        this.toaster.success("","Derived data saved successfully.")
        //this.sdmFormStep1.controls['sdmName'].disable();
        this.sdmFormStep3.reset();
        
        //this.derivedMasterData = res.data.results;
       
    })
  }


  KeywordMasterDetails(){
    this.sdmService.KeywordMasterDetails().subscribe(res =>{
      this.keywordData = res.data.results;
      
    })
  }

  derivedMaster(){
    this.sdmService.derivedMaster(this.sdmMasterId).subscribe(res =>{
      this.derivedMastersData = res.data.results;
      
    })
  }

  onChangeDriveName(value){
    this.derivedMastersData.forEach(element => {
      if(element.derivedName == value){
        this.deriType = element.derivedType;
        this.matrixDerivedMasterId = element.sdmDerivedMasterId
      }
    });
  }

  combinationMatrix(){
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

  sourceRangeFromData(value,index,srcCombData){
    // console.log("srcCombData: "+ JSON.stringify(srcCombData))
    this.sourceRangeFrom = value
    this.selectedIndex = index;
    this.selectedCombData = srcCombData
  }

  sourceRangeToData(value){
    this.sourceRangeTo = value
  }

  applicableValueData(value){
    this.applicableValue = value
  }

  derivedFromDateData(value){
    this.derivedFromDate = this.datepipe.transform(new Date(value), 'yyyy-MM-dd')
  }

  derivedToDateData(value){
    this.derivedToDate = this.datepipe.transform(new Date(value), 'yyyy-MM-dd')
  }

  addMatrixData(sdmcombination,rowIndex){
    this.saveMatrixData.push({
      "sdmCombinationId":"0",
      "sdmMasterId": this.sdmMasterId,
      "sdmDerivedMasterId": this.matrixDerivedMasterId,
      "sdmSourceCombinationId":sdmcombination.sdmSourceCombinationId,
      "sourceRangeFrom": this.sourceRangeFrom,
      "sourceRangeTo":this.sourceRangeTo,
      "derivedFromDate": this.derivedFromDate,
      "derivedToDate":this.derivedToDate,
      "applicableValue": this.applicableValue
    })

    this.tempMatrixData.push({
      "sdmCombinationId":"0",
      "sdmMasterId": this.sdmMasterId,
      "sdmDerivedMasterId": this.matrixDerivedMasterId,
      "sdmSourceCombinationId":sdmcombination.sdmSourceCombinationId,
      "sourceRangeFrom": this.sourceRangeFrom,
      "sourceRangeTo":this.sourceRangeTo,
      "derivedFromDate": this.derivedFromDate,
      "derivedToDate":this.derivedToDate,
      "applicableValue": this.applicableValue,
      'selectedCombData':this.selectedCombData
    })

   console.log("this.saveMatrixData: "+ JSON.stringify(this.saveMatrixData)) 

   this.sourceRangeFrom = ''
   this.sourceRangeTo = ''
   this.derivedFromDate = ''
   this.derivedToDate = ''
   this.applicableValue = ''
  }


  saveMatrix(){
    this.sdmService.saveMatrix(this.saveMatrixData).subscribe(res =>{
     this.toaster.success("","Matrix data saved successfully")
     this.saveMatrixData = []
     this.tempMatrixData = []
    })
  }
}
