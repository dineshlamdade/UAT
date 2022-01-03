import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from '../loan.service'
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { LoanModule } from '../loan.module';
import { AuthService } from '../../auth/auth.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {
  addRescheduleForm: FormGroup;
  perticularEmpDetails: any;
  employeeMasterIdData: any;
  loanDetails:any;
  public summaryAllOtherMappingDetailsList = [];
  public getAllOtherMappingDetailsResponse: any;
  userData: any;
  employeeMasterId: any;
  selectedLoanData: any;
  loanType2: any;
  loanDescription: any;
  myDate:Date = new Date();
  loanApplicationId: any;
  balance: any;
  getAdhocBalanceData: any;
  currentDate: any;
  postApproverDetailsData: any;
  isUpdate:boolean=false;
  isSave:boolean=true;
  noOfIntsallmentHide:boolean=false;
  noOfIntsallmentShow:boolean=true;
  scheduledEMI:boolean = true;
  schedulePriRepayment:boolean = false;
  recoveryMethod: any;
  proPriRepayment:boolean = true;
  proposedEMI:boolean=false;
  loanApplicationId2: any;
  getRescheduleBalanceData: any;
  schedulePrincipal: any;
  scheduleEmi: any;
  remainingInstallment: any;
  approvalWorkFlowId: any;
  amountisnotgraterthan:boolean;
  public submitted = false;
  propsedPrincipal: any;
  isView:boolean = false;
  viewMode:boolean = false;
  managerFlag:boolean = true;
  inputRemarkFlag:boolean = false;
  inputnormalFlag:boolean = true;
  loanApprEditTimeBtns:boolean=false;
  loanAppBtns:boolean = true;
  selectedLoanDataForApproval: any =[];
  rescheduleType: any;
  normalreschduletype:boolean=true;
  loanapprovaltimereschduletype:boolean = false;
  multiplEmpFlag:boolean = false;
  index: number;
  selectedEmployee: any;
  constructor(public formBuilder: FormBuilder,private loanService: LoanService,private datePipe: DatePipe,
    private modalService: BsModalService,private excelservice: ExcelService, public sanitizer: DomSanitizer,
    private authService: AuthService,
    private toaster: ToastrService,
    private alertService: AlertServiceService,
    private router: Router ) {

      this.addRescheduleForm = new FormGroup({
        loanRescheduleRequestDetailsId: new FormControl(0),
        active: new FormControl(false),
        loanApplicationId: new FormControl(0),
        transactionNo: new FormControl(''),
        rescheduleType: new FormControl(''),
        expectedPaymentDate: new FormControl(new Date()),
        noOfInstallmentToReschedule: new FormControl('',[Validators.required]),
        //expectedPaymentDate: new FormControl(new Date()),
        propsedPrincipal: new FormControl(0),
        // ,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]
        propsedEMI: new FormControl(0),
        status: new FormControl(''),
        createDateTime: new FormControl(new Date()),
        createdBy: new FormControl(''),
        lastModifiedBy: new FormControl(''),
        lastModifiedDateTime: new FormControl(new Date()),
        // amount:new FormControl(),
        remark :new FormControl('')
      });
        //
        this.userData = this.authService.getprivileges()
        this.employeeMasterId = this.userData.UserDetails.employeeMasterId;

        if (localStorage.getItem('selectedLoanData') != null) {
          this.selectedLoanData = JSON.parse(localStorage.getItem('selectedLoanData'));
          this.loanType2 = this.selectedLoanData.loanType;
          this.loanDescription = this.selectedLoanData.loanMaster.loanDescription;
          this.loanApplicationId2  = this.selectedLoanData.loanApplicationId;
          this.approvalWorkFlowId = this.selectedLoanData.loanMaster.approvalWorkFlowId;
          this.getLoanDetails(this.loanType2,this.employeeMasterId);

          this.recoveryMethod = this.selectedLoanData.loanMaster.recoveryMethod
          console.log(" this.recoveryMethod", this.recoveryMethod)

          if( this.recoveryMethod  == 'Reducing Balance' || this.recoveryMethod  == 'Flat Interest'
            || this.recoveryMethod == 'Principal First & then Interest'){
              // alert(this.recoveryMethod)
            this.schedulePriRepayment = true;
            this.scheduledEMI = false;
            this.proposedEMI = false;
            this.proPriRepayment = true;
            this.addRescheduleForm.controls['propsedEMI'].clearValidators();
          }else if(this.recoveryMethod  == 'EMI'){
            // alert(this.recoveryMethod)
            this.schedulePriRepayment = false;
            this.scheduledEMI = true;
            this.proposedEMI = true;
            this.proPriRepayment = false;
            this.addRescheduleForm.controls['propsedPrincipal'].clearValidators();

          }
         }

         if(localStorage.getItem('editTransaction')!= null){
          let formdata = JSON.parse(localStorage.getItem('editTransaction'))
          this.addRescheduleForm.patchValue(formdata);
          this.isUpdate = true;
          this.isSave = false;
          this.addRescheduleForm.controls['transactionNo'].setValue(formdata.transactionNo)
          this.addRescheduleForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-YYYY'))
          // console.log("reschdule edit time date",this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-YYYY'))
          this.getByIdReschduleForm(formdata.loanRescheduleRequestDetailsId)
          // localStorage.removeItem('editTransaction')

        }

        if(localStorage.getItem('viewTransaction')!= null){
          let formdata = JSON.parse(localStorage.getItem('viewTransaction'))
          this.addRescheduleForm.patchValue(formdata);
          this.addRescheduleForm.disable();
          this.isSave = false;
          this.isUpdate = false;
          this.isView = true;
          this.viewMode = true;
          this.addRescheduleForm.controls['transactionNo'].setValue(formdata.transactionNo);
          this.addRescheduleForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(formdata.expectedPaymentDate,'dd-MMM-YYYY'))

          // localStorage.removeItem('viewTransaction')

        }

        if(localStorage.getItem('EditLoanApprovalData')!= null){
          let formdata = JSON.parse(localStorage.getItem('EditLoanApprovalData'))
          this.addRescheduleForm.patchValue(formdata);
          this.addRescheduleForm.disable();
          this.managerFlag = false;
          this.inputRemarkFlag = true;
          this.inputnormalFlag = false;
          this.loanApprEditTimeBtns = true;
          this.loanAppBtns = false;
          this.rescheduleType = formdata.rescheduleType;
          // console.log("this.rescheduleType",this.rescheduleType)
          this.addRescheduleForm.controls['rescheduleType'].setValue( this.rescheduleType);
          this.normalreschduletype = false;
          this.loanapprovaltimereschduletype = true;
          this.getLoanDetails(formdata.loanType,formdata.employeeMasterId)
        }

        if(localStorage.getItem('ViweLoanApprovalData')!= null){
          let formdata = JSON.parse(localStorage.getItem('ViweLoanApprovalData'))
          this.addRescheduleForm.patchValue(formdata);
          this.addRescheduleForm.disable();
          this.rescheduleType = formdata.rescheduleType;
          // console.log("this.rescheduleType",this.rescheduleType)
          this.addRescheduleForm.controls['rescheduleType'].setValue( this.rescheduleType);
          this.normalreschduletype = false;
          this.loanapprovaltimereschduletype = true;
          this.getLoanDetails(formdata.loanType,formdata.employeeMasterId)
        }

        if(localStorage.getItem('selectedLoanForApproval') != null){
          this.selectedLoanDataForApproval = JSON.parse(localStorage.getItem('selectedLoanForApproval'));
          this.addRescheduleForm.patchValue(this.selectedLoanDataForApproval[0]);
          this.addRescheduleForm.disable();
          this.rescheduleType = this.selectedLoanDataForApproval[0].rescheduleType;
          // console.log("this.rescheduleType",this.rescheduleType)
          this.addRescheduleForm.controls['rescheduleType'].setValue( this.rescheduleType);
          this.normalreschduletype = false;
          this.loanapprovaltimereschduletype = true;
          this.getLoanDetails(this.selectedLoanDataForApproval[0].loanType,this.selectedLoanDataForApproval[0].employeeMasterId)

          this.index = 0 ;
          this.selectedEmployee = this.selectedLoanDataForApproval[this.index]
          console.log("this.selectedEmployee",this.selectedEmployee);

          if(this.selectedLoanDataForApproval.length > 1){
           this.multiplEmpFlag = true;
          }else{
            this.multiplEmpFlag = false;
          }
        }

    }

  ngOnInit(): void {
    this.getEmpMasterDetails();
    this.getAdhocBalance()
    this.getReschduleloanBalance();
    this.postApproverDetails();
    if(!this.isUpdate && !this.viewMode){
      this.addRescheduleForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform(this.myDate,'dd-MMM-YYYY'))
      }
  }

  getEmpMasterDetails(){
    this.loanService.getEmpMasterDetails(this.employeeMasterId).subscribe(
      res=>{
        this.perticularEmpDetails = res.data.results[0][0];
      })
  }


  /** Submit Reschedule form */
  addRescheduleData() {
    // console.log(this.addRescheduleData);
    this.addRescheduleForm.controls['loanApplicationId'].setValue(this.loanApplicationId2);
    this.addRescheduleForm.controls['noOfInstallmentToReschedule'].setValue(parseInt(this.addRescheduleForm.controls['noOfInstallmentToReschedule'].value))
    this.addRescheduleForm.controls['propsedPrincipal'].setValue(parseInt(this.addRescheduleForm.controls['propsedPrincipal'].value))
    // this.addRescheduleForm.controls['expectedPaymentDate'].setValue(this.datePipe.transform( this.addRescheduleForm.controls['effectiveDate'].value),'yyyy-MM-dd')

    console.log("Reschdule form data",JSON.stringify(this.addRescheduleForm.value))
    this.loanService.saveRescheduleData(this.addRescheduleForm.value).subscribe(
      res => {
        this.alertService.sweetalertMasterSuccess('Reschedule data Saved Successfully!!', '' );
        this.router.navigate(['/loan/application']);

      } )
    }

    updateReschduleForm()
    {
      // console.log("this.loanApplicationId2",this.loanApplicationId2)
      this.addRescheduleForm.controls['loanApplicationId'].setValue(this.loanApplicationId2);
      this.addRescheduleForm.controls['noOfInstallmentToReschedule'].setValue(parseInt(this.addRescheduleForm.controls['noOfInstallmentToReschedule'].value))
      this.addRescheduleForm.controls['propsedPrincipal'].setValue(parseInt(this.addRescheduleForm.controls['propsedPrincipal'].value))
      this.addRescheduleForm.controls['createDateTime'].setValue(this.addRescheduleForm.controls['createDateTime'].value)
      this.addRescheduleForm.controls['lastModifiedDateTime'].setValue(this.addRescheduleForm.controls['lastModifiedDateTime'].value)
      // this.addRescheduleForm.controls['effectiveDate'].setValue(this.datePipe.transform( this.addRescheduleForm.controls['effectiveDate'].value),'yyyy-MM-dd')

      this.loanService.updateAdhocForm(this.addRescheduleForm.value).subscribe( res =>
        {
          this.alertService.sweetalertMasterSuccess('Reschedule data Updated Successfully!!', '' );
          this.router.navigate(['/loan/application']);
        })
    }

    getByIdReschduleForm(id)
    {
     this.loanService.getByIdReschduleForm(id).subscribe( res =>
      {

      })
    }

/** Submit Reschedule form End */

getLoanDetails(loanType2,id) { // temp id is used

  this.summaryAllOtherMappingDetailsList = [];
  this.loanDetails = {};

  this.loanService.getLoanDetails(loanType2,this.employeeMasterId).subscribe((res) => {
    this.loanDetails = res.data.results[0];
    // this.loanApplicationId = this.loanDetails.loanApplicationId;

    let i = 1;
    // console.log(this.loanDetails);
    res.data.results.forEach( ( element ) => {
      if ( element.isActive == 1 ) {
        const obj = {
          SrNo: i++,
          masterMappingId: element.masterMappingId,
          masterId: element.masterId,
          groupCompanyId: element.groupCompanyId,
          masterMappingType: element.masterMappingType,
          masterCode: element.masterCode,
          companyName: element.companyName,
          isActive: element.isActive,
        };
        this.summaryAllOtherMappingDetailsList.push( obj );
      }
    } );
  });
}
// Get Loan details End

getReschduleloanBalance()
{
  // this.loanApplicationId
//  console.log(" this.loanApplicationId", this.loanApplicationId2)
  this.currentDate = this.datePipe.transform(new Date(),'YYYY-MM-dd')
  this.loanService.getReschduleloanBalance(this.currentDate , this.loanApplicationId2).subscribe(res =>
    {
      this.getRescheduleBalanceData = res.data.results;
        // console.log("this.getAdhocBalanceData",this.getRescheduleBalanceData)
      this.getRescheduleBalanceData.forEach(element => {
        this.schedulePrincipal = element.schedulePrincipal;
        this.propsedPrincipal = element.propsedPrincipal;
        this.scheduleEmi = element.scheduleEmi;
        this.remainingInstallment = element.remainingInstallment;

      });

    });
}
getAdhocBalance()
{
  // this.loanApplicationId =72
  this.currentDate = this.datePipe.transform(new Date(),'YYYY-MM-dd')
  this.loanService.getAdhocBalance(this.currentDate , this.loanApplicationId2).subscribe(res =>
    {
      this.getAdhocBalanceData = res.data.results;
      this.getAdhocBalanceData.forEach(element => {
        this.balance = element.principal;
        // console.log("this.getAdhocBalanceData",this.getAdhocBalanceData)
        // console.log("this.balance",this.balance);
      });

    });
}
postApproverDetails() //forword screen addressed to dropdown
{
  let data =
  {
    // this.employeeMasterId
    // this.approvalWorkFlowIdd
    "employeeMasterId":this.employeeMasterId ,
    "flag":"ApproversInfo",
    "workflowMasterHeaderId": this.approvalWorkFlowId
  }
  this.loanService.postApproverDetails(data).subscribe(res =>
    {
      this.postApproverDetailsData = res.data.results[0];
      // console.log(" this.postApproverDetailsData", this.postApproverDetailsData);
    // this.addRescheduleForm.controls['approverDetails'].setValue( this.postApproverDetailsData);

    })
}
rescheduleTypeChg(value)

{
  this.addRescheduleForm.controls['noOfInstallmentToReschedule'].setValue('');

if(value == 'Till Loan End')
{
  this.noOfIntsallmentHide = true;
  this.noOfIntsallmentShow = false;
  this.addRescheduleForm.controls['noOfInstallmentToReschedule'].clearValidators();
}else{
  this.noOfIntsallmentHide = false;
  this.noOfIntsallmentShow = true;
  this.addRescheduleForm.controls['noOfInstallmentToReschedule'].setValidators([Validators.required]);
}

}
notGreterthanRemainingNoOdInstall(value)
{
  if(value >= this.remainingInstallment){
    this.amountisnotgraterthan = true;
    this.alertService.sweetalertWarning('Enter Value less than remaning no. of installment' );
   }else{
    this.amountisnotgraterthan = false;
   }
}

close()
{
  this.router.navigate(['/loan/application']);

}
resetScheduleForm()
{
  this.addRescheduleForm.reset();
  this.addRescheduleForm.enable();
}


}
