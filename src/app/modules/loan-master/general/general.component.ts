import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  generalLoanForm: FormGroup;
  Instances: any = [];
  loanValue: any;
  monthValue: any;
  minimumNetPayValue: string = '';
  loandata: any = '';
  editloandata: any ='';

  constructor(private router: Router) {

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

    if (localStorage.getItem('viewData') != null) {
      this.loandata = JSON.parse(localStorage.getItem('viewData'))
      console.log(this.loandata)
      this.generalLoanForm.patchValue(this.loandata)
      this.Instances = []
      this.loandata.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          } 
        )
      });
      this.generalLoanForm.controls['instances'].setValue(this.Instances)
      if (this.loandata.minimumNetPayLoan == true) {
        this.minimumNetPayValue = 'Yes'
      } else {
        this.minimumNetPayValue = 'No'
      }
      this.generalLoanForm.disable()
    }

    if (localStorage.getItem('editData') != null) {
      this.editloandata = JSON.parse(localStorage.getItem('editData'))
      this.generalLoanForm.patchValue(this.editloandata)
      this.Instances = []
      this.editloandata.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          } 
        )
      });
      this.generalLoanForm.controls['instances'].setValue(this.Instances)
      if (this.editloandata.minimumNetPayLoan == true) {
        this.minimumNetPayValue = 'Yes'
      } else {
        this.minimumNetPayValue = 'No'
      }
      this.generalLoanForm.enable()
    }

  }

  ngOnInit(): void {

    if (localStorage.getItem('generalForm') != null) {
      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.generalLoanForm.patchValue(generalFormValue)
    }
  }


  /**Set minimum net pay boolean vaue */
  minimumNetPay(value) {
    if (value == 'Yes') {
      this.generalLoanForm.controls['minimumNetPayLoan'].setValue(true)
    } else {
      this.generalLoanForm.controls['minimumNetPayLoan'].setValue(false)
    }
  }

  /** Get Instance No of Loan */
  getInstanceNoLoan(loan) {
    this.loanValue = loan;
  }

  /** Get Instance Month */
  getInstanceMonth(month) {
    this.monthValue = month;

  }

  setInstanceData() {
    this.Instances.push({
      "month": parseInt(this.monthValue),
      "noOfLoan": parseInt(this.loanValue)
    })
  }

  /** Submit general form */
  submitGenralForm() {
    if (this.loandata == '') {
      this.generalLoanForm.controls['instances'].setValue(this.Instances)
      this.generalLoanForm.controls['loanApplicationTemplate'].setValue([null]),
        localStorage.setItem('generalForm', JSON.stringify(this.generalLoanForm.value))
    }
    this.router.navigate(['/loan-master/recovery'])
  }

  /** Reset form */
  resetGeneralForm() {
    this.generalLoanForm.reset()
    localStorage.removeItem('generalForm')
    localStorage.removeItem('generalNext')
  }

}
