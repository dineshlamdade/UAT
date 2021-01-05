import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.scss']
})
export class LoanMasterComponent implements OnInit {
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;
  public generalForm: FormGroup;
  frequencyOfPaymentList: { value: number; label: string; }[];
  public methodOfComputation: string[] = ['Day Basis','Month Basis'];
  public dateOfTransactions: string[] = ['Chargeable','Non-Chargeable'];
  public cycleOfDisbursement: string[] = ['Full Period','Outstanding Days'];
  public cycleOfLastInstallment: string[] = ['Full Period','Outstanding Days'];
  public cycleOfAdhocPayments: string[] = ['From same Cycle','Next Cycle'];
  public beforePrincipalRepaymentStarts: string[] = ['Add in the Loan Amount','Recover in each of the Cycle'];
  public principalRepaymentMethod: string[] = ['EMI','Reducing Balance','Flat Interest','Perpetual','Principal First & then Interest'];
  public principalRepaymentRecoveryStarts: string[] = ['After first Disbursement','After full Disbursement'];
  public adhocPaymentsTreatment: string[] = ['Reduce Installment','Reduce Tenure'];
  public skippedPaymentPrincipal: string[] = ['Yes','No'];
  public skippedPaymentInterest: string[] = ['Yes','No'];
  public taxSettingsLoanCategory: string[] = ['Car Loan','Education Loan','Housing Loan','Two Wheeler','Other Loan'];
  public guarantorDetails: number[] = [1,2,3];


  constructor(private formBuilder: FormBuilder) {

    this.generalForm = this.formBuilder.group({
        loanMasterId: new FormControl(null),
        loanCode: new FormControl(null, Validators.required),
        loanDescription: new FormControl(null),
        servicePeriod: new FormControl(null),
        underliningAsset: new FormControl(null),
        minRemainingServiceLoanApplication: new FormControl(null),
        minRemainingServiceLoanCompletion: new FormControl(null),
        noOfTimesOfSalary: new FormControl(null),
        salaryDefinition: new FormControl(null),
        maxAmountLoan: new FormControl(null),
        gapBetTwoLoanApp: new FormControl(null),
        gapEndOfEarlierLoanAndNewLoanApp: new FormControl(null),
        noOfInstances: new FormControl(null),
        noOfInstancesMonth:  new FormControl(null),
        recoveryMethod: new FormControl(null),
        recoveryNoOfInstallments:  new FormControl(null),
        intRate:  new FormControl(null),
        firstPriThanIntNoOfInstallmentForIntRecovery:  new FormControl(null),
        intAddInPri:  new FormControl(null),
        intDateOfTransactions:  new FormControl(null),
        intCycleOfDisbursement:  new FormControl(null),
        intAdhocPayments: new FormControl(null),
        intBeforePriRepaymentsSatrts:  new FormControl(null),
        recoveryToStartDisbursements: new FormControl(null),
        recoveryToStartSalaryCycles: new FormControl(null),
        adhocPaymentsTreatment: new FormControl(null),
        documentLName: new FormControl(null),
        assignmentsIntHead:  new FormControl(null),
        assignmentPriHead:  new FormControl(null),
        assignmentsLoanPayment: new FormControl(null),
        assignmentsPerquisite: new FormControl(null),
        taxSettingPerquisiteType:  new FormControl(null),
        taxSettingPerquisiteSubCategory: new FormControl(null),
        taxSettingCalculatePerquisiteOn: new FormControl(null),
        minimumNetPayLoan: new FormControl(null),
        noOfGuarantor:  new FormControl(null),
        loanApplicationTemplate:  new FormControl(null),
        approvalWorkFlowSDM:  new FormControl(null)
      
    })
  }

  ngOnInit(): void {
    this.tabIndex = 2;
    this.frequencyOfPaymentList = [{
      value:1,
      label: 'Hello'
    },
    {
      value:2,
      label: 'Cello'
    },
  ]

    
  }

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::', this.data);
  }

  changeTabIndex(index: number) {
    this.tabIndex = index;
  }

  public modalRef: BsModalRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
  submitGeneral() {
    console.log(this.generalForm.getRawValue())
    this.tabIndex = 2
  }
}