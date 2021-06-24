import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { startOfYear } from 'date-fns';
import { HostListener } from '@angular/core';
import { TaxAdjustmentsService } from '../tax-adjustments.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tax-adjustments-amount',
  templateUrl: './tax-adjustments-amount.component.html',
  styleUrls: ['./tax-adjustments-amount.component.scss'],
})
export class TaxAdjustmentsAmountComponent implements OnInit {
  row = [];
  public submitted = false;
  public modalRef: BsModalRef;
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;
  public additionalTaxAdjustmenList: any;
  public typeList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  showData = false;
  public taxAdjustmentForm: FormGroup;
  public paymentDetailMinDate: Date;
  public fromDate: Date;
  public toDate: Date;
   public addRow: number;
  public declarationService: DeclarationService;
  public summarynew: any = {};
  AdditionalTaxList = [];

  toggle = true;
  cycle1 = false;
  cycle2 = false;
  status = 'Enable';

  alertService: any;
  financialYearStart: string;
  form: any;
  globalAddRowIndex: number;
  shownewRow: boolean;
  initialArrayIndex: Array<any> = [];
  deductionAmountPerCycle: number;
  Index: number;
  numberFormat: any;
  fileService: any;
  private policyMinDate: Date;
  private previousDate: any;

  constructor(
    private taxAdjustmentsService: TaxAdjustmentsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.taxAdjustmentAmount();
    this.typeList = [
      {
        label: 'Tax in Advance on Salary Income',
        value: 'tax in advance on salary income',
      },
      {
        label: 'Tax on incomes other than Salary',
        value: 'tax on incomes other than salary',
      },
    ];
  }

  ngOnInit(): void {
    this.getTransactionFilterData();

    // Get API call for All previous employee Names

    this.taxAdjustmentsService.getAdditionalTaxList().subscribe((res) => {
      if (!res.data.results[0]) {
        return;
      }
      res.data.results.forEach((element) => {
        const obj = {
          label: element.value,
          value: element.key,
        };
        this.AdditionalTaxList.push(obj);
      });
      console.log('response', this.AdditionalTaxList);
    });
  }
  addTable() {
    const obj = {
      additionalTaxAdjustmentId: '',
      employeeMasterId: '',
      taxAdjustmentType: '',
      toDate: Date,
      fromDate: Date,
      deductionAmountPerCycle: '',
      financialYear: Date,
      cycleDefinition: '',
    };
    this.row.push(obj);
  }
  deleteRows(x){
    this.row.splice(x, 1 );
  }

  // ---------------- Fixed Deposit Transaction Form -----------------
  taxAdjustmentAmount() {
    this.taxAdjustmentForm = this.formBuilder.group({
      taxAdjustmentType: new FormControl(null, Validators.required),
      cycleDefinition: new FormControl(null, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      deductionAmountPerCycle: new FormControl(null, Validators.required),
      financialYear: new FormControl(null),
      employeeMasterId: new FormControl(0),
      // cycleDefinition: new FormControl(''),
      additionalTaxAdjustmentId: new FormControl(0),
    });
  }
  save() {
    console.log('value', this.taxAdjustmentForm.value);
  }

  //--------- convenience getter for easy access to form fields ---------------
  get masterForm() {
    return this.taxAdjustmentForm.controls;
  }
  // //-------------------- TO Date Validations with Start Date ---------------
  // settoDate() {
  //   this.paymentDetailMinDate = this.form.value.fromDate;
  //   const fromDate = this.datePipe.transform(
  //     this.form.get('fromDate').value,
  //     'yyyy-MM-dd'
  //   );
  //   const todate = this.datePipe.transform(
  //     this.form.get('todate').value,
  //     'yyyy-MM-dd'
  //   );
  //   this.paymentDetailMinDate = this.policyMinDate;
  //   if (fromDate > todate) {
  //     this.form.controls.policyEndDate.reset();
  //   }
  //   this.form.patchValue({
  //     fromDate: this.policyMinDate,
  //   });
  //
  //   this.setPaymentDetailToDate();
  // }

// Payment Detail To Date Validations with Current Finanacial Year
  //------------------- Date of Leaving Validations with Payment Detail ----------------
  setPaymentDetailToDate() {
    
    this.paymentDetailMinDate = this.taxAdjustmentForm.value.fromDate;
    const from = this.datePipe.transform(
      this.taxAdjustmentForm.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.taxAdjustmentForm.get('toDate').value,
      'yyyy-MM-dd'
    );
    if (from > to) {
      this.taxAdjustmentForm.controls.dateOfLeaving.reset();
    }
  }

  //------------------Date of Joining  Validations with Current Finanacial Year -------------------
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    
    const Leaving = this.datePipe.transform(
      this.taxAdjustmentForm.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.previousDate,
      'yyyy-MM-dd'
    );
    if (Leaving > financialYearStartDate) {
      //this.alertService.sweetalertWarning("To Date can't be earlier that start of the Current Financial Year");
      this.alertService.sweetalertWarning(
        "Date of Joining can't be earlier that start of the Current Financial Year"
      );
      this.taxAdjustmentForm.controls.dateOfLeaving.reset();
    }
  }

  // setPaymentDetailToDate() {
  //   this.paymentDetailMinDate = this.form.value.fromDate;
  //   const from = this.datePipe.transform(
  //     this.form.get('fromDate').value,
  //     'yyyy-MM-dd'
  //   );
  //   const to = this.datePipe.transform(
  //     this.form.get('toDate').value,
  //     'yyyy-MM-dd'
  //   );
  //   if (from > to) {
  //     this.form.controls.toDate.reset();
  //   }
  // }

  //------------- Post Add Transaction Page Data API call -------------------
  //------------- Post Add Transaction Page Data API call -------------------
  public saveTransaction(formDirective: FormGroupDirective): void {
    this.submitted = true;

    console.log('value', this.taxAdjustmentForm.value);

    if (this.taxAdjustmentForm.invalid) {
      return;
    }

    //else {
    const transactionDetail = this.taxAdjustmentForm.getRawValue();

    transactionDetail.deductionAmountPerCycle = transactionDetail.deductionAmountPerCycle
      .toString()
      .replace(/,/g, '');

    const data = [
      {
        taxAdjustmentType: transactionDetail.taxAdjustmentType,
        fromDate: transactionDetail.fromDate,
        cycleDefinition: transactionDetail.cycleDefinition,
        toDate: transactionDetail.toDate,
        deductionAmountPerCycle: transactionDetail.deductionAmountPerCycle,
      },
    ];

    console.log('Fixed Deposite Data::', data);

    this.taxAdjustmentsService.postAdditionalTax(data).subscribe((res) => {
      console.log('saveTransaction res::', res);
      if (res) {
        if (res.data.results.length > 0) {
          this.transactionDetail =
            res.data.results[0].additionalTaxAdjustmenList;

          this.transactionDetail.forEach((element) => {
            element.deductionAmountPerCycle = this.numberFormat.transform(
              element.deductionAmountPerCycle
            );
          });

          this.alertService.sweetalertMasterSuccess(
            'Record saved Successfully.',
            ''
          );
        } else {
          this.alertService.sweetalertError('This Policy Holder Already Added');
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
    });

    this.Index = -1;
    formDirective.resetForm();
    this.taxAdjustmentForm.reset();
    this.submitted = false;
    this.deductionAmountPerCycle = 0.0;
  }

  // Common Function for filter to call API
  getTransactionFilterData() {
    this.taxAdjustmentsService.getAdditionalTax().subscribe((res) => {
      console.log('getTransactionFilterData', res);
      if (res.data.results.length > 0) {
        this.transactionDetail = res.data.results[0].additionalTaxAdjustmenList;
      }
    });
  }

  upload() {
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      element.forEach((innerElement) => {
        if (innerElement.deductionAmountPerCycle !== null) {
          innerElement.deductionAmountPerCycle = innerElement.deductionAmountPerCycle
            .toString()
            .replace(/,/g, '');
        } else {
          innerElement.deductionAmountPerCycle = 0.0;
        }

        const fromDate = this.datePipe.transform(
          innerElement.fromDate,
          'yyyy-MM-dd'
        );
        const toDate = this.datePipe.transform(
          innerElement.toDate,
          'yyyy-MM-dd'
        );

        innerElement.fromDate = fromDate;
        innerElement.toDate = toDate;
      });
    });

    const data = {
      additionalTaxAdjustmenList: this.transactionDetail,
      deductionAmountPerCycle: this.deductionAmountPerCycle,
    };
    console.log('data::', data);

    this.taxAdjustmentsService.postAdditionalTax(data).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.transactionDetail = res.data.results[0].additionalTaxAdjustmenList;

        this.initialArrayIndex = [];

        this.transactionDetail.forEach((element) => {
          this.initialArrayIndex.push(
            element.additionalTaxAdjustmenList.length
          );

          element.additionalTaxAdjustmenList.forEach((innerElement) => {
            if (innerElement.fromDate !== null) {
              innerElement.fromDate = new Date(innerElement.fromDate);
            }

            innerElement.deductionAmountPerCycle = this.numberFormat.transform(
              innerElement.deductionAmountPerCycle
            );
          });
        });

        this.alertService.sweetalertMasterSuccess(
          'Transaction Saved Successfully.',
          ''
        );
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    });
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  //---------- On View Cancel -------------------
  resetView() {
    this.taxAdjustmentForm.reset();
  }
  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount = this.transactionDetail[j].lictransactionList.length - 1;
    if (this.transactionDetail[j].lictransactionList.length == 1) {
      return false;
    } else if (this.initialArrayIndex[j] <= rowCount) {
      this.transactionDetail[j].lictransactionList.splice(rowCount, 1);
      return true;
    }
  }
  setFromDate(
    summary: {
      cycleDefinition: any;
      deductionAmountPerCycle: number;
      fromDate: Date;
      todate: Date;
      taxAdjustmentType: any;
    },
    i: number,
    j: number
  ) {
    this.transactionDetail[j].additionalTaxAdjustmenList[i].fromDate =
      summary.fromDate;
    console.log(
      this.transactionDetail[j].additionalTaxAdjustmenList[i].fromDate
    );
  }

  showtable() {
    this.showData = !this.showData;
    console.log(this.showData);
  }

  enableDisableRule(job) {
    this.toggle = !this.toggle;
    this.cycle1 = false;
    this.cycle2 = false;
    console.log(this.toggle);
  }
  enableDisableRule1(job) {
    this.cycle1 = !this.cycle1;
    this.toggle = false;
    this.cycle2 = false;
    console.log(this.cycle1);
  }
  enableDisableRule2(job) {
    this.cycle2 = !this.cycle2;
    this.toggle = false;
    this.cycle1 = false;
    console.log(this.cycle2);
  }
}

class DeclarationService {
  public additionalTaxAdjustmentId: number;
  public employeeMasterId: number;
  public taxAdjustmentType: any;
  public toDate: Date;
  public fromDate: Date;
  public deductionAmountPerCycle: any;
  public financialYear: Date;
  public cycleDefinition: any;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }

}
