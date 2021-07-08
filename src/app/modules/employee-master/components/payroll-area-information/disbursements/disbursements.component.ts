import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PayrollAreaInformationService } from '../payroll-area-information.service';

interface users1 {
  srno;
  ModePayment;
  BankName;
  BranchCode;
  AccountNo;
  PayeeName;
  NetPay;
  Amount;
  Priority;
  Clawback;
}

@Component({
  selector: 'app-disbursements',
  templateUrl: './disbursements.component.html',
  styleUrls: ['./disbursements.component.scss']
})
export class DisbursementsComponent implements OnInit {

  form:FormGroup;
  users1: users1[];
  summary:Array<any>;
  payrollList: Array<any>;
  employeeMasterId:any;
  typeOfPaymentList:Array<any>='Salary,Payroll Reimbursement'.split(',');
  modeOfPaymentList:Array<any>='Bank Transfer,Cheque,Cash,DD'.split(',');
  copyFromPayrollAreaList: any[];
  bankList: any;

  constructor(
   private formBuilder:FormBuilder,
   private payrollService:PayrollAreaInformationService
  ) { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', ModePayment: 'AAA',BankName:'BBB',  BranchCode: 'CCC',AccountNo:'EEE',PayeeName:'FFF',NetPay:'ggg',Amount:'hhh',Priority:'iii',Clawback:'jjj'},
    
    
    ];
    this.employeeMasterId = localStorage.getItem('employeeMasterId')
    this.getInitialData();
    
  }
  getInitialData(){
  this.form = this.formBuilder.group({
areaId: new FormControl(''),
payrollAreaCode:new FormControl(''),
typeOfPayment:new FormControl(''),
fromDate:new FormControl(''),
toDate:new FormControl(''),
copyFromPayrollArea:new FormControl(''),
pfFormArray: new FormArray( [] ),
  }) ;

  this.pfArray.push( this.formBuilder.group( {
    modeOfPayment: [''],
    bankName: [''],
    ifsc: ['', Validators.required],
    accountNo: [''],
    nameAsPerBank: [''],
    percentNetpay: [''],
    amount: [''],
    priority:[''],
   
    
  } ) );

  this.getData();

  }
  getData(){
    this.payrollService.getDistinctPayrollAreaInformation(this.employeeMasterId).subscribe(res=>{
      this.payrollList = res.data.results[0];
    })
 this.payrollService.getBankAccountDetails(this.employeeMasterId).subscribe(res=>{
   this.bankList = res.data.results[0];
   console.log(this.bankList);
 })

      this.copyFromPayrollAreaList = [];
    
      console.log(this.payrollList)
      
      
  }

  bankSelect(event){
console.log(event.target.value);
  }

  percentageTotal(){
   // this.form.get('pfFormArray').value.percentNetpay;
  let data=this.form.get('pfFormArray').value
  let sum: number = 0;
  if(data[0].parcentNetPay!='')
{data.forEach(a => sum += parseInt(a.percentNetpay,10));
return sum;
}
  }

  percentValidate(event){
   return event < 0 ? event = 0 : event; event > 100 ? event = 0 : event;
  }

  deleteRow( j: number ) {
    console.log( j );
    this.pfArray.removeAt( j );
  }
  get pfArray() { return this.f.pfFormArray as FormArray; }
  get f() { return this.form.controls; }
  addRow() {
    this.pfArray.push( this.formBuilder.group( {
      modeOfPayment: [''],
    bankName: [''],
    ifsc: [''],
    accountNo: [''],
    payeeName: [''],
    percentNetpay: [''],
    amount: [''],
    priority:[''],
    } ) );
  }
}
