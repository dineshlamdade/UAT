import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { familyAddressDetailRequestDTO } from '../../employee-master/components/family-information/family-information.model';
import { GarnishmentService } from '../garnishment-master/garnishment.service';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { NonRecurringQtyService } from '../non-recurring-qty.service';
import { PayrollInputsService } from '../payroll-inputs.service';

@Component({
  selector: 'app-fastentry-nr-qty',
  templateUrl: './fastentry-nr-qty.component.html',
  styleUrls: ['./fastentry-nr-qty.component.scss']
})
export class FastentryNrQtyComponent implements OnInit {

  public modalRef: BsModalRef;
  selectedPayrollArea: any = '';
  headData: any[];
  parollArea: any[];
  selectedOnceEvery: any = 1;
  selectedFrequency: any = 'Monthly';
  selectedTransactionType: any = 'NoOfTransaction';
  selectedNoOfTransaction: any = 1;
  nonSalaryDetailId: any = '';
  tableData: any[];
  selectedClawBack: any;
  selectedAmount: any = '';
  selectedRemark: any = '';
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
  selectedTransactionIndex: any;
  clawbackFrequency: any;
  clawbackperiod: number;
  selectedClawbackInputType: any;
  clawbackDate: string;
  selectedApplicableAt: any;
  selectedTransactionClawback: any;
  selectedClawbackRowIndex: any;
  nonsalaryTransactionGroupDeviationList: any = [];
  deviationModeData: any[];
  repeatModeData: any[];
  deviationData: any[];
  deviationcount: number;
  repeatcount: number;
  selectedDevData: any;
  repeatRemarkText: any;
  selectedDeviationdata: any;
  devationRemarkText: any;
  summaryData: any;
  headerMasterId: any = null;
  nonSalaryOptionList: any;
  type: any = '';
  selectedPayrollAreaId: any;
  saveDisabledBtn: boolean = true;
  headMasterId: any = '';

  constructor(private datepipe: DatePipe,
    private nonrecqtyservice: NonRecurringQtyService,
    private payrollservice: PayrollInputsService,
    private nonRecService:NonRecurringAmtService,
    private modalService: BsModalService,
    private garnishmentService: GarnishmentService,
    private toaster: ToastrService) {
    // this.headData = [
    //   { displayName: 'Incentive', headMasterId: 33 },
    //   { displayName: 'Performance_Incentive', headMasterId: 49 },
    // ]

    this.headData = []
    const formdata = new FormData();
    formdata.append('categoryName', 'Non-Recurring-Quantity');
    
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
    this.getEmployeeList();
    this.getMasterSummaryData()
    this.getPayrollAreaList()
  }

  getMasterSummaryData() {
    this.nonrecqtyservice.NonRecurringnonsalary().subscribe(res => {
      this.summaryData = res.data.results
    })
  }

  getEmployeeList() {
    this.payrollEmployeeData = []
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
      this.employeeData = res.data.results[0];
      // for(let i=0; i <= 5; i++){
      //   this.payrollEmployeeData.push(this.employeeData[i])
      // }
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

  getTransactionType(transactiontype) {
    this.selectedTransactionType = transactiontype
    this.saveTransactionType = transactiontype
    if (this.selectedTransactionType == 'NoOfTransaction') {
      this.selectedToDate = ''
      this.saveToDate = ''
      this.selectedNoOfTransaction = 1
      this.saveNumberTransaction = 1
    } else if (this.selectedTransactionType == 'Perpetual') {
      this.selectedToDate = '9999-12-31 00:00:00'
      this.saveToDate = '9999-12-31 00:00:00'
      this.selectedNoOfTransaction = null
      this.saveNumberTransaction = null
    } else {
      this.selectedNoOfTransaction = null
      this.saveNumberTransaction = null
    }
  }

  getSelectedHead(headid) {
    this.nonSalaryDetailId = parseInt(headid)
    this.summaryData.forEach(ele => {
      if (ele.nonSalaryDetailId == headid) {
        this.headDescription = ele.code
        this.nonSalaryOptionList = ele.nonSalaryOptionList
      }
    })
  }

  getSelectedHeadType(type){
    this.type = type;
  }

  getEDHeader(id){
    this.headerMasterId = id
    this.headData.forEach(ele => {
      if (ele.headMasterId == id) {
        //this.headDescription = ele.displayName
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
    this.saveDisabledBtn = false
    this.saveNumberTransaction = this.selectedNoOfTransaction
    this.saveAmount = this.selectedAmount
    this.saveRemark = this.selectedRemark
    this.tableData = []
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
        'quantity': this.selectedAmount,
        'remark': this.selectedRemark
      })
    });
    this.selectedEmployeeData.forEach(element => {
      this.saveTransactionData.push({
        "employeeMasterId": element.employeeMasterId,
        "nonSalaryDetailId": this.nonSalaryDetailId,
        "standardName": this.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": this.selectedOnceEvery,
        "frequency": this.selectedFrequency,
        "fromDate": this.saveFromDate,
        "transactionsType": this.saveTransactionType,
        "numberOfTransactions": parseInt(this.saveNumberTransaction),
        "toDate": this.saveToDate,
        "quantity": this.saveAmount,
         "type":this.type,
        "remark": this.saveRemark,
        "uom":"MM",
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    })

    this.saveTransactionData.forEach(element =>{
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
      if(element.quantity == null){
        element.quantity = ''
      }
      if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.employeeMasterId == '' || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
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

    if (data.executeSDM != 'YES' || data.executeSDM != 'Yes' || data.executeSDM != 'yes') {
      if (this.selectedFromDate != '') {
        let inputdata = {
          "employeeMasterId": data.employeeMasterId,
          "nonSalaryDetailId": data.nonSalaryDetailId,
          "payrollAreaId": "1",
          "quantity": value,
          "fromDate": this.selectedFromDate
        }

        this.deviationModeData = []
        this.repeatModeData = []
        this.deviationData = []
        this.nonrecqtyservice.NonRecurringTransactionGrouprangeValidation(inputdata).subscribe(res => {
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

    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": todate,
            "quantity": parseInt(value),
            "type": element.type,
            "remark": element.remark,
            "createdBy": "rahul",
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
                else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": parseInt(value),
              "remark": data.remark,
              "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": parseInt(value),
        "remark": data.remark,
        "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }

			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.employeeMasterId == '' || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
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

    console.log("valuess: "+ value)


    if (this.saveTransactionData.length > 0) {
      this.saveTransactionData.forEach((element, index) => {
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          console.log("value: "+ value)
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
                else {
                  console.log("valu elsee: "+ value)
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": value,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      console.log("else value: "+ value)
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": value,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }

    console.log("save data remark: "+ JSON.stringify(this.saveTransactionData))

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.employeeMasterId == '' || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
  }

  getSaveFromDate(value, data) {
    this.saveDisabledBtn = false
    this.setMinToDate = value;
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
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": this.saveFromDate,
            "transactionsType": this.selectedTransactionType,
            "numberOfTransactions": element.numberOfTransactions,
            "toDate": element.toDate,
            "quantity": element.quantity,
            "uom": element.uom,
            "type": element.type,
            "remark": element.remark,
            "createdBy": "rahul",
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": this.saveFromDate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": this.saveFromDate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
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
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
  }

  getsaveNumberTransaction(value, data) {
    this.saveDisabledBtn = false

    if(value == '' || value == null || value == undefined){
      this.saveNumberTransaction = ''
      value = ''
    }else{
      this.saveNumberTransaction = value;
    }

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
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(value == null){
            value = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": element.transactionsType,
            "numberOfTransactions": parseInt(value),
            "toDate": todate,
            "quantity": element.quantity,
            "uom": element.uom,
            "type": element.type,
            "remark": element.remark,
            "createdBy": "rahul",
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": parseInt(value),
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }
    
    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null || element.numberOfTransactions == 'null'){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == '' || element.toDate == 'null' || element.toDate == null){
					this.saveDisabledBtn = true
				}
			}


		});
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
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
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
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
            "payrollAreaCode": element.payrollAreaCode,
            "onceEvery": element.onceEvery,
            "frequency": element.frequency,
            "fromDate": element.fromDate,
            "transactionsType": element.transactionsType,
            "numberOfTransactions": parseInt(value),
            "toDate": todate,
            "quantity": element.quantity,
            "uom": element.uom,
            "type": element.type,
            "remark": element.remark,
            "createdBy": "rahul",
            "nonsalaryTransactionGroupDeviationList": []
          })
        } else {
          let length = this.saveTransactionData.length - 1;
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": parseInt(value),
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
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

  /** save deviation remark data */
  deviationRemark(remark, deviationdata) {
    this.devationRemarkText = remark;
    this.selectedDeviationdata = deviationdata
  }

  /**save repeat remark data */
  repeatRemark(remark, remarkdata) {
    this.repeatRemarkText = remark;
    this.selectedDeviationdata = remarkdata
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

  /** Get Applcable At selected Value */
  getSelectedApplicable(value, data) {
    this.saveDisabledBtn = false
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
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": data.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
                else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }
    console.log("Applicable at: " + JSON.stringify(this.saveTransactionData))

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
  }

  /** Get Input Type selected Value */
  getSelectedInputType(value, data) {
    this.saveDisabledBtn = false
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
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": data.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
      
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
      })
    }
    console.log("input type: " + JSON.stringify(this.saveTransactionData))

    this.saveTransactionData.forEach(element => {
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
			if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.nonSalaryDetailId == '' || this.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


		});
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
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": data.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
          else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "nonsalaryTransactionGroupDeviationList": []
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
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": data.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
                else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
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
        if (element.employeeMasterId == data.employeeMasterId) {
          let ind = index;
          if(element.numberOfTransactions == null){
            element.numberOfTransactions = ''
          }
          if(element.quantity == null){
            element.quantity = ''
          }
          this.saveTransactionData.splice(ind, 1, {
            "employeeMasterId": element.employeeMasterId,
            "nonSalaryDetailId": element.nonSalaryDetailId,
            "standardName": element.standardName,
            "payrollAreaId": "1",
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
          if (this.saveTransactionData[length].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 1].employeeMasterId == data.employeeMasterId) { return; }
          if (this.saveTransactionData[length - 2].employeeMasterId == data.employeeMasterId) { return; }
                else {
            this.saveTransactionData.push({
              "employeeMasterId": data.employeeMasterId,
              "nonSalaryDetailId": data.nonSalaryDetailId,
              "standardName": data.headDescription,
              "payrollAreaId": "1",
              "payrollAreaCode": this.selectedPayrollArea,
              "onceEvery": data.onceEvery,
              "frequency": data.frequency,
              "fromDate": data.fromdate,
              "transactionsType": this.selectedTransactionType,
              "numberOfTransactions": data.numberOfTransactions,
              "toDate": todate,
              "quantity": data.quantity,
              "uom": data.uom,
              "type": data.type,
              "remark": data.remark,
              // "type":data.type,
              "createdBy": "rahul",
              "nonsalaryTransactionGroupDeviationList": []
            })
          }
        }
      });
    } else {
      this.saveTransactionData.push({
        "employeeMasterId": data.employeeMasterId,
        "nonSalaryDetailId": data.nonSalaryDetailId,
        "standardName": data.headDescription,
        "payrollAreaId": "1",
        "payrollAreaCode": this.selectedPayrollArea,
        "onceEvery": data.onceEvery,
        "frequency": data.frequency,
        "fromDate": data.fromdate,
        "transactionsType": this.selectedTransactionType,
        "numberOfTransactions": data.numberOfTransactions,
        "toDate": todate,
        "quantity": data.quantity,
        "uom": data.uom,
        "type": data.type,
        "remark": data.remark,
        // "type":data.type,
        "createdBy": "rahul",
        "nonsalaryTransactionGroupDeviationList": []
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
      "nonSalaryDetailId": this.nonSalaryDetailId,
      "standardName": this.headDescription,
      "payrollAreaId": "1",
      "payrollAreaCode": this.selectedPayrollArea,
      "onceEvery": this.selectedOnceEvery,
      "frequency": this.selectedFrequency,
      "fromDate": this.saveFromDate,
      "transactionsType": this.saveTransactionType,
      "numberOfTransactions": parseInt(this.saveNumberTransaction),
      "toDate": this.saveToDate,
      "quantity": this.saveAmount,
      "remark": this.saveRemark,
      "createdBy": "rahul",
    })
    this.employeeCode = ''
  }

  removeDataFromSave(index) {
    this.saveTransactionData.splice(index, 1)
    this.tempTableData.splice(index, 1)
    this.tableData.splice(index,1)
  }

  removeTempDataFromSave(index) {
    this.saveTransactionData.splice(index, 1)
    this.tempTableData.splice(index, 1)
    this.tableData.splice(index,1)

  }

  saveFastEntries() {
    console.log("this.saveTransactionData: " + JSON.stringify(this.saveTransactionData))
    this.nonrecqtyservice.NonSalaryTransactionGroup(this.saveTransactionData).subscribe(
      res => {
        this.toaster.success("", "Transaction Saved Successfully")
        this.saveTransactionData = [];
        this.tempTableData = []
        this.tableData = []
        this.selectedEmployeeData = []

      }
    )
  }

  saveAndClearFastEntries() {
    this.nonrecqtyservice.NonSalaryTransactionGroup(this.saveTransactionData).subscribe(
      res => {
        this.toaster.success("", "Transaction Saved Successfully")
        this.selectedEmployeeData = []
        this.saveTransactionData = [];
        this.tempTableData = [];
        this.selectedOnceEvery = 1;
        this.selectedFrequency = 'Monthly';
        this.selectedTransactionType = 'NoOfTransaction';
        this.selectedNoOfTransaction = 1;
        this.nonSalaryDetailId = ''
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
        this.type = ''
      }
    )
  }

  reset() {
    this.saveTransactionData = [];
    this.selectedEmployeeData = []

    this.tempTableData = [];
    this.selectedOnceEvery = 1;
    this.selectedFrequency = 'Monthly';
    this.selectedTransactionType = 'NoOfTransaction';
    this.selectedNoOfTransaction = 1;
    this.nonSalaryDetailId = ''
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
    this.headMasterId = ''
    this.nonSalaryDetailId = ''
    this.type = ''
    this.selectedPayrollArea = ''
  }

  resetTableData() {
    this.saveTransactionData = [];
    this.tempTableData = []
    this.tableData = []
    this.selectedEmployeeData = []

  }

}