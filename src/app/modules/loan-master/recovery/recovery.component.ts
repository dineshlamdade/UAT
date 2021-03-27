import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  recoveryLoanForm: FormGroup;

  constructor() { 

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
  }

  ngOnInit(): void {
    if(localStorage.getItem('recoveryForm') != null){
      let recoveryFormValue = JSON.parse(localStorage.getItem('recoveryForm'))
      this.recoveryLoanForm.patchValue(recoveryFormValue)
    }
  }


  /** Submit recovery form */
  submitRecoveryForm(){
    localStorage.setItem('recoveryForm', JSON.stringify(this.recoveryLoanForm.value))
  }

  /** Reset form */
  resetRecoveryForm(){
    this.recoveryLoanForm.reset()
    localStorage.removeItem('recoveryForm')
  }

}
