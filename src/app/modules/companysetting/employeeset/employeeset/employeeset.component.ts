import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesetService } from '../employeeset.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ExcelserviceService } from 'src/app/core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
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

  constructor(public empService: EmployeesetService, public fb: FormBuilder,public toaster : ToastrService,
    public alertService : AlertServiceService,private excelservice: ExcelserviceService) {
    this.employeesetForm = new FormGroup({
      employeeSetName : new FormControl('',[Validators.required,Validators.maxLength(25)]),
      empList : new FormControl('',Validators.required),
      remark : new FormControl(''),
      isActive : new FormControl(1),
      empListRadio : new FormControl(''),
      employeeSetMasterId : new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getServiceList();
    this.getSummaryData();
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
   this.empService.saveEmployeeSet(this.employeesetForm.value).subscribe((res : any)=>{
     
   // this.toaster.success('','Employee set saved successfully');
   this.alertService.sweetalertMasterSuccess('Success','Employee Set Saved Successfully');
   //this.employeeList = [];
    this.getSummaryData();
    this.employeesetForm.controls['empList'].setValue([]);
    //this.serviceListData = [];
    //this.getServiceList();
    this.employeesetForm.reset();
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
       this.alertService.sweetalertError('Dulicate employeeset');

      }
    })

  }

  getEmployeeMasterId(e) {
    this.selectedemployeeMasterId = e.itemValue;
    this.empService.getByEmlpoyeeId(this.selectedemployeeMasterId).subscribe((res)=>{
    //this.serviceListData = res.data.results;

    
    console.log(res);
    })

  }

  getServiceList() {
    this.empService.getServiceList().subscribe((res) => {
      //this.serviceListData = res.data.results[0];
     res.data.results[0].forEach(element => {
        this.serviceListData.push({
          label : element.employeeCode,
          value : element.employeeMasterId
        })
        
      });
      console.log(this.serviceListData);
     
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
      console.log(this.summaryData)
    })
  }

  formReset() {
    
     this.employeesetForm.reset();

     this.serviceListData = [];
     
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
  

  //Employee set Excel
  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = []
    this.header =["Emp.SetName", "No.Of Emp"];
    this.excelData = [];
    if(this.summaryData.length>0){
     // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
     //this.employeeList =  this.tableDataList;
     this.summaryData.forEach((element) => {
      let obj = {
        EmployeeSetName: element.employeeSetName,
        NoOfEmp: element.employeeSetMasterDetailsList.length,
        //masterDescription: element.masterDescription,
      };
      this.excelData.push(obj);
    });
      console.log('this.employeeList::', this.employeeList);
    }
    this.excelservice.exportAsExcelFile(this.excelData, this.header);

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

  
}



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

  
