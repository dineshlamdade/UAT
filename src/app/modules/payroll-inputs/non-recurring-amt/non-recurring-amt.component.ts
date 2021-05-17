import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PayrollInputsService } from '../payroll-inputs.service';



export interface scheduledata {
	ssrno;
	sempcode;
	sempname;
	spayrollarea;
	shead;
	sgroupid;
	schno;
	schdate;
	schamount;
	processedamount;
	balamount;
	processingcycle;
	hold;
	discard;
	rescheduledate;
	approvalstatus;
	remark;
}
@Component({
	selector: 'app-non-recurring-amt',
	templateUrl: './non-recurring-amt.component.html',
	styleUrls: ['./non-recurring-amt.component.scss'],

})
export class NonRecurringAmtComponent implements OnInit {

	public modalRef: BsModalRef;
	frozenCols: any[];
	ScheduleData: scheduledata[];
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
	openingAmount: string ='';
	remark: any = '';
	standardName: any;
	selectedPayrollArea: any = '';
	editScheduleFlag: boolean = false;
	selectedEmployeeMasterId: any = '';
	employeeData: any;

	constructor(private modalService: BsModalService, private nonRecService: NonRecurringAmtService,
		private toaster: ToastrService, private datepipe: DatePipe,
		private payrollservice: PayrollInputsService) { }

	ngOnInit() {

		this.ScheduleData = [{
			ssrno: '1',
			sempcode: '001',
			sempname: 'Jhon',
			spayrollarea: 'PA_01',
			shead: 'H1',
			sgroupid: 'G1',
			schno: 'sch1',
			schdate: '12-Apr-2018',
			schamount: '2,000.00',
			processedamount: '2,000.00',
			balamount: '0.00',
			processingcycle: 'Cycle1',
			hold: '',
			discard: '',
			rescheduledate: '',
			approvalstatus: '',
			remark: '',
		},
		{
			ssrno: '2',
			sempcode: '002',
			sempname: 'Thor',
			spayrollarea: 'PA_02',
			shead: 'H2',
			sgroupid: 'G2',
			schno: 'sch2',
			schdate: '12-Apr-2020',
			schamount: '2,000.00',
			processedamount: '2,000.00',
			balamount: '0.00',
			processingcycle: 'Cycle1',
			hold: '',
			discard: '',
			rescheduledate: '',
			approvalstatus: '',
			remark: '',
		},
		{
			ssrno: '3',
			sempcode: '003',
			sempname: 'Ram',
			spayrollarea: 'PA_03',
			shead: 'H3',
			sgroupid: 'G3',
			schno: 'sch3',
			schdate: '12-Apr-2018',
			schamount: '2,000.00',
			processedamount: '2,000.00',
			balamount: '0.00',
			processingcycle: 'Cycle1',
			hold: '',
			discard: '',
			rescheduledate: '',
			approvalstatus: '',
			remark: '',
		},
		{
			ssrno: '4',
			sempcode: '004',
			sempname: 'Sham',
			spayrollarea: 'PA_04',
			shead: 'H4',
			sgroupid: 'G4',
			schno: 'sch4',
			schdate: '12-Apr-2019',
			schamount: '2,000.00',
			processedamount: '2,000.00',
			balamount: '0.00',
			processingcycle: 'Cycle1',
			hold: '',
			discard: '',
			rescheduledate: '',
			approvalstatus: '',
			remark: '',
		},
		];

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
                if(this.editScheduleFlag){
					this.nonRecurringTransactionScheduleId = this.NonRecurringTransactionScheduleEMPdData[0].nonRecurringTransactionScheduleId
			        this.NonRecurringTransactionScheduleRemarkHistorybyScheduleId()
				}
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

	ViewClawbackpopup(template4: TemplateRef<any>){
		this.modalRef = this.modalService.show(
			template4,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
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
				this.numberOfTransactions = transactionData.numberOfTransactions
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
	getTransactionType(transactiontype,index){
       this.selectedTransactionIndex = index;
	   this.selectedTransactionType = transactiontype
	}

	/** Get selected From Date */
	getFromDate(event){
		this.selectedFromDate = this.datepipe.transform(new Date(event),'yyyy-MM-dd') + ' 00:00:00'
	}

	/** Get selected To Date */
	getToDate(event){
		this.selectedToDate = this.datepipe.transform(new Date(event),'yyyy-MM-dd') + ' 00:00:00'
	}

	/** Get entered Once Every */
	getOnceEveryChange(value){
       this.onceEvery = value;
	}

	/** Get entered remark */
	getRemarkChange(value){
		this.remark = value
	}

	/** update single transaction */
    updateSingleTransaction(){
		let todate = "";
		if(this.selectedTransactionType == 'NoOfTransaction'){
			todate = ""
		}else if(this.selectedTransactionType == 'Perpetual'){
           todate = '9999-12-31 00:00:00'
		}else{
			todate = this.selectedToDate;
		}
		if(this.selectedFromDate == ''){
			this.selectedFromDate = this.selectedEmpData[this.index].fromDate
		}
		let data =  {
			"employeeMasterId":this.selectedEmpData[this.index].employeeMasterId,
			"headMasterId":parseInt(this.headMasterId),
			"standardName":this.standardName,
			"payrollAreaId":this.selectedEmpData[this.index].payrollArea.payrollAreaId,
			"payrollAreaCode":this.selectedEmpData[this.index].payrollArea.payrollAreaCode,
			"onceEvery":parseInt(this.onceEvery),
			"frequency":this.selectedEmpData[this.index].frequency,
			"fromDate": this.selectedFromDate,
			"transactionsType": this.selectedTransactionType,
			"numberOfTransactions":parseInt(this.numberOfTransactions),
			"toDate":todate,
			"amount":parseFloat(this.openingAmount),
			"remark":this.remark,
			"createdBy":"rahul"
		}

		console.log("Data is: "+ JSON.stringify(data))
		this.attendanceInputAPIRecordsUI(data)
	}

	/** Update transaction  */
	attendanceInputAPIRecordsUI(data) {

		this.nonRecService.attendanceInputAPIRecordsUI(data, this.selectedEmpData[this.index].nonRecurringTransactionGroupId).subscribe(
			res => {
				this.toaster.success('','Transaction data updated sucessfully')
			}
		)
	}

	/** Save and Next Functionality */
	saveAndNextTransaction(){
		this.updateSingleTransaction()
		this.index = this.index + 1
		this.employeeFinDetails()
		this.NonRecurringTransactionGroupAPIbyId(this.index)
	}


	/******************* Transaction when click on Transaction Tab and select Employee from Dropdown *******************/

	/** Navigate To Transaction Tab on click radio button */
	navigateToTransaction(){
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
	getSelectedPayrollArea(value){
        this.selectedPayrollArea = value;
		if(this.selectedEmployeeMasterId != ''){
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
	getSelectedEmployeeCode(value){
		this.selectedEmployeeMasterId = value
		if(this.selectedPayrollArea != ''){
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
	
	NonRecurringTransactionGroup() {

		let data = {
			"employeeMasterId": 1,
			"headMasterId": 33,
			"standardName": "Incentive",
			"payrollAreaId": "1",
			"payrollAreaCode": "PA-Staff",
			"onceEvery": 1,
			"frequency": "Monthly",
			"fromDate": "2020-04-01 00:00:00",
			"transactionsType": "NoOfTransaction",
			"numberOfTransactions": 10,
			"toDate": "",
			"amount": 600.00,
			"remark": "Abc"
		}

		this.nonRecService.NonRecurringTransactionGroup(data).subscribe(
			res => {
				this.NonRecurringTransactionData = res.data.results;
			}
		)
	}


	
	/*** Schedule Tab click - edit schedule */

	/** Click on Edit Schedule Button */
	editScheduleData(){
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

	/** Schedule Data */
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

	NonRecurringTransactionScheduleupdateById() {

		let data = {
			"nonRecurringTransactionScheduleId": 43,
			"hold": 0,
			"discard": 0,
			"resheduleDate": "2020-04-06",
			"remark": "Test Rahul"
		}

		this.nonRecService.NonRecurringTransactionScheduleupdateById(data).subscribe(
			res => {
				this.NonRecurringTransactionScheduleupdateByIdData = res.data.results;
			}
		)
	}





	ViewScheduleHistory(template3: TemplateRef<any>) {
		this.modalRef = this.modalService.show(
			template3,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
	}
}