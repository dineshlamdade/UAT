import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplementaryService } from './supplementary.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { ExcelserviceService } from '../../../excel_service/excelservice.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-supplementary',
  templateUrl: './supplementary.component.html',
  styleUrls: ['./supplementary.component.scss']
})
export class SupplementaryComponent implements OnInit {
  show :boolean = true;
  cycleDefinitionList: Array<any> = [];
  periodNameList: Array<any> = [];
  supplementaryForm : FormGroup;
  cycleNameList:  Array<any> = [];
  selctedCycleName: any;
  selectedPeriodName: any;
  businessCycleDefinition: any;
  summarydata: any;
  periodName: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  businessCycleDefinitionId: any;
  public hideUpdate : boolean = false;
  supplimentary: any;
  periodId: any;
  cycleLockList: any;
  adhocCycleListNew: any[];
  adhocCycleList: any;
  header: any[];
  excelData: any[];

  constructor(public supplementaryService : SupplementaryService,public fb : FormBuilder,public taoster:ToastrService,
    public alertService : AlertServiceService,private excelservice: ExcelserviceService, private datePipe: DatePipe ) { 
    this.supplementaryForm = new FormGroup({
      businessCycleDefinitionId : new FormControl(''),
      businessCycleId : new FormControl(''),
      periodName : new FormControl('',[Validators.required]),
      periodId : new FormControl(''),
      fromDate : new FormControl(''),
      toDate : new FormControl(''),
      remark : new FormControl(''),
      supplimentary : new FormControl(true),
     // headMasterIds : new FormControl(''),
      cycleName : new FormControl(''),
     // headNature : new FormControl(''), 
      startDate : new FormControl(''),
      endDate : new FormControl('')

    })
    
  }

  ngOnInit(): void {
    this.getAllCycleDefinition();
    this.getSummaryData();

    
   //this.getAdhocCycle()

    
  }

 onSubmit(){
//alert("hi")


//debugger
const periodNameList = this.cycleLockList.filter(element=>element.periodId == this.supplementaryForm.get('periodName').value)

let period = this.cycleLockList.find(x=>x.periodId==this.supplementaryForm.get('periodName').value)
const data = [{
businessCycleId:period.id,
//businessCycleId:2790,
//businessCycleId : this.supplementaryForm.value.id,
 //periodName:this.supplementaryForm.value.periodName
  periodName:periodNameList[0].periodName,
  //headMasterIds:this.headMasterIds,
  supplimentary:this.supplementaryForm.value.supplimentary,
  remark:this.supplementaryForm.value.remark,
  fromDate:this.supplementaryForm.value.fromDate,
  toDate:this.supplementaryForm.value.toDate
}]


  this.supplementaryService.saveSupplementaryCycle(data).subscribe((res)=>{
   // this.taoster.success('','Saved successfully');
   //his.alertService.sweetalertMasterSuccess('Success','Supplementary Cycle Saved Successfully');
   this.alertService.sweetalertMasterSuccess(res.status.message, "" );
    this.getSummaryData();
    this.cycleLockList = [];
    this.supplementaryForm.reset();
    this.editFormFlag = false;
    this.viewFormFlag = false;
  },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}

// getAdhocCycle(){
//   this.adhocCycleListNew = [];
//     this.supplementaryService.getAdhocCycle().subscribe((res)=>{
//    this.adhocCycleList = res.data.results;
//    console.log(this.adhocCycleList)
//   // res.data.results[0].forEach(element => {
//   //   this.adhocCycleList.push({
//   //     label : element.periodId,
//   //     value : element.periodName
//   //   })
    
//   // })
   

//     // this.adhocCycleList = res.data.results.businessYeardefinition;
//     //  console.log(this.adhocCycleList);
//   })
// }


  getAllCycleDefinition(){
    this.supplementaryService.getAllCycleDefinition().subscribe((res)=>{
      this.cycleDefinitionList = res.data.results;
     
    })
  }

  getCycleNameById(id){
  //   this.cycleLockList = [];
  //   this.cycleDefinitionList.forEach(ele =>{
  //    if(ele.id == id){
  //     this.selctedCycleName = ele.cycleName
  //    }
     
  //  })
    
      this.supplementaryService.getByCycleLock(id).subscribe((res)=>{
        this.cycleLockList = res.data.results;
        
      })
    
    this.cycleNameList = [];
     this.cycleDefinitionList.forEach(ele =>{
      if(ele.id == id){
       this.selctedCycleName = ele.cycleName
      }
      
    })
    this.supplementaryService.getCycleNameById(id).subscribe((res)=>{
      this.cycleNameList = res.data.results;
     
      if(this.editFormFlag){
        this.supplementaryForm.controls['periodName'].setValue(this.periodId);
      }
    })
    
   
    this.cycleNameList = [];
    this.cycleLockList = []
    //clear the text
    this.supplementaryForm.controls.periodName.reset();
   this.supplementaryForm.controls.cycleName.reset();
   this.supplementaryForm.controls.startDate.reset();
   this.supplementaryForm.controls.endDate.reset();

   
  }

  

  onChangeCycle(periodId : any){
    if(periodId == ''){
      this.supplementaryForm.patchValue({
        toDate : ''   
      });
    }else{
      // const index = this.cycleNameList.findIndex( o => o.periodId == periodId)
      // this.adhocForm.patchValue({
      //   toDate : this.cycleNameList[index].toDate
      // });
      let cycleName;
      let location = this.cycleLockList.find(a=>a.periodId==periodId);
       let businessId= location.businessCycleDefinition.id;
      this.cycleLockList.forEach(ele =>{
        
        if(ele.periodId == periodId){
          this.selectedPeriodName = ele.periodName
          // this.businessCycleDefinition = ele.businessCycleDefinition.businessYearDefinition
          this.businessCycleDefinition = ele
          console.log(this.businessCycleDefinition)
         
        }
      })
      let i = 1;
      this.summarydata.forEach(element => {
     
        if(element.periodId == periodId){
          i = i+1
        }
      });
      this.periodName = this.selectedPeriodName+'-Supp'+i
     
      this.supplementaryForm.controls['cycleName'].setValue(this.periodName)
      // let i = 1
      // this.c.forEach(element => {
      //   if(element.periodId == periodId){
      //     i = i+1
      //   }
      // });
      // this.periodName = this.selectedPeriodName+'-A&W'+i
     
  // this.supplementaryForm.controls['cycleName'].setValue(this.periodName)
   this.supplementaryForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
   this.supplementaryForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
    //  this.supplementaryForm.controls['fromDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
     // this.supplementaryForm.controls['toDate'].setValue(new Date(this.businessCycleDefinition.toDate))
      
      

    }

  }

  getSummaryData(){
    this.supplementaryService.getSummaryData().subscribe((res)=>{
   
    this.summarydata = res.data.results;
   
  })
}
onUpdate(){
  //debugger;
let periodNameList =this.cycleLockList.filter(element=>element.periodId == this.supplementaryForm.get('periodName').value)

 let period = this.cycleLockList.find(x=>x.periodId==this.supplementaryForm.get('periodName').value)
 
const data = [{
  
  businessCycleId: this.businessCycleDefinitionId,
  //businessCycleId:2796,
  periodName: this.periodName,
  //periodName:periodNameList[0].periodName,
 //periodName:this.supplementaryForm.controls['periodId'].value,
  //headMasterIds:this.headMasterIds,
  supplimentary:this.supplimentary,
  remark:this.supplementaryForm.controls['remark'].value
}]

  this.supplementaryService.updateData(data).subscribe((res)=>{
  //this.taoster.success('','Updated');
  this.alertService.sweetalertMasterSuccess('Success','Supplementary Cycle Updated Successfully');

  this.getSummaryData();
  this.cycleNameList = [];
  this.editFormFlag = false;
   this.viewFormFlag = false;
   this.supplementaryForm.reset()
  })
}

formReset(){
  this.supplementaryForm.reset();
 
   this.cycleNameList = [];
    this.editFormFlag = false;
    this.viewFormFlag = false;
    this.supplementaryForm.enable();  
    this.supplementaryForm.controls.startDate.disable()
    this.supplementaryForm.controls.endDate.disable()
    this.supplementaryForm.controls.fromDate.disable()
    this.supplementaryForm.controls.toDate.disable()
    this.supplementaryForm.controls.cycleName.disable()
}
editData(data){
 // debugger;
 
  this.getCycleNameById(data.businessCycleDefinition.id);
  this.editFormFlag =true;
  this.viewFormFlag = false;
 // this.supplementaryForm.reset();
  this.supplementaryForm.enable();
 this.businessCycleDefinitionId=data.id;
 this.periodName=data.periodName;
 this.supplimentary=data.supplimentary;
 this.periodId = data.periodId
 // this.supplementaryForm.patchValue(data);
  this.supplementaryForm.controls['periodName'].patchValue(data.periodId);
  // this.supplementaryForm.controls['periodName'].setValue(data.periodId);
  this.supplementaryForm.controls['cycleName'].setValue(data.periodName);
  //this.supplementaryForm.controls['cycleName'].patchValue(data.cycleName);
  this.supplementaryForm.controls['startDate'].patchValue(new Date(data.fromDate));
  this.supplementaryForm.controls['endDate'].patchValue(new Date(data.toDate));
//  this.supplementaryForm.controls['fromDate'].patchValue(new Date(data.fromDate));
 // this.supplementaryForm.controls['toDate'].patchValue(new Date(data.toDate));
  this.supplementaryForm.controls['remark'].patchValue(data.remark);
  let cycleDef = this.cycleDefinitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.supplementaryForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }

    this.supplementaryForm.controls['businessCycleDefinitionId'].disable();
    this.supplementaryForm.controls['periodName'].disable();
    this.supplementaryForm.controls['cycleName'].disable();
    this.supplementaryForm.controls['startDate'].disable();
    this.supplementaryForm.controls['endDate'].disable();
  //  this.supplementaryForm.controls['fromDate'].disable();
   // this.supplementaryForm.controls['toDate'].disable();


    // let cycleNm = this.cycleNameList.find(el => el.periodId === data.businessCycleDefinition.periodId);
    // if (cycleNm) {
    //   this.supplementaryForm.controls['periodId'].patchValue(cycleNm.periodId);
    // }
}


setPolicyEndDate(){}

viewData(data){
  this.getCycleNameById(data.businessCycleDefinition.id);
  this.editFormFlag =false;
  this.viewFormFlag = true;
  this.supplementaryForm.disable();
  this.supplementaryForm.patchValue(data);
  this.supplementaryForm.controls['periodName'].patchValue(data.periodId);
  this.supplementaryForm.controls['periodName'].setValue(data.periodId);
  this.supplementaryForm.controls['cycleName'].setValue(data.periodName);
  this.supplementaryForm.controls['startDate'].patchValue(new Date(data.fromDate));
  this.supplementaryForm.controls['endDate'].patchValue(new Date(data.toDate));
  this.supplementaryForm.controls['remark'].patchValue(data.remark);
  this.supplementaryForm.controls['fromDate'].patchValue(new Date(data.fromDate));
  this.supplementaryForm.controls['toDate'].patchValue(new Date(data.toDate));
  let cycleDef = this.cycleDefinitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.supplementaryForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }
}  


deleteData(id){
 
  this.supplementaryService.deleteData(id).subscribe((res)=>{
    this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    this.getAllCycleDefinition();
  },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}



exportAsXLSX(): void {
  this.excelData = [];
  this.header = []
  this.header =["Supp. Cycle Name","From Date","To Date","Primary Cycle Definition","Primary Cycle Name","Remark"]
  //this.excelData = this.attendanceData
  this.summarydata.forEach(element => {


    let obj = {
      "Supp. Cycle Name": element.periodName,
      "From Date": this.datePipe.transform(new Date(element.fromDate),'dd-MM-yyyy'),
      "To Date": this.datePipe.transform(new Date(element.toDate),'dd-MM-yyyy'),
      "Primary Cycle Definition": element.businessCycleDefinition.cycleName,
      "Primary Cycle Name": element.oldPeriodName,
      "Remark": element.remark,
     


    }
    this.excelData.push(obj)
  });
 
  this.excelservice.exportAsExcelFile(this.excelData, ' Supplementary Cycle',' Supplementary Cycle',this.header);
}
}
