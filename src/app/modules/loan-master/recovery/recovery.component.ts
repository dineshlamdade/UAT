import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  recoveryLoanForm: FormGroup;

  constructor(private router: Router) {

    this.recoveryLoanForm = new FormGroup({

      intRate: new FormControl(""),
      methodOfComputation: new FormControl(""),
      intDateOfTransactions: new FormControl(""),
      intCycleOfDisbursement: new FormControl(""),
      cycleOfLastInstallment: new FormControl(""),
      intAdhocPayments: new FormControl(""),
      intBeforePriRepaymentStarts: new FormControl(""),
      recoveryNoOfInstallments: new FormControl(""),
      recoveryMethod: new FormControl(""),
      firstPriThanIntNoOfInstallmentForIntRecovery: new FormControl(""),
      recoveryToStartDisbursements: new FormControl(""),
      recoveryToStartSalaryCycles: new FormControl(""),
    })

    if (localStorage.getItem('viewData') != null) {
      let loandata = JSON.parse(localStorage.getItem('viewData'))
      this.recoveryLoanForm.patchValue(loandata)
      this.recoveryLoanForm.disable()
    }

    if (localStorage.getItem('editData') != null) {
      let loandata = JSON.parse(localStorage.getItem('editData'))
      this.recoveryLoanForm.patchValue(loandata)
      this.recoveryLoanForm.enable()
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('recoveryForm') != null) {
      let recoveryFormValue = JSON.parse(localStorage.getItem('recoveryForm'))
      this.recoveryLoanForm.patchValue(recoveryFormValue)
    }
  }

  /** Submit recovery form and navigate next tab (payment)*/
  submitRecoveryForm() {
    localStorage.setItem('recoveryForm', JSON.stringify(this.recoveryLoanForm.value))
    this.router.navigate(['/loan-master/payment'])
  }

  previousTab(){
    localStorage.setItem('recoveryForm', JSON.stringify(this.recoveryLoanForm.value))
    this.router.navigate(['/loan-master/general'])
  }

  /** Reset form */
  resetRecoveryForm() {
    this.recoveryLoanForm.reset()
    localStorage.removeItem('recoveryForm')
  }

}
