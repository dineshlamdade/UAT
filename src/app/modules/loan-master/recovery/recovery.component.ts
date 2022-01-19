import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanMasterService } from '../loan-master.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  loanMasterForm: FormGroup;
  recoveryLoanForm: FormGroup;
  loandata: any;
  editloandata: any;
  filesArray: any = [];
  editFlag: boolean = false;
  Instances: any[];
  paymentRecoveryInNextCyclePriValFlag: string = 'No';
  paymentRecoveryInNextCycleIntValFlag: string = 'Yes';
  loanMasterData: any;
  isUpdate:boolean = false;
  isSave:boolean = true;
  isPrevious :boolean = true;
  isReset:boolean = true;
  getAllApprovalSDMData: any;
  sdmValues: any[];
  approvalDerivedNameList: any;
  getAllDerivedSDMRatePerAnnumData: any;
  getAllDerivedSDMNoofInstallmentsData: any;
  getAllDerivedSDMinstallmentsforInterestRecoveryData: any;
  loanMasterId: any = 0;
  loandataforcyle: any ='';

  changeROIAsPerLoanBalanceChkFlag:string='No';
  // paymentRecoveryInNextCycleInterestFlag:string='Yes';
  // paymentRecoveryInNextCyclePrincipalFlag:string='No'

  constructor(private router: Router,private loanmasterService: LoanMasterService,
    private alertService: AlertServiceService,public loanMasterService: LoanMasterService,) {

      this.loanMasterForm = new FormGroup({
        loanMasterId: new FormControl(0),
        active: new FormControl(true),
        adhocPaymentsTreatment: new FormControl(""),
        approvalWorkFlowId: new FormControl(""),
        approvalWorkFlowSDM: new FormControl(""),
        assignmentsIntHeadId: new FormControl(""),
        assignmentsLoanPayment: new FormControl(""),
        // assignmentsPerquisite: new FormControl("head master"),
        assignmentsPriHeadId: new FormControl(""),
        createDateTime: new FormControl(new Date()),
        createdBy: new FormControl("Ajay"),
        cycleOfLastInstallment: new FormControl(""),
        document: new FormControl(""),
        firstPriThanIntNoOfInstallmentForIntRecovery: new FormControl(""),
        gapBetTwoLoanApp: new FormControl(""),
        gapEndOfEarlierLoanAndNewLoanApp: new FormControl(""),
        instances: new FormControl(""),
        // intAddInPri: new FormControl("string"),
        intAdhocPayments: new FormControl(""),
        intBeforePriRepaymentStarts: new FormControl(""),
        intCycleOfDisbursement: new FormControl(""),
        intDateOfTransactions: new FormControl(""),
        intRate: new FormControl(""),
        loanApplicationTemplate: new FormControl([null]),
        loanCode: new FormControl(""),
        loanDescription: new FormControl(""),
        minLoanAmount: new FormControl(""),
        maxAmountLoan: new FormControl(""),
        methodOfComputation: new FormControl(""),
        minRemainingServiceLoanApplication: new FormControl(""),
        minRemainingServiceLoanCompletion: new FormControl(""),
        minimumNetPayLoan: new FormControl(""),
        noOfGuarantor: new FormControl(null),
        noOfTimesOfSalary: new FormControl(""),
        paymentRecoveryInNextCycleInt: new FormControl(""),
        paymentRecoveryInNextCyclePri: new FormControl(""),
        recoveryMethod: new FormControl(""),
        recoveryNoOfInstallments: new FormControl(""),
        recoveryToStartDisbursements: new FormControl(""),
        recoveryToStartSalaryCycles: new FormControl(""),
        salaryDefinition: new FormControl(""),
        servicePeriod: new FormControl(""),
        // taxSettingCalculatePerquisiteOn: new FormControl(""),
        taxSettingPerquisiteHead: new FormControl(""),
        taxSettingPerquisiteLoanCategory: new FormControl(""),
        taxSettingPerquisiteSubCategory: new FormControl(""),
        underliningAsset: new FormControl(""),
        deviationAmount: new FormControl(""),
        deviationInterest: new FormControl(""),
        deviationNoOfInstallment: new FormControl(""),
        // interestNode: new FormControl(""),
        interestWithNode: new FormControl(""),
        interestWithoutNode: new FormControl(""),
        // noOfInstallmentNode: new FormControl(""),
        noOfInstallmenttWithNode: new FormControl(""),
        noOfInstallmenttWithoutNode: new FormControl(""),
        // principalAmountNode: new FormControl(""),
        principalAmountWithNode: new FormControl(""),
        principalAmountWithoutNode: new FormControl(""),

        amountNodeValue:new FormControl(""),
        approvalDerivedName:new FormControl(""),
        changeROIAsPerLoanBalance:new FormControl(false),
        disbursementRequired:new FormControl(false),
        compoundingOfInterest:new FormControl(""),
        gapEarilerLoanDerivedName:new FormControl(""),
        gapEndLoanDerivedName:new FormControl(""),
        interestNodeValue:new FormControl(""),
        loanAppplicationDerivedName:new FormControl(""),
        loanCompletionDerivedName:new FormControl(""),
        maxAmountAllowedDerivedName:new FormControl(""),
        noOfInstallementDerivedName:new FormControl(""),
        noOfInstallmentNodeValue:new FormControl(""),
        partDisbursementPermissible:new FormControl(""),
        ratePerAnnumDerivedName: new FormControl(""),
        servicePeriodDerivedName: new FormControl(""),
        underlyingAssetDerivedName: new FormControl(""),
        noOfTimeOfSalaryDerivedName: new FormControl(""),
        groupCompanyTransfer: new FormControl(""),
        shortRecoveryTreatment:new FormControl(""),
      })


    this.recoveryLoanForm = new FormGroup({
      intRate: new FormControl("",[Validators.required]),
      ratePerAnnumDerivedName: new FormControl("",[Validators.required]),
      methodOfComputation: new FormControl("",[Validators.required]),
      intDateOfTransactions: new FormControl("",[Validators.required]),
      intCycleOfDisbursement: new FormControl("",[Validators.required]),
      cycleOfLastInstallment: new FormControl("",[Validators.required]),
      intAdhocPayments: new FormControl("",[Validators.required]),
      intBeforePriRepaymentStarts: new FormControl("",[Validators.required]),
      groupCompanyTransfer: new FormControl("",[Validators.required]),
      compoundingOfInterest: new FormControl("",[Validators.required]),
      recoveryNoOfInstallments: new FormControl("",[Validators.required]),
      noOfInstallementDerivedName: new FormControl("",[Validators.required]),
      recoveryMethod: new FormControl("",[Validators.required]),
      firstPriThanIntNoOfInstallmentForIntRecovery: new FormControl(""),
      firstPriThanIntNoOfInstallmentForInRecoveryDerivedName:new FormControl(""),
      recoveryToStartSalaryCycles: new FormControl("",[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      recoveryToStartDisbursements: new FormControl("",[Validators.required]),
      adhocPaymentsTreatment: new FormControl("",[Validators.required]),
      paymentRecoveryInNextCycleInt: new FormControl(false),
      paymentRecoveryInNextCyclePri: new FormControl(true),
      changeROIAsPerLoanBalance:new FormControl(false),
      shortRecoveryTreatment:new FormControl("",[Validators.required]),
    })

    if (localStorage.getItem('viewData') != null) {
      let loandata = JSON.parse(localStorage.getItem('viewData'))
      this.loandataforcyle = loandata;

      this.recoveryLoanForm.patchValue(loandata)
      if (loandata.paymentRecoveryInNextCyclePri == true) {
        this.paymentRecoveryInNextCyclePriValFlag = 'Yes'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(true);
      } else {
        this.paymentRecoveryInNextCyclePriValFlag = 'No'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(false);
      }

      if (loandata.paymentRecoveryInNextCycleInt == true) {
        this.paymentRecoveryInNextCycleIntValFlag = 'Yes'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(true);

      } else {
        this.paymentRecoveryInNextCycleIntValFlag = 'No'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(false);
      }

      if (loandata.changeROIAsPerLoanBalance == true) {
        this.changeROIAsPerLoanBalanceChkFlag ='Yes';
        this.recoveryLoanForm.controls['changeROIAsPerLoanBalance'].setValue(true);

      } else {
        this.changeROIAsPerLoanBalanceChkFlag ='No';
        this.recoveryLoanForm.controls['changeROIAsPerLoanBalance'].setValue(true);
      }

      this.isUpdate = false;
      this.isSave = false;
      this.isPrevious  = false;
      this.isReset = false;

      console.log('loandata.cycleOfLastInstallment',loandata.cycleOfLastInstallment)
      this.recoveryLoanForm.controls['cycleOfLastInstallment'].setValue(loandata.cycleOfLastInstallment)

      this.getAllDerivedSDMRatePerAnnum(loandata.intRate) // get sdm derived  name
      this.recoveryLoanForm.controls['ratePerAnnumDerivedName'].setValue(loandata.ratePerAnnumDerivedName)

      this.getAllDerivedSDMNoofInstallments(loandata.recoveryNoOfInstallments) // get sdm derived  name
      this.recoveryLoanForm.controls['noOfInstallementDerivedName'].setValue(loandata.noOfInstallementDerivedName)

      this.getAllDerivedSDMinstallmentsforInterestRecovery(loandata.firstPriThanIntNoOfInstallmentForIntRecovery) // get sdm derived  name
      this.recoveryLoanForm.controls['firstPriThanIntNoOfInstallmentForInRecoveryDerivedName'].setValue(loandata.firstPriThanIntNoOfInstallmentForInRecoveryDerivedName)

      this.recoveryLoanForm.disable()
    }

    if (localStorage.getItem('editData') != null) {
      this.editFlag = true;
      let loandata = JSON.parse(localStorage.getItem('editData'))
      this.loandataforcyle = loandata;
      this.recoveryLoanForm.patchValue(loandata)
      this.loanMasterForm.patchValue(loandata)

      console.log('loandata.cycleOfLastInstallment',loandata.cycleOfLastInstallment)
      this.recoveryLoanForm.controls['cycleOfLastInstallment'].setValue(loandata.cycleOfLastInstallment)

      this.getAllDerivedSDMRatePerAnnum(loandata.intRate) // get sdm derived  name
      this.recoveryLoanForm.controls['ratePerAnnumDerivedName'].setValue(loandata.ratePerAnnumDerivedName)

      this.getAllDerivedSDMNoofInstallments(loandata.recoveryNoOfInstallments) // get sdm derived  name
      this.recoveryLoanForm.controls['noOfInstallementDerivedName'].setValue(loandata.noOfInstallementDerivedName)

      this.getAllDerivedSDMinstallmentsforInterestRecovery(loandata.firstPriThanIntNoOfInstallmentForIntRecovery) // get sdm derived  name
      this.recoveryLoanForm.controls['firstPriThanIntNoOfInstallmentForInRecoveryDerivedName'].setValue(loandata.firstPriThanIntNoOfInstallmentForInRecoveryDerivedName)

      if (loandata.paymentRecoveryInNextCyclePri == true) {
        this.paymentRecoveryInNextCyclePriValFlag = 'Yes'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(true);
      } else {
        this.paymentRecoveryInNextCyclePriValFlag = 'No'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(false);
      }

      if (loandata.paymentRecoveryInNextCycleInt == true) {
        this.paymentRecoveryInNextCycleIntValFlag = 'Yes'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(true);

      } else {
        this.paymentRecoveryInNextCycleIntValFlag = 'No'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(false);
      }

      if (loandata.changeROIAsPerLoanBalance == true) {
        this.changeROIAsPerLoanBalanceChkFlag ='Yes';
        this.recoveryLoanForm.controls['changeROIAsPerLoanBalance'].setValue(true);

      } else {
        this.changeROIAsPerLoanBalanceChkFlag ='No';
        this.recoveryLoanForm.controls['changeROIAsPerLoanBalance'].setValue(true);
      }

      this.isUpdate = true;
      this.isSave = false;
      this.isPrevious  = true;
      this.isReset = true;
      this.recoveryLoanForm.enable()
    }
  }

  ngOnInit(): void {
    this.getAllApprovalSDM();

    if (localStorage.getItem('generalForm') != null) {
      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.loanMasterForm.patchValue(generalFormValue)
      this.filesArray = []
      generalFormValue.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark,
            "docType": element.docType,
            "docMandatory": element.docMandatory
          }
        )
      });

      // this.recoveryLoanForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)
    }


    if (localStorage.getItem('recoveryForm') != null) {
      let recoveryFormValue = JSON.parse(localStorage.getItem('recoveryForm'))
      this.recoveryLoanForm.patchValue(recoveryFormValue)
      this.loanMasterForm.patchValue(recoveryFormValue)

      if (recoveryFormValue.paymentRecoveryInNextCyclePri == true) {
        this.paymentRecoveryInNextCyclePriValFlag = 'Yes'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(true);

      } else {
        this.paymentRecoveryInNextCyclePriValFlag = 'No'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(false);
      }

      if (recoveryFormValue.paymentRecoveryInNextCycleInt == true) {
        this.paymentRecoveryInNextCycleIntValFlag = 'Yes'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(true);

      } else {
        this.paymentRecoveryInNextCycleIntValFlag = 'No'
        this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(false);

      }

    }

    if (localStorage.getItem('paymentLoanForm') != null) {
      let paymentLoanForm = JSON.parse(localStorage.getItem('paymentLoanForm'))
      this.loanMasterForm.patchValue(paymentLoanForm)
      this.Instances = []
      paymentLoanForm.instances.forEach(element => {
        // console.log("element",element)
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          }
        )
      });
      this.loanMasterForm.controls['instances'].setValue(this.Instances)
    }

  }
  paymentRecoveryInNextCyclePrincipal(value) {
    // alert(value)
    if (value == 'Yes') {
      alert(value)
      this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(true)
      this.loanMasterForm.controls['paymentRecoveryInNextCyclePri'].setValue(true)
    } else {
      alert(value)

      this.recoveryLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(false)
      this.loanMasterForm.controls['paymentRecoveryInNextCyclePri'].setValue(false)
    }
  }

  paymentRecoveryInNextCycleInterest(value) {
    if (value == 'Yes') {
      this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(true)
      this.loanMasterForm.controls['paymentRecoveryInNextCycleInt'].setValue(true)
    } else {
      this.recoveryLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(false)
      this.loanMasterForm.controls['paymentRecoveryInNextCycleInt'].setValue(false)
    }
  }
  changeROIAsPerLoanBalanceChk(value){
    if(value == 'Yes')
    {
      this.recoveryLoanForm.controls['changeROIAsPerLoanBalance'].setValue(true)
      this.loanMasterForm.controls['changeROIAsPerLoanBalance'].setValue(true)
    } else {
      this.recoveryLoanForm.controls['changeROIAsPerLoanBalance'].setValue(false)
      this.loanMasterForm.controls['changeROIAsPerLoanBalance'].setValue(false)

    }
  }

  /** Submit recovery form and navigate next tab (payment)*/
  submitRecoveryForm() {
    localStorage.setItem('recoveryForm', JSON.stringify(this.recoveryLoanForm.value))
    if (!this.editFlag) {
      this.loanMasterForm.controls['loanMasterId'].setValue(this.loanMasterId);
      this.loanMasterForm.patchValue(this.recoveryLoanForm.value)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['intRate'].setValue(parseInt(this.loanMasterForm.controls['intRate'].value))
      this.loanMasterForm.controls['minLoanAmount'].setValue(parseInt(this.loanMasterForm.controls['minLoanAmount'].value))

      this.loanMasterForm.controls['noOfGuarantor'].setValue(parseInt(this.loanMasterForm.controls['noOfGuarantor'].value))
      this.loanMasterForm.controls['deviationAmount'].setValue(parseInt(this.loanMasterForm.controls['deviationAmount'].value))
      this.loanMasterForm.controls['deviationInterest'].setValue(parseFloat(this.loanMasterForm.controls['deviationInterest'].value))
      this.loanMasterForm.controls['deviationNoOfInstallment'].setValue(parseInt(this.loanMasterForm.controls['deviationNoOfInstallment'].value))

      this.loanMasterForm.controls['gapEarilerLoanDerivedName'].setValue(parseInt(this.loanMasterForm.controls['gapEarilerLoanDerivedName'].value))
      this.loanMasterForm.controls['gapEndLoanDerivedName'].setValue(parseInt(this.loanMasterForm.controls['gapEndLoanDerivedName'].value))

      this.loanMasterForm.controls['loanAppplicationDerivedName'].setValue(parseInt(this.loanMasterForm.controls['loanAppplicationDerivedName'].value))
      this.loanMasterForm.controls['loanCompletionDerivedName'].setValue(parseInt(this.loanMasterForm.controls['loanCompletionDerivedName'].value))
      this.loanMasterForm.controls['maxAmountAllowedDerivedName'].setValue(parseInt(this.loanMasterForm.controls['maxAmountAllowedDerivedName'].value))
      this.loanMasterForm.controls['noOfInstallementDerivedName'].setValue(parseInt(this.loanMasterForm.controls['noOfInstallementDerivedName'].value))

      this.loanMasterForm.controls['ratePerAnnumDerivedName'].setValue(parseInt(this.loanMasterForm.controls['ratePerAnnumDerivedName'].value))
      this.loanMasterForm.controls['servicePeriodDerivedName'].setValue(parseInt(this.loanMasterForm.controls['servicePeriodDerivedName'].value))
      this.loanMasterForm.controls['underlyingAssetDerivedName'].setValue(parseInt(this.loanMasterForm.controls['underlyingAssetDerivedName'].value))

      this.loanMasterForm.controls['noOfTimeOfSalaryDerivedName'].setValue(parseInt(this.loanMasterForm.controls['noOfTimeOfSalaryDerivedName'].value))
      this.loanMasterForm.controls['recoveryToStartSalaryCycles'].setValue(parseInt(this.loanMasterForm.controls['recoveryToStartSalaryCycles'].value))
      this.loanMasterForm.controls['recoveryNoOfInstallments'].setValue(parseInt(this.loanMasterForm.controls['recoveryNoOfInstallments'].value))
      // this.loanMasterForm.controls['amountNodeValue'].setValue(parseFloat(this.loanMasterForm.controls['amountNodeValue'].value))

      this.loanMasterForm.controls['loanApplicationTemplate'].setValue([null])//temp
       console.log(JSON.stringify(this.loanMasterForm.value));

      this.loanmasterService.saveLoanMasterData(this.loanMasterForm.value).subscribe(
        res => {
          // this.loanMasterData = res.data.results;
          // console.log(JSON.stringify("loanMasterForm",this.loanMasterData));
          this.alertService.sweetalertMasterSuccess( 'Loan data Saved Successfully!!','')
          this.getAllLoanSummary();

          this.router.navigate(['/loan-master/summary'])
        }
      )
    } else {
      // alert("update")

      this.loanMasterForm.patchValue(this.recoveryLoanForm.value)
      // this.loanMasterForm.controls['loanMasterId'].setValue(this.loanMasterId);
      this.loanMasterForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['intRate'].setValue(parseInt(this.loanMasterForm.controls['intRate'].value))
      this.loanMasterForm.controls['minLoanAmount'].setValue(parseInt(this.loanMasterForm.controls['minLoanAmount'].value))

      this.loanMasterForm.controls['noOfGuarantor'].setValue(parseInt(this.loanMasterForm.controls['noOfGuarantor'].value))
      this.loanMasterForm.controls['deviationAmount'].setValue(parseInt(this.loanMasterForm.controls['deviationAmount'].value))
      this.loanMasterForm.controls['deviationInterest'].setValue(parseFloat(this.loanMasterForm.controls['deviationInterest'].value))
      this.loanMasterForm.controls['deviationNoOfInstallment'].setValue(parseInt(this.loanMasterForm.controls['deviationNoOfInstallment'].value))

      this.loanMasterForm.controls['gapEarilerLoanDerivedName'].setValue(parseInt(this.loanMasterForm.controls['gapEarilerLoanDerivedName'].value))
      this.loanMasterForm.controls['gapEndLoanDerivedName'].setValue(parseInt(this.loanMasterForm.controls['gapEndLoanDerivedName'].value))

      this.loanMasterForm.controls['loanAppplicationDerivedName'].setValue(parseInt(this.loanMasterForm.controls['loanAppplicationDerivedName'].value))
      this.loanMasterForm.controls['loanCompletionDerivedName'].setValue(parseInt(this.loanMasterForm.controls['loanCompletionDerivedName'].value))
      this.loanMasterForm.controls['maxAmountAllowedDerivedName'].setValue(parseInt(this.loanMasterForm.controls['maxAmountAllowedDerivedName'].value))
      this.loanMasterForm.controls['noOfInstallementDerivedName'].setValue(parseInt(this.loanMasterForm.controls['noOfInstallementDerivedName'].value))

      this.loanMasterForm.controls['ratePerAnnumDerivedName'].setValue(parseInt(this.loanMasterForm.controls['ratePerAnnumDerivedName'].value))
      this.loanMasterForm.controls['servicePeriodDerivedName'].setValue(parseInt(this.loanMasterForm.controls['servicePeriodDerivedName'].value))
      this.loanMasterForm.controls['underlyingAssetDerivedName'].setValue(parseInt(this.loanMasterForm.controls['underlyingAssetDerivedName'].value))

      this.loanMasterForm.controls['noOfTimeOfSalaryDerivedName'].setValue(parseInt(this.loanMasterForm.controls['noOfTimeOfSalaryDerivedName'].value))
      this.loanMasterForm.controls['recoveryToStartSalaryCycles'].setValue(parseInt(this.loanMasterForm.controls['recoveryToStartSalaryCycles'].value))
      this.loanMasterForm.controls['recoveryNoOfInstallments'].setValue(parseInt(this.loanMasterForm.controls['recoveryNoOfInstallments'].value))
      this.loanMasterForm.controls['loanApplicationTemplate'].setValue([null])//temp

      this.loanMasterForm.controls['approvalWorkFlowSDM'].setValue(this.loanMasterForm.controls['approvalWorkFlowSDM'].value.toString())
      this.loanMasterForm.controls['firstPriThanIntNoOfInstallmentForIntRecovery'].setValue(this.loanMasterForm.controls
        ['firstPriThanIntNoOfInstallmentForIntRecovery'].value.toString())
      // this.loanMasterForm.controls['gapBetTwoLoanApp'].setValue(this.loanMasterForm.controls['gapBetTwoLoanApp'].value)
      this.loanMasterForm.controls['gapEndOfEarlierLoanAndNewLoanApp'].setValue(this.loanMasterForm.controls
        ['gapEndOfEarlierLoanAndNewLoanApp'].value.toString())
      this.loanMasterForm.controls['maxAmountLoan'].setValue(this.loanMasterForm.controls['maxAmountLoan'].value.toString())
      this.loanMasterForm.controls['minRemainingServiceLoanApplication'].setValue(this.loanMasterForm.controls
        ['minRemainingServiceLoanApplication'].value.toString())
      this.loanMasterForm.controls['minRemainingServiceLoanCompletion'].setValue(this.loanMasterForm.controls
        ['minRemainingServiceLoanCompletion'].value.toString())
      this.loanMasterForm.controls['noOfTimesOfSalary'].setValue(this.loanMasterForm.controls['noOfTimesOfSalary'].value.toString())
      this.loanMasterForm.controls['servicePeriod'].setValue(this.loanMasterForm.controls['servicePeriod'].value.toString())
      this.loanMasterForm.controls['underliningAsset'].setValue(this.loanMasterForm.controls['underliningAsset'].value.toString())


       console.log(JSON.stringify(this.loanMasterForm.value));

      this.loanmasterService.updateLoanMasterData(this.loanMasterForm.value).subscribe(
        res => {
          this.alertService.sweetalertMasterSuccess('Loan data Updated Successfully','')
          this.getAllLoanSummary();
          this.router.navigate(['/loan-master/summary'])
        }
      )
    }

  }

  previousTab(){
    localStorage.setItem('recoveryForm', JSON.stringify(this.recoveryLoanForm.value))
    this.router.navigate(['/loan-master/payment'])
  }

  resetRecoveryForm() {
    this.recoveryLoanForm.reset()
    localStorage.removeItem('recoveryForm')
  }
  // ..............................................Pooja.........................................
  getAllApprovalSDM() // get Approval SDM
  {
    this.loanMasterService.getAllApprovalSDM().subscribe(
    res => {
      this.getAllApprovalSDMData = res.data.results[0];
      this.getAllApprovalSDMData.forEach((element,index) => {
        if(element == null){
          let ind = index;
          this.getAllApprovalSDMData.splice(ind,1)
        }
      });
      
    }
    )
  }

  getAllDerivedSDMRatePerAnnum(id) // get sdm derived  name
   {
    this.loanMasterService.getAllDerivedSDM(id).subscribe(
      res => {
        this.getAllDerivedSDMRatePerAnnumData = res.data.results[0];
      })
  }

  getAllDerivedSDMNoofInstallments(id) // get sdm derived  name
  {
   this.loanMasterService.getAllDerivedSDM(id).subscribe(
     res => {
       this.getAllDerivedSDMNoofInstallmentsData = res.data.results[0];
     })
 }

 getAllDerivedSDMinstallmentsforInterestRecovery(id) // get sdm derived  name
 {
  this.loanMasterService.getAllDerivedSDM(id).subscribe(
    res => {
      this.getAllDerivedSDMinstallmentsforInterestRecoveryData = res.data.results[0];
    })
}
getAllLoanSummary(){
  this.loanMasterService.getLoanSummaryData().subscribe(
    res =>{
      //  this.loanSummaryData = res.data.results[0];
      //  console.log(res.data.results[0])
    }
  )
}

}
