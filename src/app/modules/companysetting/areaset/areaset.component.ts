import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AreasetService } from './areaset.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { ExcelserviceService } from 'src/app/core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
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

  areaList : Array<any>=[];
  row: any;
  data: any;
  serviceData: any;
  Area: any;
  radioStatus: boolean;
  excelData: any;
  header: any;


  constructor(public fb : FormBuilder,public areasetService : AreasetService,private http: HttpClient,
    private toaster : ToastrService, private primengConfig: PrimeNGConfig,
    public alertService : AlertServiceService,private excelservice: ExcelserviceService) { 
     
      
      this.areasetForm = new FormGroup({
      areaSetMasterId: new FormControl(''),
      areaSetName: new FormControl('',[Validators.required,Validators.maxLength(25)]),
      serviceMasterId: new FormControl('',[Validators.required]),
      remark: new FormControl(''),
      serviceName : new FormControl(''),
      numberOfArea : new FormControl(''),
      isActive : new FormControl(1),
      areaList : new FormControl(''),
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

  example($event) {
    console.log($event.target.checked);
   
    if($event.target.checked){

      this.radioStatus = false;
    }
    else{
      this.radioStatus = true;
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

  // deleteRow(x){
  //   var delBtn = confirm(" Do you want to delete ?");
  //   if ( delBtn == true ) {
  //     this.data.splice(x, 1 );
  //   }   
  // } 

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
          this.alertService.sweetalertMasterSuccess('Success','Area Set Saved Successfully');

       // this.toaster.success('','Area set saved succefully');
        // this.areaList = [];
        this.areasetForm.controls['areaList'].setValue([]);
      this.areasetForm.controls['areaSetMasterDetailsList'].setValue([]);
        this.areaListData = [];
        this.getSummaryData();
        
        this.areasetForm.reset();
      //  this.areasetForm.controls['areaList'].reset();
     
      
        
        this.editFormFlag = false;
        this.viewFormFlag = false;
         this.hideRemarkDiv2 = false;
      },error => {
        if(error.error.status.code == '400'){
          //this.toaster.success( 'Duplicate Area Set Name' );
          this.alertService.sweetalertError('Dulicate Areaset');
          this.areasetForm.controls['areaSetName'].reset();

        }
      }
      )
        //this.areasetForm.reset();
  }

  
  
/**Update data */
  onUpdate(){
      this.areasetService.updateAreaSet(this.areasetForm.value).subscribe((res)=>{
      //this.toaster.success('','Area set updated succefully');
      this.alertService.sweetalertMasterSuccess('Success','Area Set Updated Successfully');
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
      //this.areasetForm.get("areaSetMasterDetailsList").setValue([]);
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
      this.serviceData=[];
      if(this.serviceListData.length >0){
        this.serviceListData.forEach(element => {
         this.serviceData.push({serviceMasterId : element.serviceMasterId,
          serviceCode : element.serviceCode,
          serviceName : element.serviceName})
        });
      }
      console.log(this.serviceData)
   
      })
  }

/**Service list by name with id */
  getAreasetByService(serviceid){
   // debugger
    console.log('service id is',serviceid);
       this.areaListData = [];
       this.areaList = [];
       this.areasetService.getByServiceName(serviceid).subscribe((res)=>{
      //  this.areaListData = res.data.results[0];
        res.data.results[0].forEach(element => {
          // if(serviceid){
            this.areaListData.push({
              label: element.areaCode, 
              value: element.areaId
          })
         
         
         console.log('service master id data',this.areaListData)
         
       })
    //   let location = this.serviceData.find(x=>x.serviceMasterId ==serviceid);
    //    this.Area=location.serviceName;
    //  console.log('areaSelected',this.Area)




      // this.areasetService.getByServiceName(serviceid).subscribe(res =>{
    // this.areaListData = res.data.results;
     //console.log('result is',res);
    
//         var areaCode= this.Area+'AreaCode';
//      //   let str= JSON.parse(+areaCode);
//         var areaId=this.Area+'AreaId';
//         for(let i=0;i<res.data.results[0].length;i++){
         
//  let obj=res.data.results[0][i].areaCode;
//  console.log(obj);
//         }
//           res.data.results[0].forEach(element => {
//      //   console.log('Area element is',element.payrollAreaCode)
// let areaCode=this.Area+'AreaCode';
// let areaId=this.Area+'AreaId';
//  let obj=element.areaCode;
//   value:element.areaId})

//this.areaListData.push(obj)

        // }
          // console.log("this.areaListData: "+ this.areaListData)
           
      });
      
  //  })
    
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
    let abc = [];
      // this.areaList = [{
      //   label:'PA-Staff',
      //   value:data.areaSetMasterDetailsList[0].areaCode
      // }]

      data.areaSetMasterDetailsList.forEach(element => {
        abc.push({
         label : element.areaCode,
           value : element.areaId 
        })
     });
     this.areasetForm.controls['areaList'].setValue(abc)
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

   deleteData(id){
     this.areasetService.deleteData(id).subscribe((res)=>{
      this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      //this.getServiceList()
      this.ngOnInit()
     })

   }

   //Employee set Excel
  exportApprovalSummaryAsExcel(): void {
 this.excelData = [];
this.header = []
 this.header =["AreaSetName", "Service" ,'No.Of.Area'];
this.excelData = [];

let areaName = this.areasetForm.get('areaSetName').value;
let serName = this.areasetForm.get('serviceMasterId').value;
//    //console.log("employee list",this.employeeList)
//   // let emp = this.employeesetForm.get('empList').value
//   // console.log('empdata',emp)
//   // let empList= emp.split(',');

 // if(this.areaList.length>0){
//   this.areaList.forEach(element=>{
//    let areaCode = this.areaListData.find(x=>x.value==element)
//   let obj={  AreaSetName : areaName,
//     serviceName : serName,
//   areacode : }
   //this.excelData.push(obj)
// })
 

  

//     // if(this.summaryData.length>0){
//     //  // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
//     //  //this.employeeList =  this.tableDataList;
//     //  this.summaryData.forEach((element) => {
//     //   let obj = {
//     //     EmployeeSetName: element.employeeSetName,
//     //     NoOfEmp: element.employeeSetMasterDetailsList.length,
//     //     //masterDescription: element.masterDescription,
//     //   };
      
//    // });
//       console.log('this.employeeList::', this.employeeList);
//     }
//     this.excelservice.exportAsExcelFile(this.excelData, this.header);

//   }
//   customSort3(event: SortEvent) {
//     event.data.sort((data1, data2) => {
//       let value1 = data1[event.field];
//       let value2 = data2[event.field];
//       let result = null;

//       if (value1 == null && value2 != null) result = -1;
//       else if (value1 != null && value2 == null) result = 1;
//       else if (value1 == null && value2 == null) result = 0;
//       else if (typeof value1 === 'string' && typeof value2 === 'string')
//         result = value1.localeCompare(value2);
//       else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

//       return event.order * result;
//     });
 }


}






//AreaSetMaster and AreaSetMasterDetails