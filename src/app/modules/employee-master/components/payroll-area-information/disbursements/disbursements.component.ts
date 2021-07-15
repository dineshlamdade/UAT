import { DatePipe } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { familyAddressDetailRequestDTO } from '../../family-information/family-information.model';
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
interface dataIfsc {
  ifsc;
}
interface dataAccount {
  accountNo;
}

interface bank {
  modeOfPayment,
  bankName,
  ifsc,
  accountNo,
  nameAsPerBank,
}

@Component({
  selector: 'app-disbursements',
  templateUrl: './disbursements.component.html',
  styleUrls: ['./disbursements.component.scss']
})
export class DisbursementsComponent implements OnInit {

  form: FormGroup;
  users1: users1[];
  summary: Array<any>;
  payrollList: Array<any>;
  employeeMasterId: any;
  percentTotal: any;
  amtTotal: any;
  disbursmentSummary: Array<any>;
  multiBankingAllowed: any = false;
  ifscCurrent: Array<any> = [];
  typeOfPaymentList: Array<any> = 'Salary,Payroll Reimbursement'.split(',');
  modeOfPaymentList: Array<any> = 'Bank Transfer,Cheque,Cash,DD'.split(',');
  copyFromPayrollAreaList: any[];
  bankList: any;
  companyId: any;
  payData : any;


  constructor(public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private payrollService: PayrollAreaInformationService
  ) { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', ModePayment: 'AAA', BankName: 'BBB', BranchCode: 'CCC', AccountNo: 'EEE', PayeeName: 'FFF', NetPay: 'ggg', Amount: 'hhh', Priority: 'iii', Clawback: 'jjj' },


    ];
    this.employeeMasterId = localStorage.getItem('employeeMasterId')
    this.payrollService.getPayrollAreaDetails().subscribe(res => {
      this.payData = res.data.results[0];
      console.log('payData',this.payData)
    });
    this.getInitialData();

  }
  getInitialData() {
    this.form = this.formBuilder.group({


      payrollAreaCode: new FormControl('', Validators.required),
      typeOfPayment: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      copyFromPayrollArea: new FormControl(''),
      pfFormArray: new FormArray([]),
    });

    this.pfArray.push(this.formBuilder.group({
      payrollAreaInformationId: new FormControl(''),
      employeeBankInfoId: new FormControl(''),
      modeOfPayment: [''],
      bankName: [''],
      ifsc: [''],
      ifscList: new FormArray([]),
      accountNo: [''],
      accountNoList: new FormArray([]),
      nameAsPerBank: [''],
      percentNetpay: [''],
      amount: [''],
      priority: ['']
    }));


    this.ifscData.push(this.formBuilder.group({
      ifsc: ['']
    }));
    this.accountData.push(this.formBuilder.group({
      accountNo: ['']
    }));


    this.payrollService.getDisbursementDetails(this.employeeMasterId).subscribe(res => {
      let disbursmentList = res.data.results[0];
      console.log('disbursementList', disbursmentList)

      //distinct payrollArea entries
      var payrollAreas = [];
      for (var len = disbursmentList.length, i = 0; i < len; ++i) {
        var payrollAreaInformationId = disbursmentList[i].payrollAreaInformationId;
        if (payrollAreas.indexOf(payrollAreaInformationId) > -1) continue;
        payrollAreas.push(payrollAreaInformationId);
      }
      //create summary to display summary

      this.disbursmentSummary = [];
      let arrLength = payrollAreas.length;
      for (let i = 0; i < arrLength; i++) {
        let obj = disbursmentList.find(a => a.payrollAreaInformationId == payrollAreas[i]);

        this.disbursmentSummary.push({
          Area: obj.payrollAreaCode,
          typeOfPayment: obj.typeOfPayment,
          totalEntries: disbursmentList.filter(a => a.payrollAreaInformationId == payrollAreas[i]).length,
          fromDate: obj.payFromDate,
          toDate: obj.payToDate
        })
      } console.log(this.disbursmentSummary)
    })

    this.payrollService.getDistinctPayrollAreaInformation(this.employeeMasterId).subscribe(res => {
      this.payrollList = res.data.results[0];
      console.log('AssignedPayrollList',this.payrollList);
    })

  //  this.getData();

  }

  // getData() {
  //   //to get assigned payroll area detials to employee
   

    

  //   this.getFormData();
  // }
  getFormData(){
    ///get companySetting to multibankingallowed
    this.payrollService.getCompanySetting(this.companyId).subscribe(res => {
      const location = res.data.results.find(a => a.companySetting === 'isMultiBankingAllowed');
      console.log(location)
      if (location.value == 'Yes') { this.multiBankingAllowed = true }
      else {
        this.multiBankingAllowed = false
      }
      console.log('value', this.multiBankingAllowed);
    })

    //fetch discbursement details for summary and to fill pfarray
   

    //summary end

    //gett bank account details

    this.payrollService.getBankAccountDetails(this.employeeMasterId).subscribe(res => {
      this.bankList = res.data.results[0];
      console.log(this.bankList);

    })

    this.copyFromPayrollAreaList = [];

  }
  
  // addIfsc() {
  //   const control = <FormArray>this.pfArray.get('ifscList');
  //   control.push(this.ifscL);
  // } 

  payrollAreaChange(){
this.pfArray.reset();
const location= this.payData.find(a=>a.payrollAreaCode===this.form.get('payrollAreaCode'));
this.companyId=location.companyId;
    this.getFormData();
  }

  typeOfPaymentChange(){
   const payCode = this.form.get('payrollAreaCode').value;
   const selectedPayCode = this.payrollList.find(a=>a.payrollAreaCode===payCode);
   this.form.get('fromDate').setValue(selectedPayCode.payrollAreaFromDate);
   this.form.get('toDate').setValue(selectedPayCode.payrollAreaToDate);
  }



  ifscSelect(index) {
    this.resetForBank(index);
    const bank = this.pfArray.value[index];
    const bankName = bank.bankName;
    const bankData = this.bankList.filter(a => a.bankName === bankName)
    this.pfArray.get([index]).get('employeeBankInfoId').setValue(bankData.employeeBankInfoId);
    const obj2: Array<dataIfsc> = [];

    //insert data into ifscList 
    for (let i = 0; i < bankData.length; i++) {
      const obj = { ifsc: bankData[i].bankIFSC };
      obj2.push(obj)
      if (i != 0) { this.addIfscList(); }
    }
    this.pfArray.get([index]).get('ifscList').patchValue(obj2);



    // this.pfArray.get([index]).get('ifscList').setValue(bankData.bankIFSC);
    // this.pfArray.get([index]).get('accountNoList').setValue(bankData.accountNo);

    // this.pfArray.get([index]).get('ifsc').setValue(bankData.bankIFSC);
    // this.pfArray.get([index]).get('accountNo').setValue(bankData.accountNo);
    // if(bankData.nameAsPerBank!=="")this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData.nameAsPerBank);

  }

  addBankInfo(form, formDirective) {

    const k = [];
    let pfArrayLength = this.pfArray.length;
    for (let i = 0; i < pfArrayLength; i++) {
      k.push({
        //  payrollAreainformationId:this.form.get('areaId').value,

        payrollAreaInformationId: this.form.get('payrollAreaInformationId').value,

        payFromDate: this.datepipe.transform(this.form.get('fromDate').value, "dd-MMM-yyyy"),
        payToDate: this.datepipe.transform(this.form.get('toDate').value, "dd-MMM-yyyy"),
        employeeBankInfoId: this.pfArray.get([i]).get('employeeBankInfoId').value,
        modeOfPayment: this.pfArray.get([i]).get('modeOfPayment').value,
        percentNetPay: this.pfArray.get([i]).get('percentNetpay').value,
        amount: this.pfArray.get([i]).get('amount').value,
        priority: this.pfArray.get([i]).get('priority').value
      })
    }
    console.log(k);
  }

  modeOfPaymentChange() {
    if (this.bankList.length == 1) {
      const objIfscList: Array<dataIfsc> = [];
      const objAccountList: Array<dataAccount> = [];
      const objIfsc = { ifsc: this.bankList[0].bankIFSC };
      objIfscList.push(objIfsc);
      const objAccount = { accountNo: this.bankList[0].accountNo };
      objAccountList.push(objAccount);
      this.pfArray.get([0]).get('ifscList').patchValue(objIfscList);
      this.pfArray.get([0]).get('accountNoList').patchValue(objAccountList);
      


      const obj = {
        bankName: this.bankList[0].bankName,
        employeeBankInfoId: this.bankList[0].employeeBankInfoId,
        ifsc: this.bankList[0].bankIFSC,
        accountNo: this.bankList[0].accountNo,
        //   accountNoList:this.bankList[0].accountNo,
        nameAsPerBank: this.bankList[0].nameAsPerBank
      };
      this.pfArray.get([0]).patchValue(obj);
    }

  }
  accountSelect(index) {

    const ifscSelect = this.pfArray.value[index];
    const ifscCode = ifscSelect.ifsc;
    const bankData = this.bankList.filter(a => a.bankIFSC === ifscCode)
    const obj2: Array<dataAccount> = [];

    //insert data into ifscList 
    for (let i = 0; i < bankData.length; i++) {
      const obj = { accountNo: bankData[i].accountNo };
      obj2.push(obj)
      if (i != 0) { this.addIfscList(); }
    }
    this.pfArray.get([index]).get('accountNoList').patchValue(obj2);
    if (bankData.nameAsPerBank !== "") this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData.nameAsPerBank);
    console.log(this.pfArray.get([index]).get('accountNoList'))
  }

  percentageTotal() {
    let data = this.form.get('pfFormArray').value
    let sum: number = 0;
    data.forEach(a => sum += parseInt(a.percentNetpay, 10));
    this.percentTotal = sum;
  }
  amountTotal() {
    let data = this.form.get('pfFormArray').value
    let sum: number = 0;
    data.forEach(a => sum += parseInt(a.amount, 10));
    this.amtTotal = sum;
  }

  percentValidate(event) {
    return event < 0 ? event = 0 : event; event > 100 ? event = 0 : event;
  }

  deleteRow(j: number) {
    console.log(j);
    this.pfArray.removeAt(j);
  }
  get pfArray() { return this.f.pfFormArray as FormArray; }

  get ifscData() { return this.f.pfFormArray.get([0]).get('ifscList') as FormArray }
  get accountData() { return this.f.pfFormArray.get([0]).get('accountNoList') as FormArray }
  get f() { return this.form.controls; }

  addIfscList() {
    this.ifscData.push(this.formBuilder.group({
      ifsc: ['']
    }));
  }

  addAccountNoList() {
    this.accountData.push(this.formBuilder.group({
      account: ['']
    }));
  }

  addRow() {
    this.pfArray.push(this.formBuilder.group({
      payrollAreaInformationId: [],
      employeeBankInfoId: [],
      modeOfPayment: [''],
      bankName: [''],
      ifsc: [''],
      ifscList:[''],
      accountNo: [''],
      accountNoList:[''],
      payeeName: [''],
      percentNetpay: [''],
      amount: [''],
      priority: [''],
    }));
  }

  resetForBank(indexx) {

    this.pfArray.controls[indexx].get('employeeBankInfoId').reset();
    this.pfArray.controls[indexx].get('ifsc').reset();
    this.pfArray.controls[indexx].get('ifscList').reset();
    this.pfArray.controls[indexx].get('accountNo').reset();
    this.pfArray.controls[indexx].get('accountNoList').reset();
    this.pfArray.controls[indexx].get('nameAsPerBank').reset();
  }

  resetForIfsc(indexx) {

    this.pfArray.controls[indexx].get('ifscList').reset();
    this.pfArray.controls[indexx].get('accountNo').reset();
    this.pfArray.controls[indexx].get('accountNoList').reset();
    this.pfArray.controls[indexx].get('nameAsPerBank').reset();
  }
}
