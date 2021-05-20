import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PayrollInputsService } from '../payroll-inputs.service';

@Component({
	selector: 'app-non-recurring-amt',
	templateUrl: './non-recurring-amt.component.html',
	styleUrls: ['./non-recurring-amt.component.scss'],

})

export class NonRecurringAmtComponent implements OnInit {

	public modalRef: BsModalRef;
	frozenCols: any[];
	scrollableCols: any[];
	attendanceData: any;

	NonRecurringTransactionData: any;
	NonRecurringTransactionGroupUIData: any;
	NonRecurringTransactionGroupAPIEmpwiseData: any;
	NonRecurringTransactionGroupAPIbyIdData: any;
	NonRecurringTransactionScheduleEMPdData: any;
	NonRecurringTransactionScheduleupdateByIdData: any;
	NonRecurringHistorybyScheduleIdData: any;
	NonRecurringHeadwiseHistorydData: any;
	summeryData: any;
	empData: any;
	selectedEmpData: any = [];
	selectedAllFlag: boolean = false;
	nonRecurringTransactionScheduleId: any = '';
	nonRecurringTransactionGroupId: any;
	viewEmployeeData: any;
	viewHeadHistory: any;
	employeeMasterId: any;
	headMasterId: any;
	indexId = 1;
	employeeFinDetailsData: any;
	index: number = 0;
	showEmployeeSelectionFlag: boolean = false;
	selectedTransactionIndex: any;
	selectedTransactionType: any;
	selectedFromDate: string;
	selectedToDate: string;
	onceEvery: string = '';
	numberOfTransactions: string = '';
	openingAmount: string = '';
	remark: any = '';
	standardName: any;
	selectedPayrollArea: any = '';
	editScheduleFlag: boolean = false;
	selectedEmployeeMasterId: any = '';
	employeeData: any;
	saveTransactionData: any = [];
	selectedFromDateForSave: string;
	selectedToDateForSave: string;
	updateScheduleData: any = [];
	viewScheduleData: any;

	selectedApplicableAt: any = '';
	clawbackFrequency: any = '';
	selectedClawbackInputType: any = '';
	selecteddiscardIndex: any;
	selectedHoldIndex: any;
	hold: any;
	discard: any;
	updateNoOfTransaction: any;

	constructor(private modalService: BsModalService, private nonRecService: NonRecurringAmtService,
		private toaster: ToastrService, private datepipe: DatePipe,
		private payrollservice: PayrollInputsService) { }

	ngOnInit() {
		this.NonRecurringTransactionGroupSummery();
	}

	/** Summary Get all data  */
	NonRecurringTransactionGroupSummery() {
		this.nonRecService.NonRecurringTransactionGroupSummery().subscribe(
			res => {
				this.summeryData = res.data.results;
				this.empData = this.summeryData.employeeMasterResponseDTO;
			}
		)
	}

	/** On Click tab - summary */
	navigateSummary() {
		this.indexId = 1;
		this.selectedEmpData = []
		this.NonRecurringTransactionGroupSummery()
	}

	/** When clicked on checkedbox summary page*/
	isSelected(event, summeryData) {
		if (event.checked) {
			this.selectedEmpData.push(summeryData)
		} else {
			if (this.selectedEmpData.length > 0) {
				this.selectedEmpData.forEach((element, index) => {
					if (element.employeeMasterId == summeryData.employeeMasterId) {
						let ind = index;
						this.selectedEmpData.splice(ind, 1);
					}
				});
			} else {
				this.selectedEmpData = []
			}
		}
		// console.log("selectedEmpData:", JSON.stringify(this.selectedEmpData))
	}

	/** Select all checked box from summary page */
	selectAll(event) {
		this.selectedEmpData = [];
		if (event.checked) {
			this.selectedAllFlag = true;
			this.summeryData.forEach(element => {
				this.selectedEmpData.push(element)
			});
		} else {
			this.selectedAllFlag = false;
			this.selectedEmpData = []
		}
		console.log("selectedALLLLLLEmpData:", this.selectedEmpData)
	}

	/**  Popup summary - Schedule details */
	NonRecurringTransactionScheduleEMP() {

		const formData = new FormData();
		formData.append('nonRecurringTransactionGroupId', this.nonRecurringTransactionGroupId)

		this.nonRecService.NonRecurringTransactionScheduleEMP(formData).subscribe(
			res => {
				this.NonRecurringTransactionScheduleEMPdData = res.data.results;
			}
		)
	}

	/** Popup History - On Click Header */
	NonRecurringTransactionGroupHeadwiseHistory() {

		const formData = new FormData();
		formData.append('employeeMasterId', this.employeeMasterId)
		formData.append('headMasterId', this.headMasterId)
		formData.append('nonRecurringTransactionGroupId', this.nonRecurringTransactionGroupId)

		this.nonRecService.NonRecurringTransactionGroupHeadwiseHistory(formData).subscribe(
			res => {
				this.NonRecurringHeadwiseHistorydData = res.data.results;
			}
		)
	}

	/** View Header History */
	ViewHeaderHistory(template: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
		this.viewHeadHistory = Summarydata
		this.employeeMasterId = Summarydata.employeeMasterId
		this.headMasterId = Summarydata.payrollHeadMaster.headMasterId
		this.nonRecurringTransactionGroupId = Summarydata.nonRecurringTransactionGroupId
		this.NonRecurringTransactionGroupHeadwiseHistory()
	}

	/** Open Popup for View Transaction History */
	ViewTransactionHistory(template1: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template1,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);

		this.viewHeadHistory = Summarydata
		this.employeeMasterId = Summarydata.employeeMasterId
		this.headMasterId = Summarydata.payrollHeadMaster.headMasterId
		this.nonRecurringTransactionGroupId = Summarydata.nonRecurringTransactionGroupId
		this.NonRecurringTransactionGroupHeadwiseHistory()
	}

	/** Open Popup for View Schedule Details */
	ViewScheduleDetail(template2: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template2,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);

		this.nonRecurringTransactionGroupId = Summarydata.nonRecurringTransactionGroupId
		this.viewEmployeeData = Summarydata
		this.NonRecurringTransactionScheduleEMP()

	}

	/******************* Transaction when click on Edit Transaction *******************/

	/** On Click edit Transaction button - summary */
	editTransaction() {
		if (this.selectedEmpData.length > 0) {
			this.indexId = 2
			this.index = 0;
			this.showEmployeeSelectionFlag = false;
			this.selectedTransactionIndex = 0;
			this.employeeFinDetails()
			this.NonRecurringTransactionGroupAPIbyId(this.index)
		} else {
			this.toaster.warning("", "Please select atleast one employee")
		}
	}

	/** Display employee info by employeeMasterId */
	employeeFinDetails() {
		// this.attendanceService.employeeFinDetails(this.selectedEmpData[this.index].employeeMasterId).subscribe(
		this.nonRecService.employeeFinDetails(44).subscribe(
			res => {
				this.employeeFinDetailsData = res.data.results[0][0];
				// console.log("employeeFinDetailsData:", this.employeeFinDetailsData);
			}
		)
	}

	/** Transaction Summary data By employee master id */
	NonRecurringTransactionGroupAPIbyId(index) {

		const formData = new FormData();

		formData.append('nonRecurringTransactionGroupId', this.selectedEmpData[index].nonRecurringTransactionGroupId)

		this.nonRecService.NonRecurringTransactionGroupAPIbyId(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupAPIbyIdData = res.data.results;
				let transactionData = this.NonRecurringTransactionGroupAPIbyIdData[0]
				this.selectedTransactionType = transactionData.transactionsType
				this.onceEvery = transactionData.onceEvery
				this.updateNoOfTransaction = transactionData.numberOfTransactions
				this.openingAmount = transactionData.amount
				this.remark = transactionData.remark
				this.standardName = transactionData.payrollHeadMaster.standardName
				this.headMasterId = transactionData.payrollHeadMaster.headMasterId
				console.log(this.NonRecurringTransactionGroupAPIbyIdData[0])
			}
		)
	}

	/** View Transaction details popup */
	ViewTransactionScheduleDetail(templateTransaction: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			templateTransaction,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);

		this.nonRecurringTransactionGroupId = this.selectedEmpData[this.index].nonRecurringTransactionGroupId
		this.viewEmployeeData = this.selectedEmpData[this.index]
		this.NonRecurringTransactionScheduleEMP()

	}

	/** Open Popup for View Transaction History */
	ViewTransactionHistoryData(template1: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template1,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);

		this.viewHeadHistory = this.selectedEmpData[this.index]
		this.employeeMasterId = Summarydata.employeeMasterId
		this.headMasterId = this.selectedEmpData[this.index].payrollHeadMaster.headMasterId
		this.nonRecurringTransactionGroupId = this.selectedEmpData[this.index].nonRecurringTransactionGroupId
		this.NonRecurringTransactionGroupHeadwiseHistory()
	}

	/**Get selected Transaction Type */
	getTransactionType(transactiontype, index) {
		this.selectedTransactionIndex = index;
		this.selectedTransactionType = transactiontype
	}

	/** Get selected From Date */
	getFromDate(event) {
		this.selectedFromDate = this.datepipe.transform(new Date(event), 'yyyy-MM-dd') + ' 00:00:00'
	}

	/** Get selected To Date */
	getToDate(event) {
		this.selectedToDate = this.datepipe.transform(new Date(event), 'yyyy-MM-dd') + ' 00:00:00'
	}

	/** Get entered Once Every */
	getOnceEveryChange(value) {
		this.onceEvery = value;
	}

	/** Get entered remark */
	getRemarkChange(value) {
		this.remark = value
	}

	/** get Uppdate No Of Transacton */
	getUpdateNoOfTransaction(value){
		this.updateNoOfTransaction = value;
	}

	/**get update opening amount */
	getUpdateOpeningAmt(value){
		this.openingAmount = value
	}

	/** update single transaction */
	updateSingleTransaction() {
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.selectedToDate;
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		let data = {
			"employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
			"headMasterId": parseInt(this.headMasterId),
			"standardName": this.standardName,
			"payrollAreaId": this.selectedEmpData[this.index].payrollArea.payrollAreaId,
			"payrollAreaCode": this.selectedEmpData[this.index].payrollArea.payrollAreaCode,
			"onceEvery": parseInt(this.onceEvery),
			"frequency": this.selectedEmpData[this.index].frequency,
			"fromDate": this.selectedFromDate,
			"transactionsType": this.selectedTransactionType,
			"numberOfTransactions": parseInt(this.updateNoOfTransaction),
			"toDate": todate,
			"amount": parseFloat(this.openingAmount),
			"remark": this.remark,
			"createdBy": "rahul",
			"clawbackApplicableAt":"",
			"clawbackInputType":"",
			"clawbackPeriod":0,
			"clawbackUnit":"",
			"clawbackDate":""
		}

		console.log("Data is: " + JSON.stringify(data))
		this.attendanceInputAPIRecordsUI(data)
	}

	/** Update transaction  */
	attendanceInputAPIRecordsUI(data) {

		this.nonRecService.attendanceInputAPIRecordsUI(data, this.selectedEmpData[this.index].nonRecurringTransactionGroupId).subscribe(
			res => {
				this.toaster.success('', 'Transaction data updated sucessfully')
			}
		)
	}

	/** Save and Next Functionality */
	saveAndNextTransaction() {
		this.updateSingleTransaction()
		this.index = this.index + 1
		this.employeeFinDetails()
		this.NonRecurringTransactionGroupAPIbyId(this.index)
	}


	/** Clawback Popup Show */
	ViewClawbackpopup(template4: TemplateRef<any>) {
		this.modalRef = this.modalService.show(
			template4,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
	}


	/** Get Applcable At selected Value */
	getSelectedApplicable(value){
		this.selectedApplicableAt = value
	}

	/** Get Input Type selected Value */
	getSelectedInputType(value){
		this.selectedClawbackInputType = value
	}

	/**Get Clawback Frequency selected value */
	getClawbackFrequency(value){
		this.clawbackFrequency = value
	}

	/******************* Transaction when click on Transaction Tab and select Employee from Dropdown *******************/

	/** Navigate To Transaction Tab on click radio button */
	navigateToTransaction() {
		this.indexId = 2
		this.showEmployeeSelectionFlag = true;
		this.getAllEmployeeDetails();
	}

	/** Get all  Employee data */
	getAllEmployeeDetails(): void {
		this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
			this.employeeData = res.data.results[0];
		});
	}

	/** get Selected Payroll Area from Dropdown */
	getSelectedPayrollArea(value) {
		this.selectedPayrollArea = value;
		if (this.selectedEmployeeMasterId != '') {
			this.NonRecurringTransactionGroupAPIEmpwise()
			this.NonRecurringTransactionGroupUI()
			this.nonRecService.employeeFinDetails(44).subscribe(
				res => {
					this.employeeFinDetailsData = res.data.results[0][0];
				}
			)
		}
	}

	/** Get Selected Employee master Id */
	getSelectedEmployeeCode(value) {
		this.selectedEmployeeMasterId = value
		if (this.selectedPayrollArea != '') {
			this.NonRecurringTransactionGroupAPIEmpwise()
			this.NonRecurringTransactionGroupUI()
			this.nonRecService.employeeFinDetails(44).subscribe(
				res => {
					this.employeeFinDetailsData = res.data.results[0][0];
				}
			)
		}
	}

	/** Selected Employee Wise Data */
	NonRecurringTransactionGroupAPIEmpwise() {

		const formData = new FormData();

		formData.append('employeeMasterId', this.selectedEmployeeMasterId)
		formData.append('payrollArea', this.selectedPayrollArea)

		this.nonRecService.NonRecurringTransactionGroupAPIEmpwise(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupAPIEmpwiseData = res.data.results;

			}
		)
	}

	NonRecurringTransactionGroupUI() {

		const formData = new FormData();

		formData.append('employeeMasterId', this.selectedEmployeeMasterId)
		formData.append('payrollArea', this.selectedPayrollArea)

		this.nonRecService.NonRecurringTransactionGroupUI(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupUIData = res.data.results;

			}
		)
	}

	/** View transaction history on click on head */
	ViewTransactionHistoryDataByEmployee(template1: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template1,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);

		//this.viewHeadHistory = this.selectedEmpData[this.index]
		this.employeeMasterId = Summarydata.employeeMasterId
		// this.headMasterId = Summarydata.headMasterId
		this.nonRecurringTransactionGroupId = Summarydata.nonRecurringTransactionGroupId
		this.NonRecurringTransactionGroupHeadwiseHistory()
	}


	/** On change Once Every */
	getOnceEveryChangeForSave(value, data) {
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.selectedToDate;
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": parseInt(value),
						"frequency": "Monthly",
						"fromDate": element.fromDate,
						"transactionsType": element.transactionsType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": element.toDate,
						"amount": 4500.00,
						"remark": element.remark
					})
				} else {
					let length = this.saveTransactionData.length -1;
					if(this.saveTransactionData[length].headMasterId == data.headId){ return;}
					else{
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": parseInt(value),
							"frequency": "Monthly",
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": 4500.00,
							"remark": data.remark
						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": parseInt(value),
				"frequency": "Monthly",
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": 4500.00,
				"remark": data.remark
			})
		}
	}

	/** On change From Date */
	getFromDateForSave(event, data) {
		this.selectedFromDateForSave = this.datepipe.transform(new Date(event), 'yyyy-MM-dd') + ' 00:00:00'
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.selectedToDateForSave;
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": "Monthly",
						"fromDate": this.selectedFromDateForSave,
						"transactionsType": element.transactionsType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": element.toDate,
						"amount": 4500.00,
						"remark": element.remark
					})
				} else {
					let length = this.saveTransactionData.length -1;
					if(this.saveTransactionData[length].headMasterId == data.headId){ return;}
					else{
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": "Monthly",
							"fromDate": this.selectedFromDateForSave,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": 4500.00,
							"remark": data.remark
						})
					}	
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": "Monthly",
				"fromDate": this.selectedFromDateForSave,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": 4500.00,
				"remark": data.remark
			})
		}
	}

	/** On change Transaction Type */
	getTransactionTypeForSave(value, rowindex, data) {
		this.selectedTransactionIndex = rowindex;
		this.selectedTransactionType = value
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.selectedToDateForSave;
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": "Monthly",
						"fromDate": element.fromDate,
						"transactionsType": element.transactionsType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": 4500.00,
						"remark": element.remark
					})
				} else {
					let length = this.saveTransactionData.length -1;
					if(this.saveTransactionData[length].headMasterId == data.headId){ return;}
					else{
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": "Monthly",
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": 4500.00,
							"remark": data.remark
						})
					}	
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": "Monthly",
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": 4500.00,
				"remark": data.remark
			})
		}
	}

	/** On change To Date */
	getToDateForSave(event, data) {
		this.selectedToDateForSave = this.datepipe.transform(new Date(event), 'yyyy-MM-dd') + ' 00:00:00'
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.selectedToDateForSave;
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": "Monthly",
						"fromDate": element.fromDate,
						"transactionsType": element.transactionsType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": 4500.00,
						"remark": element.remark
					})
				} else {
					let length = this.saveTransactionData.length -1;
					if(this.saveTransactionData[length].headMasterId == data.headId){ return;}
					else{
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": "Monthly",
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": 4500.00,
							"remark": data.remark
						})
					}	
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": "Monthly",
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": 4500.00,
				"remark": data.remark
			})
		}
	}

	/** On change Remark */
	getRemarkChangeForSave(value, data) {
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
		} else {
			todate = this.selectedToDateForSave;
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.headMasterId == data.headId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"headMasterId": element.headMasterId,
						"standardName": element.standardName,
						"payrollAreaId": "1",
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": "Monthly",
						"fromDate": element.fromDate,
						"transactionsType": element.transactionsType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"amount": 4500.00,
						"remark": value
					})
				} else {
					let length = this.saveTransactionData.length -1;
					if(this.saveTransactionData[length].headMasterId == data.headId){ return;}
					else{
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"headMasterId": data.headId,
							"standardName": data.headDescription,
							"payrollAreaId": "1",
							"payrollAreaCode": this.selectedPayrollArea,
							"onceEvery": data.onceEvery,
							"frequency": "Monthly",
							"fromDate": data.fromdate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"amount": 4500.00,
							"remark": value
						})
					}	
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"headMasterId": data.headId,
				"standardName": data.headDescription,
				"payrollAreaId": "1",
				"payrollAreaCode": this.selectedPayrollArea,
				"onceEvery": data.onceEvery,
				"frequency": "Monthly",
				"fromDate": data.fromdate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"amount": 4500.00,
				"remark": value
			})
		}
	}

	/** save transaction data */
	NonRecurringTransactionGroup() {
		console.log(JSON.stringify(this.saveTransactionData))
		this.nonRecService.NonRecurringTransactionGroup(this.saveTransactionData).subscribe(
			res => {
				this.toaster.success("", "Transaction Saved Successfully")
			}
		)
	}


	/*** Schedule Tab click - edit schedule */

	/** Click on Edit Schedule Button */
	editScheduleData() {
		if (this.selectedEmpData.length > 0) {
			this.index = 0;
			this.indexId = 3
			this.editScheduleFlag = true;
			this.nonRecurringTransactionGroupId = this.selectedEmpData[this.index].nonRecurringTransactionGroupId
			this.NonRecurringTransactionScheduleEMP()

		} else {
			this.toaster.warning("", "Please select atleast one employee")
		}
	}

	

    /** get hold value for update schedule */
	getHoldScheduleValue(event, scheduleData,index) {
		this.selectedHoldIndex = index;
		if (event.checked) {
			this.hold = 1
		} else {
			this.hold = 0
		}
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonRecurringTransactionScheduleId": element.nonRecurringTransactionScheduleId,
						"hold": this.hold,
						"discard": element.discard,
						"resheduleDate": element.resheduleDate,
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length -1;
					if(this.updateScheduleData[length].nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId){ return;}
					else{
						this.updateScheduleData.push({
							"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
							"hold": this.hold,
							"discard": scheduleData.discard,
							"resheduleDate": scheduleData.resheduleDate,
							"remark": scheduleData.remark
						})
				    }
				}
			});
		} else {
			this.updateScheduleData.push({
				"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
				"hold": this.hold,
				"discard": scheduleData.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": scheduleData.remark
			})
		}

	}

	/** get discard value for update schedule */
	getDiscardScheduleValue(event, scheduleData,index) {
		this.selecteddiscardIndex = index;
		if (event.checked) {
			this.discard = 1
		} else {
			this.discard = 0
		}
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonRecurringTransactionScheduleId": element.nonRecurringTransactionScheduleId,
						"hold": element.hold,
						"discard": this.discard,
						"resheduleDate": element.resheduleDate,
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length -1;
					if(this.updateScheduleData[length].nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId){ return;}
					else{
						this.updateScheduleData.push({
							"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
							"hold": scheduleData.hold,
							"discard": this.discard,
							"resheduleDate": scheduleData.resheduleDate,
							"remark": scheduleData.remark
						})
					}
				}
			});
		} else {
			this.updateScheduleData.push({
				"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
				"hold": scheduleData.hold,
				"discard": this.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": scheduleData.remark
			})
		}
	}

	/** get reschedule date value for update schedule */
	getRescheduleDate(date, scheduleData) {
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonRecurringTransactionScheduleId": element.nonRecurringTransactionScheduleId,
						"hold": element.hold,
						"discard": element.discard,
						"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length -1;
					if(this.updateScheduleData[length].nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId){ return;}
					else{
						this.updateScheduleData.push({
							"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
							"hold": scheduleData.hold,
							"discard": scheduleData.discard,
							"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
							"remark": scheduleData.remark
						})
					}
				}
			});
		} else {
			this.updateScheduleData.push({
				"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
				"hold": scheduleData.hold,
				"discard": scheduleData.discard,
				"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
				"remark": scheduleData.remark
			})
		}

	}

	/** get remark value for update schedule */
	getScheduleRemark(remark, scheduleData) {
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonRecurringTransactionScheduleId": element.nonRecurringTransactionScheduleId,
						"hold": element.hold,
						"discard": element.discard,
						"resheduleDate": element.resheduleDate,
						"remark": remark
					})
				} else {
					let length = this.updateScheduleData.length -1;
					if(this.updateScheduleData[length].nonRecurringTransactionScheduleId == scheduleData.nonRecurringTransactionScheduleId){ return;}
					else{
						this.updateScheduleData.push({
							"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
							"hold": scheduleData.hold,
							"discard": scheduleData.discard,
							"resheduleDate": scheduleData.resheduleDate,
							"remark": remark
						})
					}	
				}
			});
		} else {
			this.updateScheduleData.push({
				"nonRecurringTransactionScheduleId": scheduleData.nonRecurringTransactionScheduleId,
				"hold": scheduleData.hold,
				"discard": scheduleData.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": remark
			})
		}
	}

	/** Update Schedule data */
	NonRecurringTransactionScheduleupdateById() {

		// let data = {
		// 	"nonRecurringTransactionScheduleId": 43,
		// 	"hold": 0,
		// 	"discard": 0,
		// 	"resheduleDate": "2020-04-06",
		// 	"remark": "Test Rahul"
		// }

		console.log(JSON.stringify(this.updateScheduleData))
		this.nonRecService.NonRecurringTransactionScheduleupdateById(this.updateScheduleData).subscribe(
			res => {
				this.toaster.success("","Transaction Schedule updated successfully")
				this.NonRecurringTransactionScheduleEMP()
			}
		)
	}

    /** View schedule history data */
	ViewScheduleHistory(template3: TemplateRef<any>, scheduleData) {
		this.modalRef = this.modalService.show(
			template3,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);

        this.viewScheduleData = scheduleData
		this.nonRecurringTransactionScheduleId = scheduleData.nonRecurringTransactionScheduleId
		this.nonRecurringTransactionGroupId = scheduleData.nonRecurringTransactionGroupId
		this.NonRecurringTransactionScheduleRemarkHistorybyScheduleId()

	}

	/** Schedule Data on popup*/
	NonRecurringTransactionScheduleRemarkHistorybyScheduleId() {

		const formData = new FormData();
		formData.append('nonRecurringTransactionScheduleId', this.nonRecurringTransactionScheduleId)
		formData.append('nonRecurringTransactionGroupId', this.nonRecurringTransactionGroupId)

		this.nonRecService.NonRecurringTransactionScheduleRemarkHistorybyScheduleId(formData).subscribe(
			res => {
				this.NonRecurringHistorybyScheduleIdData = res.data.results;
			}
		)
	}
}