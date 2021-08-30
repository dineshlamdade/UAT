import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { LoanMasterService } from '../loan-master.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

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
  minimumNetPayValueFlag: string = '';
  loandata: any = '';
  editloandata: any = '';
  tabIndex: number = 1;
  url: string;
  deviationAmount: string = '';
  deviationInterest: string = '';
  deviationNoOfInstallment: string = '';
  PricipalNode: any = '';
  TenureNode: any = '';
  InterestNode: any = '';
  intrestWithNodeFlag: string = '';
  noOfInstallWithNodeFlag: string = '';
  principalWithNodeFlag: string = '';
  loanType: any;
  public headTemplateList5 = [];
  public approvalWorkFlowSDMList = [];
  public approvalDerivedNameList = [];

  constructor(public formBuilder : FormBuilder ,public loanMasterService :LoanMasterService ,public toster : ToastrService,
    private router: Router,public sanitizer: DomSanitizer,private datePipe: DatePipe,private modalService: BsModalService) {

    this.generalLoanForm = new FormGroup({
      loanCode: new FormControl(""),
      loanDescription: new FormControl(""),
      minimumNetPayLoan: new FormControl(""),
      loanApplicationTemplate: new FormControl([null]),
      approvalWorkFlowId: new FormControl(""),
      approvalWorkFlowSDM: new FormControl(""),
      approvalDerivedName: new FormControl(""),
      minLoanAmount: new FormControl(null),
      deviationAmount: new FormControl(""),
      deviationInterest: new FormControl(""),
      deviationNoOfInstallment: new FormControl(""),
      principalAmountNode: new FormControl(0),
      principalAmountWithNode: new FormControl(""),
      principalAmountWithoutNode: new FormControl(""),
      interestNode: new FormControl(0),
      interestWithNode: new FormControl(""),
      interestWithoutNode: new FormControl(""),
      noOfInstallmentNode: new FormControl(0),
      noOfInstallmenttWithNode: new FormControl(""),
      noOfInstallmenttWithoutNode: new FormControl(""),
      servicePeriod: new FormControl(""),
      servicePeriodDerivedName: new FormControl(""),
      underliningAsset: new FormControl(""),
      underlyingAssetDerivedName: new FormControl(""),
      noOfTimesOfSalary: new FormControl(""),
      noOfTimeOfSalaryDerivedName: new FormControl(""),
      salaryDefinition: new FormControl(""),
      maxAmountLoan: new FormControl(""),
      maxAmountAllowedDerivedName: new FormControl(""),
      gapBetTwoLoanApp: new FormControl(""),
      gapEarilerLoanDerivedName: new FormControl(""),
      gapEndOfEarlierLoanAndNewLoanApp: new FormControl(""),
      gapEndLoanDerivedName: new FormControl(""),
      instances: new FormControl(""),
      minRemainingServiceLoanApplication: new FormControl(""),
      loanAppplicationDerivedName: new FormControl(""),
      minRemainingServiceLoanCompletion: new FormControl(""),
      loanCompletionDerivedName: new FormControl(""),
      disbursementRequired: new FormControl(""),
      partDisbursementPermissible: new FormControl(""),
      
      // claimApprWorkflowId: new FormControl({ value: '', disabled: false }),
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
      if (this.loandata.minimumNetPayLoan == 1) {
        this.minimumNetPayValueFlag = 'Yes'
      } else {
        this.minimumNetPayValueFlag = 'No'
      }

      if (this.loandata.deviationInterest == 1) {
        this.deviationInterest = 'Yes'
      } else {
        this.deviationInterest = 'No'
      }

      if (this.loandata.deviationAmount == 1) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (this.loandata.deviationNoOfInstallment == true) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
      }

      if (this.loandata.intrestWithNode == true) {
        this.intrestWithNodeFlag = 'withNode'
        this.InterestNode = 'withNode'
      } else {
        this.intrestWithNodeFlag = 'withoutNode'
        this.InterestNode = 'withoutNode'
      }

      if (this.loandata.noOfInstallmenttWithNode == true) {
        this.noOfInstallWithNodeFlag = 'withNode'
        this.TenureNode = 'withNode'
      } else {
        this.noOfInstallWithNodeFlag = 'withoutNode'
        this.TenureNode = 'withoutNode'
      }

      if (this.loandata.principalAmountWithNode == true) {
        this.principalWithNodeFlag = 'withNode'
        this.PricipalNode = 'withNode'
      } else {
        this.principalWithNodeFlag = 'withoutNode'
        this.PricipalNode = 'withoutNode'
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
        this.minimumNetPayValueFlag = 'Yes'
      } else {
        this.minimumNetPayValueFlag = 'No'
      }


      if (this.editloandata.deviationInterest == 1) {
        this.deviationInterest = 'Yes'
      } else {
        this.deviationInterest = 'No'
      }

      if (this.editloandata.deviationAmount == 1) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (this.editloandata.deviationNoOfInstallment == 1) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
      }

      if (this.editloandata.intrestWithNode == true) {
        this.intrestWithNodeFlag = 'withNode'
        this.InterestNode = 'withNode'
      } else {
        this.intrestWithNodeFlag = 'withoutNode'
        this.InterestNode = 'withoutNode'
      }

      if (this.editloandata.noOfInstallmenttWithNode == true) {
        this.noOfInstallWithNodeFlag = 'withNode'
        this.TenureNode = 'withNode'
      } else {
        this.noOfInstallWithNodeFlag = 'withoutNode'
        this.TenureNode = 'withoutNode'
      }

      if (this.editloandata.principalAmountWithNode == true) {
        this.principalWithNodeFlag = 'withNode'
        this.PricipalNode = 'withNode'

      } else {
        this.principalWithNodeFlag = 'withoutNode'
        this.PricipalNode = 'withoutNode'

      }

      this.generalLoanForm.enable()
    }

  }

  ngOnInit(): void {
    this.getAllWorkflowMasters();
    this.getAllapprovalWorkFlowSDM();
    this.getAllDerivedSDM();

    this.url = window.location.pathname
    if (this.url == "/loan-master/general") {
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
        this.minimumNetPayValueFlag = 'Yes'
      } else {
        this.minimumNetPayValueFlag = 'No'
      }

      if (generalFormValue.deviationInterest == 1) {
        this.deviationInterest = 'Yes'
      } else {
        this.deviationInterest = 'No'
      }

      if (generalFormValue.deviationAmount == 1) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (generalFormValue.deviationNoOfInstallment == 1) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
      }
    }
  }

// get workflow master
  getAllWorkflowMasters() {
    this.loanMasterService.getAllWorkflowMasters().subscribe(
      res => {
      console.log("getAllWorkflowMasters", res);
      this.headTemplateList5 = res.data.results;
    })
  }

  // get sdm master
  getAllapprovalWorkFlowSDM() {
    this.loanMasterService.getAllapprovalWorkFlowSDM().subscribe(
      res => {
      console.log("getAllapprovalWorkFlowSDM", res);
      this.approvalWorkFlowSDMList = res.data.results;
    })
  }
  // get sdm derived  master
  getAllDerivedSDM() {
    this.loanMasterService.getAllDerivedSDM().subscribe(
      res => {
      console.log("getAllDerivedSDM", res);
      this.approvalDerivedNameList = res.data.results;
    })
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

  removeInstanceData(index){
    this.Instances.splice(index,1)
    this.monthValue = ''
    this.loanValue = ''
  }


  getdeviationAmount(value) {
    if (value == 'Yes') {
      this.generalLoanForm.controls['deviationAmount'].setValue(1)
    } else {
      this.generalLoanForm.controls['deviationAmount'].setValue(0)
    }
  }

  getdeviationIntrest(value) {
    if (value == 'Yes') {
      this.generalLoanForm.controls['deviationInterest'].setValue(1)
    } else {
      this.generalLoanForm.controls['deviationInterest'].setValue(0)
    }
  }

  getdeviationNoOfInstallment(value) {
    if (value == 'Yes') {
      this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(1)
    } else {
      this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(0)
    }
  }

  /** Submit general form */
  submitGenralForm() {
    if (this.loandata == '') {
      this.generalLoanForm.controls['minLoanAmount'].setValue(parseInt(this.generalLoanForm.controls['minLoanAmount'].value))
      this.generalLoanForm.controls['interestNode'].setValue(parseInt(this.generalLoanForm.controls['interestNode'].value))
      this.generalLoanForm.controls['noOfInstallmentNode'].setValue(parseInt(this.generalLoanForm.controls['noOfInstallmentNode'].value))
      this.generalLoanForm.controls['principalAmountNode'].setValue(parseInt(this.generalLoanForm.controls['principalAmountNode'].value))
      this.generalLoanForm.controls['approvalWorkFlowId'].setValue(parseInt(this.generalLoanForm.controls['approvalWorkFlowId'].value))
      this.generalLoanForm.controls['deviationAmount'].setValue(parseInt(this.generalLoanForm.controls['deviationAmount'].value))
      this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(parseInt(this.generalLoanForm.controls['deviationNoOfInstallment'].value))
      this.generalLoanForm.controls['deviationInterest'].setValue(parseInt(this.generalLoanForm.controls['deviationInterest'].value))
      
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
    if (this.tabIndex == 1) {
      this.router.navigate(['/loan-master/general'])
    }
    if (this.tabIndex == 2) {
      this.router.navigate(['/loan-master/recovery'])
    }
    if (this.tabIndex == 3) {
      this.router.navigate(['/loan-master/payment'])
    }
  }


  /** Node values */
  getPrincipalAmount(event) {
    this.PricipalNode = event.value

    if(this.PricipalNode == 'withNode'){
      this.generalLoanForm.controls['principalAmountWithNode'].setValue(true)
      this.generalLoanForm.controls['principalAmountWithoutNode'].setValue(false)
    }else{
      this.generalLoanForm.controls['principalAmountWithNode'].setValue(false)
      this.generalLoanForm.controls['principalAmountWithoutNode'].setValue(true)
    }
  }

  getInterestAmount(event) {
    this.InterestNode = event.value
    if(this.InterestNode == 'withNode'){
      this.generalLoanForm.controls['interestWithNode'].setValue(true)
      this.generalLoanForm.controls['interestWithoutNode'].setValue(false)
    }else{
      this.generalLoanForm.controls['interestWithNode'].setValue(false)
      this.generalLoanForm.controls['interestWithoutNode'].setValue(true)
    }
  }

  getTenureValue(event) {
    this.TenureNode = event.value
    if(this.TenureNode == 'withNode'){
      this.generalLoanForm.controls['noOfInstallmenttWithNode'].setValue(true)
      this.generalLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(false)
    }else{
      this.generalLoanForm.controls['noOfInstallmenttWithNode'].setValue(false)
      this.generalLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(true)
    }
  }
}