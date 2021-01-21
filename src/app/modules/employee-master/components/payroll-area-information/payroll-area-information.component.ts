import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
// import * as wjcInput from '@grapecity/wijmo.input';
import { ConfirmationModalComponent } from './../../shared modals/confirmation-modal/confirmation-modal.component';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PayrollAreaRequestModel } from './../../dto-models/payroll-area-information.model';
import { PayrollAreaInformationService } from './../../employee-master-services/payroll-area-information.service';
import { SharedInformationService } from '../../employee-master-services/shared-service/shared-information.service';



@Component({
  selector: 'app-payroll-area-information',
  templateUrl: './payroll-area-information.component.html',
  styleUrls: ['./payroll-area-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollAreaInformationComponent implements OnInit {

  PayrollAreaInfoForm: FormGroup;
  public PayrollAreaRequestModel = new PayrollAreaRequestModel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  NewPayrollAreaRequestModel: any;
  PayrollAreaFormSubscription: Subscription;
  employeeMasterId: any;
  date = { fromDate: "", toDate: "" }
  typeList = 'Primary,Secondary'.split(',');
  filteredTypeList: Array<any> = [];
  paymentModeList = 'Bank,Cheque,Demand Draft'.split(',');
  filteredpaymentModeList: Array<any> = [];
  typeOfPaymentList = 'Salary,Reimbursement'.split(',');
  payrollAreaList = 'pa01-staff,pa02-worker,pa03-angola,pa03-allangols'.split(',');
  filteredtypeOfPaymentList: Array<any> = [];
  // payrollAreaList: Array<any> = [];
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
  additionPayrollFlag: boolean = false;
  additionalPayrollButton: boolean = true;
  TotalPercentLimit: any = 100;
  payrollAreaArray: Array<any> = [];
  multipleBankBoolean: boolean = false;
  required100: boolean = false;
  amountValid: boolean;
  validateBankGridRow: boolean;
  validateBankPercent: boolean;
  typeOfPaymentArray: Array<any> = [];
  disableAddButtonMultipleBankFalse: boolean;
  payrollAreaBackFromDate: any;
  TotalPercentCheckOnSave: number = 0;
  bankAccountList: Array<any> = [];

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    public dialog: MatDialog, private PayrollAreaService: PayrollAreaInformationService,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private CommonDataService: SharedInformationService) {

    if (data?.payrollFlag) {
      this.payrollFlag = data.payrollFlag;
      if (this.payrollFlag == 'viewpayroll') {
        this.bankList = data.bankList;
        this.PayrollAreaRequestModel = data.payrollViewItem;
      }
      if (this.payrollFlag == 'editpayroll') {

        this.bankList = data.bankList;
        this.bankCount = data.bankCount;
        this.bankDetailsArray = data.bankDetailsArray;
        this.payrollAreaArray = data.payrollAreaArray;
        this.payrollAreaList = data.payrollAreaList;
        this.PayrollAreaRequestModel = data.payrollEditItem;
        this.payrollAreaBackFromDate = data.payrollEditItem.payrollAreaFromDate;
        this.NewPayrollAreaRequestModel = data.payrollEditItem;
        // this.TotalPercentLimit = data.TotalPercentLimit;
        if (this.PayrollAreaRequestModel.isAmount == 1) {
          this.percentOrAmountModel = 'amount'
        }
      }
    }
  }


  ngOnInit(): void {
    this.PayrollAreaInfoForm = this.formBuilder.group({
      payrollAreaCode: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      fromDate: [this.date.fromDate, Validators.required],
      toDate: [{ value: this.date.toDate, disabled: true }, Validators.required],
      paymentMode: [this.PayrollAreaRequestModel.paymentMode, Validators.required],
      bankName: [''],
      bankAccount: [''],
      typeOfPayment: [''],
      percent: [''],
      amount: [''],
      toggle: [''],
      priority: [''],
      bankfromDate: [this.date.fromDate, Validators.required],
      banktoDate: [{ value: this.date.toDate, disabled: true }, Validators.required],
      currency: ['']
    });
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
    // this.PayrollAreaRequestModel.percentageOfNetPay = 100;
    if (!this.multipleBankBoolean) {
      this.PayrollAreaRequestModel.percentageOfNetPay = 100;
      const temp13 = this.PayrollAreaInfoForm.get('percent');
      temp13.disable();
    }

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getPayrollAreaInformation();
    this.PayrollAreaService.getPayrollAreaDetails().subscribe(res => {
      debugger
      this.payrollAreaArray = res.data.results;
      res.data.results.forEach(res => {
        this.payrollAreaList.push(res.payrollAreaCode);

        setTimeout(() => {
          this.PayrollAreaRequestModel.payrollAreaCode = '';
        }, 100)
      })
    })

    if (!this.data) {
      this.PayrollAreaRequestModel.typeOfPayment = 'Salary';
      this.PayrollAreaRequestModel.type = 'Primary';

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
    }

    this.confirmDeleteSubscription = this.EventEmitterService.setConfirmDeletePayrollArea().subscribe(res => {

      if (res.confirmMsg == 'payrollItemDelete') {
        this.PayrollAreaService.deletePayrollAreaGridItem(res.payrollAreaInformationId).subscribe(res => {

          this.getPayrollAreaInformation();
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);

        })
      }
    })
  }


  savePayrollArea(PayrollAreaRequestModel) {

    if (this.additionPayrollFlag == false) {
      PayrollAreaRequestModel.additionalPayrollAllowed = 0;
    }
    if (this.additionPayrollFlag == true) {
      PayrollAreaRequestModel.additionalPayrollAllowed = 1;
    }

    if (this.multipleBankBoolean == false) {
      PayrollAreaRequestModel.multibankingAllowed = 0;
    }
    if (this.multipleBankBoolean == true) {
      PayrollAreaRequestModel.multibankingAllowed = 1;
    }

    PayrollAreaRequestModel.employeeMasterId = this.employeeMasterId;
    PayrollAreaRequestModel.payFromDate = this.datepipe.transform(PayrollAreaRequestModel.payFromDate, 'dd-MMM-yyyy');
    PayrollAreaRequestModel.payrollAreaFromDate = this.datepipe.transform(PayrollAreaRequestModel.payrollAreaFromDate, 'dd-MMM-yyyy');

    // if (PayrollAreaRequestModel.currency == '') {
    delete PayrollAreaRequestModel.currency;
    delete PayrollAreaRequestModel.bankAccount;
    // }
    this.PayrollAreaService.postPayrollAreaInfoForm(PayrollAreaRequestModel).subscribe(res => {

      this.getPayrollAreaInformation();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.payrollAreaDisable();

      this.PayrollAreaRequestModel.bankName = '';
      this.PayrollAreaRequestModel.bankAccount = '';
      this.PayrollAreaRequestModel.nameAsPerBank = '';
      this.PayrollAreaRequestModel.typeOfPayment = '';
      this.PayrollAreaRequestModel.amount = '';
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

  deletePayroll(payroll) {

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      width: '664px', height: '241px',
      data: {
        pageValue: 'payrollItemDelete', info: 'Do you really want to delete?',
        payrollEditItem: payroll,
      }
    });
  }

  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {

      this.PayrollAreaSummaryGridData = res.data.results[0];
    }, (error: any) => {
      if (error["error"]["status"]["code"] == 404) {
        this.PayrollAreaSummaryGridData = [];
      }
    })
  }

  editPayroll(payroll) {

    this.bankDetailsEnable();
    this.payrollAreaEnable();
    if (this.percentOrAmountModel == 'amount') {
      const temp15 = this.PayrollAreaInfoForm.get('priority');
      temp15.enable();
    }

    this.PayrollAreaRequestModel.payrollAreaInformationId = payroll.payrollAreaInformationId;
    this.PayrollAreaRequestModel.payrollAreaCode = payroll.payrollAreaCode;
    this.PayrollAreaRequestModel.description = payroll.description;
    this.PayrollAreaRequestModel.type = payroll.type;
    this.PayrollAreaRequestModel.payrollAreaFromDate = payroll.payrollAreaFromDate;
    this.PayrollAreaRequestModel.payrollAreaToDate = payroll.payrollAreaToDate;
    this.PayrollAreaRequestModel.paymentMode = payroll.paymentMode;

    this.PayrollAreaRequestModel.bankName = payroll.bankName;
    this.PayrollAreaRequestModel.bankAccount = payroll.bankAccount;
    this.PayrollAreaRequestModel.typeOfPayment = payroll.typeOfPayment;
    this.PayrollAreaRequestModel.percentageOfNetPay = payroll.percentageOfNetPay;
    this.PayrollAreaRequestModel.amount = payroll.amount;
    this.PayrollAreaRequestModel.payFromDate = payroll.payFromDate;
    this.PayrollAreaRequestModel.payToDate = payroll.payToDate;
    this.PayrollAreaRequestModel.priority = payroll.priority;
  }

  viewPayroll(payroll) {

    this.payrollAreaDisable();
    this.bankDetailsDisable();
    this.PayrollAreaRequestModel.payrollAreaCode = payroll.payrollAreaCode;
    this.PayrollAreaRequestModel.description = payroll.description;
    this.PayrollAreaRequestModel.type = payroll.type;
    this.PayrollAreaRequestModel.payrollAreaFromDate = payroll.payrollAreaFromDate;
    this.PayrollAreaRequestModel.payrollAreaToDate = payroll.payrollAreaToDate;
    this.PayrollAreaRequestModel.paymentMode = payroll.paymentMode;

    this.PayrollAreaRequestModel.bankName = payroll.bankName;
    this.PayrollAreaRequestModel.bankAccount = payroll.bankAccount;
    this.PayrollAreaRequestModel.typeOfPayment = payroll.typeOfPayment;
    this.PayrollAreaRequestModel.percentageOfNetPay = payroll.percentageOfNetPay;
    this.PayrollAreaRequestModel.amount = payroll.amount;
    this.PayrollAreaRequestModel.payFromDate = payroll.payFromDate;
    this.PayrollAreaRequestModel.payToDate = payroll.payToDate;
    this.PayrollAreaRequestModel.priority = payroll.priority;
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


  closePopup() {
    this.matDialog.closeAll();
    // this.EventEmitterService.getCancelPayrollEditPopup();
  }

  percentOrAmount(event) {

    if (event == false) {
      this.percentOrAmountModel = "percentOfNetPay";
      this.PayrollAreaRequestModel.isPercentOfNetPay = 1;
      this.PayrollAreaRequestModel.isAmount = 0;
      this.PayrollAreaRequestModel.amount = '';
      this.PayrollAreaRequestModel.currency = '';
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
  }

  bankDetailsValidations() {
    if (this.PayrollAreaRequestModel.paymentMode != 'Bank') {
      this.disableToggleButton = true;
      this.bankDetailsDisable();
      this.PayrollAreaRequestModel.bankName = '';
      this.PayrollAreaRequestModel.bankAccount = '';
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

  flterBankDetails() {
    debugger
    const bank = this.bankDetailsArray.filter(item => {
      if (item.bankName == this.PayrollAreaRequestModel.bankName) {
        return item;
      }
    });
    this.PayrollAreaRequestModel.bankAccount = bank[0].accountNo;
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
      this.PayrollAreaRequestModel.bankAccount = getBank[0].bankAccount;
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

  // bankInitializeGrid(bankFlex) {
  //   this.bankFlex = bankFlex;
  //   bankFlex.rows.defaultSize = 40;
  //   // custom formatter to paint buttons and editors
  //   bankFlex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
  //     if (e.panel == s.cells) {
  //       let col = s.columns[e.col],
  //         item = s.rows[e.row].dataItem;
  //       if (item == this._currentEditItem) {
  //         // create editors and buttons for the item being edited
  //         switch (col.binding) {
  //           case 'payrollButtons':
  //             e.cell.innerHTML = document.getElementById('payrollBtnViewMode').innerHTML;
  //             e.cell['dataItem'] = item;
  //             break;
  //           case 'bankAccount':
  //           case 'nameAsPerBank':
  //           case 'typeOfPayment':
  //           case 'percentageOfNetPay':
  //           case 'amount':
  //           case 'payFromDate':
  //           case 'payToDate':
  //           case 'priority':
  //             e.cell.innerHTML = '<input class="form-control" ' +
  //               'id="' + col.binding + '" ' +
  //               'value="' + s.getCellData(e.row, e.col, true) + '"/>';
  //             break;
  //         }
  //       } else {
  //         // create buttons for items not being edited
  //         switch (col.binding) {
  //           case 'payrollButtons':
  //             e.cell.innerHTML = document.getElementById('payrollBtnViewMode').innerHTML;
  //             e.cell['dataItem'] = item;
  //             break;
  //         }
  //       }
  //     }
  //   });

  //   bankFlex.addEventListener(bankFlex.hostElement, 'click', (e: MouseEvent) => {
  //     let targetBtn: HTMLButtonElement;
  //     if (e.target instanceof HTMLButtonElement) {
  //       targetBtn = e.target;
  //     } else if (e.target instanceof HTMLSpanElement && e.target.classList.contains('glyphicon')) {
  //       targetBtn = e.target.parentElement as HTMLButtonElement;
  //     }


  //     let ht = bankFlex.hitTest(e);
  //     this.payrollHT = ht;
  //   });
  // }

  amountValidCheck() {
    if (this.PayrollAreaRequestModel.amount) {
      this.amountValid = false;
    } else {
      this.amountValid = true;
    }
  }

  additionPayrollValidation() {
    this.additionPayrollFlag = true;
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

    if (percentShouldBe100 != true) {
      if (this.validateBankGridRow != true) {
        if (!this.additionPayrollFlag) {
          if (this.AdditionalPayrollAreaSummaryGridData.length > 1) {
            const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
            temp1.disable();
          }
        } else {
          if (this.AdditionalPayrollAreaSummaryGridData.length > 1) {
            const temp1 = this.PayrollAreaInfoForm.get('payrollAreaCode');
            temp1.enable();
          }
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
        // for (let i = 0; i < this.companyList.length; i++) {
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
        this.PayrollAreaRequestModel.bankAccount = '';
        this.PayrollAreaRequestModel.typeOfPayment = '';
        // if (this.multipleBankBoolean) {
        //   this.PayrollAreaRequestModel.percentageOfNetPay = '';
        // }
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
  }

  filterpayrollArea(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.payrollAreaList.length; i++) {
      let country = this.payrollAreaList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredPayrollAreaList = filtered;
  }

  filterpaymentMode(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.paymentModeList.length; i++) {
      let country = this.paymentModeList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredpaymentModeList = filtered;
  }

  filterbanks(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.bankList.length; i++) {
      let country = this.bankList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredbankList = filtered;
  }

  filtertypeOfPayment(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.typeOfPaymentList.length; i++) {
      let country = this.typeOfPaymentList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredtypeOfPaymentList = filtered;
  }

  filtertype(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.typeList.length; i++) {
      let country = this.typeList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredTypeList = filtered;
  }
}
