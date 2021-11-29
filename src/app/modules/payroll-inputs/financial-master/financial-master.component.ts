import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GarnishmentService } from '../garnishment-master/garnishment.service';
import { PayrollInputsService } from '../payroll-inputs.service';
import { FinancialMasterService } from './financial-master.service';
import { NonRecurringAmtService } from '../non-recurring-amt.service';



@Component({
  selector: 'app-financial-master',
  templateUrl: './financial-master.component.html',
  styleUrls: ['./financial-master.component.scss']
})


export class FinancialMasterComponent implements OnInit {
  @Input() public data: any;

  public masterGridData: Array<any> = [];
  public recievedMasterGridData: Array<any> = [];
  public historyArrayData: Array<any> = [];
  public employeeId: any;
  public employeeDetails: EmployeeMasterDetails;

  // public masterGridData1 :any;
  public changeValueFlag = true;
  public changePercentageFlag = true;
  public closingAmountFlag = true;
  public headsFlag: Array<boolean> = [];
  public headField = 1;
  public updationField: number = 3;
  public currency = '';
  public frequency = '';
  public updateMasterFromDate: any;
  public updateMasterToDate: any;
  public employeeListsArray = [];
  public employeeListIndex = 0;
  public modalRef: BsModalRef;
  public headDescriptionName: string;
  selectedOption: string = 'single';
  payrollListEmpData: any;
  selectedPayrollArea: any;
  payrollAreaId: any;
  headData: { displayName: string; headMasterId: number; }[];
  selectedUpdationField: any;
  slectedFromDate: any;
  slectedToDate: any = '31-12-9999';
  saveFastEntrydata: any = [];
  headMasterId: any;
  changeAmountVal: any = 0;
  changePercenatgeVal: any = 0;
  closingAmtVal: any = 0;
  tabledata: any = [];
  index: number;
  employeeData: any;
  payrollListData: string;
  employeeFinDetailsData: any[];
  selectedEmployeeMasterId: number;
  headType: any;
  summaryData: any;

  constructor(private service: FinancialMasterService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private commonService: PayrollInputsService,
    private garnishmentService: GarnishmentService,
    private alerService : AlertServiceService,
    private nonRecService: NonRecurringAmtService,
    private router: Router
  ) {

    if (localStorage.getItem('payrollListEmpData') != null) {
      this.index = 0
      this.payrollListEmpData = JSON.parse(localStorage.getItem('payrollListEmpData'))
      // localStorage.removeItem('payrollListEmpData')
      this.getSelectedEmployeeCode(this.payrollListEmpData[0].employeeMasterId)
      this.selectedPayrollArea = this.payrollListEmpData[this.index].payrollAreaCode
      this.payrollAreaId = this.payrollListEmpData[this.index].payrollAreaId

    }

    this.headData = [
      { displayName: 'Incentive', headMasterId: 27 },
      { displayName: 'Performance_Incentive', headMasterId: 29 },
    ]

    this.headData = []

    const formdata = new FormData();
    formdata.append('categoryName', 'FinancialMaster');

    this.garnishmentService.payrollheadmaster(formdata).subscribe(res =>{
      res.data.results.forEach(element => {
        this.headData.push({
          'headMasterId':element.headMasterId,
          'displayName': element.displayName
        })
      });
    })
  }

  public ngOnInit(): void {
   
    this.getAllSummarydata();

    this.getCurrencyDetails();
    this.getEmployeeDetails(1);
    this.getAllEmployeeDetails()
    this.summaryPage();
    this.changeValueFlag = true;
    this.changePercentageFlag = true;
    this.closingAmountFlag = false;
  }

  /** get all sumary data for all employess */
  getAllSummarydata(){
    this.service.getAllSummarydata().subscribe(res =>{
      this.summaryData = res.data.results;
    })
  }

  /** Get Selected Employee master Id */
	getSelectedEmployeeCode(value) {
		this.payrollListData = ''
		this.employeeFinDetailsData = []
		this.selectedEmployeeMasterId = parseInt(value)
		console.log(this.selectedPayrollArea)
		if (this.selectedPayrollArea != '') {
			this.nonRecService.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
				res => {
					this.employeeFinDetailsData = res.data.results[0][0];
				}
			)
		}
		// this.payrollAssigned()
	}


  /** Get all  Employee data */
	getAllEmployeeDetails(): void {
		this.commonService.getAllEmployeeDetails().subscribe((res) => {
			this.employeeData = res.data.results[0];
		});
	}


  /** get Selected Payroll Area from Dropdown */
	getSelectedPayrollArea(value) {
		// this.employeeFinDetailsData = []
		// this.selectedPayrollArea = value;
		// this.payrollListData.forEach(element => {
		// 	if(element.payrollAreaCode == value){
		// 		this.payrollAreaId = element.payrollAreaId
		// 	}
		// });
		// if (this.selectedEmployeeMasterId != '') {

		// 	this.nonRecService.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
		// 		res => {
		// 			this.employeeFinDetailsData = res.data.results[0][0];
		// 		}
		// 	)
		// }
	}


  // ---------------------Summary ----------------------
  // Summary get Call
  public summaryPage(): void {
    this.masterGridData = [];
    this.headsFlag = [];
    // const empId = this.employeeListsArray[this.employeeListIndex];
    const empId = this.payrollListEmpData[this.index].employeeMasterId;
    this.service.getAllRecords(empId).subscribe((res) => {
      // console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.setInitialClosingAmount();
      this.recievedMasterGridData = this.masterGridData.map((x) => Object.assign({}, x));
      this.setHeadFlagAuto();
      if (this.masterGridData[this.index].openingAmount === 0) {
        this.updationField = 3;
        this.setHeadFlag('Yes');
      }
      // console.log('masterGridData::', this.masterGridData);
    });
  }

  public getEmployeeDetails(index): void {
    // const id = this.employeeListsArray[index]
    const id = this.payrollListEmpData[this.index].employeeMasterId; // this.employeeId
    this.service.getEmployeeDetails(id).subscribe((res) => {
      // console.log('Employee Details::', res.data.results[0]);
      this.employeeDetails = res.data.results[0][0];
    });
  }

  public getCurrencyDetails(): void {
    // const id = this.employeeListsArray[ this.employeeListIndex]
    const id = this.payrollListEmpData[this.index].employeeMasterId;

    this.service.getCurrencyDetails(id).subscribe((res) => {
      // console.log('Currency::', res.data.results);
      this.currency = res.data.results[0].currency;
      const frequencyId = res.data.results[0].businessCycleDefinitionId;
      this.getFrequencyMaster(frequencyId);
    });
  }

  public getFrequencyMaster(id): void {
    // this.service.getFrequencyMaster(id).subscribe((res) => {
    //   this.frequency = res.data.results[0].name;
    //   // console.log('Frequency List', res);
    // });
  }

  public setInitialClosingAmount(): void {
    this.masterGridData.forEach((ele) => {
      ele.closingAmount = ele.openingAmount;
    });
  }
  public getUpdationField(evt): void {
    this.changeValueFlag = true;
      this.changePercentageFlag = true;
      this.closingAmountFlag = true;

    if (evt === 1) {
      this.changeValueFlag = false;
      this.changePercentageFlag = true;
      this.closingAmountFlag = true;
    } else if (evt === 2) {
      this.changeValueFlag = true;
      this.changePercentageFlag = false;
      this.closingAmountFlag = true;
    } else if (evt === 3) {
      this.changeValueFlag = true;
      this.changePercentageFlag = true;
      this.closingAmountFlag = false;
    } else {
      this.changeValueFlag = true;
      this.changePercentageFlag = true;
      this.closingAmountFlag = true;
    }

  }

  public copyDateFromUpdteMaster(i): void {
    // console.log(this.updateMasterFromDate);
    this.masterGridData[i].fromdate = this.updateMasterFromDate;
    this.masterGridData[i].todate = this.updateMasterToDate;
    // console.log(this.updateMasterFromDate);
  }

  public onChangeValueCalculation(rowIndex): void {
    const openingAmount = this.masterGridData[rowIndex].openingAmount;
    if (openingAmount === 0) {
      return;
    }
    const changeValue = this.masterGridData[rowIndex].changeValue;
    const closingAmount = changeValue + openingAmount;
    let changePercenatge = (changeValue * 100) / openingAmount;
    changePercenatge = Math.fround(changePercenatge);
    this.masterGridData[rowIndex].changePercenatge = changePercenatge;
    this.masterGridData[rowIndex].closingAmount = closingAmount;

  }

  public onChangePercentageCalculation(rowIndex): void {
    const openingAmount = this.masterGridData[rowIndex].openingAmount;
    if (openingAmount === 0) {
      return;
    }
    const changePercenatge = this.masterGridData[rowIndex].changePercenatge;
    const changeValue = (changePercenatge * openingAmount) / 100;
    const closingAmount = openingAmount + changeValue;
    this.masterGridData[rowIndex].changeValue = changeValue;
    this.masterGridData[rowIndex].closingAmount = closingAmount;

  }

  public onChangeClosingAmountCalculation(rowIndex): void {
    const openingAmount = this.masterGridData[rowIndex].openingAmount;
    if (openingAmount === 0) {
      return;
    }
    const closingAmount = this.masterGridData[rowIndex].closingAmount;
    const changeValue = closingAmount - openingAmount;
    const changePercenatge = (changeValue * 100) / openingAmount;
    this.masterGridData[rowIndex].changeValue = changeValue;
    this.masterGridData[rowIndex].changePercenatge = changePercenatge;
  }

  public selectedInputHeads(): void {
    this.headsFlag = [];
    this.headField === 1 ? this.setHeadFlag('Yes') :
      this.headField === 2 ? this.setHeadFlagAuto() : this.setHeadFlag('');
    // console.log(this.masterGridData);
  }

  public setHeadFlag(isPEIRecord): void {
    let i = 1;
    this.masterGridData.forEach((ele) => {
      if (ele.isPEIRecord === isPEIRecord) {
        ele.srNo = i++;
        this.headsFlag.push(true);
      } else {
        this.headsFlag.push(false);
      }
    });
  }

  public setHeadFlagAuto(): void {
    this.masterGridData.forEach((ele, index) => {
      ele.srNo = index + 1;
      this.headsFlag.push(true);
    });
  }

  public submit(): void {
    // console.log(' save', this.masterGridData);
    // console.log(' save2', this.recievedMasterGridData);
    const data = [];
    // const empId = this.employeeListsArray[this.employeeListIndex];
    const empId = this.payrollListEmpData[this.index].employeeMasterId;
    for (let i = 0; i < this.masterGridData.length; i++) {
      if (this.masterGridData[i].isPEIRecord === 'Yes') {
        this.masterGridData[i].fromdate = this.datePipe.transform(
          this.masterGridData[i].fromdate,
          'yyyy-MM-dd',
        );
        this.masterGridData[i].todate = this.datePipe.transform(
          this.masterGridData[i].todate,
          'yyyy-MM-dd',
        );
        // const tempDate = '2020-10-05';
        const tempDate2 = '9999-12-31';
        let changeValue = 0;
        let changePercenatge = 0;
        let closingAmount = 0;
        if (this.changeValueFlag === false) {
          if (parseInt(this.masterGridData[i].changeValue) !== this.recievedMasterGridData[i].changeValue) {
            changeValue = this.masterGridData[i].changeValue;
            // data.push(this.submitDataPush(i, data, changePercenatge, changeValue, closingAmount));
            data.push({
              changePercenatge,
              changeValue,
              employeeId: empId,
              // fromdate: tempDate,
              fromDate: this.masterGridData[i].fromdate,
              headMasterId: this.masterGridData[i].id,
              payrollAreaId: 1,
              toDate: tempDate2,
              // toDate: this.masterGridData[i].todate,
              value: closingAmount,
            });
          }
        } else if (this.changePercentageFlag === false) {
          if (parseInt(this.masterGridData[i].changePercenatge) !== this.recievedMasterGridData[i].changePercenatge) {
            changePercenatge = this.masterGridData[i].changePercenatge;
            data.push({
              changePercenatge,
              changeValue,
              employeeId: empId,
              // fromdate: tempDate,
              fromDate: this.masterGridData[i].fromdate,
              headMasterId: this.masterGridData[i].id,
              payrollAreaId: 1,
              toDate: tempDate2,
              // toDate: this.masterGridData[i].todate,
              value: closingAmount,
            });
          }
        } else {
          if (parseInt(this.masterGridData[i].closingAmount) !== this.recievedMasterGridData[i].closingAmount) {
            closingAmount = this.masterGridData[i].closingAmount;
            data.push({
              changePercenatge,
              changeValue,
              employeeId: empId,
              // fromdate: tempDate,
              fromDate: this.masterGridData[i].fromdate,
              headMasterId: this.masterGridData[i].id,
              payrollAreaId: 1,
              toDate: tempDate2,
              // toDate: this.masterGridData[i].todate,
              value: closingAmount,
            });
          }
        }

      }

    }

    // console.log(data);
    this.service.postfinancialMaster(data).subscribe((res) => {
      // console.log(res);
      this.summaryPage();
    });

  }

  public submitDataPush(i, data, changePercenatge, changeValue, closingAmount): void {
    data = {
      changePercenatge,
      changeValue,
      employeeId: 1,
      // fromdate: tempDate,
      fromDate: this.masterGridData[i].fromdate,
      headMasterId: this.masterGridData[i].id,
      payrollAreaId: 1,
      // todate: tempDate2,
      toDate: this.masterGridData[i].todate,
      value: closingAmount,
    };
    // console.log(data);
    return data;
  }

  ViewHistory(template1: TemplateRef<any>, id, data): void {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' }),
    );
    console.log(data)

    const empId = this.employeeDetails.employeeMasterId.toString();
    this.headDescriptionName = data.headDescription;
    this.headType = data.headType;
   

    let formData = new FormData();
    formData.append('employeeMasterId',empId)
    formData.append('payrollArea',this.selectedPayrollArea )
    formData.append('HeadId',id)

    this.service.getfinancialmasterHeadHistory(formData).subscribe((res) => {
      // console.log(res);
      this.historyArrayData = res.data.results;
    });

  }

  saveAndNext() {
    this.employeeListIndex = this.employeeListIndex + 1;
    this.index = this.index +1
    //const empId = this.employeeListsArray[this.employeeListIndex];
    const empId = this.payrollListEmpData[this.index].employeeMasterId;
    this.getEmployeeDetails(empId);
    this.summaryPage();
  }


  /** on Click on toggle Button */
  getSelectedOption(event) {
    if (event.checked) {
      this.selectedOption = 'fastEntry'
    } else {
      this.selectedOption = 'single'
    }
  }



  /** Fast Entry Code */
  getSelectedUpdationField(value) {
    this.selectedUpdationField = value
  }

  getFromDate(event){
    this.slectedFromDate = event
  }

  getToDate(event){
    this.slectedToDate = event
  }

  getFastEntryHeader(value){
    this.headMasterId = value
  }

  getAllFastEntryData(){
    this.payrollListEmpData.forEach(element => {
      this.saveFastEntrydata.push({
        "employeeId": element.employeeMasterId,
        "payrollAreaId":element.payrollAreaId,
        "headMasterId": this.headMasterId,
        "value":parseInt(this.closingAmtVal),
        "changeValue":parseInt(this.changeAmountVal),
        "changePercenatge":parseInt(this.changePercenatgeVal),
        "fromDate": this.datePipe.transform(this.slectedFromDate,'yyyy-MM-dd'),
        "toDate": "9999-12-31"
      })


      this.tabledata.push({
        "employeeId": element.employeeMasterId,
        "employeeName": element.fullName,
        "employeeCode": element.employeeCode,
        "PayrollAreaName": element.payrollAreaCode,
        "payrollAreaId":element.payrollAreaId,
        "updationField":this.selectedUpdationField,
        "headMasterId": this.headMasterId,
        "value":this.closingAmtVal,
        "changeValue":this.changeAmountVal,
        "changePercenatge":this.changePercenatgeVal,
        "fromDate": this.datePipe.transform(this.slectedFromDate,'yyyy-MM-dd'),
        "toDate": "9999-12-31"
      })
    });
    
  }


  saveFastEntry(){
    this.service.postfinancialMaster(this.saveFastEntrydata).subscribe(res =>{
      this.alerService.sweetalertMasterSuccess("","Financial Master saved succesfully")
    })
  }

}

export class EmployeeMasterDetails {
  public employeeMasterId: number;
  public fullName: string;
  public value: number;
  public designation1Description: string;
  public employeeCode: number;
  public joiningDate: string;
  public gradeDescription: string;
  public description: string;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
