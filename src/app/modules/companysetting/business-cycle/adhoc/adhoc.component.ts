import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdhocService } from './adhoc.service';

@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss']
})
export class AdhocComponent implements OnInit {

  cycleDefifitionList: Array<any> = [];
  adhocForm : FormGroup;
 
  cycleNameList: Array<any> = [];
  
  
  adhocCycleList: any;
  activeHeadList: any;
  summarydata: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  date: any;
  fromDate: any;
  toDate: any;

  constructor(public adhocService : AdhocService,public toaster : ToastrService) {
    this.adhocForm = new FormGroup({
     
      businessCycleId : new FormControl(''),
      periodName : new FormControl(''),
      fromDate : new FormControl(''),
      toDate : new FormControl({ value: '', disabled: true } ),
      remark : new FormControl(''),
      arrear : new FormControl(''),
      headMasterIds : new FormControl(''),
      cycleName : new FormControl(''),
      //copyfrom : new FormControl(''),
      
     startDate : new FormControl(''),
     endDate : new FormControl('')
     // adhocCycleName : new FormControl('')

    })
   }

  ngOnInit(): void {
   


    this.getAllCycleDefinition();
    this.getAdhocCycle();
    this.getActiveHead();
    this.getSummaryData();
    
  
  }

  onSubmit(){
    console.log(this.adhocForm.value);
    this.adhocService.saveAdhocCycle(this.adhocForm.value).subscribe((res)=>{
    this.toaster.success('',"Adhoc cycle saved successfully");
    this.getSummaryData();
    this.cycleNameList = [];
    this.adhocForm.reset();
    })

    
  }

  
  onUpdate(){
      this.adhocService.updateData(this.adhocForm.value).subscribe((res)=>{
      this.toaster.success('',"Updated successfully");
      this.getSummaryData();
      this.cycleNameList = [];
      this.adhocForm.reset();

    })

  }


  getAllCycleDefinition(){
      this.adhocService.getAllCycleDefinition().subscribe((res)=>{
      this.cycleDefifitionList = res.data.results;
      console.log(this.cycleDefifitionList);
    })
  }


  getCycleNameById(id) {
     this.cycleNameList = [];
     this.adhocService.getCycleNameById(id).subscribe((response)=>{
     this.cycleNameList = response.data.results;
     console.log(this.cycleNameList);    
     });
    console.log("this.cycleNameList:" + this.cycleNameList);
    //this.getAllCycleDefinition();
   // this.adhocForm.reset();
  }

  getAdhocCycle(){
      this.adhocService.getAdhocCycle().subscribe((res)=>{
      this.adhocCycleList = res.data.results[0];
      // this.adhocCycleList = res.data.results.businessYeardefinition;
      console.log(this.adhocCycleList);
    })
  }

  getActiveHead(){
      this.adhocService.getActiveHead().subscribe((res)=>{
      this.activeHeadList = res.data.results[0];
      console.log(this.activeHeadList);
    })
  }

  getSummaryData(){
      this.adhocService.getSummaryData().subscribe((res)=>{
      this.summarydata = res.data.results;
      console.log(this.summarydata);
    })
  }


  formReset(){
    this.adhocForm.reset();

  }

  onChangeCycle(evt : any){
    console.log(evt);
    if(evt == ''){
      this.adhocForm.patchValue({
        toDate : ''
        
      });
    }else{
      const index = this.cycleNameList.findIndex( o => o.periodName == evt)
      this.adhocForm.patchValue({
        toDate : this.cycleNameList[index].toDate
      });
    }

  }

  
 
}
