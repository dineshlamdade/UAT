
import { DatePipe } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { setValue } from '@ngneat/transloco';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { familyAddressDetailRequestDTO } from '../../family-information/family-information.model';
import { bankName } from '../payroll-area-information.model';
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
interface dataBankDrop {
 employeeBankInfoId;
  bankname;
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
  typeOfPaymentList: Array<any> =[]// 'Salary,Payroll Reimbursement'.split(',');
  modeOfPaymentList: Array<any> = []//'Bank Transfer,Cheque,Cash,DD'.split(',');
  typeList = '% of Net Pay,Amount'.split(',');
  copyFromPayrollAreaList: Array<any>=[];
  bankList: any;
  companyId: any;
  payData: Array<any> = [];
  disbursmentList: Array<any> = [];
  asignedPayrollList: Array<any> = [];
  viewFlag: boolean;
  updateFlag: boolean;
  filteredBankData: Array<any> = [];
  addButtonFlag: boolean;
  fullName: string;
  payrollAreas: Array<any>=[];
  companySetting: any;
  copyFrom: boolean;

  constructor(public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private payrollService: PayrollAreaInformationService,
    private CommonDataService: SharedInformationService
  ) { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', ModePayment: 'AAA', BankName: 'BBB', BranchCode: 'CCC', AccountNo: 'EEE', PayeeName: 'FFF', NetPay: 'ggg', Amount: 'hhh', Priority: 'iii', Clawback: 'jjj' },


    ];
    this.employeeMasterId = localStorage.getItem('employeeMasterId')
    this.payrollService.getPayrollAreaDetails().subscribe(res => {
      this.payData = res.data.results;

    });
    this.getInitialData();

  }
  getInitialData() {
    this.getForm();
    this.multiBankingAllowed=false;
    this.pfArrayPush();
    this.pfArray.disable();



    this.disbursmentList=[];
    this.payrollService.getDisbursementDetails(this.employeeMasterId).subscribe(res => {
      this.disbursmentList = res.data.results[0];
      if(this.disbursmentList != undefined){
      console.log('disbursementList', this.disbursmentList)

//       var groupByPayrollAreaCode={};
// const datea = this.disbursmentList.forEach(function (a){
//   groupByPayrollAreaCode [a.payrollAreaCode] =  [a.payrollAreaCode] || [];
//   groupByPayrollAreaCode [a.payrollAreaCode].push({
//     fromDate : a.payFromDate , typeOfPayment : a.typeOfPayment
//      })
// })

// console.log('groupByPayrollAreaCode',groupByPayrollAreaCode);

      //distinct payrollArea entries
      this.payrollAreas = [];
      this.copyFromPayrollAreaList=[];
      //payrollAreas = this.disbursmentList.reduce((a,b)=>a == b);
     // console.log('reduce',payrollAreas);
      for (var len = this.disbursmentList.length, i = 0; i < len; ++i) {
        var payrollAreaInformationId = this.disbursmentList[i].payrollAreaInformationId;
        if (this.payrollAreas.indexOf(payrollAreaInformationId) > -1) continue;
        this.payrollAreas.push(payrollAreaInformationId);
        this.typeOfPaymentList.forEach(element => {
         this.copyFromPayrollAreaList.push({ element : this.disbursmentList[i].payrollAreaCode })
        })
      }
console.log('copyFrom',this.copyFromPayrollAreaList);


      var typeAreas = [];
      for (var len = this.disbursmentList.length, i = 0; i < len; ++i) {
        var typeOfPaymentId = this.disbursmentList[i].typeOfPayment;

        if (typeAreas.indexOf(typeOfPaymentId) > -1) continue;
        typeAreas.push(typeOfPaymentId);
      }

      var modeAreas = [];
      for (var len = this.disbursmentList.length, i = 0; i < len; ++i) {
        var paymentMode = this.disbursmentList[i].paymentMode;

        if (modeAreas.indexOf(paymentMode) > -1) continue;
        modeAreas.push(paymentMode);
      }

      var dateAreas = [];
      for (var len = this.disbursmentList.length, i = 0; i < len; ++i) {
        var dateId = this.disbursmentList[i].payFromDate;

        if (dateAreas.indexOf(dateId) > -1) continue;
        dateAreas.push(dateId);
      }

      console.log(typeAreas);
      //create summary to display summary

      this.disbursmentSummary = [];
      let payLength = this.payrollAreas.length;
      for (let i = 0; i < payLength; i++) {
        let typeLength = typeAreas.length;
        for (let j = 0; j < typeLength; j++) {
          let dateLength = dateAreas.length;
          for (let k = 0; k < dateLength; k++) {
            let modeLength = modeAreas.length;
            for (let l = 0; l < modeLength; l++) {
            let obj = this.disbursmentList.find(a => a.payrollAreaInformationId == this.payrollAreas[i] && a.typeOfPayment == typeAreas[j] && a.payFromDate == dateAreas[k] && a.paymentMode == modeAreas[l]);
            if (obj) {
              this.disbursmentSummary.push({
                Area: obj.payrollAreaCode,
                typeOfPayment: obj.typeOfPayment,
                totalEntries: this.disbursmentList.filter(a => a.payrollAreaInformationId == this.payrollAreas[i] && a.typeOfPayment == typeAreas[j] && a.payFromDate == dateAreas[k] && a.paymentMode == modeAreas[l]).length,
                fromDate: obj.payFromDate,
                toDate: obj.payToDate
              })
            }
          }
          }
        }
      } 
      //sord by todate desc
      this.disbursmentSummary.sort((x,y)=>new Date(x.toDate)<new Date(y.toDate)?1:-1);

      console.log(this.disbursmentSummary)
       // copyFromList 
             for (let i = 0; i < this.disbursmentList.length; i++){  
              var payrollAreaInformationId = this.disbursmentList[i].payrollAreaInformationId;
              if (this.copyFromPayrollAreaList.indexOf(payrollAreaInformationId) > -1) continue;  
            this.copyFromPayrollAreaList.push({ 
              payrollAreaInformationId :payrollAreaInformationId,     
             code :this.disbursmentList[i].payrollAreaCode +"-"+ this.disbursmentList[i].typeOfPayment
         }) 
     console.log('copyFromList',this.copyFromPayrollAreaList)
    }  
      }
    }
    , (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
    


    this.payrollService.getDistinctPayrollAreaInformation(this.employeeMasterId).subscribe(res => {
      this.payrollList = res.data.results[0];
      this.asignedPayrollList = res.data.results[0];
      // if (this.disbursmentList.length > 0) {
      //   this.payrollList = this.payrollList.filter(ar => !this.disbursmentList.find(rm => (rm.payrollAreaInformationId === ar.payrollAreaInformationId)))
      // }
    })

    //  this.getData();
    this.payrollService.getBankAccountDetails(this.employeeMasterId).subscribe(res => {
      this.bankList = res.data.results[0];
      //get only unique values from 
      var result = Object.values(this.bankList.reduce((r, e) => (r[e.employeeBankInfoId + '|' + e.bankName] = {employeeBankInfoId: e.employeeBankInfoId, bankName: e.bankName}, r), {}))
      console.log('bankData',this.bankList);
     // var result = Object.values(this.bankList.reduce((r, e) => (r[e.employeeBankInfoId + '|' + e.bankName] = {employeeBankInfoId: e.employeeBankInfoId, bankName: e.bankName}, r), {}))
      console.log('results',result)



    })

  }

  getForm() {
    this.form = this.formBuilder.group({


      payrollAreaCode: new FormControl('', Validators.required),
      typeOfPayment: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      copyFromPayrollArea: new FormControl(''),

      pfFormArray: new FormArray([]),
    });

  }

  pfArrayPush() {
    this.pfArray.push(this.formBuilder.group({
      employeeBankMapPayAreaId: new FormControl(''),
      payrollAreaInformationId: new FormControl(''),
      employeeBankInfoId: new FormControl(''),
      modeOfPayment: new FormControl(''),
      bankName: new FormControl(''),
      bankDropList: new FormArray([this.createBankList()]),
      ifsc: new FormControl(''),
      ifscList: new FormArray([this.createIfscList()]),
      accountNo: new FormControl(''),
      accountNoList: new FormArray([this.createAccountList()]),
      nameAsPerBank: new FormControl(''),
      percentActive : new FormControl('% of Net Pay'),
      percentOfNetPay:new FormControl(true),
      percentageOfNetPay: new FormControl(0),
      amount: new FormControl({value:0,disabled: true}),
      priority: new FormControl('')
    }));
   
  }


  // getData() {
  //   //to get assigned payroll area detials to employee




  //   this.getFormData();
  // }
  getFormData() {
    ///get companySetting to multibankingallowed
    this.payrollService.getCompanySetting(this.companyId).subscribe(res => {
      this.companySetting = res.data.results[0];

      //multibankking allowed or not from database
      const location = this.companySetting.filter(a => a.companySetting.toLowerCase() === 'ismultibankingallowed');
      console.log(location)
      if (location[0].value == 'Yes') { this.multiBankingAllowed = true }
      else {
        this.multiBankingAllowed = false
      }
      //modeOfPaymentList from database
      this.modeOfPaymentList=[];
       this.companySetting.filter(a=>a.companySetting.toLowerCase() == 'paymentmode').forEach(element => {
        this.modeOfPaymentList.push({modeOfPayment : element.value})
      });;
       
      
      //typeOfPaymentlist from database
      this.typeOfPaymentList =[];
      this.companySetting.filter(a=>a.companySetting.toLowerCase() == 'typeofpayments').forEach(element => {
        this.typeOfPaymentList.push({typeOfPayment:element.value})
      });;

      //set default payment type if only one
     if(this.typeOfPaymentList.length==1){
       const defaultPaymentType = this.typeOfPaymentList[0].typeOfPayment;
       this.form.get('typeOfPayment').setValue(defaultPaymentType);
       this.typeOfPaymentChange();
     }
    })
//commented for check copyFrom
    // this.copyFromPayrollAreaList=  this.disbursmentList.length>0?this.disbursmentList:[];

  }


  createBankList() {
    return this.formBuilder.group({
      bankname: null
    })
  }
  createAccountList() {
    return this.formBuilder.group({
      accountNo: null
    })
  }
  createIfscList() {
    return this.formBuilder.group({
      ifsc: null
    })
  }

  payrollAreaChange() {

    //pfFormArray: new FormArray([])
    this.resetFormPayrollChange();
    console.log('type after reset', this.pfArray)
    const location = this.payData.find(a => a.payrollAreaCode == this.form.get('payrollAreaCode').value);
    this.companyId = location.companyId;
    const payId = this.payrollList.find(a => a.payrollAreaId === location.payrollAreaId);
    this.pfArray.get([0]).get('payrollAreaInformationId').patchValue(payId.payrollAreaInformationId)
    this.getFormData();

    // const copyFromList = this.disbursmentList.filter(a=>a.payrollAreaCode === location.payrollAreaCode && a.multibankingAllowed === location.multibankingAllowed);
    // console.log('copyfromList-pchange',copyFromList)
  }

  resetFormPayrollChange() {
    this.pfArray.clear();
    this.pfArrayPush();
    this.pfArray.disable();
    this.form.get('typeOfPayment').reset();
    this.form.get('fromDate').reset();
    this.form.get('toDate').reset();
  }

  typeOfPaymentChange() {

  const type  = this.form.get('typeOfPayment').value;
  const payCode = this.form.get('payrollAreaCode').value;
const len = this.disbursmentList!=undefined ?  this.disbursmentList.length:0;
//for checking the type is already available with the same type
if(len>0){
for ( let i=0 ; i<len ; i++){
  if(this.disbursmentList[i].typeOfPayment==type && this.disbursmentList[i].payrollAreaCode == payCode ){
    this.CommonDataService.sweetalertError("This type is already Available for "+payCode+"");
    this.form.get('typeOfPayment').reset();
    break;
  }
}
}


    this.pfArray.enable();
    const selectedPayCode = this.payrollList.find(a => a.payrollAreaCode === payCode);
    this.form.get('fromDate').setValue(selectedPayCode.payrollAreaFromDate);
    this.form.get('toDate').setValue(selectedPayCode.payrollAreaToDate);
  }

  validateAccountNo(index){
   const accNo = this.pfArray.get([index]).get('accountNo').value;
   const ifs = this.pfArray.get([index]).get('ifsc').value;
   
   const arr = this.pfArray.getRawValue();
   const finalArr = arr.filter(a=>a.accountNo==accNo);
    // const arrlength = finalArr.length;

    
    // for(let j=0; j<finalArr.length;j++){

     if(finalArr.length>1) {
      this.pfArray.get([index]).get('accountNo').reset();
       this.CommonDataService.sweetalertError("This Account No is Already selected");
     }else{
      const acc = finalArr.find(a=>a.accountNo== accNo && a.bankIFSC == ifs);
      this.pfArray.get([index]).get('employeeBankInfoId').setValue(acc.employeeBankInfoId);
     }
   
  }

  ifscSelect(index) {
    this.resetForBank(index);
    const bank = this.pfArray.value[index];
    const bankName = bank.bankName;
    const bankData = this.bankList.filter(a => a.bankName === bankName)
    this.pfArray.get([index]).get('employeeBankInfoId').setValue(bankData[0].employeeBankInfoId);
    const obj2: Array<dataIfsc> = [];

    //insert data into ifscList 
    const obj: Array<dataIfsc> = [];
    for (let i = 0; i < bankData.length; i++) {

      obj.push({ ifsc: bankData[i].bankIFSC });
    }
    this.pfArray.get([index]).get('ifscList').patchValue(obj);

    if (bankData.length == 1) {
      const obj2: Array<dataAccount> = [];
      for (let i = 0; i < bankData.length; i++) {
        obj2.push({ accountNo: bankData[i].accountNo });
      }
      this.pfArray.get([index]).get('accountNoList').patchValue(obj2);

      this.pfArray.get([index]).patchValue({
        accountNo: bankData[0].accountNo,
        ifsc: bankData[0].bankIFSC,
        nameAsPerBank: bankData[0].nameAsPerBank
      });

      // this.pfArray.get([index]).get('ifsc').setValue(bankData.bankIfsc);
      // this.pfArray.get([index]).get('accountNo').setValue(bankData.accountNo);
      // this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData.nameAsPerBank);
    }


    // this.pfArray.get([index]).get('ifsc').setValue(bankData.bankIFSC);
    // this.pfArray.get([index]).get('accountNo').setValue(bankData.accountNo);
    // if(bankData.nameAsPerBank!=="")this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData.nameAsPerBank);

  }

  addBankInfo(form, formDirective) {


   
    const k = [];
    let pfArrayLength = this.pfArray.length;
    if (this.multiBankingAllowed == false) {
      this.pfArray.get([0]).get('percentageOfNetPay').setValue(100)
    }
    let payrollInfoId = this.payrollList.find(a=>a.payrollAreaCode== (this.form.get('payrollAreaCode').value));
    for (let i = 0; i < pfArrayLength; i++) {
      if(this.copyFrom==true){
     
        k.push({
          //  payrollAreainformationId:this.form.get('areaId').value,
         
          employeeBankMapPayAreaId: '',
          payrollAreaInformationId :payrollInfoId.payrollAreaInformationId,
         // payrollAreaInformationId: this.pfArray.get([0]).get('payrollAreaInformationId').value,
          employeeMasterId: this.employeeMasterId,
          typeOfPayment: this.form.get('typeOfPayment').value,
          payFromDate: this.datepipe.transform(this.form.get('fromDate').value, "dd-MMM-yyyy"),
          payToDate: this.datepipe.transform(this.form.get('toDate').value, "dd-MMM-yyyy"),
          employeeBankInfoId: this.pfArray.get([i]).get('employeeBankInfoId').value,
          paymentMode: this.pfArray.get([i]).get('modeOfPayment').value,
          percentageOfNetPay: this.pfArray.get([i]).get('percentageOfNetPay').value,
          percentOfNetPay:this.pfArray.get([i]).get('percentOfNetPay').value,
          amount: this.pfArray.get([i]).get('amount').value,
          bankName:this.pfArray.get([i]).get('bankName').value,
          bankIFSC:this.pfArray.get([i]).get('ifsc').value,
          accountNo:this.pfArray.get([i]).get('accountNo').value,
          nameAsPerBank:this.pfArray.get([i]).get('nameAsPerBank').value,
          priority: this.pfArray.get([i]).get('priority').value
        })
      }else{
        k.push({
          //  payrollAreainformationId:this.form.get('areaId').value,
         
          employeeBankMapPayAreaId: this.pfArray.get([i]).get('employeeBankMapPayAreaId').value,
          payrollAreaInformationId: payrollInfoId.payrollAreaInformationId,
          employeeMasterId: this.employeeMasterId,
          typeOfPayment: this.form.get('typeOfPayment').value,
          payFromDate: this.datepipe.transform(this.form.get('fromDate').value, "dd-MMM-yyyy"),
          payToDate: this.datepipe.transform(this.form.get('toDate').value, "dd-MMM-yyyy"),
          employeeBankInfoId: this.pfArray.get([i]).get('employeeBankInfoId').value,
          paymentMode: this.pfArray.get([i]).get('modeOfPayment').value,
          percentageOfNetPay: this.pfArray.get([i]).get('percentageOfNetPay').value,
          percentOfNetPay:this.pfArray.get([i]).get('percentOfNetPay').value,
          amount: this.pfArray.get([i]).get('amount').value,
          bankName:this.pfArray.get([i]).get('bankName').value,
          bankIFSC:this.pfArray.get([i]).get('ifsc').value,
          accountNo:this.pfArray.get([i]).get('accountNo').value,
          nameAsPerBank:this.pfArray.get([i]).get('nameAsPerBank').value,
          priority: this.pfArray.get([i]).get('priority').value
        })
      }
     
     
    }
    console.log(k);
    this.payrollService.postBankInfo(k).subscribe(res => {
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);

      const resData = res.data.results[0];
      this.getInitialData();
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  modeOfPaymentChange(i) {
     let mode = this.pfArray.get([i]).get('modeOfPayment').value.toLowerCase();
     this.pfArray.get([i]).get('amount').setValue(0);
     this.pfArray.get([i]).get('amount').disable({onlySelf: true});
       if(mode =='cash' || mode =='demand draft' || mode== 'cheque'){
      this.resetForPaymentMode(i);
      this.DisableForOtherType(i);
      this.fullName = localStorage.getItem('fullName');
      this.pfArray.get([i]).get('nameAsPerBank').patchValue(this.fullName);
    }else{

    this.resetForPaymentMode(i);
    this.enableForPaymentMode(i);
    //olet list = this.pfArray.value;

    // console.log(list);
   /// this.pfArray.get([i]).get('priority').patchValue(i + 1);
    let obj2: Array<dataBankDrop> = [];
    let usedbankData: Array<any> = [];
    let list = this.pfArray.value;

    this.filteredBankData = this.bankList.filter(ar => !list.find(rm => (rm.employeeBankInfoId === ar.employeeBankInfoId)))
    for (let j = 0; j < this.filteredBankData.length; j++) {
      const obj = { 
        employeeBankInfoId : this.filteredBankData[j].employeeBankInfoId,
        bankname: this.filteredBankData[j].bankName };
      obj2.push(obj)
      if (j > 0) { this.addbankDropList(i) }
    }

    console.log(obj2);
    this.pfArray.get([i]).get('bankDropList').patchValue(obj2);
    
    if (this.filteredBankData.length == 1) {
     
      const objIfscList: Array<dataIfsc> = [];
      const objAccountList: Array<dataAccount> = [];
     
      objIfscList.push({ ifsc: this.filteredBankData[0].bankIFSC });
     
      objAccountList.push({ accountNo: this.filteredBankData[0].accountNo });
      this.pfArray.get([i]).get('ifscList').patchValue(objIfscList);
      this.pfArray.get([i]).get('accountNoList').patchValue(objAccountList);
      console.log('accList', this.pfArray.get([0]).get('accountNoList').value)

      const obj1 = {
        bankName: this.filteredBankData[0].bankName,
        employeeBankInfoId: this.filteredBankData[0].employeeBankInfoId,

        //   accountNoList:this.bankList[0].accountNo,
        nameAsPerBank: this.filteredBankData[0].nameAsPerBank
      };
      this.pfArray.get([i]).patchValue(obj1);
    }
  }
  }

  validateNetPercent(i) {
    this.pfArray.get([i]).get('percentageOfNetPay').setValidators([Validators.required]);

    //   this.pfArray.controls.get([i]).controls.percentageOfNetPay.updateValueAndValidity();

    this.pfArray.get([i]).get('amount').setValidators([Validators.required]);

    //  this.pfArray.controls.get([i]).controls.amount.updateValueAndValidity();


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
      if (i > 0) { this.addAccountNoList(index) }
    }
    this.pfArray.get([index]).get('accountNoList').patchValue(obj2);
    if (bankData[0].nameAsPerBank !== "") {
      this.pfArray.get([index]).get('nameAsPerBank').setValue(bankData[0].nameAsPerBank);
    }
    //console.log(this.pfArray.get([index]).get('accountNoList'))
  }

  percentageTotal() {
    let data = this.pfArray.getRawValue();
    let sum: number = 0;
    data.forEach(a => sum += parseInt(a.percentageOfNetPay==""?0:a.percentageOfNetPay, 10));
    this.percentTotal = sum;
    if (sum > 100) {
      this.CommonDataService.sweetalertError("Percentage should be less than or equal to 100%");
      let lastValue = this.pfArray.get([data.length - 1]).get('percentageOfNetPay').value;
      this.pfArray.get([data.length - 1]).get('percentageOfNetPay').patchValue(0);
      this.percentTotal = this.percentTotal - lastValue;
    }
  
      return sum===NaN?0:sum;

  }

  keyPress(event: any) {

    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  amountTotal() {
    let data = this.pfArray.getRawValue();
    let sum: number = 0;
    data.forEach(a => sum += parseInt(a.amount==""?0:a.amount, 10));
    this.amtTotal = sum;
    return sum===NaN?0:sum;
  }

  percentValidate(event) {
    return event < 0 ? event = 0 : event; event > 100 ? event = 0 : event;
  }

  deleteRow(j: number) {
    console.log(j);
    this.pfArray.removeAt(j);
  }


  get pfArray() { return this.f.pfFormArray as FormArray; }
  get f() { return this.form.controls; }

  addIfscList(i) {
    const control = <FormArray>this.pfArray.get([i]).get('ifscList');
    control.push(this.createIfscList());

  }

  addAccountNoList(i) {
    const control = <FormArray>this.pfArray.get([i]).get('accountNoList');
    control.push(this.createAccountList());

  }
  addbankDropList(i) {
    const control = <FormArray>this.pfArray.get([i]).get('bankDropList');
    control.push(this.createBankList());

  }
  removebankDropList(i) {
    const control = <FormArray>this.pfArray.get([i]).get('bankDropList');
    control.removeAt(i);

  }


  addRow() {
    this.pfArray.push(this.formBuilder.group({
      employeeBankMapPayAreaId: new FormControl(''),
      payrollAreaInformationId: new FormControl(''),
      employeeBankInfoId: new FormControl(''),
      modeOfPayment: new FormControl(''),
      bankName: new FormControl(''),
      bankDropList: new FormArray([this.createBankList()]),
      ifsc: new FormControl(''),
      ifscList: new FormArray([this.createIfscList()]),
      accountNo: new FormControl(''),
      accountNoList: new FormArray([this.createAccountList()]),
      nameAsPerBank: new FormControl(''),
      percentActive:new FormControl('% of Net Pay'),
      percentOfNetPay:new FormControl(true),
      percentageOfNetPay: new FormControl(0),
      amount: new FormControl({value:0,disabled: true}),
      priority: new FormControl(''),
    }));

  }

  resetForPaymentMode(indexx) {
     this.pfArray.get([indexx]).get('bankName').reset();
     this.pfArray.get([indexx]).get('bankDropList').reset();
     this.pfArray.get([indexx]).get('employeeBankInfoId').reset();
     this.pfArray.get([indexx]).get('ifsc').reset();
     this.pfArray.get([indexx]).get('ifscList').reset();
     this.pfArray.get([indexx]).get('accountNo').reset();
     this.pfArray.get([indexx]).get('accountNoList').reset();
    this.pfArray.get([indexx]).get('nameAsPerBank').reset();

  }
  enableForPaymentMode(indexx) {
    this.pfArray.get([indexx]).get('bankName').enable();
    this.pfArray.get([indexx]).get('bankDropList').enable();
    this.pfArray.get([indexx]).get('employeeBankInfoId').enable();
    this.pfArray.get([indexx]).get('ifsc').enable();
    this.pfArray.get([indexx]).get('ifscList').enable();
    this.pfArray.get([indexx]).get('accountNo').enable();
    this.pfArray.get([indexx]).get('accountNoList').enable();
   this.pfArray.get([indexx]).get('nameAsPerBank').enable();
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

  DisableForOtherType(i){
this.pfArray.get([i]).get('bankName').disable();
this.pfArray.get([i]).get('accountNo').disable();
this.pfArray.get([i]).get('ifsc').disable();
  }

  viewDAta(event) {
    window.scrollTo(0, 0);
    this.viewFlag = true;

    //  console.log(event)
    let showSummary = this.disbursmentList.filter(element => element.payrollAreaCode === event.Area && element.typeOfPayment === event.typeOfPayment && element.payFromDate === event.fromDate);
    console.log(showSummary);
    const payroll = showSummary[0].payrollAreaCode
    this.payrollList = this.asignedPayrollList.filter(a => a.payrollAreaCode === payroll)
    const location = this.payData.find(a => a.payrollAreaCode == payroll);
    this.companyId = location.companyId;
    this.patchValues(showSummary);
    this.form.disable();
  }
  updateData(event) {
    window.scrollTo(0, 0);
    // this.updateFlag = true;
    this.viewFlag = false;
    let showSummary = this.disbursmentList.filter(element => element.payrollAreaCode === event.Area && element.typeOfPayment === event.typeOfPayment && element.payFromDate === event.fromDate );
    const payroll = showSummary[0].payrollAreaCode
    this.payrollList = this.asignedPayrollList.filter(a => a.payrollAreaCode === payroll)
    const location = this.payData.find(a => a.payrollAreaCode == payroll);
    this.companyId = location.companyId;
   this.typeOfPaymentList = this.typeOfPaymentList.filter(a => a.value === event.typeOfPayment)

    this.patchValues(showSummary);

  }

  patchValues(data) {
    //this.form.reset();

    // to reset only pfArrays values
    if(this.copyFrom==false  || this.copyFrom==undefined){
    this.getForm();
    this.getFormData();
    }
    //check from multibanking allowed or not
    // const location = this.companySetting.filter(a => a.companySetting.toLowerCase() === 'ismultibankingallowed');
    // console.log(location)
    // if (location[0].value == 'Yes') { this.multiBankingAllowed = true }
    // else {
    //   this.multiBankingAllowed = false
    // }
 
     this.form.setControl('pfFormArray', new FormArray([]));

     setTimeout(() => {
       
if(this.copyFrom==false  || this.copyFrom==undefined){
  this.form.patchValue({
    payrollAreaCode: data[0].payrollAreaCode,
    typeOfPayment: data[0].typeOfPayment,
    fromDate: data[0].payFromDate,
    toDate: data[0].payToDate
  })
}
  for (let j = 0; j < data.length; j++) {
    this.pfArrayPush();
    const ob1 = [];
    ob1.push({ accountNo: data[j].accountNo })
    this.pfArray.get([j]).get('accountNoList').patchValue(ob1)
    console.log('ob1AccountNoList', ob1)

   

    const ob2 = [];
    ob2.push({ ifsc: data[j].bankIFSC })
    this.pfArray.get([j]).get('ifscList').patchValue(ob2)

    this.filteredBankData = this.bankList;
    const ob3 = [];//.filter(ar => !list.find(rm => (rm.employeeBankInfoId === ar.employeeBankInfoId)))
    for (let i = 0; i < this.filteredBankData.length; i++) {
      const obj = {
        employeeBankInfoId : this.filteredBankData[i].employeeBankInfoId,
         bankname: this.filteredBankData[i].bankName };
      ob3.push(obj)
      if (i > 0) { this.addbankDropList(j) }
    }
    //  const ob3 = [];
    // ob3.push({ bankname: data[j].bankName })
    this.pfArray.get([j]).get('bankDropList').patchValue(ob3)
  let  payMode =data[j].paymentMode.toLowerCase();
  if(payMode =='cash' || payMode =='demand draft' || payMode== 'cheque'){
    this.DisableForOtherType(j);
    data[j].nameAsPerbank = localStorage.getItem('fullName');
  }

    const obj3 = [];
    this.pfArray.get([j]).patchValue({
      modeOfPayment: data[j].paymentMode,
      bankName: data[j].bankName,
      payrollAreaInformationId: data[j].payrollAreaInformationId,
      employeeBankMapPayAreaId: data[j].employeeBankMapPayAreaId,
      employeeBankInfoId: data[j].employeeBankInfoId,
      ifsc: data[j].bankIFSC,
      accountNo: data[j].accountNo,
      nameAsPerBank: data[j].nameAsPerBank,
      percentageOfNetPay: data[j].percentageOfNetPay,
      percentOfNetPay:data[j].percentOfNetPay,
      amount: data[j].amount,
      priority: data[j].priority
    })
    
  
  }

  console.log(this.form.value)
  }, 1000);
 
  }


  
  percentOrAmount(i) {
     console.log('toggleselectdd',i)  
let type= this.pfArray.get([i]).get('percentActive').value;
     if(type!=='% of Net Pay'){
      this.pfArray.get([i]).get('percentageOfNetPay').setValue(0);
       this.pfArray.get([i]).get('percentageOfNetPay').disable();
       this.pfArray.get([i]).get('amount').enable();
       this.pfArray.get([i]).get('percentOfNetPay').setValue(false);
       let maxArray:Array<any> =[];
       maxArray= this.pfArray.value;
     let maxPrio = Math.max.apply(Math, maxArray.map(function(o) { return o.priority; })) 
     let maxPriority = maxPrio==NaN ? 0:maxPrio;
      this.pfArray.get([i]).get('priority').patchValue(maxPriority+1)
     }else {
   
      this.pfArray.get([i]).get('amount').reset();
      this.pfArray.get([i]).get('amount').setValue(0);
      this.pfArray.get([i]).get('priority').reset();
      this.pfArray.get([i]).get('amount').disable();
      this.pfArray.get([i]).get('percentageOfNetPay').setValue(0);
      this.pfArray.get([i]).get('percentOfNetPay').setValue(true);
      this.pfArray.get([i]).get('percentageOfNetPay').enable();
     }
    
  }

  resetForm(){
 
    this.form.reset();
    this.multiBankingAllowed=false;
    this.form.setControl('pfFormArray', new FormArray([]));
  }

  copyFromChange(){
    this.copyFrom = true;
   let copy = this.form.get('copyFromPayrollArea').value;
    const copyData  = this.copyFromPayrollAreaList.find(a=>a.code==copy);

    const patchData = this.disbursmentList.filter(a=>a.payrollAreaInformationId == copyData.payrollAreaInformationId)
    this.patchValues(patchData);

  }
}
