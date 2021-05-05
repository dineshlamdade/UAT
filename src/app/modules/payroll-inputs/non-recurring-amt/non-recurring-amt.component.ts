import {Component,OnInit,TemplateRef} from '@angular/core';
import {BsModalRef,BsModalService} from 'ngx-bootstrap/modal';
import {trigger,state,style,transition,animate} from '@angular/animations';
import { NonRecurringAmtService } from '../non-recurring-amt.service';


export interface User1 {
	srno;
	headtype;
	headdesc;
	openingval;
	chngamount;
	closingamt;
	onceevery;
	Frequency;
	FromDate;
	Nooftrans;
	ToDate;
	remark;
}


export interface summarydata {
	empcode;
	empname;
	payrollarea;
	head;
	groupid;
	onceevery;
	frequency;
	amount;
	fromdate;
	todate;
	remark;
	approvalstatus;
}

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

	users1: User1[];
	public modalRef: BsModalRef;
	frozenCols: any[];
	Summarydata: summarydata[];
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
	constructor(private modalService: BsModalService, private nonRecService: NonRecurringAmtService) {}

	ngOnInit() {


		this.users1 = [{
				srno: '1',
				headtype: 'Earning',
				headdesc: 'AAA Desc',
				openingval: '0.00',
				chngamount: '0.00',
				closingamt: '0.00',
				onceevery: '',
				Frequency: 'Monthly',
				FromDate: '12-Apr-2018',
				Nooftrans: '2',
				ToDate: '12-Apr-2020',
				remark: 'Remark1'
			},
			{
				srno: '2',
				headtype: 'Earning',
				headdesc: 'BBB Desc',
				openingval: '0.00',
				chngamount: '0.00',
				closingamt: '0.00',
				onceevery: '',
				Frequency: 'Monthly',
				FromDate: '12-Apr-2018',
				Nooftrans: '2',
				ToDate: '12-Apr-2020',
				remark: 'Remark2'
			},
			{
				srno: '3',
				headtype: 'Earning',
				headdesc: 'CCC Desc',
				openingval: '0.00',
				chngamount: '0.00',
				closingamt: '0.00',
				onceevery: '',
				Frequency: 'Monthly',
				FromDate: '12-Apr-2018',
				Nooftrans: '2',
				ToDate: '12-Apr-2020',
				remark: 'Remark3'
			},
			{
				srno: '4',
				headtype: 'Earning',
				headdesc: 'DDD Desc',
				openingval: '0.00',
				chngamount: '0.00',
				closingamt: '0.00',
				onceevery: '',
				Frequency: 'Monthly',
				FromDate: '12-Apr-2018',
				Nooftrans: '2',
				ToDate: '12-Apr-2020',
				remark: 'Remark4'
			},
		];

		this.Summarydata = [{
				empcode: '1',
				empname: 'Jhon',
				payrollarea: 'PA_01',
				head: 'H1',
				groupid: 'G1',
				onceevery: '',
				frequency: 'Monthly',
				amount: '',
				fromdate: '12-Apr-2018',
				todate: '12-Apr-2020',
				remark: '',
				approvalstatus: ''
			},
			{
				empcode: '2',
				empname: 'Thor',
				payrollarea: 'PA_02',
				head: 'H2',
				groupid: 'G2',
				onceevery: '',
				frequency: 'Monthly',
				amount: '',
				fromdate: '12-Apr-2018',
				todate: '12-Apr-2020',
				remark: '',
				approvalstatus: ''
			},
			{
				empcode: '3',
				empname: 'Ram',
				payrollarea: 'PA_03',
				head: 'H3',
				groupid: 'G3',
				onceevery: '',
				frequency: 'Monthly',
				amount: '',
				fromdate: '12-Apr-2018',
				todate: '12-Apr-2020',
				remark: '',
				approvalstatus: ''
			},
			{
				empcode: '4',
				empname: 'Sham',
				payrollarea: 'PA_04',
				head: 'H4',
				groupid: 'G4',
				onceevery: '',
				frequency: 'Monthly',
				amount: '',
				fromdate: '12-Apr-2018',
				todate: '12-Apr-2020',
				remark: '',
				approvalstatus: ''
			},
		];

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
		console.log("selectedEmpData:", this.selectedEmpData)
	  }
	
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
	


	NonRecurringTransactionGroupSummery(){
		this.nonRecService.NonRecurringTransactionGroupSummery().subscribe(
			res => {
				this.summeryData = res.data.results;
				this.empData = this.summeryData.employeeMasterResponseDTO;
			}
		)
	}


	attendanceInputAPIRecordsUI() {

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

		this.nonRecService.attendanceInputAPIRecordsUI(data, 2).subscribe(
			res => {
				this.attendanceData = res.data.results;
			}
		)
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

	NonRecurringTransactionGroupUI() {

		const formData = new FormData();

		formData.append('employeeMasterId', '1')
		formData.append('payrollArea', 'PA-Staff')


		this.nonRecService.NonRecurringTransactionGroupUI(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupUIData = res.data.results;

			}
		)
	}

	NonRecurringTransactionGroupAPIEmpwise() {

		const formData = new FormData();

		formData.append('employeeMasterId', '1')
		formData.append('payrollArea', 'PA-Staff')


		this.nonRecService.NonRecurringTransactionGroupAPIEmpwise(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupAPIEmpwiseData = res.data.results;

			}
		)
	}

	NonRecurringTransactionGroupAPIbyId() {

		const formData = new FormData();

		formData.append('nonRecurringTransactionGroupId', '3')

		this.nonRecService.NonRecurringTransactionGroupAPIbyId(formData).subscribe(
			res => {
				this.NonRecurringTransactionGroupAPIbyIdData = res.data.results;

			}
		)
	}


	NonRecurringTransactionScheduleEMP() {

		const formData = new FormData();

		formData.append('nonRecurringTransactionGroupId', '3')

		this.nonRecService.NonRecurringTransactionScheduleEMP(formData).subscribe(
			res => {
				this.NonRecurringTransactionScheduleEMPdData = res.data.results;

			}
		)
	}

	NonRecurringTransactionScheduleupdateById() {

		let data = {
      "nonRecurringTransactionScheduleId":43,
      "hold":0,
      "discard":0,
      "resheduleDate":"2020-04-06",
      "remark":"Test Rahul"
		}

		this.nonRecService.NonRecurringTransactionScheduleupdateById(data).subscribe(
			res => {
				this.NonRecurringTransactionScheduleupdateByIdData = res.data.results;
			}
		)
	}

	NonRecurringTransactionScheduleRemarkHistorybyScheduleId() {

		const formData = new FormData();

		formData.append('nonRecurringTransactionScheduleId', '11')
    formData.append('nonRecurringTransactionGroupId', '')

		this.nonRecService.NonRecurringTransactionScheduleupdateById(formData).subscribe(
			res => {
				this.NonRecurringHistorybyScheduleIdData = res.data.results;

			}
		)
	}
 
	NonRecurringTransactionGroupHeadwiseHistory() {

    const formData = new FormData();

		formData.append('employeeMasterId', '1')
    formData.append('headMasterId', '39')
    formData.append('headMasterId', '5')

		this.nonRecService.NonRecurringTransactionGroupHeadwiseHistory(formData).subscribe(
			res => {
				this.NonRecurringHeadwiseHistorydData = res.data.results;
			}
		)
	}  

	ViewHistory(template: TemplateRef < any > ) {
		this.modalRef = this.modalService.show(
			template,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
	}

	ViewTransactionHistory(template1: TemplateRef < any > ) {
		this.modalRef = this.modalService.show(
			template1,
			Object.assign({}, {
				class: 'gray modal-xl'
			})
		);
	}

	ViewScheduleDetail(template2: TemplateRef < any > ) {
		this.modalRef = this.modalService.show(
			template2,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
	}

	ViewScheduleHistory(template3: TemplateRef < any > ) {
		this.modalRef = this.modalService.show(
			template3,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);
	}
}