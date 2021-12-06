import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { DatePipe } from '@angular/common';
import { PayrollInputsService } from '../payroll-inputs.service';
import { ExcelserviceService } from '../../../core/services/excelservice.service';
import { NonRecurringQtyService } from '../non-recurring-qty.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';




@Component({
	selector: 'app-non-recurring-qty',
	templateUrl: './non-recurring-qty.component.html',
	styleUrls: ['./non-recurring-qty.component.scss']
})
export class NonRecurringQtyComponent implements OnInit {

	public modalRef: BsModalRef;
	frozenCols: any[];
	scrollableCols: any[];
	attendanceData: any;

	NonRecurringTransactionData: any;
	NonRecurringTransactionGroupUIData: any;
	NonRecurringTransactionGroupAPIEmpwiseData: any = [];
	NonRecurringTransactionGroupAPIbyIdData: any;
	NonRecurringTransactionScheduleEMPdData: any;
	NonRecurringTransactionScheduleupdateByIdData: any;
	NonRecurringHistorybyScheduleIdData: any = '';
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
	selectedTransactionIndex: any = -1;
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
	selectedTransactionClawback: any;
	clawbackperiod: number = 0;
	clawbackDate: any = "";
	selectedTransactionTypes: any = [];
	savedNumberOfTransaction: any = 0;
	AllNonRecurringTransactionScheduledData: any;
	selectedClawbackRowIndex: any;
	newDataRow: any = [];
	NonRecurringTransactionGroupHistoryAPIbyIdData: any;
	updatefrequency: any;
	excelData: any[];
	effectiveFromDate: any;
	effectiveToDate: any;
	setMinToDate: any;
	headGroupDefinitionId: Date;
	frequencyDataByPayroll: any;
	showNoteFlag: boolean = false;
	scheduleAllData: any;
	originalTransactionDate: any;
	isReschedule: boolean;
	payrollListData: any;
	payrollListEmpData: any;
	copyFlag: boolean = false;
	showDropdownDisabled: boolean = false;
	parollListIndex: number = 0;
	executeSDM: any;
	employeeCode: any;
	employeeName: any;
	refralemployeeMasterId: any = 0;
	refralPayrollListData: any;
	refemployeeCode: any;
	refemployeeName: any;
	refPayrolArea: any = '';
	selectedDevData: any;
	SDMAmountValue: any;
	deviationData: any;
	deviationModeData: any;
	repeatModeData: any;
	deviationcount: any = 0;
	repeatcount: any = 0;
	nonsalaryTransactionGroupDeviationList: any[] = [];
	devationRemarkText: any = '';
	selectedDeviationdata: any;
	repeatRemarkText: any;
	nonSalaryTransactionGroupId: any;
	nonSalaryDetailId: any;
	NonSalaryTransactionGroupHeadwiseHistoryData: any;
	nonSalaryTransactionScheduleId: any;
	type: any;
	selectedStandardName: any;
	savenonSalaryDetailId: any ='';
	savetype: any;
	svaeDisabledFlag: boolean = true;
	selectedOption: string = 'single';
	payrollAreaId: any;
	isvisible: boolean = false;

	constructor(private modalService: BsModalService, private nonRecService: NonRecurringAmtService,
		private nonRecQtyService: NonRecurringQtyService,
		private toaster: AlertServiceService, private datepipe: DatePipe,
		private payrollservice: PayrollInputsService, private excelservice: ExcelserviceService) {
		if (localStorage.getItem('payrollListEmpData') != null) {
			this.payrollListEmpData = JSON.parse(localStorage.getItem('payrollListEmpData'))
			// localStorage.removeItem('payrollListEmpData')
			this.indexId = 2
			this.showEmployeeSelectionFlag = true;
			this.selectedApplicableAt = ""
			this.clawbackDate = ""
			this.clawbackFrequency = ""
			this.clawbackperiod = 0
			this.selectedClawbackInputType = ""
			this.showDropdownDisabled = true
			this.parollListIndex = 0
			//console.log("this.payrollListEmpData: " + JSON.stringify(this.payrollListEmpData))
			this.selectedPayrollArea = this.payrollListEmpData[0].payrollAreaCode
			this.payrollAreaId = this.payrollListEmpData[0].payrollAreaId
			this.getAllEmployeeDetails();
			
			this.PayrollAreaByPayrollAreaCode(this.selectedPayrollArea)
			this.getSelectedEmployeeCode(this.payrollListEmpData[0].employeeMasterId)

		}
	}

	ngOnInit() {
		this.NonRecurringTransactionGroupSummery();
	}

	/** Summary Get all data  */
	NonRecurringTransactionGroupSummery() {
		this.nonRecQtyService.NonRecurringTransactionGroupSummery().subscribe(
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
		this.selectedEmployeeMasterId = "";
		this.selectedPayrollArea = "";
		this.showEmployeeSelectionFlag = false;
		this.employeeFinDetailsData = null;
		this.NonRecurringTransactionGroupAPIEmpwiseData = null;
	}

	/** When clicked on checkedbox summary page*/
	isSelected(event, summeryData) {
		if (event.checked) {
			this.selectedEmpData.push(summeryData)
		} else {
			if (this.selectedEmpData.length > 0) {
				this.selectedEmpData.forEach((element, index) => {
					if (element.nonSalaryTransactionGroupId == summeryData.nonSalaryTransactionGroupId) {
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
		formData.append('nonSalaryTransactionGroupId', this.nonSalaryTransactionGroupId)

		this.nonRecQtyService.NonSalaryTransactionScheduleEMP(formData).subscribe(
			res => {
				this.NonRecurringTransactionScheduleEMPdData = res.data.results;
				this.NonRecurringTransactionScheduleEMPdData.forEach(element => {
					if (element.processedAmount != null || element.processedAmount != '') {
						element.isDisabledFlag = true;
					}
					if (element.processedAmount == null || element.processedAmount == '') {
						element.isDisabledFlag = false;
					}
				});
			}
		)
	}

	/** Transaction History by group id */
	NonRecurringTransactionGroupHeadwiseHistory() {
		const formData = new FormData();

		formData.append('nonSalaryTransactionGroupId', this.nonSalaryTransactionGroupId)

		this.nonRecQtyService.NonSalaryTransactionGroupHistoryAPI(formData, this.nonSalaryTransactionGroupId).subscribe(
			res => {
				this.NonRecurringTransactionGroupHistoryAPIbyIdData = res.data.results;
				console.log("transaction history: " + JSON.stringify(this.NonRecurringHeadwiseHistorydData))
			}
		)
	}

	/** Transaction head history */
	NonRecurringTransactionGroupHeadHistory() {
		const formData = new FormData();

		formData.append('employeeMasterId', this.employeeMasterId)
		formData.append('nonSalaryDetailId', this.nonSalaryDetailId)

		this.nonRecQtyService.NonSalaryTransactionGroupHeadwiseHistory(formData).subscribe(
			res => {
				this.NonSalaryTransactionGroupHeadwiseHistoryData = res.data.results;
				// console.log("head history: "+ JSON.stringify(this.NonSalaryTransactionGroupHeadwiseHistoryData))
			}
		)
	}

	/** view transaction group */
	viewTransaction(template1: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template1,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);
		this.viewHeadHistory = Summarydata
		this.employeeMasterId = Summarydata.employeeMasterId
		//this.headMasterId = Summarydata.payrollHeadMaster.headMasterId
		this.nonSalaryTransactionGroupId = Summarydata.nonSalaryTransactionGroupId
		this.NonRecurringTransactionGroupHeadwiseHistory()
	}

	/** View transaction History */
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

	/** Open Popup for View history History */
	ViewTransactionHistory(template1i: TemplateRef<any>, Summarydata) {
		this.modalRef = this.modalService.show(
			template1i,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);

		this.viewHeadHistory = Summarydata
		this.employeeMasterId = Summarydata.employeeMasterId
		this.nonSalaryDetailId = Summarydata.nonSalaryDTO.nonSalaryDetailId
		this.nonRecurringTransactionGroupId = Summarydata.nonRecurringTransactionGroupId
		this.NonRecurringTransactionGroupHeadHistory()
	}

	/** Open Popup for View Schedule Details */
	ViewScheduleDetail(template2: TemplateRef<any>, Summarydata) {
		this.showNoteFlag = false;
		this.modalRef = this.modalService.show(
			template2,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);

		this.nonSalaryTransactionGroupId = Summarydata.nonSalaryTransactionGroupId
		this.viewEmployeeData = Summarydata
		this.NonRecurringTransactionScheduleEMP()

	}

	/******************* Transaction when click on Edit Transaction *******************/

	/** on Click on toggle Button */
	getSelectedOption(event){
		if(event.checked){
			this.selectedOption = 'fastEntry'
		}else{
		  this.selectedOption = 'single'
		}
	  }
	  
	/** On Click edit Transaction button - summary */
	editTransaction() {
		if (this.selectedEmpData.length > 0) {
			this.indexId = 2
			this.index = 0;
			this.showEmployeeSelectionFlag = false;
			this.selectedTransactionIndex = 0;
			this.employeeFinDetails()
			this.NonRecurringTransactionGroupAPIbyId(this.index)

			this.PayrollAreaByPayrollAreaCode(this.selectedEmpData[this.index].payrollArea.payrollAreaCode)
			this.selectedEmployeeMasterId = this.selectedEmpData[this.index].employeeMasterId
			console.log("this.selectedEmpData[this.index]: " + JSON.stringify(this.selectedEmpData[this.index]))
		} else {
			this.toaster.sweetalertWarning("Please select atleast one employee")
		}
	}

	/** Display employee info by employeeMasterId */
	employeeFinDetails() {
		// this.attendanceService.employeeFinDetails(this.selectedEmpData[this.index].employeeMasterId).subscribe(
		this.nonRecService.employeeFinDetails(this.selectedEmpData[this.index].employeeMasterId).subscribe(
			res => {
				this.employeeFinDetailsData = res.data.results[0][0];
				// console.log("employeeFinDetailsData:", this.employeeFinDetailsData);
			}
		)
	}

	/** Transaction Summary data By employee master id */
	NonRecurringTransactionGroupAPIbyId(index) {

		this.nonSalaryTransactionGroupId = this.selectedEmpData[index].nonSalaryTransactionGroupId
		const formData = new FormData();

		formData.append('nonSalaryTransactionGroupId', this.selectedEmpData[index].nonSalaryTransactionGroupId)

		this.nonRecQtyService.NonRecurringTransactionGroupAPIbyId(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupAPIbyIdData = res.data.results;
				let transactionData = this.NonRecurringTransactionGroupAPIbyIdData[0]
				this.selectedTransactionType = transactionData.transactionsType
				this.onceEvery = transactionData.onceEvery
				this.updateNoOfTransaction = transactionData.numberOfTransactions
				this.openingAmount = transactionData.quantity
				this.selectedEmployeeMasterId = transactionData.employeeMasterId
				if (transactionData.remark == null) {
					this.remark = ''
				} else {
					this.remark = transactionData.remark
				}
				this.standardName = transactionData.nonSalaryDTO.code
				this.type = transactionData.type
				this.selectedStandardName = transactionData.nonSalaryDTO.code
				// this.headMasterId = transactionData.payrollHeadMaster.headMasterId
				this.selectedFromDate = this.datepipe.transform(new Date(transactionData.fromDate), 'yyyy-MM-dd') + ' 00:00:00'
				// this.selectedApplicableAt = transactionData.clawbackApplicableAt
				// this.selectedClawbackInputType = transactionData.clawbackInputType
				// this.clawbackperiod = transactionData.clawbackPeriod
				// this.clawbackFrequency = transactionData.clawbackUnit
				this.updatefrequency = transactionData.frequency

				if (transactionData.executeSDM == null) {
					this.executeSDM = "NO"
				} else {
					this.executeSDM = transactionData.executeSDM
				}

				if (transactionData.clawbackDate == null) {
					this.clawbackDate = ""
				} else {
					this.clawbackDate = transactionData.clawbackDate
				}
				this.refralemployeeMasterId = transactionData.refferedEmpId
				this.refPayrolArea = transactionData.refferedpayrollAreaCode
				this.executeSDM = transactionData.executeSDM
				// console.log(this.NonRecurringTransactionGroupAPIbyIdData[0])

				this.nonRecQtyService.NonRecurringTransactionGrouprangeValidation(this.selectedEmpData[index].nonSalaryTransactionGroupId).subscribe(
					res => {
						let resp: any = res;
						resp.forEach(element => {
							if (element.status != 'No Deviation') {
								this.deviationData.push(element)
							}
						});
						this.NonRecurringTransactionGroupAPIbyIdData.deviationCount = this.deviationData.length
						this.deviationData.forEach(element => {
							if (element.mode == 'Deviation') {
								this.deviationModeData.push(element)
								this.deviationcount = this.deviationModeData.length
							} else if (element.mode == 'Repeat') {
								this.repeatModeData.push(element)
								this.repeatcount = this.repeatModeData.length
							}
						});
					}
				)
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
	getTransactionType(transactiontype, index, data) {
		this.selectedTransactionIndex = index;
		this.selectedTransactionType = transactiontype
		if (this.selectedTransactionType == 'Perpetual' || this.selectedTransactionType == 'Defined Date') {
			this.NonRecurringTransactionGroupAPIbyIdData[index].numberOfTransactions = null
		}
	}

	/** Get selected From Date */
	getFromDate(event) {
		this.setMinToDate = event
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
	getUpdateNoOfTransaction(value) {
		this.updateNoOfTransaction = value;
	}

	/**get update opening amount */
	getUpdateOpeningAmt(value, data) {
		this.openingAmount = value
		if (data.executeSDM != 'YES' || data.executeSDM != 'Yes' || data.executeSDM != 'yes') {
			if (this.selectedFromDate != '') {
				let inputdata = {
					"employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
					"headMasterId": parseInt(this.headMasterId),
					"payrollAreaId": this.payrollAreaId,
					"amount": value,
					"fromDate": this.selectedFromDate
				}

				this.deviationModeData = []
				this.repeatModeData = []
				this.deviationData = []
				this.nonRecService.NonRecurringTransactionGrouprangeValidation(inputdata).subscribe(res => {
					// this.deviationData = res
					let resp: any = res;
					resp.forEach(element => {
						if (element.status != 'No Deviation') {
							this.deviationData.push(element)
						}
					});
					data.deviationCount = this.deviationData.length
					this.deviationData.forEach(element => {
						if (element.mode == 'Deviation') {
							this.deviationModeData.push(element)
							this.deviationcount = this.deviationModeData.length
						} else if (element.mode == 'Repeat') {
							this.repeatModeData.push(element)
							this.repeatcount = this.repeatModeData.length
						}
					});
				})
			}
		}

	}

	/** edit deviation popup */
	editdeviationPopupOpen(editdeviationPopup: TemplateRef<any>, data, rowindex) {
		if (data.deviationCount > 0) {
			this.modalRef = this.modalService.show(
				editdeviationPopup,
				Object.assign({}, {
					class: 'gray modal-xl'
				})
			);
			this.selectedDevData = data;
		}
	}

	updateDeviationRepeatData(selectedDevData) {
		let remark = ''
		if (this.selectedDeviationdata.mode == 'Deviation') {
			remark = this.devationRemarkText
		} else {
			remark = this.repeatRemarkText
		}

		let obj = {
			"deviationAmount": this.selectedDeviationdata.deviationAmount,
			"mode": this.selectedDeviationdata.mode,
			"deviationType": this.selectedDeviationdata.deviationType,
			"deviationRemark": remark,
			"deviationStatus": this.selectedDeviationdata.status,
			"deviationAmountLimit": this.selectedDeviationdata.deviationAmountLimit
		}
		this.nonsalaryTransactionGroupDeviationList.push(obj)
	}

	/** update single transaction */
	updateSingleTransaction() {
		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
			this.updateNoOfTransaction = 0
		} else {
			todate = this.selectedToDate;
			this.updateNoOfTransaction = 0
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		let data = [{

			"employeeMasterId": this.selectedEmployeeMasterId,
			"nonSalaryDetailId": this.selectedEmpData[this.index].nonSalaryDTO.nonSalaryDetailId,
			"standardName": this.selectedStandardName,
			"payrollAreaId": this.payrollAreaId,
			"payrollAreaCode": this.selectedEmpData[this.index].payrollArea.payrollAreaCode,
			"onceEvery": this.onceEvery,
			"frequency": this.updatefrequency,
			"fromDate": this.selectedFromDate,
			"transactionsType": this.selectedTransactionType,
			"numberOfTransactions": this.updateNoOfTransaction,
			"toDate": todate,
			"quantity": parseInt(this.openingAmount),
			"uom": this.selectedEmpData[this.index].uom,
			"type": this.type,
			"remark": this.remark,
			"createdBy": "rahul",
			"nonSalaryTransactionGroupId": this.nonSalaryTransactionGroupId,
			"nonsalaryTransactionGroupDeviationList": this.nonsalaryTransactionGroupDeviationList


		}]

		console.log("Data is: " + JSON.stringify(data))
		this.attendanceInputAPIRecordsUI(data)
	}

	/** Update transaction  */
	attendanceInputAPIRecordsUI(data) {

		console.log("data: " + JSON.stringify(data))

		this.nonRecQtyService.attendanceInputAPIRecordsUI(data).subscribe(
			res => {
				this.toaster.sweetalertMasterSuccess('', 'Transaction data updated sucessfully')
				if (this.selectedEmpData.length == 1) {
					this.indexId = 1;
					this.navigateSummary()
				}
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

	saveAndNextPayrollTransaction() {
		//this.NonRecurringTransactionGroup()
		this.showEmployeeSelectionFlag = true;
		this.selectedApplicableAt = ""
		this.clawbackDate = ""
		this.clawbackFrequency = ""
		this.clawbackperiod = 0
		this.selectedClawbackInputType = ""
		this.showDropdownDisabled = true
		this.parollListIndex = this.parollListIndex + 1
		this.getAllEmployeeDetails();
		this.selectedPayrollArea = this.payrollListEmpData[this.parollListIndex].payrollAreaCode
		this.getSelectedEmployeeCode(this.payrollListEmpData[this.parollListIndex].employeeMasterId)
	}

	nextEmpData() {
		this.index = this.index + 1
		this.employeeFinDetails()
		this.NonRecurringTransactionGroupAPIbyId(this.index)
	}

	prevEmpPayrollData() {
		this.showDropdownDisabled = true
		this.parollListIndex = this.parollListIndex - 1
		this.getAllEmployeeDetails();
		this.selectedPayrollArea = this.payrollListEmpData[this.parollListIndex].payrollAreaCode
		this.getSelectedEmployeeCode(this.payrollListEmpData[this.parollListIndex].employeeMasterId)
	}

	prevEmpData() {

		this.index = this.index - 1
		this.employeeFinDetails()
		this.NonRecurringTransactionGroupAPIbyId(this.index)

	}

	nextEmpPayrollData() {
		this.showDropdownDisabled = true
		this.parollListIndex = this.parollListIndex + 1
		this.getAllEmployeeDetails();
		this.selectedPayrollArea = this.payrollListEmpData[this.parollListIndex].payrollAreaCode
		this.getSelectedEmployeeCode(this.payrollListEmpData[this.parollListIndex].employeeMasterId)
	}

	/******************* Transaction when click on Transaction Tab and select Employee from Dropdown *******************/

	/** Navigate To Transaction Tab on click radio button */
	navigateToTransaction() {
		if (this.selectedEmpData.length == 0) {
			this.indexId = 2
			this.showEmployeeSelectionFlag = true;
			this.selectedApplicableAt = ""
			this.clawbackDate = ""
			this.clawbackFrequency = ""
			this.clawbackperiod = 0
			this.selectedClawbackInputType = ""
			this.saveTransactionData = []
			this.getAllEmployeeDetails();
		}
	}

	/** selected payroll area get effective fromdte and todate */
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
				// 	res => {
				// 		this.frequencyDataByPayroll = res.data.results
				// 	}
				// )
			}
		)
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
	
		this.payrollListData.forEach(element => {
			if(element.payrollAreaCode == value){
				this.payrollAreaId = element.payrollAreaId 
			}
		});
		this.PayrollAreaByPayrollAreaCode(value)
		if (this.selectedEmployeeMasterId != '') {
			this.NonRecurringTransactionGroupAPIEmpwise()

			this.nonRecService.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
				res => {
					this.employeeFinDetailsData = res.data.results[0][0];
				}
			)
		}
	}

	/** Get Selected Employee master Id */
	getSelectedEmployeeCode(value) {
		this.payrollListData = ''
		this.selectedEmployeeMasterId = parseInt(value)
		if (this.selectedPayrollArea != '') {
			this.NonRecurringTransactionGroupAPIEmpwise()

			this.nonRecService.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
				res => {
					this.employeeFinDetailsData = res.data.results[0][0];
				}
			)
		}
		this.payrollAssigned()
	}

	payrollAssigned() {

		this.nonRecService.getEmployeeWisePayrollList(this.selectedEmployeeMasterId).subscribe(
			res => {
				this.payrollListData = res.data.results[0];
			}
		)
	}

	/** Selected Employee Wise Data */
	NonRecurringTransactionGroupAPIEmpwise() {

		const formData = new FormData();

		formData.append('employeeMasterId', this.selectedEmployeeMasterId)
		formData.append('payrollArea', this.selectedPayrollArea)

		this.nonRecQtyService.NonRecurringTransactionGroupAPIEmpwise(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupAPIEmpwiseData = res.data.results;
				this.NonRecurringTransactionGroupAPIEmpwiseData.forEach(element => {
					if (element.onceEvery == 0) {
						element.onceEvery = 1
						element.frequency = 'Monthly'
						element.transactionsType = 'NoOfTransaction'
						this.selectedTransactionType = 'NoOfTransaction'
						element.numberOfTransactions = 1
					}
				});
				// this.NonRecurringTransactionGroupUI()

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
				this.NonRecurringTransactionGroupAPIEmpwiseData.forEach(element => {
					this.NonRecurringTransactionGroupUIData.forEach(ele => {
						if (element.headId == ele.headId) {
							element.frequency = ele.frequency
						}
					});
				});

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
		// console.log("json: " + JSON.stringify(data))
		this.svaeDisabledFlag = false
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
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": parseInt(value),
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": parseInt(value),
							"frequency": data.frequency,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": parseInt(value),
				"frequency": data.frequency,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}

		console.log("onceEvery: " + JSON.stringify(this.saveTransactionData))

		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	getDeviationPercentage(data) {
		let percentage = 0;

		percentage = (data.deviationAmount / data.deviationAmountLimit) * 100;
		return percentage.toFixed(2);
	}

	/** On change From Date */
	getFromDateForSave(event, data, rowindex) {
		//alert(this.payrollAreaId)
		this.svaeDisabledFlag = false
		this.setMinToDate = event;
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
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": this.selectedFromDateForSave,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": this.selectedFromDateForSave,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": this.selectedFromDateForSave,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}

		console.log("fromDate: " + JSON.stringify(this.saveTransactionData))

		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	/** Copy To From Date TO All */
	copyFromDateToAll(data, index) {
		this.copyFlag = !this.copyFlag
		if (!this.copyFlag) {
			this.NonRecurringTransactionGroupAPIEmpwiseData.forEach(element => {
				if (element.headId == data.headId) {
					element.fromdate = this.selectedFromDateForSave
				}
			});

			this.getFromDateForSave(this.selectedFromDateForSave, data, index)
		}
	}

	/** On change Transaction Type */
	getTransactionTypeForSave(value, rowindex, data) {
		this.svaeDisabledFlag = false

		this.selectedTransactionIndex = rowindex;
		this.selectedTransactionType = value
		if (this.selectedTransactionType == 'Perpetual' || this.selectedTransactionType == 'Defined Date') {
			this.NonRecurringTransactionGroupAPIEmpwiseData[rowindex].numberOfTransactions = 0
		}
		this.NonRecurringTransactionGroupAPIEmpwiseData.forEach((element, index) => {
			if (index == rowindex) {
				element.transactionsType = value
			}
		});

		let todate = "";
		if (this.selectedTransactionType == 'NoOfTransaction') {
			todate = ""
		} else if (this.selectedTransactionType == 'Perpetual') {
			todate = '9999-12-31 00:00:00'
			this.savedNumberOfTransaction = 0
		} else {
			todate = this.selectedToDateForSave;
			this.savedNumberOfTransaction = 0
		}
		if (this.selectedFromDate == '') {
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}

		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					if(this.selectedTransactionType != 'NoOfTransaction'){
						element.numberOfTransactions = 0
					}
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}

		console.log("transaction type: " + JSON.stringify(this.saveTransactionData))
		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	/** On change To Date */
	getToDateForSave(event, data) {
		this.svaeDisabledFlag = false
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
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}


		console.log("todate: " + JSON.stringify(this.saveTransactionData))

		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	/** On change Remark */
	getRemarkChangeForSave(value, data) {
		this.svaeDisabledFlag = false
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
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": value,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": value,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": value,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}
		console.log("remark: " + JSON.stringify(this.saveTransactionData))
		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	/**on change opening quantity */
	transactionOpeningAmount(value, data, rowindex) {
		this.svaeDisabledFlag = false
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


		if (this.selectedFromDateForSave != '') {
			let inputdata = {
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"payrollAreaId": this.payrollAreaId,
				"amount": value,
				"fromDate": this.selectedFromDateForSave
			}

			this.deviationModeData = []
			this.repeatModeData = []
			this.deviationData = []
			this.nonRecQtyService.NonRecurringTransactionGrouprangeValidation(inputdata).subscribe(res => {
				let resp: any = res;
				resp.forEach(element => {
					if (element.status != 'No Deviation') {
						this.deviationData.push(element)
					}
				});
				this.NonRecurringTransactionGroupAPIEmpwiseData[rowindex].deviationCount = this.deviationData.length
				this.deviationData.forEach(element => {
					if (element.mode == 'Deviation') {
						this.deviationModeData.push(element)
						this.deviationcount = this.deviationModeData.length
					} else if (element.mode == 'Repeat') {
						this.repeatModeData.push(element)
						this.repeatcount = this.repeatModeData.length
					}
				});
			})
		}




		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": parseInt(value),
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": parseInt(value),
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": parseInt(value),
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}

		console.log("Quantity: " + JSON.stringify(this.saveTransactionData))

		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	/** On Change Head type  */
	getSelectedType(value){
    let data = value.split(',')
	   this.savenonSalaryDetailId = data[1]
	   this.savetype = data[0]
	}

	/** On change frequency */
	getSelectedFrequency(value, data) {
		this.svaeDisabledFlag = false
		this.updatefrequency = value
		//console.log(this.updatefrequency)
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
		let length = 0

		if (this.saveTransactionData.length > 0) {
			this.saveTransactionData.forEach((element, index) => {
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": value,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": element.numberOfTransactions,
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": value,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": data.numberOfTransactions,
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": value,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": data.numberOfTransactions,
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}

		console.log("frequency: " + JSON.stringify(this.saveTransactionData))
		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});

	}

	/**on change no of transaction */
	saveNoOfTransaction(value, data) {
		this.svaeDisabledFlag = false
		this.savedNumberOfTransaction = value
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
				if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
					let ind = index;
					this.saveTransactionData.splice(ind, 1, {
						"employeeMasterId": this.selectedEmployeeMasterId,
						"nonSalaryDetailId": element.nonSalaryDetailId,
						"standardName": element.standardName,
						"payrollAreaId": this.payrollAreaId,
						"payrollAreaCode": element.payrollAreaCode,
						"onceEvery": element.onceEvery,
						"frequency": element.frequency,
						"fromDate": element.fromDate,
						"transactionsType": this.selectedTransactionType,
						"numberOfTransactions": parseInt(value),
						"toDate": todate,
						"quantity": element.quantity,
						"uom": element.uom,
						"type": element.type,
						"remark": element.remark,
						"createdBy": "rahul",
						"nonsalaryTransactionGroupDeviationList": element.nonsalaryTransactionGroupDeviationList

					})
				} else {
					let length = this.saveTransactionData.length - 1;
					if (this.saveTransactionData[length].nonSalaryDetailId == this.savenonSalaryDetailId) { return; }
					else {
						this.saveTransactionData.push({
							"employeeMasterId": this.selectedEmployeeMasterId,
							"nonSalaryDetailId": this.savenonSalaryDetailId,
							"standardName": data.headDescription,
							"payrollAreaId": this.payrollAreaId,
							"payrollAreaCode": data.payrollArea,
							"onceEvery": data.onceEvery,
							"frequency": data.frequency,
							"fromDate": data.fromDate,
							"transactionsType": this.selectedTransactionType,
							"numberOfTransactions": parseInt(value),
							"toDate": todate,
							"quantity": data.quantity,
							"uom": data.uom,
							"type": this.savetype,
							"remark": data.remark,
							"createdBy": "rahul",
							"nonsalaryTransactionGroupDeviationList": []

						})
					}
				}
			});
		} else {
			this.saveTransactionData.push({
				"employeeMasterId": this.selectedEmployeeMasterId,
				"nonSalaryDetailId": this.savenonSalaryDetailId,
				"standardName": data.headDescription,
				"payrollAreaId": this.payrollAreaId,
				"payrollAreaCode": data.payrollArea,
				"onceEvery": data.onceEvery,
				"frequency": data.frequency,
				"fromDate": data.fromDate,
				"transactionsType": this.selectedTransactionType,
				"numberOfTransactions": parseInt(value),
				"toDate": todate,
				"quantity": data.quantity,
				"uom": data.uom,
				"type": this.savetype,
				"remark": data.remark,
				"createdBy": "rahul",
				"nonsalaryTransactionGroupDeviationList": []

			})
		}

		console.log("No Of transaction: " + JSON.stringify(this.saveTransactionData))

		this.saveTransactionData.forEach(element => {
			if(element.onceEvery == '' || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.nonSalaryDetailId == '' || this.savenonSalaryDetailId == ''){
				this.svaeDisabledFlag = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == ''){
					this.svaeDisabledFlag = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.svaeDisabledFlag = true
				}
			}


		});
	}

	/** Open referal popup */
	openReferalPopup(referalPopup: TemplateRef<any>, data) {
		this.modalRef = this.modalService.show(
			referalPopup,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
		this.getAllEmployeeDetails();
	}

	/** referal employee code */
	getEmployeeCode(empcode) {
		this.employeeData.forEach(element => {
			// console.log(element.employeeCode)
			if (element.employeeCode == empcode) {
				this.refemployeeCode = element.employeeCode
				this.refemployeeName = element.fullName
				this.refralemployeeMasterId = element.employeeMasterId

				this.nonRecService.getEmployeeWisePayrollList(this.refralemployeeMasterId).subscribe(
					res => {
						this.refralPayrollListData = res.data.results[0];
					})
			}
		});
	}

	getEmployeePayrollArea(value) {
		this.refPayrolArea = value
	}

	/** save deviation remark data */
	deviationRemark(remark, deviationdata) {
		this.devationRemarkText = remark;
		this.selectedDeviationdata = deviationdata
		console.log(JSON.stringify(this.selectedDeviationdata) + " :this.selectedDeviationdata")
	}

	/**save repeat remark data */
	repeatRemark(remark, remarkdata) {
		this.repeatRemarkText = remark;
		this.selectedDeviationdata = remarkdata
	}

	saveDeviationRepeatData(selectedDevData) {
		let remark = ''
		if (this.selectedDeviationdata.mode == 'Deviation') {
			remark = this.devationRemarkText
		} else {
			remark = this.repeatRemarkText
		}

		let obj = {
			"deviationAmount": this.selectedDeviationdata.deviationAmount,
			"mode": this.selectedDeviationdata.mode,
			"deviationType": this.selectedDeviationdata.deviationType,
			"deviationRemark": remark,
			"deviationStatus": this.selectedDeviationdata.status,
			"deviationAmountLimit": this.selectedDeviationdata.deviationAmountLimit
		}
		this.nonsalaryTransactionGroupDeviationList.push(obj)

		this.saveTransactionData.forEach((element, index) => {
			if (element.nonSalaryDetailId == this.savenonSalaryDetailId) {
				let ind = index;
				this.saveTransactionData.splice(ind, 1, {
					"employeeMasterId": this.selectedEmployeeMasterId,
					"nonSalaryDetailId": element.nonSalaryDetailId,
					"standardName": element.standardName,
					"payrollAreaId": this.payrollAreaId,
					"payrollAreaCode": element.payrollAreaCode,
					"onceEvery": element.onceEvery,
					"frequency": element.frequency,
					"fromDate": element.fromDate,
					"transactionsType": this.selectedTransactionType,
					"numberOfTransactions": element.numberOfTransactions,
					"toDate": element.toDate,
					"quantity": element.quantity,
					"uom": element.uom,
					"type": element.type,
					"remark": element.remark,
					"createdBy": "rahul",
					"nonsalaryTransactionGroupDeviationList": this.nonsalaryTransactionGroupDeviationList

				})
			}
		})

		console.log("this.saveTransactionData: " + JSON.stringify(this.saveTransactionData))
	}

	/** save transaction data */
	NonRecurringTransactionGroup() {
		console.log(JSON.stringify(this.saveTransactionData))
		this.nonRecQtyService.NonSalaryTransactionGroup(this.saveTransactionData).subscribe(
			res => {
				this.toaster.sweetalertMasterSuccess("", "Transaction Saved Successfully")
				this.saveTransactionData = [];

				this.indexId = 1;
				this.navigateSummary()

			}
		)
	}

	deviationPopupOpen(deviationPopup: TemplateRef<any>, data, rowindex) {
		if (data.deviationCount > 0) {
			this.modalRef = this.modalService.show(
				deviationPopup,
				Object.assign({}, {
					class: 'gray modal-xl'
				})
			);
			this.selectedDevData = data;
			console.log(this.selectedDevData)
		}
	}


	/** Reset Function Transaction Form */
	resetTransactionForm(){
		this.NonRecurringTransactionGroupAPIEmpwiseData = null;
		this.NonRecurringTransactionGroupAPIEmpwise()
	}


	/********************** Schedule Tab click - edit schedule ***********************/

	/** Click on Edit Schedule Button */
	editScheduleData() {
		if (this.selectedEmpData.length > 0) {
			this.index = 0;
			this.indexId = 3
			this.editScheduleFlag = true;
			this.nonSalaryTransactionGroupId = this.selectedEmpData[this.index].nonSalaryTransactionGroupId
			// console.log(this.selectedEmpData[this.index])
			this.NonRecurringTransactionScheduleEMP()

		} else {
			this.toaster.sweetalertWarning("Please select atleast one employee")
		}
	}

	getRescheduleInfo(summarydata) {
		const formData = new FormData();
		formData.append('nonRecurringTransactionScheduleId', summarydata.nonRecurringTransactionScheduleId)
		formData.append('nonRecurringTransactionGroupId', summarydata.nonRecurringTransactionGroupId)

		this.nonRecService.NonRecurringTransactionScheduleRemarkHistorybyScheduleId(formData).subscribe(
			res => {
				if (res.data.results[0].transactionDate != null) {
					this.originalTransactionDate = res.data.results[0].transactionDate
					this.isReschedule = true;
				} else {
					this.isReschedule = false;
				}
			});



		return this.isReschedule;

	}

	getAllScheduleData() {
		this.indexId = 3
		this.editScheduleFlag = false;
		this.nonRecQtyService.getAllScheduleData().subscribe(res => {
			this.AllNonRecurringTransactionScheduledData = res.data.results;
			this.AllNonRecurringTransactionScheduledData.forEach(data => {
				this.summeryData.forEach(element => {
					if (element.nonRecurringTransactionGroupId == data.nonRecurringTransactionGroupId) {
						data.employeeMasterResponseDTO = element.employeeMasterResponseDTO
						data.payrollArea = element.payrollArea
						data.payrollHeadMaster = element.payrollHeadMaster
					}
				});
			});
			this.AllNonRecurringTransactionScheduledData.forEach(element => {
				if (element.processedAmount != null || element.processedAmount != '') {
					element.isDisabledFlag = true;
				}
				if (element.processedAmount == null || element.processedAmount == '') {
					element.isDisabledFlag = false;
				}
			});

		})
	}

	/** get hold value for update schedule */
	getHoldScheduleValue(event, scheduleData, index) {
		this.selectedHoldIndex = index;
		if (event.checked) {
			this.hold = 1
			this.NonRecurringTransactionScheduleEMPdData[index].hold = true
		} else {
			this.hold = 0
			this.NonRecurringTransactionScheduleEMPdData[index].hold = false
			if (this.editScheduleFlag == false) {
				this.AllNonRecurringTransactionScheduledData.forEach((element, index) => {
					if (index == this.selectedHoldIndex) {
						element.hold = false
					}
				});
			} else {
				this.NonRecurringTransactionScheduleEMPdData.forEach((element, index) => {
					if (index == this.selectedHoldIndex) {
						element.hold = false
					}
				});
			}
		}



		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonSalaryTransactionScheduleId": element.nonSalaryTransactionScheduleId,
						"hold": this.hold,
						"discard": element.discard,
						"resheduleDate": element.resheduleDate,
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
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
				"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
				"hold": this.hold,
				"discard": scheduleData.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": scheduleData.remark
			})
		}

	}

	/** get discard value for update schedule */
	getDiscardScheduleValue(event, scheduleData, index) {
		this.selecteddiscardIndex = index;
		if (event.checked) {
			this.discard = 1
			this.NonRecurringTransactionScheduleEMPdData[index].discard = true

		} else {
			this.discard = 0
			this.NonRecurringTransactionScheduleEMPdData[index].discard = false

			if (this.editScheduleFlag == false) {
				this.AllNonRecurringTransactionScheduledData.forEach((element, index) => {
					if (index == this.selecteddiscardIndex) {
						element.discard = false
					}
				});
			} else {
				this.NonRecurringTransactionScheduleEMPdData.forEach((element, index) => {
					if (index == this.selecteddiscardIndex) {
						element.discard = false
					}
				});
			}
		}
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonSalaryTransactionScheduleId": element.nonSalaryTransactionScheduleId,
						"hold": element.hold,
						"discard": this.discard,
						"resheduleDate": element.resheduleDate,
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
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
				"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
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
				if (element.nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonSalaryTransactionScheduleId": element.nonSalaryTransactionScheduleId,
						"hold": element.hold,
						"discard": element.discard,
						"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
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
				"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
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
				if (element.nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"nonSalaryTransactionScheduleId": element.nonSalaryTransactionScheduleId,
						"hold": element.hold,
						"discard": element.discard,
						"resheduleDate": element.resheduleDate,
						"remark": remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].nonSalaryTransactionScheduleId == scheduleData.nonSalaryTransactionScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
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
				"nonSalaryTransactionScheduleId": scheduleData.nonSalaryTransactionScheduleId,
				"hold": scheduleData.hold,
				"discard": scheduleData.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": remark
			})
		}
	}

	/** Update Schedule data */
	NonRecurringTransactionScheduleupdateById() {
		console.log(JSON.stringify(this.updateScheduleData))
		this.nonRecQtyService.NonRecurringSalaryScheduleupdateById(this.updateScheduleData).subscribe(
			res => {
				this.toaster.sweetalertMasterSuccess("", "Transaction Schedule updated successfully")
				if (this.editScheduleFlag) {
					this.NonRecurringTransactionScheduleEMP()
					this.updateScheduleData = []
				} else {
					this.getAllScheduleData()
					this.updateScheduleData = []
				}
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
		this.originalTransactionDate = this.viewScheduleData.transactionDate
		if (!this.editScheduleFlag) {
			this.scheduleAllData = this.viewScheduleData
		}
		//	this.selectedEmpData[this.index] = scheduleData
		this.nonSalaryTransactionScheduleId = scheduleData.nonSalaryTransactionScheduleId
		this.nonSalaryTransactionGroupId = scheduleData.nonSalaryTransactionGroupId
		this.NonRecurringTransactionScheduleRemarkHistorybyScheduleId()

	}

	/** Schedule Data on popup*/
	NonRecurringTransactionScheduleRemarkHistorybyScheduleId() {

		const formData = new FormData();
		formData.append('nonSalaryTransactionScheduleId', this.nonSalaryTransactionScheduleId)
		formData.append('nonSalaryTransactionGroupId', this.nonSalaryTransactionGroupId)

		this.nonRecQtyService.NonSalaryTransactionScheduleRemarkHistorybyScheduleId(formData).subscribe(
			res => {
				this.NonRecurringHistorybyScheduleIdData = res.data.results;
				this.NonRecurringHistorybyScheduleIdData.forEach(element => {
					if (element.transactionDate != null) {
						this.originalTransactionDate = element.transactionDate
					}
				});

			}
		)
	}

	cancelBtn() {
		this.navigateSummary()
	}


	/** Excel donload summary and Schedule page */

	SummaryexportAsXLSX(): void {
		this.excelData = [];
		let headers = []
		headers = ["Emp. Code","Emp. Name","Payroll Area","NR Qty Head","Type","Group Id","Once Every","Frequency","Quantity","UOM","From Date","To Date","Remark","Approval Status","Created By","Created Date"]
		this.summeryData.forEach(element => {
			let obj = {
				"Emp. Code": element.employeeMasterResponseDTO.employeeCode,
				"Emp. Name": element.employeeMasterResponseDTO.fullName,
				"Payroll Area": element.payrollAreaCode,
				"NR Qty Head": element.nonSalaryDTO.code,
				"Type": element.type,
				"Group Id": element.nonSalaryTransactionGroupId,
				"Once Every": element.onceEvery,
				"Frequency": element.frequency,
				"Quantity": element.quantity,
				"UOM": element.uom,
				"From Date": element.fromDate,
				"To Date": element.toDate,
				"Remark": element.remark,
				"Approval Status": 'Pending',
				"Created By": element.createdBy,
				"Created Date": element.createDateTime
			}
			this.excelData.push(obj)
		});
		this.excelservice.exportAsExcelFilewithHeaders(this.excelData, 'NonRecurring-Quantity-Summary','NonRecurring-Quantity-Summary',headers);
	}


	AllScheduleExportAsXLSX(): void {
		this.excelData = [];
		let headers = []
		headers = ["Emp. Code","Emp. Name","Payroll Area","NR Qty Head","Group Id","Schedule Id","Schedule Date","Schedule Date","Quantity","Schedule Amount","Processed Amount","Balance Amount","Processing Cycle","Created By","Created Date"]
		this.AllNonRecurringTransactionScheduledData.forEach(element => {
			let obj = {
				"Emp. Code": element.employeeMasterResponseDTO.employeeCode,
				"Emp. Name": element.employeeMasterResponseDTO.fullName,
				"Payroll Area": element.payrollArea.payrollAreaCode,
				"Head": element.head,
				"Group Id": element.nonSalaryTransactionGroupId,
				"Schedule Id": element.nonSalaryTransactionScheduleId,
				"Schedule Date": this.datepipe.transform(element.transactionDate, 'dd-MMM-yyyy'),
				"Quantity": element.quantity,
				"Schedule Amount": element.transactionAmount,
				"Processed Amount": element.processedAmount,
				"Balance Amount": element.transactionAmount,
				"Processing Cycle": element.cycleName,
				"Created By": element.createdBy,
				"Created Date": element.createDateTime
			}
			this.excelData.push(obj)
		});
		//this.excelData = this.AllNonRecurringTransactionScheduledData
		this.excelservice.exportAsExcelFilewithHeaders(this.excelData, 'NonRecurring-Quantity-All-Schedules','NonRecurring-Quantity-All-Schedules',headers);
	}


	ScheduleExportAsXLSX(): void {
		this.excelData = [];
		let headers = []
		headers = ["Emp. Code","Emp. Name","Payroll Area","NR Qty Head","Group Id","Schedule Id","Schedule Date","Schedule Date","Quantity","Schedule Amount","Processed Amount","Balance Amount","Processing Cycle","Created By","Created Date"]
		this.NonRecurringTransactionScheduleEMPdData.forEach(element => {
			let obj = {
				"Emp. Code": this.selectedEmpData[this.index].employeeMasterResponseDTO.employeeCode,
				"Emp. Name": this.selectedEmpData[this.index].employeeMasterResponseDTO.fullName,
				"Payroll Area": this.selectedEmpData[this.index].payrollArea.payrollAreaCode,
				"NR Qty Head": this.selectedEmpData[this.index].nonSalaryDTO.description,
				"Group Id": element.nonSalaryTransactionGroupId,
				"Schedule Id": element.nonSalaryTransactionScheduleId,
				"Schedule Date": this.datepipe.transform(element.transactionDate, 'dd-MMM-yyyy'),
				"Quantity": element.quantity,
				"Schedule Amount": element.transactionAmount,
				"Processed Amount": element.processedAmount,
				"Balance Amount": element.transactionAmount,
				"Processing Cycle": element.cycleName,
				"Created By": element.createdBy,
				"Created Date": element.createDateTime
			}
			this.excelData.push(obj)
		});
		//this.excelData = this.NonRecurringTransactionScheduleEMPdData
		//this.excelservice.exportAsExcelFile(this.excelData, 'NonRecurring-Quantity-Schedules');
		this.excelservice.exportAsExcelFilewithHeaders(this.excelData, 'NonRecurring-Quantity-Schedules','NonRecurring-Quantity-Schedules',headers);

	}


	/** Selected Employee basic information expand and colapse */
	visibleempdetails(){
		this.isvisible = true;
	}
	hideempdetails(){
		this.isvisible=false;
	}

	/** search popup */
	graysearch(grays: TemplateRef<any>){
		this.modalRef = this.modalService.show(
			grays,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
	}
}
