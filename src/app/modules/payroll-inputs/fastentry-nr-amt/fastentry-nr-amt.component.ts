import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GarnishmentService } from '../garnishment-master/garnishment.service';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { PayrollInputsService } from '../payroll-inputs.service';

@Component({
  selector: 'app-fastentry-nr-amt',
  templateUrl: './fastentry-nr-amt.component.html',
  styleUrls: ['./fastentry-nr-amt.component.scss']
})

export class FastentryNRAmtComponent implements OnInit {

  public modalRef: BsModalRef;
  selectedPayrollArea: any = '';
  headData: any[];
  parollArea: any[];
  selectedOnceEvery: any = 1;
  selectedFrequency: any = 'Monthly';
  selectedTransactionType: any = 'NoOfTransaction';
  selectedNoOfTransaction: any = 1;
  headMasterId: any = null;
  tableData: any[];
  selectedClawBack: any;
  selectedAmount: any;
  selectedRemark: any;
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
  payrollEmployeeData: any = [];
  selectedTransactionIndex: any;
  clawbackFrequency: any;
  clawbackperiod: number;
  selectedClawbackInputType: any;
  clawbackDate: string;
  selectedApplicableAt: any;
  selectedTransactionClawback: any;
  selectedClawbackRowIndex: any;
  nonRecurringTransactionGroupDeviationList: any = [];
  deviationModeData: any[];
  repeatModeData: any[];
  deviationData: any[];
  deviationcount: number;
  repeatcount: number;
  selectedDevData: any;
  repeatRemarkText: any;
  selectedDeviationdata: any;
  devationRemarkText: any;
  deductionHeadList: any;
  selectedPayrollAreaId: any;
  saveDisabledBtn: boolean = true;
  showOnlyGroup: boolean = true;

  constructor(private datepipe: DatePipe,
    private nonRecService: NonRecurringAmtService,
    private payrollservice: PayrollInputsService,
    private modalService: BsModalService,
    private garnishmentService: GarnishmentService,
    private toaster: AlertServiceService) {
    // this.headData = [
    //   { displayName: 'Incentive', headMasterId: 27 },
    //   { displayName: 'Performance_Incentive', headMasterId: 29 },
    // ]

    
    this.headData = []
    const formdata = new FormData();
    formdata.append('categoryName', 'Non-Recurring-Amount');
    this.garnishmentService.payrollheadmaster(formdata).subscribe(res =>{
      res.data.results.forEach(element => {
        this.headData.push({
          'headMasterId':element.headMasterId,
          'displayName': element.displayName
        })
      });
    })

    if (localStorage.getItem('payrollListEmpData') != null) {
			this.payrollEmployeeData = JSON.parse(localStorage.getItem('payrollListEmpData'))
      this.selectedEmployeeData = this.payrollEmployeeData
			this.selectedPayrollArea = 'PA-Staff'
			// this.PayrollAreaByPayrollAreaCode(this.selectedPayrollArea)
		
		}

    // this.parollArea = [
    //   { name: 'PA-Staff', code: '1' },
    //   { name: 'PA-Worker', code: '2' },
    //   { name: 'PA_Apprentic', code: '3' },
    //   { name: 'PA_Expat', code: '4' },
    // ];
  }

  ngOnInit(): void {
    this.getEmployeeList()
    this.getPayrollAreaList()
  }

  getEmployeeList() {
    this.parollArea = []
    this.payrollservice.getPayrollList().subscribe((res) => {
      this.parollArea = res.data.results;
    });
  }

  getPayrollAreaList(){
    this.payrollEmployeeData = []
    this.payrollservice.getEmployeeList().subscribe((res) => {
      this.employeeData = res.data.results[0];
    });
  }


  /** Common selection Data  */
  onPayrollSelect(event) {
    // event.name
    //this.selectedPayrollArea.push(event)
    this.selectedPayrollArea = event
    
    this.parollArea.forEach(ele =>{
      if(ele.name == event){
        this.selectedPayrollAreaId = ele.payrollAreaId
        this.PayrollAreaByPayrollAreaCode(event)
      }
    })
    console.log("this.selectedPayrollAreaId: "+ this.selectedPayrollAreaId)
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
        // this.nonRecService.payrollAreaDetails(this.headGroupDefinitionId).subscribe(
        //   res => {
        //     this.frequencyDataByPayroll = res.data.results
        //   }
        // )
      }
    )
    // this.payrollEmployeeData = []
    // this.payrollservice.getPayrollWiseEmployeeList(this.selectedPayrollAreaId).subscribe(
    //   res => {
    //     this.payrollEmployeeData = res.data.results[0]
    //   }
    // )
  }

  getSelectedFrequency(frequency) {
    this.selectedFrequency = frequency
  }

  getSelectedOnceEvery(value){
    if(parseInt(value) == 1 && this.selectedTransactionType == 'NoOfTransaction'){
      this.showOnlyGroup = true
    }else{
      this.showOnlyGroup = false
    }
  }

  getTransactionType(transactiontype) {
    this.selectedTransactionType = transactiontype
    this.saveTransactionType = transactiontype
    if (this.selectedTransactionType == 'NoOfTransaction') {
      this.selectedToDate = ''
      this.saveToDate = ''
      this.selectedNoOfTransaction = 1
      this.saveNumberTransaction = 1
      this.showOnlyGroup = false
      if(parseInt(this.selectedOnceEvery) == 1){
        this.showOnlyGroup = true
      }
    } else if (this.selectedTransactionType == 'Perpetual') {
      this.selectedToDate = '9999-12-31 00:00:00'
      this.saveToDate = '9999-12-31 00:00:00'
      this.selectedNoOfTransaction = null
      this.saveNumberTransaction = null
      this.showOnlyGroup = false
    } else {
      this.selectedToDate = ''
      this.saveToDate = ''
      this.selectedNoOfTransaction = null
      this.saveNumberTransaction = null
      // if(){

      // }
    }


  }

  getSelectedHead(headid) {
    this.headMasterId = headid
    this.headData.forEach(ele => {
      if (ele.headMasterId == headid) {
        this.headDescription = ele.displayName
      }
    })
  }

  getFromDate(fromdate) {
    this.setMinToDate = fromdate
    this.selectedFromDate = fromdate
    this.saveFromDate = this.datepipe.transform(new Date(fromdate), 'yyyy-MM-dd') + ' 00:00:00'
  }

  getToDate(todate) {
    this.selectedToDate = todate
    this.saveToDate = this.datepipe.transform(new Date(todate), 'yyyy-MM-dd') + ' 00:00:00'
  }

  getSelectedEmployee(empdata,event) {
    console.log("emp data: " + JSON.stringify(empdata))
    if(event.checked){
      this.selectedEmployeeData.push(empdata)
    }else{
      this.selectedEmployeeData.forEach((element,index) => {
        if(element.employeeMasterId == empdata.employeeMasterId){
          let ind = index;
          this.selectedEmployeeData.splice(ind,1)
        }
      });
    }
  }

  /** Table data push */
  getAllSelectedData() {
    this.saveNumberTransaction = this.selectedNoOfTransaction
    this.saveAmount = this.selectedAmount
    this.saveRemark = this.selectedRemark
    this.tableData = []
    this.saveDisabledBtn = false
    this.selectedEmployeeData.forEach(element => {
      this.tableData.push({
        'employeeMasterId': element.employeeMasterId,
        "employeeCode": element.employeeCode,
        "employeeName": element.fullName,
        'payrollArea': element.payrollAreaId,
        'fromDate': this.selectedFromDate,
        'transactionsType': this.selectedTransactionType,
        'numberOfTransactions': this.selectedNoOfTransaction,
        'toDate': this.selectedToDate,
        'clawBack': this.selectedClawBack,
        'amount': this.selectedAmount,
        'remark': this.selectedRemark
      })
    });
    this.selectedEmployeeData.forEach(element => {
      this.saveTransactionData.push({
        "employeeMasterId": element.employeeMasterId,
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
        "clawbackDate": "",
        "executeSDM": element.executeSDM,
				"refferedEmpId": element.refferedEmpId,
				"refferedpayrollAreaCode": element.refferedpayrollAreaCode,
				"approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    })

    this.tableData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' || element.employeeMasterId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })

  }


  /*********** Data To Save *************/

  saveClawBack(value) {
    this.saveClawback = value
  }

  saveAmounts(value, data) {
    this.saveDisabledBtn = false
    this.saveAmount = value
    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
    } else {
      todate = this.saveToDate;
    }

    if(data.executeSDM != 'YES' || data.executeSDM != 'Yes' || data.executeSDM != 'yes')
		{
			if(this.selectedFromDate != ''){
				let inputdata = {
					"employeeMasterId":data.employeeMasterId,
					"headMasterId": data.headId,
					"payrollAreaId":"1",
					"amount": value,
					"fromDate": this.datepipe.transform(new Date(this.selectedFromDate), 'yyyy-mm-dd')
				}
					
				this.deviationModeData = []
					this.repeatModeData = []
					this.deviationData = []
					this.nonRecService.NonRecurringTransactionGrouprangeValidation(inputdata).subscribe(res =>{
						// this.deviationData = res 
						let resp : any = res;
							resp.forEach(element => {
								if(element.status != 'No Deviation'){
									this.deviationData.push(element)
								}
							});
						data.deviationCount = this.deviationData.length
						this.deviationData.forEach(element => {
							if(element.mode == 'Deviation'){
								this.deviationModeData.push(element)
								this.deviationcount = this.deviationModeData.length
							}else if(element.mode == 'Repeat'){
								this.repeatModeData.push(element)
								this.repeatcount = this.repeatModeData.length
							}
						});
					})
			}	
		}

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.headMasterId == data.headId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": todate,
            "amount": parseInt(value),
            "remark": element.remark,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "amount": parseInt(value),
              "remark": data.remark,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": "",
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": parseInt(value),
        "remark": data.remark,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": "",
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })
  }

  saveRemarks(value, data) {
    this.saveDisabledBtn = false
    this.saveRemark = value
    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
    } else {
      todate = this.saveToDate;
    }

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.headMasterId == data.headId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": todate,
            "amount": element.amount,
            "remark": value,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "amount": data.openingAmount,
              "remark": value,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": "",
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": data.openingAmount,
        "remark": value,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": "",
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
      }
    })
  }

  getSaveFromDate(value, data) {
    this.saveDisabledBtn = false
    this.setMinToDate = value;
    data.openingAmount = ''
    this.saveFromDate = this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00'
    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
    } else {
      todate = this.saveFromDate;
    }

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": this.saveFromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": element.toDate,
            "amount": element.amount,
            "remark": element.remark,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": this.saveFromDate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "amount": data.openingAmount,
              "remark": data.remark,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": '',
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": this.saveFromDate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": data.openingAmount,
        "remark": data.remark,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": '',
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }


    console.log("element.fromDate: "+ JSON.stringify(this.saveTransactionData) )

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })
  }

  getSaveToDate(value, data) {
    this.saveDisabledBtn = false
    this.saveToDate = this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00'
    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
    } else {
      todate = this.saveToDate;
    }

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": todate,
            "amount": element.amount,
            "remark": element.remark,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "amount": data.openingAmount,
              "remark": data.remark,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": '',
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": data.openingAmount,
        "remark": data.remark,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": '',
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })
  }

  getsaveNumberTransaction(value, data) {
    this.saveDisabledBtn = false
    this.saveNumberTransaction = value;
    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
    } else {
      todate = this.saveToDate;
    }

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": element.transactionsType,
            "numberOfTransactions": parseInt(value),
            "toDate": todate,
            "amount": element.amount,
            "remark": element.remark,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": parseInt(value),
              "toDate": todate,
              "amount": data.openingAmount,
              "remark": data.remark,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": "",
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": data.openingAmount,
        "remark": data.remark,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": "",
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })
  }

  getsaveTransactionType(value, rowindex, data) {
    this.saveDisabledBtn = false
    //this.saveTransactionType = value
    this.selectedTransactionIndex = rowindex;
    this.selectedTransactionType = value
    if (this.selectedTransactionType == 'Perpetual' || this.selectedTransactionType == 'Defined Date') {
      this.tableData[rowindex].numberOfTransactions = null
    }
    this.tableData.forEach((element, index) => {
      if (index == rowindex) {
        element.transactionsType = value
      }
    });


    if(data.onceEvery == 1 && data.transactionsType == 'NoOfTransaction'){
			this.showOnlyGroup = true;
		}
		if(data.fromDate != null){
			if(data.transactionsType == 'Defined Date' && (this.datepipe.transform(data.fromDate, 'yyyy-MM-dd') === this.datepipe.transform(data.toDate, 'yyyy-MM-dd'))){
				this.showOnlyGroup = true;
			}
		}

    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
      this.saveNumberTransaction = null
    } else {
      todate = this.saveToDate;
      this.saveNumberTransaction = null
    }

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": todate,
            "amount": element.amount,
            "remark": element.remark,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "amount": data.openingAmount,
              "remark": data.remark,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": '',
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": data.openingAmount,
        "remark": data.remark,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": '',
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })
  }

  getSelectedSavePayroll(value, data) {
    this.saveDisabledBtn = false
    this.selectedPayrollArea = value
    let todate = "";
    if (this.selectedTransactionType == 'NoOfTransaction') {
      todate = ""
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31 00:00:00'
    } else {
      todate = this.saveToDate;
    }

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "headMasterId": element.headMasterId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": element.transactionsType,
            "numberOfTransactions": parseInt(value),
            "toDate": todate,
            "amount": element.amount,
            "remark": element.remark,
            "createdBy": "rahul",
            "clawbackApplicableAt": element.clawbackApplicableAt,
            "clawbackInputType": element.clawbackInputType,
            "clawbackPeriod": element.clawbackPeriod,
            "clawbackUnit": element.clawbackUnit,
            "clawbackDate": element.clawbackDate,
            "executeSDM": element.executeSDM,
            "refferedEmpId": element.refferedEmpId,
            "refferedpayrollAreaCode": element.refferedpayrollAreaCode,
            "approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":[]
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "headMasterId": data.headId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": parseInt(value),
              "toDate": todate,
              "amount": data.openingAmount,
              "remark": data.remark,
              "createdBy": "rahul",
              "clawbackApplicableAt": "",
              "clawbackInputType": "",
              "clawbackPeriod": 0,
              "clawbackUnit": "",
              "clawbackDate": "",
              "executeSDM": data.executeSDM,
              "refferedEmpId": 0,
              "refferedpayrollAreaCode": "",
              "approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "headMasterId": data.headId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "amount": data.openingAmount,
        "remark": data.remark,
        "createdBy": "rahul",
        "clawbackApplicableAt": "",
        "clawbackInputType": "",
        "clawbackPeriod": 0,
        "clawbackUnit": "",
        "clawbackDate": "",
        "executeSDM": data.executeSDM,
        "refferedEmpId": 0,
        "refferedpayrollAreaCode": "",
        "approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
      })
    }

    this.saveTransactionData.forEach(element =>{
      if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.amount == '' ){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


    })
  }

   /** edit deviation popup */
	editdeviationPopupOpen(editdeviationPopup: TemplateRef<any>, data, rowindex){
		if(data.deviationCount > 0){
			this.modalRef = this.modalService.show(
				editdeviationPopup,
				Object.assign({}, {
					class: 'gray modal-xl'
				})
			);
			this.selectedDevData = data;
		}
	}

  /** save deviation remark data */
	deviationRemark(remark, deviationdata){
    this.devationRemarkText = remark;
    this.selectedDeviationdata = deviationdata
  }

  /**save repeat remark data */
	repeatRemark(remark,remarkdata){
		this.repeatRemarkText = remark;
		this.selectedDeviationdata = remarkdata
	}

  updateDeviationRepeatData(selectedDevData){
		let remark = ''
		if(this.selectedDeviationdata.mode == 'Deviation'){
			remark = this.devationRemarkText
		}else{
			remark = this.repeatRemarkText
		}

		let obj = {
			"deviationAmount":this.selectedDeviationdata.deviationAmount,
			"mode": this.selectedDeviationdata.mode,
			"deviationType": this.selectedDeviationdata.deviationType,
			"deviationRemark":remark,
			"deviationStatus":this.selectedDeviationdata.status,
			"deviationAmountLimit":this.selectedDeviationdata.deviationAmountLimit
		}
		this.nonRecurringTransactionGroupDeviationList.push(obj)
	}

  /** Get Applcable At selected Value */
	getSelectedApplicable(value, data) {
		this.selectedApplicableAt = value
		this.selectedClawbackInputType = ""
		this.clawbackperiod = 0;
		this.clawbackDate = "";
		this.clawbackFrequency = ""
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.saveToDate;
		}
		
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": data.employeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": element.amount,
						"remark": element.remark,
						"createdBy": "rahul",
						"clawbackApplicableAt": value,
						"clawbackInputType": element.clawbackInputType,
						"clawbackPeriod": element.clawbackPeriod,
						"clawbackUnit": element.clawbackUnit,
						"clawbackDate": element.clawbackDate,
						"executeSDM": element.executeSDM,
						"refferedEmpId": element.refferedEmpId,
						"refferedpayrollAreaCode": element.refferedpayrollAreaCode,
						"approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":element.nonRecurringTransactionGroupDeviationList
					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": data.employeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": data.openingAmount,
							"remark": data.remark,
							"createdBy": "rahul",
							"clawbackApplicableAt": value,
							"clawbackInputType": "",
							"clawbackPeriod": 0,
							"clawbackUnit": "",
							"clawbackDate": "",
							"executeSDM": data.executeSDM,
							"refferedEmpId": 0,
							"refferedpayrollAreaCode": "",
							"approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": data.employeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": data.openingAmount,
				"remark": data.remark,
				"createdBy": "rahul",
				"clawbackApplicableAt": value,
				"clawbackInputType": "",
				"clawbackPeriod": 0,
				"clawbackUnit": "",
				"clawbackDate": "",
				"executeSDM": data.executeSDM,
				"refferedEmpId": 0,
				"refferedpayrollAreaCode": "",
				"approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
			})
		}
		console.log("Applicable at: " + JSON.stringify(this.saveTransactionData))
	}

	/** Get Input Type selected Value */
	getSelectedInputType(value, data) {
		this.selectedClawbackInputType = value
		this.clawbackperiod = 0;
		this.clawbackDate = "";
		this.clawbackFrequency = ""
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.saveToDate;
		}
		
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": data.employeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": element.amount,
						"remark": element.remark,
						"createdBy": "rahul",
						"clawbackApplicableAt": element.clawbackApplicableAt,
						"clawbackInputType": value,
						"clawbackPeriod": element.clawbackPeriod,
						"clawbackUnit": element.clawbackUnit,
						"clawbackDate": this.clawbackDate,
						"executeSDM": element.executeSDM,
						"refferedEmpId": element.refferedEmpId,
						"refferedpayrollAreaCode": element.refferedpayrollAreaCode,
						"approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":element.nonRecurringTransactionGroupDeviationList
					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": data.employeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": data.openingAmount,
							"remark": data.remark,
							"createdBy": "rahul",
							"clawbackApplicableAt": "",
							"clawbackInputType": value,
							"clawbackPeriod": 0,
							"clawbackUnit": "",
							"clawbackDate": "",
							"executeSDM": data.executeSDM,
							"refferedEmpId": 0,
							"refferedpayrollAreaCode": "",
							"approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": data.employeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": data.openingAmount,
				"remark": data.remark,
				"createdBy": "rahul",
				"clawbackApplicableAt": "",
				"clawbackInputType": value,
				"clawbackPeriod": 0,
				"clawbackUnit": "",
				"clawbackDate": "",
				"executeSDM": data.executeSDM,
				"refferedEmpId": 0,
				"refferedpayrollAreaCode": "",
				"approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
			})
		}
		console.log("input type: " + JSON.stringify(this.saveTransactionData))
	}

  /** Clawback Popup Show */
	ViewClawbackpopup(template4: TemplateRef<any>, data, rowindex) {
		this.modalRef = this.modalService.show(
			template4,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
		this.selectedTransactionClawback = data;
		this.selectedClawbackRowIndex = rowindex;
	}

	/**get clawback period */
	crawBackPeriod(value, data) {
		this.clawbackperiod = parseInt(value)
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.saveToDate;
		}
		
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": data.employeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": element.amount,
						"remark": element.remark,
						"createdBy": "rahul",
						"clawbackApplicableAt": element.clawbackApplicableAt,
						"clawbackInputType": element.clawbackInputType,
						"clawbackPeriod": parseInt(value),
						"clawbackUnit": element.clawbackUnit,
						"clawbackDate": element.clawbackDate,
						"executeSDM": element.executeSDM,
						"refferedEmpId": element.refferedEmpId,
						"refferedpayrollAreaCode": element.refferedpayrollAreaCode,
						"approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":element.nonRecurringTransactionGroupDeviationList
					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": data.employeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": data.openingAmount,
							"remark": data.remark,
							"createdBy": "rahul",
							"clawbackApplicableAt": "",
							"clawbackInputType": "",
							"clawbackPeriod": parseInt(value),
							"clawbackUnit": "",
							"clawbackDate": "",
							"executeSDM": data.executeSDM,
							"refferedEmpId": 0,
							"refferedpayrollAreaCode": "",
							"approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": data.employeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": data.openingAmount,
				"remark": data.remark,
				"clawbackApplicableAt": "",
				"clawbackInputType": "",
				"clawbackPeriod": parseInt(value),
				"clawbackUnit": "",
				"clawbackDate": "",
				"executeSDM": data.executeSDM,
				"refferedEmpId": 0,
				"refferedpayrollAreaCode": "",
				"approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
			})
		}
		console.log("clawback period: " + JSON.stringify(this.saveTransactionData))
	}

	/**Get Clawback Frequency selected value */
	getClawbackFrequency(value, data) {
		this.clawbackFrequency = value
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.saveToDate;
		}
		
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": data.employeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": element.amount,
						"remark": element.remark,
						"createdBy": "rahul",
						"clawbackApplicableAt": element.clawbackApplicableAt,
						"clawbackInputType": element.clawbackInputType,
						"clawbackPeriod": element.clawbackPeriod,
						"clawbackUnit": value,
						"clawbackDate": element.clawbackDate,
						"executeSDM": element.executeSDM,
						"refferedEmpId": element.refferedEmpId,
						"refferedpayrollAreaCode": element.refferedpayrollAreaCode,
						"approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":element.nonRecurringTransactionGroupDeviationList
					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": data.employeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": data.openingAmount,
							"remark": data.remark,
							"createdBy": "rahul",
							"clawbackApplicableAt": "",
							"clawbackInputType": "",
							"clawbackPeriod": 0,
							"clawbackUnit": value,
							"clawbackDate": "",
							"executeSDM": data.executeSDM,
							"refferedEmpId": 0,
							"refferedpayrollAreaCode": "",
							"approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": data.employeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": data.openingAmount,
				"remark": data.remark,
				"createdBy": "rahul",
				"clawbackApplicableAt": "",
				"clawbackInputType": "",
				"clawbackPeriod": 0,
				"clawbackUnit": value,
				"clawbackDate": "",
				"executeSDM": data.executeSDM,
				"refferedEmpId": 0,
				"refferedpayrollAreaCode": "",
				"approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
			})
		}
		console.log("clawback frequency: " + JSON.stringify(this.saveTransactionData))

	}

	/**Get clawback date */
	getClawbackDate(value, data) {
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.saveToDate;
		}
		
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": element.employeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": element.amount,
						"remark": element.remark,
						"createdBy": "rahul",
						"clawbackApplicableAt": element.clawbackApplicableAt,
						"clawbackInputType": element.clawbackInputType,
						"clawbackPeriod": element.clawbackPeriod,
						"clawbackUnit": element.clawbackUnit,
						"clawbackDate": this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00',
						"executeSDM": element.executeSDM,
						"refferedEmpId": element.refferedEmpId,
						"refferedpayrollAreaCode": element.refferedpayrollAreaCode,
						"approveStatus": "Pending",
            "nonRecurringTransactionGroupDeviationList":element.nonRecurringTransactionGroupDeviationList
					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].headMasterId == data.headId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": data.employeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": data.openingAmount,
							"remark": data.remark,
							"createdBy": "rahul",
							"clawbackApplicableAt": "",
							"clawbackInputType": "",
							"clawbackPeriod": 0,
							"clawbackUnit": "",
							"clawbackDate": this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00',
							"executeSDM": data.executeSDM,
							"refferedEmpId": 0,
							"refferedpayrollAreaCode": "",
							"approveStatus": "Pending",
              "nonRecurringTransactionGroupDeviationList":[]
						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": data.employeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": data.openingAmount,
				"remark": data.remark,
				"createdBy": "rahul",
				"clawbackApplicableAt": "",
				"clawbackInputType": "",
				"clawbackPeriod": 0,
				"clawbackUnit": "",
				"clawbackDate": this.datepipe.transform(new Date(value), 'yyyy-MM-dd') + ' 00:00:00',
				"executeSDM": data.executeSDM,
				"refferedEmpId": 0,
				"refferedpayrollAreaCode": "",
				"approveStatus": "Pending",
        "nonRecurringTransactionGroupDeviationList":[]
			})
		}
	}

  getEmployeeName(employeecode) {
    this.employeeData.forEach(element => {
      // console.log(element.employeeCode)
      if (element.employeeCode == employeecode) {
        this.employeeCode = element.employeeCode
        this.employeeName = element.fullName
        this.employeeMasterId = element.employeeMasterId
      }
    });
  }

  addDataToSave(data) {

    this.tempTableData.push({
      "employeeMasterId": data.employeeMasterId,
      "employeeCode": data.employeeCode,
      "employeeName": data.employeeName,
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


    // this.saveTransactionData.push({
    //   "employeeMasterId": data.employeeMasterId,
    //   "headMasterId": this.headMasterId,
    //   "standardName": this.headDescription,
    //   "payrollAreaId": "1",
    //   "payrollAreaCode": this.selectedPayrollArea,
    //   "onceEvery": this.selectedOnceEvery,
    //   "frequency": this.selectedFrequency,
    //   "fromDate": this.saveFromDate,
    //   "transactionsType": this.saveTransactionType,
    //   "numberOfTransactions": parseInt(this.saveNumberTransaction),
    //   "toDate": this.saveToDate,
    //   "amount": this.saveAmount,
    //   "remark": this.saveRemark,
    //   "createdBy": "rahul",
    //   "clawbackApplicableAt": this.saveClawback,
    //   "clawbackInputType": "",
    //   "clawbackPeriod": 0,
    //   "clawbackUnit": "",
    //   "clawbackDate": ""
    // })

    console.log(JSON.stringify(this.saveTransactionData))
    this.employeeName = ''
    this.employeeCode = ''
  }

  removeDataFromSave(index) {
    this.saveTransactionData.splice(index, 1)
    this.tableData.splice(index,1)
    this.tempTableData.splice(index, 1)
  }

  removeTempDataFromSave(index) {
    this.saveTransactionData.splice(index, 1)
    this.tempTableData.splice(index, 1)
  }

  saveFastEntries() {
    console.log("this.saveTransactionData: " + JSON.stringify(this.saveTransactionData))
    this.nonRecService.NonRecurringTransactionGroup(this.saveTransactionData).subscribe(
      res => {
        this.toaster.sweetalertMasterSuccess("", "Transaction Saved Successfully")
        this.saveTransactionData = [];
        this.tempTableData = []
        this.tableData = []
      }
    )
  }

  saveAndClearFastEntries() {
    this.nonRecService.NonRecurringTransactionGroup(this.saveTransactionData).subscribe(
      res => {
        this.toaster.sweetalertMasterSuccess("", "Transaction Saved Successfully")
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
    )
  }

  reset() {
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

  resetTableData() {
    this.saveTransactionData = [];
    this.tempTableData = []
    this.tableData = []
  }

}