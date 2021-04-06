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
  tabIndex: number = 1;
  url: string;
  deviationAmount: string = '';
  deviationIntrest: string = '';
  deviationNoOfInstallment: string= '';


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
      minRemainingServiceLoanCompletion: new FormControl(""),
      deviationAmount:new FormControl(""),
      deviationIntrest:new FormControl(""),
      deviationNoOfInstallment:new FormControl(""),
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

      if (this.loandata.deviationIntrest == true) {
        this.deviationIntrest = 'Yes'
      } else {
        this.deviationIntrest = 'No'
      }

      if (this.loandata.deviationAmount == true) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (this.loandata.deviationNoOfInstallment == true) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
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


      if (this.editloandata.deviationIntrest == true) {
        this.deviationIntrest = 'Yes'
      } else {
        this.deviationIntrest = 'No'
      }

      if (this.editloandata.deviationAmount == true) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (this.editloandata.deviationNoOfInstallment == true) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
      }

      this.generalLoanForm.enable()
    }

  }

  ngOnInit(): void {
    this.url = window.location.pathname
    if(this.url == "/loan-master/general"){
      this.tabIndex = 1
      this.changeTabIndex(1)
    } 

    if (localStorage.getItem('generalForm') != null) {
      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.generalLoanForm.patchValue(generalFormValue)
      this.Instances = []
      generalFormValue.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          } 
        )
      });
      this.generalLoanForm.controls['instances'].setValue(this.Instances)
      if (generalFormValue.minimumNetPayLoan == true) {
        this.minimumNetPayValue = 'Yes'
      } else {
        this.minimumNetPayValue = 'No'
      }

      if (generalFormValue.deviationIntrest == true) {
        this.deviationIntrest = 'Yes'
      } else {
        this.deviationIntrest = 'No'
      }

      if (generalFormValue.deviationAmount == true) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (generalFormValue.deviationNoOfInstallment == true) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
      }
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
    this.monthValue = ''
    this.loanValue = ''
  }


  getdeviationAmount(value){
    if( value== 'Yes'){
      this.generalLoanForm.controls['deviationAmount'].setValue(true)
    }else{
      this.generalLoanForm.controls['deviationAmount'].setValue(false)
    }
  }

  getdeviationIntrest(value){
    if( value== 'Yes'){
      this.generalLoanForm.controls['deviationIntrest'].setValue(true)
    }else{
      this.generalLoanForm.controls['deviationIntrest'].setValue(false)
    }
  }

  getdeviationNoOfInstallment(value){
    if( value== 'Yes'){
      this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(true)
    }else{
      this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(false)
    }
  }

  /** Submit general form */
  submitGenralForm() {
    if (this.loandata == '') {
      this.generalLoanForm.controls['instances'].setValue(this.Instances)
      this.generalLoanForm.controls['loanApplicationTemplate'].setValue([null])
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

  changeTabIndex(index: number) {
    this.tabIndex = index;
    if(this.tabIndex == 1 ){
      this.router.navigate(['/loan-master/general'])
    }
    if(this.tabIndex == 2){
      this.router.navigate(['/loan-master/recovery'])
    }
    if(this.tabIndex == 3){
      this.router.navigate(['/loan-master/payment'])
    }
  }

}
