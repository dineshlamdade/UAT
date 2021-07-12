import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeesetService } from '../employeeset.service';

@Component({
  selector: 'app-employeeset',
  templateUrl: './employeeset.component.html',
  styleUrls: ['./employeeset.component.scss']
})
export class EmployeesetComponent implements OnInit {
  employeesetForm: FormGroup;
  serviceListData: any = [];
  empData: any;
  summaryData: any;
  employeeMasterId: number;
  serviceData: any;
  editFormFlag: boolean = false;
  viewFormFlag: boolean = false;
  hideRemarkDiv2: boolean = true;
  employeeMaster: any;
  selectedemployeeMasterId: any;


  constructor(public empService: EmployeesetService, public fb: FormBuilder,public toaster : ToastrService) {
    this.employeesetForm = new FormGroup({
       empSetName : new FormControl('',Validators.required),
       employeeCode : new FormControl('',Validators.required),
       remark : new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
    this.getServiceList();
    this.getSummaryData();
  }

  changeEvent2($event) {

    if ($event.target.checked) {
      this.hideRemarkDiv2 = true;
    }
    else {
      this.hideRemarkDiv2 = false;
    }
  }

  onSubmit() {
   //console.log(this.employeesetForm.value)
   this.empService.saveEmployeeSet(this.employeesetForm.value).subscribe((res)=>{
    this.toaster.success('','Employee set saved succefully');
    this.getSummaryData();
    this.serviceListData = [];
    this.employeesetForm.reset();
   })
  // this.employeesetForm.reset();
  }

  onUpdate() {

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
      this.summaryData = res.data.results;
    })
  }

  formReset() {
     this.employeesetForm.reset();
  }

  editEmployeeSet(data){
    this.editFormFlag =true;
    this.viewFormFlag = false;
    this.employeesetForm.enable();
    this.employeesetForm.patchValue(data);
  }

  viewEmployeeSet(data){
    this.editFormFlag =false;
    this.viewFormFlag = true;
    this.employeesetForm.disable();
    this.employeesetForm.patchValue(data);
  }
}
