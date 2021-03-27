import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  constructor(private loanmasterService: LoanMasterService,private modalService: BsModalService,) {

    this.loanMasterForm = new FormGroup({
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
      deviation: new FormControl(true),
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
    })

    this.paymentLoanForm = new FormGroup({
      adhocPaymentsTreatment: new FormControl(""),
      paymentRecoveryInNextCyclePri: new FormControl(""),
      paymentRecoveryInNextCycleInt: new FormControl(""),
      assignmentsIntHead: new FormControl(""),
      assignmentsPriHead: new FormControl(""),
      assignmentsLoanPayment: new FormControl(""),
      taxSettingPerquisiteHead: new FormControl(""),
      taxSettingPerquisiteLoanCategory: new FormControl(""),
      taxSettingPerquisiteSubCategory: new FormControl(""),
      taxSettingCalculatePerquisiteOn: new FormControl(""),
      noOfGuarantor: new FormControl(""),
    })

  }

  ngOnInit(): void {
    if (localStorage.getItem('generalForm') != null) {
      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.loanMasterForm.patchValue(generalFormValue)
    }
    if (localStorage.getItem('recoveryForm') != null) {
      let recoveryFormValue = JSON.parse(localStorage.getItem('recoveryForm'))
      this.loanMasterForm.patchValue(recoveryFormValue)
    }
    if (localStorage.getItem('paymentLoanForm') != null) {
      let paymentLoanForm = JSON.parse(localStorage.getItem('paymentLoanForm'))
      this.loanMasterForm.patchValue(paymentLoanForm)
    }

    this.getDeductionHead();
    this.getEarningHead();
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
    localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
    this.loanMasterForm.patchValue(this.paymentLoanForm.value)
    this.loanMasterForm.controls['document'].setValue(this.filesArray)
    this.loanMasterForm.controls['noOfGuarantor'].setValue(parseInt(this.paymentLoanForm.controls['noOfGuarantor'].value))
    console.log(JSON.stringify(this.loanMasterForm.value))

    this.loanmasterService.saveLoanMasterData(this.loanMasterForm.value).subscribe(
      res =>{

      }
    )
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

  paymentRecoveryInNextCyclePri(value){
    if(value == 'Yes'){
      this.paymentLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(true)
    }else{
      this.paymentLoanForm.controls['paymentRecoveryInNextCyclePri'].setValue(false)
    }  
  }

  paymentRecoveryInNextCycleInt(value){
    if(value == 'Yes'){
      this.paymentLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(true)
    }else{
      this.paymentLoanForm.controls['paymentRecoveryInNextCycleInt'].setValue(false)
    }  
  }

  documentSubmit(){
    this.filesArray.push(
      {
        "documentName": this.fileName,
        "documentRemark": this.documentRemark 
      });
      // console.log(this.filesArray);
  }

}
