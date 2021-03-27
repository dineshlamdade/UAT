import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoanMasterService } from '../loan-master.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  generalLoanForm: FormGroup;
  Instances: any =[];
  loanValue: any;
  monthValue: any;

  constructor(private loanMasterService: LoanMasterService) {

    this.generalLoanForm = new FormGroup({
      loanCode: new FormControl(""),
      loanDescription: new FormControl(""),
      minimumNetPayLoan: new FormControl(""),
      loanApplicationTemplate: new FormControl([null]),
      approvalWorkFlow: new FormControl(""),
      approvalWorkFlowSDM: new FormControl(""),
      servicePeriod: new FormControl(""),
      underliningAsset: new FormControl(""),
      noOfTimesOfSalary: new FormControl(""),
      salaryDefinition: new FormControl(""),
      maxAmountLoan: new FormControl(""),
      gapBetTwoLoanApp: new FormControl(""),
      gapEndOfEarlierLoanAndNewLoanApp: new FormControl(""),
      instances: new FormControl(""),
      minRemainingServiceLoanApplication: new FormControl(""),
      minRemainingServiceLoanCompletion: new FormControl("")
    })

  }

  ngOnInit(): void {

    if(localStorage.getItem('generalForm') != null){
      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.generalLoanForm.patchValue(generalFormValue)
    }
  }


  /**Set minimum net pay boolean vaue */
  minimumNetPay(value){
    if(value == 'Yes'){
      this.generalLoanForm.controls['minimumNetPayLoan'].setValue(true)
    }else{
      this.generalLoanForm.controls['minimumNetPayLoan'].setValue(false)
    }
  }

  /** Get Instance No of Loan */
  getInstanceNoLoan(loan){
    this.loanValue = loan;
  }

  /** Get Instance Month */
  getInstanceMonth(month){
    this.monthValue = month;
    
  }

  setInstanceData(){
    this.Instances.push({
      "month": parseInt(this.monthValue),
      "noOfLoan": parseInt(this.loanValue)
     })
  }

  /** Submit general form */
  submitGenralForm(){
    this.generalLoanForm.controls['instances'].setValue(this.Instances)
    this.generalLoanForm.controls['loanApplicationTemplate'].setValue([null]),

    localStorage.setItem('generalForm', JSON.stringify(this.generalLoanForm.value))
  }

  /** Reset form */
  resetGeneralForm(){
    this.generalLoanForm.reset()
    localStorage.removeItem('generalForm')
  }

}
