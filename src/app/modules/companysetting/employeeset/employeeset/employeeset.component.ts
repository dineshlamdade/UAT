import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesetService } from '../employeeset.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';

@Component({
  selector: 'app-employeeset',
  templateUrl: './employeeset.component.html',
  styleUrls: ['./employeeset.component.scss']
})
export class EmployeesetComponent implements OnInit {
  employeesetForm: FormGroup;
  serviceListData: Array<any> = [];
  empData: any;
  summaryData: Array<any> = [];empListt: any;
;
  employeeMasterId: number;
  serviceData: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  hideRemarkDiv2: boolean = false;
  employeeMaster: any;
  selectedemployeeMasterId: number;
  getdata: any;
  employeeList : any = [];

  constructor(public empService: EmployeesetService, public fb: FormBuilder,public toaster : ToastrService,
    public alertService : AlertServiceService) {
    this.employeesetForm = new FormGroup({
      employeeSetName : new FormControl('',[Validators.required,Validators.maxLength(25)]),
      empList : new FormControl('',Validators.required),
      remark : new FormControl(''),
      isActive : new FormControl(1),
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

  onSubmit() {
   //console.log(this.employeesetForm.value)
   this.empService.saveEmployeeSet(this.employeesetForm.value).subscribe((res : any)=>{
     
   // this.toaster.success('','Employee set saved successfully');
   this.alertService.sweetalertMasterSuccess('','Employee set saved successfully');
   //this.employeeList = [];
    this.getSummaryData();
    this.employeesetForm.controls['empList'].setValue([]);
    //this.serviceListData = [];
    //this.getServiceList();
    this.employeesetForm.reset();
   },error => {
    if(error.error.status.code == '400'){
      //this.toaster.error('', 'Duplicate Area Set Name' );
       this.alertService.sweetalertError('Dulicate emplyeeset')
    }
  }
   )
  // this.employeesetForm.reset();
  }

  onUpdate() {
    this.empService.updateData(this.employeesetForm.value).subscribe((res=>{
     // this.toaster.success('',"Employee set updated successfully");
     this.alertService.sweetalertMasterSuccess('','Employee set updated successfully');
      this.getSummaryData();
      //.employeeList = []
      this.serviceListData = [];
      this.employeesetForm.reset();
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
  
  
}
