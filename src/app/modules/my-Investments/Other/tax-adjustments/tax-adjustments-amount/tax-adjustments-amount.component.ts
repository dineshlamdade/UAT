import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HostListener } from '@angular/core';
import { TaxAdjustmentsService } from '../tax-adjustments.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tax-adjustments-amount',
  templateUrl: './tax-adjustments-amount.component.html',
  styleUrls: ['./tax-adjustments-amount.component.scss']
})
export class TaxAdjustmentsAmountComponent implements OnInit {
  public submitted = false;
  public modalRef: BsModalRef;
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;
  public  additionalTaxAdjustmenList: any;
  public typeList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  showData= false;
  public taxAdjustmentForm: FormGroup;
  public paymentDetailMinDate: Date;
  public addRow: number;
  public declarationService: DeclarationService;
  public summarynew: any = {};
   AdditionalTaxList =[];
  
  toggle = true;
  cycle1 = false;
  cycle2 = false;
  status = "Enable";
 
  alertService: any;
  financialYearStart: string;
  form: any;
  globalAddRowIndex: number;
  shownewRow: boolean;
  initialArrayIndex: Array<any>=[];
  deductionAmountPerCycle: number;
  Index: number;
  numberFormat: any;
  fileService: any;
 
 

  constructor(private taxAdjustmentsService: TaxAdjustmentsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    ) { 

this.taxAdjustmentAmount()
    this.typeList = [
      { label: 'Tax in Advance on Salary Income', value: 'tax in advance on salary income' },
      { label: 'Tax on incomes other than Salary', value: 'tax on incomes other than salary' }
    ];
  }


  ngOnInit(): void {


this.getTransactionFilterData();

    // Get API call for All previous employee Names
    
    this.taxAdjustmentsService.getAdditionalTaxList().subscribe((res) => {
      // console.log('AdditionalTaxList::', res);
      // console.log('data', res.data.results[0].additionalTaxAdjustmenList[0].cycleDefinition);
      // this.AdditionalTaxList = res.data.results;
     
      // this.taxAdjustmentForm.setValue({
      //   taxAdjustmentType: res.data.results[0].additionalTaxAdjustmenList[0].cycleDefinition,
    
      // });

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


   // ---------------- Fixed Deposit Transaction Form -----------------
   taxAdjustmentAmount(){
   this.taxAdjustmentForm = this.formBuilder.group({
    taxAdjustmentType: new FormControl(null, Validators.required),
    fromDate: new  FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    deductionAmountPerCycle: new FormControl(null, Validators.required),
    financialYear: new FormControl(null),
    employeeMasterId: new FormControl(0),
    cycleDefinition: new FormControl(''),
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

  // Payment Detail To Date Validations with Current Finanacial Year
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    // const to = this.datePipe.transform(
    //   this.form.get('toDate').value,
    //   'yyyy-MM-dd'
    // );
    // const financialYearStartDate = this.datePipe.transform(
    //   this.financialYearStart,
    //   'yyyy-MM-dd'
    // );
  //   if (to < financialYearStartDate) {
  //     this.alertService.sweetalertWarning(
  //       'To Date should be greater than or equal to Current Financial Year : ' +
  //         this.financialYearStart
  //     );
  //     this.form.controls.toDate.reset();
  //   }
  // }
  }
  setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.form.value.fromDate;
    const from = this.datePipe.transform(
      this.form.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.form.get('toDate').value,
      'yyyy-MM-dd'
    );
    if (from > to) {
      this.form.controls.toDate.reset();
    }
  }

   //------------- Post Add Transaction Page Data API call -------------------
  //------------- Post Add Transaction Page Data API call -------------------
  public saveTransaction(formDirective: FormGroupDirective): void {
    this.submitted = true;

    console.log('value', this.taxAdjustmentForm.value);
    // console.log("formData::", formData);

    if (this.taxAdjustmentForm.invalid) {
      return;
    }

    //else {
    const transactionDetail = this.taxAdjustmentForm.getRawValue();

    transactionDetail.deductionAmountPerCycle = transactionDetail.deductionAmountPerCycle
      .toString()
      .replace(',', '');

    const data =[{
  
      "taxAdjustmentType": transactionDetail.taxAdjustmentType,
      "fromDate": transactionDetail.fromDate,
      "cycleDefinition": transactionDetail.cycleDefinition,
      "toDate": transactionDetail.toDate,
      "deductionAmountPerCycle": transactionDetail.deductionAmountPerCycle

      // documentRemark: this.documentRemark,
    }];

    console.log('Fixed Deposite Data::', data);

    this.taxAdjustmentsService
      .postAdditionalTax(data)
      .subscribe((res) => {
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
            // this.alertService.sweetalertWarning(res.status.messsage);
            this.alertService.sweetalertError(
              'This Policy Holder Already Added'
            );
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

//  getAmount()
//   {
//   let productScanDTO = {};
//   productScanDTO =[
//     {
//       "additionalTaxAdjustmentId": 0,
//       "cycleDefinition": "string",
//       "deductionAmountPerCycle": 0,
//       "employeeMasterId": 0,
//       "financialYear": "string",
//       "fromDate": "2021-02-06T10:00:15.266Z",
//       "taxAdjustmentType": "string",
//       "toDate": "2021-03-06T10:00:15.266Z"
//     }
//   ]
//     this.taxAdjustmentsService.getAdditionalTax().subscribe((res) => {
//       console.log("getAdditionalTax", res);
  
//     });
//   }

  // Common Function for filter to call API
  getTransactionFilterData() {
    // this.Service.getTransactionInstName(data).subscribe(res => {
    this.taxAdjustmentsService.getAdditionalTax().subscribe((res) => {
      console.log('getTransactionFilterData', res);
      if (res.data.results.length > 0) {
        this.transactionDetail =
          res.data.results[0].additionalTaxAdjustmenList;
      }
      //   console.log('transactionDetail', this.transactionDetail);
      //   this.documentDetailList = res.data.results[0].documentInformation;
      //   this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
      //   this.grandActualTotal = res.data.results[0].grandActualTotal;
      //   this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
      //   this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
      //   this.initialArrayIndex = [];
      //   this.transactionDetail.forEach((element) => {
      //     element.declaredAmount = this.numberFormat.transform(
      //       element.declaredAmount
      //     );
      //     element.actualAmount = this.numberFormat.transform(
      //       element.actualAmount
      //     );
      //   });
      // } else {
      //   this.addRowInList(this.declarationService, 0);
      // }
    });
  }

  // addRowInList(
  //   summarynew: {
  //     employeeMasterId: number;
  //     taxAdjustmentType: any;
  //     toDate: Date;
  //     fromDate: Date;
  //     deductionAmountPerCycle: any;
  //     financialYear: Date;
  //     cycleDefinition: any;
  //     additionalTaxAdjustmentId: number;
  //   },
  //   j: number,
  // ) {
  //   // console.log('summary::',  summarynew);
  //   // if (this.initialArrayIndex[j] > i) {
  //   //   this.hideRemoveRow = false;
  //   // } else {
  //   //   this.hideRemoveRow  = true;
  //   // }
  //   this.declarationService = new DeclarationService(summarynew);
  //   // console.log('declarationService::', this.declarationService);
  //   this.globalAddRowIndex -= 1;
  //   console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
  //   this.shownewRow = true;
  //   this.declarationService.additionalTaxAdjustmentId = this.globalAddRowIndex;
  //   this.declarationService.taxAdjustmentType = null;
  //   this.declarationService.toDate = null;
  //   this.declarationService.fromDate = null;
  //   this.declarationService.deductionAmountPerCycle = null;
  //   this.declarationService.financialYear= null;
  //   this.declarationService.cycleDefinition= null;

  //   // this.declarationService.licMasterPaymentDetailsId = this.transactionDetail[
  //   //   j
  //   // ].lictransactionList[0].licMasterPaymentDetailsId;
  //   this.transactionDetail.push(this.declarationService);
  //   console.log('addRow::', this.transactionDetail);
  // }
  

  upload() {

   
    console.log('this.transactionDetail::', this.transactionDetail);

    this.transactionDetail.forEach((element) => {
      element.forEach((innerElement) => {
        if (innerElement.deductionAmountPerCycle !== null) {
          innerElement.deductionAmountPerCycle = innerElement.deductionAmountPerCycle
            .toString()
            .replace(',', '');
        } else {
          innerElement.deductionAmountPerCycle = 0.0;
        }

        const fromDate = this.datePipe.transform(
          innerElement.fromDate,
          'yyyy-MM-dd',
        );
        const toDate = this.datePipe.transform(
          innerElement.toDate,
          'yyyy-MM-dd',
        );

        innerElement.fromDate = fromDate;
        innerElement.toDate = toDate;
      });
    });

    // this.deductionAmountPerCycle = this.deductionAmountPerCycle.toString().replace(',', '');
    const data = {
      additionalTaxAdjustmenList: this.transactionDetail,
      deductionAmountPerCycle: this.deductionAmountPerCycle,
     
    };
    console.log('data::', data);

    this.taxAdjustmentsService
      .postAdditionalTax(data)
      .subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {

          this.transactionDetail = res.data.results[0].additionalTaxAdjustmenList;
          // this.additionalTaxAdjustmenList = res.data.results[0].additionalTaxAdjustmenList;
         
         

          this.initialArrayIndex = [];

          this.transactionDetail.forEach((element) => {

            this.initialArrayIndex.push(element.additionalTaxAdjustmenList.length);

            element.additionalTaxAdjustmenList.forEach((innerElement) => {

              if (innerElement.fromDate !== null) {
                innerElement.fromDate = new Date(innerElement.fromDate);
              }

              // if (innerElement.isECS === 0) {
              //   this.glbalECS == 0;
              // } else if (innerElement.isECS === 1) {
              //   this.glbalECS == 1;
              // } else {
              //   this.glbalECS == 0;
              // }

              innerElement.deductionAmountPerCycle = this.numberFormat.transform(
                innerElement.deductionAmountPerCycle,
              );


            });
          });

          this.alertService.sweetalertMasterSuccess(
            'Transaction Saved Successfully.',
            '',
          );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      });
    // this.receiptAmount = '0.00';
  
  }

  sweetalertWarning(msg: string) {
    this.alertService.sweetalertWarning(msg);
  }

  sweetalertError(msg: string) {
    this.alertService.sweetalertError(msg);
  }

  // -------- Delete Row--------------
  deleteRow(j: number) {
    const rowCount = this.transactionDetail[j].lictransactionList.length - 1;
    // console.log('rowcount::', rowCount);
    // console.log('initialArrayIndex::', this.initialArrayIndex);
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
      taxAdjustmentType:any;
     
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










  

  showtable(){
    this.showData = !this.showData
    console.log(this.showData);
    // this.getFamilyInfo();
  }



  enableDisableRule(job) {
    this.toggle = !this.toggle;
    this.cycle1 = false;
    this.cycle2 = false;
    console.log(this.toggle);
    // this.status = this.toggle ? "Enable" : "Disable";
  }
  enableDisableRule1(job) {
    this.cycle1 = !this.cycle1;
    this.toggle = false;
    this.cycle2 = false;
    console.log(this.cycle1 );
    
  }
  enableDisableRule2(job) {
    this.cycle2 = !this.cycle2;
    this.toggle = false;
    this.cycle1 = false;
    console.log(this.cycle2 );
    
  }

  // const data = this.additionalTaxAdjustmenList;
  // this.taxAdjustmentsService.postAdditionalTax(data).subscribe((res) => {
  //   console.log(res);
  //   this.transactionDetail = res.data.results[0].licTransactionDetail;
  //   this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
  //   this.grandActualTotal = res.data.results[0].grandActualTotal;
  //   this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
  //   this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
  //   this.transactionDetail.forEach((element) => {
  //     element.lictransactionList.forEach((element) => {
  //       element.dateOfPayment = new Date(element.dateOfPayment);
  //     });
  //   });
  // });



//   changeTabIndexForRedirect(event: any) {
//     this.tabIndex = event.tabIndex;
//     this.data = event;
//     console.log('data::', this.data);
//   }

//   changeTabIndex(index: number) {
//     if (index !== 2) {
//       this.data = undefined;
//     }
//     this.tabIndex = index;
//   }

  

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     if (
//       window.pageYOffset ||
//       document.documentElement.scrollTop ||
//       document.body.scrollTop > 100
//     ) {
//       this.windowScrolled = true;
//     } else if (
//       (this.windowScrolled && window.pageYOffset) ||
//       document.documentElement.scrollTop ||
//       document.body.scrollTop < 10
//     ) {
//       this.windowScrolled = false;
//     }
//   }

//   scrollToTop() {
//     (function smoothscroll() {
//       let currentScroll =
//         document.documentElement.scrollTop || document.body.scrollTop;
//       if (currentScroll > 0) {
//         window.requestAnimationFrame(smoothscroll);
//         window.scrollTo(0, currentScroll - currentScroll / 8);
//       }
//     })();
//   }
// }
}


class DeclarationService {
 
  public additionalTaxAdjustmentId: number;
 public  employeeMasterId: number;
  public taxAdjustmentType: any;
  public toDate: Date;
  public fromDate: Date;
  public deductionAmountPerCycle: any;
  public financialYear: Date;
  public cycleDefinition: any;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
  // cancel() {
 
  //   // console.log('value', this.taxAdjustmentForm.value);
    
  //   this.Index = -1;
  //   formDirective.resetForm();
  //   this.taxAdjustmentForm.reset();
  //   this.submitted = false;
  //   this.deductionAmountPerCycle = 0.0;
   
  // }


}


