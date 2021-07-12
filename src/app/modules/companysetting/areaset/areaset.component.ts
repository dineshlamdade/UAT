import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AreasetService } from './areaset.service';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { element } from 'protractor';

@Component({
  selector: 'app-areaset',
  templateUrl: './areaset.component.html',
  styleUrls: ['./areaset.component.scss']
})
export class AreasetComponent implements OnInit {
  public apiUrl = environment.baseUrl8084;
  areasetForm : FormGroup;
  areaMaster : any = [];
  serviceListData: any;
  areaListData: any;
  summaryData: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  hideRemarkDiv2:boolean = true;


  

  constructor(public fb : FormBuilder,public areasetService : AreasetService,private http: HttpClient,
    private toaster : ToastrService, private primengConfig: PrimeNGConfig) { 
      
      this.areasetForm = new FormGroup({
      areaSetMasterId: new FormControl('',Validators.required),
      areaSetName: new FormControl('',Validators.required),
      serviceMasterId: new FormControl('',Validators.required),
      remark: new FormControl('',Validators.required),
      areaSelectionList: new FormControl([],Validators.required)
     
    })
    //this.areaMaster = this.areasetForm.get('areaMaster') as FormArray;   
  }


  changeEvent2($event) {

    if ($event.target.checked) {
        this.hideRemarkDiv2 = false;
    }
    else {
        this.hideRemarkDiv2 = true;
    }
  }
  

  ngOnInit(): void {
      this.getServiceList();
      this.getSummaryData();
  }



  /**save and submit data also add data*/
  onSubmit(){
   // console.log(this.areasetForm.value)

   this.areasetForm.removeControl('areaSetMasterId')
   this.areasetForm.controls['serviceMasterId'].setValue(parseInt(this.areasetForm.controls['serviceMasterId'].value))
        this.areasetService.saveAreaSet(this.areasetForm.value).subscribe((res)=>{
        this.toaster.success('','Area set saved succefully');
        this.getSummaryData();
        this.areasetForm.reset();
        this.areaListData = [];
      
        this.editFormFlag = false;
        this.viewFormFlag = false;
       
      })
        //this.areasetForm.reset();
  }

  
  
/**Update data */
  onUpdate(){
      this.areasetService.updateAreaSet(this.areasetForm.value).subscribe((res)=>{
      this.toaster.success('','Area set updated succefully');
      this.getSummaryData();
      this.areasetForm.reset();
      this.areaListData = [];
      this.editFormFlag = false;
      this.viewFormFlag = false
    })
 // console.log(this.areasetForm.value);
// this.areasetForm.reset();
}

/**Reset button */
formReset(){
      this.areasetForm.reset();
      this.areaListData = [];
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.areasetForm.enable();     
}

/**primeng multi select area master array payrollareaid and payrollareacode */
getAreaMasterId(e){
    console.log(JSON.stringify(e))  //Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
    /** prime ng multiselect */
    this.areaMaster.push({
      "code":"PA-Staff",
      "id":e.itemValue
    })
    this.areasetForm.controls['areaSelectionList'].setValue(this.areaMaster);
    /** Single select i.e select */
    // this.areaMaster.push({
    //   "areaSetMasterDetailsId":0,
    //   "areaMasterId":e
    // }) 
  }

  /**Summary data */
  getSummaryData(){
      this.areasetService.getSummaryData().subscribe(res =>{
      this.summaryData = res.data.results;
       })
  }

  /**Service list */
  getServiceList(){
    // console.log(this.serviceListData);
      this.areasetService.getServiceList().subscribe(res =>{
      this.serviceListData = res.data.results[0];
      })
  }

/**Service list by name with id */
  getAreasetByService(serviceid){
       this.areaListData = [];
      this.areasetService.getByServiceName(serviceid).subscribe(res =>{
      //this.areaListData = res.data.results;
      res.data.results[0].forEach(element => {
        if(serviceid == 1){
          this.areaListData.push({
            label: element.payrollAreaCode, 
            value: element.payrollAreaId
        })
        }else{
            this.areaListData.push({
            label: element.payrollArea.payrollAreaCode, 
            value: element.payrollArea.payrollAreaId
          })
          
        }
           console.log("this.areaListData: "+ this.areaListData)
           
      });
      
    })
    
  }

  editAreaSet(data){
      this.editFormFlag =true;
      this.viewFormFlag = false;
      this.areasetForm.enable();
      this.areasetForm.patchValue(data);
  }

  viewAreaSet(data){
      this.editFormFlag =false;
      this.viewFormFlag = true;
      this.areasetForm.disable();
      this.areasetForm.patchValue(data);
  }  

}


//AreaSetMaster and AreaSetMasterDetails