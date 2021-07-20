import { Component, HostListener, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SdnCreationService } from '../sdn-creation.service';
import { ToastrService } from 'ngx-toastr';



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
  sdmMasterId: number;
  sourceCombinationData: any;
  sdmSourceCombinationListData: any;
  srcCombLength: any;
  derivedTypeData: any;
  SelectedCount: any;
  sourceFieldListData: any;
  selectedSourceCombinationData: any = [];
  derivedTableFieldsData: any;
  fieldTypes: any[];

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
      // this.sdmFormStep1.disable()
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
                let val: any = ele.sourceMasterId + ','+ele.sourceObjectName
                this.fieldTypeList(val)
              }
              this.sourceValueId = element.sourceValueIdList
            });    
          });
          
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
        if(this.step1FormDisableFlag){
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
    
    if(!this.step1FormDisableFlag && this.tempSourceTable.length < 5){
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
    })
  }


  SdmMasterDetails(){
    this.sdmMasterId= 9;
    this.sdmService.SdmMasterDetails(this.sdmMasterId).subscribe(res =>{
      this.sdmData = res.data.results;
    })
  }


  sourceCombination(){
    
      this.sdmService.sourceCombination(9).subscribe(res =>{
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
            "sdmMasterId":"9",
            "active": active
          })
      }else{
        this.selectedSourceCombinationData.push(
          {
            "sdmSourceCombinationId":srcCombData.sdmSourceCombinationId,
            "sdmMasterId":"9",
            "active": active
          })
      }
    });
   }else{
    this.selectedSourceCombinationData.push(
      {
        "sdmSourceCombinationId":srcCombData.sdmSourceCombinationId,
        "sdmMasterId":"9",
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
this.derivedTableFieldsData.forEach(element => {
  if(element.sourceObjectName == value){
     this.fieldTypes.push(element)
  }
  
});
  }
}
