import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesetService } from '../employeeset.service';

@Component({
  selector: 'app-employeeset',
  templateUrl: './employeeset.component.html',
  styleUrls: ['./employeeset.component.scss']
})
export class EmployeesetComponent implements OnInit {
  employeesetForm : FormGroup;
  serviceListData: any;
  empData: any;
  summaryData: any;
  employeeMasterId: number;
  serviceData: any;

  constructor(public empService : EmployeesetService,public fb : FormBuilder) { 
    this.employeesetForm = new FormGroup({

    })
  }

  ngOnInit(): void {
    this.getServiceList();
    this.getSummaryData();
    // this.getByEmployeeId(this.employeeMasterId);
    // console.log("this.employeeMasterId",this.employeeMasterId)
  }

  getEmployeeMasterId(e){

  }

  getServiceList(){
    this.empService.getServiceList().subscribe((res)=>{
      this.serviceListData = res.data.results[0];
      // this.serviceListData.forEach(element => {
      // this.employeeMasterId =  element.employeeMasterId;

      // });
      // this.serviceData = res.data.results;
      // this.serviceData.forEach(element => {
      //   this.employeeMasterId =  element.employeeMasterId;
      // });
     
      //console.log(" this.employeeMasterId", this.employeeMasterId);
    })
  }

  getByEmployeeId(employeeMasterId){
     this.empService.getByEmlpoyeeId(this.employeeMasterId).subscribe((res)=>{
      // console.log(res);
      this.empData = res.data.results;
      console.log("empData",this.empData)

    //   this.empData.push({
    //     label: payrollAreaCode, 
    //     value: payrollAreaId
    // })
     })
  }

  getSummaryData(){
    this.empService.getSummaryData().subscribe((res)=>{
      this.summaryData = res.data.results;
    })
  }
}
