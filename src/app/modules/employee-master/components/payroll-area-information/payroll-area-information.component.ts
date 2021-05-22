import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { PayrollAreaRequestModel } from './payroll-area-information.model';
import { PayrollAreaInformationService } from './payroll-area-information.service';
import { SharedInformationService } from '../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';
import { PreviousEmploymentInformationService } from '../previous-employment-information/previous-employment-information.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { familyAddressDetailRequestDTO } from '../family-information/family-information.model';
import { distinct } from 'rxjs/operators';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';



@Component({
  selector: 'app-payroll-area-information',
  templateUrl: './payroll-area-information.component.html',
  styleUrls: ['./payroll-area-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollAreaInformationComponent implements OnInit {

  PayrollAreaInfoForm: FormGroup;
  modalRef: BsModalRef;

  public PayrollAreaRequestModel = new PayrollAreaRequestModel('', '','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  NewPayrollAreaRequestModel: any;
  PayrollAreaFormSubscription: Subscription;
  employeeMasterId: any;
  date = { fromDate: "", toDate: "" }
  typeList = 'Primary,Secondary'.split(',');
  filteredTypeList: Array<any> = [];
  paymentModeList = 'Bank,Cheque,Demand Draft'.split(',');
  filteredpaymentModeList: Array<any> = [];
  typeOfPaymentList = 'Salary,Reimbursement'.split(',');
  // payrollAreaList = 'pa01-staff,pa02-worker,pa03-angola,pa03-allangols'.split(',');
  filteredtypeOfPaymentList: Array<any> = [];
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  percentOrAmountModel: any = 'percentOfNetPay';
  PayrollAreaSummaryGridData: Array<any> = [];
  AdditionalPayrollAreaSummaryGridData: Array<any> = [];
  bankDetailsArray: Array<any> = [];
  bankList: Array<any> = [];
  filteredbankList: Array<any> = [];
  deletePayrollIdList: Array<any> = [];
  payrollHT: any;
  payrollFlex: any;
  bankFlex: any;
  payrollEditingItem: any;
  existingPayrollEditingItem: any;
  payrollViewItem: any;
  payrollFlag: any;
  _currentEditItem: any;
  payrollItem: any;
  PayrollAreaPopupSaveSubscription: Subscription;
  disableToggleButton: boolean;
  bankCount: number;
  confirmDeleteSubscription: Subscription;
  setCancelPayrollEditPopupSubscription: Subscription;
  NewPayrollPopupFormSaveSubscription: Subscription;
  // additionPayrollFlag: boolean = false;
  additionalPayrollButton: boolean = false;
  TotalPercentLimit: any = 100;
  payrollAreaArray: Array<any> = [];
  multipleBankBoolean: boolean = true;
  required100: boolean = false;
  amountValid: boolean;
  validateBankGridRow: boolean;
  validateBankPercent: boolean;
  typeOfPaymentArray: Array<any> = [];
  disableAddButtonMultipleBankFalse: boolean;
  payrollAreaBackFromDate: any;
  TotalPercentCheckOnSave: number = 0;
  bankAccountList: Array<any> = [];
  saveNextBoolean: boolean = false;
  payrollEditFlag: boolean = false;
  payrollviewFlag: boolean = false;
  public today = new Date();
  JoiningDate: any;
  currencyArray: Array<any> = [];
  confirmationMsg: string;
  currentPayroll: any;
  attendanceAreaArray: Array<any> = [{ id: 1, code: 'Att1' }, { id: 2, code: 'Att2' }];
  attAreaList ='Att1,Att2'.split(',');
  BankData : Array<any>=[];
 PayrollData:Array<any>=[];
 secondaryList : Array<any>=[];
 BankFromDateMinDays:any;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private PayrollAreaService: PayrollAreaInformationService,
    private router: Router,
    private CommonDataService: SharedInformationService,
    private PreviousEmpInformationService: PreviousEmploymentInformationService,
    private modalService: BsModalService) { }


  ngOnInit(): void {
    this.PayrollAreaInfoForm = this.formBuilder.group({
      payrollAreaCode: ['', Validators.required],
      description: [''],
      type: [''], // Validators.required
      fromDate: [this.date.fromDate, Validators.required],
      toDate: [{ value: this.date.toDate, disabled: true }, Validators.required],
      isHoldSalary: [this.PayrollAreaRequestModel.isHoldSalary],
      isFFS: [this.PayrollAreaRequestModel.isFFS],
      attendanceAreaCode: [''],
      attendanceAreaFromDate: [this.date.fromDate],
      attendanceAreaToDate: [{ value: this.date.toDate, disabled: true }],
      paymentMode: [this.PayrollAreaRequestModel.paymentMode, Validators.required],
      bankName: ['', Validators.required],
      bankAccount: [''],
      typeOfPayment: ['', Validators.required],
      percent: ['', Validators.required],
      amount: [''],
      toggle: [''],
      priority: [{ value: this.date.toDate, disabled: true }],
      bankfromDate: [this.date.fromDate, Validators.required],
      banktoDate: [{ value: this.date.toDate, disabled: true }, Validators.required],
      currency: [''],


    });

    const JoiningDate = localStorage.getItem('joiningDate');
    this.JoiningDate = new Date(JoiningDate)


    if (!this.multipleBankBoolean) {
      const temp13 = this.PayrollAreaInfoForm.get('percent');
      temp13.disable();
      const temp14 = this.PayrollAreaInfoForm.get('currency');
      temp14.disable();
      const temp15 = this.PayrollAreaInfoForm.get('amount');
      temp15.disable();
      const temp18 = this.PayrollAreaInfoForm.get('toggle');
      temp18.disable();
    }
    if (this.percentOrAmountModel == 'percentOfNetPay') {
      const temp15 = this.PayrollAreaInfoForm.get('priority');
      temp15.disable();
    }
    this.bankDetailsDisable();

    this.PayrollAreaRequestModel.payrollAreaToDate = '31-Dec-9999';
    this.PayrollAreaRequestModel.payToDate = '31-Dec-9999';
    this.PayrollAreaRequestModel.attendanceAreaToDate = '31-Dec-9999';
    // this.PayrollAreaRequestModel.percentageOfNetPay = 100;
    if (!this.multipleBankBoolean) {
      this.PayrollAreaRequestModel.percentageOfNetPay = 100;
      this.PayrollAreaInfoForm.patchValue({
        percent: 100,
      })
      const temp13 = this.PayrollAreaInfoForm.get('percent');
      temp13.disable();
    }

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getPayrollAreaInformation();
    this.PayrollAreaService.getPayrollAreaDetails().subscribe(res => {

      this.payrollAreaArray = res.data.results;
      res.data.results.forEach(res => {
        this.payrollAreaList.push(res.payrollAreaCode);

        setTimeout(() => {
          this.PayrollAreaRequestModel.payrollAreaCode = '';
        }, 100)
      })
    })

    

    // this.attendanceAreaArray.forEach(element=>{
    //   this.attAreaList.push(element.code)
    // })

    this.PreviousEmpInformationService.getCurrencyList().subscribe(res => {
      this.currencyArray = res.data.results;
    })

    this.PayrollAreaRequestModel.typeOfPayment = 'Salary';
    //this.PayrollAreaRequestModel.type = 'Primary';
    this.PayrollAreaInfoForm.patchValue({
      //type: 'Primary',
      typeOfPayment: 'Salary'
    })

    this.PayrollAreaService.getBankAccountDetails(this.employeeMasterId).subscribe(res => {

      this.bankDetailsArray = res.data.results[0];
      // this.bankCount = res.data.results[0].length;
      this.bankList = [];
      res.data.results[0].forEach(res => {
        this.bankList.push(res.bankName);

        setTimeout(() => {
          this.PayrollAreaRequestModel.bankName = '';
        }, 100)
      })
    })

    this.getSecondaryPayrollArea(empId);

  }

  

  payrollAssignValues(payrollAreaCode) {

    this.payrollAreaArray.forEach(element => {
      if (element.payrollAreaCode == payrollAreaCode) {

        this.PayrollAreaRequestModel.description = element.headGroupDefinitionResponse.description;
        this.PayrollAreaRequestModel.currency = element.currency;
       this.PayrollAreaRequestModel.payrollAreaId = element.payrollAreaId;
        this.PayrollAreaInfoForm.get('currency').setValue(element.currency);
      }
    })
  }


  PayrollSaveNextSubmit(PayrollAreaRequestModel) {
    this.saveNextBoolean = true;

    this.savePayrollArea(PayrollAreaRequestModel);
  }


  savePayrollArea(PayrollAreaRequestModel) {

    if (this.multipleBankBoolean == false) {
      PayrollAreaRequestModel.multiBankingAllowed = 0;
    }
    if (this.multipleBankBoolean == true) {
      PayrollAreaRequestModel.multiBankingAllowed = 1;
    }

    PayrollAreaRequestModel.employeeMasterId = this.employeeMasterId;
    PayrollAreaRequestModel.payFromDate = this.datepipe.transform(PayrollAreaRequestModel.payFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.payrollAreaFromDate = this.datepipe.transform(PayrollAreaRequestModel.payrollAreaFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.payrollAreaToDate = this.datepipe.transform(PayrollAreaRequestModel.payrollAreaToDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.attendanceAreaFromDate = this.datepipe.transform(PayrollAreaRequestModel.attendanceAreaFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.attendanceAreaToDate = this.datepipe.transform(PayrollAreaRequestModel.attendanceAreaToDate, 'dd-MMM-yyyy');
    if (this.PayrollAreaInfoForm.get('isHoldSalary').value == '') this.PayrollAreaRequestModel.isHoldSalary = false;
    if (this.PayrollAreaInfoForm.get('isFFS').value == '') this.PayrollAreaRequestModel.isFFS = false;
    // if (PayrollAreaRequestModel.currency == '') {
    delete PayrollAreaRequestModel.currency;
    //delete PayrollAreaRequestModel.accountNO;
   // delete PayrollAreaRequestModel.bankAccount;
   // delete PayrollAreaRequestModel.bankName;
    delete PayrollAreaRequestModel.nameAsPerBank;
    // }
    console.log(PayrollAreaRequestModel);
    this.PayrollAreaService.postPayrollAreaInfoForm(PayrollAreaRequestModel).subscribe(res => {

      this.getPayrollAreaInformation();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      // this.payrollAreaDisable();
      this.getSecondaryPayrollArea(PayrollAreaRequestModel.employeeMasterId);
      this.PayrollAreaRequestModel.bankName = '';
      this.PayrollAreaRequestModel.accountNO = '';
     // this.PayrollAreaRequestModel.nameAsPerBank = '';
      this.PayrollAreaRequestModel.typeOfPayment = '';
      this.PayrollAreaRequestModel.amount = '';
      if (this.multipleBankBoolean == true) {
        this.PayrollAreaRequestModel.percentageOfNetPay = '';
      }
      this.PayrollAreaRequestModel.payFromDate = '';
      this.percentOrAmountModel = 'percentOfNetPay';
      this.PayrollAreaRequestModel.priority = '';
      this.payrollEditFlag = false;
      this.payrollviewFlag = false;
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/job-information/organization-details']);
      }
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  updatePayrollArea(PayrollAreaRequestModel) {

    if (this.multipleBankBoolean == false) {
      PayrollAreaRequestModel.multiBankingAllowed = 0;
    }
    if (this.multipleBankBoolean == true) {
      PayrollAreaRequestModel.multiBankingAllowed = 1;
    }

    PayrollAreaRequestModel.employeeMasterId = this.employeeMasterId;
    PayrollAreaRequestModel.payFromDate = this.datepipe.transform(PayrollAreaRequestModel.payFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.payrollAreaFromDate = this.datepipe.transform(PayrollAreaRequestModel.payrollAreaFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.payrollAreaToDate = this.datepipe.transform(PayrollAreaRequestModel.payrollAreaToDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.attendanceAreaFromDate = this.datepipe.transform(PayrollAreaRequestModel.attendanceAreaFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.attendanceAreaToDate = this.datepipe.transform(PayrollAreaRequestModel.attendanceAreaToDate, 'dd-MMM-yyyy');
    // if (PayrollAreaRequestModel.currency == '') {
    delete PayrollAreaRequestModel.currency;
    delete PayrollAreaRequestModel.bankAccount;
    // }
    this.PayrollAreaService.postPayrollAreaInfoForm(PayrollAreaRequestModel).subscribe(res => {

      this.getPayrollAreaInformation();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.payrollAreaDisable();

      this.PayrollAreaRequestModel.payrollAreaInformationId = null;
      this.PayrollAreaRequestModel.bankName = '';
      this.PayrollAreaRequestModel.accountNO = '';
      //this.PayrollAreaRequestModel.nameAsPerBank = '';
      this.PayrollAreaRequestModel.typeOfPayment = '';
      this.PayrollAreaRequestModel.amount = '';
      this.payrollEditFlag = false;
      this.payrollviewFlag = false;
      const temp15 = this.PayrollAreaInfoForm.get('toDate');
      temp15.disable();
      if (this.multipleBankBoolean == true) {
        this.PayrollAreaRequestModel.percentageOfNetPay = '';
      }
      this.PayrollAreaRequestModel.payFromDate = '';
      this.percentOrAmountModel = 'percentOfNetPay';
      this.PayrollAreaRequestModel.priority = '';
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }


  bankIdAssignValues(bankName) {
    this.bankDetailsArray.forEach(element => {
      if (element.bankName == bankName) {
        this.PayrollAreaRequestModel.employeeBankInfoId = element.employeeBankInfoId;
        this.PayrollAreaRequestModel.accountNO = element.accountNo;
      }
    })
  }

  // payrollAreaIdAssignValues(payrollCode) {
  //   this.bankDetailsArray.forEach(element => {
  //     if (element.payrollCode == payrollCode) {
  //       this.PayrollAreaRequestModel.payrollAreaId = element.payrollAreaId;
  //     }
  //   })
  // }

  attendanceAreaIdAssignValues(attendanceAreaCode) {
    
    this.attendanceAreaArray.forEach(element => {
      if (element.code == attendanceAreaCode ) {
        this.PayrollAreaRequestModel.attendanceAreaId = element.id;
      }
    })
  }

  deletePayroll(payroll, confirmation) {
    this.currentPayroll = payroll;
    this.confirmationMsg = 'Do you really want to delete?';
    this.modalRef = this.modalService.show(
      confirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  deleteRecord() {
    this.PayrollAreaService.deletePayrollAreaGridItem(this.currentPayroll.payrollAreaInformationId).subscribe(res => {

      this.getPayrollAreaInformation();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.payrollEditFlag = false;
      this.payrollviewFlag = false;
      this.resetPayrollAreaForm();
      this.modalRef.hide();
    })
  }

  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {

      this.PayrollAreaSummaryGridData = res.data.results[0];
    
      this.PayrollAreaSummaryGridData.map(x =>  this.BankData.filter(a => a.employeeBankMapPayAreaId == x.employeeBankMapPayAreaId ).length > 0 ? null :  this.BankData.push(x));
    console.log(this.BankData);
    
    this.PayrollAreaSummaryGridData.map(x =>  this.PayrollData.filter(a => a.attendanceAreaFromDate == x.attendanceAreaFromDate ).length > 0 ? null :  this.PayrollData.push(x));
console.log(this.PayrollData);

    }, (error: any) => {
      if (error["error"]["status"]["code"] == 404) {
        this.PayrollAreaSummaryGridData = [];
      }
    })
  }

  editPayroll(payroll) {

    this.payrollEditFlag = true;
    this.payrollviewFlag = false;
    this.bankDetailsEnable();
    this.payrollAreaEnable();
    if (this.percentOrAmountModel == 'amount') {
      const temp15 = this.PayrollAreaInfoForm.get('priority');
      temp15.enable();
    }
    const temp15 = this.PayrollAreaInfoForm.get('toDate');
    temp15.enable();
    this.PayrollAreaRequestModel.employeeBankMapPayAreaId = payroll.employeeBankMapPayAreaId;

    this.PayrollAreaRequestModel.payrollAreaInformationId = payroll.payrollAreaInformationId;
    this.PayrollAreaRequestModel.payrollAreaCode = payroll.payrollAreaCode;
    this.PayrollAreaRequestModel.description = payroll.description;
    this.PayrollAreaRequestModel.type = payroll.type;
    this.PayrollAreaRequestModel.payrollAreaFromDate = payroll.payrollAreaFromDate;
    this.PayrollAreaRequestModel.payrollAreaToDate = payroll.payrollAreaToDate;
    this.PayrollAreaRequestModel.paymentMode = payroll.paymentMode;
    this.PayrollAreaRequestModel.isFFS = payroll.isFFS;
    this.PayrollAreaRequestModel.isHoldSalary = payroll.isHoldSalary;

    this.PayrollAreaRequestModel.employeeBankInfoId = payroll.employeeBankInfoId;
    this.PayrollAreaRequestModel.bankName = payroll.bankName;
    this.PayrollAreaRequestModel.accountNO = payroll.accountNo;
    this.PayrollAreaRequestModel.typeOfPayment = payroll.typeOfPayment;
    this.PayrollAreaRequestModel.percentageOfNetPay = payroll.percentageOfNetPay;
    this.PayrollAreaRequestModel.amount = payroll.amount;
    this.PayrollAreaRequestModel.payFromDate = payroll.payFromDate;
    this.PayrollAreaRequestModel.payToDate = payroll.payToDate;
    this.PayrollAreaRequestModel.priority = payroll.priority;

    this.PayrollAreaRequestModel.attAreaInfoId=payroll.attAreaInfoId;
    this.PayrollAreaRequestModel.attendanceAreaId = payroll.attendanceAreaId;
    this.PayrollAreaRequestModel.attendanceAreaCode = payroll.attendanceAreaCode;
    this.PayrollAreaRequestModel.attendanceAreaFromDate = payroll.payrollAreaFromDate;
    this.PayrollAreaRequestModel.attendanceAreaToDate = payroll.payrollAreaToDate;

    this.flterBankDetails();
    this.PayrollAreaInfoForm.patchValue(this.PayrollAreaRequestModel)
    this.PayrollAreaInfoForm.patchValue({
      fromDate: this.PayrollAreaRequestModel.payrollAreaFromDate,
      bankfromDate: this.PayrollAreaRequestModel.payFromDate
    })
  }

  viewPayroll(payroll) {

    this.payrollEditFlag = false;
    this.payrollviewFlag = true;

    this.payrollAreaDisable();
    this.bankDetailsDisable();
    this.PayrollAreaRequestModel.payrollAreaCode = payroll.payrollAreaCode;
    this.PayrollAreaRequestModel.description = payroll.description;
    this.PayrollAreaRequestModel.type = payroll.type;
    this.PayrollAreaRequestModel.payrollAreaFromDate = payroll.payrollAreaFromDate;
    this.PayrollAreaRequestModel.payrollAreaToDate = payroll.payrollAreaToDate;
    this.PayrollAreaRequestModel.paymentMode = payroll.paymentMode;

    this.PayrollAreaRequestModel.bankName = payroll.bankName;
    this.PayrollAreaRequestModel.accountNO = payroll.accountNO;
    this.PayrollAreaRequestModel.typeOfPayment = payroll.typeOfPayment;
    this.PayrollAreaRequestModel.percentageOfNetPay = payroll.percentageOfNetPay;
    this.PayrollAreaRequestModel.amount = payroll.amount;
    this.PayrollAreaRequestModel.payFromDate = payroll.payFromDate;
    this.PayrollAreaRequestModel.payToDate = payroll.payToDate;
    this.PayrollAreaRequestModel.priority = payroll.priority;

    // this.PayrollAreaRequestModel.attAreaInfoId=payroll.attAreaInfoId;
    // this.PayrollAreaRequestModel.attendanceAreaId = payroll.attendanceAreaId;
    this.PayrollAreaRequestModel.attendanceAreaCode = payroll.attendanceAreaCode;
    this.PayrollAreaRequestModel.attendanceAreaFromDate = payroll.payrollAreaFromDate;
    this.PayrollAreaRequestModel.attendanceAreaToDate = payroll.payrollAreaToDate;
  }

  cancelSkillView() {

    this.payrollEditFlag = false;
    this.payrollviewFlag = false;

    const temp15 = this.PayrollAreaInfoForm.get('toDate');
    temp15.disable();

    this.resetPayrollAreaForm();

  }
  // PayrollAreaToGrid(PayrollAreaRequestModel) {
  //   if (this.additionPayrollFlag) {
  //     this.pushAdditionalPayrollAreaToGrid(PayrollAreaRequestModel)
  //   } else {
  //     this.pushPayrollAreaToGrid(PayrollAreaRequestModel);
  //   }
  // }


  payrollAreaDisable() {
    const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
    temp1.disable();
    const temp2 = this.PayrollAreaInfoForm.get('description');
    temp2.disable();
    const temp3 = this.PayrollAreaInfoForm.get('type');
    temp3.disable();
    const temp4 = this.PayrollAreaInfoForm.get('fromDate');
    temp4.disable();
    const temp5 = this.PayrollAreaInfoForm.get('toDate');
    temp5.disable();
    const temp9 = this.PayrollAreaInfoForm.get('paymentMode');
    temp9.disable();
  }

  payrollAreaEnable() {
    const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
    temp1.enable();
    const temp2 = this.PayrollAreaInfoForm.get('description');
    temp2.enable();
    const temp3 = this.PayrollAreaInfoForm.get('type');
    temp3.enable();
    const temp4 = this.PayrollAreaInfoForm.get('fromDate');
    temp4.enable();
    // const temp5 = this.PayrollAreaInfoForm.get('toDate');
    // temp5.enable();
    const temp9 = this.PayrollAreaInfoForm.get('paymentMode');
    temp9.enable();
  }

  percentOrAmount(event) {

    if (event == false) {
      this.percentOrAmountModel = "percentOfNetPay";
      this.PayrollAreaRequestModel.isPercentOfNetPay = 1;
      this.PayrollAreaRequestModel.isAmount = 0;
      this.PayrollAreaRequestModel.amount = '';
      // this.PayrollAreaRequestModel.currency = '';
      const temp13 = this.PayrollAreaInfoForm.get('priority');
      temp13.disable();
      this.PayrollAreaRequestModel.priority = ''
      this.amountValid = false;
    } else {
      this.PayrollAreaRequestModel.isPercentOfNetPay = 0;
      this.PayrollAreaRequestModel.isAmount = 1;
      this.percentOrAmountModel = "amount";
      this.PayrollAreaRequestModel.percentageOfNetPay = '';
      const temp13 = this.PayrollAreaInfoForm.get('priority');
      temp13.enable();
      this.amountValid = true;

      if (this.PayrollAreaSummaryGridData.length == 0) {
        this.PayrollAreaRequestModel.priority = '1';
      }
      this.PayrollAreaSummaryGridData.some(res => {
        let priority: number
        if (!res.amount) {
          this.PayrollAreaRequestModel.priority = '1';
        } else {
          priority = +res.priority;
          priority = priority + 1;
          return this.PayrollAreaRequestModel.priority = JSON.stringify(priority);
        }
      })
    }
  }

  resetPayrollAreaForm() {
    this.PayrollAreaInfoForm.get('bankName').reset();
    this.PayrollAreaInfoForm.get('bankAccount').reset();
    this.PayrollAreaInfoForm.get('typeOfPayment').reset();
    // this.PayrollAreaInfoForm.get('percent').reset();
    this.PayrollAreaInfoForm.get('amount').reset();
    this.PayrollAreaInfoForm.get('toggle').reset();
    this.PayrollAreaInfoForm.get('priority').reset();
    this.PayrollAreaInfoForm.get('bankfromDate').reset();
    // this.PayrollAreaInfoForm.get('banktoDate').reset();
    this.PayrollAreaInfoForm.get('currency').reset();
    this.PayrollAreaRequestModel.payrollAreaInformationId = 0;
    const temp15 = this.PayrollAreaInfoForm.get('toDate');
    temp15.disable();
  }

  bankDetailsValidations() {
    if (this.PayrollAreaRequestModel.paymentMode != 'Bank') {
      this.disableToggleButton = true;
      this.bankDetailsDisable();
      this.PayrollAreaRequestModel.bankName = '';
      this.PayrollAreaRequestModel.accountNO = '';
      this.PayrollAreaRequestModel.typeOfPayment = '';
      this.PayrollAreaRequestModel.percentageOfNetPay = '';
      this.PayrollAreaRequestModel.amount = '';
      this.PayrollAreaRequestModel.payFromDate = '';
      this.PayrollAreaRequestModel.payToDate = '';
      this.PayrollAreaRequestModel.priority = '';
    } else {
      this.disableToggleButton = false;
      this.bankDetailsEnable();
    }
  }

  bankDetailsEnable() {

    const temp10 = this.PayrollAreaInfoForm.get('bankName');
    temp10.enable();
    const temp11 = this.PayrollAreaInfoForm.get('bankAccount');
    temp11.enable();
    const temp12 = this.PayrollAreaInfoForm.get('typeOfPayment');
    temp12.enable();
    if (this.multipleBankBoolean) {
      const temp13 = this.PayrollAreaInfoForm.get('percent');
      temp13.enable();
      const temp14 = this.PayrollAreaInfoForm.get('amount');
      temp14.enable();
      const temp17 = this.PayrollAreaInfoForm.get('currency');
      temp17.enable();
      const temp18 = this.PayrollAreaInfoForm.get('toggle');
      temp18.enable();
    }
    // const temp15 = this.PayrollAreaInfoForm.get('priority');
    // temp15.enable();
    const temp16 = this.PayrollAreaInfoForm.get('bankfromDate');
    temp16.enable();
    // const temp17 = this.PayrollAreaInfoForm.get('banktoDate');
    // temp17.enable();

    // this.PayrollAreaRequestModel.currency = payroll[0].currency;
    // this.PayrollAreaRequestModel.description = payroll[0].payrollAreaDescription;
  }

  bankDetailsDisable() {
    const temp10 = this.PayrollAreaInfoForm.get('bankName');
    temp10.disable();
    const temp11 = this.PayrollAreaInfoForm.get('bankAccount');
    temp11.disable();
    const temp12 = this.PayrollAreaInfoForm.get('typeOfPayment');
    temp12.disable();
    if (this.multipleBankBoolean) {
      const temp13 = this.PayrollAreaInfoForm.get('percent');
      temp13.disable();
    }
    const temp17 = this.PayrollAreaInfoForm.get('currency');
    temp17.disable();
    const temp14 = this.PayrollAreaInfoForm.get('amount');
    temp14.disable();
    const temp15 = this.PayrollAreaInfoForm.get('priority');
    temp15.disable();
    const temp16 = this.PayrollAreaInfoForm.get('bankfromDate');
    temp16.disable();
    // const temp17 = this.PayrollAreaInfoForm.get('banktoDate');
    // temp17.disable();
    const temp18 = this.PayrollAreaInfoForm.get('toggle');
    temp18.disable();
  }

  getSecondaryPayrollArea(empId){
    this.PayrollAreaService.getSecondaryPayrollArea(empId).subscribe(res => {
          const secondaryPayrollDetils = res.data.results[0];
          secondaryPayrollDetils.forEach(element => {
        this.secondaryList.push(element.payrollAreaCode);        
      })
    
    })
    }

    setBankFromDateMinDay(){
      this.BankFromDateMinDays = this.PayrollAreaInfoForm.get('fromDate').value;
    }
    

  flterBankDetails() {

    const bank = this.bankDetailsArray.filter(item => {
      if (item.bankName == this.PayrollAreaRequestModel.bankName) {
        return item;
      }
    });
    this.PayrollAreaRequestModel.accountNO = bank[0].accountNo;
    this.bankAccountList = bank;
  }

  getBankFromGrid() {
    if (this.PayrollAreaSummaryGridData.length > 0) {
      const getBank = this.PayrollAreaSummaryGridData.filter(item => {
        if (item.bankName == this.PayrollAreaRequestModel.bankName) {
          return item;
        }
      });
      this.PayrollAreaRequestModel.bankName = getBank[0].bankName;
      this.PayrollAreaRequestModel.accountNO = getBank[0].accountNO;
      this.PayrollAreaRequestModel.typeOfPayment = getBank[0].typeOfPayment;
      // this.PayrollAreaRequestModel.percentageOfNetPay = getBank[0].percentageOfNetPay;
      // this.PayrollAreaRequestModel.amount = getBank[0].amount;
      this.PayrollAreaRequestModel.payFromDate = getBank[0].payFromDate;
      this.PayrollAreaRequestModel.payToDate = getBank[0].payToDate;
      // this.PayrollAreaRequestModel.priority = getBank[0].priority;
    }
  }

  checkPercentValid(percentageOfNetPay) {

    if (percentageOfNetPay == this.TotalPercentLimit) {
      this.CommonDataService.sweetalertError('You can not exceed percent limit more than' + this.TotalPercentLimit);
    }
    if (this.TotalPercentLimit == 0) {
      this.CommonDataService.sweetalertError('You can not exceed percent limit more than 100%');
    }
  }

  amountValidCheck() {
    //     let amt=this.PayrollAreaInfoForm.get('amount').value
    // if(amt){
    if (this.PayrollAreaRequestModel.amount) {
      this.amountValid = true;
    } else {
      this.amountValid = false;
    }
  }

  additionPayrollValidation() {
    // this.additionPayrollFlag = true;
    this.resetPayrollAreaForm();
    this.TotalPercentLimit = 100;
    const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
    temp1.enable();
    const temp2 = this.PayrollAreaInfoForm.get('description');
    temp2.enable();
    const temp3 = this.PayrollAreaInfoForm.get('type');
    temp3.enable();
    const temp4 = this.PayrollAreaInfoForm.get('fromDate');
    temp4.enable();
    // const temp5 = this.PayrollAreaInfoForm.get('toDate');
    // temp5.enable();
    const temp9 = this.PayrollAreaInfoForm.get('paymentMode');
    temp9.enable();
  }

  pushAdditionalPayrollAreaToGrid(PayrollAreaRequestModel) {

    let percentShouldBe100;
    let AllpercentShouldBe100;
    if (this.AdditionalPayrollAreaSummaryGridData.length == 0) {
      this.validateBankGridRow = false;
    }
    // multipleBank flag true Case (Multiple banks can add)
    if (this.AdditionalPayrollAreaSummaryGridData.length > 0 && this.multipleBankBoolean) {
      this.AdditionalPayrollAreaSummaryGridData.some(res => {

        if (res.payrollAreaCode == PayrollAreaRequestModel.payrollAreaCode) {
          if (PayrollAreaRequestModel.bankName == res.bankName
            && PayrollAreaRequestModel.typeOfPayment == res.typeOfPayment) {
            return this.validateBankGridRow = true;
          } else {
            this.validateBankGridRow = false;
          }
          PayrollAreaRequestModel.payFromDate = this.datepipe.transform(PayrollAreaRequestModel.payFromDate, 'dd-MMM-yyyy');

          if (PayrollAreaRequestModel.payFromDate == res.payFromDate) {
            return this.validateBankGridRow = true;
          }

          if (PayrollAreaRequestModel.isPercentOfNetPay == 1 &&
            PayrollAreaRequestModel.bankName != res.bankName
            && PayrollAreaRequestModel.typeOfPayment == res.typeOfPayment) {
            let TotalPercent
            if (res.percentageOfNetPay) {
              TotalPercent = res.percentageOfNetPay + PayrollAreaRequestModel.percentageOfNetPay;
            }
            if (TotalPercent > 100) {
              this.validateBankPercent = true;
              return this.validateBankGridRow = true;
              // return this.notifyService.showError('All records Percentage of Net Pay should be 100%', "Attention..!!");
            }
            else {
              this.validateBankPercent = false;
              this.validateBankGridRow = false;
            }
          }
        }

      })
      if (this.validateBankGridRow == true) {
        this.CommonDataService.sweetalertError('This Bank Record details are already exist');
      }
      if (this.validateBankPercent == true) {
        this.CommonDataService.sweetalertError('All records Percentage of Net Pay should be 100%');
        this.validateBankPercent = false;
      }
    }

    // multipleBank flag false Case (Multiple banks can not add)
    if (this.AdditionalPayrollAreaSummaryGridData.length > 0 && !this.multipleBankBoolean) {
      this.AdditionalPayrollAreaSummaryGridData.some(res => {

        if (res.payrollAreaCode == PayrollAreaRequestModel.payrollAreaCode) {
          PayrollAreaRequestModel.payFromDate = this.datepipe.transform(PayrollAreaRequestModel.payFromDate, 'dd-MMM-yyyy');

          if (PayrollAreaRequestModel.payFromDate == res.payFromDate) {
            return this.validateBankGridRow = true;
          } else {
            this.validateBankGridRow = false;
          }
        } else {
          this.validateBankGridRow = false;
        }
        if (PayrollAreaRequestModel.bankName != res.bankName) {
          this.validateBankGridRow = true;
        }
        // if (PayrollAreaRequestModel.bankAccount != res.bankAccount) {
        //   this.validateBankGridRow = true;
        // }
        if (PayrollAreaRequestModel.bankName != res.bankName
          && PayrollAreaRequestModel.typeOfPayment != res.typeOfPayment) {
          this.validateBankGridRow = true;
        }
        if (PayrollAreaRequestModel.typeOfPayment == res.typeOfPayment) {
          this.validateBankGridRow = true;
        }
        if (PayrollAreaRequestModel.isPercentOfNetPay == 1) {
          if (PayrollAreaRequestModel.typeOfPayment == res.typeOfPayment
            || PayrollAreaRequestModel.percentageOfNetPay != 100) {
            this.validateBankGridRow = true;
          }
        }

        if (PayrollAreaRequestModel.typeOfPayment == res.typeOfPayment
          && res.isPercentOfNetPay && PayrollAreaRequestModel.isAmount) {
          this.validateBankGridRow = true;
        }

        if (res.typeOfPayment == 'Salary' && PayrollAreaRequestModel.typeOfPayment != res.typeOfPayment) {
          this.typeOfPaymentArray.push(res.typeOfPayment);
        }
        if (res.typeOfPayment == 'Reimbursement' && PayrollAreaRequestModel.typeOfPayment != res.typeOfPayment) {
          this.typeOfPaymentArray.push(res.typeOfPayment);
        }
        if (this.typeOfPaymentArray.length == 2) {
          this.disableAddButtonMultipleBankFalse = true;
        }
      })
      if (this.validateBankGridRow == true) {
        this.CommonDataService.sweetalertError('You can not add more than one bank with same Account Type.');
      }
    }
    if (this.percentOrAmountModel == 'percentOfNetPay') {
      PayrollAreaRequestModel.isPercentOfNetPay = 1;
    }
    if (this.required100 && PayrollAreaRequestModel.isPercentOfNetPay == 1 && !this.multipleBankBoolean) {
      if (PayrollAreaRequestModel.percentageOfNetPay != 100) {
        percentShouldBe100 = true;
        this.CommonDataService.sweetalertError('Percentage of Net Pay should be 100%');
      }
    }

    if (this.validateBankGridRow != true) {
      if (this.AdditionalPayrollAreaSummaryGridData.length > 1) {
        const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
        temp1.disable();
      } else {
        const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
        temp1.enable();
      }

      let data = [];
      let Additional = [];
      let PayrollAreaSummaryGridData = [];
      let AdditionalPayrollAreaSummaryGridData = [];

      if (this.percentOrAmountModel == 'percentOfNetPay') {
        PayrollAreaRequestModel.isPercentOfNetPay = 1;
        PayrollAreaRequestModel.percentageOfNetPay = PayrollAreaRequestModel.percentageOfNetPay;
      } else {
        PayrollAreaRequestModel.isAmount = 1;
        PayrollAreaRequestModel.amount = PayrollAreaRequestModel.amount;
      }
      PayrollAreaSummaryGridData.push(PayrollAreaRequestModel);
      AdditionalPayrollAreaSummaryGridData.push(PayrollAreaRequestModel);
      for (var val of PayrollAreaSummaryGridData) {
        let i = 0;
        data.push({
          payrollAreaCode: val.payrollAreaCode,
          description: val.description,
          type: val.type,
          payrollAreaFromDate: val.payrollAreaFromDate,
          payrollAreaToDate: val.payrollAreaToDate,
          paymentMode: val.paymentMode,
          bankName: val.bankName,
          bankAccount: val.bankAccount,
          typeOfPayment: val.typeOfPayment,
          isPercentOfNetPay: val.isPercentOfNetPay,
          percentageOfNetPay: val.percentageOfNetPay,
          isAmount: val.isAmount,
          amount: val.amount,
          payFromDate: val.payFromDate,
          payToDate: val.payToDate,
          priority: val.priority
        });

      }
      for (var val of AdditionalPayrollAreaSummaryGridData) {
        let i = 0;
        Additional.push({
          payrollAreaCode: val.payrollAreaCode,
          description: val.description,
          type: val.type,
          payrollAreaFromDate: val.payrollAreaFromDate,
          payrollAreaToDate: val.payrollAreaToDate,
          paymentMode: val.paymentMode,
          bankName: val.bankName,
          bankAccount: val.bankAccount,
          typeOfPayment: val.typeOfPayment,
          isPercentOfNetPay: val.isPercentOfNetPay,
          percentageOfNetPay: val.percentageOfNetPay,
          isAmount: val.isAmount,
          amount: val.amount,
          payFromDate: val.payFromDate,
          payToDate: val.payToDate,
          priority: val.priority
        });
      }

      if (this.PayrollAreaSummaryGridData.length > 0) {
        let newData = data.concat(this.PayrollAreaSummaryGridData);
        this.PayrollAreaSummaryGridData = newData;

        let additionalNewData = Additional.concat(this.AdditionalPayrollAreaSummaryGridData);
        this.AdditionalPayrollAreaSummaryGridData = additionalNewData;

        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payrollAreaFromDate = this.datepipe.transform(data.payrollAreaFromDate, 'dd-MMM-yyyy');
        })
        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payrollAreaToDate = this.datepipe.transform(data.payrollAreaToDate, 'dd-MMM-yyyy');
        })

        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payFromDate = this.datepipe.transform(data.payFromDate, 'dd-MMM-yyyy');
        })
        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payToDate = this.datepipe.transform(data.payToDate, 'dd-MMM-yyyy');
        })

      } else {
        this.PayrollAreaSummaryGridData = data;
        this.AdditionalPayrollAreaSummaryGridData = data;


        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payrollAreaFromDate = this.datepipe.transform(data.payrollAreaFromDate, 'dd-MMM-yyyy');
        })
        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payrollAreaToDate = this.datepipe.transform(data.payrollAreaToDate, 'dd-MMM-yyyy');
        })

        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payFromDate = this.datepipe.transform(data.payFromDate, 'dd-MMM-yyyy');
        })
        this.PayrollAreaSummaryGridData.forEach(data => {
          return data.payToDate = this.datepipe.transform(data.payToDate, 'dd-MMM-yyyy');
        })
      }

      this.PayrollAreaRequestModel.bankName = '';
      this.PayrollAreaRequestModel.accountNO = '';
      this.PayrollAreaRequestModel.typeOfPayment = '';
      this.PayrollAreaRequestModel.amount = '';
      this.PayrollAreaRequestModel.payFromDate = '';
      // this.PayrollAreaRequestModel.payToDate = '';
      // this.PayrollAreaRequestModel.priority = '';
      // this.bankDetailsDisable();
      this.percentOrAmountModel = 'percentOfNetPay';
      this.PayrollAreaRequestModel.priority = '';
      this.existingPayrollEditingItem = localStorage.getItem('payrollEditingItem');
      this.existingPayrollEditingItem = JSON.parse(this.existingPayrollEditingItem);
    }
  }

  holdSalarySetBoolean() {
    this.PayrollAreaRequestModel.isHoldSalary = this.PayrollAreaInfoForm.get('isHoldSalary').value;
    this.PayrollAreaRequestModel.isFFS = '';
  }

  ffsSetBoolean() {
    this.PayrollAreaRequestModel.isFFS = this.PayrollAreaInfoForm.get('isFFS').value;
    this.PayrollAreaRequestModel.isHoldSalary = '';
  }
}
function employeeBankMapPayAreaId(arg0: any, employeeBankMapPayAreaId: any): any[] {
  throw new Error('Function not implemented.');
}


