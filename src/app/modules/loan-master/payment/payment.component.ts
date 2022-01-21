import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoanMasterService } from '../loan-master.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentLoanForm: FormGroup;
  deductionHeadData: any;
  earningHeadData: any;
  public modalRef: BsModalRef;
  filesArray: any = [];
  documentRemark: any = '';
  fileName: any;
  Instances: any[] = [];
  loandata: any;
  editloandata: any;
  paymentRecoveryInNextCyclePri: string = '';
  paymentRecoveryInNextCycleInt: string = '';
  documentName: any;
  editFlag: boolean = false;

  monthValue: any;
  loanValue: any;
  PricipalNode: any = '';
  principalWithNodeFlag: string = 'withoutNode';
  InterestNode: any = '';
  intrestWithNodeFlag: string = 'withoutNode';
  TenureNode: any = '';
  noOfInstallWithNodeFlag: string = 'withoutNode';
  minimumNetPayValueFlag: string = '';
  deviationInterest: string = '';
  deviationNoOfInstallment: string = '';
  deviationAmount: string = '';
  getAllApprovalSDMData: any;
  sdmValues: any[];
  approvalDerivedNameList: any;
  getsalaryDefinationData: any;
  getsalaryName: any;
  getAllDerivedSDMServicePerioddata: any;
  getAllDerivedSDMUnderliningAssetData: any;
  getAllDerivedSDMNumberoftimesofsalaryData: any;
  getAllDerivedSDMMaxAmountAllowedData: any;
  getAllDerivedSDMEarlierloanapplicationData: any;
  getAllDerivedSDMEndofEarlierLoanData: any;
  getAllDerivedSDMMinimumRemainingServiceData: any;
  getAllDerivedSDMLoanCompletionData: any;
  loanMasterInstancesId: any=0;

  constructor(private loanmasterService: LoanMasterService,
    private modalService: BsModalService, private toaster: ToastrService, private router: Router, public loanMasterService: LoanMasterService,) {

    this.paymentLoanForm = new FormGroup({
      servicePeriod: new FormControl(""),
      servicePeriodDerivedName: new FormControl(0),
      underliningAsset: new FormControl(""),
      underlyingAssetDerivedName: new FormControl(0),
      noOfTimesOfSalary: new FormControl(""),
      noOfTimeOfSalaryDerivedName: new FormControl(0),
      salaryDefinition: new FormControl(""),
      maxAmountLoan: new FormControl(""),
      maxAmountAllowedDerivedName: new FormControl(0),
      gapBetTwoLoanApp: new FormControl(""),
      gapEarilerLoanDerivedName: new FormControl(0),
      gapEndOfEarlierLoanAndNewLoanApp: new FormControl(""),
      gapEndLoanDerivedName: new FormControl(0),
      minRemainingServiceLoanApplication: new FormControl(""),
      loanAppplicationDerivedName: new FormControl(0),
      minRemainingServiceLoanCompletion: new FormControl(""),
      loanCompletionDerivedName: new FormControl(0),
      instances: new FormControl(""),
      amountNodeValue: new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      principalAmountWithNode: new FormControl(false),
      principalAmountWithoutNode: new FormControl(true),
      interestNodeValue: new FormControl(0,[Validators.required,Validators.pattern(/\d{1,2}\.?\d{0,4}/)]),
      interestWithNode: new FormControl(false),
      interestWithoutNode: new FormControl(true),
      noOfInstallmentNodeValue: new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      noOfInstallmenttWithNode: new FormControl(false),
      noOfInstallmenttWithoutNode: new FormControl(true),
      deviationAmount: new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      deviationInterest: new FormControl(0,[Validators.required,Validators.pattern(/\d{1,2}\.?\d{0,4}/)]),
      deviationNoOfInstallment: new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),

    })

    if (localStorage.getItem('viewData') != null) {
      this.loandata = JSON.parse(localStorage.getItem('viewData'))
      this.paymentLoanForm.patchValue(this.loandata)
      this.Instances = []
      this.loandata.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          }
        )
      });
      this.paymentLoanForm.controls['instances'].setValue(this.Instances)

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
      this.getAllDerivedSDMServicePeriod(this.loandata.servicePeriod) // get sdm derived  name
      this.paymentLoanForm.controls['servicePeriodDerivedName'].setValue(this.loandata.servicePeriodDerivedName)

      this.getAllDerivedSDMUnderliningAsset(this.loandata.underliningAsset) // get sdm derived  name
      this.paymentLoanForm.controls['underlyingAssetDerivedName'].setValue(this.loandata.underlyingAssetDerivedName)

      this.getAllDerivedSDMNumberoftimesofsalary(this.loandata.noOfTimesOfSalary) // get sdm derived  name
      this.paymentLoanForm.controls['noOfTimeOfSalaryDerivedName'].setValue(this.loandata.noOfTimeOfSalaryDerivedName)

      this.getAllDerivedSDMMaxAmountAllowed(this.loandata.maxAmountLoan) // get sdm derived  name
      this.paymentLoanForm.controls['maxAmountAllowedDerivedName'].setValue(this.loandata.maxAmountAllowedDerivedName)

      this.getAllDerivedSDMEarlierloanapplication(this.loandata.gapBetTwoLoanApp) // get sdm derived  name
      this.paymentLoanForm.controls['gapEarilerLoanDerivedName'].setValue(this.loandata.gapEarilerLoanDerivedName)

      this.getAllDerivedSDMEndofEarlierLoan(this.loandata.gapEndOfEarlierLoanAndNewLoanApp) // get sdm derived  name
      this.paymentLoanForm.controls['gapEndLoanDerivedName'].setValue(this.loandata.gapEndLoanDerivedName)

      this.getAllDerivedSDMMinimumRemainingService(this.loandata.minRemainingServiceLoanApplication) // get sdm derived  name
      this.paymentLoanForm.controls['loanAppplicationDerivedName'].setValue(this.loandata.loanAppplicationDerivedName)

      this.getAllDerivedSDMLoanCompletion(this.loandata.minRemainingServiceLoanCompletion) // get sdm derived  name
      this.paymentLoanForm.controls['loanCompletionDerivedName'].setValue(this.loandata.loanCompletionDerivedName)


      this.paymentLoanForm.disable()
    }

    if (localStorage.getItem('editData') != null) {
      this.editFlag = true;
      this.editloandata = JSON.parse(localStorage.getItem('editData'))
      this.paymentLoanForm.patchValue(this.editloandata)

       this.getAllDerivedSDMServicePeriod(this.editloandata.servicePeriod) // get sdm derived  name
       this.paymentLoanForm.controls['servicePeriodDerivedName'].setValue(this.editloandata.servicePeriodDerivedName)

       this.getAllDerivedSDMUnderliningAsset(this.editloandata.underliningAsset) // get sdm derived  name
       this.paymentLoanForm.controls['underlyingAssetDerivedName'].setValue(this.editloandata.underlyingAssetDerivedName)

       this.getAllDerivedSDMNumberoftimesofsalary(this.editloandata.noOfTimesOfSalary) // get sdm derived  name
       this.paymentLoanForm.controls['noOfTimeOfSalaryDerivedName'].setValue(this.editloandata.noOfTimeOfSalaryDerivedName)

       this.getAllDerivedSDMMaxAmountAllowed(this.editloandata.maxAmountLoan) // get sdm derived  name
       this.paymentLoanForm.controls['maxAmountAllowedDerivedName'].setValue(this.editloandata.maxAmountAllowedDerivedName)

       this.getAllDerivedSDMEarlierloanapplication(this.editloandata.gapBetTwoLoanApp) // get sdm derived  name
       this.paymentLoanForm.controls['gapEarilerLoanDerivedName'].setValue(this.editloandata.gapEarilerLoanDerivedName)

       this.getAllDerivedSDMEndofEarlierLoan(this.editloandata.gapEndOfEarlierLoanAndNewLoanApp) // get sdm derived  name
       this.paymentLoanForm.controls['gapEndLoanDerivedName'].setValue(this.editloandata.gapEndLoanDerivedName)

       this.getAllDerivedSDMMinimumRemainingService(this.editloandata.minRemainingServiceLoanApplication) // get sdm derived  name
       this.paymentLoanForm.controls['loanAppplicationDerivedName'].setValue(this.editloandata.loanAppplicationDerivedName)

       this.getAllDerivedSDMLoanCompletion(this.editloandata.minRemainingServiceLoanCompletion) // get sdm derived  name
       this.paymentLoanForm.controls['loanCompletionDerivedName'].setValue(this.editloandata.loanCompletionDerivedName)


      this.Instances = []
      this.editloandata.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          }
        )
      });
      this.paymentLoanForm.controls['instances'].setValue(this.Instances)

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
        this.paymentLoanForm.controls['interestWithNode'].setValue(true);
        this.paymentLoanForm.controls['interestWithoutNode'].setValue(false);
      } else {
        this.intrestWithNodeFlag = 'withoutNode'
        this.InterestNode = 'withoutNode'
        this.paymentLoanForm.controls['interestWithNode'].setValue(false);
        this.paymentLoanForm.controls['interestWithoutNode'].setValue(true);


      }
      if (this.editloandata.noOfInstallmenttWithNode == true) {
        this.noOfInstallWithNodeFlag = 'withNode'
        this.TenureNode = 'withNode'
        this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(true);
        this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(false);
      } else {
        this.noOfInstallWithNodeFlag = 'withoutNode'
        this.TenureNode = 'withoutNode'
        this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(false);
        this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(true);

      }

      if (this.editloandata.principalAmountWithNode == true) {
        this.principalWithNodeFlag = 'withNode'
        this.PricipalNode = 'withNode'
        this.paymentLoanForm.controls['principalAmountWithNode'].setValue(true);
        this.paymentLoanForm.controls['principalAmountWithoutNode'].setValue(false);
      } else {
        this.principalWithNodeFlag = 'withoutNode'
        this.PricipalNode = 'withoutNode'
        this.paymentLoanForm.controls['principalAmountWithNode'].setValue(false);
        this.paymentLoanForm.controls['principalAmountWithoutNode'].setValue(true);
      }

      this.paymentLoanForm.enable()
    }
  }

  ngOnInit(): void {
  this.getAllApprovalSDM();
  this.getsalaryDefination()
    if (localStorage.getItem('paymentLoanForm') != null) {
      let paymentLoanForm = JSON.parse(localStorage.getItem('paymentLoanForm'))
      this.paymentLoanForm.patchValue(paymentLoanForm)
      this.Instances = []
      paymentLoanForm.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          }
        )
      });
      this.paymentLoanForm.controls['instances'].setValue(this.Instances)

      if (paymentLoanForm.minimumNetPayLoan == 1) {
        this.minimumNetPayValueFlag = 'Yes'
      } else {
        this.minimumNetPayValueFlag = 'No'
      }

      if (paymentLoanForm.deviationInterest == 1) {
        this.deviationInterest = 'Yes'
      } else {
        this.deviationInterest = 'No'
      }

      if (paymentLoanForm.deviationAmount == 1) {
        this.deviationAmount = 'Yes'
      } else {
        this.deviationAmount = 'No'
      }

      if (paymentLoanForm.deviationNoOfInstallment == true) {
        this.deviationNoOfInstallment = 'Yes'
      } else {
        this.deviationNoOfInstallment = 'No'
      }



      if (paymentLoanForm.intrestWithNode == true) {
        this.intrestWithNodeFlag = 'withNode'
        this.InterestNode = 'withNode'
        // this.paymentLoanForm.controls['intrestWithNode'].setValue(true)
        // this.paymentLoanForm.controls['interestWithoutNode'].setValue(false)
      } else {
        this.intrestWithNodeFlag = 'withoutNode'
        this.InterestNode = 'withoutNode'
        // this.paymentLoanForm.controls['intrestWithNode'].setValue(false)
        // this.paymentLoanForm.controls['interestWithoutNode'].setValue(true)

      }

      if (paymentLoanForm.noOfInstallmenttWithNode == true) {
        this.noOfInstallWithNodeFlag = 'withNode'
        this.TenureNode = 'withNode'
        // this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(true)
        // this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(false)

      } else {
        this.noOfInstallWithNodeFlag = 'withoutNode'
        this.TenureNode = 'withoutNode'
        // this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(false)
        // this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(true)

      }

      if (paymentLoanForm.principalAmountWithNode == true) {
        this.principalWithNodeFlag = 'withNode'
        this.PricipalNode = 'withNode'
        // this.paymentLoanForm.controls['principalAmountWithNode'].setValue(true)
        // this.paymentLoanForm.controls['principalAmountWithoutNode'].setValue(false)


      } else {
        this.principalWithNodeFlag = 'withoutNode'
        this.PricipalNode = 'withoutNode'
        // this.paymentLoanForm.controls['principalAmountWithNode'].setValue(false)
        // this.paymentLoanForm.controls['principalAmountWithoutNode'].setValue(true)


      }

    }
  }

  /** Submit Loan Master form */
  submitPaymentForm() {
    this.paymentLoanForm.controls['interestNodeValue'].setValue(parseFloat(this.paymentLoanForm.controls['interestNodeValue'].value))
    this.paymentLoanForm.controls['noOfInstallmentNodeValue'].setValue(parseInt(this.paymentLoanForm.controls['noOfInstallmentNodeValue'].value))
    this.paymentLoanForm.controls['amountNodeValue'].setValue(parseInt(this.paymentLoanForm.controls['amountNodeValue'].value))

    this.paymentLoanForm.controls['deviationAmount'].setValue(parseInt(this.paymentLoanForm.controls['deviationAmount'].value))
    this.paymentLoanForm.controls['deviationNoOfInstallment'].setValue(parseInt(this.paymentLoanForm.controls['deviationNoOfInstallment'].value))
    this.paymentLoanForm.controls['deviationInterest'].setValue(parseFloat(this.paymentLoanForm.controls['deviationInterest'].value))
    this.paymentLoanForm.controls['gapEarilerLoanDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['gapEarilerLoanDerivedName'].value))
    this.paymentLoanForm.controls['gapEndLoanDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['gapEndLoanDerivedName'].value))
    this.paymentLoanForm.controls['loanAppplicationDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['loanAppplicationDerivedName'].value))
    this.paymentLoanForm.controls['loanCompletionDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['loanCompletionDerivedName'].value))
    this.paymentLoanForm.controls['maxAmountAllowedDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['maxAmountAllowedDerivedName'].value))
    this.paymentLoanForm.controls['noOfTimeOfSalaryDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['noOfTimeOfSalaryDerivedName'].value))
    this.paymentLoanForm.controls['servicePeriodDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['servicePeriodDerivedName'].value))
    this.paymentLoanForm.controls['underlyingAssetDerivedName'].setValue(parseInt(this.paymentLoanForm.controls['underlyingAssetDerivedName'].value))
    // this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(false)
    // this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(false)

    this.paymentLoanForm.controls['instances'].setValue(this.Instances)
    localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
    this.router.navigate(['/loan-master/recovery'])
  }

  /**navigate to previous tab (recovery) */
  previousTab() {
    // this.paymentLoanForm.controls['document'].setValue(this.filesArray);
    localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
    this.router.navigate(['/loan-master/general'])
  }

  /** Reset form */
  resetPaymentForm() {
    this.paymentLoanForm.reset()
  }


  UploadModal(template: TemplateRef<any>) {
    this.fileName = null;
    this.documentRemark = ''
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }

  onUpload(event) {
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.fileName = file.name
      }
    }

  }

  // .......................................................................................................
  getInstanceMonth(month) {
    this.monthValue = month;

  }

  getInstanceNoLoan(loan) {
    this.loanValue = loan;
  }

  setInstanceData() {
    this.Instances.push({
      "month": parseInt(this.monthValue),
      "noOfLoan": parseInt(this.loanValue),
      "loanMasterInstancesId":parseInt(this.loanMasterInstancesId)
    })
    this.monthValue = ''
    this.loanValue = ''
  }

  removeInstanceData(index) {
    this.Instances.splice(index, 1)
    this.monthValue = ''
    this.loanValue = ''
  }

  getPrincipalAmount(event) {
    this.PricipalNode = event.value
// alert( this.PricipalNode)
    if (this.PricipalNode == 'withNode') {
      this.paymentLoanForm.controls['principalAmountWithNode'].setValue(true)
      this.paymentLoanForm.controls['principalAmountWithoutNode'].setValue(false)
    } else {
      this.paymentLoanForm.controls['principalAmountWithNode'].setValue(false)
      this.paymentLoanForm.controls['principalAmountWithoutNode'].setValue(true)
      this.paymentLoanForm.controls['principalAmountWithoutNode'].clearValidators()
    }
  }

  getInterestAmount(event) {
    this.InterestNode = event.value
    // alert(this.InterestNode)
    if (this.InterestNode == 'withNode') {
      this.paymentLoanForm.controls['interestWithNode'].setValue(true)
      this.paymentLoanForm.controls['interestWithoutNode'].setValue(false)
    } else {
      this.paymentLoanForm.controls['interestWithNode'].setValue(false)
      this.paymentLoanForm.controls['interestWithoutNode'].setValue(true)
      this.paymentLoanForm.controls['interestWithoutNode'].clearValidators()

    }
  }

  getTenureValue(event) {
    this.TenureNode = event.value
    // alert(this.TenureNode)
    if (this.TenureNode == 'withNode') {
      this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(true)
      this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(false)
    } else {
      this.paymentLoanForm.controls['noOfInstallmenttWithNode'].setValue(false)
      this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].setValue(true)
      this.paymentLoanForm.controls['noOfInstallmenttWithoutNode'].clearValidators()

    }
  }
  // ......................................Pooja..........................................
  getsalaryDefination(){
    this.loanMasterService.getsalaryDefination().subscribe(
      res => {
        this.getsalaryDefinationData = res.data.results;
        this.getsalaryDefinationData.forEach(element => {
        this.getsalaryName = element.formulaName;
        // console.log("this.getsalaryName",this.getsalaryName)
        });
      }
    )
    }

  getAllApprovalSDM() // get Approval SDM
      {
        this.loanMasterService.getAllApprovalSDM().subscribe(
        res => {
          this.getAllApprovalSDMData = res.data.results[0];
          // console.log("this.getAllApprovalSDMData",this.getAllApprovalSDMData)
          this.getAllApprovalSDMData.forEach((element,index) => {
            if(element == null){
              let ind = index;
              this.getAllApprovalSDMData.splice(ind,1)
            }
          });
          
        }
        )
      }
      getAllDerivedSDMServicePeriod(id) // get sdm derived  name
     {
      this.loanMasterService.getAllDerivedSDM(id).subscribe(
      res => {
       this.getAllDerivedSDMServicePerioddata = res.data.results[0];
     })
    }

    getAllDerivedSDMUnderliningAsset(id) // get sdm derived  name
     {
      this.loanMasterService.getAllDerivedSDM(id).subscribe(
      res => {
       this.getAllDerivedSDMUnderliningAssetData = res.data.results[0];
     })
    }
    getAllDerivedSDMNumberoftimesofsalary(id) // get sdm derived  name
    {
     this.loanMasterService.getAllDerivedSDM(id).subscribe(
     res => {
      this.getAllDerivedSDMNumberoftimesofsalaryData = res.data.results[0];
    })
   }
   getAllDerivedSDMMaxAmountAllowed(id) // get sdm derived  name
   {
    this.loanMasterService.getAllDerivedSDM(id).subscribe(
    res => {
     this.getAllDerivedSDMMaxAmountAllowedData = res.data.results[0];
   })
  }
  getAllDerivedSDMEarlierloanapplication(id) // get sdm derived  name
  {
   this.loanMasterService.getAllDerivedSDM(id).subscribe(
   res => {
    this.getAllDerivedSDMEarlierloanapplicationData = res.data.results[0];
  })
 }
 getAllDerivedSDMEndofEarlierLoan(id) // get sdm derived  name
 {
  this.loanMasterService.getAllDerivedSDM(id).subscribe(
  res => {
   this.getAllDerivedSDMEndofEarlierLoanData = res.data.results[0];
 })
}
getAllDerivedSDMMinimumRemainingService(id) // get sdm derived  name
{
 this.loanMasterService.getAllDerivedSDM(id).subscribe(
 res => {
  this.getAllDerivedSDMMinimumRemainingServiceData = res.data.results[0];
})
}
getAllDerivedSDMLoanCompletion(id)
{
  this.loanMasterService.getAllDerivedSDM(id).subscribe(
    res => {
     this.getAllDerivedSDMLoanCompletionData = res.data.results[0];
   })
}
}
