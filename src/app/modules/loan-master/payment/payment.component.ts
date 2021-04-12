import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  loanMasterForm: FormGroup;
  deductionHeadData: any;
  earningHeadData: any;
  public modalRef: BsModalRef;
  filesArray: any = [];
  documentRemark: any = '';
  fileName: any;
  Instances: any[] =[];
  loandata: any;
  editloandata: any;
  paymentRecoveryInNextCyclePriVal: string = '';
  paymentRecoveryInNextCycleIntVal: string = '';
  documentName: any;
  editFlag: boolean = false;

  constructor(private loanmasterService: LoanMasterService, 
    private modalService: BsModalService, 
    private toaster: ToastrService,
    private router: Router) {

    this.loanMasterForm = new FormGroup({
      loanMasterId: new FormControl(null),
      active: new FormControl(true),
      adhocPaymentsTreatment: new FormControl(""),
      approvalWorkFlow: new FormControl(""),
      approvalWorkFlowSDM: new FormControl(""),
      assignmentsIntHead: new FormControl(""),
      assignmentsLoanPayment: new FormControl(""),
      assignmentsPerquisite: new FormControl("head master"),
      assignmentsPriHead: new FormControl(""),
      createDateTime: new FormControl(new Date()),
      createdBy: new FormControl("Ajay"),
      cycleOfLastInstallment: new FormControl(""),
      document: new FormControl(""),
      firstPriThanIntNoOfInstallmentForIntRecovery: new FormControl(""),
      gapBetTwoLoanApp: new FormControl(""),
      gapEndOfEarlierLoanAndNewLoanApp: new FormControl(""),
      instances: new FormControl(""),
      intAddInPri: new FormControl("string"),
      intAdhocPayments: new FormControl(""),
      intBeforePriRepaymentStarts: new FormControl(""),
      intCycleOfDisbursement: new FormControl(""),
      intDateOfTransactions: new FormControl(""),
      intRate: new FormControl(""),
      loanApplicationTemplate: new FormControl([null]),
      loanCode: new FormControl(""),
      loanDescription: new FormControl(""),
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
      taxSettingCalculatePerquisiteOn: new FormControl(""),
      taxSettingPerquisiteHead: new FormControl(""),
      taxSettingPerquisiteLoanCategory: new FormControl(""),
      taxSettingPerquisiteSubCategory: new FormControl(""),
      underliningAsset: new FormControl(""),
      deviationAmount:new FormControl(""),
      deviationIntrest:new FormControl(""),
      deviationNoOfInstallment:new FormControl(""),
    })

    this.paymentLoanForm = new FormGroup({
      adhocPaymentsTreatment: new FormControl(""),
      paymentRecoveryInNextCyclePri: new FormControl(""),
      paymentRecoveryInNextCycleInt: new FormControl(""),
      document: new FormControl(""),
      assignmentsIntHead: new FormControl(""),
      assignmentsPriHead: new FormControl(""),
      assignmentsLoanPayment: new FormControl(""),
      taxSettingPerquisiteHead: new FormControl(""),
      taxSettingPerquisiteLoanCategory: new FormControl(""),
      taxSettingPerquisiteSubCategory: new FormControl(""),
      taxSettingCalculatePerquisiteOn: new FormControl(""),
      noOfGuarantor: new FormControl(""),
    })

    this.getDeductionHead();
    this.getEarningHead();

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

      this.filesArray = []
      this.loandata.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark
          } 
        )
      });

      this.paymentLoanForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)


      if (this.loandata.paymentRecoveryInNextCyclePri == true) {
        this.paymentRecoveryInNextCyclePriVal = 'Yes'
      } else {
        this.paymentRecoveryInNextCyclePriVal = 'No'
      }

      if (this.loandata.paymentRecoveryInNextCycleInt == true) {
        this.paymentRecoveryInNextCycleIntVal = 'Yes'
      } else {
        this.paymentRecoveryInNextCycleIntVal = 'No'
      }

      this.paymentLoanForm.disable()
    }

    if (localStorage.getItem('editData') != null) {
      this.editFlag = true;
      this.editloandata = JSON.parse(localStorage.getItem('editData'))
      this.paymentLoanForm.patchValue(this.editloandata)
      this.Instances = []
      this.editloandata.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          } 
        )
      });
      this.loanMasterForm.patchValue(this.editloandata)
      this.loanMasterForm.controls['instances'].setValue(this.Instances)

      this.filesArray = []
      this.editloandata.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark
          } 
        )
      });

      this.paymentLoanForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)

      if (this.editloandata.paymentRecoveryInNextCyclePri == true) {
        this.paymentRecoveryInNextCyclePriVal = 'Yes'
      } else {
        this.paymentRecoveryInNextCyclePriVal = 'No'
      }

      if (this.editloandata.paymentRecoveryInNextCycleInt == true) {
        this.paymentRecoveryInNextCycleIntVal = 'Yes'
      } else {
        this.paymentRecoveryInNextCycleIntVal = 'No'
      }

      this.paymentLoanForm.enable()
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('generalForm') != null) {
      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.loanMasterForm.patchValue(generalFormValue)
      this.Instances = []
      generalFormValue.instances.forEach(element => {
        this.Instances.push(
          {
            "month": element.month,
            "noOfLoan": element.noOfLoan
          } 
        )
      });
    }
    if (localStorage.getItem('recoveryForm') != null) {
      let recoveryFormValue = JSON.parse(localStorage.getItem('recoveryForm'))
      this.loanMasterForm.patchValue(recoveryFormValue)
    }
    if (localStorage.getItem('paymentLoanForm') != null) {
      let paymentLoanForm = JSON.parse(localStorage.getItem('paymentLoanForm'))
      this.paymentLoanForm.patchValue(paymentLoanForm)
      this.loanMasterForm.patchValue(paymentLoanForm)

      this.filesArray = []
      paymentLoanForm.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark
          } 
        )
      });

      this.paymentLoanForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)


      if (paymentLoanForm.paymentRecoveryInNextCyclePri == true) {
        this.paymentRecoveryInNextCyclePriVal = 'Yes'
      } else {
        this.paymentRecoveryInNextCyclePriVal = 'No'
      }

      if (paymentLoanForm.paymentRecoveryInNextCycleInt == true) {
        this.paymentRecoveryInNextCycleIntVal = 'Yes'
      } else {
        this.paymentRecoveryInNextCycleIntVal = 'No'
      }
    }

   
  }

  getDeductionHead() {
    this.loanmasterService.getDeductionHead().subscribe(
      res => {
        this.deductionHeadData = res
      }
    )
  }

  getEarningHead() {
    this.loanmasterService.getEarningHead().subscribe(
      res => {
        this.earningHeadData = res
      }
    )
  }


  /** Submit Loan Master form */
  submitPaymentForm() {
    if(!this.editFlag){
      this.paymentLoanForm.controls['document'].setValue(this.filesArray)
      localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
      this.loanMasterForm.patchValue(this.paymentLoanForm.value)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['noOfGuarantor'].setValue(parseInt(this.paymentLoanForm.controls['noOfGuarantor'].value))
      console.log("Add Data: " + JSON.stringify(this.loanMasterForm.value))
  
      this.loanmasterService.saveLoanMasterData(this.loanMasterForm.value).subscribe(
        res => {
          this.toaster.success('', 'Loan data Saved Successfully!!')
        }
      )
    }else{
      this.paymentLoanForm.controls['document'].setValue(this.filesArray)
      localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
      this.loanMasterForm.patchValue(this.paymentLoanForm.value)
      this.loanMasterForm.controls['document'].setValue(this.filesArray)
      this.loanMasterForm.controls['noOfGuarantor'].setValue(parseInt(this.paymentLoanForm.controls['noOfGuarantor'].value))
      console.log("Update Data: " + JSON.stringify(this.loanMasterForm.value))
  
      this.loanmasterService.updateLoanMasterData(this.loanMasterForm.value).subscribe(
        res => {
          this.toaster.success('', 'Loan data Updated Successfully!!')
        }
      ) 
    }
    
  }

  /**navigate to previous tab (recovery) */
  previousTab(){
    this.paymentLoanForm.controls['document'].setValue(this.filesArray)
    localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
    this.router.navigate(['/loan-master/recovery'])
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

  paymentRecoveryInNextCyclePri(value) {
    if (value == 'Yes') {
      this.paymentLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(true)
    } else {
      this.paymentLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(false)
    }
  }

  paymentRecoveryInNextCycleInt(value) {
    if (value == 'Yes') {
      this.paymentLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(true)
    } else {
      this.paymentLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(false)
    }
  }

  documentSubmit() {
    this.filesArray.push(
      {
        "documentName": this.documentName,
        "documentRemark": this.documentRemark
      });

      this.documentName = null;
      this.documentRemark = null;
    console.log(this.filesArray);
  }

}
