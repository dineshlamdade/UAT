import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AreasetService } from './areaset.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { element } from 'protractor';
import { threadId } from 'node:worker_threads';
//import { AlertServiceService } from '@src/app/core/services/alert-service.service';
// interface City {
//   name: string,
//   code: string
// }

@Component({
  selector: 'app-areaset',
  templateUrl: './areaset.component.html',
  styleUrls: ['./areaset.component.scss']
})
export class AreasetComponent implements OnInit {
  // cities: City[];

  // selectedCities: City[];
 
  public apiUrl = environment.baseUrl8084;
  areasetForm : FormGroup;
  areaMaster : any = [];
  serviceListData: any;
  areaListData: any;
  summaryData: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  hideRemarkDiv2:boolean = false;
  isCancelButton: boolean = false;
  isReset:boolean = false;
  // anamePattern = "^[a-z0-9_-]{8,15}$";

  public codeInvalid : boolean = false;
  targetProducts: any[];
  disabled: boolean;
  originalSourceProductList: any;
  sourceProducts: any[];
  selectedUser2: any[];
  selectedUser: any[];

  areaList : any[];
  constructor(public fb : FormBuilder,public areasetService : AreasetService,private http: HttpClient,
    private toaster : ToastrService, private primengConfig: PrimeNGConfig,
    public alertService : AlertServiceService) { 
     
      
      this.areasetForm = new FormGroup({
      areaSetMasterId: new FormControl(''),
      areaSetName: new FormControl('',[Validators.required,Validators.maxLength(25)]),
      serviceMasterId: new FormControl('',[Validators.required]),
      remark: new FormControl(''),
      serviceName : new FormControl(''),
      numberOfArea : new FormControl(''),
      isActive : new FormControl(1),

      areaSetMasterDetailsList: new FormControl([]) 
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

  //    this.cities = [
  //     {name: 'New York', code: 'NY'},
  //     {name: 'Rome', code: 'RM'},
  //     {name: 'London', code: 'LDN'},
  //     {name: 'Istanbul', code: 'IST'},
  //     {name: 'Paris', code: 'PRS'}
  // ];
  }



  /**save and submit data also add data*/
  onSubmit(){
    //alert("hi")
  // const data = this.areasetForm.getRawValue();
    console.log(this.areasetForm.value)
 
  // this.areasetForm.removeControl('areaSetMasterId')
  //this.areasetForm.controls['serviceMasterId'].setValue(parseInt(this.areasetForm.controls['serviceMasterId'].value))
       this.areasetService.saveAreaSet(this.areasetForm.value).subscribe((res)=>{
         // this.areasetService.saveAreaSet(data).subscribe((res) => {
          console.log(res);
         
          this.summaryData = res.data.results;
          this.alertService.sweetalertMasterSuccess('','Area set saved successfully');

       // this.toaster.success('','Area set saved succefully');
        this.areaList = [];
        this.getSummaryData();
        
        this.areasetForm.reset();
     
        this.areaListData = [];
        
        this.editFormFlag = false;
        this.viewFormFlag = false;
         this.hideRemarkDiv2 = false;
      },error => {
        if(error.error.status.code == '400'){
          //this.toaster.success( 'Duplicate Area Set Name' );
          this.alertService.sweetalertError('Dulicate Areaset');

        }
      }
      )
        //this.areasetForm.reset();
  }

  
  
/**Update data */
  onUpdate(){
      this.areasetService.updateAreaSet(this.areasetForm.value).subscribe((res)=>{
      //this.toaster.success('','Area set updated succefully');
      this.alertService.sweetalertMasterSuccess('','Employee set updated successfully');
      this.getSummaryData();
      this.areasetForm.reset();
      this.areaList = [];

      this.areaListData = [];
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.hideRemarkDiv2 = false;
    }
    // ,error => {
    //   if(error.error.status.code == '400'){
    //     //this.toaster.success( 'Duplicate Area Set Name' );
    //     this.alertService.sweetalertError('Dulicate Areaset');

    //   }
    // }
    )
 // console.log(this.areasetForm.value);
// this.areasetForm.reset();
}

/**Reset button */
formReset(){
      this.areasetForm.reset();
      this.areaList = [];
      this.areaListData = [];
      this.editFormFlag = false;
      this.viewFormFlag = false;
      this.areasetForm.enable();    
      this.hideRemarkDiv2 = false;
      //this.areasetForm.get('isActive').setValue(1);
}

/**primeng multi select area master array payrollareaid and payrollareacode */
getAreaMasterId(e){
    console.log(JSON.stringify(e))  //Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
    /** prime ng multiselect */
    this.areaMaster.push({
      "areaCode":'PA-Staff',
      "areaId":e.itemValue
    })
    this.areasetForm.controls['areaSetMasterDetailsList'].setValue(this.areaMaster);
    /** Single select i.e select */
    // this.areaMaster.push({
    //   "areaSetMasterDetailsId":0,
    //   "areaMasterId":e
    // }) 
  }

  /**Summary data */
  getSummaryData(){
      this.areasetService.getSummaryData().subscribe(res =>{
      this.summaryData = res.data.results[0];
      console.log(this.summaryData)
       })
  }

  /**Service list */
  getServiceList(){
    // console.log(this.serviceListData);
      this.areasetService.getServiceList().subscribe(res =>{
      this.serviceListData = res.data.results[0];
      console.log(this.serviceListData)
   
      })
  }

/**Service list by name with id */
  getAreasetByService(serviceid){
   // debugger
    console.log('service id is',serviceid);
       this.areaListData = [];
       this.areaList = [];
      this.areasetService.getByServiceName(serviceid).subscribe(res =>{
     // this.areaListData = res.data.results;
     // console.log('result is',res);
      res.data.results[0].forEach(element => {
     //   console.log('Area element is',element.payrollAreaCode)
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
    //  this.isReset = false;
      this.areasetForm.enable();
      this.areasetForm.patchValue(data);
      
     // this.areasetForm.get('isActive').setValue(1);
      this.areasetForm.controls['serviceMasterId'].setValue(data.serviceMaster.serviceMasterId);
     this.getAreasetByService(data.serviceMaster.serviceMasterId);
    this.areaList = [];
      this.areaList = [{
        label:'PA-Staff',
        value:data.areaSetMasterDetailsList[0].areaCode
      }]
let datatest = []
    this.areaList = data.areaSetMasterDetailsList.forEach(ele => {
      datatest.push(ele.areaId) 
      
    });
    this.areaList = datatest
      console.log(data)
      console.log("Area list is",this.areaList);
  }

  viewAreaSet(data){
      this.editFormFlag =false;
      this.viewFormFlag = true;
    ///  this.isReset = false
      this.areasetForm.disable();
      this.areasetForm.patchValue(data);
      this.areasetForm.controls['serviceMasterId'].setValue(data.serviceMaster.serviceMasterId);
      this.getAreasetByService(data.serviceMaster.serviceMasterId);
      this.areaList = [{
        label:'PA-Staff',
        value:data.areaSetMasterDetailsList[0].areaCode
      }]
      console.log(data)
      let datatest = []
    this.areaList = data.areaSetMasterDetailsList.forEach(ele => {
      datatest.push(ele.areaId) 
      
    });
    this.areaList = datatest
      console.log(data)
      console.log("Area list is",this.areaList);
  }  

//   isCancel(){
// this.editFormFlag = false;
// this.viewFormFlag = false;
//     this.isReset =  true;
//   }

  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event) {
 
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  getArea(data,elm){
    console.log('getArea',data);
    console.log('elm',elm);
    this.areaMaster.push({
      "areaCode":'PA-Staff',
      "areaId":elm.itemValue
    })
    this.areasetForm.controls['areaSetMasterDetailsList'].setValue(this.areaMaster);
  }
  

}






//AreaSetMaster and AreaSetMasterDetails