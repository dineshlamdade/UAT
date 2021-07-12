import { newArray } from '@angular/compiler/src/util';
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
interface dataIfsc{
  ifsc;
}
interface dataAccount{
  account;
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
  percentTotal:any;
  amtTotal:any;
  multiBankingAllowed:any;
  ifscCurrent:Array<any>=[];
  typeOfPaymentList:Array<any>='Salary,Payroll Reimbursement'.split(',');
  modeOfPaymentList:Array<any>='Bank Transfer,Cheque,Cash,DD'.split(',');
  copyFromPayrollAreaList: any[];
  bankList: any;
  companyId:any;
  

  constructor(
   private formBuilder:FormBuilder,
   private payrollService:PayrollAreaInformationService
  ) { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', ModePayment: 'AAA',BankName:'BBB',  BranchCode: 'CCC',AccountNo:'EEE',PayeeName:'FFF',NetPay:'ggg',Amount:'hhh',Priority:'iii',Clawback:'jjj'},
    
    
    ];
    this.employeeMasterId = localStorage.getItem('employeeMasterId')
    this.companyId = localStorage.getItem('companyId');
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
   
    ifsc: [''],
    ifscList: new FormArray([]),
    accountNo: [''],
    accountNoList:new FormArray([]),
    nameAsPerBank: [''],
    percentNetpay: [''],
    amount: [''],
    priority:[''],
   
    
  } ) );

 
  this.ifscData.push(this.formBuilder.group({
    ifsc:['']
  }));
  this.accountData.push(this.formBuilder.group({
    account:['']
  }));
  
  this.getData();

  }
 
  getData(){

  
    this.payrollService.getDistinctPayrollAreaInformation(this.employeeMasterId).subscribe(res=>{
      this.payrollList = res.data.results[0];
    })

    this.payrollService.getCompanySetting(this.companyId).subscribe(res=>{
      const location=res.data.results.find(a=>a.companySetting==='isMultiBankingAllowed');
      console.log(location)
     if(location.value=='Yes') {this.multiBankingAllowed=true}else{this.multiBankingAllowed=false}
      console.log('value',this.multiBankingAllowed);
    })
 

 this.payrollService.getBankAccountDetails(this.employeeMasterId).subscribe(res=>{
   this.bankList = res.data.results[0];
   console.log(this.bankList);
 })

      this.copyFromPayrollAreaList = [];
    
      console.log(this.payrollList)
      
      
  }
  // addIfsc() {
  //   const control = <FormArray>this.pfArray.get('ifscList');
  //   control.push(this.ifscL);
  // } 
  ifscSelect(index){
 this.resetForBank(index);
    const bank = this.pfArray.value[index];
    const bankName=bank.bankName;
    const bankData= this.bankList.filter(a=>a.bankName===bankName)
    const obj2:Array<dataIfsc>=[];

       //insert data into ifscList 
    for(let i=0;i<bankData.length;i++){
      const obj =  { ifsc: bankData[i].bankIFSC};
      obj2.push(obj)
     if(i!=0){ this.addIfscList();}
    }   
  this.pfArray.get([index]).get('ifscList').patchValue(obj2);
 

    
    // this.pfArray.get([index]).get('ifscList').setValue(bankData.bankIFSC);
    // this.pfArray.get([index]).get('accountNoList').setValue(bankData.accountNo);
    
    // this.pfArray.get([index]).get('ifsc').setValue(bankData.bankIFSC);
    // this.pfArray.get([index]).get('accountNo').setValue(bankData.accountNo);
  // if(bankData.nameAsPerBank!=="")this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData.nameAsPerBank);

  }

  accountSelect(index){
  
    const ifscSelect = this.pfArray.value[index];
    const ifscCode=ifscSelect.ifsc;
    const bankData= this.bankList.filter(a=>a.bankIFSC===ifscCode)
    const obj2:Array<dataAccount>=[];

       //insert data into ifscList 
    for(let i=0;i<bankData.length;i++){
      const obj =  { account: bankData[i].accountNo};
      obj2.push(obj)
     if(i!=0){ this.addIfscList();}
    }   
  this.pfArray.get([index]).get('accountNoList').patchValue(obj2);
  if(bankData.nameAsPerBank!=="")this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData.nameAsPerBank);
  console.log(this.pfArray.get([index]).get('accountNoList'))
}

  percentageTotal(){  
   let data=this.form.get('pfFormArray').value
   let sum: number = 0; 
   data.forEach(a => sum += parseInt(a.percentNetpay,10));
   this.percentTotal= sum;
  }
  amountTotal(){  
    let data=this.form.get('pfFormArray').value
    let sum: number = 0; 
    data.forEach(a => sum += parseInt(a.amount,10));
    this.amtTotal= sum;
   }

  percentValidate(event){
   return event < 0 ? event = 0 : event; event > 100 ? event = 0 : event;
  }

  deleteRow( j: number ) {
    console.log( j );
    this.pfArray.removeAt( j );
  }
  get pfArray() { return this.f.pfFormArray as FormArray; }

  get ifscData(){return this.f.pfFormArray.get([0]).get('ifscList') as FormArray}
  get accountData(){return this.f.pfFormArray.get([0]).get('accountNoList') as FormArray}
  get f() { return this.form.controls; }

  addIfscList(){
    this.ifscData.push(this.formBuilder.group({
      ifsc:['']
    }));
  }

  addAccountNoList(){
    this.accountData.push(this.formBuilder.group({
      account:['']
    }));
  }

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

  resetForBank(indexx){
    this.pfArray.controls[indexx].get('ifsc').reset(); 
    this.pfArray.controls[indexx].get('ifscList').reset();  
    this.pfArray.controls[indexx].get('accountNo').reset(); 
    this.pfArray.controls[indexx].get('accountNoList').reset(); 
    this.pfArray.controls[indexx].get('nameAsPerBank').reset(); 
  }

  resetForIfsc(indexx){
  
    this.pfArray.controls[indexx].get('ifscList').reset();  
    this.pfArray.controls[indexx].get('accountNo').reset(); 
    this.pfArray.controls[indexx].get('accountNoList').reset(); 
    this.pfArray.controls[indexx].get('nameAsPerBank').reset(); 
  }
}
