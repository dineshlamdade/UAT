import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fastentry-nr-amt',
  templateUrl: './fastentry-nr-amt.component.html',
  styleUrls: ['./fastentry-nr-amt.component.scss']
})

export class FastentryNRAmtComponent implements OnInit {

  selectedPayrollArea: any[];
  headData: any[];
  parollArea: any[];
  selectedOnceEvery:any = 1;
  selectedFrequency:any = 'Monthly';
  selectedTransactionType:any = 'NoOfTransaction';
  selectedNoOfTransaction:any = 1;
  headMasterId: any;
  tableData: any[];
  selectedClawBack:any;
  selectedAmount:any;
  selectedRemark:any;
  selectedFromDate: any;
  selectedToDate: any;
  setMinToDate: any;

  constructor(private datepipe: DatePipe) { 
    this.headData = [
      { displayName: 'Incentive',headMasterId: 33},
      { displayName: 'Performance_Incentive',headMasterId: 49},
    ]

    this.parollArea = [
      { name: 'PA_Worker', code: 'NY' },
      { name: 'PA_Staff', code: 'RM' },
      { name: 'PA_Apprentic', code: 'LDN' },
      { name: 'PA_Expat', code: 'IST' },
    ];
  }

  ngOnInit(): void {}

  /** Common selection Data  */
  getSelectedFrequency(frequency){
    this.selectedFrequency = frequency
  }

  getTransactionType(transactiontype){
     this.selectedTransactionType = transactiontype
  }

  getSelectedHead(headid){
    this.headMasterId = headid
  }

  getFromDate(fromdate){
    this.setMinToDate = fromdate
		this.selectedFromDate = this.datepipe.transform(new Date(fromdate), 'yyyy-MM-dd') + ' 00:00:00'
  }

  getToDate(todate){
    this.selectedToDate = this.datepipe.transform(new Date(todate), 'yyyy-MM-dd') + ' 00:00:00' 
  }

  /** Table data push */
  getAllSelectedData(){
    this.tableData = []
   this.tableData.push({
     'payrollArea':this.selectedPayrollArea,
     'fromDate': this.selectedFromDate,
     'transactionsType':this.selectedTransactionType,
     'numberOfTransactions':this.selectedNoOfTransaction, 
     'toDate':this.selectedToDate,
     'clawBack':this.selectedClawBack,
     'amount':this.selectedAmount,
     'remark':this.selectedRemark
   })
  }



}