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
  cycleDefinitionList: Array<any> = [];
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
  }

 onSubmit(){
//alert("hi")
console.log('Supplimentary  cylece',this.supplementaryForm.value);
const periodNameList =this.cycleNameList.filter(element=>element.periodId==this.supplementaryForm.value.periodName)
console.log('period name list is',periodNameList[0].periodName)
const data = [{
  businessCycleId:this.cycleNameList.find(x=>x.id==this.supplementaryForm.get('periodId').value),
  
  periodName:periodNameList[0].periodName,
  //headMasterIds:this.headMasterIds,
  supplimentary:this.supplementaryForm.value.supplimentary,
  remark:this.supplementaryForm.value.remark
}]
console.log('data is',data);
//console.log(this.supplementaryForm.value)
  this.supplementaryService.saveSupplementaryCycle(data).subscribe((res)=>{
   // this.taoster.success('','Saved successfully');
   this.alertService.sweetalertMasterSuccess('','Supp cycle saved successfully');

    this.getSummaryData();
    this.cycleNameList = [];
    this.supplementaryForm.reset();
    this.editFormFlag = false;
    this.viewFormFlag = false;
  })
}



  getAllCycleDefinition(){
    this.supplementaryService.getAllCycleDefinition().subscribe((res)=>{
      this.cycleDefinitionList = res.data.results;
      console.log(this.cycleDefinitionList)
    })
  }

  getCycleNameById(id){
    this.cycleNameList = [];
     this.cycleDefinitionList.forEach(ele =>{
      if(ele.id == id){
       this.selctedCycleName = ele.cycleName
      }
      
    })
    this.supplementaryService.getCycleNameById(id).subscribe((res)=>{
      this.cycleNameList = res.data.results;
      console.log( this.cycleNameList)
    })
    console.log("this.cycleNameList:" + this.cycleNameList);
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
      this.cycleNameList.forEach(ele =>{
        //console.log(ele.businessCycleDefinition)
        if(ele.periodId == periodId){
          this.selectedPeriodName = ele.periodName
          // this.businessCycleDefinition = ele.businessCycleDefinition.businessYearDefinition
          this.businessCycleDefinition = ele
          console.log(this.businessCycleDefinition)
         
        }
      })
      let i = 1;
      this.cycleNameList.forEach(element => {
        if(element.periodId == periodId){
          i = i+1
        }
      });
      this.periodName = this.selectedPeriodName+'-Supp'+i
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
      // this.adhocForm.controls['fromDate'].setValue(new Date(this.businessCycleDefinition.fromDate))
      // this.adhocForm.controls['toDate'].setValue(new Date(this.businessCycleDefinition.toDate))
      
      

    }

  }

  getSummaryData(){
    this.supplementaryService.getSummaryData().subscribe((res)=>{
    console.log("result check",res);
    this.summarydata = res.data.results;
    console.log(this.summarydata);
  })
}
onUpdate(){
//debugger;
//   const periodNameList =this.cycleNameList.filter(element=>element.periodId== this.supplementaryForm.controls['periodName'])
// console.log('period name list is',periodNameList[0].periodName)
const data = [{
  businessCycleId:2796,
  
  periodName:this.supplementaryForm.controls['periodName'].value,
  //headMasterIds:this.headMasterIds,
  supplimentary:this.supplementaryForm.value.supplimentary,
  remark:this.supplementaryForm.value.remark
}]
console.log('data is',data);
  this.supplementaryService.updateData(data).subscribe((res)=>{
  //this.taoster.success('','Updated');
  this.alertService.sweetalertMasterSuccess('','Supp cycle updated successfully');

  this.getSummaryData();
  this.cycleNameList = [];
  this.editFormFlag = false;
   this.viewFormFlag = false;
  })
}

formReset(){
  this.supplementaryForm.reset();
 
   //this.cycleNameList = [];
    this.editFormFlag = false;
    this.viewFormFlag = false;
    this.supplementaryForm.enable();  
}
editData(data){
 // debugger;
  console.log("Data is",data)
  this.getCycleNameById(data.businessCycleDefinition.id);
  this.editFormFlag =true;
  this.viewFormFlag = false;
 // this.supplementaryForm.reset();
  this.supplementaryForm.enable();
 // this.supplementaryForm.patchValue(data);
   this.supplementaryForm.controls['periodName'].patchValue(data.periodId);
  this.supplementaryForm.controls['cycleName'].setValue(data.periodName);
  //this.supplementaryForm.controls['cycleName'].patchValue(data.cycleName);
  this.supplementaryForm.controls['startDate'].patchValue(new Date(data.fromDate));
  this.supplementaryForm.controls['endDate'].patchValue(new Date(data.toDate));
  this.supplementaryForm.controls['remark'].patchValue(data.remark);
  let cycleDef = this.cycleDefinitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.supplementaryForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }
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
  this.supplementaryForm.controls['cycleName'].setValue(data.periodName);
  this.supplementaryForm.controls['startDate'].patchValue(new Date(data.fromDate));
  this.supplementaryForm.controls['endDate'].patchValue(new Date(data.toDate));
  this.supplementaryForm.controls['remark'].patchValue(data.remark);
  let cycleDef = this.cycleDefinitionList.find(el => el.id === data.businessCycleDefinition.id);
    if (cycleDef) {
      this.supplementaryForm.controls['businessCycleDefinitionId'].patchValue(cycleDef.id);
    }
}  




}
