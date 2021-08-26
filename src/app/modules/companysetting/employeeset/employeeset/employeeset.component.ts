import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesetService } from '../employeeset.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ExcelserviceService } from 'src/app/core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map,debounceTime } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { TemplateRef} from '@angular/core';

//import { ExcelserviceService } from  './../../core/services/excelservice.service';
@Component({
  selector: 'app-employeeset',
  templateUrl: './employeeset.component.html',
  styleUrls: ['./employeeset.component.scss']
})
export class EmployeesetComponent implements OnInit {
  employeesetForm: FormGroup;
  serviceListData: Array<any> = [];
  empData: any;
  summaryData: Array<any> = [];
  empListt: any;
  excelData: any;
  header: any;
  excelData1: any;
  header1: any;

  employeeMasterId: number;
  serviceData: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  hideRemarkDiv2: boolean = false;
  employeeMaster: any;
  selectedemployeeMasterId: number;
  getdata: any;
  employeeList : any = [];
  radioStatus: boolean;
  primengConfig: any;
  private searchSubscribe;
  modalRef: BsModalRef;
  displayedColumns: any;
  employeedata: any[] = [];
  empdataSource: any;
  employeeMasterdata: any;
//  result: any;
//  query: string;
 // FilteredApplicationNames: any;
 // search: (text$: Observable<string>) => Observable<any>;

  constructor(public empService: EmployeesetService, public fb: FormBuilder,public toaster : ToastrService,
    public alertService : AlertServiceService,private excelservice: ExcelserviceService,
    private modalService: BsModalService) {
    this.employeesetForm = new FormGroup({
      employeeSetName : new FormControl('',[Validators.required,Validators.maxLength(25)]),
      empList : new FormControl('',Validators.required),
      remark : new FormControl(''),
      isActive : new FormControl(1),
      empListRadio : new FormControl(''),
      numberOfArea : new FormControl(''),
      employeeSetMasterId : new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getServiceList();
    this.getSummaryData();
    //this.primengConfig.ripple = true;
    // this.search = (text$: Observable<string>) => text$.pipe(
    //   distinctUntilChanged(),
    //    map(term => term.length < 2 ? []
    //      : this.result.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    //  );

    
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
  // checkEmpSet(event){
  //   console.log('emplistradio',event);
  //   this.employeesetForm.get('empListRadio').setValue(true)
  // }

  onSubmit() {
   //console.log(this.employeesetForm.value)
   this.empService.saveEmployeeSet(this.employeesetForm.value).subscribe((res)=>{
     console.log(res)
   // this.toaster.success('','Employee set saved successfully');
   this.alertService.sweetalertMasterSuccess('Success','Employee Set Saved Successfully');
   //this.employeeList = [];
   //this.serviceListData = [];
   this.getSummaryData();
  //this.serviceListData = [];
  // this.employeeMaster = [];
   // this.employeesetForm.controls['empList'].setValue([]);
   
    //this.getServiceList();
    this.employeesetForm.reset();
    this.editFormFlag = false;
    this.viewFormFlag = false;
     this.hideRemarkDiv2 = false;
   },error => {
    if(error.error.status.code == '400'){
      //this.toaster.error('', 'Duplicate Area Set Name' );
       this.alertService.sweetalertError('Duplicate Employeeset');
       this.employeesetForm.controls['employeeSetName'].reset();
    }
  }
   )
  // this.employeesetForm.reset();
  }

  onUpdate() {
    this.empService.updateData(this.employeesetForm.value).subscribe((res=>{
     // this.toaster.success('',"Employee set updated successfully");
     this.alertService.sweetalertMasterSuccess('Success','Employee Set Updated Successfully');
      this.getSummaryData();
      //.employeeList = []
      this.serviceListData = [];
      this.employeesetForm.reset();
      this.hideRemarkDiv2 = false;
    }),
    error => {
      if(error.error.status.code == '400'){
        //this.toaster.success( 'Duplicate Area Set Name' );
       //this.alertService.sweetalertError('Dulicate employeeset');

      }
    })

  }

  getEmployeeMasterId(e) {
    this.selectedemployeeMasterId = e.itemValue;
    this.empService.getByEmlpoyeeId(this.selectedemployeeMasterId).subscribe((res)=>{
    this.serviceListData = res.data.results;

    
    console.log(res);
    })

  }

  getServiceList() {
    this.empService.getServiceList().subscribe((res) => {
    //this.serviceListData = res.data.results[0];
    this.serviceListData = []
     res.data.results.forEach(element => {
        this.serviceListData.push({
          label : element.employeeCode,
          value : element.employeeMasterId,
          name : element.fullName
        })
        
      });
      console.log('service list data',this.serviceListData);
     
    })
  }

  // getByEmployeeId(employeeMasterId) {
  //   this.empService.getByEmlpoyeeId(this.employeeMasterId).subscribe((res) => {
  //     console.log(res);
  //     this.empData = res.data.results;
  //     console.log("empData",this.empData)

  //     //   this.empData.push({
  //     //     label: payrollAreaCode, 
  //     //     value: payrollAreaId
  //     // })
  //   })
  // }

  getSummaryData(){
    this.empService.getSummaryData().subscribe((res)=>{
      this.summaryData = res.data.results[0];
      console.log('summary data is',this.summaryData)
     } ,error => {
    // //   // if(error.error.status.code == ''){
    // //      //this.toaster.success( 'Duplicate Area Set Name' );
    // //     // this.alertService.sweetalertError('Dulicate Areaset');
    // //     // this.areasetForm.controls['areaSetName'].reset();

    // //   // }
    setTimeout(()=>{
       this.summaryData = []
     },200)
     
     }
     )
  }

  formReset() {
    
     this.employeesetForm.reset();

     this.serviceListData = [];
    // this.employeeList = []
     this.editFormFlag = false;
     this.viewFormFlag = false;
     this.employeesetForm.enable(); 
     this.getServiceList();
     this.hideRemarkDiv2 = false;
        
  }

  editEmployeeSet(data){
    this.editFormFlag =true;
    this.viewFormFlag = false;
    this.employeesetForm.enable();
    this.employeesetForm.patchValue(data);
    
    let d = []
    data.employeeSetMasterDetailsList.forEach(element => {
       d.push({
        label : element.employeeMaster.employeeCode,
          value : element.employeeMaster.employeeMasterId 
       })
    });
    this.employeesetForm.controls['empList'].setValue(d)
//new code
    let datatest = []
    this.employeeList = data.employeeSetMasterDetailsList.forEach(ele => {
      datatest.push(ele.employeeMaster.employeeMasterId) 
      
    });
    this.employeeList = datatest
      console.log(data)
      console.log("Employee list is",this.employeeList);
  }

  viewEmployeeSet(data){
    this.editFormFlag =false;
    this.viewFormFlag = true;
    this.employeesetForm.disable();
    this.employeesetForm.patchValue(data);
    let d = []
    data.employeeSetMasterDetailsList.forEach(element => {
       d.push({
        label : element.employeeMaster.employeeCode,
          value : element.employeeMaster.employeeMasterId 
       })
    });
    this.employeesetForm.controls['empList'].setValue(d)

    let datatest = []
    this.employeeList = data.employeeSetMasterDetailsList.forEach(ele => {
      datatest.push(ele.employeeMaster.employeeMasterId) 
      
    });
    this.employeeList = datatest
      console.log(data)
      console.log("Employee list is",this.employeeList);
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
    
  }
  
  
  deleteData(id){
    this.empService.deleteData(id).subscribe((res)=>{
     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
    //this.getServiceList();
   this.ngOnInit()
   this.getSummaryData();
     
   })

  }

  //Employee set Excel
  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = []
    this.header =["Emp.SetName", "No.Of Emp"];
    this.excelData = [];

   //let empname = this.employeesetForm.get('employeeSetName').value;
   //console.log("employee list",this.employeeList)
  // let emp = this.employeesetForm.get('empList').value
  // console.log('empdata',emp)
  // let empList= emp.split(',');

   if(this.employeeList.length>0){
  this.employeeList.forEach(element=>{
    let empCode = this.serviceListData.find(x=>x.value==element)
  let obj={ 
    // EmployeeSetName : empname,
    employeeCode : empCode.label,
 // empName : empCode.name
}
    this.excelData.push(obj)
 })
 

  

    // if(this.summaryData.length>0){
    //  // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
    //  //this.employeeList =  this.tableDataList;
    //  this.summaryData.forEach((element) => {
    //   let obj = {
    //     EmployeeSetName: element.employeeSetName,
    //     NoOfEmp: element.employeeSetMasterDetailsList.length,
    //     //masterDescription: element.masterDescription,
    //   };
      
   // });
      console.log('this.employeeList::', this.employeeList);
    }
   
this.downloadExcel(this.excelData, this.header);
  }

  downloadExcel(excelData, header){
    this.excelservice.exportAsExcelFile(excelData, header);
  }

  exportApprovalSummaryAsExcel1(): void {
    this.excelData1 = [];
    this.header1 = []
    this.header1 =["Emp.SetName", "No.Of Emp"];
    
    this.excelData1 = [];

   let empname = this.employeesetForm.get('employeeSetName').value;
   //console.log("employee list",this.employeeList)
  // let emp = this.employeesetForm.get('empList').value
  // console.log('empdata',emp)
  // let empList= emp.split(',');

   if(this.employeeList.length>0){
  this.employeeList.forEach(element=>{
    let empCode = this.serviceListData.find(x=>x.value==element)
  let obj={ 
     EmployeeSetName : empname,
    employeeCode : empCode.label,
 empName : empCode.name
}
    this.excelData1.push(obj)
 })
 

  

    // if(this.summaryData.length>0){
    //  // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
    //  //this.employeeList =  this.tableDataList;
    //  this.summaryData.forEach((element) => {
    //   let obj = {
    //     EmployeeSetName: element.employeeSetName,
    //     NoOfEmp: element.employeeSetMasterDetailsList.length,
    //     //masterDescription: element.masterDescription,
    //   };
      
   // });
      console.log('this.employeeList::', this.employeeList);
    }
   // this.excelservice.exportAsExcelFile(this.excelData, this.header);

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

//  search(filterValue){
//   //   this.serviceListData = this.serviceListData.filter((val) => val.employeeCode.toLowerCase().includes(value));
//   this.serviceListData.filter(option => option.toLowerCase().includes(filterValue))
//   }
// filter(event: any) {
//   if (this.query != "") {
//       this.FilteredApplicationNames = this.employeeList.filter(function (el) {
//           return el.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
//       }.bind(this));
//   } else {
//       this.FilteredApplicationNames = [];
//   }
// }
  
Arealistpop(arealist: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    arealist,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

largepopup(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}


//emp list radio button//
employeeListPasteData(event: ClipboardEvent) {
  let clipboardData = event.clipboardData;
  let pastedText = clipboardData.getData('text');
  let row_data = pastedText.split('\n');
  // this.displayedColumns = row_data[0].split('\t');
  // this.displayedColumns = ["employeeCode", "employeeName"]
  this.displayedColumns = ["employeeCode"]
let emp=[];
for(let i= 0;i<row_data.length;i++){
  let data=row_data[i].replace('\r','');
  if(data!=''){
const employee=this.serviceListData.find(a=>a.label ==data)
let obj=employee.value;

emp.push(obj)
}
}

  this.employeesetForm.get('empList').setValue(emp);
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
  
  this.serviceListData.forEach(element => {
    this.empdataSource.forEach(emp => {
      let empcode = emp.employeeCode.split('\r')
      if(element.employeeCode+',' == empcode){
        emp.employeeMasterId = element.employeeMasterId
        emp.fullName = element.fullName 
      }
    });
  });
  console.log("After: " + JSON.stringify(this.empdataSource));
}

}




// function filterValue(filterValue: any) {
//   throw new Error('Function not implemented.');
// }
// <i class="fa fa-file-excel-o fa-2x 
// //Job Master Excel
//   exportApprovalSummaryAsExcel(): void {
//     this.excelData = [];
//     this.header = []
//     this.header =["jobMasterType", "masterCode", "masterDescription"];
//     this.excelData = [];
//     if(this.tableDataList.length>0){
//      // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
//      //this.employeeList =  this.tableDataList;
//      this.tableDataList.forEach((element) => {
//       let obj = {
//         jobMasterType: element.jobMasterType,
//         masterCode: element.masterCode,
//         masterDescription: element.masterDescription,
//       };
//       this.excelData.push(obj);
//     });
//       console.log('this.employeeList::', this.employeeList);
//     }
//     this.excelservice.exportAsExcelFile(this.excelData, 'Job-Master-Summary', 'Job-Master-Summary' ,this.header);

  
