import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AreasetService } from './areaset.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SelectItem, PrimeNGConfig } from "primeng/api";
//import { ExcelserviceService } from 'src/app/core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
import { element } from 'protractor';
import { threadId } from 'node:worker_threads';
import { ColumnFilterFormElement } from 'primeng/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { TemplateRef} from '@angular/core';
import { interval } from 'rxjs';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';


interface User1 {
  areaSetName;
  nature;

}


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
  selectedItem: any = [];
  isHideAreaList : boolean;
  isHideAreaListRadio : boolean;

  public modalRef: BsModalRef;

  public apiUrl = environment.baseUrl8084;
  areasetForm : FormGroup;
  areaMaster : any = [];
  serviceListData: any;
  areaListData: Array<any> = [];
  summaryData: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  hideRemarkDiv2 = false;
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

  excelData1: any;
  header1: any;
  editedComplianceHeadId: number = 0;
  users1: User1[];
  displayedColumns: any;
  employeedata: any[] = [];
  empdataSource: any;
  id: any;
//  id: any;
  constructor(public fb : FormBuilder,public areasetService : AreasetService,private http: HttpClient,
    private toaster : ToastrService, private primengConfig: PrimeNGConfig,
    public alertService : AlertServiceService,private excelservice: ExcelserviceService,
    private modalService: BsModalService
) { 
     
        this.getForm();
    //this.areaMaster = this.areasetForm.get('areaMaster') as FormArray;   
  }

  getForm(){
    this.areasetForm = new FormGroup({
      areaSetMasterId: new FormControl(''),
      areaSetName: new FormControl('',[Validators.required,Validators.maxLength(25)]),
      serviceMasterId: new FormControl('',[Validators.required]),
      remark: new FormControl({ value: '', disabled: true },Validators.required),
      serviceName : new FormControl(''),
      numberOfArea : new FormControl(''),
      isActive : new FormControl({ value: true, disabled: true }),
      areaList : new FormControl({ value: "", disabled: false }),
      areaListRadio : new FormControl({ value: "", disabled: false }),
      
     areaSetMasterDetailsList: new FormControl([]) 
    })

  }
  deactivateRemark() {
    console.log( 'in deactive remakr' );

    if ( this.areasetForm.get( 'isActive' ).value === false ) {
      this.areasetForm.get( 'remark' ).enable();
      this.hideRemarkDiv2 = true;
      this.areasetForm.controls['remark'].setValidators( Validators.required );
      this.areasetForm.controls['remark'].updateValueAndValidity();
    } else {
     
      this.hideRemarkDiv2 = false;
      this.areasetForm.controls["remark"].clearValidators();
      this.areasetForm.controls["remark"].updateValueAndValidity();
     
    }
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
  
 onSelectArea(evt){
  this.isHideAreaList = true;
  this.isHideAreaListRadio = false;
  console.log(evt);
  if(evt.value.length >= 1){
    this.areasetForm.get('areaListRadio').disable();
  }
  else {
   this.areasetForm.get('areaListRadio').enable();
  }
 
}
onSelectArea1(evt){
  this.isHideAreaList = false;
  this.isHideAreaListRadio = true;
  console.log(evt);
  if(evt.value.length >= 1){
    this.areasetForm.get('areaList').disable();
  }
  else {
   this.areasetForm.get('areaList').enable();
  }
 
}

 smallpopup4(deleteTemp: TemplateRef<any>,data) {
  this.modalRef = this.modalService.show(deleteTemp,
    Object.assign({}, { class: 'gray modal-md' })
  );
   this.id = data.areaSetMasterId;
  console.log("this.summaryqueryGenerationEmpId",this.id);

}

  ngOnInit(): void {
     this.getServiceList();
     this.getSummaryData();
     this.users1 = [
      { areaSetName: '1', nature: 'Earning'},
    ];
   }

  

  /**save and submit data also add data*/
  onSubmit(){
     if(this.areasetForm.get('areaList').value <= 0){
         this.alertService.sweetalertWarning('Please Select Area');
         return false;
        }
       this.areasetService.saveAreaSet(this.areasetForm.value).subscribe((res)=>{
       console.log(res);
       this.areasetForm.get('isActive').setValue(true);
       this.areasetForm.get('isActive').disable();
       this.alertService.sweetalertMasterSuccess('Success','Area Set Saved Successfully');
       this.getSummaryData();
       this.areasetForm.get('areaList').enable();
       this.areaMaster=[];
       this.areasetForm.controls['areaList'].setValue([]);
       this.areasetForm.controls['areaSetMasterDetailsList'].setValue([]);
       this.areasetForm.get('areaList').enable()
       this.areasetForm.get('areaListRadio').enable()
       this.getForm();
       this.areasetForm.reset();
       this.areasetForm.patchValue({
        serviceMasterId: '',
      });
        this.editFormFlag = false;
        this.viewFormFlag = false;
        this.hideRemarkDiv2 = false;
        this.areasetForm.get('isActive').setValue(1);
        this.areasetForm.get('isActive').disable()
      },error => {
        if(error.error.status.code == '400'){
          //this.toaster.success( 'Duplicate Area Set Name' );
          this.alertService.sweetalertError('Dulicate Areaset');
          this.areasetForm.controls['areaSetName'].reset();

        }  
      })      
  }

  
  
/**Update data */
  onUpdate(){
    
    //  this.areasetForm.get('isActive').setValue(true)
      this.areasetService.updateAreaSet(this.areasetForm.value).subscribe((res)=>{
     //this.toaster.success('','Area set updated succefully');
      this.alertService.sweetalertMasterSuccess('Success','Area Set Updated Successfully');
     
      this.hideRemarkDiv2 = false;
      this.areasetForm.get('isActive').disable()
      this.getSummaryData()
      this.getForm();
      this.areasetForm.reset();
      this.areasetForm.get('isActive').setValue(true);
      this.areasetForm.get('areaList').enable()
      this.areasetForm.get('areaListRadio').enable()
      this.areasetForm.patchValue({
      serviceMasterId: '',
    });
      this.areaListData = [];
      this.editFormFlag = false;
      this.viewFormFlag = false; 
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
      this.areasetForm.get( 'remark' ).disable();
      this.areasetForm.get( 'isActive' ).setValue(true);
      this.areasetForm.get( 'isActive' ).disable();  
      this.areasetForm.patchValue({
        serviceMasterId: '',
      })      
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
       },error => {
       // if(error.error.status.code == ''){
          //this.toaster.success( 'Duplicate Area Set Name' );
         // this.alertService.sweetalertError('Dulicate Areaset');
         // this.areasetForm.controls['areaSetName'].reset();

       // }
       setTimeout(()=>{
        this.summaryData = []
       },200)
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
           console.log("servic list is",this.serviceData)
   })
  }

/**Service list by name with id */
  getAreasetByService(serviceid){
   // debugger
    console.log('service id is',serviceid);
       this.areaListData = [];
       this.areaList = [];
       let servicName = this.serviceData.find(x=>x.serviceMasterId == serviceid)
       this.areasetService.getByServiceName(serviceid).subscribe((res)=>{
      //  this.areaListData = res.data.results[0];
        res.data.results[0].forEach(element => {
           if(servicName.serviceName=="payroll"){
            this.areaListData.push({
              label: element.payrollAreaCode, 
              value: element.payrollAreaId
          })
        }else if(servicName.serviceName=="leave") {
          this.areaListData.push({
            label: element.leaveAreaCode, 
            value: element.leaveAreaId
        })
        }
        else if(servicName.serviceName=="Reimbursement") {
          this.areaListData.push({
            label: element.reimbursementAreaCode, 
            value: element.reimbursementAreaId
        })
        }
        else if(servicName.serviceName=="Attendance") {
          this.areaListData.push({
            label: element.attendanceAreaCode, 
            value: element.attendanceAreaId
        })
        }

         console.log("area list is",this.areaListData)
         
         
       })
   
      });
      
 
    
  }

  editAreaSet(data){
      // this.areasetForm.get('isActive').setValue(0)
      // this.hideRemarkDiv2 = true;
      this.editFormFlag =true;
      this.viewFormFlag = false;
      this.areasetForm.enable();
      this.areasetForm.patchValue(data);
     
     
      this.areasetForm.controls['serviceMasterId'].setValue(data.serviceMaster.serviceMasterId);
      this.getAreasetByService(data.serviceMaster.serviceMasterId);
     
      let abc = [];
      data.areaSetMasterDetailsList.forEach(element => {
          abc.push({
          label : element.areaCode,
          value : element.areaId
          })
     });
      this.areasetForm.controls['areaList'].setValue(abc);
    //this.areasetForm.get('areaList').setValue(abc)
     let datatest = []
     this.areaList = data.areaSetMasterDetailsList.forEach(ele => {
     datatest.push(ele.areaId)   
     });
     this.areaList = datatest
     console.log(data)
     console.log("Area list is",this.areaList);
  }


  viewAreaSet(data){
      // this.areasetForm.get('isActive').setValue(0)
      // this.hideRemarkDiv2 = true;
      this.editFormFlag =false;
      this.viewFormFlag = true;
      this.areasetForm.disable();
      this.areasetForm.get('areaListRadio').disable();
      this.areasetForm.patchValue(data);
     
      this.areasetForm.controls['serviceMasterId'].setValue(data.serviceMaster.serviceMasterId);
      this.getAreasetByService(data.serviceMaster.serviceMasterId);
      // this.selectedItem =  this.selectedItem.concat(this.areaListData[1].value);
      // console.log(this.selectedItem);
      let abc = [];
      data.areaSetMasterDetailsList.forEach(element => {
          abc.push({
          label : element.areaCode,
          value : element.areaId
          })
     });
      this.areasetForm.controls['areaList'].setValue(abc);
      //console.log(data)
      let datatest = []
      this.areaList = data.areaSetMasterDetailsList.forEach(ele => {
      datatest.push(ele.areaId) 
      });
      this.areaList = datatest
      console.log(data)
      console.log("Area list is",this.areaList);
  }  


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
    let areanew=this.areaListData.find(a=>a.label == data);
   
    this.areaMaster.push({
    "areaCode":areanew,
     "areaId":elm.itemValue
      // name:areanew,
     // code:areanew1
    })
    this.areasetForm.controls['areaSetMasterDetailsList'].setValue(this.areaMaster);
   }

   deleteData(data){
     this.areasetService.deleteData(this.id).subscribe((res)=>{
    this.alertService.sweetalertMasterSuccess( res.status.message, '' );
     //this.alertService.sweetalertMasterSuccess("Area Set Deleted", '' );
     // this.areasetService.getServiceList();
      this.ngOnInit();
      this.getSummaryData();
     })

   }

   

   //Area set Excel
  exportApprovalSummaryAsExcel(): void {
  this.excelData = [];
  this.header = []
  this.header = ["serviceName","areacode"];
// this.header =["AreaSetName", "Service" ,'No.Of.Area'];
   this.excelData = [];

//let areaName = this.areasetForm.get('areaSetName').value;

let serName = this.areasetForm.get('serviceMasterId').value;
let servName = this.serviceData.find(x=>x.serviceMasterId==serName)
//    //console.log("employee list",this.employeeList)
//   // let emp = this.employeesetForm.get('empList').value
//   // console.log('empdata',emp)
//   // let empList= emp.split(',');
 if(this.areaList.length>0){
  this.areaList.forEach(element=>{
   let areaCode = this.areaListData.find(x=>x.value==element)
   
  let obj={ 
     //areaSetName : areaName,
     serviceName : servName.serviceName,
     areacode : areaCode.label 
}
   this.excelData.push(obj)
})
console.log('this.areaList::', this.areaList);
}



  

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
     
//     }

   this.excelservice.exportAsExcelFile(this.excelData,'areaData','areaData',this.header);

 }

 exportApprovalSummaryAsExcel1(): void {
  this.excelData1 = [];
 this.header1 = []
  this.header1 =["AreaSetName", "Service" ,'No.Of.Area'];
 this.excelData1 = [];
 
 let areaName = this.areasetForm.get('areaSetName').value;
 
 let serName = this.areasetForm.get('serviceMasterId').value;
 let servName = this.serviceData.find(x=>x.serviceMasterId==serName)
 //    //console.log("employee list",this.employeeList)
 //   // let emp = this.employeesetForm.get('empList').value
 //   // console.log('empdata',emp)
 //   // let empList= emp.split(',');
 
  if(this.areaList.length>0){
   this.areaList.forEach(element=>{
    let areaCode = this.areaListData.find(x=>x.value==element)
    
   let obj={ 
      areaSetName : areaName,
     serviceName :servName.serviceName,
      areacode :areaCode.label 
 }
    this.excelData1.push(obj)
 })
 }
 
 
 
   
 
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
      console.log('this.areaList::', this.areaList);
 //     }
   //this.excelservice.exportAsExcelFile(this.excelData, this.header);
 
  }
  
 
 
 


 
  customSort3(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });



  }
  
  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }


  Arealistpop(arealist: TemplateRef<any>) {
    this.areasetForm.get('areaList').disable();
    this.modalRef = this.modalService.show(
      arealist,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  
  //area list radio button//
areaListPasteData(event: ClipboardEvent) {
  let clipboardData = event.clipboardData;
  let pastedText = clipboardData.getData('text');
  let row_data = pastedText.split('\n');
  // this.displayedColumns = row_data[0].split('\t');
  // this.displayedColumns = ["employeeCode", "employeeName"]
  this.displayedColumns = ["areaCode"]
let area=[];
for(let i= 0;i<row_data.length;i++){
  let data=row_data[i].replace('\r','');
  if(data!=''){
const areas=this.areaListData.find(a=>a.label == data)
let obj=areas?.value;

area.push(obj)
}
}

  this.areasetForm.get('areaList').setValue(area);
  this.excelData=row_data;
  this.excelData1=row_data;

  //delete row_data[0];
  // Create table dataSource
  row_data.forEach(row_data => {
    let row = {};
    this.displayedColumns.forEach((a, index) => {
      row[a] = row_data.split('\t')[index]
    });
    // console.log(row)
    this.employeedata.push(row);
  })
  this.empdataSource = this.employeedata;
  this.empdataSource.splice(this.empdataSource.length-1,1)

  console.log("Before: " + JSON.stringify(this.empdataSource));
  
  this.areaListData.forEach(element => {
    this.empdataSource.forEach(area => {
      let areacode = area.areaCode.split('\r')
      
   //   let serName = this.areasetForm.get('serviceMasterId').value;
//let servName = this.serviceData.find(x=>x.serviceMasterId==serName)
      if(element.areaCode+',' == areacode){
      area.serviceMasterId = element.serviceMasterId
      area.serviceName = element.serviceName
      
       
     // area.servName = element.serviceName
       // emp.fullName = element.fullName 
      }
     
    });
  });

  console.log("After: " + JSON.stringify(this.empdataSource));
}



}






