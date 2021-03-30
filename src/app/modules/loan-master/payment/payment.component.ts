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

  constructor(private loanmasterService: LoanMasterService, 
    private modalService: BsModalService, 
    private toaster: ToastrService,
    private router: Router) {

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


  //   let res = {
  //     "data":{
  //        "results":[
  //           {
  //              "rolePrivilegeMatrixId":3,
  //              "globalCompanyMasterId":1,
  //              "companyName":"WhiteHedge",
  //              "userRoleDetail":{
  //                 "createdBy":"TestUser",
  //                 "lastModifiedBy":null,
  //                 "createdDateTime":"05-Mar-2021",
  //                 "lastModifiedDateTime":"05-Mar-2021",
  //                 "userRoleId":12,
  //                 "userGroupId":6080,
  //                 "roleName":"HR Head",
  //                 "roleDescription":"Head of HR Dept",
  //                 "remark":null,
  //                 "groupName":"HR Admin",
  //                 "default":false,
  //                 "active":true
  //              },
  //              "accessibleMenuDetail":{
  //                 "applicationMenuId":1,
  //                 "parentMenuId":0,
  //                 "menuName":"Employee Master",
  //                 "menuDescription":"Employee",
  //                 "isActive":true,
  //                 "createdBy":"MayurG",
  //                 "createdDateTime":"01-Jan-2020",
  //                 "lastModifiedBy":null,
  //                 "lastModifiedDateTime":null
  //              },
  //              "readAccess":1,
  //              "writeAccess":1,
  //              "modifyAccess":1,
  //              "deleteAccess":1,
  //              "isActive":1,
  //              "createdBy":"preeti",
  //              "createdDateTime":"26-Mar-2021",
  //              "lastModifiedBy":"preeti",
  //              "lastModifiedDateTime":"26-Mar-2021"
  //           }
  //        ]
  //     },
  //     "meta":{
  //        "timestamp":1616758252298,
  //        "path":"",
  //        "user":""
  //     },
  //     "status":{
  //        "code":"200",
  //        "result":"Success",
  //        "message":"Role wise Menu details found Successfully"
  //     }
  //  }


  //  let loandata = res.data.results;
  //  let masterSummaryData = []
  //  loandata.forEach(element => {
  //   masterSummaryData.push({
  //     'companyName': element.companyName,
  //     'roleName': element.userRoleDetail.roleName,
  //     'groupName': element.userRoleDetail.groupName
  //   })
  //  });


  //  console.log(masterSummaryData)


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
      this.paymentLoanForm.patchValue(paymentLoanForm)
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
    this.paymentLoanForm.controls['document'].setValue(this.filesArray)
    localStorage.setItem('paymentLoanForm', JSON.stringify(this.paymentLoanForm.value))
    this.loanMasterForm.patchValue(this.paymentLoanForm.value)
    this.loanMasterForm.controls['document'].setValue(this.filesArray)
    this.loanMasterForm.controls['noOfGuarantor'].setValue(parseInt(this.paymentLoanForm.controls['noOfGuarantor'].value))
    console.log(JSON.stringify(this.loanMasterForm.value))

    this.loanmasterService.saveLoanMasterData(this.loanMasterForm.value).subscribe(
      res => {
        this.toaster.success('', 'Loan data Saved Successfully!!')
      }
    )
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
        "documentName": this.fileName,
        "documentRemark": this.documentRemark
      });
    // console.log(this.filesArray);
  }

}
