import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  constructor(private nonrecqtyservice : NonRecurringQtyService) { 
     this.masterForm = new FormGroup({
      "nonSalaryDetailId": new FormControl(''),
      "code": new FormControl(''),
     "description": new FormControl(''),
     "unit": new FormControl('HR'),
     "headOfPayment": new FormControl(''),
     "descriptionHeadOfPayment": new FormControl(''),
     "valueUpdationThrough": new FormControl(''),
     "sdmName": new FormControl(''),
     "isActive": new FormControl(''),
     "createdBy": new FormControl(''),
     "nonSalaryOptionList": new FormControl([])
     })
  }

  ngOnInit(): void {
    this.users1 = [
      { head: '1', nature: 'Earning'},
    ];
    this.getMasterSummaryData()
  }

  getMasterSummaryData(){
    this.nonrecqtyservice.NonRecurringnonsalary().subscribe(res =>{
      this.summaryData = res.data.results
    })
  }

  addNRQType(){
    this.nonSalaryOptionList.push(
      {
        "name": this.nonSalaryName,
        "nature": this.nonSalaryNature,
        "rate":0.0,
        "multipier":0.0,
        "derivedRate": this.nonSalaryRate,
        "derivedmultipier":this.nonSalaryMultiplier,
        "isActive":1
      }
    )

    this.masterForm.controls['nonSalaryOptionList'].setValue(this.nonSalaryOptionList)
  }

  saveNonSalary(){
    console.log("Form Data: "+ JSON.stringify(this.masterForm.value))
  }
}