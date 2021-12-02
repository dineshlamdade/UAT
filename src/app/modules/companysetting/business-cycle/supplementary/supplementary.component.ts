import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplementaryService } from './supplementary.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

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
  constructor(public supplementaryService : SupplementaryService,public fb : FormBuilder,public taoster:ToastrService,
    public alertService : AlertServiceService) { 
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

console.log('Supplimentary  cylece',this.supplementaryForm.value);
//debugger
const periodNameList = this.cycleLockList.filter(element=>element.periodId == this.supplementaryForm.get('periodName').value)
console.log('period name list is',periodNameList[0].periodName)
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
console.log('data is',data);
//console.log(this.supplementaryForm.value)
  this.supplementaryService.saveSupplementaryCycle(data).subscribe((res)=>{
   // this.taoster.success('','Saved successfully');
   this.alertService.sweetalertMasterSuccess('Success','Supplementary Cycle Saved Successfully');

    this.getSummaryData();
    this.cycleLockList = [];
    this.supplementaryForm.reset();
    this.editFormFlag = false;
    this.viewFormFlag = false;
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
      console.log(this.cycleDefinitionList)
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
        console.log('Cycle lock list is',this.cycleLockList);
      })
    
    this.cycleNameList = [];
     this.cycleDefinitionList.forEach(ele =>{
      if(ele.id == id){
       this.selctedCycleName = ele.cycleName
      }
      
    })
    this.supplementaryService.getCycleNameById(id).subscribe((res)=>{
      this.cycleNameList = res.data.results;
      console.log( this.cycleNameList)
      if(this.editFormFlag){
        this.supplementaryForm.controls['periodName'].setValue(this.periodId);
      }
    })
    
    console.log("this.cycleNameList:" + this.cycleNameList);
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
        //console.log(ele.businessCycleDefinition)
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
      console.log("cycle lock list",this.cycleLockList);
      console.log(this.periodName)
      this.supplementaryForm.controls['cycleName'].setValue(this.periodName)
      // let i = 1
      // this.c.forEach(element => {
      //   if(element.periodId == periodId){
      //     i = i+1
      //   }
      // });
      // this.periodName = this.selectedPeriodName+'-A&W'+i
      // console.log(this.periodName)
    // console.log("this.businessCycleDefinition: " + JSON.stringify(this.businessCycleDefinition))
  // this.supplementaryForm.controls['cycleName'].setValue(this.periodName)
   this.supplementaryForm.controls['startDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
   this.supplementaryForm.controls['endDate'].setValue(new Date(this.businessCycleDefinition.toDate))
    //  this.supplementaryForm.controls['fromDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
     // this.supplementaryForm.controls['toDate'].setValue(new Date(this.businessCycleDefinition.toDate))
      
      

    }

  }

  getSummaryData(){
    this.supplementaryService.getSummaryData().subscribe((res)=>{
    console.log("result check",res);
    this.summarydata = res.data.results;
    console.log('summary datas',this.summarydata);
  })
}
onUpdate(){
  //debugger;
let periodNameList =this.cycleLockList.filter(element=>element.periodId == this.supplementaryForm.get('periodName').value)
// console.log('period name list is',periodNameList[0].periodName)
 let period = this.cycleLockList.find(x=>x.periodId==this.supplementaryForm.get('periodName').value)
 console.log('id is',period);
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
console.log('data is',data);
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
  console.log("Data is",data)
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
  console.log('deleted id id',id);
  this.supplementaryService.deleteData(id).subscribe((res)=>{
    this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    this.getAllCycleDefinition();
  })
}

}
