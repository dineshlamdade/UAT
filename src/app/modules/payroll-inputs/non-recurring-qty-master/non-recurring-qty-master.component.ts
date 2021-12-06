import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NonRecurringQtyService } from '../non-recurring-qty.service';
import { ExcelserviceService } from '../../../core/services/excelservice.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

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
  nonSalaryRate: any = 0;
  nonSalaryMultiplier: any = 0;
  valueUpdationThrough: string = 'NRQ';
  valueUpdateflag: boolean = true;
  editFlag: boolean = false;
  viewFlag: boolean = false;
  natureData: any[];
  getNatureValue: any;
  excelData: any[];

  constructor(private nonrecqtyservice: NonRecurringQtyService, private toaster: AlertServiceService,
    private excelservice: ExcelserviceService,) {
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

    this.natureData = [{
      id :'rate',
      name:'Rate'
    },
    {
      id :'multiplier',
      name:'Multiplier'
    }]
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

  getNatureData(value){
    this.getNatureValue = value
    this.natureData.forEach((ele,index) =>{
      if(ele.id == value){

      }else{
        let ind = index
        this.natureData.splice(index,1)
      }
    })
  }

  addNRQType() {
    this.nonSalaryOptionList.push(
      {
        "name": this.nonSalaryName,
        "nature": this.nonSalaryNature,
        "rate": this.nonSalaryRate,
        "multipier": this.nonSalaryMultiplier,
        "derivedRate": 0.0,
        "derivedmultipier": 0.0,
        "isActive": 1
      }
    )

    this.masterForm.controls['nonSalaryOptionList'].setValue(this.nonSalaryOptionList)

    this.nonSalaryName = ''
    // this.nonSalaryNature = ''
    this.nonSalaryRate = 0
    this.nonSalaryMultiplier = 0
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
    this.masterForm.removeControl('nonSalaryDetailId')
    this.masterForm.controls['unit'].setValue('HR')
    this.masterForm.controls['valueUpdationThrough'].setValue(this.valueUpdationThrough)
    this.masterForm.controls['createdBy'].setValue('rahul')
    this.masterForm.controls['isActive'].setValue(1)
    this.masterForm.controls['sdmName'].setValue('')
    let data = [this.masterForm.value]
    this.nonrecqtyservice.nonsalary(data).subscribe(
      res => {
        this.toaster.sweetalertMasterSuccess("", "Master Data Saved Successfully.")
        this.getMasterSummaryData()
        this.masterForm.reset()
        this.editFlag = false;
        this.viewFlag = false;
        this.nonSalaryOptionList = []
        this.resetNonSalary()
      }
    )
  }

  resetNonSalary(){
    this.masterForm.reset()
    this.editFlag = false;
    this.viewFlag = false;
    this.masterForm.enable()
    this.nonSalaryOptionList = []
    this.nonSalaryName = ''
    this.nonSalaryNature = ''
    this.nonSalaryRate = 0
    this.nonSalaryMultiplier = 0
    this.natureData = []
    this.natureData = [{
      id :'rate',
      name:'Rate'
    },
    {
      id :'multiplier',
      name:'Multiplier'
    }]
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
        this.toaster.sweetalertMasterSuccess("", "Master Data Updated Successfully.")
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

   /** Excel donload summary and Schedule page */

	SummaryexportAsXLSX(): void {
		this.excelData = [];
		this.summaryData.forEach(element => {
			let obj = {
				"Code": element.code,
				"Description": element.description,
				"E/D Head": element.descriptionHeadOfPayment,
				"Value Updation Through": element.valueUpdationThrough,
				"No. Of NRQ Types": element.nonSalaryOptionList.length,
			}
			this.excelData.push(obj)
		});
		this.excelservice.exportAsExcelFile1(this.excelData, 'Garnishment-Master');
	}
}
