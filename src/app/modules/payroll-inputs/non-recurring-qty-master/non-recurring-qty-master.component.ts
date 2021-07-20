import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SortEvent } from 'primeng/api';
import { NonRecurringQtyService } from '../non-recurring-qty.service';

@Component({
  selector: 'app-non-recurring-qty-master',
  templateUrl: './non-recurring-qty-master.component.html',
  styleUrls: ['./non-recurring-qty-master.component.scss']
})
export class NonRecurringQtyMasterComponent implements OnInit {
  summaryData: any;
  masterForm: FormGroup
  nonSalaryOptionList: any = [];
  nonSalaryName: any = ''
  users1: { head: string; nature: string; }[];
  nonSalaryNature: any;
  nonSalaryRate: any;
  nonSalaryMultiplier: any;
  valueUpdationThrough: string = 'NRQ';
  valueUpdateflag: boolean = true;
  editFlag: boolean = false;
  viewFlag: boolean = false;

  constructor(private nonrecqtyservice: NonRecurringQtyService, private toaster: ToastrService) {
    this.masterForm = new FormGroup({
      "nonSalaryDetailId": new FormControl(''),
      "code": new FormControl(''),
      "description": new FormControl(''),
      "unit": new FormControl('HR'),
      "headOfPayment": new FormControl(''),
      "descriptionHeadOfPayment": new FormControl(''),
      "valueUpdationThrough": new FormControl(this.valueUpdationThrough),
      "sdmName": new FormControl(''),
      "isActive": new FormControl(1),
      "createdBy": new FormControl('rahul'),
      "nonSalaryOptionList": new FormControl([])
    })
  }

  ngOnInit(): void {
    this.users1 = [
      { head: '1', nature: 'Earning' },
    ];
    this.getMasterSummaryData()
  }

  getMasterSummaryData() {
    this.nonrecqtyservice.NonRecurringnonsalary().subscribe(res => {
      this.summaryData = res.data.results
    })
  }

  addNRQType() {
    this.nonSalaryOptionList.push(
      {
        "name": this.nonSalaryName,
        "nature": this.nonSalaryNature,
        "rate": 0.0,
        "multipier": 0.0,
        "derivedRate": this.nonSalaryRate,
        "derivedmultipier": this.nonSalaryMultiplier,
        "isActive": 1
      }
    )

    this.masterForm.controls['nonSalaryOptionList'].setValue(this.nonSalaryOptionList)
  }

  removeNRQType(index) {
    this.nonSalaryOptionList.splice(index, 1)
  }

  getValueUpdation(event) {
    this.valueUpdateflag = !this.valueUpdateflag
    if (!this.valueUpdateflag) {
      this.valueUpdationThrough = 'SDM'
    } else {
      this.valueUpdationThrough = 'NRQ'
    }
    // if(event.target.checked){
    //   alert()
    //   this.valueUpdationThrough = 'SDM'
    // }else{
    //   this.valueUpdationThrough = 'NRQ'
    // }
  }

  saveNonSalary() {
    this.masterForm.controls['unit'].setValue('HR')
    this.masterForm.controls['valueUpdationThrough'].setValue(this.valueUpdationThrough)
    this.masterForm.controls['createdBy'].setValue('rahul')
    this.masterForm.controls['isActive'].setValue(1)
    let data = [this.masterForm.value]
    this.nonrecqtyservice.nonsalary(data).subscribe(
      res => {
        this.toaster.success("", "Master Data Saved Successfully.")
        this.getMasterSummaryData()
        this.masterForm.reset()
        this.editFlag = false;
        this.viewFlag = false;
        this.nonSalaryOptionList = []
      }
    )
  }

  resetNonSalary(){
    this.masterForm.reset()
    this.editFlag = false;
    this.viewFlag = false;
    this.masterForm.enable()
    this.nonSalaryOptionList = []
  }

  editMasterData(data) {
    this.masterForm.patchValue(data)
    this.nonSalaryOptionList = data.nonSalaryOptionList
    this.masterForm.enable()
    this.editFlag = true;
    this.viewFlag = false;
  }

  updateNonSalary(){
    let data = [this.masterForm.value]
    this.nonrecqtyservice.updatenonsalary(data).subscribe(
      res => {
        this.toaster.success("", "Master Data Updated Successfully.")
        this.getMasterSummaryData()
        this.masterForm.reset()
        this.editFlag = false;
        this.viewFlag = false;
      }
    )
  }


  viewMasterData(data) {
    this.masterForm.patchValue(data)
    this.nonSalaryOptionList = data.nonSalaryOptionList
    this.masterForm.disable()
    this.editFlag = false;
    this.viewFlag = true;
  }
}