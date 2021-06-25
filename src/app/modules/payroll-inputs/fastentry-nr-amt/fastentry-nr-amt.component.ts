import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { PayrollInputsService } from '../payroll-inputs.service';

@Component({
  selector: 'app-fastentry-nr-amt',
  templateUrl: './fastentry-nr-amt.component.html',
  styleUrls: ['./fastentry-nr-amt.component.scss']
})

export class FastentryNRAmtComponent implements OnInit {

  selectedPayrollArea: any = '';
  headData: any[];
  parollArea: any[];
  selectedOnceEvery:any = 1;
  selectedFrequency:any = 'Monthly';
  selectedTransactionType:any = 'NoOfTransaction';
  selectedNoOfTransaction:any = 1;
  headMasterId: any = null;
  tableData: any[];
  selectedClawBack:any;
  selectedAmount:any;
  selectedRemark:any;
  selectedFromDate: any = '';
  selectedToDate: any = '';
  setMinToDate: any;
  effectiveFromDate: any;
  effectiveToDate: any;
  headGroupDefinitionId: any;
  frequencyDataByPayroll: any;
  saveTransactionData: any = [];
  saveTransactionType: any = 'NoOfTransaction';
  saveNumberTransaction: any = 1;
  saveToDate: any = '';
  saveFromDate: any;
  saveClawback: any = '';
  saveAmount: any;
  saveRemark: any;
  headDescription: any;
  employeeData: any;
  employeeName: any;
  employeeMasterId: any;
  employeeCode: any;
  tempTableData: any = [];
  selectedEmployeeData: any = [];
  payrollEmployeeData: any;

  constructor(private datepipe: DatePipe,
     private nonRecService: NonRecurringAmtService,
     private payrollservice: PayrollInputsService,
     private toaster: ToastrService) { 
    this.headData = [
      { displayName: 'Incentive',headMasterId: 33},
      { displayName: 'Performance_Incentive',headMasterId: 49},
    ]

    this.parollArea = [
      { name: 'PA-Staff', code: 'RM' },
      { name: 'PA-Worker', code: 'NY' },
      { name: 'PA_Apprentic', code: 'LDN' },
      { name: 'PA_Expat', code: 'IST' },
    ];
  }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList(){
    this.payrollEmployeeData = []
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
			this.employeeData = res.data.results[0];
      for(let i=0; i <= 5; i++){
        this.payrollEmployeeData.push(this.employeeData[i])
      }
		});
  }


  /** Common selection Data  */
  onPayrollSelect(event){
    // event.name
    //this.selectedPayrollArea.push(event)
    this.selectedPayrollArea = event
    this.PayrollAreaByPayrollAreaCode(event)
  }

  PayrollAreaByPayrollAreaCode(payrollArea) {
		const formData = new FormData();

		formData.append('payrollArea', payrollArea)
		this.nonRecService.PayrollAreaByPayrollAreaCode(formData).subscribe(
			res => {
				this.effectiveFromDate = new Date(res.data.results[0].effectiveFromDate)
				this.effectiveToDate = new Date(res.data.results[0].effectiveToDate)
				this.headGroupDefinitionId = res.data.results[0].headGroupDefinitionResponse.headGroupDefinitionId
				//alert(this.effectiveFromDate)
				this.nonRecService.payrollAreaDetails(this.headGroupDefinitionId).subscribe(
					res => {
						this.frequencyDataByPayroll = res.data.results
					}
				)
			}
		)
	}

  getSelectedFrequency(frequency){
    this.selectedFrequency = frequency
  }

  getTransactionType(transactiontype){
     this.selectedTransactionType = transactiontype
     this.saveTransactionType = transactiontype
     if (this.selectedTransactionType == 'NoOfTransaction') {
      this.selectedToDate = ''
      this.saveToDate = ''
      this.selectedNoOfTransaction =1
      this.saveNumberTransaction = 1
    } else if (this.selectedTransactionType == 'Perpetual') {
      this.selectedToDate = '9999-12-31 00:00:00'
      this.saveToDate = '9999-12-31 00:00:00'
      this.selectedNoOfTransaction = null
      this.saveNumberTransaction = null
    }else{
      this.selectedNoOfTransaction = null
      this.saveNumberTransaction = null
    }
  }

  getSelectedHead(headid){
    this.headMasterId = headid
    this.headData.forEach(ele =>{
      if(ele.headMasterId == headid){
        this.headDescription = ele.displayName
      }
    })
  }

  getFromDate(fromdate){
    this.setMinToDate = fromdate
		this.selectedFromDate = fromdate
    this.saveFromDate = this.datepipe.transform(new Date(fromdate), 'yyyy-MM-dd') + ' 00:00:00'
  }

  getToDate(todate){
    this.selectedToDate = todate 
    this.saveToDate = this.datepipe.transform(new Date(todate), 'yyyy-MM-dd') + ' 00:00:00' 
  }

  getSelectedEmployee(empdata){
    console.log("emp data: "+ JSON.stringify(empdata))
    this.selectedEmployeeData.push(empdata)
  }

  /** Table data push */
  getAllSelectedData(){
    this.saveNumberTransaction = this.selectedNoOfTransaction
    this.saveAmount = this.selectedAmount
    this.saveRemark = this.selectedRemark
    this.tableData = []
    this.selectedEmployeeData.forEach(element => {
      this.tableData.push({
        'employeeMasterId':element.employeeMasterId,
        "employeeCode": element.employeeCode,
        "employeeName" : element.fullName,
        'payrollArea':this.selectedPayrollArea,
        'fromDate': this.selectedFromDate,
        'transactionsType':this.selectedTransactionType,
        'numberOfTransactions':this.selectedNoOfTransaction, 
        'toDate':this.selectedToDate,
        'clawBack':this.selectedClawBack,
        'amount':this.selectedAmount,
        'remark':this.selectedRemark
      })
    });
   
  }


  /*********** Data To Save *************/

  saveClawBack(value){
    this.saveClawback = value
  }

  saveAmounts(value){
    this.saveAmount = value
  }

  saveRemarks(value){
    this.saveRemark = value
  }

  getSaveFromDate(value){
    this.saveFromDate = this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00'
  }

  getSaveToDate(value){
    this.saveToDate = this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00'
  }

  getsaveNumberTransaction(value){
    this.saveNumberTransaction = value;
  }

  getsaveTransactionType(value){
    this.saveTransactionType = value
  }

  getSelectedSavePayroll(value){
    this.selectedPayrollArea = value
  }

  getEmployeeName(employeecode){
   this.employeeData.forEach(element => {
    // console.log(element.employeeCode)
     if(element.employeeCode == employeecode){
       this.employeeCode = element.employeeCode
       this.employeeName = element.fullName
       this.employeeMasterId = element.employeeMasterId
     }
   });
  }

  addDataToSave(data){
    
    this.tempTableData.push({
        "employeeMasterId": data.employeeMasterId,
        "employeeCode": data.employeeCode,
        "employeeName" : data.employeeName,
        "headMasterId": this.headMasterId,
        "standardName": this.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": this.selectedOnceEvery,
        "frequency": this.selectedFrequency,
        "fromDate": this.saveFromDate,
        "transactionsType": this.saveTransactionType,
        "numberOfTransactions": parseInt(this.saveNumberTransaction),
        "toDate": this.saveToDate,
        "amount": this.saveAmount,
        "remark": this.saveRemark,
        "createdBy": "rahul",
        "clawbackApplicableAt": this.saveClawback,
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": ""
    })


    this.saveTransactionData.push({
      "employeeMasterId": data.employeeMasterId,
      "headMasterId": this.headMasterId,
      "standardName": this.headDescription,
      "payrollAreaId": "1",
      "payrollAreaCode": this.selectedPayrollArea,
      "onceEvery": this.selectedOnceEvery,
      "frequency": this.selectedFrequency,
      "fromDate": this.saveFromDate,
      "transactionsType": this.saveTransactionType,
      "numberOfTransactions": parseInt(this.saveNumberTransaction),
      "toDate": this.saveToDate,
      "amount": this.saveAmount,
      "remark": this.saveRemark,
      "createdBy": "rahul",
      "clawbackApplicableAt": this.saveClawback,
      "clawbackInputType": "",
      "clawbackPeriod": 0,
      "clawbackUnit": "",
      "clawbackDate": ""
    })

   console.log(JSON.stringify(this.saveTransactionData))
   this.employeeName = ''
   this.employeeCode = ''
  }

  removeDataFromSave(index){
    this.saveTransactionData.splice(index,1)
    this.tempTableData.splice(index,1)
  }

  removeTempDataFromSave(index){
    this.saveTransactionData.splice(index,1)
    this.tempTableData.splice(index,1)
  }

  saveFastEntries(){
    // this.nonRecService.NonRecurringTransactionGroup(this.saveTransactionData).subscribe(
		// 	res => {
		// 		this.toaster.success("", "Transaction Saved Successfully")
				this.saveTransactionData = [];
        this.tempTableData = []
        this.tableData = []
		// 	}
		// )
  }

  saveAndClearFastEntries(){
    // this.nonRecService.NonRecurringTransactionGroup(this.saveTransactionData).subscribe(
		// 	res => {
		// 		this.toaster.success("", "Transaction Saved Successfully")
				this.saveTransactionData = [];
        this.tempTableData = [];
        this.selectedOnceEvery = 1;
        this.selectedFrequency = 'Monthly';
        this.selectedTransactionType = 'NoOfTransaction';
        this.selectedNoOfTransaction = 1;
        this.headMasterId = null
        this.tableData = [];
        this.selectedClawBack = ''
        this.selectedAmount = ''
        this.selectedRemark = ''
        this.selectedFromDate = ''
        this.selectedToDate = ''
        this.setMinToDate = ''
        this.effectiveFromDate = ''
        this.effectiveToDate = ''
        this.headGroupDefinitionId = ''
        this.frequencyDataByPayroll = ''
        this.saveTransactionType = ''
        this.saveNumberTransaction = 1;
        this.saveToDate = ''
        this.saveFromDate = ''
        this.saveClawback = ''
        this.saveAmount = ''
        this.saveRemark = ''
        this.headDescription = ''
        this.employeeData = ''
        this.employeeName = ''
        this.employeeMasterId = ''
        this.employeeCode = ''
        this.selectedPayrollArea = ''
		// 	}
		// )
  }

  reset(){
    this.saveTransactionData = [];
        this.tempTableData = [];
        this.selectedOnceEvery = 1;
        this.selectedFrequency = 'Monthly';
        this.selectedTransactionType = 'NoOfTransaction';
        this.selectedNoOfTransaction = 1;
        this.headMasterId = null
        this.tableData = [];
        this.selectedClawBack = ''
        this.selectedAmount = ''
        this.selectedRemark = ''
        this.selectedFromDate = ''
        this.selectedToDate = ''
        this.setMinToDate = ''
        this.effectiveFromDate = ''
        this.effectiveToDate = ''
        this.headGroupDefinitionId = ''
        this.frequencyDataByPayroll = ''
        this.saveTransactionType = ''
        this.saveNumberTransaction = 1;
        this.saveToDate = ''
        this.saveFromDate = ''
        this.saveClawback = ''
        this.saveAmount = ''
        this.saveRemark = ''
        this.headDescription = ''
        this.employeeData = ''
        this.employeeName = ''
        this.employeeMasterId = ''
        this.employeeCode = ''
        this.selectedPayrollArea = ''
  }

  resetTableData(){
    this.saveTransactionData = [];
    this.tempTableData = []
  }

}